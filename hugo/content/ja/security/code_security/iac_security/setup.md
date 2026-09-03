---
aliases:
- /ja/security/cloud_security_management/setup/iac_scanning/
further_reading:
- link: /security/code_security
  tag: ドキュメント
  text: Code Security
- link: /security/code_security/iac_security
  tag: ドキュメント
  text: IaC Security
- link: /security/code_security/iac_security/configuration
  tag: ドキュメント
  text: IaC Security の構成
- link: /security/code_security/iac_security/iac_rules/
  tag: ドキュメント
  text: IaC Security ルール
title: IaC Security のセットアップ
---
以下の手順に従って、Code Security の Infrastructure as Code (IaC) Security を有効にします。IaC Security は、GitHub、GitLab、または Azure DevOps リポジトリに保存されている複数の IaC 構成をサポートしています。

{{< tabs >}}
{{% tab "GitHub" %}}

### GitHub 統合をインストールする{#install-the-github-integration}

GitHub リポジトリを接続して PR コメントを有効にするには、[プルリクエストコメント][1]のセットアップ手順を参照してください。

### リポジトリで IaC Security を有効にする{#enable-iac-security-for-your-repositories}

GitHub 統合をセットアップした後、リポジトリで IaC Security を有効にします。

1. [Code Security 設定ページ][2]で、{{< ui >}}Activate scanning for your repositories{{< /ui >}} セクションを展開します。
1. {{< ui >}}Select your source code management provider{{< /ui >}} で、{{< ui >}}GitHub{{< /ui >}} を選択します。
1. {{< ui >}}Select where your scans should run{{< /ui >}} で、{{< ui >}}Datadog{{< /ui >}} を選択します。
1. {{< ui >}}Connect your GitHub repositories{{< /ui >}} で、次のいずれかを行います。
    - 新しい GitHub アカウントを接続するには、{{< ui >}}Add GitHub Account{{< /ui >}} をクリックします。
    - 既存のアカウントで IaC Security を有効にするには、{{< ui >}}Select repositories{{< /ui >}} をクリックします。Code Security がすでに有効になっている場合は、{{< ui >}}Edit{{< /ui >}} をクリックします。
1. IaC Security を有効にするには、次のいずれかを行います。
    - すべてのリポジトリで有効にするには、{{< ui >}}Enable Infrastructure as Code Scanning (IaC){{< /ui >}} を ON の位置に切り替えます。
    - 単一のリポジトリで有効にするには、そのリポジトリの {{< ui >}}IaC{{< /ui >}} スイッチを ON に切り替えます。

[1]: /ja/security/code_security/dev_tool_int/pull_request_comments/?tab=github#set-up-pull-request-comments
[2]: https://app.datadoghq.com/security/configuration/code-security/setup

{{% /tab %}}
{{% tab "GitLab" %}}

### GitLab 統合をインストールする {#install-the-gitlab-integration}

GitLab リポジトリを接続して PR コメントを有効にするには、[GitLab ソースコード][1]のセットアップ手順を参照してください。

### リポジトリで IaC Security を有効にする{#enable-iac-security-for-your-repositories-1}

GitLab 統合をセットアップした後、リポジトリで IaC Security を有効にします。

1. [Code Security 設定ページ][2]で、{{< ui >}}Activate scanning for your repositories{{< /ui >}} セクションを展開します。
1. {{< ui >}}Select your source code management provider{{< /ui >}} で、{{< ui >}}GitLab{{< /ui >}} を選択します。
1. {{< ui >}}Select where your scans should run{{< /ui >}} で、{{< ui >}}Datadog{{< /ui >}} を選択します。
1. {{< ui >}}Connect your GitLab repositories{{< /ui >}} で、次のいずれかを行います。
    - 新しい GitLab インスタンスを接続するには、{{< ui >}}Connect GitLab Instance{{< /ui >}} をクリックします。
    - 既存のアカウントで IaC Security を有効にするには、{{< ui >}}Select repositories{{< /ui >}} をクリックします。Code Security がすでに有効になっている場合は、{{< ui >}}Edit{{< /ui >}} をクリックします。
1. IaC Security を有効にするには、次のいずれかを行います。
    - すべてのリポジトリで有効にするには、{{< ui >}}Enable Infrastructure as Code Scanning (IaC){{< /ui >}} を ON の位置に切り替えます。
    - 単一のリポジトリで有効にするには、そのリポジトリの {{< ui >}}IaC{{< /ui >}} スイッチを ON に切り替えます。

[1]: /ja/integrations/gitlab-source-code/#setup
[2]: https://app.datadoghq.com/security/configuration/code-security/setup

