---
title: Gestion des incidents
kind: documentation
description: Créer et gérer des incidents
further_reading:
  - link: dashboards/querying/#incident-management-analytics
    tag: Documentation
    text: Incident Management Analytics
  - link: https://www.datadoghq.com/blog/incident-postmortem-process-best-practices/
    tag: Blog
    text: Meilleures pratiques pour écrire des postmortems d'incident
---
{{< site-region region="gov" >}}
<div class="alert alert-warning">La fonctionnalité de gestion des incidents n'est pas disponible pour le site gouvernemental de Datadog.</div>
{{< /site-region >}}

{{< img src="monitors/incidents/workflow-1-graph-1.png" alt="À partir d'un graphique"  style="width:80%;">}}

Tout événement susceptible d'entraîner une interruption des services de votre organisation peut être considéré comme un incident, et il est souvent nécessaire d'avoir un système bien défini pour traiter ce genre d'événements. La fonctionnalité de gestion des incidents de Datadog fournit un système grâce auquel votre organisation peut identifier et réduire les incidents de manière efficace.

Les incidents sont regroupés dans Datadog au même titre que les métriques, les traces et les logs que vous recueillez. Vous pouvez consulter et filtrer les incidents qui vous intéressent.

Dans Datadog, les situations suivantes justifient la déclaration d'un incident :

* Un problème a ou peut avoir un impact sur les clients ou les services.
* Vous ne savez pas avec certitude si un événement constitue un incident. Avertissez les personnes compétentes et renforcez la gravité de la situation de manière adéquate.

## Utilisation

La gestion des incidents ne nécessite aucune installation. Pour consulter vos incidents, accédez à la page [Incidents][1] où vous trouverez tous les incidents en cours. Vous pouvez configurer des champs supplémentaires pour tous les incidents dans les [paramètres d'incident][2].

**Remarque** : créez et gérez vos incidents avec l'[application mobile Datadog][3], disponible sur l'[Apple App Store][4] et sur le [Google Play Store][5].

### Créer un incident

#### Depuis un graphique

Vous pouvez déclarer un incident directement depuis un graphique, en cliquant sur le bouton d'exportation du graphique, puis sur **Declare incident**. La fenêtre de création d'incident apparaît et le graphique est ajouté en tant que signal à l'incident.

{{< img src="monitors/incidents/from-a-graph.png" alt="Créer un incident depuis un graphique" style="width:80%;">}}

#### Depuis le presse-papiers

Vous pouvez utiliser le presse-papiers Datadog pour rassembler plusieurs monitors et graphiques et ainsi générer un incident. Pour ajouter un dashboard au presse-papiers, copiez n'importe quel graphique, puis sélectionnez **Open Clipboard**. Ajoutez tous les graphiques et monitors pertinents, puis cliquez sur **Add to New Incident**. Tout ce qui se trouve dans le presse-papiers est ajouté à l'incident en tant que signal.

{{< img src="monitors/incidents/from-clipboard.png" alt="Ajouter un dashboard au presse-papiers" style="width:80%;">}}

{{< img src="monitors/incidents/clipboard.png" alt="Créer un incident depuis le presse-papiers" style="width:80%;">}}

**Remarque** : en plus de l'exportation vers un incident, les données dans le presse-papiers peuvent être exportées vers un nouveau dashboard ou notebook.

#### À partir d'un monitor

Vous pouvez déclarer un incident directement depuis un monitor, en cliquant sur **Declare incident**. La fenêtre de création d'incident apparaît et le monitor est ajouté en tant que signal à l'incident.

{{< img src="monitors/incidents/incident-from-monitor.png" alt="Créer un incident depuis un monitor" style="width:80%;">}}

Vous pouvez également ajouter un monitor à un incident existant.

{{< img src="monitors/incidents/existing.png" alt="Ajouter un monitor à un incident existant" style="width:80%;">}}

#### Depuis la page des incidents

Sur l'[interface Datadog][1], cliquez sur **New Incident** pour en créer un.

{{< img src="monitors/incidents/incident_declaration_modal.jpeg" alt="Fenêtre de déclaration d'un incident" style="width:80%;">}}

La fenêtre de déclaration d'incident offre aux intervenants un volet latéral optionnel qui affiche des informations d'aide ainsi que les descriptions des différents niveaux de sévérité et statuts utilisés par votre organisation. Les informations d'aide et les descriptions peuvent être personnalisées depuis les [paramètres d'incident][6].

{{< img src="monitors/incidents/incident_information_settings.jpeg" alt="Écran de personnalisation des informations sur les incidents" style="width:80%;">}}

#### Depuis Slack

Une fois l'[intégration Datadog activée sur Slack][7], vous pouvez utiliser la commande `/datadog incident` depuis n'importe quel canal Slack pour déclarer un nouvel incident.

Dans la fenêtre de création, ajoutez un titre descriptif, indiquez si l'incident a eu un impact sur les clients (yes, no, unknown) et sélectionnez un niveau de gravité (1-5, unknown).

