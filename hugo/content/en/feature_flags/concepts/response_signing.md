---
title: Response Signing
description: Learn how response signing lets client SDKs verify that flag assignments come from Datadog and were not changed or replayed.
further_reading:
- link: "/feature_flags/client/"
  tag: "Documentation"
  text: "Client-Side Feature Flags"
- link: "/feature_flags/concepts/flag_key_obfuscation/"
  tag: "Documentation"
  text: "Flag Key Obfuscation"
- link: "/feature_flags/concepts/distribution_channels/"
  tag: "Documentation"
  text: "Distribution Channels"
algolia:
  tags: ['response signing', 'signed assignments', 'feature flags integrity']
---

{{< callout url="https://www.datadoghq.com/support/" btn_hidden="true" header="Response signing is in Preview" >}}
Feature Flags response signing is in Preview. To request access, contact <a href="https://www.datadoghq.com/support/">Datadog Support</a> or your account team.
{{< /callout >}}

## Overview

Client applications, such as browser, iOS, and Android apps, receive their flag assignments from Datadog over the network. TLS encrypts this traffic. TLS does not tell the SDK whether a proxy, a network middlebox, or a cached copy changed the response before it reached the application.

Response signing adds an end-to-end integrity check to flag assignment responses. When you enable response signing, the SDK verifies three facts before it uses a response:

- **Origin**: Datadog produced the response.
- **Integrity**: Nobody changed the response body or the request it answers.
- **Freshness**: The response answers this exact request. It is not a copy of an earlier response.

The SDK rejects a response that fails any of these checks. Your application does not receive the unverified flag values.

Response signing is available for the [iOS][1], [Android][2], and [browser][3] SDKs. You enable it with one SDK option. You do not need to manage keys, certificates, or Datadog settings.

## How response signing works

Response signing uses a public key infrastructure (PKI). A PKI is a hierarchy of certificates. Each certificate in the hierarchy is signed by the certificate above it. The SDK trusts only the top certificate, the root. It accepts a lower certificate only when an unbroken chain of signatures connects it to that root.

### Trust model

- **Pinned root**: Each SDK release contains a Datadog root certificate. The SDK does not trust the device's system certificate store. It does not download trust anchors from the network. A response can never supply its own root.
- **Intermediate certificates**: The root signs one or more intermediate certificates. Datadog uses intermediates to issue signing certificates, so that the root key stays offline from request traffic.
- **Leaf certificates**: An intermediate issues a short-lived leaf certificate. Datadog signs assignment responses with the leaf private key. The leaf key is an ECDSA P-256 key, and signatures use SHA-256.
- **Dedicated purpose**: Each leaf certificate contains a Datadog-specific extended key usage (EKU). An EKU is a certificate field that limits what a certificate can be used for. The SDK rejects a leaf that does not contain this EKU. The SDK also rejects a leaf that permits any purpose. A certificate issued for another purpose, such as TLS or code signing, cannot sign flag responses.

### Request and verification flow

1. Your application asks the SDK for flag assignments.
1. The SDK creates a random, single-use value (a _nonce_) for this request.
1. The SDK sends the assignment request over HTTPS. The request includes these headers:
   - `X-DD-FEATURE-FLAGS-CAPABILITIES` with the value `response-signing-v1`
   - `x-datadog-feature-flags-signature-version` with the value `1`
   - `x-datadog-feature-flags-request-nonce` with the nonce
1. Datadog computes the flag assignments.
1. Datadog signs a record of the exchange with the current leaf key. This record includes:
   - The request method, URL, and request body.
   - The nonce.
   - The client token and the request headers that change the result.
   - The response status and the exact response body.
   - The issue time and expiry time of the signature.
   - The leaf certificate and each intermediate certificate.
