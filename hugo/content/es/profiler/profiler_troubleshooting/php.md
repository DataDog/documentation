---
code_lang: PHP
code_lang_weight: 70
further_reading:
- link: /tracing/troubleshooting
  tag: Documentación
  text: Solucionar problemas de APM
title: Solucionar problemas del generador de perfiles PHP
type: lenguaje de código múltiple
---

## Perfiles faltantes en la página de búsqueda de perfiles

Si has configurado el generador de perfiles y no ves perfiles en la página de búsqueda de perfiles, ejecuta la función `phpinfo()`. El generador de perfiles se conecta a `phpinfo()` para ejecutar diagnósticos. Si el servidor web tiene problemas, ejecuta `phpinfo()` desde el servidor web y no desde la línea de comandos, ya que cada API de servidor (SAPI) puede configurarse de forma independiente.

[Abre un ticket de asistencia][1] con la siguiente información:

- Tipo y versión del sistema operativo (por ejemplo, Linux Ubuntu 20.04)
- El resultado de `phpinfo()`, que incluye la versión de PHP, el tipo de SAPI, las versiones de bibliotecas de Datadog y los diagnósticos del generador de perfiles.

## Reducción de la sobrecarga de la configuración por defecto

Si la sobrecarga por defecto no es aceptable, puedes [ajustar][4] las
distancias de muestreo, o desactivar algunos de los tipos de muestra que el perfilador recopila
cambiando los siguientes ajustes de INI:

- `datadog.profiling.allocation_enabled`: controla la generación de perfiles de asignaciones
- `datadog.profiling.experimental_cpu_time_enabled`: controla las muestras de tiempo de CPU
- `datadog.profiling.exception_enabled`: controla la generación de perfiles de excepción
- `datadog.profiling.timeline_enabled`: controla la recopilación de datos para la [visualización de la línea de tiempo][3]

Si deshabilitas estos tipos de muestras, sólo se recopilarán muestras
de tiempo real.

Para ver otros parámetros INI y sus correspondientes variables de entorno, consulta los [documentos de configuración][2].

## Ajuste de las distancias de muestreo

Tanto el perfilador de excepciones como el de asignaciones están diseñados para tener un impacto mínimo
en condiciones normales. Sin embargo, en escenarios de alta carga, como el lanzamiento
frecuente de excepciones o asignaciones masivas de memoria, el mecanismo de muestreo puede
suponer un coste notable en el tiempo de ejecución.

En el caso de las excepciones, esta situación se produce a menudo cuando se utilizan excepciones de
flujo de control. Para las asignaciones, esto es común cuando se trabaja con
grandes volúmenes de datos o se los procesa. En ambos casos, el perfilador puede recopilar más muestras
de lo necesario, lo que aumenta su actividad y genera una mayor sobrecarga.

Para gestionarlo mejor, puedes ajustar las distancias de muestreo respectivas:

- Para las excepciones, aumenta la distancia de muestreo mediante el ajuste de INI `datadog.profiling.exception_sampling_distance` (por defecto: `100`). Alternativamente, deshabilita por completo el perfilado de excepciones con `datadog.profiling.exception_enabled=0`.
- Para las asignaciones, aumenta la distancia de muestreo con `datadog.profiling.allocation_sampling_distance` (cambia el valor predeterminado de `4194304` bytes, que equivale a 4 MB, por ejemplo). También puedes desactivar el perfilado de asignaciones con `datadog.profiling.allocation_enabled=0`.

Aumentar la distancia de muestreo reduce la frecuencia de las muestras recopiladas,
reduciendo la actividad del perfilador y ayudando a controlar el impacto en el tiempo de ejecución. Sin embargo
también reduce la granularidad de los datos de perfilado.

Consulta los [documentos de configuración][2] para más detalles sobre la configuración de la distancia de muestreo.

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/help/
[2]: /es/tracing/trace_collection/library_config/php/#environment-variable-configuration
[3]: /es/profiler/profile_visualizations/#timeline-view
[4]: #fine-tuning-sampling-distances