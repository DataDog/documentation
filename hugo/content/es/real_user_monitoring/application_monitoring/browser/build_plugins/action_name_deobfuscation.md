---
algolia:
  tags:
  - action names
  - build plugins
  - privacy
  - deobfuscation
description: Restaure nombres de acciones RUM legibles en compilaciones minificadas
  generando un diccionario de privacidad en tiempo de compilación que asigna valores
  ofuscados a su texto original.
further_reading:
- link: /real_user_monitoring/application_monitoring/browser/tracking_user_actions
  tag: Documentación
  text: Seguimiento de acciones de usuario
- link: /data_security/real_user_monitoring
  tag: Documentación
  text: RUM Data Security
- link: https://www.datadoghq.com/blog/rum-build-time-privacy-allowlist/
  tag: Blog
  text: Reduzca la exposición de datos confidenciales con listas de permitidos en
    tiempo de compilación
- link: https://github.com/DataDog/build-plugins
  tag: Código fuente
  text: Repositorio de GitHub de plugins de compilación de Datadog
title: Desofuscación de nombres de acciones
---
## Descripción general {#overview}

Cuando habilita el parámetro de inicialización [`enablePrivacyForActionName`][1], los nombres de las acciones se enmascaran por privacidad. En compilaciones minificadas, los nombres de las acciones también pueden volverse ilegibles porque los empaquetadores ofuscan el texto y los atributos del elemento DOM que RUM utiliza para generar nombres de acciones.

El plugin de compilación de Desofuscación de nombres de acciones aborda ambos problemas instrumentando su código fuente en tiempo de compilación para generar un diccionario de privacidad que asigna valores ofuscados de nuevo a su texto original. El SDK de RUM utiliza este diccionario para resolver nombres de acciones legibles.

## Requisitos previos {#prerequisites}

- El SDK de RUM inicializado con `trackUserInteractions: true` y `enablePrivacyForActionName: true`. Consulte [Enmascarar todos los nombres de acciones][1].
- El plugin de compilación de Datadog instalado y registrado con su empaquetador. Consulte [Plugins de compilación][2] para obtener instrucciones de instalación.

## Configuración {#configuration}

Configure el objeto `rum.privacy` en las opciones de su plugin de compilación:

| Parámetro | Tipo | Requerido | Predeterminado | Descripción |
|-----------|------|----------|---------|-------------|
| `rum.privacy.include` | Matriz de RegExp o String | No | Archivos JS/TS (.js, .ts, .jsx, .tsx, .mjs, .cjs y variantes) | Patrones de archivo para procesar para la desofuscación de nombres de acciones. |
| `rum.privacy.exclude` | Matriz de RegExp o String | No | `node_modules`, `.preval.` archivos | Patrones de archivo para omitir. |

## Ejemplo {#example}

Con la configuración predeterminada (procesa todos los archivos JS/TS, excluye `node_modules`):

```javascript
const { datadogWebpackPlugin } = require('@datadog/webpack-plugin');

module.exports = {
  plugins: [
    datadogWebpackPlugin({
      rum: {
        privacy: {},
      },
    }),
  ],
};
```

Con patrones personalizados de inclusión y exclusión:

```javascript
const { datadogWebpackPlugin } = require('@datadog/webpack-plugin');

module.exports = {
  plugins: [
    datadogWebpackPlugin({
      rum: {
        privacy: {
          include: [/\.jsx?$/, /\.tsx?$/],
          exclude: [/\/node_modules\//, /\/test\//],
        },
      },
    }),
  ],
};
```

<div class="alert alert-info">Estos ejemplos utilizan webpack. El objeto de configuración es idéntico en todos los empaquetadores compatibles. Consulte <a href="/real_user_monitoring/application_monitoring/browser/build_plugins/">Plugins de compilación</a> para obtener instrucciones de instalación.</div>

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/real_user_monitoring/application_monitoring/browser/tracking_user_actions#mask-all-action-names
[2]: /es/real_user_monitoring/application_monitoring/browser/build_plugins/