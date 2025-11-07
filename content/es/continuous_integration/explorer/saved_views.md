---
further_reading:
- link: /continuous_integration/explorer/search_syntax/
  tag: Documentación
  text: Más información sobre la creación de una consulta de búsqueda
- link: /continuous_integration/explorer
  tag: Documentación
  text: Más información sobre el Explorador de CI Visibility
title: Vistas guardadas
---

## Información general

Las vistas guardadas te permiten guardar el estado del [Explorador de CI Visibility][2] en la página [**Ejecuciones de tests**][3] y posibilitan la resolución eficaz de problemas al proporcionar un acceso rápido a las consultas con contexto, las facetas relevantes, las opciones de visualización y el intervalo de tiempo. 

Las vistas guardadas te permiten realizar un seguimiento de tus:

- Ejecuciones de pipelines
- Consultas de búsquedas (como trabajos fallidos)
- Secuencias de clasificación de columnas
- Intervalos de tiempo en directo (como la última hora o la última semana)
- Visualizaciones (como series temporales, lista de elementos principales, tablas o gráficos de distribución)
- Subconjuntos de facetas

También puedes utilizar las vistas guardadas para compartir consultas y configuraciones comunes con tus compañeros de equipo.

## Vistas guardadas

<div class="alert alert-info">Los usuarios con permisos de solo lectura no podrán actualizar, renombrar ni borrar vistas guardadas.</div>

Para acceder a las vistas guardadas, amplía **> Views** (> Vistas) a la izquierda del [Explorador de CI Visibility][1].

{{< img src="continuous_integration/saved-view-pipelines-executions.png" alt="Acceder a las vistas guardadas haciendo clic en la pestaña de la izquierda en CI Visibility" width="50%" >}}

Todas las vistas guardadas, excepto la [vista predeterminada](#default-views), se comparten en toda la organización, incluidas las vistas guardadas personalizadas que crean los usuarios. Cualquier persona de la organización puede editarlas y se mostrará el avatar del usuario que creó la vista.

Haz clic en **Save** (Guardar) para crear una vista guardada personalizada a partir del contenido actual en el Explorador de CI Visibility.

Puedes:

- Cargar o volver a cargar una vista guardada.
- Actualizar una vista guardada con la configuración de la vista actual.
- Renombrar o borrar una vista guardada.
- Compartir una vista guardada a través de un enlace corto.
- Marcar una vista guardada como favorita para añadirla a tu lista de vistas guardadas, a la que tendrás acceso a través del menú de navegación.

## Vistas predeterminadas

Configurar una vista guardada como página de inicio predeterminada en el [Explorador de CI Visibility][2]. Las vistas predeterminadas se definen por cada usuario y no afectan a tu organización. 

Sobrescribir temporalmente tu vista guardada por defecto realizando una acción en la interfaz de usuario o abriendo enlaces en el explorador que integra una configuración diferente.

En la entrada de la vista predeterminada del panel **Views** (Vistas), puedes:

- Hacer clic en la entrada para volver a cargar la vista predeterminada.
- Actualizar tu vista predeterminada con los parámetros actuales.
- Restablecer la configuración por omisión de la vista predeterminada si quieres ejecutar un reinicio.

## Leer más

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/ci/test-runs
[2]: /es/continuous_integration/explorer/
[3]: https://app.datadoghq.com/ci/pipeline-executions