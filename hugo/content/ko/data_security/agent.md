---
aliases:
- /ko/agent/security/
description: Datadog Agent 보안 조치
further_reading:
- link: /data_security/
  tag: 설명서
  text: Datadog에 제출된 주요 데이터 카테고리 검토
title: Agent 데이터 보안
---
<div class="alert alert-info">이 페이지에서는 Datadog으로 전송되는 데이터의 보안을 다룹니다. 클라우드 및 애플리케이션 보안 제품과 기능을 찾고 있다면 <a href="/security/" target="_blank">보안</a> 섹션을 참조하세요.</div>

로컬에 설치된 [Agent][1]를 사용하거나 [HTTP API][2]를 통해 Datadog 서비스로 데이터를 보낼 수 있습니다. Datadog을 사용하기 위해 반드시 Datadog Agent를 사용해야 하는 것은 아니지만, 대다수의 고객은 Agent를 활용합니다. 이 문서에서는 환경을 안전하게 보호하는 데 사용할 수 있는 주요 보안 기능과 특징을 설명합니다.

## Agent 배포 {#agent-distribution}

Agent의 공식 리포지토리와 바이너리 패키지는 디지털 서명이 적용되어 있습니다. 다음과 같은 공개 키 중 하나와 서명을 대조하여 배포 채널을 검증하세요.

- Linux DEB 패키지 및 리포 메타데이터:
  - [D18886567EABAD8B2D2526900D826EB906462314][18]
  - [5F1E256061D813B125E156E8E6266D4AC0962C7D][15]
  - [D75CEA17048B9ACBF186794B32637D44F14F620E][4]
  - [A2923DFF56EDA6E76E55E492D3A80E30382E94DE][3]
- Linux RPM 패키지 및 리포 메타데이터:
  - [2416A37757B1BB0268B3634B52AFC5994F09D16B][17]
  - [7408BFD56BC5BF0C361AAAE85D88EEA3B01082D3][16]
  - [C6559B690CA882F023BDF3F63F4D1729FD4BF915][5]
  - [A4C0B90D7443CF6E4E8AA341F1068E14E09422B3][6]
- MacOS PKG:
  - Apple 인증서 지문 `FDD2ADF623EA75E62C6DC6DBFBA7520CA549AB7314E660D78B0E3DCCF15B2FBA`

Debian 및 Ubuntu에서 `datadog-agent` 패키지는 `datadog-signing-keys` 패키지에 대한 소프트 종속성을 가지며, 이로 인해 위 키가 APT에서 신뢰됩니다. 패키지를 최신 상태로 유지하면 시스템에 최신 서명 키가 적용됩니다.

### Windows MSI {#windows-msi}

Windows에서 Datadog Agent 설치 관리자 파일의 서명을 검증하려면 `Get-AuthenticodeSignature`의 출력값을 `FormatList`(`fl`)로 파이핑하고 다음 사항을 확인합니다.
- 상태가 유효함
- 인증서의 서명자가 `Datadog, Inc`임
- 발급자가 `DigiCert`임

예를 들어, `ddagent-cli-7.49.1.msi`라는 이름의 .msi 파일을 검증하려면 다음을 실행하세요.
{{< code-block lang="powershell" >}}
Get-AuthenticodeSignature ddagent-cli-7.49.1.msi | fl
{{< /code-block >}}

명령의 출력이 `A certificate chain could not be built to a trusted root authority`인 경우, 시스템에 DigiCert 루트 CA 업데이트가 필요할 수 있습니다.

## 정보 보안 {#information-security}

Datadog Agent는 기본적으로 TLS 암호화 TCP 연결을 통해 Datadog에 데이터를 제출합니다. 버전 6부터 Agent는 Datadog에 연결할 때 최소 TLS 버전을 강제하도록 구성할 수 있습니다. 예를 들어 PCI 요구 사항을 충족하기 위해 강력한 암호화를 사용해야 하는 경우, Agent v6/7을 사용하고 Agent 구성 파일에서 `min_tls_version: 'tlsv1.2'` 설정을 지정하거나, Agent 버전이 6.39.0/7.39.0 미만인 경우 `force_tls_12: true` 설정을 지정해야 합니다.

## 네트워킹 및 프록시 {#networking-and-proxying}

