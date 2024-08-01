---
aliases:
- /ja/integrations/faq/how-to-add-event-log-files-to-the-win32-ntlogevent-wmi-class
title: イベントログファイルを `Win32_NTLogEvent` WMI クラスに追加する
---

すべてのイベントログが Win32_NTLogEvent WMI クラス内にあるわけではありません。Event Viewer インテグレーションはこのクラスのイベントしか拾えないので、Windows レジストリを変更して、このクラスの範囲外のイベントログを追加してください。

まず、Win32_NTLogEvent でログファイルにアクセスできるかどうかを、Powershell で以下の WMI クエリを使用して確認します。(これは、Agent がこれらのイベントを収集するために実行するクエリと同じものです)

```text
$ Get-WmiObject -Query "Select EventCode,SourceName,TimeGenerated,Type,InsertionStrings,Message,Logfile from Win32_NTLogEvent WHERE ( LogFile = '<LogFileName>' )" | select -First 1
```

結果が出ない場合は、ログファイルにアクセスできないので、Windows レジストリから追加する必要があります。

Event Viewer で監視したいイベントログを探します。ログファイルを探し、 "Actions" セクションの "properties" をクリックし、ログパスと Full Name を確認します。例えば、Microsoft/Windows/TaskScheduler フォルダにある "Operational" イベント Log ファイルを監視する設定方法を以下に示します。
{{< img src="integrations/guide/windows_event_logs_with_wmi/event_viewer_1.png" alt="Windows のイベントビューアでは、File という名前のファイルが選択され、文字列を編集するオプションが表示されています。Value data: フィールドがハイライトされ、ログパスが表示されています" >}}

Windows レジストリを開きます。(レジストリエディタのデフォルト名である regedit.exe を検索してください)。レジストリエディタ内で、以下のパスにある EventLog フォルダを探します。

```text
\HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Services\EventLog\
```

監視したいイベントログの名前で新しいキーを作成します。path-to-folder/LogFileName の構文を使用します (Event Viewer で見つかる Full Name と同じです)。
{{< img src="integrations/guide/windows_event_logs_with_wmi/event_viewer_2.png" alt="EventLog フォルダを展開し、右クリックでサブメニューを表示します。サブメニューの中で New が選択され、新しいサブメニューが開かれます。Key は赤枠で強調表示されています" >}}

{{< img src="integrations/guide/windows_event_logs_with_wmi/event_viewer_3.png" alt="EventLog フォルダが展開され、Microsoft-Windows-TaskScheduler/Operational が赤枠でハイライト表示されている" >}}

キーを作成した後、このキーに 3 つの値を追加します。まず、ログファイルのパスを "File" という名前の String Value (REG_SZ) として追加します。
{{< img src="integrations/guide/windows_event_logs_with_wmi/event_viewer_4.png" alt="Windows のイベントビューアでは、file という名前のファイルが選択され、文字列を編集するオプションが表示されています。Value data: フィールドがハイライトされ、ログパスが表示されています" >}}

次に、Log ファイルの Full Name を String Value (REG_SZ) として "Primary Module" という名前で追加します。
{{< img src="integrations/guide/windows_event_logs_with_wmi/event_viewer_5.png" alt="Windows のイベントビューアでは、Primary Module という名前のファイルが選択され、文字列を編集するオプションが表示されています。Value data: フィールドがハイライトされ、フルネームが表示されています" >}}

最後に、Windows Event Log Api DLL (wevtapi.dll) へのパスを、`%SystemRoot%\system32\wevtapi.dll` の Expandable String Value として、名前 "DisplayNameFile" で追加します。
{{< img src="integrations/guide/windows_event_logs_with_wmi/event_viewer_6.png" alt="Windows のイベントビューアでは、DisplayNameFile という名前のファイルが選択され、文字列を編集するオプションが表示されています。Value data: フィールドがハイライトされています" >}}

変更は即座に行われるはずです。イベントログが Win32_NTLogEvent WMI クラスを通してアクセス可能であることを確認するために、上記のクエリをもう一度試してください。その後、Event Viewer インテグレーションコンフィギュレーションファイルへのイベントの追加を再開することができます。

注: クエリを実行してもイベントがない場合は、イベントビューアでログファイルにイベントがあることを確認してください。また、イベントログが無効になっていないか、最近のイベントがあるかどうかも確認してください。
{{< img src="integrations/guide/windows_event_logs_with_wmi/event_viewer_7.png" alt="Windows のイベントビューアでは、右側にアクションのリストが表示されています。ログを有効にするアクションがハイライトされ、ここでログを有効にするよう注意書きがされています" >}}