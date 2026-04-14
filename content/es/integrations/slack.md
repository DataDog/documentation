---
"app_id": "slack"
"app_uuid": "e17a7505-a8d3-4fd4-952e-e6d2534e0ca3"
"assets":
  "dashboards":
    "slack_audit_log": "assets/dashboards/slack_audit_log.json"
  "integration":
    "auto_install": falso
    "events":
      "creates_events": verdadero
    "service_checks":
      "metadata_path": "assets/service_checks.json"
    "source_type_id": !!int "63"
    "source_type_name": "Slack"
"author":
  "homepage": "https://www.datadoghq.com"
  "name": "Datadog"
  "sales_email": "info@datadoghq.com"
  "support_email": "help@datadoghq.com"
"categories":
- "collaboration"
- "notifications"
- "security"
"custom_kind": "integración"
"dependencies": []
"display_on_public_website": verdadero
"draft": falso
"git_integration_title": "slack"
"integration_id": "slack"
"integration_title": "Slack"
"integration_version": ""
"is_public": verdadero
"manifest_version": "2.0.0"
"name": "slack"
"public_title": "Slack"
"short_description": "Slack es una plataforma de comunicación alojada y totalmente consultable que reúne toda la comunicación de tu equipo en un solo lugar"
"supported_os": []
"tile":
  "changelog": "CHANGELOG.md"
  "classifier_tags":
  - "Category::Collaboration"
  - "Category::Notifications"
  - "Category::Security"
  - "Offering::Integration"
  "configuration": "README.md#Setup"
  "description": "Slack es una plataforma de comunicación alojada y totalmente consultable que reúne toda la comunicación de tu equipo en un solo lugar"
  "media": []
  "overview": "README.md#Overview"
  "resources":
  - "resource_type": "blog"
    "url": "https://www.datadoghq.com/blog/slack-content-pack/"
  "support": "README.md#Support"
  "title": "Slack"
---

<!--  EXTRAÍDO DE https://github.com/DataDog/integrations-internal-core -->
## Información general

Conecta Slack a Datadog para ayudar al trabajo de tu equipo al:

- Compartir gráficos en canales privados o públicos de Slack.
- Recibir alertas y notificaciones de Datadog dentro de Slack.
- Silenciar la activación de monitores y declarar incidencias desde Slack.
- Despliegue automático de enlaces para mostrar una vista previa de eventos de log, trazas (traces), y widgets de dashboard.
- Ejecución de procesos directamente desde Slack.

## Configuración

{{< tabs >}}

{{% tab "Datadog para Slack" %}}


{{% site-region region="gov" %}}
<div class="alert alert-danger">
    <a href="https://www.datadoghq.com/blog/datadog-slack-app/">Datadog para Slack</a> no está disponible para el sitio {{< region-param key="dd_site_name" >}}. Para enviar notificaciones a Slack en el sitio US1-FED, utiliza el webhook de Slack (legacy).
</div>
{{% /site-region %}}


### Instalar la aplicación de Datadog en tu espacio de trabajo de Slack

1. En el [cuadro de integración de Slack][1], haz clic en **Configuration** (Configuración) y, a continuación, en **Connect Slack Account** (Conectar cuenta de Slack).
2. Haz clic en **Allow** (Permitir) para conceder a Datadog permiso para acceder a tu espacio de trabajo de Slack. Puede que necesites que el administrador de tu espacio de trabajo de Slack apruebe este cambio. Consulta [Permisos][2] para ver un desglose de los permisos de la aplicación y las razones para solicitarlos.

### Configurar qué canales de Slack pueden recibir notificaciones

1. Utiliza el [cuadro de integración de Slack][1] para configurar qué canales de Slack pueden recibir notificaciones de Datadog.
2. Para configurar un **canal privado**, la aplicación de Datadog debe ser miembro de ese canal. Navega hasta el canal en Slack y utiliza `/invite @Datadog` para asegurarte de que la aplicación de Datadog es miembro. Una vez completado este paso, el canal se añadirá automáticamente al [cuadro de integración de Slack][1]. 

