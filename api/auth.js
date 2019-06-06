// handler to protect all api
const isAuthenticated = (req, res, next) => {
	const authorizationHeader = req.get('Authorization');
		  if(!authorizationHeader) {
				res.status(403).send("Not authenticated");
		  } else {
		  const token = authorizationHeader.replace('Bearer: ', '');
		  if(token != 'End2EndAuthorizationForUser') {
				res.status(403).send("You are not authorized to do this");
			} else {
				next();
			}
	}
}


module.exports = {
  isAuthenticated
}
