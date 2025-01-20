const withAuth = (req, res, next) => {
    // Redirect to login if the user is not authenticated
    if (!req.session.logged_in) {
      return res.redirect('/login');
    }
    next();
  };
  
  module.exports = withAuth;