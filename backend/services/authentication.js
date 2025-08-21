const jwt = require('jsonwebtoken');
const UserDB = require('../models/userModel');

const secret = 'upper_case_secret_key';



function generateTokenForUser(user) {
    console.log('profile image is', user.profilePicture)
    const payload = {
        _id: user._id,
        FullName: user.FullName,
        profileImgUrl: user.profilePicture,
        role: user.role,
    };
    const token = jwt.sign(payload, secret, { expiresIn: '1h' });
    //console.log('Generated token:', token);
    return token;
}

function verifyToken(token) {
    try {
        const payload = jwt.verify(token, secret);
        //console.log('banti bhaiya i am here;', payload);
        return payload;
    } catch (error) {
        // console.log('banti bhaiya khel khatm');
        return null;
    }
}

module.exports = {
    generateTokenForUser,
    verifyToken,
};

