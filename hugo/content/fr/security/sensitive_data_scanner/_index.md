---
aliases:
- /fr/account_management/org_settings/sensitive_data_detection
- /fr/sensitive_data_scanner/
disable_toc: false
further_reading:
- link: /security/sensitive_data_scanner/setup/telemetry_data
  tag: Documentation
  text: Configurer le Scanner de Données Sensibles pour les Données de Télémétrie
- link: /security/sensitive_data_scanner/setup/cloud_storage
  tag: Documentation
  text: Configurer le Scanner de Données Sensibles pour le stockage cloud
- link: coterm
  tag: Documentation
  text: 'CoTerm : Surveiller les sessions de terminal et les activités sensibles sur
    les systèmes locaux et distants'
- link: /data_security/
  tag: Documentation
  text: Réduire les risques liés aux données
- link: https://www.datadoghq.com/blog/scaling-sensitive-data-scanner/
  tag: Blog
  text: Découvrir, trier et remédier aux problèmes de données sensibles à grande échelle
    avec le Scanner de Données Sensibles
- link: https://www.datadoghq.com/blog/sensitive-data-scanner/
  tag: Blog
  text: Créer une stratégie de conformité des données moderne avec la solution scanner
    de données sensibles de Datadog
- link: https://www.datadoghq.com/blog/sensitive-data-management-best-practices/
  tag: Blog
  text: Meilleures pratiques en matière de gestion des données sensibles
- link: https://www.datadoghq.com/blog/data-security/
  tag: Blog
  text: Découvrir des données sensibles dans vos magasins de données cloud avec la
    Sécurité des Données
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
  text: Obtenez de la visibilité sur les flux de travail des Agents Strands avec l'Observabilité
    LLM de Datadog
- link: https://www.datadoghq.com/blog/observability-pipelines-mssp
  tag: Blog
  text: Simplifiez la collecte et l'agrégation des journaux pour les MSSP avec les
    Pipelines d'Observabilité de Datadog
- link: https://www.datadoghq.com/blog/datadog-cloud-security-compliance
  tag: Blog
  text: Optimisez la conformité à l'échelle mondiale avec Datadog Cloud Security
title: Scanner de données sensibles
---
## Aperçu {#overview}

Les données sensibles, telles que les numéros de carte de crédit, les clés API, les adresses IP et les informations personnellement identifiables (PII), sont souvent divulguées involontairement, ce qui peut exposer votre organisation à des risques de sécurité et de conformité. Des données sensibles peuvent être trouvées dans :
 
- APM spans
- Dépôts de code
- Événements d’Event Management<p-? />
- Traces d'Observabilité LLM
- Événements RUM
- Données de télémétrie, telles que les journaux d'application

Les données sensibles peuvent également être déplacées involontairement vers des ressources de stockage cloud lorsque les équipes d'ingénierie déplacent leurs charges de travail vers le cloud. Le Scanner de Données Sensibles de Datadog peut aider à prévenir les fuites de données sensibles et à limiter les risques de non-conformité en découvrant, classifiant et, optionnellement, en masquant les données sensibles.

**Remarque** : Les outils et politiques de Datadog sont conformes à la norme PCI v4.0. Pour plus d'informations, voir [Conformité PCI DSS][1].

## Scanner les données de télémétrie {#scan-telemetry-data}

{{< img src="sensitive_data_scanner/telemetry_data_issues.png" alt="Cinq résultats sensibles détectés, dont deux avec une priorité critique, un avec une priorité moyenne et deux de niveau info." style="width:100%;" >}}

