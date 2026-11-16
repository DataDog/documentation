---
aliases:
- /es/journey_monitoring/guide/
- /es/journey_monitoring/guide/configuring_journeys/
description: Defina recorridos y agregue cobertura de Product Analytics, RUM y Synthetic.
further_reading:
- link: /journey_monitoring/
  tag: Documentación
  text: Obtenga información sobre Journey Monitoring
- link: /journey_monitoring/details_report/
  tag: Documentación
  text: Obtenga información sobre el informe de detalles del recorrido.
title: Configurar recorridos
---
## Descripción general {#overview}

Utilice esta página para configurar recorridos que representan flujos importantes de los usuarios y muestran su estado.

Configurar un [recorrido basado en eventos][28] tiene tres pasos:

1. Cree un recorrido y defina su flujo de usuario.
2. Agregue [operaciones de Real User Monitoring (RUM)][21] que representen pasos técnicos críticos.
3. Agregue [pruebas Synthetic][24] que cubran el recorrido.

Después de completar estos pasos, valide los [indicadores clave de rendimiento (KPI)][26], las operaciones, los [objetivos de nivel de servicio (SLO)][25], las pruebas y las [variantes][3] del recorrido.

En una [configuración solo de Synthetics][29], los [conjuntos de pruebas][14] aparecen automáticamente como recorridos.

## Cuándo usar Journey Monitoring {#when-to-use-journey-monitoring}

Journey Monitoring combina el comportamiento del usuario y la salud técnica para un flujo de extremo a extremo. Puede servir como el lugar principal para hacer un seguimiento y solucionar problemas de un flujo que, de otro modo, requeriría configuraciones separadas en varios productos.

Las alternativas comunes incluyen:

- **RUM**:
  - [Embudos en el RUM Session Explorer][30] o widgets de embudo basados en eventos de RUM
  - Widgets que rastrean la actividad del usuario, como clics en botones o vistas de página
  - Métricas o acciones personalizadas que miden el volumen del flujo, el tiempo hasta la finalización o los recorridos completados
  - [Vitals personalizados][31] que representan pasos técnicos clave, los cuales las operaciones de RUM pueden representar dentro de un recorrido
- **Synthetic Monitoring & Testing**: Múltiples pruebas que cubren el mismo flujo pero no están organizadas en el conjunto de pruebas de un recorrido
- **[Product Analytics][22]**: Embudos, rutas de recorrido u otras visualizaciones que rastrean el comportamiento a través de un flujo de extremo a extremo

Journey Monitoring utiliza Product Analytics para comprender el comportamiento y la experiencia del usuario, RUM para evaluar el rendimiento y la disponibilidad, y pruebas Synthetic para detectar regresiones y medir el [tiempo de actividad del recorrido][17].

## Antes de comenzar {#before-you-begin}

Revise los [requisitos previos de Journey Monitoring][1]. Journey Monitoring requiere una prueba activa o una suscripción paga a al menos un producto compatible.

Diferentes pasos de configuración requieren diferentes productos:

- Definir un recorrido con eventos de acción o visualización requiere acceso a RUM y a una versión preliminar, una prueba o una suscripción paga de Product Analytics.
- Agregar datos de operaciones de RUM requiere una prueba activa o una suscripción paga a [RUM without Limits&trade;][4].
- Agregar cobertura de Synthetic requiere una prueba activa o una suscripción paga a [Synthetic Browser Tests][12] o [Synthetic Mobile Tests][13].

### Permisos y roles {#permissions-and-roles}

Journey Monitoring utiliza activos de varios productos, por lo que el acceso a los recorridos y a los activos vinculados depende de los permisos de cada producto. Consulte [roles y permisos de Journey Monitoring][15] para conocer los requisitos de acceso.

Para crear o editar recorridos:

- Su rol debe tener acceso de escritura a Journey Monitoring.
- La creación de un conjunto de pruebas Synthetic para un recorrido también requiere acceso de escritura a Synthetic Monitoring. Sin esto, Datadog crea el recorrido sin un conjunto de pruebas. Agréguelo más tarde con el acceso requerido.

## Paso 1: Crear un recorrido {#step-1-create-a-journey}

### RUM y Product Analytics {#rum-and-product-analytics}

Utilice eventos de acción o visualización de RUM para definir un recorrido basado en eventos.

#### Elija un flujo de usuario {#choose-a-user-flow}

Cree recorridos para flujos de usuario críticos que respalden un resultado comercial. Un recorrido debe abarcar varios pasos y representar una acción significativa.

Siga estas pautas para mantener cada recorrido enfocado:

**Hacer:**

