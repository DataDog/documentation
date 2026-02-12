---
title: Procesador de claves de agregación
---

Utiliza el procesador de claves de agregación para generar una clave de agregación personalizada (`@aggregation_key`) basada en atributos o etiquetas (tags) de eventos. Por ejemplo, puedes utilizar el procesador de claves de agregación para crear una clave de agregación personalizada basada en el título y la etiqueta de origen de un evento. Los eventos con valores coincidentes comparten la misma clave, lo que permite una deduplicación más eficaz y mejora la calidad de las [correlaciones de eventos][1].

**Notas**:

- Los atributos deben comenzar con el símbolo `@` y seguir la ruta del atributo estándar tal y como aparece en tu JSON. Por ejemplo, `@evt.category`.
- Las claves de etiqueta deben seguir un formato de clave de etiqueta válido, como se indica en [Empezando con las etiquetas][2].
- Se pueden añadir un máximo de 5 atributos o claves de etiqueta para generar una clave de agregación.
- Los eventos procedentes de diferentes fuentes o integraciones reciben claves de agregación distintas.
- Por defecto, este procesador sobrescribe las claves de agregación existentes. Ajusta el conmutador para configurar este comportamiento.

<div class="alert alert-danger">Las claves de agregación se incluyen por defecto en las alertas de monitor de Datadog y no son modificadas por el procesador de claves de agregación. Esto garantiza que los eventos de alerta de monitor conserven sus claves originales y no se sobrescriban.</div>

El procesador de claves de agregación realiza las siguientes acciones:

* Comprueba si alguno de los atributos o las claves de etiqueta seleccionados tienen valores. Si es así, se puede generar una clave de agregación.
* En caso contrario, no se configura una clave de agregación en el evento procesado.
* Si hay varios valores en la clave de la etiqueta, todos los valores se ordenan alfabéticamente y se concatenan para generar la clave de agregación.
* Basándose en estos valores, genera un hash y añade la clave de agregación generada al evento.

[1]: /es/service_management/events/correlation/
[2]: /es/getting_started/tagging/