---
app_id: microsoft-teams
app_uuid: b37c5433-6bdd-4f37-9f7e-a60d61032c33
assets:
  integration:
    auto_install: false
    events:
      creates_events: false
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 203
    source_type_name: Microsoft Teams
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- colaboración
- network
- notificaciones
custom_kind: integración
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: microsoft_teams
integration_id: microsoft-teams
integration_title: Microsoft Teams
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: microsoft_teams
public_title: Microsoft Teams
short_description: Microsoft Teams es el espacio de trabajo de Office 365 basado en
  chat que integra personas, contenidos y herramientas.
supported_os: []
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Collaboration
  - Category::Network
  - Category::Notifications
  - Offering::Integration
  configuration: README.md#Configuración
  description: Microsoft Teams es el espacio de trabajo de Office 365 basado en chat
    que integra personas, contenidos y herramientas.
  media: []
  overview: README.md#Información general
  support: README.md#Soporte
  title: Microsoft Teams
---

<!--  EXTRAÍDO DE https://github.com/DataDog/integrations-internal-core -->
## Información general

Integración con Microsoft Teams para:


{{< site-region region="us,us3,us5,eu,ap1" >}}

- Recibir notificaciones de alertas en Datadog y eventos en Microsoft Teams.
- Gestionar las incidencias desde Microsoft Teams.
- Silenciar los monitores activados directamente desde Microsoft Teams.
{{< /site-region >}}


{{< site-region region="gov" >}}
- Recibir notificaciones de alertas en Datadog y eventos en Microsoft Teams.
- Silenciar los monitores activados directamente desde Microsoft Teams.
{{< /site-region >}}



{{< site-region region="gov" >}}
**Nota**: Aunque tu cuenta de Datadog esté alojada en el entorno seguro US1-FED, es tu responsabilidad gestionar la seguridad de tu entorno Microsoft Teams, incluyendo el acceso, los permisos y la protección de los datos.
{{< /site-region >}}


## Configuración

{{< tabs >}}

{{% tab "Datadog App (Recommended)" %}}

### Enviar notificaciones de monitor a un canal de Microsoft Teams

Conecta tu inquilino de Microsoft a Datadog.

1. En Datadog, ve a [**Integrations > Microsoft Teams** (Integraciones > Microsoft Teams)][1].
2. Haz clic en **Add Tenant** (Agregar inquilino), que te redirigirá a Microsoft.
3. Sigue las instrucciones y haz clic en **OK** (Aceptar).


Teams{{< site-region region="us,us3,us5,eu,ap1" >}}
Asegúrate de haber añadido la aplicación Datadog a todos los Teams en los que desees recibir notificaciones de Datadog.
{{< /site-region >}}


{{< site-region region="gov" >}}
Asegúrate de haber añadido la aplicación Datadog for Government a todos los Teams en los que desees recibir notificaciones de Datadog.
{{< /site-region >}}



{{< site-region region="us,us3,us5,eu,ap1" >}}

1. Abre Microsoft Teams.
2. En la barra de herramientas vertical, haz clic en **Apps** (Aplicaciones).
3. Busca "Datadog" y haz clic en **Open** (Abrir).
4. En el modal que se abre, selecciona el canal principal del equipo donde debe añadirse la aplicación. Haz clic en **Go** (Listo) para completar la instalación.
   {{< /site-region >}}



{{< site-region region="gov" >}}

1. Abre Microsoft Teams.
2. En la barra de herramientas vertical, haz clic en **Apps** (Aplicaciones).
3. Busca "Datadog para el Gobierno" y haz clic en **Open** (Abrir).
4. En el modal que se abre, selecciona el canal principal del equipo donde debe añadirse la aplicación. Haz clic en **Go** (Listo) para completar la instalación.
   {{< /site-region >}}



{{< site-region region="us,us3,us5,eu,ap1" >}}
{{< img src="integrations/microsoft_teams/microsoft_teams_add_app_to_team.png" alt="Microsoft Teams añade la aplicación a Teams" >}}
{{< /site-region >}}


{{< site-region region="gov" >}}
{{< img src="integrations/microsoft_teams/microsoft_teams_add_gov_app_to_team.png" alt="Microsoft Teams añade la aplicación a Teams" >}}
{{< /site-region >}}


Una vez que el bot se haya añadido al equipo, configura el gestor de notificaciones en Datadog.

1. En un inquilino configurado, haz clic en **Add Handle** (Añadir gestor). Asigna un nombre al gestor, selecciona el equipo y el canal en los menús desplegables y haz clic en **Save** (Guardar).

### Migrar los conectores de legacy a la integración basada en inquilinos

Microsoft ha anunciado que los conectores de Office 365 para Microsoft Teams quedan obsoletos. Esto tiene los siguientes efectos:

- Todos los conectores de Datadog dejarán de funcionar el 31 de enero de 2025.
- Los conectores de webhooks entrantes sin [URL actualizadas][2] dejarán de funcionar el 31 de enero de 2025.
- Todos los conectores dejarán de funcionar el 31 de diciembre de 2025 (previamente era el 1 de octubre de 2024).

Para obtener más información, consulta la [entrada de blog][3] de Microsoft.

Para migrar todos los gestores de notificaciones que utilizan actualmente los conectores de Office 365 legacy a integraciones Datadog basadas en inquilinos:


{{< site-region region="us,us3,us5,eu,ap1" >}}

