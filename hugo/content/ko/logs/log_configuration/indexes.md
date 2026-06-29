---
aliases:
- /ko/logs/dynamic_volume_control
- /ko/logs/indexes/
description: Datadog로 인덱싱된 로그 볼륨 제어
further_reading:
- link: /logs/explorer/#visualize
  tag: 설명서
  text: 로그 분석 실행하기
- link: /logs/log_configuration/processors
  tag: 설명서
  text: 로그 처리 방법 알아보기
- link: /logs/log_configuration/parsing
  tag: 설명서
  text: 구문 분석에 대해 배우기
- link: https://www.datadoghq.com/blog/logging-without-limits/
  tag: 블로그
  text: Logging without Limits*
- link: https://www.datadoghq.com/blog/zendesk-cost-optimization/#optimizing-log-usage-to-manage-volume-and-cost
  tag: 블로그
  text: '규모에 맞는 Datadog 최적화: Zendesk의 비용 효율적 관측 가능성'
- link: https://learn.datadoghq.com/courses/log-indexes
  tag: 학습 센터
  text: 인덱싱된 로그 볼륨 관리 및 모니터링
title: 인덱스
---
로그 인덱스를 사용하면 데이터를 가치별 그룹으로 분류하여 서로 다른 보존 기간, 할당량, 사용량 모니터링 및 과금 정책을 적용함으로써 Log Management 예산을 세밀하게 제어할 수 있습니다. 인덱스는 [구성 페이지][1]의 인덱스 섹션에 있습니다. 더 많은 정보를 보려면 이들을 두 번 클릭하거나 *edit* 버튼을 클릭하여 지난 3일 동안 인덱싱된 로그 수와 해당 로그의 보존 기간을 확인하세요.

{{< img src="logs/indexes/index_details.jpg" alt="인덱스 세부 정보" style="width:70%;">}}

[패싯 검색][2], [패턴][3], [분석][4] 및 [모니터링][6]에 인덱싱된 로그를 사용할 수 있습니다.

## 여러 인덱스 {#multiple-indexes}

기본적으로 각 새 계정에는 모든 로그의 모놀리식 집합을 나타내는 단일 인덱스가 제공됩니다. Datadog에서는 필요한 경우 여러 인덱스를 사용할 것을 권장합니다.

