<!--
Shared serverless-init configuration step (set required Agent environment variables).
No content_filters required.
-->

After the container is built and pushed to your registry, set the required environment variables for the Datadog Agent:

- `DD_API_KEY`: Your [Datadog API key][1001], used to send data to your Datadog account. For privacy and safety, configure this API key as a secret.
- `DD_SITE`: Your [Datadog site][1002]. For example, {% region-param key="dd_site" code="true" /%}.

For more environment variables, see the [Environment variables](#environment-variables) section on this page.

[1001]: https://app.datadoghq.com/organization-settings/api-keys
[1002]: /getting_started/site/
