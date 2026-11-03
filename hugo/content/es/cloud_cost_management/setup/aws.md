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
## Descripción general {#overview}

Para configurar Cloud Cost Management en Datadog, necesita:
1. Una cuenta de AWS con acceso a la facturación
2. La integración de AWS instalada en Datadog
3. Un informe de costos y uso (siga los pasos a continuación para crear uno)

## Configuración {#setup}

Puede realizar la configuración mediante la [API][21], [Terraform][22], el flujo guiado **Set up with AI Agent** o directamente en Datadog siguiendo las instrucciones a continuación.

### Configure la integración de AWS {#configure-the-aws-integration}

Navegue a [Setup & Configuration][7], agregue una cuenta de AWS y siga los pasos para configurar la integración de AWS.

**Nota**: Datadog recomienda configurar un informe de costos y uso (Cost and Usage Report) desde una [**cuenta de administración** de AWS][2], no desde una cuenta de administrador delegado, para obtener visibilidad de los costos en las **cuentas miembro** relacionadas. Una cuenta de administrador delegado no puede descubrir otras cuentas miembro.

Si envía un informe de costos y uso desde una **cuenta miembro** de AWS, asegúrese de haber seleccionado las siguientes opciones en las [preferencias][3] de su **cuenta de administración**:
- {{< ui >}}Linked Account Access{{< /ui >}}
- {{< ui >}}Linked Account Refunds and Credits{{< /ui >}}
- {{< ui >}}Linked Account Discounts{{< /ui >}}

Esta configuración ayuda a garantizar una precisión total de los costos al permitir cálculos de costos periódicos contra el AWS Cost Explorer.

{{< tabs >}}

{{% tab "CloudFormation" %}}

{{< img src="cloud_cost/setup/aws_cloudformation_setup.png" alt="Formulario de configuración de Cloud Cost Management en modo CloudFormation" style="width:100%" >}}

### Seleccione los recursos a crear {#select-the-resources-to-create}

La pila de CloudFormation se puede configurar de tres maneras según sus recursos de AWS existentes:

* **Configuración nueva**: seleccione {{< ui >}}Create Cost and Usage Report{{< /ui >}} para crear tanto el informe como su bucket de S3
* **Bucket existente**: seleccione {{< ui >}}Create Cost and Usage Report{{< /ui >}} y deseleccione {{< ui >}}Create S3 Bucket{{< /ui >}} para usar un bucket de S3 existente
* **Informe existente**: Desmarque {{< ui >}}Create Cost and Usage Report{{< /ui >}} para importar un informe de costos y uso existente

### Configure los ajustes del informe de costos y uso {#configure-the-cost-and-usage-report-settings}

Si utiliza un informe de Cost and Usage Report 2.0 y un bucket existentes, seleccione su informe en el campo {{< ui >}}Data Export{{< /ui >}} y continúe con el siguiente paso.

{{< img src="cloud_cost/setup/aws_data_export_selector.png" alt="Página de configuración de CCM con \"Crear informe de Cost and Usage Report\" y \"Crear bucket de S3\" desmarcados, que muestra el selector de exportación de datos utilizado para seleccionar una exportación existente" style="width:100%" >}}

De lo contrario, ingrese los siguientes detalles para su informe de costos y uso:

* {{< ui >}}Report Content{{< /ui >}}: La versión de su informe de costos y uso (CUR heredado o CUR 2.0).
* {{< ui >}}Bucket Name{{< /ui >}}: El nombre del bucket de S3 donde se almacenan los archivos de informe.
* {{< ui >}}Bucket Region{{< /ui >}}: El [código de región][100] de AWS de la región que contiene su bucket de S3. Por ejemplo, `us-east-1`.
* {{< ui >}}Export Path Prefix{{< /ui >}}: El prefijo de ruta de S3 donde se almacenan los archivos de informe.
  * **Nota:** Los siguientes formatos de prefijo no son compatibles: vacío, que comience con `/` (como `/` o `/cost`), o que termine con `/` (como `cost/`). Los prefijos que contienen `/` en el medio son compatibles (como `cost/hourly`).
* {{< ui >}}Export Name{{< /ui >}}: El nombre de su informe de costos y uso.

**Nota**:
- Estos valores localizan su informe de costos y uso existente o definen la configuración de los recursos recién creados.
- Pueden transcurrir entre 48 y 72 horas para que todos los datos disponibles se reflejen en su organización de Datadog después de que se genere un informe de costos y uso completo. Si han transcurrido 72 horas y los datos aún no se han reflejado, comuníquese con [Datadog Support][101].

[100]: https://docs.aws.amazon.com/global-infrastructure/latest/regions/aws-regions.html
[101]: /es/help/

{{% /tab %}}

{{% tab "Terraform" %}}

{{< img src="cloud_cost/setup/aws_terraform_setup.png" alt="Página de configuración de CCM con la opción de Terraform seleccionada, que muestra el Paso 1 expandido para configurar los ajustes del informe de costos y uso, incluidos el nombre del bucket, la región y los detalles de exportación." style="width:100%" >}}

