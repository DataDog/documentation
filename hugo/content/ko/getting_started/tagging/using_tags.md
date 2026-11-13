---
aliases:
- /ko/tagging/using_tags/
description: Datadog 제품에서 태그 사용하는 방법 알아보기
further_reading:
- link: https://www.datadoghq.com/blog/tagging-best-practices/
  tag: 블로그
  text: 인프라와 애플리케이션 태깅의 모범 사례
- link: /getting_started/tagging/
  tag: 설명서
  text: 태그 시작하기
- link: /getting_started/tagging/assigning_tags/
  tag: 설명서
  text: 태그 할당 방법 알아보기
title: 태그 사용
---
## 개요 {#overview}

[태그를 할당][1]한 후에는 Datadog 플랫폼에서 태그를 사용하여 데이터를 필터링하고 그룹할 수 있습니다. 태그는 데이터를 포함하거나 제외하는 데 사용할 수 있습니다.

여러 태그를 포함하거나 제외할 때:

* 포함 시 `AND` 로직 사용
* 제외 시 `OR` 로직 사용

## 이벤트 {#events}

[Events Explorer][2]는 지정된 기간 동안 환경에서 발생한 이벤트를 보여줍니다. 태그를 사용하여 이벤트 목록을 필터링하고 일부 이벤트 하위 집합에 초점을 맞출 수 있습니다. `tags:`를 입력하고 이어서 태그를 입력하면 해당 태그가 있는 호스트, [통합][3] 또는 서비스에서 발생한 모든 이벤트를 확인할 수 있습니다. 예를 들어 `tags:(service:coffee-house)`를 사용하여 `service:coffee-house` 태그를 검색하세요.

여러 태그 중 하나 이상과 일치하는 항목을 검색하려면 각 태그를 OR로 구분하세요(예: `tags:(service:coffee-house OR host:coffeehouseprod)`). 여러 태그와 모두 일치하는 항목을 검색하려면 각 태그를 AND로 구분하세요(예: `tags:(service:coffee-house AND host:coffeehouseprod)`).

## 대시보드 {#dashboards}

{{< tabs >}}
{{% tab "할당" %}}

태그를 사용하여 [대시보드 그래프][1]에 표시할 메트릭을 필터링하거나, 표시할 메트릭을 집계한 그룹을 만드세요. 표시할 메트릭을 필터링하려면 {{< ui >}}from{{< /ui >}} 텍스트 상자에 태그를 입력하세요. 이 메트릭은 해당 특정 태그가 할당된 모든 소스에 걸쳐 표시됩니다(아래 예시의 `service:web-store`).

{{< img src="tagging/using_tags/dashboards_tags_example.png" alt="'from' 필드에 태그를 추가하여 대시보드의 메트릭을 필터링합니다. 이 예시에서는 메트릭이 'service:web-store'로 필터링됩니다." style="width:80%;">}}

불리언 필터를 사용한 고급 태그 값 필터링도 가능합니다. 다음과 같은 불리언 구문이 지원됩니다.

* `NOT`, `!`
* `AND`, `,`
* `OR`
* `key IN (tag_value1, tag_value2,...)`
* `key NOT IN (tag_value1, tag_value2,...)`

`AND`, `ORs`를 사용하여 특정 태그에 걸친 메트릭을 확인하세요.

{{< img src="tagging/using_tags/dashboard_advanced_tags_AND_OR.png" alt="AND/OR를 사용한 불리언 필터" style="width:80%;">}}

`IN`, `NOT IN`을 사용하여 메트릭을 특정 태그로 빠르게 필터링하세요.

{{< img src="tagging/using_tags/dashboard_advanced_tags_NOT_IN.png" alt="IN/NOT IN을 사용한 불리언 필터" style="width:80%;">}}

태그를 사용하여 집계 그룹을 만들려면 {{< ui >}}avg by{{< /ui >}} 텍스트 상자에 태그의 키 부분을 입력하세요. 예를 들어 `service:web-store`과 같이 `service` 키로 태그가 지정된 메트릭을 보여주는 시계열 그래프가 있다면 {{< ui >}}avg by{{< /ui >}} 텍스트 상자에 `service`를 입력하여 각 `service` 태그 값에 대해 하나의 선을 표시합니다. 각 선은 해당 `service` 태그 값을 공유하는 모든 소스에 걸친 평균 메트릭 값을 나타냅니다.

