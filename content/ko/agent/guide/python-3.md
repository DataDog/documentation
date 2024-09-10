---
further_reading:
- link: /agent/versions/upgrade_to_agent_v7/
  tag: 설명서
  text: Agent v7로 업그레이드
- link: /agent/guide/agent-v6-python-3/
  tag: 설명서
  text: 파이썬(Python) 3과 Datadog Agent v6 사용하기
title: 파이썬(Python) 3 커스텀 점검 마이그레이션
---

<div class="alert alert-info">
Agent v7 이상의 버전만 파이썬(Python) 3 커스텀 점검 실행을 기본 설정으로 지원합니다. 파이썬 3 커스텀 점검을 네이티브로 실행하려면 <a href="/agent/versions/upgrade_to_agent_v7">최신 버전의 Agent로 업그레이드해주세요.</a> Agent를 업그레이드하지 않고 커스텀 점검 실행을 테스트할 경우 Agent v6.14 이상 버전의 <a href="/agent/guide/agent-v6-python-3">파이썬 3 런타임을 활성화</a>하세요.
</div>

## 개요

본 가이드에는 파이썬 2에서 파이썬 3으로의 점검 마이그레이션에 관한 정보와 모범 사례를 안내해드립니다. Datadog의 [커스텀 점검 호환성][1] 도구를 사용하여 이용 중인 커스텀 점검이 파이썬 3과 호환되는지, 마이그레이션이 필요한지 확인하시기 바랍니다.

여러 Agent 버전에서 코드를 유연하게 실행할 수 있도록, 본 가이드에서는 하위 호환성 유지에 중점을 두고 있습니다.

## 편집기와 도구

### Pylint

Pylint에는 [커스텀 점검과 파이썬 3의 호환성을 검증][2]할 수 있는 기능이 포함되어 있습니다.

#### 설치

파이썬 2에 [pip][3]을 설치하는 단계부터 시작하겠습니다.

```bash
$ python2 -m pip install pylint
```

파이썬 2 명령해석기(인터프리터) 경로가 다른 경우 위의 명령어에서 `python2`를 수정하세요.

#### 사용법

`pylint` 명령어를 실행해 파이썬 3에서 실행하는 커스텀 점검이나 통합을 검증하세요. 이때 `CHECK`를 파이썬 모듈이나 패키지 폴더의 유효한 경로로 수정합니다.

```bash
$ python2 -m pylint -sn --py3k CHECK
```

예를 들면 다음과 같습니다.

```bash
$ python2 -m pylint -sn --py3k ~/dev/my-check.py
************* Module my-check
E:  4, 4: print statement used (print-statement)
W:  7,22: Calling a dict.iter*() method (dict-iter-method)
W:  9, 8: division w/o __future__ statement (old-division)
```

호환성 문제를 해결한 후에는 동일한 명령어를 사용해도 아무것도 반환되지 않습니다.

```bash
$ python2 -m pylint -sn --py3k ~/dev/my-check.py
$ 
```

`pylint`는 파이썬 3 인터프리터의 코드 실행을 막는 문제를 감지하지만, 로직의 타당성은 검증할 수 없습니다. 코드를 변경한 후에는 반드시 점검을 실행하고 출력값을 확인하세요.

### 2to3

[2to3][4]은 파이썬 2 코드를 파이썬 3 코드로 변환해줍니다. `foo.py`라는 이름의 커스텀 점검이 있다면 2to3을 실행하세요.

```bash
$ 2to3 foo.py
```

2to3를 실행하면 원래 소스 파일과의 차이가 표시됩니다. 2to3에 대한 자세한 정보는 공식 [2to3 설명서][4]를 참조하시기 바랍니다.

### 편집기

최신 IDE 및 편집기에서는 자동으로 고급 린트(lint)가 실행됩니다. 린트가 실행 가능한 파이썬 3을 참조하는지 확인하세요. 이렇게 하면 파이썬 2 전용 레거시 파일을 열었을 때 린팅(linting) 오류나 경고가 [PyCharm][5] 옆쪽에 다채로운 색의 체크로 나타나거나 [Visual Studio Code][6] 하단에 클릭형 상자로 표시됩니다.

## 파이썬 마이그레이션

### 패키지 가져오기

파이썬 3에서 Datadog 패키지의 네임스페이스를 표준화하려면 모든 리소스가 베이스 서브패키지 아래에 존재해야 합니다. 예를 들면 다음과 같습니다.

```python
from datadog_checks.checks import AgentCheck
```

가 다음과 같아집니다.

```python
from datadog_checks.base.checks import AgentCheck
```

### Six

[Six][7]는 파이썬 2와 파이썬 3 양쪽에서 작동하는 파이썬 코드를 개발자가 사용할 수 있도록 지원하며 쌍방 호환되는 라이브러리입니다. Six를 사용해 파이썬 2의 레거시 코드를 파이썬 3과 호환되는 코드로 변환한 예시를 몇 가지 보여드리겠습니다.

### 딕셔너리 메소드

