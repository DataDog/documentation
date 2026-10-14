---
description: Envíe su propia inteligencia de amenazas a Cloud SIEM como paquetes STIX
  2.1. Cubre el punto de conexión de ingesta, la autenticación, los tipos y patrones
  de indicadores admitidos, las tablas de referencia que Datadog genera para cada
  tipo de indicador y cómo configurarlas o eliminarlas.
disable_toc: false
further_reading:
- link: /security/cloud_siem/ingest_and_enrich/threat_intelligence/
  tag: Documentación
  text: Traiga su propia inteligencia de amenazas a Cloud SIEM
- link: /security/threat_intelligence/
  tag: Documentación
  text: Inteligencia de amenazas en Datadog Security
- link: /security/cloud_siem/triage_and_investigate/ioc_explorer/
  tag: Documentación
  text: Investigue indicadores con el explorador de IOC
- link: /reference_tables/
  tag: Documentación
  text: Cree y administre tablas de referencia
title: Ingiera inteligencia de amenazas STIX
---
## Descripción general {#overview}

Si su organización mantiene inteligencia de amenazas en una Plataforma de Inteligencia de Amenazas (TIP), puede enviarla a Cloud SIEM como paquetes [STIX 2.1][1]. Cloud SIEM utiliza los indicadores ingeridos para [enriquecer sus registros][2] y los muestra en el [Explorador de IOC][3].

Utilice la ingesta STIX cuando su plataforma ya produzca STIX, o cuando desee que un script o trabajo programado envíe actualizaciones incrementales. Para cargar indicadores como archivos CSV o sincronizarlos desde el almacenamiento en la nube, consulte [Bring your own threat intelligence to Cloud SIEM][2].

## Cómo funciona {#how-it-works}

