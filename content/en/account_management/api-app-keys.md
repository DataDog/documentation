---
title: API and Application Keys
kind: faq
aliases:
    - /account_management/faq/how-do-i-reset-my-application-keys/
    - /agent/faq/how-do-i-reset-my-datadog-api-keys/
    - /account_management/faq/api-app-key-management/
---

## API keys

API keys are unique to your organization. An [API key][1] is required by the Datadog Agent to submit metrics and events to Datadog.

## Application keys

[Application keys][2], in conjunction with your organization's API key, give users access to Datadog's programmatic API. Application keys are associated with the user account that created them and have the permissions and capabilities of the user who created them.

## Client tokens

To manage your client tokens, go to **Organization Settings**, then click the **Client Tokens** tab.

Client tokens are unique to your organization. A client token is required by the [web browser log collector][3] to submit logs to Datadog, and is required by the [Real User Monitoring][4] to submit events and logs to Datadog.

For security reasons, API keys cannot be used to send data from a browser, as they would be exposed client-side in the JavaScript code. To collect logs from web browsers, a client token must be used.

## Add an API key or client token

To add a Datadog API key or client token:
1. Navigate to Organization settings, then click the **API keys** or **Client Tokens** tab.
3. Click the **New Key** or **New Client Token** button, depending on which you're creating.
4. Enter a name for your key or token.
4. Click **Create API key** or **Create Client Token**.

**Notes:**

* Your org must have at least one API key and at most 50 API keys.
* Key names must be unique across your organization.

## Remove API keys or client tokens

To remove a Datadog API key or client token, navigate to the list of keys or tokens, and click the **trash can** icon with **Revoke** next to the key or token you want to remove.

## Add application keys

To add a Datadog application key, navigate to **Organization Settings** > **Application Keys**. If you have the [permission][5] to create application keys, click **New Key**.

**Note:** Application key names cannot be blank.

## Remove application keys

To remove a Datadog application key, navigate to **Organization Settings** > **Application Keys**. If you have the [permission][5] to create and manage application keys, you can see your own keys and click **Revoke** next to the key you want to revoke. If you have the permission to manage all org application keys, you can search for the key you want to revoke and click **Revoke** next to it.

## Using multiple API keys

Consider setting up multiple API keys for your organization. For example, use different API keys for each of your various deployment methods: one for deploying an Agent on Kubernetes in AWS, one for deploying it on prem with Chef, one for Terraform scripts that automate your dashboards or monitors, and one for developers deploying locally.

Using multiple API keys lets you rotate keys as part of your security practice, or revoke a specific key if it's inadvertently exposed or if you want to stop using the service it's associated with. 

If your organization needs more than the built-in limit of 50 API keys, contact [Support][6] to ask about increasing your limit.

## Disabling a user account

If a user's account is disabled, any application keys that the user created are revoked. Any API keys that were created by the disabled account are not deleted, and are still valid.

## Transferring keys

Due to security reasons, Datadog does not transfer API/application keys from one user to another. The recommended best practice is to keep track of API/application keys and rotate those keys once a user has left the company. This way, a user that has left the company no longer has access to your account and Datadog's API. Transferring the API/application key allows a user that no longer remains with the company to continue to send and receive data from the Datadog API. Customers have also asked to change the handle that the API/application keys are associated with. This, however, does not resolve the inherent issue: that a user that no longer remains with the company continues to have the ability to send and retrieve data from the Datadog API.

Alternatively, organizations have asked whether they can create a “service account” with which to own API/application keys. There are many cases where it makes sense to use a “service account” to own API keys. That being said, it is important that this is more than just a shared account that everyone has access to. If you plan on using a “service account”, it is important to secure storage of the service account credentials (such as using a password manager) as well as the principle of least privilege. To prevent the accidental leakage of service account credentials, there should only be a small number of people who have access—ideally, only those who truly need to be able to maintain the account.

## Troubleshooting

Need help? Contact [Datadog support][6].

[1]: https://app.datadoghq.com/organization-settings/api-keys
[2]: https://app.datadoghq.com/access/application-keys
[3]: /logs/log_collection/javascript/
[4]: /real_user_monitoring/
[5]: /account_management/rbac/permissions/
[6]: /help/
