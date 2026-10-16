---
aliases:
- /fr/network_monitoring/cloud_network_monitoring/overview_page
description: Identifiez les problèmes réseau et résolvez-les grâce à des informations
  exploitables.
further_reading:
- link: https://www.datadoghq.com/blog/cloud-network-monitoring-datadog/
  tag: Blog
  text: Surveillez votre architecture cloud et les dépendances de vos applications
    avec Datadog CNM
- link: /network_monitoring/cloud_network_monitoring/network_analytics
  tag: Documentation
  text: En savoir plus sur Network Analytics
- link: https://www.datadoghq.com/blog/cnm-network-health
  tag: Blog
  text: Détectez, diagnostiquez et résolvez facilement les problèmes réseau avec CNM
    Network Health
title: Network Health
---
<div class="alert alert-info">Network Health est en version préliminaire. Contactez votre représentant Datadog pour vous inscrire.
</div>

## Présentation {#overview}

Network Health offre une vue unifiée des problèmes les plus critiques de votre réseau, en détectant et en hiérarchisant automatiquement les problèmes liés au DNS, aux certificats TLS, aux groupes de sécurité et aux anomalies réseau. Il fait ressortir des informations exploitables avec des pistes de remédiation claires, vous aidant à résoudre les problèmes de connectivité et à réduire l'impact des incidents.

Cette page décrit les sections de la page Network Health ainsi que les problèmes et informations qui y sont présentés.

{{< img src="network_performance_monitoring/network_health/network_health_overview.png" alt="La page Network Health avec le menu rétractable ouvert, mettant en évidence les actions recommandées." style="width:100%;">}}

## Prérequis {#prerequisites}

