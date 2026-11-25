---
title: Verify Flag Responses with Response Signing
description: Protect browser, iOS, and Android flag assignments from response tampering, replay, and spoofing. Response signing gives each response cryptographic origin attestation from Datadog.
further_reading:
- link: "/feature_flags/client/"
  tag: "Documentation"
  text: "Client-Side Feature Flags"
- link: "/feature_flags/concepts/flag_key_obfuscation/"
  tag: "Documentation"
  text: "Flag Key Obfuscation"
algolia:
  tags: ['response tampering', 'origin attestation', 'response signing', 'response integrity', 'replay protection', 'signed flag assignments', 'man-in-the-middle', 'feature flags security']
---

{{< callout url="https://www.datadoghq.com/support/" btn_hidden="true" header="Response signing is in Preview" >}}
Feature Flags response signing is in Preview. To request access, contact <a href="https://www.datadoghq.com/support/">Datadog Support</a> or your account team.<br><br>The response signing SDK option is experimental. Its name and behavior can change before general availability.
{{< /callout >}}

Response signing verifies that each feature flag assignment response came from Datadog, wasn't changed in transit, and answers the current request. Without a check from the Datadog edge to the application, a client application can't confirm that a response received over the network came from Datadog unchanged and answers the current request. 

With response signing, Datadog signs each response with ECDSA P-256, and the SDK verifies the signature against a pinned Datadog root certificate that ships inside the SDK. This protects your flag assignments against tampered, spoofed, and replayed responses, and against responses moved from one request to another. Response signing is available in the [iOS][1], [Android][2], and [browser (JavaScript)][3] SDKs.

