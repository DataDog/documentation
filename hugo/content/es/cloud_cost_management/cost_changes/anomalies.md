---
aliases:
- /es/cloud_cost_management/reporting/anomalies
- /es/cloud_cost_management/anomalies
further_reading:
- link: /cloud_cost_management/
  tag: Documentación
  text: Obtenga información sobre Cloud Cost Management
- link: /cloud_cost_management/cost_changes/monitors
  tag: Seguimientos
  text: Cree monitores de costos
title: Página de anomalías
---
## Descripción general {#overview}

Datadog Cloud Cost Management (CCM) hace un seguimiento continuo de su entorno para detectar y priorizar cambios de costos inesperados, lo que le permite compartir, investigar y resolver anomalías. Las anomalías de costos están disponibles para AWS, Azure, Google Cloud, Oracle Cloud, Datadog, Anthropic, OpenAI, Cursor, Amazon Bedrock, Vertex AI, Gemini y Databricks, y no requieren ninguna configuración adicional después de configurar CCM.

{{< img src="cloud_cost/anomalies/anomalies-overview.png" alt="Lista de anomalías de costos que muestra los nombres de los servicios, los tipos de uso y los impactos en los costos" style="width:80;" >}}

Un flujo de trabajo típico podría ser el siguiente:

1. **Visualice** las anomalías en la pestaña {{< ui >}}Anomalies{{< /ui >}}
2. **Investigue** usando Watchdog Explains para comprender qué está impulsando los cambios en los costos
3. **Comparta con los equipos de ingeniería** que pueden tomar medidas revisando los detalles, investigando más a fondo o configurando el seguimiento
4. **Resuelva** las anomalías que se esperan o que no son significativas

## Cómo se definen las anomalías {#how-anomalies-are-defined}

Las anomalías son cambios significativos e inesperados que se apartan de los patrones habituales. Datadog identifica automáticamente las anomalías mediante técnicas de aprendizaje automático que se adaptan a sus patrones de uso específicos.

Para distinguir entre anomalías reales y fluctuaciones esperadas, el algoritmo de Datadog:
- Reconoce picos y caídas de costos recurrentes, como un aumento de costos cada lunes o un pico el cuarto día de cada mes
- Se enfoca en el uso de ingeniería (excluye impuestos, créditos, reembolsos y tarifas de instancias reservadas)
- Filtra las anomalías de bajo impacto para reducir el ruido

## Personalice la detección de anomalías {#customize-anomaly-detection}

De forma predeterminada, Datadog detecta automáticamente las anomalías de costos para cada proveedor de nube. Si tiene el permiso `cloud_cost_management_write`, puede personalizar cómo Datadog detecta las anomalías por proveedor para que se ajusten mejor a la estructura de costos de su organización. La detección de anomalías personalizada está disponible para AWS, Azure, Google Cloud, Datadog, Oracle Cloud, Anthropic, OpenAI, Cursor, Amazon Bedrock, Vertex AI y Gemini.

Para personalizar la detección de anomalías:

1. Desde la [pestaña {{< ui >}}Anomalies{{< /ui >}}][1], haga clic en {{< ui >}}Configure{{< /ui >}}.
1. En el panel {{< ui >}}Configure Cost Anomalies{{< /ui >}}, seleccione un proveedor. Una marca de verificación indica que el proveedor utiliza configuraciones personalizadas, y un círculo vacío indica que utiliza la configuración predeterminada de Datadog.
1. Ajuste las siguientes opciones de configuración para el proveedor seleccionado:
   - **Detection dimension**: La dimensión en la que Datadog detecta anomalías de costos (por ejemplo, servicio o descripción del cargo). Esta configuración es obligatoria.
   - **Minimum daily cost**: El costo diario mínimo que debe alcanzar un cambio antes de que se marque como una anomalía (al menos 5, en la moneda de su organización). Aumente este valor para reducir el ruido de los cambios de bajo costo.
   - **Breakdown tags**: Hasta cinco etiquetas adicionales que se utilizan para desglosar las anomalías detectadas, lo que ayuda a la [habilidad de Cloud Cost en Bits Chat][5] a identificar qué está causando cada anomalía. Siempre se incluye un conjunto de etiquetas predeterminadas que no se pueden eliminar.
1. Haga clic en {{< ui >}}Save{{< /ui >}}. Los cambios se aplican a las anomalías detectadas en el futuro.

Para devolver un proveedor a la configuración predeterminada de Datadog, seleccione el proveedor, haga clic en {{< ui >}}Revert{{< /ui >}} y luego haga clic en {{< ui >}}Save{{< /ui >}}.

## Visualizar anomalías de costos {#view-cost-anomalies}

En la [pestaña Anomalies de la página de Cloud Cost en Datadog][1], puede visualizar y filtrar las anomalías:

