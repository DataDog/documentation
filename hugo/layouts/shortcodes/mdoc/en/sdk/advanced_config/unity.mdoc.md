<!--
This partial contains advanced configuration instructions for the Unity SDK.
It can be included directly in language-specific pages or wrapped in conditionals.
-->

If you have not set up the Datadog Unity SDK for RUM yet, follow the [in-app setup instructions][1] or see the [RUM Unity setup documentation][2].

## Advanced initialization options

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

## Enrich RUM data

To add custom context, user information, and more to your RUM events, see [Enrich RUM Data][3].

[1]: https://app.datadoghq.com/rum/application/create
[2]: /real_user_monitoring/setup/install/?platform=unity
[3]: /real_user_monitoring/enrich_rum_data/
