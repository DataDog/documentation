---
disable_toc: false
further_reading:
- link: /cloud_cost_management/
  tag: Documentación
  text: Cloud Cost Management
- link: /cloud_cost_management/aws
  tag: Documentación
  text: Obtener información sobre tu factura de AWS
- link: /cloud_cost_management/azure
  tag: Documentación
  text: Obtenga información sobre su factura de Azure
- link: /gestión_de_costes_en_la_nube/google_cloud
  tag: Documentación
  text: Obtener información sobre tu factura de Google Cloud
- link: /cloud_cost_management/custom
  tag: Documentación
  text: Obtener información sobre tus costes personalizados
- link: https://www.datadoghq.com/blog/total-cost-of-service-ownership-ccm/
  tag: Blog
  text: Analizar de forma rápida y exhaustiva los costes de la nube y SaaS en tus
    servicios
is_beta: true
private: true
title: Integraciones de costes de SaaS
---

{{< callout btn_hidden="true" header="Únete a la vista previa">}}
Las integraciones de costes de SaaS están en la fase de vista previa.
{{< /callout >}}

## Información general

Las integraciones de costes de SaaS te permiten enviar datos de costes **directamente desde tus proveedores** configurando las cuentas asociadas a tus datos de costes de la nube en Datadog.

{{< partial name="cloud_cost/cost-integrations.html" >}}

</br>

Si tu proveedor no es compatible, utiliza [costes personalizados][1] para cargar cualquier fuente de datos de costes en Datadog y conocer el coste total de tus servicios.

## Configuración

Para utilizar las integraciones de costes de SaaS, debes configurar [Cloud Cost Management][2] para AWS, Azure o Google Cloud.

Consulta la documentación correspondiente a tu proveedor de nube:

{{< partial name="cloud_cost/getting-started.html" >}}

</br>

### Configurar tus cuentas de SaaS

Ve a [**Infrastructure > Cloud Costs > Settings > Accounts** (Infraestructura > Costes de la nube > Configuración > Cuentas)][8] y haz clic en **Configure** (Configurar) en un proveedor para recopilar datos de costes.

{{< img src="cloud_cost/saas_costs/all_accounts.png" alt="Añade tus cuentas con AWS, Azure, Google Cloud para recopilar datos de costes. También puedes añadir tus cuentas para Fastly, Snowflake, Confluent Cloud, MongoDB, Databricks, OpenAI y Twilio" style="width:100%" >}}

{{< tabs >}}
{{% tab "Databricks" %}}

1. Ve al [cuadro de la integración Databricks][101] en Datadog y haz clic en **Configure** (Configurar).
2. Introduce el nombre del espacio de trabajo, la url y el token de acceso correspondientes a tu cuenta de Databricks.
3. En la sección **Seleccionar productos para configurar la integración**, haz clic en el conmutador de cada cuenta para activar `Cloud Cost Management` de Databricks.
4. Introduce un `System Tables SQL Warehouse ID` correspondiente al almacén de su instancia de Databricks para consultar los datos de facturación de la tabla del sistema.
5. Haz clic en **Save Databricks Workspace** (Guardar espacio de trabajo de Databricks).

