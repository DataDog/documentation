---
title: Attacker Fingerprint
disable_toc: false
further_reading:
- link: "/security/application_security/threats/attacker_clustering"
  tag: "Documentation"
  text: "Attacker Clustering"
---

This topic describes a feature called **Datadog Attacker Fingerprint** to identify attackers beyond IP addresses.

## Overview

Datadog Attacker Fingerprint identifies attackers beyond IP addresses. Datadog Attacker fingerprints are automatically computed and added to your traces on attack or login attempts when Application Security Management (ASM) is enabled on your service.

Datadog Attacker fingerprints are composed of several fragments:
* Endpoint Identifier
* Session Identifier
* Header Identifier
* Network Identifier

Each fragment identifies request specifics by looking for certain headers and query body fields, and by hashing cookie values and query parameters.

## Attacker Fingerprint fragment details

### Endpoint identifier

The endpoint identifier fragment provides information about a specific endpoint, as well as the parameters used to call it. This fragments uses the following information:
* HTTP method
* Hash of the request URI (excluding any query parameters)
* Hash of the sorted query parameter fields
* Hash of the sorted top-level body fields

### Session identifier

The session identifier fragment tracks users based on their session information and whether they are authenticated. This fragment uses the following information:
* Hash of the user ID
* Hash of the sorted cookie fields
* Hash of the cookie values by fields
* Hash of the session ID if available

If all of the fields are unavailable, the fragment is omitted as it does not provide meaningful information.

### Header identifier

The header identifier fragment provides information about the headers used in the request. This particular fragment uses the following information:
* Known headers: Referer, Connection, Accept-Encoding, Content-Encoding, Cache-Control, TE, Accept-Charset, Content-Type, Accept, Accept-Language.
* Hash of the user agent
* The number of unknown headers
* Hash of the sorted unknown headers. The list of unknown headers excludes all XFF headers, cookies and x-datadog headers.


### Network identifier

The network identifier fragment provides information about the network part of the request. This fragment uses the following information:
* The number of IPs in the XFF header used by the caller to determine the client’s IP.
* The presence or absence of the known XFF headers in the following order: x-forwarded-for, x-real-ip, true-client-ip, x-client-ip, x-forwarded, forwarded-for, x-cluster-client-ip, fastly-client-ip, cf-connecting-ip, cf-connecting-ipv6.


## How to use Attacker Fingerprints

Fragments can be used as filters in the ASM Traces explorer by filtering on the desired fingerprint field. For example: `@appsec.fingerprint.header.common_headers:0110000110` will filter on all requests that have the same common headers (Connection, Accept-Encoding, Content-Type and Accept).

{{< img src="security/application_security/threats/attacker-fingerprint-trace.png" alt="Screenshot of an ASM trace with attacker fingerprint in the trace side panel"  >}}

Attacker fingerprints are used in the [Attacker Clustering][1] feature. If a significant portion of your traffic presents the same fingerprint attributes, attacker clustering will show it has a common attack attribute.


## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /security/application_security/threats/attacker_clustering