파이썬 3에서 `dict.iterkeys()`, `dict.iteritems()`, `dict.itervalues()` 메소드는 사용할 수 없습니다.

| 파이썬 2                                                         | 파이썬 2와 3                                                                                         |
|------------------------------------------------------------------|--------------------------------------------------------------------------------------------------------|
| `for key in mydict.iterkeys():` <br/> &nbsp;&nbsp;`  ...`        | `for key in mydict:`<br/> &nbsp;&nbsp;`  ...`                                                          |
| `for key, value in mydict.iteritems():`<br/> &nbsp;&nbsp;`  ...` | `from six import iteritems` <br/><br/> `for key, value in iteritems(mydict):`<br/> &nbsp;&nbsp;`  ...` |
| `for value in mydict.itervalues():`<br/> &nbsp;&nbsp;`  ...`     | `from six import itervalues` <br/><br/> `for value in itervalues(mydict):`<br/> &nbsp;&nbsp;`  ...`    |

또한 파이썬 3에서 `dict.keys()`, `dict.items()`, `dict.values()` 메소드는 이터레이터(iterator)를 반환합니다. 따라서 딕셔너리를 이터레이션(iteration) 중에 수정해야 하는 경우 먼저 내용을 복사하시기 바랍니다. 딕셔너리 키/아이템/값을 목록으로 가져오는 방법은 다음과 같습니다.

| 파이썬 2                        | 파이썬 2와 3                       |
|---------------------------------|--------------------------------------|
| `mykeylist = mydict.keys()`     | `mykeylist = list(mydict)`           |
| `myitemlist = mydict.items()`   | `myitemlist = list(mydict.items())`  |
| `myvaluelist = mydict.values()` | `myvaluelist = list(mydict.values()` |

`dict.has_key()` 메소드는 파이썬 2에서 지원이 중단될 예정이며 파이썬 3에서는 삭제되었습니다. `in` 연산자(operator)를 대신 사용하세요.

| 파이썬 2                             | 파이썬 2와 3  |
|--------------------------------------|-----------------|
| `mydict.has_key('foo') //deprecated` | `foo in mydict` |

### 표준 라이브러리 변경

파이썬 3에는 재편성된 표준 라이브러리 기능이 있으며, 이를 통해 일부 모듈이나 함수의 명칭이 바뀌거나 이동되었습니다. 파이썬 두 버전 모두에서 `six.moves`로 이동된 모듈을 불러올 수 있습니다.

| 파이썬 2            | 파이썬 3             | 파이썬 2와 3                      |
|---------------------|----------------------|-------------------------------------|
| `import HTMLParser` | `import html.parser` | `from six.moves import html_parser` |

이름이 변경된 모듈 목록은 [Six 설명서][7]에서 찾아보실 수 있습니다. **참조**: `urllib` ,`urllib2` ,`urlparse` 모듈은 대폭 재구성되었으니 유의하세요.

### 유니코드

파이썬 2는 유니코드 텍스트와 바이너리 인코딩 데이터를 동일하게 취급하며 바이트와 스트링 간의 자동 변환을 시도합니다. 모든 문자가 ASCII 문자인 경우에는 문제 없이 작동하지만, ASCII 문자가 아닌 문자가 있는 경우에는 예상하지 못한 방향으로 작동합니다.

| 타입    | 리터럴 | 파이썬 2 | 파이썬 3 |
|---------|---------|----------|----------|
| 바이트   | b'...'  | 바이너리   | 바이너리   |
| 스트링     | '...'   | 바이너리   | 텍스트     |
| 유니코드 | u'...'  | 텍스트     | 텍스트     |

텍스트 데이터는 유니코드 코드 포인트입니다. 데이터를 저장하거나 전송하려면 `.encode(encoding)`를 사용하여 인코딩해야 합니다. 이진 데이터는 바이트 시퀀스로 표현되는 인코딩 코드 포인트입니다. 텍스트로 되돌리려면 `.decode(encoding)`를 사용하여 바이트 시퀀스를 디코딩해야 합니다. 파일에서 텍스트를 읽어낼 때는 `io` 패키지의 `open` 함수가 편리합니다. 데이터 판독은 이미 유니코드에 디코딩되어 있기 때문입니다.

```python
from io import open

f = open('textfile.txt', encoding='utf-8')
contents = f.read()  # contents will be decoded to unicode using ‘utf-8’; these are not bytes!
```

자세한 정보는 Ned Batchelder의 [Pragmatic Unicode][8]를 참조하세요.

### 출력

파이썬 3에서는 출력(print)는 명확하게 함수로 취급되고 있습니다. 어느 파이썬 버전을 사용하든, 출력을 함수로 만들려면 구 버전의 출력문을 사용하여 `from __future__ import print_function`을 파일의 맨 앞에 기술하고 괄호를 추가하여 함수 호출을 실행해야 합니다.

| 파이썬 2      | 파이썬 2와 3                                                    |
|---------------|-------------------------------------------------------------------|
| `print "foo"` | `from __future__ import print_function` <br/><br/> `print("foo")` |

### 정수 나눗셈

