---
description: Actualizar y configurar Agents de forma remota
further_reading:
- link: /agent/fleet_automation/
  tag: Documentación
  text: Automatización de flotas
- link: /agent/remote_config/
  tag: Documentación
  text: Configuración remota
title: Gestión remota de Agents
---

{{< callout url="https://www.datadoghq.com/product-preview/agent-upgrades/" btn_hidden="false" header="Try the Preview!">}}
La actualización de Agents con la gestión remota está en vista previa. Utiliza este formulario para solicitar acceso.
{{< /callout >}}

## Información general

La gestión remota de Agents simplifica el proceso de actualización de tu flota de Agents, ya que reduce la necesidad de coordinar varias herramientas de despliegue o gestión de la configuración. La gestión remota de Agents te ofrece lo siguiente:
* **Gestión centralizada**: actualiza los Agents en todos los entornos con una sola herramienta, lo que garantiza la coherencia con las últimas características y parches de seguridad.
* **Visibilidad y monitorización**: haz un seguimiento del estado de las actualizaciones en tiempo real, lo que permite verificar rápidamente el éxito del despliegue.
* **Eficiencia operativa**: agiliza el proceso de actualización, lo que elimina la coordinación entre equipos y unifica el despliegue en distintas plataformas.

## Configuración

Para activar la gestión remota de Agents:
1. Si todavía no activaste la configuración remota en el Agent, sigue las [instrucciones de configuración][1] para activarla.
1. Ve a la [página de instalación del Datadog Agent][3] de tu plataforma o herramienta de gestión de configuración.
1. Activa **Remote Agent Management** (Gestión remota de Agents). La activación de la gestión remota de Agents añade la variable de entorno `DD_REMOTE_UPDATES` al comando de instalación del Agent generado.

   {{< img src="/agent/fleet_automation/remote-agent-management-toggle.png" alt="Botón de activación de la gestión remota de Agents." style="width:100%;" >}}

1. Utiliza el comando de instalación del Agent generado para actualizar tu Agent.

   **Nota**: Debes ejecutar el comando de instalación generado con `DD_REMOTE_UPDATES` establecido en `true` para obtener acceso a la gestión remota de Agents. La activación de la gestión remota de Agents sin ejecutar el comando de instalación no concede acceso a la característica.

## Actualizar Agents de forma remota
### Plataformas compatibles

- Máquinas virtuales Linux instaladas mediante el script de instalación o el rol de Ansible para Datadog
- Máquinas virtuales Windows que utilizan el método de instalación predeterminado (gMSA o cuenta `ddagentuser` predeterminada)

<div class="alert alert-info">La actualización remota de Agents en entornos de contenedores no es compatible.</div>

### Requisitos previos

* **Permisos de usuario**: los usuarios deben tener el permiso [Agent Upgrade][2] dentro de Fleet Automation (Automatización de flotas). El permiso está activado de forma predeterminada en el rol Datadog Admin.
* **Espacio en disco**: Datadog sugiere tener al menos 2 GB para la instalación inicial del Agent y 2 GB adicionales para actualizar el Agent desde Fleet Automation (Automatización de flotas). En concreto, la actualización requiere 1,3 GB en el directorio `/opt/datadog-packages` en Linux, o `C:\ProgramData\Datadog Installer\packages` en Windows. El espacio adicional garantiza que haya espacio suficiente para mantener temporalmente dos instalaciones de Agent durante la actualización proceso en caso de que sea necesaria una reversión.

### Actualizar los Agents

<div class="alert alert-danger">Las actualizaciones remotas de Agents se encuentran en vista previa. Prueba la característica solo en hosts que no sean esenciales para las cargas de trabajo de producción. Intenta actualizar los Agents de uno en uno antes de probar las actualizaciones masivas.</div>

