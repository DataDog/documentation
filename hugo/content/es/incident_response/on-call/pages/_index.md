---
aliases:
- /es/service_management/on-call/pages/
- /es/service_management/on-call/triggering_pages/
- /es/incident_response/on-call/triggering_pages/
further_reading:
- link: /incident_response/on-call/
  tag: Documentación
  text: Datadog On-Call
- link: /incident_response/incident_management/
  tag: Documentación
  text: Incident Management
title: Pages
---
Una Page es una alerta que requiere la atención de un On-Call responder. Las Pages pasan por el siguiente ciclo de vida:

- **Triggered**: La Page se ha enviado, pero nadie ha asumido la propiedad. La política de escalamiento se ejecuta de acuerdo con su configuración, notificando a responsables adicionales si nadie responde dentro del plazo definido.
- **Acknowledged**: Un responsable ha reclamado la Page. Las notificaciones de escalamiento se detienen y el On-Call responder comienza a trabajar en el problema.
- **Resolved**: El problema subyacente se ha solucionado y la Page se cierra.

Esta guía explica cómo disparar, reconocer, reasignar y resolver Pages.

## Trigger a Page {#trigger-a-page}

Una Page se envía a un Team y se dirige a través de sus políticas de escalamiento y horarios. Después de que su Team esté [onboarded to Datadog On-Call][1], puede comenzar a enviarle Pages.

### Trigger Pages from monitors {#trigger-pages-from-monitors}

Envíe una Page mencionando el identificador de un Team con `oncall-` antepuesto. Por ejemplo, para enviar una Page al Checkout Operations Team (`@checkout-operations`), mencione `@oncall-checkout-operations`.

{{< img src="incident_response/on-call/notification_page.png" alt="Notificación que menciona a un On-Call Team." style="width:80%;" >}}

Puede enviar Pages a On-Call Teams en cualquier lugar donde se admitan menciones con @, incluidos seguimientos, Incident Management, reglas de detección de seguridad y Event Management.

#### Resolving Pages automatically {#resolving-pages-automatically}

Cuando un seguimiento se recupera, cualquier Page que haya disparado se establece automáticamente en `Resolved` si la notificación de recuperación incluye la mención del On-Call Team (por ejemplo, `@oncall-payments`).

