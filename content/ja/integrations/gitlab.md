---
app_id: gitlab
app_uuid: 3d165411-7734-4f72-b39a-f222add296b2
assets:
  dashboards:
    Gitlab Overview: assets/dashboards/overview.json
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check:
      - gitlab.process_max_fds
      - gitlab.ruby.process_start_time_seconds
      metadata_path: metadata.csv
      prefix: gitlab.
    process_signatures:
    - gitlab-kas
    - gitlab-workhorse
    - gitlab-ctl
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10026
    source_type_name: Gitlab
  logs:
    source: gitlab
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- collaboration
- developer tools
- issue tracking
- log collection
- source control
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/gitlab/README.md
display_on_public_website: true
draft: false
git_integration_title: gitlab
integration_id: gitlab
integration_title: GitLab
integration_version: 7.3.0
is_public: true
manifest_version: 2.0.0
name: gitlab
public_title: GitLab
short_description: Datadog ですべての GitLab メトリクスを追跡します。
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::コラボレーション
  - Category::Developer Tools
  - Category::問題の追跡
  - Category::ログの収集
  - Category::ソースコントロール
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  configuration: README.md#Setup
  description: Datadog ですべての GitLab メトリクスを追跡します。
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: GitLab
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## 概要

このインテグレーションを使用して

- GitLab と Gitaly を使って Prometheus から収集されたメトリクスを視覚化および監視できます。

詳しくは、[Prometheus による GitLab の監視][1]をご覧ください。

GitLab パイプラインのさらに詳細なモニタリングについては、[CI Pipeline Visibility][2] をご確認ください。CI Pipeline Visibility では、ユーザーワークフローの詳細な洞察を提供し、詳細な Git メタデータにアクセスでき、時間をかけてパイプラインのパフォーマンスを追跡します。

## 計画と使用

この OpenMetrics ベースのインテグレーションには、最新モード (ターゲットエンドポイントを指すように `openmetrics_endpoint` を設定することで有効) とレガシーモード (代わりに `prometheus_url` を設定することで有効) があります。すべての最新機能を利用するために、Datadog は最新モードを有効にすることを推奨します。詳しくは、[OpenMetrics ベースのインテグレーションにおける最新バージョニングとレガシーバージョニング][3]を参照してください。

`[OpenMetricsV1]` または `[OpenMetricsV2]` とマークされたメトリクスは、GitLab インテグレーションの対応するモードを使用した場合にのみ利用できます。その他のメトリクスはどちらのモードでも収集されます。

### インフラストラクチャーリスト

GitLab チェックは [Datadog Agent][4] パッケージに含まれています。GitLab サーバーに追加でインストールする必要はありません。

### ブラウザトラブルシューティング

{{< tabs >}}
{{% tab "ホスト" %}}

#### メトリクスベース SLO

ホストで実行中の Agent に対してこのチェックを構成するには

##### メトリクスの収集

1. [Agent の構成ディレクトリ][1]のルートにある `conf.d/` フォルダ内の `gitlab.d/conf.yaml` ファイルを編集し、GitLab のメトリクス[エンドポイント][2]を指すようにします。
利用可能なすべての構成オプションについては、[gitlab.d/conf.yaml のサンプル][3]を参照してください。以前にこのインテグレーションを実装したことがある場合は、[レガシー例][4]を参照してください。

2. GitLab の設定ページで、オプション `Enable Prometheus Metrics` が有効になっていることを確認します (管理者権限が必要です)。メトリクスの収集を有効にする方法については、[GitLab Prometheus メトリクス][5]を参照してください。

3. `/etc/gitlab/gitlab.rb` を更新して次の行を含めることで、監視エンドポイントへのアクセスを許可します。

    ```
    gitlab_rails['monitoring_whitelist'] = ['127.0.0.0/8', '192.168.0.1']
    ```
    **注** 保存して GitLab を再起動すると変更を確認できます。

4. [Agent を再起動します][6]。

##### 収集データ

1. Datadog Agent で、ログの収集はデフォルトで無効になっています。以下のように、`datadog.yaml` ファイルでこれを有効にします。

   ```yaml
   logs_enabled: true
   ```

2. 次に、下部にある `logs` 行のコメントを解除して、`gitlab.d/conf.yaml` を編集します。ログの `path` を GitLab ログファイルの正しいパスで更新してください。

   ```yaml
     logs:
       - type: file
         path: /var/log/gitlab/gitlab-rails/production_json.log
         service: '<SERVICE_NAME>'
         source: gitlab
       - type: file
         path: /var/log/gitlab/gitlab-rails/production.log
         service: '<SERVICE_NAME>'
         source: gitlab
       - type: file
         path: /var/log/gitlab/gitlab-rails/api_json.log
         service: '<SERVICE_NAME>'
         source: gitlab
   ```

3. [Agent を再起動します][6]。

[1]: https://docs.datadoghq.com/ja/agent/guide/agent-configuration-files/#agent-configuration-directory
[2]: https://docs.gitlab.com/ee/administration/monitoring/prometheus/gitlab_metrics.html#collecting-the-metrics
[3]: https://github.com/DataDog/integrations-core/blob/master/gitlab/datadog_checks/gitlab/data/conf.yaml.example
[4]: https://github.com/DataDog/integrations-core/blob/7.43.x/gitlab/datadog_checks/gitlab/data/conf.yaml.example
[5]: https://docs.gitlab.com/ee/administration/monitoring/prometheus/gitlab_metrics.html
[6]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
{{% /tab %}}
{{% tab "コンテナ化" %}}

#### コンテナ化

コンテナ環境の場合は、[オートディスカバリーのインテグレーションテンプレート][1]のガイドを参照して、次のパラメーターを適用してください。

