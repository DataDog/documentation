---
description: 'Configure Data Observability: Jobs Monitoring para espacios de trabajo
  de Databricks implementados con Private Link Connectivity mediante un Private Action
  Runner.'
further_reading:
- link: /data_observability/jobs_monitoring/databricks
  tag: Documentación
  text: 'Data Observability: Jobs Monitoring para Databricks'
- link: /actions/private_actions
  tag: Documentación
  text: Private Action Runners
title: Conectividad de Private Link
---
<div class="alert alert-info">El hacer un seguimiento de Databricks a través de Private Link Connectivity se encuentra en versión preliminar.</div>

Los espacios de trabajo de Databricks implementados mediante [Private Link Connectivity][1] están aislados de la internet pública, lo que impide que Datadog acceda directamente a las API de Databricks. Para hacer un seguimiento de estos espacios de trabajo, implemente un [Private Action Runner][2] (PAR) en su entorno. El runner consulta a Datadog para obtener solicitudes, las ejecuta localmente contra la API de Databricks y envía los resultados de vuelta a través de su [punto de conexión Datadog VPC][3] existente.

## Arquitectura {#architecture}

El seguimiento de Private Link se basa en la [arquitectura de sondeo][4] del Private Action Runner. Datadog proporciona una versión personalizada de la imagen del Private Action Runner que incluye un [script][5] para consultar la API de Databricks.

{{< img src="data_jobs/databricks/privatelink-architecture-2.png" alt="Diagrama de arquitectura que muestra al Private Action Runner consultando a Datadog para obtener solicitudes, ejecutándolas contra la API de Databricks y devolviendo los resultados a través del punto de conexión VPC." style="width:100%;" >}}

El flujo de solicitudes funciona de la siguiente manera:

1. El [Private Action Runner][2] se comunica con el backend de Datadog (ya sea a través de la internet pública o utilizando [Private Link][3]) para consultar solicitudes pendientes. Si se encuentra una solicitud, los detalles se devuelven al runner.
1. Las credenciales de Databricks (ID de cliente y secreto) se recuperan del almacenamiento de secretos. Se genera un token para la sesión llamando a la API de Databricks desde el runner utilizando esas credenciales.
1. El runner ejecuta la consulta obtenida contra la API de Databricks. Los resultados se devuelven al runner.
1. El runner reenvía los resultados al backend de Datadog para su procesamiento.

Toda la autenticación ante Datadog es gestionada por el Private Action Runner subyacente. Durante la instalación, se configura una lista de permitidos local en el runner para restringir las acciones que se pueden realizar solo a aquellas que sean necesarias. También puede configurar controles de acceso dentro de Datadog para administrar qué usuarios y equipos pueden usar el runner. Consulte [Administrar el acceso a Private Action Runners][16] para obtener más información.

## Instalación {#installation}

### Paso 1: Requisitos previos de Datadog {#step-1-datadog-prerequisites}

1. Establezca la conectividad con los puntos de conexión de Datadog API desde dentro de la VPC, utilizando **uno** de los siguientes métodos:
   - Salida a la internet pública (a través de una puerta de enlace NAT u otro)
   - Salida a Datadog a través de puntos de conexión o servicios de VPC de Private Link:
     - **AWS**: [Configure puntos de conexión de VPC][3] (disponible en US1, AP1 y AP2)
     - **Azure**: [Configuración del servicio Private Link][6] (disponible solo en US3). Esto requiere aprobación en la cuenta de Azure de Datadog. Comuníquese con el soporte de Datadog como se especifica en las instrucciones.
     - **GCP**: [Configure puntos de conexión de Private Service Connect][7] (disponible en US5 y EU1)
1. Cree una cuenta de servicio de Datadog:
   1. Vaya a la página [Cuentas de servicio][8].
   1. Haga clic en **Nueva cuenta de servicio**.
   1. Ingrese un nombre y una dirección de correo electrónico para su cuenta de servicio.
   1. En **Assign Roles**, seleccione el **Datadog Standard Role**. Alternativamente, seleccione un rol personalizado que tenga el permiso `Connections Resolve`.
   1. Haga clic en **Crear cuenta de servicio**.
1. Asegúrese de que [Remote Configuration][17] esté habilitada para su cuenta de Datadog.

### Paso 2: Requisitos previos de Databricks {#step-2-databricks-prerequisites}

{{< tabs >}}

{{% tab "Entidad de servicio administrada de Databricks" %}}

