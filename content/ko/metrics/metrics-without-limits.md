---
algolia:
  tags:
  - 제한없는 메트릭
aliases:
- /ko/metrics/faq/metrics-without-limits/
- /ko/metrics/guide/metrics-without-limits-getting-started/
- /ko/metrics/faq/why-is-my-save-button-disabled/
further_reading:
- link: https://www.datadoghq.com/blog/metrics-without-limits
  tag: 블로그
  text: 제한없는 메트릭 수집TM을 통한 동적 커스텀 메트릭 볼륨 조절
- link: https://dtdg.co/fe
  tag: 기반 활성화
  text: 대화형 세션에 참여해 메트릭을 최대한으로 활용해 보세요.
title: 제한없는 메트릭 수집TM
---

## 개요

제한없는 메트릭 수집TM은 커스텀 메트릭 수집 및 인덱싱을 분리하여 유연성을 제공하는 한편 커스텀 메트릭 볼륨을 관리할 수 있도록 해줍니다. 조직에 가치 있는 커스텀 메트릭 태그에만 지불하면 됩니다.

Metrics without LimitsTM으로 Datadog 전반에서 계속 쿼리할 수 있도록 태그 허용 목록을 선택하여, 앱 내에서 모든 메트릭 유형에 대한 태그를 구성할 수 있습니다. 이는 자동으로 애플리케이션 수준 또는 비즈니스 메트릭(예: `host`)에 연결된 불필요한 태그를 삭제합니다. 또는 앱 내에서 태그 차단 목록을 구성하여 태그를 삭제 및 제외할 수 있습니다. 이렇게 하면 팀에 비즈니스 가치를 제공하는 나머지 필수 태그가 자동으로 유지됩니다. 해당 구성 기능은 [메트릭 요약][1] 페이지에 설명되어 있습니다.

이 페이지는 관측 가능성(observability) 예산 내에서 커스텀 메트릭 볼륨을 관리할 수 있도록 제한없는 메트릭 수집TM의 핵심 구성 요소를 알려줍니다. 

### 단일 메트릭 태그 구성

#### 태그 허용 목록 

1. 아무 메트릭 이름이나 클릭하면 세부 정보 사이드 패널이 열립니다.
2. **Manage Tags**를 클릭한 다음 **Include tags**를 선택하여 대시보드, 노트북, 모니터 및 기타 Datadog 제품에서 쿼리 가능한 상태로 유지하려는 태그를 구성합니다.
3. 태그 허용 목록을 정의합니다. 
기본적으로 태그 구성 모달은 지난 30일 동안 대시보드, 노트북, 모니터 또는 API를 통해 활발히 쿼리된 태그의 Datadog 권장 허용 목록으로 미리 채워집니다. 권장 태그는 라인 그래프 아이콘으로 구분됩니다.
   a. 또한 에셋(대시보드, 모니터, 노트북, SLO)에 사용되는 태그를 포함합니다. 해당 태그는 에셋에 사용되지만 활발히 쿼리되지는 않으며 대상 아이콘으로 표시됩니다. 해당 태그를 추가하면 중요한 에셋의 가시성을 계속 유지할 수 있습니다.
4. 이러한 잠재적 태그 설정으로 인해 인덱싱된 커스텀 메트릭의 *추정 새 볼륨*을 검토합니다.
5. **Save**를 클릭합니다.

{{< img src="metrics/mwl_example_include_tags-compressed_03182025.mp4" alt="허용 목록을 사용한 태그 구성" video=true style="width:100%" >}}

{{< img src="metrics/tags_used_assets.png" alt="고객에게 MWL 구성에서 에셋에 사용되는 태그를 추가할 수 있음을 시연" style="width:100%" >}}

메트릭 API로 태그 설정을 [생성][2], [편집][3], [삭제][4], [영향력 추정][5]할 수 있습니다.

#### 태그 차단 목록 

1. 아무 메트릭 이름이나 클릭하면 세부 정보 사이드 패널이 열립니다.
2. **Manage Tags**를 클릭하고 **Exclude Tags**를 선택합니다.
3. 태그 차단 목록을 정의합니다. 차단 목록에 정의된 태그는 대시보드 및 모니터에서 **쿼리할 수 없습니다**. 지난 30일 동안 대시보드, 노트북, 모니터, API를 통해 활발하게 쿼리된 태그는 라인 그래프 아이콘으로 구분됩니다.
4. 이러한 잠재적 태그 설정으로 인해 인덱싱된 커스텀 메트릭의 *추정 새 볼륨*을 검토합니다.
5. **Save**를 클릭합니다.

