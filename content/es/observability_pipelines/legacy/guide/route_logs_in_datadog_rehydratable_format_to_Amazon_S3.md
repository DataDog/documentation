---
aliases:
- /es/observability_pipelines/guide/route_logs_in_datadog_rehydratable_format_to_Amazon_S3/
disable_toc: false
further_reading:
- link: /observability_pipelines/legacy/working_with_data/
  tag: Documentación
  text: Trabajar con datos en Observability Pipelines
- link: /logs/log_configuration/archives/
  tag: Documentación
  text: Más información sobre Archivos de logs
- link: /logs/log_configuration/rehydrating/
  tag: Documentación
  text: Más información sobre la rehidratación de archivos de log
title: (LEGACY) Logs de ruta  en formato rehidratable de Datadog a Amazon S3
---

<div class="alert alert-danger">El destino Observability Pipelines Datadog Archives está en fase beta.</div>

## Información general

El destino de Observability Pipelines `datadog_archives` formatea logs en un formato rehidratable de Datadog y luego los dirige a los [Archivos de log][1]. Estos logs no se ingieren en Datadog, sino que se envían directamente al archivo. A continuación, puedes rehidratar el archivo en Datadog cuando necesites analizarlo e investigarlo.

El destino Observability Pipelines Datadog Archives es útil cuando:
- Dispones de un gran volumen de logs con ruido, pero es posible que debas indexarlos en Gestión de logs ad hoc.
- Tienes una política de retención.

Por ejemplo, en este primer diagrama, algunos logs se envían a un almacenamiento en la nube para archivarlos y otros a Datadog para analizarlos e investigarlos. Sin embargo, los logs enviados directamente al almacenamiento en la nube no pueden rehidratarse en Datadog cuando se necesita investigarlos.

{{< img src="observability_pipelines/guide/datadog_archives/op-cloud-storage.png" alt="Un diagrama que muestra logs que se dirigen al almacenamiento en la nube y Datadog." >}}

En este segundo diagrama, todos los logs van al Datadog Agent, incluidos los logs que iban a un almacenamiento en la nube en el primer diagrama. Sin embargo, en el segundo escenario, antes de que los logs se ingieran en Datadog, el destino `datadog_archives` formatea y enruta los logs que habrían ido directamente a un almacenamiento en la nube al Archivo de logs de Datadog en su lugar. Los logs en el Archivo de logs pueden rehidratarse en Datadog cuando sea necesario.

{{< img src="observability_pipelines/guide/datadog_archives/op-datadog-archives.png" alt="Un diagrama que muestra los logs que se dirigen a Datadog." >}}

Esta guía te explica cómo:

- [Configurar un Archivo de log](#configure-a-log-archive)
- [Configurar el destino `datadog_archives`](#configure-the-datadog_archives-destination)
- [Rehidratar tu archivo](#rehydrate-your-archive)

`datadog_archives` está disponible para el worker de Observability Pipelines versión 1.5 y posteriores.

## Configurar un Archivo de log

### Crear un bucket de Amazon S3

{{< site-region region="us,us3,us5" >}}
Consulta [Precios de AWS][1] para conocer las tarifas de transferencia de datos entre regiones y cómo pueden verse afectados los costes de almacenamiento en la nube.

[1]: https://aws.amazon.com/s3/pricing/
{{< /site-region >}}

1. Navega hasta [buckets de Amazon S3][2].
1. Haz clic en **Create bucket** (Crear bucket).
1. Introduce un nombre descriptivo para tu bucket.
1. No pongas tu bucket a disposición del público.
1. Si lo deseas, añade etiquetas (tags).
1. Haz clic en **Create bucket** (Crear bucket).

### Configurar una política de IAM que permita a los Workers escribir en el bucket de S3

1. Navega hasta la [consola de IAM][3].
1. Selecciona **Polices** (Políticas) en el menú de la izquierda.
1. Haz clic en **Create policy** (Crear política).
1. Haz clic en **JSON** en la sección **Specify permissions** (Especificar permisos).
1. Copia la siguiente política y péguela en el **Policy editor** (Editor de políticas). Sustituye `<MY_BUCKET_NAME>` y `<MY_BUCKET_NAME_1_/_MY_OPTIONAL_BUCKET_PATH_1>` por la información del bucket de S3 que creaste anteriormente.
{{< code-block lang="json">}}
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "DatadogUploadAndRehydrateLogArchives",
            "Effect": "Allow",
            "Action": ["s3:PutObject", "s3:GetObject"],
            "Resource": "arn:aws:s3:::<MY_BUCKET_NAME_1_/_MY_OPTIONAL_BUCKET_PATH_1>/*"
        },
        {
            "Sid": "DatadogRehydrateLogArchivesListBucket",
            "Effect": "Allow",
            "Action": "s3:ListBucket",
            "Resource": "arn:aws:s3:::<MY_BUCKET_NAME>"
        }
    ]
}
{{< /code-block >}}
1. Haz clic en **Next** (Siguiente).
1. Introduce un nombre descriptivo de política.
1. Si lo deseas, añade etiquetas (tags).
1. Haz clic en **Create policy** (Crear política).

