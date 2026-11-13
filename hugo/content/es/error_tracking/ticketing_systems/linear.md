---
further_reading:
- link: /error_tracking/explorer/
  tag: Documentación
  text: Explorador de Error Tracking
- link: /error_tracking/issue_states/
  tag: Documentación
  text: Estados de las incidencias de Error Tracking
- link: /integrations/linear/
  tag: Documentación
  text: Integración con Linear
is_beta: false
private: false
site_support_id: linear_error_tracking
title: Integrar Linear con Error Tracking
---
## Descripción general {#overview}

Integre Linear con Error Tracking para crear y vincular incidencias de Linear a incidencias de Error Tracking. Con esta integración, usted puede:

- Cree incidencias de Linear directamente desde el panel de incidencias de Error Tracking
- Agrupe múltiples incidencias de Error Tracking en una sola incidencia de Linear

## Requisitos previos {#prerequisites}

1. Configure la [integración de Linear para Datadog][7].
2. Asegúrese de tener los siguientes [permisos][1]:
   - Lectura de Error Tracking
   - Escritura de incidencias de Error Tracking
   - Lectura de incidencias
   - Escritura de incidencias
   - Lectura de Integrations

## Cree una incidencia de Linear a partir de una incidencia de Error Tracking {#create-a-linear-issue-from-an-error-tracking-issue}

Cree una incidencia de Linear directamente desde el panel de incidencias para agrupar los esfuerzos de investigación en esa incidencia:

1. Navegue al [Explorador de Error Tracking][2].
2. Haga clic en una incidencia para abrir el panel de incidencias.
3. En el panel de incidencias, en el menú desplegable **Acciones**, haga clic en **Agregar incidencia de Linear**.
4. Elija el espacio de trabajo y el equipo de Linear para la nueva incidencia de Linear.
5. Opcionalmente, abra la configuración de sincronización de datos para configurar cómo se sincronizan los datos entre Datadog y Linear.
6. Haga clic en **Crear** para crear la incidencia de Linear.

{{< img src="error_tracking/create-linear-issue.png" alt="Cree una incidencia de Linear a partir de una incidencia de Error Tracking" style="width:100%;" >}}

Después de crear la incidencia de Linear, esta se vincula a la incidencia de Error Tracking y aparece en el panel de incidencias. El estado de la incidencia de Error Tracking cambia automáticamente a **REVISADO**.

