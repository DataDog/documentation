---
aliases:
- /fr/security/workload_protection/detect_and_monitor/finding_rules
description: Créez et gérez les règles du backend qui évaluent votre posture de sécurité
  à l'exécution et génèrent des découvertes Workload Protection.
disable_toc: false
further_reading:
- link: /security/workload_protection/investigate_and_triage/security_findings
  tag: Documentation
  text: Enquêtez et classez par priorité les découvertes.
- link: /security/workload_protection/detect_and_monitor/agent_rules/secl_guide
  tag: Documentation
  text: Guide SECL
- link: /security/workload_protection/detect_and_monitor/detection_and_finding_rules/detection_rules
  tag: Documentation
  text: Règles de détection
title: Règles de découverte
---
Les règles de découverte décrivent la logique backend utilisée pour évaluer votre posture de sécurité à l'exécution en analysant les [événements d'Agent][1]. Lorsqu'une règle de découverte correspond, Workload Protection génère une [découverte][2] pour la ressource affectée.

Contrairement aux [règles de détection][3], qui font ressortir des menaces de sécurité réelles à l'exécution, les règles de découverte suivent les mauvaises pratiques et les erreurs de configuration en cours. Une découverte représente une ressource (un host ou un conteneur) qui enfreint activement une politique de sécurité, et non une simple activité suspecte.

Les règles de découverte utilisent les événements d'Agent existants pour faire ressortir des recommandations de sécurité pratiques, telles que l'utilisation du gestionnaire de paquets dans les conteneurs, les modèles d'accès IMDS ou les configurations de privilèges inutiles. Cela vous aide à traiter les risques réels qui ne sont pas des menaces directes, mais qui représentent des pratiques risquées dans les environnements de production.

## Règles de découverte prédéfinies {#ootb-finding-rules}

Workload Protection inclut des règles de découverte prédéfinies (OOTB) maintenues par Datadog. Ces règles font ressortir en continu les mauvaises pratiques et les configurations risquées dans les charges de travail en production. Datadog développe de nouvelles règles par défaut de manière continue, et les nouvelles règles sont automatiquement importées dans votre compte. Pour la liste complète, consultez la [liste des règles prédéfinies][8].

Parcourez et examinez les règles de découverte déployées dans votre organisation dans la liste des [règles de découverte][6] de Workload Protection dans Datadog. Chaque règle inclut une description du risque de sécurité, les types de ressources auxquels elle s'applique et des conseils de remédiation.

Pour réduire le bruit lié aux configurations attendues, utilisez une automatisation des découvertes pour mettre la règle en sourdine sans la désactiver complètement. Consultez [Automatisation des découvertes][7].

## Créer une règle de découverte personnalisée {#create-a-custom-finding-rule}

Les règles de découverte personnalisées suivent le même processus de création que les [règles de détection][3], avec une différence clé : elles ciblent un type de ressource spécifique — host ou conteneur — plutôt que de détecter un événement ponctuel.

Pour créer une règle de découverte personnalisée, accédez à la page [règles de découverte][6] de Workload Protection et cliquez sur {{< ui >}}New Rule{{< /ui >}}.

L'éditeur de règles vous guide à travers cinq étapes.

### Étape 1 : Sélectionner un type de ressource et définir la requête de recherche {#step-1-select-a-resource-type-and-define-search-query}

Sélectionnez le type de ressource que la règle de découverte évalue :

- {{< ui >}}Host{{< /ui >}} : La règle s'applique aux hosts. Workload Protection préfixe automatiquement votre requête avec `-@container.id:*` pour exclure les événements de conteneur.
- {{< ui >}}Container{{< /ui >}} : La règle s'applique aux conteneurs. Workload Protection préfixe automatiquement votre requête avec `@container.id:*` pour inclure uniquement les événements de conteneur.

{{< img src="security/workload_protection/detect_and_monitor/finding_rules_editor.png" alt="Éditeur de règles de découverte affichant le sélecteur de type de ressource Host et Conteneur et l'aperçu de la requête de recherche" width="100%">}}

Définissez la requête qui sélectionne les [événements d'Agent][1] que la règle évalue. La requête de recherche détermine quels événements sont pris en compte pour décider si une ressource ne respecte pas la règle.

Vous pouvez effectuer les opérations suivantes :

- Filtrez sur des **champs spécifiques** dans les événements d'Agent pour affiner la requête et rendre la découverte plus précise. Par exemple, filtrez sur `@process.executable.path`, `@file.path` ou `@agent.rule_id`. Tout comme pour les [règles de détection][3], les règles de découverte peuvent interroger n'importe quel champ du schéma d'événement backend, qui inclut tous les champs d'événement d'Agent ainsi qu'un enrichissement supplémentaire tel que le contexte de l'infrastructure, l'ascendance des processus et le renseignement sur les menaces. Consultez la [syntaxe backend Linux][9] et la [syntaxe backend Windows][10] pour obtenir l'ensemble complet des champs disponibles.
- Combinez plusieurs conditions pour limiter la règle à un sous-ensemble de votre infrastructure ou de vos charges de travail.

Utilisez l'[Agent Events Explorer][5] pour tester votre requête et valider les événements qui correspondent avant de publier la règle.

### Étape 2 : Définir la gravité de la découverte {#step-2-define-finding-severity}

Définissez la gravité d'une découverte lorsque la règle est déclenchée.

### Étape 3 : Décrivez la découverte {#step-3-describe-the-finding}

Configurez le **nom**, la **description** et les **conseils de remédiation** qui apparaissent lorsqu'une découverte est générée.

1. Saisissez un {{< ui >}}Rule name{{< /ui >}}. Le nom apparaît dans la liste des règles de découverte et devient le titre de la découverte générée.
2. Dans la section {{< ui >}}Rule message{{< /ui >}}, utilisez Markdown pour décrire ce que signifie la découverte et comment y remédier. Incluez un en-tête `## Remediation` dans le corps du message — Workload Protection utilise cette section pour afficher les étapes de remédiation directement dans le panneau latéral de la découverte.
3. Utilisez la liste déroulante {{< ui >}}Tag resulting findings{{< /ui >}} pour ajouter des tags aux découvertes générées. Par exemple, `security:posture` ou `compliance:pci`.

**Remarque** : L'en-tête `## Remediation` est requis pour que les étapes de remédiation s'affichent correctement dans le panneau latéral de la découverte.

[1]: /fr/security/workload_protection/investigate_and_triage/agent_events
[2]: /fr/security/workload_protection/investigate_and_triage/security_findings
[3]: /fr/security/workload_protection/detect_and_monitor/detection_and_finding_rules/detection_rules
[4]: https://app.datadoghq.com/security/configuration/findings-automation
[5]: https://app.datadoghq.com/security/agent-events
[6]: https://app.datadoghq.com/security/workload-protection/finding-rules
[7]: /fr/security/automation_pipelines/mute
[8]: /fr/security/default_rules/#workload-activity
[9]: /fr/security/workload_protection/backend_linux
[10]: /fr/security/workload_protection/backend_windows