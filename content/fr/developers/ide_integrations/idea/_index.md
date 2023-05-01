---
disable_toc: false
further_reading:
- link: /account_management/api-app-keys/
  tag: Documentation
  text: En savoir plus sur les clés d'API et d'application
- link: /getting_started/profiler/
  tag: Documentation
  text: Premiers pas avec le profileur en continu
is_beta: true
kind: documentation
title: Plug-in Datadog pour IntelliJ IDEA
---

{{< callout url="#" btn_hidden="true">}}
  Le plug-in Datadog pour IntelliJ IDEA est disponible en version bêta publique. Cette version est destinée aux développeurs Java qui utilisent le <a href="https://docs.datadoghq.com/profiler/#pagetitle">Profileur en continu</a> pour leurs services Java. Si le plug-in cesse subitement de fonctionner, vérifiez qu'il est à jour ou <a href=#feedback>contactez l'équipe d'assistance</a>.
{{< /callout >}}

## Présentation

Le plug-in Datadog pour IntelliJ IDEA vous permet d'améliorer les performances de vos logiciels en profitant d'informations pertinentes sur le code dans votre IDE. Ces informations sont basées sur les données d'observabilité en temps réel. Combiné au profileur en continu, le plug-in vous aide à réduire les temps de latence et les coûts liés au cloud en identifiant les lignes de code qui :
- consomment le plus de ressources CPU
- allouent le plus de mémoire
- entraînent le plus de blocages, d'E/S disque, d'E/S socket, etc.

{{< img src="/developers/ide_integrations/idea/overview1.png" alt="La fenêtre de l'outil Datadog ouverte dans IDEA" style="width:100%;" >}}

En plus d'identifier les lignes de code problématiques, le plug-in Datadog pour Intellij IDEA peut être utilisé pour :
- Identifier les méthodes qui consomment le plus de ressources via la vue **Top List**.
- Visualiser les données de profil agrégées via la vue **Flame Graph**.
- Accéder directement, depuis les vues Top List et Flamegraph, aux lignes pertinentes de votre code.
- Afficher la liste des noms de méthode et des numéros de ligne qui consomment le plus de ressources.

## Prérequis

- **Un compte Datadog** : un compte Datadog est nécessaire pour utiliser le plug-in. Si vous n'avez pas encore utilisé Datadog, rendez-vous sur le [site Web de Datadog][3] pour en savoir plus sur les outils d'observabilité de Datadog et inscrivez-vous pour profiter d'un essai gratuit.
- **Profiling en continu** : Pour que le plug-in puisse afficher des informations au niveau du code, le profiling en continu doit être instrumenté sur vos services Java. Pour en savoir plus, consultez la section [Premiers pas avec le profileur en continu][2].

## Configuration

### Installer le plug-in Datadog

1. Cliquez sur **Plugins** et recherchez `Datadog`.
1. Cliquez sur **Install** pour télécharger et installer le plug-in dans votre IDE.
1. Si un message s'affiche pour vous informer que Datadog est un plug-in tiers, cliquez sur **Accept**.
1. Cliquez sur **Restart IDE** pour redémarrer IDEA.

{{< img src="/developers/ide_integrations/idea/datadog-plugin1.png" alt="Le plug-in Datadog" style="width:100%;" >}}

Vous pouvez également installer le plug-in via le [Marketplace de Jetbrains][4].

<span id="datadog_plugin_install_button"></span>

### Se connecter à Datadog

Après avoir installé le plug-in Datadog et redémarré IDEA, connectez-vous à Datadog :
1. Après avoir ouvert un fichier ou un projet dans IDEA, cliquez sur la fenêtre de l'outil **Datadog**.
1. Cliquez sur **Log in...**.
1. Dans la fenêtre du navigateur qui s'ouvre, sélectionnez votre site et votre organisation, puis autorisez l'accès à la plateforme.

**Remarque** : pour la plupart des utilisateurs, une seule connexion suffit. Si vous utilisez plusieurs organisations, vérifiez que le bon compte est actif. Pour ce faire, cliquez sur **Preferences** -> **Tools** -> **Datadog** et vérifiez quel compte est utilisé par IDEA.

### Associer un service

Pour récupérer les données pertinentes depuis la plateforme Datadog, ajoutez des services pertinents à un projet :
1. Tout en ayant votre projet ouvert dans IDEA, ouvrez la fenêtre de l'outil **Datadog** et cliquez sur l'icône plus (**+**).
1. Recherchez et sélectionnez les services que vous souhaitez ajouter au projet en cours.

Pour supprimer un service, sélectionnez le service concerné dans le tableau **Services** et cliquez sur l'icône moins (**-**).

<div class="alert alert-info">Lorsque vous fermez un projet, les noms des services associés au projet sont conservés.</div>

## Utiliser le plug-in

Après avoir ajouté un service à votre projet, faites un clic droit sur le service et cliquez sur **Open in Profiling** pour ouvrir l'onglet Profiling du service. Cet onglet affiche les données d'un seul service, mais vous pouvez ouvrir plusieurs onglets en même temps.

