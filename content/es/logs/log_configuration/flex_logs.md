---
aliases:
- /es/logs/log_configuration/flex_log/
description: Capacidades de consulta en directo rentables para la conservación de
  logs a largo plazo
further_reading:
- link: https://www.datadoghq.com/blog/flex-logging
  tag: Blog
  text: Almacena y analiza grandes volúmenes de logs de forma eficaz con Flex Logs
- link: https://www.datadoghq.com/blog/monitor-dns-logs-for-network-and-security-datadog/
  tag: Blog
  text: Monitorización de logs DNS para la red y los análisis de seguridad
- link: /logs/log_configuration/indexes
  tag: Documentación
  text: Índices de logs
- link: /logs/log_configuration/archives
  tag: Documentación
  text: Archivos de logs
kind: documentation
title: Flex Logs
---

{{< callout url="https://docs.google.com/forms/d/15FJG6RTFMmp7c7aRE8bcTy6B1Tt8ia4OmiesQa_zkZ4/viewform?edit_requested=true" btn_hidden="false" header="Request Access!">}}
Flex Logs tiene disponibilidad limitada, pero puedes solicitar tu acceso. Utiliza este formulario para enviar tu solicitud hoy mismo.
{{< /callout >}}

## Información general

Flex Logs desacopla el cálculo de almacenamiento de logs y de consultas de logs. Esto te permite almacenar todos tus logs y tener más flexibilidad para elegir los casos de uso que quieres atender. Puedes conservar logs de gran volumen durante largos periodos de tiempo y almacenar todos tus logs con Datadog, en todos los casos de uso y presupuestos.

Los equipos de seguridad, cumplimiento normativo e ingeniería a menudo necesitan consultar logs durante largos periodos de tiempo. Las brechas de seguridad y los incidentes a menudo se detectan después de semanas, si no meses, y las revisiones de cumplimiento legal y los procesos de auditoría pueden requerir logs que se remontan a más de un año. Las necesidades de análisis a largo plazo no se limitan a los equipos de seguridad. A los equipos de ingeniería, que año tras año realizan análisis de elevada cardinalidad a largo plazo de millones de entidades como usuarios, hosts, y direcciones IP, les resultan más útiles los logs que las métricas.

Este resumen destaca las principales características del almacenamiento de nivel Flex, las diferencias entre las opciones de almacenamiento estándar y Flex para los datos de tus logs y los casos de uso de almacenamiento de nivel Flex.

## Configurar niveles de almacenamiento

Flex Logs se configura a través de los parámetros para índices de logs. Los [filtros de índices][1] que se aplican a etos índices también se aplican a Flex Logs.

Configura el nivel Flex en la página [Configuración de ndices de logs][2]:

1. Ve a [**Logs > Pipelines > Indexes** (Logs > Pipelines > Índices)][2].
2. Edita el índice que quieres activar con Flex Logs o crea un nuevo índice.
3. Selecciona **Flex Tier** (Nivel Flex) y configura la opción de conservación en *Configure Storage Tier and Retention* (Configurar el nivel de almacenamiento y la opción de conservación).

{{< img src="logs/log_configuration/flex_logging/flex_configuration.png" alt="Opciones de almacenamiento del nivel Flex en la configuración de índices" style="width:100%;" >}}

**Notas**:
- Si se seleccionan ambas opciones, los logs se almacenan en el nivel estándar, hasta el final del período de conservación configurado, antes de ser almacenados en el nivel Flex. Por ejemplo, puedes seleccionar el nivel estándar, para una conservación de 3 días, y el nivel Flex, para una conservación de 90 días. Los Logs de ese índice se almacenan primero en el nivel estándar, durante 3 días, y luego en el nivel Flex, durante los 87 días restantes, lo que asciende a un total de 90 días de conservación.
- La posibilidad de agregar el nivel estándar a un índice Flex se aplica a los nuevos logs, no a los logs preexistentes en el índice Flex.

## Buscar índices Flex

{{< img src="logs/log_configuration/flex_logging/flex_toggle_search.png" alt="Habilitar la gestión de logs Flex en la página del Explorador de logs activando la opción" style="width:100%;" >}}

En el Explorador de logs, activa la opción **Include Flex Indexes** (Incluir índices Flex) para incluir logs con el índice Flex en los resultados de tu consulta de búsqueda. Esta opción se encuentra junto al selector de tiempo. 

[Realiza tu búsqueda][3] escribiendo las consultas en la barra de búsqueda o seleccionando la faceta correspondiente en el panel de facetas.

## Casos de uso del almacenamiento Flex

