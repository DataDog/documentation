---
aliases:
- /es/cloud_cost_management/saas_costs
disable_toc: false
further_reading:
- link: /cloud_cost_management/
  tag: Documentación
  text: Cloud Cost Management
- link: /cloud_cost_management/setup/aws
  tag: Documentación
  text: Obtenga información sobre su factura de AWS
- link: /cloud_cost_management/setup/azure
  tag: Documentación
  text: Obtenga información sobre su factura de Azure
- link: /cloud_cost_management/setup/google_cloud
  tag: Documentación
  text: Obtenga información sobre su factura de Google Cloud
- link: /cloud_cost_management/setup/oracle
  tag: Documentación
  text: Obtenga información sobre su factura de Oracle
- link: /cloud_cost_management/setup/custom
  tag: Documentación
  text: Obtenga información sobre sus costos personalizados
- link: https://www.datadoghq.com/blog/total-cost-of-service-ownership-ccm/
  tag: Blog
  text: Analice de forma rápida y exhaustiva los costos de la nube y SaaS detrás de
    sus servicios
- link: https://www.datadoghq.com/blog/cursor-cloud-cost-management/
  tag: Blog
  text: Administre los costos de Cursor con Datadog Cloud Cost Management
title: Costos de SaaS e IA
---
## Descripción general {#overview}

Los costos de SaaS y AI le permiten enviar datos de costos **directamente desde sus proveedores** configurando las cuentas asociadas con sus datos de costos en Cloud Cost Management en Datadog.

{{< card-grid >}}
  {{< image-card href="/cloud_cost_management/setup/saas_costs/?tab=snowflake#configure-your-saas-accounts" src="integrations_logos/snowflake_small.svg" alt="Snowflake" >}}
  {{< image-card href="/cloud_cost_management/setup/saas_costs/?tab=databricks#configure-your-saas-accounts" src="integrations_logos/databricks_small.svg" alt="Databricks" >}}
  {{< image-card href="/cloud_cost_management/setup/saas_costs/?tab=openai#configure-your-saas-accounts" src="integrations_logos/openai_small.svg" alt="OpenAI" >}}
  {{< image-card href="/cloud_cost_management/setup/saas_costs/?tab=anthropic#configure-your-saas-accounts" src="integrations_logos/anthropic_small.svg" alt="Anthropic" >}}
  {{< image-card href="/cloud_cost_management/setup/saas_costs/?tab=cursor#configure-your-saas-accounts" src="integrations_logos/cursor_small.svg" alt="Cursor" >}}
  {{< image-card href="/cloud_cost_management/setup/saas_costs/?tab=temporalcloud#configure-your-saas-accounts" src="integrations_logos/temporal_small.svg" alt="Temporal Cloud" >}}
  {{< image-card href="/cloud_cost_management/setup/saas_costs/?tab=github#configure-your-saas-accounts" src="integrations_logos/github_small.svg" alt="GitHub" >}}
  {{< image-card href="/cloud_cost_management/setup/saas_costs/?tab=confluentcloud#configure-your-saas-accounts" src="integrations_logos/confluent-cloud_small.svg" alt="Confluent Cloud" >}}
  {{< image-card href="/cloud_cost_management/setup/saas_costs/?tab=mongodb#configure-your-saas-accounts" src="integrations_logos/mongodb_small.svg" alt="MongoDB" >}}
  {{< image-card href="/cloud_cost_management/setup/saas_costs/?tab=elasticcloud#configure-your-saas-accounts" src="integrations_logos/elastic-cloud_small.svg" alt="Elastic Cloud" >}}
  {{< image-card href="/cloud_cost_management/setup/saas_costs/?tab=fastly#configure-your-saas-accounts" src="integrations_logos/fastly_small.svg" alt="Fastly" >}}
  {{< image-card href="/cloud_cost_management/setup/saas_costs/?tab=twilio#configure-your-saas-accounts" src="integrations_logos/twilio_small.svg" alt="Twilio" >}}
{{< /card-grid >}}

Si su proveedor no es compatible, utilice [Custom Costs][1] para cargar cualquier fuente de datos de costos a Datadog y comprender el costo total de sus servicios. Actualmente solo se admiten costos de SaaS en USD.

## Configuración {#setup}

Navegue a [**Cloud Cost** > **Settings**, seleccione **Accounts**][8] y luego haga clic en {{< ui >}}Configure{{< /ui >}} en un proveedor para recopilar datos de costos.

{{< img src="cloud_cost/saas_costs/all_accounts.png" alt="Agregue sus cuentas de AWS, Azure y Google Cloud para recopilar datos de costos. También puede agregar sus cuentas de Fastly, Snowflake, Confluent Cloud, MongoDB, Databricks, OpenAI, Twilio, GitHub, Cursor y Temporal Cloud" style="width:100%" >}}

{{< tabs >}}

{{% tab "Snowflake" %}}

1. Encuentre su [URL de cuenta de Snowflake][102].
   {{< img src="integrations/snowflake/snowflake_account_url.png" alt="El menú de cuenta con la opción de copiar URL de cuenta seleccionada en la interfaz de usuario de Snowflake" style="width:100%;" >}}
2. Navegue al [mosaico de integración de Snowflake][101] en Datadog y haga clic en {{< ui >}}Add Snowflake Account{{< /ui >}}.
3. Ingrese la URL de su cuenta de Snowflake en el campo {{< ui >}}Account URL{{< /ui >}}. Por ejemplo: `https://xyz12345.us-east-1.snowflakecomputing.com`.
4. En la sección {{< ui >}}Connect your Snowflake account{{< /ui >}}, haga clic en el interruptor para habilitar Snowflake en Cloud Cost Management.
5. Ingrese su nombre de usuario de Snowflake en el campo {{< ui >}}User Name{{< /ui >}}.
6. Siga el paso 4 de la página de [integración de Snowflake][103] para crear un rol y un usuario específicos de Datadog para hacer un seguimiento de Snowflake.
7. Siga el paso 5 de la página de [integración de Snowflake][103] para configurar la autenticación de par clave-valor.
8. Haga clic en {{< ui >}}Save{{< /ui >}}.

