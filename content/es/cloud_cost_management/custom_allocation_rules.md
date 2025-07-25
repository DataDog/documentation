---
description: Asigna costes de nube basados en reglas de asignación personalizadas.
further_reading:
- link: https://docs.datadoghq.com/cloud_cost_management/?tab=aws#overview
  tag: Documentación
  text: Cloud Cost Management
- link: https://www.datadoghq.com/blog/finops-at-datadog/
  tag: Blog
  text: Cómo hemos creado una práctica de FinOps exitosa en Datadog
title: Reglas de asignación personalizadas
---

## Información general

Las reglas de asignación personalizadas te permiten dividir y asignar los costes compartidos a cualquier etiqueta disponible, como equipos, proyectos o entornos, lo que facilita la devolución y el reembolso precisos.

Existen los siguientes métodos de asignación:

 | Método de asignación | Descripción | Caso de uso | Ejemplo |
 | ----------------  | ----------- | -------- | --------|
 | Equitativa  | Divide los gastos equitativamente entre todos los destinos. | Escenarios en los que cada equipo, proyecto o entorno debe pagar la misma cantidad por un coste compartido. | Los costes de respaldo no etiquetados se asignan por igual a los equipos `teamA`, `teamB` y `teamC`. |
 | Personalizado  | Divide los costes en cada destino en función de los porcentajes que definas. | Escenarios en los que las normas o acuerdos empresariales dictan cuánto debe pagar cada equipo. | Los costes de respaldo no etiquetados se asignan en un 60 % a `teamA`, en un 30 % a `teamB` y en un 10 % a `teamC`. |
 | Proporcional a los gastos | Divide los costes en función de la cuota de gasto total de cada destino. | Escenarios en los que los equipos deberían pagar en proporción a su gasto real. | Los costes de respaldo no etiquetados se asignan a equipos `teamA` , `teamB` y `teamC` en función de su proporción del gasto total en Amazon EC2.|
 | Dinámica por métrica  | Divide los costes en función de la cuota de uso total de cada destino. | Escenarios en los que los equipos deberían pagar en proporción a su uso real. | Los costes compartidos de PostgreSQL se asignan por tiempo total de ejecución de consultas por equipo. |

Las reglas de asignación personalizadas se ejecutan después de [Tag Pipelines][1], lo que permite asignar costes a las últimas etiquetas definidas por el usuario. Los costes se asignan diariamente. Las asignaciones de costes pueden aplicarse a los costes de AWS, Google Cloud y Azure.

## Crear una regla de asignación personalizada

### Paso 1: Definir la fuente

1. Ve a [Cloud Cost > Settings > Custom Allocation Rules][2] (Coste en la nube > Configuración > Reglas de asignación personalizadas) y haz clic en **Add New Rule** (Añadir nueva regla) para empezar.
2. En el menú desplegable, selecciona los costes compartidos que deseas asignar.

   _Ejemplo: costes de respaldo no etiquetados, costes de base de datos compartida._

### Paso 2: Elegir un método de asignación

A continuación, se describe el funcionamiento de cada método de asignación con ejemplos.

{{< tabs >}}

{{% tab "Even" %}}

{{< img src="cloud_cost/custom_allocation_rules/even_diagram.png" alt="Diagrama que muestra la estrategia de división equitativa" style="width:70%;" >}}

