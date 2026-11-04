---
description: Configure Remote Configuration con Fleet Automation para habilitar Agent
  flares, actualizaciones remotas y gestión de configuración centralizada.
disable_toc: false
further_reading:
- link: /remote_configuration
  tag: Documentación
  text: Obtenga más información sobre Remote Configuration
- link: /agent/fleet_automation
  tag: Documentación
  text: Fleet Automation
- link: /infrastructure/list/#agent-configuration
  tag: Documentación
  text: Obtenga información sobre la vista de configuración del Agent
- link: https://www.datadoghq.com/blog/fleet-automation/
  tag: Blog
  text: Gobierne de forma centralizada y administre de forma remota los Datadog Agents
    a escala con Fleet Automation
title: Remote Configuration para Fleet Automation
---
Esta página cubre la configuración y el uso de {{< tooltip glossary="remote_configuration" case="title" >}} con [Fleet Automation][11]. Las siguientes funciones de Fleet Automation requieren Remote Configuration:
| Función | Descripción | Versión mínima del Agent |
|---------|-------------|------------------------|
| **[Agent flares][9]** | Envíe un flare desde el sitio de Datadog usando Fleet Automation | 7.47+<br>7.66+ recomendado |
| **[Agent upgrades][10]** | Actualice sus Agents de forma remota | Linux: 7.69.0+<br>Windows: 7.71.1+ |
| **[Agent configuration][13]** | Configure sus Agents de forma remota | 7.73+ |

Datadog recomienda actualizar sus Agents regularmente para asegurarse de tener acceso a las funciones más recientes.

## Requisitos previos {#prerequisites}

- Verifique que cada Agent cumpla con los requisitos mínimos de versión y plataforma para la función que desea utilizar. Consulte [Upgrade Agents][10] y [Configure Agents][13].
- Asegúrese de que sus permisos de RBAC incluyan [`org_management`][1] para que pueda habilitar Remote Configuration para su organización.
- Asegúrese de que sus permisos de RBAC incluyan [`api_keys_write`][2] para que pueda crear una nueva clave de API con la capacidad de Remote Configuration o agregar esa capacidad a una clave de API existente. Comuníquese con el administrador de Datadog de su organización para actualizar sus permisos si no los tiene. Una clave con esta capacidad le permite autenticar y autorizar a su Agent para utilizar Remote Configuration.

## Habilite Remote Configuration {#enable-remote-configuration}

En la mayoría de los casos, Remote Configuration está habilitada de forma predeterminada para su organización. Puede verificar si Remote Configuration está habilitada en su organización desde la página de configuración de [Remote Configuration][3]. Si necesita habilitarla:
1. Asegúrese de que sus permisos de RBAC incluyan [`org_management`][1] para que pueda habilitar Remote Configuration para su organización.
1. Desde la página Organization Settings de su organización, habilite [Remote Configuration][3]. Esto permite que los componentes de Datadog en toda su organización reciban configuraciones de Datadog.

## Habilitar la gestión remota del Agent {#enable-remote-agent-management}

Para actualizar o configurar de forma remota los Agents en máquinas virtuales de Linux o Windows, habilite Remote Configuration y establezca `remote_updates` en `true` en cada Agent de destino. Remote Configuration permite que el Agent reciba configuración de Datadog. El ajuste `remote_updates` habilita las actualizaciones remotas y los cambios de configuración del Agent.

A partir de la versión 7.73.0 del Agent, `remote_updates` tiene como valor predeterminado `true`. En versiones anteriores compatibles, establézcalo explícitamente en `true`.

