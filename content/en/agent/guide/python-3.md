---
title: Python 3 Custom Check Migration
kind: guide
---

## Overview

This guide provides information and best practices on migrating checks between Python 2 and 3. Use Datadog's [Custom Check Compatibility][1] tool to see whether your custom checks are compatible with Python 3 or need to be migrated.

To provide flexibility in allowing code to run multiple on versions of the Agent, this guide focuses on retaining backwards compatibility.

## Agent configuration

Starting with v6.14.0, the Agent integrates both Python 2 and Python 3 runtimes. This means that Agent Checks can be run either with Python 2 or Python 3, depending on the Agent configuration.

By default, the Agent v6 uses the Python 2 runtime. To switch to the Python 3 runtime:

1. Set the `python_version` configuration option [in your `datadog.yaml` configuration file][2]:

```yaml
python_version: 3
```

2. [Restart the Agent][3].

Alternatively, the `DD_PYTHON_VERSION` environment variable can be set to `2` or `3` to choose which Python runtime is used. If it is set, the `python_version` option in `datadog.yaml` is ignored.

This is an Agent-wide configuration option: **all Python checks launched by an Agent use the same Python runtime**.

### Containerized Agent

The official Containerized Agent images only include one of the two Python runtimes. To switch to one of the other runtime, choose the appropriate Agent image:

* **Python 2** runtime: Agent v6 images have the following format: `datadog/agent:<AGENT_VERSION>`, or `datadog/agent:<AGENT_VERSION>-jmx` for images supporting JMX checks.
* **Python 3** runtime: Agent v6 images have the following format: `datadog/agent:<AGENT_VERSION>-py3`, or `datadog/agent:<AGENT_VERSION>-py3-jmx` for images supporting JMX checks.

For example, for the Containerized Agent v6.14.0, select the `datadog/agent:6.14.0` or `datadog/agent:6.14.0-jmx` images to use the default Python runtime (Python 2), and select the `datadog/agent:6.14.0-py3` or `datadog/agent:6.14.0-py3-jmx` images to use the Python 3 runtime.

## Editors and Tools

### ddev

The Datadog developer package,`ddev`, contains functions to help you [verify that your custom checks are compatible with Python 3][4].

#### Installation

Start by installing the developer toolkit:
```bash
$ pip install "datadog-checks-dev[cli]"
```

#### Usage

Run the `validate` command to verify that your custom check or integration runs on Python 3. Replace `CHECK` with a valid path to a Python module or package folder:

```bash
$ ddev validate py3 [OPTIONS] CHECK
```

For example:

```bash
$ ddev validate py3 ~/dev/my-check.py
Validating python3 compatibility of ~/dev/my-check.py...
Incompatibilities were found for ~/dev/my-check.py:
File ~/dev/my-check.py:
  Line 2, column 0: print statement used
  Line 834, column 21: division w/o __future__ statement
  Line 850, column 25: division w/o __future__ statement
```

After addressing the incompatibilities, the same command returns:

```bash
$ ddev validate py3 ~/dev/my-check.py
Validating python3 compatibility of ~/dev/my-check.py…
~/dev/foo.py is compatible with python3
```

While `ddev` catches any issue that could prevent the Python 3 interpreter from running code at all, it cannot check for logical validity. After code changes are made, make sure to run the check and validate the output.

For more details about ddev, refer to the [ddev documentation][5].

### 2to3

[2to3][6] converts Python 2 code to Python 3 code. If you have a custom check that is named `foo.py`, run 2to3:


```bash
$ 2to3 foo.py
```

Running 2to3 prints a diff against the original source file. For more details about 2to3, refer to the official [2to3 documentation][6].

### Editors

Most modern IDEs and editors provide advanced linting automatically. Make sure that they are pointed to a Python 3 executable, so that when you open a legacy Python 2–only file, any linting errors or warnings show up on the side as a colorful tick in [PyCharm][7] or as a clickable box on the bottom in [Visual Studio Code][8].

## Python Migration

### Package Imports

To standardize Datadog package namespacing, with Python3, all resources live under the base subpackage. For example:

```python
from datadog_checks.checks import AgentCheck
```

becomes

```python
from datadog_checks.base.checks import AgentCheck
```

### Six

[Six][9] is a Python 2/3 compatibility library intended to allow developers to ship Python code that works in both Python 2 and Python3. Some of the examples below make use of six to make legacy Python 2 code compatible with Python 3.

### Dictionary methods

In Python 3, the `dict.iterkeys()`, `dict.iteritems()` and `dict.itervalues()` methods are not available.

| Python 2                                                         | Python 2 and 3                                                                                         |
|------------------------------------------------------------------|--------------------------------------------------------------------------------------------------------|
| `for key in mydict.iterkeys():` <br/> &nbsp;&nbsp;`  ...`        | `for key in mydict:`<br/> &nbsp;&nbsp;`  ...`                                                          |
| `for key, value in mydict.iteritems():`<br/> &nbsp;&nbsp;`  ...` | `from six import iteritems` <br/><br/> `for key, value in iteritems(mydict):`<br/> &nbsp;&nbsp;`  ...` |
| `for value in mydict.itervalues():`<br/> &nbsp;&nbsp;`  ...`     | `from six import itervalues` <br/><br/> `for value in itervalues(mydict):`<br/> &nbsp;&nbsp;`  ...`    |

Also, in Python 3, the `dict.keys()`, `dict.items()`, `dict.values()` methods return iterators. Therefore, if the dictionary needs to be modified during iteration, make a copy first. To retrieve a dictionary’s keys/items/values as a list:

| Python 2                        | Python 2 and 3                       |
|---------------------------------|--------------------------------------|
| `mykeylist = mydict.keys()`     | `mykeylist = list(mydict)`           |
| `myitemlist = mydict.items()`   | `myitemlist = list(mydict.items())`  |
| `myvaluelist = mydict.values()` | `myvaluelist = list(mydict.values()` |

The `dict.has_key()` method is deprecated in Python 2 and is removed in Python 3. Use the `in` operator instead.

| Python 2                             | Python 2 and 3  |
|--------------------------------------|-----------------|
| `mydict.has_key('foo') //deprecated` | `foo in mydict` |

### Standard Library Changes

Python 3 features a reorganized standard library, where a number of modules and functions were renamed or moved. Importing moved modules through `six.moves` works on both Python versions.

| Python 2            | Python 3             | Python 2 and 3                      |
|---------------------|----------------------|-------------------------------------|
| `import HTMLParser` | `import html.parser` | `from six.moves import html_parser` |

Consult the [six documentation][10] for the list of renamed modules. Note that the `urllib`, `urllib2`, and `urlparse` modules have been heavily reorganized.

### Unicode

Python 2 treats Unicode text and binary-encoded data the same, and tries to automatically convert between bytes and strings. This works as long as all characters are ASCII, but leads to unexpected behavior when it encounters non-ASCII characters.

| type    | literal | Python 2 | Python 3 |
|---------|---------|----------|----------|
| bytes   | b'...'  | binary   | binary   |
| str     | '...'   | binary   | text     |
| unicode | u'...'  | text     | text     |

Text data is Unicode code points; you must encode with `.encode(encoding)` for storage or transmission. Binary data is encoded code points represented as a sequence of bytes that must be decoded with `.decode(encoding)` back to text. When reading text from a file, the `open` function from the `io` package is handy because the data read is already decoded into Unicode:

```python
from io import open

f = open('textfile.txt', encoding='utf-8')
contents = f.read()  # contents will be decoded to unicode using ‘utf-8’; these are not bytes!
```

Consult Ned Batchelder’s [Pragmatic Unicode][11] for further details.

### Print

In Python 3, print is explicitly treated as a function; to turn print into a function regardless of the Python version, put `from __future__ import print_function` at the top of any file using the old print statement and add parentheses to perform the function call.

| Python 2      | Python 2 and 3                                                    |
|---------------|-------------------------------------------------------------------|
| `print "foo"` | `from __future__ import print_function` <br/><br/> `print("foo")` |


### Integer Division

