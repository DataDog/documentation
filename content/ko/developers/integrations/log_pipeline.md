---
aliases:
- /ko/logs/faq/partner_log_integration
- /ko/developers/integrations/log_integration/
description: Datadog Log Integration Pipeline 생성 방법에 대해 알아보세요.
further_reading:
- link: /integrations/#cat-log-collection
  tag: 설명서
  text: 기존 Datadog 로그 통합 보기
- link: /logs/explorer/facets/
  tag: 설명서
  text: 로그 패싯에 대해 알아보기
- link: /logs/explorer/
  tag: 설명서
  text: 로그 탐색기에 대해 알아보기
- link: /logs/log_configuration/pipelines/
  tag: 설명서
  text: 로그 파이프라인에 대해 알아보기
title: 로그 파이프라인 생성
---
## 개요

이 가이드는  Technology Partner가 Datadog으로 로그를 전송하는 통합용 로그 파이프라인을 생성하는 방법을 안내합니다. 로그 파이프라인은 로그를 처리하고 구조화하며, 효율적으로 활용할 수 있도록 보강하는 데 필수적입니다

## 모범 사례
1. 지원되는 Datadog 로그 [엔드포인트][23]를 사용하세요.
   - 통합에서는 Datadog이 지원하는 로그 수집 엔드포인트를 사용해야 합니다.
   - 또는 [Logs Ingestion HTTP 엔드포인트][1]를 사용하여 Datadog에 로그를 보냅니다.
2. 모든 Datadog 사이트를 지원해야 합니다.
   - 가능한 경우 사용자가 다양한 Datadog 사이트를 선택할 수 있도록 합니다.
   - 사이트별 세부 정보는 [Datadog 사이트 시작하기][2]를 참고하세요.
   - 로그 수집을 위한 Datadog 사이트 엔드포인트는 `http-intake.logs.{{< region-param key="dd_site" code="true" >}}`입니다.
3. 사용자가 사용자 정의 태그를 첨부할 수 있도록 허용하세요.
   - 태그는 로그 페이로드의 JSON 본문에서 키-값 속성으로 설정되어야 합니다.
   - API를 사용하여 로그를 전송하는 경우 `ddtags=<TAGS>` 쿼리 파라미터를 사용하여 태그를 설정할 수도 있습니다.
4. 통합의 로그 소스 태그를 설정하세요.
   - 소스 태그를 통합 이름으로 정의합니다(예: `source: okta`).
   - 소스 태그는 다음과 같아야 합니다.
     - 소문자
     - 사용자 편집 불가(파이프라인 및 대시보드 전용)
5. JSON 본문에 배열을 넣어 로그를 보내지 마세요.
   - 배열은 지원되지만 패싯으로 지정할 수 없어 필터링 기능이 제한됩니다.
6. Datadog API 및 애플리케이션 키를 보호하세요.
   - Datadog API 키는 절대 기록하지 마세요. 요청 헤더나 HTTP 경로로만 전달해야 합니다.
   - 로그 수집에 애플리케이션 키를 사용하지 마세요.

## 로그 통합 자산 생성하기
로그 통합 자산은 다음으로 구성됩니다.
1. [Pipelines][13] - 로그를 처리하고 구조화합니다.
2. [Facets][12] - 로그 필터링 및 검색에 사용되는 속성입니다.
Technology Partner 통합은 기본 대시보드와의 호환성을 보장하기 위해 Datadog의 [표준 명명 규칙][17]을 따라야 합니다.

<div class="alert alert-danger">Datadog 통합팀에서 검토하려면 로그 통합에 자산이 포함되어야 하며 파이프라인 프로세서 또는 패싯이 있어야 합니다.</div>

### 파이프라인 개요

Datadog으로 전송된 로그는 파이프라인 프로세서를 사용하여 [로그 파이프라인][13]에서 처리됩니다. 이 프로세서를 통해 사용자는 속성 정보를 파싱, 재매핑 및 추출하여 플랫폼 전반에서 사용할 수 있도록 로그를 풍부하게 하고 표준화할 수 있습니다.

