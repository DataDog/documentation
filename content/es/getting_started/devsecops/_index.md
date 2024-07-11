---
title: Empezando con los paquetes DevSecOps
---

Esta guía presenta los paquetes DevSecOps con enlaces a las instrucciones de configuración para ayudar con la instalación y configuración.

## APM DevSecOps

Los paquetes APM DevSecOps combinan [Monitorización del rendimiento de la aplicación (APM)][4] con las capacidades de [Análisis de composición de software][10] de [Administración de seguridad de aplicación (ASM)][2].

{{< tabs >}}
{{% tab "APM DevSecOps" %}}

APM DevSecOps incluye [APM][1], [Monitorización del servicio universal][2] y las capacidades de [Análisis de composición de software][3] de [ASM][4].

### Configuración

Para empezar con APM DevSecOps, [instale y configure el Agent de Datadog][5] para APM y la Monitorización de servicio universal. Para obtener instrucciones detalladas, consulta los siguientes documentos:

- [APM][6]
- [Monitorización de servicio universal][7]

Después de instalar el Agent, activa SCA para tu entorno.

- [Análisis de composición de software][10]

### Siguientes pasos

Obtén más información sobre las funciones incluidas en APM DevSecOps:

- [Métricas de APM][9]: obtén más información sobre las métricas para rastrear aplicaciones
- [Monitorización de servicio universal][2]: obtén visibilidad de las métricas de estado del servicio
- [Análisis de composición de software][3]: detecta vulnerabilidades en las dependencias de código abierto de tu servicio

[1]: /es/tracing/
[2]: /es/universal_service_monitoring/
[3]: /es/security/application_security/vulnerability_management/
[4]: /es/security/application_security
[5]: /es/agent/
[6]: /es/tracing/trace_collection/
[7]: /es/universal_service_monitoring/setup/
[8]: /es/security/application_security/enabling/
[9]: /es/tracing/metrics/
[10]: /es/getting_started/application_security/vulnerability_management/

{{% /tab %}}
{{% tab "APM DevSecOps Pro" %}}

APM DevSecOps Pro incluye [APM][1], [Monitorización de servicio universal][2], [Monitorización de flujos de datos][3] y las capacidades de [Análisis de composición de software][4] de [ASM][5].

### Configuración

Para empezar con APM DevSecOps Pro, [instale y configure el Agent de Datadog][6] para APM, Monitorización de servicio universal y Monitorización de flujos de datos. Para obtener instrucciones detalladas, consulta los siguientes documentos:

- [APM][7]
- [Monitorización de servicio universal][8]
- [Monitorización de flujos de datos][9]

Después de instalar el Agent, configura el Análisis de composición de software para tu entorno.

- [Análisis de composición de software][10]

#### Siguientes pasos

Obtén más información sobre las funciones incluidas en APM DevSecOps Pro:

- [Métricas de APM][11]: obtén más información sobre las métricas para rastrear aplicaciones
- [Monitorización de servicio universal][2]: obtén visibilidad de las métricas de estado del servicio
- [Monitorización de flujos de datos][3]: comprende y gestiona tus canalizaciones a escala
- [Análisis de composición de software][4]: detecta vulnerabilidades en las dependencias de código abierto de tu servicio

[1]: /es/tracing/
[2]: /es/universal_service_monitoring/
[3]: /es/data_streams/
[4]: /es/security/application_security/vulnerability_management/
[5]: /es/security/application_security
[6]: /es/agent/
[7]: /es/tracing/trace_collection/
[8]: /es/universal_service_monitoring/setup/
[9]: /es/data_streams/#setup
[10]: /es/getting_started/application_security/vulnerability_management/
[11]: /es/tracing/metrics/

{{% /tab %}}
{{% tab "APM DevSecOps Enterprise" %}}

APM DevSecOps Enterprise incluye [APM][1], [Monitorización de servicio universal][2], [Monitorización de flujos de datos][3], [Continuous Profiler][4] y las capacidades de [Análisis de composición de software][5] de [ASM][6].

### Configuración

Para empezar con APM DevSecOps Enterprise, [instala y configura el Agent de Datadog][7] para APM, Monitorización de servicio universal, Continuous Profiler y Monitorización de flujos de datos. Para obtener instrucciones detalladas, consulta los siguientes documentos:

- [APM][8]
- [Monitorización de servicio universal][9]
- [Monitorización de flujos de datos][10]
- [Continuous Profiler][11]

Después de instalar el Agent, configura ASM para tu entorno.

- [Gestión de seguridad de aplicaciones][14]

### Siguientes pasos

Obtén más información sobre las funciones incluidas en APM DevSecOps Enterprise:

- [Métricas de APM][13]: obtén más información sobre las métricas para rastrear aplicaciones
- [Monitorización de servicio universal][2]: obtén visibilidad de las métricas de estado del servicio
- [Monitorización de flujos de datos][3]: comprende y gestiona tus canalizaciones a escala
- [Continuous Profiler][4]: optimice el rendimiento del código en producción
- [Análisis de composición de software][5]: detecta vulnerabilidades en las dependencias de código abierto de tu servicio

