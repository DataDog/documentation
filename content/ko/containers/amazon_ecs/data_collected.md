---
aliases:
- /ko/agent/amazon_ecs/data_collected
further_reading:
- link: /agent/amazon_ecs/logs/
  tag: 설명서
  text: 애플리케이션 로그 수집
- link: /agent/amazon_ecs/apm/
  tag: 설명서
  text: 애플리케이션 트레이스 수집
- link: /agent/amazon_ecs/data_collected/#metrics
  tag: 설명서
  text: ECS 메트릭 수집
title: Amazon ECS 데이터 수집
---

## 수집 데이터

### 메트릭

EC2 상의 Amazon ECS는 EC2 인스턴스를 실행하는 Docker 컨테이너용 컨테이너 관리 서비스입니다. Amazon ECS용 에이전트에서 수집하는 메트릭은 다음과 같습니다.

{{< get-metrics-from-git "amazon_ecs" >}}

Docker 컨테이너에 배포된 에이전트에서 수집한 메트릭은 Docker 통합에서 수집하는 메트릭과 동일합니다. 메트릭 전체 목록은 [Docker 통합 메트릭][1]에서 확인해주세요.

AWS 통합에서 Metric Collection 탭 아래에 있는 **커스텀 메트릭 수집**을 활성화하면 `ecs.containerinsights.*` 접두사가 있는 메트릭을 수집할 수 있습니다. 

**참조**: Docker 메트릭은 `container_name`, `task_arn`, `task_family`, `task_name`, `task_version` 태그를 사용해 적절하게 태깅됩니다. 추가 구성이 필요하지 않습니다.

### 이벤트 

노이즈를 줄이기 위해 Amazon ECS 통합은 자동으로 `drain`, `error`, `fail`, `insufficient memory`, `pending`, `reboot`, `terminate` 단어를 포함하는 이벤트만 포함하도록 설정되어 있습니다. 아래에서 이벤트 예시를 확인할 수 있습니다.

{{< img src="integrations/amazon_ecs/aws_ecs_events.png" alt="Amazon ECS 이벤트" >}}

포함 목록을 삭제하고, 모든 이벤트를 Datadog Amazon ECS 통합에서 받으려면 [Datadog 지원팀][2]에 문의하세요.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.datadoghq.com/ko/agent/docker/data_collected/#metrics
[2]: https://docs.datadoghq.com/ko/help/