1. Sigue los [pasos de configuración](#setup) para conectar tu inquilino de Microsoft a Datadog.
2. Añade la aplicación Datadog a todos los equipos en los que tengas configurado un conector legacy de Office 365.
3. Para cada gestión de conector de notificación heredada en el [Ícono de integración de Microsoft Teams ][861]:
   1. En el inquilino configurado, haz clic en **Add Handle** (Añadir gestor).
   2. Asigna al nuevo gestor el mismo nombre que el gestor del conector. Por ejemplo, si el gestor del conector legacy se llama `channel-123`, crea un nuevo gestor en la configuración del inquilino con el nombre `channel-123`.
   3. Selecciona el equipo y el canal elegidos en los menús desplegables a los que el gestor del conector legacy enviaba el mensaje y haz clic en **Save** (Guardar). Este nuevo gestor anula el gestor del conector legacy existente.

[861]: https://app.datadoghq.com/integrations/microsoft-teams

{{< /site-region >}}



{{< site-region region="gov" >}}

1. Sigue los [pasos de configuración](#setup) para conectar tu inquilino de Microsoft a Datadog.
2. Añade la aplicación Datadog para el Gobierno a todos los equipos en los que tengas configurado un conector legacy de Office 365.
3. Para cada gestión de conector de notificación heredada en el [Ícono de integración de Microsoft Teams][871]:
   1. En el inquilino configurado, haz clic en **Add Handle** (Añadir gestor).
   2. Asigna al nuevo gestor el mismo nombre que el gestor del conector. Por ejemplo, si el gestor del conector legacy se llama `channel-123`, crea un nuevo gestor en la configuración del inquilino con el nombre `channel-123`.
   3. Selecciona el equipo y el canal elegidos en los menús desplegables a los que el gestor del conector legacy enviaba el mensaje y haz clic en **Save** (Guardar). Este nuevo gestor anula el gestor del conector legacy existente.

[871]: https://app.datadoghq.com/integrations/microsoft-teams

{{< /site-region >}}


### Utilización

Desde un monitor de Datadog, envía una notificación a Microsoft Teams utilizando la función [`@-notification` ][4]. Envía la notificación a la dirección `@teams-<HANDLE>`, sustituyendo `<HANDLE>` por el nombre de tu administrador de Microsoft Teams. Para silenciar un monitor activado desde Microsoft Teams, haz clic en **Silenciar monitor**, selecciona una **Duración del silencio** y haz clic en **Silenciar**.

#### Menciones de usuarios

Las menciones de usuarios te permiten notificar a usuarios específicos de tus canales de Microsoft Teams cuando se activan las alertas de monitor. Esto ayuda a garantizar que se notifiquen los eventos importantes a las personas adecuadas. Para mencionar a un usuario específico, sigue los pasos que se indican a continuación para encontrar su nombre principal de usuario (UPN).

**Sintaxis**: `<at>{User Principal Name}</at>`

**Ejemplo**: `<at>user@microsoft.com</at>`

**Ejemplo de notificación completa**: `@Teams-CHANNEL_NAME <at>user@microsoft.com</at> <at>another.user@microsoft.com</at>`

**Para encontrar el nombre de usuario principal (UPN) de un usuario:**

1. **Método 1 (sólo funciona si el UPN coincide con el correo electrónico):**
   - En Microsoft Teams, haz clic en la foto de perfil o en el nombre del usuario para abrir su tarjeta de contacto.
   - El correo electrónico que aparece en el campo `Chat` suele ser el UPN. Si difieren, utiliza el método 2 a continuación.

2. **Método 2 (funciona siempre, pero requiere permisos de Azure Portal):**
   - Inicia sesión en el [Microsoft Azure Portal][5].
   - Ve a `Microsoft Entra ID` > `Manage` > `Users`.
   - Localiza al usuario en la lista y copia su UPN de la columna `User principal name`.

Datadog recomienda hacer un test de tus notificaciones de monitor para garantizar una entrega fiable. Consulta [test de notificaciones][6] para obtener instrucciones.

#### Dashboards

Puedes publicar snapshots de widgets de dashboard en cualquier equipo o chat. Para consultar la lista de los widgets admitidos, consulta [Informes programados][7].

Para compartir un widget de dashboard en Teams:

1. En Datadog, pasa el ratón por encima del widget de dashboard y pulsa `CMD + C` o `CTRL + C`, o haz clic en el botón **Copy** (Copiar) del menú compartir.
2. Pega el enlace en Teams.


{{< site-region region="us,us3,us5,eu,ap1" >}}
{{< img src="integrations/microsoft_teams/dashboard_share.png" alt="Compartir un widget de dashboard en Microsoft Teams">}}
{{< /site-region >}}



{{< site-region region="gov" >}}
{{< img src="integrations/microsoft_teams/dashboard_share_gov.png" alt="Compartir un widget de dashboard en Microsoft Teams">}}
{{< /site-region >}}


### Limitar el acceso de edición

Por defecto, todos los usuarios tienen acceso completo a los inquilinos de Microsoft Teams conectados.

Utiliza [Control de acceso granular][8] para limitar los roles que pueden editar un inquilino específico:

1. Mientras visualizas un inquilino, haz clic en el icono de engranaje de la esquina superior derecha para abrir el menú de configuración.
2. Selecciona **Permissions** (Permisos).
3. Haz clic en **Restrict Access** (Acceso restringido). El cuadro de diálogo se actualiza para mostrar que los miembros de tu organización tienen acceso de **Visor** por defecto.
4. Utiliza el desplegable para seleccionar uno o varios roles, equipos o usuarios que pueden editar el inquilino de Microsoft Teams.
5. Haz clic en **Add** (Añadir). El cuadro de diálogo se actualiza para mostrar que el rol seleccionado tiene el permiso de **Editor**.
6. Haz clic en **Save** (Guardar).

**Nota:** Para conservar tu acceso de edición al inquilino, debes incluir al menos un rol al que pertenezcas antes de guardar.

Si tienes acceso de edición, puedes restablecer el acceso general a un inquilino restringido siguiendo estos pasos:

1. Mientras visualizas el inquilino, haz clic en el icono de engranaje de la esquina superior derecha para abrir el menú de configuración.
2. Selecciona **Permissions** (Permisos).
3. Haz clic en **Restore Full Access** (Restablecer acceso completo).
4. Haz clic en **Save** (Guardar).

Para editar los permisos de los inquilinos a través de la API:

1. Ve al [Ícono de integración de Microsoft Teams ][4].
2. Haz clic en la pestaña **Inquilinos**.
3. Copia el ID de inquilino mostrado para el inquilino seleccionado.
4. Utiliza la [API de políticas de restricción][9], donde el tipo de recurso es `integration-account` y el id es `microsoft-Teams:<tenant_id>`.


[1]: https://docs.datadoghq.com/es/monitors/notifications/#notification
[2]: https://learn.microsoft.com/en-us/microsoftteams/m365-custom-connectors#update-connectors-url
[3]: https://devblogs.microsoft.com/microsoft365dev/retirement-of-office-365-connectors-within-microsoft-teams/
[4]: https://app.datadoghq.com/integrations/microsoft-teams
[5]: https://portal.azure.com
[6]: https://docs.datadoghq.com/es/monitors/notify/#test-notifications
[7]: https://docs.datadoghq.com/es/dashboards/scheduled_reports/
[8]: https://docs.datadoghq.com/es/account_management/rbac/granular_access/
[9]: https://docs.datadoghq.com/es/api/latest/restriction-policies/
{{% /tab %}}

{{% tab "Microsoft Workflows Webhooks" %}}

### ¿Qué son los webhooks de Microsoft Workflows?

Workflows / Power Automate es un producto de Microsoft para crear flujos de trabajo automatizados. Microsoft Workflows puede utilizarse para enviar notificaciones con webhooks entrantes. Si no puedes instalar la aplicación Datadog en tu inquilino de Microsoft Teams (recomendado) o si quieres enviar notificaciones a canales privados, puedes configurar gestores Datadog para enviar notificaciones a canales de Microsoft Teams a través de Microsoft Workflows. Esta integración está pensada para su uso con la siguiente plantilla de Microsoft Workflows: [Publicar en un canal cuando se recibe una solicitud de webhook][1]

{{< img src="integrations/microsoft_teams/microsoft_teams_workflows_template.png" alt="Plantilla: Publicar en un canal cuando se recibe una solicitud de webhook" style="width:30%;" >}}

### ¿Estás migrando conectores legacy a la integración de webhooks de Microsoft Workflows?

Microsoft [ha anunciado][2] que los conectores de Office 365 para Microsoft Teams quedan obsoletos y las URL de los conectores existentes dejarán de funcionar el 31 de enero de 2025. Microsoft promueve el uso de webhooks entrantes de Microsoft Workflows como sustituto de los conectores legacy. Sigue los pasos que se indican a continuación para migrar todos los gestores de notificaciones que utilizan actualmente conectores de Office 365 legacy a la integración de webhooks de Microsoft Workflows de Datadog.

Para cada gestor de un conector de notificaciones legacy en el cuadro de la integración Microsoft Teams:

1. Sigue los [pasos de configuración](#create-a-microsoft-workflows-webhook) para crear un gestor de webhook de flujo de trabajo para el canal de Microsoft Teams elegido.
2. En la sección Webhooks de Microsoft Workflows, asigna al nuevo gestor el mismo nombre que el gestor del conector al que debe sustituir. Por ejemplo, si el gestor del conector legacy se denomina `channel-123`, asigna el nombre `channel-123` a su nuevo gestor en la sección Webhooks de Microsoft Workflows. Este nuevo gestor sustituye al gestor de conector legacy existente.

### Crear un webhook de Microsoft Workflows

#### Requisitos previos

- Para crear un nuevo flujo de trabajo, se requiere una cuenta Microsoft, tanto para la propiedad del flujo de trabajo como para enviar notificaciones a los canales (no es necesario que sean de la misma cuenta Microsoft).
- La cuenta propietaria del flujo de trabajo (configurada en el paso 2 a continuación) es la cuenta que puede editar y renovar el flujo de trabajo. Para facilitar el acceso compartido, utiliza una cuenta de servicio.
- La cuenta que envía notificaciones a los canales (configurada en el paso 8 a continuación) realiza publicaciones como usuario de la cuenta. Esta cuenta debe formar parte del equipo al que quieres enviar notificaciones. Si envías notificaciones a un canal privado, esta cuenta también debe ser añadida al canal. Si quieres darle a esta cuenta un nombre como "Notificaciones Datadog" utiliza una cuenta de servicio.

#### Instrucciones

**Nota:** La mayoría de estos pasos están en Microsoft Workflows. Dado que Microsoft realiza cambios en Workflows, es posible que los siguientes pasos no reflejen los cambios más recientes.

1. En Microsoft Teams, añade la [aplicación Workflows][3] a todos los equipos a los que quieres enviar notificaciones. Si no puedes añadir la aplicación a tu equipo, sigue las instrucciones de la sección "Canales privados".
   {{< img src="integrations/microsoft_teams/microsoft_teams_workflows_step_1.png" alt="Instrucciones, paso 1" style="width:90%;" >}}
2. Crea un nuevo flujo de trabajo en Power Automate a partir de la plantilla [Publicar en un canal cuando se reciba una solicitud de webhook][1] de Microsoft.
3. Elige la cuenta Microsoft que quieres utilizar para ser propietario del flujo de trabajo (utiliza una cuenta de servicio para facilitar el acceso compartido) y luego haz clic en **Continue** (Continuar).
   {{< img src="integrations/microsoft_teams/microsoft_teams_workflows_step_3.png" alt="Instrucciones, paso 3" style="width:90%;" >}}
4. Haz clic en **Edit in advanced mode** (Editar en modo avanzado).
   {{< img src="integrations/microsoft_teams/microsoft_teams_workflows_step_4.png" alt="Instrucciones, paso 4" style="width:90%;" >}}
5. Amplía **Enviar cada tarjeta adaptable** y luego haz clic en **Post card in a chat or channel** (Publicar tarjeta en un chat o canal).
   {{< img src="integrations/microsoft_teams/microsoft_teams_workflows_template_dropdown_step_5.png" alt="Instrucciones, paso 5" style="width:90%;" >}}
6. Utiliza el desplegable **Post As** (Publicar como) para definir **Post as** (Publicar como) en **Flow bot** (Bot de flujo). Las notificaciones aparecerán como enviadas por "`<NAME>` vía Workflows". Para recibir estas notificaciones, la aplicación Workflows debe añadirse al equipo elegido. Si se envían notificaciones a un canal privado, **Post As** (Publicar como) debe definirse en un usuario del canal. Para obtener más información, consulta la sección "Canales privados" a continuación. **Nota:** Al cambiar **Post as** (Publicar como) se restablecerá el campo **Post in** (Publicar en).
   {{< img src="integrations/microsoft_teams/microsoft_teams_workflows_step_6.png" alt="Instrucciones, paso 6" style="width:90%;" >}}
7. Para acceder a los desplegables de equipos y canales, elimina los símbolos @ borrándolos o haciendo clic en los iconos **X**.
   {{< img src="integrations/microsoft_teams/microsoft_teams_workflows_step_7.png" alt="Instrucciones, paso 7" style="width:90%;" >}}
8. Utiliza los desplegables para seleccionar el equipo y el canal.
   {{< img src="integrations/microsoft_teams/microsoft_teams_workflows_step_8.png" alt="Instrucciones, paso 8" style="width:90%;" >}}
9. Asegúrate de que el flujo de trabajo está conectado a la cuenta de Microsoft prevista para el envío de notificaciones (por ejemplo, una cuenta de servicio denominada "Notificaciones de Datadog"). Las notificaciones aparecerán como enviadas por "`<NAME>` a través de Workflows". Esta cuenta debe tener acceso al canal de Microsoft Teams configurado. Para cambiar la cuenta, haz clic en **Change connection** (Cambiar connection) y sigue las instrucciones para configurar otra cuenta de Microsoft.
   {{< img src="integrations/microsoft_teams/microsoft_teams_workflows_step_9.png" alt="Instrucciones, paso 9" style="width:90%;" >}}
10. Pulsa el botón **Save** (Guardar).
    {{< img src="integrations/microsoft_teams/microsoft_teams_workflows_step_10.png" alt="Instrucciones, paso 10" style="width:90%;" >}}
11. Para encontrar el enlace de tu webhook, haz clic en el primer bloque del flujo de trabajo.
    {{< img src="integrations/microsoft_teams/microsoft_teams_workflows_step_11.png" alt="Instrucciones, paso 11" style="width:50%;" >}}
12. Asegúrate de que **cualquiera** pueda activar el flujo y luego copia el enlace.
    {{< img src="integrations/microsoft_teams/microsoft_teams_workflows_step_12.png" alt="Instrucciones, paso 12" style="width:90%;" >}}
13. Haz clic en el botón **Back** (Volver) para ir al dashboard del flujo de trabajo.
    {{< img src="integrations/microsoft_teams/microsoft_teams_workflows_step_13.png" alt="Instrucciones, paso 13" style="width:90%;" >}}
14. Comprueba que el flujo de trabajo está activado en el dashboard. Si está desactivado, haz clic en el botón "Turn on" (Activar).
    {{< img src="integrations/microsoft_teams/microsoft_teams_workflows_step_14.png" alt="Instrucciones, paso 14" style="width:90%;" >}}
15. En Datadog, ve a [**Integrations > Microsoft Teams** (Integraciones > Microsoft Teams)][4].
16. En la pestaña Configuración, ve a la sección Webhooks de Microsoft Workflows y haz clic en **Add Handle** (Añadir gestor). Colócale un nombre al gestor (si estás migrando desde un gestor de conector legacy, utiliza el mismo nombre del gestor de conector correspondiente) y pega la URL del webhook.
17. Haz clic en **Save** (Guardar).

### Canales privados

Para enviar notificaciones a canales privados, la cuenta configurada dentro del bloque **Publicar tarjeta en chat o canal** debe tener acceso al canal. Esto permite que el flujo de trabajo envíe notificaciones en nombre de esa cuenta de usuario.

1. Dentro del bloque **Publicar tarjeta en chat o canal**, cambia **Post as** (Publicar como) a **User** (Usuario).
   {{< img src="integrations/microsoft_teams/microsoft_teams_workflows_private_channels_step_1.png" alt="Instrucciones para canales privados, paso 1" style="width:30%;" >}}
2. A continuación, para elegir la cuenta, haz clic en **Change connection** (Cambiar conexión) y sigue las instrucciones para cambiar la cuenta.
   {{< img src="integrations/microsoft_teams/microsoft_teams_workflows_private_channels_step_2.png" alt="Instrucciones para canales privados, paso 2" style="width:90%;" >}}

### Limitaciones

- Si eres cliente de Microsoft 365, los flujos de trabajo se desactivarán automáticamente después de 90 días sin activaciones exitosas. Cuando un flujo de trabajo está a punto de caducar, Microsoft envía un correo electrónico a la cuenta a la que pertenece el flujo de trabajo. Este temporizador de 90 días se puede restablecer ejecutando un test dentro de Microsoft Workflows.
- Cuando se utiliza la plantilla, todos los mensajes se adjuntan con una línea de texto que indica quién ha creado el flujo de trabajo junto con un enlace a la plantilla.
  {{< img src="integrations/microsoft_teams/microsoft_teams_workflows_used_a_template.png" alt="Usuario utilizado como plantilla" style="width:90%;" >}}

  Para eliminar esto, ve a tu flujo de trabajo y haz clic en **Save As** (Guardar como) para hacer una copia, ve hasta la copia buscándola dentro de **Mis Flujos** y utiliza el nuevo webhook del flujo de trabajo copiado en lugar del flujo de trabajo original.

- Microsoft Workflows no admite funciones interactivas para los mensajes que publica (como silenciar monitores directamente desde Microsoft Teams).
- Microsoft Workflows no admite canales compartidos.
- Microsoft Workflows no admite menciones de usuarios cuando se publica un webhook de Workflows como usuario.

### Utilización

Desde un monitor Datadog, envía una notificación a Microsoft Teams utilizando la [función `@-notification`][1]. Envía la notificación a la dirección `@teams-<HANDLE>`, sustituyendo `<HANDLE>` por el nombre de tu gestor de Microsoft Teams.

#### Menciones de usuarios con identificadores de webhooks de Microsoft Workflows

Las menciones de usuarios te permiten notificar a usuarios específicos de tus canales de Microsoft Teams cuando se activan las alertas de monitor. Esto ayuda a garantizar que se notifiquen los eventos importantes a las personas adecuadas. Para mencionar a un usuario específico, sigue los pasos que se indican a continuación para encontrar su nombre principal de usuario (UPN).

**Sintaxis**: `<at>{User Principal Name}</at>`

**Ejemplo**: `<at>user@microsoft.com</at>`

**Ejemplo de notificación completa**: `@Teams-CHANNEL_NAME <at>user@microsoft.com</at> <at>another.user@microsoft.com</at>`

**Para encontrar el nombre de usuario principal (UPN) de un usuario:**

1. **Método 1 (sólo funciona si el UPN coincide con el correo electrónico):**
   - En Microsoft Teams, haz clic en la foto de perfil o en el nombre del usuario para abrir su tarjeta de contacto.
   - El correo electrónico que aparece en el campo `Chat` suele ser el UPN. Si difieren, utiliza el método 2 a continuación.

2. **Método 2 (funciona siempre, pero requiere permisos de Azure Portal):**
   - Inicia sesión en el [Microsoft Azure Portal][5].
   - Ve a `Microsoft Entra ID` > `Manage` > `Users`.
   - Localiza al usuario en la lista y copia su UPN de la columna `User principal name`.

<div class="alert alert-danger">Las menciones de usuarios NO son compatibles con los identificadores de webhooks de Workflows publicados como usuario (para canales privados). Incluir una mención de usuario al publicar un webhook de Workflows como usuario fallará. Para incluir menciones de usuarios utilizando webhooks de Workflows debes utilizar el Flow Bot.</div>

Datadog recomienda probar tus notificaciones de monitor para garantizar una entrega fiable. Para obtener instrucciones, consulta [Probar notificaciones][6].

### Limitar el acceso de edición

Por defecto, todos los usuarios tienen acceso completo a cada identificador de webhook de Microsoft Workflows.

Utiliza el [control de acceso granular][7] para limitar los roles que pueden editar un identificador de webhook de Workflows específico:

1. Mientras visualizas los **webhooks de Workflows**, pasa el ratón sobre un identificador restringido para revelar las acciones en el lado derecho de la fila.
2. Haz clic en el icono del candado con la etiqueta **Permisos**.
3. Haz clic en **Restrict Access** (Acceso restringido). El cuadro de diálogo se actualiza para mostrar que los miembros de tu organización tienen acceso de **Visor** por defecto.
4. Utiliza el desplegable para seleccionar uno o varios roles, equipos o usuarios que pueden editar el identificador de webhook de Workflows.
5. Haz clic en **Add** (Añadir). El cuadro de diálogo se actualiza para mostrar que el rol seleccionado tiene el permiso de **Editor**.
6. Haz clic en **Save** (Guardar).

**Nota:** Para conservar tu acceso de edición al identificador de webhook de Workflows, debes incluir al menos un rol al que pertenezcas antes de guardar.

Si tienes acceso de edición, puedes restablecer el acceso general a un identificador de webhook de Workflows restringido siguiendo estos pasos:

1. Mientras visualizas los **webhooks de Workflows**, pasa el ratón sobre el identificador restringido para revelar las acciones en el lado derecho de la fila.
2. Haz clic en el icono del candado con la etiqueta **Permisos**.
3. Haz clic en **Restore Full Access** (Restablecer acceso completo).
4. Haz clic en **Save** (Guardar).

Para editar permisos de webhooks de Workflows a través de la API:

1. Obtén los ID de webhooks de Workflows utilizando la [API de la integración Microsoft Teams ][8].
2. Utiliza la [API de políticas de restricción][9], donde el tipo de recurso es `integration-webhook` y el ID es `microsoft-teams:<workflows_webhook_id>`.


[1]: https://make.preview.powerautomate.com/galleries/public/templates/d271a6f01c2545a28348d8f2cddf4c8f/post-to-a-channel-when-a-webhook-request-is-received
[2]: https://devblogs.microsoft.com/microsoft365dev/retirement-of-office-365-connectors-within-microsoft-teams/
[3]: https://teams.microsoft.com/l/app/c3a1996d-db0f-4857-a6ea-7aabf0266b00?source=app-details-dialog
[4]: https://app.datadoghq.com/integrations/microsoft-teams
[5]: https://portal.azure.com
[6]: https://docs.datadoghq.com/es/monitors/notify/#test-notifications
[7]: https://docs.datadoghq.com/es/account_management/rbac/granular_access/
[8]: https://docs.datadoghq.com/es/api/latest/microsoft-teams-integration/#get-all-workflows-webhook-handles
[9]: https://docs.datadoghq.com/es/api/latest/restriction-policies/
{{% /tab %}}

{{% tab "Conectores (obsoletos)" %}}

### Migrar los conectores de legacy a la integración basada en inquilinos

Microsoft ha anunciado que los conectores de Office 365 para Microsoft Teams quedan obsoletos. Esto tiene los siguientes efectos:

- Todos los conectores de Datadog dejarán de funcionar el 31 de enero de 2025.
- Los conectores de webhooks entrantes sin [URL actualizadas][1] dejarán de funcionar el 31 de enero de 2025.
- Todos los conectores dejarán de funcionar el 31 de diciembre de 2025 (previamente era el 1 de octubre de 2024).

Para obtener más información, consulta la [entrada de blog][2] de Microsoft.

Para migrar todos los gestores de notificaciones que utilizan actualmente los conectores de Office 365 legacy a la integración de Datadog basada en inquilinos:


{{< site-region region="us,us3,us5,eu,ap1" >}}

1. Sigue los [pasos de configuración][992] para conectar tu inquilino de Microsoft a Datadog.
2. Añade la aplicación Datadog a todos los equipos en los que tengas configurado un conector legacy de Office 365.
3. Para cada gestor de conector de notificación heredada en el [Ícono de integración de Microsoft Teams ][991]:
   1. En el inquilino configurado, haz clic en **Add Handle** (Añadir gestor).
   2. Asigna al nuevo gestor el mismo nombre que el gestor del conector. Por ejemplo, si el gestor del conector legacy se llama `channel-123`, crea un nuevo gestor en la configuración del inquilino con el nombre `channel-123`.
   3. Selecciona el equipo y el canal elegidos en los menús desplegables a los que el gestor del conector legacy enviaba el mensaje y haz clic en **Save** (Guardar). Este nuevo gestor anula el gestor del conector legacy existente.

[991]: https://app.datadoghq.com/integrations/microsoft-teams
[992]: https://docs.datadoghq.com/es/integrations/microsoft_teams/?tab=datadogapprecommended#setup

{{< /site-region >}}



{{< site-region region="gov" >}}

1. Sigue los [pasos de configuración][982] para conectar tu inquilino de Microsoft a Datadog.
2. Añade la aplicación Datadog para el Gobierno a todos los equipos en los que tengas configurado un conector legacy de Office 365.
3. Para cada gestor de conector de notificación heredada en el [Ícono de integración de Microsoft Teams][981]:
   1. En el inquilino configurado, haz clic en **Add Handle** (Añadir gestor).
   2. Asigna al nuevo gestor el mismo nombre que el gestor del conector. Por ejemplo, si el gestor del conector legacy se llama `channel-123`, crea un nuevo gestor en la configuración del inquilino con el nombre `channel-123`.
   3. Selecciona el equipo y el canal elegidos en los menús desplegables a los que el gestor del conector legacy enviaba el mensaje y haz clic en **Save** (Guardar). Este nuevo gestor anula el gestor del conector legacy existente.

[981]: https://app.datadoghq.com/integrations/microsoft-teams
[982]: https://docs.datadoghq.com/es/integrations/microsoft_teams/?tab=datadogapprecommended#setup

{{< /site-region >}}


### Migrar conectores legacy a la integración de webhooks de Microsoft Workflows

Microsoft ha anunciado que los conectores de Office 365 para Microsoft Teams quedan obsoletos. Esto tiene los siguientes efectos:

- Todos los conectores de Datadog dejarán de funcionar el 31 de enero de 2025.
- Los conectores de webhooks entrantes sin [URL actualizadas][1] dejarán de funcionar el 31 de enero de 2025.
- Todos los conectores dejarán de funcionar el 31 de diciembre de 2025 (previamente era el 1 de octubre de 2024).

Para obtener más información, consulta la [entrada de blog][2] de Microsoft.

Para migrar todos los gestores de notificaciones que utilizan actualmente los conectores de Office 365 legacy a la integración de webhooks de Microsoft Workflows de Datadog, consulta [Webhooks de Microsoft Workflows][3].

### Configuración del conector (obsoleto)

<div class="alert alert-info">
Los gestores de notificaciones legacy no se ven afectados por la nueva configuración, <em>a menos</em> que utilices el mismo <code>@teams-HANDLE_NAME</code>, en cuyo caso la nueva configuración anula la configuración legacy.
</div>

1. Selecciona el botón `...` situado junto al nombre del canal en lista de canales y, a continuación, elige **Connectors** (Conectores).

   {{< img src="integrations/microsoft_teams/microsoft_team_step_1_v2.png" alt="Microsoft Teams, paso 1" >}}

2. Busca Datadog y haz clic en **Configure** (Configurar).

   {{< img src="integrations/microsoft_teams/microsoft_team_step_2_v2.png" alt="Microsoft Teams, paso 2" >}}

3. En el modal de configuración del conector, copia la URL del webhook.
4. En Datadog, ve a [**Integrations > Microsoft Teams** (Integraciones > Microsoft Teams)][4].
5. En la pestaña Configuration (Configuración), haz clic en **Add Handle** (Añadir gestor), dale un nombre y pega la URL del webhook.
6. En el modal de configuración del conector, haz clic en **Save** (Guardar).


[1]: https://learn.microsoft.com/en-us/microsoftteams/m365-custom-connectors#update-connectors-url
[2]: https://devblogs.microsoft.com/microsoft365dev/retirement-of-office-365-connectors-within-microsoft-teams/
[3]: https://docs.datadoghq.com/es/integrations/microsoft_teams/?tab=microsoftworkflowswebhooks#what-are-microsoft-workflows-webhooks
[4]: https://app.datadoghq.com/integrations/microsoft-teams
{{% /tab %}}
{{< /tabs >}}


{{< site-region region="us,us3,us5,eu,ap1" >}}

## Datadog Incident Management en Microsoft Teams

### Configuración de la cuenta

En primer lugar, instala la aplicación Datadog en Microsoft Teams:

1. Abre Microsoft Teams.
2. En la barra de herramientas vertical, haz clic en **Apps** (Aplicaciones).
3. Busca "Datadog" y haz clic en **Open** (Abrir).
4. En el modal que se abre, selecciona el canal principal del equipo donde debe añadirse la aplicación. Haz clic en **Go** (Listo) para completar la instalación.
   {{< img src="integrations/microsoft_teams/microsoft_teams_add_app_to_team.png" alt="Microsoft Teams Añadir aplicación al equipo" >}}

A continuación, conecta tu inquilino de Microsoft a Datadog:

1. En Datadog, ve al [Ícono de integración de Microsoft Teams][121].
2. Haz clic en **Add Tenant** (Agregar inquilino), que te redirigirá a Microsoft.
3. Sigue las instrucciones y haz clic en **OK** (Aceptar).


### Concesión de permisos adicionales
Algunas funciones de Incident Management de Datadog necesitan permiso para realizar acciones en tu inquiino, por ejemplo, crear un nuevo
canal para un incident (incidente). Para otorgar el consentimiento de administrador en todo el inquilino, se necesita una persona autorizada para otorgarlo en nombre de la organización Microsoft, como por ejemplo, un usuario con el rol de *Administrador global*.
Consulta la [documentación de Microsoft Entra ID][122] para obtener más
información sobre quién puede otorgar el consentimiento de administrador a la aplicación Datadog.

Puedes elegir conceder a Datadog permisos de aplicación y delegados o sólo permisos delegados. El uso de permisos de aplicación y delegados es fácil de configurar, mientras que el uso de permisos delegados te ofrece un control más preciso sobre la aplicación Datadog en tu inquilino. Para obtener más información, consulta [Documentación general sobre permisos y consentimiento de Microsoft][123].

[121]: https://app.datadoghq.com/integrations/microsoft-teams
[122]: https://learn.microsoft.com/en-us/azure/active-directory/manage-apps/grant-admin-consent?pivots=ms-graph#prerequisites
[123]: https://docs.datadoghq.com/es/integrations/microsoft_teams/?tab=datadogapprecommended#setup

{{< tabs >}}

{{% tab "Using Application Permissions" %}}

1. Navega hasta el [cuadro de integración de Microsoft Teams][1] en Datadog.
2. Para el inquilino en el que quieres utilizar Incident Management, haz clic en el icono del engranaje situado a la derecha.
3. Haz clic en **Grant application permissions** (Conceder permisos de aplicación) y se te redirigirá a Microsoft. Este paso debe realizarlo un usuario que pueda conceder el permiso de administrador de todo el inquilino. Este usuario debe tener una cuenta Datadog, pero no es necesario que el correo electrónico utilizado para su cuenta Datadog coincida con el correo electrónico de su cuenta Microsoft.
4. Sigue las instrucciones y haz clic en **OK** (Aceptar).


[1]: https://app.datadoghq.com/integrations/microsoft-teams
{{% /tab %}}

{{% tab "Using Delegated Permissions" %}}
Los permisos delegados permiten a Datadog operar dentro de tu inquilino Microsoft Teams como usuario. Datadog podrá realizar cualquier acción que ese usuario pueda realizar y acceder a los recursos a los que ese usuario pueda acceder.

En primer lugar, concede permisos delegados a la aplicación Datadog:
1. Navega hasta el [cuadro de integración de Microsoft Teams][1] en Datadog.
2. Para el inquilino en el que quieres utilizar Incident Management, haz clic en el icono del engranaje situado a la derecha.
3. Haz clic en **Grant delegated permissions** (Conceder permisos delegados) y se te redirigirá a Microsoft. Este paso debe realizarlo un usuario que pueda conceder el permiso de administrador de todo el inquilino. Este usuario debe tener una cuenta Datadog, pero no es necesario que el correo electrónico utilizado para su cuenta Datadog coincida con el correo electrónico de su cuenta Microsoft.
4. Sigue las instrucciones y haz clic en **OK** (Aceptar).

A continuación, crea la cuenta de servicio para que Datadog:
1. Cree un usuario de cuenta de servicio de Office365. Datadog recomienda asignar a este usuario de cuenta de servicio un nombre como 'Datadog' para distinguirlo de los usuarios reales de Microsoft Teams y evitar confusiones.
2. Asigne una licencia de Microsoft Teams a la cuenta de servicio.
3. Añada el usuario de la cuenta de servicio a cada equipo en el que quieres gestionar la respuesta a incidentes. Esto incluye los equipos donde se crean nuevos canales de incidentes y los equipos desde donde los usuarios declaran incidentes.
4. Asegúrate de que esos equipos tienen los siguientes permisos habilitados:
   - `Allow members to create and update channels`
   - `Allow members to delete and restore channels`
   - `Allow members to create, update, and remove tabs`

   Para activar estos permisos, haz clic en **...** junto al nombre del equipo > **Gestionar equipo** > **Configuración** > **Permisos de miembro**.

Por último, conecta el usuario de la cuenta de servicio que creaste en el primera paso.
1. Asegúrate de que has iniciado sesión como el usuario de la cuenta de servicio que acabas de crear. **Nota**: No es necesario crear un usuario Datadog para la cuenta de servicio, y el usuario de la cuenta de servicio no está conectado al usuario Datadog que realiza este paso.
2. Navega hasta el [cuadro de integración de Microsoft Teams][1] en Datadog.
3. Para el inquilino en el que quieres utilizar Incident Management, haz clic en el icono del engranaje situado a la derecha.
4. Haz clic en **Connect delegated user** (Conectar usuario delegado) y se te redirigirá a Microsoft. **Nota**: No es necesario ser administrador de todo el inquilino para realizar este paso.
5. Sigue las instrucciones y haz clic en **OK** (Aceptar).

#### Nota importante sobre los tokens de actualización

Cuando te conectas a Microsoft Teams utilizando una cuenta de servicio delegada, Datadog utiliza un token de actualización para conservar el acceso sin necesidad de iniciar sesión repetidamente. Este token puede dejar de ser válido si cambia la contraseña de la cuenta de servicio, si se desactiva la cuenta o si Microsoft revoca el token.

Estos tokens también caducan a los 90 días. Cada vez que Datadog realiza un acción en nombre del usuario delegado, se emite un nuevo token, pero si el usuario delegado no se utiliza durante 90 días, el token caduca y la integración deja de funcionar. 

Si el token deja de ser válido o caduca, tendrás que volver a conectar la cuenta de servicio para restaurar la funcionalidad.

Para obtener más información, consulta la documentación de Microsoft sobre [actualización de tokens en la plataforma de identidad de Microsoft][2].


[1]: https://app.datadoghq.com/integrations/microsoft-teams
[2]: https://learn.microsoft.com/en-us/entra/identity-platform/refresh-tokens
{{% /tab %}}

{{< /tabs >}}

### Configuración del usuario

Para realizar acciones en Datadog desde Microsoft Teams es necesario conectar las cuentas Datadog y Microsoft Team.

Para conectar tu cuenta desde Microsoft Teams:

1. Abre Microsoft Teams.
2. Inicia un chat con el bot de Datadog al hacer clic en el botón `...` de la barra de herramientas vertical y seleccionar Datadog.
3. Escribe "cuentas" y pulsa intro.
   {{< img src="integrations/microsoft_teams/microsoft_teams_connect_account_from_teams.png" alt="Conectar cuentas desde Microsoft Teams" >}}

4. El bot de Datadog responderá con instrucciones sobre cómo conectar tus cuentas. Haz clic en **Connect Datadog Account** (Conectar cuenta Datadog).
5. El bot de Datadog te enviará un mensaje con un enlace para conectar tus cuentas. Haz clic en el enlace y sigue las instrucciones.
6. Se te redirigirá de nuevo al [Ícono de integración de Microsoft Teams][303].
7. Crea una clave de aplicación haciendo clic en **Crear** en el  [Ícono de integración de Microsoft Teams][303].

También puedes conectar tus cuentas desde Datadog:

1. En Datadog, ve al [Ícono de integración de Microsoft Teams][303].
2. Haz clic en **Connect** (Conectar) en el inquilino que aparece en la lista.
3. Sigue las instrucciones y haz clic en **OK** (Aceptar).
4. Desde el [Ícono de integración de Microsoft Teams][303], crea una clave de aplicación haciendo clic en **Crear** en el aviso anterior.

{{< img src="integrations/microsoft_teams/microsoft_teams_connect_account_from_datadog_v2.png" alt="Conectar cuentas desde el cuadro de la integración Microsoft Teams" >}}

### Uso del incidente

#### Incidentes

Para declarar una nueva incidencia desde Microsoft Teams:

1. Inicia una conversación en un canal de cualquier equipo o un chat con la aplicación Datadog.
2. Tipo `@Datadog incident (incidente)`
3. Aparece una tarjeta adaptable. Haz clic en el botón **Declare Incident** (Declarar incidente) para abrir la pestaña Datadog y declarar un incidente.

Un usuario debe conectar su cuenta Microsoft Teams a su cuenta Datadog para declarar un incidente.

Para actualizar una incidencia, sigue un procedimiento similar al de creación en proceso:

1. Inicia una conversación en un equipo de incidencias.
2. Escribe `@Datadog` o utiliza el botón `...` para abrir el menú **Connect Datadog Account**. (Extensiones de mensajería) y selecciona la aplicación **Datadog**.
3. Selecciona **Update Incident** (Actualizar incidencia).
4. Rellena el formulario con la información pertinente.
5. Haz clic en **Update** (Actualizar).

Haz una lista de todas las incidencias abiertas (activas y estables) con:

```
@Datadog list incidents
```

Utiliza el menú "More actions" (Más acciones) en cualquier mensaje dentro de un equipo de incidencias en el extremo derecho para enviar ese mensaje a la Línea de tiempo de la incidencia.

#### Canal de actualización de incidencias

El uso de un canal de actualizaciones de incidencias proporciona a las partes interesadas visibilidad en toda la organización del estado de todas las incidencias directamente desde Microsoft Teams. Selecciona en qué equipo y canal de tu cuenta deseas publicar estas actualizaciones y el canal recibirá las siguientes publicaciones:

- Nuevas incidencias declaradas.
- Cambios de gravedad, transición de estado y encargado de la incidencia.
- Enlaces a la página de información general del incidente en la aplicación.
- Enlace para unirse al equipo especializado en incidencias.

Una vez instalada la aplicación de Microsoft Teams, puedes ir a la página **Incident Settings** (Configuración de incidencias). Desde aquí, puedes desplazarte hasta la sección **Incident Updates** (Actualizaciones de incidencias) y comenzar el flujo de configuración.

#### Cómo crear un canal de incidencias:

1. Ve a [Configuración de incidentes][304].
2. En la sección Microsoft Teams, selecciona tu inquilino de Microsoft Teams conectado.
3. Activa **Automatically create a Microsoft Teams channel for every incident** (Crear automáticamente un canal de Microsoft Teams para cada incidencia).
4. Selecciona el equipo en el que deseas crear automáticamente nuevos canales.
5. Guarda la configuración.

{{< img src="integrations/microsoft_teams/ms_teams_incident_updates_v2.png" alt="Configuración del canal de actualización de incidentes de Microsoft Teams." >}}

[301]: https://docs.datadoghq.com/es/monitors/notifications/#notification
[302]: https://docs.datadoghq.com/es/help/
[303]: https://app.datadoghq.com/integrations/microsoft-teams
[304]: https://app.datadoghq.com/incidents/settings#Integrations
[305]: https://learn.microsoft.com/en-us/azure/active-directory/manage-apps/grant-admin-consent?pivots=ms-graph#prerequisites
[306]: https://learn.microsoft.com/en-us/graph/permissions-reference
[307]: https://docs.datadoghq.com/es/dashboards/scheduled_reports/
[308]: https://learn.microsoft.com/en-us/microsoftteams/app-permissions#what-can-apps-do-in-teams
[309]: https://learn.microsoft.com/en-us/microsoftteams/private-channels#private-channel-limitations
[3010]: https://devblogs.microsoft.com/microsoft365dev/retirement-of-office-365-connectors-within-microsoft-teams/
[3011]: https://learn.microsoft.com/en-us/graph/permissions-overview
{{< /site-region >}}


## Datos recopilados

### Métricas

La integración Microsoft Teams no proporciona métricas.

### Eventos

La integración Microsoft Teams no incluye eventos.

### Checks de servicio

La integración Microsoft Teams no incluye checks de servicios.

## Permisos

La integración de Microsoft Teams recibe los siguientes permisos para Teams al que se ha añadido. Para obtener más información, consulta [Referencia de permisos de la aplicación de Microsoft][978].

| Descripción del permiso                                                                                                                                                                    | Motivo de la solicitud                                                                               |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- |
| Recibir mensajes y datos que yo le facilite.                                                                                                                                           | Los usuarios pueden interactuar con la aplicación Datadog en un chat personal.                                    |
| Enviarme mensajes y notificaciones.                                                                                                                                                       | Los usuarios pueden interactuar con la aplicación Datadog en un chat personal.                                    |
| Acceder a la información de mi perfil, como mi nombre, dirección de correo electrónico, nombre de la empresa e idioma preferido.                                                                                       | Permitir a los usuarios configurar notificaciones de Microsoft Teams y flujos de trabajo dentro de la interfaz de usuario de Datadog. |
| Recibir mensajes y datos que los miembros de un equipo o chat le proporcionan en un canal o chat.                                                                                                   | Los usuarios pueden interactuar con Datadog a través de los comandos @Datadog.                                   |
| Enviar mensajes y notificaciones en un canal o chat.                                                                                                                                     | Enviar notificaciones de Datadog a los objetivos configurados.                                            |
| Acceder a la información de este equipo o chat, como el nombre del equipo o chat, la lista de canales, y la nómina (incluidos los nombres y direcciones de correo electrónico de los miembros del equipo o chat), y utilizarlos para ponerte en contacto con ellos. | Permitir a los usuarios configurar las notificaciones de Microsoft Teams y flujos de trabajo dentro de Datadog.        |


{{< site-region region="us,us3,us5,eu,ap1" >}}

Se necesitan permisos adicionales para utilizar las funciones de Incident Management en la integración de Microsoft Teams. Estos deben ser autorizados por un usuario con permisos para todo el inquilino (consulta [Managment Incident de Datadog en Microsoft Teams: Configuración de la cuenta](#account-setup) para obtener instrucciones detalladas).
Para obtener más información sobre estos permisos, consulta la [Referencia de permisos de Microsoft Graph][976].
{{< tabs >}}
{{% tab "Using Application Permissions" %}}
<table>
  <tr>
    <td style="width:40%;"><strong>API/Nombre de permisos</strong></td>
    <td style="width:15%;"><strong>Tipo</strong></td>
    <td><strong>Motivo de la solicitud</strong></td>
  </tr>
  <tr>
    <td style="width:40%;"><code>Channel.Create</code></td>
    <td style="width:15%;">Aplicación y delegado</td>
    <td>Crear canales para administrar y corregir incidentes mediante Datadog Incident Management.</td>
  </tr>
  <tr>
    <td style="width:40%;"><code>Channel.Delete.All</code></td>
    <td style="width:15%;">Aplicación y delegado</td>
    <td>Autoarchivo de canales de incidentes después de un periodo especificado.</td>
  </tr>
  <tr>
    <td style="width:40%;"><code>ChannelMessage.Read.All</code></td>
    <td style="width:15%;">Aplicación y delegado</td>
    <td>Sincronizar automáticamente mensajes de línea temporal en la línea temporal del incidente desde un canal de incidentes.</td>
  </tr>
  <tr>
    <td style="width:40%;"><code>ChannelSettings.ReadWrite.All</code></td>
    <td style="width:15%;">Aplicación y delegado</td>
    <td>Crear y modificar canales para corregir incidentes usando Datadog Incident Management.</td>
  </tr>
  <tr>
    <td style="width:40%;"><code>Directory.Read.All</code>,<code>GroupMember.Read.All</code></td>
    <td style="width:15%;">Aplicación</td>
    <td>Ofrece sugerencias para autocompletar el nombre del equipo o el canal en la configuración de Datadog Incident Management.</td>
  </tr>
  <tr>
    <td style="width:40%;"><code>TeamsTab.Create</code></td>
    <td style="width:15%;">Aplicación y delegado</td>
    <td>Crear una pestaña en un equipo para la aplicación de Datadog (este permiso es obligatorio para una experiencia de declaración de incidente de Microsoft Teams futura).</td>
  </tr>
  <tr>
    <td style="width:40%;"><code>OnlineMeetings.ReadWrite</code></td>
    <td style="width:15%;">Delegado</td>
    <td>Crear automáticamente en un equipo para la aplicación de Datadog (este permiso es obligatorio para una experiencia de declaración de incidente de Microsoft Teams futura).</td>
  </tr>
  <tr>
    <td style="width:40%;"><code>TeamsAppInstallation.
    ReadWriteSelfForTeam</code></td>
    <td style="width:15%;">Delegado</td>
    <td>Permite la aplicación de Datadog para comprobar si es miembro de un equipo.</td>
  </tr>
  <tr>
    <td style="width:40%;"><code>TeamsTab.Read.All</code></td>
    <td style="width:15%;">Delegado</td>
    <td>Comprueba si una pestaña de Datadog ha sido creada en un canal (este permiso es obligatorio para una experiencia de declaración de incidente de Microsoft Teams futura).</td>
  </tr>
  <tr>
    <td style="width:40%;"><code>User.Read</code></td>
    <td style="width:15%;">Delegado</td>
    <td>Ofrece detalles sobre el usuario registrado para conectar una cuenta de Microsoft Teams con una cuenta de Datadog correspondiente.</td>
  </tr>
  <tr>
    <td style="width:40%;"><code>User.Read.All</code></td>
    <td style="width:15%;">Delegado</td>
    <td>Muestra el nombre del usuario de Microsoft Teams que actualizó o creó un incidente.</td>
  </tr>
  <tr>
    <td style="width:40%;"><code>Team.ReadBasic.All</code></td>
    <td style="width:15%;">Delegado</td>
    <td>Muestra los equipos de los que es miembro la cuenta de servicio en la página de configuración del incidente.</td>
  </tr>
</table>
{{% /tab %}}

{{% tab "Using Delegated Permissions" %}}

<table>
  <tr>
    <td style="width:40%;"><strong>API/Nombre de permisos</strong></td>
    <td style="width:15%;"><strong>Tipo</strong></td>
    <td><strong>Motivo de la solicitud</strong></td>
  </tr>
  <tr>
    <td style="width:40%;"><code>Channel.Create</code></td>
    <td style="width:15%;">Delegado</td>
    <td>Crear canales para administrar y corregir incidentes mediante Datadog Incident Management.</td>
  </tr>
  <tr>
    <td style="width:40%;"><code>Channel.Delete.All</code></td>
    <td style="width:15%;">Delegado</td>
    <td>Autoarchivar canales de incidentes después de un periodo especificado.</td>
  </tr>
  <tr>
    <td style="width:40%;"><code>ChannelMessage.Read.All</code></td>
    <td style="width:15%;">Delegado</td>
    <td>Sincroniza automáticamente mensajes de línea temporal en la línea temporal del incidente desde un canal de incidente.</td>
  </tr>
  <tr>
    <td style="width:40%;"><code>ChannelSettings.ReadWrite.All</code></td>
    <td style="width:15%;">Delegado</td>
    <td>Crear y modificar canales para corregir incidentes mediante Datadog Incident Management.</td>
  </tr>
  <tr>
    <td style="width:40%;"><code>TeamsTab.Create</code></td>
    <td style="width:15%;">Delegado</td>
    <td>Crear una pestaña en un equipo para la aplicación de Datadog (este permiso es obligatorio para una experiencia de declaración de incidente de Microsoft Teams futura).</td>
  </tr>
  <tr>
    <td style="width:40%;"><code>OnlineMeetings.ReadWrite</code></td>
    <td style="width:15%;">Delegado</td>
    <td>Crear automáticamente una reunión en un equipo para la aplicación de Datadog (este permiso es obligatorio para una experiencia de declaración de incidente de Microsoft Teams futura).</td>
  </tr>
  <tr>
    <td style="width:40%;"><code>TeamsAppInstallation.
    ReadWriteSelfForTeam</code></td>
    <td style="width:15%;">Delegado</td>
    <td>Permite que la aplicación de Datadog compruebe si es miembro de un equipo.</td>
  </tr>
  <tr>
    <td style="width:40%;"><code>TeamsTab.Read.All</code></td>
    <td style="width:15%;">Delegado</td>
    <td>Comprueba si una pestaña de Datadog ha sido creada en un canal (este permiso es obligatorio para una experiencia de declaración de incidente de Microsoft Teams futura).</td>
  </tr>
  <tr>
    <td style="width:40%;"><code>User.Read</code></td>
    <td style="width:15%;">Delegado</td>
    <td>Ofrece detalles sobre el usuario registrado para conectar una cuenta de Microsoft Teams con una cuenta de Datadog correspondiente.</td>
  </tr>
  <tr>
    <td style="width:40%;"><code>User.Read.All</code></td>
    <td style="width:15%;">Delegado</td>
    <td>Muestra el nombre del usuario de Microsoft Teams que actualizó o creó un incidente.</td>
  </tr>
  <tr>
    <td style="width:40%;"><code>Team.ReadBasic.All</code></td>
    <td style="width:15%;">Delegado</td>
    <td>Muestra los equipos de los que es miembro la cuenta de servicio en la página de configuración del incidente.</td>
  </tr>
</table>

{{% /tab %}}
{{< /tabs >}}

[971]: https://docs.datadoghq.com/es/monitors/notifications/#notification
[972]: https://docs.datadoghq.com/es/help/
[973]: https://app.datadoghq.com/integrations/microsoft-teams
[974]: https://app.datadoghq.com/incidents/settings#Integrations
[975]: https://learn.microsoft.com/en-us/azure/active-directory/manage-apps/grant-admin-consent?pivots=ms-graph#prerequisites
[976]: https://learn.microsoft.com/en-us/graph/permissions-reference
[977]: https://docs.datadoghq.com/es/dashboards/scheduled_reports/
[978]: https://learn.microsoft.com/en-us/microsoftteams/app-permissions#what-can-apps-do-in-teams
[979]: https://learn.microsoft.com/en-us/microsoftteams/private-channels#private-channel-limitations
[9710]: https://devblogs.microsoft.com/microsoft365dev/retirement-of-office-365-connectors-within-microsoft-teams/

{{< /site-region >}}


## Solucionar problemas

### Uso de SSO

Sigue los siguientes pasos para configurar nuevos conectores de canal:

1. Inicia sesión en Datadog y completa los pasos 1 y 2.

2. Después de que el paso de configuración 3 te redirija a Datadog desde la página de MS Teams, abre una nueva pestaña e inicia sesión en Datadog con tu SSO. A continuación, realiza el paso de configuración 4 por separado.

### ¿Por qué no aparece mi equipo en el cuadro de la integración?


{{< site-region region="us,us3,us5,eu,ap1" >}}
Si añadieras el bot al equipo antes de añadir el inquilino a Datadog, entonces a Datadog se le pasaría el evento de unirse al equipo al no saber que el equipo existe.
Puedes tratar de:

- Sincroniza los canales estándar de tu equipo con Datadog publicando `@Datadog sync` en cualquier canal estándar de ese equipo:

1. Ve a un canal estándar del equipo que quieres sincronizar.
2. Inicia una publicación en el canal.
3. Publica `@Datadog sync` en el canal y espera un mensaje de confirmación en el subproceso que indique el éxito de la operación.

- Elimina la aplicación Datadog del equipo y luego vuelve a añadirla. **Nota**: Esto elimina los conectores configurados para ese equipo. Realiza esta acción sólo cuando tengas todo listo para migrar todos los conectores de ese equipo a una integración Datadog basada en inquilinos:

1. Haz clic en los tres puntos situados junto al nombre del equipo en la barra lateral izquierda.
2. Haz clic en **Manage Team** (Gestionar equipo).
3. Ve a pestaña con la etiqueta **Apps** (Aplicaciones).
4. Haz clic en los tres puntos situados junto a la aplicación Datadog.
5. Haz clic en **Remove** (Eliminar).
6. Vuelve a añadir la aplicación Datadog siguiendo los [pasos de configuración][951].

[951]: https://docs.datadoghq.com/es/integrations/microsoft_teams/?tab=datadogapprecommended#setup

{{< /site-region >}}



{{< site-region region="gov" >}}
Si añadieras el bot al equipo antes de añadir el inquilino a Datadog, entonces a Datadog se le pasaría el evento de unirse al equipo al no saber que el equipo existe.
Puedes tratar de:

- Sincroniza los canales estándar de tu equipo con Datadog publicando `@Datadog for Government sync` en cualquier canal estándar de ese equipo:

1. Ve a un canal estándar del equipo que quieres sincronizar.
2. Inicia una publicación en el canal.
3. Publica `@Datadog for Government sync` en el canal y espera un mensaje de confirmación en el hilo indicando el éxito de la operación.

- Elimina la aplicación Datadog para el Gobierno del equipo y luego vuelve a añadirla. **Nota**: Esto elimina los conectores configurados para ese equipo. Realiza esta acción sólo cuando tengas todo listo para migrar todos los conectores de ese equipo a una integración Datadog basada en inquilinos.

1. Haz clic en los tres puntos situados junto al nombre del equipo en la barra lateral izquierda.
2. Haz clic en **Manage Team** (Gestionar equipo).
3. Ve a pestaña con la etiqueta **Apps** (Aplicaciones).
4. Haz clic en los tres puntos situados junto a la aplicación Datadog para el Gobierno.
5. Haz clic en **Remove** (Eliminar).
6. Vuelva a añadir la aplicación Datadog for Government siguiendo los [pasos de configuración][941].

[941]: https://docs.datadoghq.com/es/integrations/microsoft_teams/?tab=datadogapprecommended#setup&site=gov

{{< /site-region >}}


### ¿El bot admite canales privados?

Debido a las limitaciones de los canales confidenciales en [Microsoft Teams][1], el bot no admite canales confidenciales. Si deseas enviar notificaciones a canales confidenciales, consulta [Microsoft Workflows Webhooks][2].


{{< site-region region="us,us3,us5,eu,ap1" >}}

### ¿Se admiten varias menciones de usuarios en las notificaciones de monitor?

Sí, puedes incluir varias menciones de usuarios en una sola notificación para asegurarte de que se notifica a todos los miembros pertinentes del equipo.

**Ejemplo**: `@Teams-handle <at>user1@microsoft.com</at> <at>user2@microsoft.com</at> <at>user3@microsoft.com</at>`

<div class="alert alert-danger">Cuando se incluyen diferentes menciones de usuarios en una notificación y una de ellas no es válida, los usuarios válidos seguirán recibiendo notificaciones, pero las menciones de usuarios no válidas pueden hacer que las menciones aparezcan desordenadas.</div>

{{< /site-region >}}



{{< site-region region="gov" >}}

### ¿Es compatible la aplicación Datadog para el Gobierno con GCC o GCC High?

Actualmente, la aplicación Datadog para el Gobierno solo es compatible con los clientes de Datadog US1-FED que intentan conectarse a su inquilino `commercial` de Microsoft Teams. Los inquilinos GCC y GCC High no son compatibles con la aplicación.
{{< /site-region >}}


### ¿Por qué no funciona una función de incidentes cuando se utilizan permisos delegados?
En primer lugar, asegúrate de que el usuario de la cuenta de servicio es miembro del equipo en el que se utiliza la función.
- Si no se está creando la pestaña de incidentes, asegúrate de que has permitido a los miembros crear, actualizar y eliminar pestañas en los canales de ese equipo.
- Si no se están creando o renombrando nuevos canales de incidentes, asegúrate de que has permitido a los miembros crear y actualizar canales en ese equipo.
- Si los canales de incidentes no se están archivando, asegúrate de que has permitido a los miembros eliminar y restaurar canales en ese equipo.

Por último, es posible que el token del usuario delegado haya caducado o haya sido revocado. Si ese es el caso, vuelve a conectar al usuario delegado.

### ¿Por qué se me pide que compruebe la configuración de mi aplicación cuando intento declarar un incidente?
Para utilizar la nueva experiencia de declaración de incidentes, asegúrate de lo siguiente:
- La versión de tu aplicación es 3.1.23 o superior. Consulta las instrucciones para [actualizar la versión de la aplicación][3].
- Si utilizas permisos de aplicación, asegúrate de haber concedido el permiso de aplicación `TeamsTab.Create` 
- Si utiliza permisos delegados, asegúrate de haber concedido los permisos delegados `TeamsTab.Create` y `TeamsTab.Read.All`.
- Si estás utilizando permisos delegados, asegúrate de que la cuenta de servicio es miembro del equipo en el que estás ejecutando el comando `@Datadog incident (incidente)`.

También puedes utilizar la nueva experiencia de declaración de incidentes haciendo clic en el signo `+` en la parte superior de un canal y buscando la aplicación Datadog.

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia técnica de Datadog][4].


[1]: https://learn.microsoft.com/en-us/microsoftteams/private-channels#private-channel-limitations
[2]: https://docs.datadoghq.com/es/integrations/microsoft_teams/?tab=microsoftworkflowswebhooks#what-are-microsoft-workflows-webhooks
[3]: https://support.microsoft.com/en-us/office/update-an-app-in-microsoft-teams-3d53d136-5c5d-4dfa-9602-01e6fdd8015b
[4]: https://docs.datadoghq.com/es/help/