- {{< ui >}}Active{{< /ui >}}: Anomalías del último día completo de datos de costos (normalmente, de 2 a 3 días atrás).
- {{< ui >}}Past{{< /ui >}}: Anomalías que duraron más de 7 días o que ya no se detectan como anómalas. Las anomalías pasadas pueden ser útiles para generar informes, pero a menudo son menos urgentes y ofrecen menos posibilidades de tomar medidas.
- {{< ui >}}Resolved{{< /ui >}}: Anomalías que ha marcado como resueltas con contexto.

Cada tarjeta de anomalía muestra:
- Nombre del servicio (`rds`, por ejemplo)
- Tipo de uso
- Cuentas de nube afectadas
- Costos esperados frente a los reales
- Gráfico de tendencia de costos (último mes)

Las anomalías se ordenan por impacto en el costo, con los cambios más significativos en la parte superior.

## Investigar anomalías {#investigate-anomalies}

### Entender qué impulsa las anomalías {#understand-what-drives-anomalies}

CCM utiliza automáticamente [Watchdog Explains][2], un asistente de investigación, para ayudarle a identificar qué está provocando las anomalías de costos. Watchdog Explains analiza e identifica específicamente los siguientes elementos:

- cuentas
- equipos
- servicios
- clústeres de Kubernetes o ECS
- regiones

donde ocurrió la anomalía, lo que reduce los pasos de investigación manual. Al pasar el cursor sobre el gráfico de anomalías, puede ver dos gráficos: uno con y otro sin las etiquetas identificadas por Watchdog Explains. Esto muestra cómo la eliminación de etiquetas específicas aplana el pico, confirmando el impacto en el costo.

### Tomar medidas sobre las anomalías {#take-action-on-anomalies}

Siga estos pasos para investigar y resolver anomalías:

1. Pase el cursor sobre una anomalía para ver los factores de la anomalía o haga clic en {{< ui >}}See more{{< /ui >}} para abrir el panel lateral.

   {{< img src="cloud_cost/anomalies/anomalies-watchdog.png" alt="Haga clic en See More para ver el panel lateral que muestra los detalles de la anomalía, las opciones de investigación y los botones de acción" style="width:80;" >}}

1.  Revise los detalles de los servicios afectados, los equipos involucrados, los entornos impactados, los ID de recursos o cómo el uso y el precio unitario pueden estar impulsando la anomalía de costos.
1. **Investigue más a fondo**: Visualice la anomalía en Cost Explorer o en un Datadog Notebook para investigar más a fondo las anomalías mediante el uso de dimensiones adicionales. Luego, puede enviar la anomalía, el enlace de Explorer o el Notebook a los propietarios del servicio o a los equipos identificados por Watchdog Explains. Esto permite a los equipos resolver anomalías con contexto sobre por qué ocurrió la anomalía y si se esperaba.

   {{< img src="cloud_cost/anomalies/anomalies-take-action.png" alt="Haga clic en Take Action para visualizar la anomalía en Cost Explorer o agregarla a un Notebook" style="width:80;" >}}
1. **Configurar el seguimiento**: Cree un seguimiento de anomalías de costos para patrones similares o configure alertas para futuras anomalías.
   {{< img src="cloud_cost/anomalies/anomalies-create-monitor.png" alt="Crear un seguimiento de anomalías de costos" style="width:80;" >}}

## Resolver anomalías {#resolve-anomalies}

A medida que investiga las anomalías, puede encontrar algunas que no son significativas, que en realidad eran costos esperados o que, de otro modo, no se consideran anomalías.

Para resolver una anomalía:

1. Haga clic en {{< ui >}}Resolve Anomaly{{< /ui >}} para abrir la ventana emergente de resolución.
1. Seleccione una de las siguientes resoluciones:
   - {{< ui >}}The anomaly amount was too small{{< /ui >}}
   - {{< ui >}}This is an unexpected increase{{< /ui >}}
   - {{< ui >}}This is an expected increase{{< /ui >}}
1. Agregue contexto sobre por qué es o no una anomalía.
1. Haga clic en {{< ui >}}Resolve{{< /ui >}} para moverla a la pestaña {{< ui >}}Resolved{{< /ui >}}.

Este es un ejemplo de cómo marcar una anomalía de costo como significativa y explicar por qué es una anomalía:

{{< img src="cloud_cost/anomalies/cost_anomalies_side-panel_is-unexpected-1.png" alt="Formulario para marcar una anomalía como inesperada con campo de explicación" style="width:80;" >}}

## Solución de problemas {#troubleshooting}

Si no está viendo las anomalías esperadas:
- Verifique que CCM esté [configurado correctamente][3]
- Verifique que tiene los permisos necesarios para AWS, Azure, Google Cloud u Oracle Cloud
- Revise el rango de tiempo de su vista de anomalías

Para obtener más ayuda, comuníquese con [Datadog Support][4].

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/cost/analyze/anomalies
[2]: /es/dashboards/graph_insights/watchdog_explains
[3]: /es/cloud_cost_management/setup/
[4]: /es/help/
[5]: /es/cloud_cost_management/cloud_cost_skill/