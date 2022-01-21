---
title: Frameworks et benchmarks de l'industrie
kind: documentation
further_reading:
  - link: security_platform/default_rules
    tag: Documentation
    text: Explorer les règles de configuration cloud par défaut
  - link: security_platform/cspm/findings
    tag: Documentation
    text: Rechercher et explorer les résultats CSPM
---
{{< site-region region="us" >}}
<div class="alert alert-warning">
La solution Cloud Security Posture Management est actuellement en <a href="https://app.datadoghq.com/security/configuration">version bêta publique</a>.
</div>
{{< /site-region >}}

{{< site-region region="us3,gov,eu" >}}
<div class="alert alert-warning">
La solution Cloud Security Posture Management n'est pas actuellement disponible dans les régions US1-FED, US3 et EU.
</div>
{{< /site-region >}}

## Présentation

Chaque [règle par défaut][1] correspond à un ou plusieurs contrôles au sein d'une norme de conformité ou d'un benchmark de l'industrie. Les règles par défaut de Datadog couvrent actuellement les contrôles et les exigences des frameworks et benchmarks suivants :

- [Benchmarks CIS AWS Foundations v1.3.0*][2]
- [Benchmarks CIS Docker v1.2.0][2]
- [Benchmarks CIS Kubernetes v1.5.1][3]
- [PCI DSS v3.2.1][4]

**Remarques** :

- Pour vous conformer aux [benchmarks CIS AWS Foundations][2], vous **devez** activer le [Cloud SIEM][5] et transmettre vos [logs Cloudtrail à Datadog][6].

- La solution CSPM de Datadog vous permet de savoir facilement si la configuration de vos ressources est conforme à certaines règles. Vous avez la possibilité de créer vos propres règles ou d'utiliser les règles par défaut de Datadog, conçues en fonction de divers frameworks, benchmarks et standards (également désignés « Security Posture Frameworks »). Notez que le CSPM n'évalue pas votre conformité à un framework de sécurité entier, et que les règles sont susceptibles de ne pas couvrir tous les paramètres de configuration concernés. En d'autres termes, ce n'est pas parce que les règles par défaut de Datadog n'ont rien détecté sur vos ressources que ces dernières sont forcément conformes à l'ensemble des exigences d'un framework. Les informations fournies par Datadog ne constituent pas un avis ou conseil juridique, et nous vous recommandons de mettre en œuvre le CSPM en consultation avec votre conseiller juridique ou vos experts en conformité.

## Personnalisez les conditions d'analyse de votre environnement par chaque règle

Depuis la page des [Règles][7], passez votre curseur sur une règle et cliquez sur l'icône en forme de crayon pour la modifier. Sous **Define search queries**, cliquez sur le menu déroulant **Advanced** pour définir une logique de filtrage et choisir comment la règle doit analyser votre environnement.

Par exemple, vous avez la possibilité de retirer toutes les ressources associées au tag `env:staging` via l'option **Never trigger a signal when**. Vous pouvez également limiter une règle aux ressources qui possèdent le tag `compliance:pci` via l'option **Only trigger a signal when**.

{{< img src="security_platform/cspm/frameworks_and_benchmarks/never-trigger-a-signal.png" alt="Dans l'application Datadog, sélectionnez Advanced pour choisir de ne pas déclencher de signal dans certaines conditions, puis ajoutez une requête." >}}

## Définir des cibles de notification pour les règles

La page des [Règles][7] vous offre la possibilité d'ajouter des cibles de notification. Les options de notification sont les suivantes :

- [Slack][8]
- [Jira][9]
- [PagerDuty][10]
- [ServiceNow][11]
- [Microsoft Teams][12]
- [Webhooks][13]
- E-mail

{{< img src="security_platform/cspm/frameworks_and_benchmarks/notification.png" alt="Sélectionner une sévérité et une cible de notificatio" >}}

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/security_monitoring/default_rules/
[2]: https://www.cisecurity.org/benchmark/amazon_web_services/
[3]: https://www.cisecurity.org/benchmark/kubernetes/
[4]: https://www.pcisecuritystandards.org/document_library
[5]: /fr/security_platform/security_monitoring/
[6]: /fr/integrations/amazon_cloudtrail/
[7]: https://app.datadoghq.com/security/configuration/rules/
[8]: /fr/integrations/slack/
[9]: /fr/integrations/jira/
[10]: /fr/integrations/pagerduty
[11]: /fr/integrations/servicenow/
[12]: /fr/integrations/microsoft_teams/
[13]: /fr/integrations/webhooks/