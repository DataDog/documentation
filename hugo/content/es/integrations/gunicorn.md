---
app_id: gunicorn
categories:
- recopilación de logs
custom_kind: integración
description: Monitoriza frecuencias y duraciones de solicitudes, frecuencias de mensajes
  de logs y procesos de workers.
further_reading:
- link: https://www.datadoghq.com/blog/monitor-gunicorn-performance
  tag: blog
  text: Monitorizar el rendimiento de Gunicorn con Datadog
integration_version: 4.1.1
media: []
supported_os:
- Linux
- macOS
title: Gunicorn
---
![Dashboard de Gunicorn](https://raw.githubusercontent.com/DataDog/integrations-core/master/gunicorn/images/gunicorn-dash.png)

## Información general

El Datadog Agent recopila una métrica principal sobre Gunicorn: el número de procesos de workers en ejecución. También envía un check de servicio: si Gunicorn se está ejecutando o no.

El propio Gunicorn puede proporcionar más métricas utilizando DogStatsD, incluyendo:

- Frecuencia total de solicitudes
- Frecuencia de solicitudes por código de estado (2xx, 3xx, 4xx, 5xx)
- Duración de solicitudes (media, mediana, máxima, percentil 95, etc.)
- Frecuencia de mensajes de log por nivel de log (crítico, error, advertencia, excepción)

## Configuración

### Instalación

El check de Gunicorn del Datadog Agent está incluido en el paquete del [Datadog Agent](https://app.datadoghq.com/account/settings/agent/latest), por lo que no necesitas instalar nada más en tus servidores Gunicorn.

El check de Gunicorn requiere que el entorno Python de tu aplicación Gunicorn tenga el paquete [`setproctitle`](https://pypi.python.org/pypi/setproctitle). Sin él, el Datadog Agent informa que no puede encontrar un proceso principal `gunicorn` (y por lo tanto, tampoco puede encontrar workers). Instala el paquete `setproctitle` en el entorno Python de tu aplicación si quieres recopilar la métrica `gunicorn.workers`.

### Configuración

Edita el archivo `gunicorn.d/conf.yaml`, en la carpeta `conf.d/` en la raíz de tu [directorio de configuración del Agent](https://docs.datadoghq.com/agent/guide/agent-configuration-files/#agent-configuration-directory) para comenzar a recopilar tus [métricas](#metric-collection) y [logs](#log-collection) de Gunicorn. Consulta el [ejemplo gunicorn.yaml](https://github.com/DataDog/integrations-core/blob/master/gunicorn/datadog_checks/gunicorn/data/conf.yaml.example) para conocer todas las opciones de configuración disponibles.

#### Recopilación de métricas

##### Conexión de Gunicorn con DogStatsD

1. A partir de la versión 19.1, Gunicorn te [ofrece la opción](https://docs.gunicorn.org/en/stable/settings.html#statsd-host) de enviar tus métricas a un daemon que implemente el protocolo StatsD, como [DogStatsD](https://docs.datadoghq.com/guides/dogstatsd/). Como sucede con muchas opciones de Gunicorn, puedes pasarlo a `gunicorn` en la CLI (`--statsd-host`) o configurarlo en el archivo de configuración de tu aplicación (`statsd_host`). Para asegurarte de recopilar **todas las métricas de Gunicorn**, configura tu aplicación para que envíe métricas a [DogStatsD](https://docs.datadoghq.com/guides/dogstatsd/) en `"localhost:8125"` y reinicia la aplicación.

1. Añade este bloque de configuración a tu archivo `gunicorn.d/conf.yaml` para empezar a recopilar tus [métricas de Gunicorn](#metrics):

```yaml
init_config:

instances:
    ## @param proc_name - string - required
    ## The name of the gunicorn process. For the following gunicorn server:
    ##
    ## gunicorn --name <WEB_APP_NAME> <WEB_APP_CONFIG>.ini
    ##
    ## the name is `<WEB_APP_NAME>`
  - proc_name: <YOUR_APP_NAME>
```

3. [Reinicia el Agent](https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent) para comenzar a enviar métricas de Gunicorn a Datadog.

#### Recopilación de logs

_Disponible para las versiones 6.0 o posteriores del Agent_

1. La recopilación de logs está desactivada en forma predeterminada en el Datadog Agent, actívala en tu archivo `datadog.yaml`:

   ```yaml
   logs_enabled: true
   ```

1. Utiliza el siguiente comando para configurar la ruta del archivo de [logs de acceso](https://docs.gunicorn.org/en/stable/settings.html#accesslog):
   `--access-logfile <MY_FILE_PATH>`

1. Utiliza el siguiente comando para configurar la ruta del archivo de [logs de error](https://docs.gunicorn.org/en/stable/settings.html#errorlog):
   `--error-logfile FILE, --log-file <MY_FILE_PATH>`

1. Añade este bloque de configuración a tu archivo `gunicorn.d/conf.yaml` para empezar a recopilar logs de Gunicorn:

   ```yaml
   logs:
     - type: file
       path: /var/log/gunicorn/access.log
       service: "<MY_SERVICE>"
       source: gunicorn

     - type: file
       path: /var/log/gunicorn/error.log
       service: "<MY_SERVICE>"
       source: gunicorn
       log_processing_rules:
         - type: multi_line
           name: log_start_with_date
           pattern: \[\d{4}-\d{2}-\d{2}
   ```

   Cambia los valores de los parámetros `service` y `path` y configúralos para tu entorno. Consulta el [ejemplo gunicorn.yaml](https://github.com/DataDog/integrations-core/blob/master/gunicorn/datadog_checks/gunicorn/data/conf.yaml.example) para conocer todas las opciones de configuración disponibles.

1. [Reinicia el Agent](https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent).

### Validación

[Ejecuta el subcomando de estado del Agent](https://docs.datadoghq.com/agent/guide/agent-commands/#agent-status-and-information) y busca `gunicorn` en la sección Checks.

Si el estado no es `OK`, consulte la sección Solucionar problemas.

Utiliza `netstat` para verificar que Gunicorn también envía tus métricas:

```text
$ sudo netstat -nup | grep "127.0.0.1:8125.*ESTABLISHED"
udp        0      0 127.0.0.1:38374         127.0.0.1:8125          ESTABLISHED 15500/gunicorn: mas
```

## Datos recopilados

### Métricas

| | |
| --- | --- |
| **gunicorn.log.critical** <br>(rate) | Tasa de declaraciones críticas registradas.<br>_Se muestra como evento_ |
| **gunicorn.log.error** <br>(rate) | Tasa de errores registrados.<br>_Se muestra como evento_ |
| **gunicorn.log.exception** <br>(rate) | Tasa de excepciones registradas.<br>_Se muestra como evento_ |
| **gunicorn.log.warning** <br>(rate) | Tasa de advertencias registradas.<br>_Se muestra como evento_ |
| **gunicorn.request.duration.95percentile** <br>(gauge) | Percentil 95 del tiempo de duración de la solicitud.<br>_Se muestra en milisegundos_ |
| **gunicorn.request.duration.avg** <br>(gauge) | Tiempo medio de duración de la solicitud.<br>_Se muestra en milisegundos_ |
| **gunicorn.request.duration.count** <br>(rate) | Tasa de solicitudes recibidas.<br>_Se muestra como solicitud_ |
| **gunicorn.request.duration.max** <br>(gauge) | Tiempo máximo de duración de la solicitud.<br>_Se muestra en milisegundos_ |
| **gunicorn.request.duration.median** <br>(gauge) | Tiempo medio de duración de la solicitud.<br>_Se muestra en milisegundos_ |
| **gunicorn.request.status.100** <br>(rate) | Tasa de solicitudes que generan respuestas con un código de estado 100.<br>_Se muestra como solicitud_ |
| **gunicorn.request.status.101** <br>(rate) | Tasa de solicitudes que generan respuestas con un código de estado 101.<br>_Se muestra como solicitud_ |
| **gunicorn.request.status.102** <br>(rate) | Tasa de solicitudes que generan respuestas con un código de estado 102.<br>_Se muestra como solicitud_ |
| **gunicorn.request.status.200** <br>(rate) | Tasa de solicitudes que generan respuestas con un código de estado 200.<br>_Se muestra como solicitud_ |
| **gunicorn.request.status.201** <br>(rate) | Tasa de solicitudes que generan respuestas con un código de estado 201.<br>_Se muestra como solicitud_ |
| **gunicorn.request.status.202** <br>(rate) | Tasa de solicitudes que generan respuestas con un código de estado 202.<br>_Se muestra como solicitud_ |
| **gunicorn.request.status.203** <br>(rate) | Tasa de solicitudes que generan respuestas con un código de estado 203.<br>_Se muestra como solicitud_ |
| **gunicorn.request.status.204** <br>(rate) | Tasa de solicitudes que generan respuestas con un código de estado 204.<br>_Se muestra como solicitud_ |
| **gunicorn.request.status.205** <br>(rate) | Tasa de solicitudes que generan respuestas con un código de estado 205.<br>_Se muestra como solicitud_ |
| **gunicorn.request.status.206** <br>(rate) | Tasa de solicitudes que generan respuestas con un código de estado 206.<br>_Se muestra como solicitud_ |
| **gunicorn.request.status.207** <br>(rate) | Tasa de solicitudes que generan respuestas con un código de estado 207.<br>_Se muestra como solicitud_ |
| **gunicorn.request.status.208** <br>(rate) | Tasa de solicitudes que generan respuestas con un código de estado 208.<br>_Se muestra como solicitud_ |
| **gunicorn.request.status.226** <br>(rate) | Tasa de solicitudes que generan respuestas con un código de estado 226.<br>_Se muestra como solicitud_ |
| **gunicorn.request.status.300** <br>(rate) | Tasa de solicitudes que generan respuestas con un código de estado 300.<br>_Se muestra como solicitud_ |
| **gunicorn.request.status.301** <br>(rate) | Tasa de solicitudes que generan respuestas con un código de estado 301.<br>_Se muestra como solicitud_ |
| **gunicorn.request.status.302** <br>(rate) | Tasa de solicitudes que generan respuestas con un código de estado 302.<br>_Se muestra como solicitud_ |
| **gunicorn.request.status.303** <br>(rate) | Tasa de solicitudes que generan respuestas con un código de estado 303.<br>_Se muestra como solicitud_ |
| **gunicorn.request.status.304** <br>(rate) | Porcentaje de solicitudes que generan respuestas con un código de estado 304.<br>_Se muestra como solicitud_ |
| **gunicorn.request.status.305** <br>(rate) | Porcentaje de solicitudes que generan respuestas con un código de estado 305.<br>_Se muestra como solicitud_ |
| **gunicorn.request.status.307** <br>(rate) | Porcentaje de solicitudes que generan respuestas con un código de estado 307.<br>_Se muestra como solicitud_ |
| **gunicorn.request.status.308** <br>(rate) | Porcentaje de solicitudes que generan respuestas con un código de estado 308.<br>_Se muestra como solicitud_ |
| **gunicorn.request.status.400** <br>(rate) | Porcentaje de solicitudes que generan respuestas con un código de estado 400.<br>_Se muestra como solicitud_ |
| **gunicorn.request.status.401** <br>(rate) | Porcentaje de solicitudes que generan respuestas con un código de estado 401.<br>_Se muestra como solicitud_ |
| **gunicorn.request.status.402** <br>(rate) | Porcentaje de solicitudes que generan respuestas con un código de estado 402.<br>_Se muestra como solicitud_ |
| **gunicorn.request.status.403** <br>(rate) | Porcentaje de solicitudes que generan respuestas con un código de estado 403.<br>_Se muestra como solicitud_ |
| **gunicorn.request.status.404** <br>(rate) | Porcentaje de solicitudes que generan respuestas con un código de estado 404.<br>_Se muestra como solicitud_ |
| **gunicorn.request.status.405** <br>(rate) | Porcentaje de solicitudes que generan respuestas con un código de estado 405.<br>_Se muestra como solicitud_ |
| **gunicorn.request.status.406** <br>(rate) | Porcentaje de solicitudes que generan respuestas con un código de estado 406.<br>_Se muestra como solicitud_ |
| **gunicorn.request.status.407** <br>(rate) | Porcentaje de solicitudes que generan respuestas con un código de estado 407.<br>_Se muestra como solicitud_ |
| **gunicorn.request.status.408** <br>(rate) | Porcentaje de solicitudes que generan respuestas con un código de estado 408<br>_Se muestra como solicitud_ |
| **gunicorn.request.status.409** <br>(rate) | Porcentaje de solicitudes que generan respuestas con un código de estado 409.<br>_Se muestra como solicitud_ |
| **gunicorn.request.status.410** <br>(rate) | Porcentaje de solicitudes que generan respuestas con un código de estado 410.<br>_Se muestra como solicitud_ |
| **gunicorn.request.status.411** <br>(rate) | Porcentaje de solicitudes que generan respuestas con un código de estado 411.<br>_Se muestra como solicitud_ |
| **gunicorn.request.status.412** <br>(rate) | Porcentaje de solicitudes que generan respuestas con un código de estado 412.<br>_Se muestra como solicitud_ |
| **gunicorn.request.status.413** <br>(rate) | Porcentaje de solicitudes que generan respuestas con un código de estado 413.<br>_Se muestra como solicitud_ |
| **gunicorn.request.status.414** <br>(rate) | Porcentaje de solicitudes que generan respuestas con un código de estado 414.<br>_Se muestra como solicitud_ |
| **gunicorn.request.status.415** <br>(rate) | Porcentaje de solicitudes que generan respuestas con un código de estado 415.<br>_Se muestra como solicitud_ |
| **gunicorn.request.status.416** <br>(rate) | Porcentaje de solicitudes que generan respuestas con un código de estado 416.<br>_Se muestra como solicitud_ |
| **gunicorn.request.status.417** <br>(rate) | Porcentaje de solicitudes que generan respuestas con un código de estado 417.<br>_Se muestra como solicitud_ |
| **gunicorn.request.status.419** <br>(rate) | Porcentaje de solicitudes que generan respuestas con un código de estado 419.<br>_Se muestra como solicitud_ |
| **gunicorn.request.status.421** <br>(rate) | Porcentaje de solicitudes que generan respuestas con un código de estado 421.<br>_Se muestra como solicitud_ |
| **gunicorn.request.status.422** <br>(rate) | Porcentaje de solicitudes que generan respuestas con un código de estado 422.<br>_Se muestra como solicitud_ |
| **gunicorn.request.status.423** <br>(rate) | Porcentaje de solicitudes que generan respuestas con un código de estado 423.<br>_Se muestra como solicitud_ |
| **gunicorn.request.status.424** <br>(rate) | Porcentaje de solicitudes que generan respuestas con un código de estado 424.<br>_Se muestra como solicitud_ |
| **gunicorn.request.status.426** <br>(rate) | Porcentaje de solicitudes que generan respuestas con un código de estado 426.<br>_Se muestra como solicitud_ |
| **gunicorn.request.status.428** <br>(rate) | Porcentaje de solicitudes que generan respuestas con un código de estado 428.<br>_Se muestra como solicitud_ |
| **gunicorn.request.status.429** <br>(rate) | Porcentaje de solicitudes que generan respuestas con un código de estado 429.<br>_Se muestra como solicitud_ |
| **gunicorn.request.status.431** <br>(rate) | Porcentaje de solicitudes que generan respuestas con un código de estado 431.<br>_Se muestra como solicitud_ |
| **gunicorn.request.status.451** <br>(rate) | Porcentaje de solicitudes que generan respuestas con un código de estado 451.<br>_Se muestra como solicitud_ |
| **gunicorn.request.status.500** <br>(rate) | Porcentaje de solicitudes que generan respuestas con un código de estado 500.<br>_Se muestra como solicitud_ |
| **gunicorn.request.status.501** <br>(rate) | Porcentaje de solicitudes que generan respuestas con un código de estado 501.<br>_Se muestra como solicitud_ |
| **gunicorn.request.status.502** <br>(rate) | Porcentaje de solicitudes que generan respuestas con un código de estado 502.<br>_Se muestra como solicitud_ |
| **gunicorn.request.status.503** <br>(rate) | Porcentaje de solicitudes que generan respuestas con un código de estado 503.<br>_Se muestra como solicitud_ |
| **gunicorn.request.status.504** <br>(rate) | Porcentaje de solicitudes que generan respuestas con un código de estado 504.<br>_Se muestra como solicitud_ |
| **gunicorn.request.status.505** <br>(rate) | Porcentaje de solicitudes que generan respuestas con un código de estado 505.<br>_Se muestra como solicitud_ |
| **gunicorn.request.status.506** <br>(rate) | Porcentaje de solicitudes que generan respuestas con un código de estado 506.<br>_Se muestra como solicitud_ |
| **gunicorn.request.status.507** <br>(rate) | Porcentaje de solicitudes que generan respuestas con un código de estado 507.<br>_Se muestra como solicitud_ |
| **gunicorn.request.status.508** <br>(rate) | Porcentaje de solicitudes que generan respuestas con un código de estado 508.<br>_Se muestra como solicitud_ |
| **gunicorn.request.status.510** <br>(rate) | Porcentaje de solicitudes que generan respuestas con un código de estado 510.<br>_Se muestra como solicitud_ |
| **gunicorn.request.status.511** <br>(rate) | Porcentaje de solicitudes que generan respuestas con un código de estado 511.<br>_Se muestra como solicitud_ |
| **gunicorn.request.status.512** <br>(rate) | Porcentaje de solicitudes que generan respuestas con un código de estado 512.<br>_Se muestra como solicitud_ |
| **gunicorn.requests** <br>(rate) | Índice de solicitudes recibidas.<br>_Se muestra como solicitud_ |
| **gunicorn.workers** <br>(gauge) | Número de workers etiquetados por estado (inactivo o activo). Un worker está activo si tiene un incremento de tiempo de CPU registrado en un intervalo de 0.1-seg (a través de psutil). Un worker está inactivo si no se detecta ningún cambio en el tiempo de CPU, incluso si el worker está bloqueado en E/S (como esperando llamadas HTTP/base de datos).<br>_Se muestra como worker_ |

### Eventos

El check de Gunicorn no incluye eventos.

### Checks de servicio

**gunicorn.is_running**

Devuelve `CRITICAL` si el Agent no puede encontrar el proceso principal de Gunicorn. Devuelve `OK` en caso contrario.

_Estados: ok, crítico_

## Solucionar problemas

### El Agent no encuentra el proceso Gunicorn

```shell
  Checks
  ======

    gunicorn (5.12.1)
    -----------------
      - instance #0 [ERROR]: 'Found no master process with name: gunicorn: master [my_web_app]'
      - Collected 0 metrics, 0 events & 1 service check
      - Dependencies:
          - psutil: 4.4.1
```

O bien Gunicorn realmente no se está ejecutando, o bien el entorno Python entorno de tu aplicación no tiene instalado el paquete `setproctitle`.

Si `setproctitle` no está instalado, Gunicorn aparece en la tabla de procesos de la siguiente forma:

```text
$ ps -ef | grep gunicorn
ubuntu   18013 16695  2 20:23 pts/0    00:00:00 /usr/bin/python /usr/bin/gunicorn --config test-app-config.py gunicorn-test:app
ubuntu   18018 18013  0 20:23 pts/0    00:00:00 /usr/bin/python /usr/bin/gunicorn --config test-app-config.py gunicorn-test:app
ubuntu   18019 18013  0 20:23 pts/0    00:00:00 /usr/bin/python /usr/bin/gunicorn --config test-app-config.py gunicorn-test:app
```

Si está instalado, los procesos `gunicorn` aparecerán en el formato esperado por el Datadog Agent:

```text
$ ps -ef | grep gunicorn
ubuntu   18457 16695  5 20:26 pts/0    00:00:00 gunicorn: master [my_app]
ubuntu   18462 18457  0 20:26 pts/0    00:00:00 gunicorn: worker [my_app]
ubuntu   18463 18457  0 20:26 pts/0    00:00:00 gunicorn: worker [my_app]
```

## Referencias adicionales

- [Monitorizar el rendimiento de Gunicorn con Datadog](https://www.datadoghq.com/blog/monitor-gunicorn-performance)