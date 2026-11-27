---
further_reading:
- link: /opentelemetry/setup/
  tag: Documentación
  text: Enviar datos de OpenTelemetry a Datadog
title: Correlacione trazas de OpenTelemetry y DBM
---
## Descripción general {#overview}

Datadog Database Monitoring (DBM) correlaciona las trazas de backend de su aplicación instrumentada con OpenTelemetry con datos detallados de rendimiento de la base de datos. Esto le permite vincular tramos de su aplicación con métricas de consulta y planes de ejecución relacionados, ayudándole a identificar las consultas exactas que están ralentizando sus servicios.

## Requisitos {#requirements}

Antes de comenzar, asegúrese de haber configurado el [etiquetado de servicio unificado][1]. Esto es necesario para toda la correlación de datos en Datadog.

## Configuración {#setup}

Para correlacionar trazas y métricas, debe:

1. **Instrumente los tramos de base de datos**: Agregue atributos específicos de OpenTelemetry a sus tramos de base de datos para habilitar la correlación con DBM.

2. **Configure la ruta de ingesta de trazas**: Habilite el feature gate correcto en su Collector o Agent para asegurarse de que los tramos de base de datos se procesen correctamente para DBM.

### Paso 1: Instrumente sus tramos de base de datos {#step-1-instrument-your-database-spans}

Para que la correlación de DBM funcione, sus tramos de base de datos deben incluir los siguientes atributos.


| Atributo      | ¿Requerido? | Descripción                                                                                                       | Ejemplo                                 |
|----------------|-----------|:------------------------------------------------------------------------------------------------------------------|-----------------------------------------|
| `db.system`    | Sí       | La tecnología de base de datos.                                                                                          | `postgres`, `mysql`, `sqlserver`        |
| `db.statement` | Sí       | El texto de la consulta SQL sin procesar. Datadog utiliza esto para establecer el nombre del recurso del tramo después de la ofuscación y normalización.    | `SELECT * FROM users WHERE id = ?`      |
| `span.type`    | Sí*      | **(Específico de Datadog)** Identifica los tramos de base de datos. *Derivado automáticamente de otros atributos de OpenTelemetry de acuerdo con las [reglas de mapeo de tipos de tramo][6]. Solo configúrelo manualmente cuando cree tramos directamente con un SDK. | `sql`, `postgres`, `mysql`, `sql.query` |
| `db.name`      | No        | El nombre de la base de datos lógica o del esquema que se está consultando.                                                                | `user_accounts`                         |

<div class="alert alert-info">
El <code>span.type</code> El atributo es una convención específica de Datadog para identificar y procesar tramos de bases de datos.
Al usar la auto-instrumentación de OpenTelemetry o el Datadog Agent, este atributo se establece automáticamente.
Solo agréguelo manualmente si está instrumentando tramos directamente con el SDK.
</div>

#### Uso de auto-instrumentación {#using-auto-instrumentation}

Para comenzar, instrumente su aplicación usando la biblioteca de auto-instrumentación de OpenTelemetry adecuada para su lenguaje. Para obtener instrucciones de configuración, consulte la [documentación oficial de instrumentación de OpenTelemetry][4].

Estas bibliotecas agregan automáticamente los atributos `db.system` y `db.statement` requeridos. El Datadog Agent o el SDK derivan `span.type` automáticamente, por lo que no se necesita una configuración manual de atributos.

{{% collapse-content title="Establecer atributos manualmente (avanzado)" level="h5" %}}
Si su entorno involucra un cliente de base de datos personalizado o tramos no reconocidos por la biblioteca, puede enriquecerlos usando el procesador `attributes` del OpenTelemetry Collector.

Por ejemplo, puede agregar `span.type: sql` a cualquier tramo que tenga el atributo `db.system`:

```yaml
processors:
  attributes/add_span_type:
    actions:
      - key: span.type
        value: "sql"
        action: insert
        # Apply this action only to spans that have the db.system attribute
        from_context: span
        when:
          - span.attributes["db.system"] != nil

service:
  pipelines:
    traces:
      # Add the processor to your traces pipeline
      processors: [..., attributes/add_span_type, ...]
```
{{% /collapse-content %}}

#### Uso de instrumentación manual {#using-manual-instrumentation}

Si está creando tramos manualmente con el SDK de OpenTelemetry, puede establecer los atributos directamente en su código. Para obtener más información, consulte la [documentación de OpenTelemetry][4].

El siguiente es un ejemplo conceptual de instrumentación manual usando el SDK de OpenTelemetry para Python:

```python
from opentelemetry import trace

tracer = trace.get_tracer("my-app.instrumentation")

# When making a database call, create a span and set attributes
with tracer.start_as_current_span("postgres.query") as span:
    # Set attributes required for DBM correlation
    span.set_attribute("span.type", "sql")
    span.set_attribute("db.system", "postgres")
    span.set_attribute("db.statement", "SELECT * FROM users WHERE id = ?")
    span.set_attribute("db.name", "user_accounts")

    # Your actual database call would go here
    # db_cursor.execute("SELECT * FROM users WHERE id = %s", (user_id,))
```

### Paso 2: Configure su ruta de ingesta {#step-2-configure-your-ingest-path}

Dependiendo de cómo envíe las trazas a Datadog, es posible que deba habilitar feature gates específicos para asegurarse de que los tramos de la base de datos se procesen correctamente.

{{< tabs >}}
{{% tab "Datadog Agent (Collector del Agent)" %}}


Si está utilizando el chart de Helm de Datadog (v3.107.0 o posterior), configure el feature gate en su `values.yaml`:

