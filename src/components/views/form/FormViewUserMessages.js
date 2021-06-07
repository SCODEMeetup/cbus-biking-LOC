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

export const CLICK_MAP = 1;
export const COMPLETE_FORM = 2;
export const SUBMIT_SUCCESS = 3;

export const formMessages = new Map();
formMessages.set(1, 'Click on map to add incident location');
formMessages.set(2, 'Complete form with selected location');
formMessages.set(3, 'Incident Report Created');

export const LATITUDE_ERR = 2;
export const LONGITUDE_ERR = 3;
export const DATETIME_ERR = 1;

export const errorMessages = new Map();

errorMessages.set(LATITUDE_ERR, 'Latitude must be number between -90 and 90');
errorMessages.set(LONGITUDE_ERR, 'Longitude must be number between -180 and 180');
errorMessages.set(DATETIME_ERR, 'Invalid datetime: use format mm/dd/yyyy hh:mm am/pm');
