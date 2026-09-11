---
aliases:
- /es/real_user_monitoring/error_tracking/unity
description: Aprende a realizar un seguimiento de los errores de Unity con Error Tracking.
further_reading:
- link: https://github.com/DataDog/dd-sdk-unity
  tag: Código fuente
  text: dd-sdk-unity Source code
- link: real_user_monitoring/error_tracking/
  tag: Documentación
  text: Más información sobre el seguimiento de errores
title: Crash Reporting y Error Tracking de Unity
---
## Información general

Habilita la notificación de fallos y el seguimiento de errores para obtener informes completos de fallos y tendencias de errores con Real User Monitoring.

Tus informes de fallos aparecen en [**Seguimiento de errores**][1].

## Configuración

Si aún no configuraste el SDK de Unity para Datadog, sigue las [instrucciones de configuración dentro de la aplicación][2] o consulta la [documentación de configuración de Flutter][3].

### Reenviar excepciones no capturadas de logs de Unity

Unity reenvía todas las excepciones no capturadas a tu generador de logs utilizando `Debug.LogException`. Para informar de estas excepciones a Datadog, marca la opción en la configuración del proyecto de Datadog, etiquetada "Reenvío de logs de Unity".

### Notificación nativa de fallos

La notificación nativa de fallos está habilitada para todos los proyectos de SDK Unity de Datadog.

Si tu aplicación sufre un error fatal, el SDK Unity de Datadog carga un informe de error a Datadog *después* de que tu aplicación se reinicie. Para errores no fatales o excepciones, el SDK Datadog de Unity carga estos errores con otros datos de RUM.

## Obtener trazas de stack tecnológico desofuscadas y simbolizadas

Los archivos de asignación se utilizan para desofuscar y simbolizar trazas de stack tecnológico, lo que ayuda a depurar errores. Utilizando un ID de compilación único que se genera, Datadog hace coincidir automáticamente las trazas de stack tecnológico correctas con los archivos de asignación correspondientes. Esto garantiza que, independientemente de cuándo se haya cargado el archivo de asignación (ya sea durante la fase de preproducción o de producción), se disponga de la información correcta para garantizar procesos de control de calidad eficaces al revisar fallos y errores notificados en Datadog.

### Asignación de archivos y líneas con IL2CPP

Cuando se utiliza el backend IL2CPP (el predeterminado para iOS), las trazas de stack tecnológico C# de Unity carecen de toda información de archivo o línea. Esta información puede recuperarse de los archivos de símbolos nativos y de un archivo de asignación IL2CPP, siempre que las las trazas de stack tecnológico C# se asignen a stacks tecnológicos nativos. Para habilitar esto, selecciona la opción "Asignar stacks tecnológicos nativos" en la configuración de tu proyecto Unity, en la sección Datadog, y carga tus archivos de asignación de símbolos y IL2CPP como se describe a continuación.

**Nota**: Aunque esté seleccionada, la asignación de stacks tecnológicos nativos sólo está habilitada en compilaciones que no son de desarrollo.

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

Dado que este archivo contiene tu clave de API, no debería selccionarse en el control de versiones.

También puedes configurar las variables de entorno `DATADOG_API_KEY` y `DATADOG_SITE`.

A continuación, puedes utilizar el siguiente comando para cargar todos los archivos necesarios para la simbolización y desofuscación de tus informes de fallos:
```sh
# From your build output directory
datadog-ci unity-symbols upload --ios
```

Para Android, exporta un proyecto Android (en lugar de crear el APK directamente) y crea utilizando el proyecto exportado. A continuación, puedes ejecutar datadog-ci desde el directorio del proyecto exportado:
```sh
# From your exported project directory
datadog-ci unity-symbols upload --android
```

**Nota**: Volver a cargar un mapa de origen no anula el existente si el identificador de compilación no cambió.

Para ver la lista completa de opciones, consulta la [documentación de símbolos Unity][5] `datadog-ci`.

### Lista de archivos de símbolos cargados

Para ver todos los símbolos cargados, consulta la página [Símbolos de depuración RUM][6].

## Limitaciones

El tamaño de los archivos de asignación está limitado a **500 MB** cada uno, mientras que los archivos dSYM pueden llegar a **2 GB** cada uno.

## Para probar tu implementación

Para verificar tu configuración de Crash Reporting y Error Tracking de Unity, genera un error en tu aplicación y confirma que aparece en Datadog.

1. Asegúrate de que no estás ejecutando una compilación de desarrollo. Desmarca la casilla "Compilación de desarrollo" en la configuración de compilación de Unity.
2. Ejecuta tu aplicación en un simulador, emulador o dispositivo real. Si estás ejecutando en iOS, asegúrate de que el depurador no está conectado. De lo contrario, Xcode captura el fallo antes de que lo haga el SDK de Datadog.
3. Ejecuta código que contenga un error o fallo. Por ejemplo:

   ```cs
   void ThrowError() {
    throw new Exception("My Exception")
   }
   ```

4. Para los informes de error ofuscados que no provocan un fallo, puedes verificar la simbolización y la desofuscación en [**Rastreo de errores**][1].
5. Para los fallos, después de que ocurran, reinicia tu aplicación y espera a que el SDK de Unity cargue el informe de fallo en [**Error Tracking**][1].

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/rum/error-tracking
[2]: https://app.datadoghq.com/rum/application/create
[3]: /es/real_user_monitoring/mobile_and_tv_monitoring/setup/unity#setup
[4]: https://www.npmjs.com/package/@datadog/datadog-ci
[5]: https://github.com/DataDog/datadog-ci/tree/master/src/commands/unity-symbols
[6]: https://app.datadoghq.com/source-code/setup/rum