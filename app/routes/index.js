module.exports = app => {
    const router = require("express").Router();
    const controller = require('../controllers/index')

    router.get('/:user_id', controller.findOne );

    router.post('/', controller.create);

    router.delete('/:user_id', controller.delete);

    router.put('/:user_id', controller.update);

    app.use('/api', router);

}