### Seleccione los recursos a crear {#select-the-resources-to-create-1}

La configuración de Terraform admite tres configuraciones según sus recursos de AWS existentes:

* **Configuración nueva**: seleccione {{< ui >}}Create Cost and Usage Report{{< /ui >}} para crear tanto el informe como su bucket de S3
* **Bucket existente**: seleccione {{< ui >}}Create Cost and Usage Report{{< /ui >}} y deseleccione {{< ui >}}Create S3 Bucket{{< /ui >}} para usar un bucket de S3 existente
* **Bucket e informe existentes**: Desmarque {{< ui >}}Create Cost and Usage Report{{< /ui >}} y {{< ui >}}Create S3 Bucket{{< /ui >}} para usar un informe de costos y uso y un bucket de S3 existentes

**Nota**: Si utiliza un bucket existente, verifique que AWS tenga permiso para escribir CUR en él. De lo contrario, es posible que deba actualizar la política de su bucket.

### Configure los ajustes del informe de costos y uso {#configure-the-cost-and-usage-report-settings-1}

Si utiliza un informe de Cost and Usage Report 2.0 y un bucket existentes, seleccione su informe en el campo {{< ui >}}Data Export{{< /ui >}} y continúe con el siguiente paso.

{{< img src="cloud_cost/setup/aws_data_export_selector.png" alt="Página de configuración de CCM con \"Crear informe de Cost and Usage Report\" y \"Crear bucket de S3\" desmarcados, que muestra el selector de exportación de datos utilizado para seleccionar una exportación existente" style="width:100%" >}}

De lo contrario, ingrese los siguientes detalles para su informe de costos y uso:

* {{< ui >}}Report Content{{< /ui >}}: La versión de su informe de costos y uso (CUR heredado o CUR 2.0).
* {{< ui >}}Bucket Name{{< /ui >}}: El nombre del bucket de S3 donde se almacenan los archivos de informe.
* {{< ui >}}Bucket Region{{< /ui >}}: El [código de región][100] de AWS de la región que contiene su bucket de S3. Por ejemplo, `us-east-1`.
* {{< ui >}}Export Path Prefix{{< /ui >}}: El prefijo de ruta de S3 donde se almacenan los archivos de informe.
  * **Nota:** Los siguientes formatos de prefijo no son compatibles: vacío, que comience con `/` (como `/` o `/cost`), o que termine con `/` (como `cost/`). Los prefijos que contienen `/` en el medio son compatibles (como `cost/hourly`).
* {{< ui >}}Export Name{{< /ui >}}: El nombre de su informe de costos y uso.

**Nota**:
- Estos valores localizan su informe de costos y uso existente o definen la configuración de los recursos recién creados.
- Pueden transcurrir entre 48 y 72 horas para que todos los datos disponibles se reflejen en su organización de Datadog después de que se genere un informe de costos y uso completo. Si han transcurrido 72 horas y los datos aún no se han reflejado, comuníquese con [Datadog Support][101].

[100]: https://docs.aws.amazon.com/global-infrastructure/latest/regions/aws-regions.html
[101]: /es/help/

### Copie el HCL de Terraform generado y aplique los cambios {#copy-generated-terraform-hcl-and-apply-changes}

En la interfaz de usuario de configuración de CCM Terraform, siga las instrucciones del paso {{< ui >}}Apply Terraform Configuration{{< /ui >}}. Resuelva cualquier problema que aparezca al ejecutar `terraform plan` o `terraform apply` antes de regresar a CCM para confirmar la creación de la cuenta.

{{% /tab %}}

{{% tab "Manual" %}}

{{< img src="cloud_cost/setup/aws_manual_setup.png" alt="Formulario de configuración de Cloud Cost Management en modo manual" style="width:100%" >}}

### Requisito previo: generar un informe de costos y uso {#prerequisite-generate-a-cost-and-usage-report}

Cree un [Cost and Usage Report 2.0][202] o un [Legacy Cost and Usage Report][201] en AWS en la sección {{< ui >}}Data Exports{{< /ui >}}.

Seleccione las siguientes opciones de contenido:

* Tipo de exportación: {{< ui >}}CUR 2.0 export{{< /ui >}} o {{< ui >}}Legacy CUR export{{< /ui >}}
* {{< ui >}}Include resource IDs{{< /ui >}}
* {{< ui >}}Split cost allocation data{{< /ui >}} (Habilita la asignación de costos de ECS. También debe optar por [AWS Split Cost Allocation][210] en las preferencias de Cost Explorer).
* {{< ui >}}Refresh automatically{{< /ui >}}
* Opcional: Habilite {{< ui >}}IAM Principal Allocation Data{{< /ui >}} para la asignación de costos de Bedrock de IAM Principal a nivel de usuario granular.

Seleccione las siguientes opciones de entrega:

