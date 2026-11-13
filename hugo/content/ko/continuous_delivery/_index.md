---
cascade:
  algolia:
    rank: 70
    tags:
    - ci/cd
    - continuous delivery
    - deployment visibility
    - deployments
    - deployment executions
disable_sidebar: true
further_reading:
- link: continuous_delivery/deployments
  tag: 설명서
  text: Deployment Visibility 설정 방법 알아보기
- link: /continuous_delivery/explorer
  tag: 설명서
  text: 배포를 쿼리하고 시각화하는 방법 알아보기
- link: /continuous_delivery/features
  tag: 설명서
  text: CD Visibility 기능에 대해 알아보기
- link: https://www.datadoghq.com/blog/best-practices-for-ci-cd-monitoring/
  tag: 블로그
  text: CI/CD 모니터링 모범 사례
- link: https://app.datadoghq.com/release-notes?category=Software%20Delivery
  tag: 릴리스 노트
  text: 최신 Software Delivery 릴리스를 확인하세요! (앱 로그인 필요)
title: Continuous Delivery Visibility
---
{{< callout btn_hidden="true" header="false" >}}
CD Visibility는 미리 보기로 제공되고 있습니다. 액세스 권한은 이미 등록된 조직으로만 제한됩니다.
{{< /callout >}}

Datadog Continuous Delivery(CD) Visibility는 배포에 대한 관측 가능성을 제공합니다. CD Visibility는 배포 메트릭과 데이터를 Datadog으로 가져와 배포 상태를 전달하고, 팀이 매번 품질 높은 코드를 제공할 수 있는 능력을 향상하는 데 집중할 수 있도록 합니다.

CD Visibility를 사용하면 모든 배포 이벤트를 추적하여 CD 환경 전반의 배포를 모니터링할 수 있습니다. 배포되는 변경 사항과 해당 변경 사항이 서비스에 미치는 영향을 파악할 수 있습니다.

## 원활한 통합을 통해 효율성 향상 {#increase-efficiency-through-seamless-integrations}

Datadog은 [CI 공급자][3] 및 [Argo CD][4]와 같은 CD 공급자와 통합되어 배포의 실행 성능과 결과를 추적합니다.

{{< partial name="continuous_delivery/cd-getting-started.html" >}}

<br/>

시간에 따라 집계된 데이터를 사용하여 추세를 파악하고 운영 효율성을 높이기 위해 배포 전략을 개선하세요.

## 시작할 준비가 되셨나요? {#ready-to-start}

CD 공급자를 통해 CD Visibility를 설정하는 방법, 호환성 요구 사항에 대한 정보, 데이터 수집을 계측하고 구성하는 단계에 대해서는 [Deployment Visibility][1]를 참조하세요. 배포를 쿼리하고 시각화하는 방법을 이해하려면 [CD Visibility 배포 살펴보기][2]를 참조하세요.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/continuous_delivery/deployments
[2]: /ko/continuous_delivery/explorer
[3]: /ko/continuous_delivery/deployments/ciproviders
[4]: /ko/continuous_delivery/deployments/argocd