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
  text: Obtenga información sobre su factura de Azure
- link: /cloud_cost_management/google_cloud
  tag: Documentación
  text: Obtenga información sobre su factura de Google Cloud
- link: /cloud_cost_management/oracle
  tag: Documentación
  text: Obtenga información sobre su factura de Oracle
title: AWS
---
## Resumen {#overview}

Para configurar Cloud Cost Management en Datadog, necesita:
1. Una cuenta de AWS con acceso a facturación
2. La integración de AWS instalada en Datadog
3. Un Informe de Costos y Uso (siga los pasos a continuación para crear uno)

## Configuración {#setup}

Puede configurar usando la [API][21], [Terraform][22] o directamente en Datadog siguiendo las instrucciones a continuación.

### Configure la integración de AWS {#configure-the-aws-integration}

Navegue a [Setup & Configuration][7], agregue una cuenta de AWS y siga los pasos para configurar la integración de AWS.

**Nota**: Datadog recomienda configurar un Informe de Costos y Uso desde una [cuenta de **gestión de AWS**][2] para visibilidad de costos en cuentas **miembro** relacionadas.

Si envía un Informe de Costos y Uso desde una cuenta **miembro de AWS**, asegúrese de haber seleccionado las siguientes opciones en las [preferencias][3] de su **cuenta de gestión**:
- {{< ui >}}Linked Account Access{{< /ui >}}
- {{< ui >}}Linked Account Refunds and Credits{{< /ui >}}
- {{< ui >}}Linked Account Discounts{{< /ui >}}

Estas configuraciones aseguran una precisión total de costos al permitir cálculos de costos periódicos contra el AWS Cost Explorer.

{{< tabs >}}

{{% tab "CloudFormation" %}}

{{< img src="cloud_cost/setup/aws_cloudformation_setup.png" alt="Formulario de configuración de Cloud Cost Management en el modo CloudFormation" style="width:100%" >}}

### Seleccione los recursos a crear {#select-the-resources-to-create}

La pila de CloudFormation se puede configurar de tres maneras dependiendo de sus recursos de AWS existentes:

* **Nueva configuración**: Seleccione {{< ui >}}Create Cost and Usage Report{{< /ui >}} para crear tanto el informe como su bucket S3
* **Bucket existente**: Seleccione {{< ui >}}Create Cost and Usage Report{{< /ui >}} y deseleccione {{< ui >}}Create S3 Bucket{{< /ui >}} para usar un bucket S3 existente
* **Informe existente**: Deseleccione {{< ui >}}Create Cost and Usage Report{{< /ui >}} para importar un informe de Costos y Uso existente

### Configure los ajustes del Informe de Costos y Uso {#configure-the-cost-and-usage-report-settings}

Ingrese los siguientes detalles para su informe de Costos y Uso:

* {{< ui >}}Bucket Name{{< /ui >}}: El nombre del bucket S3 donde se almacenan los archivos del informe.
* {{< ui >}}Bucket Region{{< /ui >}}: El [código de región][100] de AWS de la región que contiene su bucket S3. Por ejemplo, `us-east-1`.
* {{< ui >}}Export Path Prefix{{< /ui >}}: El prefijo de ruta S3 donde se almacenan los archivos del informe.
  * **Nota:** Los siguientes formatos de prefijo no son compatibles: vacío, que comienza con `/` (como `/` o `/cost`), o que termina con `/` (como `cost/`). Los prefijos que contienen `/` en el medio son compatibles (como `cost/hourly`).
* {{< ui >}}Export Name{{< /ui >}}: El nombre de su informe de Costos y Uso.

**Nota**:
Estos valores localizan su Informe de Costos y Uso existente, o definen la configuración para los recursos recién creados.
- Puede tardar entre 48 y 72 horas para que todos los datos disponibles se poblen en su organización de Datadog después de que se genere un Informe de Costos y Uso completo. Si han pasado 72 horas y los datos aún no se han poblado, contacte a [Soporte de Datadog][101].

[100]: https://docs.aws.amazon.com/global-infrastructure/latest/regions/aws-regions.html
[101]: /es/help/

{{% /tab %}}

{{% tab "Terraform" %}}

