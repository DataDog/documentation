---
description: Configura el control de acceso basado en roles (RBAC) para monitores
  con el fin de restringir los permisos de edición a roles específicos y evitar cambios
  no autorizados.
further_reading:
- link: /account_management/rbac/permissions/#monitors
  tag: Documentación
  text: Más información sobre los permisos RBAC para monitores
- link: /api/latest/monitors/#create-a-monitor
  tag: Documentación
  text: Más información sobre la creación de monitores restringidos a través de la
    API
- link: /monitors/configuration/#permissions
  tag: Documentación
  text: Más información sobre la creación de monitores restringidos a través de la
    interfaz de usuario
title: Cómo configurar RBAC para monitores
---

## Información general

Los monitores alertan a tus equipos de posibles problemas con tus sistemas. Asegurarte de que solo los usuarios autorizados pueden editar tus monitores evita cambios accidentales en las configuraciones de los monitores.

Gestiona de forma segura tus monitores al restringir los permisos de edición de cada monitor a roles específicos.

## Configurar roles

Para obtener más información sobre roles predeterminados y personalizados, cómo crear roles personalizados, asignar permisos a roles y asignar roles a usuarios, consulta [Control de acceso basado en roles][1].

## Restringir el acceso a monitores

{{< tabs >}}

{{% tab "UI" %}}

1. Accede a la página de edición del monitor creando un nuevo monitor o editando uno ya existente.
2. En la parte inferior del formulario, especifica qué roles, además del creador, pueden editar el monitor.

{{< img src="/monitors/guide/monitor_rbac_restricted.jpg" alt="Monitor restringido por RBAC" >}}

Para más información, consulta [Permisos de monitores][1].

[1]: /es/monitors/configuration/#permissions
{{% /tab %}}

{{% tab "API" %}}

Utiliza el [endpoint de la API Lista de roles][1] para obtener el lista de roles y sus IDs.

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

Utiliza el endpoint de la API [Crear][2] o [Editar un monitor][3] y el parámetro `restricted_roles` para restringir la edición de un monitor a un conjunto específico de roles y al creador de monitor.

**Nota:** Puedes especificar uno o varios UUID de rol. Establecer `restricted_roles` en `null` permite la edición del monitor para todos los usuarios con [permisos de escritura del monitor][4].

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

Para obtener más información, consulta [Roles][5] y [Referencia de la API Monitores][6] .


[1]: /es/api/latest/roles/#list-roles
[2]: /es/api/latest/monitors/#create-a-monitor
[3]: /es/api/latest/monitors/#edit-a-monitor
[4]: /es/account_management/rbac/permissions/#monitors
[5]: /es/api/latest/roles/
[6]: /es/api/latest/monitors/
{{% /tab %}}
{{< /tabs >}}

## Roles restringidos

Datadog permite restringir la edición de monitores a roles específicos mediante la opción de restricción de roles. Esto te da flexibilidad para definir qué usuarios pueden editar monitores.

### API

Puedes actualizar la definición de los monitores que se gestionan mediante API o Terraform utilizando el parámetro `restricted_roles`. También puedes utilizar el endpoint de [políticas de restricción][4] para definir las reglas de control del acceso para un monitor, asignando un conjunto de relaciones (como editor y visor) a un conjunto de elementos principales autorizados (como roles, equipos o usuarios). La política de restricción determina quién tiene autorización para realizar qué acciones en el monitor.

Para obtener más información, consulta [Editar un endpoint de API de monitor][3] y [API de políticas de restricción][4].

### Interfaz de usuario

Todos los nuevos monitores creados desde la interfaz de usuario utilizan el parámetro `restricted_roles`. 
Todos los monitores muestran también la opción de restricción de roles independientemente del mecanismo subyacente:

{{< img src="/monitors/guide/monitor_rbac_non_restricted.jpg" alt="Monitor no restringido por RBAC" >}}

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/account_management/rbac/
[2]: /es/account_management/rbac/?tab=datadogapplication#datadog-default-roles
[3]: /es/api/latest/monitors/#edit-a-monitor
[4]: /es/api/latest/restriction-policies/