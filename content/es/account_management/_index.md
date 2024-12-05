---
aliases:
- /es/guides/billing
- /es/account_management/settings
cascade:
  algolia:
    rank: 70
description: Gestiona tu cuenta de Datadog y tu organización
title: Gestión de cuentas
---
{{< site-region region="gov" >}}
<div class="alert alert-warning">El sitio Datadog for Government solo admite el inicio de sesión con SAML.</div>
{{< /site-region >}}

## Parámetros personales

Las páginas de parámetros personales de Datadog permiten controlar cómo te ven otras personas en tu organización, cambiar o salir de organizaciones, y gestionar tus preferencias de notificación.

### Perfil

Tu perfil determina cómo te ven las demás personas de tu organización en Datadog. Aquí puedes introducir o actualizar tu nombre, dirección de correo electrónico y cargo.

Para actualizar tu imagen, crea una cuenta en [Gravatar][1] y asóciala a tu dirección de correo electrónico.

Si inicias sesión en Datadog mediante la autenticación de Google, tu cuenta de Google proporcionará tu dirección de correo electrónico y **no** podrás editarla en Datadog. Para cambiar tu dirección de correo electrónico, consulta la [documentación de Google][2].

### Preferencias

{{% site-region region="us,us3,us5,eu,ap1" %}}
Puedes configurar tu zona horaria, tus notificaciones de escritorio y tus suscripciones de correo electrónico desde la [pestaña **Preferences** (Preferencias)][1], en la página **Personal Settings** (Parámetros personales). En las suscripciones de correo electrónico, tienes acceso a los siguientes informes:

* Daily Digest (Resumen diario)
* Weekly Digest (Resumen semanal)

Si no sabes si un resumen de correo electrónico es relevante para ti, haz clic en el enlace **Example** que aparece junto a cada suscripción de correo electrónico para ver un ejemplo. También puedes usar el botón **Unsubscribe From All** para cancelar todas tus suscripciones de correo electrónico rápidamente.

[1]: https://app.datadoghq.com/account/preferences
{{% /site-region %}}

{{% site-region region="gov" %}}

Puedes configurar tu zona horaria y tus notificaciones de escritorio desde la [pestaña **Preferences** (Preferencias)][1], en la página **Personal Settings** (Parámetros personales).

[1]: https://app.datadoghq.com/account/preferences
{{% /site-region %}}

### Organizaciones

La página **Organizations** (Organizaciones) en **Personal Settings** (Parámetros personales) muestra todas las organizaciones a las que te has asociado. Puedes cambiar de organización desde esta página o bien pasando el cursor sobre el menú de la cuenta, a la izquierda del panel de navegación.

**Nota**: Si abandonas una organización, no podrás volver a unirte, a no ser que te invite un administrador de esa organización.

Para unirte a una organización existente, debe invitarte un administrador. Cuando te invite, recibirás un correo electrónico con el asunto `You've been invited to join <Organization Name>`. Haz clic en el botón **Join Account** (Unirse a la cuenta) del correo electrónico.

Si eres administrador de una organización, consulta la documentación de referencia adicional para:

* [Gestionar usuarios en tu organización][4]
* [Configurar el inicio de sesión único con SAML][5]
* [Cambiar el nombre de tu organización][6]
* [Gestionar cuentas de varias organizaciones][7]
* [Cambiar tu plan de Datadog, y ver el historial de uso y facturación][8]

### Seguridad

La pestaña **Application Keys** (Claves de aplicación) en **Personal Settings** (Parámetros personales) te permite gestionar tus claves de aplicación. Para copiar una clave, pasa el cursor sobre ella hasta que veas el icono **Copy Key** (Copiar la clave) a la derecha y haz clic en él. También puedes hacer clic en una clave concreta para editar su nombre, ver cuándo fue creada, ver el perfil del propietario de la clave, copiarla o revocarla.
## Aspecto

Puedes utilizar Datadog en modo oscuro. Para hacerlo, pasa el cursor sobre tu avatar en la barra lateral o pulsa: `Ctrl+Opt+D` / `Ctrl+Alt+D`.

Para adaptar el aspecto al aspecto de tu ordenador, selecciona la opción *System* (Sistema). De esta manera, el aspecto de Datadog se adaptará automáticamente al tema que hayas definido en el sistema operativo.

## Conectarse a GitHub

Si has instalado la [integración con GitHub][9] para crear eventos en Datadog, vincula tu cuenta personal de GitHub a tu cuenta de usuario de Datadog. Una vez que las cuentas estén vinculadas, cualquier comentario que publiques en los eventos de GitHub a través de Datadog se publicarán de forma automática en el tema o solicitud pull correspondiente en GitHub.

## Deshabilitar la cuenta de tu organización

Para deshabilitar la cuenta de tu organización de Datadog, ponte en contacto con el [equipo de asistencia de Datadog][10].

[1]: https://gravatar.com
[2]: https://support.google.com/accounts/answer/19870?hl=en
[3]: https://app.datadoghq.com/account/preferences
[4]: /es/account_management/users/
[5]: /es/account_management/saml/
[6]: /es/account_management/org_settings/#change-your-organization-name
[7]: /es/account_management/multi_organization/
[8]: /es/account_management/org_settings/
[9]: /es/integrations/github/
[10]: /es/help/