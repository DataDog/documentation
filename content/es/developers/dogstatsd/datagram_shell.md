---
aliases:
- /es/developers/dogstatsd/data_types/
description: Información general del formato de datagramas utilizado por DogStatsD,
  así como del uso (avanzado) de shells.
further_reading:
- link: developers/dogstatsd
  tag: Documentación
  text: Introducción a DogStatsD
- link: developers/libraries
  tag: Documentación
  text: API oficial y creada por la comunidad, y bibliotecas de clientes DogStatsD
title: Formato de datagramas y uso de shells
---

Esta sección especifica el formato de datagramas sin procesar para métricas, eventos y checks de servicios compatibles con DogStatsD. Los datagramas sin procesar están codificados en UTF-8. Esta sección no es de lectura obligatoria, si estás utilizando cualquiera de las [bibliotecas de clientes DogStatsD][1]. Pero si quieres escribir tu propia biblioteca o utilizar el shell para enviar métricas, entonces sigue leyendo.

## Protocolo DogStatsD 

{{< tabs >}}
{{% tab "Metrics" (Métricas) %}}

`<METRIC_NAME>:<VALUE>|<TYPE>|@<SAMPLE_RATE>|#<TAG_KEY_1>:<TAG_VALUE_1>,<TAG_2>`

| Parámetro                           | Obligatorio | Descripción                                                                                                                                                    |
| ----------------------------------- | -------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `<METRIC_NAME>`                     | Sí      | Cadena que sólo contiene caracteres alfanuméricos ASCII, guiones bajos y puntos. Consulta la [política sobre nombres de métricas][101].                                                  |
| `<VALUE>`                           | Sí      | Número entero o flotante.                                                                                                                                           |
| `<TYPE>`                            | Sí      | `c` para COUNT (Recuento), `g` para GAUGE (Indicador), `ms` para TIMER (Temporizador), `h` para HISTOGRAM (Histograma), `s` para SET (Configurar), `d` para DISTRIBUTION (Distribución). Para ver más detalles, consulta [Tipos de métricas][102].                    |
| `<SAMPLE_RATE>`ONSULTA                     | No       | Un valor flotante entre `0` y `1`, inclusive. Sólo funciona con las métricas COUNT, HISTOGRAM, DISTRIBUTION, y TIMER. El valor por defecto es `1`, que muestrea el 100% del tiempo. |
| `<TAG_KEY_1>:<TAG_VALUE_1>,<TAG_2>` | No       | Lista de cadenas separadas por comas. Utiliza dos puntos para etiquetas (tags) (`env:prod`) de clave/valor. Para más información sobre la definición de etiquetas (tags), consulta [Empezando con las etiquetas][103].              |

Los siguientes son algunos ejemplos de datagramas:

- `page.views:1|c`: incrementa la métrica COUNT `page.views`.
- `fuel.level:0.5|g`: registra que el depósito de combustible está medio vacío.
- `song.length:240|h|@0.5`: muestra el histograma `song.length` como si se enviara la mitad del tiempo.
- `users.uniques:1234|s`: realiza un seguimiento de los visitantes únicos del sitio.
- `users.online:1|c|#country:china`: incrementa la métrica y la etiqueta COUNT de los usuarios activos por país de origen.
- `users.online:1|c|@0.5|#country:china`: realiza un seguimiento de los usuarios activos de China y utiliza una frecuencia de muestreo.

### Protocolo DogStatsD v1.1

A partir del Agent `>=v6.25.0` y `<v7.0.0` o `>=v7.25.0`, es posible empaquetar valores. Esta opción
es compatible con todos los tipos de métricas, excepto `SET`. Los valores se separan mediante un `:`, por ejemplo:

`<METRIC_NAME>:<VALUE1>:<VALUE2>:<VALUE3>|<TYPE>|@<SAMPLE_RATE>|#<TAG_KEY_1>:<TAG_VALUE_1>,<TAG_2>`

`TYPE`, `SAMPLE_RATE` y `TAGS` se comparten entre todos los valores. Esto produce la misma métrica que el envío de múltiples
mensajes con un valor en cada uno. Esto es útil para las métricas HISTOGRAM, TIMING y DISTRIBUTION.

