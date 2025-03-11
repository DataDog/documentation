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

Integrarse con Microsoft Teams para:
{{< site-region region="us,us3,us5,eu,ap1" >}}
- Recibir notificaciones de alertas en Datadog y eventos en Microsoft Teams.
- Gestionar las incidencias desde Microsoft Teams.
- Silenciar los monitores activados directamente desde Microsoft Teams.
{{< /site-region >}}
{{< site-region region="gov" >}}
- Recibir notificaciones de alertas en Datadog y eventos en Microsoft Teams.
- Silenciar los monitores activados directamente desde Microsoft Teams.
{{< /site-region >}}

## Configuración

{{< tabs >}}

{{% tab "Aplicación Datadog (recomendado)" %}}

### Enviar notificaciones de monitor a un canal de Microsoft Teams

Conecta tu inquilino de Microsoft a Datadog.

1. En Datadog, ve a [**Integrations > Microsoft Teams** (Integraciones > Microsoft Teams)][1].
2. Haz clic en **Add Tenant** (Agregar inquilino), que te redirigirá a Microsoft.
3. Sigue las instrucciones y haz clic en **OK** (Aceptar).

{{< site-region region="us,us3,us5,eu,ap1" >}}
Asegúrate de haber añadido la aplicación Datadog a todos los equipos en los que quieras recibir notificaciones de Datadog .
{{< /site-region >}}
{{< site-region region="gov" >}}
Asegúrate de haber añadido la aplicación Datadog para el Gobierno a todos los equipos en los que quieras recibir notificaciones de Datadog .
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
{{< img src="integrations/microsoft_teams/microsoft_teams_add_app_to_team.png" alt="Microsoft Teams Añadir aplicación al equipo" >}}
{{< /site-region >}}
{{< site-region region="gov" >}}
{{< img src="integrations/microsoft_teams/microsoft_teams_add_gov_app_to_team.png" alt="Microsoft Teams Añadir aplicación al equipo" >}}
{{< /site-region >}}

Una vez que el bot se haya añadido al equipo, configura el gestor de notificaciones en Datadog.

1. En un inquilino configurado, haz clic en **Add Handle** (Añadir gestor). Asigna un nombre al gestor, selecciona el equipo y el canal en los menús desplegables y haz clic en **Save** (Guardar).

### Migrar los conectores de legacy a la integración basada en inquilinos

Microsoft ha anunciado que los conectores de Office 365 para Microsoft Teams quedan obsoletos. Esto tiene los siguientes efectos:

* Todos los conectores de Datadog dejarán de funcionar el 31 de enero de 2025.
* Los conectores de webhooks entrantes sin [URL actualizadas][2] dejarán de funcionar el 31 de enero de 2025.
* Todos los conectores dejarán de funcionar el 31 de diciembre de 2025 (previamente era el 1 de octubre de 2024).

Para obtener más información, consulta la [entrada de blog][3] de Microsoft.

Para migrar todos los gestores de notificaciones que utilizan actualmente los conectores de Office 365 legacy a integraciones Datadog basadas en inquilinos:

{{< site-region region="us,us3,us5,eu,ap1" >}}
1. Sigue los [pasos de configuración](#setup) para conectar tu inquilino de Microsoft a Datadog.
2. Añade la aplicación Datadog a todos los equipos en los que tengas configurado un conector legacy de Office 365.
3. Para cada gestor de un conector de notificaciones legacy en el [cuadro de la integración Microsoft Teams][1]:
   1. En el inquilino configurado, haz clic en **Add Handle** (Añadir gestor).
   2. Asigna al nuevo gestor el mismo nombre que el gestor del conector. Por ejemplo, si el gestor del conector legacy se llama `channel-123`, crea un nuevo gestor en la configuración del inquilino con el nombre `channel-123`.
   3. Selecciona el equipo y el canal elegidos en los menús desplegables a los que el gestor del conector legacy enviaba el mensaje y haz clic en **Save** (Guardar). Este nuevo gestor anula el gestor del conector legacy existente.

[1]: https://app.datadoghq.com/integrations/microsoft-teams

{{< /site-region >}}

{{< site-region region="gov" >}}
1. Sigue los [pasos de configuración](#setup) para conectar tu inquilino de Microsoft a Datadog.
2. Añade la aplicación Datadog para el Gobierno a todos los equipos en los que tengas configurado un conector legacy de Office 365.
3. Para cada gestor de un conector de notificaciones legacy en el [cuadro de la integración Microsoft Teams][1]:
   1. En el inquilino configurado, haz clic en **Add Handle** (Añadir gestor).
   2. Asigna al nuevo gestor el mismo nombre que el gestor del conector. Por ejemplo, si el gestor del conector legacy se llama `channel-123`, crea un nuevo gestor en la configuración del inquilino con el nombre `channel-123`.
   3. Selecciona el equipo y el canal elegidos en los menús desplegables a los que el gestor del conector legacy enviaba el mensaje y haz clic en **Save** (Guardar). Este nuevo gestor anula el gestor del conector legacy existente.

[1]: https://app.datadoghq.com/integrations/microsoft-teams

{{< /site-region >}}

### Utilización

Desde un monitor Datadog, envía una notificación a Microsoft Teams utilizando la [función `@-notification`][1]. Envía la notificación a la dirección `@teams-<HANDLE>`, sustituyendo `<HANDLE>` por el nombre de tu gestor de Microsoft Teams. Para silenciar un monitor activado desde Microsoft Teams, haz clic en **Mute Monitor** (Silenciar Monitor), selecciona la **Duración del silencio** y haz clic en **Mute** (Silenciar).

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


[1]: https://app.datadoghq.com/integrations/microsoft-teams
[2]: https://learn.microsoft.com/en-us/microsoftteams/m365-custom-connectors#update-connectors-url
[3]: https://devblogs.microsoft.com/microsoft365dev/retirement-of-office-365-connectors-within-microsoft-teams/
{{% /tab %}}

{{% tab "Webhooks de Microsoft Workflows" %}}
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
9. Asegúrate de que el flujo de trabajo está conectado a la cuenta Microsoft elegida para enviar notificaciones (por ejemplo, una cuenta de servicio denominada "Notificaciones Datadog"). Las notificaciones aparecerán como enviadas por "`<NAME>` vía Workflows". Esta cuenta debe tener acceso al canal de Microsoft Teams configurado. Para cambiar la cuenta, haz clic en **Change connection** (Cambiar conexión) y sigue las instrucciones para configurar otra cuenta Microsoft.
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

### Utilización

Desde un monitor Datadog, envía una notificación a Microsoft Teams utilizando la [función `@-notification` ][1]. Envía la notificación a la dirección `@teams-<HANDLE>`, sustituyendo `<HANDLE>` por el nombre de tu gestor de Microsoft Teams.


[1]: https://make.preview.powerautomate.com/galleries/public/templates/d271a6f01c2545a28348d8f2cddf4c8f/post-to-a-channel-when-a-webhook-request-is-received
[2]: https://devblogs.microsoft.com/microsoft365dev/retirement-of-office-365-connectors-within-microsoft-teams/
[3]: https://teams.microsoft.com/l/app/c3a1996d-db0f-4857-a6ea-7aabf0266b00?source=app-details-dialog
[4]: https://app.datadoghq.com/integrations/microsoft-teams
{{% /tab %}}

{{% tab "Conectores (obsoletos)" %}}
### Migrar los conectores de legacy a la integración basada en inquilinos

Microsoft ha anunciado que los conectores de Office 365 para Microsoft Teams quedan obsoletos. Esto tiene los siguientes efectos:

* Todos los conectores de Datadog dejarán de funcionar el 31 de enero de 2025.
* Los conectores de webhooks entrantes sin [URL actualizadas][1] dejarán de funcionar el 31 de enero de 2025.
* Todos los conectores dejarán de funcionar el 31 de diciembre de 2025 (previamente era el 1 de octubre de 2024).

Para obtener más información, consulta la [entrada de blog][2] de Microsoft.

Para migrar todos los gestores de notificaciones que utilizan actualmente los conectores de Office 365 legacy a la integración de Datadog basada en inquilinos:

{{< site-region region="us,us3,us5,eu,ap1" >}}
1. Sigue los [pasos de configuración][2] para conectar tu inquilino de Microsoft a Datadog.
2. Añade la aplicación Datadog a todos los equipos en los que tengas configurado un conector legacy de Office 365.
3. Para cada gestor de un conector de notificaciones legacy en el [cuadro de la integración Microsoft Teams][1]:
   1. En el inquilino configurado, haz clic en **Add Handle** (Añadir gestor).
   2. Asigna al nuevo gestor el mismo nombre que el gestor del conector. Por ejemplo, si el gestor del conector legacy se llama `channel-123`, crea un nuevo gestor en la configuración del inquilino con el nombre `channel-123`.
   3. Selecciona el equipo y el canal elegidos en los menús desplegables a los que el gestor del conector legacy enviaba el mensaje y haz clic en **Save** (Guardar). Este nuevo gestor anula el gestor del conector legacy existente.

[1]: https://app.datadoghq.com/integrations/microsoft-teams
[2]: https://docs.datadoghq.com/es/integrations/microsoft_teams/?tab=datadogapprecommended#setup

{{< /site-region >}}

{{< site-region region="gov" >}}
1. Sigue los [pasos de configuración][2] para conectar tu inquilino de Microsoft a Datadog.
2. Añade la aplicación Datadog para el Gobierno a todos los equipos en los que tengas configurado un conector legacy de Office 365.
3. Para cada gestor de un conector de notificaciones legacy en el [cuadro de la integración Microsoft Teams][1]:
   1. En el inquilino configurado, haz clic en **Add Handle** (Añadir gestor).
   2. Asigna al nuevo gestor el mismo nombre que el gestor del conector. Por ejemplo, si el gestor del conector legacy se llama `channel-123`, crea un nuevo gestor en la configuración del inquilino con el nombre `channel-123`.
   3. Selecciona el equipo y el canal elegidos en los menús desplegables a los que el gestor del conector legacy enviaba el mensaje y haz clic en **Save** (Guardar). Este nuevo gestor anula el gestor del conector legacy existente.

[1]: https://app.datadoghq.com/integrations/microsoft-teams
[2]: https://docs.datadoghq.com/es/integrations/microsoft_teams/?tab=datadogapprecommended#setup
{{< /site-region >}}

### Migrar conectores legacy a la integración de webhooks de Microsoft Workflows

Microsoft ha anunciado que los conectores de Office 365 para Microsoft Teams quedan obsoletos. Esto tiene los siguientes efectos:

* Todos los conectores de Datadog dejarán de funcionar el 31 de enero de 2025.
* Los conectores de webhooks entrantes sin [URL actualizadas][1] dejarán de funcionar el 31 de enero de 2025.
* Todos los conectores dejarán de funcionar el 31 de diciembre de 2025 (previamente era el 1 de octubre de 2024).

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

1. En Datadog, ve al [cuadro de la integración Microsoft Teams][1].
2. Haz clic en **Add Tenant** (Agregar inquilino), que te redirigirá a Microsoft.
3. Sigue las instrucciones y haz clic en **OK** (Aceptar).

Algunas funciones de Datadog Incident Management necesitan permiso para realizar acciones en tu inquilino, por ejemplo, crear un nuevo 
equipo para un incidente. Se requiere una persona autorizada para conceder el permiso de administrador de todo el inquilino en nombre de la organización Microsoft,
como por ejemplo un usuario que tenga asignado el rol de *Administrador global*. Consulta la [documentación de Microsoft Entra ID][5] para obtener más 
información sobre quién puede conceder el permiso de administrador de todo el inquilino a la aplicación Datadog.

Para conceder el consentimiento:

1. Ve al [cuadro de la integración Microsoft Teams][3] en Datadog.
2. Para el inquilino en el que quieres utilizar Incident Management, haz clic en el icono del engranaje situado a la derecha.
3. Haz clic en **Authorize Tenant** (Autorizar inquilino) y se te redirigirá a Microsoft. Este paso debe realizarlo un usuario que pueda conceder el permiso de administrador de todo el inquilino. Este usuario debe tener una cuenta Datadog, pero no es necesario que el correo electrónico utilizado para su cuenta Datadog coincida con el correo electrónico de su cuenta Microsoft.
4. Sigue las instrucciones y haz clic en **OK** (Aceptar).

### Configuración del usuario

Para realizar acciones en Datadog desde Microsoft Teams es necesario conectar las cuentas Datadog y Microsoft Team.

Para conectar tu cuenta desde Microsoft Teams:

1. Abre Microsoft Teams.
2. Inicia un chat con el bot de Datadog al hacer clic en el botón `...` de la barra de herramientas vertical y seleccionar Datadog.
3. Escribe "cuentas" y pulsa intro.
   {{< img src="integrations/microsoft_teams/microsoft_teams_connect_account_from_teams.png" alt="Conectar cuentas desde Microsoft Teams" >}}

4. El bot de Datadog responderá con instrucciones sobre cómo conectar tus cuentas. Haz clic en **Connect Datadog Account** (Conectar cuenta Datadog).
5. El bot de Datadog te enviará un mensaje con un enlace para conectar tus cuentas. Haz clic en el enlace y sigue las instrucciones.
6. Se te redirigirá de nuevo al [cuadro de la integración Microsoft Teams][3]. 
7. Crea una clave de aplicación haciendo clic en **Create** (Crear) en el mensaje del [cuadro de la integración Microsoft Teams][3].


También puedes conectar tus cuentas desde Datadog:

1. En Datadog, ve al [cuadro de la integración Microsoft Teams][3].
2. Haz clic en **Connect** (Conectar) en el inquilino que aparece en la lista.
3. Sigue las instrucciones y haz clic en **OK** (Aceptar).
5. En el [cuadro de la integración Microsoft Teams][3], crea una clave de aplicación haciendo clic en **Create** (Crear) en el mensaje anterior.

{{< img src="integrations/microsoft_teams/microsoft_teams_connect_account_from_datadog_v2.png" alt="Conectar cuentas desde el cuadro de la integración Microsoft Teams" >}}

### Uso del incidente

#### Incidencias

Para declarar una nueva incidencia desde Microsoft Teams:

1. Inicia una conversación en cualquier equipo.
2. Escribe `@Datadog` o utiliza el botón `...` para abrir el menú **Connect Datadog Account**. (Extensiones de mensajería) y selecciona la aplicación **Datadog**.
3. Selecciona **Create an Incident** (Crear una incidencia).
4. Rellena el formulario con la información pertinente.
5. Haz clic en **Create** (Crear).

Cualquiera en tu inquilino de Microsoft Teams puede declarar una incidencia, independientemente de si tiene acceso a Datadog.

Cuando se crea una nueva incidencia, se crea un equipo correspondiente denominado `incident-(unique number ID)`.

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

1. Ve a [Configuración de incidentes][4].
2. En la sección Microsoft Teams, selecciona tu inquilino de Microsoft Teams conectado.
3. Activa **Automatically create a Microsoft Teams channel for every incident** (Crear automáticamente un canal de Microsoft Teams para cada incidencia).
4. Selecciona el equipo en el que deseas crear automáticamente nuevos canales.
5. Guarda la configuración.

{{< img src="integrations/microsoft_teams/ms_teams_incident_updates_v2.png" alt="Configuración del canal de actualización de incidentes de Microsoft Teams." >}}

[1]: https://docs.datadoghq.com/es/monitors/notifications/#notification
[2]: https://docs.datadoghq.com/es/help/
[3]: https://app.datadoghq.com/integrations/microsoft-teams
[4]: https://app.datadoghq.com/incidents/settings#Integrations
[5]: https://learn.microsoft.com/en-us/azure/active-directory/manage-apps/grant-admin-consent?pivots=ms-graph#prerequisites
[6]: https://learn.microsoft.com/en-us/graph/permissions-reference
[7]: https://docs.datadoghq.com/es/dashboards/scheduled_reports/
[8]: https://learn.microsoft.com/en-us/microsoftteams/app-permissions#what-can-apps-do-in-teams
[9]: https://learn.microsoft.com/en-us/microsoftteams/private-channels#private-channel-limitations
[10]: https://devblogs.microsoft.com/microsoft365dev/retirement-of-office-365-connectors-within-microsoft-teams/
{{< /site-region >}}

## Datos recopilados

### Métricas

La integración Microsoft Teams no proporciona métricas.

### Eventos

La integración Microsoft Teams no incluye eventos.

### Checks de servicio

La integración Microsoft Teams no incluye checks de servicios.

## Permisos

La integración Microsoft Teams recibe los siguientes permisos para los equipos a los que se ha añadido. Para obtener más información, consulta la [referencia de los permisos de Microsoft App][1].

| Descripción del permiso                                                                                                                                                                   | Motivo de la solicitud                                                                           |
|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|------------------------------------------------------------------------------------------|
| Recibir mensajes y datos que yo le facilite.                                                                                                                                          | Los usuarios pueden interactuar con la aplicación Datadog en un chat personal.                                |
| Enviarme mensajes y notificaciones.                                                                                                                                                      | Los usuarios pueden interactuar con la aplicación Datadog en un chat personal.                                |
| Acceder a la información de mi perfil, como mi nombre, dirección de correo electrónico, nombre de la empresa e idioma preferido.                                                                                      | Permitir a los usuarios configurar notificaciones de Microsoft Teams y flujos de trabajo dentro de la interfaz de usuario de Datadog. |
| Recibir mensajes y datos que los miembros de un equipo o chat le proporcionan en un canal o chat.                                                                                                  | Los usuarios pueden interactuar con Datadog a través de los comandos @Datadog.                           |
| Enviar mensajes y notificaciones en un canal o chat.                                                                                                                                    | Enviar notificaciones de Datadog a los objetivos configurados.                                        |
| Acceder a la información de este equipo o chat, como el nombre del equipo o chat, la lista de canales, y la nómina (incluidos los nombres y direcciones de correo electrónico de los miembros del equipo o chat), y utilizarlos para ponerte en contacto con ellos. | Permitir a los usuarios configurar las notificaciones de Microsoft Teams y flujos de trabajo dentro de Datadog. |

{{< site-region region="us,us3,us5,eu,ap1" >}}

Se necesitan permisos adicionales para utilizar las funciones de Incident Management en la integración Microsoft Teams. Esto debe ser autorizado por un usuario con permisos para todo el inquilino (consulta [Datadog Incident Management in Microsoft Teams:: configuración de la cuenta](#account-setup) para obtener instrucciones detalladas).
Para obtener más información sobre estos permisos, consulta la [referencia de los permisos de Microsoft Graph][6].

<table>
  <tr>
    <td style="width:40%;"><strong>API / Nombre de los permisos</strong></td>
    <td style="width:15%;"><strong>Tipo</strong></td>
    <td><strong>Motivo de la solicitud</strong></td>
  </tr>
  <tr>
    <td style="width:40%;"><code>Channel.Create</code></td>
    <td style="width:15%;">Aplicación</td>
    <td>Crear canales para gestionar y corregir incidentes utilizando Datadog Incident Management.</td>
  </tr>
  <tr>
    <td style="width:40%;"><code>Channel.Delete</code></td>
    <td style="width:15%;">Aplicación</td>
    <td>Archivar automáticamente canales de incidentes luego de un periodo especificado.</td>
  </tr>
  <tr>
    <td style="width:40%;"><code>ChannelMessage.Read.All</code></td>
    <td style="width:15%;">Aplicación</td>
    <td>Sincronizar automáticamente mensajes de líneas de tiempo con la línea de tiempo del incidente desde un canal de incidentes.</td>
  </tr>
  <tr>
    <td style="width:40%;"><code>ChannelSettings.ReadWrite.All</code></td>
    <td style="width:15%;">Aplicación</td>
    <td>Crear y modificar canales para corregir incidentes utilizando Datadog Incident Management.</td>
  </tr>
  <tr>
    <td style="width:40%;"><code>GroupMember.Read.All</code></td>
    <td style="width:15%;">Aplicación</td>
    <td>Sugiere opciones de rellenado automático de nombres de equipos y canales para la configuración de Datadog Incident Management.</td>
  </tr>
  <tr>
    <td style="width:40%;"><code>Team.Create</code>*</td>
    <td style="width:15%;">Aplicación</td>
    <td>Crear equipos para gestionar y corregir incidentes utilizando Datadog Incident Management.</td>
  </tr>
  <tr>
    <td style="width:40%;"><code>TeamMember.ReadWrite.All</code>*</td>
    <td style="width:15%;">Aplicación</td>
    <td>Añadir usuarios a equipos para gestionar incidentes utilizando Datadog Incident Management.</td>
  </tr>
  <tr>
    <td style="width:40%;"><code>TeamsAppInstallation.ReadWrite.All</code>*</td>
    <td style="width:15%;">Aplicación</td>
    <td>Añade la aplicación Datadog a los equipos creados por Datadog Incident Management.</td>
  </tr>
  <tr>
    <td style="width:40%;"><code>TeamSettings.ReadWrite.All</code>*</td>
    <td style="width:15%;">Aplicación</td>
    <td>Mantiene Datadog Incident Management actualizado con el estado de los equipos de incidentes.</td>
  </tr>
</table>
* Estos permisos son para funciones obsoletas que ya no utiliza la aplicación Datadog Incident Management
y pronto se eliminarán. Pueden revocarse en el portal de Microsoft Azure sin que ello afecte a la funcionalidad.

[1]: https://docs.datadoghq.com/es/monitors/notifications/#notification
[2]: https://docs.datadoghq.com/es/help/
[3]: https://app.datadoghq.com/integrations/microsoft-teams
[4]: https://app.datadoghq.com/incidents/settings#Integrations
[5]: https://learn.microsoft.com/en-us/azure/active-directory/manage-apps/grant-admin-consent?pivots=ms-graph#prerequisites
[6]: https://learn.microsoft.com/en-us/graph/permissions-reference
[7]: https://docs.datadoghq.com/es/dashboards/scheduled_reports/
[8]: https://learn.microsoft.com/en-us/microsoftteams/app-permissions#what-can-apps-do-in-teams
[9]: https://learn.microsoft.com/en-us/microsoftteams/private-channels#private-channel-limitations
[10]: https://devblogs.microsoft.com/microsoft365dev/retirement-of-office-365-connectors-within-microsoft-teams/

{{< /site-region >}}

## Resolución de problemas

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
6. Vuelve a añadir la aplicación Datadog siguiendo los [pasos de configuración][1].

[1]: https://docs.datadoghq.com/es/integrations/microsoft_teams/?tab=datadogapprecommended#setup
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
6. Vuelve a añadir la aplicación Datadog para el Gobierno siguiendo los [pasos de configuración][1].

[1]: https://docs.datadoghq.com/es/integrations/microsoft_teams/?tab=datadogapprecommended#setup&site=gov
{{< /site-region >}}

### ¿El bot admite canales privados?
Debido a las limitaciones de los canales privados en [Microsoft Teams][2], los canales privados no son compatibles con el bot. Si quieres enviar notificaciones a canales privados, consulta [Webhooks de Microsoft Workflows][3].

{{< site-region region="gov" >}}
### ¿Es compatible la aplicación Datadog para el Gobierno con GCC o GCC High?
Actualmente, la aplicación Datadog para el Gobierno solo es compatible con los clientes de Datadog US1-FED que intentan conectarse a su inquilino `commercial` de Microsoft Teams. Los inquilinos GCC y GCC High no son compatibles con la aplicación.
{{< /site-region >}}

¿Necesitas ayuda? Ponte en contacto con el [soporte de Datadog][4].

[1]: https://learn.microsoft.com/en-us/microsoftteams/app-permissions#what-can-apps-do-in-teams
[2]: https://learn.microsoft.com/en-us/microsoftteams/private-channels#private-channel-limitations
[3]: https://docs.datadoghq.com/es/integrations/microsoft_teams/?tab=microsoftworkflowswebhooks#what-are-microsoft-workflows-webhooks
[4]: https://docs.datadoghq.com/es/help/