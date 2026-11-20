---
aliases:
- /es/cloud_cost_management/reports
description: Realice un seguimiento del gasto de su organización con los informes
  de Cloud Cost Management.
further_reading:
- link: /cloud_cost_management/reporting/scheduled_reports
  tag: Documentación
  text: Informes de Cloud Cost programados
- link: /cloud_cost_management/reporting/explorer
  tag: Documentación
  text: Cost Explorer
- link: /cloud_cost_management/reporting/dashboards
  tag: Documentación
  text: Dashboards
- link: /cloud_cost_management/
  tag: Documentación
  text: Obtenga información sobre Cloud Cost Management
- link: https://www.datadoghq.com/blog/cloud-cost-management-ai-costs/
  tag: Blog
  text: Atribuya los costos de IA entre proveedores con Datadog Cloud Cost Management
private: true
title: Informes de Cloud Cost
---
## Descripción general {#overview}

Los informes de Cloud Cost Monitoring (CCM) de Datadog permiten a los equipos de operaciones financieras y finanzas gestionar de manera eficiente los costos en la nube. Esta función proporciona una plataforma centralizada para el análisis detallado de costos, lo que le permite explorar, analizar y compartir datos de Cloud Cost o presupuesto.

Con los informes, usted puede:

- Centralizar y analizar costos de [AWS][1], [Azure][2], [Google Cloud][3], [Oracle][12] y [proveedores SaaS][4]
- Visualizar y personalizar con filtros, agrupaciones y múltiples tipos de gráficos
- Crear informes de Cloud Cost y presupuesto para realizar un seguimiento del gasto y pronosticar costos futuros
- Guarde, programe y comparta informes con su equipo

## Elija la herramienta adecuada {#choose-the-right-tool}

Utilice **[explorador de costos][13]** para una investigación flexible y **Informes de Cloud Cost** para un análisis estandarizado y recurrente.

| Característica | explorador de costos | Informes de Cloud Cost |
|---------|---------------|--------------|
| Caso de uso | Análisis e investigación ad-hoc | Vistas guardadas y entrega programada |
| Consultas | Dinámicas, no guardadas por defecto | Guardadas y reutilizables |
| Plantillas | Sin plantillas | Plantillas preconfiguradas disponibles |
| Programación | No se puede programar | Se puede programar para correo electrónico/Slack |
| Flujo de trabajo | Exploración iterativa | Informes recurrentes |

## Crear un informe de CCM {#create-a-ccm-report}

1. Ve a [**Cloud Cost > Analyze > Reports**][5] en Datadog.
1. Haga clic en {{< ui >}}New Report{{< /ui >}} para empezar desde cero, o seleccione una plantilla de la galería para acelerar su flujo de trabajo.

   {{< img src="cloud_cost/cost_reports/create-new-report-1.png" alt="Cree un informe nuevo o a partir de una plantilla" style="width:100%;" >}}

   **Plantillas disponibles:**
   - {{< ui >}}AWS Spend by Service Name{{< /ui >}}: Entienda sus costos de EC2, S3 y Lambda.
   - {{< ui >}}Azure Spend by Service Name{{< /ui >}}: Desglose los costos por servicios de Azure como Virtual Machines y Azure Monitor.
   - {{< ui >}}GCP Spend by Service Name{{< /ui >}}: Desglose los costos por servicios de GCP como Compute Engine, BigQuery y Kubernetes Engine.
   - {{< ui >}}Datadog Spend by Product{{< /ui >}}: Desglose los costos por productos de Datadog como Infrastructure Hosts, Custom Metrics e Indexed Logs.
   - {{< ui >}}Spend by Provider{{< /ui >}}: Compare costos entre AWS, Azure, Google Cloud, Oracle Cloud y más.

## Personalización de su informe {#customizing-your-report}

{{< img src="cloud_cost/cost_reports/customization-options-3.png" alt="Personalice su informe seleccionando proveedores de nube, filtrando, agrupando, cambiando la visualización y utilizando opciones avanzadas" style="width:100%;" >}}

### Seleccione el tipo de informe {#select-the-type-of-report}

Seleccione el tipo de informe que desea crear:

- {{< ui >}}Cost{{< /ui >}}: Entienda en qué se gasta su dinero a través de servicios, regiones, equipos, etcétera.
- {{< ui >}}Budget{{< /ui >}}: Realice un seguimiento del gasto frente a objetivos presupuestarios predefinidos y pronostique costos futuros.

### Aplique filtros {#apply-filters}

Utilice filtros para incluir solo los costos específicos que desea asignar, como por proveedor, producto, etiqueta, región o tipo de costo, para que su regla se aplique exactamente al subconjunto correcto de su gasto en la nube.

| Filtrar por | Caso de uso |
|--------|----------|
| Proveedor de nube (como AWS, Azure, GCP, Snowflake) | Aplique su regla de asignación solo a los costos de un proveedor de nube específico, como por ejemplo para las tarifas de soporte de AWS, pero no para los costos de Azure o GCP. |
| Producto o servicio (como EC2, S3, RDS) | Asigne los costos relacionados con un producto o servicio específico. Por ejemplo, divida solo los costos de EC2 entre los equipos en lugar de todos los costos de AWS. |
| Etiquetas (`env:prod`, `team:analytics`) | Incluya o excluya costos según las etiquetas de los recursos. Por ejemplo, asigne costos solo para recursos de producción (`env:prod`), o solo para recursos etiquetados para el equipo de análisis. |
| Región | Asigne costos solo para recursos en una región geográfica específica. Por ejemplo, divida los costos de los recursos en `us-east-1` por separado de los de `eu-west-1`. |
| Tipo de costo (uso, soporte, sin etiqueta) | Asigne solo ciertos tipos de costos, como cargos por uso, tarifas de soporte o costos sin etiqueta. Por ejemplo, asigne solo los costos sin etiquetar para alentar a los equipos a etiquetar sus recursos. |
| Criterios personalizados | Cuando tenga un requisito comercial único que combine varios filtros, cree criterios personalizados. Por ejemplo, desea asignar solo los costos de EC2 en una región específica `us-west-2` etiquetados como `env:prod`. |

