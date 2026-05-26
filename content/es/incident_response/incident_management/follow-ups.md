---
aliases:
- /es/service_management/incident_management/follow-ups/
description: Gestiona las tareas de seguimiento definidas durante tu proceso de respuesta
  a incident (incidente).
further_reading:
- link: /service_management/incident_management/incident_settings
  tag: Documentación
  text: Configuración de incidents (incidentes)
- link: /service_management/incident_management/integrations/slack/
  tag: Documentación
  text: Integrar Slack con Incident Management de Datadog
title: Seguimiento de incident (incidente)
---

## Información general

Los seguimientos de incidents (incidentes) son tareas que se llevan a cabo una vez resuelto un incident (incidente). Durante una investigación de incidents (incidentes), tu equipo puede identificar problemas que requieren atención. pero que no están directamente relacionados con la resolución del problema inmediato. En lugar de perder de vista estos elementos en el apuro por restablecer el servicio, puedes capturarlos como seguimientos para abordarlos después de que se resuelva el incident (incidente).

Entre los ejemplos más comunes para crear seguimientos se incluyen:

- **Mejoras en la infraestructura**: Logs mal configurados, alertas faltantes o cobertura de monitorización inadecuada descubiertos durante el incident (incidente)
- **Deuda técnica**: Código que necesita refactorización, sistemas frágiles que necesitan refuerzo o documentación que necesita actualización.
- **Mejoras en los procesos**: Lagunas en los libros de ejecución, rutas de escalado poco claras o falta de permisos de acceso.
- **Corrección de causas raíz**: Problemas subyacentes cuya solución requiere más tiempo que la mitigación inmediata.

Al registrar estos elementos como seguimientos, tu equipo puede centrarse en la resolución de incidents (incidentes) y asegurarse de que no se olvidan las mejoras importantes.

## Crear y gestionar seguimientos

Los seguimientos pueden crearse en cualquier momento durante un incident (incidente) (incluso antes de que se resuelva), lo que permite a los responsables documentar el trabajo necesario a medida que lo descubren. Tras la resolución, puedes [exportar seguimientos](#export-follow-ups) a Jira o Case Management para la integrarlos en los workfows (UI) / procesos (generic) existentes de tu equipo.

**Desde Datadog**: Ve a la pestaña **Post-incident (incidente)** (Después del incident (incidente) del incident (incidente) para ver, crear, editar y rastrear todos los seguimientos asociados al incident (incidente).

**Desde Slack**: En el canal del incident (incidente), ejecuta `/datadog followup` para crear un nuevo seguimiento o `/datadog followup list` para ver y gestionar los seguimientos existentes. Para obtener más comandos de Slack, consulta [Integrar Slack con Incident Management de Datadog][5].

## Exportar seguimientos

Puedes exportar los seguimientos de Incident Management a Case Management o Jira, lo que te rastrearlos y gestionarlos dentro de los workflows (UI) / procesos (generic) existentes de tu equipo. Puedes exportar los seguimientos manualmente o configurar Incident Management para que exporte automáticamente todos los seguimientos al project (proyecto) de Case Management o de Jira seleccionados.

Para exportar los seguimientos:
1. Ve a [**Incident Management settings > Follow-Ups**][1] (Parámetros de Incident Management > Seguimientos).
1. Añade o define una **plantilla de exportación**. Una plantilla de exportación describe la forma en que Datadog puede exportar y sincronizar un seguimiento.
1. Se admiten los siguientes tipos de plantillas de exportación:
   1. [Case Management](#case-management-exports)
   1. [Jira](#jira-exports)
1. Al definir una plantilla, puedes configurar cómo Datadog debe configurar los campos en la case (incidencia) de Datadog o la edición de Jira resultante, utilizando variables proporcionadas por el seguimiento y su incident (incidente). Por ejemplo
   * `{{ title }}` representa el título del incident (incidente)
   * `{{ severity }}` representa la gravedad del incident (incidente)
   * `{{ follow_up_description }}` representa la descripción del seguimiento
   * `{{ follow_up_due_date }}` representa la fecha de vencimiento del seguimiento
1. (Opcional) Puedes definir cómo se asigna el estado entre plataformas para garantizar que los cambios de estado permanezcan sincronizados en ambas plataformas. Los seguimientos tienen dos estados: **Open** (Abierto) y **Done** (Hecho).

### Exportaciones manuales y automáticas

Tras definir una plantilla de exportación, tienes dos opciones:

| Opción de exportación      | Descripción                                                                                      | Cuándo utilizar                                                                                      |
|--------------------|--------------------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------------------|
| **Exportación manual**  | Exporta seguimientos individuales a demanda desde la pestaña Después del incident (incidente) del incident (incidente).                      | Utilízalo si prefieres exportar selectivamente solo determinados seguimientos.                            |
| **Exportación automática | Configura Incident Management para exportar automáticamente todos los seguimientos que utilicen la plantilla cada vez que se creen. | Selecciona esta opción si deseas que todos los seguimientos se rastreen en tu sistema externo de forma predeterminada.         |

### Exportaciones a Case Management


Cuando exportas tus seguimientos a [Case Management][2], puedes gestionar, rastrear y analizar tus seguimientos directamente en Datadog. Por ejemplo, puedes:

* Ver todos los casos de seguimiento abiertos asignados a un usuario concreto en Datadog
* Crear un dashboard en Datadog que muestre los casos de seguimiento por equipo.
* Sincronizar automáticamente estos casos con cualquier aplicación externa con la que se integre Case Management, incluidas Jira y ServiceNow.

Cuando Datadog exporta un seguimiento de incident (incidente) a Case Management, crea un case (incidencia) para el seguimiento en el project (proyecto) que seleccionaste en la plantilla de exportación.

**Sincronización de estados:** Datadog sincroniza el estado entre el seguimiento y case (incidencia) **en ambas direcciones**, después de la asignación que definiste en la plantilla de exportación.

**Sincronización de usuarios asignados:** Datadog sincroniza el usuario asignado entre el seguimiento y case (incidencia) **en ambas direcciones**. Dado que un case (incidencia) solo puede tener un usuario asignado, solo se le añade el primer usuario asignado del seguimiento.


### Exportaciones a Jira

Para exportar seguimientos a Jira, primero debes instalar la integración con Jira. Para obtener más información, consulta [Integrar Jira con Incident Management de Datadog][4].

Cuando Datadog exporta un seguimiento de incident (incidente) a Jira, crea un problema de Jira para el seguimiento en el project (proyecto) seleccionado en la plantilla de exportación.

**Sincronización de estados:** Al cerrar o abrir un seguimiento de incident (incidente), Datadog sincroniza automáticamente el estado de la versión de Jira conectada en función de la asignación que hayas definido en la plantilla de exportación. **Se trata de una sincronización unidireccional**.

Las organizaciones que necesiten una sincronización bidireccional deben exportar a un project (proyecto) de Case Management que esté configurado para una sincronización bidireccional con un project (proyecto) de Jira.

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/incidents/settings?section=follow-ups
[2]: /es/service_management/case_management
[4]: /es/integrations/jira/
[5]: /es/service_management/incident_management/integrations/slack/#slack-commands