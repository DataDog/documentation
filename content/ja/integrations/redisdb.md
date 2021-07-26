---
aliases:
  - /ja/integrations/redis/
assets:
  configuration:
    spec: assets/configuration/spec.yaml
  dashboards:
    redis: assets/dashboards/overview.json
  logs:
    source: redis
  metrics_metadata: metadata.csv
  monitors:
    '[Redis] High memory consumption': assets/monitors/high_mem.json
  saved_views:
    error_warning_status: assets/saved_views/error_warning_status.json
    pid_overview: assets/saved_views/pid_overview.json
    redis_pattern: assets/saved_views/redis_pattern.json
    redis_processes: assets/saved_views/redis_processes.json
  service_checks: assets/service_checks.json
categories:
  - data store
  - caching
  - log collection
creates_events: false
ddtype: check
dependencies:
  - 'https://github.com/DataDog/integrations-core/blob/master/redisdb/README.md'
display_name: Redis
draft: false
git_integration_title: redisdb
guid: 0e2f3ed1-d36b-47a4-b69c-fedb50adf240
integration_id: redis
integration_title: Redis
is_public: true
kind: インテグレーション
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_prefix: redis.
metric_to_check: redis.net.clients
name: redisdb
process_signatures:
  - redis-server
public_title: Datadog-Redis インテグレーション
short_description: redis のパフォーマンス、メモリ使用量、クライアントのブロック数、キーのエビクション数を追跡。
support: コア
supported_os:
  - linux
  - mac_os
  - windows
---
## 概要

Redis をデータベース、キャッシュ、メッセージキューのどの用途で使用している場合でも、このインテグレーションを使用して、Redis サーバーの問題や、インフラストラクチャーが Redis サーバーを利用している部分の問題を追跡できます。Datadog Agent の Redis チェックは、パフォーマンスに関連するメトリクス、メモリ使用量、クライアントのブロック数、スレーブ接続数、ディスク持続性、キーの期限切れ数とエビクション数など、多数のメトリクスを収集します。

## セットアップ

### インストール

Redis チェックは [Datadog Agent][1] パッケージに含まれています。Redis サーバーに追加でインストールする必要はありません。

### コンフィギュレーション

{{< tabs >}}
{{% tab "Host" %}}

#### ホスト

ホストで実行中の Agent に対してこのチェックを構成するには:

##### メトリクスの収集

1. [Agent のコンフィギュレーションディレクトリ][1]のルートにある `conf.d/` フォルダーの `redisdb.d/conf.yaml` ファイルを編集します。以下のパラメーターは、更新が必要な場合があります。使用可能なすべてのコンフィギュレーションオプションの詳細については、[redisdb.d/conf.yaml のサンプル][2]を参照してください。

   ```yaml
   init_config:
   instances:
     ## @param host - string - required
     ## Enter the host to connect to.
     - host: localhost
       ## @param port - integer - required
       ## Enter the port of the host to connect to.
       port: 6379

       ## @param username - string - optional
       ## The username to use for the connection. Redis 6+ only.
       #
       # username: <USERNAME>

       ## @param password - string - optional
       ## The password to use for the connection.
       #
       # password: <PASSWORD>
   ```

2. Redis 6+ および ACL を使用している場合は、ユーザーが少なくともデータベースレベルで `DB  Viewer` 権限を、クラスター環境で実行している場合は `Cluster Viewer` 権限を所有していることを確認します。詳細は、[関連ドキュメント][3]を参照してください。

3. [Agent を再起動します][4]。

##### ログの収集

_Agent バージョン 6.0 以降で利用可能_

1. Datadog Agent で、ログの収集はデフォルトで無効になっています。以下のように、`datadog.yaml` ファイルでこれを有効にします。

   ```yaml
   logs_enabled: true
   ```

2. `redisdb.d/conf.yaml` の下部にある、次の構成ブロックのコメントを解除して編集します。

   ```yaml
   logs:
     - type: file
       path: /var/log/redis_6379.log
       source: redis
       service: myapplication
   ```

    `path` パラメーターと `service` パラメーターの値を変更し、環境に合わせて構成してください。使用可能なすべてのコンフィギュレーションオプションの詳細については、[redisdb.yaml のサンプル][2]を参照してください。

3. [Agent を再起動します][4]。

##### トレースの収集

