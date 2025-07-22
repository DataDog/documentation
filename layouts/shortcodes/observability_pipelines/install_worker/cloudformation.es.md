1. Selecciona una de las opciones del desplegable para proporcionar el volumen previsto de logs para el pipeline:
| Opción | Descripción |
| ---------- | ----------- |
| Inseguro | Usa esta opción si no puedes proyectar el volumen de logs o si deseas probar el Worker. Esta opción configura el grupo EC2 Auto Scaling con un máximo de 2 instancias de propósito general `t4g.large`. |
| 1 a 5 TB/día | Esta opción provisiona el grupo de Auto Scaling de EC2 con un máximo de 2 instancias optimizadas para cálculos `c6g.large`. | 
| 5 a 10 TB/día | Esta opción provisiona el grupo EC2 Auto Scaling con un mínimo de 2 y un máximo de 5 instancias optimizadas para el cálculo `c6g.large`. |
| >10 TB/día | Datadog recomienda esta opción para implementaciones de producción a gran escala. Provisiona el grupo de Auto Scaling de EC2 con un mínimo de 2 y un máximo de 10 instancias `c6g.xlarge` optimizadas para cómputo. |

   **Nota**: Todos los demás parámetros están configurados con valores predeterminados razonables para un despliegue de Worker, pero puedes ajustarlos según tu caso de uso en la consola de AWS antes de crear el stack.
1. Selecciona la región AWS que quieres usar para instalar el Worker.
1. Haz clic en **Select API key (Seleccionar clave de API)** para elegir la clave de API de Datadog que quieres usar.
1. Haz clic en **Launch CloudFormation Template** para navegar a la consola de AWS, revisar la configuración del stack y luego lanzarlo. Asegúrate de que los parámetros de CloudFormation sean los esperados.
1. Selecciona la VPC y la subred que quieres usar para instalar el Worker.
1. Revisa y check las casillas de permisos necesarios para IAM. Haz clic en **Submit (Enviar)** para crear el stack. CloudFormation se encarga de la instalación en este punto: se lanzan las instancias de Worker, se descarga el software necesario y el Worker se inicia automáticamente.
1. Vuelve a la página de instalación de Observability Pipelines y haz clic en **Deply (Desplegar)**.

Si quieres realizar cambios en la configuración de tu pipeline, consulta [Actualizar pipelines existentes][7001].

[7001]: /observability_pipelines/update_existing_pipelines
