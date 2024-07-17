---
aliases:
- /ja/guides/process
- /ja/graphing/infrastructure/process/
further_reading:
- link: https://www.datadoghq.com/blog/live-process-monitoring/
  tag: ブログ
  text: Datadog でのプロセスのモニタリング
- link: /infrastructure/process/generate_process_metrics/
  tag: Documentation
  text: メトリクスでプロセスデータの保持期間を高めます
- link: /infrastructure/livecontainers
  tag: Documentation
  text: 環境内のすべてのコンテナのリアルタイム表示
- link: https://www.datadoghq.com/blog/monitor-third-party-software-with-live-processes/
  tag: ブログ
  text: 保存ビューでソフトウェアのパフォーマンスとリソース消費を相関付ける
- link: https://www.datadoghq.com/blog/process-level-data/
  tag: ブログ
  text: プロセスレベルのアプリとネットワークデータを使用して、より迅速にトラブルシューティングを行います
- link: https://www.datadoghq.com/blog/watchdog-live-processes/
  tag: ブログ
  text: ライブプロセス用 Watchdog Insights によるワークロードのパフォーマンス異常に対するトラブルシューティング
kind: documentation
title: ライブプロセス
---


<div class="alert alert-warning">
Live Processes is included in the Enterprise plan. For all other plans, contact your account representative or <a href="mailto:success@datadoghq.com">success@datadoghq.com</a> to request this feature.
</div>

## はじめに

Datadog's Live Processes gives you real-time visibility into the processes running on your infrastructure. Use Live Processes to:

* 実行中のプロセスを１か所で表示する
* ホストやコンテナのリソース消費をプロセスレベルで分類します
* 特定のホストや特定のゾーンで実行中のプロセスや、特定のワークロードを実行するプロセスのクエリ
* システムメトリクスを使用して、実行する内部およびサードパーティーソフトウェアのパフォーマンスを 2 秒の粒度でモニターします
* ダッシュボードとノートブックにコンテキストを追加します

{{< img src="infrastructure/process/live_processes_main.png" alt="ライブプロセスの概要" >}}

## Installation

Agent 5 の場合は、[こちらのバージョン固有のインストール手順に従ってください][1]。Agent 6 または 7 をご利用の場合は、[以下の手順を参照してください][2]。

{{< tabs >}}
{{% tab "Linux/Windows" %}}

Datadog Agent をインストールしたら、[Agent のメイン構成ファイル][1]を編集し、次のパラメーターを `true` に設定して、ライブプロセスの収集を有効にします。

```yaml
process_config:
  process_collection:
    enabled: true
```

さらに、いくつかの構成オプションを環境変数として設定できます。

**注**: 環境変数として設定されたオプションは、構成ファイルで定義されている設定を上書きします。

設定が完了したら、[Agent を再起動][2]します。


[1]: /ja/agent/configuration/agent-configuration-files/
[2]: /ja/agent/configuration/agent-commands/#restart-the-agent
{{% /tab %}}
{{% tab "Docker" %}}

[Docker Agent][1] の手順に従って、必要に応じて他のカスタム設定に加えて、以下の属性を渡します。

```text
-v /etc/passwd:/etc/passwd:ro
-e DD_PROCESS_CONFIG_PROCESS_COLLECTION_ENABLED=true
```

**注**:

- 標準インストールでコンテナ情報を収集するには、`dd-agent` ユーザーが `docker.sock` へのアクセス許可を持つ必要があります。
- 引き続き、Agent をコンテナとして実行してホストプロセスを収集することもできます。


[1]: /ja/agent/docker/#run-the-docker-agent
{{% /tab %}}
{{% tab "Helm" %}}

Update your [datadog-values.yaml][1] file with the following process collection configuration:

```yaml
datadog:
    # (...)
    processAgent:
        enabled: true
        processCollection: true
```

Then, upgrade your Helm chart:

```shell
helm upgrade -f datadog-values.yaml <RELEASE_NAME> datadog/datadog
```

**Note**: Running the Agent as a container still allows you to collect host processes.

[1]: https://github.com/DataDog/helm-charts/blob/master/charts/datadog/values.yaml
{{% /tab %}}
{{% tab "Datadog Operator" %}}

In your `datadog-agent.yaml`, set `features.liveProcessCollection.enabled` to `true`.

```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  global:
    credentials:
      apiKey: <DATADOG_API_KEY>

  features:
    liveProcessCollection:
      enabled: true
```

{{% k8s-operator-redeploy %}}

**Note**: Running the Agent as a container still allows you to collect host processes.

{{% /tab %}}
{{% tab "Kubernetes (Manual)" %}}

