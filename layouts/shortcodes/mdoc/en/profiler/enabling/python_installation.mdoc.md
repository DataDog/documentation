<!--
Installation steps for Python profiler (steps 2-3 and closing).
Parent page provides shared step 1 (Agent).
-->

2. Install `ddtrace`, which provides both tracing and profiling functionalities:

   ```shell
   pip install ddtrace
   ```

   If you are using a platform where `ddtrace` binary distribution is not available, first install a development environment. For example, on Alpine Linux:

   ```shell
   apk install gcc musl-dev linux-headers
   ```

3. Enable the profiler and specify your service, environment, and version:

   ```shell
   DD_PROFILING_ENABLED=true \
   DD_ENV=prod \
   DD_SERVICE=my-web-app \
   DD_VERSION=1.0.3 \
   ddtrace-run python app.py
   ```

   To manually control the lifecycle of the profiler, use the `ddtrace.profiling.Profiler` object:

   ```python
   from ddtrace.profiling import Profiler

   prof = Profiler(
       env="prod",  # if not specified, falls back to environment variable DD_ENV
       service="my-web-app",  # if not specified, falls back to environment variable DD_SERVICE
       version="1.0.3",   # if not specified, falls back to environment variable DD_VERSION
   )
   prof.start()  # Should be as early as possible, eg before other imports, to ensure everything is profiled
   ```

4. Optional: Set up [Source Code Integration][1] to connect your profiling data with your Git repositories.

5. After a couple of minutes, your profiles appear on the [Datadog APM > Profiler page][2]. If they do not, refer to the [Troubleshooting][3] guide.

## Caveats

When your process forks using `os.fork`, the profiler is automatically restarted
in the child process on supported Python versions. No manual restart is required.

[1]: /integrations/guide/source-code-integration/?tab=python
[2]: https://app.datadoghq.com/profiling
[3]: /profiler/profiler_troubleshooting/python/
