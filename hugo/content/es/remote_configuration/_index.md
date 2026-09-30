---
algolia:
  tags:
  - remote config
  - remote configuration
aliases:
- /es/agent/guide/how_rc_works
- /es/agent/guide/how_remote_config_works
- /es/agent/remote_config
description: Configura y cambia de manera remota el comportamiento de los componentes
  de Datadog, como Agentes, SDKs y Trabajadores de Pipelines de Observabilidad desplegados
  en tu infraestructura.
further_reading:
- link: /security/application_security/how-appsec-works/#built-in-protection
  tag: Documentación
  text: Cómo funciona el Monitoreo de Seguridad de Aplicaciones
- link: /dynamic_instrumentation/?tab=configurationyaml#enable-remote-configuration
  tag: Documentación
  text: Instrumentación Dinámica
- link: /security/workload_protection/
  tag: Documentación
  text: Configuración de Workload Protection
- link: https://www.datadoghq.com/blog/compliance-governance-transparency-with-datadog-audit-trail/
  tag: Blog
  text: Uso de Audit Trail de Datadog
- link: https://www.datadoghq.com/blog/remote-configuration-for-datadog/
  tag: Blog
  text: Aplica actualizaciones en tiempo real a los componentes de Datadog con Remote
    Configuration
title: Remote Configuration
---
## Descripción General {#overview}

Remote Configuration es una capacidad de Datadog que te permite configurar y cambiar de manera remota el comportamiento de características seleccionadas del producto en componentes de Datadog, como Agentes, SDKs y Trabajadores de Observability Pipelines desplegados en tu infraestructura. Utiliza Remote Configuration para aplicar configuraciones a los componentes de Datadog en tu entorno bajo demanda, disminuyendo los costos de gestión, reduciendo la fricción entre equipos y acelerando los tiempos de resolución de problemas.

Para los productos de seguridad de Datadog, App and API Protection y Workload Protection, los Agentes habilitados para Remote Configuration y los SDKs compatibles proporcionan actualizaciones y respuestas de seguridad en tiempo real, mejorando la postura de seguridad de tus aplicaciones e infraestructura en la nube.

## Cómo funciona {#how-it-works}

Cuando Remote Configuration está habilitada, los componentes de Datadog, como el Datadog Agent, consultan de manera segura el [sitio de Datadog][1] configurado para cambios de configuración que están listos para aplicarse. Los cambios pendientes se aplican automáticamente a los componentes de Datadog. Por ejemplo, después de que envías cambios de configuración en la interfaz de usuario de Datadog para una característica del producto habilitada para Remote Configuration, los cambios se almacenan en Datadog.

El siguiente diagrama ilustra cómo funciona Remote Configuration:

{{<img src="agent/remote_config/RC_Diagram_v5.png" alt="Los usuarios configuran características en la interfaz de usuario, la configuración se almacena en Datadog, el Agent solicita actualizaciones de configuración." width="90%" style="center">}}

1. Configuras características seleccionadas del producto en la interfaz de usuario de Datadog.
2. Las configuraciones de características del producto se almacenan de manera segura dentro de Datadog.
3. Los componentes de Datadog habilitados para Remote Configuration en tus entornos consultan, reciben y aplican automáticamente actualizaciones de configuración de Datadog de manera segura. Las bibliotecas de trazado que se implementan en tus entornos se comunican con los Agent para solicitar y recibir actualizaciones de configuración de Datadog en lugar de consultar directamente a Datadog.

## Entornos soportados {#supported-environments}

Remote Configuration funciona en entornos donde se han implementado componentes soportados de Datadog. Los componentes compatibles de Datadog incluyen:
- Agentes
- Trazadores (indirectamente)
- Trabajadores de la Canalización de Observabilidad
- Ejecutores de acción privados y servicios de contenedores sin servidor en la nube, como AWS Fargate.

La Configuración Remota no soporta aplicaciones gestionadas de contenedores sin servidor, como AWS App Runner, Azure Container Apps, Google Cloud Run; o funciones implementadas con empaquetado de contenedores, como AWS Lambda, Azure Functions y Google Cloud Functions.

## Productos y características compatibles {#supported-products-and-features}

Los siguientes productos y características son compatibles con la Configuración Remota.