[Setup](#enable-response-signing) for response signing requires enabling a single SDK option. You don't need to manage any keys, certificates, or Datadog settings. Response signing doesn't encrypt traffic, which TLS still handles, and it doesn't protect a compromised device or application. Flag requests must go to the Datadog flag endpoint. A flag proxy or a custom flag endpoint is not supported.

## Key terms

Response tampering
: A change to a response after the server sends it and before the application uses it.

Origin attestation
: Cryptographic proof of which party produced a response. With response signing, the proof shows that Datadog produced the response.

Replay
: The delivery of a valid earlier response in place of the response to the current request.

Nonce
: A random, single-use value. The SDK creates a new nonce for each request. The signature covers the nonce, so a signature for one request is not valid for another.

Pinned root
: A root certificate that the SDK contains and trusts. The SDK does not accept a root from the network or from the device certificate store.

## Response tampering and origin attestation

Client-side feature flags control application behavior, such as which features are visible, which code paths run, and which experiment variant a user sees. The SDK receives these flag assignments from Datadog in an HTTPS response.

TLS encrypts the connection between the device and the server that terminates TLS. TLS alone does not prove to the application that the response body came from Datadog. A response can pass through components that terminate or re-establish TLS, for example:

- Corporate or network proxies that inspect TLS traffic.
- Content delivery and caching layers.
- Debugging proxies or network tools that a user installs and trusts on a device.

Any of these components can change a response, return a different response, or return an old response. The application cannot detect this without a check that is independent of the transport. This check is _origin attestation_: proof that Datadog produced this exact response for this exact request.

### Threats and protections

The following table lists the threats to flag assignment responses and the protection that response signing gives for each threat.

| Threat | Example | Protected | How |
| --- | --- | --- | --- |
| Changed response body | A TLS-inspecting network proxy changes a flag value from `false` to `true`. | Yes | The signature covers the exact response bytes. A change of one byte causes verification to fail. |
| Spoofed response | A server that is not Datadog returns its own flag assignments. | Yes | Only a certificate chain that leads to the pinned Datadog root is accepted. The attacker does not have a Datadog signing key. |
| Replayed response | An attacker stores a valid response and returns it later. | Yes | The signature covers the nonce of the current request and an expiry time of at most 5 minutes. |
| Response for a different request | An attacker returns a valid response for a different user, client token, or URL. | Yes | The signature binds the request content (method, host, path, query, and body), the client identity (the client token), and the listed request headers. |
| Changed response header | A proxy adds or removes the `DD-Flag-Selection-Ignored` header. | Yes | The signature covers each response header that Datadog lists in the signed response header list. The SDK uses only the verified values of these headers. |
| Blocked refresh | An attacker blocks new responses so that the application keeps old flag values. | Partly | The attacker cannot change the values. By default, the SDK serves the last verified flags and reports a stale state. To use default values instead, enable the `expireVerifiedFlags` option. See [Signature expiry](#signature-expiry). |
| Removed signature | An attacker removes the signature headers so that the SDK accepts an unsigned response. | Yes | In `required` mode, the SDK rejects a response that has no signature. It does not retry without signing. |
| Misused certificate | An attacker uses a TLS or code-signing certificate from the same hierarchy to sign responses. | Yes | The leaf certificate must contain a Datadog-specific extended key usage for flag responses. |
| Eavesdropping | A network observer reads flag values. | Not by signing | TLS encrypts the traffic. Signing does not encrypt. |
| Inspection by the device owner | The user reads flag values in the browser developer tools. | No | The device owner can always read data that the application receives. Do not put secrets in client-side flag values. |
| Compromised device or application | Malware or a modified application changes values after verification. | No | Signing protects data in transit. It cannot protect an application whose code an attacker controls. Enforce sensitive decisions on your server. |

## How response signing works

Response signing adds origin attestation to every flag assignment response. When you enable response signing, the SDK verifies three properties before it uses a response:

- **Origin**: Datadog produced the response.
- **Integrity**: Nobody changed the response body, the listed response headers, or the signed parts of the request. See [Request and verification flow](#request-and-verification-flow).
- **Freshness**: The response answers this exact request. It is not a copy of an earlier response.

In `required` mode, the SDK rejects a response that fails any of these checks, and your application does not receive unverified flag values. In `observe` mode, the SDK reports the failure but accepts the response.

### Trust model

Response signing uses a public key infrastructure (PKI). A PKI is a hierarchy of certificates. Each certificate is signed by the certificate above it. The SDK trusts only the top certificate, the root. It accepts a lower certificate only when an unbroken chain of signatures connects it to that root.

- **Pinned root**: Each SDK release contains a Datadog root certificate. The SDK does not trust the device certificate store. It does not download trust anchors from the network. A response can never supply its own root.
- **Intermediate certificates**: The root signs one or more intermediate certificates. Datadog uses intermediates to issue signing certificates, so that the root key is not used for request traffic.
- **Leaf certificates**: An intermediate issues a short-lived leaf certificate. Datadog signs flag assignment responses with the leaf private key. The leaf key is an ECDSA P-256 key, and signatures use SHA-256.
- **Dedicated purpose**: Each leaf certificate contains a Datadog-specific extended key usage (EKU). An EKU is a certificate field that limits what a certificate can be used for. The SDK rejects a leaf that does not contain this EKU. It also rejects a leaf that permits any purpose.

### Request and verification flow

When response signing is enabled, each flag assignment request follows these steps, from the SDK's request to verification of the signed response:

1. Your application asks the SDK for flag assignments.
1. The SDK creates a random nonce for this request.
1. The SDK sends the assignment request over HTTPS. The request includes these headers:
   - `X-DD-FEATURE-FLAGS-CAPABILITIES` with the value `response-signing-v1`
   - `x-datadog-feature-flags-signature-version` with the value `1`
   - `x-datadog-feature-flags-request-nonce` with the nonce
   - `x-datadog-feature-flags-signed-headers` with the names of the request headers that the SDK binds
1. Datadog computes the flag assignments.
1. Datadog signs a record of the exchange with the current leaf key. This record includes:
   - The request method, host, path, query, and body.
   - The nonce.
   - A hash of the client token, and a hash of the `Authorization` header if the request has one.
   - The name and value of each request header in `x-datadog-feature-flags-signed-headers`. The list always contains `content-type` and `x-dd-feature-flags-capabilities`. It also contains `dd-application-id` and `x-rkyv` when the SDK sends them.
   - The response status and the exact response body.
   - The issue time and expiry time of the signature.
   - The leaf certificate and each intermediate certificate.
   - The name and value of each response header in `x-datadog-feature-flags-signed-response-headers`. The list contains `content-type` and `DD-Flag-Selection-Ignored`.
1. Datadog returns the response. The signature, the leaf certificate, the intermediate certificate chain, and the signed response header list are in `x-datadog-feature-flags-*` response headers.
1. The SDK verifies the certificate chain: leaf, then each intermediate, then the pinned root. It checks each signature, the validity dates of each certificate, and the leaf EKU.
1. The SDK verifies the signature against the request it sent, the exact bytes it received, and the listed response headers.
1. The SDK checks that the signature has not expired. A signature is valid for at most 5 minutes after Datadog issues it.
1. If all checks pass, the SDK parses the response and makes the flag values available to your application. If a check fails in `required` mode, the SDK rejects the response. See [Verification failures](#verification-failures).

The SDK verifies the response before it parses the assignments. In `required` mode, unverified data never reaches flag evaluation. The SDK uses a listed response header, such as `DD-Flag-Selection-Ignored`, only after verification passes.

The signature does not cover request headers that are not in the list, such as `DD-Assignment-Token` and `dd-service`. These headers cannot change the content of a signed response.

A proxy or CDN that changes, adds, or removes a listed request header or response header causes verification to fail.

### Certificate rotation

Leaf certificates are short-lived. Their validity is a few days. Datadog issues new leaf certificates and rotates them automatically every day.

Each response carries its own leaf certificate and intermediate chain. The SDK pins only the root. It does not pin or store leaf or intermediate certificates. As a result:

- A leaf rotation needs no SDK update and no application change.
- An intermediate rotation under the same root needs no SDK update.
- A device that was offline during several rotations can verify the next response without a record of earlier certificates.

## Enable response signing

Set the response signing option in your SDK to `required`. Datadog enables signing for your organization during Preview. No other configuration is necessary, except for the browser CDN bundle. With the CDN bundle, you must also serve the verifier files. See [JavaScript client setup][3].

| SDK | Option | Setup instructions |
| --- | --- | --- |
| Browser (`@datadog/openfeature-browser`) | `experimentalResponseSigning: { mode: 'required' }` | [JavaScript client setup][3] |
| iOS (`dd-sdk-ios`) | `experimentalResponseSigning: .init(mode: .required)` | [iOS client setup][1] |
| Android (`dd-sdk-android-flags`) | `.experimentalResponseSigning(ResponseSigningMode.REQUIRED)` (requires `@OptIn(ExperimentalFlagsApi::class)`) | [Android client setup][2] |

Each SDK also has an `expireVerifiedFlags` option. See [Signature expiry](#signature-expiry).

Response signing does not support a flag proxy or a custom flag endpoint. The SDK must send flag configuration requests to the Datadog flag endpoint. A network proxy that forwards requests and responses without change does not affect verification. A proxy that changes the response body or a listed header causes verification to fail.

If you do not enable response signing, nothing changes. The SDK sends the same requests and receives the same responses as before.

## Verification failures

In `required` mode, the SDK rejects a response if any check fails. A request that was redirected also fails. In `observe` mode, the SDK reports the same failures but accepts the response. The SDK reports each failure with a reason code. All three SDKs use the same reason codes. Only the browser SDK reports `verifier-unavailable`.

| Reason code | Meaning | What to check |
| --- | --- | --- |
| `missing-proof` | One or more proof headers are absent, including the certificate chain header. | A proxy, CDN, or custom endpoint removed the signature headers, or Datadog did not enable response signing for your organization. |
| `invalid-proof` | The signature headers are present but not valid. For example, the signed response header list does not contain a required name. | A proxy or CDN changed the response headers. |
| `invalid-certificate` | The certificate chain does not lead to the pinned Datadog root, or a certificate rule fails. For example, the leaf has no Datadog Feature Flags EKU. | The response did not come from Datadog, or the network intercepts TLS. Contact Datadog Support. |
| `invalid-signature` | The signature does not match the request and the response. | The response body, or a listed request header or response header, changed in transit. |
| `expired-proof` | The signature is expired, or its issue time is more than 30 seconds after the device time. | Check the device clock. |
| `response-too-large` | The response body is larger than the size limit for signed responses. | Contact Datadog Support. |
| `unsupported-request` | This request cannot be used with response signing. | Use the default flags endpoint and request options. |
| `unavailable-crypto` | The platform cryptography API is not available. | Browser: use a secure (HTTPS) context. Mobile: use a supported OS version. |
| `missing-anchor` | The SDK has no trusted root for this Datadog site. | Use a Datadog site that supports response signing. |
| `unsupported-site` | Response signing is not available on this Datadog site. | Use a Datadog site that supports response signing. |
| `verifier-unavailable` | Browser only. The SDK could not load its verifier code. | With the CDN bundle, serve the `chunks/` directory and let the page load scripts from it. See [JavaScript client setup][3]. |

The iOS and Android SDKs log each failure once for each reason code, in this format:

```text
Flag response signing failed (<code>): <what failed>. <fix hint>.
```

The browser SDK puts a message in the same format in `PROVIDER_ERROR` events and in the evaluation details. For the error types on each platform, see the setup section for your SDK.

When the SDK rejects a response, it does not apply the response. The SDK does not retry the request without signing. An attacker cannot force a downgrade to unsigned responses.

In `required` mode, the SDK keeps verified flag assignments in memory only. It does not read or write flag data on disk.

- Before the first verified response, and after an app restart or page reload, flag evaluations return the default value that your code supplies.
- After a change to the evaluation context, evaluations return default values until a verified response for the new context arrives.
- In these cases, the evaluation details report an error, and the provider reports an error state. A new verified response restores the ready state.

In `required` mode, the SDK fails closed: when it cannot verify a response, it uses your default values, not unverified data. Choose default values that are safe for your application.

### Signature expiry

Each signature expires at most 5 minutes after Datadog issues it. It can expire sooner. The `expireVerifiedFlags` option sets what the SDK does in `required` mode when the signature of the last verified response expires:

- `false` (default): The SDK continues to serve the last verified flags. The provider reports a stale state (`PROVIDER_STALE` in OpenFeature). The SDK does not fetch again by itself.
- `true`: The SDK stops serving the verified flags. The provider reports an error state, and evaluations return default values.

In both settings, a new verified response restores the ready state. The SDK detects expiry with a timer at the expiry time and with a check at each flag read.

<div class="alert alert-warning">With the default setting, a network attacker who blocks refreshes can keep the flags at their last verified values. The attacker cannot change the values. The guarantee is that Datadog verified the values once, not that they are fresh. If your application must use default values instead of old verified values, set <code>expireVerifiedFlags</code> to <code>true</code>.</div>

### Fetch again before expiry

No SDK fetches flag assignments again when a signature expires. With the default setting, a `required` client changes to the stale state no later than 5 minutes after the last verified response. To get a new verified response, set the evaluation context again with the current context:

| SDK | Call |
| --- | --- |
| Browser | `OpenFeature.setContext()` |
| iOS | `FlagsClient.setEvaluationContext` |
| Android | `FlagsClient.setEvaluationContext` |

Each call starts a new fetch, also when the context does not change. If you set `expireVerifiedFlags` to `true`, fetch again before the signature expires. Leave time for network latency. For example, fetch again every 2 minutes while the application is in use.

## Response signing behavior reference

The following table summarizes how response signing behaves in common situations.

| Topic | Behavior |
| --- | --- |
| Replay attacks | Each request carries a new random nonce that the signature covers, and each signature expires at most 5 minutes after Datadog issues it. A stored response does not verify for a later request. See [Threats and protections](#threats-and-protections). |
| TLS certificate pinning | Pinning checks the server that terminates the TLS connection. Response signing checks the response content from the Datadog edge to the SDK, whatever network components or caches the response passes through. |
| Response signing not enabled | Nothing changes. Datadog signs a response only when the request asks for a signature. |
| Performance | For each assignment response, the SDK verifies one ECDSA P-256 signature and a short certificate chain. This takes little CPU time compared to the network request. Signed responses are delivered as one complete body, not streamed. The response headers add a few kilobytes. |
| Cached or offline data | In `required` mode, the SDK keeps flag data in memory only. After an app restart or page reload, evaluations return default values until a verified response arrives. Offline after a verified response, the SDK serves the verified flags until their signature expires. The SDK does not fetch again by itself. See [Fetch again before expiry](#fetch-again-before-expiry). |
| Certificate rotation | Datadog rotates leaf certificates automatically every day. Rotation needs no action from you and no SDK update. See [Certificate rotation](#certificate-rotation). |
| Proxies and custom flag endpoints | A flag proxy or a custom flag endpoint is not supported. If you configure the SDK to send flag requests to a proxy, keep response signing off. A network proxy that forwards traffic without change does not affect verification. |
| Supported Datadog sites | Available on all [Datadog sites][5] where client-side Feature Flags is available. In `required` mode on an unsupported site, the SDK sends no flag request and reports `unsupported-site`. In `observe` mode, it logs a warning and sends unsigned requests. |

<!-- TODO: confirm the list of supported Datadog sites before publication. --> 

## Limits of response signing

- **Signing does not encrypt responses.** TLS encrypts the traffic. Signing adds a check on top of TLS.
- **Signing does not hide flag values.** The device owner can read the assignments, the flag values, and the signature. Do not put secrets in client-side flag values. To reduce readable flag names in responses, see [Flag Key Obfuscation][4].
- **Signing does not protect a compromised device.** If an attacker controls the device or the application process, the attacker can change the application code, the SDK, or the evaluated values after verification. Enforce sensitive access decisions on your server.
- **Signing does not change authorization.** Your client token and targeting rules control which assignments a client receives. Signing proves only that Datadog produced the response.
- **Key compromise and revocation.** In Preview, the SDKs do not check certificate revocation. Until a compromised certificate expires, a party that holds its private key can sign responses that pass verification.
  - If a leaf key or an intermediate key is compromised, Datadog issues new certificates. This rotation needs no SDK update. A leaf certificate is valid for a few days.
  - If a root key is compromised, you must update the SDK to replace the pinned root. Datadog publishes a security bulletin in this case.
- **The check starts at the Datadog edge.** Datadog signs responses at its edge network. The check covers the path from the Datadog edge to the SDK.
- **Signing applies to flag assignment responses only.** Exposure events and evaluation telemetry that the SDK sends to Datadog are not signed by this feature.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /feature_flags/client/ios/#verify-flag-responses-with-response-signing
[2]: /feature_flags/client/android/#verify-flag-responses-with-response-signing
[3]: /feature_flags/client/javascript/#verify-flag-responses-with-response-signing
[4]: /feature_flags/concepts/flag_key_obfuscation/
[5]: /getting_started/site/
