---
description: Installez l'outil de développement d'intégrations avec l'Agent de Datadog.
title: Installer l'outil de développement d'intégrations avec l'Agent de Datadog
---
Ce document explique comment configurer un environnement Python pour travailler sur des intégrations basées sur l'Agent, y compris l'installation de l'interpréteur et de l'outil de développement.

## Installation de Python

La plupart des systèmes d'exploitation disposent d'une version de Python préinstallée, mais celle-ci peut différer de celle requise par la dernière version de l'Agent. Pour garantir le bon fonctionnement d'une intégration, installez un interpréteur Python spécifique.

{{< tabs >}}

{{% tab "MacOS" %}}
Install Python 3.12 using [Homebrew][1]:

1. Mettre à jour Homebrew :
   ```
   brew update
   ```

2. Installer Python :
   ```
   brew install python@3.12
   ```

3. Consultez la sortie d'installation de Homebrew et lancez les commandes additionnelles suggérées par le script si nécessaire.

4. Vérifiez que le binaire Python est installé sur votre site `PATH` et que vous avez installé la bonne version :
   ```
   which python3.12
   ```

   En fonction de l'architecture de votre Mac, vous devriez obtenir les résultats suivants :
   - Machines ARM (M1+) :
     ```
     /opt/homebrew/bin/python3.12
     ```
   - MacOS sur les machines Intel :
     ```
     /usr/local/bin/python3.12
     ```

[1]: https://brew.sh/
{{% /tab %}}

