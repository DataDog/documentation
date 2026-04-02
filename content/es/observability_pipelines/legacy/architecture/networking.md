---
aliases:
- /es/observability_pipelines/architecture/networking/
title: (LEGACY) Trabajo en red
---

{{< site-region region="gov" >}}
<div class="alert alert-danger">Observability Pipelines no está disponible en el sitio US1-FED de Datadog.</div>
{{< /site-region >}}

<div class="alert alert-info">
Esta guía es para despliegues a nivel de producción a gran escala.
</div>

## Topología de red

### Límites de red

La mayoría de los usuarios tienen complejos entornos de producción con muchos límites de red, incluyendo diferentes nubes, regiones, VPC y clústeres. Puede resultar complicado determinar dónde encaja el Worker de Observability Pipelines dentro de esos límites. Por lo tanto, Datadog recomienda comenzar con un agregador de Workers de Observability Pipelines por región, incluso si tienes diferentes cuentas, VPC y clústeres. Este límite es la granularidad de red más amplia que evita el envío de datos a través de la Internet pública. Si tienes diferentes clústeres, despliega el Worker de Observability Pipelines en tu clúster de utilidades o herramientas, o elige un clúster que sea más apropiado para servicios compartidos.

{{< img src="observability_pipelines/production_deployment_overview/multi-cluster.png" alt="Diagrama que muestra una región en la nube con datos enviados desde dos clústeres con varios agentes a un clúster de utilidades y herramientas con balanceadores de carga de red y un agregador con varios Workers de Observability Pipelines" style="width:75%;" >}}

A medida que aumenta el uso de Workers de Observability Pipelines, puede quedar claro dónde encajan los despliegues múltiples de Workers de Observability Pipelines.

Para obtener más información sobre despliegues múltiples, consulta [Configuraciones avanzadas][1].

### Detección de DNS y de servicios

Es posible que tu organización haya adoptado alguna forma de servicio de detección, aunque esta se proporcione a través de un DNS básico. La detección de tus agregadores y servicios del Worker de Observability Pipelines debería resolverse a través de tu mecanismo de detección de servicios.

{{< img src="observability_pipelines/production_deployment_overview/dns_service_discovery.png" alt="Diagrama que muestra una región en la nube con un clúster de agentes, un clúster de balanceadores de carga y el agregado de Workers de Observability Pipelines, donde cada grupo envía consultas separadas al registro del DNS o del servicio" style="width:60%;" >}}

La detección de servicios te permite configurar tus agentes con nombres de host nombrados (no direcciones IP estáticas), lo que facilita el enrutamiento y el balanceo de carga de tu tráfico. Así es como tus agentes detectan tus balanceadores de carga y estos detectan tus agregadores de Workers de Observability Pipelines.

El Worker de Observability Pipelines no resuelve por sí mismo las consultas DNS y delega esta tarea en un resolvedor a nivel de sistema (por ejemplo, [resolución Linux][2]).

## Tráfico de red

### Proxies

El Worker de Observability Pipelines ofrece una opción de proxy global para enrutar todo el tráfico HTTP saliente a través de un proxy. El uso del proxy depende de las preferencias de seguridad y de red de tu organización.

### Puertos

El Worker de Observability Pipelines requiere que todos los puertos estén explícitamente configurados para facilitar su detección por parte de los administradores de la red. Por ello, al observar el archivo de configuración del Worker de Observability Pipelines, obtendrás un inventario completo de todos los puertos expuestos. El agregador de Workers de Observability Pipelines se entrega con una configuración por defecto que expone los siguientes puertos:

| Puerto | Source         | Protocolo  | Dirección| Descripción                            |
| ---  | -------------- | ----------| -------- | ---------------------------------------|
| 8282 | Datadog Agent  | HTTP      | Entrante | Acepta datos de la fuente Fluent.   |
| 123  | Archivos          | Syslog    | Entrante | Acepta datos de la fuente Syslog.   |

Asegúrate de revisar la configuración de tu Worker de Observability Pipelines para conocer los puertos exactos expuestos, ya que tu administrador podría haberlos cambiado.

### Protocolos

El Worker de Observability Pipelines está diseñado para recibir y enviar datos a través de una variedad de protocolos. Datadog recomienda utilizar el protocolo más compatible con tu organización. Cuando sea posible, elige protocolos basados en HTTP, debido a sus confirmaciones de entrega a nivel de aplicación y su soporte ubicuo en todas las plataformas. De lo contrario, elige protocolos basados en TCP. No se recomienda UDP, ya que existe el riesgo de perder datos. 

#### Comunicación entre Workers

Utiliza la fuente y el sumidero del Worker de Observability Pipelines para enviar datos entre instancias del Worker de Observability Pipelines (por ejemplo, con la arquitectura unificada). Estas fuentes utilizan el protocolo GRPC para una comunicación eficiente sin pérdidas.

#### Comunicación con agentes

El Worker de Observability Pipelines proporciona fuentes específicas para muchos agentes. Por ejemplo, la fuente `datadog_agent` se encarga de recibir todos los tipos de datos del Datadog Agent en un formato estructurado sin pérdidas.

### Compresión

La compresión puede suponer una reducción en el rendimiento del 50%, según los criterios de Datadog. Utiliza la compresión con precaución y monitoriza el rendimiento después de activarla.

La compresión del tráfico de red sólo debe utilizarse para escenarios de salida que puedan modificar los costes debido a su impacto en el rendimiento (por ejemplo, el envío de datos a través de la Internet pública). Por lo tanto, la compresión no se recomienda para el tráfico interno de red.

[1]: /es/observability_pipelines/legacy/architecture/advanced_configurations
[2]: https://wiki.archlinux.org/title/Domain_name_resolution