L'onglet Profiling contient des informations sur le profiling en continu du service dans un environnement donné. Ces informations sont regroupées sur une période spécifique. Les vues disponibles sont :
- [Top list](#top-list) : affiche la liste des méthodes qui sollicitent le plus de ressources pour la mesure de profiling actuelle.
- [Flame graph](#flame-graph) : affiche un flamegraph représentant les stack traces dans les profils.

Vous pouvez définir les paramètres suivants pour les données de profiling :
- Le type de profil à afficher
- L'environnement sur lequel le service s'exécute
- L'intervalle d'agrégation des échantillons de profiling

Les types de profiling disponibles incluent généralement des options telles que **CPU Time** et **Allocated Memory**. Ils varient toutefois en fonction de la plateforme et du langage.

## Top list

Le sous-onglet **Top List** affiche les méthodes qui consomment le plus de ressources d'après les données de profiling agrégées issues des serveurs Datadog.  La vue **Top List** est conçue pour afficher un résumé des méthodes susceptibles d'être les plus intéressantes en termes de consommation de ressources.

{{< img src="/developers/ide_integrations/idea/top-list1.png" alt="La vue Top List" style="width:100%;" >}}

- Double-cliquez sur un élément de la liste (ou sélectionnez **Jump to Source** dans le menu contextuel) pour ouvrir un éditeur de code source indiquant où la méthode est définie.
- Pour visualiser une méthode sous forme de flamegraph, sélectionnez **Search in Flame Graph** dans le menu contextuel.

### Arborescence des appels

Disponible à droite de la liste des méthodes, l'arborescence des appels affiche les chemins menant vers (et depuis) la méthode sélectionnée.

{{< img src="/developers/ide_integrations/idea/call-tree1.png" alt="L'arborescence des appels de la méthode" style="width:100%;" >}}

La vue **Caller Hierarchy** par défaut affiche les appelants (ou prédécesseurs) de la méthode cible et la fréquence à laquelle ils apparaissent dans la pile d'appels.

Pour afficher les appelés (ou successeurs), cliquez sur **Callee Hierarchy**.

{{< img src="/developers/ide_integrations/idea/callee-hierarchy.png" alt="La vue Callee Hierarchy" style="width:100%;" >}}

Faites un clic droit sur une méthode dans l'arborescence des appels pour afficher les options permettant d'accéder à l'éditeur de source ou au flamegraph.

## Flamegraph

La vue Flamegraph est une représentation d'échantillons de profiling qui montre les stack traces et leur fréquence relative pendant la période considérée. Le plug-in Datadog agrège les données recueillies sur l'intervalle de temps demandé, et plusieurs profils individuels sont agrégés ensemble. Chaque profil individuel couvre un intervalle de 60 secondes dans l'intervalle de temps demandé.

{{< img src="/developers/ide_integrations/idea/flamegraph1.png" alt="Flamegraph affichant le temps CPU enregistré au cours des 4 dernières heures" style="width:100%;" >}}

Chaque fois que vous modifiez le type de profil, l'intervalle de temps ou l'environnement, le plug-in Datadog génère un nouveau flamegraph.

Vous pouvez parcourir le flamegraph de plusieurs manières :
- Double-cliquez sur n'importe quel rectangle pour mettre en avant la méthode associée et toutes celles qu'elle a appelées pendant la période considérée.
- Utilisez la minicarte pour vous déplacer dans le graphique.
- Faites un clic droit sur une méthode et sélectionnez **Jump to Source** pour accéder au point correspondant dans le code source.

Passez votre souris sur une méthode pour afficher une infobulle contenant les informations suivantes :
- Le nom de la classe et la signature de la méthode
- Le nom du package
- La valeur de la métrique de profiling et la répartition en pourcentage.

Les échantillons de profiling incluent les informations sur la stack trace et le numéro de ligne. Cliquez sur **Separate Flame Graph by** pour séparer les rectangles par méthode ou par numéro de ligne.

{{< img src="/developers/ide_integrations/idea/separate-flamegraph-by.png" alt="Cliquez sur l'infobulle pour séparer les rectangles par méthode ou numéro de ligne" style="width:40%;" >}}

## Datadog Insights

Lorsqu'un onglet Profiling est actif, Datadog Insights met en évidence certaines lignes de code dans la marge de l'éditeur. Le plug-in Datadog affiche une icône dans la marge de l'éditeur et surligne le code en fonction des données de profiling actives.
- Passez votre souris sur l'icône pour afficher plus d'informations.
- Cliquez sur l'icône pour ouvrir l'onglet Profiling Top List ou accéder aux profils dans Datadog.
  {{< img src="/developers/ide_integrations/idea/interest-options.png" alt="Cliquez sur l'icône Datadog pour ouvrir les données de profiling dans un onglet ou dans Datadog" style="width:100%;" >}}

L'onglet Profiling actif affecte également l'arborescence du projet IDEA, qui est annotée avec les métriques du profil sélectionné :
{{< img src="/developers/ide_integrations/idea/project-tree-view.png" alt="L'arborescence du projet annotée avec les métriques de profil d'un onglet Profile" style="width:60%;" >}}

## Commentaires

Donnez-nous votre avis sur le plug-in ! Faites part de vos retours sur notre [forum de discussion][5] ou envoyez un e-mail à l'adresse `team-ide-integration@datadoghq.com`.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

<script src="https://plugins.jetbrains.com/assets/scripts/mp-widget.js"></script>
<script>
  // Remplacez #yourelement par un identifiant d'élément réel sur votre page Web
  MarketplaceWidget.setupMarketplaceWidget('install', 19495, "#datadog_plugin_install_button");
</script>

[1]: https://github.com/DataDog/datadog-for-intellij/discussions
[2]: /fr/getting_started/profiler/
[3]: https://www.datadoghq.com/
[4]: https://plugins.jetbrains.com/plugin/19495-datadog