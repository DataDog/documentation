---
"app_id": "amazon-eks-blueprints"
"app_uuid": "4c0828d6-0c41-47d0-aa20-c174773e2bda"
"assets":
  "integration":
    "auto_install": true
    "configuration": {}
    "events":
      "creates_events": false
    "service_checks":
      "metadata_path": assets/service_checks.json
    "source_type_id": !!int "10268"
    "source_type_name": amazon_eks_blueprints
"author":
  "homepage": "https://www.datadoghq.com"
  "name": Datadog
  "sales_email": info@datadoghq.com
  "support_email": help@datadoghq.com
"categories":
- aws
- configuration & deployment
- containers
- orchestration
"custom_kind": "integration"
"dependencies":
- "https://github.com/DataDog/integrations-core/blob/master/amazon_eks_blueprints/README.md"
"display_on_public_website": true
"draft": false
"git_integration_title": "amazon_eks_blueprints"
"integration_id": "amazon-eks-blueprints"
"integration_title": "Datadog Blueprints Add-on"
"integration_version": ""
"is_public": true
"manifest_version": "2.0.0"
"name": "amazon_eks_blueprints"
"public_title": "Datadog Blueprints Add-on"
"short_description": "Amazon EKS Blueprints consolidates cluster configuration and deployment tools."
"supported_os":
- linux
- windows
- macos
"tile":
  "changelog": CHANGELOG.md
  "classifier_tags":
  - "Category::AWS"
  - "Category::Configuration & Deployment"
  - "Category::Containers"
  - "Category::Orchestration"
  - "Supported OS::Linux"
  - "Supported OS::Windows"
  - "Supported OS::macOS"
  "configuration": "README.md#Setup"
  "description": Amazon EKS Blueprints consolidates cluster configuration and deployment tools.
  "media": []
  "overview": "README.md#Overview"
  "support": "README.md#Support"
  "title": Datadog Blueprints Add-on
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## Overview

Amazon Elastic Kubernetes Service (EKS) is a managed Kubernetes service that automates certain aspects of deployment and maintenance for any standard Kubernetes environment. 

Amazon EKS Blueprints is a framework that consolidates cluster configuration and deployment tools.

The Datadog Blueprints add-on uses Blueprints to deploy the Datadog Agent on Amazon EKS.

## Setup

### Installation

```
npm install @datadog/datadog-eks-blueprints-addon
```

### Usage

#### Using an existing Kubernetes secret

```js
import * as cdk from 'aws-cdk-lib';
import * as blueprints from '@aws-quickstart/eks-blueprints';
import { DatadogAddOn } from '@datadog/datadog-eks-blueprints-addon';
const app = new cdk.App();
const addOns: Array<blueprints.ClusterAddOn> = [
    new DatadogAddOn({
        // Kubernetes secret holding Datadog API key
        // The value should be set with the `api-key` key in the secret object.
        apiKeyExistingSecret: '<secret name>'
    })
];
const account = '<aws account id>'
const region = '<aws region>'
const props = { env: { account, region } }
new blueprints.EksBlueprint(app, { id: '<eks cluster name>', addOns}, props)
```

#### Using AWS Secrets Manager
Store your Datadog API key using AWS Secrets Manager:

```
aws secretsmanager create-secret --name <secret name> --secret-string <api_key> --region <aws region>
```

Refer to the previously created secret with `apiKeyAWSSecret`.

```js
import * as cdk from 'aws-cdk-lib';
import * as blueprints from '@aws-quickstart/eks-blueprints';
import { DatadogAddOn } from '@datadog/datadog-eks-blueprints-addon';
const app = new cdk.App();
const addOns: Array<blueprints.ClusterAddOn> = [
    new DatadogAddOn({
        apiKeyAWSSecret: '<secret name>'
    })
];
const account = '<aws account id>'
const region = '<aws region>'
const props = { env: { account, region } }
new blueprints.EksBlueprint(app, { id: '<eks cluster name>', addOns}, props)
```

### Configuation

#### Options

| Option                  |Description                                          | Default                       |
|-------------------------|-----------------------------------------------------|-------------------------------|
| `apiKey`                | Your Datadog API key                                | ""                            |
| `appKey`                | Your Datadog app key                                | ""                            |
| `apiKeyExistingSecret`  | Existing Kubernetes Secret storing the API key      | ""                            |
| `appKeyExistingSecret`  | Existing Kubernetes Secret storing the app key      | ""                            |
| `apiKeyAWSSecret`       | Secret in AWS Secrets Manager storing the API key   | ""                            |
| `appKeyAWSSecret`       | Secret in AWS Secrets Manager storing the app key   | ""                            |
| `namespace`             | Namespace to install the Datadog Agent              | "default"                     |
| `version`               | Version of the Datadog Helm chart                   | "2.28.13"                     |
| `release`               | Name of the Helm release                            | "datadog"                     |
| `repository`            | Repository of the Helm chart                        | "https://helm.datadoghq.com"  |
| `values`                | Configuration values passed to the chart. [See options][1]. | {}                            |


See the [Datadog Helm chart][1] for all Agent configuration options. You can then pass these values using the `values` option.

### Metric collection

Monitoring EKS requires that you set up one of the following Datadog integrations:

- [Kubernetes][2]
- [AWS][3]
- [AWS EC2][4]

Also set up the integrations for any other AWS services that you are running with EKS, such as [ELB][5].

## Data Collected


## Troubleshooting

Need help? Contact [Datadog support][6].

[1]: https://github.com/DataDog/helm-charts/tree/main/charts/datadog#all-configuration-options
[2]: https://docs.datadoghq.com/integrations/kubernetes/
[3]: https://docs.datadoghq.com/integrations/amazon_web_services/
[4]: https://docs.datadoghq.com/integrations/amazon_ec2/
[5]: https://docs.datadoghq.com/integrations/amazon_elb/
[6]: https://docs.datadoghq.com/help/

