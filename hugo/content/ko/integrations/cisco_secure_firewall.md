---
app_id: cisco-secure-firewall
app_uuid: 15c8217d-1a43-4efb-a338-053fca68169d
assets:
  dashboards:
    Cisco Secure Firewall - Application and Identity-based Firewall: assets/dashboards/cisco_secure_firewall_application_and_identity_firewall.json
    Cisco Secure Firewall - Command Interface: assets/dashboards/cisco_secure_firewall_command_interface.json
    Cisco Secure Firewall - Failover: assets/dashboards/cisco_secure_firewall_failover.json
    Cisco Secure Firewall - IP Stack: assets/dashboards/cisco_secure_firewall_ip_stack.json
    Cisco Secure Firewall - Intrusion Protection System: assets/dashboards/cisco_secure_firewall_intrusion_protection_system.json
    Cisco Secure Firewall - OSPF and RIP Routing: assets/dashboards/cisco_secure_firewall_ospf_and_rip_routing.json
    Cisco Secure Firewall - Overview: assets/dashboards/cisco_secure_firewall_overview.json
    Cisco Secure Firewall - Resource Manager: assets/dashboards/cisco_secure_firewall_resource_manager.json
    Cisco Secure Firewall - SNMP: assets/dashboards/cisco_secure_firewall_snmp.json
    Cisco Secure Firewall - Security Events: assets/dashboards/cisco_secure_firewall_security_events.json
    Cisco Secure Firewall - Threat Detection: assets/dashboards/cisco_secure_firewall_threat_detection.json
    Cisco Secure Firewall - Transparent Firewall: assets/dashboards/cisco_secure_firewall_transparent_firewall.json
    Cisco Secure Firewall - User Authentication: assets/dashboards/cisco_secure_firewall_user_authentication.json
    Cisco Secure Firewall - VPN Failover: assets/dashboards/cisco_secure_firewall_vpn_failover.json
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 6690422
    source_type_name: cisco-secure-firewall
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- network
- security
- 로그 수집
custom_kind: 통합
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/cisco_secure_firewall/README.md
display_on_public_website: true
draft: false
git_integration_title: cisco_secure_firewall
integration_id: cisco-secure-firewall
integration_title: Cisco Secure Firewall
integration_version: 1.0.0
is_public: true
manifest_version: 2.0.0
name: cisco_secure_firewall
public_title: Cisco Secure Firewall
short_description: Cisco Secure Firewall 로그에 관한 인사이트 얻기
supported_os:
- linux
- 윈도우즈(Windows)
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  - Category::Network
  - Category::Security
  - Category::Log Collection
  - Submitted Data Type::Logs
  - Offering::Integration
  configuration: README.md#Setup
  description: Cisco Secure Firewall 로그에 대한 인사이트 얻기
  media:
  - caption: Cisco Secure Firewall - SNMP
    image_url: images/cisco_secure_firewall_snmp.png
    media_type: 이미지
  - caption: Cisco Secure Firewall - Application and Identity-based Firewall
    image_url: images/cisco_secure_firewall_application_and_identity_based_firewall.png
    media_type: 이미지
  - caption: Cisco Secure Firewall - Failover
    image_url: images/cisco_secure_firewall_failover.png
    media_type: 이미지
  - caption: Cisco Secure Firewall - Intrusion Protection System
    image_url: images/cisco_secure_firewall_intrusion_protection_system.png
    media_type: 이미지
  - caption: Cisco Secure Firewall - IP Stack
    image_url: images/cisco_secure_firewall_ip_stack.png
    media_type: 이미지
  - caption: Cisco Secure Firewall - Threat Detection
    image_url: images/cisco_secure_firewall_threat_detection.png
    media_type: 이미지
  - caption: Cisco Secure Firewall - Transparent Firewall
    image_url: images/cisco_secure_firewall_transparent_firewall.png
    media_type: 이미지
  - caption: Cisco Secure Firewall - User Authentication
    image_url: images/cisco_secure_firewall_user_authentication.png
    media_type: 이미지
  overview: README.md#Overview
  support: README.md#Support
  title: Cisco Secure Firewall
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->
## 개요

[Cisco Secure Firewall Threat Defense (FTD)][1]는 통합 관리 기능을 갖춘 위협 중심의 차세대 방화벽(NGFW)입니다. 공격 전, 도중, 후에 고급 위협 보호를 제공해 드립니다. [Cisco Secure Firewall Management Center (FMC)][2]는 온프레미스 및 가상 환경 모두에서의 Cisco Secure Firewall Threat Defense (FTD)용 중앙 집중식 이벤트 및 정책 관리자입니다.

