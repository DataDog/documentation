---
further_reading:
- link: /agent/amazon_ecs/apm/
  tag: 설명서
  text: 애플리케이션 트레이스 수집
- link: /agent/amazon_ecs/data_collected/#metrics
  tag: 설명서
  text: ECS 메트릭 수집
kind: 설명서
title: Amazon ECS 로그 수집
---

## 개요

Datadog Agent 6 이상의 버전은 컨테이너에서 로그를 수집합니다. ECS 컨테이너에서 로그를 수집할 때 권장하는 방법은 `datadog-agent-ecs.json` 또는 `datadog-agent-ecs1.json` 파일로 컨테이너화 로깅을 활성화하는 것입니다. 단, 애플리케이션에서 용량과 관계없이 로그를 파일로 보내는 경우(로그가 `stdout`/`stderr`로 작성되지 않은 경우), [자동탐지][1]와 [컨테이너 라벨](#container-label) (Agent v7.25.0/6.25.0 이상에서 가능)이 필요합니다. 또는 [호스트에 Datadog Agent를 배포](#custom-log-collection)하고 파일을 테일링(tailing)해 커스텀 로그 수집을 사용할 수 있습니다.

## 설치

### ECS 파일

ECS 컨테이너에서 애플리케이션을 실행하여 생성된 로그를 전부 수집하고 Datadog 애플리케이션으로 보내는 방법은 다음과 같습니다.

{{< tabs >}}
{{< tab "리눅스(Linux)" >}}

1. [Amazon ECS 설정 가이드][1]를 따릅니다.
2. [datadog-agent-ecs.json][2] 파일을(오리지널 아마존 리눅스 AMI를 사용하는 경우에는 [datadog-agent-ecs1.json][3]) 다음 설정으로 업데이트합니다.

    ```text
    {
        "containerDefinitions": [
        (...)
          "mountPoints": [
            (...)
            {
              "containerPath": "/opt/datadog-agent/run",
              "sourceVolume": "pointdir",
              "readOnly": false
            },
            {
              "containerPath": "/var/lib/docker/containers",
              "sourceVolume": "containers_root",
              "readOnly": true
            },
            (...)
          ],
          "environment": [
            (...)
            {
              "name": "DD_LOGS_ENABLED",
              "value": "true"
            },
            {
              "name": "DD_LOGS_CONFIG_CONTAINER_COLLECT_ALL",
              "value": "true"
            },
            (...)
          ]
        }
      ],
      "volumes": [
        (...)
        {
          "host": {
            "sourcePath": "/opt/datadog-agent/run"
          },
          "name": "pointdir"
        },
        {
          "host": {
            "sourcePath": "/var/lib/docker/containers/"
          },
          "name": "containers_root"
        },
        (...)
      ],
      "family": "datadog-agent-task"
    }
    ```

3. 컨테이너 정의에 `logConfiguration.logDriver` 파라미터가 포함되지 않도록 유의하세요. 그래야 로그가 `stdout/stderr`로 작성되고 Agent에서 수집할 수 있습니다. 파라미터가 `awslogs`로 설정되었다면 [클라우드와치(CloudWatch)에서 ECS 로그를 수집하기 위한 AWS 람다(Lambda)][4]를 활용하여 Agent 없이 Amazon ECS 로그를 수집하세요.

[1]: https://docs.datadoghq.com/kr/agent/amazon_ecs/
[2]: https://docs.datadoghq.com/resources/json/datadog-agent-ecs.json
[3]: https://docs.datadoghq.com/resources/json/datadog-agent-ecs1.json
[4]: https://www.datadoghq.com/blog/monitoring-ecs-with-datadog/
{{< /tab >}}
{{< tab "윈도우즈(Windows)" >}}

1. [Amazon ECS 설정 가이드][1]를 따릅니다.
2. [datadog-agent-ecs-win.json][2] 파일을 다음의 설정으로 업데이트합니다.

    ```text
    {
      "containerDefinitions": [
        (...)
          "mountPoints": [
            (...)
            {
              "containerPath": "C:/programdata/datadog/run",
              "sourceVolume": "pointdir",
              "readOnly": false
            },
            {
              "containerPath": "c:/programdata/docker/containers",
              "sourceVolume": "containers_root",
              "readOnly": true
            },
            (...)
          ],
          "environment": [
            (...)
            {
              "name": "DD_LOGS_ENABLED",
              "value": "true"
            },
            {
              "name": "DD_LOGS_CONFIG_CONTAINER_COLLECT_ALL",
              "value": "true"
            },
            (...)
          ]
        }
      ],
      "volumes": [
        (...)
        {
          "name": "pointdir",
          "dockerVolumeConfiguration": {
            "autoprovision": true,
            "scope": "shared",
            "driver": "local"
          }
        },
        {
          "host": {
            "sourcePath": "c:/programdata/docker/containers"
          },
          "name": "containers_root"
        },
        (...)
      ]
      "family": "datadog-agent-task"
    }
    ```

3. 컨테이너 정의에 `logConfiguration.logDriver` 파라미터가 포함되지 않도록 유의하세요. 그래야 로그가 `stdout/stderr`로 작성되고 Agent에서 수집할 수 있습니다. 파라미터가 `awslogs`로 설정되었다면 [클라우드와치(CloudWatch)에서 ECS 로그를 수집하기 위한 AWS 람다(Lambda)][3]를 활용하여 Agent 없이 Amazon ECS 로그를 수집하세요.

[1]: https://docs.datadoghq.com/kr/agent/amazon_ecs/
[2]: https://docs.datadoghq.com/resources/json/datadog-agent-ecs-win.json
[3]: https://www.datadoghq.com/blog/monitoring-ecs-with-datadog/
{{< /tab >}}
{{< /tabs >}}

### 커스텀 로그 수집

#### 설정 파일

컨테이너가 파일로 로그를 생성한다면 [커스텀 로그 수집 가이드][2]를 참조해 로그용 파일을 테일링(tailing)하세요.

`<PATH_LOG_FILE>/<LOG_FILE_NAME>.log`에 저장된 `<APP_NAME>` 애플리케이션에서 로그를 수집하려면 [Agent 설정 디렉터리][3] 루트에 다음과 같은 내용으로 `<APP_NAME>.d/conf.yaml` 파일을 생성하세요.

```yaml
logs:
  - type: file
    path: "<PATH_LOG_FILE>/<LOG_FILE_NAME>.log"
    service: "<APP_NAME>"
    source: "<SOURCE>"
```

**참조**: 컨테이너 메타데이터는 커스텀 로그 수집으로 가져올 수 없으므로, Agent가 자동으로 컨테이너 태그를 로그에 할당하지 않습니다. 컨테이너 태그를 생성하려면 [커스텀 태그][4]를 사용하세요.

#### 컨테이너 라벨

Agent v7.25.0/6.25.0 이상의 버전에서는 컨테이너 라벨로 파일을 테일링(tailing)하여, 라벨이 설정된 컨테이너 태그를 수집된 로그에 할당할 수 있습니다. 정확하게 어떤 라벨을 사용해야 하는지 상세히 설명해드리는 [예시][5]를 참조하세요.

**참조**: 파일 경로는 항상 Agent와 관련이 있습니다. 따라서 연관된 ECS 작업에 추가로 설정을 적용해야 파일을 생성하는 컨테이너와 Agent 컨테이너 사이에서 디렉터리를 공유할 수 있습니다. ECS의 볼륨 관리를 자세히 알아보려면 [AWS Bind 마운트 설명서][6]를 참조하시기 바랍니다.

## 로그 통합 활성화

`source` 속성은 각 컨테이너의 통합을 식별하는 데 사용됩니다. 컨테이너 라벨에서 바로 덮어쓰면 [로그 통합][2]을 사용할 수 있습니다. Datadog의 [로그용 자동탐지 가이드][1]를 참조해 이 프로세스를 더 자세히 알아보세요.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /kr/agent/docker/log/?tab=containerinstallation#log-integrations
[2]: /kr/agent/logs/?tab=tailfiles#custom-log-collection
[3]: /kr/agent/logs/#custom-log-collection
[4]: /kr/getting_started/tagging/assigning_tags/?tab=noncontainerizedenvironments#methods-for-assigning-tags
[5]: /kr/agent/docker/log/?tab=logcollectionfromfile#examples
[6]: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/bind-mounts.html