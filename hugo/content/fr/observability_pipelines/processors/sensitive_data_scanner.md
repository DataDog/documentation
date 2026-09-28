---
description: Apprenez à utiliser le processeur Sensitive Data Scanner pour détecter
  et masquer ou hacher des informations sensibles telles que les informations personnelles
  identifiables (PII) et les données de Payment Card Industry (PCI) dans les logs
  ou traces.
disable_toc: false
further_reading:
- link: /logs/guide/regex_log_parsing/
  tag: guide
  text: Rédaction de règles de parsing Grok efficaces avec des expressions régulières
- link: https://www.datadoghq.com/blog/otel-ai-observability-pipelines-clickhouse/
  tag: Blog
  text: Acheminer les données OTel des applications IA vers ClickHouse et Datadog
    à l'aide d'Observability Pipelines
products:
- icon: logs
  name: Logs
  url: /observability_pipelines/configuration/?tab=logs#pipeline-types
title: Processeur Sensitive Data Scanner
---
{{< product-availability >}}

## Présentation {#overview}

Le processeur Sensitive Data Scanner analyse les logs pour détecter et masquer ou hacher des informations sensibles telles que les PII, les PCI et les données sensibles personnalisées. Vous pouvez choisir parmi la bibliothèque de règles prédéfinies de Datadog ou saisir des règles Regex personnalisées pour rechercher des données sensibles.

