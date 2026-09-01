---
aliases:
- /fr/security/cloud_security_management/setup/iac_scanning/
further_reading:
- link: /security/code_security
  tag: Documentation
  text: Code Security
- link: /security/code_security/iac_security
  tag: Documentation
  text: IaC Security
- link: /security/code_security/iac_security/configuration
  tag: Documentation
  text: Configurez IaC Security
- link: /security/code_security/iac_security/iac_rules/
  tag: Documentation
  text: Règles de IaC Security
title: Configurez IaC Security
---
Utilisez les instructions suivantes pour activer Infrastructure as Code (IaC) Security pour Code Security. IaC Security prend en charge plusieurs configurations IaC stockées dans des dépôts GitHub, GitLab ou Azure DevOps.

{{< tabs >}}
{{% tab "GitHub" %}}

### Installer l'intégration GitHub {#install-the-github-integration}

Pour connecter vos dépôts GitHub et activer les PR comments, consultez les instructions de configuration dans [Pull Request Comments][1].

### Activer IaC Security pour vos dépôts {#enable-iac-security-for-your-repositories}

Après avoir configuré l'intégration GitHub, activez IaC Security pour vos dépôts.

1. Sur la [Code Security Setup page][2], développez la section {{< ui >}}Activate scanning for your repositories{{< /ui >}}
1. Sous {{< ui >}}Select your source code management provider{{< /ui >}}, sélectionnez {{< ui >}}GitHub{{< /ui >}}.
1. Sous {{< ui >}}Select where your scans should run{{< /ui >}}, sélectionnez {{< ui >}}Datadog{{< /ui >}}.
1. Sous {{< ui >}}Connect your GitHub repositories{{< /ui >}}, effectuez l'une des opérations suivantes :
    - Pour connecter un nouveau compte GitHub, cliquez sur {{< ui >}}Add GitHub Account{{< /ui >}}.
    - Pour activer IaC Security pour un compte existant, cliquez sur {{< ui >}}Select repositories{{< /ui >}}, ou sur {{< ui >}}Edit{{< /ui >}} si Code Security est déjà activé.
1. Pour activer IaC Security, effectuez l'une des opérations suivantes :
    - Pour l'activer pour tous les dépôts, basculez {{< ui >}}Enable Infrastructure as Code Scanning (IaC){{< /ui >}} sur la position ON.
    - Pour l'activer pour un seul dépôt, basculez l'interrupteur {{< ui >}}IaC{{< /ui >}} sur ON pour ce dépôt.

[1]: /fr/security/code_security/dev_tool_int/pull_request_comments/?tab=github#set-up-pull-request-comments
[2]: https://app.datadoghq.com/security/configuration/code-security/setup

{{% /tab %}}
{{% tab "GitLab" %}}

### Installez l'intégration GitLab {#install-the-gitlab-integration}

Pour connecter vos dépôts GitLab et activer les PR comments, consultez les instructions de configuration dans [GitLab Source Code][1].

### Activer IaC Security pour vos dépôts {#enable-iac-security-for-your-repositories-1}

Après avoir configuré l'intégration GitLab, activez IaC Security pour vos dépôts.

1. Sur la [Code Security Setup page][2], développez la section {{< ui >}}Activate scanning for your repositories{{< /ui >}}
1. Sous {{< ui >}}Select your source code management provider{{< /ui >}}, sélectionnez {{< ui >}}GitLab{{< /ui >}}.
1. Sous {{< ui >}}Select where your scans should run{{< /ui >}}, sélectionnez {{< ui >}}Datadog{{< /ui >}}.
1. Sous {{< ui >}}Connect your GitLab repositories{{< /ui >}}, effectuez l'une des opérations suivantes :
    - Pour connecter une nouvelle instance GitLab, cliquez sur {{< ui >}}Connect GitLab Instance{{< /ui >}}.
    - Pour activer IaC Security pour un compte existant, cliquez sur {{< ui >}}Select repositories{{< /ui >}}, ou sur {{< ui >}}Edit{{< /ui >}} si Code Security est déjà activé.
1. Pour activer IaC Security, effectuez l'une des opérations suivantes :
    - Pour l'activer pour tous les dépôts, basculez {{< ui >}}Enable Infrastructure as Code Scanning (IaC){{< /ui >}} sur la position ON.
    - Pour l'activer pour un seul dépôt, basculez l'interrupteur {{< ui >}}IaC{{< /ui >}} sur ON pour ce dépôt.

[1]: /fr/integrations/gitlab-source-code/#setup
[2]: https://app.datadoghq.com/security/configuration/code-security/setup

{{% /tab %}}
{{% tab "Azure DevOps" %}}

### Installez l'intégration Azure DevOps {#install-the-azure-devops-integration}

