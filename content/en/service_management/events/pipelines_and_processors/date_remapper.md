---
title: Date Remapper

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
The recognized date formats are: <a href="https://www.iso.org/iso-8601-date-and-time-format.html">ISO8601</a>, <a href="https://en.wikipedia.org/wiki/Unix_time">UNIX (the milliseconds EPOCH format)</a>, and <a href="https://www.ietf.org/rfc/rfc3164.txt">RFC3164</a>.
</div>

If your events don't have a timestamp that conforms to the formats listed above, use the grok processor to extract the epoch time from the timestamp to a new attribute. The date remapper uses the newly defined attribute.

To see how a custom date and time format can be parsed in Datadog, see [Parsing dates][3].

**Notes**:

* As of ISO 8601-1:2019, the basic format is `T[hh][mm][ss]` and the extended format is `T[hh]:[mm]:[ss]`. Earlier versions omitted the T (representing time) in both formats.
* If multiple  date remapper processors are applied to a given pipeline, the last one (according to the pipeline's order) is taken into account.

Example date remapper processor  

{{< img src="logs/log_configuration/processor/date_remapper.png" alt="Define a date attribute" style="width:80%;" >}}