{{< img src="metrics/mwl-example-tag-exclusion-compressed_04032025.mp4" alt="Tag Exclusion으로 태그 구성하기" video=true style="width:100%" >}}

메트릭 API 에서 파라미터를 `exclude_tags_mode: true`로 설정하여 태그 차단 목록을 [생성][2] 및 [편집][3]합니다.

**참고:** 태그를 메트릭에서 관리하려면 메트릭에 선언된 유형이 존재해야 합니다. 이는 일반적으로 메트릭 제출 시 수행되지만 메트릭 요약의 메트릭 `Edit` 버튼으로 수동으로 수행할 수도 있습니다.

#### API 사용

메트릭 API로 태그 설정을 [생성][2], [편집][3], [삭제][4], [영향력 추정][5]할 수 있습니다.

### 한 번에 여러 메트릭 설정

[일괄 메트릭 태그 구성 기능][7]으로 커스텀 메트릭 볼륨을 최적화합니다. 구성할 메트릭을 지정하려면 Metrics Summary 페이지에서 **Configure Metrics**를 클릭한 후 **Manage Tags***를 선택합니다. 구성하려는 메트릭 또는 메트릭 네임스페이스를 선택한 다음 다음 중 하나를 수행합니다.
   - [모든 태그 허용](#allow-all-tags) 기능으로 이전의 태그 구성을 재정의하고 모든 태그를 쿼리할 수 있습니다.
   - [태그 포함 또는 제외](#include-or-exclude-tags) 기능으로 쿼리 가능한 태그와 쿼리 불가능한 태그를 각각 정의할 수 있습니다.

#### 모든 태그 허용

{{< img src="metrics/bulk_allow_all_tags.png" alt="Configure tags 섹션에서 Allow all tags가 선택된 Manage Tags 옵션" style="width:100%" >}}

해당 옵션은 기본값으로 선택되며, 이전에 설정한 태그 구성을 재정의하여 모든 태그를 쿼리할 수 있습니다.

#### 태그 포함 또는 제외

포함하거나 제외할 태그를 선택할 때는 [기존 태그 구성 재정의](#override-existing-tag-configures) 또는 [기존 태그 구성 유지](#keep-existing-tag-configures) 중 하나를 선택합니다.

##### 기존 태그 구성 재정의

{{< img src="metrics/bulk_include_tags.png" alt="Configure tags 섹션에서 Include tags와 Override가 선택된 Manage Tags 옵션. 지난 90일 동안 대시보드와 모니터에서 활발하게 쿼리된 태그와 Specific tags를 포함하는 옵션이 선택되어 있음." style="width:100%" >}}

선택한 메트릭에 대한 모든 기존 태그 구성이 재정의되고 새 태그 구성을 정의합니다. 이렇게 하면 모든 메트릭 이름에서 모든 태그를 쿼리할 수 있습니다. **include tags**을 선택하는 경우 다음 중 하나 또는 모두를 포함하도록 선택할 수 있습니다.
   - 지난 30일, 60일 또는 90일 동안 Datadog에서 활발하게 쿼리된 태그.
   - 사용자가 정의한 특정 태그 집합.

##### 기존 태그 구성 유지

{{< img src="metrics/bulk_exclude_tags.png" alt="Configure tags 섹션에서 Exclude tags and Keep이 선택된 Manage Tags 옵션" style="width:100%" >}}

기존 태그 구성은 그대로 유지되며, 구성에 추가할 새 태그를 정의합니다.

#### API 사용

API로 여러 메트릭에 대한 태그를 [구성][13] 및 [삭제][14]할 수 있습니다.

**참고**: 지정된 타임 프레임 내에 활발하게 쿼리된 태그만 포함하려면 `include_actively_queried_tags_window` 속성을 사용하세요.

## 제한없는 메트릭 수집TM 빌링

태그를 구성하면 쿼리할 수 있는 커스텀 메트릭을 제어할 수 있으며 결국 과금 대상 커스텀 메트릭의 개수가 줄어듭니다. Metrics without LimitsTM은 인덱싱 비용과 수집 비용을 분리합니다. Datadog에 모든 데이터를 계속 전송(모든 데이터가 수집됨)하고 Datadog 플랫폼에서 계속 쿼리하려는 태그의 허용 목록을 지정할 수 있습니다. Datadog이 설정한 메트릭에 대해 수집하는 데이터 볼륨이 인덱싱된 더 작은 볼륨과 다른 경우, Metrics Summary 페이지와 Usage 페이지에서 두 개의 별도 볼륨을 확인할 수 있습니다.

- **수집된 커스텀 메트릭**: 수집 태그 전체를 기준으로 한 커스텀 메트릭의 원래 볼륨입니다.
- **Indexed Custom Metrics**: Datadog 플랫폼에서 쿼리 가능한 커스텀 메트릭 볼륨(Metrics without LimitsTM 구성 기준)입니다.

**참고: 설정된 메트릭만 수집된 커스텀 메트릭 볼륨에 영향을 줍니다.** 메트릭이 Metrics without LimitsTM으로 설정되지 않은 경우, 인덱싱된 커스텀 메트릭 볼륨에만 요금이 부과됩니다.

[커스텀 메트릭 빌링][8]에 대해 자세히 알아보세요.

## 제한없는 메트릭 수집TM 시작하기

1. 메트릭 요약 페이지나 [API]를 사용하여 [계획 및 사용량 페이지][9]에서 상위 20개 메트릭을 설장하세요[2].
   대량 메트릭 구성(`*` 구문)을 사용하여 여러 메트릭에서 빠르게 태그를 설정할 수 있습니다. Datadog에서 대량 설정 작업이 완료되면 알림을 전송합니다.

**참고:** [태그 설정 생성 API][2] 를 사용하는 경우 먼저 [태그 설정 카디널리티 예측 도구 API][5]를 사용해 태그 설정 생성 전 태그 설정의 잠재적 영향을 검증합니다. UI 또는 예측 도구 API가 수집된 것보다 더 큰 수의 인덱스 숫자를 반환하면 태그 설정을 저장하지 마세요.

2. 빈 태그 설정을 통해 쿼리되지 않은 메트릭을 설정하세요.

   팀이 Datadog 플랫폼에서 절대 쿼리되지 않는 메트릭을 계속 정리해 감에 따라 빈 태그 허용 목록으로 태그를 설정하여 이러한 쿼리되지 않는 메트릭의 비용을 즉시 최소화할 수 있습니다.

3. 사용량과 빌링을 검토하세요. 메트릭을 설정한 후 변경에 대한 영향을 세 가지 방법으로 측정할 수 있습니다.

   - 설정을 저장하기 전 태그 설정 카디날리티 측정 도구는 인덱스된 커스텀 메트릭의 예측 수를 반환합니다. 이 수는 수집된 커스텀 메트릭 볼륨보다 작아야 합니다.
   - 설정 저장 후 메트릭 요약 상세 정보 사이드 패널에 수집된 커스텀 메트릭 볼륨보다 작은 인덱스된 커스텀 메트릭이 표시됩니다.
   - 설정을 저장한 후 24시간이 지나면 또한 계획 및 사용량 페이지의 **상위 커스텀 메트릭** 표에서 영향을 확인할 수 있습니다. 표의 **월간 누계** 탭과 **가장 최근 날짜** 사이에서 커스텀 메트릭 볼륨 감소를 확인할 수 있습니다.

## 모범 사례

- 실시간 [추정 커스텀 메트릭 사용량][10] 메트릭에서 알림을 설정할 수 있습니다. 그러면 커스텀 메트릭 급증과 설정을 연계할 수 있습니다.

- 제한없는 메트릭 수집TM의 [역할 기반 액세스 제어][11]를 통해 빌링에 영향을 줄 수 있는 이 기능에 대한 사용자 권한을 제어할 수 있습니다.

- 감사 이벤트를 통해 커스텀 메트릭 급증과 연관될 수 있는 태그 구성 또는 백분위수 집계를 추적할 수 있습니다. [Events Stream][12]에서 "tags:audit", "queryable tag configuration" 또는 "percentile aggregations"를 검색합니다.

\*제한없는 메트릭 수집은 Datadog, Inc의 등록 상표입니다.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/metric/summary
[2]: /ko/api/latest/metrics/#create-a-tag-configuration
[3]: /ko/api/latest/metrics/#update-a-tag-configuration
[4]: /ko/api/latest/metrics/#delete-a-tag-configuration
[5]: /ko/api/latest/metrics/#tag-configuration-cardinality-estimator
[6]: /ko/metrics/#time-and-space-aggregation
[7]: /ko/metrics/summary/#configuration-of-multiple-metrics
[8]: /ko/account_management/billing/custom_metrics/
[9]: https://app.datadoghq.com/billing/usage
[10]: /ko/account_management/billing/usage_metrics/
[11]: /ko/account_management/rbac/permissions/?tab=ui#metrics
[12]: https://app.datadoghq.com/event/stream
[13]: /ko/api/latest/metrics/#configure-tags-for-multiple-metrics
[14]: /ko/api/latest/metrics/#delete-tags-for-multiple-metrics