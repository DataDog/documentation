---
further_reading:
- link: /opentelemetry/otel_tracing/
  tag: Documentación
  text: Envío de traces (trazas) de OpenTelemetry a Datadog
title: Correlaciona traces (trazas) de OpenTelemetry y DBM
---

## Información general

Database Monitoring (DBM) de Datadog correlaciona las traces (trazas) de backend de tu aplicación instrumentada en OpenTelemetry con datos detallados sobre el rendimiento de la base de datos. Esto te permite vincular spans (tramos) de tu aplicación con métricas de consulta y planes de ejecución relacionados, lo que te ayuda a identificar las consultas exactas que están ralentizando tus servicios.

## Requisitos

Antes de empezar, asegúrate de haber configurado el [etiquetado unificado de servicios][1]. Esto es necesario para todas las correlaciones de datos en Datadog.

## Configuración

Para correlacionar traces (trazas) y métricas, debes:

1. **Instrumentar spans (tramos) de la base de datos**: Añade atributos específicos de OpenTelemetry a tus spans (tramos) de base de datos para permitir la correlación con DBM.

2. **Configurar la ruta de ingesta de traces (trazas)**: Activa la puerta de función correcta en tu recopilador o Agent para garantizar que los spans (tramos) de base de datos se procesen correctamente para DBM.

### Step (UI) / paso (generic) 1: Instrumenta tu base de datos

Para que la correlación de DBM funcione, los spans (tramos) de tu base de datos deben incluir los siguientes atributos.


| Atributo      | ¿Es obligatorio? | Descripción                                                                                                       | Ejemplo                                 |
|----------------|-----------|:------------------------------------------------------------------------------------------------------------------|-----------------------------------------|
| `db.system`    | Sí       | La tecnología de bases de datos.                                                                                          | `postgres`, `mysql`, `sqlserver`        |
| `db.statement` | Sí       | El texto de la consulta de SQL sin procesar. Datadog lo utiliza para configurar el nombre del recurso del span (tramo) después de la ofuscación y la normalización.    | `SELECT * FROM users WHERE id = ?`      |
| `span.type`    | Sí*      | **(Datadog-específico)** Identifica los spans (tramos) de la base de datos. *Derivado automáticamente de otros atributos de OpenTelemetry según las [reglas de asignación de tipos de spans (tramos)][6]. Configúralo manualmente solo cuando crees spans (tramos) directamente con un kit de desarrollo de software (SDK). | `sql`, `postgres`, `mysql`, `sql.query` |
| `db.name`      | No        | La base de datos lógica o el nombre del esquema que se está consultando.                                                                | `user_accounts`                         |

<div class="alert alert-info">
El atributo de <code>span.type</code> es una convención específica de Datadog para identificar y procesar los spans (tramos) de la base de datos.
Cuando se utiliza la autoinstrumentación de OpenTelemetry o el Datadog Agent, este atributo se configura automáticamente.
Añádelo manualmente solo si estás instrumentando spans (tramos) directamente con el kit de desarrollo de software (SDK).
</div>

#### Utilización de la instrumentación automática

Para empezar, instrumenta tu aplicación utilizando la biblioteca de autoinstrumentación de OpenTelemetry apropiada para tu lenguaje. Para obtener instrucciones de configuración, consulta la [documentación de instrumentación de OpenTelemetry][4] oficial.

Estas bibliotecas añaden automáticamente los atributos `db.system` y `db.statement` necesarios. A continuación, el Datadog Agent o el kit de desarrollo de software (SDK) obtienen `span.type` automáticamente, por lo que no es necesario configurar manualmente los atributos.

{{% collapse-content title="Set attributes manually (advanced)" level="h4" %}}
Si tu entorno incluye un cliente de base de datos personalizado o spans (tramos) no reconocidos por la biblioteca, puedes enriquecerlos con el procesador `attributes` del recopilador de OpenTelemetry.

Por ejemplo, puedes añadir `span.type: sql` a cualquier span (tramo) que tenga el atributo `db.system`:

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

#### Utilización de instrumentación manual

Si estás creando spans (tramos) manualmente con kit de desarrollo de software (SDK) de OpenTelemetry, puedes configurar los atributos directamente en tu código. Para obtener más información, consulta la [documentación de OpenTelemetry][4].

