---
title: Activar SSO con un proveedor de identidad genérico
---

Activar el inicio de sesión único (SSO) en Cloudcraft te permite simplificar la autenticación y el acceso a Cloudcraft.

Este artículo te ayuda a configurar SSO si no dispones de una guía específica para tu proveedor de identidad. Si tu proveedor de identidad es Azure AD u Okta, consulta los siguientes artículos:

- [Activar SSO con Azure AD][1]
- [Activar SSO con Okta][2]

Para obtener más información general sobre el uso de SSO con Cloudcraft, consulta [Habilitar SSO en tu cuenta][3].

## Configuración de SAML/SSO

<div class="alert alert-info">Sólo el propietario de la cuenta puede configurar la función SSO SAML. Si el propietario de la cuenta no puede configurar SSO, <a href="https://app.cloudcraft.co/app/support" title="Contact the Cloudcraft support team">ponte en contacto con el equipo de asistencia de Cloudcraft</a> para habilitar esta función.</div>

1. En Cloudcraft, ve a **Usuario** > **Seguridad y SSO**.
2. Los detalles que necesitas para crear una nueva aplicación con Azure se encuentran en la sección **Información del proveedor del servicio Cloudcraft**.

{{< img src="cloudcraft/account-management/enable-sso-with-generic-idp/service-provider-details.png" alt="Captura de pantalla de la información del proveedor del servicio Cloudcraft para la configuración del proveedor de identidad con el ID de la entidad y la URL del servicio del consumidor de la aserción." responsive="true" style="width:100%;">}}

3. Inicia sesión en tu proveedor de identidad como administrador.
4. Consulta su documentación para crear una nueva aplicación para la integración SAML.
5. Asigna sus campos a los campos de Cloudcraft. Como referencia, los campos se suelen asignar de la siguiente manera: la primera es la etiqueta (label) utilizada por tu proveedor de identidad y la segunda es la etiqueta (label) en Cloudcraft.

    - **URL de inicio de sesión único**: URL del servicio del consumidor de la aserción
    - **URI del público**: ID de la entidad del proveedor del servicio
    - **ID del nombre**: Formato NameId

6. Si el campo **ID del nombre** es desplegable, selecciona **dirección de correo electrónico** o similar.

<div class="alert alert-info">También puedes incluir el logotipo de una aplicación para que los usuarios puedan ver fácilmente a qué aplicación están accediendo. <a href="https://static.cloudcraft.co/images/cloudcraft-okta-logo.png" title="Cloudcraft Logo" rel="noopener noreferrer" target="_new">Aquí</a> tenemos uno que se ajusta a las restricciones de la mayoría de los proveedores.
</div>

7. Configura la aplicación para permitir el acceso a todos los usuarios relevantes dentro de tu organización.
8. Descarga el archivo de metadatos generado por tu proveedor, a veces denominado XML de federación.
9. Vuelve a tu Cloudcraft y carga tsu archivo XML de metadatos.

{{< img src="cloudcraft/account-management/enable-sso-with-generic-idp/upload-metadata.png" alt="Estado de inicio de sesión único en SAML configurado con éxito, con el proveedor de identidad visible en la interfaz de los parámetros de seguridad." responsive="true" style="width:100%;">}}

10. Activa la opción **El inicio de sesión único en SAML está activado**.
11.  Si prefieres que tus usuarios accedan a Cloudcraft únicamente a través de tu proveedor de identidad, activa la opción **Modo estricto**.

[1]: /es/cloudcraft/account-management/enable-sso-with-azure-ad/
[2]: /es/cloudcraft/account-management/enable-sso-with-okta/
[3]: /es/cloudcraft/account-management/enable-sso/
[4]: https://app.cloudcraft.co/support