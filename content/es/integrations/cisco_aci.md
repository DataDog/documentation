---
app_id: cisco-aci
app_uuid: fab40264-45aa-434b-9f9f-dc0ab609dd49
assets:
  dashboards:
    cisco_aci: assets/dashboards/cisco_aci_dashboard.json
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: true
    metrics:
      check: cisco_aci.fabric.node.health.cur
      metadata_path: metadata.csv
      prefix: cisco_aci.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 210
    source_type_name: Cisco ACI
  logs:
    source: cisco-aci
  monitors:
    CPU usage is high for Cisco ACI device: assets/monitors/cpu_high.json
    Cisco ACI critical severity fault: assets/monitors/critical_fault.json
    Health score of device is critical: assets/monitors/critical_health_score.json
    Interface for a Cisco ACI device is down: assets/monitors/interface_down.json
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- log collection
- network
custom_kind: integración
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/cisco_aci/README.md
display_on_public_website: verdadero
draft: falso
git_integration_title: cisco_aci
integration_id: cisco-aci
integration_title: CiscoACI
integration_version: 4.7.0
is_public: verdadero
manifest_version: 2.0.0
name: cisco_aci
public_title: CiscoACI
short_description: Rastrea el rendimiento y el uso de Cisco ACI.
supported_os:
- linux
- macos
- windows
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS::Linux
  - Supported OS::macOS
  - Supported OS::Windows
  - Category::Recopilación de logs
  - Category::Network
  - Offering::Integration
  configuration: README.md#Setup
  description: Rastrea el rendimiento y el uso de Cisco ACI.
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: CiscoACI
---

<!--  EXTRAÍDO DE https://github.com/DataDog/integrations-core -->


## Información general

La integración de Cisco ACI te permite:

- Rastrear el estado de tu red
- Rastrear la capacidad de tu ACI
- Monitorizar los propios conmutadores y controladores
- La capacidad de monitorizar dispositivos a través de [Network Devices Monitoring][1]

## Configuración

### Instalación

El check de Cisco ACI está incluido con el Agent, así que simplemente [instala el Agent][2] en un servidor dentro de tu red.

### Configuración

{{< tabs >}}
{{% tab "Host" %}}

#### Host

Para configurar este check para un Agent que se ejecuta en un host:

1. Edita el archivo `cisco_aci.d/conf.yaml`, que se encuentra en la carpeta `conf.d/` en la raíz del [directorio de configuración del Agent][1]. Consulta el [cisco_aci.d/conf.yaml de ejemplo][2] para conocer todas las opciones de configuración disponibles:

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

2. [Reinicia el Agent][3] para empezar a enviar métricas de Cisco ACI a Datadog.

[1]: https://docs.datadoghq.com/es/agent/guide/agent-configuration-files/#agent-configuration-directory
[2]: https://github.com/DataDog/integrations-core/blob/master/cisco_aci/datadog_checks/cisco_aci/data/conf.yaml.example
[3]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#start-stop-and-restart-the-agent
{{% /tab %}}
{{% tab "Contenedores" %}}

#### Contenedores

En el caso de los entornos en contenedores, consulta las [plantillas de integración de Autodiscovery][1] para obtener orientación sobre la aplicación de los parámetros que se indican a continuación.

| Parámetro            | Valor                                                                  |
| -------------------- | ---------------------------------------------------------------------- |
| `<INTEGRATION_NAME>` | `cisco_aci`                                                            |
| `<INIT_CONFIG>`      | en blanco o `{}`                                                          |
| `<INSTANCE_CONFIG>`  | `{"aci_url":"%%host%%", "username":"<USERNAME>", "pwd": "<PASSWORD>"}` |

[1]: https://docs.datadoghq.com/es/agent/kubernetes/integrations/
{{% /tab %}}
{{< /tabs >}}

### Validación

[Ejecuta el subcomando `status`del Agent][3] y busca `cisco_aci` en la sección Checks.

## Perfiles de proveedores

Para encontrar perfiles de proveedores específicos compatibles con esta integración, consulta la página de [proveedores de red][4].

## Datos recopilados

### Métricas
{{< get-metrics-from-git "cisco_aci" >}}


### Eventos

El check de Cisco ACI envía fallas de inquilino como eventos.

### Checks de servicio
{{< get-service-checks-from-git "cisco_aci" >}}


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

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog][5].


[1]: https://www.datadoghq.com/product/network-monitoring/network-device-monitoring/
[2]: https://app.datadoghq.com/account/settings/agent/latest
[3]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#agent-status-and-information
[4]: https://docs.datadoghq.com/es/network_monitoring/devices/supported_devices/
[5]: https://docs.datadoghq.com/es/help/