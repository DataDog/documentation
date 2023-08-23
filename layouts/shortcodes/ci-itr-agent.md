#### Additional Datadog Agent configuration

In addition to the [Datadog API Key][101], the [Datadog Application key][102] must be specified in the [Agent Configuration File][103]

`app_key` (Required)
: The [Datadog Application key][102] used to query the tests to be skipped.<br/>
**Default**: `(empty)`

`api_key` (Required)
: The [Datadog API key][101] used to upload the test results.<br/>
**Default**: `(empty)`

[101]: https://app.datadoghq.com/organization-settings/api-keys
[102]: https://app.datadoghq.com/organization-settings/application-keys
[103]: /agent/guide/agent-configuration-files
