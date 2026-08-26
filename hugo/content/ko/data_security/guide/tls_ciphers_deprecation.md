# 개요

**전송 계층 보안(TLS)**은 웹 트래픽을 보호하는 데 사용되는 중요한 보안 프로토콜입니다. 이 프로토콜은 정보를 교환하는 클라이언트와 서버 간에 전송 중인 데이터의 기밀성과 무결성을 제공합니다. TLS 세션을 설정하는 동안 양 당사자는 통신 보안에 사용되는 암호화 알고리즘을 지정하는 암호 스위트(suite)에 동의합니다.

고객의 데이터 보안과 보호를 위한 지속적인 노력의 일환으로 Datadog는 시스템 전체에 최신 암호화 엔진을 도입하여 허용 가능한 설정을 일부 변경하고 있습니다.

2024년 4월 1일**부터 Datadog는 공개용 애플리케이션에서 다음 암호 스위트(suite)에 대한 지원을 중단했습니다. 이전 프로토콜이 비활성화된 후 지원되지 않는 클라이언트를 사용하여 Datadog에 연결하면 연결 오류 메시지가 표시됩니다.

## 비활성화된 암호 스위트

| 코드       | IANA 이름                                |
|------------|------------------------------------------|
| 0xC0,0x27   | TLS_ECDHE_RSA_WITH_AES_128_CBC_SHA256    |
| 0xC0,0x23   | TLS_ECDHE_ECDSA_WITH_AES_128_CBC_SHA256  |
| 0xC0,0x28   | TLS_ECDHE_RSA_WITH_AES_256_CBC_SHA384    |
| 0xC0,0x24   | TLS_ECDHE_ECDSA_WITH_AES_256_CBC_SHA384  |
| 0x00,0x3C   | TLS_RSA_WITH_AES_128_CBC_SHA256          |
| 0x00,0x3D   | TLS_RSA_WITH_AES_256_CBC_SHA256          |

이 날짜 이후에는 다음 암호 스위트가 허용됩니다:

## 허용되는 암호 스위트

| 코드       | IANA 이름                                       |
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

이 변경 사항은 허용되는 암호 스위트(suite)가 다음과 같이 유지되는 정부 사이트의 경우 Datadog에는 영향을 미치지 않습니다:

## 허용되는 암호 스위트(정부 기관의 경우 Datadog)

| 코드       | IANA 이름                                |
|------------|------------------------------------------|
| 0xC0,0x2F   | TLS_ECDHE_RSA_WITH_AES_128_GCM_SHA256    |
| 0xC0,0x30   | TLS_ECDHE_RSA_WITH_AES_256_GCM_SHA384    |
| 0xC0,0x2B   | TLS_ECDHE_ECDSA_WITH_AES_128_GCM_SHA256  |
| 0xC0,0x2C   | TLS_ECDHE_ECDSA_WITH_AES_256_GCM_SHA384  |

# 클라이언트 호환성

Datadog의 시스템은 이미 **TLS 1.2**를 사용해야 하며 호환 클라이언트는 다른 암호 스위트(suite)를 협상할 수 있습니다. 그러나 특정 클라이언트측 설정에 따라 이 동작이 변경될 수 있습니다. 원하는 클라이언트 을 사용하여 대상 암호로 설정된 [tls-config-test.datadoghq.com][3]에 연결하거나 [내 SSL 상태 API][1]를 사용하여 지원되는 암호 스위트에 연결하세요. 추가 질문이 있는 경우 [Datadog 지원][2]으로 문의하세요.


[1]: https://www.howsmyssl.com/s/api.html
[2]: /ko/help
[3]: https://tls-config-test.datadoghq.com