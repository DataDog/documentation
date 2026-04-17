---
title: Service Access Tokens
description: "Create and manage Service Access Tokens to authenticate Datadog API calls on behalf of a service account, without relying on individual user credentials."
---

{{< callout btn_hidden="true" header="Join the Preview!" >}}
Service Access Tokens are in Preview.
{{< /callout >}}

## Overview

Service Access Tokens (SATs) are credentials that authenticate Datadog API calls on behalf of a
[service account][1]. Unlike [Personal Access Tokens (PATs)][2], SATs belong to a service account
rather than an individual user — they remain valid when team members join or leave the organization.

With SATs, you can:
- Authenticate automated workflows and scripts with credentials that outlast individual employees.
- Create long-lived tokens for stable integrations that do not require periodic rotation.
- Scope tokens to the minimum permissions your workflow requires.
- Attribute all API activity to the owning service account for clear audit accountability.

### SATs compared to other credential types

| | Service Access Tokens | Personal Access Tokens | Application keys |
|---|---|---|---|
| Owned by | Service account | Individual user | Individual user or service account |
| Time-to-live (TTL) | Optional; 1 day, 1 month, 1 year, Never, or Custom | Required; 1 day to 1 year | No expiration |
| Scoped by default | Yes; scopes are mandatory | Yes; scopes are mandatory | Optional; unscoped by default |
| Standalone authentication | Yes; no API key pairing needed | Yes; no API key pairing needed | No; requires an API key |
| Identifiable prefix | `ddpat_` | `ddpat_` | `ddap_` (new) |
| Visible in | Service account details, Organization Settings > Access Tokens | Personal Settings > Access Tokens, Organization Settings > Access Tokens | Personal Settings > Application Keys, Organization Settings > Application Keys |

For Personal Access Tokens, see [Personal Access Tokens][2].

## Prerequisites

- A Datadog service account. See [Service Accounts][1] to create one.
- The `service_account_write` permission to create SATs for a service account you manage.
- The `org_app_keys_write` permission to manage SATs for any service account in the organization.

## Create a Service Access Token

1. Navigate to [**Organization Settings** > **Service Accounts**][3] and click a service account.
2. In the details panel, under **Access Tokens**, click {{< ui >}}+ New Token{{< /ui >}}.
3. Enter a {{< ui >}}Name{{< /ui >}} for the token.
4. Select an {{< ui >}}Expiration Date{{< /ui >}}: **1 day**, **1 month**, **1 year**, **Never**,
   or **Custom**. Select **Never** to create a long-lived token with no automatic expiration.
5. Click {{< ui >}}Select Scopes{{< /ui >}} to define what the token can access. Grant only the
   permissions your workflow requires, then click {{< ui >}}Save{{< /ui >}}.

<div class="alert alert-warning">Datadog displays the token secret only once at creation time.
Copy and store it securely. You cannot retrieve it later.</div>

After you save, a details panel displays the token secret, name, Token ID, owner, owner roles,
expiration date, and scopes.

## Use a Service Access Token

SATs support two authentication methods.

### Authorization header (recommended)

Pass the SAT as a Bearer token in the `Authorization` header. This method does not require an
API key:

```bash
curl -X GET "https://api.datadoghq.com/api/v2/users" \
  -H "Authorization: Bearer <YOUR_SAT>"
```

### Application key header

Pass the SAT in the `dd-application-key` header:

```bash
curl -X GET "https://api.datadoghq.com/api/v2/users" \
  -H "dd-application-key: <YOUR_SAT>"
```

**Note:** When a valid SAT is provided in the `dd-application-key` header, Datadog authenticates
with the SAT only. The `dd-api-key` header is optional and its value is not evaluated.

## Manage Service Access Tokens

### View tokens

Tokens for a service account appear in the service account details panel under
[**Organization Settings** > **Service Accounts**][3].

{{< img src="account_management/service-access-tokens/sat-service-account-panel.png" alt="Service account details panel showing the Access Tokens section with two Service Access Tokens listed" style="width:80%;" >}}

Organization administrators with the `org_app_keys_read` permission can also view all SATs
alongside Personal Access Tokens from [**Organization Settings** > **Access Tokens**][4].

### Revoke a token

1. Navigate to [**Organization Settings** > **Service Accounts**][3] and click the service account.
2. In the details panel, hover over the token and click {{< ui >}}Revoke{{< /ui >}}.

Alternatively, revoke a SAT from [**Organization Settings** > **Access Tokens**][4].

Revoked tokens can no longer authenticate API calls. Revocation takes effect within seconds.

### Edit a token

You can update the name and scopes of an existing SAT. You cannot modify the expiration date
after creation. To change the expiration, revoke the token and create a new one.

## Permissions

| Permission | Description |
|------------|-------------|
| `service_account_write` | Create SATs for service accounts you manage |
| `org_app_keys_read` | View SATs for all service accounts in the organization |
| `org_app_keys_write` | Create, edit, and revoke SATs for any service account |

For more information, see [Role Based Access Control][5].

## Audit Trail

If [Audit Trail][6] is enabled, Audit Trail records all SAT creation, usage, and revocation
events. Each API call authenticated with a SAT is attributed to the owning service account,
giving administrators visibility into automated credential usage across the organization.

To review SAT activity, navigate to [**Security** > **Compliance** > **Audit Trail**][7] and
filter by the Service Access Token authentication method.

## API reference

Manage SATs programmatically through the Datadog API:

| Operation | Endpoint |
|-----------|----------|
| List SATs | `GET /api/v2/service_accounts/<SERVICE_ACCOUNT_ID>/access_tokens` |
| Create a SAT | `POST /api/v2/service_accounts/<SERVICE_ACCOUNT_ID>/access_tokens` |
| Get a specific SAT | `GET /api/v2/service_accounts/<SERVICE_ACCOUNT_ID>/access_tokens/<TOKEN_ID>` |
| Update a SAT | `PATCH /api/v2/service_accounts/<SERVICE_ACCOUNT_ID>/access_tokens/<TOKEN_ID>` |
| Revoke a SAT | `DELETE /api/v2/service_accounts/<SERVICE_ACCOUNT_ID>/access_tokens/<TOKEN_ID>` |

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /account_management/org_settings/service_accounts/
[2]: /account_management/personal-access-tokens/
[3]: https://app.datadoghq.com/organization-settings/service-accounts
[4]: https://app.datadoghq.com/organization-settings/access-tokens
[5]: /account_management/rbac/permissions/
[6]: /account_management/audit_trail/
[7]: https://app.datadoghq.com/audit-trail
