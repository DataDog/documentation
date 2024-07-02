---
"categories":
- cloud
- azure
- ai/ml
"custom_kind": "インテグレーション"
"dependencies": []
"description": "Track key Azure Machine Learning metrics."
"doc_link": "https://docs.datadoghq.com/integrations/azure_machine_learning_services/"
"draft": false
"further_reading":
- "link": "https://www.datadoghq.com/blog/ml-model-monitoring-in-production-best-practices/"
  "tag": Blog
  "text": Best practices for monitoring ML models in production
"git_integration_title": "azure_machine_learning_services"
"has_logo": true
"integration_id": ""
"integration_title": "Microsoft Azure Machine Learning"
"integration_version": ""
"is_public": true
"manifest_version": "1.0"
"name": "azure_machine_learning_services"
"public_title": "Datadog-Microsoft Azure Machine Learning Integration"
"short_description": "Track key Azure Machine Learning metrics."
"version": "1.0"
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## Overview

The Azure Machine Learning service empowers developers and data scientists with a wide range of productive experiences for building, training, and deploying machine learning models faster. Use Datadog to monitor your Azure Machine Learning performance and utilization in context with the rest of your applications and infrastructure.

Get metrics from Azure Machine Learning to:

* Track the number and status of runs and model deployments.
* Monitor the utilization of your machine learning nodes.
* Optimize performance vs. cost.

## Setup
### Installation

If you haven't already, set up the [Microsoft Azure integration][1] first. There are no other installation steps.

## 収集データ
### Metrics
{{< get-metrics-from-git "azure_machine_learning_services" >}}


### Events
The Azure Machine Learning integration does not include any events.

### Service Checks
The Azure Machine Learning integration does not include any service checks.

## Troubleshooting
Need help? Contact [Datadog support][3].

## Further reading
{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.datadoghq.com/integrations/azure/
[2]: https://github.com/DataDog/dogweb/blob/prod/integration/azure_machine_learning_services/azure_machine_learning_services_metadata.csv
[3]: https://docs.datadoghq.com/help/

