---
aliases:
- /fr/logs/facets
description: Facettes de log et volet des facettes
further_reading:
- link: logs/explorer/analytics
  tag: Documentation
  text: Effectuer des analyses de logs
- link: logs/explorer/patterns
  tag: Documentation
  text: Détecter les patterns dans vos logs
- link: /logs/log_configuration/processors
  tag: Documentation
  text: Apprendre à traiter vos logs
- link: logs/explorer/saved_views
  tag: Documentation
  text: Configurer automatiquement votre vue Log Explorer
kind: documentation
title: Facettes de log
---

{{< img src="logs/explorer/facet/facets_in_explorer.mp4" alt="Facettes dans le Facet Explorer" video=true style="width:100%;">}}

## Présentation

Les facettes sont des tags et des attributs définis par les utilisateurs à partir de vos logs indexés. Ils servent à effectuer des analyses de données qualitatives ou quantitatives. Vous pouvez donc les utiliser dans votre vue Log Explorer pour :

- [Effectuer des recherches dans vos logs][1]
- [Définir des patterns de logs][2]
- [Réaliser des analyses de logs][3]

Grâce aux facettes, vous pouvez également manipuler vos logs dans vos [log monitors][4], dans les widgets de logs des [dashboards][5] ainsi que dans les [notebooks][6].

**Remarque** : le [traitement des logs][7], la [recherche pour le live tailing][8], les [recherches dans le Log Explorer][30], la [création de métriques][10] à partir de logs, la transmission d'[archives][11] ou la [réintégration][12] ne nécessitent pas l'utilisation de facettes. De même, vous n'avez pas besoin de définir une facette pour transmettre des logs par l'intermédiaire des [pipelines][13] et des [index][14] via des filtres, ou pour exclure des logs d'un index ou les échantillonner avec [des filtres d'exclusion][15].

Pour ces cas d'utilisation, les fonctionnalités de remplissage automatique reposent sur des facettes existantes. Cependant, vous pouvez également saisir des valeurs correspondant aux logs entrants.

### Facettes qualitatives

#### Dimensions

Les dimensions vous permettent d'accomplir les tâches suivantes :

- **Obtenir des informations relatives** pour certaines valeurs. Vous pouvez par exemple créer une facette sur `http.network.client.geoip.country.iso_code` pour visualiser les principaux pays concernés par chaque erreur 5XX dans vos logs d'accès Web [NGINX][16], en bénéficiant d'informations supplémentaires fournies par le [processeur GeoIP][17] Datadog.
- **Compter des valeurs uniques**. Vous pouvez par exemple créer une facette sur `user.email` à partir de vos logs [Kong][18] afin de déterminer le nombre d'utilisateurs se connectant chaque jour à votre site Web.
- **Filtrer** régulièrement vos logs selon des valeurs données. Vous pouvez par exemple créer une facette sur le [tag][19] `environment` pour réduire vos recherches aux environnements de production, de développement et intermédiaires.

**Remarque** : bien que vous n'ayez pas besoin de créer des facettes pour appliquer un filtre basé sur des valeurs d'attributs, vous pouvez réduire votre durée de résolution en définissant des facettes sur les attributs que vous utilisez régulièrement.

#### Types

Les facettes qualitatives peuvent être des chaînes ou des nombres (entiers). Une dimension de type « string » fonctionnera peu importe votre utilisation. Cependant, les dimensions de type « integer » vous permettent de bénéficier d'une fonctionnalité supplémentaire, à savoir les filtres de plage. Par exemple, `http.status_code:[200 TO 299]` est une requête valide s'appliquant à une dimension de type « integer ». Consultez la [syntaxe de recherche][1] pour en savoir plus.

### Facettes quantitatives
#### Mesures

Les mesures vous permettent d'accomplir les tâches suivantes :

