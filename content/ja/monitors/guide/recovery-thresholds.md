---
aliases:
- /ja/monitors/faq/what-are-recovery-thresholds
further_reading:
- link: /monitors/types/metric/
  tag: ドキュメント
  text: メトリクスモニター
kind: ガイド
title: 回復しきい値
---

## 定義

回復しきい値は、アラートまたは警告状態からモニターが回復するための追加条件を示すために、モニターに追加されるオプションのしきい値です。

## 動作

回復しきい値は、モニターの回復に条件を追加し、回復しきい値を**超えた**場合にのみ回復状態に移行するようにします。回復しきい値が設定されていない場合、モニターはアラート条件が満たされなくなると回復します。

回復条件が満たされることで、回復しきい値が満たされます。回復条件は、アラート条件により異なります。

| アラート条件    | 回復条件          |
|--------------------|-----------------------------|
| > アラートしきい値  | <= アラート回復しきい値 |
| >= アラートしきい値 | < アラート回復しきい値  |
| < アラートしきい値  | >= アラート回復しきい値 |
| <= アラートしきい値 | > アラート回復しきい値  |

## 使用例

回復しきい値は、不規則なモニター動作のノイズを低減します。これにより、回復時にアラートのメトリクスが回復し、問題が解決されたという確信を得ることができます。

## 回復しきい値を設定する方法は？

### Web サイト UI

モニター作成時に、**Set alert conditions** > **Advanced Options** で、アラートまたは警告回復しきい値を設定します。

### API

[API でモニターを作成/編集][1]する場合、JSON モニターの `options.thresholds` 属性で `critical_recovery` と `warning_recovery` の属性を使用します。

```text
"thresholds": {
                "critical": 80,
                "warning": 60,
                "critical_recovery": 70,
                "warning_recovery": 50
              }
```

## {{< partial name="whats-next/whats-next.html" >}}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/api/v1/monitors/