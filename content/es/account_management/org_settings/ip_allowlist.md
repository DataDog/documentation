---
title: Lista de IP permitidas
---

{{< callout url="/ayuda/" header="Get Started with IP Allowlist" >}}
La función de lista de IP permitidas solo está disponible para clientes con un plan de empresa. Solicita acceso poniéndote en contacto con el servicio de asistencia.
{{< /callout >}}

## Información general

{{< img src="account_management/org_settings/ip_allowlist_list.png" alt="Captura de pantalla de la interfaz de usuario de la lista de IP permitidas, que contiene cuatro rangos de IP" >}}

La lista de IP permitidas controla qué redes se pueden utilizar para acceder a tus datos en Datadog. Al limitar las redes permitidas, puedes proteger tus recursos de la exfiltración de datos y las amenazas internas.

Cuando la lista de IP permitidas está activada, solo las direcciones IP o los rangos CIDR de la lista permitida pueden acceder a la API y la interfaz de usuario de Datadog. 

### Recursos bloqueados y permitidos

Si la IP de un usuario no está incluida en la lista de IP permitidas, se bloquean el acceso y el uso de manera efectiva:

- Interfaz web de Datadog
- [API][1] público de Datadog, incluidos los endpoints documentados e inéditos.
- Aplicaciones móviles de Datadog (iOS, Android)
- Integraciones y aplicaciones de terceros que acceden a Datadog a través de OAuth

La función de lista de IP permitidas no bloquea el acceso a lo siguiente:
- Endpoints de ingesta de datos a los que Agent envía datos, como métricas, trazas (traces), y logs
- El endpoint [validate API key (validar clave de API)][2], que el Agent utiliza antes de enviar los datos.
- [Public dashboards (dashboards públicos)][3]

Las aplicaciones e integraciones que envían telemetría como métricas, trazas y logs desde el Agent y las que utilizan una clave de API proporcionada por el usuario no se ven afectadas por la lista de IP permitidas. Datadog recomienda utilizar el [Audit Trail][4] para monitorear direcciones IP de terceros.

### Funcionalidad

Solo los usuarios con el permiso **Org Management** pueden configurar la lista de IP permitidas.

Con la lista de IP permitidas API o UI, puedes realizar lo siguiente:
- Controlar el estado de la lista de IP permitidas. Si la lista de IP permitidas está activada o desactivada determina si tu organización está restringiendo las solicitudes por pertenencia a la lista de IP permitidas.
- Activar y desactivar la lista de IP permitidas.
- Mostrar las direcciones IP (como rangos CIDR) que están cubiertas por tu lista de IP permitidas.
- Añadir direcciones IP (IPv4 o IPv6) o rangos CIDR a la lista de IP permitidas con una nota opcional.
- Editar la nota para una dirección IP que ya esté en la lista de IP permitidas.
- Eliminar una sola entrada de la lista de IP permitidas.
- Reemplazar toda la lista de IP permitidas con nuevas entradas (solo disponible a través de la API).

### Prevención del bloqueo

Cuando activas o modificas la lista de IP permitidas, el sistema aplica restricciones para asegurarse de que puedes seguir accediendo a tus datos:
- Al menos una entrada de la lista de IP permitidas contiene tu IP actual.
- La lista de permitidos contiene al menos una entrada.

## Gestión de la lista de IP permitidas en la interfaz de usuario

**Nota:** La página de la lista de IP permitidas solo aparece en la interfaz de usuario si tu organización Datadog tiene la función activada.

Para encontrar la [IP allowlist UI (interfaz de usuario de la lista de IP permitidas)][5]:

1. Accede a **Organization Settings** (Parámetros de organización) desde el menú de tu cuenta.
1. En **Acceso**, selecciona **Lista de IP permitidas**.

La tabla de lista de IP permitida enumera los rangos CIDR contenidos en la lista de IP permitidas.

### Activar y desactivar la lista de IP permitidas

Un banner en la parte superior de la página muestra el estado activado o desactivado de la lista de IP permitidas. También muestra tu IP y si esa IP está en la lista permitida.

Para cambiar el estado de la lista de IP permitidas, haz clic en el botón **Activar** o **Desactivar**.

### Añadir direcciones IP o rangos CIDR

{{< img src="account_management/org_settings/add_ip.png" alt="Captura de pantalla que muestra un cuadro de diálogo titulado Add IP (Añadir IP) a la lista permitida" >}}

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

Para gestionar la lista de IP permitidas a través de la API, consulta la [IP Allowlist API documentation (Documentación de la API de la lista de IP permitidas)][6].

Consulta el [`ip_allowlist` resource (recurso `ip_allowlist`)][7] para gestionar la lista de IP permitidas en Terraform.


[1]: /es/api/latest/
[2]: /es/api/latest/authentication/#validate-api-key
[3]: /es/dashboards/sharing/
[4]: /es/account_management/audit_trail/
[5]: https://app.datadoghq.com/organization-settings/ip-allowlist
[6]: /es/api/latest/ip-allowlist/
[7]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/ip_allowlist