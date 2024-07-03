---
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/docs/dev/create-an-integration-dashboard.md
title: Créer un dashboard d'intégration
---
## Présentation

Grâce aux [dashboards Datadog][1], vous pouvez consulter des métriques clés et effectuer leur suivi, afin de surveiller efficacement votre infrastructure et vos intégrations. Datadog propose un ensemble de dashboards prêts à l'emploi pour de nombreuses fonctionnalités et intégrations. Pour commencer à les utiliser, consultez votre [liste de dashboards][12].

Si vous avez [créé une intégration Datadog][2], vous avez la possibilité de concevoir un dashboard prêt à l'emploi afin que les utilisateurs puissent comprendre en quelques secondes l'intérêt de votre intégration. Ce guide présente la procédure et les bonnes pratiques à suivre pour créer un dashboard d'intégration.

Pour créer une intégration Datadog, consultez la section [Créer une intégration][2].


## Créer un dashboard d'intégration
### Créer un dashboard

[Créez un dashboard][12] sur la plateforme Datadog.

Pour déterminer les éléments à ajouter à votre dashboard, suivez les conseils de ce guide.

### Exporter votre dashboard

Pour exporter votre dashboard au format JSON, cliquez sur l'icône en forme d'engrenage (en haut à droite) et choisissez **Export dashboard JSON**. Attribuez un nom à votre fichier en vous basant sur le titre de votre dashboard : par exemple, `présentation_nom_intégration.json`.

