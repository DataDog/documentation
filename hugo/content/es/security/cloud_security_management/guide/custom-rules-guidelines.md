---
further_reading:
- link: /security/workload_protection/detect_and_monitor/agent_rules/policy_management
  tag: Documentación
  text: Administración de reglas de Workload Protection
- link: /security/workload_protection/detect_and_monitor/agent_rules/secl_guide
  tag: Documentación
  text: Guía SECL
title: Directrices para escribir reglas personalizadas de Workload Protection
---
En algún momento, es posible que desee escribir sus propias [reglas personalizadas de Workload Protection Agent][1]. Al escribir sus propias reglas, existen algunas estrategias que puede utilizar para optimizar la eficiencia.

## Atributos {#attributes}

Para garantizar que su política se evalúe en el kernel para obtener la máxima eficiencia, utilice siempre uno de los siguientes atributos para las reglas sobre la actividad de procesos o archivos:

- `Agent Version >= 7.27`
- `process.file.name`
- `process.file.path`
- `[event_type].file.name`
- `[event_type].file.path`

**Nota**: Los valores posibles para `[event_type]` incluyen `open` o `exec`.

## Comodines {#wildcards}

Utilice comodines (`*`) con cuidado. Por ejemplo, nunca utilice `open.file.path =~ "*/myfile"`. Si debe utilizar comodines como prefijo de directorios, se requieren al menos dos niveles: `open.file.path =~ "*/mydir/myfile")`. 

**Nota**: Debe añadir una tilde (`~`) al [operador][2] cuando utilice comodines.

## Aprobadores y descartadores {#approvers-and-discarders}

Workload Protection utiliza el concepto de aprobadores y descartadores para filtrar eventos que no deberían activar ninguna regla en una política. Los aprobadores y descartadores permiten o deniegan eventos solo a nivel de política. No actúan sobre reglas individuales.

Los aprobadores actúan como una lista de permitidos a nivel de kernel en el Datadog Agent. Por ejemplo, la apertura de un archivo específico podría ser un aprobador en el evento `open`, mientras que los eventos `open` en archivos sin aprobadores serían filtrados. De manera similar, los descartadores actúan como una lista de denegados en el Agent. Los descartadores filtran intencionalmente los eventos que nunca pueden coincidir con una regla. El Agent aprende qué eventos filtrar con los descartadores durante el tiempo de ejecución.

Los aprobadores y descartadores se generan en función de toda su política. Debido a esto, si una sola regla no hace uso de aprobadores para un evento determinado (por ejemplo, `open` o `exec`), los aprobadores no pueden utilizarse para ese evento en toda la política, lo que hace que cada regla que utiliza ese evento sea menos eficiente.

Por ejemplo, si utilizó nombres de archivo explícitos para evaluar eventos `open` para cada regla excepto una (`open.file.path == "/etc/shadow"`, `open.file.path == "/etc/secret"` y así sucesivamente), y utilizó un comodín en ese evento (`open.file.path == "/etc/*"`), el evento `open` no generaría un aprobador, pero podría generar descartadores durante el tiempo de ejecución.

Los aprobadores son generalmente más potentes y preferibles. Al usar aprobadores, el Agent puede procesar solo lo que necesita ver en lugar de aprender dinámicamente qué filtrar.

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/security/workload_protection/detect_and_monitor/agent_rules/policy_management/#create-a-custom-agent-rule
[2]: /es/security/workload_protection/detect_and_monitor/agent_rules/secl_guide/#operators