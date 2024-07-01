---
"algolia":
  "subcategory": Marketplace Integrations
"app_id": "crest-data-systems-tenable-one-platform"
"app_uuid": "c6836683-9283-4e9e-ab31-c74998a0667b"
"assets":
  "dashboards":
    "CDS Tenable One Platform - IO - Asset Overview": assets/dashboards/cds_tenable_one_platform_io_asset_overview.json
    "CDS Tenable One Platform - IO - Plugins Overview": assets/dashboards/cds_tenable_one_platform_io_plugin_overview.json
    "CDS Tenable One Platform - IO - Vulnerability Overview": assets/dashboards/cds_tenable_one_platform_io_vulnerability_overview.json
    "CDS Tenable One Platform - SC - Asset Overview": assets/dashboards/cds_tenable_one_platform_sc_asset_overview.json
    "CDS Tenable One Platform - SC - Vulnerability Overview": assets/dashboards/cds_tenable_one_platform_sc_vulnerability_overview.json
    "CDS Tenable One Platform - Sc - Plugins Overview": assets/dashboards/cds_tenable_one_platform_sc_plugin_overview.json
  "integration":
    "auto_install": false
    "configuration":
      "spec": assets/configuration/spec.yaml
    "events":
      "creates_events": false
    "service_checks":
      "metadata_path": assets/service_checks.json
    "source_type_id": !!int "10358"
    "source_type_name": crest_data_systems_tenable_one_platform
"author":
  "homepage": "https://www.crestdata.ai"
  "name": Crest Data
  "sales_email": datadog-sales@crestdata.ai
  "support_email": datadog.integrations@crestdata.ai
  "vendor_id": crest-data-systems
"categories":
- marketplace
- network
- security
"custom_kind": "integration"
"dependencies": []
"display_on_public_website": true
"draft": false
"git_integration_title": "crest_data_systems_tenable_one_platform"
"integration_id": "crest-data-systems-tenable-one-platform"
"integration_title": "Tenable One Platform"
"integration_version": ""
"is_public": true
"legal_terms":
  "eula": assets/EULA.pdf
"manifest_version": "2.0.0"
"name": "crest_data_systems_tenable_one_platform"
"pricing":
- "billing_type": tag_count
  "includes_assets": true
  "metric": datadog.marketplace.crest_data_systems.tenable_one_platform
  "product_id": tenable-one-platform
  "short_description": Per tenable_one_platform asset per month
  "tag": asset_id
  "unit_label": Active Asset
  "unit_price": !!float "1.0"
"public_title": "Tenable One Platform"
"short_description": "Monitors Tenable (io and sc) vulnerabilities, plugins and assets"
"supported_os":
- linux
- windows
- macos
"tile":
  "changelog": CHANGELOG.md
  "classifier_tags":
  - "Supported OS::Linux"
  - "Supported OS::Windows"
  - "Supported OS::macOS"
  - "Category::Marketplace"
  - "Category::Network"
  - "Category::Security"
  - "Offering::Integration"
  - "Submitted Data Type::Logs"
  "configuration": "README.md#Setup"
  "description": Monitors Tenable (io and sc) vulnerabilities, plugins and assets
  "media":
  - "caption": CDS Tenable One Platform - IO - Vulnerability Overview
    "image_url": images/cds_tenable_one_platform_io_vulnerability_overview.png
    "media_type": image
  - "caption": CDS Tenable One Platform - IO - Asset Overview
    "image_url": images/cds_tenable_one_platform_io_asset_overview.png
    "media_type": image
  - "caption": CDS Tenable One Platform - IO - Plugins Overview
    "image_url": images/cds_tenable_one_platform_io_plugin_overview.png
    "media_type": image
  - "caption": CDS Tenable One Platform - SC - Vulnerability Overview
    "image_url": images/cds_tenable_one_platform_sc_vulnerability_overview.png
    "media_type": image
  - "caption": CDS Tenable One Platform - SC - Asset Overview
    "image_url": images/cds_tenable_one_platform_sc_asset_overview.png
    "media_type": image
  - "caption": CDS Tenable One Platform - SC - Plugins Overview
    "image_url": images/cds_tenable_one_platform_sc_plugin_overview.png
    "media_type": image
  "overview": "README.md#Overview"
  "support": "README.md#Support"
  "title": Tenable One Platform
  "uninstallation": "README.md#Uninstallation"
---

<!--  SOURCED FROM https://github.com/DataDog/marketplace -->


## Overview  

