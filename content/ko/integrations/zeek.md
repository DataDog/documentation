---
app_id: zeek
app_uuid: 81ba5f4a-0e85-48c3-9ba3-2e5ea37b1ed2
assets:
  dashboards:
    Corelight Suricata: assets/dashboards/corelight_suricata.json
    Zeek - Connections: assets/dashboards/zeek_connections.json
    Zeek - DHCP: assets/dashboards/zeek_dhcp.json
    Zeek - DNS: assets/dashboards/zeek_dns.json
    Zeek - Datared: assets/dashboards/zeek_datared.json
    Zeek - Detection: assets/dashboards/zeek_detection.json
    Zeek - Diagnostics: assets/dashboards/zeek_diagnostics.json
    Zeek - Files: assets/dashboards/zeek_files.json
    Zeek - Miscellaneous: assets/dashboards/zeek_miscellaneous.json
    Zeek - Network Observations: assets/dashboards/zeek_network_observations.json
    Zeek - Network Protocols: assets/dashboards/zeek_network_protocols.json
    Zeek - Network Protocols (NTP, SNMP, SSL): assets/dashboards/zeek_network_protocols_ntp_snmp_ssl.json
    Zeek - Syslog: assets/dashboards/zeek_syslog.json
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 6777560
    source_type_name: zeek
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- 로그 수집
- security
- network
custom_kind: 통합
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/zeek/README.md
display_on_public_website: true
draft: false
git_integration_title: zeek
integration_id: zeek
integration_title: Zeek
integration_version: 1.0.0
is_public: true
manifest_version: 2.0.0
name: zeek
public_title: Zeek
short_description: Zeek 로그 인사이트 확보 및 Cloud SIEM 연동
supported_os:
- linux
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS::Linux
  - Supported OS::macOS
  - Category::Log Collection
  - Category::Security
  - Category::Network
  - Offering::Integration
  - Submitted Data Type::Logs
  configuration: README.md#Setup
  description: Zeek 로그 인사이트 확보 및 Cloud SIEM 연동
  media:
  - caption: Zeek - Connections
    image_url: images/zeek_connections.png
    media_type: 이미지
  - caption: Zeek - DHCP
    image_url: images/zeek_dhcp.png
    media_type: 이미지
  - caption: Zeek - DNS
    image_url: images/zeek_dns.png
    media_type: 이미지
  - caption: Zeek - Network Protocols
    image_url: images/zeek_network_protocols.png
    media_type: 이미지
  - caption: Zeek - Detection
    image_url: images/zeek_detection.png
    media_type: 이미지
  - caption: Zeek - Diagnostics
    image_url: images/zeek_diagnostics.png
    media_type: 이미지
  - caption: Zeek - Files
    image_url: images/zeek_files.png
    media_type: 이미지
  - caption: Zeek - Network Observations
    image_url: images/zeek_network_observations.png
    media_type: 이미지
  overview: README.md#Overview
  support: README.md#Support
  title: Zeek
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->
## 개요

[Zeek][1]는 네트워크 보안 모니터링 플랫폼입니다. 네트워크에서 관찰한 트래픽을 해석하여, 핵심 정보만을 담은 고품질 트랜잭션 로그와 파일 콘텐츠를 생성합니다. 또한, 디스크에 저장해 수동으로 검토하거나, SIEM(Security and Information Event Management)과 같은 분석 친화적인 도구에서 활용할 수 있도록 완전히 사용자 정의된 출력 형식을 제공합니다.

본 통합은 다음 로그를 수집합니다.
- 연결 로그
- DNS 및 DHCP 로그
- 네트워크 프로토콜
- 파일
- 감지
- 기타 이벤트 유형

기본 제공 대시보드를 통해 네트워크 연결, DNS 및 DHCP 활동, 상세한 네트워크 프로토콜 분석, 파일 분석 및 인증서, 보안 감지 및 관찰, 컴플라이언스 모니터링을 보다 상세하게 시각화할 수 있습니다.

