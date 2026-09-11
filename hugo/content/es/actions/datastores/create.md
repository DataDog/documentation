---
aliases:
- /es/actions/datastore/create
description: Crea almacenes de datos con claves primarias, siembra datos iniciales
  y gestiona el contenido de los almacenes de datos mediante edición manual o carga
  de archivos.
disable_toc: false
further_reading:
- link: service_management/app_builder/build
  tag: Documentación
  text: Crear aplicaciones
- link: service_management/workflows/build
  tag: Documentación
  text: Crear flujos de trabajo
- link: https://www.datadoghq.com/blog/datadog-datastore/
  tag: Blog
  text: Mejorar tus aplicaciones y flujos de trabajo automatizados con almacenes de
    datos
title: Crear y gestionar almacenes de datos
---

Puedes crear y gestionar almacenes de datos desde la [página de Datastore][1].

## Crear un almacén de datos

Para crear un almacén de datos:

1. Navega hasta la página de [Datastores][1] (Almacenes de datos).
1. Haz clic en **+ New Datastore** (+ Nuevo almacén de datos).
1. Introduce un **Name** (Nombre) para tu almacén de datos.
1. Introduce una **Primary Key** (Clave primaria) o activa la opción **Autogenerate a Primary Key** (Autogenerar una clave primaria) si una clave primaria no es esencial para tu caso de uso.
   - Si eliges introducir una clave primaria, la clave debe ser un nombre de columna en tus datos donde cada clave tenga un valor único.
   - Si eliges Autogenerar una clave, no podrás proporcionar tus propias claves para los nuevos elementos del almacén de datos, pero podrás actualizar los elementos existentes especificando sus claves.
1. Opcionalmente, puedes introducir una **Description** (Descripción) para tu almacén de datos.
1. Opcionalmente, puedes sembrar yu almacén de datos con los datos iniciales de un archivo JSON o CSV. Utiliza uno de los siguientes métodos para cargar el contenido del archivo:
   * Arrastra y suelta el archivo en la interfaz de usuario.
   * Haz clic en **browse files** (examinar archivos) para examinar y seleccionar un archivo de tu ordenador.
   * Copia un archivo CSV en tu ordenador y utiliza <kbd>Ctrl</kbd>/<kbd>Cmd</kbd> + <kbd>V</kbd> para pegarlo.

   El archivo CSV o JSON debe incluir una fila de encabezado con una columna que coincida con tu Clave principal.
1. Haz clic en **Create** (Crear). Aparecerá una ventana emergente de confirmación con opciones para [crear un proceso o un aplicación][2] desde tu almacén de datos, o ver el almacén de datos.

### Crear desde una aplicación o proceso

Puedes crear un almacén de datos desde una aplicación o proceso haciendo clic en el botón **Datastore ID** (ID del almacén de datos) de una acción de almacén de datos y seleccionando **New Datastore** (Nuevo almacén de datos).

{{< img src="actions/datastore/datastore-create.png" alt="Crear un proceso desde un proceso al hacer clic en Nuevo almacén de datos" style="width:100%;" >}}

## Editar un almacén de datos

### Editar manualmente tus datos

Para editar manualmente una fila de tu almacén de datos:
1. En la [página Datastores][1] (Almacenes de datos), localiza tu almacén de datos y haz clic para abrirlo.
1. Pasa el ratón por encima de la fila que desees modificar y haz clic en el icono **Edit** (Editar) {{< img src="icons/pencil.png" inline="true" style="width:14px;">}}.
1. Utiliza las pestañas **JSON** o **Texto sin formato** para editar las claves de la fila.

**Nota:** No puedes editar manualmente la clave primaria de una fila. Si necesitas editar una clave primaria, elimina la fila y vuelve a añadirla o vuelve a cargar los datos desde un archivo.

### Actualizar mediante un archivo

Para actualizar un almacén de datos mediante un archivo:
1. En la [página Datastores][1] (Almacenes de datos), localiza tu almacén de datos y haz clic para abrirlo.
1. Haz clic en **Add Data** (Añadir datos).
1. Selecciona una opción para el tratamiento de tus datos.
   - **Sobrescribir** reemplaza las filas existentes en tu tabla con los datos de tu archivo.
   - **Añadir** añade las filas de tu archivo al conjunto de datos existente. La opción añadir no permite añadir entradas duplicadas al conjunto de datos.
1. Haz clic en **Add** (Añadir).

## Ver un almacén de datos

Para ver un almacén de datos, localízalo en la [página Datastores][1] (Almacenes de datos) y haz clic para abrirlo.

Después de abrir un almacén de datos, puedes:
- Exportar el conjunto de datos a un archivo JSON o CSV.
- Haz clic en **Columns** (Columnas) para mostrar u ocultar las columnas de la tabla.
- Haz clic en **Create** (Crear) para [crear un proceso o aplicación][2] desde el almacén de datos.
- Haz clic en **Add data** (Añadir datos) para [añadir datos](#edit-a-datastore) desde un archivo CSV o JSON.

El botón **Table Options** (Opciones de tabla) te permite:
- Editar los [permisos del almacén de datos][3].
- Copia el UUID del almacén de datos, lo que resulta útil para [aplicaciones con múltiples referencias a almacenes de datos][4].
- Clonar el almacén de datos.
- Eliminar el almacén de datos.

## Limitaciones

Datastore tiene las siguientes limitaciones:

- Tu organización puede tener hasta 50 almacenes de datos.
- Un almacén de datos puede contener hasta 5.000 filas.
- Se requiere una columna de clave primaria de tipo `string` que identifique de forma única cada fila.
- Cada fila puede tener un tamaño de hasta 100 KB.
- El valor de la clave primaria es inmutable, no puede modificarse una vez creada la fila.

Si tienes un caso de uso que supera estos límites, ponte en contacto con el [servicio de asistencia][5].

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/actions/datastores
[2]: /es/actions/datastore/use#create-workflow-app
[3]: /es/actions/datastore/auth/
[4]: /es/actions/datastore/use#multiple-datastores
[5]: /es/help/