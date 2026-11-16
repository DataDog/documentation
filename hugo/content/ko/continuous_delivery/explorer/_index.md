---
description: CD Visibility 배포를 쿼리하고 시각화하는 방법을 알아보세요.
further_reading:
- link: /continuous_delivery/features
  tag: 설명서
  text: CD Visibility 기능에 대해 알아보기
- link: /continuous_delivery/deployments/
  tag: 설명서
  text: Deployment Visibility에 대해 알아보기
- link: /continuous_delivery/explorer/saved_views
  tag: 설명서
  text: Saved Views에 대해 알아보기
title: CD Visibility 배포 살펴보기
---
{{< callout btn_hidden="true" header="false" >}}
CD Visibility는 미리 보기로 제공되고 있습니다. 액세스 권한은 이미 등록된 조직으로만 제한됩니다.
{{< /callout >}}

## 배포 {#deployments}

배포 개요를 보려면 [**Software Delivery** > **CD Visibility** > **Deployments**][6]로 이동하세요.

[**Deployments** 페이지][6]에는 선택한 기간 동안 서비스 및 환경별로 집계된 통계와 최신 배포 실행 상태가 표시됩니다. 이 페이지를 사용하여 모든 서비스 배포를 확인하고 상태를 파악하세요.
표시되는 메트릭에는 실행 횟수 및 실패 횟수, 실패율, 소요 시간의 중앙값, 소요 시간의 95백분위수가 포함됩니다. 이 정보는 어떤 배포가 실패할 확률이 더 높고 어떤 배포가 실행되는 데 가장 많은 시간이 소요되는지 보여줍니다. 최신 변경 사항의 영향은 마지막 배포 결과의 상태, 수정 버전 및 시간을 확인하여 볼 수 있습니다.

<div class="alert alert-info">서비스가 구성되지 않은 배포 및 부분적인 배포 실행은 Deployments 페이지의 통계 집계에서 제외됩니다. Deployment Executions 페이지에서 이러한 배포를 검색할 수 있습니다. <code>@deployment.partial_deployment:* OR -@deployment.service:*</code>.</div>

{{< img src="/continuous_delivery/search/deployments_2.png" text="The Deployments page in Datadog" style="width:100%" >}}

환경에 서비스를 배포할 때 다른 방법을 사용하는 경우 배포 행을 확장해 배포 이름으로 필터링된 통계를 확인할 수 있습니다.

{{< ui >}}Deployment{{< /ui >}} 페이지에서 다음과 같은 개괄적인 정보를 확인할 수 있습니다.

- 집계된 통계를 바탕으로 여러 서비스 및 환경에 관한 상태 개요.
- 프로덕션 환경에서 실패한 배포와 같이 즉각적인 조치가 필요한 긴급 문제를 발견하고 해결할 수 있는 창.
- 시간 경과에 따른 각 서비스 배포의 실행 내역과 결과 및 추세.

### 배포 상세 정보 {#deployment-details}

특정 서비스 배포를 클릭하면 {{< ui >}}Deployment Details{{< /ui >}} 페이지를 볼 수 있습니다. 이 페이지에서는 지정된 기간 동안 선택한 서비스 배포의 데이터를 조회할 수 있습니다.

{{< img src="continuous_delivery/search/deployments_page_2.png" alt="단일 배포를 위한 배포 페이지" style="width:100%;">}}

시간 경과에 따른 성공 및 실패한 배포 횟수, 평균 배포 소요 시간, 롤백 횟수, 실패율 등 선택한 서비스 배포에 대한 인사이트를 확보하세요. 페이지 하단에는 선택한 환경 필터를 기반으로 서비스의 배포 실행을 보여주는 표가 있습니다.

## Deployment Executions {#deployment-executions}

[**Deployment Executions** 페이지][4]에는 선택한 기간 동안의 모든 배포 실행 내역이 표시됩니다. 왼쪽의 패싯을 사용하여 배포 실행 목록을 필터링하고, 실행을 클릭하여 Deployment Execution Details 사이드 패널에서 추가 세부 정보를 확인할 수 있습니다.

{{< img src="continuous_delivery/search/details_side_panel.png" alt="Deployments 페이지의 Deployment Details 사이드 패널" style="width:100%;">}}

배포가 CI Visibility의 파이프라인과 올바르게 연결되면 배포 실행 패널에 파이프라인 트레이스를 볼 수 있는 새로운 {{< ui >}}Pipeline{{< /ui >}} 탭이 포함됩니다. 이 탭에서 상단의 {{< ui >}}View Full Pipeline{{< /ui >}} 링크를 클릭하면 CI Visibility로 이동할 수 있습니다.

{{< img src="ci/cd-ci-correlation-pipeline-tab.png" alt="Pipeline 탭이 있는 배포 실행 패널" style="width:100%;">}}

배포를 CI 파이프라인과 연결하기 위해 추가 설정이 필요할 수 있습니다. 자세한 내용은 CD 공급자의 설정 페이지를 참조하세요.

[Deployment Executions 페이지][4]에서는 모든 태그를 사용하여 여러 수준에서 배포 실행을 [검색 및 필터링](#search-and-filter), [분석](#analyze), [시각화](#visualize) 및 [내보내기](#export)할 수 있습니다.

{{< img src="continuous_delivery/explorer/deployment_executions_2.png" alt="CD Visibility Explorer에 나타나는 배포 실행 결과" width="100%" >}}

### 검색 및 필터링 {#search-and-filter}

왼쪽의 패싯을 클릭하거나 검색창에 사용자 지정 쿼리를 작성하여 배포 실행의 하위 집합으로 범위를 좁히거나 넓히거나 초점을 전환할 수 있습니다. 패싯을 선택하거나 선택 해제하면 검색창에 변경 사항이 자동으로 반영됩니다. 마찬가지로 검색창 쿼리를 수정하거나 검색창에 쿼리를 새로 작성하여 왼쪽의 패싯을 선택하거나 선택 해제할 수 있습니다. 쿼리를 만드는 방법을 알아보려면 [검색 구문][2]을 참조하세요.

### 분석 {#analyze}

정보를 추출하거나 통합하기 위해 쿼리된 배포 실행을 필드, 패턴, 트랜잭션과 같은 상위 수준 엔터티로 그룹화합니다. [패싯][3]은 속성을 검색하는 데 필수 사항은 아니지만, 패싯을 사용하여 다음 작업을 수행할 수 있습니다.

- 환경 내 배포를 검색하고 진행 상황을 추적합니다.
- 모든 배포 결과를 조사하여 실패한 배포를 식별하고 문제를 해결합니다.

### 시각화 {#visualize}

시각화 유형을 선택하여 필터 및 집계 결과를 표시하고 배포 실행을 더 잘 이해하세요. 예를 들어, 배포 결과를 목록으로 조회하여 배포 데이터를 열별로 정리할 수 있습니다. 또는 배포 결과를 시계열 그래프로 조회하여 시간 경과에 따른 배포 데이터를 측정할 수 있습니다.

### 내보내기 {#export}

[Deployment Executions 페이지][4]에서 [보기][5]를 내보내 나중에 또는 다른 상황에서 재사용할 수 있습니다.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/continuous_delivery/search
[2]: /ko/continuous_delivery/explorer/search_syntax
[3]: /ko/continuous_delivery/explorer/facets
[4]: https://app.datadoghq.com/ci/deployments/executions
[5]: /ko/continuous_delivery/explorer/saved_views
[6]: https://app.datadoghq.com/ci/deployments