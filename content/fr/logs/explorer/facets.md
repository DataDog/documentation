---
algolia:
  tags:
  - log facets
aliases:
- /fr/logs/facets
description: Facettes de log et volet des facettes
further_reading:
- link: logs/explorer/analytics
  tag: Documentation
  text: Effectuer des analyses de logs
- link: logs/explorer/patterns
  tag: Documentation
  text: Détecter les modèles dans vos logs
- link: /logs/log_configuration/processors
  tag: Documentation
  text: Apprendre à traiter vos logs
- link: logs/explorer/saved_views
  tag: Documentation
  text: Configurer automatiquement votre vue Log Explorer
- link: https://learn.datadoghq.com/courses/log-explorer
  tag: Centre d'apprentissage
  text: Commencer avec Log Explorer
title: Facettes de log
---
{{< img src="logs/explorer/facet/facets_in_explorer.mp4" alt="Facets in Explorer Facet" video=true style="width:100%;">}}

## Aperçu {#overview}

Les facettes sont des étiquettes et des attributs définis par l'utilisateur à partir de vos logs indexés. Elles sont destinées à l'analyse des données qualitatives ou quantitatives. Ainsi, vous pouvez les utiliser dans votre Log Explorer pour :

- [Rechercher dans vos logs][1]
- [Définir des modèles de logs][2]
- [Effectuer des analyses de logs][3]

Grâce aux facettes, vous pouvez également manipuler vos logs dans vos [log monitors][4], dans les widgets de logs des [dashboards][5] ainsi que dans les [notebooks][6].

**Remarque** : Vous n'avez pas besoin de facettes pour supporter [log processing][7], [livetail search][8], [log explorer search][9], [metric generation][10] à partir des logs, [archive forwarding][11] ou [rehydration][12]. Vous n'avez également pas besoin de facettes pour acheminer les logs vers [Pipelines][13] et [Indexes][14] avec des filtres, ou pour exclure ou échantillonner des logs des indexes avec [exclusion filters][15]. 

Pour ces cas d'utilisation, les fonctionnalités de remplissage automatique reposent sur des facettes existantes. Cependant, vous pouvez également saisir des valeurs correspondant aux logs entrants.

### Facettes qualitatives {#qualitative-facets}

#### Dimensions {#dimensions}

Les facettes qualitatives vous permettent d'accomplir les tâches suivantes :

- Pour **obtenir des insights relatifs** aux valeurs. Par exemple, créez une facette sur `http.network.client.geoip.country.iso_code` pour voir les pays les plus impactés par le nombre d'erreurs 5XX sur vos logs d'accès web [NGINX][16], enrichis avec le Datadog [GeoIP Processor][17].
- Pour **compter les valeurs uniques**. Par exemple, créez une facette sur `user.email` à partir de vos logs [Kong][18] pour savoir combien d'utilisateurs se connectent chaque jour à votre site web.
- Pour **filtrer fréquemment vos logs selon des valeurs particulières.** Par exemple, créez une facette sur un `environment`[tag][19] pour restreindre le dépannage aux environnements de développement, staging ou production.

**Remarque** : Bien qu'il ne soit pas nécessaire de créer des facettes pour filtrer sur les valeurs d'attribut, les définir sur des attributs que vous utilisez souvent lors des enquêtes peut aider à réduire votre temps de résolution.

#### Types {#types}

Les facettes qualitatives peuvent avoir un type chaîne ou numérique (entier). Bien que l'attribution d'un type chaîne à une dimension fonctionne dans tous les cas, l'utilisation de types entiers sur une dimension permet un filtrage par plage sur toutes les capacités mentionnées ci-dessus. Par exemple, `http.status_code:[200 TO 299]` est une requête valide à utiliser sur une dimension de type entier. Voir [la syntaxe de recherche][1] pour référence.

### Facettes quantitatives {#quantitative-facets}
#### Mesures {#measures}

Les mesures vous permettent d'accomplir les tâches suivantes :