* Granularidad de tiempo: {{< ui >}}Hourly{{< /ui >}}
* Versiones de informe: {{< ui >}}Create new report version{{< /ui >}}
* Tipo de compresión: {{< ui >}}GZIP{{< /ui >}} o {{< ui >}}Parquet{{< /ui >}}

**Nota**: Datadog solo admite un Cost and Usage Report por cuenta miembro.

### Localice el Cost and Usage Report {#locate-the-cost-and-usage-report}

Si ha salido del informe que creó en la sección de requisitos previos, siga la documentación de AWS para [ver sus exportaciones de datos][204]. Seleccione la exportación CUR que creó, luego seleccione {{< ui >}}Edit{{< /ui >}} para ver los detalles de la exportación.

Para permitir que Datadog localice el informe de costos y uso, complete los campos con sus detalles correspondientes:

* {{< ui >}}Bucket Name{{< /ui >}}: Este es el nombre del bucket de S3 en la sección Data export storage settings.
* {{< ui >}}Bucket Region{{< /ui >}}: Esta es la región en la que se encuentra su bucket. Por ejemplo, `us-east-1`.
* {{< ui >}}Export Path Prefix{{< /ui >}}: Este es el prefijo de ruta de S3 en la sección de Data export storage settings.
  * **Nota:** Los siguientes formatos de prefijo no son compatibles: vacío, que comience con `/` (como `/` o `/cost`), o que termine con `/` (como `cost/`). Los prefijos que contienen `/` en el medio son compatibles (como `cost/hourly`).
* {{< ui >}}Export Name{{< /ui >}}: Este es el nombre de exportación (Export name) en la sección Export name.

**Nota**: Datadog solo admite informes de costos y uso (CURs) generados por AWS. No modifique ni mueva los archivos generados por AWS, ni intente proporcionar acceso a archivos generados por terceros.

{{< site-region region="gov,gov2" >}}
<div class="alert alert-danger">El punto de conexión de AWS Cost and Usage Reports se utiliza para validar los campos anteriores con la exportación CUR en su bucket de S3. Este punto de conexión no está validado por FIPS.</div>
{{< /site-region >}}

### Configure el acceso al informe de costos y uso {#configure-access-to-the-cost-and-usage-report}

[Cree una política][205] en AWS para asegurarse de que Datadog tenga permisos para acceder al CUR y al bucket de S3 en el que está almacenado. Utilice el siguiente JSON:

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

Adjunte la nueva política de S3 al rol de integración de Datadog.

1. Navegue a {{< ui >}}Roles{{< /ui >}} en la consola de IAM de AWS.
2. Localice el rol utilizado por la integración de Datadog. De forma predeterminada se llama **DatadogIntegrationRole**, pero el nombre puede variar si su organización lo ha cambiado. Haga clic en el nombre del rol para abrir la página de resumen del rol.
3. Haga clic en {{< ui >}}Attach policies{{< /ui >}}.
4. Ingrese el nombre de la política de bucket de S3 creada anteriormente.
5. Haga clic en {{< ui >}}Attach policy{{< /ui >}}.

**Nota**: Puede tomar entre 48 y 72 horas para que todos los datos disponibles se completen en su organización de Datadog después de que se genere un Informe de Costos y Uso completo. Si han pasado 72 horas y los datos aún no se han completado, comuníquese con [Soporte de Datadog][18].

[201]: https://docs.aws.amazon.com/cur/latest/userguide/dataexports-create-legacy.html
[202]: https://docs.aws.amazon.com/cur/latest/userguide/dataexports-create-standard.html
[204]: https://docs.aws.amazon.com/cur/latest/userguide/dataexports-view.html
[205]: https://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies_create-console.html
[210]: https://docs.aws.amazon.com/cur/latest/userguide/enabling-split-cost-allocation-data.html

{{% /tab %}}

{{% tab "AI Agent" %}}

El flujo **Set up with AI Agent** crea o importa un Informe de Costos y Uso y genera Terraform para que usted lo revise antes de aplicarlo. Datadog proporciona un aviso de configuración que usted ejecuta en su propio agente de codificación, como Claude Code o Cursor.

### Requisitos previos {#prerequisites}

- Una cuenta de AWS ya conectada a Datadog a través de una integración basada en roles. Las cuentas que se autentican con un par de claves de acceso no son compatibles, porque la política de lectura de informes debe adjuntarse a un rol de IAM.
- El permiso **AWS Configurations Manage**.
- Un agente de codificación instalado localmente. Datadog proporciona instrucciones para Claude Code y Cursor.

### Inicie el flujo en Datadog {#start-the-flow-in-datadog}

1. Navegue a [Setup & Configuration][300], busque {{< ui >}}Amazon Web Services{{< /ui >}} y haga clic en {{< ui >}}Add Account{{< /ui >}}.
2. Seleccione {{< ui >}}Set up with AI agent{{< /ui >}}. Datadog genera una clave de API administrada y una clave de aplicación para la sesión.
3. Inicie su agente:
    - **Claude Code**: Copie el comando generado y ejecútelo en su terminal.
    - **Cursor**: Haga clic en {{< ui >}}Open in Cursor{{< /ui >}} para descargar sus credenciales y abrir Cursor con el mensaje precargado.
