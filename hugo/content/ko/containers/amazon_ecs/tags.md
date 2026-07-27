---
aliases:
- /ko/agent/amazon_ecs/tags
further_reading:
- link: /getting_started/tagging/
  tag: 설명서
  text: 태그 시작하기
- link: /getting_started/tagging/using_tags/
  tag: 설명서
  text: Datadog에서 태그 활용하기
- link: /agent/guide/autodiscovery-management/
  tag: 설명서
  text: 데이터 수집을 컨테이너의 하위 집합으로만 제한
title: Amazon ECS 태그 추출
---

## 개요

Datadog 에이전트는 라벨 또는 환경 변수를 기반으로 컨테이너에서 내보낸 모든 메트릭, 트레이스 및 로그에 태그를 생성하고 할당할 수 있습니다.

## 즉시 사용 가능한 태그

Agent는 태그를 자동 검색하고 전체 작업 또는 이 작업 내의 개별 컨테이너에서 전송되는 데이터에 태그를 첨부할 수 있습니다. 태그 목록은 Agent [카디널리티 설정][1]에 따라 자동으로 첨부됩니다.

<div style="overflow-x: auto;">

  | 태그                           | 카디널리티  | 소스               |
  |-------------------------------|--------------|----------------------|
  | `container_name`              | High         | Docker               |
  | `container_id`                | High         | Docker               |
  | `docker_image`                | Low          | Docker               |
  | `image_name`                  | Low          | Docker               |
  | `short_image`                 | Low          | Docker               |
  | `image_tag`                   | Low          | Docker               |
  | `ecs_cluster_name`            | Low          | ECS API              |
  | `ecs_container_name`          | Low          | ECS API              |
  | `task_arn`                    | Orchestrator | ECS API              |
  | `task_family`                 | Low          | ECS API              |
  | `task_name`                   | Low          | ECS API              |
  | `task_version`                | Low          | ECS API              |

</div>

## 통합 서비스 태깅

Datadog는 컨테이너화된 환경의 모범 사례로 태그 할당 시 통합 서비스 태깅을 사용할 것을 권장합니다. 세 가지 표준 태그( `env`, `service`, `version`)을 사용하여 통합 태깅 서비스를 Datadog 텔레메트리를 함께 사용하세요. 통합 태깅으로 환경을 설정하는 방법에 관한 자세한 정보는 [Amazon ECS 통합 서비스 태깅 설명서][2]를 참조하세요.

## 리소스 태그 수집

통합 서비스 태깅을 활성화하지 않은 경우 다음 단계를 완료하여 ECS 리소스 태그를 수집합니다.

1. [Amazon ECS 컨테이너 인스턴스][3]가 IAM 역할과 연결되어 있는지 확인합니다. 이는 ECS 클러스터 생성 마법사를 사용하여 클러스터를 새로 생성 때 또는 자동 확장 그룹에서 사용하는 설정일 때 실행할 수 있습니다.
2. `ecs:ListTagsForResource`를 사용해 [Amazon ECS 컨테이너 인스턴스][3]에서 사용하는 IAM 역할을 업데이트합니다.
3. 다음 환경 변수를 추가하여 리소스 태그 수집을 활성화하도록 [datadog-agent-ecs.json][4](원본 Amazon Linux AMI를 사용하는 경우 [datadog-agent-ecs1.json][5]) 파일을 업데이트하세요.

    {{< code-block lang="json" >}}
    {
      "name": "DD_ECS_COLLECT_RESOURCE_TAGS_EC2",
      "value": "true"
    }
    {{< /code-block >}}

### 참고

- IAM 역할이 Datadog Agent 컨테이너의 작업 역할이 아닌 [Amazon ECS 컨테이너 인스턴스][3]와 연결되어 있는지 확인합니다.
- ECS 리소스 태그는 EC2 인스턴스에서 수집할 수 있지만 AWS Fargate에서는 수집할 수 없습니다.
- 이 기능을 사용하려면 Datadog Agent v6.17 이상 또는 v7.17 이상이 필요합니다.
- Agent는 `tasks`, `services`, `container instances` ECS 리소스에서 ECS 태그 수집을 지원합니다.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/getting_started/tagging/assigning_tags/?tab=containerizedenvironments#environment-variables
[2]: /ko/getting_started/tagging/unified_service_tagging/?tab=ecs#containerized-environment
[3]: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/ECS_instances.html
[4]: https://docs.datadoghq.com/resources/json/datadog-agent-ecs.json
[5]: https://docs.datadoghq.com/resources/json/datadog-agent-ecs1.json