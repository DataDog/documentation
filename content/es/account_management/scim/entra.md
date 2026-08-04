---
algolia:
  tags:
  - scim
  - proveedor de identidad
  - IdP
  - Azure AD
  - Entra ID
aliases:
- /es/account_management/scim/azure/
description: Configura el aprovisionamiento automatizado de usuarios desde Microsoft
  Entra ID a Datadog utilizando la configuración de SCIM paso a paso y la asignación
  de atributos.
title: Configurar SCIM con Microsoft Entra ID
---

<div class="alert alert-info">
SCIM está disponible con los planes Infrastructure Pro e Infrastructure Enterprise.
</div>

<div class="alert alert-danger">
  Debido a la detención por parte de Microsoft de las actualizaciones de aplicaciones de terceros en Entra a raíz de un problema de seguridad sucedido a finales de 2024, el aprovisionamiento de equipos a través de SCIM no está disponible. Para crear Teams en Datadog, utiliza una de las alternativas admitidas: 
  <a href="https://docs.datadoghq.com/account_management/saml/mapping/" target="_blank">asignación de ASAML</a>, 
  <a href="https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/team" target="_blank">Terraform</a>, 
  <a href="https://docs.datadoghq.com/api/latest/teams/" target="_blank">la API pública</a>, o 
  <a href="https://docs.datadoghq.com/api/latest/scim/" target="_blank">llamadas directas al servidor de SCIM</a>. SCIM también puede usarse para aprovisionar usuarios.
</div>

Consulta las siguientes instrucciones para sincronizar tus usuarios de Datadog con Microsoft Entra ID mediante SCIM.

Para conocer las capacidades y limitaciones de esta función, consulta [SCIM][1].

## Requisitos previos

SCIM en Datadog es una función avanzada disponible con los planes Infrastructure Pro e Infrastructure Enterprise.

Esta documentación presupone que tu organización gestiona las identidades de los usuarios utilizando un proveedor de identidad (IdP).

Datadog recomienda utilizar la clave de aplicación de una cuenta de servicio al configurar SCIM, para evitar cualquier interrupción en el acceso. Para obtener más información, consulta el [uso de cuentas de servicio con SCIM][2].

Al utilizar SAML y SCIM conjuntamente, Datadog recomienda encarecidamente deshabilitar el suministro justo-a-tiempo (JIT) de SAML, para evitar discrepancias en el acceso. Gestiona el suministro de usuarios únicamente a través del SCIM.

## Añadir Datadog a la galería de aplicaciones de Microsoft Entra ID

1. Inicia sesión en el [centro de administración de Microsoft Entra][6] como mínimo como [Cloud Application Administrator][7]
1. Ve a **Identity** -> **Applications** -> **Enterprise Applications** (Identidad -> Aplicaciones -> Aplicaciones empresariales)
1. Haz clic en **New Application** (Nueva aplicación)
1. Escribe "Datadog" en la casilla de búsqueda.
1. Selecciona la aplicación Datadog en la galería.
1. Si lo deseas, introduce un nombre en la casilla **Name** (Nombre).
1. Haz clic en **Create** (Crear).

**Nota:** Si ya tienes Datadog configurado con Microsoft Entra ID para SSO, ve a **Enterprise Applications** (Aplicaciones empresariales) y selecciona tu aplicación de Datadog existente.

## Configurar el suministro automático de usuarios

1. En la pantalla de gestión de aplicaciones, selecciona **Provisioning** (Suministrar) en el panel izquierdo
2. En el menú **Provisioning Mode** (Modo de suministro), selecciona **Automatic** (Automático).
3. Abre **Admin Credentials** (Credenciales de administrador).
4. Completa la sección **Admin Credentials** (Credenciales de administrador) de la siguiente manera:
    - **URL del inquilino**: `https://{{< region-param key="dd_full_site" >}}/api/v2/scim?aadOptscim062020`
        - **Nota:** Utiliza el subdominio apropiado para tu sitio. Para encontrar tu URL, consulta [sitios de Datadog][3].
        - **Nota:** La parte `?aadOptscim062020` de la URL del arrendatario es específicamente para Entra ID. Se trata de un indicador que le indica a Entra que corrija su comportamiento de SCIM tal como se describe en esta [documentación de Microsoft Entra][8]. Si no utilizas Entra ID, no debes incluir este sufijo en la URL.
    - **Token secreto**: utiliza una clave de aplicación válida de Datadog. Puedes crear una clave de aplicación en [la página de configuración de tu organización][4]. Para mantener un acceso continuo a tus datos, utiliza una clave de aplicación de [cuenta de servicio][5].

{{< img src="/account_management/scim/admin-credentials-entra-flag.png" alt="Pantalla de configuración de las Credenciales de administrador de Azure AD">}}

5. Haz clic en **Test Connection** (Probar conexión) y espera a que aparezca el mensaje que confirma que las credenciales están autorizadas para habilitar el suministro.
6. Haz clic en **Save** (Guardar). Aparecerá la sección de asignaciones. Consulta la siguiente sección para configurar asignaciones.

## Asignación de atributos

### Atributos de usuario

1. Expande la sección **Mappings** (Asignaciones).
2. Haz clic en **Provision Azure Active Directory Users** (Aprovisionar usuarios de Azure Active Directory). Aparecerá la página de Asignación de atributos.
3. Establece **Enabled** (Habilitado) en **Yes** (Sí).
4. Haz clic en el icono **Save** (Guardar).
5. En **Target Object actions** (Acciones del objeto de destino), asegúrate de que las acciones Create, Update y Delete (Crear, Actualizar y Eliminar) están seleccionadas.
6. Revisa los atributos de usuario que se sincronizan desde Microsoft Entra ID a Datadog en la sección de asignación de atributos. Establece las siguientes asignaciones:
| Atributo de Microsoft Entra ID     | Atributo de Datadog              |
|----------------------------------|--------------------------------|
| `userPrincipalName`              | `userName`                     |
| `Not([IsSoftDeleted])`           | `active`                       |
| `jobTitle`                       | `title`                        |
| `mail`                           | `emails[type eq "work"].value` |
| `displayName`                    | `name.formatted`               |

   {{< img src="/account_management/scim/ad-users-2.png" alt="Configuración de asignación de atributos, aprovisionamiento de los usuarios de Azure Active Directory">}}

7. Después de configurar las asignaciones, haz clic en **Save** (Guardar).

### Atributos de grupo

No se admite la asignación de grupos.

[1]: /es/account_management/scim/
[2]: /es/account_management/scim/#using-a-service-account-with-scim
[3]: /es/getting_started/site
[4]: https://app.datadoghq.com/organization-settings/application-keys
[5]: /es/account_management/org_settings/service_accounts
[6]: https://entra.microsoft.com/
[7]: https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/permissions-reference#cloud-application-administrator
[8]: https://learn.microsoft.com/en-us/entra/identity/app-provisioning/application-provisioning-config-problem-scim-compatibility#flags-to-alter-the-scim-behavior