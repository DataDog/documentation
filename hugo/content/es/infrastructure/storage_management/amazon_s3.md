---
further_reading:
- link: https://www.datadoghq.com/blog/datadog-storage-monitoring/
  tag: Blog
  text: Optimice y solucione problemas de almacenamiento en la nube a escala con Storage
    Monitoring
- link: https://www.datadoghq.com/blog/storage-monitoring-recommendations/
  tag: Blog
  text: Reduzca los costos de almacenamiento en la nube y mejore la eficiencia operativa
    con Datadog Storage Monitoring
title: Storage Management para Amazon S3
---
## Configuración {#setup}

Configure Storage Management para Amazon S3 con uno de los siguientes métodos:

- **CloudFormation**: Una configuración guiada en el producto que configura la integración de AWS, habilita S3 Inventory en los buckets que seleccione y, opcionalmente, habilita los registros de acceso de S3. Una pila de CloudFormation aplica los cambios a su cuenta de AWS.
- **Terraform**: Utilice el módulo oficial de Terraform de Datadog Storage Management para configurar el inventario y los registros de acceso como código.
- **Manual**: Configure el inventario de S3 y los permisos necesarios usted mismo en la consola de AWS, luego registre el destino del inventario en Storage Management.

{{< tabs >}}
{{% tab "CloudFormation" %}}

La configuración en el producto lo guía a través de tres pasos: configurar una cuenta de AWS, seleccionar buckets y habilitar S3 Inventory y los registros de acceso, y finalizar la configuración. Una pila de CloudFormation aplica los cambios necesarios en su cuenta de AWS.

Para comenzar, navegue a **Infrastructure** > [**Storage Management**][1] y haga clic en **Try Storage Management**.

[1]: https://app.datadoghq.com/storage-management

{{% collapse-content title="1. Configure la cuenta de AWS" level="h3" expanded=false id="datadog-ui-step1" %}}

En este paso, configure la integración de Datadog con AWS con la recopilación de métricas y recursos habilitada.

1. Elija si desea utilizar una **existing AWS account** ya integrada con Datadog o **add a new account**.
   - Para una cuenta nueva, una pila de CloudFormation crea el rol de integración de Datadog y configura tanto la recopilación de métricas como la de recursos.
   - Para una cuenta existente, confirme que la **recopilación de métricas** y la **recopilación de recursos** estén habilitadas. Storage Management utiliza la recopilación de recursos para descubrir buckets de S3 y sus configuraciones de inventario existentes.
2. Seleccione la región de AWS que desea configurar. Se configura una región por ejecución; repita los pasos para cada región adicional.

Para obtener una lista de los permisos relacionados con S3 utilizados por la recopilación de recursos, consulte [Recopilación de recursos][2] en la página de integración de AWS.

[2]: /es/integrations/amazon-web-services/#resource-collection
{{% /collapse-content %}}

{{% collapse-content title="2. Configure Storage Management" level="h3" expanded=false id="datadog-ui-step2" %}}

En este paso, seleccione los buckets de los que desea hacer un seguimiento, establezca un destino de inventario y, opcionalmente, habilite los registros de acceso.

<div class="alert alert-info">
    - Bucket fuente: El bucket de S3 del que desea hacer un seguimiento con Storage Management. <br>
    - Bucket de destino: El bucket que almacena los informes de inventario (uno por región de AWS, se puede reutilizar entre cuentas).
</div>

1. **Seleccione buckets**: Elija los buckets de S3 de los que desea hacer un seguimiento con Storage Management. Los buckets que ya tienen habilitado Storage Management están ocultos. Los buckets con S3 Inventory existente están preseleccionados y mantienen su destino actual.

2. **Establezca el bucket de destino del inventario**: Para los buckets sin una configuración de inventario existente, elija un bucket de destino donde se entreguen los informes de inventario diarios. Puede elegir un bucket existente o especificar uno nuevo. Datadog escribe archivos de inventario en el prefijo `datadog-inventories`.

   **Nota**: Storage Management requiere el formato de inventario CSV. La pila de CloudFormation configura esto por usted.

