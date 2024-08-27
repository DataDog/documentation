---
app_id: apache-apisix
app_uuid: b842d639-caf6-4b3a-8115-52458b9a0753
assets:
  dashboards:
    Apache APISIX Dashboard: assets/dashboards/apache-apisix_overview.json
  integration:
    auto_install: true
    configuration: {}
    events:
      creates_events: false
    metrics:
      check:
      - apisix.request.counter
      - apisix.request.latency
      - apisix.upstream.latency
      - apisix.apisix.latency
      - apisix.ingress.size
      - apisix.egress.size
      metadata_path: metadata.csv
      prefix: apisix.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10244
    source_type_name: Apache APISIX
author:
  homepage: https://github.com/DataDog/integrations-extras
  name: 커뮤니티
  sales_email: dev@apisix.apache.org
  support_email: dev@apisix.apache.org
categories:
- cloud
- 메트릭
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/apache-apisix/README.md
display_on_public_website: true
draft: false
git_integration_title: apache-apisix
integration_id: apache-apisix
integration_title: Apache APISIX
integration_version: ''
is_public: true
custom_kind: integration
manifest_version: 2.0.0
name: apache-apisix
public_title: Apache APISIX
short_description: Datadog-APISIX 통합
supported_os:
- 리눅스
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - "\b카테고리::클라우드"
  - 카테고리::메트릭
  - 지원되는 OS::Linux
  - 지원되는 OS::Windows
  - 지원되는 OS::macOS
  configuration: README.md#Setup
  description: Datadog-APISIX 통합
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Apache APISIX
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## 개요

Apache APISIX는 실시간 고성능 동적 API 게이트웨이로, 로드밸런싱, 동적 업스트림, 카나리아 릴리스, 회로 차단, 인증, 관찰 가능성 등과 같은 풍부한 트래픽 관리 기능을 제공합니다. 예를 들어, Apache APISIX를 사용하여 전통적인 남북 트래픽과 서비스 사이의 동서 트래픽을 처리할 수 있습니다. 또한 쿠버네티스(Kubernetes) 수신 컨트롤러로도 사용할 수 있습니다.

[APISIX-Datadog 플러그인][1]은 커스텀 메트릭을 DogStatsD 서버로 푸시하고 UDP 연결을 통해 Datadog 에이전트와 함께 번들로 제공됩니다. DogStatsD 은 StatsD 프로토콜을 구현한 것입니다. Apache APISIX][2] 에이전트용 커스텀 메트릭을 수집하여 단일 데이터 포인트로 집계한 후 설정된 Datadog 서버로 보냅니다.

## 설정

### 설치

아래의 설정 지침을 따릅니다.

### 설정

1. 이미 Datadog 을 사용 중이고 Datadog 에이전트가 설치되어 있는 경우 방화벽에 포트 8125/UDP가 허용되는지 확인하세요. 예를 들어 Apache APISIX 에이전트 는 Datadog 에이전트 포트 8125에 연결할 수 있습니다. 이미 설정한 경우 3단계로 건너뛸 수 있습니다.

> Datadog Agent 설치 방법을 자세히 알아보려면 [에이전트 설명서][3]를 참조하세요.

2. Datadog 신규 사용자인 경우:

   1. 먼저, [Datadog 웹사이트][4]를 방문하여 계정을 생성한 다음 무료 시작하기 버튼을 클릭합니다.
   2. API 키를 생성합니다.
      ![API 키 생성][5]

3. APISIX-Datadog 플러그인은 `datadog/agent` 의 DogStatsD 구성 요소로만 필요하며, 플러그인은 표준 UDP 소켓을 통해 statsd 프로토콜에 따라 메트릭을 DogStatsD 서버로 비동기적으로 전송합니다. 그렇기 때문에 APISIX에서는 전체 에이전트 대신 독립형 `datadog/dogstatsd` 이미지를 사용할 것을 권장합니다. 이는 2.8GB에 달하는 `datadog/agent` 이미지에 비해 매우 작은 크기입니다(단 11MB).

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

5. 추가 커스텀 설정 옵션은 [Datadog 플러그인][1] 설명서를 참조하세요.

### 검증

[에이전트 상태 하위 명령을 실행][5]하고 점검 섹션에서 `apisix`를 찾습니다.

## 수집한 데이터

### 메트릭
{{< get-metrics-from-git "apache-apisix" >}}


### 이벤트

Apache APISIX 점검은 이벤트를 포함하지 않습니다.

## 트러블슈팅

도움이 필요하신가요? [Datadog 지원팀][8]에 문의하세요.

## 참고 자료

- [Apache APISIX에서 Datadog를 사용한 클라우드 모니터링][9]

[1]: https://apisix.apache.org/docs/apisix/plugins/datadog
[2]: https://apisix.apache.org/
[3]: https://docs.datadoghq.com/ko/agent/
[4]: https://www.datadoghq.com/
[5]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/apache-apisix/images/screenshot_1.png
[6]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/#agent-status-and-information
[7]: https://github.com/DataDog/integrations-extras/blob/master/apache-apisix/metadata.csv
[8]: https://docs.datadoghq.com/ko/help/
[9]: https://apisix.apache.org/blog/2021/11/12/apisix-datadog