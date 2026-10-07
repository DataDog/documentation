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
further_reading:
- link: https://www.datadoghq.com/blog/manage-service-catalog-categories-with-service-definition-json-schema/
  tag: Blog
  text: Gestionar las entradas del Catálogo de servicios con el esquema JSON de la
    definición de servicios
- link: https://www.datadoghq.com/blog/service-catalog-setup/
  tag: Blog
  text: Añadir fácilmente etiquetas (tags) y metadatos a tus servicios mediante la
    configuración simplificada del Catálogo de servicios
- link: https://www.datadoghq.com/blog/github-actions-service-catalog/
  tag: Blog
  text: Yo utilizo acciones de GitHub para el Catálogo de servicios de Datadog, y
    tú también deberías hacerlo.
- link: https://www.datadoghq.com/blog/service-ownership-best-practices-datadog/
  tag: Blog
  text: Prácticas recomendadas para la propiedad integral del servicio con el Catálogo
    de servicios de Datadog
title: Configuración de Software Catalog
---

## Información general

Las entidades de Software Catalog se definen a través de [Definiciones de entidades][1], que son archivos de configuración YAML al estilo de Kubernetes. 

Para rellenar Software Catalog, puedes:
- Configurar Datadog Application Performance Monitoring (APM), Universal Service Monitoring (USM), Real User Monitoring (RUM), métricas de infraestructura o logs, que alimentarán automáticamente los datos de las entidades en Software Catalog.
- Crear definiciones de entidades manualmente o mediante automatización. 
-  Importar definiciones de entidades existentes de terceros. 

En forma predeterminada, estos servicios no están asociados a la telemetría de Datadog, pero puedes vincular manualmente los datos de telemetría de Datadog o de fuentes externas mediante archivos YAML de definición de entidades.

## Descubrir automáticamente entidades a partir de Datadog

{{< whatsnext desc=" " >}}
    {{< nextlink href="/internal_developer_portal/software_catalog/set_up/discover_entities#automatic-discovery-with-apm-usm-and-rum" >}}Importar desde APM, USM, y RUM{{< /nextlink >}}
    {{< nextlink href="/internal_developer_portal/software_catalog/set_up/discover_entities#import-entities-from-infrastructure-and-logs" >}}Importar desde infraestructura y logs{{< /nextlink >}}
{{< /whatsnext >}}

## Crear entidades

{{< whatsnext desc=" " >}}
    {{< nextlink href="/internal_developer_portal/software_catalog/set_up/create_entities#through-the-datadog-ui" >}}Crear a través de la interfaz de usuario Datadog {{< /nextlink >}}
    {{< nextlink href="/internal_developer_portal/software_catalog/set_up/create_entities#through-automation" >}}Crear a través de la automatización del código{{< /nextlink >}}
{{< /whatsnext >}}

## Importar entidades

{{< whatsnext desc=" " >}}
    {{< nextlink href="/internal_developer_portal/software_catalog/set_up/import_entities#import-from-backstage" >}}Importar desde Backstage{{< /nextlink >}}
    {{< nextlink href="/internal_developer_portal/software_catalog/set_up/import_entities#import-from-servicenow" >}}Importar desde ServiceNow{{< /nextlink >}}
{{< /whatsnext >}}

## Verificar la integridad de la configuración 

Seguir las prácticas recomendadas de monitorización, como el rastreo, el registro y la creación de perfiles de código, te ayuda a asegurarte de que dispones de todos los datos que necesitas durante el triaje de incident (incidente). Software Catalog proporciona checks automáticas de estas configuraciones recomendadas. 

Para ver la integridad de la configuración de una entidad, haz clic en la entidad en [Software Catalog][2], luego busca la pestaña **Guía de configuración**:

{{< img src="tracing/software_catalog/software-catalog-setup-guidance.png" alt="Software Catalog con la pestaña  de Guía de configuración resaltada." >}}

La tabla de Guía de configuración no refleja necesariamente la facturación de productos individuales, sino la actividad de la entidad que estás examinando en ese momento. Por ejemplo, si el servicio no emite métricas de infraestructura durante mucho tiempo, `Infrastructure Monitoring` podría tener `Not Detected` especificado, aunque tengas hosts o contenedores ejecutando la monitorización de la infraestructura. 

## Acceso y permisos basados en roles

Para obtener información general, consulta [Control de acceso basado en roles][3] y [Permisos de roles][4].

### Permiso de lectura

El permiso de lectura de Software Catalog permite a un usuario leer los datos de Software Catalog, lo que habilita las siguientes funciones:
- Lista de Software Catalog
- Interfaz de usuario de detección
- Endpoint de definición de servicio: `/api/v2/services/definition/<service_name>`

El permiso está habilitado por defecto en los roles **Datadog Read Only Role** (Rol de sólo lectura de Datadog) y **Datadog Standard Role** (Rol estándar de Datadog).

### Autorización por escrito

El permiso de escritura de Software Catalog permite a un usuario modificar los datos de Software Catalog. El permiso de escritura es necesario para las siguientes funciones:
- Inserción o actualización de una definición de servicio con el endpoint `POST /api/v2/services/definitions` 
- Eliminación de una definición de servicio con el endpoint `DELETE /api/v2/services/definition/<service_name>` 
- Finalización del proceso de incorporación en la Interfaz de usuario de Detección de servicios
- Actualización de los metadatos de servicio en la interfaz de usuario

El permiso está habilitado por defecto en los roles **Datadog Admin Role** (Rol de administrador de Datadog) y **Datadog Standard Role** (Rol estándar de Datadog).

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/internal_developer_portal/software_catalog/entity_model
[2]: https://app.datadoghq.com/software
[3]: /es/account_management/rbac
[4]: /es/account_management/rbac/permissions