---
description: Controla de forma centralizada y gestiona de forma remota Datadog Agents
  y OpenTelemetry Collectors a escala con vistas de configuración, actualizaciones,
  recopilación de flares y rotación de claves de API.
disable_toc: false
further_reading:
- link: https://www.datadoghq.com/blog/fleet-automation-central-configuration
  tag: Blog
  text: Configurar y ampliar de forma centralizada la monitorización de tu infraestructura
    y aplicaciones con Datadog Fleet Automation
- link: https://www.datadoghq.com/blog/manage-opentelemetry-collectors-with-datadog-fleet-automation
  tag: Blog
  text: Gestionar todos tus OpenTelemetry Collectors con Datadog Fleet Automation
- link: https://www.datadoghq.com/blog/ddot-gateway
  tag: Blog
  text: Centralizar y controlar tu pipeline OpenTelemetry con la puerta de enlace
    de DDOT
- link: /remote_configuration
  tag: Documentación
  text: Más información sobre la configuración remota
- link: /infrastructure/list/#agent-configuration
  tag: Documentación
  text: Más información sobre la vista de configuración del Agent
- link: https://www.datadoghq.com/blog/fleet-automation/
  tag: Blog
  text: Controlar de forma centralizada y gestionar de forma remota Datadog Agents
    a escala con Fleet Automation
title: Fleet Automation
---

## Información general

Datadog Fleet Automation te permite controlar de forma centralizada y gestionar de forma remota Datadog Agents y OpenTelemetry (OTel) Collectors a escala para acompañar la evolución de tus necesidades de observabilidad.

{{< img src="/agent/fleet_automation/fleet_automation2.png" alt="Página de Fleet Automation" style="width:100%;" >}}

## Casos prácticos

Para los siguientes casos de uso, asegúrate de que tu flota de Datadog Agents y OTel Collectors utiliza las últimas mejoras de funciones. Con Fleet Automation, podrás:
- **Visualizar las últimas configuraciones del Agent y el OTel Collector** junto con los cambios históricos para ayudarte a confirmar actualizaciones de despliegues y garantizar la consistencia de la configuración.
- **Asegurarte de que tu flota de Agents y OTel Collectors utiliza las últimas mejoras de funciones** identificando y actualizando las versiones obsoletas.
- **Configurar tus Datadog Agents directamente desde Fleet Automation** para permitir a tus equipos centralizar la configuración y obtener una visibilidad de tus entornos de forma más rápida.
- **Enviar un flare de asistencia de forma remota desde la interfaz de usuario de Datadog** para reducir el tiempo que lleva depurar problemas en un Agent o DDOT Collector.

## Instalación

### Gestionar tu flota de forma remota

Fleet Automation te permite gestionar Datadog Agents de forma centralizada en todos tus hosts, directamente desde la interfaz de usuario de Datadog. Con la gestión remota, puedes ver el estado actual de cada Agent, aplicar cambios de configuración y lanzar actualizaciones de versión sin necesidad de acceder directamente a los sistemas individuales. Esto permite garantizar un flujo de trabajo constante y controlado para mantener tu flota segura, actualizada y en línea con los estándares de tu organización.

- **Actualizar y configurar Agents de forma remota**: Para conocer los pasos de configuración y activación, consulta [Activar la gestión remota del Agent][3].
- **Ver las configuraciones del Agent y el OTel Collector**:
  - La vista de configuración del Agent y de la distribución del OTel Collector (DDOT) está activada por defecto en las versiones 7.47.0 o posteriores del Agent. Para activar la configuración del Agent manualmente, configura `inventories_configuration_enabled` en tu [archivo de configuración del Agent][2] como `true`. También puedes utilizar la variable de entorno `DD_INVENTORIES_CONFIGURATION_ENABLED`.
  - La vista de configuración del OTel Collector ascendente se activa configurando la [extensión Datadog][8] en el archivo de configuración del Collector.
- **Ver configuración de una integración del Agent**: la configuración de una integración del Agent está habilitada por defecto en las versiones 7.49/6.49 o posteriores del Agent. Para habilitar la configuración de una integración del Agent manualmente, define`inventories_checks_configuration_enabled` en tu [archivo de configuración del Agent][2] como `true`. También puedes utilizar la variable de entorno `DD_INVENTORIES_CHECKS_CONFIGURATION_ENABLED`.

