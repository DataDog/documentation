---
aliases:
- /fr/bits_ai/managing_incidents/
- /fr/bits_ai/bits_ai_sre/coordinate_incidents
- /fr/service_management/incident_management/incident_ai/
- /fr/incident_response/incident_management/incident_ai
description: Apprenez à utiliser Incident AI pour enquêter sur les incidents actifs,
  recevoir des résumés proactifs, détecter les problèmes associés et déclencher une
  analyse des causes profondes basée sur l'IA.
further_reading:
- link: /bits_ai/bits_investigation/
  tag: Documentation
  text: Découvrez Bits Investigation
- link: /incident_response/incident_management/post_incident/postmortems
  tag: Documentation
  text: Générez des post-mortems assistés par l'IA
- link: /incident_response/incident_management/setup_and_configuration/templates
  tag: Documentation
  text: Configurez les variables d'IA dans les modèles de notification et de post-mortem
- link: https://www.datadoghq.com/blog/datadog-incident-response-ai-features/
  tag: Blog
  text: Accélérez vos investigations avec l'IA dans Datadog Incident Response.
title: IA pour les incidents
---
## Présentation {#overview}

Incident AI aide les intervenants à enquêter plus rapidement sur les incidents actifs en automatisant la collecte d'informations et en faisant ressortir le contexte pertinent. Fonctionnant dans Slack et sur la plateforme Datadog, il fournit des résumés proactifs, détecte les incidents associés et permet d'interroger l'historique des incidents en langage naturel afin que votre équipe puisse se concentrer sur la résolution.

Pour activer Incident AI, connectez Datadog à Slack et activez Bits AI dans vos canaux Slack d'incident. Pour obtenir des instructions de configuration, consultez l'[intégration Slack pour Incident Management][1].

Pour les fonctionnalités d'IA qui s'appliquent en dehors de la phase d'investigation, consultez :
- [Templates][2] : ajoutez des variables d'IA aux modèles de notification et de post-mortem
- [Postmortems][3] : générez des brouillons de post-mortem assistés par l'IA

## Résumés d'incidents proactifs {#proactive-incident-summaries}

Lorsque vous rejoignez un canal d'incident dans Slack (connecté à Datadog Incident Management), Incident AI publie automatiquement un résumé contenant des informations clés sur l'incident, telles que les facteurs contributifs, l'impact, le problème et la remédiation. Cela peut également être demandé ponctuellement en utilisant `/dd incident summary`. Vous seul pouvez voir ce résumé.

Lorsqu'un incident est marqué comme résolu, Incident AI publie un résumé final. Ce résumé est visible par tous les membres du canal.

{{< img src="incident_response/incident_management/investigate/incident_ai/incident_summary.png" alt="Exemple de résumé d'incident dans Slack" style="width:100%;" >}}

## Résumés de réunion {#meeting-summaries}

{{< site-region region="gov,gov2" >}}
<div class="alert alert-danger">Les résumés de réunion ne sont pas disponibles pour votre site Datadog sélectionné ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

Incident AI peut automatiquement résumer les réunions d'incident sur Zoom, Google Meet et Microsoft Teams. Pendant une réunion, il publie périodiquement des résumés en direct sur la chronologie de l'incident et dans le canal de discussion de l'incident. Lorsque la réunion se termine, il publie un résumé final de la réunion.

<div class="alert alert-info">Lorsque les résumés de réunion sont activés, un <a href="https://www.datadoghq.com/legal/subprocessors/">sous-traitant</a> Datadog enregistre et transcrit l'audio de la réunion. Après une période de conservation de sept jours, le sous-traitant supprime automatiquement toutes les données.</div>

Votre organisation doit avoir activé les fonctionnalités d'IA avant que Datadog Transcriber puisse rejoindre les réunions. Pour activer les résumés de réunion, activez **Generate AI meeting summaries** dans les paramètres d'intégration de votre plateforme de réunion :

- [Zoom][4]
- [Google Meet][5]
- [Microsoft Teams][6]

Par défaut, Incident AI ne résume pas les réunions pour les incidents privés. Vous pouvez ajouter des conditions dans les paramètres d'intégration pour empêcher la synthèse d'autres incidents également.

### Fonctionnement des résumés de réunion {#how-meeting-summaries-work}

