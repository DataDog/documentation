---
title: Empezando con Infrastructure DevSecOps
---

Esta guía presenta los paquetes Infrastructure Monitoring DevSecOps, con enlaces a las instrucciones de configuración para ayudar a instalarlos y configurarlos.

## Infraestructura DevSecOps

Los paquetes Infrastructure DevSecOps combinan la monitorización de infraestructura con las capacidades de seguridad de [Cloud Security][3].

{{< tabs >}}
{{% tab "Infrastructure DevSecOps Pro" %}}

Infrastructure DevSecOps Pro incluye [Contenedores][1], [Serverless][2] y [Cloud Security][3]. También incluye más de {{< translate key="integration_count" >}} [integraciones predefinidas][4].

### Configuración

Para empezar con la infraestructura DevSecOps Pro, [instala y configura el Agent de Datadog][5] para Contenedores y Serverless. También debes configurar las integraciones para tus servicios. Para obtener instrucciones detalladas, consulta los siguientes documentos:

- [Contenedores][1]
- [Serverless][2]
- [Integraciones][4]

Después de instalar el Agent, configura Cloud Security para tu entorno.

- [Cloud Security][3]

### Siguientes pasos

Obtén más información sobre las funciones incluidas en la infraestructura DevSecOps Pro:

- [Lista de infraestructura][7]: consulta la actividad en tus hosts
- [Métricas][8]: explora y comprende tus métricas
- [Host y mapas de contenedor][9]: visualiza tus hosts y contenedores
- [Contenedores en vivo][10]: obtén visibilidad en tiempo real de todos los contenedores a través de tu entorno
- [Serverless][2]: obtén visibilidad completa de todos los servicios administrados que alimentan tus aplicaciones serverless 
- [Cloud Security][11]: detección de amenazas en tiempo real y auditorías continuas de configuración en toda tu infraestructura en la nube

[1]: /es/containers/
[2]: /es/serverless/
[3]: /es/security/cloud_security_management/setup/
[4]: /es/integrations/
[5]: /es/agent/
[7]: /es/infrastructure/list/
[8]: /es/metrics/
[9]: /es/infrastructure/hostmap/
[10]: /es/infrastructure/containers/
[11]: /es/security/cloud_security_management/

{{% /tab %}}
{{% tab "Infrastructure DevSecOps Enterprise" %}}

Infrastructure DevSecOps Enterprise inclute [Contenedores][1], [Serverless][2], [Live Processes][3] y [Cloud Security][4]. También incluye más de {{< translate key="integration_count" >}} [integraciones predefinidas][5].

### Configuración

Para empezar con la infraestructura DevSecOps Enterprise, [instala y configura el Agent de Datadog][6] para Contenedores, Serverless y Live Processes. También debes configurar las integraciones para tus servicios. Para obtener instrucciones detalladas, consulta los siguientes documentos:

- [Contenedores][1]
- [Serverless][2]
- [Live Processes][7]
- [Integraciones][5]

Después de instalar el Agent, configura Cloud Security para tu entorno.

- [Cloud Security][4]

### Siguientes pasos

Obtén más información sobre las funciones incluidas en Infraestructura DevSecOps Enterprise:

- [Lista de infraestructura][9]: consulta la actividad en tus hosts
- [Métricas][10]: explora y comprende tus métricas
- [Correlaciones de métricas][11]: encuentra posibles causas raíz de un problema buscando otras métricas que muestran un comportamiento irregular
- [Host y mapas de contenedor][12]: visualiza tus hosts y contenedores
- [Contenedores en vivo][13]: obtén visibilidad en tiempo real de todos los contenedores a través de tu entorno
- [Live Processes][14]: obtén visibilidad en tiempo real del proceso que se ejecuta en tu infraestructura
- [Serverless][2]: obtén visibilidad completa de todos los servicios administrados que alimentan tu serverless 
- [Watchdog][15]: detecta automáticamente posibles problemas de la aplicación e infraestructura 
- [Cloud Security][16]: detección de amenazas en tiempo real y auditorías continuas de configuración en toda tu infraestructura en la nube

[1]: /es/containers/
[2]: /es/serverless/
[3]: /es/infrastructure/process/
[4]: /es/security/cloud_security_management/setup/
[5]: /es/integrations/
[6]: /es/agent/
[7]: /es/infrastructure/process/?tab=linuxwindows#installation
[9]: /es/infrastructure/list/
[10]: /es/metrics/
[11]: /es/dashboards/correlations/
[12]: /es/infrastructure/hostmap/
[13]: /es/infrastructure/containers/
[14]: /es/infrastructure/process/
[15]: /es/watchdog/
[16]: /es/security/cloud_security_management/

{{% /tab %}}
{{< /tabs >}}

[1]: /es/security/code_security/software_composition_analysis/
[2]: /es/security/application_security
[3]: /es/security/cloud_security_management/
[4]: /es/tracing
[10]: /es/security/code_security/software_composition_analysis/