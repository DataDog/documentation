import com.datadog.api.v1.client.api.HostsApi;

public class HostsApiExample {

    public static void main(String[] args) {
        HostsApi apiInstance = new HostsApi();
        String hostName = hostName_example; // String | Name of the host to mute.
        HostMuteSettings body = ; // HostMuteSettings | 
        try {
            HostMuteResponse result = apiInstance.apiV1HostHostNameMutePost(hostName, body);
            System.out.println(result);
        } catch (ApiException e) {
            System.err.println("Exception when calling HostsApi#apiV1HostHostNameMutePost");
            e.printStackTrace();
        }
    }
}