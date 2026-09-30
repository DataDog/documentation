---
app_id: checkpoint-quantum-firewall
app_uuid: 4b6b8ef9-e079-4ee4-877e-8f4aafbf8a1d
assets:
  dashboards:
    'Checkpoint Quantum Firewall: Anti Bot': assets/dashboards/checkpoint_quantum_firewall_anti_bot.json
    'Checkpoint Quantum Firewall: Anti Exploit': assets/dashboards/checkpoint_quantum_firewall_anti_exploit.json
    'Checkpoint Quantum Firewall: Anti Malware': assets/dashboards/checkpoint_quantum_firewall_anti_malware.json
    'Checkpoint Quantum Firewall: Anti Ransomware': assets/dashboards/checkpoint_quantum_firewall_anti_ransomware.json
    'Checkpoint Quantum Firewall: Anti Spam & Email Security': assets/dashboards/checkpoint_quantum_firewall_anti_spam_and_email_security.json
    'Checkpoint Quantum Firewall: Anti Virus': assets/dashboards/checkpoint_quantum_firewall_anti_virus.json
    'Checkpoint Quantum Firewall: Application Control': assets/dashboards/checkpoint_quantum_firewall_application_control.json
    'Checkpoint Quantum Firewall: Audit': assets/dashboards/checkpoint_quantum_firewall_audit.json
    'Checkpoint Quantum Firewall: DLP': assets/dashboards/checkpoint_quantum_firewall_dlp.json
    'Checkpoint Quantum Firewall: Firewall': assets/dashboards/checkpoint_quantum_firewall_firewall.json
    'Checkpoint Quantum Firewall: HTTPS Inspection': assets/dashboards/checkpoint_quantum_firewall_https_inspection.json
    'Checkpoint Quantum Firewall: IPS': assets/dashboards/checkpoint_quantum_firewall_ips.json
    'Checkpoint Quantum Firewall: Identity Awareness': assets/dashboards/checkpoint_quantum_firewall_identity_awareness.json
    'Checkpoint Quantum Firewall: Threat Emulation': assets/dashboards/checkpoint_quantum_firewall_threat_emulation.json
    'Checkpoint Quantum Firewall: URL Filtering': assets/dashboards/checkpoint_quantum_firewall_url_filtering.json
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 6852689
    source_type_name: checkpoint-quantum-firewall
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- security
- network
custom_kind: 통합
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/checkpoint_quantum_firewall/README.md
display_on_public_website: true
draft: false
git_integration_title: checkpoint_quantum_firewall
integration_id: checkpoint-quantum-firewall
integration_title: Checkpoint Quantum Firewall
integration_version: 1.0.0
is_public: true
manifest_version: 2.0.0
name: checkpoint_quantum_firewall
public_title: Checkpoint Quantum Firewall
short_description: Checkpoint Quantum Firewall 로그에 관한 인사이트 얻기
supported_os:
- 윈도우즈(Windows)
- linux
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS::Windows
  - Supported OS::Linux
  - Supported OS::macOS
  - Category::Security
  - Category::Network
  - Offering::Integration
  - Submitted Data Type::Logs
  configuration: README.md#Setup
  description: Checkpoint Quantum Firewall 로그에 대한 인사이트 얻기
  media:
  - caption: Checkpoint Quantum Firewall - Audit
    image_url: images/checkpoint_quantum_firewall_audit.png
    media_type: 이미지
  - caption: Checkpoint Quantum Firewall - Application Control
    image_url: images/checkpoint_quantum_firewall_application_control.png
    media_type: 이미지
  - caption: Checkpoint Quantum Firewall - URL Filtering
    image_url: images/checkpoint_quantum_firewall_url_filtering.png
    media_type: 이미지
  - caption: Checkpoint Quantum Firewall - Identity Awareness
    image_url: images/checkpoint_quantum_firewall_identity_awareness.png
    media_type: 이미지
  - caption: Checkpoint Quantum Firewall - IPS
    image_url: images/checkpoint_quantum_firewall_ips.png
    media_type: 이미지
  - caption: Checkpoint Quantum Firewall - Firewall
    image_url: images/checkpoint_quantum_firewall_firewall.png
    media_type: 이미지
  - caption: Checkpoint Quantum Firewall - Threat Emulation
    image_url: images/checkpoint_quantum_firewall_threat_emulation.png
    media_type: 이미지
  - caption: Checkpoint Quantum Firewall - Anti Bot
    image_url: images/checkpoint_quantum_firewall_anti_bot.png
    media_type: 이미지
  overview: README.md#Overview
  support: README.md#Support
  title: Checkpoint Quantum Firewall
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->
## 개요

