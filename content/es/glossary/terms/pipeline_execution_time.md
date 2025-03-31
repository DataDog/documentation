---
core_product:
- ci-cd
title: tiempo de ejecución del pipeline
---
El tiempo de ejecución de un pipeline es la cantidad de tiempo que un pipeline ha estado ejecutando trabajos activamente. El tiempo de ejecución del pipeline representa una traza (trace) del pipeline, que proporciona una visión general del historial de ejecución del pipeline, incluidas las horas de inicio y finalización de cada trabajo y los periodos de inactividad entre trabajos.

{{< img src="continuous_integration/pipeline_execution_time.png" alt="Un diagrama que muestra el tiempo de ejecución de pipeline para un pipeline de CI. El pipeline tarda cinco minutos en ejecutarse, pero el tiempo de ejecución total del pipeline para los trabajos individuales es de un minuto y cuarenta segundos" style="width:100%;" >}}

Por ejemplo, consideremos un pipeline con 3 trabajos: A, B y C. Durante el primer minuto, tanto A como B están en ejecución, por lo que ese minuto cuenta para el tiempo de ejecución. Los siguientes 30 segundos, A se detiene mientras B sigue en marcha, por lo que ese tiempo también cuenta. Después, hay un intervalo hasta que C empieza a ejecutarse, por lo que el tiempo de ejecución no se incrementa durante este periodo, ya que no hay trabajos ejecutándose. Finalmente, C se ejecuta durante 15 segundos. 

El cálculo final del tiempo de ejecución es de $\1m30s + 15s = 1m45s$.

Esta métrica sólo está disponible a nivel de pipeline con el nombre `@ci.execution_time`.