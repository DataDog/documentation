---
further_reading:
- link: https://www.datadoghq.com/blog/dashboard-sharing/
  tag: Blog
  text: Partager des dashboards en tout sécurité avec des utilisateurs en dehors de
    votre organisation
- link: https://www.datadoghq.com/blog/template-variable-associated-values/
  tag: Blog
  text: Utiliser les template variables associées pour affiner vos dashboards
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

## Présentation

Pour bien débuter avec les dashboards, vous devez connaître les questions que vous vous posez régulièrement. Quels sont les problèmes courants que rencontrent vos clients ? Lorsqu'un problème survient, quelles questions vous aident à trouver une solution ?

Pour créer un dashboard utile, il est nécessaire d'apporter des réponses à ces questions. De plus, il est important de ne pas regrouper toutes vos idées dans le même dashboard. La création de dashboards distincts pour identifier les différents problèmes vous aidera à trouver des solutions plus rapidement.

Ce guide vous aide à vous lancer dans la création de dashboards. Vous découvrirez comment créer des dashboards simples afin d'aider votre équipe à mieux communiquer et à résoudre plus rapidement des problèmes.

## Prérequis

Si vous ne l'avez pas déjà fait, créez un [compte Datadog][1]. Installez l'Agent sur un host et une intégration pour un service exécuté sur cet host.

## En fonction de l'offre

Définissez l'objectif du dashboard que vous créez. Un dashboard peut vous aider, les membres de votre équipe et vous-même, à vous concentrer sur la bonne tâche. Un _dashboard d'équipe_ vous permet d'identifier les tâches prioritaires, les informations qui nécessitent votre attention et vos réussites. Créez un ou plusieurs dashboards d'équipe affichant les informations dont votre équipe a fréquemment besoin pour éviter d'avoir à les rechercher. Un dashboard affichant vos SLO et vos SLI constitue par exemple un excellent dashboard d'équipe.

Lorsqu'ils sont connectés à des données mises à jour en temps réel, les dashboards constituent un outil puissant qui permet de faciliter les échanges entre les responsables et les cadres. Un _dashboard de direction_ peut être utilisé pour vous assurer que vous travaillez sur les tâches les plus importantes, pour mesurer les coûts d'un service ou pour vérifier que vous atteignez vos objectifs, respectez vos SLO et employez une stratégie de scaling efficace. Les dashboards de direction sont encore plus efficaces lorsqu'ils affichent une réponse générale à chaque question tout en étant interconnectés pour comparer les données et analyser les réponses.

Les dashboards peuvent également vous aider à suivre les problèmes récurrents et à les résoudre. Il est possible de créer un _dashboard de dépannage_ à partir d'une quantité limitée d'informations, puis de l'étoffer au fur et à mesure de votre analyse. Par exemple, vous pouvez partir d'un graphique ou d'un widget issu d'un autre dashboard ou d'une autre vue qui affiche un problème, puis effectuer une analyse plus poussée à partir de cet élément.

## Explorer les dashboards prêts à l'emploi

Datadog fournit plusieurs dashboards prêts à l'emploi pour diverses fonctionnalités et intégrations. Pour l'infrastructure que vous surveillez, consultez les dashboards prêts à l'emploi fournis avec Datadog :

1. Accédez à **Dashboards > Dashboards list** et recherchez le nom d'une intégration que vous avez ajoutée, par exemple `Redis`, ou une fonctionnalité que vous utilisez, par exemple `RUM`.
2. Dans les résultats de votre recherche, identifiez les dashboards portant la mention *Preset* et vérifiez si l'un de ces graphiques affiche les réponses qui vous intéressent.
3. Cliquez sur le titre d'un dashboard prêt à l'emploi pour ouvrir un menu déroulant et parcourez les liens qui s'affichent pour en savoir plus sur son utilisation.

## Partir d'un dashboard existant

Pour créer un dashboard, il est notamment possible de trouver un dashboard similaire déjà utilisé et de l'ajuster selon vos besoins. Si vous trouvez un dashboard qui offre des réponses à une grande partie des réponses qui vous intéressent :

1. Dupliquez-le en ouvrant le dashboard et en sélectionnant **Clone dashboard** à partir du menu des paramètres (l'icône d'exportation sur le côté droit). Cette action crée une copie distincte du dashboard ; les modifications que vous apporterez au dashboard copié n'affecteront pas le widget source.
  {{< img src="/getting_started/dashboards/clone_dashboard.png" alt="Option de duplication d'un dashboard dans le menu déroulant" style="width:100%;" >}}