1. Cree una entidad de servicio de Databricks ([documentación de Databricks][9]):
   1. Como administrador del área de trabajo, inicie sesión en el área de trabajo de Databricks.
   1. Haga clic en su nombre de usuario en la barra superior y seleccione **Settings**.
   1. Haga clic en la pestaña **Identity and access**.
   1. Junto a **Service principals**, haga clic en **Manage**.
   1. Haga clic en **Add service principal**, luego haga clic en **Add new** e ingrese un nombre.
      - Alternativamente, para reutilizar un principal de servicio de otra área de trabajo, seleccione un principal de servicio existente y omita el siguiente paso.
   1. Haga clic en **Agregar**.
1. Genere secretos para el principal de servicio de Databricks ([documentación de Databricks][10]):
   1. Seleccione el principal de servicio creado anteriormente.
   1. Haga clic en la pestaña **Secrets**, luego haga clic en **Generate secret**.
   1. Establezca la duración del secreto en días (máximo 730 días).
   1. Haga clic en **Generate**.
   1. Haga que las credenciales de Databricks estén disponibles para el runner utilizando **uno** de los siguientes métodos:
      - **Almacenamiento de secretos en la nube** (AWS Secrets Manager, AWS Parameter Store, Azure Key Vault o Google Cloud Secret Manager): almacene las credenciales como un blob JSON:
        ```json
        {"client_id": "<CLIENT_ID>", "client_secret": "<CLIENT_SECRET>"}
        ```
        Make note of the secret path (AWS ARN, AKV URL, or Google Cloud resource name). You enter this in the integration tile or set it as the `DATABRICKS_SECRET_PATH` environment variable on the runner container or pod.
      - **Environment variables**: Set `DATABRICKS_CLIENT_ID` and `DATABRICKS_CLIENT_SECRET` directly on the runner container or pod. When using this method, leave the **Secret Path** field blank in the integration tile.
1. Aprovisione el acceso al área de trabajo y los derechos para la entidad de servicio. Consulte [Permissions][11] para obtener todos los detalles.
   1. Otorgue al principal de servicio los privilegios de **Workspace Admin**. Esto permite a Datadog administrar las instalaciones y actualizaciones de scripts de inicio automáticamente. Alternativamente, asigne [granular permissions][11] para monitorear trabajos, clústeres y consultas.
      1. Haga clic en la pestaña **Identity and access**.
      1. Junto a **Groups**, haga clic en **Manage**.
      1. Seleccione el grupo **admins**.
      1. Haga clic en **Add members** y seleccione el principal de servicio agregado anteriormente.
      1. Haga clic en **Agregar**.
   1. Para acceder a los datos de costos de Databricks o monitorear trabajos serverless, otorgue al principal de servicio `CAN USE` en el SQL Warehouse y acceso de lectura a [system tables][20] en Unity Catalog. Consulte [Permissions][11] para obtener más detalles.
   1. Para monitorear trabajos serverless, o para usar el monitoreo de SQL warehouse y consultas, agregue el principal de servicio al grupo de nivel de cuenta `databricks_pii_access`. Databricks enmascara el texto de las consultas SQL para los principales fuera de este grupo. Consulte [Query text access][21] para obtener más detalles.

[9]: https://docs.databricks.com/aws/en/admin/users-groups/manage-service-principals?language=Workspace%C2%A0admin%C2%A0settings#-add-service-principals-to-your-account
[10]: https://docs.databricks.com/aws/en/dev-tools/auth/oauth-m2m#-step-1-create-an-oauth-secret
[11]: /es/data_observability/jobs_monitoring/databricks/#permissions
[20]: https://docs.databricks.com/aws/en/admin/system-tables/
[21]: /es/data_observability/jobs_monitoring/databricks/#query-text-access

{{% /tab %}}

{{% tab "Principal de servicio administrado de Microsoft Entra ID" %}}

1. Registre una aplicación de Microsoft Entra ID para el principal de servicio ([documentación de Microsoft Entra][22]):
   1. Inicie sesión en el [centro de administración de Microsoft Entra][23] al menos como Administrador de aplicaciones en la nube.
   1. Vaya a **Entra ID > App registrations**, luego haga clic en **New registration**.
   1. Ingrese un nombre y haga clic en **Register**.
   1. En la página **Información general** de la aplicación, anote el **ID de aplicación (cliente)** y el **ID de directorio (inquilino)**.