{{< img src="cloud_cost/setup/aws_terraform_setup.png" alt="Página de configuración de CCM con la opción de Terraform seleccionada, mostrando el Paso 1 expandido para configurar los ajustes del Informe de Costos y Uso, incluyendo el nombre del bucket, la región y los detalles de exportación." style="width:100%" >}}

### Seleccione los recursos a crear {#select-the-resources-to-create-1}

La configuración de Terraform admite tres configuraciones dependiendo de sus recursos existentes de AWS:

* **Nueva configuración**: Seleccione {{< ui >}}Create Cost and Usage Report{{< /ui >}} para crear tanto el informe como su bucket S3
* **Bucket existente**: Seleccione {{< ui >}}Create Cost and Usage Report{{< /ui >}} y deseleccione {{< ui >}}Create S3 Bucket{{< /ui >}} para usar un bucket S3 existente
* **Bucket e informe existentes**: Deseleccione {{< ui >}}Create Cost and Usage Report{{< /ui >}} y {{< ui >}}Create S3 Bucket{{< /ui >}} para usar un informe y un bucket S3 existentes.

**Nota**: Si usa un bucket existente, verifique que AWS tenga permiso para escribir CURs en él. Si no, es posible que necesite actualizar la política de su bucket.

### Configure los ajustes del Informe de Costos y Uso {#configure-the-cost-and-usage-report-settings-1}

Ingrese los siguientes detalles para su informe de Costos y Uso:

* {{< ui >}}Bucket Name{{< /ui >}}: El nombre del bucket S3 donde se almacenan los archivos del informe.
* {{< ui >}}Bucket Region{{< /ui >}}: El [código de región][100] de AWS de la región que contiene su bucket S3. Por ejemplo, `us-east-1`.
* {{< ui >}}Export Path Prefix{{< /ui >}}: El prefijo de ruta S3 donde se almacenan los archivos del informe.
  * **Nota**: Los siguientes formatos de prefijo no son compatibles: vacío, que comienza con `/` (como `/` o `/cost`), o que termina con `/` (como `cost/`). Los prefijos que contienen `/` en el medio son compatibles (como `cost/hourly`).
* {{< ui >}}Export Name{{< /ui >}}: El nombre de su Informe de Costos y Uso.

**Nota**:
- Estos valores localizan su Informe de Costos y Uso existente, o definen la configuración para los recursos recién creados.
- Puede tardar entre 48 y 72 horas para que todos los datos disponibles se poblen en su organización de Datadog después de que se genere un Informe de Costos y Uso completo. Si han pasado 72 horas y los datos aún no se han poblado, contacte a [Soporte de Datadog][101].

[100]: https://docs.aws.amazon.com/global-infrastructure/latest/regions/aws-regions.html
[101]: /es/help/

### Copie el HCL de Terraform generado y aplique los cambios {#copy-generated-terraform-hcl-and-apply-changes}

En la interfaz de configuración de Terraform de CCM, siga las instrucciones en el paso {{< ui >}}Apply Terraform Configuration{{< /ui >}}. Resuelva cualquier problema que aparezca mientras ejecuta `terraform plan` o `terraform apply` antes de regresar a CCM para confirmar la creación de la cuenta.

{{% /tab %}}

{{% tab "Manual" %}}

{{< img src="cloud_cost/setup/aws_manual_setup.png" alt="Formulario de configuración de Cloud Cost Management en modo manual" style="width:100%" >}}

### Requisito previo: genere un Informe de Costos y Uso {#prerequisite-generate-a-cost-and-usage-report}

[Cree un Informe de Costos y Uso Legado][201] en AWS bajo la sección {{< ui >}}Data Exports{{< /ui >}}.

Seleccione el tipo de exportación {{< ui >}}Legacy CUR export{{< /ui >}}.

Seleccione las siguientes opciones de contenido:

* Tipo de exportación: {{< ui >}}Legacy CUR export{{< /ui >}}
* {{< ui >}}Include resource IDs{{< /ui >}}
* {{< ui >}}Split cost allocation data{{< /ui >}} (Habilita la Asignación de Costos de ECS. También debe optar por [AWS Split Cost Allocation][210] en las preferencias de Cost Explorer).
* {{< ui >}}Refresh automatically{{< /ui >}}

Seleccione las siguientes opciones de entrega:

* Granularidad de tiempo: {{< ui >}}Hourly{{< /ui >}}
* Versionado del informe: {{< ui >}}Create new report version{{< /ui >}}
* Tipo de compresión: {{< ui >}}GZIP{{< /ui >}} o {{< ui >}}Parquet{{< /ui >}}

