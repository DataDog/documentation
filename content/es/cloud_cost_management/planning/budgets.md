---
aliases:
- /es/cloud_cost_management/budgets/
description: Después de empezar a ingerir costes en Cloud Cost Management, configura
  presupuestos y visualiza cómo los estás rastreando.
further_reading:
- link: https://www.datadoghq.com/blog/cloud-cost-management-oci
  tag: Blog
  text: Gestionar y optimizar tus costes de OCI con Datadog Cloud Cost Management
- link: /cloud_cost_management/
  tag: Documentación
  text: Cloud Cost Management
title: Presupuestos
---

## Información general
Define presupuestos y permite a los equipos de ingenieros ver cómo se comparan con los presupuestos.

Puedes crear dos tipos de presupuestos:

- **Básico**: Un presupuesto plano y de un solo nivel para el seguimiento de tus costes de nube.
- **Jerárquico**: Un presupuesto de dos niveles, elementos principal-secundario para el seguimiento de los costes, de forma que refleje la estructura de tu organización. Por ejemplo, si tu organización tiene departamentos conformados por diversos equipos, puedes definir presupuestos a nivel de departamento (elemento principal) y equipo (elemento secundario), y realizar un seguimiento del estado de los presupuestos en ambos niveles. Además, esta opción te permite crear un único presupuesto, en lugar de tener que crear varios presupuestos.

## Definir presupuestos

{{< tabs >}}
{{% tab "Basic" %}}

Para crear un presupuesto básico:

1. Ve a [**Cloud Cost > Plan > Budgets** (Cloud Cost > Plan > Presupuestos)][1], o crea un presupuesto a través de la [API][2] o de [Terraform][3].
1. Haz clic en el botón **Create a New Budget** (Crear un nuevo presupuesto).
1. Haz clic en **Basic** (Básico) para crear un presupuesto básico.
1. Puedes añadir la información del presupuesto **cargando un CSV**, utilizando la plantilla proporcionada en la interfaz de usuario, o **introduciendo tu presupuesto directamente**, utilizando los datos que figuran a continuación.

   {{< img src="cloud_cost/budgets/budget-upload-your-csv.mp4" alt="Elegir entre añadir información del presupuesto cargando un CSV o introducirla directamente en la interfaz de usuario" video="true">}}

   - **Nombre del presupuesto**: Introduce un nombre para tu presupuesto.
   - **Fecha de inicio**: Introduce una fecha de inicio para el presupuesto (puede ser un mes pasado). Los presupuestos se configuran a nivel del mes.
   - **Fecha final**: Introduce una fecha final para el presupuesto (puede ser en el futuro).
   - **Proveedor(es)**: Define presupuestos en cualquier combinación de AWS, Azure, Google Cloud, Oracle Cloud, u otro SaaS (incluyendo costes de Datadog o personalizados).
   - **Dimensión del presupuesto**: Especifica una dimensión para rastrear el presupuesto, junto con sus valores correspondientes. Por ejemplo, si quieres crear presupuestos para los 4 equipos principales, debes seleccionar "equipo" en el primer desplegable y los equipos específicos en el segundo desplegable.

1. Rellena todos los presupuestos de la tabla. Para aplicar los mismos valores del primer mes al resto de los meses, introduce un valor en la primera columna de una fila y haz clic en el botón **Copy** (Copiar).

   {{< img src="cloud_cost/budgets/budget-copy-paste.png" alt="Vista de la creación de un presupuesto: rellenar la información del presupuesto." style="width:100%;" >}}

1. Haz clic en **Save** (Guardar).

[1]: https://app.datadoghq.com/cost/plan/budgets
[2]: /es/api/latest/cloud-cost-management/#create-or-update-a-budget
[3]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/cost_budget

{{% /tab %}}

{{% tab "Jerárquico" %}}

Para crear un presupuesto jerárquico:

1. Ve a [**Cloud Cost > Plan > Budgets** (Cloud Cost > Plan > Presupuestos)][1], o crea un presupuesto a través de la [API][2].
1. Haz clic en el botón **Create a New Budget** (Crear un nuevo presupuesto).
1. Haz clic en **Hierarchical** (Jerárquico) para crear un presupuesto jerárquico.
1. Introduce la información de tu presupuesto utilizando los detalles a continuación.

   - **Nombre del presupuesto**: Introduce un nombre para tu presupuesto.
   - **Fecha de inicio**: Introduce una fecha de inicio para el presupuesto (puede ser un mes pasado). Los presupuestos se configuran a nivel del mes.
   - **Fecha final**: Introduce una fecha final para el presupuesto (puede ser en el futuro).
   - **Delimitar a proveedor(es)**: Define presupuestos en cualquier combinación de AWS, Azure, Google Cloud, Oracle Cloud, u otro SaaS (incluyendo costes de Datadog o personalizados).
   - **Nivel principal**: Selecciona la etiqueta de nivel principal.
   - **Nivel secundario**: Selecciona la etiqueta de nivel secundario.
   - **Dimensión del presupuesto**: Especifica una dimensión para rastrear el presupuesto, junto con sus valores correspondientes. Por ejemplo, si quieres crear presupuestos para los 4 equipos principales, debes seleccionar "equipo" en el primer desplegable y los equipos específicos en el segundo desplegable.

