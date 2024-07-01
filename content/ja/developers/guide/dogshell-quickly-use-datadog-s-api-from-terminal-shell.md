---
title: Dogshell
description: "Use Datadog's API from Terminal or Shell"
kind: guide
aliases:
  - /developers/faq/dogshell-quickly-use-datadog-s-api-from-terminal-shell
---

You can use the Datadog API straight from terminal/shell by using a wrapper called `dogshell`.

## Setup:

Dogshell comes with the officially supported [datadogpy Python library][1], often used to send data to Datadog with [DogStatsD][2]. See the [datadogpy GitHub repo][3] for installation instructions.

Once you have that library installed, you have the `dog` command available to you in your terminal/shell, but it still needs to be "initialized". To initialize it, provide it with an API and application key so that it can be used to send and receive data to and from your account. When you first try running a `dog` command, it recognizes that it needs to be initialized, and walks you through the 2-step process.

As one example of a `dog` command that would trigger the initialization setup (although any old dog command would work), you can run the following:

```text
dog metric post test_metric 1
```

If your `.dogrc` file has not yet been created (as in, the dogshell has not yet been initialized), it returns something like the following:

```text
~/.dogrc does not exist. Would you like to create it? [Y/n]
```

Submit "Y". It then responds:

```text
What is your api key? (Get it here: https://app.datadoghq.com/organization-settings/api-keys)
```

You can paste your API key, and then:

```text
What is your application key? (Generate one here: https://app.datadoghq.com/organization-settings/api-keys)
```

You can paste your application key. It finishes with:

```text
Wrote ~/.dogrc.
```

Next, use your `dog` commands to quickly use the Datadog API from your terminal/shell. For further help and information on the `dog` commands, run `dog -h`.

If you would rather write the `.dogrc` file yourself, the content of this file should be as follows:

{{< site-region region="us" >}}
```text
[Connection]
apikey = <DATADOG_API_KEY>
appkey = <YOUR_APPLICATION_KEY>
api_host = https://datadoghq.com
```
{{< /site-region >}}
{{< site-region region="us3" >}}
```text
apikey = <DATADOG_API_KEY>
appkey = <YOUR_APPLICATION_KEY>
api_host = https://us3.datadoghq.com
```
{{< /site-region >}}
{{< site-region region="us5" >}}
```text
apikey = <DATADOG_API_KEY>
appkey = <YOUR_APPLICATION_KEY>
api_host = https://us5.datadoghq.com
{{< /site-region >}}
{{< site-region region="eu" >}}
```text
apikey = <DATADOG_API_KEY>
appkey = <YOUR_APPLICATION_KEY>
api_host = https://datadoghq.eu
```
{{< /site-region >}}
{{< site-region region="gov" >}}
```text
apikey = <DATADOG_API_KEY>
appkey = <YOUR_APPLICATION_KEY>
api_host = https://ddog-gov.com
```
{{< /site-region >}}
{{< site-region region="ap1" >}}
```text
apikey = <DATADOG_API_KEY>
appkey = <YOUR_APPLICATION_KEY>
api_host = https://ap1.datadoghq.com
```
{{< /site-region >}}

This is useful if you'd like to push the file to many of your servers programmatically so that you can run `dog` commands from any of your servers.

## Dogshell commands

For reference, [find the code for Dogshell][4]. But once you have Dogshell installed and initialized, you can append the `-h` option to the following commands to get more information on specific Dogshell usage:

* `dog metric`
* `dog event`
* `dog service_check`
* `dog monitor`
* `dog downtime`
* `dog timeboard`
* `dog screenboard`
* `dog dashboard`
* `dog host`
* `dog tag`
* `dog search`
* `dog comment`

**Note**: The `dogshell` command sends data to the Datadog US1 by default. If you need to send data to another site you can do so using the `--api_host` option or by specificying an api_host in your `.dogrc` file.

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

{{< img src="developers/faq/dogshell_test.png" alt="dogshell_test" >}}

[1]: https://github.com/DataDog/datadogpy
[2]: /metrics/custom_metrics/dogstatsd_metrics_submission/
[3]: https://github.com/DataDog/datadogpy#installation
[4]: https://github.com/DataDog/datadogpy/tree/master/datadog/dogshell
