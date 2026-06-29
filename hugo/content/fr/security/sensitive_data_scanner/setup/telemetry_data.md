---
aliases:
- /fr/sensitive_data_scanner/setup/telemetry_data
- /fr/security/sensitive_data_scanner/guide/best_practices_for_creating_custom_rules
- /fr/sensitive_data_scanner/guide/best_practices_for_creating_custom_rules
- /fr/security/sensitive_data_scanner/guide/redact_uuids_in_logs/
- /fr/security/sensitive_data_scanner/guide/redact_all_emails_except_from_specific_domain_logs/
disable_toc: false
further_reading:
- link: /security/sensitive_data_scanner/scanning_rules/library_rules
  tag: Documentation
  text: En savoir plus sur les règles de bibliothèque prêtes à l'emploi
- link: /security/sensitive_data_scanner/scanning_rules/custom_rules
  tag: Documentation
  text: En savoir plus sur la création de règles personnalisées
title: Données de télémétrie
---
## Aperçu {#overview}

Le Sensitive Data Scanner in the Cloud scanne les données de télémétrie, telles que les journaux de votre application, les événements APM, les événements RUM et les événements Event Management. Les données qui peuvent être analysées et masquées sont :

- **Journaux** : Tout le contenu des journaux structuré et non structuré, y compris les messages de journal et les valeurs d'attributs
- **APM** : Valeurs d'attributs de span uniquement
- **RUM** : Valeurs d'attributs d'événements uniquement
- **Événements** : Valeurs d'attributs d'événements uniquement

En option, des taux d'échantillonnage peuvent être définis entre 10 % et 99 % pour chaque produit. Cela aide à gérer les coûts lorsque vous commencez en réduisant la quantité de données analysées pour des informations sensibles.

Pour chaque règle de numérisation, l'une des actions suivantes peut être appliquée aux données sensibles correspondantes :

