---
description: Organice las pruebas de Synthetic Monitoring en grupos lógicos.
further_reading:
- link: /synthetics/
  tag: Documentación
  text: Obtenga más información sobre Synthetic Monitoring
- link: /monitors/types/synthetic_monitoring/
  tag: Documentación
  text: Configure el seguimiento de las pruebas Synthetic
- link: /synthetics/bits_testing/
  tag: Documentación
  text: Bits Testing
- link: /synthetics/troubleshooting/
  tag: Documentación
  text: Solución de problemas de Synthetic Monitoring
- link: https://www.datadoghq.com/blog/test-suites/
  tag: Blog
  text: Obtenga información organizada y procesable de entornos de prueba complejos
- link: /synthetics/guide/how-synthetics-monitors-trigger-alerts/
  tag: Guía
  text: Comprender Alerting del seguimiento Synthetic
title: Conjuntos de pruebas
---
## Descripción general {#overview}

Los conjuntos de pruebas de Synthetic Monitoring le permiten organizar múltiples pruebas en una sola colección para simplificar la gestión y la solución de problemas. Agrupe las pruebas por recorrido del usuario, entorno, ubicación, servicio, equipo o cualquier otra dimensión que se ajuste a su flujo de trabajo. Visualice resultados agregados, identifique componentes con errores y comprenda el rendimiento de la aplicación en pruebas relacionadas, todo desde una vista unificada. Configure Alerting a nivel del conjunto de pruebas para recibir una notificación consolidada cuando falle una parte crítica de sus pruebas.

## Características clave {#key-features}

- **Alerting basado en el impacto**: Reciba una alerta consolidada cuando falle una parte crítica del conjunto de pruebas.
- **Visibilidad centralizada**: Visualice todas las pruebas de un conjunto de pruebas y sus resultados en un solo lugar.
- **Gestión simplificada**: Cree y ejecute grupos de pruebas en lugar de gestionar las pruebas individuales por separado.
- **Mantenimiento más sencillo**: Identifique qué pruebas necesitan actualizaciones cuando se realizan cambios en la aplicación.

## Crear un conjunto de pruebas {#create-a-test-suite}

Para crear un conjunto de pruebas de Synthetic Monitoring:
1. En Datadog, navegue a {{< ui >}}Digital Experience{{< /ui >}}.
2. Haga clic en {{< ui >}}New Test Suite{{< /ui >}}.
3. Opcionalmente, navegue a la página de [pruebas de Synthetic Monitoring][1] y haga clic en {{< ui >}}\+ New Suite{{< /ui >}}.

