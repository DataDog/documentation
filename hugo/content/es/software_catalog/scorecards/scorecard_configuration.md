---
aliases:
- /es/tracing/software_catalog/scorecards/scorecard_configuration
- /es/tracing/service_catalog/scorecards/scorecard_configuration
- /es/service_catalog/scorecards/scorecard_configuration
further_reading:
- link: /tracing/software_catalog/
  tag: Documentación
  text: Catálogo de software
- link: /api/latest/service-scorecards/
  tag: Documentación
  text: API de cuadros de mando
- link: https://www.datadoghq.com/blog/service-scorecards/
  tag: Blog
  text: Priorizar y promover las prácticas de observabilidad recomendadas del servicio
    con cuadros de mando
- link: https://www.datadoghq.com/blog/datadog-custom-scorecards/
  tag: Blog
  text: Formalizar las prácticas recomendadas con cuadros de mando personalizados
- link: /continuous_integration/dora_metrics/
  tag: Documentación
  text: Seguimiento de las métricas DORA con Datadog
title: Configuración de los cuadros de mando
---

{{< callout url="#" btn_hidden="true" header="false" >}}
Los cuadros de mando están en Vista previa.
{{< /callout >}}

Datadog proporciona los siguientes cuadros de mando predefinidos basados en un conjunto de reglas predeterminadas: Preparación para la producción, Prácticas de observabilidad recomendadas, Propiedad y documentación.

## Configurar cuadros de mando predeterminados

Para seleccionar cuáles de las reglas predefinidas se evalúan para cada uno de los cuadros de mando predeterminados:

1. Abre la página de [Cuadros de mando][1] en el Catálogo de software.
2. Activa o desactiva las reglas para personalizar el cálculo de las puntuaciones. 
3. Haz clic en **View your scores** (Ver tus puntuaciones) para empezar a seguir tu progreso hacia las reglas seleccionadas en tus servicios definidos.

{{< img src="/tracing/software_catalog/scorecards-setup.png" alt="Página de configuración de cuadros de mando" style="width:90%;" >}}

## Evaluación de los servicios

Una vez configurados los cuadros de mando predeterminados, la página Cuadros de mando del Catálogo de software muestra la lista de reglas predefinidas y el porcentaje de servicios que aprueban esas reglas. Haz clic en una regla para ver más detalles sobre los servicios aprobados y fallidos, y los equipos que los poseen.

### Preparación para la producción

La puntuación de Preparación para la producción de todos los servicios (a menos que se indique lo contrario) se basa en estas reglas:

Tener SLOs definidos 
: [Los objetivos de nivel de servicio (SLOs)][2] proporcionan un marco para definir objetivos claros en torno al rendimiento de las aplicaciones, lo que te ayuda a ofrecer una experiencia constante al cliente, equilibrar el desarrollo de funciones con la estabilidad de la plataforma y mejorar la comunicación con los usuarios internos y externos.

Tener monitores definidos
: Los monitores reducen los tiempos de inactividad ayudando a tu equipo a reaccionar rápidamente ante los problemas en tu entorno. Consulta las [plantillas de monitor][3].

Guardias definidas
: Mejora la experiencia de las guardias para todos estableciendo una propiedad clara de tus servicios. De este modo, tus ingenieros de guardia dispondrán del punto de contacto correcto durante los incidentes, lo que reducirá el tiempo necesario para resolverlos.

El último despliegue se produjo en los últimos 3 meses
: Para servicios monitorizados por APM o USM. Las prácticas de desarrollo ágil te permiten responder rápidamente a los comentarios de los usuarios y centrarte en el desarrollo de las funciones más importantes para los usuarios finales. 

### Prácticas de observabilidad recomendadas

La puntuación de Prácticas de observabilidad recomendadas se basa en las siguientes reglas:

El seguimiento del despliegue está activo
: Para servicios monitorizados por APM o USM. [Asegúrate de que los despliegues se realizan sin problemas, implementando una versión de etiqueta (tag) con el Etiquetado unificado de servicios][4]. A medida que despliegas nuevas versiones de tu funcionalidad, Datadog detecta y alerta sobre las diferencias entre versiones en cuanto a tasas de error, número de solicitudes y más. Esto te permite saber cuándo debes volver a versiones anteriores para mejorar la experiencia del usuario final.

La correlación de logs está activa
: Para servicios APM, se evalúa en función de la última hora de logs detectados. [La correlación entre APM y logs][5] mejora la velocidad de resolución de problemas de los usuarios finales, ahorrándoles tiempo durante incidentes y cortes.

### Propiedad y documentación

La puntuación de Propiedad y documentación se basa en las siguientes reglas:

Equipo definido
: Definir un equipo permite a los miembros del personal de guardia saber a qué equipo deben dirigirse en caso de que la causa de un problema sea un servicio con el que no están familiarizados.

Contactos definidos
: Definir los contactos reduce el tiempo que tardan los miembros del personal de guardia en escalar al propietario de otro servicio, lo que te ayuda a recuperar más rápidamente tus servicios de cortes e incidentes.

