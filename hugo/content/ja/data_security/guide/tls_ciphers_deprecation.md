---
title: TLS暗号スイートの廃止
---
## 概要 {#overview}

TLSは、クライアントとサーバー間で転送されるデータの機密性と整合性を提供することにより、Webトラフィックを保護するセキュリティプロトコルです。TLSセッション中、双方は使用する暗号アルゴリズムを規定する暗号スイートに合意します。

Datadogは、特定の暗号スイート構成を必要とする最新の暗号エンジンを使用しています。

## クライアントとの互換性 {#client-compatibility}

Datadogのシステムでは、TLS 1.2以上が必要です。互換性のあるクライアントは暗号スイートをネゴシエーションできますが、クライアント側の特定の構成によってこの動作が変更される場合があります。

Datadog Agentは最新の暗号スイートを使用するように構成されており、Datadogの要件と互換性があります。コネクションの問題が発生する場合、通常はカスタム統合、スクリプト、または特定のバージョンのWindows PowerShellやRubyなどの古いHTTPクライアントが原因です。

クライアントの暗号スイートの互換性をテストするには、Datadogの使用可能な暗号スイートで構成されている [tls-config-test.datadoghq.com][3] に接続してください。または、[How's My SSL?API][1] を使用して、クライアントがサポートする暗号スイートを確認してください。コネクションの問題のトラブルシューティングについては、[Datadogサポート][2] までお問い合わせください。

## 使用可能な暗号スイート {#accepted-cipher-suites}

{{< site-region region="us,eu,us3,us5,ap1,ap2,uk1" >}}

2026年9月1日より、Datadogは以下の暗号スイートのみを受け入れます。

| コード         | IANA名                                         |
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

{{< site-region region="gov,gov2" >}}

Datadogは、以下の暗号スイートを以下に対して受け入れます。 {{< region-param key="dd_site_name" >}}:

| コード         | IANA名                                  |
|--------------|--------------------------------------------|
| `0xC0,0x2F`  | `TLS_ECDHE_RSA_WITH_AES_128_GCM_SHA256`    |
| `0xC0,0x30`  | `TLS_ECDHE_RSA_WITH_AES_256_GCM_SHA384`    |
| `0xC0,0x2B`  | `TLS_ECDHE_ECDSA_WITH_AES_128_GCM_SHA256`  |
| `0xC0,0x2C`  | `TLS_ECDHE_ECDSA_WITH_AES_256_GCM_SHA384`  |

{{< /site-region >}}

{{< site-region region="us,eu,us3,us5,ap1,ap2,uk1" >}}

## 無効な暗号スイート {#disabled-cipher-suites}

Datadogは、現代のセキュリティ基準において脆弱とみなされる以下の暗号スイートのサポートを無効にしました。

### 2026年9月1日より有効 {#effective-september-1-2026}

**2026年9月1日**より、Datadogは以下の暗号スイートをサポートしていません:

| コード         | IANA名                                  | OpenSSL名             |
|--------------|--------------------------------------------|--------------------------|
| `0xC0,0x14`  | `TLS_ECDHE_RSA_WITH_AES_256_CBC_SHA`       | `ECDHE-RSA-AES256-SHA`   |
| `0xC0,0x13`  | `TLS_ECDHE_RSA_WITH_AES_128_CBC_SHA`       | `ECDHE-RSA-AES128-SHA`   |
| `0x00,0x9D`  | `TLS_RSA_WITH_AES_256_GCM_SHA384`          | `AES256-GCM-SHA384`      |
| `0x00,0x9C`  | `TLS_RSA_WITH_AES_128_GCM_SHA256`          | `AES128-GCM-SHA256`      |
| `0x00,0x35`  | `TLS_RSA_WITH_AES_256_CBC_SHA`             | `AES256-SHA`             |
| `0x00,0x2F`  | `TLS_RSA_WITH_AES_128_CBC_SHA`             | `AES128-SHA`             |

### 2024年4月1日より有効 {#effective-april-1-2024}

**2024年4月1日**より、Datadogは外部向けアプリケーション全体で以下の暗号スイートをサポートしていません。これらの暗号スイートを使用しているクライアントは、コネクションエラーメッセージを受け取ります。

| コード         | IANA名                                  |
|--------------|--------------------------------------------|
| `0xC0,0x27`  | `TLS_ECDHE_RSA_WITH_AES_128_CBC_SHA256`    |
| `0xC0,0x23`  | `TLS_ECDHE_ECDSA_WITH_AES_128_CBC_SHA256`  |
| `0xC0,0x28`  | `TLS_ECDHE_RSA_WITH_AES_256_CBC_SHA384`    |
| `0xC0,0x24`  | `TLS_ECDHE_ECDSA_WITH_AES_256_CBC_SHA384`  |
| `0x00,0x3C`  | `TLS_RSA_WITH_AES_128_CBC_SHA256`          |
| `0x00,0x3D`  | `TLS_RSA_WITH_AES_256_CBC_SHA256`          |

{{< /site-region >}}


[1]: https://www.howsmyssl.com/s/api.html
[2]: /ja/help
[3]: https://tls-config-test.datadoghq.com