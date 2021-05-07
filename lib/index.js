const PublitioAPI = require("publitio_js_sdk").default;

module.exports = {
  init(providerOptions) {
    const publitio = new PublitioAPI(
      providerOptions.api_key,
      providerOptions.api_secret
    );
    return {
      upload(file) {
        console.log(file);

        publitio
          .uploadFile(file.buffer, "file", {
            public_id: file.hash,
            folder: providerOptions.folder,
            folder_id: providerOptions.folder_id,
            title: file.hash,
            description: file.caption,
          })
          .then((data) => {
            if (data.success === false) {
              console.log("error!!");
              console.log(data);
            }
            console.log(data);
            console.log("done!");
          })
          .catch((error) => {
            console.log(error);
            console.log("ERRRRRROR");
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
