---
app_id: sonicwall-firewall
app_uuid: f29dd27d-2c3b-46f0-a872-7e0d861aff54
assets:
  dashboards:
    Sonicwall Firewall - Anti Spam: assets/dashboards/sonicwall_firewall_anti_spam.json
    Sonicwall Firewall - Network: assets/dashboards/sonicwall_firewall_network.json
    Sonicwall Firewall - Overview: assets/dashboards/sonicwall_firewall_overview.json
    Sonicwall Firewall - Security Services: assets/dashboards/sonicwall_firewall_security_services.json
    Sonicwall Firewall - User: assets/dashboards/sonicwall_firewall_user.json
    Sonicwall Firewall - VPN: assets/dashboards/sonicwall_firewall_vpn.json
    Sonicwall Firewall and Firewall Settings: assets/dashboards/sonicwall_firewall_and_firewall_settings.json
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 27315184
    source_type_name: Sonicwall Firewall
  logs:
    source: sonicwall-firewall
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
- https://github.com/DataDog/integrations-core/blob/master/sonicwall_firewall/README.md
display_on_public_website: true
draft: false
git_integration_title: sonicwall_firewall
integration_id: sonicwall-firewall
integration_title: Sonicwall Firewall
integration_version: 1.0.0
is_public: true
manifest_version: 2.0.0
name: sonicwall_firewall
public_title: Sonicwall Firewall
short_description: Sonicwall Firewall 로그에 관한 인사이트를 얻으세요.
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
  description: Sonicwall Firewall 로그에 관한 인사이트를 얻으세요.
  media:
  - caption: Sonicwall Firewall - 개요
    image_url: images/sonicwall_firewall_overview.png
    media_type: 이미지
  - caption: Sonicwall Firewall - 네트워크
    image_url: images/sonicwall_firewall_network.png
    media_type: 이미지
  - caption: Sonicwall Firewall - 보안 서비스
    image_url: images/sonicwall_firewall_security_services.png
    media_type: 이미지
  - caption: Sonicwall Firewall - 사용자
    image_url: images/sonicwall_firewall_user.png
    media_type: 이미지
  - caption: Sonicwall Firewall - VPN
    image_url: images/sonicwall_firewall_vpn.png
    media_type: 이미지
  - caption: Sonicwall Firewall - 스팸 방지
    image_url: images/sonicwall_firewall_anti_spam.png
    media_type: 이미지
  - caption: Sonicwall Firewall - Firewall & Firewall 설정
    image_url: images/sonicwall_firewall_and_firewall_settings.png
    media_type: 이미지
  overview: README.md#Overview
  support: README.md#Support
  title: Sonicwall Firewall
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->
## 개요

[Sonicwall Firewall][1]은 광범위한 사이버 위협으로부터 조직을 보호하도록 설계된 네트워크 보안 솔루션입니다. 고급 보안 기능, 고성능 및 확장성을 제공하므로 모든 규모의 비즈니스에 적합합니다. SonicWall Firewall은 안전하고 효율적인 네트워크 트래픽 관리를 보장하면서 새로운 위협에 대한 실시간 보호 기능을 제공하는 것으로 잘 알려져 있습니다.

이 통합은 syslog를 통해 SonicWall Firewall이 공유하는 모든 로그 유형을 보강하고 관련된 시각화를 제공합니다. syslog에서 수신한 로그에 관한 자세한 인사이트는 기본 대시보드 및 탐지 규칙에 시각화됩니다.


## 설정

### 설치

Sonicwall Firewall 통합을 설치하려면 다음 Linux 명령을 실행하여 에이전트를 설치합니다.

**참고**: 에이전트 버전 >= 7.58.0에서는 해당 단계를 수행할 필요가 없습니다.

  ```shell
  sudo -u dd-agent -- datadog-agent integration install datadog-sonicwall-firewall==1.0.0
  ```

자세한 내용은 [통합 관리][2] 설명서를 참조하세요.

### 설정

#### 로그 수집

1.  로그 수집은 기본적으로 Datadog Agent에서 비활성화되어 있습니다. `datadog.yaml` 파일에서 활성화하세요.
    ```yaml
    logs_enabled: true
    ```

