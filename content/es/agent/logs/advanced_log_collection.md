---
algolia:
  tags:
  - advanced log filter
description: Utiliza el Datadog Agent para recopilar tus logs y enviarlos a Datadog
further_reading:
- link: /logs/guide/getting-started-lwl/
  tag: Documentación
  text: Empezando con Logging without LimitsTM
- link: /logs/guide/how-to-set-up-only-logs/
  tag: Documentación
  text: Utiliza el Datadog Agent solo para la recopilación de logs
- link: /logs/log_configuration/processors
  tag: Documentación
  text: Descubre cómo procesar tus logs
- link: /logs/log_configuration/parsing
  tag: Documentación
  text: Obtener más información sobre el análisis
- link: /logs/live_tail/
  tag: Documentación
  text: Función de rastreo en directo de Datadog
- link: /logs/explorer/
  tag: Documentación
  text: Aprender a explorar tus logs
- link: /glossary/#tail
  tag: Glosario
  text: Entrada del glosario para "rastreo"
title: Configuraciones avanzadas de recopilación de logs
---

Después de establecer la [recopilación de logs][1], puedes personalizar la configuración de la recopilación:
- [Filtrar logs](#filter-logs)
  - [Excluir en la coincidencia](#exclude-at-match)
  - [Incluir en la coincidencia](#include-at-match)
  - [Excluir truncado](#excluir-truncado)
- [Limpia los datos confidenciales de tus logs](#scrub-sensitive-data-from-your-logs)
- [Agregación multilínea](#manually-aggregate-multi-line-logs)
- [Agregar automáticamente logs multilínea](#automatically-aggregate-multi-line-logs)
- [Reglas de procesamiento de logs de uso común](#commonly-used-log-processing-rules)
- [Rastrear directorios utilizando comodines](#tail-directories-using-wildcards)
  - [Priorizar los archivos supervisados por tiempo de modificación](#prioritize-tailed-files-by-modification-time)
- [Cifrado de archivos de log](#log-file-encodings)
- [Reglas de procesamiento global](#global-processing-rules)
- [Referencias adicionales](#further-reading)

Para aplicar una regla de procesamiento a todos los logs que recopila el Datadog Agent, consulta la sección [Reglas de procesamiento generales](#global-processing-rules).

**Notas**:
- Si configuras reglas de procesamiento multilínea, se aplicarán secuencialmente, de forma que cada una se aplicará al resultado de la anterior.
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

<div class="alert alert-info">
Para obtener más información sobre la configuración del Agent, consulta <a href="/containers/guide/container-discovery-management/?tab=datadogoperator#agent-configuration">Gestión de la detección de contenedores</a>.
</div>

En un entorno de Docker, utiliza la etiqueta (label) `com.datadoghq.ad.logs` en el **contenedor que envíe los logs que quieres filtrar** para especificar el parámetro `log_processing_rules`. Por ejemplo:

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

**Nota**:
- Escapa los caracteres de expresión regular en tus patrones cuando utilices etiquetas. Por ejemplo, `\d` se convierte en `\\d`, `\w` se convierte en `\\w`.
- El valor de la etiqueta debe seguir la sintaxis de JSON, lo que significa que no debes incluir comas finales ni comentarios.

{{% /tab %}}
{{% tab "Kubernetes" %}}

<div class="alert alert-info">
Para obtener más información sobre la configuración del Agent, consulta <a href="/containers/guide/container-discovery-management/?tab=datadogoperator#agent-configuration">Gestión de la detección de contenedores</a>.
</div>

Para configurar Autodiscovery para la recopilación de logs de contenedor de un contenedor dado (con el nombre `CONTAINER_NAME`) dentro de tu pod, añade las siguientes anotaciones a las `log_processing_rules` de tu pod:

```yaml
apiVersion: apps/v1
metadata:
  name: cardpayment
spec:
  selector:
    matchLabels:
      app: cardpayment
  template:
    metadata:
      annotations:
        ad.datadoghq.com/<CONTAINER_NAME>.logs: >-
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
        - name: '<CONTAINER_NAME>'
          image: cardpayment:latest
```

**Nota**:
- Escapa los caracteres de expresión regular de tus patrones cuando utilices anotaciones de pod. Por ejemplo, `\d` se convierte en `\\d`, `\w` se convierte en `\\w`.
- El valor de la anotación debe seguir la sintaxis de JSON, lo que significa que no debes incluir comas finales ni comentarios.

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

**Nota**:
- Escapa los caracteres de expresión regular en tus patrones cuando utilices etiquetas. Por ejemplo, `\d` se convierte en `\\d`, `\w` se convierte en `\\w`.
- El valor de la etiqueta debe seguir la sintaxis de JSON, lo que significa que no debes incluir comas finales ni comentarios.

{{% /tab %}}
{{% tab "Kubernetes" %}}

En un entorno de Kubernetes, utiliza la anotación de pod `ad.datadoghq.com` en tu pod para definir el parámetro `log_processing_rules`. Por ejemplo:

```yaml
apiVersion: apps/v1
metadata:
  name: cardpayment
spec:
  selector:
    matchLabels:
      app: cardpayment
  template:
    metadata:
      annotations:
        ad.datadoghq.com/<CONTAINER_NAME>.logs: >-
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
        - name: '<CONTAINER_NAME>'
          image: cardpayment:latest
```

**Nota**:
- Escapa los caracteres de expresión regular de tus patrones cuando utilices anotaciones de pod. Por ejemplo, `\d` se convierte en `\\d`, `\w` se convierte en `\\w`.
- El valor de la anotación debe seguir la sintaxis de JSON, lo que significa que no debes incluir comas finales ni comentarios.

{{% /tab %}}
{{< /tabs >}}

### Excluir truncado

| Parámetro           | Descripción                                                        |
|---------------------|--------------------------------------------------------------------|
| `exclude_truncated` | Cuando está presente, excluye los logs truncados y no los envía a Datadog. La regla `exclude_truncated` está disponible a partir del Agent v7.69. |

Por ejemplo, para **filtrar** logs truncados:

{{< tabs >}}
{{% tab "Archivo de configuración" %}}

```yaml
logs:
  - type: file
    path: /my/test/file.log
    service: cardpayment
    source: java
    log_processing_rules:
    - type: exclude_truncated
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
          "type": "exclude_truncated"
        }]
      }]
```

**Nota**: El valor de la etiqueta debe seguir la sintaxis JSON, lo que significa que no debes incluir comas finales ni comentarios.

{{% /tab %}}
{{% tab "Kubernetes" %}}

En un entorno de Kubernetes, utiliza la anotación de pod `ad.datadoghq.com` en tu pod para definir el parámetro `log_processing_rules`. Por ejemplo:

```yaml
apiVersion: apps/v1
metadata:
  name: cardpayment
spec:
  selector:
    matchLabels:
      app: cardpayment
  template:
    metadata:
      annotations:
        ad.datadoghq.com/<CONTAINER_NAME>.logs: >-
          [{
            "source": "java",
            "service": "cardpayment",
            "log_processing_rules": [{
              "type": "exclude_truncated"
            }]
          }]
      labels:
        app: cardpayment
      name: cardpayment
    spec:
      containers:
        - name: '<CONTAINER_NAME>'
          image: cardpayment:latest
```

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

**Nota**:
- Escapa los caracteres de expresión regular en tus patrones cuando utilices etiquetas. Por ejemplo, `\d` se convierte en `\\d`, `\w` se convierte en `\\w`.
- El valor de la etiqueta debe seguir la sintaxis de JSON, lo que significa que no debes incluir comas finales ni comentarios.

{{% /tab %}}
{{% tab "Kubernetes" %}}

En un entorno de Kubernetes, utiliza la anotación de pod `ad.datadoghq.com` en tu pod para definir el parámetro `log_processing_rules`. Por ejemplo:

```yaml
apiVersion: apps/v1
metadata:
  name: cardpayment
spec:
  selector:
    matchLabels:
      app: cardpayment
  template:
    metadata:
      annotations:
        ad.datadoghq.com/<CONTAINER_NAME>.logs: >-
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
        - name: '<CONTAINER_NAME>'
          image: cardpayment:latest
```

**Nota**:
- Escapa los caracteres de expresión regular de tus patrones cuando utilices anotaciones de pod. Por ejemplo, `\d` se convierte en `\\d`, `\w` se convierte en `\\w`.
- El valor de la anotación debe seguir la sintaxis de JSON, lo que significa que no debes incluir comas finales ni comentarios.

{{% /tab %}}
{{< /tabs >}}

A partir de la versión 7.17 o posterior del Agent, la cadena `replace_placeholder` puede ampliar las referencias para capturar grupos como `$1`, `$2`, etc. Si quieres que una cadena vaya después del grupo de captura sin espacio de separación, utiliza el formato `${<GROUP_NUMBER>}`.

Por ejemplo, para limpiar información de usuario del log`User email: foo.bar@example.com`, utiliza:

* `pattern: "(User email: )[^@]*@(.*)"`
* `replace_placeholder: "$1 masked_user@${2}"`

Así, se enviará el siguiente log a Datadog: `User email: masked_user@example.com`

## Agregar automáticamente logs multilínea

La detección multilínea automática es útil cuando se tienen muchas fuentes de logs con formatos complejos o cuando no se dispone de tiempo para configurar cada fuente individualmente. Esta función detecta y agrega automáticamente los logs multilínea sin necesidad de escribir patrones de expresión regular (regex) personalizados.

Consulta la documentación [Detección y agregación multilínea automática][7].

Para la compatibilidad legacy de la función, consulta la documentación [Detección y agregación multilínea automática (Legacy)][8].

## Agregar manualmente logs multilínea

Las reglas multilínea manuales te ofrecen un control preciso de la agregación de logs cuando conoces tus formatos de logs. Esta estrategia es ideal para garantizar un procesamiento coherente de los logs con patrones regex personalizados adaptados a tu estructura de log específica.

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
metadata:
  name: postgres
spec:
  selector:
    matchLabels:
      app: database
  template:
    metadata:
      annotations:
        ad.datadoghq.com/<CONTAINER_NAME>.logs: >-
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
        - name: '<CONTAINER_NAME>'
          image: postgres:latest
```

**Nota**:
- Escapa los caracteres de expresión regular de tus patrones cuando realices agregaciones multilínea con anotaciones de pod. Por ejemplo, `\d` se convierte en `\\d`, `\w` se convierte en `\\w`.
- El valor de la anotación debe seguir la sintaxis de JSON, lo que significa que no debes incluir comas finales ni comentarios.

{{% /tab %}}
{{< /tabs >}}

<div class="alert alert-danger"><strong>¡Importante!</strong> Los patrones de expresión regular para logs multilíneas deben comenzar al <em>principio</em> de un log. Los patrones no pueden coincidir a mitad de línea. <em>Un patrón que nunca coincida puede causar pérdidas de líneas de logs </em>. <br><br> La recopilación de logs funciona con una precisión de hasta milisegundos. Los logs con mayor precisión no se envían aunque coincidan con el patrón.</div>

Más ejemplos:

| **Cadena sin formato**           | **Patrón**                                       |
|--------------------------|---------------------------------------------------|
| 14:20:15                 | `\d{2}:\d{2}:\d{2}`                               |
| 10/11/2014               | `\d{2}\/\d{2}\/\d{4}`                             |
| Jueves 16 de junio de 2016 08:29:03 | `\w{3}\s+\w{3}\s+\d{2}\s\d{2}:\d{2}:\d{2}\s\d{4}` |
| 20180228                 | `\d{8}`                                           |
| 2020-10-27 05:10:49.657  | `\d{4}-\d{2}-\d{2}\s\d{2}:\d{2}:\d{2}\.\d{3}`     |
| {"date": "2018-01-02"    | `\{"date": "\d{4}-\d{2}-\d{2}`                    |


## Reglas de procesamiento de logs habitualmente utilizadas

Consulta las [preguntas frecuentes sobre las reglas de procesamiento de logs habitualmente utilizadas][4] para ver una lista de ejemplos.

## Rastrear directorios utilizando comodines

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

**Nota**:
- El Agent requiere permisos de lectura y ejecución en un directorio para enumerar todos los archivos disponibles en él.
- Los valores de trayectoria y excluir_trayectorias son sensibles al case (incidencia).

### Priorizar los archivos supervisados por tiempo de modificación

Para usar esta función, se necesita la versión 7.40.0 o posterior del Agent.

El Agent limita el número de archivos que puede supervisar simultáneamente con el parámetro `logs_config.open_files_limit`. Si el número de archivos que coinciden con las sources (fuentes) de logs configuradas (como comodines) está dentro del límite, el Agent los supervisa a todos. Si coinciden más archivos de los que permite el límite, el Agent prioriza ordenando los nombres de archivo en orden lexicográfico inverso, de modo que los archivos con marcas de tiempo más recientes o números más altos se supervisen primero.

Si los nombres de los archivos no siguen patrones secuenciales o de marca de tiempo, el orden predeterminado puede no ser el ideal. Para priorizar por tiempo de modificación, configura `logs_config.file_wildcard_selection_mode` en `by_modification_time`. Con esta configuración, el Agent ordena primero los archivos modificados más recientemente.

**Ejemplo**:
- `open_files_limit` = 500
- Tu patrón de comodín coincide con 700 archivos.
- Con `by_name`: el Agent supervisa los 500 archivos con los nombres más altos en orden lexicográfico inverso (por ejemplo, app.log.700 hasta app.log.201).
- Con `by_modification_time`: el Agent supervisa los 500 archivos en los que se ha escrito más recientemente, independientemente de sus nombres.

```yaml
logs_enabled: true
logs_config:
 [...]
  open_files_limit: 500

  ## @param file_wildcard_selection_mode - string - optional - default: by_name
  ## The strategy used to prioritize wildcard matches if they exceed open_files_limit.
  ## Choices:
  ##   - by_name: files are sorted in reverse lexicographic order (default).
  ##   - by_modification_time: files are sorted by modification time, with the most recent first.
  ## WARNING: by_modification_time is less performant and increases disk I/O.
  file_wildcard_selection_mode: by_modification_time
```

Para definir el comportamiento predeterminado, elimina la entrada `logs_config.file_wildcard_selection_mode` o defínela explícitamente como `by_name`.

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

A partir de la versión 6.10 o posterior del Datadog Agent, es posible definir las reglas de procesamiento `exclude_at_match`, `include_at_match` y `mask_sequences` de manera general en el [archivo de configuración principal][5] del Agent o mediante una variable de entorno. La regla `exclude_truncated` está disponible a partir de la versión 7.69 del Agent.

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
{{% tab "Datadog Operator" %}}

Utiliza el parámetro `spec.override.[key].env` en tu manifiesto del Datadog Operator para definir la variable de entorno `DD_LOGS_CONFIG_PROCESSING_RULES` y configurar reglas de procesamiento globales, donde `[key]` es `nodeAgent`, `clusterAgent` o `clusterChecksRunner`. Por ejemplo:

```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  override:
    nodeAgent:
      env:
        - name: DD_LOGS_CONFIG_PROCESSING_RULES
          value: '[{"type": "mask_sequences", "name": "mask_user_email", "replace_placeholder": "MASKED_EMAIL", "pattern" : "\\w+@datadoghq.com"}]'
```

{{% /tab %}}
{{% tab "Helm" %}}

Utiliza el parámetro `datadog.env` en el Helm chart para definir la variable de entorno`DD_LOGS_CONFIG_PROCESSING_RULES` para configurar reglas de procesamiento globales Por ejemplo:

```yaml
datadog:
  env:
    - name: DD_LOGS_CONFIG_PROCESSING_RULES
      value: '[{"type": "mask_sequences", "name": "mask_user_email", "replace_placeholder": "MASKED_EMAIL", "pattern" : "\\w+@datadoghq.com"}]'
```

{{% /tab %}}
{{< /tabs >}}
Todos los logs recopilados por el Datadog Agent se ven afectados por las reglas de procesamiento generales.

**Nota**: El Datadog Agent no inicia el Collector de logs si existe un problema de formato en las reglas de procesamiento generales. Ejecuta el [subcomando de estado][6] del Agent para solucionar los problemas que encuentres.

## FAQ sobre la agregación de logs multilínea

**1. ¿Cuándo debo utilizar reglas multilínea manuales en lugar de la detección multilínea automática?**

Si conoces el formato de tus logs, deberías utilizar reglas multilínea manuales para un control preciso.
Si envías muchos logs multilínea y no estás seguro de su formato o no tienes medios para configurar todas las sources (fuentes) individualmente, debes utilizar la detección multilínea automática.

**2. ¿Qué ocurre cuando un patrón multilínea no coincide con ningún log?**

Todas las líneas de logs que no son JSON se procesan individualmente como entradas de logs separadas.
Todas las líneas de logs con formato JSON se tratan como una única línea de logs. Solo se admite el primer formato JSON válido y el resto se descartan.

**3. ¿Qué ocurre cuando hay reglas globales y reglas específicas de una integración?
Las reglas específicas de la integración anulan por completo las reglas globales de la integración en cuestión.

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

<br>
*Logging without Limits es una marca registrada de Datadog, Inc.

[1]: /es/agent/logs/
[2]: https://golang.org/pkg/regexp/syntax/
[3]: https://github.com/DataDog/datadog-agent/blob/a27c16c05da0cf7b09d5a5075ca568fdae1b4ee0/pkg/logs/internal/decoder/auto_multiline_handler.go#L187
[4]: /es/agent/faq/commonly-used-log-processing-rules
[5]: /es/agent/configuration/agent-configuration-files/#agent-main-configuration-file
[6]: /es/agent/configuration/agent-commands/#agent-information
[7]: /es/agent/logs/auto_multiline_detection
[8]: /es/agent/logs/auto_multiline_detection_legacy