---
description: Soluciona los problemas de SAML de tu cuenta Datadog
further_reading:
- link: https://www.samltool.com/online_tools.php
  tag: Herramientas de desarrollo
  text: Identifica tus afirmaciones con herramientas para desarrolladores SAML
title: Solucionar problemas SAML
---

## Información general

Esta página proporciona instrucciones para solucionar problemas para errores comunes durante la autenticación Security Assertion Markup Language (SAML).

## Errores comunes

Si te encuentras con un mensaje de error de la lista a continuación, puede haber un problema con tu configuración de asignaciones en Datadog o en la configuración de tu proveedor de identidad (IdP).

- `SAML no está activo para esta org.`
- `Usuario desconocido Arf.`
- `No hay asignaciones de Authn para este usuario.`
- `No se pudo validar la afirmación.`
- `ERROR SAML SIN IDENTIFICAR`
- `No hay una cuenta activa para un usuario.`

Para resolverlo, consulta la sección siguiente para conocer el error específico.

### SAML no está activado para esta organización.

SAML está desactivado para tu cuenta. Ve a [Login Methods (métodos de inicio de sesión)][1]. En la sección SAML, asegúrate de que **Enabled by Default** (Activado por defecto) está establecido en **On** (Activado).

**Nota:** La configuración de SAML requiere el rol Datadog Admin o el permiso Org Management (`org_management`).

### No hay asignaciones authn para este usuario.