### Localice el Informe de Costos y Uso {#locate-the-cost-and-usage-report}

Si se ha alejado del informe que creó en la sección de requisitos previos, siga la documentación de AWS para [ver sus Exportaciones de Datos][204]. Seleccione la exportación CUR heredada que creó, luego seleccione {{< ui >}}Edit{{< /ui >}} para ver los detalles de la exportación.

Para permitir que Datadog localice el Informe de Costos y Uso, complete los campos con sus detalles correspondientes:

* {{< ui >}}Bucket Name{{< /ui >}}: Este es el nombre del bucket S3 en la sección de configuración de almacenamiento de exportación de datos.
* {{< ui >}}Bucket Region{{< /ui >}}: Esta es la región donde se encuentra su bucket. Por ejemplo, `us-east-1`.
* {{< ui >}}Export Path Prefix{{< /ui >}}: Este es el prefijo de ruta S3 en la sección de configuración de almacenamiento de exportación de datos.
  * **Nota**: Los siguientes formatos de prefijo no son compatibles: vacío, que comienza con `/` (como `/` o `/cost`), o que termina con `/` (como `cost/`). Los prefijos que contienen `/` en el medio son compatibles (como `cost/hourly`).
* {{< ui >}}Export Name{{< /ui >}}: Este es el nombre de la exportación en la sección de nombre de exportación.

**Nota**: Datadog solo admite Informes de Costos y Uso (CUR) heredados generados por AWS. No modifique ni mueva los archivos generados por AWS, ni intente proporcionar acceso a archivos generados por un tercero.

{{< site-region region="gov,gov2" >}}
<div class="alert alert-danger">El punto final de los Informes de Costos y Uso de AWS se utiliza para validar los campos anteriores contra la exportación CUR en su bucket S3. Este punto final no está validado por FIPS.</div>
{{< /site-region >}}

### Configure el acceso al Informe de Costos y Uso {#configure-access-to-the-cost-and-usage-report}

[Cree una política][205] en AWS para asegurar que Datadog tenga permisos para acceder al CUR y al bucket S3 en el que está almacenado. Use el siguiente JSON:

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

**Nota**: Tome nota del nombre que creó para esta política para los siguientes pasos.

### Adjunte la política al rol de integración de Datadog {#attach-the-policy-to-the-datadog-integration-role}

Adjunte la nueva política S3 al rol de integración de Datadog.

1. Navegue a {{< ui >}}Roles{{< /ui >}} en la consola de AWS IAM.
2. Localice el rol utilizado por la integración de Datadog. Por defecto, se llama **DatadogIntegrationRole**, pero el nombre puede variar si su organización lo ha renombrado. Haga clic en el nombre del rol para abrir la página de resumen del rol.
3. Haga clic en {{< ui >}}Attach policies{{< /ui >}}.
4. Ingrese el nombre de la política del bucket S3 creada anteriormente.
5. Haga clic en {{< ui >}}Attach policy{{< /ui >}}.

**Nota**: Puede tardar entre 48 y 72 horas para que todos los datos disponibles se carguen en su organización de Datadog después de que se genere un Informe Completo de Costos y Uso. Si han pasado 72 horas y los datos aún no se han cargado, contacte a [Soporte de Datadog][18].

[201]: https://docs.aws.amazon.com/cur/latest/userguide/dataexports-create-legacy.html
[204]: https://docs.aws.amazon.com/cur/latest/userguide/dataexports-view.html
[205]: https://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies_create-console.html
[210]: https://docs.aws.amazon.com/cur/latest/userguide/enabling-split-cost-allocation-data.html

{{% /tab %}}

{{< /tabs >}}

### Filtrado de cuentas {#account-filtering}

Utilice el Filtrado de Cuentas para controlar qué cuentas miembro de AWS se deben incluir en Cloud Cost Management. Filtrar cuentas no incurre en costos adicionales de Datadog.

Usar el Filtrado de Cuentas requiere una cuenta de gestión de AWS. Puede configurar filtros de cuentas después de que una cuenta haya sido configurada en Cloud Cost Management.

**Nota:** Los filtros de cuentas no son compatibles con la búsqueda por etiquetas.

