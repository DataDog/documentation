---
aliases:
- /ko/integrations/awsbeanstalk/
- /ko/developers/faq/i-want-my-application-deployed-in-a-container-through-elasticbeanstalk-to-talk-to-dogstatsd/
categories:
- aws
- cloud
- configuration & deployment
- log collection
- network
- provisioning
dependencies: []
description: 핵심 AWS Elastic Beanstalk 메트릭을 추적하세요.
doc_link: https://docs.datadoghq.com/integrations/amazon_elasticbeanstalk/
draft: false
further_reading:
- link: https://www.datadoghq.com/blog/deploy-datadog-aws-elastic-beanstalk
  tag: 블로그
  text: AWS Elastic Beanstalk에 Datadog 배포
git_integration_title: amazon_elasticbeanstalk
has_logo: true
integration_id: ''
integration_title: AWS Elastic Beanstalk
integration_version: ''
is_public: true
custom_kind: integration
manifest_version: '1.0'
name: amazon_elasticbeanstalk
public_title: Datadog-AWS Elastic Beanstalk 통합
short_description: 핵심 AWS Elastic Beanstalk 메트릭을 추적하세요.
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## 개요

AWS Elastic Beanstalk은 Apache, Nginx, Passenger 및 IIS 등 자주 사용되는 서버에서 자바(Java), .NET, PHP, Node.js, 파이썬(Python), 루비(Ruby), 고(Go) 및 도커(Docker)로 개발된  웹 애플리케이션과 서비스를 간단하게 배포하고 확장할 수 있도록 해주는 서비스로, 손쉽게 이용할 수 있습니다.

## 설정

### 설치

이미 하지 않았다면 먼저 [Amazon Web Services 통합][1]을 설정하세요. Elastic Beanstalk 메트릭을 수신하려면 환경에서 [Enhanced Health Reporting 기능을 활성화]해야 합니다. 또한 환경이 [클라우드와치(CloudWatch)에 향상된 상태 메트릭을 게시]하도록 설정해야 합니다.

**참고**: 이러한 설정은 클라우드와치(CloudWatch) 커스텀 메트릭 요금을 상승시킬 수 있습니다.

## 수집한 데이터

### 메트릭
{{< get-metrics-from-git "amazon_elasticbeanstalk" >}}


AWS에서 검색된 각 메트릭에는 호스트 이름, 보안 그룹 등을 포함하되 이에 국한되지 않고 AWS 콘솔에 표시되는 동일한 태그가 할당됩니다.

### 이벤트

AWS Elastic Beanstalk 통합은 이벤트를 포함하지 않습니다.

### 서비스 검사

AWS Elastic Beanstalk 통합은 서비스 점검을 포함하지 않습니다.

## Datadog 에이전트 설정

다음 단계에서 Elastic Beanstalk VM에 Datadog 에이전트를 배포합니다. 그러므로 AWS 통합에서 수집한 메트릭과 함께 호스트 메트릭을 보고하게 됩니다. 자세한 정보는 [클라우드 인스턴스에서 Datadog 에이전트를 설치해야 하는 이유]를 읽어보세요.

설치 방법을 선택해 Elastic Beanstalk 환경에서 에이전트를 설정합니다.

{{< tabs >}}

{{% tab "No containers (Linux)" %}}

컨테이너 설정이 없는 경우 [설정 파일을 통한 Advanced Environment Customization][1]을 사용하여 Elastic Beanstalk에서 Datadog 에이전트를 설치합니다. (.ebextensions):

