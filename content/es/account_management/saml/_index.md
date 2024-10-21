---
algolia:
  tags:
  - saml
aliases:
- /es/guides/saml
further_reading:
- link: /account_management/multi_organization/
  tag: Documentación
  text: Configurar equipos y organizaciones con varias cuentas
title: Inicio de sesión único con SAML
---
{{< site-region region="gov" >}}
<div class="alert alert-warning">El sitio Datadog for Government solo admite el inicio de sesión SAML.</div>
{{< /site-region >}}

## Información general

La configuración de [SAML (Security Assertion Markup Language)][1] para tu cuenta de Datadog te permite a ti y a todos tus compañeros iniciar sesión en Datadog mediante credenciales almacenadas en el Active Directory de tu organización, LDAP, u otro almacén de identidades que haya sido configurado con un proveedor de identidades SAML.

**Notas**: 

{{% site-region region="us,us3,us5,eu,ap1" %}}
- Si no tienes SAML activado en tu cuenta de Datadog, contacta con el [soporte][2] para activarlo.
- Esta documentación asume que ya tienes un proveedor de identidades (IdP) SAML. Si no tienes un IdP SAML, hay varios IdPs que tienen integraciones con Datadog como [Active Directory][3], [Auth0][4], [Azure][3], [Google][5], [LastPass][6], [Okta][7] y [SafeNet][8].
- La configuración de SAML requiere acceso [Datadog Administrator][9].
{{% /site-region %}}

{{% site-region region="gov" %}}
- Esta documentación asume que ya tienes un proveedor de identidades (IdP) SAML. Si no tienes un IdP SAML, hay varios IdPs que tienen integraciones con Datadog como [Active Directory][3], [Auth0][4], [Azure][3], [Google][5], [LastPass][6], [Okta][7] y [SafeNet][8].
- La configuración de SAML requiere acceso [Datadog Administrator][9].
{{% /site-region %}}

## Configuración de SAML

1. Para comenzar la configuración, consulta la documentación de tu IdP:

    * [Active Directory][10]
    * [Auth0][11]
    * [Azure][12]
    * [Google][13]
    * [NoPassword][14]
    * [Okta][15]
    * [SafeNet][16]

2. En la aplicación de Datadog, pasa el ratón sobre tu nombre de usuario en la esquina inferior izquierda y selecciona Organization Settings (Configuración de la organización). Selecciona [Login Methods][17] (Métodos de inicio de sesión) y haz clic en **Configure** (Configurar) debajo de SAML.

3. Carga los metadatos del IdP desde tu proveedor de identidades de SAML al hacer clic en el botón **Choose File** (Elegir archivo). Después de elegir el archivos, haz clic en **Upload File** (Cargar archivo).

**Nota:** Los metadatos del IdP deben contener solamente caracteres ASCII.

4. Descarga los [metadados del proveedor de servicio][18] de Datadog para configurar tu IdP para reconocer a Datadog como proveedor de servicios.

5. Después de cargar los metadatos del IdP y configurarlo, activa SAML en Datadog haciendo clic en el botón **Upload and Enable** (Cargar y activar).
    {{< img src="account_management/saml/saml_enable_cropped.png" alt="Configurar SAML cargando tus metadatos del IdP" >}}

6. Después de cargar los metadatos del IdP, vuelva a la página **Login Methods** (Métodos de inicio de sesión) y activa SAML `on` por defecto. 

7. Una vez activado SAML en Datadog y el IdP configurado para aceptar solicitudes desde Datadog, los usuarios pueden iniciar sesión:

   - **Si usan el inicio de sesión iniciado por SP** (proveedor de servicios o inicio de sesión iniciado desde Datadog): mediante la **URL Single Sign-on** presente en la casilla Status (Estado) en la parte superior de la [página de configuración de SAML][19]. La **URL Single Sign-on** también se muestra en la [página Equipo][20]. Al cargar esta URL, se inicia una autenticación SAML para tu IdP. **Nota**: Esta URL no se muestra a menos que SAML esté activado para tu cuenta y que estés utilizando el inicio de sesión iniciado por SP.
    {{< img src="account_management/saml/saml_enabled_cropped.png" alt="Confirmación de que SAML está activado" >}}

   - **Si utilizan el inicio de sesión iniciado por IdP** (proveedor de identidades o inicio de sesión iniciado desde el portal de tu aplicación): al hacer clic en el ícono de aplicación en tu portal de aplicación, por ejemplo, en la caja de Google App o el portal de Okta App. En algunos escenarios, si los usuarios inician sesión con la URL de inicio de sesión iniciado por SP también podrán hacerlo con las experiencias de inicio de sesión iniciado por IdP, pero esto depende de la configuración y compatibilidad de tu proveedor de identidad.

