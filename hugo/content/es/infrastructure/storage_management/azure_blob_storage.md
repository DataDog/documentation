---
further_reading:
- link: https://www.datadoghq.com/blog/datadog-storage-monitoring/
  tag: Blog
  text: Optimiza y soluciona los problemas de almacenamiento en la nube a escala con
    Storage Monitoring
- link: https://www.datadoghq.com/blog/storage-monitoring-recommendations/
  tag: Blog
  text: Reduce los costos de almacenamiento en la nube y mejora la eficiencia operativa
    con Datadog Storage Monitoring
title: Storage Management para Microsoft Azure Blob Storage
---

{{< callout url="https://www.datadoghq.com/product-preview/storage-monitoring/" >}}
  Storage Management está en vista previa. Solicita acceso para comenzar a monitorizar tu almacenamiento de objetos.
{{< /callout >}}

## Instalación

{{< tabs >}}
{{% tab "Azure CLI" %}}

Habilita los inventarios para las cuentas de almacenamiento seleccionadas en cada suscripción ejecutando la siguiente secuencia de scripts en tu [Azure Cloud Shell][301]:

```shell
curl https://datadogstoragemonitoring.blob.core.windows.net/scripts/install.sh \
  | bash -s -- <CLIENT_ID> <SUBSCRIPTION_ID> <COMMA_SEPARATED_STORAGE_ACCOUNT_NAMES>
```

Antes de ejecutar el script, configura tu [entorno shell][302] en Bash y sustituye las distintas entradas de marcador de posición por los valores correctos:
- `<CLIENT_ID>`: El ID del cliente de un registro de aplicación ya configurado mediante la [integración de Datadog Azure][302]
- `<SUBSCRIPTION_ID>`: El ID de la suscripción de Azure que contiene las cuentas de almacenamiento
- `<COMMA_SEPARATED_STORAGE_ACCOUNT_NAMES>`: Una lista separada por comas de las cuentas de almacenamiento que deseas monitorizar (por ejemplo, `storageaccount1,storageaccount2`)

[301]: https://shell.azure.com
[302]: /es/integrations/azure/#setup
[303]: https://learn.microsoft.com/en-us/azure/cloud-shell/get-started/classic?tabs=azurecli#select-your-shell-environment
{{% /tab %}}

{{% tab "Azure Portal" %}}

Para cada cuenta de almacenamiento que desees monitorizar, sigue todos los pasos que se indican a continuación:

### Crear una política de inventario de blobs
1. En el portal de Azure, ve a tu cuenta de almacenamiento.
2. Ve a **Gestión de datos** > **Inventario de blobs**.
3. Haz clic en **Add** (Añadir).
4. Configura la política:
   - Nombre: **datadog-storage-monitoring**
   - Contenedor de destino:
      - Haz clic en **Crear nuevo** e introduce el nombre `datadog-storage-monitoring`.
   - Tipo de objeto a inventariar: **Blob**
   - Schedule (horario): **Diario**
   - Tipos de blobs: Selecciona **Block blobs**, **Append blobs** y **Page blobs**.
   - Subtipos: Selecciona **Incluir versiones de blobs**
   - Campos de esquema: Selecciona Todos o asegúrate de que al menos los siguientes están seleccionados:
      - **Nombre**
      - **Nivel de acceso**
      - **Última modificación**
      - **Longitud del contenido**
      - **Servidor cifrado**
      - **Estado de la versión actual**
      - **ID de la versión**
   - Prefijo de exclusión: datadog-storage-monitoring
5. Haz clic en **Add** (Añadir).

### Añadir la asignación de roles
1. En el portal de Azure, ve a tu cuenta de almacenamiento.
2. Ve a **Almacenamiento de datos** > **Contenedores**.
3. Haz clic en el contenedor **datadog-storage-monitoring**.
4. Haz clic en **Control de acceso (IAM)** en el menú de la izquierda.
5. Haz clic en **Añadir** > **Añadir asignación de roles**.
6. Completa la asignación de roles:
    - Rol: Selecciona **Lector de Datos de Blob de Almacenamiento**. Haz clic en **Siguiente**.
    - Asignar acceso a: **Usuario, grupo o entidad de servicio**.
    - Miembros: Haz clic en **+ Seleccionar miembros** y busca tu Registro de aplicación por su nombre y selecciónalo.
    - **Nota**: Esto debería ser un Registro de aplicación configurado en la integración de Azure de Datadog. Recuerda el ID del cliente para más adelante.
7.  Haz clic en **Revisar + asignar**.

{{% /tab %}}
{{< /tabs >}}

### Después de la instalación

Una vez finalizados los pasos anteriores, rellena el [formulario posterior a la configuración][1].

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://forms.gle/WXFbGyBwWfEo3gbM7