1. Genere un secreto de cliente para la aplicación ([documentación de Microsoft Entra][22]):
   1. En la página de la aplicación, haga clic en **Certificados y secretos**.
   1. Haga clic en la pestaña **Client secrets**, luego haga clic en **New client secret**.
   1. Ingrese una descripción y una duración, luego haga clic en **Agregar**.
   1. Copie el valor del secreto generado. Solo se muestra una vez.
   1. Haga que las credenciales de Databricks estén disponibles para el runner utilizando **uno** de los siguientes métodos:
      - **Almacenamiento de secretos en la nube** (AWS Secrets Manager, AWS Parameter Store o Azure Key Vault): Almacene las credenciales como un blob JSON:
        ```json
        {"client_id": "<CLIENT_ID>", "client_secret": "<CLIENT_SECRET>", "tenant_id": "<TENANT_ID>"}
        ```
        Make note of the secret path (AWS ARN or AKV URL). You enter this in the integration tile or set it as the `DATABRICKS_SECRET_PATH` environment variable on the runner container or pod.
      - **Environment variables**: Set `DATABRICKS_CLIENT_ID`, `DATABRICKS_CLIENT_SECRET`, and `DATABRICKS_AZURE_TENANT_ID` directly on the runner container or pod. When using this method, leave the **Secret Path** field blank in the integration tile.
1. Agregue la aplicación a Databricks como una entidad de servicio administrada de Microsoft Entra ID ([documentación de Databricks][24]):
   1. Como administrador del área de trabajo, inicie sesión en el área de trabajo de Databricks.
   1. Haga clic en su nombre de usuario en la barra superior y seleccione **Settings**.
   1. Haga clic en la pestaña **Identity and access**.
   1. Junto a **Service principals**, haga clic en **Manage**.
   1. Haga clic en **Agregar entidad de servicio**, luego haga clic en **Agregar nuevo**.
   1. Seleccione **Administrado por Microsoft Entra ID**, luego pegue el **ID de aplicación (cliente)** anotado anteriormente.
   1. Ingrese un nombre y haga clic en **Agregar**.
1. Aprovisione el acceso al área de trabajo y los derechos para la entidad de servicio. Consulte [Permissions][11] para obtener todos los detalles.
   1. Otorgue al principal de servicio los privilegios de **Workspace Admin**. Esto permite a Datadog administrar las instalaciones y actualizaciones de scripts de inicio automáticamente. Alternativamente, asigne [granular permissions][11] para monitorear trabajos, clústeres y consultas.
      1. Haga clic en la pestaña **Identity and access**.
      1. Junto a **Groups**, haga clic en **Manage**.
      1. Seleccione el grupo **admins**.
      1. Haga clic en **Add members** y seleccione el principal de servicio agregado anteriormente.
      1. Haga clic en **Agregar**.
   1. Para acceder a los datos de costos de Databricks o monitorear trabajos serverless, otorgue al principal de servicio `CAN USE` en el SQL Warehouse y acceso de lectura a [system tables][20] en Unity Catalog. Consulte [Permissions][11] para obtener más detalles.
   1. Para monitorear trabajos serverless, o para usar el monitoreo de SQL warehouse y consultas, agregue el principal de servicio al grupo de nivel de cuenta `databricks_pii_access`. Databricks enmascara el texto de las consultas SQL para los principales fuera de este grupo. Consulte [Query text access][21] para obtener más detalles.

[11]: /es/data_observability/jobs_monitoring/databricks/#permissions
[20]: https://docs.databricks.com/aws/en/admin/system-tables/
[21]: /es/data_observability/jobs_monitoring/databricks/#query-text-access
[22]: https://learn.microsoft.com/en-us/entra/identity-platform/howto-create-service-principal-portal
[23]: https://entra.microsoft.com
[24]: https://learn.microsoft.com/en-us/azure/databricks/admin/users-groups/manage-service-principals#add-service-principals-to-your-account

{{% /tab %}}

{{< /tabs >}}

### Paso 3: Configure el Private Action Runner {#step-3-set-up-the-private-action-runner}

Configure su Private Action Runner usando **una** de las siguientes opciones.

{{< tabs >}}

{{% tab "Helm (Kubernetes)" %}}

1. Instale el Private Action Runner en su clúster de Kubernetes ([documentación adicional][1], [gráfico de Helm][2]):
   1. Vaya a la página de [configuración de Private Action Runner][3].
   1. Seleccione la opción **Script**, luego haga clic en **Siguiente**.
   1. Siga las instrucciones en **Kubernetes**.
   1. El Private Action Runner debería aparecer en la parte inferior como "instalado correctamente".
