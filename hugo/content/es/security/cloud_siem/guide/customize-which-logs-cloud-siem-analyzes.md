---
aliases:
- /es/security_monitoring/guide/how-to-setup-security-filters-using-security-monitoring-api/
- /es/security_platform/guide/how-to-setup-security-filters-using-security-monitoring-api/
- /es/security_monitoring/guide/how-to-setup-security-filters-using-cloud-siem-api/
- /es/cloud_siem/guide/how-to-setup-security-filters-using-security-monitoring-api/
- /es/security_platform/guide/how-to-setup-security-filters-using-cloud-siem-api/
- /es/security_platform/cloud_siem/guide/how-to-setup-security-filters-using-cloud-siem-api/
- /es/security/guide/how-to-setup-security-filters-using-security-monitoring-api/
- /es/security/cloud_siem/guide/how-to-setup-security-filters-using-cloud-siem-api/
description: Personalice qué registros ingeridos analiza Cloud SIEM configurando Security
  Filters o filtros de índice de registro. Cubre el producto de Cloud SIEM que se
  aplica a su organización, la configuración de UI y API, los campos de filtro admitidos
  y no admitidos, y los patrones comunes para AWS, Azure, Google Cloud, proveedores
  de identidad y más.
further_reading:
- link: /security/detection_rules/
  tag: Documentación
  text: Reglas de detección
- link: /security/cloud_siem/ingest_and_enrich/content_packs
  tag: Documentación
  text: Paquetes de contenido
- link: /security/cloud_siem/guide/determine-cloud-siem-product/
  tag: Documentación
  text: Determine el producto de Cloud SIEM que está utilizando su organización
title: Personalice qué registros analiza Cloud SIEM
---
## Descripción general {#overview}

Cloud SIEM analiza los registros ingeridos para detectar amenazas mediante [reglas de detección][1]. La mayoría de las organizaciones dependen de [Content Packs][7] para administrar qué registros analiza Cloud SIEM; cada Content Pack incluye filtros predefinidos para la fuente de registro que cubre. Si necesita un control más granular (por ejemplo, para excluir un entorno o restringir el análisis a un conjunto de registro personalizado), configure el filtrado de registro directamente.

## Herramientas de filtrado y métodos de configuración {#filtering-tools-and-configuration-methods}

Las herramientas de filtrado y los métodos de configuración disponibles dependen de su producto de Cloud SIEM:

| Producto de Cloud SIEM    | Herramienta de filtrado                           | Métodos de configuración                                                                                                 |
|-----------------------|------------------------------------------|-----------------------------------------------------------------------------------------------------------------------|
| Independiente            | Filtros de índice de registro (no filtros de seguridad) | [Interfaz de usuario de configuración de registro](#cloud-siem-standalone-filter-the-cloud-siem-index)                                            |
| Complemento con Flex Logs | Filtros de seguridad | [UI](#configure-security-filters-in-the-ui-add-on-with-flex-logs) y [API](#configure-security-filters-with-the-api) |
| Heredado                | Filtros de seguridad                         | [API](#configure-security-filters-with-the-api)                                                                       |

Standalone con 12 meses de retención es el producto predeterminado para las nuevas organizaciones de Cloud SIEM. Si no está seguro de qué producto de Cloud SIEM utiliza su organización, consulte [Determine el producto de Cloud SIEM que utiliza su organización][2].

<div class="alert alert-info">Los filtros de seguridad y los filtros de índice de registro controlan solo los registros analizados por Cloud SIEM. Los registros generados por el Datadog Agent para Workload Protection (<code>source:runtime-security-agent</code>) y Cloud Security Misconfigurations (<code>source:compliance-agent</code>) no se facturan como registros analizados independientemente de la configuración del filtro.</div>

### Cloud SIEM Standalone: filtre el índice de Cloud SIEM {#cloud-siem-standalone-filter-the-cloud-siem-index}

Cloud SIEM Standalone no utiliza filtros de seguridad. Las organizaciones independientes controlan qué registros analiza Cloud SIEM configurando un filtro de índice en el índice de registro de Cloud SIEM.

Un filtro de índice es una consulta que especifica qué registros entran en el índice. Los registros que no coinciden con el filtro no se indexan y, por lo tanto, no son analizados por Cloud SIEM. La sintaxis de consulta es la misma que la sintaxis estándar de búsqueda de registros de Datadog.

Para obtener instrucciones de configuración completas, consulte [Filtros de índices][3] en la documentación de Configuración de registros.

**Esta guía no se aplica a Cloud SIEM Standalone.**

## Cómo funcionan los filtros de seguridad {#how-security-filters-work}

Los filtros de seguridad especifican qué registros ingeridos analiza Cloud SIEM. Cloud SIEM evalúa cada registro ingerido frente a todos los filtros de seguridad habilitados.

Los filtros de seguridad son **inclusivos**: Datadog analiza un registro si este coincide con al menos un filtro de seguridad habilitado y no es eliminado por una exclusión en ese filtro. Un filtro de seguridad tiene tres partes:

- Una **consulta** que selecciona los registros que coinciden con el filtro.
- Cero o más **filtros de exclusión**, cada uno con su propia consulta. Un registro que coincide con la consulta principal se elimina del análisis si también coincide con alguna consulta de exclusión.
- Un **estado** (activo o inactivo). Los filtros inactivos son ignorados por Cloud SIEM, pero permanecen guardados para su uso posterior.

Cloud SIEM etiqueta cada registro ingerido con `datadog.cloud_siem:true` o `datadog.cloud_siem:false`, según si los filtros de seguridad seleccionaron el registro para su análisis. Puede usar esta etiqueta en el Explorador de registros para verificar el efecto de sus filtros de seguridad en cualquier registro específico.

### Limitaciones en las consultas de los filtros de seguridad {#limitations-on-security-filter-queries}

Datadog evalúa los filtros de seguridad antes de que Cloud SIEM aplique el enriquecimiento de geoIP, inteligencia de amenazas y observables de OCSF. Los campos que el enriquecimiento completa no están presentes en el registro cuando los Filtros de seguridad lo evalúan, por lo que las consultas de los Filtros de seguridad no pueden hacer referencia a ellos de manera confiable. La restricción se aplica de dos maneras distintas:

- **Campos no presentes en el momento de la evaluación del filtro.** Estos campos se completan solo mediante el enriquecimiento estándar de Cloud SIEM, que se ejecuta después de los Filtros de seguridad. Una consulta de Filtro de seguridad que hace referencia a uno de estos campos no coincide con ningún registro.
  - `network.ip.list`
  - `network.ip.attributes`
  - `network.client.is_private_network_ip`
  - `network.destination.is_private_network_ip`
  - `ocsf.observables`
  - `ocsf.type_uid`

  Para filtrar estas categorías de datos, reescriba la consulta utilizando atributos presentes en el momento de la ingesta, como `source`, `service`, `host`, etiquetas y atributos de registro analizados.

- **Campos cuya disponibilidad depende de la configuración de la canalización.** Estos campos pueden ser completados por un procesador de canalización de registros (antes de los Filtros de seguridad) o por el enriquecimiento estándar de Cloud SIEM (después de los Filtros de seguridad). Si una consulta de Filtro de seguridad contra uno de estos campos funciona depende de si el procesador de canalización correspondiente está configurado.
  - `network.client.geoip` (y subatributos como `network.client.geoip.country.iso_code`)
  - `threat_intel.results`
  - `threat_intel.indicators_matched`

  Para que estos campos estén disponibles para las consultas de Filtros de seguridad, configure el procesador de enriquecimiento GeoIP o Threat Intel Enrichment correspondiente en su [Logs Pipeline][8]. Con el procesador en su lugar, los campos se completan antes de que se ejecuten los Filtros de seguridad.

El enriquecimiento geoIP de Cloud SIEM utiliza el mismo GeoIPFilter y la misma base de datos IPinfo que un procesador GeoIP de Pipeline, por lo que los datos geoIP son idénticos independientemente de la ruta que los complete. La solución alternativa de Threat Intel es diferente: un procesador Threat Intel Enrichment de Pipeline utiliza sus propias fuentes de threat intel (consulte [Bring your own threat intelligence][9] para obtener orientación sobre la configuración), lo que produce un conjunto de coincidencias distinto al del Threat Intel integrado de Cloud SIEM, administrado por Datadog. Si depende de Threat Intel integrado de Cloud SIEM, la coincidencia no se puede mover antes de los Security Filters.

La evaluación previa al enriquecimiento se aplica solo a los Security Filters. Las reglas de detección, las reglas de supresión y las consultas de señales se ejecutan contra el registro posterior al enriquecimiento y pueden seguir haciendo referencia a estos campos.

## Configurar Security Filters en la UI (Complemento con Flex Logs) {#configure-security-filters-in-the-ui-add-on-with-flex-logs}

**Se aplica a:** Cloud SIEM Add-on with Flex Logs. Las organizaciones de Cloud SIEM Legacy deben configurar los Security Filters a través de la [API](#configure-security-filters-with-the-api).

<div class="alert alert-info">Para la mayoría de los casos de uso, la forma más fácil de administrar qué registros analiza Cloud SIEM es habilitando o deshabilitando <a href="/security/cloud_siem/ingest_and_enrich/content_packs">Content Packs</a>. Cada Content Pack administra su propio Security Filter, por lo que activar o desactivar un Content Pack agrega o elimina el filtro correspondiente automáticamente. La interfaz de usuario de Security Filters descrita a continuación se proporciona para el ajuste preciso y el control personalizado de registros más allá de lo que cubren los Content Packs.</div>

La sección {{< ui >}}Security Filters Configuration{{< /ui >}} enumera cada Security Filter, su consulta, sus exclusiones y si está activo actualmente. Un panel {{< ui >}}Preview{{< /ui >}} en la parte inferior de la sección transmite los registros que llegan al análisis de Cloud SIEM después de que se aplica cada filtro habilitado. Utilice el panel {{< ui >}}Preview{{< /ui >}} para validar que su configuración de filtro produzca el resultado esperado.

{{< img src="security/cloud_siem/guide/siem_settings_page_security_filters.png" alt="La sección Security Filters Configuration de la página de configuración de Cloud SIEM, que muestra una lista de filtros configurados con columnas para Name, Filters y Active, seguida de un panel Preview que transmite los registros coincidentes" style="width:100%;" >}}

### Crear un Security Filter {#create-a-security-filter}

1. En Datadog, vaya a {{< ui >}}Security{{< /ui >}} > {{< ui >}}Cloud SIEM{{< /ui >}} > [**Settings**][4].
1. Desplácese hasta la sección **Security Filters Configuration** y haga clic en ella para expandirla.
1. En la sección **Security Filters Configuration**, haga clic en {{< ui >}}\+ New Security Filter{{< /ui >}}. {{< ui >}}New Security Filter{{< /ui >}}Se abre la ventana.
1. En la ventana **New Security Filter**, ingrese:
   - **Name:** Un nombre corto y descriptivo (por ejemplo, `AWS CloudTrail`).
   - **Query:** La consulta de registro que selecciona los registros que Cloud SIEM debe analizar (por ejemplo, `source:cloudtrail`).
   - **Filtros de exclusión** (opcional): Una o más consultas de exclusión que restan registros de la coincidencia del filtro. Para agregar una, haga clic en {{< ui >}}\+ New Exclusion Filter{{< /ui >}} e ingrese una consulta de exclusión.
   - **Filter status:** Establézcalo en {{< ui >}}Active{{< /ui >}} para habilitar el filtro al guardar.
1. Revise el panel **Preview** para confirmar que el filtro coincide con los registros que espera.
1. Haga clic en {{< ui >}}Save{{< /ui >}}.

{{< img src="security/cloud_siem/guide/siem_settings_add_security-filter_empty.png" alt="El cuadro de diálogo New Security Filter con los campos Name y Query vacíos, sin filtros de exclusión, Filter status establecido en Active y un panel Preview que muestra estadísticas de ingesta de registros en tiempo real" style="width:100%;" >}}

### Editar o desactivar un Security Filter {#edit-or-disable-a-security-filter}

1. En la sección **Security Filters Configuration**, haga clic en el **Edit** {{< img src="icons/pencil.png" inline="true" style="width:14px;">}} icono en la fila del filtro.
2. En el cuadro de diálogo **Edit Security Filter**, actualice el nombre, la consulta, las exclusiones o el estado del filtro.
3. Haga clic en {{< ui >}}Save{{< /ui >}}.

Para desactivar un filtro sin eliminarlo, establezca **Filter status** en inactivo. El filtro permanece guardado para que pueda volver a activarlo más tarde.

### Eliminar un Security Filter {#delete-a-security-filter}

En la sección **Security Filters Configuration**, haga clic en el icono **Delete** {{< img src="icons/delete.png" inline="true" style="width:14px;">}} en la fila del filtro y, a continuación, confirme la eliminación.

El filtro integrado `all ingested logs` no se puede eliminar, pero puede desactivarlo.

## Configurar Security Filters con la API {#configure-security-filters-with-the-api}

**Se aplica a:** Complemento de Cloud SIEM con Flex Logs y Cloud SIEM Legacy.

Al trabajar con la API, debe comprender qué versión de Cloud SIEM está utilizando. Las versiones afectan la lógica de los filtros de seguridad, y Cloud SIEM solo analiza los registros según la lógica de los filtros presentes.
- Para **Add-on with Flex Logs**, no hay Security Filters presentes cuando se incorpora por primera vez. Cada paquete de contenido que habilite agrega un Security Filter para que Cloud SIEM pueda analizar esos registros.
- **Legacy** funciona de manera diferente. Viene con un filtro predeterminado que permite analizar todos los registros. Datadog recomienda agregar filtros de exclusión al filtro predeterminado para reducir sus volúmenes de registros.

### Requisitos previos para la API de Cloud SIEM {#prerequisites-for-the-cloud-siem-api}

- Una clave de API y una clave de aplicación de un usuario administrador. Ambas están disponibles en su [página de claves de API de la cuenta de Datadog][5]. Reemplace `<DATADOG_API_KEY>` y `<DATADOG_APP_KEY>` en los ejemplos de esta sección con su clave de API y su clave de aplicación.
- `curl` instalado en la máquina que ejecuta los ejemplos. Para ver ejemplos en otros lenguajes, consulte la [documentación de la API de Security Monitoring][6].

<div class="alert alert-info">Varios de los payloads de la API de Security Filter incluyen un <code>version</code> atributo. <code>version</code> es opcional: si lo omite, la API actualiza la versión más reciente del filtro. Inclúyalo <code>version</code> cuando desee que la solicitud tenga éxito solo contra una versión conocida específica (por ejemplo, para evitar sobrescribir cambios simultáneos).</div>

### Cree un filtro de seguridad personalizado {#create-a-custom-security-filter}

Los Security Filters personalizados le indican a Cloud SIEM qué registros debe analizar. Esta llamada de ejemplo crea un filtro que coincide con `source:cloudtrail`, por lo que Cloud SIEM analiza los registros de AWS CloudTrail.

```bash
curl -L -X POST 'https://api.{{< region-param key="dd_site" code="true" >}}/api/v2/security_monitoring/configuration/security_filters' \
--header 'Content-Type: application/json' \
--header 'DD-API-KEY: <DATADOG_API_KEY>' \
--header 'DD-APPLICATION-KEY: <DATADOG_APP_KEY>' \
--data-raw '{
    "data": {
        "type": "security_filters",
        "attributes": {
            "is_enabled": true,
            "name": "cloudtrail",
            "exclusion_filters": [],
            "filtered_data_type": "logs",
            "query": "source:cloudtrail"
        }
    }
}'
```

Respuesta de ejemplo:

```json
{
    "data": {
        "attributes": {
            "is_enabled": true,
            "is_builtin": false,
            "name": "cloudtrail",
            "filtered_data_type": "logs",
            "exclusion_filters": [],
            "version": 1,
            "query": "source:cloudtrail"
        },
        "type": "security_filters",
        "id": "qa6-tzm-rp7"
    }
}
```

### Agregue una exclusión a un Security Filter existente {#add-an-exclusion-to-an-existing-security-filter}

Puede refinar los Security Filters existentes mediante filtros de exclusión. Estos son útiles para eliminar registros que la consulta del filtro principal procesaría de otro modo. Este ejemplo excluye los registros etiquetados como `env:staging`.

1. OBTENGA los Security Filters existentes para encontrar el `id` del filtro:
   ```bash
   curl -L -X GET 'https://api.{{< region-param key="dd_site" code="true" >}}/api/v2/security_monitoring/configuration/security_filters' \
   --header 'Content-Type: application/json' \
   --header 'DD-API-KEY: <DATADOG_API_KEY>' \
   --header 'DD-APPLICATION-KEY: <DATADOG_APP_KEY>'
   ```

   Example response:

   ```json
   {
       "data": [
           {
               "attributes": {
                   "is_enabled": true,
                   "is_builtin": true,
                   "name": "all ingested logs",
                   "filtered_data_type": "logs",
                   "exclusion_filters": [],
                   "version": 1,
                   "query": "*"
               },
               "type": "security_filters",
               "id": "l6l-rmx-mqx"
           }
       ]
   }
   ```

   En la respuesta de ejemplo, el filtro `id` es `l6l-rmx-mqx`. Cada organización tiene sus propios ID de filtro únicos, así que siempre obtenga el `id` actual antes de enviar un PATCH.
2. Aplique PATCH al filtro para agregar la exclusión. Reemplace `<FILTER_ID>` con el `id` devuelto por la solicitud de listar:
   ```bash
   curl -L -X PATCH 'https://api.{{< region-param key="dd_site" code="true" >}}/api/v2/security_monitoring/configuration/security_filters/<FILTER_ID>' \
   --header 'Content-Type: application/json' \
   --header 'DD-API-KEY: <DATADOG_API_KEY>' \
   --header 'DD-APPLICATION-KEY: <DATADOG_APP_KEY>' \
   --data-raw '{
       \"data\": {"
           "attributes": {
                "exclusion_filters": [
                   {
                       "query": "env:staging",
                       "name": "exclude env:staging"
                   }
               ],
               "version": 1
           },
           "type": "security_filters"
       }
   }'
   ```

   Example response:

   ```json
   {
       "data": {
           "attributes": {
               "is_enabled": true,
               "is_builtin": true,
               "name": "all ingested logs",
               "filtered_data_type": "logs",
               "exclusion_filters": [
                   {
                       "query": "env:staging",
                       "name": "exclude env:staging"
                   }
               ],
               "version": 2,
               "query": "*"
           },
           "type": "security_filters",
           "id": "<FILTER_ID>"
       }
   }
   ```

### Deshabilitar un Security Filter {#disable-a-security-filter}

Puede habilitar y deshabilitar Security Filters para controlar si se analizan sus registros asociados. Puede deshabilitar un Security Filter pero mantenerlo en su lista configurando su atributo `is_enabled` en `false`:

```bash
curl -L -X PATCH 'https://api.{{< region-param key="dd_site" code="true" >}}/api/v2/security_monitoring/configuration/security_filters/<FILTER_ID>' \
--header 'Content-Type: application/json' \
--header 'DD-API-KEY: <DATADOG_API_KEY>' \
--header 'DD-APPLICATION-KEY: <DATADOG_APP_KEY>' \
--data-raw '{
    "data": {
        "attributes": {
            "is_enabled": false
        },
        "type": "security_filters"
    }
}'
```

Respuesta de ejemplo:

```json
{
    "data": {
        "attributes": {
            "is_enabled": false,
            "is_builtin": true,
            "name": "all ingested logs",
            "filtered_data_type": "logs",
            "exclusion_filters": [
                {
                    "query": "env:staging",
                    "name": "exclude env:staging"
                }
            ],
            "version": 3,
            "query": "*"
        },
        "type": "security_filters",
        "id": "l6l-rmx-mqx"
    }
}
```

### Eliminar un Security Filter {#delete-a-security-filter-1}

Para eliminar un Security Filter personalizado, envíe una solicitud DELETE con el filtro `id`:

```bash
curl -L -X DELETE 'https://api.{{< region-param key="dd_site" code="true" >}}/api/v2/security_monitoring/configuration/security_filters/<FILTER_ID>' \
--header 'Content-Type: application/json' \
--header 'DD-API-KEY: <DATADOG_API_KEY>' \
--header 'DD-APPLICATION-KEY: <DATADOG_APP_KEY>'
```

Una solicitud exitosa devuelve `HTTP 204 No Content`.

## Solucionar problemas de Security Filters {#troubleshoot-security-filters}

Si un registro que espera que Cloud SIEM analice no está generando señales, realice estas verificaciones en orden:

1. **Verifique que los Security Filters seleccionaron el registro para su análisis.** Abra el registro en el Explorador de logs y verifique el valor de `datadog.cloud_siem`.
   - Si la etiqueta es `false`, el registro fue excluido por los Security Filters. Revise su conjunto de Security Filters y confirme que al menos un Security Filter habilitado coincida con el registro y que ninguna exclusión lo elimine.
   - Si la etiqueta es `true`, el registro fue seleccionado para su análisis y el problema se encuentra después de los Security Filters (por ejemplo, ninguna regla de detección coincidió).
2. **Verifique si su consulta de filtro hace referencia a un campo no admitido.** Consulte [Limitaciones en las consultas de Security Filters](#limitations-on-security-filter-queries).
   - Una consulta contra un campo que no está presente en el momento de la evaluación del Security Filter devuelve cero coincidencias.
   - Una consulta contra un campo cuya disponibilidad depende de la configuración de la canalización devuelve coincidencias solo cuando el procesador de canalización correspondiente está configurado.
3. **Valide el efecto combinado de todos los Security Filters.**
   - En la UI, expanda el panel **Preview** en la sección {{< ui >}}Security Filters Configuration{{< /ui >}} para transmitir los registros que llegan al análisis después de que se aplique cada Security Filter habilitado.
   - Con la API, envíe una solicitud `GET` para listar todos los Security Filters y revisar las cargas útiles `query` y `exclusion_filters` combinadas.

## Etiquetas y atributos útiles para consultas de Security Filters {#useful-tags-and-attributes-for-security-filter-queries}

Si restringe el análisis a categorías específicas de registros, tenga cuidado de no excluir registros que contengan usuarios, entidades o fuentes relevantes de Security. Las tablas de esta sección le permiten listar consultas comunes que puede usar o adaptar.

### Usuarios y entidades clave para consultas de Security Filters {#key-users-and-entities-for-security-filter-queries}

| Nombre              | Consulta                                           |
| ----------------- | ----------------------------------------------- |
| Todos los eventos con nombre  | `@evt.name:*`                                   |
| Todas las IPs de cliente    | `@network.client.ip:*`                          |
| Todas las IPs de destino | `@network.destination.ip:*`                   |
| Todos los usuarios | `@usr.id:* OR @usr.name:* OR @usr.email:*`      |
| Todos los hosts | `host:* OR instance-id:*`                       |

### Fuentes clave de Security para consultas de Security Filter {#key-security-sources-for-security-filter-queries}

| Nombre | Consulta |
| ----------------------- | ------------------------------------------------ |
| Registros de Security de AWS | `source:(cloudtrail OR guardduty OR route53)`    |
| Registros de red de AWS | `source:(vpc OR waf OR elb OR alb)`              |
| Registros de Google Cloud | `source:gcp*`                                    |
| Registros de Azure | `source:azure*`                                  |
| Registros de auditoría de Kubernetes | `source:kubernetes.audit`                        |
| Registros del proveedor de identidad | `source:(okta OR gsuite OR auth0)`               |
| Registros de CDN | `source:(cloudfront OR cloudflare OR fastly)`    |
| Registros del servidor web | `source:(nginx* OR apache OR iis)`               |

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/security/default_rules/#cat-cloud-siem
[2]: /es/security/cloud_siem/guide/determine-cloud-siem-product/
[3]: /es/logs/log_configuration/indexes/#indexes-filters
[4]: https://app.datadoghq.com/security/configuration/siem/setup
[5]: /es/account_management/api-app-keys/
[6]: /es/api/latest/security-monitoring/#get-all-security-filters
[7]: /es/security/cloud_siem/ingest_and_enrich/content_packs
[8]: /es/logs/log_configuration/pipelines/
[9]: /es/security/cloud_siem/ingest_and_enrich/threat_intelligence/