---
description: Guía para el muestreo en RUM.
further_reading:
- link: /monitors/create/types/real_user_monitoring/
  tag: Documentación
  text: Más información sobre los monitores RUM
title: Prácticas recomendadas para el muestreo en RUM
---

## Información general

El muestreo en el producto Real User Monitoring de Datadog te permite recopilar datos de un determinado porcentaje del tráfico de usuarios.

Hay dos formas diferentes de muestreo, que controlan los datos que envías a Datadog:

- **Muestreo del lado del cliente (basado en head)**: Toma la decisión de muestreo al principio de una sesión de usuario, antes de que se recopile ningún dato. El kit de desarrollo de software (SDK) de RUM de tu aplicación determina si se rastrea toda la sesión o no, lo que reduce la recopilación de datos y la ingesta de sesiones que no se analizan.

- **Muestreo del lado del servidor (basado en tail (seguimiento de logs)): Toma la decisión de muestreo después de que los datos se hayan recopilado y enviado a Datadog. Permite filtrar y retener sesiones específicas en función de sus características (como errores o atributos de usuario) mediante filtros de retención.

  **Nota**: El muestreo del lado del servidor solo es posible con los [filtros de retención][12] proporcionados por [RUM without Limits][2]. Si necesitas utilizar esto, pero estás en el modelo heredado, solo del lado del cliente, ponte en contacto con tu equipo de cuentas.

Esta guía te explica las prácticas recomendadas para el muestreo de RUM para que puedas capturar sesiones y recopilar datos en función de tus necesidades de monitorización. Obtén más información sobre cómo [se definen las sesiones][1] en RUM.

## Configuración del muestreo

### Configuración de la frecuencia de muestreo

#### Frecuencia de muestreo del lado del cliente (basado en head)

Con [RUM without Limits][2], la frecuencia de muestreo del lado del cliente te ayuda a controlar cuántas sesiones envías desde tus aplicaciones a Datadog.

Antes de cada nueva sesión de usuario, el kit de desarrollo de software (SDK) extrae un número aleatorio de coma flotante entre 0 y 100, que se compara con el valor establecido en la configuración del kit de desarrollo de software (SDK). Si el número aleatorio es inferior al valor establecido en la configuración del kit de desarrollo de software (SDK), se mantiene la sesión y comienzan a recopilarse los eventos. Si el número aleatorio es mayor, la sesión no se mantiene y los eventos no se recogen hasta el final de la sesión.

Puedes configurar la frecuencia de muestreo con el kit de desarrollo de software (SDK) ([Navegador][3], [Android][4], [iOS][5], [Flutter][6], [Kotlin Multiplataform][7], [React Native][8], [Roku][9], [Unity][10]) y, a continuación, desplegarla en el código de la aplicación.

#### Frecuencia de muestreo del lado del servidor (basado en tail (seguimiento de logs))

Con RUM without Limits, la frecuencia de muestreo del lado del servidor define las sesiones que deseas conservar en Datadog (consulta los detalles sobre el [periodo de retención][11]).

La frecuencia de muestreo del lado del servidor se define como parte de los filtros de retención de las sesiones. Cuando un retention filter (filtro de retención) coincide con una sesión o coincide con uno de los eventos que componen las sesiones (vista/acción/error/recurso, etc.), la sesión completa se almacena junto con todos sus eventos (e incluidos los que precedieron a la decisión de muestreo). La tasa de retención permite almacenar solo un porcentaje específico de sesiones que cumplen los criterios del filtro y descartar el resto. Más información sobre [cómo funcionan los filtros de retención][12].

### Efecto del muestreo en datos y métricas disponibles en RUM

Todas las métricas RUM, incluidas las que vienen [predefinidas con RUM without Limits][13] (como las Core Web Vitals y las cifras de uso) y las [personalizadas][16] que puedes crear tú mismo, se calculan en función de las sesiones que se ingieren en Datadog. Por ejemplo, si la tasa de muestreo del lado del cliente está configurada para capturar el 60 % de las sesiones, entonces las Core Web Vitals y el número total de sesiones se calculan basándose en el 60 % de esas sesiones.

