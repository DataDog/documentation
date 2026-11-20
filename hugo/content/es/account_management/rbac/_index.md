---
algolia:
  tags:
  - rbac
aliases:
- /es/guides/rbac
- /es/account_management/rbac/role_api
- /es/account_management/users/default_roles
- /es/account_management/users/custom_roles
- /es/account_management/rbac/log_management
description: Administre el acceso de los usuarios con permisos basados en roles, roles
  personalizados y control de acceso granular para dashboards, monitores y otros recursos
  de Datadog.
further_reading:
- link: /api/v2/roles/
  tag: Documentación
  text: Administre roles y permisos con la API de Roles
- link: /api/v2/roles/#list-permissions
  tag: Documentación
  text: Administre sus permisos con la API de Permisos
- link: /account_management/rbac/permissions
  tag: Documentación
  text: Descubra la lista de permisos disponibles
- link: /account_management/saml/
  tag: Documentación
  text: Habilite el inicio de sesión único con SAML
- link: https://www.datadoghq.com/blog/compliance-governance-transparency-with-datadog-audit-trail/
  tag: Blog
  text: Genere cumplimiento, gobernanza y transparencia en sus equipos con Datadog
    Audit Trail
- link: /account_management/delete_data/
  tag: Documentación
  text: Elimine datos de Datadog
title: Access Control
---
## Descripción general {#overview}

Datadog ofrece un sistema flexible de gestión de acceso que le permite personalizar el nivel en el que controla el acceso a sus recursos de Datadog.

