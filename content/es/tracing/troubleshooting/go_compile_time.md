---
further_reading:
- link: /tracing/trace_collection/automatic_instrumentation/dd_libraries/go/
  tag: Documentación
  text: Rastreo de aplicaciones Go
title: Solucionar problemas de instrumentación del tiempo de compilación Go
---

## Información general

Esta guía explica cómo solucionar los problemas de las compilaciones que gestiona [Orchestrion][1]. Estos procedimientos pueden ayudar a Datadog a recopilar información sobre los procesos de compilación y pueden ayudar con los informes de errores.

<div class="alert alert-danger">Los archivos generados pueden contener información confidencial del proyecto, como el código fuente y los nombres de las dependencias. Si te preocupa compartir esta información públicamente, ponte en contacto con el servicio de asistencia de Datadog para compartir los datos de forma privada.</div>

## Conservar el árbol de trabajo

Orchestrion registra las transformaciones de las compilaciones en el árbol de trabajo `go build`. Para evitar que la cadena de herramientas `go` limpie este directorio después de la compilación, utiliza la marca `-work`:

```shell
orchestrion go build -work ./...
WORK=/tmp/go-build2455442813
```

La localización del árbol de trabajo se imprime al inicio de la compilación, marcada con `WORK=`. Este directorio contiene subdirectorios de cada paquete de `go` compilado, llamados _directorios de staging_.

## Contenido del árbol de trabajo

Cuando Orchestrion inyecta código en un archivo fuente, escribe el archivo modificado en el directorio de staging del paquete (`$WORK/b###`), en el subdirectorio `orchestrion/src`. Para las configuraciones de importación de paquetes modificados, el archivo original se conserva con un sufijo `.original`. Puedes inspeccionar estos archivos legibles por humanos para verificar las acciones de Orchestrion. Para obtener ayuda con la interpretación de estos archivos, ponte en contacto con el servicio de asistencia de Datadog.

## Configuración de la generación de logs

### Niveles de logs

Controla el resultado de la generación de logs de Orchestrion utilizando la variable de entorno `ORCHESTRION_LOG_LEVEL` o la marca `--log-level`:

| Nivel | Descripción |
|-------|-------------|
| `NONE` `OFF` (por defecto) | No hay resultados de la generación de logs |
| `ERROR` | Sólo información sobre errores |
| `WARN` | Errores y advertencias |
| `INFO` | Errores, advertencias y mensajes informativos |
| `DEBUG` | Generación de logs detallada |
| `TRACE` | Generación de logs extremadamente detallada |

<div class="alert alert-danger">Configurar el<code>NIVEL_DE_LOGS_DE_ORCHESTRION</code> en los niveles <code>DEPURAR</code> o <code>RASTREAR</code> puede tener un impacto significativo en el rendimiento de la compilación. Estos parámetros no son recomendado para operaciones normales.</div>

### Resultado del archivo de logs

Escribe mensajes de generación de logs en archivos, en lugar de hacerlo en la consola, configurando la variable de entorno `ORCHESTRION_LOG_FILE` o la marca `--log-file` con la ruta de archivo deseada.

<div class="alert alert-info">Configurar el <code>ARCHIVO_DE_LOGS_DE_ORCHESTRION</code> cambia el valor por defecto del <code>NIVEL_DE_LOGS_DE_ORCHESTRION</code> a <code>ADVERTIR</code>.</div>

La ruta del archivo de logs puede incluir los tokens `$PID` o `${PID}`, que se sustituyen por el PID del proceso de generación de logs. Esto reduce la discrepancia entre archivos, pero crea muchos archivos de logs en proyectos grandes.

La generación de logs se añade a los archivos existentes en lugar de sobrescribirlos, independientemente de la presencia de `$PID` en la ruta del archivo.

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/orchestrion