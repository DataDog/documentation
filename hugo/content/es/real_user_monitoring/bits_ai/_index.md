---
aliases:
- /es/real_user_monitoring/ai_investigations/
description: Utilice Bits Investigation y Bits Chat de RUM para optimizar el rendimiento
  de su aplicación, encontrar la causa raíz de las regresiones y hacer preguntas sobre
  su frontend.
further_reading:
- link: /bits_ai/bits_investigation/
  tag: Documentación
  text: Bits Investigation
- link: /bits_ai/bits_chat/
  tag: Documentación
  text: Bits Chat
- link: /real_user_monitoring/operations_monitoring/
  tag: Documentación
  text: Seguimiento de operaciones
title: Bits en RUM
---
## Descripción general {#overview}

Real User Monitoring (RUM) está integrado con [Bits AI][1]. Puede iniciar [Bits Investigation][2] desde RUM y usar [Bits Chat][3] en cualquier página de RUM. RUM proporciona a Bits contexto específico del frontend, como Core Web Vitals, líneas de tiempo de carga de vistas, estado de las operaciones y señales a nivel de sesión. Bits correlaciona ese contexto con el resto de su telemetría, incluyendo trazas de APM, registros, perfiles y código fuente, para identificar las causas raíz.

Debido a que estas investigaciones se ejecutan en Bits Investigation, cada Bits Investigation que inicie desde RUM se guarda en la [lista de Bits Investigation][4], puede compartirse con su equipo, toma en cuenta sus comentarios anteriores y puede enviarse a [Bits Code][5] para generar una solución.

Puede usar Bits en RUM de tres maneras:

| Caso de uso | Descripción | Capacidad de Bits |
|---|---|---|
| [Optimizar el rendimiento][6] | Obtenga recomendaciones sobre posibles problemas que afectan el rendimiento de su aplicación e inicie una investigación sobre cualquiera de ellos. | Bits Investigation |
| [Investigar regresiones y alertas][7] | Investigue anomalías en sus métricas de rendimiento o habilite investigaciones automáticas en los monitores de alertas. | Bits Investigation |
| [Hacer preguntas y realizar tareas][8] | Haga preguntas en cualquier página de RUM, como `Why is this view slow?` o `Which pages have the worst INP?`, y deje que Bits tome medidas en su nombre. | Bits Chat |

## Requisitos previos {#prerequisites}

- Bits AI debe estar habilitado para su organización.
- Para iniciar una Bits Investigation, necesita el permiso **Bits Investigation Write**. Para obtener más información, consulte [Configure Bits Investigation][9].
- Para obtener hallazgos a nivel de código, configure la [Integración de código fuente][10] con GitHub.
- Para permitir que Bits atribuya problemas de frontend a servicios de backend, [correlacione RUM con trazas de APM][11].

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/bits_ai/
[2]: /es/bits_ai/bits_investigation/
[3]: /es/bits_ai/bits_chat/
[4]: https://app.datadoghq.com/bits-ai/investigations
[5]: /es/bits_ai/bits_code/
[6]: /es/real_user_monitoring/bits_ai/optimize_performance/
[7]: /es/real_user_monitoring/bits_ai/investigate_regressions/
[8]: /es/real_user_monitoring/bits_ai/bits_chat/
[9]: /es/bits_ai/bits_investigation/configure/
[10]: /es/source_code/
[11]: /es/real_user_monitoring/correlate_with_other_telemetry/apm/