# leyline-data
_A Node server to manage the data transactions for the Leyline tabletop inventory app._

## Setup
Clone this project and run either `npm install` or `yarn`.

This project uses a MongoDB instance hosted via mlab.com. You can create your own mlab instance to test this data by following the standard free mlab creation process. Once the instance is created, set up a new _User_ for the database (usually via the _"Users"_ tab on the database home page), and then take note of the URI string displayed at the top of the database's homepage, which might look something like this: `mongodb://<dbuser>:<dbpassword>@ds#12345.mlab.com:12345/DB_NAME`

In the project's `config/` folder, duplicate the `index.sample.js` file and rename it to simply `index.js`. The following values from the above _**example URI string**_ will correspond with the values in the `config/index.js` file:
```
module.exports = {
  dbUser: '<dbuser>',
  dbPassword: '<dbpassword>',
  ds: 'ds#',
  mlabPort: 12345,
  mlabDBName: 'DB_NAME',
}
```
Replace these example values with the ones that match _**your own mlab URI string**_. The values for `<dbuser>` and `<dbpassword>` will be the username and password you had recently created through your new database's _"Users"_ tab.

_At this stage of development, this is all that is required to setup and run this project_
