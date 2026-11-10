---
description: Empêchez les paquets malveillants d'atteindre vos runners CI/CD grâce
  à la GitHub Action de Datadog pour Supply Chain Firewall.
disable_toc: false
further_reading:
- link: /security/code_security/#supply-chain-security-preview
  tag: Documentation
  text: Supply Chain Security
- link: https://securitylabs.datadoghq.com/articles/introducing-supply-chain-firewall/
  tag: Blog
  text: 'Présentation de Supply Chain Firewall : protéger les développeurs contre
    les paquets open source malveillants'
- link: https://www.datadoghq.com/blog/supply-chain-firewall-code-security/
  tag: Blog
  text: Bloquez les paquets malveillants dans toute votre organisation avec Supply
    Chain Firewall et Datadog Code Security
is_beta: true
title: Supply Chain Firewall GitHub Action
---
La Supply Chain Firewall GitHub Action installe [Supply Chain Firewall][1] (SCFW) de Datadog et le configure pour intercepter les commandes des gestionnaires de paquets pris en charge dans toutes les étapes ultérieures du workflow. Lorsqu'il est actif, le SCFW inspecte chaque commande de gestionnaire de paquets prise en charge avant de l'autoriser à s'exécuter.

<div class="alert alert-info">Cette action prend uniquement en charge les runners Linux et macOS.</div>

## Utilisation {#usage}

```yaml
steps:
  - uses: actions/checkout@9c091bb21b7c1c1d1991bb908d89e4e9dddfe3e0 # v7.0.0

  - uses: DataDog/supply-chain-firewall-action@2f166ae1d2c34ed717d7b08427c7acb57804f3f5 # v1.0.0
    with:
      version: '3.1.0'
      package-managers: npm,pip

  # npm and pip commands are inspected by SCFW before they run.
  # Flagged packages are blocked; other installs proceed normally.
  - run: pip install -r requirements.txt
  - run: npm install
```

### Configurez l'intégration Supply Chain Security {#configure-the-supply-chain-security-integration}

{{< callout url=https://docs.google.com/forms/d/1Xqh5h1n3-jC7au2t30fdTq732dkTJqt_cb7C7T-AkPc/viewform?edit_requested=true
 btn_hidden="false" header="Rejoignez la Preview !">}}
Utilisez ce formulaire pour soumettre votre demande de participation à l'aperçu de Supply Chain Security.
{{< /callout >}}

```yaml
steps:
  - uses: DataDog/supply-chain-firewall-action@2f166ae1d2c34ed717d7b08427c7acb57804f3f5 # v1.0.0
    with:
      dd-codesec-logger: 'true'
      dd-api-key: ${{ secrets.DD_API_KEY }}
      dd-app-key: ${{ secrets.DD_APP_KEY }}
      dd-site: {{< region-param key="dd_site" >}}
```

### Mettez en cache le répertoire `SCFW_HOME` {#cache-the-scfw-home-directory}

La mise en cache de `SCFW_HOME` évite de récupérer à nouveau les données du vérificateur à chaque exécution :

```yaml
steps:
  - uses: actions/cache@55cc8345863c7cc4c66a329aec7e433d2d1c52a9 # v6.1.0
    with:
      path: ~/.scfw
      key: scfw-${{ runner.os }}

  - uses: DataDog/supply-chain-firewall-action@2f166ae1d2c34ed717d7b08427c7acb57804f3f5 # v1.0.0
    with:
      scfw-home: ~/.scfw
```

## Fonctionnement {#how-it-works}

1. **Installation** : L'interface de ligne de commande de Supply Chain Firewall est installée avec `pipx` dans un environnement Python isolé afin de ne pas interférer avec les dépendances du projet.

