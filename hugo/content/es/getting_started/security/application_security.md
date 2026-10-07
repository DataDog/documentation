---
aliases:
- /es/security/security_monitoring/getting_started/
- /es/getting_started/application_security
description: Configura Datadog App and API Protection para proteger las aplicaciones
  web y las API. Habilite la detección de amenazas, la seguridad del código y el análisis
  de vulnerabilidades para la producción.
further_reading:
- link: /security/application_security/terms
  tag: Documentación
  text: Términos y conceptos de App and API Protection
- link: /security/application_security/how-it-works
  tag: Documentación
  text: Cómo funciona App and API Protection
- link: https://dtdg.co/fe
  tag: Habilitación de los fundamentos
  text: Participar en una sesión interactiva para mejorar tu seguridad y la detección
    de amenazas
- link: https://securitylabs.datadoghq.com/
  tag: Laboratorios de seguridad
  text: Investigaciones, informes, consejos y vídeos de Datadog sobre seguridad
title: Empezando con App and API Protection
---

## Información general

Datadog App and API Protection (AAP) ayuda a proteger tus aplicaciones web y API en producción.
- Gracias a la detección de amenazas, Datadog ofrece protección en tiempo real contra ataques y agresores que atacan vulnerabilidades a nivel de código.
- Con [Code Security][28], Datadog detecta vulnerabilidades de código y bibliotecas en tus repositorios y tus servicios en ejecución, proporcionando visibilidad de extremo a extremo desde el desarrollo hasta la producción.

Esta guía te mostrará las prácticas recomendadas para poner en marcha tu equipo con AAP.

## Identifica servicios con riesgos para la seguridad


**Identifica servicios vulnerables o expuestos a ataques** que se beneficiarían de AAP. En la página [**Service Catalog > Security** (Catálogo de servicios > Seguridad)][1], selecciona los servicios que quieres habilitar.

{{< img src="getting_started/appsec/ASM_activation_service_selection_v2.png" alt="Vista de la página de servicios de AAP que muestra vulnerabilidades clasificadas por la columna de solicitudes sospechosas" style="width:100%;" >}}

A estas conclusiones sobre seguridad se llega a partir de los datos notificados por APM. De este modo, se pueden priorizar las medidas de seguridad. AAP identifica, prioriza y ayuda a remediar todos los riesgos de seguridad en tus servicios.

**Nota**: Si no se informa de vulnerabilidades o solicitudes sospechosas, asegúrate de que tus servicios están utilizando una versión reciente de la biblioteca del rastreador de Datadog. En el [Catálogo de software de seguridad][2], abre el panel lateral de cualquier servicio y consulta su **Tracing Configuration** (Configuración de rastreo).


{{< img src="getting_started/appsec/ASM_Tracing_Configuration.png" alt="Pestaña de configuración del rastreador en la vista de la página del Catálogo de software de APM, donde se resalta la versión del Datadog Agent y la biblioteca de rastreo de Datadog utilizada por tus servicios." style="width:100%;" >}}


## Activar AAP

### Activar la AAP con las instrucciones en la aplicación
- Para activar App and API Protection en la aplicación, ve a [**App and API Protection > Setup** (App and API Protection > Configuración)][29].
- Para activar Code Security en la aplicación, ve a [**Code Security > Setup** (Code Security > Configuración)][29].


<!-- En la [página de inicio de AAP][18], sigue las instrucciones para empezar. Estas incluyen:
- Selección guiada de servicios que se beneficiarían con AAP.
- Configuración de tus bibliotecas de rastreo de Datadog con una variable de entorno.
- Reinicio de tus servicios. </br>

1. Haz clic en **Get Started with AAP** (Empezar con AAP).
2. Selecciona **Get Started** (Empezar) para detectar vulnerabilidades en bibliotecas de código abierto (Software Composition Analysis), detectar y reparar vulnerabilidades a nivel de código (Runtime Code Analysis), y detectar y habilitar la detección de amenazas en tus servicios (App and API Protection).
3. Sigue las instrucciones apara empezar con AAP.

   {{< img src="getting_started/appsec/asm_sca_setup.png" alt="Página de configuración de Software Composition Analysi." style="width:100%;" >}} -->


