---
description: Bloquez les paquets open source malveillants et récemment publiés au
  moment de l'installation avec le Supply Chain Firewall de Datadog.
disable_toc: false
further_reading:
- link: https://securitylabs.datadoghq.com/articles/introducing-supply-chain-firewall/
  tag: Blog
  text: 'Présentation de Supply Chain Firewall : protéger les développeurs contre
    les paquets open source malveillants'
title: Supply Chain Firewall
---
{{< callout url=https://docs.google.com/forms/d/1Xqh5h1n3-jC7au2t30fdTq732dkTJqt_cb7C7T-AkPc/viewform?edit_requested=true
 btn_hidden="false" header="Rejoignez la Preview !">}}
Supply Chain Firewall est en préversion.
{{< /callout >}}

Supply Chain Firewall (SCFW) empêche les paquets open source malveillants de pénétrer dans vos environnements de développement au moment de l'installation, avant qu'ils n'atteignent les dépôts ou les pipelines CI/CD.

SCFW encapsule les commandes du gestionnaire de paquets prises en charge (`npm`, `pip` et `poetry`). Lorsque vous exécutez une commande d'installation via SCFW, il évalue le paquet par rapport au [flux de renseignements sur les menaces][1] de Datadog Security Research concernant les paquets open source connus comme malveillants et compromis, ainsi qu'aux politiques d'autorisation et de blocage personnalisées que vous configurez pour votre organisation.

Sur la base de ces checks, SCFW produit l'un des trois résultats pour la commande :

- **Autoriser** : Aucun problème n'est détecté et l'installation se poursuit normalement.
- **Avertir** : Signale des résultats non critiques et vous invite à confirmer si vous souhaitez poursuivre.
- **Bloquer** : Signale un résultat critique, indiquant généralement qu'un paquet est connu pour être malveillant, et bloque l'installation avec un message actionnable expliquant pourquoi.

## Installez l'interface de ligne de commande {#install-the-cli}

Installez l'interface de ligne de commande SCFW localement afin que les commandes du gestionnaire de paquets puissent être inspectées avant l'installation des paquets. 

SCFW est distribué sous la forme d'un binaire Go unique sans dépendances d'exécution, et fonctionne sur macOS et les distributions Linux courantes. Windows n'est pas pris en charge.

Vous pouvez installer SCFW 4.0.0 et versions ultérieures avec Go ou avec une version GitHub. 

Pour inspecter les commandes du gestionnaire de paquets dans CI au lieu de localement, consultez l'[action GitHub Supply Chain Firewall][3].

### Installer avec Go {#install-with-go}

Utilisez `go install` si vous avez Go 1.26 et que vous souhaitez le chemin le plus rapide vers une interface de ligne de commande fonctionnelle.

```bash
go install github.com/DataDog/supply-chain-firewall/scfw@latest
```

Ceci installe le binaire `scfw` dans `$(go env GOPATH)/bin`. Ajoutez ce répertoire à votre `PATH` s'il n'y figure pas déjà.

### Installer avec une release GitHub {#install-with-a-github-release}

Installez via une release GitHub si vous n'avez pas Go installé, ou si vous souhaitez verrouiller et vérifier une release spécifique.

Téléchargez le binaire pour votre système d'exploitation et votre architecture depuis la [dernière version GitHub][2]. Avant d'exécuter ces commandes, remplacez la valeur de `scfw_expected_checksum` par la somme de contrôle publiée pour ce binaire sur la page de la version.

```bash
# Replace this placeholder with the checksum from the release page.
scfw_expected_checksum="<expected-sha256-checksum>"

# Detect the operating system used in the release artifact name.
case "$(uname -s)" in
    Darwin) scfw_os=darwin ;;
    Linux)  scfw_os=linux ;;
    *) echo "Unsupported operating system: $(uname -s)" >&2; exit 1 ;;
esac

# Detect the CPU architecture used in the release artifact name.
case "$(uname -m)" in
    x86_64)        scfw_arch=amd64 ;;
    arm64|aarch64) scfw_arch=arm64 ;;
    *) echo "Unsupported architecture: $(uname -m)" >&2; exit 1 ;;
esac

# Download the binary for the detected platform.
scfw_binary="scfw-${scfw_os}-${scfw_arch}"
curl -fLO "https://github.com/DataDog/supply-chain-firewall/releases/latest/download/${scfw_binary}"

# Calculate the downloaded binary's checksum and compare it against the published value.
scfw_actual_checksum=$(sha256sum "${scfw_binary}" | awk '{print $1}')
if [ "${scfw_actual_checksum}" != "${scfw_expected_checksum}" ]; then
    echo "Checksum verification failed" >&2
    exit 1
fi

# Install the verified binary in a directory on PATH.
chmod +x "${scfw_binary}"
sudo install "${scfw_binary}" /usr/local/bin/scfw
```

## Configurez votre environnement {#configure-your-environment}

Configurez SCFW pour stocker vos identifiants Datadog et configurez des alias de shell afin que les commandes des gestionnaires de paquets pris en charge soient automatiquement acheminées via SCFW.

```bash
scfw configure \
    --dd-api-key=<DD_API_KEY> \
    --dd-app-key=<DD_APP_KEY> \
    --dd-site=<DD_SITE> \
    --alias-npm \
    --alias-pip \
    --alias-poetry
```

La commande de configuration effectue plusieurs étapes distinctes :

- Stocke vos clés d'API et d'application de manière sécurisée dans le trousseau de votre système.

   <div class="alert alert-tip">Vous pouvez fournir vos identifiants et votre site Datadog avec les variables d'environnement `DD_API_KEY`, `DD_APP_KEY` et `DD_SITE` au lieu de les transmettre sous forme d'options. Les variables d'environnement prévalent sur les identifiants stockés dans le trousseau système.</div>

