---
dependencies: []
disable_edit: true
title: JSON 出力には、json.dumps の代わりに jsonify を使う
---
## メタデータ
**ID:** `python-flask/use-jsonify`

**言語:** Python

**重大度:** Notice

**カテゴリー:** ベストプラクティス

## 説明
flask フレームワークでは、 `jsonify` を使って JSON データを返す API エンドポイントを書くことができます。

#### 詳細はこちら

 - [Python Flask: `jsonify()`](https://flask.palletsprojects.com/en/2.3.x/api/#flask.json.jsonify)



## 非準拠コードの例
```python
@app.route("/article")
def get_article():
    article = get_article_by_id(request.args.get("id"))
    return json.dumps(article) # json.dumps の代わりに flask.jsonify を使用します
```

## 準拠コードの例
```python
from flask import jsonify

@app.route("/article")
def get_article():
    article = get_article_by_id(request.args.get("id"))
    return jsonify(article)
```