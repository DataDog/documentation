---
code_lang: python
code_lang_weight: 10
title: Captura de excepciones gestionadas en aplicaciones Python
type: multi-code-lang
---

## Requisitos de compatibilidad
Esta función está disponible en `Python3.10+` y `ddtrace 3.8.0+`.

## Empezando

Antes de empezar, asegúrate de que ya has [instalado y configurado el Agent][1]. También necesitas [añadir la biblioteca de rastreo][2] directamente en la aplicación para instrumentarla.

### Instrumentación automática

Para habilitar la notificación automática de errores gestionados, puedes definir una de estas dos variables de entorno:

- ``DD_ERROR_TRACKING_HANDLED_ERRORS``. Accepted values are: `user`, `third_party` or ,`all`.
Esta variable de entorno permite informar de errores gestionados respectivamente desde el código de usuario, los paquetes de terceros o ambos.
- ``DD_ERROR_TRACKING_HANDLED_ERRORS_INCLUDE`` = ``module1, module2...``.
Enumera los módulos de los que deben informarse los errores gestionados. Es necesario especificar el nombre completo del módulo. Por ejemplo, para instrumentar el módulo `security` en tu aplicación `mysite`, debes especificar
`mysite.security`

Los errores gestionados se informarán en Error Tracking y se adjuntarán a los tramos (spans) mediante [eventos de tramos][3].

Si estás ejecutando `Python3.10` o `Python3.11` y quieres instrumentar el módulo ``__main__``, tienes que añadir:

```Python
from ddtrace.errortracking._handled_exceptions.bytecode_reporting import instrument_main

if __name__ == "__main__":
  instrument_main()
```

Este código debe añadirse después de las definiciones de las funciones que contienen errores gestionados.

### Instrumentación manual

Puedes notificar manualmente los errores gestionados mediante ``span.record_exception(e)``:

```Python
from ddtrace import tracer

try:
    raise ValueError("foo")
except ValueError as e:
    span = tracer.current_span()
    if span:
        span.record_exception(e)
```

Esta llamada creará un evento de tramo en el tramo con la información del error y lo informará a Error Tracking.
También puedes proporcionar atributos adicionales utilizando:

```Python
span.record_exception(e, {"foo": "bar"})
```

[1]: /es/error_tracking/backend/getting_started/#getting-started-with-backend-error-tracking
[2]: /es/tracing/trace_collection/automatic_instrumentation/dd_libraries/python/
[3]: /es/tracing/trace_collection/custom_instrumentation/python/otel/#adding-span-events