---
app_id: gitlab
app_uuid: 3d165411-7734-4f72-b39a-f222add296b2
assets:
  dashboards:
    Gitlab Overview: assets/dashboards/overview.json
  integration:
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
integration_version: 7.0.0
is_public: true
kind: インテグレーション
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



## 概要

このインテグレーションを使用して

- GitLab と Gitaly を使って Prometheus から収集されたメトリクスを視覚化および監視できます。

詳しくは、[Prometheus による GitLab の監視][1]をご覧ください。

GitLab パイプラインのより詳細なモニタリングについては、[CI Pipeline Visibility][2] をご覧ください。CI Pipeline Visibility は、ユーザーのワークフローに対する詳細な洞察を提供し、詳細な Git メタデータにアクセスでき、パイプラインのパフォーマンスを時系列で追跡します。

## セットアップ

### インストール

GitLab チェックは [Datadog Agent][3] パッケージに含まれています。GitLab サーバーに追加でインストールする必要はありません。

### 構成

{{< tabs >}}
{{% tab "Host" %}}

#### ホスト

ホストで実行中の Agent に対してこのチェックを構成するには:

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

##### ログの収集

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
| `<インテグレーション名>` | `gitlab`                                                                                      |
| `<初期コンフィギュレーション>`      | 空白または `{}`                                                                                 |
| `<インスタンスコンフィギュレーション>`  | `{"gitlab_url":"http://%%host%%/", "openmetrics_endpoint":"http://%%host%%:10055/-/metrics"}` |

##### ログの収集

Datadog Agent で、ログの収集はデフォルトで無効になっています。有効にする方法については、[Kubernetes ログ収集][2]を参照してください。

| パラメーター      | 値                                       |
| -------------- | ------------------------------------------- |
| `<LOG_CONFIG>` | `{"source": "gitlab", "service": "gitlab"}` |

[1]: https://docs.datadoghq.com/ja/agent/kubernetes/integrations/
[2]: https://docs.datadoghq.com/ja/agent/kubernetes/log/
{{% /tab %}}
{{< /tabs >}}

### 検証

[Agent の status サブコマンドを実行][4]し、Checks セクションで `gitlab` を探します。

## 収集データ

### メトリクス
{{< get-metrics-from-git "gitlab" >}}


**注**: `[Legacy]`、`[OpenMetricsV1]`、`[OpenMetricsV2]` とマークされているメトリクスは、GitLab インテグレーションで対応する実装でのみ利用可能です。マークされていないメトリクスは、3 つの実装すべてで収集されます。

### イベント

GitLab チェックには、イベントは含まれません。

### サービスのチェック
{{< get-service-checks-from-git "gitlab" >}}
 `gitlab.readiness.*` のサービスチェックについての詳細は、公式の [GitLab ドキュメント][5]に記載されています。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][6]までお問合せください。




## GitLab Runner インテグレーション

## 概要

このインテグレーションを使用して

- GitLab Runners を使って Prometheus から収集されたメトリクスを視覚化および監視できます。
- GitLab Runner が GitLab に接続できるかどうかを検証できます。

GitLab Runner と Prometheus とのインテグレーションについては、[GitLab Runner ドキュメント][7]を参照してください。

## セットアップ

ホストで実行されている Agent 用にこのチェックをインストールおよび構成する場合は、以下の手順に従ってください。コンテナ環境の場合は、[オートディスカバリーのインテグレーションテンプレート][8]のガイドを参照してこの手順を行ってください。

### インストール

GitLab Runner チェックは [Datadog Agent][3] パッケージに含まれています。GitLab サーバーに追加でインストールする必要はありません。

### 構成

Runner の Prometheus メトリクスエンドポイントおよびサービスチェックを持つ GitLab マスターを指定するには、[Agent のコンフィギュレーションディレクトリ][9]のルートにある `conf.d/` フォルダーの `gitlab_runner.d/conf.yaml` ファイルを編集します。使用可能なすべてのコンフィギュレーションオプションについては、[サンプル gitlab_runner.d/conf.yaml][10] を参照してください。

`init_config` セクションの `allowed_metrics` 項目で、抽出するメトリクスを指定することができます。いくつかのメトリクスは `rate` として報告されるべきです (例: `ci_runner_errors`)。

### 検証

[Agent の `status` サブコマンドを実行][4]し、Checks セクションで `gitlab_runner` を探します。

## 収集データ

### メトリクス
{{< get-metrics-from-git "gitlab_runner" >}}


### ログの収集


1. `gitlab_runner` [コンフィギュレーションファイル][11]で、ログフォーマットを `json` に変更します (_GitLab Runner のバージョン 11.4.0 以降で利用可能_) :
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

    使用可能なすべてのコンフィギュレーションオプションの詳細については、[サンプル gitlab_runner.d/conf.yaml][10] を参照してください。

5. [Agent を再起動します][12]。

### イベント

GitLab Runner チェックには、イベントは含まれません。

### サービスのチェック

GitLab Runner チェックは、Runner が GitLab マスターと通信できるかを確認するサービスのチェック機能、およびローカルの Prometheus エンドポイントが使用可能かを確認するサービスのチェック機能を提供します。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][6]までお問合せください。


[1]: https://docs.gitlab.com/ee/administration/monitoring/prometheus
[2]: https://app.datadoghq.com/ci/getting-started
[3]: https://app.datadoghq.com/account/settings/agent/latest
[4]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[5]: https://docs.gitlab.com/ee/user/admin_area/monitoring/health_check.html#readiness
[6]: https://docs.datadoghq.com/ja/help/
[7]: https://docs.gitlab.com/runner/monitoring/
[8]: https://docs.datadoghq.com/ja/agent/kubernetes/integrations/
[9]: https://docs.datadoghq.com/ja/agent/guide/agent-configuration-files/#agent-configuration-directory
[10]: https://github.com/DataDog/integrations-core/blob/master/gitlab_runner/datadog_checks/gitlab_runner/data/conf.yaml.example
[11]: https://docs.gitlab.com/runner/configuration/advanced-configuration.html
[12]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent