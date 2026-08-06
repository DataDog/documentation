---
title: Stacks de llamada en profundidad en PHP 5
---
PHP admite un stack de llamadas casi infinita. Sin embargo, el hook de llamada de la función proporcionado por el motor Zend, `zend_execute_ex` (llamado `zend_execute` en PHP 5.4), llama a los métodos PHP y funciones usando el stack nativo C. Esto a su vez puede causar un desbordamiento del stack cuando el stack de llamadas en PHP se vuelve más y más grande.

A partir de la versión de ddtrace `0.48.0`, el rastreador de PHP utiliza el hook `zend_execute_ex` en PHP 5. El rastreador de PHP emite una advertencia cuando el stack de llamadas alcanza `512` marcos de profundidad. Puedes desactivar esta advertencia configurando la variable de entorno `DD_TRACE_WARN_CALL_STACK_DEPTH=0`.

Para acomodar aplicaciones de PHP con stacks de llamadas en profundidad, ajusta el límite de tamaño del stack en la máquina host. Para ver el tamaño de stack existente, ejecuta:

```shell
ulimit -s
```

Por ejemplo: si el tamaño del stack existente es `8192`, puede que desees duplicarlo estableciendo un nuevo tamaño de stack de `16384`.

```shell
sudo ulimit -s 16384
```