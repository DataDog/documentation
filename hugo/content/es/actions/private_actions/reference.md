---
description: Tablas de referencia para los ajustes de configuración del ejecutor de
  Private Actions, las acciones e integraciones admitidas y los formatos de archivo
  de credenciales.
further_reading:
- link: actions/private_actions/
  tag: Documentación
  text: Descripción general de Private Actions
- link: actions/private_actions/set_up_agent_based/
  tag: Documentación
  text: Configurar un ejecutor de Private Actions
- link: actions/private_actions/execution_policies/
  tag: Documentación
  text: Políticas de ejecución
- link: actions/connections/private_action_credentials/
  tag: Documentación
  text: Manejo de credenciales de Private Actions
title: Referencia del ejecutor de Private Actions
---
## Descripción general {#overview}

Esta página es la referencia para los ejecutores de Private Actions y cubre los ajustes de configuración, las acciones e integraciones que admite cada ejecutor y los formatos de archivo de credenciales. Para obtener más información sobre los conceptos y la configuración de Private Actions, consulte [Descripción general de Private Actions][1].

## Configuración del ejecutor {#runner-configuration}

El ejecutor lee sus ajustes desde la sección `private_action_runner` de su [configuración][2].

Para saber cómo encajan los ajustes de inscripción (`self_enroll` y `api_key_only_enrollment`) en la inscripción del ejecutor, consulte [Inscripción y propiedad][3].

El mismo ajuste tiene nombres diferentes según cómo instale el ejecutor. Las instalaciones de Host usan variables de entorno, Helm usa claves en camelCase bajo `privateActionRunner`, y el Datadog Operator usa claves en snake_case bajo `private_action_runner`. Utilice esta tabla para traducir los ajustes comunes entre los métodos de instalación.

| Ajuste | Host (variable de entorno) | Helm (`privateActionRunner.*`) | Datadog Operator (`private_action_runner.*`) |
|---|---|---|---|
| Habilitar | `DD_PRIVATE_ACTION_RUNNER_ENABLED` | `enabled` | `enabled` |
| Auto-inscripción | `DD_PRIVATE_ACTION_RUNNER_SELF_ENROLL` | `selfEnroll` | `self_enroll` |
| Lista de permitidos de acciones | `DD_PRIVATE_ACTION_RUNNER_ACTIONS_ALLOWLIST` (separado por comas) | `actionsAllowlist` (lista) | `actions_allowlist` (lista) |

## Acciones e integraciones admitidas {#supported-actions-and-integrations}

Esta matriz muestra, para cada integración, su disponibilidad en cada tipo de ejecutor y si se puede autorizar a través de [Políticas de ejecución][4].

<div class="alert alert-info">La disponibilidad en el Agent y la autorización a través de Políticas de ejecución son independientes. Una integración puede ejecutarse en el Agent sin ser autorizable a través de una Política de ejecución.</div>

| Integración | Runner en el Agent | Autorizable a través de <br>Políticas de ejecución | Runner independiente |
|---|:---:|:---:|:---:|
| Kubernetes | {{< X >}} | {{< X >}} | {{< X >}} |
| Remote Action (por ejemplo, rshell) | {{< X >}} | {{< X >}} | {{< X >}} |
| Script | {{< X >}} | {{< X >}} | {{< X >}} |
| HTTP | {{< X >}} |  | {{< X >}} |
| GitLab | {{< X >}} |  | {{< X >}} |
| Jenkins | {{< X >}} |  | {{< X >}} |
| MongoDB | {{< X >}} |  | {{< X >}} |
| PostgreSQL |  |  | {{< X >}} |
| Temporal | {{< X >}} |  | {{< X >}} |

- **Remote Action** es la familia de integraciones bajo el prefijo `com.datadoghq.remoteaction`. Incluye el paquete rshell, cuya acción `runCommand` ejecuta comandos de shell a través de una shell restringida. Consulte [Agent Restricted Shell (rshell)][8]
Las acciones - **Script** están limitadas a scripts *predefinidos* declarados en el `script-config.yaml` del ejecutor. Para configurar acciones de script (`runPredefinedScript` para Linux o `runPredefinedPowershellScript` para Windows), consulte [Ejecutar un script con un ejecutor de Private Actions][5].

{{% collapse-content title="Acciones disponibles por tipo de runner" level="h3" %}}

{{< partial name="actions/private_actions_allowlist.html" >}}

{{% /collapse-content %}}

## Formatos de archivo de credenciales {#credential-file-formats}

Algunas integraciones, como HTTP, Jenkins, PostgreSQL, MongoDB y Temporal, requieren credenciales para ejecutarse. Las credenciales se proporcionan al ejecutor como archivos JSON a los que usted hace referencia desde una [conexión][6]. Cada integración tiene su propia estructura de archivo de credenciales y métodos de autenticación admitidos.

Para ver el conjunto completo de formatos de archivo de credenciales y ejemplos, consulte [Manejo de credenciales de Private Actions][7].

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/actions/private_actions/
[2]: https://github.com/DataDog/datadog-agent/blob/main/pkg/config/schema/yaml/private_action_runner.yaml
[3]: /es/actions/private_actions/enroll_runner/
[4]: /es/actions/private_actions/execution_policies/
[5]: /es/actions/private_actions/run_script/
[6]: /es/actions/connections/
[7]: /es/actions/connections/private_action_credentials/
[8]: /es/agent/guide/rshell/