---
algolia:
  tags:
  - static analysis
  - ci pipeline
  - SAST
description: Découvrez comment la fonctionnalité Static Analysis de Datadog vous permet
  de détecter les problèmes de qualité ainsi que les vulnérabilités de sécurité de
  votre code avant qu'il ne soit déployé en production.
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

Si vous n'utilisez pas CircleCI Orbs ou GitHub Actions, vous pouvez exécuter la CLI Datadog directement dans votre plateforme de pipeline CI.

Prérequis :

- unzip
- Node.js 14 ou version ultérieure

Configurez les variables d'environnement suivantes :

| Nom         | Description                                                                                                                | Obligatoire | Valeur par défaut         |
|--------------|----------------------------------------------------------------------------------------------------------------------------|----------|-----------------|
| `DD_API_KEY` | Votre clé API Datadog. Cette clé est créée par votre [organisation Datadog][1] et doit être stockée en tant que secret.            | Oui      |                 |
| `DD_APP_KEY` | Votre clé d'application Datadog. Cette clé, créée par votre [organisation Datadog][2], doit inclure la portée `code_analysis_read` et être stockée en tant que secret.  | Oui      |                 |
| `DD_SITE`    | Le [site Datadog][3] auquel envoyer les informations. Votre site Datadog est {{< region-param key="dd_site" code="true" >}}.       | Non       | `datadoghq.com` |

Fournissez les entrées suivantes :

| Nom           | Description                                                                                                                | Obligatoire | Valeur par défaut         |
|----------------|----------------------------------------------------------------------------------------------------------------------------|----------|-----------------|
| `service`      | Le nom du service avec lequel taguer les résultats.                                                                           | Oui      |                 |
| `env`          | L'environnement avec lequel taguer les résultats. `ci` est une valeur utile pour cette entrée.                                           | Non       | `none`          |
| `cpu_count`    | Définir le nombre de CPU utilisés par l'analyseur. Par défaut, correspond au nombre de CPU disponibles.                                     | Non       |                 |
| `subdirectory` | Le chemin du sous-répertoire auquel l'analyse doit être limitée. Le chemin est relatif au répertoire racine du référentiel.                  | Non       |                 |

Pour obtenir des statistiques de temps d'exécution pour les fichiers analysés, ajoutez un flag `--performance-statistics` à votre commande d'analyse statique.

Sélectionnez un analyseur pour votre architecture et votre système d'exploitation parmi les options suivantes :

| Architecture | Système d'exploitation        | Nom                                                    | Lien                                                                                                                                          |
|--------------|-----------|---------------------------------------------------------| ----------------------------------------------------------------------------------------------------------------------------------------------|
| `aarch64`    | `Darwin`  | `datadog-static-analyzer-aarch64-apple-darwin.zip`      | [Télécharger](https://github.com/DataDog/datadog-static-analyzer/releases/latest/download/datadog-static-analyzer-aarch64-apple-darwin.zip)      |
| `aarch64`    | `Linux`   | `datadog-static-analyzer-aarch64-unknown-linux-gnu.zip` | [Télécharger](https://github.com/DataDog/datadog-static-analyzer/releases/latest/download/datadog-static-analyzer-aarch64-unknown-linux-gnu.zip) |
| `x86_64`     | `Darwin`  | `datadog-static-analyzer-x86_64-apple-darwin.zip`       | [Télécharger](https://github.com/DataDog/datadog-static-analyzer/releases/latest/download/datadog-static-analyzer-x86_64-apple-darwin.zip)       |
| `x86_64`     | `Linux`   | `datadog-static-analyzer-x86_64-unknown-linux-gnu.zip`  | [Télécharger](https://github.com/DataDog/datadog-static-analyzer/releases/latest/download/datadog-static-analyzer-x86_64-unknown-linux-gnu.zip)  |
| `x86_64`     | `Windows` | `datadog-static-analyzer-x86_64-pc-windows-msvc.zip`    | [Télécharger](https://github.com/DataDog/datadog-static-analyzer/releases/latest/download/datadog-static-analyzer-x86_64-pc-windows-msvc.zip)    |

Ajoutez ce qui suit à votre pipeline CI :

```bash
# Set the Datadog site to send information to
export DD_SITE="datadoghq.com"

# Install dependencies
npm install -g @datadog/datadog-ci

# Download the latest Datadog static analyzer:
# https://github.com/DataDog/datadog-static-analyzer/releases
DATADOG_STATIC_ANALYZER_URL=https://github.com/DataDog/datadog-static-analyzer/releases/latest/download/datadog-static-analyzer-x86_64-unknown-linux-gnu.zip
curl -L $DATADOG_STATIC_ANALYZER_URL > /tmp/ddog-static-analyzer.zip
unzip /tmp/ddog-static-analyzer.zip -d /tmp
mv /tmp/datadog-static-analyzer /usr/local/datadog-static-analyzer

# Run Static Analysis
/usr/local/datadog-static-analyzer -i . -o /tmp/report.sarif -f sarif

# Upload results
datadog-ci sarif upload /tmp/report.sarif
```

<div class="alert alert-info">
  Cet exemple utilise la version x86_64 Linux de l'analyseur statique Datadog. Si vous utilisez un autre système d'exploitation ou une autre architecture, vous devez le sélectionner dans le tableau ci-dessus et mettre à jour la valeur <code>DATADOG_STATIC_ANALYZER_URL</code> ci-dessous. Vous pouvez consulter toutes les versions sur la page <a href="https://github.com/DataDog/datadog-static-analyzer/releases">GitHub Releases</a>.
</div>

## Analyse différentielle

L'analyse différentielle est une fonctionnalité qui permet à Datadog Static Analysis d'analyser uniquement les fichiers modifiés par un commit dans une branche de fonctionnalité. Elle accélère considérablement le temps d'analyse en évitant d'exécuter l'analyse sur tous les fichiers du référentiel à chaque analyse. La première analyse effectuée, ainsi que les analyses de branche par défaut, produisent toujours une analyse du référentiel complet (non différentielle).

Si vous utilisez GitHub Actions, l'analyse différentielle est activée par défaut.

Pour les autres fournisseurs CI, suivez ces étapes pour activer l'analyse différentielle :

1. Assurez-vous que vos variables `DD_APP_KEY`, `DD_SITE` et `DD_API_KEY` sont définies dans votre pipeline CI.
2. Ajoutez un appel à `datadog-ci git-metadata upload` avant d'invoquer l'analyseur statique. Cette commande garantit que les métadonnées Git sont disponibles pour le backend Datadog. Les métadonnées Git sont nécessaires pour calculer le nombre de fichiers à analyser.
3. Assurez-vous que datadog-static-analyzer est invoqué avec le flag `--diff-aware`.

Exemple de séquence de commandes (ces commandes doivent être invoquées dans votre référentiel Git) :
```bash
datadog-ci git-metadata upload

datadog-static-analyzer -i /path/to/directory -g -o sarif.json -f sarif –-diff-aware <...other-options...>
```

**Remarque :** lorsqu'une analyse différentielle ne peut pas être effectuée, l'intégralité du répertoire est analysée.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/account_management/api-app-keys/#api-keys
[2]: /fr/account_management/api-app-keys/#application-keys
[3]: /fr/getting_started/site/