#### 파이프라인 생성
1. [**Pipelines**][3] 페이지로 이동하여 New Pipeline을 선택합니다.
2. Filter 필드에 로그의 고유 소스 태그를 입력합니다. 예를 들어, Okta 통합이면 `source:okta`입니다.
3. [선택 사항] 이해를 돕기 위해 태그와 설명을 추가합니다.
4. **Create**를 클릭합니다.

중요: 통합을 통해 전송된 로그가 수집되기 전에 태그가 지정되었는지 확인하세요.

#### 파이프라인 프로세서 추가
1. 로그 구조화 모범 사례에 대해서는 [Datadog의 표준 속성][6]을 참고하세요.
   > 표준 속성은 플랫폼 전체에 적용되는 예약된 속성입니다.
3. **Add Processor**를 클릭하고 다음 옵션 중에서 선택하세요.
   - Attribute Remapper - 사용자 정의 로그 속성에서 표준 Datadog 속성으로 매핑합니다.
   - Service Remapper - 로그가 올바른 서비스 이름에 연결되었는지 확인합니다.
   - Date Remapper - 로그에 올바른 타임스탬프를 할당합니다.
   - Status Remapper - 로그 상태를 표준 Datadog 속성에 매핑합니다.
   - Message Remapper - 로그를 올바른 메시지 속성에 할당합니다.
4. 로그가 JSON 형식이 아닌 경우, Grok 파서 프로세서를 사용하여 속성을 추출합니다. Grok 프로세서는 속성을 파싱하고 로그를 보강한 후, 다시 매핑하거나 추가 처리합니다.

고급 처리를 위해서는 다음을 고려하세요.
- Arithmetic Profecessor - 로그 속성을 계산합니다.
- String Builder Processor - 여러 개의 문자열 속성을 연결합니다.

**팁**
- 로그 속성을 다시 매핑할 때 `preserveSource:false`를 사용하여 원래 속성을 제거하세요. 이렇게 하면 혼란을 줄이고 중복을 제거할 수 있습니다.
- 최적의 grok 파싱 성능을 유지하려면 와일드카드 매처를 사용하지 마세요.

파이프라인 내에서 프로세서를 사용하여 데이터를 보강하고 재구성하며 로그 속성을 생성하세요. 모든 로그 프로세서 목록은 [프로세서][10] 문서를 참고하세요.

##### 필수 조건

애플리케이션의 로그 속성을 Datadog Standard Attributes에 매핑합니다
: [Attribute Remapper][5]를 사용하여 가능한 경우 속성 키를 [Datadog Standard Attributes][6]에 매핑합니다. 예를 들어, 네트워크 서비스 클라이언트 IP 값의 속성은 `network.client.ip`로 리매핑해야 합니다.

로그 `service` 태그를 원격 측정 데이터를 생성하는 서비스 이름에 매핑합니다
: [Service Remapper]][7]를 사용하여 `service`  속성을 리매핑합니다. 소스와 [서비스][26]가 동일한 값을 공유하는 경우, `service` 태그를 `source` 태그에 리매핑합니다. `service` 태그는 소문자여야 합니다.

로그의 내부 타임스탬프를 공식 Datadog 타임스탬프에 매핑합니다
: [Date Remapper][4]를 사용하여 로그의 공식 타임스탬프를 정의합니다. 로그의 타임스탬프가 [표준 날짜 속성][28]에 매핑되지 않으면 Datadog은 타임스탬프를 수집 시점으로 설정합니다.

로그의 사용자 지정 상태 속성을 공식 Datadog `status` 속성에 매핑합니다
: [Status Remapper][25]를 사용하여 로그의 `status`를 리매핑하거나, [Category Processor][19]를 사용하여 범위에 매핑된 상태(HTTP 상태 코드처럼)를 리매핑합니다.

