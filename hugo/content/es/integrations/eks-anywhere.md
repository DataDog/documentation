---
aliases:
- /es/integrations/eks_anywhere
app_id: eks-anywhere
categories:
- aws
- nube
- rastreo
- kubernetes
- recopilación de logs
- orquestación
- aprovisionamiento
custom_kind: integración
description: Una opción de despliegue de EKS para operar clústeres de Kubernetes on-premises
further_reading:
- link: https://www.datadoghq.com/blog/announcing-eks
  tag: blog
  text: Monitoriza Amazon EKS con Datadog
- link: https://www.datadoghq.com/blog/eks-cluster-metrics
  tag: blog
  text: Métricas clave para la monitorización de Amazon EKS
- link: https://docs.datadoghq.com/integrations/eks_fargate/
  tag: documentación
  text: Amazon EKS en AWS Fargate
integration_version: 1.0.0
media: []
supported_os:
- linux
- windows
- macos
title: Amazon EKS Anywhere
---
![EKS Dashboard](https://raw.githubusercontent.com/DataDog/integrations-core/master/amazon_eks/images/amazon_eks_dashboard.png)

## Información general

Amazon Elastic Kubernetes Service (EKS) es un servicio de Kubernetes gestionado que automatiza ciertos aspectos del despliegue y mantenimiento de cualquier entorno de Kubernetes estándar. Ya sea que migres una aplicación de Kubernetes existente a Amazon EKS o despliegues un clúster nuevo en Amazon EKS en AWS Outposts, Datadog te ayuda a monitorizar tus entornos de EKS en tiempo real.

[Amazon EKS Anywhere](https://aws.amazon.com/eks/eks-anywhere/) es una opción de despliegue que te permite crear y operar clústeres Kubernetes on-premises, incluidas máquinas virtuales (por ejemplo, VMware vSphere) y servidores sin sistema operativo.

## Configuración

Dado que Datadog ya se integra con Kubernetes y AWS, está preparado para monitorizar EKS. Si estás ejecutando el Agent en un clúster de Kubernetes y tiene previsto migrar a EKS, puedes seguir monitorizando tu clúster con Datadog.

Además, se admiten [Amazon EKS Managed Node Groups](https://docs.aws.amazon.com/eks/latest/userguide/managed-node-groups.html) y [Amazon EKS en AWS Outposts](https://docs.aws.amazon.com/eks/latest/userguide/eks-on-outposts.html).

### Configuración del Helm chart de Datadog

Utiliza las [Instrucciones de despliegue del Agent con Helm](https://docs.datadoghq.com/agent/kubernetes/?tab=helm#installation) con estas instrucciones de configuración adicionales:

1. Configura `datadog.kubelet.tlsVerify` en `false`.
1. Configura una tolerancia en el pod del Agent. Esto es necesario para monitorizar el plano de control.

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

Para monitorizar EKS es necesario configurar una de las siguientes integraciones de Datadog junto con integraciones para cualquier otro servicio de AWS que estés ejecutando con EKS, como [ELB](https://docs.datadoghq.com/integrations/amazon_elb/).

- [Kubernetes](https://docs.datadoghq.com/integrations/kubernetes/)
- [AWS](https://docs.datadoghq.com/integrations/amazon_web_services/)
- [AWS EC2](https://docs.datadoghq.com/integrations/amazon_ec2/)

### Recopilación de logs

_Disponible para las versiones 6.0 o posteriores del Agent_

La configuración es exactamente la misma que para Kubernetes.
Para empezar a recopilar logs de todos tus contenedores, utiliza tus [variables de entorno] del Datadog Agent (https://docs.datadoghq.com/agent/basic_agent_usage/kubernetes/#log-collection-setup).

Utiliza DaemonSets para [desplegar automáticamente el Datadog Agent en todos tus nodos](https://docs.datadoghq.com/agent/basic_agent_usage/kubernetes/#container-installation).

Sigue las [instrucciones para la recopilación de logs de contenedores](https://docs.datadoghq.com/logs/log_collection/docker/#option-2-container-installation) para obtener más información sobre las variables de entorno y las opciones de configuración avanzadas.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con [asistencia técnica de Datadog](https://docs.datadoghq.com/help/).

## Referencias adicionales

- [Monitorización de Amazon EKS con Datadog](https://www.datadoghq.com/blog/announcing-eks)
- [Métricas clave para la monitorización de Amazon EKS](https://www.datadoghq.com/blog/eks-cluster-metrics)
- [Amazon EKS en AWS Fargate](https://docs.datadoghq.com/integrations/eks_fargate/)