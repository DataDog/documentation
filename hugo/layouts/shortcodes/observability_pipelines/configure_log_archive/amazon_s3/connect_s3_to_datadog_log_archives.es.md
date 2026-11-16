### Conecte el bucket de S3 a Datadog Log Archives {#connect-the-s3-bucket-to-datadog-log-archives}

1. Vaya a [Log Forwarding][201] de Datadog.
1. Haga clic en **New archive**.
1. Ingrese un nombre descriptivo para el archivo.
1. En la sección **Define Which Data To Forward**, agregue una consulta que filtre todos los registros que pasan por las canalizaciones de Log Management para que Log Archive no envíe ningún registro a este bucket. De lo contrario, tanto Log Archive como el Worker envían registros al bucket, lo que resulta en registros archivados duplicados.
    - Por ejemplo, si agrega la consulta `observability_pipelines_read_only_archive` y los registros que pasan por sus canalizaciones de Log Management no tienen esa etiqueta, el Worker envía registros al bucket, mientras que Log Archive solo lee y rehidrata desde el bucket.
    - Después de ingresar la consulta, como `observability_pipelines_read_only_archive`, la vista previa de registros en la parte superior de la página no debería mostrar resultados coincidentes.
1. Seleccione **AWS S3**.
1. Seleccione la cuenta de AWS en la que se encuentra su bucket.
1. Ingrese el nombre del bucket de S3.
1. Opcionalmente, ingrese una ruta.
1. Verifique la declaración de confirmación.
1. Opcionalmente, agregue etiquetas y defina el tamaño máximo de escaneo para la rehidratación. Consulte [Advanced settings][202] para obtener más información.
1. Haga clic en **Guardar**.

Consulte la [documentación de Log Archives][203] para obtener información adicional.

[201]: https://app.datadoghq.com/logs/pipelines/log-forwarding
[202]: /es/logs/log_configuration/archives/?tab=awss3#advanced-settings
[203]: /es/logs/log_configuration/archives
