---
aliases:
- /es/integrations/google_cloud_security_command_center
app_id: google-cloud-security-command-center
categories:
- google cloud
- recopilación de logs
- seguridad
custom_kind: integración
description: Security Command Center es un servicio central de informes sobre vulnerabilidades
  y amenazas.
further_reading:
- link: https://www.datadoghq.com/blog/datadog-google-security-command-center/
  tag: blog
  text: Organiza y analiza tus resultados de seguridad en Google Cloud con Datadog
- link: https://www.datadoghq.com/blog/datadog-security-google-cloud/
  tag: blog
  text: Datadog Security amplía las funciones de cumplimiento de normativas y protección
    frente a amenazas para Google Cloud
integration_version: 1.0.0
media: []
title: Google Cloud Security Command Center
---
## Información general

El Google Cloud Security Command Center te ayuda a reforzar tu postura de seguridad:

- Evaluando la seguridad y la superficie de ataque de los datos
- Proporcionando el inventario y una detección de recursos
- Identificando errores de configuración, vulnerabilidades y amenazas
- Ayuda para mitigar y corregir los riesgos

Security Command Center utiliza servicios, como Event Threat Detection y Security Health Analytics, para detectar problemas de seguridad entu entorno. Estos servicios analizan tus logs y recursos en Google Cloud en busca de indicadores de amenazas, vulnerabilidades de software y errores de configuración. Los servicios también se denominan sources (fuentes).
Para obtener más información, consulta [Sources (fuentes) de seguridad](https://cloud.google.com/security-command-center/docs/concepts-security-sources).

Cuando estos servicios detectan una amenaza, una vulnerabilidad o un error de configuración, emiten un hallazgo. Un hallazgo es un informe o un registro de una amenaza, una vulnerabilidad o un error de configuración individual, encontradas por el servicio en tu entorno Google Cloud. Los hallazgos muestran el problema detectado, el recurso de Google Cloud afectado por el problema y una guía sobre cómo solucionarlo.

## Configuración

### Instalación

Antes de empezar, asegúrate de que las siguientes API están habilitadas para los proyectos de los que quieres recopilar hallazgos de Google Cloud Security Command Center:

- [API del Cloud Resource Manager](https://console.cloud.google.com/apis/library/cloudresourcemanager.googleapis.com)
- [API de Google Cloud Billing](https://console.cloud.google.com/apis/library/cloudbilling.googleapis.com)
- [API del Google Cloud Security Command Center](https://console.cloud.google.com/apis/library/securitycenter.googleapis.com)

### Asignación de roles a cuentas de servicio

Una cuenta de servicio debe tener este rol para recuperar hallazgos del GCP Security Command Center.
Si este rol no está habilitado, los logs pueden no aparecer debido a un error de permisos denegados.

Asigna el siguiente rol:

- ***Visor de resultados del centro de seguridad***

**NOTA:**

Si el mismo project (proyecto) se descubre mediante varias cuentas de servicio, todas las cuentas de servicio adjuntas
deben tener agregado el [Rol de visor de resultados del centro de seguridad](https://cloud.google.com/security-command-center/docs/access-control-org#securitycenter.findingsViewer).

El incumplimiento de este requisito puede dar lugar a errores de denegación de permisos. En ese caso, no podremos recopilar los
hallazgos de seguridad de este proyecto. Por lo tanto, es importante asegurarse de que todas las cuentas de servicio tengan los permisos
necesarios para acceder a los hallazgos de seguridad de cualquier proyecto al que estén asociados.

### Configuración

El Centro de comandos de seguridad de Google Cloud se incluye como parte del paquete principal [integración de Google Cloud Platform](https://app.datadoghq.com/integrations/google-cloud-platform).
Si aún no lo has hecho, sigue este documento para configurar primero la [integración de Google Cloud Platform](https://docs.datadoghq.com/integrations/google-cloud-platform/).

En el ícono principal de la integración Google Cloud Platform:

1. Abre la cuenta de servicio o el ID de proyecto correspondiente al proyecto del que quieres extraer hallazgos de seguridad.
1. En la pestaña **Hallazgos de seguridad**, habilita la recopilación de hallazgos de seguridad utilizando el conmutador.

Una vez habilitada esta función, la recopilación de tus hallazgos de seguridad puede tardar hasta ***1 día**.

## Datos recopilados

#### Recopilación de logs

Los resultados del Centro de comandos de seguridad de Google Cloud se recopilan en forma de logs con la [API del cliente del Centro de comandos de seguridad de Google Cloud](https://cloud.google.com/security-command-center/docs).

En el Explorador de logs de Datadog, busca logs de Google Cloud Security Command Center utilizando el siguiente filtro:

- Configura `Findings` como **Service** (Servicio)
- Configura `google.security.command.center` como **Source (fuente)**
- El estado de los logs es **Info** (Información).

### Métricas

Google Cloud Security Command Center no incluye métricas.

### Checks de servicio

Google Cloud Security Command Center no incluye checks de servicios.

### Eventos

Google Cloud Security Command Center no incluye eventos.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con [asistencia técnica de Datadog](https://docs.datadoghq.com/help/).

## Referencias adicionales

Documentación útil adicional, enlaces y artículos:

- [Organiza y analiza tus resultados de seguridad en Google Cloud con Datadog](https://www.datadoghq.com/blog/datadog-google-security-command-center/)
- [Datadog Security amplía las capacidades de cumplimiento y protección frente a amenazas para Google Cloud](https://www.datadoghq.com/blog/datadog-security-google-cloud/)