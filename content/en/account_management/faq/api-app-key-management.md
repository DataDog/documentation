---
title: API and Application Key Management
kind: faq
aliases:
    - /account_management/faq/how-do-i-reset-my-application-keys/
    - /agent/faq/how-do-i-reset-my-datadog-api-keys/
---

## API keys

API keys are unique to your organization. An API key is required by the Datadog Agent to submit metrics and events to Datadog.

## Application keys

Application keys, in conjunction with your org's API key, give you full access to Datadog's programmatic API. Application keys are associated with the user account that created them and must be named. The application key is used to log all requests made to the API.

## Public API keys

<div class="alert alert-warning">
Public API keys are in private beta. <a href="https://docs.datadoghq.com/help/">Reach out to support</a> to turn on this feature for your account.
</div>

Public API keys are unique to your organization. A public API key is required by the [web browser log collector][3] to submit logs to Datadog.
Those keys can only be used to send web browser logs to Datadog.

## Add a key

To add a Datadog API, application, or public API key, navigate to [Integration -> APIs][1], enter a name for your key, and click **Create API key** or **Create Application Key** or **Create Public Api Key**.

**Note**:

* Your org must have at least one API key and at most five API keys.
* Key names must be unique across your org.
* Application key names cannot be blank.

## Remove

To remove a Datadog API or application or public API key, navigate to [Integration -> APIs][1] and select the **Revoke** button next to the key you want to remove:

{{< img src="account_management/faq/Application_Keys.jpg" alt="Application Keys" responsive="true" >}}

## Transferring API/Application Keys
Due to security reasons, Datadog does not transfer API/application keys from one user to another. The recommended best practice is to keep track of API/application keys and rotate those keys once a user has left the company. This way, a user that has left the company no longer has access to your account and Datadog’s API. Transferring the API/application key allows a user that no longer remains with the company to continue to send and receive data from the Datadog API. Customers have also asked to change the handle that the API/application keys are associated with. This, however, does not resolve the inherent issue: that a user that no longer remains with the company continues to have the ability to send and retrieve data from the Datadog API.  

Alternatively, organizations have asked whether they can create a “service account” with which to own API/application keys. There are many cases where it makes sense to use a “service account” to own API keys. That being said, it is important that this is more than just a shared account that everyone has access to. If you plan on using a “service account”, it is important to secure storage of the service account credentials (such as using a password manager) as well as the principle of least privilege. To prevent the accidental leakage of service account credentials, there should only be a small number of people who have access—ideally, only those who truly need to be able to maintain the account. 

## Troubleshooting

Need help? Contact [Datadog support][2].

[1]: https://app.datadoghq.com/account/settings#api
[2]: /help
[3]: https://docs.datadoghq.com/logs/log_collection/javascript/
