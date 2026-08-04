---
aliases:
- /es/integrations/amazon_eks
app_id: amazon-eks
categories:
- aws
- nube
- configuración y despliegue
- rastreo
- kubernetes
- recopilación de logs
- orquestación
custom_kind: integración
description: Amazon EKS es un servicio gestionado que facilita la ejecución de Kubernetes
  en AWS.
further_reading:
- link: https://www.datadoghq.com/blog/announcing-eks
  tag: blog
  text: Monitorizar Amazon EKS con Datadog
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
title: Amazon EKS
---
![Dashboard de EKS](https://raw.githubusercontent.com/DataDog/integrations-core/master/amazon_eks/images/amazon_eks_dashboard.png)

## Información general

Amazon Elastic Kubernetes Service (EKS) es un servicio Kubernetes gestionado que automatiza determinados aspectos del despliegue y el mantenimiento de cualquier entorno Kubernetes estándar. Tanto si estás migrando una aplicación Kubernetes existente a Amazon EKS, como si estás implementando un nuevo clúster en Amazon EKS en AWS Outposts, Datadog te ayuda a monitorizar tus entornos EKS en tiempo real.

## Configuración

Debido a que Datadog ya se integra con Kubernetes y AWS, está preparado para monitorizar EKS. Si estás ejecutando el Agent en un clúster Kubernetes y tienes previsto migrar a EKS, puedes seguir monitorizando tu clúster con Datadog.

Además, se admiten [grupos de nodos gestionados por Amazon EKS](https://docs.aws.amazon.com/eks/latest/userguide/managed-node-groups.html) y [Amazon EKS en AWS Outposts](https://docs.aws.amazon.com/eks/latest/userguide/eks-on-outposts.html).

### EKS Anywhere

Consulta las instrucciones de configuración de la [integración de Amazon EKS Anywhere](https://docs.datadoghq.com/integrations/eks_anywhere/).

### Recopilación de métricas

La monitorización de EKS requiere que configures una de las siguientes integraciones de Datadog junto con integraciones de cualquier otro servicio de AWS que estés ejecutando con EKS, como [ELB](https://docs.datadoghq.com/integrations/amazon_elb/).

- [Kubernetes](https://docs.datadoghq.com/integrations/kubernetes/)
- [AWS](https://docs.datadoghq.com/integrations/amazon_web_services/)
- [Amazon EC2](https://docs.datadoghq.com/integrations/amazon_ec2/)

### Recopilación de logs

_Disponible para las versiones 6.0 o posteriores del Agent_

La configuración es exactamente la misma que para Kubernetes.
Para empezar a recopilar logs de todos tus contenedores, utiliza las [variables de entorno](https://docs.datadoghq.com/agent/basic_agent_usage/kubernetes/#log-collection-setup) de tu Datadog Agent.

Aprovecha también DaemonSets para [desplegar automáticamente el Datadog Agent en todos tus nodos](https://docs.datadoghq.com/agent/basic_agent_usage/kubernetes/#container-installation).

Sigue los [pasos de la recopilación de logs de contenedor](https://docs.datadoghq.com/logs/log_collection/docker/#option-2-container-installation) para obtener más información sobre estas variables de entorno y descubrir opciones de configuración más avanzadas.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog](https://docs.datadoghq.com/help/).

## Referencias adicionales

- [Monitorizar Amazon EKS con Datadog](https://www.datadoghq.com/blog/announcing-eks)
- [Métricas clave para la monitorización de Amazon EKS](https://www.datadoghq.com/blog/eks-cluster-metrics)
- [Amazon EKS en AWS Fargate](https://docs.datadoghq.com/integrations/eks_fargate/)