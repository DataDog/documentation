---
further_reading:
- link: /security/application_security/how-it-works/
  tag: Documentation
  text: Fonctionnement de la protection des applications et des API
- link: /security/application_security/waf-integration/
  tag: Documentation
  text: En savoir plus sur les intégrations WAF
- link: /security/application_security/troubleshooting
  tag: Documentation
  text: Dépannage de la protection des applications et des API
- link: /security/application_security/threats/
  tag: Documentation
  text: Protection des applications et des API
- link: https://www.datadoghq.com/blog/aws-waf-datadog/
  tag: Blog
  text: Surveiller les applications WAF AWS avec Datadog
title: Activation de la protection des applications et des API pour AWS WAF
---
{{< site-region region="gov" >}}
<div class="alert alert-info">
App and API Protection est en préversion sur le site Datadog Government US1-FED.
</div>
{{< /site-region >}}

La protection des applications et des API s'intègre à AWS Web Application Firewall (WAF) en :

1. Convertissant les logs en traces pour obtenir une visibilité sur les requêtes surveillées et bloquées
2. Bloquant les adresses IP avec des IPsets AWS WAF

Les deux peuvent être configurés indépendamment, mais il est recommandé de configurer d'abord la conversion des logs en traces afin d'inspecter les actions AWS WAF.

## Prérequis {#prerequisites}

- L'[intégration Amazon Web Services][1] est configurée.
- Les autorisations suivantes sont activées pour l'[AWS Resource Collection][7] :
  - `wafv2:GetWebACL`
  - `wafv2:ListResourcesForWebACL`
  - `wafv2:ListWebACLs`
  - `wafv2:GetIPSet`
  - `wafv2:ListIPSets`
 - La collecte des métriques et des logs est activée sur l'[intégration AWS WAF][2]. Notez que seuls les logs envoyés vers un bucket S3 sont collectés par l'intégration AWS WAF.
 - Une [Connexion][3] est créée avec le compte AWS hébergeant l'AWS WAF utilisé pour le blocage.

## Convertir les logs AWS WAF en traces {#convert-aws-waf-logs-to-traces}

Tout d'abord, **activez** la conversion des logs en traces sur la [Settings page][4].

Ensuite, assurez-vous que le tableau des ACL Web contient les métriques de requête ainsi que les logs et les traces.

Les traces de sécurité sont rapportées dans l'[AAP Traces Explorer][5] avec le nom de service `aws.waf`.

## Bloquer avec des IPsets AWS WAF {#block-with-aws-waf-ipsets}

Pour bloquer les attaquants, Datadog doit gérer un IPset dédié. Cet IPset doit être référencé par le web ACL avec une règle en mode blocage.

Plusieurs web ACLs peuvent être configurées dans le même compte AWS ou dans des comptes AWS différents. Une [Connexion][3] doit être créée sur chaque compte AWS.

Assurez-vous que le rôle AWS associé à la [Connexion][3] dispose des autorisations suivantes :

 - `wafv2:GetIPSet`
 - `wafv2:UpdateIPSet`

{{< tabs >}}
{{% tab "Configuration avec Terraform" %}}

1. Modifiez votre configuration Terraform avec le contenu suivant :
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

2. Exécutez `terraform apply` pour créer et mettre à jour les ressources WAF.

{{% /tab %}}
{{< /tabs >}}

Une fois la configuration terminée, cliquez sur **Block New Attackers** sur la [denylist page][6]. Sélectionnez le web ACL et la Connexion AWS associée pour bloquer les adresses IP.

[1]: /fr/integrations/amazon-web-services/
[2]: /fr/integrations/amazon_waf/
[3]: /fr/actions/connections/
[4]: https://app.datadoghq.com/security/configuration/asm/setup
[5]: https://app.datadoghq.com/security/appsec/traces?query=service%3Aaws.waf
[6]: https://app.datadoghq.com/security/appsec/denylist
[7]: /fr/integrations/amazon-web-services/#resource-collection