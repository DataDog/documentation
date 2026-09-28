---
aliases:
- /es/service_management/on-call/
cascade:
  algolia:
    rank: 70
further_reading:
- link: https://www.datadoghq.com/blog/designing-on-call-sounds
  tag: Blog
  text: Cómo diseñamos sonidos de alerta empáticos para ingenieros On-Call
- link: https://www.datadoghq.com/blog/datadog-on-call/
  tag: Blog
  text: Enriquezca su experiencia On-Call usando Datadog On-Call
- link: https://www.datadoghq.com/blog/on-call-paging/
  tag: Blog
  text: Cómo crear una estrategia efectiva de paging
- link: https://www.datadoghq.com/blog/incidents-ai-workbench-status-page/
  tag: Blog
  text: Unifique la remediación y la comunicación con Datadog Incident Response
title: On-Call
---
Datadog On-Call integra seguimiento, paginación y respuesta a incidentes en una sola plataforma.

{{< img src="incident_response/on-call/oncall_overview.png" alt="Descripción general de cómo se enrutan las Pages. Desde un seguimiento, incidente, señal de seguridad o llamada a la API, la Page se envía a un Team (por ejemplo, 'payments-team'), luego a reglas de enrutamiento (por ejemplo, según la prioridad) y luego a una política de escalamiento. Allí, puede enviarse a un horario o directamente a un usuario." style="width:100%;" >}}

## Conceptos {#concepts}

- **Pages** representan un evento para recibir una alerta, como un seguimiento, incidente o señal de seguridad. Una Page puede tener un estado de `Triggered`, `Acknowledged` o `Resolved`.
- **Teams** son grupos configurados dentro de Datadog para manejar tipos específicos de Pages, según la experiencia y los roles operativos.
- **Routing rules** permiten a los Teams ajustar con precisión sus reacciones a tipos específicos de eventos entrantes. Estas reglas pueden establecer el nivel de urgencia de una Page, enrutar Pages a diferentes políticas de escalamiento según los metadatos del evento y configurar [support hours][7] para retrasar las notificaciones de escalamiento a ventanas de tiempo definidas.
- **Escalation policies** determinan cómo se escalan las Pages dentro o entre Teams.
- **Schedules** establecen horarios para cuando miembros específicos del Team están de On-Call para responder a las Pages.

## Cómo funciona {#how-it-works}

**Teams** son la unidad organizativa central de Datadog On-Call. Cuando se activa una notificación en Datadog, se envía una **Page** al Team On-Call designado.

{{< img src="incident_response/on-call/notification_page.png" alt="Notificación que menciona a un On-Call Team." style="width:80%;" >}}

Cada Team posee **escalation policies** y **schedules**. Las escalation policies definen cómo se envía una Page a varios schedules, como _Checkout Operations - Interrupt Handler_, _Primary_ y _Secondary_ en la siguiente captura de pantalla. Cada Team también puede configurar **routing rules** para dirigir las Pages a diferentes políticas de escalamiento.

{{< img src="incident_response/on-call/escalation_policy.png" alt="Una política de escalamiento de ejemplo." style="width:80%;" >}}

Un horario define momentos específicos en los que los miembros del Team están asignados para responder a las Pages. Los horarios organizan y gestionan la disponibilidad de los miembros del Team en diferentes zonas horarias y turnos.

{{< img src="incident_response/on-call/schedule.png" alt="Un horario de ejemplo, con múltiples capas para el horario laboral de JP, EU y EE. UU." style="width:80%;" >}}

## Control de acceso granular {#granular-access-control}

Utilice [controles de acceso granulares][3] para limitar los [roles][4], Teams o usuarios que pueden acceder a los recursos de On-Call. De forma predeterminada, el acceso a los horarios de On-Call, a las políticas de escalamiento y a las reglas de enrutamiento de Teams no está restringido.

Los controles de acceso granulares están disponibles para los siguientes recursos de On-Call:
- **Horarios**: controle quién puede visualizar, editar y sustituir horarios
- **Políticas de escalamiento**: controle quién puede visualizar y editar las políticas de escalamiento
- **Reglas de enrutamiento de Teams**: controle quién puede visualizar y editar las reglas de enrutamiento de Teams.

