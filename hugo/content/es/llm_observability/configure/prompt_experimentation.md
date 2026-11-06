---
aliases:
- /es/llm_observability/monitoring/prompt_experimentation/
description: Compare versiones de prompts administrados con pruebas A/B e implemente
  versiones con despliegues controlados (Guarded Rollouts).
further_reading:
- link: /llm_observability/configure/prompt_management
  tag: Documentación
  text: Prompt Management
- link: /experiments/defining_metrics/
  tag: Documentación
  text: Crear métricas de experimento
- link: /experiments/reading_results/
  tag: Documentación
  text: Lectura de los resultados del experimento
title: Prompt Experimentation
---
## Descripción general {#overview}

Pruebe un cambio de prompt en el tráfico en vivo antes de establecerlo como predeterminado. Utilice una **prueba A/B** para comparar versiones con respecto a un resultado, como la conversión de pago. Utilice un **despliegue controlado (Guarded Rollout)** para introducir una versión gradualmente y pausar si Datadog detecta una regresión.

<div class="alert alert-info"><strong>Vista previa:</strong> Prompt Experimentation está disponible en vista previa. Para solicitar acceso, comuníquese con <a href="https://www.datadoghq.com/support/">Datadog Support</a> o con su Gerente de éxito del cliente. Puede solicitar acceso a las pruebas A/B y a los despliegues controlados (Guarded Rollouts) de forma independiente.</div>

