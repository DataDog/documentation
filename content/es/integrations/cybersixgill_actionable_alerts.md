---
app_id: cybersixgill-actionable-alerts
app_uuid: b27feb80-b06f-4200-981a-e91a031d62e6
assets:
  dashboards:
    cybersixgill: assets/dashboards/cybersixgill_actionable_alerts_overview.json
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: true
    metrics:
      check: []
      metadata_path: metadata.csv
      prefix: alertas_cybersixgill_procesables
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10342
    source_type_name: alertas_cybersixgill_procesables
author:
  homepage: https://www.cybersixgill.com/
  name: Cybersixgill
  sales_email: info@cybersixgill.com
  support_email: support@cyebrsixgill.com
categories:
- seguridad
- gestión de eventos
custom_kind: integración
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/cybersixgill_actionable_alerts/README.md
display_on_public_website: true
draft: false
git_integration_title: alertas_cybersixgill_procesables
integration_id: cybersixgill-actionable-alerts
integration_title: Alertas Cybersixgill procesables
integration_version: 1.0.1
is_public: true
manifest_version: 2.0.0
name: alertas_cybersixgill_procesables
public_title: Alertas Cybersixgill procesables
short_description: Monitorizar la actividad de los recursos y proporcionar alertas
  en tiempo real sobre las amenazas entrantes
supported_os:
- Linux
- Windows
- macOS
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Oferta::Integración
  - Sistema operativo compatible::Linux
  - Sistema operativo compatible::Windows
  - Sistema operativo compatible::macOS
  - Categoría::Seguridad
  - Categoría::Gestión de eventos
  - Tipo de datos enviados::Eventos
  configuration: README.md#Configuración
  description: Monitorizar la actividad de los recursos y proporcionar alertas en
    tiempo real sobre las amenazas entrantes
  media:
  - caption: Imagen de dashboard del recuento de alertas
    image_url: images/dashboard_count.PNG
    media_type: imagen
  - caption: Imagen de dashboard de la lista de eventos con título
    image_url: images/dashboard_emerging_alerts_count.PNG
    media_type: imagen
  - caption: Imagen de dashboard del recuento de alertas emergentes
    image_url: images/dashboard_events_list.PNG
    media_type: imagen
  - caption: Imagen de dashboard del recuento de alertas inminentes
    image_url: images/dashboard_imminent_alerts_count.PNG
    media_type: imagen
  overview: README.md#Información general
  support: README.md#Soporte
  title: Alertas Cybersixgill procesables
---

<!--  EXTRAÍDO DE https://github.com/DataDog/integrations-extras -->


## Información general
El check de las alertas Cybersixgill procesables monitoriza recursos críticos en la web profunda, oscura y superficial, como direcciones IP, dominios, vulnerabilidades y VIP. Recibe alertas con contexto, incluyendo gravedad, tipo de amenaza, descripción, fragmento de mensaje, recomendaciones y evaluaciones. Esta integración proporciona un dashboard predefinido para priorizar y responder a las amenazas.

## Configuración


### Instalación

Para instalar el check de las alertas Cybersixgill procesables en tu host:
1. Instala la [herramienta para desarrolladores][1] en cualquier máquina.
2. Para compilar el paquete, ejecuta el comando: `ddev release build cybersixgill_actionable_alerts`.
3. [Instala el Datadog Agent][2] en tu host.
4. Una vez instalado el Agent, ejecuta el siguiente comando para instalar la integración:
```
datadog-agent integration install -t datadog-cybersixgill-actionable-alerts==1.0.1
```

### Configuración
5. Ponte en contacto con el [servicio de asistencia de Cybersixgill][3] y solicita acceso a la plataforma para desarrolladores Cybersixgill.
6. Recibe el correo electrónico de bienvenida con acceso a la plataforma para desarrolladores Cybersixgill.
7. En la plataforma para desarrolladores Cybersixgill, crea el ID de cliente y el secreto de cliente.
8. Copia el ID de cliente y el secreto de cliente, y pégalos en el archivo de configuración .yaml.
9. Indica el intervalo mínimo de recopilación en segundos. Por ejemplo, `min_collection_interval: 3600`

### Validación
Asegúrate de que se generan eventos Cybersixgill en el [Explorador de eventos de Datadog][4].

## Datos recopilados

### Checks de servicio
{{< get-service-checks-from-git "cybersixgill-actionable-alerts" >}}


### Eventos
Esta integración envía eventos de tipo API a Datadog.

## Solucionar problemas
¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Cybersixgill][3].


[1]: https://docs.datadoghq.com/es/developers/integrations/new_check_howto/?tab=configurationtemplate#configure-the-developer-tool
[2]: https://app.datadoghq.com/account/settings/agent/latest
[3]: mailto:support@cybersixgill.com
[4]: https://app.datadoghq.com/event/explorer
[5]: https://github.com/DataDog/integrations-extras/blob/master/cybersixgill_actionable_alerts/assets/service_checks.json