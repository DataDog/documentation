---
aliases:
- /ja/logs/security/
further_reading:
- link: /data_security/
  tag: ドキュメント
  text: Datadog に送信されるデータの主要カテゴリを確認する
- link: https://www.datadoghq.com/blog/datadog-pci-compliance-log-management-apm/
  tag: GitHub
  text: Datadog から PCI に準拠したログ管理と APM を発表
kind: documentation
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

## HIPAA 対応ユーザー

Datadog は、Datadog のログ管理サービスを介して保護対象医療情報 (ePHI) を送信するお客様と業務提携契約 (BAA) を締結します。

Datadog と BAA を締結されたお客様は、この機能をご利用いただけません。

* チャットからサポートを求めることはできません。
* Web インテグレーションを使用して、エクスプローラーからログ、セキュリティシグナル、またはトレースを[共有][5]することはできません。
* セキュリティルールでは、通知タイトルにトリガーとなるグループ化の値を含めることができません。
* セキュリティルールにメッセージテンプレート変数を含めることはできません。
* セキュリティルールは Webhook によって通知することができません。

ログ管理サービスが HIPAA の適用要件をどのように満たしているかについての質問がある場合は、アカウントマネージャーにお問い合わせください。HIPAA 対応のお客様は、特定の暗号化を実施するために、特定のエンドポイントを使用してログを送信する必要はありません。暗号化は、すべてのログ提出用エンドポイントで有効です。

## ログ管理における PCI DSS 準拠

{{< site-region region="us" >}}

<div class="alert alert-warning">
ログ管理の PCI DSS 準拠は、<a href="/getting_started/site/">US1 サイト</a>の Datadog 組織でのみ利用可能です。
</div>

Datadog では、リクエストに応じて、お客様が PCI DSS 準拠の Datadog 組織にログを送信することができます。PCI 準拠の Datadog 組織を設定するには、以下の手順に従います。

1. [Datadog サポート][2]または[カスタマーサクセスマネージャー][3]に連絡し、組織を PCI 準拠の組織として構成するようリクエストします。
2. Datadog サポートまたはカスタマーサクセスが組織が PCI DSS に準拠していることを確認した後、PCI 準拠の専用エンドポイント (`agent-http-intake-pci.logs.datadoghq.com`) にログを送信するように Agent コンフィギュレーションファイルを構成します。
    ```
    logs_config:
      logs_dd_url: <http://agent-http-intake-pci.logs.datadoghq.com:443|agent-http-intake-pci.logs.datadoghq.com:443>
    ```
    **注**: ポートを構成に含める必要があります。PCI コンプライアンスは HTTP でのログ転送のみを使用します。Agent を使用する場合は、[HTTP 転送を強制する][5]必要があります。

ログ管理サービスが PCI DSS の要件を適切に満たしているかどうかについてのご質問は、アカウントマネージャーまでお問い合わせください。

APM で PCI 準拠を実現するためには、[APM の PCI DSS 準拠][6]を参照してください。

[1]: /ja/getting_started/site/
[2]: /ja/help/
[3]: mailto:success@datadoghq.com
[4]: /ja/account_management/audit_trail/#setup
[5]: /ja/agent/logs/log_transport/?tab=https#enforce-a-specific-transport
[6]: /ja/tracing/configure_data_security/#pci-dss-compliance-for-compliance-for-apm

{{< /site-region >}}

{{< site-region region="us3,us5,eu,gov,ap1" >}}

ログ管理の PCI DSS 準拠は、{{< region-param key="dd_site_name" >}} サイトではご利用いただけません。

{{< /site-region >}}

## エンドポイントの暗号化

すべてのログ送信エンドポイントは暗号化されています。以下のレガシーエンドポイントもまだサポートされています。

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