---
algolia:
  rank: 80
  tags:
  - fips
  - proxy fips
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
<div class="alert alert-warning">El proxy de FIPS del Datadog Agent sólo está disponible en la región US1-FED.</a></div>
{{< /site-region >}}

El proxy de FIPS del Datadog Agent garantiza que en la comunicación entre el Datadog Agent y Datadog se utilice un cifrado compatible con FIPS.

El proxy de FIPS del Datadog Agent es un componente distribuido por separado que se implementa en el mismo host que el Datadog Agent. El proxy actúa como intermediario entre el Agent y el consumo de Datadog. El Agent se comunica con el proxy de FIPS del Datadog Agent, que cifra las cargas útiles utilizando una criptografía validada por FIPS 140-2 y las retransmite a Datadog. El Datadog Agent y el proxy de FIPS del Agent deben configurarse en tándem para que se puedan comunicar entre sí.

## Plataformas compatibles y limitaciones

La conformidad del proxy de FIPS del Datadog Agent con los estándares se basa en el uso del [certificado n.º 4282 del Programa Estadounidense de Validación de Módulos Criptográficos][1], validado por FIPS 140-2. Consulta la [política de seguridad][2] correspondiente para obtener información sobre las restricciones y los entornos operativos validados.

**Es responsabilidad del usuario garantizar que el funcionamiento del entorno cumple con la política de seguridad y las directrices generales de FIPS.**

Plataformas compatibles (64 bits x86):

|||
| ---  | ----------- |
| Equipos sin sistema operativo y máquinas virtuales | RHEL >= 7<br>Debian >= 8<br>Ubuntu >= 14.04<br>SUSE >= 12 (beta)|
| Nube y contenedores | Amazon ECS<br>AWS EKS (Helm)|

**Nota**: La arquitectura arm64 está disponible en fase beta.

Productos compatibles (Agent v7.45 y posteriores):

- Métricas
- Logs
- Trazas de APM
- Perfiles de APM
- Telemetría de instrumentación
- Procesos
- Orchestrator Explorer
- Runtime Security


El proxy de FIPS de Datadog Agent **no** admite lo siguiente:

- La monitorización serverless
- La comunicación entre el Cluster Agent y Agents del nodo
- Las integraciones con el Agent
- La comunicación saliente a cualquier otro punto que no sea GovCloud

## Requisitos previos

- Rango de puertos TCP disponible: 9803 a 9818
- Versión de Datadog Agent 7.41 o posteriores

## Instalar el Agent con compatibilidad con FIPS

{{< tabs >}}
{{% tab "Host o MV" %}}

### Instalar el Agent en un nuevo host

Para instalar el Datadog Agent con el proxy de FIPS de Datadog Agent, añade `DD_FIPS_MODE=1` a las instrucciones de instalación en un solo paso que encontrarás en el artículo sobre la [integración con el Datadog Agent][1]. Por ejemplo:

```shell
DD_API_KEY=<DD_API_KEY> \
DD_SITE="ddog-gov.com" \
DD_FIPS_MODE=1 \
bash -c "$(curl -L \
   https://install.datadoghq.com/scripts/install_script_agent7.sh)"
```