Una vez instalada la integración de Slack, puedes utilizar el comando `/datadog` en cualquier canal de Slack. Las acciones disponibles cambian en función del canal en el que te encuentres. Utiliza `/datadog help` para ver todos los comandos disponibles. También puedes utilizar el alias `/dd` para ejecutar comandos `/datadog`.


[1]: https://app.datadoghq.com/integrations/slack
[2]: https://docs.datadoghq.com/integrations/slack#permissions
{{% /tab %}}

{{% tab "Webhook de Slack (Legacy)" %}}

### Instalación

Utiliza el [cuadro de integración de Slack][1] en el sitio de Datadog para instalar la integración.

### Configuración

1. En tu cuenta de Slack, ve a la aplicación de [Datadog (legacy)][2].
2. Haz clic en **Install** > **Add Integration** (Instalar > Añadir integración) y copia la **URL del webhook** de Slack.
3. En el [cuadro de integración de Slack][1], haz clic en **Configuration** (Configuración) y, a continuación, en **Add Account** (Añadir cuenta).
4. Introduce un **Nombre de cuenta de Slack** de tu elección.
5. Pega la URL del webhook en el campo **Slack Account Hook** (Hook de la cuenta de Slack).
6. Haz clic en **Save** (Guardar).
7. Añade tus **Canales de Slack en los que publicar**:
  {{< img src="integrations/slack/slack_configuration.png" alt="Configuración de Slack" >}}

También puedes enviar notificaciones a Slack desde [monitores][3] y [eventos][4].


[1]: https://app.datadoghq.com/integrations/slack
[2]: https://slack.com/apps/A0F7XDT7F-datadog-legacy
[3]: https://docs.datadoghq.com/monitors/notifications/
[4]: https://docs.datadoghq.com/service_management/events/explorer/notifications/
{{% /tab %}}
{{< /tabs >}}

## Monitores

Con la integración de Slack, puedes recibir alertas de monitor y silenciar monitores directamente desde Slack. Para obtener instrucciones detalladas sobre cómo crear monitores, consulta [Configuración de monitores][1]. Para enviar alertas de monitor a un canal de Slack, invita primero a Datadog al canal utilizando el comando `/invite @Datadog`.

### Mensajes de notificación

Puedes utilizar las mismas reglas, variables y etiquetas (tags) que las [notificaciones][2] de Datadog estándar. Por ejemplo, esta notificación envía un ping a un equipo en un canal de Slack llamado `infrastructure` cuando un monitor envía nuevamente una notificación:

```
CPU usage has exceeded {{warn_threshold}} on {{ @machine_id.name }}.
{{#is_renotify}}
Notifying @slack-infrastructure <!subteam^12345>
{{/is_renotify}}
```

#### Canales

Para especificar un canal de Slack al configurar un mensaje de notificación, escribe `@slack` en el cuadro de mensaje del monitor para ver la lista de los canales disponibles a los que puedes enviar la notificación.

**Nota**: Los caracteres especiales al final del nombre de un canal no son compatibles con @-notifications de Slack. Por ejemplo, `@----critical_alerts` funciona, pero `@--critical_alerts--` no.

#### @-mentions

Utiliza los siguientes comandos para crear @-mentions en los mensajes de notificación:

**@users**
Comando: `<@username>`
: notifica a un usuario de Slack mediante su nombre de usuario de Slack. Su nombre de usuario se puede encontrar en la [configuración de la cuenta de Slack][3] en **Username** (Nombre de usuario). Por ejemplo: `@slack-SLACK_CHANNEL <@USERNAME>`, o `@slack-SLACK_ACCOUNT-SLACK_CHANNEL <@USERNAME>`.

**@here**
Comando: `<!here>`
: notifica a todos los miembros en línea que forman parte del canal al que se está enviando la alerta.

**@channel**
: Comando: `<!channel>`
: notifica a todos los miembros que forman parte del canal al que se envía la alerta.

