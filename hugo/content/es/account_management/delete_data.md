---
private: true
title: Eliminar datos
---

{{< callout url="#" btn_hidden="true" header="false">}}
  La eliminación de datos mediante la interfaz de usuario está en Vista previa.
{{< /callout >}} 

En esta página se explica cómo eliminar datos de Datadog.

## Eliminar datos que no son de logs

Para eliminar los datos de un producto que no sean logs, ponte en contacto con [Soporte][1] con tu solicitud.

## Borrar datos de logs

Puedes eliminar datos del producto de logs utilizando la interfaz de usuario.

### Eliminación de accesos

Para conceder a una cuenta acceso a la eliminación de datos, realiza los siguientes pasos:

1. En Configuración de la organización, ve a [Roles][3].
2. Solicita o crea un rol que tenga el permiso **Delete Data** (Eliminar datos) para el producto del que deseas eliminar datos. Por ejemplo, para eliminar datos de logs, solicita o crea un rol con el permiso **Logs Delete Data** (Logs de eliminación de datos).

### Iniciar eliminaciones

<div class="alert alert-warning">Los datos eliminados nunca se pueden recuperar y las eliminaciones no se pueden deshacer.</div>

<div class="alert alert-info"><strong>Para logs</strong>: las eliminaciones no pueden asignarse a un índice específico, y se producen en todos los índices, índices flexibles y archivos en línea.
</div>

Para eliminar datos, sigue estos pasos:

1. En Parámetros de organización, ve a [Data Deletion][4] (Eliminación de datos).
2. Selecciona el producto que deseas eliminar. 
3. Selecciona un plazo entre el que buscar.
4. Consulta eventos dentro del plazo que deseas eliminar.
5. Una vez que la búsqueda muestre los resultados que deseas eliminar, haz clic en el botón **Delete** (Eliminar) de la parte inferior derecha.
6. Se te pedirá que confirmes la eliminación seleccionando una casilla de verificación e introduciendo un texto de confirmación. Haz clic en **Confirm** (Confirmar).

La eliminación comienza 2 horas después de que confirmes la solicitud.

Para validar una eliminación, marca la pestaña [Historial de eliminaciones][5], donde puedes ver el estado de las eliminaciones. También puedes buscar eliminaciones en [Audit Trail][6] mediante la cadena `@asset.name:"Data Deletion"`.

**Notas**:
- Las eliminaciones comienzan 2 horas después de la confirmación, y los registros coincidentes que lleguen durante este periodo se incluyen en la eliminación. En algunos casos, es posible que los registros que lleguen una vez iniciado el trabajo no se eliminen porque la eliminación ya ha procesado el plazo en el que se produjo ese registro.
- Al eliminar un registro, no se eliminan los datos derivados de ese registro (por ejemplo, métricas generadas a partir de logs).

### Detener las eliminaciones

**Nota**: Las eliminaciones en curso pueden cancelarse. Sin embargo, esto sólo impide la eliminación de datos que aún no se han procesado para un trabajo concreto.

Para cancelar una eliminación, haz clic en **Cancel** (Cancelar) en un trabajo **Upcoming** (Futuro) o **In Progress** (En curso).

### Auditoría de eliminaciones

Las eliminaciones se registran en el [Historial de eliminaciones][5] durante 90 días. También se registran en [Audit Trail][6] junto con los datos del usuario solicitante.

[1]: https://www.datadoghq.com/support/
[2]: /es/account_management/rbac/permissions/
[3]: https://app.datadoghq.com/organization-settings/roles
[4]: https://app.datadoghq.com/organization-settings/data-deletion
[5]: https://app.datadoghq.com/organization-settings/data-deletion?data-deletion-tab=deletion-history
[6]: https://app.datadoghq.com/audit-trail?query=@asset.name:"Data%20Deletion"