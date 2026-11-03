---
description: Aprenda a administrar el rendimiento y el estado de sus programas de
  descuento en la nube.
further_reading:
- link: /cloud_cost_management/
  tag: Documentación
  text: Obtenga información sobre Cloud Cost Management
title: Programas de compromiso
---
<div class="alert alert-info">CCM Commitment Programs admite instancias reservadas y planes de ahorro para EC2, RDS y ElastiCache en AWS, y máquinas virtuales en Azure.</div>

## Descripción general {#overview}

Los proveedores de la nube ofrecen programas de descuento basados en compromisos, tales como {{< tooltip text="Reserved Instance (RI)" tooltip="Un descuento de facturación por comprometerse a utilizar una configuración de instancia específica durante un plazo de uno o tres años." >}} y {{< tooltip text="Savings Plans" tooltip="Programas de descuento en la nube flexibles que ofrecen precios más bajos a cambio de un compromiso de una cantidad constante de uso (medido en $/hora) durante un plazo." >}}, para ayudarle a ahorrar en el uso predecible. La función Programas de compromiso de Datadog le ayuda a hacer un seguimiento, optimizar y maximizar el valor de estos descuentos en sus entornos de nube.

Con los Programas de compromiso, usted puede:
- Haga un seguimiento y gestione los compromisos no utilizados o subutilizados
- Apunte a un gasto alto {{< tooltip text="on-demand" tooltip="Recursos en la nube facturados a tarifas estándar, sin ningún compromiso o programa de descuento." >}} con compromisos adicionales
- Supervise las fechas de vencimiento y planifique las renovaciones a tiempo

## Primeros pasos {#getting-started}

Utilice los Programas de compromiso para comprender y optimizar sus compromisos en la nube.

