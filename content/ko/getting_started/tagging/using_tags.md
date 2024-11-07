---
aliases:
- /ko/tagging/using_tags/
description: Datadog 제품에서 태그 사용하는 방법 알아보기
further_reading:
- link: https://www.datadoghq.com/blog/tagging-best-practices/
  tag: 블로그
  text: 인프라스트럭처와 애플리케이션 태깅 모범 사례
- link: /getting_started/tagging/
  tag: 설명서
  text: 태그 시작하기
- link: /getting_started/tagging/assigning_tags/
  tag: 설명서
  text: 태그 지정 방법 알아보기
title: 태그 사용
---

## 개요

[태그를 할당][1]한 후에는 태그를 사용해 Datadog 플랫폼에서 데이터를 필터링하고 그룹화할 수 있습니다. 태그는 데이터를 포함하거나 제외시키는 용도로 사용됩니다.

여러 태그를 포함하거나 제외할 때:

* 포함은 `AND` 로직을 사용합니다.
* 제외는 `OR` 로직을 사용합니다.

## 이벤트

[이벤트 익스플로러][2]는 지정된 기간의 환경에서 발생한 이벤트를 표시합니다. 태그를 사용하여 이벤트 목록을 필터링하고 이벤트 서브셋에 초점을 맞출 수 있습니다. `tags:` 뒤에 태그를 입력하면 호스트, [통합][3]이나 서비스에서 발생하였으며 해당 태그가 지정된 이벤트를 전부 확인할 수 있습니다. 예를 들어 `tags:service:coffee-house`라는 태그를 검색하려면 `service:coffee-house`를 사용하세요.

여러 태그를 포괄적으로 검색할 경우 괄호를 사용하여 각 태그를 OR로 구분하세요(예: `tags:(service:coffee-house OR host:coffeehouseprod)`). 여러 태그를 배타적으로 검색하려면 각 태그를 AND로 구분하세요(예: `tags:(service:coffee-house AND host:coffeehouseprod)`)

## 대시보드

{{< tabs >}}
{{% tab "할당" %}}

태그를 사용하여 메트릭을 필터링해 [대시보드 그래프][1]에 표시하거나 표시할 메트릭을 집계한 그룹을 만들 수 있습니다. 표시할 메트릭을 필터링하려면 **from** 텍스트 상자에 태그를 입력하세요. 이렇게 하면 선택한 메트릭에 특정 태그가(이번 예시에서는 `service:coffee-house`) 할당된 모든 소스가 표시됩니다.

{{< img src="tagging/using_tags/dashboardtags_1.png" alt="텍스트 상자에 표시된 대시보드의 태그" style="width:80%;">}}

고급 태그값 필터링 역시 불 방식(boolean) 필터로 사용할 수 있습니다. 다음과 같은 불 신택스가 지원됩니다.

* `NOT`, `!`
* `AND`, `,`
* `OR`
* `key IN (tag_value1, tag_value2,...)`
* `key NOT IN (tag_value1, tag_value2,...)`

`AND`, `ORs`를 사용해 특정 태그 전체의 메트릭을 살펴보세요.

{{< img src="tagging/using_tags/dashboard_boolean_1.png" alt="AND/OR를 사용한 불 필터" style="width:80%;">}}

`IN`, `NOT IN`을 사용해 특정 태그의 메트릭을 빠르게 필터링하세요.

{{< img src="tagging/using_tags/dashboards_boolean_2.png" alt="IN/NOT IN을 사용한 불 필터" style="width:80%;">}}

태그를 사용해 집계된 그룹을 만들려면 **avg by** 텍스트 상자에 태그의 주요 부분을 입력하세요. 예를 들어 키 `service`로 태깅된 메트릭(예: `service:coffee-house`)을 시계열 그래프로 표시하고 싶다면 **avg by** 텍스트 상자에 `service`를 입력해 각 `service` 태그값마다 한 줄씩 표시할 수 있습니다. 각 행은 `service` 태그값을 공유하는 모든 소스의 평균 메트릭을 나타냅니다.

{{< img src="tagging/using_tags/dashboardtags.png" alt="대시보드 avg by 텍스트 상자의 태그" style="width:80%;">}}