#### Configure filtros de cuentas para una cuenta existente {#configure-account-filters-for-an-existing-account}

Navegue a [**Cloud Cost** > **Settings**, seleccione **Accounts**][17], y luego haga clic en {{< ui >}}Manage Account{{< /ui >}} para la cuenta de gestión que desea filtrar.

{{< img src="cloud_cost/account_filtering/manage_account.png" alt="Botón de Administrar Cuenta en la tarjeta de cuenta" style="width:100%;" >}}

Haz clic en {{< ui >}}Billing dataset{{< /ui >}} para acceder a la interfaz de filtrado de cuentas.

{{< img src="cloud_cost/account_filtering/account_filtering.png" alt="Interfaz de filtrado de cuentas para filtrar cuentas miembro de AWS" style="width:100%;" >}}

### Obteniendo datos históricos {#getting-historical-data}

Si configuras un Informe de Costos y Uso que ya tiene datos históricos disponibles en S3, Datadog ingiere automáticamente hasta 15 meses de datos históricos de costos.

Si tu informe recién configurado no tiene datos históricos, puedes solicitar un retroceso de AWS:

Para solicitar un retroceso de datos históricos de costos de AWS:

1. [Abra un caso de soporte de AWS][20] y solicite un retroceso de sus datos de costos.
2. Incluya el **nombre del informe** y el **período de facturación deseado** en su solicitud.
3. Espere a que AWS procese la solicitud de retroceso.

Cuando los datos sean retrocedidos por AWS, Datadog ingiere automáticamente los datos dentro de 24 horas.

AWS no puede retroceder datos de costos que sean anteriores a su cuenta de AWS o que reflejen una estructura anterior de AWS Organizations.

Para más información, consulte la [guía de solución de problemas de Informes de Costos y Uso de AWS][20].

## Tipos de costos {#cost-types}

Visualice sus datos importados utilizando tipos de costos predefinidos. Los tipos de costos difieren principalmente en cómo informan sobre tasas de descuento, planes de ahorro y reservas.

### Bajo demanda {#on-demand}
**Los costos** bajo demanda representan el costo de uso a la tarifa pública y bajo demanda publicada por AWS. Esto excluye todos los planes de ahorro, reservas, descuentos, impuestos y tarifas.

**Nota**: En la mayoría de los casos, los costos bajo demanda no son una fuente confiable para estimar los costos reales.

### Costos amortizados y no mezclados {#amortized-and-unblended-costs}
Las métricas de costo **amortizado** distribuyen los ahorros de compromiso a lo largo del período de descuento. Esto también se llama _base devengada_. Las reservas y los planes de ahorro se deducen de un compromiso mensual y se aplican directamente al uso cubierto, en el momento del uso. Cualquier saldo no utilizado aparece como una tarifa.

En contraste, las métricas de costo **no combinados** muestran todos los cargos en la fecha en que se incurren. Esto también se llama _base de costos_. Las tarifas de reservas y planes de ahorro aparecen en la fecha en que se cobraron, y no se aplican directamente al uso cubierto. Después de que los datos de facturación de un mes se finalicen, las métricas no combinadas coinciden exactamente con la factura de AWS.

### Costos netos {#net-costs}
**Los costos** netos aplican descuentos privados directamente al uso. El costo de uso de un recurso específico representa el costo efectivo después de que se realizan todos los ahorros.

En contraste, otras métricas muestran descuentos privados como partidas separadas con valor negativo y sin etiquetas de atribución de recursos. En lugar de atribuir los descuentos directamente al uso, esas métricas restan los descuentos del costo total.

**Los costos amortizados netos** proporcionan la representación más precisa para la asignación de costos, con todos los ahorros aplicados directamente al uso. Las métricas de costo neto están disponibles si su cuenta de AWS tiene descuentos empresariales negociados privadamente. Si su cuenta no tiene descuentos empresariales, entonces el costo **amortizado neto** y el costo **amortizado** son equivalentes.

### Asignación de contenedores {#container-allocation}
Las métricas de **asignación de contenedores** contienen todos los mismos costos que las métricas de AWS, pero con desgloses e información adicional para cargas de trabajo de contenedores. Consulte [asignación de costos de contenedor][11] para más detalles.