In the `datadog-agent.yaml` manifest used to create the DaemonSet, add the following environmental variables, volume mount, and volume:

```yaml
 env:
    - name: DD_PROCESS_CONFIG_PROCESS_COLLECTION_ENABLED
      value: "true"
  volumeMounts:
    - name: passwd
      mountPath: /etc/passwd
      readOnly: true
  volumes:
    - hostPath:
        path: /etc/passwd
      name: passwd
```

See the standard [DaemonSet installation][1] and the [Docker Agent][2] information pages for further documentation.

**Note**: Running the Agent as a container still allows you to collect host processes.

[1]: /ja/containers/guide/kubernetes_daemonset
[2]: /ja/agent/docker/#run-the-docker-agent
{{% /tab %}}
{{% tab "AWS ECS Fargate" %}}

<div class="alert alert-warning">You can view your ECS Fargate processes in Datadog. To see their relationship to ECS Fargate containers, use the Datadog Agent v7.50.0 or later.</div>

In order to collect processes, the Datadog Agent must be running as a container within the task.

To enable process monitoring in ECS Fargate, set the `DD_PROCESS_AGENT_PROCESS_COLLECTION_ENABLED` environment variable to `true` in the Datadog Agent container definition within the task definition.

For example:

```json
{
    "taskDefinitionArn": "...",
    "containerDefinitions": [
        {
            "name": "datadog-agent",
            "image": "public.ecr.aws/datadog/agent:latest",
            ...
            "environment": [
                {
                    "name": "DD_PROCESS_AGENT_PROCESS_COLLECTION_ENABLED",
                    "value": "true"
                }
                ...
             ]
         ...
         }
    ]
  ...
}
```

To start collecting process information in ECS Fargate, add the [`PidMode` parameter][3] to the Task Definition and set it to `task` as follows:

```text
"pidMode": "task"
```

Once enabled, use the `AWS Fargate` Containers facet on the [Live Processes page][1] to filter processes by ECS, or enter `fargate:ecs` in the search query.

{{< img src="infrastructure/process/fargate_ecs.png" alt="Processes in AWS Fargate" >}}

For more information about installing the Datadog Agent with AWS ECS Fargate, see the [ECS Fargate integration documentation][2].

[1]: https://app.datadoghq.com/process
[2]: /ja/integrations/ecs_fargate/#installation
[3]: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/task_definition_parameters.html#other_task_definition_params

{{% /tab %}}
{{< /tabs >}}

### I/O stats

I/O and open files stats can be collected by the Datadog system-probe, which runs with elevated privileges. To enable the process module of the system-probe, use the following configuration:

1. Copy the system-probe example configuration:

   ```shell
   sudo -u dd-agent install -m 0640 /etc/datadog-agent/system-probe.yaml.example /etc/datadog-agent/system-probe.yaml
   ```

2. Edit `/etc/datadog-agent/system-probe.yaml` to enable the process module:

   ```yaml
   system_probe_config:
     process_config:
       enabled: true
   ```

5. [Restart the Agent][12]:

   ```shell
   sudo systemctl restart datadog-agent
   ```

   **Note**: If the `systemctl` command is not available on your system, run the following command instead: `sudo service datadog-agent restart`


### Process arguments scrubbing

In order to hide sensitive data on the Live Processes page, the Agent scrubs sensitive arguments from the process command line. This feature is enabled by default and any process argument that matches one of the following words has its value hidden.

```text
"password", "passwd", "mysql_pwd", "access_token", "auth_token", "api_key", "apikey", "secret", "credentials", "stripetoken"
```

**Note**: The matching is **case insensitive**.

{{< tabs >}}
{{% tab "Linux/Windows" %}}

Define your own list to be merged with the default one, using the `custom_sensitive_words` field in `datadog.yaml` file under the `process_config` section. Use wildcards (`*`) to define your own matching scope. However, a single wildcard (`'*'`) is not supported as a sensitive word.

```yaml
process_config:
    scrub_args: true
    custom_sensitive_words: ['personal_key', '*token', 'sql*', '*pass*d*']
```

**Note**: Words in `custom_sensitive_words` must contain only alphanumeric characters, underscores, or wildcards (`'*'`). A wildcard-only sensitive word is not supported.

The next image shows one process on the Live Processes page whose arguments have been hidden by using the configuration above.

{{< img src="infrastructure/process/process_arg_scrubbing.png" alt="Process arguments scrubbing" style="width:100%;">}}

Set `scrub_args` to `false` to completely disable the process arguments scrubbing.

You can also scrub **all** arguments from processes by enabling the `strip_proc_arguments` flag in your `datadog.yaml` configuration file:

```yaml
process_config:
    strip_proc_arguments: true
```

