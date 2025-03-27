---
app_id: rabbitmq
app_uuid: a10b582b-71ef-4773-b7b8-b7751c724620
assets:
  dashboards:
    rabbitmq: assets/dashboards/rabbitmq_dashboard.json
    rabbitmq_screenboard: assets/dashboards/rabbitmq_screenboard_dashboard.json
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: true
    metrics:
      check: rabbitmq.queue.messages
      metadata_path: metadata.csv
      prefix: rabbitmq.
    process_signatures:
    - rabbitmq
    - rabbitmq-server
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 51
    source_type_name: RabbitMQ
  monitors:
    Disk space is low: assets/monitors/disk_usage_prometheus.json
    Level of disk usage is too high for host: assets/monitors/disk_usage.json
    Messages are ready in RabbitMQ queue: assets/monitors/message_ready.json
    Messages unacknowledged rate is higher than usual: assets/monitors/message_unacknowledge_rate_anomaly.json
    RabbitMQ queue has 0 consumers: assets/monitors/consumers_at_zero.json
    Unacknowledged Messages are higher than usual: assets/monitors/message_unack_prometheus.json
  saved_views:
    pid_overview: assets/saved_views/status_overview.json
    rabbitmq_pattern: assets/saved_views/rabbitmq_pattern.json
    rabbitmq_processes: assets/saved_views/rabbitmq_processes.json
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- log collection
- message queues
custom_kind: 통합
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/rabbitmq/README.md
display_on_public_website: true
draft: false
git_integration_title: rabbitmq
integration_id: rabbitmq
integration_title: RabbitMQ
integration_version: 7.1.0
is_public: true
manifest_version: 2.0.0
name: rabbitmq
public_title: RabbitMQ
short_description: 대기열 크기, 소비자 수, 확인되지 않은 메시지 등을 추적하세요.
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Log Collection
  - Category::메시지 큐
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  - Offering::Integration
  - Product::데이터 스트림 모니터링
  configuration: README.md#Setup
  description: 대기열 크기, 소비자 수, 확인되지 않은 메시지 등을 추적하세요.
  media: []
  overview: README.md#Overview
  resources:
  - resource_type: blog
    url: https://www.datadoghq.com/blog/rabbitmq-monitoring
  - resource_type: blog
    url: https://www.datadoghq.com/blog/rabbitmq-monitoring-tools
  - resource_type: blog
    url: https://www.datadoghq.com/blog/monitoring-rabbitmq-performance-with-datadog
  support: README.md#Support
  title: RabbitMQ
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


![RabbitMQ 대시보드][1]

## 개요

이 점검은 Datadog Agent를 통해 [RabbitMQ][2]를 모니터링하며, 다음을 수행할 수 있습니다.

- 대기열 기반 통계를 추적합니다: 대기열 크기, 소비자 수, 확인되지 않은 메시지, 재전송된 메시지 등.
- 노드 기반 통계를 추적합니다: 대기 프로세스, 사용된 소켓, 사용된 파일 설명자 등.
- 가상 호스트의 활성 여부와 연결 수를 모니터링합니다.

## 설정

### 설치

RabbitMQ 점검은 [Datadog Agent][3] 패키지에 포함되어 있으므로 서버에 추가로 설치할 필요가 없습니다.

### 설정

RabbitMQ는 [RabbitMQ Management Plugin][4] 및 [RabbitMQ Prometheus Plugin][5] 두 가지 방법으로 메트릭을 노출합니다. Datadog 통합은 두 버전을 모두 지원합니다. 사용하려는 버전에 해당하는 파일의 구성 지침을 따르세요. Datadog 통합에는 대시보드와 모니터 제목으로 레이블이 지정된 각 버전에 대한 기본 대시보드와 모니터도 함께 제공됩니다.

#### RabbitMQ 준비

##### [RabbitMQ Prometheus Plugin][5].

*RabbitMQ v3.8부터 [RabbitMQ Prometheus Plugin][5]이 기본적으로 활성화됩니다.*

*RabbitMQ의 Prometheus Plugin 버전은 Datadog Agent의 Python 3 지원이 필요하므로 Agent v6 이상에서만 사용할 수 있습니다. 통합의 Prometheus Plugin 버전을 구성하기 전에 Agent가 업데이트되었는지 확인하세요.*