### Ejemplo de datagramas

- `page.views:1:2:32|d`: realiza un muestreo de la métrica DISTRIBUTION `page.views` tres veces con los valores `1`, `2` y `32`.
- `song.length:240:234|h|@0.5`: realiza un muestreo del histograma `song.length` como si se enviara la mitad del tiempo, dos veces. A cada valor se le aplica la frecuencia de muestreo de `0.5`.

### Protocolo DogStatsD v1.2

A partir del Agent `>=v6.35.0` y `<v7.0.0` o `>=v7.35.0`, se admite un nuevo campo de ID de contenedor.
El Datadog Agent utiliza el valor del ID de contenedor para enriquecer las métricas de DogStatsD con etiquetas de contenedor adicionales.

El ID de contenedor lleva el prefijo `c:`, por ejemplo:

`<METRIC_NAME>:<VALUE>|<TYPE>|#<TAG_KEY_1>:<TAG_VALUE_1>,<TAG_2>|c:<CONTAINER_ID>`

**Nota:** Configura `dogstatsd_origin_detection_client` como `true` en tu archivo `datadog.yaml` o la variable de entorno `DD_DogStatsD_ORIGIN_DETECTION_CLIENT=true` para indicar al Datadog Agent que extraiga el campo del ID de contenedor y adjuntar las etiquetas de contenedor correspondientes.

### Ejemplo de datagramas

- `page.views:1|g|#env:dev|c:83c0a99c0a54c0c187f461c7980e9b57f3f6a8b0c918c8d93df19a9de6f3fe1d`: el Datadog Agent añade etiquetas de contenedor como `image_name` y `image_tag` a la métrica `page.views`.

Para obtener más información sobre las etiquetas de contenedor, consulta la documentación sobre el etiquetado [Kubernetes][104] y [Docker][105].

### Protocolo DogStatsD v1.3

Los Agents v6.40.0 y v7.40.0 y posteriores admiten un campo de marca temporal Unix opcional.

Cuando se proporciona este campo, el Datadog Agent no procesa ninguna métrica (sin agregación) y sólo se limita a enriquecer los métricas con etiquetas. Esto puede ser útil si ya estabas agregando tus métricas en tu aplicación y quieres enviarlas a Datadog sin ningún procesamiento adicional.

La marca de tiempo Unix debe ser un número positivo válido en el pasado. Sólo se admiten métricas GAUGE y COUNT.

El valor es una marca de tiempo Unix (UTC) y debe tener el prefijo `T`, por ejemplo:

`<METRIC_NAME>:<VALUE>|<TYPE>|#<TAG_KEY_1>:<TAG_VALUE_1>,<TAG_2>|T<METRIC_TIMESTAMP>`

### Ejemplo de datagramas

- `page.views:15|c|#env:dev|T1656581400`: un COUNT indicando que 15 vistas de páginas ocurrieron el 30 de junio de 2022 a las 9:30 UTC

[101]: /es/metrics/#metric-name
[102]: /es/metrics/types/
[103]: /es/getting_started/tagging/
[104]: /es/containers/kubernetes/tag/?tab=containerizedagent#out-of-the-box-tags
[105]: /es/containers/docker/tag/?tab=containerizedagent#out-of-the-box-tagging
{{% /tab %}}
{{% tab "Events" (Eventos) %}}

`_e{<TITLE_UTF8_LENGTH>,<TEXT_UTF8_LENGTH>}:<TITLE>|<TEXT>|d:<TIMESTAMP>|h:<HOSTNAME>|p:<PRIORITY>|t:<ALERT_TYPE>|#<TAG_KEY_1>:<TAG_VALUE_1>,<TAG_2>`

