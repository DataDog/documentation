---
description: Configure los recorridos con eventos de inicio y fin significativos,
  cobertura técnica, SLOs, pruebas Synthetic y variantes.
further_reading:
- link: /journey_monitoring/
  tag: Documentación
  text: Obtenga información sobre Journey Monitoring
- link: /journey_monitoring/details_report/
  tag: Documentación
  text: Obtenga información sobre el informe de detalles del recorrido.
- link: /journey_monitoring/uptime/
  tag: Documentación
  text: Obtenga información sobre el tiempo de actividad de los recorridos
title: Configuración de recorridos en Datadog
---
## Descripción general {#overview}

Esta guía explica cómo configurar recorridos que representan flujos de usuario importantes y revelan su salud.

La configuración de recorridos tiene tres pasos:

1. Cree un recorrido y defina su flujo de usuario.
2. Agregue operaciones de RUM que representen pasos técnicos críticos.
3. Agregue pruebas Synthetic que cubran el recorrido.

Después de completar estos pasos, valide los indicadores clave de rendimiento (KPI), las operaciones, los objetivos de nivel de servicio (SLOs), las pruebas y las variantes del recorrido.

## Cuándo usar Journey Monitoring {#when-to-use-journey-monitoring}

Journey Monitoring combina el comportamiento del usuario y la salud técnica para un flujo de extremo a extremo. Puede servir como el lugar principal para hacer un seguimiento y solucionar problemas de un flujo que, de otro modo, requeriría configuraciones separadas en varios productos.

Las alternativas comunes incluyen:

- **Real User Monitoring (RUM)**:
  - Embudos en el Explorador de sesiones de RUM o widgets de embudo basados en eventos de RUM
  - Widgets que rastrean la actividad del usuario, como clics en botones o vistas de página
  - Métricas o acciones personalizadas que miden el volumen del flujo, el tiempo hasta la finalización o los recorridos completados
  - Vitals personalizados que representan pasos técnicos clave, los cuales las operaciones de RUM pueden representar dentro de un recorrido
- **Synthetic Monitoring**: Múltiples pruebas que cubren el mismo flujo pero no están organizadas en el conjunto de pruebas de un recorrido
- **Product Analytics**: Embudos, rutas de recorrido u otras visualizaciones que rastrean el comportamiento a través de un flujo de extremo a extremo

Journey Monitoring utiliza Product Analytics para comprender el comportamiento y la experiencia del usuario, RUM para evaluar el rendimiento y la disponibilidad, y pruebas Synthetic para detectar regresiones y medir el tiempo de actividad del recorrido.

## Antes de comenzar {#before-you-begin}

Antes de seguir esta guía, revise la [descripción general y los requisitos previos de Journey Monitoring][1]. Para utilizar Journey Monitoring, su organización debe tener una suscripción paga o de prueba a al menos uno de los siguientes productos: RUM without Limits, Product Analytics, Synthetic Browser Tests o Synthetic Mobile Tests.

### Permisos y roles {#permissions-and-roles}

Journey Monitoring utiliza activos de varios productos, por lo que el acceso a los recorridos y a los activos vinculados depende de los permisos de cada producto.

Para crear o editar recorridos:

- Su rol debe tener acceso de escritura a Journey Monitoring.
- La creación de un conjunto de pruebas Synthetic para un recorrido también requiere acceso de escritura a Synthetic Monitoring. Sin él, Datadog crea el recorrido sin un conjunto de pruebas, y puede agregar uno más tarde.

Para obtener más detalles sobre cómo ver y editar recorridos y sus activos vinculados, consulte [Roles and Permissions][10].

## Paso 1: Crear un recorrido {#step-1-create-a-journey}

### Elija un flujo de usuario {#choose-a-user-flow}

Cree recorridos para flujos críticos orientados al usuario que los usuarios deben completar para respaldar un resultado comercial. Un recorrido debe abarcar varios pasos y representar una acción significativa.

Siga estas pautas para mantener cada recorrido enfocado:

**Hacer:**

- Cree un recorrido independiente para cada flujo de usuario distinto y conecte los recorridos relacionados entre sí.
- Utilice un recorrido de alto nivel y filtros de atributos para comparar cohortes, como usuarios en Estados Unidos y el Reino Unido.

**No hacer:**

- Cree un recorrido para una interacción única y breve. Utilice una [operación RUM][4] en su lugar.
- Combine varios flujos de usuario distintos en un solo recorrido.
- Cree recorridos duplicados que solo difieran en el valor de un atributo, como el país.

### Elija un método de creación {#choose-a-creation-method}

Cree un recorrido manualmente o comience con un recorrido sugerido. Para obtener instrucciones, consulte [Configuración de Journey Monitoring][2].

Elija un método de creación según si tiene en mente un flujo de usuario específico:

- Comience con un [recorrido sugerido][6] si no está seguro de qué recorridos crear. Los recorridos sugeridos proporcionan KPI de alto nivel, incluidos inicios, conversiones y tasa de conversión.
- Revise los nuevos recorridos sugeridos a medida que lanza funciones y actualiza la experiencia de la aplicación. Datadog genera sugerencias basadas en la actividad del usuario en la aplicación.
- Cree un recorrido manualmente cuando tenga un flujo de usuario específico al que desee hacerle un seguimiento.

