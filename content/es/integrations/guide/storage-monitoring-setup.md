---
private: true
title: Monitorización del almacenamiento para Amazon S3
---

<div class="alert alert-info">Monitorización del almacenamiento está en vista previa.</div>

## Información general

Monitorización del almacenamiento para Amazon S3 proporciona análisis detallados a nivel de prefijo para que puedas comprender exactamente cómo se utiliza el almacenamiento, detectar posibles problemas antes de que afecten a las operaciones y tomar decisiones basadas en datos sobre la optimización del almacenamiento. Utiliza esta información para ayudar a controlar el crecimiento del almacenamiento, investigar los patrones de acceso y optimizar los costes.

Esta guía explica cómo configurar la Monitorización de almacenamiento en Datadog para tus buckets de S3. Puedes configurar esto manualmente o utilizando las plantillas de CloudFormation proporcionadas. Accede a tus datos de Monitorización del almacenamiento navegando a **Infrastructure -> Resource Catalog -> Monitoring -> S3 Buckets** (Infraestructura -> Catálogo de recursos -> Monitorización -> Buckets S3).

Para obtener más información sobre el Catálogo de recursos, consulta la documentación [Catálogo de recursos][2].

## Configuración

### Instalación

{{< tabs >}}
{{% tab "CloudFormation" %}}

La forma más rápida de configurar la Monitorización de almacenamiento es utilizando las plantillas de CloudFormation proporcionadas. Este proceso implica dos pasos:

#### Paso 1: Configurar la generación de inventarios


Esta plantilla configura tu bucket de S3 existente para generar informes de inventario, que Datadog utiliza para generar métricas detalladas sobre tus prefijos de bucket.

1. Descarga la plantilla [source-bucket-inventory-cfn.yaml][101].
2. En [AWS CloudFormation][102], haz clic en **Create stack** (Crear stack) en la esquina superior derecha y selecciona **With existing resources (import resources)** (Con recursos existentes (importar recursos)).
3. En el paso **Specify template** (Especificar plantilla), selecciona **Upload a template file** (Cargar un archivo de plantilla).
4. Haz clic en **Choose file** (Seleccionar archivo) y selecciona el archivo `source-bucket-inventory-cfn.yaml`, a continuación, haz clic en **Next** (Siguiente).
5. Introduce el nombre del bucket para el que deseas que AWS empiece a generar inventarios y haz clic en **Next** (Siguiente).

 {{< img src="integrations/guide/storage_monitoring/identify_resources.png" alt="Identificar recursos de S3 para comenzar a generar inventario" responsive="true" style="width:90%;" >}}

6. Completa los parámetros necesarios:
   - **DestinationBucketName**: el bucket para almacenar los archivos de inventario. **Nota**: Sólo debes utilizar un bucket de destino para todos los archivos de inventario generados en una cuenta de AWS.
   - **DestinationBucketName**: el bucket que deseas monitorizar y para el que deseas empezar a generar archivos de inventario.
   - **DestinationBucketPrefix**: ruta específica dentro del bucket de destino. Asegúrate de que esta ruta no incluya barras finales (`/`).

   Parámetros opcionales:
   - **SourceBucketPrefix**: (opcional) limita la monitorización a una ruta específica en el bucket de origen.

{{< img src="integrations/guide/storage_monitoring/specify_stack_details.png" alt="Especificar detalles de stack tecnológico" responsive="true" style="width:90%;" >}}

7. Haz clic en **Next** (Siguiente).
8. Espera a que AWS localice tu bucket de origen y haz clic en **Import resources** (Importar recursos) en la esquina inferior derecha.

**Nota:** Esta plantilla de CloudFormation se puede revertir, pero la reversión no elimina los recursos creados. Esto es para asegurar que el bucket existente no se elimina. Puedes eliminar manualmente las configuraciones de inventario yendo a la pestaña **Management** (Gestión) en la vista del bucket.