2. **Encapsulation** : Pour chaque gestionnaire de paquets demandé, l'action écrit un script d'encapsulation léger dans un répertoire temporaire et ajoute ce répertoire au début de `PATH`. Toutes les étapes ultérieures qui invoquent ces gestionnaires de paquets sont automatiquement acheminées via Supply Chain Firewall.

   Chaque encapsuleur résout le binaire réel au moment de l'appel en supprimant son propre répertoire de `PATH` avant de rechercher le binaire, puis transmet le chemin résolu à `scfw run --executable`. Cela permet de garantir que Supply Chain Firewall appelle le binaire réel et ne réinvoque pas l'encapsuleur.

   L'activation d'un environnement virtuel Python, comme avec `source .venv/bin/activate`, prévaut sur les encapsuleurs de Supply Chain Firewall pour le reste de cette étape. Utilisez `scfw run pip install ...` explicitement pour toutes les commandes qui s'exécutent dans des environnements virtuels.

3. **Configuration** : Les variables d'environnement pertinentes, telles que `DD_API_KEY` et `SCFW_HOME`, sont écrites dans `GITHUB_ENV` afin qu'elles soient disponibles pour les étapes ultérieures.

   Les variables d'environnement écrites dans `GITHUB_ENV` sont accessibles à toutes les étapes ultérieures du job, y compris à toutes les actions tierces exécutées après celle-ci. Si vous fournissez `dd-api-key` ou `dd-app-key`, auditez les actions qui suivent dans votre workflow pour détecter tout comportement suspect ou signe de compromission.

## Entrées {#inputs}

| Entrée | Description | Par défaut |
|-------|-------------|---------|
| `version` | La version de SCFW à installer. Utilisez `"latest"` ou fixez une version précise (par exemple, `"3.1.0"`). | `latest` |
| `package-managers` | Liste séparée par des virgules des gestionnaires de paquets à intercepter. Pris en charge : `npm`, `pip`, `poetry`. | `npm,pip,poetry` |
| `error-on-block` | Faites échouer l'étape du workflow avec un code de sortie non nul lorsqu'une installation est bloquée. | `true` |
| `dd-api-key` | Clé d'API Datadog pour transférer les événements de pare-feu vers l'API HTTP ou Code Security de Datadog. Utilisez `${{ secrets.DD_API_KEY }}`. | — |
| `dd-app-key` | Datadog application key for forwarding firewall events to the Datadog Code Security API. Use `${{ secrets.DD_APP_KEY }}`. | — |
| `dd-api-logger` | When `"true"`, enables SCFW's Datadog HTTP API logger. Requires `dd-api-key`. | `false` |
| `dd-codesec-logger` | When `"true"`, enables SCFW's Datadog Code Security logger. Requires `dd-api-key` and `dd-app-key`. | `false` |
| `dd-site` | Votre site Datadog ({{< region-param key="dd_site" code="true" >}}). Utilisé par `dd-api-logger` et `dd-codesec-logger`. | `datadoghq.com` |
| `dd-log-level` | Contrôle quels événements de pare-feu sont transférés à Datadog. `ALLOW` journalise tous les événements ; `BLOCK` journalise uniquement les événements bloqués. | `ALLOW` |
| `scfw-home` | Répertoire pour le cache local de SCFW. Indiquez ici un répertoire mis en cache pour accélérer la récupération des données du vérificateur d'une exécution à l'autre. | — |
| `on-warning` | Action que SCFW doit entreprendre en cas de détections de niveau avertissement : `ALLOW` ou `BLOCK`. La valeur par défaut est `BLOCK` dans les environnements non interactifs. | — |
| `package-minimum-age` | Âge minimal, en heures, qu'une version de paquet doit atteindre avant que l'installation ne soit autorisée. | `24` |
| `dd-env` | Tag d'environnement Datadog associé à tous les événements de pare-feu transférés. | `ci` |
| `dd-log-attributes` | Un objet JSON d'attributs personnalisés à attacher à tous les événements de log Datadog transférés (par exemple, `'{"team":"security"}'`). | — |

## Sorties {#outputs}

| Sortie | Description |
|--------|-------------|
| `scfw-version` | La version installée de Supply Chain Firewall. |

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/supply-chain-firewall