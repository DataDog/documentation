---
title: Débuter avec les dashboards
kind: documentation
further_reading:
  - link: 'https://www.datadoghq.com/blog/dashboard-sharing/'
    tag: Blog
    text: Partager des dashboards en tout sécurité avec des utilisateurs en dehors de votre organisation
  - link: 'https://www.datadoghq.com/blog/template-variable-associated-values/'
    tag: Blog
    text: Utiliser les template variables associées pour affiner vos dashboards
  - link: 'https://learn.datadoghq.com/enrol/index.php?id=8'
    tag: Apprentissage
    text: "Apprentissage en ligne à votre rythme\_: Améliorer vos dashboards"
  - link: /dashboards/
    tag: Documentation
    text: Notions de base sur les dashboards
  - link: /notebooks/
    tag: Documentation
    text: Raconter une histoire à partir de données avec les Notebooks
  - link: /monitors/
    tag: Documentation
    text: 'Monitors, SLO, notifications, downtimes et incidents'
---
## Présentation

Pour bien débuter avec les dashboards, vous devez connaître les questions que vous vous posez régulièrement. Quels sont les problèmes courants que rencontrent vos clients ? Lorsqu'un problème survient, quelles questions vous aident à trouver une solution ?

Pour créer un dashboard utile, il est nécessaire d'apporter des réponses à ces questions. De plus, il est important de ne pas regrouper toutes vos idées dans le même dashboard. La création de dashboards distincts pour identifier les différents problèmes vous aidera à trouver des solutions plus rapidement.

Ce guide vous aidera à vous lancer dans la création de dashboards. Vous allez découvrir comment créer des dashboards simples afin d'aider votre équipe à échanger sur les informations importantes et identifier rapidement la cause d'un problème.

## Prérequis

Si vous ne l'avez pas déjà fait, créez un [compte Datadog][1]. Installez l'Agent sur un host et une intégration pour un service exécuté sur cet host.

## Planification

Choisissez de créer un dashboard de type timeboard (tous les graphiques utilisent le même intervalle de temps) ou de type screenboard (plus large variété de widgets, intervalles différents). En cas de doute, consultez la section sur les [timeboards et les screenboards][2].

Définissez également l'objectif du dashboard que vous créez. Un dashboard peut vous aider, vous et les membres de votre équipe, à vous concentrer sur la bonne tâche. Un _dashboard d'équipe_ vous permet d'identifier les tâches prioritaires, les informations qui nécessitent votre attention immédiate et vos réussites. Créez un ou plusieurs dashboards d'équipe affichant les informations dont votre équipe a fréquemment besoin pour éviter d'avoir à les rechercher. Un dashboard affichant vos SLO et vos SLI constitue par exemple un excellent dashboard d'équipe.

Lorsqu'ils sont connectés à des données mises à jour en temps réel, les dashboards constituent un outil puissant qui permet de faciliter les échanges entre les responsables et les cadres. Un _dashboard de direction_ peut être utilisé pour vérifier que vous travaillez sur les tâches les plus importantes, pour mesurer les coûts d'un service ou pour vérifier que vous atteignez vos objectifs, respectez vos SLO et employez une stratégie de scaling efficace. Les dashboards de direction deviennent plus efficaces que jamais lorsqu'ils affichent une réponse générale à chaque question tout en étant interconnectés pour permettre des analyses plus poussées.

Les dashboards peuvent également vous aider à suivre les problèmes récurrents et à les résoudre. Il est possible de créer un _dashboard de dépannage_ à partir d'une quantité limitée d'informations puis de l'étoffer au fur et à mesure de votre analyse. Par exemple, vous pouvez partir d'un graphique ou d'un widget issu d'un autre dashboard ou d'une autre vue qui affiche un problème, puis effectuer une analyse plus poussée à partir de cet élément.

## Explorer les dashboards prêts à l'emploi

Datadog fournit plusieurs dashboards prêts à l'emploi pour diverses fonctionnalités et intégrations. Pour l'infrastructure que vous surveillez, consultez les dashboards prêts à l'emploi fournis avec Datadog :

1. Accédez à **Dashboards > Dashboards list** et recherchez le nom d'une intégration que vous avez ajoutée, par exemple `Redis`, ou une fonctionnalité que vous utilisez, par exemple `RUM`.
2. Dans les résultats de votre recherche, identifiez les dashboards portant la mention *Preset* et vérifiez si l'un de ces graphiques affiche les réponses qui vous intéressent.
3. Cliquez sur le titre d'un dashboard prêt à l'emploi pour ouvrir un menu déroulant et parcourez les liens qui s'affichent pour en savoir plus sur son utilisation.

## Partir d'un dashboard existant

Pour créer un dashboard, il est notamment possible de trouver un dashboard similaire déjà utilisé et de l'ajuster selon vos besoins. Si vous trouvez un dashboard qui offre des réponses à une grande partie des réponses qui vous intéressent :

1. Clonez-le en ouvrant le dashboard et en sélectionnant **Clone dashboard** à partir du menu des paramètres (l'icône en forme d'engrenage sur le côté droit). Cette action crée une copie distincte du dashboard ; les modifications que vous apporterez au dashboard copié n'affecteront pas le widget source.
    {{< img src="getting_started/dashboards/cloning_dashboard.gif" alt="Cloner un dashboard"  >}}
