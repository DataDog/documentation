---
title: Gestion des incidents
kind: documentation
description: Créer et gérer des incidents
---
{{< site-region region="gov" >}}
<div class="alert alert-warning">La fonctionnalité de gestion des incidents n'est pas disponible pour le site gouvernemental de Datadog.</div>
{{< /site-region >}}

Tout événement susceptible d'entraîner une interruption des services de votre organisation peut être considéré comme un incident, et il est souvent nécessaire d'avoir un système bien défini pour traiter ce genre d'événements. La fonctionnalité de gestion des incidents de Datadog fournit un système grâce auquel votre organisation peut identifier et réduire les incidents de manière efficace.

Les incidents sont regroupés dans Datadog au même titre que les métriques, les traces et les logs que vous recueillez. Vous pouvez consulter et filtrer les incidents qui vous intéressent.

Dans Datadog, les situations suivantes justifient la déclaration d'un incident :

* Un problème a ou peut avoir un impact sur les clients ou les services.
* Vous ne savez pas avec certitude si un événement constitue un incident. Avertissez les personnes compétentes et renforcez la gravité de la situation de manière adéquate.

## Utilisation

La gestion des incidents ne nécessite aucune installation. Pour consulter vos incidents, accédez à la page [Incidents][1] où vous trouverez tous les incidents en cours. Vous pouvez configurer des champs supplémentaires pour tous les incidents dans les [Paramètres d'incident][2].

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

Vous pouvez déclarer un incident directement depuis un monitor, en cliquant sur le bouton d'exportation du graphique, puis sur **Declare incident**. La fenêtre de création d'incident apparaît et le monitor est ajouté en tant que signal à l'incident.

{{< img src="monitors/incidents/from-a-graph.png" alt="Créer un incident depuis un monitor" style="width:80%;">}}

Vous pouvez également ajouter un monitor à un incident existant.

{{< img src="monitors/incidents/existing.png" alt="Ajouter un monitor à un incident existant" style="width:80%;">}}

#### Depuis la page des incidents

Depuis l'[interface des incidents][1], cliquez sur le bouton **New Incident** pour en créer un.

#### Depuis Slack

Une fois l'[intégration Datadog activée sur Slack][3], vous pouvez utiliser la commande `/datadog incident` depuis n'importe quel canal Slack pour déclarer un nouvel incident.

Dans la fenêtre de création, ajoutez un titre descriptif, indiquez si l'incident a eu un impact sur les clients (yes, no, unknown) et sélectionnez un niveau de gravité (1-5, unknown).

Si l'utilisateur qui déclare l'incident a associé son compte Slack à son compte Datadog, cet utilisateur devient alors l'Incident Commander par défaut. L'Incident Commander (IC) peut être changé ultérieurement dans l'application si nécessaire. Si la personne qui déclare un incident n'est pas membre d'un compte Datadog, alors le rôle d'IC est assigné à un `Slack app user` générique et peut être assigné à un autre IC depuis l'application.

Pour en savoir plus sur l'utilisation de l'application Slack pour Datadog, [cliquez ici][8].

{{< img src="monitors/incidents/from-slack.png" alt="Créer un incident depuis Slack" style="width:60%;">}}

Si l'utilisateur qui déclare l'incident est membre de votre compte Datadog, cet utilisateur devient alors l'Incident Commander (IC) par défaut. Si la personne qui déclare un incident n'est pas membre de votre compte Datadog, alors le rôle d'IC est assigné à un `Slack app user` générique. L'IC peut être modifié depuis la [page incidents][1] de l'application Datadog.

Lorsqu'un incident est déclaré depuis Slack, un canal dédié est créé.

Pour en savoir plus sur l'intégration Datadog/Slack, consultez la [documentation][3].

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

Le statut d'un incident peut être mis à jour directement depuis la [page de présentation][1] de l'incident ou depuis le canal Slack qui lui est dédié. Pour mettre à jour un incident depuis Slack, utilisez la commande suivante pour faire apparaitre la fenêtre de mise à jour : `/datadog incident update`

Vous pouvez également mettre à jour la partie relative à l'impact afin de spécifier si l'incident a eu un impact sur les clients, sa chronologie, et s'il est toujours en cours ou non. Afin d'être complète, cette section nécessite également une description de l'étendue de l'impact.

Dans l'en-tête de l'incident, vous pouvez voir l'état, la gravité, le timestamp, l'impact et la durée de l'incident, ainsi que le nom des personnes qui s'en occupent. Vous pouvez également informer les personnes concernées des éventuelles mises à jour. Des liens permettent d'accéder rapidement aux chaînes de discussion (si vous n'utilisez pas l'application Slack pour Datadog), aux vidéoconférences et aux analyses post-mortem liées (le cas échéant).

Les données relatives à la chronologie de l'incident sont catégorisées, vous permettant ainsi d'utiliser les facettes pour filtrer les différents éléments de la chronologie. Cela est particulièrement utile pour les longs incidents qui ont nécessité une enquête plus longue. Les personnes en charge et les IC peuvent ainsi facilement identifier les personnes impliquées, les progrès effectués et le contenu qui a déjà été analysé. En tant qu'auteur des notes de chronologie, vous pouvez modifier les notes et les timestamps à mesure qu'ils sont créés. Vous pouvez également mettre en évidence certains éléments de la chronologie pour les signaler aux autres personnes surveillant l'incident.

#### Niveaux de statut

Les statuts par défaut comprennent **Active**, **Stable** et **Resolved**. **Completed** peut être activé ou désactivé. Vous pouvez personnaliser la description de chaque statut en fonction des exigences de votre organisation.

* Active : incident affectant les utilisateurs.
* Stable : incident qui n'affecte plus les utilisateurs, mais dont l'enquête est toujours en cours.
* Resolved : incident qui n'affecte plus les utilisateurs et dont l'enquête est terminée.
* Completed : toutes les étapes de remédiation sont terminées.

#### Champs d'évaluation

Les champs d'évaluation correspondent aux métadonnées et au contexte que vous pouvez définir pour chaque incident. Ces champs sont des [tags de métrique key:value][4]. Les clés sont ajoutées dans les paramètres, et les valeurs sont ensuite disponibles lorsque vous évaluez l'impact d'un incident depuis sa page de présentation. Vous pouvez par exemple ajouter un champ Application. Pour chaque incident, les champs suivants peuvent être évalués :

* **Root Cause** : ce champ de texte vous permet de décrire la cause d'origine, les déclencheurs, et les facteurs ayant contribué à cet incident.
* **Detection Method** : précisez de quelle manière l'incident a été détecté au moyen des options par défaut (customer, employee, monitor, other ou unknown).
* **Services** : si l'APM est configuré, vos services APM sont disponibles à des fins d'évaluation de l'incident. Pour en savoir plus sur la configuration de vos services dans l'APM, consultez [la documentation][5].
    * Si vous n'utilisez pas l'APM Datadog, vous pouvez importer les noms de service au format CSV. Les valeurs importées en CSV sont uniquement disponibles dans la Gestion des incidents à des fins d'évaluation de l'incident.
    * Datadog élimine les doublons sans tenir compte de la casse, ce qui signifie que si vous utilisez "Mon Service" ou "mon service", seul le nom qui a été ajouté manuellement est affiché.
    * Datadog remplace les noms de service de l'APM par ceux de la liste importée manuellement.
    * Notez que si le service est un service APM et qu'aucune métrique n'a été transmise durant les 7 derniers jours, il n'apparaît pas dans les résultats de la recherche.
    * Intégrez les données d'autres fonctionnalités Datadog afin d'évaluer précisément l'impact des services. Pour les clients qui utilisent l'APM Datadog, les services APM sont automatiquement renseignés dans le champ de la propriété Services.
* **Teams** : importez un fichier CSV pour renseigner ce champ. Les valeurs importées en CSV sont uniquement disponibles dans la Gestion des incidents à des fins d'évaluation de l'incident.

## Exemple de workflow

### Détection d'un problème

Imaginons que vous consultez un dashboard et que vous remarquez qu'un service en particulier affiche un très grand nombre d'erreurs. À l'aide du bouton d'exportation en haut à droite d'un widget, vous pouvez déclarer un incident.

{{< img src="monitors/incidents/workflow-1-graph-1.png" alt="À partir d'un graphique"  style="width:80%;">}}

### Déclaration d'un incident et création de votre équipe

Utilisez la boîte de dialogue New Incident pour composer votre équipe et avertir ses membres. Le graphique à partir duquel vous avez créé l'incident est automatiquement joint en tant que signal. Vous avez la possibilité d'ajouter tout autre signal susceptible d'aider votre équipe à commencer à résoudre le problème. Les intégrations Slack et PagerDuty vous permettent d'envoyer des notifications via ces services.

{{< img src="monitors/incidents/workflow-2-modal-1.png" alt="Boîte de dialogue New Incident"  style="width:60%;">}}

### Communication et dépannage

Si vous avez installé l'[application Slack pour Datadog][3], l'intégration Slack peut créer automatiquement un canal dédié à l'incident, ce qui vous permet de consolider les communications avec votre équipe et de commencer le dépannage.

Pour les clients non européens qui utilisent Slack, [demandez à accéder à la version bêta][6] de l'application Slack pour Datadog. Pour les clients européens qui utilisent Slack, envoyez un e-mail à support@datadoghq.com pour en savoir plus sur l'application Slack.

{{< img src="monitors/incidents/workflow-3-slack-1-1.png" alt="Communiquer"  style="width:80%;">}}

### Mise à jour de l'incident et création d'une analyse post-mortem

Mettez à jour l'incident à mesure que la situation évolue. Définissez le statut sur `Stable` pour indiquer que le problème a été atténué, et remplissez le champ concernant l'impact sur les clients afin que votre organisation sache dans quelle mesure le problème a affecté les clients. Ensuite, définissez le statut sur `Resolved` une fois que l'incident a été complètement résolu. Il existe un quatrième statut facultatif, `Completed`, qui peut être utilisé pour indiquer que toutes les étapes de remédiation ont été réalisées. Ce statut peut être activé dans les [Paramètres d'incident][2].

