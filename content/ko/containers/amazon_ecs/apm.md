---
aliases:
- /ko/agent/amazon_ecs/apm
further_reading:
- link: /agent/amazon_ecs/logs/
  tag: 설명서
  text: 애플리케이션 로그 수집
- link: /agent/amazon_ecs/tags/
  tag: 설명서
  text: 컨테이너에서 내보내는 모든 데이터에 태그 할당
title: ECS 애플리케이션 추적
---

## 개요

ECS 컨테이너에서 트레이스를 수집하려면 아래 설명된 대로 에이전트와 애플리케이션 컨테이너 모두에 대한 작업 정의를 업데이트하세요.

옵션 중 하나는 이전에 사용한 [작업 정의 파일][4]과 [업데이트된 작업 정의 등록][5]을 수정하는 것입니다. 대신 Amazon Web UI에서 직접 작업 정의를 편집할 수 있습니다.

활성화되면 Datadog 에이전트 컨테이너가 동일한 호스트에 있는 다른 애플리케이션 컨테이너에서 전송된 트레이스를 수집합니다.

## 트레이스를 허용하도록 Datadog 에이전트 설정
1. 실행되는 ECS 컨테이너에서 모든 트레이스를 수집하려면 아래 설정을 사용해 [원래 ECS 설정][6]에서 에이전트 작업 정의를 업데이트하세요.

   필수 기본 설정에 대한 참조 요소로  [datadog-agent-ecs-apm.json][3]을 사용합니다. Datadog 에이전트 컨테이너에 대한 작업 정의에서 `tcp` 프로토콜을 사용해 `8126`에 있는 호스트-컨테이너 포트를 설정합니다.

    ```json
    {
      "containerDefinitions": [
        {
          "name": "datadog-agent",
          "image": "public.ecr.aws/datadog/agent:latest",
          "cpu": 100,
          "memory": 256,
          "essential": true,
          "portMappings": [
            {
              "hostPort": 8126,
              "protocol": "tcp",
              "containerPort": 8126
            }
          ],
          (...)
        }
      ]
    }
    ```

2. **에이전트 v7.17 이하**의 경우 다음 환경 변수를 추가합니다.
    ```json
    "environment": [
      (...)
      {
        "name": "DD_APM_ENABLED",
        "value": "true"
      },
      {
        "name": "DD_APM_NON_LOCAL_TRAFFIC",
        "value": "true"
      }
    ]
    ```

3. 에이전트의 작업 정의에서 로컬 파일을 업데이트하려면 [업데이트된 작업 정의를 등록하세요][5]. 이를 통해 새 수정을 생성할 수 있습니다. 그런 다음 Datadog 에이전트를 위한 데몬 서비스에서 이 업데이트된 수정을 참조할 수 있습니다.

## 애플리케이션 컨테이너를 수정하여 Datadog 에이전트에 트레이스 제출

### 추적 라이브러리 설치
애플레케이션 언어의 경우 [Datadog 추적 라이브러리 설치를 위한 설정 지침]을 따르세요. ECS의 경우 애플리케이션 컨테이너 이미지에 트레이서를 설치하세요.

### EC2 인스턴스에 대한 비공개 IP 주소 제공
애플리케이션 컨테이너가 실행되는 기본 EC2 인스턴스의 비공개 IP 주소를 사용해 트레이서를 제공하세요. 이 주소는 트레이서 엔드포인트의 호스트 이름입니다. 동일한 호스트(호스트 포트가 활성화된 경우)에 있는 Datadog 에이전트 컨테이너가 이 트레이스를 수신합니다. 

다음 방법 중 하나를 사용해 동적으로 비공개 IP 주소 얻기:

{{< tabs >}}
{{% tab "EC2 메타데이터 엔드포인트" %}}

[Amazon EC2 메타데이터 엔드포인트(IMDSv1)][1]을 통해 비공개 IP 주소 검색을 허용할 수 있습니다. 각 호스트에 대한 비공개 IP 주소를 얻으려면 다음 URL에 Curl을 사용합니다.

{{< code-block lang="curl" >}}
curl http://169.254.169.254/latest/meta-data/local-ipv4
{{< /code-block >}}

[인스턴스 메타데이터 서비스(IMDSv2)][2] 버전 2를 사용하는 경우

{{< code-block lang="curl" >}}
TOKEN=$(curl -X PUT "http://169.254.169.254/latest/api/token" -H "X-aws-ec2-metadata-token-ttl-seconds: 21600")
curl http://169.254.169.254/latest/meta-data/local-ipv4 -H "X-aws-ec2-metadata-token: $TOKEN"
{{< /code-block >}}

[1]: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ec2-instance-metadata.html
[2]: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/configuring-instance-metadata-service.html
{{% /tab %}}
{{% tab "ECS 컨테이너 메타데이터 파일" %}}

