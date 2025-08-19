---
aliases:
- /es/developers/amazon_cloudformation/
dependencies:
- https://github.com/DataDog/datadog-cloudformation-resources/blob/master/README.md
title: Datadog y Amazon CloudFormation
---
[AWS CloudFormation][1] te proporciona plantillas para describir, configurar y aprovisionar todos los recursos de AWS en tu entorno a la vez. Los recursos de Datadog y AWS CloudFormation te permiten interactuar con los recursos de Datadog compatibles, enviar recursos a cualquier centro de datos de Datadog y registrar de forma privada una extensión en cualquier región con recursos de Datadog.

Para acceder a estos recursos, utiliza la consola de administración de AWS (interfaz de usuario) o la interfaz de línea de comandos (CLI) de AWS.

## Consola de administración de AWS

Para empezar:

1. Inicia sesión en la [Consola de administración de AWS][16] con tu cuenta y navega hasta CloudFormation.

2. Selecciona "Public extensions" (Extensiones públicas) en el panel izquierdo y filtra Publisher (Publicador) por "Third Party" (Terceros).

3. Utiliza la barra de búsqueda para filtrar por el prefijo "Datadog".

  Nota: Todos los recursos oficiales de Datadog comienzan por `Datadog::` y especifican que son `Published by Datadog`.

4. Selecciona el nombre del recurso deseado para ver más información sobre su esquema y haz clic en **Activate** (Activar).

5. En la página **Extension details** (Detalles de la extensión), especifica lo siguiente:
  - Nombre de la extensión
  - ARN del rol de ejecución
  - Actualizaciones automáticas para versiones secundarias
  - Configuración

6. Para la configuración del recurso, **se recomienda encarecidamente utilizar [AWS Secrets Manager][17] o un servicio similar para almacenar tus claves de API y de aplicación de Datadog en lugar de texto sin cifrar**.

  Si utilizas AWS Secrets Manager, puedes hacer referencia dinámicamente a tus claves de API y de aplicación en la configuración. Para obtener más información, consulta la [ documentación de AWS][18].

  Por ejemplo:

  ```json
  {
    "DatadogCredentials": {
        "ApiKey": "{{resolve:secretsmanager:MySecret:SecretString:SecretAPIKey}}",
        "ApplicationKey": "{{resolve:secretsmanager:MySecret:SecretString:SecretAppKey}}"
    }
  }
  ```
   Especifica la `ApiURL`, si utilizas una cuenta en una región distinta de US1. Por ejemplo, utiliza `https://api.datadoghq.eu` para una cuenta en la región UE, o `https://api.us5.datadoghq.com/`, para una cuenta en la región US5.

7. Una vez configurado el recurso, [crea tu stack tecnológico AWS][3] que incluya cualquiera de los recursos de Datadog activados.

Para más información sobre los comandos y flujos de trabajo disponibles, consulta la [documentación de AWS][4] oficial.

## Interfaz de línea de comandos de AWS

Para empezar:

1. Crea un rol de ejecución para el recurso de CloudFormation basado en el archivo `<RESOURCE_DIR>/resource-role.yaml`

1. En tu terminal, utiliza la [herramienta aws-cli][2] para registrar un recurso de Datadog:

    ```shell
    aws cloudformation register-type \
        --region "<REGION>" \
        --type RESOURCE \
        --type-name "<DATADOG_RESOURCE_NAME>" \
        --schema-handler-package "<LINK_TO_S3>" \
        --execution-role-arn "<ROLE_ARN_FROM_STEP_1>"
    ```

1. Consulta la versión del recurso recién registrado ejecutando lo siguiente en tu terminal:

    ```shell
    aws cloudformation list-type-versions \
    --region "<REGION>" \
    --type RESOURCE \
    --type-name "<DATADOG_RESOURCE_NAME>"
    ```