3. **Habilitar registros de acceso de S3 (opcional)**: Los registros de acceso muestran patrones de datos fríos, accesos inusuales y oportunidades de ajuste de tamaño para los niveles de almacenamiento. Active **Enable S3 access logs** y, luego:

   - Seleccione un bucket de destino para los registros de acceso. Puede usar el mismo bucket que el destino del inventario.
   - Si se detecta un Datadog Log Forwarder en la cuenta, se reutiliza. De lo contrario, la pila de CloudFormation implementa un nuevo Forwarder.
   - Los registros de acceso reenviados se pueden ingerir sin indexación si se utilizan solo para Storage Management. Consulte los [filtros de exclusión][3] para obtener más detalles.

   <div class="alert alert-warning">El reenvío de registros de acceso de S3 a Datadog genera costos de ingesta de Log Management. Para minimizar los costos, utilice filtros de exclusión para que los registros se ingieran pero no se indexen si se utilizan solo para Storage Management. Para obtener más detalles, consulte <a href="https://www.datadoghq.com/pricing/?product=log-management">Precios de Datadog Log Management</a>.</div>

4. Haga clic en **Launch CloudFormation Template**. Se abre una pila de creación rápida de AWS, precargada con las asignaciones de bucket, el prefijo de destino, el nombre del rol de integración y los parámetros de la clave de Datadog API, la clave de aplicación y el Forwarder de registros.

5. En AWS, revise los parámetros de la pila y cree la pila. La pila:

   - Habilita S3 Inventory diario en cada bucket fuente seleccionado.
   - Agrega permisos de IAM para que Storage Management lea los informes de inventario de S3 de los buckets de destino.
   - Agrega la política de bucket al bucket de destino del inventario para que S3 pueda escribir objetos de inventario.
   - Habilita el registro de acceso al servidor de S3 en los buckets seleccionados (si los registros de acceso están habilitados).
   - Implementa una función Lambda de Datadog Log Forwarder (si los registros de acceso están habilitados y no existe ningún Forwarder).

[3]: /es/logs/log_configuration/indexes/#exclusion-filters
{{% /collapse-content %}}

{{% collapse-content title="3. Finalice la configuración" level="h3" expanded=false id="datadog-ui-step3" %}}

Después de que la pila de CloudFormation se complete en AWS, regrese a Storage Management y haga clic en **Finish Setup**.

{{% /collapse-content %}}

{{% /tab %}}

{{% tab "Terraform" %}}

Utilice el [módulo oficial de Terraform de Datadog Storage Management][1] para configurar S3 Inventory y reenviar los registros de acceso de S3. El módulo:

   - Configura los permisos necesarios en el rol de IAM de integración de AWS.
   - Agrega una política de bucket para permitir que Datadog lea archivos de inventario desde la ruta del bucket de destino.
   - Habilita la recopilación de registros de acceso de S3 si ya hay un Datadog Log Forwarder configurado.

Para usar el ejemplo a continuación:
- Reemplace `<AWS_REGION>` con su región de AWS.
- Reemplace `<MODULE_NAME>` con un nombre único para esta instancia de módulo.
- Reemplace `<DATADOG_AWS_INTEGRATION_ROLE_NAME>` con el nombre de su rol de IAM de integración de AWS de Datadog.
- Reemplace `<SOURCE_BUCKET_1>`, `<SOURCE_BUCKET_2>` y así sucesivamente con los nombres de los buckets a los que se hará un seguimiento.
- Reemplace `<DESTINATION_BUCKET_NAME>` con el nombre del bucket que recibe sus archivos de inventario.
- Reemplace `<DATADOG_FORWARDER_FUNCTION_NAME>` con el nombre de su función Lambda Datadog Forwarder (solo es necesario si habilita los registros de acceso).

Para más opciones, consulte la [documentación del módulo][1].

