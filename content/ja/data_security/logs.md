---
aliases:
- /ja/logs/security/
further_reading:
- link: /data_security/
  tag: ドキュメント
  text: Datadog に送信されるデータの主要カテゴリを確認する
- link: /data_security/pci_compliance/
  tag: ドキュメント
  text: PCI 準拠の Datadog 組織をセットアップする
- link: https://www.datadoghq.com/blog/datadog-pci-compliance-log-management-apm/
  tag: ブログ
  text: Datadog から PCI に準拠したログ管理と APM を発表
title: ログ管理のデータセキュリティ
---

<div class="alert alert-info">このページでは、Datadog に送信されるデータのセキュリティについて説明します。クラウドやアプリケーションのセキュリティ製品や機能をお探しの場合は、<a href="/security/" target="_blank">セキュリティ</a>のセクションをご覧ください。</div>

ログ管理は、複数の[環境と形式][1]をサポートし、ほぼどのようなデータでも選択して Datadog に送信することができます。ここでは、Datadog にログを送信する際に利用できる主なセキュリティ保護とフィルタリング制御について説明します。

**注**: ログは、様々な Datadog 製品で閲覧することができます。APM トレースページで表示されるログを含め、Datadog UI で表示されるすべてのログは、ログ管理製品に含まれるものです。

## 情報セキュリティ

Datadog Agent は、HTTPS または TLS で暗号化された TCP 接続（ポート 10516、要アウトバウンド通信）を介して、ログを Datadog に送信します（[Agent によるログの転送]を参照[3]）。

Datadog は、インデックス化されたログに対して対称暗号化保存 (AES-256) を使用します。インデックス化されたログは、ユーザー定義の保存期間が過ぎると、Datadog プラットフォームから削除されます。

## ログのフィルタリング

バージョン 6 以降の場合は、Agent から Datadog アプリケーションに送信されるログをフィルターするように Agent を設定できます。特定のログが送信されないようにするには、`type` に **exclude_at_match** または **include_at_match** を指定して `log_processing_rules` [設定][3]を使用します。これで、1 つ以上の正規表現からなるリストを作成することで、指定された包含/除外規則に基づいて一部のログを除外するように Agent に指示できます。

## ログの難読化

バージョン 6 の場合は、Agent から Datadog アプリケーションに送信されるログに含まれる特定のパターンを難読化するように Agent を設定できます。ログに含まれる機密要素をマスクするには、`type` に **mask_sequences** を指定して `log_processing_rules` [設定][4]を使用します。これで、1 つ以上の正規表現からなるリストを作成することで、ログ内の機密データを編集するように Agent に指示できます。

あるいは、クラウドまたは Agent で [Sensitive Data Scanner][7] を使用して、機密データの識別、タグ付け、およびマスキングを行うことができます。Sensitive Data Scanner では、スキャン対象のデータを定義するスキャングループを設定し、次にデータ内で照合する機密情報を特定するためのスキャンルールを設定します。一致した場合にデータをマスキングするかどうかを選択することも可能です。Datadog は、クレジットカード番号、メールアドレス、IP アドレス、API キーなどの機密情報を検出するための事前定義済みルールライブラリを提供しています。また、正規表現に基づくスキャンルールを独自に定義して、特定の機密情報を検出することもできます。

Sensitive Data Scanner は、[プロセッサー][8]として [Observability Pipelines][9] でも利用可能です。Observability Pipelines を使用すると、独自のインフラストラクチャー内でログを収集および処理し、それらを下流のインテグレーションへ転送することができます。

## HIPAA 対応ユーザー

{{% hipaa-customers %}}

## ログ管理における PCI DSS 準拠

{{< site-region region="us" >}}

<div class="alert alert-warning">
ログ管理における PCI DSS 準拠は、<a href="/getting_started/site/">US1 サイト</a>の Datadog 組織でのみ利用可能です。
</div>

Datadog では、リクエストに応じて、お客様が PCI DSS 準拠の Datadog 組織にログを送信することができます。PCI 準拠の Datadog 組織を設定するには、以下の手順に従います。

{{% pci-logs %}}

詳しくは [PCI DSS 準拠][1]を参照してください。APM で PCI 準拠を実現するためには、[APM の PCI DSS 準拠][1]を参照してください。

[1]: /ja/data_security/pci_compliance/
[2]: /ja/data_security/pci_compliance/?tab=apm

{{< /site-region >}}

{{< site-region region="us3,us5,eu,gov,ap1" >}}

ログ管理の PCI DSS 準拠は、{{< region-param key="dd_site_name" >}} サイトではご利用いただけません。

{{< /site-region >}}

## エンドポイントの暗号化

すべてのログ送信エンドポイントは暗号化されています。以下のレガシーエンドポイントはまだサポートされています。

* `tcp-encrypted-intake.logs.datadoghq.com`
* `lambda-tcp-encrypted-intake.logs.datadoghq.com`
* `gcp-encrypted-intake.logs.datadoghq.com`
* `http-encrypted-intake.logs.datadoghq.com`

### その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/logs/log_collection/
[2]: /ja/agent/logs/log_transport
[3]: /ja/agent/logs/advanced_log_collection/#filter-logs
[4]: /ja/agent/logs/advanced_log_collection/#scrub-sensitive-data-from-your-logs
[5]: /ja/logs/explorer/#share-views
[6]: https://www.datadoghq.com/legal/hipaa-eligible-services/
[7]: /ja/sensitive_data_scanner/
[8]: /ja/observability_pipelines/processors/sensitive_data_scanner
[9]: /ja/observability_pipelines/