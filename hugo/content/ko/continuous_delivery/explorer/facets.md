---
description: 배포 실행을 필터링하고 그룹화하기 위한 패싯에 대해 알아보세요.
further_reading:
- link: continuous_delivery/explorer/
  tag: 설명서
  text: 배포를 쿼리하고 시각화하는 방법 알아보기
title: 배포 실행 패싯
---
{{< callout btn_hidden="true" header="false" >}}
CD Visibility는 미리 보기로 제공되고 있습니다. 액세스 권한은 이미 등록된 조직으로만 제한됩니다.
{{< /callout >}}

## 개요 {#overview}

패싯은 파이프라인에서 사용자가 정의한 태그와 속성입니다. 이는 [정성적](#qualitative-facets) 및 [정량적](#quantitative-measures) 데이터 분석 모두에 유용합니다. 패싯을 사용하면 [대시보드][2] 및 [노트북][3]에 표시되는 검색 쿼리에서 배포를 조작할 수 있습니다.

[배포 실행 검색][5]을 위해 [패싯을 생성](#creating-facets)할 **필요는 없습니다**. 자동 완성 기능은 기존 패싯을 사용하지만, 수신되는 배포 실행과 일치하는 모든 입력도 적용됩니다.

[Deployment Executions 페이지][4]에는 `Environment`, `Deployment Status`, `Deployment Provider`와 같은 기본 제공 패싯이 포함되어 있습니다. CD Visibility Explorer에서 패싯을 사용하여 다음을 수행할 수 있습니다.

- [배포 실행을 검색 및 필터링][5]합니다.
- 배포 또는 환경 분석을 수행합니다.
- 배포가 완료된 후 문제 해결을 시작합니다.

[**Software Delivery** > **CD Visibility** > **Executions**][4]로 이동하여 배포 실행 목록 왼쪽의 패싯 목록에 액세스하세요.

{{< img src="/continuous_delivery/explorer/facets.png" text="Facets list on the Deployment Executions page of the CD Visibility Explorer" style="width:100%" >}}

### 정성적 패싯 {#qualitative-facets}

다음의 경우 정성적 패싯을 사용하세요.

- **값에 대한 상대적 인사이트를 확보합니다.**
- **고유 값 개수를 셉니다.**
- 배포 실행을 특정 값에 따라 자주 **필터링**합니다. 예를 들어, 환경 태그에 패싯을 사용하여 문제 해결 범위를 개발, 스테이징 또는 프로덕션 환경으로 좁힐 수 있습니다.<br>

**참고:** 태그 필터링에 패싯이 반드시 필요한 것은 아니지만, 조사 중에 사용하는 태그에 대해 패싯을 정의하면 해결 시간을 단축할 수 있습니다.

### 정량적 측정값 {#quantitative-measures}

다음의 경우 정량적 측정을 사용하세요.

- **여러 배포 실행의 값을 집계**합니다.
- **배포 실행을 범위로 필터링**합니다.
- **해당 값에 따라 배포 실행을 정렬**합니다.

#### 유형 {#types}

측정값은 동등한 기능에 대해 긴 정수 또는 이중 값을 갖습니다.

#### 단위 {#units}

측정값은 쿼리 시간 및 표시 시간에서 자릿수를 처리하기 위해 단위(**시간**(초) 또는 **크기**(바이트))를 지원합니다. 단위는 필드가 아니라 측정값 자체의 속성입니다.

예를 들어, 나노초 단위의 `duration` 측정값을 살펴보겠습니다. `env:staging`의 배포에서 `duration:10000000`, 즉 `10 milliseconds`라고 가정합니다. `env:qa`의 배포에서 `duration:5000000`, 즉 `5 milliseconds`라고 가정합니다. `duration:>2ms`를 사용하여 두 환경의 배포 실행 태그를 한 번에 일관되게 쿼리하세요. 검색 쿼리에 대한 자세한 내용은 [검색 구문][6]을 참조하세요.

## 패싯 패널 {#facet-panel}

검색창은 데이터를 필터링하고 그룹화하기 위한 가장 포괄적인 상호 작용 세트를 제공합니다. 하지만 많은 경우 패싯 패널은 데이터를 탐색하는 간단한 방법입니다. 현재 쿼리 범위에 대한 내용 요약을 확인하려면 패싯을 여세요.

검색 창과 URL은 패싯 패널의 선택 사항을 자동으로 반영합니다.

- **패싯(정성적)**에는 고유 값의 상위 목록과 각 값에 일치하는 배포 실행 수가 함께 제공됩니다.
- **측정값(정량적)**은 최소값과 최대값을 나타내는 슬라이더와 함께 제공됩니다. 슬라이더를 사용하거나 숫자 값을 입력하여 검색 쿼리의 범위를 다르게 조정할 수 있습니다.

### 패싯 그룹화 {#grouping-facets}

패싯은 패싯 목록에서 의미 있는 주제로 그룹화됩니다. 패싯에 그룹을 할당하거나 다시 할당하는 것은 패싯 목록에만 영향을 미치며, 검색이나 분석에는 영향을 주지 않습니다.

### 패싯 필터링 {#filtering-facets}

패싯 패널의 검색 패싯 상자를 사용하여 전체 패싯 목록의 범위를 좁히고 사용하려는 패싯으로 이동하세요. *검색 패싯*은 패싯 표시 이름과 필드 이름을 사용하여 결과 범위를 좁힙니다.

## 패싯 생성 {#creating-facets}

배포 실행 속성이나 태그에 패싯을 생성하는 것은 배포 실행을 검색하는 데 필수적인 단계는 아닙니다. 패싯은 특정 배포 실행 속성에 의미 있는 설명을 추가하거나 속성 값이 패싯 목록에 표시되도록 하려는 경우에 유용합니다.

### Deployment Details 사이드 패널에서의 패싯 생성 {#creating-facets-from-the-deployment-details-side-panel}

Deployment Details 사이드 패널에서 패싯을 생성하면 대부분의 패싯 세부 정보가 미리 채워집니다.

{{< img src="continuous_delivery/explorer/create_facet.png" alt="Deployment Details 사이드 패널에서 패싯 생성" style="width:100%;">}}

1. [Deployment Executions 페이지][4]에서 패싯을 생성할 필드가 포함된 관심 있는 배포 실행으로 이동합니다.
2. 목록에서 배포 실행을 선택하여 Deployment Details 사이드 패널을 엽니다.
3. 원하는 필드를 클릭하여 해당 필드에 대한 패싯을 생성합니다.

   - 필드에 숫자 값이 있는 경우 패싯 또는 측정값을 생성할 수 있습니다.
   - 필드의 값이 문자열인 경우에는 패싯 생성만 가능합니다.

### 패싯 목록에서 패싯 생성 {#creating-facets-from-the-facet-list}

원하는 필드가 있는 배포 실행을 찾을 수 없는 경우 **+ Add**를 클릭하여 패싯 패널에서 직접 패싯을 생성합니다.

{{< img src="continuous_delivery/explorer/add_facet.png" alt="패싯 사이드 패널에서 패싯 추가" style="width:30%;">}}

이 패싯의 기본 필드(키) 이름을 다음과 같이 정의합니다.

- 환경 태그에는 태그 키 이름을 사용합니다.
- 배포 실행 속성에는 `@` 접두사가 붙은 속성 경로를 사용합니다.

현재 뷰 내 배포 실행의 내용에 기반한 자동 완성은 적절한 필드 이름을 정의하는 데 도움을 줍니다. 다만, Datadog에서 아직 일치하는 배포 실행을 수신하지 못한 경우에는 사실상 어떤 값이든 사용할 수 있습니다.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/monitors/types/ci
[2]: /ko/dashboards/
[3]: /ko/notebooks/
[4]: https://app.datadoghq.com/ci/deployments/executions
[5]: /ko/continuous_delivery/explorer#deployment-executions
[6]: /ko/continuous_delivery/explorer/search_syntax