로그의 사용자 지정 메시지 속성을 공식 Datadog `message` 속성에 매핑합니다 
: 애플리케이션 로그가 표준 메시지 속성에 매핑되지 않는 경우 [Message Remapper][9]를 사용하여 로그의 공식 메시지를 정의합니다. 이를 통해 사용자는 원하는 텍스트를 입력하여 로그를 검색할 수 있습니다.

로그 내 사용자 지정 속성에 대한 네임스페이스를 설정합니다
: [Datadog Standard Attribute][6]에 매핑되지 않는 일반 로그 속성은 [Facets][14]에 매핑된 경우 네임스페이스를 지정해야 합니다. 예를 들어, `file`은 `integration_name.file`로 다시 매핑됩니다.
[Attribute Remapper][5]를 사용하여 속성 키를 새로운 네임스페이스 속성으로 설정하세요.

1. 새로 만든 파이프라인을 확장하고 **Add Processor**를 클릭하여 프로세서를 사용하여 파이프라인을 구축하세요.
2. 통합 로그가 JSON 형식이 아닌 경우 [Grok Processor][8]를 추가하여 속성 정보를 추출하세요. Grok 프로세서는 속성을 파싱하고 로그를 보강한 후 재매핑 또는 추가 처리합니다.
3. 로그 속성을 추출한 후 가능한 경우 [Attribute Remappers][5]를 사용하여 [Datadog의 Standard Attributes][6]로 다시 매핑합니다.
4. [Date Remapper][4]를 사용하여 통합 로그의 타임스탬프를 공식 Datadog 타임스탬프로 설정합니다.
5. 고급 처리 및 데이터 변환을 위해 추가 [프로세서][10]를 활용하세요.
예를 들어, `Arithmetic Processor`는 속성을 기반으로 정보를 계산하는 데 사용할 수도 있고, `String Builder Processor`는 여러 문자열 속성을 연결하는 데 사용할 수도 있습니다.

**팁**
* 로그 속성을 다시 매핑할 때 `preserveSource:false`를 사용하여 원래 속성을 제거하세요. 이렇게 하면 혼란을 줄이고 중복을 제거할 수 있습니다.
* 최적의 grok 파싱 성능을 유지하려면 `%{data:}` 및 `%{regex(".*"):}`와 같은 와일드카드 매처를 사용하지 마세요. 파싱 구문은 최대한 구체적으로 작성하세요.
* 프로세서 작성 및 표준 속성 활용에 대한 전반적인 개요는 무료 과정 [Going Deeper with Logs Processing][20]에서 확인해 보세요.

### 패싯 개요

패싯(Facet)은 검색 결과를 필터링하고 범위를 좁히는 데 사용할 수 있는 구체적인 질적 또는 양적 속성입니다. 패싯은 검색 결과를 필터링하는 데 반드시 필요한 것은 아니지만, 사용자가 검색을 세분화할 수 있는 기준(차원)을 이해하는 데 중요한 역할을 합니다.

파이프라인이 발행되면 Datadog에서 표준 속성에 대한 패싯을 자동으로 추가합니다. 해당 속성을 [Datadog Standard Attribute][6]로 다시 매핑해야 하는지 검토하세요.

모든 속성이 패싯으로 사용되지는 않습니다. 통합에서 패싯이 필요한 주요 이유는 다음과 같습니다.
* 패싯은 로그 필터링에 직관적인 인터페이스를 제공합니다. Log Management  자동 완성 기능에 활용되어 사용자가 로그에서 주요 정보를 찾고 집계할 수 있도록 합니다.
* 패싯을 사용하면 가독성이 낮은 속성의 이름을 이해하기 쉬운 레이블로 바꿀 수 있습니다. 예: `@deviceCPUper` → `Device CPU Utilization Percentage`.

[Log Explorer][16]에서 [패싯][12]을 생성할 수 있습니다.

#### 패싯 생성

패싯을 올바르게 정의하는 것이 중요합니다. Datadog의 Log Management 제품 전반에 걸쳐 분석, 모니터, 집계 기능에서 인덱싱된 로그의 유용성을 향상시키기 때문입니다.

