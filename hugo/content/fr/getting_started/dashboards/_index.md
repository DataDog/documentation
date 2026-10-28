---
description: Apprenez à créer des dashboards efficaces pour le suivi d'équipe, les
  rapports de direction et le dépannage à l'aide des outils de visualisation de Datadog.
further_reading:
- link: https://www.datadoghq.com/blog/dashboard-sharing/
  tag: Blog
  text: Partager des dashboards en tout sécurité avec des utilisateurs en dehors de
    votre organisation
- link: https://www.datadoghq.com/blog/template-variable-associated-values/
  tag: Blog
  text: Utiliser les variables de modèle associées pour affiner vos dashboards
- link: https://learn.datadoghq.com/courses/building-better-dashboards
  tag: Centre d'apprentissage
  text: Améliorer vos dashboards
- link: /dashboards/
  tag: Documentation
  text: Notions de base sur les dashboards
- link: /notebooks/
  tag: Documentation
  text: Faire parler ses données grâce aux notebooks
- link: /monitors/
  tag: Documentation
  text: Monitors, SLO, notifications, downtimes et incidents
- link: https://dtdg.co/fe
  tag: Validation des bases
  text: Participer à une session interactive sur l'amélioration des visualisations
    avec des dashboards
title: Débuter avec les dashboards
---
{{< learning-center-callout header="Rejoignez une session de webinaire de formation" hide_image="true" btn_title="S'inscrire" btn_url="https://www.datadoghq.com/technical-enablement/sessions/?tags.topics-0=Dashboarding">}}
  Explorez et inscrivez-vous aux sessions de formation fondamentale. Apprenez à personnaliser vos dashboards à l'aide de notre bibliothèque de visualisations et du générateur de Dashboard par glisser-déposer. Favorisez la réussite de votre équipe en partageant des données avec les parties prenantes via des rapports, des URL publiques et des notebooks.
{{< /learning-center-callout >}}

## Présentation {#overview}

La clé pour bien démarrer avec les dashboards est de savoir quel genre de questions vous vous posez régulièrement. Quels sont les problèmes courants auxquels vos clients sont confrontés ? Lorsqu'un problème survient, quelles questions vous aident à trouver une solution ? 

Créer un bon dashboard consiste à faire ressortir les réponses à ces questions. De plus, il est important de ne pas surcharger un dashboard en y concentrant toutes ces informations. La création de dashboards distincts pour identifier différents problèmes peut vous aider à trouver rapidement vos réponses.

Ce guide vous aide à démarrer sur la voie de la création de dashboards. Ces dashboards de base favorisent la discussion au sein de l'équipe et accélèrent la résolution des problèmes.

## Prérequis {#prerequisites}

Si vous ne l'avez pas encore fait, créez un [compte Datadog][1]. Installez l'Agent sur un host, ainsi qu'une intégration pour tout ce qui s'exécute sur ce host.

## Plan {#plan}

Déterminez l'objectif du dashboard que vous créez. Un dashboard peut vous aider, vous et vos coéquipiers, à vous concentrer sur le bon travail. Un _dashboard d'équipe_ vous rappelle ce qui est prioritaire, ce qui nécessite une attention particulière et dans quels domaines vous réussissez. Créez un dashboard d'équipe (ou plusieurs) avec les informations dont les gens ont le plus souvent besoin et qu'ils doivent rechercher. Les détails des SLO et SLI constituent un excellent dashboard d'équipe.

Un dashboard connecté à des données en temps réel est un outil puissant pour orienter les conversations avec les responsables et les cadres. Un bon _dashboard de direction_ peut montrer que vous travaillez sur les choses les plus importantes, combien un service vous coûte, ou si vous progressez vers vos objectifs, respectez vos SLO et évoluez efficacement. Les dashboards exécutifs sont plus efficaces lorsqu'ils répondent à ces questions au plus haut niveau et qu'ils sont interconnectés pour comparer et analyser les réponses.

