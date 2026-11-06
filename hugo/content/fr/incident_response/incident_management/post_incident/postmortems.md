---
description: Générez et gérez des post-mortems pour documenter les incidents et favoriser
  l'amélioration continue.
further_reading:
- link: /incident_response/incident_management/setup_and_configuration/templates
  tag: Documentation
  text: Configurer des modèles de post-mortem
- link: /incident_response/incident_management/setup_and_configuration/variables
  tag: Documentation
  text: Référence des variables d'incident
- link: /incident_response/incident_management/post_incident/follow-ups
  tag: Documentation
  text: Gérez les tâches de suivi d'incident
- link: /notebooks/
  tag: Documentation
  text: Datadog Notebooks
title: Post-mortems d'incident
---
## Présentation {#overview}

Un post-mortem est un document structuré qui capture ce qui s'est passé lors d'un incident, pourquoi cela s'est produit et quelles mesures prendre pour éviter toute récurrence. La génération d'un post-mortem après un incident aide votre équipe à :

- Documenter la cause première et l'impact pour référence future
- Favoriser la responsabilité pour les travaux de remédiation
- Développer les connaissances organisationnelles pour réduire la fréquence et la gravité des incidents futurs

Datadog remplit automatiquement les post-mortems avec les données d'incident en utilisant les modèles que vous définissez. Vous pouvez générer des post-mortem dans [Datadog Notebooks][1], [Confluence][2] ou [Google Drive][3]. Les post-mortems générés sous forme de Datadog Notebooks sont intégrés directement dans l'onglet Post-Incident, où vous pouvez consulter, modifier et suivre leur statut et leur propriété sans quitter l'incident.

## Autorisations {#permissions}

- Pour générer un post-mortem, vous avez besoin de l'autorisation **Incidents Write**.
- Pour consulter un post-mortem généré dans Datadog Notebooks, vous avez besoin de l'autorisation **Notebooks Read**.

<div class="alert alert-danger">Pour les incidents privés, les post-mortems générés dans Datadog Notebooks sont accessibles à tout utilisateur disposant de l'autorisation de lecture des Notebooks, indépendamment de son accès à l'incident privé. Prenez cela en considération lors de la génération de post-mortems pour des incidents contenant des données sensibles.</div>

## Générer un post-mortem {#generate-a-postmortem}

{{< img src="/incident_response/incident_management/post_incident/postmortems/post_incident_tab_generate_postmortem.png" alt="L'onglet Post-Incident affichant le bouton Générer un post-mortem, l'aperçu du modèle et la barre latérale Suivis." style="width:100%;" >}}

Une fois un incident résolu, vous pouvez générer un post-mortem depuis l'onglet **Post-Incident** de l'incident.

Pour générer un post-mortem :

1. Ouvrez l'incident et accédez à l'onglet **Post-Incident**.
1. Sélectionnez un modèle de post-mortem.
1. Cliquez sur **Générer un post-mortem**. Datadog crée le post-mortem dans la destination configurée dans le modèle et le lie à l'incident.

### Générer un post-mortem avec Workflow Automation {#generate-a-postmortem-with-workflow-automation}

Vous pouvez également générer un post-mortem à partir d'un [workflow][5] en utilisant l'action **Générer un post-mortem**. L'action prend un incident et un modèle de post-mortem, et joint le post-mortem résultant à cet incident. Utilisez ce chemin pour créer des post-mortems dans le cadre d'un processus post-incident automatisé, par exemple après la résolution d'un incident.

<div class="alert alert-warning">Les variables générées par IA disponibles pour les modèles de post-mortem, telles que <code>{{incident.ai_summary}}</code>, ne sont renseignées que pour les post-mortems générés depuis l'onglet <strong>Post-Incident</strong>. Un post-mortem généré via l'action de workflow <strong>Générer un post-mortem</strong> laisse ces variables vides. Pour inclure du contenu généré par IA, générez le post-mortem depuis l'onglet <strong>Post-Incident</strong>.</div>

Pour obtenir la liste complète des variables disponibles pour les modèles de post-mortem, consultez [Modèles][4] et [Variables d'incident][6].

## Afficher et modifier un post-mortem {#view-and-edit-a-postmortem}

Affichez et modifiez votre post-mortem en fonction de sa destination :

- **Datadog Notebooks** : Intégré dans l'onglet **Post-Incident**. Lisez et modifiez sans quitter Datadog. Plusieurs utilisateurs peuvent modifier simultanément avec des marqueurs de curseur. Ajoutez des commentaires en ligne. Les modifications sont répercutées dans le notebook sous-jacent.
- **Confluence** : modifier dans Confluence (cliquez sur le lien dans l'onglet **Post-Incident** pour ouvrir votre espace de travail Confluence).
- **Google Drive** : modifier dans Google Docs (cliquez sur le lien dans l'onglet **Post-Incident** pour ouvrir Google Docs).

## Statut et responsable du post-mortem {#postmortem-status-and-owner}

Les post-mortems disposent de deux champs pour aider à suivre l'achèvement et favoriser la responsabilité :

| Champ | Description | Par défaut |
|---|---|---|
| **Statut** | L'état d'achèvement actuel du post-mortem. | Brouillon |
| **Responsable** | La personne chargée de terminer le post-mortem. | L'utilisateur qui a généré le post-mortem |

Les valeurs de statut du post-mortem sont :

| Statut | Description |
|---|---|
| **Brouillon** | Le post-mortem est en cours. |
| **En cours de révision** | Le post-mortem est prêt à être révisé. |
| **Terminé** | Le post-mortem est terminé. |

Le responsable du post-mortem peut être réassigné à n'importe quel utilisateur de votre organisation Datadog. Le responsable est un rôle système qui apparaît au sein de l'équipe d'intervention de l'incident aux côtés d'Incident Commander et de Responder.

## Configurer les modèles de post-mortem {#configure-postmortem-templates}

Pour créer ou gérer des modèles de post-mortem, y compris l'emplacement d'enregistrement et les variables de modèle, consultez [Modèles][4].

## Joindre un post-mortem existant {#attach-an-existing-postmortem}

Si un post-mortem pour un incident existe déjà en dehors de Datadog, ou a été créé avant l'ouverture de l'incident, vous pouvez le lier directement depuis l'onglet **Post-Incident** sans en générer un nouveau. Le post-mortem lié peut être n'importe quelle URL : un notebook Datadog, une page Confluence, un document Google ou tout autre document externe.

Pour joindre un post-mortem existant, ouvrez l'onglet **Post-Incident** et utilisez l'option **Joindre un post-mortem existant** pour ajouter le lien.

## Supprimer un post-mortem {#remove-a-postmortem}

Pour supprimer un post-mortem d'un incident, ouvrez l'onglet **Post-Incident**, recherchez l'entrée du post-mortem et sélectionnez l'option pour le supprimer. La suppression du lien ne supprime pas le document sous-jacent.

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/notebooks/
[2]: /fr/integrations/confluence/
[3]: /fr/integrations/google_drive/
[4]: /fr/incident_response/incident_management/setup_and_configuration/templates
[5]: /fr/actions/workflows/
[6]: /fr/incident_response/incident_management/setup_and_configuration/variables/#incident-variables