---
app_id: supabase
app_uuid: f22fec2a-ff0a-4380-8ddf-3348f1e7ff15
assets:
  dashboards:
    Supabase Overview: assets/dashboards/supabase_overview.json
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: supabase.pg.up
      metadata_path: metadata.csv
      prefix: supabase.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 34976974
    source_type_name: Supabase
  monitors:
    High RAM Usage: assets/monitors/ram_usage.json
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- モニター
- kubernetes
- security
custom_kind: integration
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/supabase/README.md
display_on_public_website: true
draft: false
git_integration_title: supabase
integration_id: supabase
integration_title: Supabase
integration_version: 1.1.1
is_public: true
manifest_version: 2.0.0
name: supabase
public_title: Supabase
short_description: Supabase の正常性とパフォーマンスを監視
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  - Category::Metrics
  - Category::Kubernetes
  - Category::Security
  - Submitted Data Type::Metrics
  - Offering::Integration
  configuration: README.md#Setup
  description: Supabase の正常性とパフォーマンスを監視
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Supabase
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## 概要

このチェックは Datadog Agent を通じて [Supabase][1] を監視します。

## セットアップ

ホストで実行されている Agent 用にこのチェックをインストールおよび構成する場合は、以下の手順に従ってください。コンテナ環境の場合は、[オートディスカバリーのインテグレーションテンプレート][2]のガイドを参照してこの手順を行ってください。

### インストール

Agent リリース 7.62.0 以降、Supabase チェックは Datadog Agent パッケージに同梱されています。環境での追加インストールは不要です。

このチェックは OpenMetrics を使用して、Supabase が公開する OpenMetrics エンドポイントからメトリクスを収集します。Python 3 が必要です。

### 設定

Supabase プラットフォームには、プロジェクトの `metrics` エンドポイントでアクセスできる Prometheus 互換のメトリクス エンドポイントが用意されています: `https://<project-ref>.supabase.co/customer/v1/privileged/metrics`。エンドポイントへのアクセスは HTTP Basic 認証で保護されています。`username` は `service_role`、`password` は Supabase dashboard から入手可能な service role の JWT です。

```yaml
## ここで定義したすべてのオプションは、すべてのインスタンスで利用できます。
#
init_config:

instances:

    # Supabase 顧客向けメトリクスを公開するエンドポイントmetrics
    #
  - privileged_metrics_endpoint:  https://<project-ref>.supabase.co/customer/v1/privileged/metrics

    ## @param username - 文字列 - 任意
    ## サービスが Basic または Digest 認証の背後にある場合に使用するユーザー名。
    #
    username: service_role

    ## @param password - 文字列 - 任意
    ## サービスが Basic または NTLM 認証の背後にある場合に使用するパスワード。
    #
    password: <JWT>
```

また、ホスト型の Postgres データベースも含まれます。Agent と連携するには、まず [Postgres の準備][3] を行い、その後データベースの設定をインテグレーションの構成に指定します。
```yaml
## ここで定義したすべてのオプションは、すべてのインスタンスで利用できます。
#
init_config:

instances:

    ## @param host - 文字列 - 必須
    ## 接続先のホスト名。
    #
  - host: <HOST>

    ## @param port - 整数 - 任意 - デフォルト: 5432
    ## PostgreSQL に接続する際に使用するポート。
    #
    port: 6543

    ## @param username - 文字列 - 必須
    ## PostgreSQL への接続用に作成した Datadog ユーザー名。
    #
    username: datadog.<PROJECT-REF>

    ## @param password - 文字列 - 任意
    ## Datadog ユーザーに関連付けられたパスワード。
    #
    password: <UNIQUEPASSWORD>

    ## @param dbname - 文字列 - オプション - デフォルト: postgres
    ## 監視する PostgreSQL データベース名。
    ## 注: 省略した場合、デフォルトのシステム Postgres データベースがクエリされます。
    #
    dbname: <DATABASE>
```

[Supabase Storage][4] には、ポート `5000` の `/metrics` でアクセスできる Prometheus 互換のメトリクス エンドポイントがあります。Agent がメトリクス収集を開始するには、Supabase Storage コンテナにアノテーションが必要です。アノテーションについての詳細は、[Autodiscovery インテグレーション テンプレート][2] を参照してください。追加の構成オプションは、[supabase.d/conf.yaml のサンプル][5] を確認してください。

注: Supabase Storage とのインテグレーションは セルフホスト アーキテクチャでのみ利用可能です。`storage_api_endpoint` には、Prometheus 形式のメトリクスが公開されている場所を設定します。デフォルトのポートは `5000` です。コンテナ環境では、[ホスト自動検出][2] のために `%%host%%` を使用します。

### 検証

[Agent の status サブコマンドを実行][6] し、Checks セクションの下に `supabase` があるか確認します。

## 収集データ

### メトリクス
{{< get-metrics-from-git "supabase" >}}


### イベント

Supabase インテグレーションにはイベントは含まれません。

### サービスチェック
{{< get-service-checks-from-git "supabase" >}}


## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][9]までお問い合わせください。


[1]: https://supabase.com/docs
[2]: https://docs.datadoghq.com/ja/agent/kubernetes/integrations/
[3]: https://docs.datadoghq.com/ja/integrations/postgres/?tab=host#prepare-postgres
[4]: https://github.com/supabase/storage/tree/master
[5]: https://github.com/DataDog/integrations-core/blob/master/supabase/datadog_checks/supabase/data/conf.yaml.example
[6]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[7]: https://github.com/DataDog/integrations-core/blob/master/supabase/metadata.csv
[8]: https://github.com/DataDog/integrations-core/blob/master/supabase/assets/service_checks.json
[9]: https://docs.datadoghq.com/ja/help/