---
app_id: weblogic
app_uuid: 80a8d9e2-48dd-4242-be78-0d929ea1a492
assets:
  dashboards:
    metrics: assets/dashboards/metrics.json
    overview: assets/dashboards/overview.json
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: weblogic.jvm_runtime.heap_size
      metadata_path: metadata.csv
      prefix: weblogic.
    process_signatures:
    - java weblogic.Server
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10245
    source_type_name: WebLogic
  monitors:
    Number of active thread is high: assets/monitors/active_threads.json
    Number of stuck thread is high: assets/monitors/stuck_threads.json
  saved_views:
    weblogic_error_logs: assets/saved_views/error_logs.json
    weblogic_overview: assets/saved_views/weblogic_overview.json
    weblogic_patterns: assets/saved_views/weblogic_patterns.json
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- 로그 수집
- oracle
custom_kind: integration
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/weblogic/README.md
display_on_public_website: true
draft: false
git_integration_title: weblogic
integration_id: weblogic
integration_title: WebLogic
integration_version: 3.0.0
is_public: true
manifest_version: 2.0.0
name: weblogic
public_title: WebLogic
short_description: WebLogic 서버의 상태와 성능을 모니터합니다.
supported_os:
- 리눅스
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Log Collection
  - Category::Oracle
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  - 제공::통합
  configuration: README.md#Setup
  description: WebLogic 서버의 상태와 성능을 모니터링합니다.
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: WebLogic
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## 개요

Oracle WebLogic은 온프레미스와 클라우드에서 엔터프라이즈 Java 애플리케이션을 개발, 실행 및 배포하는 플랫폼입니다. 웹 서버 기능, 메시징 같은 비즈니스 컴포넌트, 데이터베이스 등 백엔드 엔터프라이즈 시스템 액세스를 포함한 애플리케이션 서비스를 중앙 집중화합니다.

Datadog으로 Oracle WebLogic을 모니터링하면 다음 작업을 할 수 있습니다.
- Java Virtual Machine (JVM)의 힙 크기 증가 인지
- 서버 응답 시간 추적
- 웹 애플리케이션의 세션 세부 정보 모니터
- 스레드 풀 및 메시징 서비스 추적
- 데이터베이스 연결 풀 사용량 추적

## 설정

### 설치

WebLogic 점검은 [Datadog Agent][1] 패키지에 포함되어 있습니다.
서버에 추가 설치가 필요하지 않습니다.

1. 본 검사는 JMX 기반이며 JVM에서 내보낸 Platform MBean Server에서 메트릭을 수집하므로, WebLogic 서버에 JMX Remote Monitoring이 활성화되어 있어야 합니다. 설치 지침은 [Remote Monitoring 및 Management][2]를 참조하세요.

2. 시스템 속성 `-Djavax.management.builder.initial=weblogic.management.jmx.mbeanserver.WLSMBeanServerBuilder`을 설정하여 Platform MBean Server에서 해당 메트릭을 활성화합니다. 본 속성은 WebLogic Server Administration Console과 서버 시작 스크립트 모두에서 활성화해야 합니다. **참고**: 이 작업을 두 번 이상 실행해야 합니다.


   _**관리 콘솔에서 활성화**_

   ```
   Domain => Configuration => General => Advanced => Platform MBean Server Enabled
   ```

   _**서버 시작 스크립트에서 활성화**_

   ```yaml
   -Djavax.management.builder.initial=weblogic.management.jmx.mbeanserver.WLSMBeanServerBuilder
   ```

   자세한 내용은 [WebLogic 문서][3]를 참조하세요.


3. WebLogic Server Administration Console에서 [`PlatformMBeanServerUsed`][4] 속성 값이 `true`로 설정되어 있는지 확인합니다. WebLogic Server 버전 10.3.3.0 이상에서 기본값은 `true`입니다. 해당 설정은 WebLogic Server Administration Console에서 찾거나 WebLogic Scripting Tool(WSLT)로 구성할 수 있습니다.

   _**관리 콘솔에서 활성화**_

   ```
   Domain (<WEBLOGIC_SERVER>) => Configuration => General => (Advanced) => Platform MBeanServer Enabled
   ```

   _**WLST에서 활성화**_

   편집 세션을 시작합니다. 도메인의 JMX 디렉터리로 이동하여, `false`로 설정된 경우 `cmo.setPlatformMBeanServerUsed(true)`를 사용하여 속성을 활성화합니다.

   예시:
   ```
   # > java weblogic.WLST
   (wlst) > connect('weblogic','weblogic')
   (wlst) > edit()
   (wlst) > startEdit()
   (wlst) > cd('JMX/<DOMAIN_NAME>')
   (wlst) > set('EditMBeanServerEnabled','true')
   (wlst) > activate()
   (wlst) > exit()
   ```

   변경 사항을 활성화하고 WebLogic 서버를 재시작합니다.

### 구성

