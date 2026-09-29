---
description: Aprenda a grabar sesiones de terminal, a crear shims para la grabación
  automática, y a configurar CoTerm para proteger contra comandos peligrosos.
further_reading:
- link: /coterm
  tag: documentación
  text: Datadog CoTerm
- link: /coterm/install
  tag: documentación
  text: Instalar Datadog CoTerm
- link: /coterm/rules
  tag: documentación
  text: Reglas de configuración de CoTerm
title: Uso de Datadog CoTerm
---
## Visualizar sesiones de terminal grabadas {#view-recorded-terminal-sessions}
Al principio y al final de cada sesión de terminal grabada, CoTerm muestra un enlace para visualizar la sesión en Datadog. Usted también puede [visualizar todas las sesiones de terminal grabadas][7].

## Estructura de comandos de la CLI de CoTerm {#coterm-cli-command-structure}

```shell
ddcoterm [OPTIONS] [-- <COMMAND>...] [COMMAND]
```

Ejecute `ddcoterm --help` para mostrar todas las opciones y comandos.

## Grabar una sesión de terminal {#record-a-terminal-session}

CoTerm graba sesiones de terminal que usted puede reproducir y revisar en Datadog. Para su seguridad, los datos confidenciales (como contraseñas y claves de API) se [redactan automáticamente][1]. Cualquier proceso iniciado en la sesión de terminal se registra como [eventos][2].

### Iniciar y grabar una sesión de terminal interactiva {#launch-and-record-an-interactive-terminal-session}
Para iniciar manualmente Datadog CoTerm y grabar la totalidad de su sesión de terminal:

```shell
ddcoterm
```

Cuando usted finaliza la sesión, CoTerm detiene la grabación y envía los datos de proceso capturados a Datadog.

### Grabar la salida de un comando {#record-the-output-of-a-command}
Para ejecutar un comando individual y grabar su salida:

```shell
ddcoterm -- datadog-agent status
```

Esto inicia CoTerm y ejecuta `datadog-agent status`. Cuando el proceso finaliza, CoTerm detiene la grabación y envía los datos del proceso capturados a Datadog.

## Grabar automáticamente un comando {#automatically-record-a-command}

Para configurar CoTerm para grabar automáticamente todas las invocaciones futuras de un comando en particular, cree un shim:

```shell
ddcoterm shim create datadog-agent
```

Después de crear un shim, reinicie su terminal o cargue su perfil. (Por ejemplo, ejecute `source ~/.bashrc`.) Si está utilizando un shell que no sea Bash o Zsh, agregue `path/to/.ddcoterm/overrides` a su PATH manualmente.

## Proteger contra comandos de terminal peligrosos {#protect-against-dangerous-terminal-commands}

Para evitar la ejecución accidental de comandos de terminal designados, puede configurar CoTerm para que actúe como un linter. Para obtener más control, puede usar CoTerm con [Datadog Work Management][3] para requerir aprobación para comandos designados.

### Analizar un comando {#lint-a-command}

Cuando intenta ejecutar un comando designado (por ejemplo, `kubectl scale`), CoTerm puede mostrar advertencias y solicitarle una confirmación.

1. Cree un shim para su comando: `ddcoterm shim create kubectl`

1. Configure una regla de linting en su archivo `.ddcoterm/config.yaml`. Para obtener detalles sobre cómo configurar el linting en CoTerm, consulte [CoTerm Configuration Rules][4].

   {{< code-block lang="yaml" filename=".ddcoterm/config.yaml" disable_copy="true" collapsible="true" >}}
process_config:
  commands:
    - command: "kubectl"
      lints:
        - |
          if has_arg("scale") and flags.context == nil then
            return string.format("No kubectl context specified (effective context: '%s'). It is recommended to always explicitly specify the context when running `kubectl scale`.", k8s_context)
          end
   {{< /code-block >}}

Con esta configuración, CoTerm intercepta cualquier comando `kubectl scale` sin una bandera `--context`.

{{< img src="coterm/linter-warning.png" alt="Interfaz de línea de comandos. El usuario ha ejecutado 'kubectl scale foo'. La salida dice 'Advertencia de CoTerm: No se especificó ningún contexto de kubectl (contexto efectivo: 'minikube').'  Se recomienda especificar siempre explícitamente el contexto al ejecutar kubectl scale. ¿Desea continuar? (s/n)'" style="width:70%;" >}}

### Requerir aprobación para comandos {#require-approval-for-commands}

Para comandos aún más peligrosos, CoTerm puede requerir la aprobación explícita de otro miembro del equipo (a través de Work Management) antes de ejecutar el comando.

1. Cree un shim para su comando: `ddcoterm shim create kubectl`

2. Configure el requisito de aprobación en su archivo `.ddcoterm/config.yaml`. Para obtener más detalles, consulte [CoTerm Configuration Rules][4].

   {{< code-block lang="yaml" filename=".ddcoterm/config.yaml" disable_copy="true" collapsible="true" >}}
process_config:
  commands:
    - command: "kubectl"
      rules:
        # Record and require approval for all executions of `kubectl scale` in a production context
        - rule: |
            local applicable = has_arg("scale") and k8s_context:match("prod")
            local user_message = "Proceed with caution. This command may disrupt your Kubernetes cluster setup."
            local approver_message = "Ensure that the user has documented a rollback plan before approving."
            return applicable, user_message, approver_message
          actions: ["record", "logs", "process_info", "approval"]
   {{< /code-block >}}

Con esta configuración, cuando ejecuta un comando `kubectl scale --context prod`, CoTerm crea una solicitud de aprobación en [Work Management][3]. Si decide asociar la solicitud de aprobación con un [incidente][5] activo, otros respondedores del incidente se agregan automáticamente como aprobadores. Una vez que se apruebe esta solicitud, se ejecutará su comando. También puede configurar [reglas de automatización de elementos de trabajo][8] para activar flujos de trabajo basados en solicitudes de aprobación.

#### Requerir aprobación manualmente {#manually-require-approval}

Para crear una solicitud de aprobación manualmente, ejecute:

```shell
ddcoterm approve
```

#### Omitir aprobación {#bypass-approval}

Para omitir la aprobación y ejecutar su comando, establezca la variable de entorno `COTERM_BREAK_GLASS`.

Por ejemplo:

```shell
COTERM_BREAK_GLASS=true kubectl delete foo
```

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/sensitive_data_scanner/
[2]: /es/events/
[3]: /es/incident_response/work_management/
[4]: /es/coterm/rules
[5]: /es/incident_response/incident_management/
[6]: /es/coterm/install
[7]: https://app.datadoghq.com/terminal-streams
[8]: /es/incident_response/work_management/automation_rules/