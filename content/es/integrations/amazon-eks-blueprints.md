---
aliases:
- /es/integrations/amazon_eks_blueprints
app_id: amazon-eks-blueprints
categories:
- aws
- configuración y despliegue
- rastreo
- orquestación
custom_kind: integración
description: Amazon EKS Blueprints consolida la configuración de clústeres y las herramientas
  de despliegue.
integration_version: 1.0.0
media: []
supported_os:
- linux
- windows
- macos
title: Complemento Blueprints Datadog
---
## Información general

Amazon Elastic Kubernetes Service (EKS) es un servicio gestionado de Kubernetes que automatiza determinados aspectos del despliegue y el mantenimiento de cualquier entorno estándar de Kubernetes.

Amazon EKS Blueprints es un marco que consolida la configuración de clústeres y las herramientas de despliegue.

El complemento Blueprints Datadog utiliza Blueprints para desplegar el Datadog Agent en Amazon EKS.

## Configuración

### Instalación

```
npm install @datadog/datadog-eks-blueprints-addon
```

### Utilización

#### Uso de un secreto Kubernetes existente

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

| Opción                  |Descripción                                          | Valor predeterminado                       |
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
| `values`                | Valores de configuración pasados al gráfico. [Ver opciones](https://github.com/DataDog/helm-charts/tree/main/charts/datadog#all-configuration-options). | {}                            |

Consulta el [Datadog Helm chart](https://github.com/DataDog/helm-charts/tree/main/charts/datadog#all-configuration-options) para ver todas las opciones de configuración del Agent. A continuación, podrás pasar estos valores utilizando la opción `values`.

### Recopilación de métricas

La monitorización EKS requiere que configures una de las siguientes integraciones Datadog:

- [Kubernetes](https://docs.datadoghq.com/integrations/kubernetes/)
- [AWS](https://docs.datadoghq.com/integrations/amazon_web_services/)
- [Amazon EC2](https://docs.datadoghq.com/integrations/amazon_ec2/)

Configura también integraciones para cualquier otro servicio AWS que ejecutes con EKS, como [ELB](https://docs.datadoghq.com/integrations/amazon_elb/).

## Datos recopilados

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog](https://docs.datadoghq.com/help/).