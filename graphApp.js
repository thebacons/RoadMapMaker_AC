const axios = require('axios');
const accessToken = '81566582-9874-4885-a19d-86e31c0e2f55'; // Replace with your access token

// Create a new Excel file
axios.post('https://graph.microsoft.com/v1.0/me/drive/root/children', {
    name: 'NewFile.xlsx',
    '@microsoft.graph.conflictBehavior': 'rename',
    file: {}
}, {
    headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
    }
}).then(response => {
    const fileId = response.data.id;

    // Write data to the Excel file
    axios.patch(`https://graph.microsoft.com/v1.0/me/drive/items/${fileId}/workbook/worksheets('Sheet1')/range(address='A1:B2')`, {
        values: [[ 'Hello', 'World' ]]
    }, {
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
        }
    }).then(() => {
        // Format cells in the Excel file
        axios.patch(`https://graph.microsoft.com/v1.0/me/drive/items/${fileId}/workbook/worksheets('Sheet1')/range(address='A1:B2')/format`, {
            fill: {
                color: 'FFFF00'
            }
        }, {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            }
        }).catch(error => console.error(error));
    }).catch(error => console.error(error));
}).catch(error => console.error(error));