{{< tabs >}}
{{% tab "Docker" %}}

### Crear un usuario de IAM

Crea un usuario de IAM y adjúntale la política de IAM que creaste anteriormente.

1. Navega hasta la [consola de IAM][1].
1. Selecciona **Users** (Usuarios) en el menú de la izquierda.
1. Haz clic en **Create user** (Crear usuario).
1. Introduce un nombre de usuario.
1. Haz clic en **Next** (Siguiente).
1. Selecciona **Attach policies directly** (Adjuntar políticas directamente).
1. Elige la política de IAM que creaste anteriormente para adjuntarla al nuevo usuario de IAM.
1. Haz clic en **Next** (Siguiente).
1. Si lo deseas, añade etiquetas (tags).
1. Haz clic en **Create user** (Crear usuario).

Crea credenciales de acceso para el nuevo usuario de IAM. Guarda estas credenciales como `AWS_ACCESS_KEY` y `AWS_SECRET_ACCESS_KEY`.

[1]: https://console.aws.amazon.com/iam/

{{% /tab %}}
{{% tab "AWS EKS" %}}

### Crear una cuenta de servicio

[Crea una cuenta de servicio][1] para utilizar la política que creaste anteriormente. En la configuración de Helm, sustituye `${DD_ARCHIVES_SERVICE_ACCOUNT}` por el nombre de la cuenta de servicio.


[1]: https://docs.aws.amazon.com/eks/latest/userguide/associate-service-account-role.html
{{% /tab %}}
{{% tab "Linux basado en APT" %}}

### Crear un usuario de IAM

Crea un usuario de IAM y adjúntale la política de IAM que creaste anteriormente.

1. Navega hasta la [consola de IAM][1].
1. Selecciona **Users** (Usuarios) en el menú de la izquierda.
1. Haz clic en **Create user** (Crear usuario).
1. Introduce un nombre de usuario.
1. Haz clic en **Next** (Siguiente).
1. Selecciona **Attach policies directly** (Adjuntar políticas directamente).
1. Elige la política de IAM que creaste anteriormente para adjuntarla al nuevo usuario de IAM.
1. Haz clic en **Next** (Siguiente).
1. Si lo deseas, añade etiquetas (tags).
1. Haz clic en **Create user** (Crear usuario).

Crea credenciales de acceso para el nuevo usuario de IAM. Guarda estas credenciales como `AWS_ACCESS_KEY` y `AWS_SECRET_ACCESS_KEY`.

[1]: https://console.aws.amazon.com/iam/

{{% /tab %}}
{{% tab "RPM-based Linux" %}}

### Crear un usuario de IAM

Crea un usuario de IAM y adjúntale la política de IAM que creaste anteriormente.

1. Navega hasta la [consola de IAM][1].
1. Selecciona **Users** (Usuarios) en el menú de la izquierda.
1. Haz clic en **Create user** (Crear usuario).
1. Introduce un nombre de usuario.
1. Haz clic en **Next** (Siguiente).
1. Selecciona **Attach policies directly** (Adjuntar políticas directamente).
1. Elige la política de IAM que creaste anteriormente para adjuntarla al nuevo usuario de IAM.
1. Haz clic en **Next** (Siguiente).
1. Si lo deseas, añade etiquetas (tags).
1. Haz clic en **Create user** (Crear usuario).

