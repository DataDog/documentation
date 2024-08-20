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

Esta guía te muestra las prácticas recomendadas para el muestreo en RUM, para que puedas capturar sesiones y recopilar datos en función de tus necesidades de monitorización. Obtén más información sobre cómo [se definen las sesiones][9] en RUM.

## Configuración del muestreo

### Configuración de los nombres de variables que corresponden a la versión del SDK

Las sesiones se muestrean aleatoriamente en función del porcentaje indicado en la [configuración del SDK][1]. Para ello, asegúrate de utilizar los nombres de variables de configuración correctos de la versión del SDK que estás utilizando.

### Configuración de la frecuencia de muestreo
Antes de cada nueva sesión de usuario, el SDK extrae un número de coma flotante aleatorio entre 0 y 1, que luego se compara con el valor definido en la configuración del SDK. Si el número aleatorio es inferior al valor definido en la configuración del SDK, se conserva la sesión y se empiezan a recopilar eventos. Si el valor es superior, no se conserva la sesión y no se recopilan eventos hasta el final de la sesión.

Puedes definir la frecuencia de muestreo con el SDK ([Navegador][2], [Android][3], [iOS][4], [React Native][5], [Flutter][6], [Roku][7]) y, a continuación, desplegarla en el código de la aplicación.

Sólo las sesiones muestreadas están disponibles en RUM. Por ejemplo, si la frecuencia de muestreo se define en 60%, el 60% de todas las sesiones y métricas (como Core Web Vitals y números de uso) estarán visibles en RUM.

El muestreo aleatorio se realiza por sesión, no por usuario.

### Efecto del muestreo en datos y métricas disponibles en RUM
Las métricas RUM (como Core Web Vitals y números de uso) se calculan basándose en las sesiones muestreadas. Por ejemplo, si la frecuencia de muestreo se configura para capturar el 60% de las sesiones, las Core Web Vitals y el número total de sesiones se calculan basándose en el 60% de esas sesiones. 

### Frecuencia de muestreo recomendada
En cuanto a la frecuencia de muestreo ideal, depende de la cantidad de tráfico que observes y de los datos que busques. Datadog recomienda empezar con una frecuencia de muestreo con la que te sientas a gusto, en función de tu presupuesto y tráfico estimado, y luego ajustarla en función de los datos que necesites. 

### Muestreo basado en atributos específicos
No se admite la configuración del muestreo basado en atributos específicos, como el muestreo del 100% de las sesiones con errores y el 5% en caso contrario, o el muestreo únicamente de las sesiones que pasan por el flujo (flow) de pago. Si esta función es fundamental para tus necesidades de negocios, crea un ticket para el [servicio de asistencia de Datadog][8].

### Cambio de la frecuencia de muestreo en la interfaz de usuario de RUM en Datadog
No se admite el cambio de la frecuencia de muestreo en la interfaz de usuario de RUM en Datadog. Si esta función es fundamental para tus necesidades de negocios, crea un ticket para el [servicio de asistencia de Datadog][8].

### Ajuste del muestreo durante las interrupciones en directo

Si se produce un error o un incidente, puedes aumentar el muestreo para recopilar el 100% del tráfico de usuarios en tu navegador para asegurarte de que no te perderás ninguna sesión. Para ello, debes implementar un cambio de código.

**Nota**: Esta función no se aplica a las aplicaciones móviles o Roku debido al largo ciclo de lanzamiento.

### Consideraciones sobre los dispositivos móviles que se desconectan o fallan

RUM garantiza la disponibilidad de los datos cuando los dispositivos de los usuarios están desconectados. En zonas con poca potencia de red o cuando la carga de la batería del dispositivo está demasiado baja, todos los eventos RUM se almacenan en el dispositivo local por lotes. Se envían en cuanto la red está disponible y la carga de la batería es lo suficientemente alta como para garantizar que el SDK RUM no afectará a la experiencia del usuario final. Si la red no está disponible mientras tu aplicación está en primer plano o si falla una carga de datos, el lote se conserva hasta que pueda enviarse con éxito.

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/real_user_monitoring/guide/sampling-browser-plans/#overview
[2]: /es/real_user_monitoring/guide/sampling-browser-plans/#overview
[3]: /es/real_user_monitoring/mobile_and_tv_monitoring/advanced_configuration/android/?tab=kotlin#initialization-parameters
[4]: /es/real_user_monitoring/ios/advanced_configuration/?tab=swift#sample-rum-sessions
[5]: /es/real_user_monitoring/reactnative/#initialize-the-library-with-application-context
[6]: /es/real_user_monitoring/mobile_and_tv_monitoring/setup/flutter/advanced_configuration/#sample-rum-sessions
[7]: /es/real_user_monitoring/mobile_and_tv_monitoring/setup/roku/#initialize-the-library
[8]: /es/help
[9]: /es/real_user_monitoring/guide/understanding-the-rum-event-hierarchy/#sessions