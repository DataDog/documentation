---
aliases:
- /es/security/cloud_siem/content_packs
disable_toc: true
further_reading:
- link: /security/cloud_siem/detection_rules
  tag: Documentación
  text: Cree reglas de detección de registro
- link: security/cloud_siem/investigator
  tag: Documentación
  text: Obtenga más información sobre el Investigator
- link: /security/cloud_siem/triage_and_investigate/investigate_security_signals
  tag: Documentación
  text: Investigue señales de seguridad
- link: https://www.datadoghq.com/blog/cloud-siem-content-packs-whats-new-2024-09/
  tag: Blog
  text: 'Novedades en los paquetes de contenido de Cloud SIEM: septiembre de 2024'
- link: https://www.datadoghq.com/blog/microsoft-365-detections/
  tag: Blog
  text: Cómo los atacantes aprovechan los servicios de Microsoft 365
- link: https://www.datadoghq.com/blog/google-workspace-detections/
  tag: Blog
  text: Detecte actividad maliciosa en las aplicaciones de Google Workspace con Datadog
    Cloud SIEM
- link: https://www.datadoghq.com/blog/ocsf-common-data-model/
  tag: Blog
  text: Normalice sus datos con el modelo de datos común OCSF en Datadog Cloud SIEM
- link: https://www.datadoghq.com/blog/cloud-siem-whats-new-rsa-2026
  tag: Blog
  text: 'Novedades en Cloud SIEM: investigaciones con IA, inteligencia de amenazas
    mejorada y operaciones de seguridad escalables'
- link: https://www.datadoghq.com/blog/cloud-siem-enterprise-security
  tag: Blog
  text: 'Datadog Cloud SIEM: impulsando la innovación en las operaciones de seguridad'
- link: https://www.datadoghq.com/blog/oci-content-pack
  tag: Blog
  text: Haga un seguimiento de los registros de auditoría de OCI con Datadog Cloud
    SIEM
title: Paquetes de contenido
---
## Descripción general {#overview}

[Cloud SIEM Content Packs][1] proporcionan contenido listo para usar en integraciones de seguridad clave. Dependiendo de la integración, un paquete de contenido puede incluir lo siguiente:

- [Reglas de detección][2] para proporcionar una cobertura integral de su entorno
- Un tablero interactivo con información detallada sobre el estado de los registros y las señales de seguridad para el paquete de contenido
- [Investigator][3], una interfaz gráfica interactiva para investigar actividades sospechosas de un usuario o recurso
- [Workflow Automation][4], para automatizar acciones y acelerar la investigación y remediación de problemas
- Guías de configuración
- [Canalizaciones OCSF][5] para normalizar los registros de la integración al modelo de datos común Open Cybersecurity Schema Framework
- Alertas de terceros de la integración, asignadas a señales de seguridad de Cloud SIEM

Puede filtrar los paquetes de contenido por los siguientes tipos:
- **Paquetes de contenido**: Integrations agrupadas con contenido relevante para la seguridad, como reglas de detección, flujos de trabajo de SOAR (Security Orchestration, Automation, and Response) y herramientas personalizadas
- **Paquetes de enriquecimiento**: Contenido para agregar contexto valioso al análisis de SIEM, como vulnerabilidades o información de terceros, para mejorar las investigaciones
- **Paquetes de integración**: Contenido seleccionado del catálogo de Datadog para que sea relevante para su uso con Cloud SIEM
<!-- - **Entity Packs**: Integrations and bundled content that power UEBA (User and Entity Behavior Analytics) by modeling normal activity for users and entities and surfacing risky anomalies in Cloud SIEM -->

Además de los paquetes de contenido enumerados en esta página, Cloud SIEM incluye **Paquetes de contenido siempre activos**: enriquecimientos de inteligencia de amenazas que Datadog aplica automáticamente a sus registros y señales de seguridad, sin necesidad de instalación ni configuración.

{{% cloud-siem-content-packs %}}

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/security/siem/content-packs
[2]: /es/security/detection_rules/
[3]: /es/security/cloud_siem/triage_and_investigate/investigator
[4]: /es/actions/workflows/
[5]: /es/security/cloud_siem/ingest_and_enrich/open_cybersecurity_schema_framework/