##### メトリクスの収集

| パラメーター            | 値                                                                                         |
| -------------------- |-----------------------------------------------------------------------------------------------|
| `<INTEGRATION_NAME>` | `gitlab`                                                                                      |
| `<INIT_CONFIG>`      | 空白または `{}`                                                                                 |
| `<INSTANCE_CONFIG>`  | `{"gitlab_url":"http://%%host%%/", "openmetrics_endpoint":"http://%%host%%:10055/-/metrics"}` |

##### 収集データ

Datadog Agent で、ログの収集はデフォルトで無効になっています。有効にする方法については、[Kubernetes ログ収集][2]を参照してください。

| パラメーター      | 値                                       |
| -------------- | ------------------------------------------- |
| `<LOG_CONFIG>` | `{"source": "gitlab", "service": "gitlab"}` |

[1]: https://docs.datadoghq.com/ja/agent/kubernetes/integrations/
[2]: https://docs.datadoghq.com/ja/agent/kubernetes/log/
{{% /tab %}}
{{< /tabs >}}

### 検証

[Agent の status サブコマンドを実行][5]し、Checks セクションで `gitlab` を探します。

## リアルユーザーモニタリング

### データセキュリティ
{{< get-metrics-from-git "gitlab" >}}


### イベント

GitLab チェックには、イベントは含まれません。

### サービスのチェック
{{< get-service-checks-from-git "gitlab" >}}
 `gitlab.readiness.*` のサービスチェックについての詳細は、公式の [GitLab ドキュメント][6]に記載されています。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][7]までお問い合わせください。




<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->
## GitLab Runner インテグレーション

## 概要

このインテグレーションを使用して

- GitLab Runners を使って Prometheus から収集されたメトリクスを視覚化および監視できます。
- GitLab Runner が GitLab に接続できるかどうかを検証できます。

GitLab Runner と Prometheus とのインテグレーションについては、[GitLab Runner ドキュメント][8]を参照してください。

## 計画と使用

ホストで実行されている Agent 用にこのチェックをインストールおよび構成する場合は、以下の手順に従ってください。コンテナ環境の場合は、[オートディスカバリーのインテグレーションテンプレート][9]のガイドを参照してこの手順を行ってください。

### インフラストラクチャーリスト

GitLab Runner チェックは [Datadog Agent][4] パッケージに含まれています。GitLab サーバーに追加でインストールする必要はありません。

### ブラウザトラブルシューティング

Runner の Prometheus メトリクスエンドポイントおよびサービスチェックを持つ GitLab マスターを指定するには、[Agent のコンフィギュレーションディレクトリ][10]のルートにある `conf.d/` フォルダーの `gitlab_runner.d/conf.yaml` ファイルを編集します。使用可能なすべてのコンフィギュレーションオプションについては、[サンプル gitlab_runner.d/conf.yaml][11] を参照してください。

`init_config` セクションの `allowed_metrics` 項目で、抽出するメトリクスを指定することができます。いくつかのメトリクスは `rate` として報告されるべきです (例: `ci_runner_errors`)。

### 検証

[Agent の `status` サブコマンドを実行][5]し、Checks セクションで `gitlab_runner` を探します。

## リアルユーザーモニタリング

### データセキュリティ
{{< get-metrics-from-git "gitlab_runner" >}}


### 収集データ


1. `gitlab_runner` [コンフィギュレーションファイル][12]で、ログフォーマットを `json` に変更します (_GitLab Runner のバージョン 11.4.0 以降で利用可能_) :
   ```toml
   log_format = "json"
   ```

2. Datadog Agent で、ログの収集はデフォルトで無効になっています。以下のように、`datadog.yaml` でこれを有効にする必要があります。

   ```yaml
   logs_enabled: true
   ```

3. 以下を実行して、`systemd-journal` グループに `dd-agent` ユーザーを追加します。
   ```text
   usermod -a -G systemd-journal dd-agent
   ```

4. GitLab Runner のログの収集を開始するには、次の構成ブロックを `gitlab_runner.d/conf.yaml` ファイルに追加します。

   ```yaml
   logs:
     - type: journald
       source: gitlab-runner
   ```

    使用可能なすべてのコンフィギュレーションオプションの詳細については、[サンプル gitlab_runner.d/conf.yaml][11] を参照してください。

5. [Agent を再起動します][13]。

### イベント

GitLab Runner チェックには、イベントは含まれません。

### サービスのチェック

GitLab Runner チェックは、Runner が GitLab マスターと通信できるかを確認するサービスのチェック機能、およびローカルの Prometheus エンドポイントが使用可能かを確認するサービスのチェック機能を提供します。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][7]までお問い合わせください。


[1]: https://docs.gitlab.com/ee/administration/monitoring/prometheus
[2]: https://app.datadoghq.com/ci/getting-started
[3]: https://docs.datadoghq.com/ja/integrations/guide/versions-for-openmetrics-based-integrations
[4]: https://app.datadoghq.com/account/settings/agent/latest
[5]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[6]: https://docs.gitlab.com/ee/user/admin_area/monitoring/health_check.html#readiness
[7]: https://docs.datadoghq.com/ja/help/
[8]: https://docs.gitlab.com/runner/monitoring/
[9]: https://docs.datadoghq.com/ja/agent/kubernetes/integrations/
[10]: https://docs.datadoghq.com/ja/agent/guide/agent-configuration-files/#agent-configuration-directory
[11]: https://github.com/DataDog/integrations-core/blob/master/gitlab_runner/datadog_checks/gitlab_runner/data/conf.yaml.example
[12]: https://docs.gitlab.com/runner/configuration/advanced-configuration.html
[13]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent