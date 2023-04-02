// const data = [
//     {
//         League: "NBA",
//         Date: "2023-03-30",
//         Home: "Golden State Warriors",
//         Away: "Los Angeles Lakers",
//         Type: "Moneyline",
//         Odds: "+140",
//         ML: "GSW",
//         Bet: "$50",
//         Confidence: "8/10",
//         Outcome: "Win",
//     },
// ];

const tableBody = document.querySelector("tbody");
const filters = document.querySelectorAll(".filter-input");
let data;

function createTable() {
    tableBody.innerHTML = "";

    data.sort((a, b) => new Date(b.Date) - new Date(a.Date));

    data.forEach((row) => {
        console.log(row)
        const tr = document.createElement("tr");

        const td1 = document.createElement("td");
        td1.textContent = row.League;
        tr.appendChild(td1)

        const td2 = document.createElement("td");
        td2.textContent = row.Date;
        tr.appendChild(td2)

        const td3 = document.createElement("td");
        td3.textContent = row.Home;
        tr.appendChild(td3)

        const td4 = document.createElement("td");
        td4.textContent = row.Away;
        tr.appendChild(td4)

        const td5 = document.createElement("td");
        td5.textContent = row.Bet_Type;
        tr.appendChild(td5)

        const td6 = document.createElement("td");
        td6.textContent = row.Odds['$numberDouble'];
        tr.appendChild(td6)

        // * ML
        const td7 = document.createElement("td");
        const mlValue = row.ML;

        if (typeof mlValue === 'object' && mlValue.hasOwnProperty('$numberInt')) {
            td7.textContent = parseInt(mlValue['$numberInt']);
        } else if (typeof mlValue === 'object' && mlValue.hasOwnProperty('$numberDouble')) {
            td7.textContent = parseFloat(mlValue['$numberDouble']).toString();
        } else {
            td7.textContent = mlValue.toString();
        }

        tr.appendChild(td7);


        const td8 = document.createElement("td");
        td8.textContent = row.Bet;
        tr.appendChild(td8)

        // * confidence
        const td9 = document.createElement("td");
        const confidenceValue = row.Confidence;

        if (typeof confidenceValue === 'object' && confidenceValue.hasOwnProperty('$numberInt')) {
            td9.textContent = parseInt(confidenceValue['$numberInt']);
        } else if (typeof confidenceValue === 'object' && confidenceValue.hasOwnProperty('$numberDouble')) {
            td9.textContent = parseFloat(confidenceValue['$numberDouble']).toString();
        } else {
            td9.textContent = confidenceValue.toString();
        }

        tr.appendChild(td9);

        const td10 = document.createElement("td");
        td10.textContent = row.Outcome;
        tr.appendChild(td10)

        tableBody.appendChild(tr);
    });
}



fetch('https://data.mongodb-api.com/app/personal-website-app-gfrfw/endpoint/Query_Predictions')
    .then(response => response.json())
    .then(jsonData => {
        data = jsonData;
        createTable();
        filters.forEach((filter) => {
            filter.addEventListener("input", filterData);
        });
    })
    .catch(error => console.error(error));