- Cree un recorrido independiente para cada flujo de usuario distinto.
- Utilice eventos de inicio y fin compartidos para revelar [recorridos ascendentes y descendentes][16].
- Utilice un recorrido de alto nivel y filtros de atributos para comparar cohortes, como usuarios en Estados Unidos y el Reino Unido.

**No hacer:**

- Cree un recorrido para una interacción única y breve. Utilice una operación RUM en su lugar.
- Combine varios flujos de usuario distintos en un solo recorrido.
- Cree recorridos duplicados que solo difieran en el valor de un atributo, como el país.

#### Elija un método de creación {#choose-a-creation-method}

Cree un recorrido manualmente cuando sepa de qué flujo de usuario quiere hacer un seguimiento. Comience con un [recorrido sugerido][2] para utilizar un flujo que Datadog identifica a partir de la actividad del usuario.

Para crear un recorrido:

1. Vaya a **Digital Experience > Journey Monitoring**.
2. Haga clic en **New Journey**, o seleccione un recorrido sugerido del mapa o catálogo.
3. Seleccione una aplicación frontend.
4. Ingrese un nombre de recorrido.
5. Seleccione uno o más eventos de inicio.
6. Seleccione uno o más eventos de finalización.
7. Opcionalmente, agregue una descripción, filtros de atributos, propiedad del equipo, etiquetas o variantes.
8. Haga clic en **Save Journey**.

Los recorridos sugeridos incluyen un nombre, una descripción, un evento de inicio y un evento de finalización preconfigurados. Revise estos campos antes de guardar. Después de guardar el recorrido, Datadog abre su [informe de detalles][5].

#### Defina las condiciones de inicio y finalización {#define-start-and-end-conditions}

Seleccione eventos de acción, eventos de visualización o ambos. El [embudo][27] se actualiza según los eventos seleccionados y muestra el volumen, la tasa de conversión y el tiempo promedio de conversión para cada paso.

##### Múltiples eventos de inicio y finalización {#multiple-start-and-end-events}

Múltiples eventos de inicio pueden representar varios puntos de entrada al mismo flujo de usuario. Múltiples eventos de finalización pueden representar varias conclusiones válidas.

Cada evento adicional amplía la definición del recorrido. Un gran número de eventos de inicio o fin puede hacer que el contexto del recorrido no esté claro y que sus KPI sean menos precisos.

##### Filtros de atributos {#attribute-filters}

Los atributos a nivel de recorrido incluyen o excluyen cohortes amplias, como los usuarios internos. Los atributos en las condiciones individuales de inicio y fin restringen aún más el flujo.

Incluir filtros de atributos importantes en el nombre o la descripción del recorrido ayuda a los usuarios a comprender el contexto de sus KPI.

##### Rutas de referencia {#referrer-paths}

Las rutas de referencia limitan un evento de inicio o fin a las instancias que siguen a una vista de página específica. Ayudan a distinguir un evento que aparece en varios contextos de recorrido de la instancia que pertenece a un recorrido en particular.

##### Seleccione eventos de inicio y finalización significativos {#select-meaningful-start-and-end-events}

Un evento de inicio debe comenzar claramente el recorrido y representar una acción intencional del usuario.

<div class="alert alert-danger">Elija un evento de fin que confirme que el recorrido está completo. Hacer clic en <strong>Pay</strong> o <strong>Submit</strong> no confirma que la acción se haya completado correctamente. Si un evento posterior confirma el éxito, utilice ese evento para que los intentos fallidos no se cuenten como recorridos completados.</div>

Por ejemplo:

- **Recorrido de inicio de sesión**
  - Inicio: El usuario abre la página de inicio de sesión.
  - Fin: La aplicación redirige al usuario a la pantalla de inicio.
  - Evite terminar en: El usuario hace clic en **Iniciar sesión**.
- **Recorrido de pago**
  - Inicio: El usuario abre la página de pago.
  - Fin: La aplicación muestra un modal de confirmación de pago.
  - Evite terminar en: El usuario hace clic en **Pagar**.
- **Recorrido de envío de formulario**
  - Inicio: El usuario abre el formulario.
  - Fin: La aplicación muestra un mensaje de confirmación de envío.
  - Evite terminar en: El usuario hace clic en **Enviar**.

#### Agregar variantes {#add-variants}

Una variante representa una secuencia común de eventos intermedios entre el inicio y el final del recorrido. Agregue variantes para comparar los KPI y los datos de telemetría en diferentes rutas.

#### Agregar etiquetas y asignar responsables {#add-tags-and-ownership}

Las etiquetas y la asignación de equipos responsables ayudan a los equipos a encontrar recorridos relevantes y filtrar el [catálogo de recorridos][20]. Una convención de nombres y etiquetas coherente mantiene los recorridos organizados a medida que crece el catálogo.

### Solo Synthetics {#synthetics-only}

