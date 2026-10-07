---
description: Activez les Content Packs sélectionnés par Datadog pour déployer des
  détections optionnelles pour des piles logicielles et des vecteurs de menace spécifiques.
disable_toc: false
further_reading:
- link: /security/workload_protection/detect_and_monitor/agent_rules/policy_management
  tag: Documentation
  text: Déployez des règles d'Agent avec des politiques
- link: /security/workload_protection/detect_and_monitor/detection_and_finding_rules/detection_rules
  tag: Documentation
  text: Règles de détection de Workload Protection
- link: /security/workload_protection/investigate_and_triage/security_signals
  tag: Documentation
  text: Enquêtez sur les signaux de sécurité
title: Paquets de contenu
---
Toutes les règles de détection ne sont pas pertinentes pour chaque charge de travail. Certaines détections peuvent être trop bruyantes pour des environnements ayant des contraintes spécifiques, ou peuvent ne pas s'appliquer à certaines piles logicielles. Parallèlement, de nouvelles menaces apparaissent régulièrement et l'équipe de recherche en sécurité de Datadog développe continuellement des règles pour détecter les nouvelles attaques et vulnérabilités.

Les [Content Packs][1] de Workload Protection répondent à ces deux défis. Chaque Content Pack est un ensemble conçu par Datadog de [règles d'Agent][2], de [règles de détection][3] optionnelles et de contenu de support créé pour une pile logicielle, un vecteur de menace ou une vulnérabilité émergente spécifique. Vous choisissez les Content Packs dont vous avez besoin et les déployez uniquement sur les charges de travail auxquelles ils s'appliquent.

## Avantages {#benefits}

- **Déployez des détections ciblées sur les charges de travail pertinentes :** Choisissez les politiques conçues pour des charges de travail ou des environnements spécifiques et déployez-les uniquement là où elles s'appliquent. Cela évite le bruit inutile et l'impact sur les performances des charges de travail pour lesquelles ces détections ne s'appliquent pas.
- **Gardez une longueur d'avance sur les menaces émergentes :** Accédez à de nouvelles règles à mesure que l'équipe de recherche en sécurité de Datadog identifie de nouvelles menaces et vulnérabilités, complétant ainsi la couverture fournie par les politiques par défaut.

## Contenu inclus {#included-content}

Selon le Content Pack, un ensemble peut inclure :

Des - **règles d'Agent** regroupées dans une [politique][4] limitée aux charges de travail ciblées par le Content Pack
Des - **règles de détection** qui génèrent des [signaux de securité][5] lorsqu'une activité correspondante est détectée
Des - **règles de découverte** qui évaluent la posture de sécurité à l'exécution pour le cas d'utilisation couvert.
- Des conseils de configuration pour déployer le Content Pack dans votre environnement

## Activer un Content Pack {#enable-a-content-pack}

1. Accédez à [Content Packs][1].
2. Parcourez les Content Packs disponibles et sélectionnez-en un.
3. Examinez les règles d'Agent, règles de détection et exigences de déploiement incluses.
4. Cliquez sur {{< ui >}}Enable{{< /ui >}} pour activer le Content Pack et accéder à la page de politique associée.

L'activation d'un Content Pack ajoute sa politique et ses règles associées à votre organisation. Pour commencer à détecter les menaces, déployez la politique associée sur votre infrastructure.

## Déployer un Content Pack {#deploy-a-content-pack}

Les Content Packs se déploient via des [policies][4]. Après avoir activé un Content Pack, définissez le périmètre de sa politique sur les charges de travail auxquelles les détections s'appliquent :

1. Accédez à [Policies][6].
2. Ouvrez la politique associée au Content Pack que vous avez activé.
3. Cliquez sur {{< ui >}}Edit{{< /ui >}} à côté du périmètre du déploiement.
4. Ajoutez des [tags][7] pour cibler des hosts, des clusters ou des environnements spécifiques.
5. Activez la politique et confirmez le déploiement.

Pour plus d'informations sur le déploiement de politiques, consultez [Gestion des politiques][4].

## Désactiver un Content Pack {#deactivate-a-content-pack}

1. Accédez à [Content Packs][1].
2. Parcourez les Content Packs disponibles et sélectionnez-en un qui est activé.
3. Cliquez sur {{< ui >}}Deactivate{{< /ui >}} pour supprimer la politique associée de la page de politique.

[1]: https://app.datadoghq.com/security/workload-protection/overview#content-packs
[2]: /fr/security/workload_protection/detect_and_monitor/agent_rules
[3]: /fr/security/workload_protection/detect_and_monitor/detection_and_finding_rules/detection_rules
[4]: /fr/security/workload_protection/detect_and_monitor/agent_rules/policy_management
[5]: /fr/security/workload_protection/investigate_and_triage/security_signals
[6]: https://app.datadoghq.com/security/workload-protection/policies
[7]: /fr/getting_started/tagging/