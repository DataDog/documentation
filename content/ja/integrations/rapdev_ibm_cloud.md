---
"algolia":
  "subcategory": Marketplace Integrations
"app_id": "rapdev-ibm-cloud"
"app_uuid": "4ac8d719-9aff-4b83-8bb4-8341ccc7b74e"
"assets":
  "dashboards":
    "RapDev IBM Cloud: Auxiliary Services": assets/dashboards/rapdev_ibm_cloud_auxiliary_services.json
    "RapDev IBM Cloud: Code Engine": assets/dashboards/rapdev_ibm_cloud_code_engine.json
    "RapDev IBM Cloud: Containers API": assets/dashboards/rapdev_ibm_cloud_containers_api.json
    "RapDev IBM Cloud: VPC API": assets/dashboards/rapdev_ibm_cloud_vpc_api.json
  "integration":
    "auto_install": false
    "configuration":
      "spec": assets/configuration/spec.yaml
    "events":
      "creates_events": false
    "metrics":
      "check": rapdev.ibm_cloud.vpc.count
      "metadata_path": metadata.csv
      "prefix": rapdev.ibm_cloud
    "service_checks":
      "metadata_path": assets/service_checks.json
    "source_type_id": !!int "10415"
    "source_type_name": RapDev IBM Cloud
  "logs": {}
  "monitors":
    "IBM Cloud Integration is Unable to Run": assets/monitors/ibm_cloud_api_connection.json
"author":
  "contact_link": "https://meetings.hubspot.com/ewilliams/rapdev-marketplace"
  "homepage": "https://www.rapdev.io"
  "name": RapDev
  "sales_email": ddsales@rapdev.io
  "support_email": support@rapdev.io
  "vendor_id": rapdev
"categories":
- marketplace
- cloud
- containers
- provisioning
- orchestration
"custom_kind": "integration"
"dependencies": []
"display_on_public_website": true
"draft": false
"git_integration_title": "rapdev_ibm_cloud"
"integration_id": "rapdev-ibm-cloud"
"integration_title": "IBM Cloud"
"integration_version": ""
"is_public": true
"legal_terms":
  "eula": assets/EULA.pdf
"manifest_version": "2.0.0"
"name": "rapdev_ibm_cloud"
"pricing":
- "billing_type": tag_count
  "includes_assets": true
  "metric": datadog.marketplace.rapdev.ibm_cloud
  "product_id": ibm-cloud
  "short_description": Unit price per billable IBM Cloud Entity
  "tag": billable_entity
  "unit_label": Billable VPC, K8s, or Code Engine Entity
  "unit_price": !!int "1"
"public_title": "IBM Cloud"
"short_description": "Monitor your IBM Cloud Account resources and activity"
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
  - "Category::Cloud"
  - "Category::Containers"
  - "Category::Provisioning"
  - "Category::Orchestration"
  - "Offering::Integration"
  - "Submitted Data Type::Metrics"
  "configuration": "README.md#Setup"
  "description": Monitor your IBM Cloud Account resources and activity
  "media":
  - "caption": Auxiliary Services Dashboard
    "image_url": images/auxiliary_dash.png
    "media_type": image
  - "caption": Code Engine Dashboard
    "image_url": images/code_engine_dash.png
    "media_type": image
  - "caption": Containers API Dashboard
    "image_url": images/containers_api_dash.png
    "media_type": image
  - "caption": VPC API Dashboard (pt. 1)
    "image_url": images/vpc_api_dash.png
    "media_type": image
  - "caption": VPC API Dashboard (pt. 2)
    "image_url": images/vpc_api_dash_2.png
    "media_type": image
  "overview": "README.md#Overview"
  "support": "README.md#Support"
  "title": IBM Cloud
  "uninstallation": "README.md#Uninstallation"
---

<!--  SOURCED FROM https://github.com/DataDog/marketplace -->


## Overview
The IBM Cloud Integration allows you to monitor the APIs available from your IBM Cloud accounts. By pulling in metadata information and details about various auxiliary services, this integration can help teams such as security, compliance, networking, QA, or Development ensure that their cloud infrastructure is continuously healthy, secure, and adhering to regulatory standards. 

The integration supports the following IBM Cloud APIs:
- Kubernetes API
- VPC API
- Transit Gateways
- Code Engine
- Direct Link Provider
- Secrets Manager
- Cloud Object Storage
- Event Streams Admin
- Container Registry


## Support
For support or feature requests, contact RapDev.io through the following channels:

- Support: support@rapdev.io
- Sales: sales@rapdev.io
- Chat: [rapdev.io](https://www.rapdev.io/#Get-in-touch)
- Phone: 855-857-0222

---
Made with ❤️ in Boston

*This isn't the integration you're looking for? Missing a critical feature for your organization? Drop RapDev a [note](mailto:support@rapdev.io), and we'll build it!!*

[1]: https://docs.datadoghq.com/agent/guide/agent-v6-python-3/?tab=hostagent
[2]: https://cloud.ibm.com/login
[3]: https://cloud.ibm.com/docs/account?topic=account-userapikey&interface=ui#create_user_key
[4]: https://cloud.ibm.com/docs/key-protect?topic=key-protect-retrieve-instance-ID&interface=ui
[5]: https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[6]: https://docs.datadoghq.com/agent/guide/agent-commands/#agent-status-and-information 

---
This application is made available through the Marketplace and is supported by a Datadog Technology Partner. <a href="https://app.datadoghq.com/marketplace/app/rapdev-ibm-cloud" target="_blank">Click Here</a> to purchase this application.
