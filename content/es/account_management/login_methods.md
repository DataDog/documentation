---
description: Activa o desactiva métodos de autenticación como nombre de usuario/contraseña,
  Google OAuth y SAML para tu organización de Datadog con opciones de aplicación de
  MFA.
title: Configuración de métodos de inicio de sesión
---

Login Methods establece cómo pueden identificarse e iniciar sesión los usuarios en tu organización de Datadog. La utilización de Login Methods para activar o desactivar los métodos de inicio de sesión predeterminados requiere uno de los siguientes permisos de acceso con privilegios:

- Rol de administrador de Datadog
- Permiso de gestión de la organización (`org_management`)

Cuando un método de inicio de sesión está activado de forma predeterminada, cualquier usuario al que no se le deniegue explícitamente el acceso ([mediante la anulación de su método de inicio de sesión][1]) puede utilizar ese método para acceder a Datadog. Eso sí, su nombre de usuario (es decir, su dirección de correo electrónico) siempre debe coincidir con el usuario que ha recibido la invitación para unirse a la organización.

Métodos de inicio de sesión disponibles:

- Nombre de usuario y contraseña de Datadog (estándar) 
    - Las contraseñas deben tener al menos 8 caracteres que contengan como mínimo un número y una letra minúscula.
- Inicio de sesión de Google
- [Iniciar sesión con SAML][2]

## Activar o desactivar un método de inicio de sesión predeterminado

Como administrador de una organización, puedes habilitar o deshabilitar los métodos de inicio de sesión predeterminados de tu organización. Las nuevas organizaciones comienzan con **Nombre de usuario y contraseña de Datadog** e **Iniciar sesión con Google** habilitados y configurados para todas las organizaciones y usuarios. Después de configurar SAML, **Iniciar sesión con SAML** también está habilitado.

1. Ve a [Métodos de inicio de sesión][3].
2. Establece el parámetro **Enabled by Default** (Activado de forma predeterminada) de cada método en `On` u `Off`, de acuerdo con las preferencias de tu organización o los requisitos de su política.
3. Confirma tu selección.

**Nota**: No puedes desactivar todos los métodos de inicio de sesión de una organización. Tiene que haber, al menos, uno activado por defecto.

## Solicitud de autenticación multifactor

Para mejorar la seguridad, los responsables de la organización pueden exigir la [autenticación multifactor][4] (AMF) a todos los usuarios de la organización que inician sesión con un correo electrónico y una contraseña.

1. Ve a [Métodos de inicio de sesión][3].
2. Configura el parámetro **Requerir autenticación multifactor** en `On` o `Off`, según las preferencias de tu organización o los requisitos de la política.
3. Confirma tu selección.

Configurar el parámetro **Requerir autenticación multifactor** en `On` tiene dos efectos:
- Los usuarios que inician sesión con un correo electrónico y una contraseña deben registrar un segundo factor de autenticación antes de acceder a la organización.
- En Métodos de inicio de sesión, aparece un enlace a [**Ver usuarios sin AMF**][5]. Haz clic en el enlace para ver la lista de usuarios, filtrados en usuarios sin AMF.

La configuración para exigir la autenticación multifactor es independiente de la configuración del método de inicio de sesión predeterminado. Independientemente de los métodos de inicio de sesión que habilites por defecto, la aplicación de la AMF requiere un segundo factor de autenticación para los usuarios que inician sesión con un correo electrónico y una contraseña.

## Revisar las anulaciones de usuarios

Mediante las anulaciones, puedes cambiar los métodos de inicio de sesión disponibles para usuarios concretos. En el siguiente ejemplo, el **inicio de sesión de Google** está desactivado (Off) de forma predeterminada en la organización, pero hay un usuario que lo tiene activado debido a una anulación.

{{< img src="account_management/login_methods_enabled_off.png" alt="Método de inicio de sesión deshabilitado con la anulación de usuario habilitada" style="width:80%;">}}

En [Gestión de usuarios][6], puedes filtrar los usuarios por los métodos de anulación definidos o ver los usuarios que tienen activados los métodos de inicio de sesión predeterminados:

{{< img src="account_management/users/user_page_login_methods_override_view.png" alt="Vista de User Management filtrada para mostrar a los usuarios según el método de inicio de sesión configurado." style="width:80%;">}}

Puedes editar las anulaciones del usuario o eliminarlas por completo para permitir que el usuario solo pueda usar las establecidas por defecto. Para más información, consulta la sección [Editar los métodos de inicio de sesión de un usuario][1]. 

[1]: /es/account_management/users/#edit-a-users-login-methods
[2]: /es/account_management/saml/
[3]: https://app.datadoghq.com/organization-settings/login-methods
[4]: /es/account_management/multi-factor_authentication/
[5]: https://app.datadoghq.com/organization-settings/users?filter%5Ballowed_login_methods%5D=standard&filter%5Bmfa_enabled%5D=false&filter%5Bstatus%5D=Active
[6]: https://app.datadoghq.com/organization-settings/users