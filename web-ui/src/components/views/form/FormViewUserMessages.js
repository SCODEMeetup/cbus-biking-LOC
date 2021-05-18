export const incidentTypes = new Map();
incidentTypes.set(1, 'Near Miss');
incidentTypes.set(2, 'Crash');
incidentTypes.set(3, 'Roadway Obstruction');
incidentTypes.set(4, 'Hazardous Area');

export const incidentSeverities = new Map();
incidentSeverities.set(1, 'No Apparent Injury');
incidentSeverities.set(2, 'Possible Injury');
incidentSeverities.set(3, 'Suspected Minor Injury');
incidentSeverities.set(4, 'Suspected Serious Injury');
incidentSeverities.set(5, 'Fatal Injury');

export const formMessages = new Map();
formMessages.set(1, 'Click on map to add incident location to form below');
formMessages.set(2, 'Complete the form below with the selected location');
formMessages.set(3, 'Incident Report Created');
formMessages.set(4, 'mm/dd/yyyy hh:mm am/pm');

export function datetimeInputTip() {
    try {
      // test whether a new datetime-local input falls back to a text input or not
      var test = document.createElement('input');

      test.type = 'datetime-local';
    } catch (e) {
      console.log(e.description);
    }
    if (test.type === "text")
      return(formMessages.get(4));
    else
       return('');
  }
