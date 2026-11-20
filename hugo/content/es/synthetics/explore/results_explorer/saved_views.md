---
aliases:
- /es/continuous_testing/explorer/saved_views/
further_reading:
- link: /synthetics/explore/results_explorer/search_syntax/
  tag: Documentación
  text: Aprender a crear una consulta de búsqueda
title: Vistas guardadas
---

## Información general

Las vistas guardadas permiten guardar el estado del [Explorador de monitorización Synthetic y de resultados de tests][2] y posibilitan la resolución eficaz de problemas al proporcionar un acceso rápido a las consultas con contexto, las facetas relevantes, las opciones de visualización y el intervalo de tiempo.

Las vistas guardadas te permiten realizar un seguimiento de tus:

- Lotes de CI y ejecuciones de tests
- Consultas de búsqueda (como ejecuciones de tests fallidas con códigos de estado de error HTTP, ejecuciones de tests fallidas en CI por su estado de bloqueo, ejecuciones de tests que requirieron reintentos y ID de tests para agregar a tu pipeline CI).
- Intervalos de tiempo en directo (como la última hora o la última semana)
- Visualizaciones (como series temporales, lista de elementos principales, tabla o lista)

También puedes utilizar las vistas guardadas para compartir consultas y configuraciones comunes con tus compañeros de equipo.

## Vistas guardadas

Para acceder a las vistas guardadas, expande **> Vistas** hacia la izquierda en el [Explorador de monitorización Synthetic y de resultados de tests][1].

Todas las vistas guardadas, excepto la [vista por defecto](#default-views), se comparten en toda la organización, incluidas las vistas guardadas personalizadas creadas por los usuarios. Cualquier persona en tu organización puede editarlas y mostrar el avatar del usuario que creó la vista. Haz clic en **Save** (Guardar) para crear una vista guardada personalizada a partir del contenido actual de tu explorador.

Puedes:

- Cargar o volver a cargar una vista guardada.
- Actualizar una vista guardada con la configuración de la vista actual.
- Renombrar o borrar una vista guardada.
- Compartir una vista guardada a través de un enlace corto.
- Marcar una vista guardada como favorita para añadirla a tu lista de vistas guardadas, a la que tendrás acceso a través del menú de navegación.

<div class="alert alert-info">Los usuarios con permisos de solo lectura no podrán actualizar, renombrar ni borrar vistas guardadas.</div>

## Vistas predeterminadas

Puedes configurar una vista guardada como página de inicio predeterminada en el [Explorador de monitorización Synthetic y de resultados de tests][2]. Las vistas predeterminadas se configuran por cada usuario y no afectan a la organización. 

{{< img src="continuous_testing/saved_view.png" alt="Vistas guardadas en el Explorador de monitorización Synthetic y de resultados de tests" width="100%" >}}

Sobrescribe temporalmente la vista guardada por defecto realizando una acción en la interfaz de usuario o abriendo enlaces en el Explorador de resultados que integra una configuración diferente.

En la entrada de la vista predeterminada del panel **Views** (Vistas), puedes:

- Hacer clic en la entrada para volver a cargar la vista predeterminada.
- Actualizar tu vista predeterminada con los parámetros actuales.
- Restablecer la configuración por omisión de la vista predeterminada si quieres ejecutar un reinicio.

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}


[1]: https://app.datadoghq.com/synthetics/explorer
[2]: /es/continuous_testing/explorer/