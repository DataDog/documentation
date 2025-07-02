---
app_id: ibm-was
app_uuid: c4c79ae5-b702-415c-bc76-a7b71efd43d8
assets:
  dashboards:
    IBM_WAS: assets/dashboards/overview.json
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: ibm_was.can_connect
      metadata_path: metadata.csv
      prefix: ibm_was.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10048
    source_type_name: IBM WAS
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- 로그 수집
- OS & 시스템
custom_kind: 통합
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/ibm_was/README.md
display_on_public_website: true
draft: false
git_integration_title: ibm_was
integration_id: ibm-was
integration_title: IBM WAS
integration_version: 5.1.0
is_public: true
manifest_version: 2.0.0
name: ibm_was
public_title: IBM WAS
short_description: IBM Websphere Application Sever는 Java 애플리케이션을 호스팅하는 프레임워크입니다.
supported_os:
- linux
- 윈도우즈(Windows)
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Log Collection
  - Category::OS & System
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  - Offering::Integration
  configuration: README.md#Setup
  description: IBM Websphere Application Sever는 Java 애플리케이션을 호스팅하는 프레임워크입니다.
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: IBM WAS
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## 개요

이 점검에서는 Datadog 에이전트를 통해 [IBM Webshpere Application Server(WAS)][1]를 모니터링합니다. 이 점검은 IBM WAS 버전 >= 8.5.5를 지원합니다.

## 설정

아래 지침을 따라 호스트에서 실행되는 에이전트에 대해 이 점검을 설치하고 설정하세요. 컨테이너화된 환경의 경우 이러한 지침을 적용하는 데 가이드가 필요하면 [자동탐지 통합 템플릿][2]을 참조하세요.

IBM WAS Datadog 통합에서는 WebSphere Application Server에서 활성화된 PMI 카운터를 가져옵니다. 설정하려면 Datdog가 WAS에서 성능 데이터를 가져올 수 있도록 PerfServlet을 활성화해야 합니다.

기본적으로 이 점검에서는 JDBC, JVM, 스레드 풀, Servlet Session Manager 메트릭을 수집합니다. "custom_queries" 섹션에서 더 수집하고 싶은 메트릭을 추가할 수 있습니다. 예시를 보려면 [샘플 점검 구성][3]을 참고하세요.

### 설치

IBM WAS 점검은 [Datadog 에이전트][4] 패키지에 포함되어 있습니다.

#### `PerfServlet`을 활성화하세요.

WebSphere Application Server 설치 경로가 `<WAS_HOME>`인 경우 `<WAS_HOME>/installableApps` 디렉터리에서 servlet's .ear file(PerfServletApp.ear)을 찾을 수 있습니다. 


성능 servlet은 다른 servlet과 동일한 방법으로 배포됩니다. 도메인 내 단일 애플리케이션 서버 인스턴스에 servlet을 배포하세요.

**참고**: 버전 6.1부터는 PerfServlet을 작동할 때 애플리케이션 보안을 활성화해야 합니다.

### 모니터링된 통계 세트 변경

기본적으로 애플리케이션 서버는 "Basic" 모니터링만 하도록 구성되어 있습니다. 내 JVM, JDBC, servlet 연결을 가시화하려면 내 애플리케이션 서버의 모니터링 중인 통계 세트를 "Basic"에서 "All"로 변경하세요.

Websphere Administration Console에서 `Application servers > <YOUR_APP_SERVER> > Performance Monitoring Infrastructure (PMI)`으로 이동해 설정을 찾을 수 있습니다.

변경한 후 "Apply"를 클릭해 구성을 저장하고 애플리케이션 서버를 재시작하세요. 변경 몇 분 후에 JDBC, JVM, servlet 메트릭이 Datadog에 추가로 나타나기 시작합니다.

### 설정

{{< tabs >}}
{{% tab "Host" %}}

#### 호스트