태그를 사용하여 대시보드에서 이벤트를 오버레이할 수도 있습니다. 이는 [Events Explorer][2]와 동일하게 작동합니다.
`tags:` 뒤에 태그를 입력하세요. 일치하는 이벤트는 세로봉으로 그래프에 오버레이됩니다. 아래 예시는 `tags:service:coffee-house`를 사용했습니다.

{{< img src="tagging/using_tags/dashboardeventtags.png" alt="대시보드의 이벤트 오버레이" style="width:80%;">}}

대시보드 그래프의 **from** 태그 전환 시간을 단축하려면 [템플릿 변수][3]를 사용하세요. 아래 예시에서는 `service`를 사용하여 `service` 태그 키를 표시했습니다. 템플릿 변수를 사용하려면 그래프 쿼리의 **from** 텍스트 상자에 `$service` 템플릿 변수를 추가하세요.

{{< img src="tagging/using_tags/dashboardtemplatevariables.png" alt="대시보드 템플릿 변수" style="width:80%;">}}

[1]: /ko/dashboards/
[2]: /ko/events/
[3]: /ko/dashboards/template_variables/
{{% /tab %}}
{{% tab "예시" %}}

여기에서 시계열 차트 편집기를 사용한 태그 예시를 확인하실 수 있습니다. 첫 스크린샷을 보면 적용된 태그가 없으며, 모든 호스트의 평균 CPU 사용량이 표시됩니다.

{{< img src="tagging/using_tags/Tags_1.png" alt="Tags_1" style="width:75%;">}}

다음으로 편집기를 업데이트해  **from** 텍스트 상자에 태그(`region:eastus`)를 포함하도록 했습니다. 이렇게 하면 Datadog가 미국 동부 지역의 CPU 사용량에 집중하게 됩니다. 이번 예시에서는 `region` 태그를 사용했지만, Datadog 플랫폼에 전송된 태그라면 무엇이든 임의로 사용할 수 있습니다(예: `application`, `service`, `environment` 등).

{{< img src="tagging/using_tags/Tags_2.png" alt="Tags_2" style="width:75%;">}}

마지막으로 두 번째 공백란을(**avg by** 텍스트 상자) 사용해 각 `host`의 개별 시계열 행을 표시했습니다. 서버 CPU가 미국 동부 지역에서 운영되는 호스트별로 표시됩니다.

{{< img src="tagging/using_tags/Tags_3.png" alt="Tags_3" style="width:75%;">}}

필요한 경우 추가 태그를 더해 범위를 더 좁힐 수도 있습니다. 예를 들어 `region:eastus` 및 `env:production`에 속하는 호스트만 표시하도록 할 수 있습니다. 태그는 Datadog 전체에서 사용할 수 있으며, 모든 주요 요소(메트릭, 트레이스, 로그)에 적용됩니다.

{{% /tab %}}
{{< /tabs >}}

## 인프라스트럭처

[호스트 맵][4], [인프라스트럭처 목록][5], [컨테이너][6], [프로세스][7]를 필터링하려면 페이지 상단에 있는 **Filter by** 텍스트 상자에 태그를 입력하세요. 호스트와 컨테이너는 **Group by** 텍스트 상자를 사용하여 태그 키로 그룹화할 수 있습니다. 그룹 상자에 `service`라고 입력하면 각 서비스가 그룹 헤딩으로 표시됩니다.

{{< tabs >}}
{{% tab "호스트 맵" %}}

이번 섹션에서는 태그를 사용해 호스트를 필터링하거나 그룹으로 묶습니다.

{{< img src="tagging/using_tags/hostmaptags.png" alt="호스트 맵 태그" style="width:80%;">}}

또는 컨테이너를 필터링하거나 그룹화합니다.

{{< img src="tagging/using_tags/containermaptags.png" alt="컨테이너 맵 태그" style="width:80%;">}}
{{% /tab %}}

{{% tab "인프라스트럭처 목록" %}}

인프라스트럭처 목록 페이지의 텍스트 상자로 사용할 수 있는 필터링과 그룹화는 다음과 같습니다.

