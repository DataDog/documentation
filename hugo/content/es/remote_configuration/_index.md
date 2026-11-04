---
algolia:
  tags:
  - remote config
  - remote configuration
aliases:
- /es/agent/guide/how_rc_works
- /es/agent/guide/how_remote_config_works
- /es/agent/remote_config
description: Configure y cambie de forma remota el comportamiento de los componentes
  de Datadog, como Agents, SDKs y Observability Pipelines Workers implementados en
  su infraestructura.
further_reading:
- link: /security/application_security/how-appsec-works/#built-in-protection
  tag: Documentación
  text: Cómo funciona Application Security Monitoring
- link: /dynamic_instrumentation/
  tag: Documentación
  text: Dynamic Instrumentation
- link: /security/workload_protection/
  tag: Documentación
  text: Configuración de Workload Protection
- link: https://www.datadoghq.com/blog/single-step-instrumentation-rules/
  tag: Blog
  text: Administre el rastreo de servicios entre servidores con reglas de instrumentación
    de Single Step
- link: https://www.datadoghq.com/blog/compliance-governance-transparency-with-datadog-audit-trail/
  tag: Blog
  text: Uso de Datadog Audit Trail
- link: https://www.datadoghq.com/blog/remote-configuration-for-datadog/
  tag: Blog
  text: Aplique actualizaciones en tiempo real a los componentes de Datadog con Remote
    Configuration
title: Remote Configuration
---
## Descripción general {#overview}

Remote Configuration es una capacidad de Datadog que le permite configurar y cambiar de forma remota el comportamiento de funciones de producto seleccionadas en componentes de Datadog, como Agents, SDKs y Observability Pipelines Workers implementados en su infraestructura. Utilice Remote Configuration para aplicar configuraciones a los componentes de Datadog en su entorno bajo demanda, lo que disminuye los costos de gestión, reduce la fricción entre equipos y acelera los tiempos de resolución de problemas.

Para los productos de Security de Datadog, App and API Protection y Workload Protection, los Agents habilitados para Remote Configuration y los SDKs compatibles proporcionan actualizaciones y respuestas de Security en tiempo real, lo que mejora la postura de Security de sus aplicaciones e infraestructura en la nube.

## Cómo funciona {#how-it-works}

Cuando Remote Configuration está habilitado, los componentes de Datadog, como el Datadog Agent, consultan de forma segura el [Datadog site][1] configurado para obtener cambios de configuración que estén listos para aplicarse. Los cambios pendientes se aplican automáticamente a los componentes de Datadog. Por ejemplo, después de enviar cambios de configuración en la interfaz de usuario de Datadog para una función de producto habilitada para Remote Configuration, los cambios se almacenan en Datadog.

El siguiente diagrama ilustra cómo funciona Remote Configuration:

{{<img src="agent/remote_config/RC_Diagram_v5.png" alt="Los usuarios configuran las funciones en la interfaz de usuario, la configuración se almacena en Datadog y el Agent solicita actualizaciones de configuración." width="90%" style="center">}}

1. Usted configura funciones de producto seleccionadas en la interfaz de usuario de Datadog.
2. Las configuraciones de las funciones del producto se almacenan de forma segura dentro de Datadog.
3. Los componentes de Datadog habilitados para Remote Configuration en sus entornos consultan, reciben y aplican automáticamente actualizaciones de configuración desde Datadog de forma segura. Las bibliotecas de trazas que se implementan en sus entornos se comunican con los Agents para solicitar y recibir actualizaciones de configuración desde Datadog en lugar de consultar a Datadog directamente.

## Entornos compatibles {#supported-environments}

Remote Configuration funciona en entornos donde se implementan componentes de Datadog compatibles. Los componentes de Datadog compatibles incluyen:
- Agents
- Tracers (indirectamente)
- Observability Pipeline Workers
- Private Action Runners y servicios en la nube de contenedores sin servidor, como AWS Fargate.

