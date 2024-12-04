---
code_lang: Python
code_lang_weight: 20
further_reading:
- link: /tracing/troubleshooting
  tag: Documentación
  text: Solucionar problemas de APM
title: Solucionar problemas del generador de perfiles Python
type: lenguaje de código múltiple
---

## Perfiles faltantes en la página de búsqueda de perfiles

Si has configurado el generador de perfiles y no ves perfiles en la página de búsqueda de perfiles, activa el [modo de depuración][1] y [abre un ticket de asistencia][2]. En el ticket de asistencia, incluye los archivos de depuración junto con la siguiente información:

- Tipo y versión del sistema operativo (por ejemplo, Linux Ubuntu 20.04)
- Tipo de tiempo de ejecución, versión y proveedor (por ejemplo, Python 3.9.5)

Para obtener más información, consulta la [documentación para la resolución de problemas][3] del cliente APM Python.


## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/tracing/troubleshooting/#tracer-debug-logs
[2]: /es/help/
[3]: https://ddtrace.readthedocs.io/en/stable/troubleshooting.html