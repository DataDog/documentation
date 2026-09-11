---
title: Habilitar SSO con Okta
---

Habilitar el inicio de sesión único (SSO) con Okta como proveedor de identidad te permite simplificar la autenticación y el acceso de inicio de sesión a Cloudcraft.

Este artículo te ayuda a configurar SSO si tu proveedor de identidad es Okta. Para otros proveedores de identidad, consulta los siguientes artículos:

- [Habilitar SSO con Azure AD][1]
- [Habilitar SSO con un proveedor de identidad genérico][2]

Para información general sobre el uso de SSO con Cloudcraft, consulta [Habilitar SSO en tu cuenta][3].

## Configuración de SAML/SSO

<div class="alert alert-info">Sólo el propietario de la cuenta puede configurar la función SAML SSO. Si el propietario de la cuenta no puede configurar SSO, <a href="https://app.cloudcraft.co/app/support" title="Contact the Cloudcraft support team">ponte en contacto con el equipo de soporte de Cloudcraft</a> para habilitar esta función.</div>

1. En Cloudcraft, ve a **User** > **Security & SSO** (Usuario > Seguridad y SSO).
2. Los detalles que necesitas para crear una nueva aplicación con Okta se encuentran en la sección **Cloudcraft service provider details** (Detalles del proveedor de servicio de Cloudcraft).

{{< img src="cloudcraft/account-management/enable-sso-with-okta/service-provider-details.png" alt="Captura de pantalla de los detalles del proveedor de servicio de Cloudcraft para la configuración del proveedor de identidad con el ID de identidad y la URL de servicio del consumidor de aserción" responsive="true" style="width:100%;">}}

3. Inicia sesión en Okta como administrador.
4. Haz clic en **Application** (Aplicación).
5. Haz clic en **Add Application** (Añadir aplicación) y, a continuación, en **Create New App** (Crear nueva aplicación).
6. Selecciona **SAML 2.0** como método de inicio de sesión y haz clic en **Create** (Crear).
7. Introduce **Cloudcraft** como nombre de la aplicación y deja el resto de valores como están.
8. Haz clic en **Next** (Siguiente).

<div class="alert alert-info">Si prefieres utilizar el logotipo de una aplicación, puedes utilizar <a href="https://static.cloudcraft.co/images/cloudcraft-okta-logo.png" title="Cloudcraft Logo" rel="noopener noreferrer" target="_new">este logotipo</a> que respeta las restricciones de tamaño de Okta.
</div>

9. A continuación, configura la integración SAML con los detalles proporcionados por Cloudcraft. Los campos se asignan de la siguiente manera, siendo el primero la etiqueta (label) en Okta y el segundo la etiqueta (label) en Cloudcraft.
    - **URL de SSO**: URL de servicio del consumidor de aserción
    - **URI del público**: ID de la entidad del proveedor del servicio

{{< img src="cloudcraft/account-management/enable-sso-with-okta/saml-settings.png" alt="Captura de pantalla de la interfaz de configuración SAML con campos para la URL de SSO y la configuración de ID de entidad." responsive="true" style="width:80%;">}}

10. En el desplegable **Name ID format** (Formato de ID del nombre), selecciona **EmailAddress** (Dirección de correo electrónico).
11. Pasa a la siguiente pantalla y selecciona **I'm an Okta customer adding an internal app** (Soy un cliente de Okta que añade una aplicación interna) para responder a la pregunta "Are you a customer or partner?" (¿Eres cliente o socio?).
12. Haz clic en **Finish** (Finalizar). Ahora que la aplicación está configurada en Okta, puedes asignar tus usuarios a la misma y una vez que hayas terminado, navega a la pestaña **Sign On** (Iniciar sesión).

{{< img src="cloudcraft/account-management/enable-sso-with-okta/sign-on-settings.png" alt="Captura de pantalla que muestra los ajustes de configuración de SAML 2.0 en una interfaz de aplicación de Okta." responsive="true" style="width:80%;">}}

13. En el botón **View Setup Instructions** (Ver instrucciones de configuración), haz clic en el enlace azul para descargar el archivo necesario para cargarlo en Cloudcraft.
14. Navega de nuevo a Cloudcraft y sube tu archivo de configuración.

{{< img src="cloudcraft/account-management/enable-sso-with-okta/upload-metadata.png" alt="Estado de inicio de sesión único en SAML configurado con éxito, con la URL del proveedor de identidad visible en la interfaz de los parámetros de seguridad." responsive="true" style="width:80%;">}}

15. Activa la opción **SAML Single Sign-On is enabled** (SAML Single Sign-On está activado).
16. Si prefieres que tus usuarios accedan a Cloudcraft únicamente a través de tu proveedor de identidad, activa la opción **Strict mode** (Modo estricto).

[1]: /es/cloudcraft/account-management/enable-sso-with-azure-ad/
[2]: /es/cloudcraft/account-management/enable-sso-with-generic-idp/
[3]: /es/cloudcraft/account-management/enable-sso/
[4]: https://app.cloudcraft.co/app/support