---
aliases:
- /es/cloud_cost_management/azure/
further_reading:
- link: /cloud_cost_management/
  tag: Documentación
  text: Cloud Cost Management
- link: /cloud_cost_management/setup/aws
  tag: Documentación
  text: Obtenga información sobre su factura de AWS
- link: /cloud_cost_management/setup/google_cloud
  tag: Documentación
  text: Obtenga información sobre su factura de Google Cloud
- link: /cloud_cost_management/oracle
  tag: Documentación
  text: Obtenga información sobre su factura de Oracle
title: Azure
---
## Descripción general {#overview}

Para usar Azure Cloud Cost Management en Datadog, debe configurar la integración de Datadog Azure y crear exportaciones de **Costo amortizado** y **Costo real** en Azure. Además, Datadog debe tener permisos para leer las exportaciones del contenedor.

Datadog proporciona visibilidad de costos a nivel de suscripción, grupo de recursos y cuenta de facturación. Los acuerdos de cliente de Microsoft (MCA) se pueden configurar en los tres contextos. Para determinar su tipo de cuenta, consulte la [documentación de Azure][10].

<div class="alert alert-info">
<strong>Cuentas de pago por uso (PAYG)</strong>
<p>Datadog Cloud Cost Management requiere exportaciones de <strong>Costo real</strong> y <strong>Costo amortizado</strong> desde Azure. Las suscripciones PAYG (Microsoft Online Services Program) generalmente solo proporcionan exportaciones de <strong>Detalles de uso (solo uso)</strong>, por lo que no se pueden configurar para CCM. Para conocer los tipos de exportación disponibles para cada tipo de cuenta de Azure, consulte la <a href="https://learn.microsoft.com/en-us/azure/cost-management-billing/costs/tutorial-improved-exports">documentación de exportaciones de Cost Management</a> de Microsoft.</p>
<p>Si su suscripción es PAYG, considere una de las siguientes opciones:</p>
<ul>
<li>Migre a un Contrato de cliente de Microsoft (MCA) o un Contrato Enterprise (EA), los cuales admiten los tipos de exportación requeridos.</li>
<li>Comuníquese con el soporte de Microsoft Azure para confirmar los tipos de exportación disponibles para su suscripción.</li>
</ul>
<p>Para obtener ayuda con la configuración de Datadog CCM o para discutir opciones, comuníquese con el <a href="/help/">soporte de Datadog</a>.</p>
</div>

## Configuración {#setup}

Puede realizar la configuración mediante la [API][13], [Terraform][14] o directamente en Datadog siguiendo las instrucciones a continuación.

{{% site-region region="us3" %}}
**Nota**: Si está utilizando el sitio **US3** de Datadog, es posible que haya configurado la integración nativa de Datadog Azure mediante el [método de recursos de Datadog][1] a través de Azure Portal. Para admitir Cloud Cost Management, debe [crear un registro de aplicación][2].


[1]: https://www.datadoghq.com/blog/azure-datadog-partnership/
[2]: /es/integrations/azure/?tab=azurecliv20#setup
{{% /site-region %}}

### Configure la integración de Azure {#configure-the-azure-integration}
Navegue a [Setup & Configuration][3], agregue una cuenta de Azure y siga los pasos para configurar la integración de Azure.

{{< tabs >}}

{{% tab "Terraform" %}}

{{< img src="cloud_cost/setup/azure_terraform_setup.png" alt="Página de configuración de CCM con la opción Terraform seleccionada, mostrando el paso 1 y el paso 2 expandidos para configurar el contexto y los detalles de exportación" style="width:100%" >}}

### Seleccione el tipo de contexto {#select-scope-type}

Use el menú desplegable para seleccionar el tipo de contexto para su cuenta. CCM admite los tipos de contexto de cuenta de facturación, suscripción y grupo de recursos.

### Seleccione los recursos a crear {#select-the-resources-to-create}

La configuración de Terraform admite tres configuraciones según sus recursos de Azure existentes:

* **Nueva configuración**: Seleccione {{< ui >}}Create storage account and container{{< /ui >}} para crear una cuenta de almacenamiento, un contenedor y exportaciones de costos.
* **Cuenta de almacenamiento y contenedor existentes**: Deseleccione {{< ui >}}Create storage account and container{{< /ui >}} y seleccione {{< ui >}}Create cost exports{{< /ui >}} para usar el almacenamiento existente pero crear nuevas exportaciones de costos.
* **Cuenta de almacenamiento, contenedor y exportaciones de costos existentes**: Deseleccione ambas opciones para usar el almacenamiento y las exportaciones de costos existentes.

### Configure el contexto y los detalles de exportación {#configure-the-scope-and-export-details}

Ingrese los siguientes detalles para su configuración:

* {{< ui >}}Billing account or Subscription ID{{< /ui >}}: Dependiendo del contexto seleccionado en el paso 1, el ID de cuenta de facturación o el ID de suscripción correspondiente.
* {{< ui >}}Resource group name{{< /ui >}}: El nombre de su grupo de recursos existente en el contexto seleccionado. Se requiere un grupo de recursos preexistente para la configuración de Terraform.
* {{< ui >}}Location{{< /ui >}}: La ubicación de Azure de su grupo de recursos. Por ejemplo, `East US 2`.
* {{< ui >}}Storage account and container name{{< /ui >}}: Dependiendo de los recursos que haya seleccionado crear, los nombres de su cuenta de almacenamiento y contenedor nuevos o preexistentes.
* {{< ui >}}Actual cost export name and path{{< /ui >}}: El nombre y la ruta de su exportación de costos reales.
* {{< ui >}}Amortized cost export name and path{{< /ui >}}: El nombre y la ruta de su exportación de costos amortizados.
  * **Nota:** Los siguientes formatos de prefijo no son compatibles: vacío, que comience con `/` (como `/` o `/cost`), o que termine con `/` (como `cost/`). Los prefijos que contienen `/` en el medio son compatibles (como `cost/hourly`).

### Copie el HCL de Terraform del recurso de Azure generado y aplique los cambios {#copy-generated-azure-resource-terraform-hcl-and-apply-changes}

Después de completar los campos en el Paso 2, el Paso 3 habilita y muestra el HCL de Terraform generado. Siga las instrucciones para configurar sus archivos de configuración de Terraform con este código. Resuelva cualquier problema que aparezca al ejecutar `terraform plan` o `terraform apply` antes de regresar a CCM para configurar las exportaciones de costos.

### Acceda a la consola de Azure para configurar las exportaciones {#access-azure-console-to-configure-exports}

{{< img src="cloud_cost/setup/azure_toggle_file_partitioning.png" alt="Active la partición de archivos para ambas exportaciones" style="width:50%" >}}

Abra el enlace de la consola de Azure para localizar sus exportaciones de costos. Si es necesario, cambie el contexto actual al correcto para sus exportaciones. Para ambas exportaciones, la real y la amortizada, selecciónelas y haga clic en {{< ui >}}Edit{{< /ui >}} para activar la partición de archivos si aún no está habilitada.

{{< img src="cloud_cost/run_now.png" alt="Haga clic en el botón Ejecutar ahora en el panel lateral de exportación para generar las exportaciones" style="width:50%" >}}

Guarde los cambios de la partición de archivos y haga clic en {{< ui >}}Run Now{{< /ui >}}. Regrese a CCM una vez que ambas ejecuciones de exportación se hayan realizado correctamente.

### Copie el HCL de Datadog generado y aplique los cambios {#copy-generated-datadog-hcl-and-apply-changes}

Siga las instrucciones en el paso {{< ui >}}Apply Datadog Terraform HCL{{< /ui >}}. Resuelva cualquier problema que aparezca al ejecutar `terraform plan` o `terraform apply` antes de regresar a CCM para confirmar la creación de la cuenta.

{{% /tab %}}

{{% tab "Manual" %}}

{{< img src="cloud_cost/setup/azure_manual_setup.png" alt="Página de configuración de CCM con la opción Manual seleccionada, mostrando el Paso 1 y el Paso 2 expandidos para configurar el tipo de contexto y seleccionar las exportaciones existentes" style="width:100%" >}}