Hay un desajuste con tus asignaciones de configuración en Datadog y tu configuración en el IdP. Ver [Roles errors (errores de roles)](#roles-errors).

### No se ha podido validar la afirmación.

Después de activar el inicio de sesión iniciado por el IdP en Datadog, las [Assertion Consumer Service (ACS) URLs (URL del Servicio de consumidor de afirmaciones [ACS])][2] de tu configuración de IdP pueden ser incorrectas. Otra posibilidad es que tus afirmaciones no estén firmadas. Para obtener más información, consulta [Assertions and attributes (afirmaciones y atributos)][3].

### Error SAML sin identificar

Es posible que a tu afirmación le falte el atributo `eduPersonPrincipalName` necesario. Confirma que este atributo está establecido en tu configuración. Para obtener más información, consulta [Assertions and attributes (afirmaciones y atributos)][3].

### No hay cuenta activa para un usuario.

Este error puede producirse como resultado de los siguientes escenarios:
  - Si has activado suministrar Just-In-Time (JIT), y un usuario sigue viendo este error al intentar iniciar sesión, verifica si ya has enviado una invitación por correo electrónico a este usuario antes de activar JIT. JIT no se aplica a los usuarios que ya han sido invitados. Para solucionarlo, haz que el usuario acepte la invitación por correo electrónico. O, si la invitación ha caducado, haz que el administrador envíe una nueva invitación.
  - Si un usuario ya no está activado en una organización Datadog que tiene habilitado suministrar JIT e intenta volver a iniciar sesión a través de SAML y se produce el `No hay una cuenta activa por error`, vuelve a activar el usuario en [User settings (configuración de usuario)][4].

## Errores en el archivo de metadatos IdP

Si tienes problemas para actualizar el archivo de metadatos del IdP, comprueba que el archivo de metadatos que estás intentando cargar es válido.

Para validar tu archivo de metadatos, realiza lo siguiente:

1. Elige una herramienta de validación SAML, como [SAML developer tool (herramienta desarrolladora de SAML)][5] de OneLogin.
2. Pega tus metadatos en el campo XML y selecciona **Metadata** (metadatos) en el campo XSD (archivo de esquema).
3. Haz clic en **Validate XML With the XSD Schema** (Validar XML con el esquema XSD).

## Errores en los roles

Cuando se activan las asignaciones, los usuarios que inician sesión con SAML en una cuenta de Datadog son despojados permanentemente de sus roles actuales. Datadog asigna nuevos roles basándose en los detalles de la afirmación SAML transmitida desde tu IdP.

Los usuarios que inician sesión con SAML y no tienen valores que se correspondan con un rol de Datadog son despojados permanentemente de todos sus roles. Ese usuario ya no podrá iniciar sesión.

{{< img src="account_management/saml/unknown_user_error.png" alt="No hay AuthNMappings  para este usuario." style="width:80%;">}}

Si tienes asignaciones de grupo configuradas y no puedes ver tus roles, es posible que tus asignaciones de grupo en la aplicación Datadog aparezcan de forma diferente en tu IdP. Para verificarlo, realiza lo siguiente:

1. Recupera la afirmación SAML de tu IdP para tu cuenta. Utiliza herramientas de navegador, como [extensions (extensiones)][6], para recuperar tu afirmación SAML. Por ejemplo

  ```xml
  <saml2:Attribute Name="member_of"
                             NameFormat="urn:oasis:names:tc:SAML:2.0:attrname-format:unspecified"
                             >
                <saml2:AttributeValue xmlns:xs="http://www.w3.org/2001/XMLSchema"
                                      xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
                                      xsi:type="xs:string"
                                      >name_of_your_group_goes_here</saml2:AttributeValue>
  </saml2:Attribute>
  ```

2. Navega hasta tu perfil y selecciona **Organization Settings** (configuración de organización) en la esquina inferior izquierda de Datadog.
3. Selecciona [**SAML Group Mappings** (asignaciones de grupos SAML)][7].
4. Compara los atributos proporcionados por tu IdP en tu afirmación SAML a los atributos establecidos en la pestaña [**SAML Group Mappings** (asignaciones de grupo SAML)][7].

  {{< img src="account_management/saml/saml_mappings_example.png" alt="asignaciones SAML en Datadog" style="width:80%;">}}

5. Resuelve cualquier discrepancia en la configuración de Datadog SAML Group Mappings o en la configuración de tu IdP. Por ejemplo, si `memberof` es un atributo de conjunto en Datadog, y es `member_Of` en tu afirmación SAML, resuélvelo en consecuencia.

Las discrepancias pueden producirse cuando no hay coincidencia o hay una falta de coincidencia entre la clave y el valor del atributo. Por ejemplo, si ves un par de valor clave de `memberOf` y `name_of_your_group_goes_here` en **SAML Group Mappings** (asignaciones de grupo SAML), te encuentras con un problema porque este par no se incluye en la afirmación enviada desde tu IdP.

Si tienes problemas para iniciar sesión debido a un error basado en funciones, ponte en contacto con tu administrador para completar los pasos anteriores de solucionar problemas.

**Notas**:

- Cada IdP proporciona diferentes tipos de atributos y diferentes formas de establecerlos. Por ejemplo, Azure utiliza [object IDs (ID de objeto)][8] para sus atributos, o si utilizas Okta, debes establecer los atributos en [Okta settings (configuración de Okta)][9]. Consulta la documentación sobre atributos de tu IdP para obtener más información.

- Cuando desactivas **SAML Group Mappings** (asignaciones de grupo SAML), los usuarios pueden iniciar sesión con SAML y tener los mismos roles que tienen asignados, incluso si la membresía a un grupo ha cambiado en tu IdP.

## Errores del proveedor de identidad (IdP)

Si encuentras un error procedente de tu IdP como Google, Active Directory, Azure, Okta, etc.:

- Si te encuentras con un problema en la consola de administración de Google, consulta [SAML app error messages (mensajes de error de la aplicación SAML)][10].
- Si te encuentras con un problema en Active Directory, consulta [Debug SAML-based single sign-on to applications in Azure Active Directory (depuración del inicio de sesión único basado en SAML en aplicaciones en Azure Active Directory)][11].
- Si te encuentras con un problema en AuthO, consulta [Troubleshoot SAML Configurations (Solucionar problemas de configuraciones SAML)][12].
- Si te encuentras con un problema en Azure, consulta [An app page shows an error message after the user signs in (la página de una aplicación muestra un mensaje de error después de que el usuario inicie sesión)][13].
- Si te encuentras con un problema en Google, consulta [Datadog cloud application (aplicación de la nube Datadog)][14].
- Si te encuentras con un problema en Okta, consulta [Receiving 404 error when attempting to sign into application (recibir error 404 al intentar iniciar sesión en la aplicación)][16].
- Si te encuentras con un problema en SafeNet, consulta [SafeNet Trusted Access for Datadog (SafeNet Trusted Access para Datadog)][17].

### Certificados de proveedor de identidad

Si no puedes iniciar sesión en tu cuenta, es posible que un certificado IdP haya caducado y rotado, lo que provocó un error SAML general.

Algunas preguntas que puedes plantearte ayudan para determinar si tienes un problema con el certificado:

- ¿Eres la única cuenta que no puede iniciar sesión? Si el problema afecta a varias cuentas, podría ser que un certificado basado en IdP haya caducado o rotado.
- ¿Has cambiado algo recientemente en tu configuración SAML?
- Si tus usuarios utilizan varios IdP, ¿los problemas persisten en varios IdP o solo en uno?
- ¿Has activado recientemente [**SAML Group Mappings** (asignaciones de grupo SAML)](#roles-errors)?

Para solucionarlo, asegúrate de que los certificados IdP están actualizados en la configuración de tu IdP y de que has cargado el archivo de metadatos más reciente de tu IdP en Datadog.

## Soporte

Si sigues teniendo problemas para iniciar sesión en Datadog, ponte en contacto con [Datadog support (soporte de Datadog)][18].

En tu mensaje, proporciona una grabación de pantalla de tu proceso de inicio de sesión e incluye respuestas a las siguientes preguntas:

- ¿Eres  la única cuenta que no puede iniciar sesión o todos los usuarios no pueden acceder?
- ¿En qué organización estás intentando iniciar sesión y cómo?

Antes de ponerte en contacto con el servicio de asistencia de Datadog, ponte en contacto con tu administrador. Es posible que también tengas que ponerte en contacto con tu proveedor de identidad para resolver los problemas de inicio de sesión.

## Leer más

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/organization-settings/login-methods
[2]: https://app.datadoghq.com/organization-settings/login-methods/saml
[3]: https://docs.datadoghq.com/es/account_management/saml/#assertions-and-attributes
[4]: https://app.datadoghq.com/organization-settings/users
[5]: https://www.samltool.com/validate_xml.php
[6]: https://www.samltool.com/saml_tools.php
[7]: https://app.datadoghq.com/organization-settings/mappings
[8]: https://docs.microsoft.com/en-us/azure/active-directory/cloud-sync/concept-attributes#attributes-and-expressions
[9]: https://help.okta.com/en/prod/Content/Topics/users-groups-profiles/usgp-about-attribute-mappings.htm
[10]: https://support.google.com/a/answer/6301076
[11]: https://docs.microsoft.com/en-us/azure/active-directory/manage-apps/debug-saml-sso-issues
[12]: https://auth0.com/docs/troubleshoot/troubleshoot-authentication/troubleshoot-saml-configurations
[13]: https://docs.microsoft.com/en-us/azure/active-directory/manage-apps/application-sign-in-problem-application-error
[14]: https://support.google.com/a/answer/7553768
[16]: https://support.okta.com/help/s/article/Receiving-404-error-when-attempting-to-sign-into-application?language=en_US
[17]: https://resources.safenetid.com/help/Datadog/Index.htm
[18]: https://www.datadoghq.com/support/