{{% tab "Windows" %}}
1. Téléchargez le [programme d'installation 64 bits de Python 3.12][1] et lancez-le.
1. Sélectionnez l'option permettant d'ajouter Python à votre PATH.
1. Cliquez sur **Install Now**.
1. Une fois l'installation terminée, redémarrez votre machine.
1. Vérifiez que le binaire Python est installé dans votre `PATH` :
   ```
   > where python

   C:\Users\<USER>\AppData\Local\Programs\Python\Python39\python.exe
   ```

[1]: https://www.python.org/downloads/release/python-3115/
{{% /tab %}}

{{% tab "Linux" %}}
For Linux installations, avoid modifying your system Python. Datadog recommends installing Python 3.12 using [pyenv][1] or [miniconda][2].

[1]: https://github.com/pyenv/pyenv#automatic-installer
[2]: https://conda.io/projects/conda/en/stable/user-guide/install/linux.html
{{% /tab %}}

{{< /tabs >}}

## Installer les outils de développement

Vous avez deux options pour installer la CLI `ddev`.

### Installation à l'aide d'une interface graphique

{{< tabs >}}
{{% tab "MacOS" %}}
1. Dans votre navigateur, téléchargez le fichier `.pkg` : [ddev-{{< sdk-version "integrations-core" >}}.pkg](https://github.com/DataDog/integrations-core/releases/download/ddev-v{{< sdk-version "integrations-core" >}}/ddev-{{< sdk-version "integrations-core" >}}.pkg)
2. Exécutez le fichier téléchargé et suivez les instructions à l'écran.
3. Redémarrez votre terminal.
4. Pour vérifier que la commande `ddev` a été ajoutée à votre `PATH`, exécutez la commande suivante pour récupérer la version `ddev` :
   ```shell
   ddev --version
   {{< sdk-version "integrations-core" >}}
   ```
{{% /tab %}}

{{% tab "Windows" %}}
1. Dans votre navigateur, téléchargez l'un des fichiers `.msi` suivants :
     - [ddev-{{< sdk-version "integrations-core" >}}-x64.msi (64-bit)](https://github.com/DataDog/integrations-core/releases/download/ddev-v{{< sdk-version "integrations-core" >}}/ddev-{{< sdk-version "integrations-core" >}}-x64.msi)
     - [ddev-{{< sdk-version "integrations-core" >}}-x86.msi (32-bit) ](https://github.com/DataDog/integrations-core/releases/download/ddev-v{{< sdk-version "integrations-core" >}}/ddev-{{< sdk-version "integrations-core" >}}-x86.msi)
2. Exécutez le fichier téléchargé et suivez les instructions à l'écran.
3. Redémarrez votre terminal.
4. Pour vérifier que la commande `ddev` a été ajoutée à votre `PATH`, exécutez la commande suivante pour récupérer la version `ddev` :
   ```shell
   ddev --version
   {{< sdk-version "integrations-core" >}}
   ```
{{% /tab %}}
{{< /tabs >}}

### Installation à partir de la ligne de commande

{{< tabs >}}
{{% tab "MacOS" %}}
1. Téléchargez le fichier à l'aide de la commande `curl`. L'option -L autorise les redirections et l'option -o permet de spécifier le nom du fichier dans lequel le paquet téléchargé sera enregistré. Dans cet exemple, le fichier est enregistré sous le nom `ddev-{{< sdk-version "integrations-core" >}}.pkg` dans le répertoire courant.
   ```shell
   curl -L -o ddev-{{< sdk-version "integrations-core" >}}.pkg https://github.com/DataDog/integrations-core/releases/download/ddev-v{{< sdk-version "integrations-core" >}}/ddev-{{< sdk-version "integrations-core" >}}.pkg
   ```
2. Exécutez le programme [`installer`](https://ss64.com/osx/installer.html) standard de macOS en indiquant le fichier `.pkg` téléchargé comme source. Utilisez le paramètre `-pkg` pour spécifier le nom du package à installer, et le paramètre `-target /` pour désigner le disque sur lequel installer le package. Les fichiers sont installés dans `/usr/local/ddev`, et une entrée est créée dans `/etc/paths.d/ddev` pour que les shells ajoutent automatiquement le répertoire `/usr/local/ddev` au PATH. Vous devez inclure `sudo` dans la commande pour obtenir les droits d'écriture nécessaires sur ces dossiers.
   ```shell
   sudo installer -pkg ./ddev-{{< sdk-version "integrations-core" >}}.pkg -target /
   ```
3. Redémarrez votre terminal.
4. Pour vérifier que le shell peut trouver et exécuter la commande `ddev` dans votre `PATH`, utilisez la commande suivante.
   ```shell
   ddev --version
   {{< sdk-version "integrations-core" >}}
   ```
{{% /tab %}}

{{% tab "Windows" %}}
1. Téléchargez le fichier `.msi` et lancez l'installation avec l'utilitaire [`msiexec`](https://learn.microsoft.com/en-us/windows-server/administration/windows-commands/msiexec) de Windows, en ajoutant les options `/i` et `/passive` pour une installation silencieuse standard.
   - `x64` :
      ```shell
      msiexec /passive /i https://github.com/DataDog/integrations-core/releases/download/ddev-v{{< sdk-version "integrations-core" >}}/ddev-{{< sdk-version "integrations-core" >}}-x64.msi
      ```
   - `x86` :
      ```shell
      msiexec /passive /i https://github.com/DataDog/integrations-core/releases/download/ddev-v{{< sdk-version "integrations-core" >}}/ddev-{{< sdk-version "integrations-core" >}}-x86.msi
      ```
2. Redémarrez votre terminal.
3. Pour vérifier que le shell peut trouver et exécuter la commande `ddev` dans votre `PATH`, utilisez la commande suivante.
   ```shell
   ddev --version
   {{< sdk-version "integrations-core" >}}
   ```
{{% /tab %}}
{{< /tabs >}}

### Installation depuis un binaire autonome

Après avoir téléchargé l'archive correspondant à votre plateforme et à votre architecture, extrayez le binaire dans un répertoire présent dans votre `PATH` et renommez-le en `ddev`.

{{< tabs >}}
{{% tab "MacOS" %}}
- [ddev-{{< sdk-version "integrations-core" >}}-aarch64-apple-darwin.tar.gz](https://github.com/DataDog/integrations-core/releases/download/ddev-v{{< sdk-version "integrations-core" >}}/ddev-{{< sdk-version "integrations-core" >}}-aarch64-apple-darwin.tar.gz)
- [ddev-{{< sdk-version "integrations-core" >}}-x86_64-apple-darwin.tar.gz](https://github.com/DataDog/integrations-core/releases/download/ddev-v{{< sdk-version "integrations-core" >}}/ddev-{{< sdk-version "integrations-core" >}}-x86_64-apple-darwin.tar.gz)
{{% /tab %}}

{{% tab "Windows" %}}
- [ddev-{{< sdk-version "integrations-core" >}}-x86_64-pc-windows-msvc.zip](https://github.com/DataDog/integrations-core/releases/download/ddev-v{{< sdk-version "integrations-core" >}}/ddev-{{< sdk-version "integrations-core" >}}-x86_64-pc-windows-msvc.zip)
- [ddev-{{< sdk-version "integrations-core" >}}-i686-pc-windows-msvc.zip](https://github.com/DataDog/integrations-core/releases/download/ddev-v{{< sdk-version "integrations-core" >}}/ddev-{{< sdk-version "integrations-core" >}}-i686-pc-windows-msvc.zip)
{{% /tab %}}

{{% tab "Linux" %}}
- [ddev-{{< sdk-version "integrations-core" >}}-aarch64-unknown-linux-gnu.tar.gz](https://github.com/DataDog/integrations-core/releases/download/ddev-v{{< sdk-version "integrations-core" >}}/ddev-{{< sdk-version "integrations-core" >}}-aarch64-unknown-linux-gnu.tar.gz)
- [ddev-{{< sdk-version "integrations-core" >}}-x86_64-unknown-linux-gnu.tar.gz](https://github.com/DataDog/integrations-core/releases/download/ddev-v{{< sdk-version "integrations-core" >}}/ddev-{{< sdk-version "integrations-core" >}}-x86_64-unknown-linux-gnu.tar.gz)
- [ddev-{{< sdk-version "integrations-core" >}}-x86_64-unknown-linux-musl.tar.gz](https://github.com/DataDog/integrations-core/releases/download/ddev-v{{< sdk-version "integrations-core" >}}/ddev-{{< sdk-version "integrations-core" >}}-x86_64-unknown-linux-musl.tar.gz)
- [ddev-{{< sdk-version "integrations-core" >}}-i686-unknown-linux-gnu.tar.gz](https://github.com/DataDog/integrations-core/releases/download/ddev-v{{< sdk-version "integrations-core" >}}/ddev-{{< sdk-version "integrations-core" >}}-i686-unknown-linux-gnu.tar.gz)
- [ddev-{{< sdk-version "integrations-core" >}}-powerpc64le-unknown-linux-gnu.tar.gz](https://github.com/DataDog/integrations-core/releases/download/ddev-v{{< sdk-version "integrations-core" >}}/ddev-{{< sdk-version "integrations-core" >}}-powerpc64le-unknown-linux-gnu.tar.gz)
{{% /tab %}}
{{< /tabs >}}