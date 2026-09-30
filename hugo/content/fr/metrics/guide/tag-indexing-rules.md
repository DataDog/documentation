---
algolia:
  tags:
  - custom metrics
description: Utilisez les règles de tags pour configurer les métriques de manière
  proactive, après l'ingestion, afin d'atténuer la cardinalité élevée et d'appliquer
  une gestion cohérente des tags dans toute votre organisation.
further_reading:
- link: /account_management/billing/custom_metrics/?tab=countrate
  tag: Documentation
  text: Facturation des Custom Metrics
- link: /metrics/guide/custom_metrics_governance/
  tag: Guide
  text: Bonne pratique pour la gouvernance des métriques custom
- link: https://www.datadoghq.com/blog/metrics-without-limits/
  tag: Blog
  text: Contrôler de façon dynamique le volume de vos métriques custom grâce à Metrics
    without Limits™
title: Règles d'indexation des tags
---
## Présentation {#overview}

Les règles d'indexation des tags sont des configurations centralisées qui définissent la manière dont Datadog gère les tags de métriques lors de l'ingestion. Elles vous permettent de contrôler de manière proactive quels tags sont conservés ou exclus, aidant à réduire la cardinalité élevée en supprimant les tags inutiles et en assurant une gestion cohérente des tags dans toute votre organisation.

Les règles d'indexation des tags fonctionnent sur des groupes de métriques identifiés par nom ou par préfixe. Elles s'appliquent à la fois aux métriques existantes et aux métriques nouvellement ingérées qui correspondent aux modèles définis, réduisant le besoin de nettoyage réactif ou de modifications de code tout en permettant une gestion des coûts plus prévisible.

## Créez une règle de tag {#create-a-tag-rule}

Une fois la règle créée, Datadog l'applique automatiquement à toutes les métriques correspondantes.

1. Accédez à [{{< ui >}}Metrics → Settings{{< /ui >}}][3].
2. Cliquez sur {{< ui >}}\+ Create Rule{{< /ui >}}.
3. Sélectionnez {{< ui >}}Configure Tag Indexing Rule{{< /ui >}}.

{{< img src="metrics/guide/tag_indexing_rules/configure_tag_indexing_rule.png" alt="Le menu déroulant Create Rule dans Metrics Settings, affichant l'option Configure Tag Indexing Rule en surbrillance." style="width:50%;">}}

### Étape 1: Définissez les détails de la règle {#step-1-set-rule-details}

Saisissez un nom de règle. Utilisez un nom descriptif qui identifie clairement l'objectif de la règle.

### Étape 2: Définissez le périmètre de la règle {#step-2-define-rule-scope}

Choisissez les métriques auxquelles la règle s'applique. Définissez le périmètre de la règle avec une ou plusieurs des options suivantes :

Noms ou préfixes de métriques
: Appliquez la règle à des noms ou espaces de nommage de métriques spécifiques (par exemple, `http.*`, `db.query.*`)

Exceptions de préfixe
: Exclure des préfixes spécifiques du périmètre de la règle (par exemple, appliquer à `http.*` mais exclure `http.client.*`)

{{< img src="metrics/guide/tag_indexing_rules/define_rule_scope.png" alt="L'étape Choisir les métriques montrant une règle appliquée à http.* avec http.client.* exclu en tant que sous-préfixe." style="width:80%;">}}

Si plusieurs règles s'appliquent aux mêmes métriques, Datadog les évalue dans l'ordre. Utilisez éventuellement le comportement {{< ui >}}Override{{< /ui >}} pour remplacer les règles précédemment évaluées pour les métriques sélectionnées.

### Étape 3 : Configurer le comportement des tags {#step-3-configure-tag-behavior}

Définissez la manière dont la règle gère les tags pour les métriques concernées.

#### Fusionner ou remplacer les configurations existantes {#merge-or-override-existing-configurations}