Log Management 전반에 자동 완성 기능을 추가하여 애플리케이션 로그를 더 쉽게 찾을 수 있습니다.

<div class="alert alert-info">"Measures"라고 하는 정량적 패싯을 사용하면 관계 연산자를 사용하여 다양한 숫자 값 범위에서 로그를 필터링할 수 있습니다.
예를 들어, 대기 시간 속성에 대한 측정값을 사용하면 특정 기간보다 긴 모든 로그를 검색할 수 있습니다. </div>

##### 필수 조건

사용자 지정 패싯에 매핑된 속성은 먼저 네임스페이스를 지정해야 합니다
: [Datadog Standard Attribute][6]에 매핑되지 않는 일반 사용자 지정 속성은 사용자 지정 [패싯][14]과 함께 사용할 때 네임스페이스를 지정해야 합니다. [Attribute Remapper][5]를 사용하면 통합 이름으로 속성의 네임스페이스를 지정할 수 있습니다.
예를 들어, `attribute_name`은 `integration_name.attribute_name`로 리매핑됩니다.

사용자 정의 패싯은 기존 Datadog 패싯을 복제해서는 안 됩니다
: 기존의 기본 제공 Datadog 패싯과 혼동을 피하기 위해, 이미 [Datadog Standard Attributes][6]에 매핑된 패싯과 중복되는 사용자 정의 패싯은 생성하지 마세요.

사용자 지정 패싯은 `source` 이름 아래에 그룹화해야 합니다
: 사용자 지정 패싯을 생성할 때 그룹을 지정해야 합니다. `Group` 값을 통합 이름과 동일하게 `source`로 설정하세요.

사용자 지정 패싯은 매핑된 속성과 동일한 데이터 유형을 가져야 합니다
: 패싯 데이터 유형(String, Boolean, Double, Integer)을 매핑된 속성과 동일한 유형으로 설정하세요. 유형이 일치하지 않으면 패싯이 의도한 대로 사용되지 않고 잘못 입력될 수 있습니다.

**패싯 또는 측정값 추가**

1. 패싯이나 측정값을 추가하려는 속성이 포함된 로그를 클릭합니다.
2. 로그 패널에서 속성 옆에 있는 톱니바퀴 아이콘을 클릭합니다.
3. **Create facet/measure for @attribute**를 선택합니다.
4. 측정값의 단위를 정의하려면 **Advanced options**을 클릭합니다. 속성이 어떻게 나타나는지에 따라 단위를 선택하세요.
**참고**: 속성이 어떻게 나타나는지에 따라 측정값의 [단위][11]을 정의하세요.
5. Facet List를 확인하는데 도움이 되는 패싯 **Group**을 지정합니다. 패싯 그룹이 없으면 **New group**을 선택하고 소스 태그와 일치하는 그룹 이름을 입력한 후 새 그룹에 대한 설명을 추가하세요.
6. 패싯을 생성하려면 **Add**를 클릭합니다.

#### 패싯 구성 및 편집

1. 로그 패널에서 구성하거나 그룹화하려는 속성 옆에 있는 톱니바퀴 아이콘을 클릭합니다.
2. **Edit facet/measure for @attribute**을 선택합니다. 해당 속성에 대한 패싯이 아직 없으면 **Create facet/measure for @attribute**를 선택합니다.
3. 완료되면 **Add*** 또는 **Update**를 클릭합니다.

**팁**
* 가능한 경우 측정값 단위를 지정해야 합니다. 측정값 단위에는 [단위][27]를 할당할 수 있습니다. `millisecond` 또는`gibibyte`와 같은 단위를 사용하는 두 가지 단위 계열(`TIME`, `BYTES`)이 있습니다.
* 패싯에 설명을 지정할 수 있습니다. 사용자가 패싯을 가장 효과적으로 사용할 수 있도록 명확한 설명을 추가하는 것이 좋습니다.
* `preserveSource:true` 옵션을 사용하여 속성을 다시 매핑하고 원본을 유지하는 경우, 단일 속성에만 패싯을 정의합니다.
* 파이프라인 `.yaml` 구성 파일에서 패싯을 수동으로 구성할 때 패싯에 `source`가 할당됩니다. 이는 속성이 캡처된 위치를 나타내며, 속성의 경우 `log`로, 태그의 경우 `tag`로 표시될 수 있습니다.

