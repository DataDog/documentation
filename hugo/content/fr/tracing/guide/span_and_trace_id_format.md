---
aliases:
- /fr/tracing/faq/span_and_trace_id_format/

title: Formats des ID de trace et de span
---
{{< jqmath-vanilla >}}

Si vous rédigez du code qui interagit directement avec les traces et les spans de tracing Datadog, cette page décrit tout ce que vous devez savoir sur la façon dont les ID de span et de trace sont générés et acceptés par les bibliothèques de tracing Datadog.

Généralement, les bibliothèques génèrent des ID qui correspondent à des nombres entiers 64 bits non signés. Quelques particularités et exceptions s'appliquent :

| Langage   | ID générés            | ID de nombres entiers 64 bits acceptés valides |
| ---------- | ------------------------ | ----------------------------- |
| JavaScript | Non signés [0, $2^63$]     | Signés ou non signé            |
| Java       | Non signés [1, $2^63-1$]   | Non signés                      |
| Go         | Non signés [0, $2^63-1$]   | Signés ou non signés            |
| Python     | Non signés [0, $2^63$]     | Non signés                      |
| Ruby       | Non signés [0, $2^63$]     | Non signés                      |
| .NET       | Non signés [0, $2^63$]     | Non signés                      |
| PHP        | [0, $2^63$]              | Signés                        |
| C++        | Non signés [0, $2^63-1$]   | Non signés                      |