Al establecer la variable de entorno `DD_FIPS_MODE`, se instala el paquete de FIPS junto con el Agent y se configura el Agent para que utilice el proxy. Si utilizas este método, la configuración ha terminado, pero deberías [verificar la instalación](#verify-your-installation).

### Añadir el proxy de FIPS de Datadog Agent a un Agent existente

Sigue los pasos que se indican a continuación para añadir el proxy de FIPS de Datadog Agent a una instalación existente del Agent.

#### Instalar el paquete del proxy de FIPS de Datadog Agent

1. Ejecuta los siguientes comandos para instalar el proxy de FIPS de Datadog Agent:

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

1. La primera vez que realices una actualización, copia el archivo de configuración de ejemplo en la ubicación apropiada y reinicia el proxy. No necesitas copiar la configuración en actualizaciones posteriores, a menos que haya cambios significativos en la configuración de proxy ascendente:
   ```shell
   sudo cp /etc/datadog-fips-proxy/datadog-fips-proxy.cfg.example \
      /etc/datadog-fips-proxy/datadog-fips-proxy.cfg
   sudo chown dd-agent:dd-agent \
      /etc/datadog-fips-proxy/datadog-fips-proxy.cfg
   sudo chmod 640 /etc/datadog-fips-proxy/datadog-fips-proxy.cfg
   sudo systemctl restart datadog-fips-proxy
   ```

#### Configurar el Agent para utilizar el proxy de FIPS de Datadog Agent

El paquete del proxy de FIPS de Datadog Agent viene preconfigurado para su uso con el centro de datos US1-FED. Si quieres actualizar un Datadog Agent existente, **debes** configurar el Agent para que utilice el proxy.

Para eso, dale a `fips.enabled` el valor `true`, y a `fips.https`, el valor `false`, en el [archivo de configuración del Agent][2]:

```yaml
fips:
  enabled: true
  https: false
```

El parámetro `fips` se puede utilizar en las versiones del Agent 7.41 y posteriores. Cuando está activado, Datadog Agent redirige todas sus comunicaciones al proxy de FIPS de Datadog Agent en los productos compatibles. Este parámetro ignora las opciones de URL personalizadas, como `dd_url`.

El parámetro `https` tiene el valor `false`, ya que utiliza el Agent utiliza HTTP para comunicarse con el proxy. El proxy de FIPS de Datadog Agent se ejecuta en el mismo host que el Agent y, para proteger la comunicación, se emplea el sistema de seguridad del host.

**Proteger y reforzar el host es tu responsabilidad.**
<div class="alert alert-warning">El parámetro predeterminado <code>fips.enabled</code> es <code>false</code> en el Agent. Debe tener el valor <code>true</code> para garantizar que todas las comunicaciones se reenvían a través del proxy de FIPS de Datadog Agent.<br><br><strong> Si <code>fips.enabled</code> no tiene el valor <code>true</code>, el Agent no es compatible con FIPS</strong>.</div>

### Verifica tu instalación

Verifica qué métricas, trazas (traces), y logs están correctamente reportados en la aplicación.

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

Si utilizas [Log Management][3] y quieres enviar los logs del proxy de FIPS del Datadog Agent a Datadog, configura el Datadog Agent para leer logs desde journald.

1. En el [configuration file (archivo de configuración)][2] de Agent, establece `logs_enabled` en `verdadero` para activar Logs Agent. En el [configuration directory (directorio de configuración)][4], crea un archivo en `fips_proxy.d/conf.yaml` con el siguiente contenido:

   ```yaml
   logs:
     - type: journald
       source: datadog-fips-proxy
       include_units:
         - datadog-fips-proxy.service
   ```

1. Asegúrate de que el usuario `dd-agent` está en el grupo `systemd-journal`. Para más información, consulta la documentación [journald integration (integración de journald)][5].
1. [Restart the Agent (reiniciar el Agent)][6].

[1]: https://app.datadoghq.com/account/settings/agent/latest
[2]: /es/agent/configuration/agent-configuration-files/#agent-main-configuration-file
[3]: /es/logs/
[4]: /es/agent/configuration/agent-configuration-files/#agent-configuration-directory
[5]: /es/integrations/journald/#configuration
[6]: /es/agent/configuration/agent-commands/#start-stop-and-restart-the-agent
{{% /tab %}}

{{% tab "Helm on Amazon EKS" %}}
Establece los siguientes valores en tu archivo `values.yaml`:

```yaml
fips:
  enabled: true
  use_https: false
```

El ajuste `fips` está disponible en las versiones Agent 7.41 o posteriores. Cuando la configuración está activada, Datadog Agent redirige todas sus comunicaciones al Datadog Agent FIPS Proxy para los productos compatibles. Esta configuración ignora las opciones de URL personalizadas, como `dd_url`.

La opción `use_https` se establece en `falso` porque Agent utiliza HTTP para comunicarse con el proxy. El Datadog Agent FIPS Proxy se ejecuta en el mismo host que Datadog Agent y confía en la seguridad de host para la protección de dicha comunicación.

**La seguridad y el fortalecimiento de host son tu responsabilidad.**

<div class="alert alert-warning">El ajuste <code>fips.enabled</code> está predeterminado como <code>falso</code> en el Agent. Debe establecerse en <code>verdadero</code> para garantizar que todas las comunicaciones se reenvíen a través del Datadog Agent FIPS Proxy.<br><br><strong>Si <code>fips.enabled</code> no está establecido en <code>verdadero</code>, el Agent no es compatible con FIPS</strong>.</div>


{{% /tab %}}

{{% tab "Amazon ECS" %}}

Para obtener instrucciones sobre la instalación del proxy de FIPS en Amazon ECS, consulta [FIPS proxy for GOVCLOUD environments (entornos de FIPS proxy para GOVCLOUD)][1].

[1]: /es/containers/amazon_ecs/#fips-proxy-for-govcloud-environments
{{% /tab %}}

{{< /tabs >}}

## Solucionar problemas de un host o una instalación VM

Para solucionar los problemas del Datadog Agent FIPS Proxy, verifica lo siguiente:
- Se están ejecutando Datadog Agent y Datadog Agent FIPS Proxy.
- El Datadog Agent puede comunicarse con el Datadog Agent FIPS Proxy.
- El Datadog Agent FIPS Proxy puede comunicarse con los endpoints de admisión de Datadog.

### Controlar el estado del proxy

Para obtener información sobre el estado de Datadog Agent FIPS Proxy, ejecuta el siguiente comando:

```shell
sudo systemctl status datadog-fips-proxy
```

Si se está ejecutando el proxy, la salida debería ser similar a la siguiente:
```text
- datadog-fips-proxy.service - Datadog FIPS Proxy
  Cargado: cargado
    (/lib/systemd/system/datadog-fips-proxy.service;
      enabled; vendor preset: enabled)
  Activo: activo (ejecutando) desde martes 19-07-2022 16:21:15 UTC; hace 1 min 6 s
```

Si el estado del proxy es `inactivo (muerto)`, inicia el Datadog Agent FIPS Proxy:

```shell
sudo systemctl start datadog-fips-proxy
```

Si el estado del proxy es `fallido`, el Datadog Agent FIPS Proxy no se ha podido iniciar debido a un error. Ejecuta el siguiente comando y busca errores en los logs del proxy:

```shell
sudo journalctl -u datadog-fips-proxy --no-pager
```

### Proxy no puede enlazar el socket

Si los logs del proxy muestran un error `enlazar socket`, el proxy está intentando utilizar un puerto que ya está en uso en el host. El Datadog Agent FIPS Proxy utiliza el rango de puertos TCP desde el 9803 hasta el 9818 inclusive. Los puertos de este rango deben estar disponibles en host y no ser utilizados por otros servicios.

En el siguiente ejemplo, el Datadog Agent FIPS Proxy no puede enlazar un socket en el puerto `9804` porque el puerto ya está en uso:

```text
[ALERT] (4518) : Iniciando frontend métricas-forwarder: no se puede enlazar socket (Dirección ya en uso) [0.0.0.0:9804]
[ALERT] (4518) : [/opt/Datadog-fips-proxy/embedded/sbin/haproxy.main()] Algunos protocolos fallaron al iniciar sus escuchadores. Saliendo.
```

### Agent no puede conectarse al proxy.

Para controlar problemas de red, controla los logs en `/var/log/datadog/agent.log`, o ejecuta:

```shell
datadog-agent diagnose --include connectivity-datadog-core-endpoints
# Para versiones de Agent 7.48 o anteriores, ejecuta el siguiente comando:
# datadog-agent diagnóstico datadog-connectivity
```

Busca errores como:
```text
conectar: conexión denegada, fecha límite de contexto excedida (Client.Timeout excedido mientras espera cabeceras), o conexión reseteada por peer
```

- Sigue los pasos en [Check the proxy status (controla el estado del proxy)](#check-the-proxy-status) para verificar que el Datadog Agent FIPS Proxy se esté ejecutando.
- Comprueba que el rango de puertos de proxy coincida con el de Agent.

Si el proxy se está ejecutando y el rango de puertos es correcto, es posible que un cortafuegos local de la máquina esté bloqueando el acceso de Agent al proxy. Configura tu cortafuegos para permitir conexiones a los puertos TCP de 9804 a 9818.

Puedes utilizar `curl` para verificar que se puede acceder al proxy:

```shell
curl http://localhost:9804/
```

Para más ayuda, consulta [Agent Troubleshooting (solucionar problemas de Agent)][3].

### Datadog Agent FIPS Proxy no puede conectarse a consumo de Datadog

Si se producen errores de HTTP como `502`, `503`, o si el proxy devuelve una respuesta vacía, es posible que Datadog Agent FIPS Proxy no pueda reenviar tráfico al backend de Datadog.

Verifica los logs de Datadog Agent FIPS Proxy con:

```shell
sudo journalctl -u datadog-fips-proxy --no-pager
```

Controla los logs para errores como:

```text
haproxy[292759]: [WARNING (ADVERTENCIA) (292759) : Servidor
datadog-api/mothership3 está CAÍDO, razón: Capa4 tiempo de espera, duración vcheck: 2000 ms. Quedan 0 servidores activos y 0 de backup. 0 sesiones activas, 0 en cola, 0 restantes en cola.
[ALERT (ALERTA)] (292759): El backend 'datadog-api' no tiene servidor disponible.
```

o

```text
haproxy[1808]: [WARNING (ADVERTENCIA) (1808) : Servidor
datadog-metrics/mothership2 está CAÍDO, razón: Capa4
problema de conexión, info: "Conexión rechazada", duración del check: 0 ms. Quedan 0 servidores activos y 0 de backup. 0 
sesiones activas, 0 en cola, 0 restantes en cola.
haproxy[1808]: [ALERT (ALERTA)] (1808): El backend 'datadog-metrics' no tiene servidor disponible.
```

Estos errores indican que Datadog Agent FIPS Proxy no puede ponerse en contacto con los sistemas backend, posiblemente debido al bloqueo de un cortafuegos o a otro problema de red. Datadog Agent FIPS Proxy requiere acceso a Internet a los endpoints de consumo de Datadog. Puedes encontrar las direcciones IP de estos endpoints [through the API (a través de la API)][4].

Para más información sobre conexiones salientes desde el Agent, consulta la guía [Network Traffic (tráfico de red)][5].

Si sigues teniendo dudas sobre tu problema, ponte en contacto con [Datadog support (asistencia de Datadog)][6].

## Preguntas frecuentes

**1. ¿Tienen que estar el Datadog Agent y el Datadog Agent FIPS Proxy en el mismo host?**

Sí, la conformidad con FIPS no se conserva si Datadog Agent FIPS Proxy y Datadog Agent no están en el mismo host.
Del mismo modo, la conformidad con FIPS no se mantiene si la opción `fips.enabled` no se establece en `verdadero` en `datadog.yaml`.

**2. ¿Quién es responsable de fortalecer el host?**

Tú, el cliente de Datadog, eres responsable de la seguridad y el fortalecimiento de host.

**3. ¿Están fortalecidas las imágenes de Datadog Agent FIPS Proxy?**

Aunque las imágenes proporcionadas se han construido teniendo en cuenta la seguridad, no se han evaluado con respecto a las recomendaciones de referencia del CIS ni a las normas STIG de DISA.

**4. ¿Son compatibles con FIPS todas las comunicaciones entrantes y salientes de Agent?**

Datadog Agent FIPS Proxy solo protege la comunicación que se origina en Agent y se dirige a los endpoints de la API de admisión Datadog. Esto significa que otras formas de comunicación que terminen en el Agent o se originen en el Agent no son conformes a FIPS gracias a esta solución.

**5. ¿Se admiten todas las comunicaciones entre el FIPS de Cluster Agent y Node Agents?**

Datadog Agent FIPS Proxy solo protege la comunicación que se origina en Cluster Agent y se dirige a los endpoints de la API de admisión Datadog. Esto significa que otras formas de comunicación que terminen en Cluster Agent o se originen en Cluster Agent no son conformes a FIPS gracias a esta solución.

**6. ¿Se mantiene la conformidad con FIPS si reconstruimos o reconfiguramos Datadog Agent FIPS Proxy para adaptarlo a nuestras necesidades de implementación o de pruebas?**.

Aunque la reconstrucción, reconfiguración o modificación de Datadog Agent FIPS Proxy pueda ser una configuración técnicamente operativa, Datadog no puede garantizar la conformidad con FIPS si Datadog Agent FIPS Proxy no se utiliza exactamente como se explica en la documentación.

**7. Mi Datadog Agent está enviando datos correctamente a pesar de que no he seguido todos los pasos de instalación indicados anteriormente. ¿Mi instalación es compatible con FIPS?**

Datadog no puede garantizar la conformidad con FIPS si Datadog Agent FIPS Proxy no se utiliza exactamente como está documentado.
La configuración correcta incluye tener tu Datadog Agent configurado para comunicarte con el Datadog Agent FIPS Proxy configurando la opción `fips.enabled`, y tener un Datadog Agent FIPS Proxy en ejecución.

**8. ¿Están las versiones lanzadas de Datadog Agent vinculadas a las versiones lanzadas de Datadog Agent FIPS Proxy?

No, las versiones del Datadog Agent FIPS Proxy están desacopladas de las versiones Datadog Agent. Utiliza la última de las versiones Datadog Agent y Datadog Agent FIPS Proxy
para disponer de todos los productos disponibles compatibles con Datadog Agent y Datadog Agent FIPS Proxy.

## Leer más

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://csrc.nist.gov/projects/cryptographic-module-validation-program/certificate/4282
[2]: https://csrc.nist.gov/CSRC/media/projects/cryptographic-module-validation-program/documents/security-policies/140sp4282.pdf
[3]: /es/agent/troubleshooting/
[4]: https://ip-ranges.ddog-gov.com/
[5]: /es/agent/configuration/network/#destinations
[6]: /es/help/