---
further_reading:
- link: /cloud_cost_management/
  tag: Documentación
  text: Gestión de costes en la nube
- link: /cloud_cost_management/aws
  tag: Documentación
  text: Conoce mejor tu factura de AWS
- link: /cloud_cost_management/google_cloud
  tag: Documentación
  text: Obtén información sobre tu factura de Google Cloud
title: Azure
---


## Información general

Para utilizar Azure Cloud Cost Management en Datadog, debes configurar la integración de Datadog Azure y configurar las exportaciones **amortizadas** y **actuales** en Azure. Además, Datadog debe tener permisos para leer las exportaciones del contenedor.

Datadog proporciona visibilidad de costes a nivel de Suscripción, Grupo de recursos y Cuenta de facturación. Los Contratos de cliente de Microsoft (MCA) sólo pueden establecerse a nivel de Suscripción o Grupo de recursos. Las cuentas Pay as you go (PAYG) y CSP no son compatibles.

## Configuración


{{% site-region region="us3" %}}
**Notas**:
- Si estás utilizando el sitio **US3** de Datadog, es posible que hayas configurado la integración de Datadog Azure Native utilizando el [método de recurso de Datadog][1] recomendado a través del Portal de Azure. Para admitir Cloud Cost Management, necesitas [crear un Registro de aplicación][2].
- Las exportaciones del Contrato de cliente de Microsoft deben configurarse en el nivel de suscripción. Si tienes un plan Enterprise, puedes configurar tus cuentas de facturación para integrar todas las suscripciones.
- No se admiten cuentas de pago por uso.

[1]: https://www.datadoghq.com/blog/azure-datadog-partnership/
[2]: /es/integrations/azure/?tab=azurecliv20#setup
{{% /site-region %}}

### Configurar la integración de Azure
Ve a [Ajustes y configuración][3] y selecciona una cuenta de Azure en el menú para obtener los costes. Si no ves tu cuenta de Azure en la lista, consulta [integración de Azure][4] para añadirla.

### Generar exportaciones de costes

Necesitas generar exportaciones para dos tipos de datos: **actual** y **amortizado**. Datadog recomienda utilizar el mismo contenedor de almacenamiento para ambas exportaciones.

1. Navega hasta [Exportaciones][5] en *Cost Management + Billing* (Gestión de costes + Facturación) del portal de Azure. Las pantallas del portal de Azure tienen un aspecto diferente al de las imágenes siguientes si "Improved exports (Preview)" (Mejora de las exportaciones (Vista previa)) está activada para tu cuenta, o si estás accediendo al portal de Azure a través de la dirección `https://preview.portal.azure.com`.

   {{< tabs >}}
   {{% tab "Exportaciones regulares" %}}

2. Selecciona el contexto de exportación. **Nota:** El contexto debe ser *cuentade facturación *, *suscripción* o *grupo de recursos*.
3. Una vez seleccionado el contexto, haz clic en **Add** (Añadir).

   {{< img src="cloud_cost/exports_scope.png" alt="En el portal de Azure que resalta la opción Exportaciones en la navegación y el contexto de exportación" style="width:100%" >}}

4. Selecciona los siguientes detalles de exportación:
    - Métrica: **Coste real (utilización y compras)** LUEGO **Coste amortizado (utilización y compras)**.
    - Tipo de exportación: **Exportación diaria de los costes del mes hasta la fecha**
    - Partición de archivos: `On`

   {{< img src="cloud_cost/new_export.png" alt="Detalles de exportación con Métrica: Actual, Tipo de exportación: Diaria y Partición de archivos: Activada" style="width:100%" >}}

5. Elige una cuenta de almacenamiento, contenedor y un directorio para las exportaciones.
    - **Nota:** No utilices caracteres especiales como `.` en estos campos.
    - **Nota:** Las exportaciones de facturación pueden almacenarse en cualquier suscripción. Si creas exportaciones para varias suscripciones, Datadog recomienda almacenarlas en la misma cuenta de almacenamiento. Los nombres de las exportaciones deben ser únicos.
6. Selecciona **Create** (Crear).

   {{% /tab %}}

   {{% tab "Exportaciones mejoradas (Vista previa)" %}}

2. En el panel de navegación de la izquierda, selecciona **Cost Management** (Gestión de costes) y, a continuación, **Reporting + analytics** (Informes y análisis).
3. Selecciona el contexto de exportación. **Nota:** El contexto debe ser *cuenta de facturación*, *suscripción* o *grupo de recursos*.
4. Haz clic en **Crear**.

   {{< img src="cloud_cost/improved_exports_scope.png" alt="El portal de Azure, con la opción de Exportaciones resaltada en la navegación y el contexto de exportación definido" style="width:100%" >}}

