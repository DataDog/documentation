---
aliases:
- /es/tracing/software_catalog/scorecards/scorecard_configuration
- /es/tracing/service_catalog/scorecards/scorecard_configuration
- /es/service_catalog/scorecards/scorecard_configuration
- /es/software_catalog/scorecards/scorecard_configuration
further_reading:
- link: /tracing/software_catalog/
  tag: Documentación
  text: Catálogo de software
- link: /api/latest/service-scorecards/
  tag: Documentación
  text: API de scorecards
- link: https://www.datadoghq.com/blog/service-scorecards/
  tag: Blog
  text: Priorizar y promover las prácticas de observabilidad recomendadas del servicio
    con scorecards
- link: https://www.datadoghq.com/blog/datadog-custom-scorecards/
  tag: Blog
  text: Formalizar las prácticas recomendadas con scorecards
- link: /continuous_integration/dora_metrics/
  tag: Documentación
  text: Seguimiento de las métricas DORA con Datadog
title: Configuración de scorecards
---

Datadog proporciona las siguientes scorecards predefinidas basadas en un conjunto de reglas predeterminadas: Preparación para la producción, Prácticas de observabilidad recomendadas, Propiedad y documentación.

## Configurar scorecards predeterminadas

Para seleccionar cuáles de las reglas predefinidas se evalúan para cada una de las scorecards predeterminadas:

1. Abre la página [Scorecards][1] en el Catálogo de software.
2. Activa o desactiva las reglas para personalizar el cálculo de las puntuaciones. 
3. Haz clic en **View your scores** (Ver sus puntuaciones) para iniciar el seguimiento de tu progreso con las reglas seleccionadas a través de tus entidades definidas.

{{< img src="/tracing/software_catalog/scorecards-setup.png" alt="Página de configuración de scorecards" style="width:90%;" >}}

## Modo de evaluación de las entidades

Una vez configuradas las scorecards por defecto, la página Scorecards del Catálogo de software muestra la lista de reglas predefinidas y el porcentaje de entidades que aprueban esas reglas. Haz clic en una regla para ver más detalles sobre las entidades que la aprueban y las que no, así como los equipos a las que pertenecen. Todas las reglas predefinidas son configuradas inicialmente para evaluar entidades de `kind:service`, pero [este contexto se puede cambiar][7] en el editor de reglas.

### Preparación para la producción

La puntuación del nivel de preparación para la producción de todas las entidades (salvo que se indique lo contrario) se basa en estas normas:

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

Documentos definidos
: La vinculación de la documentación del Catálogo de software proporciona a los ingenieros acceso a conocimientos específicos del servicio, como descripciones generales de la arquitectura, referencias de API y guías operativas. Esto promueve una mejor colaboración entre equipos, acelera la incorporación y profundiza la comprensión general de cómo funcionan e interactúan los servicios.

## Cálculo de las puntuaciones

Cada scorecard predefinida (Preparación para la producción, Prácticas de observabilidad recomendadas, Propiedad y documentación) se compone de un conjunto de reglas predeterminadas. Estas reflejan las condiciones de aprobado/no aprobado y se evalúan automáticamente una vez al día. La puntuación de una entidad con respecto a las reglas personalizadas se basa en los resultados enviados mediante la [API de scorecards][8] o [Workflow Automation][9]. Para excluir una regla personalizada concreta del cálculo de la puntuación de una entidad, define su resultado como `skip` en la API de scorecards.

Las reglas individuales pueden tener restricciones basadas en la disponibilidad de los datos. Por ejemplo, las reglas relacionadas con los despliegues dependen de la disponibilidad de las etiquetas de versión a través del [Etiquetado unificado de servicios][6] de APM.

Cada regla indica una puntuación del porcentaje de entidades que aprueban. Cada scorecard tiene un porcentaje de puntuación general que suma el número de entidades que aprueban entre todas las reglas, **no** el número de entidades que aprueban todas las reglas. Las reglas omitidas y desactivadas no se incluyen en este cálculo.