Si la mención aparece solo en la plantilla de alerta (por ejemplo, dentro de "{{#is_alert}} ... {{/is_alert}}`) y no en el mensaje de recuperación, la Page no se resuelve automáticamente.

#### Seguimientos y urgencias dinámicas {#monitors-and-dynamic-urgencies}

Si envía una Page a través de una alerta de seguimiento y la regla de enrutamiento del Team utiliza urgencias dinámicas:
- Si se supera el umbral de ADVERTENCIA, la urgencia de la Page se establece en `low`.
- Si se supera el umbral de ALERTA, la urgencia de la Page se establece en `high`.

#### Renotificación del seguimiento {#monitor-renotification}

Cuando un seguimiento está configurado para [enviar renotificaciones][8] a un On-Call Team, el comportamiento depende del estado actual de la Page:

- **La Page está resuelta**: El seguimiento vuelve a notificar y crea una nueva Page, la cual se enruta a través de la política de escalamiento del Team.
- **La Page está reconocida**: El seguimiento vuelve a notificar y la Page se vuelve a activar, reanudando la política de escalamiento en el paso que estaba en curso cuando se reconoció la Page. 
- **Page is triggered**: Si todos los pasos de la política de escalamiento ya se han ejecutado pero nadie ha reconocido la Page, el seguimiento vuelve a notificar y la Page se vuelve a activar, reiniciando la política de escalamiento desde el principio.

### Trigger Pages through email {#trigger-pages-through-email}

Genere una dirección de correo electrónico única para trigger un Page directamente a los responsables On-Call de un Team. Los correos electrónicos enviados a esta dirección siguen las políticas de enrutamiento y escalamiento configuradas del Team.

Algunos Teams integran esta dirección en una lista de distribución legible por humanos (por ejemplo, `page-network@company.com`) para hacerla más reconocible.

Para enviar un Page a un Team por correo electrónico:

1. Vaya a la página del Team y desplácese hasta **Custom Triggering Sources**.
1. En la sección de activación por correo electrónico, haga clic en **Generar**.

### Trigger Pages through incidents {#trigger-pages-through-incidents}

Trigger un Page directamente desde un incidente activo para escalar e involucrar a responsables adicionales sin salir del flujo de trabajo. Consulte [Trigger a Page from an incident][5] para obtener instrucciones detalladas.

### Trigger Pages through calls {#trigger-pages-through-calls}

Trigger un Page a través de [Live Call Routing][3] llamando a un número de teléfono dedicado.

### Trigger Pages manually {#trigger-pages-manually}

Envíe un Page desde la plataforma de Datadog, o a través de una herramienta como Slack o Microsoft Teams. Esto le permite alertar a un Team o a una persona directamente, incluso si no están On-Call.

#### A través de Datadog {#through-datadog}

1. Vaya a [**On-Call** > **Teams**][2].
1. Busque el Team al que desea enviar el Page. Seleccione **Page**.
   {{< img src="incident_response/on-call/pages/manual_page.png" alt="La lista de On-Call Teams, que muestra el Checkout Operations Team. Se muestran tres botones: Schedules, Escalation Policies, Page." style="width:80%;" >}}
1. Ingrese un **Page title** y agregue más contexto en el campo **Description**. Seleccione **Page**.

Las Pages enviadas manualmente a través de Datadog son siempre de urgencia `high`.

#### A través de Slack {#through-slack}

1. Instale la aplicación de Datadog para Slack.
1. Ingrese `/datadog page` o `/dd page`.
1. Seleccione un Team al cual enviar una Page.

Las Pages enviadas desde Slack son siempre de urgencia `high`.

Para recibir notificaciones de Page en Slack, consulte [Routing Rules][4].

## Responder a una Page {#respond-to-a-page}

Vaya a [**On-Call** > **Pages**][7] para visualizar todas las Pages activas e históricas. Haga clic en una Page para abrir su panel lateral y tomar medidas, o seleccione la casilla de verificación junto a una o más Pages para editarlas de forma masiva.

{{< img src="incident_response/on-call/pages/on-call-pages-list.png" alt="La vista de lista de On-Call Pages con subpestañas para Active, Triggered, Acknowledged, Resolved y All, y una tabla que muestra el nombre, el estado, el Team, los responsables y la fecha de creación de cada Page." style="width:100%;" >}}

### Reconocer una Page {#acknowledge-a-page}

Reconocer una Page indica que está trabajando activamente en ella y evita que la política de escalamiento notifique al siguiente nivel de responsables. Si no reconoce la Page, el escalamiento continúa y se puede notificar a responsables adicionales.

Para reconocer una Page:

1. Haga clic en la Page para abrir su panel lateral.
1. En **Next Steps**, seleccione **Acknowledge**.

El estado de la Page cambia a `Acknowledged`.

{{< img src="incident_response/on-call/pages/on-call-page-next-steps.png" alt="Un panel lateral de On-Call Page que muestra el estado, la urgencia, el responsable y el servicio de la Page, con botones de Next Steps para Acknowledge, Reassign, Resolve, Escalate, Snooze o Declare Incident" style="width:70%;" >}}

### Snooze a Page {#snooze-a-page}

Snoozing pausa la política de escalamiento para una Page que usted ha visto pero no está listo para actuar, sin reclamar la propiedad de la forma en que lo hace el reconocimiento. Solo el On-Call responder notificado actualmente para la Page puede utilizar la función Snooze. Seleccione cuánto tiempo pausar el escalamiento y, si nadie reconoce o resuelve la Page antes de que finalice ese período, la política de escalamiento se reanuda y notifica nuevamente al On-Call responder.

Para usar Snooze en una Page:

1. Haga clic en la Page para abrir su panel lateral.
1. En **Next Steps**, seleccione la flecha junto a **Snooze** y elija una duración preestablecida, o seleccione **At a specific time** para elegir una fecha y hora personalizadas.

   {{< img src="incident_response/on-call/pages/on-call-snooze-page.png" alt="Un panel lateral de On-Call Page con el menú desplegable Snooze abierto, que muestra opciones preestablecidas para volver a notificar al nivel de escalamiento en 10 minutos, 30 minutos, 1 hora, 4 horas, 12 horas o en un momento específico" style="width:70%;" >}}

1. Haga clic en **Snooze**.

**Nota**: Snoozing a Page también está disponible en la aplicación móvil de Datadog.

El estado de la Page permanece `Triggered` mientras está en Snooze. Cuando finaliza el período de posposición, la política de escalamiento se reanuda y notifica nuevamente al nivel de escalamiento actual.

### Reassign a Page {#reassign-a-page}

Reasigne una Page si se envió a la persona o Team incorrecto, o si necesita transferir la propiedad a alguien mejor posicionado para responder. Cuando reasigna una Page, el historial de la Page permanece intacto.

Para reasignar una página:

1. Haga clic en la Page para abrir su panel lateral.
1. En **Siguientes pasos**, seleccione **Reasignar**. Esto abre una ventana modal de **Reasignar página**.

   {{< img src="incident_response/on-call/pages/on-call-reassign-page.png" alt="La ventana modal de Reasignar página con un interruptor para reasignar a un equipo o usuario, un menú desplegable de selección de equipo y un campo de comentario opcional" style="width:60%;" >}}

1. Seleccione el usuario o equipo al cual reasignar.
1. Opcionalmente, agregue un comentario explicando la transferencia.
1. Haga clic en **Reasignar**.

El nuevo destinatario recibe una notificación de inmediato.

**Nota**: Solo puede reasignar páginas con un estado de `Triggered` o `Acknowledged`.

### Resolver una página {#resolve-a-page}

Resuelva una página cuando se haya solucionado el problema subyacente. Esto cierra la página y establece su estado en `Resolved`.

Para resolver una página:

1. Haga clic en la Page para abrir su panel lateral.
1. En **Siguientes pasos**, seleccione **Resolver**.

Si la página fue activada por un seguimiento, se resuelve automáticamente cuando el seguimiento se recupera, siempre que la notificación de recuperación incluya la mención del equipo On-Call. Consulte [Activar una página](#trigger-a-page) para obtener más detalles.

### Declarar un incidente desde una página {#declare-an-incident-from-a-page}

Si una página requiere coordinación entre equipos, comunicación con las partes interesadas o seguimiento formal, promuévala a incidente. Esto crea un incidente en [Incident Management][6] con el contexto de la página precargado.

Para declarar un incidente:

1. Haga clic en la Page para abrir su panel lateral.
1. En **Siguientes pasos**, seleccione **Declarar incidente**.
1. Revise y ajuste los detalles precargados según sea necesario.

   {{< img src="incident_response/on-call/pages/on-call-declare-incident-demo.png" alt="El modal Declarar incidente precargado con el título y el resumen de la página, con campos para el tipo de incidente, el nivel de gravedad, el comandante del incidente y el equipo" style="width:100%;" >}}

1. Seleccione **Declarar incidente** para confirmar.

Para obtener orientación sobre los niveles de gravedad de los incidentes y los roles de los respondedores, consulte [Incident Management][6].

### Agregar un comentario {#add-a-comment}

La línea de tiempo de la página es un registro de actividad que registra cuándo se activó la página, quién fue notificado y cómo progresó la escalada. Puede agregar sus propios comentarios para proporcionar contexto a otros respondedores.

{{< img src="incident_response/on-call/pages/on-call-timeline-demo.png" alt="La sección Línea de tiempo de una página On-Call que muestra un campo de entrada de comentarios y un registro de actividad de eventos, incluido el activador de la página, las notificaciones enviadas y la confirmación" style="width:60%;" >}}

Use los comentarios para:
- Documente lo que ya ha investigado o descartado
- Proporcione contexto al transferir a otro responsable
- Registre los factores externos que afectaron su respuesta

Para agregar un comentario, abra la página e ingrese su texto en la sección **Línea de tiempo**.

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/incident_response/on-call/teams
[2]: https://app.datadoghq.com/on-call/teams
[3]: /es/incident_response/on-call/pages/live_call_routing
[4]: /es/incident_response/on-call/routing_rules/#send-pages-to-slack-or-microsoft-teams
[5]: /es/incident_response/incident_management/notification/#trigger-a-page-from-an-incident
[6]: /es/incident_response/incident_management/
[7]: https://app.datadoghq.com/on-call/pages
[8]: /es/monitors/notify/#renotify