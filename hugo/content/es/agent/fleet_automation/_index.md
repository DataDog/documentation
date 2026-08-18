---
aliases:
- /es/agent/fleet_automation/remote_management
description: Gobierne centralmente y gestione de forma remota los Agentes de Datadog
  y los Colectores de OpenTelemetry a gran escala con vistas de configuración, actualizaciones,
  recolección de flares y rotación de claves de API.
disable_toc: false
further_reading:
- link: https://www.datadoghq.com/blog/fleet-automation-central-configuration
  tag: Blog
  text: Configure y escale centralmente el seguimiento de su infraestructura y aplicaciones
    con la Automatización de Flota de Datadog.
- link: https://www.datadoghq.com/blog/manage-opentelemetry-collectors-with-datadog-fleet-automation
  tag: Blog
  text: Gestione todos sus Colectores de OpenTelemetry con la Automatización de Flota
    de Datadog.
- link: https://www.datadoghq.com/blog/ddot-gateway
  tag: Blog
  text: Centralice y gobierne su canalización de OpenTelemetry con la puerta de enlace
    DDOT.
- link: /remote_configuration
  tag: Documentación
  text: Descubra más sobre Remote Configuration.
- link: /infrastructure/list/#agent-configuration
  tag: Documentación
  text: Aprenda sobre la vista de configuración del Agent.
- link: https://www.datadoghq.com/blog/fleet-automation/
  tag: Blog
  text: Gobierne centralmente y gestione de forma remota los Agentes de Datadog a
    gran escala con la Automatización de Flota.
title: Automatización de Flota
---
## Descripción general {#overview}

Datadog Fleet Automation permite gobernar centralmente y gestionar de forma remota a los Agentes de Datadog y a los Colectores de OpenTelemetry (OTel) a gran escala para apoyar sus necesidades de observabilidad en evolución.

{{< img src="/agent/fleet_automation/fleet-automation-main.png" alt="La página de Automatización de Flota muestra una lista de Agentes con sus versiones, estados y productos habilitados." style="width:100%;" >}}

## Capacidades clave {#key-capabilities}

Con la Automatización de Flota, puede:
- **[Ver configuraciones de Agentes y Colectores de OTel][3]** junto con cambios históricos para confirmar actualizaciones de implementación y verificar la consistencia de la configuración.
- **[Configure Agentes de Datadog][4]** para centralizar la configuración y obtener visibilidad en sus entornos más rápido.
- **[Mantenga su flota actualizada][5]** identificando y actualizando versiones obsoletas de Agentes y Colectores de OTel.
- **[Envíe un flare de soporte de forma remota][6]**, reduciendo el tiempo que toma depurar problemas en un Agente o Colector DDOT.

## API de Automatización de Flota {#fleet-automation-api}

La Automatización de Flota proporciona una API pública que permite ver y gestionar programáticamente los Agentes de Datadog a gran escala. Para obtener detalles completos sobre los puntos de conexión y ejemplos de uso, consulte la [documentación de la API de Automatización de Flota][1]. 

<div class="alert alert-info">
La API de Automatización de Flota no admite todas las capacidades de configuración de los Agentes de Datadog.
</div>

## Controle el acceso a la Automatización de Flota {#control-access-to-fleet-automation}

La Automatización de Flota está disponible para todos los usuarios en una organización de Datadog. Puede controlar el acceso a funcionalidades específicas:

| Permiso | Descripción |
|--------------|---------------|
| `API Keys Read`| Restringe qué usuarios pueden ver y buscar Agentes por clave de API. |
| `Agent Flare Collection` | Restringe qué usuarios pueden enviar flares de forma remota desde Fleet Automation. |
| `Agent Upgrade` | Restringe qué usuarios tienen acceso para actualizar Agentes desde Fleet Automation. |
| `Agent Configuration Management` | Restringe qué usuarios tienen acceso para configurar Agentes desde Fleet Automation. |

Para obtener información sobre cómo configurar roles y permisos, consulte [Access Control][2].

## Lectura adicional {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/api/latest/fleet-automation/
[2]: /es/account_management/rbac/
[3]: /es/agent/fleet_automation/fleet_view/
[4]: /es/agent/fleet_automation/configure_agents/
[5]: /es/agent/fleet_automation/upgrade_agents/
[6]: /es/agent/troubleshooting/send_a_flare/#send-a-flare-from-the-datadog-site