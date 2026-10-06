---
aliases:
- /fr/monitors/incident_management/
- /fr/service_management/incident_management/
description: Créer et gérer des incidents
further_reading:
- link: dashboards/querying/#incident-management-analytics
  tag: Documentation
  text: Incident Management Analytics
- link: https://learn.datadoghq.com/courses/getting-started-incident-management
  tag: Centre d'apprentissage
  text: Premiers pas avec Incident Management
- link: https://dtdg.co/fe
  tag: Validation des bases
  text: Participer à une session interactive pour améliorer la Incident Management
- link: https://www.datadoghq.com/blog/mobile-incident-management-datadog/
  tag: Blog
  text: Gérez et résolvez des incidents où que vous soyez avec l'application mobile
    Datadog
- link: https://www.datadoghq.com/blog/incident-postmortem-process-best-practices/
  tag: Blog
  text: Meilleures pratiques pour écrire des postmortems d'incident
- link: https://www.datadoghq.com/blog/incident-response-with-datadog/
  tag: Blog
  text: Incident Management avec Datadog
- link: https://www.datadoghq.com/blog/datadog-service-management/
  tag: Blog
  text: Assurez une haute disponibilité des services avec Datadog Service Management
- link: https://www.datadoghq.com/blog/how-datadog-manages-incidents/
  tag: Blog
  text: Comment Datadog gère ses incidents
- link: https://www.datadoghq.com/blog/incidents-ai-workbench-status-page/
  tag: Blog
  text: Unifiez la remédiation et la communication avec Datadog Incident Response
- link: https://www.datadoghq.com/blog/servicenow-datadog-incident-response
  tag: Blog
  text: Intégrer ServiceNow ITSM à Datadog pour accélérer la réponse aux incidents
- link: https://app.datadoghq.com/release-notes?category=Incident%20Management
  tag: Notes de version
  text: Découvrez les dernières nouveautés d'Incident Management ! (Connexion à l'application
    requise).
title: Incident Management
---
{{< learning-center-callout header="Rejoignez une session de webinaire de formation" hide_image="true" btn_title="S'inscrire" btn_url="https://www.datadoghq.com/technical-enablement/sessions/?tags.topics-0=Incidents">}}
  Explorez et inscrivez-vous aux sessions de formation fondamentale. Découvrez comment Datadog Incident Management permet aux équipes DevOps et aux SRE de gérer plus efficacement leurs workflows de réponse aux incidents du début à la fin, en gagnant du temps et en réduisant la frustration lorsque cela compte le plus.
{{< /learning-center-callout >}}

Datadog Incident Management aide les membres de votre équipe à identifier, atténuer et analyser les perturbations et les menaces pesant sur les services de votre organisation. Avec Incident Management, vous pouvez concevoir un processus de réponse amélioré par l'automatisation qui aide vos équipes à se rassembler autour d'un cadre et d'une boîte à outils partagés. Vous pouvez également utiliser l'analyse des incidents pour évaluer l'efficacité de votre processus de réponse aux incidents.

Les incidents vivent dans Datadog aux côtés de vos métriques, traces et logs. Vos équipes peuvent déclarer des incidents à partir d'alertes de monitor, de signaux de sécurité, d'événements, de cas, et plus encore. Vous pouvez également configurer des monitors pour [déclarer automatiquement des incidents][30].

## Commencez {#get-started}

Incident Management ne nécessite aucune installation. Commencez par suivre un cours du Learning Center, lire notre visite guidée ou déclarer un incident.

{{< whatsnext desc="En savoir plus sur Incident Management :">}}
    {{< nextlink href="https://learn.datadoghq.com/courses/intro-to-incident-management" >}}Découvrez Datadog Incident Management en travaillant sur des exemples pratiques{{< /nextlink >}}
    {{< nextlink href="https://docs.datadoghq.com/getting_started/incident_management/" >}}Visite guidée d'un workflow d'incident{{< /nextlink >}}
    {{< nextlink href="/incident_response/incident_management/investigate/declare" >}}Déclarer un incident{{< /nextlink >}}
{{< /whatsnext >}}

