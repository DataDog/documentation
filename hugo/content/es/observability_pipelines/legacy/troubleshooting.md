---
disable_toc: false
further_reading:
- link: /observability_pipelines/legacy/monitoring/
  tag: Documentación
  text: Monitorizar el estado de los pipelines
title: (LEGACY) Solucionar problemas
---

## Información general
Si experimentas un comportamiento inesperado en Observability Pipelines (OP) de Datadog, hay algunos problemas comunes que puedes investigar y esta guía puede ayudarte a resolver los problemas rápidamente. Si sigues teniendo problemas, ponte en contacto con el [servicio de asistencia de Datadog][3] para obtener más ayuda.

## Investigar logs de diagnóstico

El worker Observability Pipelines de emite logs internos sobre su propio estado. En la interfaz de usuario de Observability Pipelines, puedes investigar cualquier log de errores internos que el proceso del worker emita para todos sus componentes individuales. Para ver estos logs de diagnóstico, haz lo siguiente:

1. Navega hasta [Observability Pipelines][1].
1. Haz clic en el pipeline que deseas investigar.
1. Haz clic en un componente para ver su panel lateral.
1. Haz clic en la pestaña **Diagnostic Logs** (Logs de diagnóstico) para ver los logs de errores que el worker está emitiendo. Haz clic en un log de registro para investigarlo en el explorador de logs. Si no hay logs listados, entonces el componente no está emitiendo logs de errores.

### Obtener más logs detallados

Si necesitas obtener más detalles sobre los logs internos que el worker OP recopila, puedes aumentar el nivel de los logs con la variable de entorno `VECTOR_LOG`. De forma predeterminada, está establecida en `INFO`, lo que significa que en la consola se muestran los mensajes `INFO`, `WARNING` y `ERROR`.

Si la estableces en `DEBUG`, obtendrás información más detallada sobre los procesos internos del worker (incluidas las solicitudes HTTP realizadas y las respuestas recibidas). El equipo de asistencia de Datadog puede pedirte los logs `DEBUG` para ayudarte a solucionar problemas. Estos logs también aparecen en el explorador de logs y los [logs de diagnóstico](#investigate-diagnostic-logs).

## Inspeccionar eventos que fluyen a través de tu pipeline para identificar problemas de configuración

Con el worker de OP v1.4.0+, puedes incluir `tap` en los datos que se están pasando a través de tus fuentes, transformaciones y sinks para poder ver los datos sin procesar que fluyen a través de cada componente individual de tu pipeline.

### Activar la API del worker de Observability Pipelines

 La API del worker de Observability Pipelines te permite interactuar con los procesos del worker con el comando `tap`. Si utilizas los Helm charts que se proporcionan en las [guías de configuración][2], entonces la API ya está activada. De lo contrario, asegúrate de que la variable de entorno `DD_OP_API_ENABLED` esté establecida en `true`. Esto configura la API para escuchar en `localhost` y el puerto `8686`, que es lo que la CLI para `tap` espera.

### Utilizar `tap` para ver tus datos

Si estás en el mismo host que el worker, ejecuta el siguiente comando para incluir `tap` en el resultado:

```
observability-pipelines-worker tap <source or transform name>
```

Si usas un entorno en contenedor, utiliza el comando `docker exec` o `kubectl exec` para tener un intérprete de comandos en el contenedor para ejecutar el comando `tap` anterior.

### Ejemplo de utilización de `tap`

Añade la siguiente configuración de ejemplo, en la que la transformación `cleanup` convierte el atributo `log` en una copia de `message`:

```
sources:
  demo:
    type: demo_logs
    format: json

transforms:
  cleanup:
    type: remap
    inputs:
      - demo
    source: |-
      .log = .message

sinks:
  blackhole:
    type: blackhole
  inputs:
    - cleanup
  print_interval_secs: 0
```

Utiliza el siguiente comando para ejecutar la configuración de ejemplo y ver el resultado de la transformación `cleanup`:

```
observability-pipelines-worker tap cleanup
```

El resultado esperado debería ser similar al siguiente, en el que el atributo `log` es una copia del atributo `message`:

```
[tap] Pattern 'cleanup' successfully matched.
{"log":"{\"host\":\"121.142.241.212\",\"user-identifier\":\"meln1ks\",\"datetime\":\"25/Aug/2023:00:07:53\",\"method\":\"OPTION\",\"request\":\"/observability/metrics/production\",\"protocol\":\"HTTP/1.0\",\"status\":\"550\",\"bytes\":3185,\"referer\":\"https://make.us/wp-admin\"}","message":"{\"host\":\"121.142.241.212\",\"user-identifier\":\"meln1ks\",\"datetime\":\"25/Aug/2023:00:07:53\",\"method\":\"OPTION\",\"request\":\"/observability/metrics/production\",\"protocol\":\"HTTP/1.0\",\"status\":\"550\",\"bytes\":3185,\"referer\":\"https://make.us/wp-admin\"}","service":"vector","source_type":"demo_logs","timestamp":"2023-08-25T00:07:53.429855261Z"}
{"log":"{\"host\":\"117.214.24.224\",\"user-identifier\":\"Karimmove\",\"datetime\":\"25/Aug/2023:00:07:54\",\"method\":\"HEAD\",\"request\":\"/do-not-access/needs-work\",\"protocol\":\"HTTP/2.0\",\"status\":\"503\",\"bytes\":41730,\"referer\":\"https://some.org/wp-admin\"}","message":"{\"host\":\"117.214.24.224\",\"user-identifier\":\"Karimmove\",\"datetime\":\"25/Aug/2023:00:07:54\",\"method\":\"HEAD\",\"request\":\"/do-not-access/needs-work\",\"protocol\":\"HTTP/2.0\",\"status\":\"503\",\"bytes\":41730,\"referer\":\"https://some.org/wp-admin\"}","service":"vector","source_type":"demo_logs","timestamp":"2023-08-25T00:07:54.430584949Z"}
{"log":"{\"host\":\"108.145.218.149\",\"user-identifier\":\"shaneIxD\",\"datetime\":\"25/Aug/2023:00:07:55\",\"method\":\"DELETE\",\"request\":\"/this/endpoint/prints/money\",\"protocol\":\"HTTP/2.0\",\"status\":\"403\",\"bytes\":18340,\"referer\":\"https://up.de/wp-admin\"}","message":"{\"host\":\"108.145.218.149\",\"user-identifier\":\"shaneIxD\",\"datetime\":\"25/Aug/2023:00:07:55\",\"method\":\"DELETE\",\"request\":\"/this/endpoint/prints/money\",\"protocol\":\"HTTP/2.0\",\"status\":\"403\",\"bytes\":18340,\"referer\":\"https://up.de/wp-admin\"}","service":"vector","source_type":"demo_logs","timestamp":"2023-08-25T00:07:55.430085107Z"}
```

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/observability-pipelines/
[2]: /es/observability_pipelines/legacy/setup/
[3]: /es/help