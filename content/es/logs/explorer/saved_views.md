---
description: Utiliza Vistas guardadas para configurar automáticamente tu Log Explorer.
further_reading:
- link: logs/explorer/analytics
  tag: Documentación
  text: Realizar análisis de los logs
- link: /logs/log_configuration/processors
  tag: Documentación
  text: Aprende a procesar tus logs
title: Vistas guardadas
---

## Información general

Para solucionar problemas de forma eficaz, los datos deben estar en el **contexto** adecuado para poder explorarlos, tener acceso a **opciones de visualización** para que aparezca la información significativa y contar con **[facetas][1]** pertinentes que permitan el análisis.

Solucionar problemas es una actividad contextual, y las vistas guardadas te facilitan a ti y a tus compañeros de equipo el cambio entre los distintos contextos de solución de problemas. Puedes acceder a Vistas guardadas en la esquina superior izquierda del [Log Explorer][2].

{{< img src="logs/explorer/saved_views/overview.mp4" alt="Selección de Vistas guardadas" video=true style="width:90%;" >}}

Técnicamente, una Vista guardada realiza un seguimiento de:

- Una [consulta de búsqueda][3] junto con su rango temporal. **Nota**: La Vista guardada está pensada para seguir rangos temporales en vivo (como la hora pasada, o la semana pasada) y los rangos temporales fijos se convierten como tales al guardarlos.
- Una visualización personalizada por defecto ([flujo (stream) de log][4], [patrones de logs][5], o [análisis de log][6] junto con tus propiedades específicas de visualización).
- Un [subconjunto seleccionado de facetas][1] que se mostrará en la lista de facetas.

## Vista predeterminada

{{< img src="logs/explorer/saved_views/default.png" alt="Vista predeterminada" style="width:50%;" >}}

La vista existente del Log Explorer es la vista guardada por defecto. Esta configuración solo es accesible y visible para ti y la actualización de esta configuración no tiene ningún impacto en tu organización.

Puedes anular **temporalmente** la vista guardada por defecto realizando cualquier acción en la interfaz de usuario o al abrir enlaces al Log Explorer que integran una configuración diferente.

En cualquier momento, desde la entrada de la vista predeterminada en el panel Vistas, puedes:

* **Recargar** la vista predeterminada haciendo clic en la entrada.
* **Actualizar** tu vista predeterminada con los parámetros actuales.
* **Restablecer** tu vista predeterminada a los valores por defecto de Datadog para reiniciar de nuevo.

## Vistas guardadas

{{< img src="logs/explorer/saved_views/custom.png" alt="Vistas guardadas entre organizaciones" style="width:50%;" >}}

Todas las vistas guardadas, que no sean la vista guardada por defecto, se comparten en toda la organización:

* **Las vistas guardadas de integración** vienen predeterminadas con la mayoría de las [integraciones de Log Management][7]. Son de solo lectura y se identifican con el logotipo de la integración.
* **Las vistas guardadas personalizadas** son creadas por los usuarios. Pueden ser editadas por cualquier usuario de tu organización (excepto [Usuarios de solo lectura][8]), e identificadas con el avatar del usuario que la creó. Haz clic en el botón **save** (guardar) para crear una nueva vista guardada personalizada a partir del contenido actual de tu explorador.

{{< img src="logs/explorer/saved_views/save.png" alt="Logs -- Guardar" style="width:30%;" >}}

En cualquier momento, desde la entrada de la vista guardada en el panel Views (Vistas), puedes:

* **Cargar** o **recargar** una vista guardada.
* **Actualizar** una vista guardada con la configuración de la vista actual.
* **Cambiar el nombre**  o **eliminar** una vista guardada.
* **Compartir** una vista guardada mediante un enlace corto.
* **Marcar con una estrella** (convertir en favorita) una vista guardada para que aparezca en la parte superior de tu lista de vistas guardadas y sea accesible directamente desde el menú de navegación.

{{< img src="logs/explorer/saved_views/star.png" alt="Vistas marcadas" style="width:50%;" >}}

*Nota: Las acciones de actualización, cambio de nombre y eliminación están deshabilitadas para las vistas guardadas de integración y los [usuarios de solo lectura][8].

## Leer más

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/logs/explorer/facets/
[2]: /es/logs/explorer
[3]: /es/logs/explorer/search/
[4]: /es/logs/explorer/?tab=logstream#visualization
[5]: /es/logs/explorer/patterns/
[6]: /es/logs/explorer/analytics/
[7]: /es/integrations/#cat-log-collection
[8]: /es/account_management/rbac/permissions?tab=ui#general-permissions