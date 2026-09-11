---
algolia:
  tags:
  - saml
description: Configura la autenticación SAML para Datadog con proveedores de identidad
  como Active Directory, Auth0, Google, Okta y Microsoft Entra ID para un inicio de
  sesión único seguro.
disable_toc: false
further_reading:
- link: /account_management/saml/
  tag: Documentación
  text: Inicio de sesión único con SAML
- link: account_management/saml/mapping/
  tag: Documentación
  text: Asignación de grupos SAML
title: Configuración del inicio de sesión único con SAML
---

## Información general

En esta página se explica cómo habilitar el inicio de sesión único (SSO) con SAML en Datadog, así como la forma en que los clientes empresariales pueden habilitar varios proveedores de identidad (IdP) SAML.

**Notas**: 

{{% site-region region="us,us3,us5,eu,ap1,ap2" %}}
- Si no tienes SAML activado en tu cuenta de Datadog, ponte en contacto con [support (soporte)][1] para activarlo.
- En esta documentación se da por sentado que ya tienes un proveedor de identidad (IdP) SAML. Si no tienes un IdP SAML, hay varios IdP que tienen integraciones con Datadog como [Active Directory][2], [Auth0][3], [Azure][2], [Google][4], [LastPass][5], [Microsoft Entra ID][2], [Okta][6] y [SafeNet][7].
- La configuración de SAML requiere el acceso de [administrador Datadog][8], o el permiso `Org Management` si estás utilizando roles personalizados.
{{% /site-region %}}

{{% site-region region="gov" %}}
- En esta documentación se da por sentado que ya tienes un proveedor de identidad (IdP) SAML. Si no tienes un IdP SAML, hay varios IdP que tienen integraciones con Datadog como [Active Directory][2], [Auth0][3], [Azure][2], [Google][4], [LastPass][5], [Microsoft Entra ID][2], [Okta][6] y [SafeNet][7].
- La configuración de SAML requiere el acceso de [administrador Datadog][8], o el permiso `Org Management` si estás utilizando roles personalizados.
{{% /site-region %}}

## Configuración de SAML

1. Para empezar la configuración, consulta la documentación de tu IdP:

    * [Active Directory][9]
    * [Auth0][10]
    * [Google][12]
    * [Microsoft Entra ID][11]
    * [LastPass][13]
    * [Okta][14]
    * [SafeNet][15]

2. Descarga los [metadatos de proveedor de servicios][17] de Datadog para configurar tu IdP de modo que reconozca a Datadog como proveedor de servicios.

3. En Datadog, pasa el cursor sobre tu nombre de usuario en la esquina inferior izquierda y selecciona **Organization Settings** (Configuración de la organización). Selecciona [**Login Methods** (Métodos de inicio de sesión)][16] y haz clic en **Configure** (Configurar) en SAML.

4. Haz clic en **Add SAML** (Añadir SAML).

5. En el modal de configuración:
    * Crea un nombre fácil de usar para este proveedor SAML. El nombre se mostrará a los usuarios finales cuando elijan un método de inicio de sesión.
    * Carga los metadatos de IdP de tu proveedor de identidad SAML haciendo clic en **browse files** (buscar archivos) o arrastrando y soltando el archivo de metadatos XML en el modal.
      <br>
      <div class="alert alert-info">Los metadatos de IdP deben contener únicamente caracteres ASCII.</a></div>

    {{< img src="account_management/saml/saml_configure.png" alt="Configurar SAML cargando los metadatos de tu IdP" style="width:100%;" >}}

6. Haz clic en **Save** (Guardar).

**Nota**: Para configurar SAML para varias organizaciones, consulta [Gestión de cuentas de varias organizaciones][18].

## Configuración de varios proveedores SAML

Los clientes empresariales pueden tener varias configuraciones SAML por organización (hasta tres al mismo tiempo). Esta función simplifica la gestión de identidades en entornos complejos, como durante cambios de IdP, fusiones o incorporación de contratistas.

Para configurar proveedores SAML adicionales:

1. Ve a **Organization Settings > Login Methods** (Configuración de la organización > Métodos de inicio de sesión). En **SAML**, haz clic en **Update** (Actualizar) y, a continuación, en **Add SAML** (Añadir SAML).
2. En el modal de configuración:

    - Crea un nombre fácil de usar para este proveedor SAML. El nombre se mostrará a los usuarios finales cuando elijan un método de inicio de sesión.
      <br>
      <div class="alert alert-info">Todos los usuarios pueden ver y acceder a todos los IdP configurados. No hay forma de asignar grupos de usuarios específicos a configuraciones concretas. Definir nombres claros y descriptivos para cada proveedor ayuda a los usuarios a seleccionar el IdP adecuado durante el inicio de sesión. Ten en cuenta también que no hay forma de definir una configuración predeterminada.</a></div>
    - Carga los metadatos de IdP de tu proveedor de identidad SAML haciendo clic en **browse files** (buscar archivos) o arrastrando y soltando el archivo de metadatos XML en el modal.
4. Haz clic en **Save** (Guardar).

### Asignación de roles con varios proveedores SAML

Si utilizas la [asignación de roles][19] o la [asignación de equipos][20] de SAML y quieres utilizar las mismas asignaciones en todos los proveedores adicionales que añadas, asegúrate de que los atributos de los nuevos IdP coincidan con aquellos definidos en tus asignaciones. Si agregas un nuevo IdP, asegúrate de utilizar los mismos nombres de atributos que tu IdP existente o agrega nuevas asignaciones que coincidan con los atributos del nuevo IdP para garantizar que los roles y equipos se asignen correctamente cuando los usuarios inician sesión con diferentes IdP.

[1]: /es/help/
[2]: https://learn.microsoft.com/en-us/entra/architecture/auth-saml
[3]: https://auth0.com/docs/protocols/saml-protocol
[4]: https://cloud.google.com/architecture/identity/single-sign-on
[5]: https://support.logmeininc.com/lastpass/help/lastpass-admin-toolkit-using-single-sign-on-sso
[6]: https://developer.okta.com/docs/concepts/saml/
[7]: https://thalesdocs.com/sta/operator/applications/apps_saml/index.html
[8]: /es/account_management/users/default_roles/
[9]: /es/account_management/saml/activedirectory/
[10]: /es/account_management/saml/auth0/
[11]: /es/account_management/saml/entra/
[12]: /es/account_management/saml/google/
[13]: /es/account_management/saml/lastpass/
[14]: /es/account_management/saml/okta/
[15]: /es/account_management/saml/safenet/
[16]: /es/account_management/login_methods/
[17]: https://app.datadoghq.com/account/saml/metadata.xml
[18]: /es/account_management/multi_organization/#setting-up-saml
[19]: /es/account_management/saml/mapping/#map-saml-attributes-to-datadog-roles
[20]: /es/account_management/saml/mapping/#map-saml-attributes-to-teams