すでにレガシー Oracle インテグレーションがインストールされている場合、ユーザーはすでに存在するので、この手順は省略できます。

サーバーに接続するための読み取り専用ログインを作成し、必要な権限を付与します。

```SQL
CREATE USER datadog IDENTIFIED BY <YOUR_PASSWORD>;
```