4. Deje abierta la página de configuración de Datadog mientras el agente trabaja. Después de que Datadog detecte su nueva configuración, el botón {{< ui >}}Waiting for agent{{< /ui >}} cambiará a {{< ui >}}Setup complete{{< /ui >}}. Haga clic en él para finalizar.

### Complete la configuración con el agente {#complete-the-setup-with-the-agent}

1. Elija un formato de informe de costos y uso:
    - **CUR 2.0**: Recomendado y seleccionado de forma predeterminada para informes nuevos.
    - **CUR heredado**: Disponible para un informe heredado existente o como alternativa.
2. Seleccione los recursos a crear. El flujo verifica si existe un informe de costos y uso antes de crear uno nuevo. Usted puede:
    - Crear un informe de costos y uso y su bucket de S3
    - Usar un informe y un bucket de S3 existentes
3. Revise la configuración de Terraform generada y luego aplíquela para terminar de configurar la cuenta.

[300]: https://app.datadoghq.com/cost/setup

{{% /tab %}}

{{< /tabs >}}

#### Permisos para las recomendaciones de AWS Cost Optimization Hub {#permissions-for-aws-cost-optimization-hub-recommendations}

Cloud Cost Management genera algunas [recomendaciones][30] a partir de datos obtenidos de [AWS Cost Optimization Hub][31]. Para que Datadog reciba estas recomendaciones, el rol de IAM de la integración de AWS de Datadog debe incluir los siguientes permisos:

- `cost-optimization-hub:GetRecommendation`
- `cost-optimization-hub:ListRecommendations`

Estos permisos forman parte de la política de IAM predeterminada de la integración de AWS. Si configuró la integración de AWS recientemente con las [plantillas de CloudFormation o Terraform][32], ya cuenta con estos permisos.

Si configuró la integración de AWS antes de que estos permisos se agregaran a la política predeterminada, actualice su política de IAM para incluirlos. Para consultar la política actual, vea la documentación de [Amazon Web Services integration][32].

### Filtrado de cuentas {#account-filtering}

Utilice el filtrado de cuentas para controlar qué cuentas miembro de AWS se incluirán en Cloud Cost Management. Filtrar cuentas no genera costos adicionales en Datadog.

El uso del filtrado de cuentas requiere una cuenta de administración de AWS. Puede configurar filtros de cuenta después de que una cuenta se haya configurado en Cloud Cost Management.

**Nota:** Los filtros de cuenta no son compatibles con la búsqueda por etiquetas.

#### Configurar filtros de cuenta para una cuenta existente {#configure-account-filters-for-an-existing-account}

Vaya a [**Cloud Cost** > **Settings**, seleccione **Accounts**][17] y, a continuación, haga clic en {{< ui >}}Manage Account{{< /ui >}} para la cuenta de administración que desea filtrar.

{{< img src="cloud_cost/account_filtering/manage_account.png" alt="Botón Manage Account en la tarjeta de la cuenta" style="width:100%;" >}}

Haga clic en {{< ui >}}Billing dataset{{< /ui >}} para acceder a la interfaz de usuario de filtrado de cuentas.

{{< img src="cloud_cost/account_filtering/account_filtering.png" alt="Interfaz de filtrado de cuentas para filtrar cuentas miembro de AWS" style="width:100%;" >}}

### Obtención de datos históricos {#getting-historical-data}

Si configura un informe de costos y uso (Cost and Usage Report) que ya tiene datos históricos disponibles en S3, Datadog ingiere automáticamente hasta 15 meses de datos de costos históricos.

Si su informe recién configurado no tiene datos históricos, puede solicitar una carga retroactiva a AWS:

Para solicitar una carga retroactiva de datos de costos históricos de AWS:

1. [Abra una incidencia de soporte de AWS][20] y solicite una carga retroactiva de sus datos de costos.
2. Incluya el **nombre del informe** y el **periodo de facturación deseado** en su solicitud.
3. Espere a que AWS procese la solicitud de carga retroactiva.

Cuando AWS carga los datos retroactivamente, Datadog los ingiere automáticamente en un plazo de 24 horas.

AWS no puede cargar retroactivamente datos de costos anteriores a su cuenta de AWS o que reflejen una estructura anterior de AWS Organizations.

Para obtener más información, consulte la [guía de solución de problemas de AWS Cost and Usage Reports][20].

## Tipos de costo {#cost-types}

Visualice sus datos ingeridos utilizando tipos de costo predefinidos. Los tipos de costo difieren principalmente en cómo informan sobre las tasas de descuento, los planes de ahorro y las reservas.

### Bajo demanda {#on-demand}
Los costos **bajo demanda** representan el costo del uso a la tarifa pública bajo demanda publicada por AWS. Esto excluye todos los planes de ahorro, reservas, descuentos, impuestos y tarifas.

