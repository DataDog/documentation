---
algolia:
  tags:
  - saml
aliases:
- /es/guides/saml
description: Configura la autenticación SAML para Datadog con proveedores de identidad
  como Active Directory, Auth0, Google, Okta y Microsoft Entra ID para un inicio de
  sesión único seguro.
further_reading:
- link: /account_management/multi_organization/
  tag: Documentación
  text: Configurar equipos y organizaciones con varias cuentas
title: Inicio de sesión único con SAML
---
{{< site-region region="gov" >}}
<div class="alert alert-danger">El sitio Datadog for Government solo admite el inicio de sesión SAML.</div>
{{< /site-region >}}

## Información general

La configuración de [SAML (Security Assertion Markup Language)][1] para tu cuenta Datadog te permite a ti y a todos tus compañeros de equipo iniciar sesión en Datadog utilizando las credenciales almacenadas en Active Directory, LDAP u otro almacén de identidades de tu organización que se haya configurado con un proveedor de identidades SAML.

**Notas**: 

{{% site-region region="us,us3,us5,eu,ap1,ap2" %}}
- Si no tienes SAML activado en tu cuenta de Datadog, ponte en contacto con el [servicio de asistencia][2] para activarlo.
- Esta documentación asume que ya tienes un proveedor de identidad (IdP) SAML. Si no tienes un IdP SAML, hay varios IdP que tienen integraciones con Datadog como [Active Directory][3], [Auth0][4], [Google][5], [LastPass][6], [Microsoft Entra ID][3], [Okta][7] y [SafeNet][8].
- La configuración de SAML requiere acceso a [Datadog Administrator][9].
{{% /site-region %}}

{{% site-region region="gov" %}}
- Esta documentación asume que ya tienes un proveedor de identidad (IdP) SAML. Si no tienes un IdP SAML, hay varios IdP que tienen integraciones con Datadog, como [Active Directory][3], [Auth0][4], [Google][5], [LastPass][6], [Microsoft Entra ID][3], [Okta][7] y [SafeNet][8].
- La configuración de SAML requiere acceso a [Datadog Administrator][9].
{{% /site-region %}}

## Configuración de SAML

1. Para comenzar la configuración, consulta la documentación de tu IdP:

    * [Active Directory][10]
    * [Auth0][11]
    * [Google][13]
    * [Microsoft Entra ID][12]
    * [NoPassword][14]
    * [Okta][15]
    * [SafeNet][16]

2. En la aplicación Datadog, coloca el cursor sobre tu nombre de usuario en la esquina inferior izquierda y selecciona Organization Settings (Parámetros de la organización). Selecciona [Login Methods (Métodos de inicio de sesión)][17] y haz clic en **Configure** (Configurar) en SAML.

3. Carga los metadatos de IdP de tu proveedor de identidad SAML haciendo clic en el botón **Choose File** (Seleccionar archivo). Después de elegir el archivo, haz clic en **Upload File** (Cargar archivo).

**Nota:** Los metadatos de IdP deben contener únicamente caracteres ASCII.

4. Descarga [metadatos del proveedor de servicios][18] de Datadog para configurar tu IdP de modo que reconozca a Datadog como proveedor de servicios.

5. Después de cargar los metadatos IdP y configurar su IdP, active SAML en Datadog haciendo clic en el botón **Cargar y activar**.
    {{< img src="account_management/saml/saml_enable_cropped.png" alt="Configurar SAML cargando los metadatos de tu IdP" >}}

6. Después de cargar los metadatos de IdP, vuelve a la página Login Methods (Métodos de inicio de sesión) y activa SAML `on` por defecto. 

**Nota**: Para configurar SAML para varias organizaciones, consulta [Gestión de cuentas de varias organizaciones][21].

## Uso de SAML

Una vez que SAML está configurado en Datadog y tu IdP está configurado para aceptar solicitudes de Datadog, los usuarios pueden acceder a log.

### Inicio de sesión por el PS

Iniciado por el PS o por el Proveedor de servicio se refiere a un inicio de sesión iniciado desde Datadog. Los usuarios inician sesión a través de la **URL de inicio de sesión único** mostrada en el cuadro de estado en la parte superior de la [página Configuración de SAML][19]. La **URL de inicio de sesión único** también se muestra en la [página Equipo][20]. Al cargar esta URL se inicia una autenticación SAML con tu IdP. **Nota**: Esta URL solo se muestra si SAML está habilitado para tu cuenta y estás utilizando el inicio de sesión iniciado por el PS.

{{< img src="account_management/saml/saml_enabled_cropped.png" alt="Confirmación de que SAML está habilitado" >}}

Cuando un usuario inicia sesión a través de SAML iniciado por el PS y la organización no tiene un subdominio personalizado, Datadog requiere seguridad adicional. Los usuarios reciben un único código de verificación por correo electrónico que es necesario para iniciar la sesión.

### Inicio de sesión iniciado por el IdP

Iniciado por el IdP o por el Proveedor de identidad se refiere a un inicio de sesión iniciado desde tu portal de aplicaciones. Los usuarios inician sesión haciendo clic en el icono de la aplicación en tu portal de aplicaciones, por ejemplo, en el cajón de Google App o en el portal de aplicaciones de Okta. Los usuarios con inicio de sesión iniciado por el PS también pueden utilizar el inicio de sesión iniciado por el IdP, dependiendo de la configuración de su proveedor de identidad.

## Aserciones y atributos

Cuando se produce un inicio de sesión, el proveedor de identidad envía a Datadog una aserción SAML que contiene la autorización del usuario.

### Capacidades

