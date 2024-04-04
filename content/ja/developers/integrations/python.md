---
description: Datadog Agent Integration Developer Tool をインストールします。
kind: documentation
title: Datadog Agent Integration Developer Tool をインストールする
---
このドキュメントでは、インタープリターおよび開発ツールのインストールなど、Agent ベースのインテグレーションを開発するための Python 環境の設定方法について説明します。

## Python のインストール

多くのオペレーティングシステムには、Python がプリインストールされています。しかし、デフォルトでインストールされている Python のバージョンは、最新の Agent で使用されるものと同じではない場合があります。インテグレーションを実行するために必要なものがすべて揃っていることを確認するために、専用の Python インタプリターをインストールしてください。

{{< tabs >}}

{{% tab "MacOS" %}}
[Homebrew][1] を使って Python 3.11 をインストールします。

1. Homebrew を更新します。
   ```
   brew update
   ```

2. Python をインストールします。
   ```
   brew install python@3.11
   ```

3. Homebrew のインストール出力を確認し、インストールスクリプトが推奨する追加のコマンドを実行します。

4. Python のバイナリが `PATH` にインストールされていることと、正しいバージョンがインストールされていることを確認します。
   ```
   which python3.11
   ```

   お使いの Mac のアーキテクチャに応じて、以下の出力が表示されるはずです。
   - ARM (M1+) マシン:
     ```
     /opt/homebrew/bin/python3.11
     ```
   - Intel マシンの MacOS:
     ```
     /usr/local/bin/python3.11
     ```

[1]: https://brew.sh/
{{% /tab %}}

{{% tab "Windows" %}}
1. [Python 3.11 64 ビット版の実行形式インストーラー][1]をダウンロードして実行します。
1. Python を PATH に追加するオプションを選択します。
1. **Install Now** をクリックします。
1. インストールが完了したら、マシンを再起動します。
1. Python のバイナリが `PATH` にインストールされていることを確認します。
   ```
   > where python

   C:\Users\<USER>\AppData\Local\Programs\Python\Python39\python.exe
   ```

[1]: https://www.python.org/downloads/release/python-3115/
{{< /tabs >}}

{{% tab "Linux" %}}
Linux でのインストールでは、システム Python の変更は避けてください。Datadog では [pyenv][1] や [miniconda][2] を使用して Python 3.11 をインストールすることを推奨しています。

[1]: https://github.com/pyenv/pyenv#automatic-installer
[2]: https://conda.io/projects/conda/en/stable/user-guide/install/linux.html
{{% /tab %}}

{{< /tabs >}}

## 開発ツールのインストール

`ddev` CLI をインストールするには、2 つの選択肢があります。

### GUI を使ったインストール

{{< tabs >}}
{{% tab "MacOS" %}}
1. ブラウザで `.pkg` ファイルをダウンロードします: [ddev-{{< sdk-version "integrations-core" >}}.pkg](https://github.com/DataDog/integrations-core/releases/download/ddev-v{{< sdk-version "integrations-core" >}}/ddev-{{< sdk-version "integrations-core" >}}.pkg)
2. ダウンロードしたファイルを実行し、画面の指示に従います。
3. ターミナルを再起動します。
4. `ddev` コマンドが `PATH` に追加されたことを確認するには、次のコマンドを実行して、`ddev` バージョンを取得します。
   ```shell
   ddev --version
   {{< sdk-version "integrations-core" >}}
   ```
{{% /tab %}}

{{% tab "Windows" %}}
1. ブラウザで、以下のいずれかの `.msi` ファイルをダウンロードします。
     - [ddev-{{< sdk-version "integrations-core" >}}-x64.msi (64-bit)](https://github.com/DataDog/integrations-core/releases/download/ddev-v{{< sdk-version "integrations-core" >}}/ddev-{{< sdk-version "integrations-core" >}}-x64.msi)
     - [ddev-{{< sdk-version "integrations-core" >}}-x86.msi (32-bit) ](https://github.com/DataDog/integrations-core/releases/download/ddev-v{{< sdk-version "integrations-core" >}}/ddev-{{< sdk-version "integrations-core" >}}-x86.msi)
2. ダウンロードしたファイルを実行し、画面の指示に従います。
3. ターミナルを再起動します。
4. `ddev` コマンドが `PATH` に追加されたことを確認するには、次のコマンドを実行して、`ddev` バージョンを取得します。
   ```shell
   ddev --version
   {{< sdk-version "integrations-core" >}}
   ```
{{% /tab %}}
{{< /tabs >}}

### コマンドラインからのインストール

{{< tabs >}}
{{% tab "MacOS" %}}
1. `curl` コマンドを使ってファイルをダウンロードします。`-o` オプションは、ダウンロードしたパッケージが書き込まれるファイル名を指定するためのものです。この例では、ファイルはカレントディレクトリの `ddev-{{< sdk-version "integrations-core" >}}.pkg` として書き込まれます。
   ```shell
   curl -o ddev-{{< sdk-version "integrations-core" >}}.pkg https://github.com/DataDog/integrations-core/releases/download/ddev-v{{< sdk-version "integrations-core" >}}/ddev-{{< sdk-version "integrations-core" >}}.pkg
   ```
2. 標準の macOS [`installer`](https://ss64.com/osx/installer.html) プログラムを実行し、ダウンロードした `.pkg` ファイルをソースとして指定します。`-pkg` パラメーターを使用して、インストールするパッケージの名前を指定し、`-target /` パラメーターで、パッケージをインストールするドライブを指定します。ファイルは `/usr/local/ddev` にインストールされ、`/etc/paths.d/ddev` にエントリが作成され、そこに `/usr/local/ddev` ディレクトリを追加するようシェルに指示します。これらのフォルダーへの書き込み権限を付与するため、コマンドに `sudo` を含める必要があります。
   ```shell
   sudo installer -pkg ./ddev-{{< sdk-version "integrations-core" >}}.pkg -target /
   ```
3. ターミナルを再起動します。
4. シェルが `PATH` 内の `ddev` コマンドを見つけて実行できることを確認するために、次のコマンドを使用します。
   ```shell
   ddev --version
   {{< sdk-version "integrations-core" >}}
   ```
{{% /tab %}}

{{% tab "Windows" %}}
1. 標準の Windows [`msiexec`](https://learn.microsoft.com/en-us/windows-server/administration/windows-commands/msiexec) プログラムを使用して、インストーラーをダウンロードして実行し、いずれかの `.msi` ファイルをソースとして指定します。通常の無人インストールをリクエストするには、`/passive` および `/i` パラメーターを使用します。
   - `x64`:
      ```shell
      msiexec /passive /i https://github.com/DataDog/integrations-core/releases/download/ddev-v{{< sdk-version "integrations-core" >}}/ddev-{{< sdk-version "integrations-core" >}}-x64.msi
      ```
   - `x86`:
      ```shell
      msiexec /passive /i https://github.com/DataDog/integrations-core/releases/download/ddev-v{{< sdk-version "integrations-core" >}}/ddev-{{< sdk-version "integrations-core" >}}-x86.msi
      ```
2. ターミナルを再起動します。
3. シェルが `PATH` 内の `ddev` コマンドを見つけて実行できることを確認するために、次のコマンドを使用します。
   ```shell
   ddev --version
   {{< sdk-version "integrations-core" >}}
   ```
{{% /tab %}}
{{< /tabs >}}

### スタンドアロンバイナリからのインストール

ご利用のプラットフォームおよびアーキテクチャに対応するアーカイブをダウンロードした後、`PATH` 上のディレクトリにバイナリを抽出し、バイナリの名前を `ddev` に変更します。

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