---
algolia:
  tags:
  - advanced log filter
description: Utiliza el Datadog Agent para recopilar tus logs y enviarlos a Datadog
further_reading:
- link: /logs/guide/how-to-set-up-only-logs/
  tag: Documentación
  text: Utiliza el Datadog Agent solo para la recopilación de logs
- link: /logs/log_configuration/processors
  tag: Documentación
  text: Descubre cómo procesar tus logs
- link: /logs/log_configuration/parsing
  tag: Documentación
  text: Más información sobre el parseo
- link: /logs/live_tail/
  tag: Documentación
  text: La funcionalidad Live Tail de Datadog
- link: /logs/explorer/
  tag: Documentación
  text: Cómo explorar tus logs
- link: /logs/logging_without_limits/
  tag: Documentación
  text: Logging without Limits*
- link: /glossary/#tail
  tag: Glosario
  text: Entrada del glosario para «supervisar»
kind: documentación
title: Configuraciones avanzadas de recopilación de logs
---

Después de establecer la [recopilación de logs][1], puedes personalizar la configuración de la recopilación:
* [Filtrar logs](#filter-logs)
* [Limpia los datos confidenciales de tus logs](#scrub-sensitive-data-from-your-logs)
* [Agregar logs multilínea](#multi-line-aggregation)
* [Copiar los ejemplos más utilizados](#commonly-used-log-processing-rules)
* [Utiliza comodines para monitorizar los directorios](#tail-directories-using-wildcards)
* [Especificar las codificaciones del archivo de logs](#log-file-encodings)
* [Define las reglas de procesamiento generales](#global-processing-rules)

Para aplicar una regla de procesamiento a todos los logs que recopila el Datadog Agent, consulta la sección [Reglas de procesamiento generales](#global-processing-rules).

**Notas**:
- Si configuras varias reglas de procesamiento, se aplicarán secuencialmente, de forma que cada una se aplicará al resultado de la anterior.
- Los patrones de las reglas de procesamiento se deben ajustar a la [sintaxis de la expresión regular de Golang][2].
- El parámetro `log_processing_rules` se utiliza en las configuraciones de la integración para personalizar la configuración de la recopilación de logs. Mientras que en la [configuración principal][5] del Agent, el parámetro `processing_rules` se utiliza para definir reglas de procesamiento generales.

## Filtrar logs

Para enviar solo un subconjunto específico de logs a Datadog, utiliza el parámetro `log_processing_rules` en el archivo de configuración con el tipo `exclude_at_match` o `include_at_match`.

### Excluir si hay coincidencia

| Parámetro          | Descripción                                                                                        |
|--------------------|----------------------------------------------------------------------------------------------------|
| `exclude_at_match` | Si el patrón especificado aparece en el mensaje, se excluye el log y no se envía a Datadog. |

Por ejemplo, para **excluir** los logs que contienen una dirección de correo electrónico de Datadog, utiliza `log_processing_rules` de la siguiente manera:

{{< tabs >}}
{{% tab "Archivo de configuración" %}}

```yaml
logs:
  - type: file
    path: /my/test/file.log
    service: cardpayment
    source: java
    log_processing_rules:
    - type: exclude_at_match
      name: exclude_datadoghq_users
      ## Regexp can be anything
      pattern: \w+@datadoghq.com
```

{{% /tab %}}
{{% tab "Docker" %}}

En un entorno de Docker, utiliza la etiqueta `com.datadoghq.ad.logs` en el **contenedor que envíe los logs que quieres filtrar** para especificar el parámetro `log_processing_rules`. Por ejemplo:

```yaml
 labels:
    com.datadoghq.ad.logs: >-
      [{
        "source": "java",
        "service": "cardpayment",
        "log_processing_rules": [{
          "type": "exclude_at_match",
          "name": "exclude_datadoghq_users",
          "pattern" : "\\w+@datadoghq.com"
        }]
      }]
```

**Nota**: Utiliza secuencias de escape en los caracteres de expresión regular de tus patrones cuando uses etiquetas. Por ejemplo, `\d` pasaría a ser `\\d`, `\w` pasaría a ser `\\w`.

**Nota**: El valor de la etiqueta debe seguir la sintaxis JSON, lo que significa que no debes incluir comas finales ni comentarios.

{{% /tab %}}
{{% tab "Kubernetes" %}}

Para aplicar una configuración específica a un contenedor determinado, Autodiscovery identifica los contenedores por nombre, NO por imagen, e intenta hacer coincidir `<CONTAINER_IDENTIFIER>` con `.spec.containers[0].name`, no con `.spec.containers[0].image.`. Para configurar el uso de Autodiscovery con el fin de recopilar los logs del contenedor en un `<CONTAINER_IDENTIFIER>` determinado dentro de tu pod, añade las siguientes anotaciones al parámetro `log_processing_rules` de tu pod:

```yaml
apiVersion: apps/v1
kind: ReplicaSet
metadata:
  name: cardpayment
spec:
  selector:
    matchLabels:
      app: cardpayment
  template:
    metadata:
      annotations:
        ad.datadoghq.com/<CONTAINER_IDENTIFIER>.logs: >-
          [{
            "source": "java",
            "service": "cardpayment",
            "log_processing_rules": [{
              "type": "exclude_at_match",
              "name": "exclude_datadoghq_users",
              "pattern" : "\\w+@datadoghq.com"
            }]
          }]
      labels:
        app: cardpayment
      name: cardpayment
    spec:
      containers:
        - name: '<CONTAINER_IDENTIFIER>'
          image: cardpayment:latest
```

**Nota**: Utiliza secuencias de escape en los caracteres de expresión regular de tus patrones cuando uses anotaciones de pod. Por ejemplo, `\d` pasaría a ser `\\d`, `\w` pasaría a ser `\\w`.

**Nota**: El valor de la anotación debe seguir la sintaxis JSON, lo que significa que no debes incluir comas finales ni comentarios.

{{% /tab %}}
{{< /tabs >}}

### Incluir si hay coincidencia

| Parámetro          | Descripción                                                                       |
|--------------------|-----------------------------------------------------------------------------------|
| `include_at_match` | Solo se enviarán a Datadog aquellos logs que tengan un mensaje con el patrón especificado. Si se definen varias reglas `include_at_match`, deberán coincidir todos los patrones de reglas para que se incluya el log. |


Por ejemplo, utiliza la siguiente configuración del parámetro `log_processing_rules` para **incluir** los logs que contienen una dirección de correo electrónico de Datadog:

{{< tabs >}}
{{% tab "Archivo de configuración" %}}

```yaml
logs:
  - type: file
    path: /my/test/file.log
    service: cardpayment
    source: java
    log_processing_rules:
    - type: include_at_match
      name: include_datadoghq_users
      ## Regexp can be anything
      pattern: \w+@datadoghq.com
```

Si quieres que coincidan uno o varios patrones, debes definirlos en una única expresión:

```yaml
logs:
  - type: file
    path: /my/test/file.log
    service: cardpayment
    source: java
    log_processing_rules:
    - type: include_at_match
      name: include_datadoghq_users
      pattern: abc|123
```

Si los patrones son demasiado largos para caber en una sola línea de forma legible, puedes distribuirlos en varias líneas:

```yaml
logs:
  - type: file
    path: /my/test/file.log
    service: cardpayment
    source: java
    log_processing_rules:
    - type: include_at_match
      name: include_datadoghq_users
      pattern: "abc\
|123\
|\\w+@datadoghq.com"
```

{{% /tab %}}
{{% tab "Docker" %}}

En un entorno de Docker, utiliza la etiqueta `com.datadoghq.ad.logs` en el contenedor que envía los logs que quieres filtrar, para especificar el parámetro`log_processing_rules`. Por ejemplo:

```yaml
 labels:
    com.datadoghq.ad.logs: >-
      [{
        "source": "java",
        "service": "cardpayment",
        "log_processing_rules": [{
          "type": "include_at_match",
          "name": "include_datadoghq_users",
          "pattern" : "\\w+@datadoghq.com"
        }]
      }]
```

**Nota**: Utiliza secuencias de escape en los caracteres de expresión regular de tus patrones cuando uses etiquetas. Por ejemplo, `\d` pasaría a ser `\\d`, `\w` pasaría a ser `\\w`.

**Nota**: El valor de la etiqueta debe seguir la sintaxis JSON, lo que significa que no debes incluir comas finales ni comentarios.

{{% /tab %}}
{{% tab "Kubernetes" %}}

En un entorno de Kubernetes, utiliza la anotación de pod `ad.datadoghq.com` en tu pod para definir el parámetro `log_processing_rules`. Por ejemplo:

```yaml
apiVersion: apps/v1
kind: ReplicaSet
metadata:
  name: cardpayment
spec:
  selector:
    matchLabels:
      app: cardpayment
  template:
    metadata:
      annotations:
        ad.datadoghq.com/<CONTAINER_IDENTIFIER>.logs: >-
          [{
            "source": "java",
            "service": "cardpayment",
            "log_processing_rules": [{
              "type": "include_at_match",
              "name": "include_datadoghq_users",
              "pattern" : "\\w+@datadoghq.com"
            }]
          }]
      labels:
        app: cardpayment
      name: cardpayment
    spec:
      containers:
        - name: '<CONTAINER_IDENTIFIER>'
          image: cardpayment:latest
```

**Nota**: Utiliza secuencias de escape en los caracteres de expresión regular de tus patrones cuando uses anotaciones de pod. Por ejemplo, `\d` pasaría a ser `\\d`, `\w` pasaría a ser `\\w`.

**Nota**: El valor de la anotación debe seguir la sintaxis JSON, lo que significa que no debes incluir comas finales ni comentarios.

{{% /tab %}}
{{< /tabs >}}

## Limpia los datos confidenciales de tus logs

Si tus logs contienen información confidencial que es necesario ocultar, configura el Datadog Agent para limpiar secuencias confidenciales y utiliza el parámetro `log_processing_rules` en tu archivo de configuración con el tipo `mask_sequences`.

Esto reemplazará todos los grupos coincidentes con el valor del parámetro `replace_placeholder`.

Por ejemplo, para ocultar los números de tarjetas de crédito:

{{< tabs >}}
{{% tab "Archivo de configuración" %}}

```yaml
logs:
 - type: file
   path: /my/test/file.log
   service: cardpayment
   source: java
   log_processing_rules:
      - type: mask_sequences
        name: mask_credit_cards
        replace_placeholder: "[masked_credit_card]"
        ##One pattern that contains capture groups
        pattern: (?:4[0-9]{12}(?:[0-9]{3})?|[25][1-7][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})
```

{{% /tab %}}
{{% tab "Docker" %}}

En un entorno de Docker, utiliza la etiqueta `com.datadoghq.ad.logs` en tu contenedor para especificar el parámetro `log_processing_rules`. Por ejemplo:

```yaml
 labels:
    com.datadoghq.ad.logs: >-
      [{
        "source": "java",
        "service": "cardpayment",
        "log_processing_rules": [{
          "type": "mask_sequences",
          "name": "mask_credit_cards",
          "replace_placeholder": "[masked_credit_card]",
          "pattern" : "(?:4[0-9]{12}(?:[0-9]{3})?|[25][1-7][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\\d{3})\\d{11})"
        }]
      }]
```

**Nota**: Utiliza secuencias de escape en los caracteres de expresión regular de tus patrones cuando uses etiquetas. Por ejemplo, `\d` pasaría a ser `\\d`, `\w` pasaría a ser `\\w`.

**Nota**: El valor de la etiqueta debe seguir la sintaxis JSON, lo que significa que no debes incluir comas finales ni comentarios.

{{% /tab %}}
{{% tab "Kubernetes" %}}

En un entorno de Kubernetes, utiliza la anotación de pod `ad.datadoghq.com` en tu pod para definir el parámetro `log_processing_rules`. Por ejemplo:

```yaml
apiVersion: apps/v1
kind: ReplicaSet
metadata:
  name: cardpayment
spec:
  selector:
    matchLabels:
      app: cardpayment
  template:
    metadata:
      annotations:
        ad.datadoghq.com/<CONTAINER_IDENTIFIER>.logs: >-
          [{
            "source": "java",
            "service": "cardpayment",
            "log_processing_rules": [{
              "type": "mask_sequences",
              "name": "mask_credit_cards",
              "replace_placeholder": "[masked_credit_card]",
              "pattern" : "(?:4[0-9]{12}(?:[0-9]{3})?|[25][1-7][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\\d{3})\\d{11})"
            }]
          }]
      labels:
        app: cardpayment
      name: cardpayment
    spec:
      containers:
        - name: '<CONTAINER_IDENTIFIER>'
          image: cardpayment:latest
```

**Nota**: Utiliza secuencias de escape en los caracteres de expresión regular de tus patrones cuando uses anotaciones de pod. Por ejemplo, `\d` pasaría a ser `\\d`, `\w` pasaría a ser `\\w`.

**Nota**: El valor de la anotación debe seguir la sintaxis JSON, lo que significa que no debes incluir comas finales ni comentarios.

{{% /tab %}}
{{< /tabs >}}

A partir de la versión 7.17 del Agent, la cadena `replace_placeholder` puede ampliar las referencias para capturar grupos como `$1`, `$2`, etc. Si quieres que una cadena vaya después del grupo de captura sin espacio de separación, utiliza el formato `${<GROUP_NUMBER>}`.

Por ejemplo, para limpiar información de usuario del log`User email: foo.bar@example.com`, utiliza:

* `pattern: "(User email: )[^@]*@(.*)"`
* `replace_placeholder: "$1 masked_user@${2}"`

Así, se enviará el siguiente log a Datadog: `User email: masked_user@example.com`

## Agregación multilínea

Si tus logs no se envían en JSON y quieres agregar varias líneas en una sola entrada, configura el Datadog Agent para que detecte un log nuevo mediante un patrón de expresión regular específico en lugar de tener un log por línea. Utiliza el tipo `multi_line` en el parámetro `log_processing_rules` para agregar todas las líneas en una sola entrada hasta que se vuelva a detectar el patrón dado.

Por ejemplo, cada línea de log de Java empieza con una marca de tiempo en formato `yyyy-dd-mm`. Estas líneas incluyen un stack trace que puede enviarse como dos logs:

```text
2018-01-03T09:24:24.983Z UTC Exception in thread "main" java.lang.NullPointerException
        at com.example.myproject.Book.getTitle(Book.java:16)
        at com.example.myproject.Author.getBookTitles(Author.java:25)
        at com.example.myproject.Bootstrap.main(Bootstrap.java:14)
2018-01-03T09:26:24.365Z UTC starting upload of /my/file.gz
```

{{< tabs >}}
{{% tab "Archivo de configuración" %}}

Para enviar los logs del ejemplo anterior con un archivo de configuración, utiliza `log_processing_rules` de la siguiente manera:

```yaml
logs:
 - type: file
   path: /var/log/pg_log.log
   service: database
   source: postgresql
   log_processing_rules:
      - type: multi_line
        name: new_log_start_with_date
        pattern: \d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])
```

{{% /tab %}}
{{% tab "Docker" %}}

En un entorno de Docker, utiliza la etiqueta `com.datadoghq.ad.logs` en tu contenedor para especificar el parámetro `log_processing_rules`. Por ejemplo:

```yaml
 labels:
    com.datadoghq.ad.logs: >-
      [{
        "source": "postgresql",
        "service": "database",
        "log_processing_rules": [{
          "type": "multi_line",
          "name": "log_start_with_date",
          "pattern" : "\\d{4}-(0?[1-9]|1[012])-(0?[1-9]|[12][0-9]|3[01])"
        }]
      }]
```

{{% /tab %}}
{{% tab "Kubernetes" %}}

En un entorno de Kubernetes, utiliza la anotación de pod `ad.datadoghq.com` en tu pod para definir el parámetro `log_processing_rules`. Por ejemplo:

```yaml
apiVersion: apps/v1
kind: ReplicaSet
metadata:
  name: postgres
spec:
  selector:
    matchLabels:
      app: database
  template:
    metadata:
      annotations:
        ad.datadoghq.com/<CONTAINER_IDENTIFIER>.logs: >-
          [{
            "source": "postgresql",
            "service": "database",
            "log_processing_rules": [{
              "type": "multi_line",
              "name": "log_start_with_date",
              "pattern" : "\\d{4}-(0?[1-9]|1[012])-(0?[1-9]|[12][0-9]|3[01])"
            }]
          }]
      labels:
        app: database
      name: postgres
    spec:
      containers:
        - name: '<CONTAINER_IDENTIFIER>'
          image: postgres:latest
```

**Nota**: Utiliza secuencias de escape en los caracteres de expresión regular de tus patrones cuando realices una agregación de varias líneas con anotaciones de pod. Por ejemplo, `\d` pasaría a ser `\\d`, `\w` pasaría a ser `\\w`.

**Nota**: El valor de la anotación debe seguir la sintaxis JSON, lo que significa que no debes incluir comas finales ni comentarios.

{{% /tab %}}
{{< /tabs >}}

<div class="alert alert-warning"><strong>¡Importante!</strong> Los patrones de expresión regular de los logs multilínea deben comenzar al <em>principio</em> de un log. No puede haber coincidencias de patrones a mitad de línea. <em>Un patrón que nunca obtiene coincidencias podría provocar la pérdida de líneas de logs.</em></div>

Más ejemplos:

| **Cadena sin formato**           | **Patrón**                                       |
|--------------------------|---------------------------------------------------|
| 14:20:15                 | `\d{2}:\d{2}:\d{2}`                               |
| 11/10/2014               | `\d{2}\/\d{2}\/\d{4}`                             |
| Jueves, 16 de junio de 2016 08:29:03 | `\w{3}\s+\w{3}\s+\d{2}\s\d{2}:\d{2}:\d{2}\s\d{4}` |
| 20180228                 | `\d{8}`                                           |
| 2020-10-27 05:10:49.657  | `\d{4}-\d{2}-\d{2}\s\d{2}:\d{2}:\d{2}\.\d{3}`     |
| {"date": "2018-01-02"    | `\{"date": "\d{4}-\d{2}-\d{2}`                    |

### Agregación multilínea automática
A partir de la versión 7.37 o posterior del Agent, es posible habilitar `auto_multi_line_detection` para que el Agent pueda detectar [patrones de varias líneas habituales][3] de manera automática. 

Activa `auto_multi_line_detection` de forma general en el archivo `datadog.yaml`:

```yaml
logs_config:
  auto_multi_line_detection: true
```

Para los despliegues contenedorizados, puedes activar `auto_multi_line_detection` con la variable de entorno`DD_LOGS_CONFIG_AUTO_MULTI_LINE_DETECTION=true`.

También se puede activar o desactivar este parámetro (anulando la configuración general) en la configuración de cada log:

{{< tabs >}}
{{% tab "Archivo de configuración" %}}

```yaml
logs:
  - type: file
    path: /my/test/file.log
    service: testApp
    source: java
    auto_multi_line_detection: true
```

La detección de varias líneas automática utiliza una lista de expresiones regulares habituales para intentar buscar coincidencias de logs. Si no es suficiente con la lista integrada, puedes añadir patrones personalizados en el archivo `datadog.yaml`:

```yaml
logs_config:
  auto_multi_line_detection: true
  auto_multi_line_extra_patterns:
   - \d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])
   - '[A-Za-z_]+ \d+, \d+ \d+:\d+:\d+ (AM|PM)'
```

{{% /tab %}}
{{% tab "Docker" %}}

En un entorno de Docker, utiliza la etiqueta `com.datadoghq.ad.logs` en tu contenedor para especificar el parámetro `log_processing_rules`. Por ejemplo:

```yaml
 labels:
    com.datadoghq.ad.logs: >-
      [{
        "source": "java",
        "service": "testApp",
        "auto_multi_line_detection": true
      }]
```

{{% /tab %}}
{{% tab "Kubernetes" %}}

```yaml
apiVersion: apps/v1
kind: ReplicaSet
metadata:
  name: testApp
spec:
  selector:
    matchLabels:
      app: testApp
  template:
    metadata:
      annotations:
        ad.datadoghq.com/<CONTAINER_IDENTIFIER>.logs: >-
          [{
            "source": "java",
            "service": "testApp",
            "auto_multi_line_detection": true
          }]
      labels:
        app: testApp
      name: testApp
    spec:
      containers:
        - name: '<CONTAINER_IDENTIFIER>'
          image: testApp:latest
```

{{% /tab %}}
{{< /tabs >}}

Si se activa esta función y se abre un nuevo archivo de logs, el Agent intenta detectar un patrón. Durante este proceso, los logs se envían en forma de líneas únicas. Una vez alcanzado el umbral de detección, todos los futuros logs de ese origen se agregan con el patrón detectado, o bien como líneas únicas en caso de que no se encuentre ningún patrón. Como máximo, la detección tarda 30 segundos o lo que se tarde en detectar los primeros 500 logs (lo que ocurra antes).

**Nota**: Si puedes controlar el patrón de nombres del log rotado, asegúrate de que el archivo rotado sustituya al archivo activo anteriormente con ese mismo nombre. El Agent reutiliza un patrón detectado anteriormente en el archivo recién rotado para evitar tener que volver a ejecutar la detección.

La detección de varias líneas automática detecta los logs que empiezan y concuerdan con los siguientes formatos de fecha/hora: RFC3339, ANSIC, el formato de fecha Unix, el formato de fecha Ruby, RFC822, RFC822Z, RFC850, RFC1123, RFC1123Z, RFC3339Nano y el formato de fecha SimpleFormatter para el registro de logs de Java predeterminado.

## Reglas de procesamiento de logs habitualmente utilizadas

Consulta las [preguntas frecuentes sobre las reglas de procesamiento de logs habitualmente utilizadas][4] para ver una lista de ejemplos.

## Supervisar directorios mediante comodines

Si tus archivos de log se han etiquetado por fecha o si todos ellos se encuentran almacenados en el mismo directorio, configura el Datadog Agent para monitorizarlos a todos y detectar de manera automática los nuevos mediante comodines en el atributo `path`. Si quieres excluir algunos archivos coincidentes con la ruta `path` seleccionada, inclúyelos en el atributo `exclude_paths`.

* Al utilizar `path: /var/log/myapp/*.log`:
  * Habrá coincidencia con todos los archivos `.log` contenidos en el directorio `/var/log/myapp/`.
  * No habrá coincidencia con `/var/log/myapp/myapp.conf`.

* Al utilizar `path: /var/log/myapp/*/*.log`:
  * Habrá coincidencia con `/var/log/myapp/log/myfile.log`.
  * Habrá coincidencia con `/var/log/myapp/errorLog/myerrorfile.log`.
  * No habrá coincidencia con `/var/log/myapp/mylogfile.log`.

Ejemplo de configuración para Linux:

```yaml
logs:
  - type: file
    path: /var/log/myapp/*.log
    exclude_paths:
      - /var/log/myapp/debug.log
      - /var/log/myapp/trace.log
    service: mywebapp
    source: go
```

En el ejemplo anterior, hay coincidencia con `/var/log/myapp/log/myfile.log` y se excluyen `/var/log/myapp/log/debug.log` y `/var/log/myapp/log/trace.log`.

Ejemplo de configuración para Windows:

```yaml
logs:
  - type: file
    path: C:\\MyApp\\*.log
    exclude_paths:
      - C:\\MyApp\\MyLog.*.log
    service: mywebapp
    source: csharp
```

En el ejemplo anterior, hay coincidencia con `C:\\MyApp\\MyLog.log` y se excluyen `C:\\MyApp\\MyLog.20230101.log` y `C:\\MyApp\\MyLog.20230102.log`.

**Nota**: El Agent requiere permisos de lectura y ejecución en un directorio para mostrar la lista de todos los archivos disponibles que contiene.
**Nota2**: Los valores path y exclude_paths distinguen entre mayúsculas y minúsculas.

## Supervisa primero los últimos archivos modificados

A la hora de priorizar qué archivos supervisar, el Datadog Agent ordena los nombres de archivo de la ruta de directorio por orden lexicográfico inverso. Para ordenar los archivos por hora de modificación, define la opción de configuración`logs_config.file_wildcard_selection_mode` con el valor `by_modification_time`.

Esta opción resulta útil cuando el total de coincidencias de archivos de logs es superior a `logs_config.open_files_limit`. Al utilizar `by_modification_time`, se garantiza que los últimos archivos actualizados se supervisan primero en la ruta de directorio definida.

Para restablecer el comportamiento predeterminado, define la opción de configuración `logs_config.file_wildcard_selection_mode` con el valor `by_name`.

Para usar esta función, se necesita la versión 7.40.0 o posterior del Agent.

## Codificaciones del archivo de logs

De forma predeterminada, el Datadog Agent asume que los logs utilizan la codificación UTF-8. Si los logs de tu aplicación utilizan otra codificación, define el parámetro `encoding` con la configuración de logs.

En la siguiente lista se indican los valores de codificación compatibles. Si indicas un valor no compatible, el Agent lo ignorará y leerá el archivo como UTF-8.
 * `utf-16-le`: UTF-16 little-endian (Datadog Agent **v6.23/v7.23**)
 * `utf-16-be`: UTF-16 big-endian (Datadog Agent **v6.23/v7.23**)
 * `shift-jis`: Shift-JIS (Datadog Agent **v6.34/v7.34**)

Ejemplo de configuración:

```yaml
logs:
  - type: file
    path: /test/log/hello-world.log
    tags: key:value
    service: utf-16-logs
    source: mysql
    encoding: utf-16-be
```

**Nota**: El parámetro `encoding` solo resulta aplicable cuando el parámetro `type` está establecido como `file`.

## Reglas generales de procesamiento

A partir de la versión 6.10 o superior del Datadog Agent, es posible definir las reglas de procesamiento `exclude_at_match`, `include_at_match` y `mask_sequences` de manera general en el [archivo de configuración principal][5] del Agent o mediante una variable de entorno:

{{< tabs >}}
{{% tab "Archivos de configuración" %}}

En el archivo `datadog.yaml`:

```yaml
logs_config:
  processing_rules:
    - type: exclude_at_match
      name: exclude_healthcheck
      pattern: healthcheck
    - type: mask_sequences
      name: mask_user_email
      pattern: \w+@datadoghq.com
      replace_placeholder: "MASKED_EMAIL"
```

{{% /tab %}}
{{% tab "Variable de entorno" %}}

Utiliza la variable de entorno `DD_LOGS_CONFIG_PROCESSING_RULES` para configurar reglas de procesamiento generales. Por ejemplo:

```shell
DD_LOGS_CONFIG_PROCESSING_RULES='[{"type": "mask_sequences", "name": "mask_user_email", "replace_placeholder": "MASKED_EMAIL", "pattern" : "\\w+@datadoghq.com"}]'
```

{{% /tab %}}
{{% tab "Helm" %}}

Utiliza el parámetro `env` en el gráfico de Helm para definir la variable de entorno `DD_LOGS_CONFIG_PROCESSING_RULES` y configurar las reglas de procesamiento generales. Por ejemplo:

```yaml
env:
  - name: DD_LOGS_CONFIG_PROCESSING_RULES
    value: '[{"type": "mask_sequences", "name": "mask_user_email", "replace_placeholder": "MASKED_EMAIL", "pattern" : "\\w+@datadoghq.com"}]'
```

{{% /tab %}}
{{< /tabs >}}
Todos los logs recopilados por el Datadog Agent se ven afectados por las reglas de procesamiento generales.

**Nota**: El Datadog Agent no inicia el Collector de logs si existe un problema de formato en las reglas de procesamiento generales. Ejecuta el [subcomando de estado][6] del Agent para solucionar los problemas que encuentres.

## Lectura adicional

{{< partial name="whats-next/whats-next.html" >}}

<br>
*Logging without Limits es una marca registrada de Datadog, Inc.

[1]: /es/agent/logs/
[2]: https://golang.org/pkg/regexp/syntax/
[3]: https://github.com/DataDog/datadog-agent/blob/a27c16c05da0cf7b09d5a5075ca568fdae1b4ee0/pkg/logs/internal/decoder/auto_multiline_handler.go#L187
[4]: /es/agent/faq/commonly-used-log-processing-rules
[5]: /es/agent/configuration/agent-configuration-files/#agent-main-configuration-file
[6]: /es/agent/configuration/agent-commands/#agent-information