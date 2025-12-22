---
aliases:
- /es/cloud_cost_management/reporting/anomalies
further_reading:
- link: /cloud_cost_management/
  tag: Documentación
  text: Más información sobre Cloud Cost Management
- link: /cloud_cost_management/cost_changes/monitors
  tag: Monitores
  text: Crear monitores de costes
title: Página de anomalías
---

## Información general

Datadog Cloud Cost Management (CCM) monitoriza de forma continua tu entorno para detectar y priorizar cambios imprevistos en los costes, lo que te permite compartir, investigar y resolver anomalías. Las anomalías de costes están disponibles para AWS, Azure y Google Cloud y no requieren ninguna configuración adicional una vez configurado CCM.

{{< img src="cloud_cost/anomalies/anomalies-overview.png" alt="Lista de anomalías de costes que muestra nombres de servicios, tipos de uso e impactos en los costes" style="width:80;" >}}

Un flujo de trabajo típico podría ser el siguiente:

1. **Ver** las anomalías en la pestaña Anomalías
2. **Investigar** utilizando Watchdog Explains para comprender qué está provocando los cambios en los costes
3. **Compartir con equipos de ingeniería** que pueden tomar medidas revisando los detalles, investigando más a fondo o definiendo un seguimiento
4. **Resolver** anomalías previstas o no significativas

## Cómo se definen las anomalías

Las anomalías son cambios significativos e imprevistos que se destacan de los patrones típicos. Datadog identifica automáticamente las anomalías utilizando técnicas de machine learning que se adaptan a tus patrones de uso específicos.

Para distinguir entre verdaderas anomalías y fluctuaciones previstas, el algoritmo de Datadog:
- Reconoce los picos y caídas de costes recurrentes, como un aumento de costes cada lunes o un pico el cuarto día de cada mes.
- Se centra en el uso de ingeniería (excluye impuestos, créditos, reembolsos y tasas de instancia reservada).
- Filtra las anomalías de bajo impacto para reducir el ruido.

## Ver anomalías en costes

En la [pestaña Anomalías de la página Cloud Cost en Datadog][1], puedes ver y filtrar anomalías:

- **Activas**: Anomalías del último día completo de datos de costes (normalmente 2a 3 días antes).
- **Pasadas**: Anomalías que han durado más de 7 días o que ya no se detectan como anómalas. Puede ser útil informar sobre las anomalías pasadas, aunque suelen ser menos urgentes y procesables.
- **Resueltas**: Anomalías que has marcado como resueltas con contexto.

Cada tarjeta de anomalía muestra:
- Nombre del servicio (`rds`, por ejemplo)
- Tipo de uso
- Cuentas en la nube afectadas
- Costes previstos frente a costes reales
- Gráfico de evolución de los costes (último mes)

Las anomalías se clasifican por impacto en los costes, con los cambios más significativos en la parte superior.

## Investigar anomalías

### Comprender las causas de las anomalías

CCM utiliza automáticamente [Watchdog Explains][2], un asistente de investigación, para ayudarte a identificar las causas de las anomalías de costes. Watchdog Explains analiza e identifica de forma específica:

- cuentas
- equipos
- servicios
- clústeres Kubernetes o ECS
- regiones

donde se ha producido la anomalía, lo que reduce los pasos de la investigación manual. Al pasar el cursor por encima del gráfico de anomalías, se pueden ver dos gráficos: uno con y otro sin las etiquetas identificadas por Watchdog Explains. Esto muestra cómo la eliminación de etiquetas específicas aplana el pico, confirmando el impacto en el coste.

### Tomar medidas en caso de anomalías

Sigue estos pasos para investigar y resolver anomalías:

1. **Pasa el ratón** por encima de una anomalía para ver los controladores de anomalía o haz clic en **See more** (Ver más) para abrir el panel lateral.

   {{< img src="cloud_cost/anomalies/anomalies-watchdog.png" alt="Hacer clic en See More (Ver más= para ver el panel lateral que muestra detalles de la anomalía, opciones de invstigación y botones de acción" style="width:80;" >}}

1.  **Revisa los detalles** de los servicios afectados, los equipos implicados, los entornos afectados, los ID de recursos, o cómo el uso y el precio unitario pueden estar provocando la anomalía de costes.
1. **Investiga más a fondo**: Visualiza la anomalía en Cost Explorer o en un notebook de Datadog para investigar más a fondo las anomalías utilizando dimensiones adicionales. A continuación, puedes enviar la anomalía, el enlace del Explorer o el notebook a los propietarios del servicio o a los equipos identificados por Watchdog Explains. Esto permite a los equipos resolver las anomalías con el contexto de por qué se ha producido la anomalía y si estaba prevista.

   {{< img src="cloud_cost/anomalies/anomalies-take-action.png" alt="Hacer clic en Take Action (Tomar medidas) para visualizar la anomalía en Cost Explorer o añadirla a un notebook" style="width:80;" >}}
1. **Configura la monitorización**: Crea un monitor de anomalías de costes para patrones similares o configura alertas para futuras anomalías.
   {{< img src="cloud_cost/anomalies/anomalies-create-monitor.png" alt="Crear un monitor de anomalías de costes" style="width:80;" >}}

## Resolver anomalías

Al investigar anomalías, es posible que encuentres algunas que no son significativas, que en realidad eran costes previstos o que no se consideran anomalías por otros motivos.

Para resolver una anomalía:

1. Haz clic en **Resolve Anomaly** (Resolver anomalía) para abrir la ventana emergente de resolución.
1. Selecciona una de las siguientes resoluciones para ayudar a mejorar el algoritmo:
   - La cantidad de anomalía era demasiado pequeña
   - Se trata de un aumento imprevisto
   - Se trata de un aumento previsto
1. **Añade contexto** para explicar por qué es o no una anomalía.
1. Haz clic en **Resolve** (Resolver) para moverla a la pestaña Resueltas.

Este es un ejemplo de cómo marcar una anomalía de costes como significativa y explicar por qué es una anomalía:

{{< img src="cloud_cost/anomalies/cost_anomalies_side-panel_is-unexpected-1.png" alt="Forma de marcar una anomalía como imprevista, junto a un campo con la explicación" style="width:80;" >}}

## Solucionar problemas

Si no ves las anomalías previstas:
- Comprueba que CCM está [correctamente configurado][3].
- Comprueba que dispone de los permisos necesarios para AWS, Azure o Google Cloud.
- Revisa el intervalo de tiempo de tu vista de anomalías.

Para obtener más ayuda, ponte en contacto con el [servicio de asistencia de Datadog][4].

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/cost/analyze/anomalies
[2]: /es/dashboards/graph_insights/watchdog_explains
[3]: /es/cloud_cost_management/setup/
[4]: /es/help/