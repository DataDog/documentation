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
  text: Configuración de Teams y organizaciones con múltiples cuentas
title: Inicio de sesión único con SAML
---
{{< site-region region="gov,gov2" >}}
<div class="alert alert-danger">El sitio de Datadog for Government solo admite el inicio de sesión con SAML.</div>
{{< /site-region >}}

## Descripción general {#overview}

La configuración de [SAML (Security Assertion Markup Language)][1] para su cuenta de Datadog le permite a usted y a todos sus compañeros de equipo iniciar sesión en Datadog utilizando las credenciales almacenadas en Active Directory, LDAP u otro almacén de identidades de su organización que se haya configurado con un proveedor de identidad SAML.

**Notas**: 

{{% site-region region="us,us3,us5,eu,ap1,ap2,uk1" %}}
- Si no tiene SAML habilitado en su cuenta de Datadog, comuníquese con [soporte][2] para habilitarlo.
{{% /site-region %}}
- Esta documentación asume que usted ya tiene un proveedor de identidad (IdP) SAML. Si no tiene un IdP SAML, existen varios IdP que tienen integraciones con Datadog, como [Active Directory][3], [Auth0][4], [Google][5], [LastPass][6], [Microsoft Entra ID][3], [Okta][7] y [SafeNet][8].
- La configuración de SAML requiere acceso de [Datadog Administrator][9].

## Configuración de SAML {#configuring-saml}

Consulte [Configurar el inicio de sesión único con SAML][2] para obtener instrucciones.

## Uso de SAML {#using-saml}

Una vez que SAML esté configurado en Datadog y su IdP esté configurado para aceptar solicitudes de Datadog, los usuarios podrán iniciar sesión.

### Inicio de sesión iniciado por el SP {#sp-initiated-login}

El inicio de sesión iniciado por el SP, o iniciado por el proveedor de servicios, significa que el inicio de sesión se inicia desde Datadog. Los usuarios inician sesión a través del {{< ui >}}Single Sign-on URL{{< /ui >}} que se muestra en el cuadro de estado en la parte superior de la [página SAML Configuration][4]. La carga de esta URL inicia una autenticación SAML contra su IdP. **Nota**: Esta URL solo se muestra si SAML está habilitado para su cuenta y está utilizando el inicio de sesión iniciado por el SP.

{{< img src="account_management/saml/saml_enabled_cropped.png" alt="Confirmación de que SAML está habilitado" >}}

Cuando un usuario inicia sesión a través de SAML iniciado por el SP y la organización no tiene un subdominio personalizado, Datadog requiere seguridad adicional. Los usuarios reciben un código de verificación por correo electrónico de un solo uso que es necesario para iniciar sesión.

### Inicio de sesión iniciado por el IdP {#idp-initiated-login}

El inicio de sesión iniciado por el IdP, o iniciado por el proveedor de identidad, significa que el inicio de sesión se inicia desde su portal de aplicaciones. Los usuarios inician sesión haciendo clic en el ícono de la aplicación en su portal de aplicaciones, por ejemplo, en Google App drawer o en Okta App Portal. Los usuarios del inicio de sesión iniciado por el SP también pueden utilizar el inicio de sesión iniciado por el IdP, dependiendo de la configuración de su proveedor de identidad.

## Aserciones y atributos {#assertions-and-attributes}

Cuando se produce un inicio de sesión, se envía una aserción SAML que contiene la autorización del usuario desde el proveedor de identidad a Datadog.

### Capacidades {#capabilities}

* Datadog admite el enlace **HTTP-POST** para **SAML2**:
`urn:oasis:names:tc:SAML:2.0:bindings:HTTP-POST`.
* Datadog especifica `urn:oasis:names:tc:SAML:1.1:nameid-format:emailAddress` para el formato de **NameIDPolicy** en las solicitudes de aserción.

### Requisitos {#requirements}

* Las aserciones deben estar firmadas.
* Las aserciones pueden estar cifradas, pero se aceptan aserciones sin cifrar.
* Consulte los [metadatos del proveedor de servicios de Datadog][3] para obtener más información. Debe haber iniciado sesión en Datadog para acceder al archivo.

### Atributos admitidos {#supported-attributes}

Los atributos pueden incluirse en una aserción SAML. Datadog busca tres atributos en una `AttributeStatement`:

  1. **eduPersonPrincipalName**: Si se especifica, el eduPersonPrincipalName debe corresponder al nombre de usuario de Datadog del usuario. El nombre de usuario suele ser la dirección de correo electrónico del usuario.
  2. **sn**: Esto es opcional y debería establecerse como el apellido del usuario.
  3. **givenName**: Esto es opcional y debería establecerse como el nombre de pila del usuario.

<div class="alert alert-info">Para el IdP de Microsoft Entra ID, utilice el atributo <code>surname</code> en lugar de <code>sn</code> en la aserción.</div>

Datadog espera que los atributos utilicen URI NameFormat `urn:oasis:names:tc:SAML:2.0:attrname-format:uri` o Basic NameFormat `urn:oasis:names:tc:SAML:2.0:attrname-format:basic`. El nombre utilizado para cada atributo depende del NameFormat que utilice su IdP.

Si su IdP está configurado para usar URI NameFormat `urn:oasis:names:tc:SAML:2.0:attrname-format:uri`:

  1. **eduPersonPrincipalName**: El IdP debe establecer `urn:oid:1.3.6.1.4.1.5923.1.1.1.6` como el nombre del atributo.
  2. **sn**: El IdP debe establecer `urn:oid:2.5.4.4` como el nombre del atributo.
  3. **givenName**: El IdP debe establecer `urn:oid:2.5.4.42` como el nombre del atributo.

