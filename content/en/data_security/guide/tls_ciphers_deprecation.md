# Overview

**Transport Layer Security (TLS)** is a critical security protocol used to protect web traffic. It provides confidentiality and integrity of data in transit between clients and servers exchanging information. During the establishment of a TLS session, both parties agree on a cipher suite which dictates the cryptographic algorithms used to secure the communication.

As part of its ongoing commitment to the security and protection of its customer's data, Datadog is rolling out a more modern cryptographic engine across its systems which imposes some changes to the configurations it can accept.

Beginning **April 1st, 2024**, Datadog disabled support for the following cipher suites across its public-facing applications. If you use unsupported clients to connect to Datadog after the older protocols are disabled, you will receive connection error messages.

Starting **July 1st, 2024**, Datadog will force HTTP to HTTPS redirection for all intake endpoints, using an HTTP 308 response code. This change is necessary as some intake endpoints still accept plain HTTP payloads to maintain compatibility with older API clients. Ensure that your application clients can follow these redirection codes, or update their configuration to utilize HTTPS. Otherwise, you might receive connection error messages.

## Disabled Cipher Suites

| Code       | IANA Name                                |
|------------|------------------------------------------|
| 0xC0,0x27   | TLS_ECDHE_RSA_WITH_AES_128_CBC_SHA256    |
| 0xC0,0x23   | TLS_ECDHE_ECDSA_WITH_AES_128_CBC_SHA256  |
| 0xC0,0x28   | TLS_ECDHE_RSA_WITH_AES_256_CBC_SHA384    |
| 0xC0,0x24   | TLS_ECDHE_ECDSA_WITH_AES_256_CBC_SHA384  |
| 0x00,0x3C   | TLS_RSA_WITH_AES_128_CBC_SHA256          |
| 0x00,0x3D   | TLS_RSA_WITH_AES_256_CBC_SHA256          |

After this date, the following cipher suites will be accepted:

## Accepted Cipher Suites

| Code       | IANA Name                                       |
|------------|-------------------------------------------------|
| 0xC0,0x2B   | TLS_ECDHE_ECDSA_WITH_AES_128_GCM_SHA256        |
| 0xC0,0x2F   | TLS_ECDHE_RSA_WITH_AES_128_GCM_SHA256          |
| 0xC0,0x2C   | TLS_ECDHE_ECDSA_WITH_AES_256_GCM_SHA384        |
| 0xC0,0x30   | TLS_ECDHE_RSA_WITH_AES_256_GCM_SHA384          |
| 0xCC,0xA9   | TLS_ECDHE_ECDSA_WITH_CHACHA20_POLY1305_SHA256 |
| 0xCC,0xA8   | TLS_ECDHE_RSA_WITH_CHACHA20_POLY1305_SHA256   |
| 0xC0,0x09   | TLS_ECDHE_ECDSA_WITH_AES_128_CBC_SHA          |
| 0xC0,0x13   | TLS_ECDHE_RSA_WITH_AES_128_CBC_SHA            |
| 0xC0,0x0A   | TLS_ECDHE_ECDSA_WITH_AES_256_CBC_SHA          |
| 0xC0,0x14   | TLS_ECDHE_RSA_WITH_AES_256_CBC_SHA            |
| 0x00,0x9C   | TLS_RSA_WITH_AES_128_GCM_SHA256               |
| 0x00,0x9D   | TLS_RSA_WITH_AES_256_GCM_SHA384               |
| 0x00,0x2F   | TLS_RSA_WITH_AES_128_CBC_SHA                 |
| 0x00,0x35   | TLS_RSA_WITH_AES_256_CBC_SHA                 |
| 0x13,0x01   | TLS_AES_128_GCM_SHA256                        |
| 0x13,0x02   | TLS_AES_256_GCM_SHA384                        |
| 0x13,0x03   | TLS_CHACHA20_POLY1305_SHA256                  |

This change does not impact Datadog for Government site for which the accepted cipher suites remain the following:

## Accepted Cipher Suites (Datadog for Government)

| Code       | IANA Name                                |
|------------|------------------------------------------|
| 0xC0,0x2F   | TLS_ECDHE_RSA_WITH_AES_128_GCM_SHA256    |
| 0xC0,0x30   | TLS_ECDHE_RSA_WITH_AES_256_GCM_SHA384    |
| 0xC0,0x2B   | TLS_ECDHE_ECDSA_WITH_AES_128_GCM_SHA256  |
| 0xC0,0x2C   | TLS_ECDHE_ECDSA_WITH_AES_256_GCM_SHA384  |

# Client Compatibility

Datadog's systems already require the use of **TLS 1.2** and compatible clients will be able to negotiate other cipher suites. However, specific client-side configurations may alter this behavior. Use the client of your choice to connect to [tls-config-test.datadoghq.com][3] which is configured with the target ciphers, or use [How's my SSL? API][1] to check the cipher suites it supports. For any additional questions, reach out to [Datadog support][2].


[1]: https://www.howsmyssl.com/api/
[2]: /help
[3]: https://tls-config-test.datadoghq.com
