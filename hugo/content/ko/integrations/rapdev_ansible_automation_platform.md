---
algolia:
  subcategory: Marketplace 통합
app_id: rapdev-ansible-automation-platform
app_uuid: fe1cdb5a-023a-4489-80df-cf5e30031389
assets:
  dashboards:
    RapDev Ansible Automation Jobs Dashboard: assets/dashboards/rapdev_ansible_automation_jobs_dashboard.json
    RapDev Ansible Automation Overview Dashboard: assets/dashboards/rapdev_ansible_automation_overview_dashboard.json
  integration:
    auto_install: false
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: rapdev.ansible_automation_platform.organization_count
      metadata_path: metadata.csv
      prefix: rapdev.ansible_automation_platform.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 14094161
    source_type_name: RapDev Ansible Automation Platform
  monitors:
    Ansible Job Failed: assets/monitors/ansible_job_failed.json
    Ansible Node has reached maximum capacity: assets/monitors/ansible_node_capacity.json
author:
  homepage: https://www.rapdev.io
  name: RapDev
  sales_email: ddsales@rapdev.io
  support_email: support@rapdev.io
  vendor_id: rapdev
categories:
- marketplace
- 개발 툴
custom_kind: integration
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: rapdev_ansible_automation_platform
integration_id: rapdev-ansible-automation-platform
integration_title: Ansible Automation Platform
integration_version: ''
is_public: true
legal_terms:
  eula: assets/EULA.pdf
manifest_version: 2.0.0
name: rapdev_ansible_automation_platform
pricing:
- billing_type: tag_count
  includes_assets: true
  metric: datadog.marketplace.rapdev.ansible_automation_platform
  product_id: ansible-automation-platform
  short_description: Ansible 실행 노드당 단가
  tag: ansible_node_uuid
  unit_label: Ansible 실행 노드
  unit_price: 10
public_title: Ansible Automation Platform
short_description: Ansible Automation Platform 사용, 작업 및 이벤트 모니터링
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Marketplace
  - 제공::통합
  - 지원 OS::Linux
  - 지원 OS::Windows
  - 지원 OS::macOS
  - Category::Developer Tools
  - Submitted Data Type::Metrics
  configuration: README.md#Setup
  description: Ansible Automation Platform 사용, 작업 및 이벤트 모니터링
  media:
  - caption: Ansible Automation Platform - Overview 대시보드
    image_url: images/overview_dashboard.png
    media_type: image
  - caption: Ansible Automation Platform - Jobs 대시보드
    image_url: images/jobs_dashboard.png
    media_type: image
  overview: README.md#Overview
  support: README.md#Support
  title: Ansible Automation Platform
  uninstallation: README.md#Uninstallation
---

<!--  SOURCED FROM https://github.com/DataDog/marketplace -->


## 개요

Ansible Automation Platform은 간단하고 강력하며 에이전트가 필요 없는 기술을 구현하여 조직 전체 사용자가 자동화 콘텐츠를 공유, 검토, 관리할 수 있도록 지원합니다. 이 통합은 Ansible Automation Controllers의 다양한 구성 요소의 전반적인 상태를 보여주는 두 개의 대시보드로 사전 구축되어 있습니다. 또한 Automation Controller 실행 노드에서 실행되는 다양한 유형의 작업 상태에 관한 메트릭도 포함되어 있습니다.

Automation Platform 환경 모니터링에 도움이 되도록 Ansible Job 실행 실패 시 알림을 보내는 모니터가 포함되어 있습니다.


## 지원
지원 또는 기능 요청은 다음 채널을 통해 RapDev.io에 문의해 주세요.

- 고객지원: [support@rapdev.io][6]
- 영업 팀: sales@rapdev.io
- 채팅: [rapdev.io][7]
- 전화: 855-857-0222

---
Made with ❤️ in Boston

*원하는 통합을 찾을 수 없나요? 조직에 필요한 핵심 기능이 빠져있나요? RapDev에 [메시지][6]를 보내주세요.*

[1]: https://docs.datadoghq.com/ko/agent/kubernetes/integrations/
[2]: https://docs.ansible.com/automation-controller/4.0.0/html/quickstart/create_user.html
[3]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[4]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/#agent-status-and-information
[5]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/?tab=agentv6v7#restart-the-agent
[6]: mailto:support@rapdev.io
[7]: https://www.rapdev.io/#Get-in-touch
[8]: mailto:sales@rapdev.io

---
이 애플리케이션은 Datadog Marketplace를 통해 제공되며 Datadog Technology Partner의 지원을 받습니다. 사용하려면 <a href="https://app.datadoghq.com/marketplace/app/rapdev-ansible-automation-platform" target="_blank">Marketplace에서 구매하세요</a>.