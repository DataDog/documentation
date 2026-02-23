---
description: Busca y analiza al instante logs de archivos de larga duración sin tener
  que volver a indexarlos.
further_reading:
- link: /logs/explorer/
  tag: Documentación
  text: Explorar logs en Datadog
- link: /logs/log_configuration/archives/
  tag: Documentación
  text: Configurar archivos de logs
- link: /logs/indexes/
  tag: Documentación
  text: Gestionar la retención y la indexación de logs
title: Archive Search
---

{{< callout url="https://www.datadoghq.com/product-preview/flex-frozen-archive-search/" btn_hidden="false" >}}
Archive Search está en vista previa. Solicita acceso para buscar logs archivados en tiempo real. Sin reindexación ni retrasos. Accede instantáneamente a años de datos cuando los necesites.
{{< /callout >}}

## Información general

Archive Search te permite consultar logs directamente desde archivos de almacenamiento de objetos a largo plazo, sin indexarlos previamente. Utiliza Archive Search para **acceder de forma inmediata a logs archivados**, para investigaciones, auditorías o resolución de problemas más allá de su periodo de retención de indexación.

Archive Search se diferencia de Rehydration en que transmite los resultados en tiempo real a medida que se escanean los datos, en lugar de ejecutarse como un trabajo en lote en segundo plano. Es más rentable, ya que solo se cobra por el escaneo en sí y los primeros 100 000 logs se conservan temporalmente sin coste alguno, y más rápido.

Al iniciar una búsqueda:

* Los logs se envían a una página específica de resultados.
* Se retienen hasta **100 000 logs** durante **24 horas**.
* Opcionalmente, puedes **indexar los resultados** antes o después de la búsqueda para conservarlos durante más tiempo y que estén disponibles en todo Datadog.

Esta función es compatible con logs archivados a través de:

- [archivos de Datadog Log Management][1]
- [archivos de Observability Pipelines][2]

### Casos de uso típicos

Archive Search es ideal cuando se necesita consultar logs que están almacenados en un archivo externo.
Los casos de uso más comunes son:

- **Investigaciones de incidentes:** recupera logs vinculados a un `transaction_id`, `user_id` o `session_id` que quedan fuera de tu retención de indexación.<br>
  *Ejemplo: consulta logs de hace tres semanas utilizando un `user_id` específico, incluso si tu retención indexada es de solo 15 días.*

- **Análisis de seguridad:** examina logs archivados para investigar intentos de inicio de sesión u otra actividad por IP o usuario.<br>
  *Ejemplo: recupera todos los intentos de inicio de sesión desde una dirección IP específica en los últimos 12 meses.

- **Apoyo al cumplimiento de normativas y auditorías:** accede a logs archivados de clientes o facturación para auditorías sin tener que reindexar permanentemente grandes volúmenes de datos.<br>
  *Ejemplo: consulta de logs relacionados con facturas (`customer_id:12345`, `service:billing`) de los últimos 18 meses para una auditoría fiscal.*

## Requisitos previos

Antes de utilizar Archive Search:

