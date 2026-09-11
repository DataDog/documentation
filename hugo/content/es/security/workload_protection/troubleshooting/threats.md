---
title: Solucionar problemas de Workload Protection
---

Si experimentas inconvenientes con Workload Protection, utiliza las siguientes instrucciones para la resolución de problemas. Si necesitas más ayuda, ponte en contacto con el [servicio de asistencia de Datadog][1].

## Flare del Agent de seguridad

De forma similar al [flare del Agent][1], puedes enviar la información necesaria de solucionar problemas al equipo de soporte de Datadog con un comando flare.

El flare pide confirmación antes de la carga, por lo que puedes revisar el contenido antes de que el Agent de seguridad lo envíe.

En los siguientes comandos, reemplaza `<CASE_ID>` con el identificador de tu caso de soporte de Datadog, si lo tienes, e introduce la dirección de correo electrónico asociada a él.

Si no tienes el identificador, simplemente introduce la dirección de correo electrónico que utilizas para iniciar sesión en Datadog para crear uno nuevo.

| Plataforma     | Comando                                                                             |
| --------     | -------                                                                             |
| Docker       | `docker exec -it datadog-agent security-agent flare <CASE_ID>`                      |
| Kubernetes   | `kubectl exec -it <POD_NAME> -c security-agent -- security-agent flare <CASE_ID>`   |
| Host         | `sudo /opt/datadog-agent/embedded/bin/security-agent flare <CASE_ID>`               |

## Autotest del Agent

Para garantizar que la comunicación entre `security-agent` y `system-probe` funciona según lo esperado y que Workload Protection es capaz de detectar eventos de sistema, puedes activar manualmente tests automáticos ejecutando el siguiente comando:

| Plataforma     | Comando                                                                             |
| --------     | -------                                                                             |
| Docker       | `docker exec -it datadog-agent security-agent runtime self-test`                    |
| Kubernetes   | `kubectl exec -it <POD_NAME> -c security-agent -- security-agent runtime self-test` |
| Host         | `sudo /opt/datadog-agent/embedded/bin/security-agent runtime self-test`             |

El procedimiento de autotest crea algunos archivos temporales y reglas para monitorizarlos y, a continuación, activa dichas reglas para asegurar que los eventos se propaguen correctamente.

La siguiente respuesta aparece cuando se propagan las reglas.
```
Runtime self test: OK
```

Ahora puedes ver eventos procedente de `runtime-security-agent` en el Log Explorer.

{{< img src="security/cws/self_test_logs.png" alt="Eventos de autotest en el Log Explorer" style="width:90%;">}}

## Compatibilidad con complementos de red personalizados de Kubernetes

Las detecciones basadas en la red de Workload Protection dependen del subsistema de control de tráfico del kernel de Linux. Se sabe que este subsistema introduce condiciones de carrera si varios proveedores intentan insertar, sustituir o eliminar filtros en el qdisc de entrada "clsact". Sigue la siguiente lista de comprobación para asegurarte de que Workload Protection está configurado correctamente:

* Comprueba si tu proveedor utiliza clasificadores de control de tráfico eBPF. Si no lo hace, puedes ignorar este párrafo.
* Comprueba si tu proveedor devuelve TC_ACT_OK o TC_ACT_UNSPEC después de conceder acceso en un paquete de red. Si devuelve TC_ACT_UNSPEC, puedes ignorar este párrafo.
* Comprueba a qué prioridad asigna tu proveedor sus clasificadores eBPF:
  * Si utilizan la prioridad 1, las detecciones de red de Workload Protection no funcionan en tus contenedores.
  * Si utilizan la prioridad 2 a 10, asegúrate de configurar `runtime_security_config.network.classifier_priority` a un número estrictamente inferior a la prioridad elegida por tu proveedor.
  * Si utilizan prioridad 11 o superior, puedes ignorar este párrafo.

Por ejemplo, existe un problema conocido con Cilium 1.9 e inferiores con Datadog Agent (versiones 7.36 a 7.39.1, excluida 7.39.2) que puede producirse cuando se inicia un nuevo pod. La acción race puede llevar a la pérdida de conectividad dentro del pod, según cómo esté configurado Ciliumred.

En última instancia, si no se pueden configurar el Datadog Agent o tus proveedores externos para evitar que se produzca el problema, debes desactivar las detecciones basadas en la red de Workload Protection siguiendo los pasos que se indican a continuación:

* Añade el siguiente parámetro a tu archivo de configuración `system-probe.yaml` en instalaciones basadas en host:
```yaml
runtime_security_config:
  network:
    enabled: false
```
* Añade los siguientes valores si estás utilizando la Helm chart pública para desplegar el Datadog Agent:
```yaml
datadog:
  securityAgent:
    runtime:
      network:
        enabled: false
```
* Añade la siguiente variable de entorno si vas a desplegar manualmente el contenedor del Datadog Agent:
```bash
DD_RUNTIME_SECURITY_CONFIG_NETWORK_ENABLED=false
```

## Solucionar problemas de sesión remota de Kubernetes o interrupciones en la admisión de pods

