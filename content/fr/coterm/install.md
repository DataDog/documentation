---
description: Installer CoTerm sur macOS et Linux, configurer l'autorisation avec Datadog
  et définir vos paramètres de configuration CoTerm.
further_reading:
- link: /coterm
  tag: documentation
  text: Datadog CoTerm
- link: /coterm/usage
  tag: documentation
  text: Utiliser CoTerm
- link: /coterm/rules
  tag: documentation
  text: Règles de configuration CoTerm
title: Installer Datadog CoTerm
---

CoTerm est pris en charge sur macOS et Linux.

1. Installer Datadog CoTerm avec Homebrew ou curl :

   **brew** (macOS uniquement)
   ```shell
   brew install coterm
   ```

   **curl**
   ```shell
   curl --tlsv1.2 --proto '=https' -sSf 'https://coterm.datadoghq.com/install-ddcoterm.sh' | bash
   ```

   Cette commande télécharge la dernière version de CoTerm dans `.ddcoterm/bin/ddcoterm` et met à jour votre PATH dans `.bashrc` et `.zshrc`. Redémarrez votre terminal ou sourcez votre profil. Si vous utilisez un shell autre que Bash ou Zsh, ajoutez `path/to/.ddcoterm/bin` à votre PATH manuellement.

2. Si votre [site Datadog][6] n'est pas `https://app.datadoghq.com`, définissez votre site dans `.ddcoterm/config.yaml` sous `connection_config.host` :
   ```yaml
   ...
   connection_config:
     host: {{< region-param key=dd_full_site code="true" >}}
   ...
   ```

3. Initialisez votre fichier de configuration en exécutant :

   ```shell
   ddcoterm init
   ```

   Sélectionnez vos paramètres. Vous pouvez modifier ces paramètres dans le fichier `~/.ddcoterm/config.yaml`](#configurer-vos-paramètres-coterm).

## Autoriser CoTerm à se connecter à Datadog

Lors de l'initialisation, vous pouvez choisir l'une des méthodes suivantes pour autoriser CoTerm à accéder à votre compte Datadog :
- **OAuth** : ouvre un navigateur pour que vous puissiez vous connecter avec OAuth.
- **Clé d'API + clé d'application** : vous invite à définir votre [clé d'API Datadog][1] et votre [clé d'application][2] dans `~/.ddcoterm/config.yaml`.
- **Clé d'API uniquement** : vous invite à définir votre clé d'API Datadog dans `~/.ddcoterm/config.yaml`.

<div class="alert alert-info">Si vous sélectionnez l'option <strong>Clé d'API uniquement</strong>, vous ne pouvez pas <a href="/coterm/usage/#exiger-une-approbation-pour-les-commandes">exiger d'approbations avec la gestion des cas</a>.</div>

## Configurer vos paramètres CoTerm

Le fichier `~/.ddcoterm/config.yaml` contient vos configurations CoTerm :

`process_config`
: Configurer CoTerm pour qu'il agisse comme un linter et prenne certaines actions lorsqu'il intercepte une commande qui correspond à une règle. Consultez la section [Règles de configuration CoTerm][4].

`enable_telemetry`
: Activer ou désactiver l'envoi de données de télémétrie à Datadog. La valeur par défaut est `false`.

`enable_ptrace`
: Activer ou désactiver la surveillance expérimentale des processus basée sur `ptrace` sous Linux. La valeur par défaut est `false`.

`connection_config`
: 
  `host`
  : Hôte pour la connexion à Datadog. La valeur par défaut est `https://app.datadoghq.com`.

  `port`
  : Port pour la connexion à Datadog. La valeur par défaut est `443`.

  `api_key`
  : Si vous n'utilisez pas OAuth, votre [clé d'API Datadog][1]. Si vous avez activé OAuth, CoTerm utilise OAuth par défaut et ignore `api_key`.

  `app_key`
  : Si vous n'utilisez pas OAuth, votre [clé d'application Datadog][2]. <br/>**Remarque** : pour [exiger des approbations avec la gestion des cas][5], vous devez utiliser OAuth _ou_ spécifier à la fois votre clé d'API et votre clé d'application dans ce fichier.

## Étapes suivantes

- Exécutez `ddcoterm` pour démarrer une session de terminal enregistrée.
- En savoir plus sur l'[utilisation de CoTerm][3].

## Désinstallation

Pour désinstaller CoTerm, supprimez le dossier `.ddcoterm`.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/organization-settings/api-keys
[2]: https://app.datadoghq.com/organization-settings/application-keys
[3]: /fr/coterm/usage
[4]: /fr/coterm/rules
[5]: /fr/coterm/usage/#require-approval-for-commands
[6]: /fr/getting_started/site/