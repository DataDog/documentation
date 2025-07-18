---
title: Troubleshooting Node.js App and API Protection
---

## Common Issues

### No security signals appearing

If you don't see AAP threat information in the [Trace and Signals Explorer][1] for your Node.js application, follow these steps to troubleshoot the issue:

1. Verify Agent version:
   - Ensure you're running Datadog Agent v7.41.1 or higher.
   - Check Agent status: `datadog-agent status`.

2. Check Node.js tracer version:
   - Confirm you're using Node.js tracer v4.30.0 or higher.
   - Verify the tracer is loaded: `node -e "console.log(require('dd-trace/package.json').version)"`.

3. Verify environment variables:
   - Ensure `DD_APPSEC_ENABLED=true` is set.
   - Check `DD_SERVICE` and `DD_ENV` are properly configured.
   - Verify `DD_APM_ENABLED=true` if using APM features.

4. Check tracer initialization:
   - Ensure `dd-trace/init` is required at the start of your application.
   - Verify the tracer is properly loaded before your application code.

### Application fails to start

1. Check Node.js version compatibility:
   - Ensure you're using a supported Node.js version (see [compatibility requirements][2]).
   - Verify Node.js version: `node --version`.

2. Check dd-trace installation:
   - Ensure `dd-trace` is properly installed: `npm list dd-trace`.
   - Reinstall if necessary: `npm install dd-trace`.

3. Module loading errors:
   - Check for conflicts with other tracing libraries.
   - Verify the tracer is required before other modules.

### Performance impact

1. High latency:
   - Check Agent resource usage.
   - Verify network connectivity between Agent and Datadog.
   - Consider adjusting sampling rates.
   - Review [performance considerations][3].

2. High memory usage:
   - Monitor Node.js process memory usage.
   - Check for memory leaks in your application.
   - Consider adjusting tracer configuration.

### Configuration issues

1. Environment variables not recognized:
   - Ensure environment variables are set before starting the application.
   - Check for typos in environment variable names.
   - Verify that the tracer is initialized with the correct configuration.

2. Tracer initialization problems:
   - Make sure `require('dd-trace/init')` is the first line in your application.
   - Check for syntax errors in your tracer configuration.
   - Verify that the tracer is being imported correctly.

### Still having issues?

If you're still experiencing problems:
1. Check the [Application Security Monitoring troubleshooting guide][1].
2. Review the [Node.js tracer documentation][4].
3. Enable debug logging: `DD_TRACE_DEBUG=true`.
4. Contact [Datadog support][5].

[1]: /security/application_security/troubleshooting
[2]: /security/application_security/setup/nodejs/compatibility
[3]: /tracing/trace_collection/compatibility/nodejs/#performance
[4]: /tracing/trace_collection/compatibility/nodejs/
[5]: /help
