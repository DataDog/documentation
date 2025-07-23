---
title: Attacker Fingerprint
disable_toc: false
aliases:
  - /security/application_security/threats/attacker_fingerprint
further_reading:
- link: "/security/application_security/security_signals/attacker_clustering"
  tag: "Documentation"
  text: "Attacker Clustering"
---

This topic describes a feature called **Datadog Attacker Fingerprint** to identify attackers beyond IP addresses.

## Overview

Datadog Attacker Fingerprint identifies attackers beyond IP addresses. Datadog Attacker fingerprints are automatically computed and added to your traces on attack or login attempts when App and API Protection (AAP) is enabled on your service.

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
* Hash of request URI
* Hash of query parameter fields
* Hash of body fields

### Session identifier

The session identifier fragment tracks users based on their session information and whether they are authenticated. This fragment uses the following information:
* Hash of user ID
* Hash of cookie fields
* Hash of cookie values
* Hash of session ID

If all of the fields are unavailable, the fragment is omitted as it does not provide meaningful information.

### Header identifier

The header identifier fragment provides information about the headers used in the request. This particular fragment uses the following information:
* Presence of known headers: Referer, Connection, Accept-Encoding, etc.
* Hash of user agent
* The number of unknown headers
* Hash of unknown headers. The list of unknown headers excludes all XFF headers, cookies and x-datadog headers.


### Network identifier

The network identifier fragment provides information about the network part of the request. This fragment uses the following information:
* The number of IPs in the XFF header used by the caller to determine the client’s IP.
* The presence or absence of the known XFF headers


## How to use Attacker Fingerprints

Fragments can be used as filters in the AAP Traces explorer by filtering on the desired fingerprint field. For example: `@appsec.fingerprint.header.ua_hash:e462fa45` will filter on all requests that have the same user agent hash.

<!-- {{< img src="security/application_security/threats/attacker-fingerprint-trace.png" alt="Screenshot of an AAP trace with attacker fingerprint in the trace side panel"  >}} -->

Attacker fingerprints are used in the [Attacker Clustering][1] feature. If a significant portion of your traffic presents the same fingerprint attributes, attacker clustering will show it has a common attack attribute.


## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /security/application_security/security_signals/attacker_clustering
