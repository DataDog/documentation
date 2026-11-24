---
title: Prevent Response Tampering and Verify Response Origin for Client-Side Feature Flags
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

## Summary

- **Problem**: Client applications receive flag assignments over the network. Without an end-to-end check, the application cannot prove that a response came from Datadog, was not changed in transit, and answers the current request.
- **Solution**: Response signing. Datadog signs each flag assignment response. The SDK verifies the signature against a Datadog root certificate that ships inside the SDK.
- **Protects against**: Response tampering, spoofed responses, replayed responses, and responses moved from one request to another.
- **Does not protect against**: A compromised device or application, and inspection of flag values by the device owner. Signing does not encrypt traffic. TLS still encrypts it.
- **Supported SDKs**: [iOS][1], [Android][2], and [browser (JavaScript)][3].
- **Setup**: Set one SDK option. No keys, certificates, or Datadog settings to manage. The SDK sends flag requests directly to Datadog. Proxies and custom flag endpoints are not supported.
- **Expiry**: Each signature expires after a few minutes. By default, the SDK continues to serve the last verified flags after expiry and reports a stale state. An option makes the SDK return default values instead.
- **Cryptography**: ECDSA P-256 with SHA-256, an X.509 certificate chain, a pinned root, short-lived leaf certificates that rotate automatically every day, and a per-request nonce.

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

