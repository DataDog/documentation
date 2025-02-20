---
algolia:
  rank: 80
  tags:
  - fips
  - proxy de fips
  - conformidad
  - fedramp
  - govcloud
alias:
- /agent/guide/agent-fips-proxy
disable_toc: false
further_reading:
- link: agent/configuration/proxy
  tag: Documentación
  text: Configuración del proxy del Agent
- link: https://www.datadoghq.com/blog/datadog-fips-enabled-agent/
  tag: Blog
  text: Monitorizar cargas de trabajo altamente reguladas con el Agent de Datadog
    habilitado por FIPS
title: Conformidad de Datadog con los estándares FIPS
---

{{< site-region region="us,us3,us5,eu,ap1" >}}
<div class="alert alert-warning">El proxy FIPS del Datadog Agent sólo está disponible en la región US1-FED.</a></div>
{{< /site-region >}}

El proxy FIPS del Datadog Agent garantiza que la comunicación entre el Datadog Agent y Datadog utilice un cifrado conforme a FIPS.

El proxy FIPS del Datadog Agent es un componente distribuido por separado que se despliega en el mismo host que el Datadog Agent. El proxy actúa como intermediario entre la ingesta del Agent y Datadog. El Agent se comunica con el proxy FIPS del Datadog Agent, que cifra las cargas útiles utilizando una criptografía validada FIPS 140-2 y retransmite las cargas útiles a Datadog. El Datadog Agent y el proxy FIPS del Agent deben configurarse en tándem para comunicarse entre sí.

<div class="alert alert-warning">La conformidad con FIPS no se mantiene si el proxy FIPS del Datadog Agent y el Datadog Agent no están en el mismo host.
<br>Del mismo modo, la conformidad con FIPS no se mantiene si la opción <code>fips.enabled</code> no se define como <code>verdadero</code> en <code>datadog.yaml</code>.</div>

## Plataformas compatibles y limitaciones

