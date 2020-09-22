# Cbus Biking Locations API

API that exposes reports from cyclists including location and incident information

Built an deployed using the Ruby on Rails framework.

## Prerequisites

1. [Ruby 2.5.8/Rails](https://bitnami.com/stack/ruby/installer)
2. [Bundler](https://bundler.io/)
3. [MySQL 8.0.x](https://dev.mysql.com/doc/refman/8.0/en/installing.html)

Note: The api connects to the local development MySQL server using the root user id and no password.

## API application Initialization

After cloning the repo, navigate to /cbus-biking-LOC/api and enter:

bundle install

## Database Initialization

1. Navigate to /cbus-biking-LOC/api

2. To create the development database on your MySQL server enter:

   rake db:create

   This creates the database from /cbus-biking-LOC/api/config/database.yml

3. To create the reports table in your development database enter:

   rake db:schema:load

   This loads the schema from /cbus-biking-LOC/api/db/schema.rb

4. To seed the reports table with some sample data enter:

   rake db:seed

   This loads seed data from /cbus-biking-LOC/api/db/seeds.rb

5. To run db:create, db:schema:load, and db:seed with one command enter:

   rake db:setup


## Start the API application server

<pre>rails s</pre>

This will start the application server on your localhost at port 3000. When running the ui, you may need to run on a different port:

<pre>rails s -p {port}</pre>

## Database deletion and reset

1. To drop the database enter:

   rake db:drop

2. To run db:drop and db:setup with one command enter:

   rake db:reset

## Using the Reports API endpoint

**Important**: The database must be seeded by running rake db:seed or rake db:setup before using the reports endoint.  This is because the reports endpoint depends on incident_reports and incident_severities files being populated before a Report resource can be created.  More on this below.

1. POST a report

   http://localhost:3000/api/reports/

   Example JSON body
<pre>
   {
      "lat": 39.9846,
      "long": -82.9192,
      "incident_datetime": "2020-09-19T21:44:42.000Z",
      "incident_text": "loreem ipsum ...",
      "incident_type_id": "1",
      "incident_severity_id": "2"
   }
</pre>

required params(lat:float, long:float, incident_datetime:string, incident_type_id:int, incident_severity_id:int)

Status codes: 

201 Created, 422 Unprocessable Entity.

A 422 will include one or more validation error messages in the response body.  For example:

   {
      {
      "incident_datetime": [
        "must be ISO 8601 UTC, e.g., 2020-09-11T21:44:42Z"
      ]
      }
   }

Notes:

incident_type_id and incident_severity_id are foreign keys in the incident_types and incident_severity tables, respectively.

incident_datetime is an iso 8601 datetime string that is stored in UTC (indicated by the trailing Z)in the database.  If the incident_datetime indicates another timezone, e.g., "2020-09-19T21:44:42.-04:00" (ET DST), it will be converted to UTC by the server to "2020-09-20T01:44:42.000Z". 

The minimum form of a valid iso 8601 datetime is YYYY-MM-DD which fills in hours, minutes and seconds with zeros on the server, e.g, 2020-10-01T00:00:00.000Z.

https://en.wikipedia.org/wiki/ISO_8601


2. GET a report by ID

   http://localhost:3000/api/reports/49

   Example Response:

<pre>
   {
      "id": 49,
      "lat": 39.9846,
      "long": -82.9192,
      "incident_datetime": "2020-09-19T21:44:42.000Z",
      "incident_text": "loreem ipsum ...",
      "created_at": "2020-09-18T19:57:59.197Z",
      "incident_type": {
         "id": 1,
         "description": "Near Miss"
      },
      "incident_severity": {
         "id": 2,
         "description": "Possible Injury"
      }
   }
</pre>

Status Codes:

200 OK, 404 Record Not Found 

Notes:

incident_type includes both the modal selection number (id) and the incident_type description, "Near Miss".  The incident_type endpoint allows for modifying the description without modifying the id (PATCH/PUT).

3. GET all reports

http://localhost:3000/api/reports

Status Codes:

200 OK, 404 Record Not Found

4. DELETE a report
  
   http://localhost:3000/api/reports/49

Status Codes:

204 No Content, 404 Record Not Found

## Using the incident_types and incident_severities endpoints

These endpoints support all of the HTTP request methods listed above in addition to the PUT/PATCH request methods.  Both the PUT and PATCH methods result in the same results, updating the description field while retaining the row and its id.  This allows for keeping the id in line with the modal selections if desirable.

1. PUT/PATCH an incident_type (same applies for incident_severity)

   http://localhost:3000/api/incident_types/1

   Example JSON request body:
<pre>
   {
      "description": "modified_description"
   }
</pre>

required params(description:string)

Status Codes:

204 No Content, 404 Record Not Found, 422 Unprocessible Entity

A 422 will include one or more validation error messages in the response body.  Currently only applies to desctiption:
<pre>
   {
    "description": [
        "can't be blank"
    ]
   }
</pre>

2. DELETE an incident_type or incident_severity

Deleting an incident_type or incident_severity that a report resource is dependent on will return an error.  For example:

   http://localhost:3000/api/incident_severities/2

   where an existing report has an incident_severity_type of 2 will return the following response body:

   {
      "status": 409,
      "error": "conflict",
      "message": "Cannot delete record because of dependent reports"
   }

Status Codes:

204 No Content, 404 Record Not Found, 409 Conflict


   







   