Datadog은 SaaS 제품이므로 모니터링 데이터를 제출하려면 네트워크에서 공용 인터넷으로의 아웃바운드 연결을 설정해야 합니다. 트래픽은 기본적으로 TLS로 암호화된 TCP 연결을 통해 항상 Agent에서 Datadog 방향으로 시작됩니다. Datadog에서 Agent 방향으로 시작되는 세션은 없습니다. 필수 Datadog 도메인 및 포트를 허용 목록에 등록하도록 방화벽을 구성하는 방법에 대한 자세한 내용은 Agent의 [네트워크][7] 페이지를 참조하세요. 또한 공용 인터넷에 직접 연결할 수 없거나 아웃바운드 트래픽이 제한된 호스트를 모니터링하려면 [프록시][8]를 통해 모니터링 데이터를 제출하는 것을 고려하세요.

## Agent 로그 난독화 {#agent-logs-obfuscation}

Datadog Agent는 필요에 따라 [Agent 문제 해결][9]을 지원할 목적으로 로컬 로그를 생성합니다. 보안 예방 조치로, 해당 로컬 로그는 잠재적 자격 증명을 나타내는 특정 키워드 및 패턴(예: API 키, 비밀번호, 토큰 키워드)을 필터링하며, 이후 디스크에 기록되기 전 난독화됩니다.

## 로컬 HTTPS 서버 {#local-https-server}

Agent v6/7은 실행 중인 Agent와 Agent 도구(예: `datadog-agent` 명령어) 간의 통신을 원활하게 하기 위해 로컬 HTTPS API를 노출합니다. API 서버는 로컬 네트워크 인터페이스(`localhost/127.0.0.1`)에서만 액세스할 수 있으며, Agent를 실행하는 사용자만 읽을 수 있는 토큰을 통해 인증이 강제됩니다. 로컬 HTTPS API로의 통신은 `localhost`에 대한 도청을 방지하기 위해 전송 중에 암호화됩니다.

## Agent GUI {#agent-gui}

Agent v6/7은 기본적으로 그래픽 사용자 인터페이스(GUI)와 함께 번들로 제공되며, 이는 기본 웹 브라우저에서 실행됩니다. GUI는 이를 실행하는 사용자에게 Agent 구성 파일을 열 수 있는 권한을 포함하여 올바른 사용자 권한이 있는 경우에만 실행됩니다. GUI는 로컬 네트워크 인터페이스(`localhost/127.0.0.1`)에서만 액세스할 수 있습니다. 마지막으로, GUI는 GUI 서버와의 모든 통신을 인증하고 사이트 간 요청 위조(CSRF) 공격으로부터 보호하는 데 사용되는 토큰을 생성하고 저장하므로 사용자의 쿠키가 활성화되어 있어야 합니다. 필요한 경우 GUI를 완전히 비활성화할 수도 있습니다.

## Agent 보안 스캔 {#agent-security-scans}

Datadog의 Vulnerability Management 프로그램에는 핵심 지원 서비스에 대한 활성 스캔을 포함하여 지원 인프라 및 애플리케이션 구성 요소에 대한 정기적인 평가가 포함됩니다. Datadog Security 팀은 정기적인 검사를 수행하여 구성 및 소프트웨어 취약성을 식별하고 Datadog의 Vulnerability Management 정책에 따라 발견 결과에 대한 수정 사항을 추적합니다.

특히 컨테이너 Agent와 관련하여 Datadog은 일반 가용성(GA) 및 릴리스 후보(RC) 릴리스 모두에 대해 정기적인 취약성 정적 분석을 수행합니다. Datadog 컨테이너 Agent는 [Docker Agent][10]에 언급된 대로 공용 레지스트리에서 찾을 수 있으며, Datadog Agent 소스 코드도 오픈 소스입니다. 이를 통해 고객은 고유한 요구 사항을 충족하는 주기에 따라 선호하는 도구를 사용하여 취약성 검사를 할 수 있습니다. 이는 잠재적인 취약성에 대해 Datadog Agent를 모니터링하려는 고객에게 필요한 가시성을 제공합니다.

Datadog 보안에서 버그를 발견했다고 생각되면 [문제 보고][11]를 참조하세요. 
특정 CVE의 상태를 검사하려면 [공개 아티팩트 취약성 페이지][19]를 참조하세요. 추가 정보가 필요하면 표준 지원 프로세스에 따라 [Datadog 지원팀][12]에 문의하세요. Datadog 웹사이트를 통해 지원 티켓을 제출하는 경우에는 {{< ui >}}Product type{{< /ui >}} 필드를 {{< ui >}}Vulnerability Inquiry on Datadog Product{{< /ui >}}로 설정하세요.

