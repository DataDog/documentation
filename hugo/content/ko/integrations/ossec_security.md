---
app_id: ossec-security
app_uuid: 595fcf0f-a306-43bf-a282-a729764961fa
assets:
  dashboards:
    OSSEC - Audit/Internal: assets/dashboards/ossec_audit_internal.json
    OSSEC - FTPD: assets/dashboards/ossec_ftpd.json
    OSSEC - Firewall: assets/dashboards/ossec_firewall.json
    OSSEC - Overview: assets/dashboards/ossec_overview.json
    OSSEC - PAM: assets/dashboards/ossec_pam.json
    OSSEC - SSHD: assets/dashboards/ossec_sshd.json
    OSSEC - Syslog: assets/dashboards/ossec_syslog.json
    OSSEC - Web: assets/dashboards/ossec_web.json
    OSSEC - Windows: assets/dashboards/ossec_windows.json
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 19889856
    source_type_name: ossec-security
  logs:
    source: ossec-security
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- 경고
- log collection
- security
custom_kind: 통합
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/ossec_security/README.md
display_on_public_website: true
draft: false
git_integration_title: ossec_security
integration_id: ossec-security
integration_title: ossec-security
integration_version: 2.0.0
is_public: true
manifest_version: 2.0.0
name: ossec_security
public_title: ossec-security
short_description: OSSEC 알림에 대한 인사이트를 얻으세요.
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  - Category::Alerting
  - Category::Log Collection
  - Category::Security
  - Offering::Integration
  - Submitted Data Type::Logs
  configuration: README.md#Setup
  description: OSSEC 알림에 대한 인사이트를 얻으세요.
  media:
  - caption: OSSEC - 내부 감사
    image_url: images/ossec_audit_internal.png
    media_type: 이미지
  - caption: OSSEC - 방화벽
    image_url: images/ossec_firewall.png
    media_type: 이미지
  - caption: OSSEC - 개요
    image_url: images/ossec_overview.png
    media_type: 이미지
  - caption: OSSEC - PAM
    image_url: images/ossec_pam.png
    media_type: 이미지
  - caption: OSSEC - SSHD
    image_url: images/ossec_sshd.png
    media_type: 이미지
  - caption: OSSEC - Syslog
    image_url: images/ossec_syslog.png
    media_type: 이미지
  - caption: OSSEC - 웹
    image_url: images/ossec_web.png
    media_type: 이미지
  - caption: OSSEC - Windows
    image_url: images/ossec_windows.png
    media_type: 이미지
  overview: README.md#Overview
  support: README.md#Support
  title: ossec-security
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## 개요

[OSSEC][1]은 오픈 소스 호스트 기반 침입 탐지 시스템입니다. 로그 분석, 무결성 검사, Windows 레지스트리 모니터링, 루트킷 탐지, 실시간 알림 및 능동적 대응을 수행합니다. 다양한 IT 인프라에서 보안 이벤트를 모니터링 및 관리하는 데 도움이 됩니다.

이 통합은 다음 유형의 로그를 수집합니다.
- FTPD
- 방화벽
- 시스템
- Syslog
- SSHD
- PAM
- 윈도우즈(Windows)
- 웹 액세스

즉시 사용 가능한 대시보드를 통해 이와 같은 로그에 관한 인사이트를 자세히 시각화하세요.

## 설정

### 설치

OSSEC Security 통합을 설치하려면 다음 Agent 설치 명령을 실행하고 아래 단계를 따르세요. 자세한 내용은 [통합 관리][2] 설명서를 참조하세요.

**참고**: Agent 버전 >= 7.57.0에서는 이 단계가 필요하지 않습니다.

Linux 명령
  ```shell
  sudo -u dd-agent -- datadog-agent integration install datadog-ossec_security==1.0.0
  ```

### 설정

#### 로그 수집

1. 로그 수집은 기본적으로 Datadog 에이전트에서 비활성화되어 있습니다. `datadog.yaml`에서 활성화하세요.

    ```yaml
    logs_enabled: true
    ```
2. 이 구성 블록을 `ossec_security.d/conf.yaml` 파일에 추가하여 로그 수집을 시작하세요.

    UDP 방법을 사용하여 OSSEC 알림 데이터를 수집합니다.
    사용 가능한 구성 옵션은 [샘플 ossec_security.d/conf.yaml][3]을 참조하세요.

    ```yaml
      logs:
      - type: udp
        port: <PORT>
        source: ossec-security
        service: ossec-security
    ```
    **참고**: 서비스 및 소스 값은 파이프라인의 작동에 필수적인 파라미터이기 때문에 변경하지 않는 것이 좋습니다.

3. [Agent를 재시작합니다][4].

#### OSSEC에서 syslog 메시지 전달 구성하기
  1. `/var/ossec/etc/ossec.conf`에 다음 구성을 추가합니다.

      이 예에서는 모든 알림이 포트 8080의 1.1.1.1로 JSON 형식으로 전송됩니다.
      ```xml
        <syslog_output>
          <server>1.1.1.1</server>
          <port>8080</port>
          <format>json</format>
        </syslog_output>
      ```

      * `server` 태그에는 Datadog Agent가 실행되고 있는 IP 주소가 포함되어야 합니다.

      * `port` 태그에는 Datadog Agent 수신 중인 포트가 포함되어야 합니다.

      참고: OSSEC Security 파이프라인은 JSON 형식의 로그만 파싱하므로 JSON 형식을 사용해야 합니다.

  2. client-syslog 프로세스를 활성화합니다.
      ```shell
      /var/ossec/bin/ossec-control enable client-syslog
      ```

  3. OSSEC 서비스를 다시 시작합니다.
      ```shell
      /var/ossec/bin/ossec-control restart
      ```

