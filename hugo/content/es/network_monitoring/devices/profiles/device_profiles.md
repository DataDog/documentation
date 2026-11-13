---
aliases:
- /es/network_monitoring/devices/guide/device_profiles/
further_reading:
- link: /network_monitoring/devices/profiles/build-ndm-profile/
  tag: Documentación
  text: Crear un perfil de NDM (avanzado)
- link: /network_monitoring/devices/profiles
  tag: Documentación
  text: Lea más sobre los perfiles de NDM
site_support_id: snmp_profile_manager
title: Introducción a los perfiles de dispositivo
---
## Descripción general {#overview}

Los perfiles de dispositivo definen qué métricas SNMP recopila Datadog para un grupo de dispositivos de red. El administrador de perfiles SNMP proporciona una experiencia guiada para habilitar y gestionar esas métricas. Comenzando desde un solo dispositivo, usted puede:

- Explorar las métricas disponibles agrupadas por categoría y habilitarlas con un solo clic.
- Gestionar los dispositivos cubiertos por un perfil y habilitar o deshabilitar las métricas disponibles.
- Utilizar paquetes de métricas para obtener recomendaciones de métricas masivas guiadas por IA.
- Guarde y despliegue los cambios de perfil directamente en sus Agents, con una vista de auditoría integrada y una comprobación del estado del Agent.

Para una configuración de perfil avanzada, consulte [Build an NDM Profile][3].

## Requisitos previos {#prerequisites}

- Datadog Agent versión `7.77.0` o superior.
- [Remote Configuration][14] habilitada para su organización.
- Permisos requeridos:
  - [NDM Device Profiles View][20]: Proporciona acceso de solo lectura a la página de perfil. (Incluido en el rol estándar de Datadog).
  - [NDM Device Profiles Edit][20]: Permite la edición de perfiles de dispositivo. (Incluido en el rol de Datadog Admin).

## Configuración {#setup}

1. Habilite el escaneo de dispositivos configurando `network_devices.default_scan.enabled: true` en su `datadog.yaml`:

   ```yaml
   network_devices:
       default_scan:
         enabled: true
   ```

2. Configure `use_remote_config_profiles: true` en su configuración:

   Para Autodiscovery de SNMP, agregue lo siguiente a su archivo `datadog.yaml` bajo `network_devices.autodiscovery`:

    ```yaml
    network_devices:
        autodiscovery:
          use_remote_config_profiles: true
    ```

   Para comprobaciones manuales de SNMP, agregue lo siguiente a su archivo `conf.d/snmp.d/conf.yaml` bajo `init_config`:

    ```yaml
    init_config:
      use_remote_config_profiles: true
    ```

  **Nota**: Los dispositivos EXOS 33.1.1 pueden bloquearse cuando el escaneo de dispositivos está habilitado debido a un error de firmware. Como solución alternativa, deshabilite el escaneo de dispositivos globalmente (`network_devices.default_scan.enabled: false`) o actualice el firmware del dispositivo. Si se ve afectado por este problema, comuníquese con [Datadog Support][21] para obtener asistencia.

