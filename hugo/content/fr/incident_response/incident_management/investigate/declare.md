---
aliases:
- /fr/service_management/incident_management/declare/
- /fr/incident_response/incident_management/declare
title: Déclarer un incident
---
## Présentation {#overview}

Dans Datadog, les situations suivantes entraînent la déclaration d'un incident :
- Un problème impacte ou pourrait impacter les clients.
- Vous estimez qu'un problème (y compris un problème interne) doit être traité en urgence.
- Vous ne savez pas si vous devez déclarer un incident - prévenez d'autres personnes et augmentez la gravité de manière appropriée.

Vous pouvez déclarer un incident depuis plusieurs endroits au sein de la plateforme Datadog, comme un widget de graphique sur un dashboard, l'interface utilisateur des incidents ou toute alerte signalée dans Datadog.

## Fenêtre modale de déclaration {#declaration-modal}

Lorsque vous déclarez un incident, une fenêtre modale de déclaration apparaît. Cette fenêtre modale comporte plusieurs éléments principaux :

| Éléments de l'incident  | Description |
| ------------------ | ----------- |
| Titre              | (Requis) Un titre descriptif pour l'incident. |
| Niveau de gravité     | (Requis) Par défaut, la gravité varie de SEV-1 (la plus grave) à SEV-5 (la moins grave). Vous pouvez personnaliser le nombre de niveaux de gravité et leurs descriptions dans les paramètres d'Incident Management.
| Commandant d'incident | La personne désignée pour diriger la réponse à l'incident. |

