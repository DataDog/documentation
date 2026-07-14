---
title: Call stacks profondes sur PHP 5
---
PHP prend en charge une call stack quasiment infinie. Toutefois, le hook d'appel de fonction fourni par le Zend Engine, `zend_execute_ex` (`zend_execute` pour PHP 5.4), appelle les méthodes et fonctions PHP à l'aide de la stack C native, ce qui peut provoquer un stack overflow lorsque la call stack dans PHP atteint une profondeur trop importante.

À compter de la version `0.48.0` de ddtrace, le traceur PHP utilise le hook `zend_execute_ex` sur PHP 5. Le traceur PHP émet un avertissement lorsque la call stack atteint une profondeur de `512` frames. Vous pouvez désactiver cet avertissement en définissant la variable d'environnement `DD_TRACE_WARN_CALL_STACK_DEPTH=0`.

Pour prendre en charge les applications PHP avec des call stacks très profondes, ajustez la limite de taille de la stack sur la machine du host. Pour afficher la limite existante, exécutez :

```shell
ulimit -s
```

Par exemple : si la limite de la stack est actuellement de `8192`, vous pouvez la doubler en définissant une nouvelle limite de `16384`.

```shell
sudo ulimit -s 16384
```