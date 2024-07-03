---
aliases:
- /ja/integrations/faq/how-to-retrieve-wmi-metrics
title: Retrieving WMI metrics
---

## WMI とは？

Windows の世界では、オペレーティングシステムやアプリケーションのメトリクスは、Windows Management Instrumentation を使用して公開されています。Datadog Agent for Windows には、すぐに WMI インテグレーションが付属しているので、重要な情報を監視することができます。

WMI のデータは、クラスに分類されます。デフォルトで用意されているクラスは数百あり、ロールや機能を追加するごとに独自のクラスが追加されます。アプリケーションによっては、Microsoft SQL Server、Microsoft Exchange、および様々なサードパーティアプリなどのクラスを追加することもできます。

Microsoft Powershell は、Windows システムをプログラムで操作するための標準的な方法と考えられており、WMI を管理するためのツールが付属しています。

コンピュータで利用できるすべてのクラスを一覧表示するには、以下を実行します。

```text
PS C:\> Get-WmiObject -List

NameSpace: ROOT\cimv2

Name Methods Properties
---- ------- ----------
__SystemClass {} {}
__thisNAMESPACE {} {SECURITY_DESCRIPTOR}
__Provider {} {Name}
__Win32Provider {} {ClientLoadableCLSID, CLSID, Concurrency, DefaultMachineNam...
__IndicationRelated {} {}

[...]
```

クラスがいくつあるかカウントするには、以下を実行します。

```text
PS C:\> (Get-WmiObject -List).count
931
```

特定のトピックに関するクラスは、`where` ステートメントを使用することで見つけることができます。プロセス情報を保持するクラスを表示するには、以下を実行します。

```text
PS C:\> Get-WmiObject -List | where {$_.name -match "process"} | select Name

Name
----
Win32_ProcessTrace
Win32_ProcessStartTrace
Win32_ProcessStopTrace
CIM_Process
Win32_Process
CIM_Processor
Win32_Processor
Win32_PerfFormattedData_PerfOS_Processor
Win32_PerfFormattedData_PerfProc_Process
[...]
```

クラスが公開するデータを閲覧するには、[WQL][1] と呼ばれる SQL に似た構文を使用することができます。

多くのパフォーマンス関連のメトリクスは PerfMon ツールによってレポートされ、`Win32_PerfFormattedData_` と呼ばれています。この例では、`Win32_PerfFormattedData_PerfProc_Process` クラスにクエリできるように、プロセス情報を見てください。

```text
PS C:\> Get-WmiObject -Query "select * from Win32_PerfFormattedData_PerfProc_Process where Name = 'Powershell'"

__GENUS                 : 2
__CLASS                 : Win32_PerfFormattedData_PerfProc_Process
__SUPERCLASS            : Win32_PerfFormattedData
__DYNASTY               : CIM_StatisticalInformation
__RELPATH               : Win32_PerfFormattedData_PerfProc_Process.Name="powershell"
__PROPERTY_COUNT        : 36
__DERIVATION            : {Win32_PerfFormattedData, Win32_Perf, CIM_StatisticalInformation}
__SERVER                : DATADOG-9A675BB
__NAMESPACE             : root\cimv2
__PATH                  : \\DATADOG-9A675BB\root\cimv2:Win32_PerfFormattedData_PerfProc_Process.Name="powershell"
Caption                 :
CreatingProcessID       : 2560
Description             :
ElapsedTime             : 3333
Frequency_Object        :
Frequency_PerfTime      :
Frequency_Sys100NS      :
HandleCount             : 655
IDProcess               : 4024
IODataBytesPersec       : 0
IODataOperationsPersec  : 0
IOOtherBytesPersec      : 0
IOOtherOperationsPersec : 0
IOReadBytesPersec       : 0
IOReadOperationsPersec  : 0
IOWriteBytesPersec      : 0
IOWriteOperationsPersec : 0
Name                    : powershell
PageFaultsPersec        : 0
PageFileBytes           : 39415808
PageFileBytesPeak       : 43970560
PercentPrivilegedTime   : 0
PercentProcessorTime    : 0
PercentUserTime         : 0
PoolNonpagedBytes       : 7132
PoolPagedBytes          : 206292
PriorityBase            : 8
PrivateBytes            : 39415808
ThreadCount             : 7
Timestamp_Object        :
Timestamp_PerfTime      :
Timestamp_Sys100NS      :
VirtualBytes            : 162775040
VirtualBytesPeak        : 170778624
WorkingSet              : 41054208
WorkingSetPeak          : 45273088
```

このコマンドは、Powershell プロセスに関する詳細を返します。メモリ使用量や I/O 操作など、多くの情報が含まれています。

マシン上でサードパーティのアプリケーションを実行できる場合、WMI Explorer というツールは、WMI によって公開された情報を閲覧するのに適しています。このツールは、https://www.ks-soft.net/hostmon.eng/wmi/ で取得でき、自己完結型の .exe ファイルなのでインストールする必要がなく、ウイルスフリー (https://www.virustotal.com/en/file/df8e909491da38556a6c9a50abf42b3b906127e0d4b35d0198ef491139d1622c/analysis/) です。

## Datadog で WMI を活用する

WMI の仕組みについて少し理解したら、このデータを Datadog に取り込むことができます。Datadog Agent Manager を開き、左のパネルにある WMI Check インテグレーションをクリックします。

まずは簡単な例として、マシン上のプロセス数を監視することから始めましょう。

