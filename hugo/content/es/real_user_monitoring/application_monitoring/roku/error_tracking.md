---
aliases:
- /es/real_user_monitoring/error_tracking/roku
- /es/real_user_monitoring/error_tracking/mobile/roku
- /es/real_user_monitoring/mobile_and_tv_monitoring/roku/error_tracking
description: Configura Error Tracking para tus canales Roku.
further_reading:
- link: /real_user_monitoring/error_tracking/
  tag: Documentación
  text: Para empezar con Error Tracking
- link: /real_user_monitoring/error_tracking/explorer
  tag: Documentación
  text: Visualizar los datos de Error Tracking en el Explorer
site_support_id: rum_roku
title: Crash Reporting y Error Tracking de Roku
---

## Información general

Error Tracking procesa los errores recopilados del kit de desarrollo de software (SDK) de Roku.

Habilita Crash Reporting y Error Tracking de Roku para obtener informes completos de fallos y tendencias de errores mediante Real User Monitoring. Con esta función, puedes acceder a:

- Dashboards y atributos de fallos agregados Roku
- Análisis de tendencias con el seguimiento de errores de Roku

Tus informes de bloqueos aparecen en [**Error Tracking**][1].

## Configuración

Si aún no configuraste el SDK Roku, sigue las [instrucciones de configuración en la aplicación][2] o consulta la [documentación de configuración de Roku][3].

1. Añade la última versión del [SDK Roku][4] a tus dependencias ROPM (o descarga el archivo zip).
2. Configura `env` de tu aplicación al [inicializar el SDK][5].

Para cualquier error, puedes acceder a la ruta del archivo, al número de línea y a un fragmento de código para cada marco de la trace (traza) de stack tecnológico.

## Limitaciones

El kit de desarrollo de software (SDK) admite el stack trace en los informes de fallos en Roku OS 13+, mientras que en Roku OS <13, el stack trace está vacío.

## Para test tu implementación

Para comprobar tu configuración de Crash Reporting y Error Tracking de Roku, necesitas activar un fallo en tu aplicación y confirmar que el error aparece en Datadog.

Para test tu implementación

1. Ejecuta tu aplicación en un dispositivo Roku.
2. Ejecuta código que contenga un fallo. Por ejemplo:

   ```brightscript
   sub explodingMethod()
       x = 1
       print x.foo
   ```

3. Después de que se produzca el fallo, reinicia tu aplicación y espera a que el SDK Roku cargue el informe del fallo en [**Error Tracking**][1].

### Reenvío de los errores a Datadog

Cada vez que realices una operación que pueda generar una excepción, puedes reenviar el error a Datadog añadiendo el siguiente fragmento de código:

```brightscript
    try
        doSomethingThatMightThrowAnException()
    catch error
        m.global.datadogRumAgent.callfunc("addError", error)
    end try
```

[1]: https://app.datadoghq.com/rum/error-tracking
[2]: https://app.datadoghq.com/rum/application/create
[3]: https://docs.datadoghq.com/es/real_user_monitoring/application_monitoring/roku/setup/
[4]: https://github.com/DataDog/dd-sdk-roku
[5]: https://docs.datadoghq.com/es/real_user_monitoring/application_monitoring/android/advanced_configuration/?tabs=kotlin#initialization-parameters


## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}