Le Scanner de Données Sensibles peut scanner vos données [dans le cloud](#in-the-cloud) ou [dans votre environnement](#in-your-environment).

### Dans le cloud  {#in-the-cloud}

Avec le Scanner de Données Sensibles dans le Cloud, vous soumettez des journaux et des événements au backend de Datadog, de sorte que les données quittent votre environnement avant d'être masquées. Les journaux et événements sont scannés et masqués dans le backend de Datadog pendant le traitement, de sorte que les données sensibles sont masquées avant que les événements ne soient indexés et affichés dans l'interface utilisateur de Datadog.

Les données qui peuvent être scannées et masquées sont :

- **Journaux** : Tout le contenu de journal structuré et non structuré, y compris les messages de journal et les valeurs d'attributs
- **APM** : Valeurs d'attributs de span uniquement
- **RUM** : Valeurs d'attributs d'événement uniquement
- **Événements** : Valeurs d'attributs d'événements uniquement

Optionnellement, des taux d'échantillonnage peuvent être définis entre 10 % et 99 % pour chaque produit. Cela aide à gérer les coûts lorsque vous commencez, en réduisant la quantité de données qui sont scannées pour des informations sensibles.

Pour chaque [règle d'analyse][17], l'une des actions suivantes peut être appliquée aux données sensibles correspondantes :

- **Masquer** : Remplacer l'ensemble des données correspondantes par un seul jeton de votre choix, tel que `[sensitive_data]`.
- **Masquer partiellement** : Remplacer une portion spécifique de toutes les valeurs correspondantes.
- **Hash** : Remplacer l'ensemble des données correspondantes par un identifiant unique non réversible.
- **Masque** (disponible uniquement pour les journaux) : Obscurcissez toutes les valeurs correspondantes. Les utilisateurs disposant de la permission `Data Scanner Unmask` peuvent dé-obscurcir (démasquer) et consulter ces données dans Datadog. Voir [Action de masquage][16] pour plus d'informations.

**Remarque** : Lors de l'analyse des données échantillonnées, vous ne pourrez pas sélectionner des actions qui obscurcissent les données qu'elles analysent.

Pour utiliser le Scanner de Données Sensibles, configurez un groupe d'analyse pour définir les données à analyser, puis établissez des règles d'analyse pour identifier les informations sensibles. Pour les règles d'analyse, vous pouvez :
- Ajouter des règles d'analyse prédéfinies de la [Bibliothèque de Règles d'Analyse][2] de Datadog. Ces règles détectent des modèles courants tels que les adresses e-mail, les numéros de carte de crédit, les clés API, les jetons d'autorisation, les informations sur le réseau et les appareils, et plus encore.
- [Créez vos propres règles en utilisant des motifs regex][3].

Voir [Configurer le Scanner de Données Sensibles pour les Données de Télémétrie][4] pour les détails de configuration.

### Dans votre environnement {#in-your-environment}

Utilisez [Pipelines d'Observabilité][5] pour collecter et traiter vos journaux dans votre environnement, puis dirigez les données vers leurs intégrations en aval. Lorsque vous configurez un pipeline dans les Pipelines d'Observabilité, ajoutez le [processeur de Scanner de Données Sensibles][6] pour masquer les données sensibles dans vos journaux avant qu'elles ne quittent vos locaux. Vous pouvez ajouter des règles d'analyse prédéfinies de la Bibliothèque de Règles, telles que les adresses e-mail, les numéros de carte de crédit, les clés API, les jetons d'autorisation, les adresses IP, et plus encore. Vous pouvez également créer vos propres règles en utilisant des motifs regex.

Voir [Configurer les Pipelines][7] pour plus d'informations.

## Analyser les données d'Observabilité LLM {#scan-llm-observability-data}

Le Scanner de Données Sensibles peut analyser les traces [Datadog LLM Observability][20], y compris les entrées et sorties des applications LLM. Cela aide à prévenir l'exposition de données sensibles telles que les informations personnelles identifiables (PII), les clés API ou les informations propriétaires dans les invites, les complétions et les métadonnées des flux de travail LLM.

La numérisation de l'observabilité LLM utilise un modèle de configuration géré qui diffère de la numérisation des données de télémétrie, où la numérisation de l'observabilité LLM a :

- **Un groupe de numérisation géré** : Un groupe de numérisation par défaut est automatiquement créé pour votre organisation lorsque vous accédez pour la première fois à la [page des paramètres d'observabilité LLM][18]. Vous ne pouvez pas créer de groupes de numérisation supplémentaires ni supprimer le groupe géré.
- **Règles personnalisables** : Vous pouvez modifier les règles existantes, désactiver les règles dont vous n'avez pas besoin ou ajouter des règles de numérisation personnalisées pour détecter des modèles de données sensibles supplémentaires.

Pour chaque règle de numérisation, l'une des actions suivantes peut être appliquée aux données sensibles correspondantes :

- **Masquer** : Remplacer l'ensemble des données correspondantes par un seul jeton de votre choix, tel que `[sensitive_data]`.
- **Masquer partiellement** : Remplacer une portion spécifique de toutes les valeurs correspondantes.
- **Hash** : Remplacer l'ensemble des données correspondantes par un identifiant unique non réversible.

Pour configurer la numérisation des données d'observabilité LLM, accédez à la [page des paramètres d'observabilité LLM][18] dans les paramètres du scanner de données sensibles. Pour plus d'informations sur l'observabilité LLM, consultez la [documentation sur l'observabilité LLM][20].

## Numériser le stockage cloud {#scan-cloud-storage}

{{< callout url="https://www.datadoghq.com/product-preview/data-security" >}}
  Le support de numérisation pour les buckets Amazon S3 et les instances RDS est en avant-première. Pour vous inscrire, cliquez sur <strong>Demander l'accès</strong>.
{{< /callout >}}

{{< img src="sensitive_data_scanner/cloud_storage_issues.png" alt="La section du datastore de la page des résultats comportant trois findings Amazon S3." style="width:100%;" >}}

Si vous avez activé le scanner de données sensibles, vous pouvez cataloguer et classer les données sensibles dans vos buckets Amazon S3. **Remarque** : Le scanner de données sensibles ne masque pas les données sensibles dans vos ressources de stockage cloud.

Le scanner de données sensibles recherche des données sensibles en déployant des [scanners sans agent][8] dans vos environnements cloud. Ces instances de numérisation récupèrent une liste de tous les buckets S3 via [Configuration à distance][9], et ont des instructions définies pour numériser des fichiers texte, tels que des CSV et des JSON au fil du temps.

Le scanner de données sensibles utilise sa [bibliothèque complète de règles][10] pour trouver des correspondances. Lorsqu'une correspondance est trouvée, l'emplacement de la correspondance est envoyé à Datadog par l'instance de numérisation. **Remarque** : Les magasins de données et leurs fichiers ne sont lus que dans votre environnement ; aucune donnée sensible scannée n'est renvoyée à Datadog.

En plus d'afficher les correspondances de données sensibles, le Scanner de données sensibles met en évidence tout problème de sécurité détecté par [Cloud Security][11] affectant les magasins de données sensibles. Vous pouvez cliquer sur tout problème pour continuer le triage et la remédiation dans Cloud Security.

Voir [Configurer le Scanner de données sensibles pour le stockage Cloud][12] pour les détails de configuration.

## Scanner les dépôts de code {#scan-code-repositories}

Datadog [Secret Scanning][21] scanne les dépôts de code pour détecter les secrets exposés dans le code source. Secret Scanning est alimenté par Sensitive Data Scanner et utilise toutes les règles de la [Secrets and credentials category][19] de la bibliothèque SDS pour trouver des correspondances.

Contrairement au scan des données de télémétrie, Secret Scanning fonctionne dans vos pipelines CI/CD ou directement dans Datadog avec un scan hébergé (pris en charge pour GitHub, Azure DevOps et GitLab). Lorsque des secrets sont détectés dans le code, les résultats sont affichés dans l'interface Code Security.

Voir la [Secret Scanning documentation][21] pour les détails de configuration.

## Enquêtez sur les résultats des données sensibles {#investigate-sensitive-data-findings}

{{< img src="sensitive_data_scanner/findings_20251014.png" alt="La Findings page affichant un aperçu des résultats sensibles classés par priorité." style="width:100%;" >}}

Utilisez la [Findings page][13] pour consulter les détails des résultats de données sensibles identifiés par vos règles de scan. Ces détails incluent :

- La règle de scan spécifique qui a détecté les correspondances, afin que vous puissiez déterminer quelles règles modifier si nécessaire.
- Le groupe de scan dans lequel le résultat est apparu, afin que vous puissiez déterminer le blast radius de toute fuite.
- Le nombre d'événements associés au résultat pour vous aider à évaluer son ampleur et sa gravité.
- Un graphique des événements associés au résultat pour vous aider à identifier quand un résultat a commencé et voir comment il a évolué.
- Des cas connexes créés pour le résultat.

Voir [Investigate Sensitive Data Findings][14] pour plus d'informations sur le triage des données sensibles à l'aide de la Findings page.

## Examinez les tendances des données sensibles {#review-sensitive-data-trends}

{{<img src="sensitive_data_scanner/sdslight.png" alt="Sensitive Data Scanner Overview dashboard" style="width:80%;">}}

Lorsque Sensitive Data Scanner est activé, un [out-of-the-box dashboard][15] résumant les résultats des données sensibles est automatiquement installé dans votre compte. Pour accéder à ce dashboard, naviguez vers **Dashboards** > **Dashboards List** et recherchez "Sensitive Data Scanner Overview".

## Lectures complémentaires {#further-reading}

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