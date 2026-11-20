---
aliases:
- /es/error_tracking/ticketing_systems/case_management/
further_reading:
- link: /error_tracking/explorer/
  tag: Documentación
  text: Explorador de Error Tracking
- link: /error_tracking/issue_states/
  tag: Documentación
  text: Estados de las incidencias de Error Tracking
- link: /incident_response/work_management/
  tag: Documentación
  text: Work Management
is_beta: false
private: false
title: Integre Work Management con Error Tracking
---
## Descripción general {#overview}

Integre Work Management con Error Tracking para crear y vincular elementos de trabajo de Work Management a incidencias de Error Tracking. Con Work Management para Error Tracking, puede:

- Crear elementos de trabajo de Work Management directamente desde el panel de incidencias de Error Tracking
- Agrupar múltiples incidencias de Error Tracking en un solo elemento de trabajo
- Enrutar automáticamente las incidencias a proyectos específicos de Work Management mediante reglas de automatización
- Crear automáticamente elementos de trabajo de Work Management para incidencias de Error Tracking que cumplan criterios específicos.

## Configuración {#setup}

Necesita los siguientes [permisos][1] para usar la integración de Work Management para Error Tracking:

- Lectura de Error Tracking
- Escritura de incidencias de Error Tracking
- Lectura de incidencias
- Escritura de incidencias

## Crear un elemento de trabajo a partir de una incidencia {#create-a-work-item-from-an-issue}

Puede crear un elemento de trabajo de Work Management directamente desde el panel de incidencias para agrupar los esfuerzos de investigación en esa incidencia:

1. Navegue al [Explorador de Error Tracking][2].
2. Haga clic en una incidencia para abrir el panel de incidencias.
3. En el panel de incidencias, en el menú desplegable {{< ui >}}Actions{{< /ui >}}, haga clic en {{< ui >}}Add Case{{< /ui >}}.
4. Elija el proyecto de Work Management en el que se debe crear el elemento de trabajo. De forma predeterminada, el elemento de trabajo se creará automáticamente en el proyecto de Error Tracking.
5. Haga clic en {{< ui >}}Create{{< /ui >}} para crear el elemento de trabajo.

Después de crearlo, el elemento de trabajo se vincula a la incidencia de Error Tracking. El enlace del elemento de trabajo aparece entonces en el panel de incidencias y el estado de la incidencia cambia automáticamente a {{< ui >}}REVIEWED{{< /ui >}}.