1. [애플리케이션 소스 번들][2]의 루트에 `.ebextensions`란 이름의 폴더를 생성합니다.
2. [99datadog.config][3]를 다운로드한 다음 `.ebextensions` 폴더에 넣습니다.
3. [Datadog API 키][4]를 사용해 `/etc/datadog-agent/datadog.yaml` 파일 템플릿 내에서 `api_key` 값을 변경합니다.
4. Datadog 지역(예: {{< region-param key="dd_site" code="true" >}})에 대해 `/etc/datadog-agent/datadog.yaml`에서 `site` 값을 변경하여 에이전트다 올바른 Datadog 위치에 데이터를 보내도록 합니다.
5. `option_settings` 아래 `DD_AGENT_VERSION`를 설정하고 특정 에이전트 버전을 고정하여 모든 호스트에 동일한 버전의 에이전트가 실행되도록 합니다.
6. [Elastic Beanstalk Console][5], [EB CLI][6] 또는 [AWS CLI][7]를 사용해 애플리케이션을 배포합니다.

`/etc/datadog-agent/datadog.yaml`에 부수적으로 에이전트 설정을 추가할 수 있습니다.

예를 들어, Live 프로세스 모니터링을 활성화라려면,

```text
process_config:
  enabled: "true"
```

#### 트레이스 수집

애플리케이션이 컨테이너화되지 않았고 Datadog 에이전트가 `99datadog.config`로 설정된 경우, 애플리케이션이 [트레이싱 라이브러리 설정][8]으로 계측되었다면 추가 설정 없이 트레이싱이 활성화된 것입니다. 



[1]: https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/ebextensions.html
[2]: https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/applications-sourcebundle.html
[3]: https://docs.datadoghq.com/ko/config/99datadog.config
[4]: https://app.datadoghq.com/organization-settings/api-keys
[5]: https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/environment-configuration-methods-during.html#configuration-options-during-console-ebextensions
[6]: https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/environment-configuration-methods-during.html#configuration-options-during-ebcli
[7]: https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/environment-configuration-methods-during.html#configuration-options-during-awscli
[8]: https://docs.datadoghq.com/ko/tracing/setup/
{{% /tab %}}

{{% tab "No containers (Windows)" %}}

컨테이너 설정이 없는 경우 [설정 파일을 통한 Advanced Environment Customization][1]을 사용하여 Elastic Beanstalk에서 Datadog 에이전트를 설치합니다. (.ebextensions):

1. [애플리케이션 소스 번들][2]의 루트에 `.ebextensions`란 이름의 폴더를 생성합니다.
2. [99datadog-windows.config][3]를 다운로드한 다음 `.ebextensions` 폴더로 이동시킵니다.
3. `99datadog-windows.config`에서 `APIKEY` 값을 [Datadog API 키][4]로 대체합니다.
4. (선택 항목) `99datadog-windows.config` 파일이 .NET APM 트레이싱 라이브러리에 추가되어 트레이스를 생성합니다. 환경에서 APM을 활성화하지 않으려면, `packages` 섹션, `02_setup-APM1` 섹션, `03_setup-APM2` 섹션을 제거합니다.
5. (선택 항목) 환경 변수를 추가하려면 `99datadog-windows.config`의 `00_setup-env1` 섹션에서 설정합니다. 환경 변수를 설정하지 않으려면 이 섹션을 제거할 수 있습니다.
6. [Elastic Beanstalk Console][5], [EB CLI][6] 또는 [AWS CLI][7]를 사용해 애플리케이션을 배포합니다.

#### 트레이스 수집

애플리케이션이 컨테이너화되지 않았고 Datadog 에이전트가 `99datadog-windows.config`로 설정되지 않은 경우 트레이싱은 추가 설정 없이 활성화됩니다. 트레이싱 계측에 대한 자세한 정보는 [Datadog APM 설정][8]을 참조하세요.



[1]: https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/ebextensions.html
[2]: https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/applications-sourcebundle.html
[3]: https://docs.datadoghq.com/ko/config/99datadog-windows.config
[4]: https://app.datadoghq.com/organization-settings/api-keys
[5]: https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/environment-configuration-methods-during.html#configuration-options-during-console-ebextensions
[6]: https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/environment-configuration-methods-during.html#configuration-options-during-ebcli
[7]: https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/environment-configuration-methods-during.html#configuration-options-during-awscli
[8]: https://docs.datadoghq.com/ko/tracing/setup/
{{% /tab %}}

{{% tab "Single container" %}}

