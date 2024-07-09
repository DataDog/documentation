---
title: Procesador aritmético
---

Utiliza el procesador aritmético para añadir un atributo nuevo (sin espacios ni caracteres especiales en el nombre del atributo nuevo) a un evento con el resultado de la fórmula proporcionada. Esto reasigna diferentes atributos de tiempo con diferentes unidades en un único atributo, o computa operaciones en atributos dentro del mismo evento.

Una fórmula del procesador aritmético puede utilizar paréntesis y operadores aritméticos básicos: `-`, `+`, `*`, `/`.

De manera predeterminada, se omite un cálculo si falta un atributo. Selecciona *Replace missing attribute by 0* (Reemplazar atributo faltante por 0) para rellenar de manera automática los valores de atributos faltantes con 0 y asegurarte de que se realice el cálculo.

**Notas**:

* Un atributo puede aparecer como faltante si no se encuentra en los atributos del evento, o si no se puede convertir en un número.
* El operador `-` se debe dividir en espacios en la fórmula, ya que también puede estar contenido en los nombres de los atributos.
* Si el atributo de destino ya existe, se sobrescribe con el resultado de la fórmula.
* Los resultados se redondean al noveno decimal. Por ejemplo, si el resultado de la fórmula es `0.1234567891`, el valor real que se almacena para el atributo es `0.123456789`.
* Si necesitas escalar una unidad de medida, utiliza el filtro de escala.

**Procesador aritmético de ejemplo**

{{< img src="logs/log_configuration/processor/arithmetic_processor.png" alt="Procesador aritmético" style="width:80%;">}}