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

        //define sample and metadata variables
        let sampleValues = result.sample_values.slice(0, 10).reverse();
        let otuLabels = result.otu_labels.slice(0, 10).reverse();
        let otuIds = result.otu_ids.slice(0, 10).reverse();
        let id = metaResult.id;
        let ethnicity = metaResult.ethnicity;
        let gender = metaResult.gender;
        let age = metaResult.age;
        let location = metaResult.location;
        let bbtype = metaResult.bbtype;
        let wfreq = metaResult.wfreq;

        //display metadata in Demographic panel
        // for (const [key, value] of Object.entries(metaResult).splice(0,7).reverse()) {
        //     console.log(`${key}: ${value}`);
        //     d3.select("#sample-metadata").text(`${key}: ${value}`);
        // };

        d3.select("#id").text(`id: ${id}`);
        d3.select("#ethnicity").text(`ethnicity: ${ethnicity}`);
        d3.select("#gender").text(`gender: ${gender}`);
        d3.select("#age").text(`age: ${age}`);
        d3.select("#location").text(`location: ${location}`);
        d3.select("#bbtype").text(`belly btutton type: ${bbtype}`);
        d3.select("#wfreq").text(`wash frequency: ${wfreq}`);


        //bar plot in ascending order
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
        let layout = {
            title: "Grouped by OTU (Bacteria Cluster)"
        };
        let traceData1 = [trace1];
        Plotly.newPlot("bar", traceData1, layout);

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

//update and log
function updateMeta(params) {
    console.log(params);
}
//initialize data on drop-down change
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
//update plots
function optionChanged(params) {
    updateCharts(params);
    updateMeta(params);
};
init();