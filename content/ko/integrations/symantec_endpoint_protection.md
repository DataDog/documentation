---
app_id: symantec-endpoint-protection
app_uuid: e334ac09-0038-408b-8666-cba88c3217e6
assets:
  dashboards:
    Symantec Endpoint Protection - Application Control: assets/dashboards/symantec_endpoint_protection_application_control.json
    Symantec Endpoint Protection - Overview: assets/dashboards/symantec_endpoint_protection_overview.json
    Symantec Endpoint Protection - Risk: assets/dashboards/symantec_endpoint_protection_risk.json
    Symantec Endpoint Protection - Scan: assets/dashboards/symantec_endpoint_protection_scan.json
    Symantec Endpoint Protection - Security: assets/dashboards/symantec_endpoint_protection_security.json
    Symantec Endpoint Protection - System: assets/dashboards/symantec_endpoint_protection_system.json
    Symantec Endpoint Protection - Traffic: assets/dashboards/symantec_endpoint_protection_traffic.json
  integration:
    auto_install: false
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 26728495
    source_type_name: Symantec Endpoint Protection
  logs:
    source: symantec-endpoint-protection
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- 로그 수집
- security
custom_kind: 통합
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/symantec_endpoint_protection/README.md
display_on_public_website: true
draft: false
git_integration_title: symantec_endpoint_protection
integration_id: symantec-endpoint-protection
integration_title: Symantec Endpoint Protection
integration_version: 1.0.0
is_public: true
manifest_version: 2.0.0
name: symantec_endpoint_protection
public_title: Symantec Endpoint Protection
short_description: Symantec Endpoint Protection 로그에 관한 인사이트를 얻으세요.
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
  - Category::Log Collection
  - Category::Security
  - Offering::Integration
  - Submitted Data Type::Logs
  configuration: README.md#Setup
  description: Symantec Endpoint Protection 로그에 관한 인사이트를 얻으세요.
  media:
  - caption: Symantec Endpoint Protection - 개요
    image_url: images/symantec_endpoint_protection_overview.png
    media_type: 이미지
  - caption: Symantec Endpoint Protection - 스캔
    image_url: images/symantec_endpoint_protection_scan.png
    media_type: 이미지
  - caption: Symantec Endpoint Protection - 위험
    image_url: images/symantec_endpoint_protection_risk.png
    media_type: 이미지
  - caption: Symantec Endpoint Protection - 애플리케이션 제어
    image_url: images/symantec_endpoint_protection_application_control.png
    media_type: 이미지
  - caption: Symantec Endpoint Protection - 보안
    image_url: images/symantec_endpoint_protection_security.png
    media_type: 이미지
  - caption: Symantec Endpoint Protection - 시스템
    image_url: images/symantec_endpoint_protection_system.png
    media_type: 이미지
  - caption: Symantec Endpoint Protection - 트래픽
    image_url: images/symantec_endpoint_protection_traffic.png
    media_type: 이미지
  overview: README.md#Overview
  support: README.md#Support
  title: Symantec Endpoint Protection
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->
## 개요

[Symantec Endpoint Protection][1]은 네트워크의 노트북, 데스크탑, 서버를 맬웨어, 위험 및 취약성으로부터 보호하는 클라이언트-서버 솔루션입니다. Symantec Endpoint Protection은 바이러스 보호와 지능형 위협 보호를 결합하여 바이러스, 웜, 트로이 목마, 애드웨어 등 알려진 위협과 알려지지 않은 위협으로부터 클라이언트 컴퓨터를 선제적으로 보호합니다. Symantec Endpoint Protection은 루트킷, 제로데이 공격, 변종 스파이웨어 등 기존 보안 조치를 우회하는 가장 정교한 공격에 대해서도 보호 기능을 제공합니다.

이 통합은 Symantec Endpoint Protection에서 다음 로그를 보강하고 수집합니다.

- **감사 로그**: 정책 업데이트, 정책 할당 등과 같은 정책 변경 사항을 기록합니다.
- **위험 로그**: 맬웨어, 취약성, 의심스러운 활동 등 엔드포인트에서 탐지된 잠재적인 보안 위험을 추적하고 기록합니다.
- **스캔 로그**: 탐지된 맬웨어, 검사 설정, 사용자 정보를 포함한 바이러스 백신 검사 결과를 기록합니다.
- **시스템 로그**: 모든 관리 활동, 클라이언트 활동, 서버 활동 및 `client_server` 활동을 기록합니다.
- **보안 로그**: 공격, 규정 준수, 장치 제어 등 보안 관련 이벤트를 기록합니다.
- **애플리케이션 제어 로그**: 차단된 애플리케이션 또는 허용된 애플리케이션 등 애플리케이션 제어와 관련된 이벤트를 기록합니다.
- **트래픽 로그**: 수신 및 발신 연결, 프로토콜, 포트를 포함한 네트워크 트래픽 이벤트를 기록합니다.

