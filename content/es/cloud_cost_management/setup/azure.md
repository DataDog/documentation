---
aliases:
- /es/cloud_cost_management/azure/
further_reading:
- link: /cloud_cost_management/
  tag: Documentación
  text: Cloud Cost Management
- link: /cloud_cost_management/setup/aws
  tag: Documentación
  text: Obtener información sobre tu factura de AWS
- link: /cloud_cost_management/setup/google_cloud
  tag: Documentación
  text: Obtener información sobre tu factura de Google Cloud
- link: /cloud_cost_management/oracle
  tag: Documentación
  text: Obtén información sobre tu factura de Oracle
title: Azure
---


## Información general

Para utilizar Azure Cloud Cost Management en Datadog, debes configurar la integración de Azure y Datadog y crear exportaciones **amortizadas** y **actuales** en Azure. Además, Datadog debe tener permisos para leer las exportaciones del contenedor.

Datadog proporciona visibilidad de costes a nivel de suscripción, grupo de recursos y cuenta de facturación. Los contratos de cliente de Microsoft (MCA) pueden establecerse en los tres ámbitos. Las cuentas de pago por uso (PAYG) están en fase de vista previa. Ponte en contacto con el [soporte de Datadog][11] si tienes algún problema con la configuración.

Para determinar tu tipo de cuenta, consulta la [documentación de Azure][10]. **Nota:** Si tu tipo de cuenta aparece como "Microsoft Online Services Program", entonces tu cuenta es de pago por uso (PAYG).

## Configuración

Puedes configurarlo utilizando la [API][13], [Terraform][14], o directamente en Datadog siguiendo las instrucciones que se indican a continuación.

{{% site-region region="us3" %}}
**Nota**: Si estás utilizando el sitio **US3**, es posible que hayas configurado la integración de Datadog Azure Native utilizando el [método de recurso de Datadog][1] a través del portal de Azure. Para admitir Cloud Cost Management, necesitas [crear un registro de aplicación][2].


[1]: https://www.datadoghq.com/blog/azure-datadog-partnership/
[2]: /es/integrations/azure/?tab=azurecliv20#setup
{{% /site-region %}}

### Configurar la integración de Azure
Ve a [Ajustes y configuración][3] y selecciona una cuenta de Azure en el menú para obtener los costes. Si no ves tu cuenta de Azure en la lista, consulta [integración de Azure][4] para añadirla.

### Generar exportaciones de costes

Necesitas generar exportaciones para dos tipos de datos: **actual** y **amortizado**. Datadog recomienda utilizar el mismo contenedor de almacenamiento para ambas exportaciones.

1. Ve a [Cost Management | Configuration][5] (Gestión de costes | Configuración) en **Tools** > **Cost Management** > **Settings** > **Configuration** (Herramientas > Gestión de costes > Ajustes > Configuración) en el portal de Azure y, luego, haz clic en **Exports** (Exportaciones).
  {{< img src="cloud_cost/azure_export_path.png" alt="En el portal de Azure la opción Exportaciones resaltada en la navegación" style="width:100%" >}}
2. Selecciona el ámbito de exportación situado junto al filtro de búsqueda.

   **Nota:** El ámbito debe ser **cuenta de facturación**, **suscripción** o **grupo de recursos**.
3. Una vez seleccionado el ámbito, haz clic en **Schedule export** (Programar horario de exportación).

   {{< img src="cloud_cost/azure_exports_page.png" alt="En el portal de Azure, el botón de ámbito de exportación y programar horario resaltado" style="width:100%" >}}

4. Selecciona la plantilla **Cost and usage (actual + amortized)** (Coste y uso (real + amortizado)).
    {{< img src="cloud_cost/azure_new_export.png" alt="Nueva página de exportación con la plantilla y las opciones manuales resaltadas" style="width:100%" >}}

5. Haz clic en **Edit** (Editar) en cada exportación y confirma los siguientes datos:
    - Frecuencia: **Exportación diaria de los costes del mes hasta la fecha**
    - Versión del conjunto de datos:
      - Versiones compatibles: `2021-10-01`, `2021-01-01`, `2020-01-01`
      - Versiones no compatibles: `2019-10-01`
    {{< img src="cloud_cost/improved_export.png" alt="Detalles de exportación con Métrica: Actual, Tipo de exportación: Diaria y Versión del conjunto de datos" style="width:100%" >}}

