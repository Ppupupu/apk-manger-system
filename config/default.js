'use strict';

module.exports = {
  port: 3000,
  //  parseInt(process.env.PORT, 10) ||
  url: 'mongodb://localhost:27017/apkManagerSystem',
  tokenSecret: 'apkmanagersystemNo1',
	// session: {
	// 	name: 'SID',
	// 	secret: 'SID',
	// 	cookie: {
	// 		httpOnly: true,
	//     secure:   false,
	//     maxAge:   365 * 24 * 60 * 60 * 1000,
	// 	}
	// }
}