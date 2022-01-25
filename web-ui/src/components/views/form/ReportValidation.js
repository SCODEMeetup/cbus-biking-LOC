import { LATITUDE_ERR, LONGITUDE_ERR, DATETIME_ERR, DATETIME_IN_FUTURE_ERR } from './FormViewUserMessages';

export function validateReport(report) {
    if(report.lat < -90 || report.lat > 90 || isNaN(report.lat) || report.lat === '')
      return LATITUDE_ERR;
    if(report.long < -180 || report.long > 180 || isNaN(report.long) || report.long === '')
      return LONGITUDE_ERR;
    if(report.incident_datetime === "invalid datetime")
      return DATETIME_ERR;
    if(report.incident_datetime === "datetime in future")
      return DATETIME_IN_FUTURE_ERR;
    return 0;
  }

