---
aliases:
- /es/data_jobs/emr
description: 'Configure Data Observability: Jobs Monitoring para aplicaciones de Apache
  Spark en clústeres de Amazon EMR mediante AWS Secrets Manager y acciones de arranque.'
further_reading:
- link: /data_jobs
  tag: Documentación
  text: 'Data Observability: Jobs Monitoring'
- link: /monitors/types/data_observability/
  tag: Documentación
  text: Seguimiento de Data Observability
title: 'Habilite Data Observability: Jobs Monitoring para Spark en Amazon EMR'
---
[Data Observability: Jobs Monitoring][9] brinda visibilidad sobre el rendimiento y la confiabilidad de las aplicaciones de Apache Spark en Amazon EMR.

Si está utilizando [EMR on EKS][13], siga estas [instrucciones para configurar Jobs Monitoring en Kubernetes][14].

## Requisitos {#requirements}

Se requiere [Amazon EMR Release 6.0.1][10] o posterior.

## Configuración {#setup}

Siga estos pasos para habilitar Data Observability: Jobs Monitoring para Amazon EMR.

1. [Almacene su clave de API de Datadog](#store-your-datadog-api-key-in-aws-secrets-manager-recommended) en AWS Secrets Manager (recomendado).
1. [Otorgue permisos al perfil de instancia de EMR EC2](#grant-permissions-to-emr-ec2-instance-profile).
1. [Cree y configure su clúster de EMR](#create-and-configure-your-emr-cluster).
1. [Especifique el etiquetado de servicio por aplicación Spark](#specify-service-tagging-per-spark-application).

### Almacene su clave de API de Datadog en AWS Secrets Manager (recomendado) {#store-your-datadog-api-key-in-aws-secrets-manager-recommended}
1. Tome nota de su [clave de API de Datadog][1].
1. En [AWS Secrets Manager][2], elija {{< ui >}}Store a new secret{{< /ui >}}.
   - En {{< ui >}}Secret type{{< /ui >}}, seleccione {{< ui >}}Other type of secret{{< /ui >}}.
   - En {{< ui >}}Key/value pairs{{< /ui >}}, agregue su clave de API de Datadog como un par clave-valor, donde la clave es `dd_api_key`.
      {{< img src="data_jobs/emr/key_value.png" alt="AWS Secrets Manager, Store a new secret. Una sección titulada \"Key/value pairs\". A la izquierda, un cuadro de texto que contiene \"dd_api_key\". A la derecha, un cuadro de texto que contiene una clave de API oculta." style="width:80%;" >}}
   - Luego, haga clic en **Next**.
1. En la página {{< ui >}}Configure secret{{< /ui >}}, ingrese un {{< ui >}}Secret name{{< /ui >}}. Puede usar `datadog/dd_api_key`. Luego, haga clic en {{< ui >}}Next{{< /ui >}}.
1. En la página {{< ui >}}Configure rotation{{< /ui >}}, puede activar la [rotación automática][3] si lo desea. Luego, haga clic en {{< ui >}}Next{{< /ui >}}.
1. En la página {{< ui >}}Review{{< /ui >}}, revise los detalles de su secreto. Luego, haga clic en {{< ui >}}Store{{< /ui >}}.
1. En AWS Secrets Manager, abra el secreto que creó. Tome nota del {{< ui >}}Secret ARN{{< /ui >}}.

### Otorgue permisos al perfil de instancia de EMR EC2 {#grant-permissions-to-emr-ec2-instance-profile}
El perfil de instancia de EMR EC2 es un rol de IAM asignado a cada instancia de EC2 en un clúster de Amazon EMR cuando se inicia la instancia. Siga [la guía de Amazon][11] para preparar este rol según la necesidad de su aplicación de interactuar con otros servicios de AWS. Es posible que se requieran los siguientes permisos adicionales para Data Observability: Jobs Monitoring.

#### Permisos para obtener el valor del secreto mediante AWS Secrets Manager {#permissions-to-get-secret-value-using-aws-secrets-manager}

<div class="alert alert-danger">
Estos permisos son <strong>obligatorios</strong> si utiliza AWS Secrets Manager.
</div>

1. En su [consola de AWS IAM][5], haga clic en {{< ui >}}Access management{{< /ui >}} > {{< ui >}}Roles{{< /ui >}} en la barra de navegación izquierda.
1. Haga clic en el rol de IAM que planea usar como perfil de instancia para su clúster de EMR.
1. En la página siguiente, en la pestaña {{< ui >}}Permissions{{< /ui >}}, busque la sección {{< ui >}}Permissions policies{{< /ui >}}. Haga clic en {{< ui >}}Add permissions{{< /ui >}} > {{< ui >}}Create inline policy{{< /ui >}}.
1. En la página {{< ui >}}Specify permissions{{< /ui >}}, busque la sección {{< ui >}}Select a service{{< /ui >}}. En {{< ui >}}Service{{< /ui >}}, seleccione {{< ui >}}Secrets Manager{{< /ui >}}.
   {{< img src="data_jobs/emr/specify_permissions.png" alt="Consola de AWS IAM, página Specify Permissions." style="width:80%;" >}}
   - Luego, en {{< ui >}}Actions allowed{{< /ui >}}, seleccione `GetSecretValue`. Esta es una acción {{< ui >}}Read{{< /ui >}}.
   - En {{< ui >}}Resources{{< /ui >}}, seleccione {{< ui >}}Specific{{< /ui >}}. Luego, junto a {{< ui >}}Secret{{< /ui >}}, haga clic en {{< ui >}}Add ARNs{{< /ui >}} y agregue el ARN del secreto que creó en el primer paso de esta página.
   - Haga clic en **Next**.
1. En la página siguiente, asigne un nombre a su política. Luego, haga clic en {{< ui >}}Create policy{{< /ui >}}.

#### Permisos para describir el clúster {#permissions-to-describe-cluster}

<div class="alert alert-danger">
Estos permisos son <strong>obligatorios</strong> si <strong>NO</strong> está utilizando el rol predeterminado, <code>EMR_EC2_DefaultRole</code>.
</div>

1. En su [consola de AWS IAM][5], haga clic en {{< ui >}}Access management{{< /ui >}} > {{< ui >}}Roles{{< /ui >}} en la barra de navegación izquierda.
1. Haga clic en el rol de IAM que planea usar como perfil de instancia para su clúster de EMR.
1. En la página siguiente, en la pestaña {{< ui >}}Permissions{{< /ui >}}, busque la sección {{< ui >}}Permissions policies{{< /ui >}}. Haga clic en {{< ui >}}Add permissions{{< /ui >}} > {{< ui >}}Create inline policy{{< /ui >}}.
1. En la página {{< ui >}}Specify permissions{{< /ui >}}, active la pestaña {{< ui >}}JSON{{< /ui >}}.
   - Luego, copie y pegue la siguiente política en el {{< ui >}}Policy editor{{< /ui >}}
   ```json
   {
      "Version": "2012-10-17",
      "Statement": [
         {
            "Effect": "Allow",
            "Action": [
               "elasticmapreduce:ListBootstrapActions",
               "elasticmapreduce:ListInstanceFleets",
               "elasticmapreduce:DescribeCluster",
               "elasticmapreduce:ListInstanceGroups"
            ],
            "Resource": [
               "*"
            ]
         }
      ]
   }
   ```
   - Haga clic en **Next**.
1. En la página siguiente, asigne un nombre a su política. Luego, haga clic en {{< ui >}}Create policy{{< /ui >}}.

Tome nota del nombre del rol de IAM que planea usar como perfil de instancia para su clúster de EMR.

### Cree y configure su clúster de EMR {#create-and-configure-your-emr-cluster}

Cuando cree un nuevo clúster de EMR en la [consola de Amazon EMR][4], agregue una acción de arranque en la página {{< ui >}}Create Cluster{{< /ui >}}:

1. Guarde el siguiente script en un bucket de S3 que su clúster de EMR pueda leer. Tome nota de la ruta a este script.

   ```shell
   #!/bin/bash

   # Set required parameter DD_SITE
   export DD_SITE={{< region-param key="dd_site" code="true" >}}

   # Establezca el parámetro obligatorio DD_API_KEY con la clave de API de Datadog.
   # Los comandos a continuación asumen que la clave de API está almacenada en AWS Secrets Manager, con el nombre del secreto como datadog/dd_api_key y la clave como dd_api_key.
   # IMPORTANTE: Modifique si decide administrar y recuperar su secreto de manera diferente.
   SECRET_NAME=datadog/dd_api_key
   export DD_API_KEY=$(aws secretsmanager get-secret-value --secret-id $SECRET_NAME | jq -r .SecretString | jq -r '.["dd_api_key"]')

   # Opcional: quite el comentario para enviar los registros del controlador y del trabajador de Spark a Datadog
   # export DD_EMR_LOGS_ENABLED=true

   # Recopile datos de linaje de Spark con OpenLineage para que pueda ver las tablas anteriores y posteriores
   # de sus trabajos y visualizar canalizaciones completas de Spark. Establezca en false para deshabilitar.
   export DD_OPENLINEAGE_ENABLED=true

   # Descargue y ejecute el script de inicio más reciente
   curl -L https://install.datadoghq.com/scripts/install-emr.sh > djm-install-script; bash djm-install-script || true

   ```

   Optionally, the script can be configured adding the following environment variables:
   The script above sets the required parameters, and downloads and runs the latest init script for Data Observability: Jobs Monitoring in EMR. If you want to pin your script to a specific version, you can replace the filename in the URL with `install-emr-0.13.5.sh` to use version `0.13.5`, for example. The source code used to generate this script, and the changes between script versions can be found on the [Datadog Agent repository][12].

   Optionally, the script can be configured by adding the following environment variables:

| Variable                 | Description                                                                                                                                                      | Default |
|--------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------|---------|
| DD_TAGS                  | Add tags to EMR cluster and Spark performance metrics. Comma or space separated key:value pairs. Follow [Datadog tag conventions][15]. Example: `env:staging,team:data_engineering` |         |
| DD_ENV                   | Set the `env` environment tag on metrics, traces, and logs from this cluster.   |         |
| DD_EMR_LOGS_ENABLED      | Send Spark driver and worker logs to Datadog.                                                                                                                  | false   |
| DD_LOGS_CONFIG_PROCESSING_RULES | Filter the logs collected with processing rules. See [Advanced Log Collection][16] for more details. |         |
| DD_OPENLINEAGE_ENABLED   | Collect Spark lineage data with OpenLineage to see upstream and downstream tables of your jobs and visualize entire Spark pipelines. Set to `true` to enable. | false   |

[15]: /es/getting_started/tagging/
[16]: /es/agent/logs/advanced_log_collection/?tab=environmentvariable#global-processing-rules

1. On the **Create Cluster** page, find the {{< ui >}}Bootstrap actions{{< /ui >}} section. Click {{< ui >}}Add{{< /ui >}} to bring up the {{< ui >}}Add bootstrap action{{< /ui >}} dialog.
   {{< img src="data_jobs/emr/add_bootstrap_action_without_arguments.png" alt="Consola de Amazon EMR, Create Cluster, cuadro de diálogo Add Bootstrap Action. Campos de texto para el nombre, la ubicación del script y los argumentos." style="width:80%;" >}}
   - Para {{< ui >}}Name{{< /ui >}}, asigne un nombre a su acción de arranque. Puede usar `datadog_agent`.
   - Para {{< ui >}}Script location{{< /ui >}}, ingrese la ruta donde almacenó el script de inicialización en S3.
   - Haga clic en {{< ui >}}Add bootstrap action{{< /ui >}}.

1. En la página **Create Cluster**, busque la sección **Identity and Access Management (IAM) roles**. Para el menú desplegable {{< ui >}}instance profile{{< /ui >}}, seleccione el rol de IAM al que ha otorgado permisos en [Otorgue permisos al perfil de instancia de EMR EC2](#grant-permissions-to-emr-ec2-instance-profile).

Cuando se crea su clúster, esta acción de arranque instala el Datadog Agent y descarga el rastreador de Java en cada nodo del clúster.

### Especifique el etiquetado de servicio por aplicación Spark {#specify-service-tagging-per-spark-application}

El etiquetado le permite filtrar, agregar y comparar mejor su telemetría en Datadog. Puede configurar etiquetas pasando las opciones `-Ddd.service`, `-Ddd.env`, `-Ddd.version` y `-Ddd.tags` a las propiedades `extraJavaOptions` de su controlador y ejecutor de Spark.

En Datadog, el nombre de cada trabajo corresponde al valor que estableció para `-Ddd.service`.

```shell
spark-submit \
 --conf spark.driver.extraJavaOptions="-Ddd.service=<JOB_NAME> -Ddd.env=<ENV> -Ddd.version=<VERSION> -Ddd.tags=<KEY_1>:<VALUE_1>,<KEY_2:VALUE_2>" \
 --conf spark.executor.extraJavaOptions="-Ddd.service=<JOB_NAME> -Ddd.env=<ENV> -Ddd.version=<VERSION> -Ddd.tags=<KEY_1>:<VALUE_1>,<KEY_2:VALUE_2>" \
 application.jar
```

## Validación {#validation}

En Datadog, consulte la página [Data Observability: Jobs Monitoring][8] para ver una lista de todos sus trabajos de procesamiento de datos.

## Solución de problemas {#troubleshooting}

{{% djm-install-troubleshooting %}}

## Configuración avanzada{#advanced-configuration}

### Etiquetar tramos en tiempo de ejecución {#tag-spans-at-runtime}

{{% djm-runtime-tagging %}}

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/organization-settings/api-keys
[2]: https://console.aws.amazon.com/secretsmanager/
[3]: https://docs.aws.amazon.com/secretsmanager/latest/userguide/rotating-secrets.html
[4]: https://console.aws.amazon.com/emr
[5]: https://console.aws.amazon.com/iam/
[8]: https://app.datadoghq.com/data-jobs/
[9]: /es/data_jobs
[10]: https://docs.aws.amazon.com/emr/latest/ReleaseGuide/emr-601-release.html
[11]: https://docs.aws.amazon.com/emr/latest/ManagementGuide/emr-iam-role-for-ec2.html
[12]: https://github.com/DataDog/datadog-agent/blob/main/pkg/fleet/installer/setup/djm/emr.go
[13]: https://docs.aws.amazon.com/emr/latest/EMR-on-EKS-DevelopmentGuide/emr-eks.html
[14]: /es/data_jobs/kubernetes/