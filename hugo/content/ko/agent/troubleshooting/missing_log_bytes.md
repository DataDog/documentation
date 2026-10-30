---
description: 파일 순환 후 보고된 읽지 않은 로그 데이터를 조사하고 Datadog Agent 로그 파이프라인의 백프레셔를 식별합니다.
further_reading:
- link: /agent/logs/log_transport/
  tag: 설명서
  text: Agent 로그 전송
- link: /agent/logs/advanced_log_collection/
  tag: 설명서
  text: 고급 로그 수집
- link: /logs/guide/mechanisms-ensure-logs-not-lost/
  tag: 가이드
  text: 로그 분실을 방지하기 위한 메커니즘
- link: /agent/troubleshooting/send_a_flare/
  tag: 설명서
  text: Agent Flare 보내기
title: 누락된 로그 바이트 문제 해결
---
## 개요 {#overview}

Datadog Agent는 애플리케이션 로그를 수집하여 Datadog으로 전송합니다. 로그를 파일에 기록하는 애플리케이션의 경우, Agent는 새 항목이 추가될 때 해당 파일을 읽습니다. 애플리케이션은 로그 파일을 주기적으로 순환하며, 파일 크기나 보관 기간이 지정된 한도에 도달하면 활성 파일을 새 파일로 교체합니다.

Agent가 순환된 파일을 끝까지 읽기 전에 중단하면 남은 데이터는 Datadog으로 전송되지 않습니다. Agent는 이를 **누락된 로그 바이트**로 보고합니다. [Log Explorer][11]에서 로그 데이터가 누락된 구간을 발견하거나 [Agent 로그 파일][10]에서 다음과 같은 경고를 확인할 수 있습니다.

```text
WARN | After rotation close timeout (60s), there were 148213 bytes remaining unread for file "/var/log/app/app.log". These unread logs are now lost. Consider increasing DD_LOGS_CONFIG_CLOSE_TIMEOUT
```

Agent는 파일 순환을 탐지한 후 `logs_config.close_timeout` 동안(기본값 60초) 해당 파일을 계속 읽습니다. 시간 제한이 만료되었을 때 읽지 않은 데이터가 남아 있으면 Agent는 파일을 닫고 위의 경고를 기록합니다.

## 가능한 원인 {#possible-causes}

백프레셔는 Agent의 로그 파이프라인에서 특정 단계가 처리 속도를 따라가지 못해 이전 단계의 처리 속도와 파일 읽기 속도가 느려질 때 발생합니다. 잦은 파일 순환이나 많은 로그 데이터로 인해 Agent가 시간 제한 내에 파일 읽기를 완료하지 못할 수도 있습니다.

- 네트워크, 프록시, 인증 또는 수집 오류로 인해 Agent가 Datadog 수집기로 페이로드를 전달할 수 없습니다.
- 네트워크 또는 수집 지연 시간으로 인해 로그 전송이 지연됩니다.
- 인코딩, 배치 처리 또는 압축으로 인해 로그 파이프라인의 처리 속도가 제한됩니다.
- 처리 규칙 또는 멀티라인 처리로 인해 로그 파이프라인이 제한됩니다.
- 로그 생성 속도가 Agent에서 사용할 수 있는 CPU 또는 네트워크 용량을 초과합니다.
- 다운스트림 파이프라인이 포화 상태가 아니더라도 Agent가 순환 주기 동안 기록된 데이터를 읽기 전에 해당 파일이 순환됩니다.

## 누락된 로그 바이트 진단 {#diagnose-missing-log-bytes}

