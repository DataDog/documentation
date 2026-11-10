---
description: Découvrez comment les règles d'Agent déterminent l'activité d'exécution
  que le Datadog Agent collecte et envoie à Datadog en tant qu'événements d'Agent.
disable_toc: false
title: Règles d'Agent
---
Les règles d'Agent déterminent l'activité d'exécution que le Datadog Agent collecte et envoie à Datadog en tant qu'événements d'Agent. Ces événements fournissent la télémétrie que Workload Protection utilise pour la détection des menaces et l'évaluation de la posture de sécurité à l'exécution. Les règles de détection et les règles de finding dans le backend Datadog analysent ces événements pour générer des signaux de sécurité et des findings. Les événements d'Agent capturent l'activité d'exécution de bas niveau des charges de travail et fournissent les données brutes et haute fidélité nécessaires pour comprendre ce qui se passe réellement sur un système, plutôt que de s'appuyer uniquement sur une configuration statique ou des analyses périodiques.

Pour réduire le bruit, le volume de données et l'impact sur les performances, l'Agent filtre les activités bénignes ou à faible risque avant d'envoyer les événements à Datadog. Les règles d'Agent utilisent le langage de sécurité Datadog (SECL) pour définir ce filtrage. Les politiques déploient les règles d'Agent via Remote Configuration, les fichiers de configuration d'Agent ou Terraform.

## Règles d'Agent prêtes à l'emploi {#ootb-rules}

Workload Protection inclut des règles d'Agent prêtes à l'emploi (OOTB), appelées règles par défaut, que Datadog gère. Pour les consulter, consultez [Règles d'Agent][1] dans Datadog. Les ingénieurs de sécurité de Datadog maintiennent ces règles. Ils ajoutent des règles pour les comportements de logiciels malveillants émergents, les techniques d'attaque en évolution et d'autres activités pertinentes pour la sécurité.

Vous pouvez déployer les règles par défaut de manière sélective sur des environnements ou des charges de travail, les cloner pour personnaliser leurs expressions, affiner leur logique de filtrage ou ajouter des actions. Pour les options de déploiement, consultez [Gestion des politiques][2].

Les règles d'Agent peuvent collecter une télémétrie contextuelle ou faire correspondre une activité à haute confiance et exécuter des actions d'Agent. Les règles de détection backend analysent les événements d'Agent et génèrent des signaux de sécurité.

## Écrivez des règles d'Agent personnalisées en SECL {#write-custom-agent-rules-in-secl}

Les règles d'Agent de Workload Protection utilisent un langage d'expression personnalisé appelé SecL pour spécifier quels événements observer, faire correspondre et envoyer à Datadog en fonction du contexte d'exécution. Pour plus d'informations, consultez le [guide SecL][5].

Pour créer simultanément une règle d'Agent et une règle de détection des menaces, utilisez le créateur de règles assisté ou le flux manuel. Consultez [Créer les règles d'Agent et de détection personnalisées ensemble][3] dans la documentation [Règles de détection][4].


## Déployez les règles d'Agent avec des politiques {#deploy-agent-rules-with-policies}

Les règles d'Agent sont regroupées et déployées dans des politiques. Gérez les politiques de manière centralisée dans Datadog ou à l'aide de Terraform, et déployez-les sur l'Agent avec Remote Configuration ou en modifiant manuellement les fichiers de configuration de l'Agent. Pour plus d'informations, consultez [Gestion des politiques][2].
## Utilisez des variables et des actions {#use-variables-and-actions}

Les variables et les actions étendent les règles d'Agent au-delà de la correspondance d'événements. Les actions peuvent collecter des données de télémétrie supplémentaires, telles que des hachages de fichiers, répondre aux menaces ou agir sur des variables SECL. Les variables SECL permettent la construction d'une logique de détection avancée et avec état basée sur des machines à états. Pour plus d'informations, consultez [Variables et actions][6].

[1]: https://app.datadoghq.com/security/workload-protection/agent-rules?ruleQuery=defaultRule%3Atrue
[2]: /fr/security/workload_protection/detect_and_monitor/agent_rules/policy_management
[3]: /fr/security/workload_protection/detect_and_monitor/detection_and_finding_rules/detection_rules/#create-the-custom-agent-and-detection-rules-together
[4]: /fr/security/workload_protection/detect_and_monitor/detection_and_finding_rules/detection_rules
[5]: /fr/security/workload_protection/detect_and_monitor/agent_rules/secl_guide
[6]: /fr/security/workload_protection/detect_and_monitor/agent_rules/variables_and_actions