### Habilitar AAP con configuración remota
#### Requisitos previos:
- Datadog Agent v7.42.0 o superior instalado en tus hosts o contenedores.
- Las versiones de rastreador de Datadog son [compatibles con la configuración remota][17].

#### Prepara la configuración remota (si aún no está activada)
  Sigue los pasos para activar la [configuración remota][17] en tu interfaz de usuario de Datadog. Esto incluye:
  1. Activar la función de configuración remota en tu organización
  2. Añadir la función de configuración remota a una clave de API existente o crea una nueva
  3. Actualizar la configuración de tu Datadog Agent para utilizar la clave de API con capacidad de configuración remota

  Si necesitas más información, consulta [Instalación de la configuración remota][15].

### Probar AAP
Una vez activado, AAP identifica inmediatamente las vulnerabilidades de las aplicaciones y detecta ataques y atacantes dirigidos a tus servicios.

1. **Validar vulnerabilidades**: ve a la [pestaña Vulnerabilities][14] (Vulnerabilidades), y clasifica y corrige las vulnerabilidades.
2. **Validar ataques**: envía patrones de ataque para activar una regla de prueba de detección. Desde tu terminal, ejecuta el siguiente script:

  {{< code-block lang="sh" >}}
  for ((i=1;i<=250;i++)); do
  # Apunta a las rutas de servicio existentes
  curl https://your-application-url/<EXISTING ROUTE> -A
  'dd-test-scanner-loguear';
  # Apunta a las rutas de servicio no existentes
  curl https://your-application-url/<NON-EXISTING ROUTE> -A
  'dd-test-scanner-loguear';
  done{{< /code-block >}}

3. Ve al [explorador de señales de seguridad][6] para ver la señal que se genera al cabo de unos segundos.

## Desactivar AAP

Para obtener información sobre cómo desactivar AAP o sus funciones relacionadas, consulta lo siguiente:

- [Desactivar la gestión y la protección frente a amenazas][24]
- [Desactivar Code Security (SAST, SCA o IAST)][27]

## Informes y notificaciones

{{% sec-hipaa-limits %}}

1. Configura [reglas de notificación][23] para recibir alertas a través de Slack, Jira, correo electrónico, etc.
2. Suscríbete a los informes semanales del [compendio de amenazas][22] para iniciar la investigación y corrección de las amenazas a la seguridad más importantes detectadas en los últimos siete días.

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/services?&lens=Security
[2]: https://app.datadoghq.com/services?hostGroup=%2A&lens=Security
[3]: /es/security/application_security/threats/library_configuration/#configuring-a-client-ip-header
[4]: /es/security/application_security/how-it-works/
[5]: /es/security/application_security/how-it-works/add-user-info/
[6]: https://app.datadoghq.com/security/appsec/signals?query=%40workflow.rule.type%3A%22Application%20Security%22&column=time&order=desc&view=signal&viz=stream&start=1674824351640&end=1675429151640&paused=false
[7]: https://app.datadoghq.com/security/appsec
[8]: https://app.datadoghq.com/security/appsec/traces
[9]: /es/security/application_security/threats/library_configuration/#exclude-specific-parameters-from-triggering-detections
[10]: https://app.datadoghq.com/security/appsec/reports-configuration
[11]: https://app.datadoghq.com/security/configuration/notification-rules
[12]: /es/security/notifications/rules/
[13]: /es/security/application_security/risk_management
[14]: https://app.datadoghq.com/security/appsec/vm?&group=vulnerability
[15]: /es/tracing/guide/remote_config
[17]: https://app.datadoghq.com/organization-settings/remote-config
[18]: https://app.datadoghq.com/security/appsec/landing
[20]: /es/getting_started/application_security/#setup-asm
[22]: https://app.datadoghq.com/security/configuration/reports
[23]: https://app.datadoghq.com/security/configuration/notification-rules
[24]: /es/security/application_security/troubleshooting/#disabling-threat-management-and-protection
[25]: /es/security/application_security/troubleshooting/#disabling-software-composition-analysis
[26]: /es/security/application_security/troubleshooting/#disabling-code-security
[27]: /es/security/code_security/troubleshooting/
[28]: /es/security/code_security
[29]: https://app.datadoghq.com/security/configuration/asm/setup
[30]: https://app.datadoghq.com/security/configuration/code-security/setup