{{< img src="tagging/using_tags/infrastructuretags.png" alt="인프라스트럭처 목록의 태그" style="width:80%;">}}
{{% /tab %}}

{{% tab "컨테이너" %}}

실시간 컨테이너 페이지의 텍스트 상자로 사용할 수 있는 필터링과 그룹화는 다음과 같습니다.

{{< img src="tagging/using_tags/livecontainertags.png" alt="실시간 컨테이너 태그" style="width:80%;">}}
{{% /tab %}}

{{% tab "프로세스" %}}

실시간 프로세스 페이지의 텍스트 상자로 사용할 수 있는 필터링과 그룹화는 다음과 같습니다.

{{< img src="tagging/using_tags/liveprocessestags.png" alt="실시간 프로세스 태그" style="width:80%;">}}
{{% /tab %}}
{{< /tabs >}}

## 모니터링

[할당된 태그][32]를 기준으로 모니터 및 [모니터 다운타임][31]을 필터링하려면 검색 바 또는 패싯 확인란을 사용합니다. 예를 들어, 검색 바 형식이 `tag:<KEY>:<VALUE>`이면 `tag:service:coffee-house`입니다. 특정 태그가 있는 모니터를 검색에서 제외하려면 `-`, for example: `태그:-service:coffee-house`를 사용합니다.

{{< img src="/tagging/using_tags/manage_monitor_tags.png" alt="태그로 검색 바에서 모니터 필터링" style="width:80%;">}}

**참고**: 모니터 태그는 메트릭 태그와 다르게 구분되어 있습니다. 자세한 내용은 [모니터 태그][30]의 설명서를 참고하세요.

새 모니터를 생성할 때는 다음에서 *메트릭 태그*를 사용합니다:
* **from** 텍스트 상자: 모니터링 범위를 태그가 지정된 범위로만 제한합니다.
* **excluding** 텍스트 상자: 해당 메트릭을 모니터링 범위에서 제외합니다.
* **avg by** 텍스트 상자: 각 태그값마다 모니터링을 복수 경고(multi-alert) 모니터링으로 바꿉니다.

## 메트릭

[메트릭 탐색기][8]의 태그를 사용하여 태그 위에 메트릭을 필터링하거나 태그 키별로 여러 그래프를 표시합니다. 아래 예에서는 메트릭을 `service:web-store` 위 그래프로 표시합니다.

{{< img src="tagging/using_tags/metrics_explorer.png" alt="개별 태그로 범위를 지정한 메트릭 그래프" style="width:80%;">}}

## 통합

일부 통합에서는 선택 사항으로 메트릭의 태그 사용을 제한할 수 있습니다.

{{< tabs >}}
{{% tab "AWS" %}}

[AWS 통합 타일][1]은 태그 필터 `to hosts with tag`와 `to Lambdas with tag`를 지원합니다.

이러한 필드에서는 EC2나 람다(Lambda) 리소스의 수집에 사용하는 필터를 정의하며 쉼표(",")로 구분되는 태그 목록을(`<KEY>:<VALUE>`의 형식으로) 사용할 수 있습니다. `<KEY>:<VALUE>`는 태그 기준의 모니터링을 바탕으로 함수를 포함하거나 제외할 수 있습니다. 태그를 제외하도록 지정하려면 태그 키 앞에 `!`를 입력하세요. 단일 문자인 경우 `?`, 여러 문자인 경우 `*` 등의 와일드카드도 사용할 수 있습니다.

`OR` 스테이트먼트를 사용하면 필터가 포함 태그가 존재하는 리소스를 포함합니다. 다음의 필터 예시는 `datadog:monitored` 또는 `env:production` 태그를 포함하는 EC2 인스턴스를 수집합니다.

```text
datadog:monitored,env:production
```

태그를 제외하기로 명시했다면 이를 우선하며, `AND` 스테이트먼트로 구성됩니다. 다음의 사례 필터는 태그 `datadog:monitored`, 또는 `env:production`, 또는 `instance-type` 태그를 `c1.*` 값과 함께 포함하며, `region:us-east-1` 태그는 포함하지 않는 EC2 인스턴스를 수집합니다.

