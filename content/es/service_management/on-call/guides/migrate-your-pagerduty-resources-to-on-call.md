---
further_reading:
- link: /service_management/on-call/
  tag: Documentación
  text: Documentación de On-Call
- link: /integrations/pagerduty/
  tag: Documentación
  text: Integración con PagerDuty
title: Migración de los recursos de PagerDuty a Datadog On-Call
---

## Información general

Sigue este flujo de trabajo de migración para recrear la estructura de tus servicios de guardia de PagerDuty en Datadog, equipo por equipo. Se reutilizan los horarios y las políticas de escalado de PagerDuty existentes como bloques de construcción para que puedas revisar, ajustar o descartar recursos antes de que se activen.

Al recrear la cconfiguración de tus servicios de guardia utilizando únicamente los datos actuales y relevantes de PagerDuty, evitarás introducir cualquier desorden previo en Datadog y comenzarás con una configuración concisa y fácil de mantener.

## Requisitos previos

1. Configura la [integración PagerDuty][1] en Datadog.
1. Crea una clave de API de PagerDuty, si aún no tienes una, que pueda leer recursos de PagerDuty como horarios, políticas de escalado y equipos.
1. Confirma que tu usuario tiene permisos `on_call_write` y `teams_manage`.

## Pasos de la migración

### Seleccionar el equipo que se va a migrar

1. Consulta la [lista de equipos de On-Call][2] y selecciona **Add Team to On‐Call** > **Import team from PagerDuty** (Añadir equipo a On-Call > Importar equipo desde PagerDuty). Datadog carga todos tus equipos desde PagerDuty.
1. Elige el equipo que quieres migrar y selecciona **Next** (Siguiente). Un panel de vista previa muestra los miembros del equipo y la configuración.

{{< img src="service_management/oncall/pagerduty_migration_import_team.png" alt="Interfaz de usuario que enumera equipos de PagerDuty y muestra una vista previa del equipo seleccionado" style="width:95%;" >}}

### Asignar el equipo y sus miembros

1. Selecciona una de las siguientes opciones:

   - **Asignar a otro equipo de Datadog**: Elige el equipo de Datadog apropiado en la lista.

   - **Crear un nuevo equipo**: Introduce un nombre de equipo cuando se te pida hacerlo. Datadog crea el equipo utilizando la estructura y los miembros de tu equipo de PagerDuty.

   {{< img src="service_management/oncall/pagerduty_migration_map_users.png" alt="Interfaz de usuario para asignar usuarios de PagerDuty a usuarios de Datadog o para invitar nuevos usuarios" style="width:95%;" >}}

1. Gestionar usuarios no asignados:

   Datadog empareja usuarios por direcciones de correo electrónico. Para los usuarios no asignados puedes:
   - Invitarles a Datadog (la interfaz de usuario envía una invitación por correo electrónico), o bien
   - Omitirlos, si ya no necesitan acceso.

1. Cuando la asignación parezca correcta, selecciona **Import team** (Importar equipo).

### Configurar reglas de enrutamiento

Elige una plantilla para definir cómo llegan las alertas al equipo:

- **Todas las alertas a la política de escalado**: Reenvía cada alerta a una política de escalado designada.
- **Horario laboral**: Envía alertas al equipo solo durante el horario especificado y utiliza los canales de chat como alternativa.
- **Prioridad de las alertas**: Enruta las alertas en función de su prioridad e impacto.
- **Empezar desde cero**: Personaliza las reglas de enrutamiento para adaptarlas a los flujos de trabajo de tu equipo.

{{< img src="service_management/oncall/pagerduty_migration_select_routing_rule_template.png" alt="Interfaz de usuario con plantillas de reglas de enrutamiento como por ejemplo 'Todas las alertas a la política de escalado', 'Horario laboral' y 'Prioridad de las alertas'" style="width:95%;" >}}

### Reutilizar las políticas de escalado y los horarios

Al editar las reglas de enrutamiento, puedes importar las políticas de escalado y los horarios de PagerDuty existentes, en lugar de volver a crearlos.

{{< img src="service_management/oncall/pagerduty_migration_migrate_escalation_policies_and_schedules.png" alt="Interfaz de usuario para seleccionar políticas de escalado y horarios de PagerDuty" style="width:95%;" >}}

Datadog aplica automáticamente las configuraciones importadas. Puedes cambiar las políticas y horarios en cualquier momento. 

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}


[1]: https://app.datadoghq.com/integrations/pagerduty
[2]: https://app.datadoghq.com/on-call/teams