Remote Configuration no es compatible con aplicaciones gestionadas en contenedores sin servidor, como AWS App Runner, Azure Container Apps, Google Cloud Run; ni con funciones implementadas con empaquetado de contenedores, como AWS Lambda, Azure Functions y Google Cloud Functions.

## Productos y funciones compatibles {#supported-products-and-features}

Los siguientes productos y funciones son compatibles con Remote Configuration.

Fleet Automation
: - [Envíe flares][27] directamente desde el sitio de Datadog. Solucione problemas del Datadog Agent sin acceder directamente al servidor.
: - [Actualice sus Agents][29].

App and API Protection (AAP)
: - [Activación de AAP con 1 clic][33]: Habilite AAP con 1 clic desde la interfaz de usuario de Datadog.
: - [Actualizaciones de patrones de ataque en la aplicación][34]: Reciba automáticamente los patrones de ataque de Web Application Firewall (WAF) más recientes a medida que Datadog los publica, tras la divulgación de nuevas vulnerabilidades o vectores de ataque.
: - [Proteger][34]: Bloquee temporal o permanentemente las IP de los atacantes, los usuarios autenticados y las solicitudes sospechosas marcadas en las señales de seguridad y trazas de AAP a través de la interfaz de usuario de Datadog.

Application Performance Monitoring (APM)
: - Configuración en tiempo de ejecución: Cambie la tasa de muestreo de trazas de un servicio, la habilitación de inyección de registros y las etiquetas de encabezado HTTP desde la interfaz de usuario del catálogo, sin tener que reiniciar el servicio. Lea [Configuración en tiempo de ejecución][22] para obtener más información.
: - [Establezca de forma remota la tasa de muestreo del Datadog Agent][35]: Configure de forma remota el Datadog Agent para cambiar sus tasas de muestreo de trazas y establezca reglas para escalar la ingesta de trazas de su organización, sin necesidad de reiniciar su Datadog Agent.

[Dynamic Instrumentation][36]
: - Envíe métricas, trazas y registros críticos desde sus aplicaciones en vivo sin realizar cambios en el código.

Workload Protection
: - Actualizaciones automáticas de reglas predeterminadas del Agent: Reciba y actualice automáticamente las reglas predeterminadas del Agent mantenidas por Datadog a medida que se lanzan nuevas detecciones y mejoras del Agent. Consulte [Setting Up Workload Protection][3] para obtener más información.
: - Despliegue automático de reglas personalizadas del Agent: Despliegue automáticamente sus reglas personalizadas del Agent en los servidores designados (todos los servidores o un subconjunto definido de servidores).

Observability Pipelines
: - Despliegue y actualice de forma remota [Observability Pipelines Workers][4] (OPW): Cree y edite pipelines en la interfaz de usuario de Datadog, implementando sus cambios de configuración en las instancias de OPW que se ejecutan en su entorno.

[Escalamiento automático][47]
: - Administre de forma remota las configuraciones de escalamiento de clústeres y cargas de trabajo de escalamiento automático para sus entornos en contenedores. Consulte [Escalamiento automático][47] para obtener más información.

Private Action Runner
: - Ejecute flujos de trabajo y aplicaciones de Datadog que interactúen con servicios alojados en su red privada sin exponer sus servicios a la internet pública. Para obtener más información, consulte [Private Actions][30].

Feature Flags
: - Entregue configuraciones de flags (reglas de segmentación y asignación) a los SDK del lado del servidor para la asignación síncrona de variantes basada en el contexto de evaluación. Consulte [Feature Flags][48] para obtener más información.

## Security considerations {#security-considerations}

Datadog implementa las siguientes salvaguardas para proteger la confidencialidad, integridad y disponibilidad de las configuraciones recibidas y aplicadas por sus componentes de Datadog:

