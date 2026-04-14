---
app_id: suricata
app_uuid: d5d0689e-8684-4663-b31b-d1947b7ccefd
assets:
  dashboards:
    Suricata - Alert: assets/dashboards/suricata_alert.json
    Suricata - Anomaly: assets/dashboards/suricata_anomaly.json
    Suricata - DHCP: assets/dashboards/suricata_dhcp.json
    Suricata - DNs: assets/dashboards/suricata_dns.json
    Suricata - Flow: assets/dashboards/suricata_flow.json
    Suricata - Network Protocols: assets/dashboards/suricata_network_protocols.json
    Suricata - Overview: assets/dashboards/suricata_overview.json
    Suricata - SMB (DCERPC, NTLMSSP, Kerberos): assets/dashboards/suricata_smb.json
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 17124993
    source_type_name: suricata
  logs:
    source: suricata
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- log collection
- security
- network
custom_kind: 통합
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/suricata/README.md
display_on_public_website: true
draft: false
git_integration_title: suricata
integration_id: suricata
integration_title: suricata
integration_version: 2.0.0
is_public: true
manifest_version: 2.0.0
name: suricata
public_title: suricata
short_description: Suricata 로그에서 인사이트를 얻으세요.
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
  - Category::Log Collection
  - Category::Security
  - Category::Network
  - Offering::Integration
  - Submitted Data Type::Logs
  configuration: README.md#Setup
  description: Suricata 로그에서 인사이트를 얻으세요.
  media:
  - caption: Suricata - 개요
    image_url: images/suricata_overview.png
    media_type: 이미지
  - caption: Suricata - 알림
    image_url: images/suricata_alert.png
    media_type: 이미지
  - caption: Suricata - 이상 항목
    image_url: images/suricata_anomaly.png
    media_type: 이미지
  - caption: Suricata - 플로
    image_url: images/suricata_flow.png
    media_type: 이미지
  - caption: Suricata - DNS
    image_url: images/suricata_dns.png
    media_type: 이미지
  - caption: Suricata - DHCP
    image_url: images/suricata_dhcp.png
    media_type: 이미지
  - caption: Suricata - 네트워크 프로토콜
    image_url: images/suricata_network_protocols.png
    media_type: 이미지
  - caption: Suricata - SMB (DCERPC, NTLMSSP, Kerberos)
    image_url: images/suricata_smb.png
    media_type: 이미지
  overview: README.md#Overview
  support: README.md#Support
  title: suricata
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->
## 개요

[Suricata][1]는 민간 및 공공 기관 대부분이 사용하는 고성능 개방형 소스 네트워크 분석 및 위협 탐지 소프트웨어로, 주요 공급업체가 자산을 보호할 목적으로 제품에 내장합니다.

본 통합은 알림, 이상, HTTP, DNS, FTP, FTP_DATA, TLS, TFTP, SMB, SSH, Flow, RDP, DHCP, ARP 로그 유형에 보강 및 시각화 기능을 제공합니다. 통합 기본 제공 대시보드에서 알림, 이상, 네트워크 연결, DNS, DHCP 활동에 관한 자세한 인사이트와 상세한 네트워크 프로토콜 분석을 시각화할 수 있습니다.

## 설정

### 설치

Suricata 통합을 설치하려면 다음 Agent 설치 명령을 실행하고 아래 단계를 따릅니다. 자세한 내용은 [통합 관리][2] 문서를 참조하세요.

**참고**: Agent 버전 7.57.0 이상에서는 이 단계가 필요하지 않습니다.

Linux의 경우 다음을 실행합니다.
  ```shell
  sudo -u dd-agent -- datadog-agent integration install datadog-suricata==1.0.0
  ```

### 설정

#### 로그 수집

1. Datadog 에이전트에서 로그 수집은 기본적으로 비활성화되어 있으므로 `datadog.yaml` 파일에서 활성화합니다.

   ```yaml
   logs_enabled: true
   ```

2. 이 설정 블록을 `suricata.d/conf.yaml` 파일에 추가하여 Suricata 로그 수집을 시작하세요.

   사용 가능한 모든 설정 옵션은 [suricata.d/conf.yaml 샘플][3]을 참조하세요.

   ```yaml
   logs:
     - type: file
       path: /var/log/suricata/eve.json
       service: suricata
       source: suricata
   ```
   **참고**: Suricata 애플리케이션 `suricata.yaml` 파일에서 `eve-log` 출력 로깅을 활성화하고 아래 항목을 처리했는지 확인하세요.
   1. `suricata.yaml` 파일에서, `filetype` 파라미터를 `eve-log` 구성에서 `regular`로 유지합니다.
   2. Suricata 출력 파일의 기본 경로는 `/var/log/suricata`, 기본 파일 이름은 `eve.json`입니다. 기본 경로와 파일 이름을 변경한 경우 `conf.yaml` 파일의 `path` 파라미터를 알맞게 업데이트하세요.

3. [Agent를 재시작합니다][4].

### 검증

[Agent의 상태 하위 명령을 실행][5]하고 Checks 섹션에서 `suricata`를 찾습니다.

## 수집한 데이터

### 로그

Suricata 통합은 다음 로그 유형을 수집합니다.

| 형식     | 이벤트 유형    |
| ---------  | -------------- |
| JSON | alert, anomaly, http, dns, ftp, ftp_data, tls. tftp, smb, ssh, flow, rdp, dhcp, arp|

### 메트릭

Suricata 통합은 메트릭을 포함하지 않습니다.

### 이벤트

Suricata 통합은 이벤트를 포함하지 않습니다.

### 서비스 점검

Suricata 통합은 서비스 점검을 포함하지 않습니다.

## 트러블슈팅

로그 파일을 모니터링하는 동안 **권한 거부** 오류가 표시되면 `dd-agent` 사용자에게 해당 파일 읽기 권한을 부여합니다.

  ```shell
  sudo chown -R dd-agent:dd-agent /var/log/suricata/eve.json
  ```

추가로 도움이 필요하면 [Datadog 지원 팀][6]에 문의하세요.

[1]: https://suricata.io/
[2]: https://docs.datadoghq.com/ko/agent/guide/integration-management/?tab=linux#install
[3]: https://github.com/DataDog/integrations-core/blob/master/suricata/datadog_checks/suricata/data/conf.yaml.example
[4]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[5]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/#agent-status-and-information
[6]: https://docs.datadoghq.com/ko/help/