---
title: Status Remapper

---

Use the status remapper processor to assign attributes as an official status to your events. For example, add an event severity level to your events with the status remapper.

{{< img src="logs/processing/processors/log_post_severity_bis.png" alt="Log severity after remapping" style="width:40%;" >}}

Each incoming status value is mapped as follows:

* Integers from 0 to 7 map to the [Syslog severity standards][4]
* Strings beginning with **emerg** or **f** (case-insensitive) map to **emerg (0)**
* Strings beginning with **a** (case-insensitive) map to **alert (1)**
* Strings beginning with **c** (case-insensitive) map to **critical (2)**
* Strings beginning with **e** (case-insensitive)—that do not match `emerg`—map to **error (3)**
* Strings beginning with **w** (case-insensitive) map to **warning (4)**
* Strings beginning with **n** (case-insensitive) map to **notice (5)**
* Strings beginning with **i** (case-insensitive) map to **info (6)**
* Strings beginning with **d**, **trace** or **verbose** (case-insensitive) map to **debug (7)**
* Strings beginning with **o** or **s**, or matching **OK** or **Success** (case-insensitive) map to **OK**
* All others map to **info (6)**

**Note**: If multiple event status remapper processors are applied to a given event within the pipeline, only the first one (according to the pipeline's order) is taken into account.

Example status remapper 

{{< img src="logs/log_configuration/processor/severity_remapper.png" alt="Log severity remapping" style="width:60%;" >}}