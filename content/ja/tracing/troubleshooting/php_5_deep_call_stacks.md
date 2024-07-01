---
title: Deep call stacks on PHP 5
kind: documentation
---
PHP supports a virtually infinite call stack. However, the function call hook provided by the Zend Engine, `zend_execute_ex` (named `zend_execute` on PHP 5.4), calls PHP methods and functions using the native C stack. This in turn can cause a stack overflow when the call stack in PHP becomes extra deep.

Starting with ddtrace version `0.48.0`, the PHP tracer uses the `zend_execute_ex` hook on PHP 5. The PHP tracer emits a warning when the call stack reaches `512` frames deep. You can disable this warning by setting the environment variable `DD_TRACE_WARN_CALL_STACK_DEPTH=0`.

To accommodate PHP applications with deep call stacks, adjust the stack size limit on the host machine. To see the existing stack size, run:

```shell
ulimit -s
```

For example: if the existing stack size is `8192`, you may wish to double it by setting a new stack size of `16384`.

```shell
sudo ulimit -s 16384
```
