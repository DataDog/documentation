---
description: 배포를 검색하고 관리하는 방법 알아보기
further_reading:
- link: /continuous_delivery/explorer
  tag: 설명서
  text: 파이프라인 실행 검색하고 필터링하기
title: 배포 검색 및 관리
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">선택한 사이트({{< region-param key="dd_site_name" >}})에서는 아직 CD 가시성을 이용할 수 없습니다.</div>
{{< /site-region >}}

{{< callout url="https://docs.google.com/forms/d/e/1FAIpQLScNhFEUOndGHwBennvUp6-XoA9luTc27XBwtSgXhycBVFM9yA/viewform?usp=sf_link" header="false" >}}
CD 가시성은 프라이빗 베타 서비스 중입니다. 서비스 액세스를 요청하려면 양식을 완료하세요.
{{< /callout >}}

## 배포

내 배포의 개요를 보려면 [**Software Delivery** > **CD Visibility** > **Deployments**][1]로 이동하세요.

[**Deployments** 페이지][1]에서는 선택한 시간대에서 서비스와 환경별로 집계된 통계와 최근 배포 실행 작업의 상태를 볼 수 있습니다. 이 페이지에서 내 서비스 배포와 배포 상태를 확인하세요.
이 메트릭에는 실행 및 실패 작업 수, 실패율, 중앙값 기간, 백분위 95번째 시간 등이 포함되어 있습니다. 이 정보로 실패 확률이 높은 배포와 실행이 오래 걸리는 배포를 파악할 수 있습니다. 최근 변경 사항의 영향은 최근 배포 결과의 상태, 수정 내용, 시간을 통해 확인할 수 있습니다.

<div class="alert alert-info">서비스가 구성되어 있지 않은 배포나 일부 배포 실행의 경우에는 Deployment 페이지의 통계 집계에서 제외됩니다. 이 같은 배포는 Deployment Executions 페이지에서 검색할 수 있습니다. <code>@deployment.partial_deployment:* 또는 -@deployment.service:*</code>.</div>

{{< img src="/continuous_delivery/search/deployments_2.png" text="Datadog의 Deployments 페이지" style="width:100%" >}}

환경에 서비스를 배포할 때 다른 방법을 사용하는 경우 배포 행을 확장해 배포 이름으로 필터링된 통계를 확인할 수 있습니다.

**Deployment** 페이지에서 다음과 같은 고수준 정보를 확인할 수 있습니다.

- 집계된 통계를 바탕으로 여러 서비스 및 환경에 관한 상태 개요
- 프로덕션 단계에서 배포가 끊어진 것과 같이 즉각적이고 응급한 오류를 파악하고 문제 해결할 수 있는 시간
- 각 서비스 배포가 시간 흐름에 따라 실행된 방법, 결과, 추세

## 배포 상세 정보

특정 서비스 배포를 클릭하면 **Deployment Details** 페이지를 볼 수 있습니다. 이 페이지에서 선택 서비스 배포의 데이터를 특정 시간대의 흐름에 따라 볼 수 있습니다.

{{< img src="continuous_delivery/search/deployments_page_2.png" alt="Deployment 페이지의 단일 배포 정보" style="width:100%;">}}

선택한 서비스 배포의 시간 흐름에 따른 배포 성공 및 실패 수, 평균 배포 시간, 롤백 수, 실패율과 같은 인사이트를 얻을 수 있습니다. 페이지 하단에는 선택한 환경 필터에 따른 서비스 배포 실행 테이블이 표시됩니다.

## 배포 실행

[**Deployment Executions** 페이지][2]에서는 선택한 시간대에서 실행한 전체 배포 항목을 확인할 수 있습니다. 좌측에 있는 패싯을 사용해 배포 실행 목록을 필터링하고 실행 항목을 클릭하면 Deployment Execution Details 측면 패널에서 추가 상세 정보를 확인할 수 있습니다.

{{< img src="continuous_delivery/search/details_side_panel.png" alt="Deployments 페이지의 Deployment Details 측면 패널" style="width:100%;">}}

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/ci/deployments
[2]: https://app.datadoghq.com/ci/deployments/executions