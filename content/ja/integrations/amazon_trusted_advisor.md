---
categories:
- AWS
- クラウド
- コスト管理
- ログの収集
- プロビジョニング
dependencies: []
description: AWS Trusted Advisor のキーメトリクスを追跡します。
doc_link: https://docs.datadoghq.com/integrations/amazon_trusted_advisor/
draft: false
further_reading:
- link: https://www.datadoghq.com/blog/monitor-aws-trusted-advisor/
  tag: ブログ
  text: Datadog で AWS Trusted Advisor のサービス制限チェックを監視する
git_integration_title: amazon_trusted_advisor
has_logo: true
integration_id: ''
integration_title: AWS Trusted Advisor
integration_version: ''
is_public: true
kind: インテグレーション
manifest_version: '1.0'
name: amazon_trusted_advisor
public_title: Datadog-AWS Trusted Advisor インテグレーション
short_description: AWS Trusted Advisor のキーメトリクスを追跡します。
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## 概要

AWS Trusted Advisor は、AWS ベストプラクティスに従ってリソースをプロビジョニングするために、リアルタイムガイダンスを提供するオンラインツールです。

このインテグレーションを有効にすると、Datadog にすべての Trusted Advisor メトリクスを表示できます。

**注**: このインテグレーションは、AWS のビジネスサポートプランまたはエンタープライズサポートプランのお客様に対してのみ機能します。

## 計画と使用

### インフラストラクチャーリスト

[Amazon Web Services インテグレーション][1]をまだセットアップしていない場合は、最初にセットアップします。

### メトリクスの収集

1. IAM コンソールで、ポリシードキュメントのフィールドにアクションとして `support:describe*` および `support:refresh*` を追加します。AWS サポート API に関する詳細は、[AWS サポートのアクション、リソース、条件キー][2]を参照してください。
2. [AWS インテグレーションページ][3]で、`Metric Collection` タブの下にある `Trusted Advisor` が有効になっていることを確認します。
3. [Datadog - AWS Trusted Advisor インテグレーション][4]をインストールします。

### 収集データ

#### ログの有効化

AWS Trusted Advisor から S3 バケットまたは CloudWatch のいずれかにログを送信するよう構成します。

**注**: S3 バケットにログを送る場合は、_Target prefix_ が `amazon_trusted_advisor` に設定されているかを確認してください。

#### ログを Datadog に送信する方法

1. [Datadog Forwarder Lambda 関数][5]をまだセットアップしていない場合は、セットアップします。
2. Lambda 関数がインストールされたら、AWS コンソールから、Amazon Trusted Advisor ログを含む S3 バケットまたは CloudWatch のロググループに手動でトリガーを追加します。

    - [S3 バケットに手動トリガーを追加][6]
    - [CloudWatch ロググループに手動トリガーを追加][7]

## リアルユーザーモニタリング

### データセキュリティ
{{< get-metrics-from-git "amazon_trusted_advisor" >}}


### ヘルプ

AWS Trusted Advisor インテグレーションには、イベントは含まれません。

### ヘルプ

AWS Trusted Advisor インテグレーションには、サービスのチェック機能は含まれません。

## ダッシュボード  

AWS Trusted Advisor インテグレーションダッシュボードにデータを反映するには

1. サポート権限を構成します。
    - IAM コンソールで、ポリシードキュメントのテキストボックスに `support:describe*` と `support: refresh*` をアクションとして追加します。
1.  アップグレードされた AWS サポートプランを利用します。

Datadog Trusted Advisor ダッシュボードは、[AWS Trusted Advisor チェック][9]一式にアクセスする必要があります。AWS は、アップグレードされた AWS サポートプランでのみ、これらを利用できるようにしています。AWS プランにフルアクセスが含まれていることを確認してください。

## ヘルプ

ご不明な点は、[Datadog のサポートチーム][10]までお問合せください。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}



[1]: https://docs.datadoghq.com/ja/integrations/amazon_web_services/
[2]: https://docs.aws.amazon.com/service-authorization/latest/reference/list_awssupport.html
[3]: https://app.datadoghq.com/integrations/amazon-web-services
[4]: https://app.datadoghq.com/integrations/amazon-trusted-advisor
[5]: https://docs.datadoghq.com/ja/logs/guide/forwarder/
[6]: https://docs.datadoghq.com/ja/integrations/amazon_web_services/?tab=allpermissions#collecting-logs-from-s3-buckets
[7]: https://docs.datadoghq.com/ja/integrations/amazon_web_services/?tab=allpermissions#collecting-logs-from-cloudwatch-log-group
[8]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_trusted_advisor/amazon_trusted_advisor_metadata.csv
[9]: https://aws.amazon.com/premiumsupport/trustedadvisor
[10]: https://docs.datadoghq.com/ja/help/