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

Pour une présentation complète du workflow d'investigation, consultez [Bits Investigation][4].

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/incident_response/incident_management/setup_and_configuration/integrations/slack
[2]: /fr/incident_response/incident_management/setup_and_configuration/templates
[3]: /fr/incident_response/incident_management/post_incident/postmortems
[4]: /fr/bits_ai/bits_investigation