---
further_reading:
- link: /error_tracking/explorer/
  tag: Documentación
  text: Explorador de Error Tracking
- link: /error_tracking/issue_states/
  tag: Documentación
  text: Estados de las incidencias de Error Tracking
- link: /integrations/jira/
  tag: Documentación
  text: Integración con Jira
is_beta: false
private: false
site_support_id: jira_error_tracking
title: Integre Jira con Error Tracking
---
## Descripción general {#overview}

Integre Jira con Error Tracking para crear y vincular tickets de Jira a incidencias de Error Tracking. Con Jira para Error Tracking, usted puede:

- Cree tickets de Jira directamente desde el panel de incidencias de Error Tracking
- Agrupe múltiples incidencias de Error Tracking en un solo ticket
- Envíe automáticamente las incidencias a tableros de Jira específicos mediante reglas de automatización
- Cree automáticamente tickets de Jira para incidencias de Error Tracking que coincidan con criterios específicos.

## Requisitos previos {#prerequisites}

<div class="alert alert-info">La creación de tickets a partir de una incidencia de Error Tracking está disponible para Jira Cloud y Data Center. La sincronización dual entre Jira y Error Tracking solo está disponible para Jira Cloud.</div>

1. Configure la [integración de Jira para Datadog][7].
2. Asegúrese de tener los siguientes [permisos][1]:
   - Lectura de Error Tracking
   - Escritura de incidencias de Error Tracking
   - Lectura de incidencias
   - Escritura de incidencias
   - Lectura de Integrations

## Crear un ticket a partir de una incidencia {#create-a-ticket-from-an-issue}

Puede crear un ticket de Jira directamente desde el panel de incidencias para agrupar los esfuerzos de investigación en esa incidencia:

1. Navegue al [Explorador de Error Tracking][2].
2. Haga clic en una incidencia para abrir el panel de incidencias.
3. En el panel de incidencias, en el menú desplegable {{< ui >}}Actions{{< /ui >}}, haga clic en {{< ui >}}Add Jira ticket{{< /ui >}}.
4. Elija la cuenta y el proyecto de Jira en los que se debe crear el ticket. Luego, elija el tipo de ticket que desea crear.
5. Opcionalmente, acceda a la configuración de Sincronización de datos para configurar cómo se deben sincronizar los datos entre Datadog y Jira.
6. Haga clic en {{< ui >}}Create{{< /ui >}} para crear el ticket.

{{< img src="error_tracking/create-ticket.png" alt="Crear un ticket de Jira a partir de una incidencia de Error Tracking" style="width:100%;" >}}

Una vez creado, el ticket se vincula a la incidencia de Error Tracking. El enlace del ticket aparece en el panel de incidencias y el estado de la incidencia cambia automáticamente a {{< ui >}}REVIEWED{{< /ui >}}.