{{% /tab %}}

{{% tab "Helm" %}}

You can use the Helm chart to define your own list, which is merged with the default one. Add the environment variables `DD_SCRUB_ARGS` and `DD_CUSTOM_SENSITIVE_WORDS` to your `datadog-values.yaml` file, and upgrade your Datadog Helm chart:

```yaml
datadog:
    # (...)
    processAgent:
        enabled: true
        processCollection: true
    agents:
        containers:
            processAgent:
                env:
                - name: DD_SCRUB_ARGS
                  value: "true"
                - name: DD_CUSTOM_SENSITIVE_WORDS
                  value: "personal_key,*token,*token,sql*,*pass*d*"
```


Use wildcards (`*`) to define your own matching scope. However, a single wildcard (`'*'`) is not supported as a sensitive word.

Set `DD_SCRUB_ARGS` to `false` to completely disable the process arguments scrubbing.

Alternatively, you can scrub **all** arguments from processes by enabling the `DD_STRIP_PROCESS_ARGS` variable in your `datadog-values.yaml` file:

```yaml
datadog:
    # (...)
    processAgent:
        enabled: true
        processCollection: true
agents:
    containers:
        processAgent:
            env:
            - name: DD_STRIP_PROCESS_ARGS
              value: "true"
```

{{% /tab %}}
{{< /tabs >}}


## Queries

### Scoping processes

Processes are, by nature, extremely high cardinality objects. To refine your scope to view relevant processes, you can use text and tag filters.

#### Text filters

When you input a text string into the search bar, fuzzy string search is used to query processes containing that text string in their command lines or paths. Enter a string of two or more characters to see results. Below is Datadog's demo environment, filtered with the string `postgres /9.`.

**Note**: `/9.` has matched in the command path, and `postgres` matches the command itself.

{{< img src="infrastructure/process/postgres.png" alt="Postgres" style="width:80%;">}}

To combine multiple string searches into a complex query, use any of the following Boolean operators:

`AND`
: **Intersection**: both terms are in the selected events (if nothing is added, AND is taken by default)<br> **Example**: `java AND elasticsearch`

`OR`
: **Union**: either term is contained in the selected events <br> **Example**: `java OR python`

`NOT` / `!`
: **Exclusion**: the following term is NOT in the event. You may use the word `NOT` or `!` character to perform the same operation<br> **Example**: `java NOT elasticsearch` or `java !elasticsearch`

Use parentheses to group operators together. For example, `(NOT (elasticsearch OR kafka) java) OR python` .

#### Tag filters

You can also filter your processes using Datadog [tags][3], such as `host`, `pod`, `user`, and `service`. Input tag filters directly into the search bar, or select them in the facet panel on the left of the page.

Datadog automatically generates a `command` tag, so that you can filter for:

- Third-party software, for example: `command:mongod`, `command:nginx`
- Container management software, for example:  `command:docker`, `command:kubelet`)
- Common workloads, for example:  `command:ssh`, `command:CRON`)

### Aggregating processes

[Tagging][3] enhances navigation. In addition to all existing host-level tags, processes are tagged by `user`.

Furthermore, processes in ECS containers are also tagged by:

- `task_name`
- `task_version`
- `ecs_cluster`

Processes in Kubernetes containers are tagged by:

- `pod_name`
- `kube_pod_ip`
- `kube_service`
- `kube_namespace`
- `kube_replica_set`
- `kube_daemon_set`
- `kube_job`
- `kube_deployment`
- `Kube_cluster`

If you have configuration for [Unified Service Tagging][4] in place, `env`, `service`, and `version` are picked up automatically.
Having these tags available lets you tie together APM, logs, metrics, and process data.
**Note**: This setup applies to containerized environments only.

## Scatter plot

Use the scatter plot analytic to compare two metrics with one another in order to better understand the performance of your containers.

To access the scatter plot analytic [in the Processes page][5] click on the _Show Summary graph_ button the select the "Scatter Plot" tab:

{{< img src="infrastructure/process/scatterplot_selection.png" alt="Scatter plot selection" style="width:60%;">}}

By default, the graph groups by the `command` tag key. The size of each dot represents the number of processes in that group, and clicking on a dot displays the individual pids and containers that contribute to the group.

The query at the top of the scatter plot analytic allows you to control your scatter plot analytic:

- Selection of metrics to display.
- Selection of the aggregation method for both metrics.
- Selection of the scale of both X and Y axis (_Linear_/_Log_).

{{< img src="infrastructure/process/scatterplot.png" alt="Container inspect" style="width:80%;">}}

## Process monitors

Use the [Live Process Monitor][6] to generate alerts based on the count of any group of processes across hosts or tags. You can configure process alerts in the [Monitors page][7]. To learn more, see the [Live Process Monitor documentation][6].

