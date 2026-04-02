---
aliases:
- /ko/logs/processing/pipelines/
description: Grok 프로세서를 사용하여 로그 구문 분석하기
further_reading:
- link: /logs/log_configuration/processors
  tag: 설명서
  text: 사용 가능한 프로세서의 전체 목록을 확인하세요
- link: /logs/logging_without_limits/
  tag: 설명서
  text: Logging without Limits*
- link: /logs/explorer/
  tag: 설명서
  text: 로그 탐색 방법 알아보기
- link: /logs/troubleshooting/
  tag: 설명서
  text: 로그 트러블슈팅
- link: https://learn.datadoghq.com/courses/going-deeper-with-logs-processing
  tag: 학습 센터
  text: 로그 처리 자세히 알아보기
- link: https://www.datadoghq.com/blog/monitor-cloudflare-zero-trust/
  tag: 블로그
  text: Datadog Cloud SIEM으로 Cloudflare Zero Trust를 모니터링하세요
- link: https://www.datadoghq.com/blog/monitor-1password-datadog-cloud-siem/
  tag: 블로그
  text: Datadog Cloud SIEM으로 1Password를 모니터링하세요
title: 파이프라인
---

## 개요

<div class="alert alert-info">이 문서에 설명된 파이프라인과 프로세서는 클라우드 기반 로깅 환경에만 적용됩니다. 온프레미스 로그를 집계, 처리 및 라우팅하려면 <a href="https://docs.datadoghq.com/observability_pipelines/set_up_pipelines/">Observability Pipelines</a>를 참조하세요.</div>

Datadog는 자동으로 JSON 형식의 로그를 [파싱][1]합니다. 그런 다음 처리 파이프라인을 통해 모든 로그(원시 및 JSON)를 전송하여 부가가치를 창출할 수 있습니다. 파이프라인은 다양한 형식의 로그를 가져와 Datadog에서 공통 형식으로 변환할 수 있습니다. 로그 파이프라인과 처리 전략을 구현하면 조직을 위한 [속성 명명 규칙][2]을 사용할 수 있어 도움이 됩니다.

파이프라인을 사용하면 [프로세서][3]를 통해 로그를 순차적으로 연결하고 파싱하여 보강할 수 있습니다. 이렇게 하면 반구조화된 텍스트에서 의미 있는 정보나 속성을 추출하여 [패싯][4]으로 재사용할 수 있습니다. 파이프라인을 통해 들어오는 각 로그는 모든 파이프라인 필터에 대해 테스트됩니다. 로그가 필터와 일치하면 다음 파이프라인으로 이동하기 전 모든 프로세서가 순차적으로 적용됩니다.

파이프라인과 프로세서는 모든 유형의 로그에 적용할 수 있습니다. 로깅 설정을 변경하거나 서버 측 처리 규칙에 변경 사항을 배포할 필요가 없습니다. 모두 [파이프라인 설정 페이지][5] 내에서 설정할 수 있습니다.

**참고**: 로그 관리 솔루션의 최적화된 사용을 위해 Datadog에서는 파이프라인당 최대 20개의 프로세서와 [그록(Grok) 프로세서][6] 내에서 10개의 파싱 규칙을 사용할 것을 권장합니다. Datadog는 Datadog 서비스 성능에 영향을 줄 수 있는 저성능 파싱 규칙, 프로세서 또는 파이프라인을 비활성화할 권리를 보유합니다.

## 전처리

로그가 파이프라인 처리 과정에 들어가기 전 JSON 로그의 전처리가 수행됩니다. 전처리에서는 `timestamp`, `status`, `host`, `service`, `message`와 같은 예약된 속성을 기반으로 일련의 작업이 실행됩니다. JSON로그에 다른 속성 이름이 있는 경우 전처리를 사용해 로그 속성 이름을 예약 속성 목록에 있는 이름으로 매핑할 수 있습니다.

