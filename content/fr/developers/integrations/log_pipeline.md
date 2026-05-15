---
aliases:
- /fr/logs/faq/partner_log_integration
- /fr/developers/integrations/log_integration/
description: Découvrez comment créer un pipeline d'intégration de logs Datadog.
further_reading:
- link: /integrations/#cat-log-collection
  tag: Documentation
  text: Voir les intégrations de logs Datadog déjà disponibles
- link: /logs/explorer/facets/
  tag: Documentation
  text: En savoir plus sur les facettes de logs
- link: /logs/explorer/
  tag: Documentation
  text: En savoir plus sur le Log Explorer
- link: /logs/log_configuration/pipelines/
  tag: Documentation
  text: En savoir plus sur les pipelines de logs
title: Créer un pipeline de log
---
## Présentation

Les pipelines de logs analysent, filtrent et enrichissent les logs entrants pour les rendre consultables et exploitables dans Datadog. Pour les Technology Partners, les pipelines de logs garantissent que leurs logs sont transmis dans un format structuré et pertinent, prêts à l'emploi. Pour les utilisateurs finaux, les pipelines de logs préconfigurés réduisent la nécessité de créer des règles de parsing personnalisées, leur permettant de se concentrer sur le dépannage et la surveillance. Les pipelines de logs sont obligatoires pour les intégrations qui envoient des logs à Datadog.

{{< img src="developers/integrations/pipeline_library.png" alt="Parcourir la bibliothèque de pipelines d'intégration" style="width:100%;" >}}

Ce guide explique comment créer un pipeline de logs, notamment les bonnes pratiques et les exigences. Pour une expérience d'apprentissage pratique, consulter les cours associés dans le centre d'apprentissage Datadog :
   - [Traiter les logs prêts à l'emploi avec les pipelines d'intégration][1]
   - [Créer et gérer des pipelines de logs][2]

### Concepts fondamentaux

Voici les concepts importants à comprendre avant de créer votre pipeline. Consultez [Log Pipelines][3] pour en savoir plus.

- **Processeurs** : les éléments de base qui transforment ou enrichissent les logs. Consultez [Processeurs][4] pour en savoir plus.

- **Facettes** : fournissent une interface de filtrage simple pour les logs et améliorent la lisibilité en exposant des étiquettes claires et conviviales pour les attributs importants. Consultez [Facettes][5] pour en savoir plus.

- **Pipelines imbriqués** : pipelines au sein d'un pipeline qui permettent de diviser le traitement en chemins distincts pour différents types de logs ou conditions.

- **L'ordre est important** : les pipelines s'exécutent de haut en bas, de sorte que la séquence des processeurs est déterminante pour obtenir la transformation de logs souhaitée.

## Créer un pipeline de logs d'intégration

Pour commencer, assurez-vous d'être un Technology Partner enregistré avec accès à une instance de développeur Datadog. Si vous n'avez pas encore rejoint le réseau, consultez [Rejoindre le réseau de partenaires Datadog][6].

