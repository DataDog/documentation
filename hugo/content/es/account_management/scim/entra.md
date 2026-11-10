---
algolia:
  tags:
  - scim
  - identity provider
  - IdP
  - Azure AD
  - Entra ID
aliases:
- /es/account_management/scim/azure/
description: Configure el aprovisionamiento automatizado de usuarios desde Microsoft
  Entra ID a Datadog mediante SCIM con configuración paso a paso y asignación de atributos.
title: Configure SCIM con Microsoft Entra ID
---
<div class="alert alert-info">
SCIM está disponible con los planes Infrastructure Pro, Infrastructure Enterprise y Startup.
</div>

<div class="alert alert-danger">
  Debido a una congelación de Microsoft en las actualizaciones de aplicaciones de terceros en Entra tras un incidente de seguridad a finales de 2024, el aprovisionamiento de Teams mediante SCIM no está disponible. Para crear Teams en Datadog, utilice una de las alternativas compatibles: 
  <a href="https://docs.datadoghq.com/account_management/saml/mapping/" target="_blank">Asignación SAML</a>, 
  <a href="https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/team" target="_blank">Terraform</a>, 
  <a href="https://docs.datadoghq.com/api/latest/teams/" target="_blank">la API pública</a>, o 
  <a href="https://docs.datadoghq.com/api/latest/scim/" target="_blank">llamadas directas al servidor SCIM</a>. SCIM todavía se puede utilizar para aprovisionar usuarios.
</div>

Consulte las siguientes instrucciones para sincronizar sus usuarios de Datadog con Microsoft Entra ID usando SCIM.

Para conocer las capacidades y limitaciones de esta función, consulte [SCIM][1].

## Requisitos previos {#prerequisites}

SCIM en Datadog es una función avanzada disponible con los planes Infraestructura Pro, Infraestructura Enterprise y Startup.

Esta documentación asume que su organización gestiona las identidades de los usuarios mediante un proveedor de identidad.

Datadog recomienda encarecidamente que utilice una clave de aplicación de cuenta de servicio al configurar SCIM para evitar cualquier interrupción en el acceso. Para obtener más detalles, consulte [uso de una cuenta de servicio con SCIM][2].

Al usar SAML y SCIM juntos, Datadog recomienda encarecidamente deshabilitar el aprovisionamiento just-in-time (JIT) de SAML para evitar discrepancias en el acceso. Gestione el aprovisionamiento de usuarios solo a través de SCIM.

## Agregue Datadog a la galería de aplicaciones de Microsoft Entra ID {#add-datadog-to-the-microsoft-entra-id-application-gallery}

1. Inicie sesión en el [centro de administración de Microsoft Entra][6] al menos como [Administrador de aplicaciones en la nube][7]
1. Vaya a {{< ui >}}Identity{{< /ui >}} -> {{< ui >}}Applications{{< /ui >}} -> {{< ui >}}Enterprise Applications{{< /ui >}}
1. Haga clic en {{< ui >}}New Application{{< /ui >}}
1. Escriba "Datadog" en el cuadro de búsqueda
1. Seleccione la aplicación Datadog de la galería
1. Opcionalmente, ingrese un nombre en el cuadro de texto {{< ui >}}Name{{< /ui >}}
1. Haga clic en {{< ui >}}Create{{< /ui >}}

**Nota:** Si ya tiene Datadog configurado con Microsoft Entra ID para SSO, vaya a {{< ui >}}Enterprise Applications{{< /ui >}} y seleccione su aplicación de Datadog existente.

## Configure el aprovisionamiento automático de usuarios {#configure-automatic-user-provisioning}

1. En la pantalla de administración de aplicaciones, seleccione {{< ui >}}Provisioning{{< /ui >}} en el panel izquierdo
2. En el menú {{< ui >}}Provisioning Mode{{< /ui >}}, seleccione {{< ui >}}Automatic{{< /ui >}}
3. Abra {{< ui >}}Admin Credentials{{< /ui >}}
4. Complete la sección {{< ui >}}Admin Credentials{{< /ui >}} de la siguiente manera:
    - {{< ui >}}Tenant URL{{< /ui >}}: `{{< region-param key="dd_api" >}}/api/v2/scim?aadOptscim062020`
        - **Note:** Use the API host for your site, not the app host. For the SCIM endpoints for each site, see the [SCIM API reference][3].
        - **Note:** The `?aadOptscim062020` la parte de la URL del inquilino es específicamente para Entra ID. Este es un indicador que le dice a Entra que corrija su comportamiento SCIM como se describe en esta [documentación de Microsoft Entra][8]. Si no está utilizando Entra ID, no debe incluir este sufijo en la URL.
    - {{< ui >}}Secret Token{{< /ui >}}: Utilice una clave de aplicación de Datadog válida. Puede crear una clave de aplicación en [la página de configuración de su organización][4]. Para mantener el acceso continuo a sus datos, utilice una clave de aplicación de [cuenta de servicio][5].

