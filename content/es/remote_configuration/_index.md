---
algolia:
  tags:
  - configuración remota
  - configuración remota
aliases:
- /es/agent/guide/how_rc_works
- /es/agent/guide/how_remote_config_works
- /es/agent/remote_config
description: Configura y cambia de forma remota el comportamiento de los componentes
  de Datadog como Agents, bibliotecas de rastreo y Observability Pipelines Workers
  desplegados en tu infraestructura.
further_reading:
- link: /security/application_security/how-appsec-works/#built-in-protection
  tag: Documentación
  text: Como funciona Application Security Monitoring
- link: /dynamic_instrumentation/?tab=configurationyaml#enable-remote-configuration
  tag: Documentación
  text: Dynamic Instrumentation
- link: /security/workload_protection/
  tag: Documentación
  text: Configuración de Workload Protection
- link: https://www.datadoghq.com/blog/compliance-governance-transparency-with-datadog-audit-trail/
  tag: Blog
  text: Como usar Datadog Audit Trail
- link: https://www.datadoghq.com/blog/remote-configuration-for-datadog/
  tag: Blog
  text: Aplicar actualizaciones en tiempo real a los componentes de Datadog con la
    configuración remota
title: Configuración remota
---

## Información general

La configuración remota es una función de Datadog que te permite configurar y cambiar de forma remota el comportamiento de los componentes de Datadog (por ejemplo, Agents, bibliotecas de rastreo y Observability Pipelines Workers) desplegados en tu infraestructura. Utiliza la configuración remota para aplicar configuraciones a componentes de Datadog de tu entorno, disminuyendo los costes de gestión, reduciendo la fricción entre equipos y acelerando los tiempos de resolución de problemas.

Para productos de seguridad de Datadog, App and API Protection y Workload Protection, los Agents habilitados por configuración remota y bibliotecas de rastreo compatibles proporcionan actualizaciones y respuestas de seguridad en tiempo real, lo que mejora la situación de seguridad de tus aplicaciones y la infraestructura de la nube.

## Cómo funciona

Cuando la configuración remota está activada, los componentes de Datadog como el Datadog Agent sondean de forma segura el [sitio Datadog][1] configurado en busca de cambios de configuración que estén listos para ser aplicados. Los cambios pendientes se aplican automáticamente a los componentes de Datadog. Por ejemplo, después de enviar cambios de configuración en la interfaz de usuario de Datadog para una función de producto habilitada por configuración remota, los cambios se almacenan en Datadog.

El siguiente diagrama muestra como funciona la configuración remota:

{{<img src="agent/remote_config/RC_Diagram_v5.png" alt="Users configure features in the UI, the config is stored in Datadog, the Agent requests config updates." width="90%" style="center">}}

1. Configura las funciones del producto escogidas en la interfaz de usuario de Datadog.
2. La configuración de las funciones del producto se almacenan en condiciones seguras en Datadog.
3. Los componentes de Datadog habilitados por configuración remota en tus entornos sondean, reciben y aplican automáticamente actualizaciones de configuración de forma segura desde Datadog. Las bibliotecas de rastreo que se despliegan en tus entornos se comunican con los Agents para solicitar y recibir actualizaciones de configuración desde Datadog, en lugar de sondear Datadog directamente.

## Entornos compatibles

La configuración remota funciona en entornos en los que están instalados los componentes compatibles de Datadog. Entre los componentes compatibles de Datadog se incluyen:
- Agents
- Rastreadores (indirectamente)
- Observability Pipeline Workers
- Ejecutores de acciones privadas y servicios de nube de contenedores sin servidor como AWS Fargate

La configuración remota no es compatible con aplicaciones sin servidor gestionadas por contenedores, como AWS App Runner, Azure Container Apps, Google Cloud Run, ni con funciones desplegadas con paquetes de contenedores, como AWS Lambda, Azure Functions y Google Cloud Functions.

## Productos y funciones compatibles

Los siguientes productos y funciones son compatibles con la configuración remota.

Fleet Automation
: - [Envía flares][27] directamente desde el sitio Datadog. Soluciona sin problemas incidentes del Datadog Agent sin acceder directamente al host.
: - [Actualiza tus Agents][29] (Vista previa).

