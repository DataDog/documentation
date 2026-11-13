---
description: Utilice reglas de telemetría para controlar las etiquetas, la indexación
  y otras características de sus métricas, logs y spans.
further_reading:
- link: /api/latest/tag-rules/
  tag: Documentación
  text: Tag Visibility and Enforcement Rules API
- link: /account_management/governance_console/
  tag: Documentación
  text: Governance Console
- link: /account_management/governance_console/controls
  tag: Documentación
  text: Controles de Governance Console
- link: /metrics/guide/tag-indexing-rules/
  tag: Documentación
  text: Reglas de indexación de etiquetas
- link: /metrics/guide/agent-filtering-for-custom-metrics
  tag: Documentación
  text: Filtrado del Agent para Custom Metrics
is_beta: true
private: true
title: Reglas de telemetría
---
{{< beta-callout url="#" btn_hidden="true" header="false" >}}
Las reglas de telemetría están en Preview. Si observa algún problema o desea proponer una nueva función, utilice el botón Give Feedback en la interfaz de usuario del producto.
{{< /beta-callout >}}

## Descripción general {#overview}

Las reglas de telemetría ayudan a los administradores a controlar las características de sus métricas, logs y spans desde la Governance Console, para reducir los costos de telemetría no deseada. Las reglas de telemetría pueden ayudar a estandarizar el etiquetado, gestionar el volumen ingerido e indexado, y minimizar la telemetría no utilizada o redundante.

## Requisitos previos {#prerequisites}

Necesita el permiso `governance_console_read` para ver las reglas de telemetría. Para crear, editar o eliminar reglas, necesita el permiso `telemetry_rules_write` o el rol de Datadog Admin. Para habilitar el filtrado en una regla, necesita el permiso `telemetry_rules_enforcement_write`.

<div class="alert alert-info">Algunos tipos de reglas podrían requerir permisos adicionales o versiones del Agent. Consulte las páginas de cada tipo de regla para obtener más información.</div>

## Tipos de reglas de telemetría {#telemetry-rule-types}

| Tipo de regla | Tipo(s) de telemetría | Aplicado en | Descripción |
|---|---|---|---|
| Visibilidad y cumplimiento de etiquetas | Métricas, logs, spans | Ingesta | Determina si las etiquetas y los valores de telemetría cumplen con las normas y, opcionalmente, descarta la telemetría que no cumple durante la ingesta. |
| Indexación de etiquetas | Métricas | Ingesta | Determina las etiquetas de métricas personalizadas que deben indexarse para una métrica determinada. |
| Filtrado de nombres de métricas | Métricas | Agent | Descarta Custom Metrics de un nombre determinado directamente en el Datadog Agent, antes de la ingesta. |

## Reglas de visibilidad y cumplimiento de etiquetas {#tag-visibility-and-enforcement-rules}

### Crear una regla de visibilidad de etiquetas {#create-a-tag-visibility-rule}