Para que Bits Testing agrupe sus pruebas existentes en conjuntos de pruebas por usted, consulte [Crear conjuntos de pruebas con Bits Testing](#create-test-suites-with-bits-testing).

## Configuración del conjunto de pruebas {#test-suite-configuration}

1. Ingrese un nombre para su conjunto de pruebas (por ejemplo, `Checkout flow` o `API health checks`).
2. Haga clic en {{< ui >}}Add Tests{{< /ui >}} para incluir pruebas de Synthetic Monitoring existentes.  
   Usted puede:
   - **Busque** por nombre o etiqueta.  
   - **Filtre** por tipo de prueba (como Browser, API, Private Location o Mobile).
   - **Seleccione** una o más pruebas para incluir.
3. Haga clic en {{< ui >}}Add Tests{{< /ui >}} para confirmar.
4. _Opcionalmente, elimine pruebas con el ícono Remove Test from Suite junto a cada entrada_.

5. Configure Alerting para el conjunto de pruebas:
{{% site-region region="gov,gov2" %}}
<div class="alert alert-warning">Alerting para conjuntos de pruebas no está disponible en este <a href="/getting_started/site">sitio de Datadog</a> ({{< region-param key="dd_site_name" >}})</div>
{{% /site-region %}}

   - De forma predeterminada, todas las pruebas se marcan como {{< ui >}}Critical{{< /ui >}} y la alerta se activa cuando falla cualquier prueba crítica. 

     **Nota**: Las alertas del conjunto de pruebas son independientes de las alertas de pruebas individuales. Para evitar notificaciones duplicadas, silencie las alertas de las pruebas individuales incluidas en el conjunto de pruebas.
   - Para evitar que determinadas pruebas activen la alerta del conjunto de pruebas, selecciónelas y márquelas como {{< ui >}}Ignored{{< /ui >}}.
   - Ajuste el umbral de alerta para que se active solo cuando falle un porcentaje especificado de pruebas críticas.

   {{< img src="synthetics/test_suites/suite_alerting.png" alt="Página de creación de Alerting para conjuntos de pruebas, con el menú desplegable de Alerting para conjuntos de pruebas expandido. " style="width:80%;">}}

   **Nota**: Para los conjuntos de pruebas existentes, Alerting está habilitado con la configuración predeterminada. Puede modificar la configuración según sea necesario.

6. Configure la [configuración de seguimiento][2] (mensaje de notificación, destinatarios y repetición de notificaciones) de la misma manera que lo haría para una sola prueba.
7. Haga clic en {{< ui >}}Save Suite{{< /ui >}} cuando termine.

{{< img src="synthetics/test_suites/test_suite_creation_2.png" alt="Página de creación del conjunto de pruebas de Synthetic Monitoring" style="width:80%;">}}

## Cree conjuntos de pruebas con Bits Testing {#create-test-suites-with-bits-testing}

{{% site-region region="gov,gov2" %}}
<div class="alert alert-warning">La creación de conjuntos de pruebas con Bits Testing no está disponible en este <a href="/getting_started/site">sitio de Datadog</a> ({{< region-param key="dd_site_name" >}}).</div>
{{% /site-region %}}

[Bits Testing][4] puede agrupar sus pruebas Synthetic existentes en conjuntos de pruebas. Describa en lenguaje sencillo cómo desea agrupar sus pruebas y Bits Testing le propondrá conjuntos de pruebas que coincidan con su descripción. Revise cada conjunto de pruebas y elija cuáles crear. Esto es independiente de los conjuntos de pruebas que genera un trabajo de descubrimiento de Bits Testing, los cuales contienen pruebas nuevas.

Puede pedirle a Bits Testing:

- **Un conjunto de pruebas**: describa lo que representa el conjunto de pruebas, por ejemplo, "Cree un conjunto de pruebas que haga un seguimiento del flujo de pago".
- **Varios conjuntos de pruebas a la vez**: describa cómo dividir sus pruebas, por ejemplo, un conjunto de pruebas por equipo, por servicio, por entorno o por combinación de servicio y entorno.

Para crear conjuntos de pruebas con Bits Testing:

1. En Synthetic Monitoring & Testing, haga clic en {{< ui >}}Bits Testing{{< /ui >}} en la navegación superior.
2. Describa cómo desea que se agrupen sus pruebas, por ejemplo, `Create a test suite for each one of my teams`. También puede seleccionar uno de los prompts sugeridos.
3. Revise los conjuntos de pruebas que Bits Testing planea generar y, luego, haga clic en el botón para generarlos (por ejemplo, {{< ui >}}Generate 5 Suites{{< /ui >}} o {{< ui >}}Generate Suite{{< /ui >}} para un solo conjunto de pruebas).

   {{< img src="synthetics/test_suites/bits_testing_multiple_suites.png" alt="Respuesta de Bits Testing a una solicitud de un conjunto de pruebas por equipo, que enumera cinco prompts de conjuntos de pruebas y un botón Generate 5 Suites." style="width:100%;" >}}

4. En el panel {{< ui >}}Review suggested suites{{< /ui >}}, seleccione cada conjunto de pruebas de la lista para ver su descripción y sus pruebas. Para cada conjunto de pruebas, puede:
   - Haga clic en {{< ui >}}Add Tests{{< /ui >}} para agregar pruebas, o seleccione pruebas y haga clic en {{< ui >}}Remove From Suite{{< /ui >}} para eliminarlas.
   - Establezca el valor {{< ui >}}Suite Alerting{{< /ui >}} de cada prueba. De forma predeterminada, todas las pruebas están marcadas como {{< ui >}}Critical{{< /ui >}}. Para obtener más detalles, consulte [Configuración del conjunto de pruebas](#test-suite-configuration).
   - Haga clic en {{< ui >}}Exclude Suite{{< /ui >}} para omitir la creación de ese conjunto de pruebas.

   {{< img src="synthetics/test_suites/bits_testing_review_suites.png" alt="El panel Review suggested suites con cinco conjuntos de pruebas generados, la descripción de uno de ellos y sus pruebas con Suite Alerting establecido en Critical." style="width:100%;" >}}

5. Haga clic en el botón para crear (por ejemplo, {{< ui >}}Create 5 Suites{{< /ui >}}).
6. Haga clic en {{< ui >}}View Suites{{< /ui >}} para abrir sus nuevos conjuntos de pruebas.
7. Abra cada conjunto de pruebas y agregue los destinatarios de las notificaciones en su [configuración de seguimiento][2]; luego, guarde el conjunto de pruebas. Bits Testing no agrega destinatarios a los conjuntos de pruebas que crea.

Los conjuntos de pruebas que crea Bits Testing funcionan como los que usted crea manualmente e incluyen Alerting a nivel del conjunto de pruebas y un objetivo de nivel de servicio generado automáticamente. Consulte la sección [objetivos de nivel de servicio](#service-level-objectives).

### Escriba un prompt para Bits Testing {#write-a-prompt-for-bits-testing}

Describa el área comercial u operativa de la que desea hacer un seguimiento, no solo los detalles técnicos. Por ejemplo:

- `Create a suite for the checkout journey`
- `Create separate suites for each team and environment`
- `Group the tests that validate authentication`
- `Create one suite for each production service`

Su prompt puede describir cualquier agrupación, como un recorrido del usuario, servicio, equipo, entorno, capacidad de plataforma compartida o validación de lanzamiento.

Los conjuntos de pruebas que propone Bits Testing dependen de la información de sus pruebas existentes y de la claridad con que describa la agrupación. Revise cada conjunto de pruebas propuesto antes de crearlo.

## Objetivos de nivel de servicio {#service-level-objectives}

Cuando crea un conjunto de pruebas, Datadog genera automáticamente un objetivo de nivel de servicio (SLO) para él, sin necesidad de configuración. De forma predeterminada, el SLO utiliza una ventana móvil de 7 días con un objetivo del 99.9 %.

<div class="alert alert-info">Los permisos del conjunto de pruebas (visualizar y editar) se aplican al conjunto en sí y son independientes de los permisos del SLO generado automáticamente. El acceso al SLO está determinado por los <a href="/service_level_objectives/#permissions">permisos de producto de SLO</a> del usuario. Un usuario sin permisos de edición del conjunto de pruebas aún puede editar el SLO generado automáticamente si tiene permisos de edición de SLO.</div>

El panel de SLO en la página de detalles del conjunto de pruebas muestra el estado actual del SLO y el presupuesto de error. Con esta vista, usted puede:

- **[Create alert](#create-an-alert)** para configurar alertas cuando el rendimiento del SLO disminuya significativamente. Cuando ya existe una alerta, pase el cursor sobre el indicador de alerta para ver detalles adicionales.
- **[View details](#view-details)** haciendo clic en el ícono del ojo para abrir la página completa de detalles del SLO.
- **[View contributors](#contributors)** para visualizar qué pruebas están consumiendo el presupuesto de error.
- **[Edit the SLO](#edit-the-service-level-objective)** haciendo clic en el {{< img src="icons/pencil-mdi.svg" inline="true" style="width:16px;">}} icono de lápiz.

{{< img src="synthetics/test_suites/test_suite_slo_panel_v2.png" alt="Página de detalles del conjunto de pruebas que muestra el panel de SLO con una ventana móvil de 7 días y el presupuesto de error, la sección Primary Contributors con las pruebas que más contribuyen, la línea de tiempo de Global Uptime y la sección Test Runs." style="width:100%;">}}

### Crear una alerta {#create-an-alert}

Haga clic en {{< ui >}}Create alert{{< /ui >}} en el panel de detalles del SLO para abrir el formulario de configuración de SLO Monitor, donde puede establecer condiciones de alerta y ajustes de notificación.

{{< img src="synthetics/test_suites/test_suite_slo_create_alert.png" alt="Formulario de creación de SLO Monitor con condiciones de alerta y ajustes de notificación." style="width:80%;">}}

### Visualizar detalles {#view-details}

Haga clic en el icono de ojo para abrir la página completa de detalles del SLO. Desde esta página, puede visualizar el estado del SLO, el consumo del presupuesto de error, la tasa de consumo y las series temporales de métricas.

{{< img src="synthetics/test_suites/test_suite_slo_details.png" alt="Página completa de detalles del SLO para un conjunto de pruebas, que muestra el estado del SLO, el consumo del presupuesto de error, la tasa de consumo y las series temporales de métricas." style="width:90%;">}}

### Contribuyentes {#contributors}

La sección de contribuyentes destaca las pruebas con el mayor impacto en el consumo del presupuesto de error:

- **Número total de pruebas críticas**: El número total de pruebas críticas en el conjunto de pruebas.
- **Presupuesto de error consumido por**: El número de pruebas que consumieron presupuesto de error.
- **Los 3 principales contribuyentes consumieron**: Las tres pruebas principales por porcentaje de impacto, según cuánto tiempo estuvo cada prueba en estado de alerta mientras el conjunto de pruebas estaba en alerta.

{{< img src="synthetics/test_suites/test_suite_slo_contributors.png" alt="Sección Primary Contributors que muestra el total de pruebas críticas, el presupuesto de error consumido y los tres principales contribuyentes por porcentaje de impacto." style="width:90%;">}}

### Editar el objetivo de nivel de servicio {#edit-the-service-level-objective}

Para actualizar la ventana de tiempo del SLO (por ejemplo, a 30 días) o el objetivo, haga clic en el {{< img src="icons/pencil-mdi.svg" inline="true" style="width:16px;">}} icono de lápiz en el panel del SLO. Debido a que este SLO se crea automáticamente a partir de un conjunto de pruebas, solo puede editar la ventana de tiempo, el objetivo y los umbrales de advertencia.

   {{< img src="synthetics/test_suites/test_suite_slo_edit.png" alt="Página de edición de SLO para un conjunto de pruebas, que muestra los campos de objetivo y ventana de tiempo." style="width:90%;">}}

## Visualizar y administrar conjuntos de pruebas {#view-and-manage-test-suites}

Después de crear su conjunto de pruebas, este aparece en la pestaña {{< ui >}}Suites{{< /ui >}} en la página de [Pruebas de Synthetic Monitoring][1]. También puede acceder a los conjuntos de pruebas desde {{< ui >}}Digital Experience{{< /ui >}} > {{< ui >}}Test Suites{{< /ui >}}.

Para aplicar un [Tiempo de inactividad programado][3] a uno o más conjuntos de pruebas, selecciónelos usando las casillas de verificación y haga clic en {{< ui >}}Add to Downtime{{< /ui >}}.

Al visualizar un conjunto de pruebas, hay tres pestañas disponibles:

- {{< ui >}}Tests in the Suite{{< /ui >}}: Enumera todas las pruebas incluidas en el conjunto de pruebas.
- {{< ui >}}Test Runs{{< /ui >}}: Muestra métricas globales de tiempo de actividad y ejecuciones de pruebas relacionadas.
- {{< ui >}}Attributes{{< /ui >}}: Muestra atributos del conjunto de pruebas como `team`, seguimientos y quién creó el conjunto de pruebas.

**Nota**: Las ejecuciones de prueba aparecen en el conjunto de pruebas solo a partir de la fecha en que se agregó la prueba. Para visualizar resultados anteriores, verifique la página de la prueba individual. Si cambia el nombre de una prueba, las ejecuciones anteriores permanecen listadas bajo el nombre original. Se pueden agregar un máximo de 300 pruebas por conjunto de pruebas.

{{< img src="synthetics/test_suites/test_suite_summary_2.png" alt="Página de resumen del conjunto de pruebas de Synthetic Monitoring" style="width:100%;">}}

## Ejecutar un conjunto de pruebas {#run-a-test-suite}

Puede activar ejecuciones de prueba de dos maneras:

- [Ejecutar todas las pruebas del conjunto de pruebas](#run-all-tests-in-the-suite)
- [Ejecutar pruebas seleccionadas](#run-selected-tests)

### Ejecutar todas las pruebas del conjunto de pruebas {#run-all-tests-in-the-suite}

Desde la página de detalles del conjunto de pruebas, haga clic en {{< ui >}}Run Suite Now{{< /ui >}} en la parte superior derecha para activar todas las pruebas del conjunto de pruebas.

{{< img src="synthetics/test_suites/run_suite_now.png" alt="La página de detalles del conjunto de pruebas con el botón Run Suite Now en la parte superior derecha." style="width:100%;" >}}

### Ejecutar pruebas seleccionadas {#run-selected-tests}

Para ejecutar un subconjunto de pruebas:

1. Navegue al conjunto de pruebas y haga clic en la pestaña {{< ui >}}Tests in the Suite{{< /ui >}}.
2. Seleccione las pruebas que desea ejecutar usando las casillas de verificación.
3. Haga clic en {{< ui >}}Run Tests Now{{< /ui >}}.

{{< img src="synthetics/test_suites/run_tests_now.png" alt="La pestaña Tests in the Suite con pruebas seleccionadas en bloque y el botón Run Tests Now visible." style="width:100%;" >}}

**Nota**: Puede ejecutar un máximo de 50 pruebas a la vez con {{< ui >}}Run Tests Now{{< /ui >}}.

## Solución de problemas {#troubleshooting}

Si algunas pruebas no aparecen en un conjunto de pruebas:

- Verifique que las pruebas estén activas y no eliminadas.
- Confirme que tiene los permisos necesarios para visualizar esas pruebas.
- Actualice los filtros o borre los términos de búsqueda al agregar pruebas.

Si los resultados de la ejecución parecen incompletos:

- Verifique la frecuencia de la ejecución de prueba y la actividad reciente.
- Verifique si hay discrepancias de etiquetas o ubicaciones que podrían filtrar las ejecuciones.
- Vuelva a guardar el conjunto de pruebas para actualizar la asociación con sus pruebas.

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/synthetics/tests
[2]: /es/synthetics/notifications/
[3]: /es/synthetics/platform/downtime/
[4]: /es/synthetics/bits_testing/