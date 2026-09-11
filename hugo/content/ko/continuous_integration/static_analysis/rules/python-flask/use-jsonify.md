---
dependencies: []
disable_edit: true
title: JSON 출력에 json.dumps 대신 jsonify 사용하기
---
## 메타데이터
**ID:** `python-flask/use-jsonify`

**언어:** 파이썬(Python)

**심각도:** 알림

**범주:** 모범 사례

## 설명
플라스크 프레임워크와 함께 `jsonify`는 JSON 데이터를 반환하는 API 엔드포인트를 작성하는 데 도움이 됩니다.

#### 자세히 알아보기

 - [Python Flask: `jsonify()`](https://flask.palletsprojects.com/en/2.3.x/api/#flask.json.jsonify)



## 규정 비준수 코드 예
```python
@app.route("/article")
def get_article():
    article = get_article_by_id(request.args.get("id"))
    return json.dumps(article) # json.dumps 대신 flask.jsonify를 사용하세요.
```

## 규정 준수 코드 예
```python
from flask import jsonify

@app.route("/article")
def get_article():
    article = get_article_by_id(request.args.get("id"))
    return jsonify(article)
```