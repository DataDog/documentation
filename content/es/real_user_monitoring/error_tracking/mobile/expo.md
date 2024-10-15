---
aliases:
- /es/real_user_monitoring/error_tracking/expo
code_lang: expo
code_lang_weight: 30
description: Captura los informes de fallos de Expo en Datadog.
further_reading:
- link: https://www.datadoghq.com/blog/debug-android-crashes/
  tag: Blog
  text: Para depurar los fallos de Android de forma más rápida con Datadog
- link: https://www.datadoghq.com/blog/ios-crash-reporting-datadog/
  tag: Blog
  text: Para depurar los fallos de iOS de forma más eficaz con Datadog
- link: /real_user_monitoring/error_tracking/
  tag: Documentación
  text: Más información sobre el seguimiento de errores
- link: /real_user_monitoring/error_tracking/explorer
  tag: Documentación
  text: Visualizar los datos de seguimiento de errores en el explorador
title: Notificación de fallos y seguimiento de errores de Expo
type: lenguaje de código múltiple
---
## Información general

Habilita la notificación de fallos y el seguimiento de errores de Expo para obtener informes completos de fallos y tendencias de errores con Real User Monitoring.

Con esta función, puedes acceder a las siguientes características:

-   Dashboards y atributos de fallos agregados Expo
-   Informes de fallos de iOS simbolizados y de Android desofuscados
-   Análisis de tendencias con el seguimiento de errores de Expo

Para simbolizar tus trazas (traces) de stack tecnológico y desofuscar fallos de Android, carga tu .dSYM, los archivos de asignación Proguard y los mapas de origen en Datadog utilizando el complemento de configuración `expo-datadog`.

Tus informes de fallos aparecen en [**Seguimiento de errores**][1].

## Configuración

Utiliza el [paquete `expo-datadog` y el complemento de configuración][2]. Para obtener más información, consulta la [documentación de Expo y Expo Go][3].

Añade `@datadog/datadog-ci` como dependencia de desarrollo. Este paquete contiene scripts para cargar los mapas de origen. Puedes instalarlo con NPM:

```sh
npm install @datadog/datadog-ci --save-dev
```

O con Yarn:

```sh
yarn add -D @datadog/datadog-ci
```

Ejecuta `eas secret:create` para definir `DATADOG_API_KEY` en tu clave de API Datadog.

### Configuración del sitio Datadog 

Ejecuta `eas secret:create` para definir `DATADOG_SITE` en el host de tu sitio Datadog, por ejemplo: `datadoghq.eu`. Por defecto, se utiliza `datadoghq.com`.

### Opciones de configuración del complemento

| Parámetro                     | Predeterminado | Descripción                                                                                                                        |
| ----------------------------- | ------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| `iosDsyms`                    | `true`  | Permite la carga de archivos dSYMS para la simbolización de fallos nativos de iOS.                                                  |
| `iosSourcemaps`               | `true`  | Habilita la carga de mapas de origen JavaScript en compilaciones de iOS.                                                                     |
| `androidSourcemaps`           | `true`  | Habilita la carga de mapas de origen JavaScript en compilaciones de Android.                                                                 |
| `androidProguardMappingFiles` | `true`  | Habilita la carga de archivos de asignación Proguard para desofuscar fallos nativos de Android (sólo se aplica si la ofuscación está habilitada). |
| `datadogGradlePluginVersion`  | `"1.+"` | Versión de `dd-sdk-android-gradle-plugin` utilizada para cargar los archivos de asignación Proguard.     |

## Obtener trazas de stack tecnológico desofuscadas

### Añade los datos del repositorio Git a tus archivos de asignación en Expo Application Services (EAS)

Si estás utilizando EAS para crear tu aplicación Expo, configura `cli.requireCommit` como `true` en tu archivo `eas.json` para añadir los datos del repositorio Git a tus archivos de asignación.

```json
{
    "cli": {
        "requireCommit": true
    }
}
```

## Limitaciones

{{< site-region region="us,us3,us5,eu,gov" >}}
Los mapas de origen, los archivos de asignación y los archivos dSYM tienen un límite de **500** MB cada uno.
{{< /site-region >}}
{{< site-region region="ap1" >}}
Los mapas de origen, los archivos de asignación y los archivos dSYM tienen un límite de **500** MB cada uno.
{{< /site-region >}}

## Para probar tu implementación

Para verificar la configuración de las notificaciones de fallos y el seguimiento de errores de Expo, necesitas generar un error en tu aplicación y confirmar que el error aparece en Datadog.

Para probar tu aplicación:

1. Ejecuta tu aplicación en un simulador, emulador o dispositivo real. Si estás ejecutando en iOS, asegúrate de que el depurador no está conectado. De lo contrario, Xcode captura el fallo antes de que lo haga el SDK de Datadog.
2. Ejecuta código que contenga un error o fallo. Por ejemplo:

   ```javascript
   const throwError = () => {
    throw new Error("My Error")
   }
   ```

3. Para los informes de error ofuscados que no provocan un fallo, puedes verificar la simbolización y la desofuscación en [**Rastreo de errores**][1].
4. Para los fallos, después de que se produzcan, reinicia tu aplicación y espera a que el SDK de React Native cargue el informe del fallo en [**Rastreo de errores**][1].

Para asegurarte de que tus mapas de origen se envían y vinculan correctamente con tu aplicación, también puedes generar fallos con el paquete [`react-native-performance-limiter`][14].

Instálalo con yarn o npm y luego vuelve a instalar tus pods:

```shell
yarn add react-native-performance-limiter # or npm install react-native-performance-limiter
(cd ios && pod install)
```

Genera un fallo en el subproceso de JavaScript desde tu aplicación:

```javascript
import { crashJavascriptThread } from 'react-native-performance-limiter';

const crashApp = () => {
    crashJavascriptThread('custom error message');
};
```

Vuelve a crear tu aplicación para que envíe los nuevos mapas de origen, activa el fallo y espera a que aparezca el error en la página [Rastreo de errores][1].
```

## Opciones de configuración adicionales

### Deshabilitar la carga de archivos

Puedes deshabilitar la carga de ciertos archivos configurando los parámetros `iosDsyms`, `iosSourcemaps`, `androidProguardMappingFiles` o `androidSourcemaps` como `false`.

```json
{
    "expo": {
        "plugins": [
            [
                "expo-datadog",
                {
                    "errorTracking": {
                        "iosDsyms": false
                    }
                }
            ]
        ]
    }
}
```

Si quieres deshabilitar **cualquier carga de archivos**, elimina `expo-datadog` de la lista de complementos.


### Uso de Expo con Datadog y Sentry

Los complementos de configuración de Datadog y Sentry utilizan expresiones regulares para modificar la fase de compilación de iOS "Empaquetar código e imágenes React Native" para enviar el mapa de origen. Esto puede hacer que las compilaciones de EAS fallen con un error `error: Found argument 'datadog-ci' which wasn't expected, or isn't valid in this context`.

Para utilizar ambos complementos, asegúrate de añadir el complemento `expo-datadog` primero en orden en tu archivo `app.json`:

```
"plugins": [
    "expo-datadog",
    "sentry-expo"
]
```

Si estás utilizando `expo-dev-client` y ya tienes el complemento `expo-datadog`, revierte sus cambios en el archivo `project.pbxproj` antes de añadir `sentry-expo` y ejecutar `npx expo prebuild` con ambos complementos.

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/rum/error-tracking
[2]: https://github.com/DataDog/expo-datadog
[3]: /es/real_user_monitoring/mobile_and_tv_monitoring/setup/expo/#usage