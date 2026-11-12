---
algolia:
  tags:
  - static analysis
  - ci pipeline
  - SAST
  - secret scanning
description: Utilisez l'analyse statique de secrets Datadog Static Secret Scanning
  pour analyser le code de pré-production à la recherche de problèmes de qualité et
  de vulnérabilités de sécurité.
is_beta: true
title: Secret Scanning avec des fournisseurs CI génériques
---
{{% site-region region="gov,gov2" %}}
<div class="alert alert-warning">
    Secret Scanning n'est pas disponible pour le site {{< region-param key="dd_site_name" >}} .
</div>
{{% /site-region %}}


Si vous n'utilisez pas [GitHub Actions][5] pour configurer Secret Scanning, vous pouvez exécuter directement le CLI [Datadog CI][4] dans votre plateforme de pipeline CI et téléverser les rapports au format SARIF (Static Analysis Results Interchange Format) vers Datadog.

<div class="alert alert-info"><a href="/security/code_security/secret_scanning/#detect-secrets-in-git-history">L'analyse de l'historique Git</a> est disponible uniquement avec l'analyse hébergée. Les analyses basées sur CI analysent le commit extrait.</div>

Prérequis :

- unzip
- Node.js 14 ou version ultérieure

Configurez les variables d'environnement suivantes :

| Nom         | Description                                                                                                                | Requis | Par défaut         |
|--------------|----------------------------------------------------------------------------------------------------------------------------|----------|-----------------|
| `DD_API_KEY` | Votre clé d'API Datadog. Cette clé est créée par votre [organisation Datadog][1] et doit être stockée en tant que secret.            | Oui      |                 |
| `DD_APP_KEY` | Votre clé d'application Datadog. Cette clé est créée par votre [organisation Datadog][2], doit inclure le périmètre `code_analysis_read` et être stockée en tant que secret.  | Oui      |                 |
| `DD_SITE`    | Le [site Datadog][3] vers lequel envoyer les informations. Votre site Datadog est {{< region-param key="dd_site" code="true" >}}.       | Non       | `datadoghq.com` |


Sélectionnez un analyseur pour votre architecture et votre système d'exploitation parmi les options suivantes :

| Architecture | Système d'exploitation        | Nom                                                    | Lien                                                                                                                                          |
|--------------|-----------|---------------------------------------------------------| ----------------------------------------------------------------------------------------------------------------------------------------------|
| `aarch64`    | `Darwin`  | `datadog-static-analyzer-aarch64-apple-darwin.zip`      | [Download](https://github.com/DataDog/datadog-static-analyzer/releases/latest/download/datadog-static-analyzer-aarch64-apple-darwin.zip)      |
| `aarch64`    | `Linux`   | `datadog-static-analyzer-aarch64-unknown-linux-gnu.zip` | [Download](https://github.com/DataDog/datadog-static-analyzer/releases/latest/download/datadog-static-analyzer-aarch64-unknown-linux-gnu.zip) |
| `x86_64`     | `Darwin`  | `datadog-static-analyzer-x86_64-apple-darwin.zip`       | [Download](https://github.com/DataDog/datadog-static-analyzer/releases/latest/download/datadog-static-analyzer-x86_64-apple-darwin.zip)       |
| `x86_64`     | `Linux`   | `datadog-static-analyzer-x86_64-unknown-linux-gnu.zip`  | [Download](https://github.com/DataDog/datadog-static-analyzer/releases/latest/download/datadog-static-analyzer-x86_64-unknown-linux-gnu.zip)  |
| `x86_64`     | `Windows` | `datadog-static-analyzer-x86_64-pc-windows-msvc.zip`    | [Download](https://github.com/DataDog/datadog-static-analyzer/releases/latest/download/datadog-static-analyzer-x86_64-pc-windows-msvc.zip)    |

Ajoutez ce qui suit à votre pipeline de CI :

```bash
# Set the Datadog site to send information to
export DD_SITE="datadoghq.com"
export DD_API_KEY=<YOUR-API-KEY>
export DD_APP_KEY=<YOUR-APP-KEY>

# Install dependencies
npm install -g @datadog/datadog-ci

# Download the latest Datadog static analyzer:
# https://github.com/DataDog/datadog-static-analyzer/releases
DATADOG_STATIC_ANALYZER_URL=https://github.com/DataDog/datadog-static-analyzer/releases/latest/download/datadog-static-analyzer-x86_64-unknown-linux-gnu.zip
curl -L $DATADOG_STATIC_ANALYZER_URL > /tmp/ddog-static-analyzer.zip
unzip /tmp/ddog-static-analyzer.zip -d /tmp
mv /tmp/datadog-static-analyzer /usr/local/datadog-static-analyzer

# Run Static Code Analysis
/usr/local/datadog-static-analyzer -i . -o /tmp/report.sarif -f sarif --enable-secrets true --enable-static-analysis false

# Upload results
datadog-ci sarif upload /tmp/report.sarif
```

<div class="alert alert-info">
  Cet exemple utilise la version Linux x86_64 de l'analyseur statique de secrets de Datadog pour Secret Scanning. Si vous utilisez un système d'exploitation ou une architecture différente, vous devez le sélectionner dans le tableau ci-dessus et mettre à jour le <code>DATADOG_STATIC_ANALYZER_URL</code> valeur. Vous pouvez consulter toutes les versions sur la page <a href="https://github.com/DataDog/datadog-static-analyzer/releases">GitHub Releases</a>.
</div>


[1]: /fr/account_management/api-app-keys/#api-keys
[2]: /fr/account_management/api-app-keys/#application-keys
[3]: /fr/getting_started/site/
[4]: https://github.com/DataDog/datadog-ci?tab=readme-ov-file#sarif
[5]: /fr/security/code_security/secret_scanning/github_actions/