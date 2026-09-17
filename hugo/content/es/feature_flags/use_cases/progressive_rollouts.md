---
description: Implemente gradualmente los indicadores de funciones según un horario
  con métricas de protección opcionales para lanzamientos canary.
title: Despliegues progresivos y canaries
---
[**Los lanzamientos progresivos**](#progressive-rollouts) liberan nuevas funcionalidades gradualmente al incrementar el porcentaje de sujetos expuestos a la funcionalidad a lo largo del tiempo. [**Los despliegues canary**](#canaries) son despliegues progresivos que hacen un seguimiento de las métricas de protección y se pausan o detienen automáticamente cuando detectan regresiones.

## Despliegues progresivos {#progressive-rollouts}

### Configure un despliegue progresivo {#configure-a-progressive-rollout}

1. Navegue a su feature flag y abra **Reglas de segmentación y despliegues** para el entorno de destino.
2. Haga clic en **Agregar regla de segmentación** y seleccione **Agregar pasos de despliegue** para crear un despliegue de varios pasos.
3. Configure los pasos del despliegue:
   - Personalice el porcentaje para cada paso y agregue o elimine pasos según sea necesario.
   - Cambie el retraso entre pasos para un despliegue más lento o más rápido.
   - Haga clic en **Dividir tráfico** para desplegar múltiples variantes al mismo tiempo.

{{< img src="feature_flags/create-progressive-rollout.png" alt="Configuración de despliegue progresivo de varios pasos." style="width:100%;" >}}

### Inicie y controle el despliegue{#start-and-control-the-rollout}

1. **Habilite** el feature flag en el entorno para que los SDK evalúen sus reglas de segmentación.
2. Haga clic en **Iniciar despliegue** para comenzar el despliegue progresivo.

{{< img src="feature_flags/start-progressive-rollout.png" alt="Visualización de despliegue progresivo de varios pasos." style="width:100%;" >}}

Para iniciar el despliegue automáticamente en una fecha y hora futuras en lugar de hacer clic en **Iniciar despliegue**, [programar una hora de inicio](/feature_flags/concepts/scheduled_rollouts/) al configurar la regla.

Después de que comience el despliegue:

- Haga clic en **Pausar despliegue** para detener el progreso temporalmente.
- Haga clic en **Detener despliegue** para revertir todo el progreso del despliegue.

Haga un seguimiento del progreso con el seguimiento de evaluación y configure notificaciones para eventos de despliegue.

## Canaries {#canaries}

Un canary es un despliegue progresivo que incluye **métricas de protección**. Las métricas de protección miden indicadores clave de rendimiento (KPIs), como la tasa de error, la latencia y el recuento de tareas largas.

### Cómo funcionan los canaries {#how-canaries-work}

Cuando se configuran las métricas de protección, el despliegue hace un seguimiento de las métricas en ambos grupos:

- **Tratamiento**: Sujetos que reciben la variante que se está desplegando
- **Control**: Sujetos que no reciben la variante de tratamiento

Cuando el canary detecta un cambio adverso estadísticamente significativo en una métrica de protección, **pausa** o **detiene** automáticamente el despliegue.

### Usar métricas de protección de APM {#use-apm-guardrail-metrics}

<div class="alert alert-info">Las métricas de protección de APM para despliegues canary están en versión preliminar. Comuníquese con su representante de Datadog para solicitar acceso.</div>

Las métricas de protección de APM utilizan tramos retenidos para comparar el rendimiento de la aplicación entre los grupos de control y de tratamiento. Puede hacer un seguimiento:

- Duración media del tramo
- Tasa de error
- Duración del tramo P90
- Media de un atributo de tramo numérico

Se requiere [enriquecimiento de trazas de APM][1] antes de agregar una métrica de APM a un canary. El enriquecimiento registra la asignación del feature flag, la variante y el sujeto en cada traza para que el canary pueda asociar los datos de APM con el grupo correcto.

Después de habilitar el enriquecimiento:

1. Verifique que la aplicación evalúe el feature flag durante las solicitudes rastreadas.
2. En Trace Explorer, confirme que los tramos raíz contengan el atributo `@feature_flags.<flag_key>` decodificado.
3. Cree una métrica de APM con una consulta de tramo que coincida con las solicitudes que desea hacer un seguimiento.
4. Seleccione la métrica de APM como guardrail al configurar el canary.

El análisis canary utiliza la muestra retenida de trazas coincidentes. Si el volumen de trazas retenidas es bajo, el canary espera hasta tener suficientes sujetos y eventos muestreados para tomar una decisión. Para aumentar la muestra aleatoria retenida, configure la retención temporal de trazas para el canary. La retención temporal no recupera las trazas descartadas antes de que lleguen a Datadog.

{{< img src="feature_flags/apm_canaries/apm-metric-create-flow-1.png" alt="Flujo de creación de métricas con tramos de APM seleccionados y tipos de métricas de guardrail de APM compatibles, incluida la duración del tramo P90." style="width:90%;" >}}

{{< img src="feature_flags/apm_canaries/apm-metric-create-flow-2.png" alt="Flujo de creación de métricas de APM con una consulta de tramo de APM y una vista previa de tramo coincidente." style="width:90%;" >}}

### Configure un despliegue canary {#configure-a-canary-rollout}

1. Cree una regla de segmentación para un despliegue progresivo como se describe en la sección [Configure un despliegue progresivo](#configure-a-progressive-rollout).
2. Agregue métricas de guardrail a la configuración del despliegue.
3. Para un guardrail de APM, configure la retención temporal de trazas si desea aumentar la muestra retenida.
4. Elija si los fallos de los guardrails deben pausar o detener el despliegue.

{{< img src="feature_flags/canary-rollout-config.png" alt="Configuración de despliegue canary que muestra los pasos del despliegue con métricas de guardrail y una variante de control." style="width:90%;" >}}

{{< img src="feature_flags/apm_canaries/apm-canary-metric-monitored-with-retention.png" alt="Configuración de canary con un guardrail de duración del tramo P90, acción de abortar, retención temporal de trazas de APM y una variante de control." style="width:90%;" >}}

## Mejores prácticas {#best-practices}

- Configure Notifications en el feature flag para recibir alertas cuando el despliegue comience, se pause o se detenga.
- Configure Notifications de canary antes de iniciar el despliegue. Notifications le alertan cuando una métrica de guardrail pausa o detiene el despliegue.
- Utilice el seguimiento de evaluación para hacer un seguimiento de cuántos sujetos están recibiendo cada variante a medida que avanza el despliegue.
- Para los guardrails de APM, confirme que la muestra retenida contenga suficientes sujetos y eventos muestreados antes de aumentar la exposición del despliegue.

[1]: /es/feature_flags/guide/apm_trace_enrichment/