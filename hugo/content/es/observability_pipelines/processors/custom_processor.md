---
disable_toc: false
further_reading:
- link: /observability_pipelines/guide/remap_reserved_attributes/
  tag: documentación
  text: Reasignar atributos reservados
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
- icon: metrics
  name: Métricas
  url: /observability_pipelines/configuration/?tab=metrics#pipeline-types
title: Procesador personalizado
---
{{< product-availability >}}

## Descripción general {#overview}

Use este procesador con Vector Remap Language (VRL) para modificar y enriquecer sus registros o métricas. VRL es un lenguaje orientado a expresiones y específico del dominio diseñado para transformar datos. Cuenta con funciones integradas para casos de uso de observabilidad. Puede usar funciones personalizadas de las siguientes maneras:

- Manipular [arreglos](#array), [cadenas](#string) y otros tipos de datos.
- Codificar y decodificar valores usando [Codec](#codec).
- [Cifrar](#encrypt) y [descifrar](#decrypt) valores.
- [Coaccionar](#coerce) un tipo de datos a otro (por ejemplo, de un entero a una cadena).
- [Convertir valores de syslog](#convert) a valores legibles.
- Enriquecer valores usando [tablas de enriquecimiento](#enrichment).
- [Manipular valores de IP](#ip).
- Calcular [distancias geográficas](#map) y orientación con haversine.
- [Parseo](#parse) valores con reglas personalizadas (por ejemplo, grok, regex, etcétera) y funciones listas para usar (por ejemplo, syslog, apache, registros de flujo de VPC, etcétera). Consulte [Writing Effective Grok Parsing Rules with Regular Expressions][3] para obtener información.
- Manipule [rutas](#path) de eventos.

Consulte [Funciones personalizadas](#custom-functions) para obtener la lista completa de funciones disponibles.

Consulte [Remap Reserved Attributes][1] sobre cómo usar el Procesador personalizado para reasignar atributos de forma manual y dinámica.

## Configuración {#setup}

Para configurar este procesador:

- Si aún no ha creado ninguna función, haga clic en {{< ui >}}Add custom processor{{< /ui >}} y siga las instrucciones en [Agregar una función](#add-a-function) para crear una función.
- Si ya agregó funciones personalizadas, haga clic en {{< ui >}}Manage custom processors{{< /ui >}}. Haga clic en una función de la lista para editarla o eliminarla. Puede usar la barra de búsqueda para encontrar una función por su nombre. Haga clic en {{< ui >}}Add Custom Processor{{< /ui >}} para [agregar una función](#add-a-function).

### Agregar una función {#add-a-function}

1. Ingrese un nombre para su procesador personalizado.
1. Agregue su script para modificar sus datos usando [custom functions][1]. También puede hacer clic en {{< ui >}}Autofill with Example{{< /ui >}} y seleccionar uno de los casos de uso comunes para comenzar. Haga clic en el icono de copiar para el script de ejemplo y péguelo en su script. Consulte [Get Started with the Custom Processor][2] para obtener más información.
1. Opcionalmente, marque {{< ui >}}Drop events on error{{< /ui >}} si desea descartar los eventos que encuentren un error durante el procesamiento.
1. Ingrese un evento de muestra.
1. Haga clic en {{< ui >}}Run{{< /ui >}} para obtener una vista previa de cómo las funciones procesan el evento. Después de que el script se haya ejecutado, puede ver el resultado para el evento.
1. Haga clic en {{< ui >}}Save{{< /ui >}}.

## Funciones personalizadas {#custom-functions}

{{< whatsnext desc="Las funciones están organizadas en las siguientes categorías:" >}}
    {{< nextlink href="observability_pipelines/processors/custom_processor/#array" >}}Array{{< /nextlink >}}
    {{< nextlink href="observability_pipelines/processors/custom_processor/#codec" >}}Codec{{< /nextlink >}}
    {{< nextlink href="observability_pipelines/processors/custom_processor/#convert" >}}Convert{{< /nextlink >}}
    {{< nextlink href="observability_pipelines/processors/custom_processor/#cryptography" >}}Cryptography{{< /nextlink >}}
    {{< nextlink href="observability_pipelines/processors/custom_processor/#debug" >}}Debug{{< /nextlink >}}
    {{< nextlink href="observability_pipelines/processors/custom_processor/#enrichment" >}}Enrichment{{< /nextlink >}}
    {{< nextlink href="observability_pipelines/processors/custom_processor/#ip" >}}IP{{< /nextlink >}}
    {{< nextlink href="observability_pipelines/processors/custom_processor/#map" >}}Mapa{{< /nextlink >}}
    {{< nextlink href="observability_pipelines/processors/custom_processor/#number" >}}Number{{< /nextlink >}}
    {{< nextlink href="observability_pipelines/processors/custom_processor/#object" >}}Object{{< /nextlink >}}
    {{< nextlink href="observability_pipelines/processors/custom_processor/#parse" >}}Parse{{< /nextlink >}}
    {{< nextlink href="observability_pipelines/processors/custom_processor/#path" >}}Path{{< /nextlink >}}
    {{< nextlink href="observability_pipelines/processors/custom_processor/#random" >}}Random{{< /nextlink >}}
    {{< nextlink href="observability_pipelines/processors/custom_processor/#string" >}}Cadena{{< /nextlink >}}
    {{< nextlink href="observability_pipelines/processors/custom_processor/#system" >}}System{{< /nextlink >}}
    {{< nextlink href="observability_pipelines/processors/custom_processor/#timestamp" >}}Timestamp{{< /nextlink >}}
    {{< nextlink href="observability_pipelines/processors/custom_processor/#type" >}}Type{{< /nextlink >}}
{{< /whatsnext >}}

{{< vrl-functions >}}

## Métricas de salud {#health-metrics}

Para [métricas de componentes][4] y [métricas de búfer de procesador][5] emitidas por todos los procesadores, consulte la documentación de [Métricas de uso de Pipelines][6]. Para filtrar o agrupar por métricas de Procesador personalizado, utilice la etiqueta `component_type:remap_vrl`.

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/observability_pipelines/guide/remap_reserved_attributes
[2]: /es/observability_pipelines/guide/get_started_with_the_custom_processor
[3]: /es/logs/guide/regex_log_parsing/
[4]: /es/observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/#component-metrics
[5]: /es/observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/#processor-buffer-metrics
[6]: /es/observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/