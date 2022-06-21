---
further_reading:
- link: security_platform/default_rules
  tag: Documentation
  text: Découvrir les règles de détection Cloud Security Posture Management par défaut
- link: security_platform/cspm/findings
  tag: Documentation
  text: Rechercher et explorer les résultats CSPM
kind: documentation
title: Frameworks et benchmarks de l'industrie
---

{{< site-region region="gov" >}}

<div class="alert alert-warning">À l'heure actuelle, la solution Cloud Security Posture Management n'est pas disponible pour ce site.

{{< /site-region >}}

{{< img src="security_platform/cspm/frameworks_and_benchmarks/report.png" alt="Choisir un intervalle de recherche à l'aide du menu déroulant" style="width:80%;">}}

## Présentation

Chaque [règle prête à l'emploi][1] correspond à un ou plusieurs contrôles au sein d'une norme de conformité ou d'un benchmark de l'industrie. Les règles prêtes à l'emploi de Datadog couvrent actuellement les contrôles et les exigences des frameworks et benchmarks suivants :

- [Benchmarks CIS AWS Foundations v1.3.0*][2]
- [Benchmarks CIS Azure Foundations v1.3.0][18]
- [Benchmarks CIS Docker v1.2.0][17]
- [Benchmarks CIS Kubernetes v1.5.1**][3]
- [PCI DSS v3.2.1][4]
- [AICPA SOC 2][5]
- [HIPAA][6]
- [RGPD][7]

* Pour vous conformer aux [benchmarks CIS AWS Foundations][2], vous **devez** activer [Cloud SIEM][8] et transmettre vos [logs Cloudtrail à Datadog][9].

** Certaines règles de détection des [benchmarks CIS Kubernetes][3] s'appliquent uniquement aux clusters Kubernetes autohébergés.

**Remarque** : la solution CSPM de Datadog vous permet de savoir facilement si la configuration de vos ressources est conforme à certaines règles de détection. Les règles prêtes à l'emploi de Datadog ont été conçues en fonction de divers frameworks, benchmarks et normes (également désignés par le terme « frameworks Security Posture »). CSPM n'évalue pas votre conformité à un framework Security Posture, et les règles prêtes à l'emploi sont susceptibles de ne pas couvrir tous les paramètres de configuration concernés. En d'autres termes, ce n'est pas parce que les règles par défaut de Datadog n'ont rien détecté sur vos ressources que ces dernières sont forcément conformes à l'ensemble des exigences d'un framework Security Posture. Les informations fournies par Datadog ne constituent pas un avis ou conseil juridique, et il est conseillé d'utiliser la solution CSPM de Datadog en consultation avec votre conseiller juridique ou vos experts en conformité.

## Personnalisez les conditions d'analyse de votre environnement par chaque règle

Depuis la page des [règles][10], passez votre curseur sur une règle et cliquez sur l'icône en forme de crayon pour la modifier. Sous **Define search queries**, cliquez sur le menu déroulant **Advanced** pour définir une logique de filtrage et choisir comment la règle doit analyser votre environnement.

Par exemple, vous avez la possibilité de retirer toutes les ressources associées au tag `env:staging` via l'option **Never trigger a signal when**. Vous pouvez également limiter une règle aux ressources qui possèdent le tag `compliance:pci` via l'option **Only trigger a signal when**.

{{< img src="security_platform/cspm/frameworks_and_benchmarks/never-trigger-a-signal.png" alt="Dans l'application Datadog, sélectionnez Advanced pour choisir de ne pas déclencher de signal dans certaines conditions, puis ajoutez une requête." >}}

## Définir des cibles de notification pour les règles de détection

La page des [règles][10] vous offre la possibilité d'ajouter des cibles de notification. Voici la liste des options de notification disponibles :

- [Slack][11]
- [Jira][12]
- [PagerDuty][13]
- [ServiceNow][14]
- [Microsoft Teams][15]
- [Webhooks][16]
- E-mail

Définissez la gravité des signaux Security Posture en sélectionnant le niveau approprié dans la liste déroulante, parmi les valeurs suivantes : INFO, LOW, MEDIUM, HIGH ou CRITICAL. Vous pouvez définir dans la section Notify une ou plusieurs [cibles de notification][7] pour chaque scénario de règle.

{{< img src="security_platform/cspm/frameworks_and_benchmarks/notification.png" alt="Sélectionner une sévérité et une cible de notification" >}}

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/security_monitoring/default_rules/
[2]: https://www.cisecurity.org/benchmark/amazon_web_services/
[3]: https://www.cisecurity.org/benchmark/kubernetes/
[4]: https://www.pcisecuritystandards.org/document_library
[5]: https://www.aicpa.org/interestareas/frc/assuranceadvisoryservices/aicpasoc2report.html
[6]: https://www.hhs.gov/hipaa/index.html
[7]: https://gdpr.eu/
[8]: /fr/security_platform/cloud_siem/
[9]: /fr/integrations/amazon_cloudtrail/
[10]: https://app.datadoghq.com/security/configuration/rules/
[11]: /fr/integrations/slack/
[12]: /fr/integrations/jira/
[13]: /fr/integrations/pagerduty
[14]: /fr/integrations/servicenow/
[15]: /fr/integrations/microsoft_teams/
[16]: /fr/integrations/webhooks/
[17]: https://www.cisecurity.org/benchmark/docker
[18]: https://www.cisecurity.org/benchmark/azure