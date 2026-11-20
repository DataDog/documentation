---
algolia:
  tags:
  - advanced log filter
description: Utilice el Datadog Agent para recopilar sus registros y enviarlos a Datadog
further_reading:
- link: /logs/guide/getting-started-lwl/
  tag: Documentación
  text: Primeros pasos con Logging without Limits™
- link: /logs/guide/how-to-set-up-only-logs/
  tag: Documentación
  text: Utilice el Datadog Agent solo para Log Collection
- link: /logs/log_configuration/processors
  tag: Documentación
  text: Descubra cómo procesar sus registros
- link: /logs/log_configuration/parsing
  tag: Documentación
  text: Obtenga más información sobre el parseo
- link: /logs/live_tail/
  tag: Documentación
  text: Funcionalidad de seguimiento de las últimas líneas en tiempo real de Datadog
- link: /logs/explorer/
  tag: Documentación
  text: Vea cómo explorar sus registros
- link: /glossary/#tail
  tag: Glosario
  text: Entrada del glosario para "seguimiento de las últimas líneas"
title: Configuraciones avanzadas de Log Collection
---
Después de configurar [Log Collection][1], puede personalizar su configuración de recopilación:
- [Filtrar registros](#filter-logs)
  - [Excluir al coincidir](#exclude-at-match)
  - [Incluir al coincidir](#include-at-match)
  - [Excluir truncados](#exclude-truncated)
- [Eliminar datos confidenciales de sus registros](#scrub-sensitive-data-from-your-logs)
- [Agregación de varias líneas](#manually-aggregate-multi-line-logs)
- [Agregar automáticamente registros de varias líneas](#automatically-aggregate-multi-line-logs)
- [Reglas de procesamiento de registros de uso común](#commonly-used-log-processing-rules)
- [Realizar el seguimiento de las últimas líneas en directorios mediante el uso de comodines](#tail-directories-using-wildcards)
  - [Priorizar archivos con seguimiento de las últimas líneas según la hora de modificación](#prioritize-tailed-files-by-modification-time)
- [Codificaciones de archivos de registro](#log-file-encodings)
- [Reglas de procesamiento globales](#global-processing-rules)
- [Lecturas adicionales](#further-reading)

Para aplicar una regla de procesamiento a todos los registros recopilados por un Datadog Agent, consulte la sección [Reglas de procesamiento globales](#global-processing-rules).

**Notas**:
- Si configura varias reglas de procesamiento, se aplican de forma secuencial y cada regla se aplica sobre el resultado de la anterior.
- Los patrones de reglas de procesamiento deben cumplir con la [sintaxis de expresiones regulares de Golang][2].
- El parámetro `log_processing_rules` se utiliza en las configuraciones de integración para personalizar su configuración de Log Collection. Mientras que en la [configuración principal][5] del Agent, el parámetro `processing_rules` se utiliza para definir reglas de procesamiento globales.

## Filtrar registros {#filter-logs}

Para enviar solo un subconjunto específico de registros a Datadog, utilice el parámetro `log_processing_rules` en su archivo de configuración con el tipo `exclude_at_match` o `include_at_match`.

### Excluir al coincidir {#exclude-at-match}

| Parámetro          | Descripción                                                                                        |
|--------------------|----------------------------------------------------------------------------------------------------|
| `exclude_at_match` | Si el patrón especificado está contenido en el mensaje, el registro se excluye y no se envía a Datadog. |

Por ejemplo, para **filtrar** los registros que contienen una dirección de correo electrónico de Datadog, utilice el siguiente `log_processing_rules`:

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
Para obtener más información sobre la configuración del Agent, consulte <a href="/containers/guide/container-discovery-management/?tab=datadogoperator#agent-configuration">Container Discovery Management</a>.
</div>

En un entorno de Docker, utilice la etiqueta `com.datadoghq.ad.logs` en el **contenedor que envía los registros que desea filtrar** para especificar el `log_processing_rules`, por ejemplo:

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
- Escape los caracteres de expresión regular en sus patrones al usar etiquetas. Por ejemplo, `\d` se convierte en `\\d`, `\w` se convierte en `\\w`.
- El valor de la etiqueta debe seguir la sintaxis JSON, lo que significa que no debe incluir comas finales ni comentarios.

{{% /tab %}}
{{% tab "CRD de DatadogInstrumentation" %}}

Después de completar la [configuración de `DatadogInstrumentation`][10], aplique el siguiente recurso al Deployment `cardpayment`:

```yaml
apiVersion: datadoghq.com/v1alpha1
kind: DatadogInstrumentation
metadata:
  name: cardpayment-logs
  namespace: <WORKLOAD_NAMESPACE>
spec:
  targetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: cardpayment
  config:
    logs:
      - containerName: <CONTAINER_NAME>
        source: java
        service: cardpayment
        log_processing_rules:
          - type: exclude_at_match
            name: exclude_datadoghq_users
            pattern: '\w+@datadoghq.com'
```

[10]: /es/containers/guide/configure-autodiscovery-with-the-datadoginstrumentation-crd/

{{% /tab %}}
{{% tab "Anotaciones" %}}

<div class="alert alert-info">
Para obtener más información sobre la configuración del Agent, consulte <a href="/containers/guide/container-discovery-management/?tab=datadogoperator#agent-configuration">Container Discovery Management</a>.
</div>

Para configurar mediante Autodiscovery la recopilación de registros de contenedor en un contenedor determinado (con el nombre `CONTAINER_NAME`) dentro de su pod, añada las siguientes anotaciones al `log_processing_rules` de su pod:

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
- Escape los caracteres de expresión regular en sus patrones cuando utilice anotaciones de pod. Por ejemplo, `\d` se convierte en `\\d`, `\w` se convierte en `\\w`.
- El valor de la anotación debe seguir la sintaxis JSON, lo que significa que no debe incluir comas finales ni comentarios.

{{% /tab %}}
{{< /tabs >}}

### Incluir al coincidir {#include-at-match}

| Parámetro          | Descripción                                                                       |
|--------------------|-----------------------------------------------------------------------------------|
| `include_at_match` | Solo se envían a Datadog los registros con un mensaje que incluya el patrón especificado. Si se definen varias reglas `include_at_match`, todos los patrones de las reglas deben coincidir para que el registro sea incluido. |


Por ejemplo, utilice la siguiente configuración de `log_processing_rules` para **filtrar e incluir** los registros que contienen una dirección de correo electrónico de Datadog:

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

Si desea hacer coincidir uno o más patrones, debe definirlos en una sola expresión:

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

Si los patrones son demasiado largos para caber de forma legible en una sola línea, puede dividirlos en varias líneas:

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

En un entorno Docker, utilice la etiqueta `com.datadoghq.ad.logs` en el contenedor que envía los registros que desea filtrar para especificar el `log_processing_rules`. Por ejemplo:

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
- Escape los caracteres de expresión regular en sus patrones al usar etiquetas. Por ejemplo, `\d` se convierte en `\\d`, `\w` se convierte en `\\w`.
- El valor de la etiqueta debe seguir la sintaxis JSON, lo que significa que no debe incluir comas finales ni comentarios.

{{% /tab %}}
{{% tab "CRD de DatadogInstrumentation" %}}

Después de completar la [configuración de `DatadogInstrumentation`][10], aplique el siguiente recurso al Deployment `cardpayment`:

```yaml
apiVersion: datadoghq.com/v1alpha1
kind: DatadogInstrumentation
metadata:
  name: cardpayment-logs
  namespace: <WORKLOAD_NAMESPACE>
spec:
  targetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: cardpayment
  config:
    logs:
      - containerName: <CONTAINER_NAME>
        source: java
        service: cardpayment
        log_processing_rules:
          - type: include_at_match
            name: include_datadoghq_users
            pattern: '\w+@datadoghq.com'
```

[10]: /es/containers/guide/configure-autodiscovery-with-the-datadoginstrumentation-crd/

{{% /tab %}}
{{% tab "Anotaciones" %}}

En un entorno Kubernetes, utilice la anotación de pod `ad.datadoghq.com` en su pod para especificar el `log_processing_rules`. Por ejemplo:

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
- Escape los caracteres de expresión regular en sus patrones cuando utilice anotaciones de pod. Por ejemplo, `\d` se convierte en `\\d`, `\w` se convierte en `\\w`.
- El valor de la anotación debe seguir la sintaxis JSON, lo que significa que no debe incluir comas finales ni comentarios.

{{% /tab %}}
{{< /tabs >}}

### Excluir truncados {#exclude-truncated}

| Parámetro           | Descripción                                                        |
|---------------------|--------------------------------------------------------------------|
| `exclude_truncated` | Cuando está presente, excluye los registros truncados y no los envía a Datadog. La regla `exclude_truncated` está disponible a partir del Agent v7.69. |

Por ejemplo, para **filtrar** los registros truncados:

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

En un entorno Docker, utilice la etiqueta `com.datadoghq.ad.logs` en el contenedor que envía los registros que desea filtrar, para especificar el `log_processing_rules`. Por ejemplo:

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

**Nota**: El valor de la etiqueta debe seguir la sintaxis JSON, lo que significa que no debe incluir comas finales ni comentarios.

{{% /tab %}}
{{% tab "CRD de DatadogInstrumentation" %}}

Después de completar la [configuración de `DatadogInstrumentation`][10], aplique el siguiente recurso al Deployment `cardpayment`:

```yaml
apiVersion: datadoghq.com/v1alpha1
kind: DatadogInstrumentation
metadata:
  name: cardpayment-logs
  namespace: <WORKLOAD_NAMESPACE>
spec:
  targetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: cardpayment
  config:
    logs:
      - containerName: <CONTAINER_NAME>
        source: java
        service: cardpayment
        log_processing_rules:
          - type: exclude_truncated
```

[10]: /es/containers/guide/configure-autodiscovery-with-the-datadoginstrumentation-crd/

{{% /tab %}}
{{% tab "Anotaciones" %}}

En un entorno Kubernetes, utilice la anotación de pod `ad.datadoghq.com` en su pod para especificar el `log_processing_rules`. Por ejemplo:

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

**Nota**: El valor de la anotación debe seguir la sintaxis JSON, lo que significa que no debe incluir comas finales ni comentarios.

{{% /tab %}}
{{< /tabs >}}

## Eliminar datos confidenciales de sus registros {#scrub-sensitive-data-from-your-logs}

Si sus registros contienen información confidencial que debe ocultarse, configure el Datadog Agent para eliminar secuencias confidenciales utilizando el parámetro `log_processing_rules` en su archivo de configuración con el tipo `mask_sequences`.

Esto reemplaza todos los grupos coincidentes con el valor del parámetro `replace_placeholder`.

Por ejemplo, para ocultar números de tarjetas de crédito:

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

En un entorno Docker, utilice la etiqueta `com.datadoghq.ad.logs` en su contenedor para especificar el `log_processing_rules`. Por ejemplo:

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
- Escape los caracteres de expresión regular en sus patrones al usar etiquetas. Por ejemplo, `\d` se convierte en `\\d`, `\w` se convierte en `\\w`.
- El valor de la etiqueta debe seguir la sintaxis JSON, lo que significa que no debe incluir comas finales ni comentarios.

{{% /tab %}}
{{% tab "CRD de DatadogInstrumentation" %}}

Después de completar la [configuración de `DatadogInstrumentation`][10], aplique el siguiente recurso al Deployment `cardpayment`:

```yaml
apiVersion: datadoghq.com/v1alpha1
kind: DatadogInstrumentation
metadata:
  name: cardpayment-logs
  namespace: <WORKLOAD_NAMESPACE>
spec:
  targetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: cardpayment
  config:
    logs:
      - containerName: <CONTAINER_NAME>
        source: java
        service: cardpayment
        log_processing_rules:
          - type: mask_sequences
            name: mask_credit_cards
            replace_placeholder: "[masked_credit_card]"
            pattern: '(?:4[0-9]{12}(?:[0-9]{3})?|[25][1-7][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})'
```

[10]: /es/containers/guide/configure-autodiscovery-with-the-datadoginstrumentation-crd/

{{% /tab %}}
{{% tab "Anotaciones" %}}

En un entorno Kubernetes, utilice la anotación de pod `ad.datadoghq.com` en su pod para especificar el `log_processing_rules`. Por ejemplo:

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
- Escape los caracteres regex en sus patrones cuando utilice anotaciones de pod. Por ejemplo, `\d` se convierte en `\\d`, `\w` se convierte en `\\w`.
- El valor de la anotación debe seguir la sintaxis JSON, lo que significa que no debe incluir comas finales ni comentarios.

{{% /tab %}}
{{< /tabs >}}

Con la versión 7.17+ del Agent, la cadena `replace_placeholder` puede expandir referencias a grupos de captura como `$1`, `$2` y así sucesivamente. Si desea que una cadena siga al grupo de captura sin espacio intermedio, utilice el formato `${<GROUP_NUMBER>}`.

Por ejemplo, para eliminar información de usuario del registro `User email: foo.bar@example.com`, utilice:

* `pattern: "(User email: )[^@]*@(.*)"`
* `replace_placeholder: "$1 masked_user@${2}"`

Esto envía el siguiente registro a Datadog: `User email: masked_user@example.com`

## Agregar automáticamente registros de varias líneas {#automatically-aggregate-multi-line-logs}

La detección automática de varias líneas es útil cuando tiene muchas fuentes de registro con formatos complejos o cuando no tiene tiempo para configurar cada fuente individualmente. Esta función detecta y agrega automáticamente registros de varias líneas sin requerir que escriba patrones de regex personalizados.

Consulte la documentación de [Detección y agregación automática de varias líneas][7].

Para obtener soporte heredado de la función, consulte la documentación de [Detección y agregación automática de varias líneas (heredada)][8].

## Agregar manualmente registros de varias líneas {#manually-aggregate-multi-line-logs}

Las reglas manuales de varias líneas le brindan un control preciso sobre la agregación de registros cuando conoce sus formatos de registro. Este enfoque es ideal para garantizar un procesamiento de registros consistente con patrones de regex personalizados adaptados a su estructura de registro específica.

Si sus registros no se envían en JSON y desea agregar varias líneas en una sola entrada, configure el Datadog Agent para detectar un nuevo registro usando un patrón regex específico en lugar de tener un registro por línea. Use el tipo `multi_line` en el parámetro `log_processing_rules` para agregar todas las líneas en una sola entrada hasta que se detecte el patrón dado nuevamente.

Por ejemplo, cada línea de log de Java comienza con una marca de tiempo en formato `yyyy-dd-mm`. Estas líneas incluyen una traza de pila que puede enviarse como dos logs:

```text
2018-01-03T09:24:24.983Z UTC Exception in thread "main" java.lang.NullPointerException
        at com.example.myproject.Book.getTitle(Book.java:16)
        at com.example.myproject.Author.getBookTitles(Author.java:25)
        at com.example.myproject.Bootstrap.main(Bootstrap.java:14)
2018-01-03T09:26:24.365Z UTC starting upload of /my/file.gz
```

{{< tabs >}}
{{% tab "Archivo de configuración" %}}

Para enviar los logs de ejemplo anteriores con un archivo de configuración, use el siguiente `log_processing_rules`:

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

En un entorno Docker, utilice la etiqueta `com.datadoghq.ad.logs` en su contenedor para especificar el `log_processing_rules`. Por ejemplo:

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
{{% tab "CRD de DatadogInstrumentation" %}}

Después de completar la [configuración de `DatadogInstrumentation`][10], aplique el siguiente recurso al Deployment de `postgres`:

```yaml
apiVersion: datadoghq.com/v1alpha1
kind: DatadogInstrumentation
metadata:
  name: postgres-logs
  namespace: <WORKLOAD_NAMESPACE>
spec:
  targetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: postgres
  config:
    logs:
      - containerName: <CONTAINER_NAME>
        source: postgresql
        service: database
        log_processing_rules:
          - type: multi_line
            name: log_start_with_date
            pattern: '\d{4}-(0?[1-9]|1[012])-(0?[1-9]|[12][0-9]|3[01])'
```

[10]: /es/containers/guide/configure-autodiscovery-with-the-datadoginstrumentation-crd/

{{% /tab %}}
{{% tab "Anotaciones" %}}

En un entorno Kubernetes, utilice la anotación de pod `ad.datadoghq.com` en su pod para especificar el `log_processing_rules`. Por ejemplo:

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
- Escape los caracteres regex en sus patrones al realizar la agregación de varias líneas con anotaciones de pod. Por ejemplo, `\d` se convierte en `\\d`, `\w` se convierte en `\\w`.
- El valor de la anotación debe seguir la sintaxis JSON, lo que significa que no debe incluir comas finales ni comentarios.

{{% /tab %}}
{{< /tabs >}}

<div class="alert alert-danger"><strong>¡Importante!</strong> Los patrones regex para logs de varias líneas deben comenzar al <em>principio</em> de un log. Los patrones no pueden coincidir a mitad de línea. <em>Un patrón que nunca coincide puede causar la pérdida de líneas de log.</em> <br><br>La recolección de logs funciona con una precisión de hasta un milisegundo. Los logs con mayor precisión no se envían incluso si coinciden con el patrón.</div>

Más ejemplos:

| **Cadena sin procesar**           | **Patrón**                                       |
|--------------------------|---------------------------------------------------|
| 14:20:15                 | `\d{2}:\d{2}:\d{2}`                               |
| 11/10/2014               | `\d{2}\/\d{2}\/\d{4}`                             |
| Thu Jun 16 08:29:03 2016 | `\w{3}\s+\w{3}\s+\d{2}\s\d{2}:\d{2}:\d{2}\s\d{4}` |
| 20180228                 | `\d{8}`                                           |
| 2020-10-27 05:10:49.657  | `\d{4}-\d{2}-\d{2}\s\d{2}:\d{2}:\d{2}\.\d{3}`     |
| {"date": "2018-01-02"    | `\{"date": "\d{4}-\d{2}-\d{2}`                    |


## Reglas de procesamiento de registros de uso común {#commonly-used-log-processing-rules}

Consulte las [Preguntas frecuentes sobre reglas de procesamiento de registros de uso común][4] para ver una lista de ejemplos.

## Seguimiento de las últimas líneas de archivos en directorios mediante comodines {#tail-directories-using-wildcards}

Si sus archivos de registro están etiquetados por fecha o todos almacenados en el mismo directorio, configure su Datadog Agent para monitorearlos todos y detectar automáticamente los nuevos mediante el uso de comodines en el atributo `path`. Si desea excluir algunos archivos que coincidan con el `path` elegido, enumérelos en el atributo `exclude_paths`.

* Uso de `path: /var/log/myapp/*.log`:
  * Coincide con todos los archivos `.log` contenidos en el directorio `/var/log/myapp/`.
  * No coincide con `/var/log/myapp/myapp.conf`.

* Uso de `path: /var/log/myapp/*/*.log`:
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
- El Agent requiere permisos de lectura y ejecución en un directorio para listar todos los archivos disponibles en él.
- Los valores de path y exclude_paths distinguen entre mayúsculas y minúsculas.
- A partir de la versión 7.76.0 del Agent, se admiten comodines recursivos (`**`) en `path` y `exclude_paths` cuando se establece `logs_config.enable_recursive_glob: true` en `datadog.yaml`. Esta función está deshabilitada de forma predeterminada.

### Priorizar los archivos para el seguimiento de las últimas líneas según la hora de modificación {#prioritize-tailed-files-by-modification-time}

Esta función requiere la versión 7.40.0 o superior del Agent.

El Agent limita la cantidad de archivos de los que puede realizar el seguimiento de las últimas líneas simultáneamente mediante el parámetro `logs_config.open_files_limit`. Si la cantidad de archivos que coinciden con sus fuentes de registro configuradas (como comodines) está dentro del límite, el Agent realiza el seguimiento de las últimas líneas de todos ellos. Si coinciden más archivos de los que permite el límite, el Agent prioriza ordenando los nombres de archivo en orden lexicográfico inverso, por lo que primero se realiza el seguimiento de las últimas líneas de los archivos con marcas de tiempo más recientes o números más altos.

Si los nombres de archivo no siguen patrones secuenciales o con marca de tiempo, es posible que el orden predeterminado no sea el ideal. Para priorizar por tiempo de modificación en su lugar, establezca `logs_config.file_wildcard_selection_mode` en `by_modification_time`. Con esta configuración, el Agent realiza primero el seguimiento de las últimas líneas de los archivos modificados más recientemente.

**Ejemplo**:
- `open_files_limit` = 500
- Su patrón de comodín coincide con 700 archivos.
- Con `by_name`: el Agent realiza el seguimiento de las últimas líneas de los 500 archivos con los nombres más altos en orden lexicográfico inverso (por ejemplo, de app.log.700 a app.log.201).
- Con `by_modification_time`: el Agent realiza el seguimiento de las últimas líneas de los 500 archivos modificados más recientemente, independientemente de sus nombres.

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

Para restaurar el comportamiento predeterminado, elimine la entrada `logs_config.file_wildcard_selection_mode` o establézcala explícitamente en `by_name`.

## Codificaciones de archivos de registro {#log-file-encodings}

De forma predeterminada, el Datadog Agent asume que los registros utilizan codificación UTF-8. Si los registros de su aplicación utilizan una codificación diferente, especifique el parámetro `encoding` en la configuración de los registros.

La lista a continuación proporciona los valores de codificación admitidos. Si proporciona un valor no admitido, el Agent ignora el valor y lee el archivo como UTF-8.
 * `utf-16-le` - UTF-16 little-endian (Datadog Agent **v6.23/v7.23**)
 * `utf-16-be` - UTF-16 big-endian (Datadog Agent **v6.23/v7.23**)
 * `shift-jis` - Shift-JIS (Datadog Agent **v6.34/v7.34**)

<div class="alert alert-warning">Si cambia la <code>encoding</code> de un archivo que el Agent <em>ya está siguiendo</em>, puede producir caracteres ilegibles (mojibake). El Agent retoma la lectura desde el desplazamiento de bytes anterior, que puede no coincidir con los límites de los caracteres después de un cambio de codificación. Para solucionar esto, rote el archivo de registro, reemplácelo o reinicie el seguimiento desde el principio de un archivo que utilice la nueva codificación. Estas acciones ayudan a que el Agent comience con la codificación correcta.</div>

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

**Nota**: El parámetro `encoding` solo es aplicable cuando el parámetro `type` está establecido en `file`.

## Reglas globales de procesamiento {#global-processing-rules}

Para Datadog Agent v6.10+, las reglas de procesamiento `exclude_at_match`, `include_at_match` y `mask_sequences` se pueden definir globalmente en el [archivo de configuración principal][5] del Agent o a través de una variable de entorno. La regla `exclude_truncated` está disponible a partir del Agent v7.69.

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

Utilice la variable de entorno `DD_LOGS_CONFIG_PROCESSING_RULES` para configurar reglas globales de procesamiento, por ejemplo:

```shell
DD_LOGS_CONFIG_PROCESSING_RULES='[{"type": "mask_sequences", "name": "mask_user_email", "replace_placeholder": "MASKED_EMAIL", "pattern" : "\\w+@datadoghq.com"}]'
```

{{% /tab %}}
{{% tab "Datadog Operator" %}}

Utilice el parámetro `spec.override.[key].env` en su manifiesto de Datadog Operator para establecer la variable de entorno `DD_LOGS_CONFIG_PROCESSING_RULES` y configurar reglas globales de procesamiento, donde `[key]` es `nodeAgent`, `clusterAgent` o `clusterChecksRunner`. Por ejemplo:

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

Utilice el parámetro `datadog.env` en el chart de Helm para establecer la variable de entorno `DD_LOGS_CONFIG_PROCESSING_RULES` y configurar reglas globales de procesamiento. Por ejemplo:

```yaml
datadog:
  env:
    - name: DD_LOGS_CONFIG_PROCESSING_RULES
      value: '[{"type": "mask_sequences", "name": "mask_user_email", "replace_placeholder": "MASKED_EMAIL", "pattern" : "\\w+@datadoghq.com"}]'
```

{{% /tab %}}
{{< /tabs >}}
Todos los registros recopilados por el Datadog Agent se ven afectados por las reglas globales de procesamiento.

**Nota**: El Datadog Agent no inicia el recopilador de registros si hay un problema de formato en las reglas globales de procesamiento. Ejecute el [subcomando status][6] del Agent para solucionar cualquier problema.

## Preguntas frecuentes sobre la agregación de registros multilínea {#multi-line-log-aggregation-faq}

**1. ¿Cuándo debo usar reglas multilínea manuales frente a la detección multilínea automática?**

Si conoce el formato de sus registros, debe usar reglas multilínea manuales para un control preciso.
Si está enviando muchos registros multilínea y no está seguro de su formato o no tiene los medios para configurar todas las fuentes individualmente, debe usar la detección multilínea automática.

**2. ¿Qué sucede cuando un patrón multilínea no coincide con ningún registro?**

Todas las líneas de registro que no están en formato JSON se procesan individualmente como entradas de registro separadas.
Todas las líneas de registro con formato JSON se tratan como una sola línea de registros, y solo el primer formato JSON válido ingresa a la ingesta; el resto se descarta.

**3. ¿Qué sucede cuando hay reglas globales y reglas específicas de integración?**
Las reglas específicas de integración anulan por completo las reglas globales para la integración en particular.

## Lecturas adicionales {#further-reading}

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