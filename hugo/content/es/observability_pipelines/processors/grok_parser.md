---
description: Aprenda a utilizar el procesador Grok Parser para generar reglas de parseo
  que estructuren registros personalizados o no estándar.
disable_toc: false
further_reading:
- link: https://www.datadoghq.com/blog/otel-ai-observability-pipelines-clickhouse/
  tag: Blog
  text: Enrutar datos de OTel de aplicaciones de IA a ClickHouse y Datadog usando
    Observability Pipelines
- link: https://www.datadoghq.com/blog/observability-pipelines-mssp
  tag: Blog
  text: Simplifique la recopilación y agregación de registros para MSSP con Datadog
    Observability Pipelines
products:
- icon: logs
  name: Registros
  url: /observability_pipelines/configuration/?tab=logs#pipeline-types
title: Procesador Grok Parser
---
{{< product-availability >}}

{{< callout url="#" btn_hidden="true" header="¡Únase a la vista previa!" >}}
Los filtros por regla y las reglas de parseo generadas por IA se encuentran en Vista previa. Comuníquese con su administrador de cuenta para solicitar acceso.
{{< /callout >}}

## Descripción general
 {#overview}

Las aplicaciones personalizadas o los registros no estándar a menudo pueden ser difíciles de parsear en formatos estructurados. Para solucionar este problema, utilice el procesador Grok Parser para generar reglas de parseo mediante IA, aplique reglas de biblioteca para formatos específicos de proveedores (como Apache, Airflow y MySQL) o cree sus propias reglas de parseo. Luego, pruebe las reglas en datos de muestra para validar la sintaxis y obtener una vista previa de la salida del registro parseado.

**Notas**:
- Debe crear un Grok Parser independiente para cada campo que desee parsear.
- Un registro solo es parseado por la primera regla con la que coincide, por lo que [el orden de sus reglas es importante](#order-of-custom-rules).
- Si utiliza versiones de Worker anteriores a la 2.17, sus registros deben tener el campo `source` o `ddsource` y el campo `message` para que el procesador los pueda parsear.

## Configuración
 {#setup}

El procesador Grok Parser realiza lo siguiente:

1. Utiliza la consulta de filtro a nivel de procesador para determinar qué registros se envían al analizador.
1. Identifica el campo especificado para analizar en el registro.
1. (Vista previa) Utiliza la consulta de filtro a nivel de regla para aplicar la primera regla de parseo que coincida con el registro.
1. Sobrescribe el campo de registro especificado con la salida de la regla y, a continuación, envía el registro al siguiente paso de la canalización.

{{< img src="observability_pipelines/processors/grok_parser_setup.png" alt="El panel del procesador Grok Parser que muestra la consulta de filtro y la configuración del campo a parsear." style="width:50%;" >}}

Para configurar el procesador Grok Parser:

1. Defina una consulta de filtro a nivel de procesador. Solo los registros que coinciden con esta consulta de filtro se envían al analizador. Todos los registros, independientemente de si son parseados por el procesador, se envían al siguiente paso de la canalización. Consulte la [Sintaxis de búsqueda de registros][3] para obtener información sobre cómo crear consultas.
1. Ingrese el campo de registro que desea parsear. Por ejemplo, si ingresa `logmessage`, se parsea el contenido del atributo `logmessage`. Si no se especifica ningún campo, `message` es el campo predeterminado que se utiliza.
1. Desactive {{< ui >}}Enable Library Rules{{< /ui >}} para inhabilitar todas las reglas de parseo de la biblioteca.
   <br>**Notas**:
   - Debe crear una regla de parseo personalizada antes de poder inhabilitar las reglas de la biblioteca.
   - Las reglas de la biblioteca se aplican de forma predeterminada. Inhabilite las reglas de la biblioteca solo si depende de reglas de parseo personalizadas.
1. Haga clic en {{< ui >}}View Library Rules{{< /ui >}} para obtener una vista previa de las reglas preestablecidas para las integraciones. Puede probar las reglas de parseo listas para usar con sus muestras de registro. Consulte [Reglas de biblioteca](#library-rules) para obtener más información.

### Crear una regla de parseo personalizada o generada por IA
 {#create-an-ai-generated-or-custom-parsing-rule}

Para configurar una regla de parseo personalizada o asistida por IA, haga clic en {{< ui >}}Create Parsing Rules{{< /ui >}} en el procesador Grok Parser:

1. Ingrese un nombre para la regla de parseo.
1. (Vista previa) Ingrese una consulta de filtro para definir a qué registros se aplica esta regla. El Grok Parser ejecuta una regla solo si un registro coincide con la consulta de filtro por regla, lo que le permite aplicar diferentes reglas de parseo en diferentes formatos de registro. Consulte la [Sintaxis de búsqueda de registros][3] para obtener información sobre cómo crear consultas.
1. Ingrese una muestra de registro que desee parsear. Las muestras se pueden copiar desde Live Capture o pegar desde otra fuente.
1. (Vista previa) Haga clic en {{< ui >}}Generate New Rule{{< /ui >}} para que la IA genere una nueva regla de parseo basada en el registro de muestra. De lo contrario, consulte [Escribir reglas manualmente](#manually-write-rules) para escribir sus propias reglas.
    1. Revise el registro parseado en el panel {{< ui >}}Preview Changes{{< /ui >}}.
    1. Haga clic en {{< ui >}}Generate New Rule{{< /ui >}} para volver a ejecutar el generador de reglas de IA o actualice manualmente la regla para que el registro se parsee correctamente. Consulte [Parseo][1] para obtener información sobre cómo escribir reglas de parseo.
    <br>**Notas**:
        - Si vuelve a ejecutar el generador de reglas de IA, se crea una nueva regla. Debe eliminar manualmente las reglas creadas previamente por la IA si no las desea.
        - Puede ejecutar el generador de reglas de IA un máximo de tres veces por muestra.
    1. Repita el paso 4 para crear reglas basadas en registros de muestra adicionales. Consulte [Orden de las reglas personalizadas](#order-of-custom-rules) para obtener información sobre cómo el orden de las reglas determina qué regla parsea un registro.
1. Después de agregar una regla, puede agregar reglas de biblioteca seleccionando una regla de biblioteca del menú desplegable {{< ui >}}reference a library rule{{< /ui >}}. Puede agregar varias reglas de biblioteca. Consulte [Reglas de biblioteca](#library-rules) para obtener más información.
1. Haga clic en {{< ui >}}Advanced Settings{{< /ui >}} si desea agregar reglas auxiliares. Consulte [Uso de reglas auxiliares para reutilizar patrones comunes][2] para obtener más información.
1. Haga clic en {{< ui >}}Create Rule{{< /ui >}}.

{{< img src="observability_pipelines/processors/grok_parser_create_rule.png" alt="El modal Crear regla de parseo en el procesador Grok Parser." style="width:50%;" >}}

Si un registro se envía al analizador pero no es parseado por ninguna regla, el Worker genera un registro con el error: `The parser failed to apply rule`.

#### Orden de las reglas personalizadas
 {#order-of-custom-rules}

Cuando tiene varias reglas personalizadas para un procesador Grok Parser, un registro es parseado por la primera regla cuya consulta coincide, y luego se envía al siguiente paso en la canalización. El procesador no intenta hacer coincidir el registro con reglas posteriores. Por lo tanto, el orden de las reglas importa si un registro puede coincidir con varias reglas. Para reordenar las reglas, arrástrelas y suéltelas en el orden deseado.

##### Ejemplo
 {#example}

Considere un parseador con estas reglas de parseo:

1. Ejemplo de regla 1
1. Ejemplo de regla 2
1. Ejemplo de regla 3

Si un registro enviado al analizador coincide con las tres consultas de regla, el registro _solo_ es parseado por el Ejemplo de regla 1, porque aparece antes que las reglas 2 y 3.

{{< img src="observability_pipelines/processors/grok_parser_rule_order.png" alt="Tres reglas de parseo enumeradas en orden en el procesador Grok Parser." style="width:50%;" >}}

#### Escribir reglas manualmente
 {#manually-write-rules}

Para escribir reglas de parseo manualmente, en el modal {{< ui >}}Create Parsing Rule{{< /ui >}}:

1. Haga clic en {{< ui >}}write rules manually{{< /ui >}}.
1. Ingrese las reglas de parseo para los registros. Consulte [Parsing][1] para obtener información sobre cómo escribir reglas de parseo con patrones Grok de Datadog. **Nota**: Los filtros `url`, `useragent` y `csv` no están disponibles.
1. Revise el registro parseado en el panel {{< ui >}}Preview Changes{{< /ui >}} y actualice la regla hasta que el registro se parsee como se espera.
1. Haga clic en {{< ui >}}Add rule{{< /ui >}} para escribir manualmente otra regla.

### Reglas de biblioteca
 {#library-rules}

Cuando se envía un registro al analizador, las reglas de biblioteca se aplican automáticamente al registro si existe un campo `source` o `ddsource`. Por ejemplo, si un registro tiene `source:mysql`, el analizador aplica las reglas de la biblioteca MySQL a ese registro. Para explorar todas las reglas de biblioteca disponibles, haga clic en {{< ui >}}View Library Rules{{< /ui >}} en el procesador Grok Parser. Puede buscar en la tabla de reglas de biblioteca y hacer clic en cualquier regla para obtener una vista previa de cómo se aplica a sus registros.

También puede agregar reglas de biblioteca cuando crea una regla personalizada. Consulte [Crear una regla de parseo personalizada o asistida por IA](#create-an-ai-assisted-or-custom-parsing-rule) para obtener más información.

## Métricas
 {#health-metrics}

Para [métricas de componentes][4] y [métricas de búfer de procesador][5] emitidas por todos los procesadores, consulte la documentación de [Métricas de uso de Pipelines][6]. Para filtrar o agrupar por métricas del procesador de parseo, utilice la etiqueta `component_type:parse`.

[1]: /es/logs/log_configuration/parsing/

[2]: /es/logs/log_configuration/parsing/?tab=matchers#using-helper-rules-to-reuse-common-patterns

[3]: /es/observability_pipelines/search_syntax/logs/

[4]: /es/observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/#component-metrics

[5]: /es/observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/#processor-buffer-metrics

[6]: /es/observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/


## Lecturas adicionales
 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}