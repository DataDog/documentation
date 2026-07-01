---
description: Network Path 설정
further_reading:
- link: https://www.datadoghq.com/blog/datadog-network-path-monitoring/
  tag: 블로그
  text: Network Path 및 SD-WAN 모니터링을 통해 종단 간 네트워크 가시성을 확보하세요.
- link: /network_monitoring/cloud_network_monitoring/guide/detecting_application_availability/
  tag: 가이드
  text: Network Insights를 사용해 애플리케이션 가용성 감지
- link: /network_monitoring/network_path/guide/traceroute_variants/
  tag: 가이드
  text: Network Path 트레이스라우트 변형
is_beta: true
title: 설정
---
## 개요 {#overview}

Network Path 설정은 서비스와 엔드포인트 간의 Network Path를 모니터링하고 추적하기 위해 환경을 구성하는 것을 포함합니다. 네트워크 인프라의 병목 현상, 지연 문제 및 잠재적인 실패 지점을 식별하는 데 도움이 됩니다. Network Path를 사용하면 필요에 따라 개별 Network Path를 수동으로 구성하거나 자동으로 발견하거나 두 가지 방법을 동시에 사용할 수 있습니다.

**참고**: 네트워크 구성에서 아웃바운드 트래픽이 제한되는 경우, [Agent proxy configuration][2] 문서의 설정 지침을 따르세요.

## 설정 {#setup}

<div class="alert alert-info">이 페이지는 Network Monitoring에서 Agent 기반 구성에 대한 Network Path 설정을 다룹니다. Synthetic Monitoring에서 Network Path 테스트를 생성하려면 <a href="/synthetics/network_path_tests/">Network Path Testing in Synthetic Monitoring</a>.</div>

Datadog은 두 가지 Agent 기반 수집 방법을 제공합니다. 각 방법을 단독으로 사용하거나 두 가지를 결합할 수 있습니다.

