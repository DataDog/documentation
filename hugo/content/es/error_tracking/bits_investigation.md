---
description: Investigue problemas de Error Tracking con Bits Investigation para encontrar
  la causa raíz y el impacto de un error.
further_reading:
- link: /bits_ai/bits_investigation/
  tag: Documentación
  text: Conozca Bits Investigation
- link: /bits_ai/bits_investigation/chat_bits_investigation/
  tag: Documentación
  text: Chatear con Bits Investigation
- link: /bits_ai/bits_code/
  tag: Documentación
  text: Genere correcciones de código con Bits Code
- link: /source_code/
  tag: Documentación
  text: Configure Source Code Integration
title: Investigue errores con Bits AI
---
{{< callout url="#" btn_hidden="true" header="Preview" >}}
Bits Investigation en Error Tracking está en versión preliminar.
{{< /callout >}}

## Descripción general {#overview}

[Bits Investigation][1] es un agente de IA autónomo que investiga problemas de producción. Cuando inicia una investigación desde un problema de Error Tracking, Bits analiza el error, incluida su traza de pila y la telemetría relacionada. Si configura [Source Code Integration][3], Bits también analiza su código fuente. Luego informa la causa raíz probable y el impacto del problema.

Para listar todas las investigaciones iniciadas desde Error Tracking, abra [Investigations][9] y filtre por {{< ui >}}Source{{< /ui >}}: {{< ui >}}Error Tracking Issue{{< /ui >}}.

## Requisitos previos {#prerequisites}

- Para visualizar las investigaciones, necesita el [{{< ui >}}Bits Investigations Read{{< /ui >}} permiso][2]. Para iniciar investigaciones, necesita el [{{< ui >}}Bits Investigations Write{{< /ui >}} permiso][2].
- Para permitir que Bits lea el código que se estaba ejecutando cuando ocurrió el error, configure [Source Code Integration][3]. Bits puede investigar sin acceso al código fuente, pero el análisis de la causa raíz es menos preciso.
- Para generar correcciones de código, configure [Bits Code][8], que necesita acceso de escritura a su repositorio y el [{{< ui >}}Bits Code Write{{< /ui >}} permiso][2].

## Investigue un problema de Error Tracking {#investigate-an-error-tracking-issue}

Para investigar un problema de Error Tracking con Bits Investigation:

1. En [Error Tracking Explorer][4], haga clic en un problema para abrir el panel del problema.
1. En la pestaña {{< ui >}}Review{{< /ui >}}, haga clic en {{< ui >}}Investigate this issue{{< /ui >}} en el banner {{< ui >}}Bits Investigation{{< /ui >}}.

   {{< img src="error_tracking/bits_investigation/start_investigation.png" alt="El banner de Bits Investigation en la pestaña Review de un problema de Error Tracking, con el botón Investigate this issue." style="width:100%;" >}}

   Mientras se ejecuta la investigación, el banner muestra su progreso y quién la inició. Una investigación suele tardar unos minutos.
1. Cuando la investigación finalice, revise los hallazgos en el banner:

   - **Causa raíz**: La causa más probable del error, según la evidencia que Bits recopiló.
   - **Impacto**: Cómo afecta el error a sus usuarios y servicios.

   Para una investigación completada, el banner muestra la causa raíz y el impacto uno al lado del otro:

   {{< img src="error_tracking/bits_investigation/investigation_summary.png" alt="La pestaña Review de un problema de Error Tracking, que muestra la causa raíz y el impacto encontrados por Bits Investigation." style="width:100%;" >}}

   Si los datos disponibles son insuficientes para respaldar una conclusión, Bits marca la investigación como no concluyente.
1. (Opcional) Para ver la investigación completa, haga clic en {{< ui >}}View Investigation{{< /ui >}} en el banner.

   La página de investigación muestra la conclusión, los siguientes pasos sugeridos y una cronología de la evidencia:

   {{< img src="error_tracking/bits_investigation/investigation_report.png" alt="La página de Bits Investigation para un problema de Error Tracking, que muestra la conclusión, la causa raíz, el impacto, un siguiente paso sugerido y la cronología." style="width:100%;" >}}

Para hacer preguntas de seguimiento sobre la investigación, use Bits Chat. Para obtener más información, consulte [Chat with Bits Investigation][6].

Para obtener más información sobre cómo Bits llega a su conclusión y cómo explorar los pasos de la investigación, consulte [How Bits investigates][5] en Investigate Issues.

## Corrija el problema en el código {#fix-the-issue-in-code}

Cuando la causa raíz está en su código, Bits Investigation usa [Bits Code][7] para generar una corrección. La corrección aparece como un siguiente paso sugerido en la página de investigación, con un resumen del cambio y su diff.

Un siguiente paso de corrección de código incluye acciones para abrir una solicitud de incorporación de cambios o seguir trabajando en la corrección:

{{< img src="error_tracking/bits_investigation/code_fix_next_step.png" alt="Un siguiente paso sugerido con una corrección de código generada por Bits Code, que muestra un resumen, un diff y los botones Create PR y View in Bits Code." style="width:100%;" >}}

Desde el siguiente paso, puede:

- Haga clic en {{< ui >}}Create PR{{< /ui >}} para abrir una solicitud de incorporación de cambios con la corrección.
- Haga clic en {{< ui >}}View Full Diff{{< /ui >}} para revisar todos los archivos modificados.
- Haga clic en {{< ui >}}View in Bits Code{{< /ui >}} para seguir perfeccionando la corrección en una sesión de Bits Code.

Bits Code nunca fusiona cambios automáticamente. Revise y pruebe el código generado antes de fusionarlo.

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/bits_ai/bits_investigation/
[2]: /es/account_management/rbac/permissions/#bits-ai
[3]: /es/source_code/
[4]: https://app.datadoghq.com/error-tracking
[5]: /es/bits_ai/bits_investigation/investigate_issues/#how-bits-investigates
[6]: /es/bits_ai/bits_investigation/chat_bits_investigation/
[7]: /es/bits_ai/bits_code/
[8]: /es/bits_ai/bits_code/setup/
[9]: https://app.datadoghq.com/bits-ai/investigations