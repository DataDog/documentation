---
disable_toc: false
further_reading:
- link: /security/cloud_security_management/vulnerabilities
  tag: ドキュメント
  text: Cloud Security Vulnerabilities
- link: /infrastructure/containers/container_images
  tag: ドキュメント
  text: コンテナイメージの表示
- link: /security/cloud_security_management/setup/agent
  tag: ドキュメント
  text: Cloud Security の Datadog Agent のセットアップ
title: CI/CD におけるコンテナイメージスキャン
---
## 概要 {#overview}

Cloud Security を使用すると、本番環境へのデプロイ前に、CI/CD 中のコンテナイメージをスキャンして脆弱性を検出できます。脆弱性スキャンをパイプラインに直接統合することで、開発ライフサイクルの早い段階でセキュリティ問題を検出および修正できます。

CI/CD ベースのコンテナイメージスキャンをサポートするために、Datadog は **Datadog Security CLI** を提供しています。この CLI は CI ジョブ内で直接実行するように設計されており、パイプラインの一部としていつどのようにスキャンを実行するかを完全に制御できます。

**注**: 本番環境での脆弱性管理については、[Cloud Security Vulnerabilities][1] を参照してください。

## 開始する {#get-started}

CI/CD でコンテナイメージスキャンを開始するには、以下の手順を実行します。