2. Modifiez le doublon en l'ouvrant et en cliquant sur **Edit widgets**. 
3. Supprimez les widgets dont vous n'avez pas besoin en sélectionnant **Delete** à partir du menu des paramètres du widget.
4. Réorganisez les widgets selon vos besoins. Chaque widget ou groupe de widgets peut être déplacé vers un autre endroit du dashboard à l'aide d'un glisser-déposer.
5. Copiez les widgets qui vous intéressent à partir d'autres dashboards en survolant le widget et en appuyant sur `Command + C` (`Ctrl + C` sur Windows). Collez-les dans votre dashboard en ouvrant le dashboard et en appuyant sur `Command + V` (`Ctrl + V` sur Windows).
5. Utilisez l'option **Export to Dashboard** disponible dans plusieurs vues Datadog pour exporter les données affichées dans un dashboard. Par exemple, les vues Log Explorer et Log Analytics vous permettent d'exporter des métriques et des listes de logs vers des dashboards.

## En savoir plus sur les métriques

Par l'intermédiaire des intégrations, Datadog recueille des [métriques][2] à partir de votre infrastructure et de vos applications. Les métriques recueillies sont documentées dans les fichiers README de l'intégration. Si vous souhaitez en savoir plus sur une métrique visible dans le [Metrics Explorer][3] ou lors de la création d'un dashboard, recherchez-la dans la documentation de l'intégration.

Imaginons par exemple que vous visualisez un graphique temporel de la métrique `aws.s3.first_byte_latency`. Accédez à la section [Données collectées][4] du fichier README de l'intégration AWS S3 pour consulter sa description : `The average per-request time from the complete request being received by a bucket to when the response starts to be returned. Shown as millisecond.` (Temps moyen écoulé entre la réception de la requête complète par un compartiment et le début du renvoi de la réponse. Affiché en millisecondes.)

## Ajouter des widgets et paramétrer les informations affichées

Après avoir sélectionné quelques métriques à ajouter à votre dashboard, testez plusieurs [types de widget][5] ainsi que les différentes [requêtes][6], [fonctions][7] et [méthodes d'agrégation][8] pour optimiser l'affichage des données en fonction des réponses que vous recherchez.

En spécifiant des template variables, vous pouvez faire en sorte qu'un même dashboard réponde à des questions pour une multitude de scénarios. Par exemple, vous pouvez créer un graphique temporel qui affiche les métriques de latence correspondant aux centres de données d'une région spécifique sélectionnée à partir du menu déroulant des variables du dashboard, ou celles correspondant à l'ensemble des centres de données. Pour en savoir plus, consultez la section [Template variables][9].

Vous pouvez améliorer la lisibilité de vos graphiques en ajustant les intervalles de l'axe des ordonnées, les couleurs ou les légendes, ou en ajoutant des marqueurs et des événements en superposition. Consultez la [documentation sur les dashboards][10] pour découvrir toutes les possibilités de personnalisation des widgets [Série temporelle][11] et des [autres types de widgets][5].

Pour obtenir plus de détails et d'exemples d'utilisation de ces techniques, inscrivez-vous au cours en ligne [Améliorer vos dashboards][12] (en anglais).

## Tester les autres types de widget

La représentation de métriques sous forme de série temporelle est utile, mais les dashboards peuvent contenir bien d'autres types de widget pour communiquer des informations importantes. Essayez les widgets suivants :

 - **Alert values and Check statuses** : affichez de grands chiffres rouges, jaunes et verts pour attirer l'attention sur les réussites ou les problèmes.
 - **Heat maps** : visualisez les relations métrique-infrastructure complexes en fonction de plusieurs tags avec des graphiques intuitifs présentant diverses intensités de couleurs.
   {{< img src="getting_started/dashboards/heatmap_widget.png" alt="Exemple de carte thermique"  >}}
 - **iFrames, formatted text, and images** : affichez diverses informations à la manière d'un site Web pour décrire le contenu du dashboard et fournir des ressources supplémentaires.
 - **Tables** : affichez des listes de métriques regroupées par clés de tag.
 - **Top lists** : affichez, par exemple, les hosts ayant le moins d'espace libre, les services qui renvoient le plus d'erreurs ou les URL qui renvoient le plus d'erreurs 404.
 - **Host map** : affichez, par exemple, un diagramme des hosts de votre infrastructure avec des couleurs indiquant le statut de leurs intégrations ou services.
 - **Service Level Objectives (SLO)** : affichez les performances de votre équipe par rapport aux objectifs avec un widget Résumé des SLO, et ajoutez d'autres widgets pour afficher les détails de vos métriques SLI.
 - **Distributions** : affichez, par exemple, un histogramme du nombre de différents types d'événements dans un environnement conteneurisé, le nombre d'erreurs critiques dans chaque service, le flux du site Web (nombre d'utilisateurs accédant à la page 2, à la page 3, à la page 4), ou les centiles de latence des compartiments.

Consultez la section [Widgets][5] pour en savoir plus et découvrir des exemples de configuration de ces graphiques.

## Organiser un dashboard, ajouter des liens et analyser les données

Réorganisez les graphiques de votre dashboard en fonction de votre flux de travail ou de vos conversations. Glissez et déposez des widgets pour les déplacer. Sur les screenboards, utilisez des widgets Texte libre pour organiser des sections sous les titres. Sur les timeboards, utilisez un widget Groupe pour regrouper plusieurs widgets en ayant la possibilité de les masquer lorsque vous visualisez le dashboard.

Il est possible d'ajouter des liens à un dashboard de deux façons différentes :

 - En ajoutant un widget Notes et Liens, qui accepte le texte au format Markdown, y compris les liens. L'éditeur du widget affiche des conseils pour vous aider à utiliser le format Markdown.
 - En créant un lien personnalisé à partir du menu des paramètres d'un widget (icône en forme d'engrenage). Les liens personnalisés peuvent interpoler des variables et des template variables de façon à ce que le lien change en fonction des sélections de l'utilisateur. Ce dernier est ainsi redirigé vers la page pertinente pour analyser les données ou prendre des mesures correctives.
     {{< img src="getting_started/dashboards/opening_custom_link.mp4" alt="Ouvrir un lien personnalisé" video=true >}}

## Et ensuite ?

### Partager vos dashboards en dehors du site Datadog

Cliquez sur **Generate Public URL** dans le menu des paramètres d'un dashboard (icône en forme d'engrenage) pour créer une URL et ainsi afficher le dashboard sur un grand écran ou le partager avec des personnes qui ne disposent pas d'un compte Datadog.

