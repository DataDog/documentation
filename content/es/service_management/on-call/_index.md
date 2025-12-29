---
cascade:
  algolia:
    rank: 70
further_reading:
- link: https://www.datadoghq.com/blog/datadog-on-call/
  tag: Blog
  text: Enriquece tu experiencia de guardia utilizando la función On-Call de Datadog
- link: https://www.datadoghq.com/blog/on-call-paging/
  tag: Blog
  text: Cómo crear una estrategia de paginación eficaz
- link: https://www.datadoghq.com/blog/incidents-ai-workbench-status-page/
  tag: Blog
  text: Unificar la reparación y la comunicación con Datadog Incident Response
title: On-Call
---

Datadog On-Call integra la monitorización, la localización de personas y la respuesta a incidencias en una sola plataforma.

{{< img src="service_management/oncall/oncall_overview.png" alt="Información general sobre cómo se enrutan los localizadores. Desde un monitor, incidente, señal de seguridad o llamada a la API, el localizador se envía a un equipo (por ejemplo, 'payments-team'), luego a reglas de enrutamiento (por ejemplo, según la prioridad), luego a una política de escalado. Entonces, se lo puede enviar a un cronograma o directamente a un usuario." style="width:100%;" >}}

## Conceptos

- Los **localizadores** representan algo por lo que recibir una alerta, como un monitor, un incidente o una señal de seguridad. Un localizador puede tener un estado de `Triggered`, `Acknowledged` o `Resolved`.
- Los **equipos** son grupos configurados dentro de Datadog para gestionar tipos específicos de localizadores, en función de la experiencia y los roles operativos.
- **Las reglas de enrutamiento** permiten a Teams ajustar con precisión sus reacciones a tipos específicos de eventos entrantes. Estas reglas pueden establecer el nivel de urgencia del localizador y dirigir los localizadores a diferentes políticas de escalado en función de los metadatos del evento.
- **Las políticas de escalado** determinan cómo se escalan los localizadores dentro de los equipos o entre ellos.
- Los **Cronogramas** establecen los horarios en los que determinados miembros del equipo están de guardia para responder a los localizadores.

## Cómo funciona

Los **Equipos** son la unidad organizativa central de Datadog On-Call. Cuando se activa una notificación en Datadog, se envía un **localizador** al equipo de On-Call designado.

{{< img src="service_management/oncall/notification_page.png" alt="Notificación que menciona un equipo de On-Call." style="width:80%;" >}}

Cada Team posee **políticas de escalado** y **cronogramas**. Las políticas de escalado definen cómo se envía un localizador a varios cronogramas, como _Checkout Operations - Interrupt Handler_, _Primary_ y _Secondary_ en la siguiente captura de pantalla. Cada equipo también puede configurar **reglas de enrutamiento** para enrutar localizadores a diferentes políticas de escalado.

{{< img src="service_management/oncall/escalation_policy.png" alt="Un ejemplo de política de escalada." style="width:80%;" >}}

Un cronograma define las horas específicas en las que los miembros del equipo están asignados para responder a los localizadores. Los cronogramas organizan y gestionan la disponibilidad de los miembros del equipo en diferentes zonas horarias y turnos.

{{< img src="service_management/oncall/schedule.png" alt="Un cronograma de ejempo, con múltiples capas para horas laborables de JP, UE y EE. UU." style="width:80%;" >}}

## Control de acceso preciso

Utiliza [controles de acceso precisos][3] para limitar los [roles][4], los equipos o los usuarios que pueden acceder a los recursos de guardia. Por defecto, el acceso a los cronogramas de On-Call, las políticas de escalado y las reglas de derivación a equipos no está restringido.

Existen controles de acceso precisos para los siguientes recursos de On-Call:
- **Cronogramas**: Controla quién puede ver, editar y anular los cronogramas.
- **Políticas de escalado**: Controla quién puede ver y editar las políticas de escalado.
- **Reglas de derivación a equipos**: Controla quién puede ver y editar las reglas de derivación a equipos.

### Recursos y permisos compatibles

| Recursos de On-Call | Visor | Anulación | Editor |
|------------------|--------|-----------|--------|
| **Cronogramas** | Se pueden consultar los cronogramas | Se pueden consultar los cronogramas y anular los turnos | Se puede ver, editar cronogramas y anular turnos |
| **Políticas de escalado** | Se pueden consultar las políticas de escalado | - | Se pueden ver y editar las políticas de escalado |
| **Reglas de derivación a equipos** | Se pueden ver las reglas de equipos | - | Se pueden ver y editar las reglas de equipos |

### Restringir el acceso a recursos de On-Call

Para restringir el acceso a un recurso de On-Call:

1. Ve al recurso de On-Call específico (cronograma, política de escalado, reglas de derivación a equipos
1. Haz clic en **Manage** (Gestionar).
1. Selecciona **Permissions** (Permisos) en el menú desplegable.
1. Haz clic en **Restrict Access** (Restringir el acceso).
1. Selecciona uno o varios roles, equipos o usuarios en el menú desplegable.
1. Haz clic en **Add** (Añadir).
1. Selecciona el nivel de acceso que quieres asociar a cada uno de ellos en el menú desplegable situado junto a su nombre:
   - **Visor**: Acceso de solo lectura para ver el recurso.
   - **Anulación** (solo cronogramas): Se pueden ver y crear anulaciones de cronogramas. 
   - **Editor**: Acceso total para ver y modificar el recurso.
1. Haz clic en **Save** (Guardar).

**Nota**: Para mantener tu acceso de edición al recurso, Datadog requiere que incluyas al menos un rol del que seas miembro antes de guardar.

## Empiece a utilizar Datadog On-Call

<div class="alert alert-danger">Para conservar el historial de incidentes, Datadog On-Call no admite la eliminación de recursos como páginas, políticas de escalado u horarios. Para testear On-Call sin afectar a tu entorno de producción, crea una organización de prueba como un entorno de pruebas.</div>

Para empezar con On-Call [incorpora un equipo de On-Call][1] y asegúrate de que todos los miembros del equipo configuran sus [ajustes del perfil de On-Call][2] para recibir notificaciones.

{{< whatsnext desc="Esta sección incluye los siguientes temas:">}}
  {{< nextlink href="/service_management/on-call/teams">}}<u>Incorpora un equipo</u>: Crea un nuevo equipo de On-Call, añade un equipo de Datadog existente a On-Call o importa un equipo desde PagerDuty.{{< /nextlink >}}
  {{< nextlink href="/service_management/on-call/triggering_pages">}}<u>Activa un localizador</u>: Envía un localizador en monitores, incidentes, señales de seguridad, etc., o envía un localizador manualmente a través de Datadog, Slack, Microsoft Teams o la API Datadog. {{< /nextlink >}}
  {{< nextlink href="/service_management/on-call/escalation_policies">}}<u>Políticas de escalado</u>: Define los pasos para enviar un localizador a diferentes cronogramas. {{< /nextlink >}}
  {{< nextlink href="/service_management/on-call/schedules">}}<u>Cronogramas</u>: Define horarios para las rotaciones de guardias de los miembros del equipo.{{< /nextlink >}}
  {{< nextlink href="/service_management/on-call/profile_settings">}}<u>Parámetros de perfiles</u>: Configura tus métodos de contacto y tus preferencias de notificación para asegurarte de recibir localizadores oportunos y efectivos.{{< /nextlink >}}
{{< /whatsnext >}}

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/service_management/on-call/teams
[2]: /es/service_management/on-call/profile_settings
[3]: /es/account_management/rbac/granular_access/
[4]: /es/account_management/rbac/#role-based-access-control