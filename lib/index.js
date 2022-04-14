const PublitioAPI = require("publitio_js_sdk").default;

module.exports = {
  init(config) {
    const publitio = new PublitioAPI(config.api_key, config.api_secret);
    return {
      upload(file) {
        return new Promise((resolve, reject) => {
          publitio
            .uploadFile(file.buffer, "file", {
              public_id: file.hash,
              folder: config.folder,
              folder_id: config.folder_id,
              title: file.name,
              description: file.caption,
            })
            .then((data) => {
              if (data.success === false) {
                console.log(data.messagge);
                return;
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
            });
        });
      },
      uploadStream(file) {
        return new Promise((resolve, reject) => {
          publitio
            .uploadFile(file.stream, "file", {
              public_id: file.hash,
              folder: config.folder,
              folder_id: config.folder_id,
              title: file.name,
              description: file.caption,
            })
            .then((data) => {
              if (data.success === false) {
                console.log(data.messagge);
                return;
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
