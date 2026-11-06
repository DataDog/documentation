---
cascade:
  algolia:
    subcategory: Cloud Cost Management
    tags:
    - cloud cost
    - cloud integrations
    - cloud cost management
    - cloud cost aws
further_reading:
- link: /cloud_cost_management/aws/
  tag: Documentación
  text: Cloud Cost Management para AWS
- link: /monitors/types/cloud_cost/
  tag: Documentación
  text: Cree un monitor de costos de Cloud Cost
- link: /cloud_cost_management/tags/
  tag: Documentación
  text: Obtenga información sobre las etiquetas en Cloud Cost Management
- link: https://www.datadoghq.com/blog/control-your-cloud-spend-with-datadog-cloud-cost-management/
  tag: Blog
  text: Obtenga visibilidad y control de su gasto en la nube con Datadog Cloud Cost
    Management
- link: https://www.datadoghq.com/blog/total-cost-of-service-ownership-ccm/
  tag: Blog
  text: Analice de forma rápida y exhaustiva los costos de la nube y SaaS detrás de
    sus servicios
- link: https://www.datadoghq.com/blog/cloud-costs-study-learnings/
  tag: Blog
  text: Aprendizajes clave del estudio State of Cloud Costs
title: Cloud Cost de AWS para socios MSP
---
## Descripción general {#overview}

Esta guía explica cómo los proveedores de servicios administrados (MSP) de AWS configuran AWS Billing Conductor y generan informes de costos y uso (CUR) pro forma para que la cuenta de miembro de un cliente pueda conectarse a Datadog CCM sin exponer la cuenta de administración del MSP.

Los pasos en esta página se dividen entre lo que **usted (el socio MSP)** configura y lo que **su cliente** configura en su cuenta de miembro.

Para obtener instrucciones generales de configuración de CCM (que no sean de MSP), consulte la [guía de configuración de Datadog CCM AWS][1].

## Acerca de AWS Billing Conductor {#about-aws-billing-conductor}
[AWS Billing Conductor][2] es un servicio de facturación personalizado para socios de canal de AWS Marketplace y organizaciones que necesitan asignar los costos a sus respectivas áreas.
Billing Conductor permite a los clientes crear una segunda versión pro forma de sus costos para compartirla con sus clientes o propietarios de cuentas.
Las tarifas de facturación, los créditos y cargos, y los costos generales se pueden personalizar a su discreción. También puede seleccionar qué cuentas incluir en el CUR.

<div class="alert alert-warning">
- Los informes de costos y uso pro forma no incluyen descuentos ni impuestos, lo que dificulta comparar los costos en Datadog con AWS Cost Explorer.<br>
- Agregar cuentas a un grupo de facturación cambia la forma en que se comparten Reservations y Savings Plan, lo que puede generar diferencias de costos a nivel de cuenta.<br>
- Datadog Cloud Cost Management se utiliza mejor para analizar tendencias de costos, detectar anomalías, obtener información para optimizar costos y gestionar flujos de trabajo de FinOps, en lugar de usarlo como sustituto de las facturas de AWS.
</div>

Para crear un CUR de Billing Conductor, siga la [guía del usuario de AWS Cost and Usage Reports][3]. Asegúrese de que el CUR cumpla con los [requisitos de Datadog][4].  

## Requisitos previos {#prerequisites}

Antes de comenzar, verifique lo siguiente:

**Acceso del MSP**  
Acceso a la **cuenta de administración** para configurar Billing Conductor ({{< ui >}}Pricing Rules{{< /ui >}}, {{< ui >}}Pricing Plans{{< /ui >}}, {{< ui >}}Billing Groups{{< /ui >}}).

**Permisos del cliente**  
El cliente debe tener permiso para:
- implementar pilas de CloudFormation  
- crear y administrar informes de costos y uso (CUR)  
- otorgar a Datadog acceso al bucket de S3 que contiene el CUR  

**Integración de Datadog**  
La integración de AWS debe estar instalada para la **cuenta de miembro** en Datadog.  
Para obtener más información, consulte la [configuración de la integración de AWS][5].

## Configurar AWS Billing Conductor {#configure-aws-billing-conductor}

Estos pasos **deben completarse en la cuenta de administración del MSP**.

### Paso 1: Crear una regla de precios {#step-1-create-a-pricing-rule}

Billing Conductor calcula los costos pro forma ajustando las **tarifas bajo demanda públicas de AWS** usando un {{< ui >}}Discount{{< /ui >}} o {{< ui >}}Markup{{< /ui >}}.

Debe elegir explícitamente entre estas opciones:
- {{< ui >}}Discount{{< /ui >}}: aplica un descuento porcentual a los precios bajo demanda públicos  
- {{< ui >}}Markup{{< /ui >}}: aplica un aumento porcentual a los precios bajo demanda públicos  

<div class="alert alert-info">
Ingresar 0 % (ya sea {{< ui >}}Discount{{< /ui >}} o {{< ui >}}Markup{{< /ui >}}) resulta en precios bajo demanda públicos. El rango permitido es del 0 al 100 %.
</div>

Por ejemplo:

| Tipo | Cálculo |
|------|-------------|
| {{< ui >}}Discount{{< /ui >}} (20 %) | precios bajo demanda públicos × 0,8 |
| {{< ui >}}Markup{{< /ui >}} (30 %) | precios bajo demanda públicos × 1,3 |

### Paso 2: Crear un plan de precios {#step-2-create-a-pricing-plan}

Cree un plan de precios y adjunte la regla de precios creada en el paso anterior.  
Un plan de precios puede contener **solo una** regla global de Discount o Markup.

### Paso 3: Crear un grupo de facturación {#step-3-create-a-billing-group}

