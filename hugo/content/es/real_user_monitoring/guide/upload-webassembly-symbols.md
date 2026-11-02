---
description: Cargue los símbolos de depuración de WebAssembly para que las trazas
  de pila de WASM recopiladas de las aplicaciones de navegador sean legibles.
further_reading:
- link: /error_tracking/frontend/browser
  tag: Documentación
  text: Configure Browser Error Tracking
- link: /real_user_monitoring/guide/upload-javascript-source-maps
  tag: Documentación
  text: Cargue los mapas del código fuente de JavaScript
- link: /real_user_monitoring/guide/debug-symbols
  tag: Documentación
  text: Investigue trazas de pila ofuscadas con RUM Debug Symbols
- link: https://github.com/DataDog/datadog-ci/tree/master/packages/base/src/commands/wasm-symbols
  tag: Código fuente
  text: Referencia de comandos de símbolos de WebAssembly
title: Cargue los símbolos de WebAssembly
---
## Descripción general {#overview}

WebAssembly (WASM) se ejecuta como parte de una aplicación de navegador. No es un tipo de aplicación de Datadog independiente. El SDK de navegador de Datadog recopila errores de WASM con el contexto del navegador circundante, y el Datadog Error Tracking puede simbolizar sus marcos de pila de WASM con información de depuración DWARF cargada.

Un solo error puede contener marcos tanto de JavaScript como de WASM. Cargue [mapas de origen de JavaScript][1] para los marcos de JavaScript y símbolos de WASM para los marcos de WASM.

<div class="alert alert-warning">La simbolización de WebAssembly está en versión beta. El complemento del SDK de navegador y el <code>datadog-ci wasm-symbols upload</code> comando son experimentales y pueden cambiar.</div>

## Requisitos previos {#prerequisites}

Antes de cargar los símbolos, asegúrese de tener:

- Una aplicación de navegador configurada para recopilar metadatos de módulos WASM con [RUM][2], [Registros de navegador][3], o ambos.
- Un archivo de símbolos `.wasm` con secciones de depuración DWARF integradas y una sección personalizada `build_id`.
- `@datadog/datadog-ci` versión 5.23.0 o posterior.

## Genere símbolos de depuración {#generate-debug-symbols}

Configure su cadena de herramientas WASM para generar:

- Secciones DWARF integradas como `.debug_info` y `.debug_line`.
- Una sección personalizada `build_id`. El ID de compilación en el archivo de símbolos cargado debe coincidir con el ID de compilación en el módulo cargado por el navegador.

Por ejemplo, con Emscripten:

```shell
emcc -g -Wl,--build-id <SOURCES> -o <OUTPUT>.js
```

Este comando produce `<OUTPUT>.js`, el cargador de JavaScript, y `<OUTPUT>.wasm`, el binario de WebAssembly que contiene la información DWARF integrada y la sección personalizada `build_id`.

Puede inspeccionar el módulo generado con `wasm-objdump`:

```shell
wasm-objdump -h <OUTPUT>.wasm
wasm-objdump -j build_id -x <OUTPUT>.wasm
```

Conserve el archivo de símbolos como un artefacto de compilación para que pueda cargarlo desde su canalización de CI.

## Cargue sus símbolos {#upload-your-symbols}

Instale la CLI de Datadog y configure su clave de Datadog API y sitio:

```shell
npm install --save-dev @datadog/datadog-ci
export DATADOG_API_KEY=<DATADOG_API_KEY>
export DATADOG_SITE={{< region-param key="dd_site" >}}
```

Habilite los comandos beta y cargue un archivo `.wasm` o un directorio. Cuando se proporciona un directorio, la CLI lo busca de forma recursiva para encontrar archivos `.wasm`:

```shell
DD_BETA_COMMANDS_ENABLED=1 datadog-ci wasm-symbols upload /path/to/build
```

El comando omite los archivos que no contienen tanto información DWARF integrada como una sección personalizada `build_id`. Use `--dry-run` para validar los archivos de símbolos sin cargarlos:

```shell
DD_BETA_COMMANDS_ENABLED=1 datadog-ci wasm-symbols upload /path/to/build --dry-run
```

De forma predeterminada, Datadog conserva el primer archivo de símbolos cargado para un ID de compilación. Use `--replace-existing` cuando necesite reemplazarlo intencionalmente.

<div class="alert alert-info">El cargador no resuelve una <code>external_debug_info</code> referencia. Un módulo de tiempo de ejecución que contiene solo esta referencia se omite. Cargue un archivo de símbolos que contenga secciones DWARF integradas y la misma <code>build_id</code> que el módulo de tiempo de ejecución.</div>

## Cómo se comparan los símbolos {#how-symbols-are-matched}

Datadog utiliza los metadatos de la URL del módulo para asociar cada marco de pila WASM con un módulo, y luego hace coincidir el módulo con sus símbolos cargados mediante `build_id`. A diferencia de los mapas de origen de JavaScript, `service` y `version` no forman parte de la búsqueda de símbolos de WASM.

Puede visualizar los archivos cargados en la [RUM Debug Symbols page][4].

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/real_user_monitoring/guide/upload-javascript-source-maps/
[2]: /es/real_user_monitoring/application_monitoring/browser/collecting_browser_errors/#configure-webassembly-error-tracking
[3]: /es/logs/log_collection/javascript/#webassembly-errors
[4]: https://app.datadoghq.com/source-code/setup/rum