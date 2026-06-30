---
further_reading:
- link: https://www.datadoghq.com/blog/datadog-storage-monitoring/
  tag: Blog
  text: Optimiza y soluciona problemas de almacenamiento en la nube a gran escala
    con Storage Monitoring
- link: https://www.datadoghq.com/blog/storage-monitoring-recommendations/
  tag: Blog
  text: Reduce los costos de almacenamiento en la nube y mejora la eficiencia operativa
    con Storage Monitoring de Datadog
title: Gestión de Almacenamiento para Amazon S3
---
## Configuración {#setup}

Configure la Gestión de Almacenamiento para Amazon S3 con uno de los siguientes métodos:

- **CloudFormation**: Una configuración guiada en el producto que configura la integración de AWS, habilita el Inventario de S3 en los buckets que selecciones y opcionalmente habilita los registros de acceso de S3. Una pila de CloudFormation aplica los cambios a su cuenta de AWS.
- **Terraform**: Utiliza el módulo oficial de Terraform de Gestión de Almacenamiento de Datadog para configurar el inventario y los registros de acceso como código.
- **Manual**: Configure el inventario de S3 y los permisos requeridos en la consola de AWS, luego registre el destino del inventario con la Gestión de Almacenamiento.

{{< tabs >}}
{{% tab "CloudFormation" %}}

La configuración en el producto te guía a través de tres pasos: configurar una cuenta de AWS, seleccionar buckets y habilitar el Inventario de S3 y los registros de acceso, y finalizar la configuración. Una pila de CloudFormation aplica los cambios requeridos en tu cuenta de AWS.

Para comenzar, navegue a **Infraestructura** > [**Gestión de Almacenamiento**][1] y haga clic en **Probar Gestión de Almacenamiento**.

[1]: https://app.datadoghq.com/storage-management

{{% collapse-content title="1. Configura la cuenta de AWS" level="h4" expanded=false id="datadog-ui-step1" %}}

En este paso, configure la integración de Datadog con AWS habilitando la recolección de métricas y recursos.

1. Elija si desea usar una **cuenta de AWS existente** ya integrada con Datadog o **agregar una nueva cuenta**.
   - Para una nueva cuenta, una pila de CloudFormation crea el rol de integración de Datadog y configura tanto la recolección de métricas como la de recursos.
   - Para una cuenta existente, confirme que **la recolección de métricas** y **la recolección de recursos** estén habilitadas. La gestión de almacenamiento utiliza la recolección de recursos para descubrir los buckets de S3 y sus configuraciones de inventario existentes.
2. Seleccione la región de AWS que desea configurar. Se configura una región por ejecución; repita los pasos para cada región adicional.

Para una lista de permisos relacionados con S3 utilizados por la recolección de recursos, consulta [Recolección de recursos][2] en la página de integración de AWS.

[2]: /es/integrations/amazon-web-services/#resource-collection
{{% /collapse-content %}}

{{% collapse-content title="2. Configure la Gestión de Almacenamiento" level="h4" expanded=false id="datadog-ui-step2" %}}

En este paso, seleccione los buckets a monitorear, establezca un destino de inventario y, opcionalmente, habilite los registros de acceso.

<div class="alert alert-info">
    - Bucket de origen: El bucket de S3 que deseas monitorear con la gestión de almacenamiento. <br>
    - Bucket de destino: El bucket que almacena los informes de inventario (uno por región de AWS, se puede reutilizar entre cuentas).
</div>

1. **Selecciona buckets**: Elija los buckets de S3 que desea hacer seguimiento con la Gestión de Almacenamiento. Los buckets ya habilitados para la gestión de almacenamiento están ocultos. Los buckets con inventario de S3 existente están preseleccionados y mantienen su destino actual.

2. **Establezca el bucket de destino del inventario**: Para los buckets sin una configuración de inventario existente, elija un bucket de destino donde se entreguen los informes de inventario diarios. Puede elegir un bucket existente o especificar uno nuevo. Datadog escribe archivos de inventario en el prefijo `datadog-inventories`.

   **Nota**: La gestión de almacenamiento requiere formato de inventario CSV. La pila de CloudFormation configura esto por ti.

