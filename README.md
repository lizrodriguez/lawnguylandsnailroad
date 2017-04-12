Lawn Guyland Snail Road - A LIRR timetable clone using the MTA and OpenWeather APIs.
Project 2 for GA - WDI
Liz Rodriguez

[[https://github.com/lizrodriguez/lawnguylandsnailroad/blob/master/other_files/screenshot.png|alt=screenshot]]

This app uses node.js with express, mustache for templating, and postgres for a local database.
Bcrypt was used to hash signup password for authentication.

Snail logo is from  https://pixabay.com
OpenWeather API used to grab weather in the nav bar: http://openweathermap.org/api
MTA's actual API is not functional, so I've used the public URL api to retrieve the LIRR train JSON. http://datamine.mta.info/

My approach for this project was to make a basic version of the LIRR timetable, with a mini weather forecast for New York City for convenience. Users can register for an account, update, and delete an account.

The feature I wanted to add is to save a favorite route to the user account. Currently in progress.
