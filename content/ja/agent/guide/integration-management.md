---
algolia:
  tags:
  - integration management
title: Integration Management
---

## 概要

Agent には Datadog インテグレーションの公式セットが付属しているため、ユーザーはアプリケーションの監視をすぐに開始できます。これらのインテグレーションは、それぞれ Python パッケージとして用意され、個別にアップグレードできます。

**注**: コミュニティ、パートナー、および Marketplace インテグレーションは、Agent のアップグレード時に保持されません。Agent のバージョンアップ時にこれらのインテグレーションを再インストールする必要があります。

Agent v6.8 以降では、`datadog-agent integration` コマンドを使用して、Agent で使用できる公式 Datadog インテグレーションを管理できます。このコマンドには、次のサブコマンドがあります。

 * [install](#install)
 * [remove](#remove)
 * [show](#show)
 * [freeze](#freeze)

これらのコマンドの使用方法とドキュメントは、`datadog-agent integration --help` を使用して出力できます。
Linux では `dd-agent` ユーザーとして、Windows では `administrator` として、コマンドを実行します。

## インテグレーション管理用コマンド

### ワークフロー

1. `show` コマンドを使用して、Agent にインストールされているインテグレーションのバージョンをチェックします。
2. [integrations-core][1] リポジトリにある特定のインテグレーションの changelog を確認して、必要なバージョンを決定します。
3. `install` コマンドを使用して、インテグレーションをインストールします。
4. Agent を再起動します。

**注**: 構成管理ツールを使用する場合は、インテグレーションを目的のバージョンに固定することをお勧めします。Agent をアップグレードする準備ができたら、この固定を解除します。インテグレーションのバージョン固定を解除しないで Agent をアップグレードすると、インテグレーションのバージョンが Agent の新しいバージョンと互換性がない場合に、構成管理ツールが失敗する可能性があります。

### インストール

`datadog-agent integration install` コマンドを使用して、公式 Datadog インテグレーションの特定のバージョン ([integrations-core リポジトリ][1]内) をインストールできます。ただし、そのバージョンが Agent のバージョンと互換性がある必要があります。このコマンドは、互換性を検証し、互換性がない場合はエラー付きで終了します。

インテグレーションは、両方の条件が満たされた場合、互換性がありインストール可能です。

1. [Agent に付属しているバージョン][2]より新しいバージョンである。
2. インストールされている Agent 内の [datadog_checks_base][3] のバージョンと互換性がある。

**注**: `datadog_checks_base` を手動でインストールすることはできません。ベースチェックは、Agent をアップグレードすることによってのみアップグレードできます。

このコマンドの構文は、`datadog-agent integration install <インテグレーション_パッケージ名>==<バージョン>` です。`<インテグレーション_パッケージ名>` は `datadog-` で始まるインテグレーションの名称です。

たとえば、vSphere インテグレーションのバージョン 3.6.0 をインストールするには、以下を実行します。

{{< tabs >}}
{{% tab "Linux" %}}
```shell
sudo -u dd-agent -- datadog-agent integration install datadog-vsphere==3.6.0
```
{{% /tab %}}
{{% tab "Windows PowerShell" %}}
`powershell.exe` を**管理者特権** (管理者として実行) で実行します。
```powershell
& "$env:ProgramFiles\Datadog\Datadog Agent\bin\agent.exe" integration install datadog-vsphere==3.6.0
```
{{% /tab %}}
{{< /tabs >}}

このコマンドは、インテグレーションの Python パッケージをインストールすると共に、構成ファイル (`conf.yaml.example`、`conf.yaml.default`、`auto_conf.yaml`) を `conf.d` ディレクトリにコピーして、既存の構成ファイルを上書きします。Agent 全体のアップグレード時にも、同じ処理が行われます。ファイルのコピー中に障害が発生した場合、コマンドはエラー付きで終了しますが、指定したバージョンのインテグレーションはインストールされます。

アップグレード後は、Agent を再起動すると、新しくインストールされたインテグレーションの使用が開始されます。

このコマンドは特に、Agent の次のバージョンがリリースされるまで待たなくても、個々のインテグレーションをアップグレードして、新機能やバグ修正を利用可能になり次第入手できるように設計されています。**注**: Agent の最新リリースには、常にすべてのインテグレーションのその時点での最新バージョンが付属するため、可能な限り Agent をアップグレードすることをお勧めします。

Agent をアップグレードすると、このコマンドを使用して個別にアップグレードしたすべてのインテグレーションが、Agent に付属するインテグレーションで上書きされます。

#### 構成管理ツール

構成管理ツールは、このコマンドを利用して、そのバージョンのインテグレーションをインフラストラクチャー全体にデプロイできます。

### 削除

インテグレーションを削除するには、`datadog-agent integration remove` コマンドを使用します。このコマンドの構文は `datadog-agent integration remove <インテグレーション_パッケージ名>` です。`<インテグレーション_パッケージ名>` は `datadog-` で始まるインテグレーションの名称です。

たとえば、vSphere インテグレーションを削除するには、以下を実行します。

{{< tabs >}}
{{% tab "Linux" %}}
```shell
sudo -u dd-agent -- datadog-agent integration remove datadog-vsphere
```
{{% /tab %}}
{{% tab "Windows PowerShell" %}}
`powershell.exe` を**管理者特権** (管理者として実行) で実行します。
```powershell
& "$env:ProgramFiles\Datadog\Datadog Agent\bin\agent.exe" integration remove datadog-vsphere
```
{{% /tab %}}
{{< /tabs >}}

インテグレーションを削除しても、`conf.d` ディレクトリ内にある対応する構成フォルダーは削除されません。

### Show

バージョンなど、インストールされているインテグレーションの情報を取得するには、`datadog-agent integration show` コマンドを使用します。このコマンドの構文は `datadog-agent integration show <インテグレーション_パッケージ名>` です。`<インテグレーション_パッケージ名>` は `datadog-` で始まるインテグレーションの名称です。

たとえば、vSphere インテグレーションに関する情報を表示するには、以下を実行します。

{{< tabs >}}
{{% tab "Linux" %}}
```shell
sudo -u dd-agent -- datadog-agent integration show datadog-vsphere
```
{{% /tab %}}
{{% tab "Windows PowerShell" %}}
`powershell.exe` を**管理者特権** (管理者として実行) で実行します。
```powershell
& "$env:ProgramFiles\Datadog\Datadog Agent\bin\agent.exe" integration show datadog-vsphere
```
{{% /tab %}}
{{< /tabs >}}

### Freeze

Agent の Python 環境にインストールされているすべての Python パッケージを一覧表示するには、`datadog-agent integration freeze` コマンドを使用します。これにより、すべての Datadog インテグレーション (`datadog-` で始まるパッケージ) およびインテグレーションの実行に必要な Python 依存関係が一覧表示されます。

{{< tabs >}}
{{% tab "Linux" %}}
```text
sudo -u dd-agent -- datadog-agent integration freeze
```
{{% /tab %}}
{{% tab "Windows PowerShell" %}}
`powershell.exe` を**管理者特権** (管理者として実行) で実行します。
```powershell
& "$env:ProgramFiles\Datadog\Datadog Agent\bin\agent.exe" integration freeze
```
{{% /tab %}}
{{< /tabs >}}

[1]: https://github.com/DataDog/integrations-core
[2]: https://github.com/DataDog/integrations-core/blob/master/AGENT_INTEGRATIONS.md
[3]: https://github.com/DataDog/integrations-core/tree/master/datadog_checks_base