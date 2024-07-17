---
kind: ドキュメント
title: 日付リマッパー
---

As Datadog receives dates, it timestamps them using the value(s) from any of these default attributes:

* `timestamp`
* `date`
* `_timestamp`
* `Timestamp`
* `eventTime`
* `published_date`

If your events have dates in an attribute that are not in this list, use the date remapper processor to define their date attribute as the official event timestamp:

<div class="alert alert-info">
認識される日付の形式は、<a href="https://www.iso.org/iso-8601-date-and-time-format.html">ISO8601</a>、<a href="https://en.wikipedia.org/wiki/Unix_time">UNIX (ミリ秒エポック形式)</a>、および <a href="https://www.ietf.org/rfc/rfc3164.txt">RFC3164</a> です。
</div>

If your events don't have a timestamp that conforms to the formats listed above, use the grok processor to extract the epoch time from the timestamp to a new attribute. The date remapper uses the newly defined attribute.

Datadog でカスタム日付と時間形式をパースする方法については、[日付のパース][3]を参照してください。

**注**:

* ISO 8601-1:2019 では、基本フォーマットは `T[hh][mm][ss]`、拡張フォーマットは `T[hh]:[mm]:[ss]` です。それ以前のバージョンでは、どちらのフォーマットでも T (時刻を表す) が省略されています。
* If multiple  date remapper processors are applied to a given pipeline, the last one (according to the pipeline's order) is taken into account.

Example date remapper processor  

{{< img src="logs/log_configuration/processor/date_remapper.png" alt="日付属性の定義" style="width:80%;" >}}