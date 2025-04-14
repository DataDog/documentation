---
further_reading:
- link: https://app.datadoghq.com/organization-settings/domain-allowlist
  tag: En la aplicación
  text: Lista de dominios permitidos
- link: /account_management/org_settings/domain_allowlist_api
  tag: Documentación
  text: API de lista de dominios permitidos
title: Lista de dominios permitidos
---

{{< callout url="/help/" header="Comenzar con la lista de dominios permitidos" >}}
  La lista de dominios permitidos está disponible para clientes con planes Enterprise. Si estás interesado en esta función, ponte en contacto con el servicio de soporte de Datadog para solicitar acceso.
{{< /callout >}} 

Con la [Lista de dominios permitidos][1], puedes restringir los dominios de correo electrónico que pueden recibir notificaciones. Las notificaciones en contexto incluyen todas las notificaciones de:
- Monitores
- Informes programados

Cuando la lista de dominios permitidos está activada, sólo los dominios de correo electrónico de tu lista de dominios permitidos pueden recibir notificaciones en contexto. Si intentas enviar un notificación en contexto a un dominio de correo electrónico que no está en tu lista de dominios permitidos, aparece una advertencia. 

{{< img src="account_management/org_settings/domain_allowlist/verification.png" alt="Captura de pantalla de configuración de un monitor en la interfaz de usuario, el cuadro de diálogo 'Notificar a tu equipo'. La notificación menciona una dirección de Gmail, pero gmail.com no está en la lista de permitidos. Aparece una advertencia, que dice 'En el mensaje: El dominio de correo electrónico @gmail.com no es parte de la lista de dominios permitidos y no recibirá esta notificación.'" >}}

Este documento describe cómo acceder y modificar tu lista de permitidos utilizando la interfaz de usuario. Para utilizar la API, consulta [API de lista de dominios permitidos][2].

## Uso

Accede a tu [**Lista de dominios permitidos**][1] en **Organization Settings** (Parámetros de organización). Para leer o editar tu lista de dominios permitidos, necesitas el permiso **Org Management** (Gestión de la organización).

{{< img src="account_management/org_settings/domain_allowlist/enabled.png" alt="Captura de pantalla que muestra la interfaz de usuario de la Lista de dominios permitidos, con la lista de permitidos que contienen un dominio de correo electrónico." >}}

La sección **Domains Currently In Use** (Dominios actualmente en uso) muestra los dominios de correo electrónico de todos los correos electrónicos mencionados en tus notificaciones del **Monitor**, sin incluir los dominios en uso para otros tipos de notificaciones. Aún puedes configurar el envío de notificaciones en contexto a dominios de correo electrónico que no estén en tu lista de permitidos, pero si la lista de dominios permitidos está activada, los dominios de correo electrónico que no estén en tu lista de permitidos no recibirán notificaciones para los productos en contexto.


### Activar o desactivar la lista de dominios permitidos

Utiliza el botón **Enable** (Activar) o **Disable** (Desactivar).

Para activar la lista de dominios permitidos, debes añadir uno o más dominios a la lista de dominios permitidos. Si eliminas todos los dominios de la lista de permitidos, la Lista de dominios permitidos se desactiva automáticamente.

Cuando la lista de dominios permitidos está desactivada, todos los dominios de correo electrónico pueden recibir notificaciones, aunque la lista de dominios permitidos contenga dominios.

### Añadir o eliminar un dominio

Para añadir un dominio de correo electrónico a la lista de permitidos, introduce el dominio con el formato `@<DOMAIN NAME>.<TOP-LEVEL DOMAIN>`. Por ejemplo, `@gmail.com`.

Para eliminar un dominio de la lista de permitidos, selecciona el icono de eliminación.

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}


[1]: https://app.datadoghq.com/organization-settings/domain-allowlist
[2]: /es/account_management/org_settings/domain_allowlist_api