```hcl
provider "aws" {
  region = "<AWS_REGION>"
}

provider "datadog" {
  # Configure with environment variables:
  #   DD_API_KEY, DD_APP_KEY, DD_SITE
}

module "datadog_storage_management" {
  source = "DataDog/storage-management-datadog/aws"

  name                              = "<MODULE_NAME>"
  datadog_aws_integration_role_name = "<DATADOG_AWS_INTEGRATION_ROLE_NAME>"
  source_bucket_names               = ["<SOURCE_BUCKET_1>", "<SOURCE_BUCKET_2>"]
  destination_bucket_name           = "<DESTINATION_BUCKET_NAME>"

  # Prefix within the destination bucket where inventory files are written.
  # Defaults to "datadog-inventories/". The module keeps the inventory
  # configuration, bucket policy, and IAM permissions consistent with this
  # value. Datadog recommends to use the default value.
  # destination_prefix = "datadog-inventories/"

  # Bucket policy: "none", "create", or "merge" (default)
  destination_bucket_policy_management = "merge"

  # Optional: Enable S3 access logs for prefix-level request and latency metrics
  enable_access_logging           = true
  datadog_forwarder_function_name = "<DATADOG_FORWARDER_FUNCTION_NAME>"
}
```

Después de habilitar S3 Inventory, pueden pasar hasta 24 horas para que se generen los primeros informes de inventario. Para verificar que se estén generando los inventarios, vaya a su bucket de destino en la consola de AWS y confirme que los archivos de inventario aparezcan en el prefijo de destino que especificó.

Después de confirmar que los archivos de inventario están presentes, verifique que Storage Management esté habilitado en sus buckets navegando a [**Storage Management**][2] y confirmando que su bucket de destino aparezca en la lista.

[1]: https://registry.terraform.io/modules/DataDog/storage-management-datadog/aws/latest
[2]: https://app.datadoghq.com/storage-management

{{% /tab %}}

{{% tab "Manual" %}}

Para configurar manualmente el [Amazon S3 Inventory][206] requerido y la configuración relacionada, siga estos pasos:

[206]: https://docs.aws.amazon.com/AmazonS3/latest/userguide/configure-inventory.html

{{% collapse-content title="1. Cree un bucket de destino" level="h3" expanded=false id="manual-setup-step1" %}}

1. [Cree un bucket de S3][201] para almacenar sus archivos de inventario. Este bucket actúa como la ubicación central para los informes de inventario.
   **Nota**: Use solo un bucket de destino para todos los archivos de inventario generados en una cuenta de AWS.
2. Decida el prefijo de destino dentro del bucket donde se escriben los archivos de inventario. El prefijo estándar es `datadog-inventories/`, que también es el valor predeterminado si deja el campo vacío. Para leer informes de inventario de todo el bucket, establezca el valor en `/`. Puede usar un prefijo personalizado, pero debe usar el mismo valor en los pasos siguientes: la configuración de S3 Inventory, la política del bucket de destino, los permisos del rol de integración y la llamada de registro de la API. Los prefijos que no coinciden impiden que Datadog lea sus archivos de inventario.

[201]: https://console.aws.amazon.com/s3/bucket/create
{{% /collapse-content %}}

{{% collapse-content title="2. Configure las políticas del bucket y del rol de integración" level="h3" expanded=false id="manual-setup-step2" %}}

1. Confirme que el rol de integración de Datadog AWS **en la cuenta de AWS que posee el bucket de destino** tenga los permisos `s3:GetObject` y `s3:ListBucket` en el bucket de destino. Estos permisos permiten a Datadog leer los archivos de inventario generados. Esa cuenta debe estar integrada con Datadog.

   **Nota**: Si los buckets fuente en otras cuentas de AWS envían informes de inventario a un bucket de destino central, Datadog lee cada informe con el rol de integración de la cuenta del bucket de destino. Los roles de integración en las cuentas fuente no necesitan acceso al bucket de destino.

2. Confirme que la política del bucket de destino permita a S3 escribir archivos de inventario en su bucket de destino.

      Ejemplo de política de bucket:
      ```json
      {
        "Sid": "AllowS3InventoryWriteFromAccountBuckets",
        "Effect": "Allow",
        "Principal": { "Service": "s3.amazonaws.com" },
        "Action": "s3:PutObject",
        "Resource": "arn:aws:s3:::<DESTINATION_BUCKET>/<DESTINATION_PREFIX>/*",
        "Condition": {
          "ArnLike": {
            "aws:SourceArn": "arn:aws:s3:::*"
          },
          "StringEquals": {
            "aws:SourceAccount": "<ACCOUNT_ID>",
            "s3:x-amz-acl": "bucket-owner-full-control"
          }
        }
      }
      ```