## 로그 파이프라인 내보내기

내보내려는 파이프라인 위에 마우스를 올려놓고 **export pipeline**을 선택합니다.

{{< img src="developers/integrations/export_pipeline.png" alt="Datadog에서 로그 파이프라인을 내보내려면 Export Pipeline 아이콘을 클릭합니다." width="50%">}}

로그 파이프라인을 내보낼 때 다음 두 개의 YAML 파일이 포함됩니다.
-**pipeline-name.yaml**: 사용자 정의 패싯, 속성 리매퍼, grok 파서를 포함한 로그 파이프라인.
-**pipeline_name_test.yaml**: 제공된 원시 샘플 로그와 빈 섹션 결과.

참고: 브라우저에 따라 파일 다운로드를 허용하도록 설정을 조정해야 할 수 있습니다.

## 로그 파이프라인 업로드하기
Integration Developer Platform으로 이동한 후 **Data** tab > **Submitted logs**에서 로그 소스를 지정하고 이전 단계에서 내보낸 두 파일을 업로드합니다.

{{< img src="developers/integrations/data_tab.png" alt="Integration Developer Platform의 Data 탭" style="width:100%;" >}}



## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.datadoghq.com/ko/api/latest/logs/#send-logs
[2]: https://docs.datadoghq.com/ko/getting_started/site/
[3]: https://app.datadoghq.com/logs/pipelines
[4]: https://docs.datadoghq.com/ko/logs/log_configuration/processors/?tab=ui#log-date-remapper
[5]: https://docs.datadoghq.com/ko/logs/log_configuration/processors/?tab=ui#remapper
[6]: https://docs.datadoghq.com/ko/standard-attributes?product=log+management
[7]: https://docs.datadoghq.com/ko/logs/log_configuration/processors/?tab=ui#service-remapper
[8]: https://docs.datadoghq.com/ko/logs/log_configuration/processors/?tab=ui#grok-parser
[9]: https://docs.datadoghq.com/ko/logs/log_configuration/processors/?tab=ui#log-message-remapper
[10]: https://docs.datadoghq.com/ko/logs/log_configuration/processors/
[11]: https://docs.datadoghq.com/ko/logs/explorer/facets/#units
[12]: https://docs.datadoghq.com/ko/logs/explorer/facets/
[13]: https://docs.datadoghq.com/ko/logs/log_configuration/pipelines/
[14]: https://docs.datadoghq.com/ko/glossary/#facet
[15]: https://docs.datadoghq.com/ko/glossary/#measure
[16]: https://docs.datadoghq.com/ko/logs/explorer/
[17]: https://docs.datadoghq.com/ko/logs/log_configuration/attributes_naming_convention/#standard-attributes
[18]: https://docs.datadoghq.com/ko/developers/integrations/?tab=integrations
[19]: https://docs.datadoghq.com/ko/logs/log_configuration/processors/?tab=ui#category-processor
[20]: https://learn.datadoghq.com/courses/going-deeper-with-logs-processing
[21]: https://partners.datadoghq.com/
[22]: https://docs.datadoghq.com/ko/developers/integrations/
[23]: https://docs.datadoghq.com/ko/logs/log_collection/?tab=http#additional-configuration-options
[24]: https://docs.datadoghq.com/ko/logs/explorer/search_syntax/#arrays
[25]: https://docs.datadoghq.com/ko/logs/log_configuration/processors/?tab=ui#log-status-remapper
[26]: https://docs.datadoghq.com/ko/getting_started/tagging/#overview
[27]: https://docs.datadoghq.com/ko/logs/explorer/facets/#units
[28]: https://docs.datadoghq.com/ko/logs/log_configuration/pipelines/?tab=date#date-attribute