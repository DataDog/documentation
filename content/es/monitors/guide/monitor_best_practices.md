---
further_reading:
- link: /monitors/
  tag: Documentación
  text: Más información sobre monitores
- link: /monitors/configuration/
  tag: Documentación
  text: Configuración de monitores
title: Prácticas recomendadas de monitores
---

## Información general

Un monitor bien diseñado es esencial para conocer el rendimiento, el estado y la estabilidad de tu infraestructura o aplicación. Proporciona datos precisos y procesables para detectar problemas con antelación, optimizar el rendimiento y mantener un funcionamiento fluido.

Esta guía te indicará los aspectos clave para crear un monitor eficaz:

- Crear un monitor intuitivo
- Establecer umbrales adecuados
- Establecer respuestas procesables.

Si sigues estos principios, crearás un monitor que te proporcionará información útil y te ayudará a tomar decisiones proactivas.

## Escribir un título claro

La página [Gestionar monitor][1] muestra el título, las etiquetas (tags), los equipos y otros campos del monitor. Si deseas obtener la lista completa de los atributos, consulta la documentación de [Buscar monitores][2]. Tener un título claro y descriptivo es importante porque comunica inmediatamente el propósito del monitor y lo que rastrea. Un título bien definido ayuda a los usuarios a identificar rápidamente el objetivo del monitor. Un título claro también asegura que todos los miembros del equipo, independientemente de su rol y persona, puedan entender la función del monitor de un vistazo. 

**Nota**: El título del monitor y el asunto de notificación son iguales, así que evita añadir demasiadas variables a ambos.

## Utilizar la multialerta

Para evitar monitores redundantes (como múltiples monitores similares con sólo 1 contexto cambiante), Datadog recomienda utilizar monitores multialertas. Cuando se utiliza un "group by" (agrupar por) en la consulta, las multialertas aplican automáticamente la alerta a cada fuente basándose en los parámetros del grupo. La mejor forma de conseguirlo es con un monitor agrupado por `host`, de forma que sólo tenga un monitor que active una alerta distinta para cada host cada vez que cruce el umbral.

Por ejemplo:  
Tienes un sitio web de comercio electrónico y, para gestionar grandes volúmenes de tráfico o procesos, despliegas varios hosts y utilizas un equilibrador de carga para distribuir uniformemente las solicitudes entrantes. Para asegurar que ningún host se vea desbordado, deseas recibir una alerta si un host supera un umbral específico de CPU y memoria. Esto asegura que ningún host se vea desbordado, manteniendo el tráfico y los procesos equilibrados.

## Dar contexto

Añadir contexto al monitor transforma los datos sin formato en información práctica. El contexto aclara la propiedad y el impacto, ayudando a los usuarios a comprender a qué afecta el monitor. El contexto también acelera la solución de problemas al proporcionar una imagen más clara de las causas posibles, lo que permite una mejor toma de decisiones. En resumen, el contexto hace que la monitorización sea más precisa, útil y sensible a las condiciones del mundo real.

Datadog dispone de 3 funciones para mejorar el contexto del monitor:

* [**Metadatos**][3]: añade información sobre prioridad, etiquetas y equipo a las notificaciones de alerta. Este contexto ayuda a los equipos a filtrar, priorizar y enviar rápidamente los problemas a las personas adecuadas. Ayudan a aclarar la naturaleza de la alerta y agrupan las alertas relacionadas. Esto hace que la gestión y resolución de alertas sea más eficiente y eficaz.

* [Variables**][4]: utiliza variables en tu mensaje de monitor para añadir un contexto preciso, proporcionando detalles dinámicos y en tiempo real, como el sistema afectado, el mensaje de error o los umbrales superados. Esta especificidad hace que las notificaciones sean más claras y reduce la necesidad de que los responsables de la respuesta busquen información adicional, lo que permite actuar con mayor rapidez. Las variables también aseguran la coherencia en la estructura de las alertas, lo que mejora la legibilidad y la eficacia de la respuesta. 

## Monitor Quality

Para confirmar si tus monitores están bien configurados, utiliza [Calidad de monitor][5]. Identifica monitores que necesitan mejoras basándose en reglas predefinidas que detectan errores de configuración comunes en los ajustes de monitorización. 

Para más información, consulta la documentación [Calidad de monitor][6].

##  Plantillas de monitor

Si no estás seguro de por dónde empezar a la hora de crear un monitor, utiliza los [Monitores recomendados][7] precreados de Datadog. Proporcionan directrices sobre títulos, notificaciones, métricas y umbrales.

Para obtener más información, consulta la documentación de [Plantillas de monitor][8].

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}


[1]: https://app.datadoghq.com/monitors/manage
[2]: /es/monitors/manage/search/#attributes
[3]: /es/monitors/configuration/?tab=thresholdalert#add-metadata
[4]: /es/monitors/notify/variables/?tab=is_alert
[5]: https://app.datadoghq.com/monitors/quality
[6]: /es/monitors/quality/
[7]: https://app.datadoghq.com/monitors/recommended
[8]: /es/monitors/templates/