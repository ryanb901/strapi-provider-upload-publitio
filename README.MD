# strapi-provider-upload-publitio

## Configurations

See the [using a provider](https://strapi.io/documentation/developer-docs/latest/development/plugins/upload.html#using-a-provider) documentation for information on installing and using a provider.

**Example**

`/config/plugins.js`

If using strapi >= 4.0.0, please use the below config (note V3 or earlier only require the provider name as "publitio"):

```js
module.exports = ({env}) => ({
  upload: {
    config: {
      provider: "strapi-provider-upload-publitio",
      providerOptions: {
        api_key: env("PUBLITIO_KEY"), //REQUIRED
        api_secret: env("PUBLITIO_SECRET"), //REQUIRED
        folder: "FOLDER_NAME",
        folder_id: "Folder ID",
      },
    },
  },
});
```

Strapi V4 also now requires changing default CSP settings middleware in config/middlewares.js:

```js
module.exports = ({env}) => [
  "strapi::errors",
  {
    name: "strapi::security",
    config: {
      contentSecurityPolicy: {
        directives: {
          "script-src": ["'self'", "'unsafe-inline'"],
          "img-src": ["'self'", "data:", "media.publit.io/file/"],
        },
      },
    },
  },
  "strapi::cors",
  "strapi::poweredBy",
  "strapi::logger",
  "strapi::query",
  "strapi::body",
  "strapi::favicon",
  "strapi::public",
];
```

## Links

- [Strapi website](https://strapi.io/)
- [Strapi community on Slack](https://slack.strapi.io)
- [Strapi news on Twitter](https://twitter.com/strapijs)
