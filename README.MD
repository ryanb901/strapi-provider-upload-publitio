# strapi-provider-upload-publitio

## Configurations

See the [using a provider](https://strapi.io/documentation/developer-docs/latest/development/plugins/upload.html#using-a-provider) documentation for information on installing and using a provider. And see the [environment variables](https://strapi.io/documentation/developer-docs/latest/setup-deployment-guides/configurations.html#environment-variables) for setting and using environment variables in your configs.

**Example**

`/config/plugins.js`

```js
module.exports = ({ env }) => ({
  upload: {
    provider: "publitio",
    providerOptions: {
      api_key: env("PUBLITIO_KEY"), //REQUIRED
      api_secret: env("PUBLITIO_SECRET"), //REQUIRED
      folder: "FOLDER_NAME",
      folder_id: "Folder ID",
    },
  },
});
```

## Links

- [Strapi website](https://strapi.io/)
- [Strapi community on Slack](https://slack.strapi.io)
- [Strapi news on Twitter](https://twitter.com/strapijs)
