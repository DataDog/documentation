---
title: ログ管理のセキュリティ
kind: documentation
aliases:
  - /ja/logs/security/
further_reading:
  - link: /security/
    tag: Documentation
    text: Datadog に送信されるデータの主要カテゴリを確認する
---
<div class="alert alert-info">このページは Datadog のセキュリティに関するものです。セキュリティ監視製品をお探しの場合は、<a href="/security_monitoring" target="_blank">セキュリティ監視セクション</a>をご覧ください。</div>

この記事は、[データセキュリティに関するドキュメントシリーズ][1]の一部です。

ログ管理は、複数の[環境と形式][2]をサポートし、ほぼどのようなデータでも選択して Datadog に送信することができる柔軟性を提供しています。ここでは、Datadog にログを送信する際に利用できる主なセキュリティ保護とフィルタリング制御について説明します。

## 情報セキュリティ

Datadog Agent は、HTTPS または TLS で暗号化された TCP 接続（ポート 10516、要アウトバウンド通信）を介して、ログを Datadog に送信します（[Agent によるログの転送]を参照[3]）。

Datadog は、インデックス化されたログに対して対称暗号化保存 (AES-256) を使用します。インデックス化されたログは、ユーザー定義の保存期間が過ぎると、Datadog プラットフォームから削除されます。

## ログのフィルタリング

バージョン 6 以降を使用している場合は、Agent から Datadog アプリケーションに送信されるログをフィルターするように Agent を設定できます。特定のログが送信されないようにするには、`type` に **exclude_at_match** または **include_at_match** を指定して `log_processing_rules` [設定][4]を使用します。これで、1 つ以上の正規表現からなるリストを作成することで、指定された包含/除外規則に基づいて一部のログを除外するように Agent に指示できます。

## ログの難読化

バージョン 6 を使用している場合は、Agent から Datadog アプリケーションに送信されるログに含まれる特定のパターンを難読化するように Agent を設定できます。ログに含まれる機密要素をマスクするには、`type` に **mask_sequences** を指定して `log_processing_rules` [設定][5]を使用します。これで、1 つ以上の正規表現からなるリストを作成することで、ログ内の機密データを編集するように Agent に指示できます。

## HIPAA 対応ユーザーの構成要件

Datadog は、Datadog のログ管理サービスを介して保護対象医療情報 (ePHI) を送信するお客様と業務提携契約 (BAA) を締結します。

BAA が履行される条件として、Datadog ログ管理サービスに ePHI を送信するお客様は、以下の構成を行う必要があります。

* Datadog Agent は、ログを `tcp-encrypted-intake.logs.datadoghq.com` に送信するように構成します。
* Datadog [ログ収集 AWS Lambda 関数][6]は、`DD_URL` 環境変数を設定し、`DD_USE_TCP` を `true` に設定して、ログを `lambda-tcp-encrypted-intake.logs.datadoghq.com` に送信するように構成する必要があります。
* [GCP プッシュフォワーダー][7] は、ログを `gcp-encrypted-intake.logs.datadoghq.com` に送信するように構成する必要があります。
* Datadog Agent 以外のログソースは、ログを `http-encrypted-intake.logs.datadoghq.com` に送信するように構成します。

次の構成例は、Datadog Agent から HIPAA 対応のエンドポイントにログを直接 (プロキシなしで) 送信する場合に使用できます。

```yaml
logs_enabled: true
logs_config:
  logs_dd_url: tcp-encrypted-intake.logs.datadoghq.com:10516
  logs_no_ssl: false
```

Docker Agent では、`DD_LOGS_CONFIG_LOGS_DD_URL=tcp-encrypted-intake.logs.datadoghq.com:10516` を環境変数として渡します。

また、Datadog と BAA を締結されたお客様は、現時点で一部の機能をご利用いただけません。特に、以下の点にご注意ください。

* チャットからサポートを求めることはできません。
* ログアーカイブからのリハイドレートは無効です。
* ログからのメトリクスの生成は無効です。
* ログモニターからの通知にログサンプルを含めることはできません。
* `group-by` 節を使用してログモニターを構成することはできません。
* Web インテグレーションを使用して、エクスプローラーからログを[共有][8]（またはトレース）することはできません。

ログ管理サービスが HIPAA の要件を適切に満たしているかどうかについてのご質問は、アカウントマネージャーまでお問い合わせください。

### その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/security/
[2]: /ja/logs/log_collection/
[3]: /ja/agent/logs/log_transport
[4]: /ja/agent/logs/advanced_log_collection/#filter-logs
[5]: /ja/agent/logs/advanced_log_collection/#scrub-sensitive-data-from-your-logs
[6]: /ja/integrations/amazon_lambda/#log-collection
[7]: /ja/integrations/google_cloud_platform/?tab=datadogussite#log-collection
[8]: /ja/logs/explorer/#share-views