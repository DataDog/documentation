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
<div class="alert alert-warning">El sitio Datadog for Government solo admite el inicio de sesión con SAML.</div>
{{< /site-region >}}

## Información general

La configuración de [SAML (Security Assertion Markup Language)][1] para tu cuenta de Datadog te permite a ti y a todos tus compañeros de equipo iniciar sesión en Datadog utilizando las credenciales almacenadas en Active Directory, LDAP u otro almacén de identidades de tu organización que se haya configurado con un proveedor de identidades SAML.

**Notas**: 

{{% site-region region="us,us3,us5,eu,ap1" %}}
- Si no tienes SAML activado en tu cuenta de Datadog, ponte en contacto con [support (soporte)][1] para activarlo.
- Esta documentación asume que ya tienes un Proveedor de identidad SAML (IdP). Si no tienes un IdP SAML, hay varios IdP que tienen integraciones con Datadog como [Active Directory][2], [Auth0][3], [Azure][2], [Google][4], [LastPass][5], [Okta][6] y [SafeNet][7].
- Configuración de SAML requiere acceso [Datadog Administrator (Administrador Datadog)][8].

[1]: /es/help/
[2]: https://docs.microsoft.com/en-us/azure/active-directory/fundamentals/auth-saml
[3]: https://auth0.com/docs/protocols/saml-protocol
[4]: https://cloud.google.com/architecture/identity/single-sign-on
[5]: https://support.logmeininc.com/lastpass/help/lastpass-admin-toolkit-using-single-sign-on-sso
[6]: https://developer.okta.com/docs/concepts/saml/
[7]: https://thalesdocs.com/sta/operator/applications/apps_saml/index.html
[8]: /es/account_management/users/default_roles/
{{% /site-region %}}

{{% site-region region="gov" %}}
- Esta documentación asume que ya tienes un Proveedor de identidad SAML (IdP). Si no tienes un IdP SAML, hay varios IdP que tienen integraciones con Datadog como [Active Directory][2], [Auth0][3], [Azure][2], [Google][4], [LastPass][5], [Okta][6] y [SafeNet][7].
- Configuración de SAML requiere acceso [Datadog Administrator (Administrador Datadog)][8].

[2]: https://docs.microsoft.com/en-us/azure/active-directory/fundamentals/auth-saml
[3]: https://auth0.com/docs/protocols/saml-protocol
[4]: https://cloud.google.com/architecture/identity/single-sign-on
[5]: https://support.logmeininc.com/lastpass/help/lastpass-admin-toolkit-using-single-sign-on-sso
[6]: https://developer.okta.com/docs/concepts/saml/
[7]: https://thalesdocs.com/sta/operator/applications/apps_saml/index.html
[8]: /es/account_management/users/default_roles/
{{% /site-region %}}

## Configuración de SAML

1. Para empezar la configuración, consulta la documentación de tu IdP:

    * [Active Directory][10]
    * [Auth0][11]
    * [Azure][12]
    * [Google] [13]
    * [NoPassword][14]
    * [Okta][15]
    * [SafeNet][16]

2. En la aplicación Datadog, pasa el cursor sobre tu nombre de usuario en la esquina inferior izquierda y selecciona Parámetros de organización. Selecciona [Login Methods (métodos de inicio de sesión)][17] y haz clic en **Configure** (Configurar) en SAML.

3. Carga los metadatos IdP de tu proveedor de identidad SAML haciendo clic en el botón **Choose File** (Seleccionar archivo). Después de elegir el archivo, haz clic en **Upload File** (Subir archivo).

**Nota:** Los metadatos del IdP deben contener únicamente caracteres ASCII.

4. Descarga [Service Provider metadata (metadatos del proveedor de servicio)][18] de Datadog para configurar tu IdP para que reconozca Datadog como proveedor servicio.

5. Después de cargar los metadatos del IdP y configurar tu IdP, activa SAML en Datadog haciendo clic en el botón **Upload and Enable** (Cargar y habilitar).
    {{< img src="account_management/saml/saml_enable.png" alt="activar saml" >}}

6. Después de cargar los metadatos del IdP, vuelve a la página **Login Methods** (Métodos de inicio de sesión) y activa SAML `on` por defecto. 