3. Siga los pasos en la [Guía del usuario de Amazon S3][202] para agregar una política de bucket a su bucket de destino que permita a Amazon S3 escribir objetos de inventario (`s3:PutObject`) desde su bucket o buckets fuente.

[202]: https://docs.aws.amazon.com/AmazonS3/latest/userguide/add-bucket-policy.html
{{% /collapse-content %}}

{{% collapse-content title="3. Configure la generación de inventario" level="h3" expanded=false id="manual-setup-step3" %}}

Para cada bucket al que desee hacer un seguimiento:
1. Vaya a la [página de buckets de Amazon S3][203] en la consola de AWS y seleccione el bucket.
2. Vaya a la pestaña **Management** del bucket.
3. Haga clic en **Create inventory configuration**.
4. Configure los siguientes ajustes:
   - Establezca un nombre de configuración
   - (Opcional) Especifique un prefijo de bucket fuente
   - **Object versions**: Datadog recomienda seleccionar **Include all versions** (necesario para ver métricas de versiones no actuales)

     {{< img src="integrations/guide/storage_monitoring/all-versions.png" alt="Seleccione los buckets de destino para habilitar Storage Monitoring" responsive="true">}}
   - **Destination**: Seleccione el bucket de destino común para los archivos de inventario en su cuenta de AWS. Por ejemplo, si el bucket se llama `destination-bucket`, ingrese `s3://your-destination-bucket`

      **Nota**: Agregue el prefijo de destino que eligió en el paso 1. Use el mismo valor que registró en Datadog en el paso posterior a la configuración.
   - **Frequency**: Datadog recomienda elegir **Daily**. Este ajuste determina la frecuencia con la que se actualizan sus métricas a nivel de prefijo en Datadog
   - **Output format**: CSV
   - **Status**: Enabled
   - **Server-side encryption**: Don't specify an encryption key
   - Seleccione todos los **Additional metadata fields** disponibles. Como mínimo, se requieren los siguientes campos:

     {{< img src="integrations/guide/storage_monitoring/metadata.png" alt="Campos de metadatos adicionales. Tamaño, último modificado, carga de multipartes, estado de replicación, encriptado, Object ACL, clase de almacenamiento, Intelligent-Tiering: Access tier, ETag y Checksum function están seleccionados. Bucket key status, Object owner y All Object Lock configurations no están seleccionados." responsive="true">}}

**Nota**: Revise los [precios de Amazon S3][204] para conocer los costos relacionados con la generación de inventario.

[203]: https://console.aws.amazon.com/s3/buckets
[204]: https://aws.amazon.com/s3/pricing/
{{% /collapse-content %}}

{{% collapse-content title="4. Habilite los registros de acceso de S3 (opcional)" level="h3" expanded=false id="manual-setup-step4" %}}

Para obtener métricas de acceso a nivel de prefijo, incluidos los recuentos de solicitudes, la latencia del lado del servidor y la identificación de datos fríos, habilite el registro de acceso al servidor de S3 en sus buckets fuente y reenvíe esos registros a Datadog. Para obtener instrucciones paso a paso, consulte [Enable S3 access logs][208] en la documentación de integración de Amazon S3.

<div class="alert alert-warning">El reenvío de registros de acceso de S3 a Datadog genera costos de ingesta de Log Management. Para minimizar los costos, utilice filtros de exclusión para que los registros se ingieran pero no se indexen si se utilizan solo para Storage Management. Para obtener más detalles, consulte <a href="https://www.datadoghq.com/pricing/?product=log-management">Precios de Datadog Log Management</a>.</div>

[208]: /es/integrations/amazon-s3/#enable-s3-access-logs
{{% /collapse-content %}}

### Pasos posteriores a la configuración {#post-setup-steps}

Después de que los archivos de inventario comiencen a aparecer en el bucket de destino, regístrelo en Storage Management llamando al punto de conexión [Enable Storage Management for a bucket][209]:

```bash
curl -X PUT "https://api.${DD_SITE}/api/v2/cloudinventoryservice/syncconfigs" \
  -H "Accept: application/json" \
  -H "Content-Type: application/json" \
  -H "DD-API-KEY: ${DD_API_KEY}" \
  -H "DD-APPLICATION-KEY: ${DD_APP_KEY}" \
  -d '{
    "data": {
      "id": "aws",
      "type": "cloud_provider",
      "attributes": {
        "aws": {
          "aws_account_id": "<DESTINATION_ACCOUNT_ID>",
          "destination_bucket_name": "<DESTINATION_BUCKET_NAME>",
          "destination_bucket_region": "<DESTINATION_BUCKET_REGION>",
          "destination_prefix": "<DESTINATION_PREFIX>"
        }
      }
    }
  }'
```

Para utilizar el ejemplo anterior:
- Reemplace `<DESTINATION_ACCOUNT_ID>` con el ID de 12 dígitos de la cuenta de AWS que posee el bucket de destino. En configuraciones entre cuentas, esta no es la cuenta de los buckets fuente.
- Reemplace `<DESTINATION_BUCKET_NAME>` con el nombre del bucket de destino que contiene los informes de inventario.
- Reemplace `<DESTINATION_BUCKET_REGION>` con la región de AWS del bucket de destino.
- Reemplace `<DESTINATION_PREFIX>` con el prefijo en el bucket de destino donde se escriben sus informes de S3 Inventory, por ejemplo `datadog-inventories/`. Esto debe coincidir con el prefijo en su configuración de S3 Inventory. Para leer informes de inventario de todo el bucket, establezca el valor en `/`. Dejar el valor vacío no lee todo el bucket; el valor predeterminado es `datadog-inventories/`.

Una respuesta `200` confirma que Storage Management está habilitado para el bucket de destino.

[209]: /es/api/latest/storage-management/#enable-storage-management-for-a-bucket

{{% /tab %}}

{{< /tabs >}}

### Validación {#validation}

Para verificar su configuración:
1. Espere a que se genere el primer informe de inventario (hasta 24 horas para inventarios diarios).
2. Navegue a **Infrastructure** > [**Storage Management**][3] para ver si los buckets que configuró aparecen en la lista del explorador cuando se selecciona **Monitored buckets**.

  {{< img src="infrastructure/storage_management/monitored-buckets.png" alt="Valide que el bucket esté habilitado para el monitoreo" responsive="true">}}

### Mejores prácticas {#best-practices}

Siga estas mejores prácticas para optimizar la configuración de Storage Management:
- **Configure políticas de ciclo de vida para los buckets de destino de inventario**: Los informes de inventario de S3 se generan diariamente y se almacenan en su bucket de destino. Para evitar que los archivos de inventario antiguos se acumulen e incurran en costos de almacenamiento, agregue una política de ciclo de vida para eliminar automáticamente los informes de inventario con más de tres días de antigüedad.

- **Configure políticas de ciclo de vida para los registros de acceso de S3**: Si ha habilitado los registros de acceso de S3 para métricas de solicitudes a nivel de prefijo, los archivos de registro sin procesar se acumulan en su bucket de destino. Después de que estos registros se reenvían a Datadog, los archivos sin procesar ya no son necesarios para fines de Storage Management. Para eliminar automáticamente los archivos de registro de acceso después de reenviarlos a Datadog, agregue una regla de ciclo de vida.

  **Nota**: Antes de habilitar la eliminación automática, verifique que no existan requisitos de cumplimiento o auditoría en su organización que exijan retener los registros de acceso de S3 sin procesar durante un período específico.

- **Cree filtros de exclusión para los registros de acceso de S3**: Si los registros de acceso de S3 se reenvían a Datadog solo para Storage Management y no necesitan ser indexados para búsqueda o análisis, agregue un [filtro de exclusión][4] para mantenerlos fuera del volumen de logs indexados.

### Solución de problemas {#troubleshooting}

Si no ve datos de los buckets que configuró para Storage Management, utilice la página [Storage Management Settings][9] para visualizar todos los buckets configurados, su estado de inventario y cualquier error de configuración. La página muestra los problemas y los pasos concretos para resolverlos.
Si tiene alguna pregunta, [contacte a Datadog][1].

