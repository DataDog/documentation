---
last_modified: 2015/04/02
translation_status: complete
language: ja
title: メールによるイベント情報の送信
kind: guide
listorder: 15
sidebar:
  nav:
    - header: メールによるイベント送情のガイド
    - text: 概要
      href: "#overview"
    - text: JSON形式 vs 平文形式
      href: "#json-vs-plain"
    - text: メールアドレスの設定
      href: "#setup-address"
    - text: Formatting The JSON Data
      href: "#json-data"
---
<!-- ## Overview {#overview}

When you need to integrate an application or system with Datadog, you have a
few choices. The first is using one of our many existing [integrations][integrations].
This will get you access to a wide variety of metrics and events with minimal
configuration effort on your part. If your application isn't one of the
integrated applications, then you can opt to create [a check using the agent][agentcheck].
This requires much more effort and potentially more knowledge on how the
application and how Datadog work.

There is another option available if you aren't using an application that has
an integration and you don't want to create an agent check. You can rely on
the application or system sending an email instead. There are two different ways
to use Events via Email, depending mostly on whether the application offers you
the ability to customize the format of the email body being sent. -->

## 概要 {#overview}

Datadogの監視下にアプリケーションやシステムを統合する場合には、いくつかの統合方法の選択肢があります。
まず最初の選択肢は、Datadogが提供している[integration][integrations]を利用することです。
これらのIntegrationを使うことによって、最小限の設定作業​で、多種多様なメトリクスやイベントの収集ができるようになります。
もしも、これから使用するアプリケーション用のIntegrationが準備されていなければ、[Datadog Agentを使ってCheckを独自にプログラミング][agentcheck]することも選択できます。
この選択肢は、Integarationを利用するよりは手間を要し、又アプリケーションとDatadog Agent がどのように機能しているかの知識の必要とします。

Datadog Agent のCheckをプログラミングしたくない場合には、更に他の選択肢もあります。
システム又はアプリケーションにメールを送信させることで、Checkの代替わりをさせる選択肢です。
メールによるイベント情報の送信には、アプリケーション内からメールを生成するための自由度により、次の２つの方法が選択できます。


<!-- ## JSON-Formatted vs Plain Text {#json-vs-plain}

If you have complete control over the email sent by the application to Datadog,
then you will probably want to configure a JSON-formatted message to be sent.
This will allow you to set everything in the event that appears in the event
stream. Here are examples of each: -->

## JSON形式 vs 平文形式 {#json-vs-plain}

アプリケーションからDatadogに送信するメールを自由にコントロールできるなら、JSON形式でのメッセージ送信の設定をするとよいでしょう。この形式を使うことによって、イベントストリームに表示されるイベントに必要な情報の全てを送信することができるでしょう。

それぞれの例を以下に紹介します:

<!-- ### Plain Text

#### Source Email

In the source plain text email, you only have three fields you can control: sender
email address, subject, and body.


![Plain Text Email](/static/images/plain-email.png)

#### Datadog Event

![Plain Text Event](/static/images/plain-event.png)


Note that the subject of the email becomes the title of the event and the body
of the email becomes the body of the event. Although it looks like a tag appears
at the end of the title and body of the event, neither instance are actually
tags. The sender of the email also appears at the bottom of the event, so be sure
to take advantage of that to help identify the sending application. -->

### 平文

#### メールの内容

平文でのイベント情報メールの送信では、、3個のフィールドが制御できます:

- 送信者メールアドレス
- 件名
- 本文

![Plain Text Email](/static/images/plain-email.png)

#### イベントストリームでのイベント表示

![Plain Text Event](/static/images/plain-event.png)

メールの件名はイベントのタイトルになり、電子メールの本文はイベントの本体になることに注意してください。
イベントのタイトルと本文の最後にタグが表示されるように見えますが、どちらの部分もDatadogではタグとしては扱われてはいません。
メールの送信者は、イベント欄の一番下の部分に表示されますのでこの部分を有効に活用しアプリケーションの識別に利用するとよいでしょう。


<!-- ### JSON

#### Source Email

In the source JSON-formatted email, you have 10 fields you can control: sender
email address, and up to 9 JSON keys. Those keys are title, text, priority, tags,
alert type,  date happened,  host, aggregation key, and source type name.

![JSON Email](/static/images/json-email.png)

#### Datadog Event

![JSON Event](/static/images/json-event.png)


In a JSON-formatted email, the subject of the email message is irrelevant as it
will be replaced by the title in the JSON in the body of the email. All data that
appears in the event is defined in the JSON in the body of the email. This JSON
must be well-formed or the message will be ignored. This means that not only should
it look correct with commas separating key value pairs, it also must be pure JSON.
If you are testing the email with a standard email client, the body may be converted
to HTML as a convenience to the user. This will cause the JSON to no longer be
JSON and the email will be ignored by Datadog.

The allowable JSON keys can be found in the [events API documentation][eventsapi]. -->

### JSON

#### メールの内容

JSON形式でのイベント情報メールの送信では、10個のフィールドが制御できます。それらは、送信者の電子メールアドレス、および9つのJSONのキー項目です:

- 送信者メールアドレス
- "title" :
- "text" :
- "priority" :
- "tags" :
- "alert type" :
- "date happend" :
- "host" :
- "agrregation key" :
- "source type name" :

![JSON Email](/static/images/json-email.png)

#### イベントストリームでのイベント表示

![JSON Event](/static/images/json-event.png)

JSON形式のメールでは、メールのタイトルは無視され、本文内のtitleで設定した内容に置き換えられます。
イベントに表示されるすべてのデータは、メールの本文にJSONで定義されている必要があります。
メール本文に記述するメッセージは、JSON記法に則って正しく整形されている必要があります。
本文内のJSON記法に問題を発見した場合、そのメールは処理されません。
従って本文内のJSONメッセージでは、キーと値がコンマを使って正しく記述されると同時に、純粋なJSON記法である必要があることを意味しています。

メールクライアントで本文に書き込むJSONメッセージの適合性をテストしている場合は、使用中のクライアントの設定によって、本文がHTMLに変換されていないかを事前に確認してください。このHTML変換が設定されている場合、本文のメッセージはJSON記法ではない形式の文字列に変換され、Datadogではこのメールを処理出来ません。

JSON形式で利用できるキーの詳細は、[events API documentation][eventsapi]で確認することができます。


<!-- ## Setting Up The Email Address {#setup-address}

To set up the email, first log in to your Datadog account at
[https://app.datadoghq.com][dd-app]. From the *Integrations* menu, choose *APIs*,
then scroll down to *Events API Emails*. This section will show you all the emails
available for your applications and who created them. Choose the format for your
messages from the Format: dropdown, then click *Create API Email*.

![JSON Event Email API](/static/images/event-email-api.png) -->

## メールアドレスの設定 {#setup-address}

メールの送信先を設定するには、[Datadogアカウント][dd-app]にログインし、。`Integrations`メニューから`APIs`を選択し、**Events API Emails**のセクションまで移動します。

このセクションでは、Datadogがイベント情報を受信するために用意したメールアドレスと、そのメールアドレスの作成者が表示されています。

![JSON Event Email API](/static/images/event-email-api.png)

新しくメールアドレスを追加する場合は、**New API Email**のセクションで、送信するメールの形式をドロップダウンメニューで選択し、`Create API Email`をクリックします。

![Event Email Set](/static/images/ja-specific/event_email_set.png)


[integrations]: /ja/integrations
[agentcheck]: /ja/guides/agent_checks
[eventsapi]: /ja/api/#events
[dd-app]: https://app.datadoghq.com
