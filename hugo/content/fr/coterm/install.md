---
description: Installez CoTerm sur macOS et Linux, configurez l'autorisation avec Datadog
  et définissez vos paramètres de configuration CoTerm.
further_reading:
- link: /coterm
  tag: Documentation
  text: Datadog CoTerm
- link: /coterm/usage
  tag: Documentation
  text: Utilisation de CoTerm
- link: /coterm/rules
  tag: Documentation
  text: Règles de configuration de CoTerm
title: Installer Datadog CoTerm
---
CoTerm est pris en charge sur macOS et Linux.

1. Installez Datadog CoTerm avec Homebrew ou curl :

   **brew** (macOS uniquement)
   ```shell
   brew install coterm
   ```
  
   **curl**
   ```shell
   curl --tlsv1.2 --proto '=https' -sSf 'https://coterm.datadoghq.com/install-ddcoterm.sh' | bash
   ```
   
   Cette commande télécharge la dernière version de CoTerm dans `.ddcoterm/bin/ddcoterm` et met à jour votre PATH dans `.bashrc` et `.zshrc`. Redémarrez votre terminal ou rechargez votre profil. Si vous utilisez un shell autre que Bash ou Zsh, ajoutez `path/to/.ddcoterm/bin` à votre PATH manuellement.

2. Si votre [site Datadog][6] n'est pas `https://app.datadoghq.com`, définissez votre site dans `.ddcoterm/config.yaml` sous `connection_config.host` :
   ```yaml
   ...
   connection_config:
     host: {{< region-param key=dd_full_site code="true" >}}
   ...
   ```

3. Initialize your configuration file by running:

   ```shell
   ddcoterm init
   ```

   Sélectionnez vos paramètres. Vous pouvez modifier ces paramètres dans le fichier [`~/.ddcoterm/config.yaml` ](#configure-your-coterm-settings).

## Autorisez CoTerm à se connecter à Datadog {#authorize-coterm-to-connect-to-datadog}

Lors de l'initialisation, vous pouvez choisir l'une des méthodes suivantes pour autoriser CoTerm à accéder à votre compte Datadog :
- {{< ui >}}OAuth{{< /ui >}} : Ouvre un navigateur pour vous permettre de vous connecter avec OAuth.
- {{< ui >}}API Key + App Key{{< /ui >}} : Vous invite à définir votre [clé d'API Datadog][1] et votre [clé d'application][2] dans `~/.ddcoterm/config.yaml`.
- {{< ui >}}API Key Only{{< /ui >}} : Vous invite à définir votre clé d'API Datadog dans `~/.ddcoterm/config.yaml`.

<div class="alert alert-info">Si vous sélectionnez l'option <strong>Clé d'API uniquement</strong>, vous ne pouvez pas <a href="/coterm/usage/#require-approval-for-commands">exiger d'approbations avec Work Management</a>.</div>

## Configurez vos paramètres CoTerm {#configure-your-coterm-settings}

Le fichier `~/.ddcoterm/config.yaml` contient vos configurations CoTerm :

`process_config`
: Configurez CoTerm pour agir comme un linter et effectuer certaines actions lorsqu'il intercepte une commande qui correspond à une règle. Voir [Règles de configuration CoTerm][4].

`enable_telemetry`
: Activez ou désactivez l'envoi de télémétrie à Datadog. Par défaut : `false`.

`enable_ptrace`
: Activez ou désactivez la surveillance de processus expérimentale basée sur `ptrace` sous Linux. Par défaut : `false`.

`connection_config`
: 
  `host`
  : Host pour la connexion à Datadog. Par défaut : `https://app.datadoghq.com`.

  `port`
  : Port pour la connexion à Datadog. Par défaut : `443`.

  `api_key`
  : Si vous n'utilisez pas OAuth, votre [clé d'API Datadog][1]. Si vous avez activé OAuth, CoTerm utilise OAuth par défaut et ignore `api_key`.

  `app_key`
  : Si vous n'utilisez pas OAuth, votre [clé d'application Datadog][2]. <br/>**Remarque** : Pour [exiger des approbations avec Work Management][5], vous devez utiliser OAuth _ou_ spécifier à la fois votre clé d'API et votre clé d'application dans ce fichier.

## Étapes suivantes {#next-steps}

- Exécutez `ddcoterm` pour démarrer une session de terminal enregistrée.
- En savoir plus sur [l'utilisation de CoTerm][3].

## Désinstallez {#uninstall}

Pour désinstaller CoTerm, supprimez le dossier `.ddcoterm`.

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/organization-settings/api-keys
[2]: https://app.datadoghq.com/organization-settings/application-keys
[3]: /fr/coterm/usage
[4]: /fr/coterm/rules
[5]: /fr/coterm/usage/#require-approval-for-commands
[6]: /fr/getting_started/site/