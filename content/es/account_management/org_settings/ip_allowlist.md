---
description: Controla el acceso de red a Datadog restringiendo el acceso a la API
  y a la interfaz de usuario a direcciones IP o rangos CIDR específicos para la seguridad
  de la empresa.
title: Lista de IP permitidas
---

{{< callout url="/ayuda/" header="Empezando con la lista de IP permitidas" >}}
La función de lista de IP permitidas sólo está disponible para clientes con un plan de empresa. Solicita acceso poniéndote en contacto con el servicio de asistencia.
{{< /callout >}}

## Información general

{{< img src="account_management/org_settings/ip_allowlist_list.png" alt="Captura de pantalla de la interfaz de usuario de la lista de IP permitidas, que contiene cuatro rangos de IP" >}}

La lista de IP permitidas controla qué redes se pueden utilizar para acceder a tus datos en Datadog. Al limitar las redes permitidas, puedes proteger tus recursos de la exfiltración de datos y las amenazas internas.

Cuando la lista de IP permitidas está activada, solo las direcciones IP o los rangos CIDR de la lista permitida pueden acceder a la API y la interfaz de usuario de Datadog. 

### Recursos bloqueados y permitidos

Si la IP de un usuario no está incluida en la lista de IP permitidas, se bloquean el acceso y el uso de manera efectiva:

- Interfaz web de Datadog
- [API][1] pública de Datadog, incluidos los endpoints documentados e inéditos.
- Aplicaciones móviles de Datadog (iOS, Android)
- Integraciones y aplicaciones de terceros que acceden a Datadog a través de OAuth

La función de lista de IP permitidas no bloquea el acceso a lo siguiente:
- Endpoints de ingesta de datos a los que el Agent envía datos, como métricas, trazas (traces) y logs
- El endpoint [validar clave de API][2], que el Agent utiliza antes de enviar los datos.
- [Presentación de flare del Agent][3]
- [Dashboards públicos][4]

Las aplicaciones e integraciones que envían telemetría desde el Agent (métricas, trazas (traces) y logs), y las que utilizan una clave de API proporcionada por el usuario, no se ven afectadas por la lista de IP permitidas. Datadog recomienda utilizar el [Audit Trail][5] para monitorizar las direcciones IP de aplicaciones e integraciones de terceros.

Para permitir que los clientes de aplicaciones móviles se conecten a Datadog cuando la función de lista de IP permitidas está activada, Datadog recomienda que los dispositivos móviles se conecten a un rango permitido de red a través de VPN.

### Funcionalidad

Sólo los usuarios con el permiso **Gestión de organización** pueden configurar la lista de IP permitidas.

Con la API o la interfaz de usuario de la lista de IP permitidas, puedes realizar lo siguiente:
- Controlar el estado de la lista de IP permitidas. Si la lista de IP permitidas está activada o desactivada determina si tu organización está restringiendo las solicitudes por pertenencia a la lista de IP permitidas.
- Activar y desactivar la lista de IP permitidas.
- Mostrar las direcciones IP (como rangos CIDR) que están cubiertas por tu lista de IP permitidas.
- Añadir direcciones IP (IPv4 o IPv6) o rangos CIDR a la lista de IP permitidas con una nota opcional.
- Editar la nota para una dirección IP que ya esté en la lista de IP permitidas.
- Eliminar una sola entrada de la lista de IP permitidas.
- Reemplazar toda la lista de IP permitidas con nuevas entradas (solo disponible a través de la API).

### Prevención del bloqueo

Cuando activas o modificas la lista de IP permitidas, el sistema aplica restricciones para asegurarse de que puedas seguir accediendo a tus datos:
- Al menos una entrada de la lista de IP permitidas contiene tu IP actual.
- La lista de permitidos contiene al menos una entrada.

## Gestión de la lista de IP permitidas en la interfaz de usuario

**Nota:** La página de la lista de IP permitidas sólo aparece en la interfaz de usuario si tu organización de Datadog tiene la función activada.

Para encontrar la [interfaz de usuario de la lista de IP permitidas][6]:

1. Ve a **Parámetros de la organización** desde el menú de tu cuenta.
1. En **Seguridad**, selecciona **Lista de IP permitidas**.

La tabla de la lista de IP permitidas enumera los rangos CIDR contenidos en la lista de IP permitidas.

### Activar y desactivar la lista de IP permitidas

Un banner en la parte superior de la página muestra el estado activado o desactivado de la lista de IP permitidas. También muestra tu IP y si esa IP está en la lista de permitidos.

Para cambiar el estado de la lista de IP permitidas, haz clic en el botón **Activar** o **Desactivar**.

### Añade direcciones IP o rangos CIDR

{{< img src="account_management/org_settings/add_ip_2.png" alt="Captura de pantalla que muestra un cuadro de diálogo titulado Añadir lista de IP permitidas" >}}

1. Pulsa el botón **Añadir IP** en la parte superior derecha de la página. 
1. Introduce una dirección IP válida o un rango CIDR.
1. Opcionalmente, añade una nota, por ejemplo, para recordar por qué permites el acceso a determinadas direcciones.
1. Haz clic en **Confirmar**.

### Editar direcciones IP o rangos CIDR

1. En la tabla de la lista de IP permitidas, pasa el cursor por encima de la fila que desees editar. 
1. Haz clic en el icono del lápiz (**Editar**). 
1. Cambia el texto descriptivo **Nota**.
1. Haz clic en **Confirmar**.

### Elimina direcciones IP o rangos CIDR

1. En la tabla de la lista de IP permitidas, pasa el cursor sobre la fila que desees eliminar. 
1. Haz clic en el icono de la papelera (**Eliminar**) y confirma que deseas borrarlo. 

## Gestión programática de la lista de IP permitidas

Para gestionar la lista de IP permitidas a través de la API, consulta la [Documentación de la API de la lista de IP permitidas][7].

Consulta el [recurso `ip_allowlist`][8] para gestionar la lista de IP permitidas en Terraform.


[1]: /es/api/latest/
[2]: /es/api/latest/authentication/#validate-api-key
[3]: https://docs.datadoghq.com/es/agent/troubleshooting/send_a_flare/
[4]: /es/dashboards/sharing/
[5]: /es/account_management/audit_trail/
[6]: https://app.datadoghq.com/organization-settings/ip-allowlist
[7]: /es/api/latest/ip-allowlist/
[8]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/ip_allowlist