Choisissez si cette règle s'ajoute aux configurations de tags existantes ou les remplace.
- {{< ui >}}Merge{{< /ui >}} (par défaut) : applique cette règle en plus des configurations de tags existantes. Les métriques sans configuration préalable ne sont pas affectées.
- {{< ui >}}Override{{< /ui >}} : ignore toutes les autres règles qui s'appliquent aux mêmes préfixes et applique cette règle exclusivement. Sélectionnez l'option {{< ui >}}Override all other rules that apply to these prefixes{{< /ui >}} pour activer ce comportement.

**Remarque** : utilisez le comportement **Remplacer** sur une règle plus spécifique pour empêcher l'accumulation des tags exclus d'une règle plus large. Par exemple, supposons que la Règle 1 utilise le comportement **Fusionner** pour exclure `host` de `dd.*`, et que la Règle 2 exclut `app_name` de `dd.payments.*`. Si la Règle 2 utilise également **Fusionner**, `host` et `app_name` sont tous deux supprimés des métriques `dd.payments.*`. Si la Règle 2 utilise **Remplacer**, seul `app_name` est supprimé (l'effet de la Règle 1 est annulé pour ce préfixe).

#### Appliquer aux nouvelles métriques uniquement{#apply-to-new-metrics-only}

Applique cette règle uniquement aux métriques soumises après la création de la règle. Les métriques existantes qui correspondent à la règle restent inchangées.

#### Sélectionnez les tags à inclure ou à exclure {#select-tags-to-include-or-exclude}

Choisissez d'utiliser une liste d'autorisation ou une liste de blocage pour le filtrage des tags.
- {{< ui >}}Include tags{{< /ui >}}—utilisez une liste d'autorisation des tags qui restent interrogeables.
- {{< ui >}}Exclude tags{{< /ui >}}—utilisez une liste de blocage pour définir les tags non interrogeables, ou utilisez l'utilisation des tags pour désindexer automatiquement les tags qui n'ont pas été interrogés au cours des 30, 60 ou 90 derniers jours et qui ne sont utilisés dans aucun dashboard ou autre ressource.

Ajoutez les clés de tags que vous souhaitez inclure ou exclure.

{{< img src="metrics/guide/tag_indexing_rules/configure_tag_behavior.png" alt="L'étape Choisir des tags montrant l'option Inclure les tags sélectionnée avec des clés de tags saisies." style="width:80%;">}}

Après avoir configuré le comportement des tags, l'aperçu affiche une liste des métriques affectées (jusqu'à 100 dans l'interface utilisateur).

{{< img src="metrics/guide/tag_indexing_rules/preview_affected_metrics.png" alt="Le panneau Aperçu des métriques affectées affichant une liste de métriques correspondant au périmètre de la règle." style="width:80%;">}}

### Limitations {#limitations}

- {{< ui >}}Exclude{{< /ui >}} Les règles prennent effet après que Datadog a observé un tag sur une métrique.
- Datadog évalue les règles de manière séquentielle, et chaque règle suivante complète ou remplace les configurations précédentes.
- **Âge des tags** : pour les règles utilisant l'utilisation des tags, les nouveaux tags bénéficient d'une période de grâce de 15 jours avant d'être régis par la règle.

## Modifier une règle {#modify-a-rule}

Accédez à [{{< ui >}}Metrics → Settings → Rules{{< /ui >}}][1] pour modifier les règles existantes. Une fois vos modifications effectuées, Datadog les applique automatiquement à toutes les métriques correspondantes.

### Modifier une règle {#edit-a-rule}

Sélectionnez une règle pour ouvrir son panneau de détails, puis cliquez sur {{< ui >}}Edit{{< /ui >}} pour modifier le périmètre, la sélection de tags ou le comportement de fusion et de remplacement de la règle.

{{< img src="metrics/guide/tag_indexing_rules/edit_rule_configuration.png" alt="Le panneau latéral des détails de la règle affichant le type de règle, le périmètre, l'action, les tags et les options, avec un bouton Modifier." style="width:80%;">}}

### Réorganiser les règles {#reorder-rules}

Faites glisser les règles pour modifier l'ordre d'évaluation. L'ordre d'évaluation détermine la manière dont les règles interagissent lorsque plusieurs règles s'appliquent aux mêmes métriques.

### Supprimez une règle {#delete-a-rule}

Supprimez les règles qui ne sont plus nécessaires. Lorsque vous supprimez une règle, Datadog recalcule la configuration des tags pour les métriques affectées en fonction des règles restantes.

### Règles de remplacement pour une métrique spécifique {#override-rules-for-a-specific-metric}

Pour exempter une métrique des règles de tags, ouvrez le panneau latéral des détails de la métrique dans Metrics Summary, sélectionnez {{< ui >}}Configure This Metric Individually{{< /ui >}}, et configurez la métrique pour conserver tous les tags. La conservation de tous les tags contourne toutes les règles de tags pour cette métrique sans modifier les règles elles-mêmes.

Pour réappliquer les règles, restaurez la configuration par défaut de la métrique depuis le même panneau.

## Priorité des règles {#rule-precedence}

Lorsque plusieurs règles s'appliquent aux mêmes métriques, Datadog les évalue séquentiellement. L'ordre des règles est important car :

- Les règles situées plus bas dans l'ordre d'évaluation modifient les résultats des règles précédentes
- {{< ui >}}Override{{< /ui >}} le comportement écrase les configurations précédentes pour les métriques correspondantes
- {{< ui >}}Merge{{< /ui >}} le comportement s'appuie sur les configurations existantes
- Lorsque plusieurs règles utilisent le comportement {{< ui >}}Override{{< /ui >}}, la dernière règle appliquée détermine si la configuration finale est en mode inclusion ou exclusion

Réorganisez les règles sur la [page Règles][1] pour modifier la règle qui prévaut. Consultez les exemples suivants pour comprendre comment différents ordres produisent des résultats différents.

## Exemples de priorité {#precedence-examples}

### Exemple 1 : Comportement de fusion et de remplacement {#example-1-merge-and-override-behavior}

Les règles de tags peuvent soit remplacer une configuration existante, soit fusionner avec celle-ci. Le choix détermine si une règle réinitialise la configuration des tags ou s'appuie sur ce qui existe déjà.

Tags de départ :  
`host`, `env`, `service`, `team`

{{< img src="metrics/guide/tag_indexing_rules/merge_vs_override.png" alt="Diagramme montrant deux règles appliquées aux métriques : la règle 1 exclut env de toutes les métriques en utilisant Override, et la règle 2 inclut env pour les métriques infra en utilisant Merge." style="width:100%;">}}

**Aperçu clé** : Le tag `env` est rajouté uniquement aux métriques `infra.*`.

### Exemple 2 : Ordre des règles {#example-2-rule-order}

Lorsque plusieurs règles s'appliquent aux mêmes métriques, Datadog les évalue dans l'ordre. Les règles exécutées plus tard peuvent affiner ou remplacer les effets des règles précédentes.

Tags de départ :  
`host`, `env`, `service`

Dans cet exemple, la règle 2 utilise une configuration {{< ui >}}Include{{< /ui >}}, qui agit comme une liste d'autorisation. Seuls les tags listés sont conservés ; tout tag non listé est supprimé.

#### Ordre 1 : Règle spécifique en premier {#order-1-specific-rule-first}

{{< img src="metrics/guide/tag_indexing_rules/rule_order_1.png" alt="Diagramme montrant la règle spécifique évaluée en premier : la règle 1 exclut host des métriques infra.server, puis la règle 2 inclut host pour toutes les métriques infra, restaurant ainsi le tag." style="width:100%;">}}

**Aperçu clé** : La règle 1 supprime le tag `host`, puis la règle 2 rajoute le tag `host`.

#### Ordre 2 : Règle générale en premier {#order-2-general-rule-first}

{{< img src="metrics/guide/tag_indexing_rules/rule_order_2.png" alt="Diagramme montrant la règle générale évaluée en premier : la règle 1 inclut host pour toutes les métriques infra, puis la règle 2 exclut host des métriques infra.server, supprimant ainsi le tag." style="width:100%;">}}

**Aperçu clé** : Le tag `host` est supprimé en dernier et reste supprimé.

### Exemple 3 : Exception à une règle générale {#example-3-exception-to-a-broad-rule}

Utilisez une règle générale avec un comportement {{< ui >}}Override{{< /ui >}} pour exclure un tag globalement, puis utilisez une règle ciblée avec un comportement {{< ui >}}Merge{{< /ui >}} pour restaurer le tag pour des métriques spécifiques.

Tags de départ :
`node`, `env`, `pod`

{{< img src="metrics/guide/tag_indexing_rules/broad_exclude_narrow_exception.png" alt="Diagramme montrant une règle Override générale excluant pod de toutes les métriques kube, puis une règle Merge étroite incluant pod pour les métriques kube.node, préservant tous les tags d'origine." style="width:100%;">}}

**Aperçu clé** : Lorsqu'une exclusion générale et une inclusion étroite s'annulent pour une métrique, aucune restriction de tag n'est appliquée et tous les tags d'origine sont préservés.

### Exemple 4 : Exceptions multiples à une règle générale {#example-4-multiple-exceptions-to-a-broad-rule}

Superposez plusieurs règles avec un comportement {{< ui >}}Merge{{< /ui >}} sur une règle générale avec un comportement {{< ui >}}Override{{< /ui >}} pour restaurer différents tags pour différents préfixes de métriques. Les métriques correspondant à des préfixes plus spécifiques accumulent davantage de restaurations.

Tags de départ :
`team`, `pod`, `env`

{{< img src="metrics/guide/tag_indexing_rules/multiple_exceptions.png" alt="Diagramme montrant une règle Override générale excluant tous les tags, puis deux règles Merge restaurent différents tags pour différents préfixes, les métriques correspondant aux deux préfixes voient les deux ensembles de tags restaurés." style="width:100%;">}}

**Aperçu clé** : Les règles d'inclusion multiples avec un comportement {{< ui >}}Merge{{< /ui >}} appliquées après une exclusion générale avec un comportement {{< ui >}}Override{{< /ui >}} sont additives (une métrique correspondant à deux préfixes d'exception voit les deux ensembles de tags restaurés).

