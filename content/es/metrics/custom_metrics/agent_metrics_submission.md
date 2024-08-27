---
aliases:
- /es/developers/metrics/agent_metrics_submission/
- /es/metrics/agent_metrics_submission
further_reading:
- link: /developers/custom_checks/write_agent_check/
  tag: Documentación
  text: Escritura de un check personalizado del Agent
title: 'Envío de métricas: Check personalizado del Agent'
---

Las funciones se utilizan para enviar métricas con un [check personalizado del Agent][1]. Existen diferentes funciones disponibles según el [tipo de métrica][2]. Dependiendo de la función utilizada, el tipo de envío y el tipo de métrica real almacenada en Datadog pueden variar.

## Funciones

{{< tabs >}}
{{% tab "Count" %}}

### `monotonic_count()`

Esta función se utiliza para realizar el seguimiento de una métrica COUNT sin procesar que siempre aumenta. El Datadog Agent calcula el delta entre cada envío. Las muestras que tienen un valor más bajo que la muestra anterior se ignoran. Los valores más bajos suelen indicar que la métrica COUNT sin procesar subyacente se ha reiniciado. La función puede ser llamada varias veces durante la ejecución de un check.

Por ejemplo, al enviar las muestras 2, 3, 6, 7, se envía un valor de 5 (7-2) durante la primera ejecución del check. El envío de las muestras 10, 11, en el mismo `monotonic_count`, envía un valor de 4 (11-7) durante la segunda ejecución del check.

**Nota**: Las métricas enviadas con esta función se almacenan con un tipo de métrica `COUNT` en Datadog. Cada valor de la serie temporal almacenada es un delta del valor de la métrica entre muestras (no normalizadas en el tiempo).

Plantilla de funciones:

```python
self.monotonic_count(name, value, tags=None, hostname=None, device_name=None)
```

| Parámetro     | Tipo            | Obligatorio | Valor por defecto | Descripción                                                                         |
|---------------|-----------------|----------|---------------|-------------------------------------------------------------------------------------|
| `name`        | Cadena          | Sí      | -             | Nombre de la métrica.                                                             |
| `value`       | Flotante           | Sí      | -             | Valor de la métrica.                                                           |
| `tags`        | Lista de cadenas | No       | -             | Lista de etiquetas (tags) para asociar a esta métrica.                                       |
| `hostname`    | Cadena          | No       | Host actual  | Nombre de host para asociar a esta métrica.                                           |
| `device_name` | Cadena          | No       | -             | Obsoleto. Añade una etiqueta con la forma `device:<DEVICE_NAME>` a la lista de etiquetas, en su lugar. |

### `count()`

Esta función envía el número de eventos que han ocurrido durante el intervalo del check. Es posible llamarla varias veces durante la ejecución de un check, y cada muestra se añade al valor que se envía.

**Nota**: Las métricas enviadas con esta función se almacenan con un tipo de métrica `COUNT` en Datadog. Cada valor de la serie temporal almacenada es un delta del valor de la métrica entre muestras (no normalizadas en el tiempo).

Plantilla de funciones:

```python
self.count(name, value, tags=None, hostname=None, device_name=None)
```

| Parámetro     | Tipo            | Obligatorio | Valor por defecto | Descripción                                                                         |
|---------------|-----------------|----------|---------------|-------------------------------------------------------------------------------------|
| `name`        | Cadena          | Sí      | -             | Nombre de la métrica.                                                             |
| `value`       | Flotante           | Sí      | -             | Valor de la métrica.                                                           |
| `tags`        | Lista de cadenas | No       | -             | Lista de etiquetas para asociar a esta métrica.                                       |
| `hostname`    | Cadena          | No       | Host actual  | Nombre de host para asociar a esta métrica.                                           |
| `device_name` | Cadena          | No       | -             | Obsoleto. Añade una etiqueta con el formato `device:<DEVICE_NAME>` a la lista de etiquetas, en su lugar. |

{{% /tab %}}
{{% tab "Gauge" %}}

### `gauge()`

Esta función envía el valor de una métrica en una marca de tiempo dada. Si se la llama varias veces durante la ejecución de un check de una métrica, sólo se utiliza la última muestra.

**Nota**: Las métricas enviadas con esta función se almacenan con un tipo de métrica `GAUGE` en Datadog.

Plantilla de funciones:

```python
self.gauge(name, value, tags=None, hostname=None, device_name=None)
```