Les dashboards peuvent également vous aider à localiser des problèmes persistants et à les résoudre. _Les dashboards de dépannage_ commencent souvent comme une ébauche de ce que vous savez, puis se développent progressivement au fur et à mesure de vos découvertes. Par exemple, commencez par un graphique ou un widget provenant d'un autre dashboard ou d'une vue qui montre un problème. Vous pouvez analyser davantage à partir de là pour trouver votre solution.

## Explorez les dashboards prêts à l'emploi {#explore-out-of-the-box-dashboards}

Datadog fournit de nombreux dashboards prêts à l'emploi pour les fonctionnalités et intégrations. Pour l'infrastructure que vous surveillez, consultez les dashboards prêts à l'emploi fournis avec Datadog :

1. Dans Datadog, accédez à la [page Dashboards List][2] et recherchez le nom d'une intégration que vous avez ajoutée. Par exemple, `Redis`, ou une fonctionnalité que vous utilisez, telle que `RUM`. 
2. Parcourez les résultats de recherche pour les dashboards marqués {{< ui >}}Preset{{< /ui >}} et voyez si au moins certains des graphiques affichent les réponses que vous recherchez.
3. Explorez les liens dans le menu déroulant du titre du dashboard prêt à l'emploi pour trouver plus d'informations sur la façon dont les utilisateurs les emploient.

## Commencez par réutiliser d'autres dashboards {#start-by-reusing-other-dashboards}

Une façon courante de commencer un dashboard consiste à trouver un dashboard similaire déjà utilisé et à le modifier pour répondre à vos besoins. Si vous trouvez un dashboard qui répond à bon nombre des questions auxquelles vous souhaitez que votre dashboard réponde : 

1. Clonez-le en ouvrant le dashboard et en sélectionnant {{< ui >}}Clone dashboard{{< /ui >}} dans le menu Configuration Actions (le bouton {{< ui >}}Configure{{< /ui >}} sur le côté droit). Cela crée une copie non liée du dashboard ; les modifications que vous apportez dans la nouvelle copie n'affectent pas le widget source.
  {{< img src="getting_started/dashboards/configure_clone_dashboard.png" alt="Option Clone dashboard dans le menu Configuration Actions" style="width:100%;" >}}
2. Modifiez le clone en l'ouvrant et en cliquant sur {{< ui >}}Edit widgets{{< /ui >}}. 
3. Supprimez les widgets dont vous n'avez pas besoin en sélectionnant {{< ui >}}Delete{{< /ui >}} dans le menu Settings du widget.
4. Déplacez les éléments pour les adapter à vos besoins. Les groupes et les widgets individuels peuvent être glissés et déposés vers de nouveaux emplacements dans le dashboard.
5. Copiez les widgets qui vous plaisent depuis d'autres dashboards en survolant le widget et en saisissant `Command + C` (`Ctrl + C` sous Windows). Collez-le dans votre dashboard en ouvrant le dashboard et en saisissant `Command + V` (`Ctrl + V` sous Windows).
5. Utilisez l'option {{< ui >}}Export to Dashboard{{< /ui >}} fournie par de nombreuses vues Datadog pour les données qu'elles affichent. Par exemple, les vues Log Explorer et Log Analytics disposent d'options de partage pour exporter des listes de logs et des métriques vers des dashboards.

## En savoir plus sur les métriques {#learn-more-about-metrics}

Grâce aux intégrations, Datadog collecte des [métriques][3] à partir de votre infrastructure et de vos applications. Les métriques collectées sont documentées dans les fichiers README de l'intégration. Si vous rencontrez une métrique dans le [Metrics Explorer][4] ou lors de la création d'un dashboard, et que vous souhaitez savoir de quoi il s'agit, consultez la documentation Integrations. 

Par exemple, supposons que vous consultiez un graphique temporel de la métrique `aws.s3.first_byte_latency`. Accédez à la section [Données collectées][5] du fichier README de l'intégration Amazon S3 pour en voir la description : `The average per-request time from the complete request being received by a bucket to when the response starts to be returned. Shown as millisecond.`

## Ajoutez des widgets et affinez leur contenu {#add-widgets-and-refine-what-they-show}