```text
datadog:monitored,env:production,instance-type:c1.*,!region:us-east-1
```

AWS 태깅을 자세히 알아보려면 [EC2][2] 및 [Lambda][3] 설명서를 참조하시기 바랍니다.

[1]: https://app.datadoghq.com/account/settings#integrations/amazon-web-services
[2]: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/Using_Tags.html
[3]: https://docs.aws.amazon.com/lambda/latest/dg/tagging.html
{{% /tab %}}
{{% tab "Azure" %}}

[Azure 통합 타일][1]은 태그 필터 `Optionally filter to VMs with tag`를 지원합니다.

이 필드에서는 Azure 가상 머신(VM)에서 메트릭을 수집할 때 사용되는 필터를 정의하며 쉼표로 구분되는 태그 목록을(`<KEY>:<VALUE>` 형식으로) 사용할 수 있습니다. 단일 문자인 경우 `?`, 여러 문자인 경우 `*` 등의 와일드카드도 사용할 수 있습니다. 정의된 태그에 일치하는 VM만 Datadog에서 불러오며, 나머지는 무시됩니다.

특정 태그와 일치하는 VM은 태그 앞에 `!`를 추가해 제외할 수도 있습니다. 예를 들면 다음과 같습니다.

```text
datadog:monitored,env:production,!env:staging,instance-type:c1.*
```

[1]: https://app.datadoghq.com/account/settings#integrations/azure
{{% /tab %}}
{{% tab "Google Cloud" %}}

[Google Cloud 통합 타일][1]은 태그 필터 `to hosts with tag`를 지원합니다.

이 필드에서는 GCP에서 메트릭을 수집할 때 사용되는 필터를 정의하며 쉼표로 구분되는 GCP 라벨 목록을(`<KEY>:<VALUE>` 형식으로) 사용할 수 있습니다. 단일 문자인 경우 `?`, 여러 문자인 경우 `*` 등의 와일드카드도 사용할 수 있습니다. 정의된 라벨에 일치하는 호스트만 Datadog에서 불러오며, 나머지는 무시됩니다.

특정 태그와 일치하는 호스트는 태그 앞에 `!`를 추가해 제외할 수도 있습니다. 예를 들면 다음과 같습니다.

```text
datadog:monitored,env:production,!env:staging,instance-type:c1.*
```

더 자세한 정보는 Google Cloud의 [라벨 생성 및 관리][2] 가이드를 참조하시기 바랍니다.

[1]: https://app.datadoghq.com/account/settings#integrations/google-cloud-platform
[2]: https://cloud.google.com/compute/docs/labeling-resources
{{% /tab %}}
{{< /tabs >}}

## APM

{{< tabs >}}
{{% tab "트레이스 검색기" %}}

[트레이스 검색기][1]에서 검색 바 또는 패싯 확인란을 사용하여 태그로 추적을 필터링할 수 있습니다. 예를 들어, 검색 바 형식이 `<KEY>:<VALUE>`이면 `service:coffee-house`입니다. 고급 검색은 [쿼리 구문][2]을 참고하세요.

{{< img src="tagging/using_tags/trace_explorer.png" alt="트레이스 검색기 태그" style="width:80%;">}}

[1]: /ko/tracing/trace_explorer/search/
[2]: /ko/tracing/trace_explorer/query_syntax/
{{% /tab %}}
{{% tab "서비스 맵" %}}

[태그를 할당][1]한 후, 서비스 맵을 사용하면 특정 서비스를 클릭해 애플리케이션의 다양한 영역으로 이동할 수 있습니다. 아래 예시를 보시면 [애널리틱스][2], [모니터링][3], [로그][4], [호스트 맵][5]이 태그 `service:coffee-house`로 필터링된 것을 확인할 수 있습니다.

{{< img src="tagging/using_tags/servicemaptags.png" alt="서비스 맵 태그" style="width:80%;">}}

[1]: /ko/getting_started/tagging/assigning_tags/
[2]: /ko/tracing/app_analytics/search/
[3]: /ko/monitors/manage/
[4]: /ko/logs/explorer/search/
[5]: /ko/infrastructure/hostmap/
{{< /tabs >}}

