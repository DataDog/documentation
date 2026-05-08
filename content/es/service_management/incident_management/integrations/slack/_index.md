---
description: Gestiona los incidents (incidentes) de Datadog directamente desde Slack.
further_reading:
- link: integrations/slack/
  tag: Documentación
  text: Instalar la integración con Slack
- link: https://app.datadoghq.com/integrations/slack
  tag: Aplicación
  text: Ícono de la integración de Slack en la aplicación
- link: https://www.datadoghq.com/blog/slack-incident-management/
  tag: Blog
  text: Gestiona los incidents (incidentes) a la perfección con la integración de
    Datadog para Slack
title: Integrar Slack con Incident Management de Datadog
---

## Información general

Slack es una plataforma de mensajería y colaboración ampliamente utilizada por equipos para comunicarse en tiempo real. La integración de Datadog con Slack conecta tus procesos de respuesta de incident (incidente) directamente con Slack, para que los equipos puedan declarar, gestionar y resolver incidents (incidentes) sin salir de su entorno de chat.

Con la integración, puedes:

- Responder más rápidamente declarando incidentes en Datadog directamente desde Slack.
- Crear automáticamente canales de Slack para colaborar cuando se declaren incidentes en Datadog.
- Ejecutar tu respuesta al incident (incidente) en Slack. Por ejemplo, paginar equipos de guardia, asignar roles de respondedor o actualizar la gravedad.

La documentación sobre la integración de Slack se organiza en torno al ciclo de vida típico del uso de Slack con Incident Management:

1. [**Instalar y conectar Slack**](#setup): Configura la integración entre tu espacio de trabajo de Slack y Datadog.
2. [Declarar incidentes**](#declaring-incidents-from-slack): Aprende a iniciar incidentes utilizando comandos de Slack o acciones de mensajes.
3. [**Gestionar incidentes desde los canales de incident (incidente) **](#incident-channels): Utiliza canales de Slack dedicados con comandos, sincronización y automatizaciones.
4. [Configurar las notificaciones globales**](#global-slack-notifications): Mantén informada a tu organización con actualizaciones automáticas.
5. **[Opciones de configuración de Slack de referencia](#additional-slack-configurations) y [comandos de Slack](#slack-incident-commands)**: Explora las opciones de configuración detalladas y consulta la lista completa de comandos de Slack disponibles para adaptar y agilizar tus procesos de respuesta al incident (incidente).

## Requisitos previos

Instala la integración a través del [ícono de integración de Slack][1] con los [ámbitos de OAuth][6] adecuados. Para obtener más información, consulta la documentación de [integración de Slack][2].

Una vez instalada la integración, ve a [**Service Management (Gestión de servicios)** > **Incidents** (incidentes) > **Settings** (Configuración) > **Integrations** (Integraciones)][3] para activar las capacidades de Slack para Incident Management.

## Declarar incidentes desde Slack

Cuando conectas un espacio de trabajo de Slack a una organización de Datadog, los usuarios del espacio de trabajo pueden utilizar los accesos directos de Slack relacionados con Incident Management.

Puedes declarar un incident (incidente) con el siguiente comando de barra oblicua:

```
/datadog incident
```

Para declarar un incident (incidente) desde un mensaje de Slack, sitúa el cursor sobre el mensaje, haz clic en **More actions** (Más acciones) (los tres puntos verticales) y selecciona **Declare incident** (Declarar incidente). Datadog publica un mensaje en el hilo del mensaje que confirma la creación del incident (incidente).

En forma predeterminada, solo los usuarios de Slack conectados a una organización de Datadog pueden declarar incidentes. Los usuarios de Slack pueden conectarse a una organización de Datadog mediante la ejecución de `/datadog connect`.

Para permitir que cualquier usuario de Slack en el espacio de trabajo declare incidentes, activa **Permitir que los usuarios de Slack declaren incidentes sin una cuenta de Datadog conectada** en la configuración de Incident Management.

## Canales de incident (incidente)

Puedes configurar Incident Management para crear automáticamente un canal de Slack dedicado para cada incident (incidente) que cumpla los criterios que definas. A continuación, tus respondedores pueden gestionar el incident (incidente) directamente en Slack desde el canal de incident (incidente).

Para utilizar los canales de incident (incidente), ve a [**Incidents** (Incidentes) > **Settings** (Configuración) > **Integrations** (Integraciones)][3] y activa **Create Slack channels for incidents** (Crear canales de Slack para incidentes).

La **plantilla de nombre de canal** que definas determina cómo Datadog nombra los incident (incidente) channels que creas. Las siguientes variables están disponibles en las plantillas de nombres de canales:

* `{{public_id}}`: Identificador numérico del incident (incidente)
* `{{title}}`: título del incident (incidente)
* `{{created}}`: fecha de recreación del incident (incidente) en formato MM_DD_AAAA
* `{{yyyy}}`: año de creación de cuatro dígitos del incident (incidente)
* `{{mm}}`: mes de creación de dos dígitos del incident (incidente)
* `{{dd}}`: día de creación de dos dígitos del mes del incident (incidente)
* `{{random_adjective}}`: Adjetivo aleatorio
* `{{random_noun}}`: Sustantivo aleatorio


### Sincronización de mensajes (reflejo de Slack)

Tras activar la creación automática de canales, puedes configurar Incident Management para sincronizar los mensajes entre un canal de Slack de incident (incidente) y la línea de tiempo del incident (incidente) en Datadog.

Para activar la sincronización, activa **Insertar mensajes de canales de Slack en la línea de tiempo de incident (incidente)** en la configuración de Incident Management y, a continuación, selecciona una de las siguientes opciones:

* **Refleja todos los mensajes en tiempo real**: Datadog sincroniza todos los mensajes publicados por los usuarios de Slack en el canal de incident (incidente).
* **Insertar un mensaje cuando se añade 📌 como reacción**: Datadog sincroniza los mensajes sólo cuando los usuarios de Slack reaccionan a ellos con marcadores (📌).

Para ambas opciones, no es necesario que el autor de un mensaje esté conectado a la organización de Datadog para que Datadog sincronice el mensaje. En el caso de los mensajes anclados, el autor **debe** estar conectado a la organización de Datadog para que el mensaje anclado se sincronice.

En organizaciones con facturación Incident Managment en función del uso

* La autoría de un mensaje que se sincroniza con Datadog **no** te convierte en usuario facturable para el mes en curso.
* Anclar un mensaje que luego se sincroniza **te convierte en usuario facturable**.

En organizaciones con facturación de Incident Management en función del puesto:

* **No** es necesario que dispongas de un puesto para que Datadog sincronice tus mensajes con Incident Management.
* Cuando anclas un mensaje, **debes** tener un puesto para que Datadog sincronice el mensaje que has anclado.

### Comandos de Slack en el canal de incident (incidente) 

En un canal incident (incidente) de Slack, puedes ejecutar comandos de Slack para modificar los estados y la gravedad del incident (incidente), asignar roles del respondedor, paginar equipos de guardia y mucho más.

Para obtener una lista completa de los comandos de Slack, consulta [comandos de Slack](#slack-commands).

### Otras opciones de configuración del canal de incident (incidente) 

Accede a todas las opciones de configuración de Slack en Incident Management a través de la page (página) [**Incidents** (Incidentes) > **Settings** (Configuración) > **Integrations** (Integraciones)][3].

| Función                                                   | Descripción y notas                                                                                                                             |
|-----------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------|
| **Enviar mensajes de línea de tiempo de incident (incidente) a Slack**              | Envía automáticamente las actualizaciones de la línea de tiempo de incident (incidente) desde Datadog al canal de Slack.<br><br>Mantiene a los participantes del canal sincronizados con las actualizaciones de Datadog. |
| **Añadir enlaces importantes a los marcadores del canal**              | Publica enlaces relacionados con incidents (incidentes) en los marcadores del canal de Slack.<br><br>Proporciona un cómodo acceso a los recursos.                                     |
| **Añadir miembros del equipo automáticamente**                        | Cuando se añade un equipo de Datadog al incident (incidente), sus miembros se añaden al canal de Slack.                                                       |
| **Envía actualizaciones de incident (incidente) al canal Slack**            | Actualiza el tema del canal con el estado, la gravedad y el responsable del incident (incidente).                                                                 |
| **Enviar una notificación de Slack cuando comience una reunión**       | Notifica al canal de Slack cuando se inicie una reunión, con los participantes y un enlace para unirse.<br><br>Proporciona un cómodo acceso a las llamadas de incident (incidente).     |
| **Activar Bits AI en canales de incident (incidente) de Slack**           | Activa funciones de IA que utilizan el contexto de incident (incidente) de Datadog.<br><br>Se aplica a todos los tipos de incident (incidente) en el espacio de trabajo de Slack seleccionado.                |
| **Archivar automáticamente los canales de Slack tras la resolución** | Archiva canales de incident (incidente) de Slack una vez resuelto el incident (incidente).<br><br>Ayuda a reducir el desorden en los canales.                                             |

## Canal mundial de actualizaciones de incidents (incidentes) 

Puedes configurar Incident Management para que publique automáticamente actualizaciones sobre incidentes en un canal de Slack seleccionado. Para activarlo:

1. En Datadog, ve a [**Incidents** (Incidentes) > **Settings** (Configuración) > **Integraions** (Integraciones][3].
1. En la sección Slack, activa **Enviar todas las actualizaciones de incident (incidente) a un canal global**.
1. Selecciona el espacio de trabajo de Slack y el canal de Slack donde deseas que se publiquen las actualizaciones de incidencias.

Datadog notifica automáticamente al canal seleccionado los nuevos incidentes declarados, así como los cambios en los estados de incident (incidente), las gravedades y los responsables del incident (incidente).

Bajo la superficie, esta función es una [regla de notificación integrada y oculta de incident (incidente)][5]. Si deseas personalizar el mensaje o sus desencadenantes, desactívala y define tu propia regla de notificación.

## Comandos de Slack

Puedes consultar la lista completa de comandos disponibles en Slack en cualquier momento escribiendo `/dd help` o `/datadog help` en Slack. Esto abrirá la referencia del comando directamente en tu espacio de trabajo de Slack. Para abrir la bandeja acción para acciones de gestión comunes de incident (incidente), escribe `/datadog`.

<table>
  <thead>
    <tr>
      <th scope="col">Categoría</th>
      <th scope="col">Comando</th>
      <th scope="col">Descripción</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td rowspan="3">Comandos globales (se ejecutan en cualquier lugar)</td>
      <td><code>/datadog incident</code></td>
      <td>Declara un nuevo incident (incidente).</td>
    </tr>
    <tr>
      <td><code>/datadog incident test</code></td>
      <td>Declara un nuevo test de incident (incidente) (si los incidentes de test están activados para el tipo de incident (incidente) ).</td>
    </tr>
    <tr>
      <td><code>/datadog incident list</code></td>
      <td>Enumera todos los incidentes abiertos (activos y estables).</td>
    </tr>
    <tr>
      <td rowspan="7">Comandos de canales de incident (incidente)</td>
      <td><code>/datadog</code></td>
      <td>Abre la bandeja de acción de incident (incidente) para realizar acciones comunes.</td>
    </tr>
    <tr>
      <td><code>/datadog incident update</code></td>
      <td>Actualiza el estado del incident (incidente), la gravedad u otro atributo del incident (incidente).</td>
    </tr>
    <tr>
      <td><code>/datadog incident notify</code></td>
      <td>Notifica <code> a @-handles</code> sobre el incident (incidente).</td>
    </tr>
    <tr>
      <td><code>/datadog incident private</code></td>
      <td>Hacer privado el incident (incidente) (si los incidentes privados están activados).</td>
    </tr>
    <tr>
      <td><code>/datadog incident (incidente) responders</code></td>
      <td>Gestiona el equipo de respuesta de incident (incidente)(añade respondedores y asigna roles de respondedor).</td>
    </tr>
    <tr>
      <td><code>/datadog task</code></td>
      <td>Crea una nueva tarea de incident (incidente).</td>
    </tr>
    <tr>
      <td><code>/datadog task list</code></td>
      <td>Lista las tareas existentes en el incident (incidente).</td>
    </tr>
  </tbody>
</table>


## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/integrations/slack/
[2]: /es/integrations/slack/?tab=datadogforslack
[3]: https://app.datadoghq.com/incidents/settings#Integrations
[4]: /es/integrations/jira/
[5]: /es/service_management/incident_management/incident_settings/notification_rules/
[6]: /es/integrations/slack/?tab=datadogforslack#permissions