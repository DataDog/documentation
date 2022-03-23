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

[Application keys][2], in conjunction with your organization's API key, give users access to Datadog's programmatic API. Application keys are associated with the user account that created them and by default have the permissions and scopes of the user who created them.

### Scopes 

<div class="alert alert-info"> Authorization scopes for application keys is a feature in private beta. Contact <a href="https://www.datadoghq.com/support/">Datadog Support</a> to enable support for scoped application keys for your organization. </div>

To better protect and secure your applications, you can specify [authorization scopes][3] for your application keys to define more granular permissions and minimize the access that applications have to your Datadog data. This gives you fine-grained access control over your applications and minimizes security vulnerabilities by limiting extraneous access. For example, an application that only reads dashboards does not need admin rights to manage users or delete any of your organization’s data.

The recommended best practice for scoping application keys is to grant your keys the minimal privileges and least permissions necessary for an application to function as intended. Scoped application keys are granted only the scopes specified by the user, and no other additional permissions. While you can modify the authorization scopes of your application keys anytime, consider how those changes may impact the existing functionality or access of your application. 

**Notes:**

- Users or service accounts with [permissions][4] to create or edit application keys can scope application keys. A user must have the `user_app_keys` permission to scope their own application keys, or the `org_app_keys_write` permission to scope application keys owned by any user in their organization. A user must have the `service_account_write` permission to scope application keys for service accounts.
- Application owners cannot authorize an application if they are missing any required permissions, even if they scope an application key with authorization scopes that they do not have.
- Errors due to missing permissions when writing application keys or authorizing applications will display a `403 Forbidden` error. More information about various error responses can be found in the [Datadog API][5] documentation.
- If a user’s role or permissions change, authorization scopes specified for their application keys remain unchanged.

## Client tokens

To manage your client tokens, go to **Organization Settings**, then click the **Client Tokens** tab.

Client tokens are unique to your organization. A client token is required by the [web browser log collector][6] to submit logs to Datadog, and is required by the [Real User Monitoring][7] to submit events and logs to Datadog.

For security reasons, API keys cannot be used to send data from a browser, as they would be exposed client-side in the JavaScript code. To collect logs from web browsers, a client token must be used.

**Note:** A client token will not be revoked if the user who created it was deactivated. They will still be available for use in your RUM applications and to collect logs.

## Add an API key or client token

To add a Datadog API key or client token:

1. Navigate to Organization settings, then click the **API keys** or **Client Tokens** tab.
2. Click the **New Key** or **New Client Token** button, depending on which you're creating.
3. Enter a name for your key or token.
4. Click **Create API key** or **Create Client Token**.

**Notes:**

- Your org must have at least one API key and at most 50 API keys.
- Key names must be unique across your organization.

## Remove API keys or client tokens

To remove a Datadog API key or client token, navigate to the list of keys or tokens, and click the **trash can** icon with **Revoke** next to the key or token you want to remove.

## Add application keys

To add a Datadog application key, navigate to **Organization Settings** > **Application Keys**. If you have the [permission][4] to create application keys, click **New Key**.

**Notes:**

- Application key names cannot be blank.

## Remove application keys

To remove a Datadog application key, navigate to **Organization Settings** > **Application Keys**. If you have the [permission][4] to create and manage application keys, you can see your own keys and click **Revoke** next to the key you want to revoke. If you have the permission to manage all org application keys, you can search for the key you want to revoke and click **Revoke** next to it.

## Scope application keys 

To specify [authorization scopes][3] for application keys, make a request to the [Datadog API][5] to create or edit an application key. Scopes can be specified for application keys owned by [the current user][8] or a [service account][9]. If this field is unspecified, application keys by default have all the same scopes and permissions as the user who created them.

**Notes:**

- Scope names are case-sensitive.

## Using multiple API keys

Consider setting up multiple API keys for your organization. For example, use different API keys for each of your various deployment methods: one for deploying an Agent on Kubernetes in AWS, one for deploying it on prem with Chef, one for Terraform scripts that automate your dashboards or monitors, and one for developers deploying locally.

Using multiple API keys lets you rotate keys as part of your security practice, or revoke a specific key if it's inadvertently exposed or if you want to stop using the service it's associated with.

If your organization needs more than the built-in limit of 50 API keys, contact [Support][10] to ask about increasing your limit.

## Disabling a user account

If a user's account is disabled, any application keys that the user created are revoked. Any API keys that were created by the disabled account are not deleted, and are still valid.

## Transferring keys

Due to security reasons, Datadog does not transfer API/application keys from one user to another. The recommended best practice is to keep track of API/application keys and rotate those keys once a user has left the company. This way, a user that has left the company no longer has access to your account and Datadog's API. Transferring the API/application key allows a user that no longer remains with the company to continue to send and receive data from the Datadog API. Customers have also asked to change the handle that the API/application keys are associated with. This, however, does not resolve the inherent issue: that a user that no longer remains with the company continues to have the ability to send and retrieve data from the Datadog API.

Alternatively, organizations have asked whether they can create a “service account” with which to own API/application keys. There are many cases where it makes sense to use a “service account” to own API keys. That being said, it is important that this is more than just a shared account that everyone has access to. If you plan on using a “service account”, it is important to secure storage of the service account credentials (such as using a password manager) as well as the principle of least privilege. To prevent the accidental leakage of service account credentials, there should only be a small number of people who have access—ideally, only those who truly need to be able to maintain the account.

## What to do if an API or Application key was exposed

If a private key has been compromised or publicly exposed, steps should be taken as quickly as possible to ensure the security of your account. Removing the file containing the key from a public site such as GitHub **does not** guarantee it was not already accessed by another party.

Follow these steps to help safeguard your account:

**Note:** Revoking an active key may cause an impact to your services. If the scope of usage is large or undetermined, consider steps 2-5 **before** revoking the affected key.

1. Revoke the affected key.
2. Remove code containing the private key from any publicly accessible files:
    - Publish the sanitized file to your public repository.
    - Remove the sensitive data from your commit history.
3. Create a new key.
4. Update affected services with the new key.
5. Review your account for any unapproved access:
    - Users that have been recently added
    - New resources
    - Roles or permission changes

If any unusual activity is identified, or you need additional help securing your account, contact [Datadog support][10].

## Troubleshooting

Need help? Contact [Datadog support][10].

[1]: https://app.datadoghq.com/organization-settings/api-keys
[2]: https://app.datadoghq.com/access/application-keys
[3]: /api/latest/scopes/
[4]: /account_management/rbac/permissions
[5]: /api/latest/key-management/
[6]: /logs/log_collection/javascript/
[7]: /real_user_monitoring/
[8]: /api/latest/key-management/#create-an-application-key-for-current-user
[9]: /api/latest/service-accounts/
[10]: /help/