또한 기본 제공되는 대시보드를 사용하여 위에서 언급한 로그의 자세한 인사이트를 시각화할 수 있습니다. 통합을 설치한 후에는 대시보드 목록에서 "symantec-endpoint-protection"을 검색하여 대시보드를 찾을 수 있습니다.

## 설정

### 설치

Symantec Endpoint Protection 통합을 설치하려면 다음 Agent 설치 명령을 실행하고 아래 단계를 따르세요. 자세한 내용은 [통합 관리 설명서][2]를 참조하세요.

**참고**: Agent 버전 7.52.0. 이상에서는 해당 단계를 수행할 필요가 없습니다.

Linux 명령:

  ```shell
  sudo -u dd-agent -- datadog-agent integration install datadog-symantec_endpoint_protection==1.0.0
  ```

### 설정

#### 로그 수집

1. 로그 수집은 기본적으로 Datadog 에이전트에서 비활성화되어 있습니다. `datadog.yaml`에서 활성화하세요.

    ```yaml
    logs_enabled: true
    ```

2. 이 구성 블록을 `symantec_endpoint_protection.d/conf.yaml` 파일에 추가하여 Symantec Endpoint Protection 로그 수집을 시작합니다.

    사용 가능한 구성 옵션은 [symantec_endpoint_protection.d/conf.yaml][2] 샘플을 참조하세요.

      ```yaml
      logs:
       - type: udp
         port: <PORT>
         service: symantec-endpoint-protection
         source: symantec-endpoint-protection
      ```

3. [에이전트를 다시 시작합니다][3].

4. Symantec Endpoint Protection 서버에서 Syslog Message Forwarding 구성:

    1. **Symantec Endpoint Protection 서버**에 접속합니다.
    2. **Admin**를 클릭합니다.
    3. **administrative** 패널에서 **servers**를 클릭합니다.
    4. 로그를 전달할 **사이트**를 선택합니다.
    5. **Configure external logging**을 클릭합니다.
    6. Syslog 서버로의 로그 전송을 활성화합니다.
    7. **syslog 로그 서버 IP**를 입력합니다.
    8. 네트워크 프로토콜을 **UDP**로 선택합니다.
    9. 로그를 전달할 **PORT**를 입력합니다.

### 검증

[Agent 상태 하위 명령][4]을 실행하고 확인 섹션에서 `symantec_endpoint_protection`을 찾습니다.

## 수집한 데이터

### 로그

Symantec Endpoint Protection 통합은 감사, 위험, 검사, 보안, 트래픽, 애플리케이션 제어 및 시스템 로그를 수집합니다.

### 메트릭

Symantec Endpoint Protection 통합에는 메트릭이 포함되어 있지 않습니다.

### 이벤트

Symantec Endpoint Protection 통합에는 이벤트가 포함되지 않습니다.

### 서비스 점검

Symantec Endpoint Protection 통합에는 서비스 점검이 포함되지 않습니다.

## 트러블슈팅

### 포트 바인딩 중 권한 거부됨

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

   2. [에이전트를 다시 시작합니다][3].

### 데이터가 수집되지 않음

방화벽이 활성화된 경우 구성된 포트에서 트래픽이 우회되는지 확인하세요.

### 이미 사용 중인 포트

**Port <PORT-NO\> Already in Use** 오류가 나타나면 다음 안내를 참조합니다. 하단은 PORT-NO = 514인 경우 예시입니다.

Syslog를 사용하는 시스템의 Agent가 포트 514에서 Cisco Secure Firewall 로그를 수신 대기 중인 경우, Agent 로그에 다음 오류가 나타날 수 있습니다. `Can't start UDP forwarder on port 514: listen udp :514: bind: address already in use`

이 오류는 기본적으로 Syslog가 포트 514에서 수신 대기하기 때문에 발생합니다. 이 오류를 해결하려면 다음 단계 중 **하나**를 수행하세요.

- Syslog를 비활성화합니다.
- 사용 가능한 다른 포트에서 수신하도록 Agent를 구성합니다.

도움이 필요하신가요? [Datadog 지원팀][5]에 문의하세요.

[1]: https://techdocs.broadcom.com/us/en/symantec-security-software/endpoint-security-and-management/endpoint-protection/all/what-is-v45096464-d43e1648.html
[2]: https://docs.datadoghq.com/ko/agent/guide/integration-management/?tab=linux#install
[3]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[4]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/#agent-status-and-information
[5]: https://docs.datadoghq.com/ko/help/