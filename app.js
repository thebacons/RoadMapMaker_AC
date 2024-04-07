const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const axios = require('axios'); // You'll need to install this package

const app = express();
app.use(bodyParser.json());

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.static(__dirname));

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.post('/trigger', async (req, res) => {
    let startDate = new Date(req.body.start_date);
    let endDate = new Date(req.body.end_date);
    const showWeekends = req.body.show_weekends;

    // Format the dates in 'MM.dd.yyyy' format
    startDate = startDate.toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' }).replace(/\//g, '.');
    endDate = endDate.toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' }).replace(/\//g, '.');

    try {
        const powerAutomateResponse = await axios.post('https://prod-88.westeurope.logic.azure.com:443/workflows/41be04cd95bb4b529039fe545c3c17b2/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=SZ3NguX75sjoqc8hUIKuGExHc9xizXJwOyzkozttB7E', {
            startDate: startDate,
            endDate: endDate,
            showWeekends: showWeekends
        });

        console.log(powerAutomateResponse.data); // Log the complete JSON string
        //console.log(powerAutomateResponse); // Log the complete JSON string

        const roadmapurl = powerAutomateResponse.data;
        //const filename = powerAutomateResponse.data.filename;

        //res.json({ roadmapurl: roadmapurl, filename: filename });
        res.json({ roadmapurl: roadmapurl});
    } catch (error) {

        console.error(error);
        res.status(500).send('An error occurred while triggering the Power Automate flow.');
    }
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});