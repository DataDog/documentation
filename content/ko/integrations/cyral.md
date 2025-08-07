---
app_id: cyral
categories:
- 데이터 저장소
- security
custom_kind: 통합
description: Cyral 인스턴스 모니터링 MySQL에서 런타임 메트릭 수집
integration_version: 0.1.0
media: []
supported_os:
- linux
title: Cyral
---
## 개요

This check monitors a [Cyral](https://cyral.com/) MySQL sidecar through the Datadog Agent.

## 설정

The Cyral check is not included in the [Datadog Agent](https://app.datadoghq.com/account/settings/agent/latest) package, so you need to install it.

### 설치

For Agent v7.21+ / v6.21+, follow the instructions below to install the Cyral check on your host. See [Use Community Integrations](https://docs.datadoghq.com/agent/guide/use-community-integrations/) to install with the Docker Agent or earlier versions of the Agent.

1. 다음 명령어를 실행해 에이전트 통합을 설치하세요.

   ```shell
   datadog-agent integration install -t datadog-cyral==<INTEGRATION_VERSION>
   ```

1. Configure your integration similar to core [integrations](https://docs.datadoghq.com/getting_started/integrations/).

### 설정

1. Edit the `cyral.d/conf.yaml` file, in the `conf.d/` folder at the root of your Agent's configuration directory to start collecting your cyral performance data. See the [sample cyral.d/conf.yaml](https://github.com/DataDog/integrations-extras/blob/master/cyral/datadog_checks/cyral/data/conf.yaml.example) for all available configuration options.

   ```yaml
   init_config:

   instances:
    # url of the metrics endpoint of prometheus
    - prometheus_url: http://localhost:9018/metrics
   ```

1. [Agent를 다시 시작합니다](https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent).

### 검증

[Run the Agent's status subcommand](https://docs.datadoghq.com/agent/guide/agent-commands/#agent-status-and-information) and look for `cyral` under the Checks section.

## 수집한 데이터

### Metrics

| | |
| --- | --- |
| **cyral.analysis_time** <br>(count) | Time spent in just doing analysis<br>_Shown as millisecond_ |
| **cyral.authentication_failure_count** <br>(count) | The number of authentication failures|
| **cyral.catalog_query_count** <br>(count) | |
| **cyral.closed_client_conns_count** <br>(count) | |
| **cyral.closed_listeners_count** <br>(count) | |
| **cyral.high_latency_query_count** <br>(count) | Number of queries exceeding (configurable) threshold|
| **cyral.open_client_conns_count** <br>(count) | |
| **cyral.open_listeners_count** <br>(count) | |
| **cyral.policy_eval_time** <br>(count) | |
| **cyral.policy_eval_time_counter** <br>(count) | |
| **cyral.policy_violation_count** <br>(count) | The number of queries with policy violations|
| **cyral.portscan_count** <br>(count) | The number of detected portscan attempts|
| **cyral.queries_with_errors** <br>(count) | |
| **cyral.query_duration_count** <br>(count) | Number of increments to query_duration|
| **cyral.query_duration_sum** <br>(count) | The total duration of queries in milliseconds|
| **cyral.repo_dial_errors_count** <br>(count) | |
| **cyral.row_count** <br>(count) | The number of rows per query|
| **cyral.sql_parse_time** <br>(count) | Time spent doing parsing in milliseconds|
| **cyral.sql_parse_time_counter** <br>(count) | Number of increments to sql_parse_time|
| **cyral.storage_watch_events_count** <br>(count) | |
| **cyral.wire_dial_errors_count** <br>(count) | |
| **cyral.wire_parse_duration** <br>(count) | |
| **cyral.wire_parse_duration_increments** <br>(count) | |

### 서비스 점검

Cyral에는 서비스 점검이 포함되어 있지 않습니다.

### 이벤트

Cyral에는 이벤트가 포함되어 있지 않습니다.

## 트러블슈팅

### 에이전트 연결 불가

```text
    cyral
    -------
      - instance #0 [ERROR]: "('Connection aborted.', error(111, 'Connection refused'))"
      - Collected 0 metrics, 0 events & 0 service check
```

`cyral.yaml` 내의 `url`이 올바른지 확인하세요.

도움이 필요하세요? [Datadog 지원 팀](https://docs.datadoghq.com/help/)에 문의하세요.