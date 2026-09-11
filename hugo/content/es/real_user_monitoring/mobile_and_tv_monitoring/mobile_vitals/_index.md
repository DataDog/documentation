---
aliases:
- /es/real_user_monitoring/android/mobile_vitals
- /es/real_user_monitoring/ios/mobile_vitals
- /es/real_user_monitoring/flutter/mobile_vitals
- /es/real_user_monitoring/reactnative/mobile_vitals
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
- link: /real_user_monitoring
  tag: Documentación
  text: Explorar RUM de Datadog
title: Mobile Vitals
---

## Información general

Real User Monitoring ofrece Mobile Vitals, que incluye un conjunto de puntos de datos inspirados en marcos como [Android Vitals][1] y [MetricKit de Apple][2], que pueden ayudar a calcular información sobre la capacidad de respuesta, la estabilidad y el uso de recursos de tu aplicación móvil. Las calificaciones de Mobile Vitals pueden ser deficiente, moderado y bueno.

Puedes ver Mobile Vitals para tu aplicación al navegar a **Digital Experience > Performance Summary** (Experiencia digital > Resumen de rendimiento) y seleccionar tu aplicación.

{{< img src="real_user_monitoring/android/android-mobile-vitals.png" alt="Mobile Vitals en la pestaña Resumen de rendimiento" style="width:90%;">}}

Para acceder al dashboard de rendimiento de la aplicación móvil de RUM, ve a la pestaña **Performance** (Rendimiento) y, a continuación, haz clic en el enlace **View Dashboard** (Ver dashboard).

{{< img src="real_user_monitoring/android/android-perf-dash-link.png" alt="Acceso al dashboard de rendimiento móvil en la pestaña Rendimiento" style="width:90%;">}}

Comprende el estado general y el rendimiento de tu aplicación con los gráficos de líneas que muestran puntos de datos de varias versiones de la aplicación. Para filtrar por versión de la aplicación o ver sesiones y vistas específicas, haz clic en un gráfico.

{{< img src="real_user_monitoring/android/android_mobile_vitals_3.png" alt="Tiempos de eventos y Mobile Vitals en el RUM Explorer" style="width:90%;">}}

También puedes seleccionar una vista en el RUM Explorer y observar los rangos de referencia recomendados que se correlacionan directamente con la experiencia de usuario de tu aplicación en la sesión. Haz clic en una métrica como **Refresh Rate Average** (Frecuencia de actualización media) y haz clic en **Search Views With Poor Performance** (Buscar vistas con bajo rendimiento) para aplicar un filtro en tu consulta de búsqueda y examinar vistas adicionales.

## Telemetría

La siguiente telemetría proporciona información sobre el rendimiento de tu aplicación móvil.

{{< tabs >}}
{{% tab "Android" %}}