A continuación se muestra un ejemplo conceptual de instrumentación manual con el kit de desarrollo de software (SDK) de OpenTelemetry de Python:

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

### Step (UI) / paso (generic) 2: Configurar tu ruta de ingesta

Según cómo envíes las traces (trazas) a Datadog, puede que necesites activar puertas de función específicas para asegurarte de que los spans (tramos) de base de datos se procesen correctamente.

{{< tabs >}}
{{% tab "Datadog Agent (Datadog distribution of OpenTelemetry (DDOT) Collector)" %}}


Si utilizas el gráfico de Helm de Datadog (v3.107.0 o posterior), configura la puerta de función en tu `values.yaml`:

```yaml
datadog:
  otelCollector:
    featureGates: "datadog.EnableReceiveResourceSpansV2,datadog.EnableOperationAndResourceNameV2"
```

{{% /tab %}}
{{% tab "Recopilador de OpenTelemetry" %}}

Al iniciar el recopilador, debes activar la puerta de función correcta para tu versión.

#### Recopilador v0.124.0 y posteriores

En las versiones recientes del recopilador, activa la puerta de función `datadog.EnableOperationAndResourceNameV2`:

```sh
otelcontribcol --config=config.yaml \
--feature-gates=datadog.EnableOperationAndResourceNameV2
```
#### Recopilador v0.118.0 - v0.123.0

Para las versiones anteriores del recopilador, se requieren las dos puertas de funciones siguientes:

```sh
otelcontribcol --config=config.yaml \
--feature-gates=datadog.EnableReceiveResourceSpansV2,datadog.EnableOperationAndResourceNameV2
```

{{% /tab %}}

{{% tab "Datadog Agent (Ingesta de OpenTelemetry Protocol)" %}}

En tu configuración del Datadog Agent, asegúrate de que la variable de entorno `DD_APM_FEATURES` incluya `enable_operation_and_resource_name_logic_v2`.

{{% /tab %}}

{{< /tabs >}}

### Visualizar datos correlacionados en Datadog

Después de que tu aplicación envíe traces (trazas), podrás ver la correlación en la vista de traces (trazas) de APM:

1. Ve a [**APM** > **Traces**][3] (APM > Traces (trazas).
2. Busca y haz clic en una trace (traza) de tu servicio instrumentado.
3. En el gráfico de llamas de la trace (traza), selecciona un span (tramo) de base de datos (por ejemplo, un span (tramo) con `span.type: sql`)
4. En el panel de detalles, haz clic en la pestaña **SQL Queries** (Consultas SQL). Deberías ver las métricas de rendimiento y los planes de ejecución de la consulta.

## Solucionar problemas

Si no ves la correlación esperada entre tus traces (trazas) de APM y DBM, normalmente se debe a una falta de configuración o a una configuración incorrecta. Check las siguientes causas comunes:

- **Faltan atributos**: El span (tramo) de base de datos debe contener `db.system` y `db.statement`. El atributo `span.type` también es necesario, pero Datadog suele obtenerlo automáticamente.
- **Etiquetado incorrecto del servicio unificado**: La tag (etiqueta) `service` en los spans (tramos) de tu base de datos debe estar configurada. Comprueba que el [etiquetado de servicio unificado][1] esté configurado correctamente.
- **La consulta SQL puede no ser analizable**: La correlación se basa en la capacidad de Datadog para analizar la consulta SQL a partir del atributo `db.statement`. Si la consulta utiliza una sintaxis no estándar o compleja, el análisis puede fallar. Si sospechas que se trata de case (incidencia), [ponte en contacto con el servicio de asistencia de Datadog ][5] para obtener ayuda.
- **Las puertas de función correctas deben estar activadas** para tu ruta de ingesta de traces (trazas) específica, tal y como se describe en los pasos de configuración.

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/opentelemetry/correlate/#prerequisite-unified-service-tagging
[2]: /es/opentelemetry/integrations/host_metrics
[3]: https://app.datadoghq.com/apm/traces
[4]: https://opentelemetry.io/docs/languages/
[5]: /es/help
[6]: /es/opentelemetry/mapping/semantic_mapping/#span-type-mapping