Solo con Synthetic Monitoring & Testing, los conjuntos de pruebas aparecen automáticamente como recorridos. Cree otro conjunto de pruebas para agregar un recorrido.

## Paso 2: Agregue operaciones de RUM {#step-2-add-rum-operations}

Las operaciones de RUM miden la disponibilidad y la latencia de las acciones críticas en el recorrido. Úselas para investigar si el rendimiento técnico contribuye al abandono de los usuarios.

Los SLO en operaciones vinculadas contribuyen al [estado del recorrido][6].

### Revisar operaciones coincidentes {#review-matching-operations}

Datadog utiliza la correlación temporal para identificar las operaciones de RUM existentes que pueden ser parte del recorrido. Estas operaciones aparecen como **Matching** en el informe de detalles.

Vincule una operación solo si los usuarios la encuentran mientras completan el recorrido.

{{< img src="journey_monitoring/journey-monitoring-matching-operations.png" alt="El informe de detalles de Journey Monitoring muestra operaciones de RUM coincidentes según el tiempo con ejecuciones, tasa de éxito, latencia y opciones de creación de SLO." style="width:100%;" >}}

### Cree operaciones {#create-operations}

Si ninguna operación coincidente representa una acción crítica, elija un método de instrumentación:

- **API del SDK de RUM**: [Instrumente la operación en el código de su aplicación frontend][10] e informe explícitamente cuándo comienza, tiene éxito o falla. Este método proporciona un control preciso sobre el ciclo de vida de la operación, pero requiere cambios en el código.
- **Datadog UI**: [Cree la operación en Datadog][8] seleccionando las condiciones de inicio, éxito y falla a partir de los eventos de RUM ingeridos. Puede crearla desde el catálogo de operaciones o desde la tabla Operations en el informe de detalles del recorrido. Este método no requiere cambios en el código, pero captura las fallas con menos precisión porque depende de eventos que Datadog ya recopila.

La [`create_rum_operation` herramienta en Datadog MCP Server][32] y la [RUM Operations API][9] también crean operaciones configuradas en la interfaz de usuario a partir de condiciones de eventos de RUM. Datadog vincula automáticamente las operaciones creadas desde un informe de detalles del recorrido. Para las operaciones creadas en otro lugar, vincule la operación al recorrido después de crearla.

### Administrar operaciones {#manage-operations}

Seleccione **Manage Operations** para agregar o eliminar operaciones del recorrido.

Vincular una operación:

- Identifica la operación como parte de la ruta crítica del recorrido
- Agrega los SLO de la operación al estado del recorrido
- Crea un SLO de disponibilidad con un objetivo del 99 % si la operación aún no tiene al menos un SLO

### Administrar SLO de operación {#manage-operation-slos}

Cada operación vinculada requiere al menos un SLO para que Datadog evalúe su contribución al recorrido. Una operación puede tener SLOs de disponibilidad, SLOs de latencia o ambos. Para obtener orientación, consulte [Mejores prácticas para crear SLO en operaciones de RUM][11].

<div class="alert alert-tip">
Comience con la operación que tenga el mayor efecto en la conversión del recorrido. Agregue más operaciones según sea necesario.
<ul>
<li>Para un recorrido de inicio de sesión de usuario, haga un seguimiento de la acción de inicio de sesión final para verificar que las credenciales válidas resulten en una autenticación exitosa.</li>
<li>Para un recorrido de pago de comercio electrónico, haga un seguimiento de la acción de pago porque un pago fallido impide que el usuario complete el recorrido.</li>
</ul>
</div>

## Paso 3: Agregue cobertura de pruebas Synthetic {#step-3-add-synthetic-test-coverage}

Las pruebas Synthetic proporcionan cobertura técnica para las rutas críticas del recorrido. Las fallas en las pruebas pueden indicar regresiones que afectan a los usuarios, y las pruebas de cobertura determinan el tiempo de actividad del recorrido.

Cuando crea un recorrido basado en eventos con acceso de escritura a Synthetic Monitoring, Datadog crea un conjunto de pruebas y agrega las pruebas existentes que cubren el recorrido. El conjunto de pruebas incluye un SLO de tiempo de actividad editable con un objetivo predeterminado del 99,9 %. Sin acceso de escritura a Synthetic Monitoring, Datadog crea el recorrido sin un conjunto de pruebas.

Para recorridos solo de Synthetics, el conjunto de pruebas existente define el recorrido. La sección Synthetic Monitoring & Testing en el informe de detalles del recorrido describe el rendimiento y el tiempo de actividad del conjunto de pruebas.

### Revisar pruebas coincidentes {#review-matching-tests}