- [Cloud Network Monitoring][1] est activé.
- Pour afficher les [groupes de sécurité](#security-groups), la [collecte de ressources][6] doit être activée dans votre intégration AWS.

## Actions recommandées {#recommended-actions}

La section {{< ui >}}Recommended Actions{{< /ui >}} met en évidence les problèmes les plus critiques détectés sur votre réseau. Ils sont classés par ordre de priorité en fonction :

1. **Gravité** : si le problème bloque activement le trafic
2. **Impact** : à quel point les services affectés sont critiques pour votre infrastructure

Chaque action recommandée affiche :

- Le problème spécifique détecté (par exemple, « Certificat TLS expiré il y a _N_ jours »)
- Le service client impacté (le service effectuant les requêtes)
- Le service serveur impacté (le service recevant les requêtes)

Survolez le nom d'un service pour basculer vers APM, ou cliquez sur {{< ui >}}Remediate{{< /ui >}} pour afficher les étapes de remédiation ainsi que les options pour créer un [{{< ui >}}New Workflow{{< /ui >}}][2], [{{< ui >}}Create a Case{{< /ui >}}][3] ou [{{< ui >}}Declare an Incident{{< /ui >}}][4].

   {{< img src="network_performance_monitoring/network_health/recommended_actions_side_panel.png" alt="Panneau latéral des actions recommandées d'un service affecté, affichant les étapes de remédiation." style="width:100%;">}}

## Watchdog Insights {#watchdog-insights}

La section {{< ui >}}Watchdog Insights{{< /ui >}} affiche les comportements réseau anormaux détectés par Watchdog, en se concentrant sur les pics de retransmissions TCP. Une augmentation des retransmissions par rapport à votre référence (généralement la semaine précédente) indique souvent un problème réseau sous-jacent. Consultez la documentation [Watchdog Insights][5] pour plus d'informations.

Utilisez Watchdog Insights pour :
- Détecter les problèmes potentiels tôt
- Corréler les anomalies avec des causes racines spécifiques
- Examinez la dégradation des performances avant qu'elle n'impacte les utilisateurs

Vous pouvez également examiner la latence, la perte de paquets et l'état des connexions TCP via un agent IA, tel que Claude Code ou Cursor, avec l'outil [`analyze_cloud_network_monitoring`][7] dans le Datadog MCP Server.

## Certificats TLS {#tls-certificates}

Les certificats TLS expirés ou sur le point d'expirer peuvent bloquer les connexions sécurisées entre les services, entraînant une perte de trafic. La section {{< ui >}}TLS Certificates{{< /ui >}} présente :

- {{< ui >}}Expired certificates{{< /ui >}}: Les certificats invalides qui bloquent le trafic
- {{< ui >}}Expiring certificates{{< /ui >}}: Les certificats sur le point d'expirer
- {{< ui >}}Impacted services{{< /ui >}}: Les services client et serveur affectés par chaque problème de certificat (notez que le « service » client peut être un équilibreur de charge AWS, tel qu'un Application Load Balancer)

Cliquez sur un certificat expiré pour voir les étapes de son renouvellement dans AWS, ou pour créer un [{{< ui >}}New Workflow{{< /ui >}}][2], [{{< ui >}}Create a Case{{< /ui >}}][3] ou [{{< ui >}}Declare an Incident{{< /ui >}}][4].

## Échecs DNS {#dns-failures}

Les erreurs de configuration DNS peuvent acheminer le trafic vers des destinations incorrectes, empêchant les services de communiquer. Ces échecs résultent généralement de modifications apportées aux configurations de routage DNS.

La section {{< ui >}}DNS Failures{{< /ui >}} affiche :

- {{< ui >}}Failure reason{{< /ui >}} : La cause de l'échec DNS
- {{< ui >}}Impacted DNS server{{< /ui >}} : Le serveur DNS rencontrant des taux d'échec élevés
- {{< ui >}}Impacted services{{< /ui >}} : Les services client et serveur affectés par l'échec DNS

**Raisons de l'échec** :

NXDOMAIN  
: Le nom de domaine n'existe pas, généralement en raison d'une mauvaise configuration ou d'un domaine supprimé.

TIMEOUT 
: La requête DNS a expiré avant de recevoir une réponse, ce qui peut indiquer des problèmes réseau ou des serveurs DNS ne répondant pas.

SERVFAIL
: Le serveur DNS n'a pas réussi à traiter une requête, souvent en raison d'un problème côté serveur.

Survolez un nom de service pour basculer vers APM, ou cliquez sur une action recommandée pour afficher les étapes de remédiation ainsi que des options pour créer un [{{< ui >}}New workflow{{< /ui >}}][2], [{{< ui >}}Create a Case{{< /ui >}}][3] ou [{{< ui >}}Declare an Incident{{< /ui >}}][4].

## Groupes de sécurité {#security-groups}

Les groupes de sécurité contrôlent le flux de trafic dans les environnements cloud via des règles d'autorisation et de refus. Comme les groupes de sécurité refusent le trafic par défaut, des suppressions ou modifications accidentelles de règles peuvent immédiatement bloquer le trafic légitime entre les services.

**Remarque** : La surveillance des groupes de sécurité est disponible uniquement pour AWS et nécessite que la [collecte de ressources EC2][6] soit activée dans votre intégration AWS.

La section {{< ui >}}Security Groups{{< /ui >}} identifie :
- Mauvaises configurations de groupes de sécurité bloquant le trafic
- Les services spécifiques incapables de communiquer
- Modifications récentes apportées aux règles des groupes de sécurité

**Résolution** : 
1. Cliquez sur un problème de groupe de sécurité pour ouvrir le panneau latéral.
2. Sélectionnez {{< ui >}}View in AWS{{< /ui >}} pour accéder à la console AWS.
3. Examinez et modifiez les règles entrantes et sortantes.
4. Utilisez les données {{< ui >}}Infrastructure Change Tracking{{< /ui >}} dans le panneau latéral pour identifier le moment où la modification a eu lieu et l'annuler si nécessaire.

## Filtrage {#filtering}

Utilisez les filtres en haut de la page pour restreindre le périmètre des problèmes affichés. Les filtres disponibles incluent :

- {{< ui >}}Service{{< /ui >}} : Afficher les problèmes affectant un service particulier
- {{< ui >}}Team{{< /ui >}} : Afficher les problèmes appartenant à une équipe spécifique

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/network_monitoring/cloud_network_monitoring/setup
[2]: /fr/actions/workflows/build/
[3]: /fr/incident_response/work_management/create_work_item
[4]: /fr/incident_response/incident_management/declare/
[5]: /fr/watchdog/insights
[6]: /fr/integrations/amazon-web-services/#resource-collection
[7]: /fr/mcp_server/tools/#analyze_cloud_network_monitoring