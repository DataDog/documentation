---
title: Habilitar el SSO con Azure AD
---

Habilitar el inicio de sesión único (SSO) con Azure AD como proveedor de identidad te permite simplificar la autenticación y el acceso de inicio de sesión a Cloudcraft.

Este artículo te ayuda a configurar el SSO si tu proveedor de identidad es Azure AD. Para otros proveedores de identidad, consulta los siguientes artículos:

- [Habilitar el SSO con Okta][1]
- [Habilitar el SSO con un proveedor de identidad genérico][2]

Para ver más información general sobre el uso del SSO con Cloudcraft, consulta [Habilitar SSO en tu cuenta][3].

## Configuración de SAML/SSO

<div class="alert alert-info">Sólo el propietario de la cuenta puede configurar la función SSO SAML. Si el propietario de la cuenta no puede configurar el SSO, <a href="https://app.cloudcraft.co/app/support" title="Contact the Cloudcraft support team">ponte en contacto con el equipo de asistencia de Cloudcraft</a> para habilitar esta función.
</div>

1. En Cloudcraft, ve a **User** > **Security & SSO** (Usuario > Seguridad y SSO).
2. La información que necesitas para crear una nueva aplicación con Azure se encuentra en la sección **Información del proveedor del servicio Cloudcraft**.

{{< img src="cloudcraft/account-management/enable-sso-with-azure-ad/service-provider-details.png" alt="Captura de pantalla de Información del proveedor del servicio Cloudcraft para la configuración del proveedor de identidad con el ID de entidad y la URL de servicio del consumidor de la aserción" responsive="true" style="width:100%;">}}

3. Inicia sesión en Azure como administrador.
4. Haz clic en el menú situado en la esquina superior izquierda de la pantalla y selecciona **Azure Active Directory**.
5. En la sección **Gestionar** del menú de la izquierda, haz clic en **Enterprise applications* (Aplicaciones empresariales).
6. Haz clic en **New application** (Nueva aplicación) y selecciona **Aplicación que no es de galería**.
7. Introduce **Cloudcraft** como nombre de la aplicación y haz clic en **Add** (Añadir).

A continuación, configura la integración SAML utilizando la información proporcionada por Cloudcraft.

1. En la sección **Empezando**, selecciona **Configurar inicio de sesión único** y luego haz clic en **SAML**.
2. En la sección **Configuración SAML básica**, haz clic en **Edit** (Editar).
3. Introduce la información proporcionada por Cloudcraft. Los campos se asignan como sigue, siendo el primer valor la etiqueta (label) en Azure AD y el segundo la etiqueta en el diálogo de Cloudcraft.
    - **Identificador**: ID de entidad del proveedor de servicio.
    - **URL de respuesta**: URL de servicio del consumidor de aserciones.
    - **URL de inicio de sesión**: Déjalo en blanco para permitir el SSO iniciado por el proveedor de identidad.

{{< img src="cloudcraft/account-management/enable-sso-with-azure-ad/saml-settings.png" alt="Captura de pantalla de la interfaz de configuración básica de SAML que muestra los campos del Identificador (ID de entidad) y la URL de respuesta (URL de servicio del consumidor de aserciones)" responsive="true" style="width:80%;">}}

4. Haz clic en **Save** (Guardar) para volver a la pantalla anterior.
5. En la sección **Certificado de firma SAML**, selecciona **XML de metadatos de federación** y descarga el archivo XML en tu ordenador.
6. Vuelve a Cloudcraft y carga tu archivo XML de metadatos.

{{< img src="cloudcraft/account-management/enable-sso-with-azure-ad/upload-metadata.png" alt="Estado de inicio de sesión único SAML configurado correctamente con la URL del proveedor de identidad visible en la interfaz de parámetros de seguridad." responsive="true" style="width:100%;">}}

7. Activa la opción **Inicio de sesión único SAML activado**.
8. Vuelve al portal Azure.
9. En la sección **Probar inicio de sesión único con Cloudcraft**, haz clic en **Test** para probar tu integración.
10. Si prefieres que tus usuarios accedan a Cloudcraft únicamente a través de Azure AD, activa la opción **Modo estricto**, que desactiva todos los demás métodos de inicio de sesión.

**Nota**: Para conceder acceso a los usuarios de tu organización, consulte [la documentación de Azure AD][4].

[1]: /es/cloudcraft/account-management/enable-sso-with-okta/
[2]: /es/cloudcraft/account-management/enable-sso-with-generic-idp/
[3]: /es/cloudcraft/account-management/enable-sso/
[4]: https://docs.microsoft.com/en-us/azure/active-directory/manage-apps/assign-user-or-group-access-portal
[5]: https://app.cloudcraft.co/support