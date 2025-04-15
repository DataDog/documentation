---
further_reading:
- link: /security/cloud_security_management/iac_scanning
  tag: ドキュメント
  text: IaC スキャン
- link: /security/cloud_security_management/setup/iac_scanning
  tag: ドキュメント
  text: Cloud Security Management 用 IaC スキャニングのセットアップ
title: IaC スキャニング除外の設定
---

{{< callout url="https://www.datadoghq.com/product-preview/iac-security/" >}}
  スタティックな Infrastructure as Code (IaC) スキャニングはプレビュー版です。アクセスをリクエストするには、フォームに入力してください。
{{< /callout >}}

Infrastructure as Code (IaC) スキャニングは、Terraform、Kubernetes、CloudFormation ファイルのセキュリティ上の誤構成を検出します。除外設定を使うことで、特定のルールやファイル、または問題のカテゴリを無視して、スキャン結果に表示される内容をコントロールできます。

## 除外の方法

以下の方法で除外を設定できます:

- 設定ファイル: 深刻度レベル、ファイルパス、クエリ ID、カテゴリに対する除外を定義
- インラインコメント: Terraform、Kubernetes、CloudFormation ファイル内の特定の検出結果を無視

<div class="alert alert-info">設定ファイルとインラインコメントの両方で除外が定義されている場合は、設定ファイルが優先されます。</div>

## 設定ファイルによる除外設定

1. プロジェクトリポジトリのルートディレクトリに `dd-iac-scan.config` ファイルを作成します。
1. 必要な除外を YAML、JSON、TOML、または HCL 形式で追加します。
1. `dd-iac-scan.config` ファイルをリポジトリにコミットします。

### サポートされる除外設定

#### 除外する深刻度

`exclude-severities` を使用して、深刻度レベルに基づいて検出結果を除外します。このオプションに複数の値を指定する場合、オプションを複数回設定するか、リストとして渡します。

**使用可能な値:**
- `critical`
- `high`
- `medium`
- `low`
- `info`  

{{< tabs >}}
{{% tab "YAML" %}}

```yaml
exclude-severities:
  - "info"
  - "low"
```

{{% /tab %}}
{{% tab "JSON" %}}

```json
"exclude-severities": [
     "info",
     "low"
]
```

{{% /tab %}}
{{% tab "TOML" %}}

```
exclude-severities = [ "info", "low" ]
```

{{% /tab %}}
{{% tab "HCL" %}}

```
"exclude-severities" = ["info", "low"]
```

{{% /tab %}}
{{< /tabs >}}

#### 除外するパス

`exclude-paths` を使用して、特定のファイルやディレクトリをスキャン対象外にします。このオプションはグロブパターンをサポートします。複数の値を指定する場合、オプションを複数回設定するか、リストとして渡します。

{{< tabs >}}
{{% tab "YAML" %}}

```yaml
exclude-paths:
  - "./shouldNotScan/*"
  - "dir/somefile.txt"
```

{{% /tab %}}
{{% tab "JSON" %}}

```json
"exclude-paths": [
     "./shouldNotScan/*",
     "dir/somefile.txt"
]
```

{{% /tab %}}
{{% tab "TOML" %}}

```
exclude-paths = [ "./shouldNotScan/*", "dir/somefile.txt" ]
```

{{% /tab %}}
{{% tab "HCL" %}}

```
"exclude-paths" = ["./shouldNotScan/*", "dir/somefile.txt"]
```

{{% /tab %}}
{{< /tabs >}}

#### 除外するクエリ

`exclude-queries` を使用して、クエリ ID を指定して特定のクエリを除外します。複数の値を指定する場合、オプションを複数回設定するか、リストとして渡します。

{{< tabs >}}
{{% tab "YAML" %}}

```yaml
exclude-queries:
  - "e69890e6-fce5-461d-98ad-cb98318dfc96"
  - "4728cd65-a20c-49da-8b31-9c08b423e4db"
```

{{% /tab %}}
{{% tab "JSON" %}}

```json
"exclude-queries": [
     "e69890e6-fce5-461d-98ad-cb98318dfc96",
     "4728cd65-a20c-49da-8b31-9c08b423e4db"
]
```

{{% /tab %}}
{{% tab "TOML" %}}

```
exclude-queries = [ "e69890e6-fce5-461d-98ad-cb98318dfc96", "4728cd65-a20c-49da-8b31-9c08b423e4db" ]
```

{{% /tab %}}
{{% tab "HCL" %}}

