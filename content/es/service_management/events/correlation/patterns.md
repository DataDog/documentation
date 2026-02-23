---
further_reading:
- link: service_management/events/correlation/triage_and_notify
  tag: Documentación
  text: Más información sobre la clasificación y notificación de casos
title: Correlación basada en patrones
---

## Información general

La correlación basada en patrones te permite controlar cómo se correlacionan los eventos. Datadog también utiliza Machine Learning para enriquecer automáticamente tu patrón con eventos de monitor de Datadog relacionados, utilizando la telemetría subyacente recopilada en Datadog y otros heurísticos.

Para empezar, Datadog sugiere automáticamente [correlaciones basadas en patrones][1], en función de tu entorno. Haz clic en cualquiera de las recomendaciones para abrir la página de configuración correspondiente al patrón recomendado. Los campos de configuración ya están rellenados.

{{< img src="service_management/events/correlation/pattern/recommended_patterns_preview.png" alt="Patrones de correlación recomendados con el panel de vista previa que muestra los posibles casos que crearía el patrón" style="width:100%;" >}}


## Crear un patrón

Para crear un patrón:
1. Ve a [Correlación][1].
1. Haz clic en **+ Add a Pattern** (+ Añadir un patrón), en la parte superior de la tabla de patrones. Se abrirá la página de configuración de patrones, que muestra los patrones sugeridos en la parte izquierda y una vista previa del resultado del patrón en la parte derecha.
1. Puedes ajustar un patrón sugerido haciendo clic en **+ Continue With Pattern** (+ Continuar con el patrón). Esto le llevará a la página de configuración para realizar ajustes adicionales. También puedes crear tu propio patrón haciendo clic en **+ Personalize From Scratch** (+ Personalizar desde cero).

Primero, los eventos se deduplican en alertas en función de la clave de agregación de eventos. Luego, las alertas se correlacionan con un caso en función de la configuración. 
{{< img src="service_management/events/correlation/correlation_helper.mp4" alt="Cuando los eventos coinciden con las fuentes definidas, se filtran y se deduplican en alertas. Las alertas se correlacionan en función de los atributos de agrupación y sus eventos se deduplican dentro del periodo de tiempo definido, antes de que el proceso se repita en un nuevo caso. Puedes modificar esta configuración en los parámetros." vídeo=true >}}
Para obtener más información sobre cómo enviar eventos con claves de agregación, consulta el [envío de eventos a Datadog][5]. Los eventos sin claves de agregación se deduplican en una única alerta dentro del periodo de tiempo.

### Patrones sugeridos
Los patrones se recomiendan en función de tus etiquetas (tags) de servicios y entornos utilizadas con mayor frecuencia, para ayudarte a empezar con la correlación de eventos rápidamente.

### Configuración
De la [página de configuración de las correlaciones][2]
1. En el desplegable, selecciona la fuente de eventos que quieres utilizar para agrupar.
1. Para excluir eventos de la fuente definida anteriormente, añade una consulta de eventos en **Filtrar por estos eventos o etiquetas (tags)** para filtrarlos.
1. Añade eventos relacionados a cambios asociados u otros eventos adicionales para apoyar la investigación del caso. Los eventos relacionados se añadirán a un caso pero no crearán nuevos casos.
1. Define las etiquetas de agrupación. Las etiquetas de agrupación son facetas de eventos. Si no ves la etiqueta en el desplegable, consulta la [sección de configuración avanzada](#advanced-settings-optional) a continuación.
**Nota**: Puedes crear facetas en el atributo y en la etiqueta del evento. Para obtener más información, consulta la documentación sobre [facetas][4]. 

### Ajustes avanzados (opcional)
1. Haz clic en **Show Advanced Settings** (Mostrar configuración avanzada).
1. Puedes añadir etiquetas de agrupación para correlacionar eventos y personalizar el título del caso.

   Añadir etiquetas de agrupación 
   : añadir nuevas etiquetas de agrupación es lo mismo que añadir [nuevas facetas de eventos][3].

   Personalizar el título del caso
   : para crear una plantilla que sustituya al título del caso generado automáticamente. Puedes hacer referencia a las variables de plantilla de etiqueta utilizando la sintaxis de handlebar, por ejemplo "{{tag.service}}", para incluir una lista separada por comas de valores de etiquetas.

1. En **Lógica de correlación avanzada**, puedes especificar el número mínimo de eventos correlacionados para crear un caso y actualizar el periodo de tiempo.

    **Periodos de tiempo**

    Correlacionar alertas con un caso por
    : la duración máxima durante la que las nuevas alertas se añadirán a un caso

    Deduplicar eventos para esas alertas por
    : la duración máxima para reflejar las transiciones de estado de las alertas actuales que se correlacionaron, pero que siguen flapeando o no se resolvieron. Los eventos se deduplican en la alerta correspondiente del caso existente antes de abrir un nuevo caso.


## Previsualizar el resultado del patrón

Previsualiza los posibles patrones y casos que tu configuración podría crear. El panel de vista previa muestra
- el número total de eventos ingeridos (limitado a los primeros 1000 eventos).
- el número de alertas que se deduplicarían de los eventos.
- el número de casos que se crearían en función de la configuración. 

Utiliza estos datos para previsualizar el impacto de tus correlaciones y comprender el resultado esperado de un patrón.

{{< img src="service_management/events/correlation/pattern/preview_pattern_output.png" alt="Configuración de una correlación basada en patrones donde se resalta el panel de vista previa que muestra el número de eventos ingeridos que coinciden con la configuración, la cantidad de esos eventos que generan alertas, la cantidad de deduplicación que podría ocurrir y el número de casos que resultarían." style="width:100%;" >}}

**Nota**: El título por defecto en la vista previa del caso es la primera alerta en correlación. Luego de guardar un patrón, el título de caso de la gestión de eventos se genera de forma inteligente.

## Seleccionar un destino de gestión de casos

1. En el menú desplegable *Proyecto*, selecciona un caso existente al que enviar tus eventos agrupados.
1. (Opcional) Añade una etiqueta a los casos resultantes.
1. Haz clic en **Save and Activate** (Guardar y activar) para activar este patrón y agrupar eventos en casos.

## Actualizar el patrón existente
Después de actualizar un patrón existente, todos los casos activos se dejarán de procesar. Los nuevos eventos que coincidan con el patrón crearán un nuevo caso.

## Para leer más

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/event/correlation
[2]: https://app.datadoghq.com/event/correlation/rule/new 
[3]: /es/service_management/events/explorer/facets/#create-a-facet
[4]: /es/service_management/events/explorer/facets
[5]: /es/service_management/events/ingest/