Pour connecter vos dépôts Azure DevOps et activer les commentaires sur les PR, consultez les instructions de configuration dans [Azure DevOps Source Code][1].

### Activer IaC Security pour vos dépôts {#enable-iac-security-for-your-repositories-2}

Après avoir configuré l'intégration Azure DevOps, activez IaC Security pour vos dépôts.

1. Sur la [Code Security Setup page][2], développez la section {{< ui >}}Activate scanning for your repositories{{< /ui >}}
1. Sous {{< ui >}}Select your source code management provider{{< /ui >}}, sélectionnez {{< ui >}}Azure DevOps{{< /ui >}}.
1. Sous {{< ui >}}Select where your scans should run{{< /ui >}}, sélectionnez {{< ui >}}Datadog{{< /ui >}}.
1. Sous {{< ui >}}Connect your Azure DevOps repositories{{< /ui >}}, effectuez l'une des opérations suivantes :
    - Pour connecter une nouvelle organisation Azure DevOps, cliquez sur {{< ui >}}Connect Microsoft Entra App{{< /ui >}}.
    - Pour activer IaC Security pour un compte existant, cliquez sur {{< ui >}}Select repositories{{< /ui >}}, ou sur {{< ui >}}Edit{{< /ui >}} si Code Security est déjà activé.
1. Pour activer IaC Security, effectuez l'une des opérations suivantes :
    - Pour l'activer pour tous les dépôts, basculez {{< ui >}}Enable Infrastructure as Code Scanning (IaC){{< /ui >}} sur la position ON.
    - Pour l'activer pour un seul dépôt, basculez l'interrupteur {{< ui >}}IaC{{< /ui >}} sur ON pour ce dépôt.

[1]: /fr/integrations/azure-devops-source-code/#source-code-functionality
[2]: https://app.datadoghq.com/security/configuration/code-security/setup

{{% /tab %}}
{{< /tabs >}}

## Configurez IaC avec un fournisseur CI générique {#set-up-iac-with-a-generic-ci-provider}

### Overview {#overview}

Si vous n'utilisez pas GitHub Actions, GitLab CI/CD ou Azure DevOps, vous pouvez exécuter le [Datadog IaC Scanner][8] directement dans votre pipeline CI. Téléversez les résultats d'analyse IaC vers Datadog en utilisant le [`datadog-ci` CLI][9].

**Si vous exécutez IaC Security sur un dépôt non-GitHub**, exécutez la première analyse sur votre branche par défaut. Si votre branche par défaut utilise un nom autre que `master`, `main`, `default`, `stable`, `source`, `prod` ou `develop`, téléversez une première analyse pour votre dépôt. Ensuite, remplacez manuellement la branche par défaut dans [{{< ui >}}Repository Settings{{< /ui >}}][10] afin que les futures analyses provenant de branches non par défaut soient téléversées et traitées correctement.

### Prérequis {#prerequisites}

- Node.js 20 ou version ultérieure et npm
- `curl`
- `tar`
- Autorisation d'installer le scanner dans `/usr/local/bin`

Configurez les variables d'environnement suivantes :

| Nom         | Description                                                                                                                                                 | Requis | Par défaut         |
| ------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- | --------------- |
| `DD_API_KEY` | Votre clé d'API Datadog. Créez cette clé dans votre [organisation Datadog][4] et stockez-la en tant que secret.                                                     | Oui      |                 |
| `DD_APP_KEY` | Votre clé d'application. Créez cette clé dans votre [organisation Datadog][4] et incluez le périmètre `code_analysis_read`. Stockez la clé en tant que secret.              | Oui      |                 |
| `DD_SITE`    | Le [site Datadog][5] vers lequel envoyer les informations. Votre site Datadog est `datadoghq.com`.                                                                         | Non       | `datadoghq.com` |

Ajoutez ce qui suit à votre pipeline de CI :

```bash
# Set the Datadog site to send information to
export DD_SITE="datadoghq.com"

# Install dependencies
npm install -g @datadog/datadog-ci

# Download the latest Datadog IaC Scanner (x86_64/amd64 Linux; see GitHub Releases for arm64 and other platforms)
export IAC_SCANNER_URL="https://github.com/DataDog/datadog-iac-scanner/releases/latest/download/datadog-iac-scanner_linux_amd64.tar.gz"
curl -L "${IAC_SCANNER_URL}" -o /tmp/datadog-iac-scanner.tar.gz
tar xfz /tmp/datadog-iac-scanner.tar.gz -C /tmp
mv /tmp/datadog-iac-scanner /usr/local/bin/datadog-iac-scanner

# Run the Datadog IaC scanner
exit_code=0
/usr/local/bin/datadog-iac-scanner scan -p . -o /tmp || exit_code=$?
if [ $exit_code -lt 20 -o $exit_code -gt 60 ]; then echo "IaC scan failed" ; exit $exit_code ; fi

# Upload results
datadog-ci sarif upload /tmp/datadog-iac-scanner-result.sarif
```

