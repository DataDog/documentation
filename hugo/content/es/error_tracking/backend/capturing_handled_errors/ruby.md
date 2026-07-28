---
code_lang: ruby
code_lang_weight: 10
title: Captura de excepciones gestionadas en aplicaciones Ruby
type: multi-code-lang
---

## Requisitos de compatibilidad

Debes estar ejecutando:
- Ruby `2.7+`. JRuby y TruffleRuby no son compatibles.
- Gema Datadog Ruby (`datadog`) `v2.16.0+`.

## Empezando

Antes de empezar, asegúrate de que ya has [instalado y configurado el Agent][1]. También necesitas [añadir la biblioteca de rastreo][2] directamente en la aplicación para instrumentarla.

### Instrumentación automática

Para habilitar la notificación automática de errores gestionados, puedes definir una de estas dos variables de entorno:

`DD_ERROR_TRACKING_HANDLED_ERRORS`
: Para informar errores gestionados desde código de usuario, gemas de terceros o ambos. Los valores aceptados son: `user`, `third_party`, `all`.

`DD_ERROR_TRACKING_HANDLED_ERRORS_INCLUDE`
: Para proporcionar una lista de rutas separadas por comas, nombres de archivo y nombres de gema de los que se informarán errores gestionados. Los posibles valores separados por comas deben ser:
: - **Un nombre de archivo**: Por ejemplo, `main` para instrumentar el archivo `main.rb`.
: - **Un nombre de carpeta**: Por ejemplo, `subdir` para instrumentar todos los archivos Ruby de las carpetas denominadas `subdir`.
: - **Un nombre de gema**: Por ejemplo, `rails` para instrumentar todos los archivos Ruby de la gema `rails` y todos los archivos Ruby de las carpetas denominadas `rails`.
: - **Una ruta absoluta** (una ruta que empiece por `/`): Por ejemplo, `/app/lib/mypackage/main.rb` para instrumentar ese archivo o `/app/lib/mypackage` para instrumentar todos los archivos Ruby de esa carpeta.
: - **Una ruta relativa al directorio actual** (una ruta que empieza por `./`): Por ejemplo, si ejecutas tu programa en `/app/`, utiliza `./lib/mypackage/main.rb` para instrumentar el archivo `main.rb`, o `./lib/mypackage/` para instrumentar todos los archivos Ruby de esa carpeta.

: Para Ruby `v3.3+`, se buscará la ubicación donde se rescató el error.
: Para versiones anteriores de Ruby, se buscará la ubicación donde se advirtió el error.

Alternativamente, puedes definir cualquiera de estos parámetros de Error Tracking en código, dentro de un bloque `Datadog.configure`:

- `c.error_tracking.handled_errors` para informar de errores gestionados desde código de usuario, gemas de terceros o ambos. Los valores aceptados son: `user,third_party,all`.
- `c.error_tracking.handled_errors_include` para proporcionar una lista de rutas separadas por comas, nombres de archivo y nombres de gema de los que se informarán errores gestionados. Los valores posibles se especifican en `DD_ERROR_TRACKING_HANDLED_ERRORS_INCLUDE` en la tabla anterior. Para Ruby `v3.3+`, se buscará la ubicación en la que se rescató el error. Para versiones anteriores de Ruby, se buscará la ubicación en la que se advirtió el error.

```Ruby
Datadog.configure do |c|
  # To report handled errors from user code
  c.error_tracking.handled_errors = 'user'

  # Or to provide a list of comma-separated paths, file names, and gem names for which handled errors will be reported
  c.error_tracking.handled_errors_include = ['sinatra', 'subdir']
end
```

[1]: /es/error_tracking/backend/getting_started/#getting-started-with-backend-error-tracking
[2]: /es/tracing/trace_collection/automatic_instrumentation/dd_libraries/ruby