[Check Point Next Generation Firewall][1]은 보안 이벤트의 통합 관리와 애플리케이션 제어 및 IPS 보호 기능을 포함하는 보안 게이트웨이입니다. 추가 기능으로 Identity Awareness, URL Filtering, Anti-Bot, Anti-Virus, Anti-Spam 등이 있습니다.

이 통합은 URL Filtering logs, Anti Bot logs, Application Control, Firewall, Identity Awareness, IPS, Threat Emulation 및 기타 이벤트 유형을 통합 로그 파이프라인으로 수집하여 로그를 보강하고 데이터를 Datadog 표준 속성으로 정규화합니다. 본 통합은 허용 또는 차단된 URL, 봇 세부 정보, 액세스된 애플리케이션 데이터에 관한 인사이트, 방화벽이 생성한 이벤트, 컴퓨터 ID와 머신 IP 주소 간의 매핑 등 상세 인사이트가 포함된 대시보드를 시각화하여 제공합니다.

## 설정

### 설치

아래 단계에 따라 Checkpoint Quantum Firewall 통합을 설치합니다.

**참고**: Agent 버전 7.52.0. 이상에서는 해당 단계를 실행할 필요가 없습니다.

1. 1.0 릴리스(`checkpoint_quantum_firewall==1.0.0`)를 [설치][2]합니다.

### 설정

#### 로그 수집

**Checkpoint Quantum Firewall:**

1. Datadog 에이전트에서 로그 수집은 기본적으로 비활성화되어 있으므로 `datadog.yaml` 파일에서 활성화합니다.

   ```yaml
   logs_enabled: true
   ```

2. 이 구성 블록을 `checkpoint_quantum_firewall.d/conf.yaml` 파일에 추가하여 Checkpoint Quantum Firewall 로그 수집을 시작하세요.

   사용 가능한 모든 구성 옵션은 [checkpoint_quantum_firewall.d/conf.yaml 샘플][3]을 참조하세요.

   ```yaml
   logs:
     - type: tcp/udp
       port: <PORT>
       service: checkpoint-quantum-firewall
       source: checkpoint-quantum-firewall
   ```

3. [에이전트][4]를 다시 시작합니다.

4. Checkpoint Quantum Firewall에서 Syslog 메시지 포워딩을 구성합니다.
   1. 관리 서버/로그 서버의 명령줄에 연결합니다.
   2. Expert 모드에 로그인합니다. 관리자 자격 증명을 입력합니다(자격 증명을 입력하면 Expert 모드가 활성화됩니다).
   3. 내보낸 로그에 대한 새 대상을 구성하려면 다음 명령을 입력합니다.
      ```yaml
      cp_log_export add name <Name of Log Exporter Configuration> target-server <HostName or IP address of Target Server> target-port <Port on Target Server> protocol {tcp | udp} format json
      ```
      - 위의 명령에서 다음 Syslog 서버 세부 정보를 지정합니다.

        - name: Syslog 서버의 이름입니다(예: `datadog_syslog`).
        - target-server: Checkpoint Quantum Firewall 로그를 전송할 대상 서버입니다.
        - target-port: Syslog 서버가 수신 대기 중인 포트(보통 514)입니다.
        - protocol: 프로토콜 이름 또는 로그를 전송하는 데 사용할 프로토콜(TCP/UDP)입니다.
        - format: 포맷은 'json'이어야 합니다.
   4. Syslog 서버 구성을 저장 및 추가하려면 다음 명령을 사용하세요.
      ```yaml
      cp_log_export restart name <Name of Log Exporter Configuration>
      ```
   5. Syslog를 구성하는 방법에 대한 자세한 내용은 [Checkpoint documentation 문서][5]를 참조하세요.

