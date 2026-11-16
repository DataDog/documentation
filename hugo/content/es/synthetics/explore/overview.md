---
description: Utilice la página de descripción general de Synthetic Monitoring & Testing
  para ver qué pruebas están fallando, dónde se agrupan las fallas y qué puntos de
  conexión y vistas no tienen cobertura de pruebas.
further_reading:
- link: /synthetics/
  tag: Documentación
  text: Synthetic Monitoring
- link: /synthetics/explore/results_explorer/
  tag: Documentación
  text: Explorador de resultados de Synthetic Monitoring & Testing
- link: /synthetics/api_tests/
  tag: Documentación
  text: Pruebas de API
- link: /synthetics/browser_tests/
  tag: Documentación
  text: Prueba de navegador
- link: /synthetics/mobile_app_testing/
  tag: Documentación
  text: Pruebas de aplicaciones móviles
title: Página de descripción general de Synthetic Monitoring & Testing
---
La página de descripción general de Synthetic Monitoring & Testing le ofrece una vista única del estado y la cobertura de sus pruebas Synthetic, ayudándole a responder dos preguntas:

- **¿Qué está fallando?** Identifique qué pruebas están en alerta, vea dónde se concentran las fallas y tome medidas para cada prueba que esté fallando.
- **¿Qué no se ha probado todavía?** Encuentre los puntos de conexión y las vistas con mayor tráfico que no cubra ninguna prueba Synthetic y cree pruebas para ellos.

Utilice esta página como punto de partida para evaluar las fallas y decidir dónde añadir cobertura de pruebas.

{{< img src="synthetics/explore/overview/overview_page.png" alt="La página de descripción general de Synthetic Monitoring & Testing, que muestra la sección Test health con un mapa de fallas agrupado por ubicación y una lista de pruebas en alerta, y la sección Coverage gaps con tarjetas de servicio de puntos de conexión probados y no probados." style="width:100%;" >}}

## Requisitos previos {#prerequisites}

- Para ver los puntos de conexión no probados, habilite [APM][1] para sus servicios.
- Para ver las vistas no probadas, habilite [RUM][2] para sus aplicaciones web o móviles.

