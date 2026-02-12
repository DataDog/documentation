---
aliases:
- /es/logs/log_configuration/flex_log/
description: Capacidades de consulta en directo rentables para la conservación de
  logs a largo plazo
further_reading:
- link: https://www.datadoghq.com/blog/flex-logging
  tag: Blog
  text: Almacenamiento y análisis de grandes volúmenes de logs de forma eficaz con
    Flex Logs
- link: https://www.datadoghq.com/blog/monitor-dns-logs-for-network-and-security-datadog/
  tag: Blog
  text: Monitorización de logs DNS para la red y los análisis de seguridad
- link: /logs/log_configuration/indexes
  tag: Documentación
  text: Índices de logs
- link: /logs/log_configuration/archives
  tag: Documentación
  text: Archivos de logs
- link: /logs/guide/reduce_data_transfer_fees
  tag: Documentation
  text: Cómo enviar logs a Datadog y reducir al mismo tiempo los costes de transferencia
    de datos
title: Flex Logs
---

## Información general

A medida que tu organización crece, también lo hace el volumen de logs recopilado de tu infraestructura y tus aplicaciones. Los casos de uso de logs también aumentan en complejidad. Por ejemplo, puede que estés recopilando logs de tu infraestructura, tus aplicaciones, tus herramientas de seguridad, tu red, y así sucesivamente. Todos estos casos de uso tienen distintas necesidades de conservación y consulta.

Con Flex Logs, sus equipos pueden determinar la capacidad de consulta que necesitan para satisfacer su caso de uso, ya sea un incidente en el que el tiempo es un factor crítico, una investigación de seguridad o una auditoría de conformidad. Al desvincular el almacenamiento de los costes informáticos, Flex Logs proporciona una conservación rentable y a largo plazo de tus logs.

Algunos ejemplos de uso del almacenamiento Flex son

- Conservación de logs para auditorías a largo plazo.
- Conservación de logs por motivos legales y de cumplimiento normativo.
- Necesidad de disponer de todos los logs para investigaciones de seguridad.
- Necesidad de consultar logs para informes y análisis de datos de elevada cardinalidad durante largos periodos de tiempo.

## Cuándo utilizar Flex Logs

Datadog Log Management ofrece las siguientes soluciones:

- Indexación estándar de logs que deben consultarse con frecuencia y conservarse a corto plazo, como los logs de aplicaciones.
- Flex Logs para logs que deben conservarse a largo plazo, pero que a veces deben consultarse con urgencia, como los logs de seguridad, de transacciones y de red.
- Archivado de los logs que se consultan con poca frecuencia y deben almacenarse a largo plazo, como los logs de auditoría y configuración.

