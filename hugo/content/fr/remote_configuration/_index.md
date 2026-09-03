---
algolia:
  tags:
  - remote config
  - remote configuration
aliases:
- /fr/agent/guide/how_rc_works
- /fr/agent/guide/how_remote_config_works
- /fr/agent/remote_config
description: Configurer à distance et modifier le comportement des composants Datadog
  tels que les Agents, les SDK et les Travailleurs des pipelines d'observabilité déployés
  dans votre infrastructure.
further_reading:
- link: /security/application_security/how-appsec-works/#built-in-protection
  tag: Documentation
  text: Fonctionnement d'Application Security Monitoring
- link: /dynamic_instrumentation/?tab=configurationyaml#enable-remote-configuration
  tag: Documentation
  text: Instrumentation dynamique
- link: /security/workload_protection/
  tag: Documentation
  text: Configuration de la protection des charges de travail
- link: https://www.datadoghq.com/blog/compliance-governance-transparency-with-datadog-audit-trail/
  tag: Blog
  text: Utiliser le journal d'audit Datadog
- link: https://www.datadoghq.com/blog/remote-configuration-for-datadog/
  tag: Blog
  text: Appliquer aux composants Datadog des mises à jour en temps réel grâce à la
    configuration à distance
title: Configuration à distance
---
## Aperçu {#overview}

La configuration à distance est une fonctionnalité de Datadog qui vous permet de configurer à distance et de modifier le comportement de certaines fonctionnalités du produit dans les composants Datadog tels que les Agents, les SDK et les Travailleurs des pipelines d'observabilité déployés dans votre infrastructure. Utilisez la configuration à distance pour appliquer des configurations aux composants Datadog dans votre environnement à la demande, réduisant ainsi les coûts de gestion, diminuant les frictions entre les équipes et accélérant les temps de résolution des problèmes.

Pour les produits de sécurité Datadog, la protection des applications et des API et la protection des charges de travail, les Agents compatibles avec la configuration à distance et les SDK compatibles fournissent des mises à jour et des réponses de sécurité en temps réel, améliorant ainsi la posture de sécurité de vos applications et de votre infrastructure cloud.

## Comment cela fonctionne {#how-it-works}

Lorsque la configuration à distance est activée, les composants Datadog tels que l'Agent Datadog interrogent en toute sécurité le [site Datadog][1] configuré pour les changements de configuration prêts à être appliqués. Les changements en attente sont ensuite automatiquement appliqués aux composants Datadog. Par exemple, après avoir soumis des changements de configuration dans l'interface utilisateur de Datadog pour une fonctionnalité de produit activée par la configuration à distance, les changements sont stockés dans Datadog.

Le schéma suivant illustre le fonctionnement de la configuration à distance :

{{<img src="agent/remote_config/RC_Diagram_v5.png" alt="Les utilisateurs configurent les fonctionnalités dans l'interface utilisateur, la configuration est stockée dans Datadog, l'Agent demande des mises à jour de configuration." width="90%" style="center">}}

1. Vous configurez certaines fonctionnalités du produit dans l'interface utilisateur de Datadog.
2. Les configurations des fonctionnalités du produit sont stockées en toute sécurité dans Datadog.
3. Les composants Datadog activés par la configuration à distance dans vos environnements interrogent en toute sécurité, reçoivent et appliquent automatiquement les mises à jour de configuration de Datadog. Les bibliothèques de traçage déployées dans vos environnements communiquent avec les Agents pour demander et recevoir des mises à jour de configuration de Datadog au lieu d'interroger directement Datadog.

## Environnements pris en charge {#supported-environments}

La configuration à distance fonctionne dans des environnements où des composants Datadog pris en charge sont déployés. Les composants Datadog pris en charge incluent :
- Agents
- Traceurs (indirectement)
- Travailleurs des pipelines d'observabilité
- Exécuteurs d'actions privées et services de conteneurs sans serveur tels qu'AWS Fargate.

