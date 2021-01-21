'use strict';
module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV1,
            primaryKey: true
        },
        username: {type: DataTypes.STRING, allowNull: false},
        hash: {type: DataTypes.STRING, allowNull: false},
        firstName: {type: DataTypes.STRING, allowNull: false},
        lastName: {type: DataTypes.STRING, allowNull: false},
        email: {type: DataTypes.STRING, allowNull: false},
        street: {type: DataTypes.STRING, allowNull: false},
        houseNumber: {type: DataTypes.STRING, allowNull: false},
        PLZ: {type: DataTypes.STRING, allowNull: false},
        city: {type: DataTypes.STRING, allowNull: false}
    }, {});
    User.associate = (models) => {
    };

    User.sync().then(function() {
        console.log('User table successfully'); 
    }, function(err) {
        console.error('An error occurred while creating table : ' + err.stack);
    });


    return User;
};