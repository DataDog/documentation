---
last_modified: 2015/07/01
translation_status: complete
language: ja
title: Datadog-Github Integration
integration_title: Github
kind: integration
doclevel: complete
---

<!-- ### Overview
{:#int-overview}

Capture GitHub commits in Datadog to:

- Track new features from code changes
- Identify when new code changes lead to system alerts or build failures
- Discuss code changes with your team in the Datadog Event Stream -->

### 概要
{:#int-overview}

次の目的でGitHubのコミット情報をDatadogと連携します:

- ソースコードの変更履歴から、フューチャ追加の追跡をする。
- アラート発生時やビルドの失敗時にソースコードの変更が起因していないかを確認する。
- ソースコードの変更に関し、Datadogのイベントストリーム上でチャットをする。


<!-- ### Configuration
{:#int-configuration}

Select 'Github' [here](https://app.datadoghq.com/account/settings) and link your account.
You can then select which repos you would like to integrate, which branches, and if you'd like to
receive commits and/or issues. -->

### 設定
{:#int-configuration}

Datadogのインテグレーションページで['Github'](https://app.datadoghq.com/account/settings)タイルを選択し、`Configuration`タブから`Sign in with Github`をクリックし、アカウントを設定します。その後リポジトリ、ブランチ、コミットなどの情報を設定します。


<!-- ### What to Expect
Once the integration is complete, whatever you select (commits and/or issues) will populate
into your Datadog Event Stream.

If you view a dashboard, in the top left search bar you can type `sources:github` to see github
events overlayed over your the graphs on that dashboard. -->

### 連携が完了すると

インテグレーションの設定が完了すると、GitHubへのcommitsとissuesのどちらか、または両方のイベントを、Datadogのイベントストリームにも表示することが出来るようになります。

Timeboard上では、左上隅の検索窓で`sources:github`と入力すると、グラフ内にgithubから収集したイベントをピンクの線として、合成して表示することが出来ます。