[Amazon ECS 컨테이너 메타데이터 파일][1]을 통해 비공개 IP 주소 검색을 허용할 수 있습니다. 각 호스트에 대한 비공개 IP 주소를 얻으려면 다음 명령을 실행하세요.

{{< code-block lang="curl" >}}
cat $ECS_CONTAINER_METADATA_FILE | jq -r .HostPrivateIPv4Address
{{< /code-block >}}

[1]: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/container-metadata.html#metadata-file-format
{{% /tab %}}
{{< /tabs >}}

트레이스를 전송하는 각 애플리케이션 컨테이너에 대한 `DD_AGENT_HOST` 환경 변수를 설정하여 이 요청 결과를 트레이서에 제공합니다.

### 트레이스 에이전트 엔트포인트 설정

ECS 애플리케이션 변수가 시작 시점에 설정된 경우(Java, .NET 및 PHP), 위 방법 중 하나를 사용해 `DD_AGENT_HOST`를 포함하는 환경 변수로 트레이서 엔드포인트의 호스트이름을 설정해야 합니다. 아래 얘시는 IMDSv1 메타데이터 엔드포인트를 사용하지만 필요한 경우 설정을 교환 사용할 수 있습니다. 시작 요소로 시작 스크립트가 있는 경우 스크립트의 일부로 이 호출을 포함합니다. 아니면 ECS 작업 정의의 `entryPoint`에 추가합니다.

다른 지원되는 언어(파이썬(Python), 자바스크립트(Javascript), 루비(Ruby), 고(Go)의 경우 대신 애플리케이션 소스 코트에 호스트 이름을 설정할 수 있습니다.

{{< programming-lang-wrapper langs="python,nodeJS,ruby,go,java,.NET,PHP" >}}

{{< programming-lang lang="python" >}}

#### 시작 시간 변수
다음으로 `<Python Startup Command>`을 대체하여 작업 정의의 `entryPoint`를 업데이트합니다. 

```json
"entryPoint": [
  "sh",
  "-c",
  "export DD_AGENT_HOST=$(curl http://169.254.169.254/latest/meta-data/local-ipv4); <Python Startup Command>"
]
```
파이썬(Python)의 경우 시작 명령은 일반적으로 `ddtrace-run python my_app.py`지만 사용한 프레임워크에 따라 달라질 수 있습니다. 예를 들어 [uWSGI][1]를 사용하거나 [`patch_all`를 사용해 직접 코드를 계측하세요].

#### 코드
대신 코드를 업데이트해 트레이서가 명시적으로 호스트 이름을 설정할 수 있도록 할 수 있습니다.

```python
import requests
from ddtrace import tracer


def get_aws_ip():
  r = requests.get('http://169.254.169.254/latest/meta-data/local-ipv4')
  return r.text

tracer.configure(hostname=get_aws_ip())
```

[1]: https://ddtrace.readthedocs.io/en/stable/advanced_usage.html#uwsgi
[2]: https://ddtrace.readthedocs.io/en/stable/basic_usage.html#patch-all
{{< /programming-lang >}}

{{< programming-lang lang="nodeJS" >}}

#### 시작 시간 변수
다음으로 `<Node.js Startup Command>`를 대체하여 작업 정의의 `entryPoint`를 업데이트합니다.
```json
"entryPoint": [
  "sh",
  "-c",
  "export DD_AGENT_HOST=$(curl http://169.254.169.254/latest/meta-data/local-ipv4); <Node.js Startup Command>"
]
```

#### 코드
대신 코드를 업데이트해 트레이서가 명시적으로 호스트 이름을 설정할 수 있도록 할 수 있습니다.

```javascript
const tracer = require('dd-trace').init();
const axios = require('axios');

(async () => {
  const { data: hostname } = await axios.get('http://169.254.169.254/latest/meta-data/local-ipv4');
  tracer.setUrl(`http://${hostname}:8126`);
})();
```

{{< /programming-lang >}}

{{< programming-lang lang="ruby" >}}

#### 시작 시간 변수
다음으로 `<Ruby Startup Command>`를 대체하여 작업 정의의 `entryPoint`를 업데이트합니다.
```json
"entryPoint": [
  "sh",
  "-c",
  "export DD_AGENT_HOST=$(curl http://169.254.169.254/latest/meta-data/local-ipv4); <Ruby Startup Command>"
]
```

#### 코드
대신 코드를 업데이트해 트레이서가 명시적으로 호스트 이름을 설정할 수 있도록 할 수 있습니다.

```ruby
require 'ddtrace'
require 'net/http'

Datadog.configure do |c|
  c.agent.host = Net::HTTP.get(URI('http://169.254.169.254/latest/meta-data/local-ipv4'))
end
```

{{< /programming-lang >}}

{{< programming-lang lang="go" >}}

#### 시작 시간 변수
다음으로 `<Go Startup Command>`를 대체하여 작업 정의의 `entryPoint`를 업데이트합니다. 

```json
"entryPoint": [
  "sh",
  "-c",
  "export DD_AGENT_HOST=$(curl http://169.254.169.254/latest/meta-data/local-ipv4); <Go Startup Command>"
]
```

#### 코드
대신 코드를 업데이트해 트레이서가 명시적으로 호스트 이름을 설정할 수 있도록 할 수 있습니다.

```go
package main

