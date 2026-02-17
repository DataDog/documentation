---
aliases:
- /es/agent/faq/how-is-the-system-mem-used-metric-calculated/
further_reading:
- link: /metrics/
  tag: Documentación
  text: Más información sobre métricas
title: Cálculo de la métrica 'system.mem.used'
---

La forma en que Datadog calcula la métrica `system.mem.used` genera un valor que a veces puede ser diferente de lo que podrían mostrar las habituales herramientas de informes de recursos del sistema.

Por ejemplo, ejecutar 'free -m' en una máquina Ubuntu puede producir el siguiente desglose de memoria (los valores representan megabytes):

|        |      |       |        |        |           |
| :---   | :--- | :---  | :---   | :---   | :---      |
| total  | utilizado | libre  | compartido | en caché | disponible |
| 128831 | 1203 | 71975 | 4089   | 55653  | 122380    |

Un Datadog Agent que se ejecuta en esta misma máquina informa una métrica `system.mem.used` con un valor de 56856 MB, claramente diferente del valor de memoria utilizado 'free -m' de 1203 MB.

La razón de esta discrepancia es que Datadog incluye la memoria en caché en su fórmula para la memoria utilizada, mientras que 'free -m' no lo hace.

Datadog calcula la memoria utilizada de la siguiente manera:

* system.mem.used(56856) = system.mem.total(128831) - system.mem.free(71975)

Nuevamente, la métrica `system.mem.used` de Datadog incluye memoria en caché, por lo que al restar esta memoria en caché de la memoria utilizada se obtiene el siguiente valor:

* system.mem.used(56856) - system.mem.cached(55653) = 1203

1203 MB, idéntico al valor de memoria utilizada, infrmado por 'free -m' en el ejemplo anterior.

**La métrica `system.mem.usable` representa la memoria libre, más la memoria en caché, más los buffers** (en Linux, refleja el atributo "MemAvailable" de /proc/meminfo, siempre que sea posible).

{{< partial name="whats-next/whats-next.html" >}}