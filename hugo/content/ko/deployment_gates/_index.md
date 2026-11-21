---
algolia:
  tags:
  - cd gates
description: 성능 저하가 감지되면 모니터 및 APM 이상 징후를 자동으로 평가하고 릴리스를 중단하여 배포 인시던트를 줄이세요.
further_reading:
- link: /deployment_gates/setup
  tag: 설명서
  text: Deployment Gates 설정
- link: /deployment_gates/explore
  tag: 설명서
  text: Deployment Gates 탐색기에 대해 알아보기
- link: continuous_delivery
  tag: 설명서
  text: Continuous Delivery Visibility에 대해 알아보기
- link: continuous_delivery/deployments
  tag: 설명서
  text: CD Visibility 설정 방법 알아보기
title: Deployment Gates
---
배포 게이트를 통해 배포로 인한 인시던트 발생 확률 및 그로 인한 영향을 줄일 수 있습니다.

프로덕션 롤아웃 수행 시 배포 게이트를 사용하여 [모니터][1] 및 APM 이상 징후를 바탕으로 새로운 변경 사항의 영향을 평가할 수 있습니다.
이상 징후나 성능 저하가 감지되면 릴리스를 자동으로 중단하여 불안정한 코드가 더욱 광범위한 사용자에게 배포되는 것을 방지할 수 있습니다. 또한 배포 게이트를 문제 조사를 위한 시작점으로 활용할 수 있습니다.

설정 방법은 [배포 게이트 설정][2]을 참조하세요. 설정이 완료되면 [배포 게이트 평가][3] 페이지를 통해 게이트 평가를 추적 및 분석할 수 있습니다.

{{< img src="/deployment_gates/explore/deployment_gates_explorer.png" text="The Deployment Gate evaluation page in Datadog" style="width:100%" >}}

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/monitors/
[2]: /ko/deployment_gates/setup
[3]: /ko/deployment_gates/explore