Si su IdP está configurado para usar Basic NameFormat `urn:oasis:names:tc:SAML:2.0:attrname-format:basic`:

  1. **eduPersonPrincipalName**: El IdP debe establecer `urn:mace:dir:attribute-def:eduPersonPrincipalName` como el nombre del atributo.
  2. **sn**: El IdP debe establecer `urn:mace:dir:attribute-def:sn` como el nombre del atributo.
  3. **givenName**: El IdP debe establecer `urn:mace:dir:attribute-def:givenName` como el nombre del atributo.

Si **eduPersonPrincipalName** existe en el AttributeStatement, el valor de este atributo se utiliza para el nombre de usuario. Si **eduPersonPrincipalName** no se incluye en el AttributeStatement, el nombre de usuario se toma del NameID en el Subject. El NameID debe usar el formato `urn:oasis:names:tc:SAML:1.1:nameid-format:emailAddress`.

Si **sn** y **givenName** se proporcionan, se utilizan para actualizar el nombre del usuario en su perfil de Datadog.

## Funciones adicionales {#additional-features}

Para asignar atributos en la respuesta de su proveedor de identidad a los roles y equipos de Datadog, consulte [SAML group mapping][5].

Las siguientes funciones se pueden habilitar a través del [cuadro de diálogo SAML Configuration][4]:

**Nota:** Debe tener permisos de Admin para ver el cuadro de diálogo SAML Configuration.

### Aprovisionamiento justo a tiempo (JIT) {#just-in-time-jit-provisioning}

Con el aprovisionamiento JIT, se crea un usuario dentro de Datadog la primera vez que intenta iniciar sesión. Esto elimina la necesidad de que los administradores creen manualmente las cuentas de usuario una por una. El correo electrónico de invitación no se envía en este caso.

Es posible que algunas organizaciones no deseen invitar a todos sus usuarios a Datadog. Si desea realizar cambios en cómo funciona SAML para su cuenta, comuníquese con el [soporte de Datadog][2]. Depende de la organización configurar su IdP para que no envíe aserciones a Datadog si no desea que un usuario en particular acceda a Datadog.

Los administradores pueden establecer el rol predeterminado para los nuevos usuarios JIT. El rol predeterminado es {{< ui >}}Standard{{< /ui >}}, pero puede elegir agregar nuevos usuarios JIT como {{< ui >}}Read-Only{{< /ui >}}, {{< ui >}}Administrators{{< /ui >}} o cualquier rol personalizado.

<div class="alert alert-danger">
  <strong>Importante:</strong> Si Role Mapping está habilitado, tiene prioridad sobre los roles establecidos durante el aprovisionamiento JIT. Sin las declaraciones de Group Attribute adecuadas, los usuarios podrían terminar sin roles y perder el acceso a Datadog. Para evitar que los usuarios queden bloqueados después del aprovisionamiento JIT, asegúrese de revisar sus definiciones de mapeo y verificar sus aserciones antes de habilitar Mappings y JIT.
</div>

{{< img src="account_management/saml/saml_jit_default.png" alt="saml JIT Default" style="width:50%;" >}}

### Inicio de sesión iniciado por el IdP {#idp-initiated-login-1}

Cuando se carga la URL de Datadog, el navegador se redirige al IdP del cliente, donde el usuario ingresa sus credenciales, y luego el IdP lo redirige a Datadog. Algunos IdP tienen la capacidad de enviar una aserción directamente a Datadog sin obtener primero una AuthnRequest (inicio de sesión iniciado por el IdP).

Después de habilitar la función de inicio de sesión iniciado por el IdP y guardar su configuración, puede descargar la versión más reciente de los metadatos del proveedor de servicios (SP) para su proveedor de identidad. Sus nuevos metadatos de SP contienen un punto de conexión `AssertionConsumerService` diferente y específico de la organización para enviar aserciones.

Si no utiliza los metadatos de SP actualizados, Datadog no puede asociar la aserción con su organización y muestra una página de error con un mensaje de que a la respuesta SAML le falta el atributo "InResponseTo".

### SAML Strict {#saml-strict}

Puede hacer que su organización sea SAML Strict si deshabilita otros tipos de métodos de inicio de sesión en la interfaz de usuario {{< ui >}}Login Methods{{< /ui >}}. Cuando esta opción está configurada, todos los usuarios deben, de forma predeterminada, iniciar sesión con SAML. El inicio de sesión con un nombre de usuario y una contraseña existentes, o con Google OAuth, no funciona. Esto garantiza que todos los usuarios con acceso a Datadog deban tener credenciales válidas en el proveedor de identidad o servicio de directorio de su empresa para acceder a su cuenta de Datadog. Los administradores de la organización pueden establecer [anulaciones][6] por usuario para permitir que ciertos usuarios estén exentos de SAML Strict.

### Metadatos de SP de Datadog que se actualizan automáticamente {#self-updating-datadog-sp-metadata}

Ciertos proveedores de identidad (como ADFS de Microsoft) pueden configurarse para obtener los metadatos más recientes del proveedor de servicios SAML desde Datadog. Después de configurar SAML en Datadog, puede obtener la URL de metadatos para su organización desde la página SAML Configuration y usarla con su proveedor de identidad para obtener los metadatos más recientes del proveedor de servicios cada vez que se publiquen cambios.

{{< img src="account_management/saml/saml_metadata_url.png" alt="URL de metadatos SAML" style="width:50%;" >}}

## Lecturas adicionales {#further-reading}

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