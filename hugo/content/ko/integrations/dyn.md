---
app_id: dyn
app_uuid: a5eea87b-1ed7-4ac2-b2ef-ffa2e7dc0a7f
assets:
  dashboards:
    dyn_screen: assets/dashboards/dyn_screen.json
  integration:
    auto_install: false
    events:
      creates_events: true
    metrics:
      check: dyn.qps
      metadata_path: metadata.csv
      prefix: dyn.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 79
    source_type_name: Dyn
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- network
custom_kind: 통합
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: dyn
integration_id: dyn
integration_title: Dyn
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: dyn
public_title: Dyn
short_description: '영역 모니터링: QPS 및 업데이트.'
supported_os: []
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::네트워크
  - Offering::Integration
  configuration: README.md#Setup
  description: '영역 모니터링: QPS 및 업데이트.'
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Dyn
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-internal-core -->
![Dyn 개요][1]

## 개요

<div class="alert alert-danger">
Oracle Cloud Infrastructure는 2016년에 Dyn을 인수하고 Dyn의 제품과 서비스를 Oracle Cloud Infrastructure 플랫폼에 통합했습니다. 서비스 마이그레이션에 대한 자세한 내용은 <a href="https://www.oracle.com/corporate/acquisitions/dyn/technologies/migrate-your-services/" target="_blank">Dyn 서비스를 Oracle Cloud Infrastructure로 마이그레이션</a>을 참조하세요.
</div>

고급 그래프와 이벤트로 영역을 모니터링하세요.

- 영역이 업데이트될 때 변경된 내용을 추적하세요.
- 고급 그래프 도구로 영역 또는 레코드 유형별로 만들어진 QPS를 분석합니다.

## 설정

### 설정

아직 Dyn에서 `datadog` 읽기 전용 사용자를 생성하지 않은 경우 [Dyn에 로그인][2]하고 다음 지침을 따릅니다.

1. 사용자 이름과 비밀번호를 선택합니다:
   ![dyn 사용자 생성][3]

2. *READONLY** 사용자 그룹을 선택합니다:
   ![dyn 그룹 선택][4]

3. **Add New User**를 클릭합니다:

Datadog 읽기 전용 사용자를 생성한 후:

1. 통합 타일을 사용하여 Datadog [Dyn 통합][5]을 구성합니다:
   ![Dyn 통합][6]

2. 이벤트와 `dyn.changes` 메트릭을 수집하려는 영역(_Zone Notes_)을 선택합니다:<br>

![Dyn 존][7]

Dyn `QPS` 메트릭은 기본적으로 모든 영역에 대해 수집됩니다.

<div class="alert alert-info">
Dyn 통합을 위해서는 IP ACL을 비활성화해야 합니다.
</div>

## 수집한 데이터

### 메트릭
{{< get-metrics-from-git "dyn" >}}


**참고**: `dyn.qps` 메트릭은 현재 시간으로부터 약 90분 후에 Datadog에 제공됩니다.

### 이벤트

Dyn 통합은 이벤트를 포함하지 않습니다.

### 서비스 점검

Dyn 통합은 서비스 점검을 포함하지 않습니다.

## 트러블슈팅

도움이 필요하신가요? [Datadog 지원팀][9]에 문의하세요.

[1]: images/dyn_overview.png
[2]: https://manage.dynect.net/login
[3]: images/create_dyn_user.png
[4]: images/choose_dyn_group.png
[5]: https://app.datadoghq.com/integrations/dyn
[6]: images/dyn_integration.png
[7]: images/dyn_zone.png
[8]: https://github.com/DataDog/dogweb/blob/prod/integration/dyn/dyn_metadata.csv
[9]: https://docs.datadoghq.com/ko/help/