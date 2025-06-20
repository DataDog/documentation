---
description: Quality Gates Explorer의 패싯에 대해 알아보기
further_reading:
- link: quality_gates/explorer/
  tag: 설명서
  text: Quality Gates Explorer에 대해 알아보기
- link: quality_gates/search/
  tag: 설명서
  text: 규칙 및 실행 작업 검색하는 방법 알아보기
title: Quality Gates 또는 Rule Execution 패싯
---

{{< callout url="#" btn_hidden="true" >}}
Quality Gate는 공용 베타 서비스 중입니다.
{{< /callout >}}

## 개요

패싯은 규칙과 실행 작업의 사용자 정의 태그와 속성을 뜻합니다. 이는 [정성적](#qualitative-facets) 및 [정량적](#quantitative-measures) 데이터 분석에 모두 유용합니다. 패싯을 사용하면 [대시보드][2]와 [노트북][3]의 검색 쿼리에 표시되는 규칙과 실행 작업을 조정할 수 있습니다.

[품질 보장 게이트를 검색][5]할 때 패싯을 생성할 **필요가 없습니다**. 자동 완료 기능에서 기존 패싯을 사용하며 수신 품질 보장 게이트와 일치하는 입력 항목도 사용합니다.

[Quality Gates Explorer][4]에는 `Status`와 `Gate ID`와 같은 기본 패싯이 포함되어 있습니다. Quality Gates Explorer에 있는 패싯을 사용해 [품질 보장 게이트를 검색하고 필터링][5]할 수 있습니다.

{{< tabs >}}
{{% tab "게이트" %}}

[**Software Delivery** > **Quality Gates** > **Quality Gate Executions**][101]으로 이동하고 **Gates**를 선택해 [Quality Gates 패싯][102] 목록에 액세스할 수 있습니다.

{{< img src="quality_gates/explorer/facets_gates.png" text="Quality Gates Explorer에 있는 게이트 패싯 목록" style="width:100%" >}}

[101]: https://app.datadoghq.com/ci/quality-gates/executions
[102]: /ko/quality_gates/explorer/?tab=gates

{{% /tab %}}
{{% tab "규칙" %}}

[**Software Delivery** > **Quality Gates** > **Quality Gate Executions**][101]으로 이동하고 **Rules**를 선택해 [Quality Gates 패싯][102] 목록에 액세스할 수 있습니다.

{{< img src="quality_gates/explorer/facets_rules.png" text="Quality Gates Explorer에 있는 규칙용 패싯 목록" style="width:100%" >}}

[101]: https://app.datadoghq.com/ci/quality-gates/executions
[102]: /ko/quality_gates/explorer/?tab=rules

{{% /tab %}}
{{< /tabs >}}

### 정성적 패싯

정성적 패싯을 사용하면 다음을 할 수 있습니다.

- 값의 **상대적 인사이트 얻기**
- **고유 값 개수 세기**
- 특정 값을 기준으로 품질 보장 게이트를 자주 **필터링**하세요. 예를 들어 환경 태그에 패싯을 생성하여 문제 해결 범위를 개발, 스테이징, 또는 프로덕션 환경까지 확장할 수 있습니다.<br>

**참고:** 태그의 필터링에 패싯이 필요하지는 않지만, 조사 중에 자주 사용하는 태그의 패싯을 정의하면 해결 시간을 단축할 수 있습니다.

### 정량적 측정 값

정략적 측정 값을 사용하면 다음을 할 수 있습니다.

- 여러 품질 보장 게이트의 값을 **집계**
- 품질 보장 게이트의 **범위 필터링**
- 품질 보장 게이트 값에 따라 **정렬**

#### 유형

long 타입 정수와 부동 소수점 지원


## 패싯 패널

데이터를 필터링하고 그룹화할 때 검색 바가 가장 종합적인 상호 작용 기능을 많이 제공합니다. 그러나 대부분의 경우 패싯 패널을 사용해 데이터를 조사할 수 있습니다. 패싯을 열어 컨텐츠 요약을 살펴보고 현재 쿼리의 범위를 알아볼 수 있습니다.

검색창과 URL은 자동으로 패싯 패널에서 선택한 항목을 반영합니다.

- **패싯(정성적)**에서 고유 값 목록과 각 패싯과 일치하는 품질 보장 게이트 개수를 볼 수 있습니다.
- **측정 값(정량적)**은 최솟값과 최댓값이 있는 범위 슬라이더와 함께 표시됩니다. 슬라이더를 사용하거나 숫자 값을 입력해 검색 쿼리의 범위 경계를 다르게 조정할 수 있습니다.

### 패싯 그룹화

패싯은 패싯 목록에서 중요한 테마로 그룹화됩니다. 패싯에 그룹을 할당하거나 재할당하는 것은 패싯 목록에만 영향을 미치며 검색이나 분석에는 영향을 미치지 않습니다.

### 패싯 필터링

패싯 패널의 검색 패싯 필드를 사용하면 패싯 목록을 피터링하고 특정 패싯으로 이동할 수 있습니다. 검색에는 패싯 표시 이름과 필드 이름을 사용하여 결과 범위를 지정합니다.

## 패싯 생성

스팬 검색을 위해 반드시 규칙 실행 속성/태그에 패싯을 생성해야 하는 것은 아닙니다. 특정 스팬 속성에 의미 있는 설명을 추가하고 싶거나 패싯 목록에 속성 값을 표시하고 싶은 경우에 패싯을 사용하면 유용합니다.

### 패싯 목록에서 패싯 생성

패싯에서 **+ Add**을 클릭해 바로 패싯을 생성할 수 있습니다.

{{< img src="quality_gates/explorer/facets.png" alt="패싯 측면 패널에서 패싯 추가" style="width:30%;">}}

이 패싯의 기본 필드(키) 이름을 정의하세요.

- `@` 접두사를 사용해 품질 보장 속성용 속성 경로를 사용하세요.

기존 뷰에서 품질 보장 게이트 내용을 기반으로 자동 완성 기능을 제공하기 때문에 적절한 필드 이름을 정의하는 데 도움이 됩니다. 그러나 원하는 다른 이름으로 바꿀 수 있습니다.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/monitors/types/ci
[2]: /ko/dashboards/
[3]: /ko/notebooks/
[4]: /ko/quality_gates/explorer
[5]: /ko/quality_gates/search
[6]: /ko/quality_gates/explorer/search_syntax/