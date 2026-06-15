---
further_reading:
- link: /service_management/events/explorer/
  tag: Documentación
  text: Más información sobre Events Explorer
title: Vistas guardadas
---

## Información general

Las vistas guardadas de los eventos te facilitan a ti y a tus compañeros de equipo el cambio entre distintos contextos en los que se debe solucionar problemas. Guarda el estado de la [página de **Events Explorer**][1] y accede a:
- Consultas específicas
- Facetas relevantes
- Intervalo de tiempo

## Crear una vista guardada

<div class="alert alert-info">Los usuarios con permisos de solo lectura no podrán actualizar, renombrar ni borrar vistas guardadas.</div>

Todas las vistas guardadas, excepto la [vista predeterminada](#default-views), se comparten en toda la organización, incluidas las vistas guardadas personalizadas que han creado los usuarios. Cualquier persona de la organización puede editarlas y se mostrará el avatar del usuario que creó la vista. Para crear una vista guardada:
1. Personaliza la consulta de eventos para abarcar los eventos que estás solucionando. Para obtener más información, consulta la documentación de [Event Analytics][2] y [Sintaxis de búsqueda][3].
1. Haz clic en **+ Save** (+ Guardar).
1. Ingresa un nombre y haz clic en **Save** (Guardar) para crear una vista guardada.

Para acceder a las vistas guardadas, expande **> Views** (Vistas) a la izquierda de **Events Explorer**. Desde la entrada de la vista guardada en el panel Views (Vistas), puedes:

* **Cargar** o **recargar** una vista guardada.
* **Actualizar** una vista guardada con la configuración de la vista actual.
* **Renombrar** o **eliminar** una vista guardada.
* **Compartir** una vista guardada a través de un enlace corto.
* **Marcar con una estrella** (favorita) una vista guardada para que aparezca en la parte superior de tu lista de vistas guardadas y puedas acceder a ella directamente desde el menú de navegación.

## Vistas predeterminadas

Para acceder a tu vista predeterminada, expande **> Views** (Vistas) a la izquierda de **Events Explorer**. La vista existente del Events Explorer es tu vista guardada predeterminada. Solo tú puedes ver y acceder a esta configuración. La actualización de esta configuración no tiene ningún efecto en tu organización.

Reemplaza temporalmente tu vista guardada predeterminada al añadir facetas a tu consulta de búsqueda y al hacer clic en **Update your default view** (Actualizar la vista predeterminada). Para crear una vista guardada nueva, haz clic en el botón **+ Create a New Saved View** (+ Crear una vista guardada nueva).

En la entrada de la vista predeterminada del panel **Views** (Vistas), puedes:
* **Recargar** la vista predeterminada al hacer clic en la entrada.
* **Actualizar** tu vista predeterminada con los parámetros actuales.
* **Restablecer** tu vista predeterminada a los valores por defecto de Datadog para reiniciarla.

## Lectura adicional

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/event/explorer
[2]: /es/service_management/events/explorer/searching
[3]: /es/service_management/events/explorer/searching