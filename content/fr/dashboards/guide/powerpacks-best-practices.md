---
further_reading:
- link: https://docs.datadoghq.com/getting_started/dashboards/#add-widgets-and-refine-what-they-show
  tag: Documentation
  text: Ajouter des widgets et paramétrer les informations affichées
- link: https://docs.datadoghq.com/dashboards/guide/maintain-relevant-dashboards/
  tag: Guide
  text: Pratiques recommandées pour conserver des dashboards pertinents
title: Diffuser l'expertise des créateurs de graphiques avec les powerpacks
---

## Présentation

Les powerpacks sont des groupes de widgets basés sur un modèle qui peuvent être intégrés à des dashboards afin de diffuser l'expertise des créateurs de graphiques. Ils offrent un moyen flexible de recueillir les connaissances d'un domaine ou les normes propres à une organisation et de les partager avec l'ensemble de l'organisation. Les powerpacks permettent aux créateurs de dashboards d'intégrer à leurs dashboards existants les connaissances acquises dans différents domaines technologiques sans avoir à suivre une formation supplémentaire.

{{< img src="dashboards/guide/powerpacks_best_practices/configure_powerpack.png" alt="La page de configuration d'un powerpack dans l'application Datadog, avec une section permettant de configurer des valeurs à l'aide de tags ou d'attributs, plusieurs graphiques issus d'un exemple de powerpack, ainsi qu'un menu sur la droite permettant de parcourir d'autres packs" style="width:100%;" >}}

Les powerpacks peuvent être prédéfinis (créés par Datadog) ou personnalisés (créés par un utilisateur).

- Les powerbacks prédéfinis offrent des vues prêtes à l'emploi pour les mécanismes de surveillance couramment utilisés, tels que les métriques de performance ou l'utilisation de fonctionnalités. Ils sont souvent liés à un produit ou une intégration spécifique (comme le powerpack `RUM Page Views`) et sont tenus à jour par Datadog.
- Les powerpacks personnalisés peuvent être créés par tout utilisateur disposant des autorisations d'écriture sur les dashboards afin de permettre aux utilisateurs de partager et d'harmoniser les meilleures pratiques internes.

Ce guide aborde les meilleures pratiques relatives à la création et au partage de powerpacks personnalisés.

## Dans quelles circonstances les powerpacks personnalisés sont-ils utiles ?

À mesure qu'une organisation développe son activité, l'expertise et la propriété d'actifs ont tendance à être progressivement réparties entre plusieurs équipes. Les powerbacks s'adressent avant tout aux organisations composées :

- d'équipes détentrices d'une technologie spécifique (Postgres, Kafka ou Node.js, par exemple) ou d'enjeux (Conformité ou Sécurité, par exemple) en son sein ;
- d'équipes individuelles responsables de l'intégration de ces technologies ou enjeux dans le cadre de stratégies opérationnelles plus larges.

Ce modèle de propriété favorise l'harmonisation de vos équipes et offre un moyen flexible de promouvoir les meilleures pratiques organisationnelles pour la surveillance des composants clés d'une activité. Pour les métriques et les KPI métiers, le fait de répartir la propriété par technologie et par équipe permet de s'assurer que les principales parties prenantes telles que les ingénieurs en service, les SRE et les dirigeants peuvent accéder à des vues de dashboard globales pertinentes et les interpréter.

## Meilleures pratiques pour la création d'un powerpack

Conçu correctement, un powerpack peut accélérer l'adoption par une organisation de nouveaux mécanismes de surveillance, par exemple en intégrant des données d'observabilité de la sécurité aux dashboards de toutes les équipes d'application existantes. Créez un powerpack clair et autonome pour veiller à ce que les propriétaires de dashboards puissent tirer pleinement parti de votre contenu tout en limitant les problèmes ou les éventuelles questions.

### Créer du contenu clair