```
"exclude-queries" = ["e69890e6-fce5-461d-98ad-cb98318dfc96", "4728cd65-a20c-49da-8b31-9c08b423e4db"]
```

{{% /tab %}}
{{< /tabs >}}

#### 除外するカテゴリ

`exclude-categories` を使用して、特定のカテゴリを除外します。このオプションは複数回使うか、リストを文字列形式で指定することができます。

**使用可能な値**:
- `Access Control`  
- `Availability`  
- `Backup`  
- `Best Practices`  
- `Build Process`  
- `Encryption`  
- `Insecure Configurations`  
- `Insecure Defaults`  
- `Networking and Firewall`  
- `Observability`  
- `Resource Management`  
- `Secret Management`  
- `Supply-Chain`  
- `Structure and Semantics`  
- `Bill Of Materials`  

{{< tabs >}}
{{% tab "YAML" %}}

```yaml
exclude-categories:
  - "Access Control"
  - "Best Practices"
```

{{% /tab %}}
{{% tab "JSON" %}}

```json
"exclude-categories": [
     "Access Control",
     "Best Practices"
]
```

{{% /tab %}}
{{% tab "TOML" %}}

```
exclude-categories = [ "Access Control", "Best Practices" ]
```

{{% /tab %}}
{{% tab "HCL" %}}

```
"exclude-categories" = ["Access Control", "Best Practices"]
```

{{% /tab %}}
{{< /tabs >}}

## インラインコメントによる除外設定

ファイルのどの部分をスキャンするかを制御するには、`# dd-iac-scan` で始まるコメントを追加し、続けてコマンドと必要な値を指定します。インライン除外は、そのファイル内部でのみ適用されます。

<div class="alert alert-info">設定ファイルとインラインコメントの両方で除外が定義されている場合は、設定ファイルが優先されます。</div>

### サポートされるコマンド

| **コメント**                      | **説明**                 |
|----------------------------------|---------------------------------|
| `dd-iac-scan ignore`             | ファイル全体を無視します。        |
| `dd-iac-scan disable=<query_id>` | 特定のクエリを無視します。       |
| `dd-iac-scan enable=<query_id>`  | 特定のクエリだけを含めます。 |
| `dd-iac-scan ignore-line`        | 1行だけを無視します。          |
| `dd-iac-scan ignore-block`       | ブロック全体を無視します。        |

#### dd-iac-scan ignore

IaC スキャニングからファイル全体を除外します。このコメントはファイルの先頭に置く必要があります。

```
# dd-iac-scan ignore

resource "aws_s3_bucket" "example" {
  bucket = "my-tf-test-bucket"
  ...
}
...
```

#### dd-iac-scan disable=query_id

このファイル内で指定したクエリのスキャン結果を除外します。このコメントはファイルの先頭に置く必要があります。

```
# dd-iac-scan disable=e592a0c5-5bdb-414c-9066-5dba7cdea370,e69890e6-fce5-461d-98ad-cb98318dfc96

resource "aws_s3_bucket" "example" {
  bucket = "my-tf-test-bucket"
  ...
}
...
```

指定したクエリの検出結果は、このファイルでは無視されます。

#### dd-iac-scan enable=query_id

このファイルでのスキャン結果を、指定したクエリだけに限定します。このコメントはファイルの先頭に置く必要があります。


```
# dd-iac-scan enable=e592a0c5-5bdb-414c-9066-5dba7cdea370

resource "aws_s3_bucket" "example" {
  bucket = "my-tf-test-bucket"
  ...
}
...
```

指定したクエリによる検出結果のみが、このファイルのスキャン結果に含まれます。

#### dd-iac-scan ignore-line

このコメントの直後 1 行だけをスキャン対象外にします。コメントはファイルの任意の場所に置けます。

```
1: resource "google_storage_bucket" "example" {
2:  # dd-iac-scan ignore-line
3:  name          = "image-store.com"
4:  location      = "EU"
5:  force_destroy = true
6: }
```

行 3 の検出結果が無視されます。

#### dd-iac-scan ignore-block

リソースブロック全体と、そのすべてのキーと値をスキャン対象外にします。コメントはファイルの任意の場所に置けます。

```
1: # dd-iac-scan ignore-block
2: resource "google_storage_bucket" "example" {
3:  name          = "image-store.com"
4:  location      = "EU"
5:  force_destroy = true
6: }
```

この例では、行 2～6 に関連する検出結果が無視されます。

## 参考資料

{{< partial name="whats-next/whats-next.html" >}}