Si l'utilisateur qui déclare l'incident a associé son compte Slack à son compte Datadog, cet utilisateur devient alors l'Incident Commander par défaut. L'Incident Commander (IC) peut être changé ultérieurement dans l'application si nécessaire. Si la personne qui déclare un incident n'est pas membre d'un compte Datadog, alors le rôle d'IC est assigné à un `Slack app user` générique et peut être assigné à un autre IC depuis l'application.

Pour en savoir plus sur l'utilisation de l'application Slack pour Datadog, [cliquez ici][8].

{{< img src="monitors/incidents/from-slack.png" alt="Créer un incident depuis Slack" style="width:60%;">}}

Si l'utilisateur qui déclare l'incident est membre de votre compte Datadog, cet utilisateur devient alors l'Incident Commander (IC) par défaut. Si la personne qui déclare un incident n'est pas membre de votre compte Datadog, alors le rôle d'IC est assigné à un `Slack app user` générique. L'IC peut être modifié depuis la [page incidents][1] de l'application Datadog.

Lorsqu'un incident est déclaré depuis Slack, un canal dédié est créé.

Pour en savoir plus sur l'intégration Datadog/Slack, consultez la [documentation dédiée][7].

{{< site-region region="eu" >}}
Si vous êtes un client {{< region-param key="dd_site_name" >}} et que vous utilisez Slack, restez informé sur l'application Slack en ouvrant un ticket à l'adresse https://help.datadoghq.com/.
{{< /site-region >}}

### Description de l'incident

Quel que soit le moyen par lequel vous créez l'incident, il est essentiel de le décrire avec autant de précision que possible afin de partager les informations avec les autres personnes prenant part au processus de gestion des incidents de votre entreprise.

Lorsque vous créez un incident, une fenêtre d'incident apparait. Cette fenêtre comporte plusieurs champs importants :

**Severity Level** : indique la gravité de votre incident, de SEV-1 (le plus grave) à SEV-5 (le moins grave). Si votre incident fait l'objet d'une toute première investigation et que vous n'en connaissez pas encore la gravité, choisissez UNKNOWN.

* SEV-1 : impact critique
* SEV-2 : fort impact
* SEV-3 : impact modéré
* SEV-4 : faible impact
* SEV-5 : problème mineur
* UNKNOWN : toute première investigation

**Remarque** : vous pouvez personnaliser la description de chaque niveau de gravité en fonction des exigences de votre organisation.

**Title** : donnez un titre descriptif à votre incident.

**Signals** : la ou les raisons pour lesquelles vous déclarez l'incident. Il peut s'agir de graphiques, de logs ou d'autres éléments visuels clés.

**Incident commander** : la personne responsable de l'investigation concernant l'incident.

**Additional notifications** : permet d'avertir d'autres équipes ou personnes.

Pour finaliser la création de votre incident, cliquez sur « Declare Incident ».

### Mettre à jour l'incident et sa chronologie

Le statut d'un incident peut être mis à jour directement depuis la page de présentation de l'incident ou depuis le canal Slack qui lui est dédié. Pour mettre à jour un incident depuis son canal Slack, utilisez la commande suivante pour faire apparaitre la fenêtre de mise à jour : `/datadog incident update`

Mettez à jour la partie relative à l'impact afin de spécifier si l'incident a eu un impact sur les clients, les dates de début et de fin de cet impact, et si l'incident est toujours en cours ou non. Une description de l'étendue de l'impact est également nécessaire.

Dans l'en-tête de l'incident, vous pouvez voir l'état, la gravité, le timestamp, l'impact et la durée de l'incident, ainsi que le nom des personnes qui s'en occupent. Vous pouvez également informer les personnes concernées des éventuelles mises à jour. Des liens permettent d'accéder rapidement aux chaînes de discussion (si vous n'utilisez pas l'application Slack pour Datadog), aux vidéoconférences et aux analyses post-mortem liées (le cas échéant).

Les données relatives à la chronologie de l'incident sont catégorisées, vous permettant ainsi d'utiliser les facettes pour filtrer les différents éléments de la chronologie. Cela est particulièrement utile pour les longs incidents qui ont nécessité une enquête plus longue. Les personnes en charge et les IC peuvent ainsi facilement identifier les personnes impliquées, les progrès effectués et le contenu qui a déjà été analysé. En tant qu'auteur des notes de chronologie, vous pouvez modifier les notes et les timestamps à mesure qu'ils sont créés. Vous pouvez également mettre en évidence certains éléments de la chronologie pour les signaler aux autres personnes surveillant l'incident.

#### Niveaux de statut

Les statuts par défaut comprennent **Active**, **Stable** et **Resolved**. **Completed** peut être activé ou désactivé. Vous pouvez personnaliser la description de chaque statut en fonction des exigences de votre organisation.

