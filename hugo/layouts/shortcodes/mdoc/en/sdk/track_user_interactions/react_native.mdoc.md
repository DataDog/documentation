### Manually track RUM actions

You can manually track RUM actions:

```javascript
DdRum.addAction(RumActionType.TAP, 'action name', {}, Date.now());
```

To track a continuous action:

```javascript
DdRum.startAction(RumActionType.TAP, 'action name', {}, Date.now());
//...
DdRum.stopAction({}, Date.now());
```

[1]: https://app.datadoghq.com/rum/application/create
