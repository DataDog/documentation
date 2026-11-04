---
aliases:
- /es/real_user_monitoring/android/mobile_vitals
- /es/real_user_monitoring/ios/mobile_vitals
- /es/real_user_monitoring/flutter/mobile_vitals
- /es/real_user_monitoring/reactnative/mobile_vitals
description: Haga un seguimiento de las métricas clave de rendimiento móvil, incluyendo
  tiempos de inicio, tasas de fotogramas, uso de recursos y series temporales de rendimiento
  en Android, iOS, Flutter y React Native.
further_reading:
- link: https://github.com/DataDog/dd-sdk-android
  tag: Código fuente
  text: Código fuente de dd-sdk-android
- link: https://github.com/DataDog/dd-sdk-ios
  tag: Código fuente
  text: Código fuente de dd-sdk-ios
- link: https://github.com/DataDog/dd-sdk-flutter
  tag: Código fuente
  text: Código fuente de dd-sdk-flutter
- link: https://github.com/DataDog/dd-sdk-reactnative
  tag: Código fuente
  text: Código fuente de dd-sdk-reactnative
- link: /real_user_monitoring/explorer/events/#performance-timeseries
  tag: Documentación
  text: Explore el panel de series temporales de rendimiento
- link: /real_user_monitoring
  tag: Documentación
  text: Explore Datadog RUM
title: Mobile Vitals
---
## Descripción general {#overview}