## Facturation {#billing}

Incident Management est une offre basée sur le nombre de sièges. Pour en savoir plus sur la facturation d'Incident Management et sur la gestion des sièges dans Datadog, consultez notre [page de tarification][31] et la [documentation sur la facturation d'Incident Response][32].

## Afficher et rechercher des incidents {#view-and-search-for-incidents}

Pour afficher vos incidents, accédez à la page [Incidents][1] pour voir un flux de tous les incidents en cours. Vous pouvez filtrer vos incidents via les propriétés listées sur la gauche, exporter vos résultats de recherche et configurer des champs supplémentaires qui apparaissent pour tous les incidents dans les [Paramètres des incidents][2].

### Exemples de recherche {#search-examples}

La recherche d'incidents utilise la même [syntaxe de recherche][33] basée sur les événements que Logs et Event Management. Combinez des paires `key:value` avec des opérateurs booléens (`AND`, `OR`, `-`) pour filtrer les incidents.

| Requête | Description |
|-------|-------------|
| `severity:SEV-1` | Afficher tous les incidents SEV-1 |
| `severity:(SEV-1 OR SEV-2) state:active` | Afficher tous les incidents SEV-1 ou SEV-2 actifs |
| `services:checkout AND -state:resolved` | Afficher les incidents non résolus affectant le service de paiement |
| `teams:platform` | Afficher les incidents assignés à l'équipe plateforme |
| `services:web*` | Afficher les incidents affectant les services commençant par « web » |
| `Root\ Cause\ Category:Bug ` | Afficher les incidents avec un attribut de cause racine spécifique |
| `responder:john.smith@datadoghq.com ` | Afficher les incidents où John Smith est un intervenant |

### Filtrer et exporter {#filter-and-export}

- **Filtrer par propriétés** : utilisez le panneau des facettes sur la gauche pour filtrer par statut, gravité, délai de réparation (heures) et d'autres propriétés configurées.
- **Exporter les résultats de recherche** : exportez vos résultats de recherche à l'aide du bouton Exporter en haut de la liste des incidents.
- **Enregistrer les vues** : enregistrez vos requêtes de recherche et vos filtres fréquemment utilisés pour un accès rapide.

### Accès mobile {#mobile-access}

Vous pouvez également consulter votre liste d'incidents depuis l'écran d'accueil de votre appareil mobile et gérer/créer des incidents en téléchargeant l'[application mobile Datadog][3], disponible sur l'[Apple App Store][4] et le [Google Play Store][5].

{{< img src="incident_response/incident_management/iOS_Incident_V2.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="Deux vues dans l'application mobile Datadog : l'une affichant une liste d'incidents avec des détails de haut niveau sur chaque incident, et l'autre affichant un panneau détaillé pour un incident unique.">}}

## Décrire l'incident {#describing-the-incident}

Lors de la déclaration d'un incident, il est essentiel de fournir une description complète, détaillant ce qui s'est passé, pourquoi cela s'est produit et les attributs associés pour garantir que toutes les parties prenantes du processus Incident Management soient pleinement informées. Les éléments essentiels d'une déclaration d'incident incluent un titre, un niveau de gravité et les responsables d'incident. Une documentation efficace sur Incident Management comprend :
- Mise à jour des détails de l'incident, y compris son statut, son impact, sa cause première, ses méthodes de détection et ses impacts sur les services.
- Formation et gestion d'une équipe d'intervention, utilisation de rôles d'intervenants personnalisés et exploitation des attributs de métadonnées pour une évaluation détaillée des incidents.
- Configuration des notifications pour tenir toutes les parties prenantes informées tout au long du processus de résolution des incidents.

Pour plus d'informations, consultez la documentation [Décrire un incident][20].

## Évaluer les données d'incident {#evaluate-incident-data}

L'analyse des incidents fournit des informations sur l'efficacité et les performances de votre processus de réponse aux incidents en vous permettant d'agréger et d'analyser les statistiques des incidents passés. Des métriques clés, tels que le temps de résolution et l'impact sur les clients, peuvent être suivis au fil du temps. Vous pouvez interroger ces analyses à l'aide de widgets graphiques dans les tableaux de bord et les notebooks. Datadog propose des modèles personnalisables, tels que le dashboard de vue d'ensemble Incident Management et un rapport d'incident de notebook, pour vous aider à démarrer.

Pour plus de détails sur les mesures collectées et les configurations graphiques étape par étape pour visualiser vos données, consultez [Analyse Incident Management][10].

## Intégrations {#integrations}

Incident Management s'intègre étroitement aux autres produits Datadog, notamment :

- [Pages de statut Datadog][26] pour créer des pages de statut publiques ou privées et les connecter aux incidents.
- [Datadog On-Call][27] pour convertir des pages en incidents et alerter, manuellement ou automatiquement, les équipes lors d'un incident.
- [Datadog Notebooks][28] pour rédiger et examiner des [post-mortems][34].
- [Datadog Workflow Automation][29] pour créer et exécuter des automatisations.

### Intégrations tierces {#third-party-integrations}

Incident Management s'intègre à des applications tierces, notamment :

- [Atlassian Statuspage][25] pour créer et mettre à jour des incidents Statuspage.
- [Confluence][22] pour générer des [post-mortems][34] d'incident.
- [CoTerm][21] pour suivre en temps réel les activités de remédiation d'incident basées sur le terminal.
- [Jira][15] pour créer un ticket Jira pour un incident.
- [Microsoft Teams][23] pour créer des canaux et des réunions vidéo pour les incidents.
- [PagerDuty][12] et [OpsGenie][13] pour avertir vos ingénieurs d'astreinte et résoudre automatiquement les alertes lors de la résolution de l'incident.
- [ServiceNow][19] pour créer des tickets ServiceNow pour les incidents.
- [Slack][11] pour créer des canaux pour les incidents.
- [Webhooks][16] pour envoyer des notifications d'incident via des webhooks (par exemple, [envoyer des SMS à Twilio][17]).
- [Zoom][24] pour lancer des appels vidéo pour les incidents.

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/incidents
[2]: https://app.datadoghq.com/incidents/settings
[3]: /fr/mobile
[4]: https://apps.apple.com/app/datadog/id1391380318
[5]: https://play.google.com/store/apps/details?id=com.datadog.app
[6]: /fr/incident_response/incident_management/investigate/declare
[7]: /fr/account_management/teams/
[8]: /fr/getting_started/tagging/assigning_tags?tab=noncontainerizedenvironments#overview
[9]: /fr/tracing/#2-instrument-your-application
[10]: /fr/incident_response/incident_management/analytics_and_reporting/
[11]: /fr/integrations/slack/?tab=slackapplicationbeta#using-the-slack-app
[12]: /fr/integrations/pagerduty/
[13]: /fr/integrations/opsgenie/
[15]: /fr/integrations/jira/
[16]: /fr/integrations/webhooks/
[17]: /fr/integrations/webhooks/#sending-sms-through-twilio
[18]: /fr/integrations/statuspage/
[19]: /fr/integrations/servicenow/
[20]: /fr/incident_response/incident_management/investigate/describe
[21]: /fr/coterm
[22]: /fr/integrations/confluence/
[23]: /fr/integrations/microsoft-teams/?tab=datadogapprecommended#datadog-incident-management-in-microsoft-teams
[24]: /fr/integrations/zoom-incident-management/
[25]: /fr/integrations/statuspage/
[26]: /fr/incident_response/status_pages/
[27]: /fr/incident_response/on-call/
[28]: /fr/notebooks/
[29]: /fr/actions/workflows/
[30]: /fr/incident_response/incident_management/investigate/declare#from-a-monitor
[31]: https://www.datadoghq.com/pricing/?product=incident-response#products
[32]: /fr/account_management/billing/incident_response/
[33]: /fr/getting_started/search/#event-based-queries
[34]: /fr/incident_response/incident_management/post_incident/postmortems