Con la estrategia equitativa, los costes se asignan uniformemente a las etiquetas de destino. [Aplica un filtro](#step-4---optional-apply-filters) para precisar qué parte de la factura determina las proporciones.

{{< img src="cloud_cost/custom_allocation_rules/ui-even.png" alt="La estrategia de división equitativa como se ve en Datadog" style="width:90%;" >}}

{{% /tab %}}

{{% tab "Custom percentage" %}}

{{< img src="cloud_cost/custom_allocation_rules/custom_percentage_diagram.png" alt="Diagrama que muestra la estrategia de división equitativa" style="width:70%;" >}}

Con la estrategia de porcentaje personalizado, puedes definir porcentajes personalizados estáticos para las etiquetas de destino que selecciones. Por ejemplo, si tienes 3 destinos (`teamA`, `teamB`, `teamC`) puedes asignar el 60 % a `teamA`, el 30 % a `teamB` y el 10 % a `teamC`.

{{< img src="cloud_cost/custom_allocation_rules/ui-custom.png" alt="La estrategia de división equitativa como se ve en Datadog" style="width:90%;" >}}

{{% /tab %}}

{{% tab "Proportional" %}}

{{< img src="cloud_cost/custom_allocation_rules/proportional_diagram-2.png" alt="Diagrama que muestra la estrategia de división proporcional" style="width:70%;" >}}

Los costes se asignan en función del gasto proporcional de los valores de destino. De forma similar a la asignación equitativa, puedes personalizar aún más la asignación estableciendo filtros y particiones.

En el diagrama anterior, la barra rosa representa un filtro en la asignación de costes. Con este filtro aplicado, las tarifas de soporte de EC2 se dividen entre equipos _en función de la cuota de cada equipo en el gasto total de EC2_.

Para crear una regla para esta asignación, puedes:

- Definir los costes a asignar (fuente): **tarifas de apoyo a EC2** (`aws_product:support`).
- Elige el método de asignación: **Proporcional por gastos**.
- Elige la [etiqueta de destino](#step-3---define-the-destination) para dividir los costos por: **Usuario** (`User A`, `User B`, `User C`).
- Ajusta la asignación aplicando [filtros](##step-4---optional-apply-filters): **EC2** (`aws_product:ec2`).
- Crea subasignaciones [al particionar](#step-5---optional-apply-a-partition) la regla de asignación: **entorno** (`env`).

También puedes especificar cómo deben dividirse las proporciones de costes para garantizar asignaciones específicas por segmento. Por ejemplo, si particionas tus costes por entorno utilizando etiquetas como `staging` y `production`, las proporciones se calculan por separado para cada entorno. Esto garantiza que las asignaciones se basan en las proporciones específicas dentro de cada partición.

{{< img src="cloud_cost/custom_allocation_rules/ui-proportional-by-spend.png" alt="La estrategia de división proporcional como se ve en Datadog" style="width:90%;" >}}

{{% /tab %}}

{{% tab "Dynamic by metric" %}}

{{< img src="cloud_cost/custom_allocation_rules/dynamic_diagram.png" alt="Diagrama que muestra la estrategia dinámica por métrica" style="width:70%;" >}}

La asignación basada en métricas ofrece la posibilidad de dividir los gastos en función de las [consultas de métricas][1] de Datadog. Mediante el uso de métricas de rendimiento para asignar gastos, puedes asignar los costes con mayor precisión en función de los patrones de uso de la aplicación.

Por ejemplo, esta consulta de métricas de PostgreSQL `sum:postgresql.queries.time{*} by {user}.as_count()` rastrea el tiempo total de ejecución de consultas por usuario. Los valores relativos se utilizan para determinar qué proporción de los costes totales de PostgreSQL debe asignarse a cada usuario.

Para crear una regla para esta asignación, podrías:

- Definir los costes a asignar (fuente): **Costes de PostGreSQL** (`azure_product_family:dbforpostgresql`).
- Elige el método de asignación: **Dinámica por métrica**
- Elige la [etiqueta de destino](#step-3---define-the-destination) para dividir los costos por: **Usuario** (`User A`, `User B`, `User C`).
- Ajusta la asignación aplicando [filtros](##step-4---optional-apply-filters): **EC2** (`aws_product:ec2`).
- Define la consulta de métrica utilizada para dividir los costes fuente: **Tiempo de ejecución de la consulta por usuario** (`sum:postgresql.queries.time{*}` por `{user}.as_count`).
- Crea subasignaciones [al particionar](#step-5---optional-apply-a-partition) la regla de asignación: **entorno** (`env`).

{{< img src="cloud_cost/custom_allocation_rules/ui-dynamic-by-metric.png" alt="La métrica de división dinámica por métrica como se ve en Datadog" style="width:90%;" >}}

[1]: /es/metrics/#querying-metrics

{{% /tab %}}

{{< /tabs >}}

### Paso 3: Definir el destino

Decide qué dimensiones, como `team`, `department` o `service`, reciben los costes asignados. Por ejemplo:

Puedes seleccionar varios valores para tu etiqueta de destino. Por ejemplo, si seleccionas la etiqueta `team`, puedes elegir equipos específicos como `teamA`, `teamB` y `teamC` para recibir los costes asignados.

### Paso 4: (opcional) Aplicar filtros

Aplica un filtro a toda la regla de asignación. Los filtros te ayudan a dirigir la regla de asignación al subconjunto pertinente de tus gastos en nube.

_Ejemplo: Sólo se aplica la asignación de costes cuando el entorno es de producción._

- **Proporcional al gasto**: supongamos que asignas costes compartidos a la etiqueta de equipo, proporcionales a cuánto gasta cada equipo. Puedes añadir un filtro, creando una asignación de costes que sea proporcional a cuánto gasta el equipo en `aws_product` es `ec2`.
- **Dinámica por métrica**: digamos que asignas costes de PostgreSQL compartidos a la etiqueta de servicio, proporcional al tiempo de ejecución de consulta de cada servicio. Puedes añadir un filtro, creando una asignación de costes que sólo se aplique cuando `environment` sea `production`.

### Paso 5: (opcional) Aplicar una partición

La partición permite dividir una única regla de asignación en varias subasignaciones. Por ejemplo, en lugar de crear reglas separadas para cada entorno (como producción y preparación), puedes crear una regla dividida por `environment`. Cada subasignación particionada utiliza la misma estructura de asignación, pero sólo se aplica a los costes que coinciden con ese valor de etiqueta.

**Nota**: Para Dinámica por métrica, la etiqueta que selecciones para particionar debe existir tanto en los datos de costes como en los de métricas de la nube.

{{< tabs >}}

{{% tab "Even allocation" %}}

Con esta partición, se aplica la misma regla de asignación equitativa a cada entorno.

{{< img src="cloud_cost/custom_allocation_rules/even_partition_diagram.png" alt="Diagrama que muestra la estrategia de división equitativa con particinado" style="width:100%;" >}}

{{% /tab %}}

{{% tab "Proportional allocation" %}}

Con esta partición, se aplica la misma regla de asignación proporcional a cada entorno.

{{< img src="cloud_cost/custom_allocation_rules/proportional_partition_diagram-2.png" alt="Diagrama que muestra la estrategia de división proporcional con particionado" style="width:100%;" >}}

{{% /tab %}}

{{% tab "Dynamic by metric allocation" %}}

Con esta partición, se aplica la misma regla de asignación dinámica por métrica a cada entorno.

{{< img src="cloud_cost/custom_allocation_rules/dynamic_partition_diagram.png" alt="Diagrama que muestra la estrategia de división dinámica con particionado" style="width:100%;" >}}

{{% /tab %}}

{{< /tabs >}}

## Gestión de reglas
Las reglas pueden modificarse y eliminarse en la [sección Reglas de asignación personalizadas][2] de la página de configuración de Cloud Cost (Coste en la nube). Todos los campos excepto el nombre de la regla pueden reconfigurarse.

Cuando eliminas una regla de asignación personalizada, la asignación asociada se elimina automáticamente de los datos del mes en curso y del mes anterior en un plazo de 24 horas. Para eliminar asignaciones de datos más antiguos, ponte en contacto con el [soporte de Datadog][3] para solicitar un relleno.

También puedes desactivar una regla de asignación personalizada sin eliminarla.

Las reglas se aplican en el mismo orden que se muestra en la lista.

## Visualizar tus asignaciones
Los cambios en las reglas de asignación personalizadas pueden tardar hasta 24 horas en aplicarse. Una vez aplicados, las nuevas asignaciones pueden verse a través de Cloud Cost Management en todos los costes en los que la asignación de contenedores esté establecida en `enabled`. Los costes con asignación personalizada también incluyen una etiqueta `allocated_by_rule`, que indica el nombre de la regla que aplicó la asignación.

{{< img src="cloud_cost/custom_allocation_rules/visualize_your_allocations-1.png" alt="Ve tus asignaciones mediante Datadog" style="width:90%;" >}}

## Referencias adicionales
{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/cloud_cost_management/tag_pipelines
[2]: https://app.datadoghq.com/cost/settings/custom-allocation-rules
[3]: https://www.datadoghq.com/support/