- Ajoute la configuration d'alias de SCFW aux fichiers rc de votre shell (ceux parmi `.bashrc`, `.bash_profile`, `.zshrc` et `.zprofile` qui existent déjà). Redémarrez votre shell, ou sourcez le fichier rc approprié, pour que les alias prennent effet.

   <div class="alert alert-tip">Les options d'alias sont cumulatives : les alias ajoutés lors d'une exécution précédente restent en place, sauf si vous transmettez l'option `--remove-alias-*` correspondante. La commande gère un bloc clairement délimité et géré par SCFW dans vos fichiers rc de shell, et ne touche à rien d'autre dans ces fichiers.</div>

- Active le transfert de logs vers Datadog. Consultez [l'intégration Supply Chain Firewall][4] pour plus de détails.

La commande de configuration accepte ces options :

| Option | Description |
| --- | --- |
| `--dd-api-key` | Clé d'API Datadog utilisée pour l'évaluation et le rapport sur la politique. |
| `--dd-app-key` | Clé d'application Datadog utilisée pour l'évaluation et le rapport sur la politique. |
| `--dd-site` | Paramètre de site Datadog utilisé pour l'évaluation et le rapport sur la politique (par défaut : `datadoghq.com`). |
| `--alias-npm` | Ajoutez un alias shell pour exécuter toutes les commandes npm via SCFW. |
| `--remove-alias-npm` | Supprimez l'alias shell npm géré par SCFW. |
| `--alias-pip` | Ajoutez des alias shell pour exécuter toutes les commandes pip/pip3 via SCFW. |
| `--remove-alias-pip` | Supprimez les alias shell pip/pip3 gérés par SCFW. |
| `--alias-poetry` | Ajoutez un alias shell pour exécuter toutes les commandes poetry via SCFW. |
| `--remove-alias-poetry` | Supprimez l'alias shell poetry géré par SCFW. |
| `--scfw-home` | Répertoire que SCFW peut utiliser comme cache local. |
| `--remove` | Supprimez toute configuration gérée par SCFW. |

Pour vérifier si vos identifiants et alias sont correctement configurés, exécutez :

```bash
scfw doctor
```

## Inspectez un paquet lors de l'installation {#inspect-a-package-during-install}

Après avoir installé et configuré SCFW, les commandes `npm`, `pip` et `poetry` sont automatiquement acheminées via SCFW. 

Pour inspecter une commande manuellement à la place, ajoutez `scfw run --` devant :

```bash
scfw run -- npm install react
scfw run -- pip install -r requirements.txt
```

La commande `scfw run` prend en charge ces options :

| Option | Description |
| --- | --- |
| `--executable` | Exécutable du gestionnaire de paquets à utiliser pour exécuter les commandes (par défaut : déterminé par l'environnement). |
| `--error-on-block` | Traite les commandes bloquées comme des erreurs, ce qui signifie une sortie non nulle. Utile pour les scripts et la CI. |
| `--allow-on-warning` | Autorise de manière non interactive les commandes ne présentant que des résultats de niveau avertissement. |
| `--block-on-warning` | Bloque de manière non interactive les commandes ne présentant que des résultats de niveau avertissement. |

La variable d'environnement `SCFW_ON_WARNING` (`allow` ou `block`) a le même effet que `--allow-on-warning` ou `--block-on-warning`, et est prioritaire lorsqu'elle est définie. Une variable d'environnement est utile pour appliquer une politique cohérente dans l'ensemble d'un environnement de CI sans modifier chaque invocation. Dans les contextes non interactifs sans terminal, SCFW ne peut pas demander de confirmation, il bloque donc par défaut les résultats de niveau avertissement, sauf si `--allow-on-warning`, `--block-on-warning` ou `SCFW_ON_WARNING` est défini.

## Compatibilité {#compatibility}

SCFW prend en charge ces versions de gestionnaires de paquets et sous-commandes :

| Gestionnaire de paquets | Versions prises en charge | Sous-commandes inspectées |
|------------------|--------------------|-------------------------|
| npm | 7.0 et versions ultérieures | `install` (y compris les alias) |
| pip | 22.2 et versions ultérieures | `install` |
| poetry | 1.7 et versions ultérieures | `add`, `install`, `sync`, `update` |

Les sous-commandes autres que celles spécifiées s'exécutent toujours sans inspection.

Si une version de gestionnaire de paquets est inférieure à sa version minimale prise en charge, SCFW refuse d'exécuter les sous-commandes inspectées pour celle-ci, plutôt que de les laisser s'exécuter sans inspection. Ce comportement de sécurité par défaut est destiné à bloquer les installations malveillantes connues. Mettez à niveau vers une version prise en charge pour inspecter les commandes normalement.

## Désinstallez SCFW {#uninstall-scfw}

La désinstallation de SCFW supprime l'interface de ligne de commande et la configuration qu'elle gère de votre environnement.

Avant de supprimer le binaire, exécutez `scfw configure --remove` pour supprimer la configuration gérée par SCFW de votre environnement :

```bash
scfw configure --remove
```

Supprimez ensuite le binaire `scfw`, par exemple en le supprimant de `/usr/local/bin`, ou de `$(go env GOPATH)/bin` si vous l'avez installé avec `go install`.

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/malicious-software-packages-dataset
[2]: https://github.com/DataDog/supply-chain-firewall/releases/latest
[3]: /fr/security/code_security/dev_tool_int/scfw_github_action/
[4]: /fr/integrations/supply-chain-firewall/