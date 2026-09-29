---
algolia:
  tags:
  - source maps
  - build plugins
  - error tracking
description: Cargue automáticamente los mapas del código fuente de JavaScript a Datadog
  durante el tiempo de compilación para desofuscar los seguimientos de pila en Error
  Tracking y RUM.
further_reading:
- link: /real_user_monitoring/guide/upload-javascript-source-maps
  tag: Documentación
  text: Cargar mapas del código fuente de JavaScript (método manual)
- link: /real_user_monitoring/error_tracking
  tag: Documentación
  text: Error Tracking
- link: https://github.com/DataDog/build-plugins
  tag: Código fuente
  text: Repositorio de GitHub de complementos de compilación de Datadog
title: Mapas del código fuente
---
## Descripción general {#overview}

El complemento de compilación de mapas del código fuente carga automáticamente los mapas del código fuente de JavaScript a Datadog durante su compilación, lo que permite desofuscar los seguimientos de pila en [Error Tracking][1] y [RUM][2]. Esto reemplaza la necesidad de ejecutar manualmente `datadog-ci sourcemaps upload` o configurar tuberías de CI/CD para las cargas de mapas del código fuente.

El complemento se conecta al proceso de compilación, descubre todos los archivos `.js` con los archivos de mapa del código fuente `.map` correspondientes de la salida de compilación y los carga a Datadog con metadatos de git. Puede asociar mapas del código fuente con eventos por ID de depuración o por servicio y versión.

## Requisitos previos {#prerequisites}

- Una clave de Datadog API, configurada con `auth.apiKey` o la variable de entorno `DATADOG_API_KEY`.
- Mapas del código fuente habilitados en la configuración de su empaquetador. El complemento carga los mapas del código fuente pero no los genera. Consulte [Upload JavaScript Source Maps][3] para la configuración de generación de mapas del código fuente específica del empaquetador.
- Para cargas por ID de depuración, habilite la inyección de ID de depuración en el complemento de compilación.
- Para cargas por servicio y versión, inicialice el SDK de RUM con los parámetros `service` y `version` que coincidan con la configuración del complemento.
- El complemento de compilación de Datadog instalado y registrado en su empaquetador. Consulte [Build Plugins][4] para obtener instrucciones de instalación.

## Configuración {#configuration}

Las siguientes variables de entorno anulan los valores de configuración:

- `DATADOG_SITE` o `DD_SITE`: Anula `auth.site` para la URL de ingesta.
- `DATADOG_SOURCEMAP_INTAKE_URL`: Anula directamente la URL de ingesta completa.

Elija un método de coincidencia para la carga de mapas del código fuente: ID de depuración o servicio y versión. Estos métodos de carga son mutuamente excluyentes.

{{< tabs >}}
{{% tab "ID de depuración (Recomendado)" %}}

Los ID de depuración asocian cada paquete de JavaScript con su mapa del código fuente sin depender de la URL del paquete, el servicio o la versión. Utilice este método para nuevas configuraciones.

La compatibilidad con ID de depuración requiere [Datadog Build Plugins versión 3.3.0](https://github.com/DataDog/build-plugins/releases/tag/v3.3.0) o posterior.

Configure las siguientes opciones en `sourcemaps`:

| Parámetro | Tipo | Requerido | Predeterminado | Descripción |
|-----------|------|----------|---------|-------------|
| `debugId` | Booleano | Sí | Ninguno | Establezca en `true` para inyectar un ID de depuración en cada paquete de JavaScript. |
| `upload` | Booleano | Sí, para cargar | `false` | Establezca en `true` para cargar mapas del código fuente durante la compilación. Si se omite, el complemento solo inyecta ID de depuración. |
| `bailOnError` | Booleano | No | `false` | Si `true`, la compilación falla cuando ocurre un error de carga de mapa del código fuente. |
| `dryRun` | Booleano | No | `false` | Si `true`, el complemento ejecuta el proceso de carga sin enviar datos a Datadog. Utilice esto para verificar su configuración. |
| `maxConcurrency` | Número | No | `20` | Número máximo de cargas simultáneas de mapas del código fuente. |

Establezca `debugId` y `upload` en `true` para inyectar ID de depuración y cargar mapas del código fuente durante la compilación:

```javascript
const { datadogWebpackPlugin } = require('@datadog/webpack-plugin');

module.exports = {
  plugins: [
    datadogWebpackPlugin({
      auth: {
        apiKey: process.env.DATADOG_API_KEY,
        site: 'datadoghq.com', // Optional: defaults to datadoghq.com
      },
      sourcemaps: {
        debugId: true,
        upload: true,
      },
    }),
  ],
};
```

{{% /tab %}}
{{% tab "Servicio y versión" %}}

Configure el objeto `errorTracking.sourcemaps` para cargar mapas del código fuente utilizando la coincidencia de servicio y versión:

| Parámetro | Tipo | Requerido | Predeterminado | Descripción |
|-----------|------|----------|---------|-------------|
| `service` | Cadena | Sí | Ninguno | Nombre del servicio. Debe coincidir con el parámetro de inicialización `service` del SDK de RUM. |
| `releaseVersion` | Cadena | Sí, a menos que `metadata.version` esté configurado | Ninguno | Versión de lanzamiento. Debe coincidir con el parámetro de inicialización `version` del SDK de RUM. |
| `minifiedPathPrefix` | Cadena | Sí | Ninguno | URL o prefijo de ruta relativo a la raíz donde se sirven sus archivos JavaScript minificados. Por ejemplo, `https://example.com/static/` o `/static/`. |
| `bailOnError` | Booleano | No | `false` | Si `true`, la compilación falla cuando ocurre un error de carga de mapa del código fuente. |
| `dryRun` | Booleano | No | `false` | Si `true`, el complemento ejecuta el proceso de carga sin enviar datos a Datadog. Utilice esto para verificar su configuración. |
| `maxConcurrency` | Número | No | `20` | Número máximo de cargas simultáneas de mapas del código fuente. |

```javascript
const { datadogWebpackPlugin } = require('@datadog/webpack-plugin');

module.exports = {
  plugins: [
    datadogWebpackPlugin({
      auth: {
        apiKey: process.env.DATADOG_API_KEY,
        site: 'datadoghq.com', // Optional: defaults to datadoghq.com
      },
      errorTracking: {
        sourcemaps: {
          service: 'my-application',
          releaseVersion: '1.0.0',
          minifiedPathPrefix: 'https://example.com/static/',
        },
      },
    }),
  ],
};
```

Para mostrar también el código fuente en línea en los seguimientos de pila de Error Tracking, combine las cargas de mapas del código fuente de servicio y versión con el complemento [Source Code Context][5].

{{% /tab %}}
{{< /tabs >}}

<div class="alert alert-info">Estos ejemplos utilizan webpack. El objeto de configuración es idéntico en todos los empaquetadores compatibles. Solo difieren la importación y el nombre de la función del complemento. Consulte <a href="/real_user_monitoring/application_monitoring/browser/build_plugins/">Build Plugins</a> para obtener instrucciones de instalación para su empaquetador.</div>

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/real_user_monitoring/error_tracking
[2]: /es/real_user_monitoring/
[3]: /es/real_user_monitoring/guide/upload-javascript-source-maps#instrument-your-code
[4]: /es/real_user_monitoring/application_monitoring/browser/build_plugins/
[5]: /es/real_user_monitoring/application_monitoring/browser/build_plugins/source_code_context