1. Introduce el nombre de tu bucket de S3. Si configuraste archivos de logs, es el nombre del bucket que creaste anteriormente.
1. Introduce la región de AWS en la que se encuentra el bucket de S3.
1. Introduce el prefijo de la clave.
    - Los prefijos son útiles para la partición de objetos. Por ejemplo, puedes utilizar un prefijo como clave de objeto para almacenar objetos en un directorio concreto. Si se utiliza un prefijo con este fin, debe terminar en `/` para que actúe como una ruta de acceso de directorio; no se añade automáticamente un `/` al final.
    - Consulta [sintaxis de plantillas][10051] si deseas dirigir logs a diferentes claves de objeto en función de campos específicos de tus logs.
     - **Nota**: Datadog recomienda empezar los prefijos con el nombre del directorio y sin barra oblicua (`/`). Por ejemplo, `app-logs/` o `service-logs/`.
1. Selecciona la clase de almacenamiento para tu bucket S3 en el menú desplegable **Storage Class** (Clase de almacenamiento). Si vas a archivar y rehidratar tus logs:
    - **Nota**: La rehidratación sólo admite las siguientes [clases de almacenamiento][10052]:
        - Estándar
        - Intelligent-Tiering, solo si [los niveles opcionales de acceso asíncrono al archivo][10053] están ambos desactivados.
        - Estándar-IA
        - Una Zona-IA
    - Si deseas recuperar a partir de archivos de otra clase de almacenamiento, primero debes moverlos a una de las clases de almacenamiento admitidas mencionadas anteriormente.
    - Consulta la sección [Ejemplo de configuración del archivo de destino y de logs](#example-destination-and-log-archive-setup) de esta page (página) para saber cómo configurar tu archivo de logs en función de tu configuración de destino de Amazon S3.
1. Opcionalmente, selecciona una opción de autenticación de AWS. Si solo utilizas el [usuario o rol que creaste anteriormente][10054] para la autenticación, no selecciones **Asume role** (Asumir rol). La opción **Asumir rol** solo debe utilizarse si el usuario o rol que creaste anteriormente necesita asumir un rol diferente para acceder al recurso específico de AWS y ese permiso debe definirse explícitamente.<br>Si seleccionas **Asumir rol**:
    1. Introduce el ARN del rol de IAM que desees asumir.
    1. Opcionalmente, introduce el nombre de la sesión del rol asumido y el ID externo.
    - **Nota:** El [usuario o rol que creaste anteriormente][10054] debes tener permiso para asumir este rol para que el Worker pueda autenticarse con AWS.
1. Opcionalmente, activa el interruptor para activar **Bufferin Options** (Opciones de almacenamiento en búfer).<br>**Nota**: Las opciones de almacenamiento en búfer están en vista previa. Ponte en contacto con tu gestor de cuenta para solicitar acceso.
    - Si se deja desactivado, el tamaño máximo del búfer es de 500 eventos.
    - Si está activado:
        1. Selecciona el tipo de búfer que desees configurar (**Memory** (Memoria) o **Disk**(Disco)).
        1. Introduce el tamaño del búfer y selecciona la unidad.

#### Ejemplo de configuración de destino y del archivo logs 

Si introduces los siguientes valores para tu destino Amazon S3:
- Nombre del bucket S3: `test-op-bucket`
- Prefijo que se aplicará a todas las claves de objeto: `op-logs`
- Clase de almacenamiento para los objetos creados: `Standard`

<figure class="text-center">
<img src="{{ .Site.Params.img_url}}images/observability_pipelines/setup/amazon_s3_destination.png" alt="The Amazon S3 destination setup with the example values" width="40%">
</figure>

A continuación, estos son los valores que se introducen para configurar el bucket de S3 para archivos de logs:

- Bucket S3: `test-op-bucket`
- Ruta de acceso: `op-logs`
- Clase de almacenamiento: `Standard`

<figure class="text-center">
<img src="{{ .Site.Params.img_url}}images/observability_pipelines/setup/amazon_s3_archive.png" alt="The log archive configuration with the example values" width="70%">
</figure>

[10051]: /es/observability_pipelines/destinations/#template-syntax
[10052]: /es/logs/log_configuration/archives/?tab=awss3#storage-class
[10053]: https://aws.amazon.com/s3/storage-classes/intelligent-tiering/
[10054]: /es/observability_pipelines/destinations/amazon_s3/?tab=docker#set-up-an-iam-policy-that-allows-workers-to-write-to-the-s3-bucket