---
disable_toc: false
further_reading:
- link: /getting_started/profiler/
  tag: Documentation
  text: Premiers pas avec le profileur en continu
- link: /integrations/guide/source-code-integration/
  tag: Documentation
  text: En savoir plus sur l'intégration du code source de Datadog
- link: https://www.jetbrains.com/lp/toolbox/
  tag: Site externe
  text: En savoir plus sur JetBrains Toolbox
is_beta: true
kind: documentation
title: Plug-in Datadog pour la plateforme IntelliJ
---

{{< callout url="#" btn_hidden="true">}}
  Le plug-in Datadog pour IntelliJ IDEA et GoLand est disponible en version bêta publique. Cette version est destinée aux développeurs qui utilisent les produits Datadog, tels que le <a href="https://docs.datadoghq.com/logs/explorer/">Log Explorer</a> et le <a href="https://docs.datadoghq.com/profiler/#pagetitle">profileur en continu</a>, pour leurs services Java et Go. Si le plug-in cesse subitement de fonctionner, vérifiez qu'il est à jour ou <a href=#feedback>contactez l'équipe d'assistance</a>.
{{< /callout >}}

## Présentation

Le plug-in Datadog pour la plateforme IntelliJ (IDEA et GoLand) vous permet d'améliorer les performances de vos logiciels en profitant d'informations pertinentes sur le code dans votre IDE. Ces informations sont basées sur les données d'observabilité en temps réel.

{{< img src="/developers/ide_integrations/idea/overview1.png" alt="La fenêtre de l'outil Datadog ouverte dans IDEA" style="width:100%;" >}}

La vue **Code Insights** affiche les informations suivantes :
- Les problèmes identifiés par le [suivi des erreurs][6]
- Les rapports de [vulnérabilité][8] générés par Application Security Management
- Les [tests irréguliers][9] détectés par CI Visibility
- Les données de profiling issues de [Watchdog Insights][10]

Le **profileur en continu** vous aide à réduire la latence et les coûts liés au cloud en identifiant les lignes de code qui :
- consomment le plus de ressources CPU
- allouent le plus de mémoire
- entraînent le plus de blocages, d'E/S disque et d'E/S socket

La fonctionnalité **Logs Navigation** permet d'ouvrir le Log Explorer de Datadog avec une vue correspondant au contexte qui vous intéresse.

## Prérequis

