1. In Datadog, navigate to [**Digital Experience** > **Add an Application**](https://app.datadoghq.com/rum/application/create).
2. Choose `react-native` as the application type.
3. Provide an application name to generate a unique Datadog application ID and client token.
4. To disable automatic user data collection for client IP or geolocation data, uncheck the boxes for those settings.

{% alert level="info" %}
If you've purchased Error Tracking as a standalone product (without RUM), navigate to [**Error Tracking** > **Settings** > **Browser and Mobile** > **Add an Application**](https://app.datadoghq.com/error-tracking/settings/setup/client/) instead.
{% /alert %}

For data security, you must use a client token. For more information about setting up a client token, see the [Client Token documentation](/account_management/api-app-keys/#client-tokens).
