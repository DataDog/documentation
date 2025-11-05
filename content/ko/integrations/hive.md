---
app_id: hive
app_uuid: 827ff57e-83db-45b4-8a59-2f0270d389e8
assets:
  dashboards:
    Hive Overview: assets/dashboards/overview.json
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: hive.server.memory.total.used
      metadata_path: metadata.csv
      prefix: 하이브.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10062
    source_type_name: Hive
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- 로그 수집
custom_kind: 통합
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/hive/README.md
display_on_public_website: true
draft: false
git_integration_title: hive
integration_id: hive
integration_title: Hive
integration_version: 2.1.0
is_public: true
manifest_version: 2.0.0
name: hive
public_title: Hive
short_description: HiveServer2와 Hive MetaStore에서 다양한 JMX 메트릭을 수집합니다.
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
  description: HiveServer2와 Hive MetaStore에서 다양한 JMX 메트릭을 수집합니다.
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Hive
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## 개요

이 점검은 [Hive][1]의 두 부분인 Hive Metastore와 HiveServer2를 모니터링합니다.

## 설정

### 설치

Hive 점검은 [Datadog 에이전트][2] 패키지에 포함되어 있습니다. 서버에 추가 설치가 필요하지 않습니다.

### 설정

#### Hive 설정

1. `HIVE_HOME/conf/hive-site.xml`][3]에서 Hive 설정 파일을 편집하여 다음 속성을 추가하여 Hive 메타스토어 및 HiveServer2 메트릭 를 활성화합니다:

   ```xml
   <property>
     <name>hive.metastore.metrics.enabled</name>
     <value>true</value>
   </property>
   <property>
     <name>hive.server2.metrics.enabled</name>
     <value>true</value>
   </property>
   ```

2. HiveServer2 및/또는 Hive Metastore에 대해 JMX 원격 연결을 활성화합니다. 예를 들어 `HADOOP_CLIENT_OPTS` 환경 변수를 설정합니다.

   ```conf
   export HADOOP_CLIENT_OPTS="$HADOOP_CLIENT_OPTS -Dcom.sun.management.jmxremote \
   -Dcom.sun.management.jmxremote.authenticate=false -Dcom.sun.management.jmxremote.ssl=false \
   -Dcom.sun.management.jmxremote.port=8808"
   ```

   그런 다음 HiveServer2 또는 Hive Metastore를 다시 시작합니다. Hive Metastore와 HiveServer2는 동일한 JMX 연결을 공유할 수 없습니다.

{{< tabs >}}
{{% tab "Host" %}}

#### 호스트

호스트에서 실행 중인 에이전트에 이 점검을 구성하는 방법:

호스트에서 실행 중인 Agent에 대해 이 검사를 구성하려면 아래 지침을 따르세요. 컨테이너화된 환경의 경우 [Containerized](#containerized) 섹션을 참조하세요.

##### 메트릭 수집

1. 에이전트의 설정 디렉토리 루트의 `conf.d/` 폴더에 있는 `hive.d/conf.yaml` 파일을 편집하여 Hive 성능 데이터 수집을 시작합니다. 사용 가능한 모든 설정 옵션은 [hive.d/conf.yaml 샘플][1]을 참조하세요.

   이 점검는 인스턴스당 350개 메트릭으로 제한됩니다. 반환된 메트릭 수는 [상태 페이지][2]에 표시됩니다. 아래 설정을 편집하여 관심 있는 메트릭을 지정할 수 있습니다.
   수집할 메트릭을 커스터마이즈하는 방법을 알아보려면 [JMX 점검 설명서][3]에서 자세한 지침을 참조하세요. 더 많은 메트릭을 모니터링하려면 [Datadog 지원팀][4]에 문의하세요.

2. [에이전트를 재시작하세요][5].

##### 로그 수집

_에이전트 버전 > 6.0에서 사용 가능_

1. Datadog 에이전트에서는 로그 수집이 기본적으로 비활성화되어 있습니다. `datadog.yaml` 파일에서 활성화해야 합니다.

   ```yaml
   logs_enabled: true
   ```

2. 이 설정 블록을 `hive.d/conf.yaml` 파일에 추가하여 Hive 로그 수집을 시작하세요.

   ```yaml
     logs:
       - type: file
         path: /tmp/<USER>/hive.log
         source: hive
         service: '<SERVICE_NAME>'
         log_processing_rules:
           - type: multi_line
             name: new_log_start_with_date
             pattern: \d{4}\-\d{2}\-\d{2}
   ```

   `path` 및 `service` 파라미터 값을 변경하고 환경에 맞춰 설정합니다. 사용 가능한 모든 설정 옵션은 [hive.d/conf.yaml 샘플][1]을 참조하세요.

3. [에이전트를 재시작하세요][5].

[1]: https://github.com/DataDog/integrations-core/blob/master/hive/datadog_checks/hive/data/conf.yaml.example
[2]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/#agent-status-and-information
[3]: https://docs.datadoghq.com/ko/integrations/java/
[4]: https://docs.datadoghq.com/ko/help/
[5]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/#start-stop-and-restart-the-agent
{{% /tab %}}
{{% tab "Containerized" %}}

#### 컨테이너화된 환경

컨테이너화된 환경의 경우 [자동탐지 통합 템플릿][1]에 아래 파라미터를 적용하는 방법이 안내되어 있습니다.

##### 메트릭 수집

Datadog-Hive 통합을 사용하여 메트릭 수집하려면 [JMX를 사용한 자동탐지][2] 가이드를 참조하세요.

##### 로그 수집

_에이전트 버전 > 6.0에서 사용 가능_

Datadog 에이전트에서 기본적으로 로그 수집이 비활성화되어 있습니다. 활성화하려면 [쿠버네티스 로그 수집]을 확인하세요.

| 파라미터      | 값                                                                                                                                                             |
| -------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `<LOG_CONFIG>` | `{"source": "hive", "service": "<SERVICE_NAME>", "log_processing_rules":{"type":"multi_line","name":"new_log_start_with_date", "pattern":"\d{4}\-\d{2}\-\d{2}"}}` |

[1]: https://docs.datadoghq.com/ko/agent/kubernetes/integrations/
[2]: https://docs.datadoghq.com/ko/agent/guide/autodiscovery-with-jmx/?tab=containerizedagent
[3]: https://docs.datadoghq.com/ko/agent/kubernetes/log/
{{% /tab %}}
{{< /tabs >}}

### 검증

[에이전트의 상태 하위 명령을 실행][4]하고 점검 섹션에서 `Hive`를 찾습니다.

## 수집한 데이터

### 메트릭
{{< get-metrics-from-git "hive" >}}


### 이벤트

하이브 점검에는 이벤트가 포함되어 있지 않습니다.

### 서비스 점검
{{< get-service-checks-from-git "hive" >}}


## 트러블슈팅

도움이 필요하신가요? [Datadog 지원팀][5]에 문의하세요.


[1]: https://cwiki.apache.org/confluence/display/Hive/Home
[2]: https://app.datadoghq.com/account/settings/agent/latest
[3]: https://cwiki.apache.org/confluence/display/Hive/Configuration+Properties#ConfigurationProperties-Metrics
[4]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/#agent-status-and-information
[5]: https://docs.datadoghq.com/ko/help/