- Los componentes de Datadog habilitados para Remote Configuration desplegados en su infraestructura solicitan configuraciones a Datadog.
  <div class="alert alert-info">Algunos componentes, como los Private Action Runners, siempre tienen Remote Configuration habilitado. Otros, como los Agents, pueden habilitarse o deshabilitarse mediante opciones de configuración en disco.</div>
- Datadog nunca envía cambios de configuración a menos que los componentes de Datadog lo soliciten. Si envía cambios de configuración, Datadog solo envía los cambios relevantes para el componente que realiza la solicitud.
- Las solicitudes de configuración se inician desde su infraestructura hacia Datadog a través de HTTPS (puerto 443). Este es el mismo puerto que el Agent utiliza de forma predeterminada para enviar datos de observabilidad.
- La comunicación entre sus componentes de Datadog y Datadog está cifrada mediante HTTPS y se autentica y autoriza utilizando su clave de Datadog API, excepto en el caso de los Private Action Runners, donde se utiliza un token JWT en su lugar.
- Solo los usuarios con el permiso [`api_keys_write`][5] están autorizados para habilitar o deshabilitar la capacidad de Remote Configuration en las claves de API y utilizar las funciones de producto compatibles.
- Sus cambios de configuración enviados a través de la interfaz de usuario de Datadog son firmados y validados por el componente de Datadog solicitante, lo que verifica la integridad de la configuración.
- Cuando Remote Configuration está habilitada, los componentes realizan periódicamente una prueba de conectividad a Datadog a través de TLS en el puerto 8042/TCP. Esta es una conexión TLS sin procesar en lugar de HTTPS. Esta prueba se utiliza para el desarrollo de protocolos; no incluye datos del cliente ni información que identifique al cliente. Esta conexión se utiliza solo mientras Remote Configuration está habilitada y se puede bloquear de forma segura sin afectar la funcionalidad.

### Acceso basado en roles {#role-based-access}

