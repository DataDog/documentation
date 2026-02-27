### Remote Configuration

`DD_REMOTE_CONFIGURATION_ENABLED`
: **Since**: 1.54.0 <br>
**Aliases**: `DD_REMOTE_CONFIG_ENABLED`<br>
**Type**: `boolean`<br>
**Default**: `true`<br>
Enable or disable remote configuration. Also accepts the alias `DD_REMOTE_CONFIG_ENABLED`.

`DD_REMOTE_CONFIG_ENABLED`
: **Since**: 1.54.0 <br>
**Type**: `boolean`<br>
**Default**: `true`<br>
Enables Remote Config polling in the tracer (fetches configuration updates from the remote config endpoint and applies them to subscribed products). Default: true.

`DD_REMOTE_CONFIG_INTEGRITY_CHECK_ENABLED`
: **Since**: 1.54.0 <br>
**Type**: `boolean`<br>
**Default**: `false`<br>
Remote Config: when enabled, performs additional integrity checks when processing remote config responses (TUF metadata/signature validation). Default: false.

`DD_REMOTE_CONFIG_MAX_EXTRA_SERVICES`
: **Since**: 1.54.0 <br>
**Type**: `int`<br>
**Default**: `64`<br>
Remote Config: maximum number of "extra services" (distinct service names) the tracer will include in remote config requests. When the limit is reached, additional services are dropped. Default: 64.

`DD_REMOTE_CONFIG_MAX_PAYLOAD_SIZE`
: **Since**: 1.54.0 <br>
**Type**: `int`<br>
**Default**: `5120`<br>
Remote Config: maximum allowed size (in KiB) of remote config response bodies. Responses larger than this are rejected while parsing. Default: 5120 KiB.

`DD_REMOTE_CONFIG_POLL_INTERVAL_SECONDS`
: **Since**: 1.54.0 <br>
**Type**: `decimal`<br>
**Default**: `5.0`<br>
**Since**: 0.2.0 Sets how often, in seconds, the Datadog Agent is queried for Remote Configuration updates.

`DD_REMOTE_CONFIG_URL`
: **Since**: 1.54.0 <br>
**Type**: `string`<br>
**Default**: N/A<br>
Remote Config: explicit remote config endpoint URL to poll. If unset, the tracer discovers the remote config endpoint from the Datadog Agent features endpoint and uses that discovered URL.