Le contenu d'un powerpack se doit d'être clair. Lorsque vous créez un powerpack, incluez le contexte dont l'utilisateur a besoin pour interpréter et comprendre le pack, et ce même lorsque d'autres groupes travaillent sur le dashboard. Voici quelques conseils pour y parvenir. Utilisez :

- des titres clairs et concis pour décrire le contenu du graphique ;
- des widgets Note avec des informations supplémentaires ;
- des marqueurs horizontaux pour indiquer les seuils de valeurs attendues et inattendues.

Un widget Note peut fournir des informations facilitant l'interprétation d'un graphique. Par exemple, le powerpack `RUM Page Views` explique comment comparer les vues de page de la semaine en cours avec celles de la semaine précédente. Les notes peuvent également rediriger vers des ressources externes, comme c'est le cas dans le pack `System Resource Utilization`.

{{< img src="dashboards/guide/powerpacks_best_practices/note_widget_example.png" alt="Un exemple de powerpack intitulé /checkout Page Views présentant différents graphiques avec de véritables données de surveillance des utilisateurs. En haut à droite figure un widget Note qui fournit des informations concernant l'un des graphiques" style="width:100%;" >}}

Les marqueurs sur les graphiques, tels que les marqueurs horizontaux et les fonctions de prévision, peuvent donner davantage d'informations sur la signification d'une valeur. Par exemple, le pack `Hosts Overview` affiche sur un graphique les décalages avec NTP de l'Agent. Les marqueurs horizontaux limitent l'interprétation visuelle qu'un utilisateur doit effectuer en définissant clairement des seuils acceptables sur un graphique.

{{< img src="dashboards/guide/powerpacks_best_practices/horizontal_marker_example.png" alt="Un exemple de powerpack intitulé « Hosts Overview » affichant un graphique linéaire intitulé « Current Agent NTP offset ». La couleur verte est utilisée entre les valeurs -1 et 1, et ces seuils sont indiqués au moyen des mentions respectives suivantes : « offset -1s » et « offset +1s ». La couleur jaune est utilisée entre les valeurs 1 et 3, et également entre les valeurs -1 et -3 ; ces seuils sont indiqués au moyen des mentions respectives suivantes : « offset -3s » et « offset +3s ». La couleur rouge est utilisée au-delà des valeurs +3 et -3." style="width:100%;" >}}

### Faciliter la recherche des powerpacks

Les powerpacks se trouvent dans la barre des widgets de dashboards ; vous pouvez les rechercher en saisissant un mot clé ou un tag. Le titre, la description et les tags d'un powerpack sont utilisés lors des recherches. Ces champs sont le moyen le plus simple de trouver votre powerpack.

{{< img src="dashboards/guide/powerpacks_best_practices/powerpack_keyword_search.png" alt="Exemple d'une recherche effectuée dans le menu « Add Widgets » d'un dashboard, avec le mot clé « resource »" style="width:60%;" >}}

Pour vous assurer que les utilisateurs appropriés trouvent votre powerpack, incluez les mots-clés que vos utilisateurs sont susceptibles de saisir (comme « performance ») dans le titre ou la description, et taguez les principales technologies.

Les descriptions sont limitées à 80 caractères. Une bonne description fournit un résumé concis de l'utilité d'un pack et de son fonctionnement. Par exemple, « Visualiser les tendances d'utilisation d'une action sur l'interface pour une page d'app spécifique » pour `RUM Feature Usage` décrit ce que le powerpack permet de surveiller ainsi que l'entrée attendue (une page d'app spécifique). La description comprend également des mots-clés, tels que « utilisation » « interface » et « app ».

#### Taguer les powerpacks

Utilisez les tags afin de spécifier les principales technologies utilisées ou des expressions de recherche pour un pack en particulier (par exemple, `aws`, `k8s`, `app`). Utilisez des chaînes standard pour décrire le contenu des packs ; évitez de placer des pairs `key:value` directement dans le champ des tags. Les tags sont limités à 80 caractères.

