---
description: Configure de forma remota las integraciones del Datadog Agent a escala
  con Fleet Automation.
further_reading:
- link: /agent/fleet_automation/
  tag: Documentación
  text: Fleet Automation
- link: /agent/fleet_automation/configure_agents/
  tag: Documentación
  text: Configurar Agents
- link: /api/latest/fleet-automation/
  tag: Documentación
  text: API de Fleet Automation
site_support_id: fleet-automation-standard-features
title: Configuración de Agent Integrations
---
Fleet Automation puede implementar, actualizar y eliminar archivos de configuración de [integración][1] (`conf.d`) en sus Agents de forma remota. Seleccione los Agents de destino por servidor o etiqueta, elija una integración y Fleet Automation enviará el cambio de configuración a toda su flota.

## Requisitos previos {#prerequisites}

- [Remote Configuration][2] habilitada para su organización y la clave de API del Agent
- [Actualizaciones remotas][7] habilitadas en cada Agent de VM de destino (`remote_updates: true`)
- Agent versión 7.76 o posterior. Para actualizar sus Agents, consulte [Upgrade Agents][6].
- VMs de Linux (instaladas con el script de instalación o el rol de Ansible de Datadog) o VMs de Windows

<div class="alert alert-info">
La configuración de integraciones en Agents en cargas de trabajo en contenedores no es compatible.
</div>

## Compatibilidad {#compatibility}

Fleet Automation admite la configuración de integraciones listas para usar que tienen un archivo de configuración `conf.d`, como Redis, MySQL y Windows Certificate Store.

Las verificaciones personalizadas **no** son compatibles.

## Configure integraciones en múltiples Agents {#configure-integrations-across-multiple-agents}

<div class="alert alert-tip">A medida que avanza por el asistente de configuración, el panel <strong>Configuration Summary</strong> muestra el contexto actual de los Agents seleccionados. Utilice esto para verificar cómo afectaría un cambio a un Agent mediante la vista previa de las diferencias de configuración en un Agent específico dentro del contexto.</div>

1. En Fleet Automation, abra la pestaña [{{< ui >}}Configuration{{< /ui >}}][3] y haga clic en {{< ui >}}Configure Agents{{< /ui >}}.
1. Defina el contexto de la configuración para los Agents de destino. Filtre por información de servidor o etiquetas para dirigirse a un grupo específico.
1. Elija {{< ui >}}Agent integrations{{< /ui >}}.
1. Seleccione la integración que desea configurar.

    <div class="alert alert-info">Fleet Automation puede detectar integraciones no configuradas en sus servidores. Si un proceso se está ejecutando en un servidor que tiene una integración de Datadog disponible pero no tiene una configuración activa, aparece en la lista de <strong>Unconfigured integrations detected on your hosts</strong>. Utilice esto para identificar brechas de monitoreo en toda su flota.</div>

1. Seleccione una operación (consulte [Cómo se aplican los cambios de configuración](#how-configuration-changes-are-applied) para obtener más información sobre cada operación):

    - {{< ui >}}Add New{{< /ui >}}. Especifique el nombre del archivo para el nuevo archivo de configuración y complete la configuración según se le solicite.
    - {{< ui >}}Edit & Replace{{< /ui >}}. Haga clic en {{< ui >}}Select a file{{< /ui >}} y elija el archivo de configuración que desea reemplazar, luego complete la nueva configuración según se le solicite.
    - {{< ui >}}Delete{{< /ui >}}. Haga clic en {{< ui >}}Select a File to Delete{{< /ui >}}.

    <div class="alert alert-tip">Alterne entre el modo <strong>Visual</strong> y <strong>YAML</strong> al completar la configuración de la integración. Use el modo <strong>YAML</strong> para pegar YAML directamente.</div>

1. Revise el plan de implementación. Fleet Automation genera las diferencias de configuración para cada Agent afectado para que pueda verificar los cambios exactos.
1. Haga clic en {{< ui >}}Deploy Configuration{{< /ui >}} para iniciar la implementación. Siga el progreso desde la [página de Deployments][4].

## Cómo se aplican los cambios de configuración {#how-configuration-changes-are-applied}

Cada operación aplica los cambios al archivo de configuración `conf.d` de la integración de manera diferente:

- {{< ui >}}Add New{{< /ui >}}: Implementa un nuevo archivo de configuración de integración. Si ya existe un archivo de configuración, se reemplaza por completo y el YAML que proporcione se convierte en la nueva configuración completa para esa integración en los Agents de destino.

- {{< ui >}}Edit & Replace{{< /ui >}}: Solo se modifican los campos que especifique; los campos no mencionados permanecen sin cambios.

  <div class="alert alert-warning">
  Los campos de matriz (como <code>tags</code>) se reemplazan por completo durante una operación Edit & Replace, no se combinan. Incluya todos los valores deseados en su actualización. Cualquier valor que omita se eliminará.
  </div>

- {{< ui >}}Delete{{< /ui >}}: Elimina el archivo de configuración de integración de los Agents de destino.

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/integrations/
[2]: /es/agent/guide/setup_remote_config
[3]: https://app.datadoghq.com/fleet/agent-management
[4]: https://app.datadoghq.com/fleet/deployments
[5]: https://www.rfc-editor.org/rfc/rfc7386
[6]: /es/agent/fleet_automation/upgrade_agents/
[7]: /es/agent/guide/setup_remote_config/#enable-remote-agent-management