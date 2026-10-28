---
description: Aprenda a utilizar el procesador Sensitive Data Scanner para detectar
  y redactar o hashear información sensible, como la Información de Identificación
  Personal (PII) y los datos de la Industria de Tarjetas de Pago (PCI) en registros
  o trazas.
disable_toc: false
further_reading:
- link: /logs/guide/regex_log_parsing/
  tag: guía
  text: Cómo escribir reglas de parseo Grok efectivas con expresiones regulares
- link: https://www.datadoghq.com/blog/otel-ai-observability-pipelines-clickhouse/
  tag: Blog
  text: Enrutar datos de OTel de aplicaciones de IA a ClickHouse y Datadog usando
    Observability Pipelines
products:
- icon: logs
  name: Registros
  url: /observability_pipelines/configuration/?tab=logs#pipeline-types
title: El procesador Sensitive Data Scanner
---
{{< product-availability >}}

## Descripción general {#overview}

El procesador Sensitive Data Scanner escanea los registros para detectar y redactar o hashear información sensible, como PII, PCI y datos sensibles personalizados. Puede elegir entre la biblioteca de reglas predefinidas de Datadog o ingresar reglas de expresiones regulares (Regex) personalizadas para buscar datos confidenciales.

Puede configurar el pipeline y el procesador en la [UI](#set-up-the-processor-in-the-ui), [API][10] o [Terraform](#set-up-the-processor-using-terraform).

Consulte [Mejores prácticas para optimizar el rendimiento](#best-practices-to-optimize-performance) para obtener consejos sobre cómo reducir el uso de recursos.

## Configure el procesador en la UI {#set-up-the-processor-in-the-ui}

Para configurar el procesador:

1. Defina un {{< ui >}}filter query{{< /ui >}}. Consulte [Sintaxis de búsqueda de registros][1] para obtener más información.
    - Solo los eventos que coinciden con el filtro se escanean y procesan.
    - Todos los eventos, independientemente de si coinciden con la consulta de filtro, se envían al siguiente paso del pipeline.
1. Haga clic en {{< ui >}}Add Scanning Rule{{< /ui >}}.
1. Seleccione una de las siguientes opciones:

{{< tabs >}}
{{% tab "Reglas de biblioteca" %}}

1. En el menú desplegable, seleccione la regla de biblioteca que desea utilizar.
1. Las palabras clave recomendadas se agregan automáticamente según la regla de biblioteca seleccionada. Después de agregar la regla de escaneo, puede [agregar palabras clave adicionales o eliminar las palabras clave recomendadas](#add-additional-keywords).
1. En la sección {{< ui >}}Define rule target and conditions{{< /ui >}}, seleccione si desea escanear {{< ui >}}Entire Event{{< /ui >}}, {{< ui >}}Specific Attributes{{< /ui >}} o {{< ui >}}Exclude Attributes{{< /ui >}} en el menú desplegable.
    - Si está escaneando todo el evento, puede excluir opcionalmente atributos específicos del escaneo. Utilice [notación de ruta](#path-notation-example) (`outer_key.inner_key`) para acceder a claves anidadas. Para los atributos especificados con datos anidados, se excluyen todos los datos anidados.
    - Si está escaneando atributos específicos, especifique qué atributos desea escanear. Utilice [notación de ruta](#path-notation-example) (`outer_key.inner_key`) para acceder a claves anidadas. Para atributos especificados con datos anidados, se escanean todos los datos anidados.
1. Para {{< ui >}}Define actions on match{{< /ui >}}, seleccione la acción que desea realizar para la información coincidente. **Nota**: La redacción, la redacción parcial y el hashing son acciones irreversibles.
    - {{< ui >}}Redact{{< /ui >}}: Reemplaza todos los valores coincidentes con el texto que especifique en el campo {{< ui >}}Replacement text{{< /ui >}}.
    - {{< ui >}}Partially Redact{{< /ui >}}: Reemplaza una porción especificada de todos los datos coincidentes. En la sección {{< ui >}}Redact{{< /ui >}}, especifique la cantidad de caracteres que desea redactar y qué parte de los datos coincidentes desea redactar.
    - {{< ui >}}Hash{{< /ui >}}: Reemplaza todos los datos coincidentes con un identificador único. Los bytes UTF-8 de la coincidencia se hashean con la huella digital de 64 bits de FarmHash.
1. Opcionalmente, haga clic en {{< ui >}}Add Field{{< /ui >}} para agregar etiquetas que desee asociar con los eventos coincidentes.
1. Agregue un nombre para la regla de escaneo.
1. Opcionalmente, agregue una descripción para la regla.
1. Haga clic en {{< ui >}}Save{{< /ui >}}.

### Agregue palabras clave adicionales {#add-additional-keywords}

Después de agregar reglas de escaneo de la biblioteca, puede editar cada regla por separado y agregar palabras clave adicionales al diccionario de palabras clave.

1. Navegue a su [pipeline][1].
1. En el procesador Sensitive Data Scanner con la regla que desea editar, haga clic en {{< ui >}}Manage Scanning Rules{{< /ui >}}.
1. Active {{< ui >}}Use recommended keywords{{< /ui >}} si desea que la regla los utilice. De lo contrario, agregue sus propias palabras clave al campo {{< ui >}}Create keyword dictionary{{< /ui >}}. También puede requerir que estas palabras clave estén dentro de un número especificado de caracteres de una coincidencia. De forma predeterminada, las palabras clave deben estar dentro de los 30 caracteres antes de un valor coincidente.
1. Haga clic en {{< ui >}}Update{{< /ui >}}.

[1]: https://app.datadoghq.com/observability-pipelines

{{% /tab %}}
{{% tab "Reglas personalizadas" %}}

1. En la sección {{< ui >}}Define match conditions{{< /ui >}}, especifique el patrón regex que se utilizará para buscar coincidencias con eventos en el campo {{< ui >}}Define the regex{{< /ui >}}. Consulte [Writing Effective Grok Parseo Rules with Regular Expressions][1] para obtener más información.
    Sensitive Data Scanner admite expresiones regulares compatibles con Perl (PCRE), pero no se admiten los siguientes patrones:
    - Referencias inversas y subexpresiones de captura (lookarounds)
    - Aserciones arbitrarias de ancho cero
    - Referencias de subrutinas y patrones recursivos
    - Patrones condicionales
    - Verbos de control de backtracking
    - La directiva `\C` "single-byte" (que rompe secuencias UTF-8)
    - La coincidencia de nueva línea `\R`
    - La directiva de reinicio de coincidencia `\K`
    - Callouts y código incrustado
    - Agrupación atómica y cuantificadores posesivos
1. Ingrese datos de muestra en el campo {{< ui >}}Add sample data{{< /ui >}} para verificar que su patrón regex sea válido.
1. Para {{< ui >}}Create keyword dictionary{{< /ui >}}, agregue palabras clave para refinar la precisión de la detección al hacer coincidir condiciones regex. Por ejemplo, si está escaneando un número de tarjeta de crédito Visa de dieciséis dígitos, puede agregar palabras clave como `visa`, `credit` y `card`. También puede requerir que estas palabras clave estén dentro de un número especificado de caracteres de una coincidencia. De forma predeterminada, las palabras clave deben estar dentro de los 30 caracteres antes de un valor coincidente.
1. En la sección {{< ui >}}Define rule target and conditions{{< /ui >}}, seleccione si desea escanear {{< ui >}}Entire Event{{< /ui >}}, {{< ui >}}Specific Attributes{{< /ui >}} o {{< ui >}}Exclude Attributes{{< /ui >}} en el menú desplegable.
    - Si está escaneando todo el evento, puede excluir opcionalmente atributos específicos del escaneo. Utilice [notación de ruta](#path-notation-example) (`outer_key.inner_key`) para acceder a claves anidadas. Para los atributos especificados con datos anidados, se excluyen todos los datos anidados.
    - Si está escaneando atributos específicos, especifique qué atributos desea escanear. Utilice [notación de ruta](#path-notation-example-custom) (`outer_key.inner_key`) para acceder a claves anidadas. Para atributos especificados con datos anidados, se escanean todos los datos anidados.
1. Para {{< ui >}}Define actions on match{{< /ui >}}, seleccione la acción que desea realizar para la información coincidente. **Nota**: La redacción, la redacción parcial y el hashing son acciones irreversibles.
    - {{< ui >}}Redact{{< /ui >}}: Reemplaza todos los valores coincidentes con el texto que especifique en el campo {{< ui >}}Replacement text{{< /ui >}}.
    - {{< ui >}}Partially Redact{{< /ui >}}: Reemplaza una porción especificada de todos los datos coincidentes. En la sección {{< ui >}}Redact{{< /ui >}}, especifique la cantidad de caracteres que desea redactar y qué parte de los datos coincidentes desea redactar.
    - {{< ui >}}Hash{{< /ui >}}: Reemplaza todos los datos coincidentes con un identificador único. Los bytes UTF-8 de la coincidencia se hashean con la huella digital de 64 bits de FarmHash.
1. Opcionalmente, haga clic en {{< ui >}}Add Field{{< /ui >}} para agregar etiquetas que desee asociar con los eventos coincidentes.
1. Agregue un nombre para la regla de escaneo.
1. Opcionalmente, agregue una descripción para la regla.
1. Haga clic en {{< ui >}}Add Rule{{< /ui >}}.

[1]: /es/logs/guide/regex_log_parsing/

{{% /tab %}}
{{< /tabs >}}

### Eliminar una regla {#delete-a-rule}

Para eliminar una regla en el Sensitive Data Scanner:

1. Navegue a [Observability Pipelines][2].
1. Seleccione su canalización.
1. Haga clic en el procesador Sensitive Data Scanner para expandirlo.
1. Haga clic en {{< ui >}}Manage Scanning Rules{{< /ui >}}.
1. Seleccione la regla que desea eliminar.
1. Haga clic en {{< ui >}}Delete{{< /ui >}}.

### Ejemplo de notación de ruta {#path-notation-example}

{{% observability_pipelines/path_notation %}}

{{% observability_pipelines/path_notation_dots %}}

## Configure el procesador usando Terraform {#set-up-the-processor-using-terraform}

Puede utilizar el [Datadog Observability Pipeline Terraform resource][4] para configurar una pipeline con el procesador Sensitive Data Scanner. Para agregar una regla al procesador Sensitive Data Scanner usando Terraform:

1. Utilice la fuente de datos [Datadog Sensitive Data Scanner Standard Pattern][5] para recuperar el ID de regla de la [library rule][6] de Sensitive Data Scanner.

   {{< code-block lang="terraform" >}}
data "datadog_sensitive_data_scanner_standard_pattern" "<RULE_IDENTIFIER>" {
  filter = "<RULE_NAME>"
}
   {{< /code-block >}}

   Reemplace los marcadores de posición:

   - `<RULE_IDENTIFIER>` con un nombre para usar cuando configure posteriormente el procesador Sensitive Data Scanner en el recurso de Observability Pipelines.
   - `<RULE_NAME>` con el nombre exacto de la regla. Consulte [Library Rules][6] para ver la lista completa de reglas.

   Por ejemplo, si desea utilizar el [AWS Access Key ID Scanner][7], configure la fuente de datos como sigue:

   {{< code-block lang="terraform" >}}
data "datadog_sensitive_data_scanner_standard_pattern" "aws_access_key" {
  filter = "AWS Access Key ID Scanner"
}
   {{< /code-block >}}
    Consulte el [ejemplo de configuración completa](#full-configuration-example) sobre cómo agregar fuentes de datos para varias reglas.

1. Agregue un bloque [rule][9] en su recurso de Observability Pipeline para la regla de biblioteca.

   {{< code-block lang="terraform" >}}
...
  sensitive_data_scanner {
    rule {
      name = "<YOUR_RULE_NAME>"
      tags = []
      on_match {
        redact {
          replace = "***"
        }
      }
      pattern {
        library {
          id                       = data.datadog_sensitive_data_scanner_standard_pattern.<RULE_IDENTIFIER>.id
          use_recommended_keywords = true
        }
      }
      scope {
        all = true
      }
    }
  }
   {{< /code-block >}}

   Reemplace los marcadores de posición:

   - `<YOUR_RULE_NAME>` con un nombre para la regla. Este nombre se muestra en la Pipelines UI.
   - `<RULE_IDENTIFIER>` con el identificador de regla que utilizó en la fuente de datos en el paso 1.

   Por ejemplo, si utiliza la fuente de datos [AWS Access Key ID Scanner][7] del paso 1, configure el bloque de regla como sigue:

   {{< code-block lang="terraform" >}}
...
  sensitive_data_scanner {
    rule {
      name = "Redact AWS Access Key IDs"
      tags = []
      on_match {
        redact {
          replace = "***"
        }
      }
      pattern {
        library {
          id                       = data.datadog_sensitive_data_scanner_standard_pattern.aws_access_key.id
          use_recommended_keywords = true
        }
      }
      scope {
        all = true
      }
    }
  }
   {{< /code-block >}}

   Consulte el [ejemplo de configuración completa](#full-configuration-example) sobre cómo agregar varias reglas.

1. Repita los pasos 1 y 2 para todas las reglas de biblioteca que desee agregar.

### Ejemplo de configuración completa {#full-configuration-example}

{{< img src="observability_pipelines/processors/sds_tf_ui.png" alt="El panel del procesador Sensitive Data Scanner que muestra dos reglas de escaneo: Redactar ID de clave de acceso de AWS y Redactar SSN de EE. UU." style="width:60%;" >}}

Si desea utilizar el procesador Sensitive Data Scanner para buscar ID de clave de acceso de AWS y números de Seguro Social de EE. UU., y redactarlos reemplazándolos con la cadena `***`:

1. Utilice la fuente de datos [Datadog Sensitive Data Scanner Standard Pattern][5] para recuperar los ID de regla para el [Escáner de ID de clave de acceso de AWS][7] y el [Escáner de número de Seguro Social de EE. UU.][8].
1. En el procesador Sensitive Data Scanner de su recurso [Datadog Observability Pipeline][4], utilice las reglas de Sensitive Data Scanner definidas en las fuentes de datos.

{{< code-block lang="terraform" >}}
data "datadog_sensitive_data_scanner_standard_pattern" "aws_access_key" {
  filter = "AWS Access Key ID Scanner"
}
data "datadog_sensitive_data_scanner_standard_pattern" "us_ssn" {
  filter = "US Social Security Number Scanner"
}

resource "datadog_observability_pipeline" "sensitive_data_pipeline" {
  name = "Sensitive Data Pipeline"

  config {
    source {
      id = "source-0"
      datadog_agent {}
    }

    processor_group {
      display_name = "Processors"
      enabled      = true
      id           = "group-0"
      include      = "*"
      inputs       = ["source-0"]

      processor {
        display_name = "Sensitive Data Scanner"
        enabled      = true
        id           = "processor-sds-0"
        include      = "*"

        sensitive_data_scanner {
          rule {
            name = "Redact AWS Access Key IDs"
            tags = []
            on_match {
              redact {
                replace = "***"
              }
            }
            pattern {
              library {
                id                       = data.datadog_sensitive_data_scanner_standard_pattern.aws_access_key.id
                use_recommended_keywords = true
              }
            }
            scope {
              all = true
            }
          }
          rule {
            name = "Redact US SSNs"
            tags = []
            on_match {
              redact {
                replace = "***"
              }
            }
            pattern {
              library {
                id                       = data.datadog_sensitive_data_scanner_standard_pattern.us_ssn.id
                use_recommended_keywords = true
              }
            }
            scope {
              all = true
            }
          }
        }
      }
    }

    destination {
      id     = "destination-0"
      inputs = ["group-0"]
      datadog_logs {}
    }
  }
}
{{< /code-block >}}

## Mejores prácticas para optimizar el rendimiento {#best-practices-to-optimize-performance}

El procesador Sensitive Data Scanner consume muchos recursos de CPU. Utilice las siguientes mejores prácticas para optimizar el rendimiento.

### Visualice el uso de las reglas de escaneo con el tablero Observability Pipelines Overview {#view-scanning-rule-usage-with-the-observability-pipelines-overview-dashboard}

Observability Pipelines incluye un tablero [Observability Pipelines Overview][16] preconfigurado con una sección de **Datos confidenciales encontrados por Observability Pipelines**. Utilice los widgets de esa sección para ver qué reglas de escaneo están coincidiendo con los datos.

1. Navegue a Dashboards > [Observability Pipelines Overview][16].
1. Utilice las variables de plantilla (`pipeline_id`, `host`, `worker_uuid`, `component_type`, `component_kind`, `component_id`) en la parte superior del tablero para definir el contexto de la vista a una canalización o Worker específico.
1. Utilice el selector de tiempo para definir el contexto a un marco temporal más amplio.

Utilice los siguientes widgets para evaluar el uso de las reglas de escaneo de sus procesadores Sensitive Data Scanner:

- **Registros que contienen datos confidenciales por regla de escaneo**: Enumera cada regla por nombre (por ejemplo, `visa_card_scanner_1x16_1x19_digits` o `redact_ipv4`) con la cantidad de coincidencias durante el marco de tiempo seleccionado. Las reglas con recuentos altos están coincidiendo activamente con datos. Este es el widget principal para visualizar qué reglas están en uso.
- **Recuento total de registros que contienen datos confidenciales**: Muestra el volumen total de datos confidenciales que coinciden en todas las reglas.
- **Registros que contienen datos confidenciales por Pipeline**: Muestra los registros coincidentes que contienen datos confidenciales. Puede definir el contexto de las coincidencias por `pipeline_id`, lo que le ayuda a ver si los registros que contienen datos confidenciales se encuentran en todos los pipelines o solo en pipelines específicos.
- **Registros que contienen datos confidenciales por servidor**: Desglosa las coincidencias de datos confidenciales por servidor de Worker. Utilice este widget para confirmar la cobertura en toda su implementación.
- **Patrones que contienen información confidencial** y **Lista de registros que contienen datos confidenciales**: Muestra los patrones de registro y los eventos de muestra donde se encontraron datos confidenciales.

Después de identificar las reglas sin coincidencias durante un período de tiempo representativo, confirme que no son necesarias y elimínelas. Consulte [Eliminar una regla](#delete-a-rule).

**Nota**: Una regla con cero coincidencias significa que la regla no coincidió en el período de tiempo seleccionado, no que la regla sea inválida.

### Habilite solo las reglas que necesita {#only-enable-rules-you-need}

Las reglas que están habilitadas pero no se utilizan consumen recursos innecesarios. Verifique el procesador Sensitive Data Scanner para visualizar cuántas coincidencias ha tenido cada regla en las últimas 24 horas.

1. Navegue a [Observability Pipelines][2].
1. Seleccione su canalización.
1. Haga clic en el procesador Sensitive Data Scanner para expandirlo.
1. Haga clic en {{< ui >}}View Scanning Rules{{< /ui >}} para abrir el panel lateral y visualizar {{< ui >}}Matches in the last 24 hours{{< /ui >}} para cada regla.

Consulte [Eliminar una regla](#delete-a-rule) para eliminar una regla que no se utiliza.

### Escanee solo los eventos y campos que necesitan ser escaneados en busca de datos confidenciales {#only-scan-the-events-and-fields-that-need-to-be-scanned-for-sensitive-data}

El tiempo que le toma al Sensitive Data Scanner escanear un evento escala aproximadamente con el tamaño del evento. Para optimizar el rendimiento del procesador:

- Si conoce los tipos de eventos que desea escanear, defina una consulta de procesador que solo envíe al procesador los eventos que desea.

- Reduzca el tiempo de escaneo seleccionando atributos de evento específicos para escanear o excluyendo atributos de evento del escaneo. Consulte el paso {{< ui >}}Define rule target and conditions{{< /ui >}} en [Configurar el procesador](#set-up-the-processor-in-the-ui).

### Evalúe y compare las optimizaciones de rendimiento {#evaluate-and-benchmark-performance-optimizations}

Utilice la métrica `pipelines.component_latency_seconds` para:

- Compare el rendimiento del procesador al agregar una regla
- Evalúe el rendimiento después de realizar cambios de optimización, como reducir la cantidad de campos escaneados y eliminar reglas no utilizadas

Para visualizar la métrica `pipelines.component_latency_seconds`:

1. Navegue a [Metrics Explorer][11].
1. En el campo de métrica, ingrese `pipelines.component_latency_seconds`.
1. En el campo {{< ui >}}from{{< /ui >}}, ingrese la etiqueta `component_id:<COMPONENT_ID>`, donde `<COMPONENT_ID>` es el ID de su procesador Sensitive Data Scanner.

**Nota**: `pipelines.component_latency_seconds` es una métrica de distribución, por lo que debe habilitar los percentiles para esa métrica. Consulte [Habilitar la funcionalidad de consulta avanzada][12] para obtener instrucciones.

## Métricas de estado {#health-metrics}

Para [component metrics][13] y [processor buffer metrics][14] emitidas por todos los procesadores, consulte la documentación de [Pipelines Usage Metrics][15].

### Métricas de Sensitive Data Scanner {#sensitive-data-scanner-metrics}

- Utilice la etiqueta `component_id` para filtrar o agrupar por componentes individuales.
- La etiqueta `component_type` es `sensitive_data_scanner` para las métricas del procesador Sensitive Data Scanner.

`pipelines.sds_rule_matched_total`
: **Descripción**: La cantidad de eventos que coincidieron con una regla de Sensitive Data Scanner. Etiquetado con el nombre de la regla correspondiente.
: **Tipo de métrica**: conteo

`pipelines.scanned_events`
: **Descripción**: La cantidad de eventos escaneados por el motor de Sensitive Data Scanner.
: **Tipo de métrica**: conteo

`pipelines.scanning.match_count`
: **Descripción**: El número de coincidencias encontradas por el Sensitive Data Scanner.
: **Tipo de métrica**: count

`pipelines.scanning.suppressed_match_count`
: **Descripción**: El número de coincidencias suprimidas por el Sensitive Data Scanner.
: **Tipo de métrica**: count

`pipelines.scanning.duration`
: **Descripción**: Tiempo de reloj acumulado, en segundos, dedicado al escaneo de eventos. Utilice esta métrica para comparar el rendimiento del procesador y evaluar las optimizaciones.
: **Tipo de métrica**: count

`pipelines.scanning.cpu_duration`
: **Descripción**: Tiempo de CPU acumulado, en segundos, dedicado al escaneo de eventos.
: **Tipo de métrica**: count

`pipelines.scanner.total_count`
: **Descripción**: El número de procesadores de Sensitive Data Scanner que se están ejecutando actualmente.
: **Tipo de métrica**: gauge

`pipelines.scanner.total_regexes`
: **Descripción**: El número de expresiones regulares almacenadas en todos los Sensitive Data Scanner.
: **Tipo de métrica**: gauge

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/observability_pipelines/search_syntax/logs/
[2]: https://app.datadoghq.com/observability-pipelines
[3]: /es/logs/guide/regex_log_parsing/
[4]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/observability_pipeline
[5]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/data-sources/sensitive_data_scanner_standard_pattern
[6]: /es/security/sensitive_data_scanner/scanning_rules/library_rules/
[7]: /es/security/sensitive_data_scanner/scanning_rules/library_rules/?search=AWS+Access+Key+ID+Scanner
[8]: /es/security/sensitive_data_scanner/scanning_rules/library_rules/?search=US+Social+Security+Number+Scanner
[9]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/observability_pipeline#nested-schema-for-configprocessor_groupprocessorsensitive_data_scanner
[10]: /es/api/latest/observability-pipelines/#create-a-new-pipeline
[11]: https://app.datadoghq.com/metric/explorer
[12]: /es/metrics/distributions/#enabling-advanced-query-functionality
[13]: /es/observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/#component-metrics
[14]: /es/observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/#processor-buffer-metrics
[15]: /es/observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/
[16]: https://app.datadoghq.com/dash/integration/32326/observability-pipelines-overview