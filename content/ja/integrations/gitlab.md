---
assets:
  dashboards: {}
  monitors: {}
  service_checks: assets/service_checks.json
categories:
  - collaboration
  - source control
  - issue tracking
  - log collection
creates_events: false
ddtype: check
dependencies:
  - 'https://github.com/DataDog/integrations-core/blob/master/gitlab/README.md'
display_name: Gitlab
git_integration_title: gitlab
guid: 1cab328c-5560-4737-ad06-92ebc54af901
integration_id: gitlab
integration_title: Gitlab
is_public: true
kind: integration
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_prefix: gitlab.
metric_to_check: go_gc_duration_seconds
name: gitlab
public_title: Datadog-Gitlab インテグレーション
short_description: Gitlab のすべてのメトリクスを Datadog で追跡
support: コア
supported_os:
  - linux
  - mac_os
  - windows
---
## 概要

このインテグレーションを使用して、以下のことができます。

* Gitlab 経由で Prometheus から収集されたメトリクスを視覚化および監視できます。

Gitlab および Prometheus とのインテグレーションの詳細については、[Gitlab のドキュメント][1]を参照してください。

## セットアップ

ホストで実行されている Agent 用にこのチェックをインストールおよび構成する場合は、以下の手順に従ってください。コンテナ環境の場合は、[オートディスカバリーのインテグレーションテンプレート][2]のガイドを参照してこの手順を行ってください。

### インストール

Gitlab チェックは [Datadog Agent][3] パッケージに含まれています。Gitlab サーバーに追加でインストールする必要はありません。

### コンフィグレーション

Gitlab の Prometheus メトリクスエンドポイントを指定するには、[Agent の構成ディレクトリ][4]のルートにある `conf.d/` フォルダーの `gitlab.d/conf.yaml` ファイルを編集します。
使用可能なすべての構成オプションの詳細については、[サンプル gitlab.d/conf.yaml][5] を参照してください。

**注**: `init_config` セクションの `allowed_metrics` 項目を使用すると、抽出するメトリクスを指定できます。


#### ログの収集

**Agent 6.0 以上で使用可能**

1. Datadog Agent で、ログの収集はデフォルトで無効になっています。以下のように、`datadog.yaml` ファイルでこれを有効にします。

    ```yaml
      logs_enabled: true
    ```

2. 次に、下部にある `logs` 行のコメントを解除して、`gitlab.d/conf.yaml` を編集します。ログの `path` を Gitlab ログファイルの正しいパスで更新してください。

    ```
      logs:
        - type: file
          path: /var/log/gitlab/gitlab-rails/production_json.log
          service: <SERVICE_NAME>
          source: gitlab
        - type: file
          path: /var/log/gitlab/gitlab-rails/production.log
          service: <SERVICE_NAME>
          source: gitlab
        - type: file
          path: /var/log/gitlab/gitlab-rails/api_json.log
          service: <SERVICE_NAME>
          source: gitlab
    ```

3. [Agent を再起動します][9]。

### 検証

[Agent の status サブコマンドを実行][6]し、Checks セクションで `gitlab` を探します。

## 収集データ
### メトリクス
{{< get-metrics-from-git "gitlab" >}}


### イベント
Gitlab チェックには、イベントは含まれません。

### サービスのチェック
Gitlab チェックには、サービスのチェック機能として Readiness および Liveness が含まれます。
また、ローカルの Prometheus エンドポイントが使用可能かどうかを確認するサービスのチェック機能も提供されています。

## トラブルシューティング
ご不明な点は、[Datadog のサポートチーム][8]までお問合せください。

[1]: https://docs.gitlab.com/ee/administration/monitoring/prometheus
[2]: https://docs.datadoghq.com/ja/agent/autodiscovery/integrations
[3]: https://app.datadoghq.com/account/settings#agent
[4]: https://docs.datadoghq.com/ja/agent/guide/agent-configuration-files/?tab=agentv6#agent-configuration-directory
[5]: https://github.com/DataDog/integrations-core/blob/master/gitlab/datadog_checks/gitlab/data/conf.yaml.example
[6]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/?tab=agentv6#agent-status-and-information
[7]: https://github.com/DataDog/integrations-core/blob/master/gitlab/metadata.csv
[8]: https://docs.datadoghq.com/ja/help
[9]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/?tab=agentv6#start-stop-and-restart-the-agent


{{< get-dependencies >}}


## Gitlab Runner インテグレーション

## 概要

このインテグレーションを使用して

* Gitlab Runners 経由で Prometheus から収集されたメトリクスを視覚化および監視できます。
* Gitlab Runner が Gitlab に接続できるかどうかを検証できます。

Gitlab Runner および Prometheus とのインテグレーションの詳細については、
[Gitlab Runner のドキュメント][1]を参照してください。

## セットアップ

ホストで実行されている Agent 用にこのチェックをインストールおよび構成する場合は、以下の手順に従ってください。コンテナ環境の場合は、[オートディスカバリーのインテグレーションテンプレート][2]のガイドを参照してこの手順を行ってください。

### インストール

Gitlab Runner チェックは [Datadog Agent][3] パッケージに含まれています。Gitlab サーバーに追加でインストールする必要はありません。

### コンフィグレーション

Runner の Prometheus メトリクスエンドポイントおよびサービスチェックを持つ Gitlab マスターを指定するには、[Agent の構成ディレクトリ][4]のルートにある `conf.d/` フォルダーの `gitlab_runner.d/conf.yaml` ファイルを編集します。
使用可能なすべての構成オプションの詳細については、[サンプル gitlab_runner.d/conf.yaml][5] を参照してください。

**注**: `init_config` セクションの `allowed_metrics` 項目を使用すると、抽出するメトリクスを指定できます。

**備考**: 一部のメトリクスは `rate` (`ci_runner_errors`) として報告されます。

### 検証

[Agent の `status` サブコマンドを実行][6]し、Checks セクションで `gitlab_runner` を探します。

## 収集データ
### メトリクス
{{< get-metrics-from-git "gitlab_runner" >}}


### イベント
Gitlab Runner チェックには、イベントは含まれません。

### サービスのチェック
Gitlab Runner チェックは、Runner が Gitlab マスターと通信できるかを確認するサービスのチェック機能、およびローカルの Prometheus エンドポイントが
使用可能かを確認するサービスのチェック機能を提供します。

## トラブルシューティング
ご不明な点は、[Datadog のサポートチーム][8]までお問合せください。

[1]: https://docs.gitlab.com/runner/monitoring/README.html
[2]: https://docs.datadoghq.com/ja/agent/autodiscovery/integrations
[3]: https://app.datadoghq.com/account/settings#agent
[4]: https://docs.datadoghq.com/ja/agent/guide/agent-configuration-files/?tab=agentv6#agent-configuration-directory
[5]: https://github.com/DataDog/integrations-core/blob/master/gitlab_runner/datadog_checks/gitlab_runner/data/conf.yaml.example
[6]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/?tab=agentv6#agent-status-and-information
[7]: https://github.com/DataDog/integrations-core/blob/master/gitlab_runner/metadata.csv
[8]: https://docs.datadoghq.com/ja/help


{{< get-dependencies >}}