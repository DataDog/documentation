---
aliases:
- /ja/security/cloud_siem/threat_intelligence
disable_toc: false
further_reading:
- link: security/cloud_siem/detection_rules
  tag: ドキュメント
  text: カスタム検出ルールを作成する
- link: /security/cloud_siem/triage_and_investigate/ioc_explorer/
  tag: ドキュメント
  text: IOC エクスプローラー
- link: /security/cloud_siem/guide/ingest-stix-threat-intelligence/
  tag: ドキュメント
  text: STIX 脅威インテリジェンスを取り込む
- link: https://www.datadoghq.com/blog/recorded-future-content-pack/
  tag: ブログ
  text: Recorded Future の脅威インテリジェンスを Datadog Cloud SIEM と統合する
site_support_id: byoti
title: 独自の脅威インテリジェンスの持ち込み
---
## 概要{#overview}

Datadog は、Cloud SIEM ログ用の組み込みの[脅威インテリジェンス][1]を提供しています。この記事では、独自のカスタム脅威インテリジェンスフィードでログを機能強化することにより、その機能を拡張する方法を説明します。

Cloud SIEM は、Datadog のテーブルに保存された脅威インテリジェンスの侵害インジケーター (IOC) を使用して、ログの機能強化や検索を行う機能をサポートしています。[リファレンステーブル][7]を使用すると、メタデータを Datadog 内の既存情報と組み合わせることができます。

<div class="alert alert-info">CSV をアップロードする代わりに、プログラムでインジケーターを STIX 2.1 バンドルとしてプッシュすることもできます。<a href="/security/cloud_siem/guide/ingest-stix-threat-intelligence/">STIX 脅威インテリジェンスを取り込む</a>を参照してください。</div>

### 独自の脅威インテリジェンスの持ち込みの仕組み{#how-bring-your-own-threat-intelligence-works}

Cloud SIEM がログを処理する際、そのログの IP、ドメイン、ハッシュ、AWS アカウント ID、コンテナ、SSH、およびユーザーエージェントの属性が、Cloud SIEM 用に有効化したリファレンステーブルに対して照合されます。プロセスは以下のとおりです。

1. 各ログについて、Datadog は関連する属性を抽出します。
    - **IP アドレス**: ログ内のどこかに見つかった IPv4 および IPv6 アドレス。
    - **ドメインおよびホスト名**: 以下の属性の値 (存在する場合):
      - `DNS_QUESTION_NAME`
      - `DNS_ANSWER_NAME`
      - `HTTP_URL`
      - `HTTP_URL_DETAILS_DOMAIN`
      - `HOSTNAME`
    - **ファイルハッシュ**: ファイルおよびプロセス関連のログ属性に見つかった SHA1、SHA256、および ssdeep ハッシュ。
    - **AWS アカウント ID**: AWS 関連のログ属性の値 (例: `userIdentity.accountId`)。
    - **コンテナイメージ名**: コンテナランタイムログの値。
    - **コンテナレジストリアカウント名**: コンテナレジストリログの値。
    - **SSH 公開鍵**: SSH 認証ログの値。
    - **ユーザーエージェント**: HTTP リクエストヘッダー属性の値。
2. 抽出された値をリファレンステーブルと照合して評価します。
    - 抽出された値は、対応するリファレンステーブルの主キーと比較されます。各インジケータータイプには、特定の主キーを持つ独自のリファレンステーブルがあります (例: IP の場合は `ip_address`、SHA256 ハッシュの場合は `sha256`)。
3. 一致時に機能強化します。
    - 一致が見つかった場合、Datadog はテーブルの脅威インテリジェンスメタデータ (例: `category`、`source`、`first_seen`、`last_seen`、`confidence`) を使用してログを機能強化します。機能強化されたフィールドは、検索、分析、および検出ルールで使用できるようになります。

**注**:
- Cloud SIEM はログをリアルタイムで評価し、[Datadog がキュレーションした脅威インテリジェンス][10]とユーザー自身のリファレンステーブルの両方を使用します。
- リファレンステーブルは、カスタム IoC を格納し、ログや検出結果と結合するためのメカニズムです。

### 侵害インジケーターをリファレンステーブルに格納する{#store-indicators-of-compromise-in-reference-tables}

脅威インテリジェンスは CSV 形式でサポートされています。インジケータータイプ (例: IP アドレス、ドメイン、SHA256 ハッシュ、AWS アカウント ID、コンテナイメージ名) ごとのテーブルが必要であり、さらに以下の列が必要です。