인스턴스 구성에서 `prometheus_plugin` 섹션을 구성합니다. `prometheus_plugin` 옵션을 사용할 때 Management Plugin과 관련된 설정은 무시됩니다.

 ```yaml
 instances:
   - prometheus_plugin:
       url: http://<HOST>:15692
 ```

 이를 통해 하나의 RabbitMQ 노드에서 [`/metrics` 엔드포인트][6] 스크래핑이 가능해집니다. Datadog은 [`/metrics/detailed` 엔드포인트][7]에서도 데이터를 수집할 수 있습니다.

 ```yaml
 instances:
   - prometheus_plugin:
       url: http://<HOST>:15692
       unaggregated_endpoint: detailed?family=queue_coarse_metrics
 ```
 이를 통해 [`/metrics/detailed` 엔드포인트][7] 스크래핑으로 queue coarse metrics를 수집할 수 있습니다.

##### [RabbitMQ Management Plugin][4].

플러그인을 활성화합니다. 그러면 Agent 사용자는 최소한 `monitoring` 태그와 다음 필수 권한이 ​​필요합니다.

| 권한 | 명령어            |
| ---------- | ------------------ |
| **conf**   | `^aliveness-test$` |
| **write**  | `^amq\.default$`   |
| **read**   | `.*`               |

다음 명령을 사용하여 기본 가상 호스트에 대한 Agent 사용자를 생성합니다.

```text
rabbitmqctl add_user datadog <SECRET>
rabbitmqctl set_permissions  -p / datadog "^aliveness-test$" "^amq\.default$" ".*"
rabbitmqctl set_user_tags datadog monitoring
```

여기에서 `/`는 기본 호스트를 나타냅니다. 이를 지정된 가상 호스트 이름으로 설정하세요. 자세한 내용은 [RabbitMQ 설명서][8]를 참조하세요.

{{< tabs >}}
{{% tab "호스트" %}}

#### 호스트

호스트에서 실행 중인 에이전트에 이 점검을 구성하는 방법:

##### 메트릭 수집

1. [Agent 구성 디렉토리][1]의 루트에 있는`conf.d/`  폴더에서 `rabbitmq.d/conf.yaml` 파일을 편집하여 RabbitMQ 메트릭 수집을 시작하세요. 사용 가능한 모든 구성 옵션은 [샘플 rabbitmq.d/conf.yaml][2]을 참조하세요.

    **참고**: Agent는 기본적으로 모든 대기열, 가상호스트 및 노드를 확인하지만 목록이나 정규 표현식을 제공하여 이를 제한할 수 있습니다. [rabbitmq.d/conf.yaml][2]에서 예시를 확인하세요.

2. [에이전트를 다시 시작합니다][3].

##### 로그 수집

_에이전트 버전 > 6.0에서 사용 가능_

1. 기본 로그 파일 위치를 수정하려면 `RABBITMQ_LOGS` 환경 변수를 설정하거나 다음을 RabbitMQ 구성 파일(`/etc/rabbitmq/rabbitmq.conf`)에 추가하세요.

   ```conf
     log.dir = /var/log/rabbit
     log.file = rabbit.log
   ```

2. 로그 수집은 Datadog 에이전트에서 기본적으로 비활성화되어 있습니다. `datadog.yaml` 파일에서 활성화합니다.

   ```yaml
   logs_enabled: true
   ```

3. `rabbitmq.d/conf.yaml` 파일의 `logs` 섹션을 수정하여  RabbitMQ 로그 수집을 시작하세요.

   ```yaml
   logs:
     - type: file
       path: /var/log/rabbit/*.log
       source: rabbitmq
       service: myservice
       log_processing_rules:
         - type: multi_line
           name: logs_starts_with_equal_sign
           pattern: "="
   ```

4. [에이전트를 다시 시작합니다][3].

[1]: https://docs.datadoghq.com/ko/agent/guide/agent-configuration-files/#agent-configuration-directory
[2]: https://github.com/DataDog/integrations-core/blob/master/rabbitmq/datadog_checks/rabbitmq/data/conf.yaml.example
[3]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/#start-stop-and-restart-the-agent
{{% /tab %}}
{{% tab "컨테이너화된 환경" %}}

#### 컨테이너화된 환경

Datadog의 [Docker 컨테이너 자동탐지][1]를 활용할 수 있습니다. RabbitMQ 관련 설정에 대한 예제 구성은 `auto_conf.yaml`에서 확인하세요.

Kubernetes와 같은 컨테이너 환경에서 아래와 같은 파라미터를 적용하려면 [자동탐지 통합 템플릿][2]을 참조하세요.

##### 메트릭 수집

| 파라미터            | 값                                        |
| -------------------- | -------------------------------------------- |
| `<INTEGRATION_NAME>` | `rabbitmq`                                   |
| `<INIT_CONFIG>`      | 비어 있음 또는 `{}`                                |
| `<INSTANCE_CONFIG>`  | `{"prometheus_plugin": {"url": "http://%%host%%:15692"}}` |

##### 로그 수집