Automatización de Flotas
: - [Enviar señales][27] directamente desde el sitio de Datadog. Solucione problemas del Agente de Datadog sin acceder directamente al host.
: - [Actualice sus Agentes][29].

Protección de Aplicaciones y API (AAP)
: - [Activación de AAP con un clic][33]: Habilite AAP con un clic desde la interfaz de usuario de Datadog.
: - [Actualizaciones de patrones de ataque en la aplicación][34]: Reciba automáticamente los patrones de ataque más recientes del Firewall de Aplicaciones Web (WAF) a medida que Datadog los publique, siguiendo las vulnerabilidades o vectores de ataque recientemente divulgados.
: - [Proteger][34]: Bloquear las IPs de los atacantes, usuarios autenticados y solicitudes sospechosas que se marquen en las Señales y Trazas de Seguridad de AAP temporal o permanentemente a través de la interfaz de usuario de Datadog.

Monitoreo del Rendimiento de Aplicaciones (APM)
: - Configuración en tiempo de ejecución: Cambiar la tasa de muestreo de trazas de un servicio, habilitación de inyección de registros y etiquetas de encabezados HTTP desde la interfaz de usuario del Catálogo, sin necesidad de reiniciar el servicio. Lea [Configuración en Tiempo de Ejecución][22] para más información.
: - [Configurar remotamente la tasa de muestreo del Agente][35]: Configurar remotamente el Agente de Datadog para cambiar sus tasas de muestreo de trazas y establecer reglas para escalar la ingesta de trazas de su organización de acuerdo a sus necesidades, sin necesidad de reiniciar su Agente de Datadog.

[Instrumentación Dinámica][36]
: - Enviar métricas críticas, trazas y registros desde sus aplicaciones en vivo sin cambios en el código.

Protección de Carga de Trabajo
: - Actualizaciones automáticas de reglas predeterminadas del Agente: Recibir y actualizar automáticamente las reglas predeterminadas del Agente mantenidas por Datadog a medida que se lanzan nuevas detecciones y mejoras del Agente. Consulte [Configuración de Protección de Carga de Trabajo][3] para más información.
: - Despliegue automático de reglas personalizadas del Agente: Desplegar automáticamente sus reglas personalizadas del Agente en hosts designados (todos los hosts o un subconjunto definido de hosts).

Observability Pipelines
: - Desplegar y actualizar remotamente [Observability Pipelines Workers][4] (OPW): Construir y editar canalizaciones en la interfaz de usuario de Datadog, implementando sus cambios de configuración en instancias de OPW que se ejecutan en su entorno.

[Escalado Automático][47]
: - Gestionar remotamente configuraciones de escalado automático de clústeres y cargas de trabajo para sus entornos en contenedores. Consulte [Escalado Automático][47] para más información.

Ejecutor de acciones privado
: - Ejecutar flujos de trabajo y aplicaciones de Datadog que interactúan con servicios alojados en su red privada sin exponer sus servicios a Internet público. Para más información, consulte [Acciones Privadas][30].

Feature Flags
: - Entregar configuraciones de flag (reglas de asignación y objetivo) a los kits de desarrollo de software del lado del servidor para la asignación sincrónica de variantes basada en el contexto de evaluación. Vea [Feature Flags][48] para más información.

## Consideraciones de seguridad {#security-considerations}

Datadog implementa las siguientes salvaguardias para proteger la confidencialidad, integridad y disponibilidad de las configuraciones recibidas y aplicadas por sus componentes de Datadog:

- Los componentes de Datadog con Configuración Remota habilitada desplegados en su infraestructura solicitan configuraciones a Datadog.
  <div class="alert alert-info">Algunos componentes como los ejecutores de acción privados siempre tienen habilitada la configuración remota. Otros, como los Agentes, pueden ser habilitados o deshabilitados utilizando opciones de configuración en disco.</div>
- Datadog nunca envía cambios de configuración a menos que sean solicitados por los componentes de Datadog. Si envía cambios de configuración, Datadog solo envía cambios relevantes para el componente que lo solicita.
- Las solicitudes de configuración se inician desde su infraestructura hacia Datadog a través de HTTPS (puerto 443). Este es el mismo puerto que el Agente utiliza por defecto para enviar datos de observabilidad.
- La comunicación entre sus componentes de Datadog y Datadog está encriptada utilizando HTTPS y es autenticada y autorizada utilizando su clave API de Datadog, excepto en el caso de los ejecutores de acción privados donde se utiliza un token JWT en su lugar.
- Solo los usuarios con el permiso de [`api_keys_write`][5] están autorizados para habilitar o deshabilitar la capacidad de Configuración Remota en las claves API y utilizar las características del producto soportadas.
- Los cambios de configuración que envíe a través de la interfaz de usuario de Datadog son firmados y validados por el componente de Datadog que lo solicita, verificando la integridad de la configuración.

