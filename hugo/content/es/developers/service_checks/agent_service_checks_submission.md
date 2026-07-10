---
further_reading:
- link: /developers/custom_checks/write_agent_check/
  tag: Documentación
  text: Escribir un check personalizado del Agent
title: 'Envío de checks de servicios: Check del Agent'
---

Para enviar un check de servicio a Datadog dentro de un check personalizado del Agent, utiliza la función predefinids `service_check()` en la clase `Agentcheck`.

```python
self.service_check(name, status, tags=None, hostname=None, message=None)
```

A continuación, encontrarás los distintos parámetros y tipos de datos disponibles para la función `service_check()`:

| Parámetro  | Tipo            | Obligatorio | Valor por defecto | Descripción                                                                                                   |
|------------|-----------------|----------|---------------|---------------------------------------------------------------------------------------------------------------|
| `name`     | Cadena          | Sí      | -             | Nombre del check de servicio.                                                                                |
| `status`   | Int             | Sí      | -             | Constante que describe el estado del servicio: `0` para OK (Normal), `1` para WARN (Advertencia), `2` para CRITICAL (Crítico) y `3` para UNKNOWN (Desconocido). |
| `tags`     | Lista de cadenas | No       | `None`        | Lista de etiquetas (tags) para asociar al check de servicio.                                                          |
| `hostname` | Cadena          | No       | Host actual  | Nombre de host para asociar al check de servicio. Por defecto es el host actual.                                |
| `message`  | Cadena          | No       | `None`        | Información adicional o una descripción de por qué se ha producido este estado.                                          |

## Ejemplo

El siguiente es un ejemplo de un check del Agent ficticio enviando sólo un check de servicio periódicamente. Para obtener más información, consulta [Escribir un check personalizado del Agent][1].

1. Crea un nuevo directorio, `service_check_example.d/`, en la [carpeta`conf.d/`][2] de tu Agent.

2. En tu carpeta `service_check_example.d/`, crea un archivo de configuración vacío llamado `service_check_example.yaml` con el siguiente contenido:

    ```yaml
    instances: [{}]
    ```

3. Subiendo un nivel desde la carpeta `conf.d/`, ve a la carpeta `checks.d/`.
4. Dentro de esta carpeta, crea un archivo de check personalizado llamado `service_check_example.py` con el siguiente contenido:

    {{< code-block lang="python" filename="service_check_example.py" >}}
from datadog_checks.base import Agentcheck

__version__ = "1.0.0"

class MyClass(AgentCheck):
    def check(self, instance):
        self.service_check('example_service_check', 0, message='Example application is up and running.')
    {{< /code-block >}}

5. [Reinicia el Agent][3].

6. Asegúrate de que tu check personalizado está funcionando correctamente mediante el [comando de estado del Agent][4]. Deberías ver algo así:

    ```text
    =========
    Collector
    =========

      Running Checks
      ==============

        (...)

        service_check_example (1.0.0)
        -----------------------------
          Instance ID: service_check_example:d884b5186b651429 [OK]
          Total Runs: 1
          Metric Samples: Last Run: 0, Total: 0
          Events: Last Run: 0, Total: 0
          Service Checks: Last Run: 1, Total: 1
          Average Execution Time : 2ms

        (...)
    ```

7. Por último, para ver informes de tus checks de servicios, consulta tu [resumen de checks de servicios de Datadog][5]:

{{< img src="developers/service_checks/agent_service_checks_submission/service_check.png" alt="Checks de servicios" style="width:80%;">}}

## Leer más

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/developers/custom_checks/write_agent_check/
[2]: /es/agent/configuration/agent-configuration-files/#agent-configuration-directory
[3]: /es/agent/configuration/agent-commands/#restart-the-agent
[4]: /es/agent/configuration/agent-commands/#agent-information
[5]: https://app.datadoghq.com/check/summary