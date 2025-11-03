---
further_reading:
- link: /network_monitoring/devices/guide/build-ndm-profile/
  tag: Documentación
  text: Crear un perfil NDM (Avanzado)
- link: /network_monitoring/devices/profiles
  tag: Documentación
  text: Más información sobre los perfiles NDM
is_beta: true
title: Empezando con perfiles de dispositivos
site_support_id: snmp_profile_manager
---

{{< callout url="https://www.datadoghq.com/product-preview/easily-onboard-and-start-monitoring-network-devices-to-datadog/" >}}
La incorporación de dispositivos está en Vista previa. Utiliza este formulario para solicitar acceso
{{< /callout >}}

## Información general

Los perfiles de los dispositivos definen qué métricas recopilar y cómo transformarlas en métricas de Datadog. Se espera que cada [perfil][2] monitorice una clase de dispositivos similares del mismo proveedor. 

La experiencia de incorporación de dispositivos ofrece una experiencia guiada basada en GUI para:
- Crear y gestionar sin problemas perfiles de dispositivos
- Especificar etiquetas (tags) y métricas que se recopilarán de tus dispositivos de red 
- Verificar los dispositivos coincidentes con cada perfil

Para obtener más información sobre los detalles avanzados del perfil, consulta la página [Referencia de formatos de perfiles][3].

## Requisitos previos 

La versión mínima requerida del Agent es `7.50` o posterior.

## Incorporación de perfiles de dispositivos

### Página de inicio del perfil

La página de [inicio del perfil][4] es donde puedes ver un snapshot de los perfiles de dispositivos que creaste utilizando la [Experiencia de incorporación de dispositivos](#profile-details). 

{{< img src="/network_device_monitoring/profile_onboarding/profile_home_page_2.png" alt="Página de inicio del perfil del dispositivo de red" style="width:100%;">}}

### Detalles del perfil

1. Crea tu propio perfil NDM yendo a [infraestructura > Dispositivos de red > Configuración][1]. 
2. Haz clic en SNMP Profiles > **Create New Profile** (Perfiles SNMP > Crear nuevo perfil).
  {{< img src="/network_device_monitoring/profile_onboarding/create_profile_2.png" alt="Página de creación del perfil del dispositivo de red" style="width:100%;">}}
3. Proporciona a tu perfil de dispositivo un nombre, información sobre el proveedor (opcional) y una descripción (opcional).
4. Selecciona el `SysObjectID`. Esto es lo que se utiliza para emparejar los dispositivos de red con los perfiles de dispositivo que definen lo que se recopila y monitoriza de cada dispositivo.
  {{< img src="/network_device_monitoring/profile_onboarding/Sys_object_ID_Field.png" alt="Página de creación del perfil del dispositivo de red que muestra el desplegable ID del objeto del sistema" style="width:100%;">}}

### Etiquetas globales

Añade etiquetas globales para opciones más avanzadas y granulares, lo que te permite asignar un peso a una métrica específica.

{{< img src="/network_device_monitoring/profile_onboarding/Add_global_tags.png" alt="Página de creación del perfil del dispositivo de red que muestra el desplegable Añadir etiquetas globales" style="width:100%;">}}

#### Opciones avanzadas

| Modificación       | Descripción   |
| ------------- | ------------- |
| Sin modificación | El valor devuelto por el dispositivo se utilizará directamente como valor de etiqueta. |
| Formato | Puede ser [mac_address][5] o [ip_address][6]. |
| Valor de extracción | Expresión regular utilizada para [extraer][7] el valor de la etiqueta del valor SNMP proporcionado por el dispositivo. |
| Asignación | Esto se describe [aquí][8]. |


### Métricas escalares

Consulta [Opciones avanzadas para métricas](#metrics-advanced-options).

### Métricas tabulares

Consulta [Opciones avanzadas para métricas](#metrics-advanced-options).

### Añadir etiquetas tabulares

Añadir etiquetas a métricas tabulares es similar a añadir etiquetas globales, con dos opciones adicionales:

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


### Opciones avanzadas para métricas

Las opciones avanzadas para métricas escalares y tabulares son las mismas:

[Tipo de métrica][11]
: Uno de `gauge`, `rate`, `monotonic_count` o `monotonic_count_and_rate`. 

[Factor escalar][12]
: Antes de ser transmitido a Datadog, el valor extraído se multiplica por este factor.

[Valor de extracción][7]
: Igual a las [opciones avanzadas](#advanced-options) para etiquetas globales.

### Aplicar un perfil a los dispositivos creados

1. Después de guardar un perfil, vuelve a la [página de inicio del perfil][4] y selecciona la opción **Descargar todos los perfiles**. Esto te permitirá descargar el paquete `.zip` que contiene los archivos `yaml` para los perfiles que creaste. 
2. Coloca los archivos `yaml` en el [directorio de perfiles][13] en cada uno de los Agents correspondientes instalados.
3. Reinicia el Datadog Agent.
4. Para asegurarte de que los perfiles que creaste son correctos, confirma que NDM está recibiendo métricas de los dispositivos emparejados según lo esperado.


{{< img src="/network_device_monitoring/profile_onboarding/download_all_profiles_2.png" alt="Página del perfil del dispositivo de red que muestra la opción Descargar todos los perfiles" style="width:100%;">}}

## Leer más

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/devices
[2]: /es/network_monitoring/devices/profiles/
[3]: https://datadoghq.dev/integrations-core/tutorials/snmp/profile-format/
[4]: https://app.datadoghq.com/devices/profiles
[5]: https://datadoghq.dev/integrations-core/tutorials/snmp/profile-format/#format-mac_address
[6]: https://datadoghq.dev/integrations-core/tutorials/snmp/profile-format/#format-ip_address
[7]: https://datadoghq.dev/integrations-core/tutorials/snmp/profile-format/#extract_value
[8]: https://datadoghq.dev/integrations-core/tutorials/snmp/profile-format/#mapping-index-to-tag-string-value
[9]: https://datadoghq.dev/integrations-core/tutorials/snmp/profile-format/#using-an-index
[10]: https://datadoghq.dev/integrations-core/tutorials/snmp/profile-format/#using-a-column-from-a-different-table-with-different-indexes 
[11]: https://datadoghq.dev/integrations-core/tutorials/snmp/profile-format/#forced-metric-types
[12]: https://datadoghq.dev/integrations-core/tutorials/snmp/profile-format/#scale_factor
[13]: https://github.com/DataDog/integrations-core/tree/master/snmp/datadog_checks/snmp/data/profiles