1. Datadog returns the response with the signature, the leaf certificate, and the intermediate certificate chain in `x-datadog-feature-flags-*` response headers.
1. The SDK verifies the certificate chain: leaf, then each intermediate, then the pinned root. It checks each signature, the validity dates of each certificate, and the leaf EKU.
1. The SDK verifies the signature against the request it sent and the exact bytes it received. A different nonce, body, client token, or URL causes the check to fail.
1. The SDK checks that the signature has not expired. A signature is valid for a few minutes at most.
1. If all checks pass, the SDK parses the response and makes the flag values available to your application. If a check fails, the SDK rejects the response. For more information, see [Verification failures](#verification-failures).

The SDK verifies the response before it parses the assignments. Unverified data never reaches the flag evaluation logic.

### Certificate rotation

Leaf certificates are short-lived. Their validity is a few days. Datadog issues new leaf certificates and rotates them automatically every day.

Each response carries its own leaf certificate and intermediate chain. The SDK pins only the root. It does not pin or store leaf or intermediate certificates. As a result:

- A leaf rotation needs no SDK update and no application change.
- An intermediate rotation under the same root needs no SDK update.
- A device that was offline during several rotations can verify the next response without a record of earlier certificates.

## Verification failures

When signing is enabled, the SDK rejects a response if any of these conditions is true:

- The response has no signature.
- The certificate chain does not lead to the pinned Datadog root.
- A certificate in the chain is expired or not yet valid.
- The leaf certificate does not contain the Datadog Feature Flags EKU.
- The signature does not match the request or the response body.
- The signature has expired.
- The request was redirected.

When the SDK rejects a response, it does not apply the response. The SDK does not retry the request without signing.

<!-- TODO: confirm the production failure behavior. In the SDK PRs, required mode keeps the last verified assignments in memory only until the expiry time of their signature (five minutes at most). After that, and after an app restart, evaluations return the default value until a new verified response arrives. Required mode does not read or write the on-disk cache. -->

- The SDK can continue to use the last verified assignments for the same evaluation context until their signature expires.
- After that, flag evaluations return the default value that your code supplies. The evaluation details report reason `ERROR` and error code `GENERAL`.
- The provider reports an error state. A new verified response restores the ready state.

For SDK-specific error messages and events, see the setup section for your SDK.

## What response signing does not do

Response signing protects the integrity of flag assignments between Datadog and the SDK. It does not change these properties:

- **Signing does not encrypt responses.** TLS encrypts the traffic. Signing adds a check on top of TLS.
- **Signing does not hide flag values.** The device owner can read the assignments, the flag values, and the signature. Do not put secrets in client-facing flag values. To reduce readable flag names in responses, see [Flag Key Obfuscation][4].
- **Signing does not protect a compromised device.** If an attacker controls the device or the application process, the attacker can change the application code, the SDK, or the evaluated values after verification. Enforce sensitive access decisions on your server.
- **Signing does not change authorization.** Your client token and targeting rules control which assignments a client receives. Signing proves only that Datadog produced the response.
- **Signing does not apply to other traffic.** Exposure events and evaluation telemetry that the SDK sends to Datadog are not signed by this feature.

## FAQ

What happens if I do not enable response signing?
: Nothing changes. An SDK that does not opt in sends the same requests as before and receives the same responses as before. Datadog signs a response only when the request asks for a signature.

What does response signing cost in performance?
: The SDK verifies one ECDSA P-256 signature and a short certificate chain for each assignment response. This work takes a small amount of CPU time compared to the network request. Signed responses are delivered as one complete body, not streamed, because the signature covers the full body. The response headers add a few kilobytes for the certificates and the signature.
<!-- TODO: confirm. Add measured verification time and header size if Datadog publishes them. -->

How does response signing work with cached or offline data?
: A signature is valid for a few minutes. With signing enabled, the SDK does not treat assignments from disk as verified. After an app restart, or after the signature expires while the device is offline, the SDK needs a new verified response before it returns assigned values. Until then, evaluations return your default values.

How does certificate rotation work?
: Datadog rotates leaf certificates automatically every day. Each response includes the certificates that the SDK needs to verify it. Because the SDK pins only the Datadog root, rotation needs no action from you and no SDK update.

What if I route flag requests through a proxy?
: The proxy must forward the signing request headers without change. It must return the response body and the `x-datadog-feature-flags-*` response headers without change. For browser applications, the proxy must also allow these headers in CORS. A proxy that changes the response body causes verification to fail.
<!-- TODO: confirm which proxy and custom endpoint configurations support signing at launch. -->

Which Datadog sites support response signing?
: <!-- TODO: confirm the list of supported Datadog sites at launch. --> Response signing is available on all Datadog sites where client-side Feature Flags is available.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /feature_flags/client/ios/#verify-flag-responses-with-response-signing
[2]: /feature_flags/client/android/#verify-flag-responses-with-response-signing
[3]: /feature_flags/client/javascript/#verify-flag-responses-with-response-signing
[4]: /feature_flags/concepts/flag_key_obfuscation/