Podrás acceder a los datos de tus costes de Databricks de los últimos 15 meses en Cloud Cost Management después de 24 horas. Para acceder a los datos disponibles recopilados por cada integración de costes de SaaS, consulta la sección [Datos recopilados](#data-collected).

{{< img src="cloud_cost/saas_costs/databricks_setup_1.png" alt="Realiza una integración con Databricks para recopilar datos de costes." style="width:100%" >}}

[101]: https://app.datadoghq.com/integrations/databricks

{{% /tab %}}
{{% tab "Confluent Cloud" %}}

1. Crea o adquiere una clave de API con el rol de [administrador de facturación][102] en Confluent Cloud.
2. Ve al [cuadro de la integración Confluent Cloud][101] en Datadog y haz clic en **Add Account** (Añadir cuenta).
3. Introduce el nombre de tu cuenta de Confluent Cloud, la clave de API, el secreto de API y, opcionalmente, especifica etiquetas (tags).
4. En la sección **Recursos**, haz clic en el conmutador `Collect cost data to view in Cloud Cost Management`.
5. Haz clic en **Save** (Guardar).

Tus datos de costes de Confluent Cloud estarán disponibles en Cloud Cost Management 24 horas después de la configuración. Estos datos incluyen automáticamente 12 meses de historial, el máximo proporcionado por la API de facturación de Confluent. Durante los tres meses siguientes, los datos se amplían gradualmente hasta cubrir 15 meses de historial. Para acceder a los datos disponibles recopilados por cada integración de costes de SaaS, consulta la sección [Datos recopilados](#data-collected).

Si quieres recopilar etiquetas de nivel de clúster o etiquetas de metadatos empresariales de tus costes, puedes añadir una clave y un secreto de API de Schema Registry. Para obtener más información, consulta [Schema Management en Confluent Cloud][103].

{{< img src="cloud_cost/saas_costs/confluent_setup_1.png" alt="Realiza una integración con Confluent para recopilar datos de costes." style="width:100%" >}}

[101]: https://app.datadoghq.com/integrations/confluent-cloud
[102]: https://docs.confluent.io/cloud/current/security/access-control/rbac/predefined-rbac-roles.html#billingadmin-role
[103]: https://docs.confluent.io/cloud/current/get-started/schema-registry.html#quick-start-for-schema-management-on-ccloud

{{% /tab %}}
{{% tab "MongoDB" %}}

1. [Crea un token de API][101] en MongoDB con permisos `Organizational Billing Viewer` y añade permisos `Organizational Read Only` para las etiquetas de recursos de clúster.
2. Ve al [cuadro de la integración MongoDB Cost Management][102] en Datadog y haz clic en **Add New** (Añadir nuevo).
3. Introduce el nombre de tu de cuenta MongoDB, la clave pública, la clave privada, el ID de la organización y, opcionalmente, especifica etiquetas.
4. Haz clic en **Save** (Guardar).

Podrás acceder a tus datos de costes de MongoDB de los últimos 15 meses en Cloud Cost Management después de 24 horas. Para acceder a los datos disponibles recopilados por cada integración de costes de SaaS, consulta la sección [Datos recopilados](#data-collected).

{{< img src="cloud_cost/saas_costs/mongodb_setup.png" alt="Realiza una integración con MongoDB para recopilar datos de costes." style="width:100%" >}}

[101]: https://www.mongodb.com/docs/cloud-manager/reference/user-roles/#organization-roles
[102]: https://app.datadoghq.com/integrations/mongodb-cost-management

{{% /tab %}}
{{% tab "Copo de nieve" %}}

1. Ve al [cuadro de la integración Snowflake][101] en Datadog y haz clic en **Add Snowflake Account** (Añadir cuenta de Snowflake).
2. Introduce la URL de tu cuenta de Snowflake, por ejemplo: `https://xyz12345.us-east-1.snowflakecomputing.com`.
3. En la sección **Conectar tu cuenta de Snowflake**, haz clic en el conmutador para activar Snowflake en Cloud Cost Management.
4. Introduce tu nombre de usuario de Snowflake en el campo `User Name`.
5. Crea un rol y un usuario específicos de Datadog para monitorizar Snowflake.

   Para crear un rol personalizado, ejecuta lo siguiente en Snowflake:

   ```shell
   -- Create a new role intended to monitor Snowflake usage.
   create role DATADOG;

   -- Grant privileges on the SNOWFLAKE database to the new role.
   grant imported privileges on database SNOWFLAKE to role DATADOG;

   -- Grant usage to your default warehouse to the role DATADOG.
   grant usage on warehouse <WAREHOUSE> to role DATADOG;

   -- If you have cost usage collection enabled, ensure that your credentials have permission to view the ORGANIZATION_USAGE schema.
   grant database role SNOWFLAKE.ORGANIZATION_USAGE_VIEWER to role DATADOG;

   -- Note that the account in which you are creating the Datadog role and user must have OrgAdmin enabled. If the account does not have OrgAdmin, the Datadog role will be unable to access organization usage data used to calculate costs.

   -- Create a user.
   create user DATADOG_USER
   LOGIN_NAME = DATADOG_USER
   password = <PASSWORD>
   default_warehouse = <WAREHOUSE>
   default_role = DATADOG

   -- Grant the monitor role to the user.
   grant role DATADOG to user <USER>
   ```

4. Configura la autenticación del par clave-valor:

   - Genera una clave privada siguiendo la [documentación oficial de Snowflake][102] y carga el archivo de clave privada haciendo clic en **Upload Key** (Cargar clave).
   - Genera una clave pública siguiendo la [documentación oficial de Snowflake][103].
   - Asigna la clave pública al usuario creado en el paso 5 siguiendo la [documentación oficial de Snowflake][104].

5. Haz clic en **Save** (Guardar).

Podrás acceder a tus datos de costes de Snowflake de los últimos 15 meses en Cloud Cost Management después de 24 horas. Para acceder a los datos disponibles recopilados por cada integración de costes de SaaS, consulta la sección [Datos recopilados](#data-collected).

**Etiquetas de consultas de Snowflake**

Las [etiquetas de consultas de Snowflake][106] son potentes cadenas de metadatos que pueden asociarse a las consultas. La [integración Snowflake Cost Management][101] ingiere etiquetas de consultas [analizables JSON][107] presentes en una lista de permisos separada por comas que se encuentra en el cuadro de la integración Snowflake.

Por ejemplo, si una organización quiere agrupar sus costes de cálculos de Snowflake utilizando las dimensiones `team` y `application`, puedes optar por etiquetar tus consultas de Snowflake para la aplicación de un equipo específico de la siguiente manera:
```
ALTER SESSION SET QUERY_TAG = '{"team": "devops", "application": "CI_job_executor"}';
```
{{< img src="cloud_cost/saas_costs/snowflake_query_tags_example.png" alt="Agrupar costes por equipo y etiquetas de consultas de aplicaciones." style="width:100%" >}}

En consecuencia, los costes de todas las consultas ejecutadas utilizando las etiquetas `team` y `application` son atribuibles a estos conceptos.

Para utilizar etiquetas de consultas en Cost Management, asegúrate de lo siguiente:

- La cadena `query_tag` debe ser analizable JSON. Específicamente, esto significa que la cadena es procesable por la función nativa `PARSE_JSON`.

- Debe proporcionarse una lista de claves permitidas en el cuadro de la integración Snowflake. Estas claves se asignan a la primera capa del campo `query_tag` con formato JSON. Esta lista aparece en forma de lista de cadenas separadas por comas, por ejemplo: `tag_1,tag_2,tag_3`. Asegúrate de que las cadenas contienen sólo caracteres alfanuméricos, guiones bajos, guiones y puntos. Puedes introducir esta información en el cuadro de Snowflake, en **Resources Collected -> Cloud Cost Management -> Collected Query Tags* (Recursos recopilados -> Cloud Cost Management -> Etiquetas de consultas recopiladas).

**Nota**: Selecciona tus etiquetas de consultas teniendo en cuenta la magnitud de los datos. Las etiquetas de consultas adecuadas son las que tienen una cardinalidad de grupo baja o media (por ejemplo: equipo, usuario, servicio). Seleccionar una etiqueta de consulta con una cardinalidad de grupo alta (como UUID únicos asociados a ejecuciones de trabajos) puede provocar problemas de cuello de botella tanto para la ingestión de datos como para la devolución del frontend.

**Etiquetas de objetos CCM de Snowflake**

Las etiquetas de objetos son cadenas definidas por el usuario que puedes adjuntar a los objetos de Snowflake para mejorar la auditabilidad y el análisis de costes. Por ejemplo, para realizar un seguimiento de los costes por equipo, etiqueta tus almacenes con los respectivos equipos que los utilizan.

Toda la configuración de las etiquetas de objetos se realiza en [Snowflake][105].

Notas:
- **Etiquetas heredadas**: Los objetos de Snowflake adhieren a una estructura jerárquica y la integración CCM tiene en cuenta las etiquetas heredadas al enviar datos de costes.

{{< img src="cloud_cost/saas_costs/snowflake_setup.png" alt="Realiza una integración con Snowflake para recopilar datos de costes." style="width:100%" >}}

[101]: https://app.datadoghq.com/integrations/snowflake-web
[102]: https://docs.snowflake.com/en/user-guide/key-pair-auth#generate-the-private-key
[103]: https://docs.snowflake.com/en/user-guide/key-pair-auth#generate-a-public-key
[104]: https://docs.snowflake.com/en/user-guide/key-pair-auth#assign-the-public-key-to-a-snowflake-user
[105]: https://docs.snowflake.com/en/user-guide/object-tagging
[106]: https://docs.snowflake.com/en/sql-reference/parameters#query-tag
[107]: https://docs.snowflake.com/en/sql-reference/functions/parse_json

{{% /tab %}}


{{% tab "Elastic Cloud" %}}

1. Ve a la sección [Clave de API][102] en los parámetros de Elastic Cloud de tu organización.
2. Haz clic en **Create New Key** (Crear nueva clave).
3. Elige un **Nombre** y una **Fecha de caducidad** para tu clave de API.
4. Selecciona el rol **Administrador de facturación**.
5. Haz clic en **Create Key** (Crear clave) para generar la clave.
6. Ve al [cuadro de la integración Elastic Cloud][101] en Datadog.
7. Haz clic en **Add Account** (Añadir cuenta).
8. Introduce tu **ID de organización Elastic Cloud** y tu **clave de API de facturación** en la tabla de la cuenta.

Podrás acceder a los datos de tus costes de Elastic Cloud de los últimos 15 meses en Cloud Cost Management después de 24 horas. Para acceder a los datos disponibles recopilados por cada integración de costes de SaaS, consulta la sección [Datos recopilados](#data-collected).

{{< img src="cloud_cost/saas_costs/elasticcloud_setup.png" alt="Realiza una integración con Elastic Cloud para recopilar datos de costes." style="width:100%" >}}

[101]: https://app.datadoghq.com/integrations/elastic-cloud-ccm
[102]: https://cloud.elastic.co/account/keys

{{% /tab %}}

{{% tab "OpenAI" %}}

1. [Crea una clave de API][101] en los parámetros de tu cuenta en OpenAI.
2. Ve al [cuadro de la integración OpenAI][102] en Datadog y haz clic en **Add Account** (Añadir cuenta).
3. Introduce el nombre de tu cuenta de OpenAI, tu clave de API y, opcionalmente, especifica etiquetas.
4. En la sección **Recursos**, haz clic en el conmutador de cada cuenta para activar `OpenAI Billing Usage Data Collection`.
5. Haz clic en **Save** (Guardar).

Podrás acceder a tus datos de costes de OpenAI de los últimos 15 meses en Cloud Cost Management después de 24 horas. Para acceder a los datos disponibles recopilados por cada integración de costes de SaaS, consulta la sección [Datos recopilados](#data-collected).

{{< img src="cloud_cost/saas_costs/openai_setup.png" alt="Realiza una integración con OpenAI para recopilar datos de costes." style="width:100%" >}}

[101]: https://platform.openai.com/docs/quickstart/account-setup
[102]: https://app.datadoghq.com/integrations/openai

{{% /tab %}}
{{% tab "Fastly" %}}

1. Crea un token de API con al menos el contexto `"global:read"` y el rol `"Billing"` en la página [Tokens de API personales][101] en Fastly.
2. Ve al [cuadro de la integración Fastly Cost Management][102] en Datadog y haz clic en **Add New** (Añadir nuevo).
3. Introduce el nombre de su cuenta de Fastly y el token de API.
5. Haz clic en **Save** (Guardar).

Podrás acceder a tus datos de costes de Fastly de los últimos 15 meses en Cloud Cost Management después de 24 horas. Para acceder a los datos disponibles recopilados por cada integración de costes de SaaS, consulta la sección [Datos recopilados](#data-collected).

{{< img src="cloud_cost/saas_costs/fastly_setup_1.png" alt="Realiza una integración con Fastly para recopilar datos de costes." style="width:100%" >}}

[101]: https://manage.fastly.com/account/personal/tokens
[102]: https://app.datadoghq.com/integrations/fastly-cost-management

{{% /tab %}}
{{% tab "Twilio" %}}

1. Ve al [cuadro de la integración Twilio][101] en Datadog y haz clic en **Add Account** (Añadir cuenta).
2. En la sección **Recursos**, haz clic en el conmutador de cada cuenta para activar `Twilio in Cloud Cost Management`.
3. Introduce un `Account SID` para tu cuenta de Twilio.
4. Haz clic en **Save** (Guardar).

Podrás acceder a tus datos de costes de Twilio de los últimos 15 meses en Cloud Cost Management después de 24 horas. Para acceder a los datos disponibles recopilados por cada integración de costes de SaaS, consulta la sección [Datos recopilados](#data-collected).

{{< img src="cloud_cost/saas_costs/twilio_setup.png" alt="Realiza una integración con Twilio para recopilar datos de costes." style="width:100%" >}}

[101]: https://app.datadoghq.com/integrations/twilio

{{% /tab %}}
{{< /tabs >}}

## Datos recopilados

Puedes consultar los datos de costes en la página [**Explorador de costes de la nube**][3], en el [Explorador de etiquetas de costes de la nube][4] y también en [dashboards][5], [notebooks][6] o [monitores][7]. También puedes combinar estas métricas de costes con otras métricas de costes de nube o métricas de observabilidad.

La siguiente tabla contiene una lista no exhaustiva de etiquetas predefinidas asociadas a cada integración de costes de SaaS.

{{< tabs >}}
{{% tab "Databricks" %}}

| Nombre de etiqueta | Descripción de etiqueta |
|---|---
| `account_id` | ID de la cuenta para la que se generó este informe. |
| `billing_origin_product` | Producto o característica que origina el evento de facturación (por ejemplo, TAREAS, CLÚSTERES). |
| `central_clean_room_id` | ID de la sala blanca central asociada a la carga de trabajo (si corresponde). |
| `charge_description` | Combinación del tipo de nube y del nombre del SKU asociado (por ejemplo, AWS - PREMIUM_ALL_PURPOSE_COMPUTE). |
| `cloud` | Nube para la que es relevante este uso. Los valores posibles son AWS, AZURE y GCP. |
| `cluster_id` | ID del clúster asociado a este uso. |
| `custom_tags` | Etiquetas personalizadas aplicadas al uso, normalmente como pares clave-valor para metadatos adicionales o categorización. |
| `destination_region` | Región a la que se dirige la carga de trabajo (si corresponde). |
| `dlt_maintenance_id` | ID de mantenimiento de las Delta Live Tables (si corresponde). |
| `dlt_pipeline_id` | ID del pipeline de las Delta Live Tables (si corresponde). |
| `dlt_tier` | Nivel de servicio de las Delta Live Tables (si corresponde). |
| `dlt_update_id` | ID de actualización de las Delta Live Table asociado a este uso (si corresponde). |
| `endpoint_id` | ID del endpoint para un uso basado en SQL o asociado al servicio (si corresponde). |
| `endpoint_name` | Nombre del endpoint o servidor SQL (si corresponde). |
| `instance_pool_id` | ID del grupo de instancias utilizado (si corresponde). |
| `is_photon` | Indica si se utilizó el procesamiento Photon (`true` o `false`). |
| `is_serverless` | Indica si el uso corresponde a un recurso informático serverless (`true` o `false`). |
| `job_id` | Identificador único para el trabajo en Databricks. |
| `job_name` | Nombre del trabajo en Databricks (si corresponde). |
| `job_run_id` | Identificador de la ejecución del trabajo específico (si corresponde). |
| `jobs_tier` | Nivel del trabajo, como `CLASSIC` o `PREMIUM`. |
| `networking` | Tipo de red utilizada para este trabajo, si se especifica. |
| `node_type` | Tipo de nodo utilizado en este registro de facturación (por ejemplo, m5d.large). |
| `notebook_id` | ID del notebook utilizado en este registro de facturación (si corresponde). |
| `notebook_path` | Ruta al notebook en Databricks (si corresponde). |
| `record_id` | ID único para este registro. |
| `run_name` | Nombre de la ejecución del trabajo o del flujo de trabajo actual (si corresponde). |
| `serving_type` | Tipo de modelo de servicio utilizado, si corresponde (por ejemplo, Model Serving). |
| `source_region` | Región de origen de este registro de facturación (si corresponde). |
| `sql_tier` | Nivel SQL asociado al uso (si correspondiente). |
| `usage_metadata` | Metadatos relacionados con el uso, que pueden incluir información como el tipo de uso, la categoría de servicio u otra información relevante. |
| `usage_type` | Tipo de uso que se se factura (por ejemplo, COMPUTE_TIME). |
| `warehouse_id` | ID del almacén SQL (si corresponde). |
| `workspace_id` | ID del espacio de trabajo al que se asoció este uso. |

{{% /tab %}}
{{% tab "Confluent Cloud" %}}

| Nombre de etiqueta | Descripción de etiqueta |
|---|---
| `charge_description` | Subtipo del coste (por ejemplo, KAFKA_NETWORK_WRITE). |
| `environment_id` | Identificador único del entorno. |
| `network_access_type` | Tipo de acceso a la red del clúster. Los valores posibles son `INTERNET`, `TRANSIT_GATEWAY`, `PRIVATE_LINK` y `PEERED_VPC`. |
| `product` | Nombre del producto. Los valores posibles incluyen `KAFKA`, `CONNECT`, `KSQL`, `AUDIT_LOG`, `STREAM_GOVERNANCE`, `CLUSTER_LINK`, `CUSTOM_CONNECT`, `FLINK`, `SUPPORT_CLOUD_BASIC`, `SUPPORT_CLOUD_DEVELOPER`, `SUPPORT_CLOUD_BUSINESS` y `SUPPORT_CLOUD_PREMIER`. |
| `resource_id` | Identificador único del recurso Confluent. |
| `resource_name` | Nombre del recurso Confluent. |

{{% /tab %}}
{{% tab "Snowflake" %}}

| Nombre de etiqueta | Descripción de etiqueta |
|---|---|
| `account_locator` | Localizador de la cuenta donde se consumió el uso. |
| `account_name` | Nombre de la cuenta donde se consumió el uso. |
| `balance_source` | Fuente de los fondos utilizados para el pago del uso diario. La fuente puede ser una de las siguientes:<br>- **capacidad**: uso pagado con créditos restantes en el compromiso de capacidad de una organización.<br>- **acumulación**: uso pagado con créditos acumulados. Cuando una organización renueva un compromiso de capacidad, los créditos no utilizados se añaden al saldo del nuevo contrato como créditos acumulados.<br>- **uso libre**: uso cubierto por los créditos gratuitos proporcionados a la organización.<br>- **sobreuso**: uso que se pagó a un precio bajo demanda, que se produce cuando una organización agotó su capacidad, la acumulación y sus créditos gratuitos.<br>- **reembolso**: uso cubierto por los créditos adjudicados a la organización cuando ésta compartió datos con otra organización. |
| `billing_type` | Indica lo que se está cargando o acreditando. Los posibles tipos de facturación incluyen:<br>- **consumo**: uso asociado a los créditos de cálculo, los costes de almacenamiento y los costes de transferencia de datos.<br>- **reembolso**: uso cubierto por los créditos adjudicados a la organización cuando ésta compartió datos con otra organización.<br>- **soporte prioritario**: cargos por servicios de soporte prioritario. Estos cargos están asociados a una estipulación de un contrato, no a una cuenta.<br>- **tarifa de despliegue de vps**: cargos por el despliegue de Virtual Private Snowflake.<br>- **crédito por soporte**: soporte de Snowflake acreditado en la cuenta para revertir cargos atribuidos a un problema en Snowflake. |
| `charge_description` | Descripción del tipo de coste asociado a las distintas partidas. Las descripciones difieren para cada tipo de coste, representado por la etiqueta `servicename`. |
| `contract_number` | Número de contrato de Snowflake de la organización. |
| `database_name` | Nombre de la base de datos en la que se ejecutó la consulta (si corresponde). Solo se encuentra para los costes de **atribución de consultas**. |
| `organization_name` | Nombre de la organización. |
| `query_hash` | Hash único que representa una versión parametrizada de la consulta a efectos de atribución. Solo se encuentra para los costes de **atribución de consultas**. |
| `query_hash_version` | Versión del algoritmo hash de la consulta de Snowflake utilizado para generar `query_hash`. Sólo se encuentra para los costes de **atribución de consultas**. |
| `rating_type` | Indica cómo se califica el uso en el registro. Los valores posibles incluyen:<br>- **cálculo**<br>- **transferencia de datos**<br>- **almacenamiento**<br>- **otros**. |
| `region` | Nombre de la región donde se encuentra la cuenta. |
| `service_level` | Nivel de servicio (edición) de la cuenta de Snowflake (Standard, Enterprise o Business Critical). |
| `servicename` | Tipo de uso. Los posibles tipos de servicio son:<br>- **agrupación automática**: consulta Agrupación automática.<br>- **transferencia de datos**: consulta Comprensión del coste de transferencia de datos.<br>- **generación de logs**: consulta Información general de generación de logs y rastreo.<br>- **vista materializada**: consulta Trabajo con vistas materializadas.<br>- **replicación**: consulta Introducción a la replicación y conmutación por error en varias cuentas.<br>- **aceleración de consultas**: consulta Uso del servicio de aceleración de consultas.<br>- **optimización de búsquedas**: consulta Servicio de optimización de búsquedas.<br>- **tareas serverless**: consulta Introducción a las tareas.<br>- **snowpipe**: consulta Snowpipe.<br>- **transmisión snowpipe**: consulta Transmisión de Snowpipe.<br>- **almacenamiento**: consulta Comprender el coste de almacenamiento.<br>- **atribución de consultas de medición del almacén**: consulta Uso del crédito del almacén virtual para consultas con un tiempo de ejecución de 100 ms o mayor. No indica el uso de cálculo serverless o de servicios en la nube.<br-> **atribución de consultas de medición del almacén**: consulta Uso del crédito del almacén virtual para consultas con un tiempo de ejecución de 100 ms o inferior y del tiempo de inactividad del almacén. No indica el uso de cálculo serverless o de servicios en la nube. |
| `user_name` | Nombre del usuario o de la cuenta de servicio asociados a la consulta. |
| `warehouse_id` | Identificador del almacén que genera el coste. |
| `warehouse_name` | Nombre del almacén asociado a este uso. |
| `warehouse_size` | Tamaño del almacén (por ejemplo, Grande, Mediano). |

{{% /tab %}}
{{% tab "Elastic Cloud" %}}
| Nombre de la etiqueta | Descripción de la etiqueta |
|---|---
| `charge_description` | SKU de una carga. |
| `kind` | Tipo de recurso. |
| `name` | Identificador único del recurso Elastic Cloud. |
| `price_per_hour` | Coste del recurso Elastic Cloud por hora. |

{{% /tab %}}
{{% tab "MongoDB" %}}

| Nombre de etiqueta | Descripción de etiqueta |
|---|---|
| `charge_description` | Descripción de un cargo. |
| `cluster_name` | Nombre del clúster que incurrió en el cargo. |
| `group_id` | ID del proyecto al que está asociada la partida. |
| `invoice_id` | Identificador único de la factura. |
| `mongo_org_id` | ID de la organización de MongoDB. |
| `replica_set_name` | Nombre del conjunto de réplicas al que está asociada la partida. |
| `resource_tags` | Etiquetas arbitrarias en clústeres configurados por los usuarios, normalmente como pares clave-valor. |
| `status` | Estado del pago. |

{{% /tab %}}
{{% tab "OpenAI" %}}

| Nombre de etiqueta | Descripción de etiqueta |
|---|---|
| `charge_description` | Nombre del modelo cuyos costes están asociados al cargo. |
| `organization_id` | Identificador único de la organización. |
| `organization_name` | Nombre de la organización. |
| `project_id` | Identificador único del proyecto. |
| `project_name` | Nombre del proyecto. |

{{% /tab %}}
{{% tab "Fastly" %}}

| Nombre de etiqueta | Descripción de etiqueta |
|---|---|
| `charge_description` | Descripción del cargo. |
| `credit_coupon_code` | Código de cualquier cupón o crédito aplicado a esta entrada de costes (si está disponible). |
| `plan_name` | Nombre del plan al que pertenece este servicio, que suele coincidir con "product_line". |
| `product_name` | Nombre del producto específico que se está facturando (por ejemplo, "Ancho de banda Norteamérica"). |
| `product_group` | Grupo o categoría del producto, como "Entrega de sitio completo". |
| `product_line` | Línea de productos a la que pertenece esta partida, por ejemplo, "Servicios de red". |
| `region` | Región donde se utilizó el servicio (por ejemplo, "América del Norte"). |
| `service_name` | Nombre del servicio asociado a esta entrada de costes, que suele coincidir con `product_name`. |
| `usage_type` | Tipo de uso que se factura (por ejemplo, "Ancho de banda"). |
| `usage_type_cd` | Código o etiqueta que representa el tipo de uso, como "Ancho de banda Norteamérica". |

{{% /tab %}}
{{% tab "Twilio" %}}

| Nombre de etiqueta | Descripción de etiqueta |
|---|---|
| `account_sid` | Cadena alfanumérica que identifica la cuenta de Twilio. |
| `category` | Categoría de uso. Para obtener más información, consulta [Categorías de uso][101]. |
| `charge_description` | Descripción del cargo. |
| `count_unit` | Unidades en las que se mide el recuento, como llamadas para las llamadas o mensajes para los SMS. |
| `usage_unit` | Unidades en las que se mide el uso, como minutos para las llamadas o mensajes para los SMS. |

[101]: https://www.twilio.com/docs/usage/api/usage-record#usage-categories

{{% /tab %}}
{{< /tabs >}}

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/cloud_cost_management/custom
[2]: /es/cloud_cost_management
[3]: https://app.datadoghq.com/cost/explorer
[4]: https://app.datadoghq.com/cost/tags?cloud=custom
[5]: /es/dashboards
[6]: /es/notebooks
[7]: /es/monitors/types/cloud_cost
[8]: https://app.datadoghq.com/cost/settings/accounts