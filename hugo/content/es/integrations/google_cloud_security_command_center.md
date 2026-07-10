---
app_id: google-cloud-security-command-center
app_uuid: 200f1a0b-a67f-4096-a322-91aaee4f0de5
assets:
  dashboards:
    google-cloud-security-command-center: assets/dashboards/google_cloud_security_command_center_overview.json
  integration:
    auto_install: false
    events:
      creates_events: false
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 371
    source_type_name: Google Cloud Security Command Center
  logs:
    source: google.security.command.center
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- google cloud
- recopilación de logs
- seguridad
custom_kind: integración
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: google_cloud_security_command_center
integration_id: google-cloud-security-command-center
integration_title: Google Cloud Security Command Center
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: google_cloud_security_command_center
public_title: Google Cloud Security Command Center
short_description: Security Command Center es un servicio central de informes sobre
  vulnerabilidades y amenazas.
supported_os: []
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Categoría::Google Cloud
  - Categoría::Recopilación de logs
  - Tipo de datos enviados::Logs
  - Categoría::Seguridad
  - Oferta::Integración
  configuration: README.md#Configuración
  description: Security Command Center es un servicio central de informes sobre vulnerabilidades
    y amenazas.
  media: []
  overview: README.md#Información general
  resources:
  - resource_type: Blog
    url: https://www.datadoghq.com/blog/datadog-google-security-command-center/
  - resource_type: Blog
    url: https://www.datadoghq.com/blog/datadog-security-google-cloud/
  support: README.md#Soporte
  title: Google Cloud Security Command Center
---

<!--  EXTRAÍDO DE https://github.com/DataDog/integrations-internal-core -->
## Información general

El Google Cloud Security Command Center te ayuda a reforzar tu postura de seguridad:
   * Evaluando la seguridad y la superficie de ataque de los datos
   * Proporcionando el inventario y una detección de recursos
   * Identificando errores de configuración, vulnerabilidades y amenazas
   * Ayuda para mitigar y corregir los riesgos

Security Command Center utiliza servicios, como Event Threat Detection y Security Health Analytics, para detectar problemas de seguridad en tu entorno. Estos servicios analizan tus logs y recursos en Google Cloud en busca de indicadores de amenazas, vulnerabilidades de software y errores de configuración. Los servicios también se mencionan como fuentes. 
Para obtener más información, consulta [Fuentes de seguridad][1].

Cuando estos servicios detectan una amenaza, una vulnerabilidad o un error de configuración, emiten un hallazgo. Un hallazgo es un informe o un registro de una amenaza, una vulnerabilidad o un error de configuración individual, encontradas por el servicio en tu entorno Google Cloud. Los hallazgos muestran el problema detectado, el recurso de Google Cloud afectado por el problema y una guía sobre cómo solucionarlo.

## Configuración

### Instalación

Antes de empezar, asegúrate de que las siguientes API están habilitadas para los proyectos de los que quieres recopilar hallazgos de Google Cloud Security Command Center:
  * [API del gestor de recursos en la nube][2]
  * [API de facturación de Google Cloud][3]
  * [API del Google Cloud Security Command Center][4]

### Asignación de roles a cuentas de servicio
Una cuenta de servicio debe tener este rol para recuperar hallazgos del GCP Security Command Center.
Si este rol no está habilitado, los logs pueden no aparecer debido a un error de permisos denegados.

Asigna el siguiente rol:
   * ***Visor de hallazgos del Centro de seguridad*** 

**NOTA:** 

Si el mismo proyecto es detectado por varias cuentas de servicio, todas las cuentas de servicio adjuntas
deben tener añadido el [rol de visor de hallazgos del Centro de seguridad][5].

El incumplimiento de este requisito puede dar lugar a errores de denegación de permisos. En ese caso, no podremos recopilar los
hallazgos de seguridad de este proyecto. Por lo tanto, es importante asegurarse de que todas las cuentas de servicio tengan los permisos
necesarios para acceder a los hallazgos de seguridad de cualquier proyecto al que estén asociados.

### Configuración

Google Cloud Security Command Center se incluye como parte del paquete de la [integración Google Cloud Platform][6]. 
Si aún no lo has hecho, sigue este documento para configurar primero la [integración Google Cloud Platform][7].

En el cuadro principal de la integración Google Cloud Platform:
1.  Abre la cuenta de servicio o el ID de proyecto correspondiente al proyecto del que quieres extraer hallazgos de seguridad.
2.  En la pestaña **Hallazgos de seguridad**, habilita la recopilación de hallazgos de seguridad utilizando el conmutador.

Una vez habilitada esta función, la recopilación de tus hallazgos de seguridad puede tardar hasta ***1 día**.

## Datos recopilados

#### Recopilación de logs

Los hallazgos del Google Cloud Security Command Center se recopilan como logs con la [API de cliente del Google Cloud Security Command Center][8].

En el Explorador de logs de Datadog, busca logs de Google Cloud Security Command Center utilizando el siguiente filtro:
   * Definir los ```Findings``` como **Servicio**
   * Definir ```google.security.command.center``` como **Fuente**
   * El estado de los logs es **Información**.

### Métricas

Google Cloud Security Command Center no incluye métricas.

### Checks de servicio

Google Cloud Security Command Center no incluye checks de servicios.

### Eventos

Google Cloud Security Command Center no incluye eventos.

## Solucionar problemas

¿Necesitas ayuda? [Consulta el servicio de asistencia de Datadog][9].

## Referencias adicionales

Más enlaces, artículos y documentación útiles:

- [Organizar y analizar tus hallazgos de seguridad en Google Cloud con Datadog][10]
- [Datadog Security amplía las funciones de cumplimiento y protección frente a amenazas de Google Cloud][11]

[1]: https://cloud.google.com/security-command-center/docs/concepts-security-sources
[2]: https://console.cloud.google.com/apis/library/cloudresourcemanager.googleapis.com
[3]: https://console.cloud.google.com/apis/library/cloudbilling.googleapis.com
[4]: https://console.cloud.google.com/apis/library/securitycenter.googleapis.com
[5]: https://cloud.google.com/security-command-center/docs/access-control-org#securitycenter.findingsViewer
[6]: https://app.datadoghq.com/integrations/google-cloud-platform
[7]: https://docs.datadoghq.com/es/integrations/google_cloud_platform/
[8]: https://cloud.google.com/security-command-center/docs
[9]: https://docs.datadoghq.com/es/help/
[10]: https://www.datadoghq.com/blog/datadog-google-security-command-center/
[11]: https://www.datadoghq.com/blog/datadog-security-google-cloud/