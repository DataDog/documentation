---
title: Configurar la autenticación de dos factores
---

La autenticación de dos factores (2FA) te proporciona una capa adicional de seguridad para tu cuenta. Cuando activas 2FA, sólo se puede acceder a tu cuenta de Cloudcraft desde dispositivos en los que confías.

Después de configurar 2FA, iniciarás una sesión en tu cuenta en dos pasos:

1. Escribe tu contraseña.
2. Introduce el código de tu aplicación virtual de autenticación multifactor.

<div class="alert alert-info">Si utiliza su cuenta de Google para loguear en Cloudcraft, 2FA no está disponible como Google proporciona esto para usted. Asegúrese de <a href="https://support.google.com/accounts/answer/185839" title="Protect your account with 2-Step Verification" referrerpolicy="no-referrer" rel="noopener noreferrer" target="_new">pasar por el 2FA proceso en el lado de Google</a> antes de iniciar sesión en su cuenta Cloudcraft.
</div>

## Activar 2FA

1. Descarga una aplicación de autenticación como Google Authenticator o [Authy][1] para tu teléfono.
2. Inicia sesión en tu cuenta de Cloudcraft.
3. Haz clic en el icono **Account** (Cuenta) y selecciona **Configuración de usuario**.
4. Haz clic en **Manage MFA** (Gestionar MFA). Se muestra el código de barras de 2FA.
5. Abre la aplicación de autenticación en tu teléfono y escanea el código de barras.
6. Introduce el código de verificación de seis dígitos generado por la aplicación de autenticación y haz clic en **Verify** (Verificar).

La siguiente ventana muestra una clave de recuperación. La clave de recuperación es una cadena de 18 caracteres de números y letras que sólo se muestra una vez y que puede ayudarte a volver a acceder a tu cuenta si pierdes el acceso al dispositivo que utilizas para gestionar 2FA. Esta clave actúa como una contraseña de un solo uso. Cloudcraft recomienda imprimirla y guardarla en un lugar seguro.

## Desactivar 2FA

Desactivar 2FA no está recomendado y puede contribuir a empeorar la seguridad general de tu cuenta. Heimdal Security tiene un excelente artículo sobre [por qué deberías utilizar siempre la autenticación de dos factores][2].

1. Inicia sesión en tu cuenta de Cloudcraft.
2. Haz clic en el icono **Account** (Cuenta) y selecciona **Configuración de usuario**.
3. Haz clic en **Manage MFA** (Gestionar MFA) y selecciona **Desactivar MFA**.

[1]: https://authy.com/
[2]: https://heimdalsecurity.com/blog/start-using-two-factor-authentication/