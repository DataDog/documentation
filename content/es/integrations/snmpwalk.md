---
"app_id": "snmpwalk"
"app_uuid": "bc37c561-7ac5-4799-a56b-d85347bc9ff1"
"assets": {}
"author":
  "homepage": "https://github.com/DataDog/integrations-extras"
  "name": "Comunidad"
  "sales_email": "help@datadoghq.com"
  "support_email": "help@datadoghq.com"
"categories":
- "notifications"
- "network"
"custom_kind": "integración"
"dependencies":
- "https://github.com/DataDog/integrations-extras/blob/master/snmpwalk/README.md"
"display_on_public_website": true
"draft": false
"git_integration_title": "snmpwalk"
"integration_id": "snmpwalk"
"integration_title": "SNMP walk"
"integration_version": "1.0.0"
"is_public": true
"manifest_version": "2.0.0"
"name": "snmpwalk"
"public_title": "SNMP walk"
"short_description": "Descripción de snmpwalk"
"supported_os":
- "linux"
- "macos"
- "windows"
"tile":
  "changelog": "CHANGELOG.md"
  "classifier_tags":
  - "Supported OS::Linux"
  - "Supported OS::macOS"
  - "Supported OS::Windows"
  - "Category::Notificaciones"
  - "Category::Red"
  - "Offering::Integración"
  "configuration": "README.md#Configuración"
  "description": "descripción de snmpwalk"
  "media": []
  "overview": "README.md#Información general"
  "support": "README.md#Soporte"
  "title": "SNMP walk"
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## Información general

Esta integración permite conocer los estados de SNMP walk en tiempo real para:

- Visualiza y monitoriza estados de SNMP walk.
- Recibe notificaciones sobre conmutaciones por error de SNMP walk.

## Configuración

El check de SNMP walk está incluido en el paquete del [Datadog Agent][1], por lo que no necesitas instalarlo.

También puedes utilizar el comando [`snmp walk`][2] como alternativa a esta integración:

```
sudo -u dd-agent datadog-agent snmp walk
```

### Instalación

Para el Agent v7.21/v6.21 o posteriores, sigue las instrucciones a continuación para instalar el check de SNMP walk en tu host. Para instalarlo con el Agent Docker o versiones anteriores del Agent, consulta [Uso de integraciones de la comunidad][3].

1. Ejecuta el siguiente comando para instalar la integración del Agent:

   ```shell
   datadog-agent integration install -t datadog-snmpwalk==<INTEGRATION_VERSION>
   ```

2. Configura tu integración como si fuese una [integración][4] básica

### Configuración

1. Edita el archivo `snmpwalk.d/conf.yaml`, que se encuentra en la carpeta `conf.d/` en la raíz del [directorio de configuración de tu Agent][5], para empezar a recopilar tus [métricas](#metrics) de SNMP walk. Para conocer todas las opciones de configuración disponibles, consulta el [snmpwalk.d/conf.yaml de ejemplo][6].

2. [Reinicia el Agent][7].

## Validación

[Ejecuta el subcomando de `status` del Agent][8] y busca `snmpwalk` en la sección **Checks**.

## Datos recogidos

### Métricas

La integración SNMP walk no incluye métricas.

### Eventos

El check de SNMP walk no incluye eventos.

### Checks de servicio

La integración SNMP walk no incluye checks de servicios.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog][9].


[1]: https://app.datadoghq.com/account/settings/agent/latest
[2]: https://docs.datadoghq.com/network_monitoring/devices/troubleshooting/?tab=linux#device-not-visible-in-datadog
[3]: https://docs.datadoghq.com/agent/guide/use-community-integrations/
[4]: https://docs.datadoghq.com/getting_started/integrations/
[5]: https://docs.datadoghq.com/agent/guide/agent-configuration-files/#agent-configuration-directory
[6]: https://github.com/DataDog/integrations-extras/blob/master/snmpwalk/datadog_checks/snmpwalk/data/conf.yaml.example
[7]: https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[8]: https://docs.datadoghq.com/agent/guide/agent-commands/#service-status
[9]: http://docs.datadoghq.com/help

