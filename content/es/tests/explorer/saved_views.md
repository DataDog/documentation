---
further_reading:
- link: /tests/explorer/search_syntax/
  tag: Documentación
  text: Aprende a crear una consulta de búsqueda
- link: /tests/explorer
  tag: Documentación
  text: Más información sobre el Explorador de visibilidad de tests
kind: documentación
title: Vistas guardadas
---

## Información general

Las vistas guardadas permiten guardar el estado del [Explorador de visibilidad de tests][2] en la [**página Ejecuciones de tests**][1] y posibilitan la solución eficaz de problemas al proporcionar un acceso rápido a las consultas con contexto, las facetas relevantes, las opciones de visualización y el intervalo de tiempo. 

Las vistas guardadas permiten rastrear lo siguiente:

- Ejecuciones de tests
- Consultas de búsqueda (como tests defectuosos)
- Orden de las columnas
- Intervalo de tiempo en directo (como la última hora o la última semana)
- Visualizaciones (como series temporales, listas principales, tablas o gráficos de distribución)
- Subconjunto de facetas

También puedes utilizar las vistas guardadas para compartir consultas y configuraciones comunes con tus compañeros de equipo.

## Vistas guardadas

<div class="alert alert-info">Los usuarios con permisos de solo lectura no podrán actualizar, eliminar ni cambiar los nombres de las vistas guardadas.</div>

Para acceder a las vistas guardadas, expande **> Views** (Vistas) a la izquierda en el [Explorador de visibilidad de tests][1].

{{< img src="continuous_integration/saved-view-test-runs.png" alt="Acceder a las vistas guardadas mediante un clic en la pestaña a la izquierda de Visibilidad de tests" width="50%" >}}

Todas las vistas guardadas, excepto la [vista predeterminada](#default-views), se comparten en toda la organización, incluidas las vistas guardadas personalizadas que crean los usuarios. Cualquier persona de la organización puede editarlas y muestran el avatar del usuario que creó la vista. 

Haz clic en **Save** (Guardar) para crear una vista guardada personalizada a partir del contenido actual en el Explorador de visibilidad de tests.

Puedes hacer lo siguiente:

- Cargar o volver a cargar una vista guardada.
- Actualizar una vista guardada con la configuración de la vista actual.
- Eliminar o cambiar el nombre de una vista guardada.
- Compartir una vista guardada a través de un enlace corto.
- Marcar una vista guardada como favorita para añadirla a tu lista de vistas guardadas, a la que tendrás acceso a través del menú de navegación.

## Vistas predeterminadas

Puedes configurar una vista guardada como página de inicio predeterminada en el [Explorador de visibilidad de tests][2]. Las vistas predeterminadas se establecen por usuario y no afectan a la organización. 

Puedes anular temporalmente la vista guardada predeterminada si realizas una acción en la interfaz de usuario o si abres enlaces en el Explorador de visibilidad de tests con una configuración diferente.

En la entrada de la vista predeterminada del panel **Views** (Vistas), puedes hacer lo siguiente:

- Hacer clic en la entrada para volver a cargar la vista predeterminada.
- Actualizar la vista predeterminada con los parámetros actuales.
- Restablecer la vista predeterminada a los parámetros por defecto para ejecutar un reinicio.

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/ci/test-runs
[2]: /es/tests/explorer/