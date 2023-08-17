//api url
const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"

//function updateCharts
function updateCharts(sample) {
    console.log(sample);

    //iterate through sample and metadata, store as sampleNames and metaData respectively
    d3.json(url).then(function (data) {
        let sampleNames = data.samples;
        let metaNames = data.metadata;

        let sampleName = sampleNames.filter(x => x.id == sample);
        let metaName = metaNames.filter(x => x.id == sample);
        console.log(metaName);
        console.log(sampleName);

        let result = sampleName[0];
        let metaResult = metaName[0];
        console.log(metaResult);
        console.log(result);

        //define sample and metadata.wfreq variables
        let sampleValues = result.sample_values.slice(0, 10).reverse();
        let otuLabels = result.otu_labels.slice(0, 10).reverse();
        let otuIds = result.otu_ids.slice(0, 10).reverse();
        let wfreq = metaResult.wfreq;
        
        //key-value for metadata
        Object.entries(metaNames).forEach(([key, value]) => {
            console.log(`${key} ${value}`);
          });

        //bar plot
        let trace1 = {
            x: otuIds,
            y: sampleValues.map(x => `OTU ${x}`),
            type: "bar",
            orientation: "h",
            text: otuLabels,
            title: "Grouped by OTU (Bacteria Cluster)",
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

        //BONUS gauge plot
        let trace3 = [
            {
                value: wfreq,
                title: {'text': "Washing Frequency - times per week" },
                type: "indicator",
                mode: "gauge+number",
                gauge: {axis:{range: [0, 9]},
                }
                
              }
        ];
        Plotly.newPlot("gauge", trace3);
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