Utiliza el espectro de tipos de logs que se muestra en la siguiente imagen para determinar cuándo utilizar el nivel Flex Logs. Cualquier fuente de logs de gran volumen, de acceso poco frecuente o de conservación a largo plazo es una buena candidata. También puedes conservar primero logs en Standard Indexing y luego ampliarlos utilizando Flex Logs. Esta es una solución perfecta para los logs de aplicaciones que necesitas conservar durante más tiempo. Para obtener más información, consulta las [fuentes potenciales para enviar directamente al nivel Flex Logs](#potential-sources-for-sending-directly-to-flex-logs).

{{< img src="logs/log_configuration/flex_logging/logs-spectrum.png" alt="Gráfico del espectro de indexado y la frecuencia de acceso de logs" style="width:100%;" >}}

**Notas**:
- Los monitores no son compatibles con Flex Logs.
- Watchdog no es compatible con Flex Logs.
- Los dashboards son compatibles con Flex Logs, pero asegúrate de tener en cuenta estas consultas de dashboard cuando elijas el tamaño del cálculo.

## Tamaños de cálculos

El cálculo es la capacidad de consulta para ejecutar consultas para Flex Logs. Se utiliza cuando se consultan logs en el nivel Flex Logs. No se utiliza para la ingesta ni cuando sólo se realizan búsquedas en logs de Standard Indexing. Los niveles de cálculo disponibles son:

<div class="alert alert-danger">Los tamaños de cálculos disponibles para US3, US5, AP1, US1-FED son Starter, XS y S.</div>

- Starter
- Extra pequeño (XS)
- Pequeño (S)
- Medio (M)
- Grande (L)

Cada nivel de cálculo duplica aproximadamente el rendimiento y la capacidad de consulta del nivel anterior. El tamaño del cálculo está limitado por la CPU, el número de consultas simultáneas y el número máximo de logs que se pueden analizar por consulta.

### Determinar el tamaño de cálculo que necesitas

El rendimiento de consulta de un nivel de cálculo depende de varios factores:

- Volumen: La cantidad de datos almacenados en el nivel Flex.
- Periodo de tiempo: El periodo de tiempo de la consulta, por ejemplo un periodo de 15 minutos comparado un periodo de 1 mes de logs.
- Complejidad: El tipo de consulta que ejecutas, por ejemplo, si realiza varios niveles de agregación, si utiliza varios filtros, etc.
- Concurrencia: El número de usuarios que consultan simultáneamente Flex Logs.

Ten en cuenta los siguientes factores a la hora de decidirte por un nivel de cálculo:

- Tu volumen diario de logs y el número de logs almacenados en el nivel Flex.
- El número de usuarios que consultan regularmente logs del nivel Flex.
- La frecuencia y los tipos de consultas que realizas. Por ejemplo, el periodo de tiempo de consulta que sueles utilizar para consultar tus logs.

El número de logs almacenados en el nivel Flex es el que más influye en el tamaño que necesitas para consultar los datos de forma eficaz. Datadog recomienda los siguientes tamaños de cálculo basados en el volumen de los logs:
| Tamaño                                     | Volumen (eventos almacenados)   |
| ----------------------------------------- | --------------------------- |
| Starter                                                  | < 10 mil millones            |
| Extra pequeño (XS)                                    | 10 a 50 mil millones         |
| Pequeño (S)                                            | 50 a 200 mil millones      |  
| Mediano (M)                                            | 200 a 500 mil millones     |
| Grande (L)                                              | 500 mil millones a 1 billón  |
| Ponte en contacto con tu [asesor de clientes][7]| 1T+ |                               |

Los niveles de cálculo escalables (XS, S, M, L) se facturan a una tarifa fija. El nivel Starter de Flex Logs se factura a una tarifa combinada de almacenamiento+cálculo. Consulte la [página de precios][6] para obtener más información.

## Activar y desactivar Flex Logs

Puedes activar o desactivar Flex Logs a nivel de la organización. Para ello, debes disponer del permiso `flex_logs_config_write`.

Si Flex Logs está incluido en tu contrato, las opciones de cálculo disponibles en tu contrato se muestran en la interfaz de usuario.

Si Flex Logs no está incluido en tu contrato, puedes activar el nivel Starter de Flex Logs a través de la opción de incorporación por autoservicio.

Para activar Flex Logs:
1. Ve a la página de [control de Flex Logs][5].
1. Selecciona **Tipo de cálculo**.
    - Datadog recomienda el tamaño de cálculo **Starter ** para organizaciones con menos de 10B de logs almacenados.
    - Datadog recomienda las opciones de cálculo escalable (por ejemplo, XS, S, M y L) para organizaciones con más de 10B (o 2 a 3B al mes) de logs almacenados.
1. Selecciona el tamaño de cálculo deseado. Para obtener más información, consulta [Determinar el tamaño de cálculo que necesitas](#determine-the-compute-size-that-you-need).
1. Haz clic en **Enable Flex Logs** (Activar Flex Logs).

### Offboard de Flex Logs por autoservicio

Para desactivar Flex Logs:

1. Elimina Flex Storage de cada índice en el que esté activado Flex Logs.
1. Vuelve a la página de [control de Flex Logs][5].
1. Haz clic en el icono de engranaje y selecciona **Disable Flex Logs** (Desactivar Flex Logs).

## Aumentar y reducir los tañamos de cálculo en Flex Logs 

Si seleccionas una de las opciones de cálculo escalable para Flex Logs (por ejemplo, XS, S, M o L), puedes aumentar o reducir el tamaño de tu cálculo en la página de [control de Flex Logs][5].

**Notas**:
- Sólo están disponibles las opciones de cálculo de tu contrato. 
- Una instancia de cálculo puede actualizarse en cualquier momento.
- Una instancia de cálculo puede reducirse una vez cada 15 días.

## Configurar niveles de almacenamiento

Flex Logs se configura dentro de las configuraciones de índice de logs. Los [filtros de índice][1] que se aplican a ese índice también se aplican a Flex Logs. Con el nivel Starter de Flex Logs, puedes almacenar logs durante 6, 12 o 15 meses. Con una opción de cálculo escalable, puedes almacenar logs durante 30 a 450 días. 

Configura el nivel Flex en la página [Configuración de índices de logs][2]:

1. Ve a la página [Índices][2].
2. Edita el índice que quieres activar con Flex Logs o crea un nuevo índice.
3. Selecciona **Flex Tier** (Nivel Flex) y configura la opción de conservación en *Configure Storage Tier and Retention* (Configurar el nivel de almacenamiento y la opción de conservación).

{{< img src="logs/log_configuration/flex_logging/flex_configuration.png" alt="Opciones de almacenamiento de nivel Flex en la configuración de índices" style="width:100%;" >}}

**Nota**: Si se seleccionan ambos niveles, los logs se almacenan en el nivel Estándar hasta el final del período de conservación configurado, antes de almacenarse en el nivel Flex. Por ejemplo, si seleccionas el nivel Estándar con una conservación de 3 días y el nivel Flex con una conservación de 90 días, los logs en ese índice se almacenan primero en el el nivel Estándar durante 3 días y luego en el nivel Flex durante los 87 días restantes.

La siguiente tabla explica el impacto de añadir o eliminar diferentes niveles de almacenamiento en un índice.

<table>
  <tr align="center">
    <td colspan="2"><strong>Configuración de índices existente</strong></td>
    <td rowspan="2"><strong>Acción</strong></td>
    <td rowspan="2"><strong>Resultado</strong></td>
  </tr>
<tr align="center">
  <td><strong>Nivel Estándar</strong></td>
  <td><strong>Nivel Flex</strong></td>
</tr>
<tr>
  <td align="center">Activado</td>
  <td align="center">Desactivado</td>
  <td>Activar nivel Flex.</td>
  <td>Se extiende el periodo de conservación de logs preexistentes y nuevos.</td>
</tr>
<tr>
  <td align="center">Desactivado</td>
  <td align="center">Activado</td>
  <td>Activar nivel Estándar.</td>
  <td>Los logs preexistentes en el nivel Flex no cambian. Se conservan los nuevos logs de los niveles Estándar y Flex.</td>
</tr>
<tr>
  <td align="center">Activado</td>
  <td align="center">Desactivado</td>
  <td>Activar el nivel Flex y eliminar el nivel Estándar.</td>
  <td>Los logs ya no pueden consultarse en monitores o en Watchdog Insights.</td>
</tr>
</table>

## Buscar logs del nivel Flex

{{< img src="logs/log_configuration/flex_logging/flex_toggle_explorer.png" alt="Habilitar la generación de logs Flexen la página del Explorador de logs activando la opción correspondiente" style="width:100%;" >}}

En el Explorador de logs, activa la opción **Incluir Flex Logs** para incluir logs del nivel Flex en los resultados de tu consulta de búsqueda. Encuentra esta opción junto al selector de tiempo.

[Realiza tu búsqueda][3] escribiendo las consultas en la barra de búsqueda o seleccionando la faceta correspondiente en el panel de facetas.

Puedes añadir consultas de logs Flex a dashboards, pero asegúrate de tener en cuenta estas consultas de dashboard cuando elijas el tamaño del cálculo.

**Nota**: Las consultas de monitor no son compatibles con Flex Logs.

## Información adicional

### Posibles fuentes para enviar directamente a Flex Logs

La siguiente lista es un ejemplo de fuentes de logs que son buenas candidatas para enviar logs directamente al nivel Flex, sin almacenarlos primero en Standard Indexing. No se trata de una lista exhaustiva, sino un ejemplo para que tengas una idea de los tipos de logs adecuados para esta configuración. Otras fuentes de logs (por ejemplo, logs de aplicación) pueden enviarse al nivel Flex después de pasar primero por Standard Indexing, para casos de resolución de problemas, alertas y depuración en directo. Tus casos de uso para estas fuentes podrían variar, algo que es importante tener en cuenta a la hora de tomar la decisión de omitir Standard Indexing.

**Nota**: Estos ejemplos son una muestra para cada categoría. Hay muchas más categorías, servicios, herramientas y tecnologías que puedes enviar directamente al nivel Flex.

| Tecnología            | Ejemplos                                                                                   |
|-----------------------|--------------------------------------------------------------------------------------------|
| Gestión de artefactos   | JFrog Artifactory, Archiva, Sonatype Nexus                                                 |
| Logs de auditoría            | Logs de auditoría Amazon Cloudtrail, Kubernetes, auditoría Microsoft 365                              |
| Servicios CDN          | Akamai, Cloudflare, Fastly, CloudFront                                                     |
| Servicios CI/CD        | GitLab, GitHub Actions, Argo CD, Jenkins, CircleCI, TeamCity                                |
| Servicios DNS          | Route53, Cloudflare, Akamai (Edge), NS1                                                    |
| Servicios de identidad     | Cisco ISE, Okta, OneLogin, Workday User Activity Logs                                      |
| Balanceadores de carga         | AWS ELB, ALB, NLB (opciones GCP and Azure), F5, NGINX                                       |
| Dispositivos de red    | Cisco, Meraki, Juniper, Arbua, HPE, Palo Alto, Barracuda                                   |
| Servicios de red      | WAF, Amazon VPC Flow Logs, AWS ELB, pfSense, Tailscale                                     |
| Mallas de servicios        | Anthos, Istio, proxyv2, consul, Linkerd, Kong                                              |

### Flex Logs para cuentas de varias organizaciones

Para cada organización en la que quieras Flex Logs, debes habilitar un tamaño de cálculo por organización. Sólo se puede utilizar un cálculo por organización y los tamaños de cálculo no se pueden compartir entre organizaciones. En una organización no se pueden utilizar simultáneamente el cálculo Starter y el escalable.

Datadog suele recomendar los tamaños de cálculo escalables de Flex Logs (XS, S, M y L) para organizaciones con grandes volúmenes de logs. En una configuración de varias organizaciones, suele haber muchas organizaciones con volúmenes de logs inferiores, por lo que para estas organizaciones, Datadog recomienda el tamaño de cálculo Starter de Flex Logs.

### Cuando se alcanza el límite de cálculo

Cuando tu organización alcanza el límite de cálculo en términos de consultas concurrentes, puedes experimentar consultas más lentas, ya que las consultas continúan reintentándose hasta que la capacidad esté disponible. Si una consulta se reintenta varias veces, es posible que no se ejecute. En tales situaciones, aparece un mensaje de error que indica que la capacidad de cálculo de Flex Logs es limitada y que debes ponerte en contacto con tu administrador.

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/logs/log_configuration/indexes/#indexes-filters
[2]: https://app.datadoghq.com/logs/pipelines/indexes
[3]: https://app.datadoghq.com/logs
[4]: https://jfrog.com/help/r/jfrog-platform-administration-documentation/monitoring-and-logging
[5]: https://app.datadoghq.com/logs/pipelines/flex-logs-controls
[6]: https://www.datadoghq.com/pricing/?product=log-management#products
[7]: mailto:success@datadoghq.com