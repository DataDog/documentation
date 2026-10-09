---
aliases:
- /es/software_catalog/set_up
- /es/tracing/software_catalog/guides/validating-service-definition
- /es/software_catalog/guides/validating-service-definition
- /es/tracing/service_catalog/guides/validating-service-definition
- /es/service_catalog/guides/validating-service-definition
- /es/service_catalog/use_cases/validating_service_definition
- /es/software_catalog/use_cases/validating_service_definition
- /es/software_catalog/customize/
- /es/software_catalog/manage_entries/
- /es/software_catalog/enrich_default_catalog/
- /es/service_catalog/manage_entries/
- /es/service_catalog/enrich_default_catalog/
- /es/service_catalog/customize/
- /es/software_catalog/best-practices
- /es/software_catalog/guides/best-practices
- /es/service_catalog/guides/best-practices
- /es/service_catalog/use_cases/best_practices
- /es/software_catalog/use_cases/best_practices
- /es/software_catalog/navigating
- /es/tracing/software_catalog/browsing
- /es/software_catalog/browsing
- /es/tracing/service_catalog/browsing
- /es/service_catalog/browsing
- /es/service_catalog/navigating
- /es/software_catalog/manage
- /es/tracing/software_catalog/investigating
- /es/software_catalog/investigating/
- /es/tracing/software_catalog/guides/understanding-service-configuration
- /es/software_catalog/guides/understanding-service-configuration/
- /es/tracing/service_catalog/investigating
- /es/service_catalog/investigating/
- /es/tracing/service_catalog/guides/understanding-service-configuration
- /es/service_catalog/guides/understanding-service-configuration/
- /es/api_catalog/add_metadata
- /es/api_catalog/owners_and_tags
- /es/service_catalog/manage
- /es/internal_developer_portal/software_catalog/set_up
description: Complete el Catalog mediante la detección de entidades a partir de la
  telemetría de Datadog, la creación manual de definiciones de entidades o la importación
  desde fuentes de terceros como Backstage y ServiceNow.
further_reading:
- link: https://www.datadoghq.com/blog/manage-service-catalog-categories-with-service-definition-json-schema/
  tag: Blog
  text: Gestione las entradas del Service Catalog con el esquema JSON de definición
    de servicio
- link: https://www.datadoghq.com/blog/service-catalog-setup/
  tag: Blog
  text: Agregue fácilmente etiquetas y metadatos a sus servicios mediante la configuración
    simplificada del Service Catalog
- link: https://www.datadoghq.com/blog/github-actions-service-catalog/
  tag: Blog
  text: Yo uso GitHub Actions para el Service Catalog de Datadog, y usted también
    debería hacerlo
- link: https://www.datadoghq.com/blog/service-ownership-best-practices-datadog/
  tag: Blog
  text: Prácticas recomendadas para la propiedad de servicios de extremo a extremo
    con el Datadog Service Catalog
- link: https://learn.datadoghq.com/courses/managing-software-catalog
  tag: Centro de aprendizaje
  text: Gestión de servicios con Catalog
title: Configurar Catalog
---
## Descripción general {#overview}

Las entidades de Catalog se definen a través de [Entity Definitions][1], que son archivos de configuración YAML al estilo de Kubernetes. 

Para completar Catalog, puede:
- Configure Datadog Application Performance Monitoring (APM), Universal Service Monitoring (USM), Real User Monitoring (RUM), métricas de infraestructura o logs, los cuales alimentan automáticamente los datos de las entidades en Catalog.
- Cree definiciones de entidades de forma manual o mediante automatización. 
- Importe definiciones de entidades existentes desde terceros. 

## Detecte entidades automáticamente desde Datadog {#automatically-discover-entities-from-datadog}

De forma predeterminada, Catalog se completa automáticamente con entradas detectadas desde APM, USM y RUM. También puede importar manualmente entradas desde otras telemetrías de Datadog, como los logs. 

