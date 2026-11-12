---
algolia:
  tags:
  - remote config
  - remote configuration
aliases:
- /fr/agent/guide/how_rc_works
- /fr/agent/guide/how_remote_config_works
- /fr/agent/remote_config
description: Configurez et modifiez à distance le comportement des composants Datadog
  tels que les Agents, les SDK et les Observability Pipelines Workers déployés dans
  votre infrastructure.
further_reading:
- link: /security/application_security/how-appsec-works/#built-in-protection
  tag: Documentation
  text: Fonctionnement d'Application Security Monitoring
- link: /dynamic_instrumentation/
  tag: Documentation
  text: Dynamic Instrumentation
- link: /security/workload_protection/
  tag: Documentation
  text: Configuration de Workload Protection
- link: https://www.datadoghq.com/blog/single-step-instrumentation-rules/
  tag: Blog
  text: Gérez le traçage des services entre les hosts avec les règles d'instrumentation
    en une étape
- link: https://www.datadoghq.com/blog/compliance-governance-transparency-with-datadog-audit-trail/
  tag: Blog
  text: Utiliser Datadog Audit Trail
- link: https://www.datadoghq.com/blog/remote-configuration-for-datadog/
  tag: Blog
  text: Appliquer aux composants Datadog des mises à jour en temps réel grâce à Remote
    Configuration
title: Remote Configuration
---
## Présentation {#overview}

Remote Configuration est une fonctionnalité Datadog qui vous permet de configurer et de modifier à distance le comportement de certaines fonctionnalités de produit dans les composants Datadog tels que les Agents, les SDK et les Observability Pipelines Workers déployés dans votre infrastructure. Utilisez Remote Configuration pour appliquer des configurations aux composants Datadog de votre environnement à la demande, ce qui permet de réduire les coûts de gestion, de diminuer les frictions entre les équipes et d'accélérer les temps de résolution des problèmes.

Pour les produits de sécurité Datadog, App and API Protection et Workload Protection, les Agents compatibles avec Remote Configuration et les SDK compatibles fournissent des mises à jour et des réponses de sécurité en temps réel, améliorant ainsi la posture de sécurité de vos applications et de votre infrastructure cloud.

## Fonctionnement {#how-it-works}

Lorsque Remote Configuration est activé, les composants Datadog tels que le Datadog Agent interrogent de manière sécurisée le [site Datadog][1] pour obtenir les modifications de configuration prêtes à être appliquées. Les modifications en attente sont ensuite automatiquement appliquées aux composants Datadog. Par exemple, après avoir soumis des modifications de configuration dans l'interface utilisateur Datadog pour une fonctionnalité de produit compatible avec Remote Configuration, les modifications sont stockées dans Datadog.

Le schéma suivant illustre le fonctionnement de Remote Configuration :

{{<img src="agent/remote_config/RC_Diagram_v5.png" alt="Les utilisateurs configurent les fonctionnalités dans l'interface utilisateur, la configuration est stockée dans Datadog, et l'Agent demande les mises à jour de configuration." width="90%" style="center">}}

1. Vous configurez certaines fonctionnalités de produit dans l'interface utilisateur Datadog.
2. Les configurations des fonctionnalités de produit sont stockées de manière sécurisée dans Datadog.
3. Les composants Datadog compatibles avec la configuration à distance dans vos environnements interrogent, reçoivent et appliquent automatiquement les mises à jour de configuration depuis Datadog de manière sécurisée. Les bibliothèques de tracing déployées dans vos environnements communiquent avec les Agents pour demander et recevoir des mises à jour de configuration depuis Datadog au lieu d'interroger directement Datadog.

## Environnements pris en charge {#supported-environments}

Remote Configuration fonctionne dans les environnements où des composants Datadog pris en charge sont déployés. Les composants Datadog pris en charge incluent :
- Agents
- Tracers (indirectement)
- Observability Pipeline Workers
- Exécuteurs d'actions privés et services cloud de conteneurs serverless tels qu'AWS Fargate.

Remote Configuration ne prend pas en charge les applications gérées par conteneur sans serveur, telles qu'AWS App Runner, Azure Container Apps, Google Cloud Run ; ou les fonctions déployées avec un empaquetage de conteneur, telles qu'AWS Lambda, Azure Functions et Google Cloud Functions.

## Produits et fonctionnalités pris en charge {#supported-products-and-features}

Les produits et fonctionnalités suivants sont pris en charge avec Remote Configuration.

Fleet Automation
: - [Envoyez des flares][27] directement depuis le site Datadog. Dépannez en toute transparence le Datadog Agent sans accéder directement au host.
: - [Mettez à niveau vos Agents][29].