호스트에서 실행 중인 에이전트에 이 점검을 구성하는 방법:

##### 메트릭 수집

1. 에이전트 구성 디렉터리 루트에 있는 `conf.d/` 폴더에서 `ibm_was.d/conf.yaml` 파일을 편집하여 IBM WAS 성능 데이터를 수집하세요. 사용 가능한 모든 구성 옵션은 [샘플 ibm_was.d/conf.yaml][1]을 참고하세요.

2. [에이전트를 재시작합니다][2].

##### 로그 수집

_에이전트 버전 > 6.0에서 사용 가능_

1. 로그 수집은 Datadog 에이전트에서 기본적으로 비활성화되어 있습니다. `datadog.yaml` 파일에서 활성화합니다.

   ```yaml
   logs_enabled: true
   ```

2. 그 후 하단에 있는 `logs` 줄의 주석 처리를 제거하여 `ibm_was.d/conf.yaml`을 편집하세요. WAS 로그 파일의 올바른 경로로 로그 `path`를 업데이트합니다.

   ```yaml
   logs:
     - type: file
       path: /opt/IBM/WebSphere/AppServer/profiles/InfoSphere/logs/server1/*.log
       source: ibm_was
       service: websphere
   ```

3. [에이전트를 재시작합니다][2].

[1]: https://github.com/DataDog/integrations-core/blob/master/ibm_was/datadog_checks/ibm_was/data/conf.yaml.example
[2]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/#start-stop-and-restart-the-agent
{{% /tab %}}
{{% tab "Containerized" %}}

#### 컨테이너화된 환경

컨테이너화된 환경의 경우 [자동탐지 통합 템플릿][1]에 아래 파라미터를 적용하는 방법이 안내되어 있습니다.

##### 메트릭 수집

| 파라미터            | 값                                                                         |
| -------------------- | ----------------------------------------------------------------------------- |
| `<INTEGRATION_NAME>` | `ibm_was`                                                                     |
| `<INIT_CONFIG>`      | 비어 있음 또는 `{}`                                                                 |
| `<INSTANCE_CONFIG>`  | `{"servlet_url": "http://%%host%%:%%port%%/wasPerfTool/servlet/perfservlet"}` |

##### 로그 수집

_에이전트 버전 > 6.0에서 사용 가능_

Datadog 에이전트에서 로그 수집은 기본값으로 비활성화되어 있습니다. 이를 활성화하려면 [쿠버네티스(Kubernetes) 로그 수집][2]을 참조하세요.

| 파라미터      | 값                                                |
| -------------- | ---------------------------------------------------- |
| `<LOG_CONFIG>` | `{"source": "ibm_was", "service": "<SERVICE_NAME>"}` |

[1]: https://docs.datadoghq.com/ko/agent/kubernetes/integrations/
[2]: https://docs.datadoghq.com/ko/agent/kubernetes/log/
{{% /tab %}}
{{< /tabs >}}

### 검증

[에이전트 상태 하위 명령을 실행][5]하고 점검 섹션 아래에서 `ibm_was`을 찾으세요.

## 수집한 데이터

### 메트릭
{{< get-metrics-from-git "ibm-was" >}}


### 이벤트

IBM WAS는 이벤트를 포함하지 않습니다.

### 서비스 점검
{{< get-service-checks-from-git "ibm-was" >}}


## 트러블슈팅

도움이 필요하신가요? [Datadog 지원팀][6]에 문의하세요.


[1]: https://www.ibm.com/cloud/websphere-application-platform
[2]: https://docs.datadoghq.com/ko/agent/kubernetes/integrations/
[3]: https://github.com/DataDog/integrations-core/blob/master/ibm_was/datadog_checks/ibm_was/data/conf.yaml.example
[4]: https://app.datadoghq.com/account/settings/agent/latest
[5]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/#agent-status-and-information
[6]: https://docs.datadoghq.com/ko/help/