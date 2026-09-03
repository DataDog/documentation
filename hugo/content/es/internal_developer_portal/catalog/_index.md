---
algolia:
  tags:
  - software catalog
  - catalog
aliases:
- /es/tracing/faq/software_catalog/
- /es/tracing/services/services_list/
- /es/tracing/visualization/services_list/
- /es/tracing/software_catalog/
- /es/tracing/faq/service_catalog/
- /es/tracing/service_catalog/
- /es/service_catalog/
- /es/software_catalog/
- /es/internal_developer_portal/software_catalog/
description: Catalog proporciona una vista centralizada y dinámica de su ecosistema
  de software y recursos de infraestructura, integrando herramientas de observabilidad,
  seguridad y gestión de costos.
further_reading:
- link: https://www.datadoghq.com/blog/datadog-forms
  tag: Blog
  text: Convierta los comentarios en acciones en toda su organización de ingeniería
    con Datadog Forms
- link: /internal_developer_portal/use_cases
  tag: Documentación
  text: Conozca los casos de uso de Catalog
- link: https://learn.datadoghq.com/courses/managing-software-catalog
  tag: Centro de aprendizaje
  text: Gestión de servicios con Catalog
title: Catalog
---
## Descripción general
 {#overview}

[Catalog][1] proporciona una vista centralizada y dinámica de su ecosistema de software y recursos de infraestructura, brindándole un único punto de entrada para comprender cada capa de su stack. Construido sobre telemetría en tiempo real y recopilación automatizada de metadatos, Catalog se integra con herramientas de observabilidad, seguridad y gestión de costos. Esto permite a los equipos de ingeniería, SRE, seguridad y plataforma mantener la visibilidad, optimizar las operaciones y promover la confiabilidad del servicio a escala.

{{< img src="tracing/internal_developer_portal/catalog/tour.mp4" video=true alt="Navegación por el catálogo de IDP" style="width:100%;" >}}

## Qué puede hacer en Catalog
 {#what-you-can-do-in-catalog}

Catalog ofrece múltiples vistas para ayudarle a explorar y gestionar sus entidades. Para encontrar rápidamente lo que más necesita, fije las vistas a las que accede con frecuencia usando Saved Views.

- [**Propiedad**][8]: Acceda a la información de Slack, repositorio o guardia de su equipo.
- **Confiabilidad**: Aborde los riesgos mostrando entidades con implementaciones recientes, tasas de error en aumento, incidentes abiertos o monitors fallidos.
- **Rendimiento**: Compare la latencia, el tráfico, la tasa de error y el Apdex por entorno.
- **Seguridad**: Encuentre bibliotecas vulnerables y ataques en vivo desde una única lista para fortalecer su postura de seguridad.
- **Costos**: rastree los costos de AWS vinculados a cambios en el código y la infraestructura para controlar el gasto en la nube.
- **Software Delivery**: Haga un seguimiento del estado de la pipeline de CI, las infracciones de análisis estático y las métricas DORA para acortar los ciclos de entrega.
- **Relaciones**: vea el gráfico de dependencias de los servicios y pase el cursor sobre cualquier tarjeta de servicio para ver los recursos de infraestructura en los que se ejecuta.
- **Infraestructura**: explore sus recursos de infraestructura en la nube en una sección dedicada del Catálogo. Los recursos de infraestructura se vinculan a las entidades de software que se ejecutan en ellos. Puede hacer clic en cualquier servicio en el gráfico de dependencias para navegar directamente a la infraestructura en la que se ejecuta.

Consulte la [documentación de casos de uso][4] para saber cómo los equipos utilizan el Catálogo de Datadog para centralizar el conocimiento, agilizar los procesos, mejorar la eficiencia operativa y más.

## Qué aparece en Catalog
 {#what-appears-in-catalog}

Catalog includes an entity when:
- Datadog [lo detecta a partir de la telemetría][5],
- Usted [lo declara en una definición de entidad][6], o
- Usted [lo importa desde una fuente de terceros][7] como Backstage o ServiceNow.

Puede visualizar los recursos de infraestructura cuando [habilita la recopilación de recursos][9]. La recopilación de recursos es gratuita para cualquier cliente de Infrastructure Monitoring.

[Obtenga más información][3] sobre los tipos de entidades y cómo configurarlos según sus necesidades.

**Notas**: 
- Utilice el tipo de entidad para un filtrado más preciso que el filtro `type` heredado (del atributo `span.type`). Por ejemplo, utilice la faceta `datastore type` para filtrar por una tecnología de almacén de datos específica.
- Los resúmenes de tramos y las estadísticas de servicios y recursos se conservan hasta por 30 días. Para un análisis más profundo de las métricas de traza de APM, utilice Metric Explorer. [Obtenga más información sobre la retención de datos para APM][2].

{{< site-region region="gov,gov2" >}}
### Tipos de servicio
 {#service-types}

Cada servicio monitoreado está asociado con un tipo. Datadog determina automáticamente el tipo según el atributo `span.type` adjunto a los datos de los tramos entrantes. El tipo especifica el nombre de la aplicación o marco con el que se está integrando el Datadog Agent.

Por ejemplo, si utiliza la integración oficial de Flask, el `Type` se establece en "Web". Si está monitoreando una aplicación personalizada, el `Type` aparece como "Custom".

El tipo de servicio puede ser uno de los siguientes:

*  Cache
*  Custom
*  DB
*  Serverless function
*  Web

Algunas integraciones se asignan a ciertos tipos. Por ejemplo, Postgres, MySQL y Cassandra se asignan al tipo "DB". Las integraciones de Redis y Memcache se asignan al tipo "Cache".

{{< /site-region >}}

## Consultar datos de Catalog en Dashboards
 {#query-catalog-data-in-dashboards}

Utilice la fuente de datos **Developer Portal** para llevar los datos de Catalog directamente a [Dashboards][10]. Puede consultar entidades a través de servicios, colas, aplicaciones frontend, API y sistemas, y agruparlas o filtrarlas por metadatos como propiedad, nivel, ciclo de vida y versión de definición. 


Para utilizar la fuente de datos, agregue un widget a su tablero, seleccione **Developer Portal** como fuente de datos y elija un tipo de entidad para consultar. Se admiten los tipos de widget Query Value, lista principal, tabla, Treemap, Pie y Bar. 

{{< img src="tracing/internal_developer_portal/catalog/catalog_datasource.png" alt="Consulta de datos de Catalog en Dashboards" style="width:100%;" >}}

## Lecturas adicionales
 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/services

[2]: /es/data_security/data_retention_periods/

[3]: /es/internal_developer_portal/catalog/entity_model/native_entities/

[4]: /es/internal_developer_portal/use_cases

[5]: /es/internal_developer_portal/catalog/set_up/discover_entities

[6]: /es/internal_developer_portal/catalog/set_up/create_entities

[7]: /es/internal_developer_portal/catalog/set_up/import_entities

[8]: /es/internal_developer_portal/catalog/set_up/ownership

[9]: /es/infrastructure/

[10]: /es/dashboards/