## 권한 없는 사용자로 실행 {#running-as-an-unprivileged-user}

기본적으로 Agent는 Linux에서는 `dd-agent` 사용자로, [Windows][13]에서는 `ddagentuser` 계정으로 실행됩니다. 예외 사항은 다음과 같습니다.

- `system-probe`는 Linux에서 `root`로, Windows에서 `LOCAL_SYSTEM`으로 실행됩니다.
- `process-agent`는 Windows에서 `LOCAL_SYSTEM`으로 실행됩니다.
- `security-agent`는 Linux에서 `root`로 실행됩니다.

## 시크릿 관리 {#secrets-management}

Agent 구성 파일에 시크릿을 일반 텍스트로 저장하지 않아야 하는 요구 사항이 있는 경우 [시크릿 관리][14] 패키지를 활용할 수 있습니다. 이 패키지를 사용하면 Agent가 사용자가 제공한 실행 파일을 호출하여 시크릿 검색 또는 복호화를 처리할 수 있으며, 이렇게 검색된 시크릿은 Agent에 의해 메모리에 로드됩니다. 선호하는 키 관리 서비스, 인증 방법 및 지속적 통합 워크플로에 맞춰 실행 파일을 설계할 수 있습니다.

자세한 내용은 [시크릿 관리][14] 설명서를 참조하세요.

## 텔레메트리 수집 {#telemetry-collection}

{{< site-region region="gov,gov2" >}}

비정부 사이트의 Agent는 Datadog Agent에 대한 환경, 성능 및 기능 사용 정보를 수집합니다. Agent가 정부 사이트를 감지하거나 [Datadog Agent FIPS 프록시][1]가 사용되는 경우, Agent는 이 텔레메트리 수집을 자동으로 비활성화합니다. 이러한 감지가 불가능한 경우(예: 프록시가 사용 중인 경우), Agent 텔레메트리가 전송되지만 Datadog 수집 지점에서 즉시 삭제됩니다.

이 데이터가 처음부터 전송되지 않도록, Datadog은 다음 예시와 같이 Agent 구성 파일에서 `agent_telemetry` 설정을 업데이트하여 Agent 텔레메트리를 명시적으로 비활성화할 것을 권장합니다.

{{< tabs >}}
{{% tab "datadog.yaml" %}}

```yaml
agent_telemetry:
  enabled: false
```
{{% /tab %}}
{{% tab "환경 변수" %}}

```bash
DD_AGENT_TELEMETRY_ENABLED=false
```
{{% /tab %}}
{{< /tabs >}}
[1]: https://docs.datadoghq.com/ko/agent/configuration/fips-compliance?tab=hostorvm&site=gov
{{< /site-region >}}
{{< site-region region="us,us3,us5,eu,ap1,ap2,uk1" >}}
Datadog은 Datadog Agent에 대한 환경, 성능 및 기능 사용 정보를 수집할 수 있습니다. 여기에는 Datadog Agent를 지원하고 추가로 개선하기 위해 난독화된 스택 추적이 포함된 Datadog Agent의 진단 로그 및 크래시 덤프가 포함될 수 있습니다.

Agent 구성 파일에서 `agent_telemetry` 설정을 업데이트하여 이 텔레메트리 수집을 비활성화할 수 있습니다. 다음 예시를 참고하세요.
{{< tabs >}}
{{% tab "datadog.yaml" %}}

```yaml
agent_telemetry:
  enabled: false
```
{{% /tab %}}
{{% tab "환경 변수" %}}

```bash
DD_AGENT_TELEMETRY_ENABLED=false
```
{{% /tab %}}
{{< /tabs >}}

**텔레메트리 콘텐츠:**

최신 텔레메트리 콘텐츠를 보려면 다음 명령을 실행하세요.

```bash
agent diagnose show-metadata agent-telemetry
```

| 메타데이터([소스][1]) |
| ---------------------- |
| 머신 ID             |
| 머신 이름           |
| OS                     |
| OS 버전             |
| Agent 버전          |

