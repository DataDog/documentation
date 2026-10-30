If your application is packaged with setuptools:

1. Install the [`ddtrace` package](https://pypi.org/project/ddtrace/) in the build environment. For isolated builds, include it in `pyproject.toml`:

   ```toml
   [build-system]
   requires = ["setuptools", "ddtrace"]
   build-backend = "setuptools.build_meta"
   ```

2. Add `import ddtrace.sourcecode.setuptools_auto` to `setup.py` before importing setuptools.
3. Set the `DD_MAIN_PACKAGE` environment variable to the name of the installed Python distribution that contains the application.

If your application uses Hatch, configure `pyproject.toml`:

```toml
[build-system]
requires = ["hatchling", "hatch-datadog-build-metadata"]
build-backend = "hatchling.build"

[project]
dynamic = ["urls"]

[tool.hatch.metadata.hooks.datadog-build-metadata]
```

If `project.dynamic` already contains fields, add `urls` to that list. Move existing `project.urls` entries to `tool.hatch.metadata.hooks.datadog-build-metadata.urls`. The plugin adds `source_code_link` with the repository URL and commit SHA. For additional configuration, see the [plugin documentation](https://github.com/DataDog/hatch-datadog-build-metadata#readme).

Set `DD_MAIN_PACKAGE` at runtime to the name of the installed distribution. Run the build inside the Git checkout, or supply `DD_GIT_REPOSITORY_URL` and `DD_GIT_COMMIT_SHA` in the build environment.
