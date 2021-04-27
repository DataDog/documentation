---
title: Synthetics モニタリングセキュリティ
kind: documentation
aliases:
  - /ja/synthetics/security/
further_reading:
  - link: /security/
    tag: Documentation
    text: Datadog に送信されるデータの主要カテゴリを確認する
---
<div class="alert alert-info">このページは Datadog のセキュリティに関するものです。セキュリティ監視製品をお探しの場合は、<a href="/security_monitoring" target="_blank">セキュリティ監視セクション</a>をご覧ください。</div>

この記事は、[データセキュリティに関するドキュメントシリーズ][1]の一部です。

[Synthetic モニタリング製品][2]により、シミュレートされたリクエストやビジネストランザクションを使いシステムやアプリケーションの稼働状況を監視することができます。Synthetic テストは世界中の管理ロケーションやプライベートロケーションから実行できます。

## 管理された場所での暗号化

### テスト構成と変数

* **Transport**: 非対称暗号化 - RSA (4096 ビットキー)。すべてのリクエストは Datadog Signature v1（[AWS 署名バージョン4][3]と同じ署名プロセスに基づく）を使用して署名され、認証と整合性の両方が保証されます。
* **Storage**: 対称暗号化 - AES-GCM (256 ビットキー)。

### テスト結果

* **Transport**: 非対称暗号化 - RSA (4096 ビットキー)。すべてのリクエストは Datadog Signature v1（[AWS 署名バージョン4][3]と同じ署名プロセスに基づく）を使用して署名され、認証と整合性の両方が保証されます。
* **Storage**: テスト結果の機密部分（レスポンスヘッダーや本文）は非対称暗号、RSA (4096 ビットキー) で暗号化されて保存され、テスト結果が取得される際に復号化されます。

### アーティファクト

アーティファクトとは、ブラウザテストのスクリーンショット、スナップショット、エラー、リソースのことです。

{{< site-region region="us,us3,gov" >}}

* **Storage**: [AWS S3 バケット][1]の暗号化
* **Transport**: [S3 の AWS 署名バージョン4][2]を用いた転送中の暗号化。

[1]: https://docs.aws.amazon.com/AmazonS3/latest/userguide/bucket-encryption.html
[2]: https://docs.aws.amazon.com/AmazonS3/latest/userguide/network-isolation.html

{{< /site-region >}}

{{< site-region region="eu" >}}

* **Storage**: GCS のサービスアカウント][1]による暗号化（[AES256][2]使用）。
* **Transport**: [GCS の認証、整合性、暗号化][3]を用いた転送中の暗号化。

[1]: https://cloud.google.com/storage/docs/encryption/customer-managed-keys
[2]: https://cloud.google.com/security/encryption-at-rest/default-encryption
[3]: https://cloud.google.com/security/encryption-in-transit/resources/encryption-in-transit-whitepaper.pdf

{{< /site-region >}}

## プライベートロケーションでの暗号化

### プライベートロケーションの資格情報

* **Storage**: テスト構成、変数、テスト結果リクエストの署名に使用されるプライベートロケーションの資格情報は、監査ログやアクセスポリシーを使用し暗号化されて保存されます（対称暗号化 - AES-GCM）。

### テスト構成と変数

* **Transport**: 非対称暗号化 - RSA (4096 ビットキー)。プライベートロケーションとDatadog間の通信は Datadog Signature v1（[AWS 署名バージョン4][3]と同じ署名プロセスに基づく）を使用して署名され、認証と整合性の両方が保証されます。
* **Storage**: 対称暗号化 - AES-GCM (256 ビットキー)。

### テスト結果

* **Transport**: 非対称暗号化 - RSA (4096 ビットキー)。プライベートロケーションとDatadog間の通信は Datadog Signature v1（[AWS 署名バージョン4][3]と同じ署名プロセスに基づく）を使用して署名され、認証と整合性の両方が保証されます。

* **Storage**: テスト結果の機密部分（デフォルトではレスポンスヘッダーや本文）は非対称暗号、RSA (4096 ビットキー) で暗号化されて保存され、テスト結果が取得される際に復号化されます。

### アーティファクト

アーティファクトとは、ブラウザテストのスクリーンショット、スナップショット、エラー、リソースのことです。

{{< site-region region="us,us3,gov" >}}

* **Storage**: [AWS][1]の暗号化。
* **Transport**: プライベートロケーションと Datadog 間の HTTPS トランスポート（API キーによる認証）、そして Datadog からストレージへの、[S3 の AWS 署名バージョン4][2]を用いた転送中の暗号化。

[1]: https://docs.aws.amazon.com/AmazonS3/latest/userguide/bucket-encryption.html
[2]: https://docs.aws.amazon.com/AmazonS3/latest/userguide/network-isolation.html

{{< /site-region >}}

{{< site-region region="eu" >}}

* **Storage**: GCS のサービスアカウント][1]による暗号化（[AES256][2]使用）。
* **Transport**: プライベートロケーションと Datadog 間の HTTPS トランスポート（API キーによる認証）、そして Datadog からストレージへの、[GCS の認証、整合性、暗号化][3]を用いた転送中の暗号化。

[1]: https://cloud.google.com/storage/docs/encryption/customer-managed-keys
[2]: https://cloud.google.com/security/encryption-at-rest/default-encryption
[3]: https://cloud.google.com/security/encryption-in-transit/resources/encryption-in-transit-whitepaper.pdf

{{< /site-region >}}

### その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/security/
[2]: /ja/synthetics/
[3]: https://docs.aws.amazon.com/general/latest/gr/signature-version-4.html