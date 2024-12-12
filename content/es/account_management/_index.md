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

Tu perfil es la forma en que los demás miembros de tu organización te reconocen en Datadog. Define o actualiza tu nombre, dirección de correo electrónico y cargo desde la pestaña [Perfil][11], en la página **Parámetros personales**.

Para actualizar tu imagen, crea una cuenta en [Gravatar][1] y asóciala a tu dirección de correo electrónico.

Si inicias sesión en Datadog mediante la autenticación de Google, tu cuenta de Google proporcionará tu dirección de correo electrónico y **no** podrás editarla en Datadog. Para cambiar tu dirección de correo electrónico, consulta la [documentación de Google][2].

### Preferencias

{{% site-region region="us,us3,us5,eu,ap1" %}}
Puedes gestionar tu zona horaria, preferencia de accesibilidad visual y suscripciones de correo electrónico desde la pestaña [Preferences][3] (Preferencias) en la página **Personal Settings** (Configuración personal).

#### Suscripciones por correo electrónico

En las suscripciones por correo electrónico, tienes acceso a los siguientes informes:
{{< site-region region="us3,us5,gov,ap1" >}}
<div class="alert alert-warning">Los resúmenes de correo electrónico no están disponibles en el sitio seleccionado ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

* Daily Digest (Resumen diario)
* Weekly Digest (Resumen semanal)

Si tienes dudas sobre si un resumen por correo electrónico es relevante para ti, puedes ver un ejemplo haciendo clic en el enlace **Example** (Ejemplo) que aparece junto a cada suscripción. También puedes usar el botón **Unsubscribe From All** (Darse de baja de todo) para anular todas sus suscripciones por correo electrónico.
{{% /site-region %}}


{{% site-region region="gov" %}}
Puedes gestionar tu zona horaria y preferencias de accesibilidad visual desde la pestaña [**Preferencias**][3]  (Preferences) en la página **Personal Settings** (Configuración personal).
{{% /site-region %}}

#### Accesibilidad visual

La preferencia de accesibilidad visual ofrece cinco ajustes diferentes para abordar las necesidades por deficiencia de visión cromática, baja agudeza visual y sensibilidad a los colores brillantes. Si optas por una configuración de colores accesible, Datadog convertirá todos los gráficos que utilizan la paleta de colores clásica en un conjunto de colores adaptados a tus necesidades visuales.

**Nota**: Tus preferencias de accesibilidad visual se guardan localmente en tu navegador. Si usas otro navegador o borras la memoria caché, las preferencias volverán a la configuración predeterminada.

### Organizaciones

En la pestaña [Organizations][12] (Organizaciones) de **Personal Settings** (Configuración personal) se incluyen todas las organizaciones a las que estás asociado. Cambia de organización desde esta página o pasando el cursor por encima del menú de la cuenta en la barra de navegación de la izquierda.

**Nota**: Si abandonas una organización, no podrás volver a unirte, a no ser que te invite un administrador de esa organización.

Para unirte a una organización existente, es necesario que un administrador te invite. Tras recibir la invitación, se te enviará un correo electrónico con el asunto "You've been invited to join <Organization Name>". Haz clic en el botón **Join Account** (Unirse a la cuenta) en el mensaje.

Si eres administrador de una organización, consulta la documentación de referencia adicional para:

* [Gestionar usuarios en tu organización][4]
* [Configurar el inicio de sesión único con SAML][5]
* [Cambiar el nombre de tu organización][6]
* [Gestionar cuentas de varias organizaciones][7]
* [Cambiar tu plan de Datadog, y ver el historial de uso y facturación][8]

### Seguridad

#### Claves de aplicación

La pestaña [Application Keys][13] (Claves de aplicación) de **Personal Settings** (Configuración personal) te permite gestionar las claves de tu aplicación. Para copiar una clave, pasa el cursor sobre ella hasta que aparezca el icono **Copy Key** (Copiar clave) a la derecha y haz clic en él. También puedes hacer clic en una clave concreta para editar su nombre, ver cuándo se creó, consultar el perfil del propietario, copiarla o revocarla.

#### Aplicaciones

La pestaña [Apps][14] (Aplicaciones) de **Personal Settings** (Configuración personal) te permite gestionar las aplicaciones que han sido instaladas o creadas por miembros de tu organización. Puedes filtrarlas con una cadena de búsqueda o elegir ver solo las aplicaciones activadas o desactivadas mediante casillas de verificación.

Al pasar el cursor por encima de una aplicación, la opción de activarla o desactivarla aparecerá a la derecha de la lista.

## Aspecto

Puedes utilizar Datadog en modo oscuro. Para hacerlo, pasa el cursor sobre tu avatar en la barra lateral o pulsa: `Ctrl+Opt+D` / `Ctrl+Alt+D`.

Para adaptar el aspecto al aspecto de tu ordenador, selecciona la opción *System* (Sistema). De esta manera, el aspecto de Datadog se adaptará automáticamente al tema que hayas definido en el sistema operativo.

## Conectarse a GitHub

Si has instalado la [integración con GitHub][9] para crear eventos en Datadog, vincula tu cuenta personal de GitHub a tu cuenta de usuario de Datadog. Una vez que las cuentas estén vinculadas, cualquier comentario que publiques en los eventos de GitHub a través de Datadog se publicarán de forma automática en el tema o solicitud pull correspondiente en GitHub.

## Deshabilitar la cuenta de tu organización

Para deshabilitar la cuenta de tu organización de Datadog, ponte en contacto con el [equipo de asistencia de Datadog][10].

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