| 메트릭([소스][2])                       | 설명                                                                                                            |
| ------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| **검사 항목**                                  |                                                                                                                        |
| checks.execution_time                       | 밀리초 단위의 검사 실행 시간                                                                                 |
| pymem.inuse                                 | Python 인터프리터가 할당한 바이트 수                                                                    |
| **로그 및 메트릭**                        |                                                                                                                        |
| dogstatsd.udp_packets_bytes                 | DogStatsD UDP 패킷 바이트                                                                                            |
| dogstatsd.uds_packets_bytes                 | DogStatsD UDS 패킷 바이트                                                                                            |
| dogstatsd_client.bytes_sent                 | DogStatsD 클라이언트가 전송한 총 바이트 수                                                                                  |
| dogstatsd_client.bytes_dropped              | DogStatsD 클라이언트가 삭제한 총 바이트 수                                                                               |
| dogstatsd_client.bytes_dropped_queue        | DogStatsD 클라이언트 발신자 큐가 가득 차서 삭제된 총 바이트 수                                                    |
| dogstatsd_client.bytes_dropped_writer       | DogStatsD 클라이언트 작성기가 전송할 수 없어 삭제된 총 바이트 수                                                 |
| logs.auto_multi_line_aggregator_flush       | Agent가 집계한 멀티라인 로그 수                                                                       |
| logs.auto_multi_line_default_total_lines    | 자동 멀티라인 감지 기본값을 사용하는 소스에 대해 애그리게이터가 처리한 총 로그 줄 수           |
| logs.auto_multi_line_default_would_combine  | 자동 멀티라인 감지가 기본적으로 활성화된 경우 결합될 줄 수                              |
| logs.auto_multi_line_default_would_truncate | 자동 멀티라인 감지가 기본적으로 활성화된 경우 잘릴 그룹 내 라인 수                   |
| logs.bytes_missed                           | Agent에서 소비하기 전에 손실된 총 바이트 수(예: 로그 로테이션 후)                 |
| logs.bytes_sent                             | 해당하는 경우, 인코딩 전 전송된 총 바이트 수                                                              |
| logs.decoded                                | 디코딩된 총 로그 수                                                                                           |
| logs.dropped                                | 삭제된 총 로그 수                                                                                           |
| logs.encoded_bytes_sent                     | 해당하는 경우 인코딩 후 전송된 총 바이트 수                                                               |
| logs.http_connectivity_check                | 상태(성공 또는 실패)별로 태그가 지정된 HTTP 연결 검사 횟수                                               |
| logs.http_connectivity_failure              | 근본 원인(dns, tls, timeout, connection, http_status, other)별로 태그가 지정된 HTTP 연결 검사 실패 횟수    |
| logs.http_connectivity_retry_attempt        | 상태(성공 또는 실패)별로 태그가 지정된 HTTP 연결 재시도 횟수                                       |
| logs.restart_attempt                        | 상태 및 대상 전송별로 태그가 지정된 로그 Agent 재시작 시도 횟수                                             |
| logs.sender_latency                         | HTTP 발신자 지연 시간(밀리초)                                                                                    |
| logs.truncated                              | Agent가 자른 총 로그 수                                                                            |
| logs_destination.destination_workers        | 로그 대상당 활성화된 HTTP 연결의 최대 수                                                          |
| point.dropped                               | 삭제된 총 메트릭 수                                                                                        |
| point.sent                                  | 전송된 총 메트릭 수                                                                                           |
| transactions.input_count                    | 수신 트랜잭션 수                                                                                             |
| transactions.input_bytes                    | 수신 트랜잭션 페이로드 크기(바이트)                                                                             |
| transactions.success                        | 성공한 트랜잭션 수                                                                                           |
| transactions.success_bytes                  | 성공한 트랜잭션 페이로드 크기(바이트)                                                                          |
| transactions.requeued                       | 트랜잭션 재대기 횟수                                                                                              |
| transactions.retries                        | 트랜잭션 재시도 횟수                                                                                                |
| **데이터베이스**                                |                                                                                                                        |
| oracle.activity_samples_count               | 측정 쿼리 활동에서 가져온 행 수(수집된 활동 샘플 수)                              |
| oracle.activity_latency                     | 쿼리 활동을 가져오는 데 걸린 시간(밀리초)                                                                        |
| oracle.statement_metrics                    | 데이터베이스 메트릭을 검색하는 데 걸린 시간(밀리초)                                                                      |
| oracle.statement_plan_errors                | 실행 계획을 가져오는 중 발생한 오류 수                                                                         |
| postgres.collect_activity_snapshot_ms       | 활동 스냅샷을 가져오는 데 걸린 시간(밀리초)                                                                          |
| postgres.collect_relations_autodiscovery_ms | Autodiscovery 관계를 수집하는 데 걸린 시간(밀리초)                                                               |
| postgres.collect_statement_samples_ms       | statement 샘플을 가져오는 데 걸린 시간(밀리초)                                                                          |
| postgres.collect_statement_samples_count    | statement 샘플을 수집하기 위해 가져온 총 행 수                                                                        |
| postgres.collect_stat_autodiscovery_ms      | Autodiscovery 통계를 수집하는 데 걸린 시간(밀리초)                                                                    |
| postgres.get_new_pg_stat_activity_ms        | `pg_stat_activity`를 가져오는 데 걸린 시간(밀리초)                                                                         |
| postgres.get_new_pg_stat_activity_count     | `pg_stat_activity`                                                                       |를 수집하기 위해 가져온 총 행 수
| postgres.get_active_connections_ms          | 활성 연결을 가져오는 데 걸린 시간(밀리초)                                                                         |
| postgres.get_active_connections_count       | 활성 연결을 조회하기 위해 가져온 총 행 수                                                                           |
| postgres.schema_tables_elapsed_ms           | Postgres 스키마에서 테이블을 수집하는 데 걸린 시간                                                                              |
| postgres.schema_tables_count                | Postgres 스키마의 총 테이블 수                                                                                        |
| **API**                                     |                                                                                                                        |
| api_server.request_duration_seconds         | CLI 명령 실행 성능(실행된 경우)                                                                       |
| **이벤트**                                  |                                                                                                                        |
| agent_bsod                                  | BugCheck 코드, 4개의 관련 인수, 기호화되지 않은 충돌 호출 스택을 포함한 Agent 관련 블루 스크린(BSOD) 데이터 |
| **Service Discovery**                       |                                                                                                                        |
| service_discovery.discovered_services       | Agent의 Service Discovery 기능으로 감지된 서비스 수                                                   |
| **Autodiscovery**                          |                                                                                                                        |
| autodiscovery.discovery_queue_depth         | 현재 Agent의 통합 검색 대기열에 있는 서비스 수                                                |
| autodiscovery.discovery_results             | 결과(성공 또는 실패)별로 태그가 지정된 Agent의 통합 검색 시도 횟수                             |
| **GPU Monitoring**                          |                                                                                                                        |
| gpu.device_total                            | 시스템의 총 GPU 수                                                                                     |
| **APM**                                     |                                                                                                                        |
| trace.enabled                               | trace-agent 프로세스가 실행 중인지 여부.                                                                            |
| trace.working                               | trace-agent 프로세스가 추적을 수신 및 전송 중인지 여부.                                                       |
| **Synthetic Monitoring**                              |                                                                                                                        |
| synthetics_agent.checks_received            | 수신된 테스트 수                                                                                               |
| synthetics_agent.checks_processed           | 실행된 테스트 수                                                                                               |
| synthetics_agent.error_test_config          | 테스트 구성 오류 수                                                                                           |
| synthetics_agent.traceroute_error           | Traceroute 오류 수                                                                                            |
| synthetics_agent.evp_send_result_failure    | 결과 전송 시 오류 수                                                                                  |
| **Cluster Agent**                           |                                                                                                                        |
| admission_webhooks.mutation_attempts        | Admission 웹훅 변경 시도 횟수                                                                          |
| admission_webhooks.library_injection_attempts | 라이브러리 인젝션 시도 횟수                                                                                 |
| admission_webhooks.library_injection_errors | 라이브러리 주입 오류 수                                                                                     |
| admission_webhooks.patcher_errors           | Admission 웹훅 패처 오류 수                                                                             |
| admission_webhooks.rc_provider_configs      | 원격 구성 공급자 구성 수                                                                        |
| admission_webhooks.rc_provider_configs_invalid | 유효하지 않은 원격 구성 공급자 구성 수                                                             |
| admission_webhooks.image_resolution_attempts | 이미지 식별 시도 횟수 |
| autodiscovery.errors                        | Autodiscovery 오류 수                                                                                         |
| autodiscovery.watched_resources             | Autodiscovery가 감시하는 리소스 수                                                                              |
| cluster_checks.configs_dispatched           | 배포된 클러스터 검사 구성 수                                                                      |
| cluster_checks.configs_dangling             | 연결되지 않은 클러스터 검사 구성 수                                                                        |
| cluster_checks.configs_info                 | 디스패치된 클러스터 검사의 이름                                                                             |
| cluster_checks.unscheduled_check            | 예약되지 않은 클러스터 검사 수                                                                                   |
| instrumentation_controller.resources        | 컨트롤러가 추적하는 `DatadogInstrumentation` 리소스 수                                                 |
| instrumentation_controller.reconciliations  | 섹션 및 상태별로 태그가 지정된 `DatadogInstrumentation` 섹션 조정 시도 횟수                       |
| language_detection_patcher.patches          | 언어 감지 패처 패치 수                                                                           |
| tagger.stored_entities                      | Tagger에 저장된 엔티티 수                                                                                |
| workloadmeta.stored_entities                | WorkloadMeta에 저장된 엔티티 수                                                                              |
| workloadmeta.pull_errors                    | WorkloadMeta 풀 오류 수                                                                                     |
| appsec_injector.watched_changes             | AppSec 인젝터가 감시 대상 리소스에 대해 감지한 변경 사항 수                                                |
| appsec_injector.sidecar_mutations           | AppSec 인젝터 사이드카 승인 결과(포드 변경 및 삭제) 수                                       |
| agent_performance.containers_restarts       | Cluster Agent 및 Cluster Checks Runner 포드의 컨테이너 재시작 횟수                                      |
| agent_performance.containers_terminated     | 이유별로 태그가 지정된 Cluster Agent 및 Cluster Checks Runner 포드의 컨테이너 종료 횟수                |
| agent_performance.memory_usage              | Cluster Agent 및 Cluster Checks Runner 포드의 총 컨테이너 런타임 메모리 사용량(바이트)                   |
| agent_performance.memory_limit              | Cluster Agent 및 Cluster Checks Runner 포드의 총 컨테이너 런타임 메모리 한도(바이트)                  |
| agent_performance.cpu_usage                 | Cluster Agent 및 Cluster Checks Runner 포드의 총 컨테이너 런타임 CPU 사용량(CPU 코어)                  |
| **eBPF**                                    |                                                                                                                        |
| ebpf.core_load_success                      | eBPF CO-RE 프로그램 로드 성공 횟수                                                                    |
| ebpf.core_load_error                        | eBPF CO-RE 프로그램 로드 중 오류 발생 횟수                                                                         |
| ebpf.core_remoteconfig_success              | 원격 구성에서 BTF(BPF Type Format) 데이터를 성공적으로 다운로드한 횟수                                 |
| ebpf.core_remoteconfig_error                | 원격 구성에서 BTF 데이터를 다운로드하는 중 발생한 오류 횟수                                                        |

