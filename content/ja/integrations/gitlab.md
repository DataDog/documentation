---
assets:
  configuration:
    spec: assets/configuration/spec.yaml
  dashboards:
    Gitlab Overview: assets/dashboards/overview.json
  logs:
    source: gitlab
  metrics_metadata: metadata.csv
  monitors: {}
  service_checks: assets/service_checks.json
categories:
  - collaboration
  - source control
  - issue tracking
  - log collection
  - autodiscovery
creates_events: false
ddtype: check
dependencies:
  - 'https://github.com/DataDog/integrations-core/blob/master/gitlab/README.md'
display_name: Gitlab
draft: false
git_integration_title: gitlab
guid: 1cab328c-5560-4737-ad06-92ebc54af901
integration_id: gitlab
integration_title: Gitlab
is_public: true
kind: インテグレーション
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_prefix: gitlab.
metric_to_check:
  - gitlab.process_max_fds
  - gitlab.ruby.process_start_time_seconds
name: gitlab
public_title: Datadog-Gitlab インテグレーション
short_description: Datadog ですべての Gitlab メトリクスを追跡
support: コア
supported_os:
  - linux
  - mac_os
  - windows
---
## 概要

このインテグレーションを使用して

- Gitlab 経由で Prometheus から収集されたメトリクスを視覚化および監視できます。

Gitlab および Prometheus とのインテグレーションの詳細については、[Gitlab のドキュメント][1]を参照してください。

## セットアップ

### インストール

Gitlab チェックは [Datadog Agent][2] パッケージに含まれています。Gitlab サーバーに追加でインストールする必要はありません。

### コンフィギュレーション

{{< tabs >}}
{{% tab "Host" %}}

#### ホスト

ホストで実行中の Agent に対してこのチェックを構成するには:

##### メトリクスの収集

1. Gitlab のメトリクス [エンドポイント][2] を指定するには、[Agent のコンフィギュレーションディレクトリ][1]のルートにある `conf.d/` フォルダーの `gitlab.d/conf.yaml` ファイルを編集します。使用可能なすべてのコンフィギュレーションオプションについては、[サンプル gitlab.d/conf.yaml][3] を参照してください。

2. Gitlab の設定ページで、`Enable Prometheus Metrics` のオプションが有効になっていることを確認します。これには、管理者アクセスが必要です。メトリクスの収集を有効化する方法について、詳しくは [Gitlab ドキュメント][4]を参照してください。

3. `/etc/gitlab/gitlab.rb` を更新して次の行を含めることで、監視エンドポイントへのアクセスを許可します。

    ```
    gitlab_rails['monitoring_whitelist'] = ['127.0.0.0/8', '192.168.0.1']
    ```
    **注** 保存して Gitlab を再起動すると変更を確認できます。

4. [Agent を再起動します][5]。

**注**: [gitlab/metrics.py][6] のメトリクスはデフォルトで収集されます。`init_config` の `allowed_metrics` コンフィギュレーションオプションは特定のレガシーメトリクスを収集します。Gitlab インスタンスのバージョンやコンフィギュレーションによっては、収集されないメトリクスもあります。メトリクスの収集に関する詳細については、[Gitlab のドキュメント][4]を参照してください。


##### ログの収集

1. Datadog Agent で、ログの収集はデフォルトで無効になっています。以下のように、`datadog.yaml` ファイルでこれを有効にします。

   ```yaml
   logs_enabled: true
   ```

2. 次に、下部にある `logs` 行のコメントを解除して、`gitlab.d/conf.yaml` を編集します。ログの `path` を Gitlab ログファイルの正しいパスで更新してください。

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

3. [Agent を再起動します][5]。

[1]: https://docs.datadoghq.com/ja/agent/guide/agent-configuration-files/#agent-configuration-directory
[2]: https://docs.gitlab.com/ee/administration/monitoring/prometheus/gitlab_metrics.html#collecting-the-metrics
[3]: https://github.com/DataDog/integrations-core/blob/master/gitlab/datadog_checks/gitlab/data/conf.yaml.example
[4]: https://docs.gitlab.com/ee/administration/monitoring/prometheus/gitlab_metrics.html
[5]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[6]: https://github.com/DataDog/integrations-core/blob/master/gitlab/datadog_checks/gitlab/metrics.py
{{% /tab %}}
{{% tab "Containerized" %}}

#### コンテナ化

コンテナ環境の場合は、[オートディスカバリーのインテグレーションテンプレート][1]のガイドを参照して、次のパラメーターを適用してください。

##### メトリクスの収集

| パラメーター            | 値                                                                                      |
| -------------------- | ------------------------------------------------------------------------------------------ |
| `<インテグレーション名>` | `gitlab`                                                                                   |
| `<初期コンフィギュレーション>`      | 空白または `{}`                                                                              |
| `<インスタンスコンフィギュレーション>`  | `{"gitlab_url":"http://%%host%%/", "prometheus_endpoint":"http://%%host%%:10055/-/metrics"}` |

##### ログの収集

