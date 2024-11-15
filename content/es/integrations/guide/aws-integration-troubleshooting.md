---
description: Pasos para solucionar los problemas de la integración de AWS con Datadog
further_reading:
- link: https://docs.datadoghq.com/integrations/amazon_web_services/
  tag: Integración
  text: Integración de AWS
title: Solucionar los problemas de la integración de AWS
---

## Información general

Utiliza esta guía para solucionar problemas relacionados con la [integración de AWS][1] con Datadog.

## Errores de permisos de IAM

### Datadog no está autorizado para ejecutar sts:AssumeRole

El error de permiso `sts:Assumerole` indica un problema con la política de confianza asociada con `DatadogAWSIntegrationRole`. Consulta la documentación [Error: Datadog no está autorizado para ejecutar sts:AssumeRole][2] para conocer cómo puede resolver este problema.

**Nota**: Este error puede persistir en la interfaz de usuario de Datadog durante algunas horas mientras se propagan los cambios.

## Discrepancias en los datos

### Discrepancia entre tus datos en CloudWatch y Datadog

Hay dos distinciones importantes que hay que tener en cuenta:

1. Datadog muestra datos sin procesar de AWS en valores por segundo, independientemente del periodo de tiempo seleccionado en AWS. Por este motivo, el valor de Datadog podría aparecer más bajo.

2. `min`, `max` y `avg` tienen un significado diferente en AWS que en Datadog. En AWS, la latencia promedio, la latencia mínima y la latencia máxima son tres métricas distintas que recopila AWS. Cuando Datadog obtiene métricas de AWS CloudWatch, la latencia promedio se recibe como una única serie temporal por Elastic Load Balancer (ELB). En Datadog, cuando seleccionas `min`, `max` o `avg`, estás controlando cómo se combinan varias series temporales. Por ejemplo, al solicitar `system.cpu.idle` sin ningún filtro, se devuelve una serie para cada host que informa esa métrica, y esas series deben combinarse para ser graficadas. Si, en cambio, solicitaste `system.cpu.idle` desde un solo host, no es necesaria ninguna agregación y alternar entre promedio y máximo arroja el mismo resultado.

## Métricas

### Métricas con retraso

Al utilizar la integración de AWS, Datadog obtiene sus métricas a través de la API de CloudWatch. Es posible que notes un pequeño retraso en las métricas de AWS debido a algunas limitaciones que existen para su API.

La API de CloudWatch solo ofrece un rastreo métrica por métrica para extraer datos. Las API de CloudWatch tienen un límite de velocidad que varía en función de la combinación de credenciales de autenticación, región y servicio. AWS pone a disposición las métricas según el nivel de cuenta. Por ejemplo, si pagas por "métricas detalladas" dentro de AWS, estarán disponibles más rápidamente. Este nivel de servicio para métricas detalladas también se aplica a la granularidad, ya que algunas métricas están disponibles por minuto y otras cada cinco minutos.

Instala el Datadog Agent en el host para evitar retrasos en las métricas. Consulta la [documentación del Datadog Agent][3] para comenzar. Datadog tiene la capacidad de priorizar ciertas métricas dentro de una cuenta para extraerlas más rápido, según las circunstancias. Contacta con el [soporte de Datadog][4] para obtener información adicional.

### Métricas faltantes

La API de CloudWatch solo devuelve métricas con puntos de datos, por lo que, por ejemplo, si un ELB no tiene instancias adjuntas, no se verán métricas relacionadas con este ELB en Datadog.

### Recuento incorrecto de aws.elb.healthy_host_count

Cuando la opción de balanceo de carga entre zonas está habilitada en un ELB, todas las instancias que se adjuntan al ELB se consideran parte de todas las zonas de disponibilidad (del lado de CloudWatch). Por ejemplo, si tienes dos instancias en `1a` y tres instancias en `ab`, la métrica muestra cinco instancias por zona de disponibilidad.
Como esto puede resultar contraintuitivo, las métricas **aws.elb.healthy_host_count_deduped** y **aws.elb.un_healthy_host_count_deduped** muestran el recuento de instancias en buen estado y en mal estado por zona de disponibilidad, independientemente de si esta opción de balanceo de carga entre zonas está habilitada o no.

## Aplicación Datadog

### Hosts duplicados al instalar el Agent