Los usuarios que buscan una funcionalidad básica tienen acceso a [roles](#role-based-access-control) predeterminados con [permisos][1]. Para mayor flexibilidad, cree sus propios [roles personalizados](#custom-roles) para combinar permisos en nuevos roles. Los permisos asignados a un rol personalizado se aplican a todos los recursos de un tipo de recurso en particular.

Las organizaciones y los usuarios que necesitan la máxima flexibilidad pueden controlar el acceso a dashboards, notebooks y otros recursos individuales con [control de acceso granular][2].

## Control de acceso basado en roles {#role-based-access-control}

Los roles categorizan a los usuarios y definen qué permisos de cuenta tienen, como qué datos pueden leer o qué activos de la cuenta pueden modificar. De forma predeterminada, Datadog ofrece tres roles, y usted puede crear [roles personalizados](#custom-roles) para definir una mejor asignación entre sus usuarios y sus permisos.

Al otorgar permisos a los roles, cualquier usuario asociado con ese rol recibe dicho permiso. Cuando los usuarios están asociados con múltiples roles, reciben todos los permisos otorgados a cada uno de sus roles. Cuantos más roles tenga asociados un usuario, mayor acceso tendrá dentro de una cuenta de Datadog.

Si un usuario en una [organización secundaria][3] tiene el `org_management` permiso, no significa que tenga el mismo permiso en la organización principal. Los roles de los usuarios no se comparten entre organizaciones principales y secundarias.

**Nota**: Si utiliza un proveedor de identidad SAML, puede integrarlo con Datadog para la autenticación y puede asignar atributos de identidad a los roles predeterminados y personalizados de Datadog. Para obtener más información, consulte [SAML group mapping][4].

## Roles predeterminados de Datadog {#datadog-default-roles}

Datadog Admin
: Los usuarios tienen acceso a la información de facturación y la capacidad de revocar claves de API. Pueden administrar usuarios y configurar [read-only dashboards][5]. También pueden promover a usuarios estándar a administradores.

Datadog Standard Role
: Los usuarios pueden visualizar y modificar todas las funciones de monitoreo que ofrece Datadog, como [dashboards][5], [monitors][6], [events][7] y [notebooks][11]. Los usuarios estándar también pueden invitar a otros usuarios a las organizaciones.

Datadog Read Only Role
: Los usuarios no tienen acceso para editar dentro de Datadog. Esto resulta útil cuando desea compartir visualizaciones específicas de solo lectura con un cliente, o cuando un miembro de una unidad de negocio necesita compartir un [dashboard][5] con alguien fuera de su unidad.

## Roles personalizados {#custom-roles}

La función de roles personalizados le da a su organización la capacidad de crear nuevos roles con conjuntos de permisos únicos. Administre sus roles personalizados a través del sitio de Datadog, la [Datadog Role API][8] o directamente mediante SAML. Descubra a continuación cómo crear, actualizar o eliminar un rol. Consulte [Datadog Role Permissions][1] para obtener más información sobre los permisos disponibles. Solo los usuarios con el permiso User Access Manage pueden crear o editar roles en Datadog.

### Habilitar roles personalizados {#enable-custom-roles}

1. Navegue a [Organization Settings][9].
2. En el lado izquierdo de la página, seleccione {{< ui >}}Roles{{< /ui >}}.
3. Haga clic en el engranaje en la esquina superior derecha. Aparece la ventana emergente Custom Roles.
4. En la ventana emergente Custom Roles, haga clic en {{< ui >}}Enable{{< /ui >}}.

{{< img src="account_management/rbac/enable_custom_roles.png" alt="Ventana emergente Custom Roles con el botón Enable." style="width:90%;">}}

Alternativamente, realizar una llamada POST al [Create Role API punto de conexión][10] habilita automáticamente los roles personalizados para su organización.

### Crear un rol personalizado {#create-a-custom-role}

{{< tabs >}}
{{% tab "Aplicación de Datadog" %}}

Para crear un rol personalizado:

1. Vaya a su [Datadog Roles page][1].
2. Seleccione {{< ui >}}New Role{{< /ui >}} en la esquina superior derecha de la página.
3. Asigne un nombre a su rol.
4. Asigne un conjunto de permisos a su rol. Consulte [Datadog Role Permissions][2] para obtener más información sobre los permisos disponibles.

Una vez creado un rol, puede [agregar el rol a los usuarios existentes][3].


[1]: https://app.datadoghq.com/access/roles
[2]: /es/account_management/rbac/permissions/
[3]: /es/account_management/users/#edit-a-user-roles
{{% /tab %}}
{{% tab "API" %}}

Encuentre un ejemplo de cómo crear un rol en [Create Role API Reference][1].


[1]: /es/api/latest/roles/#create-role
{{% /tab %}}
{{< /tabs >}}

### Actualizar un rol {#update-a-role}

{{< tabs >}}
{{% tab "Aplicación de Datadog" %}}

Para editar un rol personalizado:

1. Vaya a su [Datadog Roles page][1].
2. Seleccione el botón de editar en el rol que desea modificar.
3. Modifique el conjunto de permisos para su rol. Consulte [Permisos de rol][2] para obtener más información sobre los permisos disponibles.
4. Guarde sus cambios.


Una vez que se modifica un rol, los permisos se actualizan para todos los usuarios con ese rol.


[1]: https://app.datadoghq.com/access/roles
[2]: /es/account_management/rbac/permissions/
{{% /tab %}}
{{% tab "API" %}}

Encuentre un ejemplo de cómo actualizar un rol en [Update Role API Reference][1].


[1]: /es/api/latest/roles/#update-a-role
{{% /tab %}}
{{< /tabs >}}

### Clonar un rol {#clone-a-role}

{{< tabs >}}
{{% tab "Aplicación de Datadog" %}}

Para clonar un rol existente:

1. Vaya a su [Datadog Roles page][1].
2. Pase el cursor sobre el rol que desea clonar. Aparece una serie de botones a la derecha.
3. Seleccione el botón de clonar en el rol que desea clonar.
4. Opcionalmente, modifique el nombre o los permisos del rol.
5. Haga clic en el botón {{< ui >}}Save{{< /ui >}} en la parte inferior.

{{< img src="account_management/rbac/clone_role.png" alt="Lista de dos roles con el botón Clonar resaltado" style="width:90%;">}}


[1]: https://app.datadoghq.com/access/roles
{{% /tab %}}
{{% tab "API" %}}

Encuentre un ejemplo de cómo clonar un rol en [Cloning A Role API reference][1].

[1]: /es/api/latest/roles/#create-a-new-role-by-cloning-an-existing-role
{{% /tab %}}
{{< /tabs >}}

### Eliminar un rol {#delete-a-role}

{{< tabs >}}
{{% tab "Aplicación de Datadog" %}}

Para eliminar un rol personalizado:

1. Vaya a su [Datadog Roles page][1].
2. Pase el cursor sobre el rol que desea eliminar. Aparece una serie de botones a la derecha.
3. Seleccione el botón de eliminar en el rol que desea eliminar.
4. Confirme su decisión.


Una vez que se elimina un rol, los permisos se actualizan para todos los usuarios con ese rol. Los usuarios sin ningún rol no pueden usar Datadog de manera efectiva, pero aún mantienen un acceso limitado.


[1]: https://app.datadoghq.com/access/roles
{{% /tab %}}
{{% tab "API" %}}

Encuentre un ejemplo de cómo eliminar un rol en [Delete Role API reference][1].


[1]: /es/api/latest/roles/#delete-role
{{% /tab %}}
{{< /tabs >}}

### Aplicar una plantilla de rol {#apply-a-role-template}

Al crear o actualizar un rol en el sitio de Datadog, utilice una plantilla de rol de Datadog para aplicar un conjunto prescrito de permisos al rol.

1. En la página Nuevo rol o Editar rol, haga clic en el botón {{< ui >}}Show Role Templates{{< /ui >}} a la derecha.
2. Aparece un menú desplegable con plantillas de roles.
3. En el menú, seleccione la plantilla de rol cuyos permisos desea aplicar a su rol.
4. Haga clic en el botón {{< ui >}}Apply{{< /ui >}}.
4. Opcionalmente, realice cambios adicionales en su rol.
5. Haga clic en el botón {{< ui >}}Save{{< /ui >}}.

{{< img src="account_management/rbac/role_templates.png" alt="Menú desplegable de plantillas de roles con el rol de Administrador de Facturación de Datadog seleccionado" style="width:90%;">}}

## Lecturas adicionales {#further-reading}

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
[11]: /es/notebooks