---
algolia:
  tags:
  - scim
  - identity provider
  - IdP
  - Okta
description: Sincronice usuarios y equipos desde Okta a Datadog usando SCIM para el
  aprovisionamiento automatizado de usuarios, la gestión de equipos y el control de
  acceso.
further_reading:
- link: /account_management/scim/
  tag: Documentación
  text: Aprovisionamiento de usuarios con SCIM
- link: account_management/saml/mapping/#map-saml-attributes-to-datadog-roles
  tag: Documentación
  text: Asignación de atributos de grupo
title: Configurar SCIM con Okta
---
<div class="alert alert-info">
SCIM está disponible con los planes Infrastructure Pro, Infrastructure Enterprise y Startup.
</div>

Consulte las siguientes instrucciones para sincronizar sus usuarios de Datadog con Okta usando SCIM.

Para conocer las capacidades y limitaciones de esta función, consulte [SCIM][1].

## Requisitos previos {#prerequisites}

SCIM en Datadog es una función avanzada disponible con los planes Infrastructure Pro, Infrastructure Enterprise y Startup

Esta documentación asume que su organización gestiona las identidades de los usuarios mediante un proveedor de identidad.

Datadog recomienda encarecidamente que utilice una clave de aplicación de cuenta de servicio al configurar SCIM para evitar cualquier interrupción en el acceso. Para obtener más detalles, consulte [uso de una cuenta de servicio con SCIM][2].

Al usar SAML y SCIM juntos, Datadog recomienda encarecidamente deshabilitar el aprovisionamiento just-in-time (JIT) de SAML para evitar discrepancias en el acceso. Gestione el aprovisionamiento de usuarios solo a través de SCIM.

## Seleccione la aplicación de Datadog en la galería de aplicaciones de Okta {#select-the-datadog-application-in-the-okta-application-gallery}

1. En su portal de Okta, vaya a {{< ui >}}Applications{{< /ui >}}
2. Haga clic en {{< ui >}}Browse App Catalog{{< /ui >}}
3. Escriba "Datadog" en el cuadro de búsqueda
4. Seleccione la aplicación Datadog
5. Haga clic en {{< ui >}}Add Integration{{< /ui >}}

**Nota:** Si ya tiene Datadog configurado con Okta, seleccione su aplicación Datadog existente.

## Configure el aprovisionamiento automático de usuarios {#configure-automatic-user-provisioning}

1. En la pantalla de administración de aplicaciones, seleccione {{< ui >}}Provisioning{{< /ui >}} en el panel izquierdo
2. Haga clic en {{< ui >}}Configure API integration{{< /ui >}}.
3. Seleccione {{< ui >}}Enable API integration{{< /ui >}}.
4. Complete la sección {{< ui >}}Credentials{{< /ui >}} de la siguiente manera:
    - {{< ui >}}Base URL{{< /ui >}}: `https://{{< region-param key="dd_full_site" >}}/api/v2/scim` **Nota:** Utilice el subdominio adecuado para su sitio. Para encontrar su URL, consulte [Datadog sites][3].
    - {{< ui >}}API Token{{< /ui >}}: Utilice una clave de aplicación de Datadog válida. Puede crear una clave de aplicación en [la página de configuración de su organización][4]. Para mantener el acceso continuo a sus datos, utilice una clave de aplicación de [cuenta de servicio][5].

{{< img src="/account_management/scim/okta-admin-credentials.png" alt="Pantalla de configuración de credenciales de administrador de Okta">}}

5. Haga clic en {{< ui >}}Test API Credentials{{< /ui >}} y espere el mensaje que confirma que las credenciales han sido verificadas.
6. Haga clic en {{< ui >}}Save{{< /ui >}}. Aparece la sección de configuración.
7. Junto a {{< ui >}}Provisioning to App{{< /ui >}}, seleccione {{< ui >}}Edit{{< /ui >}} para habilitar las funciones:
    - {{< ui >}}Create Users{{< /ui >}}
    - {{< ui >}}Update User Attributes{{< /ui >}}
    - {{< ui >}}Deactivate Users{{< /ui >}}
8. En {{< ui >}}Datadog Attribute Mappings{{< /ui >}}, encuentre la asignación de atributos de Okta a atributos de Datadog ya preconfigurada. Puede volver a asignarlos si es necesario, pero asigne los valores de Okta al mismo conjunto de valores de Datadog.

### Asigne el atributo de rol de Datadog {#map-the-datadog-role-attribute}

