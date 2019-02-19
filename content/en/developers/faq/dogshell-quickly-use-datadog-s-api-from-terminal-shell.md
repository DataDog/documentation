---
title: Dogshell, Quickly Use Datadog's API from Terminal/Shell
kind: faq
---

Many users are familiar with [our API][1] and all the many things you can do in Datadog with it, whether sending/querying metrics or events to your Datadog account, creating dashboards, monitors, or downtimes, and more. But there's an easy way to use our API straight from terminal/shell, using a wrapper called "dogshell".

## Setup:

Dogshell comes with our officially supported [datadogpy Python library][2], often used to send data to Datadog via the [DogStatsD][3]. [It can easily be installed following the dedicated instructions][4].

Once you have that library installed, you have the dog command available to you in your terminal/shell, but it still needs to be "initialized": you need to provide it with an API and Application key so that it can be used to send/receive data to/from your account. This is easily done; when you first try running a dog command, it recognizes that it needs to be initialized, and walks you through the 2-step process.

As one example of a dog command that would trigger the initialization setup (although any old dog command would work), we can run the following:
```
dog metric post test_metric 1
```

If your .dogrc file has not yet been created (i.e, the dogshell has not yet been initialized), it returns something like the following:

```
~/.dogrc does not exist. Would you like to create it? [Y/n] 
```

To which, of course you'd submit "Y". It then responds:

```
What is your api key? (Get it here: https://app.datadoghq.com/account/settings#api) 
```

Where you can paste your API key, and then
```
What is your application key? (Generate one here: https://app.datadoghq.com/account/settings#api)
```

Where you can paste your application key. It finishes with:
```
Wrote ~/.dogrc.
```

Now you're all set to use your dog commands to quickly use the Datadog api from your terminal / shell. Check out some further help info on the dog commands by running dog -h.

In the event that you'd rather just write the .dogrc file yourself (perhaps you'd like to push the file to many of your servers programmatically so that you can run dog commands from any of your servers), the content of this file should be as follows:

```
[Connection]
apikey = YOUR_API_KEY
appkey = YOUR_APPLICATION_KEY
```

## The Dogshell Commands:

For reference, [find the code for dogshell][5]. But once you have dogshell installed and initialized, you can append the -h option to the following commands to get more information on specific dogshell usage:

* dog metric
* dog event
* dog status_check
* dog monitor
* dog downtime
* dog timeboard
* dog screenboard
* dog host
* dog tag
* dog search
* dog comment

### Example, Dogshell in Use

You can post metrics to your Datadog account by using:
```
dog metric post <metric_name> <metric_value> --tags "tag:one,tag:two"
```

So for example, the following command would send a metric named test_dogshell_metric to your account with a value of 1.0 and the tags "test:one" and "another_test":

```
dog metric post test_dogshell_metric 1.0 --tags "test:one,another_test"
```

Find more details on sending metrics from dogshell by running:
```
dog metric post -h
```

{{< img src="developers/faq/dogshell_test.png" alt="dogshell_test" responsive="true" >}}

[1]: /api
[2]: https://github.com/DataDog/datadogpy
[3]: /developers/dogstatsd
[4]: https://github.com/DataDog/datadogpy#installation
[5]: https://github.com/DataDog/datadogpy/tree/master/datadog/dogshell
