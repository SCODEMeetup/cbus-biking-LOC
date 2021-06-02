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
formMessages.set(1, 'Click on map to add incident location');
formMessages.set(2, 'Complete form with selected location');
formMessages.set(3, 'Incident Report Created');
formMessages.set(4, 'mm/dd/yyyy hh:mm am/pm');

export const errorMessages = new Map();
errorMessages.set(1, 'invalid datetime: use format mm/dd/yyyy hh:mm am/pm');
errorMessages.set(2, 'latitude must be between -90 and 90');
errorMessages.set(3, 'longitude must be between -180 and 180');
