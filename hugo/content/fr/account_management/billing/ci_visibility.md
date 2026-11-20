---
algolia:
  tags:
  - ci visibility
  - ci visibility billing
  - ci visibility billing questions
  - ci visibility pricing
  - test optimization billing
  - test optimization pricing
further_reading:
- link: /continuous_integration/pipelines
  tag: Documentation
  text: En savoir plus sur Pipeline Visibility
- link: /continuous_integration/guides/ingestion_control
  tag: Documentation
  text: En savoir plus sur Ingestion Controls pour CI Visibility
- link: /tests/
  tag: Documentation
  text: En savoir plus sur Test Optimization
title: Facturation de CI/CD Optimization
---
## Présentation {#overview}

Ce guide fournit une liste non exhaustive des éléments à prendre en compte pour la facturation de CI/CD Optimization, qui comprend [CI Visibility][1] et [Test Optimization][7].

## Comptage des contributeurs {#counting-committers}

Un contributeur est une personne qui contribue activement à un dépôt Git, identifiée par son adresse e-mail d'auteur Git. À des fins de facturation, un contributeur est inclus s'il effectue au moins trois commits au cours d'un mois donné.

## Facturation des commits effectués par des bots ou des actions effectuées dans l'interface utilisateur GitHub {#billing-for-commits-made-by-bots-or-actions-performed-in-the-github-ui}

Les commits effectués par des bots vérifiés ou via des actions effectuées directement dans l'interface utilisateur GitHub ne sont pas facturés par Datadog. Ils sont automatiquement exclus des calculs de facturation. Seuls les bots vérifiés sont exclus de la facturation.

## Exclure les commits de personnes spécifiques {#excluding-commits-from-specific-people}

Oui, vous pouvez exclure les commits de personnes spécifiques en utilisant des [filtres d'exclusion][2].

## Enrichissement de la facturation {#billing-enrichment}

L'enrichissement de la facturation corrèle vos métriques de contributeurs facturables avec les données d'un [tableau de référence][5], en utilisant l'adresse e-mail du contributeur comme clé de jointure. Cela ajoute des tags tels que `vp_name` ou `director_name` à vos données de facturation, afin que vous puissiez ventiler les données de facturation par structure organisationnelle.

Pour configurer l'enrichissement de la facturation :

1. Créez un [tableau de référence][5] qui contient une colonne avec les adresses e-mail des contributeurs, ainsi que toute colonne supplémentaire que vous souhaitez exposer en tant que tags (telle que `vp_name`).
2. Dans Datadog, accédez à [{{< ui >}}CI/CD Optimization{{< /ui >}} > {{< ui >}}Billing & Committers{{< /ui >}}][6].
3. Activez {{< ui >}}Enrich billing metrics{{< /ui >}}.
4. Sélectionnez le {{< ui >}}Reference table{{< /ui >}} à utiliser.
5. Sélectionnez le {{< ui >}}Email key column{{< /ui >}} : la colonne du tableau de référence qui contient l'adresse e-mail du contributeur. Datadog utilise cette colonne pour associer les données de facturation au tableau de référence.
6. Sélectionnez le {{< ui >}}Enrichment columns{{< /ui >}} : les colonnes du tableau de référence à exposer en tant que tags sur les métriques de facturation. Laissez vide pour inclure toutes les colonnes.

Une fois l'enrichissement de la facturation configuré, les tags supplémentaires du tableau de référence apparaissent aux côtés de vos métriques de contributeurs facturables existantes.

## Déduplication des contributeurs utilisant plusieurs adresses e-mail {#deduplicating-committers-across-email-addresses}

Dans certains cas, les commits d'un même développeur peuvent être répartis entre plusieurs adresses e-mail d'auteur Git. Par exemple, un développeur peut définir une adresse e-mail différente avec `git config user.email` dans différents dépôts. Si plusieurs de ces adresses e-mail atteignent le seuil de facturation de trois commits décrit ci-dessus, chacune est comptabilisée comme un contributeur distinct.

Pour les dépôts hébergés sur GitHub, Datadog peut mapper chaque adresse e-mail d'auteur Git à l'utilisateur GitHub sous-jacent afin que le développeur ne soit compté qu'une seule fois, même lorsqu'il effectue des push avec des adresses e-mail différentes. Cela nécessite l'installation de la [GitHub App][3] Datadog sur les dépôts concernés avec l'autorisation `Contents: Read`.

Ce mappage est disponible uniquement pour les dépôts GitHub. Les dépôts hébergés sur GitLab, Azure DevOps ou Bitbucket ne sont pas dédoublonnés.

Si votre nombre de contributeurs semble plus élevé que prévu pour les dépôts GitHub, vérifiez que le Datadog [GitHub App] est installé sur ces dépôts avec l'autorisation `Contents: Read`. Vous pouvez consulter votre installation depuis la [tuile d'intégration GitHub][4].

## Comptage des spans de test {#counting-test-spans}

Dans Test Optimization, chaque exécution de test individuelle compte comme un span de test, à l'exception des spans de test générés par les fonctionnalités de Test Optimization. Les spans de test n'affectent votre facture que lorsque votre utilisation dépasse le quota de spans de test inclus pour chaque contributeur dans votre plan.

### Spans de test générés par les fonctionnalités de Test Optimization {#test-spans-generated-by-test-optimization-features}

Certaines fonctionnalités de Test Optimization exécutent des tests ou transmettent leurs résultats en votre nom. Les spans de test générés par ces fonctionnalités ne sont pas comptabilisés comme des spans de test facturables :

- Nouvelles tentatives générées par [Auto Test Retries][8], [Early Flake Detection][9] et le flux de remédiation [Attempt to Fix][10]. La première exécution du test est facturée, mais les nouvelles tentatives ajoutées par la fonctionnalité ne le sont pas.
- Tests ignorés par [Test Impact Analysis][11].

Ces spans de test sont tout de même ingérés et indexés. Vous pouvez les rechercher et les analyser dans le [Test Optimization Explorer][12] comme n'importe quel autre span de test.

Les spans de test suivants sont facturés :

- Nouvelles tentatives configurées dans votre framework de test.
- Tests que vous ignorez dans votre code ou la configuration de votre framework de test.

Ces exceptions ne modifient pas la façon dont les contributeurs sont comptabilisés.

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/continuous_integration/pipelines
[2]: /fr/continuous_integration/guides/ingestion_control
[3]: /fr/integrations/github/
[4]: https://app.datadoghq.com/integrations/github/
[5]: /fr/reference_tables/
[6]: https://app.datadoghq.com/ci/settings/ci-cd/billing-committers
[7]: /fr/tests/
[8]: /fr/tests/flaky_tests/auto_test_retries/
[9]: /fr/tests/flaky_tests/early_flake_detection/
[10]: /fr/tests/flaky_management/#confirm-fixes-for-flaky-tests
[11]: /fr/tests/test_impact_analysis/
[12]: /fr/tests/explorer/