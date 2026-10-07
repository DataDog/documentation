---
title: Autenticación multifactor (MFA)
---

## Información general

La autenticación multifactor (MFA), o autenticación en dos fases (2FA), requiere que un usuario utilice más de un tipo de verificación para autenticarse en un sistema. La MFA protege contra la mayoría de los ataques relacionados con contraseñas, incluidos la fuerza bruta, el relleno de credenciales y la pulverización de contraseñas.

## Funcionalidades

-   **MFA para cuentas nativas de Datadog**: la MFA está disponible como una capa adicional de seguridad durante el inicio de sesión en cuentas que inician sesión en Datadog directamente utilizando un correo electrónico y una contraseña. Las cuentas nativas verificadas mediante correo electrónico/contraseña son más vulnerables a los ataques que las cuentas cuyo mantenimiento se hace a través de proveedores de identidad.
-   **MFA opcional**: la MFA está disponible para los usuarios finales como una función opcional. Habilita la MFA en cualquier momento utilizando tus parámetros personales.
-   **MFA obligatorio**: los administradores pueden requerir a todos los usuarios de una organización que inicien sesión con un correo electrónico y una contraseña para registrar un segundo factor de autenticación antes de acceder a la organización. Para activar la aplicación de MFA, consulta [Métodos de inicio de sesión][1]. 
-   **Aplicaciones de autenticación**: para la MFA se puede utilizar cualquier aplicación de autenticación que sea compatible con la autenticación de contraseña de un solo uso y duración limitada (TOTP). Algunos ejemplos son Microsoft Authenticator, Google Authenticator, Authy y Duo.

## Limitaciones

-   La MFA no está disponible para cuentas que solo utilizan un inicio de sesión único (SSO). Para utilizar la MFA con SAML y Google Auth, configúrala a través de tu proveedor de identidad (IdP).
-   La MFA no protege contra todo tipo de ataques. Por ejemplo, si un atacante tiene acceso a tu correo electrónico, puede desactivar la MFA y poner en peligro tu cuenta.
-   La MFA admite como máximo una aplicación de autenticación.

## Requisitos previos

Para configurar la MFA en tu cuenta, inicia sesión utilizando tu **correo electrónico y contraseña**. Los usuarios que inician sesión mediante el SSO **no** ven las opciones de configuración de la MFA.

## Configura la MFA en tu cuenta de usuario

Para acceder a la página [Contraseña y autenticación][2]:

1. Asegúrate de haber iniciado sesión con una combinación de nombre de usuario y contraseña, no mediante el SSO.
1. Consulta **Parámetros personales** desde el menú de tu cuenta.
1. En **Seguridad**, selecciona **Contraseña y autenticación**.

La sección de autenticación multifactor enumera todas las aplicaciones de autenticación configuradas.

1. Junto a **Aplicación de autenticación**, selecciona **Añadir**.
1. Consulta la documentación de tu aplicación de autenticación para obtener instrucciones sobre cómo añadir un nuevo código QR.
1. Introduce el último código generado por tu aplicación de autenticación para confirmar que el dispositivo se ha configurado correctamente.
1. Guarda una copia de los códigos de recuperación en una ubicación segura. Los códigos no pueden recuperarse una vez finalizada la configuración.

## Ver el estado de la MFA de un usuario

Para ver si un usuario tiene la MFA configurada o no, puedes filtrar por la tabla de usuarios. El estado de la MFA también está disponible en el panel de informacióon del usuario. 

{{< img src="account_management/multi-factor-authentication-status.png" alt="Vista del estado de la MFA en la página de información del usuario. El ejemplo muestra que el usuario tiene la MFA configurada" style="width:90%;" >}}

## Recuperación de la MFA

Si no tienes acceso a tu aplicación de autenticación, durante el proceso de inicio de sesión puedes utilizar un código de recuperación en lugar de una contraseña de un solo uso. Los códigos de recuperación solo pueden utilizarse una vez.

1. Navega hasta la [página de inicio de sesión][3].
1. Introduce tu dirección de correo electrónico y contraseña, y luego selecciona **Iniciar sesión**.
1. Selecciona **¿No tienes acceso a la aplicación de autenticación?**
1. Introduce uno de tus códigos de recuperación no utilizados y haz clic en **Verificar**.

## Rescate de la MFA

Si no tienes acceso a tu aplicación de autenticación o a los códigos de recuperación, durante el proceso de inicio de sesión puedes solicitar un enlace de recuperación de un solo uso por correo electrónico.

1. Navega hasta la [página de inicio de sesión][3].
1. Introduce tu dirección de correo electrónico y contraseña, y luego selecciona **Iniciar sesión**.
1. Selecciona **¿No tienes acceso a la aplicación de autenticación?**
1. Selecciona **¿No tienes acceso a tus códigos de recuperación? Recibe un enlace de recuperación de un solo uso por correo electrónico.**
1. Busca en tu bandeja de correo electrónico un mensaje con el asunto "Enlace de recuperación para iniciar sesión en tu cuenta Datadog".
1. Selecciona el enlace **Iniciar sesión en Datadog** para completar el inicio de sesión en tu cuenta.

Si has perdido el acceso a la aplicación de autenticación que tienes registrada, Datadog recomienda que elimines el dispositivo perdido y añadas uno nuevo. Disponer de una aplicación de autenticación válida te ayudará a evitar problemas al iniciar sesión en tu cuenta en el futuro.

[1]: /es/account_management/login_methods/#requiring-multi-factor-authentication
[2]: https://app.datadoghq.com/personal-settings/password-and-authentication
[3]: https://app.datadoghq.com