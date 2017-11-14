---
title: Can I show events 'unaggregated' on the event stream?
kind: faq
customnav: graphingnav
---

You can achieve this result by changing the “aggregate_up” parameter in the url to false.  If you want to remove the top level aggregate event from appearing, change “use_date_happened” to true. Here is an example link:
https://app.datadoghq.com/event/stream?show_private=true&aggregate_up=false&use_date_happened=true&per_page=30&display_timeline=true&from_ts=1418047200000&to_ts=1418050800000&incident=true&codemirror_editor=true&live=true&bucket_size=60000