### 검증

[Agent의 상태 하위 명령을 실행][6]하고 Checks 섹션에서 `checkpoint_quantum_firewall`을 찾습니다.

## 수집한 데이터

### 로그

Checkpoint Quantum Firewall 통합은 Firewall, URL Filtering, IPS, Identity Awareness, Application Control, Threat Emulation, Audit, Anti Ransomware, Anti Spam & Email Security, Anti Exploit, Anti Bot, Anti Virus, HTTPS Inspection, DLP, Anti Malware 로그를 수집합니다.

### 메트릭

Checkpoint Quantum Firewall 통합은 메트릭을 포함하지 않습니다.

### 이벤트

Checkpoint Quantum Firewall 통합은 이벤트를 포함하지 않습니다.

### 서비스 점검

Checkpoint Quantum Firewall 통합은 서비스 점검을 포함하지 않습니다.

## 트러블슈팅

**Checkpoint Quantum Firewall:**

#### 포트 바인딩 중 권한 거부됨

포트 바인딩 중 Agent 로그에 **Permission denied** 오류가 나타나면 다음 지침을 참조하세요.

1.  1024 아래 포트 넘버에 바인딩하려면 상위 권한이 필요합니다. 아래 지침에 따라 설정합니다.

    - `setcap` 명령을 사용하여 포트에 대한 액세스 권한을 부여합니다.

      ```
      sudo setcap CAP_NET_BIND_SERVICE=+ep /opt/datadog-agent/bin/agent/agent
      ```

    - `getcap` 명령을 실행하여 설정이 올바른지 확인합니다.

      ```
      sudo getcap /opt/datadog-agent/bin/agent/agent
      ```

      예상 결과:

      ```
      /opt/datadog-agent/bin/agent/agent = cap_net_bind_service+ep
      ```

      **참고:** Agent를 업그레이드할 때마다 이 `setcap` 명령을 다시 실행합니다.

2.  [에이전트][4]를 다시 시작합니다.

#### 데이터가 수집되지 않음

방화벽이 활성화된 경우 구성된 포트에서 트래픽이 우회되는지 확인하세요.

#### 이미 사용 중인 포트

**Port <PORT-NO\> Already in Use** 오류가 나타나면 다음 안내를 참조합니다. 하단은 PORT-NO = 514인 경우 예시입니다.

Syslog를 사용하는 시스템의 Agent가 포트 514에서 Checkpoint Quantum Firewall 로그를 수신 대기 중인 경우, Agent 로그에 다음 오류가 나타날 수 있습니다. `Can't start UDP forwarder on port 514: listen udp :514: bind: address already in use`

이 오류는 기본적으로 Syslog가 포트 514에서 수신 대기하기 때문에 발생합니다. 이 오류를 해결하려면 다음 단계 중 **하나**를 실행하세요.

- Syslog 비활성화
- 사용 가능한 다른 포트에서 수신하도록 Agent 구성

추가로 도움이 필요하면 [Datadog 지원 팀][7]에 문의하세요.

[1]: https://www.checkpoint.com/quantum/next-generation-firewall/
[2]: https://docs.datadoghq.com/ko/agent/guide/integration-management/?tab=linux#install
[3]: https://github.com/DataDog/integrations-core/blob/master/checkpoint_quantum_firewall/datadog_checks/checkpoint_quantum_firewall/data/conf.yaml.example
[4]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[5]: https://sc1.checkpoint.com/documents/R81.20/WebAdminGuides/EN/CP_R81.20_LoggingAndMonitoring_AdminGuide/Content/Topics-LMG/Log-Exporter-Configuration-in-CLI-Basic.htm?tocpath=Log%20Exporter%7CConfiguring%20Log%20Exporter%20in%20CLI%7C_____1
[6]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/#agent-status-and-information
[7]: https://docs.datadoghq.com/ko/help/