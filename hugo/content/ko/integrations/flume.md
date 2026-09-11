---
app_id: flume
app_uuid: 9e349061-5665-482d-9a5a-f3a07999bfae
assets:
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: flume.channel.capacity
      metadata_path: metadata.csv
      prefix: flume.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10133
    source_type_name: flume
author:
  homepage: https://github.com/DataDog/integrations-extras
  name: 커뮤니티
  sales_email: kealan.maas@datadoghq.com
  support_email: kealan.maas@datadoghq.com
categories: []
custom_kind: 통합
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/flume/README.md
display_on_public_website: true
draft: false
git_integration_title: flume
integration_id: flume
integration_title: flume
integration_version: 0.0.1
is_public: true
manifest_version: 2.0.0
name: flume
public_title: flume
short_description: Apache Flume Agent의 싱크, 채널, 소스 추적하기
supported_os:
- linux
- macos
- windows
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS::Linux
  - Supported OS::macOS
  - Supported OS::Windows
  - Offering::Integration
  configuration: README.md#Setup
  description: Apache Flume Agent의 싱크, 채널, 소스 추적하기
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: flume
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## 개요

이 점검은 [Apache Flume][1]을 모니터링합니다.

## 설정

Flume 점검은 [Datadog 에이전트][2] 패키지에 포함되어 있지 않기 때문에 별도로 설치해야 합니다.

### 설치

에이전트 v7.21+/v6.21+의 경우, 하단 지침에 따라 호스트에 따라 Flume 점검을 설치하세요. Docker 에이전트 또는 이전 버전의 에이전트와 같이 설치하려면 [커뮤니티 통합][3]을 참고하세요.

1. 다음 명령어를 실행해 에이전트 통합을 설치하세요.

   ```shell
   datadog-agent integration install -t datadog-flume==<INTEGRATION_VERSION>
   ```

2. 통합을 코어 [통합][4]과 유사하게 설정하세요.

### 구성

1. 다음 JVM 인수를  [flume-env.sh][5]에 추가해 JMX를 활성화하도록 Flume을 구성합니다.

```
export JAVA_OPTS="-Dcom.sun.management.jmxremote -Dcom.sun.management.jmxremote.port=5445 -Dcom.sun.management.jmxremote.authenticate=false -Dcom.sun.management.jmxremote.ssl=false"

```

2. 내 에이전트 구성 디렉터리의 루트 수준에 있는 `conf.d/` 폴더에서 `flume.d/conf.yaml` 파일을 편집해
   Flume 성능 데이터 수집을 시작하세요.
   사용 가능한 모든 설정 옵션을 보려면 [샘플 `flume.d/conf.yaml`][6]을 참고하세요.

   이 점검의 제한 값은 인스턴스당 메트릭 350개입니다. 반환된 메트릭 개수는 상태 출력에 표시됩니다.
   아래 구성을 편집해 관심 있는 메트릭을 지정할 수 있습니다.
   수집할 메트릭을 맞춤화하는 방법에 관한 자세한 내용은 [JMX 점검 설명서][7]를 참고하세요.
   더 많은 메트릭을 모니터링하고 싶을 경우에는 [Datadog 지원팀][8]에 문의하세요.

3. [에이전트를 재시작합니다][9].

### 검증

[에이전트의 `status` 하위 명령을 실행][10]하고 Checks 섹션 아래의 `flume`을 찾으세요.

### 구성 요소 메트릭

이 점검으로 가져올 수 있는 메트릭은 Flume 에이전트가 사용하는 소스, 채널, 싱크에 따라 달라집니다. 각 구성 요소별로 노출되는 메트릭의 전체 목록을 보려면 Apache Flume 설명서에서 [사용 가능한 구성 요소 메트릭][9]을 참고하세요. Datadog에서 볼 수 있는 메트릭 목록을 보려면 이 페이지의 [메트릭](#metrics) 섹션을 참고하세요.

## 수집한 데이터

### 메트릭
{{< get-metrics-from-git "flume" >}}


### 이벤트

Flume에는 이벤트가 포함되어 있지 않습니다.

### 서비스 점검
{{< get-service-checks-from-git "flume" >}}


## 트러블슈팅

도움이 필요하신가요? [Datadog 지원팀][8]에 문의하세요.


[1]: https://flume.apache.org/
[2]: https://app.datadoghq.com/account/settings/agent/latest
[3]: https://docs.datadoghq.com/ko/agent/guide/use-community-integrations/
[4]: https://docs.datadoghq.com/ko/getting_started/integrations/
[5]: https://flume.apache.org/FlumeUserGuide.html#jmx-reporting
[6]: https://github.com/DataDog/integrations-extras/blob/master/flume/datadog_checks/flume/data/conf.yaml.example
[7]: https://docs.datadoghq.com/ko/integrations/java/
[8]: https://docs.datadoghq.com/ko/help/
[9]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[10]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/#agent-status-and-information
[11]: https://github.com/DataDog/integrations-extras/blob/master/flume/metadata.csv
[12]: https://github.com/DataDog/integrations-extras/blob/master/flume/assets/service_checks.json