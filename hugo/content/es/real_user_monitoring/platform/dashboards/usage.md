---
aliases:
- /es/real_user_monitoring/dashboards/frustration_signals_dashboard
- /es/real_user_monitoring/dashboards/user_sessions_dashboard
- /es/real_user_monitoring/platform/dashboards/frustration_signals_dashboard
- /es/real_user_monitoring/platform/dashboards/user_sessions_dashboard
description: Rastrea la participación y el comportamiento de los usuarios con dashboards
  que muestren las sesiones de los usuarios, las señales de frustración y los patrones
  de uso de las aplicaciones.
further_reading:
- link: /real_user_monitoring/explorer
  tag: Documentación
  text: Más información sobre el Explorador RUM
title: Dashboard del uso de RUM
---

## Uso de la web


El dashboard del uso de la aplicación web RUM proporciona información sobre cómo tus clientes utilizan tu aplicación. Muestra:

- **Uso de la aplicación**:
  Consulta los gráficos de duración media de las sesiones, páginas vistas por sesión, acciones por sesión y errores por sesión. Las siguientes tablas muestran métricas de uso basadas en la primera y la última página visitada.
- **Recorridos de los usuarios**:
  Descubre en qué páginas pasan más tiempo tus usuarios y observa dónde empiezan y terminan su recorrido por tu aplicación.
- **Matriz de compromiso**:
  Descubre qué parte de tus usuarios realizan qué acciones.
- **Datos demográficos de los usuarios**:
  Observa el número de sesiones por país y los principales países, dispositivos y sistemas operativos de tu aplicación. También puedes ver un gráfico de las principales cuotas de uso de los navegadores.

{{< img src="real_user_monitoring/dashboards/dashboard-usage-web-app.png" alt="Dashboard predefinido del uso de la aplicación web RUM" style="width:100%" >}}

Para obtener más información sobre los datos mostrados, consulta [Datos recopilados del navegador RUM][1].

## Uso móvil


El dashboard del uso de la aplicación móvil RUM proporciona información sobre cómo tus clientes utilizan tu aplicación.

- **Uso de la aplicación**:
  Obtén más información sobre tus usuarios conociendo la versión de la aplicación, el SDK Datadog y el navegador que utilizan. Compara las sesiones de esta semana con las de la semana pasada. Observa la tasa de rebote general.
- **Recorridos de los usuarios**:
  Descubre en qué páginas pasan más tiempo tus usuarios y observa dónde empiezan y terminan su recorrido por tu aplicación.
- **Matriz de compromiso**:
  Descubre qué parte de tus usuarios realizan qué acciones.
- **Datos demográficos de los usuarios**:
  Observa el número de sesiones por país y los principales países, dispositivos y sistemas operativos de tu aplicación. También puedes ver un gráfico de las principales cuotas de uso de los navegadores.

{{< img src="real_user_monitoring/dashboards/dashboard-usage-mobile-app.png" alt="Dashboard predefinido del uso de la aplicación móvil RUM" style="width:100%" >}}

Para obtener más información sobre los datos mostrados, consulta nuestra documentación para cada plataforma: [iOS RUM][2], [Android RUM][3], [React Native RUM][4] y [Flutter RUM][5].

## Datos demográficos de los usuarios


El dashboard de los datos demográficos de los usuarios de RUM te ofrece información sobre la adopción geográfica de tu aplicación.

- **Datos globales**: 
  Obtén una visión global de tus usuarios y descubre qué países, regiones y ciudades utilizan más tu aplicación.
- **Compara continentes y compara países**:
  Descubre cómo tus usuarios viven tu aplicación de forma diferente en función de su continente y su país.

{{< img src="real_user_monitoring/dashboards/dashboard-usage-user-demographics.png" alt="Dashboard predefinido de los datos demográficos de los usuarios de RUM" style="width:100%" >}}

Para obtener más información sobre los datos mostrados, consulta [Seguridad de los datos de Real User Monitoring][6].

## Señales de frustración


El dashboard de las señales de frustración de RUM te ofrece información sobre los puntos en los que sus usuarios se sienten frustrados, molestos o bloqueados en sus flujos (flows) de trabajo. Las señales de frustración se dividen en tres tipos diferentes:

- **Clics de rabia**:
  Cuando un usuario pulsa el mismo botón más de 3 veces en una ventana deslizante de 1 segundo.
- **Clic por error**:
  Cuando un usuario hace clic en un elemento y se encuentra con un error JavaScript.
- **Clic muerto**:
  Cuando un usuario hace clic en un elemento estático que no produce ninguna acción en la página.

{{< img src="real_user_monitoring/dashboards/dashboard-usage-frustration-signals.png" alt="Dashboard predefinido de las señales de frustración de RUM" style="width:100%" >}}

Para obtener más información sobre los datos mostrados, consulta [Seguridad de los datos de Real User Monitoring][6].

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/real_user_monitoring/application_monitoring/browser/data_collected/
[2]: /es/real_user_monitoring/application_monitoring/ios/data_collected/
[3]: /es/real_user_monitoring/application_monitoring/android/data_collected/
[4]: /es/real_user_monitoring/application_monitoring/react_native/data_collected/
[5]: /es/real_user_monitoring/application_monitoring/flutter/data_collected/
[6]: /es/data_security/real_user_monitoring/