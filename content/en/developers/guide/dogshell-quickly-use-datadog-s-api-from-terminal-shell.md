---
title: Dogshell, Quickly Use Datadog's API from Terminal/Shell
kind: guide
aliases:
  - /developers/faq/dogshell-quickly-use-datadog-s-api-from-terminal-shell
---

You can use the Datadog API straight from terminal/shell by using a wrapper called `dogshell`.

## Setup:

Dogshell comes with the officially supported [datadogpy Python library][1], often used to send data to Datadog via [DogStatsD][2]. [It can be installed following the  instructions][3].

Once you have that library installed, you have the `dog` command available to you in your terminal/shell, but it still needs to be "initialized": you need to provide it with an API and application key so that it can be used to send/receive data to and from your account. When you first try running a `dog` command, it recognizes that it needs to be initialized, and walks you through the 2-step process.

As one example of a `dog` command that would trigger the initialization setup (although any old dog command would work), you can run the following:

```text
dog metric post test_metric 1
```

If your `.dogrc` file has not yet been created (i.e, the dogshell has not yet been initialized), it returns something like the following:

```text
~/.dogrc does not exist. Would you like to create it? [Y/n]
```

Submit "Y". It then responds:

```text
What is your api key? (Get it here: https://app.datadoghq.com/account/settings#api)
```

You can paste your API key, and then:

```text
What is your application key? (Generate one here: https://app.datadoghq.com/account/settings#api)
```

You can paste your application key. It finishes with:

```text
Wrote ~/.dogrc.
```

Now you're all set to use your `dog` commands to quickly use the Datadog API from your terminal/shell. For further help and information on the `dog` commands, run `dog -h`.

In the event that you would rather just write the `.dogrc` file yourself (perhaps you'd like to push the file to many of your servers programmatically so that you can run `dog` commands from any of your servers), the content of this file should be as follows:

```text
[Connection]
apikey = <DATADOG_API_KEY>
appkey = <YOUR_APPLICATION_KEY>
```

## Dogshell commands

For reference, [find the code for Dogshell][4]. But once you have Dogshell installed and initialized, you can append the `-h` option to the following commands to get more information on specific Dogshell usage:

* `dog metric`
* `dog event`
* `dog status_check`
* `dog monitor`
* `dog downtime`
* `dog timeboard`
* `dog screenboard`
* `dog host`
* `dog tag`
* `dog search`
* `dog comment`

### Dogshell in use

You can post metrics to your Datadog account by using:

```text
dog metric post <METRIC_NAME> <METRIC_VALUE> --tags "<TAG_KEY_1>:<TAG_VALUE_1>,<TAG_KEY_2>:<TAG_VALUE_2>"
```

For example, the following command sends a metric named `test_dogshell_metric` to your account with a value of 1.0 and the tags `test:one` and `another_test`:

```text
dog metric post test_dogshell_metric 1.0 --tags "test:one,another_test"
```

Find more details on sending metrics from Dogshell by running:

```text
dog metric post -h
```

{{< img src="developers/faq/dogshell_test.png" alt="dogshell_test"  >}}

[1]: https://github.com/DataDog/datadogpy
[2]: /developers/metrics/dogstatsd_metrics_submission/
[3]: https://github.com/DataDog/datadogpy#installation
[4]: https://github.com/DataDog/datadogpy/tree/master/datadog/dogshell
