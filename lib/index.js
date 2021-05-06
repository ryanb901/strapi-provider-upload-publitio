const PublitioAPI = require("publitio_js_sdk").default;
const intoStream = require("into-stream");
const fs = require("fs");

module.exports = {
  init(providerOptions) {
    const publitio = new PublitioAPI(
      providerOptions.api_key,
      providerOptions.api_secret
    );
    return {
      upload(file) {
        return new Promise((resolve, reject) => {
          const upload_stream = publitio
            .uploadFile(file.buffer)
            .then((data) => {
              console.log(data);
              console.log("done!");
              resolve();
            })
            .catch((error) => {
              console.log(error);
              console.log("ERRRRRROR");
              reject();
            });
          intoStream(file.buffer).pipe(upload_stream);
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
