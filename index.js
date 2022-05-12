const fetch = require('node-fetch');

var obj = {
    NewProposals: 0,
    proposalsId: [],
    expireTimeStamp: []
};




async function getData() {
    const data = JSON.stringify({
        query: `
        {
          proposals 
            {
              id
              title
              end
            }`
    });


    const response = await fetch(
        'https://hub.snapshot.org/graphql?operationName=Proposals&query=query%20Proposals%20%7B%0A%20%20proposals%20(%0A%20%20%20%20first%3A%2010%2C%0A%20%20%20%20where%3A%20%7B%0A%20%20%20%20%20%20space_in%3A%20%5B%223.spaceshot.eth%22%5D%2C%0A%20%20%20%20%20%20state%3A%20%22open%22%0A%20%20%20%20%7D%0A%20%20)%20%7B%0A%20%20%20%20id%0A%20%20%20%20end%0A%20%20%20%0A%20%20%7D%0A%7D', {
            method: 'post',
            body: data,
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': data.length,
                'User-Agent': 'Node',
            },
        }
    )

    // let lastTimestamp = response.data.proposals[4].end
    const json = await response.json();




    for (let index = 0; index < json.data.proposals.length; index++) {

        obj.proposalsId.push(
            json.data.proposals[index].id
        );

        obj.expireTimeStamp.push(
            json.data.proposals[index].end
        )
        obj.NewProposals++;



    }
    var lastjson = JSON.stringify(obj);


    console.log(lastjson);
    document.getElementById("json").innerHTML = JSON.stringify(obj, null, 4);
}

getData();