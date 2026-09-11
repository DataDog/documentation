---
algolia:
  tags:
  - static analysis
  - static analysis rules
  - static application security testing
  - SAST
aliases:
- /ja/continuous_integration/static_analysis
- /ja/static_analysis
- /ja/security/code_security/static_analysis/circleci_orbs/
- /ja/code_analysis/static_analysis/setup/
description: Datadog Static Code Analysis について学ぶことで、コードが本番環境に到達する前に、コードの品質問題やセキュリティ脆弱性をスキャンすることができます。
is_beta: false
title: Static Code Analysis (SAST) のセットアップ
---
{{% site-region region="gov,gov2" %}}
<div class="alert alert-warning">
    Code Security は、このサイトでは利用できません. {{< region-param key="dd_site_name" >}} Code Security は、このサイトでは利用できません.
</div>
{{% /site-region %}}

## 概要 {#overview}
Datadog SAST をアプリ内で設定するには、[**Security** > **Code Security**][1] に移動します。

## Static Code Analysis スキャンの実行場所を選択 {#select-where-to-run-static-code-analysis-scans}
### Datadog ホスト型スキャンでスキャンする {#scan-with-datadog-hosted-scanning}

Datadog のインフラストラクチャー上で直接 Datadog Static Code Analysis (SAST) スキャンを実行できます。サポートされているリポジトリタイプには以下が含まれます。
- [GitHub][18] ([Git Large File Storage][17] を使用しているリポジトリを除く)
- [GitLab.com および GitLab Self-Managed][20]
- [Azure DevOps][19]

始めるには、[**Code Security** ページ][1]に移動します。

### CI パイプラインでスキャンする {#scan-in-ci-pipelines}
Datadog Static Code Analysis は、[`datadog-ci` CLI][8] を使用して CI パイプラインで実行されます。

まず、Datadog の API キーとアプリケーションキーを構成します。`DD_APP_KEY` と`DD_API_KEY` をシークレットとして追加します。Datadog のアプリケーションキーに `code_analysis_read` スコープがあることを確認してください。

次に、選択した CI プロバイダーの以下の手順に従って Static Code Analysis を実行します。

{{< whatsnext desc="CI プロバイダー別の手順を参照してください。">}}
    {{< nextlink href="security/code_security/static_analysis/setup/github_actions" >}}GitHub Actions{{< /nextlink >}}
    {{< nextlink href="security/code_security/static_analysis/setup/generic_ci_providers" >}}汎用 CI プロバイダー{{< /nextlink >}}
{{< /whatsnext >}}

## ソースコード管理プロバイダーを選択する {#select-your-source-code-management-provider}
Datadog Static Code Analysis は、すべてのソースコード管理プロバイダーをサポートしており、GitHub、GitLab、および Azure DevOps に対してネイティブサポートを提供しています。

{{< tabs >}}
{{% tab "GitHub" %}}

[GitHub インテグレーションタイル][1]を使用して GitHub App を構成し、インラインコードスニペットと[プルリクエストコメント][3]を有効にするために[ソースコードインテグレーション][2]を設定します。

GitHub App をインストールする際には、特定の機能を有効にするために以下の権限が必要です。

- `Content: Read` は、Datadog に表示されるコードスニペットを確認できるようにします。
- `Pull Request: Read & Write` は、Datadog が[プルリクエストコメント][3]を使用してプルリクエスト内で違反に対するフィードバックを直接追加できるようにし、[脆弱性を修正][4]のためのプルリクエストを開くことも可能にします。
- `Checks: Read & Write` は、SAST 違反に対するチェックを作成してプルリクエストをブロックできるようにします。

[1]: /ja/integrations/github/#link-a-repository-in-your-organization-or-personal-account
[2]: /ja/integrations/guide/source-code-integration
[3]: /ja/security/code_security/dev_tool_int/github_pull_requests
[4]: /ja/security/code_security/dev_tool_int/

{{% /tab %}}
{{% tab "GitLab" %}}

GitLab リポジトリを Datadog に接続するための [GitLab ソースコードセットアップ手順][1]を参照してください。GitLab.com と Self-Managed インスタンスの両方がサポートされています。

[1]: /ja/integrations/gitlab-source-code/#setup 

{{% /tab %}}
{{% tab "Azure DevOps" %}}

**注:** Azure DevOps integrations は Microsoft Entra テナントに接続されている必要があります。Azure DevOps Serverは**サポートされていません**。

Azure DevOps リポジトリを Datadog に接続するための [Azure ソースコードセットアップ手順][4]を参照してください。

[1]: https://app.datadoghq.com/security/configuration/code-security/setup
[2]: https://portal.azure.com/#view/Microsoft_AAD_RegisteredApps/ApplicationsListBlade
[3]: https://app.datadoghq.com/organization-settings/api-keys
[4]: /ja/integrations/azure-devops-source-code/#setup
[5]: /ja/getting_started/site/

{{% /tab %}}
{{% tab "その他" %}}