| Medición | Descripción |
| --- | --- |
| Frecuencia de actualización | Para asegurar una experiencia de usuario fluida y [sin fallos][1], tu aplicación debe renderizar los fotogramas a menos de 60Hz. <br /><br /> RUM rastrea la [tasa de actualización de la vista del subproceso principal][2] de la aplicación usando los atributos de vista `@view.refresh_rate_average` y `@view.refresh_rate_min`.  <br /><br />  **Nota:** Las tasas de actualización están normalizadas en un rango de cero a 60fps. Por ejemplo, si tu aplicación se ejecuta a 100fps en un dispositivo capaz de renderizar 120fps, Datadog informa de 50fps en **Mobile Vitals**.|
| Renderizados lentos | Para asegurar una experiencia de usuario fluida y [sin fallos][1], tu aplicación debe renderizar los fotogramas a menos de 60Hz. <br /><br /> RUM rastrea la [tasa de actualización de la vista del subproceso principal][2] de la aplicación usando los atributos de vista `@view.refresh_rate_average` y `@view.refresh_rate_min`.  <br /><br /> Con el renderizado lento, puedes monitorizar qué vistas tardan más de 16ms o 60Hz en renderizar.<br /> **Nota:** Las tasas de actualización están normalizadas en un rango de cero a 60fps. Por ejemplo, si tu aplicación se ejecuta a 100fps en un dispositivo capaz de renderizar 120fps, Datadog informa de 50fps en **Mobile Vitals**. |
| Fotogramas congelados | Los fotogramas que tardan más de 700ms en renderizarse aparecen como atascados y sin respuesta en tu aplicación. Se clasifican como [fotogramas congelados][3]. <br /><br /> RUM rastrea eventos `long task` con la duración de cualquier tarea que tarde más de 100ms en completarse. <br /><br /> Con los fotogramas congelados, puedes monitorizar qué vistas aparecen congeladas (tardan más de 700ms en renderizarse) para tus usuarios finales y eliminar los fallos en tu aplicación. |
| La aplicación no responde | Cuando el subproceso de interfaz de usuario de una aplicación se bloquea durante más de 5 segundos, se produce un error `Application Not Responding` ([ANR][4]). Si la aplicación está en primer plano, el sistema muestra un modal de diálogo al usuario, permitiéndole forzar la salida de la aplicación. <br /><br /> RUM rastrea las ocurrencias de ANR y captura todo el stack trace que bloquea el subproceso principal cuando encuentra un ANR. |
| Sesiones sin fallos por versión | Un [fallo de aplicación][5] se produce debido a una salida inesperada de la aplicación, normalmente causada por una excepción o señal no controlada. Las sesiones de usuario sin caídas en la aplicación se corresponden directamente con la experiencia y la satisfacción general del usuario final. <br /><br /> RUM realiza un rastreo completo de los informes de fallos y presenta tendencias a lo largo del tiempo con el [Rastreo de errores][6]. <br /><br /> Con las sesiones sin fallos, puedes mantenerte al día en los puntos de referencia de la industria y asegurarte de que tu aplicación ocupa un lugar destacado en Google Play Store. |
| Tics por segundo de la CPU | Un uso elevado de la CPU afecta a la [duración de la batería][7] de los dispositivos de tus usuarios.  <br /><br /> RUM realiza rastreo de tics de CPU por segundo para cada vista y la utilización de la CPU en el transcurso de una sesión. El rango recomendado es <40 para bueno y <60 para moderado. <br /><br /> Puedes ver las principales vistas con el mayor número de tics de CPU de media durante un periodo seleccionado en **Mobile Vitals** en la página Información general de tu aplicación. |
| Utilización de la memoria | Un uso elevado de memoria puede provocar [OutOfMemoryError][8], lo que hace que la aplicación se bloquee y crea una mala experiencia para el usuario. <br /><br />  RUM rastrea la cantidad de memoria física utilizada por tu aplicación en bytes para cada vista, en el transcurso de una sesión. El rango recomendado es <200MB para bueno y <400MB para moderado. <br /><br /> Puedes ver las principales vistas con mayor consumo de memoria de media durante un periodo seleccionado en **Mobile Vitals** en la página Información general de tu aplicación. |

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
| Frecuencia de actualización | Para asegurar una experiencia de usuario fluida y sin fallos, tu aplicación debe renderizar los fotogramas a menos de 60Hz. <br /><br /> RUM rastrea la tasa de actualización de la vista del subproceso principal de la aplicación usando los atributos de vista `@view.refresh_rate_average` y `@view.refresh_rate_min`.  <br /><br />  **Nota:** Las tasas de actualización están normalizadas en un rango de cero a 60fps. Por ejemplo, si tu aplicación se ejecuta a 100fps en un dispositivo capaz de renderizar 120fps, Datadog informa de 50fps en **Mobile Vitals**. |
| Renderizados lentos | Para asegurar una experiencia de usuario fluida y sin fallos, tu aplicación debe renderizar los fotogramas a menos de 60Hz. <br /><br /> RUM rastrea la tasa de actualización de la vista del subproceso principal de la aplicación usando los atributos de vista `@view.refresh_rate_average` y `@view.refresh_rate_min`.  <br /><br /> Con el renderizado lento, puedes monitorizar qué vistas tardan más de 16ms o 60Hz en renderizar.<br /> **Nota:** Las tasas de actualización están normalizadas en un rango de cero a 60fps. Por ejemplo, si tu aplicación se ejecuta a 100fps en un dispositivo capaz de renderizar 120fps, Datadog informa de 50fps en **Mobile Vitals**. |
| Fotogramas congelados | Los fotogramas que tardan más de 700ms en renderizarse aparecen como atascados y sin respuesta en tu aplicación. Se clasifican como fotogramas congelados.<br /><br /> RUM rastrea eventos `long task` con la duración de cualquier tarea que tarde más de 100ms en completarse. <br /><br /> Con los fotogramas congelados, puedes monitorizar qué vistas aparecen congeladas (tardan más de 700ms en renderizarse) para tus usuarios finales y eliminar los fallos en tu aplicación. |
| Sesiones sin fallos por versión | Un [fallo de aplicación][1] se produce debido a una salida inesperada de la aplicación, normalmente causada por una excepción o señal no controlada. Las sesiones de usuario sin caídas en la aplicación se corresponden directamente con la experiencia y la satisfacción general del usuario final. <br /><br /> RUM realiza un rastreo completo de los informes de fallos y presenta tendencias a lo largo del tiempo con [Error Tracking][2]. <br /><br /> Con las sesiones sin fallos, puedes mantenerte al día en los puntos de referencia de la industria y asegurarte de que tu aplicación ocupa un lugar destacado en Apple App Store. |
| Tasa de cuelgues | Según la definición de Apple, la tasa de cuelgues de una aplicación corresponde al "número de segundos por hora que la aplicación no responde, contando únicamente los periodos de no respuesta superiores a 250 ms". Para calcular la tasa de cuelgues de tu aplicación en Datadog, activa el [informe de cuelgues de la aplicación][4] y sigue la [sección dedicada][5].
| Tics por segundo de la CPU | Un uso elevado de la CPU afecta a la [duración de la batería][3] de los dispositivos de tus usuarios.  <br /><br /> RUM realiza rastreo de tics de CPU por segundo para cada vista y la utilización de la CPU en el transcurso de una sesión. El rango recomendado es <40 para bueno y <60 para moderado. <br /><br /> Puedes ver las principales vistas con el mayor número de tics de CPU de media durante un periodo seleccionado en **Mobile Vitals** en la página Información general de tu aplicación. |
| Utilización de la memoria | Un uso elevado de memoria puede provocar [terminaciones de WatchDog][6], lo que crea una mala experiencia para el usuario. <br /><br />  RUM rastrea la cantidad de memoria física utilizada por tu aplicación en bytes para cada vista, en el transcurso de una sesión. El rango recomendado es <200MB para bueno y <400MB para moderado. <br /><br /> Puedes ver las principales vistas con mayor consumo de memoria de media durante un periodo seleccionado en **Mobile Vitals** en la página Información general de tu aplicación. |

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
| Frecuencia de actualización | Para asegurar una experiencia de usuario fluida y [sin fallos][1], tu aplicación debe renderizar los fotogramas a menos de 60Hz. <br /><br /> RUM rastrea la [tasa de actualización de la vista del subproceso principal][2] de la aplicación usando los atributos de vista `@view.refresh_rate_average` y `@view.refresh_rate_min`.  <br /><br />  **Nota:** Las tasas de actualización están normalizadas en un rango de cero a 60fps. Por ejemplo, si tu aplicación se ejecuta a 100fps en un dispositivo capaz de renderizar 120fps, Datadog informa de 50fps en **Mobile Vitals**. |
| Renderizados lentos | Para asegurar una experiencia de usuario fluida y [sin fallos][1], tu aplicación debe renderizar los fotogramas a menos de 60Hz. <br /><br /> RUM rastrea la [tasa de actualización de la vista del subproceso principal][2] de la aplicación usando los atributos de vista `@view.refresh_rate_average` y `@view.refresh_rate_min`.  <br /><br /> Con el renderizado lento, puedes monitorizar qué vistas tardan más de 16ms o 60Hz en renderizar.<br /> **Nota:** Las tasas de actualización están normalizadas en un rango de cero a 60fps. Por ejemplo, si tu aplicación se ejecuta a 100fps en un dispositivo capaz de renderizar 120fps, Datadog informa de 50fps en **Mobile Vitals**. |
| Fotogramas congelados | Los fotogramas que tardan más de 700ms en renderizarse aparecen como atascados y sin respuesta en tu aplicación. Se clasifican como [fotogramas congelados][3]. <br /><br /> RUM rastrea eventos `long task` con la duración de cualquier tarea que tarde más de 100ms en completarse. <br /><br /> Con los fotogramas congelados, puedes monitorizar qué vistas aparecen congeladas (tardan más de 700ms en renderizarse) para tus usuarios finales y eliminar los fallos en tu aplicación. |
| La aplicación no responde | En Android, cuando el subproceso de interfaz de usuario de una aplicación se bloquea durante más de 5 segundos, se produce un error `Application Not Responding` ([ANR][4]). Si la aplicación está en primer plano, el sistema muestra un modal de diálogo al usuario, permitiéndole forzar la salida de la aplicación. <br /><br /> RUM rastrea las ocurrencias de ANR y captura todo el stack trace que bloquea el subproceso principal cuando encuentra un ANR. |
| Sesiones sin fallos por versión | Un [fallo de aplicación][5] se produce debido a una salida inesperada de la aplicación, normalmente causada por una excepción o señal no controlada. Las sesiones de usuario sin caídas en la aplicación se corresponden directamente con la experiencia y la satisfacción general del usuario final. <br /><br /> RUM realiza un rastreo completo de los informes de fallos y presenta tendencias a lo largo del tiempo con el [Rastreo de errores][8]. <br /><br /> Con las sesiones sin fallos, puedes mantenerte al día en los puntos de referencia de la industria y asegurarte de que tu aplicación ocupa un lugar destacado en Google Play Store. |
| Tics por segundo de la CPU | Un uso elevado de la CPU afecta a la [duración de la batería][6] de los dispositivos de tus usuarios.  <br /><br /> RUM realiza rastreo de tics de CPU por segundo para cada vista y la utilización de la CPU en el transcurso de una sesión. El rango recomendado es <40 para bueno y <60 para moderado. <br /><br /> Puedes ver las principales vistas con el mayor número de tics de CPU de media durante un periodo seleccionado en **Mobile Vitals** en la página Información general de tu aplicación. |
| Utilización de la memoria | Un uso elevado de memoria puede provocar [fallos de falta de memoria][7], lo que crea una mala experiencia para el usuario. <br /><br />  RUM rastrea la cantidad de memoria física utilizada por tu aplicación en bytes para cada vista, en el transcurso de una sesión. El rango recomendado es <200MB para bueno y <400MB para moderado. <br /><br /> Puedes ver las principales vistas con mayor consumo de memoria de media durante un periodo seleccionado en **Mobile Vitals** en la página Información general de tu aplicación. |
| Tiempo de compilación del widget | Es el tiempo que tarda en compilarse el fotograma en el subproceso de la interfaz de usuario. Para asegurar animaciones sin errores, esto no debería exceder 16ms para 60 FPS, y 8ms para 120 FPS. <br /><br />  Valores altos significan que necesitas optimizar tus métodos de compilación para esta vista. Consulta [Control del costo de compilación][8] en la documentación de Flutter. |
| Tiempo de ráster | Es el tiempo que se tarda en hacer ráster del fotograma en el subproceso de ráster. Para asegurar animaciones sin errores, esto no debería exceder 16ms para 60 FPS, y 8ms para 120 FPS. <br /><br />  Valores altos aquí pueden significar que tu vista es compleja de renderizar. Consulta [Identificación de problemas en el gráfico de la GPU][12] en la documentación de Flutter. |

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
| Frecuencia de actualización | Para asegurar una experiencia de usuario fluida y [sin fallos][1], tu aplicación debe renderizar los fotogramas a menos de 60Hz. <br /><br /> RUM rastrea la [tasa de actualización de la vista del subproceso principal][2] de la aplicación usando los atributos de vista `@view.refresh_rate_average` y `@view.refresh_rate_min`.  <br /><br />  **Nota:** Las tasas de actualización están normalizadas en un rango de cero a 60fps. Por ejemplo, si tu aplicación se ejecuta a 100fps en un dispositivo capaz de renderizar 120fps, Datadog informa de 50fps en **Mobile Vitals**. |
| Frecuencia de actualización de JS | Para asegurar una experiencia de usuario fluida y [sin fallos][1], tu aplicación debe renderizar los fotogramas a menos de 60Hz. <br /><br /> RUM rastrea la [tasa de actualización de la vista del subproceso de JavaScript][2] de la aplicación usando los atributos de vista `@view.js_refresh_rate.average`, `@view.js_refresh_rate.min` y `@view.js_refresh_rate.max`. <br /><br /> **Nota:** Las tasas de actualización están normalizadas en un rango de cero a 60fps. Por ejemplo, si tu aplicación se ejecuta a 100fps en un dispositivo capaz de renderizar 120fps, Datadog informa de 50fps en **Mobile Vitals**. |
| Renderizados lentos | Para asegurar una experiencia de usuario fluida y [sin fallos][1], tu aplicación debe renderizar los fotogramas a menos de 60Hz. <br /><br /> Con el renderizado lento, puedes monitorizar qué vistas tienen una tasa de fotograma media de menos de 55fps.  <br /><br />  **Nota:** Las tasas de actualización están normalizadas en un rango de cero a 60fps. Por ejemplo, si tu aplicación se ejecuta a 100fps en un dispositivo capaz de renderizar 120fps, Datadog informa de 50fps en **Mobile Vitals**. |
| Fotogramas congelados | Los fotogramas que tardan más de 700ms en renderizarse aparecen como atascados y sin respuesta en tu aplicación. Se clasifican como [fotogramas congelados][3]. <br /><br /> RUM rastrea eventos `long task` con la duración de cualquier tarea que tarde más de 100ms en completarse. <br /><br /> Con los fotogramas congelados, puedes monitorizar qué vistas aparecen congeladas (tardan más de 700ms en renderizarse) para tus usuarios finales y eliminar los fallos en tu aplicación. |
| La aplicación no responde | Cuando el subproceso de interfaz de usuario de una aplicación se bloquea durante más de 5 segundos, se produce un error `Application Not Responding` (ANR). Si la aplicación está en primer plano, el sistema muestra un modal de diálogo al usuario, permitiéndole forzar la salida de la aplicación. <br /><br /> RUM rastrea las ocurrencias de ANR y captura todo el stack trace que bloquea el subproceso principal cuando encuentra un ANR. |
| Sesiones sin fallos por versión | Un [fallo de aplicación][4] se produce debido a una salida inesperada de la aplicación, normalmente causada por una excepción o señal no controlada. Las sesiones de usuario sin caídas en la aplicación se corresponden directamente con la experiencia y la satisfacción general del usuario final. <br /><br /> RUM realiza un rastreo completo de los informes de fallos y presenta tendencias a lo largo del tiempo con el [Rastreo de errores][5]. <br /><br /> Con las sesiones sin fallos, puedes mantenerte al día en los puntos de referencia de la industria y asegurarte de que tu aplicación ocupa un lugar destacado en Google Play Store. |
| Tics por segundo de la CPU | Un uso elevado de la CPU afecta a la [duración de la batería][6] de los dispositivos de tus usuarios.  <br /><br /> RUM realiza rastreo de tics de CPU por segundo para cada vista y la utilización de la CPU en el transcurso de una sesión. El rango recomendado es <40 para bueno y <60 para moderado. <br /><br /> Puedes ver las principales vistas con el mayor número de tics de CPU de media durante un periodo seleccionado en **Mobile Vitals** en la página Información general de tu aplicación. |
| Utilización de la memoria | Un uso elevado de memoria puede provocar [fallos de falta de memoria][7], lo que crea una mala experiencia para el usuario. <br /><br />  RUM rastrea la cantidad de memoria física utilizada por tu aplicación en bytes para cada vista, en el transcurso de una sesión. El rango recomendado es <200MB para bueno y <400MB para moderado. <br /><br /> Puedes ver las principales vistas con mayor consumo de memoria de media durante un periodo seleccionado en **Mobile Vitals** en la página Información general de tu aplicación. |

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
| Frecuencia de actualización | Para asegurar una experiencia de usuario fluida y sin fallos, tu aplicación debe renderizar los fotogramas a menos de 60Hz. <br /><br /> RUM rastrea la tasa de actualización de la vista del subproceso principal de la aplicación usando los atributos de vista `@view.refresh_rate_average` y `@view.refresh_rate_min`.  <br /><br />  **Nota:** Las tasas de actualización están normalizadas en un rango de cero a 60fps. Por ejemplo, si tu aplicación se ejecuta a 100fps en un dispositivo capaz de renderizar 120fps, Datadog informa de 50fps en **Mobile Vitals**. |
| Renderizados lentos | Para asegurar una experiencia de usuario fluida y sin fallos, tu aplicación debe renderizar los fotogramas a menos de 60Hz. <br /><br /> RUM rastrea la tasa de actualización de la vista del subproceso principal de la aplicación usando los atributos de vista `@view.refresh_rate_average` y `@view.refresh_rate_min`.  <br /><br /> Con el renderizado lento, puedes monitorizar qué vistas tardan más de 16ms o 60Hz en renderizar.<br /> **Nota:** Las tasas de actualización están normalizadas en un rango de cero a 60fps. Por ejemplo, si tu aplicación se ejecuta a 100fps en un dispositivo capaz de renderizar 120fps, Datadog informa de 50fps en **Mobile Vitals**. |
| Sesiones sin fallos por versión | Un [fallo de aplicación][1] se produce debido a una salida inesperada de la aplicación, normalmente causada por una excepción o señal no controlada. Las sesiones de usuario sin caídas en la aplicación se corresponden directamente con la experiencia y la satisfacción general del usuario final. <br /><br /> RUM realiza un rastreo completo de los informes de fallos y presenta tendencias a lo largo del tiempo con el [Rastreo de errores][2]. <br /><br /> Con las sesiones sin fallos, puedes mantenerte al día en los puntos de referencia de la industria y asegurarte de que tu aplicación ocupa un lugar destacado en Google Play Store. |
| Tasa de cuelgues | Según la definición de Apple, la tasa de caída de una aplicación corresponde al "número de segundos por hora que la aplicación no responde, contando únicamente los periodos de no respuesta superiores a 250 ms". Para calcular la tasa de caída de tu aplicación en Datadog, activa "Track Non-Fatal App Hangs" y sigue la [configuración de Datadog][4].
| Tics por segundo de la CPU | Un uso elevado de la CPU afecta a la [duración de la batería][3] de los dispositivos de tus usuarios.  <br /><br /> RUM realiza rastreo de tics de CPU por segundo para cada vista y la utilización de la CPU en el transcurso de una sesión. El rango recomendado es <40 para bueno y <60 para moderado. <br /><br /> Puedes ver las principales vistas con el mayor número de tics de CPU de media durante un periodo seleccionado en **Mobile Vitals** en la página Información general de tu aplicación. |
| Utilización de la memoria | Un uso elevado de memoria puede provocar [terminaciones de WatchDog][6], lo que crea una mala experiencia para el usuario. <br /><br />  RUM rastrea la cantidad de memoria física utilizada por tu aplicación en bytes para cada vista, en el transcurso de una sesión. El rango recomendado es <200MB para bueno y <400MB para moderado. <br /><br /> Puedes ver las principales vistas con mayor consumo de memoria de media durante un periodo seleccionado en **Mobile Vitals** en la página Información general de tu aplicación. |

[1]: https://developer.apple.com/documentation/xcode/diagnosing-issues-using-crash-reports-and-device-logs
[2]: /es/real_user_monitoring/error_tracking/mobile/unity/
[3]: https://developer.apple.com/documentation/xcode/analyzing-your-app-s-battery-use/
[4]: /es/real_user_monitoring/mobile_and_tv_monitoring/setup/unity
[6]: /es/real_user_monitoring/error_tracking/mobile/ios/?tab=cocoapods#add-watchdog-terminations-reporting

{{% /tab %}}

{{< /tabs >}}

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}


[1]: https://developer.android.com/topic/performance/vitals
[2]: https://developer.apple.com/documentation/metrickit