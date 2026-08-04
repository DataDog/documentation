---
app_id: bottomline-recordandreplay
app_uuid: d87fbcfa-71db-4d62-8264-5d88ba2338ce
assets:
  dashboards:
    Bottomline Record and Replay Overview: assets/dashboards/bottomline_activity_overview.json
  integration:
    auto_install: true
    configuration: {}
    events:
      creates_events: false
    metrics:
      check: bottomline.mainframe.activity.resource.duration
      metadata_path: metadata.csv
      prefix: bottomline.mainframe.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10324
    source_type_name: Bottomline Mainframe
  monitors:
    Resource response time is very slow: assets/monitors/bottomline_mainframe_resource_has_problem.json
author:
  homepage: https://www.bottomline.com/
  name: Bottomline Technologies
  sales_email: partner.cfrm@bottomline.com
  support_email: partner.cfrm@bottomline.com
  vendor_id: 결론
categories:
- 결론_메인프레임
custom_kind: integration
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/bottomline_recordandreplay/README.md
display_on_public_website: true
draft: false
git_integration_title: bottomline_recordandreplay
integration_id: bottomline-recordandreplay
integration_title: 'Bottomline의 Record and Replay: Mainframe'
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: bottomline_recordandreplay
public_title: 'Bottomline의 Record and Replay: Mainframe'
short_description: 네트워크 트래픽을 사용하여 3270/5250 Mainframe 사용자 및 리소스를 모니터링하세요.
supported_os:
- 리눅스
- windows
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - 카테고리::메인프레임
  - Offering::Integration
  - Supported OS::Linux
  - Supported OS::Windows
  configuration: README.md#Setup
  description: 네트워크 트래픽을 사용하여 3270/5250 Mainframe 사용자 및 리소스를 모니터링하세요.
  media:
  - caption: 메인프레임 레코드\u0008 기록 및 사용자 세션 재생
    image_url: images/mainframe_replay.png
    media_type: image
  - caption: Mainframe Record and Replay 대시보드
    image_url: images/bt_dashboard.png
    media_type: image
  - caption: Mainframe Record and Replay 개요
    image_url: images/bt_replay.png
    media_type: image
  - caption: Mainframe Record and Replay 아키텍처
    image_url: images/bt_architecture.png
    media_type: image
  overview: README.md#Overview
  support: README.md#Support
  title: 'Bottomline의 Record and Replay: Mainframe'
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## 개요

Bottomline의 Mainframe Record and Replay 솔루션은 네트워크 트래픽을 통해 3270/5250명의 사용자를 모니터링할 수 있는 비침습적 기능을 제공하여 고객이 사용자와 시스템을 모니터링하도록 지원합니다.

이 통합을 통해 Datadog에서 Bottomline의 Record and Replay 세션을 모니터링하여 리소스 사용률, 리소스 성능, 사용자 활동, 보안 이벤트 및 시스템 모니터에 대한 가시성을 확보할 수 있습니다. 고객은 Datadog를 통해 사용자 세션 재생에 직접 액세스할 수도 있습니다.

### 모니터

이 통합에는 Mainframe Resource에 문제가 발생했을 때 보고하는 모니터가 포함되어 있습니다.

### 메트릭

이 점검에서 제공하는 메트릭 목록은 [metadata.csv][1]를 참고하세요.

### 대시보드

**Bottomline Record and Replay Overview**: 이 대시보드는 어떤 리소스가 사용되고 있는지, 리소스 성능, 사용자 활동, 보안 이벤트, 시스템 모니터에 대한 가시성을 제공합니다.

## 설정

아래 단계별 안내를 따라, 호스트에서 실행 중인 Agent에 이 점검을 설치하고 구성하세요.

### 사전 필수 요건

이 통합을 올바로 실행하려면 다음 항목이 필요합니다.
  - Datadog Agent를 설치하고 실행 중이어야 합니다.
  - Bottomline의 Record and Replay를 설치하고 Datadog Agent 구성을 수정하기 위해 Datadog Agent를 실행하는 서버에 액세스할 수 있어야 합니다.
  - 지원되는 데이터베이스(Oracle 또는 Postgres).
  - Bottomline의 Enterprise Manager를 설치하여 Record and Replay를 구성할 수 있는 Windows 데스크톱


### 설정

Bottomline의 고객이 아닌가요? [Bottomline의 Marketplace 목록][2]을 참고해 라이선스를 구매하세요.

[여기][3]에 설명된 가이드를 따라 통합을 설치하세요.

## 지원
지원이나 기능 요청은 [Bottomline][4]에 문의하세요.


[1]: https://github.com/DataDog/integrations-extras/blob/master/bottomline_recordandreplay/metadata.csv
[2]: https://app.datadoghq.com/marketplace/app/bottomline-mainframe
[3]: https://github.com/nbk96f1/datadog/tree/main/Documentation
[4]: mailto:partner.cfrm@bottomline.com