---
algolia:
  rank: 80
  tags:
  - fips
  - fips proxy
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
  text: Monitorear cargas de trabajo altamente reguladas con Agent habilitado para
    FIPS de Datadog
kind: Guía
title: Cumplimiento de FIPS de Datadog
---

{{< site-region region="us,us3,us5,eu,ap1" >}}
<div class="alert alert-warning">El Datadog Agent FIPS Proxy solo está disponible en la región US1-FED..</a></div>
{{< /site-region >}}

El Datadog Agent FIPS Proxy garantiza que la comunicación entre Datadog Agent y Datadog utiliza cifrado conforme a FIPS.

El Datadog Agent FIPS Proxy es un componente distribuido por separado que se despliega en el mismo host que el Datadog Agent . El proxy actúa como intermediario entre el consumo de Agent y Datadog. El Agent se comunica con el Datadog Agent FIPS Proxy, que cifra las cargas útiles utilizando una criptografía validada por FIPS 140-2 y las retransmite a Datadog. El Datadog Agent y el Agent FIPS Proxy  deben configurarse en tándem para comunicarse entre sí.

## Plataformas compatibles y limitaciones

La conformidad de Datadog Agent FIPS Proxy se basa en el uso del [Cryptographic Module - Certificate #4282 (Módulo criptográfico - Certificado #4282)] validado por FIPS 140-2[1]. Consulta la [security policy (política de seguridad)][2] relacionada para obtener información sobre las restricciones y los entornos operativos validados.

**Es responsabilidad del usuario garantizar que el funcionamiento de entorno cumple con la política de seguridad y las directrices generales de FIPS.**

Plataformas compatibles (64 bits x86):

|||
| ---  | ----------- |
| Bare metal and VMs | RHEL >= 7<br>Debian >= 8<br>Ubuntu >= 14.04<br>SUSE >= 12 (beta)|
| Cloud and container| Amazon ECS<br>AWS EKS (Helm)|

**Nota**: La arquitectura arm64 está disponible en beta.

Productos compatibles (Agent 7.45+):

- Metrics
- Logs
- APM traces
- APM profiles
- Instrumentation Telemetry
- Processes
- Orchestrator Explorer
- Runtime Security


El proxy de FIPS de Datadog Agent **no** admite lo siguiente:

- Serverless Monitoring
- Comunicación entre Cluster Agent y el Node Agents
- Agent integrations
- Comunicación saliente a cualquier otra cosa que no sea GovCloud

## Requisitos previos

- Rango de puertos TCP disponible: 9803 a 9818
- Versión de Datadog Agent 7.41 o posterior

## Instalar el Agent con soporte FIPS

{{< tabs >}}
{{% tab "Host or VM" %}}

### Instalar el Agent en un nuevo host

Para instalar el Datadog Agent con el Datadog Agent FIPS Proxy, añade `DD_FIPS_MODE=1` a las instrucciones de instalación en un solo paso de la página [Datadog Agent Integration (Integración de Datadog Agent)][1]. Por ejemplo

```shell
DD_API_KEY=<DD_API_KEY> \
DD_SITE="ddog-gov.com" \
DD_FIPS_MODE=1 \
bash -c "$(curl -L \
   https://s3.amazonaws.com/dd-agent/scripts/install_script_agent7.sh)"
```

Establecer la variable de entorno `DD_FIPS_MODE` instala el paquete de FIPS junto con el Agent, y configura el Agent para usar el proxy. No hay pasos de configuración adicionales si estás usando este método, pero deberías [verify the installation (verificar la instalación)](#verify-your-installation).

### Añadir el Datadog Agent FIPS Proxy a un Agent

Sigue los pasos que se indican a continuación para añadir el Datadog Agent FIPS Proxy a una instalación existente de Agent.

#### Instalar el paquete de Datadog Agent FIPS Proxy:

1. Ejecuta los siguientes comandos para instalar el proxy:

   Debian:
   ```shell
   apt-get update && apt-get install datadog-fips-proxy
   ```
   RHEL and Fedora:
   ```shell
   yum makecache && yum install datadog-fips-proxy
   ```
   SLES:
   ```shell
   zypper refresh datadog && zypper install datadog-fips-proxy
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

El paquete de Datadog Agent FIPS Proxy viene preconfigurado para su uso con el centro de datos US1-FED. Si estás actualizando un Datadog Agent existente, **debes** configurar el Agent para utilizar el proxy.

Para eso, establece `fips.enabled` en `verdadero` y `fips.https` en `falso` en el [Agent configuration file (archivo de configuración de Agent)][2]:

```yaml
fips:
  enabled: true
  https: false
```

La opción `fips` está disponible en las versiones de Agent 7.41 o posteriores. Cuando la configuración está activada, Datadog Agent redirige todas sus comunicaciones a Datadog Agent FIPS Proxy para los productos compatibles. Esta configuración ignora las opciones de URL personalizadas, como `dd_url`.

La opción `https` se establece en `falso` porque Agent utiliza HTTP para comunicarse con el proxy. El Datadog Agent FIPS Proxy se ejecuta en el mismo host que Agent y confía en la seguridad del host para proteger dicha comunicación.

** La seguridad y el fortalecimiento de host son tu responsabilidad.**

<div class="alert alert-warning">El valor predeterminado de <code>fips.enabled</code> es <code>falso</code> en el Agent. Debe establecerse en <code>verdadero</code> para garantizar que todas las comunicaciones se reenvían a través del Datadog Agent FIPS Proxy.<br><br><strong>Si <code>fips.enabled</code> no está establecido en <code>verdadero</code>, el Agent no es compatible con FIPS</strong>.</div>

### Verifica tu instalación

Verifica que métricas, trazas (traces), y logs están correctamente reportados en la app.

Para métricas, ejecuta el comando de diagnóstico de conectividad y comprueba que todos los checks pasen:

```shell
sudo -u dd-agent datadog-agent diagnose --include connectivity-datadog-core-endpoints
# Para la versión de Agent anterior a 7.48, ejecuta el siguiente comando:
# sudo -u dd-agent datadog-agent diagnose datadog-connectivity
```

Si no ves métricas, trazas o logs reportadas en la aplicación, consulta la sección [Troubleshooting (solucionar problemas)](#troubleshooting-a-bare-metal-or-vm-installation).

### Ver logs

```shell
sudo journalctl -u datadog-fips-proxy
```

#### Configuración de logs de journald

Si utilizas [Log Management (Gestión de logs)][3] y deseas enviar los logs Proxy de FIPS de Datadog Agent a Datadog, configura el Datadog Agent para leer logs desde journald.

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

El ajuste `fips` está disponible en las versiones Agent 7.41 o posteriores. Cuando la configuración está activada, Datadog Agent redirige todas sus comunicaciones al Proxy de FIPS de Datadog Agent para los productos compatibles. Esta configuración ignora las opciones de URL personalizadas, como `dd_url`.

La opción `use_https` se establece en `falso` porque Agent utiliza HTTP para comunicarse con el proxy. El Proxy de FIPS de Datadog Agent se ejecuta en el mismo host que Datadog Agent y confía en la seguridad de host para la protección de dicha comunicación.

**La seguridad y el fortalecimiento de host son tu responsabilidad.**

<div class="alert alert-warning">El ajuste <code>fips.enabled</code> está predeterminado como <code>falso</code> en el Agent. Debe establecerse en <code>verdadero</code> para garantizar que todas las comunicaciones se reenvíen a través del Proxy de FIPS de Datadog Agent.<br><br><strong>Si <code>fips.enabled</code> no está establecido en <code>verdadero</code>, el Agent no es compatible con FIPS</strong>.</div>


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

Datadog Agent FIPS Proxy solo protege la comunicación que se origina en Cluster Agent y se dirige a los enpoints de la API de admisión Datadog. Esto significa que otras formas de comunicación que terminen en Cluster Agent o se originen en Cluester Agent no son conformes a FIPS gracias a esta solución.

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