{{< img src="infrastructure/process/process_monitor.png" alt="Process Monitor" style="width:80%;">}}

## Processes in dashboards and notebooks

You can graph process metrics in dashboards and notebooks using the [Timeseries widget][8]. To configure:
1. Select Processes as a data source
2. Filter using text strings in the search bar
3. Select a process metric to graph
4. Filter using tags in the `From` field

{{< img src="infrastructure/process/process_widget.png" alt="Processes widget" style="width:80%;">}}

## Monitoring third-party software

### Autodetected integrations

Datadog uses process collection to autodetect the technologies running on your hosts. This identifies Datadog integrations that can help you monitor these technologies. These auto-detected integrations are displayed in the [Integrations search][1]:

{{< img src="getting_started/integrations/ad_integrations.png" alt="Autodetected integrations" >}}

Each integration has one of two status types:

- **+ Detected**: This integration is not enabled on any host(s) running it.
- **✓ Partial Visibility**: This integration is enabled on some, but not all relevant hosts are running it.

Hosts that are running the integration, but where the integration is not enabled, can be found in the **Hosts** tab of the integrations tile.

### Integration views

{{< img src="infrastructure/process/integration_views.png" alt="Integration Views" >}}

After a third-party software has been detected, Live Processes helps to analyze the performance of that software.
1. To start, click on *Views* at the top right of the page to open a list of pre-set options, including Nginx, Redis, and Kafka.
2. Select a view to scope the page to only the processes running that software.
3. When inspecting a heavy process, shift to the *Integration Metrics* tab to analyze the health of the software on the underlying host. If you have already enabled the relevant Datadog integration, you can view all performance metrics collected from the integration to distinguish between a host-level and software-level issue. For instance, seeing correlated spikes in process CPU and MySQL query latency may indicate that an intensive operation, such as a full table scan, is delaying the execution of other MySQL queries relying on the same underlying resources.

You can customize integration views (for example, when aggregating a query for Nginx processes by host) and other custom queries by clicking the *+Save* button at the top of the page. This saves your query, table column selections, and visualization settings. Create saved views for quick access to the processes you care about without addition configuration, and to share process data with your teammates.

## Processes across the platform

### Live containers

Live Processes adds extra visibility to your container deployments by monitoring the processes running on each of your containers. Click on a container in the [Live Containers][9] page to view its process tree, including the commands it is running and their resource consumption. Use this data alongside other container metrics to determine the root cause of failing containers or deployments.

### APM

In [APM Traces][10], you can click on a service's span to see the processes running on its underlying infrastructure. A service's span processes are correlated with the hosts or pods on which the service runs at the time of the request. Analyze process metrics such as CPU and RSS memory alongside code-level errors to distinguish between application-specific and wider infrastructure issues. Clicking on a process brings you to the Live Processes page. Related processes are not supported for serverless and browser traces.

### Network Performance Monitoring

When you inspect a dependency in the [Network Analytics][11] page, you can view processes running on the underlying infrastructure of the endpoints such as services communicating with one another. Use process metadata to determine whether poor network connectivity (indicated by a high number of TCP retransmits) or high network call latency (indicated by high TCP round-trip time) could be due to heavy workloads consuming those endpoints' resources, and thus, affecting the health and efficiency of their communication.

## Real-time monitoring

Processes are normally collected at 10s resolution. While actively working with the Live Processes page, metrics are collected at 2s resolution and displayed in real time, which is important for volatile metrics such as CPU. However, for historical context, metrics are ingested at the default 10s resolution.

## Additional information

- Real-time (2s) data collection is turned off after 30 minutes. To resume real-time collection, refresh the page.
- In container deployments, the `/etc/passwd` file mounted into the `docker-dd-agent` is necessary to collect usernames for each process. This is a public file and the Process Agent does not use any fields except the username. All features except the `user` metadata field function without access to this file. **Note**: Live Processes only uses the host `passwd` file and does not perform username resolution for users created within containers.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/agent/faq/agent-5-process-collection/
[2]: /ja/agent/
[3]: /ja/getting_started/tagging/
[4]: /ja/getting_started/tagging/unified_service_tagging
[5]: https://app.datadoghq.com/process
[6]: /ja/monitors/types/process/
[7]: https://app.datadoghq.com/monitors#create/live_process
[8]: /ja/dashboards/widgets/timeseries/#pagetitle
[9]: /ja/infrastructure/livecontainers/
[10]: /ja/tracing/
[11]: /ja/network_monitoring/performance/network_analytics
[12]: /ja/agent/configuration/agent-commands/#restart-the-agent