### Genere exportaciones de costos {#generate-cost-exports}

Debe generar exportaciones para dos tipos de datos: **real** y **amortizado**. Datadog recomienda usar el mismo contenedor de almacenamiento para ambas exportaciones.

1. Navegue a [Cost Management | Configuration][5] en {{< ui >}}Tools{{< /ui >}} > {{< ui >}}Cost Management{{< /ui >}} > {{< ui >}}Settings{{< /ui >}} > {{< ui >}}Configuration{{< /ui >}} del portal de Azure y haga clic en {{< ui >}}Exports{{< /ui >}}.
  {{< img src="cloud_cost/azure_export_path.png" alt="En el portal de Azure resaltando la opción Exportaciones en la navegación" style="width:100%" >}}
2. Seleccione el contexto de exportación ubicado junto al filtro de búsqueda.

   **Nota:** El contexto debe ser {{< ui >}}billing account{{< /ui >}}, {{< ui >}}subscription{{< /ui >}} o {{< ui >}}resource group{{< /ui >}}.
3. Después de seleccionar el contexto, haga clic en {{< ui >}}Schedule export{{< /ui >}}.

   {{< img src="cloud_cost/azure_exports_page.png" alt="En el portal de Azure resaltando el contexto de exportación y el botón de programación" style="width:100%" >}}

4. Seleccione la plantilla {{< ui >}}Cost and usage (actual + amortized){{< /ui >}}
    {{< img src="cloud_cost/azure_new_export.png" alt="Página de nueva exportación con las opciones de plantilla y manual resaltadas" style="width:100%" >}}

5. Haga clic en {{< ui >}}Edit{{< /ui >}} en cada exportación y confirme los siguientes detalles:
    - Frecuencia: {{< ui >}}Daily export of month-to-date costs{{< /ui >}}
    - Control de versiones de conjuntos de datos:
      - Versiones admitidas: `2021-10-01`, `2021-01-01`, `2020-01-01`
      - Versiones no admitidas: `2019-10-01`
    {{< img src="cloud_cost/improved_export.png" alt="Detalles de exportación con métrica: Actual, tipo de exportación: diaria y control de versiones de conjuntos de datos" style="width:100%" >}}

6. Ingrese un "Prefijo de exportación" para las nuevas exportaciones. Por ejemplo, ingrese `datadog` para evitar conflictos con exportaciones existentes.

7. En la pestaña {{< ui >}}Destination{{< /ui >}}, seleccione los siguientes detalles:
    - Elija {{< ui >}}Azure blob storage{{< /ui >}} como tipo de almacenamiento.
    - Elija una cuenta de almacenamiento, un contenedor y un directorio para las exportaciones.
        - **Nota:** No utilice caracteres especiales como `.` en estos campos.
        - **Nota:** Las exportaciones de facturación pueden almacenarse en cualquier suscripción. Si está creando exportaciones para varias suscripciones, Datadog recomienda almacenarlas en la misma cuenta de almacenamiento. Los nombres de las exportaciones deben ser únicos.
    - Elija {{< ui >}}CSV{{< /ui >}} o {{< ui >}}Parquet{{< /ui >}} como formato.
    - Elija el tipo de compresión. Para {{< ui >}}CSV{{< /ui >}}: se admiten {{< ui >}}Gzip{{< /ui >}} y {{< ui >}}None{{< /ui >}}. Para {{< ui >}}Parquet{{< /ui >}}: se admiten {{< ui >}}Snappy{{< /ui >}} y {{< ui >}}None{{< /ui >}}.
    - Asegúrese de que {{< ui >}}File partitioning{{< /ui >}} esté marcado.
    - Asegúrese de que {{< ui >}}Overwrite data{{< /ui >}} no esté marcado.
        - **Nota:** Datadog no admite la configuración {{< ui >}}Overwrite data{{< /ui >}}. Si la configuración estaba marcada anteriormente, asegúrese de limpiar los archivos en el directorio o moverlos a otro.

   {{< img src="cloud_cost/improved_export_destination_2.png" alt="Destino de exportación con configuraciones de partición de archivos y sobrescritura de datos" >}}

