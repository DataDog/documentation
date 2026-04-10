<!--
Installation steps for Ruby profiler (steps 2+ and closing).
Parent page provides shared step 1 (Agent).
-->

2. Add the `datadog` gem to your `Gemfile` or `gems.rb` file and install with `bundle install`:

    ```ruby
    gem 'datadog', '~> 2.18'
    ```

3. Enable the profiler:

   {% tabs %}

   {% tab label="Environment variables" %}
   ```shell
   export DD_PROFILING_ENABLED=true
   export DD_ENV=prod
   export DD_SERVICE=my-web-app
   export DD_VERSION=1.0.3
   ```
   {% /tab %}

   {% tab label="In code" %}
   ```ruby
   Datadog.configure do |c|
     c.profiling.enabled = true
     c.env = 'prod'
     c.service = 'my-web-app'
     c.version = '1.0.3'
   end
   ```

   {% alert %}
   For Rails applications, create a `config/initializers/datadog.rb` file with the code configuration above.
   {% /alert %}
   {% /tab %}

   {% /tabs %}

4. Add the `ddprofrb exec` command to your Ruby application start command:

    ```shell
    bundle exec ddprofrb exec ruby myapp.rb
    ```

    Rails example:

    ```shell
    bundle exec ddprofrb exec bin/rails s
    ```

    If you're running a version of the gem older than 1.21.0, replace `ddprofrb exec` with `ddtracerb exec`.

    {% alert %}
    If starting the application with `ddprofrb exec` is not an option (for example, when using the Phusion Passenger web server), you can alternatively start the profiler by adding the following to your application entry point (such as `config.ru`, for a web application):

    ```ruby
    require 'datadog/profiling/preload'
    ```
    {% /alert %}

5. Optional: Set up [Source Code Integration][1] to connect your profiling data with your Git repositories.

6. After a couple of minutes, your profiles appear on the [Datadog APM > Profiler page][2]. If they do not, refer to the [Troubleshooting][3] guide.

[1]: /integrations/guide/source-code-integration/?tab=ruby
[2]: https://app.datadoghq.com/profiling
[3]: /profiler/profiler_troubleshooting/ruby/
