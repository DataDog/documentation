---
title: Configuración de métodos de inicio de sesión
---

Login Methods establece cómo pueden identificarse e iniciar sesión los usuarios en tu organización de Datadog. La utilización de Login Methods para activar o desactivar los métodos de inicio de sesión predeterminados requiere uno de los siguientes permisos de acceso con privilegios:

- Rol de administrador de Datadog
- Permiso de gestión de la organización (`org_management`)

Cuando un método de inicio de sesión está activado de forma predeterminada, cualquier usuario al que no se le deniegue explícitamente el acceso ([mediante la anulación de su método de inicio de sesión][1]) puede utilizar ese método para acceder a Datadog. Eso sí, su nombre de usuario (es decir, su dirección de correo electrónico) siempre debe coincidir con el usuario que ha recibido la invitación para unirse a la organización.

Métodos de inicio de sesión disponibles:

- Nombre de usuario y contraseña de Datadog (estándar) 
- Inicio de sesión de Google
- [Iniciar sesión con SAML][2]

## Activar o desactivar un método de inicio de sesión predeterminado

Como directivo, puedes activar o desactivar los métodos de inicio de sesión predeterminados de tu organización. En un primer momento, las nuevas organizaciones tienen el **nombre de usuario y contraseña de Datadog** y el **inicio de sesión de Google** configurados para todas las organizaciones y usuarios. No obstante, una vez que configures SAML, también tendrás el **inicio sesión con SAML** activado.

1. Ve a [Métodos de inicio de sesión][3].
2. Establece el parámetro **Enabled by Default** (Activado de forma predeterminada) de cada método en `On` u `Off`, de acuerdo con las preferencias de tu organización o los requisitos de su política.
3. Confirma tu selección.

**Nota**: No puedes desactivar todos los métodos de inicio de sesión de una organización. Tiene que haber, al menos, uno activado por defecto.

## Revisar las anulaciones de usuarios

Mediante las anulaciones, puedes cambiar los métodos de inicio de sesión disponibles para usuarios concretos. En el siguiente ejemplo, el **inicio de sesión de Google** está desactivado (Off) de forma predeterminada en la organización, pero hay un usuario que lo tiene activado debido a una anulación.

{{< img src="account_management/login_methods_disabled_overrides_set.png" alt="Método de inicio de sesión desactivado con una anulación de usuario configurada" style="width:80%;">}}

En [Gestión de usuarios][4], puedes filtrar los usuarios por los métodos de anulación configurados o ver los usuarios que tienen habilitados los métodos de inicio de sesión predeterminados:

{{< img src="account_management/users/user_page_login_methods_override_view.png" alt="Vista de User Management filtrada para mostrar a los usuarios según el método de inicio de sesión configurado." style="width:80%;">}}

Puedes editar las anulaciones del usuario o eliminarlas por completo para permitir que el usuario solo pueda usar las establecidas por defecto. Para más información, consulta la sección [Editar los métodos de inicio de sesión de un usuario][1]. 

[1]: /es/account_management/users/#edit-a-users-login-methods
[2]: /es/account_management/saml/
[3]: https://app.datadoghq.com/organization-settings/login-methods
[4]: https://app.datadoghq.com/organization-settings/users