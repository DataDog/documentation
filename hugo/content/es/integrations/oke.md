---
app_id: oke
categories:
- configuración y despliegue
- rastreo
- Kubernetes
- métricas
- oracle
- orquestación
custom_kind: integración
description: OKE es un servicio de orquestación de contenedores gestionado por OCI.
further_reading:
- link: https://www.datadoghq.com/blog/monitor-oracle-kubernetes-engine/
  tag: blog
  text: Cómo monitorizar el motor de Kubernetes de Oracle con Datadog
integration_version: 1.0.0
media: []
supported_os:
- linux
- windows
- macos
title: Oracle Container Engine para Kubernetes
---
## Información general

Oracle Cloud Infrastructure Container Engine para Kubernetes (OKE) es un servicio gestionado de Kubernetes que simplifica las operaciones de Kubernetes a escala empresarial.

Esta integración recopila métricas y etiquetas del espacio de nombres [`oci_oke`](https://docs.oracle.com/en-us/iaas/Content/ContEng/Reference/contengmetrics.htm) para ayudarte a monitorizar tu plano de control de Kubernetes, clústeres y estados de nodos.

El despliegue del [Datadog Agent](https://docs.datadoghq.com/agent/kubernetes/#installation) en tu clúster de OKE también puede ayudarte a realizar un seguimiento de la carga en tus clústeres, pods y nodos individuales para obtener mejores conocimientos sobre cómo aprovisionar y desplegar tus recursos.

Además de la monitorización de tus nodos, pods y contenedores, el Agent también puede recopilar e informar métricas de los servicios que se ejecutan en tu clúster, para que puedas:

- Explora tus clústeres de OKE con [dashboards preconfigurados de Kubernetes](https://app.datadoghq.com/dashboard/lists/preset/3?q=kubernetes)
- Monitorizar contenedores y procesos en tiempo real
- Hacer un seguimiento automático y monitorizar servicios en contenedores

## Configuración

Una vez configurada la integración de [Oracle Cloud Infrastructure](https://docs.datadoghq.com/integrations/oracle_cloud_infrastructure/), asegúrate de que el espacio de nombres `oci_oke` está incluido en tu [Connector Hub](https://cloud.oracle.com/connector-hub/service-connectors).

Dado que Datadog ya se integra con Kubernetes, está preparado para monitorizar OKE. Si estás ejecutando el Agent en un clúster de Kubernetes y planeas migrar a OKE, puedes continuar con la monitorización de tu clúster con Datadog.

Desplegar el Agent como un DaemonSet con el [Helm chart](https://docs.datadoghq.com/agent/kubernetes/?tab=helm) es el método más directo (y recomendado), ya que asegura que el Agent se ejecutará como un pod en cada nodo dentro de tu clúster y que cada nuevo nodo tendrá automáticamente el Agent instalado. También puedes configurar el Agent para recopilar datos de procesos, trazas y logs añadiendo unas pocas líneas adicionales a un archivo de valores Helm. Adicionalmente, los grupos de nodos de OKE son compatibles.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [soporte de Datadog](https://docs.datadoghq.com/help/).

## Referencias adicionales

- [Cómo monitorizar OKE con Datadog](https://www.datadoghq.com/blog/monitor-oracle-kubernetes-engine/)