Lorsqu'une réunion associée à un incident démarre, Datadog Transcriber tente de la rejoindre. Cela peut prendre de 10 à 30 secondes. Si la réunion dispose d'un hall d'accueil ou d'une salle d'attente, un participant doit autoriser Datadog Transcriber à rejoindre la réunion avant que la transcription puisse commencer. Une fois que Datadog Transcriber a rejoint la réunion, il publie périodiquement des résumés en direct aux emplacements suivants pendant la réunion :

- La **chronologie de l'incident**, sous une entrée **Meeting Summary**.
- Le **canal de discussion d'incident**, à la fois dans le fil de discussion de la carte de réunion et sous forme de message dans le canal.

Lorsque la réunion se termine, il publie un résumé final de la réunion aux mêmes emplacements.

### Examen d'un résumé {#reviewing-a-summary}

Une fois le résumé publié, vous pouvez l'approuver, modifier son texte ou le rejeter. Vous pouvez effectuer ces actions depuis la chronologie de l'incident dans Datadog, ou depuis le canal de discussion de l'incident si le résumé y a été diffusé.

Pour examiner un résumé depuis la chronologie de l'incident :

1. Ouvrez l'incident dans Datadog et recherchez l'entrée **Meeting Summary** sur la chronologie.
2. Cliquez sur l'icône de coche pour approuver le résumé, sur l'icône de crayon pour modifier son texte, ou sur l'icône de rejet pour le supprimer de la chronologie.

Lorsqu'un utilisateur approuve ou modifie un résumé, Datadog enregistre qui l'a fait. Une fois qu'un résumé est modifié, il ne peut plus être approuvé ; la version modifiée prévaut. Le rejet d'un résumé le supprime de la chronologie de l'incident pour tout le monde et masque son contenu dans les canaux de discussion connectés. Datadog demande une confirmation avant le rejet, car cette action ne peut pas être annulée.

Si le résumé a été diffusé dans le canal de discussion de l'incident, utilisez les boutons **Approve**, **Edit** ou **Reject summary** sur le message.

### Réinviter le transcripteur {#re-inviting-the-transcriber}

Si Datadog Transcriber quitte une réunion, réinvitez-le à la même réunion liée pour reprendre la génération de résumés :

