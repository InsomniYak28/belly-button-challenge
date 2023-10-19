# belly-button-challenge

##Overview and Objective:   

The goal of the project is to create an app with interactive visuals detailing the Belly Button Diversity study conducted at Rob Dunn Labs (link below). 
Each test subject's results are displayed in various various plots, and a drop-down box allows the viewer to select the test subject's id. 

##Files and folders:  

index.html  
samples.json (data used)  
Static/js: --> app.json (content read into html)  


##Technologies and methods:  

File types include html and json, coding languages include html and javascript.  
Data is read in using d3, saved to variables and logged to the console.  
Metadata is displayed by adding text with variables to the html row by id.  
Plotly is used create trace plots of 3 varieties: bar, bubble, and gauge. The bar and bubble graphs display the sample data per test subject's id, and the gauge displays number of times per week the subject washed their belly button.  
A handle function is used to update the plots each time the drop-down box is changed by looping through the IDs.  


##Personal challenges:  

Displaying the metadata in the Demographic panel was challenging. First, I tried using object.entries() in a loop of the metaResults variable to parse the metadata into key and value object pairs, then use the d3 method to display the text. Only one object array would display on the app page. I then created rows within the panel body and simply displayed the variables to each panel row by id. This does work, but it's rigid and repeatative, since the variables could - in theory - change, and a for loop would automatically update any changes. A for loop is also much more efficient.  

The gauge plot was also a struggle, as it has a different plot syntax than the bar and bubble plots. Using square brackets structured the plot, and reading the trace directly into the plot - instead of saving it to a TraceData variable cleared up the issues for me.

Final project link: https://insomniyak28.github.io/belly-button-challenge/  

Data Source: http://robdunnlab.com/projects/belly-button-biodiversity/  

Helpful links: https://plotly.com/javascript/gauge-charts/  
