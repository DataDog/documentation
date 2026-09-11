---
further_reading:
- link: /real_user_monitoring/explorer/search/
  tag: Documentación
  text: Búsqueda de tus eventos
title: Vistas guardadas
---

## Información general

Las vistas guardadas permiten guardar el estado del Explorador RUM y posibilitan la solución eficaz de problemas al proporcionar un acceso rápido a las consultas con contexto, las facetas relevantes, las opciones de visualización y el intervalo de tiempo. 

Las vistas guardadas te permiten hacer un seguimiento de tus:

- Eventos RUM (como sesiones, vistas, errores, acciones, recursos y tareas prolongadas)
- Consultas de búsqueda (como usuarios principales y adopción de versiones de aplicaciones)
- Orden de clasificación en las columnas
- Intervalo de tiempo en directo (como la última hora o la última semana)
- Visualizaciones (como series temporales, listas, tablas o gráficos de embudo)
- Subconjunto de facetas

También puedes utilizar las vistas guardadas para compartir consultas y configuraciones comunes con tus compañeros de equipo.

## Vistas guardadas

Para acceder a tus vistas guardadas, expande **> Vistas** hacia la izquierda, encima de la pestaña **Sesiones y Repeticiones** del [Explorador RUM][1].

Todas las vistas guardadas excepto la [vista por defecto](#default-views) se comparten en toda la organización, incluyendo:

- Vistas guardadas personalizadas creadas por los usuarios. Muestran el avatar del usuario que ha creado la vista y cualquier persona en tu organización puede editarlas. Haz clic en **Guardar** para crear una vista guardada personalizada a partir del contenido actual de tu Explorador RUM.
- Las plantillas de vistas guardadas son vistas guardadas predefinidas en el Explorador RUM. Puedes utilizar estas plantillas para crear una vista guardada con un avatar de Datadog. Para acceder a las plantillas, desplázate hasta la parte inferior de lista de vistas guardadas.
<br /><br />
  {{< img src="real_user_monitoring/explorer/rum-saved-views-2.png" alt="Acceder a las vistas guardadas haciendo clic en la pestaña que está a la izquierda de Real User Monitoring" width="90%" >}}

Podrás:

- Cargar o volver a cargar una vista guardada
- Actualizar una vista guardada con la configuración de la vista actual
- Renombrar o eliminar una vista guardada
- Compartir una vista guardada a través de un enlace corto
- Marcar una vista guardada como favorita para añadirla a tu lista de vistas guardadas, a la que tendrás acceso a través del menú de navegación

<div class="alert alert-info">Los usuarios con permisos de sólo lectura no podrán actualizar, renombrar ni eliminar vistas guardadas.</div>

## Vistas predeterminadas

Puede configurar una [vista guardada](#saved-views) para que sea tu página de inicio predeterminada en el [Explorador RUM][2]. Las vistas predeterminadas se configuran por cada usuario y no tienen ningún impacto en tu organización. 

Sobrescribe temporalmente la vista guardada por defecto realizando una acción en la interfaz de usuario o abriendo enlaces en el Explorador RUM que integra una configuración diferente.

En la vista predeterminada del panel **Vistas**, puedes:

- Hacer clic en la entrada para volver a cargar la vista predeterminada
- Actualizar tu vista predeterminada con los parámetros actuales
- Restablecer tu vista predeterminada a la configuración por defecto, si quieres ejecutar un reinicio

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/rum/explorer
[2]: /es/real_user_monitoring/explorer/