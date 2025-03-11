---
aliases:
- /ko/agent/amazon_ecs/logs
further_reading:
- link: /agent/amazon_ecs/apm/
  tag: 설명서
  text: 애플리케이션 트레이스 수집
- link: /agent/amazon_ecs/data_collected/#metrics
  tag: 설명서
  text: ECS 메트릭 수집
title: Amazon ECS 로그 수집
---

## 개요

Datadog 에이전트 6+은 컨테이너에서 로그를 수집합니다. ECS 컨테이너에서 로그를 수집하는 권장 방법은 에이전트의 작업 정의 내에서 로그 수집을 활성화하는 것입니다. 이전에 사용한 [작업 정의 파일][7]과 [업데이트된 작업 정의 등록][8]을 수정하여 완료할 수 있습니다. 대신 Amazon Web UI에서 직접 작업 정의를 편집할 수도 있습니다.

활성화되면 Datadog 에이전트 컨테이너는 동일한 호스트에 있는 다른 애플리케이션에서 전송된 로그를 수집합니다. `default` 또는 `json-file` 로깅 드라이버를 사용하는 경우 `stdout` 및 `stderr`에 전송된 로그로 제한됩니다.

- 컨테이너가 *자체* 컨테이너 내에서 별도의 로그 파일을 생성하는 경우 [추가 단계](#log-file-within-a-container)를 수행하여 에이전트 컨테이너가 해당 로그 파일에 대한 가시성을 갖도록 해야 합니다.
- 컨테이너가 `awslogs`[CloudWatch에 로그를 전송하기 위한 로깅 드라이버][9]를 사용한다면, 해당 로그가 에이전트에 표시되지 않을 수 있습니다. 대신,  [AWS 로그 수집 통합][10] 중 하나를 사용하여 해당 로그를 수집합니다.

## 설치

### ECS 작업 정의

실행되는 ECS 컨테이너에서 모든 트레이스를 수집하려면 아래 설정을 사용해 [원래 ECS 설정][6]에서 에이전트 작업 정의를 업데이트하세요.

{{< tabs >}}
{{% tab "리눅스(Linux)" %}}

필수 기본 설정에 대한 참조 요소로  [datadog-agent-ecs-logs.json][1]을 사용합니다. 작업 정의는 다음을 포함해야 합니다.

  ```json
  {
    "containerDefinitions": [
      {
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
          }
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
          }
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
      }
    ],
    "family": "datadog-agent-task"
  }
  ```

[1]: /resources/json/datadog-agent-ecs-logs.json
{{% /tab %}}
{{% tab "윈도우즈(Windows)" %}}

필수 기본 설정에 대한 참조 요소로 [datadog-agent-ecs-win-logs.json][1]을 사용합니다. 작업 정의는 다음을 포함해야 합니다.

  ```json
  {
    "containerDefinitions": [
      {
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
          }
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
          }
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
      }
    ],
    "family": "datadog-agent-task"
  }
  ```

[1]: /resources/json/datadog-agent-ecs-win-logs.json
{{% /tab %}}
{{< /tabs >}}

이러한 작업 정의는 에이전트가 검색하는 모든 컨테이너에서 환경 변수 `DD_LOGS_CONFIG_CONTAINER_COLLECT_ALL=true`를 설정하여 로그를 수집합니다. 이 환경 변수를 `false`로 설정하여 컨테이너에 [자동탐지 레이블](#autodiscovery-labels)이 있는 경우에만 로그를 수집하도록 합니다.

에이전트 작업 정의 로컬 파일이 있는 경우 단계를 반복하여 [업데이트된 작업 정의를 등록합니다][8]. 이로 인해 새로운 수정이 생성됩니다. 그러면 Datadog 에이전트의 데몬 서비스에서 이 업데이트된 수정을 참조할 수 있습니다.

## 커스텀 로그 수집

### 자동탐지 레이블
환경 변수 `DD_LOGS_CONFIG_CONTAINER_COLLECT_ALL=true`가 설정되면 에이전트가 기본적으로 검색된 모든 컨테이너에서 로그를 수집합니다. 이렇게 수집된 로그에는 해당 컨테이너의 간략한 이미지 이름에 대한 `service` 및 `source` 태그 세트가 있습니다. 자동 탐지를 위해 ECS 애플리케이션 컨테이너에 도커(Docker) 레이블을 제공하여 *해당* 컨테이너에 에이전트가 사용하는 로그 설정을 커스터마이즈할 수 있습니다.

자동탐지 설정을 사용하는 방법에 대한 정보는 [도커(Docker) 로그 수집 설정 지침][12]을 참조할 수 있습니다. 예를 들어 다음 로그 설정은 수집된 로그의 `source` 및 `service`를 덮어씁니다.

```json
[{"source": "example-source", "service": "example-service"}]
```

ECS와 관련해, 이를 해당 로그를 전송하는 애플리케이션 컨테이너의 작업 정의 `dockerLabels` 내에서 `com.datadoghq.ad.logs` 레이블에 추가할 수 있습니다.

```json
{
  "containerDefinitions": [
    {
      "name": "<CONTAINER_NAME>",
      "image": "<CONTAINER_IMAGE>",
      "dockerLabels": {
        "com.datadoghq.ad.logs": "[{\"source\": \"example-source\", \"service\": \"example-service\"}]"
      }
    }
  ]
}
```

또한 [로그 설정에 태그][4] 또는 [고급 로그 수집 옵션][5]에 `log_processing_rules`를 추가하여 더욱 커스터마이즈할 수 있습니다.

### 컨테이너 내부 로그 파일

도커(`default` 또는 `json-file` 드라이버 포함)는 에이전트가 찾을 수 있는 형식의 `stdout` 및 `stderr` 로그 스트림을 노출시킵니다. 하지만 컨테이너가 컨테이너 내부에 분리된 로그 파일을 생성하는 경우, 에이전트는 기본적으로 해당 파일에 대한 가시성을 갖추고 있지 않습니다. Datadog에서는 더 자동화된 로그 수집 설정을 위해 컨테이너화된 애플리케이션에 `stdout` 및 `stderr` 출력 스트림을 사용할 것을 권장합니다. 이렇게 할 수 없다면 자동탐지 로그 설정을 원하는 파일 경로까지 제공하고 에이전트 컨테이너 및 애플리케이션 컨테이너가 로그 파일을 포함하는 호스트에서 디렉터리를 공유하도록 할 수 있습니다.

아래 로그 설정은 에이전트가 `/var/log/example/app.log` 경로에서 [이 커스텀 로그 파일을 수집][3]하도록 해줍니다.
```json
[{
  "type": "file",
  "path": "/var/log/example/app.log",
  "source": "example-source",
  "service": "example-service"
}]
```

예시: 아래 작업 정의는 다음을 수행합니다.
* `/var/log/example/app.log` 파일에 일부 로그 작성
* 로그 설정을 위해 `dockerLabels` 포함
* `/var/log/example` 디렉터리에 지정된 `volumes` 및 `mountPoints` 호스트 경로 포함

```json
{
  "containerDefinitions": [
    {
      "name": "example-logger",
      "image": "busybox",
      "entryPoint": ["/bin/sh", "-c", "--"],
      "command": ["while true; do sleep 1; echo `date` example file log >> /var/log/example/app.log; done;"],
      "mountPoints": [
        {
          "containerPath": "/var/log/example",
          "sourceVolume": "applogs"
        }
      ],
      "dockerLabels": {
        "com.datadoghq.ad.logs": "[{\"type\":\"file\",\"path\":\"/var/log/example/app.log\",\"source\":\"example-source\",\"service\":\"example-service\"}]"
      }
    }
  ],
  "volumes": [
    {
      "host": {
        "sourcePath": "/var/log/example"
      },
      "name": "applogs"
    }
  ],
  "family": "example-logger"
}
```

설정의 파일 경로는 항상 에이전트와 관련되어 있습니다. 동일한 `volume` 및 `mountPoint` 역시 에이전트 작업 정의 내에 포함되어야 해당 로그 파일에 대한 가시성을 확보할 수 있습니다.

ECS를 사용한 볼륨 관리에 대한 추가 상세 정보는 [AWS Bind 마운트 설명서][6]를 참조하세요.

**참고**: 컨테이너에서 이와 같은 설정을 사용하는 경우 컨테이너 전용 파일에서 `stdout` 및 `stderr` 로그가 자동으로 수집되지 않습니다. 컨테이너 스트림과 파일 모두에서 수집이 필요한 경우 반드시 설정에서 이를 활성화하세요. 예시:

```json
[
  {
    "type": "file",
    "path": "/var/log/example/app.log",
    "source": "example-file",
    "service": "example-service"
  },
  {
    "source": "example-stream",
    "service": "example-service"
  }
]
```

## 로그 통합 활성화

`source`  속성은 각 컨테이너에 대해 사용할 통합을 식별합니다. 컨테이너 레이블에서 직접 덮어쓰기하여 [Datadog 로그 통합][2] 사용을 시작하세요. Datadog의 [로그 자동탐지 가이드][1]를 읽고 이 절차에 대해 자세히 알아보세요.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/agent/docker/log/?tab=containerinstallation#log-integrations
[2]: https://app.datadoghq.com/logs/pipelines/pipeline/library
[3]: /ko/agent/logs/?tab=tailfiles#custom-log-collection
[4]: /ko/getting_started/tagging/assigning_tags/?tab=noncontainerizedenvironments#methods-for-assigning-tags
[5]: /ko/agent/logs/advanced_log_collection?tab=docker
[6]: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/bind-mounts.html
[7]: /ko/containers/amazon_ecs/?tab=awscli#managing-the-task-definition-file
[8]: /ko/containers/amazon_ecs/?tab=awscli#registering-the-task-definition
[9]: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/using_awslogs.html
[10]: /ko/integrations/amazon_web_services/?tab=allpermissions#log-collection
[11]: /ko/containers/amazon_ecs/?tab=awscli#setup
[12]: /ko/containers/docker/log/?tab=dockerfile#log-integrations