6. Introduce un "Prefijo de exportación" para las nuevas exportaciones. Por ejemplo, introduce `datadog` para evitar conflictos con las exportaciones existentes.

7. En la pestaña **Destination** (Destino), selecciona los siguientes detalles:
    - Elige **Azure blob storage** como tipo de almacenamiento.
    - Elige una cuenta de almacenamiento, contenedor y un directorio para las exportaciones.
        - **Nota:** No utilices caracteres especiales como `.` en estos campos.
        - **Nota:** Las exportaciones de facturación pueden almacenarse en cualquier suscripción. Si creas exportaciones para varias suscripciones, Datadog recomienda almacenarlas en la misma cuenta de almacenamiento. Los nombres de las exportaciones deben ser únicos.
    - Elige **CSV** o **Parquet** como formato.
    - Elige el tipo de compresión. Para **CSV**: **Gzip** y **None** (Ninguno) son compatibles. Para **Parquet**: **Snappy** y **None** (Ninguno).
    - Asegúrate de que está marcada la opción **File partitioning** (Partición de archivos).
    - Asegúrate de que **Overwrite data** (Sobrescribir datos) no está marcado.
        - **Nota:** Datadog no es compatible con el ajuste Sobrescribir datos. Si el ajuste estaba marcado anteriormente, asegúrate de limpiar los archivos del directorio o moverlos a otro.

   {{< img src="cloud_cost/improved_export_destination_2.png" alt="Destino de exportación con partición de archivos y los ajustes de Sobreescribir datos" >}}

8. En la pestaña **Review + create** (Revisar+ crear), selecciona **Create** (Crear).
9. Para procesar más rápido, genera las primeras exportaciones manualmente haciendo clic en **Run Now** (Ejecutar ahora).

{{< img src="cloud_cost/run_now.png" alt="Haz clic en el botón Ejecutar ahora en el panel lateral de exportación para generar exportaciones" style="width:50%" >}}

### Proporcionar acceso a tus exportaciones en Datadog 

{{< tabs >}}
{{% tab "Facturación Cuentas" %}}

1. En la pestaña Exportaciones, haz clic en la Cuenta de almacenamiento de la exportación para navegar hasta ella.
2. Haz clic en la pestaña Containers (Contenedores).
3. Elige el contenedor de almacenamiento en el que se encuentran tus facturas.
4. Selecciona la pestaña Control de acceso (IAM) y haz clic en **Add** (Añadir).
5. Selecciona **Add role assignment** (Añadir la asignación de roles).
6. Elige **Storage Blob Data Reader** (Lector de datos de bloque de almacenamiento) y haz clic en Next (Siguiente).
7. Asigna estos permisos a uno de los Registros de aplicaciones que hayas conectado con Datadog.
    - Haz clic en **Select members** (Seleccionar miembros), elige el nombre del registro de aplicación y haz clic en **Select** (Seleccionar). **Nota**: Si no ves tu registro de aplicación en la lista, empieza a escribir el nombre para que la interfaz de usuario se actualice y la muestre, si está disponible.
    - Selecciona **Review + assign** (Revisar + asignar).

Si tus exportaciones se encuentran en contenedores de almacenamiento diferentes, repite los pasos del uno al siete para el otro contenedor de almacenamiento.
{{% /tab %}}

{{% tab "Suscripciones y grupos de recursos" %}}

1. En la pestaña Exportaciones, haz clic en la Cuenta de almacenamiento de la exportación para navegar hasta ella.
2. Haz clic en la pestaña Containers (Contenedores).
3. Elige el contenedor de almacenamiento en el que se encuentran tus facturas.
4. Selecciona la pestaña Control de acceso (IAM) y haz clic en **Add** (Añadir).
5. Selecciona **Add role assignment** (Añadir la asignación de roles).
6. Elige **Storage Blob Data Reader** (Lector de datos de bloque de almacenamiento) y haz clic en Next (Siguiente).
7. Asigna estos permisos a uno de los Registros de aplicaciones que hayas conectado con Datadog.
    - Haz clic en **Select members** (Seleccionar miembros), elige el nombre de Registro de la aplicación y haz clic en **Select** (Seleccionar).
    - Selecciona **Review + assign** (Revisar + asignar).

Si tus exportaciones se encuentran en contenedores de almacenamiento diferentes, repite los pasos del uno al siete para el otro contenedor de almacenamiento.