#### IP アドレスの CSV 構造{#csv-structure-for-ip-addresses}

| フィールド           | データ | 説明                                                                              | 必須 | 例                                                                   |
|-----------------|------|------------------------------------------------------------------------------------------|----------|---------------------------------------------------------------------------|
| ip_address| テキスト| IPv4 ドット表記形式のリファレンステーブルの主キー。                | true| 192.0.2.1|
| additional_data| json| ログを機能強化するための追加データ。                                                     | false| `{"ref":"hxxp://example.org"}`                                            |
| category| テキスト| 脅威インテリジェンスの[カテゴリー][8]。これは、一部の標準検出ルールで使用されます。    | true| Malware|
| intention| テキスト| 脅威インテリジェンスの[意図][9]。これは、一部の標準検出ルールで使用されます。      | true     | malicious                                                                 |
| source          | text | ソースの名前とそのサイトへのリンク (例: あなたのチームとチームの Wiki)。| true     | `{"name":"internal_security_team", "url":"https://teamwiki.example.org"}` |

<div class="alert alert-info">CSV 内の JSON は二重引用符で囲む必要があります。以下は、CSV の例です。

```
ip_address,additional_data,category,intention,source
192.0.2.1,"{""ref"":""hxxp://example.org""}",scanner,suspicious,"{""name"":""internal_security_team"", ""url"":""https://teamwiki.example.org""}"
192.0.2.2,"{""ref"":""hxxp://example.org""}",scanner,suspicious,"{""name"":""internal_security_team"", ""url"":""https://teamwiki.example.org""}"
192.0.2.3,"{""ref"":""hxxp://example.org""}",scanner,suspicious,"{""name"":""internal_security_team"", ""url"":""https://teamwiki.example.org""}"
```
</div>

#### ドメインの CSV 構造 {#csv-structure-for-domains}

| フィールド           | データ | 説明                                                                              | 必須 | 例                                                                   |
|-----------------|------|------------------------------------------------------------------------------------------|----------|---------------------------------------------------------------------------|
| domain          | テキスト| リファレンステーブルの主キー。                                                | true     | mal-domain.com                                                            |
| additional_data| json| ログを機能強化するための追加データ。                                                     | false| `{"ref":"hxxp://example.org"}`                                            |
| category| テキスト| 脅威インテリジェンスの[カテゴリー][8]。これは、一部の標準検出ルールで使用されます。    | true     | Phishing                                                                  |
| intention| テキスト| 脅威インテリジェンスの[意図][9]。これは、一部の標準検出ルールで使用されます。      | true     | malicious                                                                 |
| source          | text | ソースの名前とそのサイトへのリンク (例: あなたのチームとチームの Wiki)。| true     | `{"name":"internal_security_team", "url":"https://teamwiki.example.org"}` |

#### ファイルハッシュの CSV 構造 {#csv-structure-for-file-hashes}

ファイルハッシュのインジケーターには、ハッシュタイプ (SHA1、SHA256、または ssdeep) ごとに個別のリファレンステーブルが必要です。主キーの列名は、ハッシュタイプによって異なります。

| フィールド                    | データ | 説明                                                                              | 必須 | 例                                                                   |
|--------------------------|------|------------------------------------------------------------------------------------------|----------|---------------------------------------------------------------------------|
| `sha1`/`sha256`/`ssdeep` | テキスト | テーブルの主キー。                                                | true     | `5f7afeeee13aaee6874a59a510b75767156f75d14db0cd4e1725ee619730ccc8`        |
| `additional_data`        | json | ログを機能強化するための追加データ。                                                     | false| `{"ref":"hxxp://example.org"}`                                            |
| `category`               | テキスト | 脅威インテリジェンスの[カテゴリー][8]。これは、一部の標準検出ルールで使用されます。    | true     | `malware`                                                                 |
| `intention`              | テキスト | 脅威インテリジェンスの[意図][9]。これは、一部の標準検出ルールで使用されます。      | true     | `malicious`                                                               |
| `source`                 | json | ソースの名前とそのサイトへのリンク (例: あなたのチームとチームの Wiki)。| true     | `{"name":"internal_security_team", "url":"https://teamwiki.example.org"}` |

<div class="alert alert-info">CSV 内の JSON は二重引用符で囲む必要があります。以下は、各ハッシュタイプの CSV の例です。
{{< tabs >}}
{{% tab "SHA256" %}}

