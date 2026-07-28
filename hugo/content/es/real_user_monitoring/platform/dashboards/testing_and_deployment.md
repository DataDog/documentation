---
aliases:
- /es/real_user_monitoring/dashboards/testing_coverage
- /es/real_user_monitoring/platform/dashboards/testing_coverage
description: Obtén más información sobre los dashboards predefinidos de tests y despliegues.
further_reading:
- link: /real_user_monitoring/
  tag: Documentación
  text: Más información sobre RUM y Session Replay
- link: /synthetics/browser_tests
  tag: Documentación
  text: Más información sobre los tests de navegador de Synthetic
- link: https://www.datadoghq.com/blog/test-coverage-monitoring-datadog/
  tag: Blog
  text: Seguimiento de la cobertura de tests con RUM y la monitorización Synthetic
title: Dashboards de tests y despliegues
---

## Cobertura de test


El [dashboard de cobertura de tests de aplicaciones Synthetics y RUM][1] utiliza los datos recopilados de [RUM][2] y los resultados de los [tests de navegador][3] Synthetic para proporcionar información sobre la cobertura general de los tests de tu aplicación. 

Puedes utilizar este dashboard para responder a las siguientes preguntas:

- ¿Qué se prueba y qué no en tu aplicación?
- ¿Cómo identificar las secciones más populares de tu aplicación y así monitorizarlas continuamente?
- ¿Cómo encontrar las acciones más populares de los usuarios en tu aplicación para añadir cobertura de los tests del navegador? 

Se muestra:

- **Porcentaje de acciones probadas**: Analiza la cobertura de tests global de tu aplicación.
- **Acciones no probadas**: Explora las acciones de usuarios no probadas más populares con el recuento de interacciones de usuario reales y el número de acciones cubiertas en los tests del navegador.

{{< img src="synthetics/dashboards/testing_coverage-2.png" alt="Dashboard predefinido de cobertura de tests Synthetics" style="width:100%" >}}

{{< img src="synthetics/dashboards/testing_coverage_actions_tests-1.png" alt="Secciones Acciones de RUM no probadas y Principales tests de navegador Synthetic que cubren acciones de RUM" style="width:100%" >}}

Para obtener más información sobre los datos mostrados, consulta [Datos recopilados del navegador RUM][2].

## Seguimiento de despliegues web

El dashboard de seguimiento de despliegues de aplicaciones web RUM te ayuda a identificar cuándo un despliegue reciente está causando problemas de rendimiento o nuevos errores en tu aplicación. Para utilizar esta función, asegúrate de [añadir versiones RUM a tu aplicación][4]. Este dashboard muestra:

- **Core web vitals**:
  Para todas las vistas, se destacan tres métricas de rendimiento del navegador: Largest Contentful Paint, First Input Delay y Cumulative Layout Shift. También están disponibles otras métricas de rendimiento, como Tiempo de carga.
- **Errores**: 
  Observa un recuento de errores, el porcentaje de visualizaciones con errores y explora los problemas en curso.
- **Métricas de rendimiento del navegador**:
  Compara métricas de rendimiento como el tiempo de carga, las sesiones, los errores y los tiempos de carga en diferentes servicios y versiones.

{{< img src="real_user_monitoring/dashboards/dashboard-deployment-web.png" alt="Dashboard predefinido de despliegues web" style="width:100%" >}}

## Seguimiento de despliegues móviles

El dashboard de seguimiento de despliegues de aplicaciones móviles RUM te ayuda a identificar cuándo un despliegue o lanzamiento reciente está causando problemas de rendimiento o nuevos errores en tu aplicación móvil. Si directamente necesitas comparar versiones, utiliza la sección de seguimiento de despliegues de la página de resumen de RUM.

Para utilizar el seguimiento de despliegues, asegúrate de especificar una versión de la aplicación al inicializar el **SDK de Datadog**.

Este dashboard muestra:

- **Fallos**: 
  Revisa el recuento de fallos por versión, el índice de fallos por versión y explora los fallos en curso.
- **Errores**:
  Revisa el recuento de errores por versión, la tasa de errores por versión y explora los errores en curso.
- **Mobile vitals por versión**:
  Para todas las versiones, se destacan cuatro métricas de rendimiento móvil: devoluciones lentas, fotogramas congelados, tiempo de inicio de la aplicación y uso de memoria.

{{< img src="real_user_monitoring/dashboards/dashboard-deployment-mobile.png" alt="Dashboard predefinido de despliegues móviles" style="width:100%" >}}

Para obtener más información sobre los datos mostrados, consulta nuestra documentación para cada plataforma: [iOS RUM][5], [Android RUM][6], [React Native RUM][7] y [Flutter RUM][8].

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/dash/integration/30697/synthetics---browser-test-performance
[2]: /es/real_user_monitoring/browser/data_collected/
[3]: /es/synthetics/browser_tests/
[4]: /es/real_user_monitoring/browser/setup/#initialization-parameters
[5]: /es/real_user_monitoring/ios/data_collected/
[6]: /es/real_user_monitoring/android/data_collected/
[7]: /es/real_user_monitoring/reactnative/data_collected/
[8]: /es/real_user_monitoring/mobile_and_tv_monitoring/data_collected/flutter