파이썬 2에서는 `/` 연산자가 정수 버림나눗셈(floor division)을 실행합니다.

#### 파이썬 2

```python
>> 5/2
2
```

파이썬 3에서는 `/` 연산자가 올림나눗셈(float division)을 실행합니다. `//` 연산자는 버림나눗셈을 실행합니다.

#### 파이썬 3

```python
>> 5/2
2.5
>> 5//2
2
```

어느 버전을 사용하든 파이썬 3의 작동을 동일하게 재현하려면, 나눗셈을 사용하는 파일의 선두에 `from __future__ import division`을 기술하고 `//`를 사용하여 버림나눗셈 결과를 도출하면 됩니다.

### 반올림

파이썬 2에서 표준 라이브러리 라운드(round) 메소드는 반올림(Round Half Up) 전략을 사용하는 반면, 파이썬 3은 짝수 지향 반올림(Round To Even) 전략을 사용합니다.

#### 파이썬 2

```python
>> round(2.5)
3
>> round(3.5)
4
```

#### 파이썬 3

```python
>> round(2.5)
2
>> round(3.5)
4
```

Datadog는 파이썬 2의 작동을 파이썬 2와 3 모두에서 재현할 수 있도록 `datadog_checks_base`에서 유틸리티 함수 `round_value`를 지원합니다.

### 예외

파이썬 3에서는 except와 raise에 다른 구문을 사용합니다.

| 파이썬 2                                                                                     | 파이썬 2와 3                                                                                 |
|----------------------------------------------------------------------------------------------|------------------------------------------------------------------------------------------------|
| `try:` <br/> &nbsp;&nbsp; `...` <br/> `except Exception, variable:` <br/> &nbsp;&nbsp; `...` | `try:` <br/> &nbsp;&nbsp; `...` <br/> `except Exception as variable:` <br/> &nbsp;&nbsp; `...` |
| `raise Exception, args`                                                                      | `raise Exception(args)`                                                                        |

### 상대 불러오기

파이썬 3에서는 마침표(`.`)를 사용한 구문으로 불러올 상대를 명시해야 합니다.

패키지가 다음과 같은 구조라고 생각해봅시다.

```text
mypackage/
    __init__.py
    math.py
    foo.py
```

또한 `math.py`에 `gcd`라 불리는 함수가(표준 라이브러리 `math` 모듈의 `gcd` 함수와는 다소 다른 기능 포함) 포함되며, 표준 라이브러리가 아닌 로컬 패키지의 `gcd` 함수를 사용한다고 가정해보겠습니다.

파이썬 2의 경우, 패키지 내에서는 이 패키지 모듈이 글로벌 패키지보다 우선합니다. `from math import gcd`를 사용하여 `gcd`를 `mypackage/math.py`에서 불러옵니다.

Python 3이 경우 `.`로 시작하지 않는 불러오기 형식은 절대 임포트(absolute import)로 간주합니다. `from math import gcd`를 사용하여 표준 라이브러리에서 `gcd`를 불러옵니다.

| 파이썬 2               | 파이썬 2와 3          |
|------------------------|-------------------------|
| `from math import gcd` | `from .math import gcd` |

또는, 가독성을 제고하기 위해:

| 파이썬 2               | 파이썬 2와 3                   |
|------------------------|----------------------------------|
| `from math import gcd` | `from mypackage.math import gcd` |

### 이터레이터(Iterator)

파이썬 2에서 목록을 반환하던 여러 함수는 파이썬 3에서 이터레이터를 반환합니다. 여기에는 `map`, `filter`, `zip`이 포함됩니다.

Python 2의 작동을 유지하는 가장 쉬운 해결책은 `list`에 대한 호출로 이들 함수를 묶는 방법입니다.

| 파이썬 2                         | 파이썬 2와 3                         |
|----------------------------------|----------------------------------------|
| `map(myfunction, myiterable)`    | `list(map(myfunction, myiterable))`    |
| `filter(myfunction, myiterable)` | `list(filter(myfunction, myiterable))` |
| `zip(myiterable1, myiterable2)`  | `list(zip(myiterable1, myiterable2))`  |

`xrange` 함수는 파이썬 3에서 삭제되었습니다. 대신 `range` 함수가 이터레이션 가능한 `range` 객체를 반환합니다. `range`와 `from six.moves import range`를 불러옵니다.

`next` 메소드를 호출하는 대신 기본 `next` 함수를 사용하세요. 예를 들면, `iterator.next()`를 `next(iterator)`로 수정할 수 있습니다.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/compatibility_check
[2]: https://portingguide.readthedocs.io/en/latest/tools.html#automated-checker-pylint-py3k
[3]: https://pip.pypa.io/en/stable/installing
[4]: https://docs.python.org/3.1/library/2to3.html
[5]: https://www.jetbrains.com/help/pycharm/install-and-set-up-pycharm.html
[6]: https://code.visualstudio.com/docs/setup/setup-overview
[7]: https://six.readthedocs.io
[8]: https://nedbatchelder.com/text/unipain.html