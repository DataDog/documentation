---
algolia:
  tags:
  - scim
  - proveedor de identidad
  - IdP
  - Okta
description: Sincroniza usuarios y equipos desde Okta a Datadog utilizando SCIM para
  el aprovisionamiento automatizado de usuarios, la gestión de equipos y el control
  de acceso.
further_reading:
- link: /account_management/scim/
  tag: Documentación
  text: Suministro de usuarios con SCIM
- link: account_management/saml/mapping/#map-saml-attributes-to-datadog-roles
  tag: Documentación
  text: Asignación de atributos de grupos
title: Configurar SCIM con Okta
---

<div class="alert alert-info">
SCIM está disponible con los planes Infrastructure Pro e Infrastructure Enterprise.
</div>

Consulta las siguientes instrucciones para sincronizar tus usuarios de Datadog con Okta mediante SCIM.

Para conocer las capacidades y limitaciones de esta característica, consulta [SCIM][1].

## Requisitos previos

SCIM en Datadog es una característica avanzada disponible con los planes Infrastructure Pro y Infrastructure Enterprise.

Esta documentación presupone que tu organización gestiona las identidades de los usuarios utilizando un proveedor de identidad (IdP).

Datadog recomienda utilizar la clave de aplicación de una cuenta de servicio al configurar SCIM, para evitar cualquier interrupción en el acceso. Para obtener más información, consulta el [uso de cuentas de servicio con SCIM][2].

Al utilizar SAML y SCIM conjuntamente, Datadog recomienda encarecidamente deshabilitar el suministro justo-a-tiempo (JIT) de SAML, para evitar discrepancias en el acceso. Gestiona el suministro de usuarios únicamente a través del SCIM.

## Seleccionar la aplicación de Datadog en la galería de aplicaciones de Okta

1. En tu portal de Okta, ve a **Applications** (Aplicaciones).
2. Haz clic en **Browse App Catalog** (Examinar el catálogo de aplicaciones).
3. Escribe "Datadog" en la casilla de búsqueda.
4. Selecciona la aplicación de Datadog.
5. Haz clic en **Add Integration** (Añadir integración).

**Nota:** Si ya tienes Datadog configurado con Okta, selecciona tu aplicación de Datadog existente.

## Configurar el suministro automático de usuarios

1. En la pantalla de gestión de aplicaciones, selecciona **Provisioning** (Suministrar) en el panel izquierdo
2. Haz clic en **Configure API integration** (Configurar la integración de API).
3. Selecciona **Enable API integration** (Activar la integración de API).
4. Rellena la sección **Credentials** (Credenciales) del siguiente modo:
    - **Base URL** (URL base): `https://{{< region-param key="dd_full_site" >}}/api/v2/scim` **Nota:** Utiliza el subdominio apropiado para tu sitio. Para encontrar tu URL, consulta los [sitios de Datadog][3].
    - **API Token** (Token de API): utiliza una clave de aplicación válida de Datadog. Puedes crear una clave de aplicación en [la página de parámetros de tu organización][4]. Para mantener un acceso continuo a tus datos, utiliza una clave de aplicación de [cuenta de servicio][5].

{{< img src="/account_management/scim/okta-admin-credentials.png" alt="Pantalla de configuración de credenciales del administrador de Okta">}}

5. Haz clic en **Test API Credentials** (Probar credenciales de API) y espera a que aparezca el mensaje que confirma que se han verificado las credenciales.
6. Haz clic en **Save** (Guardar). Aparece la sección de parámetros.
7. Junto a **Provisioning to App** (Suministro de la aplicación), selecciona **Edit** (Editar) para activar las siguientes características:
    - **Create Users** (Crear usuarios)
    - **Update User Attributes** (Actualizar atributos de usuario)
    - **Deactivate Users** (Desactivar usuarios)
8. En **Datadog Attribute Mappings** (Asignación de atributos de Datadog), busca la asignación de atributos de Okta a atributos de Datadog ya preconfigurados. Puedes volver a asignarlos si es necesario, pero asigna los valores de Okta al mismo conjunto de valores de Datadog.

## Configurar el suministro automático de equipos

Con [Managed Teams][6] (Equipos gestionados), tú controlas el suministro principal de un equipo de Datadog (su nombre, identificador y miembros) a través del proveedor de identidad. El proceso de configuración difiere en función de si el equipo ya existe en Datadog.

**Nota:** Los usuarios deben existir en Datadog antes de poder añadirlos a un equipo. Por lo tanto, debes asignar usuarios a la aplicación de Datadog en Okta para asegurarte de que se creen en Datadog a través de SCIM. Asigna la aplicación de Datadog a tu grupo de Okta para asegurarte de que todos los miembros del equipo se creen en Datadog automáticamente.

### Crear un nuevo equipo en Datadog

