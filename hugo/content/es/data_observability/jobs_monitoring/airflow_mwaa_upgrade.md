---
description: Resuelva conflictos de dependencias al instalar apache-airflow-providers-openlineage
  en Amazon MWAA Airflow 2.7.2, 2.8.1, o 2.9.2.
further_reading:
- link: /data_observability/jobs_monitoring/airflow/?tab=amazonmwaa
  tag: Documentación
  text: 'Habilite Data Observability: Jobs Monitoring para Apache Airflow'
title: Actualice el proveedor de OpenLineage en Amazon MWAA para Airflow 2.7.2, 2.8.1,
  o 2.9.2
---
## Descripción general {#overview}

Utilice esta guía si su entorno de Amazon MWAA ejecuta Airflow `2.7.2`, `2.8.1` o `2.9.2`.

Para estas versiones de Airflow, las restricciones predeterminadas de MWAA fijan versiones anteriores de `apache-airflow-providers-openlineage` y del paquete OpenLineage. Estas versiones pueden causar problemas conocidos de confiabilidad y compatibilidad, lo que puede degradar la experiencia de Data Observability.

Para utilizar versiones de proveedor que incluyan estas correcciones, actualice las restricciones y los requisitos juntos. Amazon MWAA aplica restricciones de paquetes para cada versión de Airflow y Python, por lo que actualizar los paquetes de OpenLineage puede entrar en conflicto con los valores predeterminados de MWAA a menos que proporcione restricciones personalizadas.

Para obtener detalles sobre el comportamiento de las dependencias y restricciones de MWAA, consulte la documentación de AWS sobre [dependencias de Python][3]. Para revisar la compatibilidad y los requisitos del proveedor, consulte la [documentación del proveedor de OpenLineage][4].

Para conocer los pasos de configuración base, consulte [Habilite Data Observability: Jobs Monitoring para Apache Airflow][1].

## Para otras versiones de MWAA {#for-other-mwaa-versions}

Si su entorno de MWAA ejecuta una versión de Airflow que no aparece en esta guía, Datadog recomienda usar la versión más reciente de `apache-airflow-providers-openlineage` que sea compatible con su versión de Airflow. Utilice la [tabla de compatibilidad del proveedor de OpenLineage para Airflow][8] para elegir esa versión y, a continuación, siga el mismo patrón de restricciones:

1. Descargue el archivo de restricciones de MWAA para sus versiones de Airflow y Python.
2. Actualice la fijación del proveedor de OpenLineage y cualquier fijación de dependencia de OpenLineage requerida en `constraints.txt`.
3. Fije las mismas versiones en `requirements.txt`.
4. Cargue ambos archivos en su bucket de S3 de MWAA y actualice el entorno de MWAA.

Datadog recomienda utilizar la versión de proveedor compatible más reciente disponible para su versión de Airflow. Revise el [registro de cambios del proveedor de OpenLineage][9] antes de actualizar, ya que las versiones del proveedor pueden cambiar la versión mínima de Airflow admitida o las versiones de dependencia requeridas.

## Requisitos {#requirements}

- Acceso al bucket de Amazon S3 configurado para su entorno de MWAA
- Permiso para actualizar `requirements.txt` y la configuración del entorno de MWAA

## Versiones recomendadas {#recommended-versions}

La siguiente tabla muestra las versiones predeterminadas fijadas por las restricciones de MWAA y las versiones de actualización recomendadas para cada versión de Airflow:

| Paquete | Airflow 2.7.2 | Airflow 2.8.1 | Airflow 2.9.2 |
|---|---|---|---|
| `apache-airflow-providers-openlineage` | Predeterminado: 1.1.0 <br/>Actualización: **1.14.0** - [Wheel parcheado por Datadog][6] | Predeterminado: 1.4.0 <br/>Actualización: **1.14.0** | Predeterminado: 1.8.0  <br/>Actualización:**2.2.0** |
| `apache-airflow-providers-common-sql` | Predeterminado: 1.7.2 <br/>Actualización: sin cambios | Predeterminado: 1.10.0 <br/>Actualización: **1.20.0** | Predeterminado: 1.14.0 <br/>Actualización: **1.21.0** |
| `apache-airflow-providers-common-compat` | Predeterminado: n/a <br/>Actualización: **1.2.2** - [Wheel parcheado por Datadog][7] | Predeterminado: n/a <br/>Actualización: **1.2.1** | Predeterminado: n/a <br/>Actualización: **1.4.0** |
| `openlineage-integration-common` | Predeterminado: 1.3.1 <br/>Actualización: **1.24.2** | Predeterminado: 1.7.0 <br/>Actualización: **1.24.2** | Predeterminado: 1.16.0 <br/>Actualización: **1.31.0** |
| `openlineage-python` | Predeterminado: 1.3.1 <br/>Actualización: **1.24.2** | Predeterminado: 1.7.0 <br/>Actualización: **1.24.2** | Predeterminado: 1.16.0 <br/>Actualización: **1.31.0** |
| `openlineage-sql` | Predeterminado: 1.3.1 <br/>Actualización: **1.24.2** | Predeterminado: 1.7.0 <br/>Actualización: **1.24.2** | Predeterminado: 1.16.0 <br/>Actualización: **1.31.0** |

