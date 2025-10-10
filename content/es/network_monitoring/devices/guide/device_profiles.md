---
further_reading:
- link: /network_monitoring/devices/guide/build-ndm-profile/
  tag: Documentación
  text: Crear un perfil NDM (Avanzado)
- link: /network_monitoring/devices/profiles
  tag: Documentación
  text: Más información sobre los perfiles NDM
is_beta: true
site_support_id: snmp_profile_manager
title: Empezando con perfiles de dispositivos
---

{{< callout url="https://www.datadoghq.com/product-preview/easily-onboard-and-start-monitoring-network-devices-to-datadog/" >}}
  SNMP Profile Manager está en vista previa. Completa este formulario para solicitar acceso.
{{< /callout >}}

## Información general

Los perfiles de los dispositivos definen qué métricas recopilar y cómo transformarlas en métricas de Datadog. Se espera que cada [perfil][2] monitorice una clase de dispositivos similares del mismo proveedor. 

La plantilla SNMP Profile Manager proporciona una experiencia guiada basada en GUI para:
- Crear y gestionar perfiles de dispositivos sin problemas.
- Especificar las etiquetas y métricas que se recopilarán de tus dispositivos de red. 
- Verificar los dispositivos coincidentes con cada perfil.
- Revisa un snapshot de los perfiles de dispositivo que creaste en la [página de inventario](#inventory-page).

Para obtener más información sobre los detalles avanzados del perfil, consulta la página [Referencia de formatos de perfiles][3].

## Requisitos previos 

- La versión mínima requerida del Agent es `7.65` o posterior.
- [Configuración remota][14] habilitada para tu organización.
- Permisos necesarios:
  - [Vista de perfiles de dispositivos de NDM][20]: proporciona acceso de solo lectura a la página de perfil. (Incluido en el rol estándar de Datadog).
  - [Editar perfiles de dispositivos de NDM][20]: permite editar los perfiles de los dispositivos. (Incluido en la función de administrador de Datadog).
- Para [aplicar automáticamente los perfiles de dispositivos creados](#apply-a-profile-to-created-devices) mediante la configuración remota, asegúrate de que la siguiente configuración está activada en tu archivo `datadog-agent/conf.d/snmp.d/conf.yaml`:

  {{< highlight yaml "hl_lines=5" >}}
    init_config:
      loader: core
      use_device_id_as_hostname: true
      min_collection_interval: 15
      use_remote_config_profiles: true

    instances:
    ......
  {{< /highlight >}}

## Configurar

### Paso 1: Detalles del perfil

  1. Crea tu propio perfil NDM yendo a [infraestructura > Dispositivos de red > Configuración][1]. 
  2. Haz clic en **SNMP Profile Manager > + Create New Profile** (SNMP Profile Manager > Crear nuevo perfil). Esto te lleva a la página de creación del perfil que se muestra a continuación.
     {{< img src="/network_device_monitoring/profile_onboarding/create_profile_3.png" alt="La página de creación de perfiles de dispositivos de red" style="width:100%;">}}

  3. Proporciona un nombre y una descripción a tu perfil de dispositivo (opcional).
  4. Selecciona `SysObjectID`. Este parámetro ajusta los dispositivos de red a los perfiles de dispositivo. 

     {{< img src="/network_device_monitoring/profile_onboarding/Sys_object_ID_Field_2.png" alt="La página de creación de perfiles del dispositivo de red que muestra el menú desplegable del ID de objeto de sistema" style="width:60%;">}}

### Paso 2: Herencia de perfiles 

Utiliza la herencia de perfiles para adoptar configuraciones como metadatos, métricas y etiquetas. Esto simplifica el escalado de tus perfiles de dispositivos y te permite basarte en los ya existentes. Datadog incluye automáticamente algunos perfiles heredados, (`_base.yaml` `_generic-if.yaml` , `_generic-ip.yaml`, `_generic-ospf.yaml`, `_generic-tcp.yaml` y `_generic-udp.yaml`), que se recomienda **no** eliminar. 

Consulta la lista completa de perfiles heredados en [Perfiles de dispositivo compatibles][16].

1. Mantén el perfil de Datadog `_base.yaml` y cualquier otro perfil heredado de Datadog específico para tus necesidades. Opcionalmente, puedes seleccionar perfiles adicionales para heredar. Los campos correspondientes aparecen a la derecha en Perfiles heredados, con una etiqueta `Inherited` junto a cualquier métrica, etiqueta o metadato heredado:

   {{< img src="/network_device_monitoring/profile_onboarding/profile_inheritance.png" alt="Página de creación del perfil del dispositivo de red que muestra la sección Herencia de perfiles." style="width:100%;">}}

    **Nota**: Los cambios realizados en el perfil principal se aplican automáticamente a los perfiles secundarios. Si necesitas ajustar algún atributo heredado en los perfiles secundarios, como métricas, etiquetas o metadatos, deberás modificar el perfil principal.

### Paso 3: Seleccionar dispositivos de referencia

Utiliza los dispositivos de referencia para seleccionar qué dispositivos deseas recopilar {{< tooltip text="OIDs (Identificadores de objetos)" tooltip="Una dirección o ID únicos en un dispositivo que devuelve el código de respuesta de ese valor cuando se lo consulta." >}} para los modelos de dispositivo elegidos. El campo **reference devices** (dispositivos de referencia) se preselecciona en función del `SysObjectID` especificado en [detalles del perfil](#step-1-profile-details).

1. Mantén la selección actual de dispositivos de referencia para realizar un escaneo de dispositivos. Además, puedes añadir más dispositivos o cambiar la selección actual.

2. Haz clic en **Scan Devices** (Escanear dispositivos) para proceder al paso 4, que inicia el escaneo.

3. Opcionalmente, haz clic en **Proceed Manually** (Proceder manualmente) para proceder sin realizar un escaneo.

  {{< img src="/network_device_monitoring/profile_onboarding/reference_devices.png" alt="Página de creación del perfil del dispositivo de red que muestra la sección Dispositivo de referencia." style="width:100%;">}}

### Paso 4: Escanear dispositivos de referencia

Este paso escanea tus dispositivos para descubrir sus métricas disponibles. Ejecutar un escaneo te permite ver todas las métricas disponibles para tu dispositivo, haciendo más fácil rellenar métricas, metadatos y etiquetas. El escaneo realiza un recorrido de SNMP en tus dispositivos usando la [Configuración remota de Datadog][14].

La pestaña **Scanned Devices** (Dispositivos escaneados) muestra qué dispositivos se escanearon con la Configuración remota o manualmente.

  {{< img src="/network_device_monitoring/profile_onboarding/scan_reference_devices_2.png" alt="Página de creación del perfil del dispositivo de red que muestra la sección Escanar dispositivo de referencia." style="width:80%;">}}

### Paso 5: Definir metadatos

Datadog proporciona valores predeterminados razonables para la mayoría de los dispositivos a través de perfiles predefinidos (OOTB), como el dispositivo y la descripción. Puedes anular estos valores predeterminados en la sección **Define Metadata** (Definir metadatos).

  {{< img src="/network_device_monitoring/profile_onboarding/define_metadata_2.png" alt="Página de creación del perfil del dispositivo de red que muestra la sección Definir métricas." style="width:80%;">}}

  1. Haz clic en el icono del lápiz para editar y modificar cualquiera de los campos de metadatos predeterminados.

  2. La funcionalidad de metadatos está disponible y se muestra en la página de [Network Device Monitoring (NDM)][15] como facetas de búsqueda y en el panel lateral de un dispositivo seleccionado:

     {{< img src="/network_device_monitoring/profile_onboarding/device_metadata_2.png" alt="El perfil de la página del panel lateral de NDM, que resalta las secciones de metadatos." style="width:100%;">}}

### Paso 6: Definir métricas

Las métricas pueden añadirse a partir de un escaneo del dispositivo o creando manualmente una nueva métrica para el perfil. Las métricas heredadas se resaltan en morado con la etiqueta `Inherited`.

{{< tabs >}}
{{% tab "Device scan (recommended)" %}}

1. Para definir una métrica utilizando la opción **Device Scan** (Escaneo de dispositivo), haz clic en **Add Metrics** (Añadir métrica). Se abrirá un modal con todas las métricas disponibles para el dispositivo.
2. Pasa el ratón por encima de las métricas para ver las unidades y las descripciones para facilitar la selección.
3. Selecciona las métricas que deseas añadir y haz clic en **Add Metric** (Añadir métrica).
4. Volverás a la pantalla de definición de métricas, donde podrás ver la nueva métrica añadida.

   {{< img src="/network_device_monitoring/profile_onboarding/define_metrics_2.mp4" alt="Vídeo que muestra el modal Añadir métricas, añadir una nueva métrica y volver al paso Definir métricas." video=true >}}

{{% /tab %}}

{{% tab "Manual" %}}

1. Para definir una métrica utilizando la opción **Manual**, haz clic en **Add Metrics** (Añadir métricas). Se abrirá un modal con todas las métricas disponibles para el dispositivo.
2. Haz clic en **Create New Metric** (Crear nueva métrica) en la parte superior del modal.
3. Especifica el OID (escalar o tabular). 
4. Haz clic en el desplegable del campo de búsqueda para añadir el nombre del OID. La barra de búsqueda ofrece una función de autocompletar que sugiere OIDs que coinciden con el valor buscado, o puedes introducir manualmente el nombre o el OID.
5. Selecciona el tipo de métrica, el factor de escala y el valor de extracción (patrón de expresión regular). 
Consulta [opciones avanzadas para métricas escalares](?tab=manual#scalar-metrics) y [opciones avanzadas para métricas tabulares](?tab=manual#tabular-metrics) para obtener más información.
6. Haz clic en **Create** (Crear) para guardar la métrica.
7. Volverás a la pantalla de definición de métricas, donde podrás ver la nueva métrica añadida.

**Nota**: Para evitar un error de validación de las métricas tabulares, debe añadirse al menos una etiqueta de métrica en la pantalla Definir métricas. 

{{< img src="/network_device_monitoring/profile_onboarding/add_metrics_manually.mp4" alt="Vídeo que muestra el modal Añadir métricas, añadir una nueva métrica con el método manual y volver al paso Definir métricas." video=true >}}

{{% collapse-content title="Opciones avanzadas escalares" level="h4" expanded=false %}}

#### Métricas escalares

[Tipo de métrica][11]
: Uno de `gauge`, `rate`, `monotonic_count` o `monotonic_count_and_rate`. 

[Factor escalar][12]
: Antes de ser transmitido a Datadog, el valor extraído se multiplica por este factor.

[Extraer valor][7]
: es lo mismo que las [opciones avanzadas](?tab=manual#global-tags) para las etiquetas globales.

[7]: https://datadoghq.dev/integrations-core/tutorials/snmp/profile-format/#extract_value
[11]: https://datadoghq.dev/integrations-core/tutorials/snmp/profile-format/#forced-metric-types
[12]: https://datadoghq.dev/integrations-core/tutorials/snmp/profile-format/#scale_factor

{{% /collapse-content %}}

{{% collapse-content title="Opciones avanzadas tabulares" level="h4" expanded=false %}}

#### Métricas tabulares

La adición de etiquetas a las métricas tabulares es similar a la adición de [etiquetas globales](#step-7-global-tags), con dos opciones adicionales:

1. Selecciona si el valor de etiqueta tiene su origen en un valor `OID` o en un segmento del índice de la tabla. Si se elige `Index` como origen, debe especificarse una posición de índice, que luego se convierte en la etiqueta.

    <details>
      <summary><b>Example of using an Index position</b></summary></br>

      Consider a table at `OID 1.2.3.1.1` with two indices. Each row in this table includes a two-number index. Suppose column 3 of a row has `OID 1.2.3.1.1.3.55.12` - here, `1.2.3.1.1` represents the table, `.3` is the column number within the table, and `.55.12` is the index of this specific row (all other columns for this row will also end with `.55.12`). If you establish a tag with the Source set to `Index` and `Index Position` set to 1, the tag's value for metrics from this table row will be `55`; if you set the index position to 2, it will be 12. If you use an index less than 1 or more than the number of indices in the table, the tag will not be populated. 

      See [Using an Index][9] for more information.

    </details>

2. Utiliza la transformación de índices cuando necesites etiquetar un valor de métrica de la tabla con un valor de una tabla _diferente_ que emplee un subconjunto de índices de esta tabla. Esto **no** es un escenario típico. Se configura añadiendo uno o varios segmentos de transformación, cada uno con un número inicial y final. Estos números se indexan en el índice de la tabla original para crear un nuevo valor de índice para la nueva tabla.

    <details>
      <summary><b>Example of using Index Transformation</b></summary></br>

      Consider the `CPI-UNITY-MIB` module. It has a `table`, `cpiPduTable`, with details about a specific PDU, and another table, `cpiPduBranchTable`, with information about specific PDU branches. The index of the main table is the PDU's MAC address, such as `6.0.36.155.53.3.246`. The branch table's index is a `branch ID` followed by the `PDU MAC`, therefore a branch table row index might be `1.6.0.36.155.53.3.246`. 
      If you want to report the current on a PDU branch, you could add `cpiPduBranchCurrent` (`OID 1.3.6.1.4.1.30932.1.10.1.3.110.1.3`, from the branch table) as a tabular metric. To tag this metric with the PDU name, add `cpiPduName` as a tag (`OID 1.3.6.1.4.1.30932.1.10.1.2.10.1.3`, from the main table), then add an index transform with `start:1` and `end:7`. This means the branch current metric from the branch table indexed with `1.6.0.36.155.53.3.246` would be tagged using the name from the main table indexed with `6.0.36.155.53.3.246`. 

      For more information see [Using a column from a different table with different indexes][10].

    </details>

[9]: https://datadoghq.dev/integrations-core/tutorials/snmp/profile-format/#using-an-index
[10]: https://datadoghq.dev/integrations-core/tutorials/snmp/profile-format/#using-a-column-from-a-different-table-with-different-indexes 

{{% /collapse-content %}}

{{% /tab %}}
{{< /tabs >}}

### Paso 7: Etiquetas globales

Añade etiquetas globales para garantizar que los metadatos, las métricas y las etiquetas globales se aplican a todos los dispositivos coincidentes. Las etiquetas globales pueden añadirse a partir de un escaneo de dispositivos o creando manualmente una nueva etiqueta para el perfil. Además, la etiqueta `Inherited` aparece junto a cualquier etiqueta global heredada de este perfil. 

{{< tabs >}}
{{% tab "Device scan (recommended)" %}}

1. Para definir una etiqueta global utilizando la opción **Device Scan** (Escaneo de dispositivo), haz clic en **+ Add Tags** (+ Añadir etiquetas). Se abre un modal que muestra todas las etiquetas disponibles para el dispositivo.
2. Selecciona una o varias etiquetas que desees añadir al perfil del dispositivo y, a continuación, haz clic en **Add Tag** (Añadir etiqueta).
3. Volverás a la pantalla de definición de etiquetas globales, donde podrás ver y editar la nueva etiqueta añadida.

   {{< img src="/network_device_monitoring/profile_onboarding/add_global_tag.mp4" alt="Vídeo que muestra el modal Añadir etiquetas globales, añadir una nueva etiqueta y volver al paso Etiquetas globales." video=true >}}

{{% /tab %}}

{{% tab "Manual" %}}

1. Para definir una etiqueta global utilizando la opción **Manual**, haz clic en **+ Add Tags** (+ Añadir etiquetas). Se abre un modal que muestra todas las etiquetas disponibles para el dispositivo.
2. Haz clic en **Create New Tag** (Crear nueva etiqueta) en la parte superior del modal.
3. Selecciona el desplegable del campo de búsqueda para añadir el nombre del OID.
4. Haz clic en el desplegable **Modification** (Modificación) para añadir una modificación. Consulta [opciones avanzadas](?tab=manual#global-tags).
5. Haz clic en **Create** (Crear) para guardar la nueva etiqueta.
6. Volverás a la pantalla de definición de etiquetas globales, donde podrás ver la nueva etiqueta añadida.

   {{< img src="/network_device_monitoring/profile_onboarding/add_global_tags_manual.mp4" alt="Vídeo que muestra el modal Añadir etiquetas globales, añadir una nueva etiqueta con el método manual y volver al paso Etiquetas globales." video=true >}}

{{% collapse-content title="Opciones avanzadas" level="h4" expanded=false %}}

#### Etiquetas globales:

| Modificación    | Descripción                                                                                         |
|-----------------|-----------------------------------------------------------------------------------------------------|
| Sin modificación | El valor devuelto por el dispositivo se utiliza directamente como valor de la etiqueta.                                 |
| Formato          | Puede ser [mac_address][5] o [ip_address][6].                                                    |
| Valor de extracción   | Expresión regular utilizada para [extraer][7] el valor de la etiqueta del valor SNMP proporcionado por el dispositivo. |
| Asignación         | Consulta la [referencia de formato de perfil][8].   

[5]: https://datadoghq.dev/integrations-core/tutorials/snmp/profile-format/#format-mac_address
[6]: https://datadoghq.dev/integrations-core/tutorials/snmp/profile-format/#format-ip_address
[7]: https://datadoghq.dev/integrations-core/tutorials/snmp/profile-format/#extract_value
[8]: https://datadoghq.dev/integrations-core/tutorials/snmp/profile-format/#mapping-index-to-tag-string-value

{{% /collapse-content %}}

{{% /tab %}}
{{< /tabs >}}

### Aplicar un perfil a los dispositivos creados

{{< tabs >}}
{{% tab "Automatic (recommended)" %}}

Después de aplicar las opciones de configuración al perfil del dispositivo, haz clic en **Save and Sync Agents** (Guardar y sincronizar Agents) para aplicar automáticamente este perfil a todos los agents de NDM. Las configuraciones se aplican a tus dispositivos con [Configuración remota][14]. Consulta [requisitos previos](#prerequisites) para obtener más información.

{{< img src="/network_device_monitoring/profile_onboarding/save_sync_agents.png" alt="Página de perfil del dispositivo de red que muestra el paso final para ahorrar y sincronizar agents" style="width:100%;">}}

[14]: /es/agent/remote_config

{{% /tab %}}

{{% tab "Manual" %}}

1. Después de guardar un perfil como borrador, vuelve a la [página de inicio del perfil][4] y selecciona la opción **Download All Profiles** (Descargar todos los perfiles). Esto te permite descargar el paquete `.zip` que contiene los archivos `yaml` para los perfiles que has creado. 
2. Coloca los archivos `yaml` en el [directorio de perfiles][13] en cada uno de los Agents correspondientes instalados.
3. Reinicia el Datadog Agent.
4. Para asegurarte de que los perfiles que creaste son correctos, confirma que NDM está recibiendo métricas de los dispositivos emparejados según lo esperado.

{{< img src="/network_device_monitoring/profile_onboarding/profile_download_2.png" alt="Página principal del perfil del dispositivo de red que muestra la opción Descargar todos los perfiles" style="width:100%;">}}

[4]: https://app.datadoghq.com/devices/profiles
[13]: https://github.com/DataDog/integrations-core/tree/master/snmp/datadog_checks/snmp/data/profiles

{{% /tab %}}
{{< /tabs >}}

## Página de inventario

Ve a [Infrastructure > Network Devices > Configuration][1] (Infraestructura > Dispositivos de red > Configuración) para ver la página de [Inventario][1] del perfil de dispositivo. Aquí, puedes ver un resumen de los perfiles predefinidos (OOTB), así como los perfiles de dispositivo que creaste utilizando la [Configuración de perfil de dispositivo](#setup) anterior.  

  {{< img src="/network_device_monitoring/profile_onboarding/device_inventory_page_2.png" alt="La página del inventario de perfil del dispositivo de red" style="width:100%;">}}

Esta página incluye las siguientes características:

- **Estado de borrador**: indica un perfil nuevo neto que aún no se ha aplicado al Agent. Para aplicar un perfil al Agent, haz clic en el perfil y sincroniza el Agent.
Una vez aplicado un perfil, no puedes volver a ponerlo en estado de borrador.

  {{< img src="/network_device_monitoring/profile_onboarding/device_status.png" alt="Captura de pantalla de un perfil de dispositivo que muestra el estado de borrador" style="width:50%;">}}

- **Filtros**: los filtros incluyen las siguientes opciones:
  - Perfiles personalizados: perfiles de dispositivo creados por el usuario.
  - Creado por Datadog: perfiles predefinidos de Datadog que se pueden ver y utilizar para crear tu propio perfil personalizado.
  - Perfiles de borrador: perfiles de dispositivos en modo borrador.

  {{< img src="/network_device_monitoring/profile_onboarding/device_filters.png" alt="Captura de pantalla de la página del inventario del perfil de dispositivo que muestra las opciones de filtro" style="width:60%;">}}

- **Crear nuevo perfil y descargar**: el botón **+ Create New Profile** (+ Crear nuevo perfil) abre el formulario de creación de perfiles que te permite [crear un nuevo perfil de dispositivo](#build-device-profiles). Al hacer clic en el botón de descarga se genera y descarga un paquete `.zip` que contiene los archivos `yaml` para los perfiles que has creado. <br></br>

  {{< img src="/network_device_monitoring/profile_onboarding/create_profile_download.png" alt="Captura de pantalla de la página de inventario del perfil de dispositivo que muestra los botones de descarga y creación de un nuevo perfil" style="width:50%;">}}

- **Menú kebab**: al hacer clic en el menú kebab situado a la derecha de un perfil, puedes editar, clonar o eliminar el perfil (solo para perfiles personalizados). También puedes navegar a **View related devices** (Ver dispositivos relacionados) en la página de NDM, filtrado al dispositivo o dispositivos a los que se aplica el perfil.<br></br>

  {{< img src="/network_device_monitoring/profile_onboarding/device_kebab_menu.png" alt="Captura de pantalla de la página del inventario del perfil de dispositivo que muestra el menú kebab en el lado derecho" style="width:40%;">}}

## Solucionar problemas

### ¿Qué es un perfil?
* Un perfil es un archivo de configuración que define los metadatos, métricas y etiquetas a recopilar de un dispositivo. Consulta [definición de metadatos][17] para obtener más información.

### ¿Qué es un escaneo de dispositivos?
* Un escaneo de dispositivo realiza un recorrido de SNMP completo del dispositivo, recopilando todos los datos disponibles y reenviándolos a Datadog para su visualización en la interfaz de usuario. Este proceso te ayuda a identificar los OIDs disponibles en el dispositivo y añadirlos al perfil para su supervisión.

### ¿Por qué no veo dispositivos coincidentes? 
Si no se encuentran dispositivos coincidentes, puede deberse a las siguientes razones:  
  * **El perfil está en modo borrador**:
    * Los borradores de perfiles no se aplican al Agent. Para empezar a monitorizar los dispositivos con tu perfil, debes sincronizarlo con el Agent o los Agents. Para ello, abre el perfil y haz clic en el botón [**Save & Sync Agents**] (Guardar y sincronizar Agents)(#apply-a-profile-to-created-devices).
  * **El perfil se aplica, pero no coincide con ningún dispositivo**:  
    * Los perfiles se asocian a los dispositivos mediante su SysObjectID. Asegúrate de que el SysObjectID especificado en el perfil coincide con uno o varios de los dispositivos monitorizados.
  * **Múltiples perfiles tienen el mismo SysObjectID**: 
    * Los perfiles se emparejan con los dispositivos utilizando su SysObjectID. Si varios perfiles comparten el mismo SysObjectID, pueden producirse conflictos de correspondencia en el Agent. Asegúrate de que cada [SysObjectID](#step-1-profile-details) se asigna a un solo perfil.

### ¿Por qué no se escanea un dispositivo?

* El escaneo del dispositivo puede tardar hasta 10 minutos en completarse. Puedes consultar el progreso del escaneo en la interfaz de usuario. Si se producen errores, intenta reiniciar el escaneo o seleccionar un [dispositivo de referencia] diferente (#step-3-select-reference-devices).

### ¿Qué ocurre si no tengo activada la configuración remota en mis recolectores? 

* Si estás utilizando una versión del Agent anterior a `7.47.0` y no tienes ya activada manualmente la [Configuración remota][18] en tus hosts, no podrás activar escaneos de dispositivos ni sincronizar perfiles con Agents a través de la interfaz de usuario. Sin embargo, puedes realizar estos pasos manualmente. <br /><br>

   Para escanear un dispositivo, sigue las instrucciones de la interfaz de usuario: <br /><br>

   {{< img src="/network_device_monitoring/profile_onboarding/remote_configuration.png" alt="Captura de pantalla del " style="width:80%;">}}

   O, para aplicar los perfiles a tus Agents manualmente:

     1. Guarda el perfil.  
     2. Haz clic en el botón de descarga para guardar un archivo zip con todos tus perfiles.  
     3. Sube el archivo zip a tus Agents siguiendo las instrucciones de la sección [aplicar manualmente un perfil a los dispositivos creados][19].

Datadog recomienda encarecidamente activar la configuración remota para garantizar una experiencia fluida basada en la interfaz de usuario y minimizar las interacciones innecesarias con el Agent.

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/devices/profiles
[2]: /es/network_monitoring/devices/profiles/
[3]: https://datadoghq.dev/integrations-core/tutorials/snmp/profile-format/
[14]: /es/agent/remote_config
[15]: https://app.datadoghq.com/devices
[16]: /es/network_monitoring/devices/supported_devices/
[17]: /es/network_monitoring/devices/profiles/#metadata-definition-by-profile
[18]: /es/agent/remote_config/?tab=configurationyamlfile&site=us#setup
[19]: /es/network_monitoring/devices/guide/device_profiles/?tab=manual#apply-a-profile-to-created-devices
[20]: https://docs.datadoghq.com/es/account_management/rbac/permissions/#network-device-monitoring