Al instalar el Agent en un host de AWS, es posible que veas hosts duplicados en la página de infraestructura de Datadog durante algunas horas si configuras manualmente el nombre de host en la configuración del Agent. Los hosts duplicados desaparecen luego de unas horas y no afectan tu facturación.

## Datadog Agent

### Metadatos de EC2 con IMDS v2

En algunas situaciones, la configuración de [IMDSv2][5] de EC2 hace imposible que el agente acceda a los metadatos, lo que lleva al Agent a recurrir al proveedor de nombre de host `os` en lugar de `aws`, como se ve en la salida de `agent status`.

En entornos en contenedores, el problema podría ser que hayas bloqueado el endpoint de metadatos de EC2 mediante la asignación de roles/credenciales de IAM a los pods que se ejecutan en el clúster de Kubernetes. `Kube2IAM` y `kiam` son herramientas comunes que se utilizan para hacer esto. Para resolverlo, actualiza tu configuración para permitir el acceso a este endpoint.

La API de AWS permite deshabilitar IMDSv1, que el Agent utiliza de forma predeterminada. Si este es el caso, pero IMDSv2 está habilitado y es accesible, configura el parámetro `ec2_prefer_imdsv2` en `true` (el valor predeterminado es `false`) en tu [configuración del Agent][6]. Consulta la documentación [Transición al uso de Instance Metadata Service versión 2][7] para obtener más detalles.

IMDSv2, en su configuración predeterminada, rechaza las conexiones con un conteo de saltos de IP mayor que uno, es decir, conexiones que hayan pasado por una puerta de enlace de IP. Esto puede causar problemas cuando el Agent se ejecuta en un contenedor con una red distinta a la red del host, ya que el tiempo de ejecución reenvía el tráfico del contenedor a través de una puerta de enlace de IP virtual. Esto es común en las implementaciones de ECS. Las siguientes opciones pueden solucionar este problema:

 * [Aumenta el conteo máximo de saltos a al menos `2`][8]. Hacerlo puede tener consecuencias para la seguridad de los datos almacenados en el IMDS, ya que permite que otros contenedores además del Agent accedan también a estos datos.
 * Utiliza el nombre de host descubierto por cloud-init [estableciendo `providers.eks.ec2.useHostnameFromFile` en true][9].
 * Ejecuta el Agent en el espacio de nombres UTS del host [estableciendo `agents.useHostNetwork` en true][10].

## Etiquetas

### Los hosts aún tienen etiquetas (tags) de AWS después de eliminar la integración de Amazon EC2

Puedes usar la integración de AWS para recopilar datos de CloudWatch o instalar un Datadog Agent directamente en cada instancia de EC2 para obtener datos y etiquetas. Si has optado por utilizar ambos métodos para recopilar datos, el backend de Datadog fusiona los datos de la integración y del Datadog Agent en un único objeto de host.

Si eliminaste la integración de AWS, pero continúas ejecutando un Datadog Agent en tus instancias de EC2, los hosts de tu cuenta de Datadog seguirán teniendo asociadas las etiquetas de host antiguas que se recopilaron de AWS. Este es el comportamiento previsto y no indica que la integración de AWS o la de Amazon EC2 aún estén habilitadas.

Puedes verificar que la integración esté habilitada marcando "Apps Running" para ese host en la lista de infraestructura o verificando el resumen de métricas y creando un notebook acotado a ese host.

Si deseas eliminar permanentemente las etiquetas de host de AWS de un host, puedes hacerlo mediante el [Endpoint de API para eliminar etiquetas de host][11].

[1]: /es/integrations/amazon_web_services/
[2]: /es/integrations/guide/error-datadog-not-authorized-sts-assume-role/#pagetitle
[3]: /es/agent/
[4]: /es/help/
[5]: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/configuring-instance-metadata-service.html
[6]: https://github.com/DataDog/datadog-agent/blob/main/pkg/config/config_template.yaml
[7]: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/configuring-instance-metadata-service.html#instance-metadata-transition-to-version-2
[8]: https://docs.aws.amazon.com/cli/latest/reference/ec2/modify-instance-metadata-options.html
[9]: https://github.com/DataDog/helm-charts/blob/58bf52e4e342c79dbec95659458f7de8c5de7e6c/charts/datadog/values.yaml#L1683-L1688
[10]: https://github.com/DataDog/helm-charts/blob/58bf52e4e342c79dbec95659458f7de8c5de7e6c/charts/datadog/values.yaml#L930-L937
[11]: /es/api/latest/tags/#remove-host-tags