Vous pouvez configurer les [Paramètres d'Incident Management][2] pour inclure davantage de champs dans la fenêtre modale de déclaration d'incident ou pour rendre certains champs obligatoires.


## Depuis la page Incident {#from-the-incident-page}

Dans l'[interface utilisateur Datadog][1], cliquez sur **Déclarer un incident** pour créer un incident.

La fenêtre modale *Déclarer un incident* affiche un panneau latéral rétractable qui contient du texte d'aide et des descriptions pour les niveaux de gravité et les statuts utilisés par votre organisation. Le texte d'aide et les descriptions sont personnalisables dans les [Paramètres des incidents][2].

## Depuis un monitor {#from-a-monitor}

Vous pouvez déclarer un incident directement depuis un monitor. Sélectionnez **Déclarer un incident** pour ouvrir une fenêtre modale de création d'incident, et le monitor est ajouté à l'incident en tant que signal. Vous pouvez également ajouter un monitor à un incident existant.

{{< img src="incident_response/incident_management/investigate/declare/declare_monitor.png" alt="Menu déroulant Actions sur les monitors où vous pouvez sélectionner l'option Déclarer un incident" style="width:50%;" >}}

Alternativement, vous pouvez configurer un monitor pour qu'il crée automatiquement un incident lorsqu'il passe à un statut `warn`, `alert` ou `no data`. Pour activer cette option, cliquez sur **Ajouter un incident** dans la section **Configurer les notifications et les automatisations** d'un monitor et sélectionnez une option `@incident-`. Les administrateurs peuvent créer des options `@incident-` dans [Incident Settings][9].

Les incidents créés à partir d'un monitor hériteront des [valeurs de champ][10] des tags du monitor. Pour envoyer des notifications automatisées à partir d'incidents, ajoutez des tags à un monitor afin que les incidents créés correspondent aux critères des [règles de notification][11].

## À partir d'un signal de sécurité {#from-a-security-signal}

Déclarez un incident directement depuis le panneau latéral d'un signal Cloud SIEM ou Workload Protection, en cliquant sur **Déclarer un incident** ou **Escalader l'investigation**. Pour plus d'informations, consultez [Investigate Security Signals][3].

Déclarez un incident à partir d'un signal App and API Protection via les actions listées dans le panneau latéral du signal. Cliquez sur **Afficher toutes les actions** puis sur **Déclarer un incident**.
Pour plus d'informations, consultez [Investigate Security Signals][4] pour App and API Protection.

{{< img src="/incident_response/incident_management/investigate/declare/declare_asm.png" alt="Description de votre image" style="width:90%;" >}}

## À partir d'un secret divulgué {#from-a-leaked-secret}

Déclarez un incident depuis [Secret Scanning][15] en cliquant sur **Déclarer un incident** dans le panneau latéral de détection. L'incident est pré-rempli avec toutes les métadonnées de détection.

{{< img src="/incident_response/incident_management/investigate/declare/declare-secrets.png" alt="Description de votre image" style="width:90%;" >}}

## À partir d'un élément de travail {#from-a-work-item}

Déclarez un incident depuis [Work Management][5]. Depuis la page de détails de l'élément de travail individuel, cliquez sur **Déclarer un incident** pour faire passer un élément de travail en incident.

## À partir d'un graphique {#from-a-graph}
Vous pouvez déclarer un incident directement depuis un graphique en cliquant sur le bouton d'exportation du graphique, puis en cliquant sur **Déclarer un incident**. La fenêtre modale de création d'incident s'affiche et le graphique est ajouté à l'incident en tant que signal.

{{< img src="incident_response/incident_management/from-a-graph.png" alt="Créer un incident à partir d'un graphique" style="width:80%;">}}

## Depuis un test Synthetic {#from-a-synthetic-test}

Créez des incidents directement à partir d'un [test Synthetic][8] via le menu déroulant Actions. Sélectionnez **Déclarer un incident** pour ouvrir une fenêtre modale de création d'incident, où un résumé du test est ajouté à votre chronologie d'incident, vous permettant de poursuivre l'investigation à partir de là.

{{< img src="incident_response/incident_management/investigate/declare/synthetics_declare_incident.png" alt="Déclarer un incident à partir d'un test Synthetic." style="width:90%;" >}}

## Depuis le presse-papiers Datadog {#from-the-datadog-clipboard}
Utilisez le [presse-papiers Datadog][6] pour rassembler plusieurs monitors et graphiques et générer un incident. Pour déclarer un incident depuis le presse-papiers, copiez un graphique que vous souhaitez examiner et ouvrez le presse-papiers avec la commande `Cmd/Ctrl + Shift + K`. Cliquez sur **Déclarer un incident** ou sur l'icône d'exportation pour l'ajouter à l'incident en tant que signal.

{{< img src="incident_response/incident_management/investigate/declare/declare_clipboard.png" alt="Déclarer un incident depuis le presse-papiers Datadog" style="width:90%;" >}}

## Depuis une page Datadog On-Call {#from-a-datadog-on-call-page}

Vous pouvez déclarer un incident directement depuis une [page Datadog On-Call][12]. Depuis la [liste des pages On-Call][13], sélectionnez une page et cliquez sur **Déclarer un incident** pour créer un incident et l'associer automatiquement à l'équipe d'astreinte concernée.

## Depuis Slack {#from-slack}

Si vous avez [activé l'intégration Datadog sur Slack][7], vous pouvez déclarer un nouvel incident avec la commande slash `/datadog incident` depuis n'importe quel canal Slack.

Si l'utilisateur qui déclare l'incident a connecté son compte Slack à son compte Datadog, cet utilisateur est répertorié par défaut comme commandant d'incident. Le commandant d'incident (IC) peut être modifié ultérieurement dans l'application si nécessaire. Si l'utilisateur qui déclare un incident n'est pas membre d'un compte Datadog, l'IC est attribué à un `Slack app user` générique et peut être réattribué à un autre IC dans l'application.

{{< img src="incident_response/incident_management/from-slack.png" alt="Créer un incident depuis Slack" style="width:60%;">}}

Après avoir déclaré un incident depuis Slack, cela génère un canal d'incident.

## Depuis Google Chat {#from-google-chat}

Si vous avez configuré l'[intégration Datadog pour Google Chat][14], vous pouvez déclarer un incident avec la commande slash `/dd_incident` depuis n'importe quel espace Google Chat.

## Depuis Handoff Notifications {#from-handoff-notifications}

Handoff Notification affiche des cartes d'appel lorsque vous êtes appelé ou ajouté à des incidents actifs. Ces cartes vous permettent de :

- Afficher et accuser réception des pages On-Call
- Naviguer vers les ressources d'incident pertinentes
- Prévisualiser les messages Slack des canaux d'incident
- Prendre des mesures directes sur les incidents

{{< img src="/incident_response/incident_management/investigate/declare/handoff_notification_card.png" alt="Carte de notification de transfert affichant les détails de l'incident avec des options pour afficher, accuser réception et prendre des mesures" style="width:100%;" >}}

Les cartes de notification de transfert restent visibles jusqu'à ce qu'elles soient fermées ou que le statut de l'incident change. Vous pouvez développer, réduire ou fermer l'intégralité du conteneur de transfert plutôt que des cartes individuelles.

Vous pouvez déclarer un incident à partir de cartes de notification de transfert individuelles.

## Prochaines étapes {#whats-next}

{{< whatsnext desc="Ajoutez des informations utiles à votre incident et donnez du contexte à toutes les personnes impliquées dans l'enquête.">}}
    {{< nextlink href="/incident_response/incident_management/investigate/describe" >}}Décrire l'incident : Ajouter du contexte et des détails{{< /nextlink >}}
{{< /whatsnext >}}

[1]: https://app.datadoghq.com/incidents
[2]: /fr/incident_response/incident_management/setup_and_configuration/information
[3]: /fr/security/workload_protection/investigate_and_triage/security_signals/actions/#declare-an-incident
[4]: /fr/security/application_security/threat_protection/security_signals/#declare-an-incident
[5]: /fr/incident_response/work_management/view_and_manage
[6]: /fr/dashboards/guide/datadog_clipboard
[7]: /fr/integrations/slack/?tab=slackapplicationbeta#using-the-slack-app
[8]: https://app.datadoghq.com/synthetics/tests
[9]: https://app.datadoghq.com/incidents/settings?section=global-settings
[10]: /fr/incident_response/incident_management/setup_and_configuration/property_fields
[11]: /fr/incident_response/incident_management/setup_and_configuration/notification_rules
[12]: /fr/incident_response/on-call/
[13]: https://app.datadoghq.com/on-call/pages
[14]: /fr/integrations/google-hangouts-chat/
[15]: /fr/security/code_security/secret_scanning/