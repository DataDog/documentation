---
further_reading:
- link: /security/application_security/how-it-works/
  tag: Documentación
  text: Cómo funciona App and API Protection
- link: /security/application_security/waf-integration/
  tag: Documentación
  text: Más información sobre las integraciones de WAF
- link: /security/application_security/troubleshooting
  tag: Documentación
  text: Solución de problemas de protección de aplicaciones y API
- link: /security/application_security/threats/
  tag: Documentación
  text: App and API Protection
- link: https://www.datadoghq.com/blog/aws-waf-datadog/
  tag: Blog
  text: Hacer un seguimiento de la actividad de AWS WAF con Datadog
title: Habilitación de App and API Protection para AWS WAF
---
{{< site-region region="gov" >}}
<div class="alert alert-info">
App and API Protection se encuentra en versión preliminar en el sitio de Datadog Government US1-FED.
</div>
{{< /site-region >}}

App and API Protection se integra con AWS Web Application Firewall (WAF) mediante:

1. La conversión de registros en trazas para obtener visibilidad de las solicitudes monitoreadas y bloqueadas
2. El bloqueo de direcciones IP con IPsets de AWS WAF

Ambos se pueden configurar de forma independiente, pero se recomienda configurar primero la conversión de registros en trazas para inspeccionar las acciones de AWS WAF.

## Requisitos previos {#prerequisites}

- La [integración de Amazon Web Services][1] está configurada.
- Los siguientes permisos están habilitados para el [AWS Resource Collection][7]:
  - `wafv2:GetWebACL`
  - `wafv2:ListResourcesForWebACL`
  - `wafv2:ListWebACLs`
  - `wafv2:GetIPSet`
  - `wafv2:ListIPSets`
 - La recopilación de métricas y registros está habilitada en la [integración de AWS WAF][2]. Tenga en cuenta que solo los registros enviados a un bucket de S3 son recopilados por la integración de AWS WAF.
 - Se crea una [Conexión][3] con la cuenta de AWS que aloja el AWS WAF utilizado para el bloqueo.

## Convertir registros de AWS WAF en trazas {#convert-aws-waf-logs-to-traces}

Primero, **habilite** la conversión de registros a trazas en la [página de Configuración][4].

Luego, asegúrese de que la tabla de ACL web contenga métricas de solicitud, así como registros y trazas.

Las trazas de Security se reportan en el [AAP Traces Explorer][5] con el nombre de servicio `aws.waf`.

## Bloquear con IPsets de AWS WAF {#block-with-aws-waf-ipsets}

Para bloquear a los atacantes, Datadog necesita administrar un IPset dedicado. Este IPset debe ser referenciado por la ACL web con una regla en modo de bloqueo.

Se pueden configurar múltiples ACL web en la misma cuenta de AWS o en diferentes. Se debe crear una [Conexión][3] en cada cuenta de AWS.

Asegúrese de que el rol de AWS adjunto a la [Conexión][3] tenga los siguientes permisos:

 - `wafv2:GetIPSet`
 - `wafv2:UpdateIPSet`

{{< tabs >}}
{{% tab "Configuración con Terraform" %}}

1. Edite su configuración de Terraform con el siguiente contenido:
   ```tf
   resource "aws_wafv2_ip_set" "datadog_blocked_ipv4s" {
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
           arn = aws_wafv2_ip_set.datadog_blocked_ipv4s.arn
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

2. Ejecute `terraform apply` para crear y actualizar los recursos de WAF.

{{% /tab %}}
{{< /tabs >}}

Una vez completada la configuración, haga clic en **Block New Attackers** en la [página de denylist][6]. Seleccione la ACL web y la conexión AWS asociada para bloquear direcciones IP.

[1]: /es/integrations/amazon-web-services/
[2]: /es/integrations/amazon_waf/
[3]: /es/actions/connections/
[4]: https://app.datadoghq.com/security/configuration/asm/setup
[5]: https://app.datadoghq.com/security/appsec/traces?query=service%3Aaws.waf
[6]: https://app.datadoghq.com/security/appsec/denylist
[7]: /es/integrations/amazon-web-services/#resource-collection