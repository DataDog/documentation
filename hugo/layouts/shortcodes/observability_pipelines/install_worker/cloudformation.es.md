1. Selecciona una de las opciones del menú desplegable para proporcionar el volumen previsto de logs para el pipeline:
| Opción | Descripción |
| ---------- | ----------- |
| Utiliza esta opción si no puedes proyectar el volumen de logs o si deseas testear el worker. Esta opción aprovisiona el grupo EC2 Auto Scaling con un máximo de 2 instancias `t4g.large` de propósito general. |
| 1 a 5 TB/día | Esta opción aprovisiona el grupo EC2 Auto Scaling con un máximo de 2 instancias optimizadas para computación `c6g.large`. |
| 5 a 10 TB/día | Esta opción aprovisiona el grupo EC2 Auto Scaling con un mínimo de 2 y un máximo de 5 instancias `c6g.large` optimizadas para computación. |
| >10 TB/día | Datadog recomienda esta opción para grandes despliegues de producción. Aprovisiona el grupo EC2 Auto Scaling con un mínimo de 2 y un máximo de 10 instancias `c6g.xlarge` optimizadas para computación. |

    **Nota**: Todos los demás parámetros están configurados con valores predeterminados razonables para un despliegue del worker, pero puedes ajustarlos a tu caso de uso según sea necesario en la consola de AWS antes de crear el stack tecnológico.
1. Selecciona la región de AWS que deseas utilizar para instalar el worker.
1. Haz clic en **Select API key** (Seleccionar clave de API) para elegir la clave de API de Datadog que deseas utilizar.
1. Haz clic en **Launch CloudFormation Template** (Iniciar plantilla de CloudFormation) para ir a la consola de AWS, revisar la configuración del stack tecnológico y luego iniciarlo. Asegúrate de que los parámetros de CloudFormation son los esperados.
1. Selecciona la VPC y la subred que deseas utilizar para instalar el worker.
1. Revisa y comprueba las casillas de los permisos necesarios para IAM. Haz clic en **Submit** (Enviar) para crear el stack tecnológico. En este punto, CloudFormation se encarga de la instalación: se inician las instancias del worker, se descarga el software necesario y el worker se inicia automáticamente.
1. Vuelve a la página de instalación de Observability Pipelines y haz clic en **Deploy** (Desplegar).

Si quieres realizar cambios en la configuración de tu pipeline, consulta [Actualizar pipelines existentes][7001].

[7001]: /es/observability_pipelines/update_existing_pipelines