3. **Habilitar registros de acceso de S3 (opcional)**: Los registros de acceso revelan patrones de datos fríos, accesos inusuales y oportunidades de ajuste para los niveles de almacenamiento. Alterne **Habilitar registros de acceso de S3**, luego:

   - Seleccione un bucket de destino para los registros de acceso. Puede usar el mismo bucket como destino del inventario.
   - Si se detecta un Datadog Log Forwarder en la cuenta, se reutiliza. De lo contrario, la pila de CloudFormation despliega un nuevo Forwarder.
   - Los registros de acceso reenviados pueden ser ingeridos sin indexación si se utilizan solo para la gestión de almacenamiento. Consulte [filtros de exclusión][3] para más detalles.

   <div class="alert alert-warning">Reenviar registros de acceso de S3 a Datadog incurre en costos de ingestión de gestión de registros. Para minimizar costos, utilice filtros de exclusión para que los registros sean ingeridos pero no indexados si se utilizan solo para la gestión de almacenamiento. Para más detalles, consulte <a href="https://www.datadoghq.com/pricing/?product=log-management">precios de gestión de registros de Datadog</a>.</div>

4. Haga clic en **Lanzar plantilla de CloudFormation**. Se abre una pila de creación rápida de AWS, prellenada con los mapeos de buckets, prefijo de destino, nombre del rol de integración y parámetros de clave API de Datadog, clave de aplicación y reenvío de registros.

5. En AWS, revise los parámetros de la pila y cree la pila. La pila:

   - Habilita el inventario diario de S3 en cada bucket de origen seleccionado.
   - Agrega permisos de IAM para que la gestión de almacenamiento lea los informes de inventario de S3 desde los buckets de destino.
   - Agrega la política del bucket al bucket de destino del inventario para que S3 pueda escribir objetos de inventario.
   - Habilita el registro de acceso del servidor S3 en los buckets seleccionados (si los registros de acceso están habilitados).
   - Despliega una función Lambda de Datadog Log Forwarder (si los registros de acceso están habilitados y no existe un Forwarder).

[3]: /es/logs/log_configuration/indexes/#exclusion-filters
{{% /collapse-content %}}

{{% collapse-content title="3. Completar la configuración" level="h4" expanded=false id="datadog-ui-step3" %}}

Después de que la pila de CloudFormation se complete en AWS, regrese a la Gestión de Almacenamiento y haga clic en **Completar Configuración**.

{{% /collapse-content %}}

{{% /tab %}}

{{% tab "Terraform" %}}

Utilice el módulo oficial de [Gestión de Almacenamiento de Datadog Terraform][1] para configurar el Inventario de S3 y enviar los registros de acceso de S3. El módulo:

   - Configure los permisos requeridos en el rol IAM de integración de AWS.
   - Agrega una política de bucket para permitir que Datadog lea los archivos de inventario desde la ruta del bucket de destino.
   - Habilita la recopilación de registros de acceso de S3 si ya se ha configurado un Forwarder de Registros de Datadog.