1. Habilite Remote Configuration para su organización y [en la clave de API del Agent](#enable-remote-configuration-on-the-api-key).
1. En el [archivo de configuración][16] del Agent, habilite los siguientes ajustes. `remote_updates` es un ajuste de nivel superior:

   ```yaml
   remote_configuration:
     enabled: true

   remote_updates: true
   ```

   Alternativamente, establezca `DD_REMOTE_CONFIGURATION_ENABLED=true` y `DD_REMOTE_UPDATES=true` en el entorno utilizado por el servicio del Agent.
1. [Reinicie el Agent][14] para aplicar los cambios.
1. En Fleet Automation, abra el panel lateral del Agent y verifique su estado de **Remote Agent Management**. Si la gestión remota sigue sin estar disponible, consulte [Solucionar problemas de gestión remota del Agent](#troubleshoot-remote-agent-management).

## Estado de Remote Configuration del Agent {#agent-remote-configuration-status}

Puede consultar el estado de Remote Configuration de su Agent a través de la [interfaz de usuario de Remote Configuration][3].

La siguiente tabla describe la conectividad de Remote Configuration. Fleet Automation también muestra un estado independiente de **Remote Agent Management**. Un Agent puede estar **CONNECTED** a Remote Configuration mientras la gestión remota está **NOT ENABLED**. Para habilitar actualizaciones y cambios de configuración en VMs, consulte [Habilitar la gestión remota del Agent](#enable-remote-agent-management).

  | Estado del Agent     | Descripción                                      |
  |------------------|--------------------------------------------------|
  | CONNECTED      | El Agent implementado en su entorno puede acceder, autenticarse y autorizarse correctamente en Datadog. Este es el estado óptimo en el que desea que estén sus Agents para Remote Configuration.                                               |
  | UNAUTHORIZED          | El Agent implementado en su entorno puede acceder a Datadog, pero no puede autenticarse ni autorizarse con Datadog para la operación de Remote Configuration. La causa más probable es que la clave de API utilizada por el Agent no tiene habilitada la función Remote Configuration. Para solucionar el problema, habilite la capacidad de Remote Configuration en la clave de API utilizada por el Agent.                                                 |
  | CONNECTION ERROR        |   El Agent implementado en su entorno tiene `remote_configuration.enabled` configurado como true en su archivo de configuración `datadog.yaml`; sin embargo, el Agent no se puede encontrar en el servicio Remote Configuration. La causa más probable es que el Agent no puede acceder a los [Puntos de conexión][4] de Remote Configuration. Para solucionar el problema, permita el acceso HTTPS saliente a los puntos de conexión de Remote Configuration desde su entorno. Este estado se muestra cuando la versión del Agent es `7.45.0` o superior.
  | DISABLED       |   El Agent implementado en su entorno tiene `remote_configuration.enabled` configurado como false en su archivo de configuración `datadog.yaml`. Configure `remote_configuration.enabled` como true si desea habilitar Remote Configuration en el Agent. Este estado se muestra cuando la versión del Agent es `7.45.0` o superior. |
  | NOT CONNECTED       | El Agent no se puede encontrar en el servicio Remote Configuration y podría tener `remote_configuration.enabled` configurado como true o false en su archivo de configuración `datadog.yaml`. Verifique la configuración de su Agent local o la configuración de su proxy. Este estado se muestra cuando la versión del Agent es superior a `7.41.1` pero inferior a `7.45.0`.            |
  | UNSUPPORTED AGENT   | El Agent tiene una versión que no es compatible con Remote Configuration. Para solucionar este problema, actualice el Agent a la última versión disponible. |

## Exclusión de Remote Configuration para Fleet Automation {#opting-out-of-remote-configuration-for-fleet-automation}

Puede deshabilitar las capacidades de Remote Configuration:
- a nivel de clave de API
- a nivel de Agent
- a nivel de organización (**no recomendado**)

### A nivel de clave de API {#at-the-api-key-level}

Deshabilite la clave de API de su elección en la página [API Keys][5]. Necesita el permiso [`api_keys_write`][2] para deshabilitar Remote Configuration en una clave de API.

### A nivel de Agent {#at-the-agent-level}

A partir de la versión 7.47.0 del Agent, `remote_configuration.enabled` se establece en `true` de forma predeterminada en el Agent. Esta configuración hace que el Agent solicite actualizaciones de configuración al sitio de Datadog.

Si no desea que su Agent envíe solicitudes de configuración a Datadog, puede establecer `remote_configuration.enabled` en `false` en el Agent.

{{< tabs >}}
{{% tab "Archivo YAML de configuración" %}}
Cambie `remote_configuration.enabled` de `true` a `false` en su [archivo YAML de configuración][101]:

```yaml
remote_configuration:
  enabled: false
```

[101]: /es/agent/configuration/agent-configuration-files/?tab=agentv6v7#main-configuration-file
{{% /tab %}}
{{% tab "Variable de entorno" %}}
Agregue lo siguiente a su manifiesto del Datadog Agent:

```yaml
DD_REMOTE_CONFIGURATION_ENABLED=false
```

{{% /tab %}}
{{% tab "Helm" %}}
Agregue lo siguiente a su gráfico de Helm:

```yaml
datadog:
  remoteConfiguration:
    enabled: false
```

{{% /tab %}}
{{< /tabs >}}

### A nivel de organización {#at-the-organization-level}

<div class="alert alert-warning"><strong>Datadog no recomienda deshabilitar Remote Configuration a nivel de organización. Deshabilitar Remote Configuration a nivel de organización impide que los componentes de Datadog en varios productos de su organización reciban configuraciones de Datadog.</strong></div>

Para deshabilitar Remote Configuration a nivel de organización:
1. Asegúrese de tener el permiso `org_management` requerido.
1. Vaya a la página de configuración de [Remote Configuration][3]. 
1. Haga clic en {{< ui >}}Disable{{< /ui >}}. 
1. Cuando aparezca el mensaje de advertencia, haga clic en {{< ui >}}Disable{{< /ui >}} nuevamente.

## Solución de problemas {#troubleshooting}

Si experimenta problemas al usar Remote Configuration con sus Agents, utilice las siguientes pautas de solución de problemas. Si necesita más asistencia, comuníquese con [soporte de Datadog][6].

### Solucionar problemas de gestión remota del Agent {#troubleshoot-remote-agent-management}

Si el panel lateral del Agent muestra **Remote Agent Management: NOT ENABLED**, verifique que la configuración efectiva tenga `remote_updates` habilitado.

Si la gestión remota sigue sin estar disponible, verifique:

- Los requisitos de versión y plataforma para [Agent upgrades][10] o [Agent configuration][13].
- La [conectividad de Remote Configuration](#agent-remote-configuration-status) del Agent.
- Si el Datadog Installer se está ejecutando.

### Reinicie el Agent {#restart-the-agent}

Después de actualizar la configuración del Agent en el archivo [`datadog.yaml`][16], reinicie el Agent para que el cambio surta efecto.

### Asegúrese de que los puntos de conexión de Datadog Remote Configuration sean accesibles desde su entorno {#ensure-datadog-remote-configuration-endpoints-are-reachable-from-your-environment}

Para usar Remote Configuration, el Agent implementado en su entorno necesita acceso a los [puntos de conexión][4] de Datadog Remote Configuration. Para una conexión de red privada entre su entorno y Datadog, también puede conectarse a los [puntos de conexión][7] de Virtual Private Cloud de Remote Configuration. Asegúrese de que el HTTPS saliente tenga acceso a los puntos de conexión de Remote Configuration desde su entorno. Si también tiene un proxy entre Datadog y su entorno, actualice su [configuración de proxy][8] para incorporar los puntos de conexión de Remote Configuration.

### Habilite Remote Configuration en la clave de API {#enable-remote-configuration-on-the-api-key}

Para autenticar y autorizar al Agent a recibir configuración, habilite Remote Configuration en la clave de API correspondiente. Solo los usuarios que tienen el permiso de RBAC [`api_keys_write`][2] pueden habilitar Remote Configuration en la clave de API.

**Nota:** Si tiene el permiso de RBAC [`api_keys_write`][2], pero le faltan los permisos de Remote Configuration a nivel de [Organization][3], no puede habilitar Remote Configuration en una clave de API nueva o existente. Solo tiene permiso para deshabilitar Remote Configuration en una clave de API existente.

[1]: /es/account_management/rbac/permissions#access-management
[2]: /es/account_management/rbac/permissions#api-and-application-keys
[3]: https://app.datadoghq.com/organization-settings/remote-config
[4]: /es/agent/configuration/network
[5]: https://app.datadoghq.com/organization-settings/api-keys
[6]: /es/help/
[7]: /es/agent/guide#cloud-infrastructure-guides
[8]: /es/agent/configuration/proxy/
[9]: /es/agent/troubleshooting/send_a_flare/#send-a-flare-from-the-datadog-site
[10]: /es/agent/fleet_automation/upgrade_agents/
[11]: /es/agent/fleet_automation/
[13]: /es/agent/fleet_automation/configure_agents/
[14]: /es/agent/configuration/agent-commands/#start-stop-and-restart-the-agent
[16]: /es/agent/configuration/agent-configuration-files/#main-configuration-file

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}