---
app_id: cloudera
categories:
- クラウド
- data stores
custom_kind: インテグレーション
description: Cloudera
further_reading:
- link: https://www.datadoghq.com/blog/cloudera-integration-announcement/
  tag: blog
  text: Gain visibility into your Cloudera clusters with Datadog
integration_version: 3.2.0
media: []
supported_os:
- linux
- windows
- macos
title: Cloudera
---
## 概要

This integration monitors your [Cloudera Data Platform](https://www.cloudera.com/products/cloudera-data-platform.html) through the Datadog Agent, allowing you to submit metrics and service checks on the health of your Cloudera Data Hub clusters, hosts, and roles.

## セットアップ

Follow the instructions below to install and configure this check for an Agent running on a host. For containerized environments, see the [Autodiscovery Integration Templates](https://docs.datadoghq.com/agent/kubernetes/integrations/) for guidance on applying these instructions.

### インストール

The Cloudera check is included in the [Datadog Agent](https://app.datadoghq.com/account/settings/agent/latest) package.
No additional installation is needed on your server.

### 設定

#### 要件

Cloudera チェックを実行するには、Cloudera Manager バージョン 7 が必要です。

#### Prepare Cloudera Manager

1. Cloudera Data Platform で、Management Console に移動し、**User Management** タブをクリックします。
   ![User Management](https://raw.githubusercontent.com/DataDog/integrations-core/master/cloudera/images/user_management.png)

1. **Actions**、**Create Machine User** の順にクリックし、Datadog Agent を通じて Cloudera Manager にクエリを行うマシンユーザーを作成します。
   ![Create Machine User](https://raw.githubusercontent.com/DataDog/integrations-core/master/cloudera/images/create_machine_user.png)

1. ワークロードパスワードが設定されていない場合は、ユーザー作成後、**Set Workload Password** をクリックしてください。
   ![Set Workload Password](https://raw.githubusercontent.com/DataDog/integrations-core/master/cloudera/images/set_workload_password.png)

{{< tabs >}}

{{% tab "Host" %}}

#### ホスト

1. Edit the `cloudera.d/conf.yaml` file, in the `conf.d/` folder at the root of your Agent's configuration directory to start collecting your Cloudera cluster and host data. See the [sample cloudera.d/conf.yaml](https://github.com/DataDog/integrations-core/blob/master/cloudera/datadog_checks/cloudera/data/conf.yaml.example) for all available configuration options.\
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

1. [Restart the Agent](https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent) to start collecting and sending Cloudera Data Hub cluster data to Datadog.

{{% /tab %}}

{{% tab "Containerized" %}}

#### コンテナ化

For containerized environments, see the [Autodiscovery Integration Templates](https://docs.datadoghq.com/agent/kubernetes/integrations/) for guidance on applying the parameters below.

| パラメーター            | 値                                                                                                            |
| -------------------- | ---------------------------------------------------------------------------------------------------------------- |
| `<INTEGRATION_NAME>` | `cloudera`                                                                                                       |
| `<INIT_CONFIG>`      | `{"workload_username": "<WORKLOAD_USERNAME>", 'workload_password": "<WORKLOAD_PASSWORD>"}`                       |
| `<INSTANCE_CONFIG>`  | `{"api_url": <API_URL>"}`                                                                                        |

{{% /tab %}}

{{< /tabs >}}

#### クラスターの検出

クラスターの検出方法は、`clusters` 構成オプションで以下のパラメーターで設定することができます。

- `limit`
  : Maximum number of items to be autodiscovered.\
  **デフォルト値**: `None` (全クラスターが処理されます)

- `include`
  : Mapping of regular expression keys and component config values to autodiscover.\
  **デフォルト値**: empty map

- `exclude`
  : List of regular expressions with the patterns of components to exclude from autodiscovery.\
  **デフォルト値**: empty list

- `interval`
  : Validity time in seconds of the last list of clusters obtained through the endpoint.\
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

You can configure the Cloudera integration to collect custom metrics that are not be collected by default by running custom timeseries queries. These queries use [the tsquery language](https://docs.cloudera.com/cloudera-manager/7.9.0/monitoring-and-diagnostics/topics/cm-tsquery-syntax.html) to retrieve data from Cloudera Manager.

**例**:

カスタムタグとして `cloudera_jvm` を使用して、JVM ガベージコレクションレートと JVM フリーメモリを収集します。

```yaml
custom_queries:
- query: select last(jvm_gc_rate) as jvm_gc_rate, last(jvm_free_memory) as jvm_free_memory
  tags: cloudera_jvm
```

注: これらのクエリはメトリクス表現を利用することができ、`total_cpu_user + total_cpu_system`、`1000 * jvm_gc_time_ms / jvm_gc_count` および `max(total_cpu_user)` などのクエリを作成します。メトリクス式を使用する場合、メトリクスのエイリアスも含めるようにしてください。そうしないと、メトリクス名が正しくフォーマットされないことがあります。例えば、`SELECT last(jvm_gc_count)` は `cloudera.<CATEGORY>.last_jvm_gc_count` というメトリクスを生成します。次の例のようにエイリアスを追加することができます: `SELECT last(jvm_gc_count) as jvm_gc_count` で `cloudera.<CATEGORY>.jvm_gc_count` というメトリクスが生成されます。

### 検証

[Run the Agent's status subcommand](https://docs.datadoghq.com/agent/guide/agent-commands/#agent-status-and-information) and look for `cloudera` under the Checks section.

## 収集データ

### メトリクス

| | |
| --- | --- |
| **cloudera.cluster.cpu_percent_across_hosts** <br>(gauge) | Percent of the Host CPU Usage metric computed across all this entity's descendant Host entities<br>_Shown as percent_ |
| **cloudera.cluster.total_bytes_receive_rate_across_network_interfaces** <br>(gauge) | The sum of the Bytes Received metric computed across all this entity's descendant Network Interface entities<br>_Shown as byte_ |
| **cloudera.cluster.total_bytes_transmit_rate_across_network_interfaces** <br>(gauge) | The sum of the Bytes Transmitted metric computed across all this entity's descendant Network Interface entities<br>_Shown as byte_ |
| **cloudera.cluster.total_read_bytes_rate_across_disks** <br>(gauge) | The sum of the Disk Bytes Read metric computed across all this entity's descendant Disk entities<br>_Shown as byte_ |
| **cloudera.cluster.total_write_bytes_rate_across_disks** <br>(gauge) | The sum of the Disk Bytes Written metric computed across all this entity's descendant Disk entities<br>_Shown as byte_ |
| **cloudera.disk.await_read_time** <br>(gauge) | The average disk await read time of the entity<br>_Shown as millisecond_ |
| **cloudera.disk.await_time** <br>(gauge) | The average disk await time of the entity<br>_Shown as millisecond_ |
| **cloudera.disk.await_write_time** <br>(gauge) | The average disk await write time of the entity<br>_Shown as millisecond_ |
| **cloudera.disk.service_time** <br>(gauge) | The average disk service time of the entity<br>_Shown as millisecond_ |
| **cloudera.host.alerts_rate** <br>(gauge) | The number of alerts per second<br>_Shown as event_ |
| **cloudera.host.cpu_iowait_rate** <br>(gauge) | Total CPU iowait time|
| **cloudera.host.cpu_irq_rate** <br>(gauge) | Total CPU IRQ time|
| **cloudera.host.cpu_nice_rate** <br>(gauge) | Total CPU nice time|
| **cloudera.host.cpu_soft_irq_rate** <br>(gauge) | Total CPU soft IRQ time|
| **cloudera.host.cpu_steal_rate** <br>(gauge) | Stolen time, which is the time spent in other operating systems when running in a virtualized environment|
| **cloudera.host.cpu_system_rate** <br>(gauge) | Total System CPU|
| **cloudera.host.cpu_user_rate** <br>(gauge) | Total CPU user time|
| **cloudera.host.events_critical_rate** <br>(gauge) | The number of critical events|
| **cloudera.host.events_important_rate** <br>(gauge) | The number of important events|
| **cloudera.host.health_bad_rate** <br>(gauge) | Percentage of Time with Bad Health|
| **cloudera.host.health_concerning_rate** <br>(gauge) | Percentage of Time with Concerning Health|
| **cloudera.host.health_disabled_rate** <br>(gauge) | Percentage of Time with Disabled Health|
| **cloudera.host.health_good_rate** <br>(gauge) | Percentage of Time with Good Health|
| **cloudera.host.health_unknown_rate** <br>(gauge) | Percentage of Time with Unknown Health|
| **cloudera.host.load_1** <br>(gauge) | Load Average over 1 minute|
| **cloudera.host.load_15** <br>(gauge) | Load Average over 15 minutes|
| **cloudera.host.load_5** <br>(gauge) | Load Average over 5 minutes|
| **cloudera.host.num_cores** <br>(gauge) | Total number of cores|
| **cloudera.host.num_physical_cores** <br>(gauge) | Total number of physical cores|
| **cloudera.host.physical_memory_buffers** <br>(gauge) | The amount of physical memory devoted to temporary storage for raw disk blocks<br>_Shown as byte_ |
| **cloudera.host.physical_memory_cached** <br>(gauge) | The amount of physical memory used for files read from the disk. This is commonly referred to as the pagecache<br>_Shown as byte_ |
| **cloudera.host.physical_memory_total** <br>(gauge) | The total physical memory available<br>_Shown as byte_ |
| **cloudera.host.physical_memory_used** <br>(gauge) | The total amount of memory being used, excluding buffers and cache<br>_Shown as byte_ |
| **cloudera.host.swap_out_rate** <br>(gauge) | Memory swapped out to disk<br>_Shown as page_ |
| **cloudera.host.swap_used** <br>(gauge) | Swap used<br>_Shown as byte_ |
| **cloudera.host.total_bytes_receive_rate_across_network_interfaces** <br>(gauge) | The sum of the Bytes Received metric computed across all this entity's descendant Network Interface entities<br>_Shown as byte_ |
| **cloudera.host.total_bytes_transmit_rate_across_network_interfaces** <br>(gauge) | The sum of the Bytes Transmitted metric computed across all this entity's descendant Network Interface entities<br>_Shown as byte_ |
| **cloudera.host.total_phys_mem_bytes** <br>(gauge) | Total physical memory in bytes<br>_Shown as byte_ |
| **cloudera.host.total_read_bytes_rate_across_disks** <br>(gauge) | The sum of the Disk Bytes Read metric computed across all this entity's descendant Disk entities<br>_Shown as byte_ |
| **cloudera.host.total_read_ios_rate_across_disks** <br>(gauge) | The sum of the Disk Reads metric computed across all this entity's descendant Disk entities<br>_Shown as operation_ |
| **cloudera.host.total_write_bytes_rate_across_disks** <br>(gauge) | The sum of the Disk Bytes Written metric computed across all this entity's descendant Disk entities<br>_Shown as byte_ |
| **cloudera.host.total_write_ios_rate_across_disks** <br>(gauge) | The sum of the Disk Writes metric computed across all this entity's descendant Disk entities<br>_Shown as operation_ |
| **cloudera.role.cpu_system_rate** <br>(gauge) | Total System CPU|
| **cloudera.role.cpu_user_rate** <br>(gauge) | Total CPU user time|
| **cloudera.role.mem_rss** <br>(gauge) | Resident memory used<br>_Shown as byte_ |

### イベント

Cloudera インテグレーションは、Cloudera Manager API の `/events` エンドポイントから発行されるイベントを収集します。イベントレベルは以下のようにマッピングされます。

| Cloudera                  | Datadog                        |
|---------------------------|--------------------------------|
| `UNKNOWN`                 | `error`                        |
| `INFORMATIONAL`           | `info`                         |
| `IMPORTANT`               | `info`                         |
| `CRITICAL`                | `error`                        |

### サービス チェック

**cloudera.can_connect**

Returns `OK` if the check is able to connect to the Cloudera Manager API and collect metrics, `CRITICAL` otherwise.

_Statuses: ok, critical_

**cloudera.cluster.health**

Returns `OK` if the cluster is in good health or is starting, `WARNING` if the cluster is stopping or the health is concerning, `CRITICAL` if the cluster is down or in bad health, and `UNKNOWN` otherwise.

_Statuses: ok, critical, warning, unknown_

**cloudera.host.health**

Returns `OK` if the host is in good health or is starting, `WARNING` if the host is stopping or the health is concerning, `CRITICAL` if the host is down or in bad health, and `UNKNOWN` otherwise.

_Statuses: ok, critical, warning, unknown_

## トラブルシューティング

### Cloudera ホスト上の Datadog インテグレーションのメトリクスを収集する

To install the Datadog Agent on a Cloudera host, make sure that the security group associated with the host allows SSH access.
Then, you need to use the [root user `cloudbreak`](https://docs.cloudera.com/data-hub/cloud/access-clusters/topics/mc-accessing-cluster-via-ssh.html) when accessing the host with the SSH key generated during the environment creation:

```
sudo ssh -i "/path/to/key.pem" cloudbreak@<HOST_IP_ADDRESS>
```

The workload username and password can be used to access Cloudera hosts through SSH, although only the `cloudbreak` user can install the Datadog Agent.
Trying to use any user that is not `cloudbreak` may result in the following error:

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

お問合せは、[Datadog サポート](https://docs.datadoghq.com/help/) まで。

## その他の参考資料

役立つドキュメント、リンク、記事:

- [Gain visibility into your Cloudera clusters with Datadog](https://www.datadoghq.com/blog/cloudera-integration-announcement/)