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

Si la sobrecarga por defecto no es aceptable, puedes deshabilitar algunos de los tipos de muestras
que recopila el generador de perfiles cambiando los siguientes parámetros INI:

- `datadog.profiling.allocation_enabled`: controla la generación de perfiles de asignaciones
- `datadog.profiling.experimental_cpu_time_enabled`: controla las muestras de tiempo de CPU
- `datadog.profiling.exception_enabled`: controla la generación de perfiles de excepción

Si deshabilitas estos tipos de muestras, sólo se recopilarán muestras
de tiempo real.

Para ver otros parámetros INI y sus correspondientes variables de entorno, consulta los [documentos de configuración][2].

## Excepciones que saturan el generador de perfiles

En condiciones normales, el generador de perfiles de excepciones de Datadog ocupa poco espacio
y tiene poca sobrecarga. Si se crean y lanzan muchas excepciones, se puede causar
una sobrecarga significativa para el generador de perfiles. Esto puede ocurrir cuando se utilizan excepciones
para el flujo (flow) de control.

Si tienes una tasa de excepciones inusualmente alta, puedes desactivar la generación de perfiles de excepciones configurando `datadog.profiling.exception_enabled` como `0`, o puedes
cambiar la distancia de muestreo utilizando el parámetro INI
`datadog.profiling.exception_sampling_distance` (por defecto `100`)
a un valor más alto. Cuanto mayor sea la distancia de muestreo, menos muestras se crearán
y menor será la sobrecarga.

Para ver la documentación del muestreo de excepciones, consulta los [documentos de configuración][2].

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}


[1]: /es/help/
[2]: /es/tracing/trace_collection/library_config/php/#environment-variable-configuration