App and API Protection (AAP)
: - [Activation d'AAP en 1 clic][33]: Activez AAP en 1 clic depuis l'interface utilisateur Datadog.
: - [Mises à jour des modèles d'attaque dans l'application][34]: Recevez automatiquement les derniers modèles d'attaque du Web Application Firewall (WAF) à mesure que Datadog les publie, suite à la divulgation de nouvelles vulnérabilités ou de nouveaux vecteurs d'attaque.
: - [Protection][34]: Bloquez temporairement ou définitivement les adresses IP des attaquants, les utilisateurs authentifiés et les requêtes suspectes signalées dans les signaux de sécurité et les traces AAP via l'interface utilisateur Datadog.

Application Performance Monitoring (APM)
: - Configuration au moment de l'exécution: Modifiez le taux d'échantillonnage des traces d'un service, l'activation de l'injection de logs et les tags d'en-tête HTTP depuis le Catalog UI, sans avoir à redémarrer le service. Lisez [Configuration au moment de l'exécution][22] pour plus d'informations.
: - [Modification à distance du taux d'échantillonnage de l'Agent][35]: Configurez à distance le Datadog Agent pour modifier ses taux d'échantillonnage de traces et définissez des règles pour adapter l'ingestion de traces de votre organisation selon vos besoins, sans avoir besoin de redémarrer votre Datadog Agent.

[Dynamic Instrumentation][36]
: - Envoyez des métriques, des traces et des logs critiques depuis vos applications en direct sans modification de code.

Workload Protection
: - Mises à jour automatiques des règles par défaut de l'Agent: recevez et mettez à jour automatiquement les règles par défaut de l'Agent maintenues par Datadog à mesure que de nouvelles détections et améliorations de l'Agent sont publiées. Consultez [Configuration de Workload Protection][3] pour plus d'informations.
: - Déploiement automatique de règles d'Agent personnalisées: déployez automatiquement vos règles d'Agent personnalisées sur les hosts désignés (tous les hosts ou un sous-ensemble défini de hosts).

Observability Pipelines
: - Déployez et mettez à jour à distance les [Observability Pipelines Workers][4] (OPW): créez et modifiez des pipelines dans l'interface utilisateur Datadog, en déployant vos modifications de configuration sur les instances OPW exécutées dans votre environnement.

[Autoscaling][47]
: - Gérez à distance les configurations de mise à l'échelle automatique des clusters et des charges de travail pour vos environnements conteneurisés. Voir [Autoscaling][47] pour plus d'informations.

Exécuteur d'actions privé
: - Exécutez des workflows et des applications Datadog qui interagissent avec des services hébergés sur votre réseau privé sans exposer vos services à l'internet public. Pour plus d'informations, consultez [Private Actions][30].

Feature Flags
: - Livrez des configurations d'indicateurs (règles de ciblage et d'affectation) aux SDK côté serveur pour une affectation synchrone des variantes basée sur le contexte d'évaluation. Voir [Feature Flags][48] pour plus d'informations.

## Considérations de sécurité {#security-considerations}

Datadog a mis en place les mécanismes suivants pour protéger la confidentialité, l'intégrité et la disponibilité des configurations récupérées et appliquées par vos composants Datadog :

- Les composants Datadog compatibles avec Remote Configuration déployés dans votre infrastructure demandent des configurations à Datadog.
  <div class="alert alert-info">Certains composants, comme les exécuteurs d'actions privés, sont toujours compatibles avec la configuration à distance. D'autres, comme les Agents, peuvent être activés ou désactivés à l'aide d'options de configuration sur disque.</div>
- Datadog n'envoie jamais de modifications de configuration, sauf si elles sont demandées par les composants Datadog. S'il envoie des modifications de configuration, Datadog n'envoie que les modifications pertinentes pour le composant demandeur.
- Les demandes de configuration sont initiées depuis votre infrastructure vers Datadog via HTTPS (port 443). Il s'agit du même port que celui utilisé par défaut par l'Agent pour envoyer des données d'observabilité.
- La communication entre vos composants Datadog et Datadog est chiffrée via HTTPS et est authentifiée et autorisée à l'aide de votre clé d'API Datadog, sauf dans le cas des exécuteurs d'actions privés où un jeton JWT est utilisé à la place.
- Seuls les utilisateurs disposant de l'autorisation [`api_keys_write`][5] sont autorisés à activer ou désactiver la fonctionnalité Remote Configuration sur les clés d'API et à utiliser les fonctionnalités de produit prises en charge.
- Vos modifications de configuration soumises via l'interface utilisateur Datadog sont signées et validées par le composant Datadog demandeur, ce qui vérifie l'intégrité de la configuration.
- Lorsque Remote Configuration est activé, les composants effectuent périodiquement un test de connectivité vers Datadog via TLS sur le port 8042/TCP. Il s'agit d'une connexion TLS brute plutôt que HTTPS. Ce test est utilisé pour le développement de protocoles ; il ne contient aucune donnée client ni aucune information permettant d'identifier le client. Cette connexion est utilisée uniquement lorsque Remote Configuration est activé et peut être bloquée en toute sécurité sans affecter les fonctionnalités.

### Accès basé sur les rôles {#role-based-access}

L'activation de Remote Configuration a un impact sur les produits suivants. Chaque produit définit un ensemble de contrôles d'accès basés sur les rôles qui doivent être accordés à ses utilisateurs. Pour des informations générales sur la gestion des accès, consultez [Access Control][37].

 | Produit compatible avec Remote Configuration   | Contrôles d'accès basés sur les rôles                                                                                                                                                                                                                                                                     |
 |----------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
 | Fleet Automation                       | `FLEET_POLICIES_WRITE`<br>`AGENT_UPGRADE_WRITE`<br>`FLEET_FLARE`<br><br>Pour plus d'informations, consultez [Fleet Automation][38].                                                                                                                                                                      |
 | App and API Protection                 | `APPSEC_ACTIVATION_READ`<br>`APPSEC_ACTIVATION_WRITE`<br>`APPSEC_PROTECT_READ`<br>`APPSEC_PROTECT_WRITE`<br><br>Pour plus d'informations, consultez [Access Control][39].                                                                                                                                |
 | APM                                    | `APM_SERVICE_INGEST_READ`<br>`APM_SERVICE_INGEST_WRITE`<br>`APM_REMOTE_CONFIGURATION_READ`<br>`APM_REMOTE_CONFIGURATION_WRITE`<br><br>Pour plus d'informations, consultez [Adaptive Sampling][40].                                                                                                       |
 | Dynamic Instrumentation                | `DEBUGGER_READ`<br>`DEBUGGER_WRITE`<br>`DEBUGGER_WRITE_PRE_PROD`<br>`APM_REMOTE_CONFIGURATION_READ`<br>`APM_REMOTE_CONFIGURATION_WRITE`<br><br>Pour plus d'informations, consultez [APM][41].                                                                                                            |
 | Workload Protection                    | `SECURITY_MONITORING_CWS_AGENT_RULES_WRITE`<br>`SECURITY_MONITORING_CWS_AGENT_RULES_READ`<br>`SECURITY_MONITORING_CWS_AGENT_RULES_ACTIONS`<br><br>Pour plus d'informations, consultez [Security][42].                                                                                                    |
 | CSM Side Scanning                      | `ORG_MANAGEMENT`<br>`MANAGE_INTEGRATIONS`<br><br> Pour plus d'informations, consultez [Activer Agentless Scanning][43].                                                                                                                                                                                   |
 | Observability Pipelines                | `OBSERVABILITY_PIPELINES_READ`<br>`OBSERVABILITY_PIPELINES_WRITE`<br>`OBSERVABILITY_PIPELINES_DELETE`<br>`OBSERVABILITY_PIPELINES_DEPLOY`<br>`OBSERVABILITY_PIPELINES_CAPTURE_WRITE`<br>`OBSERVABILITY_PIPELINES_CAPTURE_READ`<br><br>Pour plus d'informations, consultez [Observability Pipelines][44]. |
 | Private Action Runner                  | `ON_PREM_RUNNER_WRITE`<br>`ON_PREM_RUNNER_READ`<br>`ON_PREM_RUNNER_USE`<br><br>Pour plus d'informations, consultez [App Builder & Workflow Automation][45].                                                                                                                                              |
 | Network Device Monitoring (NDM)        | `NDM_DEVICE_PROFILES_VIEW`<br>`NDM_DEVICE_PROFILES_EDIT`                                                                                                                                                                                                                                       |
 | Autoscaling de conteneurs                  | `ORCHESTRATION_AUTOSCALING_MANAGE`<br>`ORCHESTRATION_WORKLOAD_SCALING_WRITE`<br>`ORCHESTRATION_WORKLOAD_SCALING_READ`                                                                                                                                                                          |
 | Auto-instrumentation Lambda sans serveur | `SERVERLESS_AWS_INSTRUMENTATION_READ`<br>`SERVERLESS_AWS_INSTRUMENTATION_WRITE`<br><br>Pour plus d'informations, consultez [Serverless][46].                                                                                                                                                             |
 | Feature Flags                          | `FEATURE_FLAG_CONFIG_READ`<br>`FEATURE_FLAG_CONFIG_WRITE`<br>`FEATURE_FLAG_ENVIRONMENT_CONFIG_READ`<br>`FEATURE_FLAG_ENVIRONMENT_CONFIG_WRITE`<br><br>Pour plus d'informations, consultez [Feature Flags][48].                                                                                           |

## Activer Remote Configuration {#enable-remote-configuration}

Dans la plupart des cas, Remote Configuration est activé par défaut pour votre organisation. Vous pouvez vérifier si Remote Configuration est activé pour votre organisation depuis la page des paramètres [Remote Configuration][8].
{{< site-region region="gov,gov2" >}}
**Remarque** : Sur US1-FED et US2-FED, Remote Configuration n'est pas activée par défaut.
{{< /site-region >}}
Pour activer Remote Configuration :
1. Assurez-vous que vos autorisations RBAC incluent [`org_management`][7], afin de pouvoir activer Remote Configuration pour votre organisation.
1. Depuis votre page {{< ui >}}Organization Settings{{< /ui >}}, activez [Remote Configuration][8]. Cela permet aux composants Datadog de votre organisation de recevoir des configurations de la part de Datadog.
1. Suivez les instructions de [configuration spécifiques au produit](#product-specific-configuration) ci-dessous pour terminer la configuration de Remote Configuration.

### Configuration spécifique au produit : {#product-specific-configuration}

Consultez la documentation ci-dessous pour obtenir des instructions spécifiques au produit que vous configurez.

| Produit | Instructions de configuration |
|-------------------------|----------------------------------------------------------------------------------------------------------------|
| Fleet Automation | [Configurer Fleet Automation][31] |
| App and API protection (AAP) | [Configuration d'App and API protection ][33] |
| APM | [Configuration au moment de l'exécution ](/tracing/guide/remote_config/)                                                      |
| Dynamic Instrumentation | [Dynamic Instrumentation][11] |
| Workload Protection     | [Workload Protection][3]                                                                                       |
| Observability Pipelines | Assurez-vous d'avoir [activé Remote Configuration sur la clé d'API][32] que vous utilisez pour Observability Pipelines. |
| Sensitive Data Scanner | [Stockage cloud ](/security/sensitive_data_scanner/setup/cloud_storage/?tab=newawsaccount)                       |
| Private Action Runner | [Présentation des Private Actions ](/actions/private_actions/)                                                          |
| Feature Flags | [Feature Flags côté serveur ](/feature_flags/server/)                                                            |

## Bonnes pratiques {#best-practices}

### Datadog Audit Trail {#datadog-audit-trail}

Utilisez [Datadog Audit Trail][13] pour surveiller l'accès à l'organisation et les événements d'activation de Remote Configuration. Audit Trail permet à vos administrateurs et équipes de sécurité de suivre la création, la suppression et la modification des clés d'API et d'application Datadog. Une fois Audit Trail configuré, vous pouvez consulter les événements liés aux fonctionnalités activées par Remote Configuration et savoir qui a demandé ces modifications. Audit Trail vous permet de reconstruire des séquences d'événements et d'établir une surveillance Datadog robuste pour Remote Configuration.

### Monitors {#monitors}

Configurez des [monitors][14] pour recevoir des notifications lorsqu'un événement intéressant se produit.

## Désactivation de Remote Configuration : {#opting-out-of-remote-configuration}

Au lieu de désactiver Remote Configuration globalement, Datadog recommande de la désactiver pour des produits Datadog spécifiques. Pour plus d'informations, consultez [la documentation du produit concerné](#product-specific-configuration).

## Pour aller plus loin {#further-reading}

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
[11]: /fr/tracing/trace_collection/dynamic_instrumentation
[12]: /fr/security/application_security/how-appsec-works/#built-in-protection
[13]: /fr/account_management/audit_trail
[14]: /fr/monitors/
[15]: /fr/help/
[16]: /fr/remote_configuration
[17]: /fr/agent/configuration/network
[18]: /fr/agent/configuration/proxy/
[19]: /fr/internal_developer_portal/catalog/
[21]: /fr/agent/configuration/agent-configuration-files/?tab=agentv6v7#agent-main-configuration-file
[22]: /fr/tracing/trace_collection/runtime_config/
[23]: /fr/remote_configuration#opting-out-of-remote-configuration
[24]: https://app.datadoghq.com/organization-settings/api-keys
[25]: /fr/agent/guide/
[26]: https://app.datadoghq.com/organization-settings/remote-config/setup?page_id=org-enablement-step
[27]: /fr/agent/fleet_automation/fleet_view/#send-a-remote-flare
[28]: /fr/security/sensitive_data_scanner/?tab=usingtheagent
[29]: /fr/agent/fleet_automation/upgrade_agents/
[30]: /fr/actions/private_actions/
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