### Ejemplo {#example}
El siguiente escenario demuestra cómo se comportan los diferentes tipos de costos. Imagínese que tiene:
- Una instancia de EC2 en ejecución durante una hora con un costo de $3 por hora de cómputo.
- Un plan de ahorro que fija el precio de este tipo de instancia en $2 por hora de cómputo.
- Un descuento negociado de EDP del 10% sobre todos los demás descuentos.

Así es como el costo de la instancia, el compromiso horario del plan de ahorros y el descuento aparecen en cada tipo de costo:

|Tipo de costo |Uso |Plan de ahorros |Descuento | Explicación |
|:---------|-|-|-|:------------------------------------------------|
|Bajo demanda |$3.00|||Esta es la tarifa pública bajo demanda.|
|No combinados |$3.00|$2.00|-$0.20|La tarifa recurrente del plan de ahorros y el descuento de EDP son líneas separadas, no asociadas con un recurso específico. (**Nota:** el costo del recurso de $3 se compensa con `SavingsPlanNegation`.) |
|Neto no combinado||$1.80||La tarifa recurrente del plan de ahorros aparece como una partida con el descuento aplicado; el costo no está asociado con un recurso específico.|
|Amortizado |$2.00||-$0.20|El descuento del plan de ahorros se aplica directamente al costo del recurso. El descuento de EDP es una partida separada. |
|Neto amortizado |$1.80|||Los descuentos del plan de ahorros y de EDP se aplican directamente al costo del recurso. |
|Neto amortizado - Recursos compartidos asignados |$1.80|||El mismo costo que el neto amortizado, pero este costo se puede desglosar aún más por dimensiones de Kubernetes y etiquetas de pod. |

### Resumen de métricas de costo {#cost-metrics-summary}

En general:
- `aws.cost.net.amortized.shared.resources.allocated` proporciona la asignación de costos más completa para cargas de trabajo y equipos específicos.
- Si no tiene asignación de costos de contenedor, use `aws.cost.net.amortized`.
- Si no tiene costos amortizados netos, use `aws.cost.amortized.shared.resources.allocated` o `aws.cost.amortized`.

| Métrica               | Descripción           |
| -------------------- | --------------------- |
| `aws.cost.net.amortized.shared.resources.allocated` | Todos sus costos amortizados netos de AWS, con desgloses e información adicional para cargas de trabajo de contenedor. Requiere [asignación de costos de contenedor][11].|
| `aws.cost.net.amortized` | Costos amortizados netos, sin desgloses de costos de contenedor. |
| `aws.cost.net.unblended` | Costos netos no combinados, sin desgloses de costos de contenedor. Coincide con la factura de AWS, con descuentos especializados pre-calculados dentro de los costos de uso. |
| `aws.cost.amortized.shared.resources.allocated` | Todos sus costos amortizados de AWS, con desgloses e información adicional para cargas de trabajo de contenedor. Requiere [asignación de costos de contenedor][11].|
| `aws.cost.amortized` | Costos amortizados, sin desgloses de costos de contenedor. |
| `aws.cost.unblended` | Costos no combinados, sin desgloses de costos de contenedor. Coincide con la factura de AWS. |
| `aws.cost.ondemand`  | Costos basados en la tarifa de lista proporcionada por AWS, excluyendo todos los planes de ahorro, reservas, descuentos, impuestos y tarifas. |

## Cómo Datadog enriquece sus datos de costos de AWS con etiquetas {#how-datadog-enriches-your-aws-cost-data-with-tags}

Datadog enriquece automáticamente sus datos de costos de AWS con etiquetas de múltiples fuentes. Para una visión general completa de cómo se aplican las etiquetas a los datos de costos, consulte [Etiquetas][19].

Las siguientes fuentes de etiquetas están disponibles para AWS:

- Columnas del Informe de Costos y Uso
- Etiquetas de Recursos de AWS
- Etiquetas de Cuenta de AWS
- Etiquetas de Integración de AWS
- Etiquetas listas para usar
- Etiquetas de carga de trabajo de contenedor
- Canalizaciones de etiquetas

### Columnas del Informe de Costos y Uso {#cost-and-usage-report-columns}

Todas las columnas con valores de cadena del [Informe de Costos y Uso (CUR)][6] de AWS se agregan como etiquetas en las métricas de costos.

