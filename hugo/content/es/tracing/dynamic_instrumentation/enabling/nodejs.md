---
aliases:
- /es/dynamic_instrumentation/enabling/nodejs
code_lang: nodejs
code_lang_weight: 30
description: Configura aplicaciones de Dynamic Instrumentation para Node.js para que
  añadan sondas y capturen datos sin cambios en el código.
further_reading:
- link: contenedores
  tag: Documentación
  text: Empezando con Datadog Agent
private: false
title: Habilitar Dynamic Instrumentation para Node.js
type: multi-code-lang
---

Dynamic Instrumentation es una característica de apoyo para las bibliotecas de rastreo de Datadog. Si ya estás utilizando [APM para recopilar trazas (traces)][1] para tu aplicación, asegúrate de que tu Agent y biblioteca de rastreo están en la versión requerida. A continuación, ve directamente a la activación de Dynamic Instrumentation en el paso 4.

## Instalación

1. Instala o actualiza tu Agent a la versión [7.49.0][6] o posterior.
2. Si aún no tienes APM habilitado, en tu configuración del Agent, establece la variable de entorno `DD_APM_ENABLED` en `true` y escuchando en el puerto `8126/TCP`.
3. Instala o actualiza la biblioteca de rastreo de Node.js a la versión 5.48.0 o posterior, siguiendo las [instrucciones pertinentes][2].
4. Si tu código fuente se transpila durante el despliegue (por ejemplo, si utilizas TypeScript), asegúrate de que los mapas de fuentes se publican junto con la aplicación Node.js desplegada.
5. Ejecuta tu servicio con Dynamic Instrumentation habilitada, al configurar la variable de entorno `DD_DYNAMIC_INSTRUMENTATION_ENABLED` en `true`. Especifica las etiquetas (tags) de servicio unificado `DD_SERVICE`, `DD_ENV` y `DD_VERSION` para que puedas filtrar y agrupar tus instrumentaciones y dirigirte a los clientes activos a través de estas dimensiones.
6. Después de iniciar tu servicio con Dynamic Instrumentation activada, puedes empezar a utilizar Dynamic Instrumentation en la página [APM > Dynamic Instrumentation][3].

## Configuración

Configurar Dynamic Instrumentation utilizando las siguientes variables de entorno:

| Variable de entorno                             | Tipo          | Descripción                                                                                                               |
| ------------------------------------------------ | ------------- | ------------------------------------------------------------------------------------------------------------------------- |
| `DD_DYNAMIC_INSTRUMENTATION_ENABLED`             | Booleano       | Selecciona `true` para activar Dynamic Instrumentation.                                                                          |
| `DD_SERVICE`                                     | Cadena        | El nombre de [servicio][5], por ejemplo, `web-backend`.                                                                        |
| `DD_ENV`                                         | Cadena        | El nombre de [entorno][5], por ejemplo, `production`.                                                                     |
| `DD_VERSION`                                     | Cadena        | La [versión][5] de tu servicio.                                                                                         |
| `DD_TAGS`                                        | Cadena        | Etiquetas para aplicar a los datos producidos. Debe ser una lista de `<key>:<value>` separada por comas como: `layer:api,team:intake`.   |

## Compatibilidad con mapas de fuentes

Si el código fuente de tu aplicación Node.js está transpilado o empaquetado,
debes generar y publicar mapas de fuentes junto con el código, ya sea en línea o como archivos independientes.

* **TypeScript**: Configura [`inlineSourceMap`][10] o [`sourceMap`][11] como `true` en el archivo de configuración de TypeScript.
* **Babel**: Configura la opción [`sourceMaps`][12] en el archivo de configuración de Babel (consulta también la opción de CLI especial `--source-maps`, que se utiliza para generar archivos de mapas de fuentes independientes).
* **Webpack**: Configura la opción [`devtools`][13] en el archivo de configuración de Webpack.
* **CoffeeScript**: Utiliza `--inline-map` o `--map` como argumentos para la CLI [`coffee`][14].

**Nota:** Para un mejor rendimiento en tiempo de ejecución, se recomienda *no* incluir el código fuente original en los mapas de fuentes.

## ¿Qué hacer a continuación?

Consulta [Dynamic Instrumentation][4] para obtener información sobre cómo añadir instrumentaciones y explorar e indexar los datos.

## Limitaciones

Las siguientes limitaciones se aplican a la implementación de Node.js:

### Funciones compatibles

- [Logs dinámicos][7] adjuntos a un archivo/una línea específicos
- Captura de variables de logs dinámicos
- [Redacción de PII][8] basada en nombres de variables/propiedades
- [Integración del código fuente][9] (incluyendo la compatibilidad con mapas de fuentes)

### Funciones no compatibles

- Métricas, tramos y etiquetas de tramos (span) dinámicos
- Logs dinámicos adjuntos a una función/un método
- Redacción de PII basada en clases o tipos específicos

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/tracing/trace_collection/
[2]: /es/tracing/trace_collection/dd_libraries/nodejs/
[3]: https://app.datadoghq.com/dynamic-instrumentation
[4]: /es/dynamic_instrumentation/
[5]: /es/getting_started/tagging/unified_service_tagging
[6]: https://app.datadoghq.com/account/settings/agent/latest?platform=overview
[7]: /es/dynamic_instrumentation/#creating-log-probes
[8]: /es/dynamic_instrumentation/sensitive-data-scrubbing/#custom-identifier-redaction
[9]: /es/integrations/guide/source-code-integration/?tab=nodejs#embed-git-information-in-your-build-artifacts
[10]: https://www.typescriptlang.org/tsconfig/#inlineSourceMap
[11]: https://www.typescriptlang.org/tsconfig/#sourceMap
[12]: https://babeljs.io/docs/options#sourcemaps
[13]: https://webpack.js.org/configuration/devtool/
[14]: https://coffeescript.org/#usage