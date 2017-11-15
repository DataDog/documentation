---
title: How to track the freshness of a metric
kind: faq
customnav: developersnav
---

Using the API this is very easy!

You should be able to have something like the following:

{{< img src="developers/faq/trach_freshness_metric.png" alt="trach_freshness_metric" responsive="true" >}}

The script which will let you achieve the above is with [this code](https://github.com/DataDog/Miscellany/blob/charly/query_freshness/query_freshness.py).

You can modify the metric you want to track the freshness of line 10 (it will populate a new tag with the metric name). 
Secondly, line 12 you can modify how far back in time you want to go (the default is one hour).

If you want to automate it, you can use a cronjob to have it running every minute and you can track your metric's last datapoint timestamp compared to the current time.
To set my cronjob, I just used to following commands:
```
crontab -e
(vim) */1 * * * * cd <path_to_the_script> ; python query_freshness.py
(vim) !wq
crontab -l 
```
and make sure it lists the cron above.

You could also write a custom agent check to avoid the cronjob.

**NB**: You should adjust the frequency of this script depending on the frequency of the metric (if the metric is posted every 30 minutes, you can run this every 35 minutes and also increase the default window to two hours for instance), this is because the number of query batch is limited per hour.

**NB**: This script relies on the [API](/api), make sure you are not running it too often if you don't want to go beyond your quota (as mentioned in the above article).