### Acceso basado en roles {#role-based-access}

Habilitar la Configuración Remota impacta los siguientes productos. Cada producto define un conjunto de controles de acceso basado en roles que deben ser otorgados a sus usuarios. Para información general sobre la gestión de acceso, vea [Access Control][37].

 | Producto Habilitado para Configuración Remota   | Controles de Acceso Basados en Roles                                                                                                                                                                                                                                                                     |
 |----------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
 | Fleet Automation                       | `FLEET_POLICIES_WRITE`<br>`AGENT_UPGRADE_WRITE`<br>`FLEET_FLARE`<br><br>Para más información, consulte [Fleet Automation][38].                                                                                                                                                                      |
 | Protección de Aplicaciones y API                 | `APPSEC_ACTIVATION_READ`<br>`APPSEC_ACTIVATION_WRITE`<br>`APPSEC_PROTECT_READ`<br>`APPSEC_PROTECT_WRITE`<br><br>Para más información, consulte [Access Control][39].                                                                                                                                |
 | APM                                    | `APM_SERVICE_INGEST_READ`<br>`APM_SERVICE_INGEST_WRITE`<br>`APM_REMOTE_CONFIGURATION_READ`<br>`APM_REMOTE_CONFIGURATION_WRITE`<br><br>Para más información, consulte [Adaptive Sampling][40].                                                                                                       |
 | Dynamic Instrumentation                | `DEBUGGER_READ`<br>`DEBUGGER_WRITE`<br>`DEBUGGER_WRITE_PRE_PROD`<br>`APM_REMOTE_CONFIGURATION_READ`<br>`APM_REMOTE_CONFIGURATION_WRITE`<br><br>Para más información, consulte [APM][41].                                                                                                            |
 | Workload Protection                    | `SECURITY_MONITORING_CWS_AGENT_RULES_WRITE`<br>`SECURITY_MONITORING_CWS_AGENT_RULES_READ`<br>`SECURITY_MONITORING_CWS_AGENT_RULES_ACTIONS`<br><br>Para más información, consulte [Security][42].                                                                                                    |
 | CSM Side Scanning                      | `ORG_MANAGEMENT`<br>`MANAGE_INTEGRATIONS`<br><br> Para más información, consulte [Enable Agentless Scanning][43].                                                                                                                                                                                   |
 | Observability Pipelines                | `OBSERVABILITY_PIPELINES_READ`<br>`OBSERVABILITY_PIPELINES_WRITE`<br>`OBSERVABILITY_PIPELINES_DELETE`<br>`OBSERVABILITY_PIPELINES_DEPLOY`<br>`OBSERVABILITY_PIPELINES_CAPTURE_WRITE`<br>`OBSERVABILITY_PIPELINES_CAPTURE_READ`<br><br>Para más información, consulte [Observability Pipelines][44]. |
 | Private Action Runner                  | `ON_PREM_RUNNER_WRITE`<br>`ON_PREM_RUNNER_READ`<br>`ON_PREM_RUNNER_USE`<br><br>Para más información, consulte [App Builder & Workflow Automation][45].                                                                                                                                              |
 | Network Device Monitoring (NDM)        | `NDM_DEVICE_PROFILES_VIEW`<br>`NDM_DEVICE_PROFILES_EDIT`                                                                                                                                                                                                                                       |
 | Container Autoscaling                  | `ORCHESTRATION_AUTOSCALING_MANAGE`<br>`ORCHESTRATION_WORKLOAD_SCALING_WRITE`<br>`ORCHESTRATION_WORKLOAD_SCALING_READ`                                                                                                                                                                          |
 | Serverless Lambda Auto-instrumentation | `SERVERLESS_AWS_INSTRUMENTATION_READ`<br>`SERVERLESS_AWS_INSTRUMENTATION_WRITE`<br><br>Para más información, consulte [Serverless][46].                                                                                                                                                             |
 | Feature Flags                          | `FEATURE_FLAG_CONFIG_READ`<br>`FEATURE_FLAG_CONFIG_WRITE`<br>`FEATURE_FLAG_ENVIRONMENT_CONFIG_READ`<br>`FEATURE_FLAG_ENVIRONMENT_CONFIG_WRITE`<br><br>Para más información, consulte [Feature Flags][48].                                                                                           |

