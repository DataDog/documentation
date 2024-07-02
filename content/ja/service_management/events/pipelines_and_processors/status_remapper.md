---
title: Status Remapper

---

Use the status remapper processor to assign attributes as an official status to your events. For example, add an event severity level to your events with the status remapper.

{{< img src="logs/processing/processors/log_post_severity_bis.png" alt="リマップ後のログの重大度" style="width:40%;" >}}

受信したステータス値は、次のようにマップされます。

* 整数値 (0 から 7) は、[Syslog の重大度標準][4]にマップされます
* **emerg** または **f** で始まる文字列 (大文字と小文字の区別なし) は、**emerg (0)** にマップされます
* **a** で始まる文字列 (大文字と小文字の区別なし) は、**alert (1)** にマップされます
* **c** で始まる文字列 (大文字と小文字の区別なし) は、**critical (2)** にマップされます
* **e** で始まる文字列 (大文字と小文字の区別なし) で `emerg` に一致しないものは、**error (3)** にマップされます
* **w** で始まる文字列 (大文字と小文字の区別なし) は、**warning (4)** にマップされます
* **n** で始まる文字列 (大文字と小文字の区別なし) は、**notice (5)** にマップされます
* **i** で始まる文字列 (大文字と小文字の区別なし) は、**info (6)** にマップされます
* **d**、**trace**、または **verbose** で始まる文字列 (大文字と小文字の区別なし) は、**debug (7)** にマップされます
* **o** または **s** で始まる文字列または **OK** か **Success**に一致する文字列 (大文字と小文字の区別なし) は、**OK** にマップされます
* 他はすべて、**info (6)** にマップされます

**Note**: If multiple event status remapper processors are applied to a given event within the pipeline, only the first one (according to the pipeline's order) is taken into account.

Example status remapper 

{{< img src="logs/log_configuration/processor/severity_remapper.png" alt="ログ重大度リマッピング" style="width:60%;" >}}