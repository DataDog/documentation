---
aliases:
- /es/integrations/amazon_verified_access
categories:
- nube
- aws
- recopilación de logs
custom_kind: integración
dependencies: []
description: Recopila logs de AWS Verified Access.
doc_link: https://docs.datadoghq.com/integrations/aws_verified_access/
draft: false
further_reading:
- link: https://www.datadoghq.com/blog/verified-access-datadog/
  tag: Blog
  text: Mejorar la seguridad de las aplicaciones corporativas con AWS Verified Access
    y Datadog
git_integration_title: aws_verified_access
has_logo: true
integration_id: amazon-verified-access
integration_title: AWS Verified Access
integration_version: ''
is_public: true
manifest_version: '1.0'
name: aws_verified_access
public_title: Integración de Datadog y AWS Verified Access
short_description: Recopila logs de AWS Verified Access.
version: '1.0'
---

<!--  EXTRAÍDO DE https://github.com/DataDog/dogweb -->
## Información general

Con AWS Verified Access, puedes proporcionar acceso seguro a tus aplicaciones corporativas sin necesidad de utilizar una red privada virtual red (VPN). Verified Access evalúa cada solicitud de aplicación y ayuda a garantizar que los usuarios puedan acceder a cada aplicación sólo cuando cumplen los requisitos de seguridad especificados.


## Configuración

### Instalación

Si aún no lo has hecho, configura primero la [integración de Amazon Web Services][1].

### Recopilación de logs

#### Habilitar logs de Verified Access

1. Abre la consola de Amazon VPC.
2. En el panel de navegación, selecciona **Instancias Verified Access**.
3. Selecciona la instancia Verified Access.
4. En la pestaña de configuración del registro de instancias Verified Access, selecciona **Modificar la configuración del registro de instancias Verified Access**.
5. Activa **Enviar a Amazon CloudWatch Logs**. Elige el grupo de logs de destino. 

**Nota**: Incluye la cadena `verified-access` en el nombre del grupo de logs para habilitar el análisis automático de logs.

Para obtener más información, consulta [Habilitar o deshabilitar logs de Verified Access][2].

#### Enviar logs a Datadog

**Nota**: Si utilizas la [integración Amazon Security Lake][3] de Datadog, puedes enviar logs de Verified Access a través de esa integración, en lugar de seguir los pasos que se indican a continuación.

1. Si aún no lo has hecho, configura la [función Lambda del Datadog Forwarder][4] en tu cuenta de AWS.
2. Una vez configurada, ve a la función de Lambda del Datadog Forwarder. En la sección Información general de la función, haz clic en **Add Trigger** (Añadir activador).
3. Selecciona el activador **CloudWatch Logs** para la configuración del activador.
4. Selecciona el grupo de logs que contiene tus logs de Verified Access.
5. Añade un nombre de filtro.
6. Haz clic en **Add** (Añadir) para añadir el activador a tu Lambda.

Ve al [Explorador de logs][5] para empezar a explorar tus logs.

Para obtener más información sobre la recopilación de logs de servicios de AWS, consulta [Enviar logs de servicios de AWS con la función Lambda de Datadog][6].

## Datos recopilados

### Métricas

La integración AWS Verified Access no incluye la recopilación de métricas.

### Eventos

La integración AWS Verified Access no incluye eventos.

### Logs

La integración AWS Verified Access incluye [logs de Verified Access][7]. 

### Checks de servicios

La integración AWS Verified Access no incluye checks de servicios.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog][8].

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.datadoghq.com/es/integrations/amazon_web_services/
[2]: https://docs.aws.amazon.com/verified-access/latest/ug/access-logs-enable.html
[3]: https://docs.datadoghq.com/es/integrations/amazon_security_lake/
[4]: https://docs.datadoghq.com/es/logs/guide/forwarder/
[5]: https://app.datadoghq.com/logs
[6]: https://docs.datadoghq.com/es/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/
[7]: https://docs.aws.amazon.com/verified-access/latest/ug/access-logs.html
[8]: https://docs.datadoghq.com/es/help/