## Actualizar restricciones y requisitos {#update-constraints-and-requirements}

{{< tabs >}}
{{% tab "Airflow 2.7.2" %}}

Airflow 2.7.2 no es compatible con el paquete `apache-airflow-providers-openlineage` 1.14.0 de upstream. Datadog proporciona versiones parcheadas de los paquetes de proveedor y `common-compat` con restricciones de versión de Airflow flexibles para su uso en MWAA 2.7.2.

1. Descargue los archivos wheel parcheados y cárguelos en su bucket de S3 de MWAA:

   ```shell
   MWAA_BUCKET=<MWAA_BUCKET_NAME>
   curl -Lo apache_airflow_providers_openlineage-1.14.0-py3-none-any.whl \
     "https://docs.datadoghq.com/resources/whl/apache_airflow_providers_openlineage-1.14.0-py3-none-any.whl"
   curl -Lo apache_airflow_providers_common_compat-1.2.2-py3-none-any.whl \
     "https://docs.datadoghq.com/resources/whl/apache_airflow_providers_common_compat-1.2.2-py3-none-any.whl"
   aws s3 cp apache_airflow_providers_openlineage-1.14.0-py3-none-any.whl "s3://${MWAA_BUCKET}/dags/"
   aws s3 cp apache_airflow_providers_common_compat-1.2.2-py3-none-any.whl "s3://${MWAA_BUCKET}/dags/"
   ```

2. Descargue el archivo de restricciones de Airflow:

   ```shell
   curl -o constraints.txt \
     "https://raw.githubusercontent.com/apache/airflow/constraints-2.7.2/constraints-3.11.txt"
   ```

   **Nota**: Verifique la versión de Python para su entorno de MWAA. Si su entorno utiliza una versión de Python diferente, reemplace `3.11` en la URL.

3. Edite `constraints.txt` y actualice estos pines de paquete:

   ```text
   apache-airflow-providers-openlineage==1.14.0
   openlineage-integration-common==1.24.2
   openlineage-python==1.24.2
   openlineage-sql==1.24.2
   ```

   Agregue también la siguiente línea, ya que no está presente en el archivo de restricciones predeterminado:

   ```text
   apache-airflow-providers-common-compat==1.2.2
   ```

   No se necesita ningún cambio para `apache-airflow-providers-common-sql` (el `1.7.2` predeterminado es compatible).

4. Cargue el archivo de restricciones actualizado en su bucket de S3 de MWAA:

   ```shell
   aws s3 cp constraints.txt "s3://${MWAA_BUCKET}/dags/constraints.txt"
   ```

5. Actualice `requirements.txt` para hacer referencia a las ruedas y restricciones parcheadas:

   ```text
   --constraint /usr/local/airflow/dags/constraints.txt
   /usr/local/airflow/dags/apache_airflow_providers_openlineage-1.14.0-py3-none-any.whl
   /usr/local/airflow/dags/apache_airflow_providers_common_compat-1.2.2-py3-none-any.whl
   openlineage-integration-common==1.24.2
   openlineage-python==1.24.2
   openlineage-sql==1.24.2
   ```

6. Cargue el archivo `requirements.txt` actualizado:

   ```shell
   aws s3 cp requirements.txt "s3://${MWAA_BUCKET}/requirements.txt"
   ```

{{% /tab %}}
{{% tab "Airflow 2.8.1" %}}

1. Descargue el archivo de restricciones de Airflow:

   ```shell
   curl -o constraints.txt \
     "https://raw.githubusercontent.com/apache/airflow/constraints-2.8.1/constraints-3.11.txt"
   ```

   **Nota**: Verifique la versión de Python para su entorno de MWAA. Si su entorno utiliza una versión de Python diferente, reemplace `3.11` en la URL.

2. Edite `constraints.txt` y actualice estos pines de paquete:

   ```text
   apache-airflow-providers-openlineage==1.14.0
   apache-airflow-providers-common-sql==1.20.0
   openlineage-integration-common==1.24.2
   openlineage-python==1.24.2
   openlineage-sql==1.24.2
   ```

   Agregue también la siguiente línea, ya que no está presente en el archivo de restricciones predeterminado:

   ```text
   apache-airflow-providers-common-compat==1.2.1
   ```

3. Cargue el archivo de restricciones actualizado en su bucket de S3 de MWAA:

   ```shell
   MWAA_BUCKET=<MWAA_BUCKET_NAME>
   aws s3 cp constraints.txt "s3://${MWAA_BUCKET}/dags/constraints.txt"
   ```

