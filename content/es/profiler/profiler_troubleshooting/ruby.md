---
code_lang: Ruby
code_lang_weight: 40
further_reading:
- link: /tracing/troubleshooting
  tag: Documentación
  text: Solucionar problemas de APM
title: Solucionar problemas del generador de perfiles Ruby
type: lenguaje de código múltiple
---

## Perfiles faltantes en la página de búsqueda de perfiles

Si has configurado el generador de perfiles y no ves perfiles en la página de búsqueda de perfiles, activa el [modo de depuración][1] y [abre un ticket de asistencia][2]. En el ticket de asistencia, incluye los archivos de depuración junto con la siguiente información:

- Tipo y versión del sistema operativo (por ejemplo, Ubuntu Linux 24.04)
- Tipo, versión y proveedor de tiempo de ejecución (por ejemplo, Ruby 3.3.1)

## Perfiles faltantes en tareas de Resque

Al generar perfiles de tareas de [Resque][4], debes configurar la variable de entorno `RUN_AT_EXIT_HOOKS`
como `1`, como se describe en la
[documentación de Resque][5].

Sin esta marca, los perfiles de tareas de Resque de corta duración no estarán disponibles.

## La generación de perfiles no se activa debido al fallo de la compilación de la cabecera just-in-time de la máquina virtual Ruby

Existe una incompatibilidad conocida entre Ruby 2.7 y las versiones anteriores de GCC (4.8 y anteriores) que afecta al generador de perfiles ([informe de Ruby subsiguiente][6], [informe de fallos `dd-trace-rb`][7]). Esto puede dar lugar al siguiente mensaje de error "Tu instalación de ddtrace no es compatible con el Continuous Profiler debido al fallo de la compilación de la cabecera just-in-time de la máquina virtual Java Ruby. Tu compilador de C o el compilador just-in-time de la máquina virtual Java Ruby parecen estar averiados".

Para solucionarlo, actualiza tu sistema operativo o imagen Docker para que la versión de GCC sea más reciente que la versión 4.8.

Para obtener más ayuda y resolver este problema, [ponte en contacto con el servicio de asistencia][2] e incluye el resultado de la ejecución de `DD_PROFILING_FAIL_INSTALL_IF_MISSING_EXTENSION=true gem install datadog` y el archivo `mkmf.log` resultante.

## Cuando los backtraces son demasiado profundos se omiten los marcos

El generador de perfiles Ruby trunca los backtraces profundos cuando recopila datos de generación de perfiles. A los backtraces truncados les faltan algunas de sus funciones de llamada, lo que hace imposible vincularlos al marco de llamada raíz. Como resultado, los backtraces truncados se agrupan en un marco `N frames omitted`.

Puedes aumentar la profundidad máxima con la variable de entorno`DD_PROFILING_MAX_FRAMES` o utilizando código:

```ruby
Datadog.configure do |c|
  c.profiling.advanced.max_frames = 500
end
```

## Fallos o errores inesperados de los gems de Ruby que utilizan extensiones nativas

El generador de perfiles Ruby recopila datos enviando señales UNIX `SIGPROF` a las aplicaciones Ruby, lo que permite una recopilación de datos más detallada.

El envío de `SIGPROF` es una estrategia de generación de perfiles frecuente y puede causar la interrupción de las llamadas al sistema desde extensiones/bibliotecas nativas con un [código de error `EINTR`][8] del sistema.
En raras ocasiones, las extensiones o bibliotecas nativas llamadas pueden tener una gestión de errores faltante o incorrecta para el código de error `EINTR`.

Se conocen las siguientes incompatibilidades:
* Uso del gem `mysql2` junto con versiones de `libmysqlclient` [anteriores a la v8.0.0][9]. Se sabe que la versión `libmysqlclient` afectada está presente en Ubuntu v18.04, pero no en la v20.04 o en versiones posteriores.
* [Uso del gem `rugged`][10]
* Uso del gem `passenger`/servidor web Phusion Passenger [anterior a v6.0.19][11]
* [Algunas API de la clase `Dir`][13]

En estos casos, la última versión del generador de perfiles detecta automáticamente la incompatibilidad y aplica una solución alternativa.

Si encuentras fallos o errores en los gems de Ruby que utilizan extensiones nativas distintas de las mencionadas anteriormente, puedes habilitar manualmente la solución alternativa "sin señales", que evita el uso de señales `SIGPROF`.
Para habilitar esta solución alternativa, configura la variable de entorno`DD_PROFILING_NO_SIGNALS_WORKAROUND_ENABLED` como `true` o utiliza código:

```ruby
Datadog.configure do |c|
  c.profiling.advanced.no_signals_workaround_enabled = true
end
```

Informa a nuestro equipo si encuentras o sospechas de alguna incompatibilidad. Para ello, [abre un ticket de asistencia][2].
De este modo, Datadog podrá añadirlas a la lista de detección automática y trabajar con los autores del gem o de la librería para solucionar el problema.

## Fallos de segmentación en `gc_finalize_deferred` en las versiones de Ruby 2.6 a 3.2

Una solución alternativa para este problema se aplica automáticamente a partir de la [versión 1.21.0 `dd-trace-rb`][3]. Para solucionar este problema, Datadog recomienda actualizar a esta versión o a una versión posterior.

Antes de la versión 1.21.0, en raras situaciones el generador de perfiles era capaz de activar [Ruby VM Bug #19991][12], que se manifiesta como un "Fallo de segmentación" con una traza (trace) de stack tecnológico de fallos que incluye la función `gc_finalize_deferred`.

Este error se ha corregido para Ruby v3.3 y posteriores. Para versiones anteriores de Ruby (y anteriores a dd-trace-rb v1.21.0), puedes utilizar la solución alternativa "sin señales" para resolver este problema.

Para habilitar esta solución alternativa, configura la variable de entorno`DD_PROFILING_NO_SIGNALS_WORKAROUND_ENABLED` como `true` o utiliza código:

```ruby
Datadog.configure do |c|
  c.profiling.advanced.no_signals_workaround_enabled = true
end
```

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}


[1]: /es/tracing/troubleshooting/#debugging-and-logging
[2]: /es/help/
[3]: https://github.com/datadog/dd-trace-rb/releases/tag/v1.21.0
[4]: https://github.com/resque/resque
[5]: https://github.com/resque/resque/blob/v2.0.0/docs/HOOKS.md#worker-hooks
[6]: https://bugs.ruby-lang.org/issues/18073
[7]: https://github.com/DataDog/dd-trace-rb/issues/1799
[8]: https://man7.org/linux/man-pages/man7/signal.7.html#:~:text=Interruption%20of%20system%20calls%20and%20library%20functions%20by%20signal%20handlers
[9]: https://bugs.mysql.com/bug.php?id=83109
[10]: https://github.com/DataDog/dd-trace-rb/issues/2721
[11]: https://github.com/DataDog/dd-trace-rb/issues/2976
[12]: https://bugs.ruby-lang.org/issues/19991
[13]: https://github.com/DataDog/dd-trace-rb/issues/3450
