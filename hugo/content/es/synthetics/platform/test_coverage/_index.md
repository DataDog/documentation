---
aliases:
- /es/synthetics/dashboards/testing_coverage
- /es/synthetics/test_coverage
description: Evalúe la cobertura de su suite de pruebas de las acciones del navegador.
further_reading:
- link: https://www.datadoghq.com/blog/test-coverage-monitoring-datadog/
  tag: Blog
  text: Realice un seguimiento de su cobertura de pruebas con Datadog RUM y Synthetic
    Monitoring
- link: /synthetics/browser_tests
  tag: Documentación
  text: Obtenga más información sobre las pruebas Synthetic de navegador
- link: /real_user_monitoring/application_monitoring/browser/tracking_user_actions
  tag: Documentación
  text: Obtenga más información sobre las acciones de RUM
- link: /real_user_monitoring/session_replay
  tag: Documentación
  text: Más información sobre Session Replay
title: Cobertura de pruebas
---
## Descripción general {#overview}

Explore la cobertura de la prueba Synthetic de su suite de pruebas de las acciones del navegador RUM en la [{{< ui >}}Test Coverage{{< /ui >}}página][1], que puede encontrar en {{< ui >}}Digital Experience{{< /ui >}} > {{< ui >}}Synthetic Monitoring & Testing{{< /ui >}}.

La [{{< ui >}}Test Coverage{{< /ui >}}página][1] proporciona información útil sobre la cobertura de pruebas general de sus [aplicaciones RUM][2]. Utiliza [datos recopilados del SDK de RUM para navegador][3] y [resultados de las pruebas Synthetic de navegador][4].

{{< img src="synthetics/test_coverage/browser_actions.png" alt="Página de Cobertura de pruebas con una sección de Resumen, una sección de Acciones no probadas y una sección de Acciones probadas" style="width:100%" >}}

La página de Cobertura de pruebas presenta la siguiente información:

- Las páginas web más visitadas
- El porcentaje de [acciones de RUM][5] probadas
- El número de acciones probadas y totales
- El número de pruebas de navegador que cubren las acciones
- El número de interacciones de usuarios reales 

## Investigue la cobertura de pruebas para una aplicación o vista {#investigate-test-coverage-for-an-application-or-view}

Cree una suite de pruebas más completa y precisa identificando las acciones no probadas y vinculándolas con las interacciones de usuarios reales en la página de Cobertura de pruebas. 

Para identificar áreas en su aplicación o vistas donde debería crear pruebas de navegador:

1. Seleccione una aplicación RUM del menú desplegable {{< ui >}}Application{{< /ui >}} o una vista del menú desplegable {{< ui >}}View Name{{< /ui >}}. 
2. Haga clic en {{< ui >}}Custom{{< /ui >}} para filtrar los datos de [acciones personalizadas][5], las cuales son únicas y ofrecen resultados de cobertura más precisos en comparación con las acciones generadas. Si desea incluir acciones generadas en el análisis de cobertura de pruebas, seleccione {{< ui >}}All Actions{{< /ui >}}.
3. Identifique las brechas en su cobertura de pruebas examinando la información presentada en las siguientes secciones: 

   {{< ui >}}Test Coverage Overview{{< /ui >}} 
   : Muestra el porcentaje de acciones que se están probando, el porcentaje de acciones que se están probando ponderado por el número de interacciones reales de los usuarios, y una lista de las vistas principales con sus conteos de sesiones de usuario y pruebas de navegador, además del porcentaje de acciones que se están probando. 

   {{< ui >}}Untested Actions{{< /ui >}}
   : Muestra el número de acciones de usuario no probadas, el número total de acciones recopiladas y una lista de las acciones principales con las que más interactúan los usuarios reales pero que _no_ se están probando.

   {{< ui >}}Tested Actions{{< /ui >}}
   : Muestra el número de pruebas de navegador que cubren las acciones de usuario, el número de interacciones reales de usuario y una lista de las acciones principales con las que más interactúan los usuarios reales y que _se están probando_. 

La [página de Cobertura de pruebas][1] muestra las acciones que se utilizan ampliamente y oculta las acciones que se usan con menos frecuencia en su aplicación. Para obtener más información sobre los datos mostrados, consulte [Synthetic Monitoring métricas][6].

## Visualizar reproducciones y agregar pruebas {#view-replays-and-add-tests}

Utilice la información de la [página de Cobertura de pruebas][1] para responder a las siguientes preguntas:

- ¿Qué acciones no se están probando en su aplicación?
- ¿Qué visualizaciones son las más populares para sus usuarios? 
- ¿Qué acciones necesitan más pruebas de navegador?
- ¿Qué porcentaje de pruebas de navegador cubren las acciones de usuario? 

### Visualizar reproducciones de sesiones {#view-session-replays}

Haga clic en el icono {{< ui >}}Play{{< /ui >}} junto a una acción en la tabla {{< ui >}}Untested Actions{{< /ui >}} para examinar una [grabación de la interacción real del usuario][7] en [Session Replay][8]. 

### Examinar acciones {#examine-actions}

Haga clic en una acción para acceder al número de pruebas, vistas, sesiones y un subconjunto de estas pruebas, vistas y sesiones que incluyen la acción seleccionada. 

{{< img src="synthetics/test_coverage/tested_action.png" alt="Un panel lateral de acciones con pestañas que muestran pruebas Synthetic, vistas de RUM y reproducciones de sesiones relacionadas" style="width:100%" >}}

Agregue las secciones más populares de su aplicación a una prueba de navegador nueva o existente para que se le avise cuando los recorridos clave de los usuarios en su aplicación se vean afectados negativamente por un cambio de código.

 Para crear una prueba, haga clic en {{< ui >}}+ New Test{{< /ui >}} en la parte superior derecha de la [página de cobertura de pruebas][1]. Puede ejecutar pruebas [directamente en sus canalizaciones de CI/CD][9] para asegurarse de que no ocurran regresiones antes de lanzar código en producción.  

[1]: https://app.datadoghq.com/synthetics/test-coverage/browser
[2]: /es/synthetics/guide/explore-rum-through-synthetics/
[3]: /es/real_user_monitoring/application_monitoring/browser/data_collected/
[4]: /es/synthetics/browser_tests/
[5]: /es/real_user_monitoring/guide/send-rum-custom-actions/
[6]: /es/synthetics/metrics/
[7]: /es/session_replay/
[8]: https://app.datadoghq.com/rum/explorer/
[9]: /es/continuous_testing/

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/synthetics/test-coverage/browser