Para usar el ejemplo a continuación:
- Reemplace `<AWS_REGION>` con su región de AWS.
- Reemplace `<MODULE_NAME>` con un nombre único para esta instancia del módulo.
- Reemplace `<DATADOG_AWS_INTEGRATION_ROLE_NAME>` con el nombre de su rol IAM de integración de AWS de Datadog.
- Reemplace `<SOURCE_BUCKET_1>`, `<SOURCE_BUCKET_2>`, y así sucesivamente con los nombres de los buckets a monitorear.
- Reemplace `<DESTINATION_BUCKET_NAME>` con el nombre del bucket que recibe sus archivos de inventario.
- Reemplace `<DATADOG_FORWARDER_FUNCTION_NAME>` con el nombre de su función Lambda de Forwarder de Datadog (solo requerido si habilita los registros de acceso).

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
  source = "DataDog/storage-management/aws"

  name                              = "<MODULE_NAME>"
  datadog_aws_integration_role_name = "<DATADOG_AWS_INTEGRATION_ROLE_NAME>"
  source_bucket_names               = ["<SOURCE_BUCKET_1>", "<SOURCE_BUCKET_2>"]
  destination_bucket_name           = "<DESTINATION_BUCKET_NAME>"

  # Bucket policy: "none", "create", or "merge" (default)
  destination_bucket_policy_management = "merge"

  # Optional: Enable S3 access logs for prefix-level request and latency metrics
  enable_access_logging           = true
  datadog_forwarder_function_name = "<DATADOG_FORWARDER_FUNCTION_NAME>"
}
```

Después de habilitar el Inventario de S3, puede tardar hasta 24 horas en generarse los primeros informes de inventario. Para verificar que se están generando inventarios, vaya a su bucket de destino en la consola de AWS y confirme que los archivos de inventario aparecen en el prefijo de destino que especificó.

Después de confirmar que los archivos de inventario están presentes, verifique que la Gestión de Almacenamiento esté habilitada en sus buckets navegando a [**Gestión de Almacenamiento**][2] y confirmando que su bucket de destino esté listado.

[1]: https://registry.terraform.io/modules/DataDog/storage-management-datadog/aws/latest
[2]: https://app.datadoghq.com/storage-management

{{% /tab %}}

{{% tab "Manual" %}}

Para configurar manualmente el [Inventario de Amazon S3][206] y la configuración relacionada, siga estos pasos:

[206]: https://docs.aws.amazon.com/AmazonS3/latest/userguide/configure-inventory.html

{{% collapse-content title="1. Cree un bucket de destino" level="h4" expanded=false id="manual-setup-step1" %}}

1. [Cree un bucket S3][201] para almacenar sus archivos de inventario. Este bucket actúa como la ubicación central para los informes de inventario.
   **Nota**: Use solo un bucket de destino para todos los archivos de inventario generados en una cuenta de AWS.
2. Cree un prefijo dentro del bucket de destino (opcional).

[201]: https://console.aws.amazon.com/s3/bucket/create
{{% /collapse-content %}}

{{% collapse-content title="2. Configure las políticas del bucket y del rol de integración" level="h4" expanded=false id="manual-setup-step2" %}}

1. Confirme que el rol de integración de Datadog AWS tiene `s3:GetObject` y `s3:ListBucket` permisos en el bucket de destino. Estos permisos permiten a Datadog leer los archivos de inventario generados.

2. Confirme que la política del bucket de destino permite a S3 escribir archivos de inventario en su bucket de destino.

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

3. Siga los pasos en la [Guía del Usuario de Amazon S3][202] para agregar una política de bucket a su bucket de destino que permita a Amazon S3 escribir objetos de inventario (`s3:PutObject`) desde su bucket o buckets de origen.

[202]: https://docs.aws.amazon.com/AmazonS3/latest/userguide/add-bucket-policy.html
{{% /collapse-content %}}

{{% collapse-content title="3. Configure la generación de inventario" level="h4" expanded=false id="manual-setup-step3" %}}

Para cada bucket que desees monitorear:
1. Vaya a la [página de buckets de Amazon S3][203] en la consola de AWS y seleccione el bucket.
2. Navega a la pestaña **Administración** del bucket.
3. Haz clic en **Crear configuración de inventario**.
4. Configura los siguientes ajustes:
   - Establece un nombre de configuración
   - (Opcional) Especifica un prefijo de bucket de origen
   - **Versiones de objeto**: Datadog recomienda seleccionar **Incluir todas las versiones** (requerido para ver métricas de versiones no actuales)

     {{< img src="integrations/guide/storage_monitoring/all-versions.png" alt="Seleccione buckets de destino para habilitar Storage Monitoring" responsive="true">}}
   - **Destino**: Seleccione el bucket de destino común para archivos de inventario en su cuenta de AWS. Por ejemplo, si el bucket se llama `destination-bucket`, ingrese `s3://your-destination-bucket`

      **Nota**: Para usar un prefijo en el bucket de destino, agregue esto también.
   - **Frecuencia**: Datadog recomienda elegir **Diario**. Esta configuración determina con qué frecuencia se actualizan sus métricas a nivel de prefijo en Datadog
   - **Formato de salida**: CSV
   - **Estado**: Habilitado
   - **Cifrado del lado del servidor**: No especifique una clave de cifrado
   - Seleccione todos los campos de **Metadatos adicionales** disponibles. Mínimamente, se requieren los siguientes campos:

     {{< img src="integrations/guide/storage_monitoring/metadata.png" alt="Campos de metadatos adicionales. Tamaño, Última modificación, Carga multipart, Estado de replicación, Cifrado, ACL de objeto, Clase de almacenamiento, Inteligente-Tiering: Nivel de acceso, ETag y función de suma de verificación están todos seleccionados. El estado de la clave del bucket, el propietario del objeto y todas las configuraciones de bloqueo de objeto están deseleccionados." responsive="true">}}