### Agrupar datos {#group-data}
- Agrupe por nombre de proveedor, nombre de servicio o etiquetas de recursos personalizadas para obtener información más detallada.

### Cambie la forma en que ve sus datos {#change-how-you-see-your-data}
- Seleccione una **opción de visualización**:
  - {{< ui >}}Bar chart{{< /ui >}}: Compare los costos entre varias categorías lado a lado, para que pueda identificar los principales factores de costo.
  - {{< ui >}}Pie chart{{< /ui >}}: Muestra la participación porcentual de cada segmento, ideal para comprender la proporción relativa de los costos entre un pequeño número de categorías.
  - {{< ui >}}Treemap{{< /ui >}}: Muestra datos jerárquicos y el tamaño relativo de muchas categorías a la vez, para que pueda ver tanto la estructura general como los mayores contribuyentes en una sola vista.
- Cambie la **vista de tabla**:
  - {{< ui >}}Summary{{< /ui >}}: Una imagen consolidada y general de sus costos.
  - {{< ui >}}Day over day{{< /ui >}}, {{< ui >}}week over week{{< /ui >}} o {{< ui >}}month over month{{< /ui >}}: Analice cómo cambian sus costos día a día, semana a semana o mes a mes e identifique tendencias o fluctuaciones inusuales.
- Actualice el **marco temporal** y el **marco temporal de comparación**:
  - Elija su marco temporal para establecer el período de informe que desea analizar.
  - Agregue un período de comparación para detectar cambios en los costos:
    - {{< ui >}}Default comparison{{< /ui >}}: Compara automáticamente con el período inmediatamente anterior (por ejemplo, esta semana frente a la semana pasada).
    - {{< ui >}}Flexible comparison{{< /ui >}}: Seleccione cualquier período arbitrario, como hace un año o un rango de fechas personalizado, para identificar patrones estacionales. Ambos períodos deben ser del mismo tipo (por ejemplo, semana a semana, mes a mes), aunque el número real de días puede variar al comparar meses de diferentes duraciones.
- Mostrar **costos previstos**:
  - Active {{< ui >}}Show forecast{{< /ui >}} para superponer los costos previstos en su informe de costos, junto con el gasto histórico. Consulte [Pronóstico en Cloud Cost Management][15] para obtener detalles sobre los períodos de pronóstico y las agrupaciones admitidas.

### Opciones avanzadas (opcional) {#advanced-options-optional}

- {{< ui >}}Show usage charges only{{< /ui >}}: Elija incluir todos los gastos (tarifas, impuestos, reembolsos) o centrarse solo en los cargos por uso.
- {{< ui >}}Cost type{{< /ui >}}: Elija un tipo de costo que se ajuste mejor a sus necesidades de informes, análisis o gestión financiera. Revise las definiciones de cada tipo de costo según su proveedor: [AWS][7], [Azure][8], [Google Cloud][9], [Personalizado][10].

  **Nota**: La disponibilidad de estas opciones varía según el proveedor o los proveedores seleccionados.

## Guarde y comparta su informe {#save-and-share-your-report}

Después de crear y personalizar su informe, puede guardarlo y compartirlo tanto desde la página principal de informes como desde las vistas de tarjetas de informe individuales.

- **Guarde su informe** para que esté disponible para uso personal o del equipo.
- **Comparta su informe** copiando la URL o exportándolo a CSV o PNG.
- **Programe informes** para que se envíen automáticamente a su equipo. [Más información sobre la programación de informes][11].
- **Exporte vistas de informes a Dashboards** para realizar un seguimiento de los costos junto con otros widgets. [Obtenga más información sobre el monitoreo de costos en dashboards][14].
- **Busque informes guardados** para encontrar lo que necesita (disponible solo desde la página principal de informes).

## Permisos {#permissions}

Se requieren los siguientes permisos para ver y administrar informes:

| Acción | Permiso requerido |
|---------|---------------|
| Visualizar informes | Lectura de Cloud Cost Management |
| Crear, editar, eliminar informes | Escritura de Cloud Cost Management |

Para ver la lista completa de permisos de CCM, consulte la [documentación de permisos][16].

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/cloud_cost_management/aws/
[2]: /es/cloud_cost_management/azure/?tab=billingaccounts
[3]: /es/cloud_cost_management/google_cloud/
[4]: /es/cloud_cost_management/saas_costs/
[5]: https://app.datadoghq.com/cost/analyze/reports
[6]: /es/cloud_cost_management/container_cost_allocation/
[7]: /es/cloud_cost_management/setup/aws/#cost-types
[8]: /es/cloud_cost_management/setup/azure/#cost-types
[9]: /es/cloud_cost_management/setup/google_cloud/#cost-types
[10]: /es/cloud_cost_management/setup/custom/#cost-metric-types
[11]: /es/cloud_cost_management/reporting/scheduled_reports
[12]: /es/cloud_cost_management/oracle/
[13]: /es/cloud_cost_management/reporting/explorer
[14]: /es/cloud_cost_management/reporting/dashboards
[15]: /es/cloud_cost_management/planning/forecasting#view-forecasts-in-reports
[16]: /es/cloud_cost_management/setup/permissions