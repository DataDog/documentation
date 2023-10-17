---
description: Datadog Agent Integration Developer Tool をインストールします。
kind: documentation
title: Datadog Agent Integration Developer Tool をインストールする
---
このドキュメントでは、インタープリターのインストール、必要な依存関係がすべて存在することの確認など、Agent ベースのインテグレーションを開発するための Python 環境の設定方法について説明します。または、各リリースで提供されているスタンドアロンバイナリやインストーラーを使用することもできます。

## GitHub リリース

各[リリース](https://github.com/DataDog/integrations-core/releases?q=ddev-&expanded=true)では、以下を提供しています。

- Linux、Windows、macOS 用スタンドアロンバイナリ
- Windows AMD64 (64-bit) MSI インストーラー
- Windows x86 (32-bit) MSI インストーラー
- Windows ユニバーサル (AMD64+x86) EXE インストーラー
- macOS DMG インストーラー

## Python のインストール

多くのオペレーティングシステムには、Python のプレインストール版が搭載されています。しかし、デフォルトでインストールされている Python のバージョンは、Agent で使用するバージョンよりも古い場合があり、必要なツールや依存関係が不足している場合があります。インテグレーションを実行するために必要なものがすべて揃っていることを確認するために、専用の Python インタプリターをインストールしてください。

{{< tabs >}}

{{% tab "MacOS" %}}
[Homebrew][1] を使って Python 3.9 をインストールします。

1. Homebrew を更新します。
   ```
   brew update
   ```

1. Python をインストールします。
   ```
   brew install python@3.9
   ```

1. Homebrew のインストール出力を確認し、インストールスクリプトが推奨する追加のコマンドを実行します。

1. Python のバイナリが `PATH` にインストールされていることと、正しいバージョンがインストールされていることを確認します。
   ```
   which python3.9
   ```

   お使いの Mac のアーキテクチャに応じて、以下の出力が表示されるはずです。
   - ARM (M1+) マシン:
     ```
     /opt/homebrew/bin/python3.9
     ```
   - Intel マシンの MacOS:
     ```
     /usr/local/bin/python3.9
     ```

[1]: https://brew.sh/
{{< /tabs >}}

{{% tab "Windows" %}}
1. [Python 3.9 64-bit 実行形式インストーラー][1]をダウンロードし、実行します。
1. Python を PATH に追加するオプションを選択します。
1. **Install Now** をクリックします。
1. インストールが完了したら、マシンを再起動します。
1. Python のバイナリが `PATH` にインストールされていることを確認します。
   ```
   > where python

   C:\Users\<USER>\AppData\Local\Programs\Python\Python39\python.exe
   ```

[1]: https://www.python.org/downloads/release/python-3917/
{{% /tab %}}

{{% tab "Linux" %}}
Linux のインストールでは、システムの Python を変更することは避けてください。Datadog は、[pyenv][1] または [miniconda][2] を使用して Python 3.9 をインストールすることを推奨します。

[1]: https://github.com/pyenv/pyenv#automatic-installer
[2]: https://conda.io/projects/conda/en/stable/user-guide/install/linux.html
{{% /tab %}}

{{< /tabs >}}

## pipx のインストール

`pipx` python パッケージは `ddev` コマンドラインツールに必要です。

{{< tabs >}}
{{% tab "MacOS" %}}
1. pipx をインストールします。
   ```
   brew install pipx
   ```
1. Homebrew のインストール出力を確認し、インストールスクリプトが推奨する追加のコマンドを実行します。

1. pipx がインストールされていることを確認します。
   ```
   which pipx
   ```

   お使いの Mac のアーキテクチャに応じて、以下の出力が表示されるはずです。
   - ARM (M1+) マシン:
     ```
     /opt/homebrew/bin/pipx
     ```
   - Intel マシンの MacOS:
     ```
     /usr/local/bin/pipx
     ```

{{% /tab %}}

{{% tab "Windows" %}}
1. pipx をインストールします。
   ```
   python -m pip install pipx
   ```

1. pipx がインストールされていることを確認します。
   ```
   > where pipx
   C:\Users\<USER>\AppData\Local\Programs\Python\Python39\Scripts\pipx.exe
   ```

{{% /tab %}}

{{% tab "Linux" %}}
1. pipx をインストールします。
   ```
   python -m pip install pipx
   ```
1. pipx がインストールされていることを確認します。
   ```
   pipx --version
   ```
{{% /tab %}}
{{< /tabs >}}

## Datadog Agent Integration Developer Tool をインストールする

{{< tabs >}}
{{% tab "MacOS" %}}

1. 以下のコマンドを実行し、出力に表示されている実行ファイルをすべて削除します。
   ```
   which -a ddev
   ```

1. 仮想環境が起動していないことを確認します。
   1. 次のコマンドを実行します。
      ```
      echo $VIRTUAL_ENV
      ```

   1. コマンドが出力を返した場合、仮想環境は実行されています。仮想環境を終了するには、`deactivate` を実行します。

1. `ddev` をインストールします。
   <div class="alert alert-warning">このコマンドは <code>sudo</code> で実行しないでください。</a></div>

   - ARM (M1+) マシン:
     ```
     pipx install --python /opt/homebrew/bin/python3.9 ddev
     ```

   - Intel マシンの MacOS:
     ```
     pipx install --python /usr/local/bin/python3.9 ddev
     ```

1. インストール出力を確認し、インストールスクリプトが推奨する追加のコマンドを実行します。

{{< /tabs >}}

{{% tab "Windows" %}}
1. `ddev` をインストールするには、以下を実行します。
   ```
   pipx install ddev
   ```

{{% /tab %}}

{{% tab "Linux" %}}
1. `ddev` をインストールするには、以下を実行します。
   <div class="alert alert-warning">このコマンドは `sudo` で実行しないでください。</a></div>

   ```
   pipx install ddev
   ```
{{% /tab %}}
{{< /tabs >}}