App and API Protection (AAP)
: - [Activación de AAP en 1 clic][33]: Activa AAP en 1 clic desde la interfaz de usuario de Datadog.
: - [Actualizaciones de patrones de ataque en la aplicación][34]: Recibe automáticamente los patrones de ataque más recientes de Web Application Firewall (WAF) a medida que Datadog los publica, siguiendo vulnerabilidades o vectores de ataque recientemente revelados.
: - [Protección][34]: Bloquea las IP de los atacantes, los usuarios autenticados y las solicitudes sospechosas indicadas en señales y rastros de seguridad de AAP de forma temporal o permanente a través de la interfaz de usuario de Datadog.

Application Performance Monitoring (APM)
: - Configuración en tiempo de ejecución (Vista previa): Cambia la frecuencia de muestreo del rastreo de un servicio, la activación de la inyección de logs y las etiquetas (tags) de encabezados HTTP desde la interfaz de usuario del Catálogo de software, sin tener que reiniciar el servicio. Consulta [Configuración en tiempo de ejecución][22] para obtener más información.
: - [Configura de forma remota la frecuencia de muestreo del Agent][35] (Vista previa): Configura de forma remota el Datadog Agent para cambiar sus frecuencias de muestreo del rastreo y configura reglas para escalar la ingesta de trazas (traces) de tu organización según tus necesidades, sin necesidad de reiniciar tu Datadog Agent.

[Dynamic Instrumentation][36]
: - Envía métricas, trazas y logs críticos de tus aplicaciones en directo sin cambios en el código.

Workload Protection
: - Actualizaciones automáticas de reglas predeterminadas del Agent: Recibe y actualiza automáticamente las reglas predeterminadas del Agent mantenidas por Datadog a medida que se publican nuevas detecciones y mejoras del Agent. Consulta [Configuración de Workload Protection][3] para obtener más información.
: - Despliegue automático de reglas personalizadas del Agent: Despliega automáticamente tus reglas personalizadas del Agent en los hosts designados (todos los hosts o un subconjunto definido de hosts).

Observability Pipelines
: - Despliega y actualiza de forma remota [Observability Pipelines Workers][4] (OPW): Crea y edita pipelines en la interfaz de usuario de Datadog, desplegando tus cambios de configuración en las instancias OPW que se ejecutan en tu entorno.

Ejecutor de acciones privadas 
: - Ejecuta flujos de trabajo y aplicaciones de Datadog que interactúan con servicios alojados en tu red privada sin exponer tus servicios a la Internet pública. Para obtener más información, consulta [Private Actions][30].

## Cuestiones de seguridad

Datadog implementa las siguientes medidas de seguridad para proteger la confidencialidad, la integridad y la disponibilidad de las configuraciones que reciben y aplican los componentes de Datadog:

- Los componentes de Datadog habilitados por configuración remota y desplegados en tu infraestructura necesitan configuraciones de Datadog.
  <div class="alert alert-info">Algunos componentes, como los ejecutores de acciones privadas, están siempre habilitados por configuración remota. Otros, como el Agent, pueden activarse o desactivarse mediante opciones de configuración en el disco.</div>
- Datadog nunca envía cambios de configuración a menos que se lo soliciten componentes de Datadog. Si envía cambios de configuración, Datadog solo envía aquellos relevantes para el componente solicitante.
- Las solicitudes de configuración se inician desde tu infraestructura a Datadog a través de HTTPS (puerto 443). Este es el mismo puerto que el Agent utiliza por defecto para enviar datos de observabilidad.
- La comunicación entre tus componentes de Datadog y Datadog se cifra mediante HTTPS y se autentica y autoriza utilizando tu clave de API Datadog, excepto en el caso de los ejecutores de acciones privadas donde se utiliza un token JWT en su lugar.
- Solo los usuarios con el permiso [`api_keys_write`][5] están autorizados a activar o desactivar la función de configuración remota en las claves de API y a utilizar las funciones compatibles del producto.
- Los cambios de configuración enviados a través de la interfaz de usuario de Datadog son firmados y validados por el componente de Datadog solicitante, lo que verifica la integridad de la configuración.

## Activar la configuración remota

