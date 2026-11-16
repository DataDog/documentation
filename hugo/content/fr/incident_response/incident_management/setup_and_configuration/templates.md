---
aliases:
- /fr/service_management/incident_management/incident_settings/templates/
- /fr/incident_response/incident_management/incident_settings/templates
further_reading:
- link: /incident_response/incident_management/setup_and_configuration/variables
  tag: Documentation
  text: Référence des variables d'incident
- link: /incident_response/incident_management/notification
  tag: Documentation
  text: En savoir plus sur Incident Management Notifications
- link: /incident_response/incident_management/post_incident/postmortems
  tag: Documentation
  text: Post-mortems d'incident
title: Templates
---
## Présentation {#overview}

Les modèles dynamiques offrent un cadre complet pour améliorer la réponse aux incidents et l'efficacité opérationnelle. L'utilisation de modèles de message personnalisés pour les notifications ad hoc et automatisées peut faire gagner du temps lors d'incidents très stressants. Cela garantit que les messages sont systématiquement précis et contiennent un contexte pertinent, permettant aux destinataires de les comprendre et d'agir plus rapidement.

Des paramètres personnalisables pour l'analyse post-mortem peuvent fournir des informations précieuses et favoriser une optimisation à long terme. En adaptant les rapports et les dashboards au contexte unique de votre organisation, vous pouvez identifier les problèmes récurrents et mettre en œuvre des mesures préventives plus efficacement.

## Messages {#messages}

