---
algolia:
  tags:
  - saml
aliases:
- /es/guides/saml
description: Configure la autenticación SAML para Datadog con proveedores de identidad
  como Active Directory, Auth0, Google, Okta y Microsoft Entra ID para un inicio de
  sesión único seguro.
further_reading:
- link: /account_management/multi_organization/
  tag: Documentación
  text: Configurando Teams y Organizaciones con Múltiples Cuentas
title: Inicio de Sesión Único con SAML
---
{{< site-region region="gov,gov2" >}}
<div class="alert alert-danger">El sitio de Datadog para Gobierno solo admite inicio de sesión SAML.</div>
{{< /site-region >}}

## Descripción general {#overview}

Configurar [SAML (Security Assertion Markup Language)][1] para su cuenta de Datadog permite que usted y todos sus compañeros inicien sesión en Datadog utilizando las credenciales almacenadas en el Active Directory de su organización, LDAP u otro almacén de identidad que haya sido configurado con un Proveedor de Identidad SAML.

**Notas**: 

{{% site-region region="us,us3,us5,eu,ap1,ap2" %}}
- Si no tiene SAML habilitado en su cuenta de Datadog, contacte a [soporte][2] para habilitarlo.
{{% /site-region %}}
- Esta documentación asume que ya tiene un Proveedor de Identidad SAML (IdP). Si no tiene un IdP SAML, hay varios IdPs que tienen integraciones con Datadog, como [Active Directory][3], [Auth0][4], [Google][5], [LastPass][6], [Microsoft Entra ID][3], [Okta][7] y [SafeNet][8].
- La configuración de SAML requiere acceso de [Datadog Administrator][9].

## Configuración de SAML {#configuring-saml}

Consulte [Configurar el inicio de sesión único con SAML][2] para obtener instrucciones.

## Uso de SAML {#using-saml}

Después de que SAML esté configurado en Datadog y su IdP esté configurado para aceptar solicitudes de Datadog, los usuarios pueden iniciar sesión.

### Inicio de sesión iniciado por SP {#sp-initiated-login}

SP-initiated, o iniciado por el Proveedor de Servicios, significa que el inicio de sesión se realiza desde Datadog. Los usuarios inician sesión a través del {{< ui >}}Single Sign-on URL{{< /ui >}} que se muestra en el cuadro de estado en la parte superior de la [SAML Configuration page][4]. Cargar esta URL inicia una autenticación SAML contra su IdP. **Nota**: Esta URL solo se muestra si SAML está habilitado para su cuenta y está utilizando inicio de sesión iniciado por SP.

{{< img src="account_management/saml/saml_enabled_cropped.png" alt="Confirmación de que SAML está habilitado" >}}

Cuando un usuario inicia sesión a través de SAML iniciado por SP y la organización no tiene un subdominio personalizado, Datadog requiere seguridad adicional. Los usuarios reciben un código de verificación por correo electrónico de un solo uso que es necesario para iniciar sesión.

### Inicio de sesión iniciado por IdP {#idp-initiated-login}

IdP-initiated, o iniciado por el Proveedor de Identidad, significa que el inicio de sesión se realiza desde el portal de su aplicación. Los usuarios inician sesión haciendo clic en el ícono de la app en su app portal, por ejemplo, en el Google App drawer o en el Okta App Portal. Los usuarios de inicio de sesión iniciado por SP también pueden utilizar el inicio de sesión iniciado por IdP, dependiendo de la configuración de su Proveedor de Identidad.

## Afirmaciones y Atributos {#assertions-and-attributes}

Cuando ocurre un inicio de sesión, una Afirmación SAML que contiene la autorización del usuario se envía desde el proveedor de identidad a Datadog.

### Capacidades {#capabilities}

* Datadog admite el enlace **HTTP-POST** para **SAML2**:
`urn:oasis:names:tc:SAML:2.0:bindings:HTTP-POST`.
* Datadog especifica `urn:oasis:names:tc:SAML:1.1:nameid-format:emailAddress` para el formato de la **NameIDPolicy** en las solicitudes de afirmación.