- **Agréger des valeurs** à partir de plusieurs logs. Vous pouvez par exemple créer une mesure sur la taille des carrés transmis par le [cache Varnish][20] d'un serveur cartographique pour surveiller le débit quotidien **moyen**, ou consulter les principaux référents selon la **somme** des tailles de carrés demandées.
- **Appliquer un filtre de plage** à vos logs. Vous pouvez par exemple créer une mesure sur le temps d'exécution des tâches [Ansible][21] et visualiser la liste des serveurs qui enregistrent le plus d'exécutions dépassant la barre des 10 secondes.
- **Trier des logs** par rapport à une valeur. Vous pouvez par exemple créer une mesure sur le montant des paiements réalisés via votre microservice [Python][22], puis effectuer une recherche dans l'ensemble des logs, en commençant par celui comportant le montant le plus élevé.

#### Types

Les mesures disposent d'un nombre entier (long) ou d'une double valeur. Ces deux types de valeurs proposent des fonctionnalités équivalentes.

#### Unités

Les mesures ont une unité de **temps** ou de **taille** afin de gérer les ordres de grandeur au moment de la requête et de l'affichage.

| type        | unité(s)                                                                                                                                                                                                                                                                                                                    |
|-------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| BYTES       | bit / byte / kibibyte / mebibyte / gibibyte / tebibyte / pebibyte / exbibyte                                                                                                                                                                                                                                               |
| DURÉE        | nanosecond / microsecond / millisecond / second / minute / hour / day / week                                                                                                                                                                                                                                               |

L'unité est une propriété de la mesure, et non du champ. Imaginons par exemple une mesure `duration` exprimée en nanosecondes. Vous disposez de logs du service `service:A`, pour lesquels `duration:1000` désigne une durée de 1 000 millisecondes, et d'autres logs du service `service:B`, pour lesquels `duration:500` désigne une durée de 500 microsecondes :

1. Grâce au [processeur arithmétique][23], vous pouvez faire en sorte que les durées de tous vos logs entrants soient exprimées en nanosecondes. Pour ce faire, appliquez le multiplicateur `*1000000` aux logs de `service:A` et le multiplicateur `*1000` aux logs de `service:B`.
2. Appliquez le filtre `duration:>20ms` (voir la [syntaxe de recherche][1] pour en savoir plus) pour interroger systématiquement les logs des deux services à la fois et pour afficher un résultat agrégé ayant pour valeur maximale `1 min`.

## Volet des facettes

La barre de recherche fournit un grand nombre de fonctionnalités interactives vous permettant de filtrer et regrouper vos données. Toutefois, dans la plupart des situations, il est plus simple d'utiliser le volet des facettes pour parcourir vos données. Ouvrez une facette pour consulter une synthèse de son contenu en fonction du contexte de la requête actuellement appliquée.

L'interface des **facettes (qualitatives)** propose une top list des valeurs uniques et indique le nombre de logs correspondant à chacune de ces valeurs :

{{< img src="logs/explorer/facet/dimension_facet.png" alt="Facette de dimension" style="width:30%;">}}

Cliquez sur une des valeurs pour affiner la requête de recherche. Cela filtre la recherche sur cette valeur unique et sur toutes les valeurs associées. Cochez des cases pour ajouter une valeur à la liste des valeurs ou la supprimer. Vous pouvez également effectuer une recherche sur le contenu :

{{< img src="logs/explorer/facet/dimension_facet_wildcard.png" alt="Remplissage automatique des facettes" style="width:30%;">}}

Les **mesures** disposent d'un curseur vous permettant de définir une valeur maximale ainsi qu'une valeur minimale. Utilisez le curseur, ou saisissez des valeurs numériques, pour restreindre la requête de recherche.

{{< img src="logs/explorer/facet/measure_facet.png" alt="Facette de mesures" style="width:30%;">}}

### Masquer des facettes

Votre organisation dispose d'un large ensemble de facettes permettant à de nombreuses équipes d'exploiter différents cas d'utilisation à l'aide des logs. Toutefois, il est probable que vous utilisiez seulement quelques-unes de ces facettes, en fonction de la situation à résoudre. Vous pouvez donc masquer les facettes dont vous ne vous servez pas régulièrement, afin de conserver uniquement les facettes pertinentes qui vous aideront à parvenir à vos fins.

