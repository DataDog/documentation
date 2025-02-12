---
algolia:
  tags:
  - catálogo de servicios
aliases:
- /es/tracing/faq/service_catalog/
- /es/tracing/services/services_list/
- /es/tracing/visualization/services_list/
- /es/tracing/service_catalog/
further_reading:
- link: /tracing/service_catalog/service_definition_api/
  tag: Documentación
  text: Registro de servicios con la API de definición de servicio
- link: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/service_definition_yaml
  tag: Sitio externo
  text: Crear y gestionar definiciones de servicio con Terraform
- link: /tracing/service_catalog/guides/upstream-downstream-dependencies
  tag: Guía
  text: Ver dependencias ascendentes y descendentes durante una incidencia activa
- link: https://www.datadoghq.com/blog/manage-service-catalog-categories-with-service-definition-json-schema/
  tag: Blog
  text: Gestionar las entradas del Catálogo de servicios con el esquema JSON de la
    definición de servicios
- link: https://www.datadoghq.com/blog/apm-security-view/
  tag: Blog
  text: Obtener visibilidad sobre riesgos, vulnerabilidades y ataques con la vista
    de seguridad de APM
- link: https://www.datadoghq.com/blog/service-catalog-setup/
  tag: Blog
  text: Añadir fácilmente etiquetas (tags) y metadatos a tus servicios mediante la
    configuración simplificada del Catálogo de servicios
- link: https://www.datadoghq.com/blog/github-actions-service-catalog/
  tag: Blog
  text: Yo utilizo acciones de GitHub para el Catálogo de servicios de Datadog, y
    tú también deberías hacerlo.
- link: https://www.datadoghq.com/blog/shift-left-datadog-service-catalog/
  tag: Blog
  text: Mejorar tu capacidad de observación del desplazamiento a la izquierda con
    el Catálogo de servicios de Datadog
- link: https://www.datadoghq.com/blog/service-ownership-best-practices-datadog/
  tag: Blog
  text: Prácticas recomendadas para la propiedad integral del servicio con el Catálogo
    de servicios de Datadog
- link: https://www.datadoghq.com/blog/service-catalog-schema-v3/
  tag: Blog
  text: Mejorar la experiencia y la colaboración de los desarrolladores con el esquema
    del Catálogo de servicios versión 3.0
- link: https://www.datadoghq.com/blog/memory-leak-workflow/
  tag: Blog
  text: Investiga las fugas de memoria y los errores OOMs (sin memoria) con el flujo
    de trabajo guiado de Datadog.
title: Catálogo de servicios de Datadog
---

{{< img src="tracing/service_catalog/service_catalog_updated.mp4" video=true alt="Navegación por el Catálogo de servicios" style="width:100%;" >}}

## Información general

El [Catálogo de servicios][1] de Datadog proporciona una visión consolidada de tus servicios, combinando metadatos de propiedad, perspectivas de rendimiento, análisis de seguridad, asignación de costes y mucho más. Facilita que las organizaciones consigan la propiedad integral del servicio a escala, obtengan información sobre el rendimiento en tiempo real, detecten y aborden los riesgos de fiabilidad y seguridad, y gestionen las dependencias de las aplicaciones, todo en un único lugar.

{{< callout url="https://www.datadoghq.com/product-preview/internal-developer-portal/" d_target="#signupModal" btn_hidden="false" header="Suscríbete para obtener una vista previa de nuestro Portal para desarrolladores" >}}
{{< /callout >}}

### Casos prácticos

#### Gobernanza y optimización
- Proporciona a la dirección de ingeniería una visión clara de las prácticas recomendadas en todos los equipos y servicios a través de [Planillas de servicio][9].
- Reduce los riesgos de las aplicaciones encontrando y solucionando vulnerabilidades de seguridad conocidas en las dependencias de tus servicios.
- Comprende las tendencias e identificar las ineficiencias en los costes relacionados con tus servicios.

#### Evaluar la cobertura de monitorización 
- Detecta cuáles servicios no comunican datos de observabilidad o no los controlan.
- Facilita [prácticas recomendadas de etiquetado][6] y comprueba las configuraciones recomendadas para optimizar [las perspectivas de telemetría cruzada][7].
- Detecta problemas como falta de SLO, monitores o servicios sin titularidad.

#### Agilizar la colaboración durante las incidencias
- Mejora de la experiencia de atención continuada para todos mediante el establecimiento de canales correctos de información y comunicación sobre la propiedad, junto con un acceso simplificado a la monitorización y a los datos para solucionar problemas.
- Incorporación de enlaces a soluciones y herramientas de solucionar problemas, como manuales de ejecución y documentación, directamente en las herramientas de observabilidad que ya utilizan los ingenieros.
- Aceleración de la recuperación ante incidencias aumentando la confianza y simplificando la localización de propietarios de servicios y dependencias ascendentes y descendentes.


