---
algolia:
  tags:
  - static analysis
  - static analysis rules
  - static application security testing
  - SAST
aliases:
- /fr/continuous_integration/static_analysis
- /fr/static_analysis
- /fr/security/code_security/static_analysis/circleci_orbs/
- /fr/code_analysis/static_analysis/setup/
description: Découvrez l'analyse de code statique Datadog pour scanner le code à la
  recherche de problèmes de qualité et de vulnérabilités de sécurité avant que votre
  code n'atteigne la production.
is_beta: false
title: Configurez l'analyse de code statique (SAST)
---
{{% site-region region="gov,gov2" %}}
<div class="alert alert-warning">
    La sécurité du code n'est pas disponible pour le {{< region-param key="dd_site_name" >}} site.
</div>
{{% /site-region %}}

## Aperçu {#overview}
Pour configurer Datadog SAST dans l'application, accédez à [**Sécurité** > **Sécurité du code**][1].

## Sélectionnez où exécuter les analyses de code statique {#select-where-to-run-static-code-analysis-scans}
### Scannez avec le scan hébergé par Datadog {#scan-with-datadog-hosted-scanning}

Vous pouvez exécuter des analyses de code statique Datadog (SAST) directement sur l'infrastructure Datadog. Les types de dépôts pris en charge incluent :
- [GitHub][18] (à l'exclusion des dépôts utilisant [Git Large File Storage][17])
- [GitLab.com et GitLab auto-hébergé][20]
- [Azure DevOps][19]

Pour commencer, accédez à la page [**Sécurité du code**][1].

### Scannez dans les pipelines CI {#scan-in-ci-pipelines}
L'analyse de code statique Datadog s'exécute dans vos pipelines CI en utilisant le [`datadog-ci` CLI][8].

Tout d'abord, configurez vos clés API et d'application Datadog. Ajoutez `DD_APP_KEY` et `DD_API_KEY` en tant que secrets. Veuillez vous assurer que votre clé d'application Datadog a le scope `code_analysis_read`.

Ensuite, exécutez l'analyse de code statique en suivant les instructions pour votre fournisseur CI choisi ci-dessous.

{{< whatsnext desc="Voir les instructions en fonction de votre fournisseur CI :">}}
    {{< nextlink href="security/code_security/static_analysis/setup/github_actions" >}}GitHub Actions{{< /nextlink >}}
    {{< nextlink href="security/code_security/static_analysis/setup/generic_ci_providers" >}}Fournisseurs de CI génériques{{< /nextlink >}}
{{< /whatsnext >}}

## Sélectionnez votre fournisseur de gestion de code source {#select-your-source-code-management-provider}
L'analyse statique de code Datadog prend en charge tous les fournisseurs de gestion de code source, avec un support natif pour GitHub, GitLab et Azure DevOps.

{{< tabs >}}
{{% tab "GitHub" %}}

Configurez une application GitHub avec le [carreau d'intégration GitHub][1] et mettez en place l'[intégration de code source][2] pour activer les extraits de code en ligne et les [commentaires sur les demandes de tirage][3].

Lors de l'installation d'une application GitHub, les autorisations suivantes sont requises pour activer certaines fonctionnalités :

- `Content: Read`, ce qui vous permet de voir les extraits de code affichés dans Datadog
- `Pull Request: Read & Write`, ce qui permet à Datadog d'ajouter des commentaires pour les violations directement dans vos demandes de tirage en utilisant les [commentaires sur les demandes de tirage][3], ainsi que d'ouvrir des demandes de tirage pour [corriger les vulnérabilités][4]
- `Checks: Read & Write`, ce qui vous permet de créer des vérifications sur les violations SAST pour bloquer les demandes de tirage

[1]: /fr/integrations/github/#link-a-repository-in-your-organization-or-personal-account
[2]: /fr/integrations/guide/source-code-integration
[3]: /fr/security/code_security/dev_tool_int/github_pull_requests
[4]: /fr/security/code_security/dev_tool_int/

{{% /tab %}}
{{% tab "GitLab" %}}

Voir les [instructions de configuration du code source GitLab][1] pour connecter les dépôts GitLab à Datadog. Les instances GitLab.com et auto-hébergées sont prises en charge.

[1]: /fr/integrations/gitlab-source-code/#setup 

{{% /tab %}}
{{% tab "Azure DevOps" %}}

**Remarque :** Vos intégrations Azure DevOps doivent être connectées à un locataire Microsoft Entra. Azure DevOps Server n'est **pas** pris en charge.

Voir les [instructions de configuration du code source Azure][4] pour connecter les dépôts Azure DevOps à Datadog.

[1]: https://app.datadoghq.com/security/configuration/code-security/setup
[2]: https://portal.azure.com/#view/Microsoft_AAD_RegisteredApps/ApplicationsListBlade
[3]: https://app.datadoghq.com/organization-settings/api-keys
[4]: /fr/integrations/azure-devops-source-code/#setup
[5]: /fr/getting_started/site/

{{% /tab %}}
{{% tab "Other" %}}

Si vous utilisez un autre fournisseur de gestion de code source, configurez l'analyse statique de code pour s'exécuter dans vos pipelines CI en utilisant l'outil `datadog-ci` CLI et [ téléchargez les résultats](#upload-third-party-static-analysis-results-to-datadog) sur Datadog.
Vous **devez** exécuter une analyse de votre dépôt sur la branche par défaut avant que les résultats ne commencent à apparaître sur la page **Sécurité du code**.

{{% /tab %}}
{{< /tabs >}}

## Personnalisez votre configuration {#customize-your-configuration}

Par défaut, l'analyse statique de code Datadog (SAST) analyse vos dépôts avec les [ensembles de règles par défaut de Datadog][6] pour chaque langage de programmation. Vous pouvez personnaliser les ensembles de règles ou les règles qui s'exécutent, ainsi que d'autres paramètres, dans Datadog ou dans un fichier `code-security.datadog.yaml`. Pour la référence complète de configuration, voir [Configuration de l'analyse statique de code (SAST)][27].

## Liez les résultats aux services et équipes Datadog {#link-findings-to-datadog-services-and-teams}

{{% security-products/link-findings-to-datadog-services-and-teams %}}


## Analyse sensible aux différences {#diff-aware-scanning}

L'analyse sensible aux différences permet à l'analyseur statique de Datadog de ne scanner que les fichiers modifiés par un commit dans une branche de fonctionnalité. Cela accélère considérablement le temps de scan en évitant d'exécuter l'analyse sur chaque fichier du dépôt pour chaque scan. Pour activer l'analyse sensible aux différences dans votre pipeline CI, suivez ces étapes :

1. Assurez-vous que vos variables `DD_APP_KEY`, `DD_SITE` et `DD_API_KEY` sont définies dans votre pipeline CI.
2. Ajoutez un appel à `datadog-ci git-metadata upload` avant d'invoquer l'analyseur statique. Cette commande garantit que les métadonnées Git sont disponibles pour le backend Datadog. Les métadonnées Git sont nécessaires pour calculer le nombre de fichiers à analyser.
3. Assurez-vous que l'analyseur statique Datadog est invoqué avec le drapeau `--diff-aware`.

Exemple de séquence de commandes (ces commandes doivent être invoquées dans votre dépôt Git) :

```bash
datadog-ci git-metadata upload

datadog-static-analyzer -i /path/to/directory -g -o sarif.json -f sarif –-diff-aware <...other-options...>
```

**Remarque :** Lorsqu'un scan sensible aux différences ne peut pas être complété, l'ensemble du répertoire est scanné.

## Téléchargez les résultats d'analyse statique tiers sur Datadog {#upload-third-party-static-analysis-results-to-datadog}

<div class="alert alert-info">
  L'importation SARIF a été testée pour Snyk, CodeQL, Semgrep, Gitleaks et Sysdig. Contactez <a href="/help">le support Datadog</a> si vous rencontrez des problèmes avec d'autres outils conformes à SARIF.
</div>

Vous pouvez envoyer les résultats des outils d'analyse statique tiers à Datadog, à condition qu'ils soient au format interopérable [Format d'échange des résultats d'analyse statique (SARIF)][2]. La version 14 ou ultérieure de Node.js est requise.

Pour importer un rapport SARIF, procédez comme suit :

1. Assurez-vous que les [`DD_API_KEY` et `DD_APP_KEY` variables sont définies][4].
2. Optionnellement, définissez une [`DD_SITE` variable][7] (la valeur par défaut est `datadoghq.com`).
3. Installez l'utilitaire `datadog-ci` :

   ```bash
   npm install -g @datadog/datadog-ci
   ```

4. Exécutez l'outil d'analyse statique tiers sur votre code et exportez les résultats au format SARIF.
5. Téléchargez les résultats sur Datadog :

   ```bash
   datadog-ci sarif upload $OUTPUT_LOCATION
   ```

## Directives de support SARIF {#sarif-support-guidelines}

Datadog prend en charge l'ingestion de fichiers SARIF tiers conformes au [schéma SARIF 2.1.0][15]. Le SARIF
le schéma est utilisé différemment par les outils d'analyse statique. Si vous souhaitez envoyer des fichiers SARIF tiers à Datadog, veuillez
vous assurer qu'ils respectent les détails suivants :

 - L'emplacement de la violation est spécifié par l'objet `physicalLocation` d'un résultat.
    - Le `artifactLocation` et son `uri` **doivent être relatifs** à la racine du dépôt.
    - L'objet `region` est la partie du code mise en évidence dans l'interface utilisateur de Datadog.
 - Le `partialFingerprints` est utilisé pour identifier de manière unique une découverte dans un dépôt.
 - `properties` et `tags` ajoutent plus d'informations :
    - L'étiquette `DATADOG_CATEGORY` spécifie la catégorie de la découverte. Les valeurs acceptables sont `SECURITY`, `PERFORMANCE`, `CODE_STYLE`, `BEST_PRACTICES`, `ERROR_PRONE`.
    - Les violations annotées avec la catégorie `SECURITY` sont affichées dans l'explorateur de vulnérabilités et l'onglet Sécurité de la vue du dépôt.
 - La section `tool` doit avoir une section `driver` valide avec des attributs `name` et `version`.

Par exemple, voici un exemple d'un fichier SARIF traité par Datadog :


```json

{
    "runs": [
        {
            "results": [
                {
                    "level": "error",
                    "locations": [
                        {
                            "physicalLocation": {
                                "artifactLocation": {
                                    "uri": "missing_timeout.py"
                                },
                                "region": {
                                    "endColumn": 76,
                                    "endLine": 6,
                                    "startColumn": 25,
                                    "startLine": 6
                                }
                            }
                        }
                    ],
                    "message": {
                        "text": "timeout not defined"
                    },
                    "partialFingerprints": {
                        "DATADOG_FINGERPRINT": "b45eb11285f5e2ae08598cb8e5903c0ad2b3d68eaa864f3a6f17eb4a3b4a25da"
                    },
                    "properties": {
                        "tags": [
                            "DATADOG_CATEGORY:SECURITY",
                            "CWE:1088"
                        ]
                    },
                    "ruleId": "python-security/requests-timeout",
                    "ruleIndex": 0
                }
            ],
            "tool": {
                "driver": {
                    "informationUri": "https://www.datadoghq.com",
                    "name": "<tool-name>",
                    "rules": [
                        {
                            "fullDescription": {
                                "text": "Access to remote resources should always use a timeout and appropriately handle the timeout and recovery. When using `requests.get`, `requests.put`, `requests.patch`, etc. - we should always use a `timeout` as an argument.\n\n#### Learn More\n\n - [CWE-1088 - Synchronous Access of Remote Resource without Timeout](https://cwe.mitre.org/data/definitions/1088.html)\n - [Python Best Practices: always use a timeout with the requests library](https://www.codiga.io/blog/python-requests-timeout/)"
                            },
                            "helpUri": "https://link/to/documentation",
                            "id": "python-security/requests-timeout",
                            "properties": {
                                "tags": [
                                    "CWE:1088"
                                ]
                            },
                            "shortDescription": {
                                "text": "no timeout was given on call to external resource"
                            }
                        }
                    ],
                    "version": "<tool-version>"
                }
            }
        }
    ],
    "version": "2.1.0"
}
```

## Mapping de la sévérité SARIF à CVSS {#sarif-to-cvss-severity-mapping}

Le [format SARIF][15] définit quatre niveaux de sévérité : aucun, note, avertissement et erreur.
Cependant, Datadog signale les violations et la gravité des vulnérabilités en utilisant le [Système de notation des vulnérabilités communes][16] (CVSS),
qui définit cinq niveaux de gravité : critique, élevé, moyen, faible et aucun.

Lors de l'ingestion de fichiers SARIF, Datadog mappe les niveaux de gravité SARIF aux niveaux de gravité CVSS en utilisant les règles de correspondance ci-dessous.


| Niveau de gravité SARIF | Niveau de gravité CVSS |
|----------------|---------------|
| Erreur          | Critique      |
| Avertissement    | Élevé        |
| Remarque        | Moyen        |
| Aucun          | Faible       |

## Conservation des données {#data-retention}

Datadog stocke les résultats conformément à nos [Périodes de conservation des données](https://docs.datadoghq.com/fr/data_security/data_retention_periods/). Datadog ne stocke ni ne conserve le code source des clients.

## <!-- Lectures complémentaires

{{< partial name="whats-next/whats-next.html" >}} -->

[1]: https://app.datadoghq.com/security/configuration/code-security/setup
[2]: https://www.oasis-open.org/committees/tc_home.php?wg_abbrev=sarif
[3]: /fr/ide_plugins/idea/#static-analysis
[4]: /fr/account_management/api-app-keys/
[6]: /fr/security/code_security/static_analysis/static_analysis_rules
[7]: /fr/getting_started/site/
[8]: https://github.com/DataDog/datadog-ci
[9]: /fr/integrations/github/#link-a-repository-in-your-organization-or-personal-account
[10]: /fr/integrations/guide/source-code-integration
[11]: /fr/security/code_security/dev_tool_int/github_pull_requests
[12]: /fr/security/code_security/dev_tool_int/github_pull_requests#fixing-a-vulnerability-directly-from-datadog
[13]: https://docs.github.com/en/actions/security-for-github-actions/security-guides
[15]: https://docs.oasis-open.org/sarif/sarif/v2.1.0/sarif-v2.1.0.html
[16]: https://www.first.org/cvss/
[17]: https://docs.github.com/en/repositories/working-with-files/managing-large-files/about-git-large-file-storage
[18]: /fr/security/code_security/static_analysis/setup/?tab=github#select-your-source-code-management-provider
[19]: /fr/security/code_security/static_analysis/setup/?tab=azuredevops#select-your-source-code-management-provider
[20]: /fr/security/code_security/static_analysis/setup/?tab=gitlab#select-your-source-code-management-provider
[22]: https://docs.datadoghq.com/fr/internal_developer_portal/software_catalog/entity_model/?tab=v30#migrating-to-v30
[24]: https://docs.datadoghq.com/fr/account_management/teams/
[25]: https://github.com/DataDog/datadog-static-analyzer/blob/main/doc/legacy_config.md
[27]: /fr/security/code_security/static_analysis/configuration/
[101]: https://docs.datadoghq.com/fr/software_catalog/service_definitions/v3-0/
[102]: https://docs.datadoghq.com/fr/internal_developer_portal/software_catalog/entity_model/?tab=v30#codelocations
[103]: https://docs.datadoghq.com/fr/data_security/data_retention_periods/