別のソースコード管理プロバイダーを使用している場合は、`datadog-ci` CLI ツールを使用して CI パイプラインで Static Code Analysis を実行し、Datadog に [upload the results](#upload-third-party-static-analysis-results-to-datadog) してください。
結果が **Code Security** ページに表示され始める前に、リポジトリのデフォルトブランチで分析を実行する**必要があります**。

{{% /tab %}}
{{< /tabs >}}

## 構成をカスタマイズする {#customize-your-configuration}

デフォルトでは、Datadog Static Code Analysis (SAST) は、各プログラミング言語の [Datadog のデフォルトルールセット][6]を使用してリポジトリをスキャンします。Datadog または `code-security.datadog.yaml` ファイル内で、実行するルールセットやルール、その他のパラメーターをカスタマイズできます。完全な構成リファレンスについては、[Static Code Analysis (SAST) 構成][27]を参照してください。

## Datadog のサービスとチームに発見をリンクする {#link-findings-to-datadog-services-and-teams}

{{% security-products/link-findings-to-datadog-services-and-teams %}}


## Diff-aware scanning {#diff-aware-scanning}

Diff-aware scanning により、Datadog の静的アナライザーは、機能ブランチのコミットで変更されたファイルのみをスキャンします。リポジトリ内のすべてのファイルに対して毎回分析を実行しないことで、スキャン時間を大幅に短縮します。CI パイプラインで Diff-aware scanning を有効にするには、次の手順に従ってください。

1. CI パイプラインで`DD_APP_KEY`、`DD_SITE`、および`DD_API_KEY` の変数が設定されていることを確認してください。
2. 静的アナライザーを呼び出す前に `datadog-ci git-metadata upload` を呼び出してください。このコマンドは、Git メタデータが Datadog バックエンドで利用可能になることを保証します。Git メタデータは、分析対象のファイル数を算出するために必要です。
3. datadog-static-analyzerが `--diff-aware` フラグ付きで呼び出されることを確認してください。

コマンドの実行順の例 (これらのコマンドは Git リポジトリ内で実行する必要があります)

```bash
datadog-ci git-metadata upload

datadog-static-analyzer -i /path/to/directory -g -o sarif.json -f sarif –-diff-aware <...other-options...>
```

**注:** Diff-aware scanning が完了できない場合、ディレクトリ全体がスキャンされます。

## サードパーティの静的分析結果を Datadog へアップロードする{#upload-third-party-static-analysis-results-to-datadog}

<div class="alert alert-info">
  SARIF のインポートは、Snyk、CodeQL、Semgrep、Gitleaks、および Sysdig でテストされています。他の SARIF 準拠ツールに問題が発生した場合は、<a href="/help">Datadog サポート</a>にお問い合わせください。
</div>

サードパーティの静的分析ツールから Datadog に分析結果を送信することができます (相互運用可能な[静的分析結果交換フォーマット (SARIF)][2] であることが条件)。Node.js バージョン 14 以降が必要です。

SARIF レポートをアップロードするには

1. [`DD_API_KEY` および `DD_APP_KEY` 変数が定義されている][4]を確認してください。
2. 必要に応じて [`DD_SITE` 変数][7]を設定します (デフォルトは `datadoghq.com`)。
3. `datadog-ci` ユーティリティをインストールします。

   ```bash
   npm install -g @datadog/datadog-ci
   ```

4. サードパーティの静的分析ツールをコード上で実行し、結果を SARIF 形式で出力します。
5. 結果を Datadog にアップロードします。

   ```bash
   datadog-ci sarif upload $OUTPUT_LOCATION
   ```

## SARIF サポートガイドライン{#sarif-support-guidelines}

Datadog は、[2.1.0 SARIF スキーマ][15]に準拠したサードパーティの SARIF ファイルの取り込みをサポートしています。SARIF
schema は静的アナライザーツールによって異なる方法で使用されます。サードパーティの SARIF ファイルを Datadog に送信する場合は、
以下の詳細に準拠していることを確認してください。

 - 違反の場所は、結果の `physicalLocation` オブジェクトを通じて指定されます。
    - `artifactLocation` とその `uri` は、リポジトリのルートに対して**相対的でなければなりません**。
    - `region` オブジェクトは、Datadog UI で強調表示されたコードの部分です。
 - `partialFingerprints` は、リポジトリ全体で発見を一意に識別するために使用されます。
 - `properties`および`tags`は、さらに情報を追加します。
    - タグ `DATADOG_CATEGORY` は、発見のカテゴリを指定します。許容される値は `SECURITY`、`PERFORMANCE`、`CODE_STYLE`、`BEST_PRACTICES`、`ERROR_PRONE` です。
    - カテゴリ `SECURITY` で注釈された違反は、Vulnerabilities explorer およびリポジトリビューの Security タブに表示されます。
 - `tool` セクションには、有効な `driver` セクションと `name` および`version` 属性が必要です。

例えば、Datadog によって処理された SARIF ファイルの例は次のとおりです。


```json

{
    "runs": [
        {
            "results": [
                {
                    "level": "error",
                    "locations": [
                        {
                            "physicalLocation": {
                                "artifactLocation": {
                                    "uri": "missing_timeout.py"
                                },
                                "region": {
                                    "endColumn": 76,
                                    "endLine": 6,
                                    "startColumn": 25,
                                    "startLine": 6
                                }
                            }
                        }
                    ],
                    "message": {
                        "text": "timeout not defined"
                    },
                    "partialFingerprints": {
                        "DATADOG_FINGERPRINT": "b45eb11285f5e2ae08598cb8e5903c0ad2b3d68eaa864f3a6f17eb4a3b4a25da"
                    },
                    "properties": {
                        "tags": [
                            "DATADOG_CATEGORY:SECURITY",
                            "CWE:1088"
                        ]
                    },
                    "ruleId": "python-security/requests-timeout",
                    "ruleIndex": 0
                }
            ],
            "tool": {
                "driver": {
                    "informationUri": "https://www.datadoghq.com",
                    "name": "<tool-name>",
                    "rules": [
                        {
                            "fullDescription": {
                                "text": "Access to remote resources should always use a timeout and appropriately handle the timeout and recovery. When using `requests.get`, `requests.put`, `requests.patch`, etc. - we should always use a `timeout` as an argument.\n\n#### Learn More\n\n - [CWE-1088 - Synchronous Access of Remote Resource without Timeout](https://cwe.mitre.org/data/definitions/1088.html)\n - [Python Best Practices: always use a timeout with the requests library](https://www.codiga.io/blog/python-requests-timeout/)"
                            },
                            "helpUri": "https://link/to/documentation",
                            "id": "python-security/requests-timeout",
                            "properties": {
                                "tags": [
                                    "CWE:1088"
                                ]
                            },
                            "shortDescription": {
                                "text": "no timeout was given on call to external resource"
                            }
                        }
                    ],
                    "version": "<tool-version>"
                }
            }
        }
    ],
    "version": "2.1.0"
}
```

## SARIF から CVSS 重大度へのマッピング {#sarif-to-cvss-severity-mapping}

[SARIF フォーマット][15]は、none、note、warning、および error の4つの重大度を定義しています。
ただし、Datadog は[共通脆弱性評価システム][16] (CVSS) を使用して違反および脆弱性の重大度を報告しており、
そこでは critical、high、medium、low、none の5つの重大度が定義されています。

SARIF ファイルを取り込む際、Datadog は以下のマッピングルールを使用して SARIF の重大度を CVSS の重大度にマッピングします。


| SARIF の重大度| CVSS の重大度|
|----------------|---------------|
| Error          | Critical      |
| Warning        | High          |
| Note           | Medium        |
| None           | Low           |

## データ保持 {#data-retention}

Datadog は、当社の [Data Retention Periods](https://docs.datadoghq.com/ja/data_security/data_retention_periods/) に従って発見を保存します。Datadog は顧客のソースコードを保存または保持しません。

## <!-- 参考資料

{{< partial name="whats-next/whats-next.html" >}} -->

[1]: https://app.datadoghq.com/security/configuration/code-security/setup
[2]: https://www.oasis-open.org/committees/tc_home.php?wg_abbrev=sarif
[3]: /ja/ide_plugins/idea/#static-analysis
[4]: /ja/account_management/api-app-keys/
[6]: /ja/security/code_security/static_analysis/static_analysis_rules
[7]: /ja/getting_started/site/
[8]: https://github.com/DataDog/datadog-ci
[9]: /ja/integrations/github/#link-a-repository-in-your-organization-or-personal-account
[10]: /ja/integrations/guide/source-code-integration
[11]: /ja/security/code_security/dev_tool_int/github_pull_requests
[12]: /ja/security/code_security/dev_tool_int/github_pull_requests#fixing-a-vulnerability-directly-from-datadog
[13]: https://docs.github.com/en/actions/security-for-github-actions/security-guides
[15]: https://docs.oasis-open.org/sarif/sarif/v2.1.0/sarif-v2.1.0.html
[16]: https://www.first.org/cvss/
[17]: https://docs.github.com/en/repositories/working-with-files/managing-large-files/about-git-large-file-storage
[18]: /ja/security/code_security/static_analysis/setup/?tab=github#select-your-source-code-management-provider
[19]: /ja/security/code_security/static_analysis/setup/?tab=azuredevops#select-your-source-code-management-provider
[20]: /ja/security/code_security/static_analysis/setup/?tab=gitlab#select-your-source-code-management-provider
[22]: https://docs.datadoghq.com/ja/internal_developer_portal/software_catalog/entity_model/?tab=v30#migrating-to-v30
[24]: https://docs.datadoghq.com/ja/account_management/teams/
[25]: https://github.com/DataDog/datadog-static-analyzer/blob/main/doc/legacy_config.md
[27]: /ja/security/code_security/static_analysis/configuration/
[101]: https://docs.datadoghq.com/ja/software_catalog/service_definitions/v3-0/
[102]: https://docs.datadoghq.com/ja/internal_developer_portal/software_catalog/entity_model/?tab=v30#codelocations
[103]: https://docs.datadoghq.com/ja/data_security/data_retention_periods/