1. [Créez un pipeline filtrant selon la source de logs de votre intégration](#créer-un-pipeline).
2. [Ajoutez des processeurs pour normaliser et enrichir les logs](#ajouter-des-processeurs).
3. [Créez des facettes personnalisées pour améliorer le filtrage et l'exploration par les utilisateurs](#définir-des-facettes-personnalisées).
4. [Validez et testez le pipeline](#valider-et-tester-votre-pipeline-de-logs).
5. [Passez en revue les exigences des pipelines de logs](#passer-en-revue-la-liste-de-vérification-des-exigences).
6. [Exportez le pipeline et ajoutez-le à la soumission de votre intégration](#exporter-et-ajouter-votre-pipeline-à-la-soumission-de-lintégration).

### Créer un pipeline

1. Accédez à la page [**Pipelines**][7] et sélectionnez **New Pipeline**.
2. Dans le champ **Filter**, filtrez selon la source de logs de votre intégration (`source:<logs_source>`). La source de logs est disponible dans l'onglet **Data** lors de la consultation de votre intégration dans la plateforme de développement.
3. (Facultatif) Ajoutez des tags et une description.
4. Cliquez sur **Create**.

### Ajouter des processeurs

Pour ajouter un processeur, ouvrez votre pipeline nouvellement créé et sélectionnez **Add Processor**. Suivre les recommandations ci-dessous pour déterminer les processeurs à configurer :

1. Analysez les logs bruts (si nécessaire).
   - Si vos logs ne sont pas au format JSON, ajoutez un [Grok Parser][8] pour extraire les attributs avant le remappage ou l'enrichissement.
      - Pour optimiser le parsing Grok, n'utilisez pas de correspondances globales ou génériques (*wildcard matchers*).
   - Ignorez cette étape si les logs sont déjà envoyés à Datadog au format JSON.
2. Normalisez les logs en tenant compte des attributs standard Datadog.
   - Mappez les attributs entrants vers les [attributs standard Datadog][9] afin que les logs soient cohérents sur toute la plateforme. Par exemple, un attribut correspondant à une valeur d'IP client doit être remappé en `network.client.ip`.
   - Pour les attributs réservés (`date`, `message`, `status`, `service`), utilisez les processeurs dédiés : [Date Remapper][10], [Message Remapper][11], [Status Remapper][12], [Service Remapper][13].
      - **Important** : les remappers doivent être explicitement ajoutés pour ces attributs, même si la valeur entrante correspond aux valeurs par défaut de Datadog. Les remplacements au niveau de l'organisation peuvent modifier le comportement par défaut.
   - Ajoutez au minimum un Date Remapper pour mapper l'horodatage du log vers l'attribut réservé `date`.
   - Pour les attributs standard non réservés, utilisez le [Remapper][14] général.
      - Sauf si vous mettez à jour un pipeline de logs d'intégration existant, désactivez **Preserve source attribute** pour éviter les valeurs en double.
3. Enrichissez les logs selon les besoins.
   - Pour obtenir la liste de tous les processeurs de logs, consultez la documentation [Processeurs][4].
   - Envisager d'ajouter des processeurs qui fournissent du contexte ou des attributs dérivés, tels que :
      - [Geo IP Parser][15] pour ajouter des données de géolocalisation sur la base d'un champ d'adresse IP.
      - [Category Processor][16] pour regrouper les logs selon des règles prédéfinies.
      - [Arithmetic Processor][17] pour calculer des valeurs numériques à partir d'attributs existants.
      - [String Builder Processor][18] pour concaténer plusieurs attributs en un seul champ.

### Définir des facettes personnalisées

Une fois les logs normalisés et enrichis, l'étape suivante consiste à créer des facettes personnalisées, qui mappent les attributs individuels vers des champs conviviaux dans Datadog.

Les facettes personnalisées fournissent aux utilisateurs une interface cohérente pour filtrer les logs et alimentent l'autocomplétion dans le Logs Explorer, facilitant ainsi la découverte et l'agrégation d'informations importantes. Elles permettent également de renommer les attributs peu lisibles avec des étiquettes claires et conviviales. Par exemple, en transformant `@deviceCPUper` en `Device CPU Utilization Percentage`.

Les facettes peuvent être qualitatives (pour le filtrage et le regroupement de base) ou quantitatives, appelées mesures (pour les opérations d'agrégation, telles que le calcul de moyennes ou le filtrage par plage). Créez des facettes pour les attributs que les utilisateurs sont le plus susceptibles de filtrer, de rechercher ou de regrouper dans le Logs Explorer. Consultez [Facettes][5] pour en savoir plus.

**Remarque** : vous n'avez pas besoin de créer des facettes pour les [attributs standard Datadog][9]. Ces attributs sont mappés vers des facettes prédéfinies, que Datadog génère automatiquement lors de la publication d'un pipeline.

Après avoir identifié les attributs pouvant bénéficier de facettes, suivre les étapes suivantes pour chacun :

1. Accédez au [Logs Explorer][19].
2. Cliquez sur **Add** dans le volet des facettes.
3. Choisissez si vous souhaitez créer une **Facet** ou une **Measure**, puis développez **Advanced options**.
4. Définissez le **Path**.
   - Les facettes personnalisées doivent inclure un préfixe correspondant à votre source de logs.
   - Par exemple, une facette sur `project_name` doit utiliser le chemin `@<logs_source>.project_name`.
5. Modifiez le **Display Name** pour qu'il soit convivial.
   - Par exemple, le chemin de facette `@<logs_source>.project_name` doit avoir le nom d'affichage `Project Name`.
6. Sélectionnez le **Type** approprié (et l'**Unit** si vous définissez une Measure).
7. Ajoutez un **Group**, qui doit correspondre au nom de votre intégration.
   - Utilisez ce même groupe pour toutes les facettes personnalisées supplémentaires dans l'intégration.
8. Ajoutez une **Description** expliquant la facette.
9. Cliquez sur **Add** pour enregistrer.
10. Revenez à la définition du pipeline et ajoutez un [Remapper][14] pour aligner l'attribut brut avec le chemin préfixé utilisé par la facette.

### Passer en revue la liste de vérification des exigences

Avant de tester votre pipeline, passez en revue les exigences suivantes pour éviter les erreurs courantes.

- **Les pipelines de logs ne doivent pas être vides** : chaque pipeline doit contenir au minimum un processeur. Incluez au minimum un Date Remapper.
- **Ajoutez des remappers dédiés pour `date`, `message`, `status` et `service`** : les remappers doivent être explicitement ajoutés pour ces attributs, même si la valeur entrante correspond aux valeurs par défaut de Datadog. Les remplacements au niveau de l'organisation peuvent modifier le comportement par défaut.
- **Désactivez `Preserve source attribute` lors de l'utilisation d'un [Remapper][14] général** : activez cette option uniquement si l'attribut est requis pour le traitement en aval, ou si vous mettez à jour un pipeline existant et avez besoin de maintenir la compatibilité ascendante.
- **Ne dupliquez pas les facettes Datadog existantes** : pour éviter toute confusion avec les facettes Datadog prêtes à l'emploi existantes, ne créez pas de facettes personnalisées qui chevauchent les [attributs standard Datadog][9].
- **Utilisez un préfixe personnalisé pour les facettes personnalisées** : les attributs qui ne correspondent pas à un [attribut standard Datadog][9] doivent inclure un préfixe unique lorsqu'ils sont mappés vers une facette personnalisée. Utilisez le [Remapper][14] général pour ajouter un préfixe.
- **Regroupez les facettes personnalisées** : assignez toutes les facettes personnalisées à un groupe correspondant au nom de votre intégration.
- **Faites correspondre les types de données des facettes** : assurez-vous que le type de données de la facette (String, Boolean, Double ou Integer) correspond au type de l'attribut auquel elle est mappée. Des types incompatibles peuvent empêcher le bon fonctionnement de la facette.
- **Protégez les clés d'API et d'application Datadog** : ne loguez jamais les clés d'API. Les clés doivent uniquement être transmises dans les en-têtes de requête, et non dans les messages de log.

### Valider et tester votre pipeline de logs

Testez votre pipeline pour confirmer que les logs sont correctement analysés, normalisés et enrichis. Pour les pipelines plus complexes, le [Pipeline Scanner][20] peut s'avérer utile.

1. Générez de nouveaux logs transitant par le pipeline.
   - Les pipelines de logs sont automatiquement déclenchés si Datadog ingère un log correspondant à la requête de filtrage.
   - Si le pipeline n'est pas déclenché, assurez-vous qu'il est activé à l'aide du bouton bascule.
2. Vérifiez les facettes personnalisées dans le [Logs Explorer][19] en vous assurant qu'elles apparaissent et filtrent les résultats comme prévu.
3. Inspecter les logs individuels dans le volet Log Details pour s'assurer que :
   - les attributs `service`, `source` et `message` sont correctement définis.
    - les tags sont appliqués comme prévu.

### Exporter et ajouter votre pipeline à la soumission de l'intégration

La dernière étape consiste à exporter le pipeline et à charger les fichiers dans la plateforme de développement.

1. Survolez votre pipeline et sélectionnez l'icône **Export Pipeline**.
   {{< img src="developers/integrations/export_pipeline.png" alt="Cliquez sur l'icône Export Pipeline pour exporter votre pipeline de logs dans Datadog" width="50%">}}
2. Passez en revue le pipeline et cliquez sur **Select Facets**.
3. Sélectionnez uniquement les facettes personnalisées créées pour cette intégration et cliquez sur **Add Sample Logs**.
   - Les facettes correspondant aux [attributs standard Datadog][9] sont automatiquement créées par Datadog.
4. Ajoutez des exemples de logs.
   - Ces exemples doivent être au format dans lequel les logs sont envoyés à l'API Logs Datadog ou ingérés avec l'Agent Datadog.
   - Assurez-vous que les exemples couvrent les variations des remappers. Par exemple, si vous avez défini un category processor, ajoutez des exemples qui déclenchent différentes valeurs de catégorie.
5. Cliquez sur **Export**.
   - Deux fichiers YAML sont générés : l'un pour la définition du pipeline et l'autre que Datadog utilise en interne à des fins de test.
6. Chargez les deux fichiers YAML dans la plateforme de développement, sous **Data** > **Submitted Data** > **Logs**.
   {{< img src="developers/integrations/data_tab.png" alt="L'onglet Data dans la plateforme de développement d'intégrations" style="width:100%;" >}}

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://learn.datadoghq.com/courses/integration-pipelines
[2]: https://learn.datadoghq.com/courses/log-pipelines
[3]: /fr/logs/log_configuration/pipelines/
[4]: /fr/logs/log_configuration/processors/
[5]: /fr/logs/explorer/facets/
[6]: /fr/developers/integrations/?tab=integrations#join-the-datadog-partner-network
[7]: https://app.datadoghq.com/logs/pipelines
[8]: /fr/logs/log_configuration/processors/?tab=ui#grok-parser
[9]: /fr/standard-attributes/?product=log
[10]: /fr/logs/log_configuration/processors/?tab=ui#log-date-remapper
[11]: /fr/logs/log_configuration/processors/?tab=ui#log-message-remapper
[12]: /fr/logs/log_configuration/processors/?tab=ui#log-status-remapper
[13]: /fr/logs/log_configuration/processors/?tab=ui#service-remapper
[14]: /fr/logs/log_configuration/processors/?tab=ui#remapper
[15]: /fr/logs/log_configuration/processors/?tab=ui#geoip-parser
[16]: /fr/logs/log_configuration/processors/?tab=ui#category-processor
[17]: /fr/logs/log_configuration/processors/?tab=ui#arithmetic-processor
[18]: /fr/logs/log_configuration/processors/?tab=ui#string-builder-processor
[19]: https://app.datadoghq.com/logs
[20]: /fr/logs/log_configuration/pipeline_scanner/