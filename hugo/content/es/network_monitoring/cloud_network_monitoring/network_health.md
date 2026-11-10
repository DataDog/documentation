---
aliases:
- /es/network_monitoring/cloud_network_monitoring/overview_page
description: Identifique problemas de red y resuélvalos con información práctica.
further_reading:
- link: https://www.datadoghq.com/blog/cloud-network-monitoring-datadog/
  tag: Blog
  text: Haga un seguimiento de su arquitectura en la nube y las dependencias de las
    aplicaciones con Datadog CNM
- link: /network_monitoring/cloud_network_monitoring/network_analytics
  tag: Documentación
  text: Obtenga más información sobre Network Analytics
- link: https://www.datadoghq.com/blog/cnm-network-health
  tag: Blog
  text: Detecte, diagnostique y resuelva problemas de red fácilmente con CNM Network
    Health
title: Network Health
---
<div class="alert alert-info">Network Health está en versión preliminar. Comuníquese con su representante de Datadog para registrarse.
</div>

## Descripción general {#overview}

Network Health proporciona una vista unificada de los problemas más críticos de su red, detectando y priorizando automáticamente los problemas en DNS, certificados TLS, grupos de seguridad y anomalías de red. Ofrece información práctica con rutas de corrección claras, lo que le ayuda a resolver problemas de conectividad y reducir el impacto de los incidentes.

Esta página describe las secciones de la página de Network Health y los problemas e información que se muestran en cada una.

{{< img src="network_performance_monitoring/network_health/network_health_overview.png" alt="La página de Network Health con el menú plegable abierto, destacando las Acciones recomendadas." style="width:100%;">}}

## Requisitos previos {#prerequisites}

