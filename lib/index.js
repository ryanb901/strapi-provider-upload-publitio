const PublitioAPI = require("publitio_js_sdk").default;
const streamifier = require("streamifier");
const fs = require("fs");

module.exports = {
  init(providerOptions) {
    // init your provider if necessary
    const publitio = new PublitioAPI(
      providerOptions.api_key,
      providerOptions.api_secret
    );
    return {
      upload(src) {
        const file = streamifier.createReadStream(`src.buffer`);

        publitio
          .uploadFile(file, "file", {
            title: src.name,
            description: src.caption,
          })
          .then((data) => {
            console.log(data);
          })
          .catch((error) => {
            console.log(error);
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
