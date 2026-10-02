1. Navigate to [**Digital Experience** > **Add an Application**](https://app.datadoghq.com/rum/application/create).
2. Select `.NET MAUI` as the application type and enter an application name to generate a unique Datadog application ID and client token.
3. To disable automatic user data collection for either client IP or geolocation data, uncheck the boxes for those settings. For more information, see [RUM .NET MAUI Data Collected](/real_user_monitoring/setup/data_collected/?platform=maui).

For data security, you must use a client token. If you use only [Datadog API keys](/account_management/api-app-keys/#api-keys) to configure the Datadog SDK, they are exposed client-side in the .NET MAUI application's compiled assemblies.

For more information about setting up a client token, see the [Client Token documentation](/account_management/api-app-keys/#client-tokens).
