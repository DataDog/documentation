---
further_reading:
- link: /developers/integrations/agent_integration/
  tag: Documentación
  text: Crear una integración basada en el Agent
- link: /logs/log_configuration/processors
  tag: Documentación
  text: Aprender a procesar tus logs
- link: /logs/log_configuration/parsing
  tag: Documentación
  text: Obtener más información sobre el análisis
- link: /logs/explorer/
  tag: Documentación
  text: Aprender a explorar tus logs
- link: https://datadoghq.dev/integrations-core/base/api/#datadog_checks.base.checks.base.AgentCheck.send_log
  tag: API de integración del Agent
  text: Parámetros de la API send_logs
title: Recopilación de logs de la integración del Agent
---

## Información general

Cuando desarrolles integraciones personalizadas del Agent, puedes enviar logs directamente al backend de ingesta de logs de Datadog utilizando el método `send_log`. Esto permite que tus checks personalizados emitan logs junto con métricas, eventos y checks de servicio.

Este enfoque es útil tanto para extraer datos de logs de la aplicación o servicio supervisado como para capturar logs producidos a partir del propio check de integración.

## Requisitos previos

- Una integración o check personalizado del Agent. Consulta [Crear una integración basada en el Agent][1] para obtener instrucciones de configuración.
- El Datadog Agent instalado y en funcionamiento con [la recopilación de logs activada][2].

## Configuración

Para habilitar el envío de logs desde tu check personalizado del Agent, debes configurar la recopilación de logs en el archivo de configuración de tu integración.

1. Asegúrate de que la recopilación de logs está activada globalmente en el archivo de configuración principal del Agent (`datadog.yaml`):
   ```yaml
   logs_enabled: true
   ```

2. Añade una sección `logs` al archivo de configuración de tu integración (por ejemplo, `conf.d/my_integration.d/conf.yaml`):
   ```yaml
   init_config:

   instances:
     - <instance_configuration>

   logs:
     - type: integration
       source: <integration_name>
       service: <service_name>
   ```

   Donde:
   - `type`: establécelo en `integration` para indicar que los logs son recopilados por una integración
   - `source`: la fuente de logs (normalmente el nombre de tu integración)
   - `service`: el nombre del servicio que se asociará a los logs (también puede ser el nombre de la integración si no se aplica nada más).

3. [Reinicia el Agent][6] para aplicar los cambios de configuración.

Una vez configurada, tu integración puede utilizar el [método`send_log`][7] para enviar logs. Estos logs se etiquetan con `source` y `service` especificados en la configuración.

## Utilización del método send_log

El método `send_log` está disponible en cualquier clase de `AgentCheck` y permite enviar entradas de log a Datadog.

### Firma del método

```python
send_log(data, cursor=None, stream='default')
```

### Parámetros

| Parámetro | Tipo | Obligatorio | Descripción |
|-----------|------|----------|-------------|
| `data` | `dict[str, str]` | Sí | Los datos de log a enviar. Debe incluir al menos una clave `message`. |
| `cursor` | `dict[str, Any]` | No | Metadatos opcionales asociados al log, guardados en disco. Pueden recuperarse posteriormente con `get_log_cursor()`. |
| `stream` | `str` | No | Nombre del flujo asociado al log para la persistencia del cursor. Solo se utiliza si se proporciona `cursor`. Por defecto es `'default'`. |

### Claves especiales en el diccionario de datos

El diccionario `data` admite las siguientes claves especiales que el método `send_log` gestiona automáticamente:

- `timestamp`: número de segundos desde el epoch Unix. Por defecto es la hora actual si no se indica.
- `ddtags`: cadena de etiquetas separadas por comas. Si no se proporciona, el Agent añade automáticamente las etiquetas de la configuración de la instancia de integración.

Todas las demás claves del diccionario `data` se transmiten como atributos de log. Atributos comunes a incluir:

- `message`: el contenido del mensaje de log
- `status`: nivel de estado del log (como `info`, `error`, `warning`, `debug`)
- `service`: nombre del servicio para el log (debe coincidir con el nombre del servicio en la configuración del check).
- `source`: fuente del log (normalmente tu nombre de integración; también debería coincidir con el nombre de fuente configurada)
- `hostname`: nombre de host asociado al log
- Cualquier campo personalizado relevante para tu integración

