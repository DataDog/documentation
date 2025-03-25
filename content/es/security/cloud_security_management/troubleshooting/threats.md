---
aliases:
- /es/security_platform/cloud_workload_security/troubleshooting/
- /es/security_platform/cloud_security_management/troubleshooting/
further_reading:
- link: /security/cloud_security_management/troubleshooting/vulnerabilities
  tag: Documentación
  text: Solucionar problemas de  CSM Vulnerabilities
title: Solucionar problemas de Cloud Security Management Threats
---

## Información general

Si tienes problemas con Cloud Security Management (CSM) Threats, utiliza las siguientes directrices de solucionar problemas. Si necesitas más ayuda, ponte en contacto con [el equipo de soporte de Datadog][1].

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

Para asegurar que la comunicación entre `security-agent` y `system-probe` funciona como se espera y que Cloud Security Management Threats (CSM Threats) es capaz de detectar los eventos de sistema, puedes activar manualmente los autotest ejecutando el siguiente comando:

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

Las detecciones basadas en la red de CSM Threats utilizan el subsistema de control de tráfico del kernel de Linux. Se sabe que este subsistema introduce condiciones race si varios proveedores intentan insertar, sustituir o eliminar filtros en el qdisc ingress "clsact". Sigue la siguiente lista de comprobación para asegurarte de que CSM Threats está configurado correctamente:

* Comprueba si tu proveedor utiliza clasificadores de control de tráfico eBPF. Si no lo hace, puedes ignorar este párrafo.
* Comprueba si tu proveedor devuelve TC_ACT_OK o TC_ACT_UNSPEC después de conceder acceso en un paquete de red. Si devuelve TC_ACT_UNSPEC, puedes ignorar este párrafo.
* Comprueba a qué prioridad asigna tu proveedor sus clasificadores eBPF:
  * Si utilizan la prioridad 1, las detecciones de red de CSM Threats no funcionan dentro de tus contenedores.
  * Si utilizan la prioridad 2 a 10, asegúrate de configurar `runtime_security_config.network.classifier_priority` a un número estrictamente inferior a la prioridad elegida por tu proveedor.
  * Si utilizan prioridad 11 o superior, puedes ignorar este párrafo.

Por ejemplo, existe un problema conocido con Cilium 1.9 e inferiores con Datadog Agent (versiones 7.36 a 7.39.1, excluida 7.39.2) que puede producirse cuando se inicia un nuevo pod. La acción race puede llevar a la pérdida de conectividad dentro del pod, según cómo esté configurado Ciliumred.

En última instancia, si el Datadog Agent o tus proveedores externos no pueden configurarse para evitar que se produzca el problema, deberás desactivar las detecciones basadas en red de CSM Threats siguiendo los pasos que se indican a continuación:

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
## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/agent/troubleshooting/send_a_flare/?tab=agentv6v7