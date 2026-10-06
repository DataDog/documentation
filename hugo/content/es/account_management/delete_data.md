---
description: Elimine datos de logs de Datadog con los permisos adecuados, consultas
  basadas en tiempo y registro con Audit Trail para el cumplimiento.
further_reading:
- link: /account_management/rbac/
  tag: Documentación
  text: Obtenga información sobre roles y permisos
- link: /account_management/audit_trail/
  tag: Documentación
  text: Haga un seguimiento de la actividad del usuario con Audit Trail
title: Eliminar datos
---
Esta página explica cómo eliminar datos confidenciales que no deberían haberse ingerido en Datadog.

## Elimine datos que no sean de Logs{#delete-non-logs-data}

Para eliminar datos de un producto que no sea Logs, comuníquese con [Support][1] con su solicitud.

## Elimine datos de Logs{#delete-logs-data}

Puede eliminar datos del producto Logs utilizando la interfaz de usuario.

### Habilite la función de eliminación{#enable-deletion-feature}

La eliminación de datos de Logs solo puede ser habilitada por los administradores de la organización. Para habilitar la eliminación de datos de Logs:
1. En la configuración de la organización, vaya a Preferencias.
2. Active {{< ui >}}Logs Data Deletion{{< /ui >}} y guarde.

Para otorgar a un usuario la capacidad de eliminar logs:
1. En la configuración de la organización, vaya a [Roles][3].
2. Cree un rol que tenga el permiso {{< ui >}}Logs Delete Data{{< /ui >}}.

### Inicie eliminaciones{#start-deletions}

<div class="alert alert-info">Una solicitud de eliminación puede cancelarse hasta 10 días después de su envío.</div>

<div class="alert alert-danger"><strong>Para Logs</strong>: La eliminación de datos es permanente después de 10 días. Revise sus solicitudes de eliminación cuidadosamente.</div>

Para eliminar datos, realice los siguientes pasos:

1. En la configuración de la organización, vaya a [Data Deletion][4].
2. Seleccione un producto del cual eliminar. 
3. Seleccione un marco de tiempo en el cual buscar.
4. Realice una consulta de eventos dentro del marco de tiempo para eliminar.
5. Después de que la búsqueda muestre los resultados que desea eliminar, haga clic en el botón {{< ui >}}Delete{{< /ui >}} en la parte inferior derecha.
6. Confirme la eliminación seleccionando la casilla de verificación e ingresando el texto de confirmación solicitado. 
7. Haga clic en {{< ui >}}Confirm{{< /ui >}}.

La eliminación comienza instantáneamente después de que usted confirma la solicitud; los datos de destino son inaccesibles.

Desde la pestaña [Deletion History][5], puede ver el estado de las eliminaciones. También puede buscar eliminaciones en [Audit Trail][6] usando la cadena de búsqueda `@asset.name:"Data Deletion"`.

**Notas**:
- Las eliminaciones comienzan instantáneamente después de la confirmación. En algunos casos, los registros que llegan después de que el trabajo ha comenzado podrían no ser eliminados porque la eliminación ya ha procesado la ventana de tiempo en la que ocurrió ese registro.
- Al eliminar un registro, los datos derivados de ese registro no se eliminan (por ejemplo, las métricas generadas a partir de Logs).
- Se admite un máximo de 5 eliminaciones simultáneas.

### Cancelar eliminaciones {#cancel-deletions}

**Nota**: Cuando se crea una solicitud de eliminación, esta se encuentra en un estado recuperable durante 10 días. Durante este período, los datos eliminados son inaccesibles en Datadog pero se recuperan si la solicitud de eliminación se cancela.

Para cancelar una eliminación, haga clic en {{< ui >}}Cancel{{< /ui >}} en un trabajo {{< ui >}}Upcoming{{< /ui >}} o {{< ui >}}Done (Recoverable){{< /ui >}}.

### Auditar eliminaciones {#audit-deletions}

Las eliminaciones se registran en [Deletion History][5] durante 90 días. También se registran en [Audit Trail][6] junto con los detalles del usuario que realizó la solicitud.

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://www.datadoghq.com/support/
[2]: /es/account_management/rbac/permissions/
[3]: https://app.datadoghq.com/organization-settings/roles
[4]: https://app.datadoghq.com/organization-settings/data-deletion
[5]: https://app.datadoghq.com/organization-settings/data-deletion?data-deletion-tab=deletion-history
[6]: https://app.datadoghq.com/audit-trail?query=@asset.name:"Data%20Deletion"