{{% /tab %}}
{{% tab "Azure DevOps" %}}

### Azure DevOps 統合をインストールする {#install-the-azure-devops-integration}

Azure DevOps リポジトリを接続して PR コメントを有効にするには、[Azure DevOps ソースコード][1]のセットアップ手順を参照してください。

### リポジトリで IaC Security を有効にする{#enable-iac-security-for-your-repositories-2}

Azure DevOps 統合をセットアップした後、リポジトリで IaC Security を有効にします。

1. [Code Security 設定ページ][2]で、{{< ui >}}Activate scanning for your repositories{{< /ui >}} セクションを展開します。
1. {{< ui >}}Select your source code management provider{{< /ui >}} で、{{< ui >}}Azure DevOps{{< /ui >}} を選択します。
1. {{< ui >}}Select where your scans should run{{< /ui >}} で、{{< ui >}}Datadog{{< /ui >}} を選択します。
1. {{< ui >}}Connect your Azure DevOps repositories{{< /ui >}} で、次のいずれかを行います。
    - 新しい Azure DevOps 組織を接続するには、{{< ui >}}Connect Microsoft Entra App{{< /ui >}} をクリックします。
    - 既存のアカウントで IaC Security を有効にするには、{{< ui >}}Select repositories{{< /ui >}} をクリックします。Code Security がすでに有効になっている場合は、{{< ui >}}Edit{{< /ui >}} をクリックします。
1. IaC Security を有効にするには、次のいずれかを行います。
    - すべてのリポジトリで有効にするには、{{< ui >}}Enable Infrastructure as Code Scanning (IaC){{< /ui >}} を ON の位置に切り替えます。
    - 単一のリポジトリで有効にするには、そのリポジトリの {{< ui >}}IaC{{< /ui >}} スイッチを ON に切り替えます。

[1]: /ja/integrations/azure-devops-source-code/#source-code-functionality
[2]: https://app.datadoghq.com/security/configuration/code-security/setup

{{% /tab %}}
{{< /tabs >}}

## 汎用 CI プロバイダーで IaC をセットアップする {#set-up-iac-with-a-generic-ci-provider}

### 概要 {#overview}

GitHub Actions、GitLab CI/CD、または Azure DevOps を使用していない場合は、CI パイプラインで直接 [Datadog IaC Scanner][8] を実行できます。[`datadog-ci` CLI][9] を使用して、IaC スキャン結果を Datadog にアップロードします。

**GitHub 以外のリポジトリで IaC Security を実行している場合**は、デフォルトブランチで最初のスキャンを実行してください。デフォルトブランチが `master`、`main`、`default`、`stable`、`source`、`prod`、または `develop` 以外の名前を使用している場合は、リポジトリの最初のスキャンをアップロードしてください。その後、[{{< ui >}}Repository Settings{{< /ui >}}][10] でデフォルトブランチを手動で上書きし、デフォルトブランチ以外からの将来のスキャンがアップロードされて正しく処理されるようにします。

### 前提条件 {#prerequisites}

- Node.js 20 以降および npm
- `curl`
- `tar`
- `/usr/local/bin` にスキャナーをインストールする権限

次の環境変数を設定します。

| 名前         | 説明                                                                                                                                                 | 必須 | デフォルト         |
| ------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- | --------------- |
| `DD_API_KEY` | Datadog API キー。このキーを [Datadog 組織][4]で作成し、シークレットとして保存します。                                                    | はい      |                 |
| `DD_APP_KEY` | アプリケーションキー。このキーを [Datadog 組織][4]で作成し、`code_analysis_read` スコープを含めます。このキーをシークレットとして保存します。             | はい      |                 |
| `DD_SITE`    | 情報を送信する [Datadog サイト][5]。Datadog サイトは `datadoghq.com` です。                                                                        | いいえ      | `datadoghq.com` |

CI パイプラインに下記を追加します。

```bash
# Set the Datadog site to send information to
export DD_SITE="datadoghq.com"

# Install dependencies
npm install -g @datadog/datadog-ci

# Download the latest Datadog IaC Scanner (x86_64/amd64 Linux; see GitHub Releases for arm64 and other platforms)
export IAC_SCANNER_URL="https://github.com/DataDog/datadog-iac-scanner/releases/latest/download/datadog-iac-scanner_linux_amd64.tar.gz"
curl -L "${IAC_SCANNER_URL}" -o /tmp/datadog-iac-scanner.tar.gz
tar xfz /tmp/datadog-iac-scanner.tar.gz -C /tmp
mv /tmp/datadog-iac-scanner /usr/local/bin/datadog-iac-scanner

# Run the Datadog IaC scanner
exit_code=0
/usr/local/bin/datadog-iac-scanner scan -p . -o /tmp || exit_code=$?
if [ $exit_code -lt 20 -o $exit_code -gt 60 ]; then echo "IaC scan failed" ; exit $exit_code ; fi

# Upload results
datadog-ci sarif upload /tmp/datadog-iac-scanner-result.sarif
```