본 통합은 Cisco Secure FMC를 사용하여 Cisco Secure FTD에서 다음 로그를 보강 및 수집합니다.
- 사용자 인증 로그
- SNMP 로그
- 페일오버 로그
- 투명 방화벽 로그
- 위협 탐지 로그
- 보안 이벤트
- IP 스택 로그
- 애플리케이션 방화벽 로그
- ID 기반 방화벽 로그
- 명령 인터페이스 로그
- OSPF 라우팅 로그
- RIP 라우팅 로그
- 리소스 관리자 로그
- VPN 페일오버 로그
- 침입 방지 시스템 로그
- 동적 액세스 정책
- IP 주소 할당

바로 사용할 수 있는 대시보드로 SNMP 요청, ID 기반 방화벽 로그, 실시간 위협 분석, 보안 탐지 및 관찰, 규정 준수 모니터링에 관한 상세 인사이트를 시각화하세요.

## 설정

### 설치

Cisco Secure Firewall 통합을 설치하려면 다음 Agent 설치 명령을 실행하고 아래 단계를 따릅니다. 자세한 내용은 [통합 관리 문서][3]를 참조하세요.

**참고**: Agent 버전 7.52.0. 이상에서는 해당 단계를 수행할 필요가 없습니다.

Linux 명령:
  ```shell
  sudo -u dd-agent -- datadog-agent integration install datadog-cisco_secure_firewall==1.0.0
  ```

### 설정

#### Cisco Secure Firewall

1. 로그 수집은 기본적으로 Datadog 에이전트에서 비활성화되어 있습니다. `datadog.yaml`에서 활성화하세요.
    ```yaml
    logs_enabled: true
    ```

2. 이 구성 블록을 `cisco_secure_firewall.d/conf.yaml` 파일에 추가하여 Cisco Secure Firewall 로그 수집을 시작하세요.

    사용 가능한 구성 옵션은 [cisco_secure_firewall.d/conf.yaml 샘플][3]을 참조하세요.

      ```yaml
      logs:
       - type: tcp/udp
         port: <PORT>
         service: cisco-secure-firewall
         source: cisco-secure-firewall
      ```

3. [에이전트][4]를 다시 시작합니다.

4. Cisco Secure Firewall Management Center에서 Syslog Message Forwarding을 구성합니다.

    1. **Devices > Platform Settings**를 선택하고 FTD 정책을 생성 또는 편집합니다.
    2. **Syslog > Logging Setup**를 선택합니다.
       - **Enable Logging**: Firepower Threat Defense 장치용 데이터 플레인 시스템 로깅을 활성화합니다.
       - **Enable Logging on the failover standby unit**: 사용 가능한 경우 Firepower Threat Defense 장치용 대기 장치 로깅을 활성화합니다.
       - **Save**을 클릭합니다.
    3. **Syslog > Syslog Settings**를 선택합니다.
       - Facility 드롭다운 목록에서 **LOCAL7(20)**을 선택합니다.
       - **Enable Timestamp on Syslog Messages** 확인란을 선택하여 메시지가 생성된 날짜와 시간을 Syslog 메시지에 포함할 수 있습니다.
       - Timestamp Format 드롭다운 목록에서 **RFC 5424 (yyyy-MM-ddTHH:mm:ssZ)**를 선택합니다.
       - Syslog 메시지에 디바이스 식별자를 추가하려면(메시지의 시작 부분에 배치) Enable Syslog Device ID 확인란을 선택한 다음 ID 유형을 선택합니다.
          - **Interface**: 어플라이언스가 메시지를 전송하는 인터페이스에 관계없이 선택한 인터페이스의 IP 주소를 사용합니다. 인터페이스를 식별하는 보안 영역을 선택합니다. 이 영역은 단일 인터페이스에 매핑되어야 합니다.
          - **User Defined ID**: 원하는 텍스트 문자열(최대 16자)을 사용합니다.
          - **Host Name**: 장치의 호스트 이름을 사용합니다.
       - **Save**을 클릭합니다.
    4. **Syslog > Syslog Server**를 선택합니다.
       - TCP 프로토콜을 사용하는 Syslog 서버가 다운된 경우 트래픽을 허용하려면**Allow user traffic to pass when TCP syslog server is down** 확인란을 선택합니다.
       - **Add**를 클릭하여 새 Syslog 서버를 추가합니다.
          - **IP Address** 드롭다운 메뉴에서 Syslog 서버의 IP 주소가 포함된 네트워크 호스트 오브젝트를 선택합니다.
          - 프로토콜(TCP 또는 UDP)을 선택하고 Firepower Threat Defense 기기와 Syslog 서버 간 통신용 포트 번호를 입력합니다.
          - 'Select Device Management Interface' 또는 'Security Zones or Named Interfaces'를 선택하여 Syslog 서버와 통신합니다.
            - Security Zones or Named Interfaces: 사용 가능한 영역 목록에서 인터페이스를 선택하고 'Add'를 클릭합니다.
          - **확인**을 클릭합니다.
       - **Save**을 클릭합니다.
    5. **Deploy > Deployment**로 이동하여 할당된 장치에 정책을 배포합니다. 변경 사항은 배포할 때까지 활성화되지 않습니다.