- **Masquer** : Remplacer l'ensemble des données correspondantes par un seul jeton de votre choix, tel que `[sensitive_data]`.
- **Masquer partiellement** : Remplacer une portion spécifique de toutes les valeurs correspondantes.
- **Hacher** : Remplacer l'ensemble des données correspondantes par un identifiant unique non réversible.
- **Masquer** (disponible uniquement pour les journaux) : Obscurcir toutes les valeurs correspondantes. Les utilisateurs ayant la `Data Scanner Unmask` permission peuvent démasquer (dévoiler) et voir ces données dans Datadog. Voir [Action de masquage](#mask-action) pour plus d'informations.

**Notes** :
- Lors de l'analyse des données échantillonnées, vous ne pourrez pas sélectionner des actions qui obfusquent les données qu'il analyse.
- Sensitive Data Scanner ne scanne pas les valeurs entières, flottantes et doubles. Si le nombre est au format chaîne, la chaîne est analysée.

Vous soumettez des journaux et des événements au backend de Datadog, donc les données quittent votre environnement avant d'être masquées. Les journaux et les événements sont analysés et masqués dans le backend de Datadog pendant le traitement, donc les données sensibles sont masquées avant que les événements ne soient indexés et affichés dans l'interface utilisateur de Datadog.

Si vous ne souhaitez pas que les données quittent votre environnement avant d'être masquées, utilisez [Observability Pipelines][12] et le [Sensitive Data Scanner processor][13] pour analyser et masquer les données sensibles. Voir [Configurer des Pipelines][14] pour des informations sur la façon de configurer un pipeline et ses composants.

Pour utiliser Sensitive Data Scanner in the Cloud, configurez un groupe de numérisation pour définir quelles données analyser, puis ajoutez des règles de numérisation pour déterminer quelles informations sensibles doivent être détectées dans les données.

Ce document aborde les points suivants :

- Les [permissions](#permissions) requises pour visualiser et configurer le Scanner de Données Sensibles.
- [Ajout d'un groupe d'analyse](#add-a-scanning-group)
- [Ajout de règles d'analyse](#add-scanning-rules)
- [Comment contrôler l'accès aux journaux contenant des données sensibles](#control-access-to-logs-with-sensitive-data)
- [Comment masquer des données sensibles dans les balises](#redact-sensitive-data-in-tags)

## Configuration {#setup}

### Permissions {#permissions}

Par défaut, les utilisateurs ayant le rôle d'Administrateur Datadog ont accès pour visualiser et configurer des règles d'analyse. Pour permettre à d'autres utilisateurs d'accéder, accordez les `data_scanner_read` ou `data_scanner_write` autorisations sous [Compliance][1] à un rôle personnalisé. Voir [Contrôle d'Accès][2] pour des détails sur la façon de configurer des rôles et des permissions.

Si une règle d'analyse utilise l'action **masque** (disponible uniquement pour les journaux) pour les données sensibles correspondantes, les utilisateurs ayant la permission `data_scanner_unmask` peuvent dé-obfusquer et visualiser les données dans Datadog. **Remarque** : Datadog ne recommande pas d'utiliser l'action **mask** pour les identifiants, sauf si vous disposez d'un plan pour répondre et faire la rotation de tous les identifiants divulgués. Voir [Mask action](#mask-action) pour plus d'informations.

{{< img src="sensitive_data_scanner/read_write_permissions.png" alt="Les sections des autorisations de conformité présentant les autorisations de lecture et d'écriture du Sensitive Data Scanner." style="width:80%;">}}

### Ajouter un groupe de numérisation {#add-a-scanning-group}

Un groupe d'analyse détermine quelles données analyser. Il se compose d'un filtre de requête, d'un ensemble de boutons pour activer la numérisation des journaux, APM, RUM et événements, et de l'option de définir des taux d'échantillonnage entre 10 % et 99 % pour chaque produit. Consultez la documentation sur la [Syntaxe de recherche de journaux][3] pour en savoir plus sur les filtres de requête.

Pour Terraform, consultez la ressource [Sensitive Data Scanner group][4].

Pour configurer un groupe d'analyse, effectuez les étapes suivantes :

1. Accédez à la page des paramètres du [Scanner de données sensibles][5].
1. Cliquez sur **Ajouter un groupe d'analyse**. Alternativement, cliquez sur le menu déroulant **Ajouter** dans le coin supérieur droit de la page et sélectionnez **Ajouter un groupe d'analyse**.
1. Entrez un filtre de requête pour les données que vous souhaitez scanner. En haut, cliquez sur **APM Spans** pour prévisualiser les spans filtrés. Cliquez sur **Journaux** pour voir les journaux filtrés.
1. Entrez un nom et une description pour le groupe.
1. Cliquez sur les boutons d'option pour activer le Scanner de données sensibles pour les produits que vous souhaitez (par exemple, journaux, spans APM, événements RUM et événements Datadog).
1. Définissez éventuellement un taux d'échantillonnage de 10 à 99 % pour les produits que vous souhaitez. Lorsque vous ajoutez des règles de scan à un groupe qui a l'échantillonnage activé, vous ne pourrez pas sélectionner d'actions qui obfusquent les données qu'il scanne. Pour obfusquer les correspondances, vous devez choisir de scanner toutes les données qui correspondent à votre filtre de requête de groupe.
1. Cliquez sur **Créer**.

Par défaut, un groupe de numérisation nouvellement créé est désactivé. Pour activer un groupe de numérisation, cliquez sur le commutateur correspondant sur le côté droit.

### Ajouter des règles de numérisation {#add-scanning-rules}

Une règle de numérisation détermine quelles informations sensibles doivent être recherchées dans les données définies par un groupe de numérisation. Vous pouvez ajouter des règles de numérisation prédéfinies à partir de la bibliothèque de règles de numérisation de Datadog ou créer vos propres règles en utilisant des expressions régulières (regex). Les données sont scannées au moment de l'ingestion pendant le traitement. Pour les journaux, cela signifie que la numérisation est effectuée avant l'indexation et d'autres décisions de routage.

Chaque fois que cela est possible, utilisez les règles de bibliothèque prêtes à l'emploi de Datadog. Ces règles sont des règles prédéfinies qui détectent des motifs courants tels que les adresses e-mail, les numéros de carte de crédit, les clés API, les jetons d'autorisation, les informations sur le réseau et les appareils, et plus encore. Chaque règle a des mots-clés recommandés pour le dictionnaire de mots-clés afin d'affiner la précision de la correspondance. Vous pouvez également [ajouter vos propres mots-clés](#add-custom-keywords).

Pour Terraform, consultez la ressource [règle du Scanner de Données Sensibles Datadog][6].


Pour ajouter des règles de numérisation, effectuez les étapes suivantes :

1. Accédez à la page des paramètres de [Sensitive Data Scanner][5].
1. Cliquez sur le groupe de numérisation où vous souhaitez ajouter les règles de numérisation.
1. Cliquez sur **Ajouter une Règle de Numérisation**. Alternativement, cliquez sur le menu déroulant **Ajouter** dans le coin supérieur droit de la page et sélectionnez **Ajouter une Règle de Numérisation**.
1. Sélectionnez si vous souhaitez ajouter une règle de bibliothèque ou créer une règle de numérisation personnalisée.

{{% collapse-content title="Ajouter des règles de bibliothèque" level="p" id="add-library-rules" %}}

La bibliothèque de règles de numérisation contient des règles prédéfinies pour détecter des motifs courants tels que les adresses e-mail, les numéros de carte de crédit, les clés API, les jetons d'autorisation, et plus encore.

1. Sélectionnez un groupe de numérisation si vous n'avez pas créé cette règle au sein d'un groupe de numérisation.
1. Dans le menu déroulant **Priorité**, sélectionnez le niveau de priorité pour la règle en fonction de vos besoins commerciaux.
1. Dans la section **Ajouter des règles de bibliothèque**, sélectionnez les règles de bibliothèque que vous souhaitez utiliser.
{{% sds-scanning-rule %}}
1. Cliquez sur **Ajouter des règles**.

#### Ajoutez des mots-clés personnalisés {#add-custom-keywords}

Les [mots-clés recommandés][15] sont utilisés par défaut lorsque des règles de bibliothèque sont ajoutées. Après avoir ajouté des règles de bibliothèque, vous pouvez modifier chaque règle séparément et ajouter ou supprimer des mots-clés du dictionnaire de mots-clés. Par exemple, si vous recherchez un numéro de carte de crédit Visa de seize chiffres, vous pouvez ajouter des mots-clés comme `visa`, `credit`, et `card`.

1. Accédez à la page des paramètres de [Sensitive Data Scanner][5].
1. Cliquez sur le groupe de numérisation contenant la règle que vous souhaitez modifier.
1. Survolez la règle, puis cliquez sur l'icône de crayon.
1. Dans la section **Conditions de correspondance**, cliquez sur **Mots-clés personnalisés**.
    - Pour ajouter des mots-clés, entrez un mot-clé et cliquez sur l'icône plus pour ajouter le mot-clé à la liste.
    - Pour supprimer des mots-clés, cliquez sur le **X** à côté du mot-clé que vous souhaitez supprimer.
    - Vous pouvez également exiger que ces mots-clés soient à l'intérieur d'un nombre spécifié de caractères d'une correspondance. Par défaut, les mots-clés doivent être à moins de 30 caractères avant une valeur correspondante.
    - Pour les événements structurés, les mots-clés sont également comparés aux noms d'attributs dans le chemin de l'événement. Les séparateurs tels que `-`, `_`, et `.` dans les noms d'attributs comptent comme des limites de mots, donc le mot-clé `card` correspond à un attribut nommé `card_number` ou `card-type`. La limite de caractères ne s'applique pas à la correspondance des noms d'attributs.
    - **Remarque** : Vous ne pouvez pas avoir plus de 20 mots-clés pour une règle.
1. Dans la section **Tapez ou collez les données d'événement pour tester la règle**, ajoutez des données d'événement pour évaluer votre règle et ajoutez des mots-clés pour affiner les conditions de correspondance.
1. Cliquez sur **Mettre à jour**.

#### Ajouter des suppressions {#add-suppressions}

{{% sds-suppressions %}}

{{% /collapse-content %}}
{{% collapse-content title="Ajouter une règle personnalisée" level="p" id="add-custom-rule"%}}
Vous pouvez créer des règles de numérisation personnalisées en utilisant des motifs regex pour rechercher des données sensibles.

1. Sélectionnez un groupe de numérisation si vous n'avez pas créé cette règle au sein d'un groupe de numérisation.
1. Entrez un nom pour la règle.
1. Dans le menu déroulant **Priorité**, sélectionnez le niveau de priorité pour la règle en fonction de vos besoins commerciaux.
1. (Optionnel) Entrez une description pour la règle.
1. Dans la section **Conditions de correspondance**, spécifiez le motif regex à utiliser pour la correspondance avec les événements dans le champ **Motif regex**. Définissez des motifs regex qui sont aussi précis que possible car des motifs génériques entraînent plus de faux positifs.<br>
    Le Scanner de Données Sensibles prend en charge les Expressions Régulières Compatibles Perl (PCRE), mais les motifs suivants ne sont pas pris en charge :
    - Références de retour et sous-expressions capturantes (lookarounds)
    - Assertions de largeur nulle arbitraires
    - Références de sous-routine et motifs récursifs
    - Motifs conditionnels
    - Verbes de contrôle du backtracking
    - La directive `\C` "single-byte" (qui casse les séquences UTF-8)
    - La `\R`correspondance de la nouvelle ligne
    - La `\K`directive de réinitialisation du début de correspondance
    - Appels et code intégré
    - Regroupement atomique et quantificateurs possessifs
1. Pour **vérifier le contexte de correspondance environnant pour les mots-clés afin de réduire le bruit**, ajoutez des mots-clés pour affiner la précision de détection lors de la correspondance des conditions regex. Par exemple, si vous recherchez un numéro de carte de crédit Visa de seize chiffres, vous pouvez ajouter des mots-clés comme `visa`, `credit` et `card`.
    - Pour ajouter des mots-clés, entrez un mot-clé et cliquez sur l'icône plus pour l'ajouter à la liste.
    - Pour supprimer des mots-clés, cliquez sur le **X** à côté du mot-clé que vous souhaitez supprimer.
    - Vous pouvez également exiger que ces mots-clés soient à l'intérieur d'un nombre spécifié de caractères d'une correspondance. Par défaut, les mots-clés doivent être à moins de 30 caractères avant une valeur correspondante.
    - Pour les événements structurés, les mots-clés sont également comparés aux noms d'attributs dans le chemin de l'événement. Les séparateurs tels que `-`, `_` et `.` dans les noms d'attributs comptent comme des limites de mots, donc le mot-clé `card` correspond à un attribut nommé `card_number` ou `card-type`. La limite de caractères ne s'applique pas à la correspondance des noms d'attributs.
      **Remarque** : Vous ne pouvez pas avoir plus de 20 mots-clés pour une règle.
{{% sds-suppressions %}}
1. Dans la section **Tapez ou collez des données d'événement pour tester la règle**, ajoutez des données d'événement pour évaluer votre règle et ajoutez des mots-clés pour affiner les conditions de correspondance.
{{% sds-scanning-rule %}}
1. Cliquez sur **Ajouter une règle**.

{{% /collapse-content %}}

**Remarques** :

- Toute règle que vous ajoutez ou mettez à jour n'affecte que les données entrant dans Datadog après que la règle a été définie.
- Le Scanner de données sensibles n'affecte aucune règle que vous définissez directement sur l'Agent Datadog.
- Après l'ajout des règles, assurez-vous que les boutons de bascule pour vos groupes de numérisation sont activés pour commencer l'analyse.
- Lorsque vous ajoutez des règles à un groupe de numérisation avec un échantillonnage activé, vous ne pourrez pas sélectionner les actions **redact**, **partially redact** ou **hash**. Pour une obfuscation complète, désactivez l'échantillonnage dans les paramètres de votre groupe de numérisation.

Voir [Investiguer les résultats de données sensibles][7] pour des détails sur le triage des données sensibles en utilisant la page [Résultats][8].

#### Espaces de noms exclus {#excluded-namespaces}

Il existe des mots-clés réservés que la plateforme Datadog nécessite pour son fonctionnement. Si l'un de ces mots se trouve dans un journal en cours de numérisation, les 30 caractères après le mot correspondant sont ignorés et ne sont pas masqués. Par exemple, ce qui vient après le mot `date` dans un journal est généralement l'horodatage de l'événement. Si l'horodatage est accidentellement masqué, cela entraînerait des problèmes de traitement du journal et de possibilité de le requêter plus tard. Par conséquent, le comportement pour les espaces de noms exclus est d'empêcher le masquage involontaire d'informations importantes pour la fonctionnalité du produit.

Les espaces de noms exclus sont :

{{% tabs %}}
{{% tab "Logs" %}}

- `host`
- `hostname`
- `syslog.hostname`
- `service`
- `status`
- `env`
- `dd.trace_id`
- `trace_id`
- `trace id`
- `dd.span_id`
- `span_id`
- `span id`
- `@timestamp`
- `timestamp`
- `_timestamp`
- `Timestamp`
- `date`
- `published_date`
- `syslog.timestamp`
- `error.fingerprint`
- `x-datadog-parent-id`

{{% /tab %}}
{{% tab "Spans" %}}

- `metrics._dd.`
- `metrics.dd.`
- `metrics._dd1.`
- `metrics.otel.trace_id`
- `metrics.otlp.`
- `metrics._sampling_priority_v1`
- `metrics._sample_rate`
- `meta._dd.`
- `meta.api.endpoint.`
- `meta.dd.`
- `meta_struct.dd.`
- `meta_struct._dd.`
- `meta_struct.api.endpoint.`
- `meta_struct.appsec.`
- `meta_struct.threat_intel.results.`
- `meta.otel.trace_id`
- `meta.otel.library.`
- `meta.otlp.`
- `trace_id`
- `span_id`
- `start`
- `timestamp`
- `end`
- `duration`
- `parent_id`
- `type`
- `resource`
- `resource_hash`
- `ingest_size_in_bytes`
- `ingestion_reason`
- `error`
- `flags`
- `status`
- `chunk_id`
- `host`
- `host_id`
- `hostname`
- `env`
- `service`
- `operation_name`
- `name`
- `version`
- `meta._dd.error_tracking`
- `meta.error.fingerprint`
- `meta.issue`

{{% /tab %}}
{{% tab "RUM" %}}

- `application.id`
- `session.id`
- `session.initial_view.id`
- `session.last_view.id`
- `view.id`
- `action.id`
- `resource.id`
- `geo`
- `error.fingerprint`
- `error.binary_images.uuid`
- `issue`
- `_dd.trace_id`
- `_dd.span_id`
- `_dd.usage_attribution_tag_names`
- `_dd.error.unminified_frames`
- `_dd.error.threads`

{{% /tab %}}
{{% /tabs %}}

#### Supprimer des correspondances spécifiques pour ignorer les données acceptées comme à risque {#suppress-specific-matches-to-ignore-risk-accepted-data}

Utilisez des suppressions pour ignorer les correspondances de données sensibles que vous considérez comme opérationnellement sûres (par exemple : domaines d'e-mail internes ou plages d'IP privées).

**Remarques** :
- Les correspondances supprimées ne sont ni rédigées, ni masquées, ni hachées.
- Les correspondances supprimées sont exclues de la page des résultats, des tableaux de bord, des alertes et d'autres flux de reporting.
- Les suppressions sont définies par règle au sein d'un groupe de scan.

#### Scanner ou exclure des attributs spécifiques {#scan-or-exclude-specific-attributes}

Pour rendre les correspondances plus précises, vous pouvez également faire l'une des choses suivantes :

- Scanner l'ensemble de l'événement mais exclure certains attributs de l'analyse. Par exemple, si vous scannez des informations personnellement identifiables (PII) comme des adresses physiques, vous voudrez peut-être exclure des attributs tels que `ip_address`.
- Scanner des attributs spécifiques pour réduire la portée des données analysées. Par exemple, si vous scannez des adresses physiques, vous pouvez choisir des attributs spécifiques tels que `street` et `city`.

**Remarque** : Ne pas utiliser le préfixe `@` dans le chemin d'attribut lors de la spécification des noms d'attributs. Par exemple, utilisez `function.request.body.password` au lieu de `@function.request.body.password`. Le préfixe `@` utilisé dans les requêtes de recherche et d'autres parties de Datadog n'est pas pris en charge dans ce champ.

### Modifier les règles de numérisation {#edit-scanning-rules}

Pour modifier les règles de numérisation :

1. Accédez à la page des paramètres du [Scanner de données sensibles][5].
1. Survolez la règle de numérisation que vous souhaitez modifier et cliquez sur l'icône **Modifier** (crayon).
1. Apportez les modifications souhaitées pour la règle. Selon le type de règle que vous modifiez, consultez [Ajouter des règles de bibliothèque](#add-library-rules) ou [Ajouter une règle personnalisée](#add-custom-rule) pour plus d'informations sur chaque section de configuration.
1. Cliquez sur **Mettre à jour**.

## Contrôlez l'accès aux journaux contenant des données sensibles {#control-access-to-logs-with-sensitive-data}

Pour contrôler qui peut accéder aux journaux contenant des données sensibles, utilisez les étiquettes ajoutées par le Scanner de données sensibles pour construire des requêtes avec un contrôle d'accès basé sur les rôles (RBAC). Vous pouvez restreindre l'accès à des individus ou des équipes spécifiques jusqu'à ce que les données deviennent obsolètes après la période de conservation. Consultez [Comment configurer le RBAC pour les journaux][9] pour plus d'informations.

### Masquer l'action {#mask-action}

{{% sds-mask-action %}}

## Redact sensitive data in tags {#redact-sensitive-data-in-tags}

Pour redact sensitive data contained in tags, vous devez [remapper][10] l'étiquette à un attribut puis redact l'attribut. Décochez `Preserve source attribute` dans le processeur de remappage afin que l'étiquette ne soit pas conservée lors du remappage.

Pour remapper l'étiquette à un attribut :

1. Accédez à votre [pipeline de journaux][11].
2. Cliquez sur **Ajouter un processeur**.
3. Sélectionnez **Remapper** dans le menu déroulant des types de processeurs.
4. Nommez le processeur.
5. Sélectionnez **la ou les clés de tag**.
6. Entrez la clé de tag.
7. Entrez un nom pour l'attribut auquel la clé de tag est remappée.
8. Désactivez **Préserver l'attribut source**.
9. Cliquez sur **Créer**.

Pour masquer l'attribut :

1. Naviguez vers votre [scanning group][5].
2. Cliquez sur **Add Scanning Rule**.
3. Cochez les règles de la bibliothèque que vous souhaitez utiliser.
4. Sélectionnez **Attributs spécifiques** pour **Numériser l'événement entier ou une partie de celui-ci**.
5. Entrez le nom de l'attribut que vous avez créé précédemment pour spécifier que vous souhaitez qu'il soit numérisé. **Remarque** : Ne pas utiliser le préfixe `@` dans le chemin de l'attribut. Par exemple, utilisez `function.request.body.password` au lieu de `@function.request.body.password`. 
6. Sélectionnez l'action que vous souhaitez lorsqu'il y a une correspondance.
7. Optionnellement, ajoutez des tags.
8. Cliquez sur **Ajouter des règles**.

## Journal de réhydratation {#log-rehydration}

Lorsque vous réhydratez des journaux d'une archive, le Sensitive Data Scanner ne re-scanne pas ces journaux. Au lieu de cela, Datadog restaure les journaux exactement tels qu'ils ont été écrits dans l'archive.

Si votre archive est configurée pour inclure [Datadog tags][16], et que vos scanning rules ont ajouté des tags lorsque les journaux ont été initialement ingérés et traités par le Sensitive Data Scanner, vous pouvez utiliser ces tags pour identifier quels journaux réhydratés contenaient précédemment des données sensibles. Cela vous permet de filtrer les journaux réhydratés en utilisant des requêtes telles que `sensitive_data:<rule_tag_name>`.

Les métadonnées des données sensibles correspondantes ne sont pas stockées dans les journaux archivés, donc les correspondances de données sensibles ne sont pas mises en évidence lorsque ces journaux sont réhydratés. Le format de l'archive contient uniquement la charge utile du journal original et tous les tags préservés. Il n'inclut pas les informations de position que le Sensitive Data Scanner utilise dans le Datadog UI pour mettre en évidence visuellement les valeurs détectées.

Ce que vous pouvez faire avec les journaux réhydratés :

- Si des tags ont été inclus dans l'archive, filtrez pour les journaux qui correspondaient précédemment aux règles de scan.
- Analysez les événements historiques contenant des données sensibles.

Ce que vous **ne pouvez** pas faire avec les journaux réhydratés :

- Affichez dans l'interface utilisateur les correspondances de données sensibles mises en évidence en ligne : les correspondances restent masquées, même si mask, redact, partially redact ou hash a été choisi comme action sur la correspondance.
- Déclenchez des analyses rétroactives : le Sensitive Data Scanner ne re-scanne pas les journaux réhydratés.

## Désactivez le Sensitive Data Scanner {#disable-sensitive-data-scanner}

Pour désactiver complètement le Sensitive Data Scanner, réglez le commutateur sur **off** pour chaque Scanning Group afin qu'ils soient désactivés.

## Lectures complémentaires {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/account_management/rbac/permissions/#compliance
[2]: /fr/account_management/rbac/
[3]: /fr/logs/explorer/search_syntax/
[4]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/sensitive_data_scanner_group
[5]: https://app.datadoghq.com/organization-settings/sensitive-data-scanner/configuration
[6]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/sensitive_data_scanner_rule
[7]: /fr/security/sensitive_data_scanner/guide/investigate_sensitive_data_findings/
[8]: https://app.datadoghq.com/sensitive-data-scanner/telemetry
[9]: /fr/logs/guide/logs-rbac/
[10]: /fr/logs/log_configuration/processors/remapper/
[11]: https://app.datadoghq.com/logs/pipelines
[12]: /fr/observability_pipelines/
[13]: /fr/observability_pipelines/processors/sensitive_data_scanner/
[14]: /fr/observability_pipelines/configuration/set_up_pipelines/
[15]: /fr/security/sensitive_data_scanner/scanning_rules/library_rules/
[16]: /fr/logs/log_configuration/archives/?tab=awss3#datadog-tags