**Nota**: Revise [los precios de Amazon S3][204] para costos relacionados con la generación de inventario.

[203]: https://console.aws.amazon.com/s3/buckets
[204]: https://aws.amazon.com/s3/pricing/
{{% /collapse-content %}}

{{% collapse-content title="4. Habilite los registros de acceso de S3 (opcional)" level="h4" expanded=false id="manual-setup-step4" %}}

Para obtener métricas de acceso a nivel de prefijo, incluyendo conteos de solicitudes, latencia del lado del servidor e identificación de datos fríos, habilite los registros de acceso del servidor S3 en sus buckets de origen y envíe esos registros a Datadog. Para instrucciones paso a paso, consulte [Habilitar registros de acceso S3][208] en la documentación de integración de Amazon S3.

<div class="alert alert-warning">Reenviar registros de acceso de S3 a Datadog incurre en costos de ingestión de Log Management. Para minimizar costos, utilice filtros de exclusión para que los registros sean ingeridos pero no indexados si se utilizan solo para Storage Management. Para más detalles, consulte <a href="https://www.datadoghq.com/pricing/?product=log-management">los precios de Log Management de Datadog</a>.</div>

[208]: /es/integrations/amazon-s3/#enable-s3-access-logs
{{% /collapse-content %}}

### Pasos posteriores a la configuración {#post-setup-steps}

Después de que los archivos de inventario comiencen a aparecer en el bucket de destino, regístrelo con Storage Management llamando al endpoint [Habilitar Storage Management para un bucket][209]:

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
          "aws_account_id": "<AWS_ACCOUNT_ID>",
          "destination_bucket_name": "<DESTINATION_BUCKET_NAME>",
          "destination_bucket_region": "<DESTINATION_BUCKET_REGION>",
          "destination_prefix": "<DESTINATION_PREFIX>"
        }
      }
    }
  }'
