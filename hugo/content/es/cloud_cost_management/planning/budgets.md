---
aliases:
- /es/cloud_cost_management/budgets/
description: Después de comenzar a ingerir costos en Cloud Cost Management, configure
  presupuestos y visualice cómo está haciendo un seguimiento respecto a ellos.
further_reading:
- link: /cloud_cost_management/
  tag: Documentación
  text: Cloud Cost Management
- link: https://www.datadoghq.com/blog/cloud-cost-management-oci
  tag: Blog
  text: Administre y optimice sus costos de OCI con Datadog Cloud Cost Management
- link: https://www.datadoghq.com/blog/cloud-cost-management-budget-forecasting/
  tag: Blog
  text: Proyecte y administre el gasto en la nube con la previsión presupuestaria
    de Datadog
title: Presupuestos
---
## Descripción general {#overview}
Configure presupuestos y permita que los equipos de ingeniería visualicen cómo están haciendo un seguimiento respecto a los presupuestos.

Puede crear dos tipos de presupuestos:

- {{< ui >}}Basic{{< /ui >}}: Un presupuesto fijo de un solo nivel para realizar un seguimiento de sus costos en la nube.
- {{< ui >}}Hierarchical{{< /ui >}}: Un presupuesto de dos niveles, principal y secundario, para realizar un seguimiento de los costos de una manera que refleje la estructura de su organización. Por ejemplo, si su organización tiene departamentos compuestos por muchos equipos, puede presupuestar a nivel de departamento (principal) y de equipo (secundario) y realizar un seguimiento de la salud del presupuesto en ambos niveles. Además, esta opción le permite crear un presupuesto único en lugar de tener que crear varios presupuestos.

## Configurar presupuestos {#set-up-budgets}

{{< tabs >}}
{{% tab "Básico" %}}

Para crear un presupuesto básico:

1. Vaya a [**Cloud Cost > Plan > Budgets**][1], o cree un presupuesto a través de la [API][2] o [Terraform][3].
1. Haga clic en {{< ui >}}New Budget{{< /ui >}}.
1. Haga clic en {{< ui >}}Basic{{< /ui >}} para crear un presupuesto básico.
1. Puede agregar información de presupuesto {{< ui >}}uploading a CSV{{< /ui >}} usando la plantilla proporcionada en la interfaz de usuario, o {{< ui >}}enter your budget directly{{< /ui >}} usando los detalles a continuación.

   {{< img src="cloud_cost/budgets/budget-create-basic-1.mp4" alt="Elija si desea agregar información de presupuesto cargando un CSV o ingresándola directamente en la interfaz de usuario" video="true">}}

   - {{< ui >}}Budget Name{{< /ui >}}: Ingrese un nombre para su presupuesto.
   - {{< ui >}}Start Date{{< /ui >}}: Ingrese una fecha de inicio para el presupuesto (puede ser un mes pasado). Los presupuestos se establecen a nivel mensual.
   - {{< ui >}}End Date{{< /ui >}}: Establezca una fecha de finalización para el presupuesto (puede ser en el futuro).
   - {{< ui >}}Provider(s){{< /ui >}}: Presupueste en cualquier combinación de AWS, Azure, Google Cloud, Oracle Cloud u otro SaaS (incluidos Datadog o costos personalizados).
   - {{< ui >}}Dimension to budget by{{< /ui >}}: Especifique la dimensión a rastrear (como equipo, servicio o entorno). Luego, defina los valores específicos directamente en la tabla de presupuesto. Por ejemplo, para crear presupuestos para los cuatro equipos principales, seleccione "equipo" como dimensión y agregue los equipos como filas en la tabla. Puede seleccionar un valor de etiqueta existente o agregar uno nuevo para realizar un seguimiento del gasto futuro.

1. Complete todos los presupuestos en la tabla. Para aplicar los mismos valores del primer mes al resto de los meses, ingrese un valor en la primera columna de una fila y haga clic en el botón {{< ui >}}copy{{< /ui >}}.

   {{< img src="cloud_cost/budgets/budget-copy-paste.png" alt="Vista de creación de presupuesto: complete los detalles del presupuesto." style="width:100%;" >}}

1. Haga clic en {{< ui >}}Save{{< /ui >}}.

