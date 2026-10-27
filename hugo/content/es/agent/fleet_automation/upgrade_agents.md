---
description: Actualice de forma remota los Agents de Datadog mediante Fleet Automation.
further_reading:
- link: /agent/fleet_automation/
  tag: Documentación
  text: Fleet Automation
- link: /api/latest/fleet-automation/
  tag: Documentación
  text: API de Fleet Automation
site_support_id: fleet-automation-standard-features
title: Actualizar agentes
---
Fleet Automation le permite actualizar de forma remota los Agents de Datadog en toda su flota sin acceso directo a servidores individuales. Puede activar las actualizaciones de inmediato, programarlas durante las ventanas de mantenimiento o automatizarlas a través de la API.

## Requisitos previos {#prerequisites}

- [Remote Configuration][7] habilitada para su organización y la clave de API del Agent
- [Actualizaciones remotas][8] habilitadas en cada Agent de VM de destino (`remote_updates: true`)
- Agent versión 7.71.1 o posterior para Windows y 7.69.0 o posterior para Linux
- VM con Linux o VM con Windows
- Al menos 2 GB de espacio en disco para la instalación inicial del Agent, más 2 GB adicionales para las actualizaciones. (La actualización requiere 1,3 GB en `/opt/datadog-packages` en Linux o `C:\ProgramData\Datadog\Installer\packages` en Windows. El espacio adicional mantiene dos instalaciones del Agent temporalmente durante la actualización en caso de que se necesite una reversión.)

<div class="alert alert-info">
La actualización remota de Agents en cargas de trabajo contenerizadas no es compatible.
</div>

## Actualice los Agents de inmediato {#upgrade-agents-immediately}

1. Desde la pestaña [{{< ui >}}Upgrades{{< /ui >}}][1], haga clic en {{< ui >}}Upgrade Now{{< /ui >}}.

   {{< img src="/agent/fleet_automation/upgrade-screen2.png" alt="La pestaña Upgrades con el botón Upgrade Now." style="width:100%;" >}}
1. Seleccione los Agents que desea actualizar. Filtre por información de servidor o etiquetas para dirigirse a un grupo específico.

   {{< img src="/agent/fleet_automation/start-agent-upgrade.png" alt="Pantalla de selección de Agents con opciones de filtrado para reducir la lista de Agents a actualizar." style="width:100%;" >}}

1. Revise el plan de implementación y haga clic en {{< ui >}}Upgrade Agents{{< /ui >}} para iniciar la actualización.

   {{< img src="/agent/fleet_automation/agent-upgrades-staged.png" alt="Vista del plan de implementación que muestra la lista de Agents preparados para la actualización." style="width:100%;" >}}

1. Siga el progreso en el tablero de [Deployments][2]. Haga clic en un Agent en la tabla de implementaciones para visualizar la duración, el progreso y el usuario que inició la actualización.
   {{< img src="/agent/fleet_automation/deployments.png" alt="Tablero de Deployments que muestra el progreso de la actualización y los detalles de cada Agent." style="width:100%;" >}}

## Programe actualizaciones de Agent {#schedule-agent-upgrades}

1. Desde la [pestaña {{< ui >}}Upgrades{{< /ui >}}][1], haga clic en {{< ui >}}\+ Create Schedule{{< /ui >}}.

1. En la página Upgrade Schedule, añada una {{< ui >}}Schedule name{{< /ui >}}.

1. Seleccione la versión del Agent. Puede actualizar a la versión más reciente, una versión anterior o dos versiones anteriores. 

   {{< img src="/agent/fleet_automation/agent_upgrade_select_version1.png" alt="Vea una lista de las actualizaciones de Agent programadas." style="width:100%;" >}}

1. Especifique los Agents que desea actualizar. Filtre por información de servidor o etiquetas para dirigirse a un grupo específico.
   
   {{< img src="/agent/fleet_automation/agent_upgrade_select_agents.png" alt="Vea una lista de los Agents que se van a actualizar." style="width:100%;" >}}

1. Establezca la ventana de despliegue para estas actualizaciones. Puede seleccionar los días, la franja horaria y la zona horaria para la actualización.

   {{< img src="/agent/fleet_automation/agent_upgrade_set_window.png" alt="Seleccione la franja horaria para sus actualizaciones de Agent." style="width:100%;" >}}

1. Configure notificaciones para las actualizaciones del estado del despliegue. Notifique a su equipo a través de servicios conectados a Datadog, como Slack, Teams o PagerDuty.

   {{< img src="/agent/fleet_automation/agent_upgrade_set_notification.png" alt="Seleccione a las personas o los canales que recibirán notificaciones sobre el progreso de la actualización." style="width:100%;" >}}

1. Haga clic en {{< ui >}}Create Schedule{{< /ui >}} para guardar el horario. 