**Nota:** Revisa los [precios de Amazon S3][106] para conocer los costes relacionados con la generación de inventario.
#### Paso 2: Configurar permisos necesarios

Esta plantilla crea dos políticas de IAM:
  - Una política para permitir que Datadog lea los archivos de inventario del bucket de destino.
  - Una política para permitir que tu bucket de origen escriba archivos de inventario en el bucket de destino.

1. Descarga la plantilla [cloud-inventory-policies-cfn.yaml][103].
2. En [AWS CloudFormation][104], haz clic en **Create stack** (Crear stack tecnológico) en la esquina superior derecha y selecciona **With new resources (standard)** (Con nuevos recursos (estándar)).
3. En el paso **Specify template** (Especificar plantilla), selecciona **Upload a template file** (Cargar un archivo de plantilla).
4. Haz clic en **Choose file** (Seleccionar archivo) y selecciona el archivo `cloud-inventory-policies-cfn.yaml`, a continuación, haz clic en **Next** (Siguiente).
5. Completa los parámetros necesarios:
   - **DatadogIntegrationRole**: tu nombre de rol de la integración de Datadog y AWS
   - **DestinationBucketName**: el nombre del bucket que recibe los archivos de inventario. **Nota**: Sólo debes utilizar un bucket de destino para todos los archivos de inventario generados en una cuenta de AWS.
   - **SourceBucketName**: el nombre del bucket para el que quieres empezar a generar archivos de inventario
   - **DestinationBucketPrefix**: si deseas reutilizar un bucket existente como destino, este parámetro permite que los archivos de inventario se envíen a un prefijo específico de ese bucket. Asegúrate de que los prefijos no incluyan barras finales (`/`).

   Parámetros opcionales:
   - **SourceBucketPrefix**: este parámetro limita la generación de inventario a un prefijo específico en el bucket de origen

{{< img src="integrations/guide/storage_monitoring/bucket_policy_stack_details.png" alt="Parámetros de stack tecnológico para la política de bucket" responsive="true" style="width:90%;" >}}

6. En el paso **Review and create** (Revisar y crear), comprueba que los parámetros se han introducido correctamente y haz clic en **Submit** (Enviar).

#### Pasos posteriores a la instalación

Después de completar la configuración de CloudFormation, rellena el [formulario posterior a la configuración][105] con la siguiente información necesaria:
1. Nombre del bucket de destino que contiene los archivos de inventario.
2. Prefijo donde se almacenan los archivos en el bucket de destino.
3. Nombre del bucket de origen que deseas monitorizar (el bucket que produce los archivos de inventario).
4. Región de AWS del bucket de destino que contiene los archivos de inventario.
5. ID de la cuenta de AWS que contiene los buckets.
6. ID de la organización de Datadog.

[101]: https://datadog-cloudformation-template.s3.us-east-1.amazonaws.com/aws/cloud-inventory/source-bucket-inventory-cfn.yaml
[102]: https://console.aws.amazon.com/cloudformation/
[103]: https://datadog-cloudformation-template.s3.us-east-1.amazonaws.com/aws/cloud-inventory/cloud-inventory-policies-cfn.yaml
[104]: https://console.aws.amazon.com/cloudformation/
[105]: https://forms.gle/L97Ndxr2XLen1GBs7
[106]: https://aws.amazon.com/s3/pricing/
{{% /tab %}}
{{% tab "Consola de AWS" %}}

Para configurar manualmente el [Inventario de Amazon S3][206] necesario y la configuración relacionada, sigue estos pasos:

#### Paso 1: Crear un bucket de destino

1. [Crea un bucket S3][201] para almacenar tus archivos de inventario. Este bucket funciona como la localización central para los informes de inventario. **Nota**: Solo debes utilizar un bucket de destino para todos los archivos de inventario generados en una cuenta de AWS.
2. Crea un prefijo dentro del bucket de destino (obligatorio).

#### Paso 2: Configurar el bucket y las políticas de rol de la integración