- [Cloud Network Monitoring][1] está habilitado.
- Para visualizar [Security Groups](#security-groups), la [recopilación de recursos][6] debe estar habilitada en su integración de AWS.

## Acciones recomendadas {#recommended-actions}

La sección {{< ui >}}Recommended Actions{{< /ui >}} destaca los problemas más críticos detectados en su red. Estos se priorizan según:

1. **Gravedad**: si el problema está bloqueando activamente el tráfico
2. **Impacto**: qué tan críticos son los servicios afectados para su infraestructura

Cada acción recomendada muestra:

- El problema específico detectado (por ejemplo, "Certificado TLS expirado hace _N_ días")
- El servicio cliente afectado (el servicio que realiza las solicitudes)
- El servicio de servidor afectado (el servicio que recibe las solicitudes)

Pase el cursor sobre el nombre de un servicio para cambiar a APM, o haga clic en {{< ui >}}Remediate{{< /ui >}} para visualizar los pasos de corrección junto con las opciones para crear un [{{< ui >}}New Workflow{{< /ui >}}][2], [{{< ui >}}Create a Case{{< /ui >}}][3] o [{{< ui >}}Declare an Incident{{< /ui >}}][4].

   {{< img src="network_performance_monitoring/network_health/recommended_actions_side_panel.png" alt="Panel lateral de acciones recomendadas de un servicio afectado, que muestra los pasos de corrección." style="width:100%;">}}

## Watchdog Insights {#watchdog-insights}

La sección {{< ui >}}Watchdog Insights{{< /ui >}} muestra el comportamiento de red anómalo detectado por Watchdog, centrándose en los picos de retransmisiones TCP. Un aumento en las retransmisiones en comparación con su línea base (normalmente la semana anterior) a menudo indica un problema de red subyacente. Consulte la documentación de [Watchdog Insights][5] para obtener más información.

Utilice Watchdog Insights para:
- Detectar posibles problemas de forma temprana
- Correlacionar anomalías con causas raíz específicas
- Investigar la degradación del rendimiento antes de que afecte a los usuarios

También puede investigar la latencia, la pérdida de paquetes y el estado de la conexión TCP desde un agente de IA, como Claude Code o Cursor, con la herramienta [`analyze_cloud_network_monitoring`][7] en el Datadog MCP Server.

## Certificados TLS {#tls-certificates}

Los certificados TLS caducados o a punto de caducar pueden bloquear las conexiones seguras entre servicios, lo que provoca la pérdida de tráfico. La sección {{< ui >}}TLS Certificates{{< /ui >}} enumera:

- {{< ui >}}Expired certificates{{< /ui >}}: Certificados que no son válidos y bloquean el tráfico
- {{< ui >}}Expiring certificates{{< /ui >}}: Certificados a punto de caducar
- {{< ui >}}Impacted services{{< /ui >}}: Los servicios de cliente y servidor afectados por cada problema de certificado (tenga en cuenta que el "servicio" cliente puede ser un balanceador de carga de AWS, como un Application Load Balancer)

Haga clic en un certificado caducado para visualizar los pasos para renovarlo en AWS, o para crear un [{{< ui >}}New Workflow{{< /ui >}}][2], [{{< ui >}}Create a Case{{< /ui >}}][3] o [{{< ui >}}Declare an Incident{{< /ui >}}][4].

## Fallos de DNS {#dns-failures}

Las configuraciones incorrectas de DNS pueden dirigir el tráfico a destinos incorrectos, lo que impide que los servicios se comuniquen. Estas fallas generalmente resultan de cambios realizados en las configuraciones de enrutamiento de DNS.

La sección {{< ui >}}DNS Failures{{< /ui >}} muestra:

- {{< ui >}}Failure reason{{< /ui >}}: La causa de la falla de DNS
- {{< ui >}}Impacted DNS server{{< /ui >}}: El servidor DNS que experimenta tasas de falla elevadas
- {{< ui >}}Impacted services{{< /ui >}}: Los servicios de cliente y servidor afectados por la falla de DNS

**Razones de la falla**:

NXDOMAIN  
: El nombre de dominio no existe, generalmente debido a una configuración incorrecta o a un dominio eliminado.

TIMEOUT 
: La consulta DNS excedió el tiempo de espera antes de recibir una respuesta, lo cual puede indicar problemas de red o servidores DNS que no responden.

SERVFAIL
: El servidor DNS no pudo procesar una consulta, a menudo debido a un problema del lado del servidor.

Pase el cursor sobre el nombre de un servicio para cambiar a APM, o haga clic en una acción recomendada para visualizar los pasos de corrección junto con opciones para crear un [{{< ui >}}New workflow{{< /ui >}}][2], [{{< ui >}}Create a Case{{< /ui >}}][3] o [{{< ui >}}Declare an Incident{{< /ui >}}][4].

## Security Groups {#security-groups}

Los Security Groups controlan el flujo de tráfico en entornos de nube mediante reglas de permitir y denegar. Debido a que los Security Groups deniegan el tráfico de forma predeterminada, las eliminaciones o modificaciones accidentales de reglas pueden bloquear inmediatamente el tráfico legítimo entre servicios.

**Nota**: El monitoreo de Security Groups solo está disponible para AWS y requiere que [EC2 resource collection][6] esté habilitado en su integración de AWS.

La sección {{< ui >}}Security Groups{{< /ui >}} identifica:
- Security Groups misconfigurations blocking traffic → Las configuraciones incorrectas de Security Groups que bloquean el tráfico
- Los servicios específicos que no pueden comunicarse
- Cambios recientes en las reglas de Security Groups

**Resolución**: 
1. Haga clic en un problema de Security Group para abrir el panel lateral.
2. Seleccione {{< ui >}}View in AWS{{< /ui >}} para navegar a la consola de AWS.
3. Revise y modifique las reglas de entrada y salida.
4. Utilice los datos de {{< ui >}}Infrastructure Change Tracking{{< /ui >}} en el panel lateral para identificar cuándo ocurrió el cambio y revertirlo si es necesario.

## Filtrado {#filtering}

Utilice los filtros en la parte superior de la página para limitar el contexto de los problemas mostrados. Los filtros disponibles incluyen:

- {{< ui >}}Service{{< /ui >}}: Visualizar problemas que afectan a un servicio en particular
- {{< ui >}}Team{{< /ui >}}: Visualizar problemas propiedad de un equipo específico

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/network_monitoring/cloud_network_monitoring/setup
[2]: /es/actions/workflows/build/
[3]: /es/incident_response/work_management/create_work_item
[4]: /es/incident_response/incident_management/declare/
[5]: /es/watchdog/insights
[6]: /es/integrations/amazon-web-services/#resource-collection
[7]: /es/mcp_server/tools/#analyze_cloud_network_monitoring