### Configura el Acceso de lector de gestión de costes
**Nota:** No necesitas configurar este acceso si tu contexto es **Cuenta de facturación**.

1. Navega hasta tus [suscripciones][1] y haz clic en el nombre de tu suscripción.
2. Selecciona la pestaña Control de acceso (IAM).
3. Haz clic en **Add** (Añadir) y, a continuación, en **Add role assignment** (Añadir asignación de roles).
4. Selecciona **Cost Management Reader** (Lector de gestión de costes) y, a continuación, haz clic en Next (Siguiente).
5. Asigna estos permisos al registro de la aplicación.

De este modo se garantiza la total exactitud de los costes al permitir cálculos periódicos de costes con Microsoft Cost Management.

**Nota**: Los datos pueden tardar entre 48 y 72 horas en estabilizarse en Datadog.

[1]: https://portal.azure.com/#view/Microsoft_Azure_Billing/SubscriptionsBlade

{{% /tab %}}
{{< /tabs >}}

**Nota**: Si tienes los permisos adecuados en el registro de la aplicación, pero tu red está bloqueando las IPs de webhook de Datadog, puedes encontrar errores que parecen estar relacionados con el permiso.

Para resolver esto, añade las IPs de webhook de Datadog a tu lista de permisos de red visitando la sección `Webhooks` en `https://ip-ranges.`{{< region-param key="dd_site" code="true" >}}.

### Configurar el coste de nube en Datadog
Ve a [Configuración][3] y sigue los pasos.

### Obtener datos históricos

Azure exporta datos de costes a partir del mes en que se creó la exportación. Datadog incorpora automáticamente hasta 15 meses de datos de costes históricos disponibles a partir de estas exportaciones. Puedes rellenar manualmente hasta 12 meses de datos de costes de Azure mediante la interfaz de usuario de Azure Cost Exports.

1. Completa las instrucciones de las secciones **Setup** (Configuración) y **Configure Cloud Cost in Datadog** (Configurar el coste de nube en Datadog) anteriores.
1. Espera hasta 24 horas a que los datos de costes aparezcan en Datadog para asegurarte de que la integración funciona de principio a fin antes de iniciar el proceso de relleno. **Nota:** Si ya has completado la configuración y los datos de costes aparecen en Datadog, puedes continuar directamente con los pasos de relleno que se indican a continuación.
1. Exporta manualmente un informe **real** y **amortizado** para cada mes calendario. Por ejemplo, para junio de 2025:
    1. Editar la exportación
    2. Cambiar el tipo de exportación a "Exportación única"
    3. Establecer Desde en 06-01-2025 **Nota:** Este debe ser el primer día del mes.
    4. Fijar Fin en 30-06-2025 **Nota:** Debe ser el último día del mes.
    5. Guardar la exportación **Nota:** Esto ejecuta automáticamente la exportación
    6. Esperar a que finalice la exportación
1. Revertir tanto las exportaciones **actuales** como las **amortizadas** a su estado original para reanudar las exportaciones diarias:
    1. Editar la exportación
    2. Cambiar el tipo de exportación a "Exportación diaria de los costes del mes hasta la fecha"
    3. Guardar la exportación

Datadog detecta e ingiere automáticamente estos datos, que deberían aparecer en Datadog en un plazo de 24 horas.

También puedes crear datos históricos en tu cuenta de almacenamiento utilizando la [API de Microsoft][6] o creando un [tique de soporte con Microsoft][7]. Asegúrate de que la estructura de archivos y la partición siguen el formato de las exportaciones programadas.

### Tipos de costes

Puedes visualizar tus datos ingeridos utilizando los siguientes tipos de costes:

| Tipo de coste            | Descripción           |
| -------------------- | --------------------- |
| `azure.cost.amortized` | Coste basado en los índices de descuento aplicados más la distribución de los prepagos en función del uso durante el plazo de descuento (base devengada).|
| `azure.cost.actual` | El coste se muestra como el importe facturado en el momento del uso (base de efectivo). Los costes reales incluyen descuentos privados, así como descuentos de instancias reservadas y planes de ahorro como tipos de cargos independientes.|
| `azure.cost.discounted.ondemand` | Coste basado en la tarifa de lista proporcionada por Azure, tras descuentos negociados de forma privada. Para obtener el verdadero coste bajo demanda, divide esta métrica por (1 - <negotiated_discount>). Por ejemplo, si tienes un descuento de tarifa plana del 5% en todos los productos Azure, si tomas esta métrica y la divides por 0,95 (1-,05) obtendrás el verdadero precio bajo demanda.|