Para recorridos basados en eventos, Datadog utiliza datos de RUM para identificar pruebas Synthetic que cubren el recorrido. Estas pruebas coincidentes aparecen en el informe de detalles del recorrido y en la página del conjunto de pruebas.

- Revise cada prueba coincidente.
- Agregar pruebas que cubran una ruta crítica del recorrido.

{{< img src="journey_monitoring/journey-monitoring-matching-tests.png" alt="El informe de detalles de Journey Monitoring que muestra las pruebas Synthetic coincidentes con el estado de alerta y el tiempo de actividad." style="width:100%;" >}}

### Crear pruebas {#create-tests}

Para crear cobertura, cree una prueba de navegador o una prueba de aplicación móvil, luego agréguela al conjunto de pruebas del recorrido.

Cuando ninguna prueba Synthetic cubre un recorrido, [Bits Testing][18] puede generar pruebas que lo cubran.

### Administrar pruebas {#manage-tests}

Seleccione **Manage Tests** para agregar o eliminar pruebas del conjunto de pruebas del recorrido. Agregue pruebas que cubran el recorrido cuando el conjunto esté vacío o cuando Datadog identifique nuevas pruebas coincidentes.

### Mantenga la cobertura {#maintain-coverage}

- Los cambios en las condiciones de inicio o fin de un recorrido pueden afectar qué pruebas lo cubren. Revise la cobertura después de cambiar estas condiciones.
- Un recorrido tiene cobertura Synthetic e informa el tiempo de actividad cuando su conjunto de pruebas contiene al menos una prueba que lo cubre.
- Elimine las pruebas que ya no cubren el recorrido y agregue nuevas pruebas coincidentes a medida que la aplicación cambia.

La gestión de la cobertura modifica las pruebas Synthetic, por lo que requiere acceso de escritura a Synthetic Monitoring y una política de restricción en el conjunto de pruebas.

## Validar un recorrido {#validate-a-journey}

Después de configurar un recorrido, verifique que:

- Sus eventos de inicio y fin representen el flujo de usuario previsto.
- Sus KPI se alineen con el tráfico y el comportamiento del usuario esperados.
- Sus variantes representen rutas esperadas distintas.
- Cada operación RUM vinculada representa una acción crítica y tiene al menos un SLO.
- Su conjunto de pruebas contiene pruebas que cubren rutas críticas.
- Sus etiquetas y la propiedad del equipo ayudan a los usuarios a encontrar el recorrido en el catálogo.

## Mantener un recorrido {#maintain-a-journey}

Después de cambiar los eventos de inicio o fin de un recorrido, revise sus variantes, operaciones coincidentes, cobertura Synthetic y KPI. Utilice el catálogo de recorridos para buscar y editar recorridos. La [página de estado del recorrido][6] explica cómo investigar los estados **Degraded** y **Missing coverage**.

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/journey_monitoring/#prerequisites
[2]: /es/journey_monitoring/suggested_journeys/
[3]: /es/journey_monitoring/variants/
[4]: /es/real_user_monitoring/rum_without_limits/
[5]: /es/journey_monitoring/details_report/
[6]: /es/journey_monitoring/status/
[8]: /es/real_user_monitoring/operations_monitoring/?tab=browser#create-operations-from-datadog
[9]: /es/api/latest/rum-operations/
[10]: /es/real_user_monitoring/operations_monitoring/?tab=browser#create-operations-with-the-sdk-apis
[11]: /es/real_user_monitoring/guide/best-practices-for-creating-slos-on-operations/
[12]: /es/synthetics/browser_tests/
[13]: /es/synthetics/mobile_app_testing/
[14]: /es/synthetics/test_suites/
[15]: /es/journey_monitoring/roles_and_permissions/
[16]: /es/journey_monitoring/overview/#upstream-and-downstream-journeys
[17]: /es/journey_monitoring/details_report/#synthetic-monitoring--testing
[18]: https://www.datadoghq.com/blog/bits-testing-test-coverage/
[20]: /es/journey_monitoring/overview/#journey-catalog
[21]: /es/real_user_monitoring/operations_monitoring/
[22]: /es/product_analytics/
[24]: /es/journey_monitoring/configuring_journeys/#step-3-add-synthetic-test-coverage
[25]: /es/service_level_objectives/
[26]: /es/journey_monitoring/details_report/#traffic-and-conversion-trends
[27]: /es/product_analytics/charts/funnel_analysis/
[28]: /es/journey_monitoring/#rum-and-product-analytics
[29]: /es/journey_monitoring/#synthetics-only
[30]: /es/real_user_monitoring/explorer/visualize/#funnels
[31]: /es/real_user_monitoring/application_monitoring/browser/monitoring_page_performance/#measure-component-level-performance-with-custom-vitals
[32]: /es/mcp_server/tools/#create_rum_operation