Intégrez un dashboard dans les communications avec votre équipe en utilisant l'[intégration Slack][13]. Vous pouvez ainsi importer des dashboards et d'autres fonctionnalités Datadog, comme les monitors et les incidents, dans un canal Slack.

### Créer plusieurs dashboards rapidement

Chaque dashboard présente une représentation JSON que vous pouvez copier ou exporter à partir du menu des paramètres. Chaque widget d'un dashboard présente également une définition JSON, que vous pouvez voir et modifier en ouvrant l'éditeur du widget (icône en forme de crayon) et en cliquant sur l'onglet JSON sous **Graph your data**.

Étant donné que tous les widgets et les dashboards sont représentés en JSON, vous pouvez automatiser leur création à l'aide de l'[API Dashboards][14]. Cette fonctionnalité est particulièrement utile si vous souhaitez générer un dashboard à chaque fois que votre équipe commence un nouveau projet, rencontre un problème ou formalise un SLO, par exemple.

### Consulter des dashboards depuis l'application mobile Datadog

Consultez vos dashboards sur votre appareil mobile grâce à l'[application mobile Datadog][15], disponible sur l'[App Store d'Apple][16] et le [Google Play Store][17].

Avec cette application, vous pouvez consulter et rechercher tous les dashboards accessibles de votre organisation Datadog, et les filtrer à l'aide des template variables définies dans l'application Web Datadog.

{{< img src="dashboards/dashboards-list-mobile.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="Dashboards sous iOS et Android">}}

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/
[2]: /fr/metrics/introduction/
[3]: /fr/metrics/explorer/
[4]: /fr/integrations/amazon_s3/#data-collected
[5]: /fr/dashboards/widgets/
[6]: /fr/dashboards/querying/
[7]: /fr/dashboards/functions/
[8]: /fr/metrics/distributions/
[9]: /fr/dashboards/template_variables/
[10]: /fr/dashboards/
[11]: /fr/dashboards/widgets/timeseries/
[12]: https://learn.datadoghq.com/courses/building-better-dashboards/
[13]: /fr/integrations/slack/
[14]: /fr/api/v1/dashboards/
[15]: /fr/service_management/mobile/
[16]: https://apps.apple.com/app/datadog/id1391380318
[17]: https://play.google.com/store/apps/details?id=com.datadog.app