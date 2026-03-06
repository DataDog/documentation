---
title: Personal Access Tokens
description: "Create and manage short-lived, scoped Personal Access Tokens to authenticate Datadog API calls without pairing API and application keys."
aliases:
    - /account_management/faq/personal-access-tokens/
---

{{< callout btn_hidden="true" header="Join the Preview!" >}}
Personal Access Tokens are in Preview.
{{< /callout >}}

## Overview

Personal Access Tokens (PATs) are a credential type that authenticates Datadog API calls. Unlike application keys, PATs do not need to be paired with an API key. They are short-lived and scoped by default, giving you tighter control over what each token can access and how long it remains valid.

With PATs, you can:
- **Authenticate API calls with a single credential**—no API key required.
- **Enforce the principle of least privilege** by selecting only the scopes your workflow needs.
- **Limit the blast radius of leaked credentials** through mandatory time-to-live (TTL) values. Expired tokens are automatically revoked, so inactive credentials do not persist indefinitely.
- **Separate concerns**: reserve API keys for telemetry submission (Agent, logs, metrics) and use PATs for all other web API calls.

### PATs compared to application keys

| | Personal Access Tokens | Application keys |
|---|---|---|
| Standalone authentication | Yes—no API key pairing needed | No—requires an API key |
| Scoped by default | Yes—scopes are mandatory | Optional—unscoped by default |
| Time-to-live (TTL) | Required (24 hours to one year) | No expiration |
| Identifiable prefix | Yes—`ddpat_` | Yes—`ddap_` (new) |
| Linked to | Individual user | Individual user |

## Prerequisites

- A Datadog user account with the `user_app_keys` permission to create your own PATs.
- To manage PATs for other users in the organization, you need the `org_app_keys_write` permission.

## Create a Personal Access Token

1. Navigate to [**Personal Settings** > **Access Tokens**][1].
2. Click **+ New Access Token**.
3. Enter a **Name** for the token.
4. Select an **Expiration Date**. The minimum expiration is 24 hours and the maximum is one year from creation.
5. Click **Select Scopes** to choose the scopes that define what this token can access. Grant only the permissions your workflow requires, then click **Save**.

{{< img src="account_management/personal-access-tokens/pat-create.png" alt="Create a Personal Access Token by entering a name and selecting an expiration date" style="width:80%;" >}}

<div class="alert alert-warning">Datadog displays the token secret only once at creation time. Copy and store it securely. You cannot retrieve it later.</div>

**Notes:**

- PATs have a minimum expiration of 24 hours and a maximum of one year from creation.
- All PATs require at least one scope. There is no concept of an unscoped PAT.

## Use a Personal Access Token

PATs support two authentication methods.

### Authorization header (recommended)

Pass the PAT as a Bearer token in the `Authorization` header. This method does not require an API key:

```bash
curl -X GET "https://api.datadoghq.com/api/v2/users" \
  -H "Authorization: Bearer <YOUR_PAT>"
```

### Application key header

Pass the PAT in the `dd-application-key` header. This is useful for migrating existing integrations that already use the application key header format:

```bash
curl -X GET "https://api.datadoghq.com/api/v2/users" \
  -H "dd-application-key: <YOUR_PAT>"
```

**Note:** When a valid PAT is provided in the `dd-application-key` header, Datadog authenticates with the PAT only. The `dd-api-key` header is optional and its value is not evaluated.

## Manage Personal Access Tokens

### View your tokens

Navigate to [**Personal Settings** > **Access Tokens**][1] to see all PATs associated with your account, including their name, scopes, expiration date, and last usage information.

After creating a token, a details panel displays the token secret, name, Token ID, owner, scopes, and expiration date. From this panel you can also edit or revoke the token.

{{< img src="account_management/personal-access-tokens/pat-details.png" alt="Personal Access Token details showing the token secret, name, Token ID, owner, scopes, and expiration" style="width:60%;" >}}

### Manage tokens as an administrator

Organization administrators with the `org_app_keys_read` and `org_app_keys_write` permissions can view and manage PATs for all users in the organization from [**Organization Settings** > **Access Tokens**][2].

{{< img src="account_management/personal-access-tokens/pat-admin.png" alt="Organization administrators can view and manage all PATs from Organization Settings" style="width:80%;" >}}


### Revoke a token

1. Navigate to [**Personal Settings** > **Access Tokens**][1], or [**Organization Settings** > **Access Tokens**][2] for administrators.
2. Click **Revoke** next to the token you want to revoke.

Revoked tokens can no longer authenticate API calls. Revocation takes effect within seconds.

### Edit a token

You can update the name and scopes of an existing PAT. You cannot modify the TTL after creation. To change the TTL, revoke the existing token and create a token with the desired configuration.

## Token format

PATs use an identifiable format that supports secret scanning and key management:

```
ddpat_<ALIAS>_<SECRET><CHECKSUM>
```

| Component | Description |
|-----------|-------------|
| `ddpat_` | Prefix identifying the credential as a Personal Access Token |
| `<ALIAS>` | Base62-encoded token identifier, derived from the token UUID |
| `<SECRET>` | 32-byte randomly generated secret |
| `<CHECKSUM>` | CRC32 checksum following the GitHub checksum standard |

The identifiable prefix and checksum enable automated detection by secret scanning services, including GitHub secret scanning, Sensitive Data Scanner, and GitGuardian.

## Permissions

PATs use the same permissions as application keys:

| Permission | Description |
|------------|-------------|
| `user_app_keys` | Create and manage your own PATs |
| `org_app_keys_read` | View PATs for all users in the organization |
| `org_app_keys_write` | Create, edit, and revoke PATs for any user in the organization |

For more information about permissions, see [Role Based Access Control][3].

## Audit Trail

If [Audit Trail][4] is enabled for your organization, Audit Trail records all PAT creation, usage, and revocation events. Audit Trail captures the authentication method and token metadata for each API call made with a PAT, giving administrators visibility into credential usage across the organization.

To review PAT activity, navigate to [**Security** > **Compliance** > **Audit Trail**][5] and filter by the Personal Access Token authentication method.

## API reference

Manage PATs programmatically through the Datadog API:

| Operation | Endpoint |
|-----------|----------|
| List PATs | `GET /api/v2/personal_access_tokens` |
| Create a PAT | `POST /api/v2/personal_access_tokens` |
| Get a specific PAT | `GET /api/v2/personal_access_tokens/<PAT_ID>` |
| Update a PAT | `PATCH /api/v2/personal_access_tokens/<PAT_ID>` |
| Revoke a PAT | `DELETE /api/v2/personal_access_tokens/<PAT_ID>` |

For the full API reference, see [Key Management][6].

## Key propagation delay

PATs follow an eventual consistency model. After creation or revocation, changes may take a few seconds to propagate across all Datadog systems. Do not use a token immediately after creation in critical workflows. Implement a retry strategy with short exponential backoff to handle transient errors during the propagation window.

[1]: https://app.datadoghq.com/personal-settings/access-tokens
[2]: https://app.datadoghq.com/organization-settings/access-tokens
[3]: /account_management/rbac/permissions/
[4]: /account_management/audit_trail/
[5]: https://app.datadoghq.com/audit-trail
[6]: /api/latest/key-management/
