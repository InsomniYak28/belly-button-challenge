//api url
const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"

//function updateCharts
function updateCharts(sample) {
    console.log(sample);

    //iterate through sample data, store as sampleNames
    d3.json(url).then(function (data) {
        let sampleNames = data.samples;

        let sampleName = sampleNames.filter(x => x.id == sample);
        console.log(sampleName);
        let result = sampleName[0];
        console.log(result);

        //define sample variables
        let sampleValues = result.sample_values.slice(0, 10).reverse();
        let otuLabels = result.otu_labels.slice(0, 10).reverse();
        let otuIds = result.otu_ids.slice(0, 10).reverse();

        //bar plot
        let trace1 = {
            x: otuIds,
            y: sampleValues.map(x => `OTU ${x}`),
            type: "bar",
            orientation: "h",
            text: otuLabels,
            transforms: [{
                type: 'sort',
                target: 'x',
                order: 'ascending'
            }]
        };
       
        let traceData1 = [trace1];
        Plotly.newPlot("bar", traceData1);

        //bubble plot
        let trace2 = {
            type: "scatter",
            x: otuIds,
            y: sampleValues.map(x => `OTU ${x}`),
            text: otuLabels,
            mode: "markers",
            marker: {
                color: otuIds,
                opacity: 0.5,
                size: sampleValues
            }
        };

        let traceData2 = [trace2];
        Plotly.newPlot("bubble", traceData2);


        //iterate through metadata and save as metaData
        let metaData = data.metadata;
        let meta = metaData.filter(x => x.id == sample);
        console.log(meta);
        let results = meta[0];
        console.log(results);

        //define metadata variables
        let id = results.id;
        let ethnicity = results.ethnicity;
        let gender = results.gender;
        let age = results.age;
        let location = results.location;
        let bbtype = results.bbtype;
        let wfreq = results.wfreq;

        //BONUS gauge plot
        let trace3 = [
            {
                //domain: { x: [0, 1], y: [0, 1] },
                value: wfreq,
                title: { text: "Washing Frequency - times per week" },
                type: "indicator",
                mode: "gauge+number",
                gauge: {axis:
                    {range: [null, 9]},
                    steps: [                        
                    {range: [null,2], color: "white"},
                    {range: [2,4], color: "yellow"},
                    {range: [4,6], color: "lightgreen"},
                    {range: [7,9], color: "green"}]
                }
                
              }
        ];
        let traceData3 = [trace3];
        Plotly.newPlot("gauge", traceData3);

        //#sample-metadata, create ol, add metadata variables to ol as li


    });
}

//update and initialize
function updateMeta(params) {
    console.log(params);
}
function init() {
    let dropDown = d3.select("#selDataset");

    d3.json(url).then(function (data) {

        let dropNames = data.names;
        console.log(dropNames);
        for (let i = 0; i < dropNames.length; i++) {
            dropDown.append("option").text(dropNames[i]).property("value", dropNames[i]);
        }
        updateCharts(dropNames[0]);
    });
}

function optionChanged(params) {
    updateCharts(params);
    updateMeta(params);
};
init();