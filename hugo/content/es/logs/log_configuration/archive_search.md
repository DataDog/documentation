---
description: Busque y analice instantáneamente los registros de archivos a largo plazo
  sin necesidad de reindexar.
further_reading:
- link: /logs/explorer/
  tag: Documentación
  text: Explore los registros en Datadog
- link: /logs/log_configuration/archives/
  tag: Documentación
  text: Configure los Archivos de Registros
- link: /logs/indexes/
  tag: Documentación
  text: Administre la retención y el indexado de registros
title: Búsqueda de Archivos
---
## Resumen {#overview}

La Búsqueda de Archivos le permite consultar registros directamente desde archivos de almacenamiento de objetos a largo plazo, sin necesidad de rehidratarlos previamente. Utilice la Búsqueda de Archivos para **acceso inmediato a registros archivados**, para investigaciones, auditorías o resolución de problemas más allá del período de retención de la indexación.

La Búsqueda de Archivos se diferencia de la Rehidratación al transmitir resultados en tiempo real a medida que se escanean los datos, en lugar de ejecutarse como un trabajo por lotes en segundo plano. Es más rentable, cobrando solo por el escaneo en sí, con los primeros 100,000 registros retenidos temporalmente sin costo, y más rápido.

Cuando inicie una búsqueda:

* Los registros se transmiten a una página de resultados dedicada.
* Hasta **100,000 registros** se retienen por **24 horas**.
* Puede opcionalmente **Rehidratar resultados** antes o después de la búsqueda para mantenerlos más tiempo y hacerlos disponibles en todo Datadog.

Esta función admite registros archivados a través de:

- [Log Management archives][1]
- [Observability Pipelines archives][2]

### Casos de uso típicos {#typical-use-cases}

La Búsqueda de Archivos es ideal cuando necesita consultar registros que están almacenados en un archivo externo.
Los casos de uso comunes incluyen:

- **Investigaciones de incidentes:** Recuperar registros relacionados con un `transaction_id`, `user_id` o `session_id` que caen fuera de su retención de indexación.<br>
  *Ejemplo: Consultar registros de hace tres semanas utilizando un `user_id` específico, incluso si su retención indexada es de solo 15 días.*

- **Análisis de seguridad:** Examinar registros archivados para investigar intentos de inicio de sesión u otra actividad por IP o usuario.<br>
  *Ejemplo: Recuperar todos los intentos de inicio de sesión desde una dirección IP específica en los últimos 12 meses.*

- **Cumplimiento y soporte de auditoría:** Acceder a registros archivados de clientes o facturación para auditorías sin reindexar permanentemente grandes volúmenes de datos.<br>
  *Ejemplo: Consultar registros relacionados con facturas (`customer_id:12345`, `service:billing`) de los últimos 18 meses para una auditoría fiscal.*

## Requisitos previos {#prerequisites}

Antes de usar la Búsqueda de Archivos:

