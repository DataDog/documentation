---
kind: documentation
title: Cloud Security Posture Management
---

{{< site-region region="gov" >}}

<div class="alert alert-warning">À l'heure actuelle, la solution Cloud Security Posture Management n'est pas disponible pour ce site.</div>

{{< /site-region >}}

## Présentation

Grâce à la solution Cloud Security Posture Management (CSPM) de Datadog, vous pouvez évaluer et visualiser facilement la posture de sécurité actuelle et historique de votre environnement cloud, automatiser la collecte de preuves pour l'audit et détecter les problèmes de configurations susceptibles de rendre votre organisation vulnérable face à d'éventuelles attaques.

{{< img src="security_platform/cspm/landing_page.png" alt="Cloud Security Posture Management" width="100%">}}

Évaluez la configuration de vos ressources cloud, notamment les groupes de sécurité, compartiments de stockage, équilibreurs de charge et bases de données sur la base de règles de configuration. L'Agent Datadog peut analyser les données des configurations locales provenant de serveurs, conteneurs et clusters Kubernetes en leur appliquant les règles de détection Datadog prêtes à l'emploi relatives au [cloud][1] et à l'[infrastructure][2] de Posture Management.

Consultez votre posture globale de sécurité cloud depuis la page [Posture Management][3]. Examinez les résultats détaillés des analyses et examinez vos anciennes configurations grâce aux [findings][4].

## Glossaire


Score de posture de sécurité
: Pourcentage de votre environnement qui respecte toutes les règles actives de détection prêtes à l'emploi pour le [cloud][1] et l'[infrastructure][2]. Voici la formule appliquée : `(Nombre de findings evaluation:pass) / (nombre total de findings)`. Datadog pondère ensuite la formule en fonction de la gravité : les règles de détection à faible gravité ont un coefficient de 1, tandis que les règles de détection critiques ont un coefficient de 5. Ainsi, les règles de détection critiques ont un impact cinq fois plus fort sur le score de posture de sécurité que les règles de sécurité à faible gravité, afin d'accorder davantage d'importance aux règles qui détectent les risques de sécurité élevés. Le score est également normalisé, afin de traiter de la même manière tous les types et volumes de ressources. Ainsi, 500 conteneurs ont le même impact que trois compartiments S3 sur le score final. Ce facteur de normalisation permet de générer des scores comparables d'un compte cloud à un autre. Les scores ne sont pas faussés par un grand nombre de conteneurs ou un faible nombre de compartiments de stockage. 

Condition
: Groupe de contrôles représentant un seul domaine technique ou opérationnel, comme la _gestion de l'accès_ ou le _réseau_. Le framework réglementaire PCI-DSS possède par exemple [12 conditions][5].

Contrôle
: Recommandation spécifique portant sur la gestion d'une technologie, d'un rôle ou d'un processus. Les contrôles sont généralement basés sur une réglementation ou sur une norme de l'industrie.

Ressource
: Entité configurable devant être analysée en continu afin de confirmer qu'elle passe un ou plusieurs contrôles. Exemples de ressource d'instance AWS : hosts, conteneurs, groupes de sécurité, utilisateurs et stratégies IAM gérées par le client.

  {{< img src="security_platform/cspm/getting_started/resource.png" alt="Information sur les ressources de gestion de la posture dans l'application Datadog" style="width:65%;">}}

Règle
: Une règle évalue la configuration d'une ressource afin de vérifier un certain élément lié à un ou plusieurs contrôles. Une règle peut être associée à plusieurs contrôles, conditions et frameworks.

  {{< img src="security_platform/cspm/getting_started/rules.png" alt="Liste des règles de détection Cloud Security Posture Management" style="width:65%;">}}

Findings
: Un finding constitue la base de l'évaluation d'une ressource en fonction d'une règle. Chaque fois qu'une règle est appliquée à une ressource, un finding est généré, avec le statut Pass ou Fail.

Framework
: Ensemble de conditions associées à une norme réglementaire ou un benchmark d'une industrie.

  {{< img src="security_platform/cspm/getting_started/frameworks.png" alt="Vue d'ensemble des frameworks sur la page d'accueil de Cloud Security Posture Management" style="width:100%;">}}

## Prise en main

{{< whatsnext >}}
  {{< nextlink href="/security_platform/cspm/getting_started">}}Configuration complète de CSPM{{< /nextlink >}}
  {{< nextlink href="/security_platform/default_rules/#cat-posture-management-cloud">}}Règles de détection Posture Management prêtes à l'emploi pour le cloud{{< /nextlink >}}
  {{< nextlink href="/security_platform/default_rules/#cat-posture-management-infra">}}Règles de détection Posture Management prêtes à l'emploi pour l'infrastructure{{< /nextlink >}}
  {{< nextlink href="/security_platform/cspm/findings">}}Présentation des findings Cloud Security Posture Management{{< /nextlink >}}
  {{< nextlink href="https://www.datadoghq.com/blog/cspm-for-azure-with-datadog/">}}Surveillance de la posture de sécurité et de conformité de votre environnement Azure avec Datadog{{< /nextlink >}}
{{< /whatsnext >}}

[1]: /fr/security_platform/default_rules/#cat-posture-management-cloud
[2]: /fr/security_platform/default_rules/#cat-posture-management-infra
[3]: https://app.datadoghq.com/security/compliance/homepage
[4]: /fr/security_platform/cspm/findings
[5]: https://www.pcisecuritystandards.org/pci_security/maintaining_payment_security