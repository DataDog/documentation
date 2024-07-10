---
aliases:
- /es/guides/rbac
- /es/account_management/rbac/role_api
- /es/account_management/users/default_roles
- /es/account_management/users/custom_roles
- /es/account_management/rbac/log_management
further_reading:
- link: /api/v2/roles/
  tag: Documentación
  text: Gestiona roles y permisos con la API de roles
- link: /api/v2/roles/#list-permissions
  tag: Documentación
  text: Gestiona tus permisos con la API de Permisos
- link: /account_management/rbac/permissions
  tag: Documentación
  text: Descubre la lista de permisos disponibles
- link: /account_management/saml/
  tag: Documentación
  text: Habilita el inicio único de sesión con SAML
- link: https://www.datadoghq.com/blog/compliance-governance-transparency-with-datadog-audit-trail/
  tag: Blog
  text: Incrementa el cumplimiento, la gobernabilidad y la transparencia en todos
    tus equipos con Datadog Audit Trail
title: Control de acceso
---

## Información general

Datadog ofrece un sistema flexible de gestión de accesos que te permite personalizar el nivel en el que controlas el acceso a tus recursos de Datadog.

Los usuarios que buscan una funcionalidad básica tienen acceso a [roles](#role-based-access-control) OOTB con [permissions (permisos)][1]. Para una mayor flexibilidad, crea tus propios [custom roles (roles personalizados)](#custom-roles) para combinar permisos en nuevos roles. Los permisos asociados a un rol personalizado se aplican a todos los recursos de un tipo de recurso concreto.

Las organizaciones y los usuarios que necesitan la máxima flexibilidad pueden controlar el acceso a dashboards, notebooks y otros recursos individuales con [granular access control (control de acceso granular)][2].

## Control de acceso basado en roles

Los roles agrupan a los usuarios por categorías y definen qué permisos de cuenta tienen esos usuarios, tales como qué datos pueden leer o qué datos de cuenta pueden modificar. De forma predeterminada, Datadog ofrece tres roles y tú puedes crear [custom roles 
(roles personalizados)](#custom-roles) para que puedas definir un mejor ajuste entre tus usuarios y sus permisos.

Al conceder permisos a los roles, cualquier usuario que esté asociado a ese rol recibe ese permiso. Cuando los usuarios tienen asociados múltiples roles, reciben todos los permisos otorgados a cada uno de sus roles. Cuantos más roles tenga asociados un usuario, más acceso tendrá dentro de una cuenta Datadog.

Si un usuario en una [child organization (organización secundaria)][3] tiene permiso `org_management`, no significa que tenga el mismo permiso en la organización principal. Los roles de los usuarios no se comparten entre las organizaciones principales y secundarias.

**Nota**: Si utilizas un proveedor de identidad SAML, puedes integrarlo con Datadog para la autenticación, y puedes asignar atributos de identidad a los roles predeterminados y personalizados de Datadog. Para obtener más información, consulta [SAML group mapping (asignación de grupos SAML)][4].

## Roles predeterminados de Datadog

Función de administrador Datadog
: Los usuarios tienen acceso a la información de facturación y la capacidad de revocar claves API. Pueden gestionar usuarios y configurar [read-only dashboards (dashboards de solo lectura)][5]. También pueden promover usuarios estándar a administradores.

Función estándar Datadog
: Los usuarios pueden ver y modificar todas las funciones de monitorización que ofrece Datadog, como [dashboards][5], [monitors (monitores)][6], [events (eventos)][7] y [notebooks][8]. Los usuarios estándar también pueden invitar a otros usuarios a organizaciones.

Función de solo lectura Datadog
: Los usuarios no tienen acceso para editar dentro de Datadog. Esto resulta útil cuando se desea compartir vistas específicas de solo lectura con un cliente, o cuando un miembro de una unidad de negocio necesita compartir un [dashboard][5] con alguien fuera de su unidad.

## Roles personalizados

La función de roles personalizados ofrece a tu organización la posibilidad de crear nuevos roles con conjuntos de permisos únicos. Gestiona tus roles personalizados a través del sitio Datadog, la [Datadog Role API (API de rol Datadog)][8] o SAML directamente. Descubre a continuación cómo crear, actualizar o eliminar un rol. Consulta [Datadog Role Permissions (permisos de rol Datadog)][1] para obtener más información sobre los permisos disponibles. Solo los usuarios con el permiso Gestionar acceso de usuario pueden crear o editar roles en Datadog.

### Habilitar roles personalizados

1. Ve a [Organization Settings (parámetros de organización)][9].
2. En el lado izquierdo de la página, selecciona **Roles**.
3. Haz clic en el engranaje de la esquina superior derecha. Aparecerá la ventana emergente de Roles personalizados.
4. En la ventana emergente de Roles personalizados, haz clic en **Enable** (Activar).

{{< img src="account_management/rbac/enable_custom_roles.png" alt="Ventana emergente de Roles personalizados con el botón Activar" style="width:90%;">}}

Como alternativa, al realizar una invocación POST a [Create Role API endpoint (crear endpoint  de rol de API][10] se habilitan automáticamente los roles personalizados para tu organización.

### Crear un rol personalizado

{{< tabs >}}
{{% tab "Datadog application" %}}

Para crear un rol personalizado:

1. Ve a tu [Datadog Roles page (página de roles de Datadog)][1].
2. Selecciona **New Role** (Nuevo rol) en la esquina superior derecha de la página.
3. Dale un nombre a tu rol.
4. Asigna un conjunto de permisos a tu rol. Para obtener más información sobre los permisos disponibles, consulta [Datadog Role Permissions (permisos de rol de Datadog)][2].

Una vez que has creado un rol puedes [add the role to existing users (añadir el rol a los usuarios existentes)][3].


[1]: https://app.datadoghq.com/access/roles
[2]: /es/account_management/rbac/permissions/
[3]: /es/account_management/users/#edit-a-user-roles
{{% /tab %}}
{{% tab "API" %}}

Encontrarás un ejemplo de cómo crear un rol en la [Create Role API Reference (referencia de API de creación de roles de la API)][1].


[1]: /es/api/latest/roles/#create-role
{{% /tab %}}
{{< /tabs >}}

### Actualizar un rol

{{< tabs >}}
{{% tab "Datadog application" %}}

Para editar un rol personalizado:

1. Ve a tu [Datadog Roles page (página de roles de Datadog)][1].
2. Selecciona el botón editar en el rol que te gustaría modificar.
3. Modifica el conjunto de permisos para tu rol. Para obtener más información sobre los permisos disponibles, consulta [Role Permissions (permisos de rol)][2].
4. Guarda los cambios.


Una vez que un rol se ha modificado, los permisos se actualizan para todos los usuarios con ese rol.


[1]: https://app.datadoghq.com/access/roles
[2]: /es/account_management/rbac/permissions/
{{% /tab %}}
{{% tab "API" %}}

Encontrarás un ejemplo de cómo actualizar un rol en [Update Role API Reference (referencia de actualización de roles de la API)][1].


[1]: /es/api/latest/roles/#update-a-role
{{% /tab %}}
{{< /tabs >}}

### Clonar un rol

{{< tabs >}}
{{% tab "Datadog application" %}}

Para clonar un rol que ya existe:

1. Ve a tu [Datadog Roles page (página de roles de Datadog)][1].
2. Pasa el cursor sobre el rol que deseas clonar. Aparecerán una serie de botones a la derecha.
3. Selecciona el botón clonar en el rol que quieras clonar.
4. Si lo deseas, puedes modificar el nombre o los permisos del rol.
5. Haz clic en el botón **Save** (Guardar) en la parte inferior.

{{< img src="account_management/rbac/clone_role.png" alt="Lista de dos roles con el botón Clonar resaltado" style="width:90%;">}}


[1]: https://app.datadoghq.com/access/roles
{{% /tab %}}
{{% tab "API" %}}

Encontrarás un ejemplo de cómo clonar un rol en la [Cloning A Role API reference (referencia de la clonación de un rol de API)][1].

[1]: /es/api/latest/roles/#create-a-new-role-by-cloning-an-existing-role
{{% /tab %}}
{{< /tabs >}}

### Eliminar un rol

{{< tabs >}}
{{% tab "Datadog application" %}}

Para eliminar un rol personalizado:

1. Ve a tu [Datadog Roles page (página de roles de Datadog)][1].
2. Pasa el cursor sobre el rol que deseas eliminar. Aparecerán una serie de botones a la derecha.
3. Selecciona el botón eliminar en el rol que quieras borrar.
4. Confirma tu decisión.


Una vez que se elimina un rol, los permisos se actualizan para todos los usuarios con ese rol. Los usuarios sin ningún rol no pueden utilizar Datadog de forma efectiva, pero siguen manteniendo un acceso limitado.


[1]: https://app.datadoghq.com/access/roles
{{% /tab %}}
{{% tab "API" %}}

Encontrarás un ejemplo de cómo eliminar un rol en la [Delete Role API reference (referencia de eliminar un rol de API)][1].


[1]: /es/api/latest/roles/#delete-role
{{% /tab %}}
{{< /tabs >}}

### Aplicar una plantilla de roles

Al crear o actualizar un rol en el sitio Datadog, utiliza una plantilla de roles para aplicar un conjunto predeterminado de permisos al rol.

1. En la página Nuevo rol o Editar rol, haz clic en el botón de la derecha **Show Role Templates** (Mostrar plantillas de roles).
2. Aparecerá un menú desplegable con plantillas de roles.
3. Selecciona en el menú la plantilla de rol cuyos permisos deseas aplicar a tu rol.
4. Haz clic en el botón **Apply** (Aplicar).
4. Si lo deseas, puedes realizar cambios adicionales en tu rol.
5. Pulsa el botón **Save** (Guardar).

{{< img src="account_management/rbac/role_templates.png" alt="Menú desplegable de plantillas de rol con el rol de administrador de facturación de Datadog seleccionado" style="width:90%;">}}

## Leer más

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/account_management/rbac/permissions/
[2]: /es/account_management/rbac/granular_access/
[3]: /es/account_management/multi_organization/
[4]: /es/account_management/saml/mapping/
[5]: /es/dashboards/
[6]: /es/monitors/
[7]: /es/events/
[8]: /es/api/v2/roles/
[9]: https://app.datadoghq.com/organization-settings/
[10]: /es/api/latest/roles/#create-role