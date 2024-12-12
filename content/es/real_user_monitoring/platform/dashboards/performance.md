---
aliases:
- /es/real_user_monitoring/dashboards/performance_overview_dashboard/
- /es/real_user_monitoring/dashboards/resources_dashboard
- /es/real_user_monitoring/dashboards/mobile_dashboard
- /es/real_user_monitoring/platform/dashboards/performance_overview_dashboard/
- /es/real_user_monitoring/platform/dashboards/resources_dashboard
- /es/real_user_monitoring/platform/dashboards/mobile_dashboard
further_reading:
- link: /real_user_monitoring/explorer
  tag: Documentation
  text: Información sobre el navegador RUM
title: Dashboards de información general del rendimiento de RUM
---

## Rendimiento de la aplicación web


El dashboard del rendimiento de las aplicaciones web ofrece una vista de pájaro de las aplicaciones web RUM. Muestra:

- **Core web vitals**: 
  Para todas las vistas, se destacan tres métricas de rendimiento del navegador: Largest Contentful Paint, First Input Delay y Cumulative Layout Shift. También están disponibles otras métricas de rendimiento, como Tiempo de carga.
- **Solicitudes y recursos XHR y Fetch**:
  Para todas las vistas, identifica los cuellos de botella cuando se carga tu aplicación.
- **Tareas prolongadas**: Eventos que bloquean el subproceso principal del navegador durante más de 50 ms.

{{< img src="real_user_monitoring/dashboards/dashboard-performance -web-app.png" alt="Dashboard predefinido de información general de la aplicación web RUM" style="width:100%" >}}

Para obtener más información sobre los datos mostrados, consulta [Datos recopilados del navegador RUM][1].

## Rendimiento de la aplicación móvil


El dashboard del rendimiento de las aplicaciones móviles ofrece información general de las aplicaciones web RUM. Muestra:

- **Mobile vitals**:
  Para todas las pantallas, se destacan cuatro métricas de rendimiento de móviles: presentaciones lentas, ticks de CPU por segundo, fotogramas congelados y uso de memoria. También están disponibles otras métricas de rendimiento, como las sesiones sin fallos.
- **Análisis de recursos**:
  Para todas las pantallas, identifica los cuellos de botella cuando tu aplicación solicita contenidos.
- **Fallos y errores**:
  Identifica dónde pueden surgir fallos y errores en tu aplicación.

{{< img src="real_user_monitoring/dashboards/dashboard-performance -mobile-app.png" alt="Dashboard predefinido de información general de la aplicación web RUM" style="width:100%" >}}

Para obtener más información sobre los datos mostrados, consulta nuestra documentación para cada plataforma: [iOS RUM][2], [Android RUM][3], [React Native RUM][4] y [Flutter RUM][5].

## Recursos


El dashboard de recursos RUM te ayuda a identificar qué recursos tienen el mayor impacto en tu aplicación. Muestra:

- **Recursos más solicitados**:
  Visualiza qué recursos se cargan más y mide su tamaño y su tiempo de carga.
- **Solicitudes XHR y Fetch**:
  Solicita repartición, método y códigos de estado de error.
- **Tiempos de carga de los recursos**:
  Monitoriza las tendencias en los tiempos de los recursos (búsqueda DNS, conexión inicial, tiempo hasta el primer byte, descarga) recopilados por el SDK del navegador.
- **Recursos de terceros**:
  Descubre cuáles de tus recursos de terceros tienen mayor impacto en tu aplicación.

{{< img src="real_user_monitoring/dashboards/dashboard-performance-resources.png" alt="Dashboard predefinido de información general de la aplicación web RUM" style="width:100%" >}}

Para obtener más información sobre los datos mostrados, consulta [Seguridad de los datos de Real User Monitoring][6].

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/real_user_monitoring/data_collected/
[2]: /es/real_user_monitoring/ios/data_collected/
[3]: /es/real_user_monitoring/android/data_collected/
[4]: /es/real_user_monitoring/reactnative/data_collected/
[5]: /es/real_user_monitoring/mobile_and_tv_monitoring/data_collected/flutter
[6]: /es/data_security/real_user_monitoring/