8. En la pestaña {{< ui >}}Review + create{{< /ui >}}, seleccione {{< ui >}}Create{{< /ui >}}.
9. Genere los primeros exports manualmente haciendo clic en {{< ui >}}Run Now{{< /ui >}}. Espere a que se complete correctamente antes de continuar.

{{< img src="cloud_cost/run_now.png" alt="Haga clic en el botón Ejecutar ahora en el panel lateral de exportación para generar las exportaciones" style="width:50%" >}}

### Proporcione a Datadog acceso a sus exports {#provide-datadog-access-to-your-exports}
Otorgue a Datadog acceso de lectura a la cuenta de almacenamiento donde se guardan sus exports.

{{% collapse-content title="Cuentas de facturación" level="h4" %}}

1. En la pestaña Exports, haga clic en la cuenta de almacenamiento de la exportación para navegar a ella.
2. Haga clic en la pestaña Containers.
3. Elija el contenedor en el que se encuentran sus facturas.
4. Seleccione la pestaña {{< ui >}}Access Control (IAM){{< /ui >}} y haga clic en {{< ui >}}Add{{< /ui >}}.
5. Elija {{< ui >}}Add role assignment{{< /ui >}}.
6. Elija {{< ui >}}Storage Blob Data Reader{{< /ui >}}, luego haga clic en {{< ui >}}Next{{< /ui >}}.
7. Asigne estos permisos a uno de los registros de la aplicación que haya conectado con Datadog.
    - Haga clic en {{< ui >}}Select members{{< /ui >}}, seleccione el nombre del registro de la aplicación y haga clic en {{< ui >}}Select{{< /ui >}}. **Nota**: Si no ve su registro de la aplicación en la lista, comience a escribir el nombre para que la interfaz se actualice y lo muestre, si está disponible.
    - Seleccione {{< ui >}}Review + assign{{< /ui >}}.

Si sus exports están en diferentes contenedores de almacenamiento, repita los pasos del uno al siete para el otro contenedor de almacenamiento.

{{% /collapse-content %}} 
{{% collapse-content title="Suscripciones y grupos de recursos" level="h4" %}}
1. En la pestaña Exports, haga clic en la cuenta de almacenamiento de la exportación para navegar a ella.
2. Haga clic en la pestaña Containers.
3. Elija el contenedor en el que se encuentran sus facturas.
4. Seleccione la pestaña {{< ui >}}Access Control (IAM){{< /ui >}} y haga clic en {{< ui >}}Add{{< /ui >}}.
5. Elija {{< ui >}}Add role assignment{{< /ui >}}.
6. Elija {{< ui >}}Storage Blob Data Reader{{< /ui >}}, luego haga clic en {{< ui >}}Next{{< /ui >}}.
7. Asigne estos permisos a uno de los registros de la aplicación que haya conectado con Datadog.
    - Haga clic en {{< ui >}}Select members{{< /ui >}}, seleccione el nombre del registro de la aplicación y haga clic en {{< ui >}}Select{{< /ui >}}.
    - Seleccione {{< ui >}}Review + assign{{< /ui >}}.

Si sus exports están en diferentes contenedores de almacenamiento, repita los pasos del uno al siete para el otro contenedor de almacenamiento.
{{% /collapse-content %}}

### Configure el acceso de lector de Cloud Cost Management {#configure-cost-management-reader-access}
**Nota:** No necesita configurar este acceso si su contexto es {{< ui >}}Billing Account{{< /ui >}}.

1. Vaya a sus [suscripciones][1] y haga clic en el nombre de su suscripción.
2. Seleccione la pestaña {{< ui >}}Access Control (IAM){{< /ui >}}.
3. Haga clic en {{< ui >}}Add{{< /ui >}}, luego en {{< ui >}}Add role assignment{{< /ui >}}.
4. Elija {{< ui >}}Cost Management Reader{{< /ui >}}, luego haga clic en {{< ui >}}Next{{< /ui >}}.
5. Asigne estos permisos al registro de la aplicación.

