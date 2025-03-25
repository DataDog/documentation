---
algolia:
  tags:
  - apm issues
  - apm faq
  - 트러블슈팅 추적
  - APM 일반적인 문제
aliases:
- /ko/tracing/faq/my-trace-agent-log-renders-empty-service-error/
- /ko/tracing/troubleshooting/faq_apm/
further_reading:
- link: /tracing/troubleshooting/connection_errors
  tag: 설명서
  text: 연결 오류
- link: /tracing/troubleshooting/tracer_startup_logs/
  tag: 설명서
  text: Datadog 트레이서 시작 로그
- link: /tracing/troubleshooting/tracer_debug_logs/
  tag: 설명서
  text: Datadog 트레이서 디버그 로그
- link: /tracing/troubleshooting/agent_apm_metrics/
  tag: 설명서
  text: Datadog 에이전트로 전송한 애플리케이션 성능 모니터링(APM) 메트릭
- link: /tracing/trace_pipeline/trace_retention/#create-your-own-retention-filter
  tag: 문서
  text: 커스텀 보존 기간 필터
- link: /tracing/trace_pipeline/ingestion_mechanisms/?tab=java
  tag: 설명서
  text: 트레이스 수집 샘플링
- link: /tracing/troubleshooting/#data-volume-guidelines
  tag: 문서
  text: 데이터 볼륨 지침
- link: /integrations/
  tag: 문서
  text: Datadog의 전체 통합 목록
- link: /tracing/services/inferred_services
  tag: 문서
  text: 추론된 서비스 종속성
title: 애플리케이션 성능 모니터링(APM) 트러블슈팅
---

Datadog APM 사용 중 예측하지 못한 동작을 경험하는 경우 이 페이지의 정보를 읽고 문제를 해결할 수 있습니다. Datadog에서는 Datadog 추적 라이브러리를 정기적으로 최신 버전으로 업그레이드하는 것을 권고합니다. 최신 버전에는 성능 개선과 버그 수정이 포함되어 있기 때문입니다. 그래도 문제가 지속되는 경우에는 [Datadog 고객지원팀][1]에 문의하세요.

애플리케이션 성능 모니터링(APM) 데이터를 Datadog에 전송하는 것과 관련된 요소는 다음과 같습니다.

{{< img src="tracing/troubleshooting/troubleshooting_pipeline_info_1.png" alt="APM 트러블슈팅 파이프라인">}}

