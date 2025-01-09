---
further_reading:
- link: /agent/versions/upgrade_to_agent_v7/
  tag: Documentación
  text: Actualizar el Agent a la versión 7
- link: /agent/guide/agent-v6-python-3/
  tag: Documentación
  text: Uso de Python 3 con el Datadog Agent v6
title: Migración de checks personalizados a Python 3
---

<div class="alert alert-info">
Solo es posible ejecutar checks personalizados de Python 3 de forma predeterminada a partir de la versión 7 del Agent. Para ejecutarlos de forma nativa, <a href="/agent/versions/upgrade_to_agent_v7">pásate a la última versión del Agent</a>. En cambio, si quieres probar a migrar tus checks personalizados sin actualizar el Agent, también puedes <a href="/agent/guide/agent-v6-python-3">activar el tiempo de ejecución de Python 3</a> para tu Agent v6.14 o posterior.
</div>

## Información general

Esta guía ofrece información y algunas prácticas recomendadas sobre la migración de checks entre Python 2 y 3. Utiliza la herramienta [Custom Check Compatibility][1] de Datadog para comprobar si tus checks personalizados son compatibles con Python 3 o si es necesario migrarlos.

Esta guía se centra en mantener la compatibilidad con versiones anteriores con el fin de asegurar la flexibilidad necesaria para permitir que el código se ejecute en diferentes versiones del Agent.

## Editores y herramientas

### Pylint

Pylint dispone de una serie de funciones que te ayudarán a [verificar si tus checks personalizados son compatibles con Python 3][2].

#### Instalación

Para comenzar, instala Pylint mediante [pip][3] en Python 2:

```bash
$ python2 -m pip install pylint
```

Sustituye `python2` en el comando anterior si la ruta a tu intérprete de Python 2 es diferente.

#### Uso

Ejecuta el comando `pylint` para comprobar que tu check o integración personalizados se ejecuten en Python 3. Reemplaza `CHECK` por una ruta válida a una carpeta de módulos o paquetes de Python:

```bash
$ python2 -m pylint -sn --py3k CHECK
```

Por ejemplo:

```bash
$ python2 -m pylint -sn --py3k ~/dev/my-check.py
************* Module my-check
E:  4, 4: print statement used (print-statement)
W:  7,22: Calling a dict.iter*() method (dict-iter-method)
W:  9, 8: division w/o __future__ statement (old-division)
```

Después de solucionar las incompatibilidades, el comando no devolverá nada:

```bash
$ python2 -m pylint -sn --py3k ~/dev/my-check.py
$ 
```

Aunque `pylint` detecta cualquier problema que pueda impedir que el intérprete de Python 3 ejecute el código, no puede comprobar la validez lógica. Si realizas algún cambio en el código, recuerda ejecutar el check y validar la salida.

### 2to3

[2to3][4] convierte el código de Python 2 a código de Python 3. Si tienes un check personalizado `foo.py`, ejecuta 2to3:

```bash
$ 2to3 foo.py
```

Al ejecutar 2to3, se imprime una diferencia con respecto al archivo fuente original. Para obtener más información sobre 2to3, consulta la [documentación oficial sobre 2to3][4].

### Editores

La mayoría de entornos de desarrollo integrado y editores modernos ofrecen la función avanzada de linting de manera automática. Comprueba que se dirijan a un ejecutable de Python 3. De este modo, cuando abras un archivo legacy basado únicamente en Python 2, cualquier error o advertencia de linting aparecerá en el lateral como una marca de color en [PyCharm][5] o como un cuadro cuya parte inferior se pueda clicar en [Visual Studio Code][6].

## Migración de Python

### Importaciones de paquetes

Con Python 3, para uniformar el espacio de nombres de los paquetes Datadog, todos los recursos se encuentran dentro del subpaquete base. Por ejemplo:

```python
from datadog_checks.checks import AgentCheck
```

se convierte en

```python
from datadog_checks.base.checks import AgentCheck
```

### Six

[Six][7] es una biblioteca de compatibilidad de Python 2 y 3 pensada para hacer posible que los desarrolladores envíen código de Python que funcione tanto en Python 2 como en Python 3. En algunos de los ejemplos siguientes, se utiliza Six para hacer que el código legacy de Python 2 sea compatible con Python 3.

### Métodos de diccionario