La conformidad del proxy FIPS del Datadog Agent se basa en su uso del [Módulo criptográfico - Certificado #4282][1] validado por FIPS 140-2. Para obtener información sobre entornos de funcionamiento validados y restricciones, consulta la [política de seguridad][2] relacionada.

**Es responsabilidad del usuario garantizar que el entorno de funcionamiento cumple la política de seguridad y las directrices generales de FIPS.

Plataformas compatibles:

|||
| ---  | ----------- |
| Bare metal y máquinas virtuales (VM) | RHEL >= 7<br>Debian >= 8<br>Ubuntu >= 14.04<br>SUSE >= 12|
| Nube y contenedor| Amazon ECS<br>AWS EKS (Helm)|

Productos compatibles (Agent v7.45 o posterior):

- Métricas
- Logs
- Trazas de APM
- Perfiles APM
- Procesos
- Orchestrator Explorer
- Seguridad en tiempo de ejecución

El proxy FIPS del Datadog Agent **no** admite lo siguiente:

- Monitorización serverless
- Comunicación entre el Agent de clúster y los Agents de nodo
- Integraciones del Agent
- Comunicación saliente a un destino distinto de GovCloud

## Requisitos previos

- Rango de puertos TCP disponible: 9803 a 9818
- Datadog Agent >= v7.41

## Instalar el Agent con compatibilidad FIPS

{{< tabs >}}
{{% tab "Host o máquina virtual (VM)" %}}

### Instalar el Agent en un nuevo host

Para instalar el Datadog Agent con el proxy FIPS del Datadog Agent, añade `DD_FIPS_MODE=1` a las instrucciones de instalación en un solo paso de la página de la [integración Datadog Agent][1]. Por ejemplo:

```shell
DD_API_KEY=<DD_API_KEY> \
DD_SITE="ddog-gov.com" \
DD_FIPS_MODE=1 \
bash -c "$(curl -L \
   https://install.datadoghq.com/scripts/install_script_agent7.sh)"
```

Al definir la variable de entorno `DD_FIPS_MODE` se instala el paquete FIPS junto con el Agent y se configura el Agent para utilizar el proxy. Si utilizas este método, no hay pasos de configuración adicionales, pero deberías [verificar tu instalación](#verify-your-installation).

### Añadir el proxy FIPS del Datadog Agent a un Agent existente

Sigue los pasos que se indican a continuación para añadir el el proxy FIPS del Datadog Agent a una instalación existente del Agent.

#### Instalar el paquete del proxy FIPS del Datadog Agent

1. Ejecuta los siguientes comandos para instalar el proxy FIPS del Datadog Agent:

   Debian:
   ```shell
   apt-get update && apt-get install datadog-fips-proxy
   ```
   RHEL y Fedora:
   ```shell
   yum makecache && yum install datadog-fips-proxy
   ```
   SLES:
   ```shell
   zypper refresh datadog && zypper install datadog-fips-proxy
   ```

1. La primera vez que realices una actualización, copia el archivo de configuración de ejemplo en la localización correspondiente y reinicia el proxy. No es necesario copiar la configuración en actualizaciones posteriores, a menos que haya cambios significativos en la configuración ascendente del proxy:
   ```shell
   sudo cp /etc/datadog-fips-proxy/datadog-fips-proxy.cfg.example \
      /etc/datadog-fips-proxy/datadog-fips-proxy.cfg
   sudo chown dd-agent:dd-agent \
      /etc/datadog-fips-proxy/datadog-fips-proxy.cfg
   sudo chmod 640 /etc/datadog-fips-proxy/datadog-fips-proxy.cfg
   sudo systemctl restart datadog-fips-proxy
   ```

#### Configurar el Agent para utilizar el proxy FIPS del Datadog Agent

El paquete del proxy FIPS del Datadog Agent viene preconfigurado para su uso con el centro de datos US1-FED. Si estás actualizando un Datadog Agent existente, **debes** configurar el Agent para utilizar el proxy.

Para Configurar el Agent para utilizar el proxy, define `fips.enabled` como `true` y `fips.https` como `false` en el [archivo de configuración del Agent][2]:

```yaml
fips:
  enabled: true
  https: false
```

El parámetro `fips` está disponible en las versiones del Agent 7.41 o posteriores. Cuando el parámetro está activado, el Datadog Agent redirige todas sus comunicaciones al proxy FIPS del Datadog Agent para los productos compatibles. Este parámetro ignora las opciones de URL personalizadas, como `dd_url`.

La opción `https` se define como `false` porque el Agent utiliza HTTP para comunicarse con el proxy. El proxy FIPS del Datadog Agent se ejecuta en el mismo host que el Agent y confía en la seguridad del host para la protección de esa comunicación.

**Proteger y reforzar el host es tu responsabilidad.**

<div class="alert alert-warning">El parámetro <code>fips.enabled</code> está predeterminado como <code>false</code> en el Agent. Debe tener el valor <code>true</code> para garantizar que todas las comunicaciones se reenvían a través del proxy FIPS del Datadog Agent.<br><br><strong> Si <code>fips.enabled</code> no tiene el valor <code>true</code>, el Agent no es compatible con FIPS</strong>.</div>

### Verificación de tu instalación

Verifica qué métricas, trazas y logs están correctamente reportados en la aplicación.

Para las métricas, ejecuta el comando de diagnóstico de conectividad y asegúrate de que todos los checks se aprueben:

```shell
sudo -u dd-agent datadog-agent diagnose --include connectivity-datadog-core-endpoints
# Para el Agent v7.48 o posteriores, ejecuta el siguiente comando:
# sudo -u dd-agent datadog-agent diagnose datadog-connectivity
```

Si no ves métricas, trazas o logs reportados en la aplicación, consulta la sección [Solucionar problemas](#troubleshooting-a-bare-metal-or-vm-installation).

### Ver logs

```shell
sudo journalctl -u datadog-fips-proxy
```

#### Configuración de logs de journald

Si utilizas [Log Management][3] y quieres enviar los logs del proxy FIPS del Datadog Agent a Datadog, configura el Datadog Agent para leer logs de journald.

1. En el [archivo de configuración][2] del Agent, dale a `logs_enabled` el valor `true`, para activar Logs Agent. En el [directorio de configuración][4], crea un archivo en `fips_proxy.d/conf.yaml`, con el siguiente contenido:

   ```yaml
   logs:
     - type: journald
       source: datadog-fips-proxy
       include_units:
         - datadog-fips-proxy.service
   ```

1. Asegúrate de que el usuario `dd-agent` está en el grupo `systemd-journal`. Para más información, consulta la documentación sobre la [integración con journald][5].
1. [Reinicia el Agent][6].

[1]: https://app.datadoghq.com/account/settings/agent/latest
[2]: /es/agent/configuration/agent-configuration-files/#agent-main-configuration-file
[3]: /es/logs/
[4]: /es/agent/configuration/agent-configuration-files/#agent-configuration-directory
[5]: /es/integrations/journald/#configuration
[6]: /es/agent/configuration/agent-commands/#start-stop-and-restart-the-agent
{{% /tab %}}

{{% tab "Helm en Amazon EKS" %}}
Configura los siguientes valores en tu archivo `values.yaml`:

```yaml
fips:
  enabled: true
  use_https: false
```

El parámetro `fips` está disponible en las versiones del Agent 7.41 o posteriores. Cuando el parámetro está activado, el Datadog Agent redirige todas sus comunicaciones al proxy FIPS del Datadog Agent para los productos compatibles. Este parámetro ignora las opciones de URL personalizadas, como `dd_url`.

El parámetro `use_https` tiene el valor `false`, ya que el Agent utiliza HTTP para comunicarse con el proxy. El proxy FIPS del Datadog se ejecuta en el mismo host que el Datadog Agent y, para proteger la comunicación, se emplea el sistema de seguridad del host.

**Proteger y reforzar el host es tu responsabilidad.**

<div class="alert alert-warning">El parámetro <code>fips.enabled</code> está predeterminado como <code>false</code> en el Agent. Debe tener el valor <code>true</code> para garantizar que todas las comunicaciones se reenvían a través del proxy FIPS del Datadog Agent.<br><br><strong> Si <code>fips.enabled</code> no tiene el valor <code>true</code>, el Agent no es compatible con FIPS</strong>.</div>


{{% /tab %}}

{{% tab "Amazon ECS" %}}

Para obtener instrucciones sobre la instalación del proxy de FIPS en Amazon ECS, consulta la sección [Proxy de FIPS para entornos GOVCLOUD][1].

[1]: /es/containers/amazon_ecs/#fips-proxy-for-govcloud-environments
{{% /tab %}}

{{< /tabs >}}

## Seguridad y endurecimiento

Como cliente de Datadog, eres responsable de la seguridad y el endurecimiento del **host**.

Consideraciones de seguridad:
- Aunque las imágenes de Datadog que se proporcionan fueron creadas teniendo en cuenta la seguridad, no se han evaluado en función de las recomendaciones de referencia del CIS ni de las normas STIG de DISA.
- Si reconstruyes, reconfiguras o modificas el proxy FIPS del Datadog Agent para adaptarlo a tus necesidades de despliegue o test, es posible que obtengas una configuración que funcione técnicamente, pero Datadog no puede garantizar la conformidad con FIPS si el proxy FIPS del Datadog Agent no se utiliza exactamente como se explica en la documentación.
- Si no has seguido los pasos de instalación anteriores, exactamente de la forma que se indica, Datadog no puede garantizar la conformidad con FIPS. Una configuración correcta incluye tener tu Datadog Agent configurado para comunicarse con el proxy FIPS del Datadog Agent, definiendo la opción `fips.enabled`, y tener un proxy FIPS del Datadog Agent en ejecución.

### Comunicación entre el Agent y el proxy FIPS

El proxy FIPS del Datadog Agent sólo protege la comunicación que se origina en el Agent y se dirige a los endpoints de la API de admisión de Datadog. Esto significa que otras formas de comunicación que terminan en el Agent o se originan en el Agent no son conformes con FIPS si se utiliza esta solución.

### Comunicación entre el Agent de clúster y los Agents de nodo

El proxy FIPS del Datadog Agent sólo protege la comunicación que se origina en Cluster Agent y se dirige a los endpoints de la API de admisión de Datadog. Esto significa que otras formas de comunicación que terminan en Cluster Agent o se originan en Cluster Agent no son conformes con FIPS si se utiliza esta solución.

### Versiones de lanzamiento

Las versiones de proxies FIPS del Datadog Agent están desacopladas de las versiones del Datadog Agent. Utiliza las últimas versiones tanto del Datadog Agent como del proxy FIPS del Datadog Agent para garantizar que el Datadog Agent y el proxy FIPS son compatibles con todos los productos disponibles.

## Solucionar problemas de un host o de una instalación para máquinas virtuales

Para solucionar los problemas del proxy FIPS del Datadog Agent, verifica lo siguiente:
- El Datadog Agent y el proxy FIPS del Datadog Agent se están ejecutando.
- El Datadog Agent puede comunicarse con el proxy FIPS del Datadog Agent.
- El proxy FIPS del Datadog Agent puede comunicarse con los endpoints de admisión de Datadog.

### Comprobar el estado del proxy

Para obtener información sobre el estado del proxy FIPS del Datadog Agent, ejecuta el siguiente comando:

```shell
sudo systemctl status datadog-fips-proxy
```

Si el proxy se está ejecutando, la salida debería ser similar a la siguiente:
```text
- datadog-fips-proxy.service - Datadog FIPS Proxy
  Loaded: loaded
    (/lib/systemd/system/datadog-fips-proxy.service;
      enabled; vendor preset: enabled)
  Active: active (running) since Tue 2022-07-19 16:21:15 UTC; 1min 6s ago
```

Si el estado del proxy es `inactive (dead)`, inicia el proxy FIPS del Datadog Agent:

```shell
sudo systemctl start datadog-fips-proxy
```

Si el estado del proxy es `failed`, el proxy FIPS del Datadog Agent no se ha podido iniciar debido a un error. Ejecuta el siguiente comando y busca los errores en los logs del proxy:

```shell
sudo journalctl -u datadog-fips-proxy --no-pager
```

### El proxy no puede enlazar el socket

Si los logs del proxy muestran un error `bind socket`, el proxy está intentando utilizar un puerto que ya está en uso en el host. El proxy FIPS del Datadog Agent utiliza el rango de puertos TCP, desde el 9803 al 9818 inclusive. Los puertos de este rango deben estar disponibles en el host y no deben ser utilizados por otros servicios.

En el siguiente ejemplo, el proxy FIPS del Datadog Agent no puede enlazar un socket en el puerto `9804` porque el puerto ya está en uso:

```text
[ALERT] (4518) : Starting frontend metrics-forwarder: cannot bind socket (Address already in use) [0.0.0.0:9804]
[ALERT] (4518) : [/opt/datadog-fips-proxy/embedded/sbin/haproxy.main()] Some protocols failed to start their listeners! Exiting.
```

### El Agent no puede conectarse al proxy

Para saber si existen problemas de red, comprueba los logs en `/var/log/datadog/agent.log` o ejecuta:

```shell
datadog-agent diagnose --include connectivity-datadog-core-endpoints
# Para versiones del Agent 7.48 o anteriores, ejecuta el siguiente comando:
# datadog-agent diagnóstico datadog-connectivity
```

Busca errores como:
```text
connect: connection refused, context deadline exceeded (Client.Timeout exceeded while awaiting headers), or connection reset by peer
```

- Sigue los pasos del artículo [Comprobar el estado del proxy](#check-the-proxy-status) para asegurarte de que el proxy FIPS del Datadog Agent se está ejecutando.
- Comprueba que el rango de puertos del proxy coincida con el del Agent.

Si el proxy se está ejecutando y el rango de puertos es correcto, es posible que un cortafuegos local de la máquina esté bloqueando el acceso del Agent al proxy. Configura tu cortafuegos para permitir conexiones a los puertos TCP, desde el 9804 al 9818.

Puedes utilizar `curl` para comprobar que se puede acceder al proxy:

```shell
curl http://localhost:9804/
```

Para obtener más ayuda, consulta la sección [Solucionar problemas del Agent][3].

### El proxy FIPS del Datadog Agent no puede conectarse a la admisión de Datadog

Si se producen errores de HTTP como `502`, `503`, o si el proxy devuelve una respuesta vacía, es posible que el proxy FIPS del Datadog Agent no pueda reenviar tráfico al backend de Datadog.

Verifica los logs del proxy FIPS del Datadog Agent con:

```shell
sudo journalctl -u datadog-fips-proxy --no-pager
```

Comprueba si los logs contienen errores como:

```text
haproxy[292759]: [WARNING] (292759) : Server
datadog-api/mothership3 is DOWN, reason: Layer4 timeout, vcheck duration: 2000ms. 0 active and 0 backup servers left. 0 sessions active, 0 requeued, 0 remaining in queue.
[ALERT] (292759) : backend 'datadog-api' has no server available!
```

o

```text
haproxy[1808]: [WARNING] (1808) : Server
datadog-metrics/mothership2 is DOWN, reason: Layer4
connection problem, info: "Connection refused", check duration: 0ms. 0 active and 0 backup servers left. 0
sessions active, 0 requeued, 0 remaining in queue.
haproxy[1808]: [ALERT] (1808) : backend 'datadog-metrics' has no server available!
```

Estos errores indican que el proxy FIPS del Datadog Agent no puede ponerse en contacto con los sistemas de backend, posiblemente debido al bloqueo de un cortafuegos u otro problema de red. El proxy FIPS del Datadog Agent requiere acceso de Internet a los endpoints de admisión de Datadog. Puedes encontrar las direcciones IP de estos endpoints [a través de la API][4].

Para más información sobre conexiones salientes desde el Agent, consulta la guía [Tráfico de red][5].

Si sigues teniendo dudas sobre tu problema, ponte en contacto con el [servicio de asistencia de Datadog)][6].

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://csrc.nist.gov/projects/cryptographic-module-validation-program/certificate/4282
[2]: https://csrc.nist.gov/CSRC/media/projects/cryptographic-module-validation-program/documents/security-policies/140sp4282.pdf
[3]: /es/agent/troubleshooting/
[4]: https://ip-ranges.ddog-gov.com/
[5]: /es/agent/configuration/network/#destinations
[6]: /es/help/