### Etiquetas predefinidas

Datadog enriquece automáticamente tus datos de costes de Azure con etiquetas de múltiples fuentes. Para obtener una visión general de cómo se aplican las etiquetas a los datos de costes, consulta [Etiquetas][12].

Las siguientes etiquetas predefinidas se derivan de tu [informe de costes de uso][9] y facilitan la detección y la comprensión de los datos de costes:

| Nombre de la etiqueta                         | Descripción de la etiqueta       |
| ---------------------------- | ----------------- |
| `accountname` | Nombre de la cuenta asociada a la partida. |
| `accountownerid` | ID del propietario asociado a la partida. |
| `billingaccountid` | ID de la cuenta de facturación asociada a la partida. |
| `billingaccountname` | Nombre de la cuenta de facturación asociada a la partida. |
| `billingcurrency` | Moneda asociada a la cuenta de facturación. |
| `billingperiod` | Periodo de facturación del cargo. |
| `billingperiodenddate` | Fecha de finalización del periodo de facturación. |
| `billingperiodstartdate` | Fecha de inicio del periodo de facturación. |
| `billingprofileid` | ID único de la inscripción al Enterprise Agreement. |
| `billingprofilename` | Nombre de la inscripción al Enterprise Agreement. |
| `chargetype` | Tipo de cargo que cubre la partida: `Usage`, `Purchase` o `Refund`. |
| `consumedservice` | Nombre del servicio al que está asociada la partida. |
| `costcenter` | Centro de costes definido para la suscripción al seguimiento de los costes. |
| `costinbillingcurrency` | Coste en la moneda de facturación antes de créditos o impuestos. |
| `costinpricingcurrency` | Coste en la moneda de fijación del precio antes de créditos o impuestos. |
| `currency` | Moneda asociada a la cuenta de facturación. |
| `date` | Fecha de uso o compra del cargo. |
| `effectiveprice` | Precio unitario combinado del periodo. Los precios combinados compensan cualquier fluctuación en el precio unitario, como el escalonamiento gradual, que reduce el precio a medida que aumenta la cantidad. |
| `exchangeratedate` | Fecha en la que se definió el tipo de cambio. |
| `exchangeratepricingtobilling` | Tipo de cambio utilizado para convertir el coste en la moneda de fijación del precio a la moneda de facturación. |
| `frequency` | Indica si se espera que un cargo se repita. Los cargos pueden producirse una sola vez (`OneTime`), repetirse mensual o anualmente (`Recurring`) o basarse en el uso (`Usage`). |
| `InvoiceId` | ID único del documento que aparece en el PDF de la factura. |
| `invoicesectionid` | ID de la sección de la factura MCA. |
| `invoicesectionname` | El nombre del departamento de Enterprise Agreement (EA). |
| `isazurecrediteligible` | `true` si el cargo puede pagarse con créditos Azure. |
| `location` | Localización del centro de datos donde se ejecuta el recurso. |
| `metercategory` | Servicio de nivel superior al que pertenece este uso (como `Networking`). |
| `meterid` | Identificador único del contador. |
| `metername` | Información de uso de la partida (como `L8s v2` o `General Purpose Data Stored`). |
| `meterregion` | La localización del centro de datos para la servicios con precios basados en la localización (como `West US 2`). Utiliza `resourcelocation` para ver los datos de localización sin `N/A`. |
| `metersubcategory` | Nombre de la categoría de subclasificación del contador (como `General Purpose - Storage`). Utiliza `metername` o `metercategory` para ver la clasificación de nivel superior sin `N/A`. |
| `offerid` | Nombre de la oferta adquirida. |
| `partnumber` | ID utilizado para obtener la tarificación específica del contador. |
| `planname` | Nombre del plan del marketplace si se adquirió a través del marketplace. |
| `PreviousInvoiceId` | Referencia a una factura original si esta partida es un reembolso. |
| `PricingCurrency` | Moneda utilizada en la tarificación basada en precios negociados. |
| `pricingmodel` | Tipo de uso (como `Reservation`). |
| `ProductId` | ID de un producto Azure específico. |
| `productname` | Nombre del producto Azure a nivel granular, como tipo de máquina virtual o disco y región. |
| `productorderid` | ID del pedido del producto. Utiliza `productname` para ver información clara del productor sin `N/A`. |
| `productordername` | Nombre del pedido del producto. Utiliza `productname` para ver información clara del producto sin `N/A`. |
| `publishername` | Editor de servicios del marketplace. |
| `publishertype` | Tipo de editor: `Microsoft` para cuentas Microsoft Customer Agreement y `Azure` para cuentas Enterprise Agreement. |
| `reservationid` | ID de la instancia de reserva adquirida. Si ves valores `N/A`, se trata de recursos `OnDemand`, que pueden comprobarse utilizando la etiqueta `pricingmodel`. |
| `reservationname` | Nombre de la instancia de reserva adquirida. Si ves valores `N/A`, se trata de recursos `OnDemand`, que pueden comprobarse utilizando la etiqueta `pricingmodel`. |
| `resourcegroup` | Nombre del grupo de recursos en el que se encuentra el recurso. No todos los cargos proceden de recursos desplegados en grupos de recursos. |
| `resourceid` | ID del recurso Azure. |
| `resourcelocation` | Localización del centro de datos donde se ejecuta el recurso (como `westus2`). |
| `resourcename` | Nombre del recurso. No todos los cargos proceden de recursos desplegados. |
| `resourcetype` | Tipo de recurso de Azure. |
| `servicefamily` | Familia de servicios a la que pertenece el servicio (como `Compute`). La etiqueta `consumedservice` tiene mayor información sobre los tipos de infraestructuras. |
| `ServicePeriodEndDate` | Fecha de finalización del periodo del servicio de Azure. |
| `ServicePeriodStartDate` | Fecha de inicio del periodo del servicio de Azure. |
| `subscriptionid` | ID de la suscripción a Azure. |
| `subscriptionname` | Nombre de la suscripción a Azure. |
| `term` | Describe la duración o plazo del Plan de Ahorro en meses (como `12`). |
| `unitofmeasure` | Unidad de medida de facturación del servicio. Por ejemplo, los servicios de cálculo se facturan por hora. |


