---
aliases:
- /ko/logs/dynamic_volume_control
- /ko/logs/indexes/
description: Datadog로 인덱싱된 로그 볼륨 제어
further_reading:
- link: /logs/explorer/#visualize
  tag: 설명서
  text: 로그를 남기다 분석 수행
- link: /logs/log_configuration/processors
  tag: 설명서
  text: 로그 처리 방법
- link: /logs/log_configuration/parsing
  tag: 설명서
  text: 파싱에 대해 알아보기
- link: https://www.datadoghq.com/blog/logging-without-limits/
  tag: 블로그
  text: Logging without Limits*
title: 인덱스
---

로그 인덱스를 사용하면 보존 기간, 할당량, 사용량 모니터링, 빌링에 따라 데이터를 가치 그룹으로 분류하여 로그 관리 예산을 세밀하게 제어할 수 있습니다. 인덱스는 [설정 페이지][1]의 인덱스 섹션에서 찾을 수 있습니다. 색인을 두 번 클릭하거나 *편집* 버튼을 클릭하면 지난 3일 동안 색인된 로그의 수와 해당 로그의 보존 기간에 대한 자세한 정보를 볼 수 있습니다:

{{< img src="logs/indexes/index_details.jpg" alt="인덱스 세부 정보" style="width:70%;">}}

[패싯 검색][2], [패턴][3], [분석][4] 및 [모니터링][6]에 인덱싱된 로그를 사용할 수 있습니다.

## 다수의 인덱스

기본적으로 각 새 계정에는 모든 로그의 모놀리식 집합을 나타내는 단일 인덱스가 제공됩니다. Datadog에서는 필요한 경우 여러 인덱스를 사용할 것을 권장합니다:

* 여러 [보존 기간](#update-log-retention)
* 여러 개의 [일일 할당량](#set-daily-quota)을 사용하여 보다 세밀하게 예산을 관리할 수 있습니다.

로그 탐색기는 [다수의 인덱스에 대한 쿼리][7]를 지원합니다.

### 인덱스 추가

새 인덱스를 만들려면 "새 인덱스" 버튼을 사용합니다. 각 계정에 대해 만들 수 있는 인덱스의 최대 개수는 100개이며 기본적으로 100개로 설정되어 있습니다.

{{< img src="logs/indexes/add-index.png" alt="색인 추가" style="width:70%;">}}

**참고**: 인덱스 이름은 문자로 시작해야 하며 소문자, 숫자 또는 '-' 문자만 포함할 수 있습니다.

<div class="alert alert-info">
계정의 최대 인덱스 수를 늘려야 하는 경우<a href="/도움/도움말"> Datadog 지원팀에 문의하세요</a>.
</div>

### 인덱스 삭제

조직에서 인덱스를 삭제하려면 인덱스 작업 트레이에서 "삭제 아이콘"을 사용합니다. `Logs delete data` 권한이 있는 사용자만 이 옵션을 사용할 수 있습니다.

{{< img src="logs/indexes/delete-index.png" alt="인덱스 삭제" style="width:70%;">}}

<div class="alert alert-danger">
삭제된 인덱스와 같은 이름의 인덱스는 다시 생성할 수 없습니다. 
</div>

**참고: **삭제된 인덱스는 더 이상 새로운 수신 로그를 허용하지 않습니다. 삭제된 인덱스의 로그는 더 이상 쿼리할 수 없습니다. 해당 보존 기간에 따라 모든 로그가 만료되면 인덱스는 더 이상 인덱스 페이지에 표시되지 않습니다.



## 인덱스 필터

인덱스 필터를 사용하면 어떤 로그 흐름이 어떤 인덱스로 이동할지를 동적으로 제어할 수 있습니다. 예를 들어 `status:notice` 속성으로 필터링된 첫 번째 인덱스, `status:error` 속성으로 필터링된 두 번째 인덱스, 필터가 없는 마지막 인덱스( `*` 에 해당)를 생성하면 모든 `status:notice` 로그는 첫 번째 인덱스로, 모든 `status:error` 로그 는 두 번째 인덱스로, 나머지는 마지막 인덱스로 이동하게 됩니다.

{{< img src="logs/indexes/multi_index.png" alt="다수의 인덱스" style="width:70%;">}}

**참고**: **로그가 필터와 일치하는 첫 번째 인덱스를 입력하고", 사용 사례에 따라 인덱스 목록에서 드래그 앤 드롭을 사용하여 순서를 재배열할 수 있습니다.

## 제외 필터

기본적으로 로그 인덱스에는 제외 필터가 없습니다. 즉, 인덱스 필터와 일치하는 모든 로그 인덱스가 색인화됩니다.

그러나 로그가 모두 똑같이 가치 있는 것은 아니므로 제외 필터는 색인에서 어떤 로그를 제거할지 결정합니다. 제외된 로그는 인덱스에서 삭제되지만 [Livetail][8]을 통해 계속 흐르며 [메트릭 생성][9] 및 [아카이브][10]에 사용될 수 있습니다.

제외 필터를 추가하려면 다음을 수행하세요.

1. [로그 인덱스][11]를 탐색합니다.
2. 예외 필터를 추가하려는 인덱스 확장
3. **제외 필터 추가**를 클릭합니다.

제외 필터는 쿼리, 샘플링 규칙 및 활성/비활성 토글로 정의됩니다.

* 기본 **쿼리**는 `*`으로, 인덱스에 흐르는 모든 로그가 제외됩니다. [로그 쿼리를 사용하여][12] 범위 제외 필터를 로그의 하위 집합으로만 축소합니다.
* 기본 **샘플링 규칙**은 쿼리와 일치하는 `Exclude 100% of logs`입니다. 샘플링 속도를 0%에서 100%까지 조정하고 샘플링 속도를 개별 로그에 적용할지, 아니면 속성의 고유 값으로 정의된 로그 그룹에 적용할지 결정합니다.
* 기본값 **토글**은 활성화되어 있으므로 인덱스에 포함된 로그 흐름은 제외 필터 설정에 따라 실제로 삭제됩니다. 인덱스에 새로 유입되는 로그에 대해 이 제외 필터를 무시하려면 비활성 상태로 전환합니다.

**참고**: 로그에 대한 인덱스 필터는 첫 번째 **활성** 제외 필터가 일치하는 경우에만 처리됩니다. 만약 로그가 제외 필터와 일치하면(로그가 샘플링되지 않은 경우에도) 일치하면 시퀀스에 있는 다음 모든 제외 필터가 무시됩니다.

사용 사례에 따라 제외 필터 목록에서 드래그 앤 드롭을 사용하여 필터를 재정렬할 수 있습니다.

{{< img src="logs/indexes/reorder_index_filters.png" alt="인덱스 필터 순서 재배열" style="width:80%;">}}

### 예시

#### 끄기, 켜기

플랫폼에 인시던트가 발생하거나 애플리케이션의 중요 버전 배포를 주의 깊게 관찰하고 싶을 때 실제로 필요할 때까지는 디버그 로그가 필요하지 않을 수 있습니다. `status:DEBUG` 에서 100% 제외 필터를 설정하고 필요한 경우 Datadog UI 또는 [API][13]를 통해 켜고 끕니다.

{{< img src="logs/indexes/enable_index_filters.png" alt="인덱스 필터 활성화" style="width:80%;">}}

#### 트렌드 주시

웹 액세스 서버 요청에서 로그를 모두 유지하지 않으려면 어떻게 해야 하나요? 3xx, 4xx, 5xx 로그를 모두 색인하도록 선택하되 2xx 로그: `source:nginx AND http.status_code:[200 TO 299]`의 95%를 제외하여 트렌드를 추적할 수 있습니다.
**팁**: [로그에서 생성된 [메트릭][9], 요청 개수를 사용하여 웹 액세스 로그를 유의미한 KPI로 변환하고 상태 코드, [브라우저][14] 및 [국가][15]별로 태그를 지정할 수 있습니다.

{{< img src="logs/indexes/sample_200.png" alt="인덱스 필터 활성화" style="width:80%;">}}

#### 상위 수준 엔티티를 사용해 일관된 샘플링하기

매일 수백만 명의 사용자가 웹사이트에 접속합니다. 모든 사용자에 대한 관찰 가능성이 필요하지는 않지만 일부 사용자에 대해서는 전체 상황을 파악해야 할 수 있습니다. 모든 프로덕션 로그(`env:production`)에 적용되는 제외 필터를 설정하고 `@user.email`의 90%에 대해 로그를 제외합니다:

{{< img src="logs/indexes/sample_user_id.png" alt="인덱스 필터 활성화" style="width:80%;">}}

로그와 함께 애플리케이션 성능 모니터링(APM)을 사용할 수 있으며 이는 [로그에서의 트레이스 ID 입력][16] 기능 때문입니다. 사용자의 경우 모든 로그를 보관해야 할 필요는 없지만 로그가 트레이스에 대한 전체 상황을 제공하도록 하는 것이 트러블 슈팅에 중요합니다
계측된 서비스(`service:my_python_app`)에서 로그에 적용되는 제외 필터를 설정하고 `Trace ID`의 50%에 대해 로그를 제외하세요 - 파이프라인의 업스트림에서 [트레이스 ID 리매퍼][17]를 사용해야 합니다.

{{< img src="logs/indexes/sample_trace_id.png" alt="인덱스 필터 활성화" style="width:80%;">}}

여러 인덱스에서 샘플링 일관성을 보장합니다:

1. 각 인덱스에 단일 제외 규칙을 생성합니다.
2. 모든 제외 규칙에 대해 상위 레벨 엔티티를 정의하는 **동일한 샘플링 속도**와 **동일한 속성**을 사용하세요.
3. 제외 규칙, **필터** 및 **각각의 순서**(첫 번째 일치 제외 규칙을 통과한 로그만)를 두 번 확인합니다.

다음 예시는 다음을 포함합니다.

{{< img src="logs/indexes/cross-index_sampling.png" alt="인덱스 필터 활성화" style="width:80%;">}}

* 일반적으로 특정 `request_id`이 포함된 모든 로그는 유지되거나 제외됩니다(50% 확률).
* `threat:true` 또는 `compliance:true` 태그를 포함하는 로그는 `request_id`에 관계없이 유지됩니다.
* `DEBUG` 로그 는 `request_id` 샘플링 규칙에 따라 일관되게 인덱싱되지만, 디버그 로그 제외 필터가 활성화되어 있는 경우에는 샘플링됩니다.
* 실제 `request_id` 주소가 있는 `2XX` 웹 액세스 로그의 50%는 유지됩니다. 다른 모든 `2XX` 웹 액세스 로그 는 90% 제외 필터 규칙에 따라 샘플링됩니다.

## 로그 보존 기간 업데이트

인덱스 보존 설정은 Datadog에서 로그를 저장하고 검색할 수 있는 기간을 결정합니다. 계정에서 허용되는 값으로 보존을 설정할 수 있습니다.

현재 계약에 없는 보존 기간을 추가하려면 `success@datadoghq.com`에서 고객 성공팀에 문의하세요. 추가 보존을 활성화한 후에는 인덱스의 보존 기간을 업데이트해야 합니다.

{{< img src="logs/indexes/log_retention.png" alt="인덱스 세부 정보" style="width:70%;">}}

**참고**: 현재 계약에 없는 보존 기간을 사용하려면 조직 설정에서 관리자가 [옵션][21]을 사용하도록 설정해야 합니다.

## 일일 할당량 설정

일일 할당량을 설정하여 하루에 인덱스에 저장되는 로그 의 수를 엄격하게 제한할 수 있습니다. 이 할당량은 저장되어야 하는 모든 로그(예: 제외 필터가 적용된 후)에 적용됩니다.
일일 할당량에 도달하면 로그는 더 이상 색인되지 않지만 [Livetail][18]에서 여전히 사용할 수 있으며 [아카이브로 전송][10]하거나, [로그에서 메트릭을 생성하는 데][9]에 계속 사용할 수 있습니다.

색인을 편집할 때 언제든지 이 할당량을 설정 또는 제거할 수 있습니다.
- 일일 할당량을 수백만 개의 로그로 설정
- (선택 사항) 커스텀 재설정 시간 설정; 기본적으로 인덱스 일일 쿼터는 [오후 2시 UTC][19]에 자동으로 재설정됩니다.
- (선택 사항) 일일 할당량의 백분율로 임계값 경고 설정(최소 50%)

**참고**: 일일 할당량 및 경고 임계값에 대한 변경 사항은 즉시 적용됩니다.

{{< img src="logs/indexes/daily_quota_config.png" alt="인덱스 세부 정보" style="width:70%;">}}

일일 할당량 또는 경고 임계값에 도달하면 이벤트가 생성됩니다:

{{< img src="logs/indexes/daily_quota_warning_events.png" alt="일일 할당량 및 경고 이벤트" style="width:90%;">}}

사용량에 대한 모니터링과 알림 방법은 [로그 사용량 모니터링][20]을 참조하세요.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}
<br>
*제한 없는 로깅은 Datadog, Inc.의 등록 상표입니다.

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
[14]: /ko/logs/log_configuration/processors/#user-agent-parser
[15]: /ko/logs/log_configuration/processors/#geoip-parser
[16]: /ko/tracing/other_telemetry/connect_logs_and_traces/
[17]: /ko/logs/log_configuration/processors/#trace-remapper
[18]: /ko/logs/live_tail/#overview
[19]: https://www.timeanddate.com/worldclock/converter.html
[20]: /ko/logs/guide/best-practices-for-log-management/#monitor-log-usage
[21]: /ko/account_management/org_settings/#out-of-contract-retention-periods-for-log-indexes