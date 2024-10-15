---
aliases:
- /es/account_management/team/
description: Añade o elimina usuarios de tu organización y modifica sus roles.
further_reading:
- link: /account_management/saml/
  tag: Documentación
  text: Configurar SAML para tu cuenta de Datadog
- link: /account_management/rbac/
  tag: Documentación
  text: Aprende cómo crear, actualizar y borrar un rol
- link: /account_management/rbac/permissions/
  tag: Documentación
  text: Descubre la lista de permisos disponibles
- link: /api/v1/users/
  tag: Documentación
  text: Gestión de usuarios a través de la API del usuario
title: Gestión de usuarios
---
{{< site-region region="gov" >}}
<div class="alert alert-warning">El sitio Datadog for Government solo permite el inicio de sesión con SAML.</div>
{{< /site-region >}}

La pestaña **User** (Usuario) en **Organization Settings** (Parámetros de la organización) te permite gestionar los usuarios y sus roles asociados. Puedes alternar entre las vistas de lista y de cuadrícula haciendo clic en **List View** (Vista de lista) y **Grid View** (Vista de cuadrícula) a la derecha.

## Añadir miembros y gestionar invitaciones

Si quieres añadir algún miembro a tu organización:

1. Accede la página Organization Settings (Parámetros de la organización) y haz clic en la pestaña **Users** (Usuarios).
2. Haz clic en **Invite Users** (Invitar usuarios) en la esquina superior derecha de la página.
3. Ingresa la dirección de correo electrónico del usuario al que quieres invitar a tu cuenta de Datadog.
4. Asigna uno o más [roles de usuario][1] a los usuarios.
**Nota**: Los usuarios con el permiso Invite User (Invitar usuarios) pueden invitar a otros usuarios a los roles que les pertenecen. Los usuarios con los permisos Invite User y Access Management (Gestión de acceso) pueden invitar a otros usuarios a cualquier rol.
5. Haz clic en **Send Invites** (Enviar invitaciones).

El nuevo usuario recibe un correo electrónico con un enlace para iniciar sesión y tendrá el estado `Invite Pending` hasta que complete el proceso. Si quieres cancelar la invitación antes de que inicie sesión, haz clic en el botón **Delete Invite** (Borrar invitación), que aparece a la derecha del usuario en la vista de lista, o en la casilla del usuario en la vista de cuadrícula.

Para reenviar una invitación en la vista de lista, haz clic en el usuario y se abrirá el panel lateral. Haz clic en **Resend Invite** (Reenviar invitación). En la vista de cuadrícula, pasa el cursor sobre la casilla del usuario y haz clic en **Resend Invite**.

## Editar los roles de un usuario

Sólo los usuarios con el permiso User Access Management (Gestión de acceso de usuarios), por ejemplo los que tienen un rol de administrador en Datadog, pueden modificar el rol de otro usuario.

Para editar el rol de un usuario:

1. Accede a la pestaña **Users** (Usuarios) en **Organization Settings** (Parámetros de la organización).
2. Selecciona **Edit** (Editar) a la derecha del usuario.
3. Elige el nuevo [rol de usuario][2] para este usuario o haz clic en la "X", junto al rol existente, si quieres eliminarlo.
4. **Guarda** los nuevos parámetros.

{{< img src="account_management/users/user_role_update.png" alt="Actualizar un rol de usuario" style="width:80%;">}}

Para descubrir los roles disponibles y cómo crear roles personalizados, consulta la [documentación sobre el control del acceso basado en roles][2].

## Editar los métodos de inicio de sesión de un usuario

Sólo los usuarios con el permiso User Access Management (Gestión de acceso de usuarios), por ejemplo los que tienen un rol de administrador en Datadog, pueden modificar los métodos de inicio de sesión de otros usuarios.

Los métodos de inicio de sesión predeterminados de una organización se pueden configurar en la página de métodos de inicio de sesión, desde donde podrás autorizar o no a todos los usuarios de tu organización a utilizar un nombre de usuario o una contraseña de Datadog, a iniciar sesión con Google o para iniciar sesión con SAML. En User Management (Gestión de usuarios) también puedes hacer modificaciones individuales a cada usuario para permitirle utilizar un método de inicio de sesión concreto o varios. Esto puede resultar útil si quieres que todos los usuarios utilicen SAML, pero necesitas que algunos de ellos puedan iniciar sesión con su usuario y contraseña en caso de emergencia.

Para editar los métodos de inicio de sesión de un usuario:

1. Accede a la pestaña **Users** (Usuarios) en **Organization Settings** (Parámetros de la organización).
2. Selecciona **Edit** (Editar) a la derecha del usuario.
3. Activa **Override Default Login Methods** (Anular los métodos de inicio de sesión predeterminados) para activar o desactivar parámetros específicos para un usuario.
4. Si activas esta opción, elige un conjunto de métodos de inicio de sesión que el usuario puede utilizar para conectarse a Datadog. Puedes definir un único método o todos los que tengas configurados para tu organización.
5. Haz clic en **Save** (Guardar).


**Nota**: Las anulaciones pueden definirse únicamente en métodos de inicio de sesión válidos. Si no has configurado SAML, no podrás utilizarlo como anulación para un usuario.

## Desactivar miembros existentes

Sólo los usuarios con el permiso Access Management (Gestión de acceso), por ejemplo los que tienen un rol de administrador en Datadog, pueden desactivar miembros. No es posible eliminar usuarios de forma permanente, ya que pueden ser propietarios de dashboards o de monitores, y sus ID de usuario se utilizan para hacer un seguimiento de su acciones. Cuando se desactiva un usuario, las claves de aplicación que haya generado se revocan automáticamente.

1. Accede a la pestaña **Users** (Usuarios) en **Organization Settings** (Parámetros de la organización).
2. Selecciona **Edit** (Editar) a la derecha del usuario.
3. Haz clic en la opción **Disable** (Desactivar).
4. **Guarda** los cambios.
5. Confirma la acción.

**Nota**: Por defecto, los usuarios desactivados se excluyen de la lista de usuarios de la página User Management (Gestión de usuarios). Si tienes los permisos correctos, puedes filtrar los usuarios con estado `Disabled` y reactivarlos.

## Leer más

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/account_management/users/default_roles/
[2]: /es/account_management/rbac/