## 설정

### 설치

Zeek 통합을 설치하려면 다음 Agent 설치 명령과 아래 단계를 실행하세요. 자세한 내용은 [통합 관리][2] 문서를 참고하세요.

**참고**: Agent 버전 7.52.0. 이상에서는 해당 단계를 수행할 필요가 없습니다.

Linux 명령
  ```shell
  sudo -u dd-agent -- datadog-agent integration install datadog-zeek==1.0.0
  ```

#### Opensource Zeek
1. Zeek 머신에 [Agent를 설치합니다][3].
2. JSON 로깅용 [Corelight Zeek 플러그인][4]을 설치합니다.
    ```
    /opt/zeek/bin/zkg install corelight/json-streaming-logs
    ```
3. ZKG 패키지를 로드합니다.
    ```
    echo -e "\n# Load ZKG packages\n@load packages" >> /opt/zeek/share/zeek/site/local.zeek
    ```
4. Zeek를 재시작합니다.
    ```
    /opt/zeek/bin/zeekctl install
    ```
    ```
    /opt/zeek/bin/zeekctl restart
    ```

#### Corelight Zeek
* [Datadog Agent][3]를 설치하고 실행합니다.

### 설정

#### Opensource Zeek
1. 로그 수집은 기본적으로 Datadog 에이전트에서 비활성화되어 있습니다. `datadog.yaml`에서 활성화하세요.
    ```yaml
    logs_enabled: true
    ```

2. 이 구성 블록을 `zeek.d/conf.yaml` 파일에 추가하여 Zeek 로그 수집을 시작합니다.

    사용 가능한 구성 옵션은 [샘플 zeek.d/conf.yaml][5]을 참고하세요.

   ```yaml
    logs:
    - type: file
      path: /opt/zeek/logs/current/*.log
      exclude_paths:
        - /opt/zeek/logs/current/*.*.log
      service: zeek
      source: zeek
   ```

    **참고**: 모니터링 프로세스 중에 지원되지 않거나 원치 않는 로그 파일이 수집되는 것을 방지하려면 `exclude_paths` 파라미터 내에 로그 파일 경로를 포함하세요.


   ```yaml
    # 제외된 경로의 예
    exclude_paths:
      - /opt/zeek/logs/current/ntlm.log
      - /opt/zeek/logs/current/radius.log
      - /opt/zeek/logs/current/rfb.log
   ```

3. [에이전트를 재시작합니다][6].

#### Corelight Zeek
1. Datadog Agent에서는 로그 수집 기능이 기본적으로 비활성화되어 있습니다. datadog.yaml 파일에서 활성화하세요.
    ```yaml
    logs_enabled: true
    ```

2. 이 구성 블록을 `zeek.d/conf.yaml` 파일에 추가하여 Zeek 로그 수집을 시작합니다.
    ```yaml
    logs:
    - type: tcp
      port: <PORT>
      service: corelight
      source: zeek
    ```

3. [에이전트를 재시작합니다][6].

4. Corelight에서 Syslog 메시지 포워딩 구성
    1. 웹 브라우저를 열고 Corelight 센서의 IP 주소나 호스트 이름으로 이동합니다.
    2. 관리자 자격 증명으로 로그인합니다.
    3. Zeek 구성 페이지로 이동합니다. 정확한 경로는 센서 펌웨어 버전에 따라 다를 수 있습니다.
    4. "Zeek" 또는 "Logging"과 관련된 옵션을 찾습니다. 일반적인 경로는 다음과 같습니다.
      - Settings > Logging
      - Configuration > Zeek > Logging
    5. Zeek 로그의 Syslog 출력 활성화 옵션을 찾은 후, 체크박스 또는 토글을 선택하여 활성화합니다.
    6. Syslog 서버 세부 정보를 지정합니다. 다음 정보를 제공하세요.
       - **Syslog server IP address**: Zeek 로그를 보낼 대상.
       - **Syslog port**: Syslog 서버가 수신하는 포트(일반적으로 514).
       - **Facility**: 사용할 Syslog 퍼실리티.
       - **Severity level**: 전송할 이벤트의 최소 심각도 수준.
    7. **Save** 또는 **Apply** 버튼을 클릭하여 구성 변경 사항을 적용합니다.


