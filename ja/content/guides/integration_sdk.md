---
autotocdepth: 2
kind: guide
listorder: 5
placeholder: true
title: Creating New Integrations
---

<div class='alert alert-info'><strong>NOTICE:</strong>アクセスいただきありがとうございます。こちらのページは現在英語のみのご用意となっております。引き続き日本語化の範囲を広げてまいりますので、皆様のご理解のほどよろしくお願いいたします。</div>

<!-- Additional styling to help file name headers stand out -->
<style>h5 code{font-size:16px;display:inline-block;margin-top:20px;}</style>

## Requirements

You will need a working [Ruby](https://www.ruby-lang.org) environment. For more information on installing Ruby, please reference [the Ruby installation documentation](https://www.ruby-lang.org/en/documentation/installation/).

You will also need [Wget](https://www.gnu.org/software/wget/). Wget is already installed on most Linux systems and is easy to install on Mac using [Homebrew](http://brew.sh/) or on Windows using [Chocolatey](https://chocolatey.org/).

## Setup

We've written [a gem](https://rubygems.org/gems/datadog-sdk-testing) and a set of scripts to help you get set up, ease development, and provide testing. To begin:

1. Fork the [integrations-extras repository](https://github.com/DataDog/integrations-extras) on Github and clone the repository to your dev environment.
2. Run `gem install bundler`
3. Run `bundle install`

Once the required Ruby gems have been installed by Bundler, you can easily create a [Python](https://www.python.org/) environment:

1. Run `rake setup_env`. This will install a Python virtual environment along with all the components necessary for integration development.
2. Run `source venv/bin/activate` to activate the installed Python virtual environment. To exit the virtual environment, run `deactivate`. You can learn more about the Python virtual environment on the [Virtualenv documentation](https://virtualenv.pypa.io/en/stable/).

## Building an integration

You can use rake to generate the skeleton for a new integration by running `rake generate:skeleton[my_integration]`, where "my_integration" is the name of your new integration (note: you must enclose your integration name in square brackets).

This will create a new directory, `my_integration`, that contains all the files required for your new integration. This will also create an entry for your new integration in our `.travis.yml` and `circle.yml` continuous integration files to ensure that your tests are run whenever new builds are created.

### Integration files

New integrations should contain the following files:

#### `README.md`

Your README file should provide the following sections:

- **Overview** (required): Let others know what they can expect to do with your integration.
- **Installation** (required): Provide information about how to install your integration.
- **Configuration** (required): Detail any steps necessary to configure your integration or the service you are integrating.
- **Validation** (required): How can users ensure the integration is working as intended?
- **Troubleshooting**: Help other users by sharing solutions to common problems they might experience.
- **Compatibility** (required): List the version(s) of the application or service that your integration has been tested and validated against.
- **Metrics** (required): Include a list of the metrics your integration will provide.
- **Events**: Include a list of events if your integration provides any.
- **Service Checks**: Include a list of service checks if your integration provides any.

#### `check.py`

The file where your check logic should reside. The skeleton function will boilerplate an integration class for your integration, including a `check` method where you should place your check logic.

For example:

~~~
# Example check.py
import time
from checks import AgentCheck

class MyIntegrationCheck(AgentCheck):
  def __init__(self, name, init_config, agentConfig, instances=None):
    AgentCheck.__init__(self, name, init_config, agentConfig, instances)

  def check(self, instance):
    # Send a custom event.
    self.event({
      'timestamp': int(time.time()),
      'source_type_name': 'my_integration',
      'msg_title': 'Custom event',
      'msg_text': 'My custom integration event occurred.',
      'host': self.hostname,
      'tags': [
          'action:my_integration_custom_event',
      ]
    })
~~~

For more information about writing checks and how to send metrics to the Datadog agent, reference our [Writing an Agent Check guide](http://docs.datadoghq.com/guides/agent_checks/)

If you need to import any third party libraries, you can add them to the `requirements.txt` file.

##### `ci/my_integration.rake`

If your tests require a testing environment, you can use the `install` and `cleanup` tasks to respectively set up and tear down a testing environment.

For example:

~~~
# Example my_integration.rake
namespace :ci do
  namespace :my_integration do |flavor|
    task install: ['ci:common:install'] do

      # Use the Python Virtual Environment and install packages.
      use_venv = in_venv
      install_requirements('my_integration/requirements.txt',
                           "--cache-dir #{ENV['PIP_CACHE']}",
                           "#{ENV['VOLATILE_DIR']}/ci.log",
                           use_venv)

      # Setup a docker testing container.
      $(docker run -p 80:80 --name my_int_container -d my_docker)
~~~

For more information about writing integration tests, please see [the documentation in the Datadog agent repository](https://github.com/DataDog/dd-agent/blob/master/tests/README.md#integration-tests). You can also reference the [ci common library](https://github.com/DataDog/dd-agent/blob/master/ci/common.rb) for helper functions such as `install_requirements` and `sleep_for`.

A note about terminology: You may notice the variable `flavor` in this file and other areas of testing. *Flavor* is a term we use to denote variations of integrated software, typically versions. This allows you to write one set of tests, but target different *flavors*, variants or versions of the software you are integrating.

#### `conf.yaml.example`

In order to install your integration, users will need to configure the integration for their specific instances. To do this, they'll copy the `conf.yaml.example` file that you provide into their Agent's `conf.d` directory, then update it with their instance specific information.

Your `conf.yaml.example` file should provide two sections:

- `init_config` for any globally configured parameters
- `instances` for specific instances to integrate. This often includes a server or host address with additional parameters such as authentication information, additional tags and configuration settings.

##### `manifest.json`

This JSON file provides metadata about your integration and should include:

- **`maintainer`**: Provide a valid email address where you can be contacted regarding this integration.
- **`manifest_version`**: The version of this manifest file.
- **`max_agent_version`**: The maximum version of the Datadog agent that is compatible with your integration. We do our best to maintain integration stability within major versions, so you should leave this at the number generated for you. If your integration breaks with a new release of the Datadog agent, please set this number and [submit an issue on the Datadog Agent project](https://github.com/DataDog/dd-agent/blob/master/CONTRIBUTING.md#submitting-issues).
- **`min_agent_version`**: The minimum version of the Datadog agent that is compatible with your integration.
- **`name`**: The name of your integration.
- **`short_description`**: Provide a short description of your integration.
- **`support`**: As a community contributed integration, this should be set to "contrib". Only set this to another value if directed to do so by Datadog staff.
- **`version`**: The current version of your integration.

You can reference one of the existing integrations for an example of the manifest file.

#### `metadata.csv`

The metadata CSV contains a list of the metrics your integration will provide and basic details that will help inform the Datadog web application as to which graphs and alerts can be provided for the metric.

The CSV should include a header row and the following columns:

**`metric_name`** (required): The name of the metric as it should appear in the Datadog web application when creating dashboards or monitors. Often this name is a period delimited combination of the provider, service, and metric (e.g. `aws.ec2.disk_write_ops`) or the application, application feature, and metric (e.g. `apache.net.request_per_s`).

**`metric_type`** (required): The type of metric you are reporting. This will influence how the Datadog web application handles and displays your data. Accepted values are: `count`, `gauge`, or `rate`.

  - `count`: A count is the number of particular events that have occurred. When reporting a count, you should only submit the number of new events (delta) recorded since the previous submission. For example, the `aws.apigateway.5xxerror` metric is a `count` of the number of server-side errors.
  - `gauge`: A gauge is a metric that tracks a value at a specific point in time. For example, `docker.io.read_bytes` is a `guage` of the number of bytes read per second.
  - `rate`: A rate a metric over time (and as such, will typically include a `per_unit_name` value). For example, `lighttpd.response.status_2xx` is a `rate` metric capturing the number of 2xx status codes produced per second.

**`interval`**: The interval used for conversion between rates and counts. This is required when the `metric_type` is set to the `rate` type.

**`unit_name`**: The label for the unit of measure you are gathering. The following units (grouped by type) are available:

  - **Bytes**: `bit`, `byte`, `kibibyte`, `mebibyte`, `gibibyte`, `tebibyte`, `pebibyte`, `exbibyte`
  - **Cache**: `eviction`, `get`,  `hit`,  `miss`,  `set`
  - **Database**: `assertion`, `column`, `command`, `commit`, `cursor`, `document`, `fetch`, `flush`, `index`, `key`, `lock`, `merge`, `object`, `offset`, `query`, `question`, `record`, `refresh`, `row`, `scan`, `shard`, `table`, `ticket`, `transaction`, `wait`
  - **Disk**: `block`, `file`, `inode`, `sector`
  - **Frequency**: `hertz`, `kilohertz`, `megahertz`, `gigahertz`
  - **General**: `buffer`, `check`, `email`, `error`, `event`, `garbage`,  `collection`, `item`, `location`, `monitor`, `occurrence`, `operation`, `read`, `resource`, `sample`, `stage`, `task`, `time`, `unit`, `worker`, `write`
  - **Memory**: `page`, `split`
  - **Money**: `cent`, `dollar`
  - **Network**: `connection`, `datagram`, `message`, `packet`, `payload`, `request`, `response`, `segment`, `timeout`
  - **Percentage**: `apdex`, `fraction`, `percent`, `percent_nano`
  - **System**: `core`, `fault`, `host`, `instance`, `node`, `process`, `service`, `thread`
  - **Time**: `microsecond`, `millisecond`, `second`, `minute`, `hour`, `day`, `week`

If the unit name is not listed above, please leave this value blank. To add a unit to this listing, please file an [issue](https://github.com/DataDog/integrations-extras/issues)

**`per_unit_name`**: If you are gathering a per unit metric, you may provide an additional unit name here and it will be combined with the `unit_name`. For example, providing a `unit_name` of "request" and a `per_unit_name` of "second" will result in a metric of "requests per second". If provided, this must be a value from the available units listed above.

**`description`**: A basic description (limited to 400 characters) of the information this metric represents.

**`orientation`** (required): An integer of `-1`, `0`, or `1`.

  - `-1` indicates that smaller values are better. For example, `mysql.performance.slow_queries` or `varnish.fetch_failed` where low counts are desirable.
  - `0` indicates no intrinsic preference in values. For example, `rabbitmq.queue.messages` or `postgresql.rows_inserted` where there is no preference for the size of the value or the preference will depend on the business objectives of the system.
  - `1` indicates that larger values are better. For example, `mesos.stats.uptime_secs` where higher uptime or `mysql.performance.key_cache_utilization` where more cache hits are desired.

**`integration`** (required): This must match the name of your integration. (e.g. "my_integration").

**`short_name`**: A more human-readable and abbreviated version of the metric name. For example, `postgresql.index_blocks_read` might be set to `idx blks read`. Aim for human-readability and easy understandability over brevity. Don't repeat the integration name. If you can't make the `short_name` shorter and easier to understand than the `metric_name`, leave this field empty.

#### `requirements.txt`

If you require any additional Python libraries, you can list them here and they will be automatically installed via pip when others use your integration.

#### `test_my_integration.py`

Integration tests ensure that the Datadog agent is correctly receiving and recording metrics from the software you are integrating.

Though we don't require test for each of the metrics collected by your integration, we strongly encourage you to provide as much coverage as possible. You can run the `self.coverage_report()` method in your test to see which metrics are covered.

Here's an example `test_my_integration.py`:

~~~
# Example test_my_integraion.py
from nose.plugins.attrib import attr
from checks import AgentCheck
from tests.checks.common import AgentCheckTest

@attr(requires='my_integration')
Class TestMyIntegration(AgentCheckTest):

  def testMyIntegration(self):
    self.assertServiceCheck('my_integration.can_connect',
                            count=1,
                            status=AgentCheck.OK,
                            tags=[host:localhost', 'port:80'])
    self.coverage_report()
~~~

For more information about tests and available test methods, please reference the [AgentCheckTest class in the Datadog Agent repository](https://github.com/DataDog/dd-agent/blob/master/tests/checks/common.py)

## Libraries

The [Datadog Agent](https://github.com/DataDog/dd-agent) provides a number of useful libraries in the [`utils` directory](https://github.com/DataDog/dd-agent/tree/master/utils). These libraries can be helpful when building your integration and we encourage you to use them, but please be aware that these libraries will be moved in the upcoming Datadog Agent version 6.0. We will provide more details regarding integrations and these libraries prior to the Datadog Agent 6.0 release.

## Testing your integration

As you build your check and test code, you can use the following to run your tests:

- `rake lint`: Lint your code for potential errors
- `rake ci:run[my_integration]`: Run the tests that you have written in your `test_my_integration.py` file and that have an `@attr(requires='my_integration')` annotation.
- `rake ci:run[default]`: Run the tests you have written written in your `test_my_integration.py` file (without the `@attr(requires='my_integration')` annotation) in addition to some additional generic tests we have written.

Travis CI will automatically run tests when you create a pull request. Please ensure that you have thorough test coverage and that you are passing all tests prior to submitting pull requests.

Add the `@attr(requires='my_integration')` annotation on the test classes or methods that require a full docker testing environment (see next section).
Don't add this annotation to your unit and mock tests ; those run via `rake ci:run[default]` on Travis CI.

To iterate quickly on your unit and mock tests, instead of running all the tests with `rake ci:run[default]`, you can simply run:

~~~
# run unit and mock tests, in the virtualenv
$ bundle exec rake exec["nosetests my_integration/test/test_*.py -A 'not requires'"]
~~~

### Docker test environments

At Datadog we're using Docker containers for testing environments and we highly encourage you to do the same. Containers are lightweight, easy to manage, and provide consistent, standardized environments for each test run.

For example in our MySQL integration, the [`ci/mysql.rake` file](https://github.com/DataDog/integrations-core/blob/master/mysql/test/ci/mysql.rake) uses the [official MySQL container](https://hub.docker.com/_/mysql/) and involves four main tasks

1. `before_install` - Prior to starting our new Docker test environment, we need to ensure that any previous Docker test environments are stopped and removed.
2. `install` - The install task performs the Docker `run` which will start the MySQL test server.
3. `before_script` - This task first ensures that the MySQL server is running, then connects to the server to perform some setup tasks. We highly recommend that you keep setup tasks in your `test_integration.py` file when possible, but we recognize that sometimes setup and configurations will need to be performed prior to the python test script.
4. `cleanup` - After the tests are complete, the Docker test environment is stopped and removed.

### Installing your integration locally

When your integration is merged into the `integrations-extras` repository, we will generate packages so that others can easily install your integration (see the [Installing Core & Extra Integrations guide](http://docs.datadoghq.com/guides/installcoreextra)). However, you may want to install your integration locally before it's merged.

To run locally, first copy your `check.py` file into the Datadog Agent's `checks.d` directory and rename it to `my_integration.py` (using the actual name of your integration).

Next, copy your `conf.yaml.example` file into the Datadog Agent's `conf.d` directory and rename it to `my_integration.yaml` (again, using the actual name of your integration).

See the Agent Check guide for more information about the [Datadog Agent directory structure](http://docs.datadoghq.com/guides/agent_checks/#directory)).

### Teardown and cleanup

When you have finished building your integration, you can run `rake clean_env` to remove the Python virtual environment.

## Submitting Your integration

Once you have completed the development of your integration, submit a [pull request](https://github.com/DataDog/integrations-extras/compare) to have Datadog review your integration. After we've reviewed your integration, we will approve and merge your pull request or provide feedback and next steps required for approval.

### Other Considerations

In our experience building integrations, we've also faced a number of challenges. As your write your tests, here are a few things to consider:

* Test clusters. Testing single instances of your software is often easier, but tests are more useful when run against setups that are representative of real-world uses. For example, MongoDB is typically used with sharding and replica set features.
* Consider generating calculated metrics in addition to raw metrics. For example, many databases will have slow, but less frequently run queries. So it's often useful to look at percentiles. For example, our MySQL integration includes a calculated metric for the [95th percentile query execution time](https://github.com/DataDog/integrations-core/blob/master/mysql/check.py#L1169).