## The problem: response tampering and origin attestation

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
| Replayed response | An attacker stores a valid response and returns it later. | Yes | The signature covers the nonce of the current request and an expiry time of a few minutes. |
| Response for a different request | An attacker returns a valid response for a different user, client token, or URL. | Yes | The signature binds the request content (method, host, path, query, and body) and the client identity (the client token). |
| Blocked refresh | An attacker blocks new responses so that the application keeps old flag values. | Partly | The attacker cannot change the values. By default, the SDK serves the last verified flags and reports a stale state. To use default values instead, enable the `expireVerifiedFlags` option. See [Signature expiry](#signature-expiry). |
| Removed signature | An attacker removes the signature headers so that the SDK accepts an unsigned response. | Yes | With signing enabled, the SDK rejects a response that has no signature. It does not retry without signing. |
| Misused certificate | An attacker uses a TLS or code-signing certificate from the same hierarchy to sign responses. | Yes | The leaf certificate must contain a Datadog-specific extended key usage for flag responses. |
| Eavesdropping | A network observer reads flag values. | Not by signing | TLS encrypts the traffic. Signing does not encrypt. |
| Inspection by the device owner | The user reads flag values in the browser developer tools. | No | The device owner can always read data that the application receives. Do not put secrets in client-side flag values. |
| Compromised device or application | Malware or a modified application changes values after verification. | No | Signing protects data in transit. It cannot protect an application whose code an attacker controls. Enforce sensitive decisions on your server. |

## The solution: response signing

Response signing adds origin attestation to every flag assignment response. When you enable response signing, the SDK verifies three properties before it uses a response:

- **Origin**: Datadog produced the response.
- **Integrity**: Nobody changed the response body or the request it answers.
- **Freshness**: The response answers this exact request. It is not a copy of an earlier response.

The SDK rejects a response that fails any of these checks. Your application does not receive unverified flag values.

### Trust model

Response signing uses a public key infrastructure (PKI). A PKI is a hierarchy of certificates. Each certificate is signed by the certificate above it. The SDK trusts only the top certificate, the root. It accepts a lower certificate only when an unbroken chain of signatures connects it to that root.

- **Pinned root**: Each SDK release contains a Datadog root certificate. The SDK does not trust the device certificate store. It does not download trust anchors from the network. A response can never supply its own root.
- **Intermediate certificates**: The root signs one or more intermediate certificates. Datadog uses intermediates to issue signing certificates, so that the root key is not used for request traffic.
- **Leaf certificates**: An intermediate issues a short-lived leaf certificate. Datadog signs flag assignment responses with the leaf private key. The leaf key is an ECDSA P-256 key, and signatures use SHA-256.
- **Dedicated purpose**: Each leaf certificate contains a Datadog-specific extended key usage (EKU). An EKU is a certificate field that limits what a certificate can be used for. The SDK rejects a leaf that does not contain this EKU. It also rejects a leaf that permits any purpose.

### Request and verification flow

1. Your application asks the SDK for flag assignments.
1. The SDK creates a random nonce for this request.
1. The SDK sends the assignment request over HTTPS. The request includes these headers:
   - `X-DD-FEATURE-FLAGS-CAPABILITIES` with the value `response-signing-v1`
   - `x-datadog-feature-flags-signature-version` with the value `1`
   - `x-datadog-feature-flags-request-nonce` with the nonce
1. Datadog computes the flag assignments.
1. Datadog signs a record of the exchange with the current leaf key. This record includes:
   - The request method, host, path, query, and body.
   - The nonce.
   - A hash of the client token, and a hash of the `Authorization` header if the request has one.
   - These request headers, if present: `content-type`, `dd-application-id`, `x-rkyv`, `x-use-cache`, and `x-dd-feature-flags-capabilities`. The signature does not cover other request headers.
   - The response status and the exact response body.
   - The issue time and expiry time of the signature.
   - The leaf certificate and each intermediate certificate.
1. Datadog returns the response. The signature, the leaf certificate, and the intermediate certificate chain are in `x-datadog-feature-flags-*` response headers.
1. The SDK verifies the certificate chain: leaf, then each intermediate, then the pinned root. It checks each signature, the validity dates of each certificate, and the leaf EKU.
1. The SDK verifies the signature against the request it sent and the exact bytes it received.
1. The SDK checks that the signature has not expired. A signature is valid for a few minutes at most.
1. If all checks pass, the SDK parses the response and makes the flag values available to your application. If a check fails, the SDK rejects the response. See [Verification failures](#verification-failures).

The SDK verifies the response before it parses the assignments. Unverified data never reaches flag evaluation.

### Certificate rotation

Leaf certificates are short-lived. Their validity is a few days. Datadog issues new leaf certificates and rotates them automatically every day.

Each response carries its own leaf certificate and intermediate chain. The SDK pins only the root. It does not pin or store leaf or intermediate certificates. As a result:

- A leaf rotation needs no SDK update and no application change.
- An intermediate rotation under the same root needs no SDK update.
- A device that was offline during several rotations can verify the next response without a record of earlier certificates.

## Enable response signing

Set the response signing option in your SDK to `required`. Datadog enables signing for your organization during Preview. No other configuration is necessary.

| SDK | Option | Setup instructions |
| --- | --- | --- |
| Browser (`@datadog/openfeature-browser`) | `experimentalResponseSigning: { mode: 'required' }` | [JavaScript client setup][3] |
| iOS (`dd-sdk-ios`) | `experimentalResponseSigning: .init(mode: .required)` | [iOS client setup][1] |
| Android (`dd-sdk-android-flags`) | `.experimentalResponseSigning(ResponseSigningMode.REQUIRED)` (requires `@OptIn(ExperimentalFlagsApi::class)`) | [Android client setup][2] |

Each SDK also has an `expireVerifiedFlags` option. See [Signature expiry](#signature-expiry).

Response signing does not support proxies or custom flag endpoints. The SDK must send flag configuration requests directly to Datadog.

If you do not enable response signing, nothing changes. The SDK sends the same requests and receives the same responses as before.

## Verification failures

With signing enabled, the SDK rejects a response if any check fails. A request that was redirected also fails. The SDK reports each failure with a reason code. All three SDKs use the same reason codes.

| Reason code | Meaning | What to check |
| --- | --- | --- |
| `missing-proof` | The response has no signature headers. | A proxy, CDN, or custom endpoint removed the signature headers, or Datadog did not enable response signing for your organization. |
| `invalid-proof` | The signature headers are present but not valid. | A proxy or CDN changed the response headers. |
| `invalid-certificate` | The certificate chain does not lead to the pinned Datadog root, or a certificate rule fails. For example, the leaf has no Datadog Feature Flags EKU. | The response did not come from Datadog, or the network intercepts TLS. Contact Datadog Support. |
| `invalid-signature` | The signature does not match the request and the response. | The response changed in transit. |
| `expired-proof` | The signature is expired or not yet valid. | Check the device clock. |
| `response-too-large` | The response body is larger than the size limit for signed responses. | Contact Datadog Support. |
| `unsupported-request` | The SDK cannot sign this request. | Use the default flags endpoint and request options. |
| `unavailable-crypto` | The platform cryptography API is not available. | Browser: use a secure (HTTPS) context. Mobile: use a supported OS version. |
| `missing-anchor` | The SDK has no trusted root for this Datadog site. | Use a Datadog site that supports response signing. |
| `unsupported-site` | Response signing is not available on this Datadog site. | Use a Datadog site that supports response signing. |

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

The SDK fails closed: when it cannot verify a response, it uses your default values, not unverified data. Choose default values that are safe for your application.

### Signature expiry

Each signature expires a few minutes after Datadog issues it. The `expireVerifiedFlags` option sets what the SDK does in `required` mode when the signature of the last verified response expires:

- `false` (default): The SDK continues to serve the last verified flags. The provider reports a stale state (`PROVIDER_STALE` in OpenFeature). Your application decides when to fetch again.
- `true`: The SDK stops serving the verified flags. The provider reports an error state, and evaluations return default values.

In both settings, a new verified response restores the ready state. The SDK detects expiry with a timer at the expiry time and with a check at each flag read.

<div class="alert alert-warning">With the default setting, a network attacker who blocks refreshes can keep the flags at their last verified values. The attacker cannot change the values. The guarantee is that Datadog verified the values once, not that they are fresh. If your application must use default values instead of old verified values, set <code>expireVerifiedFlags</code> to <code>true</code>.</div>

## Limits of response signing

- **Signing does not encrypt responses.** TLS encrypts the traffic. Signing adds a check on top of TLS.
- **Signing does not hide flag values.** The device owner can read the assignments, the flag values, and the signature. Do not put secrets in client-side flag values. To reduce readable flag names in responses, see [Flag Key Obfuscation][4].
- **Signing does not protect a compromised device.** If an attacker controls the device or the application process, the attacker can change the application code, the SDK, or the evaluated values after verification. Enforce sensitive access decisions on your server.
- **Signing does not change authorization.** Your client token and targeting rules control which assignments a client receives. Signing proves only that Datadog produced the response.
- **Signing applies to flag assignment responses only.** Exposure events and evaluation telemetry that the SDK sends to Datadog are not signed by this feature.

## Frequently asked questions

### How do I protect client-side feature flags from tampering?

Enable response signing in the Datadog iOS, Android, or browser SDK. The SDK then rejects any flag assignment response that is not signed by Datadog for the current request. See [Enable response signing](#enable-response-signing).

### How does the SDK know that a response came from Datadog?

The SDK verifies an ECDSA P-256 signature on the response. The signing certificate must chain to a Datadog root certificate that ships inside the SDK. Only Datadog holds the signing keys for that hierarchy.

### Does response signing prevent replay attacks?

Yes. Each request contains a new random nonce, and the signature covers that nonce. Each signature also expires after a few minutes. A stored response does not verify for a later request.

### Is response signing the same as TLS certificate pinning?

No. TLS certificate pinning checks the server that terminates the TLS connection. Response signing checks the response content, end to end, whatever network components or caches the response passes through.

### What happens if I do not enable response signing?

Nothing changes. An SDK that does not opt in sends the same requests as before and receives the same responses as before. Datadog signs a response only when the request asks for a signature.

### What does response signing cost in performance?

The SDK verifies one ECDSA P-256 signature and a short certificate chain for each assignment response. This work takes a small amount of CPU time compared to the network request. Signed responses are delivered as one complete body, not streamed, because the signature covers the full body. The response headers add a few kilobytes for the certificates and the signature.

### How does response signing work with cached or offline data?

In `required` mode, the SDK does not store flag data on disk. After an app restart or page reload, evaluations return your default values until the first verified response arrives. If the device goes offline after a verified response, the SDK continues to serve the verified flags. When their signature expires, the SDK reports a stale state by default, or returns default values if `expireVerifiedFlags` is `true`. See [Signature expiry](#signature-expiry).

### How does certificate rotation work?

Datadog rotates leaf certificates automatically every day. Each response includes the certificates that the SDK needs to verify it. Because the SDK pins only the Datadog root, rotation needs no action from you and no SDK update.

### Can I use response signing with a proxy or a custom flag endpoint?

No. Response signing does not support proxies or custom flag endpoints. The SDK must send flag configuration requests directly to Datadog. If you route flag requests through a proxy, keep response signing off.

### Which Datadog sites support response signing?

<!-- TODO: confirm the list of supported Datadog sites before publication. -->
Response signing is available on all Datadog sites where client-side Feature Flags is available.

If you set `required` mode on a site that does not support response signing, the SDK sends no flag request and reports the reason `unsupported-site`. Evaluations return default values. In `observe` mode on such a site, the SDK logs a warning and sends ordinary, unsigned requests.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /feature_flags/client/ios/#verify-flag-responses-with-response-signing
[2]: /feature_flags/client/android/#verify-flag-responses-with-response-signing
[3]: /feature_flags/client/javascript/#verify-flag-responses-with-response-signing
[4]: /feature_flags/concepts/flag_key_obfuscation/
