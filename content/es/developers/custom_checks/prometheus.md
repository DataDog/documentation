---
aliases:
- /es/developers/openmetrics/
- /es/developers/prometheus/
further_reading:
- link: /agent/kubernetes/prometheus
  tag: Documentación
  text: Configuración de un check de OpenMetrics
- link: /developers/custom_checks/write_agent_check/
  tag: Documentación
  text: Escribir un check personalizado
- link: /developers/integrations/
  tag: Documentación
  text: Introducción a integraciones basadas en Agent
title: Check de OpenMetrics personalizado
---

## Información general

Esta página explica en detalle la interfaz `OpenMetricsBaseCheckV2` para un uso más avanzado, incluyendo un ejemplo de un check sencillo que recopila métricas de temporización y los eventos de estado de [Kong][1]. Para más detalles sobre la configuración de un check básico de OpenMetrics, consulta [recopilación de métricas de Kubernetes Prometheus y OpenMetrics][2].

**Nota**: `OpenMetricsBaseCheckV2` está disponible en Agent versión `7.26.x`+ y requiere Python 3.

<div class="alert alert-info">
Si estás buscando la guía de implementación legacy o la guía de check personalizado de la interfaz <code>OpenMetricsBasecheck</code>, consulta <a href="https://docs.datadoghq.com/developers/faq/legacy-openmetrics/">Check de OpenMetrics legacy personalizado</a>.
</div>

## Uso avanzado: interfaz de check de OpenMetrics

Si tienes necesidades más avanzadas que el check genérico, como el preprocesamiento de métricas, puedes escribir un `OpenMetricsBaseCheckV2` personalizado. Es la [clase base][3] del check genérico, y proporciona una estructura y algunos ayudantes para recopilar métricas, eventos y checks de servicio expuestos con Prometheus. La configuración mínima para checks basados en esta clase incluye:

- Creación de una instancia por defecto con asignación de `namespace` y `metrics`.
- Aplicación del método `check()` AND/OR:
- Creación de un método con el nombre de la métrica de OpenMetric tratada (consulta `self.prometheus_metric_name`).

Consulta este [ejemplo en la integración de Kong][4] donde el valor de métrica de Prometheus `kong_upstream_target_health` se utiliza como check de servicio.

## Escribir un check personalizado de OpenMetrics

Este es un ejemplo sencillo de escritura de un check de Kong para ilustrar el uso de la clase `OpenMetricsBaseCheckV2`. El siguiente ejemplo reproduce la funcionalidad del siguiente check genérico de Openmetrics:

```yaml
instances:
  - openmetrics_endpoint: http://localhost:8001/status/
    namespace: "kong"
    metrics:
      - kong_bandwidth: bandwidth
      - kong_http_consumer_status: http.consumer.status
      - kong_http_status: http.status
      - kong_latency:
          name: latency
          type: counter
      - kong_memory_lua_shared_dict_bytes: memory.lua.shared_dict.bytes
      - kong_memory_lua_shared_dict_total_bytes: memory.lua.shared_dict.total_bytes
      - kong_nginx_http_current_connections: nginx.http.current_connections
      - kong_nginx_stream_current_connections: nginx.stream.current_connections
      - kong_stream_status: stream.status
```

### Configuración

<div class="alert alert-warning">
Los nombres de los archivos de configuración y check deben coincidir. Si tu check se llama <code>micheck.py</code> tu archivo de configuración <em>debe</em> llamarse <code>micheck.yaml</code>.
</div>

La configuración para un check de Openmetrics es casi igual que un [check de Agent][5] normal. La principal diferencia consiste en incluir la variable `openmetrics_endpoint` en tu archivo `check.yaml`. Esto va en `conf.d/kong.yaml`:

```yaml
init_config:

instances:
    # URL of the Prometheus metrics endpoint
  - openmetrics_endpoint: http://localhost:8001/status/
```

### Escribir el check

Todos los checks de OpenMetrics heredan de la [clase `OpenMetricsBasecheckV2`][6]:

```python
from datadog_checks.base import OpenMetricsBaseCheckV2

class KongCheck(OpenMetricsBaseCheckV2):
```