2. 이 구성 블록을 `sonicwall_firewall.d/conf.yaml` 파일에 추가하여 Sonicwall Firewall 로그 수집을 시작하세요.

    ```yaml
    logs:
      - type: udp
        port: <udp_port>
        source: sonicwall-firewall
    ```

    사용 가능한 구성 옵션은 [sample sonicwall_firewall.d/conf.yaml][3]을 참조하세요.

    **참고**: `<udp_port>`를 사용하여 SonicWall 방화벽에서 [syslog 서버][4]를 구성합니다.

    다음 옵션을 사용하여 방화벽에서 Syslog 서버를 구성합니다.

    - **이름 또는 IP 주소**: 이 통합을 실행하는 Datadog Agent 주소입니다.
    - **포트**: 이 통합에서 구성된 Syslog 포트(UDP)입니다.
    - **서버 유형**: Syslog 서버입니다.
    - **Syslog 형식**: 향상된 Syslog입니다.
    - **Syslog ID**: 여러 방화벽을 구분해야 하는 경우 이 기본값(방화벽)을 변경합니다.

    기본 시간을 UTC로 설정:

    - **Device** > **Log** > **Syslog**에서 **Syslog Settings** 탭을 선택한 다음**Display Syslog Timestamp in UTC**를 활성화합니다. **Accept**을 클릭하여 시간을 UTC로 설정합니다.

    추가 구성:

    - **Device** > **Log** > **Settings**에서 ***Logging Level** 및 **Alert Level**을 선택해 다양한 종류의 로그를 받을 수 있습니다.

3. [에이전트를 재시작하세요][5].

#### SonicWall Firewall 및 Datadog 로그 파이프라인에서 UTC가 아닌 다른 시간대를 지정합니다.
Datadog는 기본적으로 모든 로그가 UTC 표준 시간대에 있을 것으로 예상합니다. SonicWall Firewall 로그의 표준 시간대가 UTC가 아닌 경우, SonicWall Firewall Datadog 파이프라인에서 올바른 표준 시간대를 지정하세요.

SonicWall Firewall 파이프라인에 대한 표준 시간대 변경:

1. Datadog 앱에서 [**Pipelines** 페이지][6]로 이동합니다.

2. **Filter Pipelines** 검색창에 `SonicWall Firewall`을 입력합니다.

3. SonicWall Firewall 파이프라인 위로 마우스를 가져가서 **clone**을 클릭합니다. 그러면 SonicWall Firewall 파이프라인의 편집 가능한 복제본이 생성됩니다.

4. 다음 단계에 따라 Grok 파서를 편집합니다.

   - 복제된 파이프라인에서 **Grok Parser: Parsing Sonicwall FireWall time**이라는 이름의 프로세서를 찾습니다. 파이프라인 위로 마우스를 가져간 다음 **Edit**을 클릭합니다.
   - **Define parsing rules**에서:
      - 규칙을 수정하고 SonicWall Firewall 서버의 표준 시간대의 [TZ 식별자][7]를 입력합니다. 예를 들어, 표준 시간대가 IST인 경우 `' z'`를 `Asia/Calcutta`로 바꿉니다.
      - 예를 들어, 기존 규칙의 경우:

          ```shell
          rule %{date("yyyy-MM-dd HH:mm:ss z"):timestamp}
          ```

        IST 표준 시간대의 수정된 규칙인 경우:

          ```shell
          rule %{date("yyyy-MM-dd HH:mm:ss", "Asia/Calcutta"):timestamp}
          ```

      - 기존 로그 샘플을 업데이트하려면 **log samples**에서 확인하세요.
        - 기존 값에서 UTC를 제거합니다.
        - 예를 들어, 기존 값이 다음과 같은 경우:

              ```shell
              2024-09-11 06:30:00 UTC
              ```

              The updated value is:
              ```shell
              2024-09-11 06:30:00
              ```

    - **Update**를 클릭합니다.

### 검증

[Agent 상태 하위 명령][8]을 실행하고 확인 섹션에서 `sonicwall_firewall`을 찾습니다.

## 수집한 데이터

### 로그

|         형식          | 로그 유형    |
| --------------------    | -------------- |
| CEF(Enhanced Syslog)   | 전체          |

### 메트릭

SonicWall Firewall 통합에는 메트릭이 포함되어 있지 않습니다.

### 이벤트

SonicWall Firewall 통합에는 이벤트가 포함되지 않습니다.

### 서비스 점검
{{< get-service-checks-from-git "sonicwall_firewall" >}}


## 트러블슈팅

도움이 필요하신가요? [Datadog 고객 지원팀][10]에 문의해주세요.

[1]: https://www.sonicwall.com/
[2]: https://docs.datadoghq.com/ko/agent/guide/integration-management/?tab=linux#install
[3]: https://github.com/DataDog/integrations-core/blob/master/sonicwall_firewall/datadog_checks/sonicwall_firewall/data/conf.yaml.example
[4]: https://www.sonicwall.com/support/knowledge-base/how-can-i-configure-a-syslog-server-on-a-sonicwall-firewall/170505984096810
[5]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[6]: https://app.datadoghq.com/logs/pipelines
[7]: https://en.wikipedia.org/wiki/List_of_tz_database_time_zones
[8]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/#agent-status-and-information
[9]: https://github.com/DataDog/integrations-core/blob/master/sonicwall_firewall/assets/service_checks.json
[10]: https://docs.datadoghq.com/ko/help/