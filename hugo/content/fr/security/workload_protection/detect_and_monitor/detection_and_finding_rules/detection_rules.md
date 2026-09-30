---
aliases:
- /fr/security/workload_protection/detect_and_monitor/detection_rules
- /fr/security/workload_protection/setup/ootb_rules
description: Créez et gérez les règles backend qui analysent les événements de l'Agent
  et génèrent des signaux de sécurité Workload Protection.
disable_toc: false
title: Règles de détection
---
Les règles de détection décrivent la logique backend utilisée pour détecter les menaces dans votre environnement en analysant les [événements de l'Agent][1]. Lorsqu'une règle de détection correspond, Workload Protection génère un [signal de sécurité][2] que vous pouvez examiner et auquel vous pouvez répondre dans Datadog.

Les règles de détection combinent une ou plusieurs règles de l'Agent (référencées avec `@agent.rule_id`), appliquent des méthodes de détection telles que des seuils ou des anomalies, suppriment le bruit et acheminent les alertes vers les bonnes équipes. Les règles de l'Agent collectent la télémétrie d'exécution sur le host ; les règles de détection transforment cette télémétrie en détections de menaces priorisées.

Cette page explique comment fonctionnent les règles de détection prêtes à l'emploi (OOTB) et comment créer des règles de détection personnalisées dans Datadog.

## Règles de détection OOTB {#ootb-detection-rules}

Workload Protection inclut des **règles de détection** OOTB maintenues par Datadog. Elles combinent la télémétrie collectée via les règles de l'Agent avec des expressions backend pour générer des signaux de sécurité lorsque l'activité semble suspecte. Parcourez le catalogue complet dans [règles de détection par défaut][3], ou examinez et ajustez-les dans la liste des [règles de détection][4] de Workload Protection dans Datadog.

## Créer une règle de détection personnalisée {#create-a-custom-detection-rule}

Pour créer une règle de détection personnalisée, accédez à la page [règles de détection][4] de Workload Protection et cliquez sur {{< ui >}}New Rule{{< /ui >}}. Vous pouvez également utiliser {{< ui >}}Assisted rule creator{{< /ui >}} pour configurer à la fois la règle de l'Agent et la règle de détection dans un flux unique. Voir [Créer ensemble les règles personnalisées de l'Agent et de détection](#create-the-custom-agent-and-detection-rules-together).

L'éditeur de règles vous guide à travers cinq étapes.

### Étape 1 : Définissez votre règle en temps réel {#step-1-define-your-real-time-rule}

Sélectionnez la méthode de détection que vous souhaitez utiliser :

- {{< ui >}}Threshold{{< /ui >}} : Définissez une fenêtre temporelle et le nombre d'événements correspondants requis pour déclencher un signal. Par exemple, déclenchez lorsque plus de 5 événements correspondants se produisent en moins de 5 minutes.
- {{< ui >}}New value{{< /ui >}} : Déclenchez lorsqu'un attribut suivi apparaît avec une valeur qui n'a pas été observée auparavant.
- {{< ui >}}Anomaly{{< /ui >}} : Déclenchez lorsque le volume ou le comportement d'un événement s'écarte de la ligne de base attendue.
- {{< ui >}}Content anomaly{{< /ui >}} : Déclenchez lorsque le contenu des événements correspondants est statistiquement inhabituel par rapport aux données historiques.

### Étape 2 : Définissez la requête de recherche {#step-2-define-search-query}

Définissez la requête qui sélectionne les [événements d'Agent][1] que la règle évalue. La requête de recherche détermine quels événements sont pris en compte pour décider s'il faut émettre un signal.

Vous pouvez effectuer les opérations suivantes :

- Filtrez sur des **champs spécifiques** dans les événements de l'Agent pour affiner la requête et rendre la détection plus précise. Par exemple, filtrez sur `@process.executable.path`, `@file.path` ou `@agent.rule_id`. Les règles de détection peuvent interroger n'importe quel champ du schéma d'événement backend. Consultez la [syntaxe backend Linux][13] et la [syntaxe backend Windows][14] pour obtenir l'ensemble complet des champs disponibles.
- Combinez plusieurs conditions pour limiter la règle à un sous-ensemble de votre infrastructure ou de vos charges de travail.

Pour les règles de **seuil**, définissez également la **fenêtre de rétrospection** — la période sur laquelle Datadog compte les événements correspondants avant de comparer ce nombre aux conditions de votre règle.

Utilisez l'[Agent Events Explorer][6] pour tester votre requête et valider quels événements correspondent avant de publier la règle.

### Étape 3 : Définissez les conditions de la règle {#step-3-define-rule-conditions}

Définissez les limites qui déterminent quand la règle émet un signal. Vous pouvez créer **plusieurs cas**, chacun associé à un niveau de gravité différent.

Par exemple, avec une règle de seuil, vous pourriez définir :

- {{< ui >}}Critical{{< /ui >}} lorsque plus de 10 événements correspondants se produisent en moins de 5 minutes.
- {{< ui >}}High{{< /ui >}} lorsque plus de 5 événements correspondants se produisent en moins de 5 minutes.
- {{< ui >}}Medium{{< /ui >}} lorsque plus de 2 événements correspondants se produisent en moins de 5 minutes.

Dans la section {{< ui >}}Add notify{{< /ui >}}, configurez éventuellement qui reçoit une notification lorsque la règle se déclenche. Vous pouvez ajouter des destinataires individuels ou vous appuyer sur les [règles de notification][7] pour gérer les alertes sur plusieurs règles de détection.

### Étape 4 : Décrivez votre playbook {#step-4-describe-your-playbook}

Configurez le **titre** et la **description** du signal qui apparaît lorsque vous l'ouvrez dans le [Signals Explorer][2].

1. Saisissez un {{< ui >}}Rule name{{< /ui >}}. Le nom apparaît dans la liste des règles de détection et devient le titre du signal de sécurité généré.
2. Dans la section {{< ui >}}Rule message{{< /ui >}}, utilisez des [variables de notification][8] et Markdown pour décrire ce qui s'est passé et comment les intervenants doivent agir. Les variables de modèle injectent un contexte dynamique provenant des événements de l'Agent déclencheur directement dans le signal et ses notifications.
3. Utilisez le menu déroulant {{< ui >}}Tag resulting signals{{< /ui >}} pour ajouter des tags aux signaux générés. Par exemple, `security:attack` ou `technique:T1059-command-and-scripting-interpreter`.

### Étape 5 : Créez une suppression {#step-5-create-a-suppression}

Vous pouvez ajouter une **requête de suppression** pour réduire le bruit en excluant une infrastructure ou des événements spécifiques de cette règle. Les suppressions aident à empêcher la génération de signaux lorsque l'activité correspondante est attendue ou bénigne.

Par exemple, pour exclure un utilisateur d'automatisation connu d'une règle, ajoutez une requête de suppression telle que `@usr.name:automation-bot`.

Cette étape fournit également un **aperçu du nombre d'événements correspondants** par le passé, afin que vous puissiez estimer la fréquence à laquelle la règle se serait déclenchée avant de l'enregistrer. Utilisez cet aperçu pour affiner votre requête, vos seuils ou vos suppressions et éviter un volume d'alertes excessif.

Pour plus d'informations sur les suppressions dans les règles de détection, consultez [Suppressions][9].

## Créez ensemble les règles personnalisées de l'Agent et de détection {#create-the-custom-agent-and-detection-rules-together}

Pour savoir comment les règles par défaut de l'Agent sont regroupées dans des politiques et déployées, consultez la présentation des [règles de l'Agent][10] et la [gestion des politiques][11].

Vous pouvez définir une règle de l'Agent et une règle de détection correspondantes de l'une des manières suivantes :

- {{< ui >}}Assisted rule creator{{< /ui >}} : Dans Datadog, démarrez une [règle de détection][4] Workload Protection personnalisée et utilisez l'assistant pour configurer à la fois l'expression de l'Agent et la logique de la règle de détection backend.
- {{< ui >}}Manual rule creator{{< /ui >}} : Depuis [Configuration de l'Agent][12], ouvrez ou créez une politique et choisissez {{< ui >}}Manual rule creator{{< /ui >}} pour créer d'abord la règle de l'Agent, puis ajoutez une règle de détection qui y fait référence. Pour les étapes de l'interface utilisateur et le déploiement, consultez [Gestion des politiques][11].

[1]: /fr/security/workload_protection/investigate_and_triage/agent_events
[2]: /fr/security/workload_protection/investigate_and_triage/security_signals
[3]: /fr/security/default_rules/#cat-workload-security
[4]: https://app.datadoghq.com/security/configuration/rules?product=cws
[5]: /fr/security/workload_protection/respond_and_report/#automated-response
[6]: https://app.datadoghq.com/security/agent-events
[7]: /fr/security/notifications/rules/
[8]: /fr/security/notifications/variables/
[9]: /fr/security/suppressions/
[10]: /fr/security/workload_protection/detect_and_monitor/agent_rules
[11]: /fr/security/workload_protection/detect_and_monitor/agent_rules/policy_management#create-a-custom-agent-rule
[12]: https://app.datadoghq.com/security/configuration/workload/agent-rules
[13]: /fr/security/workload_protection/backend_linux
[14]: /fr/security/workload_protection/backend_windows