{{< whatsnext desc=" " >}}
    {{< nextlink href="/internal_developer_portal/catalog/set_up/discover_entities#automatic-discovery-with-apm-usm-and-rum" >}}Descubrir desde APM, USM y RUM{{< /nextlink >}}
    {{< nextlink href="/internal_developer_portal/catalog/set_up/discover_entities#import-entities-from-infrastructure-and-logs" >}}Importar desde infraestructura y logs{{< /nextlink >}}
{{< /whatsnext >}}

### APM {#apm}

Cuando instrumenta el código de su aplicación con SDKs de Datadog u OpenTelemetry, sus aplicaciones emiten trazas y generan métricas de traza no muestreadas. Estas trazas y métricas potencian las capacidades de detección de entidades y mapeo de dependencias en IDP. Sus opciones de instrumentación (por ejemplo, su versión del Datadog Agent, su versión de SDK y si utiliza instrumentación personalizada o anulaciones de servicio) afectan la calidad y precisión de sus mapas de dependencias. Consulte [Descubrir desde APM, USM y RUM][5] para obtener más detalles.

### USM {#usm}

USM detecta métricas de Golden Signal (por ejemplo, solicitudes, errores y duraciones) y mapea las dependencias de la aplicación basadas en eBPF. No requiere instrumentación del código de su aplicación.

### RUM {#rum}

RUM proporciona datos de experiencia del usuario de frontend, incluidos el rendimiento de la página, errores, eventos de sesión y vistas. Si tiene aplicaciones RUM, aparecen en el Catalog como **Aplicaciones Frontend** en el selector de componentes. 

### Otras telemetrías de Datadog {#other-datadog-telemetries}

También puede importar entidades que se identifican a partir de telemetrías de Datadog como registros, métricas de servidor, métricas de contenedor, métricas de red y métricas de proceso. 

Cuando utiliza [**Importar entidades**][10] y elige una fuente, Datadog consulta esa fuente y busca etiquetas `DD_SERVICE` válidas. Las entidades se marcan con el atributo `kind:service`.

**Nota**: Solo debe hacer esto si las etiquetas `DD_SERVICE` están bien mantenidas y no contienen valores de etiquetas irrelevantes o incorrectos.

## Crear entidades {#create-entities}

Las [definiciones de entidad][1], definidas en archivos YAML de entidad, son la fuente de verdad canónica en el Catalog. Usted puede: 
- Cree definiciones de entidad manualmente a través de Datadog.
- Almacene las definiciones en repositorios de GitHub o GitLab y configure [Source Code Integration][6] para sincronizar las definiciones con IDP. Los cambios realizados en sus archivos se reflejan en Datadog en cuestión de minutos.

{{< whatsnext desc=" " >}}
    {{< nextlink href="/internal_developer_portal/catalog/set_up/create_entities#through-the-datadog-ui" >}}Crear a través de la Datadog UI{{< /nextlink >}}
    {{< nextlink href="/internal_developer_portal/catalog/set_up/create_entities#through-automation" >}}Crear a través de automatización de código{{< /nextlink >}}
{{< /whatsnext >}}

**Nota**: Para correlacionar automáticamente una entidad con su telemetría, el campo `name` en su definición debe coincidir exactamente con el identificador principal de los datos de telemetría. Para la mayoría de los servicios, esta es la etiqueta `service` tal como se define en el Unified Service Tagging de Datadog. Consulte los ejemplos para [`kind:datastore`][7], [`kind:queue`][8] y otros [`entity types`][9].

## Importar entidades {#import-entities}

Si mantiene inventarios de software en Backstage o en la CMDB de ServiceNow, puede sincronizar estos inventarios en el Catalog de Datadog.

{{< whatsnext desc=" " >}}
    {{< nextlink href="/internal_developer_portal/catalog/set_up/import_entities#entities-from-backstage" >}}Importar desde Backstage{{< /nextlink >}}
    {{< nextlink href="/internal_developer_portal/catalog/set_up/import_entities#import-from-servicenow" >}}Importar desde ServiceNow{{< /nextlink >}}
{{< /whatsnext >}}