```yaml
init_config:

# 各 WMI クエリには、`class` と `metrics` の 2 つの必須オプションがあります
# `class` は WMI クラス名で、例えば Win32_OperatingSystem のようになります
# `metrics` はキャプチャしたいメトリクスのリストで、
# リストの各項目は [WMI プロパティ名、メトリクス名、メトリクスタイプ]のセットとなります。

instances:

  # プロセス数を取得します
  - class: Win32_OperatingSystem
    metrics:
      - [NumberOfProcesses, system.proc.count, gauge]
```

構成を保存し、インテグレーションを有効にして再起動した後、'Logs and Status -> Agent Status' に進みます。'Checks' セクションの下に、以下のように表示されるはずです。

```text
wmi_check Instance #0 OK Collected 1 metrics, 0 events and 1 service check
```

先ほど見ていた Windows Powershell のプロセスを監視します。

```yaml
init_config:

#   単一の実行中のアプリケーションのメトリクスをフェッチします
instances:
  - class: Win32_PerfFormattedData_PerfProc_Process
    metrics:
      - [ThreadCount, powershell.threads.count, gauge]
      - [VirtualBytes, powershell.mem.virtual, gauge]

  # `filters` は、WMI クエリに必要なフィルターのリストです。例えば、
  # プロセスベースの WMI クラスでは、マシン上で実行されている特定のプロセスのみのメトリクスが
  # 必要な場合があるので、各プロセス名のフィルターを追加することができます。
  # この場合の例として、以下を参照してください。
    filters:
      - Name: powershell
```

メトリクスエクスプローラーには、powershell.threads.count と powershell.mem.virtual という 2 つのメトリクスがあるはずです。しかし、2 つの Powershell コンソールを開いている場合、どうなるでしょうか？'Checks section' に以下のようなエラーが表示されることがあります。

```text
wmi_check
  Instance #0
    ERROR
  Error
    Exception("WMI query returned multiple rows but no `tag_by` value was given. metrics=[['ThreadCount',
    'powershell.threads.count', 'gauge'], ['VirtualBytes', 'powershell.mem.virtual', 'gauge']]",)
  Collected 0 metrics, 0 events and 1 service check
```

これは、Agent が同じ名前とタグのセットを持つ 2 つの異なるメトリクスについてレポートできないからです。この 2 つを区別するために、`tag_by: Instance_Property_Name statement` を使用すると、インスタンスのプロパティの値を追加のタグとして使用できます。

```yaml
init_config:

instances:

#   実行中のアプリケーションの各インスタンスのメトリクスを取得します
  - class: Win32_PerfFormattedData_PerfProc_Process
    metrics:
      - [ThreadCount, powershell.threads.count, gauge]
      - [VirtualBytes, powershell.mem.virtual, gauge]
    filters:
      - Name: powershell
# `tag_by` はオプションで、各メトリクスに使用している WMI クラスの
# プロパティをタグ付けすることができます。これは、WMI クエリに
# 複数の値がある場合にのみ有用です。以下の例では、プロセスメトリクスを
# プロセス名でタグ付けする方法を示しています ("name:app_name" というタグを指定します)。
    tag_by: Name
# プロセス名には `#XYZ` が付加され、`XYZ` はインクリメンタルな数字であるため、以下は Window >= 2008 で動作することに注意してください
# Windows 2003 で動作している場合は、`tag_by: IDProcess` のように別の一意の値を使用します
```


これにより、Powershell コンソールを開くごとに 2 つのメトリクスを得ることができます。

```text
wmi_check
  Instance #0
    OK
  Collected 4 metrics, 0 events and 1 service check
```

タグとして使用したい情報が、データを取得するクラスの一部でない場合、tag_queries リストを使用して、異なるテーブルのデータをリンクさせることができます。

例えば、Win32_PerfFormattedData_PerfProc_Process の PoolNonPagedBytes をレポートし、Win32_Process の CreationDate をタグとして追加したいとします。この 2 つのクラスは、異なる名前で PID を公開しています。Win32_PerfFormattedData_PerfProc_Process の IDProcess と Win32_Process の Handle です。つまり、前者がリンク元プロパティ、後者がターゲットプロパティとなります。

```yaml
# `tag_queries` は、オプションで、ターゲットクラスプロパティでメトリクスに
# タグ付けするためのクエリのリストを指定することができます。
# リストの各項目は、[link source property, target class, link target class property, target property] のセットです
# ここで、
#
# - 'link source property' にはリンク値が入ります
# - 'target class' はリンク先のクラスです
# - 'link target class property' はリンク先のクラスプロパティです
# - 'target property' には、タグ付けする値が入ります
#
# WMI クエリに変換されます。
# SELECT 'target property' FROM 'target class'
#                 WHERE 'link target class property' = 'link source property'
#
# 注: これを設定すると、tag_by の値からインスタンス番号が削除されます
# すなわち、name:process#1 => name:process

init_config:

instances:

#   単一の実行中のアプリケーションのメトリクスを取得します
  - class: Win32_PerfFormattedData_PerfProc_Process
    metrics:
      - [ThreadCount, powershell.threads.count, gauge]
      - [VirtualBytes, powershell.mem.virtual, gauge]
    filters:
      - Name: powershell
    tag_by: Name

    tag_queries:
      - [IDProcess, Win32_Process, Handle, CreationDate]
```

[1]: https://msdn.microsoft.com/en-us/library/aa392902