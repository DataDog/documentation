class HelloCheck(AgentCheck):
    def check(instance):
        self.gauge('hello.world', 1)