---
algolia:
  subcategory: Marketplace 통합
app_id: trek10-coverage-advisor
app_uuid: 2faacd70-a192-4a28-8b36-e55298d7b3b4
assets:
  integration:
    auto_install: false
    configuration: {}
    events:
      creates_events: true
    metrics:
      check: trek10.coverage.aws_metric_count
      metadata_path: metadata.csv
      prefix: trek10.coverage
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10114
    source_type_name: Trek10 AWS Coverage Advisor
  monitors:
    New unmonitored metric available: assets/monitors/monitor_new.json
    New unmonitored metric discovered: assets/monitors/monitor_existing.json
author:
  homepage: https://www.trek10.com
  name: Trek10
  sales_email: signup-trek10-coverage-advisor@trek10.com
  support_email: trek10-coverage-advisor@trek10.com
  vendor_id: trek10
categories:
- marketplace
- aws
custom_kind: integration
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: trek10_coverage_advisor
integration_id: trek10-coverage-advisor
integration_title: Trek10 AWS Coverage Advisor
integration_version: ''
is_public: true
legal_terms:
  eula: assets/eula.pdf
manifest_version: 2.0.0
name: trek10_coverage_advisor
pricing:
- billing_type: flat_fee
  includes_assets: true
  product_id: coverage-advisor
  short_description: Trek10 AWS Coverage Advisor 정액 요금
  unit_price: 100
public_title: Trek10 AWS Coverage Advisor
short_description: 120개 이상의 AWS 메트릭을 확인하여 모니터링 누락 점검
supported_os:
- 리눅스
- macos
- windows
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS::Linux
  - Supported OS::macOS
  - Supported OS::Windows
  - Category::Marketplace
  - Category::AWS
  - Offering::Integration
  - 제출한 데이터 유형::메트릭
  - Submitted Data Type::Events
  configuration: README.md#Setup
  description: 120개 이상의 AWS 메트릭을 확인하여 모니터링 누락 점검
  media:
  - caption: Trek10 Dashboard
    image_url: images/1600px-900px_maindashview_trek10_DDG_image.png
    media_type: image
  overview: README.md#Overview
  support: README.md#Support
  title: Trek10 AWS Coverage Advisor
  uninstallation: README.md#Uninstallation
---

<!--  SOURCED FROM https://github.com/DataDog/marketplace -->


## 개요
Coverage Advisor는 Datadog 계정의 중요한 AWS CloudWatch 메트릭을 모니터링합니다. 이 도구는 Datadog과 AWS를 사용해 클라우드 네이티브 운영을 한 다년간의 경험을 바탕으로, Trek10이 지속적으로 업데이트하는 모니터링 추천 데이터베이스를 기반으로 구축되었습니다. 커버리지 보고서, 대시보드, 신규 추천 알림을 통해 AWS 인프라가 변화함에 따라 모니터를 최신 상태로 유지할 수 있습니다.

가입 후, 이 통합에서 대시보드를 ​​Datadog 계정으로 복사합니다. 이에 따라 Datadog 추천 모니터 페이지에 두 개의 이벤트 모니터가 표시됩니다.

대시보드는 Datadog 계정 모니터링 상태를 보여주며, 모니터링되는 메트릭과 모니터링되지 않는 메트릭에 관한 보고서를 생성할 수 있습니다. Trek10이 해당 모니터 없이 중요한 AWS CloudWatch 메트릭을 새로 발견하면 첫 번째 이벤트 모니터에서 알림을 표시합니다.  또 사용 중인 AWS 서비스와 일치하는 새 CloudWatch 메트릭이 추천 목록에 추가되면 두 번째 이벤트 모니터에서 알림을 표시합니다.



*이 Datadog 도구에 관해 구체적인 요청이 있으신가요? Datadog 기반 플랫폼과 함께 24/7 AWS 관리형 서비스를 찾고 계신가요? AWS 또는 Datadog에 관한 전문 지식이 필요하신가요? 저희 [영업팀](https://trek10.com/contact)에 문의하세요.*

### 메트릭
* Trek10은 매일 밤 trek10.coverage.aws_metric_count라는 메트릭을 푸시합니다. 이 메트릭을 사용하면 현재 Datadog 계정으로 수집되고 있지만 모니터가 설정되지 않은 메트릭이 얼마나 되는지 확인할 수 있습니다. 메트릭에는 `all_metrics`, `metrics_monitored`, `monitoring_recommendations` 값으로 필터링할 수 있는 `metric_type` 태그가 있습니다.


### 이벤트
* Trek10은 모니터링되지 않는 서비스를 발견하면 이벤트를 푸시합니다. 이 이벤트를 통해 기본 대시보드로 돌아가 최근 추천 사항을 확인하고 보고서를 생성할 수 있습니다.


### 모니터
* Trek10은 모니터링되지 않은 서비스가 있을 때 알림을 제공하는 두 가지 모니터를 제공합니다.

### 대시보드
* Trek10은 중앙 집중식 고급 대시보드를 제공하여, 모니터링되지 않은 메트릭 수를 확인하고, 최근 추천 사항을 살펴보며, 모든 추천 사항을 PDF 보고서로 생성할 수 있습니다. 또한 통합 기능이 새 추천 사항을 제공하기 위해 고객 계정을 매일 밤 확인할지 여부를 제어할 수 있습니다.

### 사용량
이 통합을 사용하면 계정에 있는 AWS 메트릭 중 해당 모니터가 없는 메트릭을 빠르게 확인할 수 습니다. 매주 대시보드에서 확인하고 보고서를 생성할 수 있으며, 매일 알림을 받으려면 모니터를 설정하여 알림을 받을 수도 있습니다.

### 벤더 정보
* Trek10 
* 소개: 안녕하세요? 저희는 기술 전문가이자 개발자인 Trek10입니다. AWS와 Datadog을 오랫동안 사용해왔고, 여러 기업이 두 서비스를 채택하고 최적화할 수 있도록 전문 서비스와 교육을 지원해왔습니다. 저희는 AWS 관리형 서비스에서 주로 Datadog을 핵심 모니터링 도구로 활용합니다. 또 고객 계정에 새 모니터를 추가해야 할 때를 알려 주는 내부 도구를 고객의 용도에 맞게 수정하여 제공합니다.
* 웹사이트: trek10.com

## 지원
* 저희는 설정할 때 대시보드와 모니터를 고객 계정으로 복제합니다. 이 설정을 할 때 제공된 API 키를 사용합니다. 혹시 API 키를 회전하는 경우 trek10-coverage-advisor@trek10.com으로 문의해 주세요. 연동 관련 문제나 문의 사항은 trek10-coverage-advisor@trek10.com으로 이메일을 보내 주세요(안내에 따라 티켓을 접수).
* AWS 운영, 모니터링, 개발 등 모든 문의 사항은 다음 주소로 문의해 주세요.
    * 이메일(고객지원): trek10-coverage-advisor@trek10.com
    * 이메일(기타 문의): info@trek10.com
    * 웹사이트: https://www.trek10.com/contact








---
이 애플리케이션은 Datadog Marketplace를 통해 제공되며, Datadog Technology Partner의 지원을 받습니다. 사용하려면 <a href="https://app.datadoghq.com/marketplace/app/trek10-coverage-advisor" target="_blank">Marketplace에서 구매하세요</a>.