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
- configuración y despliegue
- contenedores
- orquestación
custom_kind: integration
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/amazon_eks_blueprints/README.md
display_on_public_website: true
draft: false
git_integration_title: amazon_eks_blueprints
integration_id: amazon-eks-blueprints
integration_title: Complemento Blueprints Datadog
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: amazon_eks_blueprints
public_title: Complemento Blueprints Datadog
short_description: Amazon EKS Blueprints consolida la configuración de clústeres y
  las herramientas de despliegue.
supported_os:
- Linux
- Windows
- macOS
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Categoría::AWS
  - Categoría::Configuración y despliegue
  - Categoría::Contenedores
  - Categoría::Orquestación
  - Sistema operativo compatible::Linux
  - Sistema operativo compatible::Windows
  - Sistema operativo compatible::macOS
  - Oferta::Integración
  configuration: README.md#Configuración
  description: Amazon EKS Blueprints consolida la configuración de clústeres y las
    herramientas de despliegue.
  media: []
  overview: README.md#Información general
  support: README.md#Soporte
  title: Complemento Blueprints Datadog
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## Información general

Amazon Elastic Kubernetes Service (EKS) es un servicio Kubernetes gestionado que automatiza determinados aspectos del despliegue y el mantenimiento de cualquier entorno Kubernetes estándar. 

Amazon EKS Blueprints es un marco que consolida la configuración de clústeres y las herramientas de despliegue.

El complemento Blueprints Datadog utiliza Blueprints para desplegar el Datadog Agent en Amazon EKS.

## Configuración

### Instalación

```
npm install @datadog/datadog-eks-blueprints-addon
```

### Uso

#### Uso de un secreto Kubernetes existente

```js
import * as cdk from 'aws-cdk-lib';
import * as blueprints from '@aws-quickstart/eks-blueprints';
import { DatadogAddOn } from '@datadog/datadog-eks-blueprints-addon';
const app = new cdk.App();
const addOns: Array<blueprints.ClusterAddOn> = [
    new DatadogAddOn({
        // Secreto Kubernetes que contiene la clave de API Datadog
        // El valor se debe configurar con la clave `api-key` en el objeto del secreto.
        apiKeyExistingSecret: '<secret name>'
    })
];
const account = '<aws account id>'
const region = '<aws region>'
const props = { env: { account, region } }
new blueprints.EksBlueprint(app, { id: '<eks cluster name>', addOns}, props)
```

#### Uso de AWS Secrets Manager
Almacena tu clave de API Datadog utilizando AWS Secrets Manager:

```
aws secretsmanager create-secret --name <secret name> --secret-string <api_key> --region <aws region>
```

Consulta el secreto creado previamente con `apiKeyAWSSecret`.

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

### Configuración

#### Opciones

| Opción                  |Descripción                                          | Predeterminado                       |
|-------------------------|-----------------------------------------------------|-------------------------------|
| `apiKey`                | Tu clave de API Datadog                                 | ""                            |
| `appKey`                | Tu clave de aplicación Datadog                                 | ""                            |
| `apiKeyExistingSecret`  | Secreto Kubernetes existente que almacena la clave de API      | ""                            |
| `appKeyExistingSecret`  | Secreto Kubernetes existente que almacena la clave de aplicación      | ""                            |
| `apiKeyAWSSecret`       | Secreto en AWS Secrets Manager que almacena la clave de API   | ""                            |
| `appKeyAWSSecret`       | Secreto en AWS Secrets Manager que almacena la clave de aplicación   | ""                            |
| `namespace`             | Espacio de nombres para instalar el Datadog Agent              | "por defecto"                     |
| `version`               | Versión del Datadog Helm chart                   | "2.28.13"                     |
| `release`               | Nombre de la versión de Helm                            | "datadog"                     |
| `repository`            | Repositorio del Helm chart                        | "https://helm.datadoghq.com"  |
| `values`                | Valores de configuración trasladados al gráfico. [Consulta las opciones][1]. | {}                            |


Consulta el [Datadog Helm chart][1] para conocer todas las opciones de configuración del Agent. A continuación, puedes trasladar estos valores utilizando la opción `values`.

### Recopilación de métricas

La monitorización EKS requiere que configures una de las siguientes integraciones Datadog:

- [Kubernetes][2]
- [AWS][3]
- [AWS EC2][4]

Configure también integraciones para cualquier otro servicio AWS que ejecutes con EKS, como [ELB][5].

## Datos recopilados


## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog][6].

[1]: https://github.com/DataDog/helm-charts/tree/main/charts/datadog#all-configuration-options
[2]: https://docs.datadoghq.com/es/integrations/kubernetes/
[3]: https://docs.datadoghq.com/es/integrations/amazon_web_services/
[4]: https://docs.datadoghq.com/es/integrations/amazon_ec2/
[5]: https://docs.datadoghq.com/es/integrations/amazon_elb/
[6]: https://docs.datadoghq.com/es/help/