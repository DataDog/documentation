---
further_reading:
- link: /security/application_security/how-it-works/
  tag: Documentación
  text: Cómo funciona App and API Protection
- link: /security/application_security/waf-integration/
  tag: Documentación
  text: Más información sobre integraciones WAF
- link: /security/application_security/troubleshooting
  tag: Documentación
  text: Solucionar problemas de App and API Protection
- link: /security/application_security/threats/
  tag: Documentación
  text: App and API Protection
- link: https://www.datadoghq.com/blog/aws-waf-datadog/
  tag: Blog
  text: Monitorización de actividades WAF de AWS con Datadog
title: Activación de App and API Protection para AWS WAF
---

App and API Protection se integra con AWS Web Application Firewall (WAF) mediante lo siguiente:

1. Conversión de logs en trazas para obtener visibilidad de las solicitudes supervisadas y bloqueadas.
2. Bloqueo de direcciones IP con conjuntos de IP de AWS WAF.

Ambas pueden configurarse independientemente, pero se recomienda configurar primero la conversión de logs a trazas para poder inspeccionar las acciones de AWS WAF.

## Requisitos previos

 - La [integración de Amazon Web Services][1] está configurada.
 - La recopilación de métricas y logs está activada en la [integración de AWS WAF][2].
 - Se crea un [conexión][3] con la cuenta de AWS que aloja el AWS WAF utilizado para el bloqueo.

## Convertir los logs de AWS WAF en trazas

En primer lugar, **habilita** la conversión de logs a trazas en la [página de configuración][4]. 

A continuación, asegúrate de que la tabla de ACLs web contiene métricas de solicitud, así como logs y trazas.

Las trazas de seguridad se informan en [AAP Traces Explorer][5] con el nombre de servicio `aws.waf`.

## Bloqueo con conjuntos de IP de AWS WAF

Para bloquear a los atacantes, Datadog necesita gestionar un conjunto de IP dedicado. Este conjunto de IP debe ser referenciado por la ACL web con una regla en modo de bloqueo.

Se pueden configurar múltiples ACLs web en la misma o en diferentes cuentas de AWS. Debe crearse una [conexión][3] en cada cuenta de AWS.

Asegúrate de que el rol de AWS adjunto a la [conexión][3] tiene los siguientes permisos:

 - `GetIPSet`
 - `UpdateIPSet`

{{< tabs >}}
{{% tab "Setup with Terraform" %}}

1. Edita tu configuración de Terraform con el siguiente contenido:
   ```tf
   resource "aws_wafv2_ip_set" "Datadog-blocked-ipv4s" {
     name               = "Datadog-blocked-ipv4s"
     ip_address_version = "IPV4"
     scope              = "CLOUDFRONT"
     addresses          = []

     lifecycle {
       # The addresses are managed by the Datadog Application Security product.
       ignore_changes = [addresses]
     }
   }

   # Add a blocking rule to your existing web ACL resource
   resource "aws_wafv2_web_acl" "EdgeWAF" {
     name  = "EdgeWAF"
     description = "undefined"
     scope = "CLOUDFRONT"

     default_action {
       allow {}
     }

     rule {
       name     = "BlockedIPs"
       priority = 0

       action {
         block {}
       }

       statement {
         ip_set_reference_statement {
           arn = aws_wafv2_ip_set."Datadog-blocked-ipv4s".arn
         }
       }

       visibility_config {
         cloudwatch_metrics_enabled = true
         metric_name                = "Datadog-blocked-ipv4s"
         sampled_requests_enabled   = true
       }
     }

     visibility_config {
       cloudwatch_metrics_enabled = true
       metric_name                = "EdgeWAF"
       sampled_requests_enabled   = true
     }
   }
   ```

2. Ejecuta `terraform apply` para crear y actualizar los recursos de WAF.

{{% /tab %}}
{{< /tabs >}}

Una vez finalizada la configuración, haz clic en **Block New Attackers** (Bloquear nuevos atacantes) en la [página de la lista de denegación][6] de App & API Protection. Selecciona la ACL web y la conexión de AWS asociada para bloquear las direcciones IP.

[1]: /es/integrations/amazon-web-services/
[2]: /es/integrations/amazon_waf/
[3]: /es/actions/connections/
[4]: https://app.datadoghq.com/security/configuration/asm/setup
[5]: https://app.datadoghq.com/security/appsec/traces?query=service%3Aaws.waf
[6]: https://app.datadoghq.com/security/appsec/denylist