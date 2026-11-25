1. Seleccione una de las opciones en el menú desplegable para proporcionar el volumen esperado de registros o métricas para la canalización:
|   Opción   | Descripción |
| ---------- | ----------- |
| Unsure | Utilice esta opción si no puede proyectar el volumen de datos o si desea probar el Worker. Esta opción configura el grupo de Auto Scaling de EC2 con un máximo de 2 instancias de propósito general `t4g.large`. |
| 1-5 TB/day | Esta opción configura el grupo de Auto Scaling de EC2 con un máximo de 2 instancias optimizadas para cómputo `c6g.large`. |
| 5-10 TB/day | Esta opción configura el grupo de Auto Scaling de EC2 con un mínimo de 2 y un máximo de 5 instancias optimizadas para cómputo `c6g.large`. |
| >10 TB/day | Datadog recomienda esta opción para implementaciones de producción a gran escala. Configura el grupo de Auto Scaling de EC2 con un mínimo de 2 y un máximo de 10 instancias optimizadas para cómputo `c6g.xlarge`. |

    **Nota**: Todos los demás parámetros se establecen en valores predeterminados razonables para una implementación de Worker, pero puede ajustarlos según sea necesario para su caso de uso en AWS Console antes de crear la pila.
1. Seleccione la región de AWS que desea utilizar para instalar el Worker.
1. Haga clic en **Select API key** para elegir la clave de API de Datadog que desea utilizar.
    - **Nota**: La clave de API debe estar [habilitada para Remote Configuration][7002].
1. Haga clic en **Launch CloudFormation Template** para ir a AWS Console, revisar la configuración de la pila y luego iniciarla. Asegúrese de que los parámetros de CloudFormation sean los esperados.
1. Seleccione la VPC y la subred que desea utilizar para instalar el Worker.
1. Revise y marque las casillas de verificación de permisos necesarias para IAM. Haga clic en **Submit** para crear la pila. CloudFormation se encarga de la instalación en este punto; las instancias de Worker se inician, se descarga el software necesario y el Worker se inicia automáticamente.
1. Regrese a la página de instalación de Observability Pipelines y haga clic en **Deploy**.

Consulte [Actualizar Pipelines existentes][7001] si desea realizar cambios en la configuración de su canalización.

[7001]: /es/observability_pipelines/configuration/update_existing_pipelines
[7002]: https://app.datadoghq.com/organization-settings/remote-config/setup