---
aliases:
- /es/security_platform/cloud_workload_security/troubleshooting/
- /es/security_platform/cloud_security_management/troubleshooting/
further_reading:
- link: /security/cloud_security_management/troubleshooting/vulnerabilities
  tag: Documentación
  text: Solucionar problemas de vulnerabilidades de Cloud Security
title: Solucionar problemas de Workload Protection
---

Si tienes problemas con Workload Protection, utiliza las siguientes directrices para solucionar problemas. Si necesitas más asistencia, ponte en contacto con [asistencia técnica de Datadog][1].

## Flare de Security Agent

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

Para garantizar que la comunicación entre `security-Agent` y `system-probe` funcione según lo esperado y que Workload Protection sea capaz de detectar eventos del sistema, puedes activar manualmente los autotests ejecutando el siguiente comando:

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

Las detecciones basadas en red de Workload Protection se basan en el subsistema de control de tráfico del kernel de Linux. Se sabe que este subsistema introduce condiciones de carrera si varios proveedores intentan insertar, sustituir o eliminar filtros en el qdisc de entrada "clsact". Sigue la siguiente lista de comprobación para asegurarte de que Workload Protection esté configurado correctamente:

* Comprueba si tu proveedor utiliza clasificadores de control de tráfico eBPF. Si no lo hace, puedes ignorar este párrafo.
* Comprueba si tu proveedor devuelve TC_ACT_OK o TC_ACT_UNSPEC después de conceder acceso en un paquete de red. Si devuelve TC_ACT_UNSPEC, puedes ignorar este párrafo.
* Comprueba a qué prioridad asigna tu proveedor sus clasificadores eBPF:
  * Si utilizan la prioridad 1, las detecciones de red de Workload Protection no funcionan en tus contenedores.
  * Si utilizan la prioridad 2 a 10, asegúrate de configurar `runtime_security_config.network.classifier_priority` a un número estrictamente inferior a la prioridad elegida por tu proveedor.
  * Si utilizan prioridad 11 o superior, puedes ignorar este párrafo.

Por ejemplo, existe un problema conocido con Cilium 1.9 e inferiores con Datadog Agent (versiones 7.36 a 7.39.1, excluida 7.39.2) que puede producirse cuando se inicia un nuevo pod. La acción race puede llevar a la pérdida de conectividad dentro del pod, según cómo esté configurado Ciliumred.

En última instancia, si no se puede configurar el Datadog Agent o tus proveedores externos para evitar que se produzca el problema, deberás desactivar las detecciones basadas en red de Workload Protection siguiendo los steps (UI) / pasos (generic) que se indican a continuación:

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
## Desactivar Workload Protection

Para desactivar Workload Protection, sigue los steps (UI) / pasos (generic) correspondientes a tu plataforma del Agent.

### Helm

En Helm `values.yaml`, configura `securityAgent.runtime` en `enabled: false` de la siguiente manera:

{{< code-block lang="yaml" filename="values.yaml" disable_copy="false" collapsible="true" >}}

# values.yaml file
datadog:

# Configurar en false para desactivar CWS
securityAgent:
  runtime:
    enabled: false
{{< /code-block >}}

### Daemonset/Docker

Aplica el siguiente cambio de variable de entorno al despliegue de System Probe y de Segurity Agent para un Daemonset:

{{< code-block lang="json" filename="daemon.json" disable_copy="false" collapsible="true" >}}

DD_RUNTIME_SECURITY_CONFIG_ENABLED=false
{{< /code-block >}}

### Host

Modifica `system-probe.yaml` y `security-agent.yaml` para desactivar la configuración del tiempo de ejecución:

1. Desactiva CSM en `/etc/datadog-agent/system-probe.yaml`. Asegúrate de que `runtime_security_config` esté configurado en `enabled: false`:
    {{< code-block lang="yaml" filename="system-probe.yaml" disable_copy="false" collapsible="true" >}}

    ##########################################
    ## Configuración del tiempo de ejecución de Security Agent ##
    ##                                      ##
    ## Los parámetros para enviar logs a Datadog son ##
    ## obtenido de la sección `logs_config` ##
    ## en datadog-agent.yaml                ##
    ##########################################

    runtime_security_config:
    ## @param enabled - boolean - optional - default: false
    ## Configura en true para activar CSM completo.
    #
    enabled: false

    ## @param fim_enabled - boolean - optional - default: false
    ## Configura en true para activar solo la función de monitorización de integridad de archivos.
    # fim_enabled: false

    ## @param socket - string - optional - default: /opt/datadog-agent/run/runtime-security.sock
    ## La ruta completa del socket unix donde se accede al módulo del tiempo de ejecución de seguridad.
    #
    # socket: /opt/datadog-agent/run/runtime-security.sock
    {{< /code-block >}}
2. Desactiva CSM en `/etc/datadog-agent/security-agent.yaml`. Asegúrate de que `runtime_security_config` esté configurado en `enabled: false`:
    {{< code-block lang="yaml" filename="security-agent.yaml" disable_copy="false" collapsible="true" >}}

    ##########################################
    ## Configuración del tiempo de ejecución de Security Agent ##
    ##                                      ##
    ## Los parámetros para enviar logs a Datadog son ##
    ## obtenido de la sección `logs_config` ##
    ## en datadog-agent.yaml                ##
    ##########################################

    runtime_security_config:
    ## @param enabled - boolean - optional - default: false
    ## Configura en true para activar el módulo del tiempo de ejecución de seguridad.
    #
    enabled: false

    ## @param socket - string - optional - default: /opt/datadog-agent/run/runtime-security.sock
    ## La ruta completa del socket unix donde se accede al módulo del tiempo de ejecución de seguridad.
    #
    # socket: /opt/datadog-agent/run/runtime-security.sock
    {{< /code-block >}}
3. Reinicia tus Agents.

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/agent/troubleshooting/send_a_flare/?tab=agentv6v7