1. 다음 루트의 `conf.d/` 폴더에 있는 `weblogic.d/conf.yaml` 파일을 편집합니다.
   Agent 설정 디렉터리에서 WebLogic 성능 데이터 수집을 시작하세요.
   사용 가능한 모든 설정 옵션은 [weblogic.d/conf.yaml 샘플][5]을 참조하세요.

   본 점검은 인스턴스당 350개의 메트릭으로 제한됩니다. 반환되는 메트릭의 수는 Datadog Agent [상태 명령][6]을 실행할 때 표시됩니다.
   [구성][5]을 편집하여 원하는 메트릭을 지정할 수 있습니다.

   수집할 메트릭을 사용자 정의하는 자세한 방법은 [JMX Checks 문서][7]를 참조하세요.
   더 많은 메트릭을 모니터링하고 싶을 경우에는 [Datadog 지원팀][8]에 문의하세요.

2. [에이전트를 재시작합니다][9].

### 검증

[Agent의 `status` 하위 명령을 실행하여][6] Checks 섹션에서 `weblogic`를 찾습니다.

## 수집한 데이터

### 메트릭
{{< get-metrics-from-git "weblogic" >}}


### 로그 수집

1. WebLogic 로깅 서비스는 기본적으로 Java Logging API에 기반한 구현을 사용합니다. 다른 형식이 있는 경우 [통합 파이프라인][11]을 복제하여 편집하세요.

2. Datadog Agent에서 로그 수집은 기본적으로 비활성화되어 있으므로 `datadog.yaml` 파일에서 활성화합니다.
   ```yaml
   logs_enabled: true
   ```

3. `weblogic.d/conf.yaml` 파일에서 로그 구성 블록의 주석 처리를 제거하고 편집합니다. 환경에 따라 경로 및 서비스 파라미터 값을 변경합니다. 사용 가능한 모든 구성 옵션은 [weblogic.d/conf.yaml 샘플][5]을 참조하세요.
   ```yaml
    - type: file
      path: <DOMAIN_DIR>/servers/<ADMIN_SERVER_NAME>/logs/<ADMIN_SERVER_NAME>.log
      source: weblogic
      service: admin-server
      log_processing_rules:
        - type: multi_line
          name: new_log_start_with_date
          pattern: (\####)?<\w{3} (0?[1-9]|[12][0-9]|3[01]), \d{4}
    - type: file
      path: <DOMAIN_DIR>/servers/<ADMIN_SERVER_NAME>/logs/<DOMAIN_NAME>.log
      source: weblogic
      service: domain
      log_processing_rules:
        - type: multi_line
          name: new_log_start_with_date
          pattern: (\####)?<\w{3} (0?[1-9]|[12][0-9]|3[01]), \d{4}
    - type: file
      path: <DOMAIN_DIR>/servers/<SERVER_NAME>/logs/<SERVER_NAME>.log
      source: weblogic
      service: managed-server
      log_processing_rules:
        - type: multi_line
          name: new_log_start_with_date
          pattern: (\####)?<\w{3} (0?[1-9]|[12][0-9]|3[01]), \d{4}
    - type: file
      path: <DOMAIN_DIR>/servers/*/logs/access.log 
      source: weblogic
      service: http-access
      log_processing_rules:
        - type: multi_line
          name: new_log_start_with_date
          pattern: .*\[\d{2}\/(\w{3}|\w{4})\/\d{4}:\d{2}:\d{2}:\d{2} (\+|-)\d{4}\]
   ```
4. [에이전트를 재시작합니다][9].

### 컨테이너화
컨테이너화된 환경의 경우 [JMX를 사용한 Autodiscovery][12] 지침을 참조하세요.

### 이벤트

WebLogic 통합은 이벤트를 포함하지 않습니다.

### 서비스 점검
{{< get-service-checks-from-git "weblogic" >}}


## 트러블슈팅

도움이 필요하신가요? [Datadog 지원팀][8]에 문의하세요.


[1]: https://app.datadoghq.com/account/settings/agent/latest
[2]: https://docs.oracle.com/javase/8/docs/technotes/guides/management/agent.html#gdenl
[3]: https://support.oracle.com/cloud/faces/DocumentDisplay?_afrLoop=308314682308664&_afrWindowMode=0&id=1465052.1&_adf.ctrl-state=10ue97j4er_4
[4]: https://docs.oracle.com/en/middleware/standalone/weblogic-server/14.1.1.0/jmxcu/understandwls.html#GUID-1D2E290E-F762-44A8-99C2-EB857EB12387
[5]: https://github.com/DataDog/integrations-core/blob/master/weblogic/datadog_checks/weblogic/data/conf.yaml.example
[6]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/#agent-status-and-information
[7]: https://docs.datadoghq.com/ko/integrations/java/
[8]: https://docs.datadoghq.com/ko/help/
[9]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[10]: https://github.com/DataDog/integrations-core/blob/master/weblogic/metadata.csv
[11]: https://docs.datadoghq.com/ko/logs/processing/#integration-pipelines
[12]: https://docs.datadoghq.com/ko/agent/guide/autodiscovery-with-jmx/?tab=containerizedagent
[13]: https://github.com/DataDog/integrations-core/blob/master/weblogic/assets/service_checks.json