---
aliases:
- /es/developers/metrics/agent_metrics_submission/
- /es/metrics/agent_metrics_submission
description: Envíe métricas personalizadas desde una verificación personalizada del
  Agent mediante las funciones count, gauge, histogram y rate.
further_reading:
- link: /extend/custom_checks/write_agent_check/
  tag: Documentación
  text: Escriba una verificación personalizada del Agent
title: 'Envío de métricas: verificación personalizada del Agent'
---
Las funciones se utilizan para enviar métricas con una [verificación personalizada del Agent][1]. Hay diferentes funciones disponibles según el [tipo de métrica][2]. Dependiendo de la función utilizada, el envío y el tipo de métrica real almacenado en Datadog podrían diferir.

## Funciones {#functions}

{{< tabs >}}
{{% tab "RECUENTO" %}}

### `monotonic_count()` {#monotonic-count}

Esta función se utiliza para realizar un seguimiento de una métrica COUNT sin procesar que siempre aumenta. El Datadog Agent calcula la diferencia entre cada envío. Las muestras que tienen un valor menor que la muestra anterior se ignoran. Los valores más bajos generalmente indican que la métrica COUNT sin procesar subyacente se ha restablecido. La función se puede llamar varias veces durante la ejecución de una verificación.

Por ejemplo, enviar las muestras 2, 3, 6, 7 envía un valor de 5 (7-2) durante la primera ejecución de la verificación. Enviar las muestras 10, 11 en la misma `monotonic_count` envía un valor de 4 (11-7) durante la segunda ejecución de la verificación.

**Nota**: Las métricas enviadas con esta función se almacenan con un tipo de métrica `COUNT` en Datadog. Cada valor de las series temporales almacenadas representa la diferencia entre los valores de la métrica en dos muestras (sin normalización por tiempo).

Plantilla de función:

```python
self.monotonic_count(name, value, tags=None, hostname=None, device_name=None)
```

| Parámetro     | Tipo            | Requerido | Valor predeterminado | Descripción                                                                         |
|---------------|-----------------|----------|---------------|-------------------------------------------------------------------------------------|
| `name`        | Cadena          | Sí      | -             | El nombre de la métrica.                                                             |
| `value`       | Flotante        | Sí       | -             | El valor de la métrica.                                                           |
| `tags`        | Lista de cadenas | No       | -             | Una lista de etiquetas para asociar con esta métrica.                                       |
| `hostname`    | Cadena          | No       | Servidor actual  | Un nombre de servidor para asociar con esta métrica.                                           |
| `device_name` | Cadena          | No       | -             | Obsoleto. En su lugar, agrega una etiqueta con el formato `device:<DEVICE_NAME>` a la lista de etiquetas. |

### `count()` {#count}

Esta función envía el número de eventos que ocurrieron durante el intervalo de verificación. Puede llamarse varias veces durante la ejecución de una verificación, y cada muestra se suma al valor que se envía.

**Nota**: Las métricas enviadas con esta función se almacenan con un tipo de métrica `COUNT` en Datadog.

Plantilla de función:

```python
self.count(name, value, tags=None, hostname=None, device_name=None)
```

| Parámetro     | Tipo            | Requerido | Valor predeterminado | Descripción                                                                         |
|---------------|-----------------|----------|---------------|-------------------------------------------------------------------------------------|
| `name`        | Cadena          | Sí      | -             | El nombre de la métrica.                                                             |
| `value`       | Flotante        | Sí       | -             | El valor de la métrica.                                                           |
| `tags`        | Lista de cadenas | No       | -             | Una lista de etiquetas para asociar con esta métrica.                                       |
| `hostname`    | Cadena          | No       | servidor actual  | Un nombre de servidor para asociar con esta métrica.                                           |
| `device_name` | Cadena          | No       | -             | Obsoleto. En su lugar, agrega una etiqueta con el formato `device:<DEVICE_NAME>` a la lista de etiquetas. |

{{% /tab %}}
{{% tab "Gauge" %}}

### `gauge()` {#gauge}

Esta función envía el valor de una métrica en una marca de tiempo determinada. Si se llama varias veces durante la ejecución de una verificación para una métrica, solo se utiliza la última muestra.

**Nota**: Las métricas enviadas con esta función se almacenan con un tipo de métrica `GAUGE` en Datadog.

Plantilla de función:

```python
self.gauge(name, value, tags=None, hostname=None, device_name=None)
```

| Parámetro     | Tipo            | Requerido | Valor predeterminado | Descripción                                                                         |
|---------------|-----------------|----------|---------------|-------------------------------------------------------------------------------------|
| `name`        | Cadena          | Sí      | -             | El nombre de la métrica.                                                             |
| `value`       | Flotante        | Sí       | -             | El valor de la métrica.                                                           |
| `tags`        | Lista de cadenas | No       | -             | Una lista de etiquetas para asociar con esta métrica.                                       |
| `hostname`    | Cadena          | No       | servidor actual  | Un nombre de servidor para asociar con esta métrica.                                           |
| `device_name` | Cadena          | No       | -             | Obsoleto. En su lugar, agrega una etiqueta con el formato `device:<DEVICE_NAME>` a la lista de etiquetas. |

{{% /tab %}}
{{% tab "TASA" %}}

### `rate()` {#rate}

Esta función envía el valor sin procesar muestreado de su métrica RATE. El Datadog Agent calcula la diferencia del valor de esa métrica entre dos envíos y la divide por el intervalo de envío para obtener la tasa. Esta función solo debe llamarse una vez durante una verificación; de lo contrario, descarta cualquier valor que sea menor que un valor enviado anteriormente.