* Datadog soporta el enlace **HTTP-POST** para **SAML2**:
`urn:oasis:names:tc:SAML:2.0:bindings:HTTP-POST`.
* Datadog especifica `urn:oasis:names:tc:SAML:1.1:nameid-format:emailAddress` para el formato del **NameIDPolicy** en solicitudes de aserción.

### Requisitos

* Las aserciones deben estar firmadas.
* Las aserciones pueden estar cifradas, pero se aceptan aserciones sin cifrar.
* Consulta los [metadatos de proveedores de servicios de Datadog][18] para obtener más información. Debes iniciar sesión en Datadog para acceder al archivo.

### Atributos compatibles

Es posible incluir atributos en una aserción SAML. Datadog busca tres atributos en un `AttributeStatement`:

  1. **eduPersonPrincipalName**: Si se especifica, el eduPersonPrincipalName debe corresponder al nombre de usuario del usuario Datadog. El nombre de usuario suele ser la dirección de correo electrónico del usuario.
  2. **sn**: Es opcional y debe configurarse con el apellido del usuario.
  3. **givenName**: Es opcional y debe ser el nombre del usuario.

<div class="alert alert-info">Para el IdP de Microsoft Entra ID, utiliza el atributo `surname` en lugar de `sn` en la aserción.</div>

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

Es posible que algunas organizaciones no deseen invitar a todos sus usuarios a Datadog. Si deseas realizar cambios en el funcionamiento de SAML para tu cuenta, ponte en contacto con el [soporte de Datadog][2]. Depende de la organización configurar que su IdP no envíe aserciones a Datadog si no desea que un usuario concreto acceda a Datadog.

Los administradores pueden establecer la función por defecto de los nuevos usuarios JIT. El rol por defecto es **Standard** (Estándar), pero puedes elegir añadir nuevos usuarios JIT como **Read-Only** (Solo lectura), **Administrators** (Administradores) o cualquier rol personalizado.

<div class="alert alert-danger">
  <strong>Importante:</strong> Si Role Mapping está activado, tiene prioridad sobre los roles definidos durante el aprovisionamiento de JIT. Sin las sentencias de atributo de grupo adecuadas, los usuarios podrían quedarse sin roles y perder el acceso a Datadog. Para evitar que los usuarios queden bloqueados tras el aprovisionamiento de JIT, asegúrate de revisar las definiciones de asignación y comprobar las aserciones antes de habilitar tanto las asignaciones como JIT.
</div>

{{< img src="account_management/saml/saml_jit_default.png" alt="saml JIT predeterminado" style="width:50%;" >}}

### Inicio de sesión iniciado por IdP

Cuando se carga la URL de Datadog, el navegador es redirigido al IdP del cliente donde el usuario introduce sus credenciales, después el IdP lo redirige de nuevo a Datadog. Algunos IdP tienen la capacidad de enviar una aserción directamente a Datadog sin obtener primero una AuthnRequest (inicio de sesión iniciado por el IdP).

Tras activar la función de inicio de sesión iniciado por el IdP y guardar tu configuración, puedes descargar la última versión de los metadatos del proveedor de servicio (SP) para tu proveedor de identidades. Tus nuevos metadatos SP contienen un endpoint `AssertionConsumerService` diferente y específico de la organización al que enviar aserciones.

Si no utilizas los metadatos del SP actualizados, Datadog no podrá asociar la aserción con tu organización y mostrará una página de error con el mensaje de que a la respuesta SAML le falta el atributo "InResponseTo".

### SAML estricto

Puedes hacer que tu organización sea SAML Strict deshabilitando otros tipos de métodos de inicio de sesión en la interfaz de usuario **Login Methods** (Métodos de inicio de sesión). Cuando se configura esta opción, todos los usuarios deben, por defecto, iniciar sesión con SAML. Un nombre de usuario/contraseña existente o un inicio de sesión Google OAuth no funcionan. Esto garantiza que todos los usuarios con acceso a Datadog deben tener credenciales válidas en el servicio de proveedor/directorio de identidad de tu empresa para acceder a tu cuenta Datadog. Los administradores de la organización pueden establecer [overrides (anulaciones)][23] por usuario para permitir que determinados usuarios estén exentos de SAML Strict.

### Metadatos del SP de Datadog autoactualizables

Algunos proveedores de identidades (como ADFS de Microsoft) pueden configurarse para obtener los últimos metadatos del proveedor de servicio SAML de Datadog. Después de configurar SAML en Datadog, puedes obtener la URL de metadatos para tu organización de la página configuración de SAML y utilizarla con tu Proveedor de identidades para obtener los últimos metadatos del proveedor de servicio cada vez que se publiquen cambios.

{{< img src="account_management/saml/saml_metadata_url.png" alt="URL de metadatos de SAML" style="width:50%;" >}}

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: http://en.wikipedia.org/wiki/Security_Assertion_Markup_Language
[2]: /es/help/
[3]: https://learn.microsoft.com/en-us/entra/architecture/auth-saml
[4]: https://auth0.com/docs/protocols/saml-protocol
[5]: https://cloud.google.com/architecture/identity/single-sign-on
[6]: https://support.logmeininc.com/lastpass/help/lastpass-admin-toolkit-using-single-sign-on-sso
[7]: https://developer.okta.com/docs/concepts/saml/
[8]: https://thalesdocs.com/sta/operator/applications/apps_saml/index.html
[9]: /es/account_management/users/default_roles/
[10]: /es/account_management/saml/activedirectory/
[11]: /es/account_management/saml/auth0/
[12]: /es/account_management/saml/entra/
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