Cuando una incidencia de Error Tracking está vinculada a una incidencia de Linear, el estado, el responsable y los comentarios se sincronizan de forma bidireccional. Para obtener más detalles, consulte [Sincronización bidireccional de estado entre incidencias de Error Tracking e incidencias de Linear](#state-two-way-sync-between-error-tracking-issues-and-linear-issues).

## Agrupe múltiples incidencias de Error Tracking en una sola incidencia de Linear {#group-multiple-error-tracking-issues-into-a-single-linear-issue}

Adjunte varias incidencias de Error Tracking a una sola incidencia de Linear para agrupar incidencias correlacionadas en una sola unidad de trabajo:

1. Navegue al [Explorador de Error Tracking][2].
2. Haga clic en una incidencia para abrir el panel de incidencias.
3. En el panel de incidencias, en el menú desplegable **Acciones**, haga clic en **Agregar incidencia de Linear**.
4. En la pestaña **Agregar a existente**, pegue la URL de la incidencia de Linear en la que desea agrupar sus incidencias de Error Tracking.
5. Opcionalmente, abra la configuración de sincronización de datos para configurar cómo se sincronizan los datos entre Datadog y Linear.
6. Haga clic en **Vincular a incidencia** para adjuntar la incidencia de Error Tracking a la incidencia de Linear.
7. Repita estas acciones en todas las incidencias de Error Tracking que desee agregar a este grupo.

{{< img src="error_tracking/add-to-existing-linear-issue.png" alt="Agregue una incidencia de Error Tracking a una incidencia de Linear existente" style="height:300px;" >}}

Cuando varias incidencias de Error Tracking están vinculadas a una sola incidencia de Linear, el estado, el responsable y los comentarios se sincronizan de forma bidireccional. Para obtener más detalles, consulte [Sincronización bidireccional de estado entre incidencias de Error Tracking e incidencias de Linear](#state-two-way-sync-between-error-tracking-issues-and-linear-issues).

La relación entre las incidencias de Linear y las incidencias de Error Tracking es una relación 1:N. Una sola incidencia de Linear puede estar vinculada a múltiples incidencias de Error Tracking, pero una incidencia de Error Tracking solo puede estar vinculada a una única incidencia de Linear.

## Sincronización bidireccional de estados entre incidencias de Error Tracking e incidencias de Linear {#state-two-way-sync-between-error-tracking-issues-and-linear-issues}

Si la sincronización bidireccional está habilitada y configurada entre los equipos de Datadog y Linear, los estados de las incidencias de Error Tracking y las incidencias de Linear se reflejan mutuamente. Si encuentra algún comportamiento inesperado, consulte la sección [Solución de problemas](#troubleshooting) para saber cómo corregir su configuración.

### Una sola incidencia de Error Tracking vinculada a una sola incidencia de Linear {#single-error-tracking-issue-linked-to-single-linear-issue}

Cuando una sola incidencia de Error Tracking está vinculada a una incidencia de Linear, sus estados se sincronizan de forma bidireccional. La asignación entre estos estados se puede configurar en la configuración de Sincronización de datos del formulario de creación de incidencias de Linear:

{{< img src="error_tracking/linear-status-mapping.png" alt="Asignar estados de incidencias de Error Tracking a estados de incidencias de Linear" style="width:100%;" >}}

### Múltiples incidencias de Error Tracking vinculadas a una sola incidencia de Linear {#multiple-error-tracking-issues-linked-to-single-linear-issue}

Cuando varias incidencias de Error Tracking están vinculadas a la misma incidencia de Linear, sus estados se sincronizan según la acción que realice. Si actualiza el estado de la incidencia de Linear, todas las incidencias vinculadas de Error Tracking se actualizan para reflejar este estado de acuerdo con su asignación.

Suponiendo que su mapeo se define de la siguiente manera:

| Grupo de estado de gestión de trabajo | Estado de incidencia de Linear |
|------------------------------|--------------------|
| `Open`                       | `Todo`             |
| `In Progress`                | `In Progress`      |
| `Closed`                     | `Done`             |

Si actualiza el estado de una incidencia de Error Tracking, el estado resultante de otras incidencias de Error Tracking vinculadas y de la incidencia de Linear sigue estas reglas:

| Estado inicial                                                                  | Acción                                                          | Estado resultante                                                                                       |
|--------------------------------------------------------------------------------|-----------------------------------------------------------------|-------------------------------------------------------------------------------------------------------|
| La incidencia de Linear está `Done` y todas las incidencias de Error Tracking vinculadas están `Resolved`. | Actualice una incidencia de Error Tracking a `For Review`.                | La incidencia de Linear cambia a `Todo`. Las otras incidencias de Error Tracking vinculadas permanecen `Resolved`.         |
| La incidencia de Linear está `Todo` y todas las incidencias de Error Tracking vinculadas están `For Review`. | Actualice una incidencia de Error Tracking a `Resolved`.                  | La incidencia de Linear permanece `Todo`. La incidencia de Error Tracking actualizada está `Resolved`; las otras permanecen `For Review`. |
| La incidencia de Linear está `Done` y una incidencia de Error Tracking no vinculada está `For Review`. | Vincule la incidencia de Error Tracking `For Review` a la incidencia de Linear. | La incidencia de Linear permanece `Done`. Todas las incidencias de Error Tracking vinculadas están `Resolved`, incluida la recién vinculada. |
| La incidencia de Linear está `Todo` y una incidencia de Error Tracking no vinculada está `Resolved`. | Vincule la incidencia de Error Tracking `Resolved` a la incidencia de Linear.   | La incidencia de Linear permanece `Todo`. Las otras incidencias de Error Tracking vinculadas permanecen `For Review`, y la recién vinculada permanece `Resolved`. |

## Solución de problemas {#troubleshooting}

Si experimenta comportamientos inesperados al usar sistemas de tickets con Error Tracking, consulte los siguientes pasos de verificación de problemas. Si sigue teniendo problemas, comuníquese con el [soporte de Datadog][5].

### La sincronización entre Linear y Error Tracking está rota {#sync-is-broken-between-linear-and-error-tracking}

Si experimenta problemas de sincronización entre sus incidencias de Linear y las incidencias correspondientes de Error Tracking (por ejemplo, que el estado de la incidencia de Error Tracking no se actualice al cerrar la incidencia de Linear), verifique que todos los siguientes pasos estén configurados correctamente:

1. En el panel de incidencias, asegúrese de que la incidencia de Error Tracking esté vinculada correctamente a la incidencia de Linear.
2. Verifique que Work Management esté configurado correctamente para sincronizarse con Linear.

   Datadog crea automáticamente un elemento de trabajo de Work Management para vincular incidencias de Error Tracking e incidencias de Linear. Para verificar la configuración:
   - Desde el panel de incidencias, abra el elemento de trabajo de Work Management vinculado para encontrar su proyecto.
   - En la configuración de Work Management, verifique que la integración de Linear esté habilitada para este proyecto.
   - Verifique que el espacio de trabajo y el equipo de Linear correctos estén configurados.

3. En la configuración de Work Management, asegúrese de que la sincronización entre Work Management y Linear esté habilitada para este proyecto. Verifique que los campos que desea sincronizar estén configurados para la sincronización bidireccional entre Datadog y Linear.

4. En su configuración de Linear, verifique que haya un webhook configurado para sincronizar automáticamente las actualizaciones entre Datadog y Linear. Si falta el webhook, [agregue un webhook de Linear][6].

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/account_management/rbac/permissions/
[2]: https://app.datadoghq.com/error-tracking/
[5]: /es/help/
[6]: /es/integrations/linear/#configure-a-linear-webhook
[7]: /es/integrations/linear/