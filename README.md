# Crime Map

**Objectives:**
- Integrate Google API Map
- Integrate [SF Police Department](https://data.sfgov.org/Public-Safety/Police-Department-Incident-Reports-2018-to-Present/wg3w-h783) onto the Google Map
- View a certain number of crime at a certain spot on the map at a time.
    - Default 100 crime reports
    - Range of 1000 meter from center of map
- Filter out crime report by year, category, etc
- Comment on selected crime report
- View Comments

![](Screenshot.png)

**Coding Languages and Usages**

Python
- Connection to url routes
- Interaction with Database and Front End 

JavaScript
- Interaction between users and the Google Map API
- Construction of the visual effect and markers on the Google map

HTML and CSS
- Designing the Front End
- Customize style onto elements 

**Database**

- MySQL

**Features**
- Filter by:
    - incident number
    - neighborhood
    - year
    - category
    - police district
- Dark mode map
- Heat map
- Pan and zoom will refresh a set of report 1000 meter from center of map

**Requirement**
Need a JavaScript Google Map API key inside an .env file called GOOGLE_MAP_API
Will become an variable called api inside /flask_app/controllers/map.py