---
description: Configure el control de acceso basado en roles (RBAC) para los seguimientos
  a fin de restringir los permisos de edición a roles específicos y evitar cambios
  no autorizados.
further_reading:
- link: /account_management/rbac/permissions/#monitors
  tag: Documentación
  text: Obtenga más información sobre los permisos de RBAC para Monitors
- link: /api/latest/monitors/#create-a-monitor
  tag: Documentación
  text: Obtenga más información sobre cómo crear seguimientos restringidos mediante
    la API
- link: /monitors/configuration/#permissions
  tag: Documentación
  text: Obtenga más información sobre cómo crear seguimientos restringidos mediante
    la UI
title: Cómo configurar RBAC para Monitors
---
## Descripción general {#overview}

Los seguimientos alertan a sus equipos sobre posibles problemas en sus sistemas. Asegurarse de que solo los usuarios autorizados puedan editar sus seguimientos evita cambios accidentales en las configuraciones de esos seguimientos.

Administre sus seguimientos de forma segura restringiendo los permisos de edición de cada seguimiento a roles específicos.

## Configure roles {#set-up-roles}

Para obtener más información sobre los roles predeterminados y personalizados, cómo crear roles personalizados, asignar permisos a los roles y asignar roles a los usuarios, consulte [Access Control basado en roles][1].

## Restrinja el acceso a los seguimientos {#restrict-access-to-monitors}

{{< tabs >}}

{{% tab "IU" %}}

1. Navegue a la página de edición de seguimientos creando un seguimiento nuevo o editando uno existente.
2. En la parte inferior del formulario, especifique qué roles, además del creador, tienen permitido editar el seguimiento.

{{< img src="/monitors/guide/monitor_rbac_restricted.jpg" alt="Seguimiento restringido por RBAC" >}}

Para obtener más información, consulte [Permisos de seguimientos][1].

[1]: /es/monitors/configuration/#permissions
{{% /tab %}}

{{% tab "API" %}}

Utilice el [punto de conexión de la API List Roles][1] para obtener la lista de roles y sus identificadores.

```bash
curl --request GET 'https://api.datadoghq.com/api/v2/roles' \
--header 'DD-API-KEY: <DD-API-KEY>' \
--header 'DD-APPLICATION-KEY: <DD-APPLICATION-KEY>'
```

```bash
{
    "meta": {
        "page": {
            "total_filtered_count": 4,
            "total_count": 4
        }
    },
    "data": [
        {
            "type": "roles",
            "id": "89f5dh86-e470-11f8-e26f-4h656a27d9cc",
            "attributes": {
                "name": "Corp IT Eng - User Onboarding",
                "created_at": "2018-11-05T21:19:54.105604+00:00",
                "modified_at": "2018-11-05T21:19:54.105604+00:00",
                "user_count": 4
            },
            "relationships": {
                "permissions": {
                    "data": [
                        {
                            "type": "permissions",
                            "id": "984d2rt4-d5b4-13e8-a5yf-a7f560d33029"
                        },
                        ...
                    ]
                }
            }
        },
        ...
    ]
}
```

Utilice el punto de conexión de la API [Create][2] o [Edit a monitor][3] y el parámetro `restricted_roles` para restringir la edición del seguimiento a un conjunto específico de roles y al creador del seguimiento. 

**Nota:** Puede especificar uno o varios UUID de rol. Configurar `restricted_roles` en `null` permite la edición de seguimientos a todos los usuarios con [permisos de Monitor Write][4].

```bash
curl --location --request POST 'https://api.datadoghq.com/api/v1/monitor' \
--header 'Content-Type: application/json' \
--header 'DD-API-KEY: <DD-API-KEY>' \
--header 'DD-APPLICATION-KEY: <DD-APPLICATION-KEY>' \
--data-raw '{
  "message": "You may need to add web hosts if this is consistently high.",
  "name": "Bytes received on host0",
  "options": {
    "no_data_timeframe": 20,
    "notify_no_data": true
  },
  "query": "avg(last_5m):sum:system.net.bytes_rcvd{host:host0} \u003e 100",
  "tags": [
    "app:webserver",
    "frontend"
  ],
  "type": "query alert",
  "restricted_roles": ["89f5dh86-e470-11f8-e26f-4h656a27d9cc"]
}'
```

Para obtener más información, consulte [Roles][5] y [Referencia de la API de Monitors][6].


[1]: /es/api/latest/roles/#list-roles
[2]: /es/api/latest/monitors/#create-a-monitor
[3]: /es/api/latest/monitors/#edit-a-monitor
[4]: /es/account_management/rbac/permissions/#monitors
[5]: /es/api/latest/roles/
[6]: /es/api/latest/monitors/
{{% /tab %}}
{{< /tabs >}}

## Roles restringidos {#restricted-roles}

Datadog permite restringir la edición de seguimientos a roles específicos a través de la opción de restricción de roles. Esto le brinda la flexibilidad de definir qué usuarios tienen permitido editar seguimientos.

### API {#api}

Puede actualizar la definición de los seguimientos que se administran a través de la API o Terraform utilizando el parámetro `restricted_roles`. También puede utilizar el punto de conexión [Restriction Policies][4] para definir las reglas de control de acceso de un seguimiento, asignando un conjunto de relaciones (como editor y observador) a un conjunto de entidades autorizadas (como roles, equipos o usuarios). La política de restricción determina quién está autorizado para realizar qué acciones en el seguimiento.

Los seguimientos admiten las relaciones `viewer`, `muter` y `editor`. La relación `muter`, que otorga acceso solo para silenciar, está en Preview. Una política que vincula la relación `muter` también debe vincular la relación `editor`, y cada principal solo puede tener una relación por política. El parámetro `restricted_roles` solo controla el acceso de edición; para otorgar acceso solo para silenciar, utilice una política de restricción. Para obtener más información, consulte [Niveles de acceso][5].

Para obtener más información, consulte [Edit a monitor API endpoint][3] y [Restriction Policies API][4].

### UI {#ui}

Todos los seguimientos nuevos creados desde la UI usan el parámetro `restricted_roles`. 
Todos los seguimientos también muestran la opción de restricción de rol independientemente del mecanismo subyacente:

{{< img src="/monitors/guide/monitor_rbac_non_restricted.jpg" alt="Seguimiento sin restricciones de RBAC" >}}

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/account_management/rbac/
[2]: /es/account_management/rbac/?tab=datadogapplication#datadog-default-roles
[3]: /es/api/latest/monitors/#edit-a-monitor
[4]: /es/api/latest/restriction-policies/
[5]: /es/monitors/configuration/#access-levels