자세한 정보는 [추가 지원](#additional-support)을 참고하세요.

## 트레이스 보존 기간

이 섹션에서는 트레이스 데이터 보존 기관과 Datadog에서 필터링 하는 방법을 설명합니다.

{{% collapse-content title="Monitor 페이지보다 Trace Explorer 페이지에 스팬이 더 많음" level="h4" %}}

아직 [커스텀 보존 기간 필터][19]를 설정하지 않은 경우 이와 같은 동작이 발생합니다. 이유는 다음과 같습니다.

[Trace Explorer][20] 페이지에서는 태그를 사용해 수집되거나 인덱싱된 스팬 모두를 검색할 수 있습니다. 여기에서 어떤 트레이스든 쿼리할 수 있습니다.

기본적으로 스팬은 수집된 후 [Datadog 지능형 필터][21]에 보존됩니다. 또 Datadog에는 다른 [보존 필터][22]가 기본적으로 활성화되어 있어 내 서비스, 엔드포인트, 오류, 지연 시간이 높은 트레이스를 관측할 수 있습니다.

그러나 모니터에서 이와 같은 트레이스를 사용하려면 [커스텀 보존 필터][19]를 설정해야 합니다.

커스텀 보존 필터를 사용하면 태그를 기반으로 추가 필터를 생성, 수정, 비활성화하여 인덱싱하고 [보존][23]할 스팬을 결정할 수 있습니다. 또 각 필터에서 보존할 스팬의 백분율을 설정할 수도 있습니다. 이와 같은 인덱싱된 트레이스를 모니터에 사용할 수 있습니다.

| 제품                                                | 스팬 소스                                                      |
|--------------------------------------------------------|------------------------------------------------------------------|
| 모니터링                                               | 커스텀 보존 필터의 스팬                              |
| 다른 제품 <br><i>(대시보드, 노트북 등</i> | 커스텀 보존 필터 스팬 + Datadog 지능형 필터 |

{{% /collapse-content %}}

## 메트릭 추적

이 섹션에서는 트레이스 메트릭의 트러블슈팅 차이와 불일치에 관해 설명합니다.

{{% collapse-content title="트레이스 메트릭과 커스텀 스팬 기반 메트릭의 값이 다름" level="h4" %}}

트레이스 메트릭과 커스텀 기반 메트릭은 다른 데이터세트를 기반으로 계산되기 때문에 값이 다를 수 있습니다.

- [트레이스 메트릭][24]은 [트레이스 수집 샘플링][25] 구성과 관계없이 100% 애플리케이션의 트래픽을 기반으로 계산됩니다. 트레이스 메트릭 네임스페이스는 `trace.<SPAN_NAME>.<METRIC_SUFFIX>` 형식을 따릅니다.
- [커스텀 스팬 기반 메트릭][26]은 수집된 스팬으로 생성되며, 이는 [트레이스 수집 샘플링][25]에 따라 결정됩니다. 에를 들어, 트레이스의 50%를 수집하는 경우, 커스텀 스팬 기반 메트릭은 수집된 스팬의 50%를 기반으로 생성됩니다.

트레이스 메트릭과 커스텀 스팬 기반 메트릭이 같은 값을 가지도록 하려면 애플리케이션이나 서비스의 수집 비율을 100%로 구성해야 합니다.

<div class="alert alert-info">메트릭 이름은 <a href="/metrics/custom_metrics/#naming-custom-metrics">메트릭 명명 규칙</a>을 따라야 합니다. 메트릭 이름은 <code>trace.*</code>로 시작할 수 없으며, 이렇게 지정하면 저장이 되지 않습니다.</div>

{{% /collapse-content %}}

## 서비스

이 섹션에서는 서비스와 관련한 문제를 트러블슈팅하는 전략을 설명합니다.

{{% collapse-content title="서비스 한 개가 Datadog에서 서비스 여러 개로 표시됨" level="h4" %}}

이는 스팬 전반에 서비스 이름이 통일성 있게 사용되지 않았을 경우에 발생합니다.

예를 들어, 단일 서비스인 `service:test`가 Datadog에서 여러 서비스로 나타날 수 있습니다.
- `service:test`
- `service:test-mongodb`
- `service:test-postgresdb`

[추론된 서비스 종속성(평가판)[30]을 사용할 수 있습니다. 추론된 외부 API에서는 기본 명명 규칙인 `net.peer.name`을 사용합니다(예: `api.stripe.com`, `api.twilio.com`). 추론된 데이터베이스에서는 기본 명명 규칙 `scheme db.instance`를 사용합니다.

또는 언어에 따라 서비스 이름을 `DD_SERVICE_MAPPING` 또는 `DD_TRACE_SERVICE_MAPPING`와 같은 환경 변수를 사용해 명명할 수도 있습니다.

[Datadog 추적 라이브러리][27]를 참고해 자세한 정보를 보거나 다음에서 언어를 선택하세요.

{{< tabs >}}
{{% tab "Java" %}}

`dd.service.mapping`
: **환경 변수**: `DD_SERVICE_MAPPING`<br>
**기본값**: `null`<br>
**예시**: `mysql:my-mysql-service-name-db, postgresql:my-postgres-service-name-db`<br>
구성에서 서비스 이름을 역동적으로 재지정할 수 있습니다. 여러 서비스에서 고유 이름을 가진 데이터베이스를 만들 때 유용합니다.

{{% /tab %}}

{{% tab "Python" %}}

`DD_SERVICE_MAPPING`
: 트레이스에서 서비스 이름을 바꾸는 것을 허용하려면 서비스 이름 매핑을 정의하세요. 예: `postgres:postgresql,defaultdb:postgresql`. 버전 0.47 이상에서 사용할 수 있습니다.

{{% /tab %}}
{{% tab "Go" %}}

`DD_SERVICE_MAPPING`
: **기본값**: `null` <br>
구성을 통해 서비스 이름을 역동적으로 재지정합니다. 서비스는 쉼표나 띄어쓰기로 분리합니다(예: `mysql:mysql-service-name,postgres:postgres-service-name`, `mysql:mysql-service-name postgres:postgres-service-name`).

{{% /tab %}}
{{% tab "Node.js" %}}

`DD_SERVICE_MAPPING`
: **구성**: `serviceMapping`<br>
**기본값**: N/A<br>
**예**: `mysql:my-mysql-service-name-db,pg:my-pg-service-name-db`<br>
각 플러그인마다 서비스 이름을 제공합니다. 쉼표로 분리된 `plugin:service-name` 쌍을 허용하며, 띄어쓰기는 무관합니다.

{{% /tab %}}
{{% tab ".NET" %}}

`DD_TRACE_SERVICE_MAPPING`
: 구성을 사용해 서비스 이름을 재지정합니다. 이름을 재지정할 쉼표로 구분된 키-값 쌍 서비스 이름 키 목록과 대신 사용할 이름을 `[from-key]:[to-name]` 형식으로 허용합니다.. <br>
**예**: `mysql:main-mysql-db, mongodb:offsite-mongodb-service`<br>
`from-key` 값은 통합 유형에 따라 달라지며 애플리케이션 이름 접두사를 제외합니다. 예를 들어 `my-application-sql-server`의 이름을 `main-db`로 재지정하려면 `sql-server:main-db`를 사용하세요. 버전 1.23에 추가

{{% /tab %}}
{{% tab "PHP" %}}

`DD_SERVICE_MAPPING`
: **INI**: `datadog.service_mapping`<br>
**기본값**: `null`<br>
APM 통합의 기본 이름을 변경합니다. 한번에 통합 하나 이상의 이름을 재지정합니다(예: `DD_SERVICE_MAPPING=pdo:payments-db,mysqli:orders-db`). ]통합 이름]1000]을 참고하세요.