**Nota**: En la mayoría de los casos, los costos bajo demanda no son una fuente confiable para estimar los costos reales.

### Costos amortizados y no combinados {#amortized-and-unblended-costs}
Las métricas de costo **amortizado** distribuyen los ahorros por compromiso a lo largo del plazo del descuento. Esto también se denomina _base de devengo_. Las reservas y los planes de ahorro se deducen de un compromiso mensual y se aplican directamente al uso cubierto, en el momento del uso. Cualquier remanente no utilizado aparece como una tarifa.

Por el contrario, las métricas **sin combinar** muestran todos los cargos en la fecha en que se incurren. Esto también se denomina _base de costo_. Las tarifas de reserva y planes de ahorro aparecen en la fecha en que se cobraron y no se aplican directamente al uso cubierto. Después de que se finalizan los datos de facturación de un mes, las métricas sin combinar coinciden exactamente con la factura de AWS.

### Costos netos {#net-costs}
Los costos **netos** aplican descuentos privados directamente al uso. El costo de uso de un recurso específico representa el costo efectivo después de que se obtienen todos los ahorros.

Por el contrario, otras métricas muestran los descuentos privados como partidas separadas de valor negativo sin etiquetas de atribución de recursos. En lugar de atribuir los descuentos directamente al uso, esas métricas restan los descuentos del costo total.

Los costos **netos amortizados** proporcionan la representación más precisa para la asignación de costos, con todos los ahorros aplicados directamente al uso. Las métricas de costo neto están disponibles si su cuenta de AWS tiene descuentos empresariales negociados de forma privada. Si su cuenta no tiene descuentos empresariales, entonces el costo **neto amortizado** y el costo **amortizado** son equivalentes.

### Asignación de contenedores {#container-allocation}
Las métricas de **asignación de contenedores** contienen todos los mismos costos que las métricas de AWS, pero con desgloses y perspectivas adicionales para las cargas de trabajo de contenedores. Consulte [asignación de costos de contenedores][11] para obtener más detalles.

### Ejemplo {#example}
El siguiente escenario demuestra cómo se comportan los diferentes tipos de costos. Imagínese que tiene:
- Una instancia de EC2 ejecutándose durante una hora con un costo de $3 por hora de cómputo.
- Un plan de ahorro que fija el precio de este tipo de instancia en $2 por hora de cómputo.
- Un descuento EDP negociado del 10% además de todos los demás descuentos.

Así es como aparecen el costo de la instancia, el compromiso por hora del plan de ahorro y el descuento en cada tipo de costo:

|Tipo de costo |Uso |Plan de ahorro |Descuento | Explicación |
|:---------|-|-|-|:------------------------------------------------|
|Bajo demanda |$3.00|||Esta es la tarifa pública bajo demanda.|
|Sin combinar |$3.00|$2.00|-$0.20|La tarifa recurrente del plan de ahorro y el descuento EDP son partidas separadas, no asociadas con un recurso específico. (**Nota:** el costo del recurso de $3 se compensa con `SavingsPlanNegation`.) |
|Sin combinar neto||$1.80||La tarifa recurrente del plan de ahorro aparece como una partida con el descuento aplicado; el costo no está asociado con un recurso específico.|
|Amortizado |$2.00||-$0.20|El descuento del plan de ahorro se aplica directamente al costo del recurso. El descuento EDP es una partida separada. |
|Amortizado neto |$1.80|||Los descuentos del plan de ahorro y EDP se aplican directamente al costo del recurso. |
|Amortizado neto - Recursos compartidos asignados |$1.80|||El mismo costo que el amortizado neto, pero este costo puede desglosarse aún más por dimensiones de Kubernetes y etiquetas de pod. |

### Resumen de métricas de costo {#cost-metrics-summary}

En general:
- `aws.cost.net.amortized.shared.resources.allocated` proporciona la asignación de costos más completa para cargas de trabajo y equipos específicos.
- Si no tiene asignación de costos de contenedor, use `aws.cost.net.amortized`.
- Si no tiene costos amortizados netos, use `aws.cost.amortized.shared.resources.allocated` o `aws.cost.amortized`.

| Métricas               | Descripción           |
| -------------------- | --------------------- |
| `aws.cost.net.amortized.shared.resources.allocated` | Todos sus costos netos amortizados de AWS, con desgloses e información adicional para cargas de trabajo de contenedores. Requiere [asignación de costos de contenedores][11].|
| `aws.cost.net.amortized` | Costos netos amortizados, sin desgloses de costos de contenedores. |
| `aws.cost.net.unblended` | Costos netos no combinados, sin desgloses de costos de contenedores. Coincide con la factura de AWS, con descuentos especializados calculados previamente dentro de los costos de uso. |
| `aws.cost.amortized.shared.resources.allocated` | Todos sus costos amortizados de AWS, con desgloses e información adicional para cargas de trabajo de contenedores. Requiere [asignación de costos de contenedores][11].|
| `aws.cost.amortized` | Costos amortizados, sin desgloses de costos de contenedores. |
| `aws.cost.unblended` | Costos no combinados, sin desgloses de costos de contenedores. Coincide con la factura de AWS. |
| `aws.cost.ondemand`  | Costos basados en la tarifa de lista proporcionada por AWS, excluyendo todos los planes de ahorro, reservas, descuentos, impuestos y tarifas. |