5. Selecciona "Cost and usage (actual + amortized)" (Coste y utilización (real + amortizado)).
6. Introduce un "Prefijo de exportación" para las nuevas exportaciones. Por ejemplo, introduce "Datadog" para evitar conflictos con las exportaciones existentes.
7. Haz clic en "Edit" (Editar) en cada exportación y confirma los siguientes datos:
    - Frecuencia: **Exportación diaria de los costes del mes hasta la fecha**
    - Versión del conjunto de datos:
      - Versiones compatibles: `2021-10-01`, `2021-01-01`, `2020-01-01`
      - Versiones no compatibles: `2019-10-01`

   {{< img src="cloud_cost/improved_export.png" alt="Detalles de exportación con Métrica: Actual, Tipo de exportación: Diaria y Versión del conjunto de datos" style="width:100%" >}}

8. En la pestaña de destino, selecciona los siguientes detalles:
    - Elige **Azure blob storage** como tipo de almacenamiento.
    - Elige una cuenta de almacenamiento, contenedor y un directorio para las exportaciones.
        - **Nota:** No utilices caracteres especiales como `.` en estos campos.
        - **Nota:** Las exportaciones de facturación pueden almacenarse en cualquier suscripción. Si creas exportaciones para varias suscripciones, Datadog recomienda almacenarlas en la misma cuenta de almacenamiento. Los nombres de las exportaciones deben ser únicos.
    - Elige **CSV** como formato. **No se admite parquet**.
    - Elige **Gzip** como tipo de compresión. También se admite **None** (Ninguno).
    - Asegúrate de que está marcada la opción **File partitioning** (Partición de archivos).
    - Asegúrate de que **Overwrite data** (Sobrescribir datos) no está marcado.
        - **Nota:** Datadog no es compatible con el ajuste Sobrescribir datos. Si el ajuste estaba marcado anteriormente, asegúrate de limpiar los archivos del directorio o moverlos a otro.

   {{< img src="cloud_cost/improved_export_destination.png" alt="Destino de exportación con los ajustes de Partición de archivos y Sobrescribir datos" >}}

9. Haz clic en **Next** (Siguiente) y, a continuación, en **Review + Create** (Revisar + Crear).

   {{% /tab %}}
   {{< /tabs >}}

Para procesar más rápido, genera las primeras exportaciones manualmente haciendo clic en **Run Now** (Ejecutar ahora).

{{< img src="cloud_cost/run_now.png" alt="Haz clic en el botón Ejecutar ahora en el panel lateral de exportación para generar exportaciones" style="width:50%" >}}

### Proporcionar acceso a tus exportaciones en Datadog 

{{< tabs >}}
{{% tab "Cuentas de facturación" %}}
**Nota**: Para el Contrato de cliente de Microsoft, configura en el nivel de suscripción.

1. En la pestaña Exportaciones, haz clic en la Cuenta de almacenamiento de la exportación para navegar hasta ella.
2. Haz clic en la pestaña Containers (Contenedores).
3. Elige el contenedor de almacenamiento en el que se encuentran tus facturas.
4. Selecciona la pestaña Control de acceso (IAM) y haz clic en **Add** (Añadir).
5. Selecciona **Add role assignment** (Añadir la asignación de roles).
6. Elige **Storage Blob Data Reader** (Lector de datos de bloque de almacenamiento) y haz clic en Next (Siguiente).
7. Asigna estos permisos a uno de los Registros de aplicaciones que hayas conectado con Datadog.
    - Haz clic en **Select members** (Seleccionar miembros), elige el nombre del registro de la aplicación y haz clic en **Select** (Seleccionar). **Nota:** Si no ves tu Registro de aplicación en la lista, empieza a escribir el nombre para que la interfaz de usuario se actualice y la muestre, si está disponible.
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

[1]: https://portal.azure.com/#view/Microsoft_Azure_Billing/SubscriptionsBlade

{{% /tab %}}
{{< /tabs >}}

### Configurar Costes de la nube en Datadog
Navega hasta [Setup & Configuration][3] (Ajustes y configuración) y sigue los pasos.

### Tipos de costes

Puedes visualizar tus datos ingeridos utilizando los siguientes tipos de costes:

| Tipo de coste            | Descripción           |
| -------------------- | --------------------- |
| `azure.cost.amortized` | Coste basado en los tipos de descuento aplicados más la distribución de los prepagos en función del uso durante el plazo de descuento (principio de devengo).|
| `azure.cost.actual` | El coste se muestra como el importe cobrado en el momento de la utilización (criterio de caja). Los costes reales incluyen descuentos privados, así como descuentos de instancias reservadas y planes de ahorro como tipos de cargo independientes.|
| `azure.cost.discounted.ondemand` | Coste basado en la tarifa de lista proporcionada por Azure, tras descuentos negociados de forma privada. Para obtener el verdadero coste bajo demanda, divide esta métrica por (1 - <negotiated_discount>). Por ejemplo, si tienes un descuento de tarifa plana del 5% en todos los productos de Azure, si tomas esta métrica y la divides por 0,95 (1-,05), obtendrás el verdadero precio bajo demanda.|

### Etiquetas predefinidas

Datadog añade etiquetas (tags) predefinidas a los datos de costes incorporados para que puedas desglosar y asignar mejor tus costes. Estas etiquetas se derivan de tu [informe de costes de uso][9] y facilitan el descubrimiento y la comprensión de los datos de costes.

| Nombre de la etiqueta                         | Descripción de la etiqueta       |
| ---------------------------- | ----------------- |
| `accountname` | Nombre de la cuenta asociada a la partida. |
| `accountownerid` | ID del propietario asociado a la partida. |
| `billingaccountid` | ID de la cuenta de facturación asociada a la partida. |
| `billingaccountname` | Nombre de la cuenta de facturación asociada a la partida. |
| `billingcurrency` | La divisa asociada a la cuenta de facturación. |
| `billingperiod` | El periodo de facturación de la carga. |
| `billingperiodenddate` | Fecha de finalización del periodo de facturación. |
| `billingperiodstartdate` | La fecha de inicio del periodo de facturación. |
| `billingprofileid` | El identificador único de la inscripción al Enterprise Agreement. |
| `billingprofilename` | El nombre de la inscripción al Enterprise Agreement. |
| `chargetype` | El tipo de cargo que abarca la partida: `Usage`, `Purchase`, o `Refund`. |
| `consumedservice` | El nombre del servicio al que está asociado la partida. |
| `costcenter` | El centro de costes definido para la suscripción para el seguimiento de los costes. |
| `costinbillingcurrency` | El coste en la moneda de facturación antes de créditos o impuestos. |
| `costinpricingcurrency` | El coste en la moneda de precios antes de créditos o impuestos. |
| `currency` | La divisa asociada a la cuenta de facturación. |
| `date` | La fecha de uso o compra del cargo. |
| `effectiveprice` | El precio unitario combinado del periodo. Los precios combinados compensan cualquier fluctuación en el precio unitario, como el escalonamiento gradual, que reduce el precio a medida que aumenta la cantidad. |
| `exchangeratedate` | Fecha en la que se estableció el tipo de cambio. |
| `exchangeratepricingtobilling` | Tipo de cambio utilizado para convertir el coste en la moneda de fijación del precio a la moneda de facturación. |
| `frequency` | Indica si se espera que un cargo se repita. Los cargos pueden producirse una sola vez (`OneTime`), repetirse mensual o anualmente (`Recurring`) o basarse en el uso (`Usage`). |
| `InvoiceId` | El identificador único del documento que aparece en el PDF de la factura. |
| `invoicesectionid` | El ID de la sección de la factura MCA. |
| `invoicesectionname` | El nombre del departamento de EA. |
| `isazurecrediteligible` | `true` si el cargo puede pagarse con créditos de Azure. |
| `location` | La localización de centro de datos donde se ejecuta el recurso. |
| `metercategory` | El servicio de nivel superior al que pertenece este uso (como `Networking`). |
| `meterid` | El identificador único del contador. |
| `metername` | Los detalles de uso de la partida (como `L8s v2` o `General Purpose Data Stored`). |
| `meterregion` | La localización del centro de datos para la servicios con precios basados en la localización (como `West US 2`). Utiliza `resourcelocation` para ver los datos de localización sin `N/A`. |
| `metersubcategory` | El nombre de la categoría de subclasificación del contador (como `General Purpose - Storage`). Utiliza `metername` o `metercategory` para ver la clasificación de nivel superior sin `N/A`. |
| `offerid` | El nombre de la oferta adquirida. |
| `partnumber` | El ID utilizado para obtener el precio específico del contador. |
| `planname` | El nombre del plan del mercado si se ha adquirido a través del mercado. |
| `PreviousInvoiceId` | Referencia a una factura original si esta partida es un reembolso. |
| `PricingCurrency` | Moneda utilizada en la tarificación basada en precios negociados. |
| `pricingmodel` | El tipo de uso (como `Reservation`). |
| `ProductId` | El identificador de un producto de Azure específico. |
| `productname` | El nombre del producto de Azure a nivel granular, como tipo de máquina virtual o disco y región. |
| `productorderid` | ID del pedido del producto. Utiliza `productname` para ver la información del producto de nivel superior sin `N/A`. |
| `productordername` | El nombre del pedido del producto. Utiliza `productname` para ver la información del producto de nivel superior sin `N/A`. |
| `publishername` | El editor para los servicios de mercado. |
| `publishertype` | El tipo de editor: `Microsoft` para cuentas del Contrato de cliente de Microsoft y `Azure` para cuentas de Enterprise Agreement. |
| `reservationid` | El ID de la instancia de reserva adquirida. Si ves valores `N/A`, se trata de recursos `OnDemand`, que pueden comprobarse mediante la etiqueta `pricingmodel`. |
| `reservationname` | El nombre de la instancia de reserva adquirida. Si ves valores `N/A`, se trata de recursos `OnDemand`, que pueden comprobarse mediante la etiqueta `pricingmodel`. |
| `resourcegroup` | El nombre del grupo de recursos en el que se encuentra el recurso. No todos los cargos proceden de recursos desplegados en grupos de recursos. |
| `resourceid` | El ID del recurso de Azure. |
| `resourcelocation` | La localización del centro de datos donde se ejecuta el recurso (como `westus2`). |
| `resourcename` | El nombre del recurso. No todos los cargos proceden de recursos desplegados. |
| ResourceType |  |
| `servicefamily` | La familia de servicios a la que pertenece el servicio (como `Compute`). La etiqueta `consumedservice` tiene conocimientos más profundos sobre los tipos de infraestructura. |
| `ServicePeriodEndDate` | La fecha de finalización del periodo del servicio de Azure. |
| `ServicePeriodStartDate` | Fecha de inicio del periodo de servicio de Azure. |
| `subscriptionid` | El ID de la suscripción de Azure. |
| `subscriptionname` | El nombre de la suscripción de Azure. |
| `term` | Describe la duración o plazo del Plan de Ahorro en meses (como `12`). |
| `unitofmeasure` | La unidad de medida de facturación para el servicio. Por ejemplo, los servicios de cómputo se facturan por hora. |