| 방법 | 사용 시기 |
|--------|-------------|
| **[예약된 테스트](#scheduled-tests)** | Agent 구성에서 정의한 특정 소스-대상 쌍을 모니터링합니다. 중요한 API 또는 파트너 서비스와 같은 알려진 엔드포인트 집합을 추적하는 데 가장 적합합니다. |
| **[동적&nbsp;테스트](#dynamic-tests)** | 는 [Cloud Network Monitoring][1]에서 관찰된 트래픽을 기반으로 경로를 자동으로 발견하고 모니터링합니다. 모든 대상을 수동으로 나열하지 않고도 넓은 가시성을 확보하는 데 가장 적합합니다. |

### 예약된 테스트 {#scheduled-tests}

Agent 구성 파일에 정의하여 특정 네트워크 경로를 모니터링할 수 있습니다. 파일은 `/etc/datadog-agent/conf.d/network_path.d/conf.yaml`에 위치합니다.

시작하려면 [예제 구성][5]을 복사하고 `.example` 확장자를 제거한 후 원하는 설정으로 업데이트하거나 아래의 환경별 구성 중 하나를 사용하세요. 대규모 환경에서 성능 최적화를 위해 [작업자 수 늘리기](#increase-the-number-of-workers)를 참조하세요.

{{< tabs >}}
{{% tab "Linux" %}}

Agent `v7.59+`가 필요합니다.

1. 다음 내용을 추가하여 `/etc/datadog-agent/system-probe.yaml`에서 `system-probe` 트레이스라우트 모듈을 활성화합니다.

   ```
   traceroute:
     enabled: true
   ```

2. `network_path`를 활성화하여 이 Agent에서 새로운 목적지를 모니터링하려면 `/etc/datadog-agent/conf.d/network_path.d/conf.yaml` 파일을 생성하거나 편집하세요.

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

3. 구성을 변경한 후 네트워크 경로가 확인되도록 Agent를 재시작합니다.

{{% /tab %}}
{{% tab "macOS" %}}

Agent `v7.75+`가 필요합니다.

1. 다음 내용을 추가하여 `/opt/datadog-agent/etc/system-probe.yaml`에서 `system-probe` 트레이스라우트 모듈을 활성화합니다.

   ```
   traceroute:
     enabled: true
   ```

2. `network_path`를 활성화하여 이 Agent에서 새로운 목적지를 모니터링하려면 `/opt/datadog-agent/etc/conf.d/network_path.d/conf.yaml` 파일을 생성하거나 편집하세요.

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

3. 구성을 변경한 후 네트워크 경로가 확인되도록 Agent를 재시작합니다.

{{% /tab %}}
{{% tab "Windows" %}}

Agent `v7.72+`가 필요합니다.

1. 다음 내용을 추가하여 `%ProgramData%\Datadog\system-probe.yaml`에서 `system-probe` 트레이스라우트 모듈을 활성화합니다.

   ```
   traceroute:
     enabled: true
   ```

2. `network_path`를 활성화하여 이 Agent에서 새로운 목적지를 모니터링하려면 `%ProgramData%\Datadog\conf.d\network_path.d\conf.yaml` 파일을 생성하거나 편집하세요.

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

  3. 구성을 변경한 후 네트워크 경로가 확인되도록 Agent를 재시작합니다.

{{% /tab %}}
{{% tab "Helm" %}}

Agent `v7.59+`가 필요합니다.

<div class="alert alert-info">Helm chart v3.109.1+가 필요합니다. <a href="https://github.com/DataDog/helm-charts/blob/main/charts/datadog/README.md">Datadog Helm Chart 문서</a>와 <a href="https://docs.datadoghq.com/containers/kubernetes/integrations/?tab=helm#configuration">Kubernetes 및 Integrations에 대한 문서를 참조하세요.</a></div>

Helm을 사용하여 Kubernetes와 함께 Network Path를 활성화하려면 `values.yaml` 파일에 다음 내용을 추가하세요.

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
[2]: https://docs.datadoghq.com/ko/containers/kubernetes/integrations/?tab=annotations#configuration

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

Agent `v7.73+`가 필요합니다.

1. 다음 내용을 추가하여 `/etc/datadog-agent/system-probe.yaml`에서 `system-probe` 트레이스라우트 모듈을 활성화합니다.

   ```yaml
   traceroute:
     enabled: true
   ```

2. `network_path`를 활성화하여 CNM 연결을 모니터링하려면 `/etc/datadog-agent/datadog.yaml` 파일을 생성하거나 편집하세요.

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

3. 구성을 변경한 후 네트워크 경로가 확인되도록 Agent를 재시작합니다.

[3]: https://github.com/DataDog/datadog-agent/blob/2c8d60b901f81768f44a798444af43ae8d338843/pkg/config/config_template.yaml#L1731

{{% /tab %}}
{{% tab "Windows" %}}

Agent `v7.73+`가 필요합니다.

1. 다음 내용을 추가하여 `%ProgramData%\Datadog\system-probe.yaml`에서 `system-probe` 트레이스라우트 모듈을 활성화합니다.

   ```yaml
   traceroute:
     enabled: true
   ```

2. `network_path`를 활성화하여 CNM 연결을 모니터링하려면 `%ProgramData%\Datadog\datadog.yaml` 파일을 생성하거나 편집하세요.

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

3. 구성을 변경한 후 네트워크 경로가 확인되도록 Agent를 재시작합니다.

[3]: https://github.com/DataDog/datadog-agent/blob/2c8d60b901f81768f44a798444af43ae8d338843/pkg/config/config_template.yaml#L1731

{{% /tab %}}
{{% tab "Helm" %}}

Agent `v7.73+`가 필요합니다.

Helm을 사용하여 Kubernetes와 함께 Network Path를 활성화하려면 `values.yaml` 파일에 다음 내용을 추가하세요.
**참고:** Helm chart v3.124.0+가 필요합니다. 자세한 정보는 [Datadog Helm Chart documentation][1]와 [Kubernetes and Integrations][2]에 대한 문서를 참조하세요.

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
[2]: https://docs.datadoghq.com/ko/containers/kubernetes/integrations/?tab=helm#configuration


{{% /tab %}}
{{< /tabs >}}

#### 필터 구문 {#filter-syntax}

도메인 및 IP를 포함하거나 제외하도록 필터를 구성하여 다음을 수행할 수 있습니다.

- 내부 네트워크의 모니터링 오버헤드를 줄입니다
- 외부 트래픽 패턴에 집중합니다
- 모니터링이 필요하지 않은 알려진 인프라 범위를 제외합니다

동적 테스트에서 특정 도메인이나 IP 범위를 포함하거나 제외하려면 `/etc/datadog-agent/datadog.yaml` 파일에 다음 내용을 추가하세요.

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

**참고**: 
필터는 순차적으로 적용되며, 나중의 필터가 이전의 필터보다 우선합니다.

예를 들어, `*.datadoghq.com`와 일치하는 모든 도메인은 무시되며, `api.datadoghq.com`는 제외됩니다.

```yaml
network_path:
  collector:
    filters:
      - match_domain: '*.datadoghq.com'
        type: exclude
      - match_domain: 'api.datadoghq.com'
        type: include
```

### 소스 공용 IP 해상도 {#source-public-ip-resolution}

<div class="alert alert-info">소스 공용 IP 해상도는 Agent v7.75+에서 사용할 수 있습니다.</div>

Network Path는 소스 호스트의 공용 IP 주소를 확인하여 인터넷으로 향하는 트래픽에 대한 정확한 경로 시각화를 제공합니다. Agent는 호스트의 공용 IP를 확인하기 위해 HTTPS를 통해 외부 IP 확인 서비스에 연락합니다.

이 기능은 Network Path가 작동하는 데 **필요하지 않습니다**. 이 서비스에 접근할 수 없는 경우에도 Network Path는 정상적으로 작동하지만, 소스 공용 IP가 확인되지 않으며 경로 시각화에 소스 IP 메타데이터가 표시되지 않습니다.

네트워크가 아웃바운드 트래픽을 제한하고 소스 공용 IP 해상도가 필요한 경우, 다음 URL을 방화벽 허용 목록에 추가하세요.

| URL | 제공자 |
|-----|----------|
| `https://icanhazip.com` | Cloudflare |
| `https://ipinfo.io/ip` | IPinfo |
| `https://checkip.amazonaws.com` | Amazon |
| `https://api.ipify.org` | ipify |
| `https://whatismyip.akamai.com` | Akamai |

Agent는 각 서비스를 순서대로 시도하고 첫 번째 성공적인 응답을 사용합니다. 모든 요청은 HTTPS(포트 443)를 통해 이루어집니다.

## 문제 해결 {#troubleshooting}

Network Path 문제를 해결하기 위해 다음 지침을 사용하세요. 추가 지원이 필요하면 [Datadog 지원][3]에 문의하세요.

### UI에 Network Path 데이터가 없음 {#no-network-path-data-in-the-ui}

[Network Path][4] UI에 데이터가 나타나지 않으면 기능이 완전히 활성화되지 않았을 수 있습니다. Network Path는 다음을 요구합니다.

1. 트레이스라우트 모듈은 `system-probe.yaml` 파일에서 활성화되어야 합니다.

   ```yaml
   traceroute:
     enabled: true
   ```

2. 다음과 같은 최소 하나의 Network Path 기능이 활성화되어야 합니다.

   - [개별 경로](#monitor-individual-paths)는 `conf.d/network_path.d` 파일을 통해 구성됩니다.
   - 실험적인 [네트워크 트래픽 경로](#network-traffic-paths-experimental)는 `network_path.connections_monitoring`과 [Cloud Network Monitoring][1](CNM)을 활성화하여 구성됩니다.

### 오류: 상태 코드: 404 {#error-status-code-404}

다음과 같은 오류가 발생하는 경우

   ```text
   Error: failed to trace path: traceroute request failed: Probe Path <path>, url: <url>, status code: 404
   ```

   - 이는 트레이스라우트 모듈이 활성화되지 않았음을 나타냅니다. `system-probe.yaml` 파일에서 트레이스라우트 모듈이 활성화되어 있는지 확인하세요.



## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/network_monitoring/cloud_network_monitoring/setup/
[2]: https://docs.datadoghq.com/ko/agent/configuration/proxy/?tab=linux
[3]: /ko/help
[4]: https://app.datadoghq.com/network/path
[5]: https://github.com/DataDog/datadog-agent/blob/main/cmd/agent/dist/conf.d/network_path.d/conf.yaml.example
[15]: /ko/synthetics/network_path_tests/