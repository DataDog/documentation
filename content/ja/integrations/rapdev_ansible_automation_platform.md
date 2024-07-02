---
"algolia":
  "subcategory": Marketplace Integrations
"app_id": "rapdev-ansible-automation-platform"
"app_uuid": "fe1cdb5a-023a-4489-80df-cf5e30031389"
"assets":
  "dashboards":
    "RapDev Ansible Automation Jobs Dashboard": assets/dashboards/rapdev_ansible_automation_jobs_dashboard.json
    "RapDev Ansible Automation Overview Dashboard": assets/dashboards/rapdev_ansible_automation_overview_dashboard.json
  "integration":
    "auto_install": false
    "configuration":
      "spec": assets/configuration/spec.yaml
    "events":
      "creates_events": false
    "metrics":
      "check": rapdev.ansible_automation_platform.organization_count
      "metadata_path": metadata.csv
      "prefix": rapdev.ansible_automation_platform.
    "service_checks":
      "metadata_path": assets/service_checks.json
    "source_type_id": !!int "14094161"
    "source_type_name": RapDev Ansible Automation Platform
  "monitors":
    "Ansible Job Failed": assets/monitors/ansible_job_failed.json
    "Ansible Node Capacity": assets/monitors/ansible_node_capacity.json
"author":
  "homepage": "https://www.rapdev.io"
  "name": RapDev
  "sales_email": ddsales@rapdev.io
  "support_email": support@rapdev.io
  "vendor_id": rapdev
"categories":
- marketplace
- developer tools
"custom_kind": "インテグレーション"
"dependencies": []
"display_on_public_website": true
"draft": false
"git_integration_title": "rapdev_ansible_automation_platform"
"integration_id": "rapdev-ansible-automation-platform"
"integration_title": "Ansible Automation Platform"
"integration_version": ""
"is_public": true
"legal_terms":
  "eula": assets/EULA.pdf
"manifest_version": "2.0.0"
"name": "rapdev_ansible_automation_platform"
"pricing":
- "billing_type": tag_count
  "includes_assets": true
  "metric": datadog.marketplace.rapdev.ansible_automation_platform
  "product_id": ansible-automation-platform
  "short_description": Unit price per Ansible execution node
  "tag": ansible_node_uuid
  "unit_label": Ansible Execution Node
  "unit_price": !!int "10"
"public_title": "Ansible Automation Platform"
"short_description": "Monitor Ansible Automation Platform Usage, Jobs, and Events"
"supported_os":
- linux
- windows
- macos
"tile":
  "changelog": CHANGELOG.md
  "classifier_tags":
  - "Category::Marketplace"
  - "Offering::Integration"
  - "Supported OS::Linux"
  - "Supported OS::Windows"
  - "Supported OS::macOS"
  - "Category::Developer Tools"
  - "Submitted Data Type::Metrics"
  "configuration": "README.md#Setup"
  "description": Monitor Ansible Automation Platform Usage, Jobs, and Events
  "media":
  - "caption": Ansible Automation Platform - Overview Dashboard
    "image_url": images/overview_dashboard.png
    "media_type": image
  - "caption": Ansible Automation Platform - Jobs Dashboard
    "image_url": images/jobs_dashboard.png
    "media_type": image
  "overview": "README.md#Overview"
  "support": "README.md#Support"
  "title": Ansible Automation Platform
  "uninstallation": "README.md#Uninstallation"
---

<!--  SOURCED FROM https://github.com/DataDog/marketplace -->


## Overview

Ansible Automation Platform makes it possible for users across an organization to share, vet, and manage automation content by means of a simple, powerful, and agentless technical implementation. This integration is pre-built with two dashboards, showing overall health of the various components of the Ansible Automation Controllers. Also, it includes metrics surrounding the status of the different types of jobs executed by the Automation Controller execution nodes. 

To help you get started with monitoring your Automation Platform environment, a monitor is included that alerts you when an Ansible Job run fails.


## Support
For support or feature requests, contact RapDev.io through the following channels:

- Support: [support@rapdev.io][6]
- Sales: sales@rapdev.io
- Chat: [rapdev.io][7]
- Phone: 855-857-0222

---
Made with ❤️ in Boston

*This isn't the integration you're looking for? Missing a critical feature for your organization? Drop RapDev a [note][6], and we'll build it!!*

[1]: https://docs.datadoghq.com/agent/kubernetes/integrations/
[2]: https://docs.ansible.com/automation-controller/4.0.0/html/quickstart/create_user.html
[3]: https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[4]: https://docs.datadoghq.com/agent/guide/agent-commands/#agent-status-and-information
[5]: https://docs.datadoghq.com/agent/guide/agent-commands/?tab=agentv6v7#restart-the-agent
[6]: mailto:support@rapdev.io
[7]: https://www.rapdev.io/#Get-in-touch
[8]: mailto:sales@rapdev.io

---
This application is made available through the Marketplace and is supported by a Datadog Technology Partner. <a href="https://app.datadoghq.com/marketplace/app/rapdev-ansible-automation-platform" target="_blank">Click Here</a> to purchase this application.
