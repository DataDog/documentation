---
aliases:
- /ko/integrations/kubernetes_state
- /ko/integrations/kube_proxy
- /ko/integrations/Kubernetes
categories:
- cloud
- configuration & deployment
- containers
- orchestration
- log collection
dependencies:
- https://github.com/DataDog/documentation/blob/master/content/en/integrations/kubernetes.md
description: 쿠버네티스 클러스터와 실행 중인 애플리케이션의 상태를 모니터링하세요. 파드 일정 이벤트 캡처 및 Kubelets 상태를 추적
  등 다양한 작업을 할 수 있습니다.
doc_link: /integrations/kubernetes/
further_reading:
- link: https://www.datadoghq.com/blog/debug-kubernetes-pending-pods/
  tag: 블로그
  text: 쿠버네티스 보류 파드와 일정 실패를 디버깅하는 방법
- link: https://www.datadoghq.com/blog/monitoring-kubernetes-era
  tag: 블로그
  text: 쿠버네티스 시대에 모니터링하는 방법
- link: https://www.datadoghq.com/blog/monitor-kubernetes-events/
  tag: 블로그
  text: 쿠버네티스 이벤트 트러블슈팅
git_integration_title: 쿠버네티스(Kubernetes)
integration_id: kubernetes
integration_title: 쿠버네티스(Kubernetes)
is_public: true
kind: 통합
name: 쿠버네티스(Kubernetes)
newhlevel: true
public_title: Datadog-쿠버네티스 통합
short_description: 파드 일정 이벤트 캡처 및 Kubelets 상태 추적 등 다양한 작업 가능
updated_for_agent: 6.0
---

{{< img src="integrations/kubernetes/k8sdashboard.png" alt="쿠버네티스 대시보드"  >}}

## 개요

쿠버네티스에서 실시간으로 메트릭과 로그를 얻으면 다음을 할 수 있습니다.

- 쿠버네티스 상태 가시화 및 모니터링
- 쿠버네티스 실패 복구(failover) 및 이벤트 알림 확인

## 설정

Datadog에서는 쿠버네티스 환경에서 에이전트를 실행할 경우 클러스터 내에서 컨테이너로 실행할 것을 권고합니다.

[**쿠버네티스 클러스터에서 에이전트를 배포하려면 쿠버네티스 전용 설명서를 참고하세요][1]**.

**참고**: [호스트에서 Datadog 에이전트를 실행][2]하고 쿠버네티스 메트릭을 수집할 수도 있습니다.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/agent/kubernetes/
[2]: /ko/integrations/faq/kubernetes-host-installation/