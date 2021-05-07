const PublitioAPI = require("publitio_js_sdk").default;
const { errors } = require("strapi-plugin-upload");

module.exports = {
  init(providerOptions) {
    const publitio = new PublitioAPI(
      providerOptions.api_key,
      providerOptions.api_secret
    );
    return {
      upload(file) {
        return new Promise((resolve, reject) => {
          publitio
            .uploadFile(file.buffer, "file", {
              public_id: file.hash,
              folder: providerOptions.folder,
              folder_id: providerOptions.folder_id,
              title: file.name,
              description: file.caption,
            })
            .then((data) => {
              if (data.success === false) {
                console.log(data.messagge);
                return reject(errors.unknownError(data.message));
              }
              file.url = data.url_short;
              file.provider_metadata = {
                id: data.id,
                public_id: data.public_id,
                resource_type: data.type,
              };
              resolve();
            })
            .catch((error) => {
              console.log(error);
              return reject(errors.unknownError(data.message));
            });
        });
      },
      async delete(file) {
        await publitio
          .call(`/files/delete/${file.provider_metadata.id}`, "DELETE")
          .then((data) => {
            console.log(`${data.code}: ${data.message}`);
          })
          .catch((error) => {
            console.log(error);
          });
      },
    };
  },
};
