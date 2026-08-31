---
aliases:
- /es/guides/billing
- /es/account_management/settings
cascade:
  algolia:
    rank: 70
description: Administra tu cuenta de Datadog y organización
further_reading:
- link: https://www.datadoghq.com/blog/volkswagen-organizations/
  tag: Blog
  text: Mejores prácticas para gestionar organizaciones de Datadog a gran escala
title: Gestión de cuentas
---
{{< site-region region="gov,gov2" >}}
<div class="alert alert-danger">La plataforma Datadog para Gobierno solo admite autenticación SAML o básica utilizando un nombre de usuario/correo electrónico y contraseña. Antes de configurar la autenticación SAML, asegúrate de que al menos una cuenta de nombre de usuario/correo electrónico y contraseña esté establecida para mantener el acceso durante el proceso de configuración. Datadog recomienda habilitar la autenticación de múltiples factores (MFA) para cuentas basadas en contraseña.

Si necesitas habilitar SAML para una cuenta de prueba, contacta a <a href="https://docs.datadoghq.com/getting_started/support/">Soporte de Datadog</a>.</div>

{{< /site-region >}}

## Ajustes personales {#personal-settings}

Las páginas de ajustes personales en Datadog te permiten controlar cómo apareces ante otros en tu organización, cambiar o dejar organizaciones, y gestionar tus preferencias de notificación.

### Perfil {#profile}

Tu perfil es cómo te reconocen los demás en tu organización dentro de Datadog. Establece o actualiza tu nombre, dirección de correo electrónico y título desde la pestaña [Perfil][11] dentro de la {{< ui >}}Personal Settings{{< /ui >}} página.

Para actualizar tu foto, crea una cuenta en [Gravatar][1] y asóciala con tu dirección de correo electrónico.

Si inicias sesión en Datadog utilizando la autenticación de Google, tu dirección de correo electrónico es proporcionada por tu cuenta de Google y es **no** editable dentro de Datadog. Para cambiar tu dirección de correo electrónico en Google, consulta la [documentación de Google][2].

### Preferencias {#preferences}

{{% site-region region="us,us3,us5,eu,ap1,ap2" %}}
Puedes gestionar tu zona horaria, formato de hora, preferencia de accesibilidad visual y suscripciones de correo electrónico desde la pestaña [Preferencias][3] dentro de la página {{< ui >}}Personal Settings{{< /ui >}}.

#### Suscripciones de correo electrónico {#email-subscriptions}

Bajo suscripciones de correo electrónico, tienes acceso a los siguientes informes:
{{< site-region region="us3,us5,gov,gov2,ap1,ap2" >}}
<div class="alert alert-danger">Los resúmenes de correo electrónico no están disponibles en el sitio seleccionado ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

* Resumen diario
* Resumen semanal

Si no estás seguro de que un resumen de correo electrónico sea relevante para ti, puedes ver un ejemplo haciendo clic en el enlace {{< ui >}}Example{{< /ui >}} junto a cada suscripción de correo electrónico. También puedes usar el botón {{< ui >}}Unsubscribe From All{{< /ui >}} para darte de baja de todas las suscripciones de correo electrónico.
{{% /site-region %}}


{{% site-region region="gov,gov2" %}}
Puedes gestionar tu zona horaria, formato de hora y preferencia de accesibilidad visual desde la pestaña [**Preferencias**][3] dentro de la página {{< ui >}}Personal Settings{{< /ui >}}.
{{% /site-region %}}

#### Formato de hora {#time-format}

Elija si las horas se muestran en formato de 12 horas o 24 horas en Datadog (por ejemplo, "2:30 pm" o "14:30"). Las cuentas nuevas tienen como formato predeterminado el de 12 horas. Los gráficos y ciertos datos tabulares se muestran en formato de 24 horas en todo momento.

#### Accesibilidad visual {#visual-accessibility}

La preferencia de accesibilidad visual tiene cinco configuraciones diferentes para abordar la deficiencia de visión de color, baja agudeza visual y sensibilidad a colores brillantes. Si optas por una configuración de color accesible, Datadog traduce todos los gráficos que utilizan la paleta de colores clásica a un conjunto de colores accesibles adaptados a tus necesidades visuales.

**Nota**: Tu preferencia de accesibilidad visual se guarda localmente en tu navegador. Si usas otro navegador o borras tu caché, la preferencia se restablece a la configuración predeterminada.

### Organizaciones {#organizations}

La pestaña [Organizaciones][12] en {{< ui >}}Personal Settings{{< /ui >}} enumera todas las organizaciones con las que estás asociado. Cambia entre estas organizaciones desde esta página o pasando el cursor sobre el menú de cuenta en la navegación del lado izquierdo.

Si sales de una organización, no podrás volver a unirte a menos que un administrador de esa organización te invite.

Para unirte a una organización existente, debes ser invitado por un administrador. Después de ser invitado, recibirás un correo electrónico con el asunto "Has sido invitado a unirte a \<Nombre de la Organización>". Haz clic en el botón {{< ui >}}Join Account{{< /ui >}} en el correo electrónico.

