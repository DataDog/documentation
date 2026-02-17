---
app_id: sentinelone
app_uuid: 4b8cdc1f-0f97-4e19-b127-99427b56df88
assets:
  dashboards:
    SentinelOne-Overview: assets/dashboards/SentinelOne-Overview_dashboard.json
  integration:
    auto_install: false
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 611
    source_type_name: SentinelOne
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- log collection
- security
custom_kind: integration
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: sentinelone
integration_id: sentinelone
integration_title: SentinelOne
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: sentinelone
public_title: SentinelOne
short_description: SentinelOne Singularity Endpoint からアラート、脅威、テレメトリを収集
supported_os:
- windows
- macos
- linux
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS::Windows
  - Supported OS::macOS
  - Supported OS::Linux
  - Category::Log Collection
  - Category::Security
  - Offering::Integration
  configuration: README.md#Setup
  description: SentinelOne Singularity Endpoint からアラート、脅威、テレメトリを収集
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: SentinelOne
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-internal-core -->
## 概要

SentinelOne はエンドポイント検知と応答 (EDR) のソリューションで、エンドポイントの脅威の検出、保護、対応を行います。SentinelOne Singularity Endpoint は、静的および振る舞いに基づく検知を使用して、企業全体で既知および未知の脅威を特定し、封じ込めます。Windows、MacOS、Linux オペレーティング システムに対応しています。

このインテグレーションを使用すると、SentinelOne Management API からアクティビティ ログ、アラート、脅威を直接収集できます。SentinelOne と [Datadog Cloud SIEM][1] を組み合わせることで、クラウド インフラストラクチャーとエンドポイント全体を完全に可視化できます。あらかじめ用意された検出ルールにより、SentinelOne の組み込みアラートや任意のカスタム脅威が、Cloud SIEM の他のシグナルと並んで表示され、すべてのシステムを単一ビューで確認できます。

また、[SentinelOne Cloud Funnel][2] を構成して、Amazon S3 バケットから Datadog へ SentinelOne の生テレメトリを転送することもできます。Cloud SIEM を利用しているお客様は、この EDR テレメトリ データを長期保管、カスタム検出、調査、レポーティングに利用できます。

収集されたすべてのログ データは、検索やダッシュボード作成を容易にするためにパースおよび正規化されます。

## セットアップ

SentinelOne のお客様は、アラート、脅威、アクティビティ ログに加えて Cloud Funnel のテレメトリも収集できます。データ収集のセットアップ手順は次のとおりです:

### アラート、脅威、アクティビティ ログを収集

1. SentinelOne Cloud コンソールにログインし、**Settings** をクリックします。
2. **Users** タブを選択します。
3. **Service Users** を選択します。
4. **Actions** をクリックし、**Create New Service User** を選択します。
5. 表示された **Create New Service User** のポップアップ ウィンドウで、**Name** と **Description** を入力し、**Expiration Date** には 10 年後の日付を選択します。
6. **Next** をクリックします。
7. **Site** を選択し、サイトの **Viewer** を選択します。
8. **Create User** をクリックします。
9. 表示されたポップアップ ウィンドウで **Copy API Token** をクリックして、新しいトークンをコピーします。
   {{% site-region region="gov" %}}
10. SentinelOne サービス ユーザー アカウントに対して、次のエンドポイント権限を有効化します:

- ビュー
- View Threats
- Show Applications
- Search on Deep Visibility
- Fetch Logs
  {{% /site-region %}}

### SentinelOne Cloud Funnel テレメトリを収集

**注**: SentinelOne のドキュメントにアクセスするには、SentinelOne Customer Portal アカウントでログインしてください。

1. Amazon S3 バケットを作成して構成します。手順は、SentinelOne のドキュメントの [Amazon S3 バケットの構成方法][3] を参照してください。
2. SentinelOne Management Console で Cloud Funnel のストリーミングを設定します。手順は、SentinelOne のドキュメントの [Cloud Funnel ストリーミングの有効化方法][4] を参照してください。

   Cloud Funnel の構成ページで、次の値を使用します:

   - **Cloud Provider**: AWS (Amazon Web Services)
   - **S3 Bucket Name**: 最初の手順で作成した S3 バケット名

3. S3 で、Cloud Funnel のログが S3 バケットに送られていることを確認します。
4. [Datadog Forwarder > CloudFormation][5] ページで **Launch Stack** をクリックし、Datadog Forwarder の CloudFormation スタックをデプロイします。

   次のパラメーターを設定します:

   - `DdApiKey`: お使いの Datadog API キー
   - `DdSite`: お使いの [Datadog サイト][6]
   - `DdTags`: `source:sentinelone,service:sentinelone,endpoint:EDR_Telemetry`

5. AWS コンソールで Datadog Forwarder の Lambda 関数を開きます。**Triggers** タブに移動して **Add trigger** を選択します。

   - トリガー タイプとして **S3** を選択します。
   - **Bucket** に、使用する S3 バケットを入力します。
   - **Event types** で **All object create events** を選択します。

#### 検証

AWS コンソールで、Lambda 関数の **Monitor** タブにエラーがないか確認します。

Datadog の Log Explorer で、SentinelOne の S3 ログを確認します。

## 収集データ

### メトリクス

SentinelOne にはメトリクスは含まれていません。

### ログ

ログの発生元は次のとおりです:

- **Activity Logs** は、SentinelOne Console における管理アクティビティのデータを記録します。たとえば、ユーザーが追加・削除された場合や、認証ルール (2FA) が変更された場合に、そのアクティビティがイベントとして記録されます。同様に、脅威が軽減された場合、または未軽減のままの場合にもイベントが生成されます。これらのイベントは、調査や脅威ハンティングに使用できます。
- **Threats** は、ブルート フォースやパスワード スプレーの試行など、特定の悪意あるアクティビティ、リスクの高いプラクティス、攻撃の検出に関わります。ログには、脅威の作成および更新が含まれます。
- **Alerts** は、条件が満たされたときにアラート イベントを生成して配信できるようにします。条件には、しきい値を上回るまたは下回るメトリクス、イベントの発生、一定期間内の複数イベントの発生などが一般的に含まれます。

### イベント

SentinelOne インテグレーションにはイベントは含まれていません。

### サービスチェック
{{< get-service-checks-from-git "sentinelone" >}}


## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][8]までお問い合わせください。

[1]: https://app.datadoghq.com/security/home
[2]: https://www.sentinelone.com/platform/singularity-cloud-funnel/
[3]: https://community.sentinelone.com/s/article/000006282
[4]: https://community.sentinelone.com/s/article/000006285
[5]: https://docs.datadoghq.com/ja/logs/guide/forwarder/?tab=cloudformation#cloudformation
[6]: https://docs.datadoghq.com/ja/getting_started/site/
[7]: https://github.com/DataDog/integrations-internal-core/blob/master/sentinelone/assets/service_checks.json
[8]: https://docs.datadoghq.com/ja/help/