El almacenamiento de nivel Flex es útil para almacenar logs, donde las investigaciones de seguridad/auditoría de larga duración, la integridad de los datos y los requisitos de conformidad son más importantes que los tiempos de respuesta inferiores a un segundo. Algunos ejemplos de uso del almacenamiento Flex son:
- Conservación de logs para auditorías a largo plazo.
- Conservación de logs por motivos legales y de cumplimiento normativo.
- Necesidad de todos los logs para investigaciones de seguridad.
- Necesidad de consultar logs para informes y análisis de datos de elevada cardinalidad durante largos periodos de tiempo.

## Fuentes potenciales para el envío directo al nivel Flex de indexación de logs

La siguiente lista es un ejemplo de orígenes de logs que son potencialmente buenos candidatos para el envío de logs al nivel Flex, sin pasar primero por la indexación estándar. No se trata de una lista exhaustiva, y el objetivo de dar una idea de los tipos de logs adecuados para esta configuración. Otros orígenes de logs (por ejemplo, logs de aplicaciones) pueden enviarse al nivel Flex, después de pasar primero por la indexación estándar, para los casos de uso en directo de resolución de problemas, alertas y depuración. Tus casos de uso para estos orígenes pueden variar, así que es importante que lo tengas en cuenta a la hora de decidir si omitirás la indexación estándar.

**Nota**: Estos ejemplos son sólo una muestra de cada categoría. Hay muchos más servicios, herramientas y tecnologías disponibles para cada categoría que tal vez quieras enviar al nivel Flex.

- **Ejemplos de servicios CDN**
  - Akamai, Cloudflare, Fastly y CloudFront.
- **Ejemplos de servicios DNS**
  - Route53, Cloudflare, Akamai (Edge) y NS1.
- **Ejemplos de logs cortafuegos y dispositivos cortafuegos**
  - AWS Web Application Firewall (WAF), Barracuda WAF, pfSense, Checkpoint, Sophos y FortiNet.
- **Ejemplos de servicios de red en la nube (VPC, Gateways, NAT y WAN)**
  - AWS VPC, Direct Connect, PrivateLink, AWS NAT Gateway, Azure Basition y Virtual WAN.
- **Ejemplos de equilibradores de carga**
  - AWS ELB, ALB, NLB (versiones GCP y Azure), F5 y NGINX.
- **Ejemplos de gestión de repositorios de artefactos**
  - [JFrog Artifactory][4], Archiva y Sonatype Nexus
- **Ejemplos de servicios de identidad y de herramientas**
  - Logs de actividades de usuarios de Cisco ISE, Okta, OneLogin y Workday.
- **Ejemplos de logs de auditorías**
  - Logs de auditorías de proveedores en la nube Logs (por ejemplo, CloudTrail), auditorías de Kubernetes y auditorías de Microsoft 365.
- **Ejemplos de dispositivos de red físicos**
  - Cisco, Meraki, Juniper, Arbua, HPE, Palo Alto y Barracuda.
- **Ejemplos de logs de flujo de red**
  - Cisco NetFlow, IPFIX, sFlow y AWS VPC FlowLogs.
- **Ejemplos de servicios VPN**
  - AWSGCP y Azure VPN, Tailscale, Twingate, OpenVPN, ZeroTier y WireGuard.
- **Ejemplos de servicios CI/CD y de herramientas**
  - GitLab, GitHub Actions, ArgoCD, Jenkins, CircleCI, TeamCity y AWS CodePipeline.
- **Ejemplos de mallas de servicios**
  - Anthos, Istio, proxyv2, consul, Linkerd y Kong.
- **Ejemplos de caché**
  - Varnish, Memcached y Redis.

Puedes utilizar el espectro de tipos de logs que se muestran en la siguiente imagen para determinar cuándo utilizar el nivel Flex para logs. Todos los orígenes de logs de gran volumen, acceso poco frecuente y conservación a largo plazo son buenos candidatos, y esto incluye la ampliación del nivel estándar para los logs (por ejemplo, logs de aplicaciones) también al nivel Flex.

{{< img src="logs/log_configuration/flex_logging/logs-spectrum.png" alt="Gráfico del espectro de indexado y frecuencia de acceso de logs" style="width:100%;" >}}


## Leer más

{{< partial name="whats-next/whats-next.html" >}}


[1]: /es/logs/log_configuration/indexes/#indexes-filters
[2]: https://app.datadoghq.com/logs/pipelines/indexes
[3]: https://app.datadoghq.com/logs
[4]: https://jfrog.com/help/r/jfrog-platform-administration-documentation/monitoring-and-logging