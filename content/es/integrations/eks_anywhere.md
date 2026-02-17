---
app_id: eks-anywhere
app_uuid: 21bd91d8-7594-4c2f-bbd8-11595e4511d1
assets:
  integration:
    auto_install: true
    configuration: {}
    events:
      creates_events: false
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10248
    source_type_name: Amazon EKS Anywhere
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- aws
- nube
- rastreo
- Kubernetes
- recopilación de logs
- orquestación
- suministro
custom_kind: integración
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/eks_anywhere/README.md
display_on_public_website: true
draft: false
git_integration_title: eks_anywhere
integration_id: eks-anywhere
integration_title: Amazon EKS Anywhere
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: eks_anywhere
public_title: Amazon EKS Anywhere
short_description: Una opción de despliegue de EKS para operar clústeres de Kubernetes
  on-premises
supported_os:
- Linux
- Windows
- macOS
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Categoría::AWS
  - Categoría::Nube
  - Categoría::Contenedores
  - Categoría::Kubernetes
  - Categoría::Recopilación de logs
  - Categoría::Orquestación
  - Categoría::Suministro
  - Sistema operativo compatible::Linux
  - Sistema operativo compatible::Windows
  - Sistema operativo compatible::macOS
  - Oferta::Integración
  configuration: README.md#Configuración
  description: Una opción de despliegue de EKS para operar clústeres de Kubernetes
    on-premises
  media: []
  overview: README.md#Información general
  resources:
  - resource_type: Blog
    url: https://www.datadoghq.com/blog/announcing-eks
  - resource_type: Blog
    url: https://www.datadoghq.com/blog/eks-cluster-metrics
  - resource_type: Documentación
    url: https://docs.datadoghq.com/integrations/eks_fargate/
  support: README.md#Soporte
  title: Amazon EKS Anywhere
---

<!--  FUENTE https://github.com/DataDog/integrations-core -->


![Dashboard] de EKS[1]

## Información general

Amazon Elastic Kubernetes Service (EKS) es un servicio de Kubernetes gestionado que automatiza ciertos aspectos del despliegue y mantenimiento de cualquier entorno de Kubernetes estándar. Ya sea que migres una aplicación de Kubernetes existente a Amazon EKS o despliegues un clúster nuevo en Amazon EKS en AWS Outposts, Datadog te ayuda a monitorizar tus entornos de EKS en tiempo real.

[Amazon EKS Anywhere][2] es una opción de despliegue que te permite crear y operar clústeres de Kubernetes on-premises, incluidas máquinas virtuales (por ejemplo, VMware vSphere) y servidores físicos.

## Configuración

Dado que Datadog ya se integra con Kubernetes y AWS, está preparado para monitorizar EKS. Si estás ejecutando el Agent en un clúster Kubernetes y quieres migrar a EKS, puedes seguir monitorizando tus clústeres con Datadog. 

Además, se admiten [grupos de nodos gestionados de Amazon EKS][3] y [Amazon EKS en AWS Outposts][4].

### Configuración del Helm chart de Datadog

Usa las [instrucciones de despliegue del Agent con Helm][5] con estas instrucciones de configuración adicionales:

1. Establece `datadog.kubelet.tlsVerify` en `false`.
2. Establece una tolerancia en el pod del Agent. Esto es necesario para monitorizar el plano de control.

En el siguiente fragmento de Helm se muestran los cambios específicos para monitorizar EKS Anywhere:

```yaml
datadog:
  kubelet:
    tlsVerify: false
agents:
  tolerations:
  - effect: NoSchedule
    key: node-role.kubernetes.io/master
    operator: Exists
```

### Recopilación de métricas

Con el fin de monitorizar EKS es necesario configurar una de las siguientes integraciones de Datadog junto con integraciones para cualquier otro servicio de AWS que ejecutes con EKS, como [ELB][6].

- [Kubernetes][7]
- [AWS][8]
- [AWS EC2][9]

### Recopilación de logs

_Disponible para la versión 6.0 o posteriores del Agent_

La configuración es exactamente la misma que para Kubernetes.
Para empezar a recopilar logs de todos tus contenedores, usa las [variables de entorno][10] de tu Datadog Agent.

Usa DaemonSets para [desplegar de manera automática el Datadog Agent en todos tus nodos][11].

Sigue las [instrucciones de recopilación de logs de contenedores][12] para obtener más información sobre las variables de entorno y las opciones de configuración avanzadas.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog][13].

## Referencias adicionales

- [Monitorizar Amazon EKS con Datadog][14]
- [Métricas clave para la monitorización de Amazon EKS][15]
- [Amazon EKS en AWS Fargate][16]

[1]: https://raw.githubusercontent.com/DataDog/integrations-core/master/amazon_eks/images/amazon_eks_dashboard.png
[2]: https://aws.amazon.com/eks/eks-anywhere/
[3]: https://docs.aws.amazon.com/eks/latest/userguide/managed-node-groups.html
[4]: https://docs.aws.amazon.com/eks/latest/userguide/eks-on-outposts.html
[5]: https://docs.datadoghq.com/es/agent/kubernetes/?tab=helm#installation
[6]: https://docs.datadoghq.com/es/integrations/amazon_elb/
[7]: https://docs.datadoghq.com/es/integrations/kubernetes/
[8]: https://docs.datadoghq.com/es/integrations/amazon_web_services/
[9]: https://docs.datadoghq.com/es/integrations/amazon_ec2/
[10]: https://docs.datadoghq.com/es/agent/basic_agent_usage/kubernetes/#log-collection-setup
[11]: https://docs.datadoghq.com/es/agent/basic_agent_usage/kubernetes/#container-installation
[12]: https://docs.datadoghq.com/es/logs/log_collection/docker/#option-2-container-installation
[13]: https://docs.datadoghq.com/es/help/
[14]: https://www.datadoghq.com/blog/announcing-eks
[15]: https://www.datadoghq.com/blog/eks-cluster-metrics
[16]: https://docs.datadoghq.com/es/integrations/eks_fargate/