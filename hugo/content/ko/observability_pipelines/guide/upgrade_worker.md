---
aliases:
- /ko/observability_pipelines/guide/upgrade_worker_2_7/
description: Worker 버전 2.7에서 2.21까지의 새로운 기능, 개선 사항 및 수정 사항에 대해 알아보세요.
disable_toc: false
title: Worker 업그레이드 가이드
---
## 개요 {#overview}

<div class="alert alert-info">
Datadog은 마이너 릴리스와 패치 릴리스가 나올 때마다, 또는 최소한 매월 Observability Pipelines Worker(OPW)를 업데이트할 것을 권장합니다. <br><br> 최신 메이저 OPW 버전으로 업그레이드하고 업데이트된 상태를 유지하는 것이 새로운 OPW 기능, 수정 사항 및 보안 업데이트를 이용할 수 있는 유일하게 지원되는 방법입니다.
</div>

이 가이드에서는 특정 Worker 버전으로 업그레이드하는 방법과 해당 버전의 업데이트 내용을 다룹니다.

## Worker 버전 2.21.0 {#worker-version-2210}

Worker 버전 2.21.0으로 업그레이드하려면 다음 단계를 따르세요.

- Docker: [2.21.0 이미지][54]에 대해 `docker pull` 명령을 실행합니다.
- Kubernetes: [Helm 차트][2] 및 [Worker 업그레이드][37]를 참조합니다.
- APT: `apt-get install observability-pipelines-worker=2.21.0` 명령을 실행합니다.
- RPM: `sudo yum install observability-pipelines-worker-2.21.0` 명령을 실행합니다.

Worker 버전 2.21.0에서는 다음 항목을 이용할 수 있습니다.

#### 새로운 기능 {#new-features}

- Datadog Archives 목적지(Amazon S3, Google Cloud Storage 및 Azure Blob Storage)에서 이제 구성 가능한 `compression` 옵션(`gzip` 또는 `zstd`)을 지원합니다.
- Remap to OCSF 프로세서에 다음이 포함되었습니다.
    - AWS Config Rules OCSF 매핑
    - 여러 소스 필드나 상수 값의 문자열 표현을 결합하는 `concat_strings` OCSF 매핑 함수
- Splunk HEC 목적지에서 이제 `endpoint_target` 옵션(`event` 또는 `raw`)을 지원하여 이벤트를 보낼 Splunk HEC 엔드포인트를 결정할 수 있습니다.

#### 개선 사항 {#enhancements}

- Splunk TCP 소스에서 이제 TCP keepalive 및 연결 제한 구성을 지원합니다.
- 내부 Worker 로그 및 트레이스에 이제 파이프라인 이름(`op_worker.pipeline_name:<pipeline_name>`)이 추가되어 메트릭에 이미 존재하는 태그와 일치하게 되었습니다.
- 정상 종료 중 Worker의 로깅이 개선되었습니다.
- 목적지 엔드포인트의 유효성 검사가 개선되어 불완전하거나 비어 있는 URL을 검사합니다.
- 이제 Custom Processor의 `parse_aws_vpc_flow_log` 함수는 Amazon VPC Flow Logs 버전 7~11에 도입된 다음 필드를 포함한 모든 필드를 인식합니다.
    - 버전 7: ECS 메타데이터 필드
    - 버전 8: `reject_reason`
    - 버전 9: `resource_id`
    - 버전 10: `encryption_status`
    - 버전 11: 태그, 인터페이스 및 다음 홉 필드
- 이제 Enrichment Table 프로세서가 다음을 수행합니다.
    - 조회 결과가 긍정적이든 부정적이든 관계없이 약 30분 동안 캐시에 행을 유지합니다.
    - 소스 발신자의 배치 크기에 따라 생성되는 이벤트를 배치로 분할합니다.

#### 수정 사항 {#fixes}

- UTF-8 텍스트가 포함된 검색 쿼리에서 대소문자를 구분하지 않는 glob 일치 기능으로 인해 비 ASCII 입력에서 패닉과 잘못된 결과가 발생하던 문제를 수정했습니다.
- 계정 키 연결 문자열을 사용할 때 4 MiB를 초과하는 파일을 Azure Blob Storage에 업로드할 수 없던 문제를 수정했습니다.
- 레코드가 버퍼의 최대 레코드 크기를 초과할 때 발생하는 복구 불가능한 Worker 오류를 수정했습니다. 이제 오류가 기록되고 `buffer_discarded_events_total` 및 `buffer_discarded_bytes_total` 상태 메트릭에 반영됩니다(`intentional="false"` 포함).

## Worker 버전 2.20.4 {#worker-version-2204}

Worker 버전 2.20.4로 업그레이드하려면 다음 단계를 따르세요.

- Docker: [2.20.4 이미지][53]에 대해 `docker pull` 명령을 실행합니다.
- Kubernetes: [Helm 차트][2] 및 [Worker 업그레이드][37]를 참조합니다.
- APT: `apt-get install observability-pipelines-worker=2.20.4` 명령을 실행합니다.
- RPM: `sudo yum install observability-pipelines-worker-2.20.4` 명령을 실행합니다.

Worker 버전 2.20.4에서는 다음 항목을 이용할 수 있습니다.

#### 수정 사항 {#fixes-1}

- Splunk TCP 소스는 이전에 하드코딩된 최대 프레임 길이인 10,000바이트를 적용했습니다. Worker는 더 큰 이벤트를 거부하고 경고를 기록했습니다. 이제 소스는 기본적으로 프레임 길이를 제한하지 않습니다. 무제한 메모리 소비를 방지하려면 `DD_OP_SPLUNK_TCP_MAX_FRAME_LENGTH` 환경 변수를 사용하여 최대 프레임 길이를 설정하세요.




## Worker 버전 2.20.3 {#worker-version-2203}

Worker 버전 2.20.3으로 업그레이드하려면 다음 단계를 따르세요.

- Docker: [2.20.3 이미지][52]에 대해 `docker pull` 명령을 실행합니다.
- Kubernetes: [Helm 차트][2] 및 [Worker 업그레이드][37]를 참조합니다.
- APT: `apt-get install observability-pipelines-worker=2.20.3` 명령을 실행합니다.
- RPM: `sudo yum install observability-pipelines-worker-2.20.3` 명령을 실행합니다.

Worker 버전 2.20.3에서는 다음 항목을 이용할 수 있습니다.

#### 수정 사항 {#fixes-2}

- TLS가 활성화된 경우 ALPN을 통해 `h2`를 알리도록 OpenTelemetry 소스의 gRPC 리스너를 수정했습니다. 이전에는 TLS를 통해 연결하는 gRPC 클라이언트가 연결을 설정하지 못하는 경우가 있었습니다.

## Worker 버전 2.20.2 {#worker-version-2202}

Worker 버전 2.20.2로 업그레이드하려면 다음 단계를 따르세요.

- Docker: [2.20.2 이미지][51]에 대해 `docker pull` 명령을 실행합니다.
- Kubernetes: [Helm 차트][2] 및 [Worker 업그레이드][37]를 참조합니다.
- APT: `apt-get install observability-pipelines-worker=2.20.2` 명령을 실행합니다.
- RPM: `sudo yum install observability-pipelines-worker-2.20.2` 명령을 실행합니다.

Worker 버전 2.20.2에서는 다음 항목을 이용할 수 있습니다.

#### 수정 사항 {#fixes-3}

- 유한하지 않은(NaN 또는 Infinity) 게이지, 카운터 델타, 히스토그램 델타 합계 값 및 0 카운트 히스토그램이 잘못된 형식의 OTLP 메트릭 페이로드로 직렬화될 수 있는 문제를 수정했습니다. 이러한 값은 이제 OTLP 인코딩 전에 삭제됩니다.




## Worker 버전 2.20.0 {#worker-version-2200}

Worker 버전 2.20.0으로 업그레이드하려면 다음 단계를 따르세요.

- Docker: [2.20.0 이미지][50]에 대해 `docker pull` 명령을 실행합니다.
- Kubernetes: [Helm 차트][2] 및 [Worker 업그레이드][37]를 참조합니다.
- APT: `apt-get install observability-pipelines-worker=2.20.0` 명령을 실행합니다.
- RPM: `sudo yum install observability-pipelines-worker-2.20.0` 명령을 실행합니다.

Worker 버전 2.20.0에서는 다음 항목을 이용할 수 있습니다.

#### 새로운 기능 {#new-features-1}

- 이제 OpenTelemetry 및 Splunk HEC 소스가 TLS 인증서의 핫 리로딩을 지원하므로, Worker를 재시작하지 않고도 인증서 교체가 적용됩니다.

#### 개선 사항 {#enhancements-1}

- Split Array 프로세서의 성능이 향상되었습니다.
- 이제 HTTP/S Server 소스는 인증 토큰을 구성할 때 헤더 이름 필드에 대해 대소문자를 구분하지 않는 일치 방식을 사용합니다.
- Splunk HEC 소스는 이제 이벤트 인증을 위한 선택적 토큰 목록을 허용합니다.

#### 수정 사항 {#fixes-4}

- Add Fields 프로세서는 이제 이벤트 업데이트에 실패하면 `component_errors_total` 메트릭 값을 증가시킵니다.
- 서버 이름이 구성된 목적지에서 TLS 인증서 호스트 이름 검증 문제를 수정하여 서버 이름을 검증에 사용하도록 했습니다.

## Worker 버전 2.19.0 {#worker-version-2190}

Worker 버전 2.19.0으로 업그레이드하려면 다음 단계를 따르세요.

- Docker: [2.19.0 이미지][49]에 대해 `docker pull` 명령을 실행합니다.
- Kubernetes: [Helm 차트][2] 및 [Worker 업그레이드][37]를 참조합니다.
- APT: `apt-get install observability-pipelines-worker=2.19.0` 명령을 실행합니다.
- RPM: `sudo yum install observability-pipelines-worker-2.19.0` 명령을 실행합니다.

Worker 버전 2.19.0에서는 다음 항목에 액세스할 수 있습니다.

#### 개선 사항 {#enhancements-2}

- BYOC Logs, HTTP Client, Socket 및 Syslog 목적지와 HTTP Client 소스에 `server_name` TLS 옵션이 추가되었습니다. 이 옵션은 TLS 핸드셰이크에 사용되는 SNI 및 인증서 호스트 이름을 재정의하며, 접속하려는 주소가 인증서의 공통 이름(Common Name) 또는 주체 대체 이름(Subject Alternative Name)과 일치하지 않을 때 적용됩니다.
- Splunk TCP 소스는 이제 TLS 인증서의 핫 리로딩을 지원하므로 Worker를 재시작하지 않고도 인증서 로테이션이 적용됩니다.
- BYOC Logs 목적지는 이제 mTLS 파일의 핫 리로딩을 지원합니다.
- Worker는 이제 구성 가능한 정상 종료 제한을 지원합니다.
- Amazon S3 목적지는 이제 `server_side_encryption` 및 `ssekms_key_id` 옵션을 사용하여 SSE-KMS 암호화를 지원합니다.

#### 수정 사항 {#fixes-5}

- Reduce 프로세서에서 경로 내 이름을 따옴표로 묶어야 하는 타임스탬프 필드(예: `"created.at"` 또는 `"event-time"`)의 동반 필드 `_end`가 축소된 이벤트에서 아무런 알림 없이 누락되던 문제를 수정했습니다. 이제 동반 필드가 기본 필드 바로 옆에 올바르게 배치됩니다.
- 구성 재로드 문제를 수정했습니다. 재로드를 통해 `X`라는 소스를 `X`라는 프로세서로 교체하는 등 동일한 이름을 유지하면서 구성 요소의 유형을 변경한 경우, `X`에서 계속 읽고 있는 모든 다운스트림 프로세서나 목적지는 이제 새 구성 요소에 다시 연결됩니다.
- Syslog 소스(TCP 모드)에서 길이 접두사가 붙은 메시지가 최대 길이를 초과하고 여러 번의 읽기에 걸쳐 분할된 경우에도 이를 처리할 수 있도록 수정했습니다.
- Logstash 소스가 부분적인 확인 응답을 보내는 대신 배치의 모든 이벤트가 수신되었을 때만 확인 응답을 보내도록 수정했습니다.
- 이제 Logstash 소스는 현재 배치의 모든 이벤트가 수신되기 전에 도착한 이벤트 배치를 거부하고, 처리를 계속하는 대신 치명적인 디코드 오류와 함께 연결을 종료합니다.
- 짧은 형식의 심각도 키워드(`crit`, `emerg`, `err`, `info`, `warn`)를 아무런 알림 없이 무시하고 `informational`을 기본값으로 사용하던 Syslog 코덱의 문제를 수정했습니다. 이제 짧은 형식과 전체 형식의 심각도 이름을 모두 허용합니다.
- 65,535바이트 이상의 줄이 포함된 입력을 처리할 때 Custom Processor 함수 `parse_key_value`, `parse_cef`, `decode_mime_q`, `parse_ruby_hash`에서 발생하던 문제를 수정했습니다.

## Worker 버전 2.18.0 {#worker-version-2180}

Worker 버전 2.18.0으로 업그레이드하려면 다음 단계를 따르세요.

- Docker: [2.18.0 이미지][48]에 대해 `docker pull` 명령을 실행합니다.
- Kubernetes: [Helm 차트][2] 및 [Worker 업그레이드][37]를 참조합니다.
- APT: `apt-get install observability-pipelines-worker=2.18.0` 명령을 실행합니다.
- RPM: `sudo yum install observability-pipelines-worker-2.18.0` 명령을 실행합니다.

Worker 버전 2.18.0에서는 다음 항목에 액세스할 수 있습니다.

#### 새로운 기능 {#new-features-2}

- 이제 `run` 명령은 Worker 자체의 `stdout` 및 `stderr` 로그 형식을 선택하기 위한 `--log-format` 플래그를 지원하며, `DD_OP_LOG_FORMAT` 환경 변수를 사용하여 구성할 수도 있습니다. 기본값인 `text`는 기존의 사람이 읽을 수 있는 출력을 유지하며, `json`은 추가적인 구문 분석 규칙 없이 직접 테일링하고 구문 분석할 수 있는 구조화된 JSON 로그를 생성합니다.
- Tag Cardinality Limit 프로세서는 이제 `tracking_mode` 옵션을 지원합니다. `exact_fingerprint`은 64비트 핑거프린트를 사용하여 태그 값을 정확하게 추적하므로 원시 값을 저장하던 이전 방식보다 메모리를 적게 사용하며, `probabilistic`은 간혹 발생하는 오탐(false positive)을 감수하는 대신 메모리 사용량을 더욱 줄이기 위해 블룸 필터를 사용합니다. 확률적 모드는 `false_positive_rate` 필드를 허용하며, 기본값은 `0.001`(0.1%)입니다.
- WebSocket 소스는 WebSocket 엔드포인트에서 로그를 수집하는 데 사용할 수 있으며, TLS뿐만 아니라 `none`, `basic`, `bearer`, `custom` 인증 전략도 지원합니다.
- 새로운 `generate_metrics` 프로세서는 메트릭을 지원되는 모든 메트릭 목적지로 라우팅합니다. Datadog은 기존 `generate_datadog_metrics` 프로세서보다 이 프로세서를 사용할 것을 권장하지만, 기존 프로세서의 사용에는 영향이 없습니다.

#### 개선 사항 {#enhancements-3}

- BYOC Logs 목적지에 mTLS 지원이 추가되었습니다.
- 이제 `measure_cpu_usage` 옵션이 활성화되어 로그 프로세서인 Custom Processor, Sensitive Data Scanner, Grok Parser, Parse JSON, Parse XML, OCSF Mapper, Enrichment Table, Reduce, Dedupe, Split Array, Throttle와 메트릭 프로세서인 Aggregate 및 Tag Cardinality Limit에서 `pipelines.component_cpu_usage_ns_total`이 항상 출력됩니다.
- 이제 파이프라인 구성 오류에 실패를 유발한 구성 요소의 ID가 포함됩니다. 이를 통해 수정이 필요한 소스, 프로세서 또는 목적지를 더 쉽게 식별할 수 있습니다. Custom Processor, Generate Metrics, OCSF Mapper와 같이 여러 블록으로 구성된 프로세서의 경우, 오류를 통해 실패한 개별 블록도 식별할 수 있으며, 여기에는 해당 블록의 위치와 이름(있는 경우)이 포함됩니다.
- 이제 `pipeline_name:<NORMALIZED_PIPELINE_NAME>`을 사용하여 파이프라인 메트릭에 파이프라인 이름을 태그로 지정합니다.

#### 수정 사항 {#fixes-6}

- 레거시 검색 구문을 사용하는 로그 전용 파이프라인이 새 구문 분석 도구에서 처리할 수 없는 검색 쿼리를 실행할 때 발생하던 문제를 수정했습니다. 이제 구문 분석 도구는 경고를 출력하고 유효하지 않은 쿼리를 실행하지 않습니다.
- 이스케이프 문자로 시작하는 쿼리에 영향을 주는 문제를 수정했습니다(새 검색 구문을 실행하는 파이프라인에만 해당).
- 백그라운드 작업에서 내보내는 내부 텔레메트리(메트릭 및 로그)가 이제 소유 구성 요소의 태그(`component_id`, `component_kind`, `component_type`)를 올바르게 상속합니다. 이전에는 여러 구성 요소가 태그를 전파하지 않고 백그라운드 작업을 생성했기 때문에 해당 작업에서 발생하는 일부 내부 이벤트에 구성 요소 태그가 없었습니다. 영향을 받는 출력 항목은 다음과 같습니다.
  - Datadog 아카이브 소스: listing-error, download-error, send-error, event-acknowledged, event-errored, event-rejected, 그리고 리스팅 코디네이터, 파일별 다운로더, 확인 핸들러 작업의 상태 메트릭
  - Microsoft Sentinel 목적지: Azure OAuth 토큰 재생성 작업
  - Splunk TCP 소스: 서버 작업

---

## Worker 버전 2.17.0 {#worker-version-2170}

Worker 버전 2.17.0으로 업그레이드하려면 다음 단계를 따르세요.

- Docker: [2.17.0 이미지][46]에 대해 `docker pull` 명령을 실행합니다.
- Kubernetes: [Helm 차트][2] 및 [Worker 업그레이드][37]를 참조합니다.
- APT: `apt-get install observability-pipelines-worker=2.17.0` 명령을 실행합니다.
- RPM: `sudo yum install observability-pipelines-worker-2.17.0` 명령을 실행합니다.

<div class="alert alert-warning"><strong>호환성을 깨뜨리는 변경 사항:</strong> 이제 Generate Metrics 프로세서는 다음에 대해 원시 필드 이름을 태그 키로 내보냅니다. <code>group_by</code> 범위 외의 문자가 포함된 항목 <code>[a-zA-Z0-9_@]</code>, 예: <code>http.status_code</code> 및 <code>kube-cronjob</code>. 이전에는 프로세서가 해당 문자를 포함하는 태그 키에 후행 밑줄(<code>_</code>)을 추가했습니다. 예를 들어, 태그 키는 <code>http.status_code</code> 에서 <code>http.status_code_</code> (으)로 변경되었는데, 이는 키에 마침표(<code>.</code>)가 포함되어 있었기 때문입니다.<br><br>Worker 2.17로 업그레이드한 후, 후행 밑줄이 있는 태그 키를 사용하는 모든 대시보드, 모니터, 경보 또는 노트북을 업데이트하여 밑줄이 없는 태그 키를 사용하도록 하세요. 과거 데이터 포인트는 기존 태그 키로 계속 쿼리할 수 있습니다. 이름이 일치하는 항목만 사용하는 <code>group_by</code> 파이프라인은 <code>[a-zA-Z0-9_@]+</code> 영향을 받지 않습니다.</div>

Worker 버전 2.17.0에서는 다음 항목에 액세스할 수 있습니다.

#### 새로운 기능 {#new-features-3}

- Custom Processor의 경우:
    - VRL 문자열 리터럴이 이제 `\u{HEX}` 유니코드 이스케이프 시퀀스를 지원합니다. 유효한 모든 유니코드 스칼라 값을 표현할 수 있습니다(예: `"hello\u{1F30E}world"`). 빈 중괄호, 16진수가 아닌 숫자, 서로게이트 코드 포인트 또는 U+10FFFF를 초과하는 값과 같은 잘못된 시퀀스는 컴파일 타임 오류로 보고됩니다.
    - `parse_regex` 함수는 이제 `parse_regex_all`과 일관되게 동적 정규식 패턴(변수 및 런타임 표현식)을 허용합니다. 패턴이 리터럴인 경우, 반환 유형 정보는 명명된 캡처 그룹을 기반으로 정확하게 유지됩니다.

#### 개선 사항 {#enhancements-4}

- Generate Metrics 프로세서의 성능이 개선되어 `group_by` 태그 레이블을 사용할 때 CPU 오버헤드가 감소합니다.
- Custom Processor의 경우, 호출 간에 컴파일된 정규식을 재사용함으로써 `parse_regex_all`의 성능이 개선되었습니다.

#### 수정 사항 {#fixes-7}

- 이제 Quota 프로세서의 백그라운드 동기화에서 출력되는 HTTP 메트릭에 올바른 구성 요소 태그(`component_kind:transform`, `component_type:quota`, `component_id:quota_global_state`)가 포함됩니다.
- Reference Tables를 사용하는 Enrichment Table 프로세서는 이제 빈 이벤트 배치를 전송하지 않아 디스크 버퍼와 관련된 치명적인 오류를 방지합니다.
- 이제 Generate Metrics 프로세서는 정적 구성 요소 ID를 사용하므로 관련 메트릭이 여러 Worker 및 재시작 전후에 동일한 `component_id`를 공유합니다.
- 괄호 안에 공백이 포함된 필터 쿼리(예: `service:( web OR api )`)의 구문 분석과 관련된 문제를 수정했습니다.
- 이제 Live Capture는 OpenTelemetry 소스와 같이 이름이 지정된 출력 포트가 여러 개 있는 소스에서도 올바르게 작동합니다.
- 소스나 프로세서가 다음 구성 요소로 빈 이벤트 배치를 전송할 경우 Worker가 충돌할 수 있던 문제를 수정했습니다.
- Custom Processor의 경우:
    - 오류 메시지 및 사용되지 않는 변수에 대한 진단 기능을 수정했습니다. 이제 프로세서는 한 번의 컴파일에서 처리되지 않은 모든 오류를 보고합니다.
    - 이제 `pascalcase` 및 `camelcase`와 같은 함수에서 `SCREAMING_SNAKE` 케이스를 사용할 수 있습니다.
    - 이제 `encode_proto` 및 `parse_proto` 함수는 문자열뿐만 아니라 정수나 불리언을 키로 사용하는 프로토 맵도 지원합니다.

---

## Worker 버전 2.16.1 {#worker-version-2161}

Worker 버전 2.16.1로 업그레이드하려면 다음 단계를 따르세요.

- Docker: [2.16.1 이미지][45]에 대해 `docker pull` 명령을 실행합니다.
- Kubernetes: [Helm 차트][2] 및 [Worker 업그레이드][37]를 참조합니다.
- APT: `apt-get install observability-pipelines-worker=2.16.1` 명령을 실행합니다.
- RPM: `sudo yum install observability-pipelines-worker-2.16.1` 명령을 실행합니다.

Worker 버전 2.16.1에서 다음 항목을 이용할 수 있습니다.

#### 수정 사항 {#fixes-8}

- 이제 Worker는 US1 이외의 데이터 센터에서 구성을 가져올 때 더 이상 오류가 발생하지 않습니다.

---

## Worker 버전 2.16.0 {#worker-version-2160}

Worker 버전 2.16.0으로 업그레이드하려면 다음 단계를 따르세요.

- Docker: [2.16.0 이미지][44]에 대해 `docker pull` 명령을 실행합니다.
- Kubernetes: [Helm 차트][2] 및 [Worker 업그레이드][37]를 참조합니다.
- APT: `apt-get install observability-pipelines-worker=2.16.0` 명령을 실행합니다.
- RPM: `sudo yum install observability-pipelines-worker-2.16.0` 명령을 실행합니다.

Worker 버전 2.16.0에서 다음 항목을 이용할 수 있습니다.

#### 새로운 기능 {#new-features-4}

- [Databricks Zerobus][47] 목적지: Zerobus 수집 서비스를 사용하여 로그 데이터를 Databricks Unity Catalog의 테이블로 전송합니다. Databricks 목적지는 OAuth 2.0 인증, Unity Catalog에서 자동 스키마 가져오기 및 protobuf 배치 인코딩을 지원합니다.
- Splunk HEC 소스는 이제 VRL 디코더를 사용하여 수신되는 로그 이벤트를 보강하는 기능을 지원합니다.
- Amazon S3 목적지가 이제 유연한 스키마 정의와 구성 가능한 압축(Snappy, ZSTD, GZIP, LZ4 또는 없음)을 사용하는 Apache Parquet 배치 인코딩을 지원합니다.
- Custom Processor의 경우:
    - 이제 `encode_proto` 함수는 `allow_lossy_string_coercion` 인수를 허용합니다.
    - 이제 Protobuf 인코딩은 호환되는 스칼라 유형을 대상 필드 유형으로 강제 변환합니다. 즉, `bool` 필드에는 정수와 문자열을, `float` 또는 `double` 필드에는 정수를 허용합니다.

#### 개선 사항 {#enhancements-5}

- Fluent, Logstash, OpenTelemetry(로그 및 메트릭), Splunk HEC, Splunk TCP, HTTP/S Server, Socket 및 Syslog 소스에 mTLS 지원이 추가되었습니다.
- 이제 Live Capture 이벤트에 해당 이벤트를 전송한 Worker의 UUID가 포함됩니다.
- Reference Tables 프로세서의 버퍼는 이제 더 이상 사용되지 않는 `buffer_events` 및 `buffer_byte_size` 메트릭을 대체하기 위해 `buffer_size_events` 및 `buffer_size_bytes` 게이지 메트릭을 출력합니다. 이전 버전과의 호환성을 위해 더 이상 사용되지 않는 메트릭도 계속 전송됩니다.
- Datadog Logs 목적지가 이제 부트스트랩 `logs-sites` 필드 또는 `DD_OP_LOGS_<SITE>` 환경 변수(예: `DD_OP_LOGS_US1`)를 사용하여 사이트별 로그 엔드포인트에 대한 재정의를 지원합니다. 환경 변수가 부트스트랩 파일보다 우선합니다.
- 소스가 이제 다음 분포 메트릭을 기록합니다.
    - `source_send_latency_seconds`: 소스가 이벤트 청크를 다음 구성 요소로 전송하는 데 소요되는 시간입니다.
    - `source_send_batch_latency_seconds`: 소스가 여러 이벤트 청크를 포함할 수 있는 배치를 다음 구성 요소로 전송하는 데 소요되는 시간입니다.

#### 수정 사항 {#fixes-9}

- Reference Tables 프로세서의 경합 상태 문제를 수정하여 Worker 종료 중에 버퍼링된 이벤트가 삭제되는 것을 방지했습니다.
- 버스트 트래픽과 Generate Metrics 프로세서의 메트릭을 더 효과적으로 처리하도록 Live Capture를 업데이트했습니다.
- 이제 Worker는 내장된 Remote Config 신뢰 루트 메타데이터를 새로 고친 후 시작할 때 `Root metadata expired` 또는 `potential freeze attack`을 로그에 기록하지 않습니다.
- Splunk HEC 소스는 이제 인증 헤더가 없거나 유효하지 않아 인증에 실패하면 오류 로그 및 메트릭에서 `authentication_failed`를 `error_type`으로 출력합니다.
- Datadog Logs 목적지 상태 검사 엔드포인트 계산을 수정하여 인테이크 엔드포인트에서 API URL을 파생할 때 `us3.`, `us5.`, `ap1.`과 같은 사이트 접두사를 유지하도록 했습니다.
- 디스크 버퍼가 구성된 목적지가 정상적으로 다시 로드되기 전에 `batch.timeout_sec` 동안 중단되는 문제가 해결되었습니다. 이 수정 사항은 파이프라인이 중단된 동안 Worker가 SIGINT를 무시하던 문제도 해결합니다.
- Custom Processor를 수정하여 `else` 또는 `else if` 키워드가 `if` 블록의 닫는 중괄호(`}`) 다음 줄에 올 수 있도록 했습니다.

---

## Worker 버전 2.15.1 {#worker-version-2151}

Worker 버전 2.15.1로 업그레이드하려면 다음 단계를 따르세요.

- Docker: [2.15.1 이미지][43]에 대해 `docker pull` 명령을 실행합니다.
- Kubernetes: [Helm 차트][2] 및 [Worker 업그레이드][37]를 참조합니다.
- APT: `apt-get install observability-pipelines-worker=2.15.1` 명령을 실행합니다.
- RPM: `sudo yum install observability-pipelines-worker-2.15.1` 명령을 실행합니다.

Worker 버전 2.15.1에서는 다음 기능에 액세스할 수 있습니다.

#### 새로운 기능 {#new-features-5}

- 이제 Custom Processor에서 `to_entries` 및 `from_entries` 함수를 지원하여 객체와 키-값 쌍 배열(jq 스타일) 간의 변환이 가능합니다.

#### 개선 사항 {#enhancements-6}

- 이제 Datadog Metrics 목적지가 Datadog API v2 및 sketches 엔드포인트에 zstd 압축을 사용하여 CPU, 메모리 및 대역폭 사용량을 줄입니다.
- Custom Processor의 `flatten` 함수가 이제 특정 키를 평탄화에서 제외하는 선택적 `except` 인수를 허용합니다.

#### 수정 사항 {#fixes-10}

- 버퍼 메트릭 추적의 성능 저하 문제가 해결되었습니다.
- Datadog Agent 소스가 Datadog API v2 리소스의 `device` 태그를 유지하도록 수정했습니다.

---

## Worker 버전 2.15.0 {#worker-version-2150}

Worker 버전 2.15.0으로 업그레이드하려면 다음 단계를 따르세요.

- Docker: [2.15.0 이미지][40]에 대해 `docker pull` 명령을 실행합니다.
- Kubernetes: [Helm 차트][2] 및 [Worker 업그레이드][37]를 참조합니다.
- APT: `apt-get install observability-pipelines-worker=2.15.0` 명령을 실행합니다.
- RPM: `sudo yum install observability-pipelines-worker-2.15.0` 명령을 실행합니다.

Worker 버전 2.15.0에서 다음 항목에 액세스할 수 있습니다.

#### 새로운 기능 {#new-features-6}

- 다음 로그 유형에 대해 새로운 OCSF 매핑이 추가되었습니다.
    - 모든 발견 결과 유형(예: EKS Audit, EC2, Lambda, IAM, DNS)을 `AWS GuardDuty`라는 단일 매핑으로 처리하는 AWS GuardDuty
    - Infoblox NIOS: DNS Activity, DHCP Activity, audit(Authentication and API Activity), port 및 syslog Base Event(Infoblox DNS Query, Infoblox DHCP, Infoblox Audit Authentication, Infoblox Audit API, Infoblox Port)
    - `datetime` 및 `host` 프로필을 사용하는 OCSF 스키마 버전 1.3.0(Authentication, class 3002)으로의 Zscaler ZPA App Connector Status 로그 매핑
    - `datetime`, `host`, `network_proxy` 및 `security_control` 프로필을 사용하는 OCSF 스키마 버전 1.3.0(Network Activity, class 4001)으로의 Zscaler ZPA User Activity 로그 매핑
    - AWS WAF 웹 ACL 로그 `cloud` 및 `security_control` 프로필을 사용하여 WAF 로그 이벤트를 OCSF HTTP Activity(class 4002)로 변환합니다.
    - `datetime` 및 `host` 프로필을 사용하는 OCSF 스키마 버전 1.3.0(Authentication, class 3002)으로의 Zscaler ZPA User Status 로그 매핑
- 이제 OpenTelemetry 소스에서 메트릭 파이프라인을 지원합니다.
- 이제 메트릭 파이프라인에서 Elasticsearch 목적지를 사용할 수 있습니다.
- 이제 Custom Processor에서 `parse_yaml` 함수를 사용할 수 있습니다. 이 함수는 [YAML 1.1 사양][41]에 따라 YAML을 구문 분석합니다.
- 이제 Enrichment Table 파일 옵션은 조회 키 소스로 이벤트 필드 경로나 메타데이터 시크릿을 허용하는 `field` 옵션을 지원합니다. 이전 버전과의 호환성을 위해 일반 텍스트가 지원됩니다.
    - 명시적 이벤트 경로 예시:
        - Observability Pipelines 간소화된 구문: `field: {event: "message"}`
        - Custom Processor용 VRL 구문: `field: {vrl: ".message"}`
    - 메타데이터 시크릿 참조 예시: `field: {secret: "splunk_hec_token"}`
    - 일반 문자열(이전 버전과의 호환성을 위해):
        - Observability Pipelines 간소화된 구문: `field: "message"`
        - Custom Processor용 VRL 구문: `field: ".message"`

#### 개선 사항 {#enhancements-7}

- Amazon S3 소스에서 이제 압축된 데이터를 허용합니다.
- Elasticsearch 목적지에 `auto_routing`, `compression`, `id_key`, `pipeline`, `request_retry_partial`, `sync_fields` 및 `tls` 옵션이 새로 추가되었습니다.
- 객체 배열 소스 필드를 OCSF 객체 배열 목적지로 매핑하는 기능이 이제 지원됩니다.
- Datadog Metrics 목적지는 이제 기본적으로 Datadog series v2 엔드포인트(`/api/v2/series`)를 사용합니다.
- Enrichment Table 프로세서의 GeoIP 옵션에 이제 조회 결과와 연결된 CIDR 네트워크를 포함하는 네트워크 필드가 포함됩니다. 네트워크 필드는 모든 데이터베이스 유형(City, ISP/ASN, Connection-Type, Anonymous-IP)에서 사용할 수 있습니다.
- Custom Processor에 이제 값 배열을 CSV 형식 문자열로 인코딩하는 `encode_csv` 함수가 있습니다. 이는 `parse_csv` 함수의 역함수이며 선택적 단일 바이트 구분 기호(기본값은 `,`)를 지원합니다.
- 필드 이름이 이제 `foo."bar.baz"`와 같은 `.`를 지원합니다.

#### 수정 사항 {#fixes-11}

- 버퍼 사용률 메트릭 추적의 정확도가 향상되었습니다.
- Custom Processor에서 `floor`, `md5`, `parse_key_value`, `precision` 및 `seahash`의 잘못된 파라미터 유형이 수정되었습니다.

---

## Worker 버전 2.14.1 {#worker-version-2141}

Worker 버전 2.14.1로 업그레이드하려면 다음 단계를 따르세요.

- Docker: `docker pull` 명령을 [2.14.1 이미지][42]에 대해 실행합니다.
- Kubernetes: [Helm 차트][2] 및 [Worker 업그레이드][37]를 참조합니다.
- APT: `apt-get install observability-pipelines-worker=2.14.1` 명령을 실행합니다.
- RPM: `sudo yum install observability-pipelines-worker-2.14.1` 명령을 실행합니다.

Worker 버전 2.14.1에서는 다음 항목을 사용할 수 있습니다.

#### 수정 사항 {#fixes-12}

- 프로세서 필드의 빈 경로를 처리하는 방식을 수정했습니다. 예를 들어, Parse JSON 프로세서가 `.` 값을 가진 `Field to parse JSON on`을 처리하는 방식입니다.

---

## Worker 버전 2.14.0 {#worker-version-2140}

Worker 버전 2.14.0으로 업그레이드하려면 다음 단계를 따르세요.

- Docker: `docker pull` 명령을 [2.14.0 이미지][38]에 대해 실행합니다.
- Kubernetes: [Helm 차트][2] 및 [Worker 업그레이드][37]를 참조합니다.
- APT: `apt-get install observability-pipelines-worker=2.14.0` 명령을 실행합니다.
- RPM: `sudo yum install observability-pipelines-worker-2.14.0` 명령을 실행합니다.

Worker 버전 2.14.0에서는 다음 항목을 사용할 수 있습니다.

#### 새로운 기능 {#new-features-7}

- Palo Alto Networks 위협 이벤트에 대한 OCSF 매핑이 추가되었습니다.
- 데이터베이스 소스가 시간 초과 관련 변경 사항으로 업데이트되었습니다.
- `component_latency_seconds` 히스토그램 및 `component_latency_mean_seconds` 게이지 내부 메트릭이 추가되었습니다. 메트릭은 이벤트가 단일 프로세서에서 소비한 시간을 기준으로 하며, 프로세서 버퍼에 있는 시간도 포함합니다.

#### 개선 사항 {#enhancements-8}

- Enrichment Table 오류 보고는 이제 Reference Tables 메트릭을 사용하여 유사한 로그 수를 줄입니다.
- Splunk HEC 목적지가 이제 이벤트에서 인덱스 필드 추출을 지원합니다.
- 이제 OCSF 매퍼에는 일치하지 않는 필드를 유지하는 옵션이 있습니다.
- Enrichment Table 프로세서에서 Reference Table에 없는 항목의 로컬 캐시 보존 시간이 늘어났습니다. 보존 시간은 기존 10분에서 30분으로 늘어났습니다.
- Database Source의 SQL 유효성 검사가 개선되었습니다.
- Sensitive Data Scanner 라이브러리에 PII, 자격 증명 및 금융 데이터를 위한 새로운 기본 제공 스캔 규칙과 업데이트된 기본 제공 스캔 규칙이 추가되었습니다. 사소한 버그도 수정되었습니다.
- 이제 `observability-pipelines-worker top` 명령에 스크롤, 정렬 및 필터링을 위한 새로운 키 바인딩이 추가되었습니다.
- Datadog Logs 목적지가 압축 없음 대신 `zstd` 압축을 기본값으로 사용하도록 업데이트되었습니다.
- 이제 Datadog Agent 소스 주소에 대한 환경 변수를 구성할 수 있습니다.

#### 수정 사항 {#fixes-13}

- Remote Configuration 폴링에 성공한 후에도 오류 상태가 지속되던 버그를 수정했습니다.
- 실제 버퍼 사용률을 올바르게 기록하도록 버퍼 사용률 메트릭을 수정했습니다.
- 메모리 버퍼를 닫는 작업과 진행 중인 전송 작업 사이의 경합 상태로 인해 이벤트 손실이 발생할 수 있던 Worker 종료 문제를 수정했습니다.
- Generate Metrics 프로세서는 이제 집계된 히스토그램 메트릭과 집계된 요약 메트릭을 올바르게 처리합니다.
- Live Capture가 이제 Split Array 프로세서에서 하위 이벤트를 지원합니다.
- 메모리 부족(OOM) 및 속도 제한 오류를 방지하기 위해 Reference Tables의 버퍼 크기와 요청 빈도를 줄였습니다.
- Reference Tables 프로세서가 이제 비어 있거나 공백만 있는 조회 키를 거부하며 정수 키를 지원합니다.

---

## Worker 버전 2.13.2 {#worker-version-2132}

Worker 버전 2.13.2로 업그레이드하려면 다음 단계를 따르세요.

- Docker: [2.13.2 이미지][39]에 대해 `docker pull` 명령을 실행합니다.
- Kubernetes: [Helm 차트][2] 및 [Worker 업그레이드][37]를 참조합니다.
- APT: `apt-get install observability-pipelines-worker=2.13.2` 명령을 실행합니다.
- RPM: `sudo yum install observability-pipelines-worker-2.13.2` 명령을 실행합니다.

Worker 버전 2.13.2에서는 다음 항목을 사용할 수 있습니다.

#### 수정 사항 {#fixes-14}

- 객체와 매칭되도록 `exists` 및 `missing` 쿼리를 수정했습니다.

---

## Worker 버전 2.13.1 {#worker-version-2131}

Worker 버전 2.13.1로 업그레이드하려면 다음 단계를 따르세요.

- Docker: [2.13.1 이미지][22]에 대해 `docker pull` 명령을 실행합니다.
- Kubernetes: [Helm 차트][2] 및 [Worker 업그레이드][37]를 참조합니다.
- APT: `apt-get install observability-pipelines-worker=2.13.1` 명령을 실행합니다.
- RPM: `sudo yum install observability-pipelines-worker-2.13.1` 명령을 실행합니다.

Worker 버전 2.13.1에서는 다음 항목을 사용할 수 있습니다.

#### 수정 사항 {#fixes-15}

- 모든 프로세서가 잘못된 필터 쿼리 구문을 정상적으로 처리하도록 업데이트되었습니다.

---

## Worker 버전 2.13.0 {#worker-version-2130}

Worker 버전 2.13.0으로 업그레이드하려면 다음 단계를 따르세요.

- Docker: [2.13.0 이미지][23]에 대해 `docker pull` 명령을 실행합니다.
- Kubernetes: [Helm 차트][2] 및 [Worker 업그레이드][37]를 참조합니다.
- APT: `apt-get install observability-pipelines-worker=2.13.0` 명령을 실행합니다.
- RPM: `sudo yum install observability-pipelines-worker-2.13.0` 명령을 실행합니다.

Worker 버전 2.13.0에서는 다음 기능을 사용할 수 있습니다.

#### 새로운 기능 {#new-features-8}

- 메트릭용 [Custom Processor][24]: VRL을 사용하여 메트릭 이벤트를 변환합니다.
- [Secrets Management][31]: Observability Pipelines는 Datadog Secrets Management를 사용하여 시크릿을 검색할 수 있습니다.
- [Live capture][25]는 메트릭 파이프라인에서 사용할 수 있습니다.
- [Enrichment Tables][28] 프로세서는 Reference Tables의 데이터셋을 사용할 수 있습니다.

#### 개선 사항 {#enhancements-9}

- [디스크 버퍼][18]는 버퍼가 가득 차면 로그를 삭제하도록 업데이트되었습니다.
- Dedupe 프로세서가 캐시 크기를 구성할 수 있도록 업데이트되었습니다.
- Datadog Agent 소스가 요청 시간 초과를 구성할 수 있도록 업데이트되었습니다.
- 소스 버퍼가 업데이트되어 다음 메트릭을 사용해 버퍼 사용률을 기록합니다.
    - `source_buffer_max_byte_size`
    - `source_buffer_max_event_size`
    - `source_buffer_utilization`
    - `source_buffer_utilization_level`
- 프로세서 버퍼가 업데이트되어 다음 메트릭을 사용해 버퍼 사용률을 기록합니다.
    - `transform_buffer_max_byte_size`
    - `transform_buffer_max_event_size`
    - `transform_buffer_utilization`
    - `transform_buffer_utilization_level`
- TLS 구현이 업데이트되어 자격 증명을 FIPS를 준수하는 PEM 형식으로 저장합니다.

#### 수정 사항 {#fixes-16}

- Live Capture가 업데이트되었으며 관련 버그도 수정되었습니다.
- 하이픈으로 연결된 세그먼트를 처리할 때 발생하던 Search Syntax 버그를 수정했습니다.
- UDP 모드의 syslog 소스는 TCP 모드와 마찬가지로 표준 `component_received` 메트릭을 내보냅니다.
    - `component_received_events_total`
    - `component_received_event_bytes_total`
    - `component_received_bytes_total`

---

## Worker 버전 2.12.0 {#worker-version-2120}

Worker 버전 2.12.0으로 업그레이드하려면 다음 단계를 따르세요.

- Docker: [2.12.0 이미지][27]에 대해 `docker pull` 명령을 실행합니다.
- Kubernetes: [Helm 차트][2] 및 [Worker 업그레이드][37]를 참조합니다.
- APT: `apt-get install observability-pipelines-worker=2.12.0` 명령을 실행합니다.
- RPM: `sudo yum install observability-pipelines-worker-2.12.0` 명령을 실행합니다.

Worker 버전 2.12.0에서는 다음 항목을 사용할 수 있습니다.

#### 새로운 기능 {#new-features-9}

- 메트릭 파이프라인용 [HTTP 목적지][29]: 메트릭을 HTTP 클라이언트 엔드포인트로 라우팅합니다.
- [MySQL Source][30]: MySQL 데이터베이스에서 Observability Pipelines로 로그를 전송합니다.

#### 개선 사항 {#enhancements-10}

- HTTP Client 소스 및 목적지가 사용자 지정 인증 전략을 설정할 수 있도록 업데이트되었습니다.
- 메트릭 필터 프로세서가 `kind` 및 `value`를 기준으로 메트릭을 필터링하도록 업데이트되었습니다.
- 대상 이벤트만 라우팅하고 처리하는 프로세서 그룹이 처리 오버헤드를 줄이도록 업데이트되었습니다.
- Datadog Agent 소스가 시간 초과를 지원하고 `component_timed_out_events_total` 및 `component_timed_out_requests_total` 메트릭 값을 증가시키도록 업데이트되었습니다.

#### 수정 사항 {#fixes-17}

- Amazon S3 목적지가 업데이트되어 `message` 필드가 항상 문자열이 되도록 보장하며, 필요한 경우 JSON 인코딩을 수행합니다.
- Worker 로그가 올바르게 보고되도록 Worker 버그를 수정했습니다.
- Datadog 아카이브로 로그를 보낼 때 `hostname`의 이름이 `host`로 변경됩니다.
- 메트릭 소스의 경우, Worker는 Datadog Agent가 보낸 키를 무시하고 인증을 위해 자체적으로 보유한 Datadog 키 사본을 사용하도록 업데이트되어 오래된 키가 사용되는 것을 방지합니다.
- Worker는 Live Capture로 이벤트를 게시할 때 환경 변수(예: `DD_PROXY_HTTPS` 환경 변수) 또는 부트스트랩 파일에 구성된 프록시 설정을 사용합니다.

---

## Worker Version 2.11.0 {#worker-version-2110}

Worker 버전 2.11.0으로 업그레이드하려면 다음 단계를 따르세요.

- Docker: [2.11.0 이미지][1]에 대해 `docker pull` 명령을 실행합니다.
- Kubernetes: [Helm 차트][2] 및 [Worker 업그레이드][37]를 참조합니다.
- APT: `apt-get install observability-pipelines-worker=2.11.0` 명령을 실행합니다.
- RPM: `sudo yum install observability-pipelines-worker-2.11.0` 명령을 실행합니다.

<div class="alert alert-info">Worker 2.10 이하 버전을 실행 중인 파이프라인의 경우:<br>- Worker 2.11로 업그레이드한 후에도 프로세서 필터 쿼리는 계속해서 레거시 검색 구문을 사용합니다.<br>- 필터 쿼리를 새로운 Search Syntax에 맞게 수동으로 업데이트해야 합니다.<br>- 그런 다음 UI에서 <b>New Search Syntax</b> 토글을 활성화하거나, <code>use_legacy_search_syntax</code> 을 <code>false</code> API 또는 Terraform을 사용하여 설정합니다.<br><br>자세한 내용은 <a href="https://docs.datadoghq.com/observability_pipelines/guide/upgrade_your_filter_queries_to_the_new_search_syntax/">필터 쿼리를 New Search Syntax로 업그레이드</a>를 참조하세요.</a></div>

버전 2.11.0에서는 다음 기능에 액세스할 수 있습니다.

#### 새로운 기능 {#new-features-10}

- Sensitive Data Scanner 프로세서를 위한 100개 이상의 기본 제공 규칙이 추가되었습니다. 이러한 규칙은 개인 식별 정보(PII) 및 액세스 키 정보를 마스킹합니다.
- 업데이트된 [Search Syntax][3]의 주요 기능:
    - 배열 역참조
    - 로그 메시지 내에서 대소문자를 구분하지 않고 검색
    - `@` 기호를 사용하지 않고 로그 속성을 결정론적으로 지정

---

## Worker 버전 2.10.0 {#worker-version-2100}

Worker 버전 2.10.0으로 업그레이드하려면 다음 단계를 따르세요.

- Docker: [2.10.0 이미지][4]에 대해 `docker pull` 명령을 실행합니다.
- Kubernetes: [Helm 차트][2] 및 [Worker 업그레이드][37]를 참조합니다.
- APT: `apt-get install observability-pipelines-worker=2.10.0` 명령을 실행합니다.
- RPM: `sudo yum install observability-pipelines-worker-2.10.0` 명령을 실행합니다.

Worker 버전 2.10.0에서는 다음 항목을 사용할 수 있습니다.

#### 새로운 기능 {#new-features-11}

- [Kafka 목적지][5]: Observability Pipelines에서 Kafka 토픽으로 로그를 전송합니다.
- 새로 추가되거나 업데이트된 [Custom Processor 함수][6]:
    - `pop` 함수는 배열에서 마지막 항목을 제거합니다.
    - IP 주소 암호화를 위한 암호화 함수인 `encrypt_ip` 및 `decrypt_ip`
        - 이 함수들은 IPCrypt 사양을 사용하며 두 가지 암호화 모드로 IPv4 및 IPv6 주소를 모두 지원합니다.
            - aes128(IPCrypt 결정론적 암호화, 16바이트 키)
            - pfx(IPCryptPfx, 32바이트 키)
            - 두 알고리즘 모두 형식을 보존하고(출력은 유효한 IP 주소임) 결정론적입니다.
    - `xxhash` 함수는 `xxh32`, `xxh64`, `xxh3_64` 및 `xxh3_128` 해싱 알고리즘을 구현합니다.
    - `parse_aws_alb_log` 함수에 선택 사항인 `strict_mode` 파라미터가 추가되었습니다.
        - `strict_mode`가 `false`로 설정되면 구문 분석 도구는 AWS ALB 로그에 새로 추가되거나 끝에 붙은 필드 때문에 실패하지 않고 해당 필드를 무시합니다.
        - 현재 동작을 유지하기 위해 `true`를 기본값으로 사용합니다.
    - [메트릭 파이프라인][32]:
        - [Datadog Agent 소스][33]: Datadog Agent에서 Observability Pipelines로 메트릭을 전송하여 처리합니다.
        - [필터 프로세서][35]: 처리할 메트릭을 필터링합니다.
        - [태그 프로세서][36]: 메트릭에 특정 태그를 포함하거나 제외합니다.
        - [Datadog Metrics 목적지][34]: 처리된 메트릭을 Datadog으로 전송합니다.

#### 개선 사항 {#enhancements-11}

- Custom Processor의 성능이 향상되었습니다.
- Worker가 오래된 키를 사용하지 않도록 Datadog Agent에서 전송된 키를 무시하고 자체적으로 보유한 Datadog 키 사본을 인증에 사용하도록 업데이트되었습니다.
- `validate_json_schema` 함수를 사용하는 사용자 지정 함수에서 JSON 스키마를 검증할 때 오류 보고 기능이 개선되었습니다.

#### 수정 사항 {#fixes-18}

- 올바른 로그를 제외하도록 그룹 수준 필터링 로직을 수정했습니다.

---

## Worker 버전 2.9.1 {#worker-version-291}

Worker 버전 2.9.1로 업그레이드하려면 다음 단계를 따르세요.

- Docker: `docker pull` 명령을 실행하여 [2.9.1 이미지][7]를 가져옵니다.
- Kubernetes: [Helm 차트][2] 및 [Worker 업그레이드][37]를 참조합니다.
- APT: `apt-get install observability-pipelines-worker=2.9.1` 명령을 실행합니다.
- RPM: `sudo yum install observability-pipelines-worker-2.9.1` 명령을 실행합니다.

Worker 버전 2.9.1에서는 다음 항목을 사용할 수 있습니다.

#### 수정 사항 {#fixes-19}

- Microsoft Sentinel 목적지는 Azure Logs Ingestion API를 사용하여 로그를 읽을 때 배치 크기가 1MB로 제한됩니다. 제한 크기는 [Azure 문서][8]를 기준으로 결정되었습니다.

---

## Worker 버전 2.9.0 {#worker-version-290}

Worker 버전 2.9.0으로 업그레이드하려면 다음 단계를 따르세요.

- Docker: `docker pull` 명령을 실행하여 [2.9.0 이미지][9]를 가져옵니다.
- Kubernetes: [Helm 차트][2] 및 [Worker 업그레이드][37]를 참조합니다.
- APT: `apt-get install observability-pipelines-worker=2.9.0` 명령을 실행합니다.
- RPM: `sudo yum install observability-pipelines-worker-2.9.0` 명령을 실행합니다.

Worker 버전 2.9.0에서 다음 기능을 사용할 수 있습니다.

#### 새로운 기능 {#new-features-12}

- [OpenTelemetry Collector 소스][10]: OpenTelemetry Collector에서 Observability Pipelines로 로그를 수집합니다.
- [Datadog BYOC Logs 목적지][11]: 로그를 Datadog BYOC Logs 목적지로 라우팅합니다.
- [Google Pub/Sub 목적지][12]: Observability Pipelines에서 Google Pub/Sub 메시징 시스템으로 로그를 전송합니다.
- 하버사인 거리와 방위각을 계산하기 위한 `haversine` 사용자 지정 함수

#### 개선 사항 {#enhancements-12}

- Observability Pipelines Worker의 내부 로그가 업데이트되어 Datadog API 키를 부분적으로 마스킹(처음 28자만)함으로써 API 키 관련 문제를 조사하는 데 도움을 줍니다.
- Remote Configuration 전달 시간이 단축되었습니다.
- `parse_cef` 및 `parse_syslog` 사용자 지정 함수의 구문 분석 기능이 개선되었습니다.

---

## Worker 버전 2.8.1 {#worker-version-281}

Worker 버전 2.8.1로 업그레이드하려면 다음 단계를 따르세요.

- Docker: `docker pull` 명령을 실행하여 [2.8.1 이미지][13]를 가져옵니다.
- Kubernetes: [Helm 차트][2] 및 [Worker 업그레이드][37]를 참조합니다.
- APT: `apt-get install observability-pipelines-worker=2.8.1` 명령을 실행합니다.
- RPM: `sudo yum install observability-pipelines-worker-2.8.1` 명령을 실행합니다.

Worker 버전 2.8.1에서는 다음 항목을 사용할 수 있습니다.

#### 수정 사항 {#fixes-20}

- HTTP Client 소스의 권한 부여 전략이 수정되었습니다.

---

## Worker 버전 2.8.0 {#worker-version-280}

Worker 버전 2.8.0으로 업그레이드하려면 다음 단계를 따르세요.

