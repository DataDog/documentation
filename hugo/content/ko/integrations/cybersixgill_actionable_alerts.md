---
app_id: cybersixgill-actionable-alerts
app_uuid: b27feb80-b06f-4200-981a-e91a031d62e6
assets:
  dashboards:
    cybersixgill: assets/dashboards/cybersixgill_actionable_alerts_overview.json
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: true
    metrics:
      check: []
      metadata_path: metadata.csv
      prefix: cybersixgill_actionable_alerts.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10342
    source_type_name: cybersixgill_actionable_alerts
author:
  homepage: https://www.cybersixgill.com/
  name: Cybersixgill
  sales_email: info@cybersixgill.com
  support_email: support@cyebrsixgill.com
categories:
- 보안
- 이벤트 관리
custom_kind: integration
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/cybersixgill_actionable_alerts/README.md
display_on_public_website: true
draft: false
git_integration_title: cybersixgill_actionable_alerts
integration_id: cybersixgill-actionable-alerts
integration_title: Cybersixgill Actionable Alerts
integration_version: 1.0.1
is_public: true
manifest_version: 2.0.0
name: cybersixgill_actionable_alerts
public_title: Cybersixgill Actionable Alerts
short_description: 자산 활동을 모니터링하고 위협에 대한 실시간 경고를 제공하세요.
supported_os:
- 리눅스
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Offering::Integration
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  - 카테고리::보안
  - 카테고리::이벤트 관리
  - Submitted Data Type::Events
  configuration: README.md#Setup
  description: 자산 활동을 모니터링하고 위협에 대한 실시간 경고를 제공합니다.
  media:
  - caption: 경고 수 대시보드 이미지
    image_url: images/dashboard_count.PNG
    media_type: image
  - caption: 제목이 있는 이벤트 목록의 대시보드 이미지
    image_url: images/dashboard_emerging_alerts_count.PNG
    media_type: image
  - caption: 새 경고 수 대시보드 이미지
    image_url: images/dashboard_events_list.PNG
    media_type: image
  - caption: 임박한 경고 수 대시보드 이미지
    image_url: images/dashboard_imminent_alerts_count.PNG
    media_type: image
  overview: README.md#Overview
  support: README.md#Support
  title: Cybersixgill Actionable Alerts
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## 개요
Cybersixgill Actionable Alerts 검사는 IP 주소, 도메인, 취약성 및 VIP와 같은 심층 웹, 다크 웹 및 표면 웹에서 중요한 자산을 모니터링합니다. 심각도, 위협 유형, 설명, 포스트 스니펫, 권장 사항 및 평가를 포함한 컨텍스트가 포함된 경고를 받습니다. 이 통합은 위협의 우선순위를 지정하고 대응할 수 있는 대시보드를 제공합니다.

## 설정


### 설치

Cybersixgill Actionable Alerts 검사를 호스트에 설치하려면 다음을 수행하세요.
1. 컴퓨터에 [개발자 도구][1]를 설치합니다.
2. 패키지 빌드를 위해 `ddev release build cybersixgill_actionable_alerts` 명령을 실행합니다.
3. 호스트에 [Datadog Agent를 설치합니다][2].
4. Agent가 설치되면 다음 명령을 실행하여 통합을 설치합니다.
```
datadog-agent integration install -t datadog-cybersixgill-actionable-alerts==1.0.1
```

### 설정
5.  [Cybersixgill 지원팀][3]에 문의하여 Cybersixgill Developer Platform 액세스를 요청합니다.
6. Cybersixgill Developer Platform에 액세스할 수 있는 웰컴 이메일을 받습니다.
7. Cybersixgill Developer Platform 내에서 클라이언트 ID와 클라이언트 비밀번호를 생성합니다.
8. 클라이언트 ID와 클라이언트 비밀번호를 복사하여 Configuration.yaml 파일에 붙여넣습니다.
9. 최소 수집 간격(초)을 제공합니다 (예: `min_collection_interval: 3600`).

### 검증
[Datadog Events Explorer][4]에서 Cybersixgill 이벤트가 생성되었는지 확인합니다.

## 수집한 데이터

### 서비스 점검
{{< get-service-checks-from-git "cybersixgill-actionable-alerts" >}}


### 이벤트
이 통합은 API 유형 이벤트를 Datadog으로 보냅니다.

## 트러블슈팅
도움이 필요하신가요? [Cybersixgill 지원팀][3]에 문의하세요.


[1]: https://docs.datadoghq.com/ko/developers/integrations/new_check_howto/?tab=configurationtemplate#configure-the-developer-tool
[2]: https://app.datadoghq.com/account/settings/agent/latest
[3]: mailto:support@cybersixgill.com
[4]: https://app.datadoghq.com/event/explorer
[5]: https://github.com/DataDog/integrations-extras/blob/master/cybersixgill_actionable_alerts/assets/service_checks.json