{{< img src="tagging/using_tags/dashboard_group_by_tags.png" alt="대시보드의 태그: avg by 텍스트 상자" style="width:80%;">}}

태그를 사용하여 대시보드에 이벤트를 오버레이할 수도 있습니다. 이는 [Events Explorer][2]와 동일한 방식으로 작동합니다.
일치하는 이벤트는 그래프에 수직 막대로 오버레이됩니다. 아래 예시에서는 `service:web-store`를 사용합니다.

{{< img src="tagging/using_tags/dashboard_event_overlays.png" alt="태그를 사용하여 대시보드에 Event Overlays 추가하기" style="width:80%;">}}

[템플릿 변수][3]를 사용하여 대시보드의 그래프에서 {{< ui >}}from{{< /ui >}} 태그를 전환하는 데 소요되는 시간을 단축하세요. 아래 예시에서는 `service`를 사용하여 `service` 태그 키를 나타냅니다. 템플릿 변수를 사용하려면 그래프 쿼리의 {{< ui >}}from{{< /ui >}} 텍스트 상자에 `$service` 템플릿 변수를 추가하세요.

{{< img src="tagging/using_tags/dashboard_dynamic_template_variables.png" alt="대시보드 템플릿 변수" style="width:80%;">}}

[1]: /ko/dashboards/
[2]: /ko/events/
[3]: /ko/dashboards/template_variables/
{{% /tab %}}
{{% tab "예시" %}}

다음은 시계열 그래프 편집기를 사용하는 태그의 예입니다. 첫 번째 스크린샷에는 태그가 적용되지 않았으며 모든 호스트의 평균 CPU 사용량이 표시됩니다.

{{< img src="tagging/using_tags/dashboard_timeseries_graph_editor_no_tags.png" alt="태그가 추가되지 않은 시계열 그래프 편집기" style="width:75%;">}}

다음으로, Datadog이 미국 동부 지역의 CPU 사용량을 확인할 수 있도록 {{< ui >}}from{{< /ui >}} 텍스트 상자에 태그(`region:eastus`)를 포함하여 편집기가 업데이트되었습니다. 여기서는 `region` 태그를 예로 들었지만, `application`, `service` 또는 `environment` 등 Datadog 플랫폼으로 전송된 임의의 태그를 사용할 수 있습니다.

{{< img src="tagging/using_tags/dashboard_timeseries_graph_editor_from_tag.png" alt="'region:us-east-1' 태그로 필터링된 시계열 그래프 편집기" style="width:75%;">}}

마지막으로, 두 번째 빈 필드({{< ui >}}avg by{{< /ui >}} 텍스트 상자)를 사용하여 각 `host`에 대한 개별 시계열 선을 표시합니다. 미국 동부 지역에서 실행 중인 개별 호스트에 대한 서버 CPU가 표시됩니다.

{{< img src="tagging/using_tags/dashboard_timeseries_graph_editor_sumby_tag.png" alt="'region:us-east-1'로 필터링되고 'host'로 그룹화된 시계열 그래프 편집기" style="width:75%;">}}

필요한 경우 태그를 추가하여 범위를 더 좁히세요. 예를 들어 `region:eastus` 및 `env:production`의 호스트로 범위를 좁힐 수 있습니다. 태그는 Datadog 전반에서 사용할 수 있으며 모든 핵심 요소(메트릭, 트레이스, 로그)에 적용할 수 있습니다.

{{% /tab %}}
{{< /tabs >}}

## 인프라 {#infrastructure}

[호스트 맵][4], [인프라 목록][5], [컨테이너][6] 및 [프로세스][7]를 필터링하려면 페이지 상단의 {{< ui >}}Filter by{{< /ui >}} 텍스트 상자에 태그를 입력하세요. 호스트와 컨테이너는 {{< ui >}}Group by{{< /ui >}} 텍스트 상자를 사용하여 태그 키별로 그룹화할 수 있습니다. 그룹 상자에 `service`를 입력하면 각 서비스가 그룹 제목으로 표시됩니다.