<div class="alert alert-info">
  Cet exemple utilise la version Linux x86_64 (amd64) de Datadog IaC Scanner. Le scanner prend également en charge Linux arm64, ainsi que macOS et Windows. Si vous utilisez un système d'exploitation ou une architecture différent(e), sélectionnez la version appropriée sur la page <a href="https://github.com/DataDog/datadog-iac-scanner/releases">GitHub Releases</a> et mettez à jour la <code>IAC_SCANNER_URL</code> valeur.
</div>

## Téléversez les résultats d'analyse statique tiers vers IaC Security {#upload-third-party-static-analysis-results-to-iac-security}

<div class="alert alert-info">
  Vous pouvez importer des résultats SARIF provenant de scanners d'Infrastructure-as-Code (IaC) tiers, notamment Checkov, dans IaC Security. Voir <a href="https://docs.datadoghq.com/security/code_security/static_analysis/setup/?tab=github#upload-third-party-static-analysis-results-to-datadog">
  Téléversez les résultats d'analyse statique tiers</a> pour les outils compatibles SARIF pris en charge pour SAST. Node.js version 14 ou ultérieure est requis.
</div>

Pour importer un rapport SARIF, procédez comme suit :

1. Assurez-vous que les variables [`DD_API_KEY` et `DD_APP_KEY` sont définies][4].
2. Optionnellement, définissez une [`DD_SITE` variable][5] (la valeur par défaut est `datadoghq.com`).
3. Installez l'utilitaire `datadog-ci` (version 2.0 ou ultérieure) :

   ```bash
   npm install -g @datadog/datadog-ci
   ```

4. Exécutez l'outil d'analyse IaC tiers (par ex. Checkov, Trivy, KICS) sur votre code et exportez les résultats au format SARIF v2.1.0.
5. Téléversez les résultats vers Datadog :

   ```bash
   datadog-ci sarif upload $OUTPUT_LOCATION
   ```
   - Upload Options
       - `--tags:` Ajoutez des tags personnalisés (format : `key:value`)
       - `--max-concurrency:`Définissez les téléversements simultanés (par défaut : 20)
       - `--dry-run:`Validez sans téléverser
### Attributs SARIF requis {#required-sarif-attributes}
Pour garantir une ingestion et un affichage corrects dans Datadog IaC Scanning pour les scanners tiers (à l'exclusion de Checkov), votre fichier SARIF DOIT inclure les attributs suivants pour être reconnu comme un constat de sécurité IaC :
1. `Runs[...].tool.driver.name: Datadog IaC Scanning`
2. `Runs[...].tool.driver.version: "code_update"` ou `"full_scan"`
    - `"full_scan”` pour les analyses complètes du dépôt
    - `"code_update"` pour les analyses de demandes de tirage / incrémentielles
4. `Runs[...].tool.driver.rules[...].properties.tags:`
    - `["DATADOG_RULE_TYPE:IAC_SCANNING"]`
    - `[“DATADOG_SCANNED_FILE_COUNT: <number>”]`, où `"number"` spécifie le nombre de fichiers analysés 
5. `Runs[...].results[...].locations[...].physicalLocation:`
    - `artifactLocation.uri` : Chemin relatif vers le fichier depuis la racine du dépôt.
    - `region.startLine` : Numéro de ligne de début.
    - `region.endLine` : Numéro de ligne de fin.
    - `region.startColumn` : Numéro de colonne de début.
    - `region.endColumn` : Numéro de colonne de fin.
<div class="alert alert-info">Les suppressions ignorent silencieusement les violations. Si <code>results[ ].suppressions</code> Si elle existe, la violation est complètement ignorée.</div>

## Lectures complémentaires {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/integrations/github/#setup
[2]: https://app.datadoghq.com/security/configuration/code-security/setup
[3]: https://www.oasis-open.org/committees/tc_home.php?wg_abbrev=sarif
[4]: /fr/account_management/api-app-keys/
[5]: /fr/getting_started/site/
[6]: https://docs.datadoghq.com/fr/security/code_security/static_analysis/setup/?tab=github#upload-third-party-static-analysis-results-to-datadog
[7]: https://www.oasis-open.org/committees/tc_home.php?wg_abbrev=sarif
[8]: https://github.com/DataDog/datadog-iac-scanner
[9]: https://github.com/DataDog/datadog-ci?tab=readme-ov-file#sarif
[10]: https://app.datadoghq.com/source-code/repositories