const axios = require('axios');

exports.handler = async function(event, context) {
  const payload = JSON.parse(event.body);
  let startDate = new Date(payload.start_date);
  let endDate = new Date(payload.end_date);
  const showWeekends = payload.show_weekends;

  // Format the dates in 'MM.dd.yyyy' format
  startDate = startDate.toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' }).replace(/\//g, '.');
  endDate = endDate.toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' }).replace(/\//g, '.');

  try {
    const powerAutomateResponse = await axios.post('https://prod-88.westeurope.logic.azure.com:443/workflows/41be04cd95bb4b529039fe545c3c17b2/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=SZ3NguX75sjoqc8hUIKuGExHc9xizXJwOyzkozttB7E', {
      startDate: startDate,
      endDate: endDate,
      showWeekends: showWeekends
    });

    const roadmapurl = powerAutomateResponse.data;

    return {
      statusCode: 200,
      body: JSON.stringify({ roadmapurl: roadmapurl })
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: 'An error occurred while triggering the Power Automate flow.'
    };
  }
}