Datadog APM は、Redis と統合して分散システム全体のトレースを確認します。Datadog Agent v6 以降では、トレースの収集はデフォルトで有効化されています。トレースの収集を開始するには、以下の手順に従います。

1. [Datadog でトレースの収集を有効にします][5]。
2. [Redis へのリクエストを作成するアプリケーションをインスツルメントします][6]。


[1]: https://docs.datadoghq.com/ja/agent/guide/agent-configuration-files/#agent-configuration-directory
[2]: https://github.com/DataDog/integrations-core/blob/master/redisdb/datadog_checks/redisdb/data/conf.yaml.example
[3]: https://docs.redislabs.com/latest/rs/administering/access-control/user-roles/#cluster-management-roles
[4]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[5]: https://docs.datadoghq.com/ja/tracing/send_traces/
[6]: https://docs.datadoghq.com/ja/tracing/setup/
{{% /tab %}}
{{% tab "Docker" %}}

#### Docker

コンテナで実行中の Agent に対してこのチェックを構成するには:

##### メトリクスの収集

アプリケーションのコンテナで、[オートディスカバリーのインテグレーションテンプレート][1]を Docker ラベルとして設定します。

```yaml
LABEL "com.datadoghq.ad.check_names"='["redisdb"]'
LABEL "com.datadoghq.ad.init_configs"='[{}]'
LABEL "com.datadoghq.ad.instances"='[{"host":"%%host%%","port":"6379","password":"%%env_REDIS_PASSWORD%%"}]'
```

**注**: パスワードがプレーンテキストで保存されることを避けるため、`"%%env_<ENV_VAR>%%"` テンプレート変数ロジックが使用されています。そのため、`REDIS_PASSWORD` 環境変数は Agent コンテナに設定される必要があります。詳細は、[オートディスカバリーのテンプレート変数][2]ドキュメントをご参照ください。または、Agent で `secrets` パッケージを利用して[シークレット管理][3]バックエンド（HashiCorp Vault または AWS Secrets Manager）と動作することも可能です。

##### ログの収集

_Agent バージョン 6.0 以降で利用可能_

ログの収集は、Datadog Agent ではデフォルトで無効になっています。有効にするには、[Docker ログ収集ドキュメント][4]を参照してください。

次に、[ログインテグレーション][5]を Docker ラベルとして設定します。

```yaml
LABEL "com.datadoghq.ad.logs"='[{"source":"redis","service":"<YOUR_APP_NAME>"}]'
```

##### トレースの収集

コンテナ化されたアプリケーションの APM は、Agent v6 以降でサポートされていますが、トレースの収集を開始するには、追加のコンフィギュレーションが必要です。

Agent コンテナで必要な環境変数

| パラメーター            | 値                                                                      |
| -------------------- | -------------------------------------------------------------------------- |
| `<DD_API_KEY>` | `api_key`                                                                  |
| `<DD_APM_ENABLED>`      | true                                                              |
| `<DD_APM_NON_LOCAL_TRAFFIC>`  | true |

利用可能な環境変数およびコンフィギュレーションの全リストについては、[Docker アプリケーションのトレース][6] を参照してください。

次に、[Redis にリクエストを送信するアプリケーションのコンテナをインスツルメント][7]し、Agent のコンテナ名に `DD_AGENT_HOST` を設定します。


[1]: https://docs.datadoghq.com/ja/agent/docker/integrations/?tab=docker
[2]: https://docs.datadoghq.com/ja/agent/faq/template_variables/
[3]: https://docs.datadoghq.com/ja/agent/guide/secrets-management/?tab=linux
[4]: https://docs.datadoghq.com/ja/agent/docker/log/?tab=containerinstallation#installation
[5]: https://docs.datadoghq.com/ja/agent/docker/log/?tab=containerinstallation#log-integrations
[6]: https://docs.datadoghq.com/ja/agent/docker/apm/?tab=linux
[7]: https://docs.datadoghq.com/ja/tracing/setup/
{{% /tab %}}
{{% tab "Kubernetes" %}}

#### Kubernetes

このチェックを、Kubernetes で実行している Agent に構成します。

##### メトリクスの収集

アプリケーションのコンテナで、[オートディスカバリーのインテグレーションテンプレート][1]をポッドアノテーションとして設定します。他にも、[ファイル、ConfigMap、または key-value ストア][2]を使用してテンプレートを構成できます。

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: redis
  annotations:
    ad.datadoghq.com/redis.check_names: '["redisdb"]'
    ad.datadoghq.com/redis.init_configs: '[{}]'
    ad.datadoghq.com/redis.instances: |
      [
        {
          "host": "%%host%%",
          "port":"6379",
          "password":"%%env_REDIS_PASSWORD%%"
        }
      ]
  labels:
    name: redis