Enregistrez ce fichier dans le dossier `assets/dashboards` de votre intégration, puis ajoutez la ressource à votre fichier `manifest.json`. Consultez la section [Références pour les ressources d'intégration][11] pour en savoir plus sur la structure et le fichier manifeste de votre intégration.

### Ouvrir une pull request

Ouvrez une pull request pour ajouter le fichier JSON de votre dashboard, ainsi que le manifeste modifié, au dossier de votre intégration dans le [référentiel GitHub `integrations-extras`][13]. Datadog étudie toutes les pull requests `integration-extras` envoyées pour ce référentiel. Une fois votre pull request approuvée, Datadog l'intègre et valide la mise en ligne de votre dashboard.

### Vérifier votre dashboard en production

Vérifiez d'abord dans Datadog que le carré d'intégration est `Installed`. Pour pouvoir consulter les dashboards prêts à l'emploi associés à une intégration, celle-ci doit être installée.

Cherchez votre dashboard dans les [listes de dashboards][12]. Vérifiez que les logos s'affichent correctement sur la page de présentation, ainsi que dans le dashboard prédéfini.

## Suivre les bonnes pratiques concernant les dashboards

Un dashboard d'intégration doit inclure les éléments suivants :

{{< img src="developers/create-an-integration-dashboard/dashboard-example.png" alt="Un exemple de dashboard" width="100%">}}

- Un groupe **About** qui suscite l'intérêt des utilisateurs, avec une image de bannière, un texte concis, des liens utiles et une hiérarchie typographique adéquate
- Un groupe **Overview** succinct et annoté abordant en priorité les principales statistiques du dashboard
- Des titres de graphique simples et des noms de groupe dont les principaux termes commencent par une majuscule
- Un affichage symétrique en mode Densité élevée
- Des notes concises avec une mise en forme adéquate
- Les mêmes codes couleur pour les groupes connexes, les notes au sein des groupes et les graphiques au sein des groupes


### Conseils globaux

-  Lorsque vous créez un dashboard, vous devez sélectionner le type de dashboard par défaut.

-  Ajoutez le nom de l'intégration dans le titre de votre dashboard. Par exemple, vous pouvez nommer votre dashboard `Scylla` ou `Vue d'ensemble Cilium`. **Remarque** : évitez d'utiliser le caractère `-` (trait d'union) dans le titre de votre dashboard, car l'URL du dashboard est générée à partir de ce titre.

-  Ajoutez un logo dans l'en-tête du dashboard. Le logo de l'intégration s'affiche automatiquement dans l'en-tête si vous avez fourni une icône et que la valeur du paramètre `integration_id` correspond au nom de l'icône.

-  Ajoutez à votre intégration un groupe About qui décrit brièvement son utilité et contient des liens utiles. Cette section doit contenir du texte simple, et non des données. Évitez d'afficher la section About sur toute la largeur de la page.

- Modifiez la section About et sélectionnez une option d'affichage pour la bannière. Vous pouvez ensuite ajouter un lien vers une image de bannière à l'aide du chemin suivant : `/static/images/integration_dashboard/votre-image.png`.

- Ajoutez un groupe Overview contenant les principales métriques de votre intégration. Prenez soin de placer ce groupe en haut du dashboard. Le groupe Overview peut contenir des données.

-  Vérifiez la disposition de votre dashboard avec une largeur de 1 280 px et de 2 560 px. Ces dimensions seront respectivement utilisées pour afficher votre dashboard sur un petit ordinateur portable et sur un écran plus grand. Voici les largeurs d'écran les plus courantes pour les dashboards : 1 920, 1 680, 1 440, 2 560 et 1 280 px. Si la largeur de votre monitor est insuffisante pour l'affichage en mode Densité élevée, utilisez les commandes de zoom du navigateur pour effectuer un zoom arrière.

### Widgets et regroupement

-  Cherchez les métriques prises en charge par l'intégration et regroupez-les au sein de catégories pertinentes. Les principales métriques de performance et la présentation de l'intégration doivent être affichées en haut de la page.

-  Pour attribuer un titre aux sections et pour les regrouper, utilisez des widgets Groupe plutôt que des widgets Note. Pour afficher des groupes côte à côte, utilisez des groupes à largeur partielle. La majorité des dashboards doivent afficher chaque widget au sein d'un groupe.

    {{< img src="developers/create-an-integration-dashboard/full-width-grouped-logs.png" alt="Un exemple de widgets Groupe" width="100%">}}

-  Les widgets Série temporelle doivent inclure au moins quatre colonnes pour éviter de paraître « aplatis » sur de petits écrans.

-  Pour garantir une lisibilité adéquate, les widgets Flux doivent inclure au moins six colonnes, ou faire au moins la moitié de la largeur du dashboard. Placez-les à la fin d'un dashboard pour éviter de bloquer le défilement. Il est conseillé de placer les widgets Flux dans un même groupe afin de pouvoir tous les réduire. Ajoutez un flux d'événements seulement si le service surveillé par le dashboard envoie des événements. Utilisez `sources:service_name`.

-  Variez les types et les tailles de vos widgets. Testez différentes options de visualisation et de mise en forme jusqu'à ce que vous soyez satisfait du rendu et de la disposition de votre dashboard. Il est parfois acceptable d'ajouter exclusivement des séries temporelles à un dashboard. Le reste du temps, il est préférable d'inclure d'autres éléments pour gagner en lisibilité. Les widgets [Série temporelle][4], [Valeur de requête][5] et [Tableau][6] sont couramment utilisés pour représenter des métriques. Pour en savoir plus sur les types de widgets disponibles, consultez la [liste des widgets de dashboard pris en charge][7].

-  Ajustez votre dashboard de façon à ce que les moitiés gauche et droite soient symétriques en mode Densité élevée. Sur les écrans de grande taille, votre dashboard s'affiche par défaut en mode Densité élevée. Il est donc important que les liens entre les groupes soient clairs et que votre dashboard s'affiche correctement dans ce format. Pour garantir une présentation optimale, vous pouvez modifier les hauteurs des groupes d'une moitié à une autre pour équilibrer le rendu.

    {{< img src="developers/create-an-integration-dashboard/symmetrical-dashboard.png" alt="Un exemple de dashboard symétrique" width="100%">}}

-  Les [template variables][8] vous permettent d'appliquer un filtre dynamique en fonction d'un ou plusieurs widgets dans un dashboard. Elles doivent être universelles et utilisables par tous les utilisateurs et comptes tirant profit du service surveillé. Assurez-vous de définir les filtres de template variable adéquats pour les graphiques pertinents.

    **Remarque** : ajoutez `*=scope` en tant que template variable pour permettre aux utilisateurs d'ajouter l'ensemble de leurs tags.

### Texte

-  Utilisez des titres de graphique concis qui commencent par les informations les plus importantes. Évitez d'utiliser des termes redondants, comme « nombre de ».

    | Titre concis (conseillé) | Titre détaillé (déconseillé) |
    | - | - |
    | Événements par nœud | Nombre d'événements Kubernetes par nœud |
    | Tâches en attente : [$node_name] | Nombre total de tâches en attente dans [$node_name] |
    | Opérations de lecture/écriture | Nombre d'opérations de lecture/écriture |
    | Connexions au serveur - taux | Taux de connexions au serveur |
    | Charge | Charge Memcached |

-  Évitez de répéter le titre de groupe ou le nom d'intégration dans tous les widgets d'un groupe, surtout s'il s'agit de widgets Valeur de requête avec une unité personnalisée portant le même nom.

-  Pour le widget Série temporelle, utilisez toujours des [alias de formule][9].

-  Les principaux termes des titres de groupe doivent commencer par une majuscule. Seul le premier terme des titres de widget doit commencer par une majuscule.

-  Si vous choisissez d'afficher une légende, veillez à utiliser des alias faciles à comprendre.

-  Les titres de graphique doivent résumer la métrique interrogée. N'indiquez pas l'unité dans le titre du graphique, car les types d'unité sont automatiquement affichés à partir des métadonnées, sauf dans le cas où le calcul d'une métrique est effectué dans un différent type d'unité.

### Style visuel

-  Modifiez le style de vos notes en fonction de votre objectif. Testez les légendes, annotations et en-têtes prédéfinis, ou choisissez vos propres styles. Pour les notes contenant beaucoup de texte, n'utilisez la plus petite police et évitez les présentations complexes, comme les listes à puces ou les blocs de code.

-  Les couleurs n'améliorent pas seulement l'apparence de votre dashboard : elles permettent de mettre en évidence les relations importantes et d'améliorer la lisibilité. Si vous avez plusieurs groupes connexes, appliquez-leur la même couleur d'en-tête. Si l'en-tête d'un groupe est vert, utilisez la même couleur pour les notes associées. Si deux groupes portent sur le même thème, mais que l'un d'eux est plus important, appliquez une nuance de couleur vive au groupe important et une nuance claire à l'autre. N'hésitez pas à laisser l'en-tête de certains groupes en blanc, et n'ajoutez pas trop de couleurs. Par exemple, n'utilisez pas un bleu vif pour tous les groupes d'un dashboard. Évitez également les en-têtes gris.

    {{< img src="developers/create-an-integration-dashboard/color-related-data.png" alt="Un exemple de données dans un dashboard avec un code couleur" width="100%">}}

-  Utilisez des légendes lorsqu'elles sont appropriées. Elles simplifie la lecture d'un graphique et permettent d'éviter de survoler chaque série ou d'agrandir le widget. Assurez-vous d'utiliser des alias de série temporelle pour améliorer la lisibilité des légendes. Le mode Automatique masque les légendes lorsqu'il y a peu d'espace libre et les affiche lorsque cela n'encombre pas trop le dashboard.

    {{< img src="developers/create-an-integration-dashboard/well-named-legends.png" alt="Un exemple de légendes dans un dashboard" width="100%">}}

-  Pour que les utilisateurs puissent comparer deux graphiques, assurez-vous que les axes des abscisses sont alignés. Si un seul des graphiques comporte une légende, les abscisses seront décalées. Dans ce cas, vous devez donc supprimer la légende ou l'ajouter aux deux graphiques.

-  Pour une série temporelle, choisissez un type d'affichage en fonction du type de la métrique.

    | Type de métrique | Type d'affichage |
    | - | - |
    | Volume (p. ex., nombre de connexions) | `area` |
    | Nombre de valeurs (p. ex., nombre d'erreurs) | `bars` |
    | Plusieurs groupes ou valeur par défaut | `lines` |


[1]: /fr/dashboards/
[2]: /fr/developers/integrations/new_check_howto/?tab=configurationtemplate
[3]: /fr/dashboards/#new-dashboard
[4]: /fr/dashboards/widgets/timeseries/
[5]: /fr/dashboards/widgets/query_value/
[6]: /fr/dashboards/widgets/table/
[7]: /fr/dashboards/widgets/
[8]: /fr/dashboards/template_variables/
[9]: /fr/dashboards/widgets/timeseries/#metric-aliasing
[10]: /fr/dashboards/#copy-import-or-export-dashboard-json
[11]: /fr/developers/integrations/check_references/#manifest-file
[12]: https://app.datadoghq.com/dashboard/lists
[13]: https://github.com/DataDog/integrations-extras