### Requisitos {#requirements}

* Las Afirmaciones deben estar firmadas.
* Las Afirmaciones pueden estar encriptadas, pero se aceptan Afirmaciones no encriptadas.
* Referencia [metadatos del Proveedor de Servicio de Datadog][3] para más información. Debe haber iniciado sesión en Datadog para acceder al archivo.

### Atributos Soportados {#supported-attributes}

Los atributos pueden incluirse en una afirmación SAML. Datadog busca tres atributos en un `AttributeStatement`:

  1. **eduPersonPrincipalName**: Si se especifica, el eduPersonPrincipalName debe corresponder al nombre de usuario de Datadog del usuario. El nombre de usuario es típicamente la dirección de correo electrónico del usuario.
  2. **sn**: Esto es opcional y debe establecerse como el apellido del usuario.
  3. **givenName**: Esto es opcional y debe establecerse como el nombre de pila del usuario.

<div class="alert alert-info">Para el IdP de Microsoft Entra ID, utilice el atributo `surname` en lugar de `sn` en la afirmación.</div>

Datadog espera que los atributos usen el URI NameFormat `urn:oasis:names:tc:SAML:2.0:attrname-format:uri` o el Basic NameFormat `urn:oasis:names:tc:SAML:2.0:attrname-format:basic`. El nombre utilizado para cada atributo depende del NameFormat que utiliza su IdP.

Si su IdP está configurado para usar el URI NameFormat `urn:oasis:names:tc:SAML:2.0:attrname-format:uri`:

  1. **eduPersonPrincipalName**: El IdP debe establecer `urn:oid:1.3.6.1.4.1.5923.1.1.1.6` como el nombre del atributo.
  2. **sn**: El IdP debe establecer `urn:oid:2.5.4.4` como el nombre del atributo.
  3. **givenName**: El IdP debe establecer `urn:oid:2.5.4.42` como el nombre del atributo.

Si su IdP está configurado para usar el Basic NameFormat `urn:oasis:names:tc:SAML:2.0:attrname-format:basic`:

  1. **eduPersonPrincipalName**: El IdP debe establecer `urn:mace:dir:attribute-def:eduPersonPrincipalName` como el nombre del atributo.
  2. **sn**: El IdP debe establecer `urn:mace:dir:attribute-def:sn` como el nombre del atributo.
  3. **givenName**: El IdP debe establecer `urn:mace:dir:attribute-def:givenName` como el nombre del atributo.

Si **eduPersonPrincipalName** existe en el AttributeStatement, el valor de este atributo se utiliza para el nombre de usuario. Si **eduPersonPrincipalName** no está incluido en el AttributeStatement, el nombre de usuario se toma del NameID en el Subject. El NameID debe usar el formato `urn:oasis:names:tc:SAML:1.1:nameid-format:emailAddress`.

Si **sn** y **givenName** son proporcionados, se utilizan para actualizar el nombre del usuario en su perfil de Datadog.

## Características adicionales {#additional-features}

Para mapear atributos en la respuesta de su proveedor de identidad a los roles y Teams de Datadog, consulte [mapeo de grupos SAML][5].

Las siguientes características se pueden habilitar a través del [SAML Configuration dialog][4]:

**Nota:** Debe tener permisos de administrador para ver el SAML Configuration dialog.

### Provisionamiento justo a tiempo (JIT) {#just-in-time-jit-provisioning}

Con el provisionamiento JIT, un usuario se crea dentro de Datadog la primera vez que intenta iniciar sesión. Esto elimina la necesidad de que los administradores creen cuentas de usuario manualmente una por una. El correo electrónico de invitación no se envía en este caso.

Algunas organizaciones pueden no querer invitar a todos sus usuarios a Datadog. Si desea realizar cambios en cómo funciona SAML para su cuenta, comuníquese con [Datadog support][2]. Corresponde a la organización configurar su IdP para que no envíe afirmaciones a Datadog si no desea que un usuario en particular acceda a Datadog.