Tenable is a cybersecurity company that offers a variety of products and services to assist organizations in managing and reducing their cyber risk.

This integration supports Tenable.io and Tenable.sc.

**Tenable.io** is a cloud-based platform that offers continuous visibility and monitoring of an organization's assets, both on-premises and in the cloud. It combines vulnerability management, web application scanning, container security, and other capabilities to provide comprehensive security monitoring and risk assessment.

**Tenable.sc** is a comprehensive vulnerability management platform that provides continuous network monitoring, vulnerability assessment, and reporting capabilities. It helps organizations identify, assess, and prioritize vulnerabilities across their IT infrastructure, enabling effective remediation efforts.

This integration collects the following data:  
* Vulnerabilities
* Assets
* Plugins

## Upgrade Integration

  - Take the backup of your existing 'conf.yaml' file from your Datadog Agent's `crest_data_systems_tenable_one_platform.d` directory under `conf.d` directory.
  - Uninstall the current version of `crest_data_systems_tenable_one_platform` and install the latest version from the Datadog platform.
  - This latest version of the integration has more configuration parameters that give you more control over data collection and hence would need reconfiguration of conf.yaml for data collection to resume after the upgrade. You can refer to the example of `conf.yaml` from the `Set up conf.yaml` section that is mentioned above.
  > **NOTE**:
  > - Make sure your `conf.yaml` has all the parameters mentioned in the above `Set up conf.yaml` section. 
  > - Create a separate instance in order to collect data for each data type i.e. (vulns/assets/plugins) and make sure 'io_collect_assets' for IO and 'sc_collect_assets' for SC have been enabled in order to continue the other types of data collection.
  - For instance, if you want to collect IO data, update your `conf.yaml` as shown below, where there are different instances for different data types.
    - **Older Version 1.0.5**:
        ```yaml
        init_config:

        instances:
            - is_io_enabled: True
              io_access_key: <io-access-key>
              io_secret_key: <io-secret-key>
              is_sc_enabled: False
              min_collection_interval: 7200
        ```
    - **Newer Version 1.1.0**:
        ```yaml
        init_config:

        instances:
            - is_io_enabled: True
              io_access_key: <io-access-key>
              io_secret_key: <io-secret-key>
              is_sc_enabled: False
              io_collect_assets: True
              min_collection_interval: 7200
            - is_io_enabled: True
              io_access_key: <io-access-key>
              io_secret_key: <io-secret-key>
              is_sc_enabled: False
              io_collect_vulns: True
              min_collection_interval: 7200
            - is_io_enabled: True
              io_access_key: <io-access-key>
              io_secret_key: <io-secret-key>
              is_sc_enabled: False
              io_collect_plugins: True
              min_collection_interval: 7200     
        ```
  > **NOTE**: Checkpoint will be reset after the upgrade.

## Support

For support or feature requests, please contact Crest Data through the following channels:

- Support email: [datadog.integrations@crestdata.ai][5]
- Sales email: [datadog-sales@crestdata.ai][6]
- Website: [crestdata.ai][3]
- FAQ: [Crest Data Datadog Marketplace Integrations FAQ][12]

[1]: https://docs.datadoghq.com/agent/guide/agent-commands/?tab=agentv6v7#start-stop-and-restart-the-agent
[2]: https://docs.datadoghq.com/agent/guide/agent-commands/#agent-status-and-information
[3]: https://www.crestdata.ai/
[4]: https://docs.datadoghq.com/agent/guide/agent-configuration-files/?tab=agentv6v7
[5]: mailto:datadog.integrations@crestdata.ai
[6]: mailto:datadog-sales@crestdata.ai
[7]: https://docs.tenable.com/vulnerability-management/Content/Settings/my-account/GenerateAPIKey.htm
[8]: https://docs.tenable.com/security-center/6_1/Content/GenerateAPIKey.htm
[9]: https://docs.crestdata.ai/datadog-integrations-readme/Tenable_One_Platform.pdf
[10]: https://docs.datadoghq.com/agent/?tab=Linux
[11]: https://docs.datadoghq.com/account_management/api-app-keys/
[12]: https://docs.crestdata.ai/datadog-integrations-readme/Crest_Data_Datadog_Integrations_FAQ.pdf
---
This application is made available through the Marketplace and is supported by a Datadog Technology Partner. <a href="https://app.datadoghq.com/marketplace/app/crest-data-systems-tenable-one-platform" target="_blank">Click Here</a> to purchase this application.
