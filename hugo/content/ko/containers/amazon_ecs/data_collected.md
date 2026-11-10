---
aliases:
- /ko/agent/amazon_ecs/data_collected
description: Amazon ECS에서 Datadog Agent가 수집하는 메트릭, 로그 및 이벤트에 대한 참조 가이드
further_reading:
- link: /agent/amazon_ecs/logs/
  tag: 문서
  text: 애플리케이션 로그 수집하기
- link: /agent/amazon_ecs/apm/
  tag: 문서
  text: 애플리케이션 트레이스 수집하기
- link: /agent/amazon_ecs/data_collected/#metrics
  tag: 문서
  text: ECS 메트릭 수집하기
title: Amazon ECS 데이터 수집
---
## 수집되는 데이터 {#data-collected}

### 메트릭 {#metrics}

Amazon ECS on EC2는 EC2 인스턴스에서 실행되는 Docker 컨테이너용 컨테이너 관리 서비스입니다.

다음 표는 Amazon ECS를 위해 Agent 또는 API 크롤러가 수집하는 메트릭을 나열합니다.

{{< get-metrics-from-git "amazon-ecs" >}}

Docker 컨테이너에 배포된 Agent가 수집하는 메트릭에는 Docker 통합이 수집하는 메트릭도 포함됩니다. 전체 메트릭 목록은 [Docker 통합 메트릭][1]을 참조하세요.

AWS Integration의 Metric Collection 탭에서 **collect custom metrics**를 활성화하면 `ecs.containerinsights.*` 접두사가 붙은 메트릭을 수집할 수 있습니다.

**참고**: Docker 메트릭에는 `container_name`, `task_arn`, `task_family`, `task_name`, `task_version` 태그가 지정됩니다. 추가 구성은 필요하지 않습니다.

### 이벤트 {#events}

Amazon ECS 통합은 클러스터 및 서비스에서 내보내는 이벤트를 수집하며, 일반적으로 다음과 같이 표시됩니다.

{{< img src="integrations/amazon_ecs/aws_ecs_events.png" alt="Amazon ECS 이벤트" >}}

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.datadoghq.com/ko/agent/docker/data_collected/#metrics