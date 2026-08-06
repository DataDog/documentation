#### Crear un bucket de almacenamiento

1. Navega hasta [Google Cloud Storage][9091].
1. En la página Buckets, haz clic en **Create** (Crear) para crear un bucket para tus archivos...
1. Introduce un nombre para el bucket y elige dónde almacenar los datos.
1. Selecciona **Fine-grained** (Detallado) en la sección **Choose how to control access to objects** (Elegir cómo controlar el acceso a objetos).
1. No añadas una política de retención porque los datos más recientes necesitan ser reescritos en algunos casos poco frecuentes (típicamente un caso de tiempo de espera).
1. Haz clic en **Create** (Crear).

### Crea una cuenta de servicio para permitir a los workers escribir en el bucket.

1. Crea una [cuenta de servicio][9092] de Google Cloud Storage.
    - Concede a la cuenta de servicio permisos para tu bucket con los permisos `Storage Admin` y `Storage Object Admin`.
    - Descarga el archivo JSON de claves de la cuenta de servicio. Este es el archivo JSON de credenciales y debe colocarse en `DD_OP_DATA_DIR/config`. Puedes hacer referencia a este archivo cuando configures el [destino de Google Cloud Storage] (#set-up-the-destinations) en la interfaz de usuario del pipeline más adelante.
1. Sigue estas [instrucciones][9093] para crear una clave de cuenta servicio. Elige `json` para el tipo de clave.

#### Conectar el bucket de almacenamiento a archivos de log de Datadog

1. Navega a [Reenvío de logs][9094] de Datadog.
1. Haz clic en **New archive** (Nuevo archivo).
1. Introduce un nombre de archivo descriptivo.
1. Añade una consulta que filtre todos los logs que pasen por los pipelines de log para que ninguno de esos logs entre en este archivo. Por ejemplo, añade la consulta `observability_pipelines_read_only_archive`, suponiendo que ningún log que pase por el pipeline tenga esa etiqueta añadida.
1. Selecciona **Google Cloud Storage**.
1. Selecciona la cuenta de servicio en la que se encuentra tu bucket de almacenamiento.
1. Selecciona el proyecto.
1. Introduce el nombre del bucket de almacenamiento que creaste anteriormente.
1. También puedes introducir una ruta.
1. Opcionalmente, establece permisos, añade etiquetas y define el tamaño máximo de escaneo para la rehidratación. Consulta [Configuración avanzada][9095] para obtener más información.
1. Haz clic en **Save** (Guardar).

Para más información, consulta la [documentación de Archivos de logs][9096].

[9091]: https://console.cloud.google.com/storage
[9092]: https://console.cloud.google.com/iam-admin/serviceaccounts
[9093]: https://cloud.google.com/iam/docs/keys-create-delete#creating
[9094]: https://app.datadoghq.com/logs/pipelines/log-forwarding
[9095]: /es/logs/log_configuration/archives/?tab=awss3#advanced-settings
[9096]: /es/logs/log_configuration/archives
[9097]: /es/observability_pipelines/advanced_configurations/#referencing-files-in-kubernetes