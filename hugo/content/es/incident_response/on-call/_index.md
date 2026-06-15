---
aliases:
- /es/service_management/on-call/
cascade:
  algolia:
    rank: 70
further_reading:
- link: https://www.datadoghq.com/blog/designing-on-call-sounds
  tag: Blog
  text: Cómo diseñamos sonidos de alerta empáticos para ingenieros de guardia
- link: https://www.datadoghq.com/blog/datadog-on-call/
  tag: Blog
  text: Enriquece tu experiencia de guardia utilizando Datadog On-Call
- link: https://www.datadoghq.com/blog/on-call-paging/
  tag: Blog
  text: Cómo crear una estrategia efectiva para el envío de páginas
- link: https://www.datadoghq.com/blog/incidents-ai-workbench-status-page/
  tag: Blog
  text: Unifica la remediación y la comunicación con Datadog Incident Response
title: On-Call
---
Datadog On-Call integra seguimiento, envío de alertas y respuesta a incidentes en una sola plataforma.

{{< img src="service_management/oncall/oncall_overview.png" alt="Descripción general de cómo se enrutan las páginas. Desde un seguimiento, incidente, señal de seguridad o llamada a la API, la página se envía a un equipo (por ejemplo, 'equipo-de-pagos'), luego a reglas de enrutamiento (por ejemplo, basadas en prioridad) y luego a una política de escalamiento. Allí, puede ser enviada a un horario o directamente a un usuario." style="width:100%;" >}}

## Conceptos {#concepts}

- **Las páginas** representan aquello que activa una alerta, como un monitor, un incidente o una señal de seguridad. Una página puede tener un estado de `Triggered`, `Acknowledged` o `Resolved`.
Los equipos son grupos configurados dentro de Datadog para manejar tipos específicos de páginas, basados en la experiencia y en roles operativos.
- **Las reglas de enrutamiento** permiten a los equipos ajustar finamente sus reacciones a tipos específicos de eventos entrantes. Estas reglas pueden establecer el nivel de urgencia de una página, enrutar páginas a diferentes políticas de escalamiento dependiendo de los metadatos del evento, y configurar [horas de soporte][7] para retrasar las notificaciones de escalamiento a ventanas de tiempo definidas.
- **Las políticas de escalamiento** determinan cómo se escalan las páginas dentro o entre equipos.
- **Los horarios** establecen cronogramas para cuándo los miembros específicos del equipo están de guardia para responder a las páginas.

## Cómo funciona {#how-it-works}

**Los equipos** son la unidad organizativa central de Datadog On-Call. Cuando se activa una notificación en Datadog, se envía una **página** al equipo On-Call designado.

{{< img src="service_management/oncall/notification_page.png" alt="Notificación que menciona un equipo On-Call." style="width:80%;" >}}

Cada equipo posee **políticas de escalamiento** y **horarios**. Las políticas de escalamiento definen cómo se envía una página a varios horarios, como _Operaciones de Checkout - Manejador de Interrupciones_, _Primario_ y _Secundario_ en la siguiente captura de pantalla. Cada equipo también puede configurar **reglas de enrutamiento** para dirigir páginas a diferentes políticas de escalamiento.

{{< img src="service_management/oncall/escalation_policy.png" alt="Una política de escalamiento de muestra." style="width:80%;" >}}

Un horario define momentos específicos cuando los miembros del equipo están asignados para responder a páginas. Los horarios organizan y gestionan la disponibilidad de los miembros del equipo a través de diferentes zonas horarias y turnos.

{{< img src="service_management/oncall/schedule.png" alt="Un horario de muestra, con múltiples capas para los horarios laborales de JP, EU y US." style="width:80%;" >}}

## Control de acceso granular {#granular-access-control}

Utilice [controles de acceso granulares][3] para limitar los [roles][4], equipos o usuarios que pueden acceder a los recursos de On-Call. Por defecto, el acceso a los horarios de On-Call, políticas de escalamiento y reglas de enrutamiento de equipo es sin restricciones.

Los controles de acceso granulares están disponibles para los siguientes recursos de On-Call:
- **Horarios**: Controlar quién puede ver, editar y anular horarios
- **Políticas de escalamiento**: Controlar quién puede ver y editar políticas de escalamiento
- **Reglas de enrutamiento de equipo**: Controlar quién puede ver y editar reglas de enrutamiento de equipo