4. Actualice `requirements.txt` para hacer referencia al archivo de restricciones y fijar las versiones de los paquetes actualizados:

   ```text
   --constraint /usr/local/airflow/dags/constraints.txt
   apache-airflow-providers-openlineage==1.14.0
   apache-airflow-providers-common-sql==1.20.0
   apache-airflow-providers-common-compat==1.2.1
   openlineage-integration-common==1.24.2
   openlineage-python==1.24.2
   openlineage-sql==1.24.2
   ```

5. Cargue el archivo `requirements.txt` actualizado:

   ```shell
   aws s3 cp requirements.txt "s3://${MWAA_BUCKET}/requirements.txt"
   ```

{{% /tab %}}
{{% tab "Airflow 2.9.2" %}}

1. Descargue el archivo de restricciones de Airflow:

   ```shell
   curl -o constraints.txt \
     "https://raw.githubusercontent.com/apache/airflow/constraints-2.9.2/constraints-3.11.txt"
   ```

   **Nota**: Verifique la versión de Python para su entorno de MWAA. Si su entorno utiliza una versión de Python diferente, reemplace `3.11` en la URL.

2. Edite `constraints.txt` y actualice estos pines de paquete:

   ```text
   apache-airflow-providers-openlineage==2.2.0
   apache-airflow-providers-common-sql==1.21.0
   openlineage-integration-common==1.31.0
   openlineage-python==1.31.0
   openlineage-sql==1.31.0
   ```

   Agregue también la siguiente línea, ya que no está presente en el archivo de restricciones predeterminado:

   ```text
   apache-airflow-providers-common-compat==1.4.0
   ```

3. Cargue el archivo de restricciones actualizado en su bucket de S3 de MWAA:

   ```shell
   MWAA_BUCKET=<MWAA_BUCKET_NAME>
   aws s3 cp constraints.txt "s3://${MWAA_BUCKET}/dags/constraints.txt"
   ```

4. Actualice `requirements.txt` para hacer referencia al archivo de restricciones y fijar las versiones de los paquetes actualizados:

   ```text
   --constraint /usr/local/airflow/dags/constraints.txt
   apache-airflow-providers-openlineage==2.2.0
   apache-airflow-providers-common-sql==1.21.0
   apache-airflow-providers-common-compat==1.4.0
   openlineage-integration-common==1.31.0
   openlineage-python==1.31.0
   openlineage-sql==1.31.0
   ```

5. Cargue el archivo `requirements.txt` actualizado:

   ```shell
   aws s3 cp requirements.txt "s3://${MWAA_BUCKET}/requirements.txt"
   ```

{{% /tab %}}
{{< /tabs >}}

## Implemente y valide {#deploy-and-validate}

1. En la consola de MWAA, actualice el entorno para que detecte el nuevo `requirements.txt`.
2. Espere a que se complete la actualización del entorno.
3. Revise los registros de instalación y inicio de MWAA. Confirme que no haya errores del resolutor de dependencias.
4. Inicie una ejecución de DAG que emita eventos de OpenLineage.
5. En Datadog, verifique que las ejecuciones aparezcan en la página [Data Observability: Jobs Monitoring][2].

## Solución de problemas {#troubleshooting}

- Si la resolución de dependencias sigue fallando, verifique que las mismas versiones de los paquetes estén fijadas tanto en `constraints.txt` como en `requirements.txt`.
- Si MWAA instala versiones anteriores, verifique que `requirements.txt` apunte a `--constraint /usr/local/airflow/dags/constraints.txt` y que el archivo exista en su ruta de S3 `dags/`.
- Si las cargas o lecturas fallan, verifique que el rol de ejecución de MWAA tenga acceso a los objetos de S3 requeridos. Para obtener más detalles, consulte [Amazon MWAA execution role][5].

## Si administra una imagen personalizada {#if-you-manage-a-custom-image}

Si su equipo administra las versiones de los paquetes a través de una imagen de Airflow personalizada, actualice primero las versiones de los paquetes en la definición de la imagen y, luego, vuelva a generar `requirements.txt` a partir de la imagen construida para que las restricciones y los requisitos permanezcan alineados.

[1]: /es/data_observability/jobs_monitoring/airflow/?tab=amazonmwaa
[2]: https://app.datadoghq.com/data-jobs/
[3]: https://docs.aws.amazon.com/mwaa/latest/userguide/connections-packages.html
[4]: https://airflow.apache.org/docs/apache-airflow-providers-openlineage/stable/index.html
[5]: https://docs.aws.amazon.com/mwaa/latest/userguide/mwaa-create-role.html
[6]: /es/resources/whl/apache_airflow_providers_openlineage-1.14.0-py3-none-any.whl
[7]: /es/resources/whl/apache_airflow_providers_common_compat-1.2.2-py3-none-any.whl
[8]: /es/data_observability/jobs_monitoring/airflow/#openlineage-provider-compatibility
[9]: https://airflow.apache.org/docs/apache-airflow-providers-openlineage/stable/changelog.html