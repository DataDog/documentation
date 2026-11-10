---
description: Datadog の Supply Chain Firewall を使用して、インストール時に悪意のある、または最近公開されたオープンソースパッケージをブロックします。
disable_toc: false
further_reading:
- link: https://securitylabs.datadoghq.com/articles/introducing-supply-chain-firewall/
  tag: ブログ
  text: 'Supply-Chain Firewall の紹介: 開発者を悪意のあるオープンソースパッケージから保護する'
title: Supply Chain Firewall
---
{{< callout url=https://docs.google.com/forms/d/1Xqh5h1n3-jC7au2t30fdTq732dkTJqt_cb7C7T-AkPc/viewform?edit_requested=true
 btn_hidden="false" header="プレビューに参加しましょう。">}}
Supply Chain Firewall はプレビュー版です。
{{< /callout >}}

Supply Chain Firewall (SCFW) は、悪意のあるオープンソースパッケージがリポジトリや CI/CD パイプラインに到達する前のインストール時点で、開発環境に侵入するのを防ぎます。

SCFW は、サポートされているパッケージマネージャーのコマンド (`npm`、`pip`、`poetry`) をラップします。SCFW を介してインストールコマンドを実行すると、Datadog Security Research の既知の悪意のある、または侵害されたオープンソースパッケージの[脅威インテリジェンスフィード][1]、および組織用に構成したカスタムの許可/ブロックポリシーに基づいて、パッケージが評価されます。

これらのチェックに基づき、SCFW はコマンドに対して次の 3 つの結果のいずれかを生成します。

- **許可**: 問題は見つからず、インストールは通常通り進行します。
- **警告**: 重大度の低い検出結果を報告し、続行するかどうかの確認を求めます。
- **ブロック**: 重大度の高い検出結果を報告します。これは一般的に、パッケージが悪意のあるものであることが判明したことを示しており、その理由を説明するアクション可能なメッセージを表示してインストールをブロックします。

## CLI をインストールする {#install-the-cli}

パッケージがインストールされる前にパッケージマネージャーのコマンドを検査できるように、SCFW CLI をローカルにインストールします。

SCFW はランタイム依存関係のない単一の Go バイナリとして配布されており、macOS および一般的な Linux ディストリビューションで実行されます。Windows はサポートされません。

SCFW 4.0.0 以降は、Go または GitHub リリースを使用してインストールできます。

ローカルではなく CI でパッケージマネージャーのコマンドを検査するには、[Supply Chain Firewall の GitHub アクション][3]を参照してください。

### Go でインストールする {#install-with-go}

Go 1.26 を使用しており、CLI を最も迅速に動作させる方法が必要な場合は、`go install` を使用します。

```bash
go install github.com/DataDog/supply-chain-firewall/scfw@latest
```

これにより、`scfw` バイナリが `$(go env GOPATH)/bin` にインストールされます。そのディレクトリがまだ `PATH` に含まれていない場合は、追加してください。

### GitHub リリースからインストールする {#install-with-a-github-release}

Go がインストールされていない場合、または特定のリリースを固定して検証したい場合は、GitHub リリースからインストールしてください。

[最新の GitHub リリース][2] から、お使いのオペレーティングシステムおよびアーキテクチャ用のバイナリをダウンロードしてください。これらのコマンドを実行する前に、`scfw_expected_checksum` の値を、リリースページでそのバイナリに対して公開されているチェックサムに置き換えてください。

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

## 環境を構成する {#configure-your-environment}

SCFW を構成して Datadog 認証情報を保存し、サポートされているパッケージマネージャーのコマンドが自動的に SCFW を経由するようにシェルエイリアスを設定してください。

```bash
scfw configure \
    --dd-api-key=<DD_API_KEY> \
    --dd-app-key=<DD_APP_KEY> \
    --dd-site=<DD_SITE> \
    --alias-npm \
    --alias-pip \
    --alias-poetry
```

構成コマンドは、いくつかの異なるステップを実行します。

- API キーとアプリケーションキーをシステムのキーチェーンに安全に保存します。

   <div class="alert alert-tip">Datadog の認証情報とサイトは、フラグとして渡す代わりに `DD_API_KEY`、`DD_APP_KEY`、`DD_SITE` 環境変数で指定することもできます。環境変数は、システムキーチェーンに保存された認証情報よりも優先されます。</div>

- SCFW のエイリアス設定をシェルの rc ファイル (`.bashrc`、`.bash_profile`、`.zshrc`、`.zprofile` のうちすでに存在するファイル) に追加します。エイリアスを有効にするには、シェルを再起動するか、関連する rc ファイルをソースしてください。

   <div class="alert alert-tip">エイリアスのオプションは追加形式です。以前の実行で追加されたエイリアスは、対応する `--remove-alias-*` オプションを渡さない限りそのまま残ります。このコマンドは、シェル rc ファイル内の明確に区切られた SCFW 管理ブロックを管理するものであり、これらのファイルのそれ以外の箇所には一切触れません。</div>

