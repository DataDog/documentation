---
title: Datadog Attacker Fingerprint
aliases:
  - /security/application_security/threats/attacker_fingerprint
disable_toc: false
further_reading:
- link: "/security/application_security/threats/attacker_clustering"
  tag: "Documentation"
  text: "Attacker Clustering"
---

This topic describes a feature called **Datadog Attacker Fingerprint** to identify attackers beyond IP addresses.

## Overview

Datadog Attacker fingerprints are automatically computed and added to your traces on attack or login attempts when Application Security Management (ASM) is enabled on your service.

They are composed of several fragments:
* Endpoint Identifier
* Session Identifier
* Header Identifier
* Network Identifier

Each of those fragment identify specificities of the requests by looking at certain header presences, hashing cookie values, hashing query parameters or query body fields.

## Attacker Fingerprint Fragments in details

### Endpoint Identifier

The endpoint identifier fragment provides information about a specific endpoint, as well as the parameters used to call said endpoint. This fragments uses the following information:
* HTTP method
* hash of the request URI (excluding any query parameters)
* hash of the sorted query parameter fields
* hash of the sorted top-level body fields

### Session Identifier

The session identifier fragment can be used to track users based on their session information and whether they are authenticated or not. This fragment uses the following information:
* hash of the user ID
* hash of the sorted cookie fields
* hash of the cookie values by fields
* hash of the session ID if available

If all of the fields are unavailable, the fragment will be omitted as it will provide no meaningful information.

### Header Identifier

The header identifier fragment provides information about the headers used in the request. This particular fragment uses the following information:
* known headers: Referer, Connection, Accept-Encoding, Content-Encoding, Cache-Control, TE, Accept-Charset, Content-Type, Accept, Accept-Language.
* hash of the user agent
* the number of unknown headers
* hash of the sorted unknown headers. The list of unknown headers excludes all XFF headers, cookies and x-datadog headers.


### Network Identifier

The network identifier fragment provide information about the network part of the request. This fragment uses the following information:
* the number of IPs in the XFF header used by the caller to determine the client’s IP
* the presence or absence of the known XFF headers in the following order: x-forwarded-for, x-real-ip, true-client-ip, x-client-ip, x-forwarded, forwarded-for, x-cluster-client-ip, fastly-client-ip, cf-connecting-ip, cf-connecting-ipv6


## How to use Attacker Fingerprints

Those fragments can be used as filters on ASM trace explorer, by filtering on the desired fingerprint field, for example: `@appsec.fingerprint.header.common_headers:0110000110` will filter on all requests that have the same common headers (Connection, Accept-Encoding, Content-Type and Accept).

{{< img src="security/application_security/threats/attacker-fingerprint-trace.png" alt="Screenshot of an ASM trace with attacker fingerprint in the trace side panel"  >}}

Attacker fingerprints are used in the [Attacker Clustering][1] feature. If a significant portion of your traffic presents the same fingerprint attributes, attacker clustering will show it has a common attribute of the attack.


## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /security/application_security/threats/attacker_clustering