## Identifique y aproveche las oportunidades de ahorro de costos con Bits Chat {#identify-and-act-on-cost-savings-with-bits-chat}

{{< callout url="https://docs.google.com/forms/d/e/1FAIpQLScbFjbJecpVV-DgJNBt2O205KtaWlD_q6ajThIEX9vTGz6ebA/viewform?usp=publish-editor" >}}
Bits Chat para Storage Management está en versión preliminar (Preview). Para probar esta habilidad, solicite acceso.
{{< /callout >}} 


Los equipos de FinOps e ingeniería pueden usar Bits Chat y Storage Management para identificar oportunidades de ahorro de costos en S3, generar informes en Datadog Notebooks e implementar los cambios recomendados. Para usar Bits Chat con Storage Management, habilite la habilidad `storage` en la configuración de Bits Chat.

Con la habilidad `storage` habilitada para Bits Chat, usted puede:

- **Encuentre las mayores oportunidades de ahorro**: Haga preguntas en lenguaje natural para identificar los prefijos, clases de almacenamiento o buckets de mayor impacto donde los cambios en el ciclo de vida reducirían más los costos.
- **Cree informes a través de Notebooks**: Genere un notebook de Datadog que resuma los hallazgos, los ahorros estimados y las acciones recomendadas para que su equipo los revise y comparta.
- **Implemente cambios**: Obtenga orientación paso a paso con [Bits Code][10] para aplicar políticas de ciclo de vida, realizar la transición de objetos a niveles de almacenamiento más económicos o hacer expirar versiones no actuales en los prefijos con el mayor potencial de ahorro.


## Visualice el uso granular de S3 con métricas de inventario {#visualize-granular-s3-usage-with-inventory-metrics}

Hay disponible una [plantilla de panel de S3 de Storage Management][8] lista para usar que le ayudará a visualizar las siguientes métricas. Puede clonarla y personalizarla para adaptarla a sus necesidades.

| Nombre de la métrica                                            | Etiquetas notables                                                                                  | Descripción                                                                                                                                    |
|--------------------------------------------------------|-----------------------------------------------------------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------|
| aws.s3.inventory.total_prefix_size                     | `bucketname`, `prefix`, `region`, `storagetype`, `extension`, `delete_marker`, `is_latest`    | Cantidad total de datos, en bytes, almacenados en un prefijo.                                                                                            |
| aws.s3.inventory.average_prefix_size                   | `bucketname`, `prefix`, `region`                                                              | Tamaño promedio de objeto, en bytes, para los objetos en un prefijo.                                                                                        |
| aws.s3.inventory.prefix_object_count                   | `bucketname`, `prefix`, `region`, `storagetype`, `extension`, `delete_marker`, `is_latest`    | El número total de objetos almacenados en un prefijo.                                                                                                |
| aws.s3.inventory.prefix_object_count.levels            | `bucketname`, `prefixN*`, `region`, `storagetype`, `extension`, `delete_marker`               | Recuentos de objetos agregados a niveles de prefijo jerárquicos, utilizados para visualizaciones de mapas de árbol.                                                       |
| aws.s3.inventory.total_prefix_size.levels              | `bucketname`, `prefixN*`, `region`, `storagetype`, `extension`, `delete_marker`               | Tamaño de prefijo agregado a niveles de prefijo jerárquicos, utilizado para visualizaciones de mapas de árbol.                                                         |
| aws.s3.inventory.prefix_age_days                       | `bucketname`, `prefix`, `region`                                                              | Antigüedad, en días, del objeto más antiguo en el bucket o prefijo.                                                                                    |
| aws.s3.inventory.prefix_small_file_size                | `bucketname`, `prefix`, `region`, `storagetype`                                               | Tamaño total, en bytes, de los objetos menores de 128 KB en un prefijo. Ayuda a identificar los costos adicionales en niveles de almacenamiento como Glacier y Standard-IA.   |
| aws.s3.inventory.prefix_small_file_count               | `bucketname`, `prefix`, `region`, `storagetype`                                               | Número de objetos menores de 128 KB en un prefijo. Ayuda a identificar los costos adicionales en niveles de almacenamiento como Glacier y Standard-IA.                   |
| aws.s3.inventory.access_logs.total_requests_by_method  | `bucketname`, `prefix`, `region`, `method`                                                    | Número total de solicitudes de objetos en un prefijo, opcionalmente divididas por método de solicitud (por ejemplo, GET o PUT). Requiere registros de acceso de S3 en Datadog.   |
| aws.s3.inventory.access_logs.request_latency_by_method | `bucketname`, `prefix`, `region`, `method`                                                    | Tiempo de respuesta del servidor para solicitudes en un prefijo, opcionalmente dividido por método de solicitud. Requiere registros de acceso de S3 en Datadog.                          |

  *`prefixN` se refiere a niveles de prefijo tales como `prefix0`, `prefix1`, `prefix2`, etcétera.

  **Nota:** Utilice la métrica correcta para la pregunta que está respondiendo:
  - `aws.s3.inventory.prefix_object_count` y `aws.s3.inventory.total_prefix_size` (con la etiqueta `prefix`) incluyen todo lo que hay dentro de una carpeta y todas sus subcarpetas. Úselos cuando desee el recuento o el tamaño total de una carpeta específica (por ejemplo, "¿cuánto hay en `logs/2024/`?").
  - `aws.s3.inventory.prefix_object_count.levels` y `aws.s3.inventory.total_prefix_size.levels` (con `prefix1`, `prefix2`, `prefix3`, etcétera) cuentan o miden el tamaño de los objetos solo en esa profundidad exacta. Úselos cuando desee crear un mapa de árbol o comparar tamaños de carpetas entre niveles (por ejemplo, "¿cuáles son las carpetas de nivel superior más grandes?").

  **Nota:** Para obtener el monitoreo y la visualización más precisos, incluya todas las versiones de los objetos para ver recomendaciones o métricas de objetos no actuales.