[1]: https://app.datadoghq.com/cost/plan/budgets
[2]: /es/api/latest/cloud-cost-management/#create-or-update-a-budget
[3]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/cost_budget

{{% /tab %}}

{{% tab "Jerárquico" %}}

Para crear un presupuesto jerárquico:

1. Navegue a [**Cloud Cost > Plan > Budgets**][1], o cree un presupuesto a través de la [API][2].
1. Haga clic en {{< ui >}}New Budget{{< /ui >}}.
1. Haga clic en {{< ui >}}Hierarchical{{< /ui >}} para crear un presupuesto jerárquico.
1. Ingrese la información de su presupuesto utilizando los detalles a continuación.

   - {{< ui >}}Budget Name{{< /ui >}}: Ingrese un nombre para su presupuesto.
   - {{< ui >}}Start Date{{< /ui >}}: Ingrese una fecha de inicio para el presupuesto (puede ser un mes pasado). Los presupuestos se establecen a nivel mensual.
   - {{< ui >}}End Date{{< /ui >}}: Establezca una fecha de finalización para el presupuesto (puede ser en el futuro).
   - {{< ui >}}Scope to Provider(s){{< /ui >}}: Presupueste en cualquier combinación de AWS, Azure, Google Cloud, Oracle Cloud u otro SaaS (incluidos Datadog o costos personalizados).
   - {{< ui >}}Parent Level{{< /ui >}}: Seleccione la etiqueta de nivel principal.
   - {{< ui >}}Child Level{{< /ui >}}: Seleccione la etiqueta de nivel secundario.
   - {{< ui >}}Dimension to budget by{{< /ui >}}: Especifique la dimensión a rastrear (como equipo, servicio o entorno). Luego, defina los valores específicos directamente en la tabla de presupuesto. Por ejemplo, para crear presupuestos para los cuatro equipos principales, seleccione "equipo" como dimensión y agregue los equipos como filas en la tabla. Puede seleccionar un valor de etiqueta existente o agregar uno nuevo para realizar un seguimiento del gasto futuro.

1. Complete todos los presupuestos en la tabla. Para aplicar los mismos valores del primer mes al resto de los meses, ingrese un valor en la primera columna de una fila y haga clic en el botón {{< ui >}}copy{{< /ui >}}.

   {{< img src="cloud_cost/budgets/budget-copy-paste.png" alt="Vista de creación de presupuesto: complete los detalles del presupuesto." style="width:100%;" >}}

1. Haga clic en {{< ui >}}Save{{< /ui >}}.

[1]: https://app.datadoghq.com/cost/plan/budgets
[2]: /es/api/latest/cloud-cost-management/#create-or-update-a-budget

{{% /tab %}}
{{< /tabs >}}

## Ver el estado del presupuesto {#view-budget-status}
La [página de presupuestos][1] lista todos los presupuestos de su organización, destacando al creador del presupuesto, cualquier presupuesto que se haya excedido,
y otros detalles relevantes. Haga clic en {{< ui >}}View Performance{{< /ui >}} para investigar el presupuesto y comprender qué podría estar causando que se exceda del presupuesto.

   {{< img src="cloud_cost/budgets/budget-list-1.png" alt="Listar todos los presupuestos">}}

Desde una página {{< ui >}}View Performance{{< /ui >}} de un presupuesto individual, puede alternar la opción de visualización desde la parte superior izquierda:

<div class="alert alert-info">
No puede ver el presupuesto frente a los valores reales antes de 15 meses, ya que las métricas de costos se conservan durante 15 meses.
</div>

- Puede ver el estado del presupuesto para el {{< ui >}}current month{{< /ui >}}:

   {{< img src="cloud_cost/budgets/budget-status-month-2.png" alt="Vista de estado del presupuesto: ver el mes actual">}}

- O puede ver el estado del presupuesto para el {{< ui >}}entire duration (all){{< /ui >}}:

   {{< img src="cloud_cost/budgets/budget-status-all-2.png" alt="Vista de estado del presupuesto: ver el presupuesto total">}}