## Para empezar

{{< whatsnext desc="Explorar qué tiene para ofrecer el Catálogo de servicios:" >}}
    {{< nextlink href="/service_catalog/navigating/" >}}Navegar el Catálogo de servicios{{< /nextlink >}}
    {{< nextlink href="/service_catalog/investigating" >}}Investigar un servicio{{< /nextlink >}}
{{< /whatsnext >}}

## Acceso y permisos basados en roles

Para obtener información general, consulta [Control de acceso basado en roles][2] y [Permisos de roles][3].
### Permiso de lectura

El permiso de lectura del Catálogo de servicios permite a un usuario leer los datos del Catálogo de servicios, lo que habilita las siguientes funciones:
- Lista del Catálogo de servicios
- Interfaz de usuario de detección
- Endpoint de definición de servicio: `/api/v2/services/definition/<service_name>`

El permiso está habilitado por defecto en los roles **Datadog Read Only Role** (Rol de sólo lectura de Datadog) y **Datadog Standard Role** (Rol estándar de Datadog).

### Autorización por escrito

El permiso de escritura del Catálogo de servicios permite a un usuario modificar los datos del Catálogo de servicios. El permiso de escritura es necesario para las siguientes funciones:
- Inserción o actualización de una definición de servicio con el endpoint `POST /api/v2/services/definitions` 
- Eliminación de una definición de servicio con el endpoint `DELETE /api/v2/services/definition/<service_name>` 
- Finalización del proceso de incorporación en la Interfaz de usuario de Detección de servicios
- Actualización de los metadatos de servicio en la interfaz de usuario

El permiso está habilitado por defecto en los roles **Datadog Admin Role** (Rol de administrador de Datadog) y **Datadog Standard Role** (Rol estándar de Datadog).

{{< site-region region="gov" >}}
## Tipos de servicios

Cada servicio monitorizado se asocia a un tipo. Datadog determina automáticamente este tipo según el atributo `span.type` adjunto a los datos de tramos (spans) entrantes. El tipo especifica el nombre de la aplicación o marco con el que el Datadog Agent se está integrando.

Por ejemplo, si utilizas la integración de Flask oficial, el `Type` aparece como "Web". Si estás monitorizando una aplicación personalizada, el `Type` aparece como "Custom" (Personalizado).

El tipo de servicio puede ser uno de los siguientes:

*  Caché
*  Personalizado
*  BASE DE DATOS
*  Función serverless
*  Web

Algunas integraciones se asocian a diversos tipos. Por ejemplo, Postgres, MySQL y Cassandra apuntan al tipo "DB". Las integraciones  Redis y Memcache apuntan al tipo "Cache".
{{< /site-region >}}
{{< site-region region="ap1,us3,us5,eu,us" >}}
## Filtrado de entradas del catálogo de servicios por componente

Cada entrada que aparece en el Catálogo de servicios se clasifica como un tipo de componente:

*  Servicios
*  Almacenes de datos
*  Colas
*  Aplicaciones RUM
*  Proveedores externos
*  Endpoints

{{< img src="tracing/service_catalog/select-component.png" alt="Selector de componentes del Catálogo de servicios" style="width:30%;" >}}

Datadog rellena las entradas del Catálogo de servicios y determina su tipo de componente asociado basándose en atributos de tramos recopilados de ([etiquetas iguales][10]) de APM, pero también en otros tipos de telemetrías recopiladas (USM, DSM, RUM, etc...).

**Nota**: Este componente sustituye al filtro `type` (derivado del atributo de tramo `span.type`), ya que detecta de forma más fiable y granular los distintos tipos de entidades. Por ejemplo, puedes filtrar por tecnología de almacén de datos utilizando la faceta `datastore type`.

[10]: /es/tracing/services/inferred_services#peer-tags
{{< /site-region >}}

## Conservación de datos
Los servicios y las estadísticas de recursos, y los resúmenes de tramo en la **Lista de servicio** y **Página de servicios** se conservan hasta 30 días. Para consultas personalizadas en métricas de trazas de APM, utiliza Metric Explorer. [Más información sobre la conservación de datos en APM][4].

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/services
[2]: /es/account_management/rbac/
[3]: /es/account_management/rbac/permissions/
[4]: /es/developers/guide/data-collection-resolution-retention/
[5]: /es/tracing/service_catalog/adding_metadata#service-definition-schema-v22
[6]: https://www.datadoghq.com/blog/tagging-best-practices/#assign-owners-to-services-with-tags
[7]: /es/tracing/other_telemetry/
[8]: /es/service_catalog/add_metadata#metadata-schema-v30-beta
[9]: /es/service_catalog/scorecards/