---
app_id: jboss-wildfly
app_uuid: 4ad5a2e9-106b-43a2-820a-f146c7effffe
assets:
  dashboards:
    JBoss WildFly: assets/dashboards/jboss_wildfly.json
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: jboss.jdbc_connections.count
      metadata_path: metadata.csv
      prefix: jboss.
    process_signatures:
    - java jboss-modules.jar
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10060
    source_type_name: JBoss/WildFly
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- 로그 수집
custom_kind: 통합
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/jboss_wildfly/README.md
display_on_public_website: true
draft: false
git_integration_title: jboss_wildfly
integration_id: jboss-wildfly
integration_title: JBoss/WildFly
integration_version: 3.1.0
is_public: true
manifest_version: 2.0.0
name: jboss_wildfly
public_title: JBoss/WildFly
short_description: JBoss 및 WildFly 애플리케이션에서 다양한 JMX 메트릭을 수집합니다.
supported_os:
- linux
- 윈도우즈(Windows)
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Log Collection
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  - Offering::Integration
  configuration: README.md#Setup
  description: JBoss 및 WildFly 애플리케이션에서 다양한 JMX 메트릭을 수집합니다.
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: JBoss/WildFly
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## 개요

이 점검은 [JBoss][1] 및 [WildFly][2] 애플리케이션을 모니터링합니다.

## 설정

### 설치

JBoss/WildFly 점검은 [Datadog 에이전트 ][3] 패키지에 포함되어 있으므로 JBoss/WildFly 호스트에 다른 것을 설치할 필요가 없습니다.

### 설정

이 점검은 인스턴스당 메트릭을 350개로 제한한니다. 반환된 메트릭 개수는 [상태 페이지][4]에 표시됩니다. 아래 설정 을 편집하여 원하는 메트릭을 지정할 수 있습니다. 수집된 메트릭을 커스터마이즈하는 방법에 대한 자세한 내용은 [JMX 점검 설명서][5]를 참조하세요. 추가 메트릭을 모니터링해야 하는 경우, [Datadog 지원팀][6]에 문의하세요.

{{< tabs >}}
{{% tab "Host" %}}

#### 호스트

호스트에서 실행 중인 에이전트에 이 점검을 구성하는 방법:

##### 메트릭 수집

1. 에이전트의 설정 디렉터리 루트의 `conf.d/` 폴더에 있는 `jboss_wildfly.d/conf.yaml` 파일을 편집하여 JBoss 또는 WildFly 애플리케이션 서버의 성능 데이터 수집을 시작합니다. 사용 가능한 모든 설정 옵션은 [샘플 jboss_wildfly.d/conf.yaml][1]을 참조하세요.

   서버 설정에 따라 (특히 `remote+http` JMX 체계를 사용하는 경우) 서버에 연결하기 위해 커스텀 JAR을 지정해야 할 수도 있습니다. 에이전트 와 동일한 컴퓨터에 JAR을 배치하고 `jboss_wildfly.d/conf.yaml` 파일의 `custom_jar_paths` 옵션에 해당 경로를 추가합니다.

    **참고**: JMX URL 체계는 사용 중인 WildFly 버전에 따라 다릅니다:

   - Wildfly 9 이상: `service:jmx:http-remoting-jmx://<HOST>:<PORT> `
   - Wildfly 10 이상: `service:jmx:remote+http://<HOST>:<PORT>`

    자세한 내용은 [WildFly JMX 하위 시스템 설정 페이지][2]를 참조하세요.

2. [에이전트를 다시 시작합니다][3].

##### 로그 수집

_에이전트 버전 > 6.0에서 사용 가능_

1. 로그 수집은 Datadog 에이전트에서 기본적으로 비활성화되어 있습니다. `datadog.yaml` 파일에서 활성화합니다.

   ```yaml
   logs_enabled: true
   ```

2. 다음으로 하단의 `logs` 줄을 주석 처리하여 `jboss_wildfly.d/conf.yaml`을 편집합니다. 로그 `path`를 JBoss 로그 파일의 올바른 경로로 업데이트합니다. 

   ```yaml
   logs:
     - type: file
       path: /opt/jboss/wildfly/standalone/log/*.log
       source: jboss_wildfly
       service: '<APPLICATION_NAME>'
   ```

3. [에이전트를 다시 시작합니다][3].

[1]: https://github.com/DataDog/integrations-core/blob/master/jboss_wildfly/datadog_checks/jboss_wildfly/data/conf.yaml.example
[2]: https://docs.jboss.org/author/display/WFLY9/JMX%20subsystem%20configuration.html
[3]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/#start-stop-restart-the-agent
{{% /tab %}}
{{% tab "Containerized" %}}

#### 컨테이너화된 환경

##### 메트릭 수집

컨테이너화된 환경의 경우 [JMX를 사용한 자동탐지][1] 가이드를 참조하세요.

##### 로그 수집

_에이전트 버전 > 6.0에서 사용 가능_

Datadog 에이전트에서 로그 수집은 기본값으로 비활성화되어 있습니다. 이를 활성화하려면 [쿠버네티스(Kubernetes) 로그 수집][2]을 참조하세요.

| 파라미터      | 값                                                      |
| -------------- | ---------------------------------------------------------- |
| `<LOG_CONFIG>` | `{"source": "jboss_wildfly", "service": "<SERVICE_NAME>"}` |

[1]: https://docs.datadoghq.com/ko/agent/guide/autodiscovery-with-jmx/?tab=containerizedagent
[2]: https://docs.datadoghq.com/ko/agent/kubernetes/log/
{{% /tab %}}
{{< /tabs >}}

### 검증

[에이전트 상태 하위 명령을 실행][4]하고 점검 섹션에서 `jboss_wildfly`를 찾습니다.

## 수집한 데이터

### 메트릭
{{< get-metrics-from-git "jboss-wildfly" >}}


### 이벤트

JBoss/WildFly 통합에는 이벤트가 포함되어 있지 않습니다.

### 서비스 점검
{{< get-service-checks-from-git "jboss-wildfly" >}}


### JMXFetch를 사용한 메트릭 수집

[JMXFetch][7]를 사용해 자바(Java) 애플리케이션 메트릭을 수집하도록 Datadog 에이전트를 설정정할 수 있습니다. JBoss/Wildfly  Datadog 통합에 대해 설정된 기본 메트릭을 수집하려면 시스템 속성
`Ddd.jmxfetch.jboss_wildfly.enabled=true`을 설정합니다.

## 트러블슈팅

도움이 필요하신가요? [Datadog 지원팀][6]에 문의하세요.



[1]: https://developers.redhat.com/products/eap/overview
[2]: http://wildfly.org
[3]: https://app.datadoghq.com/account/settings/agent/latest
[4]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/#agent-status-and-information
[5]: https://docs.datadoghq.com/ko/integrations/java/
[6]: https://docs.datadoghq.com/ko/help/
[7]: https://docs.datadoghq.com/ko/integrations/java