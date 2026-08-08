---
further_reading:
- link: /security/workload_protection/workload_security_rules
  tag: Documentación
  text: Gestión de las reglas de Workload Protection
- link: /security/workload_protection/agent_expressions
  tag: Documentación
  text: Sintaxis de expresiones del Agent
title: Directrices para la redacción de reglas personalizadas de Workload Protection
---

En algún momento, es posible que desees escribir tus propias [reglas personalizadas de Workload Protection Agent ][1]. Cuando escribas tus propias reglas, hay algunas estrategias que puedes utilizar para optimizar la eficiencia.

## Atributos

A fin de asegurarte de que tu política se evalúa en el kernel para obtener la máxima eficacia, utiliza siempre uno de los siguientes atributos para las reglas de proceso o de actividad de archivos:

- `Agent Version >= 7.27`
- `process.file.name`
- `process.file.path`
- `[event_type].file.name`
- `[event_type].file.path`

**Nota**: Los valores posibles para `[event_type]` incluyen `open` o `exec`.

## Comodines

Utiliza los comodines (`*`) con cuidado. Por ejemplo, no utilices nunca `open.file.path =~ "*/myfile"`. Si necesitas utilizar comodines como prefijo de directorios, se requieren al menos dos niveles: `open.file.path =~ "*/mydir/myfile")`. 

**Nota**: Cuando utilices comodines, debes añadir una tilde (`~`) al [operador][2].

## Aprobadores y descartadores

Workload Protection utiliza el concepto de aprobadores y descartadores para filtrar eventos que no deberían activar ninguna regla en una política. Los aprobadores y descartadores permiten o deniegan eventos solo a nivel de las políticas. No actúan sobre reglas individuales.

Los aprobadores actúan como una lista de permisos a nivel del kernel en el Datadog Agent. Por ejemplo, la apertura de un archivo específico podría ser un aprobador en el evento `open` , mientras que los eventos `open` en archivos sin aprobadores serían filtrados. Del mismo modo, los descartadores actúan como una lista de denegaciones en el Agent. Los descartadores filtran intencionalmente los eventos que nunca pueden coincidir con una regla. El Agent aprende qué eventos filtrar con descartadores durante el tiempo de ejecución.

Los aprobadores y los descartadores se generan en función de la totalidad de tu política. Debido a esto, si una sola regla no hace uso de los aprobadores para un determinado evento (por ejemplo, `open` o `exec`), los aprobadores no podrán ser utilizados para ese evento en la totalidad de la política, lo que hace que cada regla que utilice ese evento sea menos eficiente.

Por ejemplo, si utilizaras nombres de archivo explícitos para evaluar eventos `open` para todas las reglas menos una (`open.file.path == "/etc/shadow"`, `open.file.path == "/etc/secret"` y así sucesivamente.) y utilizaras un comodín en ese único evento (`open.file.path == "/etc/*"`), el evento `open` no generaría un aprobador, pero podría generar descartadores durante el tiempo de ejecución.

Los aprobadores suelen ser más potentes y preferibles. Con los aprobadores, el Agent puede procesar sólo lo que necesitas ver, en lugar de aprender dinámicamente lo que debe filtrar.

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/security/workload_protection/workload_security_rules
[2]: /es/security/workload_protection/agent_expressions/#operators