**Nota**: Si deseas configurar SAML para una organización múltiple, consulta [Gestión de cuentas de múltiples organizaciones][21].

## Afirmaciones y atributos

Cuando sucede un inicio de sesión, se envía una afirmación de SAML que contiene una autorización de usuario desde el proveedor de identidad a Datadog.

### Capacidades

* Datadog admite la vinculación de **HTTP-POST** para **SAML2**:
`urn:oasis:names:tc:SAML:2.0:bindings:HTTP-POST`.
* Datadog especifica `urn:oasis:names:tc:SAML:1.1:nameid-format:emailAddress` para el formato de **NameIDPolicy** en las solicitudes de afirmación.

### Requisitos

* Las afirmaciones se deben firmar.
* Las afirmaciones pueden cifrarse, pero se aceptan las afirmaciones sin cifrar.
* Consulta [Metadatos del proveedor de servicio de Datadog][18] para obtener más información.

### Atributos compatibles

Los atributos pueden incluirse en una afirmación SAML. Datadog busca tres atributos en un `AttributeStatement`:

  1. **eduPersonPrincipalName**: si se especifica, eduPersonPrincipalName debe corresponderse con el nombre de usuario de Datadog del usuario. El nombre de usuario suele ser la dirección de correo electrónico del usuario.
  2. **sn**: esto es opcional y debe establecerse al apellido del usuario.
  3. **givenName**: esto es opcional y debe establecerse al nombre del usuario.

<div class="alert alert-info">Para el IdP de Azure Entra ID, utiliza el atributo `surname` en lugar de `sn` en la afirmación.</div>

Datadog espera que los atributos utilicen el URI NameFormat `urn:oasis:names:tc:SAML:2.0:attrname-format:uri` o el NameFormat básico `urn:oasis:names:tc:SAML:2.0:attrname-format:basic`. El nombre utilizado para cada atributo depende del NameFormat que utilice tu IdP.

Si tu IdP está configurado para utilizar el URI NameFormat `urn:oasis:names:tc:SAML:2.0:attrname-format:uri`:

  1. **eduPersonPrincipalName**: el IdP debe establecer `urn:oid:1.3.6.1.4.1.5923.1.1.1.6` como nombre del atributo.
  2. **sn**: el IdP debe establecer `urn:oid:2.5.4.4` como nombre del atributo.
  3. **givenName**: el IdP debe establecer `urn:oid:2.5.4.42` como nombre del atributo.

Si tu IdP está configurado para utilizar el NameFormat básico `urn:oasis:names:tc:SAML:2.0:attrname-format:basic`:

  1. **eduPersonPrincipalName**: el IdP debe establecer `urn:mace:dir:attribute-def:eduPersonPrincipalName` como nombre del atributo.
  2. **sn**: el IdP debe establecer `urn:mace:dir:attribute-def:sn` como nombre del atributo.
  3. **givenName**: el IdP debe establecer `urn:mace:dir:attribute-def:givenName` como nombre del atributo.

Si **eduPersonPrincipalName** existe en el AttributeStatement, el valor de este atributo se utiliza para el nombre de usuario. Si **eduPersonPrincipalName** no está incluido en el AttributeStatement, el nombre de usuario se toma del NameID en el Subject. El NameID debe utilizar el formato `urn:oasis:names:tc:SAML:1.1:nameid-format:emailAddress`.

Si se proporcionan **sn** y **givenName**, se utilizan para actualizar el nombre del usuario en su perfil de Datadog.

## Funciones adicionales

Para asignar atributos en la respuesta de tu proveedor de identidad a los roles y equipos de Datadog, consulta [asignación de grupo SAML][22].

Las siguientes funciones pueden activarse a través del [cuadro de diálogo de configuración de SAML][19]:

**Nota:** Debes tener permisos de administrador para ver el cuadro de diálogo de configuración de SAML.

### Suministro justo a tiempo (JIT)

Con el suministro JIT, un usuario se crea en Datadog la primera vez que intenta iniciar sesión. Esto elimina la necesidad de que los administradores creen manualmente las cuentas de usuario una a la vez. En este caso, no se envía el correo electrónico de invitación.