| Parámetro                            | Obligatorio | Descripción                                                                                                            |
| ------------------------------------ | -------- | ---------------------------------------------------------------------------------------------------------------------- |
| `_e`                                 | Sí      | El datagrama debe comenzar por `_e`.                                                                                     |
| `<TITLE>`                            | Sí      | Título del evento.                                                                                                       |
| `<TEXT>`                             | Sí      | Texto del evento. Inserta saltos de línea con: `\\n`.                                                                        |
| `<TITLE_UTF8_LENGTH>`                | Sí      | Longitud (en bytes) del `<TITLE>` del archivo codificado en UTF-8                                                                              |
| `<TEXT_UTF8_LENGTH>`                 | Sí      | Longitud (en bytes) del `<TEXT>` del archivo codificado en UTF-8                                                                               |
| `d:<TIMESTAMP>`                      | No       | Añade una marca de tiempo al evento. El valor predeterminado es la marca de tiempo Unix actual.                                         |
| `h:<HOSTNAME>`                       | No       | Añade un nombre de host al evento. Por defecto es la instancia del Datadog Agent.                                                                               |
| `k:<AGGREGATION_KEY>`                | No       | Añade una clave de agregación para agrupar el evento con otros que tengan la misma clave. No existen valores por defecto.                              |
| `p:<PRIORITY>`                       | No       | Configura como `normal` o `low`. El valor por defecto es `normal`.                                                                            |
| `s:<SOURCE_TYPE_NAME>`               | No       | Añade un tipo de origen al evento. No existen valores por defecto.                                                                            |
| `t:<ALERT_TYPE>`                     | No       | Configura como `error`, `warning`, `info` o `success`. El valor por defecto es `info`.                                                        |
| `#<TAG_KEY_1>:<TAG_VALUE_1>,<TAG_2>` | No       | Los dos puntos en las etiquetas forman parte de la cadena de la lista de etiquetas y no tienen ningún propósito de análisis, lo que sí sucede en los otros parámetros. No existen valores por defecto. |

Los siguientes son algunos ejemplos de datagramas:

``text
## Enviar una excepción
_e{21,36}:Se ha producido una excepción. No se puede analizar el archivo CSV de 10.0.0.17|t:warning|#err_type:bad_file

