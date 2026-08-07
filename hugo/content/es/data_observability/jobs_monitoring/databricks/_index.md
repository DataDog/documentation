---
aliases:
- /es/data_jobs/databricks
description: 'Habilite Data Observability: Jobs Monitoring para espacios de trabajo
  de Databricks con autenticación OAuth o Token de Acceso Personal y la instalación
  de Datadog Agent.'
further_reading:
- link: /data_jobs
  tag: Documentación
  text: 'Data Observability: Jobs Monitoring'
- link: https://www.datadoghq.com/blog/databricks-serverless-jobs-datadog/
  tag: Blog
  text: Detectar problemas y optimizar gastos con el monitoreo de trabajos sin servidor
    de Databricks
title: 'Habilitar la Observabilidad de Datos: Monitoreo de Trabajos para Databricks'
---
Data Observability: Jobs Monitoring proporciona visibilidad sobre el rendimiento y la confiabilidad de sus trabajos y flujos de trabajo de Databricks que se ejecutan en clústeres o en computación sin servidor.

## Configurar {#setup}

<div class="alert alert-info">Si su espacio de trabajo de Databricks tiene habilitadas las <a href="https://docs.databricks.com/en/security/network/front-end/index.html">Restricciones de Red</a>, agregue a Datadog {{< region-param key="ip_ranges_url_webhooks" link="true" text="webhook IP ranges" >}} a su lista de permitidos. Si su espacio de trabajo utiliza Enlace Privado, consulte la pestaña <strong>Conectividad de Enlace Privado</strong> a continuación.</div>

Siga estos pasos para habilitar Data Observability: Jobs Monitoring para Databricks.