Pour rechercher des powerpacks par tag dans la barre des widgets, utilisez la syntaxe `tag:chaîne_recherche`.

{{< img src="dashboards/guide/powerpacks_best_practices/powerpack_tag_search.png" alt="Exemple d'une recherche effectuée dans le menu « Add Widgets » d'un dashboard avec la syntaxe de recherche tag:security" style="width:60%;" >}}

### Configurer la personnalisation des powerpacks

Les powerpacks sont particulièrement utiles lorsqu'ils peuvent être personnalisés par chaque équipe, en fonction de leurs besoins. Définissez des variables de configuration pour permettre leur personnalisation.

Le menu de création d'un powerpack suggère des variables à ajouter à votre pack selon les filtres couramment utilisés qui apparaissent dans les requêtes. Passez votre curseur sur n'importe quelle variable suggérée pour identifier les graphiques affectés par celle-ci. Pour ajouter une variable qui n'a pas été suggérée, modifiez vos graphiques directement dans le dashboard de manière à utiliser la variable souhaitée en tant que filtre ou variable de modèle.

Modifiez les noms des variables pour indiquer aux autres utilisateurs comment les utiliser. Dans l'exemple ci-dessous, la variable `@appsec.type` a été renommée `AttackType` afin de clarifier l'entrée attendue. 

{{< img src="dashboards/guide/powerpacks_best_practices/create_powerpack.png" alt="L'écran de création de powerpack. Sur la gauche figurent les champs « Powerpack Title » et « Group Title » (contenant tous deux la mention « Application Security Overview »), la section « Add Tags » configurée avec les tags « security » et « app », ainsi que plusieurs variables configurées dans la section « Add Variables », notamment l'attribut @appsec.type nommé AttackType. Sous cette section figure une autre intitulée « Add Common Filters as Variables » accompagnée de plusieurs options, dont le filtre @appsec.category:attack_attempt surligné. Plusieurs graphiques sont affichés à droite ; trois d'entre eux sont surlignés avec une couleur identique à celle appliquée au filtre @appsec.category:attack_attempt à gauche" style="width:100%;" >}}

Les variables de configuration remplissent deux fonctions. Elles peuvent :
1. aider les membres d'une équipe à appliquer un filtre à un powerpack en fonction de leurs besoins, et ce avant même que le pack ne soit ajouté à leur dashboard (sélectionner un `service` pour s'assurer qu'un powerpack dédié à la sécurité s'adresse au bon service, par exemple) ;
2. permettre aux utilisateurs de filtrer un powerpack une fois le pack ajouté à un dashboard (consulter les signaux de sécurité dans un powerpack à la fois dans les environnements `prod` et `staging`, par exemple).

Chaque utilisateur d'un powerpack peut, s'il le souhaite, choisir d'enregistrer une variable sur son dashboard afin d'activer le filtrage dynamique. Dans l'exemple ci-dessous, l'utilisateur peut modifier la valeur de `$Environment` sur son dashboard par le biais d'une variable de modèle, mais `$Service` conserve la valeur `agent`.

{{< img src="dashboards/guide/powerpacks_best_practices/configure_variables.png" alt="Un écran affichant l'option de configuration des valeurs associées aux variables de tag ou d'attribut, avec des colonnes distinctes pour « Tag or Attribute », « Name », « Value » et « Use as Template Variable ». Cette dernière contient une case à cocher pour l'option « Add to dashboard ». La case « Add to dashboard » est cochée pour $Environment et décochée pour $Service." style="width:100%;" >}}

### Relayer l'information

Une fois votre powerpack créé, parlez-en aux membres votre organisation. Vous annoncerez ainsi l'existence de votre pack et pourrez répondre aux éventuelles questions suscitées. Partagez le nom de votre powerpack avec votre organisation via différents canaux de communication (par e-mail ou via une plateforme de messagerie, par exemple), indiquez à qui s'adresse le pack et précisez l'endroit où il peut être utilisé.

{{< partial name="whats-next/whats-next.html" >}}