Los administradores pueden establecer el rol predeterminado para nuevos usuarios JIT. El rol predeterminado es {{< ui >}}Standard{{< /ui >}}, pero puede optar por agregar nuevos usuarios JIT como {{< ui >}}Read-Only{{< /ui >}}, {{< ui >}}Administrators{{< /ui >}} o cualquier rol personalizado.

<div class="alert alert-danger">
  <strong>Importante:</strong> Si el mapeo de roles está habilitado, tiene prioridad sobre los roles establecidos durante el provisionamiento JIT. Sin las declaraciones de atributo de grupo adecuadas, los usuarios pueden terminar sin roles y perder el acceso a Datadog. Para evitar que los usuarios queden bloqueados después del provisionamiento JIT, asegúrese de revisar sus definiciones de mapeo y verificar sus afirmaciones antes de habilitar tanto los Mapeos como JIT.
</div>

{{< img src="account_management/saml/saml_jit_default.png" alt="SAML JIT Predeterminado" style="width:50%;" >}}

### Inicio de sesión iniciado por IdP {#idp-initiated-login-1}

Cuando se carga la URL de Datadog, el navegador es redirigido al IdP del cliente donde el usuario introduce sus credenciales, luego el IdP redirige de vuelta a Datadog. Algunos IdP tienen la capacidad de enviar una aserción directamente a Datadog sin primero obtener una AuthnRequest (inicio de sesión iniciado por el IdP).

Después de habilitar la función de inicio de sesión iniciado por el IdP y guardar su configuración, puede descargar la última versión de los metadatos del Proveedor de Servicios (SP) para su Proveedor de Identidad. Sus nuevos metadatos de SP contienen un punto de conexión específico de la organización `AssertionConsumerService` para enviar aserciones.

Si no utiliza los metadatos de SP actualizados, Datadog no podrá asociar la aserción con su organización y mostrará una página de error con un mensaje que indica que a la respuesta SAML le falta el atributo "InResponseTo".

### SAML estricto {#saml-strict}

Puede hacer que su organización sea SAML estricto deshabilitando otros tipos de métodos de inicio de sesión en la UI {{< ui >}}Login Methods{{< /ui >}}. Cuando esta opción está configurada, todos los usuarios deben, por defecto, iniciar sesión con SAML. Un nombre de usuario y contraseña existentes, o el inicio de sesión de Google OAuth, no funcionan. Esto asegura que todos los usuarios con acceso a Datadog deben tener credenciales válidas en el proveedor de identidad o servicio de directorio de su empresa para acceder a su cuenta de Datadog. Los administradores de la organización pueden establecer [excepciones][6] por usuario para permitir que ciertos usuarios estén exentos de SAML Estricto.

### Metadatos de SP de Datadog autoactualizables {#self-updating-datadog-sp-metadata}

Ciertos Proveedores de Identidad (como ADFS de Microsoft) pueden configurarse para obtener los últimos metadatos del proveedor de servicios SAML de Datadog. Después de configurar SAML en Datadog, puede obtener la URL de metadatos para su organización desde la página de Configuración de SAML y usarla con su Proveedor de Identidad para obtener los últimos metadatos del proveedor de servicios cada vez que se publiquen cambios.

{{< img src="account_management/saml/saml_metadata_url.png" alt="URL de Metadatos SAML" style="width:50%;" >}}

## Lectura adicional {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: http://en.wikipedia.org/wiki/Security_Assertion_Markup_Language
[2]: /es/account_management/saml/configuration
[3]: https://app.datadoghq.com/account/saml/metadata.xml
[4]: https://app.datadoghq.com/organization-settings/login-methods/saml
[5]: /es/account_management/saml/mapping/
[6]: /es/account_management/login_methods/#reviewing-user-overrides
[7]: https://developer.okta.com/docs/concepts/saml/
[8]: https://thalesdocs.com/sta/operator/applications/apps_saml/index.html
[9]: /es/account_management/users/default_roles/