Real User Monitoring ofrece Mobile Vitals, que incluye un conjunto de puntos de datos inspirados en marcos como [Android Vitals][1] y [Apple's MetricKit][2], los cuales pueden ayudar a calcular información sobre la capacidad de respuesta, estabilidad y consumo de recursos de su aplicación móvil. Los Mobile Vitals van de pobre, moderado a bueno.

Puede ver los Mobile Vitals de su aplicación navegando a {{< ui >}}Digital Experience{{< /ui >}} > {{< ui >}}Performance Summary{{< /ui >}} y seleccionando su aplicación.

{{< img src="real_user_monitoring/android/android-mobile-vitals.png" alt="Mobile Vitals en la pestaña Resumen de rendimiento" style="width:90%;">}}

Para acceder al tablero de rendimiento de aplicaciones móviles de RUM, cambie a la pestaña {{< ui >}}Performance{{< /ui >}} y luego haga clic en el enlace {{< ui >}}View Dashboard{{< /ui >}}.

{{< img src="real_user_monitoring/android/android-perf-dash-link.png" alt="Acceda al tablero de rendimiento móvil desde la pestaña Rendimiento" style="width:90%;">}}

Comprenda la salud y el rendimiento general de su aplicación con los gráficos de líneas que muestran puntos de datos a través de varias versiones de la aplicación. Para filtrar por versión de la aplicación o ver sesiones y vistas específicas, haga clic en un gráfico.

{{< img src="real_user_monitoring/android/android_mobile_vitals_3.png" alt="Tiempos de eventos y Mobile Vitals en el Explorador de RUM" style="width:90%;">}}

También puede seleccionar una vista en el Explorador de RUM y observar los rangos de referencia recomendados que se correlacionan directamente con la experiencia del usuario de su aplicación en la sesión. Haga clic en una métrica como {{< ui >}}Refresh Rate Average{{< /ui >}} y haga clic en {{< ui >}}Search Views With Poor Performance{{< /ui >}} para aplicar un filtro en su consulta de búsqueda y examinar vistas adicionales.

## Telemetría {#telemetry}

La siguiente telemetría proporciona información sobre el rendimiento de su aplicación móvil.

{{< tabs >}}
{{% tab "Android" %}}

| Medición | Descripción |
| --- | --- |
| Frecuencia de actualización | Para garantizar una experiencia de usuario fluida y [sin tirones][1], su aplicación debe renderizar fotogramas en menos de 60 Hz. <br /><br /> RUM rastrea la [frecuencia de actualización de la pantalla del hilo principal][2] de la aplicación utilizando los atributos de vista `@view.refresh_rate_average` y `@view.refresh_rate_min`.  <br /><br />  **Nota:** Las frecuencias de actualización se normalizan en un rango de cero a 60 fps. Por ejemplo, si su aplicación se ejecuta a 100 fps en un dispositivo capaz de renderizar 120 fps, Datadog informa 50 fps en {{< ui >}}Mobile Vitals{{< /ui >}}.|
| Renderizaciones lentas | Para garantizar una experiencia de usuario fluida y [sin tirones][1], su aplicación debe renderizar fotogramas en menos de 60 Hz. <br /><br />  RUM rastrea la [frecuencia de actualización de la pantalla][2] de la aplicación utilizando los atributos de vista `@view.refresh_rate_average` y `@view.refresh_rate_min`. <br /><br />  Con la renderización lenta, puede hacer un seguimiento de qué vistas tardan más de 16 ms o 60 Hz en renderizarse. <br /> **Nota:** Las frecuencias de actualización se normalizan en un rango de cero a 60 fps. Por ejemplo, si su aplicación se ejecuta a 100 fps en un dispositivo capaz de renderizar 120 fps, Datadog informa 50 fps en {{< ui >}}Mobile Vitals{{< /ui >}}. |
| Fotogramas congelados | Los fotogramas que tardan más de 700 ms en renderizarse aparecen como bloqueados y sin respuesta en su aplicación. Estos se clasifican como [fotogramas congelados][3]. <br /><br />  RUM rastrea eventos `long task` con la duración de cualquier tarea que tarde más de 100 ms en completarse. <br /><br />  Con los fotogramas congelados, puede hacer un seguimiento de qué vistas aparecen congeladas (tardando más de 700 ms en renderizarse) para sus usuarios finales y eliminar los tirones en su aplicación. |
| Aplicación sin respuesta | Cuando el hilo de la interfaz de usuario de una aplicación se bloquea durante más de 5 segundos, se activa un error de `Application Not Responding` ([ANR][4]). Si la aplicación está en primer plano, el sistema muestra un cuadro de diálogo modal al usuario, permitiéndole forzar el cierre de la aplicación. <br /><br />   RUM rastrea las ocurrencias de ANR y captura la traza de pila completa que bloquea el hilo principal cuando encuentra un ANR. |
| Sesiones sin fallos por versión | Se informa un [fallo de la aplicación][5] debido a una salida inesperada en la aplicación, generalmente causada por una excepción o señal no controlada. Las sesiones de usuario sin fallos en su aplicación corresponden directamente a la experiencia y satisfacción general de su usuario final. <br /><br />   RUM rastrea informes de fallos completos y presenta tendencias a lo largo del tiempo con [Error Tracking][6]. <br /><br />  Con sesiones sin fallos, puede mantenerse al tanto de los puntos de referencia de la industria y asegurarse de que su aplicación tenga una clasificación alta en Google Play Store. |
| Ticks de CPU por segundo | El uso elevado de CPU afecta la [duración de la batería][7] en los dispositivos de sus usuarios.  <br /><br />  RUM rastrea los ticks de CPU por segundo para cada vista y la utilización de CPU a lo largo de una sesión. El rango recomendado es <40 para bueno y <60 para moderado. <br /><br />  Puede ver las vistas principales con la mayor cantidad de ticks de CPU en promedio durante un período de tiempo seleccionado en {{< ui >}}Mobile Vitals{{< /ui >}} en la página {{< ui >}}Overview{{< /ui >}} de su aplicación. |
| Utilización de memoria | El uso elevado de memoria puede provocar [OutOfMemoryError][8], lo que hace que la aplicación falle y crea una mala experiencia de usuario. <br /><br />  RUM rastrea la cantidad de memoria física utilizada por su aplicación en bytes para cada vista, a lo largo de una sesión. El rango recomendado es <200MB para bueno y <400MB para moderado. <br /><br />  Puede ver las vistas principales con mayor consumo de memoria en promedio durante un período de tiempo seleccionado en {{< ui >}}Mobile Vitals{{< /ui >}} en la página {{< ui >}}Overview{{< /ui >}} de su aplicación. |

[1]: https://developer.android.com/topic/performance/vitals/render#common-jank
[2]: https://developer.android.com/guide/topics/media/frame-rate
[3]: https://developer.android.com/topic/performance/vitals/frozen
[4]: https://developer.android.com/topic/performance/vitals/anr
[5]: https://developer.android.com/topic/performance/vitals/crash
[6]: /es/real_user_monitoring/error_tracking/android
[7]: https://developer.android.com/topic/performance/power
[8]: https://developer.android.com/reference/java/lang/OutOfMemoryError

{{% /tab %}}
{{% tab "iOS" %}}

| Medición | Descripción |
| --- | --- |
| Frecuencia de actualización | Para garantizar una experiencia de usuario fluida y sin interrupciones, su aplicación debe renderizar fotogramas a menos de 60Hz. <br /><br /> RUM rastrea la frecuencia de actualización de la pantalla del hilo principal de la aplicación utilizando los atributos de vista `@view.refresh_rate_average` y `@view.refresh_rate_min`.  <br /><br />  **Nota:** Las frecuencias de actualización se normalizan en un rango de cero a 60 fps. Por ejemplo, si su aplicación se ejecuta a 100 fps en un dispositivo capaz de renderizar 120 fps, Datadog informa 50 fps en {{< ui >}}Mobile Vitals{{< /ui >}}. |
| Renderizaciones lentas | Para garantizar una experiencia de usuario fluida y sin interrupciones, su aplicación debe renderizar fotogramas a menos de 60 Hz. <br /><br />  RUM rastrea la frecuencia de actualización de la pantalla de la aplicación utilizando los atributos de vista `@view.refresh_rate_average` y `@view.refresh_rate_min`. <br /><br />  Con la renderización lenta, puede hacer un seguimiento de qué vistas tardan más de 16 ms o 60 Hz en renderizarse. <br /> **Nota:** Las frecuencias de actualización se normalizan en un rango de cero a 60 fps. Por ejemplo, si su aplicación se ejecuta a 100 fps en un dispositivo capaz de renderizar 120 fps, Datadog informa 50 fps en {{< ui >}}Mobile Vitals{{< /ui >}}. |
| Fotogramas congelados | Los fotogramas que tardan más de 700 ms en renderizarse aparecen como bloqueados y sin respuesta en su aplicación. Estos se clasifican como fotogramas congelados. <br /><br />  RUM rastrea eventos `long task` con la duración de cualquier tarea que tarde más de 100 ms en completarse. <br /><br />  Con los fotogramas congelados, puede hacer un seguimiento de qué vistas aparecen congeladas (tardando más de 700 ms en renderizarse) para sus usuarios finales y eliminar los tirones en su aplicación. |
| Sesiones sin fallos por versión | Se informa un [fallo de la aplicación][1] debido a una salida inesperada en la aplicación, generalmente causada por una excepción o señal no controlada. Las sesiones de usuario sin fallos en su aplicación corresponden directamente a la experiencia y satisfacción general de su usuario final. <br /><br />   RUM rastrea informes completos de fallos y presenta tendencias a lo largo del tiempo con [Error Tracking][2]. <br /><br />  Con las sesiones sin fallos, puede mantenerse al día con los puntos de referencia de la industria y asegurarse de que su aplicación tenga una clasificación alta en la Apple App Store. |
| Tasa de bloqueo | Tal como lo define Apple, la tasa de bloqueo de una aplicación corresponde a "la cantidad de segundos por hora que la aplicación no responde, contando solo los períodos de falta de respuesta de más de 250 ms". Para calcular la tasa de bloqueo de su aplicación en Datadog, habilite [informes de bloqueo de aplicaciones][4] y siga la [sección dedicada][5].
| Ticks de CPU por segundo | El uso elevado de CPU afecta la [duración de la batería][3] en los dispositivos de sus usuarios.  <br /><br />  RUM rastrea los ticks de CPU por segundo para cada vista y la utilización de CPU a lo largo de una sesión. El rango recomendado es <40 para bueno y <60 para moderado. <br /><br />  Puede ver las vistas principales con la mayor cantidad de ticks de CPU en promedio durante un período de tiempo seleccionado en {{< ui >}}Mobile Vitals{{< /ui >}} en la página {{< ui >}}Overview{{< /ui >}} de su aplicación. |
| Utilización de memoria | El uso elevado de memoria puede provocar [terminaciones por watchdog][6], lo que causa una mala experiencia de usuario. <br /><br />  RUM rastrea la cantidad de memoria física utilizada por su aplicación en bytes para cada vista, a lo largo de una sesión. El rango recomendado es <200MB para bueno y <400MB para moderado. <br /><br />  Puede ver las vistas principales con mayor consumo de memoria en promedio durante un período de tiempo seleccionado en {{< ui >}}Mobile Vitals{{< /ui >}} en la página {{< ui >}}Overview{{< /ui >}} de su aplicación. |

[1]: https://developer.apple.com/documentation/xcode/diagnosing-issues-using-crash-reports-and-device-logs
[2]: /es/real_user_monitoring/ios/crash_reporting/
[3]: https://developer.apple.com/documentation/xcode/analyzing-your-app-s-battery-use/
[4]: /es/real_user_monitoring/error_tracking/mobile/ios/?tab=cocoapods#add-app-hang-reporting
[5]: /es/real_user_monitoring/error_tracking/mobile/ios/?tab=cocoapods#compute-the-hang-rate-of-your-application
[6]: /es/real_user_monitoring/error_tracking/mobile/ios/?tab=cocoapods#add-watchdog-terminations-reporting

{{% /tab %}}
{{% tab "Flutter" %}}

| Medición | Descripción |
| --- | --- |
| Frecuencia de actualización | Para garantizar una experiencia de usuario fluida y [sin tirones][1], su aplicación debe renderizar fotogramas en menos de 60 Hz. <br /><br /> RUM rastrea la [frecuencia de actualización de la pantalla del hilo principal][2] de la aplicación utilizando los atributos de vista `@view.refresh_rate_average` y `@view.refresh_rate_min`.  <br /><br />  **Nota:** Las frecuencias de actualización se normalizan en un rango de cero a 60 fps. Por ejemplo, si su aplicación se ejecuta a 100 fps en un dispositivo capaz de renderizar 120 fps, Datadog informa 50 fps en {{< ui >}}Mobile Vitals{{< /ui >}}. |
| Renderizaciones lentas | Para garantizar una experiencia de usuario fluida y [sin tirones][1], su aplicación debe renderizar fotogramas en menos de 60 Hz. <br /><br />  RUM rastrea la [frecuencia de actualización de la pantalla][2] de la aplicación utilizando los atributos de vista `@view.refresh_rate_average` y `@view.refresh_rate_min`. <br /><br />  Con la renderización lenta, puede hacer un seguimiento de qué vistas tardan más de 16 ms o 60 Hz en renderizarse. <br /> **Nota:** Las frecuencias de actualización se normalizan en un rango de cero a 60 fps. Por ejemplo, si su aplicación se ejecuta a 100 fps en un dispositivo capaz de renderizar 120 fps, Datadog informa 50 fps en {{< ui >}}Mobile Vitals{{< /ui >}}. |
| Fotogramas congelados | Los fotogramas que tardan más de 700 ms en renderizarse aparecen como bloqueados y sin respuesta en su aplicación. Estos se clasifican como [fotogramas congelados][3]. <br /><br />  RUM rastrea eventos `long task` con la duración de cualquier tarea que tarde más de 100 ms en completarse. <br /><br />  Con los fotogramas congelados, puede hacer un seguimiento de qué vistas aparecen congeladas (tardando más de 700 ms en renderizarse) para sus usuarios finales y eliminar los tirones en su aplicación. |
| Aplicación no responde | En Android, cuando el hilo de la interfaz de usuario de una aplicación se bloquea durante más de 5 segundos, se activa un error de `Application Not Responding` ([ANR][4]). Si la aplicación está en primer plano, el sistema muestra un cuadro de diálogo modal al usuario, permitiéndole forzar el cierre de la aplicación. <br /><br />   RUM rastrea las ocurrencias de ANR y captura la traza de pila completa que bloquea el hilo principal cuando encuentra un ANR. |
| Sesiones sin fallos por versión | Se informa un [fallo de la aplicación][5] debido a una salida inesperada en la aplicación, generalmente causada por una excepción o señal no controlada. Las sesiones de usuario sin fallos en su aplicación corresponden directamente a la experiencia y satisfacción general de su usuario final. <br /><br />   RUM rastrea informes completos de fallos y presenta tendencias a lo largo del tiempo con [Error Tracking][8]. <br /><br />  Con sesiones sin fallos, puede mantenerse al tanto de los puntos de referencia de la industria y asegurarse de que su aplicación tenga una clasificación alta en Google Play Store. |
| Ticks de CPU por segundo | El uso elevado de CPU afecta la [duración de la batería][6] en los dispositivos de sus usuarios.  <br /><br />  RUM rastrea los ticks de CPU por segundo para cada vista y la utilización de CPU a lo largo de una sesión. El rango recomendado es <40 para bueno y <60 para moderado. <br /><br />  Puede ver las vistas principales con la mayor cantidad de ticks de CPU en promedio durante un período de tiempo seleccionado en {{< ui >}}Mobile Vitals{{< /ui >}} en la página {{< ui >}}Overview{{< /ui >}} de su aplicación. |
| Uso de memoria | El uso elevado de memoria puede provocar [bloqueos por falta de memoria][7], lo que causa una mala experiencia de usuario. <br /><br />  RUM rastrea la cantidad de memoria física utilizada por su aplicación en bytes para cada vista, a lo largo de una sesión. El rango recomendado es <200MB para bueno y <400MB para moderado. <br /><br />  Puede ver los principales 'visualizar' con mayor consumo de memoria en promedio durante un período de tiempo seleccionado en {{< ui >}}Mobile Vitals{{< /ui >}} en la página {{< ui >}}Overview{{< /ui >}} de su aplicación. |
| Tiempo de compilación del widget | Esta es la duración del tiempo que toma compilar el marco en el hilo de la interfaz de usuario. Para garantizar animaciones fluidas, esto no debe exceder los 16 ms para 60 FPS y los 8 ms para 120 FPS. <br /><br />  Los valores altos aquí indican que debe optimizar sus métodos de compilación para este 'visualizar'. Consulte [Controlar el costo de compilación][8] en la documentación de Flutter. |
| Tiempo de rasterización | Esta es la duración del tiempo que toma rasterizar el marco en el hilo de rasterización. Para garantizar animaciones fluidas, esto no debe exceder los 16 ms para 60 FPS y los 8 ms para 120 FPS. <br /><br />  Los valores altos aquí pueden indicar que su 'visualizar' es complejo de renderizar. Consulte [Identificación de problemas en el gráfico de GPU][12] en la documentación de Flutter. |

[1]: https://docs.flutter.dev/perf/ui-performance
[2]: https://docs.flutter.dev/tools/devtools/performance
[3]: https://developer.android.com/topic/performance/vitals/frozen
[4]: https://developer.android.com/topic/performance/vitals/anr
[5]: https://docs.flutter.dev/reference/crash-reporting
[6]: /es/real_user_monitoring/error_tracking/flutter
[7]: https://docs.flutter.dev/perf/best-practices#build-and-display-frames-in-16ms
[8]: https://docs.flutter.dev/tools/devtools/memory
[9]: https://docs.flutter.dev/perf/best-practices#control-build-cost
[10]: https://docs.flutter.dev/perf/ui-performance#identifying-problems-in-the-gpu-graph

{{% /tab %}}
{{% tab "React Native" %}}

| Medición | Descripción |
| --- | --- |
| Frecuencia de actualización | Para garantizar una experiencia de usuario fluida y [sin tirones][1], su aplicación debe renderizar fotogramas en menos de 60 Hz. <br /><br /> RUM rastrea la [frecuencia de actualización de la pantalla del hilo principal][2] de la aplicación utilizando los atributos de vista `@view.refresh_rate_average` y `@view.refresh_rate_min`.  <br /><br />  **Nota:** Las frecuencias de actualización se normalizan en un rango de cero a 60 fps. Por ejemplo, si su aplicación se ejecuta a 100 fps en un dispositivo capaz de renderizar 120 fps, Datadog informa 50 fps en {{< ui >}}Mobile Vitals{{< /ui >}}. |
| JS Refresh rate | Para garantizar una experiencia de usuario fluida y [sin tirones][1], su aplicación debe renderizar fotogramas en menos de 60 Hz. <br /><br /> RUM rastrea la [frecuencia de actualización de la pantalla del hilo de javascript][2] de la aplicación utilizando `@view.js_refresh_rate.average`, `@view.js_refresh_rate.min` y `@view.js_refresh_rate.max` como atributos de 'visualizar'.  <br /><br />  **Nota:** Las frecuencias de actualización se normalizan en un rango de cero a 60 fps. Por ejemplo, si su aplicación se ejecuta a 100 fps en un dispositivo capaz de renderizar 120 fps, Datadog informa 50 fps en {{< ui >}}Mobile Vitals{{< /ui >}}. |
| Renderizaciones lentas | Para garantizar una experiencia de usuario fluida y [sin tirones][1], su aplicación debe renderizar fotogramas en menos de 60 Hz. <br /><br /> Con la renderización lenta, puede hacer un seguimiento de qué 'visualizar' tienen una frecuencia de fotogramas promedio inferior a 55 fps.  <br /><br />  **Nota:** Las frecuencias de actualización se normalizan en un rango de cero a 60 fps. Por ejemplo, si su aplicación se ejecuta a 100 fps en un dispositivo capaz de renderizar 120 fps, Datadog informa 50 fps en {{< ui >}}Mobile Vitals{{< /ui >}}. |
| Fotogramas congelados | Los fotogramas que tardan más de 700 ms en renderizarse aparecen como bloqueados y sin respuesta en su aplicación. Estos se clasifican como [fotogramas congelados][3]. <br /><br />  RUM rastrea eventos `long task` con la duración de cualquier tarea que tarde más de 100 ms en completarse. <br /><br />  Con los fotogramas congelados, puede hacer un seguimiento de qué vistas aparecen congeladas (tardando más de 700 ms en renderizarse) para sus usuarios finales y eliminar los tirones en su aplicación. |
| Aplicación no responde | Cuando el hilo de la interfaz de usuario de una aplicación se bloquea durante más de 5 segundos, se activa un error (ANR) de `Application Not Responding`. Si la aplicación está en primer plano, el sistema muestra un cuadro de diálogo modal al usuario, permitiéndole forzar el cierre de la aplicación. <br /><br />   RUM rastrea las ocurrencias de ANR y captura la traza de pila completa que bloquea el hilo principal cuando encuentra un ANR. |
| Sesiones sin bloqueos por versión | Un [bloqueo de aplicación][4] se reporta debido a una salida inesperada en la aplicación, generalmente causada por una excepción o señal no controlada. Las sesiones de usuario sin fallos en su aplicación corresponden directamente a la experiencia y satisfacción general de su usuario final. <br /><br />   RUM rastrea informes completos de bloqueos y presenta tendencias a lo largo del tiempo con [Error Tracking][5]. <br /><br />  Con sesiones sin fallos, puede mantenerse al tanto de los puntos de referencia de la industria y asegurarse de que su aplicación tenga una clasificación alta en Google Play Store. |
| Ticks de CPU por segundo | El uso elevado de CPU afecta la [duración de la batería][6] en los dispositivos de sus usuarios.  <br /><br />  RUM rastrea los ticks de CPU por segundo para cada vista y la utilización de CPU a lo largo de una sesión. El rango recomendado es <40 para bueno y <60 para moderado. <br /><br />  Puede ver las vistas principales con la mayor cantidad de ticks de CPU en promedio durante un período de tiempo seleccionado en {{< ui >}}Mobile Vitals{{< /ui >}} en la página {{< ui >}}Overview{{< /ui >}} de su aplicación. |
| Uso de memoria | El uso elevado de memoria puede provocar [bloqueos por falta de memoria][7], lo que causa una mala experiencia de usuario. <br /><br />  RUM rastrea la cantidad de memoria física utilizada por su aplicación en bytes para cada vista, a lo largo de una sesión. El rango recomendado es <200MB para bueno y <400MB para moderado. <br /><br />  Puede ver las vistas principales con mayor consumo de memoria en promedio durante un período de tiempo seleccionado en {{< ui >}}Mobile Vitals{{< /ui >}} en la página {{< ui >}}Overview{{< /ui >}} de su aplicación. |

[1]: http://jankfree.org/
[2]: https://reactnative.dev/docs/performance#what-you-need-to-know-about-frames
[3]: https://firebase.google.com/docs/perf-mon/screen-traces?platform=ios#frozen-frames
[4]: https://docs.microsoft.com/en-us/appcenter/sdk/crashes/react-native
[5]: /es/real_user_monitoring/ios/crash_reporting/
[6]: https://developer.apple.com/documentation/xcode/analyzing-your-app-s-battery-use/
[7]: https://docs.sentry.io/platforms/apple/guides/ios/configuration/out-of-memory/

{{% /tab %}}
{{% tab "Unity" %}}

| Medición | Descripción |
| --- | --- |
| Frecuencia de actualización | Para garantizar una experiencia de usuario fluida y sin interrupciones, su aplicación debe renderizar fotogramas a menos de 60Hz. <br /><br /> RUM rastrea la frecuencia de actualización de la pantalla del hilo principal de la aplicación utilizando los atributos de vista `@view.refresh_rate_average` y `@view.refresh_rate_min`.  <br /><br />  **Nota:** Las frecuencias de actualización se normalizan en un rango de cero a 60 fps. Por ejemplo, si su aplicación se ejecuta a 100 fps en un dispositivo capaz de renderizar 120 fps, Datadog informa 50 fps en {{< ui >}}Mobile Vitals{{< /ui >}}. |
| Renderizaciones lentas | Para garantizar una experiencia de usuario fluida y sin interrupciones, su aplicación debe renderizar fotogramas a menos de 60 Hz. <br /><br />  RUM rastrea la frecuencia de actualización de la pantalla de la aplicación utilizando los atributos de vista `@view.refresh_rate_average` y `@view.refresh_rate_min`. <br /><br />  Con la renderización lenta, puede hacer un seguimiento de qué vistas tardan más de 16 ms o 60 Hz en renderizarse. <br /> **Nota:** Las frecuencias de actualización se normalizan en un rango de cero a 60 fps. Por ejemplo, si su aplicación se ejecuta a 100 fps en un dispositivo capaz de renderizar 120 fps, Datadog informa 50 fps en {{< ui >}}Mobile Vitals{{< /ui >}}. |
| Sesiones sin fallos por versión | Se informa un [fallo de la aplicación][1] debido a una salida inesperada en la aplicación, generalmente causada por una excepción o señal no controlada. Las sesiones de usuario sin fallos en su aplicación corresponden directamente a la experiencia y satisfacción general de su usuario final. <br /><br />   RUM rastrea informes completos de fallos y presenta tendencias a lo largo del tiempo con [Error Tracking][2]. <br /><br />  Con sesiones sin fallos, puede mantenerse al tanto de los puntos de referencia de la industria y asegurarse de que su aplicación tenga una clasificación alta en Google Play Store. |
| Tasa de bloqueo | Tal como lo define Apple, la tasa de bloqueo de una aplicación corresponde a "la cantidad de segundos por hora que la aplicación no responde, contando solo los períodos de falta de respuesta de más de 250 ms". Para calcular la tasa de bloqueo de su aplicación en Datadog, habilite {{< ui >}}Track Non-Fatal App Hangs{{< /ui >}} en [Configuración de Datadog][4].
| Ticks de CPU por segundo | El uso elevado de CPU afecta la [duración de la batería][3] en los dispositivos de sus usuarios.  <br /><br />  RUM rastrea los ticks de CPU por segundo para cada vista y la utilización de CPU a lo largo de una sesión. El rango recomendado es <40 para bueno y <60 para moderado. <br /><br />  Puede ver las vistas principales con la mayor cantidad de ticks de CPU en promedio durante un período de tiempo seleccionado en {{< ui >}}Mobile Vitals{{< /ui >}} en la página {{< ui >}}Overview{{< /ui >}} de su aplicación. |
| Utilización de memoria | El uso elevado de memoria puede provocar [terminaciones por watchdog][6], lo que causa una mala experiencia de usuario. <br /><br />  RUM rastrea la cantidad de memoria física utilizada por su aplicación en bytes para cada vista, a lo largo de una sesión. El rango recomendado es <200MB para bueno y <400MB para moderado. <br /><br />  Puede ver las vistas principales con mayor consumo de memoria en promedio durante un período de tiempo seleccionado en {{< ui >}}Mobile Vitals{{< /ui >}} en la página {{< ui >}}Overview{{< /ui >}} de su aplicación. |

[1]: https://developer.apple.com/documentation/xcode/diagnosing-issues-using-crash-reports-and-device-logs
[2]: /es/real_user_monitoring/error_tracking/mobile/unity/
[3]: https://developer.apple.com/documentation/xcode/analyzing-your-app-s-battery-use/
[4]: /es/real_user_monitoring/application_monitoring/unity/setup
[6]: /es/real_user_monitoring/error_tracking/mobile/ios/?tab=cocoapods#add-watchdog-terminations-reporting

{{% /tab %}}

{{< /tabs >}}

## Series temporales de rendimiento {#performance-timeseries}

{{< callout url="https://www.datadoghq.com/product-preview/rum-timeseries/" btn_hidden="false" header="¡Únase a la vista previa!">}}
Las series temporales de rendimiento están en versión preliminar y la recopilación está desactivada de forma predeterminada. Para habilitarlas, únase a la versión preliminar. Datadog envía instrucciones de configuración a los clientes participantes.
{{< /callout >}}

Las series temporales de rendimiento están disponibles en los SDK de iOS y Android.

Las métricas móviles estándar informan la utilización de memoria promediada durante la vida útil de la visualizar. Las series temporales de rendimiento capturan el uso de memoria y CPU cada segundo durante la duración de la sesión, y muestran los resultados en un gráfico interactivo en los [paneles laterales][3] de sesión, visualizar y operación.

{{< img src="real_user_monitoring/mobile_vitals/timeseries-panel.png" alt="La sección de series temporales de rendimiento de un panel lateral de RUM, que muestra un gráfico interactivo de Memoria y CPU durante la duración de una sesión" style="width:100%;" >}}

Una vez habilitada la recopilación, se capturan series temporales para todas las sesiones.

Se recopilan dos series:

- **Uso de CPU**: el porcentaje de la capacidad total de CPU del dispositivo en todos los núcleos consumido por su aplicación. Esto difiere de los ticks de CPU por segundo informados para una visualizar.
- **Memoria**: el mismo valor que el SDK ya recopila para las métricas de memoria de la visualizar. Consulte [la recopilación de memoria de visualizar en iOS][4] y [en Android][5].

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://developer.android.com/topic/performance/vitals
[2]: https://developer.apple.com/documentation/metrickit
[3]: /es/real_user_monitoring/explorer/events/#performance-timeseries
[4]: /es/real_user_monitoring/application_monitoring/ios/data_collected/#view-memory-collection
[5]: /es/real_user_monitoring/application_monitoring/android/data_collected/#view-memory-collection