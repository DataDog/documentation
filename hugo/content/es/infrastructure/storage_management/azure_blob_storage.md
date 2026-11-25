---
further_reading:
- link: https://www.datadoghq.com/blog/datadog-storage-monitoring/
  tag: Blog
  text: Optimice y solucione problemas de almacenamiento en la nube a escala con Storage
    Monitoring
- link: https://www.datadoghq.com/blog/storage-monitoring-recommendations/
  tag: Blog
  text: Reduzca los costos de almacenamiento en la nube y mejore la eficiencia operativa
    con Datadog Storage Monitoring
title: Storage Management para Microsoft Azure Blob Storage
---
{{< callout url="https://www.datadoghq.com/product-preview/storage-monitoring/" >}}
  Storage Management está en versión preliminar. Solicite acceso para comenzar a monitorear su almacenamiento de objetos.
{{< /callout >}}

## Configuración {#setup}

<div class="alert alert-info">La integración con Azure Marketplace no es compatible con Storage Management. Debe usar un <a href="/integrations/azure">App Registration</a> para conectar Azure a Datadog.</div>

{{< tabs >}}

{{% tab "CLI de Azure" %}}

1. Vaya a **Storage Management** > **Azure Blob Storage** > [**Enable buckets**][304].
2. Seleccione las cuentas de almacenamiento que desea habilitar para Storage Management.
3. Ejecute los comandos de la CLI en su [Azure Cloud Shell][301] generados en la parte inferior de la tabla. Antes de ejecutar el script, configure su entorno de shell en Bash. 
4. Después de ejecutar el script, haga clic en **Confirm** y espere de 24 a 48 horas para que las métricas de Storage Management estén disponibles.

[301]: https://shell.azure.com
[302]: /es/integrations/azure/#setup
[303]: https://learn.microsoft.com/en-us/azure/cloud-shell/get-started/classic?tabs=azurecli#select-your-shell-environment
[304]: https://app.datadoghq.com/storage-management?mConfigure=true&mView=azure

{{% /tab %}}

{{% tab "Azure Portal" %}}

Para cada cuenta de almacenamiento que desee monitorear, siga estos pasos:

{{% collapse-content title="1. Cree una política de inventario de blobs" level="h4" expanded=false id="azure-portal-step1" %}}

1. En el portal de Azure, vaya a su Storage Account.
2. Vaya a **Data management** > **Blob inventory**.
3. Haga clic en **Add**.
4. Configure la política:
   - Name: **datadog-storage-monitoring**
   - Destination container:
      - Haga clic en **Create new** e ingrese el nombre `datadog-storage-monitoring`.
   - Object type to inventory: **Blob**
   - Horario: **Daily**
   - Blob types: Seleccione **Block blobs**, **Append blobs** y **Page blobs**.
   - Subtypes: Seleccione **Include blob versions**
   - Schema fields: Seleccione All o asegúrese de que al menos estén seleccionados los siguientes campos:
      - **Name**
      - **Access tier**
      - **Last modified**
      - **Content length**
      - **Server encrypted**
      - **Current version status**
      - **Version ID**
   - Exclude prefix: datadog-storage-monitoring
5. Haga clic en **Add**.

{{% /collapse-content %}}

{{% collapse-content title="2. Agregue la asignación de roles" level="h4" expanded=false id="azure-portal-step2" %}}

1. En el portal de Azure, vaya a su Storage Account.
2. Vaya a **Data storage** > **Containers**.
3. Haga clic en el contenedor **datadog-storage-monitoring**.
4. Haga clic en **Access control (IAM)** en el menú de la izquierda.
5. Haga clic en **Add** > **Add role assignment**.
6. Complete la asignación de roles:
    - Role: Seleccione **Storage Blob Data Reader**. Haga clic en **Next**.
    - Assign access to: **User, group, or service principal**.
    - Members: Haga clic en **+ Select members**, busque su App Registration por nombre y selecciónelo.
    - **Nota**: Debe ser un App Registration configurado en la integración de Azure de Datadog. Tenga a mano el Client ID para más adelante.
7.  Haga clic en **Review + assign**.

{{% /collapse-content %}}