{{< tabs >}}
{{% tab "호스트 맵" %}}

이번 섹션에서는 태그를 사용해 호스트를 필터링하거나 그룹으로 묶습니다.

{{< img src="tagging/using_tags/hostmaptags.png" alt="호스트 맵 태그" style="width:80%;">}}

또는 컨테이너를 필터링하거나 그룹화합니다.

{{< img src="tagging/using_tags/containermaptags.png" alt="컨테이너 맵 태그" style="width:80%;">}}
{{% /tab %}}

{{% tab "인프라 목록" %}}

인프라 목록 페이지의 텍스트 상자로 사용할 수 있는 필터링과 그룹화는 다음과 같습니다.

{{< img src="tagging/using_tags/infrastructuretags.png" alt="인프라 목록의 태그" style="width:80%;">}}
{{% /tab %}}

{{% tab "컨테이너" %}}

Live Containers 페이지의 텍스트 상자로 사용할 수 있는 필터링과 그룹화는 다음과 같습니다.

{{< img src="tagging/using_tags/livecontainertags.png" alt="Live Containers 태그" style="width:80%;">}}
{{% /tab %}}

{{% tab "프로세스" %}}

Live Processes 페이지의 텍스트 상자로 사용할 수 있는 필터링과 그룹화는 다음과 같습니다.

{{< img src="tagging/using_tags/liveprocessestags.png" alt="Live Processes 태그" style="width:80%;">}}
{{% /tab %}}
{{< /tabs >}}

## 모니터 {#monitors}