In Python 2, the `/` operator performs floor division on integers.

#### Python 2:

```
>> 5/2
2
```

In Python 3, the `/` operator performs float division. The `//` operator performs floor division.

#### Python 3:

```
>> 5/2
2.5
>> 5//2
2
```

To replicate the same behavior of Python 3 regardless of the Python version, put `from __future__ import division` at the top of any file that uses division and use `//` for flooring division results.

### Rounding

In Python 2 the standard library round method uses the Round Half Up Strategy while Python 3 uses the Round To Even strategy.

#### Python 2:

```
>> round(2.5)
3
>> round(3.5)
4
```

#### Python 3:

```
>> round(2.5)
2
>> round(3.5)
4
```

Datadog provides a utility function, `round_value`, in `datadog_checks_base` to allow the replication of the Python 2 behavior in both Python 2 and 3.

### Exceptions

Python 3 features different syntax for except and raise.

| Python 2                                                                                     | Python 2 and 3                                                                                 |
|----------------------------------------------------------------------------------------------|------------------------------------------------------------------------------------------------|
| `try:` <br/> &nbsp;&nbsp; `...` <br/> `except Exception, variable:` <br/> &nbsp;&nbsp; `...` | `try:` <br/> &nbsp;&nbsp; `...` <br/> `except Exception as variable:` <br/> &nbsp;&nbsp; `...` |
| `raise Exception, args`                                                                      | `raise Exception(args)`                                                                        |


### Relative Imports

In Python 3, relative imports must be made explicit, using the dot (`.`) syntax.

Suppose your package is structured like this:

```
mypackage/
	__init__.py
	math.py
	foo.py
```

Suppose also that `math.py` contains a function called `gcd`—which contains subtleties distinct from the standard library `math` module’s `gcd` function—and you want to use the `gcd` function from your local package, not the one from the standard library.

In Python 2, if you are inside a package, this package’s own modules take precedence before global modules. Using `from math import gcd` imports the `gcd` from `mypackage/math.py`.

In Python 3, import forms not starting with `.` are interpreted as absolute imports. Using `from math import gcd` imports the `gcd` from the standard library.

| Python 2               | Python 2 and 3          |
|------------------------|-------------------------|
| `from math import gcd` | `from .math import gcd` |

Or, for extra readability:

| Python 2               | Python 2 and 3                   |
|------------------------|----------------------------------|
| `from math import gcd` | `from mypackage.math import gcd` |


### Iterators

Several functions in Python 2 that return lists now return iterators in Python 3. These include `map`, `filter`, and `zip`.

The simplest fix to retain Python 2 behavior is to wrap these functions with a call to `list`:

| Python 2                         | Python 2 and 3                         |
|----------------------------------|----------------------------------------|
| `map(myfunction, myiterable)`    | `list(map(myfunction, myiterable))`    |
| `filter(myfunction, myiterable)` | `list(filter(myfunction, myiterable))` |
| `zip(myiterable1, myiterable2)`  | `list(zip(myiterable1, myiterable2))`  |

The `xrange` function is removed in Python 3; instead, the `range` function returns an iterable `range` object. Import `range` with `from six.moves import range`.

Use the built-in `next` function instead of calling the `next` method. For instance, rewrite `iterator.next()` as `next(iterator)`.


[1]: https://app.datadoghq.com/compatibility_check
[2]: /agent/guide/agent-configuration-files/?tab=agentv6#agent-main-configuration-file
[3]: /agent/guide/agent-commands/?tab=agentv6#restart-the-agent
[4]: /developers/integrations/new_check_howto/#building
[5]: https://datadog-checks-base.readthedocs.io/en/latest/datadog_checks_dev.cli.html
[6]: https://docs.python.org/3.1/library/2to3.html
[7]: https://www.jetbrains.com/help/pycharm/install-and-set-up-pycharm.html
[8]: https://code.visualstudio.com/docs/setup/setup-overview
[9]: https://pythonhosted.org/six/#
[10]: https://six.readthedocs.io
[11]: https://nedbatchelder.com/text/unipain.html
