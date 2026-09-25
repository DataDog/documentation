<!--
This partial contains advanced configuration instructions for the Unity SDK.
It can be included directly in language-specific pages or wrapped in conditionals.
-->

If you have not set up the Datadog Unity SDK for RUM yet, follow the [in-app setup instructions][1] or see the [RUM Unity setup documentation][2]. Learn how to set up [OpenTelemetry with RUM Unity](#opentelemetry-setup).

### Advanced initialization options

`Custom Endpoint`
: Optional  
**Type**: String  
**Default**: `undefined`  
Send data to a custom endpoint instead of the default Datadog endpoint. This is useful for proxying data through a custom server.

`SDK Verbosity`
: Optional  
**Type**: Enum  
**Default**: `Warn`  
The level of debugging information the Datadog SDK should output. Higher levels output more information. This option is helpful for getting debugging information from the SDK when something is not working as expected, or removing the SDK-related debugging entries from console logs.

`Telemetry Sample Rate`
: Optional  
**Type**: Double  
**Default**: `20`  
The percentage rate at which Datadog sends internal telemetry data. A value of 100 means all telemetry data is sampled and sent to Datadog.

### Automatic view tracking

For setup steps, see [Track Navigation](/real_user_monitoring/setup/enable_rum/track_navigation/?platform=unity).

### Track user actions

For setup steps, see [Track User Interactions](/real_user_monitoring/setup/enable_rum/track_user_interactions/?platform=unity).

### Track resources

For setup steps covering both automatic and manual resource tracking, see [Track Network Requests](/real_user_monitoring/setup/enable_rum/track_network_requests/?platform=unity).

### Track custom errors

For setup steps, see [Track Errors and Crashes](/real_user_monitoring/setup/enable_rum/track_errors/?platform=unity).

## Track custom global attributes

For setup steps, see [Add Custom Context](/real_user_monitoring/enrich_rum_data/add_custom_context/?platform=unity).

## Clear all data

For setup steps, see [Manage Data Collection](/real_user_monitoring/setup/enable_rum/manage_data_collection/?platform=unity).

[1]: https://app.datadoghq.com/rum/application/create
[2]: /real_user_monitoring/application_monitoring/unity/setup/
[3]: /real_user_monitoring/setup/data_collected/?platform=unity
[4]: /real_user_monitoring/setup/enable_rum/track_network_requests/?platform=unity
[5]: /real_user_monitoring/setup/enable_rum/track_navigation/?platform=unity
[6]: /real_user_monitoring/setup/enable_rum/track_user_interactions/?platform=unity
