---
algolia:
  tags:
  - custom metrics
description: Utilisez les règles de tags pour configurer les métriques de manière
  proactive, après ingestion, afin de pouvoir atténuer la haute cardinalité et d'appliquer
  une gestion cohérente des tags au sein de votre organisation.
further_reading:
- link: /account_management/billing/custom_metrics/?tab=countrate
  tag: Documentation
  text: Facturation des métriques custom
- link: /metrics/guide/custom_metrics_governance/
  tag: Guide
  text: Bonne pratique pour la gouvernance des métriques custom
- link: https://www.datadoghq.com/blog/metrics-without-limits/
  tag: Blog
  text: Contrôler de façon dynamique le volume de vos métriques custom grâce à Metrics
    without Limits™
title: Règles d'indexation des tags
---
## Aperçu {#overview}

Les règles d'indexation des tags sont des configurations centralisées qui définissent comment Datadog gère les tags de métriques lors de l'ingestion. Elles vous permettent de contrôler de manière proactive quels tags sont conservés ou exclus, contribuant ainsi à réduire la haute cardinalité en supprimant les tags inutiles et en garantissant un taggage cohérent au sein de votre organisation.

Les règles d'indexation des tags s'appliquent à des groupes de métriques identifiés par nom ou préfixe. Elles s'appliquent à la fois aux métriques existantes et à celles nouvellement ingérées qui correspondent aux modèles définis, réduisant ainsi le besoin de nettoyage réactif ou de modifications de code tout en permettant une gestion des coûts plus prévisible.

## Créer une règle de tag {#create-a-tag-rule}

Après avoir créé une règle, Datadog l'applique automatiquement à toutes les métriques correspondantes.

1. Accédez à [**Métriques → Paramètres**][3].
2. Cliquez sur **+ Créer une règle**.
3. Sélectionnez **Configurer la règle d'indexation des tags**.

{{< img src="metrics/guide/tag_indexing_rules/configure_tag_indexing_rule.png" alt="Le menu déroulant Créer une règle dans les paramètres des métriques, montrant l'option Configurer la règle d'indexation des tags mise en surbrillance." style="width:50%;">}}

### Étape 1: Définir les détails de la règle {#step-1-set-rule-details}

Entrez un nom de règle. Utilisez un nom descriptif qui identifie clairement l'objectif de la règle.

### Étape 2: Définir le champ d'application de la règle {#step-2-define-rule-scope}

Choisissez à quelles métriques la règle s'applique. Définissez le champ d'application de la règle avec une ou plusieurs des options suivantes :

Noms ou préfixes de métriques
Appliquez la règle à des noms de métriques ou des espaces de noms spécifiques (par exemple, `http.*`, `db.query.*`)

Exceptions de préfixe
Excluez des préfixes spécifiques du champ d'application de la règle (par exemple, appliquez à `http.*` mais excluez `http.client.*`)

{{< img src="metrics/guide/tag_indexing_rules/define_rule_scope.png" alt="L'étape Choisir les métriques montrant une règle limitée à http.* avec http.client.* exclu en tant que sous-préfixe." style="width:80%;">}}

Si plusieurs règles s'appliquent aux mêmes métriques, Datadog les évalue dans l'ordre. Optionnellement, utilisez le comportement **Remplacer** pour remplacer les règles précédemment évaluées pour les métriques sélectionnées.

### Étape 3 : Configurer le comportement des tags {#step-3-configure-tag-behavior}

Définissez comment la règle gère les tags pour les métriques concernées.

#### Fusionner ou remplacer les configurations existantes {#merge-or-override-existing-configurations}

Choisissez si cette règle s'appuie sur ou remplace les configurations de tags existantes.
- **Fusionner** (par défaut) — applique cette règle par-dessus les configurations de tags existantes. Les métriques sans configuration préalable ne sont pas affectées.
- **Remplacer** — ignore toutes les autres règles qui s'appliquent aux mêmes préfixes et impose cette règle exclusivement. Sélectionnez l'option **Remplacer toutes les autres règles qui s'appliquent à ces préfixes** pour activer ce comportement.

