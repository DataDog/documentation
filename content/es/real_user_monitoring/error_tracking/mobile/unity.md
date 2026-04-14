---
aliases:
- /es/real_user_monitoring/error_tracking/unity
code_lang: unity
code_lang_weight: 50
description: Aprende a realizar un seguimiento de los errores de Unity con Error Tracking.
further_reading:
- link: https://github.com/DataDog/dd-sdk-unity
  tag: Código fuente
  text: Código fuente de dd-sdk-unity
- link: real_user_monitoring/error_tracking/
  tag: Documentación
  text: Más información sobre el seguimiento de errores
title: Informe de errores y Error Tracking de Unity
type: lenguaje de código múltiple
---
## Información general

Habilita la notificación de fallos y el seguimiento de errores para obtener informes completos de fallos y tendencias de errores con Real User Monitoring.

Tus informes de fallos aparecen en [**Seguimiento de errores**][1].

## Configuración

Si aún no has configurado el SDK de Unity para Datadog, sigue las [instrucciones de configuración dentro de la aplicación][2] o consulta la [documentación de configuración de Flutter][3].

### Reenviar excepciones no capturadas desde logs de Unity

Unity reenvía todas las excepciones no capturadas a su registrador utilizando `Debug.LogException`. Para reportar estas excepciones a Datadog, marca la opción en la configuración del proyecto de Datadog etiquetada "Forward Unity Logs" (Reenvío de logs de Unity).

### Informe de errores nativos

Los informes de errores nativos están habilitados para todos los proyectos del SDK de Datadog Unity.

Si tu aplicación sufre un error fatal, el SDK de Unity Datadog carga un informe de error a Datadog *después* de que tu aplicación se reinicie. Para errores no fatales o excepciones, el SDK de Datadog Unity sube estos errores con otros datos de RUM.

## Obtener stack traces enmascarados y simbolizados

La asignación de archivos se utiliza para enmascarar y simbolizar stack traces, lo que ayuda a depurar errores. Mediante un ID de compilación único que se genera, Datadog hace coincidir automáticamente stack traces correctos con los archivos de asignación correspondientes. Esto garantiza que, independientemente de cuándo se haya cargado el archivo de asignación (ya sea durante la fase de preproducción o de producción), se disponga de la información correcta para procesos de control de calidad eficaces al revisar los fallos y errores notificados en Datadog.

### Asignación de archivos y líneas con IL2CPP

Cuando se utiliza el backend IL2CPP (el predeterminado para iOS), los stack traces C# de Unity carecen de cualquier información de archivo o línea. Esta información puede recuperarse de los archivos de símbolos nativos y de un archivo de asignación IL2CPP, siempre que los stack traces C# se asignen a stacks tecnológicos nativos. Para habilitar esto, marca la opción "Perform Native Stack Mapping" (Realizar asignación de stack tecnológico nativo) en la configuración de tu proyecto de Unity bajo la sección de Datadog y carga tus archivos de símbolo y asignación IL2CPP como se describe a continuación.

**Nota**: Incluso cuando está marcada, la Asignación de stack nativo sólo está habilitado en compilaciones que no sean de desarrollo.

### Carga de archivos de símbolos en Datadog

Los informes de errores nativos se recopilan en un formato sin procesar y en su mayoría contienen direcciones de memoria. Para asignar estas direcciones en información de símbolos legible, Datadog requiere que cargues archivos de iOS `.dSYM`, archivos `.so` de NDK, archivos de asignación de Android o un archivo de asignación IL2CPP, que se generan en el proceso de compilación de tu aplicación.

La herramienta de línea de comandos [@Datadog/Datadog-ci][4] permite cargar todos los archivos necesarios (dSYMs, sos, asignación de Android Proguard y archivos de asignación IL2CPP) en un solo comando.

En primer lugar, instala la herramienta `datadog-ci` siguiendo las instrucciones anteriores y crea un archivo `datadog-ci.json` en la raíz de tu proyecto, que contenga tu clave de API y (opcionalmente) tu sitio Datadog:
```json
{
  "apiKey": "<YOUR_DATADOG_API_KEY>",
  "datadogSite": "datadoghq.eu"  // Optional if you are using datadoghq.com
}
```

Dado que este archivo contiene tu clave de API, no debería marcarse en el control de versiones.

También puedes configurar las variables de entorno `DATADOG_API_KEY` y `DATADOG_SITE`.

A continuación, puedes utilizar el siguiente comando para cargar todos los archivos necesarios para la simbolización y desofuscación de tus informes de fallos:
```sh
# From your build output directory
datadog-ci unity-symbols upload --ios
```

Para Android, exporta un proyecto de Android (en lugar de construir el APK directamente) y compila usando el proyecto exportado. A continuación, puedes ejecutar datadog-ci desde el directorio del proyecto exportado:
```sh
# From your exported project directory
datadog-ci unity-symbols upload --android
```

**Nota**: Volver a cargar un source map (mapa de fuentes) no anula el mapa existente si el identificador de compilación no ha cambiado.

Si deseas consultar la lista completa de opciones, consulta la [documentación de Unity Symbols][5] `datadog-ci`.

### Lista de archivos de símbolos cargados

Consulta la página [RUM Debug Symbols][6] para ver todos los símbolos cargados.

## Limitaciones

{{< site-region region="us,us3,us5,eu,gov" >}}
Los mapas de origen y los archivos dSYM están limitados a **500** MB cada uno.
{{< /site-region >}}
{{< site-region region="ap1" >}}
Los mapas de origen y los archivos dSYM están limitados a **500** MB cada uno.
{{< /site-region >}}

## Para probar tu implementación

Para verificar tu configuración del Informe de errores y Error Tracking de Unity, emite un error en tu aplicación y confirma que el error aparece en Datadog.

1. Asegúrate de que no estás ejecutando una compilación de desarrollo. Desmarca la casilla "Development Build" (Compilación de desarrollo) en la configuración de compilación de Unity.
2. Ejecuta tu aplicación en un simulador, emulador o dispositivo real. Si estás ejecutando en iOS, asegúrate de que el depurador no está conectado. De lo contrario, Xcode captura el fallo antes de que lo haga el SDK de Datadog.
3. Ejecuta código que contenga un error o fallo. Por ejemplo:

   ```cs
   void ThrowError() {
    throw new Exception("My Exception")
   }
   ```

4. Para los informes de error ofuscados que no provocan un fallo, puedes verificar la simbolización y la desofuscación en [**Rastreo de errores**][1].
5. Para los errores, después de que ocurran, reinicia tu aplicación y espera a que el SDK de Unity cargue el informe de errores en [**Error Tracking**][1].

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}


[1]: https://app.datadoghq.com/rum/error-tracking
[2]: https://app.datadoghq.com/rum/application/create
[3]: /es/real_user_monitoring/mobile_and_tv_monitoring/setup/unity#setup
[4]: https://www.npmjs.com/package/@datadog/datadog-ci
[5]: https://github.com/DataDog/datadog-ci/tree/master/src/commands/unity-symbols
[6]: https://app.datadoghq.com/source-code/setup/rum