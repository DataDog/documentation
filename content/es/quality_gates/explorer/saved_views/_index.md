---
further_reading:
- link: /quality_gates/explorer/search_syntax/
  tag: Documentación
  text: Aprender a crear consultas de búsqueda
title: Vistas guardadas
---

{{< callout url="#" btn_hidden="true" header="Únete a la Vista previa" >}}
Las Puertas de calidad están en vista previa.
{{< /callout >}}

## Información general

Las vistas guardadas te permiten guardar el estado del [Quality Gates Explorer][2] en la página [**Ejecuciones de Quality Gates**][1] y posibilitan la resolución eficaz de problemas al proporcionar un acceso a las consultas con contexto, las facetas relevantes, las opciones de visualización y el intervalo de tiempo. 

Las vistas guardadas te permiten realizar un seguimiento de tus:

- Ejecuciones de Quality Gate y ejecuciones de reglas
- Consultas de búsqueda 
- Secuencias de clasificación de columnas
- Intervalos de tiempo en directo (como la última hora o la última semana)
- Visualizaciones (como series temporales, lista principal, tablas o gráficos de embudo)
- Subconjuntos de facetas

También puedes utilizar las vistas guardadas para compartir consultas y configuraciones comunes con tus compañeros de equipo.

## Vistas guardadas

Para acceder a las vistas guardadas, despliega **> Views** (> Vistas) a la izquierda en [Quality Gates Explorer][1].

Todas las vistas guardadas, excepto la [vista por defecto](#default-views), se comparten en toda la organización, incluidas las vistas guardadas personalizadas creadas por los usuarios. Cualquier persona en tu organización puede editarlas y mostrar el avatar del creador de la vista. Haz clic en **Save** (Guardar) para crear una vista guardada a partir del contenido actual de tu explorador.

{{< img src="quality_gates/explorer/expand_view_1.png" text="Crear una vista guardada en el Quality Gates Explorer" style="width:100%" >}}

Puedes:

- Cargar o volver a cargar una vista guardada
- Actualizar una vista guardada con la configuración de la vista actual
- Renombrar o borrar una vista guardada
- Compartir una vista guardada a través de un enlace corto
- Marcar una vista guardada como favorita para añadirla a tu lista de vistas guardadas, a la que tendrás acceso a través del menú de navegación

<div class="alert alert-info">Los usuarios con permisos de sólo lectura no podrán actualizar, renombrar ni eliminar vistas guardadas.</div>

## Vistas predeterminadas

Puedes configurar una vista guardada para que sea tu página de inicio predeterminada en el [Explorador de puertas de calidad][2]. Las vistas predeterminadas se configuran por usuario y no afectan a tu organización. 

{{< img src="quality_gates/explorer/default_view_1.png" text="Configurar una vista por defecto en el Explorador de puertas de calidad" style="width:100%" >}}

Actualiza tu vista guardada por defecto actual a un diseño diferente que quieras definir como predeterminado. En el panel **Vistas**, guarda la vista actual como tu vista guardada por defecto.


## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/ci/quality-gates/executions
[2]: /es/quality_gates/explorer/