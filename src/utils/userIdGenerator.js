const { randomBytes } = require("crypto");
const { User } = require("../models/user.model")
async function id() {
    let userId;
    do {
        const buffer = await new Promise((resolve, reject) => {
            randomBytes(4, (err, buffer) => {
                if (err) reject(err);
                resolve(buffer);
            });
        });
        userId = buffer.readUIntBE(0, 4).toString().padStart(10, '0');
        const existingUser = await User.findOne({ userId });
        if (existingUser) {
            userId = null;
        }
    } while (!userId);
    return userId;
}

module.exports = { genUserId: id };
