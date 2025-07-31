---
code_lang: php
code_lang_weight: 40
title: PHP 互換性要件
type: multi-code-lang
---

## Application Security capabilities support

指定されたトレーサーバージョンに対して、PHP ライブラリでサポートされるアプリケーションセキュリティ機能は以下のとおりです:

| アプリケーションセキュリティ機能                   | PHP トレーサーの最小バージョン |
| -------------------------------- |----------------------------|
| Threat Detection | 0.84.0                     |
| Threat Protection  | 0.86.0                     |
| ブロックされたリクエストへの対応をカスタマイズする | 0.86.0 |
| Software Composition Analysis (SCA) | 0.90.0              |
| コードセキュリティ        | 非対応              |
| ユーザーアクティビティイベントの自動追跡 | 0.89.0                     |
| API セキュリティ | 0.98.0 |

PHP でサポートされるすべての ASM 機能を得るためのトレーサーの最小バージョンは 0.98.0 です。


<div class="alert alert-info">サポートされていない機能のサポート追加を希望される場合は、お知らせください！<a href="https://forms.gle/gHrxGQMEnAobukfn7">この短いフォーム</a>に必要事項を記入して、詳細を送信してください。</div>

### サポートされるデプロイメントタイプ
| タイプ        | Threat Detection のサポート | Software Composition Analysis |
|-------------|--------------------------|-------------------------------|
| Docker      | {{< X >}}                | {{< X >}}                     |
| Kubernetes  | {{< X >}}                | {{< X >}}                     |
| Amazon ECS  | {{< X >}}                | {{< X >}}                     |
| AWS Fargate |                          |                               |
| AWS Lambda  |                          |                               |

## 言語とフレームワークの互換性

<div class="alert alert-info">
<strong>注:</strong>
PHP の <a href="https://www.php.net/supported-versions">公式サポートバージョン</a>、特に 8.0、8.1、8.2 の使用を推奨します。
</div>

| PHP バージョン    | サポートレベル                         | パッケージバージョン |
|:---------------|:--------------------------------------|:----------------|
| 8.3.x          | 一般提供                  | > `0.95.0+`     |
| 8.2.x          | 一般提供                  | > `0.82.0+`     |
| 8.1.x          | 一般提供                  | > `0.66.0+`     |
| 8.0.x          | 一般提供                  | > `0.52.0+`     |
| 7.4.x          | 一般提供                  | All             |
| 7.3.x          | 一般提供                  | All             |
| 7.2.x          | 一般提供                  | All             |
| 7.1.x          | 一般提供                  | All             |
| 7.0.x          | 一般提供                  | All             |

PHP 用 Application Security 機能がサポートする SAPI は次のとおりです:

| SAPI           | サポートの種類    |
|:---------------|:----------------|
| apache2handler | 完全対応 |
| cli            | 完全対応 |
| fpm-fcgi       | 完全対応 |
| cgi-fcgi       | 完全対応 |

## 対応プロセッサアーキテクチャー

PHP 用 Application Security 機能がサポートするアーキテクチャは次のとおりです:

| プロセッサアーキテクチャー                   | サポートレベル         | パッケージバージョン                        |
| ------------------------------------------|-----------------------|----------------------------------------|
| Linux GNU amd64 (`x86-64-linux-gnu`)      | GA                    | All                                    |
| Linux MUSL amd64 (`x86-64-linux-musl`)    | GA                    | All                                    |
| Linux GNU arm64 (aarch64-linux-gnu)       | GA                    | > `0.95.0`                             |
| Linux MUSL arm64 (aarch64-linux-musl)     | GA                    | > `0.95.0`                             |

Datadog PHP ライブラリは、以下のアーキテクチャの PHP バージョン 7.0 以降をサポートしています。

- Linux (GNU) x86-64 および arm64
- Alpine Linux (musl) x86-64 および arm64

ライブラリはすべての PHP フレームワークの使用をサポートし、またフレームワークなしの使用も可能です。


### Web フレームワークの互換性

