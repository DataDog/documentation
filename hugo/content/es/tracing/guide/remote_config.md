---
description: Aprenda a configurar y utilizar Remote Configuration para gestionar dinámicamente
  los ajustes del SDK sin reiniciar las aplicaciones.
further_reading:
- link: remote_configuration
  tag: Documentación
  text: Remote Configuration
site_support_id: tracing_remote_configuration
title: Configuración de Remote Configuration para Tracing
---
Esta guía cubre la configuración y el uso de Remote Configuration con sus SDKs. Para obtener más información sobre cómo funciona Remote Configuration, consulte [Remote Configuration][1].

## Requisitos previos {#prerequisites}

- [Datadog Agent][2] 7.47.0 o superior instalado en sus hosts o contenedores.
- Actualice sus SDKs a una versión compatible con Remote Configuration. Para obtener más información, consulte la sección [Opciones de configuración admitidas][7].
- Asegúrese de que sus permisos de RBAC incluyan [`org_management`][3], para que pueda habilitar Remote Configuration para su organización.
- Asegúrese de que sus permisos de RBAC incluyan [`api_keys_write`][4], para que pueda crear una nueva clave de API con la capacidad de Remote Configuration, o agregar la capacidad a una clave de API existente. Comuníquese con el administrador de Datadog de su organización para actualizar sus permisos si no los tiene. Una clave con esta capacidad le permite autenticar y autorizar a su Agent para utilizar Remote Configuration.
- Asegúrese de tener los `APM Remote Configuration Read` y `APM Remote Configuration Write` [permisos][3].
  **Nota**: Si no tiene estos permisos, solicite a su Datadog Admin que actualice sus permisos desde la configuración de su organización.

## Configure Remote Configuration {#set-up-remote-configuration}

1. Asegúrese de que [Remote Configuration esté habilitado para su organización][5]. Esto permite que los componentes de Datadog en toda su organización reciban configuraciones de Datadog.
1. Seleccione una clave de API existente o cree una nueva clave de API, y habilite la capacidad de Remote Configuration en la clave si aún no está habilitada.

   {{<img src="agent/remote_config/RC_Key_updated.png" alt="Botón Habilitar propiedades de clave de API con capacidad de Remote Configuration." width="90%" style="center">}}
1. Reinicie su Agent.

## Revise el estado de Remote Configuration de los SDKs {#review-remote-configuration-status-of-sdks}

Puede obtener visibilidad del estado de Remote Configuration de sus SDKs a través de la [Remote Configuration UI][5].

La siguiente tabla describe el significado de cada estado del SDK:

  | Estado del SDK| Descripción                                      |
  |------------------|--------------------------------------------------|
  | CONECTADO      | El SDK está conectado correctamente al servicio de Remote Configuration a través del Agent asociado. Este es el estado óptimo en el que desea que esté su SDK para Remote Configuration.                                               |
  | NO AUTORIZADO          | El SDK está asociado con un Agent, que no tiene `APM Remote Configuration Read` permiso en su clave de API. Para solucionar el problema, debe habilitar la capacidad de Remote Configuration en la clave de API utilizada por el Agent asociado con el SDK.|
  | ERROR DE CONEXIÓN        |   El SDK implementado en su entorno está asociado con un Agent que tiene `remote_config.enabled` configurado como true en su archivo de configuración `datadog.yaml`; sin embargo, el Agent no se puede encontrar en el Remote Configuration service. La causa más probable de esto es que el Agent asociado no puede acceder a los [endpoints][6] de Remote Configuration. Para solucionar el problema, debe permitir el acceso HTTPS saliente a los puntos de conexión de Remote Configuration desde su entorno.
  | DESHABILITADO       |   El SDK implementado en su entorno está asociado con un Agent que tiene `remote_config.enabled` configurado como false en su archivo de configuración `datadog.yaml`. Esto podría haberse configurado de forma deliberada o por error. Para habilitar Remote Configuration en el Agent asociado, configure `remote_config.enabled` como true.  |
  | NO CONECTADO       | El SDK no se puede encontrar en el Remote Configuration service y está asociado con un Agent que podría tener `remote_config.enabled` configurado como true o false en su archivo de configuración `datadog.yaml`. Verifique la configuración de su Agent local o la configuración de su proxy.|
  | AGENT NO COMPATIBLE   | El SDK está asociado con un Agent que no es compatible con Remote Configuration. Para solucionar este problema, actualice el software del Agent asociado a la última versión disponible. |
  | NO DETECTADO   | El SDK no es compatible con Remote Configuration. Para solucionar este problema, actualice el software del SDK a la última versión disponible. |
  | DESCONOCIDO   | El estado del SDK es desconocido y no se puede determinar si hay un Agent asociado con el SDK. Por ejemplo, esto podría deberse a que el Agent está implementado en un servicio de contenedor sin servidor totalmente administrado como AWS Fargate. |

## Exclusión de Remote Configuration para Fleet Automation {#opting-out-of-remote-configuration-for-fleet-automation}

Puede deshabilitar las capacidades de Remote Configuration:
- a nivel de clave de API
- a nivel de Agent
- a nivel de organización (**no recomendado**)

### A nivel de clave de API {#at-the-api-key-level}

Deshabilite la clave de API de su elección en la página [Claves de API][8]. Necesita el permiso [`api_keys_write`][4] para deshabilitar Remote Configuration en una clave de API.

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

[101]: /es/agent/configuration/agent-configuration-files/?tab=agentv6v7#agent-main-configuration-file
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
1. Vaya a la página de [Remote Configuration][5].
1. Haga clic en {{< ui >}}Disable{{< /ui >}}.
1. Cuando aparezca el mensaje de advertencia, haga clic en {{< ui >}}Disable{{< /ui >}} nuevamente.

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/remote_configuration
[2]: /es/agent/
[3]: /es/account_management/rbac/permissions/
[4]: /es/account_management/rbac/permissions#api-and-application-keys
[5]: https://app.datadoghq.com/organization-settings/remote-config
[6]: /es/agent/configuration/network
[7]: /es/tracing/trace_collection/runtime_config/#supported-configuration-options
[8]: https://app.datadoghq.com/organization-settings/api-keys