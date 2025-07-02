---
app_id: akamai
app_uuid: 5ee63b45-092e-4d63-b980-1675f328bf6b
assets:
  dashboards:
    akamai-application-security-overview: assets/dashboards/akamai_application_security_overview.json
  integration:
    auto_install: false
    configuration: {}
    events:
      creates_events: false
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10392
    source_type_name: Akamai
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- recopilación de logs
- seguridad
custom_kind: integración
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: akamai_application_security
integration_id: akamai
integration_title: Akamai Application Security
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: akamai_application_security
public_title: Akamai Application Security
short_description: Aprovecha la integración con Akamai para obtener logs de eventos
  de los productos de Akamai.
supported_os: []
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Tipo de datos enviados::Logs
  - Categoría::Recopilación de logs
  - Categoría::Seguridad
  - Oferta::Integración
  configuration: README.md#Configuración
  description: Aprovecha la integración con Akamai para obtener logs de eventos de
    los productos de Akamai.
  media:
  - caption: Dashboard de información general de Akamai Application Security
    image_url: images/akamai-application-security-dashboard.png
    media_type: imagen
  overview: README.md#Información general
  support: README.md#Soporte
  title: Akamai Application Security
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-internal-core -->
## Información general

### Akamai Application Security

Con la integración de Akamai Application Security, Datadog puede capturar logs de eventos de seguridad generados por tus configuraciones de seguridad de Akamai.
Esta integración proporciona una visibilidad en tiempo real e información de los patrones de tráfico web, permitiendo la rápida detección de
actividad maliciosa. También ayuda a identificar amenazas a la seguridad, como ataques DDoS, intrusiones de botnets y
vulnerabilidades de la capa de aplicación.

Tras recopilar eventos, Datadog rellena el [dashboard de información general de Akamai Application Security][1] con información
de datos de eventos de seguridad, información sobre amenazas, actividad de logs IP y actividad IP poco común.

## Configuración

### Instalación

No requiere instalación.

### Configuración

#### Recopilación de logs

Para capturar logs de eventos de seguridad generada desde la configuración de seguridad de Akamai, crea un cliente API en tu cuenta de Akamai y, a continuación, introduce las credenciales generadas en el [cuadro de la integración Akamai][2] en Datadog.

#### Creación de un cliente API en Akamai
1. Inicia sesión en tu [cuenta de Akamai][3]..
2. Busca **Gestión de identidad y acceso**..
3. Haz clic en **Create API Client** (Crear cliente API)..
4. En **Seleccionar las API**, busca **SIEM** y proporciona acceso de **SÓLO LECTURA**.
5. En **Seleccionar grupos**, asigna **Gestionar SIEM** al grupo asociado con tu política de seguridad.
6. Después de crear el cliente API, haz clic en **Create credential** (Crear credenciales) para generar tu conjunto de credenciales.
<!--4. Sigue las instrucciones que se indican a continuación para asignar los permisos correspondientes a tu producto Akamai. -->
<!-- TODO: Cuando se añade otro producto Akamai, elimina 4-6 arriba, descomenta 4 arriba, descomenta esta sección e incluye
otras instrucciones para el producto Akamai con el mismo formato.

#### Eventos de seguridad de Akamai
1. En **Seleccionar las API**, busca **SIEM** y proporciona acceso de **SÓLO LECTURA**
2. En **Seleccionar grupos**, asigna **Gestionar SIEM** al grupo asociado con tu política de seguridad.
3. Después de crear el cliente API, haz clic en **Create credential** (Crear credenciales) para generar tu conjunto de credenciales.
-->

#### Obtener los ID de configuración de tu cuenta

1. Una vez que hayas iniciado sesión, vaya a **Configuraciones de seguridad**.
2. En la lista de configuraciones de seguridad, selecciona la configuración de la que quieres obtener logs.
3. El ID de configuración para la configuración seleccionada se encuentra en la URL. La URL tiene el formato: `http\://control.akamai.com/apps/security-config/#/next/configs/**CONFIG_ID**`.
4. En tu cuenta, haz clic en **Add New** (Añadir nuevo) e introduce el ID de configuración que encontraste en el paso anterior.

## Datos recopilados

### Métricas

La integración Akamai no incluye métricas.

### Logs

La integración Akamai recopila logs de eventos de seguridad de tu cuenta de Akamai. Debido a las limitaciones de las API Akamai,
Datadog sólo puede recopilar hasta las últimas 12 horas de eventos históricos.

### Eventos

La integración Akamai no incluye eventos.

### Checks de servicio
{{< get-service-checks-from-git "akamai" >}}


## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog][5].

[1]: https://app.datadoghq.com/dash/integration/Akamai-Application-Security-Overview
[2]: https://app.datadoghq.com/integrations/akamai
[3]: https://control.akamai.com/apps/auth/#/login
[4]: https://github.com/DataDog/integrations-internal-core/blob/master/akamai/assets/service_checks.json
[5]: https://docs.datadoghq.com/es/help/
