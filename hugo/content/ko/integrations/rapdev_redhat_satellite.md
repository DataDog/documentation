---
algolia:
  subcategory: Marketplace 통합
app_id: rapdev-redhat-satellite
app_uuid: fad53c37-82aa-466c-a2b6-cfa27a6c7d45
assets:
  dashboards:
    RapDev RedHat Satellite Inventory Dashboard: assets/dashboards/inventory_dashboard.json
    RapDev RedHat Satellite OpenMetrics Dashboard: assets/dashboards/openmetrics_dashboard.json
    RapDev RedHat Satellite Tasks & Jobs Dashboard: assets/dashboards/tasks_&_jobs_dashboard.json
  integration:
    auto_install: false
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check:
      - rapdev.redhat_satellite.openmetrics.http_requests.count
      - rapdev.redhat_satellite.organization.count
      metadata_path: metadata.csv
      prefix: rapdev.redhat_satellite.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 14094169
    source_type_name: RapDev RedHat Satellite
  logs:
    source: rapdev_redhat_satellite
  monitors:
    RedHat Satellite Foreman Task Failed: assets/monitors/foreman_task_failure.json
    RedHat Satellite HTTP has 5xx Errors: assets/monitors/5xx_errors.json
    RedHat Satellite Job has failed: assets/monitors/job_invocation_failure.json
    RedHat Satellite Prometheus Connection Failing: assets/monitors/openmetrics_connection.json
author:
  homepage: https://www.rapdev.io
  name: RapDev
  sales_email: ddsales@rapdev.io
  support_email: support@rapdev.io
  vendor_id: rapdev
categories:
- marketplace
- 개발 툴
- 설정 및 배포
- log collection
- 메트릭
custom_kind: integration
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: rapdev_redhat_satellite
integration_id: rapdev-redhat-satellite
integration_title: RedHat Satellite
integration_version: ''
is_public: true
legal_terms:
  eula: assets/EULA.pdf
manifest_version: 2.0.0
name: rapdev_redhat_satellite
pricing:
- billing_type: tag_count
  includes_assets: true
  metric: datadog.marketplace.rapdev.redhat_satellite
  product_id: redhat-satellite
  short_description: RedHat Satellite 인스턴스당 단위 요금
  tag: satellite_host
  unit_label: RedHat Satellite 인스턴스
  unit_price: 1000
public_title: RedHat Satellite
short_description: RedHat Satellite 상태 및 성능 모니터링
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Marketplace
  - Category::Developer Tools
  - 카테고리::설정 및 배포
  - 카테고리::로그 수집
  - Category::Metrics
  - 제공::통합
  - 지원 OS::Linux
  - 지원 OS::Windows
  - 지원 OS::macOS
  - Submitted Data Type::Metrics
  - 제출한 데이터 유형::로그
  configuration: README.md#Setup
  description: RedHat Satellite 상태 및 성능 모니터링
  media:
  - caption: Satellite OpenMetrics 대시보드
    image_url: images/openmetrics_dashboard.png
    media_type: 이미지
  - caption: Satellite Inventory 대시보드
    image_url: images/inventory_dashboard.png
    media_type: 이미지
  - caption: Satellite Tasks & Jobs 대시보드
    image_url: images/tasks_jobs_dashboard.png
    media_type: 이미지
  overview: README.md#Overview
  support: README.md#Support
  title: RedHat Satellite
  uninstallation: README.md#Uninstallation
---

<!--  SOURCED FROM https://github.com/DataDog/marketplace -->


## 개요

RedHat Satellite는 인프라 관리 제품으로 조직이 관리 기준을 준수하고 보안을 유지하면서 RedHat 인프라를 효율적으로 실행할 수 있도록 해줍니다. 본 통합에는 기본 제공 대시보드 여러 개가 포함되어 있어, 콘텐츠 호스트 수정 사항, Foreman 작업, 작업 호출 상태, Satellite 서비스 상태 등, RedHat Satellite의 다양한 구성 요소의 전반적인 상태를 알 수 있습니다.

RedHat Satellite 애플리케이션 모니터링을 시작할 수 있도록, 본 통합에는 또한 기본 제공 모니터와 Satellite 관련 로그 파일 처리용 로그 파이프라인이 포함되어 있습니다.

본 통합은 Foreman v1.24.1.32를 실행하는 Satellite v6.7.5에서 테스트되었으며, 이전 주 버전에서의 작동을 보장하지 않습니다.


## 지원
지원 또는 기능 요청은 다음 채널을 통해 RapDev.io에 문의해 주세요.

- 고객지원: [support@rapdev.io][7]
- 영업 팀: sales@rapdev.io
- 채팅: [rapdev.io][8]
- 전화: 855-857-0222

---
Made with ❤️ in Boston

*원하는 통합을 찾을 수 없나요? 조직에 필요한 중요 기능이 빠져 있나요? RapDev에 [메시지][7]를 보내 주시면 빌드해 드립니다!!*

[0]: https://docs.datadoghq.com/ko/agent/kubernetes/integrations/
[1]: https://access.redhat.com/documentation/en-us/red_hat_satellite/6.7/html/monitoring_red_hat_satellite/installing-pcp-packages_monitoring-guide#configure-pcp-data-collection_monitoring-guide
[2]: https://access.redhat.com/documentation/en-us/red_hat_satellite/6.7/html-single/administering_red_hat_satellite/index#creating-a-user_admin
[3]: https://access.redhat.com/documentation/en-us/red_hat_satellite/6.7/html-single/administering_red_hat_satellite/index#creating-a-role_admin
[4]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[5]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/#agent-status-and-information
[6]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/?tab=agentv6v7#restart-the-agent
[7]: mailto:support@rapdev.io
[8]: https://www.rapdev.io/#Get-in-touch
[9]: mailto:sales@rapdev.io
---
이 애플리케이션은 Datadog Marketplace를 통해 제공되며 Datadog 기술 파트너의 지원을 받습니다. 사용하려면 <a href="https://app.datadoghq.com/marketplace/app/rapdev-redhat-satellite" target="_blank">Marketplace에서 이 애플리케이션을 구매하세요</a>.