Las puntuaciones de cada regla también se pueden visualizar **Por tipo** y **Por equipo**. Estas pestañas agregan las puntuaciones a través del tipo de entidad (por ejemplo, `service`, `queue`, `datastore` o `api`) o de equipo, como se define en el Catálogo de software. Esta puntuación se calcula promediando la puntuación individual de cada entidad dentro de cada tipo o equipo.

## Agrupación de reglas por niveles

Puedes agrupar las reglas por niveles para clasificarlas según su criticidad. Existen tres niveles predefinidos: 

- **Nivel 1 - Reglas básicas:** Estas reglas reflejan las expectativas básicas para cada entidad de producción, como tener un propietario de guardia, monitorizaciónen el lugar o un equipo definido.
- **Nivel 2 - Reglas intermedias:** Estas reglas reflejan sólidas prácticas de ingeniería que deberían adoptarse en la mayoría de las entidades. Algunos ejemplos podrían ser la definición de SLOs o la vinculación de la documentación en el Catálogo de software.
- **Nivel 3 - Reglas avanzadas:** Estas reglas aspiracionales representan prácticas de ingeniería maduras. Puede que no se apliquen a todas las entidades, pero son objetivos valiosos para los equipos.

Puedes definir niveles para cualquier regla predefinida o personalizada. Por defecto, las reglas sin niveles se colocan automáticamente en el nivel 3. Puedes cambiar esta asignación por defecto editando la regla.

{{< img src="/tracing/software_catalog/scorecard-levels.png" alt="Interfaz de usuario de scorecards agrupada por niveles" style="width:90%;" >}}

Puedes agrupar reglas por scorecard o nivel en la interfaz de usuario de scorecards. En el Catálogo de software, puedes realizar un seguimiento del progreso de un servicio específico en cada nivel. Cada servicio comienza en el nivel 0. La entidad progresa al nivel 1 una vez que aprueba todas las reglas del nivel 1, hasta que alcanza un estado de nivel 3.

{{< img src="/tracing/software_catalog/scorecard-levels-software-catalog.png" alt="Vista de scorecards en el Catálogo de software, que muestra el estado del servicio por nivel" style="width:90%;" >}}

## Delimitar reglas de scorecards

Los contextos te permiten definir a qué entidades se aplica una regla, utilizando metadatos de definiciones de entidades del Catálogo de software. Si no hay un contexto definido, una regla se aplica a todos los servicios definidos en el catálogo. Puedes delimitar por un `kind` de entidad, así como por cualquier campo en la entidad de una definición, incluyendo `team`, `tier` y etiquetas (tags) personalizadas.

Por defecto, una entidad debe coincidir con todas las condiciones especificadas para ser evaluada según la regla. Puedes utilizar las sentencias `OR` para incluir varios valores para el mismo campo.

{{< img src="/tracing/software_catalog/scorecard-edit-scope.png" alt="Página de configuración de scorecards" style="width:90%;" >}}

Puedes configurar contextos tanto para las reglas predefinidas y personalizadas. Al añadir un contexto a una regla, los resultados registrados anteriormente de las entidades que ya no coinciden con el contexto se ocultan de la interfaz de usuario y se excluyen de los cálculos de puntuación. Si luego eliminas el contexto, estos resultados vuelven a aparecer y se contabilizan de nuevo.

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/services/scorecard
[2]: /es/service_management/service_level_objectives/
[3]: https://app.datadoghq.com/monitors/recommended
[4]: /es/tracing/services/deployment_tracking/
[5]: /es/tracing/other_telemetry/connect_logs_and_traces/
[6]: /es/getting_started/tagging/unified_service_tagging/
[7]: /es/internal_developer_portal/scorecards/scorecard_configuration#scope-scorecard-rules
[8]: /es/api/latest/service-scorecards/
[9]: /es/internal_developer_portal/scorecards/custom_rules#evaluate-custom-rules-using-workflow-automation