**Remarque** : Utilisez le comportement **Override** sur une règle plus étroite pour empêcher les tags exclus d'une règle plus large de s'accumuler. Par exemple, supposons que la Règle 1 utilise le comportement **Merge** pour exclure `host` de `dd.*`, et que la Règle 2 exclut `app_name` de `dd.payments.*`. Si la Règle 2 utilise également **Merge**, `host` et `app_name` sont tous deux supprimés des métriques `dd.payments.*`. Si la Règle 2 utilise **Override**, seul `app_name` est supprimé (l'effet de la Règle 1 est remplacé pour ce préfixe).

#### Appliquer uniquement aux nouvelles métriques {#apply-to-new-metrics-only}

Applique cette règle uniquement aux métriques soumises après la création de la règle. Les métriques existantes qui correspondent à la règle restent inchangées.

#### Sélectionnez les tags à inclure ou à exclure {#select-tags-to-include-or-exclude}

Choisissez d'utiliser une liste d'autorisation ou une liste de blocage pour le filtrage des tags.
- **Inclure des tags**—utilisez une liste d'autorisation de tags qui restent interrogeables.
- **Exclure des tags**—utilisez une liste de blocage pour définir les tags non interrogeables.

Ajoutez les clés de tags que vous souhaitez inclure ou exclure.

{{< img src="metrics/guide/tag_indexing_rules/configure_tag_behavior.png" alt="L'étape Choisir des tags montrant l'option Inclure des tags sélectionnée avec les clés de tags saisies." style="width:80%;">}}

Après avoir configuré le comportement des tags, l'aperçu montre une liste des métriques affectées (jusqu'à 100 dans l'interface utilisateur).

{{< img src="metrics/guide/tag_indexing_rules/preview_affected_metrics.png" alt="Le panneau d'aperçu des métriques affectées montrant une liste de métriques correspondant à la portée de la règle." style="width:80%;">}}

### Limitations {#limitations}

- **Les règles**Exclude prennent effet après que Datadog observe un tag sur une métrique.
- Datadog évalue les règles de manière séquentielle, et chaque règle suivante s'appuie sur ou remplace les configurations antérieures.

## Modifier une règle {#modify-a-rule}

Naviguez vers [**Métriques → Paramètres → Règles**][1] pour modifier les règles existantes. Après avoir apporté des modifications, Datadog les applique automatiquement à toutes les métriques correspondantes.

### Modifier une règle {#edit-a-rule}

Sélectionnez une règle pour ouvrir son panneau de détails, puis cliquez sur **Edit** pour changer la portée de la règle, la sélection des tags ou le comportement de fusion et de remplacement.

{{< img src="metrics/guide/tag_indexing_rules/edit_rule_configuration.png" alt="Le panneau latéral des détails de la règle montrant le type de règle, la portée, l'action, les tags et les options, avec un bouton Edit." style="width:80%;">}}

### Réorganiser les règles {#reorder-rules}

Faites glisser les règles pour changer l'ordre d'évaluation. L'ordre d'évaluation détermine comment les règles interagissent lorsque plusieurs règles s'appliquent aux mêmes métriques.

### Supprimer une règle {#delete-a-rule}

Supprimez les règles qui ne sont plus nécessaires. Lorsque vous supprimez une règle, Datadog recalcule la configuration des tags pour les métriques concernées en fonction des règles restantes.

### Remplacer les règles pour une métrique spécifique {#override-rules-for-a-specific-metric}

Pour exempter une métrique des règles de balises, ouvrez le panneau latéral des détails de la métrique dans le Résumé des métriques, sélectionnez **Configurer Cette Métrique Individuellement**, et définissez la métrique pour conserver toutes les balises. Conserver toutes les balises contourne toutes les règles de balises pour cette métrique sans modifier les règles elles-mêmes.

Pour réappliquer les règles, restaurez la configuration par défaut de la métrique depuis le même panneau.

## Priorité des règles {#rule-precedence}

Lorsque plusieurs règles s'appliquent aux mêmes métriques, Datadog les évalue séquentiellement. L'ordre des règles est important car :

- Les règles situées plus bas dans l'ordre d'évaluation modifient les résultats des règles précédentes
Le comportement de - **Remplacement** écrase les configurations précédentes pour les métriques correspondantes
Le comportement de - **Fusion** s'appuie sur les configurations existantes
- Lorsque plusieurs règles utilisent le comportement de **Remplacement**, la dernière règle appliquée détermine si la configuration finale est en mode inclusion ou exclusion

Réorganisez les règles sur la [page des règles][1] pour changer quelle règle a la priorité. Consultez les exemples suivants pour comprendre comment différents ordres produisent des résultats différents.

## Exemples de priorité {#precedence-examples}

### Exemple 1 : Comportement de Fusion et de Remplacement {#example-1-merge-and-override-behavior}

Les règles de tags peuvent soit remplacer une configuration existante, soit fusionner avec elle. Le choix détermine si une règle réinitialise la configuration des balises ou s'appuie sur ce qui existe déjà.

Balises de départ :  
`host`, `env`, `service`, `team`

{{< img src="metrics/guide/tag_indexing_rules/merge_vs_override.png" alt="Diagramme montrant deux règles appliquées aux métriques : La règle 1 exclut env de toutes les métriques en utilisant Override, et la règle 2 inclut env pour les métriques infra en utilisant Merge." style="width:100%;">}}

**Information clé** : La balise `env` est réajoutée uniquement aux métriques `infra.*`.

### Exemple 2 : Ordre des règles {#example-2-rule-order}

Lorsque plusieurs règles s'appliquent aux mêmes métriques, Datadog les évalue dans l'ordre. Les règles qui s'exécutent plus tard peuvent affiner ou remplacer les effets des règles précédentes.

Balises de départ :  
`host`, `env`, `service`

Dans cet exemple, la règle 2 utilise une configuration **Inclure**, qui agit comme une liste autorisée. Seules les balises répertoriées sont conservées ; toute balise non répertoriée est supprimée.

#### Ordre 1 : Règle spécifique d'abord {#order-1-specific-rule-first}

{{< img src="metrics/guide/tag_indexing_rules/rule_order_1.png" alt="Diagramme montrant la règle spécifique évaluée en premier : La règle 1 exclut l'hôte des métriques infra.server, puis la règle 2 inclut l'hôte pour toutes les métriques infra, restaurant la balise." style="width:100%;">}}

**Information clé** : La règle 1 supprime la balise `host`, puis la règle 2 la réajoute `host`.

#### Ordre 2 : Règle générale d'abord {#order-2-general-rule-first}

{{< img src="metrics/guide/tag_indexing_rules/rule_order_2.png" alt="Diagramme montrant la règle générale évaluée en premier : La règle 1 inclut l'hôte pour toutes les métriques infra, puis la règle 2 exclut l'hôte des métriques infra.server, supprimant la balise." style="width:100%;">}}

**Point clé** : La balise `host` est supprimée en dernier et reste supprimée.

### Exemple 3 : Exception à une règle générale {#example-3-exception-to-a-broad-rule}

Utilisez une règle générale avec un comportement **Override** pour exclure une balise globalement, puis utilisez une règle ciblée avec un comportement **Merge** pour restaurer la balise pour des métriques spécifiques.

Balises de départ :
`node`, `env`, `pod`

{{< img src="metrics/guide/tag_indexing_rules/broad_exclude_narrow_exception.png" alt="Diagramme montrant une règle d'Override large excluant le pod de toutes les métriques kube, puis une règle de Merge étroite incluant le pod pour les métriques kube.node, préservant tous les tags originaux." style="width:100%;">}}

**Point clé** : Lorsqu'une exclusion large et une inclusion étroite s'annulent pour une métrique, aucune restriction de tag n'est appliquée et tous les tags originaux sont préservés.

### Exemple 4 : Plusieurs exceptions à une règle générale {#example-4-multiple-exceptions-to-a-broad-rule}

Superposez plusieurs règles avec un comportement de **Merge** au-dessus d'une règle générale avec un comportement d'**Override** pour restaurer différents tags pour différents préfixes de métriques. Les métriques correspondant à des préfixes plus spécifiques accumulent plus de restaurations.

Balises de départ :
`team`, `pod`, `env`

{{< img src="metrics/guide/tag_indexing_rules/multiple_exceptions.png" alt="Diagramme montrant une règle d'Override générale excluant tous les tags, puis deux règles de Merge restaurent différents tags pour différents préfixes, avec des métriques correspondant aux deux préfixes recevant les deux ensembles de tags restaurés." style="width:100%;">}}

**Point clé** : Plusieurs règles d'inclusion avec un comportement de **Merge**, appliquées après une règle d'exclusion avec un comportement d'**Override**, se cumulent (une métrique correspondant à deux préfixes d'exception reçoit les deux ensembles de tags restaurés).

## Compatibilité Metrics without Limits™ {#metrics-without-limits-compatibility}

Les règles de tag ne remplacent pas automatiquement les configurations par métrique existantes [Metrics without Limits™][2] (MWL). Les configurations MWL existantes ont la priorité, et Datadog les préserve lorsque vous créez ou modifiez des règles de tag.

Si la configuration MWL d'une métrique est supprimée, les règles de tag s'appliquent automatiquement à cette métrique en fonction de l'ordre actuel des règles.

Pour exclure une métrique spécifique de toutes les règles de tag sans les supprimer, utilisez le panneau latéral des détails de la métrique pour conserver tous les tags. Pour réappliquer les règles, restaurez la configuration par défaut de la métrique depuis le même panneau.

## Lectures complémentaires {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/metric/settings/policies
[2]: /fr/metrics/metrics-without-limits/
[3]: https://app.datadoghq.com/metric/settings