- 攻撃元の HTTP リクエストの詳細
- HTTP リクエスト用のタグ (ステータスコード、メソッドなど)
- アプリケーション内の攻撃フローを確認するための分散型トレーシング

##### アプリケーションセキュリティ機能に関する注意事項
- **Software Composition Analysis** はサポートされていません
- **Code Security** はサポートされていません

以下のフレームワークは Application Security によって直接インスツルメントされていませんが、ランタイムインスツルメンテーションによって間接的にサポートされています。

| フレームワーク                | バージョン    | Threat Detection のサポートの有無 | Threat Protection のサポートの有無 |
| ------------------------ | ----------- | --------------- | ---------------------------------------------- |
| CakePHP       | 2.x       |  {{< X >}} | {{< X >}} |
| CodeIgniter   | 2.x       |  {{< X >}} | {{< X >}} |
| FuelPHP       | 1.1        |  {{< X >}} | {{< X >}} |
| Laravel       | 4.2、5.x、6.x        | {{< X >}} | {{< X >}} |
| Laravel 8     | 8.x (トレーサー 0.52.0+) | {{< X >}} | {{< X >}} |
| Lumen         | 1.9-2.29    |  {{< X >}} | {{< X >}} |
| Magento       |  3.8+       |  {{< X >}} | {{< X >}} |
| Neos Flow     |  3.0.x      |  {{< X >}} | {{< X >}} |
| Phalcon       | 3.1+        |  {{< X >}} | {{< X >}} |
| Slim          | 3.1+        |  {{< X >}} | {{< X >}} |
| Symfony 3     | 3.1+        |  {{< X >}} | {{< X >}} |
| Symfony 4     | 3.1+        |  {{< X >}} | {{< X >}} |
| Symfony 5     | 3.1+        |  {{< X >}} | {{< X >}} |
| Wordpress     | 3.1+        |  {{< X >}} | {{< X >}} |
| Yii           | 3.1+        |  {{< X >}} | {{< X >}} |
| Zend          | 3.1+        |  {{< X >}} | {{< X >}} |
| Symfony 3     | 3.1+        |  {{< X >}} | {{< X >}} |
| RoadRunner    | 2.x         |  {{< X >}} | {{< X >}} |


### データストアの互換性

**データストアのトレーシングでは以下の確認が可能です**

- SQL 攻撃の検知
- クエリ情報 (サニタイジングされたクエリ文字列など)
- エラーとスタックトレースの取得

##### アプリケーションセキュリティ機能に関する注意事項
- **Software Composition Analysis** はサポートされていません
- **Code Security** はサポートされていません
- **Threat Protection** は HTTP リクエスト (input) レイヤーでも機能するため、下表に掲載されていなくても、デフォルトですべてのデータベースで機能します。

| フレームワーク         | バージョン | Threat Detection のサポートの有無    | Threat Protection のサポートの有無|
|-------------------|-----------------|-----------------|---------------|
| Amazon RDS        | サポートされているすべての PHP | {{< X >}}  |   {{< X >}} |
| Eloquent       | Laravel 対応バージョン | {{< X >}} | {{< X >}} |
| Memcached        | サポートされているすべての PHP |   {{< X >}}    | {{< X >}} |
| MySQLi        | サポートされているすべての PHP | {{< X >}} | {{< X >}} |
| PDO        | サポートされているすべての PHP| {{< X >}}| {{< X >}} |
| PHPRedis        | 3、4、5 |   {{< X >}}    | {{< X >}} |
| Predis        | 1.1 | {{< X >}} |   {{< X >}}    |

### User Authentication Frameworks の互換性

**User Authentication Frameworks へのインテグレーションは以下を提供します。**

- ユーザー ID を含むユーザーログインイベント
- ユーザーログインイベントのアカウント乗っ取り検出モニタリング

| フレームワーク | フレームワークの最小バージョン |
|-----------|---------------------------|
| Laravel   | 4.2                       |
| Symfony   | 3.3                       |
| Wordpress | 4.8                       |

[1]: /ja/tracing/trace_collection/compatibility/php/
[2]: /ja/agent/remote_config/#enabling-remote-configuration