3. Si tiene perfiles personalizados en el Agent, cárguelos en la UI siguiendo las instrucciones de [Cargar perfiles personalizados](#upload-custom-profiles).

## Configurar métricas {#configure-metrics}

El punto de entrada recomendado para el Administrador de perfiles SNMP es desde un dispositivo SNMP en NDM. Cada dispositivo SNMP coincide con un perfil, ya sea un perfil personalizado o uno genérico proporcionado por Datadog. Editar un perfil desde un dispositivo crea automáticamente una versión personalizada, por lo que no necesita crear un perfil desde cero.

1. Navegue a [{{< ui >}}Infrastructure{{< /ui >}} > {{< ui >}}Network Devices{{< /ui >}}][15].
2. Haga clic en un dispositivo monitoreado a través de SNMP para abrir el panel lateral del dispositivo.
3. Haga clic en {{< ui >}}View all metrics{{< /ui >}} para ver la lista de métricas que se recopilan automáticamente para el dispositivo.

   {{< img src="/network_device_monitoring/profile_onboarding/ndm_view_all_metrics.png" alt="El panel lateral del dispositivo NDM que muestra la sección de Métricas con el botón View all metrics resaltado" style="width:90%;">}}

4. Se abre la pestaña {{< ui >}}Metrics{{< /ui >}}, que muestra todas las métricas recopiladas para el dispositivo. Utilice la barra lateral izquierda para navegar por categoría: {{< ui >}}Alerting Metrics{{< /ui >}}, {{< ui >}}Starred Metrics{{< /ui >}}, {{< ui >}}Key Metrics{{< /ui >}} y {{< ui >}}Additional Metrics{{< /ui >}}. 

   {{< img src="/network_device_monitoring/profile_onboarding/profile_manager_metrics_tab.png" alt="La pestaña de métricas del dispositivo NDM que muestra gráficos de métricas y una barra lateral izquierda con las categorías Alerting Metrics, Starred Metrics, Key Metrics y Additional Metrics." style="width:90%;">}}

5. Para abrir el editor de perfiles y administrar qué métricas se recopilan, haga clic en {{< ui >}}Configure metrics{{< /ui >}} en la barra lateral izquierda.

   {{< img src="/network_device_monitoring/profile_onboarding/ndm_configure_metrics_2026_10.png" alt="La pestaña de Métricas del dispositivo NDM con Configure metrics resaltado en la barra lateral izquierda" style="width:90%;">}}

   Esto abre el editor de perfiles en la pestaña {{< ui >}}Metrics{{< /ui >}}, que contiene la lista de todas las métricas disponibles para los dispositivos cubiertos por el perfil, organizadas por nombre, MIB, OID, categoría y compatibilidad. Esta es la vista principal para controlar qué datos recopila Datadog de sus dispositivos. Puede filtrar la lista de métricas por categoría o usar la barra de búsqueda para encontrar métricas específicas por nombre u OID.

6. Para habilitar una métrica, haga clic en el interruptor {{< ui >}}Enable{{< /ui >}} junto al nombre de la métrica. Para deshabilitar una métrica, haga clic en el interruptor nuevamente. Los cambios no se aplican hasta que guarde y despliegue el perfil.

   {{< img src="/network_device_monitoring/profile_onboarding/ndm_profile_editor.png" alt="El editor de perfiles del Administrador de perfiles SNMP que muestra la pestaña Métricas con todas las métricas disponibles enumeradas por nombre, MIB, OID, categoría y compatibilidad." style="width:90%;">}}

### Cobertura de dispositivos {#device-coverage}

La pestaña {{< ui >}}Device Coverage{{< /ui >}} muestra qué dispositivos de red están asociados con un perfil y cómo se aplica el perfil. Utilice esta vista para verificar las asociaciones de dispositivos, filtrar dispositivos por atributos e identificar problemas de recopilación SNMP.

{{< img src="/network_device_monitoring/profile_onboarding/ndm_device_coverage.png" alt="La pestaña Cobertura de dispositivos que muestra una lista de dispositivos con sus direcciones IP, SysObjectIDs, etiquetas y el estado del último SNMP walk." style="width:90%;">}}


Utilice los filtros en la parte superior de la tabla para limitar los resultados por SysObjectID, SysType, proveedor, modelo, tipo de dispositivo o nombre de dispositivo.

Para actualizar qué dispositivos están asociados con el perfil, haga clic en {{< ui >}}Manage Devices{{< /ui >}}. Desde allí puede:

- Buscar dispositivos para agregar o seleccionar ID de objeto para eliminar. Eliminar un ID de objeto elimina todos los dispositivos coincidentes de la cobertura del perfil.
- Filtrar la lista de dispositivos por tipo de dispositivo, nombre u otros atributos.

#### Estado del SNMP walk {#snmp-walk-status}

La columna {{< ui >}}Last SNMP walk{{< /ui >}} indica si Datadog pudo consultar el dispositivo correctamente:

- **Failed**: El SNMP walk no se completó correctamente. Es posible que las métricas falten o estén incompletas.
- **Marca de tiempo**: Indica la fecha y hora del último SNMP walk exitoso.

Si los SNMP walks fallan, verifique que:

- SNMP esté configurado correctamente en el dispositivo.
- La conectividad de red permita el sondeo SNMP.
- Las credenciales y los puertos sean correctos.

### Opciones avanzadas {#advanced-options}

Haga clic en {{< ui >}}Advanced Options{{< /ui >}} para acceder a los metadatos del dispositivo y a la configuración de etiquetas globales. Esta configuración no es necesaria para la mayoría de los casos de uso.

#### Metadatos del dispositivo {#device-metadata}

La sección {{< ui >}}Device metadata{{< /ui >}} define cómo Datadog asigna los OID de SNMP a los atributos del dispositivo. Cada campo de metadatos corresponde a una propiedad estándar del dispositivo, como:

- Nombre del dispositivo
- Proveedor
- Modelo
- Versión del SO
- Ubicación

Los valores se definen mediante OID de SNMP. Durante la recopilación, Datadog consulta estos OID para completar los metadatos del dispositivo. Por ejemplo:

- `1.3.6.1.2.1.1.5.0` se asigna al nombre del dispositivo.
- `1.3.6.1.2.1.1.1.0` se asigna a la descripción del dispositivo.

Estos metadatos enriquecen los detalles del dispositivo en la UI, permiten el filtrado y la agrupación, y proporcionan un etiquetado consistente en todos los dispositivos.

Haga clic en el icono de lápiz para editar un campo de metadatos. Los metadatos se muestran en la página [Network Device Monitoring][15] como facetas buscables y en el panel lateral del dispositivo.

{{< img src="/network_device_monitoring/profile_onboarding/ndm_advanced_options_edit.png" alt="La pestaña Opciones avanzadas con Metadatos del dispositivo seleccionada, que muestra una tabla de nombres de campos de metadatos como Nombre del dispositivo, Proveedor y Ubicación, y sus valores OID SNMP asignados" style="width:90%;">}}

La siguiente tabla describe las diferentes opciones de modificación para un campo de metadatos:
| Modificación    | Descripción                                                                                         |
|-----------------|-----------------------------------------------------------------------------------------------------|
| {{< ui >}}No Modification{{< /ui >}} | El valor devuelto por el dispositivo se utiliza directamente como el valor de la etiqueta.                                 |
| {{< ui >}}Format{{< /ui >}}          | Esto puede ser [mac_address][5] o [ip_address][6].                                                    |
| {{< ui >}}Extract Value{{< /ui >}}   | Una expresión regular utilizada para [extraer][7] el valor de la etiqueta del valor SNMP proporcionado por el dispositivo. |
| {{< ui >}}Mapping{{< /ui >}}         | Consulte la [referencia del formato de perfil][8].                                                              |

#### Global tags {#global-tags}

Utilice {{< ui >}}Global tags{{< /ui >}} para aplicar etiquetas a todas las métricas y metadatos a nivel de dispositivo para los dispositivos asociados con el perfil. Global tags ayudan a estandarizar el etiquetado en dispositivos similares y añaden contexto como el entorno, la ubicación o la propiedad.

{{< img src="/network_device_monitoring/profile_onboarding/ndm_global_tags.png" alt="La pestaña Advanced Options con Global tags seleccionada, que muestra una tabla de tag names y sus OID values con un botón Add global tag." style="width:90%;">}}


### Explorar paquetes de métricas {#explore-metric-packs}

Los paquetes de métricas son conjuntos seleccionados de métricas que puede habilitar de forma masiva. Son accesibles desde la pestaña {{< ui >}}Metrics{{< /ui >}} y proporcionan recomendaciones guiadas por IA basadas en sus dispositivos.

{{< img src="/network_device_monitoring/profile_onboarding/ndm_metric_packs.png" alt="La pestaña Métricas que muestra el banner Comenzar con paquetes de métricas en la parte superior y el botón Paquetes de métricas resaltado en la esquina superior derecha" style="width:90%;">}}

Para agregar un paquete de métricas:

1. Desde la pestaña {{< ui >}}Metrics{{< /ui >}}, haga clic en {{< ui >}}Metric packs{{< /ui >}} en la esquina superior derecha, o haga clic en {{< ui >}}View All{{< /ui >}} en el banner {{< ui >}}Start with metric packs{{< /ui >}}.
2. En el modal {{< ui >}}Add metric pack{{< /ui >}}, explore todos los paquetes disponibles o haga clic en {{< ui >}}Suggested packs{{< /ui >}} para visualizar las recomendaciones guiadas por IA.
3. Haga clic en un paquete para obtener una vista previa de sus métricas, etiquetas globales y metadatos incluidos.
4. Haga clic en {{< ui >}}Add metric pack{{< /ui >}} para habilitar todas las métricas del paquete a la vez.

{{< img src="/network_device_monitoring/profile_onboarding/ndm_add_metric_pack.png" alt="El modal Agregar paquete de métricas que muestra la lista de paquetes a la izquierda y una vista previa de las métricas, etiquetas globales y metadatos del paquete seleccionado a la derecha" style="width:90%;">}}

## Página de inventario {#inventory-page}

Para visualizar todos los perfiles en un solo lugar, navegue a [{{< ui >}}Infrastructure{{< /ui >}} > {{< ui >}}Network Devices{{< /ui >}} > {{< ui >}}Settings{{< /ui >}}][1] y haga clic en {{< ui >}}SNMP Profile Manager{{< /ui >}} en la barra lateral izquierda. Esta página enumera todos los perfiles, tanto los perfiles predeterminados de Datadog como cualquier perfil personalizado que haya creado.

{{< img src="/network_device_monitoring/profile_onboarding/snmp_profile_manager.png" alt="La página del Administrador de perfiles SNMP que muestra una lista de perfiles con sus columnas de nombre, proveedor, cobertura de dispositivo y última actualización" style="width:90%;">}}

Use el filtro {{< ui >}}Device vendor{{< /ui >}} o la barra de búsqueda para limitar la lista por nombre de perfil, proveedor o nombre de dispositivo. Active **Mostrar solo perfiles con dispositivos coincidentes** para ocultar los perfiles sin dispositivos asociados.

Si los Agentes están mal configurados para Remote Configuration, aparece un banner de advertencia en la parte superior de la página. Haga clic en {{< ui >}}Fix Agents{{< /ui >}} para resolver el problema.

Para abrir el editor de perfiles, haga clic en cualquier perfil. Para los perfiles proporcionados por Datadog, la edición crea una versión personalizada en su nombre.

Haga clic en el menú de tres puntos a la derecha de una fila de perfil para:

- {{< ui >}}Edit profile{{< /ui >}}: Abrir el editor de perfiles para ese perfil.
- {{< ui >}}Delete profile{{< /ui >}}: Eliminar permanentemente un perfil personalizado.
- {{< ui >}}Review related devices{{< /ui >}}: Navegar a NDM filtrado por los dispositivos que coinciden con ese perfil.

### Descargar perfiles {#download-profiles}

Para descargar perfiles como archivos YAML, haga clic en {{< ui >}}Download Profiles{{< /ui >}} en la esquina superior derecha de la página. Esto genera un paquete `.zip` que contiene los archivos `yaml` para sus perfiles personalizados. Para aplicar perfiles manualmente a los Agent:

1. Coloque los archivos `yaml` en el [directorio de perfiles][13] en cada Agent relevante instalado.
2. Reinicie el Datadog Agent.
3. Confirme que NDM esté recibiendo métricas de los dispositivos coincidentes.

### Cargar perfiles personalizados {#upload-custom-profiles}

Para cargar perfiles SNMP existentes al Administrador de perfiles:

1. Navegue a [{{< ui >}}Infrastructure{{< /ui >}} > {{< ui >}}Network Devices{{< /ui >}} > {{< ui >}}Settings{{< /ui >}}][1] y haga clic en {{< ui >}}SNMP Profile Manager{{< /ui >}} en la barra lateral izquierda.
2. Haga clic en {{< ui >}}Upload Profiles{{< /ui >}} en la esquina superior derecha de la página.
3. En la ventana modal de carga, arrastre y suelte un archivo `.zip` o haga clic en {{< ui >}}browse files{{< /ui >}} para seleccionar uno. El archivo `.zip` debe contener uno o más perfiles SNMP en formato `.yaml`.

   {{< img src="/network_device_monitoring/profile_onboarding/upload_custom_profile_2.png" alt="La ventana modal Cargar perfil SNMP personalizado con un área de arrastrar y soltar para cargar un archivo .zip que contiene perfiles SNMP en formato .yaml" style="width:60%;">}}

4. Haga clic en {{< ui >}}Upload profiles{{< /ui >}}.

Una vez completada la carga, los perfiles estarán disponibles en el editor de perfiles. Luego puede administrar las métricas, la cobertura de dispositivos y las opciones avanzadas de los perfiles cargados de la misma manera que cualquier otro perfil personalizado.

## Herencia de perfiles {#profile-inheritance}

La herencia de perfiles ocurre automáticamente en segundo plano. Cuando edita un perfil, Datadog crea una extensión personalizada del perfil coincidente. No necesita configurar la herencia manualmente. Datadog incluye automáticamente perfiles base heredados (`_base.yaml`, `_generic-if.yaml`, `_generic-ip.yaml`, `_generic-ospf.yaml`, `_generic-tcp.yaml` y `_generic-udp.yaml`).

Para una configuración de herencia avanzada, consulte [Referencia del formato de perfil][3].

## Solución de problemas {#troubleshooting}

### ¿Qué es un perfil? {#what-is-a-profile}
* Un perfil es un archivo de configuración que define los metadatos, las métricas y las etiquetas que se recopilarán de un dispositivo. Consulte la [definición de metadatos][17] para obtener más información.

### ¿Qué es un escaneo de dispositivo? {#what-is-a-device-scan}
* Un escaneo de dispositivo realiza un SNMP walk completo del dispositivo, recopilando todos los datos disponibles y enviándolos a Datadog para su visualización en la interfaz de usuario. Este proceso identifica los OID disponibles en el dispositivo y completa la lista de métricas disponibles en el editor de perfiles.

### ¿Por qué no hay dispositivos coincidentes? {#why-are-there-no-matching-devices}
Si no se encuentran dispositivos coincidentes, puede deberse a las siguientes razones:
  * **El perfil se aplica pero no coincide con ningún dispositivo**:
    * Los perfiles se emparejan con los dispositivos utilizando su SysObjectID. Confirme que el SysObjectID en el perfil coincida con uno o más de sus dispositivos monitoreados.
  * **Varios perfiles tienen los mismos SysObjectID**:
    * Si varios perfiles comparten el mismo SysObjectID, puede causar conflictos de coincidencia a nivel del Agent. Confirme que cada SysObjectID esté asignado a un solo perfil.

### ¿Por qué no se escanearía un dispositivo? {#why-would-a-device-not-be-scanned}

El escaneo del dispositivo puede tardar hasta 10 minutos en completarse. Puede hacer un seguimiento del progreso del escaneo en la interfaz de usuario.

Si un dispositivo no se está escaneando, puede deberse a las siguientes razones:

- **El escaneo de dispositivos predeterminado está deshabilitado**: El escaneo de dispositivos está deshabilitado de forma predeterminada. Establezca `network_devices.default_scan.enabled: true` en `datadog.yaml`.
- **Bucle infinito detectado**: El escaneo detectó un bucle infinito y fue terminado. Verifique los registros del Agent para `next OID 'X' is not after last OID 'Y'`. Esto puede ocurrir con algunos firmwares de dispositivos.
- **Firmware del dispositivo**: Antes de habilitar el escaneo de dispositivos, revise la advertencia de firmware en [Setup](#setup).

{{< site-region region="gov,gov2" >}}
- **GovCloud**: Los escaneos de dispositivos no pueden iniciarse desde la interfaz de usuario. Habilite el escaneo de dispositivos predeterminado (`network_devices.default_scan.enabled: true`) e inicie los escaneos manualmente desde el Agent para dispositivos específicos.
{{< /site-region >}}

### Remote Configuration no está habilitado en los colectores {#remote-configuration-is-not-enabled-on-collectors}

El Administrador de perfiles requiere:

- Agent versión `7.77.0` o superior
- [Remote Configuration][14] habilitada
- `use_remote_config_profiles: true` en su configuración SNMP
- `network_devices.default_scan.enabled: true` para el escaneo de dispositivos

Si Remote Configuration no está habilitado, no puede iniciar escaneos de dispositivos ni sincronizar perfiles con los Agent a través de la interfaz de usuario. Para aplicar perfiles manualmente, consulte [Descargar perfiles](#download-profiles).

Datadog recomienda habilitar Remote Configuration para aprovechar la experiencia completa basada en la interfaz de usuario y minimizar las interacciones manuales con el Agent.

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/devices/profiles
[2]: /es/network_monitoring/devices/profiles/
[3]: https://datadoghq.dev/integrations-core/tutorials/snmp/profile-format/
[5]: https://datadoghq.dev/integrations-core/tutorials/snmp/profile-format/#format-mac_address
[6]: https://datadoghq.dev/integrations-core/tutorials/snmp/profile-format/#format-ip_address
[7]: https://datadoghq.dev/integrations-core/tutorials/snmp/profile-format/#extract_value
[8]: https://datadoghq.dev/integrations-core/tutorials/snmp/profile-format/#mapping-index-to-tag-string-value
[13]: https://github.com/DataDog/integrations-core/tree/master/snmp/datadog_checks/snmp/data/profiles
[14]: /es/agent/remote_config
[15]: https://app.datadoghq.com/devices
[17]: /es/network_monitoring/devices/profiles/#metadata-definition-by-profile
[20]: /es/account_management/rbac/permissions/#network-device-monitoring
[21]: /es/help/