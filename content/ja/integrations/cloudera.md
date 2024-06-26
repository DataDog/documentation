---
app_id: cloudera
app_uuid: 526ca1e8-f474-49cd-9a79-6cfe75de15fe
assets:
  dashboards:
    Cloudera Data Platform Overview: assets/dashboards/cloudera_overview.json
  integration:
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: cloudera.cluster.cpu_percent_across_hosts
      metadata_path: metadata.csv
      prefix: cloudera.
    process_signatures:
    - cdp
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_name: Cloudera
  monitors:
    Cloudera High CPU Usage: assets/recommended_monitors/cloudera_high_cpu.json
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com (日本語対応)
  support_email: help@datadoghq.com
categories:
- クラウド
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/cloudera/README.md
display_on_public_website: true
draft: false
git_integration_title: cloudera
integration_id: cloudera
integration_title: Cloudera
integration_version: 1.1.0
is_public: true
custom_kind: integration
manifest_version: 2.0.0
name: cloudera
public_title: Cloudera
short_description: Cloudera
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Cloud
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  configuration: README.md#Setup
  description: Cloudera
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Cloudera
---



## 概要

このインテグレーションは、Datadog Agent を通じて [Cloudera Data Platform][1] をモニタリングし、Cloudera Data Hub クラスター、ホスト、ロールの健全性に関するメトリクスとサービスチェックを送信できるようにします。

## セットアップ

ホストで実行されている Agent 用にこのチェックをインストールおよび構成する場合は、以下の手順に従ってください。コンテナ環境の場合は、[オートディスカバリーのインテグレーションテンプレート][2]のガイドを参照してこの手順を行ってください。

### インストール

Cloudera チェックは [Datadog Agent][3] パッケージに含まれています。
サーバーに追加でインストールする必要はありません。

### コンフィギュレーション

#### Prepare Cloudera Manager
1. Cloudera Data Platform で、Management Console に移動し、**User Management** タブをクリックします。
![User Management][4]

2. **Actions**、**Create Machine User** の順にクリックし、Datadog Agent を通じて Cloudera Manager にクエリを行うマシンユーザーを作成します。
![Create Machine User][5]

3. ワークロードパスワードが設定されていない場合は、ユーザー作成後、**Set Workload Password** をクリックしてください。
![Set Workload Password][6]

{{< tabs >}}
{{% tab "Host" %}}

