---
"app_id": "azure-openai"
"app_uuid": "20d1d2b1-9f8e-46b4-a3ef-9767449e22c8"
"assets":
  "dashboards":
    "azure-openai": assets/dashboards/azure_openai_overview.json
  "integration":
    "auto_install": false
    "events":
      "creates_events": false
    "metrics":
      "check":
      - azure.cognitiveservices_accounts.processed_prompt_tokens
      "metadata_path": metadata.csv
      "prefix": azure.cognitiveservices_accounts
    "service_checks":
      "metadata_path": assets/service_checks.json
    "source_type_id": !!int "12193845"
    "source_type_name": Azure OpenAI
  "monitors":
    "[Azure] OpenAI Account's Token Usage is Abnormally High": assets/monitors/azure_openai_token_usage_high.json
    "[Azure] OpenAI Harmful Calls": assets/monitors/azure_openai_harmful_calls_high.json
"author":
  "homepage": "https://www.datadoghq.com"
  "name": Datadog
  "sales_email": info@datadoghq.com
  "support_email": help@datadoghq.com
"categories":
- azure
- ai/ml
- モニター
"custom_kind": "インテグレーション"
"dependencies": []
"display_on_public_website": true
"draft": false
"git_integration_title": "azure_openai"
"integration_id": "azure-openai"
"integration_title": "Azure OpenAI"
"integration_version": ""
"is_public": true
"manifest_version": "2.0.0"
"name": "azure_openai"
"public_title": "Azure OpenAI"
"short_description": "Use the Datadog integration to track the performance and usage of the Azure OpenAI API and deployments."
"supported_os": []
"tile":
  "changelog": CHANGELOG.md
  "classifier_tags":
  - "Category::Azure"
  - "Category::AI/ML"
  - "Category::Metrics"
  - "Submitted Data Type::Metrics"
  "configuration": "README.md#Installation"
  "description": Use the Datadog integration to track the performance and usage of the Azure OpenAI API and deployments.
  "media": []
  "overview": "README.md#Overview"
  "support": "README.md#Support"
  "title": Azure OpenAI
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-internal-core -->


## Overview

Azure OpenAI enables development of copilots and generative AI applications using OpenAI’s library of models. Use the Datadog integration to track the performance and usage of the Azure OpenAI API and deployments.

## セットアップ

### インストール
If you haven't already, set up the [Microsoft Azure integration][1] first. There are no other installation steps.

## 収集データ

### メトリクス
{{< get-metrics-from-git "azure_openai" >}}


### Service Checks

The Azure OpenAI integration does not include any service checks.

### Events

The Azure OpenAI integration does not include any events.

## Troubleshooting

Need help? Contact [Datadog support][3].


[1]: https://docs.datadoghq.com/integrations/azure/
[2]: https://github.com/DataDog/integrations-internal-core/blob/main/azure_openai/metadata.csv
[3]: https://docs.datadoghq.com/help/