1. [Configurar la integración de Datadog-Databricks](#configure-the-datadog-databricks-integration) para un espacio de trabajo de Databricks.
1. [Instalar el Agente de Datadog](#install-the-datadog-agent) en su(s) clúster(es) de Databricks en el espacio de trabajo.


### Configurar la integración de Datadog-Databricks {#configure-the-datadog-databricks-integration}

{{< tabs >}}

{{% tab "Utilizar un Principal de Servicio para OAuth" %}}

<div class="alert alert-danger">Las nuevas integraciones de espacio de trabajo deben autenticarse utilizando OAuth. Los espacios de trabajo ya integrados con un Token de Acceso Personal continúan funcionando y pueden cambiar a OAuth en cualquier momento. Después de que un espacio de trabajo comience a usar OAuth, no puede revertir a un Token de Acceso Personal.</div>

#### Crear y configurar el principal de servicio en Databricks {#create-and-configure-the-service-principal-in-databricks}

1. Como administrador de **Databricks workspace**, ve a {{< ui >}}Settings{{< /ui >}} haciendo clic en tu perfil en la esquina superior derecha del workspace.
1. En la pestaña {{< ui >}}Identity and access{{< /ui >}}, haz clic en {{< ui >}}Manage{{< /ui >}} junto a {{< ui >}}Service principals{{< /ui >}}.
1. Haz clic en {{< ui >}}Add service principal{{< /ui >}}, luego haz clic en {{< ui >}}Add new{{< /ui >}}.
1. Ingresa un nombre, luego haz clic en **Agregar**.

   <div class="alert alert-warning">Para Azure Databricks, selecciona el tipo de gestión "administrado por Databricks". Datadog NO soporta los principales de servicio "administrados por Microsoft Entra ID".</div>

1. Haz clic en el nombre de tu nuevo principal de servicio. Bajo la pestaña {{< ui >}}Secrets{{< /ui >}}, haz clic en {{< ui >}}Generate secret{{< /ui >}}.
   1. Establece {{< ui >}}Lifetime (days){{< /ui >}} al valor máximo permitido (730).

   1. Haz clic en {{< ui >}}Generate{{< /ui >}}.

   1. Toma nota de tu ID de cliente y secreto de cliente.

  {{< img src="data_jobs/databricks/client-id-secret.png" alt="En Databricks, se muestra un modal con el ID de cliente y el secreto asociados a un nuevo secreto OAuth." style="width:70%;" >}}

1. En la pestaña {{< ui >}}Permissions{{< /ui >}}, haz clic en {{< ui >}}Grant access{{< /ui >}}. Busca el nuevo principal de servicio, otórgale el permiso {{< ui >}}Manage{{< /ui >}} y haz clic en {{< ui >}}Save{{< /ui >}}.
1. Regresa a la pestaña {{< ui >}}Identity and access{{< /ui >}} y haz clic en {{< ui >}}Manage{{< /ui >}} junto a {{< ui >}}Groups{{< /ui >}}.
1. Haz clic en el grupo {{< ui >}}admins{{< /ui >}}, luego haz clic en {{< ui >}}Add members{{< /ui >}} para agregar el nuevo principal de servicio.

#### Agrega el espacio de trabajo de Databricks a Datadog {#add-the-databricks-workspace-to-datadog}

1. En Datadog, abre el mosaico de integración de Databricks.
1. En la pestaña {{< ui >}}Configure{{< /ui >}}, haz clic en {{< ui >}}Add Databricks Workspace{{< /ui >}}.
1. Ingresa un nombre de espacio de trabajo, la URL de tu espacio de trabajo de Databricks y el ID de cliente y secreto que generaste.
   {{< img src="data_jobs/databricks/connect-workspace-form-m2m.png" alt="En el mosaico de integración de Datadog-Databricks, se muestra un espacio de trabajo de Databricks. Este espacio de trabajo tiene un nombre, URL, ID de cliente y secreto de cliente." style="width:100%;" >}}
1. Para obtener visibilidad sobre tus costos de Databricks en Data Observability: Monitoreo de Trabajos o [Gestión de Costos en la Nube][18], proporciona el ID de un [Almacén SQL de Databricks][19] que Datadog puede usar para consultar tus [tablas del sistema][20].
   - El principal de servicio debe tener acceso al Almacén SQL. En la página de configuración del Almacén, ve a {{< ui >}}Permissions{{< /ui >}} (esquina superior derecha) y otórgale permiso `CAN USE`.
   - Otorga al principal de servicio acceso de lectura a las [tablas del sistema][20] del Catálogo de Unity ejecutando los siguientes comandos:
   ```sql
   GRANT USE CATALOG ON CATALOG system TO <service_principal>;
   GRANT SELECT ON CATALOG system TO <service_principal>;
   GRANT USE SCHEMA ON CATALOG system TO <service_principal>;
   ```
   El usuario que otorga estos permisos debe tener el privilegio `MANAGE` sobre `CATALOG system`.

   -  El Almacén SQL debe ser Pro o Serverless. Los Almacenes Clásicos **NO** son compatibles. Se recomienda un almacén 2XS, con Auto Stop configurado de 5 a 10 minutos para reducir costos.
1. En la sección **Seleccionar productos para configurar la integración**, asegúrate de que Data Observability: Monitoreo de Trabajos esté {{< ui >}}Enabled{{< /ui >}}.
1. En la sección {{< ui >}}Datadog Agent Setup{{< /ui >}}, elige entre
    - [Gestionado por Datadog (recomendado)](?tab=datadogmanagedglobalinitscriptrecommended#install-the-datadog-agent): Datadog instala y gestiona el Agente con un script de inicio global en el espacio de trabajo.
    - [Manualmente](?tab=manuallyinstallaglobalinitscript#install-the-datadog-agent): Sigue las [instrucciones a continuación](?tab=manuallyinstallaglobalinitscript#install-the-datadog-agent) para instalar y gestionar el script de inicio para instalar el Agente globalmente o en clústeres específicos de Databricks.

[18]: https://docs.datadoghq.com/es/cloud_cost_management/
[19]: https://docs.databricks.com/aws/en/compute/sql-warehouse/
[20]: https://docs.databricks.com/aws/en/admin/system-tables/

{{% /tab %}}

{{% tab "Private Link Connectivity" %}}

Si su espacio de trabajo de Databricks se implementa utilizando [Conectividad de Private Link][25], Datadog no puede acceder a las APIs de Databricks directamente. Esto requiere usar un [Private Action Runner][26] desplegado en su entorno.

Consulte [Private Link Connectivity (Preview)][15] para obtener instrucciones completas de configuración.

[15]: /es/data_observability/jobs_monitoring/databricks/private_link
[25]: https://docs.databricks.com/aws/en/security/network/front-end/front-end-private-connect
[26]: https://docs.datadoghq.com/es/actions/private_actions/

{{% /tab %}}

{{% tab "Utilice un Token de Acceso Personal (Legado)" %}}

<div class="alert alert-danger">Esta opción solo está disponible para integraciones de espacio de trabajo creadas antes del 7 de julio de 2025. Las nuevas integraciones de espacio de trabajo deben autenticarse usando OAuth.</div>

1. En su espacio de trabajo de Databricks, haga clic en su perfil en la esquina superior derecha y vaya a {{< ui >}}Settings{{< /ui >}}. Seleccione {{< ui >}}Developer{{< /ui >}} en la barra lateral izquierda. Junto a {{< ui >}}Access tokens{{< /ui >}}, haga clic en {{< ui >}}Manage{{< /ui >}}.
1. Haga clic en {{< ui >}}Generate new token{{< /ui >}}, ingrese "Integración de Datadog" en el campo {{< ui >}}Comment{{< /ui >}}, establezca el valor de {{< ui >}}Lifetime (days){{< /ui >}} al máximo permitido (730 días) y cree un recordatorio para actualizar el token antes de que expire. Luego haga clic en {{< ui >}}Generate{{< /ui >}}. Tome nota de su token.

   **Importante:**
   * Para la instalación del script de inicialización administrado por Datadog (recomendado)](?tab=datadogmanagedglobalinitscriptrecommended#install-the-datadog-agent), asegúrese de que el Principal del token sea un <strong>Administrador de Workspace</strong>.
   * Para la instalación manual del script de inicialización, asegúrese de que el Principal del token tenga acceso [CAN VIEW][9] para los trabajos y clústeres de Databricks que desea monitorear.

   Como alternativa, siga la [documentación oficial de Databricks][10] para generar un token de acceso para un [principal de servicio][11]. El principal de servicio debe tener habilitado el [<strong>acceso al Workspace</strong>][17] y los permisos de <strong>Administrador de Workspace</strong> o [CAN VIEW][9] como se describió anteriormente.
1. En Datadog, abra el mosaico de integración de Databricks.
1. En la pestaña {{< ui >}}Configure{{< /ui >}}, haga clic en {{< ui >}}Add Databricks Workspace{{< /ui >}}.
1. Ingrese un nombre para el espacio de trabajo, la URL de su espacio de trabajo de Databricks y el token de Databricks que generó.
   {{< img src="data_jobs/databricks/configure-workspace-form.png" alt="En el mosaico de integración de Datadog-Databricks, se muestra un espacio de trabajo de Databricks. Este espacio de trabajo tiene un nombre, una URL y un token de API." style="width:100%;" >}}
1. Para obtener visibilidad sobre sus costos de Databricks en Data Observability: Jobs Monitoring o [Cloud Cost Management][18], proporcione el ID de un [Almacén SQL de Databricks][19] que Datadog puede usar para consultar sus [tablas del sistema][20].

   - El principal del token debe tener acceso al Almacén SQL. Otórguele `CAN USE` permiso desde **Permisos** en la parte superior derecha de la página de configuración del Almacén.
   - Conceda al principal del servicio acceso de lectura al Unity Catalog [tablas del sistema][20] ejecutando los siguientes comandos:
   ```sql
   GRANT USE CATALOG ON CATALOG system TO <token_principal>;
   GRANT SELECT ON CATALOG system TO <token_principal>;
   GRANT USE SCHEMA ON CATALOG system TO <token_principal>;
   ```
   El usuario que otorga estos permisos debe tener el privilegio `MANAGE` sobre `CATALOG system`.
   -  El Almacén SQL debe ser Pro o Serverless. Los Almacenes Clásicos **NO** son compatibles. Se recomienda un almacén de tamaño 2XS, con Auto Stop configurado para 5-10 minutos para minimizar costos.
1. En la sección **Seleccionar productos para configurar la integración**, asegúrese de que el producto Data Observability: Jobs Monitoring esté **Habilitado**.
1. En la sección {{< ui >}}Datadog Agent Setup{{< /ui >}}, elija ya sea
    - [Gestionado por Datadog (recomendado)](?tab=datadogmanagedglobalinitscriptrecommended#install-the-datadog-agent): Datadog instala y gestiona el Agent con un script de inicio global en el espacio de trabajo.
    - [Manualmente](?tab=manuallyinstallaglobalinitscript#install-the-datadog-agent): Siga las [instrucciones a continuación](?tab=manuallyinstallaglobalinitscript#install-the-datadog-agent) para instalar y gestionar el script de inicio para instalar el Agent globalmente o en clústeres específicos de Databricks.

[9]: https://docs.databricks.com/en/security/auth-authz/access-control/index.html#job-acls
[10]: https://docs.databricks.com/en/admin/users-groups/service-principals.html#manage-personal-access-tokens-for-a-service-principal
[11]: https://docs.databricks.com/en/admin/users-groups/service-principals.html#what-is-a-service-principal
[17]: https://docs.databricks.com/aws/en/security/auth/entitlements#entitlements-overview
[18]: https://docs.datadoghq.com/es/cloud_cost_management
[19]: https://docs.databricks.com/aws/en/compute/sql-warehouse/
[20]: https://docs.databricks.com/aws/en/admin/system-tables/


{{% /tab %}}

{{< /tabs >}}

### Instale el Datadog Agent {#install-the-datadog-agent}

El Datadog Agent debe estar instalado en los clústeres de Databricks para monitorear los trabajos de Databricks que se ejecutan en clústeres de propósito general o de trabajos. Este paso no es necesario para monitorear trabajos en [serverless compute][4].

{{< tabs >}}
{{% tab "Script de inicio global gestionado por Datadog (Recomendado)" %}}

Datadog puede instalar y gestionar un script de inicialización global en el espacio de trabajo de Databricks. El Datadog Agent se instala en todos los clústeres en el espacio de trabajo, cuando estos inician.

<div class="alert alert-danger">
<ul>
<li>Esta configuración no funciona en clústeres de Databricks en modo de acceso <strong>Estándar</strong>, porque no se pueden instalar scripts de inicio global en esos clústeres. Si está utilizando clústeres con el modo de acceso <strong>Estándar</strong>, Datadog recomienda <a href="?tab=manuallyconfigureaclusterpolicy#install-the-datadog-agent">Configurar manualmente una política de clúster</a> en múltiples clústeres o <a href="?tab=manuallyinstallonaspecificcluster#install-the-datadog-agent">Instalar manualmente en un clúster específico</a>.</li>
<li>Esta opción de instalación, en la que Datadog instala y gestiona su script de inicio global de Datadog, requiere un Token de Acceso de Databricks con permisos de <strong>Workspace Admin</strong>. Un token con acceso CAN VIEW no permite a Datadog gestionar el script de inicio global de su cuenta de Databricks.</li>
</ul>
</div>

#### Al integrar un espacio de trabajo con Datadog {#when-integrating-a-workspace-with-datadog}

1. En la sección **Seleccionar productos para configurar la integración**, asegúrese de que el producto Data Observability: Jobs Monitoring esté **Habilitado**.
1. En la sección {{< ui >}}Datadog Agent Setup{{< /ui >}}, seleccione el {{< ui >}}Managed by Datadog{{< /ui >}} botón de alternancia.
1. Haga clic en {{< ui >}}Select API Key{{< /ui >}} para seleccionar una clave de API de Datadog existente o crear una nueva clave de API de Datadog.
1. (Opcional) Desactive {{< ui >}}Enable Log Collection{{< /ui >}} si no desea recopilar registros de controlador y trabajador para correlacionar con trabajos.
1. Haga clic en {{< ui >}}Save Databricks Workspace{{< /ui >}}.
   {{< img src="data_jobs/databricks/configure-data-jobs-monitoring-new-2.png" alt="En el mosaico de integración de Datadog-Databricks, Datadog Agent Setup al agregar un espacio de trabajo de Databricks. Datadog puede instalar y gestionar un script de inicialización global." style="width:100%;" >}}

#### Al agregar el script de inicialización a un espacio de trabajo de Databricks ya integrado con Datadog {#when-adding-the-init-script-to-a-databricks-workspace-already-integrated-with-datadog}

1. En la pestaña **Configurar**, haga clic en el espacio de trabajo en la lista de espacios de trabajo.
1. Haga clic en la {{< ui >}}Configured Products{{< /ui >}} pestaña.
1. Asegúrese de que el producto Data Observability: Jobs Monitoring esté **Habilitado**.
1. En la sección {{< ui >}}Datadog Agent Setup{{< /ui >}}, seleccione el {{< ui >}}Managed by Datadog{{< /ui >}} botón de alternancia.
1. Haga clic en {{< ui >}}Select API Key{{< /ui >}} para seleccionar una clave de API de Datadog existente o crear una nueva clave de API de Datadog.
1. (Opcional) Desactive {{< ui >}}Enable Log Collection{{< /ui >}} si no desea recopilar registros de controladores y trabajadores para correlacionar con trabajos.
1. Haga clic en **Guardar espacio de trabajo de Databricks** en la parte inferior de la ventana del navegador.
   {{< img src="data_jobs/databricks/configure-data-jobs-monitoring-existing.png" alt="En el mosaico de integración de Datadog-Databricks, configuración del agente de Datadog para un espacio de trabajo de Databricks que ya se ha agregado a la integración. Datadog puede instalar y gestionar un script de inicialización global." style="width:100%;" >}}

Opcionalmente, puede agregar etiquetas a su clúster de Databricks y métricas de rendimiento de Spark configurando la siguiente variable de entorno en la sección {{< ui >}}Advanced Configuration{{< /ui >}} de su clúster en la interfaz de usuario de Databricks o como [variables de entorno de Spark][2] con la API de Databricks:

| Variable                 | Descripción                                                                                                                                                      |
|--------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| DD_TAGS                  | Agregue etiquetas a las métricas de rendimiento del clúster de Databricks y de Spark. Pares clave:valor separados por comas o espacios. Siga las [convenciones de etiquetas de Datadog][1]. Ejemplo: `env:staging,team:data_engineering` |
| DD_ENV                   | Establezca la etiqueta de entorno `env` en métricas, trazas y registros de este clúster. |
| DD_LOGS_CONFIG_PROCESSING_RULES | Filtre los registros recopilados con reglas de procesamiento. Consulte [Recopilación avanzada de registros][3] para más detalles. |


[1]: /es/getting_started/tagging/
[2]: https://docs.databricks.com/api/workspace/clusters/edit#spark_env_vars
[3]: /es/agent/logs/advanced_log_collection/?tab=environmentvariable#global-processing-rules
[4]: https://docs.databricks.com/aws/en/compute/serverless/

{{% /tab %}}

{{% tab "Configure manualmente una política de clúster" %}}

Este enfoque se recomienda para clústeres en modo de acceso **Estándar**.

**Cree el script de inicialización**

1. En Databricks, cree un archivo de script de inicialización en un [Unity Catalog volume][26] con el siguiente contenido. Asegúrese de anotar la ruta del volumen (por ejemplo, `/Volumes/catalog_name/schema_name/volume_name/datadog-init-script.sh`).

    ```shell
    #!/bin/bash

    # Download and run the latest init script
    curl -L https://install.datadoghq.com/scripts/install-databricks.sh > djm-install-script
    bash djm-install-script || true
    ```

    The script above downloads and runs the latest init script for Data Observability: Jobs Monitoring in Databricks. If you want to pin your script to a specific version, you can replace the filename in the URL with `install-databricks-0.14.0.sh` to use version `0.14.0`, for example. The source code used to generate this script, and the changes between script versions, can be found on the [Datadog Agent repository][3].

1. Conceda permisos de solo lectura al script de inicialización:
    1. A nivel de volumen, conceda el permiso `READ VOLUME` a todos los usuarios de la cuenta.
    1. A nivel de catálogo, conceda el permiso `USE CATALOG` a todos los usuarios de la cuenta.

1. **Agregue el script de inicialización a la lista de permitidos**: Para clústeres en modo de acceso **Standard**, debe agregar la ruta del script de inicialización a la lista de permitidos de Unity Catalog. Siga las instrucciones en la [documentación de Databricks][27] para agregar la ruta de su script de inicialización a la lista de permitidos.

**Configure la política de cómputo**

1. En {{< ui >}}Compute{{< /ui >}}, navegue a la pestaña {{< ui >}}Policies{{< /ui >}}. Si ya tiene una política de clúster aplicada a sus clústeres, navegue a esa política existente para editarla. Este es el enfoque más simple, ya que la política se aplica automáticamente a todos los clústeres que la utilizan. De lo contrario, haga clic en {{< ui >}}Create Policy{{< /ui >}} para crear una nueva política.
1. Para agregar el script de inicialización a la política del clúster, en la sección {{< ui >}}Definition{{< /ui >}}, haga clic en {{< ui >}}Add Definition{{< /ui >}}. En el modal que se abre, completa los campos:
   1. En el menú desplegable {{< ui >}}Field{{< /ui >}}, seleccione {{< ui >}}init_scripts{{< /ui >}}.
   1. En el menú desplegable {{< ui >}}Source{{< /ui >}}, seleccione {{< ui >}}Volume{{< /ui >}}.
   1. Bajo {{< ui >}}Destination{{< /ui >}}, ingrese la ruta del volumen a su script de inicialización.
   1. Haga clic en {{< ui >}}Add{{< /ui >}}.
1. Configure las variables de entorno. Debe agregar cada una de las siguientes variables de entorno a la política del clúster que creó:

   | Clave                  | Descripción                  |
   |----------------------|------------------------------|
   | DD_API_KEY           | Su [clave de API de Datadog][1].   |
   | DD_SITE              | Su [sitio de Datadog][2].      |
   | DATABRICKS_WORKSPACE | Nombre de su espacio de trabajo de Databricks. Debería coincidir con el nombre proporcionado en el [paso de integración de Datadog-Databricks](#configure-the-datadog-databricks-integration). Encierre el nombre entre comillas dobles si contiene espacios en blanco. |

   1. Para cada una de las variables anteriores, en la {{< ui >}}Definition{{< /ui >}} sección, haga clic en {{< ui >}}Add Definition{{< /ui >}}. En el modal que se abre, complete los campos:
       1. En el {{< ui >}}Field{{< /ui >}} menú desplegable, seleccione {{< ui >}}spark_env_vars{{< /ui >}}.
       1. En el {{< ui >}}Key{{< /ui >}} campo, ingrese la clave de la variable de entorno.
       1. En el {{< ui >}}Value{{< /ui >}} campo, ingrese el valor de la variable de entorno.
       1. En el menú desplegable {{< ui >}}Type{{< /ui >}}, seleccione {{< ui >}}Fixed{{< /ui >}}.
       1. Marque la casilla {{< ui >}}Hidden{{< /ui >}} para reducir la exposición de valores sensibles.
   1. Opcionalmente, establezca otros parámetros de script de inicialización y variables de entorno de Datadog, como `DD_ENV` y `DD_SERVICE`. Puedes configurar el script utilizando los siguientes parámetros:

      | Variable                 |  Descripción                                                                                                                                                      |  Predeterminado |
      |--------------------------| ------------------------------------------------------------------------------------------------------------------------------------------------------------------| ---------|
      | DRIVER_LOGS_ENABLED      | Recopile registros del driver de Spark en Datadog.                                                                                                                          | falso   |
      | WORKER_LOGS_ENABLED      | Recopile registros de los workers de Spark en Datadog.                                                                                                                            | falso   |
      | DD_TAGS                  | Agregue etiquetas al clúster de Databricks y a las métricas de rendimiento de Spark, utilizando pares clave:valor separados por comas o espacios. Sigue [las convenciones de etiquetas de Datadog][4]. Ejemplo: `env:staging,team:data_engineering` |         |
      | DD_ENV                   | Establezca la etiqueta de entorno `env` en métricas, trazas y registros de este clúster.                                                                                          |         |
      | DD_LOGS_CONFIG_PROCESSING_RULES | Filtre los registros recopilados con reglas de procesamiento. Consulte [Recopilación Avanzada de Registros][5] para más detalles. |         |

1. Haga clic en {{< ui >}}Create{{< /ui >}} si crea una nueva política o en {{< ui >}}Save{{< /ui >}} si actualiza una política existente. Si actualiza una política existente, todos los clústeres que utilizan esa política aplicarán automáticamente los cambios en su próximo reinicio. Si crea una nueva política, siga los pasos a continuación para aplicarla a sus clústeres.

**Aplique la política del clúster a los clústeres**

1. En {{< ui >}}Compute{{< /ui >}}, seleccione el clúster que desea actualizar o haga clic en {{< ui >}}Create Compute{{< /ui >}} para un nuevo clúster.
1. En el menú desplegable {{< ui >}}Policy{{< /ui >}} en la parte superior, seleccione la política que creó.
1. Haga clic en {{< ui >}}Confirm{{< /ui >}} para guardar los cambios. El clúster necesita reiniciarse para que la política surta efecto.

[1]: https://app.datadoghq.com/organization-settings/api-keys
[2]: /es/getting_started/site/
[3]: https://github.com/DataDog/datadog-agent/blob/main/pkg/fleet/installer/setup/djm/databricks.go
[4]: /es/getting_started/tagging/
[5]: /es/agent/logs/advanced_log_collection/?tab=environmentvariable#global-processing-rules
[26]: https://docs.databricks.com/en/connect/unity-catalog/volumes.html
[27]: https://docs.databricks.com/en/data-governance/unity-catalog/manage-privileges/allowlist#how-to-add-items-to-the-allowlist

{{% /tab %}}

{{% tab "Instale un script de inicialización global manualmente" %}}

<div class="alert alert-danger">
Esta configuración no funciona en clústeres de Databricks en modo de acceso <strong>Estándar</strong>, porque no se pueden instalar scripts de inicialización global en esos clústeres. Si utiliza clústeres con el modo de acceso <strong>Estándar</strong>, Datadog recomienda <a href="?tab=manuallyconfigureaclusterpolicy#install-the-datadog-agent">configurar manualmente una política de clúster</a> o <a href="?tab=manuallyinstallonaspecificcluster#install-the-datadog-agent">instalar manualmente en un clúster específico</a>.
</div>

1. En Databricks, haga clic en su nombre de usuario (dirección de correo electrónico) en la esquina superior derecha de la página.
1. Seleccione {{< ui >}}Settings{{< /ui >}} y haga clic en la pestaña {{< ui >}}Compute{{< /ui >}}.
1. En la sección {{< ui >}}All purpose clusters{{< /ui >}}, junto a {{< ui >}}Global init scripts{{< /ui >}}, haga clic en {{< ui >}}Manage{{< /ui >}}.
1. Haga clic en {{< ui >}}Add{{< /ui >}}. Nombre su script. Luego, en el campo {{< ui >}}Script{{< /ui >}}, copie y pegue el siguiente script, recordando reemplazar los marcadores de posición con los valores de sus parámetros.

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

   El script anterior establece los parámetros requeridos, y descarga y ejecuta el último script de inicialización para Data Observability: Jobs Monitoring en Databricks. Si desea fijar su script a una versión específica, puede reemplazar el nombre del archivo en la URL con `install-databricks-0.14.0.sh` para usar la versión `0.14.0`, por ejemplo. El código fuente utilizado para generar este script, y los cambios entre las versiones del script, se pueden encontrar en el [repositorio del Datadog Agent][3].

1. Para habilitar el script para todos los nuevos clústeres y los que se reinicien, active {{< ui >}}Enabled{{< /ui >}}.
   {{< img src="data_jobs/databricks/toggle.png" alt="Interfaz de Databricks, configuraciones de administrador, scripts de inicialización global. Un script llamado 'install-datadog-agent' está en una lista con un interruptor habilitado." style="width:100%;" >}}
1. Haga clic en {{< ui >}}Add{{< /ui >}}.

#### Establezca los parámetros requeridos del script de inicialización {#set-the-required-init-script-parameters}

Proporcione los valores para los parámetros del script de inicialización al inicio del script de inicialización global.

```bash
export DD_API_KEY=<YOUR API KEY>
export DD_SITE=<YOUR DATADOG SITE>
export DATABRICKS_WORKSPACE="<YOUR WORKSPACE NAME>"
```

Opcionalmente, también puede establecer otros parámetros del script de inicialización y variables de entorno de Datadog aquí, como `DD_ENV` y `DD_SERVICE`. El script se puede configurar utilizando los siguientes parámetros:

| Variable                 | Descripción                                                                                                                                                      | Predeterminado |
|--------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------|---------|
| DD_API_KEY               | Su [clave de API de Datadog][1].                                                                                                                                        |         |
| DD_SITE                  | Su [sitio de Datadog][2].                                                                                                                                           |         |
| DATABRICKS_WORKSPACE     | Nombre de su espacio de trabajo de Databricks. Debería coincidir con el nombre proporcionado en el [paso de integración de Datadog-Databricks](#configure-the-datadog-databricks-integration). Enciérrelo en comillas dobles si contiene espacios en blanco. |         |
| DRIVER_LOGS_ENABLED      | Recopile registros del driver de Spark en Datadog.                                                                                                                          | falso   |
| WORKER_LOGS_ENABLED      | Recopile registros de los workers de Spark en Datadog.                                                                                                                         | falso   |
| DD_TAGS                  | Agregue etiquetas al clúster de Databricks y a las métricas de rendimiento de Spark. Pares clave:valor separados por comas o espacios. Siga [las convenciones de etiquetas de Datadog][4]. Ejemplo: `env:staging,team:data_engineering` |         |
| DD_ENV                   | Establezca la etiqueta `env` de entorno en métricas, trazas y registros de este clúster.                                                                                          |         |
| DD_LOGS_CONFIG_PROCESSING_RULES | Filtre los registros recopilados con reglas de procesamiento. Consulte [Colección Avanzada de Registros][5] para más detalles. |         |

[1]: https://app.datadoghq.com/organization-settings/api-keys
[2]: /es/getting_started/site/
[3]: https://github.com/DataDog/datadog-agent/blob/main/pkg/fleet/installer/setup/djm/databricks.go
[4]: /es/getting_started/tagging/
[5]: /es/agent/logs/advanced_log_collection/?tab=environmentvariable#global-processing-rules

{{% /tab %}}

{{% tab "Instale manualmente en un clúster específico" %}}

1. En Databricks, cree un archivo de script de inicialización en un [volumen de Catálogo de Unidad][26] con el siguiente contenido. Asegúrese de anotar la ruta del volumen (por ejemplo, `/Volumes/catalog_name/schema_name/volume_name/datadog-init-script.sh`).

   ```shell
   #!/bin/bash

   # Download and run the latest init script
   curl -L https://install.datadoghq.com/scripts/install-databricks.sh > djm-install-script
   bash djm-install-script || true
   ```

   El script anterior descarga y ejecuta el último script de inicialización para Data Observability: Jobs Monitoring en Databricks. Si desea fijar su script a una versión específica, puede reemplazar el nombre del archivo en la URL (por ejemplo, `install-databricks-0.14.0.sh` para usar la versión `0.14.0`). Puede encontrar el código fuente utilizado para generar este script, y los cambios entre versiones de scripts, en el [repositorio del Datadog Agent][3].

1. **Agregue el script de inicialización a la lista de permitidos** (requerido para clústeres en modo de acceso **Estándar**): Si su clúster utiliza el modo de acceso **Estándar**, debe agregar la ruta del script de inicialización a la lista de permitidos del Catálogo de Unidad. Siga las instrucciones en la [documentación de Databricks][27] para agregar la ruta de su script de inicialización a la lista de permitidos.

1. En la página de configuración del clúster, haga clic en el {{< ui >}}Advanced options{{< /ui >}} interruptor.
1. En la parte inferior de la página, vaya a la pestaña {{< ui >}}Init Scripts{{< /ui >}}.

   {{< img src="data_jobs/databricks/init_scripts.png" alt="Interfaz de usuario de Databricks, opciones avanzadas de configuración del clúster, pestaña de Scripts de Inicialización. Un menú desplegable de 'Destino' y un selector de archivo de 'Ruta del script de inicialización'." style="width:80%;" >}}

   - En el menú desplegable {{< ui >}}Destination{{< /ui >}}, seleccione {{< ui >}}Volume{{< /ui >}}.
   - Bajo {{< ui >}}Init script path{{< /ui >}}, ingrese la ruta del volumen a su script de inicialización.
   - Haga clic en {{< ui >}}Add{{< /ui >}}.

#### Establezca los parámetros requeridos del script de inicialización {#set-the-required-init-script-parameters-1}

1. En Databricks, en la página de configuración del clúster, haga clic en el {{< ui >}}Advanced options{{< /ui >}} interruptor.
2. En la parte inferior de la página, vaya a la pestaña {{< ui >}}Spark{{< /ui >}}.
   {{< img src="data_jobs/databricks/configure-databricks-cluster-init-script-quoted.png" alt="Interfaz de usuario de Databricks, opciones avanzadas de configuración del clúster, pestaña Spark. Un cuadro de texto titulado 'Variables de entorno' contiene valores para DD_API_KEY y DD_SITE." style="width:100%;" >}}

   En el {{< ui >}}Environment variables{{< /ui >}} cuadro de texto, proporcione los valores para los parámetros del script de inicialización.

   ```text
   DD_API_KEY=<YOUR API KEY>
   DD_SITE=<YOUR DATADOG SITE>
   DATABRICKS_WORKSPACE="<YOUR WORKSPACE NAME>"
   ```

   Opcionalmente, también puede establecer otros parámetros del script de inicialización y variables de entorno de Datadog aquí, como `DD_ENV` y `DD_SERVICE`. El script se puede configurar utilizando los siguientes parámetros:

| Variable                 | Descripción                                                                                                                                                      | Predeterminado |
|--------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------|---------|
| DD_API_KEY               | Su [clave de API de Datadog][1].                                                                                                                                        |         |
| DD_SITE                  | Su [sitio de Datadog][2].                                                                                                                                           |         |
| DATABRICKS_WORKSPACE     | Nombre de su espacio de trabajo de Databricks. Debería coincidir con el nombre proporcionado en el [paso de integración de Datadog-Databricks](#configure-the-datadog-databricks-integration). Enciérrelo en comillas dobles si contiene espacios en blanco. |         |
| DRIVER_LOGS_ENABLED      | Recopilar registros del driver de Spark en Datadog.                                                                                                                          | falso   |
| WORKER_LOGS_ENABLED      | Recopilar registros de los workers de Spark en Datadog.                                                                                                                         | falso   |
| DD_TAGS                  | Agregar etiquetas al clúster de Databricks y a las métricas de rendimiento de Spark. Pares clave:valor separados por comas o espacios. Siga [las convenciones de etiquetas de Datadog][4]. Ejemplo: `env:staging,team:data_engineering` |         |
| DD_ENV                   | Establezca la etiqueta `env` de entorno en métricas, trazas y registros de este clúster.                                                                                          |         |
| DD_LOGS_CONFIG_PROCESSING_RULES | Filtre los registros recopilados con reglas de procesamiento. Consulte [Recopilación Avanzada de Registros][5] para más detalles. |         |


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

El script de inicialización instala el Datadog Agent cuando los clústeres se inician.

Los clústeres de propósito general que ya están en ejecución o los clústeres de trabajos de larga duración deben reiniciarse manualmente para que el script de inicialización instale el Datadog Agent.

Para trabajos programados que se ejecutan en clústeres de trabajos, el script de inicialización instala automáticamente el Datadog Agent en la próxima ejecución.

## Validación {#validation}

En Datadog, vea la página [Data Observability: Jobs Monitoring][6] para ver una lista de todos sus trabajos de Databricks.

Si algunos trabajos no son visibles, navegue a la página [Configuración][9] para entender por qué. Esta página lista todos sus trabajos de Databricks que aún no están configurados con el Agente en sus clústeres, junto con orientación para completar la configuración.

## Solución de problemas {#troubleshooting}

Si no ve ningún dato en DJM después de instalar el producto, siga estos pasos.

1. **Validación de la clave de API:** Si el script de inicialización fue instalado manualmente, pero los datos del clúster aún no aparecen en el producto DJM, utilice el [punto de conexión de validación de la clave de API][25] para asegurarse de que la clave de API de Datadog especificada en el script sea válida.
1. **Validación del Datadog Agent:** El script de inicialización instala el Datadog Agent. Para asegurarse de que esté correctamente instalado, conéctese al clúster mediante SSH y ejecute el comando de estado del Datadog Agent:
  ```shell
  sudo datadog-agent status
  ```

## Configuración Avanzada {#advanced-configuration}

### Filtrar la recolección de registros en clústeres {#filter-log-collection-on-clusters}

#### Excluir toda la recolección de registros de un clúster individual {#exclude-all-log-collection-from-an-individual-cluster}
Configure la siguiente variable de entorno en la {{< ui >}}Advanced Configuration{{< /ui >}} sección de su clúster en la interfaz de usuario de Databricks o como una [variable de entorno de Spark][18] en la API de Databricks.

```bash
DD_LOGS_CONFIG_PROCESSING_RULES=[{\"type\": \"exclude_at_match\",\"name\": \"drop_all_logs\",\"pattern\": \".*\"}]
```

### Permisos {#permissions}
Conceda {{< ui >}}Workspace Admin{{< /ui >}} privilegios al usuario o principal de servicio que se conecta a su espacio de trabajo de Databricks. Esto permite que Datadog gestione las instalaciones y actualizaciones de scripts de inicialización automáticamente, reduciendo el riesgo de una mala configuración.

Si necesita un control más granular, conceda estos permisos mínimos a los siguientes [objetos a nivel de espacio de trabajo][19] para poder seguir monitoreando todos los trabajos, clústeres y consultas dentro de un espacio de trabajo:

| Objeto                 | Permiso                                                                                                                                                      |
|--------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Job                              | [CAN VIEW][20]
| Compute                          | [CAN ATTACH TO][21]
| Lakeflow Declarative Pipelines   | [CAN VIEW][22]
| Query                            | [CAN VIEW][23]
| SQL warehouse                    | [CAN MONITOR][24]

Adicionalmente, para que Datadog acceda a sus datos de Cloud Cost de Databricks en Data Observability: Jobs Monitoring o [Cloud Cost Management][26], el usuario o principal de servicio utilizado para consultar [system tables][27] debe tener los siguientes permisos:
   - `CAN USE` permiso en el Almacén SQL.
   Acceso de lectura a las [system tables][27] dentro de Unity Catalog. Esto se puede otorgar con:
   ```sql
   GRANT USE CATALOG ON CATALOG system TO <service_principal>;
   GRANT SELECT ON CATALOG system TO <service_principal>;
   GRANT USE SCHEMA ON CATALOG system TO <service_principal>;
   ```
   El usuario que otorga estos permisos debe tener el privilegio `MANAGE` sobre `CATALOG system`.


### Etiquetado de tramos en tiempo de ejecución {#tag-spans-at-runtime}

{{% djm-runtime-tagging %}}

### Agregación de métricas de clúster para ejecuciones de trabajos únicos {#aggregate-cluster-metrics-from-one-time-job-runs}
   Esta configuración es aplicable si desea datos de utilización de recursos del clúster sobre sus trabajos y crear un nuevo trabajo y clúster para cada ejecución a través del [one-time run API endpoint][8] (común al usar herramientas de orquestación fuera de Databricks, como Airflow o Azure Data Factory).

   Si está enviando trabajos de Databricks a través del [one-time run API endpoint][8], cada ejecución de trabajo tiene un ID de trabajo único. Esto puede dificultar la agrupación y el análisis de métricas de clúster para trabajos que utilizan clústeres efímeros. Para agregar la utilización del clúster del mismo trabajo y evaluar el rendimiento a través de múltiples ejecuciones, debe establecer la variable `DD_JOB_NAME` dentro del `spark_env_vars` de cada `new_cluster` al mismo valor que el `run_name` de su carga útil de solicitud.

   Aquí hay un ejemplo de un cuerpo de solicitud de ejecución de trabajo único:

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
Con [Databricks Networking Restrictions][12], Datadog puede no tener acceso a las APIs de Databricks, lo cual es necesario para recopilar trazas de las ejecuciones de trabajos de Databricks junto con etiquetas y otros metadatos.

Si está controlando el acceso a la API de Databricks con [IP access lists][13], incluya en la lista de acceso la dirección específica de Datadog {{< region-param key="ip_ranges_url_webhooks" link="true" text="webhook IP addresses" >}} permite a Datadog conectarse a las APIs de Databricks en su espacio de trabajo. Consulte la documentación de Databricks para configurar listas de acceso IP para [espacios de trabajo individuales][16] para otorgar acceso a la API de Datadog.

Para hacer seguimiento de espacios de trabajo que utilizan conectividad de [Databricks Private Link][14], consulte [Conectividad de Private Link (Vista Previa)][15].

[15]: /es/data_observability/jobs_monitoring/databricks/private_link

## Lectura adicional {#further-reading}

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