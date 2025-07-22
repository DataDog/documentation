---
aliases:
- /es/tracing/software_catalog/setup
- /es/software_catalog/setup
- /es/tracing/service_catalog/setup
- /es/service_catalog/setup
title: Configurar el Catálogo de software
---

El Catálogo de software de Datadog te proporciona un registro centralizado para realizar un seguimiento y gestionar tus componentes de software, como servicios, almacenes de datos, colas, aplicaciones frontend, API y más. Los atributos de los componentes, como equipos, servicios de guardia, libros de ejecución y enlaces a códigos fuente, se gestionan a través de las [definiciones de entidades][1], que son archivos de configuración YAML de estilo Kubernetes.

La función de [detección automática][2] del Catálogo de software significa que si eres un usuario existente de los productos APM, USM o RUM de Datadog, el Catálogo de software viene rellenado previamente con componentes monitorizados. Puedes ampliar el Catálogo de software rellenado automáticamente añadiendo otros componentes mediante la creación de definiciones de entidades para representar cualquier componente no monitorizado. 

Dependiendo de si ya eres usuario de APM, USM o RUM, puedes seguir una de las siguientes rutas de configuración.

## Nuevo en Datadog 

{{< whatsnext desc=" " >}}
    {{< nextlink href="/software_catalog/set_up/new_to_datadog#build-your-first-software-catalog" >}}Crear tu primer Catálogo de software{{< /nextlink >}}
    {{< nextlink href="/software_catalog/set_up/new_to_datadog#import-entries-from-backstage" >}}Importar entradas desde Backstage{{< /nextlink >}}
    {{< nextlink href="/software_catalog/set_up/new_to_datadog#import-entries-from-servicenow" >}}Importar entradas desde ServiceNow{{< /nextlink >}}
{{< /whatsnext >}}

## Usuario existente de Datadog 

{{< whatsnext desc=" " >}}
    {{< nextlink href="/software_catalog/set_up/existing_datadog_user#automatic-discovery-with-apm-usm-and-rum" >}}Usuarios de APM, USM y RUM{{< /nextlink >}}
    {{< nextlink href="/software_catalog/set_up/existing_datadog_user#discover-infrastructure-and-logs-services" >}}Usuarios de infraestructuras y logs{{< /nextlink >}}
{{< /whatsnext >}}

## Acceso y permisos basados en roles

Para obtener información general, consulta [Control de acceso basado en roles][2] y [Permisos de roles][3].
### Permiso de lectura

El permiso de lectura del Catálogo de software permite a un usuario leer los datos del Catálogo de software, lo que habilita las siguientes funciones:
- Lista del Catálogo de software
- Interfaz de usuario de detección
- Endpoint de definición de servicio: `/api/v2/services/definition/<service_name>`

El permiso está habilitado por defecto en los roles **Datadog Read Only Role** (Rol de sólo lectura de Datadog) y **Datadog Standard Role** (Rol estándar de Datadog).

### Autorización por escrito

El permiso de escritura del Catálogo de software permite a un usuario modificar los datos del Catálogo de software. El permiso de escritura es necesario para las siguientes funciones:
- Inserción o actualización de una definición de servicio con el endpoint `POST /api/v2/services/definitions` 
- Eliminación de una definición de servicio con el endpoint `DELETE /api/v2/services/definition/<service_name>` 
- Finalización del proceso de incorporación en la Interfaz de usuario de Detección de servicios
- Actualización de los metadatos de servicio en la interfaz de usuario

El permiso está habilitado por defecto en los roles **Datadog Admin Role** (Rol de administrador de Datadog) y **Datadog Standard Role** (Rol estándar de Datadog).

[1]: /es/software_catalog/service_definitions/
[2]: /es/software_catalog/set_up/existing_datadog_user/#automatic-discovery-with-apm-usm-and-rum