import (
    "net/http"
    "io/ioutil"
    "gopkg.in/DataDog/dd-trace-go.v1/ddtrace/tracer"
)

func main() {
    resp, err := http.Get("http://169.254.169.254/latest/meta-data/local-ipv4")
    bodyBytes, err := ioutil.ReadAll(resp.Body)
    host := string(bodyBytes)
    if err == nil {
        //set the output of the curl command to the DD_AGENT_HOST env
        os.Setenv("DD_AGENT_HOST", host)
        // tell the trace agent the host setting
        tracer.Start(tracer.WithAgentAddr(host))
        defer tracer.Stop()
    }
    //...
}
```

{{< /programming-lang >}}

{{< programming-lang lang="java" >}}

#### 시작 시간 변수
다음으로 `<Java Startup Command>`를 대체하여 작업 정의의 `entryPoint`를 업데이트합니다.

```java
"entryPoint": [
  "sh",
  "-c",
  "export DD_AGENT_HOST=$(curl http://169.254.169.254/latest/meta-data/local-ipv4); <Java Startup Command>"
]
```
이 자바 시작 명령은 `-javaagent:/path/to/dd-java-agent.jar`를 포함해야 합니다. 자세한 예시는  [트레이서를 JVM에 추가하기 위한 자바 추적 문서][1]를 참조하세요.

[1]: /ko/tracing/trace_collection/dd_libraries/java/?tab=containers#add-the-java-tracer-to-the-jvm
{{< /programming-lang >}}

{{< programming-lang lang=".NET" >}}

#### 시작 시간 변수
다음으로 작업 정의의 `entryPoint`를 업데이트하세요. 설정되지 않은 경우 `APP_PATH`를 대체합니다.

```json
"entryPoint": [
  "sh",
  "-c",
  "export DD_AGENT_HOST=$(curl http://169.254.169.254/latest/meta-data/local-ipv4); dotnet ${APP_PATH}"
]
```

{{< /programming-lang >}}

{{< programming-lang lang="PHP" >}}

#### 시작 시간 변수
다음으로 작업 정의의 `entryPoint`를 업데이트하세요.

```json
"entryPoint": [
  "sh",
  "-c",
  "export DD_AGENT_HOST=$(curl http://169.254.169.254/latest/meta-data/local-ipv4); php-fpm -F"
]
```

#### Apache

VirtualHost 또는 서버 설정 파일의 Apache와 `mod_php`의 경우 `PassEnv`를 사용하여 아래 예시처럼 [통합 서비스 태깅][1] 변수 등 다른 환경 변수와 `DD_AGENT_HOST`를 설정합니다.

```
PassEnv DD_AGENT_HOST
PassEnv DD_SERVICE
PassEnv DD_ENV
PassEnv DD_VERSION
```

#### PHP fpm

ini 매개 변수가 `clear_env=on`으로 설정된 경우 풀 작접자 파일 `www.conf`에서 또한 환경 변수를 호스트에서 읽을 수 있도록 설정해야 합니다. 이를 사용하여 또한 아래 예시의 [통합 서비스 태깅][1] 변수 등 다른 환경 변수와 `DD_AGENT_HOST`를 설정합니다. 

```
env[DD_AGENT_HOST] = $DD_AGENT_HOST
env[DD_SERVICE] = $DD_SERVICE
env[DD_ENV] = $DD_ENV
env[DD_VERSION] = $DD_VERSION
```

[1]: https://docs.datadoghq.com/ko/getting_started/tagging/unified_service_tagging/
{{< /programming-lang >}}

{{< /programming-lang-wrapper >}}

#### IMDSv2
IMDSv2를 사용하는 경우 해당 `entryPoint` 설정이 다음과 같습니다. 위 예시에서처럼 언어에 따라 `<Startup Command>`를 적절한 명령으로 대체합니다. 

```json
"entryPoint": [
  "sh",
  "-c",
  "export TOKEN=$(curl -X PUT \"http://169.254.169.254/latest/api/token\" -H \"X-aws-ec2-metadata-token-ttl-seconds: 21600\"); export DD_AGENT_HOST=$(curl -H \"X-aws-ec2-metadata-token: $TOKEN\" http://169.254.169.254/latest/meta-data/local-ipv4); <Startup Command>"
]
```

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/container/amazon_ecs/
[2]: /ko/tracing/trace_collection/
[3]: /resources/json/datadog-agent-ecs-apm.json
[4]: /ko/containers/amazon_ecs/?tab=awscli#managing-the-task-definition-file
[5]: /ko/containers/amazon_ecs/?tab=awscli#registering-the-task-definition
[6]: /ko/containers/amazon_ecs/?tab=awscli#setup