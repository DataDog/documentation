---
aliases:
- /es/integrations/awsbilling/
- /es/cloud_cost_management/aws/
further_reading:
- link: /cloud_cost_management/
  tag: Documentación
  text: Cloud Cost Management
- link: /cloud_cost_management/azure
  tag: Documentación
  text: Obtener información sobre tu factura de Azure
- link: /gestión_de_costes_en_la_nube/google_cloud
  tag: Documentación
  text: Obtener información sobre tu factura de Google Cloud
- link: /cloud_cost_management/oracle
  tag: Documentación
  text: Obtener información sobre tu factura de Oracle
title: AWS
---


## Información general

Para configurar Cloud Cost Management en Datadog, necesitas:
1. Una cuenta de AWS con acceso a facturación
2. La integración AWS instalada en Datadog
3. Un informe de costes y uso (sigue los pasos que se indican a continuación para crear uno)

## Configuración

### Configuración de la integración AWS

Ve a [Instalación y configuración][7] y selecciona una cuenta de AWS del menú desplegable para extraer los costes.

**Nota**: Datadog recomienda configurar un informe de costes y uso desde una [**cuenta de gestión** de AWS][2] para una visibilidad de los costes en las **cuentas de miembros** relacionadas. 

Si envías un informe de costes y uso desde una **cuenta de miembro** de AWS, asegúrate de haber seleccionado las siguientes opciones en las **[preferencias][3] de tu **cuenta de gestión**:
- **Acceso a cuenta vinculada**
- **Reembolsos y créditos en una cuenta vinculada**
- **Descuentos en una cuenta vinculada**

Estos ajustes garantizan una precisión total de los costes al permitir cálculos periódicos de los costes con respecto al AWS Cost Explorer.

{{< tabs >}}

{{% tab "CloudFormation" %}}

{{< img src="cloud_cost/setup/aws_cloudformation_setup.jpg" alt="Formulario de configuración de Cloud Cost Management en modo CloudFormation" style="width:100%" >}}

### Seleccionar los recursos a crear

El stack tecnológico de CloudFormation puede configurarse de tres maneras en función de los recursos AWS existentes:

* **Nueva configuración**: Selecciona **Create Cost and Usage Report** (Crear informe de costes y uso) para crear el informe y su bucket de S3.
* **Bucket existente**: Selecciona **Create Cost and Usage Report** (Crear informe de costes y uso) y anula la selección de **Create S3 Bucket** (Crear bucket de S3) para utilizar un bucket de S3 existente.
* **Informe existente**: Desmarca **Create Cost and Usage Report** (Crear informe de costes y uso) para importar un informe de costes y uso existente.

### Configurar las opciones del informe de costes y uso

Introduce los siguientes datos para tu informe de costes y uso:

* **Nombre del bucket**: El nombre del bucket de S3 donde se almacenan los archivos del informe.
* **Región del bucket**: El [código de región][100] AWS de la región que contiene tu bucket de S3. Por ejemplo, `us-east-1`.
* **Prefijo de la ruta de exportación**: El prefijo de ruta S3 donde se almacenan los archivos del informe.
* **Nombre de exportación**: El nombre de tu informe de costes y uso.

**Nota**:
- Estos valores localizan tu informe de costes y uso existente o definen la configuración de los recursos recientemente creados.
- Pueden pasar entre 48 y 72 horas hasta que todos los datos disponibles se completen en tu organización Datadog después de que se genere un informe de costes y uso completo. Si han pasado 72 horas y los datos aún no se han completado, ponte en contacto con el [servicio de asistencia de Datadog][18].

[100]: https://docs.aws.amazon.com/global-infrastructure/latest/regions/aws-regions.html

{{% /tab %}}

{{% tab "Manual" %}}

{{< img src="cloud_cost/setup/aws_manual_setup.jpg" alt="Formulario de configuración de Cloud Cost Management en modo manual" style="width:100%" >}}

### Requisito previo: generar un Informe de costes y uso

[Crear un informe de costes y uso legacy][201] en AWS en la sección **Data Exports** (Exportación de datos).

Selecciona el tipo de exportación **Exportación de informes de costes y uso (CUR) legacy**.

