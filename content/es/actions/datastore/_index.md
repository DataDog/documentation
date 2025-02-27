---
aliases:
- /es/service_management/workflows/datastore/
- /es/service_management/app_builder/datastore/
disable_toc: false
further_reading:
- link: service_management/app_builder/build
  tag: Documentación
  text: Crear aplicaciones
- link: service_management/workflows/build
  tag: Documentación
  text: Crear flujos de trabajo
title: Datastore
---

{{< callout url="https://docs.google.com/forms/d/1NvW3I0Ep-lQo4FbiSwOEjccoFsS9Ue2wYiYDmCxKDYg/viewform?edit_requested=true" btn_hidden="false" header="Únete a la Vista previa">}}
Datastore está en vista previa. Utiliza este formulario para solicitar acceso hoy mismo.
{{< /callout >}}

## Información general

Apps Datastore ofrece una solución de almacenamiento de datos estructurada y escalable dentro de los productos App Builder y Automatización de flujos de trabajo de Datadog. Admite operaciones CRUD (crear, leer, actualizar y eliminar) y se integra a la perfección con el ecosistema de Datadog para optimizar el almacenamiento persistente de datos sin necesidad de bases de datos externas.

Puedes interactuar con un almacén de datos mediante una aplicación o un flujo de trabajo, o puedes utilizar la interfaz de usuario de la aplicación Datadog.


## Requisitos previos

Para interactuar con Apps Datastore, tu cuenta de Datadog debe tener los siguientes [permisos][6], que se incluyen en el rol estándar de Datadog:

* `apps_datastore_read`: Permite el acceso de lectura a los datos de Apps Datastore.
* `apps_datastore_write`: Permite la modificación de datos dentro de Apps Datastore, incluyendo la adición, edición y eliminación de registros.

Para utilizar la [interfaz de usuario de Apps Datastore][1] también necesitas el siguiente permiso que también se incluye en el rol estándar de Datadog:

* `apps_datastore_manage`: Permite la gestión de Apps Datastore, incluida la creación, actualización y eliminación del propio almacén de datos.


## Crear un almacén de datos

Para crear un almacén de datos:

1. Ve a la [página de Datastore][1].
1. Haz clic en **+ New Datastore** (+ Nuevo almacén de datos).
1. Introduce un **Nombre**, una **Clave principal** y, opcionalmente, una **Descripción** para tu almacén de datos. La clave principal debe ser un nombre de columna en tus datos, donde cada fila de datos tiene un valor único.
1. _Opcionalmente_, para cargar elementos iniciales en tu almacén de datos, utiliza uno de los siguientes métodos para copiar un archivo CSV:
   * Arrastra y suelta el archivo en la interfaz de usuario.
   * Haz clic en **browse files** (examinar archivos) para examinar y seleccionar un archivo de tu ordenador.
   * Copia un archivo CSV en tu ordenador y utiliza <kbd>Ctrl</kbd>/<kbd>Cmd</kbd> + <kbd>V</kbd> para pegarlo.

   El archivo CSV debe incluir una fila para el encabezado con una columna que coincida con tu clave principal.
1. Haz clic en **Create** (Crear).
1. Para ver tu almacén de datos en la lista, haz clic en **Refresh Results** (Actualizar resultados).

Después de rellenar tu almacén de datos con datos, puedes:

* Buscar el almacén de datos utilizando la casilla **Buscar** en el encabezado.
* Haz clic en el nombre de una columna para ordenar el almacén de datos por los datos de esa columna.


## Editar un almacén de datos

Para editar un almacén de datos, en la [página de Datastore][1] busca tu almacén de datos en la lista. Puedes realizar las siguientes operaciones:

* Para añadir una fila, haz clic en el icono **+ (más)**. Introduce los valores de cada campo de la fila y haz clic en **Create** (Crear).
* Para editar valores que no sean de clave principal en una fila existente, pasa el ratón por encima de la fila y haz clic en el icono del **Lápiz (Editar)**. Edita los valores elegidos y haz clic en **Save** (Guardar).
* Para eliminar una fila existente, colócate sobre ella y haz clic en el icono de la **Papelera (Eliminar)**. Haz clic en **Delete** (Eliminar) para confirmar.


## Referencia a un almacén de datos

Para utilizar valores de un almacén de datos en un flujo de trabajo o una aplicación:

1. En la [página de Datastore][1], busca tu almacén de datos en la lista.
1. En el encabezado de tu almacén de datos, haz clic en el botón **Copy Datastore UUID** (Copiar UUID del almacén de datos).
1. Utiliza este UUID para hacer referencia a tu almacén de datos en un flujo de trabajo o aplicación. Utiliza las acciones [Eliminar elemento][2], [Obtener elemento][3], [Enumerar elementos][4] o [Colocar element][5] y proporciona el UUID como tu **ID de almacén de datos**.


## Eliminar un almacén de datos

Para eliminar un almacén de datos, haz clic en el icono de la **Papelera (Eliminar almacén de datos)** del encabezado del almacén de datos que quieres eliminar y luego haz clic en **Confirm** (Confirmar).


## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/app-builder/datastore
[2]: https://app.datadoghq.com/workflow/action-catalog#/com.datadoghq.dd.apps_datastore/com.datadoghq.dd.apps_datastore.deleteDatastoreItem
[3]: https://app.datadoghq.com/workflow/action-catalog#/com.datadoghq.dd.apps_datastore/com.datadoghq.dd.apps_datastore.getDatastoreItem
[4]: https://app.datadoghq.com/workflow/action-catalog#/com.datadoghq.dd.apps_datastore/com.datadoghq.dd.apps_datastore.listDatastoreItems
[5]: https://app.datadoghq.com/workflow/action-catalog#/com.datadoghq.dd.apps_datastore/com.datadoghq.dd.apps_datastore.putDatastoreItem
[6]: /es/account_management/rbac/permissions/?tab=ui#app-builder--workflow-automation