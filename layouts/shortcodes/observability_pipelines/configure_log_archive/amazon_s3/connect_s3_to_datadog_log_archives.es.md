#### Conectar el bucket de S3 a archivos de logs de Datadog

1. Navega a [Reenvío de logs][201] de Datadog.
1. Haz clic en **New archive** (Nuevo archivo).
1. Introduce un nombre de archivo descriptivo.
1. Añade una consulta que filtre todos los logs que pasen por los pipelines de log para que ninguno de esos logs entre en este archivo. Por ejemplo, añade la consulta `observability_pipelines_read_only_archive`, suponiendo que ningún log que pase por el pipeline tenga esa etiqueta añadida.
1. Selecciona **AWS S3**.
1. Selecciona la cuenta de AWS en la que se encuentra tu bucket.
1. Introduce el nombre del bucket de S3.
1. Opcionalmente, introduce una ruta.
1. Comprueba la declaración de confirmación.
1. Opcionalmente, añade etiquetas y define el tamaño máximo de escaneado para la rehidratación. Consulta [Configuración avanzada][202] para obtener más información.
1. Haz clic en **Save** (Guardar).

Para más información, consulta la [documentación de archivos de log][203].

[201]: https://app.datadoghq.com/logs/pipelines/log-forwarding
[202]: /es/logs/log_configuration/archives/?tab=awss3#advanced-settings
[203]: /es/logs/log_configuration/archives