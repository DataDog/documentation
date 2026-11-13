---
description: Si adquiere Datadog a través de un socio, visualice sus costos estimados
  de Datadog del mes a la fecha e históricos en el Resumen de facturación, con un
  desglose diario y detalles a nivel de producto y suborganización.
further_reading:
- link: /account_management/plan_and_usage/bill_overview/
  tag: Documentación
  text: Resumen de facturación
- link: /account_management/plan_and_usage/
  tag: Documentación
  text: Plan & Usage
title: Visibilidad de costos para clientes que compran a través de un socio
---
Si adquiere Datadog a través de un socio, puede obtener una mayor visibilidad de sus costos de Datadog a través de la página [Resumen de facturación][1] en su organización de Datadog. El Resumen de facturación proporciona una visualización única de sus costos estimados del mes a la fecha e históricos, un desglose diario de costos y la capacidad de agrupar costos por producto y suborganización, para que pueda comprender su gasto en Datadog en cualquier momento durante el período de facturación.

{{< img src="account_management/plan_and_usage/bill-overview-main-light.png" alt="Página de Resumen de facturación que muestra el encabezado de resumen de costos y el gráfico de barras apiladas de Desglose de costos diarios." >}}

## Características clave {#key-features}

- **Costo estimado del mes a la fecha**: Vea un total acumulado de sus costos de Datadog en cualquier momento durante el mes, sin esperar su factura.
- **Costo histórico**: Revise los costos de meses anteriores después de que cierre cada mes. Los datos se remontan a 15 meses, o hasta su cambio de contrato más reciente si es más reciente.
- **Desglose de costos diarios**: Visualice un gráfico de barras día a día de sus costos para detectar cambios en los costos a medida que ocurren.
- **Agrupar por producto**: Desglose los costos por categoría de producto y dimensión de facturación, como hosts de infraestructura, registros indexados o métricas personalizadas.
- **Agrupar por suborganización**: Si utiliza varias suborganizaciones de Datadog, filtre y vea los costos de cada una individualmente.

## Cómo funciona {#how-it-works}

Su socio comparte sus tarifas con Datadog. Datadog utiliza esas tarifas y sus datos de uso para calcular sus costos de Datadog y poblar las funciones de visibilidad de costos.

## Limitaciones {#limitations}

### Disponibilidad de las funciones {#feature-availability}

- **Las funciones avanzadas de visibilidad de costos no son compatibles.** Esto incluye los costos proyectados, el Costo por etiqueta y los [Costos de Datadog][2] en Cloud Cost Management.
- **Los clientes de Cloud Marketplace sin un acuerdo de reducción no son compatibles.** Si adquiere Datadog a través de AWS, Google Cloud o Azure Marketplace y no tiene un acuerdo de reducción, la visibilidad de costos no está disponible. Esta es una limitación de toda la plataforma que también afecta a algunos clientes directos.
- **Los contratos heredados de proveedores de servicio gestionado (MSP) (muchos clientes bajo un mismo contrato) no son compatibles.**
- **Los clientes que adquieren a través de dos socios de canal al mismo tiempo no son compatibles.** Si sus productos de Datadog pasan por dos revendedores (por ejemplo, de Datadog al Socio 1, al Socio 2 y a usted), la visibilidad de costos no está disponible.
- **Las organizaciones GovCloud no son compatibles.**

### Precisión del costo estimado {#estimated-cost-accuracy}

- **Los precios escalonados bajo demanda no son compatibles.** Los datos de costos no se muestran para los SKU activos de Error Tracking y LLM Observability.
- **Los productos basados en porcentajes no son compatibles.** Los datos de costos no se muestran para los SKU de Audit Trail o Premier Support.
- **Todos los costos son estimados.** Los costos se calculan a partir de las tarifas que proporciona su socio, por lo que los costos históricos también son estimaciones, incluso después de que cierra un mes. En la mayoría de los casos, los costos en el Resumen de facturación coinciden con la factura de su socio. Pueden ocurrir diferencias menores (unos pocos centavos) debido a matices en los cálculos de facturación. Si nota discrepancias significativas, comuníquese con su socio.

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/account_management/plan_and_usage/bill_overview/
[2]: /es/cloud_cost_management/datadog_costs/