Para aprovisionar el rol de Datadog de un usuario (integrado o personalizado) a través de SCIM, agregue una asignación explícita para el atributo `roles`. Okta no asigna este atributo de forma predeterminada.

El soporte de roles SCIM de Datadog sigue la convención de atributos de valores múltiples de SCIM definida en [RFC 7643][8], utilizando el UUID del rol como `value` y el nombre del rol como `display`:

```json
{
  "roles": [
    { "value": "<DATADOG_ROLE_UUID>", "display": "<DATADOG_ROLE_NAME>" }
  ]
}
```

1. En {{< ui >}}Directory{{< /ui >}} > {{< ui >}}Profile Editor{{< /ui >}}, seleccione el perfil de usuario para la aplicación configurada para SCIM de Datadog, luego haga clic en {{< ui >}}Add Attribute{{< /ui >}} para crear un atributo `roles`:
    - {{< ui >}}Data type{{< /ui >}}: **string**
    - {{< ui >}}Display name{{< /ui >}}: **Roles**
    - {{< ui >}}Variable name{{< /ui >}}: **roles**
    - {{< ui >}}External name{{< /ui >}}: `roles.^[primary==true].value`
    - {{< ui >}}External namespace{{< /ui >}}: `urn:ietf:params:scim:schemas:core:2.0:User`
    - Para {{< ui >}}Enum{{< /ui >}}, seleccione {{< ui >}}Define enumerated list of values{{< /ui >}} y agregue una entrada por cada rol de Datadog, usando el nombre del rol como nombre para mostrar y el UUID del rol como valor. Puede encontrar el UUID de un rol en la URL del rol en su página de [Configuración de la organización][9]. Agregue cualquier rol personalizado de la misma manera.
2. En la configuración de {{< ui >}}Provisioning{{< /ui >}} > {{< ui >}}To App{{< /ui >}} de su aplicación Datadog, asigne el atributo `roles` de Okta al atributo `roles` de Datadog.
3. En la pestaña {{< ui >}}Assignments{{< /ui >}} de la aplicación, asigne a cada usuario el rol correspondiente desde el menú desplegable.

Si una solicitud SCIM envía múltiples roles, Datadog aprovisiona solo los roles que coinciden con un rol en su organización. Si ninguno coincide, el usuario vuelve al rol predeterminado de la organización (Estándar), y los roles que no coinciden se registran en el Audit Trail. Para obtener más detalles, consulte [SCIM][1].

## Configurar el aprovisionamiento automático de equipos {#configure-automatic-team-provisioning}

Con [Equipos gestionados][6], usted controla el aprovisionamiento principal de un equipo de Datadog (su nombre, identificador y membresía) a través del proveedor de identidad. El proceso de configuración difiere dependiendo de si el equipo ya existe en Datadog.

**Nota:** Los usuarios deben existir en Datadog antes de que los agregue a un equipo. Por lo tanto, debe asignar usuarios a la aplicación de Datadog en Okta para asegurarse de que se creen en Datadog a través de SCIM. Asigne la aplicación de Datadog a su grupo de Okta para asegurarse de que todos los miembros del equipo se creen en Datadog automáticamente.

### Crear un nuevo equipo en Datadog {#create-a-new-team-in-datadog}

1. En su aplicación de Datadog en Okta, navegue a la pestaña {{< ui >}}Push Groups{{< /ui >}}.
{{< img src="/account_management/scim/okta/pushed-groups.png" alt="Interfaz de configuración de grupos enviados de Okta">}}
1. Haga clic en el botón {{< ui >}}Push Groups{{< /ui >}}. Se abre la interfaz de grupos enviados.
1. Seleccione el grupo de Okta que desea enviar a Datadog.
1. En la columna {{< ui >}}Match result & push action{{< /ui >}}, asegúrese de que {{< ui >}}Create group{{< /ui >}} esté seleccionado.
1. Haga clic en {{< ui >}}Save{{< /ui >}}.

Para verificar que la operación se completó correctamente, navegue a la [lista de Teams][7] en Datadog. Busque un Team de Datadog que coincida con el grupo de Okta que configuró. Verifique que el equipo exista en Datadog y sea administrado externamente. Puede tomar uno o dos minutos antes de que el equipo aparezca en Datadog.

{{< img src="/account_management/scim/okta/managed-externally.png" alt="Lista de equipos de Datadog que muestra un equipo llamado Identity Team que se administra externamente.">}}