## Define el espacio de nombres de la integración

El valor de `__NAMESPACE__` prefijará todas las métricas y checks de servicio recopilados por esta integración.

```python
from datadog_checks.base import OpenMetricsBaseCheckV2

class KongCheck(OpenMetricsBaseCheckV2):
    __NAMESPACE__ = "kong"

```

#### Definir una asignación de métricas

La asignación de [métricas][7] permite cambiar el nombre de métrica y anular el tipo nativo de métrica.

```python
from datadog_checks.base import OpenMetricsBaseCheckV2

class KongCheck(OpenMetricsBaseCheckV2):
    __NAMESPACE__ = "kong"

    def __init__(self, name, init_config, instances):
        super(KongCheck, self).__init__(name, init_config, instances)

        self.metrics_map =  {
            'kong_bandwidth': 'bandwidth',
            'kong_http_consumer_status': 'http.consumer.status',
            'kong_http_status': 'http.status',
            'kong_latency': {
                'name': 'latency',
                'type': 'counter',
            },
            'kong_memory_lua_shared_dict_bytes': 'memory.lua.shared_dict.bytes',
            'kong_memory_lua_shared_dict_total_bytes': 'memory.lua.shared_dict.total_bytes',
            'kong_nginx_http_current_connections': 'nginx.http.current_connections',
            'kong_nginx_stream_current_connections': 'nginx.stream.current_connections',
            'kong_stream_status': 'stream.status',
        }
```

#### Definir una instancia por defecto

Una instancia por defecto es la configuración básica utilizada para el check. La instancia por defecto debe anular `metrics` y `openmetrics_endpoint`.
[Anula][8] la `get_default_config` en OpenMetricsBasecheckV2 con tu instancia por defecto.

```python
from datadog_checks.base import OpenMetricsBaseCheckV2

class KongCheck(OpenMetricsBaseCheckV2):
    __NAMESPACE__ = "kong"

    def __init__(self, name, init_config, instances):
        super(KongCheck, self).__init__(name, init_config, instances)

        self.metrics_map = {
            'kong_bandwidth': 'bandwidth',
            'kong_http_consumer_status': 'http.consumer.status',
            'kong_http_status': 'http.status',
            'kong_latency': {
                'name': 'latency',
                'type': 'counter',
            },
            'kong_memory_lua_shared_dict_bytes': 'memory.lua.shared_dict.bytes',
            'kong_memory_lua_shared_dict_total_bytes': 'memory.lua.shared_dict.total_bytes',
            'kong_nginx_http_current_connections': 'nginx.http.current_connections',
            'kong_nginx_stream_current_connections': 'nginx.stream.current_connections',
            'kong_stream_status': 'stream.status',
        }

      def get_default_config(self):
            return {'metrics': self.metrics_map}
```


#### Aplicación del método de check

Si deseas implementar funciones adicionales, sobrescribe la función `check()`.

Desde `instance`, utiliza `endpoint`, que es el endpoint de métricas de Prometheus u OpenMetrics desde el que sondear métricas:

```python
def check(self, instance):
    endpoint = instance.get('openmetrics_endpoint')
```


##### Excepciones

Si un check no puede ejecutarse debido a una configuración incorrecta, un error de programación o porque no pudo recopilar ninguna métrica, debe lanzar una excepción significativa. Esta excepción se registra y se muestra en el [comando de estado][9] del Agent para la depuración. Por ejemplo:

    $ sudo /etc/init.d/datadog-agent info

      Checks
      ======

        my_custom_check
        ---------------
          - instance #0 [ERROR]: Unable to find openmetrics_endpoint in config file.
          - Collected 0 metrics & 0 events

Mejora tu método de `check()` con `ConfigurationError`:

```python
from datadog_checks.base import ConfigurationError

def check(self, instance):
    endpoint = instance.get('openmetrics_endpoint')
    if endpoint is None:
        raise ConfigurationError("Unable to find openmetrics_endpoint in config file.")
```

En cuanto dispongas de datos, elimina:

```python

def check(self, instance):
    endpoint = instance.get('openmetrics_endpoint')
    if endpoint is None:
        raise ConfigurationError("Unable to find openmetrics_endpoint in config file.")

    super().check(instance)
```