{{< img src="monitors/incidents/workflow-4-update-2.png" alt="Mise à jour de l'incident"  style="width:60%;">}}

Vous pouvez mettre à jour le statut et la gravité dans la section `Properties` de chaque incident.

À mesure que le statut d'un incident évolue, Datadog suit les délais de résolution de la manière suivante :

| Changement de statut | Date et heure de résolution |
| ------------------ | -----------|
| `Active` à `Resolved`, `Active` à `Completed` | Date et heure actuelles |
| `Active` à `Resolved` à `Completed`, `Active` à `Completed` à `Resolved` | Date et heure inchangées |
| `Active` à `Completed` à `Active` à `Resolved` | Date et heure de la dernière transition |

Une fois qu'un incident est classé comme résolu, vous pouvez générer automatiquement l'analyse post-mortem.

{{< img src="monitors/incidents/postmortem.png" alt="générer automatiquement une analyse post-mortem" style="width:80%;">}}

### Suivi et enseignement

Créez des tâches d'atténuation ou de remédiation post-mortem. Ajoutez les tâches de votre choix dans le champ de texte, définissez une date limite et attribuez-les à un membre d'équipe pour effectuer un suivi de ces tâches. Cochez la case en regard d'une tâche pour indiquer qu'elle est terminée.

Associez un document d'analyse post-mortem, réexaminez ce qui a posé problème et ajoutez des tâches de suivi. L'utilisation des [Notebooks][7] Datadog pour créer des post-mortems permet de renforcer la collaboration en temps réel. Pour relier un notebook existant à un incident, cliquez sur le signe plus sous `Other Docs`. Cliquez sur le notebook associé pour le modifier en temps réel avec les membres de votre équipe.

{{< img src="monitors/incidents/workflow-5-postmortem-1.png" alt="Analyse post-mortem"  style="width:60%;">}}

[1]: https://app.datadoghq.com/incidents
[2]: https://app.datadoghq.com/incidents/settings
[3]: /fr/integrations/slack/?tab=slackapplicationbeta#using-the-slack-app
[4]: /fr/getting_started/tagging/assigning_tags?tab=noncontainerizedenvironments#overview
[5]: /fr/tracing/#2-instrument-your-application
[6]: https://app.datadoghq.com/incidents/ddslackapp
[7]: https://app.datadoghq.com/notebook/list
[8]: https://docs.datadoghq.com/fr/integrations/slack/?tab=slackapplicationus