Para actualizar tus Agents:
1. [Activa la gestión remota de Agents](#setup).
1. Desde la [pestaña **Upgrade Agents**][4] (Actualizar Agents), haz clic en **Start Agents Upgrade** (Iniciar actualización de Agents).

   {{< img src="/agent/fleet_automation/upgrade-screen.png" alt="Selecciona los Agents que deseas actualizar." style="width:100%;" >}}
1. Selecciona los Agents que deseas actualizar. Puedes filtrar por información de host o etiquetas (tags) para dirigirte a un grupo de Agents.

   {{< img src="/agent/fleet_automation/start-agent-upgrade.png" alt="Selecciona los Agents que deseas actualizar." style="width:100%;" >}}
1. Haz clic en **Upgrade Agents** (Actualizar Agents) para iniciar la actualización.
1. Utiliza el dashboard [Deployments][10] (Despliegues) para hacer un seguimiento del proceso de actualización. Al hacer clic en un Agent en la tabla de despliegues, obtendrás más información sobre la actualización, incluido la duración, el progreso y el usuario que inició la actualización.
   {{< img src="/agent/fleet_automation/deployments.png" alt="Selecciona los Agents que deseas actualizar." style="width:100%;" >}}

### Proceso de actualización

Al igual que en una actualización manual, se espera un caída del sistema de 5 a 30 segundos mientras se reinicia el Agent. El proceso de actualización completo tarda aproximadamente 5 minutos. Alrededor de 2 minutos de este tiempo se utilizan para el proceso de actualización. El resto del tiempo se dedica a la monitorización de la actualización para garantizar la estabilidad y determinar si es necesaria una reversión. Si la actualización falla y se requiere una reversión, el Agent vuelve automáticamente a su versión anterior.

El proceso de actualización añade principalmente archivos a los siguientes directorios:

Linux:
* `/opt/datadog-packages`
* `/etc/datadog-agent`
* `/etc/systemd/system`

Windows:
* `C:\ProgramData\Datadog Installer\packages`
* `C:\Program Files\Datadog\Datadog Agent`

El Agent garantiza que se establezcan los permisos adecuados para estos archivos. No se altera ningún archivo de configuración durante el proceso de instalación.

### Prioridad de las actualizaciones

Para disfrutar de una experiencia de actualización más coherente, Datadog recomienda gestionar las actualizaciones de una fuente a la vez. Utiliza la actualización de flotas o una herramienta de gestión de configuración. Si ejecutas una herramienta de gestión de configuración en un Agent que ya se ha actualizado mediante la actualización de flotas, la actualización revierte el Agent a la [`DD_AGENT_MINOR_VERSION`][9] especificada en tu configuración. Si no se establece una `DD_AGENT_MINOR_VERSION`, el Agent se actualiza a la última versión disponible.

### Duplicaciones y proxies

Puede utilizar la gestión remota de Agents junto con un proxy o repositorios duplicados.

Para obtener instrucciones sobre cómo configurar tu Agent para utilizar un proxy, consulta [Configuración del proxy del Agent][6]. Una vez configurado el proxy, reinicia el Agent para aplicar los parámetros.

Para obtener instrucciones sobre el uso de repositorios duplicados o con air-gap, consulta las siguientes páginas:
- [Sincroniza las imágenes de Datadog con un registro de contenedores privado][7].
- [Instalar el Agent en un servidor con conectividad limitada a Internet][8]

### Cambio a versiones anteriores de Agents

Si necesitas cambiar un Agent a una versión anterior, sigue los pasos de [Actualizar los Agents](#downgrading-agents) y especifica la versión a la que deseas cambiar. Datadog recomienda utilizar la última versión del Agent y actualizarlo con regularidad para asegurarse de tener acceso a las últimas características.

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/agent/remote_config/#enabling-remote-configuration
[2]: /es/account_management/rbac/permissions#fleet-automation
[3]: https://app.datadoghq.com/account/settings/agent/latest
[4]: https://app.datadoghq.com/fleet/agent-upgrades
[5]: https://app.datadoghq.com/fleet/deployments
[6]: /es/agent/configuration/proxy/
[7]: /es/containers/guide/sync_container_images/
[8]: https://docs.datadoghq.com/es/agent/guide/installing-the-agent-on-a-server-with-limited-internet-connectivity/
[9]: https://github.com/DataDog/agent-linux-install-script?tab=readme-ov-file#install-script-configuration-options
[10]: https://app.datadoghq.com/fleet/deployments