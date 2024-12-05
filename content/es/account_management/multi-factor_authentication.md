---
title: Autenticación multifactor (MFA)
---

## Información general

La autenticación multifactor (MFA), o autenticación de dos factores (2FA), requiere que un usuario utilice más de un tipo de verificación para autenticarse en un sistema. La MFA protege contra la mayoría de los ataques relacionados con contraseñas, incluyendo fuerza bruta, relleno de credenciales y pulverización de contraseñas.

## Funcionalidades

-   **MFA for native Datadog accounts** (MFA para cuentas nativas de Datadog): La MFA está disponible como capa adicional de seguridad para el inicio de sesión en cuentas que inician sesión en Datadog directamente utilizando un correo electrónico y contraseña. Las cuentas nativas verificadas mediante correo electrónico y contraseña son más vulnerables a los ataques que las cuentas de proveedores de identidad.
-   **Opt-in MFA** (AMF opcional): La MFA está disponible para los usuarios finales como una función opcional. Habilita la MFA en cualquier momento utilizando tus parámetros personales.
-   **Authenticator apps** (Aplicaciones de autenticación): Para la MFA se puede utilizar cualquier aplicación de autenticación compatible con la autenticación de contraseña de un solo uso basada en tiempo (TOTP). Algunos ejemplos son Microsoft Authenticator, Google Authenticator, Authy y Duo.

## Limitaciones

-   La MFA no está disponible para cuentas que sólo utilizan el inicio de sesión único (SSO). Para utilizar la MFA con SAML y Google Auth, configúrala a través de tu proveedor de identidades (IdP).
-   La MFA no protege contra todo tipo de ataques. Por ejemplo, si un atacante tiene acceso a tu correo electrónico, puede desactivar la MFA y poner en peligro tu cuenta.
-   La MFA admite una aplicación de autenticación como máximo.

## Requisitos previos

Para configurar la MFA en tu cuenta, inicia sesión utilizando tu **email y contraseña**. Los usuarios que inician sesión mediante el SSO **no** ven las opciones de configuración de la MFA.

## Configura la MFA en tu cuenta de usuario

Para acceder a la página [Contraseña y autenticación][1]:

1. Asegúrate de haber iniciado sesión con una combinación de nombre de usuario y contraseña, no mediante el SSO.
1. Ve a **Personal Settings** (Configuración personal), desde el menú de tu cuenta.
1. En **Security** (Seguridad), selecciona **Password & Authentication** (Contraseña y autenticación).

La sección de autenticación multifactor enumera todas las aplicaciones de autenticación configuradas.

1. Junto a **Authenticator App** (Aplicación de autenticación), selecciona **Add** (Añadir).
1. Consulta la documentación de tu aplicación de autenticación para obtener instrucciones sobre cómo añadir un nuevo código QR.
1. Introduce el último código generado por tu aplicación de autenticación para confirmar que el dispositivo se ha configurado correctamente.
1. Guarda una copia de los códigos de recuperación en una ubicación segura. Los códigos no pueden recuperarse una vez finalizada la configuración.

## Ver el estado de la MFA de un usuario

Para ver si un usuario tiene la MFA configurada o no, puedes filtrarlos en la tabla Users (Usuarios). El estado de la MFA también está disponible en el panel de informaciones del usuario. 

{{< img src="account_management/multi-factor-authentication-status.png" alt="Vista del estado de la MFA en la página de informaciones del usuario. El ejemplo muestra que el usuario tiene la MFA configurada" style="width:90%;" >}}

## Recuperación de la MFA

Si no tienes acceso a tu aplicación de autenticación, durante el proceso de inicio de sesión puedes utilizar un código de recuperación, en lugar de una contraseña de un solo uso. Cada uno de los códigos de recuperación sólo puede utilizarse una vez.

1. Ve a la [página de inicio de sesión][2].
1. Introduce tu dirección de correo electrónico y tu contraseña, y luego selecciona **Log in** (Iniciar sesión).
1. Selecciona **Don't have access to your authenticator?** (¿No tienes acceso a tu autenticador?).
1. Introduce uno de tus códigos de recuperación no utilizados y haz clic en **Verify** (Verificar).

## Rescate de la MFA

Si no tienes acceso a tu aplicación de autenticación o a tus códigos de recuperación, durante el proceso de inicio de sesión puedes solicitar un enlace de recuperación de un solo uso por correo electrónico.

1. Ve a la [página de inicio de sesión][2].
1. Introduce tu dirección de correo electrónico y tu contraseña, y luego selecciona **Log in** (Iniciar sesión).
1. Selecciona **Don't have access to your authenticator?** (¿No tienes acceso a tu autenticador?).
1. Selecciona **Don't have access to your recovery codes? Get a one time recovery link via email.** (¿No tienes acceso a tus códigos de recuperación? Recibe un enlace de recuperación de un solo uso por correo electrónico.).
1. Busca en tu bandeja de correo electrónico un mensaje con el asunto "Enlace de recuperación para iniciar sesión en tu cuenta Datadog".
1. Selecciona el enlace **Log in to Datadog** (iniciar sesión en Datadog) para completar el inicio de sesión en su cuenta.

Si has perdido el acceso a tu aplicación de autenticación registrada, Datadog te recomienda que elimines el dispositivo perdido y añadas uno nuevo. Disponer de una aplicación de autenticación válida te ayuda a evitar problemas al iniciar sesión en tu cuenta en el futuro.

[1]: https://app.datadoghq.com/personal-settings/password-and-authentication
[2]: https://app.datadoghq.com