#### 방화벽 로그 수집을 사용합니다(선택 사항).
OSSEC 서버는 기본적으로 방화벽 알림 로그를 전달하지 않습니다. OSSEC 서버를 통해 방화벽 알림 로그를 전달하려면 아래 단계를 따르세요.

  1. `/var/ossec/rules/firewall_rules.xml`에서 `firewall_rules.xml` 파일을 찾습니다.

  2. `firewall_rules.xml`을 편집하여 파일에서 아래 줄의 모든 항목을 제거합니다.
  ```xml
  <options>no_log</options>
  ``` 

  3. OSSEC 서버를 다시 시작합니다.
  ```shell
  /var/ossec/bin/ossec-control restart
  ```

#### OSSEC Security Datadog 로그 파이프라인에서 UTC 외 표준 시간대를 지정합니다.

Datadog 는 기본적으로 모든 로그가 UTC 표준 시간대에 있을 것으로 예상합니다. OSSEC 로그의 표준 시간대가 UTC가 아닌 경우, OSSEC Security Datadog 파이프라인에서 올바른 표준 시간대를 지정하세요.

OSSEC Security 파이프라인에서 표준 시간대를 변경하는 방법:

  1. Datadog 앱에서 [**Pipelines** 페이지][5]로 이동합니다. 

  2. **Filter Pipelines** 검색창에 "OSSEC Security"을 입력합니다.

  3. OSSEC Security 파이프라인로 마우스를 가져가 **Clone** 버튼을 클릭합니다. 그러면 OSSEC Security 파이프라인의 편집 가능한 복제본이 생성됩니다.

  4. 다음 단계에 따라 Grok 파서를 편집합니다.
      - 복제된 파이프라인에서 "Grok Parser"라는 이름의 프로세서를 찾습니다. "Grok Parser: Parsing OSSEC alerts"이라는 이름의 프로세서를 찾아 파이프라인 위로 마우스를 가져간 다음 `Edit` 버튼을 클릭합니다.
      - **Define parsing rules**에서
        - `UTC` 문자열을 OSSEC 서버의 표준 시간대의 [TZ 식별자][6]로 변경합니다. 예를 들어, 시간대가 IST인 경우 값을`Asia/Calcutta`로 변경합니다.
      - **업데이트** 버튼을 클릭합니다.



### 검증

[Agent 상태 하위 명령][7]을 실행하고 확인 섹션에서 `ossec_security`를 찾습니다.

## 수집한 데이터

### 로그

| 형식     | 이벤트 유형    |
| ---------  | -------------- |
| JSON | syslog, sshd, pam, ossec, windows, firewall, ftpd, web_access |

### 메트릭

OSSEC Security 통합에는 메트릭이 포함되어 있지 않습니다.

### 이벤트

OSSEC Security 통합에는 이벤트가 포함되지 않습니다.

### 서비스 점검

OSSEC Security 통합에는 서비스 검사가 포함되어 있지 않습니다.

## 트러블슈팅

포트 바인딩 중 권한 거부됨

포트 바인딩 중 Agent 로그에 **Permission denied** 오류가 표시되는 경우,

1. 1024 아래 포트 넘버에 바인딩하려면 상위 권한이 필요합니다. `setcap` 명령을 사용하여 포트에 대한 액세스 권한을 부여합니다.
    ```shell
    sudo setcap CAP_NET_BIND_SERVICE=+ep /opt/datadog-agent/bin/agent/agent
    ```

2. `getcap` 명령을 실행하여 설정이 올바른지 확인합니다.

    ```shell
    sudo getcap /opt/datadog-agent/bin/agent/agent
    ```

    예상 결과:

    ```shell
    /opt/datadog-agent/bin/agent/agent = cap_net_bind_service+ep
    ```

    **참고:** Agent를 업그레이드할 때마다 이 `setcap` 명령을 다시 실행합니다.

3. [Agent를 재시작합니다][4].

**데이터가 수집되지 않음:**

방화벽이 활성화된 경우 구성된 포트에서 트래픽이 우회되는지 확인하세요.

**이미 사용 중인 포트:**

- **Port <PORT_NUMBER> Already in Use** 오류가 표시되면 다음 안내를 참조하세요. 아래는 포트 514에 대한 예시입니다.

- Syslog를 사용하는 시스템에서 Agent 포트 514에서 OSSEC 로그를 수신하는 경우 Agent 로그에 `Can't start UDP forwarder on port 514: listen udp :514: bind: address already in use` 오류가 나타날 수 있습니다. 이 오류는 기본적으로 Syslog가 포트 514에서 수신 대기하기 때문에 발생합니다. 이 오류를 해결하려면 다음 단계 중 **하나**를 수행하세요 .

    - Syslog를 비활성화합니다.
    - 사용 가능한 다른 포트에서 수신하도록 Agent를 구성합니다.


추가 도움이 필요하면 [Datadog 지원팀][8]에 문의하세요.

[1]: https://www.ossec.net/
[2]: https://docs.datadoghq.com/ko/agent/guide/integration-management/?tab=linux#install
[3]: https://github.com/DataDog/integrations-core/blob/master/ossec_security/datadog_checks/ossec_security/data/conf.yaml.example
[4]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[5]: https://app.datadoghq.com/logs/pipelines
[6]: https://en.wikipedia.org/wiki/List_of_tz_database_time_zones
[7]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/#agent-status-and-information
[8]: https://docs.datadoghq.com/ko/help/