La configuration à distance ne prend pas en charge les applications gérées par des conteneurs sans serveur, telles qu'AWS App Runner, Azure Container Apps, Google Cloud Run ; ou les fonctions déployées sous forme de conteneur, telles qu'AWS Lambda, Azure Functions et Google Cloud Functions.

## Produits et fonctionnalités pris en charge {#supported-products-and-features}

Les produits et fonctionnalités suivants sont pris en charge avec la configuration à distance.

Fleet Automation
: - [Envoyer des flares][27] directement depuis le site Datadog. Dépannez l’Agent Datadog sans avoir besoin d’accéder directement à l’hôte.
: - [Mettez à niveau vos Agents][29].

Protection des applications et des API (AAP)
: - [Activation AAP en 1 clic][33]: Activez AAP en 1 clic depuis l'interface utilisateur de Datadog.
: - [Mises à jour des modèles d'attaque en application][34]: Recevez automatiquement les nouveaux modèles d'attaque du pare-feu d'application Web (WAF) dès que Datadog les publie, suivant les vulnérabilités ou vecteurs d'attaque nouvellement divulgués.
: - [Protéger][34]: Bloquez les adresses IP des attaquants, les utilisateurs authentifiés et les demandes suspectes signalées dans les Signaux de sécurité et les Traces AAP temporairement ou définitivement via l'interface utilisateur de Datadog.

Application Security Monitoring (APM)
: - Configuration à l'exécution: Modifiez le taux d'échantillonnage des traces d'un service, l'activation de l'injection de journaux et les balises d'en-tête HTTP depuis l'interface Catalog, sans avoir à redémarrer le service. Lisez [Configuration à l'exécution][22] pour plus d'informations.
: - [Définir à distance le taux d'échantillonnage de l'Agent][35]: Configurez à distance l'Agent Datadog pour modifier ses taux d'échantillonnage de traces et définissez des règles pour adapter l'ingestion des traces de votre organisation selon vos besoins, sans avoir besoin de redémarrer votre Agent Datadog.

[Instrumentation dynamique][36]
: - Envoyez des métriques critiques, des traces et des journaux de vos applications en direct sans modifications de code.

