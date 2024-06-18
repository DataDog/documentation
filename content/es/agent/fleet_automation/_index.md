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

{{< callout btn_hidden="true">}}La automatización de flotas está en fase beta. Accede a ella desde la página <a href="https://app.datadoghq.com/fleet">Automatización de flotas</a> de Datadog.{{< /callout >}}

{{< site-region region="gov" >}}
<div class="alert alert-warning">La automatización de flotas no es compatible con el <a href="/getting_started/site">sitio de Datadog </a> seleccionado ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

## Información general

La automatización de flotas de Datadog te permite controlar de forma centralizada y gestionar en remoto Datadog Agents a escala para responder a tus necesidades de observabilidad en constante evolución.

{{< img src="agent/fleet_automation/fleet-automation.png" alt="Página de automatización de flotas" style="width:100%;" >}}

Con la plataforma de automatización de flotas, puedes:
- Visualizar el Agent y las configuraciones de sus integraciones para ayudar a confirmar cambios en la implementación y garantizar la coherencia de la configuración.
- Enviar un flare desde dentro de tu organización, reduciendo así el tiempo que se tarda en depurar problemas en un Agent.
- Asegurarte de que tu flota de Agents utiliza las últimas mejoras, identificando las versiones obsoletas del Agent.
- Ayudar a rotar las claves API y asegurarte de que las claves antiguas pueden desactivarse sin ningún impacto, identificando cuáles y cuántos Agents utilizan una clave específica.

Utiliza la página [**Automatización de la flota**][1] para obtener información sobre hosts no supervisados, Agents que deben actualizarse o Agents que presentan problemas de integración. Para cada Agent, puedes ver:
- La versión del Agent 
- Si el Agent tiene alguna integración no configurada o mal configurada
- Los servicios que está monitorizando el Agent
- El estado de configuración remota del Agent
- Los productos habilitados en el Agent

Al seleccionar un Agent, obtendrás más información sobre él, como su configuración, sus integraciones conectadas y una pestaña de ayuda que puedes utilizar para enviar un flare remoto.

{{< img src="agent/fleet_automation/fleet-automation-agent.png" alt="Información sobre la integración de un Agent" style="width:100%;" >}}

## Configuración de la automatización de flotas

La automatización de flotas incorpora varias funciones de Datadog, que se activan automáticamente en el Agent versión 7.49/6.49 o posterior. Para asegurarte de que tienes acceso a todas las funciones, actualiza tu Agent a la versión 7.49/6.49 o posterior.

Si utilizas un Agent más antiguo, es posible que aún puedas activar las siguientes funciones de Datadog de forma individual:
- **Configuración remota**: Para obtener información sobre las versiones compatibles del Agent y los pasos que debes seguir durante la configuración, consulta [Habilitación de la configuración remota][3].
- **Configuración del Agent**: Necesitas tener la versión del Agent 7.39/6.39 o posterior para habilitar la pestaña de configuración del Agent. Esta se encuentra habilitada por defecto en las versiones del Agent 7.47.0/6.47.0 o posteriores. Para habilitar la configuración del Agent manualmente, define `inventories_configuration_enabled` en tu [archivo de configuración del Agent][2] como `true`. También puedes utilizar la variable de entorno`DD_INVENTORIES_CONFIGURATION_ENABLED`.
- **Configuración de una integración del Agent**: La configuración de una integración del Agent está habilitada por defecto en las versiones 7.49/6.49 o posteriores del Agent. Para habilitar la configuración de una integración del Agent manualmente, define`inventories_checks_configuration_enabled` en tu [archivo de configuración del Agent][2] como `true`. También puedes utilizar la variable de entorno `DD_INVENTORIES_CHECKS_CONFIGURATION_ENABLED`.

Datadog te recomienda actualizar tu Agent con regularidad para asegurarte de que tienes acceso a las últimas funciones.

## Enviar un flare remoto

Antes de enviar un flare, asegúrate de que la configuración remota está [habilitada](#configuring-fleet-automation) en el Agent seleccionado.

{{% remote-flare %}}

{{< img src="agent/fleet_automation/fleet-automation-flares.png" alt="El botón Send Ticket (Enviar ticket) genera un formulario para enviar un flare sobre un nuevo ticket de asistencia o sobre uno ya existente" style="width:100%;" >}}

## Control de acceso a la automatización de flotas

La automatización de flotas está disponible para todos los usuarios de una organización Datadog. Puedes controlar el acceso a funciones específicas:

| Permiso | Descripción |
|--------------|---------------|
| `API keys read`| Determina qué usuarios pueden visualizar y buscar Agents por clave API. |
| `Agent flare collection` | Determina qué usuarios pueden enviar flares de forma remota. |

Para obtener información sobre la configuración de funciones y permisos, consulta [Control de acceso][5].

## Lectura adicional

{{< nombre parcial="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/fleet
[2]: /es/agent/configuration/agent-configuration-files/
[3]: /es/agent/remote_config#enabling-remote-configuration
[4]: /es/infrastructure/list/#agent-configuration
[5]: https://docs.datadoghq.com/es/account_management/rbac/