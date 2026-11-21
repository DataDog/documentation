## Automated tracking

The underlying Android and iOS SDKs automatically measure the time to initial display (TTID). No setup is required for TTID.

## Manual tracking

The time to full display (TTFD) isn't measured automatically. Call `DdRum.reportAppFullyDisplayed()` when your app reaches its own definition of "fully drawn". This API requires React Native SDK version 3.11.0 or later.

```javascript
import { useEffect } from 'react';
import { DdRum } from '@datadog/mobile-react-native';

const HomeScreen = () => {
    const { data, isLoading } = useHomeData();

    useEffect(() => {
        if (!isLoading) {
            DdRum.reportAppFullyDisplayed();
        }
    }, [isLoading]);

    // ...
};
```

If time to full display isn't defined, the SDK only collects TTID.
