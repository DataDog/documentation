---
aliases:
- /es/cloud_cost_management/reports
description: Realiza un seguimiento de los gastos de tu organización con los informes
  de Cloud Cost Management.
further_reading:
- link: /cloud_cost_management/reporting/scheduled_reports
  tag: Documentación
  text: Informes de costes programados
- link: /cloud_cost_management/reporting/explorer
  tag: Documentación
  text: Cost Explorer
- link: /cloud_cost_management/
  tag: Documentación
  text: Más información sobre Cloud Cost Management
private: true
title: Informes de costes
---

## Información general

Los informes de Cloud Cost Monitoring (CCM) de Datadog agilizan las operaciones financieras y permiten a los equipos de finanzas gestionar eficazmente los costes de la nube. Esta función proporciona una plataforma centralizada para el análisis detallado de los costes, que te permite explorar, analizar y compartir datos de costes o presupuestos de nube.

Con los informes, puedes:

- Centraliza y analiza los costes de [AWS][1], [Azure][2], [Google Cloud][3], [Oracle][12] y [proveedores de SaaS][4].
- Visualizar y personalizar con filtros, agrupaciones y múltiples tipos de gráficos
- Elaborar informes de costes y presupuestos para realizar un seguimiento del gasto y prever costes futuros
- Guardar, programar y compartir informes con tu equipo

## Elegir la herramienta adecuada

Utiliza el **[Cost Explorer][13]** para una investigación flexible e **Informes de costes** para un análisis estandarizado y recurrente.

| Función | Cost Explorer | Informes de costes |
|---------|---------------|--------------|
| Caso práctico | Análisis e investigación ad hoc | Vistas guardadas y entrega programada |
| Consultas | Dinámico, no guardado por defecto | Guardado y reutilizable |
| Plantillas | Sin plantillas | Plantillas prediseñadas disponibles |
| Programación | No se puede programar | Se puede programar por email/Slack |
| Flujo de trabajo | Exploración iterativa | Informes periódicos |

## Crear un informe de CCM

1. Ve a [**Cloud Cost > Analyze > Reports** (Cloud Cost > Análisis > Informes)][5] en Datadog.
1. Haz clic en **New Report** (Nuevo informe) para empezar desde cero, o selecciona una plantilla de la galería para acelerar tu flujo de trabajo.

   {{< img src="cloud_cost/cost_reports/create-new-report.png" alt="Crear un informe nuevo o a partir de una plantilla." style="width:100%;" >}}

   **Plantillas disponibles:**
   - **Gasto de AWS por nombre de servicio**: Comprende tus costes de EC2, S3 y Lambda.
   - **Gasto de Azure por nombre de servicio**: Desglosa los costes por servicios Azure como máquinas virtuales y monitor Azure.
   - **Gasto de GCP por nombre de servicio**: Desglosa los costes por servicios GCP como Compute Engine, BigQuery y Kubernetes Engine.
   - **Gasto por proveedor**: compara costes en AWS, Azure, Google Cloud, Oracle Cloud, etc.

## Personalización del informe

{{< img src="cloud_cost/cost_reports/customization-options-aws-1.png" alt="Personaliza tu informe seleccionando proveedores de nube, filtrando, agrupando, cambiando la visualización y utilizando opciones avanzadas." style="width:100%;" >}}

### Seleccionar el tipo de informe

Selecciona el tipo de informe que quieres crear:

- **Coste**: Comprende en qué se gasta tu dinero en servicios, regiones, equipos, etc.
- **Presupuesto**: Realiza un seguimiento de los gastos con respecto a los objetivos de presupuesto predefinidos y anticipa costes futuros.

### Aplicar filtros

Utiliza filtros para incluir solo los costes específicos que quieres asignar, como por proveedor, producto, etiqueta, región o tipo de coste, de modo que tu regla apunte exactamente al subconjunto adecuado de tus gastos de nube.

| Filtrar por | Caso práctico |
|--------|----------|
| Proveedor de nube (como AWS, Azure, GCP, Snowflake) | Aplica tu regla de asignación solo a los costes de un proveedor de nube específico, como por ejemplo a las tarifas de asistencia de AWS, pero no a los costes de Azure o GCP. |
| Producto o servicio (como EC2, S3, RDS) | Asigna costes relacionados con un producto o servicio específico. Por ejemplo, divide solo los costes de EC2 entre equipos, en lugar de todos los costes de AWS. |
| Etiquetas (`env:prod`, `team:analytics`) | Incluye o excluye costes en función de las etiquetas de los recursos. Por ejemplo, asigna costes solo a los recursos de producción (`env:prod`) o solo a los recursos etiquetados para el equipo de análisis. |
| Región | Asigna costes solo a los recursos de una región geográfica específica. Por ejemplo, divide los costes de los recursos de `us-east-1` separados de los de `eu-west-1`. |
| Tipo de coste (uso, soporte, no etiquetado) | Asigna solo determinados tipos de costes, como cargos por uso, tarifas de soporte o costes no etiquetados. Por ejemplo, asigna solo costes no etiquetados para incentivar a los equipos a etiquetar sus recursos. |
| Criterios personalizados | Cuando tengas un requisito empresarial único que combine varios filtros, crea un criterio personalizado. Por ejemplo, quieres asignar solo los costes de EC2 en una región específica `us-west-2`, etiquetados como `env:prod`. |

### Datos del grupo
- Agrupa por nombre de proveedor, nombre de servicio o etiquetas de recursos personalizadas para obtener información más detallada.

### Cambia la forma de ver tus datos
- Selecciona una **opción de visualización**:
  - **Gráfico de barras**: Compara los costes de varias categorías para identificar los principales factores de coste.
  - **Gráfico circular**: Muestra la cuota porcentual de cada segmento, ideal para comprender la proporción relativa de costes entre un número reducido de categorías.
  - **Diagrama de árbol**: Muestra datos jerárquicos y el tamaño relativo de muchas categorías a la vez, para que puedas ver la estructura general y los mayores colaboradores en una sola vista.
- Cambia la **vista de tabla**:
  - **Resumen**: Una imagen consolidada y global de tus costes.
  - **Día a día**, **semana a semana** o **mes a mes**: Analiza cómo cambian tus costes día a día, semana a semana o mes a mes, e identifica tendencias o fluctuaciones inusuales.
- Actualiza el **marco temporal** para monitorizar tendencias sobre tus gastos en la nube.

### Opciones avanzadas (opcionales)

- **Mostrar solo gastos de uso**: Elige incluir todos los gastos (tarifas, impuestos, reembolsos) o centrarte solo en los gastos de uso.
- **Tipo de coste**: Elige el tipo de coste que mejor se adapte a tus necesidades de elaboración de informes, análisis o gestión financiera. Revisa las definiciones de cada tipo de coste según tu proveedor: [AWS][7], [Azure][8], [Google Cloud][9], [Personalizado][10].

  **Nota**: La disponibilidad de estas opciones varía en función del/de los proveedor(es) seleccionado(s).

## Guardar y compartir tu informe

Una vez creado y personalizado el informe, puedes guardarlo y compartirlo desde la página principal de informes y desde las vistas individuales de informes.

- **Guarda tu informe** para que esté disponible para uso personal o del equipo.
- **Comparte tu informe** copiando la URL o exportándolo a CSV o PNG.
- **Programa informes** para que se envíen automáticamente a tu equipo. [Más información sobre la programación de informes][11].
- **Exporta vistas de informes a dashboards** para realizar un seguimiento de los costes junto con otros widgets.
- **Busca informes guardados** para encontrar lo que necesitas (solo disponible en la página de informes principales.

## Referencias adicionales

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