{{< img src="logs/explorer/facet/hide_facet.png" alt="Masquer une facette" style="width:30%;">}}

Les facettes masquées peuvent toujours faire l'objet de recherche en cas de besoin (voir la section [Filtrer des facettes](#filtrer-des-facettes)). Vous pouvez afficher à nouveau les facettes masquées depuis la fonctionnalité de recherche de facettes.

{{< img src="logs/explorer/facet/unhide_facet.png" style="width:50%;" alt="Afficher de nouveau une facette" style="width:30%;">}}

Les facettes masquées ne sont pas proposées automatiquement dans la barre de recherche et ne peuvent pas être sélectionnées dans les menus déroulants (de mesure ou encore de regroupement) utilisés pour effectuer des analyses dans la vue Log Explorer. Cependant, vous pouvez indiquer des facettes masquées dans vos requêtes de recherche (par exemple, en collant un lien du Log Explorer).

Les facettes masquées servent uniquement dans la vue Log Explorer. Elles ne sont d'aucune utilité pour les autres fonctionnalités, telles que le live tailing, les monitors ou les définitions de widget dans les dashboards.

#### Facettes masquées pour les membres d'équipe

Lorsque vous masquez des facettes, vous les retirez de votre contexte de dépannage. Cela n'a donc aucune incidence sur la vue des autres membres de votre équipe, sauf si vous mettez à jour une [vue enregistrée][24]. En effet, les facettes masquées font partie du contexte capturé au sein d'une vue enregistrée.

### Regrouper des facettes

Afin de faciliter la navigation dans leur liste, les facettes sont regroupées selon différents thèmes pertinents. Les opérations d'attribution ou de réattribution d'une facette à un groupe servent uniquement à modifier l'apparence de la liste des facettes. Cela n'a aucune incidence sur les fonctionnalités de recherche et d'analyse.

{{< img src="logs/explorer/facet/group_facets.png" alt="Regrouper une facette" style="width:30%;">}}

Pour regrouper des facettes :

1. Cliquez sur l'icône en forme d'engrenage correspondant à la facette.
2. Sélectionnez **Edit facet**.
3. Cliquez sur la section **Advanced options** pour la développer.
4. Dans le champ **Group**, saisissez le nom du groupe dans lequel vous souhaitez inclure la facette.
5. Cliquez sur **Update**.

### Filtrer des facettes

Utilisez la zone de recherche pour les facettes afin d'affiner la liste des facettes et d'accéder plus facilement à celles dont vous avez besoin. La recherche de facette réduit le nombre de résultats affichés en se basant à la fois sur le nom d'affichage des facettes et sur le nom de leur champ.

{{< img src="logs/explorer/facet/search_facet.png" alt="Rechercher une facette" style="width:30%;">}}

### Facettes avec alias

