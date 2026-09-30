---
description: Más información sobre cómo gestionar el rendimiento y el estado de tus
  programas de descuentos en la nube.
further_reading:
- link: /cloud_cost_management/
  tag: Documentación
  text: Más información sobre Cloud Cost Management
title: Programas de compromiso
---

<div class="alert alert-info">Los programas de compromiso de CCM admiten las instancias reservadas de Amazon RDS y las instancias reservadas de Amazon EC2.</div>

## Información general

Los proveedores de la nube ofrecen programas de descuentos basados en compromisos, como {{< tooltip text="Reserved Instance (RI)" tooltip="A billing discount for committing to use a specific instance configuration for a one- or three-year term." >}} y {{< tooltip text="Savings Plans" tooltip="Flexible cloud discount programs that provide lower prices in exchange for a commitment to a consistent amount of usage (measured in $/hour) over a term." >}}, para ayudarte a ahorrar en un uso previsible. La función de los Programas de compromiso de Datadog ayuda a monitorizar, optimizar y maximizar el valor de estos descuentos en todos tus entornos de la nube.

Con los Programas de Compromiso, puedes:
- Rastrear y abordar los compromisos no utilizados o subutilizados
- Dirigir el gasto elevado {{< tooltip text="on-demand" tooltip="Cloud resources billed at standard rates, without any commitment or discount program." >}} con compromisos adicionales
- Monitorizar vencimientos y renovaciones puntuales del plan

{{< img src="cloud_cost/planning/planning-commitments-overview.png" alt="Dashboard en el que se muestran filtros, indicadores clave de rendimiento (Tasa de ahorro efectiva, ahorro absoluto, cobertura, utilización), un gráfico de barras de costos en el tiempo y una tabla de zonas cubiertas bajo demanda por región, familia de instancias y motor de base de datos." style="width:100%;" >}}


## Empezando

Utiliza los Programas de compromiso para comprender y optimizar tus compromisos de la nube.

