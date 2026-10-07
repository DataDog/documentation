---
disable_toc: false
further_reading:
- link: https://www.datadoghq.com/blog/ai-powered-log-parsing
  tag: Blog
  text: Accélérez les enquêtes grâce au parsing des logs optimisé par l'IA
- link: /logs/explorer/calculated_fields/formulas
  tag: Documentation
  text: Formules de champs calculés
- link: /logs/explorer/calculated_fields/extractions
  tag: Documentation
  text: Parsing par extraction Grok
- link: /logs/explorer/
  tag: Documentation
  text: Log Explorer
- link: https://www.datadoghq.com/blog/calculated-fields-log-management-datadog/
  tag: Blog
  text: Transformez et enrichissez vos logs au moment de la requête avec les champs
    calculés
- link: https://learn.datadoghq.com/courses/enhance-log-querying
  tag: Centre d'apprentissage
  text: Améliorez l'interrogation et l'analyse des logs avec des tableaux de référence,
    des sous-requêtes et des champs calculés
title: Champs calculés
---
<div class="alert alert-info">Pour la syntaxe, les opérateurs et les fonctions, consultez <a href="/logs/explorer/calculated_fields/formulas">Formules</a></div>

## Présentation {#overview}

Les champs calculés vous permettent de transformer et d'enrichir vos données de logs au **moment de la requête**. Il se comporte comme n'importe quel autre [attribut de log][1] et peut être utilisé pour la recherche, l'agrégation, la visualisation ou même pour définir des champs calculés supplémentaires.

Il existe deux types de champs calculés : **Extractions** et **Formules**. Ils partagent les propriétés suivantes :

- Ils sont **temporaires** et ne persistent pas au-delà de votre session Log Explorer.
- Ils sont **limités à l'utilisateur** et ne sont visibles que par vous.
- Ils sont idéaux pour **l'analyse rétroactive**, car ils peuvent être appliqués à des logs déjà indexés.
- Ils doivent être référencés avec le préfixe `#` lorsqu'ils sont utilisés dans des requêtes, des agrégations ou d'autres champs calculés.
- Vous pouvez définir jusqu'à **cinq** champs calculés à la fois.

## Quand utiliser les champs calculés {#when-to-use-calculated-fields}

Utilisez les champs calculés dans les scénarios suivants :

- Lorsque vous avez besoin d'un champ temporaire pour une enquête ou une analyse à court terme.
- Lorsque vous devez analyser rétroactivement des logs indexés (les modifications de pipelines n'affectent que les logs ingérés après la mise à jour).
- Lorsque vous n'avez pas l'autorisation ou l'expertise nécessaire pour modifier rapidement les pipelines de logs.
- Lorsque vous souhaitez qu'un champ calculé ne soit visible que par vous, utile pour une exploration rapide et une expérimentation à faible risque.

Si vous trouvez qu'un champ calculé est utile à long terme, mettez à jour vos [pipelines de logs][2] afin que votre équipe bénéficie d'un traitement automatisé.

## Créer un champ calculé {#create-a-calculated-field}

Vous pouvez créer un champ calculé à partir de deux points d'entrée dans le Log Explorer : depuis le menu {{< ui >}}Add{{< /ui >}} ou depuis un événement de log ou un attribut spécifique.

### Depuis le menu Add {#from-the-add-menu}

1. Accédez au [Log Explorer][5].
1. Cliquez sur le bouton {{< ui >}}Add{{< /ui >}} à côté de la barre de recherche.
1. Sélectionnez {{< ui >}}Calculated field{{< /ui >}}.

Ceci est utile lorsque vous connaissez déjà la structure et le contenu des logs et que vous souhaitez définir rapidement une formule ou une règle de parsing.

### À partir d'un événement de log ou d'un attribut spécifique {#from-a-specific-log-event-or-attribute}

1. Accédez au [Log Explorer][5].
1. Cliquez sur un événement de log pour ouvrir le panneau latéral.
1. Sélectionnez un attribut JSON pour ouvrir le menu contextuel.
1. Choisissez {{< ui >}}Create calculated from...{{< /ui >}}.

{{< img src="/logs/explorer/calculated_fields/add_calculated_field_side_panel.png" alt="Création d'un champ calculé à partir du panneau latéral des logs dans le Log Explorer" style="width:70%;" >}}

Cette approche est utile pour les extractions, car elle fournit un échantillon de log concret pour créer une règle de parsing.

## Types de champs calculés {#types-of-calculated-fields}

### Formule {#formula}

Les champs de formule utilisent des formules de champs calculés pour calculer de nouvelles valeurs à partir d'attributs existants. Vous pouvez effectuer les opérations suivantes :
- Manipuler des valeurs textuelles.
- Effectuez des calculs arithmétiques sur des attributs numériques.
- Évaluez la logique conditionnelle.

Par exemple :

```
#latency_gap = @client_latency - @server_latency
```

Pour une liste complète de la syntaxe, des opérateurs et des fonctions pris en charge, consultez [Formules][3].

### Extraction {#extraction}

L'extraction capture des valeurs à partir de messages de log bruts ou d'attributs en utilisant un modèle Grok ou une expression régulière. Vous pouvez utiliser Tap to Parse pour générer l'un ou l'autre automatiquement, ou définir manuellement votre propre modèle Grok ou expression régulière. Utilisez l'extraction pour :
- Capturer des valeurs à partir de messages de log bruts.
- Extraire rétroactivement des attributs de logs déjà indexés sans modifier les pipelines.
- Testez sur des exemples de logs.

Par exemple, vous pouvez extraire les trois premiers mots d'un message dans des champs distincts :

```
%{word:first} %{word:second} %{word:third}
```

Les règles d'extraction sont évaluées globalement sur tous les logs de votre session. Pour plus de détails et d'exemples de syntaxe, consultez [Extractions][4].

## Utilisation de champs calculés {#using-calculated-fields}

Une fois que vous avez créé un champ calculé, le Log Explorer se met à jour instantanément pour vous montrer les nouvelles données et vous fournir des outils pour interagir avec elles. Les champs calculés fonctionnent comme des attributs de log et peuvent être utilisés pour la recherche, l'agrégation, la visualisation ou la définition d'autres champs calculés. Utilisez toujours le préfixe `#` lorsque vous faites référence à un champ calculé.

- **Ligne d'en-tête** : Une nouvelle ligne apparaît sous la barre de recherche, affichant tous les champs calculés actifs. Survolez pour afficher la définition complète, ou utilisez les actions rapides pour modifier, filtrer par ou grouper par le champ.
- **Visualisation en liste** : Dans la vue [List][6], une colonne pour le champ calculé est automatiquement ajoutée.
- **Panneau latéral des logs** : les champs calculés sont regroupés dans une section dédiée lorsque vous inspectez un log.

{{< img src="logs/explorer/calculated_fields/calculated_field.png" alt="Un champ calculé appelé request_duration, utilisé pour filtrer les résultats dans le Log Explorer." style="width:100%;" >}}


## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/logs/log_configuration/attributes_naming_convention/
[2]: /fr/logs/log_configuration/pipelines/?tab=source
[3]: /fr/logs/explorer/calculated_fields/formulas/
[4]: /fr/logs/explorer/calculated_fields/extractions
[5]: https://app.datadoghq.com/logs
[6]: /fr/logs/explorer/visualize/#lists