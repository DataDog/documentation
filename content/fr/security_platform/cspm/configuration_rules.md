---
kind: documentation
title: Règles prêtes à l'emploi
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">
À l'heure actuelle, la solution Cloud Security Posture Management n'est pas disponible pour ce site.
</div>
{{< /site-region >}}

## Présentation

Datadog propose des [règles de détection prêtes à l'emploi][1] permettant d'identifier les problèmes de configuration potentiels et de renforcer votre sécurité. Les règles de détection suivent la même [logique conditionnelle][2] que toutes les autres règles de détection de la plateforme de sécurité Datadog.

{{< img src="security_platform/cspm/configuration_rules/configuration_rule.png" alt="Unr règle de configuration dans Datadog" width="65%">}}

La solution Cloud Security Posture Management (CSPM) de Datadog utilise les types de règles suivants pour valider la configuration de votre infrastructure cloud :

- [Configuration du cloud][1] : ces règles de détection analysent la configuration des ressources au sein de votre environnement cloud. Par exemple, la règle [Cloudfront distribution is encrypted][3] évalue la configuration d'une distribution AWS Cloudfront pour déterminer si elle est chiffrée. Il n'est pas encore possible de personnaliser directement une requête de configuration du cloud, mais vous pouvez personnaliser la façon dont votre environnement est [analysé][4] par chaque règle.

- [Configuration de l'infrastructure][5] : ces règles de détection analysent vos conteneurs et clusters Kubernetes afin de détecter les problèmes de configuration, tels que définis dans les benchmarks de conformité CIS pour Docker et Kubernetes. Par exemple, la règle [/etc/default/docker file permissions are set to 644 or more restrictively][6] évalue les autorisations de fichier Docker définies sur un host.

Ces règles de détection fonctionnent avec des configurations d'intégration prêtes à l'emploi et sont associées à des contrôles au sein d'un [framework de conformité ou d'un benchmark de l'industrie][4]. Lorsqu'une nouvelle règle de détection de configuration par défaut est ajoutée, elle est automatiquement importée dans votre compte.

{{< whatsnext desc="Pour commencer, choisissez un type de règle en fonction de votre environnement :">}}
  {{< nextlink href="/security_platform/default_rules/#cat-posture-management-cloud">}}<u>Configuration du cloud</u>{{< /nextlink >}}
  {{< nextlink href="/security_platform/default_rules/#cat-posture-management-infra">}}<u>Configuration de l'infrastructure</u>{{< /nextlink >}}
{{< /whatsnext >}}


[1]: /fr/security_platform/default_rules/#cat-posture-management-cloud
[2]: /fr/security_platform/detection_rules/
[3]: https://docs.datadoghq.com/fr/security_monitoring/default_rules/aws-cloudfront-distributions-encrypted/
[4]: /fr/security_platform/cspm/frameworks_and_benchmarks
[5]: /fr/security_platform/default_rules/#cat-posture-management-infra
[6]: https://docs.datadoghq.com/fr/security_monitoring/default_rules/cis-docker-1.2.0-3.22/