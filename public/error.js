/* eslint-disable max-classes-per-file */
module.exports.UserExistsError = class UserExistsError extends Error {
    constructor(email) {
        super(`User with email ${email} already exists.`);
    }
}
module.exports.NoSuchUserError = class NoSuchUserError extends Error {
    constructor(email) {
        super(`User with email ${email} does not exist.`);
    }
}

module.exports.WrongPasswordError = class WrongPasswordError extends Error {
    constructor(email) {
        super(`Wrong password for user with email ${email}.`);
    }
}
module.exports.DuplicateKey = class DuplicateKey extends Error {
    constructor(key) {
        super(`${key} exist liao!!!!`);
    }
}

