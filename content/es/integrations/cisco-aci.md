---
aliases:
- /es/integrations/cisco_aci
app_id: cisco-aci
categories:
- recopilación de logs
- red
custom_kind: integración
description: Realiza un seguimiento del rendimiento y el uso de Cisco ACI.
integration_version: 4.8.0
media: []
supported_os:
- linux
- macos
- windows
title: CiscoACI
---
## Información general

La integración de Cisco ACI te permite:

- Rastrear el estado de tu red
- Rastrear la capacidad de tu ACI
- Monitorizar los propios conmutadores y controladores
- La posibilidad de monitorizar dispositivos a través de [Network Devices Monitoring](https://www.datadoghq.com/product/network-monitoring/network-device-monitoring/)

## Configuración

### Instalación

El check de Cisco ACI esta incluido en el paquete del Agent, por lo que solo tienes que [instalar el Agent](https://app.datadoghq.com/account/settings/agent/latest) en un servidor de tu red.

### Configuración

{{< tabs >}}

{{% tab "Host" %}}

#### host

Para configurar este check para un Agent que se ejecuta en un host:

1. Edita el archivo `cisco_aci.d/conf.yaml`, en la carpeta `conf.d/` en la raíz de tu [directorio de configuración del Agent](https://docs.datadoghq.com/agent/guide/agent-configuration-files/#agent-configuration-directory). Consulta el [ejemplo de cisco_aci.d/conf.yaml](https://github.com/DataDog/integrations-core/blob/master/cisco_aci/datadog_checks/cisco_aci/data/conf.yaml.example) para conocer todas las opciones de configuración disponibles:

   ```yaml
   init_config:

   instances:
        ## @param aci_url - string - required
        ## URL to query to gather metrics.
        #
      - aci_url: http://localhost

        ## @param username - string - required
        ## Authentication can use either a user auth or a certificate.
        ## If using the user auth, enter the `username` and `pwd` configuration.
        #
        username: datadog

        ## @param pwd - string - required
        ## Authentication can use either a user auth or a certificate.
        ## If using the user auth, enter the `username` and `pwd` configuration.
        #
        pwd: <PWD>

        ## @param tenant - list of strings - optional
        ## List of tenants to collect metrics data from.
        #
        # tenant:
        #   - <TENANT_1>
        #   - <TENANT_2>

        ## @param send_ndm_metadata - boolean - optional - default: false
        ## Set to `true` to enable Network Device Monitoring metadata (for devices, interfaces, topology) to be sent
        ## and to allow Cisco ACI fault collection to be enabled.
        #
        # send_ndm_metadata: false

        ## @param send_faultinst_faults - boolean - optional - default: false
        ## Set to `true` to enable collection of Cisco ACI faultInst faults as logs.
        #
        # send_faultinst_faults: false

        ## @param send_faultdelegate_faults - boolean - optional - default: false
        ## Set to `true` to enable collection of Cisco ACI faultDelegate faults as logs.
        #
        # send_faultdelegate_faults: false
   ```

   *NOTA*: Asegúrate de especificar todos los inquilinos para la integración para recopilar métricas sobre aplicaciones, EPG, etc.

1. [Reinicia el Agent](https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent) para empezar a enviar métricas de Cisco ACI a Datadog.

{{% /tab %}}

{{% tab "En contenedores" %}}

#### En contenedores

Para entornos en contenedores, consulta las [plantillas de integración de Autodiscovery](https://docs.datadoghq.com/agent/kubernetes/integrations/) para obtener orientación sobre la aplicación de los parámetros que se indican a continuación.

| Parámetro            | Valor                                                                  |
| -------------------- | ---------------------------------------------------------------------- |
| `<INTEGRATION_NAME>` | `cisco_aci`                                                            |
| `<INIT_CONFIG>`      | en blanco o `{}`                                                          |
| `<INSTANCE_CONFIG>`  | `{"aci_url":"%%host%%", "username":"<USERNAME>", "pwd": "<PASSWORD>"}` |

{{% /tab %}}

{{< /tabs >}}

### Validación

[Ejecuta el subcomando de `status` del Agent(https://docs.datadoghq.com/agent/guide/agent-commands/#agent-status-and-information) y busca `cisco_aci` en la sección Checks.

## Perfiles de proveedores

Los perfiles de proveedor específicos compatibles con esta integración pueden consultarse en la página de los [proveedores de red](https://docs.datadoghq.com/network_monitoring/devices/supported_devices/).

## Datos recopilados

### Métricas

| | |
| --- | --- |
| **cisco_aci.capacity.apic.azure_domain.endpoint_group.limit** <br>(gauge) | límite en el número de grupos de endpoints de dominio azure que el apic puede utilizar<br>_Se muestra como elemento_ |
| **cisco_aci.capacity.apic.azure_domain.limit** <br>(gauge) | límite en el número de dominios azure que el apic puede utilizar<br>_Se muestra como elemento_ |
| **cisco_aci.capacity.apic.bridge_domain.limit** <br>(gauge) | límite en el número de dominios puente que el apic puede utilizar<br>_Se muestra como elemento_ |
| **cisco_aci.capacity.apic.bridge_domain.utilized** <br>(gauge) | dominios puente que el apic está utilizando<br>_Se muestra como elemento_ |
| **cisco_aci.capacity.apic.contract.limit** <br>(gauge) | límite en el número de contratos que el apic puede utilizar<br>_Se muestra como elemento_ |
| **cisco_aci.capacity.apic.endpoint.limit** <br>(gauge) | límite en el número de endpoints que el apic puede utilizar<br>_Se muestra como elemento_ |
| **cisco_aci.capacity.apic.endpoint.utilized** <br>(gauge) | endpoints que el apic está utilizando<br>_Se muestra como elemento_ |
| **cisco_aci.capacity.apic.endpoint_group.limit** <br>(gauge) | límite en el número de grupos de endpoints que el apic puede utilizar<br>_Se muestra como elemento_ |
| **cisco_aci.capacity.apic.endpoint_group.utilized** <br>(gauge) | grupos de endpoints que el apic está utilizando<br>_Se muestra como elemento_ |
| **cisco_aci.capacity.apic.fabric_node.limit** <br>(gauge) | límite en el número de nodos de tejido que el apic puede utilizar<br>_Se muestra como elemento_ |
| **cisco_aci.capacity.apic.fabric_node.utilized** <br>(gauge) | número de nodos de tejido que el apic está utilizando<br>_Se muestra como elemento_ |
| **cisco_aci.capacity.apic.private_network.limit** <br>(gauge) | límite en el número de nodos de tejido que el apic puede utilizar<br>_Se muestra como elemento_ |
| **cisco_aci.capacity.apic.private_network.utilized** <br>(gauge) | número de redes privadas que el apic está utilizando<br>_Se muestra como elemento_ |
| **cisco_aci.capacity.apic.service_graph.limit** <br>(gauge) | límite en el número de gráficos de servicio que el apic puede utilizar<br>_Se muestra como elemento_ |
| **cisco_aci.capacity.apic.tenant.limit** <br>(gauge) | límite en el número de inquilinos que el apic puede utilizar<br>_Se muestra como elemento_ |
| **cisco_aci.capacity.apic.tenant.utilized** <br>(gauge) | número de inquilinos que el apic está utilizando<br>_Se muestra como elemento_ |
| **cisco_aci.capacity.apic.vmware_domain.endpoint_group.limit** <br>(gauge) | límite en el número de grupos de endpoints de dominio azure que el apic puede utilizar<br>_Se muestra como elemento_ |
| **cisco_aci.capacity.apic.vmware_domain.limit** <br>(gauge) | límite en el número de dominios vmware que el apic puede utilizar<br>_Se muestra como elemento_ |
| **cisco_aci.capacity.leaf.bridge_domain.limit** <br>(gauge) | límite en el número de dominios puente que la hoja puede utilizar<br>_Se muestra como elemento_ |
| **cisco_aci.capacity.leaf.bridge_domain.utilized** <br>(gauge) | número de dominios puente que la hoja utiliza<br>_Se muestra como elemento_ |
| **cisco_aci.capacity.leaf.endpoint_group.limit** <br>(gauge) | límite en el número de grupos de endpoints que la hoja puede utilizar<br>_Se muestra como elemento_ |
| **cisco_aci.capacity.leaf.endpoint_group.utilized** <br>(gauge) | número de grupos de endpoints que la hoja utiliza<br>_Se muestra como elemento_ |
| **cisco_aci.capacity.leaf.ipv4_endpoint.limit** <br>(gauge) | límite en el número de direcciones ipv4 para la hoja. Requiere la versión 3.1 o posterior<br>_Se muestra como elemento_ |
| **cisco_aci.capacity.leaf.ipv4_endpoint.utilized** <br>(gauge) | número de direcciones ipv4 que la hoja está utilizando. Requiere la versión 3.1 o posterior<br>_Se muestra como elemento_ |
| **cisco_aci.capacity.leaf.ipv6_endpoint.limit** <br>(gauge) | límite en el número de direcciones ipv6 para la hoja. Requiere la versión 3.1 o posterior<br>_Se muestra como elemento_ |
| **cisco_aci.capacity.leaf.ipv6_endpoint.utilized** <br>(gauge) | número de direcciones ipv6 que la hoja está utilizando. Requiere la versión 3.1 o posterior<br>_Se muestra como elemento_ |
| **cisco_aci.capacity.leaf.multicast.limit** <br>(gauge) | capacidad del endpoint multicast de la hoja<br>_Se muestra como elemento_ |
| **cisco_aci.capacity.leaf.multicast.utilized** <br>(gauge) | capacidad del endpoint multicast utilizada por la hoja<br>_Se muestra como elemento_ |
| **cisco_aci.capacity.leaf.policy_cam.limit** <br>(gauge) | límite en el número de políticas en la cam de políticas<br>_Se muestra como elemento_ |
| **cisco_aci.capacity.leaf.policy_cam.utilized** <br>(gauge) | número de políticas que utiliza la cam de políticas<br>_Se muestra como elemento_ |
| **cisco_aci.capacity.leaf.vlan.limit** <br>(gauge) | límite en el número de vlans para la hoja<br>_Se muestra como elemento_ |
| **cisco_aci.capacity.leaf.vlan.utilized** <br>(gauge) | número de vlans que utiliza la hoja<br>_Se muestra como elemento_ |
| **cisco_aci.capacity.leaf.vrf.limit** <br>(gauge) | límite en el número de vrfs que la hoja puede utilizar<br>_Se muestra como elemento_ |
| **cisco_aci.capacity.leaf.vrf.utilized** <br>(gauge) | número de vrfs que la hoja está utilizando<br>_Se muestra como elemento_ |
| **cisco_aci.fabric.node.cpu.avg** <br>(gauge) | uso medio de cpu del nodo<br>__Se muestra como porcentaje_ |
| **cisco_aci.fabric.node.cpu.idle.avg** <br>(gauge) | cpu media inactiva del nodo<br>_Se muestra como porcentaje_ |
| **cisco_aci.fabric.node.cpu.idle.max** <br>(gauge) | cpu máxima inactiva del nodo<br>_Se muestra como porcentaje_ |
| **cisco_aci.fabric.node.cpu.idle.min** <br>(gauge) | cpu mínima inactiva del nodo<br>_Se muestra como porcentaje_ |
| **cisco_aci.fabric.node.cpu.max** <br>(gauge) | uso máximo de cpu del nodo<br>_Se muestra como porcentaje_ |
| **cisco_aci.fabric.node.cpu.min** <br>(gauge) | uso mínimo de cpu del nodo<br>_Se muestra como porcentaje_ |
| **cisco_aci.fabric.node.egr_bytes.flood** <br>(gauge) | paquetes de inundación de egreso<br>_Se muestra en bytes_ |
| **cisco_aci.fabric.node.egr_bytes.flood.cum** <br>(gauge) | paquetes de inundación acumulados enviados desde el nodo<br>_Se muestra en bytes_ |
| **cisco_aci.fabric.node.egr_bytes.multicast** <br>(gauge) | número de bytes multicast procedentes del nodo<br>_Se muestra en bytes_ |
| **cisco_aci.fabric.node.egr_bytes.multicast.cum** <br>(gauge) | bytes multicast acumulados enviados desde el nodo<br>_Se muestra en bytes_ |
| **cisco_aci.fabric.node.egr_bytes.unicast** <br>(gauge) | número de bytes unicast procedentes del nodo<br>_Se muestra en bytes_ |
| **cisco_aci.fabric.node.egr_bytes.unicast.cum** <br>(gauge) | bytes acumulados enviados desde el nodo<br>_Se muestra en bytes_ |
| **cisco_aci.fabric.node.egr_drop_pkts.buffer** <br>(gauge) | paquetes descartados debido a que el buffer está lleno<br>_Se muestra como paquete_ |
| **cisco_aci.fabric.node.egr_drop_pkts.buffer.cum** <br>(gauge) | paquetes acumulados descartados debido a que el buffer está lleno<br>_Se muestra como paquete_ |
| **cisco_aci.fabric.node.egr_drop_pkts.errors** <br>(gauge) | paquetes perdidos por errores<br>_Se muestra como paquete_ |
| **cisco_aci.fabric.node.egr_total.bytes.cum** <br>(gauge) | bytes acumulados enviados desde el nodo<br>_Se muestra en bytes_ |
| **cisco_aci.fabric.node.egr_total.bytes.rate** <br>(gauge) | bytes por segundo enviados desde el nodo<br>_Se muestra en bytes_ |
| **cisco_aci.fabric.node.egr_total.pkts** <br>(gauge) | paquetes enviados desde el nodo<br>_Se muestra como paquete_ |
| **cisco_aci.fabric.node.egr_total.pkts.rate** <br>(gauge) | paquetes por segundo enviados desde el nodo<br>_Se muestra como paquete_ |
| **cisco_aci.fabric.node.fault_counter.crit** <br>(gauge) | número de fallos críticos en el nodo<br>_Se muestra como fallo_ |
| **cisco_aci.fabric.node.fault_counter.warn** <br>(gauge) | número de advertencias en el nodo<br>_Se muestra como fallo_ |
| **cisco_aci.fabric.node.health.cur** <br>(gauge) | salud actual del nodo|
| **cisco_aci.fabric.node.health.max** <br>(gauge) | salud máxima del nodo|
| **cisco_aci.fabric.node.health.min** <br>(gauge) | salud mínima del nodo|
| **cisco_aci.fabric.node.ingr_bytes.flood** <br>(gauge) | paquetes de inundación de ingreso<br>_Se muestra en bytes_ |
| **cisco_aci.fabric.node.ingr_bytes.flood.cum** <br>(gauge) | paquetes de inundación acumulados enviados al nodo<br>_Se muestra en bytes_ |
| **cisco_aci.fabric.node.ingr_bytes.multicast** <br>(gauge) | número de bytes multicast entrantes en el nodo<br>_Se muestra en bytes_ |
| **cisco_aci.fabric.node.ingr_bytes.multicast.cum** <br>(gauge) | bytes multicast acumulados enviados al nodo<br>_Se muestra en bytes_ |
| **cisco_aci.fabric.node.ingr_bytes.unicast** <br>(gauge) | número de bytes unicast entrantes en el nodo<br>_Se muestra en bytes_ |
| **cisco_aci.fabric.node.ingr_bytes.unicast.cum** <br>(gauge) | bytes acumulados enviados al nodo<br>_Se muestra en bytes_ |
| **cisco_aci.fabric.node.ingr_total.bytes.cum** <br>(gauge) | bytes acumulados enviados al nodo<br>_Se muestra en bytes_ |
| **cisco_aci.fabric.node.ingr_total.bytes.rate** <br>(gauge) | bytes por segundo enviados al nodo<br>_Se muestra en bytes_ |
| **cisco_aci.fabric.node.ingr_total.pkts** <br>(gauge) | paquetes enviados al nodo<br>_Se muestra como paquete_ |
| **cisco_aci.fabric.node.ingr_total.pkts.rate** <br>(gauge) | paquetes por segundo enviados al nodo<br>_Se muestra como paquete_ |
| **cisco_aci.fabric.node.mem.avg** <br>(gauge) | uso medio de memoria del nodo<br>_Se muestra en bytes_ |
| **cisco_aci.fabric.node.mem.free.avg** <br>(gauge) | memoria libre media del nodo<br>_Se muestra en bytes_ |
| **cisco_aci.fabric.node.mem.free.max** <br>(gauge) | memoria libre máxima del nodo<br>_Se muestra en bytes_ |
| **cisco_aci.fabric.node.mem.free.min** <br>(gauge) | memoria libre mínima del nodo<br>_Se muestra en bytes_ |
| **cisco_aci.fabric.node.mem.max** <br>(gauge) | uso máximo de memoria del nodo<br>_Se muestra en bytes_ |
| **cisco_aci.fabric.node.mem.min** <br>(gauge) | uso mínimo de memoria del nodo<br>_Se muestra en bytes_ |
| **cisco_aci.fabric.pod.egr_bytes.flood** <br>(gauge) | paquetes de inundación de egreso<br>_Se muestra en bytes_ |
| **cisco_aci.fabric.pod.egr_bytes.flood.cum** <br>(gauge) | paquetes de inundación acumulados enviados desde el pod<br>_Se muestra en bytes_ |
| **cisco_aci.fabric.pod.egr_bytes.multicast** <br>(gauge) | número de bytes multicast procedentes del pod<br>_Se muestra en bytes_ |
| **cisco_aci.fabric.pod.egr_bytes.multicast.cum** <br>(gauge) | bytes multicast acumulados enviados desde el pod<br>_Se muestra en bytes_ |
| **cisco_aci.fabric.pod.egr_bytes.unicast** <br>(gauge) | número de bytes unicast procedentes del pod<br>_Se muestra en bytes_ |
| **cisco_aci.fabric.pod.egr_bytes.unicast.cum** <br>(gauge) | bytes acumulados enviados desde el pod<br>_Se muestra en bytes_ |
| **cisco_aci.fabric.pod.egr_drop_pkts.buffer** <br>(gauge) | paquetes descartados debido a que el buffer está lleno<br>_Se muestra como paquete_ |
| **cisco_aci.fabric.pod.egr_drop_pkts.buffer.cum** <br>(gauge) | paquetes acumulados descartados debido a que el buffer está lleno<br>_Se muestra como paquete_ |
| **cisco_aci.fabric.pod.egr_drop_pkts.errors** <br>(gauge) | paquetes perdidos por errores<br>_Se muestra como paquete_ |
| **cisco_aci.fabric.pod.egr_total.bytes.cum** <br>(gauge) | bytes acumulados enviados desde el pod<br>_Se muestra en bytes_ |
| **cisco_aci.fabric.pod.egr_total.bytes.rate** <br>(gauge) | bytes por segundo enviados desde el pod<br>_Se muestra en bytes_ |
| **cisco_aci.fabric.pod.egr_total.pkts** <br>(gauge) | paquetes enviados desde el pod<br>_Se muestra como paquete_ |
| **cisco_aci.fabric.pod.egr_total.pkts.rate** <br>(gauge) | paquetes por segundo enviados desde el pod<br>_Se muestra como paquete_ |
| **cisco_aci.fabric.pod.fault_counter.crit** <br>(gauge) | número de fallos críticos en el pod<br>_Se muestra como fallo_ |
| **cisco_aci.fabric.pod.fault_counter.warn** <br>(gauge) | número de advertencias en el pod<br>_Se muestra como fallo_ |
| **cisco_aci.fabric.pod.health.cur** <br>(gauge) | salud actual del pod|
| **cisco_aci.fabric.pod.health.max** <br>(gauge) | salud máxima del pod|
| **cisco_aci.fabric.pod.health.min** <br>(gauge) | salud mínima del pod|
| **cisco_aci.fabric.pod.ingr_bytes.flood** <br>(gauge) | paquetes de inundación de ingreso<br>_Se muestra en bytes_ |
| **cisco_aci.fabric.pod.ingr_bytes.flood.cum** <br>(gauge) | paquetes de inundación acumulados enviados al pod<br>_Se muestra en bytes_ |
| **cisco_aci.fabric.pod.ingr_bytes.multicast** <br>(calibre) | número de bytes multicast entrantes en el pod<br>_Se muestra en bytes_ |
| **cisco_aci.fabric.pod.ingr_bytes.multicast.cum** <br>(gauge) | bytes multicast acumulados enviados al pod<br>_Se muestra en bytes_ |
| **cisco_aci.fabric.pod.ingr_bytes.unicast** <br>(gauge) | número de bytes unicast entrantes en el pod<br>_Se muestra en bytes_ |
| **cisco_aci.fabric.pod.ingr_bytes.unicast.cum** <br>(gauge) | bytes acumulados enviados al pod<br>_Se muestra en bytes_ |
| **cisco_aci.fabric.pod.ingr_total.bytes.cum** <br>(gauge) | bytes acumulados enviados al pod<br>_Se muestra en bytes_ |
| **cisco_aci.fabric.pod.ingr_total.bytes.rate** <br>(gauge) | bytes por segundo enviados al pod<br>_Se muestra en bytes_ |
| **cisco_aci.fabric.pod.ingr_total.pkts** <br>(gauge) | paquetes enviados al pod<br>_Se muestra como paquete_ |
| **cisco_aci.fabric.pod.ingr_total.pkts.rate** <br>(gauge) | paquetes por segundo enviados al pod<br>_Se muestra como paquete_ |
| **cisco_aci.fabric.port.egr_bytes.flood** <br>(gauge) | paquetes de inundación de egreso<br>_Se muestra en bytes_ |
| **cisco_aci.fabric.port.egr_bytes.flood.cum** <br>(gauge) | paquetes de inundación acumulados enviados desde el puerto<br>_Se muestra en bytes_ |
| **cisco_aci.fabric.port.egr_bytes.multicast** <br>(gauge) | número de bytes multicast procedentes del puerto<br>_Se muestra en bytes_ |
| **cisco_aci.fabric.port.egr_bytes.multicast.cum** <br>(gauge) | bytes multicast acumulados enviados desde el puerto<br>_Se muestra en bytes_ |
| **cisco_aci.fabric.port.egr_bytes.unicast** <br>(gauge) | número de bytes unicast procedentes del puerto<br>_Se muestra en bytes_ |
| **cisco_aci.fabric.port.egr_bytes.unicast.cum** <br>(gauge) | bytes acumulados enviados desde el puerto<br>_Se muestra en bytes_ |
| **cisco_aci.fabric.port.egr_drop_pkts.buffer** <br>(gauge) | paquetes descartados debido a que el buffer está lleno<br>_Se muestra como paquete_ |
| **cisco_aci.fabric.port.egr_drop_pkts.buffer.cum** <br>(gauge) | paquetes acumulados descartados debido a que el buffer está lleno<br>_Se muestra como paquete_ |
| **cisco_aci.fabric.port.egr_drop_pkts.errors** <br>(gauge) | paquetes perdidos por errores<br>_Se muestra como paquete_ |
| **cisco_aci.fabric.port.egr_total.bytes.cum** <br>(gauge) | bytes acumulados enviados desde el puerto<br>_Se muestra en bytes_ |
| **cisco_aci.fabric.port.egr_total.bytes.rate** <br>(gauge) | bytes por segundo enviados desde el puerto<br>_Se muestra en bytes_ |
| **cisco_aci.fabric.port.egr_total.pkts** <br>(gauge) | paquetes enviados desde el puerto<br>_Se muestra como paquete_ |
| **cisco_aci.fabric.port.egr_total.pkts.rate** <br>(gauge) | paquetes por segundo enviados desde el puerto<br>_Se muestra como paquete_ |
| **cisco_aci.fabric.port.fault_counter.crit** <br>(gauge) | número de fallos críticos en el puerto<br>_Se muestra como fallo_ |
| **cisco_aci.fabric.port.fault_counter.warn** <br>(gauge) | número de advertencias en el puerto<br>_Se muestra como fallo_ |
| **cisco_aci.fabric.port.ingr_bytes.flood** <br>(gauge) | paquetes de inundación de ingreso<br>_Se muestra en bytes_ |
| **cisco_aci.fabric.port.ingr_bytes.flood.cum** <br>(gauge) | paquetes de inundación acumulados enviados al puerto<br>_Se muestra en bytes_ |
| **cisco_aci.fabric.port.ingr_bytes.multicast** <br>(gauge) | número de bytes multicast entrantes en el puerto<br>_Se muestra en bytes_ |
| **cisco_aci.fabric.port.ingr_bytes.multicast.cum** <br>(gauge) | bytes multicast acumulados enviados al puerto<br>_Se muestra en bytes_ |
| **cisco_aci.fabric.port.ingr_bytes.unicast** <br>(gauge) | número de bytes unicast entrantes en el puerto<br>_Se muestra en bytes_ |
| **cisco_aci.fabric.port.ingr_bytes.unicast.cum** <br>(gauge) | bytes acumulados enviados al puerto<br>_Se muestra en bytes_ |
| **cisco_aci.fabric.port.ingr_total.bytes.cum** <br>(gauge) | bytes acumulados enviados al puerto<br>_Se muestra en bytes_ |
| **cisco_aci.fabric.port.ingr_total.bytes.rate** <br>(gauge) | bytes por segundo enviados al puerto<br>_Se muestra en bytes_ |
| **cisco_aci.fabric.port.ingr_total.pkts** <br>(indicador) | paquetes enviados al puerto<br>_Se muestra como paquete_ |
| **cisco_aci.fabric.port.ingr_total.pkts.rate** <br>(gauge) | paquetes por segundo enviados al puerto<br>_Se muestra como paquete_ |
| **cisco_aci.fabric.port.status** <br>(gauge) | Para cada interfaz de cada dispositivo Cisco ACI monitorizado, esta métrica informa siempre de 1 el estado con una etiqueta, siempre y cuando se pueda utilizar un estado "combinado" para los monitores.|
| **cisco_aci.tenant.application.endpoint.fault_counter** <br>(gauge) | Representa la advertencia Fallo. Es el valor medio leído por el contador durante el intervalo de recopilación. Ten en cuenta que este valor se pone en 0 al principio de cada intervalo<br>_Se muestra como fallo_ |
| **cisco_aci.tenant.application.endpoint.health** <br>(gauge) | Representa las estadísticas más recientes de salud del endpoint<br>_Se muestra como porcentaje_ |
| **cisco_aci.tenant.application.endpoint.overall_health** <br>(gauge) | Representa las estadísticas de salud general del endpoint<br>_Se muestra como porcentaje_ |
| **cisco_aci.tenant.application.fault_counter** <br>(gauge) | Representa la advertencia Fallo. Es el valor medio leído por el contador durante el intervalo de recopilación. Ten en cuenta que este valor se pone en 0 al principio de cada intervalo<br>_Se muestra como fallo_ |
| **cisco_aci.tenant.application.health** <br>(gauge) | Representa las estadísticas más actuales de salud de la aplicación<br>_Se muestra como porcentaje_ |
| **cisco_aci.tenant.application.overall_health** <br>(gauge) | Representa las estadísticas de salud general de la aplicación<br>_Se muestra como porcentaje_ |
| **cisco_aci.tenant.egress_bytes.drop.cum** <br>(gauge) | Representa los bytes descartados de egreso. La suma total de los valores leídos. Ten en cuenta que este valor continúa a través de cada intervalo sin ponerse en cero<br>_Se muestra en bytes_ |
| **cisco_aci.tenant.egress_bytes.flood.cum** <br>(gauge) | Representa los bytes de inundación de egreso. La suma total de los valores leídos. Ten en cuenta que este valor continúa a través de cada intervalo sin ponerse en cero<br>_Se muestra en bytes_ |
| **cisco_aci.tenant.egress_bytes.multicast.cum** <br>(gauge) | Representa la suma total de los valores leídos por el contador multicast. Ten en cuenta que este valor continúa a través de cada intervalo sin ponerse en cero<br>_Se muestra en bytes_ |
| **cisco_aci.tenant.egress_bytes.multicast.rate** <br>(gauge) | Representa la frecuencia de lecturas del contador multicast de egreso en un intervalo. La frecuencia se calcula dividiendo el valor periódico por la longitud del intervalo. Este valor se pone en 0 al principio de cada intervalo<br>_Se muestra en bytes_ |
| **cisco_aci.tenant.egress_bytes.unicast.cum** <br>(gauge) | Representa la suma total de los valores leídos por el contador unicast. Ten en cuenta que este valor continúa a través de cada intervalo sin ponerse en cero<br>_Se muestra en bytes_ |
| **cisco_aci.tenant.egress_bytes.unicast.rate** <br>(gauge) | Representa la frecuencia de lecturas del contador unicast de egreso en un intervalo. La frecuencia se calcula dividiendo el valor periódico por la longitud del intervalo. Este valor se pone en 0 al principio de cada intervalo<br>_Se muestra en bytes_ |
| **cisco_aci.tenant.egress_pkts.drop.cum** <br>(gauge) | Representa los paquetes descartados de egreso. La suma total de los valores leídos. Ten en cuenta que este valor continúa a través de cada intervalo sin ponerse en cero<br>_Se muestra como paquete_ |
| **cisco_aci.tenant.egress_pkts.flood.cum** <br>(gauge) | Representa los paquetes de inundación de egreso. La suma total de los valores leídos. Ten en cuenta que este valor continúa a través de cada intervalo sin ponerse en cero<br>_Se muestra como paquete_ |
| **cisco_aci.tenant.egress_pkts.multicast.cum** <br>(gauge) | Representa la suma total de los valores leídos por el contador multicast. Ten en cuenta que este valor continúa a través de cada intervalo sin ponerse en cero<br>_Se muestra como paquete_ |
| **cisco_aci.tenant.egress_pkts.multicast.rate** <br>(gauge) | Representa la frecuencia de lecturas del contador multicast de ingreso en un intervalo. La frecuencia se calcula dividiendo el valor periódico por la longitud del intervalo. Este valor se pone en 0 al principio de cada intervalo<br>_Se muestra como paquete_ |
| **cisco_aci.tenant.egress_pkts.unicast.cum** <br>(gauge) | Representa la suma total de los valores leídos por el contador unicast. Ten en cuenta que este valor continúa a través de cada intervalo sin ponerse en cero<br>_Se muestra como paquete_ |
| **cisco_aci.tenant.egress_pkts.unicast.rate** <br>(gauge) | Representa la frecuencia de lecturas del contador unicast de ingreso en un intervalo. La frecuencia se calcula dividiendo el valor periódico por la longitud del intervalo. Este valor se pone en 0 al principio de cada intervalo<br>_Se muestra como paquete_ |
| **cisco_aci.tenant.fault_counter** <br>(gauge) | Representa la advertencia Fallo. Es el valor medio leído por el contador durante el intervalo de recopilación. Ten en cuenta que este valor se pone en 0 al principio de cada intervalo<br>_Se muestra como fallo_ |
| **cisco_aci.tenant.health** <br>(gauge) | Representa las estadísticas más recientes de salud del inquilino<br>_Se muestra como porcentaje_ |
| **cisco_aci.tenant.ingress_bytes.drop.cum** <br>(gauge) | Representa los bytes descartados de ingreso. La suma total de los valores leídos. Ten en cuenta que este valor continúa a través de cada intervalo sin ponerse en cero<br>_Se muestra en bytes_ |
| **cisco_aci.tenant.ingress_bytes.flood.cum** <br>(gauge) | Representa los bytes de inundación de ingreso. La suma total de los valores leídos. Ten en cuenta que este valor continúa a través de cada intervalo sin ponerse en cero<br>_Se muestra en bytes_ |
| **cisco_aci.tenant.ingress_bytes.multicast.cum** <br>(gauge) | Representa los bytes unicast de ingreso. La suma total de los valores leídos. Ten en cuenta que este valor continúa a través de cada intervalo sin ponerse en cero<br>_Se muestra en bytes_ |
| **cisco_aci.tenant.ingress_bytes.multicast.rate** <br>(gauge) | Representa los bytes multicast de ingreso. Es la frecuencia del contador durante el intervalo de recopilación. La frecuencia se calcula dividiendo el valor periódico por la longitud del intervalo de recopilación. Ten en cuenta que este valor se pone en 0 al principio de cada intervalo.<br>_Se muestra en bytes_ |
| **cisco_aci.tenant.ingress_bytes.unicast.cum** <br>(gauge) | Representa los bytes unicast de ingreso. La suma total de los valores leídos. Ten en cuenta que este valor continúa a través de cada intervalo sin ponerse en cero<br>_Se muestra en bytes_ |
| **cisco_aci.tenant.ingress_bytes.unicast.rate** <br>(gauge) | Representa los bytes unicast de ingreso. Es la frecuencia del contador durante el intervalo de recopilación. La frecuencia se calcula dividiendo el valor periódico por la longitud del intervalo de recopilación. Ten en cuenta que este valor se pone en 0 al principio de cada intervalo.<br>_Se muestra en bytes_ |
| **cisco_aci.tenant.ingress_pkts.drop.cum** <br>(gauge) | Representa los paquetes descartados de ingreso. La suma total de los valores leídos. Ten en cuenta que este valor continúa a través de cada intervalo sin ponerse en cero<br>_Se muestra como paquete_ |
| **cisco_aci.tenant.ingress_pkts.flood.cum** <br>(gauge) | Representa los paquetes de inundación de ingreso. La suma total de los valores leídos. Ten en cuenta que este valor continúa a través de cada intervalo sin ponerse en cero<br>_Se muestra como paquete_ |
| **cisco_aci.tenant.ingress_pkts.multicast.cum** <br>(gauge) | Representa los paquetes multicast de ingreso. La suma total de los valores leídos. Ten en cuenta que este valor continúa a través de cada intervalo sin ponerse en cero<br>_Se muestra como paquete_ |
| **cisco_aci.tenant.ingress_pkts.multicast.rate** <br>(gauge) | Representa los paquetes multicast de ingreso. Es la frecuencia del contador durante el intervalo de recopilación. La frecuencia se calcula dividiendo el valor periódico por la longitud del intervalo de recopilación. Ten en cuenta que este valor se pone en 0 al principio de cada intervalo.<br>_Se muestra como paquete_ |
| **cisco_aci.tenant.ingress_pkts.unicast.cum** <br>(gauge) | Representa los paquetes unicast de ingreso. La suma total de los valores leídos. Ten en cuenta que este valor continúa a través de cada intervalo sin ponerse en cero<br>_Se muestra como paquete_ |
| **cisco_aci.tenant.ingress_pkts.unicast.rate** <br>(gauge) | Representa los paquetes unicast de ingreso. Es la frecuencia del contador durante el intervalo de recopilación. La frecuencia se calcula dividiendo el valor periódico por la longitud del intervalo de recopilación. Ten en cuenta que este valor se pone en 0 al principio de cada intervalo.<br>_Se muestra como paquete_ |
| **cisco_aci.tenant.overall_health** <br>(gauge) | Representa las estadísticas de salud general del inquilino<br>_Se muestra como porcentaje_ |

### Eventos

El check de Cisco ACI envía fallas de inquilino como eventos.

### Checks de servicio

**cisco_aci.can_connect**

Devuelve `CRITICAL` si el check del Agent no puede conectarse a la instancia cisco_aci monitorizada. Devuelve `OK` en caso contrario.

_Estados: ok, crítico_

## Solucionar problemas

### Métricas `cisco_aci.tenant.*` faltantes

Si faltan las métricas `cisco_aci.tenant.*`, puedes ejecutar el script `test/cisco_aci_query.py` para consultar manualmente el endpoint del inquilino.

Modifica `apic_url`, `apic_username` y `apic_password` según tu información de configuración e ingresa la URL del inquilino para `apic_url`.

Verifica que la salida que obtienes al aplicar cURL al endpoint coincida con alguna de las métricas recopiladas en `datadog_checks/cisco_aci/aci_metrics.py`. Si ninguna de las estadísticas coincide, significa que el endpoint no está emitiendo ninguna estadística que la integración pueda recopilar.

### Tiempos de ejecución largos

Debido a que este check consulta a todos los inquilinos, las aplicaciones y los endpoints enumerados antes de devolver las métricas, es posible que esta integración genere tiempos de ejecución largos.

```yaml
  cisco_aci (2.2.0)
-----------------
  Instance ID: cisco_aci:d3a2958f66f46212 [OK]
  Configuration Source: file:/etc/datadog-agent/conf.d/cisco_aci.d/conf.yaml
  Total Runs: 1
  Metric Samples: Last Run: 678, Total: 678
  Events: Last Run: 0, Total: 0
  Service Checks: Last Run: 1, Total: 1
  Average Execution Time : 28m20.95s
  Last Execution Date : 2023-01-04 15:58:04 CST / 2023-01-04 21:58:04 UTC (1672869484000)
  Last Successful Execution Date : 2023-01-04 15:58:04 CST / 2023-01-04 21:58:04 UTC (1672869484000)
```

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog](https://docs.datadoghq.com/help/).