- Pour **agréger des valeurs** provenant de plusieurs logs. Par exemple, créez une mesure sur la taille des tuiles servies par le [cache Varnish][20] d'un serveur de cartes et suivez le **débit** moyen quotidien, ou les référents les plus importants par **somme** de la taille des tuiles demandées.
- Pour **appliquer un filtre de plage** à vos logs. Par exemple, créez une mesure sur le temps d'exécution des tâches [Ansible][21] et affichez la liste des serveurs ayant le plus d'exécutions prenant plus de 10s.
- Pour **trier les logs** par rapport à cette valeur. Par exemple, créez une mesure sur le montant des paiements effectués avec votre microservice [Python][22]. Vous pouvez ensuite rechercher tous les logs, en commençant par celui avec le montant le plus élevé.

#### Types {#types-1}

Les mesures disposent d'un entier (long) ou d'une double valeur. Ces deux types proposent des fonctionnalités équivalentes.

#### Unités {#units}

Les mesures prennent en charge les unités de **temps** ou de **taille** pour faciliter la gestion des ordres de grandeur lors de l'exécution des requêtes et de l'affichage.

| type        | unité(s)                                                                                                                                                                                                                                                                                                                    |
|-------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| BYTES       | bit / byte / kibibyte / mebibyte / gibibyte / tebibyte / pebibyte / exbibyte                                                                                                                                                                                                                                               |
| TIME        | nanosecond / microsecond / millisecond / second / minute / hour / day / week                                                                                                                                                                                                                                               |

L'unité est une propriété de la mesure elle-même, et non du champ. Par exemple, considérons une mesure de `duration` en nanosecondes : vous avez des journaux de `service:A` où `duration:1000` représente 1000 millisecondes, et d'autres journaux de `service:B` où `duration:500` représente 500 microsecondes :

1. Mettez à l'échelle la durée en nanosecondes pour tous les logs entrants avec le [arithmetic processor][23]. `*1000000`Utilisez un multiplicateur sur les logs de `service:A`, et `*1000` un multiplicateur sur les logs de `service:B`.
2. Utilisez `duration:>20ms` (voir [search syntax][1] pour référence) pour interroger de manière cohérente les logs des deux services à la fois, et voir un résultat agrégé de max `1 min`.

## Facet panel {#facet-panel}

La barre de recherche fournit l'ensemble d'interactions le plus complet pour filtrer et regrouper vos données. Cependant, dans la plupart des cas, le Facet panel est probablement un moyen plus simple de naviguer dans vos données. Ouvrez une facette pour voir un résumé de son contenu pour le périmètre de la requête actuelle.

**Facets (qualitative)** viennent avec une liste des valeurs uniques, et un compte des logs correspondant à chacune d'elles :

{{< img src="logs/explorer/facet/dimension_facet.png" alt="Dimension Facet" style="width:30%;">}}

Ciblez la requête de recherche en cliquant sur l'une ou l'autre valeur. Cliquer sur une valeur active la recherche sur cette valeur unique et toutes les valeurs. Cliquer sur des cases à cocher ajoute ou retire cette valeur spécifique de la liste de toutes les valeurs, vous pouvez également rechercher son contenu :

{{< img src="logs/explorer/facet/dimension_facet_wildcard.png" alt="Autocomplétion de facette" style="width:30%;">}}

**Mesures** viennent avec un curseur indiquant les valeurs minimales et maximales. Utilisez le curseur, ou saisissez des valeurs numériques, pour cibler la requête de recherche à différentes limites.

{{< img src="logs/explorer/facet/measure_facet.png" alt="Measures facet" style="width:30%;">}}

### Hide facets {#hide-facets}

