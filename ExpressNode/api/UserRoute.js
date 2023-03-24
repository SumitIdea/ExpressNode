module.exports = function (app) {
    var userHandlers = require('../controllers/UserSchemaController');
    // todoList Routes
    app.route('/auth/getProfile')
        .get(userHandlers.loginRequired, userHandlers.profile);
    app.route('/auth/register')
        .post(userHandlers.register);
    app.route('/auth/sign_in')
        .post(userHandlers.sign_in);
    
};

module.exports = function(app) {
    var userContactDetails = require('../controllers/userContact')
    app.route('/contact.html')
    .post(userContactDetails.contact);
}