En Python 3, no están disponibles los métodos `dict.iterkeys()`, `dict.iteritems()` y `dict.itervalues()`.

| Python 2                                                         | Python 2 y 3                                                                                         |
|------------------------------------------------------------------|--------------------------------------------------------------------------------------------------------|
| `for key in mydict.iterkeys():` <br/> &nbsp;&nbsp;`  ...`        | `for key in mydict:`<br/> &nbsp;&nbsp;`  ...`                                                          |
| `for key, value in mydict.iteritems():`<br/> &nbsp;&nbsp;`  ...` | `from six import iteritems` <br/><br/> `for key, value in iteritems(mydict):`<br/> &nbsp;&nbsp;`  ...` |
| `for value in mydict.itervalues():`<br/> &nbsp;&nbsp;`  ...`     | `from six import itervalues` <br/><br/> `for value in itervalues(mydict):`<br/> &nbsp;&nbsp;`  ...`    |

Además, en Python 3, los métodos `dict.keys()`, `dict.items()`, `dict.values()` devuelven iteradores. Por lo tanto, si es necesario modificar el diccionario durante la iteración, primero hay que hacer una copia. Para obtener las claves/elementos/valores de un diccionario en forma de lista:

| Python 2                        | Python 2 y 3                       |
|---------------------------------|--------------------------------------|
| `mykeylist = mydict.keys()`     | `mykeylist = list(mydict)`           |
| `myitemlist = mydict.items()`   | `myitemlist = list(mydict.items())`  |
| `myvaluelist = mydict.values()` | `myvaluelist = list(mydict.values()` |

El método `dict.has_key()` está obsoleto en Python 2 y se ha eliminado en Python 3. En su lugar, utiliza el operador `in`.

| Python 2                             | Python 2 y 3  |
|--------------------------------------|-----------------|
| `mydict.has_key('foo') //deprecated` | `foo in mydict` |

### Cambios en la biblioteca estándar

Python 3 cuenta con una biblioteca estándar reestructurada, en la que se han cambiado de nombre o desplazado varios módulos y funciones. La función de importar módulos trasladados mediante `six.moves` es compatible con ambas versiones de Python.

| Python 2            | Python 3             | Python 2 y 3                      |
|---------------------|----------------------|-------------------------------------|
| `import HTMLParser` | `import html.parser` | `from six.moves import html_parser` |

Consulta la [documentación sobre Six][7] para ver la lista de módulos renombrados. **Nota**: Los módulos `urllib`, `urllib2` y `urlparse` se han reorganizado por completo.

### Unicode

Python 2 trata igual el texto Unicode y los datos codificados en binario, e intenta efectuar automáticamente la conversión entre bytes y cadenas. Este procedimiento funcionará si todos los caracteres son ASCII, pero provocará comportamientos inesperados cuando encuentre caracteres que no sean ASCII.

| tipo    | literal | Python 2 | Python 3 |
|---------|---------|----------|----------|
| bytes   | b'...'  | binario   | binario   |
| cadena     | '...'   | binario   | texto     |
| unicode | u'...'  | texto     | texto     |

Los datos de texto son puntos de código Unicode; para almacenarlos o transmitirlos, es necesario codificarlos con `.encode(encoding)`. Los datos binarios son puntos de código codificados representados como una secuencia de bytes que deben volver a descodificarse como texto con `.decode(encoding)`. Al leer texto de un archivo, la función `open` del paquete `io` resulta de gran utilidad porque los datos leídos ya están descodificados en Unicode:

```python
from io import open

f = open('textfile.txt', encoding='utf-8')
contents = f.read()  # contents will be decoded to unicode using 'utf-8'; these are not bytes!
```

Para obtener más información, consulta la presentación de Ned Batchelder: [Pragmatic Unicode][8].

### Print

En Python 3, print se trata explícitamente como una función; para convertir print en una función sin importar la versión de Python que tengas, introduce `from __future__ import print_function` al principio de cualquier archivo que utilice la antigua sentencia print y añade paréntesis para invocar la función.

| Python 2      | Python 2 y 3                                                    |
|---------------|-------------------------------------------------------------------|
| `print "foo"` | `from __future__ import print_function` <br/><br/> `print("foo")` |

### División entera

En Python 2, el operador `/` realiza la división euclídea de números enteros.

#### Python 2

```python
>> 5/2
2
```