## Implemente optimizaciones con Storage Management Recommendations {#act-on-optimizations-with-storage-management-recommendations}

Storage Management analiza sus datos de inventario y registros de acceso para mostrar recomendaciones a nivel de prefijo para reducir los costos de almacenamiento de S3. Estas recomendaciones están disponibles para todos los clientes de Storage Management. Los ahorros potenciales se estiman utilizando los precios de lista de AWS. Si tiene habilitado [Cloud Cost Management][7], las recomendaciones también aparecen en Cloud Cost Recommendations, y puede realizar un seguimiento de los ahorros reales de las optimizaciones.

Las recomendaciones se ejecutan diariamente y se actualizan automáticamente en su cuenta tan pronto como se publican.

### Requisitos previos {#prerequisites}
Ver las recomendaciones tiene los siguientes requisitos previos:
1. Configure los buckets de S3 para Storage Management siguiendo los pasos anteriores en esta página.
2. Para ver recomendaciones sobre cómo mover datos a los que se accede con poca frecuencia a niveles más económicos por prefijo, habilite y reenvíe los registros de acceso de S3 a Datadog (se aplican tarifas de Datadog Log Management).
3. Para ver recomendaciones sobre cómo identificar versiones no actuales en prefijos, incluya "All versions" como parte de la configuración de inventario de S3.

### Recomendaciones disponibles {#available-recommendations}
- Transfiera datos de S3 a los que no se accede en el prefijo a Infrequent Access
- Haga que caduquen las versiones no actuales antiguas de los objetos en el prefijo del bucket de S3
- Consolide los archivos pequeños en el prefijo para minimizar los costos de almacenamiento por objeto

  {{< img src="infrastructure/storage_management/storage-recs.png" alt="Storage Management Recommendations" responsive="true">}}


[1]: mailto:storage-monitoring@datadoghq.com
[3]: https://app.datadoghq.com/storage-management
[4]: /es/logs/log_configuration/indexes/#exclusion-filters
[7]: /es/cloud_cost_management/
[8]: https://app.datadoghq.com/dash/integration/32296/storage-management-for-amazon-s3
[9]: https://app.datadoghq.com/storage-management/settings
[10]: https://docs.datadoghq.com/es/bits_ai/bits_code/