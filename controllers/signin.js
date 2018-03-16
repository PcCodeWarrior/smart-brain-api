/**
 * Created by tom on 3/15/2018.
 */

const handleSignin = (req, res, db, bcrypt) => {

    const { email, password} = req.body;

    //validate incoming data
    if( !email || !password)
        return res.status(400).json('incorrect form submission');

    db.select('email', 'hash')
        .from('login')
        .where('email', '=', email)
        .then(data => {
            const isValid = bcrypt.compareSync(password, data[0].hash);
            if (isValid) {
                return db.select('*').from('users')
                    .where('email', '=', email)
                    .then(user => {
                        res.json(user[0])
                    })
                    .catch(err => res.status(400).json("a problem occured"))
            } else
                res.status(400).json('wrong credentials')
        })
        .catch(err => res.status(400).json("bad login"))
}


module.exports = { handleSignin: handleSignin}