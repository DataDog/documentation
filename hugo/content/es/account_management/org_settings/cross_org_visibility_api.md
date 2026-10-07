---
is_beta: true
private: true
title: API de conexiones entre organizaciones
---

{{< callout url="#" header="false" btn_hidden="true">}}
  La visibilidad entre organizaciones está en <strong>fase beta privada</strong> para los clientes con planes Enterprise. Si estás interesado en esta función, ponte en contacto con tu asesor técnico de cuentas o tu asesor de clientes.
{{< /callout >}} 

La [Cross-organization visibility (visibilidad entre organizaciones)][1] permite a los clientes compartir datos entre diferentes organizaciones en la misma cuenta, y mostrar información de múltiples organizaciones en un solo lugar.

Este documento describe cómo configurar conexiones entre organizaciones a través de la API. Para configurar conexiones a través de la interfaz de usuario, consulte [cross-organization visibility (visibilidad entre organizaciones)][1].

## Endpoint de la API

Configurar conexiones a través del endpoint de la API pública `/api/v2/org_connections`. La clave de aplicación que utilices para autenticarte en el endpoint debe tener el permiso [`org_management`][2].

## Conexiones de lista

Enumera todas las conexiones en las que participa esta organización, ya sea como organización de origen o de destino.

<span style="padding:3px" class="font-semibold text-api-get bg-bg-api-get">GET</span>
https://{datadog_site}/api/v2/org_connections?api_key={datadog_api_key}&application_key={datadog_application_key}

## Crear una conexión

Crea una conexión desde esta organización a la organización de destino. Debes realizar esta operación en la organización de destino.

<span style="padding:3px" class="font-semibold text-api-post bg-bg-api-post">POST</span> https://{datadog_site}/api/v2/org_connections?api_key={datadog_api_key}&application_key={datadog_application_key}

**Nota:** La carga útil de esta llamada requiere el UUID de la organización de destino. Obtén el UUID de la organización de destino de "Enumera tus organizaciones gestionadas" [endpoint][3].

### Encabezado

Content-Type: application/json

### Carga útil

{{< code-block lang="json" collapsible="true" >}}
{
    "data": {
        "type": "org_connection",
        "relationships": {
            "sink_org": {
                "data": {
                    "type": "orgs",
                    "id": "{{the destination organization UUID}}"
                }
            }
        }
    }
}
{{< /code-block >}}

### Escenarios de fracaso

- La conexión ya existe.
- La conexión se refiere a un ID de organización de destino fuera de la cuenta.

## Eliminar una conexión

Elimina una conexión. Realiza esta operación desde la organización de origen o desde la organización de destino. Haz referencia a la conexión que deseas eliminar con tu ID, que puedes obtener de la solicitud [List connections (enumerar conexiones)](#list-connections).

<span style="padding:3px" class="font-semibold text-api-delete bg-bg-api-delete">DELETE</span> https://{datadog_site}/api/v2/org_connections/{connection_id}?api_key={datadog_api_key}&application_key={datadog_application_key}

### Escenarios de fracaso

- La organización no participa como origen o destino de la conexión.
- La conexión no existe.

[1]: /es/account_management/org_settings/cross_org_visibility
[2]: /es/account_management/rbac/permissions/#access-management
[3]: /es/api/latest/organizations/#list-your-managed-organizations