Datadog Agent で、ログの収集はデフォルトで無効になっています。有効にする方法については、[Kubernetes ログ収集のドキュメント][2]を参照してください。

| パラメーター      | 値                                       |
| -------------- | ------------------------------------------- |
| `<LOG_CONFIG>` | `{"source": "gitlab", "service": "gitlab"}` |

[1]: https://docs.datadoghq.com/ja/agent/kubernetes/integrations/
[2]: https://docs.datadoghq.com/ja/agent/kubernetes/log/
{{% /tab %}}
{{< /tabs >}}

### 検証

[Agent の status サブコマンドを実行][3]し、Checks セクションで `gitlab` を探します。

## 収集データ

### メトリクス
{{< get-metrics-from-git "gitlab" >}}


### イベント

Gitlab チェックには、イベントは含まれません。

### サービスのチェック

Gitlab チェックには、サービスのチェック機能として Health、Readiness、Liveness が含まれます。 

**gitlab.prometheus_endpoint_up**:<br>
チェックが Gitlab インスタンスの Prometheus メトリクスエンドポイントにアクセスできない場合は `CRITICAL` を返します。

**gitlab.health**:<br>
チェックが Gitlab インスタンスにアクセスできない場合は `CRITICAL` を返します。

**gitlab.liveness**:<br>
Rails Controllers とのデッドロックのためにチェックが Gitlab インスタンスにアクセスできない場合は `CRITICAL` を返します。

**gitlab.readiness**:<br>
Gitlab インスタンスが Rails Controllers を介してトラフィックを受け入れることができる場合は `CRITICAL` を返します。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][4]までお問合せください。




## Gitlab Runner インテグレーション

## 概要

このインテグレーションを使用して

- Gitlab Runners 経由で Prometheus から収集されたメトリクスを視覚化および監視できます。
- Gitlab Runner が Gitlab に接続できるかどうかを検証できます。

Gitlab Runner および Prometheus とのインテグレーションの詳細については、
[Gitlab Runner のドキュメント][5]を参照してください。

## セットアップ

ホストで実行されている Agent 用にこのチェックをインストールおよび構成する場合は、以下の手順に従ってください。コンテナ環境の場合は、[オートディスカバリーのインテグレーションテンプレート][6]のガイドを参照してこの手順を行ってください。

### インストール

Gitlab Runner チェックは [Datadog Agent][2] パッケージに含まれています。Gitlab サーバーに追加でインストールする必要はありません。

### コンフィギュレーション

Runner の Prometheus メトリクスエンドポイントおよびサービスチェックを持つ Gitlab マスターを指定するには、[Agent のコンフィギュレーションディレクトリ][7]のルートにある `conf.d/` フォルダーの `gitlab_runner.d/conf.yaml` ファイルを編集します。使用可能なすべてのコンフィギュレーションオプションについては、[サンプル gitlab_runner.d/conf.yaml][8] を参照してください。

**注**: `init_config` セクションの `allowed_metrics` 項目を使用すると、抽出するメトリクスを指定できます。

**備考**: 一部のメトリクスは `rate` (`ci_runner_errors`) として報告されます。

### 検証

[Agent の `status` サブコマンドを実行][3]し、Checks セクションで `gitlab_runner` を探します。

## 収集データ

### メトリクス
{{< get-metrics-from-git "gitlab_runner" >}}


### ログの収集


1. `gitlab_runner` [コンフィギュレーションファイル][9]で、ログフォーマットを `json` に変更します (_Gitlab Runner のバージョン 11.4.0 以降で利用可能_) :
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

4. Gitlab Runner のログの収集を開始するには、次の構成ブロックを `gitlab_runner.d/conf.yaml` ファイルに追加します。

   ```yaml
   logs:
     - type: journald
       source: gitlab-runner
   ```

    使用可能なすべてのコンフィギュレーションオプションの詳細については、[サンプル gitlab_runner.d/conf.yaml][8] を参照してください。

5. [Agent を再起動します][10]。

### イベント

Gitlab Runner チェックには、イベントは含まれません。

### サービスのチェック

Gitlab Runner チェックは、Runner が Gitlab マスターと通信できるかを確認するサービスのチェック機能、およびローカルの Prometheus エンドポイントが
使用可能かを確認するサービスのチェック機能を提供します。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][4]までお問合せください。


[1]: https://docs.gitlab.com/ee/administration/monitoring/prometheus
[2]: https://app.datadoghq.com/account/settings#agent
[3]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[4]: https://docs.datadoghq.com/ja/help/
[5]: https://docs.gitlab.com/runner/monitoring/README.html
[6]: https://docs.datadoghq.com/ja/agent/kubernetes/integrations/
[7]: https://docs.datadoghq.com/ja/agent/guide/agent-configuration-files/#agent-configuration-directory
[8]: https://github.com/DataDog/integrations-core/blob/master/gitlab_runner/datadog_checks/gitlab_runner/data/conf.yaml.example
[9]: https://docs.gitlab.com/runner/configuration/advanced-configuration.html
[10]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent