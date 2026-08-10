---
aliases:
- /ko/logs/processing/pipelines/
description: Datadog 파이프라인 및 프로세서를 사용하여 로그 구문 분석, 보강 및 관리
further_reading:
- link: /logs/log_configuration/processors
  tag: 설명서
  text: 사용 가능한 프로세서 전체 목록 참조
- link: /logs/logging_without_limits/
  tag: 설명서
  text: Logging without Limits*
- link: /logs/explorer/
  tag: 설명서
  text: 로그 탐색 방법 알아보기
- link: /logs/troubleshooting/
  tag: 설명서
  text: 로그 문제 해결
- link: https://learn.datadoghq.com/courses/integration-pipelines
  tag: 학습 센터
  text: 통합 파이프라인을 사용하여 로그를 즉시 처리
- link: https://learn.datadoghq.com/courses/log-pipelines
  tag: 학습 센터
  text: 로그 파이프라인 구축 및 관리
- link: https://www.datadoghq.com/blog/monitor-cloudflare-zero-trust/
  tag: 블로그
  text: Datadog Cloud SIEM으로 Cloudflare Zero Trust 모니터링
- link: https://www.datadoghq.com/blog/monitor-1password-datadog-cloud-siem/
  tag: 블로그
  text: Datadog Cloud SIEM으로 1Password 모니터링
- link: https://www.datadoghq.com/blog/ocsf-common-data-model/
  tag: 블로그
  text: Datadog Cloud SIEM에서 OCSF Common Data Model을 사용하여 데이터 정규화
- link: https://www.datadoghq.com/blog/cloud-siem-ocsf-processor
  tag: 블로그
  text: Datadog의 OCSF 프로세서를 사용하여 Cloud SIEM의 모든 로그 정규화
- link: https://www.datadoghq.com/blog/internal-monitoring-email-delivery
  tag: 블로그
  text: Datadog을 사용해 이메일 전송 시스템에 대한 종합적이고 세분화된 가시성을 파악하는 방법
title: 파이프라인
---
## 개요 {#overview}

<div class="alert alert-info">이 설명서에 개괄적으로 소개된 파이프라인 및 프로세서는 클라우드 기반 로깅 환경에 국한됩니다. 온프레미스 로그를 집계, 처리 및 라우팅하려면 <a href="https://docs.datadoghq.com/observability_pipelines/configuration/set_up_pipelines/">Observability Pipelines</a>를 참조하세요.</div>

Datadog은 JSON 형식의 로그를 자동으로 [구문 분석][1]합니다. 그런 다음 로그를 처리 파이프라인을 통해 전송함으로써 모든 로그(원시 및 JSON)의 가치를 높일 수 있습니다. 파이프라인은 다양한 형식에서 로그를 취해 Datadog에서 공통 형식으로 변환합니다. 로그 파이프라인 및 처리 전략을 구현하면 조직에 [속성 명명 규칙][2]이 도입되므로 유익합니다.

파이프라인을 사용하면 [프로세서][3]를 통해 로그를 순차적으로 연결하여 구문 분석하고 보강합니다. 이렇게 하면 반구조화된 텍스트에서 [패싯][4]으로 다시 사용할 의미 있는 정보 또는 속성이 추출됩니다. 파이프라인을 통과하여 수신되는 각 로그는 모든 파이프라인 필터에 대하여 테스트됩니다. 로그가 필터와 일치하면 모든 프로세서가 순차적으로 적용된 이후에 다음 파이프라인으로 넘어갑니다.

파이프라인 및 프로세서는 모든 유형의 로그에 적용될 수 있습니다. 로깅 구성을 변경하거나 서버 측 처리 규칙에 대한 변경 사항을 배포할 필요가 없습니다. 모든 것을 [파이프라인 구성 페이지][5] 안에서 구성할 수 있습니다.

**참고**: Log Management 솔루션을 최적의 형태로 사용하려면 Datadog에서는 **파이프라인당 프로세서 최대 20개** 및 [Grok 프로세서][6] 내에서 **구문 분석 규칙 10개**를 사용할 것을 권장합니다. Datadog에는 Datadog의 서비스 성능에 영향을 미칠 수 있고 성능이 저조한 구문 분석 규칙, 프로세서 또는 파이프라인을 비활성화할 권리가 있습니다.

## 파이프라인 권한 {#pipeline-permissions}

파이프라인은 [Granular Access Control][7]을 사용하여 누가 파이프라인 및 프로세서 구성을 편집할 수 있는지 관리합니다. 다시 말해 권한을 **역할**, **개별 사용자**, **팀**에 할당할 수 있어 파이프라인 리소스에 대한 정밀한 제어가 보장됩니다. 제한 사항이 없는 파이프라인은 무제한으로 간주하며, 이는 `logs_write_pipelines` 권한이 있는 모든 사용자가 파이프라인 및 그 프로세서를 수정할 수 있다는 의미입니다.

{{< img src="/logs/processing/pipelines/pipeline_permissions_grace.png" alt="Datadog에서 파이프라인 권한 구성" style="width:80%;" >}}

관리자는 각 파이프라인에 대하여 다음과 같은 편집 범위를 선택할 수 있습니다.

- **편집자**: 지정된 사용자, 팀 또는 역할만 파이프라인 구성 및 프로세서를 편집할 수 있습니다.
- **프로세서 편집자**: 프로세서만(중첩된 파이프라인 포함) 지정된 사용자, 팀 또는 역할이 편집할 수 있습니다. 파이프라인 속성(예: 필터 쿼리 또는 전역 파이프라인 목록에서의 순서)은 아무도 수정할 수 없습니다.

<div class="alert alert-warning">사용자에게 파이프라인의 제한 사항 목록에 대한 액세스 권한을 부여해도 자동으로 <code>logs_write_pipelines</code> 또는 <code>logs_write_processors</code> 권한이 부여되지는 않습니다. 그러한 권한은 관리자가 별도로 부여해야 합니다.</div>

이러한 권한은 [**API**][14] 및 **Terraform**을 통해 프로그래밍 방식으로 관리할 수 있습니다.

## 전처리 {#preprocessing}

JSON 로그의 전처리는 로그가 파이프라인 처리에 진입하기 전에 발생합니다. 전처리는 `timestamp`, `status`, `host`, `service`, `message`와 같은 예약된 속성에 기반하여 일련의 작업을 실행합니다. JSON 로그에 다양한 속성 이름이 있는 경우, 전처리를 사용하여 로그 속성 이름을 예약된 속성 목록에 있는 이름으로 매핑하세요.

JSON 로그 전처리에는 기본 구성이 함께 제공되어 표준 로그 포워더에 사용할 수 있습니다. 이 구성을 편집하여 사용자 지정 또는 특정 로그 전달 접근 방식을 조정하려면:

1. Datadog에서 [Pipelines][8]로 이동하여 [JSON 로그 전처리][9]를 선택합니다.

    **참고:** JSON 로그를 전처리하는 것만이 로그 속성 중 하나를 로그의 `host`로 정의하는 유일한 방법입니다.

2. 예약된 속성을 기반으로 기본 매핑 변경:

{{< tabs >}}
{{% tab "소스" %}}

#### 소스 속성 {#source-attribute}

JSON 형식 로그에 `ddsource` 속성이 포함되어 있으면 Datadog은 그 값을 로그의 소스로 해석합니다. Datadog이 사용하는 것과 동일한 소스 이름을 사용하려면 [통합 파이프라인 라이브러리][1]를 참조하세요.

**참고**: 컨테이너화된 환경이 출처인 로그의 경우, [환경 변수][2]를 사용해야 기본 소스 및 서비스 값을 재정의할 수 있습니다.


[1]: https://app.datadoghq.com/logs/pipelines/pipeline/library
[2]: /ko/agent/docker/log/?tab=containerinstallation#examples
{{% /tab %}}
{{% tab "호스트" %}}

#### 호스트 속성 {#host-attribute}

Datadog Agent 또는 RFC5424 형식을 사용하면 로그에서 호스트 값이 자동으로 설정됩니다. 하지만 JSON 형식 로그 파일에 다음 속성이 포함된 경우, Datadog은 그 값을 로그의 호스트로 해석합니다.

* `host`
* `hostname`
* `syslog.hostname`

**참고**: Kubernetes의 경우, Datadog Agent가 수집한 JSON 로그에 `host`, `hostname` 또는 `syslog.hostname` 키 속성이 포함되어 있으면 해당 값이 해당 로그의 기본 Agent 호스트 이름을 재정의합니다. 따라서 로그가 올바른 호스트의 예상되는 호스트 수준 태그(호스트 수준에서 설정됨)를 상속하지 못합니다. 이 경우, Datadog에서는 이러한 속성을 지워서 로그가 올바른 호스트에 귀속되도록 하는 것을 권장합니다.

{{% /tab %}}
{{% tab "날짜" %}}

#### 날짜 속성 {#date-attribute}

기본적으로 Datadog은 타임스탬프를 생성하여 로그가 수신되면 이를 날짜 속성에 추가합니다. 하지만 JSON 형식 로그 파일에 다음 속성 중 하나가 포함된 경우, Datadog은 그 값을 로그의 공식 날짜로 해석합니다.

* `@timestamp`
* `timestamp`
* `_timestamp`
* `Timestamp`
* `eventTime`
* `date`
* `published_date`
* `syslog.timestamp`

[로그 날짜 리매퍼 프로세서][1]를 설정하여 로그 날짜의 소스로 사용할 대체 속성을 지정합니다.

**참고**: Datadog은 로그 항목의 공식 날짜가 18시간 이전보다 오래된 경우 해당 로그 항목을 거부합니다.

<div class="alert alert-danger">
인식되는 날짜 형식은 <a href="https://www.iso.org/iso-8601-date-and-time-format.html">ISO8601</a>, <a href="https://en.wikipedia.org/wiki/Unix_time">UNIX(밀리초 EPOCH 형식)</a>, <a href="https://www.ietf.org/rfc/rfc3164.txt">RFC3164</a>입니다.
</div>


[1]: /ko/logs/log_configuration/processors/log_date_remapper/
{{% /tab %}}
{{% tab "메시지" %}}

#### 메시지 속성 {#message-attribute}

기본적으로 Datadog은 메시지 값을 로그 항목의 본문으로 수집합니다. 그런 다음 해당 값이 강조 표시되고 [Log Explorer][1]에 표시되어 [전체 텍스트 검색][2]을 위해 인덱싱됩니다. 하지만 JSON 형식 로그 파일에 다음 속성 중 하나가 포함된 경우, Datadog은 그 값을 로그의 공식 메시지로 해석합니다.

* `message`
* `msg`
* `log`

[로그 메시지 리매퍼 프로세서][3]를 설정하여 로그 메시지의 소스로 사용할 대체 속성을 지정합니다.


[1]: /ko/logs/explorer/
[2]: /ko/logs/explorer/#filters-logs
[3]: /ko/logs/log_configuration/processors/log_message_remapper/
{{% /tab %}}
{{% tab "상태" %}}

#### 상태 속성 {#status-attribute}

각 로그 항목은 Datadog 내에서 패싯 검색에 사용할 수 있게 설정된 상태 수준을 지정할 수 있습니다. 하지만 JSON 형식 로그 파일에 다음 속성 중 하나가 포함된 경우, Datadog은 그 값을 로그의 공식 상태로 해석합니다.

* `status`
* `severity`
* `level`
* `syslog.severity`

[로그 상태 리매퍼 프로세서][1]를 설정하여 로그 상태의 소스로 사용할 대체 속성을 지정합니다.

[1]: /ko/logs/log_configuration/processors/log_status_remapper/
{{% /tab %}}
{{% tab "서비스" %}}

#### 서비스 속성 {#service-attribute}

Datadog Agent 또는 RFC5424 형식을 사용하면 로그에서 자동으로 서비스 값이 설정됩니다. 하지만 JSON 형식 로그 파일에 다음 속성이 포함된 경우, Datadog은 그 값을 로그의 서비스로 해석합니다.

* `service`
* `syslog.appname`
* `dd.service`

[로그 서비스 리매퍼 프로세서][1]를 설정하여 로그 서비스의 소스로 사용할 대체 속성을 지정합니다.


[1]: /ko/logs/log_configuration/processors/service_remapper/
{{% /tab %}}
{{% tab "트레이스 ID" %}}

#### 트레이스 ID 속성 {#trace-id-attribute}

기본적으로 [Datadog SDK는 트레이스 및 스팬 ID를 로그에 자동으로 주입][1]할 수 있습니다. 하지만 JSON 형식 로그에 다음 속성이 포함된 경우, Datadog은 그 값을 로그의 `trace_id`로 해석합니다.

* `dd.trace_id`
* `contextMap.dd.trace_id`
* `named_tags.dd.trace_id`
* `trace_id`

[트레이스 ID 리매퍼 프로세서][2]를 설정하여 로그 트레이스 ID의 소스로 사용할 대체 속성을 지정합니다.


[1]: /ko/tracing/other_telemetry/connect_logs_and_traces/
[2]: /ko/logs/log_configuration/processors/trace_remapper/
{{% /tab %}}

{{% tab "스팬 ID" %}}

#### 스팬 ID 속성 {#span-id-attribute}

기본적으로 Datadog SDK는 [스팬 ID를 자동으로 로그에 주입][1]할 수 있습니다. 하지만 JSON 형식 로그에 다음 속성이 포함된 경우, Datadog은 그 값을 로그의 `span_id`로 해석합니다.

* `dd.span_id`
* `contextMap.dd.span_id`
* `named_tags.dd.span_id`
* `span_id`

[1]: /ko/tracing/other_telemetry/connect_logs_and_traces/
{{% /tab %}}

{{< /tabs >}}

## 파이프라인 생성 {#create-a-pipeline}

1. Datadog에서 [Pipelines][8]로 이동합니다.
2. **새 파이프라인**을 선택합니다.
3. Live Tail 미리 보기에서 로그를 선택해 필터를 적용하거나, 직접 필터를 적용합니다. 드롭다운 메뉴에서 필터를 선택하거나 **</>** 아이콘을 선택하여 자체 필터 쿼리를 생성합니다. 필터를 사용하면 파이프라인이 어느 종류의 로그에 적용되는지 제한할 수 있습니다.

    **참고**: 파이프라인 필터링은 파이프라인의 모든 프로세서보다 먼저 적용됩니다. 이 때문에 파이프라인 자체에서 추출되는 속성에 대해서는 필터링할 수 없습니다.

4. 파이프라인에 이름을 지정합니다.
5. (선택 사항) 파이프라인에 설명 및 태그를 추가하여 용도 및 소유권을 나타냅니다. 파이프라인 태그는 로그에 영향을 미치지 않지만, [Pipelines 페이지][8] 내에서 필터링 및 검색에 사용할 수 있습니다.
6. **생성**을 누릅니다.

파이프라인으로 변환된 로그의 예시:

{{< img src="logs/processing/pipelines/log_post_processing.png" alt="파이프라인으로 변환된 로그의 예시" style="width:50%;">}}

### 통합 파이프라인 {#integration-pipelines}

<div class="alert alert-info">
<a href="/integrations/#cat-log-collection">지원되는 통합 목록</a>을 참조하세요.
</div>

특정 소스가 로그를 수집하도록 설정된 경우, 해당 소스에 대하여 통합 처리 파이프라인을 사용할 수 있습니다. 이러한 파이프라인은 **읽기 전용**이며 로그를 해당 소스에 적절한 방식으로 구문 분석합니다. 통합 로그의 경우, 로그 구문 분석을 담당하고 Log Explorer에 해당하는 패싯을 추가하는 통합 파이프라인이 자동으로 설치되어 있습니다.

통합 파이프라인을 조회하려면 [Pipelines][8] 페이지로 이동하세요. 통합 파이프라인을 편집하려면, 해당 파이프라인을 복제한 다음 클론을 편집합니다.

{{< img src="logs/processing/pipelines/cloning_pipeline.png" alt="파이프라인 복제" style="width:80%;">}}

아래 ELB 로그 예시를 참조하세요.

{{< img src="logs/processing/elb_log_post_processing.png" alt="ELB 로그 후처리" style="width:70%;">}}

**참고**: 통합 파이프라인은 삭제할 수 없고, 비활성화만 가능합니다.

### 통합 파이프라인 라이브러리 {#integration-pipeline-library}

Datadog이 제공하는 통합 파이프라인 전체 목록은 [통합 파이프라인 라이브러리][10]를 탐색하여 확인할 수 있습니다. 파이프라인 라이브러리에는 Datadog이 기본적으로 다양한 로그 형식을 어떻게 처리하는지 표시됩니다.

{{< img src="logs/processing/pipelines/integration-pipeline-library.mp4" alt="통합 파이프라인 라이브러리" video=true style="width:80%;">}}

Datadog에서는 통합 파이프라인을 사용하려면 해당하는 로그 `source`를 구성하여 통합을 설치할 것을 권장합니다. Datadog에서 이 소스를 포함한 첫 번째 로그를 수신하고 나면 설치가 자동으로 트리거되며 통합 파이프라인이 처리 파이프라인 목록에 추가됩니다. 로그 소스를 구성하려면 해당하는 [통합 설명서][11]를 참조하세요.

복제 버튼을 사용하여 통합 파이프라인을 복사할 수도 있습니다.

{{< img src="logs/processing/pipelines/clone-pipeline-from-library.mp4" alt="라이브러리에서 파이프라인 복제" video=true style="width:80%;">}}

## 프로세서 또는 중첩된 파이프라인 추가 {#add-a-processor-or-nested-pipeline}

1. Datadog에서 [Pipelines][8]로 이동합니다.
2. 파이프라인 위로 마우스를 가져가 옆에 있는 화살표를 클릭하면 프로세서 및 중첩된 파이프라인이 확장됩니다.
3. **프로세서 추가** 또는 **중첩된 파이프라인 추가**를 선택합니다.

### 프로세서 {#processors}

프로세서는 파이프라인 내에서 실행되어 데이터 구조화 액션을 완료합니다. 앱 내에서 또는 API를 사용해 프로세서 유형별로 프로세서를 추가하고 구성하는 방법을 알아보려면 [프로세서 설명서][3]를 참조하세요.

사용자 지정 날짜 및 시간 형식과 UTC가 아닌 타임스탬프에 필요한 `timezone` 파라미터에 관해 알아보려면 [날짜 구문 분석][12]을 참조하세요.

### 중첩된 파이프라인{#nested-pipelines}

중첩된 파이프라인이란 파이프라인 안의 파이프라인을 말합니다. 중첩된 파이프라인을 사용해 처리를 두 단계로 분할하세요. 예를 들어, 우선 팀과 같은 상위 수준 필터를 사용한 다음 통합, 서비스 또는 기타 모든 태그나 속성에 따라 두 번째 필터링 수준을 사용합니다.

파이프라인에는 중첩된 파이프라인과 프로세서가 포함될 수 있지만 중첩된 파이프라인에는 프로세서만 포함될 수 있습니다.

{{< img src="logs/processing/pipelines/nested_pipeline.png" alt="중첩된 파이프라인" style="width:80%;">}}

파이프라인을 다른 파이프라인으로 이동하여 중첩된 파이프라인으로 만들기:

