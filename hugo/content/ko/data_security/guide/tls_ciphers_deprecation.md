---
title: TLS 암호 스위트 지원 중단
---
## 개요 {#overview}

TLS는 클라이언트와 서버 간에 전송되는 데이터의 기밀성과 무결성을 제공하여 웹 트래픽을 보호하는 보안 프로토콜입니다. TLS 세션 중에 양 당사자는 사용할 암호화 알고리즘을 지정하는 암호 스위트에 동의합니다.

Datadog은 특정 암호 스위트 구성을 요구하는 최신 암호화 엔진을 사용합니다.

## 클라이언트 호환성 {#client-compatibility}

Datadog 시스템에는 TLS 1.2 이상이 필요합니다. 호환되는 클라이언트는 암호 스위트를 협상할 수 있지만, 특정 클라이언트 측 구성에 따라 이 동작이 변경될 수 있습니다.

Datadog Agent는 최신 암호 스위트를 사용하도록 구성되어 있으며 Datadog의 요구 사항과 호환됩니다. 연결 문제가 발생하는 경우, 일반적으로 사용자 지정 통합, 스크립트 또는 특정 버전의 Windows PowerShell이나 Ruby와 같은 이전 HTTP 클라이언트에서 발생합니다.

클라이언트의 암호 스위트 호환성을 테스트하려면 Datadog의 허용되는 암호 스위트로 구성된 [tls-config-test.datadoghq.com][3]에 연결하세요. 또는 [How's My SSL? API][1]를 사용하여 클라이언트가 지원하는 암호 스위트를 확인할 수 있습니다. 연결 문제 해결에 대한 지원이 필요하면 [Datadog 지원팀][2]에 문의하세요.

## 허용되는 암호 스위트 {#accepted-cipher-suites}

{{< site-region region="us,eu,us3,us5,ap1,ap2,uk1" >}}

2026년 9월 1일부터 Datadog은 다음 암호 스위트만 허용합니다.

### TLS 1.2 {#tls-12}

| 코드         | IANA 이름                                         |
|--------------|---------------------------------------------------|
| `0xC0,0x2B`  | `TLS_ECDHE_ECDSA_WITH_AES_128_GCM_SHA256`         |
| `0xC0,0x2F`  | `TLS_ECDHE_RSA_WITH_AES_128_GCM_SHA256`           |
| `0xC0,0x2C`  | `TLS_ECDHE_ECDSA_WITH_AES_256_GCM_SHA384`         |
| `0xC0,0x30`  | `TLS_ECDHE_RSA_WITH_AES_256_GCM_SHA384`           |
| `0xCC,0xA9`  | `TLS_ECDHE_ECDSA_WITH_CHACHA20_POLY1305_SHA256`   |
| `0xCC,0xA8`  | `TLS_ECDHE_RSA_WITH_CHACHA20_POLY1305_SHA256`     |

### TLS 1.3 {#tls-13}

| 코드         | IANA Name                        |
|--------------|----------------------------------|
| `0x13,0x01`  | `TLS_AES_128_GCM_SHA256`         |
| `0x13,0x02`  | `TLS_AES_256_GCM_SHA384`         |
| `0x13,0x03`  | `TLS_CHACHA20_POLY1305_SHA256`   |

{{< /site-region >}}

{{< site-region region="gov,gov2" >}}

Datadog은 다음 암호 스위트를 허용합니다 {{< region-param key="dd_site_name" >}}.

### TLS 1.2 {#tls-12-1}

| 코드         | IANA 이름                                  |
|--------------|--------------------------------------------|
| `0xC0,0x2F`  | `TLS_ECDHE_RSA_WITH_AES_128_GCM_SHA256`    |
| `0xC0,0x30`  | `TLS_ECDHE_RSA_WITH_AES_256_GCM_SHA384`    |
| `0xC0,0x2B`  | `TLS_ECDHE_ECDSA_WITH_AES_128_GCM_SHA256`  |
| `0xC0,0x2C`  | `TLS_ECDHE_ECDSA_WITH_AES_256_GCM_SHA384`  |

### TLS 1.3 {#tls-13-1}

| 코드         | IANA Name                        |
|--------------|----------------------------------|
| `0x13,0x01`  | `TLS_AES_128_GCM_SHA256`         |
| `0x13,0x02`  | `TLS_AES_256_GCM_SHA384`         |

{{< /site-region >}}

{{< site-region region="us,eu,us3,us5,ap1,ap2,uk1" >}}

## 비활성화된 암호 스위트 {#disabled-cipher-suites}

Datadog은 최신 보안 표준에 따라 취약하다고 간주되는 다음 암호 스위트에 대한 지원을 비활성화했습니다.

### 2026년 9월 1일부터 시행 {#effective-september-1-2026}

**2026년 9월 1일**부터 Datadog은 다음 암호 스위트를 지원하지 않습니다.

| 코드         | IANA 이름                                  | OpenSSL 이름             |
|--------------|--------------------------------------------|--------------------------|
| `0xC0,0x09`  | `TLS_ECDHE_ECDSA_WITH_AES_128_CBC_SHA`     | `ECDHE-ECDSA-AES128-SHA` |
| `0xC0,0x0A`  | `TLS_ECDHE_ECDSA_WITH_AES_256_CBC_SHA`     | `ECDHE-ECDSA-AES256-SHA` |
| `0xC0,0x14`  | `TLS_ECDHE_RSA_WITH_AES_256_CBC_SHA`       | `ECDHE-RSA-AES256-SHA`   |
| `0xC0,0x13`  | `TLS_ECDHE_RSA_WITH_AES_128_CBC_SHA`       | `ECDHE-RSA-AES128-SHA`   |
| `0x00,0x9D`  | `TLS_RSA_WITH_AES_256_GCM_SHA384`          | `AES256-GCM-SHA384`      |
| `0x00,0x9C`  | `TLS_RSA_WITH_AES_128_GCM_SHA256`          | `AES128-GCM-SHA256`      |
| `0x00,0x35`  | `TLS_RSA_WITH_AES_256_CBC_SHA`             | `AES256-SHA`             |
| `0x00,0x2F`  | `TLS_RSA_WITH_AES_128_CBC_SHA`             | `AES128-SHA`             |

### 2024년 4월 1일부터 시행 {#effective-april-1-2024}

**2024년 4월 1일**부터 Datadog은 대중을 대상으로 하는 애플리케이션 전반에서 다음 암호 스위트를 지원하지 않습니다. 이 암호 스위트를 사용하는 클라이언트는 연결 오류 메시지를 받게 됩니다.

| 코드         | IANA 이름                                  |
|--------------|--------------------------------------------|
| `0xC0,0x27`  | `TLS_ECDHE_RSA_WITH_AES_128_CBC_SHA256`    |
| `0xC0,0x23`  | `TLS_ECDHE_ECDSA_WITH_AES_128_CBC_SHA256`  |
| `0xC0,0x28`  | `TLS_ECDHE_RSA_WITH_AES_256_CBC_SHA384`    |
| `0xC0,0x24`  | `TLS_ECDHE_ECDSA_WITH_AES_256_CBC_SHA384`  |
| `0x00,0x3C`  | `TLS_RSA_WITH_AES_128_CBC_SHA256`          |
| `0x00,0x3D`  | `TLS_RSA_WITH_AES_256_CBC_SHA256`          |

{{< /site-region >}}


[1]: https://www.howsmyssl.com/s/api.html
[2]: /ko/help
[3]: https://tls-config-test.datadoghq.com