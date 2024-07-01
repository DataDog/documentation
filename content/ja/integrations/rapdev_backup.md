---
"algolia":
  "subcategory": Marketplace Integrations
"app_id": "rapdev-backup"
"app_uuid": "f0a2c15e-9c53-4645-aedc-5a28af130308"
"assets":
  "integration":
    "auto_install": false
    "configuration":
      "spec": assets/configuration/spec.yaml
    "events":
      "creates_events": false
    "metrics":
      "check": []
      "metadata_path": metadata.csv
      "prefix": rapdev.backup
    "service_checks":
      "metadata_path": assets/service_checks.json
    "source_type_id": !!int "10194"
    "source_type_name": RapDev Backup
"author":
  "homepage": "https://www.rapdev.io"
  "name": RapDev
  "sales_email": ddsales@rapdev.io
  "support_email": support@rapdev.io
  "vendor_id": rapdev
"categories":
- marketplace
"custom_kind": "integration"
"dependencies": []
"display_on_public_website": true
"draft": false
"git_integration_title": "rapdev_backup"
"integration_id": "rapdev-backup"
"integration_title": "Backup Automator"
"integration_version": ""
"is_public": true
"legal_terms":
  "eula": assets/EULA.pdf
"manifest_version": "2.0.0"
"name": "rapdev_backup"
"pricing":
- "billing_type": flat_fee
  "includes_assets": true
  "product_id": backup
  "short_description": Flat fee for integration
  "unit_price": !!int "500"
"public_title": "Backup Automator"
"short_description": "Backup your Datadog dashboards, synthetics, monitors, and notebooks"
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
  "configuration": "README.md#Setup"
  "description": Backup your Datadog dashboards, synthetics, monitors, and notebooks
  "media": []
  "overview": "README.md#Overview"
  "support": "README.md#Support"
  "title": Backup Automator
  "uninstallation": "README.md#Uninstallation"
---

<!--  SOURCED FROM https://github.com/DataDog/marketplace -->


## Overview

The purpose of this Agent check is to create a zipped backup for a Datadog account's dashboards, Synthetic tests, monitors,
and notebooks. That backup can then be stored on a local machine or in one of the other supported platforms
(such as AWS, Azure, and GitHub).

## Data Collected

### Metrics

This integration does not include any metrics.

### Service Checks

This integration has the service check `rapdev.backup.can_connect` which returns `OK` if the Agent can communicate with the Datadog API otherwise it reports `CRITICAL`. 

### Events

This integration does not include any events.

## Support
For support or feature requests, contact RapDev.io through the following channels:

- Support: support@rapdev.io
- Sales: sales@rapdev.io
- Chat: [rapdev.io](https://www.rapdev.io/#Get-in-touch)
- Phone: 855-857-0222

---
Made with ❤️ in Boston

*This isn't the integration you're looking for? Missing a critical feature for your organization? Drop RapDev a [note](mailto:support@rapdev.io), and we'll build it!!*

[1]: https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[2]: https://docs.datadoghq.com/agent/guide/agent-commands/#agent-status-and-information
[3]: https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token
[4]: https://docs.datadoghq.com/account_management/api-app-keys/
[5]: https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_use_permissions-to-switch.html
[6]: https://docs.datadoghq.com/agent/guide/agent-v6-python-3/?tab=hostagent
[7]: https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_use_switch-role-ec2_instance-profiles.html
[8]: https://docs.aws.amazon.com/general/latest/gr/aws-sec-cred-types.html#access-keys-and-secret-access-keys
[9]: https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_use.html
[10]: https://boto3.amazonaws.com/v1/documentation/api/latest/guide/credentials.html

---
This application is made available through the Marketplace and is supported by a Datadog Technology Partner. <a href="https://app.datadoghq.com/marketplace/app/rapdev-backup" target="_blank">Click Here</a> to purchase this application.
