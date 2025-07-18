---
aliases:
- /es/guides/billing
- /es/account_management/settings
description: Gestiona tu cuenta de Datadog y tu organización
kind: documentación
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

Puedes cambiar tu zona horaria, las notificaciones de escritorio y las suscripciones de correo electrónico en la [pestaña **Preferences**)][3] (Preferencias) de la página **Personal Settings** (Parámetros personales). En la sección correspondiente a las suscripciones de correo electrónico, puedes acceder a los siguientes informes:

* Daily Digest (Resumen diario)
* Weekly Digest (Resumen semanal)

Si no sabes si un resumen de correo electrónico es relevante para ti, haz clic en el enlace **Example** que aparece junto a cada suscripción de correo electrónico para ver un ejemplo. También puedes usar el botón **Unsubscribe From All** para cancelar todas tus suscripciones de correo electrónico rápidamente.

### Organizaciones

La página **Organizations** (Organizaciones) de **Personal Settings** (Parámetros personales) muestra todas las organizaciones a las que estás asociado. Puedes cambiar de una organización a otra desde esta página o bien colocando el cursor sobre el menú de la cuenta en el panel de navegación de la izquierda.

**Nota**: Si abandonas una organización, no podrás volverte a unir a no ser que te invite un administrador de dicha organización.

Solo puedes unirte a una organización existente mediante la invitación de un administrador. Cuando te inviten, recibirás un correo electrónico con el asunto `You've been invited to join <Organization Name>`. Haz clic en el botón **Join Account** (Unir cuenta) del correo electrónico.

Si eres administrador de una organización, consulta la documentación de referencia adicional para:

* [Gestionar usuarios en tu organización][4]
* [Configurar el inicio de sesión único con SAML][5]
* [Cambiar el nombre de tu organización][6]
* [Gestionar cuentas multiorganización][7]
* [Cambiar tu plan de Datadog y ver historial de uso y facturación][8]

### Seguridad

La pestaña **Application Keys** (Claves de aplicación) de **Personal Settings** (Parámetros personales) te permite gestionar tus claves de aplicación. Para copiar una clave, coloca el cursor encima hasta que se muestre el icono para **copiar la clave** a la derecha y haz clic en él. También puedes hacer clic en una clave concreta para editar su nombre, ver cuándo se creó, ver el perfil del propietario de la clave, copiarla o revocarla.
## Aspecto

Puedes utilizar Datadog en modo oscuro. Para hacerlo, coloca el cursor encima de tu avatar, en la barra lateral, o teclea lo siguiente: `Ctrl+Opt+D` / `Ctrl+Alt+D`.

Para adaptar el aspecto al de tu ordenador, selecciona la opción *System* (Sistema). Así, el aspecto de Datadog se adaptará automáticamente al tema que hayas definido en el SO.

## Conectarse a GitHub

Si has instalado la [integración con GitHub][9] para crear eventos en Datadog, vincula tu cuenta personal de GitHub a tu cuenta de usuario de Datadog. Una vez que las cuentas estén vinculadas, cualquier comentario que publiques en los eventos de GitHub a través de Datadog se publicarán de forma automática en el tema o solicitud pull correspondiente en GitHub.

## Desactivar la cuenta de tu organización

Para desactivar la cuenta de tu organización de Datadog, ponte en contacto con el [equipo de asistencia de Datadog][10].

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