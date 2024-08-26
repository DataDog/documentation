---
further_reading:
- link: /synthetics/search/
  tag: Documentación
  text: Aprende a buscar y gestionar tus tests de Synthetic
title: Vistas guardadas
---

## Información general

Las vistas guardadas te permiten guardar el estado de **Search and Manage** (Búsqueda y gestión) de la [página Tests de Synthetic][1]. De esta forma, podrás solucionar problemas de forma eficaz ya que podrás acceder rápidamente a consultas limitadas, facetas relevantes, [widgets de cobertura de tests][3] y al intervalo de tiempo.

También puedes utilizar las vistas guardadas para compartir consultas y configuraciones comunes con tus compañeros de equipo.

## Crear una vista guardada

Para acceder a tus vistas guardadas, expande **> Views** (> Vistas) a la izquierda de **Synthetic Monitoring & Continuous Testing** en la [página Tests de Synthetic][1]. Para crear una vista guardada, busca entre tus tests de Synthetic y haz clic en **+ Save new view as** (+ Guardar nueva vista como).

{{< img src="synthetics/search/create_a_new_saved_view_2.png" alt="Crear una nueva vista guardada en la página Tests de Synthetic" style="width:100%" >}}

Toda la organización tiene acceso a todas las vistas guardadas, excepto la [vista predeterminada](#default-views), incluidas las vistas guardadas personalizadas creadas por los usuarios. Cualquier persona de la organización puede editarlas y mostrarán el avatar de quien las creó. Indica un nombre y haz clic en **Save** (Guardar) para crear una vista guardada del contenido que aparece en la página de Tests de Synthetic.

Puedes:

- Cargar o volver a cargar una vista guardada
- Actualizar una vista guardada con la configuración de la vista actual
- Renombrar o borrar una vista guardada
- Compartir una vista guardada a través de un enlace corto
- Marcar una vista guardada como favorita para añadirla a tu lista de vistas guardadas, a la que tendrás acceso a través del menú de navegación

<div class="alert alert-info">Los usuarios con permisos de solo lectura no podrán actualizar, renombrar ni borrar vistas guardadas.</div>

## Vistas predeterminadas

Puedes establecer una [vista guardada](#create-a-saved-view) como página de inicio predeterminada en la [página Tests de Synthetic][2]. Las vistas predeterminadas se configuran en función del usuario y no afectan a toda la organización.

Reemplaza temporalmente tu vista guardada predeterminada al añadir facetas a tu consulta de búsqueda y hacer clic en **Update your default view** (Actualizar la vista predeterminada). Para crear una vista guardada nueva, haz clic en el botón **+ Save new view as** (+ Guardar nueva vista como).

{{< img src="synthetics/search/update_your_default_view_2.png" alt="Actualiza tu vista predeterminada en la página Tests de Synthetic" style="width:100%" >}}

En la entrada de la vista predeterminada del panel **Views** (Vistas), puedes:

- Hacer clic en la entrada para volver a cargar la vista predeterminada
- Actualizar tu vista predeterminada con los parámetros actuales
- Restablecer la configuración por defecto de la vista predeterminada si quieres ejecutar un reinicio

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/synthetics/tests
[2]: /es/synthetics/search/
[3]: /es/synthetics/test_coverage/