```
sha256,additional_data,category,intention,source
5f7afeeee13aaee6874a59a510b75767156f75d14db0cd4e1725ee619730ccc8,"{""ref"":""hxxp://example.org""}",malware,malicious,"{""name"":""internal_security_team"", ""url"":""https://teamwiki.example.org""}"
e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855,"{""ref"":""hxxp://example.org""}",malware,malicious,"{""name"":""internal_security_team"", ""url"":""https://teamwiki.example.org""}"
2c26b46b68ffc68ff99b453c1d30413413422d706483bfa0f98a5e886266e7ae,"{""ref"":""hxxp://example.org""}",malware,malicious,"{""name"":""internal_security_team"", ""url"":""https://teamwiki.example.org""}"
```
{{% /tab %}}
{{% tab "SHA1" %}}

```
sha1,additional_data,category,intention,source
a1b2c3d4e5f6789012345678901234567890abcd,"{""ref"":""hxxp://example.org""}",malware,malicious,"{""name"":""internal_security_team"", ""url"":""https://teamwiki.example.org""}"
5e884898da28047151d0e56f8dc6292773603d0d,"{""ref"":""hxxp://example.org""}",malware,malicious,"{""name"":""internal_security_team"", ""url"":""https://teamwiki.example.org""}"
```
{{% /tab %}}
{{% tab "ssdeep" %}}

```
ssdeep,additional_data,category,intention,source
3:AXGBicFlgVNhBGcL6wCrFQEv:AXGHsNhxLsr2C,"{""ref"":""hxxp://example.org""}",malware,malicious,"{""name"":""internal_security_team"", ""url"":""https://teamwiki.example.org""}"
96:C7Q4LPmPWJwF7qLQd6C8vjF8ULQd6vhLQd6C8vjF:C7Q4LSjKdD8eKdhD8e,"{""ref"":""hxxp://example.org""}",malware,malicious,"{""name"":""internal_security_team"", ""url"":""https://teamwiki.example.org""}"
192:4gHHP2ZJwF0gHHrFqxXgHH8RZJwF:4gHtZy0gHMsxQH,"{""ref"":""hxxp://example.org""}",malware,malicious,"{""name"":""internal_security_team"", ""url"":""https://teamwiki.example.org""}"
```
{{% /tab %}}
{{< /tabs >}}
</div>

#### AWS アカウント ID の CSV 構造 {#csv-structure-for-aws-account-ids}

AWS アカウント ID フィードは、侵害された、または疑わしい AWS アカウントを追跡するのに役立ちます。

| フィールド             | データ | 説明                                                                              | 必須 | 例                                                                   |
|-------------------|------|------------------------------------------------------------------------------------------|----------|---------------------------------------------------------------------------|
| `aws_account_id`  | テキスト | AWS アカウント ID 形式 (12 桁の数字) のリファレンステーブルの主キー。     | true     | `123456789012`                                                            |
| `additional_data` | json | ログを機能強化するための追加データ。                                                     | false| `{"ref":"hxxp://example.org"}`                                            |
| `category`        | テキスト | 脅威インテリジェンスの[カテゴリー][8]。これは、一部の標準検出ルールで使用されます。    | true     | `scanner`                                                                 |
| `intention`       | テキスト | 脅威インテリジェンスの[意図][9]。これは、一部の標準検出ルールで使用されます。      | true     | `suspicious`                                                              |
| `source`          | json | ソースの名前とそのサイトへのリンク (例: あなたのチームとチームの Wiki)。| true     | `{"name":"internal_security_team", "url":"https://teamwiki.example.org"}` |

<div class="alert alert-info">CSV 内の JSON は二重引用符で囲む必要があります。以下は、CSV の例です。

```
aws_account_id,additional_data,category,intention,source
123456789012,"{""ref"":""hxxp://example.org""}",scanner,suspicious,"{""name"":""internal_security_team"", ""url"":""https://teamwiki.example.org""}"
987654321098,"{""ref"":""hxxp://example.org""}",scanner,suspicious,"{""name"":""internal_security_team"", ""url"":""https://teamwiki.example.org""}"
555666777888,"{""ref"":""hxxp://example.org""}",scanner,suspicious,"{""name"":""internal_security_team"", ""url"":""https://teamwiki.example.org""}"
```
</div>

