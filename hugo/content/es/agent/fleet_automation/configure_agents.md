---
description: Implemente y gestione la configuración del Datadog Agent a escala con
  Fleet Automation.
further_reading:
- link: /agent/fleet_automation/
  tag: Documentación
  text: Fleet Automation
- link: /api/latest/fleet-automation/
  tag: Documentación
  text: API de Fleet Automation
site_support_id: fleet-automation-standard-features
title: Configurar Agents
---
Utilice [Fleet Automation][3] para implementar y gestionar la configuración del Datadog Agent a escala. Aplique cambios de configuración a través de flujos de trabajo guiados en la interfaz de usuario o con archivos YAML personalizados.

## Requisitos previos {#prerequisites}

- [Remote Configuration][9] habilitada para su organización
- Agent versión 7.73+ para la configuración de Agent y OTel Collector (versión 7.76+ para configurar integraciones y secretos). Para actualizar sus Agents, consulte [Upgrade Agents][10].
- VMs de Linux instaladas con el script de instalación o el rol de Ansible de Datadog, o VMs de Windows

{{< callout url="https://www.datadoghq.com/product-preview/configure-agent-kubernetes-operator/" header="¡Únase a la vista previa!" >}}
La configuración remota de Agents en cargas de trabajo en contenedores está en versión preliminar. Si le interesa esta función, complete el formulario para solicitar acceso.
{{< /callout >}}

{{< callout url="https://www.datadoghq.com/product-preview/modify-tags-fleet-automation/" header="¡Únase a la vista previa!" >}}
La gestión de etiquetas del Datadog Agent con Fleet Automation está en versión preliminar. Si le interesa esta función, complete el formulario para solicitar acceso.
{{< /callout >}}

## Configurar múltiples Agents {#configure-multiple-agents}

1. En Fleet Automation, abra la pestaña [Configuration][1] y haga clic en {{< ui >}}Configure Agents{{< /ui >}}.
1. Defina el contexto de la configuración para los Agents de destino. Filtre por información de servidor o etiquetas para dirigirse a un grupo específico.

   {{< img src="/agent/fleet_automation/fa_scope_config.png" alt="El paso Contexto de esta configuración en el flujo de trabajo Configure Agents de Fleet Automation, que muestra filtros para el entorno, el sistema operativo y el nombre de servidor, una lista de 33 Agents incluidos en el contexto y un panel Configuration Summary a la derecha." style="width:100%;" >}}

1. Seleccione los productos (por ejemplo, Logs, APM o NDM) que deben ejecutar los Agents de destino.

   {{< img src="/agent/fleet_automation/fa_create_agent_configuration3.png" alt="El paso Select products to configure en el flujo de trabajo Configure Agents de Fleet Automation, que muestra mosaicos de productos agrupados en Core Observability (Infrastructure Monitoring, Log Management, APM) y Additional Observability (Live Process Monitoring, Cloud Network Monitoring, Network Device Monitoring)." style="width:100%;" >}}

1. Revise el plan de implementación para confirmar los Agents incluidos en el contexto y la configuración de la implementación, como la simultaneidad del despliegue.
1. Haga clic en {{< ui >}}Deploy Configuration{{< /ui >}} para iniciar la implementación y realizar un seguimiento de su progreso desde la [página Implementaciones][2].

## Edite la configuración de un solo Agent {#edit-the-configuration-of-a-single-agent}

1. Navegue a [Fleet View][3]. 

1. (Opcional) Filtre por información de servidor o etiquetas para reducir la lista.

1. Seleccione un servidor para abrir su panel lateral, luego haga clic en la pestaña {{< ui >}}Configuration{{< /ui >}}. 

1. Haga clic en {{< ui >}}Edit{{< /ui >}} para modificar la configuración. 

1. Haga clic en {{< ui >}}Deploy Changes{{< /ui >}} para aplicar sus actualizaciones.

**Nota**: Algunos campos de configuración (por ejemplo, `api_key`, `site` y `notable_events`) no se pueden modificar.

El ejemplo a continuación muestra el campo `logs_enabled` cambiado de `false` a `true`, lo que habilita la recopilación de registros en el Agent después de la implementación.

{{< img src="/agent/fleet_automation/agent_remote_management_single_agent_config2.png" alt="Edite e implemente cambios en la configuración del Agent." style="width:90%;" >}}

## Configure Agents con la API {#configure-agents-with-the-api}

Fleet Automation proporciona una API para aplicar actualizaciones de configuración mediante programación. Implemente cambios en cualquier grupo de servidores con consultas de filtro, proporcionando archivos de configuración completos o parches específicos. Envíe la configuración bajo demanda o intégrela en sus flujos de trabajo de automatización existentes. Para obtener todos los detalles, consulte la [Fleet Automation API][4].

**Nota**: La API no admite todos los campos de configuración del Agent. La configuración relacionada con la conexión del Agent o los secretos (`site`, `api_key` y otros parámetros de autenticación) no se puede administrar a través de la API.

## Precedencia de configuración {#configuration-precedence}

Los cambios de configuración implementados a través de Fleet Automation siguen diferentes reglas según el destino:

- **Configuración del Agent (`datadog.yaml`):** Fleet Automation aplica los cambios mediante un parche de fusión: solo se actualizan los campos especificados y los campos no mencionados permanecen sin cambios. Si ocurre un conflicto a nivel de campo, el valor de Fleet Automation tiene prioridad sobre cualquier valor local.
- **Configuraciones de integración y registros personalizados:** Fleet Automation admite dos modos:
    - Implementar un nuevo archivo de configuración.
    - Actualizar un archivo existente mediante un parche de fusión para modificar solo campos específicos. Si implementa un cambio dirigido a un nombre de archivo existente sin usar un parche de fusión, el archivo se sobrescribe por completo.

  En ambos casos, el cambio más reciente se convierte en la configuración activa del Agent, independientemente de la fuente (Fleet Automation, herramientas de gestión de configuración o ediciones directas en el servidor).

Utilice [Fleet Automation Audit Trail][5] para realizar un seguimiento de los cambios de configuración recientes en sus Agents y configurar alertas sobre esos cambios.

## Espejos y proxies {#mirrors-and-proxies}

Puede utilizar la gestión remota del Agent junto con un proxy o repositorios reflejados.

Para obtener instrucciones sobre cómo configurar su Agent para usar un proxy, consulte [Agent Proxy Configuration][6]. Después de configurar el proxy, reinicie el Agent para aplicar la configuración.

Para obtener instrucciones sobre el uso de repositorios reflejados o aislados (air-gapped), consulte:
- [Sincronizar las imágenes de Datadog con un registro de contenedores privado][7]
- [Instalar Agent en un servidor con conectividad a internet limitada][8]

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/fleet/agent-management
[2]: https://app.datadoghq.com/fleet/deployments
[3]: https://app.datadoghq.com/fleet
[4]: /es/api/latest/fleet-automation/
[5]: /es/agent/fleet_automation/fleet_view/#view-agent-audit-trail-events
[6]: /es/agent/configuration/proxy/
[7]: /es/containers/guide/sync_container_images/
[8]: /es/agent/guide/installing-the-agent-on-a-server-with-limited-internet-connectivity/
[9]: /es/agent/guide/setup_remote_config
[10]: /es/agent/fleet_automation/upgrade_agents/