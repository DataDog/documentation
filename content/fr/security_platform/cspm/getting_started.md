---
title: Débuter avec le CSPM
kind: documentation
further_reading:
  - link: security_platform/default_rules
    tag: Documentation
    text: Explorer les règles de configuration cloud par défaut
  - link: security_platform/cspm/findings
    tag: Documentation
    text: Rechercher et explorer les résultats CSPM
  - link: security_platform/cspm/frameworks_and_benchmarks
    tag: Documentation
    text: En savoir plus sur les frameworks et les benchmarks de l'industrie
---
{{< site-region region="us3,gov" >}}
<div class="alert alert-warning">
La solution Cloud Security Posture Management n'est pas actuellement disponible dans les régions US1-FED et US3.
</div>
{{< /site-region >}}

## Présentation

Accédez à la [page de configuration initiale][1] pour activer l'analyse de votre environnement.

{{< img src="security_platform/cspm/getting_started/posture-management-setup.png" alt="Page de configuration du CSPM" style="width:100%;">}}

## Configuration

### Configuration du produit

Sélectionnez `Posture Management`. Vous pouvez également sélectionner plusieurs produits pour tous les configurer en même temps.

### Évaluer votre environnement Cloud

Utilisez la section « Detect misconfigurations in your cloud environment » pour recueillir les données de configuration de vos ressources depuis vos fournisseurs Cloud. Datadog pourra ainsi évaluer vos environnements en les comparant aux [règles de configuration Cloud par défaut de Datadog][2].

### Évaluer vos hosts et conteneurs

Utilisez la section « Evaluate the security posture of your hosts and containers » pour configurer l'Agent Datadog de façon à ce qu'il analyse vos hosts et vos conteneurs. Notre Agent évaluera en continu l'état de vos hosts et de vos conteneurs en les comparant aux [règles de configuration d'infrastructure par défaut de Datadog][3].

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/security/configuration?config_k9_configuration=true&detect-threats=apache&secure-cloud-environment=amazon-web-services&secure-hosts-and-containers=kubernetes&selected-products=compliance_monitoring
[2]: /fr/security_platform/default_rules#cat-cloud-configuration
[3]: /fr/security_platform/default_rules#cat-infrastructure-configuration