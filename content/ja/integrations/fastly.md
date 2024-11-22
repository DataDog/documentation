---
app_id: fastly
app_uuid: baa14f81-c988-4262-9a9f-e268e9476689
assets:
  dashboards:
    fastly: assets/dashboards/fastly_overview.json
  integration:
    auto_install: false
    configuration: {}
    events:
      creates_events: false
    metrics:
      check: fastly.requests
      metadata_path: metadata.csv
      prefix: fastly.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 57
    source_type_name: Fastly
  monitors:
    5XX errors are higher than usual: assets/monitors/rec_monitor_5xx_errors.json
    'Hit Ratio is low ': assets/monitors/rec_monitor_hit_ratio.json
    Sent bandwidth is abnormally high: assets/monitors/rec_monitor_bandwidth.json
    Web application firewall rule is triggered: assets/monitors/waf_rules.json
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- caching
- log collection
- metrics
custom_kind: インテグレーション
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: fastly
integration_id: fastly
integration_title: Fastly
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: fastly
public_title: Fastly
short_description: Fastly のキーメトリクスを Datadog の他のメトリクスと関連付けて表示します。
supported_os: []
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::キャッシュ
  - Category::ログの収集
  - Category::Metrics
  - Offering::Integration
  configuration: README.md#Setup
  description: Fastly のキーメトリクスを Datadog の他のメトリクスと関連付けて表示します。
  media: []
  overview: README.md#Overview
  resources:
  - resource_type: blog
    url: https://www.datadoghq.com/blog/monitor-fastly-performance-metrics/
  - resource_type: その他
    url: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/integration_fastly_account
  - resource_type: その他
    url: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/integration_fastly_service
  support: README.md#Troubleshooting
  title: Fastly
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-internal-core -->
{{< img src="integrations/fastly/fastly_dashboard.png" alt="キャッシュヒット率、成功率、その他のメトリクスを表示する Fastly ダッシュボード" popup="true">}}

## 概要

Fastly を Datadog に接続して、Fastly のキーメトリクス (キャッシュカバレッジ、ヘッダーサイズなど) を Datadog の他のメトリクスと関連付けて表示できます。

このインテグレーションには、即座に使用可能なモニターとダッシュボードが含まれており、それによってメトリクスを総合的に表示し、Fastly メトリクスと関連ログとの間で比較し、メトリクスがユーザー定義のしきい値を超えたり異常な振る舞いを示したりした際に通知するモニターを作成することが可能です。

## セットアップ

### インストール

必要なインストール手順はありません。

### 構成

#### メトリクスの収集

Fastly のトークン管理ページで読み取り専用アクセス API トークンを作成し、ダッシュボードからサービス ID を取得して、それらを [Fastly インテグレーションタイル][1]に入力します。

<div class="alert alert-info">
ServiceID は英数字のコードです。例: <code>5VqE6MOOy1QFJbgmCK41pY</code>（<a href="https://docs.fastly.com/api/auth">Fastly API ドキュメント</a>からの例）。
</div>

1 つのアカウントで複数のサービス ID を使用している場合は、各行に API トークンを入力します。

アカウント名はアカウントの整理に使用されるものであり、データ取り込みプロセスには使用されません。

#### ログ収集


{{< site-region region="us3" >}}

ログ収集は、このサイトではサポートされていません。

{{< /site-region >}}



{{< site-region region="us,us5,eu,gov" >}}

Fastly ログを Datadog に転送するように Datadog エンドポイントを構成します。`Datadog` または `Datadog (via Syslog)` エンドポイントを選択できます。Syslog 経由でログをより確実に配信するには、`Datadog` エンドポイントをお勧めします。

##### ログエンドポイントの選択

1. Fastly Web インターフェイスにログインし、**Configure リンク**をクリックします。
2. **Service** メニューから、該当するサービスを選択します。
3. **Configuration** ボタンをクリックし、次に **Clone active** を選択します。Domains ページが表示されます。
4. **Logging** リンクをクリックします。ログエンドポイントページが表示されます。**Datadog** または **Datadog (with Syslog)** オプションの下の **Create Endpoint** をクリックします。

##### Datadog エンドポイントを構成する (推奨)

1. エンドポイントに名前を付けます (例: `Datadog`)。
2. ログ形式を構成します。デフォルトで、推奨される[Datadog-Fastly ログ形式][2]がすでに用意されており、カスタマイズできます。
3. Datadog アカウントのリージョンと一致するように、リージョンを選択します: {{< region-param key="dd_site_name" code="true" >}}
4. [Datadog API キー][3]を追加します。
5. 下部にある **Create** をクリックします。
6. 右上の **Activate** をクリックして、新しいコンフィギュレーションをアクティブ化します。数分後、ログがアカウントに流れ始めます。

##### Syslog エンドポイントの構成

1. エンドポイントに名前を付けます (例: `Datadog`)。
2. ログ形式を構成して、推奨される[Datadog-Fastly ログ形式][2]の先頭に[Datadog API キー][3]を含めます。例については、Fastly のドキュメントの [JSON ログ形式の使用][2]を参照してください。

    ```text
    <DATADOG_API_KEY> <DATADOG_FASTLY_LOG_FORMAT>
    ```

   注: Datadog-Fastly ログ形式の先頭に Datadog API キーがないと、ログが Datadog に表示されません。詳しくは、[ログを取るのに便利な変数][4]をご覧ください。

3. **Syslog Address** を {{< region-param key="web_integrations_endpoint" code="true" >}} に設定します
4. **Port** を {{< region-param key="web_integrations_port" code="true" >}} に設定します
5. **TLS** を `yes` に設定します。
6. **TLS Hostname** を {{< region-param key="web_integrations_endpoint" code="true" >}} に設定します
7. Advanced options セクションで、**log line format** として `Blank` を選択します。
8. 最後に、エンドポイントを保存し、サービスをデプロイします。[Datadog のログエクスプローラー][5] でログを確認できます。

[2]: https://docs.fastly.com/en/guides/log-streaming-datadog#using-the-json-logging-format
[3]: https://app.datadoghq.com/organization-settings/api-keys
[4]: https://docs.fastly.com/guides/streaming-logs/useful-variables-to-log
[5]: https://app.datadoghq.com/logs

{{< /site-region >}}


## 収集データ

### メトリクス
{{< get-metrics-from-git "fastly" >}}


### イベント

Fastly インテグレーションには、イベントは含まれません。

### サービスチェック

Fastly インテグレーションには、サービスのチェック機能は含まれません。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][3]までお問合せください。

## 参考資料

- [Datadog を使用した Fastly パフォーマンスの監視][4]
- [Terraform による Fastly アカウントの作成と管理][5]
- [Terraform による Fastly サービスの作成と管理][6]

[1]: https://app.datadoghq.com/account/settings#integrations/fastly
[2]: https://github.com/DataDog/dogweb/blob/prod/integration/fastly/fastly_metadata.csv
[3]: https://docs.datadoghq.com/ja/help/
[4]: https://www.datadoghq.com/blog/monitor-fastly-performance-metrics/
[5]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/integration_fastly_account
[6]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/integration_fastly_service