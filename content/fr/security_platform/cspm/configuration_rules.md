---
title: Règles de configuration par défaut
kind: documentation
disable_toc: true
---
{{< site-region region="us3,gov,eu" >}}
<div class="alert alert-warning">
La solution Cloud Security Posture Management n'est pas actuellement disponible dans les régions US1-FED, US3 et EU.
</div>
{{< /site-region >}}

## Présentation

Datadog propose des règles de configuration par défaut pour détecter les problèmes de configuration potentiels et vous permettre d'intervenir sans attendre. Les règles de configuration suivent la même [logique conditionnelle][1] que toutes les autres règles de la plateforme de sécurité Datadog.

{{< img src="security_platform/cspm/configuration_rules/configuration_rule.png" alt="Unr règle de configuration dans Datadog" width="65%">}}

Le CSPM Datadog utilise les types de règles suivants pour valider la configuration de votre infrastructure cloud :

- [Configuration du cloud][2] : Ces règles analysent la configuration des ressources au sein de votre environnement cloud. Par exemple, la règle [La distribution Cloudfront est chiffrée][3] évalue la configuration d'une distribution AWS Cloudfront pour déterminer si elle est chiffrée. Il n'est pas encore possible de personnaliser directement une requête de configuration cloud, mais vous pouvez personnaliser la façon dont votre environnement est [analysé][4] par chaque règle.

- [Configuration de l'infrastructure][5] : Ces règles analysent vos conteneurs et clusters Kubernetes afin de détecter les problèmes de configuration, tels que définis dans les célèbres benchmarks de conformité CIS pour Docker et Kubernetes. Par exemple, la règle [Les autorisations de fichier /etc/default/docker sont définies sur 644 ou un paramètre plus restrictif][6] évalue les autorisations de fichier Docker définies sur un host.

Ces règles fonctionnent avec des configurations d'intégration par défaut et sont associées à des contrôles au sein d'un [framework de conformité ou d'un benchmark de l'industrie][5]. Lorsqu'une nouvelle règle de configuration par défaut est ajoutée, elle automatiquement importée dans votre compte.

{{< whatsnext desc="Pour démarrer, choisissez un type de règle en fonction de votre environnement :">}}
  {{< nextlink href="/security_platform/default_rules#cat-cloud-configuration">}}<u>Configuration du cloud</u> : ces règles analysent la configuration des ressources au sein de votre environnement cloud.{{< /nextlink >}}
  {{< nextlink href="/security_platform/default_rules#cat-infrastructure-configuration">}}<u>Configuration de l'infrastructure</u> : ces règles analysent vos conteneurs et clusters Kubernetes afin de détecter les problèmes de configuration, tels que définis dans les célèbres benchmarks de conformité CIS pour Docker et Kubernetes.{{< /nextlink >}}
{{< /whatsnext >}}


[1]: /fr/security_platform/detection_rules/
[2]: /fr/security_platform/default_rules#cat-cloud-configuration
[3]: https://docs.datadoghq.com/fr/security_monitoring/default_rules/aws-cloudfront-distributions-encrypted/
[4]: /fr/security_platform/cspm/frameworks_and_benchmarks
[5]: /fr/security_platform/default_rules#cat-infrastructure-configuration
[6]: https://docs.datadoghq.com/fr/security_monitoring/default_rules/cis-docker-1.2.0-3.22/