1. Actualice el `values.yaml` existente (haciendo referencia a los [valores del gráfico de Helm][4]):
   1. Establecer `image.repository` en `gcr.io/datadoghq/dd-data-observability-par`.
   1. Establecer `image.tag` en `1.21.0-3`.
1. Configure las credenciales en el Private Action Runner usando uno de los siguientes métodos:
    - Establezca las variables de entorno `DATABRICKS_CLIENT_ID` y `DATABRICKS_CLIENT_SECRET` directamente en el runner. Si utiliza una entidad de servicio administrada de Microsoft Entra ID, establezca también `DATABRICKS_AZURE_TENANT_ID`. Deje en blanco la "Ruta del secreto" (Secret Path) en el mosaico de integración.
    - Utilice el almacenamiento de secretos en la nube. Asegúrese de que se asigne una identidad al pod ([Azure Workload Identity][5], [AWS IAM Role][6] o [GKE Workload Identity][7]) con permisos para leer el secreto creado en el [Paso 2](#step-2-databrick-prerequisites), y proporcione la ruta al secreto ya sea a través de la variable de entorno `DATABRICKS_SECRET_PATH`, o proporcionándola en el campo "Ruta del secreto" (Secret Path) en el mosaico de integración.
1. Reinicie el despliegue para que estos cambios surtan efecto.

[1]: https://docs.datadoghq.com/es/actions/private_actions/set_up_standalone/?tab=kuberneteshelm#install-the-runner
[2]: https://github.com/DataDog/helm-charts/tree/main/charts/private-action-runner
[3]: https://app.datadoghq.com/actions/private-action-runners/new
[4]: https://github.com/DataDog/helm-charts/blob/main/charts/private-action-runner/values.yaml
[5]: https://learn.microsoft.com/en-us/azure/aks/workload-identity-deploy-cluster?tabs=new-cluster
[6]: https://docs.aws.amazon.com/eks/latest/userguide/pod-id-association.html
[7]: https://cloud.google.com/kubernetes-engine/docs/how-to/workload-identity

{{% /tab %}}

{{% tab "Docker (VM/EC2)" %}}

1. Instale el Private Action Runner usando Docker ([documentación adicional][1]):
   1. Vaya a la página de [configuración del Private Action Runner][2].
   1. Seleccione la opción **Script**, luego haga clic en **Siguiente**.
   1. Siga las instrucciones en **Docker**.

      **Importante**: Reemplace `gcr.io/datadoghq/private-action-runner:v1.21.0-large` con `gcr.io/datadoghq/dd-data-observability-par:1.21.0-3`.

   1. El Private Action Runner debería aparecer en la parte inferior como "instalado correctamente".
1. Configure las credenciales en el Private Action Runner usando uno de los siguientes métodos:
    - Establezca las variables de entorno `DATABRICKS_CLIENT_ID` y `DATABRICKS_CLIENT_SECRET` directamente en el runner. Si utiliza una entidad de servicio administrada de Microsoft Entra ID, establezca también `DATABRICKS_AZURE_TENANT_ID`. Deje en blanco la "Ruta del secreto" (Secret Path) en el mosaico de integración.
    - Utilice el almacenamiento de secretos en la nube. Asegúrese de que se asigne una identidad a la instancia ([Azure Managed Identity][5], [AWS IAM Role][6] o [GCE cuenta de servicio][7]) con permisos para leer el secreto creado en el [Paso 2](#step-2-databricks-prerequisites), y proporcione la ruta al secreto ya sea a través de la variable de entorno `DATABRICKS_SECRET_PATH`, o proporcionándola en el campo "Secret Path" en el mosaico de integración.

1. Reinicie el contenedor de Docker para que los cambios surtan efecto.

[1]: https://docs.datadoghq.com/es/actions/private_actions/set_up_standalone/?tab=docker#install-the-runner
[2]: https://app.datadoghq.com/actions/private-action-runners/new
[3]: https://learn.microsoft.com/en-us/entra/identity/managed-identities-azure-resources/how-to-configure-managed-identities?pivots=qs-configure-portal-windows-vm
[4]: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/attach-iam-role.html
[5]: https://learn.microsoft.com/en-us/entra/identity/managed-identities-azure-resources/how-to-configure-managed-identities?pivots=qs-configure-portal-windows-vm
[6]: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/attach-iam-role.html
[7]: https://cloud.google.com/compute/docs/access/create-enable-service-accounts-for-instances

{{% /tab %}}

{{< /tabs >}}

**Nota:** Hay otros espejos disponibles si `gcr.io` no está accesible:
- `docker.io/datadog/dd-data-observability-par`
- `public.ecr.aws/datadog/dd-data-observability-par`
- `datadoghq.azurecr.io/dd-data-observability-par`
- `asia-docker.pkg.dev/datadoghq/asia.gcr.io/dd-data-observability-par`

### Paso 4: Configurar Datadog {#step-4-configure-datadog}

1. Adjunte una conexión al Private Action Runner:
   1. Vaya a la página [Private Action Runners][12].
   1. Seleccione el runner instalado.
   1. Seleccione **Finalizar configuración**.
   1. Seleccione **Script**.
   1. Establezca **Ruta al archivo** en `/etc/data-observability/config/script.yaml`.
   1. Seleccione **Siguiente, confirmar acceso**.
   1. Agregue la cuenta de servicio creada en el [Paso 1](#step-1-datadog-prerequisites) con acceso de **Resolver**. Este paso es obligatorio: el ejecutor utiliza esta cuenta de servicio para autenticar las solicitudes de Datadog, y la integración no puede funcionar sin ella.
   1. Seleccione **Crear y probar**. Verifique que los resultados de la prueba no devuelvan un error.
1. Configure la integración de Databricks:
   1. Vaya al mosaico [Integración de Databricks][13].
   1. En **Credenciales**, seleccione **Private Action Runner**.
      1. En **Conexión**, seleccione la conexión creada en el paso anterior.
      1. En **Cuenta de servicio**, seleccione la cuenta de servicio creada en el [Paso 1](#step-1-datadog-prerequisites).
      1. En **Ruta del secreto**, ingrese la ruta del secreto del [Paso 2](#step-2-databricks-prerequisites). Deje este campo en blanco si configuró las credenciales mediante las variables de entorno `DATABRICKS_CLIENT_ID` y `DATABRICKS_CLIENT_SECRET`, o si configuró la ruta mediante la variable de entorno `DATABRICKS_SECRET_PATH` en el ejecutor.
   1. Complete el resto de la configuración de la integración como se describe en [Configure the Datadog-Databricks integration][14]:
      1. Ingrese el **Nombre del área de trabajo**, la **URL del área de trabajo** y el **ID del almacén SQL de tablas del sistema**.
      1. Habilite los productos que le interesan.
         **Nota:** Model Serving detrás de Private Link no es compatible en este momento.
      1. Si habilitó **Jobs Monitoring**, implemente el script de inicio del Datadog Agent para hacer un seguimiento de trabajos y clústeres en cómputo clásico. Siga las instrucciones en [Install the Datadog Agent][19] para configurar el script de inicio, luego reinicie cualquier clúster en ejecución para que los cambios surtan efecto.
   1. Haga clic en **Save Databricks Workspace**.
   1. Verifique que no haya errores al guardar.

## Validación {#validation}

Después de completar la configuración, la información de los trabajos y clústeres debería aparecer en [Data Observability: Jobs Monitoring][15] en breve.

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.databricks.com/aws/en/security/network/front-end/front-end-private-connect
[2]: https://docs.datadoghq.com/es/actions/private_actions/
[3]: https://docs.datadoghq.com/es/agent/guide/private-link/?tab=crossregionprivatelinkendpoints&site=us
[4]: https://docs.datadoghq.com/es/actions/private_actions/#private-action-runner
[5]: https://docs.datadoghq.com/es/actions/private_actions/run_script/
[6]: https://docs.datadoghq.com/es/agent/guide/azure-private-link/?site=us3
[7]: https://docs.datadoghq.com/es/agent/guide/gcp-private-service-connect/?site=us5
[8]: https://app.datadoghq.com/organization-settings/service-accounts
[12]: https://app.datadoghq.com/actions/private-action-runners/
[13]: https://app.datadoghq.com/integrations?search=databr&configPage=new&integrationId=databricks
[14]: /es/data_observability/jobs_monitoring/databricks/#configure-the-datadog-databricks-integration
[15]: https://app.datadoghq.com/data-jobs/
[16]: https://docs.datadoghq.com/es/actions/private_actions/enroll_runner/#manage-access-to-owned-runners
[17]: https://app.datadoghq.com/organization-settings/remote-config
[19]: /es/data_observability/jobs_monitoring/databricks/#install-the-datadog-agent