---
aliases:
- /fr/account_management/org_settings/sensitive_data_detection
- /fr/sensitive_data_scanner/
description: Découvrez, classifiez et, en option, masquez les données sensibles telles
  que les PII, les identifiants et les numéros de carte de crédit dans les logs Datadog,
  les spans APM, les événements RUM, les traces Agent Observability, les événements
  et les buckets Amazon S3 avec Sensitive Data Scanner.
disable_toc: false
further_reading:
- link: /security/sensitive_data_scanner/setup/telemetry_data
  tag: Documentation
  text: Configurez Sensitive Data Scanner pour les données de télémétrie.
- link: /security/sensitive_data_scanner/setup/cloud_storage
  tag: Documentation
  text: Configurer le Sensitive Data Scanner pour Cloud Storage
- link: /data_security/
  tag: Documentation
  text: Réduction des risques liés aux données
- link: https://www.datadoghq.com/blog/scaling-sensitive-data-scanner/
  tag: Blog
  text: Découvrez, triez et remédiez aux problèmes de données sensibles à grande échelle
    avec Sensitive Data Scanner
- link: https://www.datadoghq.com/blog/sensitive-data-scanner/
  tag: Blog
  text: Créer une stratégie de conformité des données moderne avec la solution Sensitive
    Data Scanner de Datadog
- link: https://www.datadoghq.com/blog/sensitive-data-management-best-practices/
  tag: Blog
  text: Meilleures pratiques en matière de gestion des données sensibles
- link: https://www.datadoghq.com/blog/data-security/
  tag: Blog
  text: Découvrez des données sensibles dans vos magasins de données cloud avec Data
    Security
- link: https://www.datadoghq.com/blog/hipaa-compliance-sensitive-data-scanner/
  tag: Blog
  text: Comment les entreprises soumises aux exigences HIPAA gèrent les données sensibles
    avec Datadog
- link: https://www.datadoghq.com/blog/sds-dlp-for-financial-service-companies/
  tag: Blog
  text: Comment les entreprises de services financiers découvrent, classifient et
    gèrent les données sensibles avec Datadog
- link: https://www.datadoghq.com/blog/sds-for-insurance-companies/
  tag: Blog
  text: Comment les compagnies d'assurance découvrent, classifient et agissent sur
    les risques liés aux données sensibles avec Datadog
- link: https://www.datadoghq.com/blog/llm-aws-strands
  tag: Blog
  text: Obtenez une visibilité sur les workflows des Agents Strands avec Datadog LLM
    Observability.
- link: https://www.datadoghq.com/blog/observability-pipelines-mssp
  tag: Blog
  text: Simplifiez la collecte et l'agrégation des logs pour les MSSP avec Datadog
    Observability Pipelines
- link: https://www.datadoghq.com/blog/datadog-cloud-security-compliance
  tag: Blog
  text: Mettez à l'échelle la conformité à travers des cadres mondiaux avec Datadog
    Cloud Security
title: Sensitive Data Scanner
---
## Présentation {#overview}

Les données sensibles, telles que les numéros de carte de crédit, les clé d'API, les adresses IP et les informations personnellement identifiables (PII), sont souvent divulguées involontairement, ce qui peut exposer votre organisation à des risques de sécurité et de conformité. Les données sensibles peuvent être trouvées dans :
 
- APM spans
- Dépôts de code
- Événements issus de Event Management
- Traces Agent Observability
- Événements RUM
- Données de télémétrie, telles que les logs d'application

Des données sensibles peuvent également être déplacées involontairement vers des ressources de stockage cloud lorsque les équipes d'ingénierie migrent leurs charges de travail vers le cloud. Le Sensitive Data Scanner de Datadog peut aider à prévenir les fuites de données sensibles et à limiter les risques de non-conformité en découvrant, classifiant et, en option, masquant les données sensibles.

**Remarque** : Les outils et politiques de Datadog sont conformes à la norme PCI v4.0. Pour plus d'informations, consultez [PCI DSS Compliance][1].

## Sources de données prises en charge {#supported-data-sources}

Sensitive Data Scanner analyse les données de télémétrie (logs, spans APM, événements RUM et événements), les traces Agent Observability, le stockage cloud et les dépôts de code.

L'action que vous pouvez appliquer aux données sensibles détectées dépend de la source de données. Le tableau suivant indique quelles actions d'obfuscation sont prises en charge pour chaque source de télémétrie et pour l'Agent Observability:

| Action           | Logs | APM | RUM | Événements | Agent Observability |
|------------------|------|-----|-----|--------|---------------------|
| Masquer           | Oui  | Oui | Oui | Oui    | Oui                 |
| Masquer partiellement | Oui  | Oui | Oui | Oui    | Oui                 |
| Hachage             | Oui  | Oui | Oui | Oui    | Oui                 |
| Masquer             | Oui  | Oui | Oui | Non     | Non                  |

<div class="alert alert-info">Pour le stockage cloud et les dépôts de code (Secret Scanning), Sensitive Data Scanner peut détecter des données sensibles mais ne peut pas leur appliquer d'actions d'obfuscation.</div>

### Données de télémétrie {#telemetry-data}

{{< img src="sensitive_data_scanner/telemetry_data_issues.png" alt="Cinq résultats sensibles différents détectés, dont deux ont une priorité critique, un a une priorité moyenne et deux sont des informations." style="width:100%;" >}}

Sensitive Data Scanner peut analyser vos données [dans le cloud](#in-the-cloud) ou [au sein de votre environnement](#in-your-environment).

#### Dans le cloud {#in-the-cloud}

Avec Sensitive Data Scanner dans le cloud, vous soumettez des logs et des événements au backend Datadog, de sorte que les données quittent votre environnement avant d'être masquées. Les logs et les événements sont analysés et masqués dans le backend Datadog lors du traitement, de sorte que les données sensibles sont masquées avant que les événements ne soient indexés et affichés dans l'interface utilisateur de Datadog.

Les données pouvant être analysées et masquées sont :

- **Logs** : tout contenu de log structuré et non structuré, y compris les messages de log et les valeurs d'attributs
- **APM** : valeurs d'attributs de span uniquement
- **RUM** : valeurs d'attributs d'événement uniquement
- **Events** : valeurs d'attributs d'événement uniquement

Il est possible de définir des taux d'échantillonnage entre 10 % et 99 % pour chaque produit. Cela permet de gérer les coûts lors de la prise en main en réduisant la quantité de données analysées à la recherche d'informations sensibles.

Pour chaque [règle d'analyse][17], l'une des actions suivantes peut être appliquée aux données sensibles correspondantes :

- **Masquer** : remplacez l'intégralité des données détectées par un jeton de votre choix, tel que `[sensitive_data]`.
- **Masquage partiel** : remplacez une partie spécifique de toutes les valeurs correspondantes.
- **Hachage** : remplacez l'intégralité des données détectées par un identifiant unique non réversible.
- **Mask** (disponible pour les logs, les spans APM et les événements RUM) : obfusquez toutes les valeurs correspondantes. Les utilisateurs disposant de l'autorisation `Data Scanner Unmask` peuvent dés-obfusquer (démasquer) et consulter ces données dans Datadog. Consultez [Action de masquage][16] pour plus d'informations.

**Remarque** : lors de l'analyse de données échantillonnées, vous ne pourrez pas sélectionner d'actions qui masquent les données analysées.

Pour utiliser Sensitive Data Scanner, configurez un groupe d'analyse afin de définir les données à analyser, puis configurez des règles d'analyse pour déterminer quelles informations sensibles doivent être détectées dans les données. Pour les règles d'analyse, vous pouvez :
- Ajouter des règles d'analyse prédéfinies à partir de la [bibliothèque de règles d'analyse][2] de Datadog. Ces règles détectent les modèles courants tels que les adresses e-mail, les numéros de carte de crédit, les clé d'API, les jetons d'autorisation, les informations réseau et sur les appareils, et plus encore.
- [Créez vos propres règles à l'aide de modèles regex][3].

Consultez [Configurer le Sensitive Data Scanner pour les données de télémétrie][4] pour plus de détails sur la configuration.

#### Au sein de votre environnement {#in-your-environment}

Utilisez [Observability Pipelines][5] pour collecter et traiter vos logs au sein de votre environnement, puis acheminez les données vers leurs intégrations en aval. Lorsque vous configurez un pipeline dans Observability Pipelines, ajoutez le [processeur Sensitive Data Scanner][6] pour masquer les données sensibles dans vos logs avant qu'elles ne quittent vos locaux. Vous pouvez ajouter des règles d'analyse prédéfinies à partir de la bibliothèque de règles, telles que des adresses e-mail, des numéros de carte de crédit, de clé d'API, des jetons d'autorisation, des adresses IP, et plus encore. Vous pouvez également créer vos propres règles à l'aide de modèles regex.

Consultez [Configurer des pipelines][7] pour plus d'informations.

### Agent Observability {#agent-observability}

Sensitive Data Scanner peut analyser les traces [Agent Observability][20], y compris les entrées et sorties des applications LLM. Cela permet d'éviter l'exposition de données sensibles telles que des PII, de clé d'API ou des informations propriétaires dans les invites, les complétions et les métadonnées de workflow LLM.

Le scan Agent Observability utilise un modèle de configuration géré qui diffère de l'analyse des données de télémétrie, où Agent Observability dispose de :

- **Un groupe d'analyse géré** : un groupe d'analyse par défaut est automatiquement créé pour votre organisation lors de votre premier accès à la [page des paramètres Agent Observability][18]. Vous ne pouvez pas créer de groupes d'analyse supplémentaires ni supprimer le groupe géré.
- **Règles personnalisables** : vous pouvez modifier les règles existantes, désactiver les règles dont vous n'avez pas besoin ou ajouter des règles d'analyse personnalisées pour détecter des modèles de données sensibles supplémentaires.

Pour chaque règle d'analyse, l'une des actions suivantes peut être appliquée aux données sensibles détectées :

- **Masquer** : remplacez l'intégralité des données détectées par un jeton de votre choix, tel que `[sensitive_data]`.
- **Masquage partiel** : remplacez une partie spécifique de toutes les valeurs correspondantes.
- **Hachage** : remplacez l'intégralité des données détectées par un identifiant unique non réversible.

Pour configurer l'analyse des données d'Agent Observability, accédez à la [page des paramètres d'Agent Observability][18] dans les paramètres du Sensitive Data Scanner. Pour plus d'informations sur l'Agent Observability, consultez la [documentation sur l'observabilité des agents][20].

### Stockage cloud {#cloud-storage}

{{< img src="sensitive_data_scanner/cloud_storage_issues.png" alt="Section du magasin de données de la page Findings avec trois résultats Amazon S3" style="width:100%;" >}}

Si le Sensitive Data Scanner est activé, vous pouvez cataloguer et classer les données sensibles dans vos compartiments Amazon S3. **Remarque** : Sensitive Data Scanner ne masque pas les données sensibles dans vos ressources de stockage cloud.

Le Sensitive Data Scanner recherche les données sensibles en déployant des [scanners Agentless][8] dans vos environnements cloud. Ces instances d'analyse récupèrent une liste de tous les buckets S3 via [Remote Configuration][9], et ont défini des instructions pour analyser les fichiers texte—tels que les CSV et les JSON au fil du temps.

Le Sensitive Data Scanner exploite l'intégralité de sa [bibliothèque de règles][10] pour trouver des correspondances. Lorsqu'une correspondance est trouvée, l'emplacement de la correspondance est envoyé à Datadog par l'instance d'analyse. **Remarque** : Les magasins de données et leurs fichiers sont uniquement lus dans votre environnement—aucune donnée sensible analysée n'est renvoyée à Datadog.

En plus d'afficher les correspondances de données sensibles, le Sensitive Data Scanner fait apparaître tout problème de sécurité détecté par [Cloud Security][11] affectant les magasins de données sensibles. Vous pouvez cliquer sur n'importe quel problème pour poursuivre le tri et la remédiation dans Cloud Security.

Consultez [Configurer le Sensitive Data Scanner pour le stockage cloud][12] pour plus de détails sur la configuration.

### Dépôts de code {#code-repositories}

Datadog [Secret Scanning][21] analyse les dépôts de code pour détecter les secrets exposés dans le code source. Le Secret Scanning est alimenté par le Sensitive Data Scanner et utilise toutes les règles de la [catégorie Secrets et identifiants][19] de la bibliothèque SDS pour trouver des correspondances.

Contrairement à l'analyse des données de télémétrie, Secret Scanning fonctionne dans vos pipelines CI/CD ou directement dans Datadog avec une analyse hébergée (prise en charge pour GitHub, Azure DevOps et GitLab). Lorsque des secrets sont détectés dans le code, les résultats sont affichés dans l'interface de Code Security.

Consultez la [documentation Secret Scanning][21] pour les détails de configuration.

## Fonctionnalités clés {#key-capabilities}

### Examinez les résultats de données sensibles {#investigate-sensitive-data-findings}

{{< img src="sensitive_data_scanner/sds_findings_explorer.png" alt="Sensitive Data Scanner Findings Explorer regroupé par règle, avec la règle US Passport Scanner développée pour afficher les résultats critiques, le nombre de correspondances et les graphiques de tendance hebdomadaires." style="width:100%;" >}}

Utilisez la [page Findings][13] pour voir les détails des résultats de données sensibles identifiés par vos règles d'analyse. Ces détails incluent :

- La règle d'analyse spécifique qui a détecté les correspondances, afin que vous puissiez déterminer quelles règles modifier si nécessaire.
- Le groupe d'analyse dans lequel le résultat s'est produit, afin que vous puissiez déterminer le rayon d'impact de toute fuite.
- Le nombre d'événements associés au résultat pour vous aider à mesurer son ampleur et sa gravité.
- Un graphique des événements associés au résultat pour vous aider à déterminer quand il a débuté et à suivre son évolution.
- Cas associés créés pour le résultat.

Consultez [Investigate Sensitive Data Findings][14] pour plus d'informations sur le tri des données sensibles à l'aide de la page Findings.

### Créez des alertes pour les données sensibles {#create-alerts-for-sensitive-data}

Utilisez des alertes pour avertir les équipes lorsque Sensitive Data Scanner détecte des données sensibles. Le workflow d'alerte disponible dépend du type de données :

- **Logs** : Créez une règle de notification de sécurité à partir de la page Findings ou du panneau latéral des résultats. Les règles de notification peuvent correspondre aux résultats du Sensitive Data Scanner par gravité, service, environnement, équipe, règle d'analyse et autres attributs de résultat. Les notifications incluent le contexte du résultat et un lien vers celui-ci, mais n'incluent pas d'échantillons de logs.
- **APM et RUM** : Créez des monitors basés sur les tags que le Sensitive Data Scanner ajoute lorsqu'il détecte des correspondances, tels que `sensitive_data:*` ou `sensitive_data_category:*`.

Consultez [Créer des alertes pour les données sensibles][22] pour les instructions de configuration.

### Examinez les tendances des données sensibles {#review-sensitive-data-trends}

{{<img src="sensitive_data_scanner/sdslight.png" alt="Dashboard Sensitive Data Scanner Overview" style="width:80%;">}}

Lorsque le Sensitive Data Scanner est activé, un [dashboard prêt à l'emploi][15] résumant les résultats des données sensibles est automatiquement installé dans votre compte. Pour accéder à ce dashboard, accédez à {{< ui >}}Dashboards{{< /ui >}} > {{< ui >}}Dashboards List{{< /ui >}} et recherchez « Sensitive Data Scanner Overview ».

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/data_security/pci_compliance/
[2]: /fr/security/sensitive_data_scanner/scanning_rules/library_rules/
[3]: /fr/security/sensitive_data_scanner/scanning_rules/custom_rules/
[4]: /fr/security/sensitive_data_scanner/setup/telemetry_data/
[5]: /fr/observability_pipelines/
[6]: /fr/observability_pipelines/processors/sensitive_data_scanner
[7]: /fr/observability_pipelines/configuration/set_up_pipelines/
[8]: /fr/security/cloud_security_management/setup/agentless_scanning
[9]: /fr/remote_configuration
[10]: /fr/security/sensitive_data_scanner/scanning_rules/library_rules/
[11]: /fr/security/cloud_security_management
[12]: /fr/security/sensitive_data_scanner/setup/cloud_storage/
[13]: https://app.datadoghq.com/organization-settings/sensitive-data-scanner
[14]: /fr/security/sensitive_data_scanner/guide/investigate_sensitive_data_findings/
[15]: https://app.datadoghq.com/dash/integration/sensitive_data_scanner
[16]: /fr/security/sensitive_data_scanner/setup/telemetry_data/?tab=logs#mask-action
[17]: /fr/security/sensitive_data_scanner/scanning_rules/
[18]: https://app.datadoghq.com/sensitive-data-scanner/configuration/llm-spans
[19]: /fr/security/sensitive_data_scanner/scanning_rules/library_rules/?category=Secrets+and+credentials#overview
[20]: /fr/llm_observability/
[21]: /fr/security/code_security/secret_scanning/
[22]: /fr/security/sensitive_data_scanner/guide/create-alerts-for-sensitive-data/