Es posible que algunas organizaciones no deseen invitar a todos sus usuarios a Datadog. Si deseas realizar cambios en el funcionamiento de SAML para tu cuenta, ponte en contacto con el [soporte de Datadog][2]. Depende de la organización configurar que su IdP no envíe afirmaciones a Datadog si no desea que un usuario concreto acceda a Datadog.

Los administradores pueden establecer la función por defecto de los nuevos usuarios JIT. El rol por defecto es **Standard** (Estándar), pero puedes elegir añadir nuevos usuarios JIT como **Read-Only** (Solo lectura), **Administrators** (Administradores) o cualquier rol personalizado.

{{< img src="account_management/saml/saml_jit_default.png" alt="saml JIT por defecto" style="width:50%;" >}}

### Inicio de sesión iniciado por IdP

Cuando se carga la URL de Datadog, el navegador es redirigido al IdP del cliente donde el usuario introduce sus credenciales, después el IdP lo redirige de nuevo a Datadog. Algunos IdP tienen la capacidad de enviar una afirmación directamente a Datadog sin obtener primero una AuthnRequest (inicio de sesión iniciado por el IdP).

Tras activar la función de inicio de sesión iniciado por el IdP y guardar tu configuración, puedes descargar la última versión de los metadatos del proveedor de servicio (SP) para tu proveedor de identidades. Tus nuevos metadatos SP contienen un endpoint `AssertionConsumerService` diferente y específico de la organización al que enviar las afirmaciones.

Si no utilizas los metadatos del SP actualizados, Datadog no podrá asociar la afirmación con tu organización y mostrará una página de error con el mensaje de que a la respuesta SAML le falta el atributo "InResponseTo".

### SAML estricto

Puedes hacer que tu organización sea SAML Strict deshabilitando otros tipos de métodos de inicio de sesión en la interfaz de usuario **Login Methods** (Métodos de inicio de sesión). Cuando se configura esta opción, todos los usuarios deben, por defecto, iniciar sesión con SAML. Un nombre de usuario/contraseña existente o un inicio de sesión Google OAuth no funcionan. Esto garantiza que todos los usuarios con acceso a Datadog deben tener credenciales válidas en el servicio de proveedor/directorio de identidad de tu empresa para acceder a tu cuenta Datadog. Los administradores de la organización pueden establecer [overrides (anulaciones)][23] por usuario para permitir que determinados usuarios estén exentos de SAML Strict.

### Metadatos del SP de Datadog autoactualizables

Algunos proveedores de identidades (como ADFS de Microsoft) pueden configurarse para obtener los últimos metadatos del proveedor de servicio SAML de Datadog. Después de configurar SAML en Datadog, puedes obtener la URL de metadatos para tu organización de la página configuración de SAML y utilizarla con tu Proveedor de identidades para obtener los últimos metadatos del proveedor de servicio cada vez que se publiquen cambios.

{{< img src="account_management/saml/saml_metadata_url.png" alt="URL de metadatos de SAML" style="width:50%;" >}}

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: http://en.wikipedia.org/wiki/Security_Assertion_Markup_Language
[2]: /es/help/
[3]: https://docs.microsoft.com/en-us/azure/active-directory/fundamentals/auth-saml
[4]: https://auth0.com/docs/protocols/saml-protocol
[5]: https://cloud.google.com/architecture/identity/single-sign-on
[6]: https://support.logmeininc.com/lastpass/help/lastpass-admin-toolkit-using-single-sign-on-sso
[7]: https://developer.okta.com/docs/concepts/saml/
[8]: https://thalesdocs.com/sta/operator/applications/apps_saml/index.html
[9]: /es/account_management/users/default_roles/
[10]: /es/account_management/saml/activedirectory/
[11]: /es/account_management/saml/auth0/
[12]: /es/account_management/saml/azure/
[13]: /es/account_management/saml/google/
[14]: /es/account_management/saml/nopassword/
[15]: /es/account_management/saml/okta/
[16]: /es/account_management/saml/safenet/
[17]: https://app.datadoghq.com/organization-settings/login-methods
[18]: https://app.datadoghq.com/account/saml/metadata.xml
[19]: https://app.datadoghq.com/saml/saml_setup
[20]: https://app.datadoghq.com/account/team
[21]: /es/account_management/multi_organization/#setting-up-saml
[22]: /es/account_management/saml/mapping/
[23]: /es/account_management/login_methods/#reviewing-user-overrides