### API de Fleet Automation
Fleet Automation ofrece una API pública que te permite ver y gestionar mediante programación los Datadog Agents a escala. Para obtener información completa sobre endpoints y ejemplos de uso, consulta la [documentación de la API de Fleet Automation][9].

**Nota**: La API de Fleet Automation no admite todas las funciones de configuración del Datadog Agent.

<div class="alert alert-info">
La gestión remota de Agents no es compatible con cargas de trabajo en contenedores.
</div>


## Observar tu flota

Utiliza la página de [**Fleet Automation**][1] para obtener información sobre lagunas de observabilidad en tus hosts, Agents o OTel Collectors obsoletos, y Agents con problemas de integraciones.

Para cada Datadog Agent, puedes ver:
- La versión del Agent 
- Si el Agent tiene alguna integración no configurada o mal configurada
- Los servicios que está monitorizando el Agent
- El estado de configuración remota del Agent
- Los productos habilitados en el Agent
- Eventos de Agent de Audit Trail, incluidos cambios de configuración, actualizaciones y flares

Para cada OTel Collector, puedes ver:
- La versión del Collector
- La distribución del Collector
- El YAML de configuración del Collector

### Examinar un Datadog Agent o un OpenTelemetry Collector

Al seleccionar un Datadog Agent o un OTel Collector obtendrás más información sobre ellos, incluida su configuración, las integraciones conectadas, los eventos de auditoría y una pestaña de asistencia que puedes utilizar para enviar un flare remoto.

{{< img src="agent/fleet_automation/fleet-automation-view-config.png" alt="Información de integración de un Agent" style="width:100%;" >}}

### Ver los eventos de Agent de Audit Trail

La pestaña Eventos de auditoría muestra eventos de Audit Trail asociados con el Agent seleccionado.
Utiliza esta pestaña para:
- Identificar los cambios de configuración, las actualizaciones de claves de API, las instalaciones, las actualizaciones y los flares de asistencia.
- Determinar cuándo se hicieron los cambios y desde dónde

La visibilidad de los eventos de Audit Trail depende de tu plan. Cuando Audit Trail está habilitado en tu organización, puedes ver los eventos de Agent durante un máximo de 90 días según la configuración de retención de Audit Trail. Si Audit Trail no está habilitado en tu organización, puedes ver los eventos de las últimas 24 horas.

### Enviar un flare remoto

Puedes enviar un flare desde el Datadog Agent o el DDOT Collector después de activar la configuración remota en el Agent. Para obtener instrucciones sobre cómo enviar un flare, consulta [Enviar un flare desde el sitio Datadog][7].

Cuando te pongas en contacto con el servicio de asistencia de Datadog con la configuración remota activada para el Agent, el equipo podrá iniciar un flare desde tu entorno para poder ayudarte mejor y de forma más rápida. Los flares proporcionan información de solución de problemas al servicio de asistencia de Datadog para ayudarte a resolver tu problema. 

{{< img src="agent/fleet_automation/fleet_automation_remote_flare.png" alt="Enviar un flare remoto" style="width:100%;" >}}

## Controlar el acceso a Fleet Automation

Fleet Automation está disponible para todos los usuarios de una organización Datadog. Puedes controlar el acceso a funciones específicas:

| Permiso | Descripción |
|--------------|---------------|
| `API Keys Read`| Determina qué usuarios pueden visualizar y buscar Agents por clave API. |
| `Agent Flare Collection` | Restringe qué usuarios pueden enviar flares de forma remota desde Fleet Automation. |
| `Agent Upgrade` | Restringe qué usuarios tienen acceso a la actualización de Agents desde Fleet Automation. |
| `Agent Configuration Management` | Restringe qué usuarios tienen acceso a configurar Agents desde Fleet Automation. |

Para obtener información sobre la configuración de funciones y permisos, consulta [Control de acceso][5].

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/fleet
[2]: /es/agent/configuration/agent-configuration-files/
[3]: /es/agent/fleet_automation/remote_management/#setup
[4]: /es/infrastructure/list/#agent-configuration
[5]: /es/account_management/rbac/
[6]: /es/agent/fleet_automation/remote_management/
[7]: /es/agent/troubleshooting/send_a_flare/#send-a-flare-from-the-datadog-site
[8]: https://docs.datadoghq.com/es/opentelemetry/integrations/datadog_extension/#setup
[9]: https://docs.datadoghq.com/es/api/latest/fleet-automation/