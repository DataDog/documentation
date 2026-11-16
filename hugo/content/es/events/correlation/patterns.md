---
aliases:
- /es/service_management/events/correlation/patterns/
further_reading:
- link: events/correlation/triage_and_notify
  tag: Documentación
  text: Aprenda sobre la clasificación y notificación de elementos de trabajo
title: Correlación basada en patrones
---
## Descripción general {#overview}

La correlación basada en patrones le permite controlar cómo se correlacionan los eventos. Datadog también utiliza aprendizaje automático para enriquecer automáticamente su patrón con eventos relacionados de Datadog Monitor, utilizando la telemetría subyacente recopilada dentro de Datadog y otras heurísticas.

Para comenzar, Datadog sugiere automáticamente [correlaciones basadas en patrones][1] según su entorno. Haga clic en cualquiera de las recomendaciones para abrir la configuración del patrón recomendado. Los campos de configuración están precargados.

## Crear un patrón {#create-a-pattern}

Para crear un patrón:
1. Vaya a [Correlation][1].
1. Haga clic en {{< ui >}}\+ Add a Pattern{{< /ui >}}, en la parte superior de la tabla de patrones. Esto abre una página de configuración de patrones que muestra los patrones sugeridos listos para usar en el lado izquierdo y una vista previa de la salida del patrón en el lado derecho. 
1. Puede ajustar un patrón sugerido haciendo clic en {{< ui >}}\+ Continue With Pattern{{< /ui >}}. Esto lo lleva a la página de configuración precargada para realizar ajustes adicionales. O bien, puede optar por crear su propio patrón haciendo clic en {{< ui >}}\+ Personalize From Scratch{{< /ui >}}

Primero, los eventos se deduplican para generar alertas según la clave de agregación de eventos. Luego, las alertas se correlacionan con un elemento de trabajo según la configuración. 
{{< img src="events/correlation/correlation_helper.mp4" alt="Cuando los eventos coinciden con la fuente y el filtro definidos, se deduplican en alertas. Las alertas se correlacionan según los atributos de agrupación y sus eventos se deduplican dentro de la ventana de tiempo definida antes de que el proceso se repita en un nuevo elemento de trabajo. Puede modificar esta configuración en los ajustes" video=true >}}
Para obtener más información sobre cómo enviar eventos con una clave de agregación, consulte [enviar eventos a datadog][5]. Los eventos sin una clave de agregación se deduplican en una sola alerta dentro del marco de tiempo.

### Patrones sugeridos {#suggested-patterns}
Los patrones sugeridos se recomiendan según sus etiquetas de servicio y entorno de uso común para ayudarle a comenzar rápidamente con la correlación de eventos. 