Protection des charges de travail
: - Mises à jour automatiques des règles par défaut de l'Agent : Recevez et mettez à jour automatiquement les règles par défaut de l'Agent maintenues par Datadog à mesure que de nouvelles détections et améliorations de l'Agent sont publiées. Consultez [Configuration de la protection des charges de travail][3] pour plus d'informations.
- Déploiement automatique de règles d'Agent personnalisées : Déployez automatiquement vos règles d'Agent personnalisées sur des hôtes désignés (tous les hôtes ou un sous-ensemble défini d'hôtes).

Pipelines d'observabilité
- Déployez et mettez à jour à distance les [Travailleurs des Pipelines d'Observabilité][4] (OPW) : Créez et modifiez des pipelines dans l'interface utilisateur de Datadog, déployant vos modifications de configuration sur les instances OPW fonctionnant dans votre environnement.

[Mise à l'échelle automatique][47]
- Gérez à distance les configurations de mise à l'échelle des clusters et des charges de travail pour vos environnements conteneurisés. Consultez [Mise à l'échelle automatique][47] pour plus d'informations.

Exécuteur d'actions privé
- Exécutez des workflows et des applications Datadog qui interagissent avec des services hébergés sur votre réseau privé sans exposer vos services à l'Internet public. Pour plus d'informations, consultez [Actions Privées][30].

Drapeaux de fonctionnalités
- Fournissez des configurations de drapeaux (règles de ciblage et d'attribution) aux SDK côté serveur pour une attribution de variante synchrone basée sur le contexte d'évaluation. Consultez [Drapeaux de fonctionnalités][48] pour plus d'informations.

## Considérations de sécurité {#security-considerations}

Datadog a mis en place les mécanismes suivants pour protéger la confidentialité, l'intégrité et la disponibilité des configurations récupérées et appliquées par vos composants Datadog :

- Les composants Datadog activés pour la configuration à distance déployés dans votre infrastructure demandent des configurations à Datadog.
  <div class="alert alert-info">Certains composants comme les exécuteurs d'actions privés sont toujours activés pour la configuration à distance. D'autres, comme les Agents, peuvent être activés ou désactivés à l'aide d'options de configuration sur disque.</div>
- Datadog n'envoie jamais de modifications de configuration à moins qu'elles ne soient demandées par des composants Datadog. S'il envoie des modifications de configuration, Datadog n'envoie que les modifications pertinentes pour le composant demandeur.
- Les demandes de configuration sont initiées depuis votre infrastructure vers Datadog via HTTPS (port 443). C'est le même port que l'Agent utilise par défaut pour envoyer des données d'observabilité.
- La communication entre vos composants Datadog et Datadog est chiffrée à l'aide de HTTPS et est authentifiée et autorisée à l'aide de votre clé API Datadog, sauf dans le cas des exécuteurs d'actions privés où un jeton JWT est utilisé à la place.
- Seuls les utilisateurs disposant de la permission [`api_keys_write`][5] sont autorisés à activer ou désactiver la capacité de configuration à distance sur les clés API et à utiliser les fonctionnalités de produit prises en charge.
- Les modifications de configuration soumises via l'interface utilisateur de Datadog sont signées et validées par le composant Datadog demandeur, vérifiant ainsi l'intégrité de la configuration.

### Accès basé sur les rôles {#role-based-access}

L'activation de la Configuration à Distance impacte les produits suivants. Chaque produit définit un ensemble de contrôles d'accès basés sur les rôles qui doivent être accordés à leurs utilisateurs. Pour des informations générales sur la gestion des accès, voir [Contrôle d'Accès][37].

 | Produit avec Configuration à Distance Activée   | Contrôles d'Accès Basés sur les Rôles                                                                                                                                                                                                                                                                     |
 |----------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
 | Fleet Automation                       | `FLEET_POLICIES_WRITE`<br>`AGENT_UPGRADE_WRITE`<br>`FLEET_FLARE`<br><br>Pour plus d'informations, voir [Fleet Automation][38].                                                                                                                                                                      |
 | App and API Protection                 | `APPSEC_ACTIVATION_READ`<br>`APPSEC_ACTIVATION_WRITE`<br>`APPSEC_PROTECT_READ`<br>`APPSEC_PROTECT_WRITE`<br><br>Pour plus d'informations, voir [Access Control][39].                                                                                                                                |
 | APM                                    | `APM_SERVICE_INGEST_READ`<br>`APM_SERVICE_INGEST_WRITE`<br>`APM_REMOTE_CONFIGURATION_READ`<br>`APM_REMOTE_CONFIGURATION_WRITE`<br><br>Pour plus d'informations, voir [Échantillonnage Adaptatif][40].                                                                                                       |
 | Dynamic Instrumentation                | `DEBUGGER_READ`<br>`DEBUGGER_WRITE`<br>`DEBUGGER_WRITE_PRE_PROD`<br>`APM_REMOTE_CONFIGURATION_READ`<br>`APM_REMOTE_CONFIGURATION_WRITE`<br><br>Pour plus d'informations, voir [APM][41].                                                                                                            |
 | Workload Protection                    | `SECURITY_MONITORING_CWS_AGENT_RULES_WRITE`<br>`SECURITY_MONITORING_CWS_AGENT_RULES_READ`<br>`SECURITY_MONITORING_CWS_AGENT_RULES_ACTIONS`<br><br>Pour plus d'informations, voir [Security][42].                                                                                                    |
 | CSM Side Scanning                      | `ORG_MANAGEMENT`<br>`MANAGE_INTEGRATIONS`<br><br>Pour plus d'informations, voir [Enable Agentless Scanning][43].                                                                                                                                                                                   |
 | Observability Pipelines                | `OBSERVABILITY_PIPELINES_READ`<br>`OBSERVABILITY_PIPELINES_WRITE`<br>`OBSERVABILITY_PIPELINES_DELETE`<br>`OBSERVABILITY_PIPELINES_DEPLOY`<br>`OBSERVABILITY_PIPELINES_CAPTURE_WRITE`<br>`OBSERVABILITY_PIPELINES_CAPTURE_READ`<br><br>Pour plus d'informations, voir [Observability Pipelines][44]. |
 | Private Action Runner                  | `ON_PREM_RUNNER_WRITE`<br>`ON_PREM_RUNNER_READ`<br>`ON_PREM_RUNNER_USE`<br><br>Pour plus d'informations, voir [App Builder & Workflow Automation][45].                                                                                                                                              |
 | Network Device Monitoring (NDM)        | `NDM_DEVICE_PROFILES_VIEW`<br>`NDM_DEVICE_PROFILES_EDIT`                                                                                                                                                                                                                                       |
 | Container Autoscaling                  | `ORCHESTRATION_AUTOSCALING_MANAGE`<br>`ORCHESTRATION_WORKLOAD_SCALING_WRITE`<br>`ORCHESTRATION_WORKLOAD_SCALING_READ`                                                                                                                                                                          |
 | Serverless Lambda Auto-instrumentation | `SERVERLESS_AWS_INSTRUMENTATION_READ`<br>`SERVERLESS_AWS_INSTRUMENTATION_WRITE`<br><br>Pour plus d'informations, voir [Serverless][46].                                                                                                                                                             |
 | Feature Flags                          | `FEATURE_FLAG_CONFIG_READ`<br>`FEATURE_FLAG_CONFIG_WRITE`<br>`FEATURE_FLAG_ENVIRONMENT_CONFIG_READ`<br>`FEATURE_FLAG_ENVIRONMENT_CONFIG_WRITE`<br><br>Pour plus d'informations, voir [Feature Flags][48].                                                                                           |

## Enable Remote Configuration {#enable-remote-configuration}

Dans la plupart des cas, Remote Configuration est activé par défaut pour votre organisation. Vous pouvez vérifier si Remote Configuration est activé pour votre organisation depuis la page des paramètres de [Remote Configuration][8]. Si vous devez l'activer :
1. Assurez-vous que vos autorisations RBAC incluent [`org_management`][7], afin de pouvoir activer Remote Configuration pour votre organisation.
1. Depuis la page des paramètres de votre organisation, activez [Remote Configuration][8]. Cela permet aux composants Datadog de votre organisation de recevoir des configurations depuis Datadog.
1. Suivez les instructions de configuration [spécifiques au produit](#product-specific-configuration) ci-dessous pour terminer la configuration de Remote Configuration.

### Configuration spécifique au produit {#product-specific-configuration}

Consultez la documentation ci-dessous pour des instructions spécifiques au produit que vous configurez.

| Produit                 | Instructions de configuration                                                                                             |
|-------------------------|----------------------------------------------------------------------------------------------------------------|
| Fleet Automation        | [Setup Fleet Automation][31]                                                                                   |
| APM                     | [Configuration à l'exécution](/tracing/guide/remote_config/)                                                      |
| Dynamic Instrumentation | [Commencez avec Dynamic Instrumentation](/dynamic_instrumentation/#getting-started)                      |
| Workload Protection     | [Workload Protection][3]                                                                                       |
| Pipelines d'observabilité | Assurez-vous que vous avez [activé Remote Configuration sur la clé API][32] que vous utilisez pour les pipelines d'observabilité. |
| Sensitive Data Scanner  | [Cloud storage](/security/sensitive_data_scanner/setup/cloud_storage/?tab=newawsaccount)                       |
| Private Action Runner   | [Private Actions Overview](/actions/private_actions/)                                                          |
| Feature Flags           | [Server-Side Feature Flags](/feature_flags/server/)                                                            |

## Meilleures pratiques {#best-practices}

### Datadog Audit Trail {#datadog-audit-trail}

Utilisez [Datadog Audit Trail][13] pour surveiller l'accès à l'organisation et les événements liés à Remote Configuration activée. Audit Trail permet à vos administrateurs et équipes de sécurité de suivre la création, la suppression et la modification des clés API et des clés d'application Datadog. Une fois Datadog Audit Trail configuré, vous pouvez consulter les événements liés aux fonctionnalités Remote Configuration activées et voir qui a demandé ces changements. Datadog Audit Trail vous permet de reconstruire des séquences d'événements et d'établir une surveillance robuste de Datadog pour Remote Configuration.

### Monitors {#monitors}

Configurez des [monitors][14] pour recevoir des notifications lorsqu'un événement intéressant se produit.

## Se désinscrire de Remote Configuration {#opting-out-of-remote-configuration}

Au lieu de désactiver Remote Configuration globalement, Datadog recommande de se désinscrire pour des produits Datadog spécifiques. Pour plus d'informations, consultez [la documentation du produit concerné](#product-specific-configuration).

## Lectures complémentaires {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/getting_started/site/
[3]: /fr/security/workload_protection/
[4]: /fr/observability_pipelines/#observability-pipelines-worker
[5]: /fr/account_management/rbac/permissions#api-and-application-keys
[6]: /fr/security/application_security/threats/setup/compatibility/
[7]: /fr/account_management/rbac/permissions#access-management
[8]: https://app.datadoghq.com/organization-settings/remote-config
[9]: /fr/security/default_rules/#cat-workload-security
[10]: /fr/tracing/trace_pipeline/ingestion_controls/#managing-ingestion-for-all-services-at-the-agent-level
[11]: /fr/dynamic_instrumentation/?tab=configurationyaml#enable-remote-configuration
[12]: /fr/security/application_security/how-appsec-works/#built-in-protection
[13]: /fr/account_management/audit_trail
[14]: /fr/monitors/
[15]: /fr/help/
[16]: /fr/remote_configuration
[17]: /fr/agent/configuration/network
[18]: /fr/agent/configuration/proxy/
[19]: /fr/internal_developer_portal/catalog/
[20]: /fr/dynamic_instrumentation/?tab=configurationyaml#prerequisites
[21]: /fr/agent/configuration/agent-configuration-files/?tab=agentv6v7#agent-main-configuration-file
[22]: /fr/tracing/trace_collection/runtime_config/
[23]: /fr/remote_configuration#opting-out-of-remote-configuration
[24]: https://app.datadoghq.com/organization-settings/api-keys
[25]: /fr/agent/guide/
[26]: https://app.datadoghq.com/organization-settings/remote-config/setup?page_id=org-enablement-step
[27]: /fr/agent/fleet_automation/fleet_view/#send-a-remote-flare
[28]: /fr/security/sensitive_data_scanner/?tab=usingtheagent
[29]: /fr/agent/fleet_automation/upgrade_agents/
[30]: /fr/actions/private_actions/use_private_actions/
[31]: /fr/agent/guide/setup_remote_config
[32]: https://app.datadoghq.com/organization-settings/remote-config/setup?page_id=api-key-enablement-step&standalone=1
[33]: /fr/security/application_security/setup/
[34]: /fr/security/application_security/
[35]: /fr/tracing/trace_pipeline/adaptive_sampling/
[36]: /fr/tracing/dynamic_instrumentation/#explore-dynamic-instrumentation
[37]: /fr/account_management/rbac
[38]: /fr/agent/fleet_automation/#control-access-to-fleet-automation
[39]: /fr/security/access_control/#permissions
[40]: /fr/tracing/trace_pipeline/adaptive_sampling/#permissions
[41]: /fr/account_management/rbac/permissions/#apm
[42]: /fr/account_management/rbac/permissions/#cloud-security-platform
[43]: /fr/security/cloud_security_management/setup/#enable-agentless-scanning
[44]: /fr/account_management/rbac/permissions/#observability-pipelines
[45]: /fr/account_management/rbac/permissions/#app-builder--workflow-automation
[46]: /fr/account_management/rbac/permissions/#serverless
[47]: /fr/containers/autoscaling
[48]: /fr/feature_flags/