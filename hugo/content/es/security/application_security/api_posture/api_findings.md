---
description: El triage detectó riesgos de API en definiciones, gateways y tráfico
  en vivo.
title: Hallazgos de API
---
{{< site-region region="gov" >}}
<div class="alert alert-info">
App and API Protection se encuentra en versión preliminar en el sitio de Datadog Government US1-FED.
</div>
{{< /site-region >}}

El explorador de [Hallazgos de API][1] proporciona una vista central de triage de los riesgos de API detectados en sus definiciones, gateways y tráfico en vivo. Las reglas predeterminadas detectan vulnerabilidades y configuraciones incorrectas comunes. También puede agregar [reglas personalizadas][2] para casos de uso específicos.

Columnas de **Hallazgos de API**:

- **Gravedad:** Cada problema se clasifica según el riesgo.
- **Puntos de conexión:** Muestra cuántos puntos de conexión están afectados y sus servicios.
- **Estado y emisión de tickets:** `Open` o `In Progress` rastrea el progreso de la corrección y la integración del flujo de trabajo.

Utilice la faceta **Servicio** para ver los puntos de conexión de cada servicio a fin de identificar la propiedad y priorizar según el impacto en el negocio.

## Operaciones comunes {#common-operations}

Haga clic en un hallazgo para visualizar sus detalles y realizar un flujo de trabajo como Validar > Investigar > Corregir > Rastrear:

1. Validar:
   - Revise {{< ui >}}What Happened{{< /ui >}} y {{< ui >}}Detected In{{< /ui >}} para confirmar que la detección sea precisa (servicio, punto de conexión, método).
   - En {{< ui >}}Next Steps{{< /ui >}}, elija si desea {{< ui >}}Mute{{< /ui >}}, {{< ui >}}Create Ticket{{< /ui >}} o {{< ui >}}Run Workflow{{< /ui >}} según la propiedad y el impacto.
2. Investigar:
   - Utilice la pestaña {{< ui >}}Context{{< /ui >}} para examinar la instantánea y los atributos del punto de conexión (método, ruta, indicadores de autenticación, etiquetas).
   - {{< ui >}}Detected In{{< /ui >}} proporciona información para la propiedad de enrutamiento y la corrección.
   - En {{< ui >}}Detection Rule Query{{< /ui >}}, puede editar una regla de hallazgo de API haciendo clic en {{< ui >}}See Detection Rule{{< /ui >}}.
3. Corregir: 
   - Siga la guía en {{< ui >}}Remediation{{< /ui >}}.
4. Rastrear:
   - Utilice {{< ui >}}Create Ticket{{< /ui >}} para vincular el problema a su sistema de seguimiento.
   - Utilice {{< ui >}}Reference Links{{< /ui >}} para la educación de desarrolladores o la revisión de código.

## Corrección {#remediation}

Datadog API Posture utiliza [Bits Code][3] para generar correcciones de código para vulnerabilidades.

1. En Datadog, navegue a [{{< ui >}}Security{{< /ui >}} > {{< ui >}}App & API Protection{{< /ui >}} > {{< ui >}}Findings{{< /ui >}}][1].
2. Seleccione un hallazgo para abrir un panel lateral con detalles sobre el hallazgo y el punto de conexión afectado.
3. En la sección **Next Steps** > **Remediation**, haga clic en **Fix with Bits**.

Esto abre una sesión de Bits Code para corregir este hallazgo de API individual. Puede revisar el diff propuesto, hacer preguntas de seguimiento, editar el parche y crear una solicitud de extracción para aplicar la corrección a su repositorio de código fuente.
Visualice todas las sesiones de Bits Code en **Bits AI** > **Bits Code** > [**Sessions**][4].

### Detalles de la sesión de corrección {#remediation-session-details}

Cada sesión de Bits Code muestra el ciclo de vida de una corrección generada por IA para que pueda revisar y validar los cambios antes de fusionarlos. Incluye:

- El hallazgo de seguridad original y el cambio de código propuesto
- Una explicación de cómo y por qué Bits Code generó la corrección
- Resultados de CI (si están habilitados) para validar que el parche es seguro de implementar
- Opciones para refinar la corrección o **Create PR** para aplicar los cambios a su repositorio de código fuente

Para abrir la sesión de corrección, seleccione el hallazgo de API en la página [**Findings**][1] para abrir el panel lateral, desplácese a la sección **Remediation** y seleccione **Expand & Chat**.

También puede visualizar todas las sesiones de corrección en [**Sessions**][4].

[1]: https://app.datadoghq.com/security/appsec/inventory/finding
[2]: /es/security/application_security/policies/custom_rules/
[3]: /es/bits_ai/bits_code
[4]: https://app.datadoghq.com/code