Si es un administrador de la organización, consulte la documentación adicional para:

* [Administrar usuarios en tu organización][4]
* [Configurar inicio de sesión único con SAML][5]
* [Renombrar tu organización][6]
* [Administrar cuentas de múltiples organizaciones][7]
* [Cambiar tu plan de Datadog y ver el historial de uso y facturación][8]
* [Elegir la topología de tu organización (una organización vs. múltiples organizaciones)][15]

### Seguridad {#security}

#### Claves de aplicación {#application-keys}

La [pestaña de Claves de Aplicación][13] en {{< ui >}}Personal Settings{{< /ui >}} le permite gestionar tus claves de aplicación. Para copiar una clave, pasa el cursor sobre ella hasta que aparezca el ícono {{< ui >}}Copy Key{{< /ui >}} a la derecha y haz clic en él. También puedes hacer clic en una clave específica para editar su nombre, ver cuándo fue creada, ver el perfil del propietario de la clave, copiarla o revocarla.

#### Aplicaciones {#apps}

La [pestaña de Aplicaciones][14] en {{< ui >}}Personal Settings{{< /ui >}} le permite gestionar las aplicaciones que han sido instaladas o creadas por miembros de tu organización. Puedes filtrar las aplicaciones usando una cadena de búsqueda, o elegir ver solo las aplicaciones habilitadas o deshabilitadas mediante casillas de verificación.

Cuando pases el cursor sobre una aplicación, la opción para habilitar o deshabilitarla aparece a la derecha de la lista de aplicaciones.

#### Verificación de correo electrónico {#email-verification}
Verifica tu dirección de correo electrónico para mejorar la seguridad de tu cuenta y acceder a funciones adicionales de gestión. Los usuarios verificados tienen un mayor control sobre la seguridad de su cuenta y pueden ver todas las organizaciones a las que pertenecen.

- **Los usuarios de inicio de sesión de Google** son verificados automáticamente durante su primer inicio de sesión.
- **Los usuarios basados en contraseña** verifican su correo electrónico al establecer su contraseña por primera vez.
- **Los usuarios de SAML** deben verificar manualmente su correo electrónico a través de Datadog.

Después de ser verificado, obtiene acceso a:
- La capacidad de **cerrar sesión en todas las sesiones web activas** en todos tus dispositivos, asegurando la seguridad en caso de compromiso de credenciales.
- La capacidad de **ver y cambiar entre organizaciones** fuera de la jerarquía actual de tu organización.

Los usuarios no verificados aún pueden acceder a Datadog, pero solo pueden ver las organizaciones dentro de tu jerarquía y no pueden revocar sesiones activas.

#### Verifica tu correo electrónico{#verify-your-email}

Para verificar tu correo electrónico:
1. Navega a tu {{< ui >}}Profile Settings{{< /ui >}}.
2. Haz clic en {{< ui >}}Verify Account{{< /ui >}}.
3. Ingresa el **código de verificación** enviado a tu correo electrónico registrado.
Haz clic en {{< ui >}}Submit{{< /ui >}} para completar el proceso de verificación.

#### Cierra sesión en todas las sesiones web activas {#log-out-of-all-active-web-sessions}

Para cerrar sesión en todas las sesiones web activas:
Cerrar sesión en todas las sesiones web activas cierra tu sesión en todas las sesiones actuales en todos tus dispositivos, incluido el que estás usando.


Para cerrar sesión en todas las sesiones activas:
1. Ve a {{< ui >}}Personal Settings{{< /ui >}}.
2. Haz clic en {{< ui >}}Log Out of All Web Sessions{{< /ui >}}.
3. Confirma la acción.

Después de confirmar, se cerrará tu sesión en todos los dispositivos y necesitarás iniciar sesión nuevamente.

## Apariencia {#appearance}

Mira Datadog en modo oscuro al pasar el cursor sobre tu avatar en la barra lateral, o presionando `Ctrl+Opt+D` / `Ctrl+Alt+D`.

Para adaptarte a la configuración de apariencia de tu computadora, selecciona la opción {{< ui >}}System{{< /ui >}}. Esto hace que la apariencia de Datadog se adapte automáticamente al tema que has establecido a nivel de sistema operativo.

## Conectando a GitHub {#connecting-to-github}

Si has instalado la [integración de GitHub][9] para crear eventos en Datadog, vincula tu cuenta personal de GitHub a tu cuenta de usuario de Datadog. Al vincular tus cuentas, cualquier comentario que publiques en eventos de GitHub en Datadog se publicará automáticamente en el issue o pull request correspondiente en GitHub.

## Deshabilitando la cuenta de su organización {#disabling-your-organizations-account}

Para deshabilitar la cuenta de tu organización en Datadog, comunícate con [soporte de Datadog][10].

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
[15]: /es/getting_started/organization_topology/