{{< /tabs >}}

## 노트북

[노트북][9] 그래프를 생성할 때 **from** 텍스트 상자에서 태그를 사용하여 메트릭을 제한할 수 있습니다. 또한 **avg by** 텍스트 상자에서 태그를 사용하여 메트릭을 그룹화하기도 가능합니다. 아래 예시를 보면 메트릭이 `service:coffee-house`로 제한되고, `host`로 그룹화됩니다.

{{< img src="tagging/using_tags/notebooktags.png" alt="노트북 태그" style="width:80%;">}}

태그를 제외하려면 `</>`를 사용해 텍스트를 수정하고 `!<KEY>:<VALUE>` 형식으로 태그를 추가하세요. 아래 예시를 보면 `!service:coffeehouse`를 사용해 `service:coffeehouse`를 제외했습니다.

{{< img src="tagging/using_tags/notebooktagsexclude.mp4" alt="노트북 제외 태그" video="true" width="80%">}}

## 로그

로그 [검색][10], [애널리틱스][11], [패턴][12], [라이브 테일][13]은 검색창이나 패싯 체크박스를 사용하여 태그로 로그를 필터링합니다. 검색창 형식은 `<KEY>:<VALUE>`로, 예를 들면 `service:coffee-house`라고 쓸 수 있습니다. 고급 검색을 자세히 알아보려면 [로그 검색][10] 페이지를 참조해주세요.

{{< tabs >}}
{{% tab "검색" %}}

{{< img src="tagging/using_tags/logsearchtags.png" alt="로그 검색 태그" style="width:80%;">}}

{{% /tab %}}
{{% tab "애널리틱스" %}}

{{< img src="tagging/using_tags/loganalyticstags.png" alt="로그 애널리틱스 탭" style="width:80%;">}}

{{% /tab %}}
{{% tab "패턴" %}}

{{< img src="tagging/using_tags/logpatternstags.png" alt="로그 패턴 태그" style="width:80%;">}}

{{% /tab %}}
{{% tab "라이브 테일" %}}

{{< img src="tagging/using_tags/livetailtags.mp4" alt="라이브 테일 태그" video="true" width="80%">}}

{{% /tab %}}
{{< /tabs >}}

또, 로그 [파이프라인][14]을 필터링할 때도 태그를 사용할 수 있습니다. 아래 예시에서는 파이프라인에서 태그 `service:coffee-house`로 로그를 필터링했습니다.

{{< img src="tagging/using_tags/logpipelinetags.png" alt="파이프라인 태그" style="width:80%;">}}

## RUM & 세션 리플레이

[RUM 익스플로러][15]는 특정 기간에 사용자의 환경에서 발생한 이벤트를 시각화합니다.

RUM 이벤트 데이터를 태그로 필터링하려면 검색창이나 파셋 체크박스를 사용하세요. 검색창 형식은 `<KEY>:<VALUE>`로, 예를 들면 `service:shopist`라고 쓸 수 있습니다. 고급 검색을 자세히 알아보려면 [RUM 검색][16] 페이지를 참조해주세요.

{{< img src="tagging/using_tags/rumtags.png" alt="RUM 태그" style="width:80%;">}}

## 신서틱

{{< tabs >}}
{{% tab "신서틱 테스트" %}}

[신서틱 테스트][1] 페이지는 신서틱 테스트의 목록을 보여줍니다.

테스트를 태그로 필터링하려면 검색창이나 패싯 체크박스를 사용하세요. 검색창 형식은 `<KEY>:<VALUE>`로, 예를 들면 `tag:mini-website`라고 쓸 수 있습니다. 고급 검색을 자세히 알아보려면 [신서틱 테스트 검색 및 관리][16] 페이지를 참조해주세요.

{{< img src="tagging/using_tags/syntheticstags.png" alt="신서틱 태그" style="width:80%;">}}


[1]: https://app.datadoghq.com/synthetics/tests
[2]: /ko/synthetics/search/
{{% /tab %}}
{{% tab "Explorer" %}}