Los datos de costos de Snowflake de los últimos 6 meses están disponibles en Cloud Cost Management en un plazo de 24 horas. Para acceder a los datos disponibles recopilados por cada integración de costos SaaS, consulte la sección [Datos recopilados](#data-collected).

**Etiquetas de consulta de Snowflake**

Las [etiquetas de consulta de Snowflake][105] son cadenas de metadatos potentes que pueden asociarse a las consultas. La [integración de gestión de costos de Snowflake][101] ingiere etiquetas de consulta [analizables en JSON][106] presentes en una lista de permitidos separada por comas que se encuentra en el mosaico de integración de Snowflake.

Por ejemplo, si una organización desea agrupar sus costos de cómputo de Snowflake por las dimensiones `team` y `application`, puede optar por etiquetar sus consultas de Snowflake para la aplicación de un equipo específico de la siguiente manera:

```
ALTER SESSION SET QUERY_TAG = '{"team": "devops", "application": "CI_job_executor"}';
```
{{< img src="cloud_cost/saas_costs/snowflake_query_tags_example.png" alt="Agrupe los costos por etiquetas de consulta de equipo y aplicación." style="width:100%" >}}

Como resultado, los costos de todas las consultas ejecutadas con las etiquetas de consulta `team` y `application` son atribuibles a esos conceptos.

Para utilizar etiquetas de consulta dentro de la gestión de costos, asegúrese de lo siguiente:

- La cadena `query_tag` debe ser analizable en JSON. Específicamente, esto significa que la cadena puede ser procesada por la función nativa `PARSE_JSON`.

- Se debe proporcionar una lista de permitidos de claves en el mosaico de integración de Snowflake. Estas claves se asignan a la primera capa del campo `query_tag` con formato JSON. Esta lista de permitidos aparece en forma de una lista de cadenas separadas por comas, por ejemplo: `tag_1,tag_2,tag_3`. Asegúrese de que las cadenas contengan solo caracteres alfanuméricos, guiones bajos, guiones y puntos. Ingrese esta información en el mosaico de Snowflake, en {{< ui >}}Resources Collected{{< /ui >}} > {{< ui >}}Cloud Cost Management{{< /ui >}} > {{< ui >}}Collected Query Tags{{< /ui >}}.

**Nota**: Seleccione sus etiquetas de consulta teniendo en cuenta la magnitud de los datos. Las etiquetas de consulta adecuadas son aquellas que tienen una cardinalidad de grupo baja a media (por ejemplo: equipo, usuario, servicio). Seleccionar una etiqueta de consulta con una cardinalidad de grupo alta (como un UUID único asociado con ejecuciones de trabajo) puede resultar en problemas de cuello de botella tanto para la ingesta de datos como para la representación en el frontend.

**Etiquetas de objeto de Snowflake CCM**

Las etiquetas de objeto son cadenas definidas por el usuario que puede adjuntar a objetos de Snowflake para mejorar la auditabilidad y el análisis de costos. Por ejemplo, para realizar un seguimiento de los costos por equipo, etiquete sus almacenes con los equipos respectivos que los utilizan.

Toda la configuración de etiquetas de objeto se realiza dentro de [Snowflake][104].

Notas:
- **Herencia de etiquetas**: Los objetos de Snowflake se adhieren a una estructura jerárquica, y la integración de CCM considera las etiquetas heredadas al enviar datos de costos.

{{< img src="cloud_cost/saas_costs/snowflake_setup.png" alt="Intégrese con Snowflake para recopilar datos de costos." style="width:100%" >}}

[101]: https://app.datadoghq.com/integrations/snowflake-web
[102]: https://docs.snowflake.com/en/user-guide/organizations-connect
[103]: /es/integrations/snowflake-web/#cloud-cost-management
[104]: https://docs.snowflake.com/en/user-guide/object-tagging
[105]: https://docs.snowflake.com/en/sql-reference/parameters#query-tag
[106]: https://docs.snowflake.com/en/sql-reference/functions/parse_json

{{% /tab %}}

{{% tab "Databricks" %}}

1. Navegue al [mosaico de integración de Databricks][101] en Datadog y haga clic en {{< ui >}}Configure{{< /ui >}}.
2. Ingrese el nombre del área de trabajo, la URL, el ID de cliente y el secreto de cliente correspondientes a su principal de servicio de Databricks.
3. En la sección {{< ui >}}Select products to set up integration{{< /ui >}}, haga clic en el interruptor de cada cuenta para habilitar `Cloud Cost Management` de Databricks.
4. Ingrese un `System Tables SQL Warehouse ID` correspondiente al almacén de su instancia de Databricks para consultar los datos de facturación de las tablas del sistema.
5. Haga clic en {{< ui >}}Save Databricks Workspace{{< /ui >}}.

Su principal de servicio requiere acceso de lectura a las [tablas del sistema](https://docs.databricks.com/aws/en/admin/system-tables/) dentro de Unity Catalog. En Databricks, abra el {{< ui >}}SQL Editor{{< /ui >}} y ejecute los siguientes comandos, utilizando el ID de cliente de la entidad de servicio (no su nombre para mostrar):

```sql
GRANT USE CATALOG ON CATALOG system TO `<CLIENT-ID>`;
GRANT USE SCHEMA ON CATALOG system TO `<CLIENT-ID>`;
GRANT SELECT ON CATALOG system TO `<CLIENT-ID>`;
```

Sus datos de costos de Databricks de los últimos 15 meses se pueden consultar en Cloud Cost Management después de 24 horas. Para acceder a los datos disponibles recopilados por cada integración de costos SaaS, consulte la sección [Datos recopilados](#data-collected).

{{< img src="cloud_cost/saas_costs/databricks_setup_1.png" alt="Intégrese con Databricks para recopilar datos de costos." style="width:100%" >}}

[101]: https://app.datadoghq.com/integrations/databricks

{{% /tab %}}


{{% tab "OpenAI" %}}

<div class="alert alert-danger">Se requiere una <strong>clave de API con alcance de administrador</strong> para recopilar datos de costos de OpenAI para Cloud Cost Management. Las claves de API con alcance de proyecto no pueden recopilar datos de costos.</div>

1. Cree una [clave de API de administrador][103] en la configuración de su cuenta de OpenAI:
   - Inicie sesión en su [cuenta de OpenAI][104].
   - Navegue a la [página de claves de administrador][105] o diríjase a {{< ui >}}API keys{{< /ui >}} en {{< ui >}}Organization settings{{< /ui >}} y seleccione la pestaña {{< ui >}}Admin keys{{< /ui >}}.
   - Haga clic en {{< ui >}}Create a new secret key{{< /ui >}} y copie la clave de API de administrador creada.
2. Navegue al [mosaico de integración de OpenAI][102] en Datadog y haga clic en {{< ui >}}Add Account{{< /ui >}}.
3. Ingrese el nombre de su cuenta de OpenAI, introduzca su clave de API de administrador y, opcionalmente, especifique etiquetas.
4. En la sección {{< ui >}}Resources{{< /ui >}}, haga clic en el interruptor de cada cuenta para habilitar `OpenAI Billing Usage Data Collection`.
5. Haga clic en {{< ui >}}Save{{< /ui >}}.

Sus datos de costos de OpenAI de los últimos 15 meses se pueden consultar en Cloud Cost Management después de 24 horas. Para acceder a los datos disponibles recopilados por cada integración de costos SaaS, consulte la sección [Datos recopilados](#data-collected).

{{< img src="cloud_cost/saas_costs/openai_setup.png" alt="Intégrese con OpenAI para recopilar datos de costos." style="width:100%" >}}

[102]: https://app.datadoghq.com/integrations/openai
[103]: https://platform.openai.com/docs/api-reference/admin-api-keys
[104]: https://platform.openai.com/
[105]: https://platform.openai.com/settings/organization/admin-keys

{{% /tab %}}

{{% tab "Anthropic" %}}

### 1. Genere una clave de API de administrador {#1-generate-an-admin-api-key}

Comience obteniendo una [clave de API de administrador](https://docs.anthropic.com/en/api/administration-api) de Anthropic. Esta clave permite el acceso a informes de uso y costos en toda su organización.

1. Navegue a la configuración de su organización o comuníquese con el administrador de su cuenta de Anthropic para crear una nueva clave de API de administrador.
2. Copie la clave de API en una ubicación segura.

### 2. Configure la integración de Datadog {#2-configure-the-datadog-integration}

1. En Datadog, navegue a [**Integrations > Anthropic Usage and Costs**](https://app.datadoghq.com/integrations?integrationId=anthropic-usage-and-costs).
2. En la pestaña {{< ui >}}Configure{{< /ui >}}, debajo de {{< ui >}}Account details{{< /ui >}}, pegue la {{< ui >}}Admin API Key{{< /ui >}} de Anthropic.
3. Haga clic en {{< ui >}}Save{{< /ui >}}.

Después de guardar su configuración, Datadog comienza a consultar los puntos de conexión de uso y costos de Anthropic mediante esta clave y completa las métricas en su entorno.

**Nota**: Para realizar un seguimiento de los costos tanto de las cuentas de Anthropic Enterprise como de las de plataforma, repita los pasos de configuración para agregar una entrada de cuenta independiente para cada tipo de clave de API. Utilice la [clave de API de administrador](https://docs.anthropic.com/en/api/administration-api) para el uso estándar de la plataforma y la clave de API de Enterprise Analytics para el uso de Anthropic Enterprise.

{{% /tab %}}

{{% tab "Cursor" %}}

<div class="alert alert-warning">Se requiere un plan Enterprise y un rol de administrador de equipo para generar una clave de API de administrador de Cursor. Las cuentas con plan de equipo estándar devuelven errores de acceso denegado.</div>

### 1. Genere una clave de API de administrador {#1-generate-an-admin-api-key-1}

Comience obteniendo una clave de API de administrador de Cursor. Esta clave permite el acceso a informes de uso y costos en todo su equipo.

1. En el panel de control de Cursor, vaya a **Settings > Advanced > Admin API Keys**.
2. Cree una nueva clave de API de administrador y cópiela en una ubicación segura.

### 2. Configure la integración de Datadog {#2-configure-the-datadog-integration-1}

1. En Datadog, vaya a [**Integrations > Cursor**][101].
2. En la pestaña {{< ui >}}Configure{{< /ui >}}, debajo de {{< ui >}}Account details{{< /ui >}}, pegue la {{< ui >}}Admin API Key{{< /ui >}} de Cursor.
3. En la sección {{< ui >}}Resources{{< /ui >}}, haga clic en el interruptor de cada cuenta para habilitar `Cursor in Cloud Cost Management`.
4. Haga clic en {{< ui >}}Save{{< /ui >}}.

Después de guardar su configuración, Datadog comienza a consultar los puntos de conexión de uso y costo de Cursor usando esta clave y completa las métricas en su entorno. Sus datos de costos de Cursor de los últimos 15 meses pueden consultarse en Cloud Cost Management después de 24 horas. Para acceder a los datos disponibles recopilados por cada integración de costos SaaS, consulte la sección [Datos recopilados](#data-collected).

[101]: https://app.datadoghq.com/integrations/cursor

{{% /tab %}}

{{% tab "Temporal Cloud" %}}

<div class="alert alert-warning">Se requiere una cuenta de servicio con el rol de <strong>Finance Admin</strong> o <strong>Account Owner</strong> para generar una clave de API de facturación de Temporal Cloud. Los roles Metrics Read-Only y Account Admin no pueden acceder a la API de facturación.</div>

### 1. Generar una clave de API de facturación {#1-generate-a-billing-api-key}

1. En Temporal Cloud, navegue a **Settings > Service Accounts > Create Service Account**.
2. Asigne a la cuenta de servicio el rol de **Finance Admin** o **Account Owner**.
3. Genere una clave de API para la cuenta de servicio y cópiela en una ubicación segura. Temporal Cloud solo muestra la clave una vez.

### 2. Configure la integración de Datadog {#2-configure-the-datadog-integration-2}

1. En Datadog, vaya a [**Integrations > Temporal Cloud Cost Management**][110].
2. Haga clic en {{< ui >}}Install Integration{{< /ui >}}, luego haga clic en {{< ui >}}Configure{{< /ui >}}.
3. Haga clic en {{< ui >}}Add Account{{< /ui >}} y pegue la clave de API de facturación de Temporal Cloud.
4. Haga clic en {{< ui >}}Save{{< /ui >}}.

Después de guardar su configuración, Datadog comienza a consultar la API de facturación de Temporal Cloud usando esta clave y completa las métricas en su entorno. Sus datos de costos de Temporal Cloud pueden consultarse en Cloud Cost Management en un plazo de 25 a 30 horas. Para acceder a los datos disponibles recopilados por cada integración de costos SaaS, consulte la sección [Datos recopilados](#data-collected).

[110]: https://app.datadoghq.com/integrations/temporal-cloud-costs

{{% /tab %}}

{{% tab "GitHub" %}}

1. Cree un token de autorización personal (clásico), con los contextos `manage_billing:enterprise` y `read:org` en la página [Personal Access Tokens][109] en GitHub.
2. Vaya al [GitHub Costs tile][108] en Datadog.
3. Haga clic en {{< ui >}}Add New{{< /ui >}}.
4. Ingrese un nombre de cuenta, su token de acceso personal y su nombre de empresa (en formato `enterprise-name`), así como cualquier etiqueta apropiada.
5. Haga clic en el botón de marca de verificación para guardar esta cuenta.

Sus datos de costos de GitHub de los últimos 15 meses se pueden consultar en Cloud Cost Management en un plazo de 24 horas. Para acceder a los datos disponibles recopilados por cada integración de costos SaaS, consulte la sección [Datos recopilados](#data-collected).

{{< img src="cloud_cost/saas_costs/github_setup.png" alt="Intégrese con GitHub para recopilar datos de costos." style="width:100%" >}}

[108]: https://app.datadoghq.com/integrations/github-costs
[109]: https://github.com/settings/tokens

{{% /tab %}}

{{% tab "Confluent Cloud" %}}

1. Cree o adquiera una clave de API con el rol de [administrador de facturación][102] en Confluent Cloud.
2. Vaya al [mosaico de integración de Confluent Cloud][101] en Datadog y haga clic en {{< ui >}}Add Account{{< /ui >}}.
3. Ingrese el nombre de su cuenta de Confluent Cloud, la clave de API, el secreto de API y, opcionalmente, especifique etiquetas.
4. En la sección {{< ui >}}Resources{{< /ui >}}, haga clic en el interruptor de {{< ui >}}Collect cost data to view in Cloud Cost Management{{< /ui >}}.
5. Haga clic en {{< ui >}}Save{{< /ui >}}.

Sus datos de costos de Confluent Cloud estarán disponibles en Cloud Cost Management 24 horas después de la configuración. Estos datos incluyen automáticamente 12 meses de historial, el máximo proporcionado por la API de facturación de Confluent. Durante los próximos tres meses, los datos se expandirán gradualmente para cubrir 15 meses de historial. Para acceder a los datos disponibles recopilados por cada integración de costos SaaS, consulte la sección [Datos recopilados](#data-collected).

Si desea recopilar etiquetas a nivel de clúster o etiquetas de metadatos comerciales para sus costos, puede agregar una clave de API y un secreto de API de Schema Registry. Consulte [Schema Management on Confluent Cloud][103] para obtener más información.

{{< img src="cloud_cost/saas_costs/confluent_setup_1.png" alt="Intégrese con Confluent para recopilar datos de costos." style="width:100%" >}}

[101]: https://app.datadoghq.com/integrations/confluent-cloud
[102]: https://docs.confluent.io/cloud/current/security/access-control/rbac/predefined-rbac-roles.html#billingadmin-role
[103]: https://docs.confluent.io/cloud/current/get-started/schema-registry.html#quick-start-for-schema-management-on-ccloud

{{% /tab %}}
{{% tab "MongoDB" %}}

1. [Cree un token de API][101] en MongoDB con permisos `Organizational Billing Viewer` y agregue permisos `Organizational Read Only` para etiquetas de recursos de clúster.
2. Vaya al [mosaico de integración de MongoDB Cost Management][102] en Datadog y haga clic en {{< ui >}}Add New{{< /ui >}}.
3. Ingrese el nombre de su cuenta de MongoDB, clave pública, clave privada, ID de organización y, opcionalmente, especifique etiquetas.
4. Haga clic en {{< ui >}}Save{{< /ui >}}.

Sus datos de costos de MongoDB de los últimos 15 meses se pueden consultar en Cloud Cost Management después de 24 horas. Para acceder a los datos disponibles recopilados por cada integración de costos SaaS, consulte la sección [Datos recopilados](#data-collected).

{{< img src="cloud_cost/saas_costs/mongodb_setup.png" alt="Intégrese con MongoDB para recopilar datos de costos." style="width:100%" >}}

[101]: https://www.mongodb.com/docs/cloud-manager/reference/user-roles/#organization-roles
[102]: https://app.datadoghq.com/integrations/mongodb-cost-management

{{% /tab %}}

{{% tab "Elastic Cloud" %}}

1. Vaya a la sección [Clave de API][102] en la configuración de su organización de Elastic Cloud.
2. Haga clic en {{< ui >}}Create New Key{{< /ui >}}.
3. Elija un {{< ui >}}Name{{< /ui >}} y {{< ui >}}Expiration Date{{< /ui >}} para su clave de API.
4. Seleccione el rol {{< ui >}}Billing Admin{{< /ui >}}.
5. Haga clic en {{< ui >}}Create Key{{< /ui >}} para generar la clave.
6. Vaya al [Elastic Cloud integration tile][101] en Datadog
7. Haga clic en {{< ui >}}Add Account{{< /ui >}}.
8. Ingrese su {{< ui >}}Elastic Cloud Organization ID{{< /ui >}} y {{< ui >}}Billing API Key{{< /ui >}} en la tabla de cuentas.

Sus datos de costos de Elastic Cloud de los últimos 15 meses se pueden consultar en Cloud Cost Management después de 24 horas. Para acceder a los datos disponibles recopilados por cada integración de costos SaaS, consulte la sección [Datos recopilados](#data-collected).

{{< img src="cloud_cost/saas_costs/elasticcloud_setup.png" alt="Intégrese con Elastic Cloud para recopilar datos de costos." style="width:100%" >}}

[101]: https://app.datadoghq.com/integrations/elastic-cloud-ccm
[102]: https://cloud.elastic.co/account/keys

{{% /tab %}}

{{% tab "Fastly" %}}

1. Cree un token de API con al menos el contexto `"global:read"` y el rol `"Billing"` en la página [Personal API tokens][101] en Fastly.
2. Navegue al [mosaico de integración de Fastly cost management][102] en Datadog y haga clic en {{< ui >}}Add New{{< /ui >}}.
3. Ingrese el nombre de su cuenta de Fastly y el token de API.
4. Haga clic en {{< ui >}}Save{{< /ui >}}.

Sus datos de costos de Fastly de los últimos 15 meses se pueden consultar en Cloud Cost Management después de 24 horas. Para acceder a los datos disponibles recopilados por cada integración de costos SaaS, consulte la sección [Datos recopilados](#data-collected).

{{< img src="cloud_cost/saas_costs/fastly_setup_1.png" alt="Integre con Fastly para recopilar datos de costos." style="width:100%" >}}

[101]: https://manage.fastly.com/account/personal/tokens
[102]: https://app.datadoghq.com/integrations/fastly-cost-management

{{% /tab %}}
{{% tab "Twilio" %}}

1. Navegue al [mosaico de integración de Twilio][101] en Datadog y haga clic en {{< ui >}}Add Account{{< /ui >}}.
2. En la sección {{< ui >}}Resources{{< /ui >}}, haga clic en el interruptor de cada cuenta para habilitar `Twilio in Cloud Cost Management`.
3. Ingrese un {{< ui >}}Account SID{{< /ui >}} para su cuenta de Twilio.
4. Haga clic en {{< ui >}}Save{{< /ui >}}.

Sus datos de costos de Twilio de los últimos 15 meses se pueden consultar en Cloud Cost Management después de 24 horas. Para acceder a los datos disponibles recopilados por cada integración de costos SaaS, consulte la sección [Datos recopilados](#data-collected).

{{< img src="cloud_cost/saas_costs/twilio_setup.png" alt="Integre con Twilio para recopilar datos de costos." style="width:100%" >}}

[101]: https://app.datadoghq.com/integrations/twilio

{{% /tab %}}
{{< /tabs >}}

## Datos recopilados {#data-collected}

Puede ver los datos de costos en la [**página Cloud Cost Explorer**][3], el [Cloud Cost Tag Explorer][4], y en [dashboards][5], [notebooks][6] o [monitors][7]. También puede combinar estas métricas de Cloud Cost con [cloud cost metrics][2] u otras métricas de observabilidad.

La siguiente tabla contiene una lista no exhaustiva de etiquetas predeterminadas asociadas con cada integración de costos de SaaS.

{{< tabs >}}
{{% tab "Snowflake" %}}

<table>
  <thead>
    <tr>
      <th style="width: 200px;">Nombre de la etiqueta</th>
      <th>Descripción de la etiqueta</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>account_locator</code></td>
      <td>Localizador de la cuenta donde se consumió el uso.</td>
    </tr>
    <tr>
      <td><code>account_name</code></td>
      <td>Nombre de la cuenta donde se consumió el uso.</td>
    </tr>
    <tr>
      <td><code>balance_source</code></td>
      <td>Fuente de los fondos utilizados para pagar el uso diario. La fuente puede ser una de las siguientes:<br>- <b>capacity</b>: Uso pagado con créditos restantes del compromiso de capacidad de una organización.<br>- <b>rollover</b>: Uso pagado con créditos de renovación (rollover). Cuando una organización renueva un compromiso de capacidad, los créditos no utilizados se agregan al saldo del nuevo contrato como créditos de renovación.<br>- <b>free usage</b>: Uso cubierto por los créditos gratuitos proporcionados a la organización.<br>- <b>overage</b>: Uso que se pagó a precios bajo demanda, lo cual ocurre cuando una organización ha agotado sus créditos de capacidad, de renovación y gratuitos.<br>- <b>rebate</b>: Uso cubierto por los créditos otorgados a la organización cuando compartió datos con otra organización.</td>
    </tr>
    <tr>
      <td><code>billing_type</code></td>
      <td>Indica qué se está cobrando o acreditando. Los tipos de facturación posibles incluyen:<br>- <b>consumo</b>: Uso asociado con créditos de cómputo, costos de almacenamiento y costos de transferencia de datos.<br>- <b>rebate</b>: Uso cubierto por los créditos otorgados a la organización cuando compartió datos con otra organización.<br>- <b>soporte prioritario</b>: Cargos por servicios de soporte prioritario. Este cargo está asociado con una estipulación en un contrato, no con una cuenta.<br>- <b>tarifa_de_implementación_vps</b>: Cargos por una implementación de Virtual Private Snowflake.<br>- <b>crédito_de_soporte</b>: El soporte de Snowflake acreditó la cuenta para revertir los cargos atribuidos a un problema en Snowflake.</td>
    </tr>
    <tr>
      <td><code>charge_description</code></td>
      <td>Una descripción del tipo de costo asociado con partidas individuales distintas. Las descripciones difieren para cada tipo de costo, representado por la <code>servicename</code> etiqueta.</td>
    </tr>
    <tr>
      <td><code>contract_number</code></td>
      <td>Número de contrato de Snowflake para la organización.</td>
    </tr>
    <tr>
      <td><code>database_name</code></td>
      <td>Nombre de la base de datos en la que se ejecutó la consulta (si corresponde). Solo se encuentra para costos de <b>atribución de consulta</b>.</td>
    </tr>
    <tr>
      <td><code>organization_name</code></td>
      <td>Nombre de la organización.</td>
    </tr>
    <tr>
      <td><code>query_hash</code></td>
      <td>Hash único que representa una versión parametrizada de la consulta para fines de atribución. Solo se encuentra para costos de <b>atribución de consulta</b>.</td>
    </tr>
    <tr>
      <td><code>query_hash_version</code></td>
      <td>Versión del algoritmo de hash de consulta de Snowflake utilizado para generar <code>query_hash</code>. Solo se encuentra para costos de <b>atribución de consulta</b>.</td>
    </tr>
    <tr>
      <td><code>rating_type</code></td>
      <td>Indica cómo se califica o se fija el precio del uso en el registro. Los valores posibles incluyen:<br>- <b>cómputo</b><br>- <b>transferencia_de_datos</b><br>- <b>almacenamiento</b><br>- <b>Otro</b></td>
    </tr>
    <tr>
      <td><code>region</code></td>
      <td>Nombre de la región donde se encuentra la cuenta.</td>
    </tr>
    <tr>
      <td><code>service_level</code></td>
      <td>Nivel de servicio (edición) de la cuenta de Snowflake (Standard, Enterprise o Business Critical).</td>
    </tr>
    <tr>
      <td><code>servicename</code></td>
      <td>Tipo de uso. Los tipos de servicio posibles incluyen:<br>- <b>clustering_automático</b>: Consulte Clustering automático.<br>- <b>transferencia_de_datos</b>: Consulte Comprensión del costo de transferencia de datos.<br>- <b>registro</b>: Consulte Descripción general de registro y rastreo.<br>- <b>vista_materializada</b>: Consulte Trabajo con vistas materializadas.<br>- <b>replicación</b>: Consulte Introducción a la replicación y conmutación por error entre varias cuentas.<br>- <b>aceleración_de_consulta</b>: Consulte Uso del servicio de aceleración de consultas.<br>- <b>optimización_de_búsqueda</b>: Consulte Servicio de optimización de búsqueda.<br>- <b>tarea_sin_servidor</b>: Consulte Introducción a las tareas.<br>- <b>snowpipe</b>: Consulte Snowpipe.<br>- <b>snowpipe_streaming</b>: Consulte Snowpipe Streaming.<br>- <b>almacenamiento</b>: Consulte Comprensión del costo de almacenamiento.<br>- <b>atribución_de_consulta_de_medición_de_almacén</b>: Consulte Uso de créditos de almacén virtual de consultas con un tiempo de ejecución de 100 ms o más. No indica el uso de cómputo de servicios en la nube o sin servidor.<br>- <b>atribución_de_consulta_de_medición_de_almacén</b>: Consulte Uso de créditos de almacén virtual de consultas con un tiempo de ejecución de 100 ms o menos, así como el tiempo de inactividad del almacén. No indica el uso de cómputo de servicios en la nube o sin servidor.</td>
    </tr>
    <tr>
      <td><code>user_name</code></td>
      <td>Nombre del usuario o cuenta de servicio asociado con la consulta.</td>
    </tr>
    <tr>
      <td><code>warehouse_id</code></td>
      <td>Identificador del almacén que genera el costo.</td>
    </tr>
    <tr>
      <td><code>warehouse_name</code></td>
      <td>Nombre del almacén asociado con este uso.</td>
    </tr>
    <tr>
      <td><code>warehouse_size</code></td>
      <td>Tamaño del almacén (por ejemplo, Large, Medium).</td>
    </tr>
  </tbody>
</table>

{{% /tab %}}
{{% tab "Databricks" %}}

**Nota**: La integración de costos de Databricks calcula los costos utilizando precios de lista y datos de uso. No refleja ninguna tarifa negociada o con descuento.

<table>
  <thead>
    <tr>
      <th style="width: 220px;">Nombre de la etiqueta</th>
      <th>Descripción de la etiqueta</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>account_id</code></td>
      <td>ID de la cuenta para la cual se generó este informe.</td>
    </tr>
    <tr>
      <td><code>billing_origin_product</code></td>
      <td>Producto o característica que origina el evento de facturación (por ejemplo, JOBS, CLUSTERS).</td>
    </tr>
    <tr>
      <td><code>central_clean_room_id</code></td>
      <td>ID de la sala limpia central asociada con la carga de trabajo (si corresponde).</td>
    </tr>
    <tr>
      <td><code>charge_description</code></td>
      <td>Una combinación del tipo de nube y el nombre del SKU asociado (por ejemplo, AWS - PREMIUM_ALL_PURPOSE_COMPUTE).</td>
    </tr>
    <tr>
      <td><code>cloud</code></td>
      <td>Nube para la cual es relevante este uso. Los valores posibles son AWS, AZURE y GCP.</td>
    </tr>
    <tr>
      <td><code>cluster_id</code></td>
      <td>ID del clúster asociado con este uso.</td>
    </tr>
    <tr>
      <td><code>custom_tags</code></td>
      <td>Etiquetas personalizadas aplicadas al uso, generalmente como pares clave-valor para metadatos adicionales o categorización.</td>
    </tr>
    <tr>
      <td><code>destination_region</code></td>
      <td>Región donde se dirige la carga de trabajo (si corresponde).</td>
    </tr>
    <tr>
      <td><code>dlt_maintenance_id</code></td>
      <td>ID de mantenimiento para Delta Live Tables (si corresponde).</td>
    </tr>
    <tr>
      <td><code>dlt_pipeline_id</code></td>
      <td>ID del pipeline de Delta Live Tables (si corresponde).</td>
    </tr>
    <tr>
      <td><code>dlt_tier</code></td>
      <td>Nivel del servicio de Delta Live Tables (si corresponde).</td>
    </tr>
    <tr>
      <td><code>dlt_update_id</code></td>
      <td>ID de actualización de Delta Live Tables asociado con este uso (si corresponde).</td>
    </tr>
    <tr>
      <td><code>endpoint_id</code></td>
      <td>ID del punto de conexión para el uso basado en SQL o relacionado con el servicio (si corresponde).</td>
    </tr>
    <tr>
      <td><code>endpoint_name</code></td>
      <td>Nombre del SQL o del punto de conexión (si corresponde).</td>
    </tr>
    <tr>
      <td><code>instance_pool_id</code></td>
      <td>ID del instance pool utilizado (si corresponde).</td>
    </tr>
    <tr>
      <td><code>is_photon</code></td>
      <td>Indica si se utilizó el procesamiento Photon (<code>true</code> o <code>false</code>).</td>
    </tr>
    <tr>
      <td><code>is_serverless</code></td>
      <td>Indica si el uso pertenece a un recurso de cómputo sin servidor (<code>true</code> o <code>false</code>).</td>
    </tr>
    <tr>
      <td><code>job_id</code></td>
      <td>Identificador único para el trabajo en Databricks.</td>
    </tr>
    <tr>
      <td><code>job_name</code></td>
      <td>Nombre del trabajo en Databricks (si corresponde).</td>
    </tr>
    <tr>
      <td><code>job_run_id</code></td>
      <td>Identificador para la ejecución específica del trabajo (si corresponde).</td>
    </tr>
    <tr>
      <td><code>jobs_tier</code></td>
      <td>Nivel del trabajo, tal como <code>CLASSIC</code> o <code>PREMIUM</code>.</td>
    </tr>
    <tr>
      <td><code>networking</code></td>
      <td>Tipo de red utilizada para este trabajo, si se especifica.</td>
    </tr>
    <tr>
      <td><code>node_type</code></td>
      <td>Tipo de nodo utilizado en este registro de facturación (por ejemplo, m5d.large).</td>
    </tr>
    <tr>
      <td><code>notebook_id</code></td>
      <td>ID del notebook utilizado en este registro de facturación (si corresponde).</td>
    </tr>
    <tr>
      <td><code>notebook_path</code></td>
      <td>Ruta al notebook en Databricks (si corresponde).</td>
    </tr>
    <tr>
      <td><code>record_id</code></td>
      <td>ID único para este registro.</td>
    </tr>
    <tr>
      <td><code>run_name</code></td>
      <td>Nombre del trabajo o ejecución de flujo de trabajo actual (si corresponde).</td>
    </tr>
    <tr>
      <td><code>serving_type</code></td>
      <td>Tipo de modelo de servicio utilizado, si corresponde (por ejemplo, Model Serving).</td>
    </tr>
    <tr>
      <td><code>source_region</code></td>
      <td>Región de origen para este registro de facturación (si corresponde).</td>
    </tr>
    <tr>
      <td><code>sql_tier</code></td>
      <td>Nivel de SQL asociado con el uso (si corresponde).</td>
    </tr>
    <tr>
      <td><code>usage_metadata</code></td>
      <td>Metadatos relacionados con el uso, que podrían incluir detalles como el tipo de uso, la categoría del servicio u otra información relevante.</td>
    </tr>
    <tr>
      <td><code>usage_type</code></td>
      <td>Tipo de uso que se está facturando (por ejemplo, COMPUTE_TIME).</td>
    </tr>
    <tr>
      <td><code>warehouse_id</code></td>
      <td>ID del almacén de SQL (si corresponde).</td>
    </tr>
    <tr>
      <td><code>workspace_id</code></td>
      <td>ID del espacio de trabajo con el que se asoció este uso.</td>
    </tr>
  </tbody>
</table>

{{% /tab %}}

{{% tab "OpenAI" %}}

| Nombre de la etiqueta | Descripción de la etiqueta |
|---|---|
| `charge_description` | El nombre del modelo cuyos costos están asociados con el cargo. |
| `organization_id` | El identificador único de la organización. |
| `organization_name` | El nombre de la organización. |
| `project_id` | El identificador único del proyecto. |
| `project_name` | El nombre del proyecto. |

{{% /tab %}}

{{% tab "Anthropic" %}}

| Nombre de la etiqueta | Descripción de la etiqueta |
|---|---|
| `workspace_id` | El identificador único del espacio de trabajo de Anthropic. |
| `workspace_name` | Una versión normalizada por etiqueta del nombre del espacio de trabajo. |
| `display_workspace_name` | El nombre inalterado del espacio de trabajo. |
| `org_id` | El identificador único de la organización de Anthropic. |
| `org_name` | Una versión normalizada por etiqueta del nombre de la organización de Anthropic. |
| `display_org_name` | El nombre inalterado de la organización. |
| `org_type` | El tipo de cuenta de Anthropic (por ejemplo, `enterprise` o `platform`). |
| `model_id` | El identificador canónico del modelo de Anthropic (por ejemplo, `claude-3-opus-20240229`). |
| `model` | Un alias para `model_id`, proporcionado para compatibilidad y consistencia con el uso y las métricas. |
| `model_name` | El nombre descriptivo del modelo (por ejemplo, `Claude 3 Opus`). |
| `service_tier` | El plan o nivel de servicio de Anthropic asociado con el uso (por ejemplo, `standard`, `pro`, `enterprise`). |
| `token_type` | La categoría de tokens consumidos.|
| `context_window` | El tamaño de la ventana de contexto para los tokens (por ejemplo, `tier_0-200k`). |

{{% /tab %}}

{{% tab "Cursor" %}}

| Nombre de la etiqueta | Descripción de la etiqueta |
|---|---|
| `billing_group` | El grupo de facturación dentro de la organización de Cursor al que se atribuye el uso. |
| `charge_type` | La categoría del cargo de Cursor (por ejemplo, `fast_premium`, `slow_premium`). |
| `hour` | La hora durante la cual se registró el uso, en UTC. |
| `is_headless` | Indica si el uso fue generado por una sesión sin interfaz, como un agente en segundo plano que se ejecuta fuera del editor de Cursor (`true` o `false`). |
| `max_mode` | Indica si la solicitud utilizó Cursor Max, que enruta las consultas a modelos de vanguardia a un costo mayor (`true` o `false`). |
| `user` | La dirección de correo electrónico del usuario de Cursor que incurrió en el costo. |

{{% /tab %}}

{{% tab "Temporal Cloud" %}}

**Nota**: Las etiquetas de espacio de nombres personalizadas configuradas en Temporal Cloud se muestran como etiquetas `temporal_tag_<key>` dinámicas (por ejemplo, un espacio de nombres etiquetado como `tmprl_project` aparece como `temporal_tag_tmprl_project`).

| Nombre de la etiqueta | Descripción de la etiqueta |
|---|---|
| `namespace` | El espacio de nombres de Temporal Cloud al que se atribuye el uso (por ejemplo, `replay-2025`). |
| `billing_account` | La cuenta de facturación de Temporal Cloud asociada con el cargo. |
| `billing_account_id` | El identificador único de la cuenta de facturación de Temporal Cloud. |
| `resource_type` | El tipo de recurso que genera el uso (por ejemplo, `Namespace`). |
| `service_subcategory` | La categoría de uso que genera el cargo (por ejemplo, `Actions`, `Active Storage`, `Retained Storage`). |
| `sku_id` | El identificador único del SKU de Temporal Cloud asociado con el cargo (por ejemplo, `business-actions`, `business-active-storage`). |
| `sku_meter` | El medidor de SKU de Temporal Cloud utilizado para calcular el cargo (por ejemplo, `Actions`, `Active Storage`, `Retained Storage`). |
| `charge_category` | La categoría del cargo de Temporal Cloud (por ejemplo, `usage`). |
| `pricing_unit` | La unidad utilizada para fijar el precio del cargo (por ejemplo, `GB/h`, `1 Million Actions`). |
| `usage_unit` | La unidad de uso medida para el cargo (por ejemplo, `GB/h`, `1 Million Actions`). |
| `unit_price` | El precio por unidad de uso. |
| `invoice_id` | El identificador único de la factura de Temporal Cloud asociada con el cargo. |

{{% /tab %}}

{{% tab "GitHub" %}}

**Nota**: La integración de costos de GitHub estima los costos según los precios de lista y los datos de uso, e incluye los valores de descuento cuando están disponibles. No tiene en cuenta ninguna tarifa negociada.

| Nombre de la etiqueta | Descripción de la etiqueta |
|---|---|
| `enterprise_name` | Cadena alfanumérica que identifica la cuenta empresarial de GitHub. |
| `charge_description` | La descripción del cargo. |
| `product` | El producto de uso, por ejemplo "actions" o "storage". |
| `organization_name` | La organización de GitHub. |
| `repository_name` | El repositorio de GitHub. |
| `billing_currency` | La moneda de facturación, por ejemplo "USD". |
| `discount` | Si el elemento de costo es un descuento. |

{{% /tab %}}

{{% tab "Confluent Cloud" %}}

<table>
  <thead>
    <tr>
      <th style="width: 200px;">Nombre de la etiqueta</th>
      <th>Descripción de la etiqueta</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>charge_description</code></td>
      <td>El subtipo del costo (por ejemplo, KAFKA_NETWORK_WRITE).</td>
    </tr>
    <tr>
      <td><code>environment_id</code></td>
      <td>El identificador único del entorno.</td>
    </tr>
    <tr>
      <td><code>network_access_type</code></td>
      <td>Tipo de acceso a la red para el clúster. Los valores posibles son <code>INTERNET</code>, <code>TRANSIT_GATEWAY</code>, <code>PRIVATE_LINK</code>, y <code>PEERED_VPC</code>.</td>
    </tr>
    <tr>
      <td><code>product</code></td>
      <td>Nombre del producto. Los valores posibles incluyen <code>KAFKA</code>, <code>CONNECT</code>, <code>KSQL</code>, <code>AUDIT_LOG</code>, <code>STREAM_GOVERNANCE</code>, <code>CLUSTER_LINK</code>, <code>CUSTOM_CONNECT</code>, <code>FLINK</code>, <code>SUPPORT_CLOUD_BASIC</code>, <code>SUPPORT_CLOUD_DEVELOPER</code>, <code>SUPPORT_CLOUD_BUSINESS</code>, y <code>SUPPORT_CLOUD_PREMIER</code>.</td>
    </tr>
    <tr>
      <td><code>resource_id</code></td>
      <td>El identificador único del recurso de Confluent.</td>
    </tr>
    <tr>
      <td><code>resource_name</code></td>
      <td>El nombre del recurso de Confluent.</td>
    </tr>
  </tbody>
</table>

{{% /tab %}}

{{% tab "Elastic Cloud" %}}

| Nombre de la etiqueta | Descripción de la etiqueta |
|---|---|
| `charge_description` | La SKU de un cargo. |
| `kind` | El tipo de recurso. |
| `name` | El identificador único del recurso de Elastic Cloud. |
| `price_per_hour` | El costo del recurso de Elastic Cloud por hora. |

{{% /tab %}}
{{% tab "MongoDB" %}}

| Nombre de la etiqueta | Descripción de la etiqueta |
|---|---|
| `charge_description` | La descripción de un cargo. |
| `cluster_name` | El nombre del clúster que incurrió en el cargo. |
| `group_id` | ID del proyecto con el que está asociada la partida. |
| `invoice_id` | El identificador único de la factura. |
| `mongo_org_id` | ID de la organización de MongoDB. |
| `replica_set_name` | Nombre del conjunto de réplicas con el que está asociado el artículo de línea. |
| `resource_tags` | Etiquetas arbitrarias en los clústeres establecidas por los usuarios, generalmente como pares clave-valor. |
| `status` | Estado del pago. |

{{% /tab %}}

{{% tab "Fastly" %}}

<table>
  <thead>
    <tr>
      <th style="width: 200px;">Nombre de la etiqueta</th>
      <th>Descripción de la etiqueta</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>charge_description</code></td>
      <td>La descripción del cargo.</td>
    </tr>
    <tr>
      <td><code>credit_coupon_code</code></td>
      <td>Código de cualquier cupón o crédito aplicado a esta entrada de costo (si está disponible).</td>
    </tr>
    <tr>
      <td><code>plan_name</code></td>
      <td>Nombre del plan bajo el cual cae este servicio, que a menudo coincide con "product_line".</td>
    </tr>
    <tr>
      <td><code>product_name</code></td>
      <td>Nombre del producto específico que se está facturando (por ejemplo, "North America Bandwidth").</td>
    </tr>
    <tr>
      <td><code>product_group</code></td>
      <td>Grupo o categoría del producto, como "Full Site Delivery".</td>
    </tr>
    <tr>
      <td><code>product_line</code></td>
      <td>Línea de productos a la que pertenece este artículo, por ejemplo, "Network Services".</td>
    </tr>
    <tr>
      <td><code>region</code></td>
      <td>Región donde ocurrió el uso del servicio (por ejemplo, "North America").</td>
    </tr>
    <tr>
      <td><code>service_name</code></td>
      <td>Nombre del servicio asociado con esta entrada de costo, que a menudo coincide con el <code>product_name</code>.</td>
    </tr>
    <tr>
      <td><code>usage_type</code></td>
      <td>Tipo de uso que se está facturando (por ejemplo, "Bandwidth").</td>
    </tr>
    <tr>
      <td><code>usage_type_cd</code></td>
      <td>Código o etiqueta que representa el tipo de uso, como "North America Bandwidth".</td>
    </tr>
  </tbody>
</table>

{{% /tab %}}
{{% tab "Twilio" %}}

<table>
  <thead>
    <tr>
      <th style="width: 200px;">Nombre de la etiqueta</th>
      <th>Descripción de la etiqueta</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>account_sid</code></td>
      <td>Cadena alfanumérica que identifica la cuenta de Twilio.</td>
    </tr>
    <tr>
      <td><code>category</code></td>
      <td>La categoría de uso. Para obtener más información, consulte <a href="https://www.twilio.com/docs/usage/api/usage-record#usage-categories" target="_blank">Usage Categories</a>.</td>
    </tr>
    <tr>
      <td><code>charge_description</code></td>
      <td>La descripción del cargo.</td>
    </tr>
    <tr>
      <td><code>count_unit</code></td>
      <td>Las unidades en las que se mide el conteo, como llamadas para llamadas o mensajes para SMS.</td>
    </tr>
    <tr>
      <td><code>usage_unit</code></td>
      <td>Las unidades en las que se mide el uso, como minutos para llamadas o mensajes para SMS.</td>
    </tr>
  </tbody>
</table>

[101]: https://www.twilio.com/docs/usage/api/usage-record#usage-categories

{{% /tab %}}
{{< /tabs >}}

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/cloud_cost_management/setup/custom
[2]: /es/cloud_cost_management
[3]: https://app.datadoghq.com/cost/explorer
[4]: https://app.datadoghq.com/cost/tags?cloud=custom
[5]: /es/dashboards
[6]: /es/notebooks
[7]: /es/monitors/types/cloud_cost
[8]: https://app.datadoghq.com/cost/settings/accounts