1. Configura un archivo externo (Amazon S3, Azure Storage o Google Cloud Storage). Consulta [Log Archives][3].
1. Asegúrate de que Datadog tiene permiso para leer del archivo, consulta [Permisos específicos de la nube](#cloud-specific-permissions).
   * **Amazon S3:** delegación de roles de IAM
   * **Azure Storage:** Azure AD con el rol *Storage Blob Data Contributor*
   * **Google Cloud Storage:** cuenta de servicio con el rol *Storage Object Viewer*

### Permisos

Los resultados de Archive Search son visibles para todos los usuarios de tu organización que tengan acceso a la función Archive Search. Sin embargo, las **consultas de restricción**, como los filtros de seguridad de logs y las restricciones de datos configuradas en Datadog, se siguen aplicando en la página de resultados y se aplican a todos los usuarios. Esto significa que cada usuario solo puede ver logs que están autorizados a ver sobre la base de los permisos y filtros de toda la organización.

Para obtener más información sobre los controles de acceso y la seguridad de logs, consulta [Cómo configurar RBAC para logs][6].

## Iniciar una búsqueda

1. Ve a [**Logs > Archive Search > New Search**][4] (Logs > Archive Search > Nueva búsqueda).
2. Selecciona un archivo y un intervalo de tiempo.
3. Introduce una consulta, como `user_id:abc123`.
4. (Opcional) Cambia el nombre de la búsqueda.
5. (Opcional) Habilita la indexación antes de iniciar la búsqueda.
6. Haz clic en **Search** (Buscar).

Los logs aparecen en tiempo real en la página de resultados. Una barra de progreso muestra el estado del escaneo, y puedes detener la búsqueda en cualquier momento.

## Vista previa de la consulta

Al crear o configurar una búsqueda, Datadog descarga una pequeña muestra (hasta 1000 logs) del archivo y el intervalo de tiempo seleccionados.
Utiliza esta vista previa para verificar la sintaxis de la consulta, inspeccionar la estructura del log y ajustar los filtros.

**Nota**: Es posible que la muestra de vista previa no incluya logs que coincidan con tu consulta. Es solo para validación y exploración.

## Ver y conservar los resultados

Por defecto, solo se cobra por el escaneo. Los primeros 100 000 logs se almacenan temporalmente (24 horas) sin coste alguno y son accesibles directamente en las páginas de resultados de Archive Search, donde puedes hacer clic en cualquier log para ver todos tus detalles y contexto. Transcurridas 24 horas, los resultados caducan automáticamente.

Para conservar más datos o acceder a logs en otros productos de Datadog, elige una de las siguientes opciones:

- **Índice antes del lanzamiento**:
  Conserva más de 100 000 logs, establece un periodo de retención personalizado (por ejemplo, 7, 15 o 30 días) y accede a los resultados en toda la plataforma de forma inmediata.
- **Índice tras la finalización**:
  Durante el intervalo de 24 horas, puedes indexar los resultados para ampliar su retención y hacer que estén disponibles en el Log Explorer, dashboards y notebooks.

## Analizar los resultados

Tras iniciar una búsqueda, los logs aparecen en **Archive Search Results** (Resultados de Archive Search). Desde la página, puedes utilizar filtros para limitar los resultados y abrir detalles específicos de logs para investigar los problemas.

### Limitaciones

Aunque la búsqueda de archivos proporciona acceso a los logs archivados, sus capacidades analíticas son limitadas en comparación con los logs indexados:

- **Sin agregaciones ni análisis**: no se pueden ejecutar agregaciones, crear visualizaciones ni realizar análisis avanzados directamente en los resultados de Archive Search.
- **Solo resultados de la página**: los resultados de Archive Search solo están disponibles en los resultados específicos de la página y no pueden consultarse desde otras partes de la plataforma de Datadog (como dashboards, notebooks o el Log Explorer).

Para habilitar el análisis completo y la visibilidad en toda la plataforma, debes indexar los resultados de la búsqueda (ya sea antes de iniciar la búsqueda o después de completarla dentro del intervalo de 24 horas). Una vez indexados, los logs estarán disponibles en todos los productos de Datadog con todas las funciones de agregación, visualización y análisis.


## Gestionar las búsquedas

<!-- {{< img src="path/to/your/image-name-here.png" alt="La descripción de tu imagen" style="width:100%;" >}} -->

Desde la [**vista de lista de Archive Search**][5], puedes:

- **Detener** una búsqueda en curso: conserva logs ya recuperados.
- **Duplicar** una búsqueda: abre el formulario de creación de la búsqueda de archivo con los mismos parámetros para una repetición eficaz.

## Rendimiento de búsqueda y volumen de escaneo

Archive Search escanea los archivos de log archivados dentro del intervalo de tiempo seleccionado. El **volumen de escaneo** es el tamaño total de los archivos leídos durante la consulta. Los volúmenes de escaneo grandes pueden aumentar el tiempo y el coste de la búsqueda.

Para mejorar el rendimiento de las consultas y reducir el volumen de escaneo:
- Reduce el intervalo de tiempo y utiliza filtros selectivos.
- Los administradores con permiso **Logs Write Archives** pueden establecer límites máximos de log y duraciones de retención disponibles.

## Permisos específicos de la nube

Datadog requiere el permiso de lectura de tus archivos para buscar contenido en ellos. Este permiso puede cambiarse en cualquier momento.

{{< tabs >}}
{{% tab "Amazon S3" %}}

Para rehidratar eventos de log desde tus archivos, Datadog utiliza el rol de IAM en tu cuenta de AWS que configuraste para [tu integración de AWS][1]. Si aún no has creado ese rol, [sigue estos pasos para hacerlo][2]. Para permitir que ese rol rehidrate eventos de log desde tus archivos, añade la siguiente declaración de permiso a sus políticas de IAM. Asegúrate de editar los nombres de los buckets y, si lo deseas, especifica las rutas que contienen tus archivos de log.

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

### Añadir la delegación de roles a archivos de S3

Datadog solo admite búsquedas en archivos que se hayan configurado para utilizar la delegación de roles para conceder acceso. Una vez que hayas modificado el rol de IAM de Datadog para incluir la política de IAM anterior, asegúrate de que cada archivo de tu [página de configuración de archivos][3] tenga la combinación correcta de cuenta + rol de AWS.

[1]: https://app.datadoghq.com/account/settings#integrations/amazon-web-services
[2]: /es/integrations/amazon-web-services/#aws-iam-permissions
[3]: https://app.datadoghq.com/logs/pipelines/archives
{{% /tab %}}

{{% tab "Azure Storage" %}}

Datadog utiliza un grupo de Azure AD con el rol Storage Blob Data Contributor asignado a la cuenta de almacenamiento de tus archivos para buscar eventos de log. Puedes otorgar este rol a tu cuenta de servicio de Datadog desde la página de Control de acceso (IAM) de tu cuenta de almacenamiento [al asignar el rol Storage Blob Data Contributor a tu aplicación de integración de Datadog][1].

[1]: /es/logs/archives/?tab=azurestorage#create-and-configure-a-storage-bucket
{{% /tab %}}

{{% tab "Google Cloud Storage" %}}

Para buscar eventos de log desde tus archivos, Datadog utiliza una cuenta de servicio con el rol Storage Object Viewer. Puedes otorgar este rol a tu cuenta de servicio de Datadog desde la [página Google Cloud IAM Admin][1] al editar los permisos de la cuenta de servicio, añadir otro rol y, a continuación, seleccionar **Storage > Storage Object Viewer** (Almacenamiento > Storage Object Viewer**.

[1]: https://console.cloud.google.com/iam-admin/iam
{{% /tab %}}
{{< /tabs >}}

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.datadoghq.com/es/logs/log_configuration/archives/?tab=awss3&site=us
[2]: https://docs.datadoghq.com/es/observability_pipelines/destinations/amazon_s3/?tab=docker
[3]: https://docs.datadoghq.com/es/logs/log_configuration/archives/?tab=awss3&site=us
[4]: https://app.datadoghq.com/logs/archive-search/new
[5]: https://app.datadoghq.com/logs/archive-search/
[6]: /es/logs/guide/logs-rbac/?tab=ui#restrict-access-to-logs