[1000]: https://docs.datadoghq.com/ko/tracing/trace_collection/library_config/php#integration-names

{{% /tab %}}
{{% tab "Ruby" %}}

Ruby에서는 `DD_SERVICE_MAPPING` 또는 `DD_TRACE_SERVICE_MAPPING`을 지원하지 않습니다. 서비스 이름을 변경하려면 [추가 Ruby 구성][2000]을 참고하세요.

[2000]: https://docs.datadoghq.com/ko/tracing/trace_collection/automatic_instrumentation/dd_libraries/ruby/#advanced-configuration

{{% /tab %}}
{{< /tabs >}}

{{% /collapse-content %}}

{{% collapse-content title="Plan 및 Usage 페이지의 수집/인덱싱된 스팬에 예상치 못한 증가가 발생" level="h4" %}}

데이터 수집 및 인덱싱 급증하는 데에는 여러 요인이 있을 수 있습니다. 원인을 조사하려면 [APM 트레이스 예상 사용량 메트릭][31]을 사용하세요.

| 사용량 유형 | 메트릭 | 설명 |
| ------- | ------------ |------------ |
| APM 인덱싱된 스팬     | `datadog.estimated_usage.apm.indexed_spans` | 태그 기반 보존 필터로 인덱싱된 총 스팬 수|
| APM 수집된 스팬     | `datadog.estimated_usage.apm.ingested_spans`| 수집된 스팬의 총 수 |

[APM 트레이스 사용량 대시보드][28]에는 위젯 그룹이 포함되어 있는데, 여기에서 수치가 높은 KPI와 추가 사용량 정보를 확인할 수 있습니다. 

{{% /collapse-content %}}

{{% collapse-content title="오류 메시지 및 스택 트레이스 누락" level="h4" %}}

오류 상태의 일부 트레이스에서는 **Error** 탭에 예외 상세 내역이 아니라 `누락된 오류 메시지와 스택 트레이스`를 보여줍니다.

스팬에서 이 메시지가 나타나는 이유는 두 가지가 있을 수 있습니다.
- 스팬에 처리되지 않은 예외가 있습니다.
- 스팬 내의 HTTP 응답이 400~599의 HTTP 상태 코드를 반환합니다.

시도/포착 블록에서 예외를 처리할 경우 `error.message`, `error.type`, `error.stack` 스팬 태그가 자동으로 채워지지 않습니다. 상세한 오류 스팬 태그를 채우려면 [커스텀 계측][18] 코드를 사용하세요.

{{% /collapse-content %}}

## 데이터 볼륨 지침

다음과 같은 문제가 발생할 경우 [Datadog 볼륨 가이드라인][29]을 초과한 것일 수 있습니다.

- Datadog 플랫폼에서 트레이스 메트릭이 정상적으로 보고하지 않습니다.
- Datadog 플랫폼에서 볼 수 있는 리소스 일부가 보이지 않습니다.
- 서비스에서 트레이스가 보이지만 [Software Catalog 페이지][32]에서 이 서비스를 찾을 수 없습니다.

{{% collapse-content title="데이터 볼륨 가이드라인" level="h4" %}}

계측한 애플리케이션은 현재 시간으로부터 최대 18시간 전, 최대 2시간 이후의 타임스탬프가 포함된 스팬(span)을 제출합니다.