1. Sigue los pasos indicados en la [Guía del usuario de Amazon S3][202] para añadir una política de bucket a tu bucket de destino que permita el acceso de escritura (`s3:PutObject`) desde tus buckets de origen.

2. Asegúrate de que el rol de la integración de Datadog y AWS tiene permisos `s3:GetObject` y `s3:ListObjects` en el bucket de destino. Estos permisos permiten a Datadog leer los archivos de inventario generados.

#### Paso 3: Configurar la generación de inventarios

Para cada bucket que desees monitorizar:
1. Ve a la [página de buckets de Amazon S3][203] en la consola de AWS y selecciona el bucket.
2. Ve a la pestaña **Management** (Gestión) del bucket.
3. Haz clic en **Create inventory configuration** (Crear configuración del inventario).
4. Configura los siguientes ajustes:
  - Establece un nombre de configuración 
  - (Opcional) Especifica un prefijo de bucket de origen
  - **Versiones de objetos**: Datadog recomienda seleccionar **Current Versions Only** (Sólo versiones actuales).
  - **Destino**: selecciona el bucket de destino común para los archivos de inventario de tu cuenta de AWS. Por ejemplo, si el bucket se llama `destination-bucket`, introduce `s3://your-destination-bucket`
  **Nota**: Si deseas utilizar un prefijo en el bucket de destino, añade esto también
  - **Frecuencia**: Datadog recomienda elegir **Daily** (Diariamente). Esta opción determina la frecuencia con la que se actualizan las métricas de prefijo en Datadog
  - **Formato de salida**: CSV
  - **Estado**: Activado
  - **Cifrado del lado del servidor**: no especifiques una clave de cifrado
  - Selecciona los siguientes **Campos de metadatos adicionales**:
      1. Tamaño
      2. Última modificación
      3. Clase de almacenamiento

**Nota**: Revisa los [precios de Amazon S3][204] para conocer los costes relacionados con la generación de inventario.

#### Pasos posteriores a la instalación

Después de completar estos pasos, rellena el [formulario posterior a la configuración][205] con la siguiente información necesaria:

1. Nombre del bucket de destino donde se almacenan los inventarios.
2. Prefijo donde se almacenan los archivos en el bucket de destino.
3. Región del bucket de destino.
4. ID de la cuenta de AWS que contiene el bucket.
5. Nombre del rol de Datadog que tiene los permisos para leer objetos en el bucket de destino.
6. ID de la organización de Datadog.

[201]: https://console.aws.amazon.com/s3/bucket/create
[202]: https://docs.aws.amazon.com/AmazonS3/latest/userguide/add-bucket-policy.html
[203]: https://console.aws.amazon.com/s3/buckets
[204]: https://aws.amazon.com/s3/pricing/
[205]: https://forms.gle/L97Ndxr2XLen1GBs7
[206]: https://docs.aws.amazon.com/AmazonS3/latest/userguide/configure-inventory.html
{{% /tab %}}{{< /tabs >}}

### Validación

Para verificar tu configuración:
   - Espera a que se genere el primer informe de inventario (hasta 24 horas para inventarios diarios)
   - Comprueba el bucket de destino para los archivos de inventario
   - Confirma que la integración de Datadog puede acceder a los archivos:
       - Navega a **Infrastructure -> Resource Catalog -> Monitoring -> S3 Buckets -> Installation Recommendations** (Infraestructura -> Catálogo de recursos -> Monitorización -> Buckets de S3 -> Recomendaciones de instalación) para ver si el bucket que configuraste se muestra en la lista


### Resolución de problemas
Si tienes algún problema o necesitas ayuda:
- Verifica que todos los permisos están correctamente configurados
- Si sigues teniendo problemas, [ponte en contacto][1] con los datos de tu bucket, el ID de cuenta de AWS y el ID de organización de Datadog.

[1]: mailto:storage-monitoring@datadoghq.com
[2]: /es/infrastructure/resource_catalog/