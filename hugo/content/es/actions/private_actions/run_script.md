---
description: Utilice el runner de acciones privadas para ejecutar scripts predefinidos
  en su red privada, incluida la configuración necesaria para runners sin propietario
  autorizados por la Directiva de ejecución.
further_reading:
- link: actions/private_actions/set_up_agent_based
  tag: Documentación
  text: Configure un runner de acciones privadas en el Agente de Datadog
- link: actions/private_actions/execution_policies
  tag: Documentación
  text: Políticas de ejecución
- link: actions/private_actions/reference
  tag: Documentación
  text: Referencia
title: Ejecutar un script con el runner de acciones privadas
---
## Descripción general {#overview}

El runner de acciones privadas puede ejecutar **scripts predefinidos**, que son comandos de shell, herramientas de línea de comandos y scripts que usted declara con antelación en un archivo de configuración de scripts. Solo se puede ejecutar lo que usted predefine, por lo que el runner nunca ejecuta comandos en línea arbitrarios desde un flujo de trabajo o aplicación.

<div class="alert alert-warning">Usted decide qué comandos y binarios tiene permitido ejecutar el runner. Revise cada comando que agregue a la configuración del script, especialmente aquellos que aceptan parámetros, otorgue al runner solo los privilegios que necesita y revise cuidadosamente los permisos que comparte a través de las conexiones. Consulte <a href="/actions/connections/#connection-security-considerations">consideraciones de seguridad de la conexión</a>.</div>

## Casos de uso {#use-cases}