Après avoir sélectionné quelques métriques à ajouter à votre dashboard, testez d'autres [types de widget][6], de [requêtes][7], de [fonctions][8] et d'[approches d'aggrégation][9] pour afficher les données de façon à apporter les meilleures réponses à vos questions. 

En spécifiant des variables de modèle, vous pouvez faire en sorte qu'un seul dashboard réponde à des questions pour une sélection de scénarios. Par exemple, vous pouvez créer un graphique temporel qui affiche les métriques de latence pour la zone géographique du centre de données sélectionnée par l'utilisateur dans le menu déroulant des variables du dashboard, ou pour l'ensemble de ces zones. Pour plus d'informations, consultez [Variables de modèle][10].

Vous pouvez rendre les graphiques plus faciles à lire en ajustant les plages de l'axe Y, les couleurs ou les légendes, ou en ajoutant des marqueurs et des superpositions d'événements. Consultez la [documentation sur les Dashboards][11] pour découvrir toutes les façons de personnaliser et d'affiner les [séries temporelles][12] et les [autres widgets][6].

Pour obtenir plus de détails et d'exemples à propos de ces techniques, inscrivez-vous au cours en ligne [Améliorer vos dashboards][13].

## Essayez d'autres widgets {#try-out-other-widgets}

Les graphiques de séries temporelles de métriques sont utiles, mais les dashboards peuvent contenir de nombreux types de widgets pour communiquer des informations importantes. Essayez :

 - **Valeurs d'alerte et statuts de check** : Affichez de grands chiffres rouges, jaunes et verts pour attirer l'attention sur les succès ou les problèmes.
 - **Cartes thermiques** : Affichez des relations complexes entre métriques et infrastructure à travers plusieurs tags avec des graphiques d'intensité de couleur intuitifs.
   {{< img src="getting_started/dashboards/heatmap_widget.png" alt="Exemple de carte thermique" >}}
 - **iFrames, texte formaté et images** : Affichez un nombre quelconque de détails de type site web pour aider à expliquer le contenu du dashboard et fournir des ressources supplémentaires.
 - **Tableaux** : Affichez des listes de métriques regroupées par clés de tag.
 - **Top lists** : Par exemple, affichez quels hosts ont le moins d'espace libre, quels services génèrent le plus d'erreurs ou quelles URL renvoient le plus d'erreurs 404.
 - **Hostmap** : Affichez un diagramme, par exemple, des hosts de votre infrastructure avec des couleurs indiquant le statut de leurs intégrations ou services.
 - **Service Level Objectives (SLO)** : Affichez la performance de l'équipe par rapport aux objectifs avec un widget SLO, et regroupez-le avec des widgets supplémentaires affichant des détails pour les métriques SLI.
 - **Distributions** : Affichez, par exemple, un histogramme du nombre de différents types d'événements dans un environnement conteneurisé, le nombre d'erreurs critiques dans chaque service, le flux du site web (nombre d'utilisateurs atteignant la page 2, la page 3, la page 4) ou les compartiments de centiles de latence.

Consultez la section [Widgets][6] pour en savoir plus et découvrir des exemples de configuration de ces graphiques.

## Organisez, liez et analysez {#organize-link-and-analyze}

Déplacez les graphiques pour créer un flux correspondant à votre travail ou aux conversations que vous avez autour du dashboard. Faites glisser et déposez les widgets pour les placer. Sur les screenboards, utilisez des widgets Free Text pour organiser les sections sous des titres. Sur les timeboards, ajoutez un widget Group pouvant contenir plusieurs widgets et se réduire pour ne pas gêner lors de la consultation du dashboard.

Pour les dashboards qui deviennent volumineux, utilisez des onglets pour organiser les widgets en sections nommées. Cliquez sur {{< ui >}}\+{{< /ui >}} dans la barre d'onglets (ou {{< ui >}}Add New Tab{{< /ui >}} sous le menu déroulant à côté de {{< ui >}}Add Widgets{{< /ui >}}) pour ajouter un onglet, puis déplacez les widgets entre les onglets depuis le menu de partage de chaque widget (⋮). L'utilisation d'onglets permet de garder un dashboard unique ciblé et facile à parcourir, sans obliger les utilisateurs à faire défiler du contenu non pertinent. Pour plus d'informations, consultez [Onglets][20].

Deux façons permettent de créer des liens à partir d'un dashboard vers n'importe quelle URL cible :

 - Ajoutez un widget Notes et liens, qui peut contenir du texte formaté en Markdown, y compris des liens. L'éditeur de widget inclut des conseils de formatage Markdown :
 - Créez un lien personnalisé à partir du menu Settings (engrenage) d'un widget. Les liens personnalisés peuvent interpoler des variables et des variables de modèle, de sorte que le lien change en fonction de ce que l'utilisateur a sélectionné lorsqu'il clique, l'amenant exactement au bon endroit pour analyser les données ou prendre des mesures correctives. 
     {{< img src="getting_started/dashboards/opening_custom_link.mp4" alt="Ouverture d'un lien personnalisé" video=true >}}

## Prochaines étapes {#whats-next}

### Partagez vos dashboards en dehors du site Datadog {#share-your-dashboards-outside-of-the-datadog-site}

Cliquez sur {{< ui >}}Configure Public URL{{< /ui >}} dans le menu d'exportation d'un dashboard pour créer une URL que vous pouvez partager avec de grands écrans ou des personnes qui n'ont pas nécessairement de compte Datadog. Pour plus d'informations, consultez [Sharing Dashboards][14].

Intégrez un dashboard dans les communications avec votre équipe en utilisant l'[intégration Slack][15] pour importer des dashboards et d'autres fonctionnalités Datadog, comme les monitors et les incidents, dans un canal Slack.

### Créez rapidement plusieurs dashboards {#create-multiple-dashboards-quickly}

Chaque dashboard possède une représentation JSON que vous pouvez copier ou exporter depuis le menu Settings. Chaque widget du dashboard possède également une définition JSON, que vous pouvez consulter et modifier en ouvrant l'éditeur de widget (icône crayon) et en cliquant sur l'onglet JSON sous {{< ui >}}Graph your data{{< /ui >}}.

Étant donné que tous les widgets et les dashboards sont représentés en JSON, vous pouvez automatiser leur création à l'aide de l'[API Dashboards][16]. Cette fonctionnalité est particulièrement utile si vous souhaitez générer un Dashboard à chaque fois que votre équipe commence un nouveau projet, rencontre un incident ou formalise un SLO, par exemple.

### Afficher les dashboards depuis l'application mobile Datadog {#view-dashboards-from-the-datadog-mobile-app}

Consultez vos dashboards sur votre appareil mobile grâce à l'[application mobile Datadog][17], disponible sur l'[Apple App Store][18] et le [Google Play Store][19]. 

Avec cette application, vous pouvez consulter et rechercher tous les dashboards accessibles de votre organisation Datadog, et les filtrer à l'aide des variables de modèle définies dans l'application Web Datadog.

{{< img src="dashboards/dashboards-list-mobile.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="Dashboards sur iOS et Android">}}

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/
[2]: https://app.datadoghq.com/dashboard/lists
[3]: /fr/metrics/introduction/
[4]: /fr/metrics/explorer/
[5]: /fr/integrations/amazon_s3/#data-collected
[6]: /fr/dashboards/widgets/
[7]: /fr/dashboards/querying/
[8]: /fr/dashboards/functions/
[9]: /fr/metrics/distributions/
[10]: /fr/dashboards/template_variables/
[11]: /fr/dashboards/
[12]: /fr/dashboards/widgets/timeseries/
[13]: https://learn.datadoghq.com/courses/building-better-dashboards/
[14]: /fr/dashboards/sharing/
[15]: /fr/integrations/slack/
[16]: /fr/api/v1/dashboards/
[17]: /fr/mobile/
[18]: https://apps.apple.com/app/datadog/id1391380318
[19]: https://play.google.com/store/apps/details?id=com.datadog.app
[20]: /fr/dashboards/configure/#tabs