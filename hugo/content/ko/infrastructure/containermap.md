---
aliases:
- /ko/graphing/infrastructure/containermap/
- /ko/guides/hostmap
further_reading:
- link: /infrastructure/livecontainers/
  tag: 그래프화
  text: 환경 전반의 모든 컨테이너에 대한 실시간 가시성 확보
- link: /infrastructure/process/
  tag: 그래프화
  text: 시스템의 모든 레벨에서 발생하는 상황 파악
title: 컨테이너 맵
---

## 개요

[호스트 맵][1]과 마찬가지로, [컨테이너 맵][2]은 전반적인 컨테이너의 상태를 나타냅니다. Datadog은 ECS, 도커, 쿠버네티스 등과 통합됩니다. 커스텀 그룹과 필터, 그리고 색상과 모양을 통해 이해하기 쉽도록 만들어진 메트릭을 사용하여 모든 컨테이너를 한 화면에서 볼 수 있습니다.

아웃라이어 감지, 사용 패턴 파악, 리소스 문제 방지, 컨테이너를 최적으로 관리하기 위한 의사 결정, 이 모든 것이 한 곳에서 이루어집니다. 컨테이너가 10개이든, 100개이든, 10,000개이든 상관없습니다. [자동 탐지][3]는 새 컨테이너를 자동으로 감지하고 해당 컨테이너를 처리합니다.

{{< img src="infrastructure/containermap/containermap.png" alt="Container map part 1" style="width:80%;">}}

## 설치

[에이전트][4]를 배포한 후에는 다른 설정이 필요하지 않습니다. [도커 에이전트][5]가 아닌 표준 설치에서 도커 컨테이너 정보를 수집하려면 `dd-agent` 사용자에게 `docker.sock` 접근 권한이 있어야 합니다. 권한은 `dd-agent`를 `docker` 그룹에 추가하여 부여할 수 있습니다.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/infrastructure/hostmap/
[2]: https://app.datadoghq.com/infrastructure/map?node_type=container
[3]: /ko/agent/kubernetes/integrations/
[4]: /ko/agent/
[5]: /ko/agent/docker/