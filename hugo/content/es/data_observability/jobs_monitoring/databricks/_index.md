---
aliases:
- /es/data_jobs/databricks
description: 'Habilite Data Observability: Jobs Monitoring para espacios de trabajo
  de Databricks con autenticación OAuth o token de acceso personal e instalación de
  Datadog Agent.'
further_reading:
- link: /data_jobs
  tag: Documentación
  text: 'Data Observability: Jobs Monitoring'
- link: https://www.datadoghq.com/blog/databricks-serverless-jobs-datadog/
  tag: Blog
  text: Detecte problemas y optimice el gasto con Jobs Monitoring sin servidor de
    Databricks
title: 'Habilite Data Observability: Jobs Monitoring para Databricks'
---
[Data Observability: Jobs Monitoring][7] brinda visibilidad sobre el rendimiento y la confiabilidad de sus trabajos y flujos de trabajo de Databricks que se ejecutan en clústeres o cómputo sin servidor.

## Configuración {#setup}

<div class="alert alert-info">Si su espacio de trabajo de Databricks tiene habilitadas las <a href="https://docs.databricks.com/en/security/network/front-end/index.html">restricciones de red</a>, agregue el de Datadog {{< region-param key="ip_ranges_url_webhooks" link="true" text="webhook IP ranges" >}} a su lista de permitidos. Si su espacio de trabajo utiliza Private Link, consulte la pestaña <strong>Conectividad de Private Link</strong> a continuación.</div>

Siga estos pasos para habilitar Data Observability: Jobs Monitoring para Databricks.