JSON 로그전처리에는 표준 로그 전달자에 대해 작동하는 기본 설정이 함께 제공됩니다. 이 설정을 편집하여 커스텀 또는 특정 로그 전달 방식을 적용합니다.

1. Datadog 앱에서 [파이프라인][7]으로 이동하여 [JSON 전처리 로그][8]를 선택합니다.

    **참고:** JSON 로그를 전처리하는 것은 로그 속성 중 하나를 로그에 대한 `host`로 정의할 수 있는 유일한 방법입니다.

2. 예약된 속성을 기반으로 기본 매핑을 변경합니다:

{{< tabs >}}
{{% tab "Source" %}}

#### 소스 속성

JSON 형식의 로그 파일에 `ddsource` 속성이 포함된 경우 Datadog에서는 해당 값을 로그의 소스로 해석합니다. Datadog에서 사용하는 동일한 소스 이름을 사용하려면 [통합 파이프라인 라이브러리][1]를 참조하세요.

**참고**: 컨테이너화된 환경의 로그의 경우 [환경 변수][2]를 사용해야만 기본 소스와 서비스 값을 재정의할 수 있습니다.


[1]: https://app.datadoghq.com/logs/pipelines/pipeline/library
[2]: /ko/agent/docker/log/?tab=containerinstallation#examples
{{% /tab %}}
{{% tab "Host" %}}

#### 호스트 속성

Datadog 에이전트 또는 RFC5424 형식을 사용하면 로그에서 호스트 값이 자동으로 설정됩니다. 그러나 JSON 형식의 로그 파일에 다음 속성이 포함된 경우 Datadog는 해당 값을 로그의 호스트로 해석합니다.

* `host`
* `hostname`
* `syslog.hostname`

{{% /tab %}}
{{% tab "Date" %}}

#### 날짜 속성

기본적으로 Datadog는 타임스탬프를 생성한 다음, 로그 수신 시 날짜 속성에 추가합니다. 그러나 JSON 형식의 로그  파일에 다음 속성 중 하나가 포함된 경우 Datadog는 해당 값을 로그의 공식 날짜로 해석합니다.

* `@timestamp`
* `timestamp`
* `_timestamp`
* `Timestamp`
* `eventTime`
* `date`
* `published_date`
* `syslog.timestamp`

[로그 날짜 재매핑 프로세서][1]를 설정하여 로그 날짜의 소스로 사용할 대체 속성을 지정합니다.

**참고**: 공식 날짜가 지난 18시간 이전인 경우 Datadog는 로그 항목을 거부합니다.

<div class="alert alert-danger">
인식되는 날짜 형식: <a href="https://www.iso.org/iso-8601-date-and-time-format.html">ISO8601</a>, <a href="https://en.wikipedia.org/wiki/Unix_time">UNIX(밀리초 EPOCH 형식</a>) 및 <a href="https://www.ietf.org/rfc/rfc3164.txt">RFC3164입니다</a>.
</div>


[1]: /ko/logs/log_configuration/processors/#log-date-remapper
{{% /tab %}}
{{% tab "Message" %}}

#### 메시지 속성

기본적으로 Datadog는 로그 항목의 본문으로 메시지 값을 수집합니다. 그러면 해당 값이 강조 표시되어 [로그 탐색기][1]에 표시되며, [전체 텍스트 검색][2]에 대한 색인이 생성됩니다.

[로그 메시지 재매핑 프로세서][3]를 설정하여 로그의 메시지 소스로 사용할 대체 속성을 지정합니다.


[1]: /ko/logs/explorer/
[2]: /ko/logs/explorer/#filters-logs
[3]: /ko/logs/log_configuration/processors/#log-message-remapper
{{% /tab %}}
{{% tab "Status" %}}

#### 상태 속성

각 로그 항목은 Datadog 내에서 패싯된 검색에 사용할 수 있는 상태 수준을 지정할 수 있습니다. 그러나 JSON 형식의 로그 파일에 다음 속성 중 하나가 포함된 경우 Datadog는 해당 값을 로그의 공식 상태로 해석합니다:

* `status`
* `severity`
* `level`
* `syslog.severity`

[로그 상태 리매퍼 프로세서][1]를 설정하여 로그 상태의 소스로 사용할 대체 속성을 지정합니다.

[1]: /ko/logs/log_configuration/processors/#log-status-remapper
{{% /tab %}}
{{% tab "Service" %}}

#### 서비스 속성

Datadog 에이전트 또는 RFC5424 형식을 사용하면 로그의 서비스 값이 자동으로 설정됩니다. 그러나 로그 형식의 JSON 파일에 다음 속성이 포함된 경우 Datadog는 해당 값을 로그의 서비스 값으로 해석합니다.

* `service`
* `syslog.appname`

[로그 서비스 재매핑 프로세서][1]를 설정하여 로그의 서비스 소스로 사용할 대체 속성을 지정합니다.


[1]: /ko/logs/log_configuration/processors/#service-remapper
{{% /tab %}}
{{% tab "Trace ID" %}}

#### 트레이스 ID 속성

기본적으로 [Datadog 추적기는 자동으로 트레이스와 스팬(span) ID를 로그에 삽입할 수 있습니다][1]. 그러나 로그 형식의 JSON에 다음 속성이 포함된 경우 Datadog는 해당 값을 로그의 `trace_id`로 해석합니다.

* `dd.trace_id`
* `contextMap.dd.trace_id`

[트레이스 ID 리매퍼 프로세서][2]를 설정하여 로그 트레이스 ID의 소스로 사용할 대체 속성을 지정합니다.


[1]: /ko/tracing/other_telemetry/connect_logs_and_traces/
[2]: /ko/logs/log_configuration/processors/#trace-remapper
{{% /tab %}}

{{% tab "Span ID" %}}

#### 스팬(span) ID 속성

기본적으로 [Datadog 추적기는 스팬(span) ID를 로그에 자동으로 삽입할 수 있습니다][1]. 그러나 로그 형식의 JSON에 다음 속성이 포함된 경우 Datadog는 해당 값을 로그의  `span_id`로 해석합니다.

* `dd.span_id`
* `contextMap.dd.span_id`

[1]: /ko/tracing/other_telemetry/connect_logs_and_traces/
{{% /tab %}}

{{< /tabs >}}

## 파이프라인 생성

1. Datadog 앱에서 [파이프라인][7]으로 이동합니다.
2. **새 파이프라인**을 선택합니다.
3. 라이브 테일 미리 보기에서 로그를 선택하여 필터를 적용하거나 직접 필터를 적용하세요. 드롭다운 메뉴에서 필터를 선택하거나 **</>** 아이콘을 선택하여 나만의 필터 쿼리를 만듭니다. 필터를 사용하면 파이프라인이 적용되는 로그 종류를 제한할 수 있습니다.

    **참고**: 파이프라인 필터링은 파이프라인의 모든 프로세서보다 먼저 적용됩니다. 따라서 파이프라인 자체에서 추출된 속성에 대해서는 필터링할 수 없습니다.

4. 파이프라인에 이름을 지정하세요.
5. (선택 사항) 파이프라인의 프로세서에 편집 액세스 권한을 부여합니다. 파이프라인에 역할을 할당하는 경우 해당 역할은 해당 파이프라인에 한정된 `logs_write_processor` [권한][12]을 받습니다. (역할 편집을 통해) `logs_write_processor` 권한이 전역적으로 할당된 역할은 모든 파이프라인에 대한 액세스 권한이 있으므로 선택할 수 없습니다.
6. (선택 사항) 파이프라인에 설명과 태그를 추가하여 파이프라인의 용도와 소유권을 명시하세요. 파이프라인 태그는 로그에 영향을 미치지 않지만 [Pipelines 페이지][5]에서 필터링 및 검색에 사용할 수 있습니다.
7. **만들기**를 누릅니다.

