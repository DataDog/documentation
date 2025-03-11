---
aliases:
- /es/synthetics/dashboards/testing_coverage
- /es/synthetics/test_coverage
description: Evalúa la cobertura de las acciones del navegador y los endpoints de
  API de tu conjunto de tests.
further_reading:
- link: https://www.datadoghq.com/blog/test-coverage-monitoring-datadog/
  tag: Blog
  text: Seguimiento de la cobertura de test con Datadog RUM y Synthetic Monitoring
- link: https://www.datadoghq.com/blog/api-test-coverage-monitoring-datadog-synthetics/
  tag: Blog
  text: Mejora de la cobertura de test de API con Datadog Synthetic Monitoring
- link: /synthetics/browser_tests
  tag: Documentación
  text: Más información sobre los tests de navegador de Synthetic
- link: /real_user_monitoring/browser/tracking_user_actions
  tag: Documentación
  text: Más información sobre las acciones de RUM
- link: /real_user_monitoring/session_replay
  tag: Documentación
  text: Más información sobre Session Replay
- link: /api_catalog
  tag: Documentación
  text: Más información sobre el Catálogo de API
title: Cobertura de test
---

## Información general

Explora la cobertura de test de Synthetic del conjunto de tests de las acciones del navegador de RUM o los endpoints de API en la [página **Test Coverage** (Cobertura de test)][1], que puedes encontrar en **Digital Experience** > **Synthetic Monitoring & Testing** (Experiencia digital > Synthetic Monitoring y tests).

{{< tabs >}}
{{% tab "Acciones del navegador" %}}
La página [**Test Coverage** (Cobertura de test)][1] proporciona información útil sobre la cobertura de test general de las [aplicaciones de RUM][2]. Utiliza [datos recopilados del SDK de RUM del navegador][3] y [resultados de tests de navegador de Synthetic][4].

{{< img src="synthetics/test_coverage/browser_actions.png" alt="Página de cobertura de test con una sección de información general, una sección de acciones no sometidas a test y una sección de acciones sometidas a test" style="width:100%" >}}

La página Test Coverage (Cobertura de test) muestra la siguiente información:

- Páginas web más visitadas
- Porcentaje de [acciones de RUM][5] sometidas a test
- Número de acciones sometidas a tests y total de acciones
- Número de tests de navegador que cubren acciones
- Número de interacciones de usuarios reales

## Investigar la cobertura de test de una aplicación o vista

Crea un conjunto de test más completo y preciso identificando acciones no sometidas a tests y vinculándolas con interacciones de usuarios reales en la página Test Coverage (Cobertura de test).

Para identificar áreas de tu aplicación o vistas donde deberías crear tests de navegador:

1. Selecciona una aplicación de RUM en el menú desplegable **Application** (Aplicación) o una vista en el menú desplegable **View Name** (Nombre de vista).
2. Haz clic en **Custom** (Personalizadas) para filtrar los datos por [acciones personalizadas][5], que son únicas y ofrecen resultados de cobertura más precisos que las acciones generadas. Si quieres incluir acciones generadas en el análisis de cobertura de test, selecciona **All Actions** (Todas las acciones).
3. Para identificar vacíos en tu cobertura de test, consulta la información presentada en las siguientes secciones:

   **Test Coverage Overview** (Información general de cobertura de test)
   : Muestra el porcentaje de acciones que se están sometiendo a test, el porcentaje de acciones que se están sometiendo a test ponderado por el número de interacciones de usuarios reales y una lista de vistas principales con su número de sesiones de usuario y de tests de navegador y el porcentaje de acciones que se están sometiendo a test.

   **Untested Actions** (Acciones no sometidas a test)
   : Muestra el número de acciones del usuario no sometidas a test, el total de acciones recopiladas y una lista de las principales acciones con las que más interactúan los usuarios reales, pero que _no_ se están sometiendo a test.

   **Tested Actions** (Acciones sometidas a test)
   : Muestra el número de tests de navegador que cubren acciones del usuario, el número de interacciones de usuarios reales y una lista de las principales acciones con las que estos más interactúan y que _se están_  sometiendo a tests.

La [página Test Coverage (Cobertura de test)][1] rellena las acciones muy utilizadas en tu aplicación y oculta las que se usan con menos frecuencia. Para obtener más información sobre los datos mostrados, consulta [Métricas de Synthetic Monitoring][6].

## Ver repeticiones y añadir tests

Utiliza la información de la [página Test Coverage (Cobertura de test)][1] para responder las siguientes preguntas:

- ¿Qué acciones no se están sometiendo a test en tu aplicación?
- ¿Qué vistas son las más populares para tus usuarios?
- ¿Qué acciones necesitan más tests de navegador?
- ¿Qué porcentaje de tests de navegador cubren acciones del usuario?

### Ver repeticiones de sesiones