### Recursos y permisos soportados {#supported-resources-and-permissions}

| Recurso de On-Call | Visor | Anulador | Editor |
|------------------|--------|-----------|--------|
| **Horarios** | Puede ver horarios | Puede ver horarios y anular turnos | Puede ver, editar horarios y anular turnos |
| **Políticas de escalamiento** | Puede ver las políticas de escalamiento | - | Puede ver y editar las políticas de escalamiento |
| **Reglas de enrutamiento de equipo** | Puede ver las reglas del equipo | - | Puede ver y editar las reglas del equipo |

### Restringir el acceso a los recursos de On-Call {#restrict-access-to-on-call-resources}

Para restringir el acceso a un recurso de On-Call:

1. Navegue hasta el recurso de On-Call específico (horario, política de escalamiento o reglas de enrutamiento de equipo).
1. Haga clic en **Administrar**.
1. Seleccione **Permisos** del menú desplegable.
1. Haga clic en **Restringir acceso**.
1. Seleccione uno o más roles, equipos o usuarios del menú desplegable.
1. Haga clic en **Agregar**.
1. Seleccione el nivel de acceso que desea asociar con cada uno de ellos del menú desplegable junto a su nombre:
   - **Visor**: Acceso solo de lectura para ver el recurso
   - **Anulador** (solo horarios): Puede ver y crear anulaciones de horarios
   - **Editor**: Acceso completo para ver y modificar el recurso
1. Haga clic en **Guardar**.

**Nota**: Para mantener su acceso de edición al recurso, Datadog requiere que incluya al menos un rol del cual sea miembro antes de guardar.

## Comience a usar Datadog On-Call {#start-using-datadog-on-call}

<div class="alert alert-danger">Para preservar el historial de incidentes, Datadog On-Call no admite la eliminación de recursos como Páginas, políticas de escalamiento o horarios. Para probar On-Call sin afectar su entorno de producción, cree una organización de prueba como un entorno de pruebas.</div>

Para comenzar con On-Call, [incorpore un On-Call Team][1] y asegúrese de que todos los miembros del equipo configuren sus [On-Call profile settings][2] para recibir notificaciones.

{{< whatsnext desc="Esta sección incluye los siguientes temas:">}}
  {{< nextlink href="/incident_response/on-call/teams">}}<u>Incorpore un On-Call Team</u>: Cree un nuevo On-Call Team, agregue un equipo existente de Datadog a On-Call, o importe un equipo desde PagerDuty.{{< /nextlink >}}
  {{< nextlink href="/incident_response/on-call/pages">}}<u>Páginas</u>: Genere páginas a partir de monitores, incidentes, señales de seguridad y otras fuentes. Reconocer, reasignar o resolver páginas, o promoverlas a incidentes.{{< /nextlink >}}
  {{< nextlink href="/incident_response/on-call/escalation_policies">}}<u>Políticas de escalamiento</u>: Definir pasos sobre cómo se envía una página a diferentes horarios. {{< /nextlink >}}
  {{< nextlink href="/incident_response/on-call/schedules">}}<u>Horarios</u>: Definir horarios para las rotaciones de guardia de los miembros del equipo.{{< /nextlink >}}
  {{< nextlink href="/incident_response/on-call/profile_settings">}}<u>Profile Settings</u>: Configure sus métodos de contacto y preferencias de notificación para asegurarse de recibir páginas oportunas y efectivas.{{< /nextlink >}}
{{< /whatsnext >}}

## Facturación {#billing}

On-Call es un SKU basado en asientos. Para aprender más sobre cómo se factura On-Call y cómo gestionar asientos dentro de Datadog, visite nuestra [página de precios][5] y la [Incident Response billing documentation][6].

## Lectura adicional {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/incident_response/on-call/teams
[2]: /es/incident_response/on-call/profile_settings
[3]: /es/account_management/rbac/granular_access/
[4]: /es/account_management/rbac/#role-based-access-control
[5]: https://www.datadoghq.com/pricing/?product=incident-response#products
[6]: /es/account_management/billing/incident_response/
[7]: /es/incident_response/on-call/routing_rules#support-hours