#### ホスト
1. Cloudera クラスターとホストのデータの収集を開始するには、Agent のコンフィギュレーションディレクトリのルートにある `conf.d/` フォルダーの `cloudera.d/conf.yaml` ファイルを編集します。使用可能なすべてのコンフィギュレーションオプションの詳細については、[cloudera.d/conf.yaml のサンプル][1]を参照してください。
**注**: `api_url`の末尾には、API バージョンを記述する必要があります。

   ```yaml
   init_config:

      ## @param workload_username - string - required
      ## The Workload username. This value can be found in the `User Management` tab of the Management 
      ## Console in the `Workload User Name`.
      #
      workload_username: <WORKLOAD_USERNAME>

      ## @param workload_password - string - required
      ## The Workload password. This value can be found in the `User Management` tab of the Management 
      ## Console in the `Workload Password`.
      #
      workload_password: <WORKLOAD_PASSWORD>

   ## Every instance is scheduled independently of the others.
   #
   instances:

      ## @param api_url - string - required
      ## The URL endpoint for the Cloudera Manager API. This can be found under the Endpoints tab for 
      ## your Data Hub to monitor. 
      ##
      ## Note: The version of the Cloudera Manager API needs to be appended at the end of the URL. 
      ## For example, using v48 of the API for Data Hub `cluster_1` should result with a URL similar 
      ## to the following:
      ## `https://cluster1.cloudera.site/cluster_1/cdp-proxy-api/cm-api/v48`
      #
      - api_url: <API_URL>
   ```

2. [Agent を再起動する][2]と、Cloudera Data Hub クラスターデータの収集と Datadog への送信を開始します。

[1]: https://github.com/DataDog/integrations-core/blob/master/cloudera/datadog_checks/cloudera/data/conf.yaml.example
[2]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
{{% /tab %}}
{{% tab "Containerized" %}}

#### コンテナ化

コンテナ環境の場合は、[オートディスカバリーのインテグレーションテンプレート][1]のガイドを参照して、次のパラメーターを適用してください。

| パラメーター            | 値                                                                                                            |
| -------------------- | ---------------------------------------------------------------------------------------------------------------- |
| `<インテグレーション名>` | `cloudera`                                                                                                       |
| `<初期コンフィギュレーション>`      | `{"workload_username": "<WORKLOAD_USERNAME>", 'workload_password": "<WORKLOAD_PASSWORD>"}`                       |
| `<インスタンスコンフィギュレーション>`  | `{"api_url": <API_URL>"}`                                                                                        |

[1]: https://docs.datadoghq.com/ja/agent/kubernetes/integrations/
{{% /tab %}}
{{< /tabs >}}

#### クラスターの検出

クラスターの検出方法は、`clusters` 構成オプションで以下のパラメーターで設定することができます。

- `limit`
: 自動検出するアイテムの最大数。
**デフォルト値**: `None` (全クラスターが処理されます)

- `include`
: 正規表現キーとコンポーネント設定値の自動検出へのマッピング。 
**デフォルト値**: empty map

- `exclude`
: 自動検出から除外するコンポーネントのパターンを持つ正規表現のリスト。
**デフォルト値**: empty list

- `interval`
: エンドポイントを通じて取得した最後のクラスター一覧の有効時間 (秒)。 
**デフォルト値**: `None` (キャッシュを使用しない)

**例**:

`my_cluster` で始まる名前のクラスターを最大 `5` まで処理します。

```yaml
clusters:
  limit: 5
  include:
    - 'my_cluster.*'
```

最大 `20` のクラスターを処理し、`tmp_` で始まる名前を持つクラスターを除外します。

```yaml
clusters:
  limit: 20
  include:
    - '.*'
  exclude:
    - 'tmp_.*'
```

#### カスタムクエリ

カスタム時系列クエリを実行することで、デフォルトでは収集されないカスタムメトリクスを収集するように Cloudera インテグレーションを構成することができます。これらのクエリは、[tsquery 言語][7]を使用して、Cloudera Manager からデータを取得します。

**例**:

カスタムタグとして `cloudera_jvm` を使用して、JVM ガベージコレクションレートと JVM フリーメモリを収集します。

```yaml
custom_queries:
- query: select last(jvm_gc_rate) as jvm_gc_rate, last(jvm_free_memory) as jvm_free_memory
  tags: cloudera_jvm
```

注: これらのクエリはメトリクス表現を利用することができ、`total_cpu_user + total_cpu_system`、`1000 * jvm_gc_time_ms / jvm_gc_count` および `max(total_cpu_user)` などのクエリを作成します。メトリクス式を使用する場合、メトリクスのエイリアスも含めるようにしてください。そうしないと、メトリクス名が正しくフォーマットされないことがあります。例えば、`SELECT last(jvm_gc_count)` は `cloudera.<CATEGORY>.last_jvm_gc_count` というメトリクスを生成します。次の例のようにエイリアスを追加することができます: `SELECT last(jvm_gc_count) as jvm_gc_count` で `cloudera.<CATEGORY>.jvm_gc_count` というメトリクスが生成されます。

### 検証

[Agent の status サブコマンドを実行][8]し、Checks セクションの `cloudera` を探します。

## 収集データ

### メトリクス
{{< get-metrics-from-git "cloudera" >}}


### イベント

Cloudera インテグレーションは、Cloudera Manager API の `/events` エンドポイントから発行されるイベントを収集します。イベントレベルは以下のようにマッピングされます。

| Cloudera                  | Datadog                        |
|---------------------------|--------------------------------|
| `UNKNOWN`                 | `error`                        |
| `INFORMATIONAL`           | `info`                         |
| `IMPORTANT`               | `info`                         |
| `CRITICAL`                | `error`                        |

### サービスのチェック
{{< get-service-checks-from-git "cloudera" >}}


## トラブルシューティング

### Cloudera ホスト上の Datadog インテグレーションのメトリクスを収集する
Cloudera ホストに Datadog Agent をインストールするには、ホストに関連付けられたセキュリティグループが SSH アクセスを許可していることを確認します。
そして、環境作成時に生成した SSH キーでホストにアクセスする際に、[ルートユーザー `cloudbreak`][9] を使用する必要があります。

```
sudo ssh -i "/path/to/key.pem" cloudbreak@<HOST_IP_ADDRESS>
```

ワークロードのユーザー名とパスワードは、SSH で Cloudera ホストにアクセスするために使用できますが、Datadog Agent をインストールできるのは `cloudbreak` ユーザーだけです。
`cloudbreak` 以外のユーザーを使用しようとすると、以下のようなエラーが発生する可能性があります。
```
<NON_CLOUDBREAK_USER> is not allowed to run sudo on <CLOUDERA_HOSTNAME>.  This incident will be reported.
```

### Datadog メトリクス収集時の構成エラー
Cloudera ホストからメトリクスを収集する際に、Agent のステータスに以下のようなものが表示された場合

```
  Config Errors
  ==============
    zk
    --
      open /etc/datadog-agent/conf.d/zk.d/conf.yaml: permission denied
```

`conf.yaml` の所有者を `dd-agent` に変更する必要があります。

```
[cloudbreak@<CLOUDERA_HOSTNAME> ~]$ sudo chown -R dd-agent:dd-agent /etc/datadog-agent/conf.d/zk.d/conf.yaml
```


ご不明な点は、[Datadog のサポートチーム][10]までお問合せください。

## その他の参考資料

お役に立つドキュメント、リンクや記事:

- [Datadog で Cloudera クラスターを視覚化する][11]


[1]: https://www.cloudera.com/products/cloudera-data-platform.html
[2]: https://docs.datadoghq.com/ja/agent/kubernetes/integrations/
[3]: https://app.datadoghq.com/account/settings#agent
[4]: https://raw.githubusercontent.com/DataDog/integrations-core/master/cloudera/images/user_management.png
[5]: https://raw.githubusercontent.com/DataDog/integrations-core/master/cloudera/images/create_machine_user.png
[6]: https://raw.githubusercontent.com/DataDog/integrations-core/master/cloudera/images/set_workload_password.png
[7]: https://docs.cloudera.com/cloudera-manager/7.9.0/monitoring-and-diagnostics/topics/cm-tsquery-syntax.html
[8]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[9]: https://docs.cloudera.com/data-hub/cloud/access-clusters/topics/mc-accessing-cluster-via-ssh.html
[10]: https://docs.datadoghq.com/ja/help/
[11]: https://www.datadoghq.com/blog/cloudera-integration-announcement/