const conn = require('../database/connection');

module.exports = {
  signinOrSignup: (req, res) => {

    console.log(req.query.email);

    req.session.userid = 1;

    console.log(`[SESSION]${req.session.userid}`);

    res.redirect(`${process.env.CLNT_ORIGIN}/spaces`);





  }
}