- Docker: `docker pull` 명령을 실행하여 [2.8.0 이미지][14]를 가져옵니다.
- Kubernetes: [Helm 차트][2] 및 [Worker 업그레이드][37]를 참조합니다.
- APT: `apt-get install observability-pipelines-worker=2.8.0` 명령을 실행합니다.
- RPM: `sudo yum install observability-pipelines-worker-2.8.0` 명령을 실행합니다.

Worker 버전 2.8.0에서는 다음 항목을 사용할 수 있습니다.

#### 새로운 기능 {#new-features-13}

- 모든 소스 및 목적지가 사용자 지정 환경 변수를 지원하도록 업데이트되었습니다.

#### 개선 사항 {#enhancements-13}

- Elasticsearch 목적지의 [인덱싱 전략][21]이 데이터 스트림을 포함하도록 업데이트되었습니다.
- HTTP Client 목적지가 템플릿 구문을 지원합니다.

#### 수정 사항 {#fixes-21}

- HTTP Server 소스의 TLS 활성화 기능이 수정되었습니다.
- Worker 상태 메트릭이 수정되었습니다.
- OpenSearch의 기본 인증 기능이 수정되었습니다.

---

## Worker 버전 2.7.0 {#worker-version-270}

Worker 버전 2.7.0으로 업그레이드하려면 다음 단계를 따르세요.

- Docker: `docker pull` 명령을 실행하여 [2.7.0 이미지][15]를 가져옵니다.
- Kubernetes: [Helm 차트][2] 및 [Worker 업그레이드][37]를 참조합니다.
- APT: `apt-get install observability-pipelines-worker=2.7.0` 명령을 실행합니다.
- RPM: `sudo yum install observability-pipelines-worker-2.7.0` 명령을 실행합니다.

Worker 버전 2.7.0에서는 다음 항목을 사용할 수 있습니다.

#### 새로운 기능 {#new-features-14}

- [HTTP Client 목적지][16]: 로깅 플랫폼 또는 SIEM과 같은 HTTP Client로 로그를 전송합니다.
- [Processor Groups][17]: 프로세서를 논리적 그룹으로 구성하여 관리합니다.
- 목적지에서 [디스크 및 메모리][18] 버퍼링 옵션을 사용할 수 있습니다.

#### 개선 사항 {#enhancements-14}

- `decode_lz4` 사용자 지정 함수가 업데이트되어 `lz4` 프레임 데이터 압축 해제를 지원합니다.
- Azure Blob Storage 및 Google Cloud Storage 아카이브 목적지의 접두사 필드가 템플릿 구문을 지원합니다.
- Splunk HEC 목적지에 사용자 지정 환경 변수가 있습니다.
- 샘플 프로세서에 선택 사항인 [`group_by` 파라미터][20]가 있습니다.

#### 수정 사항 {#fixes-22}

- Datadog Logs 목적지의 기본 압축 방식이 `zstd`로 업데이트되었으며, 이는 Datadog Agent의 기본 압축 방식과 일치합니다.
- Amazon S3, Google Cloud Storage 및 Azure Blob Storage 목적지에서 로그 타임스탬프를 올바르게 해석하도록 수정했습니다.
- 사용자 지정 OCSF 매퍼의 성능이 향상되었습니다.
- 필터 프로세서에 이벤트를 다음 프로세서로 전달하는 플래그 로직이 활성화되었습니다.

[1]: https://hub.docker.com/r/datadog/observability-pipelines-worker/tags?name=2.11
[2]: https://github.com/DataDog/helm-charts/tree/main/charts/observability-pipelines-worker#observability-pipelines-worker
[3]: /ko/observability_pipelines/search_syntax/logs/
[4]: https://hub.docker.com/r/datadog/observability-pipelines-worker/tags?name=2.10
[5]: /ko/observability_pipelines/destinations/kafka/
[6]: /ko/observability_pipelines/processors/custom_processor/#custom-functions
[7]: https://hub.docker.com/r/datadog/observability-pipelines-worker/tags?name=2.9.1
[8]: https://learn.microsoft.com/en-us/azure/azure-monitor/fundamentals/service-limits#logs-ingestion-api
[9]: https://hub.docker.com/r/datadog/observability-pipelines-worker/tags?name=2.9.0
[10]: /ko/observability_pipelines/sources/opentelemetry/
[11]: /ko/observability_pipelines/destinations/datadog_byoc_logs/
[12]: /ko/observability_pipelines/destinations/google_pubsub/
[13]: https://hub.docker.com/r/datadog/observability-pipelines-worker/tags?name=2.8.1
[14]: https://hub.docker.com/r/datadog/observability-pipelines-worker/tags?name=2.8.0
[15]: https://hub.docker.com/r/datadog/observability-pipelines-worker/tags?name=2.7.0
[16]: /ko/observability_pipelines/destinations/http_client/
[17]: /ko/observability_pipelines/processors/#processor-groups
[18]: /ko/observability_pipelines/scaling_and_performance/buffering_and_backpressure/#destination-buffers
[20]: /ko/observability_pipelines/processors/sample/#group-by-example
[21]: /ko/observability_pipelines/destinations/elasticsearch/#set-up-the-destination
[22]: https://hub.docker.com/r/datadog/observability-pipelines-worker/tags?name=2.13.1
[23]: https://hub.docker.com/r/datadog/observability-pipelines-worker/tags?name=2.13.0
[24]: /ko/observability_pipelines/processors/custom_processor
[25]: /ko/observability_pipelines/configuration/live_capture/
[27]: https://hub.docker.com/r/datadog/observability-pipelines-worker/tags?name=2.12.0
[28]: /ko/observability_pipelines/processors/enrichment_table/
[29]: /ko/observability_pipelines/destinations/http_client/
[30]: /ko/observability_pipelines/sources/mysql/
[31]: /ko/observability_pipelines/configuration/secrets_management
[32]: /ko/observability_pipelines/configuration/set_up_pipelines/?tab=metrics#set-up-a-pipeline-in-the-ui
[33]: /ko/observability_pipelines/sources/datadog_agent/?tab=metrics
[34]: /ko/observability_pipelines/destinations/datadog_metrics/?tab=secretsmanagement
[35]: /ko/observability_pipelines/processors/filter/?tab=metrics
[36]: /ko/observability_pipelines/processors/tag_allow_block_list/
[37]: /ko/observability_pipelines/configuration/install_the_worker/?interface=ui&platform=kubernetes&secrets_source=secrets_management#upgrade-the-worker-4
[38]: https://hub.docker.com/r/datadog/observability-pipelines-worker/tags?name=2.14.0
[39]: https://hub.docker.com/r/datadog/observability-pipelines-worker/tags?name=2.13.2
[40]: https://hub.docker.com/r/datadog/observability-pipelines-worker/tags?name=2.15.0
[41]: https://yaml.org/spec/1.1/
[42]: https://hub.docker.com/r/datadog/observability-pipelines-worker/tags?name=2.14.1
[43]: https://hub.docker.com/r/datadog/observability-pipelines-worker/tags?name=2.15.1
[44]: https://hub.docker.com/r/datadog/observability-pipelines-worker/tags?name=2.16.0
[45]: https://hub.docker.com/r/datadog/observability-pipelines-worker/tags?name=2.16.1
[46]: https://hub.docker.com/r/datadog/observability-pipelines-worker/tags?name=2.17.0
[47]: /ko/observability_pipelines/destinations/databricks/
[48]: https://hub.docker.com/r/datadog/observability-pipelines-worker/tags?name=2.18.0
[49]: https://hub.docker.com/r/datadog/observability-pipelines-worker/tags?name=2.19.0
[50]: https://hub.docker.com/r/datadog/observability-pipelines-worker/tags?name=2.20.0
[51]: https://hub.docker.com/r/datadog/observability-pipelines-worker/tags?name=2.20.2
[52]: https://hub.docker.com/r/datadog/observability-pipelines-worker/tags?name=2.20.3
[53]: https://hub.docker.com/r/datadog/observability-pipelines-worker/tags?name=2.20.4
[54]: https://hub.docker.com/r/datadog/observability-pipelines-worker/tags?name=2.21.0