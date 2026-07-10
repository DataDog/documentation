---
app_id: amazon-eks
app_uuid: abb8b86b-eeb7-4e38-b436-f4cbb09b4398
assets:
  integration:
    auto_install: true
    configuration: {}
    events:
      creates_events: false
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10018
    source_type_name: Amazon EKS
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- aws
- cloud
- configuration & deployment
- containers
- kubernetes
- log collection
- orchestration
custom_kind: integración
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/amazon_eks/README.md
display_on_public_website: true
draft: false
git_integration_title: amazon_eks
integration_id: amazon-eks
integration_title: Amazon EKS
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: amazon_eks
public_title: Amazon EKS
short_description: Amazon EKS es un servicio administrado que facilita la ejecución
  de Kubernetes en AWS
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::AWS
  - Category::Nube
  - Category::Configuración y despliegue
  - Category::Contenedores
  - Category::Kubernetes
  - Category::Recopilación de logs
  - Category::Orquestación
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS:macOS
  - Offering::Integración
  configuration: README.md#Configuración
  description: Amazon EKS es un servicio administrado que facilita la ejecución de
    Kubernetes en AWS
  media: []
  overview: README.md#Información general
  resources:
  - resource_type: blog
    url: https://www.datadoghq.com/blog/announcing-eks
  - resource_type: blog
    url: https://www.datadoghq.com/blog/eks-cluster-metrics
  - resource_type: documentación
    url: https://docs.datadoghq.com/integrations/eks_fargate/
  support: README.md#Soporte
  title: Amazon EKS
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


![Dashboard] de EKS[1]

## Información general

Amazon Elastic Kubernetes Service (EKS) es un servicio Kubernetes gestionado que automatiza determinados aspectos del despliegue y el mantenimiento de cualquier entorno Kubernetes estándar. Tanto si estás migrando una aplicación Kubernetes existente a Amazon EKS, como si estás implementando un nuevo clúster en Amazon EKS en AWS Outposts, Datadog te ayuda a monitorizar tus entornos EKS en tiempo real.

## Configuración

Dado que Datadog ya se integra con Kubernetes y AWS, está preparado para monitorizar EKS. Si estás ejecutando el Agent en un clúster Kubernetes y quieres migrar a EKS, puedes seguir monitorizando tus clústeres con Datadog. 

Además, con compatibles los [grupos de nodos gestionados de Amazon EKS][2] y [Amazon EKS en AWS Outposts][3].

### EKS Anywhere

Para ver instrucciones de configuración, consulta la [integración Amazon EKS Anywhere][4].

### Recopilación de métricas

La monitorización de EKS requiere que configures una de las siguientes integraciones de Datadog junto con las integraciones de cualquier otro servicio AWS que estés ejecutando con EKS, como por ejemplo [ELB][5].

- [Kubernetes][6]
- [AWS][7]
- [Amazon EC2][8]

### Recopilación de logs

Disponible para el Agent v6.0 o posterior

La configuración es exactamente la misma que para Kubernetes.
Para empezar a recopilar logs de todos sus contenedores, utiliza tus [variables de entorno][9] del Datadog Agent.

Aprovecha también DaemonSets para [desplegar automáticamente el Datadog Agent en todos tus nodos][10].

Para obtener más información sobre esas variables de entorno y descubrir opciones de configuración más avanzadas, sigue los [pasos de recopilación de logs de contenedores][11].

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con [Soporte técnico de Datadog][12].

## Referencias adicionales

- [Monitorizar Amazon EKS con Datadog][13]
- [Métricas clave para la monitorización de Amazon EKS][14]
- [Amazon EKS en AWS Fargate][15]

[1]: https://raw.githubusercontent.com/DataDog/integrations-core/master/amazon_eks/images/amazon_eks_dashboard.png
[2]: https://docs.aws.amazon.com/eks/latest/userguide/managed-node-groups.html
[3]: https://docs.aws.amazon.com/eks/latest/userguide/eks-on-outposts.html
[4]: https://docs.datadoghq.com/es/integrations/eks_anywhere/
[5]: https://docs.datadoghq.com/es/integrations/amazon_elb/
[6]: https://docs.datadoghq.com/es/integrations/kubernetes/
[7]: https://docs.datadoghq.com/es/integrations/amazon_web_services/
[8]: https://docs.datadoghq.com/es/integrations/amazon_ec2/
[9]: https://docs.datadoghq.com/es/agent/basic_agent_usage/kubernetes/#log-collection-setup
[10]: https://docs.datadoghq.com/es/agent/basic_agent_usage/kubernetes/#container-installation
[11]: https://docs.datadoghq.com/es/logs/log_collection/docker/#option-2-container-installation
[12]: https://docs.datadoghq.com/es/help/
[13]: https://www.datadoghq.com/blog/announcing-eks
[14]: https://www.datadoghq.com/blog/eks-cluster-metrics
[15]: https://docs.datadoghq.com/es/integrations/eks_fargate/