1. Configurar un archivo externo (Amazon S3, Azure Storage o Google Cloud Storage). Ver [Log Archives][3].
1. Asegúrese de que Datadog tenga permiso para leer del archivo, consulte [Permisos específicos de la nube](#cloud-specific-permissions).
   * **Amazon S3:** Delegación de rol IAM
   * **Azure Storage:** Azure AD con el rol *Storage Blob Data Contributor*
   * **Google Cloud Storage:** Cuenta de servicio con rol de *Storage Object Viewer*

### Permisos {#permissions}

Ejecutar una **Búsqueda de Archivos** requiere el **`logs_write_historical_views`** permiso. Es un **permiso** global, pero los usuarios solo pueden buscar registros de archivos para los cuales también tienen el permiso de **Logs Read Archive**.

Los resultados de la Búsqueda de Archivos son visibles para todos los usuarios en su organización que tienen acceso a la función de Búsqueda de Archivos. Sin embargo, las **consultas de restricción**, como los filtros de seguridad de registros y las restricciones de datos configuradas en Datadog, aún se aplican en la página de resultados y se aplican a todos los usuarios. Esto significa que cada usuario solo puede ver los registros a los que está autorizado a acceder, según los permisos y filtros de toda la organización.

Para obtener más información sobre los controles de acceso y la seguridad del registro, consulte [Cómo configurar RBAC para registros][6].

## Iniciando una búsqueda {#launching-a-search}

1. Ir a [{{< ui >}}Logs{{< /ui >}} > {{< ui >}}Archive Search{{< /ui >}} > {{< ui >}}New Search{{< /ui >}}][4].
2. Seleccione un archivo y un rango de tiempo.
3. Ingrese una consulta, como `user_id:abc123`.
4. (Opcional) Renombre la búsqueda.
5. En {{< ui >}}Mode{{< /ui >}}, elija el tipo de búsqueda que desea realizar.
   - Elija {{< ui >}}Search{{< /ui >}} para recuperar resultados en tiempo real, con hasta 100,000 registros retenidos durante 24 horas.
   - Elija {{< ui >}}Search & Rehydration{{< /ui >}} para rehidratar resultados para acceso completo a la plataforma y retención personalizada.
6. Haga clic en {{< ui >}}Search{{< /ui >}}.

Los registros se transmiten a la página de resultados en tiempo real. Una barra de progreso muestra el estado del escaneo, y puede cancelar la búsqueda en cualquier momento.

## Vista previa de la consulta {#query-preview}

Cuando realiza una búsqueda, Datadog descarga una pequeña muestra (hasta 1,000 registros) del archivo y rango de tiempo seleccionados.
Utilice esta vista previa para verificar la sintaxis de la consulta, inspeccionar la estructura de los registros y ajustar los filtros.

**Nota**: La muestra de vista previa puede no incluir registros que coincidan con su consulta. Es solo para validación y exploración.

## Ver y retener resultados {#view-and-retain-results}

Por defecto, solo se le cobra por el escaneo. Los primeros 100,000 registros se almacenan temporalmente (24 horas) sin costo y son accesibles directamente desde la página de resultados de la Búsqueda de Archivos, donde puede hacer clic en cualquier registro para ver sus detalles completos y contexto. Después de 24 horas, los resultados expiran automáticamente.

Para retener más datos o acceder a registros en otros productos de Datadog, elija una de las siguientes opciones:

- **Rehidratar antes del lanzamiento**:
  Retenga más de 100,000 registros, establezca un período de retención personalizado (por ejemplo, 7, 15 o 30 días) y acceda a los resultados en toda la plataforma de inmediato.
- **Rehidratar después de la finalización**:
  Durante la ventana de 24 horas, puede rehidratar los resultados para extender la retención y ponerlos a disposición en Log Explorer, Dashboards y Notebooks.

## Analizar resultados {#analyze-results}

Después de lanzar una búsqueda, los registros fluyen hacia la página {{< ui >}}Archive Search Results{{< /ui >}}. Desde esta página, puede utilizar filtros para reducir los resultados y abrir detalles específicos de los registros para investigar problemas.

### Limitaciones {#limitations}

Mientras que la Búsqueda de Archivos proporciona acceso a registros archivados, tiene capacidades analíticas limitadas en comparación con los registros indexados:

- **Sin agregaciones ni análisis**: No puede ejecutar agregaciones, crear visualizaciones o realizar análisis avanzados directamente en los resultados de la Búsqueda de Archivos.
- **Página de resultados solamente**: Los resultados de la Búsqueda de Archivos solo están disponibles en la página de resultados dedicada y no se pueden consultar desde otras partes de la plataforma de Datadog (como Dashboards, Notebooks o Log Explorer).

Para habilitar análisis completos y visibilidad en toda la plataforma, debe rehidratar los resultados de búsqueda (ya sea antes de lanzar la búsqueda o después de su finalización dentro de la ventana de 24 horas). Cuando se rehidratan, sus registros están disponibles en todos los productos de Datadog con capacidades completas de agregación, visualización y análisis.

## Gestionar búsquedas {#manage-searches}

<!-- {{< img src="path/to/your/image-name-here.png" alt="Tu descripción de imagen" style="width:100%;" >}} -->

Desde el [{{< ui >}}Archive Search list view{{< /ui >}}][5], puede:

- **Cancelar** una búsqueda en curso: preserva los registros ya recuperados.
- **Duplicar** una búsqueda: abre el formulario de creación de búsquedas de la Búsqueda de Archivos con los mismos parámetros para ejecuciones eficientes.

## Rendimiento de búsqueda y optimización {#search-performance-and-optimization}

La Búsqueda de Archivos escanea los archivos de registro archivados dentro del rango de tiempo seleccionado. **El volumen de escaneo** se refiere al tamaño total de los archivos leídos durante una consulta. Los grandes volúmenes de escaneo pueden aumentar tanto el tiempo de búsqueda como los costos de salida en la nube.

Para optimizar el rendimiento y reducir costos:
* **Reduce el rango de tiempo:** Limite su búsqueda a la ventana más pequeña posible.
* **Establecer límites de escaneo:** Los administradores con `Logs Write Archives` permisos pueden establecer un tamaño máximo de escaneo por archivo en el {{< ui >}}Settings{{< /ui >}}.
* **Usar atributos de partición (Vista previa):** La forma más efectiva de acelerar las búsquedas en datos de baja cardinalidad como `service`, `env` o `status`. Datadog omite particiones enteras que no coinciden con su consulta.
* **Usar atributos de búsqueda (Vista previa):** La forma más efectiva de acelerar las búsquedas en datos de alta cardinalidad como `trace_id` o `user_id`.
* **Usar compresión zstd:** Los archivos utilizan compresión zstd por defecto, lo que reduce el volumen de escaneo y los costos de salida en la nube en comparación con gzip. Si su archivo utiliza gzip, consulte [Log Archives][9] para cambiar a zstd.

**Nota**: Solo los registros archivados después de que configure los atributos de partición o de búsqueda se benefician de búsquedas aceleradas. Los registros archivados antes de esta configuración no se ven afectados.


### Acelera las búsquedas con atributos de partición {#accelerate-searches-with-partition-attributes}

Puede configurar **atributos de partición** en sus archivos para agrupar registros por valores de campo de baja cardinalidad en el momento de la escritura. Utilice atributos como `service`, `source`, `env` o `status`.

Los registros que comparten los mismos valores de partición están co-localizados en el almacenamiento. Cuando busca, Datadog evalúa su consulta contra los metadatos de partición y omite las particiones que no coinciden, reduciendo el total de datos escaneados.

Para configurarlo, consulte la documentación de [archivos de registro][8].

### Acelere las búsquedas con atributos de búsqueda {#accelerate-searches-with-lookup-attributes}

Puede configurar **Atributos de Búsqueda** en sus archivos para omitir bloques de datos irrelevantes en su bucket de almacenamiento. Por ejemplo, si configura `trace_id` o `user_id`, reduce significativamente el volumen de datos escaneados y disminuye las tarifas de salida de su proveedor de nube.

Para configurarlo, consulte la documentación de [archivos de registro][7].

### Partición vs. atributos de búsqueda {#partition-vs-lookup-attributes}

| | Partición | Búsqueda |
|---|---|---|
| Cardinalidad | Baja (decenas a cientos) | Alta (millones de valores) |
| Atributos típicos | `service`, `source`, `env`, `status` | `trace_id`, `container_id`, `user_id`, `transaction_id` |
| Cómo ayuda | Elimina particiones enteras del escaneo | Localiza entradas de registro individuales |
| Mejor utilizado para | Filtrado amplio por entorno/servicio | Investigaciones ad-hoc sobre identificadores específicos |

Para un rendimiento máximo en las búsquedas, combine ambos: los atributos de partición reducen el alcance de búsqueda a los segmentos de datos relevantes, mientras que los atributos de búsqueda le permiten encontrar registros específicos dentro de esos segmentos al instante.

### Límite predeterminado para la Rehidratación de Resultados {#default-limit-for-rehydration-of-results}

Los administradores con el `Logs Write Archives` permiso pueden configurar controles predeterminados para asegurar un uso eficiente de {{< ui >}}Archive Search{{< /ui >}} entre equipos. Haga clic en {{< ui >}}Settings{{< /ui >}} para configurar:

- {{< ui >}}Default Rehydration volume limit{{< /ui >}}: Defina el número predeterminado de registros (en millones) que pueden ser rehidratados por búsqueda de archivo en modo {{< ui >}}Search & Rehydration{{< /ui >}}. Si se alcanza el límite, la búsqueda de archivo se detiene automáticamente, pero los registros ya rehidratados permanecen accesibles. Los administradores también pueden permitir que este límite se anule durante la creación de la búsqueda en el archivo.

- {{< ui >}}Rehydration retention periods{{< /ui >}}: Elija qué períodos de retención están disponibles al rehidratar resultados. Solo las duraciones seleccionadas (por ejemplo, 3, 7, 15, 30, 45, 60, 90 o 180 días) aparecen en el menú desplegable al seleccionar cuánto tiempo deben permanecer los registros disponibles para búsqueda en Datadog.

## Permisos específicos de la nube {#cloud-specific-permissions}

Datadog requiere el permiso para leer sus archivos para buscar contenido dentro de ellos. Este permiso se puede cambiar en cualquier momento.

{{< tabs >}}
{{% tab "Amazon S3" %}}

Para rehidratar eventos de registro de sus archivos, Datadog utiliza el rol IAM en su cuenta de AWS que configuró para [su integración de AWS][1]. Si aún no ha creado ese rol, [siga estos pasos para hacerlo][2]. Para permitir que ese rol rehidrate eventos de registro de sus archivos, agregue la siguiente declaración de permiso a sus políticas IAM. Asegúrese de editar los nombres de los buckets y, si lo desea, especifique las rutas que contienen sus archivos de registro.

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "DatadogUploadAndRehydrateLogArchives",
      "Effect": "Allow",
      "Action": ["s3:PutObject", "s3:GetObject"],
      "Resource": [
        "arn:aws:s3:::<MY_BUCKET_NAME_1_/_MY_OPTIONAL_BUCKET_PATH_1>/*",
        "arn:aws:s3:::<MY_BUCKET_NAME_2_/_MY_OPTIONAL_BUCKET_PATH_2>/*"
      ]
    },
    {
      "Sid": "DatadogRehydrateLogArchivesListBucket",
      "Effect": "Allow",
      "Action": "s3:ListBucket",
      "Resource": [
        "arn:aws:s3:::<MY_BUCKET_NAME_1>",
        "arn:aws:s3:::<MY_BUCKET_NAME_2>"
      ]
    }
  ]
}
```

### Agregando delegación de roles a archivos S3 {#adding-role-delegation-to-s3-archives}

Datadog solo admite la búsqueda de archivos que han sido configurados para usar delegación de roles para otorgar acceso. Después de haber modificado su rol IAM de Datadog para incluir la política IAM anterior, asegúrese de que cada archivo en su [página de configuración de archivos][3] tenga la combinación correcta de cuenta de AWS + rol.

[1]: https://app.datadoghq.com/account/settings#integrations/amazon-web-services
[2]: /es/integrations/amazon-web-services/#aws-iam-permissions
[3]: https://app.datadoghq.com/logs/pipelines/archives
{{% /tab %}}

{{% tab "Azure Storage" %}}

Datadog utiliza un grupo de Azure AD con el rol de Contribuyente de Datos de Blob de Almacenamiento limitado a la cuenta de almacenamiento de sus archivos para buscar eventos de registro. Puede otorgar este rol a su cuenta de servicio de Datadog desde la página de Control de Acceso (IAM) de su cuenta de almacenamiento al [asignar el rol de Contribuyente de Datos de Blob de Almacenamiento a su aplicación de integración de Datadog][1].

[1]: /es/logs/archives/?tab=azurestorage#create-and-configure-a-storage-bucket
{{% /tab %}}

{{% tab "Google Cloud Storage" %}}

Para buscar eventos de registro en sus archivos, Datadog utiliza una cuenta de servicio con el rol de Visualizador de Objetos de Almacenamiento. Puede otorgar este rol a su cuenta de servicio de Datadog desde la [página de administración de IAM de Google Cloud][1] editando los permisos de la cuenta de servicio, agregando otro rol y luego seleccionando {{< ui >}}Storage{{< /ui >}} > {{< ui >}}Storage Object Viewer{{< /ui >}}.

[1]: https://console.cloud.google.com/iam-admin/iam
{{% /tab %}}
{{< /tabs >}}

## Lectura adicional {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/logs/log_configuration/archives/?tab=awss3
[2]: /es/observability_pipelines/destinations/datadog_archives/?tab=docker
[3]: /es/logs/log_configuration/archives/?tab=awss3
[4]: https://app.datadoghq.com/logs/archive-search/new
[5]: https://app.datadoghq.com/logs/archive-search/
[6]: /es/logs/guide/logs-rbac/?tab=ui#restrict-access-to-logs
[7]: /es/logs/log_configuration/archives/?tab=awss3#archive-search-lookup-attribute
[8]: /es/logs/log_configuration/archives/?tab=awss3#archive-search-partition-attribute
[9]: /es/logs/log_configuration/archives/?tab=awss3#compression