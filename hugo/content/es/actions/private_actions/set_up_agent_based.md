---
aliases:
- /es/service_management/workflows/private_actions/use_private_actions
- /es/service_management/app_builder/private_actions/use_private_actions
- /es/actions/private_actions/use_private_actions/
- /es/actions/private_actions/update_private_action_runner/
description: Instale, registre, administre y actualice un ejecutor de acciones privado
  que se ejecuta dentro del Datadog Agent.
disable_toc: false
further_reading:
- link: actions/private_actions/
  tag: Documentación
  text: Private Actions
- link: actions/private_actions/enroll_runner
  tag: Documentación
  text: Inscripción y propiedad
- link: actions/private_actions/execution_policies
  tag: Documentación
  text: Políticas de ejecución
- link: actions/private_actions/set_up_standalone
  tag: Documentación
  text: Configure un ejecutor de acciones privado independiente
title: Configure un ejecutor de acciones privado en el Datadog Agent
---
## Descripción general {#overview}

Ejecutar el ejecutor de acciones privado en el Datadog Agent es la ruta recomendada para nuevas implementaciones. Si ya ejecuta el Datadog Agent, habilite el ejecutor con una sola bandera de configuración y adminístrelo a través del ciclo de vida del Agent.

La configuración del ejecutor requiere tres pasos:

1. [**Instale**](#install-the-runner) el ejecutor, utilizando la opción de implementación que se ajuste a su entorno.
1. [**Inscriba**](#enroll-the-runner) el ejecutor, lo cual establece su propiedad y el modelo de autorización que utiliza.
1. [**Actualice**](#update-the-runner) el ejecutor como parte de las actualizaciones de su Agent.

Para implementar el ejecutor como un binario independiente, consulte [Set up a standalone private action runner][1].

## Requisitos previos {#prerequisites}

- Un servidor Linux o Windows con **Datadog Agent 7.81.0 o posterior**, o un clúster de Kubernetes con **Datadog Operator v1.28.0 o posterior** o el **Datadog Helm chart 3.231.6 o posterior**.
- [Remote Configuration][2] habilitada para su organización.
- Acceso de red a Datadog en `https://{{< region-param key=dd_site >}}`.

## Instale el ejecutor {#install-the-runner}

El ejecutor en el Datadog Agent tiene tres opciones de implementación, según dónde necesite actuar el ejecutor:

| Opción de implementación | Cómo se ejecuta | Implementar con | Ideal para |
|---|---|---|---|
| **Servidor** | Un proceso independiente junto al Datadog Agent en un servidor Linux o Windows. | Instalación en servidor | Acciones dirigidas a un servidor específico. |
| **Un contenedor en el Agent de nodo, que utiliza el mismo binario de ejecución que el proceso del servidor.** |  | Helm, Operator | Acciones locales al nodo en un clúster de Kubernetes. |
| **Kubernetes Cluster Agent** | En proceso dentro del Cluster Agent, sin un binario independiente. Un ejecutor sirve a todo el clúster. | Helm, Operator | Acciones de Kubernetes en todo el clúster. |

Tiene la opción de instalar con **Fleet Automation**, un flujo basado en la interfaz de usuario que inscribe al ejecutor como propiedad, o **Instalación manual**, donde usted elige el tipo de inscripción.

### Uso de Fleet Automation (recomendado) {#using-fleet-automation-recommended}

El flujo de instalación de Fleet Automation es el mismo en todas las plataformas.

1. Vaya a la [página de instalación de Fleet Automation][3] y seleccione su plataforma. Para Kubernetes, seleccione también **Helm Chart** o **Datadog Operator** como método de instalación, para que coincida con la pestaña de [Instalación manual](#manual-installation) que planea seguir.
1. En **Personalice la cobertura de su Agent**, vaya a la sección **Optimización y corrección** y active **Habilitar al Agent para realizar acciones**. Esto crea una clave de aplicación con el contexto `on_prem_runner_write` e inscribe al ejecutor como **propiedad**, autorizado con [Conexiones][4]. Para inscribir un ejecutor sin propietario, autorizado con [Políticas de ejecución][5], utilice la [Instalación manual](#manual-installation).
1. Siga las instrucciones restantes en el panel de instalación para agregar una clave de API y completar la instalación.
1. Después de la instalación, vaya a [Private Action Runners][6] para verificar que su ejecutor aparezca en la lista.

### Instalación manual {#manual-installation}

{{< tabs >}}
{{% tab "Linux" %}}
Establezca las siguientes variables de entorno cuando instale o ejecute el Agent. En el servidor, la configuración del ejecutor de acciones privadas utiliza el prefijo `DD_PRIVATE_ACTION_RUNNER_*`:

```bash
DD_API_KEY=<API_KEY> \
DD_APP_KEY=<APP_KEY> \
DD_SITE="{{< region-param key=dd_site >}}" \
DD_PRIVATE_ACTION_RUNNER_ENABLED=true \
DD_PRIVATE_ACTION_RUNNER_ACTIONS_ALLOWLIST=com.datadoghq.kubernetes.*,com.datadoghq.remoteaction.* \
bash -c "$(curl -L https://install.datadoghq.com/scripts/install_script_agent7.sh)"
```

`DD_APP_KEY` inscribe al ejecutor como propiedad, igual que Fleet Automation. La clave de aplicación necesita el contexto `on_prem_runner_write`. `DD_PRIVATE_ACTION_RUNNER_ACTIONS_ALLOWLIST` acepta una lista separada por comas. Utilice comodines de bundle para permitir las acciones que puede ejecutar un ejecutor en el Datadog Agent: `com.datadoghq.kubernetes.*` y `com.datadoghq.remoteaction.*`. Para depender de las acciones predeterminadas integradas del ejecutor (acciones de Remote Action de solo lectura, además de un conjunto de acciones de Kubernetes de solo lectura en el Cluster Agent), deje la lista de permitidos sin configurar.

Después de la instalación, vaya a [Private Action Runners][1] para verificar que su ejecutor aparezca en la lista.

[1]: https://app.datadoghq.com/actions/action-catalog

{{% /tab %}}
{{% tab "Windows" %}}

Instale o actualice a Datadog Agent 7.81.0 o posterior, luego edite `C:\ProgramData\Datadog\datadog.yaml`:

```yaml
app_key: <YOUR_APP_KEY>

private_action_runner:
  enabled: true
  self_enroll: true
  actions_allowlist:
    - "com.datadoghq.kubernetes.*"
    - "com.datadoghq.remoteaction.*"
```

`app_key` inscribe al ejecutor como propiedad, igual que Fleet Automation anteriormente; la clave de aplicación necesita el contexto `on_prem_runner_write`.

Reinicie el Agente para aplicar la configuración:

```powershell
Restart-Service -Force datadogagent
```

Después de reiniciar el Agente, vaya a [Private Action Runners][1] para verificar que su ejecutor aparezca en la lista.

El proceso del servidor ejecuta el ejecutor de **Agente de nodo**. Para ejecutar un ejecutor en el Agente de clúster, utilice la pestaña de Kubernetes (Helm) o Kubernetes (Operator).

[1]: https://app.datadoghq.com/actions/action-catalog

{{% /tab %}}
{{% tab "Kubernetes (Helm)" %}}

El chart de Helm de Datadog puede habilitar el ejecutor en dos lugares:

- El ejecutor de **Agente de nodo**, como contenedor sidecar. El ejecutor del Agente de nodo es **solo para Linux**.
- El ejecutor de **Agente de clúster**, en proceso. El ejecutor del Agente de clúster solo está disponible a través de Helm o del Operator (no existe un binario independiente) y requiere una elección de líder para que la identidad se coordine entre las réplicas del Agente de clúster.

Cree una clave de API con la capacidad de Private Action Runner en [Organization Settings][1], luego guárdela en un secreto de Kubernetes que el chart lea a través de `apiKeyExistingSecret`:

```bash
kubectl create secret generic datadog-secret \
  --from-literal api-key=<DD_API_KEY>
```

Este ejemplo inscribe al ejecutor como **sin propietario** (`apiKeyOnlyEnrollment: true`, usando solo la clave de API), lo cual lo autoriza con Execution Policies. Para otras opciones de inscripción y cómo funciona la propiedad, consulte [Enrollment and ownership][2].

La configuración de Helm utiliza la clave `privateActionRunner.*` en camelCase. Cree un `values.yaml`:

```yaml
datadog:
  apiKeyExistingSecret: datadog-secret
  site: {{< region-param key=dd_site >}}
  clusterName: <YOUR_CLUSTER_NAME>
  remoteConfiguration:
    enabled: true
  privateActionRunner:
    enabled: true
    apiKeyOnlyEnrollment: true
    actionsAllowlist:
      - "com.datadoghq.remoteaction.*"
      - "com.datadoghq.script.*"
clusterAgent:
  enabled: true
  privateActionRunner:
    enabled: true
    apiKeyOnlyEnrollment: true
    actionsAllowlist:
      - "com.datadoghq.kubernetes.*"
      - "com.datadoghq.script.*"
```

Para conocer todas las opciones de configuración del ejecutor disponibles, consulte [`datadog.privateActionRunner`][3] y [`clusterAgent.privateActionRunner`][4] en el chart de Helm. Instale el chart:

```bash
helm repo add datadog https://helm.datadoghq.com
helm repo update
helm install datadog-agent datadog/datadog -f values.yaml
```

Después de la instalación, vaya a [Private Action Runners][5] para verificar que su ejecutor aparezca en la lista.

[1]: https://app.datadoghq.com/organization-settings/api-keys
[2]: /es/actions/private_actions/enroll_runner/
[3]: https://github.com/DataDog/helm-charts/blob/main/charts/datadog/values.yaml#L523
[4]: https://github.com/DataDog/helm-charts/blob/main/charts/datadog/values.yaml#L1842
[5]: https://app.datadoghq.com/actions/action-catalog

{{% /tab %}}
{{% tab "Kubernetes (Operator)" %}}

El Datadog Operator habilita el ejecutor a través de anotaciones en el recurso `DatadogAgent`. La configuración del ejecutor en la anotación `-configdata` utiliza la clave `private_action_runner.*` en snake_case. El Operator puede habilitar tanto el ejecutor del Agente de nodo como el ejecutor del Agente de clúster en proceso.

Cree una clave de API con la capacidad de Private Action Runner en [Organization Settings][1], luego guárdela en un secreto de Kubernetes que el recurso `DatadogAgent` lea a través de su `credentials`:

```bash
kubectl create secret generic datadog-secret \
  --from-literal api-key=<DD_API_KEY>
```

Este ejemplo inscribe al ejecutor como **sin propietario** (`api_key_only_enrollment: true`, usando solo la clave de API), lo cual lo autoriza con Execution Policies. Para otras opciones de inscripción y cómo funciona la propiedad, consulte [Enrollment and ownership][2].

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
          - "com.datadoghq.remoteaction.*"
          - "com.datadoghq.script.*"
    cluster-agent.datadoghq.com/private-action-runner-enabled: "true"
    cluster-agent.datadoghq.com/private-action-runner-configdata: |
      private_action_runner:
        enabled: true
        api_key_only_enrollment: true
        actions_allowlist:
          - "com.datadoghq.kubernetes.*"
          - "com.datadoghq.script.*"
spec:
  global:
    clusterName: <YOUR_CLUSTER_NAME>
    site: {{< region-param key=dd_site >}}
    credentials:
      apiSecret:
        secretName: datadog-secret
        keyName: api-key
```

Aplique el manifiesto:

```bash
kubectl apply -f datadog-agent.yaml
```

Al igual que con Helm, el ejecutor del Cluster Agent requiere una elección de líder, y el ejecutor del Agente de nodo solo está disponible para Linux. Después de aplicar el manifiesto, vaya a [Private Action Runners][3] para verificar que su ejecutor aparezca en la lista.

[1]: https://app.datadoghq.com/organization-settings/api-keys
[2]: /es/actions/private_actions/enroll_runner/
[3]: https://app.datadoghq.com/actions/action-catalog

{{% /tab %}}
{{< /tabs >}}

### Nombres de los campos de configuración {#configuration-field-names}

La configuración del ejecutor sigue las convenciones estándar de configuración del Datadog Agent para cada método de instalación:
- Variables de entorno en un servidor.
- Claves en CamelCase bajo `privateActionRunner` en Helm.
- Claves en snake_case bajo `private_action_runner` en el Operator.

Para ver la tabla de equivalencias de nombres de campos en los tres métodos de instalación y la lista completa de claves de configuración y valores predeterminados, consulte la [referencia de private action runner][7].

## Inscribir al runner {#enroll-the-runner}

La inscripción registra el runner en su organización de Datadog y establece su **propiedad**, lo que determina el modelo de autorización. Un runner sin propietario, inscrito con una clave de API que tiene la capacidad de Private Action Runner, utiliza [Execution Policies][5]. Un runner con propietario, inscrito con una clave de aplicación, utiliza [Connections][4]. Debido a que el modelo se fija al momento de la inscripción, decida cuál desea antes de implementar.

Para obtener más información sobre el proceso, consulte [Enrollment and ownership][8].

## Administrar el runner {#manage-the-runner}

### Cambiar la lista de permitidos {#change-the-allowlist}

Para editar la lista de permitidos de un runner en el Datadog Agent:

{{< tabs >}}
{{% tab "Linux" %}}
1. Edite la sección `private_action_runner.actions_allowlist` en `/etc/datadog-agent/datadog.yaml`.
1. Reinicie el Agent: `sudo systemctl restart datadog-agent`.
{{% /tab %}}
{{% tab "Windows" %}}
1. Edite la sección `private_action_runner.actions_allowlist` en `C:\ProgramData\Datadog\datadog.yaml`.
1. Reinicie el Agent: `Restart-Service -Force datadogagent`.
{{% /tab %}}
{{% tab "Kubernetes (Operator)" %}}
1. Actualice `actions_allowlist` en ambas anotaciones del manifiesto `DatadogAgent`: `agent.datadoghq.com/private-action-runner-configdata` y `cluster-agent.datadoghq.com/private-action-runner-configdata`.
1. Aplique el manifiesto actualizado: `kubectl apply -f datadog-agent.yaml`.
{{% /tab %}}
{{% tab "Kubernetes (Helm)" %}}
1. Actualice `privateActionRunner.actionsAllowlist` (node Agent) o `clusterAgent.privateActionRunner.actionsAllowlist` (Cluster Agent) en `values.yaml`.
1. Aplique el chart actualizado: `helm upgrade datadog-agent datadog/datadog -f values.yaml`.
{{% /tab %}}
{{< /tabs >}}

### Eliminación automática de runners inactivos {#automatic-deletion-of-inactive-runners}

Para liberar recursos no utilizados, Datadog elimina automáticamente los private action runners basados en node Agent que utilizan una configuración solo con clave de API (sin propietario) después de 35 días de inactividad. Esta limpieza automática no se aplica a los runners con propietario ni al runner del Cluster Agent.

Si su runner se elimina debido a la inactividad, reiniciarlo resultará en un error. Debe volver a inscribir el runner repitiendo los pasos de instalación.

## Depuración con logs {#debugging-with-logs}

{{< tabs >}}
{{% tab "Linux" %}}

```bash
cat /var/log/datadog/private-action-runner.log
```

{{% /tab %}}
{{% tab "Windows" %}}

```powershell
Get-Content C:\ProgramData\Datadog\logs\private-action-runner.log
```

{{% /tab %}}
{{% tab "Kubernetes" %}}

```bash
kubectl logs -l app.kubernetes.io/component=cluster-agent --tail=1000 | grep private
```

{{% /tab %}}
{{< /tabs >}}

## Actualice el runner {#update-the-runner}

Actualice el runner en el Datadog Agent para mantenerse al día con cualquier actualización del Agent.

{{< tabs >}}
{{% tab "Linux" %}}

Actualice el Datadog Agent a la versión más reciente. El runner viene incluido con el Agent.

```bash
sudo apt-get update && sudo apt-get install datadog-agent
```

O para RHEL/CentOS:

```bash
sudo yum update datadog-agent
```

Reinicie el Agent después de la actualización:

```bash
sudo systemctl restart datadog-agent
```

Para obtener instrucciones detalladas de actualización, consulte [Upgrade to Agent v7][1].

[1]: /es/agent/versions/upgrade_to_agent_v7/

{{% /tab %}}
{{% tab "Windows" %}}

Descargue el instalador MSI del Agent más reciente desde la [página de descarga del Datadog Agent][1] y ejecute el instalador, o utilice PowerShell:

```powershell
# Download the latest installer
Invoke-WebRequest -Uri "https://s3.amazonaws.com/ddagent-windows-stable/ddagent-cli-latest.msi" -OutFile ddagent-cli-latest.msi

# Run the installer
Start-Process -Wait -PassThru msiexec -ArgumentList '/qn /i ddagent-cli-latest.msi'
```

Reinicie el Agent después de la actualización:

```powershell
Restart-Service -Force datadogagent
```

[1]: https://app.datadoghq.com/account/settings#agent/windows

{{% /tab %}}
{{% tab "Kubernetes (Operator)" %}}

Actualice las versiones de imagen del Datadog Operator y del Agent en su manifiesto `DatadogAgent`.

1. Actualice el Datadog Operator:

   ```bash
   helm repo update
   helm upgrade datadog-operator datadog/datadog-operator \
       --set image.repository=registry.datadoghq.com/operator \
       --set image.tag=latest
   ```

   Puede fijar una versión específica. Para explorar las etiquetas disponibles, utilice [Docker Hub][1].

1. Actualice las versiones de imagen del Agent en su manifiesto `datadog-agent.yaml`:

   ```yaml
   override:
     nodeAgent:
       image:
         name: registry.datadoghq.com/agent:<NEW_AGENT_VERSION>
     clusterAgent:
       image:
         name: registry.datadoghq.com/cluster-agent:<NEW_AGENT_VERSION>
   ```

1. Aplique el manifiesto actualizado: `kubectl apply -f datadog-agent.yaml`.
1. Verifique la actualización:

   ```bash
   kubectl get pods
   kubectl logs -l app.kubernetes.io/component=cluster-agent --tail=100 | grep private
   ```

El runner del Cluster Agent mantiene su identidad durante la actualización, ya que la almacena en un secreto de Kubernetes compartido. El runner del Agent de nodo almacena su identidad en un archivo: si esa ruta no está respaldada por un volumen persistente, una actualización puede borrar la identidad y obligar al runner a volver a inscribirse. Consulte [Identity storage on Kubernetes][2].

[1]: https://hub.docker.com/r/datadog/operator/tags
[2]: /es/actions/private_actions/enroll_runner/#identity-storage-on-kubernetes

{{% /tab %}}
{{% tab "Kubernetes (Helm)" %}}

La actualización del runner es parte del proceso estándar de actualización del chart de Helm del Datadog Agent.

```bash
helm repo update
helm upgrade datadog-agent datadog/datadog -f values.yaml
```

Para obtener instrucciones detalladas sobre la actualización, consulte [Upgrading Datadog Helm][1].

[1]: https://github.com/DataDog/helm-charts/blob/main/charts/datadog/README.md#upgrading

{{% /tab %}}
{{% tab "Terraform (Operator)" %}}

Actualice las variables de versión en su configuración de Terraform:

```hcl
locals {
  helm_operator_version = "<NEW_OPERATOR_VERSION>"
  agent_version         = "<NEW_AGENT_VERSION>"
  # ...
}
```

Aplique los cambios:

```bash
terraform plan
terraform apply -var="datadog_api_key=<YOUR_API_KEY>" -var="datadog_app_key=<YOUR_APP_KEY>"
```

{{% /tab %}}
{{< /tabs >}}

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/actions/private_actions/set_up_standalone/
[2]: /es/remote_configuration
[3]: https://app.datadoghq.com/fleet/install-agent/latest
[4]: /es/actions/connections/
[5]: /es/actions/private_actions/execution_policies/
[6]: https://app.datadoghq.com/actions/action-catalog
[7]: /es/actions/private_actions/reference/
[8]: /es/actions/private_actions/enroll_runner/