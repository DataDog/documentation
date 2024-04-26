---
further_reading:
- link: /integrations/ecs_fargate/
  tag: 설명서
  text: ECS Fargate
- link: https://www.datadoghq.com/blog/monitor-aws-fargate/
  tag: 블로그
  text: Datadog으로 AWS Fargate 애플리케이션 모니터링
- link: /agent/docker/integrations/
  tag: 설명서
  text: 자동탐지
kind: faq
title: ECS Fargate 통합 설정
---

[Docker Label Annotations][2]를 사용하여 [ECS Fargate][1]에 대한 통합을 설정합니다.

## 통합 추가하기

ECS Fargate에서 이미 [Container Agent를 설정][3]한 경우 다음 단계에 따라 기존 클러스터에 통합을 추가하세요.

### 작업 정의 업데이트하기

1. [AWS 웹 콘솔][4]에 로그인하고 ECS 섹션으로 이동합니다.
2. Datadog Agent가 실행 중인 클러스터를 선택합니다.
3. **Tasks** 탭을 클릭한 다음 Datadog Agent Container가 포함된 **Task definition** 이름을 클릭합니다.
4. **Create new revision** 버튼을 클릭한 다음 **Add container** 버튼을 클릭합니다.
5. **Container name**, **Image** 및 추가 기본 설정을 입력합니다.
6. **Docker labels** 아래에 다음을 추가합니다.

| 키                           | 값                                           |
|-------------------------------|-------------------------------------------------|
| com.datadoghq.ad.instances    | `[{"host": "%%host%%", "port": <PORT_NUMBER>}]` |
| com.datadoghq.ad.check_names  | `["<CHECK_NAME>"]`                              |
| com.datadoghq.ad.init_configs | `[{}]`                                          |

7. **Add** 버튼을 클릭한 다음 **Create**  버튼을 클릭합니다.

### 서비스 업데이트하기

1. 클러스터 내에서 **Services** 탭을 클릭한 다음 **Service Name**을 클릭합니다.
2. **Update** 버튼을 클릭합니다.
3. **Task Definition**의 경우 드롭다운 메뉴에서 최신  **Revision**을 선택합니다.
4. **Next step** 버튼을 세 번 클릭한 후 **Update Service** 버튼을 클릭합니다.

### 확인

업데이트된  **Task**에 **RUNNING** 상태가 표시되면 다음 페이지를 사용하여 정보가 Datadog에 보고되는지 확인합니다.

- 컨테이너를 확인하려면 [Live Containers][5]
- 통합 메트릭을 확인하려면 [Metrics Explorer][6]

## 예시

{{< tabs >}}
{{% tab "Redis - Web UI" %}}
[AWS 웹 콘솔][1]을 통해 Redis 컨테이너에 대한 Docker 레이블을 입력하려면 다음 표를 사용하세요.

| 키                           | 값                                  |
|-------------------------------|----------------------------------------|
| com.datadoghq.ad.instances    | `[{"host": "%%host%%", "port": 6379}]` |
| com.datadoghq.ad.check_names  | `["redisdb"]`                          |
| com.datadoghq.ad.init_configs | `[{}]`                                 |

[1]: https://aws.amazon.com/console
{{% /tab %}}
{{% tab "Redis - AWS CLI" %}}
[AWS CLI 도구][1]를 통해 Redis 컨테이너를 생성하려면 `containerDefinitions` 아래의 다음 JSON을 사용하세요.

```json
{
  "name": "redis",
  "image": "redis:latest",
  "essential": true,
  "dockerLabels": {
    "com.datadoghq.ad.instances": "[{\"host\": \"%%host%%\", \"port\": 6379}]",
    "com.datadoghq.ad.check_names": "[\"redisdb\"]",
    "com.datadoghq.ad.init_configs": "[{}]"
  }
}
```

[1]: https://aws.amazon.com/cli
{{% /tab %}}
{{< /tabs >}}

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/integrations/ecs_fargate/
[2]: /ko/agent/docker/integrations/?tab=dockerlabel#configuration
[3]: /ko/integrations/ecs_fargate/#container-agent-setup
[4]: https://aws.amazon.com/console
[5]: https://app.datadoghq.com/containers
[6]: https://app.datadoghq.com/metric/explorer