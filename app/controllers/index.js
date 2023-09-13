const db = require("../models");
const User = db.user;
const Op = db.Sequelize.Op;

// Create and Save a new user
exports.create = (req, res) => {
    try {
                // Validate request
        if ( !req.body.name || !req.body.username || !req.body.gender) {
            res.status(400).send({
                message: "All fields are required!"
            });
        return;
        }

        else if (typeof(req.body.name) != "string") {
        res.status(400).send({
        message: "First name must be a string!"
        });
        return;
        }
        else if (typeof(req.body.username) != "string") {
        res.status(400).send({
        message: "Last name must be a string!"
        });
        return;
        }
        else if (typeof(req.body.gender) != "string") {
        res.status(400).send({
        message: "Gender must be a string!"
        });
        return;
        }


        // Create a user
        const user = {
        name: req.body.name,
        username: req.body.username,
        gender: req.body.gender
        };

        // Save user in the database
        User.create(user)
        .then(user => {
            return res.status(201).json({user},);
          })
          .catch(err => {
            res.status(500).send({
              message:
                err.message || "Some error occurred while creating the user."
            });
          });
    } catch (error){
        return res.status(500).json({
          error: "Error creating user"
        });
};
}

// Find a single User with an id
exports.findOne = (req, res) => {

    const user_id = req.params.user_id;

    User.findOne(
        {
            where: { [Op.or]: [
                { name: { [Op.like]: user_id } },
                {username: { [Op.like]: user_id } },
                {gender: { [Op.like]: user_id } }],
                
            }   }
    )
        .then(data => {
        if (data) {
            res.send(data);
        } else {
            res.status(404).send({
            message: `Cannot find User with id=${user_id}.`
            });
        }
        })
        .catch(err => {
        res.status(500).send({
            message: "Error retrieving User with id=" + user_id
        });
        });
    
};

// Update a User by the id in the request
exports.update = (req, res) => {
    const user_id = req.params.user_id;
    if ( !req.body) {
        res.status(400).send({
            message: "Enter a value"
        });
    return;
    }

    else if (typeof(req.params.user_id) != "string") {
    res.status(400).send({
    message: "Must be a string!"
    });
    return;
    }

    User.update(req.body, {
        where: { [Op.or]: [
            { name: { [Op.like]: user_id } },
            {username: { [Op.like]: user_id } },
            {gender: { [Op.like]: user_id } }],
            
        }   
    })
        .then(num => {
        if (num == 1) {
            res.send({
            message: "User was updated successfully."
            });
        } else {
            res.send({
            message: `Cannot update User with id=${user_id}. Maybe User was not found or req.body is empty!`
            });
        }
        })
        .catch(err => {
        res.status(500).send({
            message: "Error updating User with id=" + user_id
        });
        });
};

// Delete a User with the specified id in the request
exports.delete = (req, res) => {

    const user_id = req.params.user_id;

    User.destroy({
        where: { [Op.or]: [
            { name: { [Op.like]: user_id } },
            {username: { [Op.like]: user_id } },
            {gender: { [Op.like]: user_id } },],
            
        }    
    })
        .then(num => {
        if (num) {
            res.send({
            message: "User deleted successfully!"
            });
        } else {
            res.send({
            message: `Cannot delete User with id=${user_id}. Maybe User was not found!`
            });
        }
        })
        .catch(err => {
        res.status(500).send({
            message: "Could not delete User with id=" + user_id
        });
        });
  
};
 