### Ponerlo todo junto

```python
from datadog_checks.base import OpenMetricsBaseCheckV2
from datadog_checks.base import ConfigurationError

class KongCheck(OpenMetricsBaseCheckV2):
    __NAMESPACE__ = "kong"

    def __init__(self, name, init_config, instances):
        super(KongCheck, self).__init__(name, init_config, instances)

        self.metrics_map = {
            'kong_bandwidth': 'bandwidth',
            'kong_http_consumer_status': 'http.consumer.status',
            'kong_http_status': 'http.status',
            'kong_latency': {
                'name': 'latency',
                'type': 'counter',
            },
            'kong_memory_lua_shared_dict_bytes': 'memory.lua.shared_dict.bytes',
            'kong_memory_lua_shared_dict_total_bytes': 'memory.lua.shared_dict.total_bytes',
            'kong_nginx_http_current_connections': 'nginx.http.current_connections',
            'kong_nginx_stream_current_connections': 'nginx.stream.current_connections',
            'kong_stream_status': 'stream.status',
        }

      def get_default_config(self):
            return {'metrics': self.metrics_map}

      def check(self, instance):
          endpoint = instance.get('openmetrics_endpoint')
          if endpoint is None:
              raise ConfigurationError("Unable to find openmetrics_endpoint in config file.")

          super().check(instance)

```

## Aprender más

Para obtener más información sobre las integraciones de base de Prometheus y OpenMetrics, consulta [documentos para desarrolladores][10] de integraciones.

Para ver todas las opciones de configuración disponibles en Openmetrics, consulta el [conf.yaml.example][11].
Puedes mejorar tu check de OpenMetrics al incluir valores por defecto para opciones adicionales de configuración:

`exclude_metrics`
: algunas métricas se ignoran porque son duplicados o introducen una cardinalidad alta. Las métricas incluidas en esta lista se omiten silenciosamente sin una línea de depuración `Unable to handle metric` en los logs.
Para excluir todas las métricas excepto las que coincidan con un filtro específico, puedes utilizar un regex de búsqueda negativa como: ` - ^(?!foo).*$`

`share_labels`
: si se proporciona la asignación de `share_labels`, la asignación permite compartir etiquetas entre múltiples métricas. Las claves representan las
métricas expuestas desde las que compartir etiquetas, y los valores son asignaciones que configuran el comportamiento para compartir. Cada asignación debe tener al menos una de las siguientes claves: `labels`, `match`, o `values`.

`exclude_labels`
 `exclude_labels` es una matriz de etiquetas a excluir. Esas etiquetas no se añaden como etiquetas al enviar la métrica.

## Leer más

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/integrations-core/blob/master/kube_dns/datadog_checks/kube_dns/kube_dns.py
[2]: /es/agent/kubernetes/prometheus/
[3]: https://github.com/DataDog/integrations-core/tree/master/datadog_checks_base/datadog_checks/base/checks/openmetrics/v2
[4]: https://github.com/DataDog/integrations-core/blob/459e8c12a9c828a0b3faff59df69c2e1f083309c/kong/datadog_checks/kong/check.py#L22-L45
[5]: /es/developers/integrations/
[6]: https://github.com/DataDog/integrations-core/tree/master/datadog_checks_base/datadog_checks/base/checks/openmetrics/v2/base.py
[7]: https://github.com/DataDog/integrations-core/blob/459e8c12a9c828a0b3faff59df69c2e1f083309c/openmetrics/datadog_checks/openmetrics/data/conf.yaml.example#L65-L104
[8]: https://github.com/DataDog/integrations-core/blob/459e8c12a9c828a0b3faff59df69c2e1f083309c/datadog_checks_base/datadog_checks/base/checks/openmetrics/v2/base.py#L86-L87
[9]: /es/agent/configuration/agent-commands/?tab=agentv6v7#agent-status-and-information
[10]: https://datadoghq.dev/integrations-core/base/openmetrics/
[11]: https://github.com/DataDog/integrations-core/blob/master/openmetrics/datadog_checks/openmetrics/data/conf.yaml.example