Selecciona las siguientes opciones de contenido:

* Tipo de exportación: **Exportación de CUR legacy**
* **Incluir ID de recursos**
* **Dividir datos de asignación de costes** (Activa la asignación de costes de ECS. También debes optar por la [asignación de costes divididos de AWS][210] en las preferencias del Cost Explorer.
* **"Actualizar automáticamente"**

Selecciona las siguientes opciones de entrega:

* Granularidad temporal: **Cada hora**
* Versiones de informes: **Crear nueva versión de informe**
* Tipo de compresión: **GZIP** o **Parquet**

### Localizar el Informe de costes y uso

Si has salido del informe creado en la sección de requisitos previos, sigue la documentación de AWS para [ver tus exportaciones de datos][204]. Selecciona la exportación de CUR legacy creada y luego selecciona **Edit** (Editar) para ver los detalles de la exportación.

Para que Datadog pueda localizar el Informe de costes y uso, rellena los campos con los datos correspondientes:

* **Nombre del bucket**: Es el nombre del **bucket de S3** en la sección de parámetros de almacenamiento de Exportación de datos.
* **Región del bucket**: Es la región en la que se encuentra tu bucket. Por ejemplo, `us-east-1`.
* **Prefijo de la ruta de exportación**: Es el **prefijo de la ruta S3** en la sección de parámetros de almacenamiento de Exportación de datos.
* **Nombre de la exportación**: Es el **Nombre de la exportación** en la sección Nombre de la exportación.

**Nota**: Datadog solo admite CUR legacy generados por AWS. No modifiques ni mueva los archivos generados por AWS, ni intentes proporcionar acceso a archivos generados por terceros.

{{< site-region region="gov" >}}
<div class="alert alert-danger">El endpoint Informes de costes y uso de AWS se utiliza para validar los campos anteriores con respecto a la exportación de CUR en tu bucket de S3. Este endpoint no está validado por FIPS.</div>
{{< /site-region >}}

### Configurar el acceso al Informe de costes y uso

[Crea una política][205] en AWS para asegurarte de que Datadog tiene permisos para acceder al CUR y al bucket de S3 en el que está almacenado. Utiliza el siguiente JSON:

{{< code-block lang="yaml" collapsible="true" >}}
{
  "Version": "2012-10-17",
  "Statement": [
      {
          "Sid": "DDCloudCostReadBucket",
          "Effect": "Allow",
          "Action": [
              "s3:ListBucket"
          ],
          "Resource": "arn:aws:s3:::BUCKETNAME"
      },
      {
          "Sid": "DDCloudCostGetBill",
          "Effect": "Allow",
          "Action": [
              "s3:GetObject"
          ],
          "Resource": "arn:aws:s3:::BUCKETNAME/REPORT_PREFIX/REPORT_NAME/*"
      },
      {
          "Sid": "DDCloudCostCheckAccuracy",
          "Effect": "Allow",
          "Action": [
              "ce:Get*"
          ],
          "Resource": "*"
      },
      {
          "Sid": "DDCloudCostListCURs",
          "Action": [
              "cur:DescribeReportDefinitions"
          ],
          "Effect": "Allow",
          "Resource": "*"
      },
      {
          "Sid": "DDCloudCostListOrganizations",
          "Action": [
              "organizations:Describe*",
              "organizations:List*"
          ],
          "Effect": "Allow",
          "Resource": "*"
      }
  ]
}
{{< /code-block >}}

**Nota**: Anota el nombre creado para esta política para los próximos pasos.

### Adjuntar la política al rol de la integración Datadog

Adjunte la nueva política S3 al rol de la integración Datadog.

1. Ve a **Roles** en la consola IAM en AWS.
2. Localiza el rol utilizado por la integración Datadog. Por defecto se llama **DatadogIntegrationRole**, pero el nombre puede variar si tu organización le ha cambiado el nombre. Haz clic en el nombre del rol para abrir la página de resumen del rol.
3. Haz clic en **Attach policies** (Adjuntar políticas).
4. Introduce el nombre de la política para buckets de S3 creada anteriormente.
5. Haz clic en **Attach policy** (Adjuntar política).

Pueden pasar entre 48 y 72 horas hasta que todos los datos disponibles se completen en tu organización Datadog después de que se genere un informe de costes y uso completo. Si han pasado 72 horas y los datos aún no se han completado, ponte en contacto con el [servicio de asistencia de Datadog][18].

[201]: https://docs.aws.amazon.com/cur/latest/userguide/dataexports-create-legacy.html
[204]: https://docs.aws.amazon.com/cur/latest/userguide/dataexports-view.html
[205]: https://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies_create-console.html
[210]: https://docs.aws.amazon.com/cur/latest/userguide/enabling-split-cost-allocation-data.html

{{% /tab %}}

{{< /tabs >}}

### Filtrado de cuentas

Utiliza el filtrado de cuentas para controlar qué cuentas de miembros de AWS se incluyen en Cloud Cost Management. El filtrado de cuentas no incurre en costes adicionales en Datadog.

Para utilizar el filtrado de cuentas es necesario disponer de una cuenta de gestión de AWS. Puedes configurar filtros de cuenta después de haber configurado una cuenta en Cloud Cost Management.

**Nota:** Los filtros de cuenta no son compatibles con la búsqueda de recomendaciones o etiquetas (tags).

#### Configurar filtros de cuenta para una cuenta existente

Ve a [**Cloud Cost** > **Settings** (Cloud Cost > Parámetros)][17], selecciona **Accounts** (Cuentas) y haz clic en **Manage Account** (Gestionar cuenta) para la cuenta de gestión que quieres filtrar.

{{< img src="cloud_cost/account_filtering/manage_account.png" alt="Botón Manage Account (Gestionar cuenta) en la tarjeta de la cuenta" style="width:100%;" >}}

Haz clic en **Billing dataset** (Conjunto de datos de facturación) para acceder a la interfaz de usuario de filtrado de cuentas.

{{< img src="cloud_cost/account_filtering/account_filtering.png" alt="Interfaz de usuario de filtrado de cuentas para filtrar cuentas de miembros de AWS" style="width:100%;" >}}

### Obtener datos históricos

Si configuras un informe de costes y uso que ya tiene datos históricos disponibles en S3, Datadog ingiere automáticamente hasta 15 meses de datos de costes históricos.

Si tu informe recién configurado no tiene datos históricos, puedes solicitar un relleno de datos a AWS:

Para solicitar un relleno de los datos históricos de costes de AWS:

1. [Abre un caso de asistencia de AWS][20] y solicita un relleno de tus datos de costes.
2. Incluye en tu solicitud el **nombre del informe** y el **periodo de facturación deseado**.
3. Espera a que AWS procese la solicitud de relleno.

Cuando AWS rellena los datos, Datadog los incorpora automáticamente en un plazo de 24 horas.

AWS no puede rellenar datos de costes anteriores a tu cuenta AWS o que reflejen una estructura organizacional de AWS anterior.

Para obtener más información, consulta la [guía para solucionar problemas de informes de costes y uso][20].

## Tipos de costes

Visualiza tus datos ingestados utilizando tipos de costes predefinidos. Los tipos de costes difieren principalmente en la manera cómo informan sobre las tasas de descuento, los planes de ahorro y las reservas.

### Bajo demanda
**Los costes a la carta** representan el coste de uso a la tarifa pública a la carta publicada por AWS. Esto excluye todos los planes de ahorro, reservas, descuentos, impuestos y tasas.

**Nota**: En la mayoría de los casos, los costes a la carta no son una fuente fiable para estimar costes reales.

### Costes amortizados y no combinados
Las métricas de costes **amortizados** distribuyen los compromiso de ahorro a lo largo del periodo de descuento. Esto también se denomina _base devengada_. Las reservas y los planes de ahorro se detraen de un compromiso mensual y se aplican directamente al uso cubierto, en el momento del uso. Cualquier remanente no utilizado aparece como una cuota.

Por el contrario, las métricas de costes **no combinados** muestra todos los gastos en la fecha en que se producen. Esto también se denomina _base de coste_. Las cuotas de reserva y de planes de ahorro aparecen en la fecha en que se cobraron y no se aplican directamente al uso cubierto. Una vez que se cierra la facturación correspondiente a un mes, las métricas sin combinar coinciden exactamente con la factura de AWS.

### Costes netos
Los costes **netos** aplican descuentos privados directamente al uso. El coste de uso de un recurso específico representa el coste efectivo una vez aplicados todos los ahorros.

En cambio, otras métricas muestran los descuentos privados como partidas separadas de valor negativo sin etiquetas de asignación de recursos. En lugar de aplicar los descuentos directamente al uso, estas métricas restan los descuentos del coste total.

Los costes **netos amortizados** ofrecen la representación más exacta de la asignación de costes, con todos los ahorros aplicados directamente al uso. Las métricas de coste neto están disponibles si tu cuenta de AWS tiene descuentos de empresa negociados de forma privada. Si tu cuenta no tiene descuentos de empresa, el coste **neto amortizado** y el coste **amortizado** son equivalentes.

### Asignación de contenedor
Las métricas de **asignación de contenedor** contienen los mismos costes que las métricas de AWS, pero con desgloses e información adicional de las cargas de trabajo de contenedor. Para obtener más información, consulta la [asignación de costes de contenedor][11].

### Ejemplo
El siguiente escenario muestra cómo se comportan los distintos tipos de costes. Imagina que tienes:
- Una instancia de EC2 funcionando durante una hora con un coste de 3 USD por hora de cálculo.
- Un plan de ahorro que fija el precio de este tipo de instancia en 2 USD por hora de cálculo.
- Un descuento por procesamiento electrónico de datos (EDP) negociado del 10%, además de todos los demás descuentos.

A continuación se muestra cómo aparecen el coste de la instancia, el compromiso por hora del plan de ahorro y el descuento en cada tipo de coste:

|Tipo de coste |Utilización |Plan de ahorro |Descuento | Explicación |
|:---------|-|-|-|:------------------------------------------------|
|A la carta |3.00 USD|||Esta es la tarifa pública a la carta.|
|Sin combinar |3.00 USD|2.00 USD|-0.20 USD|La cuota recurrente del plan de ahorro y el descuento por EDP son partidas separadas, no asociados a un recurso específico. (**Nota:** El coste del recurso de 3 USD se compensa con `SavingsPlanNegation`.) |
|Neto sin combinar||1.80 USD||La cuota recurrente del plan de ahorro aparece como una partida con el descuento aplicado y el coste no está asociado a un recurso específico.|
|Amortizado |2.00 USD||-0.20 USD|El descuento del plan de ahorro se aplica directamente al coste del recurso. El descuento por EDP es una partida separada. |
|Neto amortizado |1.80 USD|||Los descuentos del plan de ahorro y por EDP se aplican directamente al coste de los recursos. |
|Neto amortizado - Recursos compartidos asignados |1.80 USD|||El mismo coste que el Neto amortizado, pero este coste puede desglosarse aún más por dimensiones Kubernetes y etiquetas de pods. |

### Resumen de métricas de costes

En general:
- `aws.cost.net.amortized.shared.resources.allocated` proporciona la asignación de costes más completa para cargas de trabajo y equipos específicos.
- Si no dispones de una asignación de costes de contenedor, utiliza `aws.cost.net.amortized`.
- Si no dispones de costes netos amortizados, utiliza `aws.cost.amortized.shared.resources.allocated` o `aws.cost.amortized`.

| Métrica               | Descripción           |
| -------------------- | --------------------- |
| `aws.cost.net.amortized.shared.resources.allocated` | Todos tus costes netos amortizados de AWS, con desgloses e información adicional de las cargas de trabajo de contenedor. Requiere la [asignación de costes de contenedor][11].|
| `aws.cost.net.amortized` | Costes amortizados netos, sin desgloses de costes de contenedor. |
| `aws.cost.net.unblended` | Costes netos sin combinar, sin desgloses de costes de contenedor. Coincide con la factura de AWS, con descuentos especializados precalculados dentro de los costes de uso. |
| `aws.cost.amortized.shared.resources.allocated` | Todos tus costes amortizados de AWS, con desgloses e información adicional de las cargas de trabajo de contenedor. Requiere la [asignación de costes de contenedor][11].|
| `aws.cost.amortized` | Costes amortizados, sin desgloses de costes de contenedor. |
| `aws.cost.unblended` | Costes sin combinar, sin desgloses de costes de contenedor. Coincide con la factura de AWS. |
| `aws.cost.ondemand`  | Costes basados en la tarifa de lista proporcionada por AWS, excluidos todos los planes de ahorro, reservas, descuentos, impuestos y cuotas. |

## Cómo Datadog enriquece tus datos de costes de AWS con etiquetas

Datadog enriquece automáticamente tus datos de costes de AWS con etiquetas procedentes de diversas fuentes. Para obtener información general de cómo se aplican las etiquetas a los datos de costes, consulta [Etiquetas][19].

Las siguientes fuentes de etiquetas están disponibles para AWS:

- Columnas del Informe de costes y uso
- Etiquetas de recursos de AWS
- Etiquetas de cuentas de AWS
- Etiquetas de integraciones de AWS
- Etiquetas predefinidas
- Etiquetas de cargas de trabajo de contenedor
- Etiquetado de pipelines

### Columnas del Informe de costes y uso

Todas las columnas con valor de cadena del [Informe de costes y uso (CUR)][6] de AWS se añaden como etiquetas en las métricas de coste.

Para garantizar la coherencia, Datadog normaliza las claves de las etiquetas utilizando guiones bajos y minúsculas. Por ejemplo, la columna CUR `lineItem/ResourceId` corresponde a la clave de etiqueta `line_item/resource_id`. Por lo general, los valores de las etiquetas no se modifican y se mantienen las mayúsculas y minúsculas exactas, así como la mayoría de los caracteres especiales.

**Ejemplos:**

|Columna de CUR|Valor del CUR|Etiqueta de costes de nube|
|---|---|---|
|lineItem/ResourceId|i-12345678a9b12cd3e|line_item/resource_id:i-12345678a9b12cd3e|
|product/region|us-east-1|product/region:us-east-1|
|product/usagetype|DataTransfer-Regional-Bytes|product/usagetype:DataTransfer-Regional-Bytes|

### Etiquetas de recursos de AWS

Las [etiquetas de recursos AWS][12] son etiquetas definidas por el usuario que aparecen en la consola AWS cuando se visualiza un recurso concreto, como una instancia EC2 o un bucket de S3.

Cuando se habilita la integración AWS en Datadog, Datadog recopila automáticamente las etiquetas de recursos de la mayoría de los recursos AWS. Estas etiquetas se aplican a todos los costes de un recurso determinado encontrados en el CUR. Las etiquetas de recursos se recuperan de forma regular y se aplican a los datos de costes a partir del día en que se crean o modifican. Los valores históricos de las etiquetas no se sobrescriben cuando se cambian las etiquetas.

Si la integración AWS no está habilitada, puedes habilitar el enriquecimiento de etiquetas de recursos activando las [etiquetas de asignación de costes][13] en la facturación de AWS. Esto te permite seleccionar un subconjunto de claves de etiquetas de recursos para incluirlas como columnas en el CUR de AWS. Datadog incluye automáticamente esas columnas como etiquetas cuando procesa el CUR.

### Etiquetas de cuentas y organizaciones AWS
Las organizaciones AWS admiten [etiquetas definidas por el usuario][14] en unidades organizativas y en cuentas. Datadog obtiene y aplica automáticamente estas etiquetas a los datos de costes. Las etiquetas de cuentas se aplican a todos los usos asociados a esas cuentas. Las etiquetas de organizaciones se aplican a todos los datos de facturación de la cuenta del pagador correspondiente.

_Requiere la integración AWS Datadog en la cuenta de la organización._

### Etiquetas de integraciones AWS

Las etiquetas de la integración AWS se definen en el cuadro de la integración AWS en la página de integraciones en Datadog. Se aplican a todos los costes que se encuentran en el CUR de la cuenta de AWS asociada.

### Etiquetas predefinidas
Datadog añade etiquetas predefinidas a los datos de costes ingeridos para ayudarte a desglosar y asignar mejor tus costes. Estas etiquetas se derivan de tu [informe de costes y uso (CUR)][6] y facilitan la detección y la comprensión de los datos de costes.

Las siguientes etiquetas predefinidas están disponibles para filtrar y agrupar datos:

| Etiqueta                          | Descripción       |
| ---------------------------- | ----------------- |
| `aws_product`                | El servicio AWS que se está facturando.|
| `aws_product_family`         | La categoría de servicio AWS que se está facturando (por ejemplo, Cálculo o Almacenamiento).|
| `aws_management_account_name`| El nombre de la cuenta de gestión AWS asociada a la partida.|
| `aws_management_account_id`  | El ID de la cuenta de gestión AWS asociada a la partida.|
| `aws_member_account_name`    | El nombre de la cuenta de miembro de AWS asociada a la partida.|
| `aws_member_account_id`      | El ID de la cuenta de miembro de AWS asociado a la partida.|
| `aws_cost_type`              | El tipo de cargo cubierto por esta partida (por ejemplo, Uso o Impuesto).|
| `aws_pricing_term`           | Si el uso es Reservado, Puntual o A la carta.|
| `aws_reservation_arn`        | El ARN de la instancia reservada de la que se benefició la partida.|
| `aws_savings_plan_arn`       | El ARN del Plan de ahorro del que se benefició la partida.|
| `aws_usage_type`             | Los detalles de uso de la partida (por ejemplo, BoxUsage:i3.8xlarge).|
| `aws_operation`              | La operación asociada a la partida (por ejemplo, RunInstances).|
| `aws_region`                 | La región asociada a la partida (por ejemplo, us-east-1).|
| `aws_availability_zone`      | Zona de disponibilidad asociada a la partida.|
| `aws_resource_id`            | El ID del recurso asociado a la partida.|
| `aws_instance_type`          | Tipo de instancia de la partida.|
| `aws_instance_family`        | La familia de instancias asociada a tu partida (por ejemplo, Almacenamiento optimizado).|
| `aws_datatransfer_type`      | El tipo de transferencia de datos asociado a la partida (por ejemplo, entre zonas o entre regiones).|
| `aws_datatransfer_direction` | La dirección de transferencia de datos asociada a la partida (por ejemplo, entrada o salida).|
| `is_aws_ec2_compute`         | Si el uso está relacionado con EC2 Compute.|
| `is_aws_ec2_compute_on_demand`| Si el uso es a la carta.|
| `is_aws_ec2_compute_reservation`| Si el uso está asociado a una Instancia reservada.|
| `is_aws_ec2_capacity_reservation`| Si el uso está asociado a una Reserva de capacidad.|
| `is_aws_ec2_spot_instance`   | Si el uso está asociado a una Instancia puntual.|
| `is_aws_ec2_savings_plan`    | Si el uso está asociado a un Plan de ahorro.|
| `aws_bill_entity` | El vendedor AWS con el que tienes una cuenta. Las transacciones pueden ser una compra en AWS Marketplace (`AWS Marketplace`) o una compra de otros servicios AWS (`AWS`). |
| `aws_bill_type` | El tipo de factura que cubre este informe (por ejemplo `Purchase`). |
| `aws_cost_type` | El tipo de cargo que cubre la partida (por ejemplo `SavingsPlanCoveredUsage`). |
| `aws_discount_lease_term` | El tiempo durante el que se reserva una Instancia reservada. |
| `aws_discount_purchase_option` | Cómo elegiste pagar la reserva (por ejemplo `All Upfront`). |
| `aws_ec2_compute_product_family` | El tipo de uso de una partida de EC2 Compute (por ejemplo `BoxUsage` o `SpotUsage`). |
| `aws_pricing_usage_unit` | La unidad de precio que AWS utilizó para calcular el coste de uso (por ejemplo `Hours`). |
| `aws_reservation_modification_status` | Indica si el arrendamiento del Registro de instrucción (RI) se modificó o no (por ejemplo `Manual`). |
| `bill/billing_entity` | El vendedor AWS con el que tienes una cuenta. Las transacciones pueden ser una compra en AWS Marketplace (`AWS Marketplace`) o una compra de otros servicios AWS (`AWS`). |
| `bill/bill_type` | El tipo de factura que cubre este informe (por ejemplo `Purchase`). |
| `bill/invoicing_entity` | La entidad AWS que emite la factura. |
| `bill/payer_account_id` | El ID de cuenta de la cuenta pagadora. Para una organización de AWS Organizations, es el ID de cuenta de la cuenta de gestión. |
| `is_aws_ec2_compute_savings_plan` | `true` para las partidas que representan el uso de EC2 Compute, pagado mediante un Plan de ahorro. |
| `line_item/currency_code` | La divisa en la que se muestra esta partida (`USD` por defecto). |
| `line_item/legal_entity` | El proveedor de tus servicios AWS. |
| `line_item/line_item_type` | El tipo de gasto cubierto por la partida (por ejemplo `Credit`). |
| `line_item/operation` | La operación AWS específica cubierta por la partida (por ejemplo `RunInstances`). |
| `line_item/product_code` | El código del producto medido (por ejemplo `Amazon EC2` para Amazon Elastic Cloud Compute). |
| `line_item/resource_id` | El ID del recurso individual asociado a la partida (opcional). |
| `line_item/tax_type` | El tipo de impuesto que AWS aplicó a la partida. |
| `line_item/usage_account_id` | El ID de la cuenta que utilizó la partida. |
| `line_item/usage_type` | Los detalles de uso de la partida (por ejemplo `USW2-BoxUsage:m2.2xlarge`). |
| `pricing/lease_contract_length` | Duración de la reserva del RI. |
| `pricing/purchase_option` | Cómo elegiste pagar la partida (por ejemplo `All Upfront`). |
| `pricing/term` | Si tu uso de AWS es `Reserved` o `On-Demand`. |
| `pricing/unit` | La unidad de precio que AWS utilizó para calcular el coste de uso (por ejemplo `Hours`). |
| `reservation/availability_zone` | La zona de disponibilidad del recurso asociado a la partida (como `us-east-1`). |
| `reservation/modification_status` | Muestra si el arrendamiento del RI se modificó o no (por ejemplo `Manual`). |
| `reservation/reservation_arn` | El ARN del RI del que se benefició la partida. |
| `reservation/subscription_id` | El ID único que asigna la partida a la oferta asociada. |
| `savings_plan/instance_type_family` | La familia de instancias asociadas al uso especificado (por ejemplo `m4`). |
| `savings_plan/offering_type` | El tipo de Plan de ahorro contratado (por ejemplo `ComputeSavingsPlans`). |
| `savings_plan/payment_option` | Las opciones de pago disponibles para el Plan de ahorro (por ejemplo `All Upfront`). |
| `savings_plan/purchase_term` | Describe la duración o plazo del Plan de ahorro (por ejemplo `1yr`). |
| `savings_plan/region` | La región AWS que aloja servicios AWS (por ejemplo `US East (N. Virginia)`). |
| `savings_plan/savings_plan_arn` | El ID único del Plan de ahorro. |

#### Correlación entre costes y observabilidad

Ver los costes en el contexto de los datos de observabilidad es importante para entender cómo afectan los cambios de infraestructura a los costes, identificar por qué cambian los costes y optimizar la infraestructura tanto en costes como en rendimiento. Datadog actualiza las etiquetas de identificación de recursos en los datos de costes de los principales productos de AWS para simplificar la correlación entre métricas de observabilidad y de costes.

Por ejemplo, para ver el coste y el uso de cada base de datos RDS, puedes crear una tabla con `aws.cost.amortized`, `aws.rds.cpuutilization` y `aws.rds.freeable_memory` (o cualquier otra métrica RDS) y agruparla por `dbinstanceidentifier`. Para ver el uso y los costes de Lambda uno al lado del otro, puedes crear gráficos con `aws.lambda.concurrent_executions` y `aws.cost.amortized` agrupados por `functionname`.

Las siguientes etiquetas predefinidas están disponibles:

| Producto AWS                  | Etiqueta       |
| ---------------------------- | ----------------- |
| ec2                | `instance_id`|
| s3         | `bucketname`|
| rds         | `dbinstanceidentifier`|
| lambda         | `functionname`|
| dynamodb         | `tablename`|
| elasticache      | `cacheclusterid`|
| cloudfront (distribución)  | `distributionid`|
| cloudfront (función)  | `functionname`|
| ec2 natgateway | `natgatewayid`|
| redshift         | `clusteridentifier`|
| kinesis         | `streamname`|
| cola         | `queuename`|
| sns         | `topicname`|
| elb (aplicación, pasarela, red) | `loadbalancer`|
| elb (todos los demás costes) | `loadbalancername` |

### Orquestadores de contenedores

La asignación de costes de contenedor añade etiquetas de las cargas de trabajo que generan costes. Los ejemplos incluyen etiquetas de pods y nodos de Kubernetes y tareas y contenedores de ECS.

_Requiere la [asignación de costes de contenedor][11] y se aplica sólo a métricas `shared.resources.allocated`._

### Etiquetado de pipelines

Por último, se aplican todos tus conjuntos de reglas para [pipelines de etiquetas][15], lo que proporciona una asignación de costes completa cuando no es posible etiquetar la infraestructura. Los pipelines de etiquetas constituyen la última capa de enriquecimiento y añaden nuevas etiquetas a los datos de costes.

## Billing Conductor
[AWS Billing Conductor][16] es un servicio de facturación personalizado para los socios del canal AWS Marketplace y las organizaciones que tienen requisitos de devolución de cargos.
Billing Conductor permite a los clientes crear una segunda versión pro forma de tus costes para compartirla con tus clientes o propietarios de cuentas.
Las tarifas de facturación, los créditos y comisiones, y los gastos generales pueden personalizarse a tu discreción. También puedes seleccionar qué cuentas incluir en el CUR.

**Limitaciones importantes**: 
- Los informes pro forma de costes y uso no incluyen descuentos e impuestos, lo que dificulta la comparación de costes en Datadog con AWS Cost Explorer.
- Añadir cuentas a un grupo de facturación afecta al modo en que las reservas y los planes de ahorro se comparten entre las cuentas de AWS.

Para crear un CUR de Billing Conductor, sigue la [guía del usuario de Informes de costes y uso][8]. Asegúrate de que el CUR cumple los [requisitos de Datadog][9].
Una vez creado el CUR de de Billing Conductor, sigue las instrucciones anteriores de Gestión de costes en la nube para configurarlo en Datadog.

## Referencias adicionales
{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.aws.amazon.com/cur/latest/userguide/dataexports-create-legacy.html
[2]: https://docs.aws.amazon.com/awsaccountbilling/latest/aboutv2/consolidated-billing.html
[3]: https://us-east-1.console.aws.amazon.com/cost-management/home?region=us-east-1#/settings
[4]: https://docs.aws.amazon.com/cur/latest/userguide/dataexports-view.html
[5]: https://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies_create-console.html
[6]: https://docs.aws.amazon.com/cur/latest/userguide/data-dictionary.html
[7]: https://app.datadoghq.com/cost/setup
[8]: https://docs.aws.amazon.com/cur/latest/userguide/cur-data-view.html
[9]: /es/cloud_cost_management/setup/aws/#prerequisite-generate-a-cost-and-usage-report
[10]: https://docs.aws.amazon.com/cur/latest/userguide/enabling-split-cost-allocation-data.html
[11]: /es/cloud_cost_management/container_cost_allocation/#applying-tags
[12]: https://docs.aws.amazon.com/tag-editor/latest/userguide/tagging.html
[13]: https://docs.aws.amazon.com/awsaccountbilling/latest/aboutv2/activating-tags.html
[14]: https://docs.aws.amazon.com/organizations/latest/userguide/orgs_tagging.html
[15]: /es/cloud_cost_management/allocation/tag_pipelines
[16]: https://docs.aws.amazon.com/billingconductor/latest/userguide/what-is-billingconductor.html
[17]: https://app.datadoghq.com/cost/settings/accounts
[18]: /es/help/
[19]: /es/cloud_cost_management/tags
[20]: https://docs.aws.amazon.com/cur/latest/userguide/troubleshooting.html#backfill-data