- **Un compte Datadog** : un compte Datadog est nécessaire pour utiliser le plug-in. Si vous n'avez pas encore utilisé Datadog, rendez-vous sur le [site Web de Datadog][3] pour en savoir plus sur les outils d'observabilité de Datadog et inscrivez-vous pour profiter d'un essai gratuit.
- **Profileur en continu** : Pour que le plug-in puisse afficher des données de profiling et des insights, le profileur en continu doit être configuré sur vos services. Pour en savoir plus, consultez la section [Premiers pas avec le profileur en continu][2].
- **JetBrains Toolbox** : Pour utiliser la fonctionnalité [Afficher dans l'IDE](#afficher-dans-l-ide), la [JetBrains Toolbox][7] doit être installée sur la machine de développement.

## Implémentation

### Installer le plug-in Datadog

1. Cliquez sur **Plugins** et recherchez `Datadog`.
1. Cliquez sur **Install** pour télécharger et installer le plug-in dans votre IDE.
1. Si un message s'affiche pour vous informer que Datadog est un plug-in tiers, cliquez sur **Accept**.
1. Cliquez sur **Restart IDE**.

{{< img src="/developers/ide_integrations/idea/marketplace.png" alt="Le plug-in Datadog" style="width:100%;" >}}

Vous pouvez également installer le plug-in via le [Marketplace de JetBrains][4].

<span id="datadog_plugin_install_button"></span>

### Se connecter à Datadog

Après avoir installé le plug-in Datadog et redémarré votre IDE, connectez-vous à Datadog :
1. Après avoir ouvert un fichier ou un projet dans l'IDE, cliquez sur la fenêtre de l'outil **Datadog**.
1. Cliquez sur **Log in...**.
1. Dans la fenêtre du navigateur qui s'ouvre, sélectionnez votre site et votre organisation, puis autorisez l'accès à la plateforme.

**Remarque** : pour la plupart des utilisateurs, une seule connexion suffit. Si vous utilisez plusieurs organisations, vérifiez que le bon compte est actif. Pour ce faire, cliquez sur **Settings** -> **Tools** -> **Datadog** et vérifiez le compte que votre IDE utilise.

### Associer un service

Pour récupérer les données pertinentes depuis la plateforme Datadog, ajoutez des services connexes à votre projet :
1. Tout en ayant votre projet ouvert dans l'IDE, ouvrez la fenêtre de l'outil **Datadog** et sélectionnez **Manage Linked Services...** depuis le menu **Options**.
1. Cliquez sur l'icône plus dans la fenêtre des paramètres qui s'affiche (**+**).
1. Recherchez et sélectionnez les services que vous souhaitez ajouter au projet en cours.

Pour supprimer un service, sélectionnez le service concerné dans le tableau **Services** et cliquez sur l'icône moins (**-**).

<div class="alert alert-info">Lorsque vous fermez un projet, les noms des services associés au projet sont conservés.</div>

## Code Insights
L'onglet **Code Insights** affiche les informations générées par la plateforme Datadog en fonction de votre projet actuel. Les insights sont regroupés en trois catégories : performances, fiabilité et sécurité.

{{< img src="/developers/ide_integrations/idea/code-insights.png" alt="L'onglet Code Insights." style="width:100%;" >}}

Les Code Insights comprennent une description détaillée de chaque problème et offrent un accès facile à :
- L'emplacement du code source associé
- La plateforme Datadog pour obtenir des informations supplémentaires

Vous pouvez masquer des insights spécifiques et définir des filtres pour afficher uniquement les catégories d'insights qui vous intéressent.

## Profileur en continu

L'onglet **Continuous Profiler** contient des informations sur le profiling en continu du service dans un environnement donné. Ces informations sont regroupées sur une période spécifique. Les vues disponibles sont :
- [Top list](#top-list) : affiche la liste des méthodes qui sollicitent le plus de ressources pour la mesure de profiling actuelle.
- [Flame graph](#flame-graph) : affiche un flamegraph représentant les stack traces dans les profils.

Vous pouvez définir les paramètres suivants pour les données de profiling :
- Le type de profil à afficher
- L'environnement sur lequel le service s'exécute
- L'intervalle d'agrégation des échantillons de profiling

Les types de profiling disponibles incluent généralement des options telles que **CPU Time** et **Allocated Memory**. Ils varient toutefois en fonction de la plateforme et du langage.

### Top list

Le sous-onglet **Top List** affiche les méthodes qui consomment le plus de ressources d'après les données de profiling agrégées issues des serveurs Datadog.  La vue **Top List** est conçue pour afficher un résumé des méthodes susceptibles d'être les plus intéressantes en termes de consommation de ressources.

{{< img src="/developers/ide_integrations/idea/top-list1.png" alt="La vue Top List" style="width:100%;" >}}

- Double-cliquez sur un élément de la liste (ou sélectionnez **Jump to Source** dans le menu contextuel) pour ouvrir un éditeur de code source indiquant où la méthode est définie.
- Pour visualiser une méthode sous forme de flamegraph, sélectionnez **Search in Flame Graph** dans le menu contextuel.

#### Arborescence des appels

Disponible à droite de la **Top List**, l'arborescence des appels affiche les chemins menant vers (et depuis) la méthode sélectionnée.

La vue **Caller Hierarchy** par défaut affiche les appelants (ou prédécesseurs) de la méthode cible et la fréquence à laquelle ils apparaissent dans la pile d'appels. Pour afficher les appelés (ou successeurs), cliquez sur **Callee Hierarchy**.

Faites un clic droit sur une méthode dans l'arborescence des appels pour afficher les options permettant d'accéder à l'éditeur de source ou au flamegraph.

### Flamegraph

La vue Flamegraph est une représentation d'échantillons de profiling qui montre les stack traces et leur fréquence relative pendant la période considérée. Le plug-in Datadog recueille plusieurs profils individuels sur l'intervalle de temps demandé et procède à leur agrégation. Chaque profil individuel couvre un intervalle de 60 secondes dans l'intervalle de temps demandé.

{{< img src="/developers/ide_integrations/idea/flamegraph1.png" alt="Flamegraph affichant le temps CPU enregistré au cours de la dernière heure" style="width:100%;" >}}

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

### Mise en évidence de la source

Lorsque l'onglet Continuous Profiler est actif, le plug-in met en évidence certaines lignes de code dans la marge de l'éditeur. Pour la top list des méthodes, une icône apparaît dans la marge de l'éditeur et les lignes de code spécifiques sont mises en évidence en fonction des données de profiling actives.
- Passez votre souris sur l'icône pour afficher plus d'informations.
- Cliquez sur l'icône pour ouvrir l'onglet Profiling Top List ou accéder aux profils dans Datadog.
  {{< img src="/developers/ide_integrations/idea/interest-options.png" alt="Cliquez sur l'icône Datadog pour ouvrir les données de profiling dans un onglet ou dans Datadog" style="width:100%;" >}}

L'onglet Profiling actif affecte également l'arborescence du projet, qui est annotée avec les métriques du profil sélectionné :
{{< img src="/developers/ide_integrations/idea/project-tree-view.png" alt="L'arborescence du projet annotée avec les métriques de profil d'un onglet Profile" style="width:60%;" >}}

## Accès aux logs

Vous pouvez accéder au [Log Explorer][5] sur la plateforme Datadog directement depuis vos fichiers sources Java ou Go. Pour ce faire, utilisez les liens **View Logs** placés juste après les déclarations de log dans votre code source :

{{< img src="/developers/ide_integrations/idea/logs-navigation.png" alt="Fichier source affichant un lien View Logs." style="width:100%;" >}}

Cliquez sur le lien pour ouvrir le **Log Explorer** avec une requête correspondant le plus possible au nom du logger, au niveau de log et au message de log.

## Afficher dans l'IDE

La fonctionnalité **View in IntelliJ IDEA** permet d'accéder directement à vos fichiers source Java depuis la plateforme Datadog (pas encore disponible pour Go). Le bouton se situe à côté des frames dans les stack traces affichées sur la plateforme (par exemple, dans la fonctionnalité de [suivi des erreurs][6]) :

{{< img src="/developers/ide_integrations/idea/view-in-idea.png" alt="Une stack trace sur la plateforme Datadog affichant le bouton View in IntelliJ." style="width:100%;" >}}

<div class="alert alert-info">Cette fonctionnalité a deux prérequis : (1) l'intégration du code source Datadog doit être configurée pour votre service, et (2) la JetBrains Toolbox doit être installée sur votre machine de développement.</div>

## Commentaires

Vous pouvez nous faire part de vos retours sur notre [forum de discussion][1] ou en nous envoyant un e-mail à l'adresse [team-ide-integration@datadoghq.com][11].

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
[5]: /fr/logs/explorer/
[6]: /fr/tracing/error_tracking/
[7]: https://www.jetbrains.com/lp/toolbox/
[8]: /fr/security/application_security/vulnerability_management/
[9]: /fr/continuous_integration/guides/flaky_test_management/
[10]: /fr/watchdog/insights
[11]: mailto:team-ide-integration@datadoghq.com