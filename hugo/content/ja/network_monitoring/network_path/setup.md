---
description: Network Path のセットアップ
further_reading:
- link: https://www.datadoghq.com/blog/datadog-network-path-monitoring/
  tag: ブログ
  text: Network Path とSD-WAN モニタリングを使用してエンドツーエンドでネットワークを可視化
- link: /network_monitoring/cloud_network_monitoring/guide/detecting_application_availability/
  tag: ガイド
  text: アプリケーションの可用性をネットワークインサイトで検知する
- link: /network_monitoring/network_path/guide/traceroute_variants/
  tag: ガイド
  text: Network Path の traceroute のバリエーション
is_beta: true
title: セットアップ
---
## 概要 {#overview}

Network Path のセットアップには、サービスとエンドポイントの間のネットワークルートを監視およびトレースするための環境の構成が含まれます。これは、ネットワークインフラストラクチャーにおけるボトルネック、レイテンシーの問題、および潜在的な障害点を特定するのに役立ちます。Network Path では、ニーズに応じて、個々のネットワークパスを手動で構成するか、自動的に検出するか、両方の方法を同時に使用することができます。

**注**: ネットワーク構成でアウトバウンドトラフィックを制限している場合は、[Agent プロキシの構成][2]ドキュメントのセットアップ手順に従ってください。

## セットアップ {#setup}

<div class="alert alert-info">このページでは、Network Monitoring における Agent ベースの構成のための Network Path のセットアップについて説明します。Synthetic Monitoring で Network Path テストを作成するには、<a href="/synthetics/network_path_tests/">Synthetic Monitoring の Network Path テスト</a>を参照してください。</div>

Datadog には、Agent ベースの収集方法が 2 つあります。いずれかの方法を単独で使用することも、両方を組み合わせて使用することもできます。