### Habilite las cuentas de almacenamiento en Datadog {#enable-storage-accounts-in-datadog}

Después de configurar la política de inventario de blobs y la asignación de roles, habilite cada cuenta de almacenamiento en Datadog. Utilice la interfaz de usuario de Datadog o la API.

#### Interfaz de usuario de Datadog {#datadog-ui}

Vaya a **Datadog** > **Storage Management** > **Azure Blob Storage** > [**Enable buckets**][401]. Seleccione las cuentas de almacenamiento en las que habilitó el inventario y haga clic en **Confirm**.

#### API {#api}

Registre cada cuenta de almacenamiento en Storage Management llamando al punto de conexión [Enable Storage Management for a bucket][402]. El App Registration debe estar conectado a Datadog mediante la [integración de Azure][403].

Antes de ejecutar el siguiente comando `curl`, establezca estas variables de entorno:
- `DD_SITE`: Su [sitio de Datadog][404], {{< region-param key="dd_site" code="true" >}}. Para mostrar el valor de un sitio diferente, utilice el selector de sitio en esta página.
- `DD_API_KEY`: Una [clave de API][405] de Datadog.
- `DD_APP_KEY`: Una [clave de aplicación][406] de Datadog con el [permiso][407] **Cloud Inventory Write**.

```bash
curl -X PUT "https://api.${DD_SITE}/api/v2/cloudinventoryservice/syncconfigs" \
  -H "Accept: application/json" \
  -H "Content-Type: application/json" \
  -H "DD-API-KEY: ${DD_API_KEY}" \
  -H "DD-APPLICATION-KEY: ${DD_APP_KEY}" \
  -d '{
    "data": {
      "id": "azure",
      "type": "cloud_provider",
      "attributes": {
        "azure": {
          "client_id": "<CLIENT_ID>",
          "tenant_id": "<TENANT_ID>",
          "subscription_id": "<SUBSCRIPTION_ID>",
          "resource_group": "<RESOURCE_GROUP>",
          "storage_account": "<STORAGE_ACCOUNT>",
          "container": "<INVENTORY_CONTAINER>"
        }
      }
    }
  }'
```

Para utilizar el comando `curl` anterior:
- Reemplace `<CLIENT_ID>` por el **Application (client) ID** del App Registration que tiene el rol **Storage Blob Data Reader** en el contenedor de inventario.
- Reemplace `<TENANT_ID>` por el **Directory (tenant) ID** de ese App Registration.
- Reemplace `<SUBSCRIPTION_ID>` con el ID de la suscripción de Azure que contiene la cuenta de almacenamiento.
- Reemplace `<RESOURCE_GROUP>` con el nombre del grupo de recursos que contiene la cuenta de almacenamiento.
- Reemplace `<STORAGE_ACCOUNT>` con el nombre de la cuenta de almacenamiento en la que está configurada la política de inventario de blobs.
- Reemplace `<INVENTORY_CONTAINER>` con el nombre del contenedor de destino para los informes de inventario de blobs, por ejemplo, `datadog-storage-monitoring`. Datadog lee los informes de inventario de todo el contenedor.

Todos los campos son obligatorios. Realice una solicitud por cuenta de almacenamiento. Una respuesta `200` confirma que Storage Management está habilitado para la cuenta de almacenamiento.

[401]: https://app.datadoghq.com/storage-management?mConfigure=true&mView=azure
[402]: /es/api/latest/storage-management/#enable-storage-management-for-a-bucket
[403]: /es/integrations/azure/#setup
[404]: /es/getting_started/site/
[405]: /es/account_management/api-app-keys/#api-keys
[406]: /es/account_management/api-app-keys/#application-keys
[407]: /es/account_management/rbac/permissions/

{{% /tab %}}
{{< /tabs >}}

### Validación {#validation}

Para verificar su configuración:
1. Espere a que se genere el primer informe de inventario. Las métricas de Storage Management pueden tardar entre 24 y 48 horas en estar disponibles.
2. Vaya a **Infrastructure** > [**Storage Management**][1], seleccione **Monitored buckets** y confirme que las cuentas de almacenamiento que configuró aparezcan en la lista del explorador.

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/storage-management