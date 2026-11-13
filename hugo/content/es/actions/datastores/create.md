---
aliases:
- /es/actions/datastore/create
description: Cree Datastores con claves principales, inicialice datos y administre
  el contenido del Datastore mediante edición manual o carga de archivos.
disable_toc: false
further_reading:
- link: actions/app_builder/build
  tag: Documentación
  text: Crear aplicaciones
- link: actions/workflows/build
  tag: Documentación
  text: Cree flujos de trabajo
- link: https://www.datadoghq.com/blog/datadog-datastore/
  tag: Blog
  text: Mejore sus flujos de trabajo automatizados y aplicaciones automatizadas con
    Datastore
title: Cree y administre Datastore
---
Puede crear y administrar Datastores desde la [página de Datastore][1].

## Cree un Datastore {#create-a-datastore}

Para crear un Datastore:

1. Navegue a la [página de Datastore][1].
1. Haga clic en {{< ui >}}\+ New Datastore{{< /ui >}}.
1. Ingrese un {{< ui >}}Name{{< /ui >}} para su Datastore.
1. Ingrese una {{< ui >}}Primary Key{{< /ui >}} o active la opción para {{< ui >}}Autogenerate a Primary Key{{< /ui >}} si una clave principal no es esencial para su caso de uso.
   - Si elige ingresar una clave principal, la clave debe ser un nombre de columna en sus datos donde cada clave tenga un valor único.
   - Elegir la generación automática de una clave elimina su capacidad de proporcionar sus propias claves para nuevos elementos en el Datastore, pero aún puede actualizar elementos existentes especificando sus claves.
1. Opcionalmente, ingrese una {{< ui >}}Description{{< /ui >}} para su Datastore.
1. _Opcionalmente_, puede inicializar su Datastore con datos iniciales desde un archivo JSON o CSV. Utilice uno de los siguientes métodos para cargar el contenido del archivo:
   * Arrastre y suelte el archivo en la interfaz de usuario.
   * Haga clic en {{< ui >}}browse files{{< /ui >}} para buscar y seleccionar un archivo desde su computadora.
   * Copie un archivo CSV en su computadora y use <kbd>Ctrl</kbd>/<kbd>Cmd</kbd> + <kbd>V</kbd> para pegarlo.

   El archivo CSV o JSON debe incluir una fila de encabezado con una columna que coincida con su clave principal.
1. Haga clic en {{< ui >}}Create{{< /ui >}}. Aparece una ventana emergente de confirmación con opciones para [crear un flujo de trabajo o una aplicación][2] desde su Datastore, o visualizar el Datastore.

### Cree desde una aplicación o flujo de trabajo {#create-from-an-app-or-workflow}

Puede crear un Datastore desde una aplicación o flujo de trabajo haciendo clic en el botón {{< ui >}}Datastore ID{{< /ui >}} en una acción de Datastore y seleccionando {{< ui >}}New Datastore{{< /ui >}}.

{{< img src="actions/datastore/datastore-create.png" alt="Cree un flujo de trabajo desde un flujo de trabajo haciendo clic en New Datastore" style="width:100%;" >}}

## Edite un Datastore {#edit-a-datastore}

### Edite sus datos manualmente {#manually-edit-your-data}

Para editar manualmente una fila en su Datastore:
1. En la [página de Datastores][1], localice su Datastore y haga clic para abrirlo.
1. Pase el cursor sobre la fila que desea cambiar y haga clic en el {{< ui >}}Edit{{< /ui >}} {{< img src="icons/pencil.png" inline="true" style="width:14px;">}} icono.
1. Utilice las pestañas {{< ui >}}JSON{{< /ui >}} o {{< ui >}}Raw text{{< /ui >}} para editar las claves en la fila.

**Nota:** No puede editar manualmente la clave principal en una fila. Si necesita editar una clave principal, elimine la fila y vuelva a agregarla o vuelva a cargar los datos desde un archivo.

### Actualice mediante un archivo {#update-using-a-file}

Para actualizar un Datastore mediante un archivo:
1. En la [página de Datastores][1], localice su Datastore y haga clic para abrirlo.
1. Haga clic en {{< ui >}}Add Data{{< /ui >}}.
1. Seleccione una opción sobre cómo se deben manejar sus datos.
   - {{< ui >}}Overwrite{{< /ui >}} reemplaza las filas existentes en su tabla con los datos de su archivo.
   - {{< ui >}}Append{{< /ui >}} agrega las filas de su archivo al conjunto de datos existente. La opción de agregar no le permite añadir entradas duplicadas a su conjunto de datos.
1. Haga clic en {{< ui >}}Add{{< /ui >}}.

## Visualizar un Datastore {#view-a-datastore}

Para visualizar un Datastore, localice su Datastore en la [página de Datastore][1] y haga clic para abrirlo.

Después de haber abierto un Datastore, puede:
- Exportar el conjunto de datos a un archivo JSON o CSV.
- Haga clic en {{< ui >}}Columns{{< /ui >}} para mostrar u ocultar las columnas de la tabla.
- Haga clic en {{< ui >}}Create{{< /ui >}} para [crear un flujo de trabajo o una aplicación][2] a partir del Datastore.
- Haga clic en {{< ui >}}Add data{{< /ui >}} para [agregar datos](#edit-a-datastore) desde un archivo CSV o JSON.

El botón {{< ui >}}Table Options{{< /ui >}} le permite:
- Editar los [permisos de Datastore][3].
- Copie el UUID de Datastore, lo cual es útil para [apps con múltiples referencias a Datastore][4].
- Clone el Datastore.
- Elimine el Datastore.

## Limitaciones {#limitations}

Los almacenes de datos tienen las siguientes limitaciones:

- Un Datastore puede contener hasta 100,000 filas.
- Se requiere una columna de clave principal de tipo `string` y debe identificar de forma única cada fila.
- Cada fila puede tener un tamaño de hasta 100 KB.
- El valor de la clave principal es inmutable; no se puede cambiar después de que se crea la fila.

Comuníquese con [support][5] si tiene un caso de uso que exceda estos límites.

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/actions/datastores
[2]: /es/actions/datastore/use#create-workflow-app
[3]: /es/actions/datastore/auth/
[4]: /es/actions/datastore/use#multiple-datastores
[5]: /es/help/