{{< img src="/account_management/scim/admin-credentials-entra-flag.png" alt="Pantalla de configuración de credenciales de administrador de Azure AD">}}

5. Haga clic en {{< ui >}}Test Connection{{< /ui >}} y espere el mensaje que confirma que las credenciales están autorizadas para habilitar el aprovisionamiento.
6. Haga clic en {{< ui >}}Save{{< /ui >}}. Aparece la sección de asignación. Consulte la siguiente sección para configurar la asignación.

## Asignación de atributos {#attribute-mapping}

### Atributos de usuario {#user-attributes}

1. Expanda la sección {{< ui >}}Mappings{{< /ui >}}
2. Haga clic en {{< ui >}}Provision Azure Active Directory Users{{< /ui >}}. Aparece la página de Asignación de atributos.
3. Establezca {{< ui >}}Enabled{{< /ui >}} en {{< ui >}}Yes{{< /ui >}}
4. Haga clic en el icono {{< ui >}}Save{{< /ui >}}
5. En {{< ui >}}Target Object actions{{< /ui >}}, asegúrese de que las acciones Crear, Actualizar y Eliminar estén seleccionadas
6. Revise los atributos de usuario que se sincronizan desde Microsoft Entra ID a Datadog en la sección de asignación de atributos. Establezca las siguientes asignaciones:
| Atributo de Microsoft Entra ID     | Atributo de Datadog              |
|----------------------------------|--------------------------------|
| `userPrincipalName`              | `userName`                     |
| `Not([IsSoftDeleted])`           | `active`                       |
| `jobTitle`                       | `title`                        |
| `mail`                           | `emails[type eq "work"].value` |
| `displayName`                    | `name.formatted`               |
| `AppRoleAssignmentsComplex([appRoleAssignments])` | `roles`               |

   {{< img src="/account_management/scim/ad-users-2.png" alt="Configuración de asignación de atributos, aprovisionar usuarios de Azure Active Directory">}}

7. Después de establecer sus asignaciones, haga clic en {{< ui >}}Save{{< /ui >}}.

Para aprovisionar el rol de Datadog de un usuario (integrado o personalizado), primero defina un rol de aplicación en el registro de la aplicación de Microsoft Entra. Cree un rol de aplicación para cada rol de Datadog que desee aprovisionar. Asigne los usuarios o grupos relevantes a esos roles de aplicación. Establezca el **Nombre para mostrar** de cada rol de aplicación en el nombre del rol de Datadog y su **Valor** en el UUID del rol de Datadog correspondiente. No utilice el nombre del rol de Datadog ni el valor de reclamación de rol SAML como **Valor** del rol de aplicación. Puede encontrar el UUID de un rol en la URL del rol en su página de [Configuración de la organización][11]. Para obtener instrucciones de configuración, consulte la [documentación de roles de aplicación de Microsoft][12]. Después de definir los roles de aplicación, asigne el atributo `roles` como se muestra arriba. Utilice la expresión `AppRoleAssignmentsComplex([appRoleAssignments])` para el atributo de Microsoft Entra ID. Si `roles` no está disponible en el menú desplegable de atributos de destino, agréguelo como un atributo de cadena **multivaluado**. Para obtener instrucciones de configuración, consulte la [documentación de asignación de atributos de Microsoft][10].

Los roles siguen la convención de atributos multivaluados SCIM definida en [RFC 7643][9]. Si una solicitud SCIM envía múltiples roles, Datadog aprovisiona solo los roles que coinciden con un rol en su organización. Si ninguno coincide y la organización tiene un rol predeterminado, el usuario vuelve a ese rol. Si la organización no tiene un rol predeterminado, Datadog omite la actualización del rol y conserva los roles existentes del usuario. Los roles que no coinciden se registran en Audit Trail. Para obtener más detalles, consulte [SCIM][1].

### Atributos de grupo {#group-attributes}

La asignación de grupos no es compatible.

[1]: /es/account_management/scim/
[2]: /es/account_management/scim/#using-a-service-account-with-scim
[3]: /es/api/latest/scim/
[4]: https://app.datadoghq.com/organization-settings/application-keys
[5]: /es/account_management/org_settings/service_accounts
[6]: https://entra.microsoft.com/
[7]: https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/permissions-reference#cloud-application-administrator
[8]: https://learn.microsoft.com/en-us/entra/identity/app-provisioning/application-provisioning-config-problem-scim-compatibility#flags-to-alter-the-scim-behavior
[9]: https://www.rfc-editor.org/rfc/rfc7643.html#section-4.1.2
[10]: https://learn.microsoft.com/en-us/entra/identity/app-provisioning/customize-application-attributes#provisioning-a-role-to-a-scim-app
[11]: https://app.datadoghq.com/organization-settings/roles
[12]: https://learn.microsoft.com/en-us/entra/identity-platform/howto-add-app-roles-in-apps