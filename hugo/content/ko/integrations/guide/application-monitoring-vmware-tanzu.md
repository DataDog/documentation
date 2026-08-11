---
description: VMware Tanzu용 Datadog 애플리케이션 모니터
further_reading:
- link: https://www.datadoghq.com/blog/monitor-tanzu-application-service/
  tag: 블로그
  text: VMware Tanzu Application Service에서 실행되는 애플리케이션 모니터
- link: /integrations/guide/cluster-monitoring-vmware-tanzu/
  tag: documentation
  text: VMware Tanzu용 Datadog 클러스터 모니터
- link: /tracing/
  tag: documentation
  text: 애플리케이션 성능 모니터
- link: /developers/dogstatsd/
  tag: documentation
  text: DogStatsD으로 커스텀 메트릭을 Datadog에 포워딩하기
title: VMware Tanzu용 Datadog 애플리케이션 모니터
---


## 개요

VMware Tanzu용 Datadog 애플리케이션 모니터로 VMware Tanzu 사용자는 애플리케이션의 상태와 성능을 모니터링할 수 있습니다.
이는 다음 세 가지 컴포넌트로 구성됩니다.

* DogStatsD
* 트레이스 에이전트
* Container Agent

DogStatsD를 통해 커스텀 애플리케이션 메트릭을 Datadog로 가져올 수 있습니다. DogStatsD는 StatsD 프로토콜을 구현하고, 몇 가지 Datadog 전용 확장 기능을 추가하는 메트릭 집계 서비스입니다. 자세한 내용은 [DogStatsD][5] 문서를 참조하세요. 아울러, Datadog은 애플리케이션과 호환되는 [라이브러리][9] 를 찾는 데 사용할 수 있는 DogStatsD 라이브러리의 목록을 제공해 드립니다.

트레이스 Agent는 다양한 소스에서 애플리케이션 트레이스를 수집하여 Datadog APM으로 포워딩하는 서비스입니다. 자세한 내용은 [트레이싱][7] 문서를 참조하세요.

컨테이너 Agent는 [Datadog Agent][6]의 더 작고 가벼운 버전으로, 메트릭과 로그를 Datadog으로 포워딩할 수 있습니다. 자세한 내용은 [로그][8] 설명서를 참조하세요. 이를 활성화하면 기본 동작은 `stdout` 및 `stderr`의 모든 로그를 수집하여 TCP를 통해 컨테이너 Agent로 포워딩하는 것입니다.

## 주요 기능
VMware Tanzu용 Datadog 애플리케이션 모니터에는 다음과 같은 주요 기능이 포함됩니다.

* 애플리케이션 성능 모니터
* Datadog으로 메트릭, 로그, 트레이스를 포워딩

## 사전 필수 조건
VMware Tanzu용 Datadog 애플리케이션 모니터에는 다음과 같은 필수 조건이 있습니다.

* 타일을 설정하기 전 [Datadog 계정][4]이 있거나 생성해야 합니다.
* [Datadog API 키][3]를 생성해야 합니다.

## 설치

1. [Tanzu 네트워크][10]에서 **VMware Tanzu용 Datadog 애플리케이션 모니터** 제품 파일을 다운로드합니다.
2. Tanzu Ops Manager 설치 대시보드로 이동하여 **Import a Product**를 클릭해 제품 파일을 업로드하세요.
3. **1** 단계에서 다운로드한 제품 파일을 선택합니다. 이렇게 하면 스테이지 영역에 타일이 추가됩니다.
4. 새로 추가된 **VMware Tanzu용 Datadog 애플리케이션 모니터** 타일을 클릭합니다.
5. **Save**를 클릭합니다.
6. Tanzu Ops Manager 설치 대시보드로 돌아가서 **Apply changes**를 클릭하여 VMware Tanzu용 Datadog 애플리케이션 모니터 타일을 설치합니다.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[2]: /ko/help
[3]: https://app.datadoghq.com/organization-settings/api-keys
[4]: https://app.datadoghq.com/signup
[5]: /ko/developers/dogstatsd/?tab=hostagent
[6]: /ko/agent/
[7]: /ko/tracing/
[8]: /ko/logs/
[9]: /ko/libraries/
[10]: https://network.pivotal.io/products/datadog-application-monitoring/