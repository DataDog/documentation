---
further_reading:
- link: /data_jobs
  tag: Documentación
  text: Data Jobs Monitoring
title: Habilitar Data Jobs Monitoring para Spark en Amazon EMR
---

[Data Jobs Monitoring][9] ofrece visibilidad del rendimiento y la fiabilidad de las aplicaciones Apache Spark en Amazon EMR.

## Requisitos

Se requiere [Amazon EMR versión 6.0.1][10] o posterior.

## Configuración

Sigue estos pasos para habilitar Data Jobs Monitoring para Amazon EMR.

1. [Almacena tu clave de API Datadog](#store-your-datadog-api-key-in-aws-secrets-manager-recommended) en AWS Secrets Manager (recomendado).
1. [Concede permisos al perfil de la instancia EC2 EMR](#grant-permissions-to-emr-ec2-instance-profile).
1. [Crea y configura tu clúster EMR](#create-and-configure-your-emr-cluster).
1. [Especifica el etiquetado de servicios por aplicación Spark](#specify-service-tagging-per-spark-application).

### Almacenar tu clave de API Datadog en AWS Secrets Manager (recomendado)
1. Toma nota de tu [clave de API Datadog][1].
1. En [AWS Secrets Manager][2], elige **Almacenar un nuevo secreto**.
   - En **Tipo de secreto**, selecciona **Otro tipo de secreto**.
   - En **Pares clave/valor**, añade tu clave de API Datadog como par clave-valor, donde la clave es `dd_api_key`.
      {{< img src="data_jobs/emr/key_value.png" alt="AWS Secrets Manager, Almacenar un nuevo secreto. Una sección llamada 'Pares clave/valor'. A la izquierda, un cuadro de texto que contiene 'dd_api_key'. A la derecha, un cuadro de texto que contiene una clave de API ofuscada" style="width:80%;" >}}
   - A continuación, haz clic en **Next** (Siguiente).
1. En la página **Configurar secreto**, introduce un **Nombre secreto**. Puedes utilizar `datadog/dd_api_key`. A continuación, haz clic en **Next** (Siguiente).
1. En la página **Configurar rotación**, puedes activar opcionalmente la [rotación automática][3]. A continuación, haz clic en **Next** (Siguiente).
1. En la página **Revisar**, revisa tus datos secretos. A continuación, haz clic en **Store** (Almacenar).
1. En AWS Secrets Manager, abre el secreto que creaste. Toma nota del **ARN secreto**.

### Concede permisos al perfil de la instancia EC2 EMR
El perfil de la instancia EC2 EMR es un rol IAM que se asigna a cada instancia EC2 de un clúster Amazon EMR cuando se lanza la instancia. Sigue [la guía de Amazon][11] para preparar este rol en función de las necesidades de tu aplicación de interactuar con otros servicios AWS. Los siguientes permisos adicionales pueden ser necesarios para Data Jobs Monitoring.

#### Permisos para obtener el valor secreto utilizando AWS Secrets Manager

<div class="alert alert-danger">
Estos permisos son <strong>necesarios</strong> si utilizas AWS Secrets Manager.
</div>

1. En tu [consola de AWS IAM][5], haz clic en **Access management** > **Roles** (Gestión de acceso > Roles) en la barra de navegación izquierda.
1. Haz clic en el rol IAM que quieres utilizar como perfil de la instancia para tu clúster EMR.
1. En la página siguiente, en la pestaña **Permisos**, busca la sección **Políticas de permisos** y haz clic en **Add permissions** > **Create inline policy** (Añadir permisos > Crear política en línea).
1. En la página **Especificar permisos**, busca la sección **Seleccionar un servicio**. En **servicio**, selecciona **Secrets Manager**.
   {{< img src="data_jobs/emr/specify_permissions.png" alt="Consola de AWS IAM, página Especificar permisos." style="width:80%;" >}}
   - A continuación, en **Acciones permitidas**, selecciona `GetSecretValue`. Se trata de una acción de **Lectura**.
   - En **Recursos**, selecciona **Específicos**. A continuación, junto a **Secreto**, haz clic en **Add ARNs** (Añadir ARN) y añade el ARN del secreto que creaste en el primer paso de esta página.
   - Haz clic en **Next** (Siguiente).
1. En la página siguiente, dale un nombre a tu política. A continuación, haz clic en **Create policy** (Crear política).

#### Permisos para describir clústeres

<div class="alert alert-danger">
Estos permisos son <strong>necesarios</strong> si <strong>NO</strong> utilizas el rol por defecto, <code>EMR_EC2_DefaultRole</code>.
</div>

1. En tu [consola de AWS IAM][5], haz clic en **Access management** > **Roles** (Gestión de acceso > Roles) en la barra de navegación izquierda.
1. Haz clic en el rol IAM que quieres utilizar como perfil de la instancia para tu clúster EMR.
1. En la página siguiente, en la pestaña **Permisos**, busca la sección **Políticas de permisos** y haz clic en **Add permissions** > **Create inline policy** (Añadir permisos > Crear política en línea).
1. En la página **Especificar permisos**, activa la pestaña **JSON**.
   - A continuación, copia y pega la siguiente política en el **Editor de políticas**.
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
   - Haz clic en **Next** (Siguiente).
1. En la página siguiente, dale un nombre a tu política. A continuación, haz clic en **Create policy** (Crear política).

Toma nota del nombre del rol IAM que planeas utilizar como perfil de la instancia para tu clúster EMR.

### Crear y configurar tu clúster EMR

Cuando crees un nuevo clúster EMR en la [consola de Amazon EMR][4], añade una acción de arranque en la página **Crear clúster**:

1. Guarda el siguiente script en un bucket S3 que tu clúster EMR pueda leer. Toma nota de la ruta a este script.

   ```shell
   #!/bin/bash

   # Set required parameter DD_SITE
   export DD_SITE={{< region-param key="dd_site" code="true" >}}

   # Set required parameter DD_API_KEY with Datadog API key.
   # The commands below assumes the API key is stored in AWS Secrets Manager, with the secret name as datadog/dd_api_key and the key as dd_api_key.
   # IMPORTANT: Modify if you choose to manage and retrieve your secret differently.
   SECRET_NAME=datadog/dd_api_key
   export DD_API_KEY=$(aws secretsmanager get-secret-value --secret-id $SECRET_NAME | jq -r .SecretString | jq -r '.["dd_api_key"]')

   # Optional: uncomment to send spark driver and worker logs to Datadog
   # export DD_EMR_LOGS_ENABLED=true

   # Download and run the latest init script
   curl -L https://install.datadoghq.com/scripts/install-emr.sh > djm-install-script; bash djm-install-script || true

   ```

   El script anterior define los parámetros necesarios y descarga y ejecuta el script init más reciente para Data Jobs Monitoring en EMR. Si quieres vincular tu script a una versión específica, puedes sustituir el nombre del archivo en la URL por `install-emr-0.10.0.sh` para utilizar la versión `0.10.0`, por ejemplo. El código fuente utilizado para generar este script y los cambios entre versiones de script se pueden encontrar en el [repositorio del Datadog][12].

1. En la página **Crear clúster**, busca la sección **Acciones de arranque**. Haz clic en **Add** (Añadir) para abrir el cuadro de diálogo **Añadir acción de bootstrap**.
   {{< img src="data_jobs/emr/add_bootstrap_action_without_arguments.png" alt="Consola de Amazon EMR, cuadro de diálogo 'Crear clúster - Añadir acción de arranque'. Campos de texto para nombre, localización del script y argumentos." style="width:80%;" >}}
   - En **Nombre**, colócale un nombre a tu acción de arranque. Puedes utilizar `datadog_agent`.
   - En **Localización del script**, introduce la ruta donde almacenaste el script init en S3.
   - Haz clic en **Add bootstrap action** (Añadir acción de arranque).

1. En la página **Crear clúster**, busca la sección **Roles de Identity and Access Management (IAM)**. En el menú desplegable **perfil de instancia**, selecciona el rol IAM al que hayas concedido permisos en [Conceder permisos al perfil de la instancia EC2 EMR](#grant-permissions-to-emr-ec2-instance-profile).

Cuando se crea tu clúster, esta acción de arranque instala el Datadog Agent y descarga el rastreador Java en cada nodo del clúster.

### Especificar el etiquetado de servicios por cada aplicación Spark

El etiquetado te permite filtrar, agregar y comparar mejor tu telemetría en Datadog. Puedes configurar etiquetas (tags) pasando las opciones `-Ddd.service`, `-Ddd.env`, `-Ddd.version` y `-Ddd.tags` a las propiedades `extraJavaOptions` de tu controlador y ejecutor Spark.

En Datadog, el nombre de cada trabajo corresponde al valor que definiste para `-Ddd.servicio`.

```shell
spark-submit \
 --conf spark.driver.extraJavaOptions="-Ddd.service=<JOB_NAME> -Ddd.env=<ENV> -Ddd.version=<VERSION> -Ddd.tags=<KEY_1>:<VALUE_1>,<KEY_2:VALUE_2>" \
 --conf spark.executor.extraJavaOptions="-Ddd.service=<JOB_NAME> -Ddd.env=<ENV> -Ddd.version=<VERSION> -Ddd.tags=<KEY_1>:<VALUE_1>,<KEY_2:VALUE_2>" \
 application.jar
```

## Validación

En Datadog, consulta la página [Data Jobs Monitoring][8] para ver una lista de todos tus trabajos de procesamiento de datos.

## Solucionar problemas

{{% djm-install-troubleshooting %}}

## Configuración avanzada

### Etiquetar tramos (spans) en tiempo de ejecución

{{% djm-runtime-tagging %}}

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/organization-settings/api-keys
[2]: https://console.aws.amazon.com/secretsmanager/
[3]: https://docs.aws.amazon.com/secretsmanager/latest/userguide/rotating-secrets.html
[4]: https://console.aws.amazon.com/emr
[5]: https://console.aws.amazon.com/iam/
[7]: /es/getting_started/site/
[8]: https://app.datadoghq.com/data-jobs/
[9]: /es/data_jobs
[10]: https://docs.aws.amazon.com/emr/latest/ReleaseGuide/emr-601-release.html
[11]: https://docs.aws.amazon.com/emr/latest/ManagementGuide/emr-iam-role-for-ec2.html
[12]: https://github.com/DataDog/datadog-agent/blob/main/pkg/fleet/installer/setup/djm/emr.go