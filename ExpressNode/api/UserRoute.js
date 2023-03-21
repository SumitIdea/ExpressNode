module.exports = function(app) {
    var userHandlers = require('../controllers/UserSchemaController');
    // todoList Routes
    app.route('/auth/getProfile')
        .get(userHandlers.loginRequired, userHandlers.profile);
    app.route('/auth/register')
        .post(userHandlers.register);
   app.route('/auth/sign_in')
        .post(userHandlers.sign_in);
};