Datadog에서는 40분 간격으로 다음 조합을 허용합니다.

- 고유한 `environments` 및 `service` 조합 5,000개
- 환경당 고유한 `second primary tag values` 30개
- 환경 및 서비스당 고유한 `operation names` 100개
- 환경, 서비스, 작업 이름당 고유한 `resources` 1,000개
- 환경 및 서비스당 고유한 `versions` 30개

대량의 볼륨을 수용해야 하는 경우 [Datadog 고객지원팀][1]에 사용 사례에 관해 문의하세요.

표시된 글자수를 초과한 경우 Datadog은 다음 문자열을 잘라냅니다.

| 이름            | 문자 |
|-----------------|------------|
| [서비스][6]    |  100       |
| 작업       |  100       |
| 유형            |  100       |
| [리소스][7]   |  5000      |
| [태그 키][8]    |  200       |
| [태그 값][8]  |  25000     |

또한 스팬의 [스팬 태그][8] 수는 1024자를 초과할 수 없습니다.

{{% /collapse-content %}}

{{% collapse-content title="서비스 수가 데이터 볼륨 가이드라인에 안내된 값을 초과함" level="h4" %}}

서비스 개수가 [데이터 볼륨 가이드라인](#data-volume-guidelines)에 명시한 수치를 초과한다면 서비스 명명 규칙 모범 사례를 따릅니다.

### 서비스 이름에서 환경 태그 값 제외

기본적으로 환경(`env`)은 [Datadog 애플리케이션 성능 모니터링(APM)][17]의 기본 태그입니다.

{{< img src="/tracing/troubleshooting/troubleshooting-service-naming-convention-issues-3.png" alt="환경은 기본값으로 설정되는 기본 태그입니다." style="width:100%;" >}}

서비스는 일반적으로 `prod`, `staging`, `dev`와 같은 여러 환경에 배포됩니다. 요청 수, 대기 시간, 오류율과 같은 성능 메트릭은 다양한 환경에 따라 다릅니다. Software Catalog의 환경 드롭다운을 사용하면 **Performance** 탭의 데이터 범위를 특정 환경으로 지정할 수 있습니다.

{{< img src="/tracing/troubleshooting/troubleshooting-service-naming-convention-issues-2.png" alt="Software Catalog에서 `env` 드롭다운을 사용하여 특정 환경 선택" style="width:100%;" >}}

서비스 개수의 과부하로 문제가 발생하는 패턴 중 하나는 서비스 이름에 환경 값을 포함하는 경우입니다. 예를 들어, `prod-web-store` 와 `dev-web-store`라는 별도의 개별 환경 두 개에서 운영되면 고유 서비스는 하나가 아니라 두 개일 수 있습니다.

Datadog 서비스의 이름을 변경하여 계측을 수정할 것을 권장합니다.

트레이스 메트릭은 샘플링되지 않으므로 계측한 애플리케이션에는 데이터의 하위 섹션 대신 전체 데이터가 표시됩니다. 아울러, [볼륨 지침](#data-volume-guidelines)도 적용됩니다.

### 메트릭 파티션을 삽입하거나 서비스 이름으로 변수를 그룹화하는 대신 부차적 기본 태그를 사용합니다.

부차적 기본 태그는 트레이스 메트릭을 그룹화 및 집계하는 데 활용할 수 있는 추가 태그입니다. 드롭다운 메뉴에서 성능 데이터를 지정한 클러스터 이름 또는 데이터 센터 값으로 범위 지정할 수 있습니다.

{{< img src="/tracing/troubleshooting/troubleshooting-service-naming-convention-issues-1.png" alt="드롭다운 메뉴에서 특정 클러스터 또는 데이터 센터 값 선택" style="width:100%;" >}}

부차적 기본 태그를 적용하는 대신 서비스 이름에 메트릭 파티션을 포함하거나 변수를 그룹화하면 계정의 고유 서비스 개수가 불필요하게 증가하여 레이턴시 또는 데이터 손실이 발생할 수 있습니다.

 예를 들어, `web-store` 서비스 대신 `web-store-us-1` , `web-store-eu-1`, `web-store-eu-2` 서비스의 인스턴스 이름을 다르게 지정하여 해당 파티션의 성능 메트릭을 모두 함께 확인할 수도 있습니다. Datadog은 **지역 값**(`us-1`, `eu-1`, `eu-2`)을 부차적 기본 태그로 설정할 것을 권장합니다.

{{% /collapse-content %}}

## 연결 오류

이 섹션에서는 내 애플리케이션과 Datadog 에이전트 간의 연결 및 통신 문제를 해결하는 방법을 안내합니다.

{{% collapse-content title="내 계측 애플리케이션이 Datadog 에이전트와 통신하지 않음" level="h4" %}}

[연결 오류][4]에서 이와 같은 문제를 파악하고 해결하는 방법에 관해 알아보세요.

{{% /collapse-content %}}

## 리소스 사용량

이 섹션에서는 리소스 사용과 관련한 성능 문제를 트러블슈팅하는 방법을 설명합니다.

{{% collapse-content title="메모리 부족 오류" level="h4" %}}

트레이스 수집 CPU 사용량 감지 및 적절한 에이전트 리소스 제한 계산값에 대한 내용을 확인하려면 [에이전트 리소스 사용량][10]을 참조하세요.

{{% /collapse-content %}}

{{% collapse-content title="속도 제한 또는 최대 이벤트 오류 메시지" level="h4" %}}

Datadog 에이전트 로그에서 속도 제한 또는 초당 최대 이벤트에 대한 오류 메시지가 표시되면 아래의 [지침][9]에 따라 해당 제한값을 변경할 수 있습니다. 질문이 있는 경우 해당 제한값을 변경하기 전 Datadog [지원 팀][1]에 문의하세요.

{{% /collapse-content %}}

## 보안

이 섹션에서는 민감한 데이터와 트래픽 관리 등 APM 보안 문제를 해결하는 방법을 알아봅니다.

{{% collapse-content title="스팬 수정, 삭제, 난독화" level="h4" %}}

민감한 데이터를 스크러빙하거나, 서비스 점검 관련 트레이스를 삭제하거나, Datadog 에이전트 또는 일부 언어에서 트레이싱 클라이언트로 설정될 수 있는 기타 불필요한 트래픽을 삭제하는 데 사용 가능한 설정 옵션 몇 가지가 있습니다. 사용 가능한 옵션에 대한 자세한 내용을 확인하려면 [보안 및 에이전트 맞춤화][11]를 참고하세요. 여기에 대표적인 예시가 설명되어 있습니다. 내 환경에 해당 옵션을 적용하는 데 도움이 필요하면 [Datadog 고객지원팀][1]에 문의하세요.

{{% /collapse-content %}}

## 디버깅 및 로깅

이 섹션에서는 디버깅 및 시작 로그를 사용해 Datadog 트레이서로 문제를 파악하고 해결하는 방법을 설명합니다.

{{% collapse-content title="로그 디버그" level="h4" %}}

Datadog 트레이서의 자세한 세부 사항을 캡처하려면 트레이서에서 `DD_TRACE_DEBUG` 환경변수를 사용하여 디버그 모드를 활성화합니다. 자체 점검을 목적으로 활성화하거나, Datadog 지원 팀이 분류 목적으로 활성화를 권장할 수 있습니다. 다만, 테스팅을 완료한 후에는 디버그 로깅을 비활성화해야 합니다. 그러지 않으면 로깅 오버헤드가 발생할 수 있습니다.

해당 로그는 계측 오류 또는 통합 특정 오류를 나타낼 수 있습니다. 디버그 로그를 활성화 및 캡처하는 방법에 대한 자세한 내용을 확인하려면 [디버그 모드 트러블슈팅 페이지][5]를 참조하세요.

{{% /collapse-content %}}

{{% collapse-content title="시작 로그" level="h4" %}}

시작 시 Datadog 추적 라이브러리가 JSON 개체에 적용된 설정 및 모든 발생 오류를 반영하는 로그를 전송합니다. 해당 로그에는 에이전트가 가능한 언어로 접근할 수 있는지 여부가 포함됩니다. 일부 언어에서는 환경변수 `DD_TRACE_STARTUP_LOGS=true`로 활성화하는 시작 로그가 필요합니다. 시작 로그에 대한 자세한 내용을 확인하려면 트러블슈팅 [시작 로그][3]를 참고하세요.

{{% /collapse-content %}}

## 추가 지원

여전히 도움이 필요한 경우 Datadog 고객지원팀에서 티켓을 개설하세요.

{{% collapse-content title="Datadog 고객지원팀에서 티켓 개설" level="h4" %}}

[지원 티켓][1]을 개설하면 Datadog 고객지원팀에서 다음 정보를 요청할 수 있으니 참고하세요.

1. **문제가 있는 트레이스 링크 또는 문제 스크린샷**: 문제를 확인하여 트러블슈팅하는 데 도움이 됩니다.

2. **트레이서 시작 로그**: 시작 로그는 트레이서의 구현 오류나 트레이서와 Datadog 에이전트 간의 통신 문제를 파악하는 데 도움을 줍니다. 애플리케이션이나 컨테이너 설정을 트레이서의 구성과 비교하여 부적절하게 적용된 설정을 찾아낼 수 있습니다.

3. **트레이서 디버그 로그**: 트레이서 디버그 로그는 시작 로그보다 다음과 같은 더 상세한 정보를 제공합니다.
   - 애플리케이션 트래픽 흐름 중 통합 계측이 적절했는지 여부
   - 트레이서가 생성한 스팬 내용
   - 스팬을 에이전트로 전송할 때 발생한 연결 오류

4. **Datadog 에이전트 플레어**: [Datadog 에이전트 플레어][12]를 사용하면 트레이스가 거부되거나 잘못된 경우와 같이 Datadog 에이전트 내에서 어떤 일이 일어나는지 확인할 수 있습니다. 본 문서는 트레이스가 Datadog 에이전트에 도달하지 못하는 문제에 관한 지침은 아니나, 문제의 원인이나 메트릭 불일치를 파악하는 데 도움이 됩니다.

5. **내 환경 설명**: 애플리케이션 배포 구성을 알면 잠재적인 트레이서-에이전트 통신 문제와 구성 오류를 파악하는 데 도움이 됩니다. 문제가 복잡할 경우 지원팀에서 Kubernetes 매니페스트, ECS 태스크 정의, 도는 구성 파일의 다른 유사한 배포 정보를 요청할 수 있습니다.

6. **커스텀 추적 코드**: 커스텀 계측, 구성, 스팬 태그 추가 등이 Datadog 트레이스 가시화에 영향을 줄 수 있습니다.

7. **가시화 정보**: 사용 중인 언어, 프레임워크, Datadog 에이전트, Datdog 트레이서 버전을 알면 지원팀에서 [호환성 요구 사항][15]을 충족하는지 확인할 수 있고, 알려진 문제를 확인하고 버전 업그레이드를 권고할 수 있습니다.

{{% /collapse-content %}}

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/help/
[2]: /ko/tracing/metrics/metrics_namespace/
[3]: /ko/tracing/troubleshooting/tracer_startup_logs/
[4]: /ko/tracing/troubleshooting/connection_errors/
[5]: /ko/tracing/troubleshooting/tracer_debug_logs/
[6]: /ko/tracing/glossary/#services
[7]: /ko/tracing/glossary/#resources
[8]: /ko/glossary/#span-tag
[9]: /ko/tracing/troubleshooting/agent_rate_limits
[10]: /ko/tracing/troubleshooting/agent_apm_resource_usage/
[11]: /ko/tracing/custom_instrumentation/agent_customization
[12]: /ko/agent/troubleshooting/send_a_flare/?tab=agentv6v7
[13]: /ko/agent/troubleshooting/debug_mode/?tab=agentv6v7
[14]: /ko/tracing/custom_instrumentation/
[15]: /ko/tracing/compatibility_requirements/
[16]: /ko/tracing/guide/setting_primary_tags_to_scope/?tab=helm#add-a-second-primary-tag-in-datadog
[17]: /ko/tracing/guide/setting_primary_tags_to_scope/
[18]: /ko/tracing/trace_collection/custom_instrumentation/?tab=datadogapi
[19]: /ko/tracing/trace_pipeline/trace_retention/#create-your-own-retention-filter
[20]: https://app.datadoghq.com/apm/traces
[21]: /ko/tracing/trace_pipeline/trace_retention/#datadog-intelligent-retention-filter
[22]: /ko/tracing/trace_pipeline/trace_retention/#retention-filters
[23]: /ko/developers/guide/data-collection-resolution-retention/
[24]: /ko/tracing/metrics/metrics_namespace/
[25]: /ko/tracing/trace_pipeline/ingestion_mechanisms/?tab=java
[26]: /ko/tracing/trace_pipeline/generate_metrics/
[27]: /ko/tracing/trace_collection/library_config/
[28]: https://app.datadoghq.com/dash/integration/apm_estimated_usage
[29]: /ko/tracing/troubleshooting/#data-volume-guidelines
[30]: /ko/tracing/services/inferred_services
[31]: /ko/tracing/trace_pipeline/metrics/#apm-traces-estimated-usage-dashboard
[32]: https://app.datadoghq.com/services