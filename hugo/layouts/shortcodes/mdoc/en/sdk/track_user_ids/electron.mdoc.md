Attach user and account identity to all subsequent RUM events and traces. The SDK propagates the identity to renderer events automatically.

```typescript
import {
  setUserInfo,
  clearUserInfo,
  addUserExtraInfo,
  setAccountInfo,
  clearAccountInfo,
  addAccountExtraInfo,
} from '@datadog/electron-sdk';

// On login
setUserInfo({ id: 'user-123', name: 'Alice', email: 'alice@example.com' });
setAccountInfo({ id: 'account-456', name: 'Acme Corp' });

// Add custom attributes
addUserExtraInfo({ plan: 'premium', role: 'admin' });
addAccountExtraInfo({ tier: 'enterprise', region: 'us' });

// Remove a custom attribute
addUserExtraInfo({ role: null });

// On logout
clearUserInfo();
clearAccountInfo();
```

- `setUserInfo` and `setAccountInfo` require an `id`. The SDK ignores `setUserInfo` calls without one and logs a warning.
- `addUserExtraInfo` merges attributes into the user `extraInfo`, and works even before `setUserInfo` is called. It ignores the standard fields `id`, `name`, and `email`.
- `addAccountExtraInfo` requires a prior `setAccountInfo` call. It ignores the standard fields `id` and `name`.
- Set an attribute to `null` to remove it.
- `getUserInfo` and `getAccountInfo` return a copy of the current value, or `undefined` if none is set.
