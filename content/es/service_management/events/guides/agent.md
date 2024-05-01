---
aliases:
- /es/events/agent/
- /es/events/guides/agent
further_reading:
- link: /developers/custom_checks/write_agent_check/
  tag: Documentación
  text: Escribir un check del Agent personalizado
kind: guía
title: Eventos con un check del Agent personalizado
---

## Envío

Para enviar un evento desde un check del Agent personalizado utiliza la función `event(<EVENT_DICT>)`:

```text
self.event(
            {
              "timestamp": <TIMESTAMP_EPOCH>,
              "event_type": "<EVENT_NAME>",
              "msg_title": "<TITLE>",
              "msg_text": "<MESSAGE>",
              "aggregation_key": "<AGGREGATION_KEY>",
              "alert_type": "<ALERT_TYPE>",
              "source_type_name": "<SOURCE_TYPE>",
              "host": "<HOSTNAME>",
              "tags": ["<TAGS>"],
              "priority": "<PRIORITY>"
            }
)
```

Las siguientes claves y tipos de datos se encuentran disponibles en el diccionario de eventos:

| Clave                | Tipo            | Obligatorio | Descripción                                                   |
|--------------------|-----------------|----------|---------------------------------------------------------------|
| `timestamp`        | Entero         | Sí      | La marca de tiempo de la época del evento                             |
| `event_type`       | Cadena          | Sí      | El nombre del evento                                                |
| `msg_title`        | Cadena          | Sí      | El título del evento                                        |
| `msg_text`         | Cadena          | Sí      | El cuerpo del texto del evento                                    |
| `aggregation_key`  | Cadena          | No       | Una clave para agregar eventos                           |
| `alert_type`       | Cadena          | No       | `error`, `warning`, `success` o `info` (por defecto `info`) |
| `source_type_name` | Cadena          | No       | El nombre del tipo de fuente                                     |
| `host`             | Cadena          | No       | El nombre del host                                                 |
| `tags`             | Lista de cadenas | No       | Un lista de etiquetas asociadas a este evento                    |
| `priority`         | Cadena          | No       | Especifica la prioridad del evento (`normal` o `low`)      |

### Ejemplo

Este es un ejemplo del uso de un check del Agent personalizado para enviar un evento de manera periódica. Consulta la sección de [Escribir un check del Agent personalizado][1] para obtener más detalles.

1. Crea un directorio `event_example.d/` nuevo en la carpeta `conf.d/` en la raíz del [directorio de configuración del Agent][2].

2. En la carpeta `event_example.d/`, crea un archivo de configuración llamado `event_example.yaml` con el siguiente contenido:

    ```yaml
    instances: [{}]
    ```

3. Sube un nivel desde la carpeta `conf.d/` y dirígete a la carpeta `checks.d/`.
4. En esta carpeta, crea un archivo de check personalizado llamado `event_example.py` con el siguiente contenido:

    {{< code-block lang="python" filename="event_example.py" >}}
    from datadog_checks.base import AgentCheck

    __version__ = "1.0.0"

    class MyClass(AgentCheck):
        def check(self, instance):
            self.event(
                {
                    "timestamp": time.time(),
                    "event_type": "Error",
                    "msg_title": "Example Event",
                    "msg_text": "This is an example event coming from Datadog.",
                    "alert_type": "error",
                }
            )
    {{< /code-block >}}

5. [Reinicia el Agent][3].
6. Para la validación, ejecuta el [comando de estado del Agent][4] y busca `event_example` en la sección de Checks:

    ```
    =========
    Collector
    =========

      Running Checks
      ==============

        (...)

        event_example (1.0.0)
        ---------------------
          Instance ID: event_example:d884b5186b651429 [OK]
          Total Runs: 2
          Metric Samples: Last Run: 0, Total: 0
          Events: Last Run: 1, Total: 2
          Service Checks: Last Run: 0, Total: 0
          Average Execution Time : 0s

        (...)
    ```

## Leer más

{{< partial name="whats-next/whats-next.html" >}}


[1]: /es/developers/custom_checks/write_agent_check/
[2]: /es/agent/configuration/agent-configuration-files/#agent-configuration-directory
[3]: /es/agent/configuration/agent-commands/#restart-the-agent
[4]: /es/agent/configuration/agent-commands/#agent-information