Vous pouvez configurer le pipeline et le processeur dans le [UI](#set-up-the-processor-in-the-ui), l'[API][10] ou [Terraform](#set-up-the-processor-using-terraform).

Consultez les [bonnes pratiques pour optimiser les performances](#best-practices-to-optimize-performance) pour obtenir des conseils sur la réduction de l'utilisation des ressources.

## Configurez le processeur dans le UI {#set-up-the-processor-in-the-ui}

Pour configurer le processeur :

1. Définissez un {{< ui >}}filter query{{< /ui >}}. Consultez [Logs Search Syntax][1] pour plus d'informations.
    - Seuls les événements correspondant au filtre sont analysés et traités.
    - Tous les événements, qu'ils correspondent ou non à la requête de filtrage, sont envoyés à l'étape suivante du pipeline.
1. Cliquez sur {{< ui >}}Add Scanning Rule{{< /ui >}}.
1. Sélectionnez l'une des options suivantes:

{{< tabs >}}
{{% tab "Règles de bibliothèque" %}}

1. Dans le menu déroulant, sélectionnez la règle de bibliothèque que vous souhaitez utiliser.
1. Les mots-clés recommandés sont automatiquement ajoutés en fonction de la règle de bibliothèque sélectionnée. Une fois la règle d'analyse ajoutée, vous pouvez [ajouter des mots-clés supplémentaires ou supprimer des mots-clés recommandés](#add-additional-keywords).
1. Dans la section {{< ui >}}Define rule target and conditions{{< /ui >}}, sélectionnez si vous souhaitez analyser {{< ui >}}Entire Event{{< /ui >}}, {{< ui >}}Specific Attributes{{< /ui >}} ou {{< ui >}}Exclude Attributes{{< /ui >}} dans le menu déroulant.
    - Si vous analysez l'événement entier, vous pouvez éventuellement exclure des attributs spécifiques de l'analyse. Utilisez la [notation de chemin](#path-notation-example) (`outer_key.inner_key`) pour accéder aux clés imbriquées. Pour les attributs spécifiés contenant des données imbriquées, toutes les données imbriquées sont exclues.
    - Si vous analysez des attributs spécifiques, indiquez les attributs que vous souhaitez analyser. Utilisez la [notation de chemin](#path-notation-example) (`outer_key.inner_key`) pour accéder aux clés imbriquées. Pour les attributs spécifiés avec des données imbriquées, toutes les données imbriquées sont analysées.
1. Pour {{< ui >}}Define actions on match{{< /ui >}}, sélectionnez l'action que vous souhaitez effectuer pour les informations correspondantes. **Remarque** : La rédaction, la rédaction partielle et le hachage sont tous des actions irréversibles.
    - {{< ui >}}Redact{{< /ui >}} : Remplace toutes les valeurs correspondantes par le texte que vous spécifiez dans le champ {{< ui >}}Replacement text{{< /ui >}}.
    - {{< ui >}}Partially Redact{{< /ui >}} : Remplace une partie spécifiée de toutes les données correspondantes. Dans la section {{< ui >}}Redact{{< /ui >}}, spécifiez le nombre de caractères que vous souhaitez masquer et quelle partie des données correspondantes masquer.
    - {{< ui >}}Hash{{< /ui >}} : Remplace toutes les données correspondantes par un identifiant unique. Les octets UTF-8 de la correspondance sont hachés avec l'empreinte 64 bits de FarmHash.
1. Facultativement, cliquez sur {{< ui >}}Add Field{{< /ui >}} pour ajouter des tags que vous souhaitez associer aux événements correspondants.
1. Ajoutez un nom pour la règle d'analyse.
1. Facultativement, ajoutez une description pour la règle.
1. Cliquez sur {{< ui >}}Save{{< /ui >}}.

### Ajoutez des mots-clés supplémentaires {#add-additional-keywords}

Après avoir ajouté des règles d'analyse depuis la bibliothèque, vous pouvez modifier chaque règle séparément et ajouter des mots-clés supplémentaires au dictionnaire de mots-clés.

1. Accédez à votre [pipeline][1].
1. Dans le processeur Sensitive Data Scanner avec la règle que vous souhaitez modifier, cliquez sur {{< ui >}}Manage Scanning Rules{{< /ui >}}.
1. Activez {{< ui >}}Use recommended keywords{{< /ui >}} si vous souhaitez que la règle les utilise. Sinon, ajoutez vos propres mots-clés dans le champ {{< ui >}}Create keyword dictionary{{< /ui >}}. Vous pouvez également exiger que ces mots-clés se trouvent à un nombre spécifié de caractères d'une correspondance. Par défaut, les mots-clés doivent se trouver dans les 30 caractères précédant une valeur correspondante.
1. Cliquez sur {{< ui >}}Update{{< /ui >}}.

[1]: https://app.datadoghq.com/observability-pipelines

{{% /tab %}}
{{% tab "Règles personnalisées" %}}

1. Dans la section {{< ui >}}Define match conditions{{< /ui >}}, spécifiez le motif regex à utiliser pour la correspondance avec les événements dans le champ {{< ui >}}Define the regex{{< /ui >}}. Consultez [Rédaction de règles de parsing Grok efficaces avec des expressions régulières][1] pour plus d'informations.
    Sensitive Data Scanner prend en charge les expressions régulières compatibles Perl (PCRE), mais les motifs suivants ne sont pas pris en charge :
    - Rétro-références et sous-expressions de capture (lookarounds)
    - Assertions arbitraires de largeur nulle
    - Références de sous-routine et motifs récursifs
    - Motifs conditionnels
    - Verbes de contrôle de retour sur trace (backtracking)
    - La directive `\C` « single-byte » (qui rompt les séquences UTF-8)
    - La correspondance de nouvelle ligne `\R`
    - La directive de réinitialisation du début de correspondance `\K`
    - Appels et code intégré
    - Groupement atomique et quantificateurs possessifs
1. Saisissez des exemples de données dans le champ {{< ui >}}Add sample data{{< /ui >}} pour vérifier que votre motif regex est valide.
1. Pour {{< ui >}}Create keyword dictionary{{< /ui >}}, ajoutez des mots-clés afin d'affiner la précision de la détection lors de la correspondance avec des conditions regex. Par exemple, si vous recherchez un numéro de carte de crédit Visa à seize chiffres, vous pouvez ajouter des mots-clés tels que `visa`, `credit` et `card`. Vous pouvez également exiger que ces mots-clés se trouvent à un nombre spécifié de caractères d'une correspondance. Par défaut, les mots-clés doivent se trouver dans les 30 caractères précédant une valeur correspondante.
1. Dans la section {{< ui >}}Define rule target and conditions{{< /ui >}}, sélectionnez si vous souhaitez analyser {{< ui >}}Entire Event{{< /ui >}}, {{< ui >}}Specific Attributes{{< /ui >}} ou {{< ui >}}Exclude Attributes{{< /ui >}} dans le menu déroulant.
    - Si vous analysez l'événement entier, vous pouvez éventuellement exclure des attributs spécifiques de l'analyse. Utilisez la [notation de chemin](#path-notation-example) (`outer_key.inner_key`) pour accéder aux clés imbriquées. Pour les attributs spécifiés contenant des données imbriquées, toutes les données imbriquées sont exclues.
    - Si vous analysez des attributs spécifiques, indiquez les attributs que vous souhaitez analyser. Utilisez la [notation de chemin](#path-notation-example-custom) (`outer_key.inner_key`) pour accéder aux clés imbriquées. Pour les attributs spécifiés avec des données imbriquées, toutes les données imbriquées sont analysées.
1. Pour {{< ui >}}Define actions on match{{< /ui >}}, sélectionnez l'action que vous souhaitez effectuer pour les informations correspondantes. **Remarque** : La rédaction, la rédaction partielle et le hachage sont tous des actions irréversibles.
    - {{< ui >}}Redact{{< /ui >}} : Remplace toutes les valeurs correspondantes par le texte que vous spécifiez dans le champ {{< ui >}}Replacement text{{< /ui >}}.
    - {{< ui >}}Partially Redact{{< /ui >}} : Remplace une partie spécifiée de toutes les données correspondantes. Dans la section {{< ui >}}Redact{{< /ui >}}, spécifiez le nombre de caractères que vous souhaitez masquer et quelle partie des données correspondantes masquer.
    - {{< ui >}}Hash{{< /ui >}} : Remplace toutes les données correspondantes par un identifiant unique. Les octets UTF-8 de la correspondance sont hachés avec l'empreinte 64 bits de FarmHash.
1. Facultativement, cliquez sur {{< ui >}}Add Field{{< /ui >}} pour ajouter des tags que vous souhaitez associer aux événements correspondants.
1. Ajoutez un nom pour la règle d'analyse.
1. Facultativement, ajoutez une description pour la règle.
1. Cliquez sur {{< ui >}}Add Rule{{< /ui >}}.

[1]: /fr/logs/guide/regex_log_parsing/

{{% /tab %}}
{{< /tabs >}}

### Supprimez une règle {#delete-a-rule}

Pour supprimer une règle dans le Sensitive Data Scanner :

1. Accédez à [Observability Pipelines][2].
1. Sélectionnez votre pipeline.
1. Cliquez sur le processeur Sensitive Data Scanner pour le développer.
1. Cliquez sur {{< ui >}}Manage Scanning Rules{{< /ui >}}.
1. Sélectionnez la règle que vous souhaitez supprimer.
1. Cliquez sur {{< ui >}}Delete{{< /ui >}}.

### Exemple de notation de chemin {#path-notation-example}

{{% observability_pipelines/path_notation %}}

{{% observability_pipelines/path_notation_dots %}}

## Configurez le processeur à l'aide de Terraform {#set-up-the-processor-using-terraform}

Vous pouvez utiliser la [ressource Terraform Datadog Observability Pipeline][4] pour configurer un pipeline avec le processeur Sensitive Data Scanner. Pour ajouter une règle au processeur Sensitive Data Scanner à l'aide de Terraform :

1. Utilisez la source de données [Datadog Sensitive Data Scanner Standard Pattern][5] pour récupérer l'ID de règle de la [règle de bibliothèque][6] Sensitive Data Scanner.

   {{< code-block lang="terraform" >}}
data "datadog_sensitive_data_scanner_standard_pattern" "<RULE_IDENTIFIER>" {
  filter = "<RULE_NAME>"
}
   {{< /code-block >}}

   Remplacez les espaces réservés :

   - `<RULE_IDENTIFIER>`Remplacez par un nom à utiliser lors de la configuration ultérieure du processeur Sensitive Data Scanner dans la ressource Observability Pipeline.
   - `<RULE_NAME>`Remplacez par le nom exact de la règle. Consultez [Library Rules][6] pour obtenir la liste complète des règles.

   Par exemple, si vous souhaitez utiliser le [AWS Access Key ID Scanner][7], configurez la source de données comme suit :

   {{< code-block lang="terraform" >}}
data "datadog_sensitive_data_scanner_standard_pattern" "aws_access_key" {
  filter = "AWS Access Key ID Scanner"
}
   {{< /code-block >}}
    Consultez l'[exemple de configuration complet](#full-configuration-example) sur la façon d'ajouter des sources de données pour plusieurs règles.

1. Ajoutez un bloc [rule][9] dans votre ressource Observability Pipeline pour la règle de bibliothèque.

   {{< code-block lang="terraform" >}}
...
  sensitive_data_scanner {
    rule {
      name = "<YOUR_RULE_NAME>"
      tags = []
      on_match {
        redact {
          replace = "***"
        }
      }
      pattern {
        library {
          id                       = data.datadog_sensitive_data_scanner_standard_pattern.<RULE_IDENTIFIER>.id
          use_recommended_keywords = true
        }
      }
      scope {
        all = true
      }
    }
  }
   {{< /code-block >}}

   Remplacez les espaces réservés :

   - `<YOUR_RULE_NAME>` par un nom pour la règle. Ce nom est affiché dans l'UI des Pipelines.
   - `<RULE_IDENTIFIER>`Remplacez par l'identifiant de la règle que vous avez utilisé dans la source de données à l'étape 1.

   Par exemple, si vous utilisez la source de données [AWS Access Key ID Scanner][7] de l'étape 1, configurez le bloc de règle comme suit :

   {{< code-block lang="terraform" >}}
...
  sensitive_data_scanner {
    rule {
      name = "Redact AWS Access Key IDs"
      tags = []
      on_match {
        redact {
          replace = "***"
        }
      }
      pattern {
        library {
          id                       = data.datadog_sensitive_data_scanner_standard_pattern.aws_access_key.id
          use_recommended_keywords = true
        }
      }
      scope {
        all = true
      }
    }
  }
   {{< /code-block >}}

   Consultez l'[exemple de configuration complet](#full-configuration-example) sur la façon d'ajouter plusieurs règles.

1. Répétez les étapes 1 et 2 pour toutes les règles de bibliothèque que vous souhaitez ajouter.

### Exemple de configuration complet {#full-configuration-example}

{{< img src="observability_pipelines/processors/sds_tf_ui.png" alt="Le panneau du processeur Sensitive Data Scanner affichant deux règles d'analyse : Redact AWS Access Key IDs et Redact US SSNs" style="width:60%;" >}}

Si vous souhaitez utiliser le processeur Sensitive Data Scanner pour rechercher des identifiants de clé d'accès AWS et des numéros de sécurité sociale américains, et les masquer en les remplaçant par la chaîne `***` :

1. Utilisez la source de données [Datadog Sensitive Data Scanner Standard Pattern][5] pour récupérer les identifiants de règle pour le [AWS Access Key ID Scanner][7] et le [US Social Security Number Scanner][8].
1. Dans le processeur Sensitive Data Scanner de votre ressource [Datadog Observability Pipeline][4], utilisez les règles Sensitive Data Scanner définies dans les sources de données.

{{< code-block lang="terraform" >}}
data "datadog_sensitive_data_scanner_standard_pattern" "aws_access_key" {
  filter = "AWS Access Key ID Scanner"
}
data "datadog_sensitive_data_scanner_standard_pattern" "us_ssn" {
  filter = "US Social Security Number Scanner"
}

resource "datadog_observability_pipeline" "sensitive_data_pipeline" {
  name = "Sensitive Data Pipeline"

  config {
    source {
      id = "source-0"
      datadog_agent {}
    }

    processor_group {
      display_name = "Processors"
      enabled      = true
      id           = "group-0"
      include      = "*"
      inputs       = ["source-0"]

      processor {
        display_name = "Sensitive Data Scanner"
        enabled      = true
        id           = "processor-sds-0"
        include      = "*"

        sensitive_data_scanner {
          rule {
            name = "Redact AWS Access Key IDs"
            tags = []
            on_match {
              redact {
                replace = "***"
              }
            }
            pattern {
              library {
                id                       = data.datadog_sensitive_data_scanner_standard_pattern.aws_access_key.id
                use_recommended_keywords = true
              }
            }
            scope {
              all = true
            }
          }
          rule {
            name = "Redact US SSNs"
            tags = []
            on_match {
              redact {
                replace = "***"
              }
            }
            pattern {
              library {
                id                       = data.datadog_sensitive_data_scanner_standard_pattern.us_ssn.id
                use_recommended_keywords = true
              }
            }
            scope {
              all = true
            }
          }
        }
      }
    }

    destination {
      id     = "destination-0"
      inputs = ["group-0"]
      datadog_logs {}
    }
  }
}
{{< /code-block >}}

## Bonnes pratiques pour optimiser les performances {#best-practices-to-optimize-performance}

Le processeur Sensitive Data Scanner est intensif en termes de CPU. Utilisez les bonnes pratiques suivantes pour optimiser les performances.

### Afficher l'utilisation des règles d'analyse avec le dashboard Observability Pipelines Overview {#view-scanning-rule-usage-with-the-observability-pipelines-overview-dashboard}

Observability Pipelines inclut un dashboard [Observability Pipelines Overview][16] prêt à l'emploi avec une section **Données sensibles trouvées par Observability Pipelines**. Utilisez les widgets de cette section pour voir quelles règles d'analyse correspondent aux données.

1. Accédez à Dashboards > [Observability Pipelines Overview][16].
1. Utilisez les variables de modèle (`pipeline_id`, `host`, `worker_uuid`, `component_type`, `component_kind`, `component_id`) en haut du dashboard pour limiter la vue à un pipeline ou un Worker spécifique.
1. Utilisez le sélecteur de temps pour définir une plage temporelle plus large.

Utilisez les widgets suivants pour évaluer l'utilisation des règles d'analyse de vos processeurs Sensitive Data Scanner:

- **Logs contenant des données sensibles par règle d'analyse**: Liste chaque règle par nom (par exemple, `visa_card_scanner_1x16_1x19_digits` ou `redact_ipv4`) avec le nombre de correspondances sur la période sélectionnée. Les règles avec un nombre élevé correspondent activement à des données. Il s'agit du widget principal pour voir quelles règles sont utilisées.
- **Nombre total de logs contenant des données sensibles**: Affiche le volume total de données sensibles correspondant à toutes les règles.
- **Logs contenant des données sensibles par pipeline**: Affiche les logs correspondants qui contiennent des données sensibles. Vous pouvez limiter les correspondances par `pipeline_id`, ce qui vous aide à voir si les logs contenant des données sensibles sont trouvés dans tous les pipelines ou uniquement dans des pipelines spécifiques.
- **Logs contenant des données sensibles par host**: Ventile les correspondances de données sensibles par host Worker. Utilisez ce widget pour confirmer la couverture sur l'ensemble de votre déploiement.
- **Modèles contenant des informations sensibles** et **Liste des logs contenant des données sensibles**: Affiche les modèles de logs et les exemples d'événements où des données sensibles ont été trouvées.

Après avoir identifié les règles sans correspondance sur une période représentative, confirmez qu'elles ne sont pas nécessaires et supprimez-les. Consultez [Supprimer une règle](#delete-a-rule).

**Remarque**: Une règle avec zéro correspondance signifie que la règle n'a pas trouvé de correspondance dans la période sélectionnée, et non que la règle est invalide.

### Activez uniquement les règles dont vous avez besoin {#only-enable-rules-you-need}

Les règles activées mais non utilisées consomment des ressources inutiles. Vérifiez le processeur Sensitive Data Scanner pour voir combien de correspondances chaque règle a eues au cours des dernières 24 heures.

1. Accédez à [Observability Pipelines][2].
1. Sélectionnez votre pipeline.
1. Cliquez sur le processeur Sensitive Data Scanner pour le développer.
1. Cliquez sur {{< ui >}}View Scanning Rules{{< /ui >}} pour ouvrir le panneau latéral et voir {{< ui >}}Matches in the last 24 hours{{< /ui >}} pour chaque règle.

Consultez [Supprimer une règle](#delete-a-rule) pour supprimer une règle inutilisée.

### Analysez uniquement les événements et les champs qui doivent être analysés pour détecter des données sensibles {#only-scan-the-events-and-fields-that-need-to-be-scanned-for-sensitive-data}

Le temps nécessaire au Sensitive Data Scanner pour analyser un événement est proportionnel à la taille de l'événement. Pour optimiser les performances du processeur:

- Si vous connaissez les types d'événements que vous souhaitez analyser, définissez une requête de processeur qui n'envoie au processeur que les événements souhaités.

- Réduisez le temps de scan en ciblant des attributs d'événement spécifiques à scanner ou en excluant des attributs d'événement du scan. Consultez l'étape {{< ui >}}Define rule target and conditions{{< /ui >}} dans [Configurer le processeur](#set-up-the-processor-in-the-ui).

### Évaluez et comparez les optimisations de performance {#evaluate-and-benchmark-performance-optimizations}

Utilisez la métrique `pipelines.component_latency_seconds` pour :

- Comparez les performances du processeur lorsque vous ajoutez une règle
- Évaluez les performances après avoir effectué des changements d'optimisation, tels que la réduction du nombre de champs analysés et la suppression des règles inutilisées.

Pour afficher la métrique `pipelines.component_latency_seconds` :

1. Accédez à [Metrics Explorer][11].
1. Dans le champ de la métrique, saisissez `pipelines.component_latency_seconds`.
1. Dans le champ {{< ui >}}from{{< /ui >}}, saisissez le tag `component_id:<COMPONENT_ID>`, où `<COMPONENT_ID>` est l'ID de votre processeur Sensitive Data Scanner.

**Remarque**: `pipelines.component_latency_seconds` est une métrique de distribution, vous devez donc activer les percentiles pour cette métrique. Consultez [Activer les requêtes avancées][12] pour obtenir des instructions.

## Métriques de santé {#health-metrics}

Pour les [métriques de composants][13] et les [métriques de tampon de processeur][14] émises par tous les processeurs, consultez la documentation [Métriques d'utilisation des pipelines][15].

### Métriques du Sensitive Data Scanner {#sensitive-data-scanner-metrics}

- Utilisez le tag `component_id` pour filtrer ou regrouper par composants individuels.
- Le tag `component_type` est `sensitive_data_scanner` pour les métriques du processeur Sensitive Data Scanner.

`pipelines.sds_rule_matched_total`
: **Description**: Le nombre d'événements ayant correspondu à une règle Sensitive Data Scanner. Marqué avec le nom de la règle correspondante.
: **Type de métrique**: count

`pipelines.scanned_events`
: **Description**: Le nombre d'événements analysés par le moteur Sensitive Data Scanner.
: **Type de métrique**: count

`pipelines.scanning.match_count`
: **Description** : Le nombre de correspondances trouvées par le Sensitive Data Scanner.
: **Type de métrique** : count

`pipelines.scanning.suppressed_match_count`
: **Description** : Le nombre de correspondances supprimées par le Sensitive Data Scanner.
: **Type de métrique** : count

`pipelines.scanning.duration`
: **Description** : Temps réel accumulé, en secondes, passé à analyser les événements. Utilisez cette métrique pour évaluer les performances du processeur et mesurer les optimisations.
: **Type de métrique** : count

`pipelines.scanning.cpu_duration`
: **Description** : Temps CPU accumulé, en secondes, passé à analyser les événements.
: **Type de métrique** : count

`pipelines.scanner.total_count`
: **Description** : Le nombre de processeurs Sensitive Data Scanner actuellement en cours d'exécution.
: **Type de métrique** : jauge

`pipelines.scanner.total_regexes`
: **Description** : Le nombre d'expressions régulières conservées sur tous les Sensitive Data Scanners.
: **Type de métrique** : jauge

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/observability_pipelines/search_syntax/logs/
[2]: https://app.datadoghq.com/observability-pipelines
[3]: /fr/logs/guide/regex_log_parsing/
[4]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/observability_pipeline
[5]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/data-sources/sensitive_data_scanner_standard_pattern
[6]: /fr/security/sensitive_data_scanner/scanning_rules/library_rules/
[7]: /fr/security/sensitive_data_scanner/scanning_rules/library_rules/?search=AWS+Access+Key+ID+Scanner
[8]: /fr/security/sensitive_data_scanner/scanning_rules/library_rules/?search=US+Social+Security+Number+Scanner
[9]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/observability_pipeline#nested-schema-for-configprocessor_groupprocessorsensitive_data_scanner
[10]: /fr/api/latest/observability-pipelines/#create-a-new-pipeline
[11]: https://app.datadoghq.com/metric/explorer
[12]: /fr/metrics/distributions/#enabling-advanced-query-functionality
[13]: /fr/observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/#component-metrics
[14]: /fr/observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/#processor-buffer-metrics
[15]: /fr/observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/
[16]: https://app.datadoghq.com/dash/integration/32326/observability-pipelines-overview