단일 도커(Docker) 컨테이너 설정의 경우 [설정 파일을 사용한 Advanced Environment Customization][1]을 통해 Elastic Beanstalk에서 Datadog 에이전트를 설치합니다.

**참고**: 이 설정을 위해서는 소스 코드의 일부인 API 키가 .ebextensions 디렉터리에 있어야 합니다. [AWS Secret Manager][2] 또는 기타 기밀 관리 도구를 사용해 API 키를 보호하세요.

1. [애플리케이션 소스 번들][3]의 루트에서 `.ebextensions`란 이름의 폴더를 생성하세요.
2. [99datadog.config][4]를 다운로드하고 `.ebextensions` 폴더에 넣습니다.
3. [Datadog API 키][5]를 사용해 `/etc/datadog-agent/datadog.yaml` 파일 템플릿 내에 `api_key` 값을 변경합니다.
4. Datadog 지역(예: {{< region-param key="dd_site" code="true" >}})에 대해 `/etc/datadog-agent/datadog.yaml`에서 `site` 값을 변경하여 에이전트다 올바른 Datadog 위치에 데이터를 보내도록 합니다.
5. `option_settings` 아래 `DD_AGENT_VERSION`를 설정하고 특정 에이전트 버전을 고정하여 모든 호스트에 동일한 버전의 에이전트가 실행되도록 합니다.
6. [Elastic Beanstalk Console][6], [EB CLI][7] 또는 [AWS CLI][8]를 사용해 애플리케이션을 배포합니다.

`/etc/datadog-agent/datadog.yaml`에 부수적으로 에이전트 설정을 추가할 수 있습니다.

예를 들어, Live 프로세스 모니터링을 활성화라려면,

```text
process_config:
  enabled: "true"
```

#### 트레이스 수집

단일 도커 컨테이너의 트레이싱을 활성화하려면,

1. `apm_non_local_traffic`을 사용해 `99datadog.config` 파일에서 `/etc/datadog-agent/datadog.yaml` 섹션을 업데이트합니다. 형식은 다음과 같습니다.

    ```
    apm_config:
      enabled: "true"
      apm_non_local_traffic: "true"
    ```

2. 트레이싱 라이브러리를 설정하여 [브리지 네트워크의 게이트웨이 IP][9]에 트레이스를 전달합니다. 애플리케이션 컨테이너 내부에서 게이트웨이 IP 기본값은 `172.17.0.1`입니다. (이 값이 게이트웨이 IP인지 명확하지 않다면 `docker inspect <container id>`를 실행해 확인하세요.)

모든 언어에 대해 게이트웨이 IP에 대한 환경 변수를 `DD_AGENT_HOST`로 설정합니다. 대신 프로그래밍 방식으로 다음을 사용해 아래 언어에 대한 호스트 이름을 설정할 수 있습니다.

##### Python

```python
from ddtrace import tracer

tracer.configure(hostname="172.17.0.1")
```

##### Node.js

```javascript
const tracer = require('dd-trace');

tracer.init({ hostname: "172.17.0.1" });
```

##### Ruby

```ruby
require 'ddtrace'

Datadog.configure do |c|
  c.tracer hostname: "172.17.0.1")
end
```

##### Go

```go
package main

import (
    "gopkg.in/DataDog/dd-trace-go.v1/ddtrace/tracer"
)

func main() {
  tracer.Start(tracer.WithAgentAddr("172.17.0.1"))
  defer tracer.Stop()

  // ...
}
```



[1]: https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/ebextensions.html
[2]: https://aws.amazon.com/secrets-manager/
[3]: https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/applications-sourcebundle.html
[4]: https://docs.datadoghq.com/ko/config/99datadog.config
[5]: https://app.datadoghq.com/organization-settings/api-keys
[6]: https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/environment-configuration-methods-during.html#configuration-options-during-console-ebextensions
[7]: https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/environment-configuration-methods-during.html#configuration-options-during-ebcli
[8]: https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/environment-configuration-methods-during.html#configuration-options-during-awscli
[9]: https://docs.docker.com/network/network-tutorial-standalone/
{{% /tab %}}