**@usergroups**
: Comando: `<!subteam^GROUP_ID>`
: notifica a cada miembro perteneciente a un grupo de usuarios en Slack. Por ejemplo, utilizarías `<!subteam^12345>` para un grupo de usuarios con un ID de `12345`. Para encontrar `GROUP_ID`, ve a **More** > **Your organization** > **People** > **User groups** (Más > Tu organización > Personas > Grupos de usuarios). Selecciona un grupo de usuarios, haz clic en la elipsis y selecciona **Copy group ID** (Copiar ID de grupo). También puedes [consultar el endpoint de la API `usergroups.list`][4].

También puedes utilizar las variables de plantilla de mensaje para crear @-mentions de forma dinámica. Por ejemplo, si la variable renderizada corresponde a un canal específico en Slack:

- `@slack-{{owner.name}}` envía notificaciones al canal de **#owner.name**.
- `@slack-{{host.name}}` envía notificaciones al canal **#host.name**.

Para crear @-mentions que vayan a direcciones de correo electrónico específicas:

- `@team-{{team.name}}@company.com` envía un correo electrónico a la lista de correo del equipo.

### Monitorizar alertas en Slack

Cuando se envía una alerta de monitor a un canal de Slack, contiene varios campos:

- El mensaje de notificación
- Un snapshot (gráfico) de la consulta que desencadenó tu monitor
- Etiquetas relacionadas
- Los nombres de los usuarios o grupos notificados

Para personalizar el contenido incluido en los mensajes de alerta del monitor en Slack, ve al [cuadro de integración de Slack][5]. Para cada canal, selecciona o desactiva la casilla de verificación de cada opción de alerta de monitor.

{{< img src="integrations/slack/slack_monitor_options.png" alt="Opciones de mensaje de alerta de monitor en el cuadro de integración de Slack" style="width:90%;" >}}

### Migrar monitores del webhook (legacy) de Slack a Datadog para Slack

Si tus monitores utilizan los webhooks de Slack legacy, hay dos formas de actualizar tus monitores para que se envíen desde la aplicación de Slack:

- **Actualización masiva**: actualiza en bloque todos tus monitores haciendo clic en el botón **Upgrade** (Actualizar) en la parte superior de la configuración para cada una de tus cuentas de Slack en el [cuadro de integración de Slack][5].
- **Actualizaciones individuales**: añade manualmente canales a la nueva configuración en el [cuadro de integración de Slack][5]. Es posible que tengas que eliminar referencias duplicadas a los mismos canales.

## Dashboards

Puedes publicar snapshots del widget de dashboard en cualquier canal de Slack. Para consultar una lista de widgets compatibles, consulta [Informes programados][6].

Para compartir un widget de dashboard en Slack:

- En Datadog, pasa el ratón por encima de un widget de dashboard y pulsa `CMD + C` o `CTRL + C`, o haz clic en el botón **Copy** (Copiar) del menú compartir y, a continuación, pega el enlace en Slack.
- En un canal de Slack, envía el comando `/datadog dashboard` o `/datadog` y, a continuación, haz clic en el botón **Share Dashboard Widget** (Compartir widget de dashboard).

**Nota:** Slack introdujo recientemente una nueva versión de Workflow Builder que aún no es compatible con integraciones de aplicaciones de terceros, incluido Datadog.

{{< img src="integrations/slack/dashboard_share.mp4" alt="Compartir un widget de dashboard en Slack" video="true" width=90% >}}

## Pestaña de inicio

Utiliza la pestaña **Home** (Inicio) en la aplicación de Datadog de Slack para ver tus dashboard, notebooks y servicios destacados. También puedes ver una lista de los monitores que se activaron en las últimas 24 horas y sus canales de Slack asociados. Si eres miembro de más de una cuenta de Datadog, filtra las pestañas cambiando de cuenta.

{{< img src="integrations/slack/datadog_homepage.mp4" alt="Página de inicio de Datadog que presenta elementos y muestra monitores activados" video="true" width=90% >}}

## Incidencias