- Datadog へのログ転送を有効にします。詳細は [Supply Chain Firewall インテグレーション][4]を参照してください。

設定コマンドでは、以下のオプションを使用できます。

| オプション | 説明 |
| --- | --- |
| `--dd-api-key` | ポリシーの評価とレポートに使用する Datadog API キー。|
| `--dd-app-key` | ポリシーの評価とレポートに使用する Datadog アプリケーションキー。|
| `--dd-site` | ポリシーの評価とレポートに使用する Datadog サイトパラメーター (デフォルト: `datadoghq.com`)。|
| `--alias-npm` | すべての npm コマンドを SCFW 経由で実行するためのシェルエイリアスを追加します。|
| `--remove-alias-npm` | SCFW によって管理されている npm シェルエイリアスを削除します。|
| `--alias-pip` | すべての pip/pip3 コマンドを SCFW 経由で実行するためのシェルエイリアスを追加します。|
| `--remove-alias-pip` | SCFW によって管理されている pip/pip3 シェルエイリアスを削除します。|
| `--alias-poetry` | すべての poetry コマンドを SCFW 経由で実行するためのシェルエイリアスを追加します。|
| `--remove-alias-poetry` | SCFW によって管理されている poetry シェルエイリアスを削除します。|
| `--scfw-home` | SCFW がローカルキャッシュとして使用できるディレクトリ。|
| `--remove` | SCFW が管理するすべての設定を削除します。|

認証情報とエイリアスが正しく設定されているかチェックするには、次のコマンドを実行してください。

```bash
scfw doctor
```

## インストール中にパッケージを検査する {#inspect-a-package-during-install}

SCFW のインストールと構成が完了すると、`npm`、`pip`、および `poetry` コマンドは自動的に SCFW 経由でルーティングされます。

代わりに手動でコマンドを検査するには、`scfw run --` を先頭に付けてください。

```bash
scfw run -- npm install react
scfw run -- pip install -r requirements.txt
```

`scfw run`コマンドは以下のオプションをサポートします。

| オプション | 説明 |
| --- | --- |
| `--executable` | コマンドの実行に使用するパッケージマネージャーの実行ファイル (デフォルト: 環境によって決定される)。|
| `--error-on-block` | ブロックされたコマンドをエラーとして扱います。つまり、ゼロ以外の終了コードを返します。スクリプト作成や CI に便利です。|
| `--allow-on-warning` | 警告レベルの検出結果のみを含むコマンドを非対話的に許可します。|
| `--block-on-warning` | 警告レベルの検出結果のみを含むコマンドを非対話的にブロックします。|

`SCFW_ON_WARNING`環境変数 (`allow` または `block`) は `--allow-on-warning` または`--block-on-warning` と同じ効果を持ち、設定されている場合は優先されます。環境変数は、すべての呼び出しを変更することなく、CI 環境全体で一貫したポリシーを強制するのに役立ちます。端末のない非対話型コンテキストでは、SCFW は確認を求めてプロンプトを表示することができないため、`--allow-on-warning`、`--block-on-warning`、または `SCFW_ON_WARNING` が設定されていない限り、デフォルトで警告レベルの結果をブロックします。

## 互換性{#compatibility}

SCFW は、以下のパッケージマネージャーのバージョンとサブコマンドをサポートしています。

| パッケージマネージャー| サポートされているバージョン| 検査されるサブコマンド|
|------------------|--------------------|-------------------------|
| npm | 7.0 以降| `install`(エイリアスを含む)|
| pip | 22.2 以降| `install` |
| poetry | 1.7 以降| `add`、`install`、`sync`、`update` |

指定されたもの以外のサブコマンドは、常に検査なしで実行されます。

パッケージマネージャーのバージョンが最小サポートバージョンより下の場合、SCFW は検査なしでの実行を許可するのではなく、そのパッケージマネージャーの検査対象サブコマンドの実行を拒否します。このフェイルクローズの動作は、既知の悪意のあるインストールをブロックすることを目的としています。コマンドを通常通り検査するには、サポートされているバージョンにアップグレードしてください。

## SCFW をアンインストールする {#uninstall-scfw}

SCFW をアンインストールすると、CLI およびそれが管理する構成が環境から削除されます。

バイナリを削除する前に、環境から SCFW が管理する構成を削除するため、`scfw configure --remove` を実行してください。

```bash
scfw configure --remove
```

次に、`scfw` バイナリを削除してください。たとえば、`/usr/local/bin`から削除するか、`$(go env GOPATH)/bin` を使用してインストールした場合は `go install` から削除してください。

## 参考資料{#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/malicious-software-packages-dataset
[2]: https://github.com/DataDog/supply-chain-firewall/releases/latest
[3]: /ja/security/code_security/dev_tool_int/scfw_github_action/
[4]: /ja/integrations/supply-chain-firewall/