Crea credenciales de acceso para el nuevo usuario de IAM. Guarda estas credenciales como `AWS_ACCESS_KEY` y `AWS_SECRET_ACCESS_KEY`.

[1]: https://console.aws.amazon.com/iam/

{{% /tab %}}
{{% tab "Terraform (AWS)" %}}

### Adjuntar la política al perfil de instancia de IAM

Adjunta la política al perfil de instancia de IAM creado con Terraform, que encontrarás en la salida `iam-role-name`.

{{% /tab %}}
{{< /tabs >}}

### Conectar el bucket de S3 a Archivos de log de Datadog

1. Ve a [Reenvío de logs][4] de Datadog.
1. Haz clic en **Add a new archive** (Añadir un nuevo archivo).
1. Introduce un nombre de archivo descriptivo.
1. Añade una consulta que filtre todos los logs que pasen por los pipelines de log para que ninguno de esos logs entre en este archivo. Por ejemplo, añade la consulta `observability_pipelines_read_only_archive`, suponiendo que ningún log que pase por el pipeline tenga esa etiqueta añadida.
1. Selecciona **AWS S3**.
1. Selecciona la cuenta de AWS en la que se encuentra tu bucket.
1. Introduce el nombre del bucket de S3.
1. Opcionalmente, introduce una ruta.
1. Comprueba la declaración de confirmación.
1. También puedes añadir etiquetas y definir el tamaño máximo de análisis para la rehidratación. Para obtener más información, consulta [Configuración avanzada][5].
1. Haz clic en **Guardar**.

Para obtener más información, consulta la [documentación de los archivos de logs][6].

## Configurar el destino `datadog_archives`

