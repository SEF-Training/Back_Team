const fs = require('fs');
const { infoLogger } = require('../services/infoLoggerService');
async function deleteFile(path) {
  await fs.promises.unlink(path);
  infoLogger.info(`Image ${path} was successfully deleted`);
}

const deleteUploadedFile = async function () {
  const imageFields = ['profileImage', 'coverImage', 'image', 'certificate_file', 'companyLogo', 'cover', 'cv'];
  let foundImageField = null;
  
  try {
    const update = this.getUpdate() || {};
    const doc = await this.model.findOne(this.getQuery());
    
    if (!doc) return;

    for (const field of imageFields) {
      if (doc[field] && field in update && update[field] !== null) {
        foundImageField = field;
        break;
      }
    }
    // const doc = await this.model.findOne(this.getQuery());
    // if (!doc) return;

    // for (const field of imageFields) {
    //   if (doc[field] && field in this.getUpdate() && this.getUpdate()[field] !== null) {
    //     foundImageField = field;
    //     break;
    //   }
    // }

    if (foundImageField) {
      let path = `src/uploads/${doc[foundImageField]}`;
      await deleteFile(path);
    }
  } catch (err) {
    console.error('Error deleting old image:', err);
  }
};

module.exports = { deleteUploadedFile };