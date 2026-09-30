---
description: Solucione problemas de Workload Protection, incluyendo flares del Agente,
  autopruebas y compatibilidad de complementos de red.
title: Solución de problemas de Workload Protection
---
Si experimenta problemas con Workload Protection, utilice las siguientes pautas de solución de problemas. Si necesita más ayuda, comuníquese con el [soporte de Datadog][1].

## Security Agent flare {#security-agent-flare}

<div class="alert alert-warning">Desde Agent <code>7.77</code>, el <code>security-agent</code> componente de tiempo de ejecución para Workload Protection está obsoleto y ya no es necesario. El comando independiente <code>security-agent flare</code> el comando no funciona cuando el proceso del Security Agent no se está ejecutando. Utilice el core Agent <code>flare</code> en su lugar.</div>

De forma similar al [Agent flare][3], puede enviar la información de solución de problemas necesaria al equipo de soporte de Datadog con un comando flare.

El flare solicita confirmación antes de la carga, por lo que puede revisar el contenido antes de que el Security Agent lo envíe.

En los comandos a continuación, reemplace `<CASE_ID>` con su ID de incidencia de soporte de Datadog si tiene uno, luego ingrese la dirección de correo electrónico asociada con él.

Si no tiene un ID de incidencia, ingrese la dirección de correo electrónico que utiliza para iniciar sesión en Datadog para abrir una incidencia de soporte.

| Plataforma     | Comando                                                                             |
| --------     | -------                                                                             |
| Docker       | `docker exec -it datadog-agent security-agent flare <CASE_ID>`                      |
| Kubernetes   | `kubectl exec -it <POD_NAME> -c security-agent -- security-agent flare <CASE_ID>`   |
| Host         | `sudo /opt/datadog-agent/embedded/bin/security-agent flare <CASE_ID>`               |

## Agent self tests {#agent-self-tests}

Para confirmar que Workload Protection puede detectar eventos del sistema, active manualmente las pruebas ejecutando el siguiente comando:

| Plataforma     | Comando                                                                             |
| --------     | -------                                                                             |
| Docker       | `docker exec -it datadog-agent system-probe runtime self-test`                    |
| Kubernetes   | `kubectl exec -it <POD_NAME> -c system-probe -- system-probe runtime self-test` |
| Host         | `sudo /opt/datadog-agent/embedded/bin/system-probe runtime self-test`             |

El procedimiento de prueba crea algunos archivos temporales y reglas para su seguimiento, y luego activa esas reglas para confirmar que los eventos se propaguen correctamente.

La siguiente respuesta aparece cuando las reglas se propagan.

```
Runtime self test: OK
```

Los eventos aparecen en el {{< ui >}}Events Explorer{{< /ui >}}.

## Compatibilidad con complementos de red de Kubernetes personalizados {#compatibility-with-custom-kubernetes-network-plugins}

Las detecciones basadas en red de Workload Protection dependen del subsistema de control de tráfico del kernel de Linux. Se sabe que este subsistema introduce condiciones de carrera si varios proveedores intentan insertar, reemplazar o eliminar filtros en el qdisc de entrada "clsact". Utilice la siguiente lista de verificación para confirmar que Workload Protection esté configurado correctamente:

- Verifique si su proveedor utiliza clasificadores de control de tráfico eBPF. Si no es así, puede ignorar este párrafo.
- Verifique si su proveedor devuelve TC_ACT_OK o TC_ACT_UNSPEC después de otorgar acceso a un paquete de red. Si devuelven TC_ACT_UNSPEC, puede ignorar este párrafo.
- Verifique a qué prioridad asigna su proveedor sus clasificadores eBPF:
  - Si utilizan la prioridad 1, las detecciones de red de Workload Protection no funcionan dentro de sus contenedores.
  - Si utilizan una prioridad de 2 a 10, asegúrese de configurar `runtime_security_config.network.classifier_priority` con un número estrictamente inferior a la prioridad elegida por su proveedor.
  - Si utilizan una prioridad de 11 o superior, puede ignorar este párrafo.