### Configuración {#configuration}
Desde la [página de configuración de correlación][2]
1. Seleccione la fuente de eventos que desea agrupar desde el menú desplegable.
1. Para excluir cualquier evento de la fuente definida anteriormente, agregue una consulta de evento en {{< ui >}}Filter by these events or tags{{< /ui >}} para filtrarlos.
1. Agregue eventos relacionados para asociar cambios u otros eventos complementarios para respaldar la investigación de elementos de trabajo. Los eventos relacionados se añadirán a un elemento de trabajo, pero no crearán nuevos elementos de trabajo.
1. Defina las etiquetas de agrupación. Las etiquetas de agrupación son facetas de eventos. Consulte la sección de [configuración avanzada](#advanced-settings-optional) a continuación si no ve la etiqueta en el menú desplegable. 
**Nota**: puede crear una faceta tanto en atributos de eventos como en etiquetas. Para obtener más información, consulte la documentación de [facetas][4]. 

### Configuración avanzada (opcional) {#advanced-settings-optional}
1. Haga clic en {{< ui >}}Show Advanced Settings{{< /ui >}}.
1. Puede agregar etiquetas de agrupación para correlacionar eventos y personalizar el título del elemento de trabajo.
   
   Agregar etiquetas de agrupación
   : para agregar nuevas etiquetas de agrupación, esto es igual a agregar una [nueva faceta de evento][3].

   Personalizar el título del elemento de trabajo
   : para crear una plantilla para reemplazar el título del elemento de trabajo generado automáticamente. Puede hacer referencia a variables de plantilla de etiqueta usando la sintaxis de llaves, por ejemplo "{{tag.service}}", para incluir una lista de valores de etiqueta separados por comas.
   
1. En {{< ui >}}Correlator Logic{{< /ui >}}, configure cuándo crear un elemento de trabajo y cuánto tiempo correlacionar alertas y deduplicar eventos:

   {{< img src="events/correlation/pattern/correlator_logic_advanced_settings.png" alt="Pestaña de Lógica del correlacionador en Configuración avanzada que muestra las opciones de recuento mínimo de alertas, duración de correlación, cierre automático, deduplicación de eventos y deduplicación extendida" style="width:100%;" >}}

   Recuento mínimo de alertas
   : el número mínimo de alertas correlacionadas requerido para crear un elemento de trabajo. Si el mínimo es uno, la primera alerta correlacionada crea el elemento de trabajo.

   Ventana de correlación
   : la duración máxima durante la cual se pueden agregar nuevas alertas al mismo elemento de trabajo. Esta ventana comienza cuando se correlaciona la primera alerta.

   Crear un nuevo elemento de trabajo después del cierre automático
   : cuando está habilitado, una alerta coincidente crea un nuevo elemento de trabajo después de que el elemento de trabajo anterior se cierra automáticamente.

   Ventana de deduplicación
   : la duración durante la cual se asocian eventos adicionales de una alerta que ya está en el elemento de trabajo con dicha alerta. Esta ventana comienza cuando se correlaciona la primera alerta.

   Extender la ventana de deduplicación hasta que todas las alertas se resuelvan
   : cuando está habilitado, las alertas no resueltas que ya están en el elemento de trabajo pueden seguir recibiendo eventos después de que expire la ventana de deduplicación, hasta por 30 días. Esta configuración no extiende la ventana de correlación para agregar nuevas alertas.

   Por ejemplo, considere un patrón con un recuento mínimo de alertas de uno, una ventana de correlación de 48 horas y una ventana de deduplicación de 48 horas:
   - La alerta A se correlaciona a las 9:00 a. m. del lunes. Crea un elemento de trabajo y ambas ventanas comienzan.
   - La alerta B se correlaciona a las 10:00 a. m. del lunes y se agrega al mismo elemento de trabajo. Los eventos adicionales de la alerta A o la alerta B durante la ventana de deduplicación se asocian con sus alertas existentes.
   - Ambas ventanas configuradas vencen a las 9:00 a. m. del miércoles.
   - la alerta C se correlaciona a las 10:00 a. m. del miércoles. Debido a que la ventana de correlación ha finalizado, no puede unirse al elemento de trabajo existente y crea un nuevo elemento de trabajo, independientemente de la configuración **Crear un nuevo elemento de trabajo después del cierre automático**.

   Si **Extender la ventana de deduplicación hasta que todas las alertas se resuelvan** está habilitado, los eventos de la alerta A o la alerta B no resueltas pueden continuar actualizando la correlación existente después de las 9:00 a. m. del miércoles, por hasta 30 días. La alerta C aún no puede unirse al elemento de trabajo existente porque es una alerta nueva.

   Un elemento de trabajo se cierra automáticamente solo cuando todas sus alertas se resuelven. Si la deduplicación finaliza mientras las alertas aún no se resuelven, la correlación se detiene y el elemento de trabajo permanece abierto a menos que se cierre manualmente.

   Un elemento de trabajo puede contener hasta 500 alertas, y cada alerta puede retener hasta 100 eventos. Después de que una alerta alcanza los 100 eventos, el correlacionador descarta todos los eventos posteriores para esa alerta, incluido su evento de recuperación. La alerta no puede resolverse, por lo que el elemento de trabajo permanece abierto a menos que se cierre manualmente.

   Cuando un elemento de trabajo deja de procesarse antes de que sus alertas se resuelvan, muestra una insignia {{< ui >}}Ended incomplete{{< /ui >}}. Pase el cursor sobre la insignia para ver por qué se detuvo el procesamiento.

   El elemento de trabajo puede mostrar más de 100 eventos coincidentes porque su lista de eventos recupera los eventos coincidentes de forma independiente. El recuento de eventos mostrado podría diferir del número de eventos retenidos y procesados por el correlacionador.


## Vista previa de la salida del patrón {#preview-pattern-output}

Obtenga una vista previa de los posibles patrones y elementos de trabajo que su configuración crearía potencialmente. El panel de vista previa muestra 
- el número total de eventos ingeridos (limitado a los primeros 1000 eventos).
- el número de alertas que se deduplicarían a partir de los eventos.
- el número de elementos de trabajo que se crearían según la configuración. 

Utilice estos datos para obtener una vista previa del impacto de sus correlaciones y comprender el resultado esperado de un patrón.

**Notas**: el título predeterminado en el elemento de trabajo de vista previa es la primera alerta en la correlación. Después de guardar un patrón, el título del elemento de trabajo de gestión de eventos se genera de forma inteligente. 

## Seleccione un destino de Gestión de trabajo {#select-a-work-management-destination}

1. Desde el menú desplegable {{< ui >}}Project{{< /ui >}}, seleccione un elemento de trabajo existente para enviar sus eventos agrupados.
1. (Opcional) Agregue una etiqueta a los elementos de trabajo resultantes.
1. Haga clic en {{< ui >}}Save and Activate{{< /ui >}} para activar este patrón y agrupar eventos en elementos de trabajo.

## Actualizar patrón existente {#update-existing-pattern}
Después de actualizar un patrón existente, todos los elementos de trabajo activos dejarán de procesarse. Los nuevos eventos que coincidan con el patrón crearán un nuevo elemento de trabajo. 

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/event/correlation
[2]: https://app.datadoghq.com/event/correlation/rule/new 
[3]: /es/events/explorer/facets/#create-a-facet
[4]: /es/events/explorer/facets
[5]: /es/events/ingest/