```

Para usar el ejemplo anterior:
- Reemplace `<AWS_ACCOUNT_ID>` con el ID de cuenta de AWS de 12 dígitos que posee el bucket de destino.
- Reemplace `<DESTINATION_BUCKET_NAME>` con el nombre del bucket de destino que contiene los informes de inventario.
- Reemplace `<DESTINATION_BUCKET_REGION>` con la región de AWS del bucket de destino.
- Reemplace `<DESTINATION_PREFIX>` con el prefijo dentro del bucket de destino donde se escriben los archivos de inventario. Utilice una cadena vacía si no hay prefijo.

Una `200` respuesta confirma que la Gestión de Almacenamiento está habilitada para el bucket de destino.

[209]: /es/api/latest/storage-management/#enable-storage-management-for-a-bucket

{{% /tab %}}

{{< /tabs >}}

### Validación {#validation}

Para verificar su configuración:
1. Espere a que se genere el primer informe de inventario (hasta 24 horas para inventarios diarios).
2. Navegue a **Infraestructura** > [**Gestión de Almacenamiento**][3] para ver si los buckets que configuró aparecen en la lista del explorador cuando se selecciona **Buckets monitoreados**.

  {{< img src="infrastructure/storage_management/monitored-buckets.png" alt="Valide que el bucket esté habilitado para monitoreo" responsive="true">}}

### Mejores prácticas {#best-practices}

Siga estas mejores prácticas para optimizar la configuración de Storage Management:
- **Configure políticas de ciclo de vida para los buckets de destino de inventario**: Los informes de inventario de S3 se generan diariamente y se almacenan en su bucket de destino. Para evitar que los archivos de inventario antiguos se acumulen y generen costos de almacenamiento, agregue una política de ciclo de vida para eliminar automáticamente los informes de inventario que tengan más de tres días.

- **Configure políticas de ciclo de vida para los registros de acceso de S3**: Si ha habilitado los registros de acceso de S3 para métricas de solicitudes a nivel de prefijo, los archivos de registro en bruto se acumulan en su bucket de destino. Después de que estos registros se envían a Datadog, los archivos en bruto ya no son necesarios para fines de Storage Management. Para eliminar automáticamente los archivos de registro de acceso después de enviarlos a Datadog, agregue una regla de ciclo de vida.

  **Nota**: Antes de habilitar la eliminación automática, verifique que no existan requisitos de cumplimiento o auditoría en su organización que exijan conservar los registros de acceso de S3 en bruto por un período específico.

- **Cree filtros de exclusión para los registros de acceso de S3**: Si los registros de acceso de S3 se envían a Datadog solo para Storage Management y no necesitan ser indexados para búsqueda o análisis, agregue un [filtro de exclusión][4] para mantenerlos fuera del volumen de registros indexados.

### Solución de problemas {#troubleshooting}

Si no ves datos para los buckets que configuraste para la gestión de almacenamiento, utiliza la página de [Configuración de Gestión de Almacenamiento][9] para ver todos los buckets configurados, su estado de inventario y cualquier error de configuración. La página muestra problemas con pasos de remediación accionables.
Si tiene alguna pregunta, [contacte a Datadog][1].

## Identifique y actúe sobre ahorros de costos con Bits Chat {#identify-and-act-on-cost-savings-with-bits-chat}

{{< callout url="https://docs.google.com/forms/d/e/1FAIpQLScbFjbJecpVV-DgJNBt2O205KtaWlD_q6ajThIEX9vTGz6ebA/viewform?usp=publish-editor" >}}
Bits Chat for Storage Management está en vista previa. Para probar esta habilidad, solicite acceso.
{{< /callout >}} 


Los equipos de FinOps e ingeniería pueden utilizar Bits Chat y Storage Management para identificar oportunidades de ahorro de costos en S3, generar informes en Datadog Notebooks e implementar los cambios recomendados. Para usar Bits Chat con Storage Management, habilite la habilidad `storage` en la configuración de Bits Chat.

Con la habilidad `storage` habilitada para Bits Chat, puede:

- **Encuentre las mayores oportunidades de ahorro**: Realice preguntas en lenguaje natural para identificar los prefijos, clases de almacenamiento o buckets de mayor impacto donde los cambios de ciclo de vida reducirían los costos en mayor medida.
- **Cree informes a través de Notebooks**: Genere un Notebook de Datadog que resuma los hallazgos, los ahorros estimados y las acciones recomendadas para que su equipo los revise y los comparta.
- **Implemente cambios**: Obtenga orientación paso a paso con [Bits Code][10] para aplicar políticas de ciclo de vida, trasladar objetos a niveles de almacenamiento más económicos o eliminar versiones no actuales en los prefijos con el mayor potencial de ahorro.


## Visualice el uso granular de S3 con métricas de inventario {#visualize-granular-s3-usage-with-inventory-metrics}

Una plantilla de dashboard de Storage Management S3 [lista para usar][8] está disponible para ayudarle a visualizar las métricas que se indican a continuación. Puede clonarlo y personalizarlo para que se ajuste a sus necesidades.

| Nombre de la métrica                                            | Etiquetas notables                                                                                  | Descripción                                                                                                                                    |
|--------------------------------------------------------|-----------------------------------------------------------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------|
| aws.s3.inventory.total_prefix_size                     | `bucketname`, `prefix`, `region`, `storagetype`, `extension`, `delete_marker`, `is_latest`    | Cantidad total de datos, en bytes, almacenados en un prefijo.                                                                                            |
| aws.s3.inventory.average_prefix_size                   | `bucketname`, `prefix`, `region`                                                              | Tamaño promedio de objeto, en bytes, para objetos en un prefijo.                                                                                        |
| aws.s3.inventory.prefix_object_count                   | `bucketname`, `prefix`, `region`, `storagetype`, `extension`, `delete_marker`, `is_latest`    | El número total de objetos almacenados en un prefijo.                                                                                                |
| aws.s3.inventory.prefix_object_count.levels            | `bucketname`, `prefixN*`, `region`, `storagetype`, `extension`, `delete_marker`               | Conteos de objetos agregados a niveles de prefijo jerárquicos, utilizados para visualizaciones de treemap.                                                       |
| aws.s3.inventory.total_prefix_size.levels              | `bucketname`, `prefixN*`, `region`, `storagetype`, `extension`, `delete_marker`               | Tamaño de prefijo agregado a niveles de prefijo jerárquicos, utilizados para visualizaciones de treemap.                                                         |
| aws.s3.inventory.prefix_age_days                       | `bucketname`, `prefix`, `region`                                                              | Edad, en días, del objeto más antiguo en el bucket o prefijo.                                                                                    |
| aws.s3.inventory.prefix_small_file_size                | `bucketname`, `prefix`, `region`, `storagetype`                                               | Tamaño total, en bytes, de objetos menores de 128KB en un prefijo. Ayuda a identificar costos indirectos en niveles de almacenamiento como Glacier y Standard-IA.   |
| aws.s3.inventory.prefix_small_file_count               | `bucketname`, `prefix`, `region`, `storagetype`                                               | Número de objetos menores de 128KB en un prefijo. Ayuda a identificar costos indirectos en niveles de almacenamiento como Glacier y Standard-IA.                   |
| aws.s3.inventory.access_logs.total_requests_by_method  | `bucketname`, `prefix`, `region`, `method`                                                    | Número total de solicitudes para objetos en un prefijo, opcionalmente dividido por método de solicitud (por ejemplo, GET o PUT). Requiere registros de acceso de S3 en Datadog.   |
| aws.s3.inventory.access_logs.request_latency_by_method | `bucketname`, `prefix`, `region`, `method`                                                    | Tiempo de respuesta del servidor para solicitudes en un prefijo, opcionalmente dividido por método de solicitud. Requiere registros de acceso de S3 en Datadog.                          |

  *`prefixN` se refiere a niveles de prefijo como `prefix0`, `prefix1`, `prefix2`, y así sucesivamente.

  **Nota:** Utilice la métrica correcta para la pregunta que está respondiendo:
  - `aws.s3.inventory.prefix_object_count` y `aws.s3.inventory.total_prefix_size` (con la etiqueta `prefix`) incluyen todo dentro de una carpeta y todas sus subcarpetas. Utilice estos cuando desee conocer el conteo total o el tamaño de una carpeta específica (por ejemplo, "¿cuánto hay en `logs/2024/`?").
  - `aws.s3.inventory.prefix_object_count.levels` y `aws.s3.inventory.total_prefix_size.levels` (con `prefix1`, `prefix2`, `prefix3`, y así sucesivamente) cuentan o miden objetos solo a esa profundidad exacta. Utilice estos cuando desee construir un treemap o comparar los tamaños de carpetas entre niveles (por ejemplo, "¿cuáles son las carpetas de nivel superior más grandes?").

  **Nota:** Para el monitoreo y la visualización más precisos, incluya todas las versiones de objetos para ver recomendaciones o métricas de objetos no actuales.


## Actúe sobre las optimizaciones con Storage Management Recommendations {#act-on-optimizations-with-storage-management-recommendations}

Storage Management analiza sus datos de inventario y registros de acceso para presentar recomendaciones a nivel de prefijo para reducir costos de almacenamiento en S3. Estas recomendaciones están disponibles para todos los clientes de Storage Management. Los ahorros potenciales se estiman utilizando los precios de lista de AWS. Si tiene habilitado Cloud Cost Management [7], las recomendaciones también aparecen en Cloud Cost Recommendations, y puede rastrear los ahorros reales de las optimizaciones.

Las recomendaciones se ejecutan a diario y se actualizan automáticamente en su cuenta tan pronto como se publican las recomendaciones.

### Requisitos previos {#prerequisites}
Ver recomendaciones tiene los siguientes requisitos previos:
1. Configure los buckets de S3 para Storage Management siguiendo los pasos anteriores en esta página.
2. Para ver recomendaciones sobre cómo mover datos de acceso poco frecuente a niveles más económicos por prefijo, habilite y reenvíe los registros de acceso de S3 a Datadog (se aplican tarifas de Log Management de Datadog).
3. Para ver recomendaciones sobre cómo identificar versiones no actuales en los prefijos, incluya "All versions" como parte de la configuración de S3 Inventory.

### Recomendaciones disponibles {#available-recommendations}
- Transicione los datos no accedidos de S3 en el prefijo a Acceso Infrecuente
- Expire los objetos de versiones no actuales en el prefijo del bucket de S3
- Consolide archivos pequeños en el prefijo para minimizar los costos de almacenamiento por objeto

  {{< img src="infrastructure/storage_management/storage-recs.png" alt="Storage Management Recommendations" responsive="true">}}


[1]: mailto:storage-monitoring@datadoghq.com
[3]: https://app.datadoghq.com/storage-management
[4]: /es/logs/log_configuration/indexes/#exclusion-filters
[7]: /es/cloud_cost_management/
[8]: https://app.datadoghq.com/dash/integration/32296/storage-management-for-amazon-s3
[9]: https://app.datadoghq.com/storage-management/settings
[10]: https://docs.datadoghq.com/es/bits_ai/bits_ai_dev_agent/