1. Ouvrez l'incident dans Datadog.
2. Dans l'en-tête de l'incident, ouvrez le menu de la réunion liée.
3. Cliquez sur **Add Transcriber** (l'icône de robot) à côté de la réunion.
4. Si nécessaire, autorisez Datadog Transcriber à entrer dans la réunion depuis le hall d'accueil ou la salle d'attente afin que la transcription puisse commencer.

L'icône de robot indique si le transcripteur est en train de rejoindre la réunion ou s'il y est déjà. Si vous ne pouvez pas ajouter le transcripteur, survolez l'icône pour en connaître la raison.

Une invite de réinvitation peut également apparaître dans le fil de discussion de la carte de réunion Slack ou Microsoft Teams de l'incident après le départ du transcripteur. Cela peut se produire après l'expiration du délai d'attente pour l'admission ou l'arrivée de participants, après que tout le monde a quitté la réunion ou lorsque quelqu'un retire le transcripteur de la réunion. Sélectionnez **Oui** pour réinviter le transcripteur ou **Non** pour refuser l'invite.

Pour réinviter le transcripteur, vous devez être autorisé à modifier l'incident et, dans les organisations facturées par utilisateur, disposer d'une [licence Incident Management ou Incident Response][7]. Réinviter le transcripteur ne permet pas de contourner les conditions qui empêchent la génération de résumés, notamment l'exclusion par défaut des incidents privés.

## Détection d'incidents associés {#related-incident-detection}

Incident AI signale automatiquement les incidents associés s'ils sont déclarés dans un intervalle de 20 minutes, vous aidant ainsi à identifier des problèmes systémiques plus larges.

## Discutez avec Incident AI {#chat-with-incident-ai}

Utilisez des invites en langage naturel pour demander des informations ou effectuer des actions depuis Slack :

| Fonctionnalité                      | Exemple d'invite                                                                                                                                  |
|------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------|
| Déclarer un incident                | `@Datadog Declare an incident`                                                                                                                  |
| Changer la gravité                    | `@Datadog Update this incident to SEV-3`                                                                                                        |
| Changer le statut                      | `@Datadog Mark this incident as stable`<br />`@Datadog Resolve this incident`                                                                   |
| Demander un nouveau résumé                | `@Datadog Give me a summary of this incident`<br />`@Datadog Summarize incident-262`<br />**Remarque** : les incidents privés ne sont pas résumés.       |
| Rechercher dans l'historique des incidents            | `@Datadog How many incidents are currently ongoing?`<br />`@Datadog Show me all Sev-1 incidents that occurred in the past week.`                |
| Examiner des incidents précis | `@Datadog What was the root cause of incident-123?`<br />`@Datadog What remediation actions did the responders take in incident-123?`        |
| Trouver des incidents associés | `@Datadog Are there any related incidents?`<br />`@Datadog Find me incidents related to DDoS attacks from the past month`                       |
| Investigation pour une détection précoce | `@Datadog A customer is unable to check out. Is there an incident?`<br />`@Datadog Are there any incidents now impacting the payments service?` |

## Déclenchez une Bits Investigation {#bits-ai-investigation}

Lancez une Bits Investigation directement depuis le canal Slack de votre incident ou l'interface Web de Datadog Incident Management, sans quitter votre workflow de réponse aux incidents. Cela limite les changements de contexte pendant les incidents en cours et permet à l'agent IA de mener son investigation aux côtés de votre équipe en s'appuyant sur le même contexte partagé.

La fonctionnalité Bits Investigation doit être activée dans votre organisation et vous ne pouvez déclencher une investigation qu'à partir d'un **canal Slack Datadog Incident Management correctement configuré**. Le flux Incident Investigation ne s'active que lorsque le système détecte un canal d'incident valide.

Depuis Slack, lancez une investigation pendant un incident actif de l'une des manières suivantes :

- Cliquez sur **Investigate with Bits AI** dans les actions d'incident.
- Exécutez la commande slash `/dd incident investigate`.
- Saisissez `@Datadog investigate` dans le canal d'incident.

Lorsque vous utilisez `@Datadog investigate`, vous pouvez ajouter du contexte directement dans votre saisie pour aider l'agent à circonscrire son investigation dès le départ :

| Invite                      | Comportement                                    |
|-----------------------------|---------------------------------------------|
| `@Datadog investigate we're seeing high error rates in the payments service since the deploy at 2pm` | Déclenche une investigation ciblée sur un sujet indiqué par un intervenant |
| `@Datadog investigate, I think this is related to the redis cache` | Déclenche une investigation avec une hypothèse de départ |

Lorsqu'il est déclenché, l'agent extrait automatiquement la chronologie de l'incident, les signaux de télémétrie liés (traces, métriques et logs), ainsi que tout contexte que vous fournissez dans l'invite. Il publie ensuite des mises à jour dans le canal sous forme de réponses dans un fil de discussion, puis, une fois l'investigation terminée, communique à l'ensemble du canal un résumé final de la cause profonde et les prochaines étapes recommandées.

{{< img src="incident_response/incident_management/investigate/incident_ai/Triggering_investigations_slack.png" alt="Un canal Slack d'incident Datadog affichant une Bits Investigation terminée, ses conclusions sur la cause profonde et un bouton View Full Investigation." >}}

**Depuis l'interface web**, vous pouvez déclencher une investigation directement depuis la section « Investigation » sur la page de présentation de l'incident.

{{< img src="incident_response/incident_management/investigate/incident_ai/Triggering_investigations_web.png" alt="La page de présentation d'Incident Management affichant une Bits Investigation terminée dans la section « Investigation », avec un bouton View Investigation." >}}

Lorsqu'elle est déclenchée, l'investigation est intégrée à l'interface Web de l'incident, et Bits Investigation apparaît comme intervenant dans la section Responder Roles de la page.

Pour une présentation complète du workflow d'investigation, consultez [Bits Investigation][8].

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/incident_response/incident_management/setup_and_configuration/integrations/slack
[2]: /fr/incident_response/incident_management/setup_and_configuration/templates
[3]: /fr/incident_response/incident_management/post_incident/postmortems
[4]: /fr/incident_response/incident_management/setup_and_configuration/integrations/zoom_integration/#meeting-summaries
[5]: /fr/incident_response/incident_management/setup_and_configuration/integrations/google_meet/#meeting-summaries
[6]: /fr/incident_response/incident_management/setup_and_configuration/integrations/microsoft_teams/#meeting-summaries
[7]: /fr/account_management/billing/incident_response/#allocate-seats
[8]: /fr/bits_ai/bits_investigation