## Ejemplo de uso

### Envío básico de logs

```python
from datadog_checks.base import AgentCheck
import time

class MyCustomCheck(AgentCheck):
    def check(self, instance):
        # Submit a simple log message
        self.send_log({
            'message': 'Custom check executed successfully',
            'timestamp': time.time(),
            'status': 'info'
        })
```

### Registro estructurado con metadatos

```python
from datadog_checks.base import AgentCheck
import time

class MyCustomCheck(AgentCheck):
    def check(self, instance):
        # Submit a structured log with additional fields
        self.send_log({
            'message': 'Database query completed',
            'timestamp': time.time(),
            'status': 'info',
            'service': 'my-custom-integration',
            'source': 'custom_check',
            'query_duration_ms': 145,
            'rows_returned': 1024
        })
```

### Utilización de cursores para el registro con estado

Los cursores permiten mantener los metadatos a lo largo de los checks, lo que resulta útil para seguir el progreso o mantener el estado:

```python
from datadog_checks.base import AgentCheck
import time

class MyCustomCheck(AgentCheck):
    def check(self, instance):
        # Retrieve the last cursor for this stream
        last_cursor = self.get_log_cursor('my_stream')
        last_position = last_cursor.get('position', 0) if last_cursor else 0

        # Process logs from the last position
        new_logs = self.fetch_logs_since(last_position)

        for log in new_logs:
            # Submit each log with an updated cursor
            self.send_log(
                data={
                    'message': log['message'],
                    'timestamp': log['timestamp'],
                    'status': log['level']
                },
                cursor={'position': log['position']},
                stream='my_stream'
            )
```

### Registro de errores

```python
from datadog_checks.base import AgentCheck
import time

class MyCustomCheck(AgentCheck):
    def check(self, instance):
        try:
            # Your check logic here
            self.perform_check()
        except Exception as e:
            # Log the error
            self.send_log({
                'message': f'Check failed: {str(e)}',
                'timestamp': time.time(),
                'status': 'error',
                'error_type': type(e).__name__,
                'service': 'my-custom-integration'
            })
            raise
```

## Consultar tus logs

Tras el envío, los logs de tu check personalizado aparecen en el [Log Explorer][3]. Puedes:

- Filtrar logs por `source`, `service`, o etiquetas personalizadas
- Analizar los datos estructurados del log utilizando [pipelines de procesamiento de logs][4]
- Crear monitores y alertas basados en el contenido de logs
- Correlacionar logs con métricas y trazas de la misma integración

## Prácticas recomendadas

- **Utilizar registro** estructurado: incluye campos adicionales en el diccionario `data` en lugar de incrustar toda la información en la cadena del mensaje.
- **Establecer los niveles de estado adecuados**: utiliza `error`, `warning`, `info`, o `debug` para ayudar con el filtrado y las alertas.
- **Incluir marcas de tiempo**: proporciona siempre un `timestamp` para una ordenación precisa del log, especialmente al procesar datos históricos.
- **Etiquetar de forma coherente**: utiliza la misma estrategia de etiquetado en logs, métricas y eventos de tu integración.
- **Utilizar cursores para el procesamiento con estado**: cuando realices el seguimiento del progreso a través de las fuentes de log, utiliza cursores para evitar el reprocesamiento de los datos.

## Solucionar problemas

Si los logs no aparecen en Datadog:

1. Comprueba que la recopilación de logs está activada en la configuración del Datadog Agent.
2. Comprueba los logs del Agent en busca de errores relacionados con el envío de logs.
3. Asegúrate de que tu diccionario `data` incluye al menos una clave `message`.
4. Ejecuta el [comando de estado del Agent][5] para confirmar que tu check se está realizando sin errores.

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/developers/integrations/agent_integration/
[2]: /es/agent/logs/?tab=tailfiles#activate-log-collection
[3]: /es/logs/explorer/
[4]: /es/logs/log_configuration/processors
[5]: /es/agent/configuration/agent-commands/?tab=agentv6v7#agent-status-and-information
[6]: /es/agent/configuration/agent-commands/?tab=agentv6v7#restart-the-agent
[7]: https://datadoghq.dev/integrations-core/base/api/#datadog_checks.base.checks.base.AgentCheck.send_log