| Parámetro     | Tipo            | Obligatorio | Valor por defecto | Descripción                                                                         |
|---------------|-----------------|----------|---------------|-------------------------------------------------------------------------------------|
| `name`        | Cadena          | Sí      | -             | Nombre de la métrica.                                                             |
| `value`       | Flotante           | Sí      | -             | Valor de la métrica.                                                           |
| `tags`        | Lista de cadenas | No       | -             | Lista de etiquetas para asociar a esta métrica.                                       |
| `hostname`    | Cadena          | No       | Host actual  | Nombre de host para asociar a esta métrica.                                           |
| `device_name` | Cadena          | No       | -             | Obsoleto. Añade una etiqueta con el formato `device:<DEVICE_NAME>` a la lista de etiquetas, en su lugar. |

{{% /tab %}}
{{% tab "Rate" %}}

### `rate()`

Esta función envía el valor sin procesar muestreado de tu métrica RATE. El Datadog Agent calcula el delta del valor de esa métrica entre dos envíos y lo divide por el intervalo de envío para obtener la frecuencia. Esta función sólo debe invocarse una vez durante un check, de lo contrario desecha cualquier valor que sea menor que un valor enviado previamente.

**Nota**: Las métricas enviadas con esta función se almacenan con un tipo de métrica `GAUGE` en Datadog. Cada valor de la serie temporal almacenada es un delta del valor de la métrica entre muestras.

Plantilla de funciones:

```python
self.rate(name, value, tags=None, hostname=None, device_name=None)
```

| Parámetro     | Tipo            | Obligatorio | Valor por defecto | Descripción                                                                         |
|---------------|-----------------|----------|---------------|-------------------------------------------------------------------------------------|
| `name`        | Cadena          | Sí      | -             | Nombre de la métrica.                                                             |
| `value`       | Flotante           | Sí      | -             | Valor de la métrica.                                                           |
| `tags`        | Lista de cadenas | No       | -             | Lista de etiquetas para asociar a esta métrica.                                       |
| `hostname`    | Cadena          | No       | Host actual  | Nombre de host para asociar a esta métrica.                                           |
| `device_name` | Cadena          | No       | -             | Obsoleto. Añade una etiqueta con el formato `device:<DEVICE_NAME>` a la lista de etiquetas, en su lugar. |

{{% /tab %}}

{{% tab "Histogram" %}}

### `histogram()`

Esta función envía la muestra de una métrica histogram que ha ocurrido durante el intervalo del check. Es posible llamarla varias veces durante la ejecución de un check, y cada muestra se añade a la distribución estadística del conjunto de valores para esta métrica.

**Nota**: Todas las agregaciones de métricas producidas se almacenan como un tipo de métrica `GAUGE` en Datadog, excepto `<METRIC_NAME>.count` que se almacena como un tipo de métrica `RATE` en Datadog.

Plantilla de funciones:

```python
self.histogram(name, value, tags=None, hostname=None, device_name=None)
```

| Parámetro     | Tipo            | Obligatorio | Valor por defecto | Descripción                                                                         |
|---------------|-----------------|----------|---------------|-------------------------------------------------------------------------------------|
| `name`        | Cadena          | Sí      | -             | Nombre de la métrica.                                                             |
| `value`       | Flotante           | Sí      | -             | Valor de la métrica.                                                           |
| `tags`        | Lista de cadenas | No       | -             | Lista de etiquetas para asociar a esta métrica.                                       |
| `hostname`    | Cadena          | No       | Host actual  | Nombre de host para asociar a esta métrica.                                           |
| `device_name` | Cadena          | No       | -             | Obsoleto. Añade una etiqueta con el formato `device:<DEVICE_NAME>` a la lista de etiquetas, en su lugar. |

{{% /tab %}}
{{< /tabs >}}

## Tutorial

Sigue los pasos que se indican a continuación para crear un [check del Agent personalizado][2] que envíe todos los tipos de métricas periódicamente:

1. Crea el directorio `metrics_example.d/` en la carpeta `conf.d/` en la raíz de tu [directorio de configuración del Agent][3].

2. En la carpeta `metrics_example.d/`, crea un archivo de configuración vacío llamado `metrics_example.yaml` con el siguiente contenido:

    ```yaml
    instances: [{}]
    ```

3. Subiendo un nivel desde la carpeta `conf.d/`, ve a la carpeta `checks.d/`. Crea un archivo de check personalizado llamado `metrics_example.py` con el siguiente contenido:

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

4. [Reinicia el Agent][4].
5. Comprueba que tu check personalizado se está ejecutando correctamente con el [subcomando de estado del Agent][5]. Busca `metrics_example` en la sección Checks:

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

6. Comprueba que tus métricas están informando a Datadog en tu página [Resumen de métricas][6].

## Leer más

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/developers/custom_checks/write_agent_check/
[2]: /es/metrics/types/
[3]: /es/agent/configuration/agent-configuration-files/#agent-configuration-directory
[4]: /es/agent/configuration/agent-commands/#restart-the-agent
[5]: /es/agent/configuration/agent-commands/#agent-information
[6]: https://app.datadoghq.com/metric/summary