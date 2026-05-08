---
algolia:
  tags:
  - software composition analysis
  - ci pipeline
  - SCA
description: Découvrez comment exécuter la CLI Datadog directement dans votre pipeline
  CI pour configurer des variables d'environnement, installer des dépendances et analyser
  le code afin de détecter les problèmes de qualité et de sécurité avant le déploiement
  en production.
further_reading:
- link: https://www.datadoghq.com/blog/monitor-ci-pipelines/
  tag: Blog
  text: Surveiller tous vos pipelines CI avec Datadog
is_beta: false
title: Fournisseurs de CI génériques
---

{{< callout url="#" btn_hidden="true" header="Profitez de l'aperçu !" >}}
L'aperçu de Code Analysis est disponible.
{{< /callout >}}

{{% site-region region="gov" %}}
<div class="alert alert-danger">
    Code Analysis n'est pas disponible pour le site {{< region-param key="dd_site_name" >}}.
</div>
{{% /site-region %}}

## Présentation

Si vous n'utilisez pas GitHub Actions, vous pouvez exécuter la CLI Datadog directement dans votre plateforme de pipeline CI.

Prérequis :

- unzip
- Node.js 14 ou version ultérieure

Configurez les variables d'environnement suivantes :

| Nom         | Rôle                                                                                                                | Obligatoire | Valeur par défaut         |
|--------------|----------------------------------------------------------------------------------------------------------------------------|----------|-----------------|
| `DD_API_KEY` | Votre clé d'API Datadog. Cette clé est créée par votre [organisation Datadog][1]. Elle doit être stockée sous la forme d'un secret.            | Oui      |                 |
| `DD_APP_KEY` | Votre clé d'application Datadog. Cette clé, créée par votre [organisation Datadog][2], doit inclure la portée `code_analysis_read` et être stockée en tant que secret.    | Oui      |                 |
| `DD_SITE`    | Le [site Datadog][3] auquel envoyer les informations. Votre site Datadog est {{< region-param key="dd_site" code="true" >}}.       | Non       | `datadoghq.com` |

Fournissez les entrées suivantes :

| Nom           | Rôle                                                                                                                | Obligatoire | Valeur par défaut         |
|----------------|----------------------------------------------------------------------------------------------------------------------------|----------|-----------------|
| `service`      | Le nom du service avec lequel taguer les résultats.                                                                           | Oui      |                 |
| `env`          | L'environnement avec lequel taguer les résultats. `ci` est une valeur utile pour cette entrée.                                           | Non       | `none`          |
| `subdirectory` | Le chemin du sous-répertoire auquel l'analyse doit être limitée. Le chemin est relatif au répertoire racine du référentiel.                  | Non       |                 |

```bash
# Set the Datadog site to send information to
export DD_SITE="{{< region-param key="dd_site" code="true" >}}"

# Install dependencies
npm install -g @datadog/datadog-ci

# Download the latest Datadog OSV Scanner:
# https://github.com/DataDog/osv-scanner/releases
DATADOG_OSV_SCANNER_URL=https://github.com/DataDog/osv-scanner/releases/latest/download/osv-scanner_linux_amd64.zip

# Install OSV Scanner
mkdir /osv-scanner
curl -L -o /osv-scanner/osv-scanner.zip $DATADOG_OSV_SCANNER_URL
unzip /osv-scanner/osv-scanner.zip -d /osv-scanner
chmod 755 /osv-scanner/osv-scanner

# Run OSV Scanner and scan your dependencies
/osv-scanner/osv-scanner --skip-git -r --experimental-only-packages --format=cyclonedx-1-5 --paths-relative-to-scan-dir  --output=/tmp/sbom.json /path/to/repository

# Upload results to Datadog
datadog-ci sbom upload /tmp/sbom.json
```

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/account_management/api-app-keys/#api-keys
[2]: /fr/account_management/api-app-keys/#application-keys
[3]: /fr/getting_started/site/