Habilitar Remote Configuration afecta a los siguientes productos. Cada producto define un conjunto de controles de acceso basados en roles que deben otorgarse a sus usuarios. Para obtener información general sobre la gestión de acceso, consulte [Access Control][37].

 | Producto con Remote Configuration habilitado   | Controles de acceso basados en roles |
 |----------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
 | Fleet Automation                       | `FLEET_POLICIES_WRITE`<br>`AGENT_UPGRADE_WRITE`<br>`FLEET_FLARE`<br><br>Para obtener más información, consulte [Fleet Automation][38].                                                                                                                                                                      |
 | Protección de aplicaciones y API                 | `APPSEC_ACTIVATION_READ`<br>`APPSEC_ACTIVATION_WRITE`<br>`APPSEC_PROTECT_READ`<br>`APPSEC_PROTECT_WRITE`<br><br>Para obtener más información, consulte [Access Control][39].                                                                                                                                |
 | APM                                    | `APM_SERVICE_INGEST_READ`<br>`APM_SERVICE_INGEST_WRITE`<br>`APM_REMOTE_CONFIGURATION_READ`<br>`APM_REMOTE_CONFIGURATION_WRITE`<br><br>Para obtener más información, consulte [Adaptive Sampling][40].                                                                                                       |
 | Dynamic Instrumentation                | `DEBUGGER_READ`<br>`DEBUGGER_WRITE`<br>`DEBUGGER_WRITE_PRE_PROD`<br>`APM_REMOTE_CONFIGURATION_READ`<br>`APM_REMOTE_CONFIGURATION_WRITE`<br><br>Para obtener más información, consulte [APM][41].                                                                                                            |
 | Workload Protection                    | `SECURITY_MONITORING_CWS_AGENT_RULES_WRITE`<br>`SECURITY_MONITORING_CWS_AGENT_RULES_READ`<br>`SECURITY_MONITORING_CWS_AGENT_RULES_ACTIONS`<br><br>Para obtener más información, consulte [Security][42].                                                                                                    |
 | Escaneo lateral de CSM                      | `ORG_MANAGEMENT`<br>`MANAGE_INTEGRATIONS`<br><br> Para obtener más información, consulte [Enable Agentless Scanning][43].                                                                                                                                                                                   |
 | Observability Pipelines                | `OBSERVABILITY_PIPELINES_READ`<br>`OBSERVABILITY_PIPELINES_WRITE`<br>`OBSERVABILITY_PIPELINES_DELETE`<br>`OBSERVABILITY_PIPELINES_DEPLOY`<br>`OBSERVABILITY_PIPELINES_CAPTURE_WRITE`<br>`OBSERVABILITY_PIPELINES_CAPTURE_READ`<br><br>Para obtener más información, consulte [Observability Pipelines][44]. |
 | Private Action Runner                  | `ON_PREM_RUNNER_WRITE`<br>`ON_PREM_RUNNER_READ`<br>`ON_PREM_RUNNER_USE`<br><br>Para obtener más información, consulte [App Builder & Workflow Automation][45].                                                                                                                                              |
 | Network Device Monitoring (NDM)        | `NDM_DEVICE_PROFILES_VIEW`<br>`NDM_DEVICE_PROFILES_EDIT`                                                                                                                                                                                                                                       |
 | Container Autoscaling                  | `ORCHESTRATION_AUTOSCALING_MANAGE`<br>`ORCHESTRATION_WORKLOAD_SCALING_WRITE`<br>`ORCHESTRATION_WORKLOAD_SCALING_READ`                                                                                                                                                                          |
 | Serverless Lambda Auto-instrumentation | `SERVERLESS_AWS_INSTRUMENTATION_READ`<br>`SERVERLESS_AWS_INSTRUMENTATION_WRITE`<br><br>Para obtener más información, consulte [Serverless][46].                                                                                                                                                             |
 | Feature Flags                          | `FEATURE_FLAG_CONFIG_READ`<br>`FEATURE_FLAG_CONFIG_WRITE`<br>`FEATURE_FLAG_ENVIRONMENT_CONFIG_READ`<br>`FEATURE_FLAG_ENVIRONMENT_CONFIG_WRITE`<br><br>Para obtener más información, consulte [Feature Flags][48].                                                                                           |

## Habilite Remote Configuration {#enable-remote-configuration}

