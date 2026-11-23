---
title: Subject Authorization
description: Control which subjects can download feature flag assignments for an environment.
further_reading:
- link: "/feature_flags/client/javascript/#authorize-assignment-downloads"
  tag: "Documentation"
  text: "Configure browser subject authorization"
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

Your backend issues a signed JSON Web Token (JWT) for an authenticated subject and environment. The SDK includes this token with assignment requests. Datadog validates the token and checks that its subject and environment match the request before evaluating flags.

The JWT accompanies the public client token, which identifies your application's configuration.

## Requirements

- Access to subject authorization and custom OIDC providers in Workload Identity Federation (WIF).
- Permission to register a custom OIDC provider in WIF, and **Feature Flag Environment Config Write** permission to configure the environment. See [Permissions and Access Control][7].
- A backend that issues signed JWTs and publishes its public signing keys at a JWKS endpoint.

### Supported clients

Subject authorization requires the browser SDK, `@datadog/openfeature-browser`, version `2.4.0` or later. See [JavaScript Feature Flags][1] for installation instructions.

## Register an OIDC provider

Register a dedicated custom OIDC provider in the same Datadog organization and site as your Feature Flags environment. Follow [Register the OIDC provider in Datadog][2], using these settings:

- **Key discovery:** Direct JWKS URL (`direct_jwks`).
- **Issuer URL:** The exact `iss` value your backend includes in its JWTs.
- **Audience:** A single value, `datadog/<ORG_UUID>`. Find the organization UUID on **Organization Settings > Workload Identity Federation**.
- **Org routing:** Audience (`aud`).
- **Required claims:** Only the following exact matcher:

```json
{
  "claim": "feature_flags",
  "mode": "exact",
  "values": ["true"]
}
```

The provider matcher uses the string `"true"`; the JWT itself must contain Boolean `true`. Additional required-claim matchers and custom subject-claim mappings are not supported. Use the default `sub` identity claim.

Both the issuer and JWKS URLs must use public DNS hostnames and HTTPS on port 443, without URL credentials, query strings, or fragments. The JWKS endpoint must return the keys directly, without redirects.

Publish up to three public signing keys. Each key must use RSA-2048 with exponent 65537, support PS256 signatures, and have a unique, nonempty `kid`. If present, `alg` must be `PS256`, `use` must be `sig`, and `key_ops` must contain only `verify`. Keep private keys on your backend.

Save the provider ID returned when you register the provider. This flow uses the provider registration directly; it does not require a WIF identity mapping, intake mapping, or token exchange.

After publishing keys, allow at least 15 minutes for propagation. After enabling authorization, verify assignment downloads with a token signed by the new key. Follow the same process when [rotating keys](#rotate-signing-keys).

## Issue subject tokens

After authenticating a subject, issue a JWT from your backend with a `PS256` signature. Include the signing key's `kid` in the JWT header. If you include `typ`, set it to `JWT`.

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
- `environment_id` must be the Feature Flags environment's UUID, not its name or the SDK's `env` value. Retrieve it with the [List environments API][3].
- `iat` and `exp` must be UNIX timestamps in seconds. Set `iat` to the issue time and `exp` to a later expiration time. Replace the example timestamps when issuing a token. Datadog also validates `nbf` if present, with a 30-second clock tolerance for timestamp checks.

Return the signed token to the authenticated application through your existing session or bootstrap flow. The browser must not hold the signing private key. A JWT is signed, not encrypted; omit secrets and unnecessary personal data.

## Configure the client

Include the subject token in the reserved `dd_assignment_token` evaluation context field when initializing the provider. Replace it through a complete context update before it expires. See [Authorize assignment downloads][4] for browser initialization, token refresh, and subject-switching behavior.

Deploy the token-aware application before enabling authorization on its environment. After authorization is enabled, requests without a valid token are rejected, including requests from older applications that do not supply one.

## Enable authorization through the API

Configure subject authorization with the [Update environment API][5]. Select one OIDC provider for the environment with these attributes:

- `subject_authorization_state`: `enabled` or `disabled`. Environments default to `disabled`.
- `subject_authorization_oidc_provider_id`: The registered provider's UUID. Required when authorization is enabled.

Use your [Datadog API and application keys][6] to authenticate these requests.

1. Retrieve the environment's current settings. Replace `<ENVIRONMENT_ID>` with the environment UUID:

   ```bash
   curl -X GET "{{< region-param key="dd_api" code="true" >}}/api/v2/feature-flags/environments/<ENVIRONMENT_ID>" \
     -H "DD-API-KEY: ${DD_API_KEY}" \
     -H "DD-APPLICATION-KEY: ${DD_APP_KEY}"
   ```

2. Update the environment. Replace `<OIDC_PROVIDER_ID>` with the registered provider UUID. Copy the existing `name`, `queries`, `is_production`, and `require_feature_flag_approval` values from the previous response into the request. The following example uses a production environment named `Production`:

   ```bash
   curl -X PUT "{{< region-param key="dd_api" code="true" >}}/api/v2/feature-flags/environments/<ENVIRONMENT_ID>" \
     -H "DD-API-KEY: ${DD_API_KEY}" \
     -H "DD-APPLICATION-KEY: ${DD_APP_KEY}" \
     -H "Content-Type: application/json" \
     -d '{
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
     }'
   ```

   Updates require `name` and `queries`. Include the current `is_production` and `require_feature_flag_approval` values to preserve them; omitting either resets it to `false`.

3. Verify assignment downloads with the configured SDK after enabling authorization. Saving the policy does not verify key publication.

Configure the provider and environment policy independently in each Datadog site. These settings are not copied between sites.

To disable authorization, repeat the read and update process with `subject_authorization_state` set to `disabled`. Disabling retains the provider association. To also clear the association, set `subject_authorization_oidc_provider_id` to `null` in that update.

## Rotate signing keys

1. Add the new public key to your JWKS, retaining existing keys. Use a new `kid` and keep the total at three keys or fewer.
2. Allow at least 15 minutes for key changes to propagate.
3. Verify assignment downloads with a token signed by the new key, then start issuing replacement tokens with it.
4. Keep old public keys published until tokens signed with them expire. Remove keys after they are no longer needed.

Key changes take time to propagate. Removing a key does not immediately invalidate it everywhere. If Datadog cannot refresh the JWKS, previously published keys can remain usable. Contact your Datadog representative if you need help revoking a compromised key.

## Troubleshoot assignment downloads

- **`401 ASSIGNMENT_AUTHORIZATION_FAILED`:** The token is missing or invalid. Check its signature, `kid`, issuer, audience, subject, environment UUID, `feature_flags` Boolean, and timestamps.
- **`503 ASSIGNMENT_AUTHORIZATION_UNAVAILABLE`:** Verification configuration is unavailable. Check the selected provider and supported settings, allow time for keys to propagate, and contact your Datadog representative if failures persist.
- **Environment API errors:** A new provider ID must be registered in the same organization and site. Invalid or unknown provider IDs return `400`; an unavailable registry returns `503`. A concurrent policy change returns `409`; retrieve the environment again before retrying.

For browser configuration and proxy requirements, see [Authorize assignment downloads][4]. Authorization controls new downloads; token expiration alone does not clear previously downloaded assignments.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /feature_flags/client/javascript/#installation
[2]: /account_management/workload_identity_federation/#register-the-oidc-provider-in-datadog
[3]: /api/latest/feature-flags/#list-environments
[4]: /feature_flags/client/javascript/#authorize-assignment-downloads
[5]: /api/latest/feature-flags/#update-an-environment
[6]: /account_management/api-app-keys/
[7]: /feature_flags/concepts/permissions/
