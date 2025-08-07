---
app_id: apache-apisix
categories:
- 클라우드
- 메트릭
custom_kind: 통합
description: Datadog-APISIX 통합
further_reading:
- link: https://apisix.apache.org/blog/2021/11/12/apisix-datadog
  tag: 블로그
  text: og:title
media: []
supported_os:
- linux
- 윈도우즈(Windows)
- macos
title: Apache APISIX
---
## 개요

Apache APISIX는 실시간 고성능 동적 API 게이트웨이로, 로드밸런싱, 동적 업스트림, 카나리아 릴리스, 회로 차단, 인증, 관찰 가능성 등과 같은 풍부한 트래픽 관리 기능을 제공합니다. 예를 들어, Apache APISIX를 사용하여 전통적인 남북 트래픽과 서비스 사이의 동서 트래픽을 처리할 수 있습니다. 또한 쿠버네티스(Kubernetes) 수신 컨트롤러로도 사용할 수 있습니다.

The [APISIX-Datadog plugin](https://apisix.apache.org/docs/apisix/plugins/datadog) pushes its custom metrics to the DogStatsD server and comes bundled with the Datadog Agent over the UDP connection. DogStatsD is an implementation of StatsD protocol. It collects the custom metrics for [Apache APISIX](https://apisix.apache.org/) agent, aggregates it into a single data point, and sends it to the configured Datadog server.

## 설정

### 설치

아래의 설정 지침을 따릅니다.

### 설정

1. 이미 Datadog 을 사용 중이고 Datadog 에이전트가 설치되어 있는 경우 방화벽에 포트 8125/UDP가 허용되는지 확인하세요. 예를 들어 Apache APISIX 에이전트 는 Datadog 에이전트 포트 8125에 연결할 수 있습니다. 이미 설정한 경우 3단계로 건너뛸 수 있습니다.

> To learn more about how to install the Datadog Agent, see the [Agent documentation](https://docs.datadoghq.com/agent/).

2. Datadog 신규 사용자인 경우:

   1. First, create an account by visiting the [Datadog website](https://www.datadoghq.com/) and click on the Get Started Free button.
   1. API 키를 생성합니다.
      ![Generate an API Key](https://raw.githubusercontent.com/DataDog/integrations-extras/master/apache-apisix/images/screenshot_1.png)

1. APISIX-Datadog 플러그인은 `datadog/agent` 의 DogStatsD 구성 요소로만 필요하며, 플러그인은 표준 UDP 소켓을 통해 statsd 프로토콜에 따라 메트릭을 DogStatsD 서버로 비동기적으로 전송합니다. 그렇기 때문에 APISIX에서는 전체 에이전트 대신 독립형 `datadog/dogstatsd` 이미지를 사용할 것을 권장합니다. 이는 2.8GB에 달하는 `datadog/agent` 이미지에 비해 매우 작은 크기입니다(단 11MB).

컨테이너로 실행하는 방법:

```shell
# pull the latest image
$ docker pull datadog/dogstatsd:latest
# run a detached container
$ docker run -d --name dogstatsd-agent -e DD_API_KEY=<Your API Key from step 2> -p 8125:8125/udp  datadog/dogstatsd
```

프로덕션 환경에서 쿠버네티스(Kubernetes)를 사용 중인 경우 Apache APISIX 에이전트와 함께 `dogstatsd`를 `Daemonset` 또는 `Multi-Container Pod`로 배포할 수 있습니다.

4. 다음은 특정 경로에 대해 Datadog 플러그인을 활성화하는 방법 예시입니다. `dogstatsd` 에이전트가 이미 설치되어 실행 중인 것으로 간주됩니다.

```shell
# 특정 경로에 대해 플러그인 활성화
$ curl http://127.0.0.1:9080/apisix/admin/routes/1 -H 'X-API-KEY: edd1c9f034335f136f87ad84b625c8f1' -X PUT -d '
{
  "plugins": {
    "datadog": {}
  },
  "upstream": {
    "type": "roundrobin",
    "nodes": {
      "127.0.0.1:1980": 1
    }
  },
  "uri": "/hello"
}'
```

이제 엔드포인트 URI `/hello` 에 대한 모든 요청은 위의 메트릭을 생성하여 Datadog 에이전트 의 로컬 DogStatsD 서버로 푸시합니다.

5. 플러그인을 비활성화하려면 플러그인 설정에서 해당 JSON 설정을 제거하여 `datadog`를 비활성화합니다. APISIX 플러그인은 빠르게 다시 로딩되므로 APISIX를 다시 시작할 필요가 없습니다.


```shell
# 경로에 대해 플러그인 활성화
curl http://127.0.0.1:9080/apisix/admin/routes/1 -H 'X-API-KEY: edd1c9f034335f136f87ad84b625c8f1' -X PUT -d '
{
  "uri": "/hello",
  "plugins": {},
  "upstream": {
    "type": "roundrobin",
    "nodes": {
      "127.0.0.1:1980": 1
    }
  }
}'
```

5. See the [Datadog Plugin](https://apisix.apache.org/docs/apisix/plugins/datadog) documentation for additional custom configuration options.

### 검증

[Run the Agent's status subcommand](https://docs.datadoghq.com/agent/guide/agent-commands/#agent-status-and-information) and look for `apisix` under the Checks section.

## 수집한 데이터

### Metrics

| | |
| --- | --- |
| **apisix.request.counter** <br>(count) | Number of requests received<br>_Shown as connection_ |
| **apisix.request.latency** <br>(gauge) | Total latency of the request response lifecycle, time taken to process the particular request.<br>_Shown as millisecond_ |
| **apisix.upstream.latency** <br>(gauge) | The latency between time taken from proxying the request to the upstream server till a response is received.<br>_Shown as millisecond_ |
| **apisix.apisix.latency** <br>(gauge) | The latency added by Apache APISIX, time taken by APISIX agent solely to process the request.<br>_Shown as millisecond_ |
| **apisix.ingress.size** <br>(gauge) | The body size of incoming request before forwarding it to upstream server.<br>_Shown as byte_ |
| **apisix.egress.size** <br>(gauge) | The body size of received response coming from the APISIX forwarded upstream server.<br>_Shown as byte_ |

### 이벤트

Apache APISIX 점검은 이벤트를 포함하지 않습니다.

## 트러블슈팅

도움이 필요하세요? [Datadog 지원 팀](https://docs.datadoghq.com/help/)에 문의하세요.

## 참고 자료

- [Cloud Monitoring with Datadog in Apache APISIX](https://apisix.apache.org/blog/2021/11/12/apisix-datadog)