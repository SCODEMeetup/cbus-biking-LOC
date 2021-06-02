
require('dotenv').config();

// URL for Reports API
export const BIKING_REPORTS_URL = process.env.REACT_APP_BIKING_REPORTS_URL || "http://localhost:4000/api/reports";

export async function postReport(url = '', data = {}) {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'accept': '*/*',
      },
      body: JSON.stringify(data),
    });
    return(response);
  }

export async function getReports(url) {
  const response = await fetch(url) 
  .then(response => {
  if (response.status >= 200 && response.status <= 299)
    return response;
  else 
    throw Error(response.statusText);
  });
  return(response);
}