Esto ayuda a garantizar una precisión total de los costos al permitir cálculos de costos periódicos en Microsoft Cost Management.

**Nota**: Los datos pueden tardar entre 48 y 72 horas después de la configuración en estabilizarse en Datadog.

[1]: https://portal.azure.com/#view/Microsoft_Azure_Billing/SubscriptionsBlade

{{% /tab %}}
{{< /tabs >}}



**Nota**: Si tiene los permisos adecuados en el registro de la aplicación pero su red está bloqueando las IP de webhook de Datadog, es posible que encuentre errores que parecen estar relacionados con los permisos.

Para resolver esto, agregue las IP de webhook de Datadog a su lista de permitidos de red visitando la sección `Webhooks` en `https://ip-ranges.`{{< region-param key="dd_site" code="true" >}}.

### Configure Cloud Cost en Datadog {#configure-cloud-cost-in-datadog}
Vaya a [Setup & Configuration][3] y siga los pasos.

### Realice la migración de exports de un EA a un MCA {#migrate-exports-from-an-ea-to-an-mca}

Azure no migra automáticamente las definiciones de exports de costos de un Contrato Enterprise (EA) a un Contrato de Cliente de Microsoft (MCA). Para obtener más información, consulte la [documentación de incorporación de MCA][15] de Microsoft.

El siguiente proceso conserva los datos históricos de EA para las configuraciones de Datadog que utilizan un contexto de cuenta de facturación, suscripción o grupo de recursos.

1. Registre la siguiente configuración para los exports de EA tanto reales como amortizados:
   * Nombre del export, incluyendo mayúsculas y minúsculas
   * Cuenta de almacenamiento
   * Contenedor
   * Directorio de almacenamiento y prefijo del export
   * Versión del conjunto de datos, formato y tipo de compresión
1. Después de que se ejecuten los exports finales del período de EA, deshabilite los exports programados de EA, pero mantenga sus definiciones. No permita que los exports programados de EA y MCA escriban en el mismo destino al mismo tiempo.
1. Deje la configuración de Azure Cloud Cost Management en Datadog habilitada y sin cambios. Para un contexto de cuenta de facturación, Datadog conserva el ID de EA.
1. Después de que el MCA se vuelva activo, vuelva a crear los exports reales y amortizados en el contexto de MCA correspondiente utilizando Terraform o el portal de Azure. Utilice los nombres del export, la cuenta de almacenamiento, el contenedor, el directorio y el prefijo registrados de los exports de EA.
   * Para Terraform, siga el [flujo de configuración de Terraform][19] a través de los pasos de HCL de recursos de Azure. No aplique nuevo HCL de Datadog ni reemplace la configuración existente de Cloud Cost Management.
   * Para el portal de Azure, siga las [instrucciones de export de costos manuales][17].

Datadog continúa leyendo los archivos históricos de EA desde el destino existente y agrega datos de MCA al mismo historial de costos.

<div class="alert alert-warning">
<strong>No complete fechas de EA desde un contexto de MCA</strong>
<p>Un export de MCA no incluye costos del EA anterior. Ejecutar un export de MCA único para un rango de fechas de EA puede escribir un manifiesto vacío más reciente en el destino compartido. Datadog lee el export más reciente de cada mes, por lo que el manifiesto vacío puede poner en cero los datos de EA que se ingirieron anteriormente.</p>
</div>

Para completar datos después de una migración de EA a MCA, utilice el acuerdo que cubrió las fechas solicitadas:

* Para fechas anteriores a la fecha de vigencia de MCA, ejecute los exports únicos reales y amortizados desde el contexto de EA anterior.
* Para fechas en o después de la fecha de vigencia de MCA, ejecute las exportaciones únicas reales y amortizadas desde el contexto de MCA.

