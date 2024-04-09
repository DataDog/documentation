An `evaluation window` is specified to match when at least one of the cases matches true. This is a sliding window and evaluates cases in real time.

After a signal is generated, the signal remains "open" if a case is matched at least once within the `keep alive` window. Each time a new event matches any of the cases, the *last updated* timestamp is updated for the signal.

A signal closes once the time exceeds the `maximum signal duration`, regardless of the query being matched. This time is calculated from the first seen timestamp.
