---
title: Activar SSO
---

Activar el inicio de sesión único (SSO) para tu cuenta te permite simplificar la autenticación y el acceso a Cloudcraft.

Cloudcraft admite SSO a través de estos métodos:

- **Datadog SSO**: Datadog SSO no requiere ninguna configuración adicional para las nuevas cuentas. Selecciona **Sign in with Datadog** (Iniciar sesión con Datadog) en las páginas de registro o inicio de sesión de Cloudcraft. [Ponte en contacto con el equipo de soporte de Cloudcraft][1] para activar esta función para las
  cuentas existentes.
- **Google Workspace SSO**: Google SSO no requiere ninguna configuración adicional. Selecciona **Sign in with Google** (Iniciar sesión con Google) en las páginas de registro o de inicio de sesión de Cloudcraft.
- **SAML SSO**: disponible para las cuentas de Cloudcraft Pro y Enterprise, SAML SSO federa con el proveedor de identidades existente de tu organización, lo que permite a tus usuarios loguear con sus cuentas existentes y a tu organización gestionar de forma centralizada quién tiene acceso a la aplicación.

Este artículo trata sobre SAML SSO y cómo configurarlo en tu cuenta.

## Configuración de SAML/SSO

<div class="alert alert-info">Sólo el propietario de la cuenta puede configurar la función SAML SSO. Si el propietario de la cuenta no puede configurar SSO, <a href="https://app.cloudcraft.co/app/support" title="Contact the Cloudcraft support team">ponte en contacto con el equipo de soporte de Cloudcraft</a> para habilitar esta función.</div>

1. Ve a **User** > **Security & SSO** (Usuario > Seguridad y SSO).
2. Registra Cloudcraft como una nueva aplicación con tu proveedor de identidad SAML. Para obtener instrucciones detalladas, consulta los siguientes artículos:
    - [Habilitar SSO con Azure AD][2]
    - [Habilitar SSO con Okta][3]
    - [Habilitar SSO con un proveedor de identidad genérico][4]
3. Encuentra los detalles necesarios para crear una nueva aplicación con el proveedor de identidad en la misma ventana.

{{< img src="cloudcraft/account-management/enable-sso/service-provider-details.png" alt="Configuración de la integración del proveedor de servicios de SAML de Cloudcraft" responsive="true" style="width:100%;">}}

4. Después de crear la aplicación, vuelve a Cloudcraft y carga el archivo de metadatos del proveedor de identidades.
5. Selecciona la opción **SAML Single Sign-On is enabled** (SAML Single Sign-On está activado).
6. Activa la opción **Strict mode** (Modo estricto) si necesitas restringir el acceso a Cloudcraft sólo a usuarios SAML SSO.

## Funciones adicionales

El uso de SAML SSO con Cloudcraft permite beneficios adicionales que son especialmente útiles cuando se gestiona un gran número de usuarios.

### Suministro de usuarios justo a tiempo (JIT)

Con el **Just-in-Time User Provisioning** (Suministro de usuarios justo a tiempo), Cloudcraft crea automáticamente cuentas de usuario cuando los usuarios se registran por primera vez con una dirección de correo electrónico de la empresa, sin necesidad de invitación.

La opción para cambiar el equipo predeterminado al que se unen los usuarios cuando inician sesión por primera vez se encuentra en la parte inferior de la página **Security & Single Sign-On** (Seguridad e inicio de sesión único).

### Inicio de sesión iniciado por el proveedor de identidades (IdP)

Permite el inicio de sesión en Cloudcraft directamente desde tu dashboard proveedor de identidades.

### Modo estricto

Con el **Strict mode** (Modo estricto) activado, todos los usuarios deben iniciar sesión con SAML SSO. Los inicios de sesión existentes con nombre de usuario/contraseña o Google Sign In están desactivados.

Asegúrate de que el inicio de sesión SAML SSO funciona correctamente antes de activar esta opción para evitar que se bloquee tu cuenta.

[1]: https://app.cloudcraft.co/app/support
[2]: /es/cloudcraft/account-management/enable-sso-with-azure-ad/
[3]: /es/cloudcraft/account-management/enable-sso-with-okta/
[4]: /es/cloudcraft/account-management/enable-sso-with-generic-idp/