1. [Configure la integración de Datadog-Databricks](#configure-the-datadog-databricks-integration) para un espacio de trabajo de Databricks.
1. [Instale Datadog Agent](#install-the-datadog-agent) en sus clústeres de Databricks en el espacio de trabajo.


### Configure la integración de Datadog-Databricks {#configure-the-datadog-databricks-integration}

{{< tabs >}}

{{% tab "Utilice una entidad de servicio para OAuth" %}}

<div class="alert alert-danger">Las nuevas integraciones de espacios de trabajo deben autenticarse mediante OAuth. Los espacios de trabajo ya integrados con un token de acceso personal siguen funcionando y pueden cambiar a OAuth en cualquier momento. Después de que un espacio de trabajo comience a usar OAuth, no puede volver a un token de acceso personal.</div>

#### Cree y configure la entidad de servicio en Databricks {#create-and-configure-the-service-principal-in-databricks}

1. Como **administrador del espacio de trabajo de Databricks**, vaya a {{< ui >}}Settings{{< /ui >}} haciendo clic en su perfil en la esquina superior derecha del espacio de trabajo.
1. En la pestaña {{< ui >}}Identity and access{{< /ui >}}, haga clic en {{< ui >}}Manage{{< /ui >}} junto a {{< ui >}}Service principals{{< /ui >}}.
1. Haga clic en {{< ui >}}Add service principal{{< /ui >}}, luego haga clic en {{< ui >}}Add new{{< /ui >}}.

   <div class="alert alert-warning">Para Azure Databricks, seleccione el tipo de administración "Databricks managed". Datadog NO admite entidades de servicio "Microsoft Entra ID managed".</div>
1. Ingrese un nombre y habilite los siguientes derechos de espacio de trabajo para la entidad de servicio:
   - {{< ui >}}Workspace access{{< /ui >}}
   - {{< ui >}}Databricks SQL access{{< /ui >}}
   - {{< ui >}}Admin access{{< /ui >}}: Otorga el acceso de administrador del espacio de trabajo que requiere Datadog. Esto equivale a agregar la entidad de servicio al grupo `admins`.

   <div class="alert alert-info">Si no puede otorgar el derecho de <strong>Acceso de administrador</strong>, proporcione acceso granular en su lugar, como se describe en la sección <a href="#permissions">Permisos</a> en Configuración avanzada.</div>
1. Haga clic en **Agregar**.

1. Haga clic en el nombre de su nueva entidad de servicio. En la pestaña {{< ui >}}Secrets{{< /ui >}}, haga clic en {{< ui >}}Generate secret{{< /ui >}}.
   1. Establezca {{< ui >}}Lifetime (days){{< /ui >}} en el valor máximo permitido (730).

   1. Haga clic en {{< ui >}}Generate{{< /ui >}}.

   1. Tome nota de su ID de cliente y secreto de cliente.

  {{< img src="data_jobs/databricks/client-id-secret.png" alt="En Databricks, se muestra un modal que indica el ID de cliente y el secreto asociados con un nuevo secreto de OAuth." style="width:70%;" >}}

1. En la pestaña {{< ui >}}Permissions{{< /ui >}}, haga clic en {{< ui >}}Grant access{{< /ui >}}. Busque la nueva entidad de servicio, asígnele el permiso {{< ui >}}Manage{{< /ui >}} y haga clic en {{< ui >}}Save{{< /ui >}}.

#### Agregue el espacio de trabajo de Databricks a Datadog {#add-the-databricks-workspace-to-datadog}

1. En Datadog, abra el mosaico de integración de Databricks.
1. En la pestaña {{< ui >}}Configure{{< /ui >}}, haga clic en {{< ui >}}Add Databricks Workspace{{< /ui >}}.
1. Ingrese un nombre de espacio de trabajo, la URL de su espacio de trabajo de Databricks y el ID de cliente y el secreto que generó.
   {{< img src="data_jobs/databricks/connect-workspace-form-m2m.png" alt="En el mosaico de integración de Datadog-Databricks, se muestra un espacio de trabajo de Databricks. Este espacio de trabajo tiene un nombre, una URL, un ID de cliente y un secreto de cliente." style="width:100%;" >}}
1. Proporcione el ID de un [Databricks SQL Warehouse][19] para que Datadog realice consultas. Esto le brinda visibilidad de sus costos de Databricks en Jobs Monitoring o [Cloud Cost Management][18] y potencia [Quality Monitoring][21].
   1. En Databricks, vaya a {{< ui >}}SQL Warehouses{{< /ui >}} y seleccione el almacén que Datadog debe usar. Debe ser Pro o Serverless. Los almacenes Classic no son compatibles. Para reducir costos, utilice un almacén 2XS dedicado, con Auto Stop configurado de 5 a 10 minutos.
   1. Copie el ID de la página de descripción general del almacén (también es el último segmento de la URL del almacén) e ingréselo en el mosaico de integración.
   1. En la pestaña {{< ui >}}Permissions{{< /ui >}} del almacén (arriba a la derecha), otorgue a la entidad de servicio `CAN USE`.
   1. Otorgue a la entidad de servicio acceso de lectura a las [tablas del sistema][20] de Unity Catalog. En {{< ui >}}SQL Editor{{< /ui >}}, ejecute los siguientes comandos utilizando el ID de cliente de la entidad de servicio (no su nombre para mostrar):

      ```sql
      GRANT USE CATALOG ON CATALOG system TO `<CLIENT-ID>`;
      GRANT USE SCHEMA ON CATALOG system TO `<CLIENT-ID>`;
      GRANT SELECT ON CATALOG system TO `<CLIENT-ID>`;
      ```

      <div class="alert alert-info">El usuario que ejecuta estos comandos debe tener el <code>MANAGE</code> privilegio en <code>CATALOG system</code>.</div>
1. En la sección **Seleccionar productos para configurar la integración**, asegúrese de que Data Observability: Jobs Monitoring esté {{< ui >}}Enabled{{< /ui >}}.
1. En la sección {{< ui >}}Datadog Agent Setup{{< /ui >}}, elija entre
    - [Managed by Datadog (recommended)](?tab=datadogmanagedglobalinitscriptrecommended#install-the-datadog-agent): Datadog instala y administra el Datadog Agent con un script de inicio global en el espacio de trabajo.
    - [Manually](?tab=manuallyinstallaglobalinitscript#install-the-datadog-agent): Siga las [instrucciones a continuación](?tab=manuallyinstallaglobalinitscript#install-the-datadog-agent) para instalar y administrar el script de inicio para instalar el Datadog Agent globalmente o en clústeres de Databricks específicos.

[18]: https://docs.datadoghq.com/es/cloud_cost_management/
[19]: https://docs.databricks.com/aws/en/compute/sql-warehouse/
[20]: https://docs.databricks.com/aws/en/admin/system-tables/
[21]: /es/data_observability/quality_monitoring/data_warehouses/databricks/

{{% /tab %}}

{{% tab "Conectividad de Private Link" %}}

Si su espacio de trabajo de Databricks está implementado usando [Private Link Connectivity][25], Datadog no puede acceder a las API de Databricks directamente. Esto requiere el uso de un [Private Action Runner][26] implementado en su entorno.

Consulte [Private Link Connectivity (Preview)][15] para obtener las instrucciones de configuración completas.

[15]: /es/data_observability/jobs_monitoring/databricks/private_link
[25]: https://docs.databricks.com/aws/en/security/network/front-end/front-end-private-connect
[26]: https://docs.datadoghq.com/es/actions/private_actions/

{{% /tab %}}

{{% tab "Usar un token de acceso personal (heredado)" %}}

<div class="alert alert-danger">Esta opción solo está disponible para integraciones de espacio de trabajo creadas antes del 7 de julio de 2025. Las nuevas integraciones de espacio de trabajo deben autenticarse mediante OAuth.</div>

1. En su espacio de trabajo de Databricks, haga clic en su perfil en la esquina superior derecha y vaya a {{< ui >}}Settings{{< /ui >}}. Seleccione {{< ui >}}Developer{{< /ui >}} en la barra lateral izquierda. Junto a {{< ui >}}Access tokens{{< /ui >}}, haga clic en {{< ui >}}Manage{{< /ui >}}.
1. Haga clic en {{< ui >}}Generate new token{{< /ui >}}, ingrese \"Datadog Integration\" en el campo {{< ui >}}Comment{{< /ui >}}, establezca el valor {{< ui >}}Lifetime (days){{< /ui >}} al máximo permitido (730 días) y cree un recordatorio para actualizar el token antes de que caduque. Luego haga clic en {{< ui >}}Generate{{< /ui >}}. Tome nota de su token.

   **Importante:**
   * Para la [instalación del script de inicio administrado por Datadog (recomendado)](?tab=datadogmanagedglobalinitscriptrecommended#install-the-datadog-agent), asegúrese de que la entidad de servicio del token sea un <strong>Workspace Admin</strong>.
   * Para la instalación manual del script de inicio, asegúrese de que la entidad de servicio del token tenga [CAN VIEW access][9] para los trabajos y clústeres de Databricks que desea hacer un seguimiento.

   Como alternativa, siga la [documentación oficial de Databricks][10] para generar un token de acceso para un [service principal][11]. La entidad de servicio debe tener habilitado el derecho de [<strong>Workspace access</strong> entitlement][17] y los permisos de <strong>Workspace Admin</strong> o [CAN VIEW access][9] como se describió anteriormente.
1. En Datadog, abra el mosaico de integración de Databricks.
1. En la pestaña {{< ui >}}Configure{{< /ui >}}, haga clic en {{< ui >}}Add Databricks Workspace{{< /ui >}}.
1. Ingrese un nombre de espacio de trabajo, la URL de su espacio de trabajo de Databricks y el token de Databricks que generó.
   {{< img src="data_jobs/databricks/configure-workspace-form.png" alt="En el mosaico de integración de Datadog-Databricks, se muestra un espacio de trabajo de Databricks. Este espacio de trabajo tiene un nombre, una URL y un token de API." style="width:100%;" >}}
1. Proporcione el ID de un [Databricks SQL Warehouse][19] para que Datadog realice consultas. Esto le brinda visibilidad de sus costos de Databricks en Jobs Monitoring o [Cloud Cost Management][18] y potencia [Quality Monitoring][21].
   1. En Databricks, vaya a {{< ui >}}SQL Warehouses{{< /ui >}} y seleccione el almacén que Datadog debe usar. Debe ser Pro o Serverless. Los almacenes Classic no son compatibles. Para reducir costos, utilice un almacén 2XS dedicado, con Auto Stop configurado de 5 a 10 minutos.
   1. Copie el ID de la página de descripción general del almacén (también es el último segmento de la URL del almacén) e ingréselo en el mosaico de integración.
   1. En la pestaña {{< ui >}}Permissions{{< /ui >}} del almacén (arriba a la derecha), otorgue al principal del token `CAN USE`.
   1. Otorgue al principal del token acceso de lectura a las [tablas del sistema][20] de Unity Catalog. En {{< ui >}}SQL Editor{{< /ui >}}, ejecute los siguientes comandos utilizando el ID de cliente del principal (no su nombre para mostrar):

      ```sql
      GRANT USE CATALOG ON CATALOG system TO `<CLIENT-ID>`;
      GRANT USE SCHEMA ON CATALOG system TO `<CLIENT-ID>`;
      GRANT SELECT ON CATALOG system TO `<CLIENT-ID>`;
      ```

      <div class="alert alert-info">El usuario que ejecuta estos comandos debe tener el <code>MANAGE</code> privilegio en <code>CATALOG system</code>.</div>
1. En la sección **Seleccionar productos para configurar la integración**, asegúrese de que el producto Data Observability: Jobs Monitoring esté **Habilitado**.
1. En la sección {{< ui >}}Datadog Agent Setup{{< /ui >}}, elija entre
    - [Managed by Datadog (recommended)](?tab=datadogmanagedglobalinitscriptrecommended#install-the-datadog-agent): Datadog instala y administra el Datadog Agent con un script de inicio global en el espacio de trabajo.
    - [Manually](?tab=manuallyinstallaglobalinitscript#install-the-datadog-agent): Siga las [instrucciones a continuación](?tab=manuallyinstallaglobalinitscript#install-the-datadog-agent) para instalar y administrar el script de inicio para instalar el Datadog Agent globalmente o en clústeres de Databricks específicos.

[9]: https://docs.databricks.com/en/security/auth-authz/access-control/index.html#job-acls
[10]: https://docs.databricks.com/en/admin/users-groups/service-principals.html#manage-personal-access-tokens-for-a-service-principal
[11]: https://docs.databricks.com/en/admin/users-groups/service-principals.html#what-is-a-service-principal
[17]: https://docs.databricks.com/aws/en/security/auth/entitlements#entitlements-overview
[18]: https://docs.datadoghq.com/es/cloud_cost_management
[19]: https://docs.databricks.com/aws/en/compute/sql-warehouse/
[20]: https://docs.databricks.com/aws/en/admin/system-tables/
[21]: /es/data_observability/quality_monitoring/data_warehouses/databricks/


{{% /tab %}}

{{< /tabs >}}

### Instale el Datadog Agent {#install-the-datadog-agent}

El Datadog Agent debe instalarse en los clústeres de Databricks para hacer un seguimiento de los trabajos de Databricks que se ejecutan en clústeres de uso general o de trabajo. Este paso no es necesario para hacer un seguimiento de los trabajos en [cómputo sin servidor][4].

{{< tabs >}}
{{% tab "Script de inicialización global administrado por Datadog (Recomendado)" %}}

Datadog puede instalar y administrar un script de inicialización global en el espacio de trabajo de Databricks. El Datadog Agent se instala en todos los clústeres del espacio de trabajo cuando se inician.

<div class="alert alert-danger">
<ul>
<li>Esta configuración no funciona en clústeres de Databricks en modo de acceso <strong>Standard</strong>, porque los scripts de inicialización globales no se pueden instalar en esos clústeres. Si utiliza clústeres con el modo de acceso <strong>Standard</strong>, Datadog recomienda <a href="?tab=manuallyconfigureaclusterpolicy#install-the-datadog-agent">configurar manualmente una política de clúster</a> en varios clústeres o <a href="?tab=manuallyinstallonaspecificcluster#install-the-datadog-agent">instalar manualmente en un clúster específico</a>.</li>
<li>Esta opción de instalación, en la que Datadog instala y administra su script de inicialización global de Datadog, requiere un token de acceso de Databricks con permisos de <strong>Workspace Admin</strong>. Un token con acceso CAN VIEW no permite que Datadog administre el script de inicialización global de su cuenta de Databricks.</li>
</ul>
</div>

#### Al integrar un espacio de trabajo con Datadog {#when-integrating-a-workspace-with-datadog}

1. En la sección **Seleccionar productos para configurar la integración**, asegúrese de que el producto Data Observability: Jobs Monitoring esté **Habilitado**.
1. En la sección {{< ui >}}Datadog Agent Setup{{< /ui >}}, seleccione el botón de alternancia {{< ui >}}Managed by Datadog{{< /ui >}}.
1. Haga clic en {{< ui >}}Select API Key{{< /ui >}} para seleccionar una clave de Datadog API existente o crear una nueva clave de API de Datadog.
1. (Opcional) Deshabilite {{< ui >}}Enable Log Collection{{< /ui >}} si no desea recopilar registros de controladores y trabajadores para correlacionarlos con los trabajos.
1. Haga clic en {{< ui >}}Save Databricks Workspace{{< /ui >}}.
   {{< img src="data_jobs/databricks/configure-data-jobs-monitoring-new-2.png" alt="En el mosaico de integración de Datadog-Databricks, Datadog Agent Setup al agregar un espacio de trabajo de Databricks. Datadog puede instalar y administrar un script de inicialización global." style="width:100%;" >}}

#### Al agregar el script de inicialización a un espacio de trabajo de Databricks ya integrado con Datadog {#when-adding-the-init-script-to-a-databricks-workspace-already-integrated-with-datadog}

1. En la pestaña **Configurar**, haga clic en el espacio de trabajo en la lista de espacios de trabajo
1. Haga clic en la pestaña {{< ui >}}Configured Products{{< /ui >}}
1. Asegúrese de que el producto Data Observability: Jobs Monitoring esté **Habilitado**.
1. En la sección {{< ui >}}Datadog Agent Setup{{< /ui >}}, seleccione el botón de alternancia {{< ui >}}Managed by Datadog{{< /ui >}}.
1. Haga clic en {{< ui >}}Select API Key{{< /ui >}} para seleccionar una clave de Datadog API existente o crear una nueva clave de API de Datadog.
1. (Opcional) Deshabilite {{< ui >}}Enable Log Collection{{< /ui >}} si no desea recopilar registros de controladores y trabajadores para correlacionarlos con los trabajos.
1. Haga clic en **Save Databricks Workspace** en la parte inferior de la ventana del navegador.
   {{< img src="data_jobs/databricks/configure-data-jobs-monitoring-existing.png" alt="En el mosaico de integración de Datadog-Databricks, Datadog Agent Setup para un espacio de trabajo de Databricks ya agregado a la integración. Datadog puede instalar y administrar un script de inicialización global." style="width:100%;" >}}

Opcionalmente, puede agregar etiquetas a su clúster de Databricks y a las métricas de rendimiento de Spark configurando la siguiente variable de entorno en la sección {{< ui >}}Advanced Configuration{{< /ui >}} de su clúster en la interfaz de usuario de Databricks o como [variables de entorno de Spark][2] con la API de Databricks:

| Variable                 | Descripción                                                                                                                                                      |
|--------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| DD_TAGS                  | Agregue etiquetas al clúster de Databricks y a las métricas de rendimiento de Spark. Pares clave:valor separados por comas o espacios. Siga las [convenciones de etiqueta de Datadog][1]. Por ejemplo: `env:staging,team:data_engineering` |
| DD_ENV                   | Anule la etiqueta `env` de entorno en las métricas, trazas y registros de este clúster. De forma predeterminada, se utiliza el nombre del espacio de trabajo de Databricks como env.|
| DD_LOGS_CONFIG_PROCESSING_RULES | Filtre los registros recopilados con reglas de procesamiento. Consulte [Recopilación avanzada de registros][3] para obtener más detalles. |


[1]: /es/getting_started/tagging/
[2]: https://docs.databricks.com/api/workspace/clusters/edit#spark_env_vars
[3]: /es/agent/logs/advanced_log_collection/?tab=environmentvariable#global-processing-rules
[4]: https://docs.databricks.com/aws/en/compute/serverless/

{{% /tab %}}

{{% tab "Configure manualmente una política de clúster" %}}

Este enfoque se recomienda para clústeres en modo de acceso **Standard**.

**Cree el script de inicio**

1. En Databricks, cree un archivo de script de inicio en un [volumen de Unity Catalog][26] con el siguiente contenido. Asegúrese de anotar la ruta del volumen (por ejemplo, `/Volumes/catalog_name/schema_name/volume_name/datadog-init-script.sh`).

    ```shell
    #!/bin/bash

    # Download and run the latest init script
    curl -L https://install.datadoghq.com/scripts/install-databricks.sh > djm-install-script
    bash djm-install-script || true
    ```

    The script above downloads and runs the latest init script for Data Observability: Jobs Monitoring in Databricks. If you want to pin your script to a specific version, you can replace the filename in the URL with `install-databricks-0.14.0.sh` to use version `0.14.0`, for example. The source code used to generate this script, and the changes between script versions, can be found on the [Datadog Agent repository][3].

1. Otorgue permisos de solo lectura al script de inicio:
    1. A nivel de volumen, otorgue el permiso `READ VOLUME` a todos los usuarios de la cuenta.
    1. A nivel de catálogo, otorgue el permiso `USE CATALOG` a todos los usuarios de la cuenta.

   <div class="alert alert-info">Databricks evalúa los permisos de volumen de Unity Catalog con respecto al <strong>propietario del clúster</strong>, no al principal que ejecuta el clúster.</div>

1. **Agregue el script de inicio a la lista de permitidos**: Para clústeres en modo de acceso **Standard**, debe agregar la ruta del script de inicio a la lista de permitidos de Unity Catalog. Siga las instrucciones en la [documentación de Databricks][27] para agregar la ruta de su script de inicio a la lista de permitidos.

**Configure la política de cómputo**

1. En {{< ui >}}Compute{{< /ui >}}, navegue a la pestaña {{< ui >}}Policies{{< /ui >}}. Si ya tiene una política de clúster aplicada a sus clústeres, navegue a esa política existente para editarla. Este es el enfoque más sencillo, ya que la política se aplica automáticamente a todos los clústeres que la utilizan. De lo contrario, haga clic en {{< ui >}}Create Policy{{< /ui >}} para crear una nueva política.
1. Para agregar el script de inicio a la política de clúster, en la sección {{< ui >}}Definition{{< /ui >}}, haga clic en {{< ui >}}Add Definition{{< /ui >}}. En el modal que se abre, complete los campos:
   1. En el menú desplegable {{< ui >}}Field{{< /ui >}}, seleccione {{< ui >}}init_scripts{{< /ui >}}.
   1. En el menú desplegable {{< ui >}}Source{{< /ui >}}, seleccione {{< ui >}}Volume{{< /ui >}}.
   1. En {{< ui >}}Destination{{< /ui >}}, ingrese la ruta del volumen a su script de inicio.
   1. Haga clic en {{< ui >}}Add{{< /ui >}}.
1. Configure las variables de entorno. Debe agregar cada una de las siguientes variables de entorno a la política de clúster que creó:

   | Clave                  | Descripción                  |
   |----------------------|------------------------------|
   | DD_API_KEY           | Su [clave de Datadog API][1].   |
   | DD_SITE              | Su [Datadog site][2].      |
   | DATABRICKS_WORKSPACE | Nombre de su Databricks Workspace. Debe coincidir con el nombre proporcionado en el [paso de integración de Datadog-Databricks](#configure-the-datadog-databricks-integration). |

   1. Para cada una de las variables anteriores, en la sección {{< ui >}}Definition{{< /ui >}}, haga clic en {{< ui >}}Add Definition{{< /ui >}}. En el modal que se abre, complete los campos:
       1. En el menú desplegable {{< ui >}}Field{{< /ui >}}, seleccione {{< ui >}}spark_env_vars{{< /ui >}}.
       1. En el campo {{< ui >}}Key{{< /ui >}}, ingrese la clave de la variable de entorno.
       1. En el campo {{< ui >}}Value{{< /ui >}}, ingrese el valor de la variable de entorno.
       1. En el menú desplegable {{< ui >}}Type{{< /ui >}}, seleccione {{< ui >}}Fixed{{< /ui >}}.
       1. Marque la casilla de verificación {{< ui >}}Hidden{{< /ui >}} para reducir la exposición de valores confidenciales.
   1. Opcionalmente, establezca otros parámetros del script de inicio y variables de entorno de Datadog, como `DD_ENV` y `DD_SERVICE`. Puede configurar el script utilizando los siguientes parámetros:

      | Variable                 |  Descripción                                                                                                                                                      |  Predeterminado |
      |--------------------------| ------------------------------------------------------------------------------------------------------------------------------------------------------------------| ---------|
      | DRIVER_LOGS_ENABLED      | Recopile los registros del controlador de Spark en Datadog.                                                                                                                          | false   |
      | WORKER_LOGS_ENABLED      | Recopile los registros de los trabajadores de Spark en Datadog.                                                                                                                            | false   |
      | DD_TAGS                  | Agregue etiquetas al clúster de Databricks y a las métricas de rendimiento de Spark. Pares clave:valor separados por comas o espacios. Siga las [convenciones de etiquetas de Datadog][4]. Por ejemplo: `env:staging,team:data_engineering` |         |
      | DD_ENV                   | Anule la etiqueta `env` de entorno en las métricas, trazas y registros de este clúster. De forma predeterminada, se utiliza el nombre del Databricks Workspace como env.                                                                                         |         |
      | DD_LOGS_CONFIG_PROCESSING_RULES | Filtre los registros recopilados con reglas de procesamiento. Consulte [Recopilación avanzada de registros][5] para obtener más detalles. |         |

1. Haga clic en {{< ui >}}Create{{< /ui >}} si está creando una nueva política o en {{< ui >}}Save{{< /ui >}} si está actualizando una política existente. Si actualiza una política existente, todos los clústeres que utilizan esa política aplican automáticamente los cambios en su siguiente reinicio. Si crea una nueva política, siga los pasos a continuación para aplicarla a sus clústeres.

**Aplicar la política de clúster a los clústeres**

1. En {{< ui >}}Compute{{< /ui >}}, seleccione el clúster que desea actualizar o haga clic en {{< ui >}}Create Compute{{< /ui >}} para un nuevo clúster.
1. En el menú desplegable {{< ui >}}Policy{{< /ui >}} en la parte superior, seleccione la política que creó.
1. Haga clic en {{< ui >}}Confirm{{< /ui >}} para guardar los cambios. El clúster debe reiniciarse para que la política surta efecto.

[1]: https://app.datadoghq.com/organization-settings/api-keys
[2]: /es/getting_started/site/
[3]: https://github.com/DataDog/datadog-agent/blob/main/pkg/fleet/installer/setup/djm/databricks.go
[4]: /es/getting_started/tagging/
[5]: /es/agent/logs/advanced_log_collection/?tab=environmentvariable#global-processing-rules
[26]: https://docs.databricks.com/en/connect/unity-catalog/volumes.html
[27]: https://docs.databricks.com/en/data-governance/unity-catalog/manage-privileges/allowlist#how-to-add-items-to-the-allowlist

{{% /tab %}}

{{% tab "Instalar manualmente un script de inicialización global" %}}

<div class="alert alert-danger">
Esta configuración no funciona en clústeres de Databricks en modo de acceso <strong>Standard</strong>, porque los scripts de inicialización global no se pueden instalar en esos clústeres. Si utiliza clústeres con el modo de acceso <strong>Standard</strong>, Datadog recomienda <a href="?tab=manuallyconfigureaclusterpolicy#install-the-datadog-agent">configurar manualmente una política de clúster</a> o <a href="?tab=manuallyinstallonaspecificcluster#install-the-datadog-agent">instalar manualmente en un clúster específico</a>.
</div>

1. En Databricks, haga clic en su nombre para mostrar (dirección de correo electrónico) en la esquina superior derecha de la página.
1. Seleccione {{< ui >}}Settings{{< /ui >}} y haga clic en la pestaña {{< ui >}}Compute{{< /ui >}}.
1. En la sección {{< ui >}}All purpose clusters{{< /ui >}}, junto a {{< ui >}}Global init scripts{{< /ui >}}, haga clic en {{< ui >}}Manage{{< /ui >}}.
1. Haga clic en {{< ui >}}Add{{< /ui >}}. Asigne un nombre a su script. Luego, en el campo {{< ui >}}Script{{< /ui >}}, copie y pegue el siguiente script, recordando reemplazar los marcadores de posición con los valores de sus parámetros.

   ```shell
   #!/bin/bash

   # Required parameters
   export DD_API_KEY=<YOUR API KEY>
   export DD_SITE=<YOUR DATADOG SITE>
   export DATABRICKS_WORKSPACE="<YOUR WORKSPACE NAME>"

   # Download and run the latest init script
   curl -L https://install.datadoghq.com/scripts/install-databricks.sh > djm-install-script
   bash djm-install-script || true
   ```

   El script anterior establece los parámetros requeridos, y descarga y ejecuta el script de inicialización más reciente para Data Observability: Jobs Monitoring en Databricks. Si desea fijar su script a una versión específica, puede reemplazar el nombre del archivo en la URL con `install-databricks-0.14.0.sh` para usar la versión `0.14.0`, por ejemplo. El código fuente utilizado para generar este script, y los cambios entre las versiones del script, se pueden encontrar en el [repositorio del Datadog Agent][3].

1. Para habilitar el script para todos los clústeres nuevos y reiniciados, active {{< ui >}}Enabled{{< /ui >}}.
   {{< img src="data_jobs/databricks/toggle.png" alt="Interfaz de usuario de Databricks, configuración de administrador, scripts de inicialización global. Un script llamado 'install-datadog-agent' se encuentra en una lista con un interruptor habilitado." style="width:100%;" >}}
1. Haga clic en {{< ui >}}Add{{< /ui >}}.

#### Establezca los parámetros requeridos del script de inicialización {#set-the-required-init-script-parameters}

Proporcione los valores para los parámetros del script de inicialización al principio del script de inicialización global.

```bash
export DD_API_KEY=<YOUR API KEY>
export DD_SITE=<YOUR DATADOG SITE>
export DATABRICKS_WORKSPACE="<YOUR WORKSPACE NAME>"
```

Opcionalmente, también puede establecer otros parámetros del script de inicialización y variables de entorno de Datadog aquí, como `DD_ENV` y `DD_SERVICE`. El script se puede configurar utilizando los siguientes parámetros:

| Variable                 | Descripción                                                                                                                                                      | Predeterminado |
|--------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------|---------|
| DD_API_KEY               | Su [clave de Datadog API][1].                                                                                                                                        |         |
| DD_SITE                  | Su [Datadog site][2].                                                                                                                                           |         |
| DATABRICKS_WORKSPACE     | Nombre de su Databricks Workspace. Debe coincidir con el nombre proporcionado en el [paso de integración de Datadog-Databricks](#configure-the-datadog-databricks-integration). Encierre el nombre entre comillas dobles si contiene espacios en blanco. |         |
| DRIVER_LOGS_ENABLED      | Recopile los registros del controlador de Spark en Datadog.                                                                                                                          | false   |
| WORKER_LOGS_ENABLED      | Recopile los registros de los trabajadores de Spark en Datadog.                                                                                                                         | false   |
| DD_TAGS                  | Agregue etiquetas al clúster de Databricks y a las métricas de rendimiento de Spark. Pares clave:valor separados por comas o espacios. Siga las [convenciones de etiquetas de Datadog][4]. Por ejemplo: `env:staging,team:data_engineering` |         |
| DD_ENV                   | Anule la etiqueta `env` de entorno en las métricas, trazas y registros de este clúster. De forma predeterminada, se utiliza el nombre del Databricks Workspace como env.                                                                                         |         |
| DD_LOGS_CONFIG_PROCESSING_RULES | Filtre los registros recopilados con reglas de procesamiento. Consulte [Recopilación avanzada de registros][5] para obtener más detalles. |         |

[1]: https://app.datadoghq.com/organization-settings/api-keys
[2]: /es/getting_started/site/
[3]: https://github.com/DataDog/datadog-agent/blob/main/pkg/fleet/installer/setup/djm/databricks.go
[4]: /es/getting_started/tagging/
[5]: /es/agent/logs/advanced_log_collection/?tab=environmentvariable#global-processing-rules

{{% /tab %}}

{{% tab "Instalar manualmente en un clúster específico" %}}

1. En Databricks, cree un archivo de script de inicio en un [volumen de Unity Catalog][26] con el siguiente contenido. Asegúrese de anotar la ruta del volumen (por ejemplo, `/Volumes/catalog_name/schema_name/volume_name/datadog-init-script.sh`).

   ```shell
   #!/bin/bash

   # Download and run the latest init script
   curl -L https://install.datadoghq.com/scripts/install-databricks.sh > djm-install-script
   bash djm-install-script || true
   ```

   El script anterior descarga y ejecuta el script de inicialización más reciente para Data Observability: Jobs Monitoring en Databricks. Si desea fijar su script a una versión específica, puede reemplazar el nombre del archivo en la URL (por ejemplo, `install-databricks-0.14.0.sh` para usar la versión `0.14.0`). Puede encontrar el código fuente utilizado para generar este script, y los cambios entre las versiones del script, en el [repositorio del Datadog Agent][3].

1. Otorgue permisos de solo lectura al script de inicio:
    1. A nivel de volumen, otorgue el permiso `READ VOLUME` a todos los usuarios de la cuenta.
    1. A nivel de catálogo, otorgue el permiso `USE CATALOG` a todos los usuarios de la cuenta.

   <div class="alert alert-info">Databricks evalúa los permisos de volumen de Unity Catalog con respecto al <strong>propietario del clúster</strong>, no al principal que ejecuta el clúster.</div>

1. **Agregue el script de inicialización a la lista de permitidos** (requerido para clústeres en modo de acceso **Standard**): Si su clúster utiliza el modo de acceso **Standard**, debe agregar la ruta del script de inicialización a la lista de permitidos de Unity Catalog. Siga las instrucciones en la [documentación de Databricks][27] para agregar la ruta de su script de inicio a la lista de permitidos.

1. En la página de configuración del clúster, haga clic en el interruptor {{< ui >}}Advanced options{{< /ui >}}.
1. En la parte inferior de la página, vaya a la pestaña {{< ui >}}Init Scripts{{< /ui >}}.

   {{< img src="data_jobs/databricks/init_scripts.png" alt="Interfaz de usuario de Databricks, opciones avanzadas de configuración del clúster, pestaña Init Scripts. Un menú desplegable 'Destination' y un selector de archivos 'Init script path'." style="width:80%;" >}}

   - En el menú desplegable {{< ui >}}Destination{{< /ui >}}, seleccione {{< ui >}}Volume{{< /ui >}}.
   - En {{< ui >}}Init script path{{< /ui >}}, ingrese la ruta del volumen a su script de inicialización.
   - Haga clic en {{< ui >}}Add{{< /ui >}}.

#### Establezca los parámetros requeridos del script de inicialización {#set-the-required-init-script-parameters-1}

1. En Databricks, en la página de configuración del clúster, haga clic en el interruptor {{< ui >}}Advanced options{{< /ui >}}.
2. En la parte inferior de la página, vaya a la pestaña {{< ui >}}Spark{{< /ui >}}.
   {{< img src="data_jobs/databricks/configure-databricks-cluster-init-script.png" alt="Interfaz de usuario de Databricks, opciones avanzadas de configuración del clúster, pestaña Spark. Un cuadro de texto titulado 'Environment variables' contiene valores para DD_API_KEY y DD_SITE." style="width:100%;" >}}

   En el cuadro de texto {{< ui >}}Environment variables{{< /ui >}}, proporcione los valores para los parámetros del script de inicialización.

   ```text
   DD_API_KEY=<YOUR API KEY>
   DD_SITE=<YOUR DATADOG SITE>
   DATABRICKS_WORKSPACE=<YOUR WORKSPACE NAME>
   ```

   Opcionalmente, también puede establecer otros parámetros del script de inicialización y variables de entorno de Datadog aquí, como `DD_ENV` y `DD_SERVICE`. El script se puede configurar utilizando los siguientes parámetros:

| Variable                 | Descripción                                                                                                                                                      | Predeterminado |
|--------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------|---------|
| DD_API_KEY               | Su [clave de Datadog API][1].                                                                                                                                        |         |
| DD_SITE                  | Su [Datadog site][2].                                                                                                                                           |         |
| DATABRICKS_WORKSPACE     | Nombre de su Databricks Workspace. Debe coincidir con el nombre proporcionado en el [paso de integración de Datadog-Databricks](#configure-the-datadog-databricks-integration). |         |
| DRIVER_LOGS_ENABLED      | Recopile los registros del controlador de Spark en Datadog.                                                                                                                          | false   |
| WORKER_LOGS_ENABLED      | Recopile los registros de los trabajadores de Spark en Datadog.                                                                                                                         | false   |
| DD_TAGS                  | Agregue etiquetas al clúster de Databricks y a las métricas de rendimiento de Spark. Pares clave:valor separados por comas o espacios. Siga las [convenciones de etiquetas de Datadog][4]. Por ejemplo: `env:staging,team:data_engineering` |         |
| DD_ENV                   | Anule la etiqueta `env` de entorno en las métricas, trazas y registros de este clúster. De forma predeterminada, se utiliza el nombre del Databricks Workspace como env.                                                                                          |         |
| DD_LOGS_CONFIG_PROCESSING_RULES | Filtre los registros recopilados con reglas de procesamiento. Consulte [Recopilación avanzada de registros][5] para obtener más detalles. |         |


[1]: https://app.datadoghq.com/organization-settings/api-keys
[2]: /es/getting_started/site/
[3]: https://github.com/DataDog/datadog-agent/blob/main/pkg/fleet/installer/setup/djm/databricks.go
[4]: /es/getting_started/tagging/
[5]: /es/agent/logs/advanced_log_collection/?tab=environmentvariable#global-processing-rules
[26]: https://docs.databricks.com/en/connect/unity-catalog/volumes.html
[27]: https://docs.databricks.com/en/data-governance/unity-catalog/manage-privileges/allowlist#how-to-add-items-to-the-allowlist

3. Haga clic en {{< ui >}}Confirm{{< /ui >}}.

{{% /tab %}}

{{< /tabs >}}

### Reinicie los clústeres que ya están en ejecución {#restart-already-running-clusters}

El script de inicio instala el Agent cuando los clústeres se inician.

Los clústeres de propósito general o los clústeres de trabajos de larga duración que ya están en ejecución deben reiniciarse manualmente para que el script de inicio instale el Datadog Agent.

Para los trabajos programados que se ejecutan en clústeres de trabajos, el script de inicio instala el Datadog Agent automáticamente en la siguiente ejecución.

## Validación {#validation}

En Datadog, vea la página [Data Observability: Jobs Monitoring][6] para ver una lista de todos sus trabajos de Databricks.

Si algunos trabajos no son visibles, navegue a la página [Configuration][9] para entender por qué. Esta página enumera todos sus trabajos de Databricks que aún no están configurados con el Agent en sus clústeres, junto con orientación para completar la configuración.

## Solución de problemas {#troubleshooting}

Si no ve ningún dato en Jobs Monitoring después de instalar el producto, siga estos pasos.

### El script de inicio no se ejecuta o falla {#init-script-not-running-or-failing}

1. **Reinicie el clúster**: El script de inicio solo se ejecuta al iniciar el clúster. Asegúrese de que el clúster se haya reiniciado desde que se agregó el script de inicio.
1. **Confirme que el script de inicio se ejecutó**: En Databricks, haga clic en el clúster y navegue a la pestaña {{< ui >}}Event log{{< /ui >}}. Si `INIT_SCRIPTS_STARTED` no está presente, el clúster no detectó el script de inicio. Regrese a los [pasos de instalación](#install-the-datadog-agent) para asegurarse de que el script de inicio se haya agregado al clúster.
1. **Confirme que el script de inicio tuvo éxito**: Busque la acción `INIT_SCRIPTS_FINISHED` en el registro de eventos y haga clic en ella para inspeccionar el JSON, el cual indica si el script de inicio finalizó con un error.
1. **Investigue las fallas del script de inicio**: Si `INIT_SCRIPTS_FINISHED` muestra una falla, habilite la [entrega de registros del clúster][29] para enviar los registros del script de inicio a su destino preferido. Se recomienda enviar los registros a un volumen de Unity Catalog.
   {{< img src="data_jobs/databricks/compute_logging_config.png" alt="La página de configuración del clúster de Databricks que muestra la pestaña Logging con opciones para configurar un destino de entrega de registros." style="width:100%;" >}}
   Después de reiniciar el clúster con la entrega de registros habilitada, navegue hasta el destino del registro. Los registros stdout y stderr se pueden encontrar en la siguiente ruta:
   ```
   <cluster-log-path>/<cluster-id>/init_scripts/<cluster-id>_<script-hash>/
   ```

### Los datos no aparecen después de una ejecución exitosa del script de inicio{#data-not-appearing-after-a-successful-init-script-run}

1. **Validación de la clave de API:** Si el script de inicio se instaló manualmente, utilice el [punto de conexión de validación de clave de API][25] para asegurarse de que la clave de Datadog API especificada en el script sea válida.
1. **Validación del Agent:** El script de inicio instala el Datadog Agent. Para asegurarse de que esté instalado correctamente, conéctese al clúster mediante SSH y ejecute el comando de estado del Agent:
  ```shell
  sudo datadog-agent status
  ```

## Configuración avanzada{#advanced-configuration}

### Filtrar la recopilación de registros en clústeres{#filter-log-collection-on-clusters}

#### Excluir toda la recopilación de registros de un clúster individual{#exclude-all-log-collection-from-an-individual-cluster}
Configure la siguiente variable de entorno en la sección {{< ui >}}Advanced Configuration{{< /ui >}} de su clúster en la interfaz de usuario de Databricks o como una [variable de entorno de Spark][18] en la API de Databricks.

```bash
DD_LOGS_CONFIG_PROCESSING_RULES=[{\"type\": \"exclude_at_match\",\"name\": \"drop_all_logs\",\"pattern\": \".*\"}]
```

### Permisos{#permissions}
El usuario o la entidad de servicio que se conecta a su espacio de trabajo de Databricks debe tener habilitados los siguientes derechos de espacio de trabajo, además de los permisos descritos a continuación:

- {{< ui >}}Workspace access{{< /ui >}}
- {{< ui >}}Databricks SQL access{{< /ui >}}

#### Permisos del espacio de trabajo{#workspace-permissions}

Elija uno de los siguientes enfoques para el usuario o la entidad de servicio:

- **Privilegios de administrador del espacio de trabajo** (recomendado): Otorgue privilegios {{< ui >}}Workspace Admin{{< /ui >}}. Esto permite a Datadog gestionar las instalaciones y actualizaciones de scripts de inicio automáticamente, reduciendo el riesgo de una configuración incorrecta.
- **Permisos granulares**: Si necesita un control más granular, otorgue estos permisos mínimos a los siguientes [objetos a nivel de espacio de trabajo][19] para poder hacer un seguimiento de todos los trabajos, clústeres y consultas dentro de un espacio de trabajo:

  | Objeto                 | Permiso                                                                                                                                                      |
  |--------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------|
  | [Job][20]                              | CAN VIEW
  | [Compute][21]                          | CAN ATTACH TO
  | [Lakeflow Declarative Pipelines][22]   | CAN VIEW
  | [Query][23]                            | CAN VIEW
  | [SQL warehouse][24]                    | CAN MONITOR

#### Permisos de datos de costos {#cost-data-permissions}

Además, para que Datadog acceda a sus datos de costos de Databricks en Data Observability: Jobs Monitoring o [Cloud Cost Management][26], el usuario o la entidad de servicio utilizada para consultar las [tablas del sistema][27] debe tener los siguientes permisos:
   - `CAN USE` permiso en el almacén SQL.
   - Acceso de lectura a las [tablas del sistema][27] dentro de Unity Catalog. En Databricks, abra el {{< ui >}}SQL Editor{{< /ui >}} y ejecute los siguientes comandos, utilizando el ID de cliente de la entidad de servicio (no su nombre para mostrar):
   ```sql
   GRANT USE CATALOG ON CATALOG system TO `<CLIENT-ID>`;
   GRANT USE SCHEMA ON CATALOG system TO `<CLIENT-ID>`;
   GRANT SELECT ON CATALOG system TO `<CLIENT-ID>`;
   ```
   El usuario que los otorgue debe tener el privilegio `MANAGE` en `CATALOG system`.


### Etiquetar tramos en tiempo de ejecución {#tag-spans-at-runtime}

{{% djm-runtime-tagging %}}

### Configurar etiquetas de clúster {#configure-cluster-tags}

Las etiquetas de clúster personalizadas de Databricks se capturan automáticamente y están disponibles en Data Observability: Jobs Monitoring y la plataforma Datadog. La única excepción son las etiquetas de los grupos de recursos de Azure, que no se capturan automáticamente.

Para agregar etiquetas manualmente, establezca la variable de entorno `DD_TAGS` en las variables de entorno de Spark de su clúster. Esto tiene el mismo efecto que las etiquetas de clúster personalizadas de Databricks, pero requiere configuración manual. Utilice pares clave:valor separados por comas o espacios siguiendo las [convenciones de etiquetas de Datadog][28]:

```text
DD_TAGS=env:staging,team:data_engineering
```

### Agrupar métricas del clúster de ejecuciones de trabajos únicos {#aggregate-cluster-metrics-from-one-time-job-runs}
   Esta configuración es aplicable si desea obtener datos de utilización de recursos del clúster sobre sus trabajos y crear un nuevo trabajo y clúster para cada ejecución a través del [punto de conexión de la API de ejecución única][8] (común cuando se utilizan herramientas de orquestación fuera de Databricks, como Airflow o Azure Data Factory).

   Si envía trabajos de Databricks a través del [punto de conexión de la API de ejecución única][8], cada ejecución de trabajo tiene un ID de trabajo único. Esto puede dificultar la agrupación y el análisis de las métricas del clúster para los trabajos que utilizan clústeres efímeros. Para agrupar la utilización del clúster del mismo trabajo y evaluar el rendimiento en múltiples ejecuciones, debe establecer la variable `DD_JOB_NAME` dentro de `spark_env_vars` de cada `new_cluster` con el mismo valor que `run_name` de la carga útil de su solicitud.

   Aquí tiene un ejemplo de un cuerpo de solicitud de ejecución de trabajo única:

   {{< highlight json "hl_lines=2 18" >}}
   {
      "run_name": "Example Job",
      "idempotency_token": "8f018174-4792-40d5-bcbc-3e6a527352c8",
      "tasks": [
         {
            "task_key": "Example Task",
            "description": "Description of task",
            "depends_on": [],
            "notebook_task": {
               "notebook_path": "/Path/to/example/task/notebook",
               "source": "WORKSPACE"
            },
            "new_cluster": {
               "num_workers": 1,
               "spark_version": "13.3.x-scala2.12",
               "node_type_id": "i3.xlarge",
               "spark_env_vars": {
                  "DD_JOB_NAME": "Example Job"
               }
            }
         }
      ]
   }
   {{< /highlight >}}

### Configurar Data Observability: Jobs Monitoring con Databricks Networking Restrictions {#set-up-data-observability-jobs-monitoring-with-databricks-networking-restrictions}
Con [Databricks Networking Restrictions][12], es posible que Datadog no tenga acceso a las API de Databricks, lo cual es necesario para recopilar trazas de las ejecuciones de trabajos de Databricks junto con etiquetas y otros metadatos.

Si controla el acceso a la API de Databricks con [listas de acceso IP][13], incluya en la lista de permitidos las direcciones específicas de Datadog {{< region-param key="ip_ranges_url_webhooks" link="true" text="webhook IP addresses" >}} permite que Datadog se conecte a las Databricks APIs en su área de trabajo. Consulte la documentación de Databricks para configurar listas de acceso IP para [áreas de trabajo individuales][16] a fin de otorgar acceso a la Datadog API.

Para hacer un seguimiento de las áreas de trabajo que utilizan [Databricks Private Link][14], consulte [Conectividad de Private Link (versión preliminar)][15].

[15]: /es/data_observability/jobs_monitoring/databricks/private_link

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/integrations/databricks?search=databricks
[4]: https://docs.databricks.com/en/security/secrets/index.html
[6]: https://app.datadoghq.com/data-jobs/
[7]: /es/data_jobs
[8]: https://docs.databricks.com/api/workspace/jobs/submit
[9]: https://app.datadoghq.com/data-jobs/configuration
[12]: https://docs.databricks.com/en/security/network/front-end/index.html
[13]: https://docs.databricks.com/en/security/network/front-end/ip-access-list.html
[14]: https://www.databricks.com/trust/security-features/secure-your-data-with-private-networking
[16]: https://docs.databricks.com/en/security/network/front-end/ip-access-list-workspace
[18]: https://docs.databricks.com/api/workspace/clusters/edit#spark_env_vars
[19]: https://docs.databricks.com/aws/en/security/auth/access-control#access-control-lists-overview
[20]: https://docs.databricks.com/aws/en/security/auth/access-control#job-acls
[21]: https://docs.databricks.com/aws/en/security/auth/access-control#compute-acls
[22]: https://docs.databricks.com/aws/en/security/auth/access-control#lakeflow-declarative-pipelines-acls
[23]: https://docs.databricks.com/aws/en/security/auth/access-control#query-acls
[24]: https://docs.databricks.com/aws/en/security/auth/access-control#sql-warehouse-acls
[25]: https://docs.datadoghq.com/es/api/latest/authentication/?code-lang=curl#validate-api-key
[26]: https://docs.datadoghq.com/es/cloud_cost_management
[27]: https://docs.databricks.com/aws/en/admin/system-tables/
[28]: /es/getting_started/tagging/
[29]: https://docs.databricks.com/aws/en/compute/configure#compute-log-delivery