적용 가능한 메트릭만 내보냅니다. 예를 들어, DBM이 활성화되지 않은 경우 데이터베이스 관련 메트릭은 전혀 내보내지 않습니다.


[1]: https://github.com/DataDog/datadog-agent/blob/4dc6ed6eb069bdea7e93f2d267ac5086a98c968c/comp/core/agenttelemetry/impl/sender.go#L218-L221
[2]: https://github.com/search?q=repo%3ADataDog%2Fdatadog-agent+content%3A%2Fvar+defaultProfiles%2F+path%3Acomp%2Fcore%2Fagenttelemetry%2Fimpl%2Fconfig.go+content%3A%2Fprofiles%3A%2F+content%3A%2F-+name%3A+checks%2F+content%3A%2Fmetric%3A%2F+content%3A%2Fexclude%3A%2F&type=code

{{< /site-region >}}

### 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/agent/
[2]: /ko/api/
[3]: https://keys.datadoghq.com/DATADOG_APT_KEY_382E94DE.public
[4]: https://keys.datadoghq.com/DATADOG_APT_KEY_F14F620E.public
[5]: https://keys.datadoghq.com/DATADOG_RPM_KEY_FD4BF915.public
[6]: https://keys.datadoghq.com/DATADOG_RPM_KEY_E09422B3.public
[7]: /ko/agent/faq/network/
[8]: /ko/agent/configuration/proxy/
[9]: /ko/agent/troubleshooting/
[10]: /ko/containers/docker/?tab=standard
[11]: https://www.datadoghq.com/security/?tab=contact
[12]: https://www.datadoghq.com/support/
[13]: /ko/agent/faq/windows-agent-ddagent-user/
[14]: /ko/agent/configuration/secrets-management/
[15]: https://keys.datadoghq.com/DATADOG_APT_KEY_C0962C7D.public
[16]: https://keys.datadoghq.com/DATADOG_RPM_KEY_B01082D3.public
[17]: https://keys.datadoghq.com/DATADOG_RPM_KEY_4F09D16B.public
[18]: https://keys.datadoghq.com/DATADOG_APT_KEY_06462314.public
[19]: /ko/data_security/guide/public_artifact_vulnerabilities/