1. Vaya a [**Cloud Cost > Planning > Commitment Programs**][1] en Cloud Cost Management.
2. Utilice el selector de productos para elegir un tipo de compromiso y el selector de marco temporal para establecer el período de informes.
3. Obtenga información sobre sus KPI, costos de compromiso y recomendaciones de renovación:
   - Revise los KPI en la sección [Commitments overview](#commitments-overview).
   - Analice las áreas de gasto bajo demanda para comprender cómo mejorar su cobertura en la sección [On-demand hot-spots](#on-demand-hot-spots).
   - Vea los compromisos activos por tipo en la tabla [Inventario de compromisos](#commitments-inventory).
   - Identifique los planes de ahorro que generan más desperdicio en [Planes de ahorro menos utilizados](#least-used-savings-plans).
4. Tome medidas basadas en estos conocimientos:
   - Ajuste las cargas de trabajo para utilizar mejor sus compromisos y evitar cargos adicionales bajo demanda.
   - Actualice los compromisos comprándolos o cambiándolos según sus datos de uso.
   - Planifique las renovaciones o retire los compromisos antes de que caduquen.
   - Optimice el gasto utilizando las recomendaciones de Datadog para ahorrar más y reducir el desperdicio.

## Descripción general de compromisos {#commitments-overview}

Revise estos indicadores clave de rendimiento (KPI) para sus proveedores y servicios en la nube:

{{< img src="cloud_cost/planning/commitments-inventory.png" alt="Panel de descripción general de compromisos que muestra métricas clave de ahorro y un gráfico de barras que compara los costos de los compromisos con los costos equivalentes bajo demanda a lo largo del tiempo." style="width:100%;" >}}

- {{< ui >}}Effective Savings Rate (ESR){{< /ui >}}: Porcentaje de ahorro de costos logrado por sus programas de descuento en comparación con los precios bajo demanda, teniendo en cuenta tanto los compromisos utilizados como los subutilizados.
  - _Ejemplo: Sus RI pueden ofrecer un 62% de descuento, pero si su ESR es solo del 45%, los compromisos subutilizados están reduciendo sus ahorros reales._
- {{< ui >}}Realized Savings{{< /ui >}}: Monto total en dólares ahorrado mediante el uso de programas de compromiso frente a las tarifas bajo demanda.
  - _Ejemplo: Usted gastó $10,000 en servicios en la nube el mes pasado, pero habría gastado $14,000 a tarifas bajo demanda, por lo que su ahorro absoluto es de $4,000._

## Puntos críticos bajo demanda {#on-demand-hot-spots}

Los puntos críticos bajo demanda resaltan áreas con costos bajo demanda elevados, lo que puede indicar oportunidades para comprar compromisos adicionales.

{{< img src="cloud_cost/planning/commitments-on-demand-2.png" alt="Tabla de puntos críticos bajo demanda para AWS RDS que muestra la región, la familia de instancias, el motor de base de datos, el porcentaje de cobertura y el costo bajo demanda." style="width:100%;" >}}

Utilice las pestañas {{< ui >}}Cost{{< /ui >}} y {{< ui >}}Hours{{< /ui >}} para alternar entre el gasto bajo demanda en dólares o el uso en horas. Utilice los filtros disponibles para limitar los resultados; los filtros varían según el producto seleccionado.

Las columnas de la tabla corresponden a los filtros del producto seleccionado, mostrando las dimensiones que caracterizan el uso bajo demanda (como la región, la familia de instancias o el motor de base de datos), junto con {{< ui >}}Coverage{{< /ui >}} (porcentaje de uso cubierto por compromisos) y {{< ui >}}On-Demand Cost{{< /ui >}} (ordenado en orden descendente para mostrar primero los puntos críticos de mayor gasto).

## Inventario de compromisos {#commitments-inventory}

El Inventario de compromisos proporciona una vista detallada de los compromisos activos durante el período seleccionado, organizados por tipo de compromiso. Esto incluye los compromisos que vencen pronto (dentro de 30 días) y los compromisos que ya han vencido al momento de la visualización.

{{< img src="cloud_cost/planning/commitments-inventory-1.png" alt="Sección del Inventario de compromisos que muestra la pestaña Planes de ahorro con un gráfico de utilización y una tabla de planes de ahorro de EC2." style="width:100%;" >}}

Use las pestañas {{< ui >}}Savings Plans{{< /ui >}} y {{< ui >}}Reserved Instances{{< /ui >}} para cambiar entre los tipos de compromiso. Cada pestaña muestra:

- {{< ui >}}Utilization{{< /ui >}}: Porcentaje del tipo de compromiso que se está utilizando durante el período seleccionado.
- {{< ui >}}Unused spend{{< /ui >}}: Gasto total en compromisos no utilizados.
- {{< ui >}}Daily chart{{< /ui >}}: Realiza un seguimiento del gasto de compromiso utilizado y no utilizado junto con la tasa de utilización a lo largo del tiempo.

Use la casilla de verificación {{< ui >}}Only show Expiring{{< /ui >}} para filtrar la tabla y mostrar los compromisos próximos a su fecha de finalización.

La tabla enumera sus compromisos activos. Las columnas varían según el producto y el tipo de compromiso, pero las columnas comunes incluyen:

| Columna | Descripción |
|---|---|
| ARN del plan de ahorro, ARN de la reserva o ID de compromiso | Identificador único del compromiso (ID de compromiso para Azure). |
| Nombre del beneficio | Nombre del plan de ahorro o beneficio de reserva de Azure. |
| Modelo de pago | Opción de pago (por ejemplo, sin pago inicial, pago inicial parcial, pago inicial total). |
| Plazo | Duración del compromiso (por ejemplo, 1 año, 3 años). |
| Tipo | El tipo de compromiso (por ejemplo, `ComputeSavingsPlans`). |
| Gasto comprometido/hora | Gasto por hora comprometido bajo el plan. |
| Fecha de finalización | Fecha en la que vence el compromiso. |
| Utilización | Porcentaje del compromiso utilizado durante el período seleccionado. |

Use el botón {{< ui >}}Columns{{< /ui >}} para mostrar u ocultar columnas adicionales.

## Planes de ahorro menos utilizados {#least-used-savings-plans}

Planes de ahorro menos utilizados le ayuda a identificar qué planes de ahorro están generando la mayor cantidad de desperdicio. Utilice esta sección para determinar cuándo ocurre ese desperdicio y tome medidas para mejorar la utilización.

{{< img src="cloud_cost/planning/commitment-programs-least-used-savings-plans-1.png" alt="Sección de Planes de ahorro menos utilizados que muestra un gráfico de barras del gasto promedio diario no utilizado del plan de ahorro por día de la semana, una tabla de los planes de ahorro más derrochadores con el monto de desperdicio, la utilización y el ARN, y un mapa de calor del porcentaje de gasto comprometido no utilizado por hora por día de la semana." style="width:100%;" >}}

{{< ui >}}Daily average unused Savings Plans{{< /ui >}}: Un gráfico de barras que muestra el costo diario promedio del gasto del plan de ahorro no utilizado para cada día de la semana. Utilice esto para detectar patrones, como un mayor desperdicio los fines de semana cuando las cargas de trabajo pueden ser menores.

{{< ui >}}Savings Plans with most waste{{< /ui >}}: Una tabla que enumera los planes de ahorro subutilizados, ordenados por desperdicio total. Las columnas incluyen:

- {{< ui >}}Waste{{< /ui >}}: Monto total en dólares del gasto comprometido no utilizado durante el período seleccionado.
- {{< ui >}}Utilization{{< /ui >}}: Porcentaje del plan de ahorro que se está utilizando, mostrado como porcentaje y barra de progreso.
- {{< ui >}}Savings Plan ARN{{< /ui >}}: Identificador único para el plan de ahorro.

{{< ui >}}Hourly unused committed spend percentage{{< /ui >}}: Un mapa de calor que muestra el porcentaje de gasto comprometido que no se utilizó, desglosado por hora (UTC) y día de la semana. Las celdas más oscuras indican porcentajes no utilizados más altos, lo que permite identificar ventanas de tiempo específicas donde los compromisos se subutilizan constantemente.

## Simulación de Plan de Ahorro {#savings-plan-simulation}

<div class="alert alert-info">La simulación de Plan de Ahorro está en Preview. Es compatible con AWS Savings Plans y se ejecuta a nivel de <a href="https://docs.aws.amazon.com/organizations/latest/userguide/orgs_getting-started_concepts.html#management-account">cuenta de administración de AWS</a>.</div>

La simulación de Plan de Ahorro le permite estimar el impacto de un nuevo Plan de Ahorro en su factura antes de comprarlo. En lugar de unir exportaciones de Cost Explorer y hojas de cálculo, puede modelar un compromiso frente a su uso histórico. Los resultados muestran la cobertura, la utilización y los ahorros proyectados.

La simulación es retrospectiva. Vuelve a calcular el precio de su uso bajo demanda del período seleccionado como si el Savings Plan hubiera estado activo. Los resultados muestran lo que sus costos y ahorros _habrían sido_, no un pronóstico del uso futuro.

{{< img src="cloud_cost/planning/commitment-simulation.png" alt="Simulación de Savings Plan que muestra los parámetros de entrada, un resumen de impacto estimado con una tabla de métricas antes y después, y un gráfico de series temporales de costo simulado." style="width:100%;" >}}

### Ejecutar una simulación {#run-a-simulation}

1. Vaya a la pestaña [**Simulator**][2] en **Cloud Cost > Planning > Commitment Programs**.
2. Elija el tipo de Savings Plan y, a continuación, establezca sus preferencias de compromiso: la cuenta propietaria, el plazo y el modelo de pago.
3. Ingrese un compromiso por hora adicional y elija el período de uso para realizar la simulación, hasta los últimos 3 meses. El período predeterminado es de los últimos 30 días.
4. Revise los resultados proyectados en las secciones {{< ui >}}Estimated Impact{{< /ui >}} y {{< ui >}}Estimated Service Breakdown{{< /ui >}}.

Si [AWS Cost Optimization Hub][3] tiene una recomendación de Savings Plan para su organización, aparecerá en un aviso. El aviso muestra el compromiso por hora, el plazo y la opción de pago sugeridos. Haga clic en él para aplicar esa configuración a la simulación. Cost Optimization Hub genera estas recomendaciones solo para Compute Savings Plans.

Para recibir estas recomendaciones, asegúrese de que su rol de IAM de integración de AWS incluya los permisos `cost-optimization-hub:GetRecommendation` y `cost-optimization-hub:ListRecommendations`. Para conocer los pasos de configuración, consulte [Permisos para las recomendaciones de AWS Cost Optimization Hub][4].

### Interprete los resultados {#interpret-the-results}

Todos los resultados son estimaciones basadas en su uso durante el período seleccionado, y los ahorros reales dependen de su uso futuro. Debido a que los Savings Plans se comparten en una [Consolidated Billing Family][5], un compromiso puede aplicarse al uso en varias cuentas. Si a Datadog le faltan datos de costos para el período, el simulador marca los resultados como incompletos.

Los resultados aparecen en dos secciones:

- {{< ui >}}Estimated Impact{{< /ui >}}: Compara sus métricas clave antes y después del compromiso simulado, junto con un gráfico {{< ui >}}Simulated Cost{{< /ui >}} durante el período seleccionado.
- {{< ui >}}Estimated Service Breakdown{{< /ui >}}: Desglosa el costo estimado y la cobertura por servicio de AWS.

## Ejemplos de casos de uso {#example-use-cases}

### Identifique compromisos subutilizados {#identify-underutilized-commitments}

**Escenario**: Su tasa de ahorro efectiva (ESR) es menor de lo esperado, aunque su cobertura es alta.

**Cómo utilizar los programas de compromiso**:  
1. Vaya a {{< ui >}}Commitments Overview{{< /ui >}} y verifique la utilización KPI.
2. En {{< ui >}}Commitments inventory{{< /ui >}}, ordene por utilización en orden ascendente para identificar los compromisos menos utilizados. Para los planes de ahorro, consulte también la tabla {{< ui >}}Savings Plans with most waste{{< /ui >}} en la sección [Planes de ahorro menos utilizados](#least-used-savings-plans).
3. Reasigne las cargas de trabajo para utilizar estos compromisos de manera más efectiva, o considere modificar o vender los compromisos no utilizados si su proveedor de nube lo permite.

### Planifique los compromisos que vencen {#plan-for-expiring-commitments}

**Escenario**: Varias instancias reservadas vencen pronto y desea evitar cargos inesperados bajo demanda.

**Cómo utilizar los programas de compromiso**: 
1. En {{< ui >}}Commitments Explorer{{< /ui >}}, revise la lista de compromisos y sus fechas de vencimiento.
2. Utilice los filtros para centrarse en los compromisos que vencen pronto.
3. Planifique las renovaciones o reemplazos con antelación para mantener la cobertura y maximizar los ahorros.

### Apunte al gasto alto bajo demanda {#target-high-on-demand-spend}

**Escenario**: Sus costos de nube muestran un uso alto y constante bajo demanda para un servicio o región en particular.

**Cómo utilizar los programas de compromiso**:
1. Utilice {{< ui >}}On-demand hot-spots{{< /ui >}} para identificar qué servicios, regiones o cuentas tienen costos bajo demanda significativos y constantes.
2. Analice los patrones de uso para confirmar que son predecibles.
3. Adquiera nuevos compromisos para cubrir el uso constante y reducir los costos.

### Reduzca el desperdicio trasladando cargas de trabajo para cubrir planes de ahorro no utilizados {#reduce-waste-by-shifting-workloads-to-cover-unused-savings-plans}

**Escenario**: Usted tiene planes de ahorro subutilizados y altos costos bajo demanda ejecutándose en paralelo.

**Cómo utilizar los programas de compromiso**:
1. Utilice {{< ui >}}Least used savings plans{{< /ui >}} la sección para identificar patrones recurrentes de baja utilización; por ejemplo, capacidad constantemente no utilizada en ciertos días u horas.
2. Identifique las cargas de trabajo bajo demanda que podrían programarse durante esas ventanas de baja utilización para aprovechar la cobertura de planes de ahorro no utilizada.
3. Traslade o reprograme esas cargas de trabajo para reducir el gasto bajo demanda y mejorar la utilización de los planes de ahorro.

## Lecturas adicionales {#further-reading}
{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/cost/plan/commitment-programs
[2]: https://app.datadoghq.com/cost/plan/commitment-programs/simulator
[3]: https://docs.aws.amazon.com/cost-management/latest/userguide/cost-optimization-hub.html
[4]: /es/cloud_cost_management/setup/aws/#permissions-for-aws-cost-optimization-hub-recommendations
[5]: https://docs.aws.amazon.com/savingsplans/latest/userguide/sp-applying.html