---
title: 日付リマッパー
---

Datadog は日付を受信すると、以下のデフォルトの属性のいずれかの値を使用してタイムスタンプを付けます。

* `timestamp`
* `date`
* `_timestamp`
* `Timestamp`
* `eventTime`
* `published_date`

イベントにこのリストにない属性の日付がある場合は、日付リマッパープロセッサーを使用して、その日付属性を公式のイベントタイムスタンプとして定義してください。

<div class="alert alert-info">
認識される日付の形式は、<a href="https://www.iso.org/iso-8601-date-and-time-format.html">ISO8601</a>、<a href="https://en.wikipedia.org/wiki/Unix_time">UNIX (ミリ秒エポック形式)</a>、および <a href="https://www.ietf.org/rfc/rfc3164.txt">RFC3164</a> です。
</div>

イベントに上記の形式に準拠したタイムスタンプがない場合、grok プロセッサーを使用してタイムスタンプからエポックタイムを抽出し、新しい属性に変換します。日付リマッパーは新しく定義された属性を使用します。

Datadog でカスタム日付と時間形式をパースする方法については、[日付のパース][3]を参照してください。

**注**:

* ISO 8601-1:2019 では、基本フォーマットは `T[hh][mm][ss]`、拡張フォーマットは `T[hh]:[mm]:[ss]` です。それ以前のバージョンでは、どちらのフォーマットでも T (時刻を表す) が省略されています。
* 複数の日付リマッパープロセッサーがパイプラインに適用された場合は、(パイプラインの順序で) 最後のプロセッサーが考慮されます。

日付リマッパープロセッサーの例

{{< img src="logs/log_configuration/processor/date_remapper.png" alt="日付属性の定義" style="width:80%;" >}}
