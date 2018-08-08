---
title: How to Transform a Timeboard to a Screenboard or vice versa ?
kind: faq
---

To transform a Timeboard to a Screenboard you can use the [script here][1].

The usage is very simple, you provide the ID of the dashboard you want to convert, and the output is the URL of the converted dashboard.

This relies on the API get and post methods for [Timeboards][2] and [Screenboards][3]. 

First, retrieve the ID of the dashboard, you can find it in the URL of the dashboard

{{< img src="graphing/dashboards/faq/id_dashboard.png" alt="ID dashboard" responsive="true" >}}

Here the ID is 66234.

Once you have the ID use the script as follows:

```
python dashconverter.py dashboard_ID 
```

This automatically detects if you listed a Screenboard or a Timeboard and convert it to the other one.

Note: As the widgets available on both dashboards are different you have a list of widgets which are not converted, this list includes:

```
['free_text','alert_value','check_status','event_timeline','event_stream','image','note','alert_graph','iframe']
```

Because the Screenboards' widgets have individual time windows, when converting a Timeboard to a Screenboard, all the widgets are set to 4h. This can be changed with the variable timeframe. Additionally, the size of the widgets is set to the default size, you can modify this with the variables height and width.

You have to enter your API and APP keys in the script for it to work.

A concrete use case for this is to transform this:

{{< img src="graphing/dashboards/faq/screenboard_1.png" alt="screenboard 1" responsive="true" >}}
 
To

{{< img src="graphing/dashboards/faq/timeboard_1.gif" alt="timeboard 1" responsive="true" >}}

Or with the following:

{{< img src="graphing/dashboards/faq/example_1.png" alt="example 1" responsive="true" >}}

transform this :

{{< img src="graphing/dashboards/faq/timeboard_2.gif" alt="timeboard 2" responsive="true" >}}

to this:

{{< img src="graphing/dashboards/faq/screenboard_2.gif" alt="screenboard 2" responsive="true" >}}

Then, you will be given the option to delete the original dashboard.

Note: If you clone an out of the box dashboard, certain widgets might have an old payload which do not comply with the code. You will see a warning in the output of the script and the outdated widget won't be converted.
If you want to get around this, just open the outdated widget (the title is given in the warning) and save it (no need to modify anything).
Then run the script again. Even if you had several warnings, updating one of the outdated widgets should be enough for all.
If you see this warning, and wish to convert the whole dashboard, do not delete it right away, make sure it is properly up to date first.

[1]: https://github.com/DataDog/Miscellany/blob/master/dashconverter.py
[2]: /api/#timeboards
[3]: /api/#screenboards
