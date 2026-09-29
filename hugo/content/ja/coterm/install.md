---
description: macOS および Linux に CoTerm をインストールし、Datadog での認証を設定して、CoTerm 構成設定を行います。
further_reading:
- link: /coterm
  tag: ドキュメント
  text: Datadog CoTerm
- link: /coterm/usage
  tag: ドキュメント
  text: CoTerm の使用
- link: /coterm/rules
  tag: ドキュメント
  text: CoTerm 構成ルール
title: Datadog CoTerm のインストール
---
CoTerm は macOS と Linux でサポートされています。

1. Homebrew または curl を使用して Datadog CoTerm をインストールします。

   **brew** (macOS のみ)
   ```shell
   brew install coterm
   ```
  
   **curl**
   ```shell
   curl --tlsv1.2 --proto '=https' -sSf 'https://coterm.datadoghq.com/install-ddcoterm.sh' | bash
   ```
   
   このコマンドは、CoTerm の最新バージョンを `.ddcoterm/bin/ddcoterm` にダウンロードし、`.bashrc` および `.zshrc` の PATH を更新します。ターミナルを再起動するか、プロファイルを再読み込みします。Bash および Zsh 以外のシェルを使用している場合は、`path/to/.ddcoterm/bin` を PATH に手動で追加します。

2. [Datadog サイト][6] が`https://app.datadoghq.com` でない場合は、`.ddcoterm/config.yaml` の `connection_config.host` でサイトを設定します。
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

   設定を選択します。これらの設定は [`~/.ddcoterm/config.yaml` ファイル](#configure-your-coterm-settings)で変更できます。

## CoTerm による Datadog への接続の認証{#authorize-coterm-to-connect-to-datadog}

初期化中に、CoTerm が Datadog アカウントにアクセスするための認証方法として、以下のいずれかを選択できます。
- {{< ui >}}OAuth{{< /ui >}}: ブラウザが開き、OAuth でログインできます。
- {{< ui >}}API Key + App Key{{< /ui >}} (API キー + アプリケーションキー): `~/.ddcoterm/config.yaml`で [Datadog API キー][1] と [アプリケーションキー][2] を設定するよう求められます。
- {{< ui >}}API Key Only{{< /ui >}} (API キーのみ): `~/.ddcoterm/config.yaml` で Datadog API キーを設定するよう求められます。

<div class="alert alert-info">[<strong>API Key Only</strong>] (API キーのみ) オプションを選択した場合、<a href="/coterm/usage/#require-approval-for-commands">Work Management での承認を必須にする</a>ことはできません。</div>

## CoTerm 設定の構成{#configure-your-coterm-settings}

`~/.ddcoterm/config.yaml` ファイルには CoTerm の構成が含まれています。

`process_config`
: CoTerm がリンターとして機能し、ルールに一致するコマンドをインターセプトしたときに特定のアクションを実行するように構成します。[CoTerm 構成ルール][4] を参照してください。

`enable_telemetry`
: Datadog へのテレメトリ送信を有効または無効にします。デフォルトは `false` です。

`enable_ptrace`
: Linux での実験的な `ptrace` ベースのプロセス監視を有効または無効にします。デフォルトは `false` です。

`connection_config`
: 
  `host`
  : Datadog への接続用のホストです。デフォルトは `https://app.datadoghq.com` です。

  `port`
  : Datadog への接続用のポートです。デフォルトは `443` です。

  `api_key`
  : OAuth を使用していない場合の [Datadog API キー][1] を指定します。OAuth を有効にしている場合、CoTerm はデフォルトで OAuth を使用し、`api_key` を無視します。

  `app_key`
  : OAuth を使用していない場合の [Datadog アプリケーションキー][2] を指定します。<br/>**注**: [Work Management での承認を必須にする][5] には、OAuth を使用するか、_または_このファイルに API キーとアプリケーションキーの両方を指定する必要があります。

## 次のステップ {#next-steps}

- 記録されたターミナルセッションを開始するには、`ddcoterm` を実行します。
- [CoTerm の使用方法][3] の詳細をご覧ください。

## アンインストール {#uninstall}

CoTerm をアンインストールするには、`.ddcoterm` フォルダーを削除します。

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/organization-settings/api-keys
[2]: https://app.datadoghq.com/organization-settings/application-keys
[3]: /ja/coterm/usage
[4]: /ja/coterm/rules
[5]: /ja/coterm/usage/#require-approval-for-commands
[6]: /ja/getting_started/site/