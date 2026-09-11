If you are using a cloud CI provider without access to the underlying worker nodes, such as GitHub Actions or CircleCI, configure the library to use the Agentless mode. For this, set the following environment variables:

`DD_CIVISIBILITY_AGENTLESS_ENABLED=true` (Required)
: Enables or disables Agentless mode.<br/>
**Default**: `false`

`DD_API_KEY` (Required)
: The [Datadog API key][101] used to upload the test results.<br/>
**Default**: `(empty)`

Additionally, configure the [Datadog site][102] to which you want to send data.

`DD_SITE` (Required)
: The [Datadog site][102] to upload results to.<br/>
**Default**: `datadoghq.com`<br/>


[101]: https://app.datadoghq.com/organization-settings/api-keys
[102]: /getting_started/site/