**Nota**: Con RUM without Limits, esas métricas se calculan antes de los [filtros de retención][12], es decir, antes del muestreo del lado del servidor.

### Frecuencia de muestreo recomendada

#### Frecuencia de muestreo del lado del cliente (basado en head)

Para una monitorización óptima, Datadog recomienda enviar el 100 % de tus sesiones a Datadog. Esto garantiza la precisión de las métricas personalizadas predefinidas y una visibilidad completa de la experiencia del usuario.

Sin embargo, si tu aplicación experimenta un alto tráfico y los costos de ingesta son una preocupación, puedes reducir la frecuencia de muestreo. Ten en cuenta que las tasas de muestreo más bajas afectan proporcionalmente a la precisión de tus [métricas][13].

#### Frecuencia de muestreo del lado del servidor (basado en tail (seguimiento de logs))

Para el muestreo del lado del servidor, Datadog recomienda un enfoque de dos steps (UI) / pasos (generic):

1. Comienza con filtros de retención básicos para capturar sesiones con rutas de usuario críticas, como errores o de usuarios específicos.

2. Ajusta la frecuencia de muestreo en función de tus necesidades:
   - Asegúrate de tener suficientes sesiones para la resolución de problemas
   - Mantén datos suficientes para la correlación de APM 
   - Conserva muestras suficientes para el análisis del rendimiento (vistas en cascada, tareas largas)

Con RUM without Limits, el muestreo del lado del servidor debería proporcionar datos suficientes tanto para la resolución de problemas como para el análisis del rendimiento, al tiempo que se gestiona el volumen de datos de forma eficaz.

### Muestreo basado en atributos específicos

La configuración del muestreo basado en atributos específicos, como el muestreo del 100 % de las sesiones con errores y del 5 % en caso contrario o el muestreo únicamente de las sesiones que pasan por el flujo de pago, es compatible con el uso de [filtros de retención][12]. Consulta la guía [Prácticas recomendadas de filtros de retención][14] para comprender los tipos habituales de retention filter (filtro de retención).

### Cambio de la frecuencia de muestreo en la interfaz de usuario de RUM en Datadog

La modificación de la frecuencia de muestreo solo se admite para el muestreo del lado del servidor y puede realizarse [modificando la frecuencia de retención][15] desde la page (página) de filtros de retención.

Durante las interrupciones en directo, los incidentes o las investigaciones de errores, puedes aumentar el muestreo para recopilar el 100 % de las sesiones y asegurarte de que no se pase nada por alto o para tener más ejemplos de un problema concreto.

**Nota**: Este comportamiento solo se aplica a las aplicaciones móviles que utilizan kits de desarrollo de software (SDK) móviles de RUM.

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/real_user_monitoring/guide/understanding-the-rum-event-hierarchy/#sessions
[2]: /es/real_user_monitoring/rum_without_limits/
[3]: /es/real_user_monitoring/guide/sampling-browser-plans/#overview
[4]: /es/real_user_monitoring/application_monitoring/android/advanced_configuration/?tab=kotlin#initialization-parameters
[5]: /es/real_user_monitoring/application_monitoring/ios/setup/#sample-session-rates
[6]: /es/real_user_monitoring/application_monitoring/flutter/setup/#sample-session-rates
[7]: /es/real_user_monitoring/application_monitoring/kotlin_multiplatform/setup/?tab=rum#sample-rum-sessions
[8]: /es/real_user_monitoring/reactnative/#initialize-the-library-with-application-context
[9]: /es/real_user_monitoring/application_monitoring/roku/setup/#step-3---initialize-the-library
[10]: /es/real_user_monitoring/application_monitoring/unity/setup#sample-rum-sessions
[11]: /es/data_security/data_retention_periods/
[12]: /es/real_user_monitoring/rum_without_limits/retention_filters
[13]: /es/real_user_monitoring/rum_without_limits/metrics
[14]: /es/real_user_monitoring/guide/retention_filter_best_practices/
[15]: /es/real_user_monitoring/rum_without_limits/retention_filters#modifying-filters
[16]: /es/real_user_monitoring/platform/generate_metrics