Para asegurar consistencia, Datadog normaliza las claves de etiquetas usando guiones bajos y minúsculas. Por ejemplo, la columna CUR `lineItem/ResourceId` se mapea a la clave de etiqueta `line_item/resource_id`. Los valores de las etiquetas generalmente no se modifican, manteniendo la capitalización exacta y la mayoría de los caracteres especiales.

**Ejemplos:**

|Columna CUR|Valor CUR|Etiqueta Cloud Cost|
|---|---|---|
|lineItem/ResourceId|i-12345678a9b12cd3e|line_item/resource_id:i-12345678a9b12cd3e|
|product/region|us-east-1|product/region:us-east-1|
|product/usagetype|DataTransfer-Regional-Bytes|product/usagetype:DataTransfer-Regional-Bytes|

### etiquetas de recursos de AWS {#aws-resource-tags}

[Las etiquetas de recursos de AWS][12] son etiquetas definidas por el usuario que aparecen en la consola de AWS al ver un recurso particular, como una instancia de EC2 o un bucket de S3.

Cuando habilita la integración de AWS con Datadog, Datadog recopila automáticamente las etiquetas de recursos para la mayoría de los recursos de AWS. Estas etiquetas se aplican a todos los costos encontrados en el CUR para un recurso dado. Las etiquetas de recursos se recuperan regularmente y se aplican a los datos de costo a partir del día en que se crean o modifican. Los valores históricos de las etiquetas no se sobrescriben cuando cambian las etiquetas.

Si la integración de AWS no está habilitada, puede habilitar el enriquecimiento de etiquetas de recursos activando [etiquetas de asignación de costos][13] en la facturación de AWS. Esto le permite seleccionar un subconjunto de claves de etiquetas de recursos para incluir como columnas en el CUR de AWS. Datadog incluye automáticamente esas columnas como etiquetas al procesar el CUR.

### etiquetas de organización y cuenta de AWS {#aws-organization-and-account-tags}
Las Organizaciones de AWS admiten [etiquetas definidas por el usuario][14] en unidades organizativas y cuentas. Datadog obtiene y aplica automáticamente estas etiquetas a los datos de costos. Las etiquetas de cuenta se aplican a todo el uso asociado con esas cuentas. Las etiquetas de organización se aplican a todos los datos de facturación para la cuenta de pagador correspondiente.

_Requiere la integración de Datadog AWS en la cuenta de la organización._

### Etiquetas de integración de AWS {#aws-integration-tags}

Las etiquetas de integración de AWS son etiquetas establecidas en el mosaico de integración de AWS en la página de integraciones de Datadog. Se aplican a todos los costos encontrados en el CUR para la cuenta de AWS asociada.

### Etiquetas listas para usar {#out-of-the-box-tags}
Datadog agrega etiquetas listas para usar a los datos de costos ingeridos para ayudarle a desglosar y asignar sus costos. Estas etiquetas se derivan de su [Informe de Costos y Uso (CUR)][6] y facilitan el descubrimiento y la comprensión de los datos de costos.

Las siguientes etiquetas listas para usar están disponibles para filtrar y agrupar datos:

| Etiqueta                          | Descripción       |
| ---------------------------- | ----------------- |
| `aws_product`                | El servicio de AWS que se está facturando.|
| `aws_product_family`         | La categoría del servicio de AWS que se está facturando (por ejemplo, Compute o Storage).|
| `aws_management_account_name`| El nombre de la cuenta de administración de AWS asociada con el ítem.|
| `aws_management_account_id`  | El ID de la cuenta de administración de AWS asociada con el ítem.|
| `aws_member_account_name`    | El nombre de la cuenta miembro de AWS asociada con el ítem.|
| `aws_member_account_id`      | El ID de la cuenta miembro de AWS asociada con el ítem.|
| `aws_cost_type`              | El tipo de cargo cubierto por este ítem (por ejemplo, Uso o Impuesto).|
| `aws_pricing_term`           | Si el uso es Reserved, Spot o On-Demand.|
| `aws_reservation_arn`        | El ARN de la Instancia Reservada de la que se benefició el ítem.|
| `aws_savings_plan_arn`       | El ARN del Savings Plan del que se benefició el ítem.|
| `aws_usage_type`             | Los detalles de uso del ítem (por ejemplo, BoxUsage:i3.8xlarge).|
| `aws_operation`              | La operación asociada con el ítem (por ejemplo, RunInstances).|
| `aws_region`                 | La región asociada con el ítem (por ejemplo, us-east-1).|
| `aws_availability_zone`      | La zona de disponibilidad asociada con el ítem.|
| `aws_resource_id`            | El ID de recurso asociado con el ítem.|
| `aws_instance_type`          | El tipo de instancia del ítem.|
| `aws_instance_family`        | La familia de instancias asociada con su ítem (por ejemplo, Storage Optimized).|
| `aws_datatransfer_type`      | El tipo de transferencia de datos asociada con el ítem (por ejemplo, cross-zone o cross-region).|
| `aws_datatransfer_direction` | La dirección de la transferencia de datos asociada con el ítem (por ejemplo, in o out).|
| `is_aws_ec2_compute`         | Si el uso está relacionado con EC2 compute.|
| `is_aws_ec2_compute_on_demand`| Si el uso es On-Demand.|
| `is_aws_ec2_compute_reservation`| Si el uso está asociado con una Instancia Reservada.|
| `is_aws_ec2_capacity_reservation`| Si el uso está asociado con una Reserva de Capacidad.|
| `is_aws_ec2_spot_instance`   | Si el uso está asociado con una Instancia Spot.|
| `is_aws_ec2_savings_plan`    | Si el uso está asociado con un Savings Plan.|
| `aws_bill_entity` | El vendedor de AWS con el que está su cuenta. Las transacciones pueden ser una compra de AWS Marketplace (`AWS Marketplace`) o una compra de otros servicios de AWS (`AWS`). |
| `aws_bill_type` | El tipo de factura que cubre este informe (como `Purchase`). |
| `aws_cost_type` | El tipo de cargo que cubre el elemento de línea (como `SavingsPlanCoveredUsage`). |
| `aws_discount_lease_term` | La duración por la cual se reserva una instancia reservada. |
| `aws_discount_purchase_option` | Cómo eligió pagar por una reserva (como `All Upfront`). |
| `aws_ec2_compute_product_family` | El tipo de uso para un artículo de línea de EC2 Compute (como `BoxUsage` o `SpotUsage`). |
| `aws_pricing_usage_unit` | La unidad de precio que AWS utilizó para calcular el costo de uso (como `Hours`). |
| `aws_reservation_modification_status` | Indica si el contrato de RI fue modificado o no alterado (como `Manual`). |
| `bill/billing_entity` | El vendedor de AWS con el que está su cuenta. Las transacciones pueden ser una compra de AWS Marketplace (`AWS Marketplace`) o una compra de otros servicios de AWS (`AWS`). |
| `bill/bill_type` | El tipo de factura que cubre este informe (como `Purchase`). |
| `bill/invoicing_entity` | La entidad de AWS que emite la factura. |
| `bill/payer_account_id` | El ID de la cuenta pagadora. Para una organización en AWS Organizations, este es el ID de la cuenta de gestión. |
| `is_aws_ec2_compute_savings_plan` | `true` para los elementos de línea que representan el uso de EC2 Compute, pagados mediante un Savings Plan. |
| `line_item/currency_code` | La moneda en la que se muestra este elemento de línea (`USD` por defecto). |
| `line_item/legal_entity` | El proveedor de sus servicios de AWS. |
| `line_item/line_item_type` | El tipo de cargo cubierto por el elemento de línea (como `Credit`). |
| `line_item/operation` | La operación específica de AWS cubierta por el elemento de línea (como `RunInstances`). |
| `line_item/product_code` | El código del producto medido (como `Amazon EC2` para Amazon Elastic Cloud Compute). |
| `line_item/resource_id` | El ID de recurso individual asociado con el elemento de línea (Opcional). |
| `line_item/tax_type` | El tipo de impuesto que AWS aplicó al elemento de línea. |
| `line_item/usage_account_id` | El ID de la cuenta que utilizó el elemento de línea. |
| `line_item/usage_type` | Los detalles de uso del elemento de línea (como `USW2-BoxUsage:m2.2xlarge`). |
| `pricing/lease_contract_length` | La duración por la cual se reserva el RI. |
| `pricing/purchase_option` | Cómo eligió pagar por la partida (como `All Upfront`). |
| `pricing/term` | Si su uso de AWS es `Reserved` o `On-Demand`. |
| `pricing/unit` | La unidad de precio que AWS utilizó para calcular el costo de uso (como `Hours`). |
| `reservation/availability_zone` | La Availability Zone del recurso asociado con el elemento de línea (como `us-east-1`). |
| `reservation/modification_status` | Indica si el contrato de RI fue modificado o no alterado (como `Manual`). |
| `reservation/reservation_arn` | El ARN del RI del cual se benefició la partida. |
| `reservation/subscription_id` | El ID único que mapea la partida con la oferta asociada. |
| `savings_plan/instance_type_family` | La familia de instancias que está asociada con el uso especificado (como `m4`). |
| `savings_plan/offering_type` | El tipo de Plan de Ahorros adquirido (como `ComputeSavingsPlans`). |
| `savings_plan/payment_option` | Las opciones de pago disponibles para el Plan de Ahorros (como `All Upfront`). |
| `savings_plan/purchase_term` | Describe la duración o término del Plan de Ahorros (como `1yr`). |
| `savings_plan/region` | La Región de AWS que alberga los servicios de AWS (como `US East (N. Virginia)`). |
| `savings_plan/savings_plan_arn` | El identificador único del Plan de Ahorros. |