| Caso de uso | Basado en Agent | Independiente | Notas |
|---|:---:|:---:|---|
| Ejecución de binarios de Linux (`ls`, `rm`, `find`, `curl`) | {{< X >}} | {{< X >}} | Para runners independientes, los archivos relevantes deben ser accesibles para el contenedor. |
| Ejecución de CLI (`aws`, `terraform`, `kubectl`) | {{< X >}} | {{< X >}} | Para runners independientes, la CLI y las credenciales deben estar disponibles en la imagen. Para runners basados en Agent, las herramientas deben estar instaladas en el servidor. |
| Ejecución de scripts bash | {{< X >}} | {{< X >}} | Para runners independientes, los scripts pueden montarse dentro del contenedor. Utilice la [imagen grande](#large-image) para un intérprete de Python. |
| Ejecución de scripts de PowerShell | {{< X >}} | | Compatible solo con runners de Windows basados en el Agente. |
| Ejecución de comandos privilegiados (`systemctl restart`) | {{< X >}} | | Para runners basados en el Agente, otorgue permisos al usuario del runner. El sandboxing de contenedores evita que los runners independientes tengan acceso privilegiado al servidor. |

## Requisitos previos {#prerequisites}

**Para runners basados en el Agente:**
- Datadog Agent 7.81.0 o superior. Consulte [Configurar un runner de acciones privado en el Datadog Agent][1].
- Agregue `com.datadoghq.script.runPredefinedScript` (Linux) o `com.datadoghq.script.runPredefinedPowershellScript` (Windows) a la lista de permitidos de acciones del runner.

**Para runners independientes:**
- Un runner independiente. Consulte [Configurar un runner de acciones privado independiente][2].
- Para herramientas de CLI no incluidas en la imagen base o [imagen grande](#large-image), una imagen de Docker personalizada. Consulte [Imágenes personalizadas](#custom-images).

## Basado en Agent {#agent-based}

### Configurar scripts {#configure-scripts}

{{< tabs >}}
{{% tab "Linux" %}}

Edite el archivo `/etc/datadog-agent/private-action-runner/script-config.yaml`:

```yaml
schemaId: script-credentials-v1
runPredefinedScript:
  echo:
    command: ["echo", "Hello world!"]
  echo-parametrized:
    command: ["echo", "{{ parameters.echoValue }}"]
  restart-service:
    command: ["sudo", "systemctl", "restart", "{{ parameters.service }}"]
```

{{% /tab %}}
{{% tab "Windows" %}}

Edite el archivo `C:\ProgramData\Datadog\private-action-runner\powershell-script-config.yaml`:

```yaml
schemaId: script-credentials-v1
runPredefinedPowershellScript:
  helloWorld:
    script: |
      Write-Output "Hello world!"
  greet:
    script: |
      Write-Output "Run script from workflow called {{ parameters.name }} !"
    parameterSchema:
      properties:
        name:
          type: string
      required:
        - name
  restartService:
    script: |
      Restart-Service -Name {{ parameters.serviceName }} -Force
    parameterSchema:
      properties:
        serviceName:
          type: string
      required:
        - serviceName
```

{{% /tab %}}
{{< /tabs >}}

En un flujo de trabajo o aplicación, haga referencia a un script por el nombre que definió (por ejemplo, `echo`). Use `runPredefinedScript` en runners de Linux y `runPredefinedPowershellScript` en runners de Windows.

### Otorgar permisos {#grant-permissions}

{{< tabs >}}
{{% tab "Linux" %}}

El runner ejecuta scripts como el usuario `dd-agent`. Si sus scripts requieren permisos elevados, otórguelos al usuario `dd-agent`:

```bash
echo "dd-agent ALL=(ALL) NOPASSWD: /usr/bin/systemctl restart nginx" > /etc/sudoers.d/dd-agent
chmod 440 /etc/sudoers.d/dd-agent
```

{{% /tab %}}
{{% tab "Windows" %}}

El runner ejecuta scripts como `ddagentuser`. Si sus scripts requieren acceso a ciertos recursos, otorgue a `ddagentuser` permisos elevados para ellos:

```powershell
icacls "C:\<your-file-path>" /grant "ddagentuser:(OI)(CI)RX" /T

# Verify permissions
icacls "C:\<your-file-path>"
```

{{% /tab %}}
{{< /tabs >}}

### Runner sin propietario (Execution Policy-authorized) {#ownerless-runner-execution-policy-authorized}

Cuando un runner se registra como sin propietario y es autorizado por [Políticas de ejecución][3], se requieren dos cosas además de los pasos anteriores:

- La integración **Script** debe estar autorizada para el runner a través de una Política de ejecución, además de que la acción predefined-script esté en la lista de permitidos de acciones del runner.
- El runner lee sus scripts predefinidos desde una **ruta fija**, la misma ruta utilizada en [Configurar scripts](#configure-scripts) arriba:

{{< tabs >}}
{{% tab "Linux" %}}

`/etc/datadog-agent/private-action-runner/script-config.yaml`

{{% /tab %}}
{{% tab "Windows" %}}

`C:\ProgramData\Datadog\private-action-runner\powershell-script-config.yaml`

{{% /tab %}}
{{< /tabs >}}

#### Entrega de la configuración en Kubernetes {#delivering-the-config-on-kubernetes}

En Kubernetes, proporcione el archivo de configuración de scripts al runner en el Datadog Agent como un ConfigMap. Móntelo en el contenedor del runner en la ruta fija. El runner del Cluster Agent utiliza la ruta de Linux anterior.

Primero, cree un ConfigMap que contenga su configuración de scripts:

```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: par-script-config
  namespace: datadog
data:
  script-config.yaml: |
    schemaId: script-credentials-v1
    runPredefinedScript:
      echo:
        command: ["echo", "Hello world!"]
```

Luego, en el recurso `DatadogAgent`, permita la acción predefined-script y monte el ConfigMap en el contenedor del runner en la ruta fija:

```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
  annotations:
    agent.datadoghq.com/private-action-runner-enabled: "true"
    agent.datadoghq.com/private-action-runner-configdata: |
      private_action_runner:
        enabled: true
        api_key_only_enrollment: true
        actions_allowlist:
          - "com.datadoghq.script.runPredefinedScript"
          - "com.datadoghq.kubernetes.*"
          - "com.datadoghq.remoteaction.*"
spec:
  override:
    nodeAgent:
      volumes:
        - name: par-script-config
          configMap:
            name: par-script-config
      containers:
        private-action-runner:
          volumeMounts:
            - name: par-script-config
              mountPath: /etc/datadog-agent/private-action-runner/script-config.yaml
              subPath: script-config.yaml
              readOnly: true
```

Finalmente, aplique el manifiesto:

```bash
kubectl apply -f datadog-agent.yaml
```

### Runner con propietario (basado en conexión) {#owned-runner-connection-based}

{{< tabs >}}
{{% tab "Linux" %}}

#### Configurar la conexión {#configure-the-connection}

Si seleccionó `com.datadoghq.script.runPredefinedScript` en la lista de permitidos de acciones del runner, ya debería tener una conexión **Script** vinculada a su runner. De lo contrario, cree una conexión y especifique `/etc/datadog-agent/private-action-runner/script-config.yaml` como la **ruta al archivo**. Para obtener más información, consulte [Handling private action credentials][4].

{{% /tab %}}
{{% tab "Windows" %}}

#### Configurar la conexión {#configure-the-connection-1}

Si seleccionó `com.datadoghq.script.runPredefinedPowershellScript` en la lista de permitidos de acciones del runner, ya debería tener una conexión **Script** vinculada a su runner. De lo contrario, cree una conexión y especifique `C:\ProgramData\Datadog\private-action-runner\powershell-script-config.yaml` como la **ruta al archivo**. Para obtener más información, consulte [Handling private action credentials][4].

{{% /tab %}}
{{< /tabs >}}

## Independiente {#standalone}

Un runner independiente siempre es propiedad de y está autorizado con [Conexiones][5].

{{< tabs >}}
{{% tab "Docker" %}}

1. Después de [configurar un runner][2], navegue a **Conexiones**.
1. Haga clic en **Nueva conexión** y seleccione **Script**.
1. Ingrese un nombre de conexión y, en el menú desplegable **Runner de acción privada**, seleccione su runner.
1. Copie la plantilla del archivo de credenciales en el directorio de configuración de su runner con los comandos que desea ejecutar.
1. En **Ruta al archivo**, confirme que la ruta del archivo coincida con la ruta en el sistema de archivos de su runner (la predeterminada es suficiente en la mayoría de los casos).
1. Haga clic en **Siguiente, Confirmar acceso**, configure los permisos y luego haga clic en **Crear**.
1. Seleccione esta conexión al usar la acción de script en sus flujos de trabajo o aplicaciones.

Configure las acciones de script a través del archivo `config.yaml` de su runner y la conexión de script
(`credentials/script.yaml` de forma predeterminada):

```yaml
# Add the script action to the allowlist (config.yaml)
actionsAllowlist:
  - com.datadoghq.script.runPredefinedScript
```

```yaml
# Configure your script connection (credentials/script.yaml)
schemaId: script-credentials-v1
runPredefinedScript:
  echo:
    command: ["echo", "Hello world"]
  echo-parametrized:
    command: ["echo", "{{ parameters.echoValue }}"]
    parameterSchema:
      properties:
        echoValue:
          type: string
      required:
        - echoValue
```

{{% /tab %}}
{{% tab "Kubernetes (Helm)" %}}

Al implementar el runner con Helm, configure los scripts a través de su archivo `values.yaml`:

```yaml
common:
  actionsAllowlist:
    - com.datadoghq.script.runPredefinedScript

credentials:
  script:
    schemaId: script-credentials-v1
    runPredefinedScript:
      echo:
        command: ["echo", "Hello world"]
      echo-parametrized:
        command: ["echo", "{{ parameters.echoValue }}"]
        parameterSchema:
          properties:
            echoValue:
              type: string
          required:
            - echoValue
```

Implemente o actualice el runner:

```bash
helm upgrade --install <RELEASE_NAME> datadog/private-action-runner -f ./values.yaml
```

{{% /tab %}}
{{< /tabs >}}

### Opciones de imagen del runner {#runner-image-options}

Las siguientes opciones están disponibles solo para runners independientes.

#### Imagen grande {#large-image}

Si desea utilizar herramientas como Python, SSH, la CLI de AWS, Terraform o la CLI de gcloud, utilice la imagen `gcr.io/datadoghq/private-action-runner:v`,translation_2:{{< private-action-runner-version "private-action-runner" >}}-large` en lugar de la imagen predeterminada.

#### Imágenes personalizadas {#custom-images}

Para binarios que no están disponibles en las imágenes proporcionadas por Datadog, cree una imagen personalizada:

```dockerfile
FROM gcr.io/datadoghq/private-action-runner:v{{< private-action-runner-version "private-action-runner" >}}
USER root
# Change the line below to install the tool of your choice
RUN apt update && apt install -y python3
USER dog
```

Puede montar scripts complejos dentro del runner:

```yaml
# docker-compose example
services:
  runner:
    build: . # if you are using a local Dockerfile
    volumes:
      - "./config:/etc/dd-action-runner/config" # contains credentials for actions
      - "./scripts:/etc/dd-action-runner-script/scripts" # contains dependencies for script actions
```

```yaml
# credentials/script.yaml
schemaId: script-credentials-v1
runPredefinedScript:
  python:
    command: ["python3", "/etc/dd-action-runner-script/scripts/script.py"]
  shell:
    command: ["bash", "/etc/dd-action-runner-script/scripts/script.sh"]
```

## Uso de los scripts configurados {#using-the-configured-scripts}

En su flujo de trabajo o aplicación, configure la acción para usar el nombre de script que definió (por ejemplo, `echo` o `echo-parametrized`). Para runners de Linux, use `runPredefinedScript`. Para runners de Windows, use `runPredefinedPowershellScript`.

Existen dos niveles de resolución de variables: uno a nivel de flujo de trabajo y otro a nivel de acción
dentro del runner.

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/actions/private_actions/set_up_agent_based/
[2]: /es/actions/private_actions/set_up_standalone/
[3]: /es/actions/private_actions/execution_policies/
[4]: /es/actions/connections/private_action_credentials/
[5]: /es/actions/connections/