Si el contexto de EA anterior no está disponible, comuníquese con el Soporte de Microsoft para solicitar los exports históricos. Si cambió un nombre o destino de export, o eliminó y volvió a crear la configuración de Datadog, comuníquese con [Soporte de Datadog][16]. No cree exports adicionales únicos o programados hasta que el Soporte de Datadog revise la configuración.

### Obtención de datos históricos {#getting-historical-data}

Azure exporta datos de costos a partir del mes en que creó el export. Datadog ingiere automáticamente hasta 15 meses de datos de costos históricos disponibles de estos exports. Puede rellenar manualmente hasta 12 meses de datos de costos de Azure utilizando la interfaz de usuario de Azure Cost Exports.

**Nota**: Si migró de un EA a un MCA, siga las [instrucciones de migración][18] antes de ejecutar un export histórico.

1. Complete las instrucciones en las secciones **Configuración** y **Configurar Cloud Cost en Datadog** anteriores.
1. Espere hasta 24 horas para que los datos de costos aparezcan en Datadog y asegúrese de que la integración funcione de principio a fin antes de comenzar el proceso de backfill. **Nota:** Si ya completó la configuración y los datos de costos aparecen en Datadog, puede proceder directamente a los pasos de backfill a continuación.
1. Exporte manualmente un informe **real** y **amortizado** para cada mes calendario. Por ejemplo, para junio de 2025:
    1. Editar el export
    2. Cambie el tipo de export a {{< ui >}}One-time export{{< /ui >}}
    3. Establezca {{< ui >}}From{{< /ui >}} en 06-01-2025 **Nota:** Este debe ser el primer día del mes.
    4. Establezca {{< ui >}}End{{< /ui >}} en 06-30-2025 **Nota:** Este debe ser el último día del mes.
    5. Guarde el export **Nota:** Esto ejecuta el export automáticamente
    6. Espere a que el export termine de ejecutarse
1. Revierta tanto los exports **reales** como los **amortizados** a su estado original para reanudar los exports diarios:
    1. Editar el export
    2. Cambie el tipo de export a {{< ui >}}Daily export of month-to-date costs{{< /ui >}}
    3. Guarde el export

Datadog descubre e ingiere automáticamente estos datos, y deberían aparecer en Datadog en un plazo de 24 horas.

También puede crear datos históricos en su cuenta de almacenamiento utilizando el [Microsoft API][6] o creando un [ticket de soporte con Microsoft][7]. Asegúrese de que la estructura de archivos y la partición sigan el formato de las exportaciones programadas.

### Tipos de costo {#cost-types}

Puede visualizar sus datos ingeridos utilizando los siguientes tipos de costo:

| Tipo de costo            | Descripción           |
| -------------------- | --------------------- |
| `azure.cost.amortized` | Costo basado en las tasas de descuento aplicadas más la distribución de los pagos anticipados a lo largo del uso durante el plazo del descuento (base de devengo).|
| `azure.cost.actual` | Costo mostrado como el monto cobrado en el momento del uso (base de efectivo). Los costos reales incluyen descuentos privados, así como descuentos de instancias reservadas y planes de ahorro como tipos de cargo separados.|
| `azure.cost.discounted.ondemand` | Costo basado en la tarifa de lista proporcionada por Azure, después de los descuentos negociados de forma privada. Para obtener el costo real bajo demanda, divida esta métrica por (1 - <negotiated_discount>). Por ejemplo, si tiene un descuento de tarifa plana del 5% en todos los productos de Azure, tomar esta métrica y dividirla por .95 (1-.05) proporciona el precio real bajo demanda.|

### Etiquetas predeterminadas {#out-of-the-box-tags}

Datadog enriquece automáticamente sus datos de costos de Azure con etiquetas de múltiples fuentes. Para obtener una descripción general completa de cómo se aplican las etiquetas a los datos de costos, consulte [Tags][12].

Las siguientes etiquetas predeterminadas se derivan de su [informe de costos de uso][9] y facilitan la detección y comprensión de los datos de costos:

| Nombre de la etiqueta                         | Descripción de la etiqueta       |
| ---------------------------- | ----------------- |
| `accountname` | El nombre de la cuenta asociada con la partida. |
| `accountownerid` | El ID del propietario asociado con la partida. |
| `billingaccountid` | El ID de la cuenta de facturación asociada con la partida. |
| `billingaccountname` | El nombre de la cuenta de facturación asociada con la partida. |
| `billingcurrency` | La moneda asociada con la cuenta de facturación. |
| `billingperiod` | El período de facturación del cargo. |
| `billingperiodenddate` | La fecha de finalización del período de facturación. |
| `billingperiodstartdate` | La fecha de inicio del período de facturación. |
| `billingprofileid` | El identificador único de la inscripción del Contrato Enterprise. |
| `billingprofilename` | El nombre de la inscripción del Contrato Enterprise. |
| `chargetype` | El tipo de cargo que cubre la partida: `Usage`, `Purchase` o `Refund`. |
| `consumedservice` | El nombre del servicio con el que está asociada la partida. |
| `costcenter` | El centro de costos definido para la suscripción para el seguimiento de costos. |
| `costinbillingcurrency` | El costo en la moneda de facturación antes de créditos o impuestos. |
| `costinpricingcurrency` | El costo en la moneda de precios antes de créditos o impuestos. |
| `currency` | La moneda asociada con la cuenta de facturación. |
| `date` | La fecha de uso o compra del cargo. |
| `effectiveprice` | El precio unitario combinado para el período. Los precios combinados promedian cualquier fluctuación en el precio unitario, como la escala gradual, que reduce el precio a medida que aumenta la cantidad. |
| `exchangeratedate` | La fecha en la que se estableció el tipo de cambio. |
| `exchangeratepricingtobilling` | El tipo de cambio utilizado para convertir el costo en la moneda de precios a la moneda de facturación. |
| `frequency` | Indica si se espera que un cargo se repita. Los cargos pueden ocurrir una vez (`OneTime`), repetirse de forma mensual o anual (`Recurring`), o basarse en el uso (`Usage`) |
| `InvoiceId` | El ID de documento único que aparece en el PDF de la factura. |
| `invoicesectionid` | El ID de la sección de factura de MCA. |
| `invoicesectionname` | El nombre del departamento del Contrato Enterprise (EA). |
| `isazurecrediteligible` | `true` si el cargo es elegible para pagarse mediante créditos de Azure. |
| `location` | La ubicación del centro de datos donde se ejecuta el recurso. |
| `metercategory` | El servicio de nivel superior al que pertenece este uso (como `Networking`). |
| `meterid` | El ID único del medidor. |
| `metername` | Los detalles de uso de la partida (como `L8s v2` o `General Purpose Data Stored`). |
| `meterregion` | La ubicación del centro de datos para los servicios con precios basados en la ubicación (como `West US 2`). Use `resourcelocation` para ver los datos de ubicación sin `N/A`. |
| `metersubcategory` | El nombre de la categoría de subclasificación del medidor (como `General Purpose - Storage`). Use `metername` o `metercategory` para ver la clasificación de nivel superior sin `N/A`. |
| `offerid` | El nombre de la oferta adquirida. |
| `partnumber` | El ID utilizado para obtener precios específicos del medidor. |
| `planname` | El nombre del plan de marketplace si se adquirió a través de marketplace. |
| `PreviousInvoiceId` | Referencia a una factura original si esta partida es un reembolso. |
| `PricingCurrency` | La moneda utilizada al realizar la valoración basada en precios negociados. |
| `pricingmodel` | El tipo de uso (como `Reservation`). |
| `ProductId` | El identificador de un producto de Azure específico. |
| `productname` | El nombre del producto de Azure a un nivel granular, como el tipo de VM o disco y la región. |
| `productorderid` | El ID del pedido de producto. Use `productname` para ver información de productos de nivel superior sin `N/A`. |
| `productordername` | El nombre del pedido de producto. Use `productname` para ver información de productos de nivel superior sin `N/A`. |
| `publishername` | El editor de servicios de marketplace. |
| `publishertype` | El tipo de editor: `Microsoft` para cuentas de Contrato de cliente de Microsoft y `Azure` para cuentas de Contrato Enterprise. |
| `reservationid` | El ID de la instancia de reserva comprada. Si ve valores `N/A`, estos son recursos `OnDemand`, que se pueden verificar mediante la etiqueta `pricingmodel`. |
| `reservationname` | El nombre de la instancia de reserva comprada. Si ve valores `N/A`, estos son recursos `OnDemand`, que se pueden verificar mediante la etiqueta `pricingmodel`. |
| `resourcegroup` | El nombre del grupo de recursos en el que se encuentra el recurso. No todos los cargos provienen de recursos implementados en grupos de recursos. |
| `resourceid` | El ID del recurso de Azure. |
| `resourcelocation` | La ubicación del centro de datos donde se ejecuta el recurso (como `westus2`). |
| `resourcename` | El nombre del recurso. No todos los cargos provienen de recursos implementados. |
| `resourcetype` | El tipo de recurso de Azure. |
| `servicefamily` | La familia de servicios a la que pertenece el servicio (como `Compute`). La etiqueta `consumedservice` tiene información más detallada sobre los tipos de infraestructura. |
| `ServicePeriodEndDate` | La fecha de finalización del período de servicio de Azure. |
| `ServicePeriodStartDate` | La fecha de inicio del período de servicio de Azure. |
| `subscriptionid` | El ID de la suscripción de Azure. |
| `subscriptionname` | El nombre de la suscripción de Azure. |
| `term` | Describe la duración o el plazo del Plan de ahorro en meses (como `12`). |
| `unitofmeasure` | La unidad de medida para la facturación del servicio. Por ejemplo, los servicios de cómputo se facturan por hora. |


