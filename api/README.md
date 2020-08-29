# Cbus Biking Locations API

API that exposes reports from cyclists including location and description of the incident

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

## Start the API application server

<pre>rails s</pre>

This will start the application server on your localhost at port 3000. When running the ui, you may need to run on a different port:

<pre>rails s -p {port}</pre>

## Using the API

1. POST a report

   http://localhost:3000/api/reports/

   Example JSON body
<pre>
   {
      "lat": "41.333",
      "long": "-80.231",
      "reason": "crash"
   }
</pre>
2. GET a report by ID

   http://localhost:3000/api/reports/1

   Example Response:

<pre>
   {
     "id": 1,
     "lat": 39.9846,
     "long": -82.9192,
     "reason": "crash",
     "created_at": "2020-08-05T16:12:38.892Z",
     "updated_at": "2020-08-05T16:12:38.892Z"
   }
</pre>

3. GET all reports

   http://localhost:3000/api/reports
