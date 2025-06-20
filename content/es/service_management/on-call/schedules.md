---
further_reading:
- link: /service_management/on-call/
  tag: Documentation
  text: Datadog On-Call
title: Cronogramas
---

En Datadog On-Call, los cronogramas definen las horas concretas en las que los miembros del equipo están disponibles para responder a las consultas. Los cronogramas organizan y gestionan la disponibilidad de los miembros del equipo en diferentes zonas horarias y turnos.

### Conceptos

Los cronogramas On-Call se estructuran en niveles, cada uno de los cuales abarca diferentes partes de la semana o responsabilidades específicas.

Considera el siguiente ejemplo de cronograma:

{{< img src="service_management/oncall/schedule.png" alt="Un cronograma de ejemplo, con múltiples capas para husos horarios de JP, UE y EE. UU." style="width:100%;" >}}

Hay cuatro capas:
- **Horario comercial de JP**: una persona llamada DM cubre el horario comercial japonés, que comienza (desde una perspectiva UTC) cada día. Se repite todos los días de lunes a viernes.
- **Horario comercial de la UE**: a continuación, DB gestiona el horario comercial europeo. Se repite todos los días de lunes a viernes.
- **Horario laboral en EE. UU**: por último, BS está de guardia en horario comercial de EE. UU., al final (desde una perspectiva UTC) de cada día. Se repite todos los días de lunes a viernes.
- **Anulaciones**: las anulaciones permiten realizar cambios en el horario, como ajustes temporales de turnos y días festivos. Consulta [Anulaciones](#overrides).

El **Cronograma final** se compone de todas las capas. Las capas inferiores tienen prioridad sobre los superiores.

### Crear un cronograma

1. Ve a [**On-Call** > **Schedules**][1] (On-Call > Cronogramas).
1. Selecciona [**+ New Schedule**][2] (+ Cronograma nuevo).
1. Proporciona un **Name** (Nombre) para tu cronograma, selecciona un **Schedule Time Zone** (Huso horario de cronograma) a utilizar, y selecciona los **Teams** (Equipos) que poseen este horario.
1. Añadir capas:
   - **Inicio**: la fecha y hora en la que entra en vigor el cronograma. Los turnos no aparecen antes de esta fecha y hora.
   - **Duración del turno**: la duración de cada turno; efectivamente, cuando el cronograma se repite. Las opciones incluyen:
      - _Un día_ (24 horas)
      - _Una semana_ (168 horas)
      - _Personalizado_
   - **Hora de relevo**: la fecha y hora en la que se intercambian los turnos con la siguiente persona.
   - **Hora de finalización**: la fecha y hora a partir de la cual no se programan más turnos para esta capa.
   - **Condiciones**: condiciones horarias aplicadas a cada turno. Permite restringir el horario de los turnos de guardia. Por ejemplo, de lunes a viernes de 9:00 a 17:00.
   - **Miembros**: la lista de los individuos que realizan funciones de guardia. Estas personas realizan los turnos en el orden en que se añaden a la lista.
1. Selecciona **Create** (Crear).

### Hacer referencia a un cronograma dentro de una política de escalada
Para enviar una página a la persona de guardia para un cronograma determinado, haz referencia al cronograma dentro de una política de escalada. Al crear o editar una política de escalada, utiliza el menú desplegable **Notify** (Notificar) del paso de escalada para buscar y seleccionar el cronograma deseado. La política de escalada envía una página a la persona que está de guardia cuando se activa la página.

### Anulaciones {#overrides}
Las anulaciones son modificaciones realizadas en los turnos de guardia programados. Pueden adaptarse a cambios como ajustes temporales de turnos y vacaciones.

{{< img src="service_management/oncall/schedule_override.png" alt="Cuando se edita un cronograma, se selecciona un turno. Aparece un cuadro de diálogo con un botón Anular." style="width:100%;" >}}

Para anular total o parcialmente un turno, selecciona el turno y haz clic en **Override** (Anular).

#### Anulaciones de solicitud en Slack o Microsoft Teams

Si formas parte de una rotación On-Call y sabes que estarás fuera de la oficina durante tu turno, puedes solicitar una anulación en Slack o Microsoft Teams. Escribe `/dd override`, selecciona la franja horaria que deseas anular y añade una descripción. Esto envía una solicitud al canal:

{{< img src="service_management/oncall/schedule_override_request.png" alt="En Slack, un mensaje de Datadog Staging dice: '@Daljeet has an override request. Schedule: [Primary] Payments & Transactions (payments-transactions). Start: Today, 1:00PM. End: Today, 3:00 PM. Duration: 2h. Note: Doctor's appointment. Will offer cookies for override.' Un botón etiquetado 'Take it' (Aceptar) aparece al final del mensaje." style="width:80%;" >}}

Otros miembros del canal pueden seleccionar **Take it** (Aceptar) para programarse a sí mismos y anular tu turno.

### Exportar cronogramas

La función Exportar turnos te permite integrar tu cronograma de guardia en tu aplicación de calendario de preferencia (por ejemplo, Google Calendar, Apple Calendar o Outlook) mediante un enlace `.webcal`. Tanto si formas parte de varias rotaciones, como si planificas tu tiempo personal en función de los turnos o pretendes aumentar la visibilidad del equipo, esta función asegura que tus responsabilidades de guardia sean accesibles y estén siempre actualizadas.

#### Exportación y sincronización de cronogramas
1. Para generar un enlace `.webcal`, ve a la sección [**On-Call** > **Schedules**][1] (On-Call > Cronogramas) de tu cuenta.
2. Selecciona **Export My Shifts** (Exportar mis turnos). Se generará automáticamente un enlace para ti.
3. Pulsa **Copy Link** (Copiar enlace).
4. Después de copiar el enlace, utilízalo en tu aplicación de calendario. Por ejemplo:
    - Google Calendar: [sigue estas instrucciones de Google (en "Utilizar un enlace para añadir un calendario público")][3].
    - Outlook: [Guía de Microsoft para suscribirte a calendarios de Internet][4].
    - Calendario de Apple: [aprende a suscribirte a calendarios en Mac o iPhone][5].

Si tu cronograma de guardia cambia, las actualizaciones se reflejan automáticamente en el calendario vinculado, asegurando que siempre tengas la visión más precisa de tus responsabilidades. Si es necesario, revoca el acceso a un enlace previamente compartido generando uno nuevo, que invalida la URL anterior.

La mayoría de las aplicaciones de calendario admiten notificaciones, que son recordatorios habilitados para recibir alertas antes de que comiencen tus turnos; también puedes configurar recordatorios de turnos a través de SMS, notificación push y correo electrónico en tu [configuración del perfil de Datadog On-Call][6].

#### Solucionar problemas con exportaciones de cronogramas

Si tienes problemas al exportar los datos de tu cronograma On-Call a Google Calendar (por ejemplo, ""could not fetch URL" [no se pudo obtener la URL]) o Outlook ("Couldn't import calendar. Try again" [No se pudo importar el calendario. Inténtalo de nuevo]), prueba las siguientes soluciones cuando te suscribas inicialmente al calendario a través de la URL:

- Cambia `webcal://` por `http://` o `https://` al principio de la URL. Por ejemplo, cambia `webcal://<your_personal_link>` por `http://<your_personal_link>`.

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/on-call/schedules
[2]: https://app.datadoghq.com/on-call/schedules/create
[3]: https://support.google.com/calendar/answer/37100?hl=en&co=GENIE.Platform%3DDesktop
[4]: https://support.microsoft.com/en-us/office/import-or-subscribe-to-a-calendar-in-outlook-com-or-outlook-on-the-web-cff1429c-5af6-41ec-a5b4-74f2c278e98c
[5]: https://support.apple.com/en-us/102301
[6]: /es/service_management/on-call/profile_settings/