### 검증

[Agent 상태 하위 명령을 실행][7]하고 Checks 섹션에서 `zeek`를 찾습니다.

## 수집한 데이터

### 로그

Zeek 통합은 다음과 같은 로그 유형을 수집합니다.

| 형식     | 이벤트 유형    |
| ---------  | -------------- |
| Opensource Zeek - JSON 형식 | conn, dhcp, dns, ftp, http, ntp, rdp, smtp, snmp, socks, ssh, ssl, syslog, tunnel, files, pe, intel, notice, signatures, traceroute, known-certs, known-modbus, known-services, known-hosts, software, x509, dpd, weird, captureloss, reporter, ldap, ldap-search, smb-files, smb-mappings |
| Corelight Zeek - Syslog RFC 3164 (레거시) 형식 | conn, dhcp, dns, ftp, http, ntp, rdp, smtp, snmp, socks, ssh, ssl, syslog, tunnel, files, pe, intel, notice, signatures, traceroute, known-certs, known-modbus, known-services, known-hosts, software, x509, dpd, weird, captureloss, reporter, ldap, ldap-search, smb-files, smb-mappings, conn-long, conn-red, encrypted-dns, generic-dns-tunnels, smtp-links, suricata-corelight |

### 메트릭

Zeek 통합은 메트릭을 포함하지 않습니다.

### 이벤트

Zeek 통합은 이벤트를 포함하지 않습니다.

### 서비스 점검

Zeek 통합은 서비스 점검을 포함하지 않습니다.

## 트러블슈팅

### Opensource Zeek:

로그 파일을 모니터링하는 동안 **권한 거부** 오류가 표시되면 `dd-agent` 사용자에게 해당 파일 읽기 권한을 부여합니다.

  ```shell
  sudo chown -R dd-agent:dd-agent /opt/zeek/current/
  ```

### Corelight Zeek:

포트 바인딩 중 권한 거부됨

포트 바인딩 중 Agent 로그에 **권한 거부** 오류가 표시되면 다음 지침을 참조하세요.

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

3. [에이전트를 재시작합니다][6].

**데이터가 수집되지 않음:**

방화벽이 활성화된 경우 구성된 포트에서 트래픽이 우회되는지 확인하세요.

**이미 사용 중인 포트:**

**Port <PORT-NO\> Already in Use** 오류가 나타나면 다음 안내를 참조합니다. 하단은 PORT-NO = 514인 경우 예시입니다.

Syslog를 사용하는 시스템의 Agent가 포트 514에서 Zeek 로그를 수신 대기 중인 경우, Agent 로그에 다음 오류가 나타날 수 있습니다. `Can't start UDP forwarder on port 514: listen udp :514: bind: address already in use`

이 오류는 기본적으로 Syslog가 포트 514에서 수신 대기하기 때문에 발생합니다. 이 오류를 해결하려면 다음 단계 중 **하나**를 수행하세요.
- Disable Syslog
- 사용 가능한 다른 포트에서 수신하도록 Agent 구성

추가 지원이 필요할 경우 [Datadog 지원팀][8]에 문의하세요.

[1]: https://zeek.org/
[2]: https://docs.datadoghq.com/ko/agent/guide/integration-management/?tab=linux#install
[3]: https://docs.datadoghq.com/ko/agent/
[4]: https://github.com/corelight/json-streaming-logs
[5]: https://github.com/DataDog/integrations-core/blob/master/cisco_secure_firewall/datadog_checks/cisco_secure_firewall/data/conf.yaml.example
[6]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[7]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/#agent-status-and-information
[8]: https://docs.datadoghq.com/ko/help/