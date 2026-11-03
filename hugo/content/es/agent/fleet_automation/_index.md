---
aliases:
- /es/agent/fleet_automation/remote_management
description: Gobierne de forma centralizada y administre de forma remota los Datadog
  Agents y OpenTelemetry Collectors a escala con vistas de configuración, actualizaciones,
  recopilación de flares y rotación de clave de API.
disable_toc: false
further_reading:
- link: https://www.datadoghq.com/blog/fleet-automation-central-configuration
  tag: Blog
  text: Configure y escale de forma centralizada el monitoreo de su infraestructura
    y aplicaciones con Datadog Fleet Automation
- link: https://www.datadoghq.com/blog/manage-opentelemetry-collectors-with-datadog-fleet-automation
  tag: Blog
  text: Administre todos sus OpenTelemetry Collectors con Datadog Fleet Automation
- link: https://www.datadoghq.com/blog/ddot-gateway
  tag: Blog
  text: Centralice y gobierne su canalización de OpenTelemetry con el gateway DDOT
- link: /remote_configuration
  tag: Documentación
  text: Obtenga más información sobre Remote Configuration
- link: /infrastructure/list/#agent-configuration
  tag: Documentación
  text: Obtenga información sobre la vista de configuración del Agent
- link: https://www.datadoghq.com/blog/fleet-automation/
  tag: Blog
  text: Gobierne de forma centralizada y administre de forma remota los Datadog Agents
    a escala con Fleet Automation
site_support_id: fleet-automation-standard-features
title: Fleet Automation
---
## Descripción general {#overview}

Datadog Fleet Automation le permite gobernar de forma centralizada y administrar de forma remota los Datadog Agents y OpenTelemetry (OTel) Collectors a escala para respaldar sus necesidades de observabilidad en evolución.

{{< img src="/agent/fleet_automation/fleet-automation-main.png" alt="La página de Fleet Automation que muestra una lista de Agents con sus versiones, estados y productos habilitados." style="width:100%;" >}}

## Capacidades clave {#key-capabilities}

Con Fleet Automation, usted puede:
- **[Ver configuraciones de Agent y OTel Collector][3]** junto con los cambios históricos para confirmar las actualizaciones de implementación y verificar la consistencia de la configuración.
- **[Configurar Datadog Agents][4]** para centralizar la configuración y obtener visibilidad de sus entornos más rápido.
- **[Administrar etiquetas de Datadog Agent][4]** _(Vista previa)_ para corregir y estandarizar el etiquetado en toda su flota.
- **[Mantenga su flota actualizada][5]** identificando y actualizando las versiones obsoletas de Agent y OTel Collector.
- **[Enviar un flare de soporte de forma remota][6]**, lo que reduce el tiempo necesario para depurar problemas en un Agent o DDOT Collector.
- **[Ver su flota por clúster de Kubernetes][7]** para inspeccionar y configurar Agents agrupados por clúster en lugar de como hosts individuales.

## Fleet Automation API {#fleet-automation-api}

Fleet Automation proporciona una API pública que le permite visualizar y administrar mediante programación los Datadog Agents a escala. Para obtener detalles completos de los puntos de conexión y ejemplos de uso, consulte la [documentación de la API de Fleet Automation][1]. 

<div class="alert alert-info">
La API de Fleet Automation no admite todas las capacidades de configuración de Datadog Agent.
</div>

## Controle el acceso a Fleet Automation {#control-access-to-fleet-automation}

Fleet Automation está disponible para todos los usuarios en una organización de Datadog. Puede controlar el acceso a funcionalidades específicas:

| Permiso | Descripción |
|--------------|---------------|
| `API Keys Read`| Restringe qué usuarios pueden visualizar y buscar Agents por clave de API. |
| `Agent Flare Collection` | Restringe qué usuarios pueden enviar flares de forma remota desde Fleet Automation. |
| `Agent Upgrade` | Restringe qué usuarios tienen acceso para actualizar Agents desde Fleet Automation. |
| `Agent Configuration Management` | Restringe qué usuarios tienen acceso para configurar Agents desde Fleet Automation. |

Para obtener información sobre cómo configurar roles y permisos, consulte [Access Control][2].

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/api/latest/fleet-automation/
[2]: /es/account_management/rbac/
[3]: /es/agent/fleet_automation/fleet_view/
[4]: /es/agent/fleet_automation/configure_agents/
[5]: /es/agent/fleet_automation/upgrade_agents/
[6]: /es/agent/troubleshooting/send_a_flare/#send-a-flare-from-the-datadog-site
[7]: /es/agent/fleet_automation/fleet_view/#kubernetes-view