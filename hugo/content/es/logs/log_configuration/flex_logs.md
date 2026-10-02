---
aliases:
- /es/logs/log_configuration/flex_log/
description: Capacidades de consulta en vivo rentables sobre la retención a largo
  plazo de registros
further_reading:
- link: https://www.datadoghq.com/blog/flex-logging
  tag: Blog
  text: Almacene y analice registros de gran volumen de manera eficiente con Flex
    Logs
- link: https://www.datadoghq.com/blog/monitor-dns-logs-for-network-and-security-datadog/
  tag: Blog
  text: Haga un seguimiento de los registros DNS para análisis de red y seguridad
- link: https://www.datadoghq.com/blog/cloud-siem-flex-logs/
  tag: Blog
  text: 'Cloud SIEM y Flex Logs: información de seguridad mejorada para la nube'
- link: /logs/guide/flex_compute
  tag: Documentación
  text: Haga un seguimiento del uso de Flex Compute
- link: /logs/log_configuration/indexes
  tag: Documentación
  text: Índices de registros
- link: /logs/log_configuration/archives
  tag: Documentación
  text: Archivos de registros
- link: /logs/guide/reduce_data_transfer_fees
  tag: Documentación
  text: Cómo enviar registros a Datadog mientras reduce las tarifas de transferencia
    de datos
- link: https://www.datadoghq.com/blog/optimize-high-volume-logs/
  tag: blog
  text: Cómo optimizar datos de registro de alto volumen sin comprometer la visibilidad
- link: https://www.datadoghq.com/blog/monitor-flex-compute-usage/
  tag: Blog
  text: Haga un seguimiento y optimice el uso de cómputo de sus Flex Logs
- link: https://www.datadoghq.com/blog/flex-logs/
  tag: Blog
  text: Almacene y analice registros de gran volumen de manera eficiente con Flex
    Logs
- link: https://learn.datadoghq.com/courses/log-indexes
  tag: Centro de aprendizaje
  text: Administrar y hacer un seguimiento de volúmenes de logs indexados
title: Flex Logs
---
## Descripción general {#overview}

A medida que su organización crece, el volumen de registros recopilados de su infraestructura y aplicaciones aumenta junto con ella. Los casos de uso para sus registros también aumentan en complejidad. Por ejemplo, es posible que esté recopilando registros de su infraestructura, aplicaciones, herramientas de seguridad, red, etcétera. Todos estos casos de uso tienen necesidades variables de retención y consulta.

Con Flex Logs, sus equipos pueden determinar la capacidad de consulta que necesitan para cumplir con su caso de uso, ya sea un incidente crítico en cuanto al tiempo, una investigación de seguridad o una auditoría de cumplimiento. Al desacoplar el almacenamiento de los costos de cómputo, Flex Logs proporciona una retención rentable y a largo plazo de sus registros.

Algunos ejemplos de casos de uso para el almacenamiento Flex incluyen:

- Retención de registros para auditorías a largo plazo.
- Retención de registros por motivos de cumplimiento y legales.
- Necesidad de todos los registros para investigaciones de seguridad.
- Necesidad de consultar registros para informes y análisis de datos de alta cardinalidad durante largos períodos de tiempo.

## Cuándo usar Flex Logs {#when-to-use-flex-logs}

Datadog Log Management ofrece las siguientes soluciones:

- Indexación Estándar para registros que necesitan consultarse con frecuencia y retenerse a corto plazo, como los registros de aplicaciones.
- Flex Logs para registros que necesitan retenerse a largo plazo, pero que a veces requieren consultas urgentes, como registros de seguridad, transacciones y red.
- Archivado para registros que se consultan con poca frecuencia y necesitan almacenarse a largo plazo, como registros de auditoría y configuración.