#### コンテナイメージ名の CSV 構造 {#csv-structure-for-container-image-names}

コンテナイメージのフィードは、既知の悪意のあるコンテナイメージを追跡するのに役立ちます。

| フィールド                  | データ | 説明                                                                              | 必須 | 例                                                                   |
|------------------------|------|------------------------------------------------------------------------------------------|----------|---------------------------------------------------------------------------|
| `container_image_name` | テキスト | リファレンステーブルの主キー。レジストリ、リポジトリ、タグを含めることができます。     | true     | `malicious-registry.com/suspicious/image:latest`                          |
| `additional_data`      | json | ログを機能強化するための追加データ。                                                     | false| `{"ref":"hxxp://example.org"}`                                            |
| `category`             | テキスト | 脅威インテリジェンスの[カテゴリー][8]。これは、一部の標準検出ルールで使用されます。    | true     | `malware`                                                                 |
| `intention`            | テキスト | 脅威インテリジェンスの[意図][9]。これは、一部の標準検出ルールで使用されます。      | true     | `malicious`                                                               |
| `source`               | json | ソースの名前とそのサイトへのリンク (例: あなたのチームとチームの Wiki)。| true     | `{"name":"internal_security_team", "url":"https://teamwiki.example.org"}` |

<div class="alert alert-info">CSV 内の JSON は二重引用符で囲む必要があります。以下は、CSV の例です。

```
container_image_name,additional_data,category,intention,source
malicious-registry.com/suspicious/image:latest,"{""ref"":""hxxp://example.org""}",malware,malicious,"{""name"":""internal_security_team"", ""url"":""https://teamwiki.example.org""}"
bad-repo.io/malware/cryptominer:v2,"{""ref"":""hxxp://example.org""}",malware,malicious,"{""name"":""internal_security_team"", ""url"":""https://teamwiki.example.org""}"
suspicious-hub.com/backdoor/payload:1.0,"{""ref"":""hxxp://example.org""}",malware,malicious,"{""name"":""internal_security_team"", ""url"":""https://teamwiki.example.org""}"
```
</div>

#### コンテナレジストリアカウント名の CSV 構造 {#csv-structure-for-container-registry-account-names}

コンテナレジストリアカウント名のフィードは、侵害された、または悪意のあるコンテナレジストリアカウントを特定するのに役立ちます。

| フィールド                             | データ | 説明                                                                                        | 必須 | 例                                                                   |
|-----------------------------------|------|----------------------------------------------------------------------------------------------------|----------|---------------------------------------------------------------------------|
| `container_registry_account_name` | テキスト | リファレンステーブルの主キー。コンテナレジストリ内のアカウント名または組織名。| true     | `suspicious-publisher`                                                    |
| `additional_data`                 | json | ログを機能強化するための追加データ。                                                               | false| `{"ref":"hxxp://example.org"}`                                            |
| `category`                        | テキスト | 脅威インテリジェンスの[カテゴリー][8]。これは、一部の標準検出ルールで使用されます。              | true     | `malware`                                                                 |
| `intention`                       | テキスト | 脅威インテリジェンスの[意図][9]。これは、一部の標準検出ルールで使用されます。                | true     | `malicious`                                                               |
| `source`                          | json | ソースの名前とそのサイトへのリンク (例: あなたのチームとチームの Wiki)。          | true     | `{"name":"internal_security_team", "url":"https://teamwiki.example.org"}` |

<div class="alert alert-info">CSV 内の JSON は二重引用符で囲む必要があります。以下は、CSV の例です。

```
container_registry_account_name,additional_data,category,intention,source
suspicious-publisher,"{""ref"":""hxxp://example.org""}",malware,malicious,"{""name"":""internal_security_team"", ""url"":""https://teamwiki.example.org""}"
compromised-org,"{""ref"":""hxxp://example.org""}",malware,malicious,"{""name"":""internal_security_team"", ""url"":""https://teamwiki.example.org""}"
malicious-vendor,"{""ref"":""hxxp://example.org""}",malware,malicious,"{""name"":""internal_security_team"", ""url"":""https://teamwiki.example.org""}"
```
</div>

#### SSH 公開鍵の CSV 構造 {#csv-structure-for-ssh-public-keys}

SSH 公開鍵のフィードは、不正な、または侵害された SSH 鍵を追跡するのに役立ちます。

