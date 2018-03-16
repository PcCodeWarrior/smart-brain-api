/**
 * Created by tom on 3/15/2018.
 */


const Clarifai = require('clarifai');

const app = new Clarifai.App({
    apiKey: 'cda9cc3c98924dd4b66091da62a2e39f'
});

const handleApiCall = (req, res) => {
    app.models
        .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
        .then(data => {
            res.json(data);
        })
        .catch(err => res.status(400).json('unable to work with API'))
}


const handleImage = (req, res, db) => {
    const id = req.body.id;

    db('users')
        .where ('id', '=', id)
        .increment('entries', 1)
        .returning('entries')
        .then(entries => {
            res.json(entries[0]);
        })
        .catch(err => res.status(400).json('error unable to update count'+ id));
}

module.exports = {handleImage: handleImage, handleApiCall: handleApiCall};