[할당된 태그][32]를 기준으로 모니터 및 [모니터 가동 중지][31]를 필터링하려면 검색 창이나 패싯 확인란을 사용하세요. 검색 창 형식은 `tag:"<KEY>:<VALUE>"`이며, 예시는 `tag:"service:coffee-house"`입니다. 특정 태그 키의 모든 값을 일치시키려면 따옴표 대신 백슬래시(`\`)로 콜론을 이스케이프 처리하세요. 따옴표 안에서는 와일드카드가 지원되지 않습니다. 예를 들어 `tag:service\:*`는 `service` 태그가 있는 모든 모니터를 반환합니다. 검색에서 특정 태그가 있는 모니터를 제외하려면 `-`을 사용하세요(예: `-tag:"service:coffee-house"`).

{{< img src="/tagging/using_tags/manage_monitor_tags.png" alt="검색 창에서 태그로 모니터 필터링" style="width:80%;">}}

**참고**: 모니터 태그는 메트릭 태그와 다르며, 별도로 작용합니다. 자세한 내용은 [모니터 태그][30] 설명서를 참조하세요.

새 모니터를 만들 때는 다음 항목에 *메트릭 태그*를 사용하세요.
* {{< ui >}}from{{< /ui >}} 텍스트 상자: 모니터 범위를 해당 태그가 있는 메트릭으로만 제한합니다.
* {{< ui >}}excluding{{< /ui >}} 텍스트 상자: 해당 메트릭을 모니터 범위에서 제외합니다.
* {{< ui >}}avg by{{< /ui >}} 텍스트 상자: 각 태그 값에 대해 모니터를 다중 경보 모니터로 전환합니다.

## 메트릭 {#metrics}

[Metrics Explorer][8]에서 태그를 사용하여 태그별로 메트릭을 필터링하거나 태그 키별로 여러 그래프를 표시하세요. 아래 예시는 `service:web-store`에 대한 메트릭을 그래프로 나타낸 것입니다.

{{< img src="tagging/using_tags/metrics_explorer.png" alt="개별 태그로 범위가 지정된 메트릭 그래프" style="width:80%;">}}

## 통합 {#integrations}

필요시 일부 통합에서는 메트릭의 태그 사용을 제한할 수 있습니다.

{{< tabs >}}
{{% tab "AWS" %}}

[AWS 통합 타일][1]에는 `to hosts with tag` 및 `to Lambdas with tag` 태그 필터가 있습니다.

이 필드에는 EC2 또는 Lambda 리소스를 수집하는 데 사용되는 필터를 정의하며 쉼표로 구분된 태그 목록(`<KEY>:<VALUE>` 형식)을 사용할 수 있습니다. 이 `<KEY>:<VALUE>`를 사용하여 태그를 기준으로 모니터링에서 함수를 포함하거나 제외할 수 있습니다. 태그를 제외하도록 지정하려면 태그 키 앞에 `!`를 추가하세요. `?`(단일 문자) 및 `*`(여러 문자)와 같은 와일드카드도 사용할 수 있습니다.

필터에는 `OR` 문을 사용하여 포함 태그가 하나라도 있는 리소스가 포함됩니다. 다음 예시 필터는 `datadog:monitored` 또는 `env:production` 태그를 포함하는 EC2 인스턴스를 수집합니다.

```text
datadog:monitored,env:production
```

제외 태그를 지정하면 해당 태그가 우선순위를 가지며 `AND` 문을 형성합니다. 다음 예시 필터는 `datadog:monitored` 태그, `env:production` 태그, 또는 `c1.*` 값을 가진 `instance-type` 태그를 포함하면서 `region:us-east-1` 태그는 포함하지 않는 EC2 인스턴스를 수집합니다.

```text
datadog:monitored,env:production,instance-type:c1.*,!region:us-east-1
```

AWS 태깅을 자세히 알아보려면 [EC2][2] 및 [Lambda][3] 설명서를 참조하시기 바랍니다.

[1]: https://app.datadoghq.com/account/settings#integrations/amazon-web-services
[2]: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/Using_Tags.html
[3]: https://docs.aws.amazon.com/lambda/latest/dg/tagging.html
{{% /tab %}}
{{% tab "Azure" %}}

[Azure 통합 타일][1]에는 `Optionally filter to VMs with tag` 태그 필터가 있습니다.

이 필드에는 Azure VM에서 메트릭을 수집하는 데 사용되는 필터를 정의하며 쉼표로 구분된 태그 목록(`<KEY>:<VALUE>` 형식)을 사용할 수 있습니다. `?`(단일 문자) 및 `*`(여러 문자)와 같은 와일드카드도 사용할 수 있습니다. 정의된 태그 중 하나와 일치하는 VM만 Datadog으로 가져옵니다. 나머지는 무시됩니다.

특정 태그와 일치하는 VM을 제외하려면 태그 앞에 `!`를 추가하세요. 예를 들면 다음과 같습니다.

```text
datadog:monitored,env:production,!env:staging,instance-type:c1.*
```

[1]: https://app.datadoghq.com/account/settings#integrations/azure
{{% /tab %}}
{{% tab "Google Cloud" %}}

[Google Cloud 통합 타일][1]에는 `to hosts with tag` 태그 필터가 있습니다.

이 필드에는 GCP에서 메트릭을 수집하는 데 사용되는 필터를 정의하며 쉼표로 구분된 GCP 레이블 목록(`<KEY>:<VALUE>` 형식)을 사용할 수 있습니다. `?`(단일 문자) 및 `*`(여러 문자)와 같은 와일드카드도 사용할 수 있습니다. 정의된 레이블 중 하나와 일치하는 호스트만 Datadog으로 가져옵니다. 나머지는 무시됩니다.

특정 레이블과 일치하는 호스트를 제외하려면 태그 앞에 `!`를 추가하세요. 예를 들면 다음과 같습니다.

```text
datadog:monitored,env:production,!env:staging,instance-type:c1.*
```

더 자세한 정보는 Google Cloud의 [라벨 생성 및 관리][2] 가이드를 참조하시기 바랍니다.

[1]: https://app.datadoghq.com/account/settings#integrations/google-cloud-platform
[2]: https://cloud.google.com/compute/docs/labeling-resources
{{% /tab %}}
{{< /tabs >}}

## APM {#apm}

{{< tabs >}}
{{% tab "Trace Explorer" %}}

[Trace Explorer][1]에서는 검색 창이나 패싯 확인란을 사용하여 태그가 지정된 트레이스를 필터링할 수 있습니다. 검색 창 형식은 `<KEY>:<VALUE>`이며, 예시는 `service:coffee-house`입니다. 고급 검색에 대한 자세한 내용은 [쿼리 구문][2]을 참조하세요.

{{< img src="tagging/using_tags/trace_explorer.png" alt="Trace Explorer 태그" style="width:80%;">}}

[1]: /ko/tracing/trace_explorer/search/
[2]: /ko/tracing/trace_explorer/query_syntax/
{{% /tab %}}
{{% tab "Service Map" %}}

[태그 할당][1] 후 Service Map에서 특정 서비스를 클릭하여 애플리케이션의 다른 영역으로 이동할 수 있습니다. 아래 예시에서 `service:coffee-house` 태그로 필터링된 [분석][2], [모니터][3], [로그][4] 및 [호스트 맵][5]을 확인하세요.

{{< img src="tagging/using_tags/servicemaptags.png" alt="Service Map 태그" style="width:80%;">}}

[1]: /ko/getting_started/tagging/assigning_tags/
[2]: /ko/tracing/app_analytics/search/
[3]: /ko/monitors/manage/
[4]: /ko/logs/explorer/search/
[5]: /ko/infrastructure/hostmap/
{{% /tab %}}

{{< /tabs >}}

## 노트북 {#notebooks}

[노트북][9] 그래프를 생성할 때 {{< ui >}}from{{< /ui >}} 텍스트 상자에서 태그를 사용하여 메트릭을 제한할 수 있습니다. 또한 {{< ui >}}avg by{{< /ui >}} 텍스트 상자에서 태그를 사용하여 메트릭을 그룹화할 수도 있습니다. 아래 예시에서 메트릭은 `service:coffee-house`로 제한되고 `host`로 그룹화됩니다.

{{< img src="tagging/using_tags/notebooktags.png" alt="노트북 태그" style="width:80%;">}}

태그를 제외하려면 `</>`를 사용하여 텍스트를 편집한 다음 `!<KEY>:<VALUE>` 형식으로 태그를 추가하세요. 아래 예시에서는 `!service:coffeehouse`를 사용하여 `service:coffeehouse`를 제외했습니다.

{{< img src="tagging/using_tags/notebooktagsexclude.mp4" alt="노트북 제외 태그" video="true" width="80%">}}

## 로그 {#logs}

로그 [검색][10], [분석][11], [패턴][12] 및 [Live Tail][13]의 경우 검색 창이나 패싯 확인란을 사용하여 태그로 로그를 필터링하세요. 검색 창 형식은 `<KEY>:<VALUE>`이며, 예시는 `service:coffee-house`입니다. 고급 검색에 대한 자세한 내용은 [로그 검색][10]을 참조하세요.

또한, 태그는 로그 [파이프라인][14]을 필터링하는 데에도 사용됩니다. 예를 들어 coffee-house 서비스의 로그만 파이프라인을 통과하도록 하려면 필터 필드에 `service:coffee-house` 태그를 추가하세요.

## RUM 및 Session Replay {#rum-session-replay}

[RUM Explorer][15]는 특정 기간에 사용자의 환경에서 발생한 이벤트를 시각화합니다.

태그별로 RUM 이벤트 데이터를 필터링하려면 검색 창이나 패싯 확인란을 사용하세요. 검색 창 형식은 `<KEY>:<VALUE>`이며, 예시는 `service:shopist`입니다. 고급 검색에 대한 자세한 내용은 [RUM 이벤트 검색][16]을 참조하세요.

{{< img src="tagging/using_tags/rumtags.png" alt="RUM 태그" style="width:80%;">}}

## Synthetics {#synthetics}

{{< tabs >}}
{{% tab "Synthetic 테스트" %}}

[Synthetic 테스트][1] 페이지는 Synthetic 테스트의 목록을 보여줍니다.

태그별로 테스트를 필터링하려면 검색 창이나 패싯 확인란을 사용하세요. 검색 창 형식은 `<KEY>:<VALUE>`입니다. 예시는 `tag:mini-website`입니다. 고급 검색에 대한 자세한 내용은 [Synthetic 테스트 검색 및 관리][2]를 참조하세요.

{{< img src="tagging/using_tags/syntheticstags.png" alt="Synthetics 태그" style="width:80%;">}}


[1]: https://app.datadoghq.com/synthetics/tests
[2]: /ko/synthetics/search/
{{% /tab %}}
{{% tab "탐색기" %}}

[Synthetic Monitoring & Testing Results Explorer][1]에는 [CI 파이프라인][2]에서 실행된 테스트와 테스트 실행 배치가 표시됩니다.

태그별로 테스트 실행을 필터링하려면 검색 창이나 패싯 확인란을 사용하세요. 검색 창 형식은 `<KEY>:<VALUE>`입니다. 예시는 `@ci.provider.name:github`입니다. 고급 검색에 대한 자세한 내용은 [테스트 배치 검색][3]을 참조하세요.

{{< img src="tagging/using_tags/syntheticscitags.png" alt="Synthetics 및 CI 태그" style="width:80%;">}}


[1]: https://app.datadoghq.com/synthetics/explorer/
[2]: /ko/continuous_testing/cicd_integrations
[3]: /ko/continuous_testing/explorer/search/
{{% /tab %}}
{{< /tabs >}}

## 서비스 수준 목표 {#service-level-objectives}

{{< tabs >}}
{{% tab "SLO 관리" %}}

[할당된 태그][1]별로 SLO를 필터링하려면 검색 창이나 패싯 확인란을 사용하세요. 검색 창 형식은 `<KEY>:<VALUE>`이며, 예시는 `journey:add_item`입니다. 검색에서 특정 태그가 있는 SLO를 제외하려면 `-`을 사용하세요(예: `-journey:add_item`).

{{< img src="tagging/using_tags/manage_slo_tags.png" alt="SLO 태그" style="width:80%;">}}

SLO 태그는 SLO의 기초 메트릭이나 모니터에 사용된 메트릭 또는 모니터 태그와 다르며, 별도로 작용합니다.

[1]: /ko/getting_started/tagging/assigning_tags/?tab=servicelevelobjectives#ui
{{% /tab %}}

{{% tab "메트릭 기반 SLO" %}}

[메트릭 기반 SLO][1]를 생성할 때, SLO의 성공 비율 메트릭 쿼리에 메트릭 태그를 사용하세요(모든 메트릭은 동일한 메트릭 태그 세트를 사용해야 합니다).

* {{< ui >}}from{{< /ui >}} 텍스트 상자: 메트릭 범위를 지정 태그로만 제한합니다.
* {{< ui >}}sum by{{< /ui >}} 텍스트 상자: SLO 전체와 각 태그 값의 상태 백분율 및 남은 오류 예산을 표시하는 그룹화된 메트릭 기반 SLO를 생성합니다.

[1]: /ko/service_level_objectives/metric/
{{% /tab %}}
{{% tab "모니터 기반 SLO" %}}

하나의 [그룹화된 모니터][2]를 사용하여 [모니터 기반 SLO][1]를 생성할 때 {{< ui >}}Calculate on selected groups{{< /ui >}} 토글을 사용하여 기본 모니터에서 최대 20개의 태그 값을 선택하세요. 그러면 SLO 전체와 각 태그 값의 상태 백분율 및 남은 오류 예산이 표시됩니다.

{{< img src="tagging/using_tags/monitor_based_slo_tags.png" alt="모니터 기반 SLO 태그" style="width:80%;">}}

[1]: /ko/service_level_objectives/monitor/
[2]: /ko/getting_started/tagging/using_tags/?tab=newmonitor#monitors
{{% /tab %}}
{{< /tabs >}}

## CI Visibility {#ci-visibility}

{{< tabs >}}
{{% tab "테스트 실행" %}}

[CI Visibility Explorer][101]에는 CI 파이프라인에서 실행된 테스트가 표시됩니다.

태그별로 테스트 실행을 필터링하려면 검색 창이나 패싯 확인란을 사용하세요. 검색 창 형식은 `<KEY>:<VALUE>`입니다. 예시는 `@test.status:failed`입니다. 고급 검색에 대한 자세한 내용은 [Test Optimization Explorer 검색 구문][102]을 참조하세요.

{{< img src="/continuous_integration/test_runs.png" alt="CI Visibility Explorer의 테스트 실행" style="width:80%;">}}

[101]: https://app.datadoghq.com/ci/test-runs
[102]: /ko/tests/explorer/search_syntax

{{% /tab %}}
{{% tab "파이프라인 실행" %}}

[CI Visibility Explorer][101]에는 CI 파이프라인 실행이 표시됩니다.

태그별로 파이프라인 실행을 필터링하려면 검색 창이나 패싯 확인란을 사용하세요. 검색 창 형식은 `<KEY>:<VALUE>`입니다. 예시는 `@ci.provider.name:gitlab`입니다. 고급 검색에 대한 자세한 내용은 [CI 파이프라인 검색 및 관리][102]를 참조하세요.

{{< img src="/continuous_integration/pipeline_executions.png" alt="CI Visibility Explorer의 파이프라인 실행" style="width:80%;">}}

[101]: https://app.datadoghq.com/ci/pipeline-executions
[102]: /ko/continuous_testing/explorer/search/

{{% /tab %}}
{{< /tabs >}}

## DORA Metrics {#dora-metrics}

[DORA Metrics Explorer][33]에는 DORA Metrics 집계가 표시됩니다. 표시된 메트릭과 집계를 태그별로 필터링하려면 {{< ui >}}\+ Filter{{< /ui >}} 버튼을 사용하여 기존 태그에 대한 패싯을 추가하세요. 그래프와 대시보드에서 태그로 쿼리하는 방법은 [DORA Metrics 사용자 지정 대시보드 생성][34]을 참조하세요.

{{< img src="/delivery_performance/dora_metrics/dora_ui_3.png" alt="Language 사용자 지정 태그로 필터링된 DORA Metrics 계산 개요" style="width:80%;">}}

## 개발자 {#developers}

[API][17]에서 태그를 다양하게 사용할 수 있습니다.

각 섹션으로 연결된 링크 목록을 확인해주세요.

* [모니터 가동 중지 일정 예약][18]
* [Event Explorer 쿼리][19]
* [호스트 검색][20]
* [AWS][21] 및 [Google Cloud][22]의 통합
* [시계열 포인트 쿼리][23]
* [모든 모니터 세부 정보 보기][24]
* [모니터 음소거][25]
* [모니터 검색][24]
* [모니터 그룹 검색][24]
* [스크린보드 생성][26]
* [Timeboard 생성][26]
* [SLO 생성][27]
* [SLO 상세 정보 확인][28]
* [SLO 업데이트][29]

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/getting_started/tagging/assigning_tags/
[2]: /ko/events/explorer
[3]: /ko/integrations/
[4]: /ko/infrastructure/hostmap/
[5]: /ko/infrastructure/
[6]: /ko/infrastructure/livecontainers/
[7]: /ko/infrastructure/process/
[8]: /ko/metrics/explorer/
[9]: /ko/notebooks/
[10]: /ko/logs/explorer/search/
[11]: /ko/logs/explorer/analytics/
[12]: /ko/logs/explorer/patterns/
[13]: /ko/logs/live_tail/
[14]: /ko/logs/log_configuration/pipelines
[15]: /ko/real_user_monitoring/explorer/
[16]: /ko/real_user_monitoring/explorer/search/
[17]: /ko/api/
[18]: /ko/api/v1/downtimes/#schedule-a-downtime
[19]: /ko/api/v1/events/#query-the-event-stream
[20]: /ko/api/v1/hosts/
[21]: /ko/api/v1/aws-integration/
[22]: /ko/api/v1/gcp-integration/
[23]: /ko/api/v1/metrics/#query-timeseries-points
[24]: /ko/api/v1/monitors/#get-all-monitor-details
[25]: /ko/api/v1/monitors/#mute-a-monitor
[26]: /ko/api/v1/dashboards/#create-a-new-dashboard
[27]: /ko/api/v1/service-level-objectives/#create-a-slo-object
[28]: /ko/api/v1/service-level-objectives/#get-a-slos-details
[29]: /ko/api/v1/service-level-objectives/#update-a-slo
[30]: /ko/monitors/manage/#monitor-tags
[31]: /ko/monitors/downtimes/
[32]: /ko/getting_started/tagging/assigning_tags?tab=monitors
[33]: https://app.datadoghq.com/ci/dora
[34]: /ko/delivery_performance/dora_metrics/#create-custom-dashboards