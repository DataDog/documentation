---
algolia:
  tags:
  - logs processors
  - logs parsing
  - Extracting Attributes
  - Remapping attributes
aliases:
- /fr/logs/processing/processors/
description: Analysez, enrichissez et structurez vos journaux à l'aide de processeurs
  dans la gestion des journaux Datadog
further_reading:
- link: /logs/log_configuration/pipelines
  tag: Documentation
  text: Découvrir les pipelines de Datadog
- link: /logs/logging_without_limits/
  tag: Documentation
  text: Logging without Limits*
- link: /logs/explorer/
  tag: Documentation
  text: Apprendre à explorer vos logs
- link: https://www.youtube.com/watch?v=OztSU3JzfC8&list=PLdh-RwQzDsaM9Sq_fi-yXuzhmE7nOlqLE&index=4&t=245s
  tag: Vidéo
  text: 'Astuces et conseils : Ajoutez des données commerciales aux journaux provenant
    de points de vente au détail'
- link: https://learn.datadoghq.com/courses/log-pipelines
  tag: Centre d'apprentissage
  text: Créer et gérer des pipelines de logs
- link: https://learn.datadoghq.com/courses/integration-pipelines
  tag: Centre d'apprentissage
  text: Traiter les logs automatiquement avec les pipelines d'intégration
title: Processeurs
---
## Aperçu {#overview}

<div class="alert alert-info">Les processeurs décrits dans cette documentation sont spécifiques aux environnements de journalisation basés sur le cloud. Pour analyser, structurer et enrichir les journaux sur site, consultez <a href="https://docs.datadoghq.com/observability_pipelines/processors/">Pipelines d'observabilité</a>.</div>

Un processeur s'exécute dans un [pipeline][1] pour effectuer une action de structuration de données et générer des attributs afin d'enrichir vos logs.

{{< img src="logs/log_configuration/processor/processor_overview.png" alt="Processeurs" style="width:100%" >}}

Dans les [paramètres de configuration des journaux][1], vous pouvez configurer des processeurs tels que le [parseur Grok][3] ou le [remappeur de date][4] pour aider à extraire, créer et remapper des attributs afin d'enrichir vos journaux et améliorer la recherche par facettes.

**Notes** :

- Les journaux structurés doivent être transmis dans un format valide. Si la structure contient des caractères invalides pour l'analyse, ceux-ci doivent être supprimés au niveau de l'Agent à l'aide de la fonctionnalité [mask_sequences][2].

- En tant que meilleure pratique, il est recommandé d'utiliser au maximum 20 processeurs par pipeline.

## Types de processeurs {#processor-types}