Votre organisation dispose d'une collection complète de facettes pour répondre à son ensemble complet de cas d'utilisation à travers toutes les différentes équipes utilisant des journaux. Cependant, il est probable qu'un sous-ensemble de ces facettes soit précieux pour vous dans un contexte de dépannage spécifique. Masquez les facettes dont vous n'avez pas besoin de manière routinière, afin de ne conserver que les facettes les plus pertinentes pour vos sessions de dépannage.
1. Dans le [Logs Explorer][30], trouvez la facette que vous souhaitez masquer.
1. Cliquez sur l'icône en forme de rouage à côté de la facette.
1. Sélectionnez {{< ui >}}Hide Facet{{< /ui >}}.

Les facettes masquées sont toujours visibles dans la recherche de facettes (voir la section [Filter Facet](#filter-facets)) au cas où vous en auriez besoin. Démasquez les facettes masquées à partir de là.


Les facettes masquées sont également invisibles dans l'auto-complétion de la barre de recherche et dans les menus déroulants (tels que measure, group-by) dans l'analyse pour le Log Explorer. Cependant, les facettes masquées sont toujours valides pour les requêtes de recherche (au cas où vous copieriez-collez un lien log-explorer par exemple).

Les facettes masquées n'ont aucun impact en dehors du Log Explorer (par exemple, le suivi en direct, les moniteurs ou les définitions de widgets dans les tableaux de bord).

#### Hidden facets and teammates {#hidden-facets-and-teammates}

Masquer des facettes est spécifique à votre propre contexte de dépannage et n'impacte pas la vue de vos coéquipiers, sauf si vous mettez à jour un [Saved View][24]. Les facettes masquées font partie du contexte enregistré dans un Saved View.

### Group facets {#group-facets}

Les facets sont regroupés en thèmes significatifs pour faciliter la navigation dans la liste des facets. L'attribution ou la réattribution d'un groupe à un facet n'affecte que l'affichage dans la liste des facets et n'a aucun impact sur les capacités de recherche et d'analyse.

{{< img src="logs/explorer/facet/group_facets.png" alt="Group Facet" style="width:30%;">}}

Pour regrouper des facettes :

1. Cliquez sur le rouage pour le facet.
2. Sélectionnez {{< ui >}}Edit facet{{< /ui >}}.
3. Cliquez sur la section {{< ui >}}Advanced options{{< /ui >}} pour l'agrandir.
4. Dans le {{< ui >}}Group{{< /ui >}} champ, entrez le nom du groupe dans lequel vous souhaitez que le facet se trouve.
5. Cliquez sur {{< ui >}}Update{{< /ui >}}.

### Filter facets {#filter-facets}

Utilisez la zone de recherche sur les facets pour réduire la liste complète des facets et naviguer plus rapidement vers celle avec laquelle vous devez interagir. Facet search utilise à la fois le facet display name et le facet field name pour cibler les résultats.

{{< img src="logs/explorer/facet/search_facet.png" alt="Search Facet" style="width:30%;">}}

### Aliased facets {#aliased-facets}

Certaines facets peuvent avoir été aliasées (voir la section [alias facet](#alias-facets)). Les aliased facets sont toujours valides pour slicing and dicing, mais sont considérées comme deprecated par votre organisation :

{{< img src="logs/explorer/facet/aliased_facet.png" alt="Aliased Facet" style="width:30%;">}}

Lors du dépannage, il est plus probable que vous trouviez du contenu d'autres équipes (en plus du contenu de votre équipe) dans le _standard_ facet plutôt que dans le _aliased_ facet. Cela rend la corrélation sur le contenu d'origines diverses plus simple.

Si vous voyez une facette aliasée dans votre liste de facettes, envisagez d'utiliser la facette _standard_ à la place en cliquant sur l'élément de menu {{< ui >}}switch to alias{{< /ui >}}. Cette action cache la facette aliasée et révèle la facette standard. Si cela vous oblige à mettre à jour une vue enregistrée, envisagez de sauvegarder la vue enregistrée afin que l'aliasing s'applique à tous ceux qui utilisent cette vue enregistrée.

{{< img src="logs/explorer/facet/switch_facet.png" alt="Changer de facette" style="width:30%;">}}

Vous souhaiterez peut-être conserver la version non standard _aliasée_ de la facette si vous dépannez du contenu ancien (avant que l'aliasing pour cette facette ait été configuré par votre organisation).

## Gérer les facettes {#manage-facets}

### Facettes prêtes à l'emploi {#out-of-the-box-facets}

La plupart des facettes courantes telles que `Host` et `Service` sont prêtes à l'emploi, vous pouvez donc commencer à dépanner immédiatement une fois que vos journaux sont intégrés dans les index de journaux.

Vous pouvez accéder par défaut aux facettes sur les [attributs réservés][25] ainsi que sur la plupart des [attributs standard][26].

### Facette d'index {#index-facet}

La facette d'index est une facette spécifique qui n'apparaît que si votre organisation dispose de [plusieurs index][27], et/ou si vous avez des [vues historiques][28] actives. Utilisez cette facette si vous souhaitez restreindre votre requête à un sous-ensemble de vos index.

{{< img src="logs/explorer/facet/index_facet_.png" alt="Créer une facette" style="width:30%;">}}

### Créer des facettes {#create-facets}

Par souci de bonne pratique, envisagez toujours d'utiliser une facette existante plutôt que d'en créer une nouvelle (voir la section [facettes alias](#alias-facets)). Utiliser une facette unique pour des informations de nature similaire favorise la collaboration entre équipes.

Pour créer une facette sur un tableau d'objets JSON, il faut d'abord utiliser un [grok parser][29] pour extraire l'attribut, puis créer une facette pour cet attribut.

**Remarque** : Une fois qu'une facette est créée, son contenu est peuplé **pour tous les nouveaux journaux**. Pour une utilisation optimale de la solution de gestion des journaux, Datadog recommande d'utiliser au maximum 1000 facettes.

#### Panneau latéral des journaux {#log-side-panel}

Le moyen le plus simple de créer une facette est de l'ajouter depuis le panneau latéral des journaux, où la plupart des détails de la facette—comme le nom du champ ou le type de données sous-jacent—sont pré-remplis et il ne s'agit que de vérifier. Naviguez dans l'[Explorateur de journaux][1] vers le journal d'intérêt portant le champ sur lequel créer une facette. Ouvrez le panneau latéral pour ce journal, cliquez sur le champ correspondant (soit dans les tags, soit dans les attributs) et créez une facette à partir de là :

- Si le champ a une valeur de chaîne, seule la création de facette est disponible.
- Si le champ a une valeur numérique, la création de facette et de mesure est disponible.

{{< img src="logs/explorer/facet/create_facet_from_attribute.png" alt="Créer une facette à partir de l'attribut" style="width:30%;">}}

**Remarque** : En tant que meilleure pratique, il est recommandé de ne pas utiliser plus de 1000 facettes.

#### Liste des facettes {#facet-list}

Dans le cas où trouver un journal correspondant n'est pas une option, créez une nouvelle facette directement depuis le panneau des facettes en utilisant le bouton _ajouter une facette_.

Définissez le nom (à savoir, la clé) du champ sous-jacent de votre facette.

- Utilisez le nom de clé de tag pour les tags.
- Utilisez le chemin d'attribut pour les attributs, avec `@` préfixe.

L'autocomplétion basée sur le contenu des journaux des vues actuelles vous aide à définir le nom de champ approprié. Mais vous pouvez utiliser pratiquement n'importe quelle valeur ici, en particulier dans le cas où vous n'avez pas encore de journaux correspondants circulant dans vos index.

{{< img src="logs/explorer/facet/create_facet_from_scratch.png" alt="Créer une facette à partir de zéro" style="width:30%;">}}

### Alias facettes {#alias-facets}

Vous pouvez rassembler du contenu similaire au sein d'une seule facette afin que vos différentes équipes puissent conjointement diagnostiquer en toute simplicité les erreurs et effectuer des analyses. Consultez la section relative aux [conventions de nommage][26] pour en savoir plus.

Utilisez l'aliasing comme option pour réaligner en douceur les équipes qui s'appuient sur des conventions de nommage incohérentes. Avec l'aliasing, vous pouvez faire en sorte que tous utilisent la facette standard définie pour votre organisation.

#### Aliasing facette à facette {#aliasing-facet-to-facet}

Ce type d'alias constitue la solution idéale si plusieurs de vos équipes ont créé de nombreuses facettes rassemblant du contenu similaire.

Lors de l'aliasing d'une facette _aliasée_ vers une facette _standard_ :

- Les utilisateurs peuvent utiliser soit des facettes aliasées, soit des facettes standard pour le dépannage. Vous pouvez préférer la standard, qui facilite la corrélation du contenu provenant de sources diverses et potentiellement hétérogènes.
- Les utilisateurs sont incités à utiliser la facette standard à la place de celle aliasée.

Pour aliaser une facette vers une standard, sélectionnez l'élément d'action {{< ui >}}Alias to...{{< /ui >}} dans le menu de la facette. Choisissez les facettes de destination parmi toutes les facettes [standard][14] existantes pour votre organisation.

{{< img src="logs/explorer/facet/alias_modal.png" alt="alias modal" style="width:30%;">}}

#### Aliasing attribut à facette {#aliasing-attribute-to-facet}

C'est la meilleure option si vous intégrez des journaux provenant de nouvelles sources. Plutôt que de créer une facette pour un champ sur ces journaux, et juste après de déprécier cette facette en l'aliasant à une facette standard, aliaser directement le champ à une facette existante :

{{< img src="logs/explorer/facet/alias_facet_from_attribute.png" alt="Alias facette à partir d'attribut" style="width:30%;">}}

## Supprimer une facette {#delete-a-facet}

<div class="alert alert-warning">Supprimer une facette qui est utilisée dans des index, des moniteurs, des tableaux de bord, des requêtes de restriction ou par d'autres équipes peut entraîner des ruptures de configurations.</div>

Pour supprimer une facette, procédez comme suit :

- Cliquez sur {{< ui >}}Showing xx of xx{{< /ui >}} en haut du panneau des facettes.
- Recherchez votre facette.
- Cliquez sur l'icône de crayon pour votre facette.
- Cliquez sur {{< ui >}}Delete{{< /ui >}}.

## Lectures complémentaires {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/logs/search_syntax/
[2]: /fr/logs/explorer/patterns/
[3]: /fr/logs/explorer/analytics/
[4]: /fr/monitors/types/log/
[5]: /fr/dashboards/widgets/
[6]: /fr/notebooks/
[7]: /fr/logs/log_configuration/processors
[8]: /fr/logs/live_tail/
[9]: /fr/logs/explorer/
[10]: /fr/logs/logs_to_metrics/
[11]: /fr/logs/archives/
[12]: /fr/logs/archives/rehydrating/
[13]: /fr/logs/log_configuration/pipelines
[14]: /fr/logs/indexes/#indexes-filters
[15]: /fr/logs/indexes/#exclusion-filters
[16]: /fr/integrations/nginx/
[17]: /fr/logs/log_configuration/processors/geoip_parser/
[18]: /fr/integrations/kong/
[19]: /fr/getting_started/tagging/assigning_tags/
[20]: /fr/integrations/varnish/
[21]: /fr/integrations/ansible/
[22]: /fr/integrations/python/
[23]: /fr/logs/log_configuration/processors/arithmetic_processor/
[24]: /fr/logs/explorer/saved_views/
[25]: /fr/logs/log_configuration/attributes_naming_convention/#reserved-attributes
[26]: /fr/logs/log_configuration/attributes_naming_convention
[27]: /fr/logs/indexes/#indexes
[28]: /fr/logs/log_configuration/rehydrating
[29]: /fr/logs/log_configuration/parsing/?tab=matchers#nested-json
[30]: https://app.datadoghq.com/logs