**Nota**: Las métricas enviadas con esta función se almacenan como un tipo de métrica `GAUGE` en Datadog. Cada valor en las series temporales almacenadas es una diferencia normalizada en el tiempo del valor de la métrica entre muestras.

Plantilla de función:

```python
self.rate(name, value, tags=None, hostname=None, device_name=None)
```

| Parámetro     | Tipo            | Requerido | Valor predeterminado | Descripción                                                                         |
|---------------|-----------------|----------|---------------|-------------------------------------------------------------------------------------|
| `name`        | Cadena          | Sí      | -             | El nombre de la métrica.                                                             |
| `value`       | Flotante        | Sí       | -             | El valor de la métrica.                                                           |
| `tags`        | Lista de cadenas | No       | -             | Una lista de etiquetas para asociar con esta métrica.                                       |
| `hostname`    | Cadena          | No       | servidor actual  | Un nombre de servidor para asociar con esta métrica.                                           |
| `device_name` | Cadena          | No       | -             | Obsoleto. En su lugar, agrega una etiqueta con el formato `device:<DEVICE_NAME>` a la lista de etiquetas. |

{{% /tab %}}

{{% tab "Histogram" %}}

### `histogram()` {#histogram}

Esta función envía la muestra de una métrica de histograma que ocurrió durante el intervalo de verificación. Se puede llamar varias veces durante la ejecución de una verificación. Cada muestra se agrega a la distribución estadística del conjunto de valores para esta métrica.

**Nota**: Todas las agregaciones de métricas producidas se almacenan como un tipo de métrica `GAUGE` en Datadog, excepto el `<METRIC_NAME>.count` que se almacena como un tipo de métrica `RATE` en Datadog.

Plantilla de función:

```python
self.histogram(name, value, tags=None, hostname=None, device_name=None)
```

| Parámetro     | Tipo            | Requerido | Valor predeterminado | Descripción                                                                         |
|---------------|-----------------|----------|---------------|-------------------------------------------------------------------------------------|
| `name`        | Cadena          | Sí      | -             | El nombre de la métrica.                                                             |
| `value`       | Flotante        | Sí       | -             | El valor de la métrica.                                                           |
| `tags`        | Lista de cadenas | No       | -             | Una lista de etiquetas para asociar con esta métrica.                                       |
| `hostname`    | Cadena          | No       | servidor actual  | Un nombre de servidor para asociar con esta métrica.                                           |
| `device_name` | Cadena          | No       | -             | Obsoleto. En su lugar, agrega una etiqueta con el formato `device:<DEVICE_NAME>` a la lista de etiquetas. |

{{% /tab %}}
{{< /tabs >}}

## Tutorial {#tutorial}

Siga los pasos a continuación para crear una [verificación personalizada del Agent][2] que envíe periódicamente todos los tipos de métricas:

1. Cree el directorio `metrics_example.d/` en la carpeta `conf.d/` en la raíz de su [directorio de configuración del Agent][3].

2. En la carpeta `metrics_example.d/`, cree un archivo de configuración vacío llamado `metrics_example.yaml` con el siguiente contenido:

    ```yaml
    instances: [{}]
    ```

3. Un nivel arriba de la carpeta `conf.d/`, vaya a la carpeta `checks.d/`. Cree un archivo de verificación personalizada llamado `metrics_example.py` con el contenido a continuación:

    ```python
    import random

    from datadog_checks.base import AgentCheck

    __version__ = "1.0.0"

    class MyClass(AgentCheck):
        def check(self, instance):
            self.count(
                "example_metric.count",
                2,
                tags=["env:dev","metric_submission_type:count"],
            )
            self.count(
                "example_metric.decrement",
                -1,
                tags=["env:dev","metric_submission_type:count"],
            )
            self.count(
                "example_metric.increment",
                1,
                tags=["env:dev","metric_submission_type:count"],
            )
            self.rate(
                "example_metric.rate",
                1,
                tags=["env:dev","metric_submission_type:rate"],
            )
            self.gauge(
                "example_metric.gauge",
                random.randint(0, 10),
                tags=["env:dev","metric_submission_type:gauge"],
            )
            self.monotonic_count(
                "example_metric.monotonic_count",
                2,
                tags=["env:dev","metric_submission_type:monotonic_count"],
            )

            # Calling the functions below twice simulates
            # several metrics submissions during one Agent run.
            self.histogram(
                "example_metric.histogram",
                random.randint(0, 10),
                tags=["env:dev","metric_submission_type:histogram"],
            )
            self.histogram(
                "example_metric.histogram",
                random.randint(0, 10),
                tags=["env:dev","metric_submission_type:histogram"],
            )
    ```

4. [Reinicie el Agent][4].
5. Valide que su verificación personalizada se esté ejecutando correctamente con el [subcomando de estado del Agent][5]. Busque `metrics_example` en la sección {{< ui >}}Checks{{< /ui >}}:

    ```text
    =========
    Collector
    =========

      Running Checks
      ==============

        (...)

        metrics_example (1.0.0)
        -----------------------
          Instance ID: metrics_example:d884b5186b651429 [OK]
          Total Runs: 2
          Metric Samples: Last Run: 8, Total: 16
          Events: Last Run: 0, Total: 0
          Service Checks: Last Run: 0, Total: 0
          Average Execution Time : 2ms

        (...)
    ```

6. Verifique que sus métricas se estén reportando a Datadog en su [página Metrics Catalog][6].

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/extend/custom_checks/write_agent_check/
[2]: /es/metrics/types/
[3]: /es/agent/configuration/agent-configuration-files/#agent-configuration-directory
[4]: /es/agent/configuration/agent-commands/#restart-the-agent
[5]: /es/agent/configuration/agent-commands/#agent-information
[6]: https://app.datadoghq.com/metric/catalog