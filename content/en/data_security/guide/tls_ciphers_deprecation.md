---
title: TLS cipher suite deprecation
---

## Overview

TLS is a security protocol that protects web traffic by providing confidentiality and integrity of data in transit between clients and servers. During a TLS session, both parties agree on a cipher suite that dictates which cryptographic algorithms to use.

Datadog uses a modern cryptographic engine that requires specific cipher suite configurations.

## Client compatibility

Datadog's systems require TLS 1.2 or higher. Compatible clients can negotiate cipher suites, but specific client-side configurations may alter this behavior.

The Datadog Agent is configured to use modern cipher suites and is compatible with Datadog's requirements. If you experience connection issues, they typically originate from custom integrations, scripts, or older HTTP clients such as certain versions of Windows PowerShell or Ruby.

To test your client's cipher suite compatibility, connect to [tls-config-test.datadoghq.com][3], which is configured with Datadog's accepted cipher suites. Alternatively, use the [How's My SSL? API][1] to check the cipher suites your client supports. For assistance troubleshooting connection issues, contact [Datadog support][2].

## Accepted cipher suites

{{< site-region region="us,eu,us3,us5,ap1,ap2" >}}

Effective September 1, 2026, Datadog will accept only the following cipher suites:

| Code         | IANA Name                                         |
|--------------|---------------------------------------------------|
| `0xC0,0x2B`  | `TLS_ECDHE_ECDSA_WITH_AES_128_GCM_SHA256`        |
| `0xC0,0x2F`  | `TLS_ECDHE_RSA_WITH_AES_128_GCM_SHA256`          |
| `0xC0,0x2C`  | `TLS_ECDHE_ECDSA_WITH_AES_256_GCM_SHA384`        |
| `0xC0,0x30`  | `TLS_ECDHE_RSA_WITH_AES_256_GCM_SHA384`          |
| `0xCC,0xA9`  | `TLS_ECDHE_ECDSA_WITH_CHACHA20_POLY1305_SHA256` |
| `0xCC,0xA8`  | `TLS_ECDHE_RSA_WITH_CHACHA20_POLY1305_SHA256`   |
| `0xC0,0x09`  | `TLS_ECDHE_ECDSA_WITH_AES_128_CBC_SHA`          |
| `0xC0,0x0A`  | `TLS_ECDHE_ECDSA_WITH_AES_256_CBC_SHA`          |
| `0x13,0x01`  | `TLS_AES_128_GCM_SHA256`                        |
| `0x13,0x02`  | `TLS_AES_256_GCM_SHA384`                        |
| `0x13,0x03`  | `TLS_CHACHA20_POLY1305_SHA256`                  |

{{< /site-region >}}

{{< site-region region="gov" >}}

Datadog accepts the following cipher suites for {{< region-param key="dd_site_name" >}}:

| Code         | IANA Name                                  |
|--------------|--------------------------------------------|
| `0xC0,0x2F`  | `TLS_ECDHE_RSA_WITH_AES_128_GCM_SHA256`    |
| `0xC0,0x30`  | `TLS_ECDHE_RSA_WITH_AES_256_GCM_SHA384`    |
| `0xC0,0x2B`  | `TLS_ECDHE_ECDSA_WITH_AES_128_GCM_SHA256`  |
| `0xC0,0x2C`  | `TLS_ECDHE_ECDSA_WITH_AES_256_GCM_SHA384`  |

{{< /site-region >}}

{{< site-region region="us,eu,us3,us5,ap1,ap2" >}}

## Disabled cipher suites

Datadog has disabled support for the following cipher suites, which are considered weak under modern security standards.

### Effective September 1, 2026

Beginning **September 1, 2026**, Datadog will disable support for the following cipher suites:

| Code         | IANA Name                                  | OpenSSL Name             |
|--------------|--------------------------------------------|--------------------------|
| `0xC0,0x14`  | `TLS_ECDHE_RSA_WITH_AES_256_CBC_SHA`       | `ECDHE-RSA-AES256-SHA`   |
| `0xC0,0x13`  | `TLS_ECDHE_RSA_WITH_AES_128_CBC_SHA`       | `ECDHE-RSA-AES128-SHA`   |
| `0x00,0x9D`  | `TLS_RSA_WITH_AES_256_GCM_SHA384`          | `AES256-GCM-SHA384`      |
| `0x00,0x9C`  | `TLS_RSA_WITH_AES_128_GCM_SHA256`          | `AES128-GCM-SHA256`      |
| `0x00,0x35`  | `TLS_RSA_WITH_AES_256_CBC_SHA`             | `AES256-SHA`             |
| `0x00,0x2F`  | `TLS_RSA_WITH_AES_128_CBC_SHA`             | `AES128-SHA`             |

### Effective April 1, 2024

As of **April 1, 2024**, Datadog does not support the following cipher suites across its public-facing applications. Clients using these cipher suites receive connection error messages.

| Code         | IANA Name                                  |
|--------------|--------------------------------------------|
| `0xC0,0x27`  | `TLS_ECDHE_RSA_WITH_AES_128_CBC_SHA256`    |
| `0xC0,0x23`  | `TLS_ECDHE_ECDSA_WITH_AES_128_CBC_SHA256`  |
| `0xC0,0x28`  | `TLS_ECDHE_RSA_WITH_AES_256_CBC_SHA384`    |
| `0xC0,0x24`  | `TLS_ECDHE_ECDSA_WITH_AES_256_CBC_SHA384`  |
| `0x00,0x3C`  | `TLS_RSA_WITH_AES_128_CBC_SHA256`          |
| `0x00,0x3D`  | `TLS_RSA_WITH_AES_256_CBC_SHA256`          |

{{< /site-region >}}


[1]: https://www.howsmyssl.com/s/api.html
[2]: /help
[3]: https://tls-config-test.datadoghq.com