파이프라인으로 변환된 로그의 예시입니다.

{{< img src="logs/processing/pipelines/log_post_processing.png" alt="파이프라인으로 변환된 로그의 예시" style="width:50%;">}}

### 통합 파이프라인

<div class="alert alert-info">
 <a href="/통합/#cat-로그를 남기다-collection">지원되는 통합 목록 </a>을 참조하세요.
</div>

통합 처리 파이프라인은 특정 소스가 로그를 수집하도록 설정된 경우 사용할 수 있습니다. 이러한 파이프라인은 **읽기 전용**이며 특정 소스에 적합한 방식으로 로그를 파싱합니다. 통합 로그의 경우 통합 파이프라인이 자동으로 설치되어 파싱을 처리하고 로그 탐색기에 해당 패싯을 추가합니다.

통합 파이프라인을 보려면 [파이프라인][5] 페이지로 이동합니다. 통합 파이프라인을 편집하려면 해당 파이프라인을 복제한 다음 복제본을 편집합니다.

{{< img src="logs/processing/pipelines/cloning_pipeline.png" alt="파이프라인 복제" style="width:80%;">}}

아래 ELB 로그 예시를 참조하세요.

{{< img src="logs/processing/elb_log_post_processing.png" alt="ELB 로그 게시 처리" style="width:70%;">}}

**참고**: 통합 파이프라인은 삭제할 수 없으며 비활성화만 가능합니다.

### 통합 파이프라인 라이브러리

Datadog에서 제공하는 통합 파이프라인의 전체 목록 를 보려면 [통합 파이프라인 라이브러리][7]을 참조하세요. 파이프라인 라이브러리는 기본적으로 Datadog가 다른 로그 형식을 처리하는 방식을 보여줍니다.

{{< img src="logs/processing/pipelines/integration-pipeline-library.mp4" alt="통합 파이프라인 라이브러리" video=true style="width:80%;">}}

통합 파이프라인을 사용하려면 Datadog에서 해당 로그 `source`를 설정하여 통합을 설치하는 것이 좋습니다. Datadog가 이 소스로 첫 번째 로그를 수신하면 설치가 자동으로 트리거되고 통합 파이프라인이 처리 파이프라인에 추가됩니다 로그 소스를 설정하려면, 해당되는 [통합 문서][9]를 참조하세요.

복제 버튼을 사용하여 통합 파이프라인을 복사할 수도 있습니다.

{{< img src="logs/processing/pipelines/clone-pipeline-from-library.mp4" alt="라이브러리에서 파이프라인 복제하기" video=true style="width:80%;">}}

## 프로세서 또는 중첩된 파이프라인 추가

1. Datadog 앱에서 [파이프라인][7]으로 이동합니다.
2. 파이프라인 위로 마우스를 가져가 옆에 있는 화살표를 클릭하면 프로세서와 중첩된 파이프라인을 확장할 수 있습니다.
3. **프로세서 추가** 또는 **중첩된 파이프라인 추가**를 선택합니다.

### 프로세서

프로세서는 파이프라인 내에서 실행되어 데이터 구조화 작업을 완료합니다. 앱 내에서 또는 API를 사용해 프로세서 유형별로 프로세서를 추가하고 설정하는 방법을 알아보려면 [프로세서 설명서][3]를 참조하세요. 

파싱 날짜 및 시간 형식( 커스텀), 타임스탬프가 UTC가 아닌 경우 필요한 `timezone` 파라미터에 대한 자세한 내용은  [파싱 날짜][10]를 참조하세요.

### 중첩된 파이프라인

중첩된 파이프라인은 파이프라인 내의 파이프라인입니다. 중첩된 파이프라인을 사용하여 처리을 두 단계로 분할합니다. 예를 들어 먼저 팀과 같은 상위 수준 필터를 사용한 다음 통합, 서비스 또는 기타 태그 또는 속성을 기준으로 두 번째 수준의 필터링을 할 수 있습니다. 

