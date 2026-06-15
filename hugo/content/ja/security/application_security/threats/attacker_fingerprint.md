---
disable_toc: false
further_reading:
- link: /security/application_security/security_signals/attacker_clustering
  tag: ドキュメント
  text: Attacker Clustering
title: 攻撃者フィンガープリント
---

このトピックでは、IP アドレスだけに頼らず攻撃者を識別するための **Datadog Attacker Fingerprint** 機能について説明します。

## 概要

Datadog Attacker Fingerprint は、IP アドレスを超えた手掛かりで攻撃者を識別します。サービスで App and API Protection (AAP) を有効にすると、攻撃やログイン試行時に Datadog の攻撃者フィンガープリントが自動的に算出され、トレースに付与されます。

Datadog の攻撃者フィンガープリントは、次のフラグメントで構成されます:
* エンドポイント識別子
* セッション識別子
* ヘッダー識別子
* ネットワーク識別子

各フラグメントは、特定のヘッダーやクエリ / ボディのフィールドを参照し、Cookie 値やクエリ パラメータをハッシュ化することで、リクエストの特徴を特定します。

## 攻撃者フィンガープリント フラグメントの詳細

### エンドポイント識別子

エンドポイント識別子フラグメントは、特定のエンドポイントと、その呼び出しに使われたパラメータに関する情報を提供します。このフラグメントで使用する情報は次のとおりです:
* HTTP メソッド
* リクエスト URI のハッシュ
* クエリ パラメータ フィールドのハッシュ
* ボディ フィールドのハッシュ

### セッション識別子

セッション識別子フラグメントは、セッション情報および認証済みかどうかに基づいてユーザーを追跡します。このフラグメントで使用する情報は次のとおりです:
* ユーザー ID のハッシュ
* Cookie フィールドのハッシュ
* Cookie 値のハッシュ
* セッション ID のハッシュ

これらのフィールドを 1 つも取得できない場合は、有用な情報にならないため、このフラグメントは省略されます。

### ヘッダー識別子

ヘッダー識別子フラグメントは、リクエストで使用されたヘッダーに関する情報を提供します。このフラグメントでは次の情報を使用します:
* 既知のヘッダーの有無: Referer、Connection、Accept-Encoding など
* ユーザー エージェントのハッシュ
* 未知のヘッダー数
* 未知のヘッダーのハッシュ。未知のヘッダー一覧からは、すべての XFF ヘッダー、Cookie、x-datadog ヘッダーを除外します。


### ネットワーク識別子

ネットワーク識別子フラグメントは、リクエストのネットワーク部分に関する情報を提供します。このフラグメントでは次の情報を使用します:
* 呼び出し元がクライアント IP を判定するために参照する XFF ヘッダー内の IP 数
* 既知の XFF ヘッダーがあるかどうか


## 攻撃者フィンガープリントの使い方

目的の fingerprint フィールドで絞り込むことで、フラグメントを AAP Traces explorer のフィルターとして利用できます。例: `@appsec.fingerprint.header.ua_hash:e462fa45` を指定すると、同じユーザー エージェントのハッシュを持つリクエストだけに絞り込めます。

{{< img src="security/application_security/threats/attacker-fingerprint-trace.png" alt="AAP トレースのスクリーンショット (トレースのサイド パネルに攻撃者フィンガープリントを表示)" >}}

攻撃者フィンガープリントは [Attacker Clustering][1] 機能で使用されます。トラフィックのかなりの割合が同じフィンガープリント属性を示す場合、Attacker Clustering で共通の攻撃属性があるものとして表示されます。


## 参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/security/application_security/security_signals/attacker_clustering