Para investigar los presupuestos:
1. Desde la página de presupuesto individual, filtre los presupuestos usando el menú desplegable en la parte superior, o {{< ui >}}Apply filter{{< /ui >}} en la tabla para investigar las dimensiones que exceden el presupuesto.
   {{< img src="cloud_cost/budgets/budget-investigate-3.png" alt="Use el filtro desplegable o la opción Aplicar filtro en la tabla para investigar las dimensiones que exceden el presupuesto.">}}
2. Haga clic en {{< ui >}}Copy Link{{< /ui >}} para compartir el presupuesto con otros y ayudar a entender por qué los presupuestos se están excediendo. O comparta los presupuestos con el departamento de finanzas para que puedan entender cómo realiza el seguimiento de los presupuestos.

## Modifique o elimine un presupuesto {#modify-or-delete-a-budget}
Para modificar un presupuesto, haga clic en el icono de edición en la página de Presupuestos.

{{< img src="cloud_cost/budgets/budget-edit-1.png" alt="Haga clic en el icono de edición para editar un presupuesto"  style="width:70%;">}}

Para eliminar un presupuesto, haga clic en el icono de papelera en la página de Presupuestos.

{{< img src="cloud_cost/budgets/budget-delete-2.png" alt="Haga clic en el icono de eliminar para borrar un presupuesto"  style="width:70%;">}}

## Agregue un presupuesto a un tablero {#add-a-budget-to-a-dashboard}

Puede agregar un presupuesto a los tableros de dos maneras:

- Cree un informe de presupuesto y haga clic en {{< ui >}}Share{{< /ui >}} > {{< ui >}}Save to dashboard{{< /ui >}}.

  {{< img src="cloud_cost/budgets/budget-share-from-dashboard.png" alt="Haga clic en Compartir y Guardar en el tablero para agregar un informe de presupuesto a un tablero"  style="width:100%;">}}

- Desde un tablero, agregue el widget {{< ui >}}Budget Summary{{< /ui >}}.

  {{< img src="cloud_cost/budgets/budgets-widgets.png" alt="Busque y agregue el widget de Resumen de presupuesto desde cualquier tablero"  style="width:100%;">}}

## Cree una alerta para su presupuesto {#create-an-alert-for-your-budget}

Cree un [monitor basado en presupuesto][2] para recibir alertas cuando el gasto real o el gasto previsto proyecte exceder un porcentaje del presupuesto.

## Ver pronósticos en presupuestos {#view-forecasts-in-budgets}

Las tarjetas de presupuesto muestran automáticamente información de pronóstico cuando está disponible, mostrando los costos proyectados para cada período presupuestario. Si se proyecta que los costos pronosticados excedan su presupuesto, el estado del presupuesto indica {{< ui >}}Projected Over{{< /ui >}} para ayudarle a tomar medidas antes de exceder el presupuesto.

Para ver información detallada del pronóstico en un presupuesto, haga clic en {{< ui >}}View Performance{{< /ui >}} y active {{< ui >}}Show Forecast{{< /ui >}} para visualizar los costos previstos junto con el gasto real.

Obtenga más información sobre cómo funciona el [pronóstico][3] y los requisitos de datos.

## Personalice su pronóstico de presupuesto {#customize-your-budget-forecast}

Datadog genera automáticamente un **pronóstico de Bits** para cada presupuesto, proyectando los costos futuros a partir de su gasto histórico. Cuando usted tenga conocimiento que el pronóstico de Bits no pueda capturar, como un lanzamiento de producto planificado, una migración, una demanda estacional o cargas de trabajo retiradas, puede anularlo con sus propios valores. Esta anulación se denomina **pronóstico personalizado**.

Los valores del pronóstico personalizado son:

- Editables con el permiso `ccm_forecast_write` (consulte [Permisos](#permissions)).
- Editables para el mes actual y los meses futuros.

Para [presupuestos jerárquicos](#set-up-budgets), usted edita los valores del pronóstico personalizado a nivel secundario. El nivel principal refleja la suma de sus niveles secundarios.

Una vez establecidos, sus valores personalizados tienen prioridad sobre el pronóstico de Bits en la página de estado del presupuesto, en los totales de pronóstico en la página de Presupuestos y en los [monitores de presupuesto][2].

### Agregar o editar valores de pronóstico personalizado {#add-or-edit-custom-forecast-values}

{{< tabs >}}
{{% tab "Al crear un presupuesto" %}}

1. Siga los pasos en [Configurar presupuestos](#set-up-budgets) para comenzar a crear un presupuesto.
1. Active {{< ui >}}Customize Bits Forecast{{< /ui >}} para mostrar columnas de pronóstico intercaladas con las columnas de presupuesto. Cada mes muestra una columna {{< ui >}}Budget{{< /ui >}} y una columna {{< ui >}}Forecast{{< /ui >}}.

  {{< img src="cloud_cost/budgets/cust-fcst-during-create.png" alt="Active Customize Bits Forecast para mostrar columnas de pronóstico" style="width:100%;">}}

1. Cada celda de pronóstico muestra el Bits forecast como un marcador de posición gris. Ingrese un monto en dólares para anularlo. No se permiten valores negativos.

   El gráfico de vista previa se actualiza a medida que edita, por lo que puede revisar el pronóstico final antes de guardar.

  {{< img src="cloud_cost/budgets/cust-fcst-during-create-table.png" alt="Active Customize Bits Forecast para mostrar columnas de pronóstico" style="width:100%;">}}

1. Haga clic en {{< ui >}}Save{{< /ui >}}.

{{% /tab %}}
{{% tab "Al editar un presupuesto" %}}

1. En la [página de Presupuestos][1], haga clic en el icono de edición de un presupuesto.

   Las columnas de pronóstico aparecen automáticamente si tiene el permiso `ccm_forecast_write`. Cada celda de pronóstico muestra su anulación guardada, o el Bits forecast como un marcador de posición gris cuando no existe ninguna anulación.

1. Ingrese o cambie un monto en dólares en cualquier celda de pronóstico. No se permiten valores negativos.
1. Para comparar sus anulaciones con los valores automáticos originales, active {{< ui >}}Show Bits AI forecast{{< /ui >}} para mostrar una columna de Bits AI de solo lectura junto a cada columna de pronóstico.
1. Haga clic en {{< ui >}}Save{{< /ui >}}.

[1]: https://app.datadoghq.com/cost/plan/budgets

{{% /tab %}}
{{< /tabs >}}

Mientras edita, la apariencia de cada celda de pronóstico indica su estado:

| Apariencia de la celda | Significado |
|---|---|
| Texto gris | Marcador de posición del Bits forecast: no se ha establecido ninguna anulación para esta celda. |
| Texto negro | Una anulación de pronóstico personalizada guardada. |
| Texto negro con un contorno azul | Una anulación que ingresó pero que aún no ha guardado. |

Para eliminar una anulación, borre la celda. La celda vuelve al marcador de posición del Bits forecast gris.

<div class="alert alert-info">Datadog guarda el presupuesto primero y luego guarda el pronóstico personalizado. Si el presupuesto se guarda pero el pronóstico personalizado no, una notificación le pedirá que vuelva a intentarlo desde la página de edición.</div>

### Cómo se utilizan los pronósticos personalizados {#how-custom-forecasts-are-used}

- **Estado del presupuesto**: La página de estado del presupuesto y los totales de pronóstico en la página de Presupuestos incluyen su pronóstico personalizado.
- **Seguimiento de presupuesto**: Cuando los [seguimientos de presupuesto][2] evalúan, un pronóstico personalizado tiene prioridad sobre el Bits forecast cuando hay uno presente.
- **Exportación CSV**: Descargar un presupuesto como CSV incluye los valores de pronóstico personalizados donde estén establecidos.
- **Eliminar un presupuesto**: Eliminar un presupuesto también elimina sus valores de pronóstico personalizados asociados.

## Permisos {#permissions}

| Acción | Permiso requerido |
|--------|---------------------|
| Visualización de presupuestos | `cloud_cost_management_read` |
| Crear, editar o eliminar un presupuesto | `ccm_budget_write` |
| Editar valores de pronóstico personalizados | `ccm_forecast_write` |

Para ver la lista completa de permisos de CCM, consulte la [documentación de permisos][4].

## Lecturas adicionales {#further-reading}
{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/cost/plan/budgets
[2]: /es/cloud_cost_management/cost_changes/monitors/
[3]: /es/cloud_cost_management/planning/forecasting
[4]: /es/cloud_cost_management/setup/permissions