spec:
  containers:
    - name: redis
      image: redis:latest
      ports:
        - containerPort: 6379
```

**注**: パスワードがプレーンテキストで保存されることを避けるため、`"%%env_<ENV_VAR>%%"` テンプレート変数ロジックが使用されています。そのため、`REDIS_PASSWORD` 環境変数は Agent コンテナに設定される必要があります。詳細は、[オートディスカバリーのテンプレート変数][3]ドキュメントをご参照ください。または、Agent で `secrets` パッケージを利用して[シークレット管理][4]バックエンド（HashiCorp Vault または AWS Secrets Manager）と動作することも可能です。

##### ログの収集

_Agent バージョン 6.0 以降で利用可能_

ログの収集は、Datadog Agent ではデフォルトで無効になっています。有効にするには、[Kubernetes ログ収集のドキュメント][5]を参照してください。

次に、[ログのインテグレーション][6]をポッドアノテーションとして設定します。これは、[ファイル、ConfigMap、または key-value ストア][7]を使用して構成することも可能です。

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: redis
  annotations:
    ad.datadoghq.com/redis.logs: '[{"source":"redis","service":"<YOUR_APP_NAME>"}]'
  labels:
    name: redis
spec:
  containers:
    - name: redis
      image: redis:latest
      ports:
        - containerPort: 6379
```

##### トレースの収集

コンテナ化されたアプリケーションの APM は、Agent v6 以降を実行するホストでサポートされていますが、トレースの収集を開始するには、追加のコンフィギュレーションが必要です。

Agent コンテナで必要な環境変数

| パラメーター            | 値                                                                      |
| -------------------- | -------------------------------------------------------------------------- |
| `<DD_API_KEY>` | `api_key`                                                                  |
| `<DD_APM_ENABLED>`      | true                                                              |
| `<DD_APM_NON_LOCAL_TRAFFIC>`  | true |

利用可能な環境変数とコンフィギュレーションの完全なリストについては、[Kubernetes アプリケーションのトレース][8]および [Kubernetes Daemon のセットアップ][9]を参照してください。

そして、[Redis へのリクエストを作成するアプリケーションコンテナをインスツルメントします][10]。

[1]: https://docs.datadoghq.com/ja/agent/kubernetes/integrations/?tab=kubernetes
[2]: https://docs.datadoghq.com/ja/agent/kubernetes/integrations/?tab=kubernetes#configuration
[3]: https://docs.datadoghq.com/ja/agent/faq/template_variables/
[4]: https://docs.datadoghq.com/ja/agent/guide/secrets-management/?tab=linux
[5]: https://docs.datadoghq.com/ja/agent/kubernetes/log/?tab=containerinstallation#setup
[6]: https://docs.datadoghq.com/ja/agent/docker/log/?tab=containerinstallation#log-integrations
[7]: https://docs.datadoghq.com/ja/agent/kubernetes/log/?tab=daemonset#configuration
[8]: https://docs.datadoghq.com/ja/agent/kubernetes/apm/?tab=java
[9]: https://docs.datadoghq.com/ja/agent/kubernetes/daemonset_setup/?tab=k8sfile#apm-and-distributed-tracing
[10]: https://docs.datadoghq.com/ja/tracing/setup/
{{% /tab %}}
{{% tab "ECS" %}}

#### ECS

このチェックを、ECS で実行している Agent に構成するには:

##### メトリクスの収集

アプリケーションのコンテナで、[オートディスカバリーのインテグレーションテンプレート][1]を Docker ラベルとして設定します。

```json
{
  "containerDefinitions": [{
    "name": "redis",
    "image": "redis:latest",
    "dockerLabels": {
      "com.datadoghq.ad.check_names": "[\"redisdb\"]",
      "com.datadoghq.ad.init_configs": "[{}]",
      "com.datadoghq.ad.instances": "[{\"host\":\"%%host%%\",\"port\":\"6379\",\"password\":\"%%env_REDIS_PASSWORD%%\"}]"
    }
  }]
}
```