## Habilitar Remote Configuration {#enable-remote-configuration}

En la mayoría de los casos, Remote Configuration está habilitado por defecto para su organización. Puede verificar si Remote Configuration está habilitado en su organización desde la página de configuración de [Remote Configuration][8]. Si necesita habilitarla:
1. Asegúrese de que sus permisos de RBAC incluyan [`org_management`][7], para que pueda habilitar Remote Configuration para su organización.
1. Desde la página de Configuración de su Organización, habilite [Remote Configuration][8]. Esto habilita los componentes de Datadog en toda su organización para recibir configuraciones de Datadog.
1. Siga la [guía de configuración específica del producto](#product-specific-configuration) a continuación para finalizar la configuración de Remote Configuration.

### Configuración específica del producto {#product-specific-configuration}

Consulte la documentación a continuación para obtener instrucciones específicas sobre el producto que está configurando.

| Producto                 | Instrucciones de configuración                                                                                             |
|-------------------------|----------------------------------------------------------------------------------------------------------------|
| Fleet Automation        | [Setup Fleet Automation][31]                                                                                   |
| APM                     | [Configuración en tiempo de ejecución](/tracing/guide/remote_config/)                                                      |
| Dynamic Instrumentation | [Comenzando con Dynamic Instrumentation](/dynamic_instrumentation/#getting-started)                      |
| Workload Protection     | [Workload Protection][3]                                                                                       |
| Observability Pipelines | Asegúrese de que ha [habilitado Remote Configuration en la API key][32] que está utilizando para Observability Pipelines. |
| Sensitive Data Scanner  | [Cloud storage](/security/sensitive_data_scanner/setup/cloud_storage/?tab=newawsaccount)                       |
| Private Action Runner | [Private Actions Overview](/actions/private_actions/)                                                          |
| Feature Flags | [Feature Flags del Lado del Servidor](/feature_flags/server/)                                                            |

## Mejores Prácticas {#best-practices}

### Datadog Audit Trail {#datadog-audit-trail}

Utilice [Datadog Audit Trail][13] para monitorear el acceso a la organización y los eventos habilitados de Remote Configuration. Audit Trail permite a sus administradores y equipos de seguridad rastrear la creación, eliminación y modificación de claves de API y de aplicación de Datadog. Después de configurar Audit Trail, puede ver eventos relacionados con las características habilitadas de Remote Configuration y quién ha solicitado estos cambios. Audit Trail le permite reconstruir secuencias de eventos y establecer un monitoreo robusto de Datadog para Remote Configuration.

### Monitors {#monitors}

Configure [monitors][14] para recibir notificaciones cuando se encuentre un evento de interés.

## Opting out of Remote Configuration {#opting-out-of-remote-configuration}

En lugar de deshabilitar Remote Configuration globalmente, Datadog recomienda optar por no participar en productos específicos de Datadog. Para más información, consulte [la documentación del producto relevante](#product-specific-configuration).

## Lectura Adicional {#further-reading}

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
[19]: /es/internal_developer_portal/catalog/
[20]: /es/dynamic_instrumentation/?tab=configurationyaml#prerequisites
[21]: /es/agent/configuration/agent-configuration-files/?tab=agentv6v7#agent-main-configuration-file
[22]: /es/tracing/trace_collection/runtime_config/
[23]: /es/remote_configuration#opting-out-of-remote-configuration
[24]: https://app.datadoghq.com/organization-settings/api-keys
[25]: /es/agent/guide/
[26]: https://app.datadoghq.com/organization-settings/remote-config/setup?page_id=org-enablement-step
[27]: /es/agent/fleet_automation/fleet_view/#send-a-remote-flare
[28]: /es/security/sensitive_data_scanner/?tab=usingtheagent
[29]: /es/agent/fleet_automation/upgrade_agents/
[30]: /es/actions/private_actions/use_private_actions/
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