### 검증

[Agent 상태 하위 명령을 실행][5]하고 Checks 섹션에서 `cisco_secure_firewall`을 찾으세요.

## 수집한 데이터

### 로그

Cisco Secure Firewall 통합은 사용자 인증, SNMP, 페일오버, 투명 방화벽, IP 스택, 애플리케이션 방화벽, ID 기반 방화벽, 위협 탐지, 명령 인터페이스, 보안 이벤트, OSPF 라우팅, RIP 라우팅, 리소스 관리자, VPN 페일오버, 침입 방지 시스템 로그를 수집합니다.

### 메트릭

Cisco Secure Firewall 통합은 메트릭을 포함하지 않습니다.

### 이벤트

Cisco Secure Firewall 통합은 이벤트를 포함하지 않습니다.

### 서비스 점검

Cisco Secure Firewall 통합은 서비스 점검을 포함하지 않습니다.

## 트러블슈팅

### Cisco Secure Firewall

포트 바인딩 중 권한 거부됨

포트 바인딩 중 Agent 로그에 **권한 거부** 오류가 표시되면 다음 지침을 참조하세요.

   1. 1024 아래 포트 넘버에 바인딩하려면 상위 권한이 필요합니다. `setcap` 명령을 사용하여 포트에 대한 액세스 권한을 부여합니다.

      - `setcap` 명령을 사용하여 포트에 대한 액세스 권한을 부여합니다.

         ```shell
         sudo setcap CAP_NET_BIND_SERVICE=+ep /opt/datadog-agent/bin/agent/agent
         ```

      - `getcap` 명령을 실행하여 설정이 올바른지 확인합니다.

         ```shell
         sudo getcap /opt/datadog-agent/bin/agent/agent
         ```

         예상 결과:

         ```shell
         /opt/datadog-agent/bin/agent/agent = cap_net_bind_service+ep
         ```

         **참고:** Agent를 업그레이드할 때마다 이 `setcap` 명령을 다시 실행합니다.

   2. [에이전트][4]를 다시 시작합니다.

**데이터가 수집되지 않음:**

방화벽이 활성화된 경우 구성된 포트에서 트래픽이 우회되는지 확인하세요.

**이미 사용 중인 포트:**

**Port <PORT-NO\> Already in Use** 오류가 나타나면 다음 안내를 참조합니다. 하단은 PORT-NO = 514인 경우 예시입니다.

Syslog를 사용하는 시스템의 Agent가 포트 514에서 Cisco Secure Firewall 로그를 수신 대기 중인 경우, Agent 로그에 다음 오류가 나타날 수 있습니다. `Can't start UDP forwarder on port 514: listen udp :514: bind: address already in use`

이 오류는 기본적으로 Syslog가 포트 514에서 수신 대기하기 때문에 발생합니다. 이 오류를 해결하려면 다음 단계 중 **하나**를 수행하세요.
- Syslog를 비활성화합니다.
- 사용 가능한 다른 포트에서 수신하도록 Agent를 구성합니다.

추가로 도움이 필요하면 [Datadog 지원팀][6]에 문의하세요.

[1]: https://www.cisco.com/c/en/us/support/security/firepower-ngfw/series.html
[2]: https://www.cisco.com/c/en/us/products/collateral/security/firesight-management-center/datasheet-c78-736775.html
[3]: https://docs.datadoghq.com/ko/agent/guide/integration-management/?tab=linux#install
[4]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[5]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/#agent-status-and-information
[6]: https://docs.datadoghq.com/ko/help/