| フィールド             | データ | 説明                                                                                                        | 必須 | 例                                                                   |
|-------------------|------|--------------------------------------------------------------------------------------------------------------------|----------|---------------------------------------------------------------------------|
| `ssh_public_key`  | テキスト | リファレンステーブルの主キー。標準形式の SSH 公開鍵 (通常は ssh-rsa、ssh-ed25519 など)。| true     | `ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQC...`                              |
| `additional_data` | json | ログを機能強化するための追加データ。                                                                               | false| `{"ref":"hxxp://example.org"}`                                            |
| `category`        | テキスト | 脅威インテリジェンスの[カテゴリー][8]。これは、一部の標準検出ルールで使用されます。                              | true     | `scanner`                                                                 |
| `intention`       | テキスト | 脅威インテリジェンスの[意図][9]。これは、一部の標準検出ルールで使用されます。                                | true     | `suspicious`                                                              |
| `source`          | json | ソースの名前とそのサイトへのリンク (例: あなたのチームとチームの Wiki)。                          | true     | `{"name":"internal_security_team", "url":"https://teamwiki.example.org"}` |

<div class="alert alert-info">CSV 内の JSON は二重引用符で囲む必要があります。CSV に追加する前に、複数行の鍵から改行を削除してください。以下は、CSV の例です。

```
ssh_public_key,additional_data,category,intention,source
ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQC3F6tyPEFEzV0LX3X8BsXdMsQ,"{""ref"":""hxxp://example.org""}",scanner,suspicious,"{""name"":""internal_security_team"", ""url"":""https://teamwiki.example.org""}"
ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIOMqqnkVzrm0SdG6UOoqKLsabgH5C9okWi0dh2l9GKJl,"{""ref"":""hxxp://example.org""}",scanner,suspicious,"{""name"":""internal_security_team"", ""url"":""https://teamwiki.example.org""}"
ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAACAQDGZfNyAXqPdvZ0qqIWFVxH5z2k,"{""ref"":""hxxp://example.org""}",scanner,suspicious,"{""name"":""internal_security_team"", ""url"":""https://teamwiki.example.org""}"
```
</div>

#### ユーザーエージェントの CSV 構造 {#csv-structure-for-user-agents}

ユーザーエージェントフィードは、悪意のあるボットやスキャナーを特定するのに役立ちます。

| フィールド             | データ | 説明                                                                              | 必須 | 例                                                                   |
|-------------------|------|------------------------------------------------------------------------------------------|----------|---------------------------------------------------------------------------|
| `user_agent`      | テキスト | リファレンステーブルの主キー。HTTP User-Agent 文字列。                        | true     | `Mozilla/5.0 (compatible; MaliciousBot/1.0)`                              |
| `additional_data` | json | ログを機能強化するための追加データ。                                                     | false| `{"ref":"hxxp://example.org"}`                                            |
| `category`        | テキスト | 脅威インテリジェンスの[カテゴリー][8]。これは、一部の標準検出ルールで使用されます。    | true     | `scanner`                                                                 |
| `intention`       | テキスト | 脅威インテリジェンスの[意図][9]。これは、一部の標準検出ルールで使用されます。      | true     | `suspicious`                                                              |
| `source`          | json | ソースの名前とそのサイトへのリンク (例: あなたのチームとチームの Wiki)。| true     | `{"name":"internal_security_team", "url":"https://teamwiki.example.org"}` |

<div class="alert alert-info">CSV 内の JSON は二重引用符で囲む必要があります。以下は、CSV の例です。

```
user_agent,additional_data,category,intention,source
Mozilla/5.0 (compatible; MaliciousBot/1.0),"{""ref"":""hxxp://example.org""}",scanner,suspicious,"{""name"":""internal_security_team"", ""url"":""https://teamwiki.example.org""}"
BadCrawler/2.0,"{""ref"":""hxxp://example.org""}",scanner,suspicious,"{""name"":""internal_security_team"", ""url"":""https://teamwiki.example.org""}"
SuspiciousScanner/3.5,"{""ref"":""hxxp://example.org""}",scanner,suspicious,"{""name"":""internal_security_team"", ""url"":""https://teamwiki.example.org""}"
```
</div>

### 独自の脅威インテリジェンスをアップロードして有効にする{#upload-and-enable-your-own-threat-intelligence}

Datadog では、手動でアップロードするか、Amazon S3、Azure Storage、Google Cloud Storage から定期的にデータを取得することでリファレンステーブルを作成できます。