1. En tu aplicación de Datadog en Okta, navega hasta la pestaña **Push Groups** (Enviar grupos).
{{< img src="/account_management/scim/okta/pushed-groups.png" alt="Interfaz de configuración de grupos enviados de Okta">}}
1. Haz clic en el botón **Push Groups** (Enviar grupos). Se abre la interfaz de grupos enviados.
1. Selecciona el grupo de Okta que deseas enviar a Datadog.
1. En la columna **Match result & push action** (Resultado de coincidencia y acción de envío), asegúrate de que la acción **Create group** (Crear grupo) esté seleccionada.
1. Haz clic en **Save** (Guardar).

Para verificar que la operación se haya completado correctamente, navega hasta [Teams list][7] (Lista de equipos) en Datadog. Busca un equipo de Datadog que coincida con el grupo de Okta que configuraste. Comprueba que el equipo existe en Datadog y que se gestiona de forma externa. Pueden pasar uno o dos minutos antes de que el equipo aparezca en Datadog.

{{< img src="/account_management/scim/okta/managed-externally.png" alt="Lista de equipos de Datadog en la que se muestra un equipo llamado Equipo de identidad que se gestiona de forma externa.">}}

### Sincronizar un equipo de Datadog existente con un grupo de Okta

Puedes asignar un equipo de Datadog existente a un grupo de Okta. Al establecer un vínculo entre el grupo de Okta y el equipo de Datadog, el equipo de Datadog pasará a gestionarse en Okta.

**Nota:** Para sincronizar un equipo de Datadog existente con un grupo de Okta, los dos nombres deben coincidir con exactitud.

1. En tu aplicación de Datadog en Okta, navega hasta la pestaña **Push Groups** (Enviar grupos).
1. Haz clic en el botón **Push Groups** (Enviar grupos). Se abre la interfaz de grupos enviados.
1. Selecciona el grupo de Okta que deseas sincronizar con un equipo de Datadog.
1. En la columna **Match result & push action** (Resultado de coincidencia y acción de envío), asegúrate de que la acción **Create group** (Crear grupo) esté seleccionada.
1. Haz clic en **Save** (Guardar).

**Nota:** Cuando seleccionas **Create group** (Crear grupo), en Okta se muestra un mensaje **No match found** (No se encontraron coincidencias). Puedes ignorar este mensaje y seguir con la creación del grupo para establecer la sincronización.

### Eliminar la conexión entre un grupo de Okta y un equipo de Datadog

Tienes dos opciones para desconectar un grupo de Okta de un equipo de Datadog, con diferentes efectos en la membresía del equipo de Datadog.

#### Conservar a los miembros del equipo en Datadog

Este procedimiento te permite gestionar la pertenencia de un equipo en Datadog en lugar de Okta. Los miembros del equipo no cambian.

1. En tu aplicación de Datadog en Okta, navega hasta la pestaña **Push Groups** (Enviar grupos).
1. Haz clic en el botón **Push Groups** (Enviar grupos). Se abre la interfaz de grupos enviados.
1. Selecciona el grupo de Okta que deseas desvincular de tu equipo de Datadog.
1. En la columna **Match result & push action** (Resultado de coincidencia y acción de envío), selecciona la acción **Unlink Pushed Group** (Desvincular grupo enviado). Aparece un cuadro de diálogo.
1. Selecciona **Leave the group in the target app** (Dejar el grupo en la aplicación de destino).
1. Haz clic en **Unlink** (Desvincular).
1. Haz clic en **Save** (Guardar).

#### Eliminar a los miembros del equipo de Datadog

Este procedimiento te permite gestionar la pertenencia de un equipo en Datadog en lugar de Okta y elimina a los miembros del equipo de Datadog.

1. En tu aplicación de Datadog en Okta, navega hasta la pestaña **Push Groups** (Enviar grupos).
1. Haz clic en el botón **Push Groups** (Enviar grupos). Se abre la interfaz de grupos enviados.
1. Selecciona el grupo de Okta que deseas desvincular de tu equipo de Datadog.
1. En la columna **Match result & push action** (Resultado de coincidencia y acción de envío), selecciona la acción **Unlink Pushed Group** (Desvincular grupo enviado). Aparece un cuadro de diálogo.
1. Selecciona **Delete the group in the target app (recommended)** (Eliminar el grupo en la aplicación de destino [recomendado]).
1. Haz clic en **Unlink** (Desvincular).
1. Haz clic en **Save** (Guardar).

**Nota:** Contrariamente al nombre de la opción, seleccionar **Delete the group in the target app** (Eliminar el grupo en la aplicación de destino) _no_ elimina el equipo en Datadog. En cambio, elimina a todos los miembros del equipo y elimina el vínculo entre el grupo en Okta y el equipo de Datadog.

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/account_management/scim/
[2]: /es/account_management/scim/#using-a-service-account-with-scim
[3]: /es/getting_started/site
[4]: https://app.datadoghq.com/organization-settings/application-keys
[5]: /es/account_management/org_settings/service_accounts
[6]: /es/account_management/teams/manage/#manage-teams-through-an-identity-provider
[7]: https://app.datadoghq.com/teams