[Synthetic Monitoring & Continuous Testing Explorer][1]에는 [CI 파이프라인][2]에서 실행한 테스트와 테스트 배치가 표시됩니다.

태그별 테스트 실행을 필터링하려면 검색 바 또는 패싯 확인란을 사용합니다. 예를 들어, 검색 바 형식이 `<KEY>:<VALUE>`이면 `@ci.provider.name:github`입니다. 고급 검색은 [테스트 배치 검색][3]을 참고하세요.

{{< img src="tagging/using_tags/syntheticscitags.png" alt="신서틱 및 CI 태그" style="width:80%;">}}


[1]: https://app.datadoghq.com/synthetics/explorer/
[2]: /ko/continuous_testing/cicd_integrations
[3]: /ko/continuous_testing/explorer/search/
{{% /tab %}}
{{< /tabs >}}

## 서비스 수준 목표(Service Level Objectives)

{{< tabs >}}
{{% tab "SLO 관리" %}}

[할당된 태그][1]로 SLO를 필터링하려면 검색창이나 패싯 체크박스를 사용하세요. 검색창 형식은 `tag:<KEY>:<VALUE>`입니다(예: `journey:add_item`). 특정 태그가 지정된 SLO를 검색에서 제외하려면 `-`, for example: `-journey:add_item`를 사용하세요.

{{< img src="tagging/using_tags/manage_slo_tags.png" alt="SLO 태그" style="width:80%;">}}

SLO 태그는 SLO의 기초 메트릭이나 모니터링에 사용된 메트릭 또는 모니터링 태그와 다르며, 별도로 작용합니다.

[1]: /ko/getting_started/tagging/assigning_tags/?tab=servicelevelobjectives#ui
{{< /tabs >}}

{{% tab "메트릭 기반의 SLO" %}}

[메트릭 기반 SLO][1]를 생성할 때, SLO의 성공 비율 메트릭 쿼리에 메트릭 태그를 사용하세요(모든 메트릭은 동일한 메트릭 태그 세트를 사용해야 합니다).

* **from** 텍스트 상자: 메트릭 범위를 지정 태그로만 제한합니다.
* **sum by** 텍스트 상자: SLO 전체와 각 태그 값의 상태 백분위, 남은 오류 여유분을 표시하는 그룹화 메트릭 기반 SLO를 생성합니다.

{{< img src="tagging/using_tags/metric_based_slo_tags.png" alt="메트릭 기반 SLO 태그" style="width:80%;">}}

[1]: /ko/service_management/service_level_objectives/metric/
{{% /tab %}}
{{% tab "모니터링 기반 SLO" %}}

하나의 [그룹화된 모니터링][2] 정보를 활용하여 [모니터 기반 SLO][1]를 생성하는 경우에는 **Calculate on selected groups** 토글을 사용하세요. 기초 모니터링 결과에서 최대 20개의 태그 값을 선택할 수 있고 SLO 전체 및 각 태그 값의 상태 비율, 남은 오류 여유분이 표시됩니다.

{{< img src="tagging/using_tags/monitor_based_slo_tags.png" alt="모니터링 기반 SLO 태그" style="width:80%;">}}

[1]: /ko/service_management/service_level_objectives/monitor/
[2]: /ko/getting_started/tagging/using_tags/?tab=newmonitor#monitors
{{% /tab %}}
{{< /tabs >}}

## 개발자

[API][17]에서 태그를 다양하게 사용할 수 있습니다.

각 섹션으로 연결된 링크 목록을 확인해주세요.

* [모니터링 다운타임의 스케줄링][18]
* [이벤트 익스플로러 쿼리][19]
* [호스트 검색][20]
* [AWS][21] 및 [Google Cloud][22]의 통합
* [시계열 포인트 쿼리][23]
* [모든 모니터링 정보의 확인][24]
* [모니터링 음소거][25]
* [모니터링 검색][24]
* [모니터링 그룹 검색][24]
* [스크린보드 생성][26]
* [타임보드 생성][26]
* [SLO 만들기][27]
* [SLO 상세 정보 확인][28]
* [SLO 업데이트][29]

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/getting_started/tagging/assigning_tags/
[2]: /ko/service_management/events/explorer
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