- **¿Qué prompt tiene un mejor rendimiento?** [Ejecute una prueba A/B](#run-an-ab-test).
- **¿Cómo introduce un cambio gradualmente?** [Utilice un despliegue controlado (Guarded Rollout)](#use-a-guarded-rollout).

## Antes de comenzar {#before-you-begin}

Necesita un prompt administrado con al menos dos versiones, una versión implementada en el entorno que desea utilizar y una [métrica de experimento][2] que mida su resultado. Verifique los [permisos](#permissions) de su flujo de trabajo.

**Permisos:** Las pruebas A/B requieren permisos en Product Analytics y Feature Flags, además de LLM Observability. El acceso a la vista previa no otorga estos permisos. Pídale a su administrador de Datadog que verifique su rol antes de comenzar.

**¿Es su primera vez?** Complete la [configuración única de la aplicación](#set-up-your-application) antes de iniciar cualquiera de los flujos de trabajo. Requiere Python `ddtrace[openfeature]` 4.15.0 o posterior, un Datadog Agent accesible e identificadores de usuario coincidentes en las solicitudes de prompt y los eventos de resultado. El modo sin agente (Agentless) no es compatible.

## Ejecute una prueba A/B {#run-an-ab-test}

Por ejemplo, compare dos versiones de un asistente de pago para ver cuál produce una tasa de conversión de pago más alta.

1. Abra el prompt y haga clic en {{< ui >}}Set up A/B test{{< /ui >}}.
1. Seleccione un entorno y haga clic en {{< ui >}}Create draft & continue{{< /ui >}}. Esto abre la prueba en Product Analytics. Crear un borrador no cambia el tráfico en vivo.
1. Elija las versiones del prompt, la audiencia, la división del tráfico y {{< ui >}}Primary metric{{< /ui >}}. En {{< ui >}}Calculate metrics by{{< /ui >}}, elija el tipo de sujeto que coincida con el `targeting_key` de su aplicación; por ejemplo, **Usuario** cuando pase un ID de usuario.
1. Inicie la prueba. Verifique {{< ui >}}Flag & Exposures{{< /ui >}} para confirmar que recibe asignaciones, luego [compare los resultados][12].

Regrese a {{< ui >}}A/B tests using this prompt{{< /ui >}} en la página del prompt para abrir los resultados o finalizar un borrador. Configure y concluya la prueba en Product Analytics; consulte [Plan and Launch Experiments][11] para obtener instrucciones detalladas.

{{< img src="llm_observability/monitoring/prompt-ab-tests.png" alt="Pruebas A/B que utilizan un prompt, mostrando una prueba en ejecución que compara respuestas concisas y detalladas, sus versiones, métrica principal y audiencia, y un borrador con un botón Finish Setup." style="width:100%;" >}}

**Elegir un ganador no lo implementa automáticamente.** Concluya la prueba, luego regrese al prompt e implemente la versión que elija. Los usuarios fuera de la audiencia de la prueba continúan siguiendo las otras reglas de servicio del entorno.

## Utilice un despliegue controlado {#use-a-guarded-rollout}

Por ejemplo, introduzca un asistente de pago actualizado mientras observa la conversión de pago. La versión implementada es la **línea base**; la nueva versión es la **candidata**. Si el entorno no tiene una versión implementada, implemente una de inmediato primero para establecer una línea base.

1. Abra la versión candidata y haga clic en {{< ui >}}Deploy Version{{< /ui >}}.
1. Seleccione el entorno en {{< ui >}}Deploy to{{< /ui >}}.
1. Expanda {{< ui >}}Deployment strategy{{< /ui >}}, elija {{< ui >}}Guarded rollout{{< /ui >}} y seleccione un {{< ui >}}Guardrail metric{{< /ui >}}.
1. Use {{< ui >}}Inspect metric{{< /ui >}} para verificar su definición y confirmar si los valores más altos o más bajos son mejores.
1. Revise el cambio propuesto y haga clic en {{< ui >}}Deploy Version{{< /ui >}} para iniciar el despliegue.

{{< img src="llm_observability/monitoring/prompt-guarded-rollout-setup.png" alt="Despliegue el cuadro de diálogo de la versión 3 con Production seleccionada, Guarded Rollout habilitado y Checkout completion rate seleccionada como la guardrail metric, con un enlace a la métrica Inspect." style="width:80%;" >}}

### Siga su progreso {#follow-its-progress}

Abra {{< ui >}}Active rollouts{{< /ui >}} en la página del prompt para seguir la exposición de la versión candidata. La exposición aumenta automáticamente mientras el despliegue está en ejecución. Utilice {{< ui >}}Pause{{< /ui >}} para mantener la división actual y {{< ui >}}Resume{{< /ui >}} para continuar.

Si un guardrail detecta una regresión, el despliegue se pausa bajo {{< ui >}}Needs attention{{< /ui >}}. Abra la métrica para investigar y luego elija:

- {{< ui >}}Resume anyway{{< /ui >}} para continuar exponiendo la versión candidata.
- {{< ui >}}Stop{{< /ui >}} para finalizar el despliegue y restaurar su tráfico elegible a la línea base.

**Una pausa no revierte la versión candidata:** la división de tráfico actual permanece vigente hasta que usted actúe. Detener el proceso solo afecta el despliegue de ese entorno, no otros entornos ni pruebas A/B. Para comenzar de nuevo después de detenerlo, despliegue una versión nuevamente.

{{< img src="llm_observability/monitoring/prompt-guarded-rollout-paused.png" alt="Una página de aviso que muestra un despliegue en Staging en Necesita atención, pausado al 25 por ciento de exposición a la versión 2, con la métrica Tasa de finalización de pago y las acciones Reanudar de todos modos y Detener." style="width:100%;" >}}

Cuando finaliza el despliegue, la versión candidata recibe todo el tráfico elegible para ese despliegue y desaparece de {{< ui >}}Active rollouts{{< /ui >}}. Otras reglas de segmentación aún pueden servir diferentes versiones.

<div class="alert alert-warning">Guardrails dependen de los datos de resultados disponibles. Los datos dispersos, faltantes o que no coinciden pueden no activar una pausa. Alcanzar la exposición total no prueba que el candidato sea mejor o seguro.</div>

## Configure su aplicación {#set-up-your-application}

Complete esta configuración una vez para cualquiera de los flujos de trabajo. Si su aplicación ya envía asignaciones de prompt y resultados coincidentes, vaya directamente a [A/B testing](#run-an-ab-test) o [Guarded Rollouts](#use-a-guarded-rollout).

### Conecte la aplicación {#connect-the-application}

1. Complete los [prerrequisitos][5] de Prompt Management.
1. Instale el SDK de Python compatible: `pip install --upgrade "ddtrace[openfeature]>=4.15.0"`.
1. Establezca `DD_ENV` en el entorno que desea utilizar.
1. Asegúrese de que la aplicación pueda comunicarse con un [Datadog Agent][14]. Prompt Experimentation envía datos de asignación a través del Agent; no habilite el modo agentless (`DD_LLMOBS_AGENTLESS_ENABLED=1`).

### Haga coincidir las solicitudes de prompt con los resultados {#match-prompt-requests-to-outcomes}

Utilice el mismo ID de usuario al obtener el prompt y registrar el resultado. Esto permite que Datadog conecte el resultado de un usuario con la versión del prompt que recibió.

```python
from ddtrace.llmobs import LLMObs

prompt = LLMObs.get_prompt(
    "checkout-assistant",
    targeting_key=str(current_user.id),
    fallback="You are a helpful checkout assistant.",
)
```

Utilice una cadena estable y no vacía para `targeting_key`. No pase un `version` exacto: eso omite la asignación de entorno y no registra una exposición al experimento.

Por ejemplo, si su métrica de pago utiliza eventos de RUM y el tipo de sujeto **usuario**, identifique al usuario del navegador con el mismo ID:

```javascript
datadogRum.setUser({
  id: String(currentUser.id),
})
```

RUM solo es necesario cuando proporciona el resultado elegido. Para otras fuentes de resultados, o para comparar organizaciones en lugar de usuarios, configure el [tipo de sujeto][7] de coincidencia. Los resultados deben ocurrir después de la primera exposición del usuario a la versión del prompt para que se le atribuyan.

### Elija una métrica de resultado {#choose-an-outcome-metric}

Cree o seleccione una [métrica de experimento][2] en [{{< ui >}}Product Analytics{{< /ui >}} > {{< ui >}}Experiments{{< /ui >}} > {{< ui >}}Metrics{{< /ui >}}][8]. Las métricas y monitores de Metrics Explorer no se pueden seleccionar aquí.

Por ejemplo, para una métrica de conversión de pago, establezca {{< ui >}}Desired metric direction{{< /ui >}} en {{< ui >}}Higher is better{{< /ui >}}. Asegúrese de que los eventos de resultado utilicen el mismo ID de usuario que la solicitud de prompt. Confirme que los eventos de resultado están llegando antes de confiar en la métrica para comparar versiones o pausar un despliegue.

{{< agent-only >}}
**Nota para agentes de IA:** Utilice el identificador de sujeto estable existente de la aplicación como una cadena para `targeting_key`, que coincida con el sujeto del Experimento. Pregunte si la identidad o la fuente del resultado no está clara. No instale RUM a menos que el resultado utilice RUM. Conserve el respaldo, las variables de prompt, el proveedor, el modelo y el comportamiento de la aplicación existentes. No solicite una versión de prompt exacta. La creación o edición de métricas, el inicio de experimentos, la implementación de versiones y el control de despliegues requieren una solicitud explícita del usuario; cuando solo se le pida preparar código, informe los pasos restantes de la interfaz de usuario de Datadog.
{{< /agent-only >}}

## Permisos {#permissions}

Además de los [requisitos previos de Gestión de Prompts][5], su rol necesita:

| Acción | Permiso requerido |
|--------|---------------------|
| Configurar una prueba A/B desde un prompt | Escritura de Experimentos de Product Analytics |
| Iniciar un despliegue protegido | Escritura de LLM Observability y Lectura de Configuración de Entorno de Feature Flags |
| Pausar o reanudar un despliegue protegido | Escritura de Configuración de Feature Flags |
| Detener un despliegue protegido | Lectura y escritura de LLM Observability |

Para configurar y lanzar una prueba A/B en Product Analytics, consulte [Permisos de Product Analytics][3] y [Permisos de Feature Flags][6]. Si su entorno requiere aprobaciones, solicite la aprobación en Feature Flags antes de cambiar el tráfico en vivo.

## Solución de problemas {#troubleshooting}

### No puedo iniciar una prueba o un despliegue {#i-cannot-start-a-test-or-rollout}

- **Faltan controles o están deshabilitados:** confirme el acceso a la Preview relevante y los [permisos requeridos](#permissions). La configuración de A/B también requiere dos versiones de prompt y un entorno habilitado cuya configuración de servicio pueda cargarse.
- **Se rechaza un despliegue protegido:** establezca primero una línea base. Resuelva el conflicto que se muestra para el entorno, como un experimento activo para todos los usuarios o una anulación de versión forzada, antes de intentarlo de nuevo.
- **Puede crear un borrador pero no puede configurar ni lanzar la prueba:** verifique sus [Permisos de Product Analytics][3] y [Permisos de Feature Flags][6] con su administrador de Datadog, junto con cualquier aprobación de entorno requerida. Confirme que la prueba tenga seleccionada una métrica principal.

### No veo asignaciones ni resultados {#i-do-not-see-assignments-or-results}

- **Solo se devuelve el respaldo, o faltan asignaciones:** verifique la instalación del SDK, `DD_ENV`, la conectividad del Agent y que la recuperación no especifique `version`.
- **Faltan resultados:** verifique que los ID de sujeto coincidan, el contexto de la métrica y que los eventos ocurran después de la exposición. Permita que se acumulen suficientes datos; consulte [Experiment Diagnostics][13].

### No puedo controlar ni inspeccionar un despliegue {#i-cannot-control-or-inspect-a-rollout}

- **Pausar, Reanudar o Detener no está disponible:** verifique los [permisos](#permissions). Detener requiere permisos diferentes a los de Pausar y Reanudar.
- **No se puede cargar el estado:** actualice, luego verifique el error reportado o comuníquese con el Soporte de Datadog. Un estado no disponible no significa que el despliegue se haya detenido.

### Estoy desplegando de nuevo o en varios entornos {#i-am-deploying-again-or-to-several-environments}

Revise la estrategia de implementación de cada entorno: es posible que ya estén seleccionadas las configuraciones protegidas guardadas. Los entornos cambian de inmediato sin un despliegue. Implementar otra versión puede reemplazar un despliegue activo; revise la advertencia sobre el reemplazo antes de confirmar.

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[2]: /es/experiments/defining_metrics/
[3]: /es/account_management/rbac/permissions/#product-analytics
[5]: /es/llm_observability/configure/prompt_management/#prerequisites
[6]: /es/account_management/rbac/permissions/#feature-flags
[7]: /es/experiments/concepts/subject_types/
[8]: https://app.datadoghq.com/product-analytics/experimentation-metrics
[11]: /es/experiments/plan_and_launch_experiments/
[12]: /es/experiments/reading_results/
[13]: /es/experiments/diagnostics/
[14]: /es/getting_started/agent/