7. Una vez que SAML está configurado en Datadog y tu IdP está configurado para aceptar solicitudes de Datadog, los usuarios pueden iniciar sesión en:

   - **If using SP-initiated login** (Si utilizas el inicio de sesión iniciado por el SP) (Proveedor de servicio o inicio de sesión desde Datadog): Utilizando la **URL de inicio de sesión único** que se muestra en el cuadro de estado de la parte superior de la página [SAML Configuración ][19]. La **Single Sign-on URL** (URL de inicio de sesión único) también se muestra en la  [Team page (página del equipo)][20]. Al cargar esta URL se inicia una autenticación SAML contra tu IdP. **Nota**: Esta URL no se muestra a menos que SAML esté habilitado para tu cuenta y estés utilizando el inicio de sesión iniciado por SP.
    {{< img src="account_management/saml/saml_enabled.png" alt="Activado Saml" >}}

   - **If using IdP-initiated login** (Si utilizas el inicio de sesión iniciado por el IdP) (proveedor de identidad o inicio de sesión iniciado desde tu portal de aplicaciones): Haciendo clic en el icono de la aplicación en tu portal de aplicaciones, por ejemplo, en el cajón de aplicaciones de Google o en el portal de aplicaciones de Okta. En algunos casos, los usuarios que inicien sesión con la URL de inicio de sesión iniciada por el proveedor de identidad también funcionarán con las experiencias de inicio de sesión iniciadas por el proveedor de identidad, pero esto depende de la configuración y del soporte de tu proveedor de identidad.

**Nota**: Si deseas configurar SAML para una multiorganización, consulta [Managing Multiple-Organization Accounts (Gestión de cuentas de varias organizaciones)][21].

## Afirmaciones y atributos

Cuando se produce un inicio de sesión, el proveedor de identidad envía a Datadog una afirmación de SAML que contiene la autorización del usuario.

Algunas notas importantes sobre las afirmaciones:

* Datadog soporta el enlace **HTTP-POST** para **SAML2**:
`urn:oasis:names:tc:SAML:2.0:bindings:HTTP-POST`.
* Datadog especifica `urn:oasis:names:tc:SAML:1.1:nameid-format:emailAddress` para el formato del **NameIDPolicy** en las solicitudes de afirmación.
* Las afirmaciones deben estar firmadas.
* Las afirmaciones pueden cifrarse, pero se aceptan afirmaciones sin cifrar.
* Consulta [Datadog's Service Provider metadata (metadatos del proveedor de servicios de Datadog)][18] para obtener más información. Debes iniciar sesión en Datadog para acceder al archivo.

Los atributos pueden incluirse en una afirmación de SAML. Datadog busca tres atributos en un `AttributeStatement`:

  1. **eduPersonPrincipalName**: Si se especifica, el eduPersonPrincipalName debe corresponder al nombre de usuario del usuario de Datadog. El nombre de usuario suele ser la dirección de correo electrónico del usuario.
  2. **sn**: Esto es opcional y debe configurarse con el apellido del usuario.
  3. **givenName**: Esto es opcional y debe configurarse con el nombre del usuario, o nombre especificado.

Datadog espera que los atributos utilicen el URI NameFormat `urn:oasis:names:tc:SAML:2.0:attrname-format:uri` o el NameFormat básico `urn:oasis:names:tc:SAML:2.0:attrname-format:basic`. El nombre utilizado para cada atributo depende del NameFormat que utilice tu IdP.

Si tu IdP está configurado para utilizar el NameFormat de URI `urn:oasis:names:tc:SAML:2.0:attrname-format:uri`:

  1. **eduPersonPrincipalName**: El IdP debe establecer `urn:oid:1.3.6.1.4.1.5923.1.1.1.6` como nombre del atributo.
  2. **sn**: El IdP debe establecer `urn:oid:2.5.4.4` como nombre del atributo.
  3. **givenName**: El IdP debe establecer `urn:oid:2.5.4.42` como nombre del atributo.

Si tu IdP está configurado para utilizar el formato de nombre básico `urn:oasis:names:tc:SAML:2.0:attrname-format:basic`:

  1. **eduPersonPrincipalName**: El IdP debe establecer `urn:mace:dir:attribute-def:eduPersonPrincipalName` como nombre del atributo.
  2. **sn**: El IdP debe establecer `urn:mace:dir:attribute-def:sn` como nombre del atributo.
  3. **givenName**: El IdP debe establecer `urn:mace:dir:attribute-def:givenName` como nombre del atributo.

Si **eduPersonPrincipalName** existe en el AttributeStatement, el valor de este atributo se utiliza para el nombre de usuario. Si **eduPersonPrincipalName** no está incluido en el AttributeStatement, el nombre de usuario se toma del NameID en el Subject. El NameID debe utilizar el formato `urn:oasis:names:tc:SAML:1.1:nameid-format:emailAddress`.

Si se proporcionan **sn** y **givenName**, se utilizan para actualizar el nombre del usuario en su perfil de Datadog.

## Funciones adicionales

Para asignar atributos en la respuesta de su proveedor de identidad a los roles y equipos de Datadog, consulta [SAML group mapping (asignación de grupos SAML)][22].

Las siguientes funciones pueden activarse a través del [SAML Configuration dialog (cuadro de diálogo de configuración de SAML)][19]:

**Nota:** Debes tener permisos de administrador para ver el cuadro de diálogo de configuración de SAML.

### Suministrar Justo a tiempo (JIT)

Con suministrar JIT, un usuario se crea en Datadog la primera vez que intenta iniciar sesión. Esto elimina la necesidad de que los administradores creen manualmente las cuentas de usuario de una en una. En este caso no se envía el correo electrónico de invitación.

Es posible que algunas organizaciones no deseen invitar a todos sus usuarios a Datadog. Si deseas realizar cambios en el funcionamiento de SAML para tu cuenta, ponte en contacto con [Datadog support (soporte de Datadog)][2]. Depende de la organización configurar que su IdP no envíe afirmaciones a Datadog si no desea que un usuario concreto acceda a Datadog.

Los administradores pueden establecer la función por defecto de los nuevos usuarios JIT. El rol por defecto es **Standard** (Estándar), pero puedes elegir añadir nuevos usuarios JIT como **Read-Only** (Solo lectura), **Administrators** (Administradores) o cualquier rol personalizado.

{{< img src="account_management/saml/saml_jit_default.png" alt="saml JIT por defecto" style="width:50%;" >}}

### Inicio de sesión iniciado por IdP

Cuando se carga la URL Datadog, el navegador es redirigido al IdP del cliente donde el usuario introduce sus credenciales, después el IdP lo redirige de nuevo a Datadog. Algunos IdP tienen la capacidad de enviar una afirmación directamente a Datadog sin obtener primero una AuthnRequest (inicio de sesión iniciado por el IdP).

Tras activar la función de inicio de sesión iniciado por el IdP y guardar tu configuración, puedes descargar la última versión de los metadatos del proveedor de servicio (SP) para tu proveedor de identidades. Tus nuevos metadatos SP contienen un endpoint `AssertionConsumerService` diferente y específico de la organización al que enviar las afirmaciones.

Si no utilizas los metadatos SP actualizados, Datadog no podrá asociar la afirmación con tu organización y mostrará una página de error con el mensaje de que a la respuesta SAML le falta el atributo "InResponseTo".

### SAML estricto

Puedes hacer que tu organización sea SAML Strict deshabilitando otros tipos de métodos de inicio de sesión en la interfaz de usuario **Login Methods** (Métodos de inicio de sesión). Cuando se configura esta opción, todos los usuarios deben, por defecto, iniciar sesión con SAML. Un nombre de usuario/contraseña existente o un inicio de sesión Google OAuth no funcionan. Esto garantiza que todos los usuarios con acceso a Datadog deben tener credenciales válidas en el servicio de proveedor/directorio de identidad de tu empresa para acceder a tu cuenta Datadog. Los administradores de la organización pueden establecer [overrides (anulaciones)][23] por usuario para permitir que determinados usuarios estén exentos de SAML Strict.

### Metadatos autoactualizables Datadog SP

Algunos proveedores de identidades (como ADFS de Microsoft) pueden configurarse para obtener los últimos metadatos del proveedor de servicio SAML de Datadog. Después de configurar SAML en Datadog, puedes obtener la URL de metadatos para tu organización de la página configuración de SAML y utilizarla con tu Proveedor de identidades para obtener los últimos metadatos del proveedor de servicio cada vez que se publiquen cambios.

{{< img src="account_management/saml/saml_metadata_url.png" alt="URL de metadatos de SAML" style="width:50%;" >}}

## Leer más

{{< partial name="whats-next/whats-next.html" >}}

[1]: http://en.wikipedia.org/wiki/Security_Assertion_Markup_Language
[2]: /es/help/
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