* 여러 [보존 기간](#update-log-retention)
* 여러 [일일 할당량](#set-daily-quota)을 통한 세밀한 예산 관리

Log Explorer는 [여러 인덱스를 대상으로 한 쿼리][7]를 지원합니다.

### 인덱스 추가 {#add-indexes}

“New Index” 버튼을 사용하여 새 인덱스를 생성합니다. 각 계정에 대해 만들 수 있는 인덱스의 최대 개수는 100개이며 기본적으로 100개로 설정되어 있습니다.

{{< img src="logs/indexes/add-index.png" alt="인덱스 추가" style="width:70%;">}}

**참고**: 인덱스 이름은 문자로 시작해야 하며 소문자, 숫자 또는 '-' 문자만 포함할 수 있습니다.

<div class="alert alert-info">
계정의 최대 인덱스 수를 늘려야 하는 경우 <a href="/help">Datadog 지원팀에 문의</a>하세요.
</div>

### 인덱스 삭제 {#delete-indexes}

조직에서 인덱스를 삭제하려면 인덱스 액션 트레이에서 “Delete” 아이콘을 사용합니다. 이 기능은 `Logs delete data` 권한을 가진 사용자만 사용할 수 있습니다.

{{< img src="logs/indexes/delete-index.png" alt="인덱스 삭제" style="width:70%;">}}

<div class="alert alert-danger">
삭제된 인덱스와 같은 이름의 인덱스는 다시 생성할 수 없습니다. 
</div>

**참고:** 삭제된 인덱스는 더 이상 신규 로그를 수신하지 않습니다. 삭제된 인덱스의 로그는 더 이상 조회할 수 없습니다. 해당 로그가 보존 기간에 따라 모두 만료되면 인덱스 페이지에서도 해당 인덱스가 표시되지 않습니다.



## 인덱스 필터 {#indexes-filters}

인덱스 필터를 사용하면 어떤 로그가 어떤 인덱스로 저장될지를 동적으로 제어할 수 있습니다. 예를 들어 `status:notice` 속성으로 필터링된 첫 번째 인덱스, `status:error` 속성으로 필터링된 두 번째 인덱스, 필터가 없는 마지막 인덱스(`*`에 해당)를 생성하면 모든 `status:notice` 로그는 첫 번째 인덱스로, 모든 `status:error` 로그 는 두 번째 인덱스로, 나머지는 마지막 인덱스로 이동하게 됩니다.

{{< img src="logs/indexes/multi_index.png" alt="여러 인덱스" style="width:70%;">}}

**참고**: **로그는 필터와 일치하는 첫 번째 인덱스로 전달되고**, 사용 사례에 따라 인덱스 목록에서 드래그 앤 드롭을 사용하여 순서를 재배열 수 있습니다.

## 제외 필터 {#exclusion-filters}

기본적으로 로그 인덱스에는 제외 필터가 없습니다. 즉, 인덱스 필터와 일치하는 모든 로그 인덱스가 색인화됩니다.

그러나 로그가 모두 똑같이 가치 있는 것은 아니므로 제외 필터는 색인에서 어떤 로그를 제거할지 제어합니다. 제외된 로그는 인덱스에서 삭제되지만 [Livetail][8]을 통해 계속 흐르며 [메트릭 생성][9] 및 [아카이브][10]에 사용될 수 있습니다.

제외 필터를 추가하려면 다음을 수행하세요.

1. [로그 인덱스][11]로 이동합니다.
2. 제외 필터를 추가하려는 인덱스를 펼칩니다. 
3. **Add an Exclusion Filter**를 클릭합니다.

제외 필터는 쿼리, 샘플링 규칙 및 활성/비활성 토글로 정의됩니다.

* 기본 **쿼리**는 `*`입니다. 즉, 인덱스로 유입되는 모든 로그가 제외 대상이 됩니다. [로그 쿼리를 사용][12]하여 제외 필터의 범위를 특정 로그 집합으로 제한할 수 있습니다.
* 기본 **샘플링 규칙**은 쿼리와 일치하는 `Exclude 100% of logs`입니다. 샘플링 비율을 0%에서 100%까지 조정하고 샘플링 비율을 개별 로그에 적용할지, 아니면 속성의 고유 값으로 정의된 로그 그룹에 적용할지 결정합니다.
  * 샘플링 비율이 개별 로그에 적용되는 경우, 로그에 존재하는 트레이스 ID의 존재 여부에 따라 샘플링이 진행됩니다. 이 경우 샘플링된 로그는 샘플링된 트레이스와 연관될 가능성이 높아지므로, 통합 텔레메트리 데이터 유지에 도움이 됩니다..
  * 트레이스 ID의 고유 값을 기준으로 샘플링하는 경우에도 동작 방식은 개별 로그 샘플링과 동일합니다.
* 기본 **토글** 상태는 활성입니다. 즉, 인덱스로 유입되는 로그는 제외 필터 설정에 따라 실제로 삭제됩니다. 토글을 비활성으로 전환하면 새로 유입되는 로그에 대해 해당 제외 필터가 적용되지 않습니다.

**참고**: 로그 인덱스의 제외 필터는 처음으로 일치하는 **활성** 제외 필터만 처리합니다. 로그가 특정 제외 필터와 일치하면(실제로 샘플링되어 제외되지 않더라도) 이후에 정의된 모든 제외 필터는 무시됩니다.

사용 사례에 따라 제외 필터 목록에서 드래그 앤 드롭을 사용하여 필터를 재정렬할 수 있습니다.

{{< img src="logs/indexes/reorder_index_filters.png" alt="인덱스 필터 재정렬" style="width:80%;">}}

### 예시 {#examples}

#### 끄기, 켜기 {#switch-off-switch-on}

플랫폼에 인시던트가 발생하거나 애플리케이션의 중요 버전 배포를 중요한 버전 배포를 면밀히 관찰하고 싶을 때까지는 DEBUG 로그가 필요하지 않을 수 있습니다. `status:DEBUG`에서 100% 제외 필터를 설정하고 필요한 경우 Datadog UI 또는 [API][13]를 통해 켜고 끕니다.

{{< img src="logs/indexes/enable_index_filters.png" alt="인덱스 필터 활성화" style="width:80%;">}}

#### 추세 파악 {#keep-an-eye-on-trends}

웹 액세스 서버 요청 로그를 모두 보관할 필요가 없다고 가정해 보겠습니다. 예를 들어, 3xx 로그, 4xx 로그, 5xx 로그는 모두 인덱싱하고, 2xx 로그는 95%를 제외(`source:nginx AND http.status_code:[200 TO 299]`)하여 일부만 보관하여 추세를 계속 파악할 수 있습니다.
**팁**: 웹 액세스 로그를 [로그에서 생성된 메트릭][9]을 사용하여 의미 있는 KPI로 변환하고, 요청 수를 세며 상태 코드, [브라우저][14], [국가][15]별로 태그를 지정합니다.

{{< img src="logs/indexes/sample_200.png" alt="인덱스 필터 활성화" style="width:80%;">}}

#### 상위 수준 엔티티를 사용해 일관된 샘플링하기 {#sampling-consistently-with-higher-level-entities}

매일 수백만 명의 사용자가 웹사이트에 접속한다고 가정해 보겠습니다. 모든 사용자에 대한 관측성이 필요하지는 않지만, 일부 사용자에 대해서는 전체 상황을 파악해야 할 수 있습니다. 이 경우 모든 운영 환경 로그(`env:production`)에 대해 제외 필터를 설정하고, `@user.email`의 90%에 해당하는 로그를 제외할 수 있습니다.

{{< img src="logs/indexes/sample_user_id.png" alt="인덱스 필터 활성화" style="width:80%;">}}

APM은 로그 내 [트레이스 ID 주입][16] 기능을 통해 로그와 함께 사용할 수 있습니다. 사용자 사례와 마찬가지로 모든 로그를 보관할 필요는 없지만, 문제 해결 시 로그가 특정 트레이스의 전체 상황을 보여주는 것은 매우 중요합니다.
이를 위해 계측된 서비스의 로그(`service:my_python_app`)에 제외 필터를 설정하고, `Trace ID`의 50%를 제외할 수 있습니다. 이 경우 파이프라인 상류 단계에서 [트레이스 ID 리매퍼][17]를 사용하여 트레이스 ID가 올바르게 매핑되도록 해야 합니다.

{{< img src="logs/indexes/sample_trace_id.png" alt="인덱스 필터 활성화" style="width:80%;">}}

여러 인덱스에서 샘플링 일관성을 유지하려면 다음을 수행합니다.

1. 각 인덱스에 하나의 제외 규칙을 생성합니다.
2. 모든 제외 규칙에서 **동일한 샘플링 비율**과 상위 엔터티를 정의하는 **동일한 속성**을 사용합니다.
3. 제외 규칙, **필터**, 그리고 **적용 순서**(로그는 처음으로 일치하는 제외 규칙만 통과함)를 다시 확인합니다.

다음 예를 살펴보겠습니다.

{{< img src="logs/indexes/cross-index_sampling.png" alt="인덱스 필터 활성화" style="width:80%;">}}

* 일반적으로 특정 `request_id`를 가진 모든 로그는 유지되거나(50% 확률) 제외됩니다.
* `threat:true` 또는 `compliance:true` 태그가 있는 로그는 `request_id` 값과 관계없이 항상 유지됩니다.
* `DEBUG` 로그는 `request_id` 샘플링 규칙에 따라 일관되게 인덱싱됩니다. 단, 디버그 로그 제외 필터가 활성화된 경우에는 해당 로그도 샘플링 대상이 됩니다.
* 실제 `request_id`가 있는 `2XX` 웹 액세스 로그의 50%는 유지됩니다. 그 외의 모든 `2XX` 웹 액세스 로그에는 90% 제외 필터 규칙이 적용되어 샘플링됩니다.

## 로그 보존 기간 업데이트{#update-log-retention}

인덱스 보존 기간 설정은 로그가 Datadog에서 얼마나 오래 저장되고 검색 가능한지를 결정합니다. 계정 구성에서 허용된 범위 내에서 원하는 보존 기간을 설정할 수 있습니다.

현재 계약에 없는 추가 보존 기간을 사용하려면 고객 성공 팀(`success@datadoghq.com`)에 문의하세요. 추가 보존 기간이 활성화된 후에는 각 인덱스의 보존 기간을 업데이트해야 합니다.

{{< img src="logs/indexes/log_retention.png" alt="인덱스 세부 정보" style="width:70%;">}}

**참고**: 현재 계약에 포함되지 않은 보존 기간을 사용하려면 조직 설정에서 관리자가 해당 [옵션][21]을 활성화해야 합니다.

## 일일 할당량 설정{#set-daily-quota}

인덱스별로 하루 동안 저장할 수 있는 로그 수를 제한하는 일일 할당량을 설정할 수 있습니다. 이 할당량은 실제로 저장되는 로그 수를 기준으로 적용됩니다(즉, 제외 필터 적용 이후의 로그 수 기준).
일일 할당량에 도달하면 로그는 더 이상 인덱싱되지 않지만, [livetail][18]에서 여전히 사용할 수 있으며, [아카이브로 전송][10]되고 [로그에서 메트릭을 생성하는 데 사용][9]됩니다.

색인을 편집할 때 언제든지 이 할당량을 설정 또는 제거할 수 있습니다.
- 일일 할당량을 백만 단위의 로그로 설정
- (선택 사항) 사용자 지정 재설정 시간 설정. 기본적으로 인덱스의 일일 할당량은 [UTC 기준 오후 2시][19]에 재설정됩니다.
- (선택 사항) 경고 임계값을 일일 할당량 대비 백분율로 설정(최소 50%)

**참고**: 일일 할당량 및 경고 임계값 변경 사항은 즉시 적용됩니다.

{{< img src="logs/indexes/daily_quota_config.png" alt="인덱스 세부 정보" style="width:70%;">}}

일일 할당량 또는 경고 임계값에 도달하면 이벤트가 생성됩니다.

{{< img src="logs/indexes/daily_quota_warning_events.png" alt="일일 할당량 및 경고 이벤트" style="width:90%;">}}

사용량에 대한 모니터링과 경보 방법은 [로그 사용량 모니터링][20]을 참조하세요.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}
<br>
*Logging without Limits는 Datadog, Inc.의 상표입니다.

[1]: https://app.datadoghq.com/logs/pipelines/
[2]: /ko/logs/explorer/#visualization
[3]: /ko/logs/explorer/patterns/
[4]: /ko/logs/explorer/analytics/
[6]: /ko/monitors/types/log/
[7]: /ko/logs/explorer/facets/#the-index-facet
[8]: /ko/logs/live_tail/
[9]: /ko/logs/logs_to_metrics/
[10]: /ko/logs/archives/
[11]: https://app.datadoghq.com/logs/pipelines/indexes
[12]: /ko/logs/search_syntax/
[13]: /ko/api/v1/logs-indexes/#update-an-index
[14]: /ko/logs/log_configuration/processors/user_agent_parser/
[15]: /ko/logs/log_configuration/processors/geoip_parser/
[16]: /ko/tracing/other_telemetry/connect_logs_and_traces/
[17]: /ko/logs/log_configuration/processors/trace_remapper/
[18]: /ko/logs/live_tail/#overview
[19]: https://www.timeanddate.com/worldclock/converter.html
[20]: /ko/logs/guide/best-practices-for-log-management/#monitor-log-usage
[21]: /ko/account_management/org_settings/#out-of-contract-retention-periods-for-log-indexes