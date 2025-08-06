---
app_id: puma
categories:
- 메트릭
custom_kind: 통합
description: 루비(Ruby) 및 Rack을 위한 빠른 동시 처리 웹 서버
integration_version: 1.3.0
media: []
supported_os:
- linux
- 윈도우즈(Windows)
- macos
title: Puma
---
## 개요

This check monitors [Puma](https://puma.io/) through the Datadog Agent with the Puma metrics endpoint provided by the [control and status](https://github.com/puma/puma#controlstatus-server) server.

## 설정

The Puma check is not included in the [Datadog Agent](https://app.datadoghq.com/account/settings/agent/latest) package, so you need to install it.

### 설치

For Agent v7.21+ / v6.21+, follow the instructions below to install the Puma check on your host. See [Use Community Integrations](https://docs.datadoghq.com/agent/guide/use-community-integrations/) to install with the Docker Agent or earlier versions of the Agent.

1. 다음 명령어를 실행해 에이전트 통합을 설치하세요.

   ```shell
   datadog-agent integration install -t datadog-puma==<INTEGRATION_VERSION>
   ```

1. Configure your integration similar to core [integrations](https://docs.datadoghq.com/getting_started/integrations/).

### 설정

1. Edit the `puma.d/conf.yaml` file, in the `conf.d/` folder at the root of your Agent's configuration directory to start collecting your Puma performance data. See the [sample puma.d/conf.yaml](https://github.com/DataDog/integrations-extras/blob/master/puma/datadog_checks/puma/data/conf.yaml.example) for all available configuration options.

1. [Agent를 다시 시작합니다](https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent).

### 검증

Run the [Agent's status subcommand](https://docs.datadoghq.com/agent/guide/agent-commands/#agent-status-and-information) and look for `puma` under the Checks section.

## 수집한 데이터

### Metrics

| | |
| --- | --- |
| **puma.backlog** <br>(gauge) | Pending request backlog<br>_Shown as unit_ |
| **puma.booted_workers** <br>(gauge) | Number of booted puma workers<br>_Shown as unit_ |
| **puma.busy_threads** <br>(gauge) | Number of threads that are running, including requests waiting on a thread, but excluding requests waiting for work.<br>_Shown as unit_ |
| **puma.max_threads** <br>(gauge) | Maximum threads<br>_Shown as unit_ |
| **puma.pool_capacity** <br>(gauge) | Pool capacity<br>_Shown as unit_ |
| **puma.requests_count** <br>(gauge) | Request count<br>_Shown as unit_ |
| **puma.running** <br>(gauge) | Running threads<br>_Shown as unit_ |
| **puma.workers** <br>(gauge) | Total number of puma workers<br>_Shown as unit_ |

### 이벤트

Puma는 이벤트를 포함하지 않습니다.

### 서비스 점검

**puma.connection**

Returns `CRITICAL` if the Agent is unable to connect to the monitored Puma instance. Returns `OK` otherwise.

_상태: ok, critical_

## 트러블슈팅

도움이 필요하세요? [Datadog 지원 팀](https://docs.datadoghq.com/help/)에 문의하세요.