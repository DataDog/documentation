---
title: Subject Authorization
description: Control which subjects can download feature flag assignments for an environment.
further_reading:
- link: "/feature_flags/client/"
  tag: "Documentation"
  text: "Client-Side SDKs"
- link: "/account_management/workload_identity_federation/"
  tag: "Documentation"
  text: "Workload Identity Federation"
- link: "/feature_flags/concepts/evaluation_context/"
  tag: "Documentation"
  text: "Evaluation Context"
- link: "/feature_flags/concepts/environments/"
  tag: "Documentation"
  text: "Environments"
---

## Overview

Subject authorization controls which users or accounts can download feature flag assignments for an environment. Use it to restrict assignment requests to subjects authenticated by your application.

This setting controls access to flag assignments. Your backend remains responsible for checking access to application APIs and data.

<div class="alert alert-info">Subject authorization is available by request. Contact your Datadog representative to request access.</div>

## How it works

Your backend issues a signed JSON Web Token (JWT) for an authenticated subject and environment. The SDK includes this token with assignment requests. Datadog validates the token and checks that its subject and environment match the request before returning new flag assignments to the SDK.

The SDK sends the JWT alongside your existing Datadog client token. The client token identifies your Datadog organization; the JWT authorizes assignment downloads for the requested subject and environment.

## Requirements

- Access to subject authorization and custom OIDC providers in [Workload Identity Federation (WIF)][8].
- The **Workload Identity Federation Write** permission to register a custom OIDC provider in WIF, and **Feature Flag Environment Write** permission to configure the environment. See [Permissions and Access Control][7].
- A backend that issues signed JWTs and publishes its public signing keys at a JWKS endpoint.

### Supported clients

| SDK | Minimum version |
|-----|-----------------|
| [Browser][4] (`@datadog/openfeature-browser`) | `2.4.0` |
| [iOS][11] (`DatadogFlags`) | `3.23.0` |

See [Client SDKs][1] for installation instructions.

## Set up subject authorization

Set up subject authorization in this order:

1. [Prepare signing keys and publish a JWKS](#prepare-signing-keys-and-publish-a-jwks). Generate or select compatible signing keys and publish the public keys at an HTTPS endpoint.
2. [Register an OIDC provider](#register-an-oidc-provider). Register your issuer and JWKS URL in Datadog and allow time for the keys to propagate.
3. [Issue subject tokens](#issue-subject-tokens). Update your backend to issue JWTs for authenticated subjects and the intended environment.
4. [Configure the client](#configure-the-client). Update your application to obtain a JWT and supply it through the SDK's evaluation context.
5. [Enable authorization through the API](#enable-authorization-through-the-api). Associate the provider with the environment and enable authorization in the same update.
6. [Verify authorization](#verify-authorization). Confirm that valid requests succeed and requests with missing or invalid tokens are rejected.

### Prepare signing keys and publish a JWKS

Generate a signing key pair, or select an existing pair that meets the following requirements. Keep private keys on your backend.

Publish up to three public signing keys at a JSON Web Key Set (JWKS) endpoint. Each key must use RSA-2048 with exponent 65537, support PS256 signatures, and have a unique, nonempty `kid`. If present, `alg` must be `PS256`, `use` must be `sig`, and `key_ops` must contain only `verify`.

The JWKS URL must use a public DNS hostname and HTTPS on port 443, without URL credentials, query strings, or fragments. The endpoint must return the keys directly, without redirects.

### Register an OIDC provider

Register a dedicated custom OIDC provider in the same Datadog organization and site as your Feature Flags environment. Follow [Register the OIDC provider in Datadog][2], or use the [Create a Custom OIDC provider API][9], with these settings:

- **Name:** A descriptive name for the provider, such as `Feature Flags Subject Authorization - Staging`.
- **Issuer URL:** The exact issuer identifier your backend includes in the JWT's `iss` claim, such as `https://auth.example.com`.
- **Key discovery:** Select **Direct JWKS URL** (`direct_jwks`).
- **JWKS URL:** The HTTPS endpoint that serves your public signing keys, such as `https://auth.example.com/.well-known/jwks.json`.
- **Org routing:** Select **Org UUID in the token audience**.
- **Audiences:** A single value, `datadog/<ORG_UUID>`. Find the organization UUID on **Organization Settings > Workload Identity Federation**.
- Use the default `sub` identity claim.
- **Required claims:** Add exactly one claim matcher:
  - **Claim name:** `feature_flags`
  - **Match:** **Exact**
  - **Value:** `true`

The issuer URL must use a public DNS hostname and HTTPS on port 443, without URL credentials, query strings, or fragments.

After creating the provider, retrieve and save its UUID:

- **Created in the UI:** Use the [List providers API][10], find the provider matching your issuer URL, and copy its `id`.
- **Created through the API:** Copy `data.id` from the [provider creation response][9].

This flow uses the provider registration directly; it does not require a WIF identity mapping, intake mapping, or token exchange.

After registering the provider, allow at least 15 minutes for signing keys to propagate before enabling subject authorization.

### Issue subject tokens

Retrieve the UUID of your Feature Flags environment with the [List environments API][3]. Use this UUID in the token's `environment_id` claim.

After authenticating a subject, issue a JWT from your backend with a `PS256` signature. The JWT header accepts only these fields:

- `alg`: Set to `PS256`.
- `kid`: The signing key's identifier, between 1 and 128 bytes.
- `typ`: Optional. If included, set to `JWT`.

Additional header fields are rejected.

The complete encoded token must be 8192 bytes or smaller.

For example, the decoded JWT payload contains:

```json
{
  "iss": "https://idp.example.com",
  "aud": "datadog/<ORG_UUID>",
  "sub": "user-123",
  "environment_id": "<ENVIRONMENT_ID>",
  "feature_flags": true,
  "iat": 1800000000,
  "exp": 1800003600
}
```

Replace the example values as follows:

- `iss` must exactly match the registered issuer URL.
- `aud` must match the provider's audience.
- `sub` must exactly match the SDK's `targetingKey` and must not be empty.
- `environment_id` must be the Feature Flags environment's UUID, not its name or the SDK's environment setting.
- `feature_flags` must be Boolean `true`.
- `iat` and `exp` must be UNIX timestamps in seconds. Set `iat` to the issue time and `exp` to a later expiration time. Replace the example timestamps when issuing a token. Datadog also validates `nbf` if present, with a 30-second clock tolerance for timestamp checks.

Return the signed token to the authenticated application through your existing session or bootstrap flow. Keep the signing private key on your backend. A JWT is signed, not encrypted; omit secrets and unnecessary personal data.

### Configure the client

Update your application to obtain a subject token from your backend and include it in the reserved `dd_assignment_token` evaluation context attribute. Replace it through a complete context update before it expires. For SDK setup, token refresh, and subject changes, see the guides linked in [Supported clients](#supported-clients).

### Enable authorization through the API

Deploy the token-aware application before enabling authorization on its environment. After authorization is enabled, requests without a valid token are rejected, including requests from older applications that do not supply one.

Use the [Update environment API][5] to associate one registered OIDC provider with the environment and enable subject authorization in the same update. Set these attributes:

- `subject_authorization_state`: `enabled` or `disabled`. Environments default to `disabled`.
- `subject_authorization_oidc_provider_id`: The UUID of your registered custom OIDC provider. Retrieve it from the [provider creation response][9] or the [List providers API][10]. Required when authorization is enabled.

1. Retrieve the current environment settings with the [Get environment API][6], using the environment UUID.

2. Update the same environment with the [Update environment API][5]. Copy the current `name`, `queries`, `is_production`, and `require_feature_flag_approval` values into the request body and replace `<OIDC_PROVIDER_ID>` with your provider UUID. This example enables authorization for a production environment named `Production`:

   ```json
   {
     "data": {
       "type": "environments",
       "attributes": {
         "name": "Production",
         "queries": ["production"],
         "is_production": true,
         "require_feature_flag_approval": false,
         "subject_authorization_state": "enabled",
         "subject_authorization_oidc_provider_id": "<OIDC_PROVIDER_ID>"
       }
     }
   }
   ```

   Updates require `name` and `queries`. Include the current `is_production` and `require_feature_flag_approval` values to preserve them; omitting either resets it to `false`.

Configure the provider and environment policy independently in each Datadog site. These settings are not copied between sites.

To disable authorization, repeat the read and update process with `subject_authorization_state` set to `disabled`. Disabling retains the provider association. To also clear the association, set `subject_authorization_oidc_provider_id` to `null` in that update.

### Verify authorization

After enabling authorization, send new assignment requests with the configured SDK and check the responses for each case:

| Token supplied | Expected assignment response |
|----------------|------------------------------|
| A valid token for the requested subject and environment | The assignment request succeeds. |
| No token | `401 ASSIGNMENT_AUTHORIZATION_FAILED` |
| A token issued for a different subject | `401 ASSIGNMENT_AUTHORIZATION_FAILED` |

The rejection checks confirm that authorization is enforced. Inspect the assignment request's network response rather than evaluated flag values, which can come from previously downloaded assignments. Saving the environment policy does not verify that signing keys have propagated.

For authorization errors, see [Troubleshoot assignment downloads](#troubleshoot-assignment-downloads).

## Rotate signing keys

Your JWKS can contain up to three keys, such as the previous, current, and next signing keys. Datadog uses all published keys to validate tokens.

1. Add the new public key to your JWKS, retaining existing keys. Use a new `kid`.
2. Allow at least 15 minutes for key changes to propagate.
3. Verify assignment downloads with a token signed by the new key, then start issuing replacement tokens with it.
4. Keep old public keys published until tokens signed with them expire. Remove keys after they are no longer needed.

Key changes take time to propagate. Removing a key does not immediately invalidate it everywhere. If Datadog cannot refresh the JWKS, previously published keys can remain usable. Contact your Datadog representative if you need help revoking a compromised key.

## Troubleshoot assignment downloads

- **`401 ASSIGNMENT_AUTHORIZATION_FAILED`:** The token is missing or invalid. Check its signature, `kid`, issuer, audience, subject, environment UUID, `feature_flags` Boolean, and timestamps.
- **`503 ASSIGNMENT_AUTHORIZATION_UNAVAILABLE`:** Verification configuration is unavailable. Check the selected provider and supported settings, allow time for keys to propagate, and contact your Datadog representative if failures persist.
- **Environment API errors:** A new provider ID must be registered in the same organization and site. Invalid or unknown provider IDs return `400`; an unavailable registry returns `503`. A concurrent policy change returns `409`; retrieve the environment again before retrying.

### Authorization failures and recovery

Authorization controls new downloads; token expiration alone does not clear previously downloaded assignments. After a `401 ASSIGNMENT_AUTHORIZATION_FAILED` response, the supported SDKs handle cached assignments as follows:

| Available assignments | SDK behavior |
|-----------------------|--------------|
| Eligible cached assignments for the same targeting key | Continues serving those assignments and enters a stale state. |
| Assignments for a different targeting key, or no eligible cached assignments | Returns application-provided defaults and enters an error state. |

To recover, obtain a valid token for the requested subject and environment and supply it through a complete evaluation context update. A successful download restores normal evaluation without recreating the SDK client or provider.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /feature_flags/client/
[2]: /account_management/workload_identity_federation/#register-the-oidc-provider-in-datadog
[3]: /api/latest/feature-flags/#list-environments
[4]: /feature_flags/client/javascript/#authorize-assignment-downloads
[5]: /api/latest/feature-flags/update-an-environment/
[6]: /api/latest/feature-flags/get-an-environment/
[7]: /feature_flags/concepts/permissions/
[8]: /account_management/workload_identity_federation/
[9]: /api/latest/cloud-authentication/create-a-custom-oidc-provider/
[10]: /api/latest/cloud-authentication/list-all-custom-oidc-providers/
[11]: /feature_flags/client/ios/#authorize-assignment-downloads