Workload Protection recopila identidades de usuario de Kubernetes y enriquece tus eventos de Workload Protection con el contexto necesario para diferenciar los accesos remotos a tu infraestructura de la actividad generada por tus cargas de trabajo. Esta integración se basa en un [webhook mutante de Kubernetes](https://kubernetes.io/docs/reference/access-authn-authz/extensible-admission-controllers/) para instrumentar sesiones de `kubectl exec`. En caso de que esta instrumentación provoque interrupciones en la admisión de pods o en la creación de sesiones `kubectl exec`, sigue la siguiente guía para desactivar esta función.

{{< tabs >}}

{{% tab "Datadog Operador" %}}

1. Añade lo siguiente a la sección `spec` del archivo `datadog-agent.yaml`:

    ```yaml
    # datadog-agent.yaml file
    apiVersion: datadoghq.com/v2alpha1
    kind: DatadogAgent
    metadata:
      name: datadog
    spec:
      features:
        # Integrate with Kubernetes to enrich Workload Protection events with Kubernetes user identities
        admissionController:
          cwsInstrumentation:
            enabled: false
    ```

2. Aplica los cambios y reinicia el Agent.

{{% /tab %}}

{{% tab "Helm" %}}

1. Añade lo siguiente a la sección `datadog` del archivo `datadog-values.yaml`:

    ```yaml
    # datadog-values.yaml file

    # Integrate with Kubernetes to enrich Workload Protection events with Kubernetes user identities
    clusterAgent:
      admissionController:
        cwsInstrumentation:
          enabled: false
    ```

2. Reinicia el Agent.

{{% /tab %}}

{{% tab "DaemonSet" %}}

1. (Opcional) Añade el siguiente parámetro a la sección `env` de `cluster-agent` en el archivo `cluster-agent-deployment.yaml`:

    ```bash
      # Source: datadog/templates/cluster-agent-deployment.yaml
      apiVersion:app/1
      kind: Deployment
      [...]
      spec:
        [...]
        template:
          [...]
          spec:
            [...]
            containers:
            [...]
              - name: cluster-agent
                [...]
                env:
                  - name: DD_RUNTIME_ADMISSION_CONTROLLER_CWS_INSTRUMENTATION_ENABLED
                    value: "false"
    ```

{{% /tab %}}
{{< /tabs >}}

## Desactivar Workload Protection

Para desactivar Workload Protection, sigue los pasos correspondientes a la plataforma de tu Agent.

### Helm

En `values.yaml` del Helm, configura `securityAgent.runtime` como `enabled: false` de la siguiente manera:

{{< code-block lang="yaml" filename="values.yaml" disable_copy="false" collapsible="true" >}}

# values.yaml file
datadog:

# Set to false to Disable CWS
securityAgent:
  runtime:
    enabled: false
{{< /code-block >}}

### Daemonset/Docker

Aplica el siguiente cambio de variable de entorno al despliegue de la System Probe y del Security Agent para un Daemonset:

{{< code-block lang="json" filename="daemon.json" disable_copy="false" collapsible="true" >}}

DD_RUNTIME_SECURITY_CONFIG_ENABLED=false
{{< /code-block >}}

### host

Modifica `system-probe.yaml` y `security-agent.yaml` para desactivar la configuración en tiempo de ejecución:

1. Desactiva Workload Protection en `/etc/datadog-agent/system-probe.yaml`. Asegúrate de que `runtime_security_config` está configurado como `enabled: false`:
    {{< code-block lang="yaml" filename="system-probe.yaml" disable_copy="false" collapsible="true" >}}

    ##########################################
    ## Security Agent Runtime Configuration ##
    ##                                      ##
    ## Settings to send logs to Datadog are ##
    ## fetched from section `logs_config`   ##
    ## in datadog-agent.yaml                ##
    ##########################################

    runtime_security_config:
    ## @param enabled - boolean - optional - default: false
    ## Set to true to enable full Workload Protection.
    #
    enabled: false

    ## @param fim_enabled - boolean - optional - default: false
    ## Set to true to only enable the File Integrity Monitoring feature.
    # fim_enabled: false

    ## @param socket - string - optional - default: /opt/datadog-agent/run/runtime-security.sock
    ## The full path of the unix socket where the security runtime module is accessed.
    #
    # socket: /opt/datadog-agent/run/runtime-security.sock
    {{< /code-block >}}
2. Desactiva Workload Protection en `/etc/datadog-agent/security-agent.yaml`. Asegúrate de que `runtime_security_config` está configurado como `enabled: false`:
    {{< code-block lang="yaml" filename="security-agent.yaml" disable_copy="false" collapsible="true" >}}

    ##########################################
    ## Security Agent Runtime Configuration ##
    ##                                      ##
    ## Settings to send logs to Datadog are ##
    ## fetched from section `logs_config`   ##
    ## in datadog-agent.yaml                ##
    ##########################################

    runtime_security_config:
    ## @param enabled - boolean - optional - default: false
    ## Set to true to enable the Security Runtime Module.
    #
    enabled: false

    ## @param socket - string - optional - default: /opt/datadog-agent/run/runtime-security.sock
    ## The full path of the unix socket where the security runtime module is accessed.
    #
    # socket: /opt/datadog-agent/run/runtime-security.sock
    {{< /code-block >}}
3. Reinicia tus Agents.

[1]: /es/agent/troubleshooting/send_a_flare/?tab=agentv6v7