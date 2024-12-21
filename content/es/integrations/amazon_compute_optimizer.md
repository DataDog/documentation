---
aliases:
- /es/integrations/aws-compute-optimizer
- /es/integrations/aco
categories:
- nube
- aws
custom_kind: integración
dependencies: []
description: Proporciona recomendaciones de configuración de recursos para ayudar
  a los usuarios a dimensionar de manera correcta sus cargas de trabajo.
doc_link: https://docs.datadoghq.com/integrations/amazon_compute_optimizer/
draft: false
git_integration_title: amazon_compute_optimizer
has_logo: true
integration_id: amazon-compute-optimizer
integration_title: AWS Compute Optimizer
integration_version: ''
is_public: true
manifest_version: '1.0'
name: amazon_compute_optimizer
public_title: Datadog con AWS Compute Optimizer
short_description: Proporciona recomendaciones de configuración de recursos para ayudar
  a los usuarios a dimensionar de manera correcta sus cargas de trabajo.
version: '1.0'
---

<!--  FUENTE https://github.com/DataDog/dogweb -->
## Información general

AWS Compute Optimizer es un servicio web que proporciona recomendaciones de configuración de recursos para ayudar a los usuarios a dimensionar de manera correcta sus cargas de trabajo.

Esta integración te permite obtener mejores recomendaciones de tipos de instancias de EC2 en AWS Compute Optimizer mediante datos de utilización de memoria del Datadog Agent. Para obtener más información sobre Compute Optimizer, lee [¿Qué es AWS Compute Optimizer?][1] en la documentación de AWS.

## Configuración

### Instalación

#### AWS
1. En la consola de AWS Compute Optimizer, dirígete a la página de **Cuentas** y configura tus preferencias a nivel de cuenta para la ingesta de métricas externas en `Datadog`.
2. Repite el paso n.° 1 para cada cuenta de AWS para la que quieras obtener recomendaciones mejoradas.

#### Datadog
3. Si aún no lo has hecho, primero configura la [integración de Amazon Web Services][2] para cada cuenta de AWS que quieras.
4. Instala el [Datadog Agent][3] en cualquier instancia de EC2 para incluirlo en las recomendaciones mejoradas de Compute Optimizer.
5. Instala la [integración de Datadog con AWS Compute Optimizer][4].

Una vez que se hayan completado todos los pasos, las recomendaciones de AWS Compute Optimizer pueden tardar **hasta 30 horas** en usar los datos de utilización de memoria de Datadog.

#### Validación
Confirma que se hace referencia a Datadog como `External metrics source` (Fuente de métricas externas) en la tabla de recomendaciones para instancias de EC2:

{{< img src="integrations/amazon_compute_optimizer/compute_optimizer.png" alt="El dashboard de AWS para las recomendaciones de Compute Optimizer con tres instancias enumeradas y un enlace de Datadog debajo de la columna de fuente de métricas externas para cada instancia" popup="true">}}

## Funcionamiento

Para todas las instancias de EC2 monitorizadas tanto por la [integración de AWS de Datadog][2] como por el [Datadog Agent][3], Datadog envía datos de utilización de memoria desde el Agent a AWS Compute Optimizer a fin de brindar recomendaciones de instancias mejoradas que potencialmente pueden generar ahorros de costes.

**Nota:** Las métricas de utilización de memoria de Datadog se integran directamente con el servicio de AWS Compute Optimizer y no con tu cuenta de AWS. No se necesitan permisos de IAM adicionales para esta integración, ya que Datadog no interactúa directamente con tu cuenta de AWS.


## Datos recopilados

### Métricas

La integración de AWS Compute Optimizer no incluye métricas.

### Eventos

La integración de AWS Compute Optimizer no incluye eventos.

### Checks de servicio

La integración de AWS Compute Optimizer no incluye checks de servicio.

## Resolución de problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog][5].

[1]: https://docs.aws.amazon.com/compute-optimizer/latest/ug/what-is-compute-optimizer.html
[2]: https://docs.datadoghq.com/es/integrations/amazon_web_services/
[3]: https://docs.datadoghq.com/es/agent/
[4]: https://app.datadoghq.com/integrations/amazon-compute-optimizer/
[5]: https://docs.datadoghq.com/es/help/