1. [Datadog の資格情報を構成する](#configure-datadog-credentials)
2. [CI/CD パイプラインに Datadog Security CLI をインストールする](#install-the-datadog-security-cli)
3. [[Cloud Security Vulnerabilities][3] ページでスキャン結果を表示する](#view-scan-results)
4. オプションとして、より迅速な反復のために[開発中にローカルスキャンを実行する](#run-local-scans-during-development)

### Datadog の資格情報を構成する {#configure-datadog-credentials}

スキャン結果を Datadog にアップロードするには、CI パイプラインで以下の環境変数を構成します。

| 名前         | 説明                                                                                                                | 必須 | デフォルト         |
|--------------|----------------------------------------------------------------------------------------------------------------------------|----------|-----------------|
| `DD_API_KEY` | Datadog API キー。このキーは [Datadog 組織][4]によって作成され、シークレットとして保存する必要があります。           | 必須      |                 |
| `DD_APP_KEY` | Datadog アプリケーションキー。[Datadog 組織][5]によって作成されたこのキーには、`appsec_vm_read` スコープを含め、シークレットとして保存する必要があります。   | 必須      |                 |
| `DD_SITE`    | 情報の送信先の [Datadog サイト][6]。使用している Datadog サイトは {{< region-param key="dd_site" code="true" >}}です。       | No       | `datadoghq.com` |

<div class="alert alert-info">
機密情報を保護するため、API キーやアプリケーションキーは CI/CD プラットフォームのシークレットとして保存してください。
</div>


### Datadog Security CLI をインストールする {#install-the-datadog-security-cli}

Datadog Security CLI は、Datadog パッケージリポジトリからインストールできます。Datadog Security CLI は、Debian/Ubuntu、Red Hat/CentOS、および macOS システムにインストールできます。コンテナイメージスキャンは、以下を含むすべての主要な CI/CD プラットフォームで動作します。
- GitHub Actions
- GitLab CI/CD
- Azure DevOps
- シェルスクリプトを実行できるその他の CI プロバイダー

カスタマイズ可能なスクリプトアプローチにより、パイプラインでいつどのようにスキャンを実行するかを完全に制御できます。以下のインストール方法を選択してください。


{{< tabs >}}
{{% tab "Debian/Ubuntu" %}}

#### パッケージリポジトリからインストールする {#install-from-package-repository}

```bash
# Import Datadog APT signing key
DD_APT_KEY_URL="https://keys.datadoghq.com/DATADOG_APT_KEY_CURRENT.public"
curl -fsSL "$DD_APT_KEY_URL" | sudo gpg --dearmor -o /usr/share/keyrings/datadog-archive-keyring.gpg

# Add Datadog repository
echo "deb [signed-by=/usr/share/keyrings/datadog-archive-keyring.gpg] https://apt.datadoghq.com/ stable datadog-security-cli" \
| sudo tee /etc/apt/sources.list.d/datadog-security-cli.list

# Update package list and install
sudo apt update
sudo apt install datadog-security-cli
```

{{% /tab %}}
{{% tab "Red Hat/CentOS" %}}

#### パッケージリポジトリからインストールする {#install-from-package-repository-1}

```bash
# Import Datadog RPM signing key
sudo rpm --import https://keys.datadoghq.com/DATADOG_RPM_KEY_CURRENT.public

# Add Datadog repository
sudo tee /etc/yum.repos.d/datadog-security-cli.repo > /dev/null <<'EOF'
[datadog-security-cli]
name=Datadog Security CLI
baseurl=https://yum.datadoghq.com/stable/datadog-security-cli/$basearch/
enabled=1
gpgcheck=1
gpgkey=https://keys.datadoghq.com/DATADOG_RPM_KEY_CURRENT.public
repo_gpgcheck=1
EOF

# Install the CLI
sudo yum install datadog-security-cli
```

{{% /tab %}}
{{% tab "macOS" %}}

#### Homebrew でインストールする {#install-with-homebrew}

```bash
# Install via Homebrew
brew install --cask datadog-security-cli
```

{{% /tab %}}
{{< /tabs >}}

#### 最初のスキャンを実行する {#run-your-first-scan}

Datadog Security CLI をインストールした後、Datadog の資格情報を設定し、コンテナイメージをスキャンします。

```bash
# Configure Datadog credentials
export DD_API_KEY=<your_api_key>
export DD_APP_KEY=<your_app_key>
export DD_SITE={{< region-param key="dd_site" >}}

# Scan your container image
datadog-security-cli image myimage:tag
```

CLI はスキャン結果を直接ターミナルに出力し、以下を表示します。
- イメージ情報 (名前、ダイジェスト、オペレーティングシステム)
- 検出された脆弱性の合計数
- 重大性の内訳 (緊急、高、中、低)
- CVE ID、影響を受けるパッケージ、および利用可能な修正を含む脆弱性の詳細テーブル

{{< img src="security/vulnerabilities/csm-vm-cli-output.png" alt="コンテナイメージの脆弱性スキャン結果が表示された Datadog Security CLI の出力" style="width:100%;" >}}

### スキャン結果を表示する {#view-scan-results}

最初のスキャンを実行した後、結果は数分以内に [Cloud Security Vulnerabilities][3] ページに表示されます。以下が可能です。

- **リソースタイプでフィルタリングする**: CI/CD でスキャンされたコンテナイメージ固有の脆弱性を表示する
- **重大度で優先順位を付ける**: まずは重大度が緊急および高い脆弱性に対処する
- **修正を追跡する**: 脆弱性をチームメンバーに割り当て、解決状況を追跡する
- **通知を設定する**: 新しい重大な脆弱性が検出されたときにアラートを受け取る

{{< img src="security/vulnerabilities/csm-vm-explorer-actionability-2.png" alt="Cloud Security Vulnerabilities 検出結果ページ" width="100%">}}

### 開発中にローカルスキャンを実行する {#run-local-scans-during-development}

CI にコミットする前のより迅速な反復のために、上記の[インストールセクション](#install-the-datadog-security-cli)で説明されているのと同じインストール方法を使用して、Datadog Security CLI をローカルにインストールします。

#### 結果を保存せずにローカルでスキャンする {#scan-locally-without-persisting-results}

ローカルでテストする場合、`--no-persist` フラグを使用して、結果を Datadog にアップロードすることなくイメージをスキャンします。

```bash
# Scan locally without sending results to Datadog
datadog-security-cli image myapp:latest --no-persist
```

これは次のような場合に役立ちます。
- Datadog データに影響を与えることなく CLI 機能をテストする
- ローカル開発中にコンテナイメージを検証する
- CI にコミットする前に、イメージビルドの反復を迅速に行う

## スキャンオプション {#scan-options}

Datadog Security CLI は、コンテナイメージスキャンをカスタマイズするためのさまざまなオプションをサポートしています。

### 重大度のしきい値を構成する {#configure-severity-thresholds}

```bash
# Fail the build if critical vulnerabilities are found
datadog-security-cli image myapp:latest --fail-on critical

# Fail on high or critical vulnerabilities
datadog-security-cli image myapp:latest --fail-on high
```

### 出力形式 {#output-formats}

```bash
# Output results in JSON format
datadog-security-cli image myapp:latest --output json
```

## Dockerfile を脆弱性にリンクする {#link-dockerfile-to-vulnerabilities}

<div class="alert alert-info">
Dockerfile を脆弱性にリンクすることは、CI/CD で Datadog Security CLI を使用してスキャンする場合にのみサポートされます。この機能は、Datadog Agent またはエージェントレススキャンを通じてスキャンされたイメージでは利用できません。
</div>

Datadog が検出された脆弱性をソースコード (Dockerfile) にリンクできるようにするには、コンテナイメージのビルド時に特定の **OCI イメージアノテーション**を含める必要があります。

これにより、Datadog は以下のことが可能になります。
- コンテナイメージの脆弱性パネルで、**Dockerfile のプレビュー**を直接表示する
- **ソースベースの修正**を有効にし、コンテキスト内で問題を特定して修正できるようにする

これらのアノテーションは、スキャンされたイメージを対応するリポジトリ、コミット、および Dockerfile パスに関連付けるために必要なメタデータを提供します。

### 必須のアノテーション {#required-annotations}

ビルド時に以下のアノテーションをイメージに追加します。

- `org.opencontainers.image.source`
  リポジトリ URL (例: `https://github.com/org/repo`)

- `org.opencontainers.image.revision`
  イメージのビルドに使用されたコミット SHA

- `com.datadoghq.image.source_path`
  リポジトリ内の Dockerfile へのパス (例: `Dockerfile` または `docker/Dockerfile`)

### オプションのアノテーション {#optional-annotations}

これらのアノテーションは、Datadog によるベースイメージの修正提案を改善する上で役立ちます。

- `org.opencontainers.image.base.name`
  ベースイメージ名 (例: `ubuntu:22.04`)

- `org.opencontainers.image.base.digest`
  ベースイメージのダイジェスト

詳細については、[OCI Image Spec アノテーションのドキュメント][14]を参照してください。

### 例 {#example}

#### Docker ビルドの使用 {#using-docker-build}

アノテーションを使用する方法が推奨されます。ラベルもフォールバックとしてサポートされています。

```bash
docker build \
  --annotation org.opencontainers.image.source="https://github.com/org/repo" \
  --annotation org.opencontainers.image.revision="$(git rev-parse HEAD)" \
  --annotation com.datadoghq.image.source_path="Dockerfile" \
  -t myapp:latest .
```

#### Datadog Security CLI の使用 {#using-the-datadog-security-cli}

アノテーションを手動で追加する代わりに、Datadog Security CLI が `--dockerfile` フラグを使用してスキャン時に必要なメタデータを直接挿入できます。

```bash
datadog-security-cli image myapp:latest --dockerfile ./Dockerfile
```

## トラブルシューティング {#troubleshooting}

### 認証エラー {#authentication-errors}

認証エラーが発生した場合:
1. `DD_API_KEY` および `DD_APP_KEY` が正しく設定されていることを確認します。
2. アプリケーションキーに `appsec_vm_read` スコープが含まれていることを確認します。
3. `DD_SITE` が Datadog 組織のサイトと一致していることをチェックします。

### イメージが見つからないエラー {#image-not-found-errors}

CLI がイメージを見つけられない場合:
1. イメージがローカルに存在することを確認します。`docker images`。
2. レジストリを含む完全なイメージ名を使用します (該当する場合)。
3. スキャン前にイメージがビルドされていることを確認します。

### ネットワーク接続の問題 {#network-connectivity-issues}

ネットワークの問題でスキャンが失敗する場合:
1. CI 環境から Datadog サイトにアクセスできることを確認します。
2. プロキシまたはファイアウォールの制限をチェックします。
3. アウトバウンドの HTTPS 接続が許可されていることを確認します。

詳細については、[Cloud Security トラブルシューティングガイド][12]を参照するか、[Datadog サポート][13]にお問い合わせください。

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/security/cloud_security_management/vulnerabilities
[2]: /ja/security/code_security/software_composition_analysis/
[3]: https://app.datadoghq.com/security/csm/vm
[4]: /ja/account_management/api-app-keys/#api-keys
[5]: /ja/account_management/api-app-keys/#application-keys
[6]: /ja/getting_started/site/
[7]: /ja/integrations/github/#link-a-repository-in-your-organization-or-personal-account
[8]: /ja/integrations/guide/source-code-integration
[9]: /ja/security/code_security/dev_tool_int/github_pull_requests
[10]: /ja/integrations/gitlab-source-code/#setup
[11]: /ja/integrations/azure-devops-source-code/#setup
[12]: /ja/security/cloud_security_management/troubleshooting/vulnerabilities/
[13]: /ja/help/
[14]: https://specs.opencontainers.org/image-spec/annotations/