---
further_reading:
- link: /dashboards/configure/
  tag: Documentación
  text: Más información sobre la configuración del dashboard
title: Uso del modo TV en dashboards
---

## Información general

El modo TV está diseñado para mostrar dashboards de Datadog en pantallas de gran tamaño, lo que permite que todos los widgets sean visibles sin necesidad de desplazarse. Esta guía proporciona instrucciones detalladas para configurar dashboards en modo TV, explica las limitaciones que hay que tener en cuenta y ofrece soluciones para una visualización óptima.

## Configurar tu dashboard para el modo TV

Para asegurarte de que tu dashboard se visualiza correctamente en un televisor, sigue estos pasos:  
1. **Diseña tu dashboard**: Comienza creando tu dashboard en Datadog. Concéntrate en organizar tus widgets dentro del diseño de cuadrícula de 12 columnas utilizado por los dashboards de Datadog. Ten en cuenta que la relación de aspecto de tus widgets y de los dashboards en general afecta a tu visualización en el modo TV.  
2. **Activa el modo TV**: Cuando tu dashboard esté listo, activa el modo TV. Hazlo mientras tu pantalla está conectada al televisor y en modo de pantalla completa. Este paso garantiza que el dashboard se ajuste automáticamente a la pantalla del televisor sin necesidad de cambiar el tamaño manualmente.  
    {{< img src="/dashboards/guide/tv_mode/tv_mode_config_option.png" alt="Activar la opción de modo TV a través del menú de configuración del dashboard" style="width:100%;" >}} 
3. **Optimiza la configuración de pantalla**: Si el contenido del dashboard no llena los bordes de la pantalla, puedes simular una pantalla grande acercando o alejando el zoom. Utiliza los atajos de teclado para ajustar la visualización del navegador antes de volver a entrar en el modo TV, `CMD/CTRL + +(plus)` para acercar y `CMD/CTRL + -(minus)` para alejar. **Nota**: Esta solución tiene inconvenientes de legibilidad, ya que puede hacer que algunas fuentes sean más pequeñas y difíciles de leer desde cierta distancia.

## Comprender las limitaciones del modo TV

Aunque el modo TV ofrece una forma cómoda de visualizar dashboards, presenta algunas limitaciones y consideraciones:  
- **Restricción de cuadrícula de 12 columnas**: Los dashboards en modo TV respetan una cuadrícula fija de 12 columnas. Esto puede limitar la flexibilidad a la hora de estirar el contenido para que ocupe todo el ancho de la pantalla. En el modo de alta densidad, el dashboard se divide en dos cuadrículas de 12 columnas y más widgets expanden el dashboard verticalmente.
- **Limitaciones de la relación de aspecto**: El modo TV reduce la escala del dashboard para que quepa en la pantalla sin necesidad de desplazarse, lo que implica una relación de aspecto forzada. Si la altura y el ancho de un dashboard son desproporcionados, pueden aparecer espacios en blanco en los bordes y los widgets pueden aparecer minimizados (alejados). Para evitar esto, diseña tu dashboard con una relación de aspecto que se ajuste lo más posible a la pantalla de tu televisor.  
- **Centrado del contenido**: El contenido puede estar centrado en la pantalla, en lugar de expandirse hacia los bordes. Este comportamiento se debe a menudo al sistema de cuadrícula fija y a la relación de aspecto. Para un dashboard que utilice todo el ancho de pantalla, considera cambiar a un screenboard, que permite un control más fino sobre el posicionamiento de los widgets.

## Soluciones alternativas y recomendaciones

Si las limitaciones de la cuadrícula de 12 columnas dificultan lograr el diseño buscado en el modo TV, considera las siguientes alternativas:  
- **Screenboards para una mayor flexibilidad**: A diferencia de los dashboards, los screenboards ofrecen una colocación con precisión de píxeles, lo que te permite crear un diseño que se adapte mejor a la relación de aspecto de tu televisor. Esto puede ayudar a eliminar los espacios en blanco de los bordes y aprovechar al máximo el espacio real de la pantalla.
- **Seguimiento y notificación de problemas**: Si encuentras problemas persistentes con el modo TV, como contenidos que no se muestran correctamente, notifícalos como errores en Datadog. Esto ayudará a rastrear y, potencialmente, solucionar estas limitaciones en futuras actualizaciones.

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}