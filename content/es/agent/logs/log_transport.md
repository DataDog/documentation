---
description: Utiliza el Datadog Agent para recopilar tus logs y enviarlos a Datadog
further_reading:
- link: agent/logs/advanced_log_collection/#filter-logs
  tag: Documentación
  text: Filtrar los logs enviados a Datadog
- link: agent/logs/advanced_log_collection/#scrub-sensitive-data-from-your-logs
  tag: Documentación
  text: Limpiar los datos confidenciales de tus logs
- link: agent/logs/advanced_log_collection/#multi-line-aggregation
  tag: Documentación
  text: Agregación de logs multilínea
- link: agent/logs/advanced_log_collection/#tail-directories-using-wildcards
  tag: Documentación
  text: Supervisar los directorios mediante comodines
- link: agent/logs/advanced_log_collection/#global-processing-rules
  tag: Documentación
  text: Reglas generales de procesamiento
kind: documentación
title: Transporte de logs del Agent
---


## Comportamiento predeterminado del Agent

En el caso de las versiones del Agent 6.19/7.19 y posteriores, el transporte predeterminado que se usa para tus logs es el HTTPS comprimido en vez del protocolo de transmisión de control (TCP) de las versiones anteriores.
Cuando se inicia el Agent, si la recopilación de logs está activada, esta ejecutará un test de conectividad HTTPS. Si el resultado es correcto, el Agent utilizará el transporte HTTPS comprimido; de lo contrario, recurrirá al TCP.

Este mecanismo para hacer tests de conectividad solo se ejecuta al iniciar el Agent y se aplica únicamente al protocolo HTTPS. Si el Agent no puede establecer conexión con el TCP ni el HTTP al iniciarse, utilizará el transporte TCP cuando recupere la conexión y se mantendrá así hasta el siguiente reinicio.

Para comprobar qué transporte utiliza el Agent, ejecuta el [comando de estado del Agent][1].

{{< img src="agent/logs/agent-status.png" alt="Estado del Agent" style="width:70%;">}}

**Notas**:

* En las versiones anteriores del Agent, se utiliza el transporte TCP de forma predeterminada. Datadog recomienda encarecidamente aplicar el protocolo de transporte HTTPS si se ejecutan las versiones 6.14/7.14 y posteriores, y el HTTPS comprimido si se ejecutan las versiones 6.16/7.16 y posteriores.
* Cuando utilices un proxy, aplica siempre un canal de transporte específico (ya sea TCP o HTTPS) para reenviar los logs a Datadog.

## Aplica un transporte específico

Aplica el uso del transporte TCP o HTTPS mediante las siguientes configuraciones.

{{< tabs >}}
{{% tab "HTTPS" %}}

Para aplicar el transporte HTTPS con las versiones del Agent 6.14/7.14 y posteriores, actualiza el [archivo de configuración principal][1] del Agent (`datadog.yaml`) con:

```yaml
logs_enabled: true
logs_config:
  use_http: true
```

Para enviar logs con variables de entorno, configura lo siguiente:

* `DD_LOGS_ENABLED=true`
* `DD_LOGS_CONFIG_USE_HTTP=true`

De forma predeterminada, el Datadog Agent utiliza el puerto `443` para enviar sus logs a Datadog a través de HTTPS.

## Transporte HTTPS

**El reenvío de logs HTTPS es la configuración recomendada** para obtener la mayor fiabilidad en la recopilación de logs, ya que el sistema de almacenamiento de Datadog devuelve el código de estado `200`:

{{< img src="agent/HTTPS_intake_reliability_schema.png" alt="Esquema de admisión de HTTPS" style="width:80%;">}}

Al usar HTTP, el Agent envía lotes de logs con los siguientes límites:

* Tamaño máximo del lote: 1 MB
* Tamaño máximo para un log único: 256 kB
* Número máximo de logs en un lote: 200

### Compresión de logs

El parámetro `compression_level` (o `DD_LOGS_CONFIG_COMPRESSION_LEVEL`) acepta valores de `0` (sin compresión) a `9` (máxima compresión, pero mayor uso de recursos). El valor predeterminado es `6`.

Consulta la [sección dedicada a la sobrecarga del Datadog Agent][2] para obtener más información sobre el uso de recursos del Agent cuando la compresión está activada.

En las versiones del Agent anteriores a 6.19/7.19, para aplicar la compresión, tienes que actualizar el [archivo de configuración principal][1] del Agent (`datadog.yaml`) con:

```yaml
logs_enabled: true
logs_config:
  use_http: true
  use_compression: true
  compression_level: 6
```

### Configuración del tiempo de espera del lote

El Agent espera hasta 5 segundos para completar cada lote (ya sea en tamaño de contenido o en número de logs). Por lo tanto, en el peor de los casos (cuando se generan pocos logs), cambiar a HTTPS podría añadir una latencia de 5 segundos, lo que contrasta con el transporte TCP, que envía todos los logs en tiempo real.

Para cambiar el tiempo máximo que el Datadog Agent espera para completar cada lote, añade la siguiente configuración en el [archivo de configuración principal][1] del Agent (`datadog.yaml`):

```yaml
logs_config:
  batch_wait: 2
```

También puedes usar la variable de entorno `DD_LOGS_CONFIG_BATCH_WAIT=2`. La unidad está en segundos y debe ser un número entero entre `1` y `10`.

### Configuración del proxy HTTPS

Cuando los logs se envíen a través de HTTPS, usa el mismo [conjunto de parámetros de proxy][3] que los otros tipos de datos para enviar los logs a través de un proxy web.

[1]: /es/agent/guide/agent-configuration-files/
[2]: /es/agent/basic_agent_usage/#agent-overhead
[3]: /es/agent/proxy/
{{% /tab %}}
{{% tab "TCP" %}}

Para aplicar el transporte TCP, actualiza el [archivo de configuración principal][1] del Agent (`datadog.yaml`) con:

```yaml
logs_enabled: true
logs_config:
  force_use_tcp: true
```
Para enviar logs con variables de entorno, configura lo siguiente:

* `DD_LOGS_ENABLED=true`
* `DD_LOGS_CONFIG_FORCE_USE_TCP=true`

De forma predeterminada, el Datadog Agent envía sus logs a Datadog mediante el protocolo TCP con cifrado TLS. Esto requiere comunicación de salida (en el puerto `10516` para el sitio de Datadog de EE. UU. y en el puerto `443` para el sitio de Datadog de la UE).

[1]: /es/agent/guide/agent-configuration-files/
{{% /tab %}}
{{< /tabs >}}

**Nota**: Al configurar un servidor [proxy SOCKS5][2], se aplica el transporte TCP, ya que los proxies Socks5 aún no son compatibles con el protocolo HTTPS comprimido.


[1]: /es/agent/guide/agent-commands/?tab=agentv6v7#service-status
[2]: /es/agent/logs/proxy/?tab=socks5