#### Correlación entre costes y observabilidad

Visualizar los costes en el contexto de los datos de observabilidad es importante para entender cómo los cambios en la infraestructura afectan a los costes, identificar por qué cambian los costes y optimizar la infraestructura tanto para los costes como para el rendimiento. Datadog añade la etiqueta  `name` en los datos de costes de los principales productos Azure para simplificar la correlación entre observabilidad y métricas de costes.

Por ejemplo, para ver el coste y la utilización de cada máquina virtual Azure, puedes hacer una tabla con `azure.cost.amortized` y `azure.vm.network_in_total` (o cualquier otra métrica de máquina virtual) y agrupar por `name`. O, para ver el uso y los costes de almacenamiento uno al lado del otro, puedes filtrar en `metercategory:Storage` y hacer un gráfico con `azure.storage.transactions` y `azure.cost.amortized` agrupados por `name`.

## Referencias adicionales
{{< partial name="whats-next/whats-next.html" >}}

[1]:  https://www.datadoghq.com/blog/azure-datadog-partnership/
[2]:  https://docs.datadoghq.com/es/integrations/azure/?tab=azurecliv20#setup
[3]:  https://app.datadoghq.com/cost/setup?cloud=azure
[4]:  https://app.datadoghq.com/integrations/azure
[5]:  https://portal.azure.com/#view/Microsoft_Azure_CostManagement/Menu/~/config
[6]:  https://learn.microsoft.com/en-us/azure/cost-management-billing/costs/tutorial-export-acm-data?tabs=azure-cli
[7]:  https://support.microsoft.com
[8]:  https://learn.microsoft.com/en-us/azure/cost-management-billing/costs/tutorial-improved-exports
[9]:  https://learn.microsoft.com/en-us/azure/cost-management-billing/understand/download-azure-daily-usage
[10]: https://docs.azure.cn/en-us/cost-management-billing/manage/resolve-past-due-balance#check-the-type-of-your-account
[11]: /es/help/
[12]: /es/cloud_cost_management/tags
[13]: /es/api/latest/cloud-cost-management/#create-cloud-cost-management-azure-configs
[14]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/azure_uc_config