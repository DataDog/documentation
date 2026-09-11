---
algolia:
  tags:
  - advanced log filter
description: Utiliza el Agente de Datadog para recopilar tus registros y enviarlos
  a Datadog
further_reading:
- link: /logs/guide/getting-started-lwl/
  tag: Documentación
  text: Comenzando con Logging without Limits™
- link: /logs/guide/how-to-set-up-only-logs/
  tag: Documentación
  text: Utiliza el Agente de Datadog solo para la recopilación de registros
- link: /logs/log_configuration/processors
  tag: Documentación
  text: Descubre cómo procesar tus registros
- link: /logs/log_configuration/parsing
  tag: Documentación
  text: Aprende más sobre el parseo
- link: /logs/live_tail/
  tag: Documentación
  text: Funcionalidad de seguimiento de las últimas líneas de Datadog
- link: /logs/explorer/
  tag: Documentación
  text: Ve cómo explorar tus registros
- link: /glossary/#tail
  tag: Glosario
  text: Entrada del glosario para "tail"
title: Configuraciones avanzadas de recopilación de registros
---
Después de configurar [la recopilación de registros][1], puedes personalizar tu configuración de recopilación:
- [Filtrar registros](#filter-logs)
  - [Excluir en coincidencia](#exclude-at-match)
  - [Incluir en coincidencia](#include-at-match)
  - [Excluir truncados](#exclude-truncated)
- [Eliminar datos sensibles de tus registros](#scrub-sensitive-data-from-your-logs)
- [Agregación de múltiples líneas](#manually-aggregate-multi-line-logs)
- [Agregar automáticamente registros de múltiples líneas](#automatically-aggregate-multi-line-logs)
- [Reglas de procesamiento de registros comúnmente utilizadas](#commonly-used-log-processing-rules)
- [Realizar seguimiento de las últimas líneas en directorios utilizando comodines](#tail-directories-using-wildcards)
  Prioriza los archivos que se están siguiendo según su tiempo de modificación.
- [Codificaciones de archivos de registro](#log-file-encodings)
- [Reglas de procesamiento globales](#global-processing-rules)
- [Lectura adicional](#further-reading)

Para aplicar una regla de procesamiento a todos los registros recopilados por un Agente de Datadog, consulta la sección [Reglas de procesamiento globales](#global-processing-rules).

**Notas**:
- Si configura múltiples reglas de procesamiento, se aplican secuencialmente y cada regla se aplica sobre el resultado de la anterior.
- Los patrones de reglas de procesamiento deben ajustarse a la [sintaxis de regexp de Golang][2].
- El parámetro `log_processing_rules` se utiliza en configuraciones de integración para personalizar su configuración de recopilación de registros. Mientras estés en la [configuración principal del Agente][5], el parámetro `processing_rules` se utiliza para definir reglas de procesamiento globales.

## Filtrar registros {#filter-logs}

Para enviar solo un subconjunto específico de registros a Datadog, utiliza el parámetro `log_processing_rules` en tu archivo de configuración con el tipo `exclude_at_match` o `include_at_match`.

### Excluir en coincidencia {#exclude-at-match}

| Parámetro          | Descripción                                                                                        |
|--------------------|----------------------------------------------------------------------------------------------------|
| `exclude_at_match` | Si el patrón especificado está contenido en el mensaje, el registro se excluye y no se envía a Datadog. |

Por ejemplo, para **filtrar** registros que contengan una dirección de correo electrónico de Datadog, utiliza lo siguiente `log_processing_rules`:

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
Para más información sobre la configuración del Agente, consulta <a href="/containers/guide/container-discovery-management/?tab=datadogoperator#agent-configuration">Gestión del Descubrimiento de Contenedores</a>.
</div>

En un entorno de Docker, use la etiqueta `com.datadoghq.ad.logs` en el **contenedor que envía los registros que desea filtrar** para especificar el `log_processing_rules`, por ejemplo:

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
- Escapa los caracteres regex en tus patrones al usar etiquetas. Por ejemplo, `\d` se convierte en `\\d`, `\w` se convierte en `\\w`.
- El valor de la etiqueta debe seguir la sintaxis JSON, lo que significa que no debes incluir comas finales ni comentarios.

{{% /tab %}}
{{% tab "Kubernetes" %}}

<div class="alert alert-info">
Para más información sobre la configuración del Agente, consulta <a href="/containers/guide/container-discovery-management/?tab=datadogoperator#agent-configuration">Gestión del Descubrimiento de Contenedores</a>.
</div>

Para configurar usando Autodiscovery para recopilar registros de un contenedor específico (con el nombre `CONTAINER_NAME`) dentro de tu pod, agrega las siguientes anotaciones a tu pod `log_processing_rules`:

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
- Escapa los caracteres regex en tus patrones al usar anotaciones de pod. Por ejemplo, `\d` se convierte en `\\d`, `\w` se convierte en `\\w`.
- El valor de la anotación debe seguir la sintaxis JSON, lo que significa que no debe incluir comas finales ni comentarios.

{{% /tab %}}
{{< /tabs >}}

### Incluir en coincidencia {#include-at-match}

| Parámetro          | Descripción                                                                       |
|--------------------|-----------------------------------------------------------------------------------|
| `include_at_match` | Solo se envían a Datadog los registros con un mensaje que incluya el patrón especificado. Si se definen múltiples `include_at_match` reglas, todos los patrones de las reglas deben coincidir para que el registro sea incluido. |


Por ejemplo, use la siguiente `log_processing_rules` configuración para **filtrar en** registros que contengan una dirección de correo electrónico de Datadog:

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

Si deseas coincidir uno o más patrones, debes definirlos en una sola expresión:

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

Si los patrones son demasiado largos para caber legiblemente en una sola línea, puedes dividirlos en múltiples líneas:

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

En un entorno de Docker, utiliza la etiqueta `com.datadoghq.ad.logs` en el contenedor que está enviando los registros que deseas filtrar, para especificar el `log_processing_rules`. Por ejemplo:

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
- Escape de caracteres regex en sus patrones al usar etiquetas. Por ejemplo, `\d` se convierte en `\\d`, `\w` se convierte en `\\w`.
- El valor de la etiqueta debe seguir la sintaxis JSON, lo que significa que no debe incluir comas finales ni comentarios.

{{% /tab %}}
{{% tab "Kubernetes" %}}

En un entorno de Kubernetes, utiliza la anotación del pod `ad.datadoghq.com` en tu pod para especificar el `log_processing_rules`. Por ejemplo:

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
- Escape de caracteres regex en sus patrones al usar anotaciones de pod. Por ejemplo, `\d` se convierte en `\\d`, `\w` se convierte en `\\w`.
- El valor de la anotación debe seguir la sintaxis JSON, lo que significa que no debe incluir comas finales ni comentarios.

{{% /tab %}}
{{< /tabs >}}

### Excluir truncados {#exclude-truncated}

| Parámetro           | Descripción                                                        |
|---------------------|--------------------------------------------------------------------|
| `exclude_truncated` | Cuando está presente, excluye registros truncados y no los envía a Datadog. La regla `exclude_truncated` está disponible a partir de la versión del Agente v7.69. |

Por ejemplo, para **filtrar** registros truncados:

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

En un entorno de Docker, utiliza la etiqueta `com.datadoghq.ad.logs` en el contenedor que está enviando los registros que deseas filtrar, para especificar el `log_processing_rules`. Por ejemplo:

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

En un entorno de Kubernetes, utiliza la anotación del pod `ad.datadoghq.com` en tu pod para especificar el `log_processing_rules`. Por ejemplo:

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

## Eliminar datos sensibles de tus registros {#scrub-sensitive-data-from-your-logs}

Si tus registros contienen información sensible que necesita ser redactada, configura el Agente de Datadog para eliminar secuencias sensibles utilizando el parámetro `log_processing_rules` en tu archivo de configuración con el tipo `mask_sequences`.

Esto reemplaza todos los grupos coincidentes con el valor del parámetro `replace_placeholder`.

Por ejemplo, para redactar números de tarjetas de crédito:

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

En un entorno de Docker, utiliza la etiqueta `com.datadoghq.ad.logs` en tu contenedor para especificar el `log_processing_rules`. Por ejemplo:

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
- Escapa los caracteres regex en tus patrones al usar etiquetas. Por ejemplo, `\d` se convierte en `\\d`, `\w` se convierte en `\\w`.
- El valor de la etiqueta debe seguir la sintaxis JSON, lo que significa que no debes incluir comas finales ni comentarios.

{{% /tab %}}
{{% tab "Kubernetes" %}}

En un entorno de Kubernetes, utiliza la anotación del pod `ad.datadoghq.com` en tu pod para especificar el `log_processing_rules`. Por ejemplo:

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
- Escapa los caracteres regex en tus patrones al usar anotaciones de pod. Por ejemplo, `\d` se convierte en `\\d`, `\w` se convierte en `\\w`.
- El valor de la anotación debe seguir la sintaxis JSON, lo que significa que no debes incluir comas finales ni comentarios.

{{% /tab %}}
{{< /tabs >}}

Con la versión del Agente 7.17+, la cadena `replace_placeholder` puede expandir referencias a grupos de captura como `$1`, `$2` y así sucesivamente. Si deseas que una cadena siga al grupo de captura sin espacio entre ellos, utiliza el formato `${<GROUP_NUMBER>}`.

Por ejemplo, para eliminar información del usuario del registro `User email: foo.bar@example.com`, utiliza:

* `pattern: "(User email: )[^@]*@(.*)"`
* `replace_placeholder: "$1 masked_user@${2}"`

Esto envía el siguiente registro a Datadog: `User email: masked_user@example.com`

## Agrega automáticamente registros de varias líneas {#automatically-aggregate-multi-line-logs}

La detección automática de varias líneas es útil cuando tienes muchas fuentes de registro con formatos complejos o cuando no tienes tiempo para configurar cada fuente individualmente. Esta función detecta y agrega automáticamente registros de varias líneas sin requerir que escribas patrones regex personalizados.

Consulta la documentación de [Detección y Agregación Automática de Varias Líneas][7].

Para soporte legado de la función, consulta la documentación de [Detección y Agregación Automática de Varias Líneas (Legado)][8].

## Agrega manualmente registros de varias líneas {#manually-aggregate-multi-line-logs}

Las reglas manuales de varias líneas te brindan un control preciso sobre la agregación de registros cuando conoces tus formatos de registro. Este enfoque es ideal para asegurar un procesamiento consistente de registros con patrones regex personalizados adaptados a tu estructura de registro específica.

Si tus registros no se envían en JSON y deseas agregar varias líneas en una sola entrada, configura el Agente de Datadog para detectar un nuevo registro utilizando un patrón regex específico en lugar de tener un registro por línea. Utiliza el tipo `multi_line` en el parámetro `log_processing_rules` para agregar todas las líneas en una sola entrada hasta que se detecte nuevamente el patrón dado.

Por ejemplo, cada línea de registro de Java comienza con una marca de tiempo en formato `yyyy-dd-mm`. Estas líneas incluyen una traza de pila que puede enviarse como dos registros:

```text
2018-01-03T09:24:24.983Z UTC Exception in thread "main" java.lang.NullPointerException
        at com.example.myproject.Book.getTitle(Book.java:16)
        at com.example.myproject.Author.getBookTitles(Author.java:25)
        at com.example.myproject.Bootstrap.main(Bootstrap.java:14)
2018-01-03T09:26:24.365Z UTC starting upload of /my/file.gz
```

{{< tabs >}}
{{% tab "Archivo de configuración" %}}

Para enviar los registros de ejemplo anteriores con un archivo de configuración, utiliza lo siguiente `log_processing_rules`:

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

En un entorno de Docker, utiliza la etiqueta `com.datadoghq.ad.logs` en tu contenedor para especificar el `log_processing_rules`. Por ejemplo:

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

En un entorno de Kubernetes, utiliza la anotación del pod `ad.datadoghq.com` en tu pod para especificar el `log_processing_rules`. Por ejemplo:

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
- Escapa los caracteres regex en tus patrones al realizar la agregación de varias líneas con anotaciones de pod. Por ejemplo, `\d` se convierte en `\\d`, `\w` se convierte en `\\w`.
- El valor de la anotación debe seguir la sintaxis JSON, lo que significa que no debe incluir comas finales ni comentarios.

{{% /tab %}}
{{< /tabs >}}

<div class="alert alert-danger"><strong>¡Importante!</strong> Los patrones regex para registros de varias líneas deben comenzar en el <em>inicio</em> de un registro. Los patrones no pueden coincidir a mitad de línea. <em>Un patrón que nunca coincide puede causar pérdidas de líneas de registro.</em> <br><br>La recolección de registros funciona con una precisión de hasta milisegundos. Los registros con mayor precisión no se envían, incluso si coinciden con el patrón.</div>

Más ejemplos:

| **Cadena cruda**           | **Patrón**                                       |
|--------------------------|---------------------------------------------------|
| 14:20:15                 | `\d{2}:\d{2}:\d{2}`                               |
| 11/10/2014               | `\d{2}\/\d{2}\/\d{4}`                             |
| Jue Jun 16 08:29:03 2016 | `\w{3}\s+\w{3}\s+\d{2}\s\d{2}:\d{2}:\d{2}\s\d{4}` |
| 20180228                 | `\d{8}`                                           |
| 2020-10-27 05:10:49.657  | `\d{4}-\d{2}-\d{2}\s\d{2}:\d{2}:\d{2}\.\d{3}`     |
| {"date": "2018-01-02"    | `\{"date": "\d{4}-\d{2}-\d{2}`                    |


## Reglas de procesamiento de registros {#commonly-used-log-processing-rules}

Consulte la [FAQ de Reglas de Procesamiento de Registros Comúnmente Utilizadas][4] para ver una lista de ejemplos.

## Seguimiento de las últimas líneas de directorios usando comodines {#tail-directories-using-wildcards}

Si sus archivos de registro están etiquetados por fecha o todos almacenados en el mismo directorio, configure su Agente de Datadog para monitorearlos todos y detectar automáticamente los nuevos usando comodines en el atributo `path`. Si desea excluir algunos archivos que coincidan con el `path` elegido, enumérelos en el atributo `exclude_paths`.

* Usando `path: /var/log/myapp/*.log`:
  * Coincide con todos los `.log` archivos contenidos en el directorio `/var/log/myapp/`.
  * No coincide con `/var/log/myapp/myapp.conf`.

* Usando `path: /var/log/myapp/*/*.log`:
  * Coincide con `/var/log/myapp/log/myfile.log`.
  * Coincide con `/var/log/myapp/errorLog/myerrorfile.log`
  * No coincide con `/var/log/myapp/mylogfile.log`.

Ejemplo de configuración para Linux:

```yaml
logs:
  - type: file
    path: /var/log/myapp/log/*.log
    exclude_paths:
      - /var/log/myapp/log/debug.log
      - /var/log/myapp/log/trace.log
    service: mywebapp
    source: go
```

El ejemplo anterior coincide con `/var/log/myapp/log/myfile.log` y excluye `/var/log/myapp/log/debug.log` y `/var/log/myapp/log/trace.log`.

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

El ejemplo anterior coincide con `C:\\MyApp\\MyLog.log` y excluye `C:\\MyApp\\MyLog.20230101.log` y `C:\\MyApp\\MyLog.20230102.log`.

**Nota**:
- El Agente requiere permisos de lectura y ejecución en un directorio para listar todos los archivos disponibles en él.
- Los valores de path y exclude_paths son sensibles a mayúsculas y minúsculas.

### Prioriza los archivos a los que se realiza seguimiento de las últimas líneas por tiempo de modificación {#prioritize-tailed-files-by-modification-time}

Esta función requiere la versión 7.40.0 o superior del Agente.

El Agente limita cuántos archivos puede realizar seguimiento de las últimas líneas simultáneamente con el parámetro `logs_config.open_files_limit`. Si el número de archivos que coinciden con tus fuentes de registro configuradas (como comodines) está dentro del límite, el Agente realiza seguimiento de las últimas líneas de todos ellos. Si hay más archivos que coinciden de lo que permite el límite, el Agente prioriza ordenando los nombres de archivo en orden lexicográfico inverso, de modo que los archivos con marcas de tiempo más recientes o números más altos son los primeros a los que se les realiza el seguimiento de las últimas líneas.

Si los nombres de archivo no siguen patrones secuenciales o de marcas de tiempo, el orden predeterminado puede no ser ideal. Para priorizar por tiempo de modificación en su lugar, establece `logs_config.file_wildcard_selection_mode` en `by_modification_time`. Con esta configuración, el Agente realiza seguimiento de las últimas líneas primero de los archivos modificados más recientemente.

**Ejemplo**:
- `open_files_limit` = 500
- Tu patrón de comodín coincide con 700 archivos.
- Con `by_name`: el Agente realiza seguimiento de las últimas líneas de los 500 archivos con los nombres más altos en orden lexicográfico inverso (por ejemplo, app.log.700 hasta app.log.201).
- Con `by_modification_time`: el Agente realiza seguimiento de las últimas líneas de los 500 archivos más recientemente escritos, sin importar sus nombres.

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

Para restaurar el comportamiento predeterminado, elimine la entrada `logs_config.file_wildcard_selection_mode` o configúrela explícitamente en `by_name`.

## Codificaciones de archivos de registro {#log-file-encodings}

Por defecto, el Agente de Datadog asume que los registros utilizan codificación UTF-8. Si los registros de su aplicación utilizan una codificación diferente, especifique el parámetro `encoding` en la configuración de los registros.

La lista a continuación proporciona los valores de codificación soportados. Si proporciona un valor no soportado, el Agente ignora el valor y lee el archivo como UTF-8.
 * `utf-16-le` - UTF-16 little-endian (Agente de Datadog **v6.23/v7.23**)
 * `utf-16-be` - UTF-16 big-endian (Agente de Datadog **v6.23/v7.23**)
 * `shift-jis` - Shift-JIS (Agente de Datadog **v6.34/v7.34**)

<div class="alert alert-warning">Si cambia el <code>encoding</code> de un archivo que el Agente está <em>ya realizando seguimiento de las últimas líneas</em>, puede producir caracteres distorsionados (mojibake). El Agente reanuda desde el desplazamiento de byte anterior, que puede no alinearse con los límites de caracteres después de un cambio de codificación. Para solucionar esto, rote el archivo de registro, reemplácelo o reinicie el seguimiento desde el principio de un archivo que utilice la nueva codificación. Estas acciones ayudan al Agente a comenzar con la codificación correcta.</div>

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

**Nota**: El parámetro `encoding` solo es aplicable cuando el parámetro `type` está configurado en `file`.

## Reglas de procesamiento globales {#global-processing-rules}

Para el Agente de Datadog v6.10+, las reglas de procesamiento `exclude_at_match`, `include_at_match` y `mask_sequences` se pueden definir globalmente en el [archivo de configuración principal del Agente][5] o a través de una variable de entorno. La regla `exclude_truncated` está disponible a partir del Agente v7.69.

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

Utilice la variable de entorno `DD_LOGS_CONFIG_PROCESSING_RULES` para configurar las reglas de procesamiento globales, por ejemplo:

```shell
DD_LOGS_CONFIG_PROCESSING_RULES='[{"type": "mask_sequences", "name": "mask_user_email", "replace_placeholder": "MASKED_EMAIL", "pattern" : "\\w+@datadoghq.com"}]'
```

{{% /tab %}}
{{% tab "Operador de Datadog" %}}

Utilice el parámetro `spec.override.[key].env` en su manifiesto del Operador de Datadog para establecer la variable de entorno `DD_LOGS_CONFIG_PROCESSING_RULES` y configurar las reglas de procesamiento globales, donde `[key]` es `nodeAgent`, `clusterAgent` o `clusterChecksRunner`. Por ejemplo:

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

Utilice el parámetro `datadog.env` en el Helm chart para establecer la variable de entorno `DD_LOGS_CONFIG_PROCESSING_RULES` y configurar las reglas de procesamiento globales. Por ejemplo:

```yaml
datadog:
  env:
    - name: DD_LOGS_CONFIG_PROCESSING_RULES
      value: '[{"type": "mask_sequences", "name": "mask_user_email", "replace_placeholder": "MASKED_EMAIL", "pattern" : "\\w+@datadoghq.com"}]'
```

{{% /tab %}}
{{< /tabs >}}
Todos los registros recopilados por el Agente de Datadog están afectados por las reglas de procesamiento globales.

**Nota**: El Agente de Datadog no inicia el recolector de registros si hay un problema de formato en las reglas de procesamiento globales. Ejecute el [subcomando de estado del Agente][6] para solucionar cualquier problema.

## Preguntas frecuentes sobre la agregación de registros de múltiples líneas {#multi-line-log-aggregation-faq}

**1. ¿Cuándo debo usar reglas manuales de múltiples líneas en lugar de la detección automática de múltiples líneas?**

Si conoce el formato de sus registros, debe usar reglas manuales de múltiples líneas para un control preciso.
Si está enviando muchos registros de múltiples líneas y no está seguro de su formato o no tiene los medios para configurar todas las fuentes individualmente, debe usar la detección automática de múltiples líneas.

**2. ¿Qué sucede cuando un patrón de múltiples líneas no coincide con ningún registro?**

Todas las líneas de registro que no son JSON se procesan individualmente como entradas de registro separadas.
Todas las líneas de registro en formato JSON se tratan como una única línea de registro, y solo el primer JSON válido se envía a la ingesta; el resto se descarta.

**3. ¿Qué sucede cuando hay reglas globales y reglas específicas de integración?**
Las reglas específicas de integración anulan completamente las reglas globales para la integración particular.

## Lectura adicional {#further-reading}

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