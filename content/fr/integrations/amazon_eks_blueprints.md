---
app_id: amazon-eks-blueprints
app_uuid: 4c0828d6-0c41-47d0-aa20-c174773e2bda
assets:
  integration:
    auto_install: true
    configuration: {}
    events:
      creates_events: false
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10268
    source_type_name: amazon_eks_blueprints
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- aws
- configuration & deployment
- containers
- orchestration
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/amazon_eks_blueprints/README.md
display_on_public_website: true
draft: false
git_integration_title: amazon_eks_blueprints
integration_id: amazon-eks-blueprints
integration_title: Extension Blueprints Datadog
integration_version: ''
is_public: true
custom_kind: integration
manifest_version: 2.0.0
name: amazon_eks_blueprints
public_title: Extension Blueprints Datadog
short_description: Amazon EKS Blueprints regroupe vos outils de déploiement et de
  configuration de clusters.
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::AWS
  - Category::Configuration & Deployment
  - Category::Containers
  - Category::Orchestration
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  configuration: README.md#Setup
  description: Amazon EKS Blueprints regroupe vos outils de déploiement et de configuration
    de clusters.
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Extension Blueprints Datadog
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## Présentation

Amazon Elastic Kubernetes Service (EKS) est un service Kubernetes géré qui permet d'automatiser certains aspects du déploiement et de la maintenance de n'importe quel environnement Kubernetes standard.

Amazon EKS Blueprints est un framework qui regroupe vos outils de déploiement et de configuration de clusters.

L'extension Blueprints Datadog repose sur Blueprints pour déployer l'Agent Datadog sur Amazon EKS.

## Formule et utilisation

### Liste des infrastructures

```
npm install @datadog/datadog-eks-blueprints-addon
```

### API

#### Avec un secret Kubernetes existant

```js
import * as cdk from 'aws-cdk-lib';
import * as blueprints from '@aws-quickstart/eks-blueprints';
import { DatadogAddOn } from '@datadog/datadog-eks-blueprints-addon';
const app = new cdk.App();
const addOns: Array<blueprints.ClusterAddOn> = [
    new DatadogAddOn({
        // Secret Kubernetes contenant la clé d'API Datadog.
        // La valeur doit être définie avec la clé `api-key` dans l'objet du secret.
        apiKeyExistingSecret: '<NOM_SECRET>'
    })
];
const account = '<ID_COMPTE_AWS>'
const region = '<RÉGION_AWS>'
const props = { env: { account, region } }
new blueprints.EksBlueprint(app, { id: '<NOM_CLUSTER_EKS>', addOns}, props)
```

#### Avec AWS Secrets Manager
Stockez votre clé d'API Datadog à l'aide d'AWS Secrets Manager :

```
aws secretsmanager create-secret --name <NOM_SECRET> --secret-string <CLÉ_API> --region <RÉGION_AWS>
```

Utilisez `apiKeyAWSSecret` pour faire référence au secret précédemment créé.

```js
import * as cdk from 'aws-cdk-lib';
import * as blueprints from '@aws-quickstart/eks-blueprints';
import { DatadogAddOn } from '@datadog/datadog-eks-blueprints-addon';
const app = new cdk.App();
const addOns: Array<blueprints.ClusterAddOn> = [
    new DatadogAddOn({
        apiKeyAWSSecret: '<NOM_SECRET>'
    })
];
const account = '<ID_COMPTE_AWS>'
const region = '<RÉGION_AWS>'
const props = { env: { account, region } }
new blueprints.EksBlueprint(app, { id: '<NOM_CLUSTER_EKS>', addOns}, props)
```

### Configuration

#### Options

| Option                  |Description                                          | Valeur par défaut                       |
|-------------------------|-----------------------------------------------------|-------------------------------|
| `apiKey`                | Votre clé d'API Datadog                                | ""                            |
| `appKey`                | Votre clé d'application Datadog                                | ""                            |
| `apiKeyExistingSecret`  | Secret Kubernetes existant contenant la clé d'API      | ""                            |
| `appKeyExistingSecret`  | Secret Kubernetes existant contenant la clé d'application      | ""                            |
| `apiKeyAWSSecret`       | Secret AWS Secrets Manager contenant la clé d'API   | ""                            |
| `appKeyAWSSecret`       | Secret AWS Secrets Manager contenant la clé d'application   | ""                            |
| `namespace`             | Espace de nommage à utiliser pour installer l'Agent Datadog              | "default"                     |
| `version`               | Version du chart Helm Datadog                   | "2.28.13"                     |
| `release`               | Nom de la version de Helm                            | "datadog"                     |
| `repository`            | Référentiel du chart Helm                        | "https://helm.datadoghq.com"  |
| `values`                | Valeurs de configuration transmises au chart ([voir les options][1]) | {}                            |


Consultez le [chart Helm Datadog][1] pour découvrir toutes les options de configuration de l'Agent. Vous pouvez ensuite transmettre ces valeurs à l'aide de l'option `values`.

### Collecte de métriques

La surveillance d'EKS nécessite la configuration de l'une des intégrations Datadog suivantes :

- [Kubernetes][2]
- [AWS][3]
- [AWS EC2][4]

Configurez également les intégrations des autres services AWS que vous exécutez avec EKS, par exemple [ELB][5].

## Real User Monitoring


## Aide

Besoin d'aide ? Contactez [l'assistance Datadog][6].

[1]: https://github.com/DataDog/helm-charts/tree/main/charts/datadog#all-configuration-options
[2]: https://docs.datadoghq.com/fr/integrations/kubernetes/
[3]: https://docs.datadoghq.com/fr/integrations/amazon_web_services/
[4]: https://docs.datadoghq.com/fr/integrations/amazon_ec2/
[5]: https://docs.datadoghq.com/fr/integrations/amazon_elb/
[6]: https://docs.datadoghq.com/fr/help/