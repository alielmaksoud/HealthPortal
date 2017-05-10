# HealthPortal

## App Description

### This repo is created for the code challenge by Baleen.io.

![HealthPortal](/screenshots/screenshot.jpg?raw=true "Screenshot of Landing Page")

The app is built with React.js and Redux for front-end and Node.js for the back-end. 

The back-end can interface with a remote PostgresSQL database on AWS. 


More development info can be view on Built With Section.

The example CSV file is also uploaded for the purpose of displaying data and testing the app.

The app provides users a landing page to log in. As in the task requirement, a fake login part presents on a landing page.

A doctor gives his/her ID and hits send, which will trigger the fake sign in procedure. If the ID exists in our database, his/her patient data will be returned and the app will go to his/her profile page (/dashboard/:doctor_id).

The profile page is dashboard style with all of a doctor's patient data as charts. The last 10 data in the database is fetched for each patient.

Each chart area consists of a title with patient name and ID, charts title (in our case, "Temperature and Heart Rate"), and the chart itself.

Each chart has its legend on the top of the chart,  X, Y axis, and data presented as sparklines.

Each chart area is draggable and zoomable. For convenience, I set the width of each chart area to the full width of the page. But generally, it's configurable. 

Two data shows up in the chart, temperature and heart rate in red and black.

Each data point is interactive. When a user hovers one of it, a tooltip will show up with more details of it.

When a user clicks on the chart area, more data of this patient will be fetched, and the app will go to the patient page (/dashboard/:doctor_id/:patient_id).


On the patient page, the user can see the name and ID of the patient he/she just selected. And below that, it's a chart with all of the data of this particular patient.

The chart is roughly the with charts in the dashboard with a few differences. 

First, all data of the patient is on the chart.
 
Second, with the control of the below checkbox, the user can view the average of the data as a dotted mark line.


As in the task requirement, an admin app is created as well (at /admin). No authentication is created, and currently, we can access it by typing the URL.


When an admin at the admin page, a list of available databases will be listed in the left navigation menu. By default, no database is selected.

When the admin clicks any of the databases, first 25 rows of data will be returned and displayed in a table on the right. Currently, show more data is not implemented and admin can only see a database at a time.

The data table is sortable and filterable. The small area under each column is the sort button for each column. Admin can sort the data in the descendent or ascendant manner by number or by word.

The input box for each column is the filter input box. It will automatically filter as admin types.

Currently, admin can only read the database data. CREATE, UPDATE AND DELETE functionalities are still under development. Because they are in the task requirement, they will be finished.


## Getting Started

* Get the project from Github

	```git clone https://github.com/lianliu/HealthRecord.git HealthPortal```

* Install the dependencies

	```cd HealthPortal && npm install```

* Run the front-end from one terminal

	```npm start```

* Run the back-end
	
	```cd server && node index```

	if you use nodemon

	```cd server && nodemon index```

* open your browser and go to localhost:8080

## Deployment

Currently, deployment is not provided. More information can be viewed in Todo Section.

## Built With

* [React](https://facebook.github.io/react/) - a Javascript Library for Building User Interfaces
* [Redux](http://redux.js.org/) - State Management
* [Node](https://nodejs.org) - a Javascript Runtime
* [Express.js](http://expressjs.com) - The Web Framework
* [PostgreSQL](https://rometools.postgresql.com) - Database
* [pg-promise](https://github.com/vitaly-t/pg-promise) - Promise/A+ interface for PostgreSQL
* [react-table](https://github.com/tannerlinsley/react-table) - React Table Library
* [echarts-for-react](http://git.hust.cc/echarts-for-react/#/?_k=x9q95c) - React Chart Library
* [react-router](https://reacttraining.com/react-router/) - Front-end Router
* [react-grid-layout](https://github.com/STRML/react-grid-layout) - a Draggable and Resizeable Grid Library for React

## Todos

* ~~Admin CREATE, UPDATE, DELETE functionality APIs~~

* Admin able to CREATE, UPDATE, DELETE

* UI Abstraction

* Better back-end routes design

* ~~Page loading animation~~

* Performance

* ~~Page Design~~

## Authors

* **Lian Liu** - *Personal Blog* - [lianliu22](http://lianliu22.com)

## Acknowledgments

* Hat tip to anyone who's code was used