**注**:
- テーブルを作成してからログの機能強化が開始されるまでには、10～30 分ほどかかる場合があります。
- 主キーが重複している場合、該当する行はスキップされ、そのキーに関するエラーメッセージが表示されます。

新しい[リファレンステーブル][2]ページで、

1. テーブルに名前を付けます。テーブル名は、脅威インテリジェンス設定で参照されます。
1. ローカルの CSV をアップロードするか、クラウドストレージバケットから CSV をインポートします。ファイルは正規化および検証されます。
1. テーブルスキーマをプレビューし、適切な IOC 列を主キーとして選択します (例: IP インジケーターには `ip_address`、SHA256 ハッシュインジケーターには `sha256`)。
1. テーブルを保存します。
1. [脅威インテリジェンス][3]で新しいテーブルを見つけ、トグルをオンにして有効にします。

#### クラウドストレージを使用する場合 {#using-cloud-storage}

クラウドストレージからリファレンステーブルを作成すると、定期的に更新されます。テーブル全体が置き換えられます。データはマージされません。

関連するリファレンステーブルのドキュメントを参照してください。

- [Amazon S3][4]
- [Azure storage][5]
- [Google Cloud storage][6]

#### クラウドインポートのトラブルシューティング {#troubleshooting-cloud-imports}

リファレンステーブルが更新されない場合、リファレンステーブルの設定メニューを開き、[{{< ui >}}View Change Events{{< /ui >}}] を選択します。

[{{< ui >}}View Change Events{{< /ui >}}]が [{{< ui >}}Event Management{{< /ui >}}] でページを開き、取り込みの潜在的なエラーイベントを表示します。[{{< ui >}}Event Management{{< /ui >}}] でリファレンステーブル名を使ってフィルタリングすることもできます。

Datadog Event Management では、クラウドからデータがフェッチされたように見える場合がありますが、それらの変更が脅威インテリジェンスに反映されるまで数分かかることがあります。その他、クラウドインポートに関して覚えておくと有用なポイント:

- ソースがアップロードまたは更新された後、更新された機能強化が利用可能になるまでの予想されるレイテンシーは 10～30 分です。
- 更新が適用されたことを確認する方法: 変更はリファレンステーブルまたはログで確認できます。リファレンステーブル詳細ページの設定から [{{< ui >}}View Change Events{{< /ui >}}] リンクを選択すると、関連するイベントを確認できます。
- 更新によりテーブル全体が新しいデータで置き換えられます。
重複する主キーがある場合、その重複キーの行は書き込まれず、リファレンステーブル詳細ページにエラーが表示されます。

## Datadog で脅威インテリジェンスデータを表示する {#view-threat-intelligence-data-in-datadog}

リファレンステーブルで Cloud SIEM 脅威インテリジェンスデータを有効にするには:
1. [Threat Intelligence][3] に移動します。
1. Cloud SIEM 脅威インテリジェンスデータを表示するテーブルについて、[{{< ui >}}Enabled{{< /ui >}}] 列のドロップダウンメニューをクリックし、[{{< ui >}}Cloud SIEM{{< /ui >}}] を選択します。

リファレンステーブルを Cloud SIEM に適用すると、すべての受信ログが、IP アドレスやドメインなどの特定の侵害インジケーター (IoC) キーを使用してテーブルと照合され、評価されます。一致が見つかった場合、ログはテーブルからの関連する脅威インテリジェンス (TI) 属性で強化され、検出・調査・対応が向上します。脅威インテリジェンスリファレンステーブルは、複数のセキュリティ製品間で共有できます。

[IOC エクスプローラー][11]で脅威インテリジェンスデータを表示できます。

## 参考資料{#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/security/threat_intelligence/#threat-intelligence-sources
[2]: https://app.datadoghq.com/reference-tables/create
[3]: https://app.datadoghq.com/security/configuration/threat-intel
[4]: /ja/reference_tables/?tab=amazons3#create-a-reference-table
[5]: /ja/reference_tables/?tab=azurestorage#create-a-reference-table
[6]: /ja/reference_tables/?tab=googlecloudstorage#create-a-reference-table
[7]: /ja/reference_tables/
[8]: /ja/security/threat_intelligence/#threat-intelligence-categories
[9]: /ja/security/threat_intelligence/#threat-intelligence-intents
[10]: /ja/security/threat_intelligence#threat-intelligence-sources
[11]: /ja/security/cloud_siem/triage_and_investigate/ioc_explorer/