### Defina las condiciones de inicio y finalización {#define-start-and-end-conditions}

Un recorrido se define por sus eventos de inicio y finalización. Seleccione eventos de acción, eventos de visualización o ambos.

#### Múltiples eventos de inicio y finalización {#multiple-start-and-end-events}

Múltiples eventos de inicio pueden representar varios puntos de entrada al mismo flujo de usuario. Múltiples eventos de finalización pueden representar varias conclusiones válidas.

Cada evento adicional amplía la definición del recorrido. Un gran número de eventos de inicio o fin puede hacer que el contexto del recorrido no esté claro y que sus KPI sean menos precisos.

#### Filtros de atributos{#attribute-filters}

Los atributos a nivel de recorrido incluyen o excluyen cohortes amplias, como los usuarios internos. Los atributos en las condiciones individuales de inicio y fin restringen aún más el flujo.

Incluir filtros de atributos importantes en el nombre o la descripción del recorrido ayuda a los usuarios a comprender el contexto de sus KPI.

#### Rutas de referencia{#referrer-paths}

Las rutas de referencia limitan un evento de inicio o fin a las instancias que siguen a una vista de página específica. Ayudan a distinguir un evento que aparece en varios contextos de recorrido de la instancia que pertenece a un recorrido en particular.

#### Variantes de recorrido{#journey-variants}

La definición base del recorrido incluye solo eventos de inicio y fin. Una variante añade una secuencia específica de eventos de acción o visualización intermedios entre esos puntos. Las variantes distinguen rutas comunes a través del mismo recorrido sin cambiar el contexto general del recorrido.

Seleccionar una variante filtra las métricas y la telemetría del recorrido a esa secuencia de eventos. Esto le permite comparar el volumen, la tasa de conversión y el tiempo de finalización entre diferentes rutas. Los filtros de atributos pueden restringir aún más una variante a un grupo específico.

Cada variante requiere un nombre único y al menos un evento intermedio. Para obtener información sobre cómo crear, analizar y eliminar variantes, consulte [Journey variants][3].

#### Selección de eventos de inicio y fin{#start-and-end-event-selection}

Un evento de inicio debe comenzar claramente el recorrido y representar una acción intencional del usuario.

<div class="alert alert-danger">Elija un evento de fin que confirme que el recorrido está completo. Hacer clic en "Pagar" o "Enviar" no significa que la acción haya funcionado. Si un evento posterior confirma el éxito, utilice ese evento en su lugar, para que los intentos fallidos no se cuenten como recorridos completados.</div>

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

### Agregue nombres, etiquetas y propiedad {#add-names-tags-and-ownership}

Las etiquetas y la propiedad del equipo ayudan a los equipos a encontrar recorridos relevantes y filtrar el catálogo de recorridos. Una convención de nombres y etiquetas coherente mantiene los recorridos organizados a medida que crece el catálogo.

## Paso 2: Agregue operaciones de RUM {#step-2-add-rum-operations}

Las operaciones RUM proporcionan cobertura técnica para momentos clave en el recorrido. Su disponibilidad y latencia ayudan a explicar si el rendimiento técnico contribuye al abandono del usuario.

### Vincule operaciones sugeridas {#link-suggested-operations}

El informe de detalles del recorrido utiliza la correlación temporal para sugerir operaciones de RUM existentes que pueden ser parte del recorrido. Vincule una operación solo si los usuarios la encuentran mientras completan el recorrido.

{{< img src="journey_monitoring/journey-monitoring-correlated-operations.png" alt="El informe de detalles de Journey Monitoring muestra operaciones de RUM correlacionadas según el tiempo con ejecuciones, tasa de éxito, latencia y opciones de creación de SLO." style="width:100%;" >}}

Vincular una operación:

- Vincula la operación al recorrido y la identifica como parte de la ruta crítica del recorrido.
- Crea automáticamente un SLO de disponibilidad para la operación si aún no tiene uno.

### Cree operaciones {#create-operations}

Cree una operación con uno de los siguientes métodos:

- [En Datadog][11]
- [Con la API de operaciones de RUM][12]
- [Con las API del SDK de RUM][13]

### Crear SLOs para operaciones {#create-slos-for-operations}

Cada operación vinculada requiere al menos un SLO para que Datadog evalúe su contribución al recorrido. Una operación puede tener SLOs de disponibilidad, SLOs de latencia o ambos. Para obtener orientación, consulte [Mejores prácticas para crear SLOs en operaciones de RUM][14].

Cuando crea una operación desde el informe de detalles del recorrido, Datadog la vincula al recorrido y crea un SLO de disponibilidad. Si crea una operación con las API del SDK de RUM o la API de operaciones de RUM, utilice la [API de operaciones de RUM][12] para vincularla al recorrido.