1. 이동하려는 파이프라인 위로 마우스를 가져간 다음 **이동 대상** 아이콘을 클릭합니다.
1. 원래 파이프라인을 이동하고자 하는 대상 파이프라인을 선택합니다. **참고**: 중첩된 파이프라인을 포함하는 파이프라인은 다른 최상위 위치로만 이동할 수 있습니다. 다른 파이프라인 안으로는 이동할 수 없습니다.
1. **이동**을 클릭합니다.

## 파이프라인 관리 {#manage-your-pipelines}

파이프라인 또는 프로세서가 마지막으로 변경된 것이 언제인지 파악하고, 파이프라인의 수정 정보를 사용하여 해당 변경 사항을 적용한 사용자가 누구인지 알아봅니다. 이 수정 정보를 사용하여 파이프라인을 필터링하고, 파이프라인이 활성화되었는지 읽기 전용인지 등 다른 패싯된 속성으로도 필터링하세요.

{{< img src="logs/processing/pipelines/log_pipeline_management.png" alt="패싯 검색, 파이프라인 수정 정보 및 순서 변경 모달을 사용하여 파이프라인을 관리하는 방법" style="width:50%;">}}

슬라이딩 옵션 패널의 `Move to` 옵션을 사용하여 파이프라인 순서를 정확하게 변경할 수 있습니다. `Move to` 모달을 사용하여 스크롤하고 선택한 파이프라인을 이동할 정확한 위치를 클릭하세요. 파이프라인은 다른 읽기 전용 파이프라인 안으로 이동할 수 없습니다. 중첩된 파이프라인을 포함한 파이프라인은 다른 최상위 위치로만 이동할 수 있습니다. 다른 파이프라인 안으로는 이동할 수 없습니다.

{{< img src="logs/processing/pipelines/log_pipeline_move_to.png" alt="이동 대상 모달을 사용하여 파이프라인의 순서를 정확히 변경하는 방법" style="width:50%;">}}

파이프라인을 복제하면 처음부터 시작할 필요 없이 기존 규칙과 프로세서를 다시 사용할 수 있습니다. 파이프라인을 복제하면 Datadog이 복제한 파이프라인 원본을 자동으로 비활성화합니다. 활성화하려면 토글을 클릭하세요.

## 예상 사용량 메트릭 {#estimated-usage-metrics}

각 파이프라인에 대하여 예상 사용량 메트릭이 표시됩니다. 여기에는 각 파이프라인이 수집하고 수정하는 로그의 양과 수가 표시됩니다. 모든 파이프라인에는 즉시 사용 가능한 [로그 예상 사용량 대시보드][13]로 이동하는 링크가 포함됩니다. 이 대시보드는 파이프라인의 사용량 메트릭에 대한 상세한 차트를 제공합니다.

{{< img src="logs/processing/pipelines/log_pipeline_statistics.png" alt="파이프라인의 사용량 메트릭을 신속하게 조회하는 방법" style="width:50%;">}}

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

<br>
*Logging without Limits는 Datadog, Inc.의 상표입니다.

[1]: /ko/logs/log_configuration/parsing/
[2]: /ko/logs/log_collection/?tab=host#attributes-and-tags
[3]: /ko/logs/log_configuration/processors/
[4]: /ko/logs/explorer/facets/
[5]: https://app.datadoghq.com/logs/pipelines
[6]: /ko/logs/log_configuration/processors/grok_parser/
[7]: /ko/account_management/rbac/granular_access/
[8]: https://app.datadoghq.com/logs/pipelines
[9]: https://app.datadoghq.com/logs/pipelines/remapping
[10]: https://app.datadoghq.com/logs/pipelines/pipeline/library
[11]: /ko/integrations/#cat-log-collection
[12]: /ko/logs/log_configuration/parsing/?tab=matchers#parsing-dates
[13]: https://app.datadoghq.com/dash/integration/logs_estimated_usage
[14]: /ko/api/latest/restriction-policies/