1. [Agent 로그 파일][10]에서 파일 순환 경고를 검색합니다. 영향을 받은 파일 경로, 타임스탬프, 읽지 않은 바이트 수를 기록합니다.
2. Agent 7.82.0 이상을 사용하는 경우 [status 명령][1]을 실행하고 [Logs Agent 백프레셔 해석](#interpret-logs-agent-backpressure) 섹션을 확인합니다. 보존된 기록을 경고 타임스탬프와 비교합니다.
3. **Logs Agent Backpressure** 테이블의 여러 행이 포화 상태인 경우 `destination_reliable_N`, `worker`, `strategy`, `processor` 순서로 조사합니다. [튜닝 액션 선택](#choose-a-tuning-action) 섹션을 참고하여 해당 목록에서 첫 번째 포화 구성 요소에 적용할 다음 단계를 선택합니다.
4. 관련 변경 사항을 하나 적용한 후 실제 운영 환경을 대표하는 로그 볼륨에서 [결과 확인](#verify-the-result) 섹션에 따라 검증하고, 그다음 다른 구성 요소를 처리합니다.
5. Agent가 여전히 필요한 로그 볼륨을 처리하지 못한다면 [로그 볼륨 감소](#reduce-log-volume) 섹션을 따릅니다.

### Logs Agent 백프레셔 해석 {#interpret-logs-agent-backpressure}

Agent 7.82.0 이상 버전에서는 [status 명령][1]에 **Logs Agent 백프레셔** 섹션이 포함됩니다. 이 섹션은 프로세서, 배치 처리 전략, 전송 워커 및 대상의 최근 사용률을 보여줍니다. 최대 사용률 데이터는 약 10시간 동안, 상세 포화 지속 시간 데이터는 30분 동안 보존됩니다.

{{< code-block lang="shell" >}}sudo datadog-agent status{{< /code-block >}}

[Agent 플레어][2] 내 `status.log`에서도 해당 섹션을 확인할 수 있습니다. Agent를 재시작하면 기록이 초기화되므로 재시작하기 전에 플레어를 수집합니다.

```text
Logs Agent Backpressure
=======================

  Overall state: SATURATED
  Reason: destination_reliable_0 pipeline q0s0 is currently saturated (saturated for 3m20s in the last 30m)

  Component              Instance Current   5m avg/max    30m avg/max    2h max    5h max    10h max    30m saturated    Last saturated
  processor              0        20%       18/26%        15/41%         55%       55%       55%        0s               -
  strategy               0        14%       12/19%        13/22%         22%       22%       22%        0s               -
  worker                 q0s0     46%       43/63%        27/63%         63%       63%       63%        0s               -
  destination_reliable_0 q0s0     93%       82/93%        71/93%         93%       93%       93%        3m20s            12:09:42
```

`destination_reliable_0`이 포화 상태이므로 프로세서 또는 배치 처리 설정을 변경하기 전에 [전송 오류 해결](#resolve-delivery-errors) 섹션을 따릅니다.

#### 전체 상태 {#overall-state}

| 상태 | 의미 |
| --- | --- |
| `HEALTHY` | 포화된 구성 요소가 없으며 지난 30분 동안 포화된 구성 요소도 없습니다. |
| `WARNING` | 포화된 구성 요소는 없지만 지난 30분 동안 최소 하나 이상의 구성 요소가 포화되었습니다. `Last saturated`를 누락된 바이트 경고의 타임스탬프와 비교합니다. |
| `SATURATED` | 현재 15초 구간에서 하나 이상의 구성 요소가 포화 임계값에 도달했습니다. |

포화 상태란 구성 요소가 샘플링 시간 중 90% 이상을 대기하지 않고 작업을 처리하는 데 사용했음을 의미합니다. 파일 순환 경고로 데이터 손실을 확인하고 테이블에서 가능한 병목 원인을 파악합니다.

#### 표 열 {#table-columns}

| 열 | 의미 |
| --- | --- |
| `Component` | 로그 파이프라인 단계입니다. [튜닝 액션 선택](#choose-a-tuning-action) 섹션을 참조하세요. |
| `Instance` | 파이프라인 또는 대상 인스턴스입니다. |
| `Current` | 약 15초 구간에 걸쳐 평활화한 사용률입니다. |
| `5m avg/max` 및 `30m avg/max` | 지정된 시간 구간의 평균 및 최대 사용률입니다. |
| `2h max`, `5h max` 및 `10h max` | 지정된 시간 구간의 최대 사용률입니다. |
| `30m saturated` | 지난 30분 동안 사용률이 90% 이상이었던 시간입니다. |
| `Last saturated` | 가장 최근에 보존된 포화 상태 샘플의 타임스탬프입니다. `-`는 보존된 샘플이 없음을 의미합니다. |

## Agent의 순환된 파일 읽기 시간 연장 {#give-the-agent-more-time-to-read-rotated-files}

Agent가 순환된 파일을 끝까지 읽는 데 기본값인 60초보다 더 많은 시간이 필요한 경우 `logs_config.close_timeout` 값을 늘립니다. 180초 시간 제한을 사용하려면 다음 단계를 따르세요.

{{< tabs >}}
{{% tab "구성 파일" %}}

{{< code-block lang="yaml" filename="datadog.yaml" >}}
logs_config:
  close_timeout: 180
{{< /code-block >}}

{{% /tab %}}
{{% tab "환경 변수" %}}

```shell
DD_LOGS_CONFIG_CLOSE_TIMEOUT=180
```

{{% /tab %}}
{{< /tabs >}}

시간 제한을 변경한 후 실제 운영 환경을 대표하는 로그 볼륨에서 [Agent 로그 파일][10]에 새로운 파일 순환 경고가 있는지 검색합니다. 경고가 계속되면 시간 제한을 다시 늘리거나 [튜닝 액션 선택](#choose-a-tuning-action) 섹션을 참고하여 포화된 구성 요소에 적용할 액션을 선택합니다. 시간 제한이 길어지면 순환된 파일이 열린 상태로 유지되므로 파일 설명자 및 디스크 사용량이 증가할 수 있습니다.

Agent가 조건에 일치하는 모든 파일을 테일링하지 못하는 경우에는 `logs_config.open_files_limit`을 확인합니다. 자세한 구성 방법은 [Agent가 테일링하는 로그 파일 수 늘리기][3]를 참조하세요.

## Agent 튜닝 {#tune-the-agent}

### 튜닝 액션 선택 {#choose-a-tuning-action}

| 구성 요소 | 해석 | 이 섹션부터 시작 |
| --- | --- | --- |
| `destination_reliable_N` | 로그 제출이 지연되거나 재시도되고 있습니다. | [전송 오류 해결](#resolve-delivery-errors) |
| `worker` | 페이로드가 전송 대기 중입니다. | [전송 오류 해결](#resolve-delivery-errors) |
| `strategy` | 인코딩, 배치 처리 또는 압축 작업의 처리 용량이 한계에 도달했습니다. | [압축 비활성화](#disable-compression) 또는 [파이프라인 병렬 처리 증가](#increase-pipeline-parallelism) |
| `processor` | 로그 처리 용량이 한계에 도달했습니다. | [로그 처리 감소](#reduce-log-processing) 또는 [파이프라인 병렬 처리 증가](#increase-pipeline-parallelism) |

### 전송 오류 해결 {#resolve-delivery-errors}

`destination_reliable_N`이 포화 상태인 경우 [Agent 로그 파일][10]을 열어 누락된 바이트 경고 타임스탬프 전후의 항목에서 전송 실패 또는 재시도 기록을 확인합니다. 인증, 거부, 프록시, DNS 및 연결 오류를 해결합니다. [프록시 구성][5], [Datadog 엔드포인트에 대한 네트워크 액세스][6] 및 [Datadog 사이트][4]를 검증합니다.

### 압축 비활성화 {#disable-compression}

HTTPS 전송의 경우 압축이 기본적으로 활성화되어 있습니다. `strategy`가 포화 상태이고 Agent의 CPU 사용률이 높으면 압축 비활성화를 고려합니다. 압축 작업량은 줄어들지만 페이로드 크기와 로그 수집 엔드포인트로 전송되는 바이트 수가 증가합니다.

{{< code-block lang="yaml" filename="datadog.yaml" >}}
logs_config:
  use_compression: false
{{< /code-block >}}

변경 후 [status 명령][1]을 실행하여 `strategy`의 포화 상태 지속 시간이 줄어들었는지 확인합니다. 네트워크 사용량이 용량 한계에 도달하거나 [Agent 로그 파일][10]에 새로운 전송 오류가 표시되면 압축을 다시 활성화합니다.

### 파이프라인 병렬 처리 증가 {#increase-pipeline-parallelism}

기본적으로 Agent는 사용 가능한 논리 CPU당 하나의 로그 파이프라인을 실행하며, 최대 4개의 파이프라인을 실행합니다.

`processor` 또는 `strategy`가 포화 상태이고 호스트 CPU에 여유 용량이 있는 경우 `logs_config.pipelines` 값을 늘립니다. 예를 들어, Agent가 사용할 수 있는 논리 CPU가 8개인 호스트에서는 다음과 같이 설정합니다.

{{< code-block lang="yaml" filename="datadog.yaml" >}}
logs_config:
  pipelines: 8
{{< /code-block >}}

Agent가 여러 로그 소스에서 로그를 수집하는 경우 파이프라인을 추가하면 도움이 됩니다. 단일 소스는 하나의 파이프라인에서 계속 처리됩니다. 파이프라인 수를 늘리면 Agent의 CPU 및 메모리 사용량과 전체 HTTP 동시 전송 수가 증가할 수 있습니다. 변경 후 [status 명령][1]을 실행하여 대상 구성 요소의 포화 상태 지속 시간이 줄어들었는지 확인합니다.

### 로그 처리 감소 {#reduce-log-processing}

`processor`가 포화 상태이면 구성된 [처리 규칙][7]을 검토합니다. 전역 규칙은 Agent가 수집하는 모든 로그에 적용됩니다. 규칙이 하나의 소스에만 적용되는 경우 해당 소스의 통합 구성으로 이동합니다.

{{< code-block lang="yaml" filename="conf.d/myapp.d/conf.yaml" >}}
logs:
  - type: file
    path: /var/log/app/app.log
    service: myapp
    source: myapp
    log_processing_rules:
      - type: exclude_at_match
        name: exclude_debug
        pattern: \[DEBUG\]
{{< /code-block >}}

전역 `logs_config.processing_rules` 및 소스 수준 `log_processing_rules`에서 중복 규칙을 제거합니다. Agent 7.82.0부터 [자동 멀티라인 탐지][8]가 기본적으로 활성화됩니다. `processor` 구성 요소가 포화 상태이고 로그에 멀티라인 집계가 필요하지 않다면 다음과 같이 해당 기능을 비활성화하는 것이 좋습니다.

{{< code-block lang="yaml" filename="datadog.yaml" >}}
logs_config:
  auto_multi_line_detection: false
{{< /code-block >}}

소스에 알려진 멀티라인 형식이 있는 경우 자동 탐지를 사용하는 대신 [소스 수준 `multi_line` 처리 규칙을 구성][12]합니다. 변경 후 [status 명령][1]을 실행하여 프로세서 포화 상태를 비교하고 [Log Explorer][11]에서 관련 로그 줄이 올바르게 그룹화되어 있는지 확인합니다.

## 로그 볼륨 감소 {#reduce-log-volume}

Agent가 사용 가능한 호스트 및 네트워크 용량으로 필요한 로그 볼륨을 처리할 수 없다면 불필요한 로그를 필터링합니다. `exclude_at_match` 처리 규칙은 조건에 일치하는 로그가 호스트 밖으로 전송되기 전에 해당 로그를 삭제합니다.

{{< code-block lang="yaml" filename="datadog.yaml" >}}
logs_config:
  processing_rules:
    - type: exclude_at_match
      name: exclude_health_checks
      pattern: GET /health
{{< /code-block >}}

필터가 하나의 로그 소스에만 적용되는 경우 소스 수준 `log_processing_rules` 항목을 대신 사용합니다.

## 결과 확인 {#verify-the-result}

실제 운영 환경을 대표하는 로그 볼륨에서 각 변경 사항을 다음과 같이 테스트합니다.

1. status 명령 실행:
   {{< code-block lang="shell" >}}sudo datadog-agent status{{< /code-block >}}
2. 대상 구성 요소의 사용률이 90% 이상인 상태로 유지되는 시간이 줄어들었는지 확인합니다. 전체 상태는 포화 상태가 해소된 후에도 최대 30분 동안 `WARNING`으로 유지됩니다.
3. [Agent 로그 파일][10]에서 새로운 `remaining unread` 경고를 검색합니다.

변경 사항을 적용해도 포화 상태나 새로운 파일 순환 경고 발생 빈도가 줄어들지 않으면 변경 사항을 되돌립니다. 그런 다음 [튜닝 액션 선택](#choose-a-tuning-action) 섹션에서 다음 액션을 선택합니다. 다른 구성 요소에서 포화 상태가 발생하면 해당 구성 요소에 대해 제시된 액션을 사용합니다.

## Datadog 지원팀 문의 {#contact-datadog-support}

이 페이지의 단계를 따라도 문제가 해결되지 않으면 [Datadog 지원팀에 문의합니다][9]. 파이프라인이 포화 상태일 때 Agent를 재시작하기 전에 [플레어][2]를 제출합니다.


## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/agent/configuration/agent-commands/#agent-status-and-information
[2]: /ko/agent/troubleshooting/send_a_flare/
[3]: /ko/logs/guide/increase-number-of-log-files-tailed/
[4]: /ko/getting_started/site/
[5]: /ko/agent/configuration/proxy/
[6]: /ko/agent/configuration/network/
[7]: /ko/agent/logs/advanced_log_collection/
[8]: /ko/agent/logs/auto_multiline_detection/
[9]: /ko/help/
[10]: /ko/agent/configuration/agent-log-files/
[11]: /ko/logs/explorer/
[12]: /ko/agent/logs/advanced_log_collection/#manually-aggregate-multi-line-logs