_Agent v6.0 이상에서 사용 가능_

Datadog 에이전트에서 기본적으로 로그 수집이 비활성화되어 있습니다. 활성화하려면 [쿠버네티스 로그 수집]을 확인하세요.

| 파라미터      | 값                                                                                                                                               |
| -------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| `<LOG_CONFIG>` | `{"source": "rabbitmq", "service": "rabbitmq", "log_processing_rules": [{"type":"multi_line","name":"logs_starts_with_equal_sign", "pattern": "="}]}` |

[1]: https://docs.datadoghq.com/ko/containers/docker/integrations/?tab=dockeradv2
[2]: https://docs.datadoghq.com/ko/agent/kubernetes/integrations/
[3]: https://docs.datadoghq.com/ko/agent/kubernetes/log/
{{% /tab %}}
{{< /tabs >}}

### 검증

[Agent의 상태 하위 명령을 실행][9]하고 Checks 섹션에서 `rabbitmq`를 찾습니다.

## 수집한 데이터

### 메트릭
{{< get-metrics-from-git "rabbitmq" >}}


### 이벤트

### 서비스 점검
{{< get-service-checks-from-git "rabbitmq" >}}


## 트러블슈팅

### Prometheus Plugin으로 마이그레이션

Prometheus 플러그인은 Management Plugin과는 다른 메트릭 세트를 노출합니다.
Management에서 Prometheus Plugin으로 마이그레이션할 때 주의해야 할 사항은 다음과 같습니다.

- [이 표][10]에서 메트릭을 찾아보세요. 메트릭 설명에 `[OpenMetricsV2]` 태그가 포함되어 있으면 Prometheus Plugin에서 사용할 수 있습니다. Management Plugin에서만 사용할 수 있는 메트릭에는 설명에 태그가 없습니다.
- Management Plugin 메트릭을 사용하는 대시보드와 모니터는 작동하지 않습니다. *OpenMetrics Version*으로 표시된 대시보드와 모니터로 전환하세요.
- 기본 구성은 집계된 메트릭을 수집합니다. 즉, 예를 들어 대기열로 태그된 메트릭이 없습니다. `prometheus_plugin.unaggregated_endpoint` 옵션을 구성하여 집계 없이 메트릭을 가져오세요.
- `rabbitmq.status` 서비스 점검은 `rabbitmq.openmetrics.health`로 교체되었습니다. Prometheus Plugin에는 `rabbitmq.aliveness` 서비스 점검과 동일한 기능이 없습니다.

Prometheus Plugin은 일부 태그를 변경합니다. 아래 표는 보다 일반적인 태그에 대한 변경 사항을 설명합니다.

| 관리          | 프로메테우스(Prometheus)                               |
|:--------------------|:-----------------------------------------|
| `queue_name`        | `queue`                                  |
| `rabbitmq_vhost`    | `vhost`, `exchange_vhost`, `queue_vhost` |
| `rabbitmq_exchange` | `exchange`                               |

자세한 내용은 [태그 패밀리별 RabbitMQ 대기열 태그 지정][11]을 참조하세요.

도움이 필요하신가요? [Datadog 고객 지원팀][12]에 문의하세요.

## 참고 자료

기타 유용한 문서, 링크 및 기사:

- [RabbitMQ 모니터링을 위한 주요 메트릭][13]
- [RabbitMQ 모니터링 도구를 사용한 메트릭 수집][14]
- [Datadog으로 RabbitMQ 성능 모니터링][15]


[1]: https://raw.githubusercontent.com/DataDog/integrations-core/master/rabbitmq/images/rabbitmq_dashboard.png
[2]: https://www.rabbitmq.com
[3]: https://app.datadoghq.com/account/settings/agent/latest
[4]: https://www.rabbitmq.com/management.html
[5]: https://www.rabbitmq.com/prometheus.html
[6]: https://www.rabbitmq.com/prometheus.html#default-endpoint
[7]: https://www.rabbitmq.com/prometheus.html#detailed-endpoint
[8]: https://www.rabbitmq.com/rabbitmqctl.8.html#set_permissions
[9]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/#agent-status-and-information
[10]: https://docs.datadoghq.com/ko/integrations/rabbitmq/?tab=host#metrics
[11]: https://docs.datadoghq.com/ko/integrations/faq/tagging-rabbitmq-queues-by-tag-family/
[12]: https://docs.datadoghq.com/ko/help/
[13]: https://www.datadoghq.com/blog/rabbitmq-monitoring
[14]: https://www.datadoghq.com/blog/rabbitmq-monitoring-tools
[15]: https://www.datadoghq.com/blog/monitoring-rabbitmq-performance-with-datadog