1. Establece esta versión recién registrada como `default` ejecutando lo siguiente en tu terminal:

    ```shell
    aws cloudformation set-type-default-version \
        --region "<REGION>" \
        --type RESOURCE \
        --version-id <VERSION_ID> \
        --type-name "<DATADOG_RESOURCE_NAME>"
    ```

    Con los siguientes parámetros obligatorios:
    * `<REGION>`: tu región de AWS.
    * `<DATADOG_RESOURCE_NAME>`: el nombre del recurso a registrar, consulta la [tabla siguiente](#resources-available) para ver los recursos compatibles en Datadog.
    * `<LINK_TO_S3>`: enlace de S3 al recurso.
      * Enlace de S3: `s3://datadog-cloudformation-resources/<RESOURCE_FOLDER>/<RESOURCE_FOLDER>-<RESOURCE_VERSION>.zip`
      * Consulta la sección [Recursos disponibles](#resources-available), que enlaza con ejemplos de los últimos enlaces de S3 compatibles.
    * `VERSION_ID`: la versión subyacente del recurso devuelta por el comando en el paso `2`.

1. Configura el recurso recién registrado ejecutando lo siguiente en tu terminal:

    ```shell
    aws cloudformation set-type-configuration \
        --type-name "<DATADOG_RESOURCE_NAME>" \
        --type RESOURCE \
        --configuration '{"DatadogCredentials": {"ApiKey": "{{resolve:secretsmanager:MySecret:SecretString:SecretAPIKey}}", "ApplicationKey": "{{resolve:secretsmanager:MySecret:SecretString:SecretAppKey}}"}}'
    ```

1. En tu cuenta de AWS, [crea tu stack de AWS][3] que incluya cualquiera de los recursos registrados de Datadog.

Para más información sobre los comandos y flujos de trabajo disponibles, consulta la [documentación de AWS][4] oficial.

## Recursos disponibles

Los siguientes recursos de Datadog pueden registrarse en tu cuenta de AWS. Consulta su documentación específica para ver cómo configurarlos:

| Recurso                | Nombre                                  | Descripción                                             | Carpeta                              | Enlaces del paquete de S3              |
|---------------------------|---------------------------------------|---------------------------------------------------------|-------------------------------------|-------------------------------|
| Dashboard                 | `Datadog::Dashboards::Dashboard`      | [Crear, actualizar y eliminar dashboards de Datadog][5]      | `datadog-dashboards-dashboard`      | [Versiones del gestor de esquemas][6]  |
| Integración de Datadog y AWS   | `Datadog::Integrations::AWS`          | [Gestiona tu integración de Datadog y Amazon Web Service][7] | `datadog-integrations-aws`          | [Versiones del gestor de esquemas][8]  |
| Monitor                   | `Datadog::Monitors::Monitor`          | [Crear, actualizar y eliminar monitores de Datadog][9]        | `datadog-monitors-monitor`          | [Versiones del gestor de esquemas][10] |
| Caída del sistema (**Obsoleto**) | `Datadog::Monitors::Downtime`         | [Activar o desactivar los tiempos de inactividad de los monitores][11]     | `datadog-monitors-downtime`         | [Versiones del gestor de esquemas][12] |
| Horario de la caída del sistema         | `Datadog::Monitors::DowntimeSchedule` | [Programar tiempos de inactividad de Datadog][21]                        | `datadog-monitors-downtimeschedule` | [Versiones del gestor de esquemas][22] |
| Usuario                      | `Datadog::IAM::User`                  | [Crear y gestionar usuarios de Datadog][13]                   | `datadog-iam-user`                  | [Versiones del gestor de esquemas][14] |
| SLO                       | `Datadog::SLOs::SLO`                  | [Crear y gestionar SLOs de Datadog][19]                    | `datadog-slos-slo`                  | [Versiones del gestor de esquemas][20] |

## Regiones admitidas

Los recursos de Datadog y Amazon CloudFormation están disponibles en el Registro Público de CloudFormation en las siguientes regiones:

| Código            | Nombre                      |
|-----------------|---------------------------|
| us-east-1       | Este de EE.UU. (Norte de Virginia)     |
| us-east-2       | Este de EE.UU. (Ohio)            |
| us-west-1       | Oeste de EE.UU. (Norte de California)   |
| us-west-2       | Oeste de EE.UU. (Oregón)          |
| ap-south-1      | Asia-Pacífico (Bombay)     |
| ap-northeast-1  | Asia-Pacífico (Tokio)      |
| ap-northeast-2  | Asia-Pacífico (Seúl)      |
| ap-southeast-1  | Asia-Pacífico (Singapur)  |
| ap-southeast-2  | Asia-Pacífico (Sídney)     |
| ca-central-1    | Canadá (Central)          |
| eu-central-1    | Europa (Fráncfort)        |
| eu-west-1       | Europa (Irlanda)          |
| eu-west-2       | Europa (Londres)           |
| eu-west-3       | Europa (París)            |
| eu-north-1      | Europa (Estocolmo)        |
| sa-east-1       | América del Sur (São Paulo) |

**Nota**: Para registrar de forma privada un recurso en cualquier otra región, utiliza los paquetes proporcionados.

## Solucionar problemas

¿Necesitas ayuda? Contacta con el [equipo de asistencia de Datadog][15].

[1]: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/GettingStarted.html
[2]: https://aws.amazon.com/cli/
[3]: https://console.aws.amazon.com/cloudformation/home
[4]: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/registry.html
[5]: https://github.com/DataDog/datadog-cloudformation-resources/tree/master/datadog-dashboards-dashboard-handler
[6]: https://github.com/DataDog/datadog-cloudformation-resources/blob/master/datadog-dashboards-dashboard-handler/CHANGELOG.md
[7]: https://github.com/DataDog/datadog-cloudformation-resources/tree/master/datadog-integrations-aws-handler
[8]: https://github.com/DataDog/datadog-cloudformation-resources/blob/master/datadog-integrations-aws-handler/CHANGELOG.md
[9]: https://github.com/DataDog/datadog-cloudformation-resources/tree/master/datadog-monitors-monitor-handler
[10]: https://github.com/DataDog/datadog-cloudformation-resources/blob/master/datadog-monitors-monitor-handler/CHANGELOG.md
[11]: https://github.com/DataDog/datadog-cloudformation-resources/tree/master/datadog-monitors-downtime-handler
[12]: https://github.com/DataDog/datadog-cloudformation-resources/blob/master/datadog-monitors-downtime-handler/CHANGELOG.md
[13]: https://github.com/DataDog/datadog-cloudformation-resources/tree/master/datadog-iam-user-handler
[14]: https://github.com/DataDog/datadog-cloudformation-resources/blob/master/datadog-iam-user-handler/CHANGELOG.md
[15]: https://docs.datadoghq.com/es/help/
[16]: https://aws.amazon.com/console/
[17]: https://aws.amazon.com/secrets-manager/
[18]: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/dynamic-references.html#dynamic-references-secretsmanager
[19]: https://github.com/DataDog/datadog-cloudformation-resources/tree/master/datadog-slos-slo-handler
[20]: https://github.com/DataDog/datadog-cloudformation-resources/blob/master/datadog-slos-slo-handler/CHANGELOG.md
[21]: https://github.com/DataDog/datadog-cloudformation-resources/tree/master/datadog-monitors-downtimeschedule-handler
[22]: https://github.com/DataDog/datadog-cloudformation-resources/blob/master/datadog-monitors-downtimeschedule-handler/CHANGELOG.md