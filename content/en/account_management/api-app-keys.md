---
title: API and Application Keys
kind: faq
aliases:
    - /account_management/faq/how-do-i-reset-my-application-keys/
    - /agent/faq/how-do-i-reset-my-datadog-api-keys/
    - /account_management/faq/api-app-key-management/
---

## API keys

API keys are unique to your organization. An API key is required by the Datadog Agent to submit metrics and events to Datadog.

## Application keys

Application keys, in conjunction with your org's API key, give you full access to Datadog's programmatic API. Application keys are associated with the user account that created them and must be named. The application key is used to log all requests made to the API.

## Client tokens

To manage your client tokens, go to your [Datadog API configuration page][1] in the `Client Tokens` section as shown here:

{{< img src="account_management/api_app_keys/client_tokens.png" style="width:80%;" alt="Client tokens" responsive="true" >}}

Client tokens are unique to your organization. A client token is required by the [web browser log collector][2] to submit logs to Datadog, and is required by the [Real User Monitoring][3] to submit events and logs to Datadog.

For security reasons, API keys cannot be used to send data from a browser, as they would be exposed client-side in the JavaScript code. To collect logs from web browsers, a client token must be used.

## Add a key

To add a Datadog API key, application key, or client token, navigate to [Integration -> APIs][4], enter a name for your key or token, and click **Create API key** or **Create Application Key** or **Create Client Token**.

**Note**:

* Your org must have at least one API key and at most five API keys.
* Key names must be unique across your org.
* Application key names cannot be blank.

## Remove

To remove a Datadog API key or application key or client token, navigate to [Integration -> APIs][4] and select the **Revoke** button next to the key or token you want to remove:

{{< img src="account_management/api_app_keys/application_keys.png" alt="Application Keys" responsive="true" >}}

## Disabling a User Account
If a user's account is disabled, any application keys that the user created are deleted. Any API keys that were created by the disabled account are not deleted, and are still valid.

## Transferring API/Application Keys
Due to security reasons, Datadog does not transfer API/application keys from one user to another. The recommended best practice is to keep track of API/application keys and rotate those keys once a user has left the company. This way, a user that has left the company no longer has access to your account and Datadog’s API. Transferring the API/application key allows a user that no longer remains with the company to continue to send and receive data from the Datadog API. Customers have also asked to change the handle that the API/application keys are associated with. This, however, does not resolve the inherent issue: that a user that no longer remains with the company continues to have the ability to send and retrieve data from the Datadog API.

Alternatively, organizations have asked whether they can create a “service account” with which to own API/application keys. There are many cases where it makes sense to use a “service account” to own API keys. That being said, it is important that this is more than just a shared account that everyone has access to. If you plan on using a “service account”, it is important to secure storage of the service account credentials (such as using a password manager) as well as the principle of least privilege. To prevent the accidental leakage of service account credentials, there should only be a small number of people who have access—ideally, only those who truly need to be able to maintain the account.

## Troubleshooting

Need help? Contact [Datadog support][1].

[1]: /help
[2]: https://docs.datadoghq.com/logs/log_collection/javascript
[3]: /real_user_monitoring
[4]: https://app.datadoghq.com/account/settings#api
