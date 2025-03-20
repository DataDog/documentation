---
description: Después de empezar a ingerir costes en Cloud Cost Management, configura
  presupuestos y visualiza cómo los estás rastreando.
further_reading:
- link: /cloud_cost_management/
  tag: Documentación
  text: Cloud Cost Management
title: Presupuestos
---

## Información general
Una vez que empieces a ingerir tus costes en Cloud Cost Management, configura los presupuestos y visualiza cómo los estás rastreando.

## Crear un presupuesto

1. Ve a [**Cloud Cost > Plan > Presupuestos**][1].
2. Haz clic en el botón **Create a New Budget** (Crear un nuevo presupuesto).
3. Introduce los siguientes datos:
   - **Nombre del presupuesto**: Introduce un nombre para tu presupuesto.
   - **Fecha de inicio**: Introduce una fecha de inicio para el presupuesto (puede ser un mes pasado). Los presupuestos se configuran a nivel del mes.
   - **Fecha final**: Introduce una fecha final para el presupuesto (puede ser en el futuro).
   - **Proveedor(es)**: Presupuesto de cualquier combinación de AWS, Azure, Google Cloud u otro SaaS (incluyendo los costes de Datadog o personalizados).
   - **Dimensión del presupuesto**: Especifica una dimensión para rastrear el presupuesto, junto con sus valores correspondientes. Por ejemplo, si quieres crear presupuestos para los 4 equipos principales, debes seleccionar "equipo" en el primer desplegable y los equipos específicos en el segundo desplegable.

    {{< img src="cloud_cost/budgets/budget-create-define-1.png" alt="Vista de creación del presupuesto: rellena los detalles del presupuesto." style="width:100%;" >}}

4. Rellena todos los presupuestos de la tabla. Puedes copiar automáticamente los valores del primer mes al resto de los meses haciendo clic en el botón Copy (Copiar).

5. Haz clic en **Save** (Guardar) en la parte inferior derecha.

## Visualizar el estado del presupuesto
La página [Presupuestos][1] enumera todos los presupuestos de tu organización, resaltando el creador del presupuesto, los presupuestos excedidos
y otros detalles relevantes. Haz clic en **View Performance** (Ver rendimiento) para investigar el presupuesto y comprender qué puede estar causando que se sobrepase el presupuesto.

   {{< img src="cloud_cost/budgets/budget-list.png" alt="Enumerar todos los presupuestos">}}

En la página **Ver rendimiento** de un presupuesto individual, puedes alternar la opción de visualización desde la parte superior izquierda:

<div class="alert alert-info">
No puedes ver el presupuesto frente a los datos reales antes de los 15 meses, ya que las métricas de costes se conserva durante 15 meses.
</div>

- Puedes ver el estado del presupuesto para el **mes en curso**:

   {{< img src="cloud_cost/budgets/budget-status-month.png" alt="Vista del estado del presupuesto: ver el mes en curso">}}

- O puedes ver **toda la duración (todos)** del estado del presupuesto:

   {{< img src="cloud_cost/budgets/budget-status-all.png" alt="Vista del estado del presupuesto: ver el presupuesto total">}}

## Investigar presupuestos

   {{< img src="cloud_cost/budgets/budget-investigate-1.png" alt="Utiliza el filtro desplegable o la opción Aplicar filtro de la tabla para investigar dimensiones de exceso de presupuesto. ">}}

Para investigar presupuestos:
1. Desde la página del presupuesto individual, filtra los presupuestos utilizando el desplegable de la parte superior o la opción "Aplicar filtro" de la tabla para investigar las dimensiones que exceden el presupuesto.
2. Haz clic en **Copy Link** (Copiar enlace) para compartir el presupuesto con otras personas y ayudarles a entender por qué se están excediendo los presupuestos. O bien, comparte los presupuestos con el servicio de finanzas para mostrarles cómo los estás rastreando.

## Eliminar presupuestos
Para eliminar un presupuesto, haz clic en el icono de la papelera en la página Presupuestos.

   {{< img src="cloud_cost/budgets/budget-delete.png" alt="Enumera todos los presupuestos">}}

## Referencias adicionales
{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/cost/plan/budgets