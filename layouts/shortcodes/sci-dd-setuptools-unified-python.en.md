If your application is packaged with setuptools:

1. Install the [`dd-trace` package](https://github.com/DataDog/dd-trace-go).
1. Add `import ddtrace.sourcecode.setuptools_auto` as the first import to the `setup.py` file.
1. Set the `DD_MAIN_PACKAGE` environment variable as the name of the primary Python package.

If your application is using a unified Python project settings file:

1. Install the `hatch-datadog-build-metadata` plugin and configure it to embed git metadata. If a project already has URLs, reconfigure them as dynamic and move them to another configuration section. For more information, see the [plugin source code](https://github.com/DataDog/hatch-datadog-build-metadata#readme).
1. Set the `DD_MAIN_PACKAGE` environment variable as the name of the primary Python package.