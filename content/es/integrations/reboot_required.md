---
app_id: reboot-required
app_uuid: 673a1136-68ad-46f4-ba6f-4203df10db6a
assets:
  integration:
    auto_install: true
    configuration: {}
    events:
      creates_events: false
    metrics:
      check: []
      metadata_path: metadata.csv
      prefix: reboot-required.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10209
    source_type_name: Reboot required
author:
  homepage: https://github.com/DataDog/integrations-extras
  name: Comunidad
  sales_email: support@krugerheavyindustries.com
  support_email: support@krugerheavyindustries.com
categories:
- developer tools
- os & system
custom_kind: integración
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/reboot_required/README.md
display_on_public_website: true
draft: false
git_integration_title: reboot_required
integration_id: reboot-required
integration_title: Reboot Required
integration_version: 1.0.0
is_public: true
manifest_version: 2.0.0
name: reboot_required
public_title: Reboot Required
short_description: Monitorización de sistemas que requieren un reinicio tras la actualización
  del software
supported_os:
- linux
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Herramientas para desarrolladores
  - Category::Sistema operativo y sistema
  - Supported OS::Linux
  - Offering::Integración
  configuration: README.md#Configuración
  description: Monitorización de sistemas que requieren un reinicio tras la actualización
    del software
  media: []
  overview: README.md#Información general
  support: README.md#Soporte
  title: Reboot Required
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## Información general

Los sistemas Linux que están configurados para instalar paquetes automáticamente podrían no estar configurados para su inicio automático (puede ser preferible programarlo manualmente). Este check permite activar alertas en caso de que los reinicios no se realicen a tiempo.

## Configuración

El check de Reboot Required está incluido en el paquete del [Datadog Agent][1], por lo que no necesitas instalarlo.

### Instalación

Para el Agent v7.21/v6.21 o posteriores, sigue las instrucciones a continuación para instalar el check de Reboot Required en tu host. Para instalarlo con el Agent Docker o versiones anteriores del Agent, consulta [Uso de integraciones de la comunidad][2].

1. Ejecuta el siguiente comando para instalar la integración del Agent:

   ```shell
   datadog-agent integration install -t datadog-reboot_required==<INTEGRATION_VERSION>
   ```

2. Configura tu integración como una [integración][3] de base.

### Configuración

1. Edita el archivo `reboot_required.d/conf.yaml`, que se encuentra en la carpeta `conf.d/` en la raíz del [directorio de configuración de tu Agent][4]. Para ver todas las opciones de configuración disponibles, consulta el [reboot_required.d/conf.yaml de ejemplo][5]:

2. Asegúrate de crear un directorio dd-agent (usuario que ejecuta el Datadog Agent) con permisos de escritura para el Agent y utilizado por este check. El valor por defecto de `/var/run/dd-agent` es ideal. El siguiente fragmento debería ser suficiente.

   ```shell
   sudo mkdir /var/run/dd-agent
   sudo chown dd-agent:dd-agent /var/run/dd-agent
   ```

3. [Reinicia el Agent][6].

### Validación

[Ejecuta el subcomando de `status` del Agent][7] y busca `reboot_required` en la sección **Checks**.

## Datos recopilados

### Métricas

No se recopilan métricas.

### Eventos

El check de reboot_required no incluye eventos.

### Checks de servicio
{{< get-service-checks-from-git "reboot-required" >}}


## Solucionar problemas

¿Necesitas ayuda? [Consulta el servicio de asistencia de Datadog][9].


[1]: https://app.datadoghq.com/account/settings/agent/latest
[2]: https://docs.datadoghq.com/es/agent/guide/use-community-integrations/
[3]: https://docs.datadoghq.com/es/getting_started/integrations/
[4]: https://docs.datadoghq.com/es/agent/guide/agent-configuration-files/#agent-configuration-directory
[5]: https://github.com/DataDog/integrations-extras/blob/master/reboot_required/datadog_checks/reboot_required/data/conf.yaml.example
[6]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[7]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#service-status
[8]: https://github.com/DataDog/integrations-extras/blob/master/reboot_required/assets/service_checks.json
[9]: http://docs.datadoghq.com/help