Certaines facettes peuvent avoir un alias (voir la section [Alias de facettes](#alias-de-facettes)). Ces facettes peuvent tout de même être utilisées pour explorer vos données. Néanmoins, elles sont considérées comme obsolètes :

{{< img src="logs/explorer/facet/aliased_facet.png" alt="Facette avec alias" style="width:30%;">}}

Lors du dépannage d'un problème, vous êtes davantage susceptible de trouver le contenu d'autres équipes (et de la vôtre) dans une facette _standard_ plutôt que dans une facette _avec alias_. Cette logique simplifie la corrélation de contenu provenant de différentes sources.

Lorsqu'une facette avec alias figure dans votre liste de facettes, nous vous conseillons d'accéder plutôt à la facette _standard_. Pour ce faire, cliquez sur l'option **switch to alias**. Cette opération masque la facette avec alias et affiche la facette standard correspondante. Si cette manipulation entraîne la mise à jour d'une vue enregistrée, enregistrez d'abord la vue, afin que l'alias s'applique à tous les utilisateurs de la vue.

{{< img src="logs/explorer/facet/switch_facet.png" alt="Changer de facette" style="width:30%;">}}

Si vous cherchez à diagnostiquer une erreur en étudiant l'ancien contenu (avant que votre organisation n'ait appliqué un alias à votre facette), il peut être pertinent de conserver la version _avec alias_ de la facette.

## Gérer les facettes

### Facettes par défaut

La plupart des facettes courantes fournies par défaut, comme `Host` et `Service`, vous permettent de commencer directement votre diagnostic dès lors que vos logs sont transmis aux index de logs.

Vous pouvez accéder par défaut aux facettes sur les [attributs réservés][25] ainsi que sur la plupart des [attributs standard][26].

### Facette d'index

Les facettes d'index sont des facettes particulières qui vous sont uniquement proposées lorsque votre organisation dispose de [plusieurs index][27] ou lorsque vous possédez des [vues historiques][28] actives. Ces facettes vous permettent de filtrer votre requête sur un sous-ensemble d'index.

{{< img src="logs/explorer/facet/index_facet_.png" alt="Créer une facette" style="width:30%;">}}

### Créer des facettes

À titre de bonne pratique, essayez toujours d'utiliser une facette existante, plutôt que d'en créer une (voir la section [Alias de facettes](#alias-de-facettes)). En utilisant une seule facette pour des informations similaires, vous favorisez la collaboration entre les différentes équipes.

Pour créer une facette sur un tableau d'objets JSON, il faut d'abord utiliser un [grok parser][29] pour extraire l'attribut, puis créer une facette pour cet attribut.

**Remarque** : une fois votre facette créée, elle récupère **tous les nouveaux logs**. Pour une utilisation optimale de la solution Log Management, Datadog recommande d'utiliser au maximum 1 000 facettes.

#### Volet latéral des logs

La solution la plus simple pour créer une facette consiste à utiliser le volet latéral des logs. En effet, la plupart des informations sur la facette, telles que le nom du champ ou le type sous-jacent des données, sont automatiquement remplies. Il vous suffit simplement de vérifier la véracité de ces informations. Depuis la [vue Log Explorer][1], accédez au log de votre choix qui comporte le champ sur lequel vous souhaitez créer une facette. Ouvrez le volet latéral de ce log, cliquez sur le champ pertinent (dans les tags ou dans les attributs), puis créez votre facette :

- Si la valeur du champ correspond à une chaîne, vous pouvez uniquement créer une facette.
- Si la valeur du champ correspond à un nombre, vous pouvez créer une facette ou une mesure.

{{< img src="logs/explorer/facet/create_facet_from_attribute.png" alt="Créer une facette à partir d'un attribut" style="width:30%;">}}

**Remarque** : nous vous conseillons de ne pas utiliser plus de 1 000 facettes.

#### Liste des facettes

Si vous ne souhaitez ou ne pouvez pas rechercher un log spécifique, créez une facette directement depuis le volet des facettes, à l'aide du bouton _add facet_.

Définissez le nom (à savoir la clé) du champ sous-jacent de votre facette.

- Utilisez le nom de la clé du tag pour les tags.
- Utilisez le chemin d'attribut pour les attributs, en ajoutant le préfixe `@`.

Grâce à la fonctionnalité de remplissage automatique, qui se base sur le contenu des logs des vues actuelles, vous pouvez définir facilement un nom de champ adéquat. Toutefois, sachez que vous pouvez indiquer n'importe quelle valeur, surtout si aucun log correspondant n'est transmis à vos index.

{{< img src="logs/explorer/facet/create_facet_from_scratch.png" alt="Créer une facette de toute pièce" style="width:30%;">}}

### Alias de facettes

Vous pouvez rassembler du contenu similaire au sein d'une seule facette afin que vos différentes équipes puissent conjointement diagnostiquer en toute simplicité les erreurs et effectuer des analyses. Consultez la section relative aux [conventions de nommage][26] pour en savoir plus.

Les alias vous permettent de corriger de façon harmonieuse les problèmes d'alignement des équipes découlant d'incohérences des conventions de nommage. Grâce à cette solution, tous les utilisateurs de votre organisation peuvent commencer à utiliser les nouvelles facettes standard.

#### Créer un alias entre une facette et une autre facette

Ce type d'alias constitue la solution idéale si plusieurs de vos équipes ont créé de nombreuses facettes rassemblant du contenu similaire.

Lorsque vous créez un alias depuis une facette _avec alias_ vers une facette _standard_ :

- Les utilisateurs peuvent choisir d'utiliser les facettes standard ou celles avec alias pour leurs processus de dépannage. Il peut être préférable d'utiliser la version standard, car celle-ci simplifie la corrélation du contenu provenant de diverses sources caractérisées par une certaine hétérogénéité.
- Les utilisateurs sont invités à utiliser les facettes standard plutôt que les facettes avec alias.

Pour créer un alias pour une facette vers une facette standard, sélectionnez l'option `Alias to...` dans le menu des facettes. Choisissez parmi toutes les facettes [standard][14] de votre organisation pour définir votre destination.

{{< img src="logs/explorer/facet/alias_modal.png" alt="Fenêtre Alias" style="width:30%;">}}

#### Créer un alias entre un attribut et une facette

Ce type d'alias s'avère particulièrement utile pour gérer les logs transmis par de nouvelles sources. Plutôt que de créer une facette pour un champ sur ces logs, qui deviendrait obsolète après la création d'un alias vers une facette standard, créez directement un alias entre le champ et une facette existante :

{{< img src="logs/explorer/facet/alias_facet_from_attribute.png" alt="Alias de facette à partir d'un attribut" style="width:30%;">}}

## Supprimer une facette

<div class="alert alert-danger">Toute suppression d'une facette actuellement utilisée dans des index, monitors, dashboards ou requêtes de restriction ou par d'autres équipes peut entraîner des erreurs de configuration.</div>

Pour supprimer une facette, procédez comme suit :

- Cliquez sur **Showing xx of xx** en haut du volet des facettes.
- Recherchez votre facette.
- Cliquez sur l'icône en forme de crayon en regard de votre facette.
- Cliquez sur **Delete**.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/logs/search_syntax/
[2]: /fr/logs/explorer/patterns/
[3]: /fr/logs/explorer/analytics/
[4]: /fr/monitors/types/log/
[5]: /fr/dashboards/widgets/
[6]: /fr/notebooks/
[7]: /fr/logs/log_configuration/processors
[8]: /fr/logs/live_tail/
[9]: /fr/logs/log_configuration/attributes_naming_convention/#standard-attributes
[10]: /fr/logs/logs_to_metrics/
[11]: /fr/logs/archives/
[12]: /fr/logs/archives/rehydrating/
[13]: /fr/logs/log_configuration/pipelines
[14]: /fr/logs/indexes/#indexes-filters
[15]: /fr/logs/indexes/#exclusion-filters
[16]: /fr/integrations/nginx/
[17]: /fr/logs/log_configuration/processors/#geoip-parser
[18]: /fr/integrations/kong/
[19]: /fr/getting_started/tagging/assigning_tags/
[20]: /fr/integrations/varnish/
[21]: /fr/integrations/ansible/
[22]: /fr/integrations/python/
[23]: /fr/logs/log_configuration/processors/#arithmetic-processor
[24]: /fr/logs/explorer/saved_views/
[25]: /fr/logs/log_configuration/attributes_naming_convention/#reserved-attributes
[26]: /fr/logs/log_configuration/attributes_naming_convention
[27]: /fr/logs/indexes/#indexes
[28]: /fr/logs/log_configuration/rehydrating
[29]: /fr/logs/log_configuration/parsing/?tab=matchers#nested-json
[30]: /fr/logs/explorer/