{{% tab "Multiple containers" %}}

다수의 도커 컨테이너에 대해 컨테이너화된 Datadog 에이전트와 `Dockerrun.aws.json`란 이름의 파일을 사용해 도커를 모니터링할 수 있습니다.

`Dockerrun.aws.json` 파일은 Elastic Beanstalk입니다. 즉, 특정 JSON 파일로 Elastic Beanstalk 애플리케이션으로 도커(Docker) 컨테이너 세트를 배포하는 방법을 설명합니다. 이 파일을 멀티컨테이너 도커 환경에 사용할 수 있습니다. `Dockerrun.aws.json`은 환경 내 각 컨테이너 인스턴스에 컨테이너를 배포하는 방법을 설명합니다. 또한 마운트할 컨테이너에 대한 호스트 인스턴스에서 데이터 볼륨을 생성하는 방법을 설명합니다. 

`Dockerrun.aws.json` 파일은 단일 아카이브에서 추가적인 소스 코드를 사용해 압축하거나 자체적으로 사용할 수 있습니다. `Dockerrun.aws.json`로 아카이브된 소스 코드는 컨테이너 인스턴스로 배포되며 `/var/app/current/` 디렉터리에서 액세스할 수 있습니다. 설정의 `volumes` 섹션을 사용해 인스턴스에서 실행되는 컨테이너의 마운트 지점을 제공합니다. 또한 내장 컨테이너 정의의 `mountPoints` 섹션을 활용해 컨테이너에 대해 마운트합니다.

다음 코드 샘플은 Datadog 에이전트를 정의하는 `Dockerrun.aws.json`을 설명합니다.  [Datadog API 키][1], 태그(옵션), 또는 부수적인 컨테니어 정의를 사용해 `containerDefinitions` 섹션을 업데이트합니다. 필요한 경우 이 파일은 위에 설명된 대로 추가적인 콘텐츠와 함께 압축될 수 있습니다. 이 파일의 구문에 대한 자세한 정보는 [멀티컨테이너 도커 설정][2]을 참조하세요.

**참고**:

- 리소스 사용량이 높은 경우, 더 높은 메모리 한도가 필요할 수 있습니다.
- 모든 호스트에서 동일한 에이전트 버전이 실행되도록 하려면 `agent:7`를 특정 [도커 이미지][3] 부 버전으로 변경하는 것이 좋습니다.
{{< site-region region="us3,eu,gov" >}}
- `DD_SITE`를 {{< region-param key="dd_site" code="true" >}}로 설정해 에이전트가 올바른 Datadog 위치에 데이터를 전송하도록 합니다.
{{< /site-region >}}

```json
{
    "AWSEBDockerrunVersion": 2,
    "volumes": [
        {
            "name": "docker_sock",
            "host": {
                "sourcePath": "/var/run/docker.sock"
            }
        },
        {
            "name": "proc",
            "host": {
                "sourcePath": "/proc/"
            }
        },
        {
            "name": "cgroup",
            "host": {
                "sourcePath": "/cgroup/"
            }
        }
    ],
    "containerDefinitions": [
        {
            "name": "dd-agent",
            "image": "gcr.io/datadoghq/agent:7",
            "environment": [
                {
                    "name": "DD_API_KEY",
                    "value": "<YOUR_DD_API_KEY>"
                },
                {
                    "name": "DD_SITE",
                    "value": "<YOUR_DD_SITE>"
                },
                {
                    "name": "DD_TAGS",
                    "value": "<SIMPLE_TAG>, <KEY:VALUE_TAG>"
                }
            ],
            "memory": 256,
            "mountPoints": [
                {
                    "sourceVolume": "docker_sock",
                    "containerPath": "/var/run/docker.sock",
                    "readOnly": false
                },
                {
                    "sourceVolume": "proc",
                    "containerPath": "/host/proc",
                    "readOnly": true
                },
                {
                    "sourceVolume": "cgroup",
                    "containerPath": "/host/sys/fs/cgroup",
                    "readOnly": true
                }
            ]
        }
    ]
}
```