| 方法 | 用途 |
|--------|-------------|
| **[スケジュールテスト](#scheduled-tests)** | Agent 構成で定義した特定の送信元と宛先のペアを監視します。重要な API やパートナーサービスなど、既知のエンドポイントのセットを追跡するのに最適です。|
| **[動的テスト](#dynamic-tests)** | [Cloud Network Monitoring][1] によって観測されたトラフィックに基づいて、パスを自動的に検出して監視します。それぞれの宛先を手動でリストせずに広範な可視性を得るのに最適です。|

### スケジュールテスト {#scheduled-tests}

特定のネットワークパスを Agent 構成ファイルで定義することで監視できます。ファイルは `/etc/datadog-agent/conf.d/network_path.d/conf.yaml` にあります。

開始するには、[構成例][5]をコピーして `.example` 拡張子を削除し、希望の設定で更新するか、下記の環境固有の構成のいずれかを使用します。大規模な環境でのパフォーマンス最適化については、[ワーカーの数を増やす](#increase-the-number-of-workers)を参照してください。

{{< tabs >}}
{{% tab "Linux" %}}

Agent `v7.59+` が必要です。

1. `/etc/datadog-agent/system-probe.yaml` で次の内容を追加して `system-probe` traceroute モジュールを有効にします。

   ```
   traceroute:
     enabled: true
   ```

2. この Agent で新しい宛先を監視するために、`/etc/datadog-agent/conf.d/network_path.d/conf.yaml` ファイルを作成または編集して `network_path` を有効にします。

   ```yaml
   init_config:
     min_collection_interval: 60 # in seconds, default 60 seconds
   instances:
     # configure the endpoints you want to monitor, one check instance per endpoint
     # warning: Do not set the port when using UDP. Setting the port when using UDP can cause traceroute calls to fail and falsely report an unreachable destination.

     - hostname: api.datadoghq.eu # endpoint hostname or IP
       protocol: TCP
       port: 443
       tags:
         - "tag_key:tag_value"
         - "tag_key2:tag_value2"
       min_collection_interval: 120 # set min_collection_interval at the instance level
     ## optional configs:
     # max_ttl: 30 # max traceroute TTL, default is 30
     # timeout: 1000 # timeout in milliseconds per hop, default is 1s
     # tcp_method: syn # TCP probing method, default is syn, options: syn, sack, prefer_sack
     # traceroute_queries: 3 # number of traceroutes to send per check run, default is 3
     # e2e_queries: 50 # number of end-to-end probes to send per check run, default is 50

     # more endpoints
     - hostname: 1.1.1.1 # endpoint hostname or IP
       protocol: UDP
       tags:
         - "tag_key:tag_value"
         - "tag_key2:tag_value2"

    ```

3. これらの構成を変更した後、Agent を再起動します。ネットワークパスが表示されるようになります。

{{% /tab %}}
{{% tab "macOS" %}}

Agent `v7.75+` が必要です。

1. `/opt/datadog-agent/etc/system-probe.yaml` で次の内容を追加して `system-probe` traceroute モジュールを有効にします。

   ```
   traceroute:
     enabled: true
   ```

2. この Agent で新しい宛先を監視するために、`/opt/datadog-agent/etc/conf.d/network_path.d/conf.yaml` ファイルを作成または編集して `network_path` を有効にします。

   ```yaml
   init_config:
     min_collection_interval: 60 # in seconds, default 60 seconds
   instances:
     # configure the endpoints you want to monitor, one check instance per endpoint
     # warning: Do not set the port when using UDP. Setting the port when using UDP can cause traceroute calls to fail and falsely report an unreachable destination.

     - hostname: api.datadoghq.eu # endpoint hostname or IP
       protocol: TCP
       port: 443
       tags:
         - "tag_key:tag_value"
         - "tag_key2:tag_value2"
       min_collection_interval: 120 # set min_collection_interval at the instance level
     ## optional configs:
     # max_ttl: 30 # max traceroute TTL, default is 30
     # timeout: 1000 # timeout in milliseconds per hop, default is 1s
     # tcp_method: syn # TCP probing method, default is syn, options: syn, sack, prefer_sack
     # traceroute_queries: 3 # number of traceroutes to send per check run, default is 3
     # e2e_queries: 50 # number of end-to-end probes to send per check run, default is 50

     # more endpoints
     - hostname: 1.1.1.1 # endpoint hostname or IP
       protocol: UDP
       tags:
         - "tag_key:tag_value"
         - "tag_key2:tag_value2"

    ```

3. これらの構成を変更した後、Agent を再起動します。ネットワークパスが表示されるようになります。

{{% /tab %}}
{{% tab "Windows" %}}

Agent `v7.72+` が必要です。

1. `%ProgramData%\Datadog\system-probe.yaml` で次の内容を追加して `system-probe` traceroute モジュールを有効にします。

   ```
   traceroute:
     enabled: true
   ```

2. この Agent で新しい宛先を監視するために、`%ProgramData%\Datadog\conf.d\network_path.d\conf.yaml` ファイルを作成または編集して `network_path` を有効にします。

   ```yaml
   init_config:
     min_collection_interval: 60 # in seconds, default 60 seconds
   instances:
     # configure the endpoints you want to monitor, one check instance per endpoint
     # warning: Do not set the port when using UDP. Setting the port when using UDP can cause traceroute calls to fail and falsely report an unreachable destination.

     - hostname: api.datadoghq.eu # endpoint hostname or IP
       protocol: TCP
       port: 443
       tags:
         - "tag_key:tag_value"
         - "tag_key2:tag_value2"
       min_collection_interval: 120 # set min_collection_interval at the instance level
     ## optional configs:
     # max_ttl: 30 # max traceroute TTL, default is 30
     # timeout: 1000 # timeout in milliseconds per hop, default is 1s
     # tcp_method: syn # TCP probing method, default is syn, options: syn, sack, prefer_sack, syn_socket (Windows only)
     # traceroute_queries: 3 # number of traceroutes to send per check run, default is 3
     # e2e_queries: 50 # number of end-to-end probes to send per check run, default is 50

     # more endpoints
     - hostname: 1.1.1.1 # endpoint hostname or IP
       protocol: TCP
       tags:
         - "tag_key:tag_value"
         - "tag_key2:tag_value2"
    ```

  3. これらの構成を変更した後、Agent を再起動します。ネットワークパスが表示されるようになります。

{{% /tab %}}
{{% tab "Helm" %}}

Agent `v7.59+` が必要です。

<div class="alert alert-info">Helm Chart v3.109.1 以降が必要です。詳細については、<a href="https://github.com/DataDog/helm-charts/blob/main/charts/datadog/README.md">Datadog Helm チャートのドキュメント</a>および <a href="https://docs.datadoghq.com/containers/kubernetes/integrations/?tab=helm#configuration">Kubernetes とインテグレーション</a>のドキュメントを参照してください。</div>

Kubernetes で Helm を使用して Network Path を有効にするには、`values.yaml` ファイルに次の内容を追加します。

  ```yaml
  datadog:
    traceroute:
      enabled: true
    confd:
      network_path.yaml: |-
        init_config:
          min_collection_interval: 60 # in seconds, default 60 seconds
        instances:
          # configure the endpoints you want to monitor, one check instance per endpoint
          # warning: Do not set the port when using UDP. Setting the port when using UDP can cause traceroute calls to fail and falsely report an unreachable destination.

          - hostname: api.datadoghq.eu # endpoint hostname or IP
            protocol: TCP
            port: 443
            tags:
              - "tag_key:tag_value"
              - "tag_key2:tag_value2"
            min_collection_interval: 120 # set min_collection_interval at the instance level
          ## optional configs:
          # max_ttl: 30 # max traceroute TTL, default is 30
          # timeout: 1000 # timeout in milliseconds per hop, default is 1s
          # tcp_method: syn # TCP probing method, default is syn, options: syn, sack, prefer_sack
          # traceroute_queries: 3 # number of traceroutes to send per check run, default is 3
          # e2e_queries: 50 # number of end-to-end probes to send per check run, default is 50

          # more endpoints
          - hostname: 1.1.1.1 # endpoint hostname or IP
            protocol: UDP
            tags:
              - "tag_key:tag_value"
              - "tag_key2:tag_value2"

```

{{% /tab %}}
{{% tab "Autodiscovery (Kubernetes)" %}}
Datadog Autodiscovery allows you to enable Network Path on a per-service basis through Kubernetes annotations. 

<div class="alert alert-info">Helm chart v3.109.1+ is required. For more information, see the <a href="https://github.com/DataDog/helm-charts/blob/main/charts/datadog/README.md">Datadog Helm Chart documentation</a>.</div>

1. Enable the traceroute module in the Datadog `values.yaml` file, which the Network Path integration depends on.

   ```yaml
   datadog:
     traceroute:
       enabled: true
   ```

2. After the module is enabled, Datadog automatically detects Network Path annotations added to your Kubernetes pod. For more information, see [Kubernetes and Integrations][2].

   ```yaml
   apiVersion: v1
   kind: Pod
   # (...)
   metadata:
     name: '<POD_NAME>'
     annotations:
       ad.datadoghq.com/<CONTAINER_NAME>.checks: |
         {
           "network_path": {
             "init_config": {
               "min_collection_interval": 300
             },
             "instances": [
                   {
                     "protocol": "TCP",
                     "port": 443,
                     "source_service": "<CONTAINER_NAME>",
                     "tags": [
                       "tag_key:tag_value",
                       "tag_key2:tag_value2"
                     ],
                     "hostname": "api.datadoghq.eu"
                   },
                   {
                     "protocol": "UDP",
                     "source_service": "<CONTAINER_NAME>",
                     "tags": [
                       "tag_key:tag_value",
                       "tag_key2:tag_value2"
                     ],
                     "hostname": "1.1.1.1"
                   },
             ]
           }
         }
       # (...)
   spec:
     containers:
       - name: '<CONTAINER_NAME>'
   # (...)
   ```
    If you define pods indirectly (with deployments, ReplicaSets, or ReplicationControllers), add pod annotations under `spec.template.metadata`.

[1]: https://github.com/DataDog/helm-charts/blob/master/charts/datadog/README.md#enabling-system-probe-collection
[2]: https://docs.datadoghq.com/ja/containers/kubernetes/integrations/?tab=annotations#configuration

{{% /tab %}}
{{< /tabs >}}

#### Increase the number of workers 

Network Path monitoring for individual paths runs as an Agent Integration. The number of concurrent workers is controlled by the `check_runners` setting in the `datadog.yaml` file.

To increase the number of workers, add the following configuration to your `datadog.yaml` file:

```yaml
## @param check_runners - integer - optional - default: 4
## @env DD_CHECK_RUNNERS - integer - optional - default: 4
## The `check_runners` refers to the number of concurrent check runners available for check instance execution.
## The scheduler attempts to spread the instances over the collection interval and will _at most_ be
## running the number of check runners instances concurrently.
##
## The level of concurrency has effects on the Agent's: RSS memory, CPU load, resource contention overhead, etc.
#
check_runners: <NUMBER_OF_WORKERS>
```

### Dynamic tests 

**Prerequisites**: [CNM][1] must be enabled.

Configure dynamic tests to allow the Agent to automatically discover and monitor network paths based on actual network traffic, eliminating the need to manually configure individual endpoints. See [filter syntax](#filter-syntax) to include/exclude domain or IPs.

{{< tabs >}}
{{% tab "Linux" %}}

Agent `v7.73+` が必要です。

1. `/etc/datadog-agent/system-probe.yaml` で次の内容を追加して `system-probe` traceroute モジュールを有効にします。

   ```yaml
   traceroute:
     enabled: true
   ```

2. CNM の接続を監視するために、`/etc/datadog-agent/datadog.yaml` ファイルを作成または編集して `network_path` を有効にします。

    ```yaml
    network_path:
      connections_monitoring:
        enabled: true
      # collector:
        # workers: <NUMBER OF WORKERS> # default 4
    ```

    For full configuration details, reference the [example config][3], or use the following:

    ```yaml
    network_path:
      connections_monitoring:
        ## @param enabled - bool - required - default:false
        ## Enable network path collection
        #
        enabled: true
      collector:
        ## @param workers - int - optional - default:4
        ## Number of workers that can collect paths in parallel
        ## Recommendation: leave at default
        #
        # workers: <NUMBER OF WORKERS> # default 4

        #@env DD_NETWORK_PATH_COLLECTOR_PATHTEST_INTERVAL - integer - optional - default: 10m
        # The `pathtest_interval` refers to the traceroute run interval for monitored connections.
        # pathtest_interval: 10m

        # @param pathtest_ttl - integer - optional - default: 35m
        # @env DD_NETWORK_PATH_COLLECTOR_PATHTEST_TTL - integer - optional - default: 35m
        # The `pathtest_ttl` refers to the duration (time-to-live) a connection will be monitored when it's not seen anymore.
        # The TTL is reset each time the connection is seen again.
        # pathtest_ttl: 35m

        ## @param filters - list - optional
        ## Include or exclude specific domains or IP ranges from dynamic monitoring.
        ## Filters are applied sequentially, with later filters taking precedence.
        ## See the "Filter syntax" section for details and examples: https://docs.datadoghq.com/network_monitoring/network_path/setup/#filter-syntax
        #
        # filters:
        #   - match_domain: '*.example.com'
        #     type: exclude
        #   - match_ip: 10.0.0.0/8
        #     type: exclude
        #   - match_domain: 'api.datadoghq.com'
        #     type: include

    ```

3. これらの構成を変更した後、Agent を再起動します。ネットワークパスが表示されるようになります。

[3]: https://github.com/DataDog/datadog-agent/blob/2c8d60b901f81768f44a798444af43ae8d338843/pkg/config/config_template.yaml#L1731

{{% /tab %}}
{{% tab "Windows" %}}

Agent `v7.73+` が必要です。

1. `%ProgramData%\Datadog\system-probe.yaml` で次の内容を追加して `system-probe` traceroute モジュールを有効にします。

   ```yaml
   traceroute:
     enabled: true
   ```

2. CNM の接続を監視するために、`%ProgramData%\Datadog\datadog.yaml` ファイルを作成または編集して `network_path` を有効にします。

    ```yaml
    network_path:
      connections_monitoring:
        enabled: true
      # collector:
        # workers: <NUMBER OF WORKERS> # default 4
    ```

    For full configuration details, reference the [example config][3], or use the following:

    ```yaml
    network_path:
      connections_monitoring:
        ## @param enabled - bool - required - default:false
        ## Enable network path collection
        #
        enabled: true
      collector:
        ## @param workers - int - optional - default:4
        ## Number of workers that can collect paths in parallel
        ## Recommendation: leave at default
        #
        # workers: <NUMBER OF WORKERS> # default 4

        #@env DD_NETWORK_PATH_COLLECTOR_PATHTEST_INTERVAL - integer - optional - default: 10m
        # The `pathtest_interval` refers to the traceroute run interval for monitored connections.
        # pathtest_interval: 10m

        # @param pathtest_ttl - integer - optional - default: 35m
        # @env DD_NETWORK_PATH_COLLECTOR_PATHTEST_TTL - integer - optional - default: 35m
        # The `pathtest_ttl` refers to the duration (time-to-live) a connection will be monitored when it's not seen anymore.
        # The TTL is reset each time the connection is seen again.
        # pathtest_ttl: 35m

        ## @param filters - list - optional
        ## Include or exclude specific domains or IP ranges from dynamic monitoring.
        ## Filters are applied sequentially, with later filters taking precedence.
        ## See the "Filter syntax" section for details and examples: https://docs.datadoghq.com/network_monitoring/network_path/setup/#filter-syntax
        #
        # filters:
        #   - match_domain: '*.example.com'
        #     type: exclude
        #   - match_ip: 10.0.0.0/8
        #     type: exclude
        #   - match_domain: 'api.datadoghq.com'
        #     type: include
    ```

3. これらの構成を変更した後、Agent を再起動します。ネットワークパスが表示されるようになります。

[3]: https://github.com/DataDog/datadog-agent/blob/2c8d60b901f81768f44a798444af43ae8d338843/pkg/config/config_template.yaml#L1731

{{% /tab %}}
{{% tab "Helm" %}}

Agent `v7.73+` が必要です。

Kubernetes で Helm を使用して Network Path を有効にするには、`values.yaml` ファイルに次の内容を追加します。
**注:** Helm Chart v3.124.0 以降が必要です。詳細については、[Datadog Helm チャートのドキュメント][1]および [Kubernetes とインテグレーション][2]のドキュメントを参照してください。

```yaml
datadog:
  networkPath:
    connectionsMonitoring:
      enabled: true
  ## Set to true to enable the Traceroute Module of the System Probe
  traceroute:
    enabled: true

  ## @param collector - custom object - optional
  ## Configuration related to Network Path Collector.
  #
  collector:
    ## @param workers - integer - optional - default: 4
    ## @env DD_WORKERS - integer - optional - default: 4
    ## The `workers` refers to the number of concurrent workers available for network path execution.
    #
    # workers: 4
    
    ## @param pathtest_interval - integer - optional - default: 35m
    ## @env DD_NETWORK_PATH_COLLECTOR_PATHTEST_INTERVAL - integer - optional - default: 30m
    ## The `pathtest_interval` refers to the traceroute run interval for monitored connections.
    #
    # pathtest_interval: 30m

    ## @param pathtest_ttl - integer - optional - default: 35m
    ## @env DD_NETWORK_PATH_COLLECTOR_PATHTEST_TTL - integer - optional - default: 35m
    ## The `pathtest_ttl` refers to the duration (time-to-live) a connection will be monitored when it's not seen anymore.
    ## The TTL is reset each time the connection is seen again.
    #
    # pathtest_ttl: 35m

    ## @param filters - list - optional
    ## Include or exclude specific domains or IP ranges from dynamic monitoring.
    ## Filters are applied sequentially, with later filters taking precedence.
    ## See the "Filter syntax" section for details and examples: https://docs.datadoghq.com/network_monitoring/network_path/setup/#filter-syntax
    #
    # filters:
    #   - match_domain: '*.example.com'
    #     type: exclude
    #   - match_ip: 10.0.0.0/8
    #     type: exclude
    #   - match_domain: 'api.datadoghq.com'
    #     type: include

```
[1]: https://github.com/DataDog/helm-charts/blob/main/charts/datadog/README.md
[2]: https://docs.datadoghq.com/ja/containers/kubernetes/integrations/?tab=helm#configuration


{{% /tab %}}
{{< /tabs >}}

#### フィルター構文 {#filter-syntax}

ドメインや IP を含めたり除外したりするフィルターを構成します。次のことが可能になります:

- 内部ネットワークの監視オーバーヘッドを削減する
- 外部トラフィックパターンに焦点を当てる
- 監視が不要な既知のインフラストラクチャー範囲を除外する

動的テストから特定のドメインや IP 範囲を含めたり除外したりするには、`/etc/datadog-agent/datadog.yaml` ファイルに次の内容を追加します。

```yaml
network_path:
  connections_monitoring:
    enabled: true
  collector:
    filters:
      # exclude single domain
      - match_domain: 'api.slack.com'
        type: exclude

      # exclude domain using `*` wildcard
      - match_domain: '*.datadoghq.com'      # this translates to regex '.*\.datadoghq\.com
        type: exclude
      - match_domain: '*.zoom.us'
        match_domain_strategy: wildcard      # use simple wildcard matching (wildcard matching is the default)
        type: exclude

      # exclude single IP or using CIDR notation
      - match_ip: 10.10.10.10
        type: exclude
      - match_ip: 10.20.0.0/24
        type: exclude

      # exclude using regex
      - match_domain: '.*\.zoom\.us'
        match_domain_strategy: regex         # use regex matching strategy
        type: exclude

      # include
      - match_domain: 'api.datadoghq.com'
        type: include
```

**注**:
フィルターは順番に適用され、後のフィルターが前のフィルターより優先されます。

たとえば、`*.datadoghq.com` に一致するドメインは `api.datadoghq.com` を除いてすべて無視されます。

```yaml
network_path:
  collector:
    filters:
      - match_domain: '*.datadoghq.com'
        type: exclude
      - match_domain: 'api.datadoghq.com'
        type: include
```

### 送信元パブリック IP の解決 {#source-public-ip-resolution}

<div class="alert alert-info">Agent v7.75 以降では、送信元パブリック IP の解決が可能です。</div>

Network Path は、送信元ホストのパブリック IP アドレスを解決し、インターネット向けトラフィックの正確なパスを可視化します。Agent は、送信元のパブリック IP を特定するために、HTTPS 経由で外部 IP チェックサービスに接続します。

この機能は、Network Path が機能するために**必須ではありません**。これらのサービスにアクセスできない場合でも、Network Path は通常どおり動作しますが、送信元のパブリック IP は解決されず、パスの可視化で送信元 IP メタデータが表示されません。

ネットワークでアウトバウンドトラフィックが制限されている場合に送信元のパブリック IP の解決を行うには、次の URL をファイアウォールの許可リストに追加してください。

| URL | プロバイダー |
|-----|----------|
| `https://icanhazip.com` | Cloudflare |
| `https://ipinfo.io/ip` | IPinfo |
| `https://checkip.amazonaws.com` | Amazon |
| `https://api.ipify.org` | ipify |
| `https://whatismyip.akamai.com` | Akamai |

Agent は、各サービスを順番に試し、最初に成功した応答を使用します。リクエストはすべて HTTPS (ポート 443) 経由で行われます。

## トラブルシューティング {#troubleshooting}

Network Path の問題のトラブルシューティングには、次のガイドラインを使用してください。さらにサポートが必要な場合は、[Datadog サポート][3]にお問い合わせください。

### Network Path のデータが UI に表示されない {#no-network-path-data-in-the-ui}

[Network Path][4] UI にデータが表示されない場合、機能が完全に有効になっていない可能性があります。Network Path には、次のものが必要です。

1. traceroute モジュールが `system-probe.yaml` ファイルで有効になっている必要があります。

   ```yaml
   traceroute:
     enabled: true
   ```

2. Network Path の機能が少なくとも 1 つはアクティブになっている必要があります。次に例を示します。

   - [個々のパス](#monitor-individual-paths)が `conf.d/network_path.d` ファイルで構成されている。
   - 試験的な[ネットワークトラフィックパス](#network-traffic-paths-experimental)が `network_path.connections_monitoring` と [Cloud Network Monitoring][1](CNM) の両方を有効にすることで構成されている。

### エラー: ステータスコード: 404 {#error-status-code-404}

次のようなエラーが発生した場合:

   ```text
   Error: failed to trace path: traceroute request failed: Probe Path <path>, url: <url>, status code: 404
   ```

   - これは、traceroute モジュールが有効になっていないことを示しています。traceroute モジュールが `system-probe.yaml` ファイルで有効になっていることを確認してください。



## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/network_monitoring/cloud_network_monitoring/setup/
[2]: https://docs.datadoghq.com/ja/agent/configuration/proxy/?tab=linux
[3]: /ja/help
[4]: https://app.datadoghq.com/network/path
[5]: https://github.com/DataDog/datadog-agent/blob/main/cmd/agent/dist/conf.d/network_path.d/conf.yaml.example
[15]: /ja/synthetics/network_path_tests/