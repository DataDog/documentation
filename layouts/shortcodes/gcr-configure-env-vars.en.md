After the container is built and pushed to your registry, set the required environment variables for the Datadog Agent:

- `DD_API_KEY`: Datadog API key, used to send data to your Datadog account. It should be configured as a Google Cloud Secret for privacy and safety.
- `DD_SITE`: Datadog endpoint and website. Select your site on the right side of this page.

For more environment variables and their function, see [Environment Variables](#environment-variables).

The following command deploys the service and allows any external connection to reach it. In this example, your service listening is set to port 8080. Ensure that this port number matches the exposed port inside of your Dockerfile.

```shell
gcloud run deploy &lt;APP_NAME&gt;
  --image=gcr.io/&lt;YOUR_PROJECT&gt;/&lt;APP_NAME&gt; \
  --port=8080 \
  --update-env-vars=DD_API_KEY=$DD_API_KEY \
  --update-env-vars=DD_SITE=$DD_SITE \
```

### Environment variables

| Variable | Description |
| -------- | ----------- |
| `DD_API_KEY` | [Datadog API key][1] - **Required**|
| `DD_SITE` | [Datadog site][2] - **Required** |
| `DD_LOGS_ENABLED` | When true, send logs (stdout and stderr) to Datadog. Defaults to false. |
| `DD_SERVICE`      | See [Unified Service Tagging][3].                                  |
| `DD_VERSION`      | See [Unified Service Tagging][3].                                  |
| `DD_ENV`          | See [Unified Service Tagging][3].                                  |
| `DD_SOURCE`       | See [Unified Service Tagging][3].                                  |
| `DD_TAGS`         | See [Unified Service Tagging][3].                                  |


[1]: /account_management/api-app-keys/#api-keys
[2]: /getting_started/site/
[3]: /getting_started/tagging/unified_service_tagging/
