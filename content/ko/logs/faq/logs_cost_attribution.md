---
further_reading:
- link: /logs/log_configuration/logs_to_metrics/
  tag: 설명서
  text: 수집한 로그에서 메트릭 생성
- link: /getting_started/tagging/
  tag: 설명서
  text: 태깅에 대해 알아보기
- link: /dashboards/widgets/table/
  tag: 설명서
  text: 테이블 위젯에 대해 알아보기
kind: faq
title: 로그 비용 어트리뷰션
---

## 개요

Datadog은 [Log Estimated Usage 대시보드][1], 앱 내 [Plan and Usage][2] 섹션, 사용 가능한 [로그 사용량 메트릭][3]을 통해 로그 사용량 정보를 제공합니다. 그러나 특정 팀과 같이 보다 세분화된 비용 어트리뷰션 데이터를 확인해야 하는 경우가 발생할 수 있습니다.

이 가이드는 다양한 팀의 로그 비용 어트리뷰션을 확인하기 위해 커스텀 메트릭과 대시보드를 만드는 방법에 대한 단계를 안내합니다. 부서, 프로젝트, 제품, 리전 등과 같은 다른 속성에도 이 프로세스를 사용할 수 있습니다.

1. [커스텀 태그를 설정합니다](#configure-custom-tags).
2. 해당 태그로 [커스텀 로그 메트릭을 생성합니다](#generate-custom-logs-metrics).
3. 커스텀 로그 메트릭에 대해 [대시보드에서 위젯을 생성합니다](#create-a-dashboard-using-the-custom-logs-metrics).

{{< img src="logs/faq/logs_cost_attribution/cost_attribution_dashboard.png" alt="수집, 민감한 데이터 스캐너, 7일 인덱싱 및 15일 인덱싱에 대해 팀별로 분류된 사용량 및 비용에 대한 테이블 위젯을 표시하는 대시보드. " style="width:85%" >}}

## 새 로그 파이프라인 만들기

비용을 어트리뷰션하려는 로그로 필터링하는 새 로그 파이프라인을 생성합니다. 이 예에서는 팀별로 분류하기 위한 로그의 하위 집합으로 필터링합니다.

1. [Logs Pipelines][4]로 이동합니다.
2. **Add a new pipeline**을 클릭합니다.
3. 비용을 어트리뷰션하려는 로그에 대한 필터를 입력합니다.
4. 파이프라인의 이름을 입력합니다. 예: `Cost attribution by team`
5. 선택적으로 태그 및 설명을 추가합니다.
6. **Create**를 클릭합니다.

파이프라인 목록 끝에 새 파이프라인을 그대로 둡니다. 이렇게 하면 로그가 다른 파이프라인을 통과하여 해당 태그와 속성이 먼저 생성됩니다.

이 비용 어트리뷰션 예시를 위해 생성한 모든 프로세서를 새 파이프라인에 추가합니다.

### `team` 태그 추가하기

Datadog에서는 이러한 [태그 지정 방법][5] 중 하나를 사용하여 **수집 전** 로그에 `team` 태그를 추가할 것을 권장합니다.

하지만 수집 중에 태그를 설정해야 하는 경우 다음 단계에 따라 `team` 태그를 생성하고 추가하세요.

1. [새 `team` 속성을 생성합니다](#create-a-new-team-attribute).
2. [`team` 속성을 태그로 변환하기 위한 리매퍼를 생성합니다](#create-a-remapper-to-convert-the-team-attribute-to-a-tag).

이 프로세스를 사용하여 로그 사용량을 부서, 제품, 리전 등으로 분류하기 위해 원하는 속성을 생성할 수 있습니다.

#### 새 `team` 속성 만들기

[Category Processor][6]를 사용하여 로그에 대한 새 `team` 속성을 생성합니다.

1. 새 파이프라인으로 이동하여 **Add processor**를 클릭합니다.
2. 프로세서 유형에 대해 **Category Processor**를 선택합니다.
3. 프로세서의 이름을 입력합니다. 예: "Create team attribute"
4. **Set target category attribute** 필드에 `team`을 입력합니다. 이렇게 하면 `team` 속성이 생성됩니다.
5. **Populate category** 섹션에서 각 팀에 대한 카테고리를 추가합니다. 예를 들어, `service:a` 및 `env:prod`와 일치하는 로그 이벤트에 `team:service_a` 태그를 추가합니다.
      a. **All events that match** 필드에서 `service:a` 및 `env:prod`를 입력합니다.
      b. **Appear under the value name** 필드에서 `service_a`를 입력합니다. 
      c. **Add**를 클릭합니다.
6. 다른 팀을 별도의 카테고리로 추가합니다.
7. **Create**를 클릭합니다.

#### `team` 속성을 태그로 변환하는 리매퍼 만들기

1. 파이프라인으로 이동하여 **Add processor**를 클릭합니다.
2. 프로세서 유형에 대해 **Remapper** 를 선택합니다.
3. 프로세서의 이름을 입력합니다. 예: "Convert team attribute to tag"
4. **Set attribute(s) or tag key to remap** 섹션에서 **Attribute(s)**를 선택하고 `team`을 입력합니다.
5. **Set target attribute or tag key** 섹션에서 **Tag key**를 선택하고 `team`을 입력합니다.
6. 속성이 제거되고 태그만 유지되도록 하려면 **Preserve source attribute**를 비활성화하세요.
7. **Override on conflict**를 활성화합니다.
8. **Create**를 클릭합니다.

{{< img src="logs/faq/logs_cost_attribution/team_remapper.png" alt="팀 리매퍼를 생성하기 위해 입력된 모든 데이터를 보여주는 리매퍼 생성 양식" style="width:75%" >}}

## 커스텀 태그 설정하기 

커스텀 태그를 생성하면 커스텀 로그 사용량 메트릭을 사용 사례와 관련된 카테고리로 구성할 수 있습니다. 이 예에서는 다음 태그를 생성합니다.

- `retention_period`: Datadog 인덱스에 로그가 보관되는 일수를 나타냅니다. 
- `online_archives`: 로그가 온라인 아카이브로 라우팅되었는지 여부를 나타냅니다.
- `sds`: 민감한 데이터 스캐너가 로그를 검사했는지 여부를 나타냅니다.

### `retention_period` 태그 만들기 

Datadog에서는 인덱스의 보관 기간이 모두 동일한 경우에도 <code>retention_period</code> 태그를 설정할 것을 권장합니다. 이렇게 하면 여러 보관 기간을 사용할 때 모든 로그에 해당 보관 기간 태그가 지정됩니다.

`retention_period`는 로그가 Datadog 인덱스에 보관되는 일수입니다. 로그 보관 일수를 기준으로 인덱싱 청구 비용이 발생하므로 `retention_period` 태그를 사용하여 각 로그를 보관 기간과 연결하여 비용 어트리뷰션을 확인하세요.

Datadog은 다음과 같은 방법으로 `retention_period` 태그를 설정할 것을 권장합니다.

1. [새 `index_name` 속성을 생성합니다](#create-a-new-index_name-attribute).
2. [새 `retention_period` 속성을 생성합니다](#create-a-new-retention_period-attribute).
3. [`retention_period` 속성을 태그로 변환하기 위해 리매퍼를 생성합니다](#create-a-remapper-to-convert-the-retention_period-attribute-to-a-tag).

#### 새 `index_name` 속성 만들기

[Category Processor][6]를 사용하여 로그가 라우팅되는 인덱스를 식별하기 위한 새 `index_name` 속성을 생성합니다.

1. 이전에 생성한 파이프라인으로 이동하여 **Add processor**를 클릭합니다.
2. 프로세서 유형에 대해 **Category Processor**를 선택합니다.
3. 프로세서의 이름을 입력합니다. 예: "Create index_name attribute"
4. **Set target category attribute** 필드에 **index_name**을 입력합니다. 이렇게 하면 `index_name` 속성이 생성됩니다.
5. 각 인덱스에 대한 카테고리를 추가합니다. 예를 들어, `env:staging` 태그가 지정된 모든 로그에 대해 `retention-7`로 이름이 지정된 인덱스가 있는 경우:
    {{< img src="logs/faq/logs_cost_attribution/indexes_configuration.png" alt="필터 쿼리, 보관 기간, 보관-30, 보관-15, 보관-7 및 데모 인덱스에 대한 온라인 아카이브 활성화 여부를 보여주는 인덱스 목록" >}} 
**Populate category** 섹션에서 다음을 수행합니다.
      a. **All events that match** 필드에서 `env:staging`을 입력합니다.  
      b. **Appear under the value name** 필드에서 `retention-7`을 입력합니다.  
      c. **Add**를 클릭합니다.
6. 다른 인덱스를 별도의 카테고리로 추가합니다.
7. **Create**를 클릭합니다.

{{< img src="logs/faq/logs_cost_attribution/indexes_category_processor.png" alt="카테고리 프로세서 양식은 index_name 속성을 생성하기 위해 데이터를 입력합니다." style="width:75%" >}} 

#### 새 `retention_period` 속성 만들기 

[Category Processor][6]를 사용하여 인덱스를 보관 기간과 연결하는 새 `retention_period` 속성을 만듭니다.

1. 파이프라인으로 이동하여 **Add processor**를 클릭합니다.
2. 프로세서 유형에 대해 **Category Processor**를 선택합니다.
3. 프로세서의 이름을 입력합니다. 예: "Create retention_period attribute"
4. **Set target category attribute** 필드에 `retention_period`를 입력합니다. 이렇게 하면 `retention_period` 속성이 생성됩니다.
5. 각 보관 기간에 대한 카테고리를 추가합니다. 예를 들어 이름이 `retention-7`인 7일 보관 인덱스인 경우 **Populate category** 섹션에서 다음을 수행합니다.
      a. **All events that match** 필드에서 `@index_name:(retention-7)`을 입력합니다.
      b. **Appear under the value name** 필드에서 `7`을 입력합니다.
      c. **Add**를 클릭합니다.
6. 다른 보관 기간을 별도의 카테고리로 추가합니다.
7. **Create**를 클릭합니다.

{{< img src="logs/faq/logs_cost_attribution/retention_period_processor.png" alt="카테고리 프로세서 양식에 데이터를 입력하여 retention_period 속성을 생성합니다." style="width:75%" >}} 

#### `retention_period` 속성을 태그로 변환하는 리매퍼 만들기

1. 파이프라인으로 이동하여 **Add processor**를 클릭합니다.
2. 프로세서 유형에 대해 **Remapper** 를 선택합니다.
3. 프로세서의 이름을 입력합니다. 예: "Convert retention_period attribute to tag"
4. **Set attribute(s) or tag key to remap** 섹션에서 **Attribute(s)**를 선택하고 `retention_period`를 입력합니다.
5. **Set target attribute or tag key** 섹션에서 **Tag key**를 선택하고 `retention_period`을 입력합니다.
6. 속성이 제거되고 태그만 유지되도록 하려면 **Preserve source attribute**를 비활성화하세요.
7. **Override on conflict**를 활성화합니다.
8. **Create**를 클릭합니다.

{{< img src="logs/faq/logs_cost_attribution/retention_period_remapper.png" alt="retention_period 리매퍼를 생성하기 위해 입력된 모든 데이터를 보여주는 리매퍼 생성 양식" style="width:75%" >}}

### `online_archives` 태그 만들기

<div class="alert alert-warning">Datadog은 온라인 아카이브가 활성화된 인덱스가 없더라도 <code>online_archives</code> 태그를 설정할 것을 권장합니다. 이렇게 하면 온라인 아카이브를 사용할 경우 관련 로그에 <code>online_archives</code> 태그가 지정됩니다.</div>

`online_archives` 태그는 로그가 온라인 아카이브로 라우팅되었는지 여부를 나타냅니다. 온라인 아카이브에는 표준 인덱싱과 다르게 요금이 부과되므로 `online_archives` 태그를 사용하여 온라인 아카이브로 라우팅된 로그를 확인하고 비용 어트리뷰션을 확인하세요.

Datadog은 다음과 같은 방법으로 `online_archive` 태그를 설정할 것을 권장합니다.

#### `online_archives` 속성 만들기

[Category Processor][6]를 사용하여 관련 인덱스에 온라인 아카이브가 활성화되어 있는지 여부를 나타내는 새 `online_archives` 속성을 만듭니다.

1. 이전에 생성한 파이프라인으로 이동하여 *Add processor**를 클릭합니다.
2. 프로세서 유형에 대해 **Category Processor**를 선택합니다.
3. 프로세서의 이름을 입력합니다. 예를 들어, "Create online_archives attribute". 이렇게 하면 `online_archives` 속성이 생성됩니다.
4. **Populate category** 섹션에서 두 카테고리를 추가합니다. 
      <br>  **첫 번째 카테고리**에서는 온라인 아카이브가 활성화된 모든 인덱스에 `true` 값이 할당됩니다. 예를 들어, `retention-30`로 이름이 지정된 인덱스의 로그가 온라인 아카이브로 이동하는 경우:
      a. **All events that match** 필드에 `@index_name:(retention-30)`을 입력합니다.
      b. **Appear under the value name** 필드에 `true`를 입력합니다.
      c. **Add**를 클릭합니다.
      <br> **두 번째 카테고리에서** 다른 모든 인덱스에 `false` 값이 할당됩니다. 
      a. **All events that match** 필드에 `*`을 입력합니다.
      b. **Appear under the value name** 필드에 `false`를 입력합니다.
      c. **Add**를 클릭합니다.
5. **Create**를 클릭합니다.

{{< img src="logs/faq/logs_cost_attribution/online_archives_attribute.png" alt="카테고리 프로세서 양식은 online_archives 속성을 생성하기 위해 데이터를 입력합니다." style="width:75%" >}}

#### `online_archives` 속성을 태그로 변환하는 리매퍼 만들기

1. 파이프라인으로 이동하여 **Add processor**를 클릭합니다.
2. 프로세서 유형에 대해 **Remapper** 를 선택합니다.
3. 프로세서의 이름을 입력합니다. 예: "Convert online_archives attribute to tag"
4. **Set attribute(s) or tag key to remap** 섹션에서 **Attribute(s)**를 선택하고 `online_archives`을 입력합니다.
5. **Set target attribute or tag key** 섹션에서 **Tag key**를 선택하고 `online_archives`을 입력합니다.
6. 속성이 제거되고 태그만 유지되도록 하려면 **Preserve source attribute**를 비활성화하세요.
7. **Override on conflict**를 활성화합니다.
8. **Create**를 클릭합니다.

<div class="alert alert-info"> Category Processor의 카테고리 순서는 중요합니다. 속성에는 인덱스와 동일한 로직을 사용하여 로그가 일치하는 쿼리와 일치하는 첫 번째 카테고리의 값이 할당됩니다. 따라서 일치하는 쿼리와 인덱스 Category Processor의 순서가 실제 인덱스 순서와 동일해야 하며, Online Archives Category Processor에서 `true` 카테고리를 `false` 이전에 항상 미리 확인해야 합니다.<br><br>
인덱스 설정이 변경되면 프로세서 설정을 업데이트하여 변경 사항을 반영해야 합니다.</div>


Datadog은 [Datadog API 엔드포인트][7]를 통해 프로세스를 자동화하여 설정을 자동으로 검색하고 업데이트할 것을 권장합니다.

### `sds` 태그 만들기

<div class="alert alert-warning">Datadog은 민감한 데이터 스캐너를 사용하지 않는 경우에도 <code>sds</code> 태그를 설정할 것을 권장합니다. 이렇게 하면 민감한 데이터 스캐너를 사용할 때 모든 관련 로그에 <code>sds</code> 태그가 지정됩니다.</div>

`sds` 태그는 민감한 데이터 스캐너가 로그를 검사했는지 여부를 나타냅니다. 민감한 데이터 스캐너의 특정 사용과 관련된 비용을 추정하려면 `sds` 태그를 사용하세요.

민감한 데이터 스캐너의 경우, 청구되는 사용량은 스캔한 로그의 양을 기준으로 하므로 스캔 규칙이 아닌 스캔 그룹과 일치합니다. 따라서 모든 로그와 일치하는 정규식을 사용하여 각 스캔 그룹에 프록시 스캔 규칙을 만들어야 합니다. 이렇게 하면 스캐닝을 거친 모든 로그에 태그가 지정됩니다.

1. [Sensitive Data Scanner][8]로 이동합니다.
2. 각 스캐닝 그룹에서:
      a. **Add Scanning Rule**을 클릭합니다.  
      b. 모든 로그를 일치시키려면 **Define Regex to match** 필드에 `.`를 입력합니다.
      c. **Scan the entire event or a portion of it** 필드에서 **Entire Event**를 선택합니다.
      d. **Add tags** 필드에서 `sds:true`를 입력합니다.
      e. **Define action on match**를 **No action**으로 둡니다.
      f. 스캔 규칙 이름을 입력합니다. 예: "Create sds tag"
      g. **Create**를 클릭합니다.  

## 커스텀 로그 메트릭 생성

Datadog은 예상 사용량을 확인할 수 있도록 [로그 사용량 메트릭][3] 세트를 제공합니다. 그러나 이러한 메트릭은 수정할 수 없으므로 대신 특정 로그 사용 사례에 대한 커스텀 로그 메트릭을 생성할 수 있습니다.

사용량은 제품에 따라 기가바이트(GB) 또는 수백만 개의 이벤트로 측정되므로 두 가지 다른 메트릭을 생성해야 합니다.

- 수집된 바이트 수를 계산하는 메트릭.
- 수집된 이벤트 수를 계산하는 메트릭.

커스텀 메트릭을 설정할 때 `group by` 필드의 태그는 메트릭의 범위입니다. 메트릭이 생성되면 이러한 필드를 사용하여 메트릭을 필터링하고 집계합니다. `group by` 필드에 다음 태그를 포함해야 합니다.

- `datadog_index`: 로그가 라우팅되는 경우 태그에는 로그가 라우팅되는 인덱스의 이름이 포함됩니다.
- `datadog_is_excluded`: 라우팅된 인덱스의 제외 필터에 의해 로그가 거부되었는지 여부를 나타냅니다.
- 위에서 설정한 모든 커스텀 태그 (`team`, `retention_period`, `online_archives`, `sds`).

메트릭 생성에 대한 지침은 [로그 기반 메트릭 생성][9]을 참조하세요.

<div class="alert alert-info">메트릭 설정 업데이트(예: 쿼리 필터, 범위 등 변경)는 이미 수집된 로그에 적용되지 않으므로 모든 관련 태그가 메트릭의 범위에 포함되어 있는지 확인하는 것이 중요합니다.</div>

{{< img src="logs/faq/logs_cost_attribution/bytes_injected_metric.png" alt="메트릭 이름으로 log.estimated.usage.ingested_bytes를 표시하고 언급된 태그가 있는 필드 기준 그룹을 표시하는 새로운 메트릭 양식" style="width:75%" >}}

{{< img src="logs/faq/logs_cost_attribution/events_injected_metric.png" alt="메트릭 이름으로 log.estimated.usage.ingested_events를 표시하고 언급된 태그가 있는 필드별 그룹을 표시하는 새로운 메트릭 양식" style="width:75%" >}}

## 커스텀 로그 메트릭으로 대시보드 만들기 

Datadog에서 생성된 커스텀 로그 메트릭을 사용하는 방법에는 여러 가지가 있습니다. 대시보드에 메트릭을 표시하고, 알림을 받고, 노트북에서 사용하고, Metrics Explorer에서 쿼리하는 등 다양한 방법으로 사용할 수 있습니다.

Datadog은 다음 각 제품에 대해 [테이블 위젯][11]으로 [대시보드를 생성][10]하여 사용량을 추적할 것을 권장합니다.

- 로그 수집
- 로그를 위한 민감함 데이터 스캐너
- 보관 기간별(3, 7, 15, 30일 등) 로그 인덱싱
- 온라인 아카이브

새 대시보드를 만드려면:

1. [Dashboards 목록][12]으로 이동합니다.
2. 오른쪽 상단의 **New Dashboard**를 클릭합니다.
3. 대시보드 이름을 입력합니다.
4. **New Dashboard**를 클릭합니다.

### 로그 수집 사용량을 위한 위젯 만들기

Datadog은 로그 수집용 테이블 위젯을 다음과 같이 설정할 것을 권장합니다.

1. 대시보드에서 **Add Widgets**을 클릭합니다.
2. **Table** 위젯을 선택합니다.
3. 수집된 바이트 수를 계산하기 위해 **Metrics** 필드에서 이전에 생성한 **bytes** 카운트 메트릭을 선택합니다.
4. **sum by** 필드를 선택하고 `team` 태그를 추가하여 팀별 사용량을 바이트 단위로 표시합니다. 다양한 비용 버킷에 대해 다른 태그를 추가할 수도 있습니다. (예: 호스트별 사용량 확인 시 `host` 태그 추가)
5. 사용량을 비용으로 변환하려면 다음 공식을 추가하세요: `Usage in gigabytes` * `Unit cost for Log Ingestion`.
      **참고**: 기가바이트당 계약 가격이 변경되면 공식을 수동으로 업데이트해야 합니다.
6. **Save**를 클릭합니다.

{{< img src="logs/faq/logs_cost_attribution/logs_ingestion_metric_widget.png" alt="로그 수집 사용량을 위해 입력된 데이터를 표시하는 위젯 편집 양식" style="width:75%" >}}

{{< img src="logs/faq/logs_cost_attribution/ingestion_widget.png" alt="팀별로 분류된 수집 사용량 및 비용을 보여주는 테이블 위젯" style="width:60%" >}}

### 민감한 데이터 스캐너용 위젯 만들기

Datadog은 민감한 데이터 스캐너용 테이블 위젯을 다음과 같이 설정할 것을 권장합니다.

1. 대시보드에서 **Add Widgets**을 클릭합니다.
2. **Table** 위젯을 선택합니다.
3. 수집된 바이트 수를 계산하기 위해 **Metrics** 필드에서 이전에 생성한 **bytes** 카운트 메트릭을 선택합니다.
4. **from** 필드에서 `sds:true`를 입력하여 민감한 데이터 스캐너에서 검사한 로그만 필터링합니다.
5. **sum by** 필드를 선택하고 `team` 태그를 추가하여 팀별 사용량을 바이트 단위로 표시합니다. 다양한 비용 버킷에 대해 다른 태그를 추가할 수도 있습니다.
6. 사용량을 비용으로 변환하려면 다음 공식을 추가하세요: `Usage in gigabytes` * `Unit cost for the Sensitive Data Scanner`.  
   **참고**: 기가바이트당 계약 가격이 변경되면 공식을 수동으로 업데이트해야 합니다.
7. **Save**를 클릭합니다.

{{< img src="logs/faq/logs_cost_attribution/sds_metric_widget.png" alt="민감한 데이터 스캐너 로그 사용량에 대해 입력된 데이터를 보여주는 위젯 편집 양식" style="width:75%" >}}

{{< img src="logs/faq/logs_cost_attribution/sds_widget.png" alt="팀별로 분류된 민감한 데이터 스캐너 사용량을 보여주는 테이블 위젯" style="width:60%" >}}


### 로그 인덱싱 사용량을 위한 위젯 만들기

인덱싱은 로그 보관 일수를 기준으로 요금이 부과되므로 보관 기간마다 위젯을 하나씩 생성하세요.

Datadog은 로그 인덱싱용 테이블 위젯을 다음과 같이 설정할 것을 권장합니다.

1. 대시보드에서 **Add Widgets**을 클릭합니다.
2. **Table** 위젯을 선택합니다.
3. 수집된 이벤트 수를 계산하려면 이전에 생성한 **events** 카운트 메트릭을 선택합니다.
4. **from** 필드에서 다음을 추가합니다.
      a. 인덱스로 라우팅된 로그만 필터링하려면 `datadog_index:*` 
      b. 제외 필터와 일치하지 않는 로그만 필터링하려면 `datadog_is_excluded:false` 
      c. `retention_period:7`는 7일 동안 보관되는 로그만 필터링합니다. 모든 인덱스의 보관 기간이 동일하여 이전에 이 태그를 설정하지 않은 경우에는 이 태그를 추가할 필요가 없습니다. 추가적인 `retention_period` 태그가 있는 경우 각 태그에 대해 별도의 위젯을 생성하세요.
5. **sum by** 필드를 선택하고 `team` 태그를 추가해 팀별 이벤트 사용량을 표시합니다. 다양한 비용 버킷에 대해 다른 태그를 추가할 수도 있습니다.
6. 사용량을 비용으로 변환하려면 다음 공식을 추가하세요. `Usage in millions of events` * `Unit cost for 7 days of retention`. 백만 건의 이벤트당 계약 가격이 변경되면 공식을 수동으로 업데이트해야 합니다.
7. **Save**를 클릭합니다.

각 `retention_period` 태그에 대해 위젯을 생성하세요.

{{< img src="logs/faq/logs_cost_attribution/indexing_metric_widget.png" alt="로그 인덱싱 사용량에 대해 입력된 데이터를 표시하는 위젯 편집 양식" style="width:75%" >}}

{{< img src="logs/faq/logs_cost_attribution/7_day_indexing_widget.png" alt="팀별로 분류된 7일 인덱싱 사용량을 보여주는 테이블 위젯" style="width:60%" >}}

### 온라인 아카이브 사용량을 위한 위젯 만들기

인덱스에 대해 온라인 아카이브가 활성화되면 로그가 복제되어 둘 다에 저장됩니다:

1. 제외 필터, 로그는 제외 필터를 통과하는 경우에만 인덱싱됩니다.
2. 온라인 아카이브에는 바로 이동합니다.

따라서 온라인 아카이브로 이동하는 로그에는 제외 필터가 적용되지 않습니다.

{{< img src="logs/faq/logs_cost_attribution/exclusion_filters_online_archives.png" alt="제외 필터용 파이프라인과 온라인 아카이브용 파이프라인을 보여주는 온라인 아카이브 인덱스" style="width:75%" >}}

이러한 정보를 기반으로 Datadog은 다음과 같은 방식으로 온라인 아카이브용 테이블 위젯을 설정할 것을 권장합니다.

1. 대시보드에서 **Add Widgets**을 클릭합니다.
2. **Table** 위젯을 선택합니다.
3. 수집된 이벤트 수를 계산하기 위해 **Metrics** 필드에서 이전에 생성한 **events** 카운트 메트릭을 선택합니다.
4. **from** 필드에서 다음을 추가합니다.
      - 인덱스로 라우팅된 로그만 필터링하려면 `datadog_index:*` 
      - 온라인 아카이브로 라우팅된 로그만 필터링하려면 `online_archives:true`

5. **sum by** 필드를 선택하고 `team` 태그를 추가해 팀별 이벤트 사용량을 표시합니다. 다양한 비용 버킷에 대해 다른 태그를 추가할 수도 있습니다.
6. 사용량을 비용으로 변환하려면 다음 공식을 추가하세요: `Usage in millions of events` * `Unit cost for Online Archives`.
      **참고**: 백만 건의 이벤트당 계약 가격이 변경되면 공식을 수동으로 업데이트해야 합니다.
7. **Save**를 클릭합니다.

{{< img src="logs/faq/logs_cost_attribution/online_archives_metric_widget.png" alt="온라인 아카이브 사용량에 대해 입력된 데이터를 보여주는 위젯 편집 양식" style="width:75%" >}}

### 총 사용량 및 비용에 대한 위젯 만들기

모든 제품을 단일 위젯으로 집계하여 총 사용량과 비용을 확인할 수 있습니다. Datadog에서는 다음과 같은 방식으로 테이블 위젯을 설정할 것을 권장합니다.

1. 대시보드에서 **Add Widgets**을 클릭합니다.
2. **Table** 위젯을 선택합니다.
3. 다른 위젯에서 생성된 모든 쿼리와 공식을 이 위젯에 추가합니다.
    - [로그 수집](#create-a-widget-for-log-ingestion-usage)
    - [로그를 위한 민감한 데이터 스캐너](#create-a-widget-for-sensitive-data-scanner)
    - [로그 인덱싱](#create-a-widget-for-log-indexing-usage)
    - [온라인 아카이브](#create-a-widget-for-online-archives-usage)
4. **Save**를 클릭합니다.

{{< img src="logs/faq/logs_cost_attribution/all_metrics_widget.png" alt="6가지 다른 메트릭을 표시하는 테이블 위젯의 데이터 섹션 그래프" style="width:75%" >}}

### 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/dash/integration/30602/log-management---estimated-usage
[2]: https://app.datadoghq.com/billing/usage
[3]: /ko/logs/log_configuration/logs_to_metrics/#logs-usage-metrics
[4]: https://app.datadoghq.com/logs/pipelines
[5]: /ko/getting_started/tagging/#tagging-methods
[6]: /ko/logs/log_configuration/processors/?tab=ui#category-processor
[7]: /ko/logs/log_configuration/processors/?tab=api#category-processor
[8]: https://app.datadoghq.com/organization-settings/sensitive-data-scanner
[9]: /ko/logs/log_configuration/logs_to_metrics/#generate-a-log-based-metric
[10]: /ko/dashboards/#new-dashboard
[11]: /ko/dashboards/widgets/table/
[12]: https://app.datadoghq.com/dashboard/lists