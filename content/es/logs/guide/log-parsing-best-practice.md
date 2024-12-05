---
aliases:
- /es/logs/faq/log-parsing-best-practice
further_reading:
- link: /logs/log_configuration/processors
  tag: Documentación
  text: Aprender a procesar tus logs
- link: /logs/log_configuration/parsing
  tag: Documentación
  text: Obtener más información sobre los análisis
- link: /logs/faq/how-to-investigate-a-log-parsing-issue/
  tag: FAQ
  text: ¿Cómo investigar un problema de análisis de logs?
kind: guía
title: Análisis de logs - Prácticas recomendadas
---

Datadog te permite definir analizadores para extraer toda la información relevante de tus logs. Para obtener más información sobre el lenguaje de análisis y sus posibilidades, consulta [nuestra documentación][1].

Este artículo explica el análisis de un log del recopilador del Datadog Agent:

```text
2017-10-12 08:54:44 UTC | INFO | dd.collector | checks.collector(collector.py:530) | Finalizada la ejecución #1780. Tiempo de recopilación: 4.06s. Tiempo de emisión: 0.01s
```

1. **Añade siempre el log de ejemplo con el que estás trabajando como comentario en tu regla**:
   {{< img src="logs/faq/parsing_best_practice_1.png" alt="Práctica recomendada para el análisis 1" >}}
   Es posible probar tu regla de análisis en una log de ejemplo. Debido a que esto es útil cuando escribes la regla por primera vez, puede ser importante cuando vuelves al analizador para investigar un problema o admitir un nuevo formato de log.

2. **Analiza un atributo a la vez gracias al truco de la estrella**:
   No necesitas escribir una regla de análisis para el log completo en el primer borrador. Comprueba tu regla, un atributo a la vez, utilizando una `.*` al final de la regla. Esto coincide con todo lo que seguiría al final de tu regla.
   Por ejemplo, digamos que primero quieres analizar la fecha del log, sin importar lo que venga después. Crea la regla:
   {{< img src="logs/faq/parsing_best_practice_2.png" alt="Práctica recomendada para el análisis 2" >}}
   Así sabrás que la fecha se ha analizado correctamente. Ahora puedes pasar al siguiente atributo, la gravedad.
   Primero tienes que escapar la barra vertical (es necesario escapar los caracteres especiales) y luego hacer coincidir la palabra:
   {{< img src="logs/faq/parsing_best_practice_3.png" alt="Práctica recomendada para el análisis 3" >}}
   Y así sucesivamente, hasta extraer todos los atributos deseados de este log.

3. **Utiliza los emparejadores adecuados**:
   Cuanto más simple, mejor. A menudo no hay necesidad de intentar definir un regex complejo para que coincida con un patrón específico, cuando el `notSpace` clásico puede hacer el trabajo.
   Ten en cuenta los siguientes emparejadores al escribir una regla de análisis:

    * no espacio: coincide con todo hasta el siguiente espacio
    * datos: coincide con todo (equivalente a .*)
    * palabra: coincide con todos los caracteres alfanuméricos siguientes
    * integral: coincide con un número entero decimal y lo interpreta como un número entero

    La mayoría de las reglas pueden escribirse con estos cuatro comparadores. Puedes consultar la lista completa de los comparadores disponibles [en la documentación de análisis][2].

4. **Valor clave**:
   Ten en cuenta que existe un filtro clave-valor que puede extraer automáticamente todos tus atributos.
   Para obtener más información, consulta [algunos ejemplos][3].

5. **Omitir algunas partes del mensaje de tu log que no deben extraerse como atributos**:
    Vuelve a utilizar el ejemplo:
    ```
    2017-10-12 08:54:44 UTC | INFO | dd.collector | checks.collector(collector.py:530) | Finished run #1780. Collection time: 4.06s. Emit time: 0.01s
    ```
   Supón que la información de `dd.collector` no tiene ningún valor para ti y no quieres extraerla como atributo.
   Para ello, elimina la sección de extracción de la regla:
   {{< img src="logs/faq/parsing_best_practice_4.png" alt="Práctica recomendada para el análisis 4" >}}

## Leer más

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/logs/log_configuration/parsing
[2]: /es/logs/log_configuration/parsing/#matcher-and-filter
[3]: /es/logs/log_configuration/parsing/#key-value-or-logfmt