## Cómo Datadog enriquece sus datos de costos de AWS con etiquetas {#how-datadog-enriches-your-aws-cost-data-with-tags}

Datadog enriquece automáticamente sus datos de costos de AWS con etiquetas de múltiples fuentes. Para obtener una descripción general completa de cómo se aplican las etiquetas a los datos de costos, consulte [Tags][19].

Las siguientes fuentes de etiquetas están disponibles para AWS:

- Columnas del informe de costos y uso (Cost and Usage Report)
- Etiquetas de recursos de AWS
- Etiquetas de cuenta de AWS
- Etiquetas de integración de AWS
- Etiquetas predeterminadas
- Etiquetas de carga de trabajo de contenedor
- Canalizaciones de etiquetas

### Columnas del informe de costos y uso {#cost-and-usage-report-columns}

Todas las columnas con valores de cadena del [Informe de costos y uso (CUR) de AWS][6] se agregan como etiquetas en las métricas de costos.

Para garantizar la coherencia, Datadog normaliza las claves de etiqueta usando guiones bajos y minúsculas. Por ejemplo, la columna CUR `lineItem/ResourceId` se asigna a la clave de etiqueta `line_item/resource_id`. Los valores de las etiquetas generalmente no se modifican, manteniendo las mayúsculas y minúsculas exactas y la mayoría de los caracteres especiales.

**Ejemplos:**

|Columna CUR|Valor CUR|Etiqueta Cloud Cost|
|---|---|---|
|lineItem/ResourceId|i-12345678a9b12cd3e|line_item/resource_id:i-12345678a9b12cd3e|
|product/region|us-east-1|product/region:us-east-1|
|product/usagetype|DataTransfer-Regional-Bytes|product/usagetype:DataTransfer-Regional-Bytes|

Consulte la [documentación de AWS CUR 2.0][33] para obtener más información sobre columnas adicionales en la exportación de CUR 2.0.

### Etiquetas de recursos de AWS {#aws-resource-tags}

Las [etiquetas de recursos de AWS][12] son etiquetas definidas por el usuario que aparecen en la consola de AWS al ver un recurso en particular, como una instancia de EC2 o un bucket de S3.

Cuando habilita la integración de Datadog con AWS, Datadog recopila automáticamente las etiquetas de recursos para la mayoría de los recursos de AWS. Estas etiquetas se aplican a todos los costos encontrados en el CUR para un recurso determinado. Las etiquetas de recursos se recuperan regularmente y se aplican a los datos de costos a partir del día en que se crean o modifican. Los valores históricos de las etiquetas no se sobrescriben cuando las etiquetas cambian.

Si la integración de AWS no está habilitada, puede habilitar el enriquecimiento de etiquetas de recursos activando las [etiquetas de asignación de costos][13] en la facturación de AWS. Esto le permite seleccionar un subconjunto de claves de etiqueta de recurso para incluirlas como columnas en el CUR de AWS. Datadog incluye automáticamente esas columnas como etiquetas al procesar el CUR.

### Etiquetas de organización y cuenta de AWS {#aws-organization-and-account-tags}
AWS Organizations admite [etiquetas definidas por el usuario][14] en unidades organizativas y cuentas. Datadog obtiene y aplica automáticamente estas etiquetas a los datos de costos. Las etiquetas de cuenta se aplican a todo el uso asociado con esas cuentas. Las etiquetas de organización se aplican a todos los datos de facturación de la cuenta pagadora correspondiente.

_Requiere la integración de AWS de Datadog en la cuenta de la organización._

### Etiquetas de integración de AWS {#aws-integration-tags}

Las etiquetas de integración de AWS son etiquetas configuradas en el mosaico de integración de AWS en la página de integraciones de Datadog. Se aplican a todos los costos encontrados en el CUR para la cuenta de AWS asociada.

### Etiquetas predeterminadas {#out-of-the-box-tags}
Datadog añade etiquetas predeterminadas a los datos de costos ingeridos para ayudarle a desglosar y asignar mejor sus costos. Estas etiquetas se derivan de su [Cost and Usage Report (CUR)][6] y facilitan el descubrimiento y la comprensión de los datos de costos.

Las siguientes etiquetas predeterminadas están disponibles para filtrar y agrupar datos:

| Etiqueta                          | Descripción       |
| ---------------------------- | ----------------- |
| `aws_product`                | El servicio de AWS que se está facturando.|
| `aws_product_family`         | La categoría del servicio de AWS que se está facturando (por ejemplo, Compute o Storage).|
| `aws_management_account_name`| El nombre de la cuenta de administración de AWS asociada con el elemento.|
| `aws_management_account_id`  | El ID de la cuenta de administración de AWS asociado con el elemento.|
| `aws_member_account_name`    | El nombre de la cuenta miembro de AWS asociada con el elemento.|
| `aws_member_account_id`      | El ID de la cuenta de miembro de AWS asociado con el elemento.|
| `aws_cost_type`              | El tipo de cargo cubierto por este elemento (por ejemplo, uso o impuesto).|
| `aws_pricing_term`           | Si el uso es reservado, de spot o bajo demanda.|
| `aws_reservation_arn`        | El ARN de la instancia reservada de la que se benefició el elemento.|
| `aws_savings_plan_arn`       | El ARN del plan de ahorro del que se benefició el elemento.|
| `aws_usage_type`             | Los detalles de uso del elemento (por ejemplo, BoxUsage:i3.8xlarge).|
| `aws_operation`              | La operación asociada con el elemento (por ejemplo, RunInstances).|
| `aws_region`                 | La región asociada con el elemento (por ejemplo, us-east-1).|
| `aws_availability_zone`      | La zona de disponibilidad asociada con el elemento.|
| `aws_resource_id`            | El ID del recurso asociado con el elemento.|
| `aws_instance_type`          | El tipo de instancia del elemento.|
| `aws_instance_family`        | La familia de instancias asociada con su elemento (por ejemplo, optimizada para almacenamiento).|
| `aws_datatransfer_type`      | El tipo de transferencia de datos asociado con el elemento (por ejemplo, entre zonas o entre regiones).|
| `aws_datatransfer_direction` | La dirección de la transferencia de datos asociada con el elemento (por ejemplo, entrante o saliente).|
| `is_aws_ec2_compute`         | Si el uso está relacionado con EC2 compute.|
| `is_aws_ec2_compute_on_demand`| Si el uso es bajo demanda.|
| `is_aws_ec2_compute_reservation`| Si el uso está asociado con una Reserved Instance.|
| `is_aws_ec2_capacity_reservation`| Si el uso está asociado con una Capacity Reservation.|
| `is_aws_ec2_spot_instance`   | Si el uso está asociado con una Spot Instance.|
| `is_aws_ec2_savings_plan`    | Si el uso está asociado con un Savings Plan.|
| `aws_bill_entity` | El vendedor de AWS con el que está su cuenta. Las transacciones pueden ser una compra de AWS Marketplace (`AWS Marketplace`) o una compra de otros servicios de AWS (`AWS`). |
| `aws_bill_type` | El tipo de factura que cubre este informe (como `Purchase`). |
| `aws_cost_type` | El tipo de cargo que cubre la partida (como `SavingsPlanCoveredUsage`). |
| `aws_discount_lease_term` | La duración del tiempo durante el cual se reserva una Reserved Instance. |
| `aws_discount_purchase_option` | Cómo eligió pagar por una reserva (como `All Upfront`). |
| `aws_ec2_compute_product_family` | El tipo de uso para una partida de EC2 Compute (como `BoxUsage` o `SpotUsage`). |
| `aws_pricing_usage_unit` | La unidad de precios que AWS utilizó para calcular el costo de uso (como `Hours`). |
| `aws_reservation_modification_status` | Indica si el arrendamiento de RI fue modificado o no (como `Manual`). |
| `bill/billing_entity` | El vendedor de AWS con el que está su cuenta. Las transacciones pueden ser una compra de AWS Marketplace (`AWS Marketplace`) o una compra de otros servicios de AWS (`AWS`). |
| `bill/bill_type` | El tipo de factura que cubre este informe (como `Purchase`). |
| `bill/invoicing_entity` | La entidad de AWS que emite la factura. |
| `bill/payer_account_id` | El ID de cuenta de la cuenta pagadora. Para una organización en AWS Organizations, este es el ID de cuenta de la cuenta de administración. |
| `is_aws_ec2_compute_savings_plan` | `true` para partidas que representan el uso de EC2 Compute, pagado mediante un Savings Plan. |
| `line_item/currency_code` | La moneda en la que se muestra esta partida (`USD` de forma predeterminada). |
| `line_item/legal_entity` | El proveedor de sus servicios de AWS. |
| `line_item/line_item_type` | El tipo de cargo que cubre la partida (como `Credit`). |
| `line_item/operation` | La operación específica de AWS que cubre la partida (como `RunInstances`). |
| `line_item/product_code` | El código del producto medido (como `Amazon EC2` para Amazon Elastic Cloud Compute). |
| `line_item/resource_id` | El ID de recurso individual asociado con la partida (opcional). |
| `line_item/tax_type` | El tipo de impuesto que AWS aplicó a la partida. |
| `line_item/usage_account_id` | El ID de la cuenta que utilizó la partida. |
| `line_item/usage_type` | Los detalles de uso de la partida (como `USW2-BoxUsage:m2.2xlarge`). |
| `pricing/lease_contract_length` | La cantidad de tiempo durante la cual se reserva la RI. |
| `pricing/purchase_option` | Cómo eligió pagar la partida (como `All Upfront`). |
| `pricing/term` | Si su uso de AWS es `Reserved` o `On-Demand`. |
| `pricing/unit` | La unidad de precios que AWS utilizó para calcular el costo de uso (como `Hours`). |
| `reservation/availability_zone` | La zona de disponibilidad del recurso asociado con la partida (como `us-east-1`). |
| `reservation/modification_status` | Muestra si el arrendamiento de la RI se modificó o no se alteró (como `Manual`). |
| `reservation/reservation_arn` | El ARN de la RI de la que se benefició la partida. |
| `reservation/subscription_id` | El ID único que asigna la partida con la oferta asociada. |
| `savings_plan/instance_type_family` | La familia de instancias que está asociada con el uso especificado (como `m4`). |
| `savings_plan/offering_type` | El tipo de Savings Plan adquirido (como `ComputeSavingsPlans`). |
| `savings_plan/payment_option` | Las opciones de pago disponibles para el Savings Plan (como `All Upfront`). |
| `savings_plan/purchase_term` | Describe la duración o el plazo del Savings Plan (como `1yr`). |
| `savings_plan/region` | La región de AWS que aloja los servicios de AWS (como `US East (N. Virginia)`). |
| `savings_plan/savings_plan_arn` | El identificador único del Plan de ahorro. |