1. Rellena todos los presupuestos de la tabla. Para aplicar los mismos valores del primer mes al resto de los meses, introduce un valor en la primera columna de una fila y haz clic en el botón **Copy** (Copiar).

   {{< img src="cloud_cost/budgets/budget-copy-paste.png" alt="Vista de la creación de un presupuesto: rellenar la información del presupuesto." style="width:100%;" >}}

1. Haz clic en **Save** (Guardar).

[1]: https://app.datadoghq.com/cost/plan/budgets
[2]: /es/api/latest/cloud-cost-management/#create-or-update-a-budget

{{% /tab %}}
{{< /tabs >}}

## Visualizar el estado del presupuesto
La página [Presupuestos][1] enumera todos los presupuestos de tu organización, resaltando el creador del presupuesto, los presupuestos excedidos
y otros detalles relevantes. Haz clic en **View Performance** (Ver rendimiento) para investigar el presupuesto y comprender qué puede estar causando que se sobrepase el presupuesto.

   {{< img src="cloud_cost/budgets/budget-list-1.png" alt="Definir una lista de todos los presupuestos">}}

En la página **Ver rendimiento** de un presupuesto individual, puedes alternar la opción de visualización desde la parte superior izquierda:

<div class="alert alert-info">
No puedes ver el presupuesto frente a los datos reales antes de los 15 meses, ya que las métricas de costes se conserva durante 15 meses.
</div>

- Puedes ver el estado del presupuesto para el **mes en curso**:

   {{< img src="cloud_cost/budgets/budget-status-month-2.png" alt="Vista del estado del presupuesto: ver el mes actual">}}

- O puedes ver el estado del presupuesto para **toda la duración (todo)**:

   {{< img src="cloud_cost/budgets/budget-status-all-2.png" alt="Vista del estado del presupuesto: ver presupuesto total">}}

Para investigar presupuestos:
1. Desde cada página de presupuesto individual, filtra los presupuestos utilizando el desplegable de la parte superior o "Apply filter" (Aplicar filtro) en la tabla para investigar las dimensiones por encima del presupuesto.
   {{< img src="cloud_cost/budgets/budget-investigate-3.png" alt="Utilizar el filtro desplegable o la opción Apply Filter (Aplicar filtro) en la tabla para investigar las dimensiones por encima del presupuesto.">}}
2. Haz clic en **Copy Link** (Copiar enlace) para compartir el presupuesto con otras personas y ayudarles a entender por qué se están excediendo los presupuestos. O bien, comparte los presupuestos con el servicio de finanzas para mostrarles cómo los estás rastreando.

## Modificar o eliminar un presupuesto
Para modificar un presupuesto, haz clic en el icono de edición de la página Presupuestos.

{{< img src="cloud_cost/budgets/budget-edit-1.png" alt="Hacer clic en el icono de edición para editar un presupuesto"  style="width:70%;">}}

Para eliminar un presupuesto, haz clic en el icono de la papelera en la página Presupuestos.

{{< img src="cloud_cost/budgets/budget-delete-2.png" alt="Hacer clic en el icono de eliminación para borrar un presupuesto"  style="width:70%;">}}

## Añadir un presupuesto a un dashboard

Puedes añadir un presupuesto a un dashboard de dos maneras:

- Crea un informe de presupuesto y haz clic en **Share > Save to dashboard* (Compartir > Guardar en el dashboard).

  {{< img src="cloud_cost/budgets/budget-share-from-dashboard.png" alt="Hacer clic en Share and Save to Dashboard (Compartir y guardar en el dashboard) para añadir un informe de presupuesto a un dashboard"  style="width:100%;">}}

- Desde un dashboard, añade el widget **Budget Summary** (Resumen del presupuesto).

  {{< img src="cloud_cost/budgets/budgets-widgets.png" alt="Buscar y añadir el widget Budget Summary (Resumen del presupuesto) en cualquier dashboard"  style="width:100%;">}}

## Crear una alerta para tu presupuesto

Más información sobre cómo [crear un monitor para presupuestos][2].

## Referencias adicionales
{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/cost/plan/budgets
[2]: /es/cloud_cost_management/cost_changes/monitors/