Cree un grupo de facturación y asigne **la cuenta de miembro de un cliente** como la cuenta **principal**.
Puede agregar una o más cuentas de miembro al grupo de facturación, pero solo la cuenta de miembro principal genera el CUR pro forma que Datadog ingiere.

### Paso 4: Confirmar los requisitos del lado del cliente {#step-4-confirm-customer-side-requirements}

Si el cliente administra su cuenta de miembro de forma independiente, confirme que comprende que debe:
- implementar la plantilla de CloudFormation
- crear el CUR en su cuenta
- otorgar a Datadog acceso al bucket del CUR

## Configurar Datadog Cloud Cost Management {#configure-datadog-cloud-cost-management}

Estos pasos deben ser realizados por el cliente en su **cuenta de miembro**.

### Paso 1: Descargar la plantilla de CloudFormation de Datadog CCM {#step-1-download-the-datadog-ccm-cloudformation-template}

Los CUR pro forma no admiten la opción `SPLIT_COST_ALLOCATION_DATA`.
Debido a esta limitación, el cliente debe modificar la plantilla antes de la implementación:
1. Descargue la [plantilla de CloudFormation de Datadog CCM][6].
2. Elimine el campo `SPLIT_COST_ALLOCATION_DATA` de la plantilla.
3. Guarde la plantilla modificada para usarla en el siguiente paso.


### Paso 2: Implementar la pila de CloudFormation en AWS {#step-2-deploy-the-cloudformation-stack-in-aws}

1. Utilice la plantilla anterior e implemente una pila en la cuenta de miembro del cliente.
2. Para implementar la pila, siga la documentación de AWS: [Crear una pila desde CloudFormation][7]. Al crear la pila, elija: {{< ui >}}With new resources (standard){{< /ui >}}.

### Paso 3: Configurar los ajustes del informe de costos y uso en AWS {#step-3-configure-the-cost-and-usage-report-settings-in-aws}

Ingrese la siguiente información durante la implementación:
- {{< ui >}}Bucket Name{{< /ui >}}: bucket de S3 donde se almacenan los archivos CUR  
- {{< ui >}}Bucket Region{{< /ui >}}: región de AWS de ese bucket (por ejemplo, `us-east-1`)  
- {{< ui >}}Export Path Prefix{{< /ui >}}: prefijo de ruta de S3 para los archivos CUR  
- {{< ui >}}Export Name{{< /ui >}}: nombre del Cost and Usage Report  

Estos valores definen dónde escribe AWS el CUR y dónde lo lee Datadog.

### Paso 4: Ingresar los parámetros del CUR de la cuenta de miembro en Datadog {#step-4-enter-the-member-accounts-cur-parameters-in-datadog}

1. Después de implementar la pila de CloudFormation, navegue a {{< ui >}}Datadog{{< /ui >}} → {{< ui >}}Cloud Cost{{< /ui >}} → {{< ui >}}Settings{{< /ui >}} → [{{< ui >}}Accounts{{< /ui >}}][8].


   {{< img src="partners/cloud_cost/select_aws_account_ccm.png" alt="Seleccionar cuenta de AWS para CCM" style="width:100%;" >}}

2. Seleccione la cuenta de miembro e ingrese los siguientes campos utilizando los valores exactos del **Paso 3**:
   - {{< ui >}}Bucket Name{{< /ui >}}  
   - {{< ui >}}Bucket Region{{< /ui >}}
   - {{< ui >}}Export Path Prefix{{< /ui >}}
   - {{< ui >}}Export Name{{< /ui >}}

3. Omita el {{< ui >}}Create CloudFormation stack step{{< /ui >}} (la pila ya se implementó en el **Paso 3**).


4. Haga clic en {{< ui >}}Activate now{{< /ui >}} para activar CCM para la cuenta de miembro.


{{< img src="partners/cloud_cost/configure_aws_ccm.png" alt="Configurar AWS Cloud Cost Management" style="width:100%;" >}}

Una vez completada la configuración, el estado de la cuenta se actualiza como se muestra a continuación.

{{< img src="partners/cloud_cost/complete_aws_ccm.png" alt="Completar AWS Cloud Cost Management" style="width:100%;" >}}

## Validación {#validation}

Después de la activación, verifique que los datos de costos fluyan hacia Datadog:
1. Vaya a [{{< ui >}}Cloud Cost{{< /ui >}} > {{< ui >}}Cost Explorer{{< /ui >}}][9] en Datadog.
2. Seleccione {{< ui >}}AWS{{< /ui >}} como proveedor, luego utilice filtros como {{< ui >}}Product{{< /ui >}}, {{< ui >}}Member Accoun Id{{< /ui >}} u otras dimensiones para agrupar y validar los datos.
3. Confirme que los datos de costos aparezcan para el rango de tiempo esperado.


**Nota:**  
Los datos pueden tardar **48–72 horas** en aparecer en Datadog después de que se genere un informe de costos y uso (CUR).  
Los informes CUR utilizan **granularidad horaria**, por lo que es posible que los tiempos de entrega de los informes CUR de AWS y de procesamiento de Datadog no coincidan exactamente en tiempo real.

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/cloud_cost_management/setup/aws/
[2]: https://docs.aws.amazon.com/billingconductor/latest/userguide/what-is-billingconductor.html
[3]: https://docs.aws.amazon.com/cur/latest/userguide/cur-data-view.html
[4]: /es/cloud_cost_management/setup/aws/?tab=manual#prerequisite-generate-a-cost-and-usage-report
[5]: /es/getting_started/integrations/aws/#setup
[6]: https://datadog-cloudformation-template.s3.amazonaws.com/aws_cloud_cost/v0.0.5/main.yaml
[7]: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/cfn-console-create-stack.html
[8]: https://app.datadoghq.com/cost/setup
[9]: https://app.datadoghq.com/cost/explorer