#### Correlación de costos y observabilidad {#cost-and-observability-correlation}

Ver los costos en el contexto de los datos de observabilidad es importante para entender cómo los cambios en la infraestructura afectan los costos, identificar por qué cambian los costos y optimizar la infraestructura tanto para los costos como para el rendimiento. Datadog actualiza las etiquetas de identificación de recursos en los datos de costos para los principales productos de AWS a fin de simplificar la correlación de las métricas de observabilidad y costos.

Por ejemplo, para visualizar el costo y la utilización de cada base de datos RDS, puede crear una tabla con `aws.cost.amortized`, `aws.rds.cpuutilization` y `aws.rds.freeable_memory` (o cualquier otra métrica de RDS) y agrupar por `dbinstanceidentifier`. Para ver el uso y los costos de Lambda lado a lado, puede graficar `aws.lambda.concurrent_executions` y `aws.cost.amortized` agrupados por `functionname`.

Las siguientes etiquetas predeterminadas están disponibles:

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
| queue         | `queuename`|
| sns         | `topicname`|
| elb (aplicación, gateway, red) | `loadbalancer`|
| elb (el resto de los costos) | `loadbalancername` |

### Orquestadores de contenedores {#container-orchestrators}

La asignación de costos de contenedores agrega etiquetas de las cargas de trabajo que incurren en costos. Los ejemplos incluyen etiquetas de pods y nodos de Kubernetes y tareas y contenedores de ECS.

_Requiere [asignación de costos de contenedores][11] y se aplica solo a las métricas de `shared.resources.allocated`._

### Canalización de etiquetas {#tag-pipelines}

Finalmente, se aplican todos sus conjuntos de reglas de [canalización de etiquetas][15], lo que proporciona una asignación de costos completa cuando el etiquetado de infraestructura no es posible. Las canalizaciones de etiquetas son la capa de enriquecimiento final y agregan nuevas etiquetas a sus datos de costos.

## Billing Conductor {#billing-conductor}
[AWS Billing Conductor][16] es un servicio de facturación personalizado para socios de canal de AWS Marketplace y organizaciones que tienen requisitos de contracargo.
Billing Conductor permite a los clientes crear una segunda versión pro forma de sus costos para compartirla con sus clientes o propietarios de cuentas.
Las tarifas de facturación, los créditos y cargos, y los costos generales se pueden personalizar a su discreción. También puede seleccionar qué cuentas incluir en el CUR.

**Limitaciones importantes**:
- Los informes de costos y uso pro forma no incluyen descuentos ni impuestos, lo que dificulta comparar los costos en Datadog con AWS Cost Explorer.
- Agregar cuentas a un grupo de facturación afecta cómo se comparten las Reservations y los Savings Plans entre las cuentas de AWS.

Para crear un CUR de Billing Conductor, siga la [guía del usuario de AWS Cost and Usage Reports][8]. Asegúrese de que el CUR cumpla con los [requisitos de Datadog][9].
Después de crear el CUR de Billing Conductor, siga las instrucciones de Cloud Cost Management anteriores para configurarlo en Datadog.

## Lecturas adicionales {#further-reading}
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
[30]: /es/cloud_cost_management/recommendations/
[31]: https://docs.aws.amazon.com/cost-management/latest/userguide/cost-optimization-hub.html
[32]: /es/integrations/amazon_web_services/
[33]: https://docs.aws.amazon.com/cur/latest/userguide/table-dictionary-cur2.html