{{< whatsnext desc="Sélectionnez un type de processeur pour en savoir plus :">}}
    {{< nextlink href="logs/log_configuration/processors/arithmetic_processor">}}<strong>Processeur arithmétique</strong> : Ajoutez un nouvel attribut à un journal avec le résultat d'une formule appliquée aux attributs numériques existants.{{< /nextlink >}}
    {{< nextlink href="logs/log_configuration/processors/array_processor">}}<strong>Processeur de tableau</strong> : Extrayez, agrégez ou transformez des valeurs à partir de tableaux JSON dans vos journaux.{{< /nextlink >}}
    {{< nextlink href="logs/log_configuration/processors/remapper">}}<strong>Remappeur d'attributs</strong> : Remappez des attributs ou des balises source vers un autre attribut ou balise cible.{{< /nextlink >}}
    {{< nextlink href="logs/log_configuration/processors/category_processor">}}<strong>Processeur de catégorie</strong> : Ajoutez un nouvel attribut à un journal en fonction d'une correspondance avec une requête de recherche, afin de faciliter le regroupement et la classification.{{< /nextlink >}}
    {{< nextlink href="logs/log_configuration/processors/decoder_processor">}}<strong>Processeur décodeur</strong> : Décodez les champs encodés de binaire en texte (comme Base64 ou Hex) pour en retrouver leur représentation originale.{{< /nextlink >}}
    {{< nextlink href="logs/log_configuration/processors/geoip_parser">}}<strong>Parseur GeoIP</strong> : Extrayez des informations sur le continent, le pays, la subdivision ou la ville à partir d'un attribut d'adresse IP.{{< /nextlink >}}
    {{< nextlink href="logs/log_configuration/processors/grok_parser">}}<strong>Parseur Grok</strong> : Créez des règles de parsing personnalisées pour extraire et structurer des données à partir de messages de journal ou d'attributs spécifiques.{{< /nextlink >}}
    {{< nextlink href="logs/log_configuration/processors/log_date_remapper">}}<strong>Remappeur de date de journal</strong> : Assignez un ou plusieurs attributs comme l'horodatage officiel de vos journaux.{{< /nextlink >}}
    {{< nextlink href="logs/log_configuration/processors/log_message_remapper">}}<strong>Remappeur de messages de journal</strong>: Assignez un ou plusieurs attributs comme message officiel pour vos journaux.{{< /nextlink >}}
    {{< nextlink href="logs/log_configuration/processors/log_status_remapper">}}<strong>Remappeur d'état de journal</strong>: Assignez un ou plusieurs attributs comme statut de gravité officiel pour vos journaux.{{< /nextlink >}}
    {{< nextlink href="logs/log_configuration/processors/lookup_processor">}}<strong>Processeur de recherche</strong>: Faites correspondre un attribut de journal à une valeur lisible par l'homme à partir d'une table de référence ou d'une table de correspondance.{{< /nextlink >}}
    {{< nextlink href="logs/log_configuration/processors/ocsf_processor">}}<strong>Processeur OCSF</strong>: Normalisez les journaux de sécurité selon le Cadre de Schéma de Cybersécurité Ouvert (OCSF).{{< /nextlink >}}
    {{< nextlink href="logs/log_configuration/processors/service_remapper">}}<strong>Remappeur de service</strong>: Assignez un ou plusieurs attributs comme service officiel pour vos journaux.{{< /nextlink >}}
    {{< nextlink href="logs/log_configuration/processors/span_remapper">}}<strong>Remappeur de span</strong>: Définissez une corrélation entre les spans d'application et les journaux.{{< /nextlink >}}
    {{< nextlink href="logs/log_configuration/processors/string_builder_processor">}}<strong>Processeur de création de chaînes</strong>: Créez un nouvel attribut à partir d'un modèle d'attributs existants et de chaînes brutes.{{< /nextlink >}}
    {{< nextlink href="logs/log_configuration/processors/threat_intel_processor">}}<strong>Processeur de Threat Intelligence</strong>: Enrichissez les journaux avec des attributs de Threat Intelligence en les comparant à une table d'indicateurs de compromission (IoC).{{< /nextlink >}}
    {{< nextlink href="logs/log_configuration/processors/trace_remapper">}}<strong>Remappeur de trace</strong>: Définissez une corrélation entre les traces d'application et les journaux.{{< /nextlink >}}
    {{< nextlink href="logs/log_configuration/processors/url_parser">}}<strong>Analyseur d'URL</strong>: Extrayez les paramètres de requête et d'autres composants d'un attribut d'URL.{{< /nextlink >}}
    {{< nextlink href="logs/log_configuration/processors/user_agent_parser">}}<strong>Analyseur d'agent utilisateur</strong>: Analysez un attribut d'agent utilisateur pour extraire le système d'exploitation, le navigateur, l'appareil et d'autres données utilisateur.{{< /nextlink >}}
{{< /whatsnext >}}

## Lectures complémentaires {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/logs/log_configuration/pipelines/
[2]: /fr/agent/logs/advanced_log_collection/?tab=configurationfile#scrub-sensitive-data-from-your-logs
[3]: /fr/logs/log_configuration/processors/grok_parser/
[4]: /fr/logs/log_configuration/processors/log_date_remapper/