1. Vea una lista de sus actualizaciones programadas en la [pestaña {{< ui >}}Upgrades{{< /ui >}}][1], en la sección {{< ui >}}Upgrade Schedules{{< /ui >}}. 

   {{< img src="/agent/fleet_automation/agent_upgrade_schedule_list3.png" alt="Vea una lista de las actualizaciones programadas para sus Agents." style="width:100%;" >}}

## Actualice Agents con la API {#upgrade-agents-with-the-api}

Fleet Automation proporciona una API para activar actualizaciones de Agent de forma programática o en un horario recurrente. Inicie actualizaciones para cualquier conjunto de servidores con consultas de filtro, o cree horarios que se ejecuten durante ventanas de mantenimiento definidas con una versión de Agent especificada. Para obtener todos los detalles, consulte la [Fleet Automation API][3].

## Proceso de actualización {#upgrade-process}

Al igual que en una actualización manual, espere de 5 a 30 segundos de tiempo de inactividad mientras el Agent se reinicia. El proceso de actualización completo toma aproximadamente 5 minutos: alrededor de 2 minutos para la actualización en sí, y el tiempo restante se dedica a monitorear la estabilidad. Si la actualización falla, el Agent vuelve automáticamente a la versión anterior.

El proceso de actualización agrega principalmente archivos a los siguientes directorios:

Linux:
- `/opt/datadog-packages`
- `/etc/datadog-agent`
- `/etc/systemd/system`

Windows:
- `C:\ProgramData\Datadog\Installer\packages`
- `C:\Program Files\Datadog\Datadog Agent`

El Agent establece los permisos adecuados para estos archivos. No se altera ningún archivo de configuración durante la actualización.

## Precedencia de actualización {#upgrade-precedence}

Datadog recomienda gestionar las actualizaciones desde una sola fuente a la vez. Utilice Fleet Automation o una herramienta de gestión de configuración, no ambas. Si ejecuta una herramienta de gestión de configuración en un Agent que se actualizó a través de Fleet Automation, la herramienta revierte el Agent a la [`DD_AGENT_MINOR_VERSION`][4] en su configuración. Si no se establece ninguna `DD_AGENT_MINOR_VERSION`, el Agent se actualiza a la última versión disponible.

## Solución de problemas {#troubleshooting}

### Remote Agent Management no está habilitado {#remote-agent-management-is-not-enabled}

Si el panel lateral del Agent muestra **Remote Agent Management: NOT ENABLED**, siga [Habilitar la administración remota del Agent][8] para habilitar `remote_updates` en el servidor y reinicie el Agent. Remote Configuration puede conectarse mientras las actualizaciones remotas están deshabilitadas.

Si el Agent sigue sin estar disponible para actualizaciones, verifique los [requisitos previos](#prerequisites), la conectividad de Remote Configuration y si Datadog Installer se está ejecutando.

### La versión del Agent recién lanzada aún no está disponible para la actualización {#newly-released-agent-version-is-not-yet-available-for-upgrade}

Después de que se lanza una nueva versión del Agent, pueden pasar hasta 24 horas antes de que aparezca como objetivo de actualización en Fleet Automation. Si falta una versión lanzada recientemente en el selector de actualizaciones, espere hasta 24 horas y vuelva a intentarlo.

### Datadog Installer incompatible con el Agent (anterior a 7.66) {#datadog-installer-incompatible-with-agent-pre-766}

Si usted fue cliente de Preview y configuró Remote Agent Management antes de la versión 7.66 del Agent, es posible que Datadog Installer sea incompatible con el Agent.

A partir de la versión 7.66, el componente del instalador viene incluido con el Agent. Esto mantiene ambos componentes sincronizados y evita discrepancias de versión que pueden bloquear la administración remota. Las versiones anteriores del Agent no incluían el instalador, lo que puede causar problemas de compatibilidad.

Para diagnosticar y solucionar el problema:

1. Utilice la siguiente [consulta en Fleet Automation][5] para identificar los servidores afectados:
   ```txt
   support_remote_upgrade:datadog-installer
   ```
1. Si su configuración se ve afectada, [vuelva a ejecutar el script de instalación][6] en cada Agent afectado para actualizar a una versión del Agent que cumpla con los [requisitos previos](#prerequisites).

Después de actualizar, [habilite la administración remota del Agent][8] para usar Fleet Automation para futuras actualizaciones. Si no realiza la actualización, el Agent existente seguirá funcionando, pero las actualizaciones remotas no estarán disponibles.

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/fleet/agent-upgrades
[2]: https://app.datadoghq.com/fleet/deployments
[3]: /es/api/latest/fleet-automation/
[4]: https://github.com/DataDog/agent-linux-install-script?tab=readme-ov-file#install-script-configuration-options
[5]: https://app.datadoghq.com/fleet?query=support_remote_upgrade%3Adatadog-installer
[6]: https://app.datadoghq.com/fleet/install-agent/latest?platform=overview
[7]: /es/agent/guide/setup_remote_config
[8]: /es/agent/guide/setup_remote_config/#enable-remote-agent-management