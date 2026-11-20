---
aliases:
- /es/guides/billing
- /es/account_management/settings
cascade:
  algolia:
    rank: 70
description: Administre su cuenta y organización de Datadog
further_reading:
- link: https://www.datadoghq.com/blog/volkswagen-organizations/
  tag: Blog
  text: Prácticas recomendadas para administrar organizaciones Datadog a escala
title: Gestión de cuentas
---
{{< site-region region="gov,gov2" >}}
<div class="alert alert-danger">La plataforma Datadog for Government solo admite SAML o autenticación básica mediante un nombre de usuario/correo electrónico y una contraseña. Antes de configurar la autenticación SAML, asegúrese de que se haya creado al menos una cuenta con nombre de usuario/correo electrónico y contraseña para mantener el acceso durante el proceso de configuración. Datadog recomienda habilitar la autenticación de múltiples factores (MFA) para las cuentas basadas en contraseña.

Si necesita que SAML esté habilitado para una cuenta de prueba, comuníquese con <a href="https://docs.datadoghq.com/getting_started/support/">Datadog Support</a>.</div>

{{< /site-region >}}

## Configuración personal {#personal-settings}

Las páginas de configuración personal en Datadog le permiten controlar cómo aparece ante los demás en su organización, cambiar o abandonar organizaciones y administrar sus preferencias de notificación.

### Perfil {#profile}

Su perfil es la forma en que otros en su organización lo reconocen en Datadog. Establezca o actualice su nombre, dirección de correo electrónico y cargo desde la [Profile tab][11] dentro de la página {{< ui >}}Personal Settings{{< /ui >}}.

Para actualizar su foto, cree una cuenta en [Gravatar][1] y asóciela con su dirección de correo electrónico.

Si inicia sesión en Datadog mediante la autenticación de Google, su dirección de correo electrónico la proporciona su cuenta de Google y **no** se puede editar dentro de Datadog. Para cambiar su dirección de correo electrónico en Google, consulte la [documentación de Google][2].

### Preferencias {#preferences}

{{% site-region region="us,us3,us5,eu,ap1,ap2,uk1" %}}
Puede administrar su zona horaria, formato de hora, preferencia de accesibilidad visual y suscripciones por correo electrónico desde la [Preferences tab][3] dentro de la página {{< ui >}}Personal Settings{{< /ui >}}.

#### Suscripciones por correo electrónico {#email-subscriptions}

En las suscripciones por correo electrónico, tiene acceso a los siguientes informes:
{{< site-region region="us3,us5,gov,gov2,ap1,ap2,uk1" >}}
<div class="alert alert-danger">Los resúmenes por correo electrónico no están disponibles en el sitio seleccionado ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

* Resumen diario
* Resumen semanal

Si no está seguro de si un resumen por correo electrónico es relevante para usted, puede ver un ejemplo haciendo clic en el enlace {{< ui >}}Example{{< /ui >}} junto a cada suscripción por correo electrónico. También puede usar el botón {{< ui >}}Unsubscribe From All{{< /ui >}} para cancelar todas sus suscripciones de correo electrónico.

Los usuarios desactivados no reciben resúmenes por correo electrónico. Si un usuario activo no recibe un resumen por correo electrónico, consulte [Solución de problemas de entrega de correo electrónico][17].
{{% /site-region %}}


{{% site-region region="gov,gov2" %}}
Puede administrar su zona horaria, formato de hora y preferencia de accesibilidad visual desde la [**Preferences** tab][3] dentro de la página {{< ui >}}Personal Settings{{< /ui >}}.
{{% /site-region %}}

#### Formato de hora {#time-format}

Elija si las horas se muestran en formato de 12 o 24 horas en Datadog (por ejemplo, "2:30 pm" o "14:30"). Las cuentas nuevas tienen el formato de 12 horas de forma predeterminada. Los gráficos y ciertos datos tabulares se muestran en formato de 24 horas en todo momento.

#### Accesibilidad visual {#visual-accessibility}

La preferencia de accesibilidad visual tiene cinco configuraciones diferentes para abordar la deficiencia en la visión de los colores, la baja agudeza visual y la sensibilidad a los colores brillantes. Si opta por una configuración de color accesible, Datadog traduce todos los gráficos que utilizan la paleta de colores clásica a un conjunto de colores accesibles adaptados a sus necesidades visuales.

**Nota**: Su preferencia de accesibilidad visual se guarda localmente en su navegador. Si utiliza un navegador diferente o borra su caché, la preferencia se restablece a la configuración predeterminada.

### Organizaciones {#organizations}

La [Organizations tab][12] en {{< ui >}}Personal Settings{{< /ui >}} enumera todas las organizaciones con las que está asociado. Cambie entre estas organizaciones desde esta página o pasando el cursor sobre el menú de cuenta en la navegación del lado izquierdo.

**Nota**: Si abandona una organización, no podrá volver a unirse a menos que sea invitado por un administrador de esa organización.

Para unirse a una organización existente, debe ser invitado por un administrador. Después de ser invitado, se le enviará un correo electrónico con el asunto "You've been invited to join \<Organization Name>". Haga clic en el botón {{< ui >}}Join Account{{< /ui >}} en el correo electrónico.

Si usted es administrador de la organización, consulte la documentación adicional para:

* [Administrar usuarios en su organización][4]
* [Configurar el inicio de sesión único con SAML][5]
* [Cambiar el nombre de su organización][6]
* [Administrar cuentas de múltiples organizaciones][7]
* [Cambiar su plan de Datadog y visualizar el historial de uso y facturación][8]
* [Elegir la topología de su organización (organización única frente a múltiples organizaciones)][15]
* [Administrar los controles de acceso y la implementación de la empresa][16]

### Security {#security}

#### Claves de aplicación {#application-keys}

La [Application Keys tab][13] en {{< ui >}}Personal Settings{{< /ui >}} le permite administrar sus claves de aplicación. Para copiar una clave, coloque el cursor sobre ella hasta que aparezca el icono {{< ui >}}Copy Key{{< /ui >}} a la derecha y haga clic en él. También puede hacer clic en una clave específica para editar su nombre, visualizar cuándo se creó, visualizar el perfil del propietario de la clave, copiarla o revocarla.

#### Apps {#apps}

La [Apps tab][14] en {{< ui >}}Personal Settings{{< /ui >}} le permite administrar las apps que han sido instaladas o creadas por los miembros de su organización. Puede filtrar las apps con una cadena de búsqueda o elegir visualizar solo las apps habilitadas o deshabilitadas mediante casillas de verificación.

Cuando coloca el cursor sobre una app, la opción para habilitarla o deshabilitarla aparece a la derecha del listado de apps.

#### Verificación de correo electrónico {#email-verification}
Verifique su dirección de correo electrónico para obtener una mayor seguridad de la cuenta y acceso a funciones de administración adicionales. Los usuarios verificados tienen un mayor control sobre la seguridad de su cuenta y pueden visualizar todas las organizaciones a las que pertenecen.

- **Los usuarios que inician sesión con Google** se verifican automáticamente durante su primer inicio de sesión.
- **Los usuarios con contraseña** verifican su correo electrónico al establecer su contraseña por primera vez.
- **Los usuarios de SAML** deben verificar manualmente su correo electrónico a través de Datadog.

Una vez verificado, obtiene acceso a:
- La capacidad de **cerrar sesión en todas las sesiones web activas** en todos los dispositivos, lo que garantiza la seguridad en caso de compromiso de las credenciales.
- La capacidad de **visualizar y cambiar entre organizaciones** fuera de su jerarquía organizacional actual.

Los usuarios no verificados aún pueden acceder a Datadog, pero solo pueden visualizar las organizaciones dentro de su jerarquía y no pueden revocar sesiones activas.

#### Verifique su correo electrónico {#verify-your-email}

Para verificar su correo electrónico:
1. Navegue a su {{< ui >}}Profile Settings{{< /ui >}}.
2. Haga clic en {{< ui >}}Verify Account{{< /ui >}}.
3. Ingrese el **código de verificación** enviado a su correo electrónico registrado.
4. Haga clic en {{< ui >}}Submit{{< /ui >}} para completar el proceso de verificación.

#### Cerrar sesión en todas las sesiones web activas {#log-out-of-all-active-web-sessions}

Para cerrar sesión en todas las sesiones web activas:
Al cerrar sesión en todas las sesiones web activas, se cierran todas sus sesiones actuales en todos los dispositivos, incluida la sesión que está usando.


Para cerrar sesión en todas las sesiones activas:
1. Vaya a {{< ui >}}Personal Settings{{< /ui >}}.
2. Haga clic en {{< ui >}}Log Out of All Web Sessions{{< /ui >}}.
3. Confirme la acción.

Después de confirmar, se cerrará su sesión en todos los dispositivos y deberá volver a iniciar sesión.

## Apariencia {#appearance}

Visualice Datadog en modo oscuro pasando el cursor sobre su avatar en la barra lateral o presionando `Ctrl+Opt+D` / `Ctrl+Alt+D`.

Para adaptarse a la configuración de apariencia de su computadora, seleccione la opción {{< ui >}}System{{< /ui >}}. Esto hace coincidir automáticamente la apariencia de Datadog con el tema que haya configurado a nivel del sistema operativo.

## Conexión a GitHub {#connecting-to-github}

Si ha instalado la [integración de GitHub][9] para crear eventos en Datadog, vincule su cuenta personal de GitHub a su cuenta de usuario de Datadog. Al vincular sus cuentas, cualquier comentario que publique en eventos de GitHub en Datadog se publica automáticamente en la incidencia o pull request correspondiente en GitHub.

## Deshabilitación de la cuenta de su organización {#disabling-your-organizations-account}

Para deshabilitar su cuenta de organización de Datadog, comuníquese con el [soporte de Datadog][10].

[1]: https://gravatar.com
[2]: https://support.google.com/accounts/answer/19870?hl=en
[3]: https://app.datadoghq.com/personal-settings/preferences
[4]: /es/account_management/users/
[5]: /es/account_management/saml/
[6]: /es/account_management/org_settings/#change-your-organization-name
[7]: /es/account_management/multi_organization/
[8]: /es/account_management/org_settings/
[9]: /es/integrations/github/
[10]: /es/help/
[11]: https://app.datadoghq.com/personal-settings/profile
[12]: https://app.datadoghq.com/personal-settings/organizations
[13]: https://app.datadoghq.com/personal-settings/application-keys
[14]: https://app.datadoghq.com/personal-settings/apps
[15]: /es/account_management/organization_topology/
[16]: /es/getting_started/access_for_enterprises/
[17]: /es/account_management/email_delivery/troubleshooting_email_delivery/