Puedes configurar el destino `datadog_archives` utilizando el [archivo de configuración(#configuration-file) o la [interfaz de usuario del compilador de pipeline](#configuration-file).

<div class="alert alert-danger">Si el worker está ingiriendo logs que no provienen del Datadog Agent y son enrutados al destino de Archivos de Datadog, esos logs no son etiquetados con <a href="https://docs.datadoghq.com/logs/log_configuration/attributes_naming_convention/#reserved-attributes">atributos reservados</a>. Esto significa que se pierde la telemetría de Datadog y las ventajas del <a href="https://docs.datadoghq.com/getting_started/tagging/unified_service_tagging/?tab=kubernetes">etiquetado de servicios unificado</a>. Por ejemplo, digamos que tus syslogs se envíen a <code>datadog_archives</code> y esos logs tienen el estado etiquetado como <code>severity</code> en lugar del atributo reservado de <code>status</code> y el host etiquetado como <code>hostname</code> en lugar del atributo reservado <code>host</code>. Cuando estos logs se rehidratan en Datadog, el <code>estado</code> de los logs se establece en <code>info</code> y ninguno de los logs tendrá una etiqueta hostname.</div>

### Archivo de configuración

Para despliegues manuales, el [archivo de configuración de pipelines de ejemplo][7] para Datadog incluye un sink para enviar logs a Amazon S3 bajo un formato de Datadog rehidratable.

{{< tabs >}}
{{% tab "Docker" %}}

En el archivo de configuración de pipelines de ejemplo, sustituye `AWS_ACCESS_KEY_ID` y `AWS_SECRET_ACCESS_KEY` por las credenciales de AWS que creaste anteriormente.

{{% /tab %}}
{{% tab "AWS EKS" %}}

En el archivo de configuración de pipelines de ejemplo, sustituye `AWS_ACCESS_KEY_ID` y `AWS_SECRET_ACCESS_KEY` por las credenciales de AWS que creaste anteriormente.

{{% /tab %}}
{{% tab "Linux basado en APT" %}}

En el archivo de configuración de pipelines de ejemplo, sustituye `AWS_ACCESS_KEY_ID` y `AWS_SECRET_ACCESS_KEY` por las credenciales de AWS que creaste anteriormente.

{{% /tab %}}
{{% tab "Linux basado en RPM" %}}

En el archivo de configuración de pipelines de ejemplo, sustituye `AWS_ACCESS_KEY_ID` y `AWS_SECRET_ACCESS_KEY` por las credenciales de AWS que creaste anteriormente.

{{% /tab %}}
{{% tab "Terraform (AWS)" %}}

Sustituye los parámetros `${DD_ARCHIVES_BUCKET}` y $`{DD_ARCHIVES_REGION}` en función de tu configuración de S3.

{{% /tab %}}
{{< /tabs >}}

### Interfaz de usuario del compilador de pipeline

1. Navega hasta tu [Pipeline][8].
1. (Opcional) Añade una transformación de reasignación para etiquetar todos los logs que van a `datadog_archives`. 
  a. Haz clic en **Edit** (Editar) y luego en **Add more** (Añadir más) en la ventana **Add Transforms** (Añadir transformaciones).
  b. Haz clic en el cuadro **Remap** (Reasignar).
  c. Introduce un nombre descriptivo para el componente.  
  d. En el campo **Inputs** (Entradas), selecciona la fuente a la que conectar este destino.  
  e. Añade `.sender = "observability_pipelines_worker"` en la sección **Source** (Fuente).
  f. Haz clic en **Save** (Guardar).
  g. Navega de nuevo a tu pipeline. 
1. Haz clic en **Edit** (Editar).
1. Haz clic en **Add More** (Añadir más) en el cuadro **Add Destination** (Añadir destino).
1. Haz clic en el cuadro **Datadog Archives** (Archivos de Datadog).
1. Introduce un nombre descriptivo para el componente.
1. Selecciona las fuentes o transformaciones a las que conectar este destino.

{{< tabs >}}
{{% tab "AWS S3" %}}

7. En el campo **Bucket**, introduce el nombre del bucket de S3 que creaste anteriormente.
8. Introduce `aws_s3` en el campo **Service** (Servicio).
9. Activa **AWS S3** para activar esas opciones específicas de configuración.
10. En el campo **Storage Class** (Clase de almacenamiento), selecciona la clase de almacenamiento en el menú desplegable.
11. Configura las demás opciones de configuración en función de tu caso de uso.
12. Haz clic en **Guardar**.

{{% /tab %}}
{{% tab "Azure Blob" %}}

7. En el campo **Bucket**, introduce el nombre del bucket de S3 que creaste anteriormente.
8. Introduce `azure_blob` en el campo **Service** (Servicio).
9. Activa **Azure Blob** para activar esas opciones específicas de configuración.
10. Introduce la cadena de conexión de la cuenta de almacenamiento de Azure Blob.
11. Configura las demás opciones de configuración en función de tu caso de uso.
12. Haz clic en **Guardar**.

{{% /tab %}}
{{% tab "GCP Cloud Storage" %}}

7. En el campo **Bucket**, introduce el nombre del bucket de S3 que creaste anteriormente.
8. Introduce `gcp_cloud_storage` en el campo **Service** (Servicio).
9. Activa **GCP Cloud Storage** para activar esas opciones específicas de configuración.
10. Configura las opciones de configuración en función de tu caso de uso.
11. Haz clic en **Guardar**.

{{% /tab %}}
{{< /tabs >}}

Si estás utilizando la configuración remota, despliega el cambio en tu pipeline en la interfaz de usuario. Si utilizas la configuración manual, descarga la configuración actualizada y reinicia el worker.

Consulta la [referencia de Archivos de Datadog][9] para obtener información detallada sobre todas las opciones de configuración.

## Rehidratar tu archivo

Consulta [Rehidratación de archivos][10] para obtener instrucciones sobre cómo rehidratar tu archivo en Datadog para poder empezar a analizar e investigar esos logs.

## Lectura adicional

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/logs/log_configuration/archives/
[2]: https://s3.console.aws.amazon.com/s3/home
[3]: https://console.aws.amazon.com/iam/
[4]: https://app.datadoghq.com/logs/pipelines/log-forwarding
[5]: /es/logs/log_configuration/archives/#advanced-settings
[6]: /es/logs/log_configuration/archives
[7]: /es/observability_pipelines/legacy/setup/datadog_with_archiving#install-the-observability-pipelines-worker
[8]: https://app.datadoghq.com/observability-pipelines/
[9]: /es/observability_pipelines/legacy/reference/sinks/#datadogarchivessink
[10]: /es/logs/log_configuration/rehydrating/