### Sincronizar un Team de Datadog existente con un grupo de Okta {#synchronize-an-existing-datadog-team-with-an-okta-group}

Puede asignar un Team de Datadog existente a un grupo de Okta. Establecer un vínculo desde el grupo de Okta al Team de Datadog hace que el Team de Datadog sea administrado por Okta en adelante.

**Nota:** Para sincronizar un Team de Datadog existente con un grupo de Okta, el identificador derivado del nombre del grupo de Okta debe coincidir exactamente con el identificador del Team de Datadog existente.

1. En su aplicación de Datadog en Okta, navegue a la pestaña {{< ui >}}Push Groups{{< /ui >}}.
1. Haga clic en el botón {{< ui >}}Push Groups{{< /ui >}}. Se abre la interfaz de grupos enviados.
1. Seleccione el grupo de Okta que desea sincronizar con un Team de Datadog.
1. En la columna {{< ui >}}Match result & push action{{< /ui >}}, asegúrese de que {{< ui >}}Create group{{< /ui >}} esté seleccionado.
1. Haga clic en {{< ui >}}Save{{< /ui >}}.

**Nota:** Cuando selecciona {{< ui >}}Create group{{< /ui >}}, Okta muestra un mensaje de {{< ui >}}No match found{{< /ui >}}. Puede ignorar este mensaje y continuar con la creación del grupo para establecer la sincronización.

### Eliminar la conexión entre un grupo de Okta y un Team de Datadog {#delete-the-connection-between-an-okta-group-and-a-datadog-team}

Tiene dos opciones para desconectar un grupo de Okta de un Team de Datadog, con diferentes impactos en la membresía del Team de Datadog.

#### Mantener a los miembros del equipo en Datadog {#keep-team-members-in-datadog}

Este procedimiento le permite administrar la membresía del equipo en Datadog en lugar de en Okta. Los miembros del equipo permanecen sin cambios.

1. En su aplicación de Datadog en Okta, navegue a la pestaña {{< ui >}}Push Groups{{< /ui >}}.
1. Haga clic en el botón {{< ui >}}Push Groups{{< /ui >}}. Se abre la interfaz de grupos enviados.
1. Seleccione el grupo de Okta que desea desvincular de su Team de Datadog.
1. En la columna {{< ui >}}Match result & push action{{< /ui >}}, seleccione {{< ui >}}Unlink Pushed Group{{< /ui >}}. Aparece un cuadro de diálogo.
1. Seleccione {{< ui >}}Leave the group in the target app{{< /ui >}}.
1. Haga clic en {{< ui >}}Unlink{{< /ui >}}.
1. Haga clic en {{< ui >}}Save{{< /ui >}}.

#### Eliminar miembros del equipo de Datadog {#remove-team-members-from-datadog}

Este procedimiento le permite administrar la membresía del equipo en Datadog en lugar de Okta y elimina a los miembros del Datadog Team.

1. En su aplicación de Datadog en Okta, navegue a la pestaña {{< ui >}}Push Groups{{< /ui >}}.
1. Haga clic en el botón {{< ui >}}Push Groups{{< /ui >}}. Se abre la interfaz de grupos enviados.
1. Seleccione el grupo de Okta que desea desvincular de su Team de Datadog.
1. En la columna {{< ui >}}Match result & push action{{< /ui >}}, seleccione {{< ui >}}Unlink Pushed Group{{< /ui >}}. Aparece un cuadro de diálogo.
1. Seleccione {{< ui >}}Delete the group in the target app (recommended){{< /ui >}}.
1. Haga clic en {{< ui >}}Unlink{{< /ui >}}.
1. Haga clic en {{< ui >}}Save{{< /ui >}}.

**Nota:** Contrario al nombre de la opción, seleccionar {{< ui >}}Delete the group in the target app{{< /ui >}} _no_ elimina el equipo en Datadog. En su lugar, elimina a todos los miembros del equipo y elimina el vínculo entre el grupo en Okta y el Datadog Team.

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/account_management/scim/
[2]: /es/account_management/scim/#using-a-service-account-with-scim
[3]: /es/getting_started/site
[4]: https://app.datadoghq.com/organization-settings/application-keys
[5]: /es/account_management/org_settings/service_accounts
[6]: /es/account_management/teams/manage/#manage-teams-through-an-identity-provider
[7]: https://app.datadoghq.com/teams
[8]: https://www.rfc-editor.org/rfc/rfc7643.html#section-4.1.2
[9]: https://app.datadoghq.com/organization-settings/roles