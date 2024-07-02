---
"algolia":
  "subcategory": Marketplace インテグレーション
"app_id": "crest-data-systems-trulens-eval"
"app_uuid": "91fe78a3-7bd7-41d6-b24f-d41056112644"
"assets":
  "dashboards":
    "Trulens Eval - Overview": assets/dashboards/crest_data_trulens_eval_overview.json
    "Trulens Eval - Troubleshooting": assets/dashboards/crest_data_trulens_eval_troubleshooting.json
  "integration":
    "auto_install": false
    "configuration":
      "spec": assets/configuration/spec.yaml
    "events":
      "creates_events": false
    "service_checks":
      "metadata_path": assets/service_checks.json
    "source_type_id": !!int "12043594"
    "source_type_name": crest_data_systems_trulens_eval
  "logs":
    "source": crest-data-systems-trulens-eval
"author":
  "homepage": "https://www.crestdata.ai"
  "name": Crest Data
  "sales_email": datadog-sales@crestdata.ai
  "support_email": datadog.integrations@crestdata.ai
  "vendor_id": crest-data-systems
"categories":
- marketplace
- ai/ml
- ログの収集
"custom_kind": "インテグレーション"
"dependencies": []
"display_on_public_website": true
"draft": false
"git_integration_title": "crest_data_systems_trulens_eval"
"integration_id": "crest-data-systems-trulens-eval"
"integration_title": "TruLens Eval"
"integration_version": ""
"is_public": true
"legal_terms":
  "eula": assets/EULA.pdf
"manifest_version": "2.0.0"
"name": "crest_data_systems_trulens_eval"
"pricing":
- "billing_type": flat_fee
  "includes_assets": true
  "product_id": trulens-eval
  "short_description": Flat fee per month for Trulens Eval integration.
  "unit_price": !!float "45.0"
"public_title": "TruLens Eval"
"short_description": "Monitor and gain insights into LLM application experiments"
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
  - "Category::AI/ML"
  - "Offering::Integration"
  - "Category::Log Collection"
  - "Submitted Data Type::Logs"
  "configuration": "README.md#Setup"
  "description": Monitor and gain insights into LLM application experiments
  "media":
  - "caption": TruLens Eval - Overview
    "image_url": images/crest_data_trulens_eval_overview.png
    "media_type": image
  - "caption": TruLens Eval - Troubleshooting
    "image_url": images/crest_data_trulens_eval_troubleshooting.png
    "media_type": image
  "overview": "README.md#Overview"
  "support": "README.md#Support"
  "title": TruLens Eval
  "uninstallation": "README.md#Uninstallation"
---

<!--  SOURCED FROM https://github.com/DataDog/marketplace -->


## 概要

TruLens Eval is a software that helps you to objectively measure the quality and effectiveness of your LLM-based applications using feedback functions. Feedback functions help to programmatically evaluate the quality of inputs, outputs, and intermediate results, so that you can expedite and scale up an experiment evaluation.

This TruLens Eval Integration allows you to:
* Fetch data from a SQLAlchemy compatible database, and send records and feedback to Datadog
* Visualize LLM application performance in the included dashboards to take actions such as comparing multiple LLM applications performance, cost etc.

## サポート

サポートまたは機能リクエストをご希望の場合は、以下のチャンネルから Crest Data にお問い合わせください。

- Support Email: [datadog.integrations@crestdata.ai][10]
- Sales Email: [datadog-sales@crestdata.ai][9]
- Website: [crestdata.ai][4]
- よくあるご質問: [Crest Data Datadog Marketplace インテグレーションのよくあるご質問][8]


[1]: https://docs.datadoghq.com/agent/guide/
[2]: https://docs.datadoghq.com/agent/guide/agent-commands/?tab=agentv6v7#start-stop-and-restart-the-agent
[3]: https://docs.datadoghq.com/agent/guide/agent-commands/#agent-status-and-information
[4]: https://www.crestdata.ai/
[5]: https://docs.crestdata.ai/datadog-integrations-readme/TruLens_Eval.pdf
[6]: https://docs.datadoghq.com/agent/?tab=Linux
[7]: https://docs.datadoghq.com/account_management/api-app-keys/
[8]: https://docs.crestdata.ai/datadog-integrations-readme/Crest_Data_Datadog_Integrations_FAQ.pdf
[9]: mailto:datadog-sales@crestdata.ai
[10]: mailto:datadog.integrations@crestdata.ai
---
This application is made available through the Marketplace and is supported by a Datadog Technology Partner. <a href="https://app.datadoghq.com/marketplace/app/crest-data-systems-trulens-eval" target="_blank">Click Here</a> to purchase this application.
