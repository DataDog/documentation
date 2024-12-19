---
description: Datadog Agent Integration Developer Tool をインストールします。
title: Datadog Agent Integration Developer Tool をインストールする
---
このドキュメントでは、Agent ベースのインテグレーションで動作する Python 環境のセットアップ方法 (インタープリターと開発者ツールのインストールを含む) について説明します。

## Python のインストール

多くのオペレーティングシステムには、Python がプリインストールされています。しかし、デフォルトでインストールされている Python のバージョンは、最新の Agent で使用されているものとは異なる場合があります。インテグレーションを実行するために必要なものがすべて揃っていることを確認するために、専用の Python インタープリターをインストールしてください。

{{< tabs >}}

{{% tab "MacOS" %}}
[Homebrew][1] を使って Python 3.12 をインストールします。

1. Homebrew を更新します。
   ```
   brew update
   ```

2. Python をインストールします。
   ```
   brew install python@3.12
   ```

3. Homebrew のインストール出力を確認し、インストールスクリプトが推奨する追加のコマンドを実行します。

4. Python のバイナリが `PATH` にインストールされていることと、正しいバージョンがインストールされていることを確認してください。
   ```
   which python3.12
   ```

   お使いの Mac のアーキテクチャに応じて、以下の出力が表示されるはずです。
   - ARM (M1+) マシン:
     ```
     /opt/homebrew/bin/python3.12
     ```
   - Intel マシンの MacOS:
     ```
     /usr/local/bin/python3.12
     ```

[1]: https://brew.sh/
{{% /tab %}}

{{% tab "Windows" %}}
1. [Python 3.12 64 ビット版の実行形式インストーラー][1]をダウンロードして実行します。
1. Python を PATH に追加するオプションを選択します。
1. **Install Now** をクリックします。
1. インストールが完了したら、マシンを再起動します。
1. Python のバイナリが `PATH` にインストールされていることを確認します。
   ```
   > where python

   C:\Users\<USER>\AppData\Local\Programs\Python\Python39\python.exe
   ```

[1]: https://www.python.org/downloads/release/python-3115/
{{% /tab %}}

{{% tab "Linux" %}}
Linux 環境でのインストールでは、システム Python を変更しないようにしてください。Datadog は [pyenv][1] または [miniconda][2] を使用して Python 3.12 をインストールすることを推奨しています。

[1]: https://github.com/pyenv/pyenv#automatic-installer
[2]: https://conda.io/projects/conda/en/stable/user-guide/install/linux.html
{{% /tab %}}

{{< /tabs >}}

## 開発者ツールのインストール

`ddev` CLI をインストールするには 2 つの方法があります。

### GUI を使ってインストール

{{< tabs >}}
{{% tab "MacOS" %}}
1. ブラウザで `.pkg` ファイルをダウンロードします: [ddev-{{&lt; sdk-version "integrations-core" &gt;}}.pkg](https://github.com/DataDog/integrations-core/releases/download/ddev-v{{&lt; sdk-version "integrations-core" &gt;}}/ddev-{{&lt; sdk-version "integrations-core" &gt;}}.pkg)
2. ダウンロードしたファイルを実行し、画面の指示に従います。
3. ターミナルを再起動します。
4. `ddev` コマンドが `PATH` に追加されていることを確認するために、以下のコマンドを実行して `ddev` バージョンを取得します。
   ```shell
   ddev --version
   {{< sdk-version "integrations-core" >}}
   ```
{{% /tab %}}

{{% tab "Windows" %}}
1. ブラウザで以下の `.msi` ファイルのいずれかをダウンロードします。
     - [ddev-{{< sdk-version "integrations-core" >}}-x64.msi (64-bit)](https://github.com/DataDog/integrations-core/releases/download/ddev-v{{< sdk-version "integrations-core" >}}/ddev-{{< sdk-version "integrations-core" >}}-x64.msi)
     - [ddev-{{< sdk-version "integrations-core" >}}-x86.msi (32-bit) ](https://github.com/DataDog/integrations-core/releases/download/ddev-v{{< sdk-version "integrations-core" >}}/ddev-{{< sdk-version "integrations-core" >}}-x86.msi)
2. ダウンロードしたファイルを実行し、画面の指示に従います。
3. ターミナルを再起動します。
4. `ddev` コマンドが `PATH` に追加されていることを確認するために、以下のコマンドを実行して `ddev` バージョンを取得します。
   ```shell
   ddev --version
   {{< sdk-version "integrations-core" >}}
   ```
{{% /tab %}}
{{< /tabs >}}

### コマンドラインからインストール

{{< tabs >}}
{{% tab "MacOS" %}}
1. `curl` コマンドを使用してファイルをダウンロードします。-L オプションはリダイレクトを許可し、-o オプションはダウンロードしたパッケージを保存するファイル名を指定します。この例では、カレントディレクトリに `ddev-{{< sdk-version "integrations-core" >}}.pkg` という名前でファイルが保存されます。
   ```shell
   curl -L -o ddev-{{< sdk-version "integrations-core" >}}.pkg https://github.com/DataDog/integrations-core/releases/download/ddev-v{{< sdk-version "integrations-core" >}}/ddev-{{< sdk-version "integrations-core" >}}.pkg
   ```
2. ダウンロードした `.pkg` ファイルをソースとして指定して、macOS 標準の [`installer`](https://ss64.com/osx/installer.html) プログラムを実行します。インストールするパッケージの名前を `-pkg` パラメーターで指定し、パッケージをインストールするドライブを `-target /` パラメーターで指定します。ファイルは `/usr/local/ddev` にインストールされ、シェルに `/usr/local/ddev` ディレクトリを追加するように指示するエントリが `/etc/paths.d/ddev` に作成されます。これらのフォルダに書き込み権限を与えるには、コマンドに `sudo` を含める必要があります。
   ```shell
   sudo installer -pkg ./ddev-{{< sdk-version "integrations-core" >}}.pkg -target /
   ```
3. ターミナルを再起動します。
4. シェルが `PATH` にある `ddev` コマンドを見つけて実行できることを確認するには、以下のコマンドを使用します。
   ```shell
   ddev --version
   {{< sdk-version "integrations-core" >}}
   ```
{{% /tab %}}

{{% tab "Windows" %}}
1. Windows 標準の [`msiexec`](https://learn.microsoft.com/en-us/windows-server/administration/windows-commands/msiexec) プログラムを使用して、`.msi` ファイルの 1 つをソースとして指定して、インストーラーをダウンロードして実行します。パラメーターに `/passive` と `/i` を指定して、無人での通常のインストールをリクエストします。
   - `x64`:
      ```shell
      msiexec /passive /i https://github.com/DataDog/integrations-core/releases/download/ddev-v{{< sdk-version "integrations-core" >}}/ddev-{{< sdk-version "integrations-core" >}}-x64.msi
      ```
   - `x86`:
      ```shell
      msiexec /passive /i https://github.com/DataDog/integrations-core/releases/download/ddev-v{{< sdk-version "integrations-core" >}}/ddev-{{< sdk-version "integrations-core" >}}-x86.msi
      ```
2. ターミナルを再起動します。
3. シェルが `PATH` にある `ddev` コマンドを見つけて実行できることを確認するには、以下のコマンドを使用します。
   ```shell
   ddev --version
   {{< sdk-version "integrations-core" >}}
   ```
{{% /tab %}}
{{< /tabs >}}

### スタンドアロンバイナリからインストール

プラットフォームとアーキテクチャに対応するアーカイブをダウンロードしたら、バイナリを `PATH` にあるディレクトリに展開し、バイナリの名前を `ddev` に変更します。

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