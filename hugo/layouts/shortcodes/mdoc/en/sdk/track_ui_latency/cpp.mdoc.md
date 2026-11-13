## Track long tasks

The C++ SDK doesn't measure UI latency automatically. To report periods when your application's main thread was blocked, call `AddLongTask` with the duration of the task. The long task is recorded in the context of the current view.

```cpp
#include <chrono>

auto start = std::chrono::steady_clock::now();
// ... work that blocks the main thread
auto duration = std::chrono::steady_clock::now() - start;

if (duration > std::chrono::milliseconds(100)) {
    rum->AddLongTask(std::chrono::duration_cast<std::chrono::nanoseconds>(duration));
}
```

`AddLongTask` takes the duration as `std::chrono::nanoseconds` and must be positive. You can also pass custom attributes as a second argument.

View loading time, Time to Network Settled, Interaction to Next View, and mobile vitals aren't available for the C++ SDK.