Cuando una incidencia está vinculada a un elemento de trabajo, su estado, responsable y comentarios se sincronizan de forma bidireccional.
Consulte [Sincronización bidireccional de estado entre incidencias y elementos de trabajo](#state-dual-way-sync-between-issues-and-work-items) para obtener más información sobre cómo se sincronizan el estado de la incidencia y el estado del elemento de trabajo.

## Agrupar varias incidencias en un solo elemento de trabajo {#group-multiple-issues-into-a-single-work-item}

Puede adjuntar varias incidencias de Error Tracking a un solo elemento de trabajo de Work Management para agrupar incidencias correlacionadas en una sola unidad de trabajo:

1. Navegue al [Explorador de Error Tracking][2].
2. Haga clic en una incidencia para abrir el panel de incidencias.
3. En el panel de incidencias, en el menú desplegable {{< ui >}}Actions{{< /ui >}}, haga clic en {{< ui >}}Add Case{{< /ui >}}.
4. En la pestaña {{< ui >}}Add to Existing Case{{< /ui >}}, seleccione el elemento de trabajo en el que desea agrupar sus incidencias.
5. Haga clic en {{< ui >}}Attach to Case{{< /ui >}} para adjuntar la incidencia al elemento de trabajo.
6. Repita estas acciones en todas las incidencias que desee agregar a este grupo.

Todas las incidencias de Error Tracking vinculadas aparecen en la opción "visualizar" del elemento de trabajo, proporcionando una vista consolidada de los errores relacionados.

Cuando varias incidencias están vinculadas a un elemento de trabajo, su estado, responsable y comentarios se sincronizan de forma bidireccional. Consulte [Sincronización bidireccional de estados entre incidencias y elementos de trabajo](#state-dual-way-sync-between-issues-and-work-items) para obtener más información sobre cómo se sincronizan los estados de las incidencias y el estado del elemento de trabajo.

La relación entre elementos de trabajo e incidencias es una relación 1:N. Un solo elemento de trabajo puede estar vinculado a múltiples incidencias, pero una incidencia solo puede estar vinculada a un único elemento de trabajo.

## Sincronización bidireccional de estados entre incidencias y elementos de trabajo {#state-dual-way-sync-between-issues-and-work-items}

### Incidencia de Error Tracking única vinculada a un elemento de trabajo de Work Management único {#single-error-tracking-issue-linked-to-single-work-management-work-item}

Cuando una sola incidencia de Error Tracking está vinculada a un elemento de trabajo de Work Management, sus estados se sincronizan de forma bidireccional. El estado de la incidencia se asigna a
el estado predeterminado del grupo de estados del elemento de trabajo correspondiente:

| Estado de la incidencia de Error Tracking | Grupo de estados de Work Management |
|----------------------------|------------------------------|
| {{< ui >}}FOR REVIEW{{< /ui >}}  | {{< ui >}}Open{{< /ui >}}        |
| {{< ui >}}REVIEWED{{< /ui >}}    | {{< ui >}}In Progress{{< /ui >}} |
| {{< ui >}}RESOLVED{{< /ui >}}    | {{< ui >}}Closed{{< /ui >}}      |
| {{< ui >}}IGNORED{{< /ui >}}     | {{< ui >}}Closed{{< /ui >}}      |
| {{< ui >}}EXCLUDED{{< /ui >}}    | {{< ui >}}Closed{{< /ui >}}      |

### Varias incidencias de Error Tracking vinculadas a un solo elemento de trabajo de Work Management {#multiple-error-tracking-issues-linked-to-single-work-management-work-item}

Cuando varias incidencias de Error Tracking están vinculadas al mismo elemento de trabajo de Work Management, también existe una sincronización entre sus estados, dependiendo de la situación:
- Si usted actualiza el estado del elemento de trabajo, todas las incidencias vinculadas se actualizan siguiendo el mapeo de estados descrito en el párrafo anterior.
- Si usted actualiza el estado de una incidencia, el estado resultante de otras incidencias vinculadas y el elemento de trabajo sigue estas reglas:

| Estado anterior                                                       | Acción                                                 | Estado resultante                                                                                 |
|--------------------------------------------------------------------|--------------------------------------------------------|-------------------------------------------------------------------------------------------------|
| La incidencia está {{< ui >}}CLOSED{{< /ui >}} y todas las incidencias están {{< ui >}}RESOLVED{{< /ui >}}.                | Usted actualiza una incidencia a {{< ui >}}FOR REVIEW{{< /ui >}}.                  | La incidencia está {{< ui >}}OPEN{{< /ui >}} pero todas las demás incidencias permanecen {{< ui >}}RESOLVED{{< /ui >}}.                                      |
| La incidencia está {{< ui >}}OPEN{{< /ui >}} y todas las incidencias están {{< ui >}}FOR REVIEW{{< /ui >}}.                | Usted actualiza una incidencia a {{< ui >}}RESOLVED{{< /ui >}}.                    | La incidencia está {{< ui >}}OPEN{{< /ui >}}, una incidencia está {{< ui >}}RESOLVED{{< /ui >}}, todas las demás incidencias permanecen {{< ui >}}FOR REVIEW{{< /ui >}}.              |
| La incidencia está {{< ui >}}CLOSED{{< /ui >}} y usted tiene una incidencia sin vincular {{< ui >}}FOR REVIEW{{< /ui >}}. | Usted vincula la incidencia {{< ui >}}FOR REVIEW{{< /ui >}} a su incidencia {{< ui >}}CLOSED{{< /ui >}}. | La incidencia está {{< ui >}}CLOSED{{< /ui >}} y todas las incidencias están {{< ui >}}RESOLVED{{< /ui >}} (incluyendo la incidencia recién vinculada).          |
| La incidencia está {{< ui >}}OPEN{{< /ui >}} y usted tiene una incidencia sin vincular {{< ui >}}RESOLVED{{< /ui >}}.     | Usted vincula la incidencia {{< ui >}}RESOLVED{{< /ui >}} a su incidencia {{< ui >}}OPEN{{< /ui >}}.     | La incidencia está {{< ui >}}OPEN{{< /ui >}} y todas las incidencias están {{< ui >}}FOR REVIEW{{< /ui >}} excepto la nueva, que permanece {{< ui >}}RESOLVED{{< /ui >}}. |

## Reglas de automatización {#automation-rules}

Puede configurar reglas para hacer coincidir incidencias específicas con proyectos de Work Management. Por ejemplo, cuando una incidencia coincide con una regla, cualquier elemento de trabajo creado manual o automáticamente para esa incidencia se asigna de forma predeterminada al proyecto especificado por esa regla.

### Configuración {#setup-1}

Para crear reglas de automatización para sus incidencias de Error Tracking, necesita uno (1) de los siguientes [permisos][1]:
- Escritura de Error Tracking
- Escritura de configuración de Error Tracking

### Crear una regla de automatización {#create-an-automation-rule}

Para crear una regla de automatización para Work Management:

1. Vaya a [Configuración de Error Tracking][3], en la sección {{< ui >}}Ticketing & Automation{{< /ui >}}.
2. Haga clic en {{< ui >}}New Rule{{< /ui >}}.
3. Configure la regla:
    - {{< ui >}}Match Criteria{{< /ui >}}: Defina las condiciones que las incidencias deben cumplir para activar la regla
    - {{< ui >}}Project{{< /ui >}}: Seleccione el proyecto de Work Management de destino cuando se creen elementos de trabajo a partir de incidencias que coincidan con la regla
    - {{< ui >}}Auto-create{{< /ui >}}: Opcionalmente, habilite la creación automática de elementos de trabajo cuando las incidencias coincidan
4. Haga clic en {{< ui >}}Save Rule{{< /ui >}}.

### Criterios de coincidencia {#match-criteria}

Configure reglas basadas en los siguientes atributos:

- {{< ui >}}Service{{< /ui >}}: Coincidir incidencias de servicios específicos (por ejemplo, `service:web-store`)
- {{< ui >}}Team{{< /ui >}}: Coincidir incidencias basadas en [Propiedad del equipo de la incidencia][4] (por ejemplo, `team:Shopist`)

Puede combinar múltiples criterios para crear reglas de enrutamiento precisas. La consulta de coincidencia de incidencias admite los siguientes operadores:

- `AND`: AND lógico (por ejemplo, `service:web-store AND team:Shopist`)
- `OR`: OR lógico (por ejemplo, `service:web-store OR team:Shopist`)
- `-`: NOT lógico (por ejemplo, `service:web-store -team:Shopist`)

<div class="alert alert-info"> Las reglas están ordenadas. Se aplica la primera regla que coincida con una incidencia.</div>

### Creación automática de elementos de trabajo {#automatic-work-item-creation}

Al agregar una regla de automatización, puede habilitar la creación automática de elementos de trabajo para las incidencias que coincidan con su regla.

De forma predeterminada, cuando se crea una nueva incidencia de Error Tracking, se evalúan las reglas y se aplica la primera regla que coincida. Si la creación automática de elementos de trabajo está habilitada en esa regla coincidente, se crea un nuevo elemento de trabajo de Work Management en el proyecto especificado en su regla y se adjunta a la incidencia coincidente.

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/account_management/rbac/permissions/
[2]: https://app.datadoghq.com/error-tracking/
[3]: https://app.datadoghq.com/error-tracking/settings/automation/
[4]: /es/error_tracking/issue_team_ownership/