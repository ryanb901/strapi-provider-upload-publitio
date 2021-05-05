const PublitioAPI = require("publitio_js_sdk").default;

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
              title: file.name,
              description: file.caption,
            })
            .then((data) => {
              console.log(data);
              resolve();
            })
            .catch((error) => {
              console.log(error);
              return reject(error);
            });
        });
      },
      delete(file) {
        publitio
          .call("/files/delete/" + file.public_id, "DELETE")
          .then((data) => {
            console.log(data);
          })
          .catch((error) => {
            console.log(error);
            console.log(file);
          });
      },
    };
  },
};