Después de enviar un paquete STIX 2.1 al [punto de conexión de ingesta](#send-indicators), Datadog lo procesa de la siguiente manera. No se requiere configuración previa en Datadog.

1. Datadog identifica la fuente a partir del encabezado `ti_vendor` requerido.
2. Datadog genera una [tabla de referencia][4] para cada tipo de indicador en su fuente, llamada `threat_intel_stix_<TI_VENDOR>_<INDICATOR_TYPE>`. Debido a que un paquete puede contener varios tipos de indicadores, una sola solicitud puede completar varias tablas.
3. Datadog registra cada tabla generada y la habilita automáticamente para el enriquecimiento de Cloud SIEM.
4. Las solicitudes posteriores para la misma `ti_vendor` actualizan las tablas existentes y conservan las opciones de configuración que realice.

Por ejemplo, una fuente enviada con `ti_vendor: acme` que contiene indicadores de dirección IP, dominio y SHA-256 produce las siguientes tablas:

| Tipo de indicador | Tabla de referencia generada |
|---|---|
| Dirección IP | `threat_intel_stix_acme_ip_address` |
| Dominio | `threat_intel_stix_acme_domain` |
| Hash de archivo SHA-256 | `threat_intel_stix_acme_sha256` |

Las tablas estarán disponibles unos minutos después de su primera solicitud. El enriquecimiento se aplica a los logs que Cloud SIEM recibe después de habilitar una tabla, por lo que no se aplica a los logs recibidos anteriormente.

## Requisitos previos {#prerequisites}

- Cloud SIEM está habilitado para su organización.
- Una [API key][5] de Datadog y una [clave de aplicación][6]. La clave de aplicación debe tener el permiso de escritura en tablas de referencia.

## Enviar indicadores {#send-indicators}

`POST https://api.{{< region-param key="dd_site" >}}/api/v2/security/threat-intel/stix`

<div class="alert alert-info">La URL del punto de conexión varía según el sitio. Utilice el sitio de Datadog correcto para su organización.</div>

### Encabezados {#headers}

| Encabezado | Requerido | Descripción |
|---|---|---|
| `DD-API-KEY` | Sí | Su clave de API de Datadog. |
| `DD-APPLICATION-KEY` | Sí | Una clave de aplicación con el permiso de escritura en tablas de referencia. |
| `ti_vendor` | Sí | Identifica la fuente; por ejemplo, el nombre de su plataforma. Utilice 10 caracteres o menos, solo con letras minúsculas y dígitos. |
| `Content-Type` | Sí | `application/json` |
| `Content-Encoding` | No | Establecer en `gzip` para enviar un cuerpo comprimido. No se admiten otras codificaciones. |

### Cuerpo de la solicitud {#request-body}

El cuerpo es un `bundle` de STIX 2.1 de objetos STIX. Cada solicitud es un lote incremental, y un paquete puede mezclar indicadores de diferentes tipos.

```json
{
  "type": "bundle",
  "id": "bundle--0cde353c-ea5b-4668-9f68-9c3a0e2a0a0e",
  "objects": [
    {
      "type": "indicator",
      "spec_version": "2.1",
      "id": "indicator--a932fcc6-e032-476c-826f-cb970a5a1fff",
      "pattern_type": "stix",
      "pattern": "[ipv4-addr:value = '198.51.100.1']",
      "indicator_types": ["malicious-activity"],
      "valid_from": "2026-01-01T00:00:00Z",
      "valid_until": "2026-12-31T00:00:00Z"
    }
  ]
}
```

El punto de conexión tiene los siguientes requisitos y límites:

- El paquete debe ser STIX 2.1. Si el paquete contiene un `spec_version` distinto de `2.1`, Datadog rechaza la solicitud. Si un objeto individual contiene un `spec_version` distinto de `2.1`, Datadog omite ese objeto.
- El tamaño máximo del cuerpo de la solicitud es de 50 MB.

### Tipos de indicadores y patrones admitidos {#supported-indicator-types-and-patterns}

Datadog lee el `pattern` de STIX en cada indicador para determinar su tipo y valor. Cloud SIEM ingiere direcciones IP (tanto IPv4 como IPv6), dominios y hashes de archivo SHA-256.

Datadog extrae valores exactos de las comparaciones `=` y `IN`. También acepta expresiones `OR` e importa cada valor como un indicador independiente. `AND` entre expresiones entre corchetes no es compatible.

```json
"pattern": "[ipv4-addr:value = '198.51.100.1'] OR [domain-name:value IN ('example.com', 'example.net')]"
```

Los patrones que utilizan negación, rangos, coincidencia con comodines, coincidencia con expresiones regulares, relaciones de subred, verificaciones de existencia, calificadores temporales o `FOLLOWEDBY` no son compatibles. Si alguna parte de un patrón utiliza una expresión no compatible, Datadog omite el objeto indicador.

La respuesta cuenta los objetos no compatibles como `unsupported` y los patrones que no se pueden analizar como `invalid`. Verifique estos conteos para confirmar cuánto de su fuente se ingirió.

### Cómo se asignan los campos STIX a las columnas de la tabla de referencia {#how-stix-fields-map-to-reference-table-columns}

| Columna de la tabla de referencia | Completada desde |
|---|---|
| Valor del indicador | El valor extraído del `pattern` del indicador. |
| `intention` | El campo `indicator_types`. `malicious-activity` se asigna a `malicious`; `benign` se asigna a `benign`; y cualquier otro valor, o un campo ausente, se asigna a `suspicious`. |
| `source` | El encabezado `ti_vendor`, almacenado como `{"name": "<TI_VENDOR>"}`. |
| `category` | Establecer en `custom`. |
| `additional_data` | Los campos STIX que no tienen una columna dedicada, incluidos `stix_id`, `created`, `modified`, `valid_from`, `confidence`, `labels`, `indicator_types`, `object_marking_refs`, `kill_chain_phases` y `external_references`. |

El campo opcional `valid_until` establece una caducidad para el indicador, y Datadog elimina el indicador después de ese tiempo. Un indicador enviado sin `valid_until` no caduca automáticamente.

### Actualizar y revocar indicadores {#update-and-revoke-indicators}

- Para actualizar los detalles de un indicador, envíe el indicador nuevamente con los campos actualizados. Datadog sobrescribe la fila existente para ese valor de indicador.
- Para eliminar un indicador, envíelo con `"revoked": true`. Datadog elimina el indicador de la tabla de referencia.

Enviar el mismo paquete más de una vez no crea filas duplicadas.

### Respuesta {#response}

Una solicitud exitosa devuelve `200 OK` y un resumen de cómo Datadog procesó el paquete:

```json
{
  "data": {
    "type": "threat-intel-stix-ingest",
    "id": "acme",
    "attributes": {
      "accepted": 3,
      "unsupported": 1,
      "invalid": 0
    }
  }
}
```

| Atributo | Descripción |
|---|---|
| `accepted` | La cantidad de objetos de indicador admitidos que Datadog aceptó para su procesamiento. Este conteo incluye nuevos indicadores, actualizaciones y revocaciones. Un objeto puede producir más de un indicador cuando su patrón utiliza `IN` o `OR`. |
| `unsupported` | La cantidad de objetos indicadores que Datadog omitió porque su tipo, patrón o versión de STIX a nivel de objeto no es compatible. |
| `invalid` | La cantidad de objetos indicadores cuyo patrón Datadog no pudo analizar. |

Una respuesta `200` significa que Datadog aceptó el paquete. Los indicadores no compatibles e inválidos aparecen en estos conteos en lugar de causar que la solicitud falle. Verifique los conteos para confirmar que su fuente se ingirió como se esperaba.

### Ejemplo de solicitud {#example-request}

```shell
curl -X POST "https://api.{{< region-param key="dd_site" code="true" >}}/api/v2/security/threat-intel/stix" \
  --header "DD-API-KEY: <DATADOG_API_KEY>" \
  --header "DD-APPLICATION-KEY: <DATADOG_APP_KEY>" \
  --header "Content-Type: application/json" \
  --header "ti_vendor: acme" \
  --data '{
    "type": "bundle",
    "id": "bundle--0cde353c-ea5b-4668-9f68-9c3a0e2a0a0e",
    "objects": [
      {
        "type": "indicator",
        "spec_version": "2.1",
        "id": "indicator--a932fcc6-e032-476c-826f-cb970a5a1fff",
        "pattern_type": "stix",
        "pattern": "[ipv4-addr:value = '198.51.100.1']",
        "indicator_types": ["malicious-activity"],
        "valid_from": "2026-01-01T00:00:00Z"
      }
    ]
  }'
```

Para enviar una fuente grande de manera más eficiente, comprima el cuerpo y establezca `Content-Encoding: gzip`.

### Límites de tasa {#rate-limits}

El punto de conexión acepta 10 solicitudes por segundo para cada clave de API. Las solicitudes que exceden ese límite reciben una respuesta `429 Too Many Requests`.

### Respuestas de error {#error-responses}

| Estado | Motivo |
|---|---|
| `400 Bad Request` | El cuerpo no es un JSON válido, el paquete contiene un `spec_version` distinto de `2.1`, falta el encabezado `ti_vendor` o no es válido, o el `Content-Encoding` no es compatible. |
| `401 Unauthorized` | La solicitud no contiene credenciales válidas. |
| `403 Forbidden` | La clave de aplicación no tiene el permiso de escritura en tablas de referencia. |
| `413 Request Entity Too Large` | El cuerpo de la solicitud es mayor a 50 MB. |
| `429 Too Many Requests` | La solicitud excedió el límite de tasa para la clave de API. |

## Configure las tablas de referencia generadas {#configure-the-generated-reference-tables}

Administre las tablas que genera la ingesta en la página de configuración de [Threat Intelligence][7]. Cada tabla tiene un interruptor que controla si Cloud SIEM la utiliza para enriquecer los registros. Utilice esa página para revisar qué fuentes están activas, para deshabilitar una fuente temporalmente o para habilitar una tabla que la ingesta dejó deshabilitada.

Sus configuraciones de enriquecimiento tienen prioridad sobre la ingesta. Después de que existe una tabla, las solicitudes posteriores agregan y actualizan indicadores, pero nunca cambian el interruptor de enriquecimiento. Una tabla que usted deshabilita permanece deshabilitada hasta que la habilite de nuevo.

La ingesta de STIX administra las filas en las tablas de referencia generadas. Los cambios manuales en esas filas no se conservan y se sobrescriben mediante solicitudes de ingesta posteriores. Para agregar, actualizar o eliminar indicadores, envíe los cambios a través del punto de conexión de ingesta de STIX.

Para inspeccionar los indicadores ingeridos, abra la tabla desde [Reference Tables][8] o busque los indicadores en el [IOC Explorador][3].

### Si alcanza el límite de tablas de referencia {#if-you-reach-the-reference-table-limit}

Cloud SIEM enriquece los registros con hasta 10 tablas de referencia de inteligencia de amenazas a la vez. Si la ingesta genera una tabla mientras su organización ya alcanzó ese límite, Datadog crea y completa la tabla de todos modos. No habilita la tabla para el enriquecimiento automáticamente, y la tabla aparece en la página [Threat Intelligence][7] en un estado deshabilitado.

Para habilitar dicha tabla, deshabilite una tabla que ya no necesite en la página [Threat Intelligence][7] y luego habilite la nueva.

## Deje de ingerir una fuente {#stop-ingesting-a-feed}

Sus solicitudes dirigen la ingesta, por lo que eliminar una fuente requiere dos pasos, en este orden:

1. Deje de enviar paquetes para esa `ti_vendor`.
2. Elimine las tablas de referencia que Datadog generó para la fuente desde [Reference Tables][8].

Complete los pasos en ese orden. Si elimina una tabla mientras siguen llegando solicitudes para la misma `ti_vendor`, la siguiente solicitud genera la tabla nuevamente.

Para dejar de enriquecer registros sin eliminar nada, deshabilite las tablas en la página de [Threat Intelligence][7] en su lugar. Esto mantiene los indicadores ingeridos disponibles para el IOC Explorador y le permite reanudar el enriquecimiento más tarde.

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.oasis-open.org/cti/stix/v2.1/os/stix-v2.1-os.html
[2]: /es/security/cloud_siem/ingest_and_enrich/threat_intelligence/
[3]: /es/security/cloud_siem/triage_and_investigate/ioc_explorer/
[4]: /es/reference_tables/
[5]: /es/account_management/api-app-keys/#api-keys
[6]: /es/account_management/api-app-keys/#application-keys
[7]: https://app.datadoghq.com/security/configuration/threat-intel
[8]: https://app.datadoghq.com/reference-tables