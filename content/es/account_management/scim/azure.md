---
algolia:
  tags:
  - scim
  - proveedor de identidad
  - IdP
  - Azure AD
title: Configurar el SCIM con Azure Active Directory
---

Consulta las siguientes instrucciones para sincronizar tus usuarios de Datadog con Azure Active Directory utilizando el SCIM.

Para conocer los requisitos previos, las capacidades y las limitaciones, consulta el [SCIM][1].

## Añadir Datadog a la galería de aplicaciones Azure AD

1. En tu portal Azure, ve a **Azure Active Directory** -> **Enterprise Applications** (Azure Active Directory -> Aplicaciones empresariales).
2. Haz clic en **New Application** -> **Create your own application** (Nueva aplicación -> Crea tu propia aplicación).
3. Escribe "Datadog" en la casilla de búsqueda.
4. Selecciona la aplicación Datadog en la galería.
5. Introduce un nombre.
6. Haz clic en **Crear**.

**Nota:** Si ya tienes Datadog configurado con Azure AD para el inicio de sesión único, ve a **Enterprise Applications** (Aplicaciones empresariales) y selecciona tu aplicación Datadog existente.

## Configurar el suministro automático de usuarios

1. En la pantalla de gestión de aplicaciones, selecciona **Provisioning** (Suministrar) en el panel izquierdo
2. En el menú **Provisioning Mode** (Modo de suministro), selecciona **Automatic** (Automático).
3. Abre **Admin Credentials** (Credenciales de administrador).
4. Completa la sección **Admin Credentials** (Credenciales de administrador) de la siguiente manera:
    - **Tenant URL** (URL del arrendatario): `https://app.datadoghq.com/api/v2/scim`
    - **Secret Token** (Token secreto): Utiliza una clave de aplicación de Datadog válida. Puedes crear una clave de aplicación en tu [página de parámetros de la organización][2]. Para mantener un acceso continuo a tus datos, utiliza una clave de aplicación de [cuenta de servicio][3].

{{< img src="/account_management/scim/admin-credentials.png" alt="Pantalla de configuración de credenciales de administrador de Azure AD">}}

5. Haz clic en **Test Connection** (Probar conexión) y espera a que aparezca el mensaje que confirma que las credenciales están autorizadas para habilitar el suministro.
6. Haz clic en **Save** (Guardar). Aparecerá la sección de asignaciones. Consulta la siguiente sección para configurar asignaciones.

## Asignación de atributos

### Atributos de usuario

1. Amplía la sección **Mappings** (Asignaciones).
2. Haz clic en **Provision Azure Active Directory Users** (Suministrar usuarios de Azure Active Directory).
3. Establece **Enabled** (Habilitado) en **Yes** (Sí).
4. Haz clic en el icono **Save** (Guardar).
5. En **Target Object actions** (Acciones del objeto de destino), asegúrate de que las acciones Create, Update y Delete (Crear, Actualizar y Eliminar) están seleccionadas.
6. Revisa los atributos de usuario que se sincronizan desde Azure AD a Datadog en la sección de asignación de atributos. Establece las siguientes asignaciones:
| Atributo de Azure Active Directory | Atributo de Datadog |
|----------------------------------|--------------------------------|
| `userPrincipalName`              | `userName`                     |
| `Not([IsSoftDeleted])`           | `active`                       |
| `jobTitle`                       | `title`                        |
| `mail`                           | `emails[type eq "work"].value` |
| `displayName`                    | `name.formatted`               |

   {{< img src="/account_management/scim/ad-users.png" alt="Configuración de la asignación de atributos, suministro de usuarios de Azure Active Directory">}}

7. Después de configurar las asignaciones, haz clic en **Save** (Guardar).

### Atributos de grupo

No se admite la asignación de grupos.

[1]: /es/account_management/scim/
[2]: https://app.datadoghq.com/organization-settings/application-keys
[3]: /es/account_management/org_settings/service_accounts