Les modèles de message sont des messages dynamiques et réutilisables qui peuvent être utilisés pour les [notifications d'incident manuelles][1] ou les règles de notification automatisées. Les modèles de message utilisent des [variables de modèle][4], telles que `{{incident.severity}}`, pour injecter dynamiquement la valeur correspondante de l'incident pour lequel la notification est envoyée. Les modèles de message prennent en charge le Markdown afin que les notifications d'incident puissent inclure une mise en forme du texte, des tableaux, des listes indentées et des hyperliens. Pour mieux organiser un grand nombre de modèles de message, chaque modèle nécessite une catégorie lors du processus de création.

Pour créer un modèle de message :

1. Cliquez sur le bouton **+ New Message Template**.
2. Donnez un nom au modèle.
3. Attribuez-lui une catégorie nouvelle ou existante.
4. Donnez un objet au modèle (pour les e-mails).
5. Rédigez le message du modèle.
6. Cliquez sur **Save**.

**Remarque :** Les variables de modèle sont prises en charge à la fois dans le titre et dans le corps du message.

### Variables IA pour les notifications {#ai-variables-for-notifications}

Incident AI peut remplir dynamiquement les détails clés des notifications avec du contenu généré par IA. Insérez l'une des variables suivantes dans le corps de votre message :

| Champ | Variable |
|---|---|
| AI Contributing Factors | `{{incident.ai_contributing_factors}}` |
| AI Impact | `{{incident.ai_impact}}` |
| AI Issue | `{{incident.ai_issue}}` |
| AI Remediation | `{{incident.ai_remediation}}` |

{{< img src="incident_response/incident_management/investigate/incident_ai/message_template_variables.png" alt="Nouveau modèle de message contenant des variables IA" style="width:80%;" >}}

## Post-mortems {#postmortems}

Les modèles de post-mortem définissent la structure et le contenu de vos post-mortems. Lorsque vous générez un post-mortem, Datadog remplit automatiquement le modèle avec les données de l'incident. Utilisez des [variables de modèle][4], telles que `{{incident.severity}}`, pour contrôler les données d'incident incluses.

Pour créer un modèle d'analyse post-mortem :

1. Accédez à [**Incident Management Settings > Postmortem Templates**][8] et cliquez sur **+ New Postmortem Template**.
2. Donnez un nom au modèle.
3. Sélectionnez l'emplacement d'enregistrement (voir [Emplacement d'enregistrement](#save-location)).
4. Rédigez le contenu du modèle (les variables de modèle disponibles sont listées à droite de la zone de texte).
5. (Facultatif) Définissez le modèle par défaut.
6. Cliquez sur **Save**.

### Emplacement d'enregistrement {#save-location}

Sélectionnez l'emplacement où le document de post-mortem généré est enregistré :

| Option | Prérequis |
|---|---|
| **Datadog Notebooks** | Aucune configuration supplémentaire requise. |
| **Confluence** | Nécessite l'[intégration Confluence][3]. Configurez votre compte Confluence dans les paramètres d'intégration avant de le sélectionner comme destination. |
| **Google Drive** | Nécessite l'[intégration Google Drive][6]. Configurez votre compte Google dans les paramètres d'intégration avant de le sélectionner comme destination. |

### Variables de modèle pour les post-mortems {#template-variables-for-postmortems}

Les modèles prennent en charge des variables qui sont renseignées avec les données d'incident lors de la génération du post-mortem. Pour obtenir une liste complète des variables disponibles, consultez la référence [Variables d'incident][4].

{{% collapse-content title="Variables standard" level="h4" %}}
Les variables standard sont extraites directement des champs d'incident et incluent également tous les [champs de propriétés personnalisés][7] définis.

| Variable | Description |
|---|---|
| `{{incident.title}}` | The incident title |
| `{{incident.state}}` | The current incident state (for example: `active`, `stable`, `resolved`) |
| `{{incident.severity}}` | The incident severity level |
| `{{incident.commander}}` | Le nom du responsable de l'incident, ou son adresse e-mail ou son identifiant si aucun nom n'est défini |

{{% /collapse-content %}}

{{% collapse-content title="Variables de durée" level="h4" %}}
Incluez les temps de réponse d'un incident et comparez-les aux moyennes historiques :

```text
Time to Detect: {{incident.time_to_detect}}
Time to Internal Response: {{incident.time_to_internal_response}}
Time to Repair: {{incident.time_to_repair}}
Time to Resolve: {{incident.time_to_resolve}}
Time from Detect to Resolve: {{incident.time_from_detect_to_resolve}}
Mean Time to Resolve (past 30 days): {{incident.mean_time_to_resolve_30_days}}
```

Les durées individuelles s'affichent sous la forme `N/A` lorsqu'elles ne peuvent pas être calculées ou qu'elles sont nulles ou négatives. Les durées moyennes s'affichent sous la forme `N/A` lorsqu'aucun incident éligible n'a de valeur positive. Consultez la [Référence des variables d'incident][9] pour connaître toutes les variables et les fenêtres de calcul de moyenne.
{{% /collapse-content %}}

{{% collapse-content title="Variable de carte d'incident" level="h4" %}}
La variable de carte d'incident (`{{incident.card}}`) intègre une carte récapitulative qui reflète les champs d'incident en temps réel. Lorsque les champs d'incident changent, la carte dans le post-mortem se met à jour automatiquement. La carte inclut les champs de statut et de responsable du post-mortem.

**Remarque** : La carte d'incident n'est prise en charge que dans Datadog Notebooks.
{{% /collapse-content %}}

{{% collapse-content title="Variable d'actions de suivi" level="h4" %}}
La variable d'actions de suivi (`{{incident.follow-ups}}`) intègre une liste d'actions de suivi de l'incident dans le notebook de post-mortem. Depuis la vue en liste de Datadog Notebooks, vous pouvez définir des dates d'échéance, attribuer des éléments ou créer de nouveaux éléments de suivi. Les modifications sont répercutées dans la liste des actions de suivi de l'incident.

**Remarque** : La variable d'actions de suivi n'est prise en charge que dans Datadog Notebooks.
{{% /collapse-content %}}

{{% collapse-content title="Variables IA" level="h4" %}}
Les variables IA utilisent Bits AI pour générer du contenu suggéré à partir des données de l'incident. Lorsque vous générez un post-mortem qui inclut une variable IA, Datadog fournit une valeur suggérée que vous pouvez accepter, modifier ou rejeter avant qu'elle ne soit enregistrée.

{{% incident-ai-postmortem-variables %}}

Pour utiliser ces variables :
1. Ajoutez les variables au corps du modèle.
1. Lors de la génération d'un post-mortem, sélectionnez le modèle prêt à l'emploi **General incident with AI content** ou un modèle personnalisé incluant des variables IA.
1. Prévoyez jusqu'à une minute pour que le contenu généré par l'IA s'affiche. Datadog recommande de relire et d'affiner le contenu généré par l'IA avant de partager le post-mortem.

**Note** :
- Les variables IA doivent être précédées d'un en-tête de section.
- La chronologie de l'incident doit contenir au moins 10 messages pour que les variables IA génèrent du contenu.

{{% /collapse-content %}}

Pour plus d'informations sur la génération de post-mortems à l'aide de ces modèles, consultez [Post-mortems d'incident][5].

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/incident_response/incident_management/notifications
[2]: /fr/notebooks/
[3]: /fr/integrations/confluence/
[4]: /fr/incident_response/incident_management/setup_and_configuration/variables
[5]: /fr/incident_response/incident_management/post_incident/postmortems
[6]: /fr/integrations/google_drive/
[7]: /fr/incident_response/incident_management/setup_and_configuration/property_fields
[8]: https://app.datadoghq.com/incidents/settings?section=postmortem-templates
[9]: /fr/incident_response/incident_management/setup_and_configuration/variables/#incident-variables