2. Modifiez le clone en l'ouvrant et en cliquant sur **Edit widgets**. 
3. Supprimez les widgets dont vous n'avez pas besoin en sélectionnant **Delete** à partir du menu des paramètres du widget.
4. Réorganisez les widgets selon vos besoins. Chaque widget ou groupe de widgets peut être déplacé vers un autre endroit du dashboard à l'aide d'un glisser-déposer.
5. Copiez les widgets qui vous intéressent à partir d'autres dashboards en survolant le widget et en appuyant sur `Command + C` (`Ctrl + C` sur Windows). Collez-les dans votre dashboard en ouvrant le dashboard et en appuyant sur `Command + V` (`Ctrl + V` sur Windows).
5. Utilisez l'option **Export to Dashboard** disponible dans plusieurs vues Datadog pour exporter les données affichées dans un dashboard. Par exemple, les vues Log Explorer et Log Analytics vous permettent d'exporter des métriques et des listes de logs vers des dashboards.

## En savoir plus sur les métriques

Par l'intermédiaire des intégrations, Datadog collecte des [métriques][3] à partir de votre infrastructure et de vos applications. Les métriques collectées sont documentées dans les fichiers README de l'intégration. Si vous souhaitez en savoir plus sur une métrique visible dans le [Metrics Explorer][4] ou lors de la création d'un dashboard, recherchez-la dans la documentation de l'intégration.

Imaginons par exemple que vous visualisez un graphique temporel de la métrique `aws.s3.first_byte_latency`. Accédez à la section [Données collectées] du fichier README de l'intégration AWS S3 pour consulter sa description : `The average per-request time from the complete request being received by a bucket to when the response starts to be returned. Shown as millisecond.` (Temps moyen écoulé entre la réception de la requête complète par un compartiment et le début du renvoi de la réponse. Affiché en millisecondes.)

## Ajouter des widgets et paramétrer les informations affichées

Après avoir sélectionné quelques métriques à ajouter à votre dashboard, testez les différents [types de widget][6] ainsi que les différentes [requêtes][7], [fonctions][8] et [méthodes d'agrégation][9] pour optimiser l'affichage des données en fonction des réponses que vous recherchez.

En spécifiant des template variables, vous pouvez faire en sorte qu'un même dashboard réponde à des questions pour une multitude de scénarios. Par exemple, vous pouvez créer un graphique temporel qui affiche les métriques de latence correspondant aux centres de données d'une région spécifique sélectionnée à partir du menu déroulant des variables du dashboard, ou celles correspondant à l'ensemble des centres de données en même temps. Pour en savoir plus, consultez la section [Template variables][10].

Vous pouvez créer des graphiques plus faciles à lire en ajustant les intervalles de l'axe des ordonnées, les couleurs ou les légendes, ou en ajoutant des marqueurs et des événements en superposition. Consultez la [documentation sur les dashboards][1] pour découvrir toutes les possibilités de personnalisation des widgets [Série temporelle][12] et des [autres types de widgets][6].

Pour obtenir plus de détails et d'exemples d'utilisation de ces techniques, inscrivez-vous au cours en ligne [Améliorer vos dashboards][13].

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

Consultez la [documentation sur les widgets][6] pour en savoir plus et découvrir des exemples de configuration de ces graphiques.

## Organiser un dashboard, ajouter des liens et analyser les données

Réorganisez les graphiques de votre dashboard en fonction de votre flux de travail ou de vos conversations. Glissez et déposez des widgets pour les déplacer. Sur les screenboards, utilisez des widgets Texte libre pour organiser des sections sous les titres. Sur les timeboards, utilisez un widget Groupe pour regrouper plusieurs widgets en ayant la possibilité de les masquer lorsque vous visualisez le dashboard.

Il est possible d'ajouter des liens à un dashboard de deux façons différentes :

 - En ajoutant un widget Notes et Liens, qui accepte le texte au format Markdown, y compris les liens. L'éditeur du widget affiche des conseils pour vous aider à utiliser le format Markdown.
 - En créant un lien personnalisé à partir du menu des paramètres d'un widget (icône en forme d'engrenage). Les liens personnalisés peuvent interpoler des variables et des template variables de façon à ce que le lien change en fonction des sélections de l'utilisateur : celui-ci accède ainsi directement au bon endroit pour analyser les données ou prendre des mesures correctives.
     {{< img src="getting_started/dashboards/opening_custom_link.gif" alt="Ouvrir un lien personnalisé"  >}}

## Et ensuite ?

### Partager vos dashboards en dehors de l'application Datadog

Cliquez sur **Generate Public URL** dans le menu des paramètres d'un dashboard (icône en forme d'engrenage) pour créer une URL et ainsi afficher le dashboard sur un grand écran ou le partager avec des personnes qui ne disposent pas d'un compte Datadog.

Intégrez un dashboard dans les communications avec votre équipe en utilisant l'[intégration Slack][14] pour importer des dashboards et d'autres fonctionnalités Datadog, comme les monitors et les incidents, dans un canal Slack.

### Créer plusieurs dashboards rapidement

Chaque dashboard présente une représentation JSON que vous pouvez copier ou exporter à partir du menu des paramètres. Chaque widget d'un dashboard présente également une définition JSON, que vous pouvez voir et modifier en ouvrant l'éditeur du widget (icône en forme de crayon) et en cliquant sur l'onglet JSON sous **Graph your data**.

Étant donné que tous les widgets et les dashboards sont représentés en JSON, vous pouvez automatiser leur création à l'aide de l'[API Dashboards][15]. Cette fonctionnalité est particulièrement utile si vous souhaitez générer un dashboard à chaque fois que votre équipe commence un nouveau projet, rencontre un incident ou formalise un SLO, par exemple.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/
[2]: /fr/dashboards/#screenboard-vs-timeboard
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
[13]: https://learn.datadoghq.com/enrol/index.php?id=8
[14]: /fr/integrations/slack/
[15]: /fr/api/v1/dashboards/