파이프라인에는 중첩 파이프라인과 프로세서가 포함될 수 있지만 중첩 파이프라인에는 프로세서만 포함될 수 있습니다.

{{< img src="logs/processing/pipelines/nested_pipeline.png" alt="중첩된 파이프라인" style="width:80%;">}}

파이프라인을 다른 파이프라인으로 이동하여 중첩 파이프라인으로 만들 수 있습니다:

1. 이동하려는 파이프라인 위로 마우스를 가져간 다음 **이동 대상** 아이콘을 클릭합니다.
1. 원본 파이프라인을 이동하려는 파이프라인을 선택합니다. **참고**: 중첩된 파이프라인을 포함하는 파이프라인은 또 다른 최상위 위치로만 이동할 수 있습니다. 다른 파이프라인으로 이동할 수 없습니다.
1. **이동**을 클릭합니다.

## 파이프라인 관리

파이프라인 또는 프로세서에 대한 마지막 변경 시점과 파이프라인의 수정 정보를 사용하여 변경을 수행한 사용자를 식별합니다. 이 수정 정보를 비롯해, 파이프라인이 활성화되어 있는지 또는 읽기 전용인지와 같은 다른 패싯 속성을 사용하여 파이프라인을 필터링할 수 있습니다.

{{< img src="logs/processing/pipelines/log_pipeline_management.png" alt="패싯 검색, 파이프라인 수정 정보 및 모달 재정렬을 사용해 파이프라인을 관리하는 방법l" style="width:50%;">}}

슬라이딩 옵션 패널의 `Move to` 옵션을 사용하여 파이프라인을 정확하게 재정렬하세요. `Move to` 모달을 사용하여 선택한 파이프라인을 이동할 정확한 위치를 스크롤하여 클릭합니다. 파이프라인은 다른 읽기 전용 파이프라인으로 이동할 수 없습니다. 중첩된 파이프라인을 포함하는 파이프라인은 또 다른 최상위 위치로만 이동할 수 있습니다. 다른 파이프라인으로 이동할 수 없습니다.

{{< img src="logs/processing/pipelines/log_pipeline_move_to.png" alt="모달로 이동을 사용해 파이프라인을 정확하게 재정렬하는 방법" style="width:50%;">}}

## 예상 사용량 메트릭

예상 사용량 메트릭은 파이프라인별로 표시되며, 특히 각 파이프라인에서 수집 및 수정되는 로그의 양과 횟수를 표시합니다. 또한 모든 파이프라인에서 바로 사용할 수 있는 [로그 예상 사용량 대시보드][11]으로 연결되는 링크가 있어 해당 파이프라인의 사용량 메트릭을 차트에서 더 상세하게 볼 수 있습니다.

{{< img src="logs/processing/pipelines/log_pipeline_statistics.png" alt="파이프라인 사용량 메트릭의 빠른 보기를 확인하는 방법" style="width:50%;">}}

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

<br>
*Logging without Limits는 Datadog, Inc.의 상표입니다.

[1]: /ko/logs/log_configuration/parsing/
[2]: /ko/logs/log_collection/?tab=host#attributes-and-tags
[3]: /ko/logs/log_configuration/processors/
[4]: /ko/logs/explorer/facets/
[5]: https://app.datadoghq.com/logs/pipelines
[6]: /ko/logs/log_configuration/processors/?tab=ui#grok-parser
[7]: https://app.datadoghq.com/logs/pipelines/pipeline/library
[8]: https://app.datadoghq.com/logs/pipelines/remapping
[9]: /ko/integrations/#cat-log-collection
[10]: /ko/logs/log_configuration/parsing/?tab=matchers#parsing-dates
[11]: https://app.datadoghq.com/dash/integration/logs_estimated_usage
[12]: /ko/account_management/rbac/permissions/?tab=ui#log-management