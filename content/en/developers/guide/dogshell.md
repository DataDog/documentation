---
title: Dogshell
description: "Use Datadog's API from Terminal or Shell"
aliases:
  - /developers/faq/dogshell-quickly-use-datadog-s-api-from-terminal-shell
  - /developers/guide/dogshell-quickly-use-datadog-s-api-from-terminal-shell
---

You can use the Datadog API on the command line using a wrapper called Dogshell.

## Install Dogshell

Dogshell comes with the officially supported [`datadogpy` Python library][1], which is often used to send data to Datadog with [`DogStatsD`][2]. To install the library with PIP, run the following command:

{{< code-block lang="shell" >}}
pip install datadog
{{< /code-block >}}

Depending on your environment, you might have to add the library to your PATH. See the [`datadogpy` GitHub repo][3] for alternative installation instructions.

## Configure Dogshell

Dogshell uses a configuration file called `.dogrc` to store your API key, application key, and Datadog site.

To configure Dogshell:
1. Create a `.dogrc` file in your home directory:
   {{< code-block lang="shell" >}}
touch ~/.dogrc
{{< /code-block >}}

1. Add the following content to the file, replacing `MY_API_KEY` and `MY_APP_KEY` with your API key and application key respectively:
   ```conf
   [Connection]
   apikey = MY_API_KEY
   appkey = MY_APP_KEY
   api_host = {{< region-param key="dd_api">}}
   ```

   <div class="alert alert-info">You can create multiple configuration files if you need to run commands against different environments. Use the <code>--config</code> flag to specify the path to an alternative configuration file.</div>

1. Test the `dogshell` command by posting a test metric:
   {{< code-block lang="shell" >}}
dog metric post test_metric 1
{{< /code-block >}}

## Dogshell commands

Use the `-h` flag for a full list of the available Dogshell commands:

{{< code-block lang="shell" >}}
dog -h
{{< /code-block >}}

You can append the `-h` option to the following commands to get more information on specific Dogshell usage:

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

For additional information, see the [Dogshell code][4].

### Dogshell example

The following syntax posts a metric to your Datadog account:

{{< code-block lang="shell" disable_copy="true">}}
dog metric post MY_METRIC_NAME METRIC_VALUE --tags "TAG_KEY_1:TAG_VALUE_1,TAG_KEY_2:TAG_VALUE_2"
{{< /code-block >}}

For example, the following command sends a metric named `test_dogshell_metric` to your account with a value of `1.0` and the tags `test:one` and `example:one`:

{{< code-block lang="shell" >}}
dog metric post test_dogshell_metric 1.0 --tags "test:one,example:one"
{{< /code-block >}}

After you run the command, search for `test_dogshell_metric` using the [Metrics Explorer][5].

{{< img src="developers/guide/dogshell_test1.png" alt="Observing test_dogshell_metric from the Metrics explorer" >}}

[1]: https://github.com/DataDog/datadogpy
[2]: /metrics/custom_metrics/dogstatsd_metrics_submission/
[3]: https://github.com/DataDog/datadogpy#installation
[4]: https://github.com/DataDog/datadogpy/tree/master/datadog/dogshell
[5]: https://app.datadoghq.com/metric/explorer