La sección [Test Health](#test-health) de la página de descripción general no requiere APM ni RUM.

## Estado de las pruebas {#test-health}

La sección {{< ui >}}Test Health{{< /ui >}} muestra cuántas pruebas están en alerta respecto del total de pruebas. Haga clic en {{< ui >}}View all alerting tests{{< /ui >}} para abrir la lista completa.

### Filtrar pruebas {#filter-tests}

Utilice estos filtros para delimitar el mapa y la lista de pruebas que fallan:

- {{< ui >}}Teams{{< /ui >}}: Muestre las pruebas que pertenecen a uno o más equipos.
- {{< ui >}}Environment{{< /ui >}}: Muestre las pruebas para uno o más entornos.
- {{< ui >}}Tags{{< /ui >}}: Muestre las pruebas con etiquetas específicas.
- {{< ui >}}Creator{{< /ui >}}: Muestre las pruebas creadas por usuarios específicos.

### Encontrar fallas concentradas {#find-concentrated-failures}

El mapa muestra dónde se concentran las fallas. Primero divide las pruebas en {{< ui >}}OK{{< /ui >}} y {{< ui >}}In alert{{< /ui >}}. Cada mosaico representa un grupo y muestra cuántas pruebas contiene. Los mosaicos más grandes contienen más pruebas.

Use el menú {{< ui >}}Group by{{< /ui >}} para elegir cómo el mapa agrupa las pruebas:

- {{< ui >}}Location{{< /ui >}}
- {{< ui >}}Test type{{< /ui >}}
- {{< ui >}}Priority{{< /ui >}}
- {{< ui >}}Failure reason{{< /ui >}}
- {{< ui >}}Environment{{< /ui >}}
- {{< ui >}}Team{{< /ui >}}

Al agrupar por ubicación, una prueba aparece bajo cada ubicación desde la que se ejecuta. Cada mosaico muestra si la prueba está fallando en esa ubicación. Como resultado, los conteos de los mosaicos pueden sumar más que su número total de pruebas.

{{< img src="synthetics/explore/overview/failure_map.png" alt="El mapa de fallas agrupado por ubicación, dividido en las secciones OK e In alert, con mosaicos dimensionados según el número de pruebas en cada ubicación." style="width:100%;" >}}

### Actuar sobre una prueba fallida {#act-on-a-failing-test}

La lista junto al mapa muestra cada prueba en alerta. Cada entrada muestra el nombre de la prueba, la URL o solicitud que verifica y las ubicaciones donde falla.

Haga clic en un mosaico del mapa para filtrar la lista a las pruebas en ese mosaico.

Para cada prueba fallida, puede:

- Haga clic en {{< ui >}}Investigate with Bits{{< /ui >}} para iniciar una investigación asistida por IA de la falla.
- Haga clic en {{< ui >}}View Traces{{< /ui >}} para ver los seguimientos de backend de una prueba de API.
- Haga clic en {{< ui >}}View Failing Step{{< /ui >}} para abrir el paso donde falló una prueba de navegador.

Haga clic en el menú kebab (**⋮**) en una prueba para:

- {{< ui >}}Run test now{{< /ui >}}: Activar una ejecución de prueba fuera de su horario.
- {{< ui >}}Pause scheduling{{< /ui >}}: Detener las ejecuciones programadas para la prueba.
- {{< ui >}}Open in Results Explorer{{< /ui >}}: Ver los resultados de la prueba en [Results Explorer][3].

{{< img src="synthetics/explore/overview/failing_test_actions.png" alt="El mapa de fallas filtrado a una ubicación, junto a la lista de pruebas en alerta para esa ubicación. Investigate With Bits está resaltado en la primera prueba y su menú kebab está abierto con las opciones Run test now, Pause scheduling y Open in Results Explorer." style="width:100%;" >}}

## Brechas de cobertura {#coverage-gaps}

La sección {{< ui >}}Coverage gaps{{< /ui >}} muestra los puntos de conexión y las vistas que ninguna prueba Synthetic cubre. Datadog los clasifica por tráfico, que es el número de solicitudes o vistas durante la última semana. Comience con los elementos en la parte superior de la lista para cubrir primero sus superficies de mayor tráfico.

Use el interruptor en la esquina superior derecha de la sección para cambiar entre {{< ui >}}Endpoints{{< /ui >}} y {{< ui >}}Views{{< /ui >}}. Use la barra de búsqueda para encontrar un servicio, una aplicación, un punto de conexión o una vista específicos.

### Lea la cuadrícula de cobertura {#read-the-coverage-grid}

Cada tarjeta representa un servicio o una aplicación. Cada cuadrado en una tarjeta representa un punto de conexión o una vista:

| Color  | Significado                 |
|--------|-------------------------|
| Azul   | Probado                  |
| Naranja | No probado, alto tráfico  |
| Gris   | No probado, menor tráfico |

El alto tráfico se define de la siguiente manera:

- **Puntos de conexión**: En los 20 servicios principales, Datadog clasifica los puntos de conexión por número de solicitudes durante la última semana. Los puntos de conexión que en conjunto conforman el 90% de las solicitudes son de alto tráfico.
- **Vistas**: En las 20 aplicaciones principales, Datadog clasifica las vistas por número de vistas durante la última semana. Las vistas que en conjunto conforman el 90% de las vistas son de alto tráfico.

{{< img src="synthetics/explore/overview/coverage_grid.png" alt="La sección Coverage gaps en la vista Puntos de conexión con Group by service activado. Las tarjetas de servicio muestran cuadrados naranjas para los puntos de conexión no probados de alto tráfico, cuadrados grises para los puntos de conexión no probados de menor tráfico y cuadrados azules para los puntos de conexión probados. Los puntos de conexión no probados del servicio seleccionado se listan a la izquierda, clasificados por tráfico." style="width:100%;" >}}

### Puntos de conexión no probados {#untested-endpoints}

La vista {{< ui >}}Endpoints{{< /ui >}} lista los puntos de conexión de API no probados de APM. Muestra los 20 servicios principales por tráfico. Cada entrada muestra el método HTTP, la ruta y el servicio.

De forma predeterminada, {{< ui >}}Group by service{{< /ui >}} está activado, por lo que la vista muestra una tarjeta por servicio, con el número de puntos de conexión no probados en cada una. Haga clic en una tarjeta de servicio para filtrar la lista a los puntos de conexión de ese servicio, clasificados por número de solicitudes durante la última semana.

Para crear una prueba para un punto de conexión:

1. Haga clic en una tarjeta de servicio para filtrar la lista a ese servicio.
2. Pase el cursor sobre el punto de conexión en la parte superior de la lista, que tiene la mayor cantidad de solicitudes durante la última semana.
3. Haga clic en {{< ui >}}Create an API Test{{< /ui >}}.
4. En la nueva [prueba de API][4], que se abre con la URL del punto de conexión rellenada previamente, complete la configuración de la prueba y haga clic en {{< ui >}}Save{{< /ui >}}.

{{< img src="synthetics/explore/overview/create_api_test.png" alt="Un punto de conexión no probado en la lista al pasar el cursor, que muestra el botón Create an API Test, junto a la tarjeta de servicio seleccionada en la cuadrícula de cobertura." style="width:100%;" >}}

### Vistas no probadas {#untested-views}

La vista {{< ui >}}Views{{< /ui >}} lista las vistas no probadas de RUM para sus aplicaciones web y móviles. Muestra las 20 aplicaciones principales por número de vistas durante la última semana. Cada entrada muestra el nombre de la vista y la aplicación.

De forma predeterminada, {{< ui >}}Group by application{{< /ui >}} está activado, por lo que la vista muestra una tarjeta por aplicación, con el número de vistas no probadas en cada una.

Para crear una prueba para una vista:

1. Pase el cursor sobre una vista en la lista.
2. Haga clic en {{< ui >}}Create a Browser Test{{< /ui >}} para una vista de aplicación web, o en {{< ui >}}Create a Mobile Test{{< /ui >}} para una vista de aplicación móvil.
3. Configure la nueva prueba, que se abre sin campos rellenados previamente:
   - Para una vista de aplicación web, en la nueva [prueba de navegador][5], ingrese la URL inicial, registre sus pasos y haga clic en {{< ui >}}Save{{< /ui >}}.
   - Para una vista de aplicación móvil, en la nueva [prueba de aplicación móvil][6], seleccione su aplicación, registre sus pasos y haga clic en {{< ui >}}Save{{< /ui >}}.

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/tracing/
[2]: /es/real_user_monitoring/
[3]: /es/synthetics/explore/results_explorer/
[4]: /es/synthetics/api_tests/
[5]: /es/synthetics/browser_tests/
[6]: /es/synthetics/mobile_app_testing/