#### Correlación de costos y observabilidad {#cost-and-observability-correlation}

Ver los costos en el contexto de los datos de observabilidad es importante para entender cómo los cambios en la infraestructura afectan los costos, identificar por qué cambian los costos y optimizar la infraestructura tanto para los costos como para el rendimiento. Datadog agrega la etiqueta `name` en los datos de costos para los principales productos de Azure a fin de simplificar la correlación de las métricas de observabilidad y costos.

Por ejemplo, para ver el costo y la utilización de cada VM de Azure, puede crear una tabla con `azure.cost.amortized` y `azure.vm.network_in_total` (o cualquier otra métrica de VM) y agrupar por `name`. O, para ver el uso y los costos de almacenamiento lado a lado, puede filtrar por `metercategory:Storage` y graficar `azure.storage.transactions` y `azure.cost.amortized` agrupados por `name`.

## Lecturas adicionales {#further-reading}
{{< partial name="whats-next/whats-next.html" >}}

[1]:  https://www.datadoghq.com/blog/azure-datadog-partnership/
[2]:  https://docs.datadoghq.com/es/integrations/azure/?tab=azurecliv20#setup
[3]:  https://app.datadoghq.com/cost/setup
[4]:  https://app.datadoghq.com/integrations/azure
[5]:  https://portal.azure.com/#view/Microsoft_Azure_CostManagement/Menu/~/config
[6]:  https://learn.microsoft.com/en-us/azure/cost-management-billing/costs/tutorial-export-acm-data?tabs=azure-cli
[7]:  https://support.microsoft.com
[8]:  https://learn.microsoft.com/en-us/azure/cost-management-billing/costs/tutorial-improved-exports
[9]:  https://learn.microsoft.com/en-us/azure/cost-management-billing/understand/download-azure-daily-usage
[10]: https://docs.azure.cn/en-us/cost-management-billing/manage/resolve-past-due-balance#check-the-type-of-your-account
[12]: /es/cloud_cost_management/tags
[13]: /es/api/latest/cloud-cost-management/#create-cloud-cost-management-azure-configs
[14]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/azure_uc_config
[15]: https://learn.microsoft.com/en-us/azure/cost-management-billing/microsoft-customer-agreement/onboard-microsoft-customer-agreement
[16]: /es/help/
[17]: ?tab=manual#generate-cost-exports
[18]: #migrate-exports-from-an-ea-to-an-mca
[19]: ?tab=terraform