<div class="alert alert-tip">
Comience con la operación que tenga el mayor efecto en la conversión del recorrido. Agregue más operaciones según sea necesario.
<ul>
<li>Para un recorrido de inicio de sesión de usuario, haga un seguimiento de la acción de inicio de sesión final para verificar que las credenciales válidas resulten en una autenticación exitosa.</li>
<li>Para un recorrido de pago de comercio electrónico, haga un seguimiento de la acción de pago porque un pago fallido impide que el usuario complete el recorrido.</li>
</ul>
</div>

## Paso 3: Agregue cobertura de pruebas Synthetic {#step-3-add-synthetic-test-coverage}

Las pruebas Synthetic proporcionan cobertura técnica para las rutas críticas del recorrido. Las fallas en las pruebas pueden indicar regresiones que afectan a los usuarios, y las pruebas de cobertura determinan el tiempo de actividad del recorrido.

Datadog crea automáticamente un conjunto de pruebas Synthetic y un SLO de tiempo de actividad editable con un objetivo predeterminado del 99.9% para cada recorrido. También agrega pruebas Synthetic que cubren el recorrido. Para obtener información sobre la cobertura de pruebas, la administración de pruebas y el SLO de tiempo de actividad, consulte [Journey uptime][5].

### Revise la cobertura del recorrido{#review-journey-coverage}

Datadog utiliza datos de RUM para identificar las pruebas Synthetic que cubren un recorrido. Estas pruebas aparecen en la página de detalles del recorrido y en la página del conjunto de pruebas Synthetic.

- Revise las pruebas que Datadog identifica como las que cubren el recorrido.
- Si Datadog identifica pruebas que no están en el conjunto, un indicador resalta las pruebas adicionales.

### Agregue pruebas a un recorrido{#add-tests-to-a-journey}

Agregue pruebas cuando el conjunto esté vacío o cuando Datadog identifique pruebas adicionales:

- Para agregar pruebas existentes, seleccione **Manage journey coverage**, luego seleccione las pruebas que desea agregar.
- Para crear cobertura, cree una [prueba de navegador][7] o una [prueba de aplicación móvil][8], luego agréguela al conjunto de pruebas del recorrido. Para obtener más información, consulte [Conjunto de pruebas][9].

{{< img src="journey_monitoring/journey-monitoring-covering-tests.png" alt="El panel Manage Tests in Suite que muestra pruebas de navegador Synthetic que cubren un recorrido." style="width:100%;" >}}

**Vista previa**: Cuando ninguna prueba Synthetic cubre un recorrido, [Bits Testing][15] puede generar una prueba de navegador que lo cubra. [Regístrese para la vista previa de Bits Testing][16].

### Mantenga la cobertura {#maintain-coverage}

- Los cambios en las condiciones de inicio o fin de un recorrido pueden afectar qué pruebas lo cubren. Revise la cobertura después de cambiar estas condiciones.
- Un recorrido informa el tiempo de actividad solo cuando su conjunto de pruebas contiene al menos una prueba que lo cubra. Si el recorrido pierde la cobertura, deja de informar el tiempo de actividad.

La gestión de la cobertura modifica las pruebas Synthetic, por lo que requiere acceso de escritura a Synthetic Monitoring y una política de restricción en el conjunto de pruebas. Consulte [Roles and Permissions][10].

## Valide la configuración de Journey Monitoring {#validate-the-journey-monitoring-configuration}

Un recorrido bien configurado tiene las siguientes características:

- Sus KPI de nivel superior (inicios, volumen de conversión, tasa de conversión y tiempo de conversión) se alinean con el comportamiento esperado del usuario.
- Sus operaciones de RUM vinculadas y sus pruebas Synthetic representan el rendimiento técnico de los pasos críticos del recorrido.
- Cada operación vinculada tiene al menos un SLO y una tasa de éxito alta, lo que indica que los pasos críticos están disponibles para los usuarios.
- Sus pruebas Synthetic producen resultados consistentes sin fallas intermitentes.
- Si los usuarios pueden completar el recorrido a través de diferentes rutas esperadas, las variantes representan esas rutas.


## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/journey_monitoring/
[2]: /es/journey_monitoring/#setup
[3]: /es/journey_monitoring/details_report/variants/
[4]: /es/real_user_monitoring/operations_monitoring/
[5]: /es/journey_monitoring/uptime/
[6]: /es/journey_monitoring/map/suggested_journeys/
[7]: /es/synthetics/browser_tests/
[8]: /es/synthetics/mobile_app_testing/
[9]: /es/synthetics/test_suites/
[10]: /es/journey_monitoring/roles_and_permissions/
[11]: /es/real_user_monitoring/operations_monitoring/?tab=browser#create-operations-from-datadog
[12]: /es/api/latest/rum-operations/
[13]: /es/real_user_monitoring/operations_monitoring/?tab=browser#create-operations-with-the-sdk-apis
[14]: /es/real_user_monitoring/guide/best-practices-for-creating-slos-on-operations/
[15]: https://www.datadoghq.com/blog/bits-testing-test-coverage/
[16]: https://www.datadoghq.com/product-preview/bits-testing/