En Python 3, el operador `/` realiza la división real (sin resto), mientras que el operador `//` realiza la división euclídea.

#### Python 3

```python
>> 5/2
2.5
>> 5//2
2
```

Para reproducir el mismo comportamiento que en Python 3 sin importar la versión de Python que tengas, introduce `from __future__ import division` en la parte superior de cualquier archivo que utilice la división y usa `//` para obtener en números enteros los resultados de la división.

### Redondeo

En Python 2, la biblioteca estándar redondea los números aritméticamente (hacia arriba si el número llega al 5). En cambio, Python 3 redondea los números en función del número par más cercano.

#### Python 2

```python
>> round(2.5)
3
>> round(3.5)
4
```

#### Python 3

```python
>> round(2.5)
2
>> round(3.5)
4
```

Datadog ofrece la función de utilidad `round_value` en `datadog_checks_base`. Esta función permite replicar el comportamiento de Python 2 tanto en Python 2 como en Python 3.

### Excepciones

Python 3 cuenta con una sintaxis diferente para "except" y "raise".

| Python 2                                                                                     | Python 2 y 3                                                                                 |
|----------------------------------------------------------------------------------------------|------------------------------------------------------------------------------------------------|
| `try:` <br/> &nbsp;&nbsp; `...` <br/> `except Exception, variable:` <br/> &nbsp;&nbsp; `...` | `try:` <br/> &nbsp;&nbsp; `...` <br/> `except Exception as variable:` <br/> &nbsp;&nbsp; `...` |
| `raise Exception, args`                                                                      | `raise Exception(args)`                                                                        |

### Importaciones relativas

En Python 3, las importaciones relativas deben hacerse explícitamente y, para ello, se utiliza un punto (`.`).

Imaginemos que tu paquete está estructurado del siguiente modo:

```text
mypackage/
    __init__.py
    math.py
    foo.py
```

Supongamos también que `math.py` cuenta con una función llamada `gcd` (que contiene matices distintos de la función `gcd` del módulo `math` de la biblioteca estándar) y quieres utilizar la función `gcd` de tu paquete local, no la de la biblioteca estándar.

En Python 2, si estás dentro de un paquete, los módulos propios de ese paquete tienen prioridad sobre los módulos globales. Al usar `from math import gcd`, se importa la función `gcd` de `mypackage/math.py`.

En Python 3, los formatos de importación que no comienzan por `.` se interpretan como importaciones absolutas. Al utilizar `from math import gcd`, se importa la función `gcd` de la biblioteca estándar.

| Python 2               | Python 2 y 3          |
|------------------------|-------------------------|
| `from math import gcd` | `from .math import gcd` |

O, para que resulte más fácil de leer:

| Python 2               | Python 2 y 3                   |
|------------------------|----------------------------------|
| `from math import gcd` | `from mypackage.math import gcd` |

### Iteradores

Varias funciones de Python 2 que devuelven listas también devuelven iteradores en Python 3. Por ejemplo, `map`, `filter` y `zip`.

La solución más sencilla para preservar el comportamiento de Python 2 es incluir estas funciones con una invocación a `list`:

| Python 2                         | Python 2 y 3                         |
|----------------------------------|----------------------------------------|
| `map(myfunction, myiterable)`    | `list(map(myfunction, myiterable))`    |
| `filter(myfunction, myiterable)` | `list(filter(myfunction, myiterable))` |
| `zip(myiterable1, myiterable2)`  | `list(zip(myiterable1, myiterable2))`  |

La función `xrange` se elimina en Python 3; en su lugar, la función `range` devuelve un objeto iterable `range`. Importa `range` con `from six.moves import range`.

Utiliza la función integrada `next` en lugar de invocar el método `next`. Por ejemplo, reescribe `iterator.next()` como `next(iterator)`.

## Leer más

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/compatibility_check
[2]: https://portingguide.readthedocs.io/en/latest/tools.html#automated-checker-pylint-py3k
[3]: https://pip.pypa.io/en/stable/installing
[4]: https://docs.python.org/3.1/library/2to3.html
[5]: https://www.jetbrains.com/help/pycharm/install-and-set-up-pycharm.html
[6]: https://code.visualstudio.com/docs/setup/setup-overview
[7]: https://six.readthedocs.io
[8]: https://nedbatchelder.com/text/unipain.html