1. Navegue a [Governance Console > Telemetría](https://app.datadoghq.com/governance/telemetry) y haga clic en **+ Crear nueva regla**.
2. Seleccione el tipo de señal (**Métricas**, **APM** o **logs**) y el tipo de regla **Visibilidad y cumplimiento de etiquetas**.
3. Seleccione el contexto. Elija **Todos [Spans/Métricas/logs]** para aplicar la regla a toda la telemetría del tipo seleccionado. Elija **Seleccionados [Spans/Métricas/logs]** para limitar la regla a un subconjunto, luego ingrese una consulta de etiqueta, por ejemplo, `service:web-store` o `env:prod AND team:payments`. La misma sintaxis de consulta utilizada en los monitores y dashboards se aplica aquí.
4. Defina la clave de etiqueta. Ingrese la clave de etiqueta que desea hacer cumplir (por ejemplo, `env` o `team`). Seleccione **La clave de etiqueta debe estar presente** para marcar la telemetría a la que le falta la clave como no conforme.

   <div class="alert alert-info">Si no se selecciona <strong>La clave de etiqueta debe estar presente</strong>, una regla solo evalúa la telemetría que ya tiene la clave de etiqueta especificada. La telemetría sin la clave no se evalúa y se considera conforme.</div>
5. Especifique los valores de etiqueta. Seleccione **Valores de etiqueta permitidos** para definir una lista de permitidos, o **Valores de etiqueta no permitidos** para definir una lista de bloqueados. Ingrese los valores como una lista separada por comas; se admiten comodines (por ejemplo, `us*` coincide con `us-east-1` y `us-west-2`).
6. Nombre su regla. Ingrese una descripción que explique lo que la regla hace cumplir, por ejemplo, *Requerir etiqueta de equipo en todos los recursos*.

   <div class="alert alert-info">No puede activar <strong>Filtrar datos en la ingesta</strong> hasta después de crear la regla.</div>
7. Haga clic en **Crear regla**.

{{< img src="account_management/governance_console/telemetry_rules/creating_telemetry_rule.mp4" alt="Creación de una regla de visibilidad de etiquetas en Governance Console" video="true" style="width:100%;" >}}

### Revise el cumplimiento de la regla de visibilidad de etiquetas {#review-tag-visibility-rule-compliance}

Después de crear una regla de visibilidad de etiquetas, Datadog comienza a realizar un seguimiento del cumplimiento en toda la telemetría coincidente. Abra una regla para ver:

- **Puntuación de cumplimiento**: El porcentaje de spans, métricas o eventos de registro dentro del alcance que cumplen la regla, calculado durante el período de tiempo seleccionado. Una puntuación de cumplimiento del 100% significa que toda la telemetría coincidente cumple con la regla. Una puntuación del 0% significa que ninguna de la telemetría coincidente cumple con la regla.
- **Puntuación a lo largo del tiempo**: Un gráfico que muestra cómo ha evolucionado el cumplimiento. Utilice el selector de tiempo para ver la tendencia en su marco temporal preferido. Este gráfico no está disponible para métricas, y el historial de métricas está limitado a las últimas 8 horas.
- **Telemetría no conforme**: Una tabla que muestra los spans, métricas o log events individuales que infringen la regla, con el nombre del servicio, el recurso y detalles adicionales específicos de la señal. Haga clic en una fila para ver más detalles sobre la telemetría en cuestión. Para reglas en spans, haga clic en **Ver en Trace** para abrir los spans no conformes directamente en el explorador de trazas.

### Haga cumplir el cumplimiento de etiquetas mediante filtrado {#enforce-tag-compliance-through-filtering}

Después de crear y revisar una regla de visibilidad de etiquetas, puede hacerla cumplir filtrando la telemetría no conforme en la ingesta.

<div class="alert alert-warning">Las reglas de filtrado pueden causar pérdida permanente de datos si se configuran incorrectamente. Existe un tiempo de espera obligatorio de 5 minutos entre la creación de una regla de visibilidad de etiquetas y la habilitación del filtrado.</div>

Para habilitar el filtrado:

1. Navegue a la regla de visibilidad de etiquetas correspondiente y ábrala.
2. Revise cuidadosamente la descripción de la regla, la puntuación de cumplimiento y la telemetría que no cumple con las normas.
3. Aplique la regla activando **Filtrar datos en la ingesta** en **Acción de la regla**.
4. Confirme la aplicación del filtrado ingresando y enviando el texto requerido.

La regla comienza a filtrar inmediatamente la telemetría que no cumple con las normas en la ingesta. Las muestras de telemetría no conformes se registran en el [Audit Trail](/account_management/audit_trail/). Puede ver estas muestras navegando a la regla, luego desplazándose por la tabla o haciendo clic en **View in Audit Trail**.

{{< img src="account_management/governance_console/telemetry_rules/enforcing_telemetry_rule.mp4" alt="Aplicación de una regla de visibilidad de etiquetas y visualización de telemetría filtrada" video="true" style="width:100%;" >}}

## Editar o eliminar una regla {#edit-or-delete-a-rule}

Haga clic en el menú **⋮** en cualquier fila de regla para editarla o eliminarla. Los cambios surten efecto de inmediato, incluso si una regla está filtrando o descartando telemetría activamente, y los datos de cumplimiento de reglas anteriores no se conservan.

## Otras reglas {#other-rules}

Puede crear y administrar reglas específicas para métricas desde la Governance Console. Alternativamente, puede administrar estas reglas desde Metrics Settings. Para obtener detalles específicos de la regla, consulte la documentación de referencia a continuación:

- [Indexación de etiquetas](/metrics/guide/tag-indexing-rules/)
- [Filtrado de nombres de métricas](/metrics/guide/agent-filtering-for-custom-metrics)

## Limitaciones {#limitations}

- Puede crear hasta 10 reglas por tipo de señal (los spans, las métricas y los logs tienen cada uno un límite independiente de 10).
- Una regla de visibilidad y cumplimiento de etiquetas puede especificar hasta 30 valores de etiqueta.
- Las reglas de telemetría no están disponibles para tipos de telemetría fuera de métricas, logs y spans.

Si su estrategia de etiquetado requiere más reglas o valores de etiqueta, comuníquese con su equipo de cuenta de Datadog para solicitar un límite mayor.

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}