En la mayoría de los casos, la configuración remota está activada por defecto para tu organización. Puedes comprobar si la configuración remota está activada en tu organización desde la página de parámetros de [Configuración remota][8]. Si necesitas activarla:
1. Asegúrate de que los permisos de RBAC incluyan [`org_management`][7], para poder habilitar la configuración remota en tu organización.
1. Desde la página Parámetros de tu organización, activa [Configuración remota][8]. Esto permite que los componentes de Datadog de toda la organización reciban configuraciones de Datadog.
1. Sigue las instrucciones de [configuración específicas del producto](#product-specific-configuration) que se indican a continuación para finalizar la configuración remota.

### Configuración específica del producto

Consulta la documentación a continuación para obtener instrucciones específicas para el producto que estás configurando.

| Producto | Instrucciones de instalación |
| ------- | --------------------- |
| Automatización de flotas | [Configurar Fleet Automation][31] |
| APM | [Configuración en tiempo de ejecución](/tracing/guide/remote_config/) |
| Dynamic Instrumentation | [Empezando con Dynamic Instrumentation](/dynamic_instrumentation/#getting-started) |
| Workload Protection | [Workload Protection][3] |
| Observability Pipelines | Asegúrate de que has [activado la configuración remota en la clave de API][32] que estás utilizando para Observability Pipelines. |
| Sensitive Data Scanner | [Almacenamiento en la nube](/security/sensitive_data_scanner/setup/cloud_storage/?tab=newawsaccount) |
| Ejecutor de acciones privadas | [Información general sobre acciones privadas](/actions/private_actions/) |

## Prácticas recomendadas

### Audit Trail de Datadog

Utiliza [Audit Trail de Datadog][13] para monitorizar el acceso a la organización y a eventos habilitados por configuración remota. Audit Trail permite a los administradores y equipos de seguridad realizar un seguimiento de la creación, eliminación y modificación de la API de Datadog y las claves de aplicación. Una vez configurado Audit Trail, podrás ver los eventos relacionados con las funciones habilitadas por configuración remota y quién ha solicitado estos cambios. Audit Trail permite reconstruir secuencias de eventos y establecer una monitorización sólida de Datadog para la configuración remota.

### Monitores

Configurar los [monitores][14] para recibir notificaciones cuando se encuentre un evento de interés.

## Exclusión de la configuración remota

En lugar de desactivar la configuración remota de forma global, Datadog recomienda optar por desactivarla en productos específicos de Datadog. Para obtener más información, consulta la [documentación del producto en cuestión](#product-specific-configuration).

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/getting_started/site/
[3]: /es/security/workload_protection/
[4]: /es/observability_pipelines/#observability-pipelines-worker
[5]: /es/account_management/rbac/permissions#api-and-application-keys
[6]: /es/security/application_security/threats/setup/compatibility/
[7]: /es/account_management/rbac/permissions#access-management
[8]: https://app.datadoghq.com/organization-settings/remote-config
[9]: /es/security/default_rules/#cat-workload-security
[10]: /es/tracing/trace_pipeline/ingestion_controls/#managing-ingestion-for-all-services-at-the-agent-level
[11]: /es/dynamic_instrumentation/?tab=configurationyaml#enable-remote-configuration
[12]: /es/security/application_security/how-appsec-works/#built-in-protection
[13]: /es/account_management/audit_trail
[14]: /es/monitors/
[15]: /es/help/
[16]: /es/remote_configuration
[17]: /es/agent/configuration/network
[18]: /es/agent/configuration/proxy/
[19]: /es/tracing/software_catalog/
[20]: /es/dynamic_instrumentation/?tab=configurationyaml#prerequisites
[21]: /es/agent/configuration/agent-configuration-files/?tab=agentv6v7#agent-main-configuration-file
[22]: /es/tracing/trace_collection/runtime_config/
[23]: /es/remote_configuration#opting-out-of-remote-configuration
[24]: https://app.datadoghq.com/organization-settings/api-keys
[25]: /es/agent/guide/
[26]: https://app.datadoghq.com/organization-settings/remote-config/setup?page_id=org-enablement-step
[27]: /es/agent/fleet_automation/#send-a-remote-flare
[28]: /es/security/sensitive_data_scanner/?tab=usingtheagent
[29]: /es/agent/fleet_automation/remote_management#remotely-upgrade-your-agents
[30]: /es/actions/private_actions/use_private_actions/
[31]: /es/agent/guide/setup_remote_config
[32]: https://app.datadoghq.com/organization-settings/remote-config/setup?page_id=api-key-enablement-step&standalone=1
[33]: /es/security/application_security/setup/
[34]: /es/security/application_security/
[35]: /es/tracing/trace_pipeline/adaptive_sampling/
[36]: /es/tracing/dynamic_instrumentation/#explore-dynamic-instrumentation