Cualquier persona de tu organización de Slack puede declarar una incidencia, independientemente de si tiene acceso a Datadog. Cuando se crea una nueva incidencia, se crea un canal de Slack correspondiente `#incident-(unique number ID)` y se envía un mensaje al canal indicándole el nuevo canal de incidencias que debes utilizar. El tema del canal cambia con la incidencia.

### Comandos de incidencias

Para declarar una nueva incidencia desde Slack:

```
/datadog incident 
```

Para actualizar el estado de la incidencia (como la gravedad):

```
/datadog incident update
```

Para hacer una lista de todas las incidencias abiertas (activas y estables):

```
/datadog incident list
```

Para enviar el mensaje a la línea de tiempo de la incidencia, utiliza el comando de acciones del mensaje (los tres puntos verticales que aparecen al pasar el ratón sobre un mensaje enviado en un canal #incident).

{{< img src="integrations/slack/incidents2.png" alt="Configuración de Slack" style="width:60%;">}}

### Canal global de actualización de incidencias

Un canal global de actualizaciones de incidencias proporciona a tu equipo visibilidad de toda la organización del estado de todas las incidencias directamente desde tu espacio de trabajo de Slack. Selecciona en qué canal de tu espacio de trabajo deseas publicar estas actualizaciones y el canal recibirá las siguientes publicaciones: 

- Nuevas incidencias declaradas.
- Cambios de gravedad, transición de estado y encargado de la incidencia.
- Enlaces a la página de información general de la [incidencia][7] en la aplicación.
- Enlace para unirse a los canales de Slack dedicados a incidencias.

Para configurar un canal global de actualizaciones de incidencias:

1. En Datadog, navega hasta la página [**Incidents** > **Settings** > **Integrations**][8] (Incidencias > Configuración > Integraciones][8].
2. En la sección de Slack, haz clic en el conmutador **Send all incident updates to a global channel** (Enviar todas las actualizaciones de incidencias a un canal global).
3. Selecciona el espacio de trabajo de Slack y el canal de Slack donde deseas que se publiquen las actualizaciones de incidencias.

#### Gestionar tareas de incidencias

Mediante el uso de acciones de Slack y los comandos de Slack `/datadog`, puedes crear y gestionar tareas de incidencias directamente desde Slack. Los comandos de tareas de incidencias deben utilizarse en un canal de incidencias.

##### Acciones de Slack

Para crear una tarea utilizando las acciones de Slack, pasa el ratón por encima de cualquier mensaje enviado en un canal de incidencias. Al pasar el ratón, aparecerán tres puntos a la derecha del mensaje, que te permitirán **Add Task to Incident** (Añadir tarea a la incidencia).

##### Comandos de Slack

Para crear una tarea para una incidencia, utiliza el comando `/datadog task`. Aparece un modal que te permite incluir una descripción de la tarea, asignar compañeros de equipo y establecer una fecha de vencimiento. 

Para mostrar un lista de todas las tareas creadas para la incidencia, utiliza el comando `/datadog task list`. Utiliza esta lista para marcar las tareas como completadas o reabrirlas.

Todas las tareas creadas se pueden gestionar en la pestaña **Remediation** (Corrección) de una incidencia- Para más información, consulta [Gestión de incidencias][9].


## Flujos de trabajo

Con el [activador de Slack en Workflow Automation][10], puedes ejecutar un proceso directamente desde Slack.

### Comandos del proceso

Para ejecutar un proceso desde Slack:

```
/datadog workflow
```

## Permisos

Datadog para Slack requiere el siguiente contexto OAuth. Consulta la [documentación de contextos de permisos de Slack][11] para obtener más información.

### Contextos de Bot Token

| Contextos                   | Motivo de la solicitud                                                                                                  |
|--------------------------|-----------------------------------------------------------------------------------------------------------------|
| `channels:join`          | Únete automáticamente a los canales públicos configurados en el cuadro de integración de Slack en Datadog.                         |
| `channels:manage`        | Crea canales para gestionar y corregir incidencias mediante la gestión de incidencias de Datadog.                            |
| `channels:read`          | Proporciona sugerencias de autocompletado de nombres de canales en el cuadro de integración de Slack en Datadog.                       |
| `chat:write`             | Recibe alertas en Datadog y notificaciones en los canales y conversaciones aprobados.                                |
| `commands`               | Habilita el comando /Datadog y su alias /dd, para realizar acciones en Datadog.                                 |
| `groups:read`            | Proporciona sugerencias de autocompletado de nombres de canal para canales privados en el cuadro de integración de Slack en Datadog.  |
| `im:history`             | Permite a Datadog enviarte mensajes a través de la pestaña de Mensajes, por ejemplo, instrucciones de incorporación.               |
| `im:read`                | Habilita el comando /Datadog y el alias /dd para realizar acciones en Datadog a partir de mensajes directos.                |
| `im:write`               | Recibe mensajes, avisos y errores del bot de Datadog relacionados con tu cuenta de Datadog.                     |
| `links:read`             | Despliega los enlaces de Datadog en las conversaciones con información adicional como gráficos y muestras de log.                 |
| `links:write`            | Despliega los enlaces de Datadog en las conversaciones con información adicional como gráficos y muestras de log.                 |
| `mpim:read`              | Habilita el comando /Datadog y el alias /dd para realizar acciones en Datadog a partir de mensajes directos de grupo.          |
| `reactions:write`        | Añade una reacción emoji a los mensajes que se han añadido a la línea de tiempo de una incidencia mediante un acceso directo.                    |
| `remote_files:read`      | Permite leer informes PDF alojados en Datadog, como dashboards, que se compartieron con canales de Slack configurados. |
| `remote_files:share`     | Permite compartir informes PDF alojados en Datadog, como dashboards, con canales de Slack configurados.                  |
| `remote_files:write`     | Permite cargar enlaces a informes PDF alojados en Datadog, como dashboards, en espacios de trabajo configurados.             |
| `team:read`              | Mantén el cuadro de integración de Slack en Datadog al día del estado de tu espacio de trabajo.                         |
| `users:read`             | Realiza acciones desde Slack como usuario de Datadog al asociar la cuenta de Datadog.                                  |
| `users:read.email`       | Añade mensajería y usuarios para incidencias creadas fuera de Slack en Datadog.                                   |
| `workflow.steps:execute` | Envía automáticamente mensajes con los widgets de dashboard de Datadog desde un paso de flujo de trabajo de Slack.                          |

### Contextos opcionales de Bot Token contextos

Datadog para Slack ofrece funciones que requieren la habilitación de contextos de Bot Token adicionales y opcionales. Estos contextos se añaden dinámicamente según la habilitación de la función y no se añaden durante la instalación inicial.

| Contextos             | Motivo de la solicitud                                                                               |
|--------------------|----------------------------------------------------------------------------------------------|
| `channels:history` | Sincroniza automáticamente los mensajes de un canal de incidencias con la línea temporal de incidencias.               |
| `groups:write`     | Crea canales privados para gestionar y solucionar incidencias mediante la gestión de incidencias de Datadog. |
| `pins:write`       | Crea pins en los canales de incidencias para los enlaces y recursos de incidencias relevantes de Datadog.          |
| `bookmarks:write`  | Marca los enlaces importantes en un canal de incidencias durante el proceso de respuesta.                 |
| `bookmarks:read`   | Edita los marcadores de enlaces importantes cuando cambien.                                         |
| `files:read`       | Sincroniza las imágenes de un canal de incidentes con la línea temporal del incidente.                               |
| `calls:write`      | Enviar una notificación de reunión en el canal cuando se ha iniciado una reunión de incidente.        |

### Contextos de token de usuario

| Contextos   | Motivo de la solicitud                                                            |
|----------|---------------------------------------------------------------------------|
| `openid` | Realiza acciones en Datadog desde Slack al conectar tu cuenta de Datadog. |


### Contextos opcionales de token de usuario

Datadog para Slack ofrece funciones que requieren la habilitación de contextos de token de usuario adicionales y opcionales. Estos contextos se añaden dinámicamente según la habilitación de la función y no se añaden durante la instalación inicial.

| Contextos           | Motivo de la solicitud                                                    |
|------------------|-------------------------------------------------------------------|
| `auditlogs:read` | Recopila logs de auditoría de la red empresarial para visualizarlos en Datadog Cloud SIEM. |

## Logs de auditoría de la red empresarial

Ingiere eventos y acciones que ocurren dentro de tu red empresarial de Slack.

### Empezar a recopilar logs de auditoría de Slack

Sólo los propietarios de una organización de la red empresarial pueden autorizar a Datadog a recopilar logs de auditoría de Slack.

1. En el [cuadro de integración de Slack][5], haz clic en la pestaña **Audit Logs** (Logs de auditoría).
2. Haz clic en **Connect Enterprise Grid** (Conectar red empresarial) para ser redirigido a Slack para la autorización.

### Recopilación de eventos y acciones

- Eventos de gestión de usuarios, como la creación, eliminación y actualización de usuarios. Esto incluye cambios en los roles, permisos y perfiles de los usuarios.
- Eventos de gestión de espacios de trabajo y canales, incluidas las acciones relacionadas con la creación, modificación y eliminación de canales y espacios de trabajo. También realiza un seguimiento de los cambios en la configuración y los permisos del espacio de trabajo.
- Eventos de gestión de archivos y aplicaciones, incluido el seguimiento de la carga, descarga y eliminación de archivos, así como la monitorización de la instalación, actualización y eliminación de aplicaciones de Slack y integraciones.
- Eventos de seguridad y cumplimiento, incluidos los intentos de inicio de sesión, los cambios de contraseña y eventos de autenticación de dos factores, así como las acciones relacionadas con el cumplimiento, como la exportación de datos y el acceso a información confidencial.
- Registro de auditoría de las acciones administrativas, incluidos los cambios realizados por los administradores de Slack y los propietarios de espacios de trabajo, como actualizaciones de política, cambios en la configuración de seguridad y otras modificaciones administrativas.
- Eventos de acción de compartir y colaboración externos, incluida la creación de canales compartidos, invitaciones externas y actividades de cuentas de invitados.

Cada evento capturado proporciona información detallada, incluido:

- Acción: qué actividad se ha realizado.
- Actor: el usuario del espacio de trabajo que ha generado el evento.
- Entidad: el elemento sobre el que el actor ha actuado.
- Contexto: la localización (espacio de trabajo o empresa) donde el actor realizó la acción sobre la entidad.

Para más información, consulta la [documentación oficial de Slack][12].

## Datos recopilados

### Métricas

La integración para Slack no proporciona ninguna métrica.

### Eventos

La integración para Slack no incluye ningún evento.

### Checks de servicio

La integración para Slack no incluye ningún check de servicio.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con [soporte técnico de Datadog][13].

## Referencias adicionales

Documentación útil adicional, enlaces y artículos:

- [Gestiona los incidentes sin problemas con la integración en Slack de Datadog][14]


[1]: https://docs.datadoghq.com/monitors/configuration/
[2]: https://docs.datadoghq.com/monitors/notifications/
[3]: http://slack.com/account/settings
[4]: https://api.slack.com/methods/usergroups.list
[5]: https://app.datadoghq.com/integrations/slack
[6]: https://docs.datadoghq.com/dashboards/scheduled_reports/
[7]: https://app.datadoghq.com/incidents
[8]: https://app.datadoghq.com/incidents/settings#Integrations
[9]: https://docs.datadoghq.com/service_management/incident_management/
[10]: https://docs.datadoghq.com/service_management/workflows/trigger/#slack-triggers
[11]: https://api.slack.com/scopes
[12]: https://api.slack.com/admins/audit-logs-call
[13]: https://docs.datadoghq.com/help/
[14]: https://www.datadoghq.com/blog/slack-incident-management/
