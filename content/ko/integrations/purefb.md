---
app_id: purefb
categories:
- 데이터 저장소
- OS & 시스템
custom_kind: 통합
description: Pure Storage FlashBlade 성능과 활용률을 모니터링하세요.
integration_version: 2.0.1
media:
- caption: Pure Storage FlashBlade 대시보드 - 개요 (상단)
  image_url: images/FB-overview-1.png
  media_type: image
- caption: Pure Storage FlashBlade 대시보드 - 개요 (중앙)
  image_url: images/FB-overview-2.png
  media_type: image
- caption: Pure Storage FlashBlade 대시보드 - 개요 (하단)
  image_url: images/FB-overview-3.png
  media_type: image
supported_os:
- linux
- 윈도우즈(Windows)
- macos
title: Pure Storage FlashBlade
---
## 개요

This check monitors the [Pure Storage FlashBlade](https://www.purestorage.com/products.html) through the [Datadog Agent](https://app.datadoghq.com/account/settings/agent/latest) and the [Pure Storage FlashBlade OpenMetrics exporter](https://github.com/PureStorage-OpenConnect/pure-fb-openmetrics-exporter).

본 통합으로 어레이, 클라이언트, 공유 및 버킷 레벨의 성능 데이터와 높은 수준의 용량 및 설정 정보를 제공합니다.

다중 FlashBlades를 모니터링하고 단일 대시보드에 통합하거나 고객이 정의한 환경에 따라 그룹화할 수 있습니다.

**이 통합에는 다음이 필요합니다.**

- FlashBlade Purity 4.1.x+
- OpenMetricsBaseCheckV2를 활용하기 위한 Datadog 에이전트 v7.26.x 이상
- Python 3
- The Pure Storage FlashBlade OpenMetrics exporter v1.0.11+ is installed and running in a containerized environment. Refer to the [Pure Storage GitHub repo](https://github.com/PureStorage-OpenConnect/pure-fb-openmetrics-exporter) for installation instructions.

## 설정

Follow the instructions below to install and configure this check for an Agent running on a host. For containerized environments, see the [Autodiscovery Integration Templates](https://docs.datadoghq.com/agent/kubernetes/integrations/) for guidance on applying these instructions.

### 설치

1. [Download and launch the Datadog Agent](https://app.datadoghq.com/account/settings/agent/latest).
1. Manually install the Pure FlashBlade integration. See [Use Community Integrations](https://docs.datadoghq.com/agent/guide/community-integrations-installation-with-docker-agent) for more details based on your environment.

#### 호스트

호스트에서 실행되는 에이전트에 대한 점검을 설정하려면 `datadog-agent integration install -t datadog-purefb==2.0.0`을 실행하세요.

### 설정

1. FlashBlade에 읽기 전용 역할로 사용자를 생성하고 이 사용자에 대한 API 토큰을 생성합니다.

1. Add the following configuration block to the `purefb.d/conf.yaml` file, in the `conf.d/` folder at the root of your Agent's configuration directory, to start collecting your PureFB performance data. See the sample [purefb.d/conf.yaml](https://github.com/DataDog/integrations-extras/blob/master/purefb/data/conf.yaml.example) for all available configuration options.

**참고**: 설정 파일을 만들 때 `/array` 엔드포인트는 반드시 필요합니다.

```yaml
init_config:
   timeout: 120

instances:

  - openmetrics_endpoint: http://<exporter_ip_or_fqdn>:<port>/metrics/array?endpoint=<array_ip_or_fqdn>
    tags:
       - env:<env>
       - fb_array_name:<full_fqdn>
       - host:<full_fqdn>
    headers:
       Authorization: Bearer <api_token>
    min_collection_interval: 120

  - openmetrics_endpoint: http://<exporter_ip_or_fqdn>:<port>/metrics/clients?endpoint=<array_ip_or_fqdn>
    tags:
       - env:<env>
       - fb_array_name:<full_fqdn>
       - host:<full_fqdn>
    headers:
       Authorization: Bearer <api_token>
    min_collection_interval: 600

  - openmetrics_endpoint: http://<exporter_ip_or_fqdn>:<port>/metrics/usage?endpoint=<array_ip_or_fqdn>
    tags:
       - env:<env>
       - fb_array_name:<full_fqdn>
       - host:<full_fqdn>
    headers:
       Authorization: Bearer <api_token>
    min_collection_interval: 600

```

2. [Agent를 다시 시작합니다](https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent).

### 검증

[Run the Agent's status subcommand](https://docs.datadoghq.com/agent/guide/agent-commands/#agent-status-and-information) and look for `purefb` under the Checks section.

### 트러블슈팅

#### 배열은 대시보드에 표시되지 않습니다.

본 통합에 포함된 대시보드는 태그 `env` , `host`, `fb_array_name`을 사용합니다. 인스턴스별로 설정되어 있는지 확인하세요.

```yaml
 tags:
    - env:<env>
    - fb_array_name:<full_fqdn>
    - host:<full_fqdn>
```

#### 수집 간격 늘리기

`/array` 엔드포인트에 대해 Pure Storage FlashBlade 점검은 기본적으로 `min_collection_interval`을 `120`으로 설정하며, 최소 권장값은 `15`입니다. 필요한 경우 `purefb.d/conf.yaml` 파일에서 `min_collection_interval`를 늘리거나 줄일 수 있습니다.

```yaml
min_collection_interval: 120
```

`/clients` 및 `/usage` 엔드포인트에 대해 Pure Storage FlashBlade 점검은 기본적으로 `min_collection_interval`을 `600`으로 설정하며, 최소 권장값은 `120`입니다. 필요한 경우 `purefb.d/conf.yaml` 파일에서 `min_collection_interval`를 늘리거나 줄일 수 있습니다.

```yaml
min_collection_interval: 600
```

## 수집한 데이터

### Metrics

| | |
| --- | --- |
| **purefb.alerts.open** <br>(gauge) | Open alert events|
| **purefb.array.http_specific_performance_latency_usec** <br>(gauge) | FlashBlade array HTTP specific latency<br>_Shown as microsecond_ |
| **purefb.array.http_specific_performance_throughput_iops** <br>(gauge) | FlashBlade array HTTP specific throughput<br>_Shown as operation_ |
| **purefb.array.nfs_specific_performance_latency_usec** <br>(gauge) | FlashBlade array NFS latency<br>_Shown as microsecond_ |
| **purefb.array.nfs_specific_performance_throughput_iops** <br>(gauge) | FlashBlade array NFS throughput<br>_Shown as operation_ |
| **purefb.array.performance_average_bytes** <br>(gauge) | FlashBlade array average operations size<br>_Shown as byte_ |
| **purefb.array.performance_bandwidth_bytes** <br>(gauge) | FlashBlade array bandwidth<br>_Shown as byte_ |
| **purefb.array.performance_latency_usec** <br>(gauge) | FlashBlade array latency<br>_Shown as microsecond_ |
| **purefb.array.performance_replication** <br>(gauge) | FlashBlade array replication throughput in bytes per second<br>_Shown as byte_ |
| **purefb.array.performance_throughput_iops** <br>(gauge) | FlashBlade array throughput<br>_Shown as operation_ |
| **purefb.array.s3_specific_performance_latency_usec** <br>(gauge) | FlashBlade array S3 specific latency<br>_Shown as microsecond_ |
| **purefb.array.s3_specific_performance_throughput_iops** <br>(gauge) | FlashBlade array S3 specific throughput<br>_Shown as operation_ |
| **purefb.array.space_bytes** <br>(gauge) | FlashBlade space in bytes<br>_Shown as byte_ |
| **purefb.array.space_data_reduction_ratio** <br>(gauge) | FlashBlade space data reduction|
| **purefb.array.space_parity** <br>(gauge) | FlashBlade space parity|
| **purefb.array.space_utilization** <br>(gauge) | FlashBlade array space utilization in percent<br>_Shown as percent_ |
| **purefb.buckets.object_count** <br>(gauge) | FlashBlade buckets object count|
| **purefb.buckets.performance_average_bytes** <br>(gauge) | FlashBlade buckets average operations size<br>_Shown as byte_ |
| **purefb.buckets.performance_bandwidth_bytes** <br>(gauge) | FlashBlade buckets bandwidth<br>_Shown as byte_ |
| **purefb.buckets.performance_latency_usec** <br>(gauge) | FlashBlade buckets latency<br>_Shown as microsecond_ |
| **purefb.buckets.performance_throughput_iops** <br>(gauge) | FlashBlade buckets throughput<br>_Shown as operation_ |
| **purefb.buckets.quota_space_bytes** <br>(gauge) | FlashBlade buckets quota space in bytes<br>_Shown as byte_ |
| **purefb.buckets.s3_specific_performance_latency_usec** <br>(gauge) | FlashBlade buckets S3 specific latency<br>_Shown as microsecond_ |
| **purefb.buckets.s3_specific_performance_throughput_iops** <br>(gauge) | FlashBlade buckets S3 specific throughput<br>_Shown as operation_ |
| **purefb.buckets.space_bytes** <br>(gauge) | FlashBlade buckets space in bytes<br>_Shown as byte_ |
| **purefb.buckets.space_data_reduction_ratio** <br>(gauge) | FlashBlade buckets space data reduction|
| **purefb.clients.performance_average_bytes** <br>(gauge) | FlashBlade array clients average operations size<br>_Shown as byte_ |
| **purefb.clients.performance_bandwidth_bytes** <br>(gauge) | FlashBlade array clients bandwidth<br>_Shown as byte_ |
| **purefb.clients.performance_latency_usec** <br>(gauge) | FlashBlade array clients latency<br>_Shown as microsecond_ |
| **purefb.clients.performance_throughput_iops** <br>(gauge) | FlashBlade array clients throughput<br>_Shown as operation_ |
| **purefb.file.system_usage_groups_bytes** <br>(gauge) | FlashBlade file system groups usage<br>_Shown as byte_ |
| **purefb.file.system_usage_users_bytes** <br>(gauge) | FlashBlade file system users usage<br>_Shown as byte_ |
| **purefb.file.systems_performance_average_bytes** <br>(gauge) | FlashBlade filesystems average operations size<br>_Shown as byte_ |
| **purefb.file.systems_performance_bandwidth_bytes** <br>(gauge) | FlashBlade filesystems bandwidth<br>_Shown as byte_ |
| **purefb.file.systems_performance_latency_usec** <br>(gauge) | FlashBlade filesystems latency<br>_Shown as microsecond_ |
| **purefb.file.systems_performance_throughput_iops** <br>(gauge) | FlashBlade filesystems throughput<br>_Shown as operation_ |
| **purefb.file.systems_space_bytes** <br>(gauge) | FlashBlade file systems space in bytes<br>_Shown as byte_ |
| **purefb.file.systems_space_data_reduction_ratio** <br>(gauge) | FlashBlade file systems space data reduction|
| **purefb.hardware.connectors_performance_bandwidth_bytes** <br>(gauge) | FlashBlade hardware connectors performance bandwidth<br>_Shown as byte_ |
| **purefb.hardware.connectors_performance_errors** <br>(gauge) | FlashBlade hardware connectors performance errors per sec|
| **purefb.hardware.connectors_performance_throughput_pkts** <br>(gauge) | FlashBlade hardware connectors performance throughputh|
| **purefb.hardware.health** <br>(gauge) | FlashBlade hardware component health status|
| **purefb.info** <br>(gauge) | FlashBlade system information|
| **purefb.nfs.export_rule** <br>(gauge) | FlashBlade NFS export rules|

### 이벤트

PureFB 통합에는 이벤트가 포함되어 있지 않습니다.

### 서비스 점검

**purefb.openmetrics.health**

Returns `CRITICAL` if the Agent is unable to connect to the FlashBlade OpenMetrics endpoint, otherwise returns `OK`.

_상태: ok, critical_

## 지원

지원 또는 기능 요청이 필요한 경우, 다음 방법을 통해 Pure Storage에 문의하세요.

- 이메일: pure-observability@purestorage.com
- Slack: [Pure Storage Code// Observability Channel](https://code-purestorage.slack.com/messages/C0357KLR1EU).