Por ejemplo, existe una condición de carrera conocida con Cilium 1.9 y versiones anteriores con el Datadog Agent (versiones 7.36 a 7.39.1, excluyendo la 7.39.2) que puede ocurrir cuando se inicia un nuevo pod. La condición de carrera puede provocar la pérdida de conectividad dentro del pod, dependiendo de cómo esté configurado Cilium.

En última instancia, si el Datadog Agent o sus proveedores externos no pueden configurarse para evitar que ocurra el problema, debe deshabilitar las detecciones basadas en red de Workload Protection siguiendo los pasos a continuación:

- Agregue el siguiente parámetro a su archivo de configuración `system-probe.yaml` en instalaciones basadas en servidor:

```yaml
runtime_security_config:
  network:
    enabled: false
```
- Agregue los siguientes valores si está utilizando el public Helm Chart para implementar el Datadog Agent:

```yaml
datadog:
  securityAgent:
    runtime:
      network:
        enabled: false
```
- Agregue la siguiente variable de entorno si está implementando el contenedor del Datadog Agent manualmente:

```bash
DD_RUNTIME_SECURITY_CONFIG_NETWORK_ENABLED=false
```

## Solución de problemas de interrupciones en sesiones remotas o admisión de pods de Kubernetes {#troubleshooting-kubernetes-remote-session-or-pod-admission-disruptions}

Workload Protection recopila identidades de usuario de Kubernetes y enriquece sus eventos de Workload Protection con el contexto necesario para diferenciar los accesos remotos a su infraestructura de la actividad generada por sus cargas de trabajo. Esta integración depende de un [Kubernetes Mutating Webhook][2] para instrumentar sesiones de `kubectl exec`. Si esta instrumentación interrumpe la admisión de pods o la creación de sesiones de `kubectl exec`, siga los pasos a continuación para deshabilitar la función.

{{< tabs >}}

{{% tab "Datadog Operator" %}}

1. Agregue lo siguiente a la sección `spec` del archivo `datadog-agent.yaml`:

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

2. Aplique los cambios y reinicie el Agent.

{{% /tab %}}

{{% tab "Helm" %}}

1. Agregue lo siguiente a la sección `datadog` del archivo `datadog-values.yaml`:

    ```yaml
    # datadog-values.yaml file

    # Integrate with Kubernetes to enrich Workload Protection events with Kubernetes user identities
    clusterAgent:
      admissionController:
        cwsInstrumentation:
          enabled: false
    ```

2. Reinicie el Agent.

{{% /tab %}}

{{% tab "DaemonSet" %}}

1. (opcional) Agregue la siguiente configuración a la sección `env` de `cluster-agent` en el archivo `cluster-agent-deployment.yaml`:

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

## Deshabilitar Workload Protection {#disable-workload-protection}

Para deshabilitar Workload Protection, siga los pasos correspondientes a la plataforma de su Agent.

### Helm {#helm}

En el Helm `values.yaml`, configure `securityAgent.runtime` en `enabled: false` de la siguiente manera:

{{< code-block lang="yaml" filename="values.yaml" disable_copy="false" collapsible="true" >}}

# values.yaml file
datadog:

# Set to false to Disable CWS
securityAgent:
  runtime:
    enabled: false
{{< /code-block >}}

### Daemonset/Docker {#daemonsetdocker}

Aplique el siguiente cambio de variable de entorno tanto a la implementación del System Probe como a la del Security Agent para un Daemonset:

{{< code-block lang="json" filename="daemon.json" disable_copy="false" collapsible="true" >}}

DD_RUNTIME_SECURITY_CONFIG_ENABLED=false
{{< /code-block >}}

### Host {#host}

Modifique `system-probe.yaml` y `security-agent.yaml` para deshabilitar la configuración de tiempo de ejecución:

1. Deshabilite Workload Protection en `/etc/datadog-agent/system-probe.yaml`. Configure `runtime_security_config` en `enabled: false`:
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
2. Deshabilite Workload Protection en `/etc/datadog-agent/security-agent.yaml`. Configure `runtime_security_config` en `enabled: false`:
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
3. Reinicie sus Agents.

[1]: /es/help/
[2]: https://kubernetes.io/docs/reference/access-authn-authz/extensible-admission-controllers/
[3]: /es/agent/troubleshooting/send_a_flare/?tab=agent