## Metrics without Limits™ compatibilité {#metrics-without-limits-compatibility}

Les configurations par métrique [Metrics without Limits™][2] (MWL) existantes prévalent sur les règles d'indexation de tags et agissent comme des exemptions. Tant qu'une exemption reste active, la métrique n'est affectée par aucune règle d'indexation de tags.

Vous pouvez examiner et supprimer ces exemptions depuis la page Règles d'indexation de tags. Datadog classe chaque exemption comme suit :

- **Suppression sans risque** : D'après l'analyse de Datadog des règles d'indexation de tags de votre compte, la suppression de l'exemption devrait réduire votre utilisation de métriques personnalisées.
- **Examen nécessaire** : La suppression de l'exemption peut affecter votre utilisation de métriques personnalisées, ou vos règles d'indexation de tags pourraient ne pas conserver tous les tags inclus dans la configuration MWL existante. Examinez ces exemptions avec soin pour éviter de rompre les dashboards, les monitors ou d'autres ressources qui dépendent de ces tags.

Les exemptions s'appliquent à l'ensemble du compte, et non à des règles d'indexation de tags individuelles. La suppression de l'exemption d'une métrique pour une règle la supprime automatiquement de toutes les règles d'indexation de tags de votre compte. La métrique est ensuite évaluée par rapport à vos règles d'indexation de tags en fonction de leur ordre actuel.

## Lectures complémentaires {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/metric/settings/policies
[2]: /fr/metrics/metrics-without-limits/
[3]: https://app.datadoghq.com/metric/settings