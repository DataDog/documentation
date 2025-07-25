---
title: API and Application Keys
aliases:
    - /account_management/faq/how-do-i-reset-my-application-keys/
    - /agent/faq/how-do-i-reset-my-datadog-api-keys/
    - /account_management/faq/api-app-key-management/
algolia:
  tags: ['api key']
---

## API keys

API keys are unique to your organization. An [API key][1] is required by the Datadog Agent to submit metrics and events to Datadog.

## Application keys

[Application keys][2], in conjunction with your organization's API key, give users access to Datadog's programmatic API. Application keys are associated with the user account that created them and by default have the permissions of the user who created them.

### Scopes

To better protect and secure your applications, you can specify authorization scopes for your application keys to define more granular permissions and minimize the access that applications have to your Datadog data. This gives you fine-grained access control over your applications and minimizes security vulnerabilities by limiting extraneous access. For example, an application that only reads dashboards does not need admin rights to manage users or delete any of your organization's data.

The recommended best practice for scoping application keys is to grant your keys the minimal privileges and least permissions necessary for an application to function as intended. Scoped application keys are granted only the scopes specified by the user, and no other additional permissions. While you can modify the authorization scopes of your application keys anytime, consider how those changes may impact the existing functionality or access of your application.

**Notes:**

- Users or service accounts with [permissions][4] to create or edit application keys can scope application keys. A user must have the `user_app_keys` permission to scope their own application keys, or the `org_app_keys_write` permission to scope application keys owned by any user in their organization. A user must have the `service_account_write` permission to scope application keys for service accounts.
- Application owners cannot authorize an application if they are missing any required permissions, even if they scope an application key with authorization scopes that they do not have.
- Errors due to missing permissions when writing application keys or authorizing applications will display a `403 Forbidden` error. More information about various error responses can be found in the [Datadog API][5] documentation.
- If a user's role or permissions change, authorization scopes specified for their application keys remain unchanged.

## Client tokens

For security reasons, API keys cannot be used to send data from a browser, mobile, or TV app, as they would be exposed client-side. Instead, end user facing applications use client tokens to send data to Datadog.

 Several types of clients submit data that requires a client token, including the following examples:
- The log collectors for [web browser][6], [Android][7], [iOS][8], [React Native][9], [Flutter][10], and [Roku][11] submit logs.
- [Real User Monitoring][12] applications submit events and logs.

Client tokens are unique to your organization. To manage your client tokens, go to **Organization Settings**, then click the **Client Tokens** tab.

**Note**: When a user who created a client token is deactivated, the client token remains active.

## Add an API key or client token

To add a Datadog API key or client token:

1. Navigate to Organization settings, then click the [**API keys**][1] or [**Client Tokens**][13] tab.
2. Click the **New Key** or **New Client Token** button, depending on which you're creating.
3. Enter a name for your key or token.
4. Click **Create API key** or **Create Client Token**.

{{< img src="account_management/api-key.png" alt="Navigate to the API Keys page for your organization in Datadog" style="width:80%;" >}}

**Notes:**

- Your org must have at least one API key and at most 50 API keys.
- Key names must be unique across your organization.

## Remove API keys or client tokens

To remove a Datadog API key or client token, navigate to the list of keys or tokens, and click the **trash can** icon with **Revoke** next to the key or token you want to remove.

## Add application keys

To add a Datadog application key, navigate to [**Organization Settings** > **Application Keys**][2]. If you have the [permission][4] to create application keys, click **New Key**.

{{< img src="account_management/app-key.png" alt="Navigate to the Application Keys page for your organization in Datadog" style="width:80%;" >}}

{{< site-region region="ap2,gov" >}}
<div class="alert alert-warning">Make sure to securely store your application key immediately after creation, as the key secret cannot be retrieved later.</div>
{{< /site-region >}}

**Notes:**

- Application key names cannot be blank.

## Remove application keys

To remove a Datadog application key, navigate to [**Organization Settings** > **Application Keys**][2]. If you have the [permission][4] to create and manage application keys, you can see your own keys and click **Revoke** next to the key you want to revoke. If you have the permission to manage all org application keys, you can search for the key you want to revoke and click **Revoke** next to it.

## Key propagation delay and eventual consistency

Datadog's API and application keys follow an eventual consistency model. Due to the distributed nature of Datadog's systems, updates to keys, such as creation and revocation, may take a few seconds to fully propagate.

As a result:

- Do not use new API or application keys immediately in critical workflows. Allow a brief period (a few seconds) for propagation. You can implement a retry strategy with short exponential backoff to handle transient errors during the propagation window.
- To validate whether an API key is active and usable, call the [/api/v1/validate][18] endpoint.
- To verify that an application key is active, use the `/api/v2/validate_keys` endpoint with the appropriate key pair.

Attempting to use a newly created key before it is fully propagated may result in temporary authentication errors such as 403 Forbidden or 401 Unauthorized.

## Scope application keys

To specify authorization scopes for application keys, [make a request to the Datadog API][5] or the UI to create or edit an application key. Scopes can be specified for application keys owned by [the current user][14] or a [service account][15]. If this field is unspecified, application keys by default have all the same scopes and permissions as the user who created them.

**Notes:**

- Scope names are case-sensitive.

## Using multiple API keys

Consider setting up multiple API keys for your organization. For example, use different API keys for each of your various deployment methods: one for deploying an Agent on Kubernetes in AWS, one for deploying it on prem with Chef, one for Terraform scripts that automate your dashboards or monitors, and one for developers deploying locally.

Using multiple API keys lets you rotate keys as part of your security practice, or revoke a specific key if it's inadvertently exposed or if you want to stop using the service it's associated with.

If your organization needs more than the built-in limit of 50 API keys, contact [Support][16] to ask about increasing your limit.

## Disabling a user account

If a user's account is disabled, any application keys that the user created are revoked. Any API keys that were created by the disabled account are not deleted, and are still valid.

## Transferring keys

Due to security reasons, Datadog does not transfer application keys from one user to another. If you need to share an application key, use a [service account][17].

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

If any unusual activity is identified, or you need additional help securing your account, contact [Datadog support][16].

## Troubleshooting

Need help? Contact [Datadog support][16].

[1]: https://app.datadoghq.com/organization-settings/api-keys
[2]: https://app.datadoghq.com/access/application-keys
[4]: /account_management/rbac/permissions
[5]: /api/latest/key-management/
[6]: /logs/log_collection/javascript/
[7]: /logs/log_collection/android/
[8]: /logs/log_collection/ios/
[9]: /logs/log_collection/reactnative/
[10]: /logs/log_collection/flutter/
[11]: /logs/log_collection/roku/
[12]: /real_user_monitoring/
[13]: https://app.datadoghq.com/organization-settings/client-tokens
[14]: /api/latest/key-management/#create-an-application-key-for-current-user
[15]: /api/latest/service-accounts/
[16]: /help/
[17]: /account_management/org_settings/service_accounts/
[18]: /api/latest/authentication/#validate-api-key