#### Correlación entre costes y observabilidad

Visualizar los costes en el contexto de los datos de observabilidad es importante para entender cómo afectan los cambios de infraestructura a los costes, identificar por qué cambian los costes y optimizar la infraestructura, tanto en los costes como en el rendimiento. Datadog añade la etiqueta  `name` en los datos de costes de los principales productos de AWS para simplificar la correlación entre la observabilidad y las métricas de costes.

Por ejemplo, para ver el coste y la utilización de cada VM de Azure, puedes hacer una tabla con `azure.cost.amortized` y `azure.vm.network_in_total` (o cualquier otra métrica de VM) y agrupar por `name`. O, para ver el uso y los costes de almacenamiento uno al lado del otro, puedes filtrar en `metercategory:Storage` y hacer un gráfico con `azure.storage.transactions` y `azure.cost.amortized` agrupados por `name`.


### Obtener datos históricos

Puedes crear datos históricos en tu cuenta de almacenamiento utilizando la [API de Microsoft][6] o creando un [tique de soporte con Microsoft][7] para que rellenen los datos de costes. Cloud Cost Management extrae automáticamente hasta 15 meses de datos históricos siempre que la estructura y la partición del archivo sigan el formato de las exportaciones programadas.

## Referencias adicionales
{{< partial name="whats-next/whats-next.html" >}}

[1]: https://www.datadoghq.com/blog/azure-datadog-partnership/
[2]: https://docs.datadoghq.com/es/integrations/azure/?tab=azurecliv20#setup
[3]: https://app.datadoghq.com/cost/setup?cloud=azure
[4]: https://app.datadoghq.com/integrations/azure
[5]: https://portal.azure.com/#view/Microsoft_Azure_GTM/ModernBillingMenuBlade/~/Exports
[6]: https://learn.microsoft.com/en-us/azure/cost-management-billing/costs/tutorial-export-acm-data?tabs=azure-cli
[7]: https://support.microsoft.com
[8]: https://learn.microsoft.com/en-us/azure/cost-management-billing/costs/tutorial-improved-exports
[9]: https://learn.microsoft.com/en-us/azure/cost-management-billing/understand/download-azure-daily-usage