Cuando una incidencia está vinculada a un ticket, su estado, responsable y comentarios se sincronizan de forma bidireccional. Consulte [Sincronización bidireccional de estado entre incidencias y tickets](#state-dual-way-sync-between-issues-and-tickets) para obtener más información sobre cómo se sincronizan el estado de la incidencia y el estado del ticket.

## Agrupar varias incidencias en un solo ticket {#group-multiple-issues-into-a-single-ticket}

Puede adjuntar varias incidencias de Error Tracking a un solo ticket de Jira para agrupar incidencias correlacionadas en una sola unidad de trabajo:

1. Navegue al [Explorador de Error Tracking][2].
2. Haga clic en una incidencia para abrir el panel de incidencias.
3. En el panel de incidencias, en el menú desplegable {{< ui >}}Actions{{< /ui >}}, haga clic en {{< ui >}}Add Jira ticket{{< /ui >}}.
4. En la pestaña {{< ui >}}Add to Existing{{< /ui >}}, pegue la URL del ticket en el que desea agrupar sus incidencias.
5. Opcionalmente, acceda a la configuración de Sincronización de datos para configurar cómo se deben sincronizar los datos entre Datadog y Jira.
6. Haga clic en {{< ui >}}Link to Issue{{< /ui >}} para adjuntar la incidencia al ticket.
7. Repita estas acciones en todas las incidencias que desee agregar a este grupo.

{{< img src="error_tracking/add-to-existing-ticket.png" alt="Agregar una incidencia de Error Tracking a un ticket de Jira existente" style="height:300px;" >}}

Cuando varias incidencias están vinculadas a un solo ticket, su estado, responsable y comentarios se sincronizan de forma bidireccional. Consulte [Sincronización bidireccional de estados entre incidencias y tickets](#state-dual-way-sync-between-issues-and-tickets) para obtener más información sobre cómo se sincronizan los estados de las incidencias y el estado del ticket.

La relación entre tickets e incidencias es una relación 1:N. Un solo ticket puede estar vinculado a múltiples incidencias, pero una incidencia solo puede estar vinculada a un único ticket de Jira.

## Sincronización bidireccional de estados entre incidencias y tickets {#state-dual-way-sync-between-issues-and-tickets}

Si la sincronización bidireccional está habilitada y configurada entre los proyectos de Datadog y Jira, los estados de las incidencias de Error Tracking y los tickets de Jira se reflejan mutuamente. Si encuentra algún comportamiento inesperado en esta sincronización de estados, consulte la sección [Solución de problemas](#troubleshooting) para saber cómo corregir su configuración.

### Una sola incidencia de Error Tracking vinculada a un solo ticket de Jira {#single-error-tracking-issue-linked-to-single-jira-ticket}

Cuando una sola incidencia de Error Tracking está vinculada a un ticket de Jira, sus estados se sincronizan de forma bidireccional. La asignación entre estos estados se puede configurar en la configuración de Sincronización de datos de los formularios de creación de tickets o de reglas de automatización:

{{< img src="error_tracking/jira-status-mapping.png" alt="Asignar estados de incidencias de Error Tracking a estados de tickets de Jira" style="width:100%;" >}}

### Múltiples incidencias de Error Tracking vinculadas a un solo ticket de Jira {#multiple-error-tracking-issues-linked-to-single-jira-ticket}

Cuando varias incidencias de Error Tracking están vinculadas al mismo ticket de Jira, también existe una sincronización entre sus estados, dependiendo de la situación. Si actualiza el estado del ticket, todas las incidencias vinculadas se actualizan para reflejar este estado de acuerdo con su asignación.

Suponiendo que su mapeo se define de la siguiente manera:

| Grupo de estado de Gestión de trabajo | Estado del ticket de Jira |
|------------------------------|--------------------|
| `Open`                       | `To Do`            |
| `In Progress`                | `In Progress`      |
| `Closed`                     | `Done`             |

Si usted actualiza el estado de una incidencia, el estado resultante de otras incidencias vinculadas y el ticket de Jira sigue estas reglas:

| Estado inicial                                                      | Acción                                                 | Estado resultante                                                                                    |
|--------------------------------------------------------------------|--------------------------------------------------------|----------------------------------------------------------------------------------------------------|
| El ticket está {{< ui >}}Done{{< /ui >}} y todas las incidencias están {{< ui >}}Resolved{{< /ui >}}.                | Usted actualiza una incidencia a {{< ui >}}For Review{{< /ui >}}.                  | El ticket está {{< ui >}}To Do{{< /ui >}} pero todas las demás incidencias permanecen {{< ui >}}Resolved{{< /ui >}}.                                      |
| El ticket está {{< ui >}}To Do{{< /ui >}} y todas las incidencias están {{< ui >}}For Review{{< /ui >}}.             | Usted actualiza una incidencia a {{< ui >}}Resolved{{< /ui >}}.                    | El ticket está {{< ui >}}To Do{{< /ui >}}, una incidencia está {{< ui >}}Resolved{{< /ui >}}, todas las demás incidencias permanecen {{< ui >}}For Review{{< /ui >}}.              |
| El ticket está {{< ui >}}Done{{< /ui >}} y usted tiene una incidencia sin vincular {{< ui >}}For Review{{< /ui >}}. | Usted vincula la incidencia {{< ui >}}For Review{{< /ui >}} a su ticket {{< ui >}}Done{{< /ui >}}. | El ticket está {{< ui >}}Done{{< /ui >}} y todas las incidencias están {{< ui >}}Resolved{{< /ui >}} (incluyendo la incidencia recién vinculada).             |
| El ticket está {{< ui >}}To Do{{< /ui >}} y usted tiene una incidencia {{< ui >}}Resolved{{< /ui >}} sin vincular.  | Usted vincula la incidencia {{< ui >}}Resolved{{< /ui >}} a su ticket {{< ui >}}To Do{{< /ui >}}.  | El ticket está {{< ui >}}To Do{{< /ui >}} y todas las incidencias están {{< ui >}}For Review{{< /ui >}} excepto la nueva, que permanece {{< ui >}}Resolved{{< /ui >}}. |

## Reglas de automatización {#automation-rules}

Puede configurar reglas para hacer coincidir incidencias específicas con tableros de Jira. Cuando una incidencia coincide con una regla, cualquier ticket creado manual o automáticamente para esa incidencia se asignará de forma predeterminada al tablero especificado por su regla.

### Configuración {#setup}

Para crear reglas de automatización para sus incidencias de Error Tracking, necesita uno (1) de los siguientes [permisos][1]:
- Escritura de Error Tracking
- Escritura de configuración de Error Tracking

### Crear una regla de automatización {#create-an-automation-rule}

Para crear una regla de automatización para Jira:

1. Vaya a [Configuración de Error Tracking][3], en la sección {{< ui >}}Ticketing & Automation{{< /ui >}}.
2. Haga clic en {{< ui >}}New Rule{{< /ui >}}.
3. Configure la regla:
    - {{< ui >}}Match Criteria{{< /ui >}}: Defina las condiciones que las incidencias deben cumplir para activar la regla
    - {{< ui >}}Destination{{< /ui >}}: Seleccione la cuenta y el proyecto de Jira de destino cuando se creen tickets a partir de incidencias que coincidan con la regla. Seleccione el tipo de ticket que desea crear y proporcione valores para los campos obligatorios del ticket.
    - {{< ui >}}Auto-create{{< /ui >}}: Opcionalmente, habilite la creación automática de tickets cuando las incidencias coincidan
4. Haga clic en {{< ui >}}Save Rule{{< /ui >}}.

{{< img src="error_tracking/create-jira-automation-rule.png" alt="Crear una regla de automatización de Jira" style="width:100%;" >}}

### Criterios de coincidencia {#match-criteria}

Configure reglas basadas en los siguientes atributos:

- {{< ui >}}Service{{< /ui >}}: Coincidir incidencias de servicios específicos (por ejemplo, `service:web-store`)
- {{< ui >}}Team{{< /ui >}}: Coincidir incidencias basadas en [Propiedad del equipo de la incidencia][4] (por ejemplo, `team:Shopist`)

Puede combinar múltiples criterios para crear reglas de enrutamiento precisas. La consulta de coincidencia de incidencias admite los siguientes operadores:

- `AND`: AND lógico (por ejemplo, `service:web-store AND team:Shopist`)
- `OR`: OR lógico (por ejemplo, `service:web-store OR team:Shopist`)
- `-`: NOT lógico (por ejemplo, `service:web-store -team:Shopist`)

<div class="alert alert-info">Las reglas están ordenadas. Se aplica la primera regla que coincida con una incidencia.</div>

### Creación automática de tickets {#automatic-ticket-creation}

Al agregar una regla de automatización, puede habilitar la creación automática de tickets de Jira para las incidencias que coincidan con su regla.

{{< img src="error_tracking/enable-auto-ticket-creation.png" alt="Habilitar la creación automática de incidencias" style="height:300px;" >}}

Cuando se crea una nueva incidencia de Error Tracking, se evalúan las reglas y se aplica la primera regla que coincida. Si la creación automática de tickets está habilitada en esa regla coincidente, se creará un nuevo ticket de Jira en el tablero de Jira especificado en su regla y se adjuntará a la incidencia coincidente.

## Solución de problemas {#troubleshooting}

Si experimenta comportamientos inesperados al usar sistemas de tickets con Error Tracking, los siguientes pasos de verificación de problemas pueden ayudarle a resolver el problema rápidamente. Si sigue teniendo problemas, comuníquese con el [soporte de Datadog][5].

### La sincronización entre Jira y Error Tracking está rota {#sync-is-broken-between-jira-and-error-tracking}

Si experimenta problemas de sincronización entre sus tickets de Jira y los problemas correspondientes de Error Tracking (como que el estado del problema no se actualice cuando cierra el ticket de Jira), verifique que todos los siguientes pasos estén configurados correctamente:

1. En el panel de problemas, asegúrese de que el problema esté vinculado correctamente al ticket de Jira.
2. Datadog creó automáticamente un elemento de trabajo de Work Management para actuar como punto de vinculación para el problema de Error Tracking y el ticket de Jira. Puede acceder a este elemento de trabajo desde el panel de problemas para encontrar el proyecto de Work Management en el que se creó. En la configuración de Work Management, asegúrese de que la integración de Jira esté habilitada para este proyecto y que la cuenta y el tablero de Jira correctos estén configurados.

3. En la configuración de Work Management, asegúrese de que la sincronización entre Work Management y Jira esté habilitada para este proyecto. Verifique que los campos que desea sincronizar estén configurados para la sincronización bidireccional entre Datadog y Jira.

4. Se debe configurar un webhook para sincronizar automáticamente las actualizaciones entre Datadog y Jira. En la configuración de Jira, verifique este webhook. Si falta el webhook, siga [estos pasos][6] para agregarlo y corregir la sincronización entre Datadog y Jira.

### El reportero en los tickets de Jira es el usuario incorrecto {#reporter-on-jira-tickets-is-the-wrong-user}

Cuando se crea un ticket de Jira a partir de un problema de Error Tracking, el campo {{< ui >}}Reporter{{< /ui >}} del ticket se establece en el usuario de Datadog que configuró la integración de Jira, no en el usuario que activó la creación del ticket. Esta es una limitación conocida de la integración de Jira para Datadog y se aplica a todos los tickets creados desde Error Tracking. Para cambiar el reportero en un ticket específico, actualícelo directamente en Jira después de la creación.

### Se crea un nuevo proyecto de Work Management para cada ticket de Jira {#a-new-work-management-project-is-created-for-each-jira-ticket}

Datadog Work Management asigna cada tipo de problema de Jira a un proyecto de Work Management diferente. Cuando crea un ticket a partir de un problema de Error Tracking usando un tipo de problema de Jira que no se ha utilizado antes, se crea automáticamente un nuevo proyecto de Work Management para vincular el problema de Error Tracking y el ticket de Jira. Este comportamiento significa que crear tickets con varios tipos de problema de Jira a lo largo del tiempo produce varios proyectos de Work Management, uno por cada tipo de problema.

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/account_management/rbac/permissions/
[2]: https://app.datadoghq.com/error-tracking/
[3]: https://app.datadoghq.com/error-tracking/settings/automation/
[4]: /es/error_tracking/issue_team_ownership/
[5]: /es/help/
[6]: /es/integrations/jira/#configure-a-jira-webhook
[7]: /es/integrations/jira/#setup