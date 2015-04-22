---
last_modified: 2015/04/13
translation_status: translated
language: ja
title: Datadog-Airbrake Integration
integration_title: Airbrake
kind: integration
doclevel: complete
---
<!-- <div id="int-overview">
<h2>Overview</h2>
<p>Connect Airbrake to Datadog to:</p>
<ul>
  <li>See exceptions in the stream, in real time</li>
  <li>Search for exceptions in your graphs</li>
  <li>Discuss exceptions with your team</li>
</ul>
</div> -->

## 概要

AirbrakeとDatadogの連携

* リアルタイムで、例外をイベントストリームに表示します。
* グラフないで、例外を検索することができるようになります。
* 例外に関して、イベントストリームでコミュニケーションを取ることができます。


<!-- <div id="int-configuration">
<h2>Configuration</h2>

<p>Go to your Airbrake account page and copy your Account Name and Token into the form below.<br />
You can either choose to follow all projects or specify a project name to follow.<br />
If "All projects" box is ticked and a project name is specified, all projects will be followed.</p>
</div> -->

## 設定

Airbrakeの”account_name”ページから、アカウント名とトークンを取得し、インテグレーションタイル内のフォームにコピーします。

![](/static/images/ja-specific/snapshot_airbrake_small.png)

特定のプロジェクトのみを連携することもできます。特定のプロジェクトのみをフォローする場合は、プロジェクト名を指定します。  
全てのプロジェクトをフォローする場合、`All projects`にチェックマークを設定します。
