# 概要

**Transport Layer Security (TLS)** は、Web トラフィックを保護するために使用される重要なセキュリティプロトコルです。TLS は、クライアントとサーバー間で情報をやり取りする際に、データの機密性と完全性を提供します。TLS セッションの確立中に、両当事者は通信を保護するために使用される暗号アルゴリズムを定める暗号スイートについて合意します。

Datadog は、顧客データのセキュリティと保護に対する継続的なコミットメントの一環として、システム全体により最新の暗号化エンジンを展開しており、それにより受け入れ可能な構成にいくつかの変更が生じます。

**2024 年 4 月 1 日**以降、Datadog の外部公開向けアプリケーションでは、以下の暗号スイートのサポートが無効化されました。これらの旧プロトコルが無効化された後に非対応クライアントで Datadog に接続すると、接続エラーが表示されます。

## 無効な暗号スイート

| コード       | IANA 名                                |
|------------|------------------------------------------|
| 0xC0,0x27   | TLS_ECDHE_RSA_WITH_AES_128_CBC_SHA256    |
| 0xC0,0x23   | TLS_ECDHE_ECDSA_WITH_AES_128_CBC_SHA256  |
| 0xC0,0x28   | TLS_ECDHE_RSA_WITH_AES_256_CBC_SHA384    |
| 0xC0,0x24   | TLS_ECDHE_ECDSA_WITH_AES_256_CBC_SHA384  |
| 0x00,0x3C   | TLS_RSA_WITH_AES_128_CBC_SHA256          |
| 0x00,0x3D   | TLS_RSA_WITH_AES_256_CBC_SHA256          |

この日以降、以下の暗号スイートが使用可能になります。

## 使用可能な暗号スイート

| コード       | IANA 名                                       |
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

この変更は、Datadog for Government サイトには影響を与えず、当該サイトでは以下の暗号スイートが引き続き受け入れられます。

## 使用可能な暗号スイート (Datadog for Government)

| コード       | IANA 名                                |
|------------|------------------------------------------|
| 0xC0,0x2F   | TLS_ECDHE_RSA_WITH_AES_128_GCM_SHA256    |
| 0xC0,0x30   | TLS_ECDHE_RSA_WITH_AES_256_GCM_SHA384    |
| 0xC0,0x2B   | TLS_ECDHE_ECDSA_WITH_AES_128_GCM_SHA256  |
| 0xC0,0x2C   | TLS_ECDHE_ECDSA_WITH_AES_256_GCM_SHA384  |

# クライアントとの互換性

Datadog のシステムでは、すでに **TLS 1.2** の使用が義務付けられており、互換性のあるクライアントは他の暗号スイートをネゴシエートすることができます。ただし、クライアント側の特定の構成によって、この動作が変更される場合があります。対象の暗号で構成されている [tls-config-test.datadoghq.com][3] に接続するためにお好みのクライアントを使用するか、[How's my SSL? API][1] を使用してサポートする暗号スイートを確認してください。その他ご不明な点がございましたら、[Datadog サポート][2]までお問い合わせください。


[1]: https://www.howsmyssl.com/s/api.html
[2]: /ja/help
[3]: https://tls-config-test.datadoghq.com