En la mayoría de los casos, Remote Configuration está habilitada de forma predeterminada para su organización. Puede verificar si Remote Configuration está habilitada en su organización desde la página de configuración de [Remote Configuration][8].
{{< site-region region="gov,gov2" >}}
**Nota**: En US1-FED y US2-FED, Remote Configuration no está habilitada de forma predeterminada.
{{< /site-region >}}
Para habilitar Remote Configuration:
1. Asegúrese de que sus permisos de RBAC incluyan [`org_management`][7], para que pueda habilitar Remote Configuration para su organización.
1. Desde su página {{< ui >}}Organization Settings{{< /ui >}}, habilite [Remote Configuration][8]. Esto permite que los componentes de Datadog en toda su organización reciban configuraciones de Datadog.
1. Siga la guía de [configuración específica del producto](#product-specific-configuration) a continuación para terminar de configurar Remote Configuration.

### Configuración específica del producto {#product-specific-configuration}

Consulte la documentación a continuación para obtener instrucciones específicas para el producto que está configurando.

| Producto                 | Instrucciones de configuración                                                                                             |
|-------------------------|----------------------------------------------------------------------------------------------------------------|
| Fleet Automation        | [Setup Fleet Automation][31]                                                                                   |
| App and API Protection (AAP) | [App and API Protection setup][33]                                                                         |
| APM                     | [Configuración en tiempo de ejecución](/tracing/guide/remote_config/)                                                      |
| Dynamic Instrumentation | [Dynamic Instrumentation][11] |
| Workload Protection     | [Workload Protection][3]                                                                                       |
| Observability Pipelines | Asegúrese de haber [enabled Remote Configuration on the API key][32] que utiliza para Observability Pipelines. |
| Sensitive Data Scanner  | [Almacenamiento en la nube](/security/sensitive_data_scanner/setup/cloud_storage/?tab=newawsaccount)                       |
| Private Action Runner   | [Descripción general de Private Actions](/actions/private_actions/)                                                          |
| Feature Flags           | [Server-Side Feature Flags](/feature_flags/server/)                                                            |

## Mejores prácticas {#best-practices}

### Datadog Audit Trail {#datadog-audit-trail}

Utilice [Datadog Audit Trail][13] para hacer un seguimiento del acceso a la organización y de los eventos habilitados de Remote Configuration. Audit Trail permite a sus administradores y equipos de seguridad hacer un seguimiento de la creación, eliminación y modificación de las claves de Datadog API y de aplicación. Una vez configurado Audit Trail, puede visualizar los eventos relacionados con las funciones habilitadas de Remote Configuration y quién ha solicitado estos cambios. Audit Trail le permite reconstruir secuencias de eventos y establecer un seguimiento sólido de Datadog para Remote Configuration.

### Monitores {#monitors}

Configure [monitors][14] para recibir notificaciones cuando se encuentre un evento de interés.

## Exclusión de Remote Configuration {#opting-out-of-remote-configuration}

En lugar de deshabilitar Remote Configuration de forma global, Datadog recomienda excluir productos específicos de Datadog. Para obtener más información, consulte [la documentación del producto correspondiente](#product-specific-configuration).

## Lecturas adicionales {#further-reading}

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
[11]: /es/tracing/trace_collection/dynamic_instrumentation
[12]: /es/security/application_security/how-appsec-works/#built-in-protection
[13]: /es/account_management/audit_trail
[14]: /es/monitors/
[15]: /es/help/
[16]: /es/remote_configuration
[17]: /es/agent/configuration/network
[18]: /es/agent/configuration/proxy/
[19]: /es/internal_developer_portal/catalog/
[21]: /es/agent/configuration/agent-configuration-files/?tab=agentv6v7#agent-main-configuration-file
[22]: /es/tracing/trace_collection/runtime_config/
[23]: /es/remote_configuration#opting-out-of-remote-configuration
[24]: https://app.datadoghq.com/organization-settings/api-keys
[25]: /es/agent/guide/
[26]: https://app.datadoghq.com/organization-settings/remote-config/setup?page_id=org-enablement-step
[27]: /es/agent/fleet_automation/fleet_view/#send-a-remote-flare
[28]: /es/security/sensitive_data_scanner/?tab=usingtheagent
[29]: /es/agent/fleet_automation/upgrade_agents/
[30]: /es/actions/private_actions/
[31]: /es/agent/guide/setup_remote_config
[32]: https://app.datadoghq.com/organization-settings/remote-config/setup?page_id=api-key-enablement-step&standalone=1
[33]: /es/security/application_security/setup/
[34]: /es/security/application_security/
[35]: /es/tracing/trace_pipeline/adaptive_sampling/
[36]: /es/tracing/dynamic_instrumentation/#explore-dynamic-instrumentation
[37]: /es/account_management/rbac
[38]: /es/agent/fleet_automation/#control-access-to-fleet-automation
[39]: /es/security/access_control/#permissions
[40]: /es/tracing/trace_pipeline/adaptive_sampling/#permissions
[41]: /es/account_management/rbac/permissions/#apm
[42]: /es/account_management/rbac/permissions/#cloud-security-platform
[43]: /es/security/cloud_security_management/setup/#enable-agentless-scanning
[44]: /es/account_management/rbac/permissions/#observability-pipelines
[45]: /es/account_management/rbac/permissions/#app-builder--workflow-automation
[46]: /es/account_management/rbac/permissions/#serverless
[47]: /es/containers/autoscaling
[48]: /es/feature_flags/