### Recursos y permisos admitidos {#supported-resources-and-permissions}

| Recurso de On-Call | Visor | Sustituto | Editor |
|------------------|--------|-----------|--------|
| **Schedules** | Puede ver horarios | Puede ver horarios y sustituir turnos | Puede ver, editar horarios y sustituir turnos |
| **Escalation policies** | Puede visualizar políticas de escalamiento | - | Puede ver y editar políticas de escalamiento |
| **Reglas de enrutamiento de Teams** | Puede ver reglas de Teams | - | Puede ver y editar reglas de Teams |

### Restringir el acceso a los recursos de On-Call {#restrict-access-to-on-call-resources}

Para restringir el acceso a un recurso de On-Call:

1. Navegue al recurso de On-Call específico (horario, política de escalamiento o reglas de enrutamiento de Teams).
1. Haga clic en **Administrar**.
1. Seleccione **Permisos** en el menú desplegable.
1. Haga clic en **Restringir acceso**.
1. Seleccione uno o más roles, Teams o usuarios en el menú desplegable.
1. Haga clic en **Agregar**.
1. Seleccione el nivel de acceso que desea asociar con cada uno de ellos en el menú desplegable junto a su nombre:
   - **Viewer**: Acceso de solo lectura para visualizar el recurso
   - **Overrider** (solo horarios): Puede visualizar y crear anulaciones de horario
   - **Editor**: Acceso completo para visualizar y modificar el recurso
1. Haga clic en **Guardar**.

**Nota**: Para mantener su acceso de edición al recurso, Datadog requiere que incluya al menos un rol del que usted sea miembro antes de guardar.

## Empiece a usar Datadog On-Call {#start-using-datadog-on-call}

<div class="alert alert-danger">Para preservar el historial de incidentes, Datadog On-Call no admite la eliminación de recursos como Pages, políticas de escalamiento o horarios. Para probar On-Call sin afectar su entorno de producción, cree una organización de prueba como entorno aislado.</div>

Para comenzar con On-Call, [incorpore un Team de On-Call][1] y asegúrese de que todos los miembros del Team configuren sus [preferencias de notificación de On-Call][2] para recibir notificaciones.

{{< whatsnext desc="Esta sección incluye los siguientes temas:">}}
  {{< nextlink href="/incident_response/on-call/teams">}}<u>Incorporar un Team</u>: Cree un nuevo Team de On-Call, agregue un Team de Datadog existente a On-Call o importe un Team desde PagerDuty.{{< /nextlink >}}
  {{< nextlink href="/incident_response/on-call/pages">}}<u>Pages</u>: Active Pages desde seguimientos, incidentes, señales de seguridad y otras fuentes. Reconozca, reasigne o resuelva Pages, o promuévalos a incidentes.{{< /nextlink >}}
  {{< nextlink href="/incident_response/on-call/escalation_policies">}}<u>Políticas de escalamiento</u>: Defina los pasos sobre cómo se envía una Page a diferentes horarios. {{< /nextlink >}}
  {{< nextlink href="/incident_response/on-call/schedules">}}<u>Horarios</u>: Defina los horarios para las rotaciones On-Call de los miembros del Team.{{< /nextlink >}}
  {{< nextlink href="/incident_response/on-call/notification_preferences">}}<u>Preferencias de notificación</u>: Configure sus métodos de contacto y preferencias de notificación para asegurarse de recibir Pages oportunas y efectivas.{{< /nextlink >}}
{{< /whatsnext >}}

## Facturación {#billing}

On-Call es un SKU basado en asientos. Para obtener más información sobre cómo se factura On-Call y cómo administrar los asientos dentro de Datadog, visite nuestra [página de precios][5] y la [documentación de facturación de Incident Response][6].

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/incident_response/on-call/teams
[2]: /es/incident_response/on-call/notification_preferences
[3]: /es/account_management/rbac/granular_access/
[4]: /es/account_management/rbac/#role-based-access-control
[5]: https://www.datadoghq.com/pricing/?product=incident-response#products
[6]: /es/account_management/billing/incident_response/
[7]: /es/incident_response/on-call/routing_rules#support-hours