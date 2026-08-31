---
description: Aprende a crear y compartir vistas guardadas en el CD Visibility Explorer.
further_reading:
- link: /continuous_delivery/explorer/search_syntax/
  tag: Documentación
  text: Aprender a crear una consulta de búsqueda
title: Vistas guardadas
---

{{< callout url="https://docs.google.com/forms/d/e/1FAIpQLScNhFEUOndGHwBennvUp6-XoA9luTc27XBwtSgXhycBVFM9yA/viewform?usp=sf_link" btn_hidden="false" header="Únete a la vista previa" >}}
CD Visibility está en Vista previa. Si te interesa esta función, rellena el formulario para solicitar acceso.
{{< /callout >}}

## Información general

Las vistas guardadas te permiten guardar el estado de la [página de Ejecuciones de despliegues][1] y posibilitan una resolución eficaz de problemas, ya que te proporcionan acceso a consultas delimitadas, facetas relevantes, opciones de visualización e intervalos de tiempo.

Las vistas guardadas te permiten realizar un seguimiento de tus:

- Resultados de despliegues y datos del entorno
- Busca consultas (como ejecuciones de despliegues fallidas con un proveedor de CD específico, ejecuciones de despliegues fallidas en un entorno determinado por su estado de despliegue, ejecuciones de despliegues que requirieron reversiones, e ID o URL de despliegues).
- Intervalos de tiempo en directo (como la última hora o la última semana)
- Visualizaciones (como series temporales, lista de elementos principales, tabla o lista)

También puedes utilizar las vistas guardadas para compartir consultas y configuraciones comunes con tus compañeros de equipo.

## Vistas guardadas

Para acceder a las vistas guardadas, amplía **> Views* (> Vistas) a la izquierda de la [página de Ejecuciones de despliegues][1].

Todas las vistas guardadas, excepto la [vista por defecto](#default-views), se comparten en toda la organización, incluidas las vistas guardadas personalizadas creadas por los usuarios. Cualquier persona en tu organización puede editarlas y mostrar el avatar del usuario que creó la vista. Haz clic en **Save** (Guardar) para crear una vista guardada personalizada a partir del contenido actual de tu explorador.

<div class="alert alert-info">Los usuarios con permisos de sólo lectura no podrán actualizar, renombrar ni eliminar vistas guardadas.</div>

{{< img src="continuous_delivery/explorer/saved_view.png" alt="Vista por defecto en el CD Visibility Explorer" width="100%" >}}

Puedes:

- Cargar o volver a cargar una vista guardada
- Actualizar una vista guardada con la configuración de la vista actual
- Renombrar o borrar una vista guardada
- Compartir una vista guardada a través de un enlace corto
- Marcar una vista guardada como favorita para añadirla a tu lista de vistas guardadas, a la que tendrás acceso a través del menú de navegación

<div class="alert alert-info">Los usuarios con permisos de sólo lectura no podrán actualizar, renombrar ni eliminar vistas guardadas.</div>

## Vistas predeterminadas

Puedes configurar una vista guardada para que sea tu página de inicio en la [página de Ejecuciones de despliegues][1]. Las vistas predeterminadas se configuran por cada usuario y no tienen ningún impacto en tu organización.

{{< img src="continuous_delivery/explorer/default_view.png" alt="Vista por defecto en el CD Visibility Explorer" width="100%" >}}

Sobrescribir temporalmente tu vista guardada por defecto realizando una acción en la interfaz de usuario o abriendo enlaces en el explorador que integra una configuración diferente.

En la vista predeterminada del panel **Vistas**, puedes:

- Hacer clic en la entrada para volver a cargar la vista predeterminada
- Actualizar tu vista predeterminada con los parámetros actuales
- Restablecer la configuración por defecto de la vista predeterminada si quieres ejecutar un reinicio

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/ci/deployments/executions