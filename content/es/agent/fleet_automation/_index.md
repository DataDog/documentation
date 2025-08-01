---
disable_toc: false
further_reading:
- link: /agent/remote_config
  tag: Documentación
  text: Más información sobre la configuración remota
- link: /infrastructure/list/#agent-configuration
  tag: Documentación
  text: Más información sobre la vista de configuración del Agent
- link: https://www.datadoghq.com/blog/fleet-automation/
  tag: Blog
  text: Controla y gestiona de forma centralizada y remota Datadog Agents a escala
    con la automatización de flotas
title: Automatización de flotas
---

## Información general

La automatización de flotas de Datadog te permite controlar de forma centralizada y gestionar en remoto Datadog Agents a escala para responder a tus necesidades de observabilidad en constante evolución.

{{< img src="/agent/fleet_automation/fleet_automation2.png" alt="Página de Fleet Automation" style="width:100%;" >}}

## Casos prácticos

Con la plataforma de automatización de flotas, puedes:
- Consulte las últimas configuraciones del Agent y los cambios históricos para confirmar las actualizaciones del despliegue y garantizar la coherencia de la configuración.
- Asegúrate de que tu flota de Agent utiliza las últimas mejoras identificando y actualizando las versiones obsoletas de Agent.
- Enviar un flare desde dentro de tu organización, reduciendo así el tiempo que se tarda en depurar problemas en un Agent.
- Ayudar a rotar las claves API y asegurarte de que las claves antiguas pueden desactivarse sin ningún impacto, identificando cuáles y cuántos Agents utilizan una clave específica.

## Configurar Fleet Automation

- **Actualización y configuración remotas de Agents**: para obtener información sobre las versiones del Agent compatibles y los pasos de configuración, consulta [Activar la gestión remota de Agent][3].
- **Ver la configuración del Agent**: la vista de configuración del Agent está habilitada por defecto en las versiones del Agent 7.47.0 o posteriores. Para habilitar la configuración del Agent manualmente, establece `inventories_configuration_enabled` en tu [archivo de configuración del Agent][2] a `true`. También puedes utilizar la variable de entorno `DD_INVENTORIES_CONFIGURATION_ENABLED`.
- **Ver configuración de una integración del Agent**: la configuración de una integración del Agent está habilitada por defecto en las versiones 7.49/6.49 o posteriores del Agent. Para habilitar la configuración de una integración del Agent manualmente, define`inventories_checks_configuration_enabled` en tu [archivo de configuración del Agent][2] como `true`. También puedes utilizar la variable de entorno `DD_INVENTORIES_CHECKS_CONFIGURATION_ENABLED`.

## Observar tu flota

Utiliza la página [**Automatización de la flota**][1] para obtener información sobre hosts no supervisados, Agents que deben actualizarse o Agents que presentan problemas de integración. Para cada Agent, puedes ver:
- La versión del Agent 
- Si el Agent tiene alguna integración no configurada o mal configurada
- Los servicios que está monitorizando el Agent
- El estado de configuración remota del Agent
- Los productos habilitados en el Agent
- Eventos de Agent de Audit Trail, incluidos cambios de configuración, actualizaciones y flares

### Examinar un Agent

Al seleccionar un Agent, obtendrás más información sobre él, como su configuración, sus integraciones conectadas, eventos de auditoría y una pestaña de ayuda que puedes utilizar para enviar un flare remoto.

{{< img src="agent/fleet_automation/fleet-automation-view-config.png" alt="Información de integración de un Agent" style="width:100%;" >}}

### Ver los eventos de Agent de Audit Trail

La pestaña Eventos de auditoría muestra eventos de Audit Trail asociados con el Agent seleccionado.
Utiliza esta pestaña para:
- Identificar los cambios de configuración, las actualizaciones de claves de API, las instalaciones, las actualizaciones y los flares de asistencia.
- Determinar cuándo se hicieron los cambios y desde dónde

La visibilidad de los eventos de Audit Trail depende de tu plan. Cuando Audit Trail está habilitado en tu organización, puedes ver los eventos de Agent durante un máximo de 90 días según la configuración de retención de Audit Trail. Si Audit Trail no está habilitado en tu organización, puedes ver los eventos de las últimas 24 horas.

### Enviar un flare remoto

Después de activar la configuración remota en un Agent, puedes enviar un flare desde Datadog. Para obtener instrucciones sobre cómo enviar un flare, consulta [Enviar un flare desde el sitio de Datadog][7].

Cuando te pongas en contacto con el servicio de asistencia de Datadog con la configuración remota activada para el Agent, el equipo podrá iniciar un flare desde tu entorno para poder ayudarte mejor y de forma más rápida. Los flares proporcionan información de solución de problemas al servicio de asistencia de Datadog para ayudarte a resolver tu problema. 

{{< img src="agent/fleet_automation/fleet_automation_remote_flare.png" alt="Enviar un flare remoto" style="width:100%;" >}}

## Gestión remota de Agents

La gestión remota de Agents simplifica el proceso de actualización de tu flota de Agents, ya que reduce la necesidad de coordinar varias herramientas de despliegue o gestión de la configuración.  Para obtener más información, consulta [Gestión remota del Agent][6].

{{< img src="agent/fleet_automation/fleet-automation-upgrades-2.png" alt="Actualizar agents de forma remota en Fleet Automation" style="width:100%;" >}}

## Control de acceso a la automatización de flotas

La automatización de flotas está disponible para todos los usuarios de una organización Datadog. Puedes controlar el acceso a funciones específicas:

| Permiso | Descripción |
|--------------|---------------|
| `API Keys Read`| Determina qué usuarios pueden visualizar y buscar Agents por clave API. |
| `Agent Flare Collection` | Restringe qué usuarios pueden enviar flares a distancia desde Fleet Automation. |
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