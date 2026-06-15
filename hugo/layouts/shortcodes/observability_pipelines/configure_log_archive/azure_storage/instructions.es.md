#### Crear una cuenta de almacenamiento

Crea una [cuenta de almacenamiento de Azure][9051] si aún no tienes una.

1. Navega hasta [Storage accounts][9052] (Cuentas de almacenamiento).
1. Haz clic en **Create** (Crear).
1. Selecciona el nombre de la suscripción y el nombre del recurso que deseas utilizar.
1. Introduce un nombre para tu cuenta de almacenamiento.
1. Selecciona una región en el menú desplegable.
1. Selecciona el tipo de cuenta **Standard** o **Premium**.
1. Haz clic en **Next** (Siguiente).
1. En la sección **Blob storage** (Almacenamiento de globos), selecciona el almacenamiento **Hot** (En caliente) o **Cool** (En frío).
1. Haz clic en **Review + create** (Revisar + crear).

#### Crear un bucket de almacenamiento

1. En tu cuenta de almacenamiento, haz clic en **Containers** (Contenedores) dentro de **Data storage** (Almacenamiento de datos) en el menú de navegación de la izquierda.
1. Haz clic en **+ Container** (+ Contenedor) en la parte superior para crear un nuevo contenedor.
1. Introduce un nombre para el nuevo contenedor. Este nombre se utilizará más adelante cuando configures el destino Azure Storage de Observability Pipelines.

**Nota**: No establezcas [políticas de inmutabilidad][9053] porque los datos más recientes podrían necesitar ser reescritos en casos pocos frecuentes (típicamente cuando hay un tiempo de espera).

#### Conecta el contenedor de Azure a los archivos de logs de Datadog

1. Navega a [Reenvío de logs][9054] de Datadog.
1. Haz clic en **New archive** (Nuevo archivo).
1. Introduce un nombre de archivo descriptivo.
1. Añade una consulta que filtre todos los logs que pasen por los pipelines de log para que ninguno de esos logs entre en este archivo. Por ejemplo, añade la consulta `observability_pipelines_read_only_archive`, suponiendo que ningún log que pase por el pipeline tenga esa etiqueta añadida.
1. Selecciona **Azure Storage** (Almacenamiento de Azure).
1. Selecciona el inquilino de Azure y el cliente en el que se encuentra tu cuenta de almacenamiento.
1. Introduce el nombre de la cuenta de almacenamiento.
1. Introduce el nombre del contenedor que has creado anteriormente.
1. Opcionalmente, introduce una ruta.
1. Opcionalmente, establece permisos, añade etiquetas y define el tamaño máximo de escaneo para la rehidratación. Consulta [Configuración avanzada][9055] para obtener más información.
1. Haz clic en **Save** (Guardar).

Para más información, consulta la [documentación de Archivos de logs][9056].

[9051]: https://learn.microsoft.com/en-us/azure/storage/common/storage-account-create?tabs=azure-portal
[9052]: https://portal.azure.com/#browse/Microsoft.Storage%2FStorageAccounts
[9053]: https://docs.microsoft.com/en-us/azure/storage/blobs/storage-blob-immutability-policies-manage
[9054]: https://app.datadoghq.com/logs/pipelines/log-forwarding
[9055]: /es/logs/log_configuration/archives/?tab=awss3#advanced-settings
[9056]: /es/logs/log_configuration/archives