* Active : incident affectant les utilisateurs.
* Stable : incident qui n'affecte plus les utilisateurs, mais dont l'enquête est toujours en cours.
* Resolved : incident qui n'affecte plus les utilisateurs et dont l'enquête est terminée.
* Completed : toutes les étapes de remédiation sont terminées.

À mesure que le statut d'un incident évolue, Datadog suit les délais de résolution de la manière suivante :

| Changement de statut | Date et heure de résolution |
| ------------------ | -----------|
| `Active` à `Resolved`, `Active` à `Completed` | Date et heure actuelles |
| `Active` à `Resolved` à `Completed`, `Active` à `Completed` à `Resolved` | Date et heure inchangées |
| `Active` à `Completed` à `Active` à `Resolved` | Date et heure de la dernière transition |

#### Champs d'évaluation

Les champs d'évaluation correspondent aux métadonnées et au contexte que vous pouvez définir pour chaque incident. Ces champs sont des [tags de métrique key:value][9]. Les clés sont ajoutées dans les paramètres, et les valeurs sont ensuite disponibles lorsque vous évaluez l'impact d'un incident depuis sa page de présentation. Vous pouvez par exemple ajouter un champ Application. Pour chaque incident, les champs suivants peuvent être évalués :

* **Root Cause** : ce champ de texte vous permet de décrire la cause d'origine, les déclencheurs, et les facteurs ayant contribué à cet incident.
* **Detection Method** : précisez de quelle manière l'incident a été détecté au moyen des options par défaut (customer, employee, monitor, other ou unknown).
* **Services** : si l'APM est configuré, vos services APM sont disponibles à des fins d'évaluation de l'incident. Pour en savoir plus sur la configuration de vos services dans l'APM, consultez [la documentation][10].
    * Si vous n'utilisez pas l'APM Datadog, vous pouvez importer les noms de service au format CSV. Les valeurs importées en CSV sont uniquement disponibles dans la Gestion des incidents à des fins d'évaluation de l'incident.
    * Datadog élimine les doublons sans tenir compte de la casse, ce qui signifie que si vous utilisez "Mon Service" ou "mon service", seul le nom qui a été ajouté manuellement est affiché.
    * Datadog remplace les noms de service de l'APM par ceux de la liste importée manuellement.
    * Notez que si le service est un service APM et qu'aucune métrique n'a été transmise durant les 7 derniers jours, il n'apparaît pas dans les résultats de la recherche.
    * Intégrez les données d'autres fonctionnalités Datadog afin d'évaluer précisément l'impact des services. Pour les clients qui utilisent l'APM Datadog, les services APM sont automatiquement renseignés dans le champ de la propriété Services.
* **Teams** : les équipes sont définies dans les [champs de propriété][11] des paramètres d'incident. Importez la liste des équipes depuis un fichier CSV. Les valeurs importées en CSV sont uniquement disponibles dans la Gestion des incidents à des fins d'évaluation de l'incident.

## Données collectées

La solution de gestion des incidents recueilles les données d'analyse suivantes :

* Nombre d'incidents
* Durée de l'impact sur les clients
* Durée sur le statut Active
* Durée sur le statut Stable
* Délai avant réparation (heure de fin de l'impact sur les clients - heure de création)
* Délai avant résolution (heure de résolution - heure de création)

Pour en savoir plus sur les graphiques de gestion des incidents, consultez la section [Incident Management Analytics][12].

## Intégrations

En plus de l'intégration avec [Slack][7], la solution de gestion des incidents prend en charge les intégrations suivantes :

- [PagerDuty][13], pour envoyer des notifications à PagerDuty.
- [Jira][14], pour créer un ticket Jira dédié à un incident.
- [Webhooks][15], pour envoyer des notifications relatives à un incident via des webhooks (par exemple, pour [envoyer des SMS via Twilio][16]).

## Prêt à essayer ?

Découvrez un exemple de workflow dans le guide [Débuter avec la Gestion des incidents][17].

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/incidents
[2]: https://app.datadoghq.com/incidents/settings
[3]: /fr/mobile
[4]: https://apps.apple.com/app/datadog/id1391380318
[5]: https://play.google.com/store/apps/details?id=com.datadog.app
[6]: /fr/monitors/incident_management/incident_settings#information
[7]: /fr/integrations/slack/?tab=slackapplicationbeta#using-the-slack-app
[8]: /fr/integrations/slack/
[9]: /fr/getting_started/tagging/assigning_tags?tab=noncontainerizedenvironments#overview
[10]: /fr/tracing/#2-instrument-your-application
[11]: https://app.datadoghq.com/incidents/settings#Property-Fields
[12]: /fr/monitors/incident_management/analytics/#overview
[13]: /fr/integrations/pagerduty/
[14]: /fr/integrations/jira/
[15]: /fr/integrations/webhooks/
[16]: /fr/integrations/webhooks/#sending-sms-through-twilio
[17]: /fr/getting_started/incident_management