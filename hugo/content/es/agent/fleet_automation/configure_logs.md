---
description: Configure de forma remota la recopilación de registros personalizados
  a escala con Fleet Automation.
further_reading:
- link: /agent/fleet_automation/
  tag: Documentación
  text: Fleet Automation
- link: /agent/fleet_automation/configure_integrations/
  tag: Documentación
  text: Configuración de Agent Integrations
- link: /agent/fleet_automation/configure_agents/
  tag: Documentación
  text: Configurar Agents
- link: /api/latest/fleet-automation/
  tag: Documentación
  text: API de Fleet Automation
- link: /agent/logs/
  tag: Documentación
  text: Recopilación de registros del Agent del servidor
- link: /logs/guide/log-collection-troubleshooting-guide/
  tag: Documentación
  text: Guía de solución de problemas de recopilación de registros
site_support_id: fleet-automation-standard-features
title: Configurar registros personalizados
---
Utilice [Fleet Automation][2] para administrar la configuración de [recopilación de registros personalizados][4] en sus Agents de forma remota y a escala. En lugar de editar los archivos de configuración `conf.d` servidor por servidor, defina el contexto de un cambio según la información o las etiquetas del servidor e impleméntelo en todos los Agents que coincidan a la vez. Antes de implementar, revise las diferencias de configuración de cada Agent en el contexto.

## Requisitos previos {#prerequisites}

- [Remote Configuration][1] habilitada para su organización y la clave de API del Agent
- [Remote updates][10] habilitadas en cada Agent de VM de destino (`remote_updates: true`)
- Agent versión 7.76 o posterior. Para actualizar sus Agents, consulte [Upgrade Agents][5].
- VMs de Linux (instaladas con el script de instalación o el rol de Ansible de Datadog) o VMs de Windows
- Recopilación de registros habilitada en los Agents de destino (`logs_enabled: true` en `datadog.yaml`). Fleet Automation implementa el archivo de configuración de cualquier manera, pero el Agent no comienza a recopilar registros hasta que se habilita la recopilación de registros. Consulte [Recopilación de registros del Agent del servidor][8].

<div class="alert alert-info">
No se admite la configuración de registros personalizados en Agents de cargas de trabajo en contenedores. Para entornos en contenedores, consulte <a href="/containers/kubernetes/log/">Kubernetes Log Collection</a>.
</div>

## Configure registros personalizados en varios Agents {#configure-custom-logs-across-multiple-agents}

<div class="alert alert-tip">A medida que avanza por el asistente de configuración, el panel <strong>Configuration Summary</strong> muestra el contexto actual de los Agents seleccionados. Utilice esto para verificar cómo afectaría un cambio a un Agent mediante la vista previa de las diferencias de configuración en un Agent específico dentro del contexto.</div>

1. En Fleet Automation, abra la pestaña [{{< ui >}}Configuration{{< /ui >}}][2] y haga clic en {{< ui >}}Configure Agents{{< /ui >}}.
1. Defina el contexto de la configuración para los Agents de destino. Filtre por información de servidor o etiquetas para dirigirse a un grupo específico.
1. Elija {{< ui >}}Custom Logs{{< /ui >}}.
1. Seleccione una operación (para obtener más información, consulte [Cómo se aplican los cambios de configuración](#how-configuration-changes-are-applied)):

    - {{< ui >}}Add New{{< /ui >}}. Especifique el nombre del archivo para el nuevo archivo de configuración y complete la configuración según se le solicite. Para obtener una explicación de los campos de recopilación de registros, consulte [Recopilación de registros personalizados][4]. Use el campo {{< ui >}}Tags{{< /ui >}} para adjuntar [etiquetas][6] a los registros recopilados. Haga clic en {{< ui >}}\+ Add Log Collection{{< /ui >}} para agregar más configuraciones de recopilación de registros.
    - {{< ui >}}Edit & Replace{{< /ui >}}. Haga clic en {{< ui >}}Select a File{{< /ui >}} y elija el archivo de configuración que desea reemplazar, luego actualice la configuración de recopilación de registros.
    - {{< ui >}}Delete{{< /ui >}}. Haga clic en {{< ui >}}Select a File to Delete{{< /ui >}}.

    <div class="alert alert-tip">Alterne entre el modo <strong>Visual</strong> y <strong>YAML</strong> al completar la configuración de recopilación de registros. Use el modo <strong>YAML</strong> para pegar YAML directamente.</div>

1. Revise el plan de implementación. Fleet Automation genera las diferencias de configuración para cada Agent afectado para que pueda verificar los cambios exactos.
1. Haga clic en {{< ui >}}Deploy Configuration{{< /ui >}} para iniciar la implementación. Siga el progreso desde la [página de implementaciones][3].

## Cómo se aplican los cambios de configuración {#how-configuration-changes-are-applied}

Cada operación aplica los cambios a la recopilación de registros personalizados en un Agent de manera diferente:

- {{< ui >}}Add New{{< /ui >}}: Implementa un nuevo archivo de configuración.

- {{< ui >}}Edit & Replace{{< /ui >}}: Reemplaza todo el archivo de configuración. Incluya todos los valores deseados en su actualización. Cualquier valor que omita se eliminará.

- {{< ui >}}Delete{{< /ui >}}: Elimina el archivo de configuración de los Agents de destino.

## Verificar la recopilación de registros {#verify-log-collection}

Después de implementar una configuración:

1. En [Fleet Automation][9], abra la página de detalles de uno de los Agents de destino.
1. En la pestaña {{< ui >}}Configuration{{< /ui >}}, confirme que el archivo de configuración de registros personalizados nuevo o actualizado aparezca en la lista sin estado de error. Esto significa que la configuración se envió y aplicó correctamente.

Si la implementación se realizó correctamente pero no llegan registros, consulte la [Guía de solución de problemas de recopilación de registros][7].

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/agent/guide/setup_remote_config
[2]: https://app.datadoghq.com/fleet/agent-management
[3]: https://app.datadoghq.com/fleet/deployments
[4]: /es/agent/logs/?tab=tailfiles#custom-log-collection
[5]: /es/agent/fleet_automation/upgrade_agents/
[6]: /es/getting_started/tagging/assigning_tags/
[7]: /es/logs/guide/log-collection-troubleshooting-guide/
[8]: /es/agent/logs/
[9]: https://app.datadoghq.com/fleet
[10]: /es/agent/guide/setup_remote_config/#enable-remote-agent-management