### Remote Configuration

`DD_REMOTE_CONFIGURATION_ENABLED`
: **Aliases**: `DD_REMOTE_CONFIG_ENABLED`<br>
**Type**: `boolean`<br>
**Default**: `true`<br>
Enable or disable remote configuration. Also accepts the alias `DD_REMOTE_CONFIG_ENABLED`.

`DD_REMOTE_CONFIG_BOOT_TIMEOUT_SECONDS`
: **Type**: `decimal`<br>
**Default**: `1.0`<br>
Startup timeout for Remote Configuration; if exceeded, the application proceeds using local configuration.

`DD_REMOTE_CONFIG_POLL_INTERVAL_SECONDS`
: **Type**: `decimal`<br>
**Default**: `5.0`<br>
**Since**: 0.2.0 Sets how often, in seconds, the Datadog Agent is queried for Remote Configuration updates.