**注**: パスワードがプレーンテキストで保存されることを避けるため、`"%%env_<ENV_VAR>%%"` テンプレート変数ロジックが使用されています。そのため、`REDIS_PASSWORD` 環境変数は Agent コンテナに設定される必要があります。詳細は、[オートディスカバリーのテンプレート変数][2]ドキュメントをご参照ください。または、Agent で `secrets` パッケージを利用して[シークレット管理][3]バックエンド（HashiCorp Vault または AWS Secrets Manager）と動作することも可能です。

##### ログの収集

_Agent バージョン 6.0 以降で利用可能_

ログの収集は、Datadog Agent ではデフォルトで無効になっています。有効にするには、[ECS ログ収集ドキュメント][4]を参照してください。

次に、[ログインテグレーション][5]を Docker ラベルとして設定します。

```yaml
{
  "containerDefinitions": [{
    "name": "redis",
    "image": "redis:latest",
    "dockerLabels": {
      "com.datadoghq.ad.logs": "[{\"source\":\"redis\",\"service\":\"<YOUR_APP_NAME>\"}]"
    }
  }]
}
```

##### トレースの収集

コンテナ化されたアプリケーションの APM は、Agent v6 以降でサポートされていますが、トレースの収集を開始するには、追加のコンフィギュレーションが必要です。

Agent コンテナで必要な環境変数

| パラメーター            | 値                                                                      |
| -------------------- | -------------------------------------------------------------------------- |
| `<DD_API_KEY>` | `api_key`                                                                  |
| `<DD_APM_ENABLED>`      | true                                                              |
| `<DD_APM_NON_LOCAL_TRAFFIC>`  | true |

利用可能な環境変数およびコンフィギュレーションの全リストについては、[Docker アプリケーションのトレース][6] を参照してください。

次に、[Redis にリクエストを送信するアプリケーションのコンテナをインスツルメント][7]し、 [EC2 プライベート IP アドレス][8]に `DD_AGENT_HOST` を設定します。

[1]: https://docs.datadoghq.com/ja/agent/docker/integrations/?tab=docker
[2]: https://docs.datadoghq.com/ja/agent/faq/template_variables/
[3]: https://docs.datadoghq.com/ja/agent/guide/secrets-management/?tab=linux
[4]: https://docs.datadoghq.com/ja/agent/amazon_ecs/logs/?tab=linux
[5]: https://docs.datadoghq.com/ja/agent/docker/log/?tab=containerinstallation#log-integrations
[6]: https://docs.datadoghq.com/ja/agent/docker/apm/?tab=linux
[7]: https://docs.datadoghq.com/ja/tracing/setup/
[8]: https://docs.datadoghq.com/ja/agent/amazon_ecs/apm/?tab=ec2metadataendpoint#setup
{{% /tab %}}
{{< /tabs >}}

### 検証

[Agent の status サブコマンドを実行][2]し、Checks セクションで `redisdb` を探します。

## 収集データ

### メトリクス
{{< get-metrics-from-git "redisdb" >}}


### イベント

Redis チェックには、イベントは含まれません。

### サービスのチェック

**redis.can_connect**:<br>
Agent が Redis に接続してメトリクスを収集できない場合は、`CRITICAL` を返します。それ以外の場合は、`OK` を返します。

**redis.replication.master_link_status**:<br>
この Redis インスタンスがマスターインスタンスに接続できない場合は、`CRITICAL` を返します。それ以外の場合は、`OK` を返します。

## トラブルシューティング

- [Redis インテグレーションエラー: "unknown command 'CONFIG'"][3]

### Agent が接続できない

```shell
    redisdb
    -------
      - instance #0 [ERROR]: 'Error 111 connecting to localhost:6379. Connection refused.'
      - Collected 0 metrics, 0 events & 1 service chec
```

`redisdb.yaml` 内の接続情報が正しいかどうかをチェックしてください。

### Agent を認証できない

```shell
    redisdb
    -------
      - instance #0 [ERROR]: 'NOAUTH Authentication required.'
      - Collected 0 metrics, 0 events & 1 service check
```

`redisdb.yaml` で `password` を設定してください。

## その他の参考資料

お役に立つドキュメント、リンクや記事:

- [Redis パフォーマンスメトリクスの監視方法][4]


[1]: https://app.datadoghq.com/account/settings#agent
[2]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[3]: https://docs.datadoghq.com/ja/integrations/faq/redis-integration-error-unknown-command-config/
[4]: https://www.datadoghq.com/blog/how-to-monitor-redis-performance-metrics