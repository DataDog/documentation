---
title: vSphere 통합 빌링
---

## 개요

Datadog는 vCenter 서버에 설치된 각 Agent와 모니터링하는 가상 머신(VM)에 대하여 비용을 청구합니다.

## vSphere 가상 머신 제외

`vsphere.yaml` 파일을 사용해 Datadog에서 regex를 사용해 모니터링하는 가상 머신을 필터링하세요. [샘플 vsphere.d/conf.yaml][1]에서 예시를 찾아볼 수 있습니다.

기존 VM에 제한을 추가할 때 이전에 탐지된 VM은 [인프라스트럭처 목록][2]에 최대 24시간 동안 표시됩니다. 이전(트랜지션) 동안에는 VM의 상태가 `???`로 표시됩니다. 이는 요금 청구 대상으로 간주되지 않습니다.

## 트러블슈팅

기술적 지원이 필요하신 경우 [Datadog 지원팀][3]에 문의해주세요.

요금 청구와 관련해 궁금하신 점이 있다면 [고객 성공][4] 매니저와 상의하시기 바랍니다.

[1]: https://github.com/DataDog/integrations-core/blob/master/vsphere/datadog_checks/vsphere/data/conf.yaml.example
[2]: /ko/infrastructure/
[3]: /ko/help/
[4]: mailto:success@datadoghq.com