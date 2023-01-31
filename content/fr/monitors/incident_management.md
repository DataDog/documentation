---
title: Gestion des incidents
kind: documentation
disable_sidebar: true
description: Créer et gérer des incidents
---
{{< img src="monitors/incidents/incidents-top-1.png" alt="Gestion des incidents"  style="width:80%;">}}

## Présentation

Tout événement susceptible d'entraîner une interruption des services de votre organisation peut être décrit comme un incident, et il est souvent nécessaire d'avoir un système bien défini pour traiter ce genre d'événements. La fonctionnalité de gestion des incidents de Datadog fournit un système grâce auquel votre organisation peut identifier et réduire les incidents de manière efficace.

Les incidents sont regroupés dans Datadog au même titre que les métriques, les traces et les logs que vous recueillez. Vous pouvez consulter et filtrer les incidents qui vous intéressent.

Dans Datadog, les situations suivantes justifient la déclaration d'un incident :

* Un problème a ou peut avoir un impact sur les clients ou les services.
* Vous ne savez pas avec certitude si un événement constitue un incident. Avertissez les personnes compétentes et renforcez la sévérité de la situation de manière adéquate.

<div class="alert alert-warning">
La <a href="https://app.datadoghq.com/incidents">gestion des incidents</a> est actuellement disponible en version bêta pour tous les clients. Pour en savoir plus, contactez sales@datadoghq.com.
</div>

## Utilisation

La gestion des incidents ne nécessite aucune installation. Pour consulter vos incidents, accédez à la page [Incidents][1] où vous trouverez tous les incidents en cours. Vous pouvez configurer des champs supplémentaires pour tous les incidents dans les [Paramètres d'incident][2].

### Créer un incident

Vous pouvez déclarer un incident directement à partir d'un graphique. Vous pouvez aussi cliquer sur « New Incident » en haut à droite de la page Incidents. La boîte de dialogue ci-dessous s'affiche.

{{< img src="monitors/incidents/create-1-1.png" alt="Boîte de dialogue New Incident"  style="width:80%;">}}

**Severity** : indique la sévérité de votre incident, de SEV-1 (le plus grave) à SEV-5 (le moins grave). Si votre incident fait l'objet d'une toute première investigation et que vous n'en connaissez pas encore la sévérité, choisissez UNKNOWN.

* SEV-1 : impact critique
* SEV-2 : fort impact
* SEV-3 : impact modéré
* SEV-4 : faible impact
* SEV-5 : problème mineur
* UNKNOWN : toute première investigation

**Title** : donnez à votre incident un titre descriptif.

**Signals** : la ou les raisons pour lesquelles vous déclarez l'incident. Il peut s'agir de graphiques, de logs ou d'autres éléments visuels clés.

**Incident commander** : la personne responsable de l'investigation concernant l'incident.

**Additional notifications** : avertir d'autres équipes ou personnes.

Pour finaliser la création de votre incident, cliquez sur « Declare Incident ».

### Exemple de workflow

#### 1. Détection d'un problème

Imaginons que vous consultez un dashboard et que vous remarquez qu'un service en particulier affiche un très grand nombre d'erreurs. À l'aide du bouton d'exportation en haut à droite d'un widget, vous pouvez déclarer un incident.

{{< img src="monitors/incidents/workflow-1-graph-1.png" alt="À partir d'un graphique"  style="width:80%;">}}

#### 2. Déclaration d'un incident et composition de votre équipe

Utilisez la boîte de dialogue New Incident pour composer votre équipe et avertir ses membres. Le graphique à partir duquel vous avez créé l'incident est automatiquement joint en tant que signal. Vous avez la possibilité d'ajouter tout autre signal susceptible d'aider votre équipe à commencer à résoudre le problème. Les intégrations Slack et PagerDuty vous permettent d'envoyer des notifications via ces services.

{{< img src="monitors/incidents/workflow-2-modal-1.png" alt="Boîte de dialogue New Incident"  style="width:60%;">}}

#### 3. Communication et dépannage

Si vous avez installé l'[application Slack pour Datadog][3], l'intégration Slack peut créer automatiquement un canal dédié à l'incident, ce qui vous permet de consolider les communications avec votre équipe et de commencer le dépannage.

Pour les clients non européens qui utilisent Slack, [demandez à accéder à la version bêta][4] de l'application Slack pour Datadog. Pour les clients européens qui utilisent Slack, envoyez un e-mail à support@datadoghq.com pour en savoir plus sur l'application Slack.

{{< img src="monitors/incidents/workflow-3-slack-1.png" alt="Communication"  style="width:80%;">}}

#### 4. Mise à jour de l'incident

Mettez à jour l'incident à mesure que la situation évolue. Définissez le statut sur `Stable` pour indiquer que le problème a été atténué, et remplissez le champ concernant l'impact sur les clients afin que votre organisation sache dans quelle mesure le problème a affecté les clients. Ensuite, définissez le statut sur `Resolved` une fois que l'incident a été complètement résolu. Il existe un quatrième statut facultatif, `Completed`, qui peut être utilisé pour indiquer que toutes les étapes de remédiation ont été réalisées. Ce statut peut être activé dans les [Paramètres d'incident][2].

{{< img src="monitors/incidents/workflow-4-update-2.png" alt="Mise à jour de l'incident"  style="width:60%;">}}

Vous pouvez mettre à jour le statut et la sévérité dans la section `Properties` de chaque incident.

À mesure que le statut d'un incident évolue, Datadog suit les délais de résolution de la manière suivante :

| Changement de statut | Date et heure de résolution |
| ------------------ | -----------|
| `Active` à `Resolved`, `Active` à `Completed` | Date et heure actuelles |
| `Active` à `Resolved` à `Completed`, `Active` à `Completed` à `Resolved` | Date et heure inchangées |
| `Active` à `Completed` à `Active` à `Resolved` | Date et heure de la dernière transition |

#### 5. Suivi et enseignement

Associez un document d'analyse post-mortem, réexaminez ce qui a posé problème et ajoutez des tâches de suivi. L'utilisation des [Notebooks][5] Datadog pour créer des post-mortems permet de renforcer la collaboration en temps réel. Pour relier un notebook existant à un incident, cliquez sur le signe plus sous `Other Docs`. Cliquez sur le notebook associé pour le modifier en temps réel avec les membres de votre équipe.

{{< img src="monitors/incidents/workflow-5-postmortem-1.png" alt="Analyse post-mortem"  style="width:60%;">}}



[1]: https://app.datadoghq.com/incidents
[2]: https://app.datadoghq.com/incidents/settings
[3]: /fr/integrations/slack/?tab=slackapplicationbeta#using-the-slack-app
[4]: https://app.datadoghq.com/incidents/ddslackapp
[5]: https://app.datadoghq.com/notebook/list
