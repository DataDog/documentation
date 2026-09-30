---
description: Découvrez comment créer un dashboard d'intégration.
further_reading:
- link: /dashboards/
  tag: Documentation
  text: En savoir plus sur les dashboards
title: Créer un dashboard d'intégration
---
## Présentation

Cette page décrit les étapes de création d'un dashboard prêt à l'emploi dans Datadog, ainsi que les bonnes pratiques à suivre pendant le processus.

Grâce aux [dashboards Datadog][1], vous pouvez consulter des métriques clés et effectuer leur suivi, afin de surveiller votre infrastructure et vos intégrations. Datadog propose un ensemble de dashboards prêts à l'emploi pour de nombreuses fonctionnalités et intégrations. Pour commencer à les utiliser, consultez votre [Dashboard List][12].

Si vous avez [créé une intégration Datadog][2], vous devez créer un dashboard prêt à l'emploi pour aider les utilisateurs de votre intégration à en tirer pleinement parti.

## Créer un dashboard d'intégration

### Créer un dashboard

Dans votre sandbox Datadog, depuis la [**liste des dashboards**][12], cliquez sur **New Dashboard**.

{{< img src="dashboards/create_dashboard.png" alt="Créer un dashboard pour votre intégration" width="80%">}}

[Suivez les bonnes pratiques de ce guide](#suivre-les-bonnes-pratiques-concernant-les-dashboards) lors de l'ajout d'éléments à votre dashboard.

### Importer votre dashboard
Dans votre intégration, sur la plateforme de développement d'intégrations, accédez à l'onglet Content. À partir de là, sélectionnez **import dashboard** pour choisir parmi les dashboards disponibles. Vous pouvez en inclure jusqu'à 10 avec votre intégration. 

{{< img src="developers/create-an-integration-dashboard/share-dashboard.png" alt="Cliquez sur l'icône de partage et Export dashboard JSON pour exporter votre dashboard au format JSON" width="100%">}}


### Vérifier votre dashboard en production

Vérifiez dans Datadog que le carré d'intégration est `Installed`. Pour pouvoir consulter les dashboards prêts à l'emploi associés à une intégration, celle-ci doit être installée.

Cherchez votre dashboard sur la [page Dashboard List][12]. Vérifiez que les logos s'affichent correctement et qu'ils apparaissent dans le dashboard prédéfini.

## Suivre les bonnes pratiques concernant les dashboards

{{< img src="developers/create-an-integration-dashboard/dashboard_best_practices_example.png" alt="Exemple de dashboard" width="100%">}}

Un dashboard d'intégration doit respecter les consignes visuelles suivantes :

- Un groupe de **résumé** qui suscite l'intérêt des utilisateurs, avec une image de bannière, un texte concis, des liens utiles et une hiérarchie typographique adéquate
- Un groupe de **présentation** succinct et annoté abordant en priorité les principales statistiques du dashboard
- Des titres de graphique simples et des noms de groupe dont les principaux termes commencent par une majuscule
- Un affichage symétrique en mode Densité élevée
- Des notes concises avec une mise en forme adéquate
- Les mêmes codes couleur pour les groupes connexes, les notes au sein des groupes et les graphiques au sein des groupes

### Conseils globaux

-  Lorsque vous créez un dashboard, vous devez sélectionner le type de dashboard par défaut.

-  Ajoutez le nom de l'intégration dans le titre de votre dashboard. Par exemple, vous pouvez nommer votre dashboard `Scylla` ou `Vue d'ensemble Cilium`. **Remarque** : évitez d'utiliser le caractère `-` (trait d'union) dans le titre de votre dashboard, car l'URL du dashboard est générée à partir de ce titre.

-  Ajoutez un logo dans l'en-tête du dashboard. Le logo de l'intégration s'affiche automatiquement dans l'en-tête si vous avez fourni une icône et que la valeur du paramètre `integration_id` correspond au nom de l'icône.

-  Incluez un groupe About (de résumé) pour l'intégration, avec une description concise et des liens utiles. La section About doit contenir du contenu éditorial, et non des données. Évitez de l'afficher en pleine largeur. Vous pouvez copier le contenu de la section About dans la carte infobulle qui apparaît lorsque vous survolez le titre du dashboard.

- Modifiez la section About et sélectionnez une option d'affichage pour la bannière. Vous pouvez ensuite ajouter un lien vers une image de bannière à l'aide du chemin suivant : `/static/images/integration_dashboard/votre-image.png`.

- Incluez un groupe **Overview** (de présentation) avec quelques-unes des métriques les plus importantes, des checks de service comme des checks d’activité ou de disponibilité, ainsi qu'un résumé des monitors si vous en avez déjà pour cette intégration. Placez le groupe Overview en haut du dashboard. Ce groupe peut contenir des données.

  {{< img src="developers/create-an-integration-dashboard/about-and-overview-groups.png" alt="Exemple de section About et Overview dans un dashboard" width="100%">}}

- Si la collecte de logs est activée pour l'intégration, ajoutez un groupe Logs contenant un widget chronologique avec un graphique en barres représentant les logs par statut dans le temps, ainsi qu'un flux de logs affichant ceux avec le statut `Error` ou `Critical`. **Remarque :** si ces groupes sont utilisés dans plusieurs dashboards, quel que soit le type d'intégration, envisagez de les convertir en [powerpacks][14] pour pouvoir insérer l'ensemble du groupe correctement mis en forme en quelques clics, plutôt que de recréer les mêmes widgets à chaque fois.

-  Vérifiez la disposition de votre dashboard avec une largeur de 1 280 px et de 2 560 px. Ces dimensions seront respectivement utilisées pour afficher votre dashboard sur un petit ordinateur portable et sur un écran plus grand. Voici les largeurs d'écran les plus courantes pour les dashboards : 1 920, 1 680, 1 440, 2 560 et 1 280 px. Si la largeur de votre monitor est insuffisante pour l'affichage en mode Densité élevée, utilisez les commandes de zoom du navigateur pour effectuer un zoom arrière.

   {{< tabs >}}
   {{% tab "1280 pixels" %}}

   {{< img src="developers/create-an-integration-dashboard/qa-widths.png" alt="Exemple de dashboard à 1280 pixels" width="80%">}}

   {{% /tab %}}
   {{% tab "2560 pixels" %}}

   {{< img src="developers/create-an-integration-dashboard/qa-large-widths.png" alt="Exemple de dashboard à 2560 pixels" width="100%">}}

   {{% /tab %}}
   {{< /tabs >}}

### Widgets et regroupement

-  Cherchez les métriques prises en charge par l'intégration et regroupez-les au sein de catégories pertinentes. Les principales métriques de performance et la présentation de l'intégration doivent être affichées en haut de la page.

   Passer d'une vue macro à une vue micro du système
   : Pour un dashboard d'intégration de base de données, par exemple, vous pouvez regrouper les métriques des nœuds dans un premier groupe, celles des index dans un deuxième, et celles des shards dans un troisième.

   Organiser les sections du système du flux amont vers le flux aval
   : Pour un dashboard d'intégration de flux de données, par exemple, vous pouvez regrouper les métriques des producteurs dans un groupe, celles des brokers dans un autre, et celles des consommateurs dans un troisième.

   Regrouper les métriques menant aux mêmes actions
   : Vous pouvez rassembler dans un groupe les métriques d'indexation permettant d'identifier les index ou shards à optimiser, et dans un autre groupe les métriques d'utilisation des ressources (comme l'espace disque ou la mémoire) qui orientent les décisions d'allocation et de redistribution.

-  Pour attribuer un titre aux sections et pour les regrouper, utilisez des widgets Groupe plutôt que des widgets Note. Pour afficher des groupes côte à côte, utilisez des groupes à largeur partielle. La majorité des dashboards doivent afficher chaque widget au sein d'un groupe.

    {{< img src="developers/create-an-integration-dashboard/full-width-grouped-logs.png" alt="Un exemple de widgets Groupe" width="100%">}}

-  Les widgets Série temporelle doivent inclure au moins quatre colonnes pour éviter de paraître « aplatis » sur de petits écrans.

-  Pour garantir une lisibilité adéquate, les widgets Flux doivent inclure au moins six colonnes, ou faire au moins la moitié de la largeur du dashboard. Placez-les à la fin d'un dashboard pour éviter de bloquer le défilement. Il est conseillé de placer les widgets Flux dans un même groupe afin de pouvoir tous les réduire. Ajoutez un flux d'événements seulement si le service surveillé par le dashboard envoie des événements. Utilisez `sources:service_name`.

   {{< img src="developers/create-an-integration-dashboard/stream-widgets.png" alt="Exemple de widget de flux dans un dashboard" width="100%">}}

-  Variez les types et les tailles de vos widgets. Testez différentes options de visualisation et de mise en forme jusqu'à ce que vous soyez satisfait du rendu et de la disposition de votre dashboard. Il est parfois acceptable d'ajouter exclusivement des séries temporelles à un dashboard. Le reste du temps, il est préférable d'inclure d'autres éléments pour gagner en lisibilité. Les widgets [Série temporelle][4], [Valeur de requête][5] et [Tableau][6] sont couramment utilisés pour représenter des métriques. Veillez à ce que les widgets query value aient un arrière-plan en séries temporelles (par exemple avec des barres) plutôt qu'un fond vide. Pour en savoir plus sur les types de widgets disponibles, consultez la [liste des widgets de dashboard pris en charge][7].

-  Ajustez votre dashboard de façon à ce que les moitiés gauche et droite soient symétriques en mode Densité élevée. Sur les écrans de grande taille, votre dashboard s'affiche par défaut en mode Densité élevée. Il est donc important que les liens entre les groupes soient clairs et que votre dashboard s'affiche correctement dans ce format. Pour garantir une présentation optimale, vous pouvez modifier les hauteurs des groupes d'une moitié à une autre pour équilibrer le rendu.

   {{< tabs >}}
   {{% tab "Perfectly symmetrical" %}}

   {{< img src="developers/create-an-integration-dashboard/symmetrical-dashboard.png" alt="Un exemple de dashboard symétrique" width="100%">}}

   {{% /tab %}}
   {{% tab "Close enough" %}}

   {{< img src="developers/create-an-integration-dashboard/symmetrical_example_2.png" alt="Un exemple de dashboard symétrique" width="100%">}}

   {{% /tab %}}
   {{< /tabs >}}

-  Les [template variables][8] permettent de filtrer dynamiquement un ou plusieurs widgets dans un dashboard. Ces template variables doivent être universelles, adaptées au type de technologie d'intégration et accessibles à tout utilisateur ou compte exploitant le service surveillé. 

   | Type de technologie d'intégration | Template variable typique |
   | - | - |
   | Base de données | Shards |
   | Flux de données | Consumer |
   | Déploiement de modèle ML | Model |

   Assurez-vous que tous les graphiques pertinents réagissent bien aux filtres de variables de modèle correspondants. **Remarque :** ajouter `*=scope` comme template variable permet aux utilisateurs d'accéder à tous leurs propres tags.

### Texte

-  Utilisez des titres de graphique concis qui commencent par l'information la plus importante. Évitez les expressions génériques comme « nombre de » et n'incluez pas le nom de l'intégration (par exemple, « Memcached Load »). 

    | Titre concis (conseillé) | Titre détaillé (déconseillé) |
    | - | - |
    | Événements par nœud | Nombre d'événements Kubernetes par nœud |
    | Tâches en attente : [$node_name] | Nombre total de tâches en attente dans [$node_name] |
    | Opérations de lecture/écriture | Nombre d'opérations de lecture/écriture |
    | Connexions au serveur - taux | Taux de connexions au serveur |
    | Charge | Charge Memcached |

-  Évitez de répéter le titre de groupe ou le nom d'intégration dans tous les widgets d'un groupe, surtout s'il s'agit de widgets Valeur de requête avec une unité personnalisée portant le même nom. Dans cet exemple, notez la répétition du mot « shards » dans chaque titre de widget du groupe nommé « Shards ».

   {{< img src="developers/create-an-integration-dashboard/name-repetition.png" alt="Exemple de répétition dans un dashboard" width="100%">}}

-  Pour le widget Série temporelle, utilisez toujours des [alias de formule][9].

-  Les principaux termes des titres de groupe doivent commencer par une majuscule. Seul le premier terme des titres de widget doit commencer par une majuscule.

-  Si vous choisissez d'afficher une légende, veillez à utiliser des alias faciles à comprendre.

-  Les titres de graphique doivent résumer la métrique interrogée. N'indiquez pas l'unité dans le titre du graphique, car les types d'unité sont automatiquement affichés à partir des métadonnées, sauf dans le cas où le calcul d'une métrique est effectué dans un différent type d'unité.

### Style visuel

-  Modifiez le style de vos notes en fonction de votre objectif. Testez les légendes, annotations et en-têtes prédéfinis, ou choisissez vos propres styles. Pour les notes contenant beaucoup de texte, n'utilisez la plus petite police et évitez les présentations complexes, comme les listes à puces ou les blocs de code.

-  Les couleurs n'améliorent pas seulement l'apparence de votre dashboard : elles permettent de mettre en évidence les relations importantes et d'améliorer la lisibilité. Si vous avez plusieurs groupes connexes, appliquez-leur la même couleur d'en-tête. Si l'en-tête d'un groupe est vert, utilisez la même couleur pour les notes associées. Si deux groupes portent sur le même thème, mais que l'un d'eux est plus important, appliquez une nuance de couleur vive au groupe important et une nuance claire à l'autre. N'hésitez pas à laisser l'en-tête de certains groupes en blanc, et n'ajoutez pas trop de couleurs. Par exemple, n'utilisez pas un bleu vif pour tous les groupes d'un dashboard. Évitez également les en-têtes gris.

    {{< img src="developers/create-an-integration-dashboard/color-related-data.png" alt="Un exemple de données dans un dashboard avec un code couleur" width="100%">}}

- Les visualisations comportant des seuils ou des zones claires utilisent un formatage sémantique pour les graphiques, ou un formatage personnalisé en rouge, jaune et vert pour les valeurs de requêtes.

-  Utilisez des légendes lorsqu'elles sont appropriées. Elles simplifie la lecture d'un graphique et permettent d'éviter de survoler chaque série ou d'agrandir le widget. Assurez-vous d'utiliser des alias de série temporelle pour améliorer la lisibilité des légendes. Le mode Automatique masque les légendes lorsqu'il y a peu d'espace libre et les affiche lorsque cela n'encombre pas trop le dashboard.

    {{< img src="developers/create-an-integration-dashboard/well-named-legends.png" alt="Un exemple de légendes dans un dashboard" width="100%">}}

-  Pour que les utilisateurs puissent comparer deux graphiques, assurez-vous que les axes des abscisses sont alignés. Si un seul des graphiques comporte une légende, les abscisses seront décalées. Dans ce cas, vous devez donc supprimer la légende ou l'ajouter aux deux graphiques.

   {{< img src="developers/create-an-integration-dashboard/x-axes-alignment.png" alt="Exemple d'axes X mal alignés dans un dashboard" width="100%">}}

-  Pour une série temporelle, choisissez un type d'affichage en fonction du type de la métrique.

    | Type de métrique | Type d'affichage |
    | - | - |
    | Volume (p. ex., nombre de connexions) | `area` |
    | Nombre de valeurs (p. ex., nombre d'erreurs) | `bars` |
    | Plusieurs groupes ou valeur par défaut | `lines` |

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/dashboards/
[2]: /fr/developers/integrations/agent_integration/
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
[14]: /fr/dashboards/widgets/powerpack/