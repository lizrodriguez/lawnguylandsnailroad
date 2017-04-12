Lawn Guyland Snail Road - A LIRR timetable clone using the MTA and OpenWeather APIs.

This app uses node.js with express, mustache for templating, and postgres for a local database.
Bcrypt was used to hash signup password for authentication.

Snail logo is from  https://pixabay.com.
OpenWeather API used to grab weather in the nav bar: http://openweathermap.org/api
MTA's actual API is broken, so I have used the public URL api to retrieve the LIRR train JSON. http://datamine.mta.info/

My approach for this project was to make a basic version of the LIRR timetable, with a mini weather forecast for New York City for convenience.

The feature I wanted to add is to save a favorite route to the user account, but didn't finish. I plan to add this in the future.
