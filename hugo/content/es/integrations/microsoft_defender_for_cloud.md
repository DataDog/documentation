---
app_id: microsoft-defender-for-cloud
app_uuid: e9e9981e-c97a-4395-a98b-b39b2adf1bb6
assets:
  dashboards:
    MicrosoftDefenderforCloud-Overview: assets/dashboards/MicrosoftDefenderforCloud-Overview_dashboard.json
  integration:
    auto_install: false
    events:
      creates_events: false
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10376
    source_type_name: Microsoft Defender for Cloud
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- azure
- nube
- recopilación de logs
- seguridad
custom_kind: integración
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: microsoft_defender_for_cloud
integration_id: microsoft-defender-for-cloud
integration_title: Microsoft Defender for Cloud
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: microsoft_defender_for_cloud
public_title: Microsoft Defender for Cloud
short_description: Monitorizar Microsoft Defender for Cloud
supported_os: []
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Categoría::Azure
  - Categoría::Nube
  - Categoría::Recopilación de logs
  - Categoría::Seguridad
  - Oferta::Integración
  configuration: README.md#Configuración
  description: Monitorizar Microsoft Defender for Cloud
  media: []
  overview: README.md#Información general
  support: README.md#Soporte
  title: Microsoft Defender for Cloud
---

<!--  EXTRAÍDO DE https://github.com/DataDog/integrations-internal-core -->


## Información general

Recopila logs y alertas de [Microsoft Defender for Cloud][1].

Defender for Cloud es una plataforma de protección de aplicaciones nativa en la nube (CNAPP) que monitoriza las aplicaciones de Microsoft Azure, ofrece información sobre los riesgos de seguridad de Azure mediante la gestión de la postura de seguridad en la nube (CSPM) y protege las cargas de trabajo en la nube de Azure para servidores, contenedores, almacenamiento y bases de datos (CWPP).

Habilita Datadog Cloud SIEM para utilizar reglas de seguridad predefinidas y monitorizar tu entorno Azure junto con el resto de tu infraestructura de seguridad.

## Configuración

### Instalación

Esta integración requiere que la integración Datadog Azure esté habilitada y reenvía logs a Datadog a través de Azure utilizando centros de eventos. La integración requiere que la versión del forwarder de logs sea `1.0.1` o posterior.

### Configuración

Configura Defender for Cloud para [exportar logs continuamente][2] al centro de eventos. No es necesaria ninguna configuración adicional en Datadog.

### Validación

Sigue [estas instrucciones de Microsoft][3] para generar alertas de muestras en Defender for Cloud.

Se puede acceder a los logs de Defender for Cloud utilizando `source:microsoft-defender-for-cloud` en Gestión de Logs.

Si utilizas Datadog Cloud SIEM, confirma que las reglas de detección de Microsoft Defender for Cloud están activadas:
1. En el menú de Datadog, ve a **Security** > **Configuration** (Seguridad > Configuración) y amplía **Cloud SIEM**.
1. Selecciona "Reglas de detección". En la parte derecha, haz clic en el selector **Group By** (Agrupar por) y selecciona **Fuente** para agrupar las reglas de detección por fuente.
1. Desplázate hacia abajo y amplía la sección titulada **Azure**. Desplázate por la lista hasta encontrar las reglas de Microsoft Defender for Cloud. Asegúrate de que las reglas están activadas.


## Datos recopilados

### Métricas

Microsoft Defender for Cloud no incluye métricas.

### Checks de servicio

Microsoft Defender for Cloud no incluye checks de servicios.

### Eventos

Microsoft Defender for Cloud no incluye eventos.

## Solucionar problemas

Para confirmar que Cloud SIEM está recibiendo alertas de Defender for Cloud, sigue estos pasos: 
1. En el menú de Datadog, ve a **Security** > **Configuration** (Seguridad > Configuración) y amplía **Cloud SIEM**.
1. Selecciona **Fuentes de logs** y desplázate hasta **Azure**. 
1. Comprueba si Microsoft Defender for Cloud aparece como **Instalado**. 
1. Inspecciona el gráfico de columnas para confirmar que se están recibiendo logs.
1. Si se reciben logs, ve a **Logs** > **Search** (Logs > Buscar) y busca `source:microsoft-defender-for-cloud`. Es posible que tengas que cambiar el periodo de tiempo para que aparezcan los logs. 
1. Inspecciona los logs y confirma que están bien formados.

Si sigues teniendo problemas, ponte en contacto con el [servicio de asistencia de Datadog][4].

[1]: https://learn.microsoft.com/en-us/azure/defender-for-cloud/defender-for-cloud-introduction
[2]: https://learn.microsoft.com/en-us/azure/defender-for-cloud/continuous-export?tabs=azure-portal
[3]: https://learn.microsoft.com/en-us/azure/defender-for-cloud/alert-validation
[4]: https://docs.datadoghq.com/es/help/