1. Ve a [**Cloud Cost > Planning > Commitment Programs**][1] (Costo en la nube > Planificación > Programas de compromiso) en Cloud Cost Management.
2. Utiliza filtros para centrarte en cuentas, regiones o servicios específicos.
3. Obtén información sobre tus indicadores clave de rendimiento, costos de compromiso y recomendaciones de renovación:
   - Revisa los KPI en la sección [Información general de compromisos](#commitments-overview).
   - Explora el [Información general de costos](#costs-overview) para analizar la utilización y la cobertura.
   - Check las fechas de vencimiento y las recomendaciones de renovación en [Explorer de compromisos](#commitment-explorer).
4. En función de esta información, realiza una acción:
   - Ajusta las cargas de trabajo para aprovechar mejor tus compromisos y evitar cargos adicionales bajo demanda.
   - Actualiza los compromisos comprándolos o cambiándolos en función de tus datos de uso.
   - Planifica las renovaciones o retira los compromisos antes de que expiren.
   - Optimiza el gasto utilizando las recomendaciones de Datadog para ahorrar más y reducir el despilfarro.

## Información general de compromisos

Revisa estos indicadores clave de rendimiento (KPI) para tus proveedores y servicios en la nube:

{{< img src="cloud_cost/planning/commitments-overview.png" alt="Dashboard en el que se resumen los KPI de compromisos en la nube, en el que se provee información general rápida del rendimiento de ahorro y se resaltan áreas que necesitan atención." style="width:100%;" >}}

- **Tasa de ahorro efectiva (TEA):** Porcentaje de ahorro de costos logrado por tus programas de descuentos en comparación con los precios bajo demanda, teniendo en cuenta los compromisos utilizados y los subutilizados.
  - _Ejemplo: Tus IR pueden ofrecer un descuento del 62 %, pero si tu TEA es solo del 45 %, los compromisos subutilizados están reduciendo sus ahorros reales._
- **Ahorro absoluto:** Importe total en dólares ahorrado al utilizar programas de compromiso frente a tarifas bajo demanda.
  - _Ejemplo: El mes pasado gastaste 10 000 dólares en servicios en la nube, pero habrías gastado 14 000 dólares con tarifas bajo demanda, por lo que tu ahorro absoluto es de 4000 dólares._
- **Cobertura:** Proporción de tu uso protegida por un programa de descuentos (como instancias reservadas, planes de ahorro o {{< tooltip text="Committed Use Contracts" tooltip="Agreements with cloud providers to use a certain amount of resources for a discounted rate over a set period." >}}).
  - _Ejemplo: Si la cobertura informática de EC2 es del 50 %, la mitad de su uso es bajo demanda. Aumentar la cobertura al 80 % podría reducir tu factura._
- **Utilización:** Cuántos de los compromisos adquiridos se utilizan realmente.
  - _Ejemplo: Si un Contrato de Uso Comprometido de GCP de 1 año solo se utiliza en un 70 %, el 30 % no se está utilizando y puede necesitar un ajuste._

## Información general de costes

En la información general de costos se resume tu gasto en programas de compromiso, lo que te ayuda a comprender a dónde van tus costos de la nube y cómo los compromisos afectan a tu gasto general. En esta sección, puedes:

{{< img src="cloud_cost/planning/commitments-rds-costs-overview.png" alt="Gráfico de barras de costos de RDS desde el 1 de marzo hasta el 31 de marzo, agrupados por tipo de costo, región y familia de instancias, con un total resaltado de 20 550 dólares." style="width:100%;" >}}

- **Mostrar cuota de RI:** Alterna la visualización de las cuotas de RI para cambiar la capacidad reservada a compromisos, lo que facilita la distinción entre el gasto bajo demanda y el basado en compromisos.
- **Agrupar por opciones:** Organiza y analiza tus costos por tipo de costo, región, familia de instancias o motor de base de datos. Identifica qué regiones o servicios generan más gastos, compara costos y señala las áreas en las que es necesario realizar compromisos adicionales o ajustes de estrategia.
- **Gasto total en compromisos:** Visualiza cuánto gastas en capacidad reservada frente a bajo demanda, lo que te ayudará a evaluar la eficacia de tu estrategia de compromisos.
- **Desglose del ahorro:** Check el ahorro conseguido con los programas de compromiso en comparación con los precios bajo demanda.
- **Detalles a nivel de servicio:** Analiza los costos por servicio, región o cuenta para identificar dónde tus programas de compromiso están proporcionando el mayor valor y dónde puede haber oportunidades para una mayor optimización.

Utiliza esta sección para tomar decisiones informadas sobre la compra, renovación o ajuste de tus compromisos para maximizar el ahorro y minimizar el despilfarro.

## Zonas cubiertas bajo demanda

Las zonas cubiertas bajo demanda resaltan las zonas con costos elevados bajo demanda, lo que puede indicar oportunidades de adquirir compromisos adicionales.

{{< img src="cloud_cost/planning/commitments-on-demand.png" alt="Tabla de zonas cubiertas bajo demanda de AWS RDS, en la que se enumeran regiones, familias de instancias y motores de base de datos con 0 % de cobertura y sus costos elevados bajo demanda asociados." style="width:100%;" >}}

- **Identificación de uso elevado bajo demanda:** Identifica rápidamente los servicios, regiones o cuentas con un gasto bajo demanda significativo.
- **Cálculo del ahorro potencial:** Consulta cuánto podrías ahorrar al convertir el uso bajo demanda a precios basados en compromisos.
- **Toma de acciones:** Ajusta las cargas de trabajo o adquiere nuevos compromisos para reducir los futuros costos bajo demanda.

## Explorer de compromisos

En Explorer de compromisos se proporciona una tabla detallada e interactiva de todos tus contratos de compromiso de la nube, como las instancias reservadas de base de datos. Explora, busca, filtra y ordena tus compromisos por atributos clave para rastrear tu inventario, monitorizar fechas de vencimiento e identificar oportunidades para optimizar el uso y el ahorro.

{{< img src="cloud_cost/planning/commitments-explorer-3.png" alt="Tabla de compromisos de instancia reservada de AWS RDS, en la que está resaltado el botón 'Columnas', un compromiso que expiró y uno que lo hará en breve." style="width:100%;" >}}

- Personaliza la vista de tabla para mostrar u ocultar columnas y centrarte en la información más relevante.
- En la tabla se resaltan los compromisos que han expirado recientemente o que lo harán en breve, lo que te ayudará a planificar las renovaciones y evitar pagar precios bajo demanda.

Las columnas que se muestran en Explorer de compromisos varían en función del producto (por ejemplo, Amazon RDS o EC2) y del programa de compromisos específico. Estas son las columnas disponibles:

| Columna | Descripción | Producto |
|---|---|---|
| ARN de reserva | Nombre único de recurso de Amazon (ARN) que identifica el compromiso de instancia reservada. | Todos |
| Modelo de pago | Opción de pago para la instancia reservada (por ejemplo, Sin pago inicial, Pago inicial parcial, Pago inicial total). | Todos |
| Plazo | Duración del compromiso de la instancia reservada (por ejemplo, 1 año, 3 años). | Todos |
| Región | Región de AWS en la que se aplica la instancia reservada. | Todas |
| Tipo de instancia | Tipo y tamaño de la instancia cubierta por el compromiso (por ejemplo, `db.r6g.large` para RDS o `m5.large` para EC2). | Todos |
| Fecha de inicio | Fecha en la que comienza el plazo de vigencia de la Instancia Reservada. | Todas |
| Fecha de finalización | Fecha en la que finaliza el plazo de la Instancia Reservada. | Todas |
| Número de instancias | Número de instancias cubiertas por la instancia reservada. | Todos |
| Número de NFU | Número de unidades del factor de normalización (NFU) cubiertas, que normaliza los tamaños de las instancias para su comparación. | Todos |
| Utilización | Porcentaje de la instancia reservada utilizado durante el periodo seleccionado. | Todos |
| Motor de base de datos | Motor de base de datos utilizado por la instancia (como PostgreSQL, MySQL, SQL Server). | Amazon RDS |
| Multi-AZ | Indica si la instancia reservada cubre un despliegue de varias zonas de disponibilidad (Sí/No). | Amazon RDS |
| Sistema operativo | Sistema operativo de la instancia (como Linux o Windows). | Amazon EC2 |
| Clase de oferta | Clase de instancia reservada (estándar o convertible). | Amazon EC2 |
| AZ | Zona de disponibilidad específica en la que se halla la instancia reservada. | Amazon EC2 |

## Ejemplos de uso

### Identificar los compromisos subutilizados

**Escenario**: Tu Tasa de Ahorro Efectivo (TEA) es inferior a la esperada, aunque tu cobertura sea elevada.

**Cómo utilizar los programas de compromiso**:  
1. Ve a **Commitment Overview** (Información general de compromisos) y check el KPI de utilización.
2. Filtra por cuenta, región o familia de instancias para saber qué compromisos están subutilizados.
3. Reasigna las cargas de trabajo para utilizar estos compromisos de forma más eficaz o considere la posibilidad de modificar o vender los compromisos no utilizados si tu proveedor de la nube lo permite.

### Planificar los compromisos que expiran

**Escenario**: Varias instancias reservadas van a caducar el mes que viene y quieres evitar cargos inesperados bajo demanda.

**Cómo utilizar los programas de compromiso**: 
1. En **Commitment Explorer** (Explorer de compromisos), revisa la lista de compromisos y sus fechas de caducidad.
2. Utiliza los filtros para centrarte en los compromisos que expirarán pronto.
3. Planifica las renovaciones o sustituciones con antelación para mantener la cobertura y maximizar el ahorro.

### Dirigirse a los gastos bajo demanda elevados

**Escenario**: Tu factura de la nube muestra un uso bajo demanda elevado y constante para un servicio o región concretos.

**Cómo utilizar los programas de compromiso**:
1. Utiliza **On-Demand Hot-Spots** (Zonas cubiertas a demanda) para identificar qué servicios, regiones o cuentas tienen costos bajo demanda significativos y constantes.
2. Analiza los patrones de uso para confirmar que sean previsibles.
3. Adquiriere nuevos compromisos para cubrir el uso constante y reducir costos.

## Referencias adicionales
{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/cost/plan/commitment-programs