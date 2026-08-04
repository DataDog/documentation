---
app_id: cloudnatix
categories:
- nube
- AWS
- azure
- nube de google
- Kubernetes
- métricas
custom_kind: integración
description: Proporciona la optimización automatizada de la capacidad, los costos
  y el funcionamiento de CloudNatix.
further_reading:
- link: https://www.datadoghq.com/blog/infrastructure-optimization-rightsizing-cloudnatix-datadog/
  tag: blog
  text: Optimizar tu infraestructura con CloudNatix y Datadog
integration_version: 1.0.0
media:
- caption: El dashboard de Datadog de CloudNatix que proporciona información sobre
    el gasto, el uso y la optimización de costos del clúster.
  image_url: images/cloudnatix-dashboard.png
  media_type: imagen
- caption: Visualización del importe del posible ahorro estimado por carga de trabajo
  image_url: images/cloudnatix-projected-saving.png
  media_type: imagen
supported_os:
- linux
- Windows
- macOS
title: CloudNatix
---
## Información general

Este check proporciona datos de [CloudNatix](https://cloudnatix.com/).

CloudNatix se conecta a varios clústers de Kubernetes y basados en máquinas virtuales, lo cual permite la optimización automatizada de la capacidad, los costos y el funcionamiento con la tecnología Autopilot con patentamiento pendiente. CloudNatix Insights ofrece a los equipos de desarrollo y operaciones una visibilidad proactiva de los posibles problemas de capacidad y disponibilidad.

La integración de CloudNatix proporciona información sobre costos y optimización operativa a Datadog con un dashoboard predefinido, que permite ver rápidamente los costos del clúster y analizar las oportunidades para reducirlos.

## Configuración

### Instalación

Para instalar el check de CloudNatix en tu clúster:

1. Crea una imagen de Docker del Datadog Agent que tenga instalado el check de la integración de CloudNatix. Para obtener más información, consulta [Uso de integraciones comunitarias](https://docs.datadoghq.com/agent/guide/use-community-integrations/?tab=docker).
1. [Instala el Datadog Agent](https://app.datadoghq.com/account/settings#agent/kubernetes) en tu clúster Kubernetes con la imagen Docker creada.
1. [Instala CloudNatix](https://docs.cloudnatix.com/docs/tutorial) en tu clúster Kubernetes. El CloudNatix Cluster Agent se configurará automáticamente para funcionar con la integración de Datadog.
   configura automáticamente para funcionar con la integración de Datadog.

### Validación

[Ejecuta el subcomando de estado del Agent(https://docs.datadoghq.com/agent/guide/agent-commands/#agent-status-and-information) y busca `cloudnatix` en la sección Checks.

## Datos recopilados

### Métricas

| | |
| --- | --- |
| **cloudnatix.vpa** <br>(gauge) | Estado de VPA actual de las cargas de trabajo.|
| **cloudnatix.vpa.recommendation** <br>(gauge) | Solicitudes de recursos recomendadas por VPA.|
| **cloudnatix.workload.resource** <br>(gauge) | Solicitudes de recursos para cargas de trabajo.|
| **cloudnatix.workload.monthly_spend** <br>(gauge) | Gastos de las cargas de trabajo.<br>_Se muestra en dólares_ |
| **cloudnatix.workload.monthly_projected_saving** <br>(gauge) | Ahorro previsto de las cargas de trabajo.<br>_Se muestra en dólares_ |
| **cloudnatix.pod_evition_by_vpa** <br>(count) | Número de pods desalojados por VPA.|
| **cloudnatix.compute.daily_spend** <br>(gauge) | Gasto diario total del clúster.<br>_Se muestra en dólares_ |

### Checks de servicio

CloudNatix no incluye ningún check de servicio.

### Eventos

CloudNatix no incluye ningún evento.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Cloudnatix](mailto:support@cloudnatix.com).

## Referencias adicionales

Documentación útil adicional, enlaces y artículos:

- [Optimizar tu infraestructura con CloudNatix y Datadog](https://www.datadoghq.com/blog/infrastructure-optimization-rightsizing-cloudnatix-datadog/)