#### 환경 생성

컨테이너 정의가 준비되면 Elastic Beanstalk로 전달합니다. 구체적인 지침은 AWS Elastic Beanstalk 설명서의 [멀티컨테이너 도커 환경][4]을 참조하세요.

#### DogStatsD

[멀티컨테이너 도커 환경][4]에서 DogStatsD를 사용해 애플리케이션 컨테이너에서 커스텀 메트릭을 수집하려면, `Dockerrun.aws.json`에 다음을 추가합니다.

1. `dd-agent` 컨테이너 아래에 `DD_DOGSTATSD_NON_LOCAL_TRAFFIC` 환경 변수 추가:

    ```json
    {
      "name": "DD_DOGSTATSD_NON_LOCAL_TRAFFIC",
      "value": "true"
    }
    ```

2. 애플리케이션 컨테이너 아래 `dd-agent` 컨테이너에 대한 링크 추가:

    ```text
    "links": [ "dd-agent:dd-agent"]
    ```

추가 정보는 [DogStatsD 및 Docker][5]를 참조하세요.



[1]: https://app.datadoghq.com/organization-settings/api-keys
[2]: https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/create_deploy_docker_v2config.html
[3]: https://gcr.io/datadoghq/agent
[4]: https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/create_deploy_docker_ecstutorial.html
[5]: https://docs.datadoghq.com/ko/integrations/faq/dogstatsd-and-docker/
{{% /tab %}}

{{< /tabs >}}

#### 다수의 도커 컨테이너

1. 애플리케이션과 동일한 `Dockerrun.aws.json`에서 `datadog/agent` 이미지를 사용해 Datadog 에이전트 컨테이너를 추가합니다. 다음을 추가합니다.
    - `portMappings` 섹션에서 `containerPort` 8126을 사용해 `hostPort` 8126을 추가합니다. 
    - `environment` 섹션에서 `DD_APM_ENABLED` 및 `DD_APM_NON_LOCAL_TRAFFIC`을 `true`로 설정합니다.
2. [트레이싱 라이브러리 설정][14]으로 계측된 애플리케이션 컨테이너 아래에서 다음을 추가합니다.
    - `environment` 섹션 아래에서 `DD_AGENT_HOST`로 불리는 환경 변수를 Datadog 에이전트 컨테이너 이름에 추가합니다.
    - `links` 섹션에서 에이전트 컨테이너가 환경 변수로 사용되도록 설정합니다.

예는 아래와 같습니다.

```text
 "containerDefinitions": [    {
      "name": "dd-agent",
      "image": "datadog/agent:latest",
      "environment": [
          {
              "name": "DD_API_KEY",
              "value": "<api key>"
          },
          {
              "name": "DD_APM_ENABLED",
              "value": "true"
          },
          {
             "name": "DD_APM_NON_LOCAL_TRAFFIC",
             "value": "true"
          },
         # any other environment variables needed
      ],
      "portMappings": [
        {
          "hostPort": 8126,
          "containerPort": 8126
        }
      ],
      "memory": 256,
      "mountPoints": [
          # any mountpoints needed
         }
      ]
    },
    {
      "name": "application-container",
      "image": "<application image name>",
      "environment": [
        {
          "name": "DD_AGENT_HOST",
          "value": "dd-agent",
          # any other environment variables needed
        }
      ],
      "links": [
        "dd-agent:dd-agent"
      ],

```

## 트러블슈팅

도움이 필요하신가요? [Datadog 지원팀][5]에 문의하세요.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}


[1]: https://docs.datadoghq.com/ko/integrations/amazon_web_services/
[2]: https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/health-enhanced.html
[3]: https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/health-enhanced-cloudwatch.html#health-enhanced-cloudwatch-console
[4]: https://docs.datadoghq.com/ko/agent/guide/why-should-i-install-the-agent-on-my-cloud-instances/
[5]: https://docs.datadoghq.com/ko/help/