## Enviar un evento con una nueva línea en el texto
Se ha producido una excepción. No se puede analizar la solicitud:\\n{"foo: "bar"}|p:low|#err_type:bad_request
```

{{% /tab %}}
{{% tab "Service Checks" (Checks de servicios) %}}

`_sc|<NAME>|<STATUS>|d:<TIMESTAMP>|h:<HOSTNAME>|#<TAG_KEY_1>:<TAG_VALUE_1>,<TAG_2>|m:<SERVICE_CHECK_MESSAGE>`

| Parámetro                            | Obligatorio | Descripción                                                                                                                             |
| ------------------------------------ | -------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| `_sc`                                | Sí      | El datagrama debe comenzar por `_sc`.                                                                                                     |
| `<NAME>`                             | Sí      | Nombre del check de servicio.                                                                                                                 |
| `<STATUS>`                           | Sí      | Número entero correspondiente al estado del check (OK = `0`, WARNING (Advertencia) = `1`, CRITICAL (Crítico) = `2`, UNKNOWN (Desconocido) = `3`).                                  |
| `d:<TIMESTAMP>`                      | No       | Añade una marca de tiempo al check. El valor predeterminado es la marca de tiempo Unix actual.                                                          |
| `h:<HOSTNAME>`                       | No       | Añade un nombre de host al evento (no por defecto).                                                                                               |
| `#<TAG_KEY_1>:<TAG_VALUE_1>,<TAG_2>` | No       | Configura las etiquetas del evento. Una lista de cadenas separadas por coma (no por defecto).                                                           |
| `m:<SERVICE_check_MESSAGE>`          | No       | Mensaje que describe el estado actual del check de servicio. Este campo debe situarse en último lugar entre los campos de metadatos (sin valor por defecto). |

El siguiente es un ejemplo de datagrama:

```text
# Enviar un estado CRITICAL para una conexión remota
_sc|Redis connection|2|#env:dev|m:La conexión a Redis ha expirado después de 10s
```

{{% /tab %}}
{{< /tabs >}}

## Enviar métricas utilizando DogStatsD y el shell

Para Linux y otros sistemas operativos tipo Unix, utiliza Bash. Para Windows, utiliza PowerShell y [PowerShell-statsd][2] (una sencilla función de PowerShell que se encarga de los bits de red).

DogStatsD crea un mensaje que contiene información sobre tu métrica, evento o check de servicio y los envía a un Agent instalado localmente como recopilador. La dirección IP de destino es `127.0.0.1` y el puerto del recopilador en UDP es `8125`. Para ver más detalles sobre la configuración del Agent, consulta [DogStatsD][3].

{{< tabs >}}
{{% tab "Metrics" (Métricas) %}}

El formato para enviar métricas es:

``texto
<METRIC_NAME>:<VALUE>|<TYPE>|@<SAMPLE_RATE>|#<TAG_KEY_1>:<TAG_VALUE_1>,<TAG_2>
```

Los siguientes ejemplos envían puntos de datos para una métrica gauge llamada `custom_metric` con la etiqueta `shell`.

En Linux:

```shell
echo -n "custom_metric:60|g|#shell" >/dev/udp/localhost/8125
```

```shell
echo -n "custom_metric:60|g|#shell" | nc -4u -w0 127.0.0.1 8125
```

```shell
echo -n "custom.metric.name:1|c"|nc -4u -w1 localhost 8125
```

En Windows:

```powershell
PS C:\> .\send-statsd.ps1 "custom_metric:123|g|#shell"
```

En cualquier plataforma con Python (en Windows, se puede utilizar el intérprete Python integrado del Agent, que se encuentra en `%ProgramFiles%\Datadog\Datadog Agent\embedded\python.exe`, para el Agent versión 6.11 y anteriores, y en `%ProgramFiles%\Datadog\Datadog Agent\embedded<Python_MAJOR_VERSION>\python.exe`, para el Agent versión 6.12 y posteriores):

### Python 2

```python
import socket
sock = socket.socket(socket.AF_INET, socket.SOCK_DGRAM) # UDP
sock.sendto("custom_metric:60|g|#shell", ("localhost", 8125))
```

### Python 3

```python
import socket
sock = socket.socket(socket.AF_INET, socket.SOCK_DGRAM) # UDP
sock.sendto("custom_metric:60|g|#shell", ("localhost", 8125))
```

{{% /tab %}}
{{% tab "Events" (Eventos) %}}

El formato para enviar eventos es:

```texto
_e{<TITLE>.length,<TEXT>.length}:<TITLE>|<TEXT>|d:<DATE_EVENT>|h:<HOSTNAME>|p:<PRIORITY>|t:<ALERT_TYPE>|#<TAG_KEY_1>:<TAG_VALUE_1>,<TAG_2>.
```

Los siguientes son ejemplos de cálculos del tamaño del título y el cuerpo del evento.

En Linux:

```shell
$ title="Event from the shell"

$ text="This was sent from Bash!"

$ echo "_e{${#title},${#text}}:$title|$text|#shell,bash"  >/dev/udp/localhost/8125
```

En Windows:

```powershell
PS C:> $title = "Event from the shell"
PS C:> $text = "This was sent from PowerShell!"
PS C:> .\send-statsd.ps1 "_e{$($title.length),$($text.Length)}:$title|$text|#shell,PowerShell"
```

{{% /tab %}}
{{% tab "Service Checks" (Checks de servicios) %}}

El formato para enviar checks de servicios es:

```texto
_sc|<NAME>|<STATUS>|d:<TIMESTAMP>|h:<HOSTNAME>|#<TAG_KEY_1>:<TAG_VALUE_1>|m:<SERVICE_CHECK_MESSAGE>
```

En Linux:

```shell
echo -n "_sc|Redis connection|2|#env:dev|m:Redis connection timed out after 10s" >/dev/udp/localhost/8125
```

En Windows:

```powershell
PS C:\> .\send-statsd.ps1 "_sc|Redis connection|2|#env:dev|m:Redis connection timed out after 10s"
```

{{% /tab %}}
{{< /tabs >}}

Para enviar métricas, eventos o checks de servicios en entornos contenedorizados, consulta [DogStatsD en Kubernetes][3], junto con la [configuración de APM en Kubernetes][4], dependiendo de tu instalación. La documentación de [APM Docker][5] también puede ser útil.

## Leer más

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/developers/community/libraries/#api-and-dogstatsd-client-libraries
[2]: https://github.com/joehack3r/powershell-statsd/blob/master/send-statsd.ps1
[3]: /es/developers/dogstatsd/
[4]: /es/agent/kubernetes/apm/
[5]: /es/agent/docker/apm/