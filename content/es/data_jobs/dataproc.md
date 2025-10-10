---
further_reading:
- link: /data_jobs
  tag: Documentación
  text: Monitorización de Data Jobs
title: Habilitar Data Jobs Monitoring para Spark en Google Cloud Dataproc
---

[Data Jobs Monitoring][9] ofrece visibilidad sobre el rendimiento y la fiabilidad de las aplicaciones de Apache Spark en Google Cloud Dataproc.

## Requisitos
Esta guía se ha diseñado para clústeres de Dataproc en Compute Engine. Si usas Dataproc en GKE, consulta la [guía de instalación de Kubernetes][11].

Se requiere la [versión 2.0.x de Dataproc][10], o una posterior. Se admiten todas las imágenes estándar de Dataproc para Debian, Rocky Linux y Ubuntu.


## Configuración

Sigue estos pasos para habilitar Data Jobs Monitoring para GCP Dataproc.

1. [Almacena tu clave de API de Datadog](#store-your-datadog-api-key-in-google-cloud-secret-manager-recommended) en GCP Secret Manager (recomendado).
1. [Crea y configura tu clúster de Dataproc](#create-and-configure-your-dataproc-cluster).
1. [Especifica el etiquetado de servicios por aplicación de Spark](#specify-service-tagging-per-spark-application).

### Almacenar la clave de API de Datadog en Google Cloud Secret Manager (recomendado)
1. Toma nota de tu [clave de API de Datadog][1].
1. En [GCP Secret Manager][2], elige **Create secret** (Crear secreto).
   - En **Name** (Nombre), ingresa un **Secret name** (Nombre de secreto). Puedes usar `dd_api_key`.
   - En **Secret value** (Valor de secreto), pega tu clave de API de Datadog en el cuadro de texto **Secret value** (Valor de secreto).
      {{< img src="data_jobs/dataproc/key_value.png" alt="Una sección de la página de creación de secretos titulada «Detalles del secreto». En la parte superior, un campo de nombre que contiene «dd_api_key». En la parte inferior, un cuadro de texto para pegar tu propia clave de API." style="width:80%;" >}}
   - Haz clic en **Create Secret** (Crear secreto).
1. De manera opcional, en **Rotation** (Rotación), puedes activar la [rotación automática][3].
1. En [GCP Secret Manager][2], abre el secreto que creaste. Toma nota del ID de recurso, que tiene el formato «proyectos/<PROJECT_NAME>/secretos/<SECRET_NAME>».
1. Asegúrate de que la cuenta de servicio que usa tu clúster de Dataproc tenga permiso para leer el secreto. De manera predeterminada, este es `Compute Engine default service account` (Cuenta de servicio predeterminada de Compute Engine). Para otorgar acceso, copia la entidad de la cuenta de servicio asociada y haz clic en **Grant Access** (Otorgar acceso) en la pestaña **Permissions** (Permisos) de la página del secreto. Asigna el rol `secretmanager.secretAccessor` o cualquier otro que tenga el permiso `secretmanager.versions.access`. Consulta la documentación de [roles de IAM][12] para obtener una descripción completa de los roles disponibles.

### Crear y configurar el clúster de Dataproc

Cuando crees un **clúster de Dataproc nuevo en Compute Engine** en la [consola de Google Cloud][4], añade una acción de inicialización en la página **Customize cluster** (Personalizar clúster):

1. Guarda el siguiente script en un bucket de GCS que tu clúster de Dataproc pueda leer. Toma nota de la ruta a este script.

   ```shell
   #!/bin/bash

   # Set required parameter DD_SITE
   export DD_SITE={{< region-param key="dd_site" code="true" >}}

   # Set required parameter DD_API_KEY with Datadog API key.
   # The commands below assumes the API key is stored in GCP Secret Manager, with the secret name as dd_api_key and the project <PROJECT_NAME>.
   # IMPORTANT: Modify if you choose to manage and retrieve your secret differently.
   # Change the project name, which you can find on the secrets page. The resource ID is in the format "projects/<PROJECT_NAME>/secrets/<SECRET_NAME>".
   PROJECT_NAME=<PROJECT_NAME>
   gcloud config set project $PROJECT_NAME
   SECRET_NAME=dd_api_key
   export DD_API_KEY=$(gcloud secrets versions access latest --secret $SECRET_NAME)

   # Download and run the latest init script
   curl -L https://install.datadoghq.com/scripts/install-dataproc.sh > djm-install-script; bash djm-install-script || true
   ```

   El script anterior establece los parámetros necesarios y descarga y ejecuta el último script de inicialización para Data Jobs Monitoring en Dataproc. Si quieres fijar tu script a una versión específica, puedes sustituir el nombre del archivo en la URL por `install-dataproc-0.9.1.sh` para usar la versión `0.9.1`, por ejemplo. El código fuente que se usa para generar este script se puede encontrar en el [repositorio del Datadog Agent][13].

1. En la página **Customize cluster** (Personalizar clúster), busca la sección **Initialization Actions** (Acciones de inicialización). Ingresa la ruta donde guardaste el script del paso anterior.


Cuando se crea el clúster, esta acción de inicialización instala el Datadog Agent y descarga el rastreador de Java en cada nodo del clúster.

### Especificar el etiquetado de servicios por aplicación de Spark

El etiquetado te permite filtrar, agregar y comparar mejor tu telemetría en Datadog. Puedes configurar etiquetas (tags) al pasar las opciones `-Ddd.service`, `-Ddd.env`, `-Ddd.version` y `-Ddd.tags` a las propiedades `extraJavaOptions` del controlador y ejecutor de Spark.

En Datadog, el nombre de cada trabajo corresponde al valor establecido para `-Ddd.service`.

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

### Tramos (spans) de etiquetas en tiempo de ejecución

{{% djm-runtime-tagging %}}

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}


[1]: https://app.datadoghq.com/organization-settings/api-keys
[2]: https://console.cloud.google.com/security/secret-manager
[3]: https://cloud.google.com/secret-manager/docs/secret-rotation?_gl=1*144zyx0*_ga*MTk0ODY1OTU1OS4xNzI0NzA5NDM4*_ga_WH2QY8WWF5*MTcyNTk1MDU4Mi4yMy4xLjE3MjU5Nzk3NzUuNDEuMC4w
[4]: https://console.cloud.google.com/dataproc/
[5]: https://console.cloud.google.com/iam-admin/iam
[7]: /es/getting_started/site/
[8]: https://app.datadoghq.com/data-jobs/
[9]: /es/data_jobs
[10]: https://cloud.google.com/dataproc/docs/concepts/versioning/overview
[11]: https://docs.datadoghq.com/es/data_jobs/kubernetes/
[12]: https://cloud.google.com/secret-manager/docs/access-control
[13]: https://github.com/DataDog/datadog-agent/blob/main/pkg/fleet/installer/setup/djm/dataproc.go