Utilice el espectro de tipos de registros que se muestra en la imagen a continuación para determinar cuándo usar el nivel Flex Logs. Cualquier fuente de registros de alto volumen, acceso poco frecuente o retención a largo plazo es una buena candidata. También puede retener registros en Indexación Estándar primero y luego extenderlos usando Flex Logs; esta es una solución perfecta para registros de aplicaciones que necesita retener por más tiempo. Consulte [Fuentes potenciales para enviar directamente al nivel Flex Logs](#potential-sources-for-sending-directly-to-flex-logs) para obtener más información.

{{< img src="logs/log_configuration/flex_logging/logs-spectrum.png" alt="Gráfico del espectro de indexación y frecuencia de acceso a registros" style="width:100%;" >}}

**Notas**:
- Los monitores no son compatibles con Flex Logs.
- Watchdog no es compatible con Flex Logs.
- Los tableros son compatibles con Flex Logs; sin embargo, asegúrese de considerar estas consultas de tablero al elegir su tamaño de cómputo.

## Tamaños de cómputo {#compute-sizes}

El cómputo es la capacidad de consulta para ejecutar consultas en Flex Logs. Se utiliza al consultar registros en el nivel de Flex Logs. No se utiliza para la ingesta ni cuando solo se buscan registros de Indexación Estándar. Los niveles de cómputo disponibles son:

<div class="alert alert-danger">Los tamaños de cómputo disponibles para US3, US5, AP1, AP2, US1-FED y US2-FED son Starter, XS y S.</div>

- Starter
- Extra pequeño (XS)
- Extra pequeño plus (XS+)
- Pequeño (S)
- Medium (M)
- Large (L)

Cada nivel de cómputo tiene aproximadamente el doble del rendimiento de consulta y la capacidad del nivel anterior. El tamaño de cómputo está limitado por la cantidad de consultas simultáneas y el límite máximo de cuántos registros se pueden escanear por consulta.

### Determine el tamaño de cómputo que necesita {#determine-the-compute-size-that-you-need}

El rendimiento de consulta de un nivel de cómputo depende de varios factores:

- Volumen: La cantidad de datos almacenados en el nivel Flex.
- Ventana de tiempo: El espacio temporal de la consulta, por ejemplo, una ventana de 15 minutos en comparación con una ventana de 1 mes de registros.
- Complejidad: El tipo de consulta que ejecuta, por ejemplo, si realiza múltiples niveles de agregación, utiliza múltiples filtros, etcétera.
- Concurrencia: La cantidad de usuarios que consultan Flex Logs de forma simultánea.

Considere los siguientes factores al decidir un nivel de cómputo:

- Su volumen diario de registros y la cantidad de registros almacenados en el nivel Flex.
- La cantidad de usuarios que consultan regularmente los registros del nivel Flex.
- La frecuencia y los tipos de consultas que ejecuta. Por ejemplo, las ventanas de tiempo de consulta que utiliza habitualmente para consultar sus registros.

La cantidad de registros almacenados en el nivel Flex tiene el mayor impacto en el tamaño necesario para consultar los datos de manera eficiente. Datadog recomienda los siguientes tamaños de cómputo según el volumen de registros:
| Tamaño                                      | Volumen (eventos acumulados almacenados)   |
| ----------------------------------------- | ------------------------ |
| Starter                                   | < 10 mil millones             |
| Extra Small (XS)                          | 10 - 50 mil millones          |
| Extra Small Plus (XS+)                    | 50 - 100 mil millones          |
| Small (S)                                 | 100 - 200 mil millones         |
| Medium (M)                                | 200 - 500 mil millones        |
| Large (L)                                 | 500 mil millones - 1 billón |
| Comuníquese con su [Gerente de éxito del cliente][7]| 1T+                      |

Los niveles de cómputo escalables (XS, XS+, S, M, L) se facturan a una tarifa plana. Flex Logs Starter se factura a una tarifa combinada de almacenamiento y cómputo. Consulte la [página de precios][6] para obtener más información.

## Habilitar y deshabilitar Flex Logs {#enable-and-disable-flex-logs}

Puede habilitar o deshabilitar Flex Logs a nivel de organización. Debe tener el permiso [`flex_logs_config_write`][8].

Si Flex Logs es parte de su contrato, las opciones de cómputo disponibles en su contrato se muestran en la interfaz de usuario.

Si Flex Logs no está en su contrato, puede habilitar Flex Logs Starter a través de la opción de incorporación de autoservicio.

Para habilitar Flex Logs:
1. Navegue a la página [Flex Logs Control][5].
1. Seleccione {{< ui >}}Compute Type{{< /ui >}}.
    - Datadog recomienda el tamaño de cómputo {{< ui >}}Starter{{< /ui >}} para organizaciones con menos de 10B de registros almacenados.
    - Datadog recomienda las opciones de cómputo escalable (por ejemplo, XS, XS+, S, M y L) para organizaciones con más de 10B (o 2-3B por mes) de registros almacenados.
1. Seleccione el tamaño de cómputo que desee. Consulte [Determine el tamaño de cómputo que necesita](#determine-the-compute-size-that-you-need) para obtener más información.
1. Haga clic en {{< ui >}}Enable Flex Logs{{< /ui >}}.

### Desactivar Flex Logs de autoservicio {#offboard-from-self-serve-flex-logs}

Para deshabilitar Flex Logs:

1. Elimine Flex Storage de cada índice donde Flex Logs esté habilitado.
1. Regrese a la página [Flex Logs Control][5].
1. Haga clic en el icono de engranaje y seleccione {{< ui >}}Disable Flex Logs{{< /ui >}}.

## Actualizar y degradar el cómputo de Flex Logs {#upgrade-and-downgrade-flex-logs-compute}

Si selecciona una de las opciones de cómputo escalable para Flex Logs (por ejemplo, XS, XS+, S, M o L), puede actualizar o degradar su tamaño de cómputo en la página [Flex Logs Control][5].

**Notas**:
- Solo se ponen a disposición las opciones de cómputo incluidas en su contrato. La actualización de Flex Starter a una opción de cómputo escalable no aplica el cambio automáticamente. Para habilitar el nuevo tamaño, vaya a la página [Flex Logs Controls][5], seleccione la opción de cómputo deseada y luego haga clic en {{< ui >}}Save{{< /ui >}}.
- Una instancia de cómputo se puede actualizar en cualquier momento.
- Una instancia de cómputo se puede degradar una vez cada 15 días.

## Configurar niveles de almacenamiento {#configure-storage-tiers}

Flex Logs se configura dentro de las configuraciones de índice de registros. Los [filtros de índice][1] que se aplican a ese índice también se aplican a Flex Logs. Con Flex Logs Starter, puede almacenar registros durante 3, 6, 12 o 15 meses. Con una opción de cómputo escalable, puede almacenar registros durante 30-450 días. 

Configure el nivel Flex en la página [Flex Logs Controls][5]:

1. Haga clic en [Indexes Configuration][2].
2. Edite el índice que desea habilitar con Flex Logs o cree un índice nuevo.
3. Seleccione {{< ui >}}Flex Tier{{< /ui >}} y establezca la retención en {{< ui >}}Configure Storage Tier and Retention{{< /ui >}}.

{{< img src="logs/log_configuration/flex_logging/flex_configuration.png" alt="Opciones para el almacenamiento del nivel Flex dentro de la configuración del índice" style="width:100%;" >}}

**Nota**: Si se seleccionan ambos niveles, los registros se almacenan en el Nivel estándar hasta el final del período de retención configurado, antes de almacenarse en el Nivel Flex. Por ejemplo, si selecciona el Nivel estándar con una retención de 3 días y el Nivel Flex con una retención de 90 días: los registros en ese índice se almacenan primero en el Nivel estándar durante 3 días y luego se almacenan en el Nivel Flex durante los 87 días restantes.

La siguiente tabla explica el impacto de agregar o eliminar diferentes niveles de almacenamiento en un índice.

<table>
  <tr align="center">
    <td colspan="2"><strong>Configuración de índice existente</strong></td>
    <td rowspan="2"><strong>Acción</strong></td>
    <td rowspan="2"><strong>Resultado</strong></td>
  </tr>
<tr align="center">
  <td><strong>Nivel estándar</strong></td>
  <td><strong>Nivel Flex</strong></td>
</tr>
<tr>
  <td align="center">Habilitado</td>
  <td align="center">Deshabilitado</td>
  <td>Habilitar el nivel Flex.</td>
  <td>La retención tanto para los registros preexistentes como para los nuevos se extiende.</td>
</tr>
<tr>
  <td align="center">Deshabilitado</td>
  <td align="center">Habilitado</td>
  <td>Habilitar el nivel estándar.</td>
  <td>Los registros preexistentes en el nivel Flex no se modifican. Los registros nuevos se conservan en el Nivel estándar y en el Nivel Flex.</td>
</tr>
<tr>
  <td align="center">Habilitado</td>
  <td align="center">Deshabilitado</td>
  <td>Habilitar el nivel Flex y eliminar el Nivel estándar.</td>
  <td>Los registros ya no se pueden consultar en monitors ni en Watchdog Insights.</td>
</tr>
</table>

## Buscar en el nivel Flex Logs {#search-flex-logs-tier}

{{< img src="logs/log_configuration/flex_logging/flex_toggle_explorer.png" alt="Habilite Flex Logs en la página del Log Explorer activando la opción" style="width:100%;" >}}

En el Log Explorer, active la opción {{< ui >}}Include Flex Logs{{< /ui >}} para incluir los registros del Nivel Flex en los resultados de su consulta de búsqueda. Encuentre esta opción junto al selector de tiempo.

[Buscar][3] escribiendo consultas en la barra de búsqueda o seleccionando la faceta relevante en el panel de facetas.

Puede agregar consultas de Flex Logs a los paneles, pero asegúrese de considerar estas consultas de panel al elegir su tamaño de cómputo.

**Nota**: Las consultas de monitor no son compatibles con Flex Logs.

## Información adicional {#additional-information}

### Fuentes potenciales para enviar directamente a Flex Logs {#potential-sources-for-sending-directly-to-flex-logs}

La siguiente lista es un ejemplo de fuentes de registro que son buenas candidatas para enviar registros directamente al Nivel Flex, sin almacenarlos primero en la indexación estándar. Esta no es una lista exhaustiva y tiene como objetivo darle una idea sobre los tipos de registros que son adecuados para esta configuración. Otras fuentes de registro (por ejemplo, registros de aplicaciones) aún pueden enviarse al Nivel Flex después de pasar primero por la indexación estándar para casos de uso de solución de problemas en vivo, alertas y depuración. Sus casos de uso para estas fuentes podrían variar, lo cual es importante considerar al tomar la decisión de omitir la indexación estándar.

**Nota**: Estos ejemplos son una muestra para cada categoría. Hay muchas más categorías, servicios, herramientas y tecnologías que quizás desee enviar directamente al Nivel Flex.

| Tecnología            | Ejemplos                                                                                   |
|-----------------------|--------------------------------------------------------------------------------------------|
| Gestión de artefactos   | JFrog Artifactory, Archiva, Sonatype Nexus                                                 |
| Registros de auditoría            | Amazon Cloudtrail, registros de auditoría de Kubernetes, auditoría de Microsoft 365                              |
| Servicios CDN          | Akamai, Cloudflare, Fastly, CloudFront                                                     |
| Servicios CI/CD        | GitLab, GitHub Actions, Argo CD, Jenkins, CircleCI, TeamCity                                |
| Servicios DNS          | Route53, Cloudflare, Akamai (Edge), NS1                                                    |
| Servicios de identidad     | Cisco ISE, Okta, OneLogin, registros de actividad de usuario de Workday                                      |
| Balanceadores de carga         | AWS ELB, ALB, NLB (versiones de GCP y Azure), F5, NGINX                                       |
| Dispositivos de red    | Cisco, Meraki, Juniper, Arbua, HPE, Palo Alto, Barracuda                                   |
| Servicios de red      | WAF, Amazon VPC Flow Logs, AWS ELB, pfSense, Tailscale                                     |
| Mallas de servicios        | Anthos, Istio, proxyv2, consul, Linkerd, Kong                                              |

### Flex Logs para cuentas de múltiples organizaciones {#flex-logs-for-multiple-organization-accounts}

<div class="alert alert-danger">Cada organización solo puede usar un tamaño de cómputo a la vez. Los tamaños de cómputo no se pueden compartir entre organizaciones, y el cómputo starter y scalable no se pueden usar simultáneamente dentro de la misma organización.</div>

Para cada organización en la que desee usar Flex Logs, debe habilitar un tamaño de cómputo. Datadog recomienda los tamaños de cómputo scalable de Flex Logs (XS, XS+, S, M y L) para organizaciones con grandes volúmenes de registros. En una configuración de múltiples organizaciones, a menudo hay muchas organizaciones con volúmenes de registros más bajos, por lo que para estas organizaciones, Datadog recomienda el tamaño de cómputo Starter para Flex Logs.

### Cuando se alcanza el límite de cómputo {#when-the-compute-limit-is-reached}

Cuando su organización alcanza el límite de cómputo en términos de consultas simultáneas, es posible que experimente consultas más lentas porque las consultas siguen reintentándose hasta que haya capacidad disponible. Si una consulta se reintenta varias veces, es posible que no se ejecute. En tales situaciones, aparece un mensaje de error que indica que la capacidad de cómputo de Flex Logs está limitada y que debe comunicarse con su administrador.

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/logs/log_configuration/indexes/#indexes-filters
[2]: https://app.datadoghq.com/logs/pipelines/indexes
[3]: https://app.datadoghq.com/logs
[4]: https://jfrog.com/help/r/jfrog-platform-administration-documentation/monitoring-and-logging
[5]: https://app.datadoghq.com/logs/pipelines/flex-logs-controls
[6]: https://www.datadoghq.com/pricing/?product=log-management#products
[7]: mailto:success@datadoghq.com
[8]: https://docs.datadoghq.com/es/account_management/rbac/permissions/#log-management