### Backstage {#backstage}

Puede incorporar sus entidades de Backstage al IDP de Datadog de dos maneras:
1. Instale [Datadog's Backstage plugin][11]. 
1. Importe archivos de descriptor de entidad desde Backstage al IDP mediante Datadog API, Terraform o Datadog's GitHub integration. 

### ServiceNow {#servicenow}

Sincronice sus inventarios de CMDB de ServiceNow con el Catalog de Datadog configurando una consulta periódica en sus tablas de CI de ServiceNow.

## Definir la propiedad de la entidad {#define-entity-ownership}

Vincule entidades a equipos para habilitar el filtrado basado en equipos en los productos de Datadog, enviar notificaciones a los propietarios correctos y fomentar la responsabilidad a través de Scorecards y Campaigns. Para obtener más detalles, consulte [Definir la propiedad para entidades del Catalog][12].

## Verificar la integridad de la configuración {#verify-configuration-completeness}

Seguir las mejores prácticas de monitoreo, como el rastreo, el registro y el perfilado de código, le ayuda a garantizar que dispone de todos los datos que necesita durante la clasificación de incidentes. Catalog proporciona comprobaciones automáticas para estas configuraciones recomendadas. 

Para ver la integridad de la configuración de una entidad, haga clic en la entidad en el [Catalog][2] y, a continuación, busque la pestaña **Setup Guidance**:

{{< img src="tracing/software_catalog/software-catalog-setup-guidance.png" alt="Catalog con la pestaña Setup Guidance resaltada." >}}

La tabla Setup Guidance no refleja necesariamente la facturación de productos individuales, sino la actividad de la entidad que está examinando actualmente. Por ejemplo, si el servicio no emite métricas de infraestructura durante mucho tiempo, `Infrastructure Monitoring` podría tener `Not Detected` especificado, incluso si tiene servidores o contenedores ejecutando monitoreo de infraestructura. 

## Configurar el acceso y los permisos basados en roles {#configure-role-based-access-and-permissions}

Para obtener información general, consulte [Access Control basado en roles][3] y [Permisos de roles][4].

### Permiso de lectura {#read-permission}

El permiso de lectura del Catalog permite a un usuario leer datos del Catalog, lo que habilita las siguientes funciones:
- Lista del Catalog
- Discover UI
- Punto de conexión de definición de servicio: `/api/v2/services/definition/<service_name>`

El permiso está habilitado de forma predeterminada en el **Datadog Read Only Role** y el **Datadog Standard Role**.

### Permiso de escritura {#write-permission}

El permiso de escritura del Catalog permite a un usuario modificar datos del Catalog. El permiso de escritura es necesario para las siguientes funciones:
- Insertar o actualizar una definición de servicio con el punto de conexión `POST /api/v2/services/definitions`
- Eliminar una definición de servicio con el punto de conexión `DELETE /api/v2/services/definition/<service_name>`
- Completar el proceso de incorporación en la Discover Services UI
- Actualizar metadatos de servicio en la UI

El permiso está habilitado de forma predeterminada en el **Datadog Admin Role** y el **Datadog Standard Role**.

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/internal_developer_portal/catalog/entity_model
[2]: https://app.datadoghq.com/software
[3]: /es/account_management/rbac
[4]: /es/account_management/rbac/permissions
[5]: /es/internal_developer_portal/catalog/set_up/discover_entities#automatic-discovery-with-apm-usm-and-rum
[6]: /es/integrations/guide/source-code-integration/
[7]: /es/internal_developer_portal/catalog/entity_model/native_entities/?tab=datastore#datastore-peer-tags
[8]: /es/internal_developer_portal/catalog/entity_model/native_entities/?tab=queue#datastore-peer-tags
[9]: /es/internal_developer_portal/catalog/entity_model?tab=v30
[10]: https://app.datadoghq.com/software/settings/get-started
[11]: https://www.npmjs.com/package/@datadog/backstage-plugin-datadog-entity-sync-backend
[12]: /es/internal_developer_portal/catalog/set_up/ownership