Repositorios de código definidos
: Identificar los repositorios de código permite a tus ingenieros realizar una investigación inicial de un problema, sin tener que ponerse en contacto con el equipo propietario del servicio. Esto mejora la colaboración y ayuda a tus ingenieros a mejorar su comprensión general de los puntos de integración.

Cualquier documento definido
: En la sección Otros enlaces del Catálogo de software, especifica enlaces adicionales a recursos como libros de ejecución, dashboards u otra documentación interna. Esto ayuda con las investigaciones iniciales y proporciona un acceso rápido a los libros de ejecución de reparación de emergencia de cortes e incidentes.

## Cálculo de las puntuaciones

Cada cuadro de mando (Preparación para la producción, Prácticas de observabilidad recomendadas, Propiedad y documentación) se compone de un conjunto predeterminado de reglas. Éstas reflejan las condiciones de aprobación y fallo, y se evalúan automáticamente una vez al día. La puntuación de un servicio en relación con las reglas personalizadas se basa en los resultados enviados mediante la API de cuadros de mando. Para excluir una regla personalizada concreta del cálculo de la puntuación de un servicio, configura su resultado en `skip` en la API de cuadros de mando.

Las reglas individuales pueden tener restricciones basadas en la disponibilidad de los datos. Por ejemplo, las reglas relacionadas con los despliegues dependen de la disponibilidad de las etiquetas de versión a través del [Etiquetado unificado de servicios][6] de APM.

Cada regla indica una puntuación para el porcentaje de servicios aprobados. Cada cuadro de mando tiene un porcentaje de puntuación general que suma cuántos servicios aprueban, de entre todas las reglas, y **no** cuántos servicios aprueban absolutamente todas las reglas. Las reglas omitidas y desactivadas no se incluyen en este cálculo.

## Agrupar reglas por niveles

Puedes agrupar las reglas por niveles para clasificarlas según su criticidad. Existen tres niveles predefinidos:

- Nivel 1 - Reglas básicas: Estas reglas reflejan las expectativas básicas para cada servicio de producción, como tener definidos un propietario de guardia, una monitorización en el lugar o un equipo.
- Nivel 2 - Reglas intermedias: Estas reglas reflejan sólidas prácticas de ingeniería que deberían adoptarse en la mayoría de los servicios. Por ejemplo, la definición de SLOs o la vinculación de la documentación en el Catálogo de software.
- Nivel 3 - Reglas avanzadas: Estas ambiciosas reglas representan prácticas de ingeniería maduras. Puede que no se apliquen a todos los servicios, pero son objetivos valiosos para los equipos.

Puedes establecer niveles para cualquier regla predefinida o personalizada. Por defecto, las reglas sin niveles se colocan automáticamente en el nivel 3. Puedes cambiar esta asignación por defecto editando la regla.

{{< img src="/tracing/software_catalog/scorecard-levels.png" alt="Interfaces de usuario de cuadros de mando agrupadas por niveles" style="width:90%;" >}}

Puedes agrupar reglas por cuadro de mando o nivel en la interfaz de usuario de cuadros de mando. En el Catálogo de software, puedes realizar un seguimiento el progreso de un servicio específico en cada nivel. Cada servicio comienza en el nivel 0. El servicio progresa al nivel 1 una vez que pasa todas las reglas del nivel 1, hasta que alcanza un estado de nivel 3.

{{< img src="/tracing/software_catalog/scorecard-levels-software-catalog.png" alt="Vista de cuadros de mando en el Catálogo de software que muestra el estado del servicio por nivel" style="width:90%;" >}}

## Delimitar reglas de cuadros de mando

Los contextos te permiten definir a qué entidades se aplica una regla, utilizando metadatos de definiciones de entidades del Catálogo de software. Si no hay un contexto definido, una regla se aplica a todos los servicios definidos en el catálogo. Puedes delimitar por cualquier campo de una definición de entidad, incluyendo `team`, `tier` y etiquetas personalizadas.

Por defecto, un servicio debe coincidir con todas las condiciones especificadas para ser evaluado según la regla. Puedes utilizar las sentencias `OR` para incluir varios valores para el mismo campo. 

{{< img src="/tracing/software_catalog/scorecard-edit-scope.png" alt="Página de configuración de cuadros de mando" style="width:90%;" >}}

Puedes configurar contextos tanto para las reglas predefinidas como para las personalizadas. Al añadir un contexto a una regla, los resultados registrados anteriormente de los servicios que ya no coinciden con el contexto se ocultan de la interfaz de usuario y se excluyen de los cálculos de puntuación. Si luego eliminas el contexto, estos resultados vuelven a aparecer y se contabilizan de nuevo.

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/services/scorecard
[2]: /es/service_management/service_level_objectives/
[3]: https://app.datadoghq.com/monitors/recommended
[4]: /es/tracing/services/deployment_tracking/
[5]: /es/tracing/other_telemetry/connect_logs_and_traces/
[6]: /es/getting_started/tagging/unified_service_tagging/