---
categories:
- 설정 및 배포
- 컨테이너
custom_kind: 통합
dependencies: []
description: Datadog으로 도커(Docker) 메트릭 모니터링
doc_link: https://docs.datadoghq.com/integrations/docker/
draft: false
further_reading:
- link: https://www.datadoghq.com/blog/monitor-kubernetes-docker/
  tag: 블로그
  text: Datadog으로 쿠버네티스(Kubernetes) + 도커(Docker)를 모니터링하는 방법
- link: https://www.datadoghq.com/blog/docker-logging/
  tag: 블로그
  text: 도커(Docker) 로깅 모범 예시
git_integration_title: 도커(Docker)
has_logo: true
integration_id: 도커(Docker)
integration_title: 도커(Docker)
integration_version: ''
is_public: true
manifest_version: '1.0'
name: 도커(Docker)
public_title: Datadog-도커(Docker) 통합
short_description: Datadog으로 도커(Docker) 메트릭 모니터링
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## 개요

도커(Docker)는 소프트웨어 컨테이너 내부의 애플리케이션 배포를 자동화하는 오픈 소스 프로젝트입니다.

실시간으로 도커(Docker)에서 메트릭을 받아 다음을 수행할 수 있습니다.

- 컨테이너의 성능 시각화
- 컨테이너의 성능과 내부에서 실행 중인 애플리케이션의 상관 관계 파악

## 설정

컨테이너 내에서 에이전트를 실행하려면 [도커(Docker) 에이전트 문서][1]를 참조하세요.


## 수집한 데이터

메트릭, 이벤트, 서비스 점검에 대한 자세한 내용을 확인하려면 [수집한 도커(Docker) 데이터][2]를 참조하세요.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}


[1]: https://docs.datadoghq.com/ko/containers/docker/
[2]: https://docs.datadoghq.com/ko/containers/docker/data_collected/