[1]: /es/tracing/
[2]: /es/universal_service_monitoring/
[3]: /es/data_streams/
[4]: /es/profiler/
[5]: /es/security/application_security/vulnerability_management/
[6]: /es/security/application_security
[7]: /es/agent/
[8]: /es/tracing/trace_collection/
[9]: /es/universal_service_monitoring/setup/
[10]: /es/data_streams/#setup
[11]: /es/profiler/enabling
[12]: /es/security/application_security/enabling/
[13]: /es/tracing/metrics/
[14]: /es/getting_started/application_security/vulnerability_management/

{{% /tab %}}
{{< /tabs >}}

<br>

## Infraestructura DevSecOps

Los paquetes de infraestructura DevSecOps combinan la monitorización de infraestructura con las capacidades de seguridad de [Cloud Security Management (CSM)][3].

{{< tabs >}}
{{% tab "Infrastructure DevSecOps Pro" %}}

Infraestructura DevSecOps Pro incluye [Contenedores][1], [Serverless][2] y [CSM Pro][3]. También incluye más de [Más de 750 integraciones listas para usar][4].

### Configuración

Para empezar con la infraestructura DevSecOps Pro, [instala y configura el Agent de Datadog][5] para Contenedores y Serverless. También debes configurar las integraciones para tus servicios. Para obtener instrucciones detalladas, consulta los siguientes documentos:

- [Contenedores][1]
- [Serverless][2]
- [Integraciones][4]

Después de instalar el Agent, configura CSM Pro para tu entorno.

- [Cloud Security Management Pro][6]

### Siguientes pasos

Obtén más información sobre las funciones incluidas en la infraestructura DevSecOps Pro:

- [Lista de infraestructura][7]: ve la actividad en tus hosts
- [Métricas][8]: explora y comprende tus métricas
- [Host y mapas de contenedor][9]: visualiza tus hosts y contenedores
- [Contenedores en vivo][10]: obtén visibilidad en tiempo real de todos los contenedores a través de tu entorno
- [Serverless][2]: obtén visibilidad completa de todos los servicios administrados que alimentan tus aplicaciones serverless 
- [Cloud Security Management][11]: detección de amenazas en tiempo real y auditorías continuas de configuración en toda su infraestructura en la nube

[1]: /es/containers/
[2]: /es/serverless/
[3]: /es/security/cloud_security_management/setup/
[4]: /es/integrations/
[5]: /es/agent/
[6]: /es/security/cloud_security_management/setup/csm_pro
[7]: /es/infrastructure/list/
[8]: /es/metrics/
[9]: /es/infrastructure/hostmap/
[10]: /es/infrastructure/containers/
[11]: /es/security/cloud_security_management/

{{% /tab %}}
{{% tab "Infrastructure DevSecOps Enterprise" %}}

Infraestructura DevSecOps Enterprise incluye [Containers][1], [Serverless][2], [Live Processes][3], y [CSM Enterprise][4]. También incluye más de [más de 750 integraciones listas para usar][5].

### Configuración

Para empezar con la infraestructura DevSecOps Enterprise, [instala y configura el Agent de Datadog][6] para Contenedores, Serverless y Live Processes. También debes configurar las integraciones para tus servicios. Para obtener instrucciones detalladas, consulta los siguientes documentos:

- [Contenedores][1]
- [Serverless][2]
- [Live Processes][7]
- [Integraciones][5]

Después de instalar el Agent, configura CSM Enterprise para tu entorno.

- [Cloud Security Management Enterprise][8]

### Siguientes pasos

Obtén más información sobre las funciones incluidas en Infraestructura DevSecOps Enterprise:

- [Lista de infraestructura][9]: ve la actividad en tus hosts
- [Métricas][10]: explora y comprende tus métricas
- [Correlaciones de métricas][11]: encuentra posibles causas raíz de un problema buscando otras métricas que muestran un comportamiento irregular
- [Host y mapas de contenedor][12]: visualiza tus hosts y contenedores
- [Contenedores en vivo][13]: obtén visibilidad en tiempo real de todos los contenedores a través de tu entorno
- [Live Processes][14]: obtén visibilidad en tiempo real del proceso que se ejecuta en tu infraestructura
- [Serverless][2]: obtén visibilidad completa de todos los servicios administrados que alimentan tu serverless 
- [Watchdog][15]: detecta automáticamente posibles problemas de la aplicación e infraestructura 
- [Cloud Security Management][16]: detección de amenazas en tiempo real y auditorías continuas de configuración en toda tu infraestructura en la nube

[1]: /es/containers/
[2]: /es/serverless/
[3]: /es/infrastructure/process/
[4]: /es/security/cloud_security_management/setup/
[5]: /es/integrations/
[6]: /es/agent/
[7]: /es/infrastructure/process/?tab=linuxwindows#installation
[8]: /es/security/cloud_security_management/setup/csm_enterprise
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

[1]: /es/security/application_security/vulnerability_management/
[2]: /es/security/application_security
[3]: /es/security/cloud_security_management/
[4]: /es/tracing
[10]: /es/security/application_security/software_composition_analysis/