<div class="alert alert-info">
  この例では、Datadog IaC Scanner のx86_64 (amd64) Linux バージョンを使用しています。このスキャナーは、arm64 Linux、macOS、および Windows もサポートしています。別の OS やアーキテクチャを使用している場合は、<a href="https://github.com/DataDog/datadog-iac-scanner/releases">GitHub リリース</a>ページから適切なリリースを選択し、 <code>IAC_SCANNER_URL</code> の値を更新してください。
</div>

## サードパーティの静的解析結果を IaC Security にアップロードする {#upload-third-party-static-analysis-results-to-iac-security}

<div class="alert alert-info">
  Checkov を含むサードパーティの Infrastructure-as-Code (IaC) スキャナーからの SARIF 結果を IaC Security にインポートできます。SAST でサポートされている SARIF 準拠ツールについては、<a href="https://docs.datadoghq.com/security/code_security/static_analysis/setup/?tab=github#upload-third-party-static-analysis-results-to-datadog">
  サードパーティの静的解析結果のアップロード</a>を参照してください。Node.js バージョン 14 以降が必要です。
</div>

SARIF レポートをアップロードするには:

1. [`DD_API_KEY` 変数と `DD_APP_KEY` 変数が定義されている][4]ことを確認します。
2. 必要に応じて、[`DD_SITE`変数][5]を設定します (デフォルトは `datadoghq.com` です)。
3. `datadog-ci` ユーティリティ (バージョン 2.0 以降) をインストールします。

   ```bash
   npm install -g @datadog/datadog-ci
   ```

4. サードパーティの IaC スキャンツール (Checkov、Trivy、KICS など) をコードに対して実行し、結果を SARIF v2.1.0 形式で出力します。
5. 結果を Datadog にアップロードします。

   ```bash
   datadog-ci sarif upload $OUTPUT_LOCATION
   ```
   - アップロードオプション
       - `--tags:` カスタムタグを追加する (形式: `key:value`)
       - `--max-concurrency:` 同時アップロード数を設定する (デフォルト: 20)
       - `--dry-run:` アップロードせずに検証する
### 必須の SARIF 属性 {#required-sarif-attributes}
サードパーティ製スキャナー (Checkov を除く) の Datadog IaC Scanning で適切に取り込み、表示させるには、IaC Security の検出結果として認識されるために、SARIF ファイルに次の属性が含まれている必要があります。
1. `Runs[...].tool.driver.name: Datadog IaC Scanning`
2. `Runs[...].tool.driver.version: "code_update"` または `"full_scan"`
    - `"full_scan”` リポジトリ全体の完全スキャン用
    - `"code_update"` プルリクエスト/インクリメンタルスキャン用
4. `Runs[...].tool.driver.rules[...].properties.tags:`
    - `["DATADOG_RULE_TYPE:IAC_SCANNING"]`
    - `[“DATADOG_SCANNED_FILE_COUNT: <number>”]` (`"number"` はスキャンされたファイルの数) 
5. `Runs[...].results[...].locations[...].physicalLocation:`
    - `artifactLocation.uri`: リポジトリルートからのファイルの相対パス
    - `region.startLine`: 開始行番号
    - `region.endLine`: 終了行番号
    - `region.startColumn`: 開始列番号
    - `region.endColumn`: 終了列番号
<div class="alert alert-info">抑制により、違反が警告を発せずに無視されます。〜たら <code>results[ ].suppressions</code> が存在する場合、その違反は完全に無視されます。</div>

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/integrations/github/#setup
[2]: https://app.datadoghq.com/security/configuration/code-security/setup
[3]: https://www.oasis-open.org/committees/tc_home.php?wg_abbrev=sarif
[4]: /ja/account_management/api-app-keys/
[5]: /ja/getting_started/site/
[6]: https://docs.datadoghq.com/ja/security/code_security/static_analysis/setup/?tab=github#upload-third-party-static-analysis-results-to-datadog
[7]: https://www.oasis-open.org/committees/tc_home.php?wg_abbrev=sarif
[8]: https://github.com/DataDog/datadog-iac-scanner
[9]: https://github.com/DataDog/datadog-ci?tab=readme-ov-file#sarif
[10]: https://app.datadoghq.com/source-code/repositories