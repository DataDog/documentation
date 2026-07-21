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
  personalizados y control de acceso granular para tableros, monitors y otros recursos
  de Datadog.
further_reading:
- link: /api/v2/roles/
  tag: Documentación
  text: Administre roles y permisos con Roles API.
- link: /api/v2/roles/#list-permissions
  tag: Documentación
  text: Administre sus permisos con Permissions API.
- link: /account_management/rbac/permissions
  tag: Documentación
  text: Descubra la lista de permisos disponibles.
- link: /account_management/saml/
  tag: Documentación
  text: Habilite el inicio de sesión único con SAML.
- link: https://www.datadoghq.com/blog/compliance-governance-transparency-with-datadog-audit-trail/
  tag: Blog
  text: Construya cumplimiento, gobernanza y transparencia en sus equipos con Audit
    Trail de Datadog.
title: Access Control
---
## Resumen {#overview}

Datadog ofrece un sistema de gestión de acceso flexible que le permite personalizar el nivel en el que controla el acceso a sus recursos de Datadog.

Los usuarios que buscan funcionalidad básica tienen acceso a [roles predeterminados](#role-based-access-control) con [permisos][1]. Para mayor flexibilidad, cree sus propios [roles personalizados](#custom-roles) para combinar permisos en nuevos roles. Los permisos adjuntos a un rol personalizado se aplican a todos los recursos de un tipo de recurso particular.

Las organizaciones y los usuarios que necesitan máxima flexibilidad pueden controlar el acceso a tableros individuales, notebooks y otros recursos con [control de acceso granular][2].

## Control de acceso basado en roles {#role-based-access-control}

Los roles categorizan a los usuarios y definen qué permisos de cuenta tienen esos usuarios, como qué datos pueden leer o qué activos de la cuenta pueden modificar. Por defecto, Datadog ofrece tres roles, y cree [roles personalizados](#custom-roles) para definir una mejor asignación entre sus usuarios y sus permisos.

Al otorgar permisos a roles, cualquier usuario asociado con ese rol recibe ese permiso. Cuando los usuarios están asociados con múltiples roles, reciben todos los permisos otorgados a cada uno de sus roles. Cuantos más roles tenga un usuario, mayor acceso tendrá dentro de una cuenta de Datadog.

Si un usuario en una [organización hija][3] tiene `org_management` permiso, no significa que tenga el mismo permiso en la organización principal. Los roles de los usuarios no se comparten entre organizaciones principales e hijas.

**Nota**: Si utiliza un proveedor de identidad SAML, puede integrarlo con Datadog para autenticación, y puede mapear atributos de identidad a los roles predeterminados y personalizados de Datadog. Para más información, consulte [mapeo de grupos SAML][4].

## Roles predeterminados de Datadog {#datadog-default-roles}

Rol de Administrador de Datadog
: Los usuarios tienen acceso a la información de facturación y la capacidad de revocar claves de API. Pueden gestionar usuarios y configurar [tableros de solo lectura][5]. También pueden promover a usuarios estándar a administradores.

Rol Estándar de Datadog
: Se permite a los usuarios ver y modificar todas las características de seguimiento que ofrece Datadog, como [tableros][5], [seguimiento][6], [eventos][7] y [notebooks][11]. Los usuarios estándar también pueden invitar a otros usuarios a organizaciones.

Rol de Solo Lectura de Datadog
: Los usuarios no tienen acceso a editar dentro de Datadog. Esto es útil cuando desea compartir vistas específicas de solo lectura con un cliente, o cuando un miembro de una unidad de negocio necesita compartir un [tablero][5] con alguien fuera de su unidad.

## Roles personalizados {#custom-roles}

La función de roles personalizados le da a su organización la capacidad de crear nuevos roles con conjuntos de permisos únicos. Gestione sus roles personalizados a través del sitio de Datadog, [Datadog Role API][8] o SAML directamente. Descubra a continuación cómo crear, actualizar o eliminar un rol. Consulte [Datadog Role Permissions][1] para obtener más información sobre los permisos disponibles. Solo los usuarios con el permiso User Access Manage pueden crear o editar roles en Datadog.

### Habilite roles personalizados {#enable-custom-roles}

1. Navegue a [Organization Settings][9].
2. En el lado izquierdo de la página, seleccione {{< ui >}}Roles{{< /ui >}}.
3. Haga clic en el engranaje en la esquina superior derecha. Aparece el cuadro emergente de Roles Personalizados.
4. En el cuadro emergente de Roles Personalizados, haga clic en {{< ui >}}Enable{{< /ui >}}.

{{< img src="account_management/rbac/enable_custom_roles.png" alt="Cuadro emergente de Roles Personalizados con botón Habilitar" style="width:90%;">}}

Alternativamente, hacer una llamada POST al [Create Role API endpoint][10] habilita automáticamente los roles personalizados para su organización.

### Cree un rol personalizado {#create-a-custom-role}

{{< tabs >}}
{{% tab "Aplicación de Datadog" %}}

Para crear un rol personalizado:

1. Vaya a su [Datadog Roles page][1].
2. Seleccione {{< ui >}}New Role{{< /ui >}} en la esquina superior derecha de la página.
3. Asigne un nombre a su rol.
4. Asigne un conjunto de permisos a su rol. Consulte [Datadog Role Permissions][2] para obtener más información sobre los permisos disponibles.

Una vez que se crea un rol, puede [agregar el rol a usuarios existentes][3].


[1]: https://app.datadoghq.com/access/roles
[2]: /es/account_management/rbac/permissions/
[3]: /es/account_management/users/#edit-a-user-roles
{{% /tab %}}
{{% tab "API" %}}

Encuentre un ejemplo de cómo crear un rol en [Create Role API Reference][1].


[1]: /es/api/latest/roles/#create-role
{{% /tab %}}
{{< /tabs >}}

### Actualice un rol {#update-a-role}

{{< tabs >}}
{{% tab "Aplicación de Datadog" %}}

Para editar un rol personalizado:

1. Vaya a su [Datadog Roles page][1].
2. Seleccione el botón de editar en el rol que le gustaría modificar.
3. Modifique el conjunto de permisos para su rol. Consulte [Role Permissions][2] para obtener más información sobre los permisos disponibles.
4. Guarde sus cambios.


Una vez que un rol es modificado, los permisos se actualizan para todos los usuarios con el rol.


[1]: https://app.datadoghq.com/access/roles
[2]: /es/account_management/rbac/permissions/
{{% /tab %}}
{{% tab "API" %}}

Encuentre un ejemplo de cómo actualizar un rol en [Update Role API Reference][1].


[1]: /es/api/latest/roles/#update-a-role
{{% /tab %}}
{{< /tabs >}}

### Clone un rol {#clone-a-role}

{{< tabs >}}
{{% tab "Aplicación de Datadog" %}}

Para clonar un rol existente:

1. Vaya a su [Datadog Roles page][1].
2. Pase el cursor sobre el rol que le gustaría clonar. Aparece una serie de botones a la derecha.
3. Seleccione el botón de clonar en el rol que le gustaría clonar.
4. Opcionalmente, modifique el nombre o los permisos del rol.
5. Haga clic en el botón {{< ui >}}Save{{< /ui >}} en la parte inferior.

{{< img src="account_management/rbac/clone_role.png" alt="Lista de dos roles con el botón de Clonar destacado." style="width:90%;">}}


[1]: https://app.datadoghq.com/access/roles
{{% /tab %}}
{{% tab "API" %}}

Encuentre un ejemplo de cómo clonar un rol en [Cloning A Role API Reference][1].

[1]: /es/api/latest/roles/#create-a-new-role-by-cloning-an-existing-role
{{% /tab %}}
{{< /tabs >}}

### Elimine un rol {#delete-a-role}

{{< tabs >}}
{{% tab "Aplicación de Datadog" %}}

Para eliminar un rol personalizado:

1. Ve a tu [página de Roles de Datadog][1].
2. Pasa el cursor sobre el rol que deseas eliminar. Aparece una serie de botones a la derecha.
3. Selecciona el botón de eliminar en el rol que deseas eliminar.
4. Confirma tu decisión.


Una vez que se elimina un rol, los permisos se actualizan para todos los usuarios con el rol. Los usuarios sin roles no pueden usar Datadog de manera efectiva, pero aún mantienen acceso limitado.


[1]: https://app.datadoghq.com/access/roles
{{% /tab %}}
{{% tab "API" %}}

Encuentre un ejemplo de cómo eliminar un rol en [Delete Role API Reference][1].


[1]: /es/api/latest/roles/#delete-role
{{% /tab %}}
{{< /tabs >}}

### Aplique una plantilla de rol {#apply-a-role-template}

Al crear o actualizar un rol en el sitio de Datadog, use un Datadog role template para aplicar un conjunto prescrito de permisos al rol.

1. En la página New Role o Edit Role, haga clic en el botón {{< ui >}}Show Role Templates{{< /ui >}} a la derecha.
2. Aparece un menú desplegable poblado con plantillas de rol.
3. Del menú, seleccione el Datadog role template cuyos permisos desea aplicar a su rol.
4. Haga clic en el botón {{< ui >}}Apply{{< /ui >}}.
4. Opcionalmente, realice cambios adicionales en su rol.
5. Haga clic en el botón {{< ui >}}Save{{< /ui >}}.

{{< img src="account_management/rbac/role_templates.png" alt="Menú desplegable de Plantillas de Rol con Datadog Billing Admin Role seleccionado." style="width:90%;">}}

## Lectura adicional {#further-reading}

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