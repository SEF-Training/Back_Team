const fs = require('fs');
const { infoLogger } = require('../services/infoLoggerService');
async function deleteFile(path) {
    await fs.promises.unlink(path);
    infoLogger.info(`image ${path} was successfully deleted`)
}
const deleteUploadedFile = async function () {
    const imageFields = ['profileImage', 'coverImage', 'image', 'certificate_file','companyLogo', 'cover','cv'];
    let foundImageField = null;
    try {
        const doc = await this.model.findOne(this.getQuery());
        if(!doc) return
        for (const field of imageFields) {
            if (doc[field]) {
                foundImageField = field;
                break;
            }
        }
        if (doc[foundImageField]) {
            let path = `src/uploads/${doc[foundImageField]}`
            await deleteFile(path);
        }
    } catch (err) {
        console.error('Error deleting old image:', err);
    }
};
module.exports = { deleteUploadedFile }