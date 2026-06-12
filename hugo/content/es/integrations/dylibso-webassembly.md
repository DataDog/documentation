---
app_id: webassembly-observe-sdk
app_uuid: 30eb706f-9143-461e-99af-89015e8493d5
assets: {}
author:
  homepage: https://dylibso.com
  name: Dylibso
  sales_email: sales@dylibso.com
  support_email: support@dylibso.com
categories:
- herramientas para desarrolladores
- lenguajes
- rastreo
custom_kind: integración
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/dylibso-webassembly/README.md
display_on_public_website: true
draft: false
git_integration_title: dylibso-webassembly
integration_id: webassembly-observe-sdk
integration_title: SDK de WebAssembly Observe
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: dylibso-webassembly
public_title: SDK de WebAssembly Observe
short_description: Extraer trazas (traces) del código WebAssembly (wasm) de cualquier
  tiempo de ejecución
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Developer Tools
  - Category::Languages
  - Category::Tracing
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  - Submitted Data Type::Traces
  - Offering::Integration
  configuration: README.md#Instalación
  description: Extraer trazas (traces) del código WebAssembly (wasm) de cualquier
    tiempo de ejecución
  media:
  - caption: Visualizar trazas capturadas del código WebAssembly que se ejecuta en
      tu aplicación
    image_url: images/wasm-observability.png
    media_type: imagen
  overview: README.md#Overview
  support: README.md#Support
  title: SDK de WebAssembly Observe
---

<!--  EXTRAÍDO DE https://github.com/DataDog/integrations-extras -->


## Información general

Esta integración proporciona trazas de función del código WebAssembly (WASM) que se ejecuta en tu aplicación. Obtén información sobre el rendimiento del código WebAssembly, así como el siguiente comportamiento:
- Duración de la llamada de función
- Rastreo de la ejecución
- Asignación de memoria

Dado que el código WebAssembly se ejecuta en un entorno seguro y restringido, las técnicas tradicionales para monitorizar código no funcionan. Nuestro stack tecnológico de observabilidad especializado te permite monitorizar módulos WASM continuamente al mismo nivel que se espera de tus otras aplicaciones.

Los clientes de Datadog pueden utilizar nuestros SDK y adaptadores de código abierto para emitir trazas completas desde tus programas WASM. Consulta el repositorio [`dylibso/observe-sdk`][1] para instalar el adaptador de Datadog para tu aplicación.

Además, Dylibso proporciona herramientas de instrumentación automática que pueden tomar cualquier módulo WASM existente y recompilarlo para incluir el rastreo de la función y la asignación de memoria. Para obtener más información, contacta con [support@dylibso.com][2] o aprende más sobre [la Instrumentación automática de WebAssembly][3].


## Configuración

### Instalación

Según el lenguaje de programación en el que esté escrita tu aplicación, elige uno de los adaptadores de Datadog apropiados de [`dylibso/observe-sdk`][1] en GitHub.


### Configuración

Para conectar el SDK y el Adaptador a tu Datadog Agent, debes tener preparada la siguiente información:

1. Tu URL de host del Datadog Agent.
2. El nombre de servicio de la aplicación donde se importan el SDK y el Adaptador.

### Validación

Una vez que hayas importado y configurado tu Adaptador de Datadog desde las opciones disponibles dentro del SDK de Observe:

1. Vuelve a desplegar tu aplicación para que el adaptador de Datadog se incluya en el lugar en el que llamas al código WebAssembly.
2. Asegúrate de que se ha cargado un módulo WebAssembly (`.wasm`) y de que estás llamando a una de sus funciones exportadas.
3. Busca en tu dashboard de Datadog las trazas enviadas desde tu servicio.

## Datos recopilados

### Eventos

El SDK de WebAssembly Observe recopila trazas de ejecución de función y eventos de asignación de memoria desde tu aplicación.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [soporte de Dylibso][2].

[1]: https://github.com/dylibso/observe-sdk
[2]: mailto:support@dylibso.com
[3]: https://dylibso.com/products/observe