#### Correlación de costos y observabilidad {#cost-and-observability-correlation}

Ver los costos en el contexto de los datos de observabilidad es importante para entender cómo los cambios en la infraestructura impactan los costos, identificar por qué cambian los costos y optimizar la infraestructura tanto para costos como para rendimiento. Datadog actualiza las etiquetas que identifican recursos en los datos de costos para los principales productos de AWS para simplificar la correlación entre métricas de observabilidad y costos.

Por ejemplo, para ver el costo y la utilización de cada base de datos RDS, puede crear una tabla con `aws.cost.amortized`, `aws.rds.cpuutilization` y `aws.rds.freeable_memory` (o cualquier otra métrica de RDS) y agrupar por `dbinstanceidentifier`. Para ver el uso y los costos de Lambda lado a lado, puede graficar `aws.lambda.concurrent_executions` y `aws.cost.amortized` agrupados por `functionname`.

Las siguientes etiquetas listas para usar están disponibles:

| Producto de AWS                  | Etiqueta       |
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
| elb (aplicación, gateway, red) | `loadbalancer`|
| elb (todos los demás costos) | `loadbalancername` |

### Orquestadores de contenedores {#container-orchestrators}

La asignación de costos de contenedores agrega etiquetas de las cargas de trabajo que incurren en costos. Los ejemplos incluyen etiquetas de pods y nodos de Kubernetes, así como tareas y contenedores de ECS.

_Requiere [asignación de costos de contenedores][11], y se aplica solo a `shared.resources.allocated` métricas._

### Canalizaciones de etiquetas {#tag-pipelines}

Finalmente, se aplican todas sus reglas de [canalización de etiquetas][15], proporcionando una asignación de costos completa cuando no es posible etiquetar la infraestructura. Las canalizaciones de etiquetas son la capa final de enriquecimiento y añaden nuevas etiquetas a sus datos de costos.

## Conductor de facturación {#billing-conductor}
[Conductor de Facturación de AWS][16] es un servicio de facturación personalizado para socios de canal de AWS Marketplace y organizaciones que tienen requisitos de chargeback.
El Conductor de Facturación permite a los clientes crear una segunda versión pro forma de sus costos para compartir con sus clientes o propietarios de cuentas.
Las tarifas de facturación, créditos y cargos, y los costos generales pueden ser personalizados a su discreción. También puede seleccionar qué cuentas incluir en el CUR.

**Limitaciones importantes**:
- Los informes de costos y uso pro forma no incluyen descuentos ni impuestos, lo que dificulta la comparación de costos en Datadog con AWS Cost Explorer.
- Agregar cuentas a un grupo de facturación impacta cómo se comparten las Reservas y los Planes de Ahorro entre las cuentas de AWS.

Para crear un CUR de conductor de facturación, siga la [guía del usuario de informes de costos y uso de AWS][8]. Asegúrese de que el CUR cumpla con [los requisitos de Datadog][9].
Después de que se crea el CUR del conductor de facturación, siga las instrucciones de Cloud Cost Management anteriores para configurarlo en Datadog.

## Lectura adicional {#further-reading}
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
[21]: /es/api/latest/cloud-cost-management/#create-cloud-cost-management-aws-cur-config
[22]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/aws_cur_config