```yaml
datadog:
  otelCollector:
    featureGates: "datadog.EnableReceiveResourceSpansV2,datadog.EnableOperationAndResourceNameV2"
```

{{% /tab %}}
{{% tab "Colector de OTel" %}}

Al iniciar el Collector, debe habilitar el feature gate correcto para su versión.

#### Collector v0.124.0 y posterior {#collector-v01240-and-later}

Para versiones recientes del Collector, habilite el feature gate `datadog.EnableOperationAndResourceNameV2`:

```sh
otelcontribcol --config=config.yaml \
--feature-gates=datadog.EnableOperationAndResourceNameV2
```
#### Collector v0.118.0 - v0.123.0 {#collector-v01180-v01230}

Para versiones anteriores del Collector, se requieren ambos feature gates siguientes:

```sh
otelcontribcol --config=config.yaml \
--feature-gates=datadog.EnableReceiveResourceSpansV2,datadog.EnableOperationAndResourceNameV2
```

{{% /tab %}}

{{% tab "Datadog Agent (OTLP Ingest)" %}}

En la configuración de su Datadog Agent, asegúrese de que la variable de entorno `DD_APM_FEATURES` incluya `enable_operation_and_resource_name_logic_v2`.

{{% /tab %}}

{{< /tabs >}}

### Ver datos correlacionados en Datadog {#view-correlated-data-in-datadog}

Una vez que su aplicación esté enviando trazas, puede ver la correlación en APM Trace View:

1. Navegue a [{{< ui >}}APM{{< /ui >}} > {{< ui >}}Traces{{< /ui >}}][3].
2. Busque y haga clic en una traza de su servicio instrumentado.
3. En el gráfico de llama de la traza, seleccione un tramo de base de datos (por ejemplo, un tramo con `span.type: sql`)
4. En el panel de detalles, haga clic en la pestaña {{< ui >}}SQL Queries{{< /ui >}}. Debería ver métricas de rendimiento y planes de ejecución para la consulta.

## Niveles de correlación {#correlation-levels}

La correlación de DBM para trazas de OpenTelemetry funciona en dos niveles:

- **Correlación a nivel de sentencia**: Vincula una muestra de consulta o un plan de ejecución con la firma de consulta calculada a partir de `db.statement`. Esto funciona automáticamente después de completar los pasos de configuración anteriores.
- **Correlación a nivel de servicio**: completa la pestaña {{< ui >}}Databases{{< /ui >}} y la lista {{< ui >}}Calling Services{{< /ui >}} en una página de instancia de base de datos, vinculando una consulta al servicio que la emitió. Esto requiere un comentario SQL que contenga metadatos del servicio en la consulta.

Los SDK de Datadog añaden este comentario automáticamente. La instrumentación automática de OpenTelemetry no lo hace, por lo que la correlación a nivel de servicio requiere añadir el comentario manualmente:

```sql
/*dddbs='<service>',dde='<env>',ddps='<service>',ddpv='<version>'*/ SELECT * FROM users WHERE id = ?
```

| Campo   | Descripción                       |
|---------|------------------------------------|
| `dddbs` | El nombre del servicio que emite la consulta. |
| `dde`   | El entorno del servicio.    |
| `ddps`  | El nombre del servicio principal.           |
| `ddpv`  | La versión del servicio.        |

Sin este comentario, una instancia de base de datos no muestra los servicios que la llaman. La página de servicio de APM no muestra ninguna sección de base de datos, incluso cuando la correlación a nivel de sentencia está funcionando.

### Procedimientos almacenados {#stored-procedures}

La correlación no es compatible con llamadas a procedimientos almacenados (por ejemplo, `CALL my_procedure()`). El tramo registra la llamada al procedimiento en sí, mientras que DBM captura las sentencias SQL individuales que el procedimiento ejecuta internamente. Estas dos representaciones no coinciden, por lo que DBM no puede vincular el tramo a las sentencias que ejecuta el procedimiento.

## Solución de problemas {#troubleshooting}

Si no ve la correlación esperada entre sus trazas de APM y DBM, generalmente se debe a una configuración faltante o incorrecta. Verifique las siguientes causas comunes:

- **Atributos faltantes**: El tramo de la base de datos debe contener `db.system` y `db.statement`. El atributo `span.type` también es obligatorio, pero generalmente Datadog lo deriva automáticamente.
- **Etiquetado de servicio unificado incorrecto**: La etiqueta `service` en sus tramos de base de datos debe estar configurada. Verifique que el [etiquetado de servicio unificado][1] esté configurado correctamente.
- **Es posible que la consulta SQL no sea analizable**: La correlación depende de la capacidad de Datadog para analizar la consulta SQL del atributo `db.statement`. Si la consulta utiliza una sintaxis compleja o no estándar, es posible que falle el parseo. Si sospecha que este es el caso, [comuníquese con el soporte de Datadog][5] para obtener ayuda.
- **Se deben habilitar los feature gates correctos** para su ruta específica de ingesta de trazas, tal como se describe en los pasos de configuración.
- **No hay servicios que realicen llamadas o la sección de base de datos está vacía en la página de servicio de APM**: OpenTelemetry no inyecta comentarios SQL automáticamente. Consulte [Niveles de correlación](#correlation-levels) para agregarlos manualmente.

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/opentelemetry/correlate/#prerequisite-unified-service-tagging
[2]: /es/opentelemetry/integrations/host_metrics
[3]: https://app.datadoghq.com/apm/traces
[4]: https://opentelemetry.io/docs/languages/
[5]: /es/help
[6]: /es/opentelemetry/mapping/semantic_mapping/#span-type-mapping