---
dependencies: []
disable_edit: true
title: finally 블록에서 break이나 continue 사용하지 않기
---
## 메타데이터
**ID:** `python-best-practices/finally-no-break-continue-return`

**언어:** 파이썬(Python)

**심각도:**경고

**범주:** 모범 사례

## 설명
`finally` 블록에서 `return`, `break` 또는 `continue`을 사용하면 `try`, `else` 또는 `except` 블록에 넣은 예외의 확산을 막고 반환 문을 무시합니다.

[공식 파이썬(Python) 설명서](https://docs.python.org/3/reference/compound_stmts.html#except)에서 자세히 알아보세요.

## 비준수 코드 예
```python
try:
    client_obj.get_url(url)
except (URLError, ValueError):
    client_obj.remove_url(url)
except SocketTimeout:
    client_obj.handle_url_timeout(url)
finally:
    break  # avoid break in the finally block
```

```python
try:
    client_obj.get_url(url)
except (URLError, ValueError):
    client_obj.remove_url(url)
except SocketTimeout:
    client_obj.handle_url_timeout(url)
finally:
    return 0  # avoid return in the finally block
```

```python
try:
    client_obj.get_url(url)
except (URLError, ValueError):
    client_obj.remove_url(url)
except SocketTimeout:
    client_obj.handle_url_timeout(url)
finally:
    continue  # avoid continue in the finally block
```

## 준수 코드 예
```python
try:
  client_obj.get_url(url)
except (URLError, ValueError):
  client_obj.remove_url(url)
except SocketTimeout:
  client_obj.handle_url_timeout(url)
finally:
  print("cleanup the mess")
```