Haz clic en el icono de **reproducción** junto a una acción en la tabla **Untested Actions** (Acciones no sometidas a test) para examinar una [grabación de interacción de usuario real][7] en [Session Replay][8]. 

### Examinar acciones

Haz clic en una acción para ver el número de tests, vistas, sesiones y un subconjunto de dichos tests, vistas y sesiones en el que se incluye la acción seleccionada.

{{< img src="synthetics/test_coverage/tested_action.png" alt="Un panel lateral de acciones con pestañas que muestran tests de Synthetic relacionados, vistas de RUM y repeticiones de sesiones" style="width:100%" >}}

Añade las secciones más populares de tu aplicación a un nuevo test de navegador o a uno existente para recibir alertas cuando los recorridos de usuario clave de tu aplicación se vean afectados por un cambio de código.

 Para crear un test, haz clic en **+ New Test** (+ Nuevo test) en la parte superior derecha de la [página Test Coverage (Cobertura de test)][1]. Puedes ejecutar tests [directamente en tus pipelines de CI/CD][9] para asegurarte de que no se produzcan regresiones antes de lanzar el código a la fase de producción.

[1]: https://app.datadoghq.com/synthetics/test-coverage/browser
[2]: /es/synthetics/guide/explore-rum-through-synthetics/
[3]: /es/real_user_monitoring/browser/data_collected/
[4]: /es/synthetics/browser_tests/
[5]: /es/real_user_monitoring/guide/send-rum-custom-actions/
[6]: /es/synthetics/metrics/
[7]: /es/real_user_monitoring/session_replay/browser/
[8]: https://app.datadoghq.com/rum/explorer/
[9]: /es/continuous_testing/

{{% /tab %}}
{{% tab "Endpoints de API" %}}

La [página **Test Coverage** (Cobertura de test)][1] ofrece información procesable sobre la cobertura de test general de tus [endpoints de API][2]. Utiliza [datos recopilados del Catálogo de API][2] y [tramos (spans) de APM][3].

{{< img src="synthetics/test_coverage/api_endpoints.png" alt="Página de cobertura de tests con una sección de información general, una sección de acciones no sometidas a test y una sección de acciones sometidas a test" style="width:100%" >}}

La página Test Coverage (Cobertura de test) muestra la siguiente información:

- La cobertura general de tus endpoints de API
- El porcentaje de endpoints de API sometidos a test
- El número de endpoints de API no sometidos a test con el mayor número de solicitudes, ordenados por tasa de error
- El porcentaje de endpoints de API sometidos a test con tests de API que no se han sometido a test en CI
- El número de endpoints de API no sometidos a test que tienen [monitores de APM][4] 

## Investigar la cobertura de test para los endpoints de API

Mantén un conjunto de tests completo y preciso resolviendo los problemas que provocan que tus tests de Synthetic fallen y tus endpoints de API experimenten un rendimiento deficiente.

Para identificar las áreas en tu conjunto de tests donde debes crear tests de API:

1. Haz clic en la casilla **Untested** (No sometido a test) de la sección **API overall coverage** (Cobertura general de API).
2. Examina el panel lateral del endpoint para ver todos los tests aprobados o fallidos que se crearon para el endpoint. El **mapa de dependencias** muestra los problemas ascendentes que pueden contribuir al bajo rendimiento del endpoint y las dependencias descendentes que se ven afectadas.
3. Para identificar vacíos en tu cobertura de test de API, consulta la información presentada en las siguientes secciones:

   **API Overall Coverage** (Cobertura general de API)
   : Muestra todos los endpoints no sometidos a test dentro de tu contexto de etiquetas (tags).

   **Performance** (Rendimiento)
   : Muestra los endpoints más comprometidos, no sometidos a test y con tasas de error significativas.

   **Tested in the CI** (Sometido a test en CI)
   : Muestra los endpoints que se están sometiendo a test actualmente en tus canalizaciones de CI. 

   **APM Monitors** (Monitores de APM)
   : Muestra los endpoints que no se han sometido a test, pero que tienen monitores activos.

Para obtener más información sobre los datos que se muestran, consulta [Métricas de APM][5].

## Añadir tests

 Para crear un test, haz clic en **+ New Test** (+ Nuevo test) en la parte superior derecha de la [página Test Coverage (Cobertura de test)][1]. Puedes ejecutar tests [directamente en tus pipelines de CI/CD][6] para asegurarte de que no se produzcan regresiones antes de lanzar el código a la fase de producción.

[1]: https://app.datadoghq.com/synthetics/test-coverage/api
[2]: /es/api_catalog/monitor_apis/
[3]: /es/tracing/
[4]: /es/monitors/types/apm
[5]: /es/tracing/metrics/
[6]: /es/continuous_testing/

{{% /tab %}}
{{< /tabs >}}

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/synthetics/test-coverage/browser