---
description: Datadog Agent를 사용하여 로그를 수집하고 Datadog로 전송하기
further_reading:
- link: agent/logs/advanced_log_collection/#filter-logs
  tag: 설명서
  text: Datadog로 전송한 로그 필터링하기
- link: agent/logs/advanced_log_collection/#scrub-sensitive-data-from-your-logs
  tag: 설명서
  text: 로그에서 민감한 데이터 스크러빙하기
- link: agent/logs/advanced_log_collection/#multi-line-aggregation
  tag: 설명서
  text: 멀티라인 로그 집계
- link: agent/logs/advanced_log_collection/#tail-directories-using-wildcards
  tag: 설명서
  text: 와일드카드를 사용해 디렉터리 테일링
- link: agent/logs/advanced_log_collection/#global-processing-rules
  tag: 설명서
  text: 글로벌 처리 규칙
kind: 설명서
title: Agent 로그 전송
---


## 기본 Agent 작동

v6.19/v7.19 이상 버전의 Agent는 기본적으로 이전 버전에 맞게 TCP가 아닌 HTTPS로 압축하여 로그를 전송합니다.
로그 수집이 활성화된 경우 Agent를 시작하면 HTTPS 연결성 테스트가 실행됩니다. 테스트가 성공하면 Agent에서 압축된 HTTPS 전송을 사용합니다. 그 이외의 경우 Agent는 TCP 전송을 폴백합니다.

이 연결성 테스트는 Agent 부팅 시에만 수행되며 HTTPS만 테스트합니다. 부팅 시 Agent가 TCP와 HTTP 둘 다 연결되지 않은 경우, Agent는 TCP 전송을 사용합니다. 다시 연결해도 다음에 Agent를 재시작할 때까지 이 작동은 바뀌지 않습니다.

Agent가 사용하는 전송 방식을 확인하려면 [Agent 상태 명령어][1]를 실행하세요.

{{< img src="agent/logs/agent-status.png" alt="Agent 상태" style="width:70%;">}}

**참조**:

* 이전 버전의 Agent는 기본 설정으로 TCP 전송을 사용합니다. Datadog에서는 v6.14 /v7.14 이상을 실행하는 경우는 HTTPS 전송, v6.16/v7.16 이상을 실행하는 경우는 HTTPS 압축을 실행하시길 권장합니다.
* Datadog로 로그를 전송할 때 프록시를 사용한다면, 특정 트랜스포트(TCP 또는 HTTPS)를 항상 강제로 사용하세요.

## 특정 트랜스포트 강제하기

다음 설정을 활용해 TCP 또는 HTTPS 트랜스포트를 강제 사용하세요.

{{< tabs >}}
{{% tab "HTTPS" %}}

Agent 버전 v6.14/v7.14 이상에서 HTTPS를 강제 사용하려면 Agent의 [주요 설정 파일][1](`datadog.yaml`)을 다음과 같이 업데이트하세요.

```yaml
logs_enabled: true
logs_config:
  use_http: true
```

환경 변수와 로그를 보내려면 다음과 같이 설정하세요.

* `DD_LOGS_ENABLED=true`
* `DD_LOGS_CONFIG_USE_HTTP=true`

기본적으로 Datadog Agent는 HTTPS를 통해 Datadog로 로그를 보낼 때 포트 `443`을 사용합니다.

## HTTPS 트랜스포트

Datadog 스토리지 시스템에서 `200` 상태 코드를 반환하므로, 가장 신뢰성 높은 로그 수집을 위해서는 **HTPS 로그 전송 설정을 사용하시길 권장합니다.

{{< img src="agent/HTTPS_intake_reliability_schema.png" alt="HTTPS 인테이크 스키마"  style="width:80%;">}}

Agent는 HTTP를 사용해 로그 배치를 전송하며, 다음과 같은 제한을 따릅니다.

* 최대 배치 크기: 1MB
* 단일 로그의 최대 크기: 256kB
* 배치 내 로그의 최대 개수: 200

### 로그 압축

`compression_level` 파라미터(또는 `DD_LOGS_CONFIG_COMPRESSION_LEVEL`)에는 `0`(압축 없음)부터 `9`(최대 압축, 단 리소스 사용률이 높음)까지의 값을 설정할 수 있습니다. 기본값은 `6`입니다.

압축을 사용하는 경우의 Agent 리소스 사용 현황을 자세히 알아보고 싶으신 분은 [Datadog Agent의 오버헤드 섹션][2]을 참조하시기 바랍니다.

Agent 버전 6.19 / 7.19 이하의 경우, Agent [주요 설정 파일][1](`datadog.yaml`)을 다음과 같이 업데이트해 압축을 강제 사용해야 합니다.

```yaml
logs_enabled: true
logs_config:
  use_http: true
  use_compression: true
  compression_level: 6
```

### 배치 대기 시간 설정

Agent는 각 배치가(콘텐츠 크기 또는 로그 수 중 하나를 기준으로) 채워질 때까지 최대 5초를 기다립니다. 따라서 최악의 경우(즉, 로그가 거의 생성되지 않는 경우) HTTP로 전환하면 모든 로그를 실시간으로 전송하는 TCP 전송보다 5초 느려질 수 있습니다.

각 배치가 채워질 때까지 Datadog Agent가 대기하는 최대 시간을 변경하려면 Agent의 [주요 설정 파일][1](`datadog.yaml`)에 아래의 설정을 추가하세요.

```yaml
logs_config:
  batch_wait: 2
```

또는 `DD_LOGS_CONFIG_BATCH_WAIT=2` 환경 변수를 사용하세요. 단위는 초이며, `1`부터 `10` 사이의 정수여야 합니다.

### HTTPS 프록시 설정

로그를 HTTPS 경유로 전송하는 경우는, 로그를 웹 프록시 경유로 전송할 때도 다른 데이터 타입과 같은 [프록시 설정 세트][3]를 사용합니다.

[1]: /ko/agent/configuration/agent-configuration-files/
[2]: /ko/agent/basic_agent_usage/#agent-overhead
[3]: /ko/agent/configuration/proxy/
{{% /tab %}}
{{% tab "TCP" %}}

TCP 트랜스포트를 강제 사용하려면 Agent [주요 설정 파일][1](`datadog.yaml`)을 다음과 같이 업데이트하세요.

```yaml
logs_enabled: true
logs_config:
  force_use_tcp: true
```
환경 변수와 로그를 보내려면 다음과 같이 설정하세요.

* `DD_LOGS_ENABLED=true`
* `DD_LOGS_CONFIG_FORCE_USE_TCP=true`

기본적으로 Datadog Agent에서 로그를 Datadog로 전송할 때는 TLS-암호화 TCP를 사용합니다. 이를 위해 아웃바운드 커뮤니케이션(Datadog 미국 사이트의 경우 포트 `10516`로, Datadog 유럽 사이트의 경우 포트 `443`로)이 필요합니다.

[1]: /ko/agent/configuration/agent-configuration-files/
{{% /tab %}}
{{< /tabs >}}

**참조**: [SOCKS5 프록시][2] 서버 설정 시 TCP 트랜스포트를 강제 사용하세요. socks5 프록시가 아직 HTTPS에서 압축을 지원하지 않기 때문입니다.


[1]: /ko/agent/configuration/agent-commands/?tab=agentv6v7#service-status
[2]: /ko/agent/logs/proxy/?tab=socks5
